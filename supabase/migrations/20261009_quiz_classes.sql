-- 過去問ドリル: 先生用のクラスと課題
--  - PTアカウントが「先生」を申請し、運営が承認すると、クラスを作って課題を配れる
--  - 学生は参加コードでクラスに入る。先生に見えるのは、配った課題の結果(名前・正誤)だけ
--  - テーブルは、クライアントから直接は触れない。すべて SECURITY DEFINER の関数を経由する

-- =========================================================
-- 1. テーブル
-- =========================================================
create table if not exists public.quiz_teachers (
  user_id uuid primary key references auth.users (id) on delete cascade,
  school_name text,
  approved_at timestamptz not null default now()
);

create table if not exists public.quiz_teacher_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  school_name text not null check (char_length(school_name) between 1 and 100),
  note text check (char_length(note) <= 500),
  status text not null default 'open' check (status in ('open', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);
create unique index if not exists quiz_teacher_requests_open_idx
  on public.quiz_teacher_requests (user_id) where status = 'open';

create table if not exists public.quiz_classes (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references auth.users (id) on delete cascade,
  name text not null check (char_length(name) between 1 and 60),
  join_code text not null unique,
  archived boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists quiz_classes_teacher_idx on public.quiz_classes (teacher_id);

create table if not exists public.quiz_class_members (
  class_id uuid not null references public.quiz_classes (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (class_id, user_id)
);
create index if not exists quiz_class_members_user_idx on public.quiz_class_members (user_id);

create table if not exists public.quiz_assignments (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.quiz_classes (id) on delete cascade,
  title text not null check (char_length(title) between 1 and 80),
  unit text,
  exam_no smallint,
  difficulty text not null default 'any' check (difficulty in ('any', 'easy', 'normal', 'hard')),
  question_ids uuid[] not null,
  due_at timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists quiz_assignments_class_idx on public.quiz_assignments (class_id);

-- 課題での解答。最初の解答だけを記録する(やり直しは、通常のドリルの記録にだけ残る)
create table if not exists public.quiz_assignment_answers (
  assignment_id uuid not null references public.quiz_assignments (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  question_id uuid not null references public.quiz_questions (id) on delete cascade,
  chosen jsonb not null,
  correct boolean not null,
  answered_at timestamptz not null default now(),
  primary key (assignment_id, user_id, question_id)
);

alter table public.quiz_teachers enable row level security;
alter table public.quiz_teacher_requests enable row level security;
alter table public.quiz_classes enable row level security;
alter table public.quiz_class_members enable row level security;
alter table public.quiz_assignments enable row level security;
alter table public.quiz_assignment_answers enable row level security;

revoke all on table public.quiz_teachers, public.quiz_teacher_requests, public.quiz_classes,
  public.quiz_class_members, public.quiz_assignments, public.quiz_assignment_answers
  from public, anon, authenticated;
grant all on table public.quiz_teachers, public.quiz_teacher_requests, public.quiz_classes,
  public.quiz_class_members, public.quiz_assignments, public.quiz_assignment_answers
  to service_role;

-- =========================================================
-- 2. 先生の申請と承認
-- =========================================================
create or replace function public.quiz_is_teacher()
returns boolean
language sql stable security definer set search_path = ''
as $f$
  select exists (select 1 from public.quiz_teachers t where t.user_id = (select auth.uid()));
$f$;
revoke execute on function public.quiz_is_teacher() from public, anon;
grant execute on function public.quiz_is_teacher() to authenticated;

-- 'approved' | 'pending' | 'rejected' | 'none'
create or replace function public.quiz_my_teacher_status()
returns text
language sql stable security definer set search_path = ''
as $f$
  select case
    when exists (select 1 from public.quiz_teachers t where t.user_id = (select auth.uid())) then 'approved'
    when exists (select 1 from public.quiz_teacher_requests r where r.user_id = (select auth.uid()) and r.status = 'open') then 'pending'
    when exists (select 1 from public.quiz_teacher_requests r where r.user_id = (select auth.uid()) and r.status = 'rejected') then 'rejected'
    else 'none'
  end;
$f$;
revoke execute on function public.quiz_my_teacher_status() from public, anon;
grant execute on function public.quiz_my_teacher_status() to authenticated;

create or replace function public.quiz_request_teacher(p_school text, p_note text default null)
returns void
language plpgsql security definer set search_path = ''
as $f$
declare
  v_uid uuid := (select auth.uid());
begin
  if v_uid is null or not exists (select 1 from public.users u where u.id = v_uid and u.account_type = 'pt') then
    raise exception 'pt only';
  end if;
  if exists (select 1 from public.quiz_teachers t where t.user_id = v_uid) then
    return;
  end if;
  insert into public.quiz_teacher_requests (user_id, school_name, note)
  values (v_uid, left(btrim(p_school), 100), nullif(left(btrim(coalesce(p_note, '')), 500), ''))
  on conflict (user_id) where status = 'open' do nothing;
end
$f$;
revoke execute on function public.quiz_request_teacher(text, text) from public, anon;
grant execute on function public.quiz_request_teacher(text, text) to authenticated;

create or replace function public.admin_list_teacher_requests(p_status text default 'open')
returns table (
  id uuid, user_id uuid, email text, full_name text, school_name text, note text,
  status text, created_at timestamptz
)
language sql stable security definer set search_path = ''
as $f$
  select r.id, r.user_id, u.email,
         (select p.full_name from public.pt_profiles p where p.user_id = r.user_id limit 1),
         r.school_name, r.note, r.status, r.created_at
  from public.quiz_teacher_requests r
  left join public.users u on u.id = r.user_id
  where exists (select 1 from public.admin_users a where a.user_id = (select auth.uid()))
    and (p_status = 'all' or r.status = p_status)
  order by r.created_at desc;
$f$;
revoke execute on function public.admin_list_teacher_requests(text) from public, anon;
grant execute on function public.admin_list_teacher_requests(text) to authenticated;

create or replace function public.admin_resolve_teacher_request(p_id uuid, p_approve boolean)
returns void
language plpgsql security definer set search_path = ''
as $f$
declare
  r public.quiz_teacher_requests%rowtype;
begin
  if not exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())) then
    raise exception 'forbidden';
  end if;
  select * into r from public.quiz_teacher_requests where id = p_id and status = 'open';
  if not found then
    raise exception 'not found';
  end if;
  update public.quiz_teacher_requests set status = case when p_approve then 'approved' else 'rejected' end where id = p_id;
  if p_approve then
    insert into public.quiz_teachers (user_id, school_name) values (r.user_id, r.school_name)
    on conflict (user_id) do nothing;
  end if;
end
$f$;
revoke execute on function public.admin_resolve_teacher_request(uuid, boolean) from public, anon;
grant execute on function public.admin_resolve_teacher_request(uuid, boolean) to authenticated;

-- =========================================================
-- 3. 問題の難易度(全ユーザーの正答率から。回答が5人以上たまった問題だけ)
-- =========================================================
-- 内部用。クライアントからは呼べない
create or replace function public.quiz_pool(p_unit text, p_exam integer, p_difficulty text)
returns setof uuid
language sql stable security definer set search_path = ''
as $f$
  with st as (
    select question_id,
           count(*) filter (where attempts > 0) as users,
           sum(attempts) as a,
           sum(correct_count) as c
    from public.quiz_progress
    group by question_id
  )
  select q.id
  from public.quiz_questions q
  left join st on st.question_id = q.id
  where not q.excluded
    and (p_unit is null or q.unit = p_unit)
    and (p_exam is null or q.exam_no = p_exam)
    and case p_difficulty
          when 'easy' then coalesce(st.users, 0) >= 5 and st.c::float / nullif(st.a, 0) >= 0.8
          when 'normal' then coalesce(st.users, 0) >= 5 and st.c::float / nullif(st.a, 0) >= 0.5 and st.c::float / nullif(st.a, 0) < 0.8
          when 'hard' then coalesce(st.users, 0) >= 5 and st.c::float / nullif(st.a, 0) < 0.5
          else true
        end;
$f$;
revoke execute on function public.quiz_pool(text, integer, text) from public, anon, authenticated;

create or replace function public.quiz_teacher_pool_counts(p_unit text default null, p_exam integer default null)
returns table (all_count integer, easy integer, normal integer, hard integer)
language sql stable security definer set search_path = ''
as $f$
  select (select count(*)::integer from public.quiz_pool(p_unit, p_exam, 'any')),
         (select count(*)::integer from public.quiz_pool(p_unit, p_exam, 'easy')),
         (select count(*)::integer from public.quiz_pool(p_unit, p_exam, 'normal')),
         (select count(*)::integer from public.quiz_pool(p_unit, p_exam, 'hard'))
  where public.quiz_is_teacher();
$f$;
revoke execute on function public.quiz_teacher_pool_counts(text, integer) from public, anon;
grant execute on function public.quiz_teacher_pool_counts(text, integer) to authenticated;

-- =========================================================
-- 4. 先生: クラスと課題
-- =========================================================
create or replace function public.quiz_create_class(p_name text)
returns jsonb
language plpgsql security definer set search_path = ''
as $f$
declare
  v_uid uuid := (select auth.uid());
  v_alphabet constant text := 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  v_code text;
  v_id uuid;
  i integer;
  tries integer := 0;
begin
  if not public.quiz_is_teacher() then
    raise exception 'teacher only';
  end if;
  if btrim(coalesce(p_name, '')) = '' then
    raise exception 'name required';
  end if;

  loop
    v_code := '';
    for i in 1..6 loop
      v_code := v_code || substr(v_alphabet, 1 + floor(random() * length(v_alphabet))::integer, 1);
    end loop;
    begin
      insert into public.quiz_classes (teacher_id, name, join_code)
      values (v_uid, left(btrim(p_name), 60), v_code)
      returning id into v_id;
      exit;
    exception when unique_violation then
      tries := tries + 1;
      if tries > 10 then raise; end if;
    end;
  end loop;

  return jsonb_build_object('id', v_id, 'join_code', v_code);
end
$f$;
revoke execute on function public.quiz_create_class(text) from public, anon;
grant execute on function public.quiz_create_class(text) to authenticated;

create or replace function public.quiz_list_my_classes()
returns table (id uuid, name text, join_code text, member_count integer, assignment_count integer, created_at timestamptz)
language sql stable security definer set search_path = ''
as $f$
  select c.id, c.name, c.join_code,
         (select count(*)::integer from public.quiz_class_members m where m.class_id = c.id),
         (select count(*)::integer from public.quiz_assignments a where a.class_id = c.id),
         c.created_at
  from public.quiz_classes c
  where c.teacher_id = (select auth.uid()) and not c.archived and public.quiz_is_teacher()
  order by c.created_at desc;
$f$;
revoke execute on function public.quiz_list_my_classes() from public, anon;
grant execute on function public.quiz_list_my_classes() to authenticated;

create or replace function public.quiz_archive_class(p_class uuid)
returns void
language sql security definer set search_path = ''
as $f$
  update public.quiz_classes set archived = true
  where id = p_class and teacher_id = (select auth.uid()) and public.quiz_is_teacher();
$f$;
revoke execute on function public.quiz_archive_class(uuid) from public, anon;
grant execute on function public.quiz_archive_class(uuid) to authenticated;

create or replace function public.quiz_create_assignment(
  p_class uuid, p_title text, p_unit text, p_exam integer, p_difficulty text, p_n integer, p_due timestamptz
)
returns uuid
language plpgsql security definer set search_path = ''
as $f$
declare
  v_ids uuid[];
  v_id uuid;
  v_diff text := coalesce(nullif(p_difficulty, ''), 'any');
begin
  if not public.quiz_is_teacher() then
    raise exception 'teacher only';
  end if;
  if not exists (
    select 1 from public.quiz_classes c
    where c.id = p_class and c.teacher_id = (select auth.uid()) and not c.archived
  ) then
    raise exception 'class not found';
  end if;
  if btrim(coalesce(p_title, '')) = '' then
    raise exception 'title required';
  end if;
  if v_diff not in ('any', 'easy', 'normal', 'hard') then
    raise exception 'bad difficulty';
  end if;

  select coalesce(array_agg(x.id), '{}') into v_ids
  from (
    select q as id from public.quiz_pool(p_unit, p_exam, v_diff) q
    order by random()
    limit greatest(1, least(coalesce(p_n, 10), 50))
  ) x;

  if coalesce(array_length(v_ids, 1), 0) = 0 then
    raise exception 'no questions';
  end if;

  insert into public.quiz_assignments (class_id, title, unit, exam_no, difficulty, question_ids, due_at)
  values (p_class, left(btrim(p_title), 80), nullif(p_unit, ''), p_exam, v_diff, v_ids, p_due)
  returning id into v_id;

  return v_id;
end
$f$;
revoke execute on function public.quiz_create_assignment(uuid, text, text, integer, text, integer, timestamptz) from public, anon;
grant execute on function public.quiz_create_assignment(uuid, text, text, integer, text, integer, timestamptz) to authenticated;

create or replace function public.quiz_list_assignments(p_class uuid)
returns table (
  id uuid, title text, unit text, exam_no integer, difficulty text, n integer, due_at timestamptz,
  created_at timestamptz, member_count integer, finished_count integer, answered_total integer, correct_total integer
)
language sql stable security definer set search_path = ''
as $f$
  select a.id, a.title, a.unit, a.exam_no::integer, a.difficulty, array_length(a.question_ids, 1), a.due_at, a.created_at,
         (select count(*)::integer from public.quiz_class_members m where m.class_id = a.class_id),
         (select count(*)::integer from (
            select m.user_id from public.quiz_class_members m
            join public.quiz_assignment_answers x on x.assignment_id = a.id and x.user_id = m.user_id
            where m.class_id = a.class_id
            group by m.user_id
            having count(*) >= array_length(a.question_ids, 1)
         ) f),
         (select count(*)::integer from public.quiz_assignment_answers x
            join public.quiz_class_members m on m.class_id = a.class_id and m.user_id = x.user_id
            where x.assignment_id = a.id),
         (select count(*)::integer from public.quiz_assignment_answers x
            join public.quiz_class_members m on m.class_id = a.class_id and m.user_id = x.user_id
            where x.assignment_id = a.id and x.correct)
  from public.quiz_assignments a
  join public.quiz_classes c on c.id = a.class_id
  where a.class_id = p_class and c.teacher_id = (select auth.uid()) and public.quiz_is_teacher()
  order by a.created_at desc;
$f$;
revoke execute on function public.quiz_list_assignments(uuid) from public, anon;
grant execute on function public.quiz_list_assignments(uuid) to authenticated;

-- 課題の結果。学生ごとと、問題ごと。いまクラスにいる学生の分だけ
create or replace function public.quiz_assignment_results(p_assignment uuid)
returns jsonb
language plpgsql stable security definer set search_path = ''
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
revoke execute on function public.quiz_assignment_results(uuid) from public, anon;
grant execute on function public.quiz_assignment_results(uuid) to authenticated;

-- =========================================================
-- 5. 学生: 参加と課題
-- =========================================================
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
  select * into c from public.quiz_classes
  where join_code = upper(btrim(coalesce(p_code, ''))) and not archived;
  if not found then
    raise exception 'code not found';
  end if;
  if c.teacher_id = v_uid then
    raise exception 'own class';
  end if;
  insert into public.quiz_class_members (class_id, user_id) values (c.id, v_uid) on conflict do nothing;
  return jsonb_build_object('id', c.id, 'name', c.name);
end
$f$;
revoke execute on function public.quiz_join_class(text) from public, anon;
grant execute on function public.quiz_join_class(text) to authenticated;

create or replace function public.quiz_leave_class(p_class uuid)
returns void
language sql security definer set search_path = ''
as $f$
  delete from public.quiz_class_members where class_id = p_class and user_id = (select auth.uid());
$f$;
revoke execute on function public.quiz_leave_class(uuid) from public, anon;
grant execute on function public.quiz_leave_class(uuid) to authenticated;

create or replace function public.quiz_my_classes()
returns table (id uuid, name text, teacher_name text, joined_at timestamptz)
language sql stable security definer set search_path = ''
as $f$
  select c.id, c.name,
         (select p.full_name from public.pt_profiles p where p.user_id = c.teacher_id limit 1),
         m.joined_at
  from public.quiz_class_members m
  join public.quiz_classes c on c.id = m.class_id
  where m.user_id = (select auth.uid()) and not c.archived and public.quiz_can_use()
  order by m.joined_at desc;
$f$;
revoke execute on function public.quiz_my_classes() from public, anon;
grant execute on function public.quiz_my_classes() to authenticated;

create or replace function public.quiz_my_assignments()
returns table (
  id uuid, class_id uuid, class_name text, title text, n integer, due_at timestamptz,
  created_at timestamptz, answered integer, correct integer
)
language sql stable security definer set search_path = ''
as $f$
  select a.id, a.class_id, c.name, a.title, array_length(a.question_ids, 1), a.due_at, a.created_at,
         (select count(*)::integer from public.quiz_assignment_answers x where x.assignment_id = a.id and x.user_id = (select auth.uid())),
         (select count(*)::integer from public.quiz_assignment_answers x where x.assignment_id = a.id and x.user_id = (select auth.uid()) and x.correct)
  from public.quiz_assignments a
  join public.quiz_classes c on c.id = a.class_id and not c.archived
  join public.quiz_class_members m on m.class_id = a.class_id and m.user_id = (select auth.uid())
  where public.quiz_can_use()
  order by a.created_at desc;
$f$;
revoke execute on function public.quiz_my_assignments() from public, anon;
grant execute on function public.quiz_my_assignments() to authenticated;

-- 課題の問題(正答は返さない)。前に答えた分は、選んだ番号と正誤も返す
create or replace function public.quiz_assignment_questions(p_assignment uuid)
returns table (
  id uuid, exam_no integer, session text, no integer, unit text,
  intro text, stem text, choices jsonb, need integer, image text, book_images jsonb,
  choices_in_image boolean, bookmarked boolean, last_correct boolean,
  my_chosen jsonb, my_correct boolean
)
language sql stable security definer set search_path = ''
as $f$
  select q.id, q.exam_no::integer, q.session, q.no::integer, q.unit,
         q.intro, q.stem, q.choices, q.need::integer, q.image, q.book_images,
         q.choices_in_image, coalesce(p.bookmarked, false), p.last_correct,
         x.chosen, x.correct
  from public.quiz_assignments a
  join public.quiz_class_members m on m.class_id = a.class_id and m.user_id = (select auth.uid())
  join public.quiz_classes c on c.id = a.class_id and not c.archived
  cross join lateral unnest(a.question_ids) with ordinality as t(qid, ord)
  join public.quiz_questions q on q.id = t.qid
  left join public.quiz_progress p on p.question_id = q.id and p.user_id = (select auth.uid())
  left join public.quiz_assignment_answers x
    on x.assignment_id = a.id and x.user_id = (select auth.uid()) and x.question_id = q.id
  where a.id = p_assignment and public.quiz_can_use()
  order by t.ord;
$f$;
revoke execute on function public.quiz_assignment_questions(uuid) from public, anon;
grant execute on function public.quiz_assignment_questions(uuid) to authenticated;

-- 課題の答え合わせ。通常のドリルと同じ記録に加えて、課題の結果にも、最初の解答だけを残す
create or replace function public.quiz_assignment_answer(p_assignment uuid, p_question uuid, p_choice integer[])
returns jsonb
language plpgsql security definer set search_path = ''
as $f$
declare
  v_uid uuid := (select auth.uid());
  v_res jsonb;
  v_chosen jsonb;
begin
  if v_uid is null or not public.quiz_can_use() then
    raise exception 'not allowed';
  end if;
  if not exists (
    select 1 from public.quiz_assignments a
    join public.quiz_class_members m on m.class_id = a.class_id and m.user_id = v_uid
    join public.quiz_classes c on c.id = a.class_id and not c.archived
    where a.id = p_assignment and p_question = any (a.question_ids)
  ) then
    raise exception 'not found';
  end if;

  v_res := public.quiz_answer(p_question, p_choice);

  select coalesce(to_jsonb(array_agg(x order by x)), '[]'::jsonb) into v_chosen
  from (select distinct x from unnest(p_choice) as x where x between 1 and 5) s;

  insert into public.quiz_assignment_answers (assignment_id, user_id, question_id, chosen, correct)
  values (p_assignment, v_uid, p_question, v_chosen, coalesce((v_res ->> 'correct')::boolean, false))
  on conflict do nothing;

  return v_res;
end
$f$;
revoke execute on function public.quiz_assignment_answer(uuid, uuid, integer[]) from public, anon;
grant execute on function public.quiz_assignment_answer(uuid, uuid, integer[]) to authenticated;
