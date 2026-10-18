-- セキュリティの強化（役割ごとの権限の分離・操作の記録・総当たりの防止・先生の個別停止）
--  1. 書き込みの権限の整理: 行のポリシーが無い操作の、書き込みの権限を取り上げる（RLSで、すでに拒否されている操作の、二重の守り）。これから作る表も、書き込みは、明示的に許可するまで使えない
--  2. 参加コードの総当たり対策: 間違ったコードを、1時間に10回までにする
--  3. 先生・クラス・テストの操作の記録（quiz_audit_log）: 誰が・いつ・何をしたか。学生の結果を見た記録も残す。運営だけが読める
--  4. 先生の個別の停止: 運営が、先生ごとに、停止・再開できる（停止すると、先生の機能が、すぐに使えなくなる）

-- =========================================================
-- 1. 書き込みの権限の整理
-- =========================================================
do $do$
declare
  r record;
begin
  for r in
    select g.table_name, g.grantee, g.privilege_type
    from information_schema.role_table_grants g
    where g.table_schema = 'public' and g.grantee in ('anon', 'authenticated') and g.privilege_type in ('INSERT', 'UPDATE', 'DELETE')
      and not exists (
        select 1 from pg_policies p
        where p.schemaname = 'public' and p.tablename = g.table_name
          and (p.cmd = g.privilege_type or p.cmd = 'ALL')
          and (g.grantee = any (p.roles) or 'public' = any (p.roles))
      )
  loop
    execute format('revoke %s on public.%I from %I', r.privilege_type, r.table_name, r.grantee);
  end loop;
end
$do$;

-- これから作る表は、書き込みの権限を、明示的に渡すまで、使えない（読み取りの権限は、いままでどおり）
alter default privileges in schema public revoke insert, update, delete, truncate on tables from anon, authenticated;

-- =========================================================
-- 2. 参加コードの総当たり対策
-- =========================================================
create table if not exists public.quiz_join_attempts (
  user_id uuid not null references auth.users (id) on delete cascade,
  at timestamptz not null default now()
);
create index if not exists quiz_join_attempts_user_idx on public.quiz_join_attempts (user_id, at desc);
alter table public.quiz_join_attempts enable row level security;
revoke all on table public.quiz_join_attempts from anon, authenticated;

create or replace function public.quiz_join_class(p_code text)
returns jsonb
language plpgsql security definer set search_path = ''
as $f$
declare
  v_uid uuid := (select auth.uid());
  c public.quiz_classes%rowtype;
begin
  if v_uid is null or not public.quiz_can_use() then
    raise exception 'not allowed';
  end if;
  delete from public.quiz_join_attempts where user_id = v_uid and at < now() - interval '1 day';
  if (select count(*) from public.quiz_join_attempts where user_id = v_uid and at > now() - interval '1 hour') >= 10 then
    raise exception 'too many attempts';
  end if;
  select * into c from public.quiz_classes
  where join_code = upper(btrim(coalesce(p_code, ''))) and not archived;
  if not found then
    insert into public.quiz_join_attempts (user_id) values (v_uid);
    raise exception 'code not found';
  end if;
  if c.teacher_id = v_uid then
    raise exception 'own class';
  end if;
  insert into public.quiz_class_members (class_id, user_id) values (c.id, v_uid) on conflict do nothing;
  return jsonb_build_object('id', c.id, 'name', c.name);
end
$f$;

-- =========================================================
-- 3. 操作の記録
-- =========================================================
create table if not exists public.quiz_audit_log (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users (id) on delete set null,
  action text not null,
  target_type text,
  target_id uuid,
  created_at timestamptz not null default now()
);
create index if not exists quiz_audit_log_at_idx on public.quiz_audit_log (created_at desc);
create index if not exists quiz_audit_log_user_idx on public.quiz_audit_log (user_id, action, target_id, created_at desc);
alter table public.quiz_audit_log enable row level security;
revoke all on table public.quiz_audit_log from anon, authenticated;

-- 内部用: 結果を見た記録。同じ人が、同じものを見た記録は、30分に1回だけ
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
  values (v_uid, p_action, case when p_action = 'view_class' then 'class' else 'assignment' end, p_target);
end
$f$;
revoke execute on function public.quiz_audit_view(text, uuid) from public, anon, authenticated;

-- 表への書き込みの記録（クラス・テスト・参加・先生の承認と停止）
create or replace function public.quiz_audit_trigger()
returns trigger
language plpgsql security definer set search_path = ''
as $f$
declare
  v_uid uuid := (select auth.uid());
  v_action text;
  v_type text;
  v_target uuid;
begin
  if tg_table_name = 'quiz_classes' then
    v_type := 'class';
    if tg_op = 'INSERT' then v_action := 'class_create'; v_target := new.id;
    elsif tg_op = 'UPDATE' and new.archived and not old.archived then v_action := 'class_archive'; v_target := new.id;
    end if;
  elsif tg_table_name = 'quiz_assignments' then
    v_type := 'assignment';
    if tg_op = 'INSERT' then v_action := 'test_create'; v_target := new.id;
    elsif tg_op = 'UPDATE' and new.status = 'published' and old.status <> 'published' then v_action := 'test_publish'; v_target := new.id;
    elsif tg_op = 'DELETE' then v_action := 'test_delete'; v_target := old.id;
    end if;
  elsif tg_table_name = 'quiz_class_members' then
    v_type := 'class';
    if tg_op = 'INSERT' then v_action := 'class_join'; v_target := new.class_id;
    elsif tg_op = 'DELETE' and exists (select 1 from public.quiz_classes c where c.id = old.class_id) then v_action := 'class_leave'; v_target := old.class_id;
    end if;
  elsif tg_table_name = 'quiz_teachers' then
    v_type := 'user';
    if tg_op = 'INSERT' then v_action := 'teacher_approved'; v_target := new.user_id;
    elsif tg_op = 'UPDATE' and new.suspended <> old.suspended then v_action := case when new.suspended then 'teacher_suspend' else 'teacher_resume' end; v_target := new.user_id;
    end if;
  elsif tg_table_name = 'quiz_teacher_requests' then
    v_type := 'user';
    if tg_op = 'INSERT' then v_action := 'teacher_request'; v_target := new.user_id;
    elsif tg_op = 'UPDATE' and new.status <> old.status then v_action := 'teacher_request_' || new.status; v_target := new.user_id;
    end if;
  end if;

  if v_action is not null then
    insert into public.quiz_audit_log (user_id, action, target_type, target_id) values (v_uid, v_action, v_type, v_target);
  end if;
  return null;
end
$f$;
revoke execute on function public.quiz_audit_trigger() from public, anon, authenticated;

drop trigger if exists quiz_audit_classes on public.quiz_classes;
create trigger quiz_audit_classes after insert or update on public.quiz_classes for each row execute function public.quiz_audit_trigger();
drop trigger if exists quiz_audit_assignments on public.quiz_assignments;
create trigger quiz_audit_assignments after insert or update or delete on public.quiz_assignments for each row execute function public.quiz_audit_trigger();
drop trigger if exists quiz_audit_members on public.quiz_class_members;
create trigger quiz_audit_members after insert or delete on public.quiz_class_members for each row execute function public.quiz_audit_trigger();

-- =========================================================
-- 4. 先生の個別の停止
-- =========================================================
alter table public.quiz_teachers add column if not exists suspended boolean not null default false;

drop trigger if exists quiz_audit_teachers on public.quiz_teachers;
create trigger quiz_audit_teachers after insert or update on public.quiz_teachers for each row execute function public.quiz_audit_trigger();
drop trigger if exists quiz_audit_requests on public.quiz_teacher_requests;
create trigger quiz_audit_requests after insert or update on public.quiz_teacher_requests for each row execute function public.quiz_audit_trigger();

-- 先生の機能は、承認されていて、停止されていないときだけ使える
create or replace function public.quiz_is_teacher()
returns boolean
language sql stable security definer set search_path = ''
as $f$
  select exists (select 1 from public.quiz_teachers t where t.user_id = (select auth.uid()) and not t.suspended);
$f$;

-- 'approved' | 'suspended' | 'pending' | 'rejected' | 'none'
create or replace function public.quiz_my_teacher_status()
returns text
language sql stable security definer set search_path = ''
as $f$
  select case
    when exists (select 1 from public.quiz_teachers t where t.user_id = (select auth.uid()) and t.suspended) then 'suspended'
    when exists (select 1 from public.quiz_teachers t where t.user_id = (select auth.uid())) then 'approved'
    when exists (select 1 from public.quiz_teacher_requests r where r.user_id = (select auth.uid()) and r.status = 'open') then 'pending'
    when exists (select 1 from public.quiz_teacher_requests r where r.user_id = (select auth.uid()) and r.status = 'rejected') then 'rejected'
    else 'none'
  end;
$f$;

-- 運営: 先生の一覧と、停止・再開
create or replace function public.admin_list_teachers()
returns table (user_id uuid, email text, full_name text, school_name text, approved_at timestamptz, suspended boolean, class_count integer, student_count integer)
language sql stable security definer set search_path = ''
as $f$
  select t.user_id, u.email,
         coalesce((select p.full_name from public.pt_profiles p where p.user_id = t.user_id limit 1), u.full_name),
         t.school_name, t.approved_at, t.suspended,
         (select count(*)::integer from public.quiz_classes c where c.teacher_id = t.user_id and not c.archived),
         (select count(*)::integer from public.quiz_class_members m join public.quiz_classes c on c.id = m.class_id where c.teacher_id = t.user_id and not c.archived)
  from public.quiz_teachers t
  left join public.users u on u.id = t.user_id
  where exists (select 1 from public.admin_users a where a.user_id = (select auth.uid()))
  order by t.approved_at desc;
$f$;
revoke execute on function public.admin_list_teachers() from public, anon;
grant execute on function public.admin_list_teachers() to authenticated;

create or replace function public.admin_set_teacher_suspended(p_user uuid, p_suspended boolean)
returns void
language plpgsql security definer set search_path = ''
as $f$
begin
  if not exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())) then
    raise exception 'forbidden';
  end if;
  update public.quiz_teachers set suspended = p_suspended where user_id = p_user;
  if not found then raise exception 'not found'; end if;
end
$f$;
revoke execute on function public.admin_set_teacher_suspended(uuid, boolean) from public, anon;
grant execute on function public.admin_set_teacher_suspended(uuid, boolean) to authenticated;

-- 運営: 操作の記録
create or replace function public.admin_list_quiz_audit(p_limit integer default 100)
returns table (id bigint, created_at timestamptz, actor_email text, actor_name text, action text, target_type text, target_label text)
language sql stable security definer set search_path = ''
as $f$
  select l.id, l.created_at, u.email,
         coalesce((select p.full_name from public.pt_profiles p where p.user_id = l.user_id limit 1), u.full_name),
         l.action, l.target_type,
         case l.target_type
           when 'class' then (select c.name from public.quiz_classes c where c.id = l.target_id)
           when 'assignment' then (select a.title from public.quiz_assignments a where a.id = l.target_id)
           when 'user' then (select coalesce(tu.full_name, tu.email) from public.users tu where tu.id = l.target_id)
         end
  from public.quiz_audit_log l
  left join public.users u on u.id = l.user_id
  where exists (select 1 from public.admin_users a where a.user_id = (select auth.uid()))
  order by l.created_at desc
  limit least(greatest(coalesce(p_limit, 100), 1), 500);
$f$;
revoke execute on function public.admin_list_quiz_audit(integer) from public, anon;
grant execute on function public.admin_list_quiz_audit(integer) to authenticated;

-- =========================================================
-- 5. 結果を見る3つの関数に、見た記録を足す（書き込みをするので、stable をやめる）
-- =========================================================
create or replace function public.quiz_assignment_results(p_assignment uuid)
returns jsonb
language plpgsql security definer set search_path = ''
as $f$
declare
  a public.quiz_assignments%rowtype;
  v_class public.quiz_classes%rowtype;
  v_total integer;
  v_students jsonb;
  v_questions jsonb;
begin
  if not public.quiz_is_teacher() then
    raise exception 'teacher only';
  end if;
  select * into a from public.quiz_assignments where id = p_assignment;
  if not found then raise exception 'not found'; end if;
  select * into v_class from public.quiz_classes where id = a.class_id and teacher_id = (select auth.uid());
  if not found then raise exception 'not found'; end if;

  perform public.quiz_audit_view('view_results', p_assignment);

  v_total := array_length(a.question_ids, 1);

  select coalesce(jsonb_agg(s order by s.name), '[]'::jsonb) into v_students
  from (
    select coalesce((select p.full_name from public.pt_profiles p where p.user_id = m.user_id limit 1), '（名前未設定）') as name,
           count(x.question_id)::integer as answered,
           count(x.question_id) filter (where x.correct)::integer as correct
    from public.quiz_class_members m
    left join public.quiz_assignment_answers x on x.assignment_id = a.id and x.user_id = m.user_id
    where m.class_id = a.class_id
    group by m.user_id
  ) s;

  select coalesce(jsonb_agg(jsonb_build_object(
           'id', q.id,
           'label', '第' || q.exam_no || '回 ' || case q.session when 'am' then '午前' else '午後' end || q.no,
           'stem', left(q.stem, 80),
           'answered', coalesce(st.answered, 0),
           'correct', coalesce(st.correct, 0)
         ) order by t.ord), '[]'::jsonb) into v_questions
  from unnest(a.question_ids) with ordinality as t(qid, ord)
  join public.quiz_questions q on q.id = t.qid
  left join lateral (
    select count(*)::integer as answered, count(*) filter (where x.correct)::integer as correct
    from public.quiz_assignment_answers x
    join public.quiz_class_members m on m.class_id = a.class_id and m.user_id = x.user_id
    where x.assignment_id = a.id and x.question_id = q.id
  ) st on true;

  return jsonb_build_object(
    'title', a.title, 'class_name', v_class.name, 'total', v_total, 'due_at', a.due_at,
    'students', v_students, 'questions', v_questions
  );
end
$f$;

create or replace function public.quiz_class_dashboard(p_class uuid)
returns jsonb
language plpgsql security definer set search_path = ''
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

  perform public.quiz_audit_view('view_class', p_class);

  select count(*)::integer into v_assign from public.quiz_assignments where class_id = p_class and status = 'published';
  select count(*)::integer into v_members from public.quiz_class_members where class_id = p_class;

  select coalesce(jsonb_agg(to_jsonb(s) order by s.name), '[]'::jsonb) into v_students
  from (
    select coalesce((select p.full_name from public.pt_profiles p where p.user_id = m.user_id limit 1), '（名前未設定）') as name,
           (select count(*)::integer from public.quiz_assignments a
             where a.class_id = p_class and a.status = 'published'
               and (select count(*) from public.quiz_assignment_answers x where x.assignment_id = a.id and x.user_id = m.user_id) >= array_length(a.question_ids, 1)) as finished,
           (select count(*)::integer from public.quiz_assignments a
             where a.class_id = p_class and a.status = 'published' and a.due_at is not null and a.due_at < now()
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

create or replace function public.quiz_assignment_matrix(p_assignment uuid)
returns jsonb
language plpgsql security definer set search_path = ''
as $f$
declare
  a public.quiz_assignments%rowtype;
  v_students jsonb;
  v_questions jsonb;
begin
  a := public.quiz_own_assignment(p_assignment);
  perform public.quiz_audit_view('view_matrix', p_assignment);

  select coalesce(jsonb_agg(jsonb_build_object('name', s.name, 'cells', s.cells) order by s.name), '[]'::jsonb) into v_students
  from (
    select coalesce((select p.full_name from public.pt_profiles p where p.user_id = m.user_id limit 1), '（名前未設定）') as name,
           coalesce((
             select jsonb_object_agg(x.question_id::text, x.correct)
             from public.quiz_assignment_answers x
             where x.assignment_id = a.id and x.user_id = m.user_id
           ), '{}'::jsonb) as cells
    from public.quiz_class_members m
    where m.class_id = a.class_id
  ) s;

  select coalesce(jsonb_agg(jsonb_build_object('id', q.id, 'unit', q.unit) order by t.ord), '[]'::jsonb) into v_questions
  from unnest(a.question_ids) with ordinality as t(qid, ord)
  join public.quiz_questions q on q.id = t.qid;

  return jsonb_build_object('students', v_students, 'questions', v_questions);
end
$f$;
