-- 先生用: クラスの状況（ダッシュボード）
--  - 見えるのは、これまでと同じ範囲: いまクラスにいる学生の、配った課題の結果だけ
--  - 学生ごと（提出した課題数・期限切れの未提出・正答率・最後に解いた日）、単元ごとの正答率、正答率の低い問題
create or replace function public.quiz_class_dashboard(p_class uuid)
returns jsonb
language plpgsql stable security definer set search_path = ''
as $f$
declare
  v_class public.quiz_classes%rowtype;
  v_assign integer;
  v_members integer;
  v_students jsonb;
  v_units jsonb;
  v_weak jsonb;
begin
  if not public.quiz_is_teacher() then
    raise exception 'teacher only';
  end if;
  select * into v_class from public.quiz_classes where id = p_class and teacher_id = (select auth.uid());
  if not found then raise exception 'not found'; end if;

  select count(*)::integer into v_assign from public.quiz_assignments where class_id = p_class;
  select count(*)::integer into v_members from public.quiz_class_members where class_id = p_class;

  select coalesce(jsonb_agg(to_jsonb(s) order by s.name), '[]'::jsonb) into v_students
  from (
    select coalesce((select p.full_name from public.pt_profiles p where p.user_id = m.user_id limit 1), '（名前未設定）') as name,
           (select count(*)::integer from public.quiz_assignments a
             where a.class_id = p_class
               and (select count(*) from public.quiz_assignment_answers x where x.assignment_id = a.id and x.user_id = m.user_id) >= array_length(a.question_ids, 1)) as finished,
           (select count(*)::integer from public.quiz_assignments a
             where a.class_id = p_class and a.due_at is not null and a.due_at < now()
               and (select count(*) from public.quiz_assignment_answers x where x.assignment_id = a.id and x.user_id = m.user_id) < array_length(a.question_ids, 1)) as overdue,
           (select count(*)::integer from public.quiz_assignment_answers x join public.quiz_assignments a on a.id = x.assignment_id
             where a.class_id = p_class and x.user_id = m.user_id) as answered,
           (select count(*)::integer from public.quiz_assignment_answers x join public.quiz_assignments a on a.id = x.assignment_id
             where a.class_id = p_class and x.user_id = m.user_id and x.correct) as correct,
           (select max(x.answered_at) from public.quiz_assignment_answers x join public.quiz_assignments a on a.id = x.assignment_id
             where a.class_id = p_class and x.user_id = m.user_id) as last_at
    from public.quiz_class_members m
    where m.class_id = p_class
  ) s;

  select coalesce(jsonb_agg(to_jsonb(u) order by u.name), '[]'::jsonb) into v_units
  from (
    select coalesce(un.name, '（単元なし）') as name,
           count(*)::integer as answered,
           (count(*) filter (where x.correct))::integer as correct
    from public.quiz_assignment_answers x
    join public.quiz_assignments a on a.id = x.assignment_id and a.class_id = p_class
    join public.quiz_class_members m on m.class_id = p_class and m.user_id = x.user_id
    join public.quiz_questions q on q.id = x.question_id
    left join public.quiz_units un on un.id::text = q.unit::text
    group by 1
  ) u;

  select coalesce(jsonb_agg(to_jsonb(w)), '[]'::jsonb) into v_weak
  from (
    select q.id,
           '第' || q.exam_no || '回 ' || case q.session when 'am' then '午前' else '午後' end || q.no as label,
           left(q.stem, 80) as stem,
           count(*)::integer as answered,
           (count(*) filter (where x.correct))::integer as correct
    from public.quiz_assignment_answers x
    join public.quiz_assignments a on a.id = x.assignment_id and a.class_id = p_class
    join public.quiz_class_members m on m.class_id = p_class and m.user_id = x.user_id
    join public.quiz_questions q on q.id = x.question_id
    group by q.id, q.exam_no, q.session, q.no, q.stem
    having count(*) >= 2
    order by (count(*) filter (where x.correct))::float / count(*), count(*) desc
    limit 10
  ) w;

  return jsonb_build_object(
    'class_name', v_class.name, 'members', v_members, 'assignments', v_assign,
    'students', v_students, 'units', v_units, 'weak', v_weak
  );
end
$f$;
revoke execute on function public.quiz_class_dashboard(uuid) from public, anon;
grant execute on function public.quiz_class_dashboard(uuid) to authenticated;
