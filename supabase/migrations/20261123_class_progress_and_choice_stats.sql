-- 先生: 一問一答の進み具合（学生が共有をオンにした人だけ）と、テストの問題ごとの選択肢の割合
--  - 進み具合は、学生の同意（share_progress）が前提。既定はオフ。共有していない学生の数字は、関数が返さない
alter table public.quiz_class_members add column if not exists share_progress boolean not null default false;

create or replace function public.quiz_audit_view(p_action text, p_target uuid)
returns void
language plpgsql security definer set search_path = ''
as $f$
declare
  v_uid uuid := (select auth.uid());
begin
  if exists (
    select 1 from public.quiz_audit_log l
    where l.user_id is not distinct from v_uid and l.action = p_action and l.target_id = p_target
      and l.created_at > now() - interval '30 minutes'
  ) then
    return;
  end if;
  insert into public.quiz_audit_log (user_id, action, target_type, target_id)
  values (v_uid, p_action, case when p_action in ('view_class', 'view_progress') then 'class' else 'assignment' end, p_target);
end
$f$;
revoke execute on function public.quiz_audit_view(text, uuid) from public, anon, authenticated;

create or replace function public.quiz_set_share_progress(p_class uuid, p_share boolean)
returns void
language sql security definer set search_path = ''
as $f$
  update public.quiz_class_members set share_progress = coalesce(p_share, false)
  where class_id = p_class and user_id = (select auth.uid());
$f$;
revoke execute on function public.quiz_set_share_progress(uuid, boolean) from public, anon;
grant execute on function public.quiz_set_share_progress(uuid, boolean) to authenticated;

create or replace function public.quiz_my_class_sharing()
returns table (class_id uuid, share_progress boolean)
language sql stable security definer set search_path = ''
as $f$
  select m.class_id, m.share_progress from public.quiz_class_members m where m.user_id = (select auth.uid());
$f$;
revoke execute on function public.quiz_my_class_sharing() from public, anon;
grant execute on function public.quiz_my_class_sharing() to authenticated;

create or replace function public.quiz_class_progress(p_class uuid)
returns jsonb
language plpgsql security definer set search_path = ''
as $f$
declare
  v_class public.quiz_classes%rowtype;
  v_total integer;
  v_unit_totals jsonb;
  v_students jsonb;
begin
  if not public.quiz_is_teacher() then
    raise exception 'teacher only';
  end if;
  select * into v_class from public.quiz_classes where id = p_class and teacher_id = (select auth.uid());
  if not found then raise exception 'not found'; end if;

  perform public.quiz_audit_view('view_progress', p_class);

  select count(*)::integer into v_total from public.quiz_questions where not excluded;
  select coalesce(jsonb_object_agg(u.unit, u.n), '{}'::jsonb) into v_unit_totals
  from (select q.unit, count(*)::integer n from public.quiz_questions q where not q.excluded group by q.unit) u;

  select coalesce(jsonb_agg(jsonb_build_object(
           'name', s.name, 'shared', s.shared, 'answered', s.answered, 'attempts', s.attempts,
           'correct', s.correct, 'last_at', s.last_at, 'units', s.units
         ) order by s.name), '[]'::jsonb) into v_students
  from (
    select coalesce((select p.full_name from public.pt_profiles p where p.user_id = m.user_id limit 1), '（名前未設定）') as name,
           m.share_progress as shared,
           case when m.share_progress then (select count(*)::integer from public.quiz_progress p where p.user_id = m.user_id and p.attempts > 0) end as answered,
           case when m.share_progress then (select coalesce(sum(p.attempts), 0)::integer from public.quiz_progress p where p.user_id = m.user_id) end as attempts,
           case when m.share_progress then (select coalesce(sum(p.correct_count), 0)::integer from public.quiz_progress p where p.user_id = m.user_id) end as correct,
           case when m.share_progress then (select max(p.updated_at) from public.quiz_progress p where p.user_id = m.user_id and p.attempts > 0) end as last_at,
           case when m.share_progress then (
             select coalesce(jsonb_agg(jsonb_build_object('unit', x.unit, 'answered', x.n, 'attempts', x.a, 'correct', x.c)), '[]'::jsonb)
             from (
               select q.unit, count(*)::integer n, sum(p.attempts)::integer a, sum(p.correct_count)::integer c
               from public.quiz_progress p join public.quiz_questions q on q.id = p.question_id
               where p.user_id = m.user_id and p.attempts > 0
               group by q.unit
             ) x
           ) end as units
    from public.quiz_class_members m
    where m.class_id = p_class
  ) s;

  return jsonb_build_object('class_name', v_class.name, 'total', v_total, 'unit_totals', v_unit_totals, 'students', v_students);
end
$f$;
revoke execute on function public.quiz_class_progress(uuid) from public, anon;
grant execute on function public.quiz_class_progress(uuid) to authenticated;

create or replace function public.quiz_assignment_choice_stats(p_assignment uuid)
returns jsonb
language plpgsql security definer set search_path = ''
as $f$
declare
  a public.quiz_assignments%rowtype;
  v jsonb;
begin
  a := public.quiz_own_assignment(p_assignment);
  perform public.quiz_audit_view('view_results', p_assignment);

  with ans as (
    select x.question_id, x.user_id, x.chosen
    from public.quiz_assignment_answers x
    join public.quiz_class_members m on m.class_id = a.class_id and m.user_id = x.user_id
    where x.assignment_id = a.id
  ),
  per_choice as (
    select question_id, c.value::integer as choice, count(*)::integer as n
    from ans, jsonb_array_elements_text(ans.chosen) as c(value)
    group by 1, 2
  ),
  per_q as (
    select question_id, count(*)::integer as answered from ans group by 1
  )
  select coalesce(jsonb_object_agg(pq.question_id::text, jsonb_build_object(
           'answered', pq.answered,
           'choices', coalesce((select jsonb_object_agg(pc.choice::text, pc.n) from per_choice pc where pc.question_id = pq.question_id), '{}'::jsonb)
         )), '{}'::jsonb) into v
  from per_q pq;

  return v;
end
$f$;
revoke execute on function public.quiz_assignment_choice_stats(uuid) from public, anon;
grant execute on function public.quiz_assignment_choice_stats(uuid) to authenticated;
