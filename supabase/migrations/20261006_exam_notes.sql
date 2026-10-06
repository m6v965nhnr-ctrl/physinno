-- 学校ごとの試験情報(科目→試験メモ・過去問ファイル)
--  - 学校(schools)を選べるようにし、同じ学校の学生・卒業生だけが読み書きできる
--  - 科目(exam_subjects)は学年・学期ごと。学生が追加できる
--  - 試験メモ(exam_notes): 年度・試験の種類・難易度・出題傾向・覚えている出題内容・ファイル(任意)。投稿者は表示しない
--  - ファイルは非公開バケット exam-files(同じ学校のメンバーだけ読める)

-- 関数どうしが、あとで作る表を参照するため、作成時の本文チェックを一時的に切る
set check_function_bodies = off;

-- =========================================================
-- 1. 学校
-- =========================================================
create table if not exists public.schools (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(btrim(name)) between 2 and 100),
  -- 空白や大文字小文字の違いで同じ学校が重複しないようにするキー
  name_key text generated always as (lower(regexp_replace(name, '[\s　]+', '', 'g'))) stored,
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  unique (name_key)
);

alter table public.schools enable row level security;
create policy schools_select_members on public.schools
  for select to authenticated
  using (exists (select 1 from public.users u where u.id = (select auth.uid()) and u.account_type in ('student', 'pt')));

revoke all on table public.schools from public, anon, authenticated;
grant select (id, name) on table public.schools to authenticated;
grant all on table public.schools to service_role;

alter table public.student_profiles
  add column if not exists school_id uuid references public.schools (id) on delete set null;

-- 学校名は専用の関数(set_my_school)で設定する
revoke update (school_name) on table public.student_profiles from authenticated;

create or replace function public.set_my_school(p_name text)
returns uuid
language plpgsql security definer set search_path = ''
as $f$
declare
  v_uid uuid := auth.uid();
  v_name text := btrim(regexp_replace(coalesce(p_name, ''), '[\s　]+', ' ', 'g'));
  v_id uuid;
begin
  if v_uid is null then
    raise exception 'ログインしてください';
  end if;
  if not exists (select 1 from public.student_profiles where user_id = v_uid) then
    raise exception '学生のアカウントで設定できます';
  end if;

  if char_length(v_name) = 0 then
    update public.student_profiles set school_id = null, school_name = null, updated_at = now() where user_id = v_uid;
    return null;
  end if;
  if char_length(v_name) < 2 or char_length(v_name) > 100 then
    raise exception '学校名は2〜100文字で入力してください';
  end if;

  insert into public.schools (name, created_by) values (v_name, v_uid)
  on conflict (name_key) do nothing;

  select id into v_id from public.schools
   where name_key = lower(regexp_replace(v_name, '[\s　]+', '', 'g'));

  update public.student_profiles
     set school_id = v_id, school_name = (select name from public.schools where id = v_id), updated_at = now()
   where user_id = v_uid;

  return v_id;
end
$f$;
revoke execute on function public.set_my_school(text) from public, anon;
grant execute on function public.set_my_school(text) to authenticated;

-- 同じ学校のメンバー(学生・卒業生。学校は自己申告)
create or replace function public.is_school_member(p_school uuid)
returns boolean
language sql stable security definer set search_path = ''
as $f$
  select p_school is not null and exists (
    select 1 from public.student_profiles sp
    join public.users u on u.id = sp.user_id
    where sp.user_id = (select auth.uid())
      and sp.school_id = p_school
      and u.account_type in ('student', 'pt')
  );
$f$;
revoke execute on function public.is_school_member(uuid) from public, anon;
grant execute on function public.is_school_member(uuid) to authenticated;

create or replace function public.is_school_member_text(p text)
returns boolean
language plpgsql stable security definer set search_path = ''
as $f$
declare
  v uuid;
begin
  begin
    v := p::uuid;
  exception when others then
    return false;
  end;
  return public.is_school_member(v);
end
$f$;
revoke execute on function public.is_school_member_text(text) from public, anon;
grant execute on function public.is_school_member_text(text) to authenticated;

-- =========================================================
-- 2. 科目(学校 × 学年 × 学期)
-- =========================================================
create table if not exists public.exam_subjects (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references public.schools (id) on delete cascade,
  name text not null check (char_length(btrim(name)) between 1 and 60),
  grade smallint not null check (grade between 1 and 6),
  term text not null check (term in ('first', 'second', 'full')),
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  unique (school_id, name, grade, term)
);

alter table public.exam_subjects enable row level security;
-- 読み書きは下の関数を通す(作成者のIDを返さないため)
revoke all on table public.exam_subjects from public, anon, authenticated;
grant all on table public.exam_subjects to service_role;

create or replace function public.add_exam_subject(p_name text, p_grade integer, p_term text)
returns uuid
language plpgsql security definer set search_path = ''
as $f$
declare
  v_uid uuid := auth.uid();
  v_school uuid;
  v_name text := btrim(regexp_replace(coalesce(p_name, ''), '[\s　]+', ' ', 'g'));
  v_id uuid;
begin
  select sp.school_id into v_school from public.student_profiles sp where sp.user_id = v_uid;
  if v_school is null or not public.is_school_member(v_school) then
    raise exception '先に、設定で学校を登録してください';
  end if;
  if char_length(v_name) < 1 or char_length(v_name) > 60 then
    raise exception '科目名は1〜60文字で入力してください';
  end if;
  if p_grade not between 1 and 6 or p_term not in ('first', 'second', 'full') then
    raise exception '学年・学期が正しくありません';
  end if;

  insert into public.exam_subjects (school_id, name, grade, term, created_by)
  values (v_school, v_name, p_grade, p_term, v_uid)
  on conflict (school_id, name, grade, term) do nothing;

  select id into v_id from public.exam_subjects
   where school_id = v_school and name = v_name and grade = p_grade and term = p_term;
  return v_id;
end
$f$;
revoke execute on function public.add_exam_subject(text, integer, text) from public, anon;
grant execute on function public.add_exam_subject(text, integer, text) to authenticated;

-- 自分の学校の科目一覧(学年・学期で絞り込める)。メモの件数つき
create or replace function public.list_exam_subjects(p_grade integer default null, p_term text default null)
returns table (id uuid, name text, grade smallint, term text, note_count bigint, latest_year smallint)
language sql stable security definer set search_path = ''
as $f$
  select s.id, s.name, s.grade, s.term,
         (select count(*) from public.exam_notes n where n.subject_id = s.id),
         (select max(n.academic_year) from public.exam_notes n where n.subject_id = s.id)
  from public.exam_subjects s
  where public.is_school_member(s.school_id)
    and s.school_id = (select sp.school_id from public.student_profiles sp where sp.user_id = (select auth.uid()))
    and (p_grade is null or s.grade = p_grade)
    and (p_term is null or s.term = p_term)
  order by s.grade, case s.term when 'first' then 1 when 'second' then 2 else 3 end, s.name;
$f$;
revoke execute on function public.list_exam_subjects(integer, text) from public, anon;
grant execute on function public.list_exam_subjects(integer, text) to authenticated;

create or replace function public.get_exam_subject(p_id uuid)
returns table (id uuid, name text, grade smallint, term text, school_id uuid, school_name text)
language sql stable security definer set search_path = ''
as $f$
  select s.id, s.name, s.grade, s.term, s.school_id, sc.name
  from public.exam_subjects s
  join public.schools sc on sc.id = s.school_id
  where s.id = p_id and public.is_school_member(s.school_id);
$f$;
revoke execute on function public.get_exam_subject(uuid) from public, anon;
grant execute on function public.get_exam_subject(uuid) to authenticated;

-- =========================================================
-- 3. 試験メモ
-- =========================================================
create table if not exists public.exam_notes (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid not null references public.exam_subjects (id) on delete cascade,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  academic_year smallint not null check (academic_year between 2000 and 2100),
  exam_type text not null check (exam_type in ('written', 'practical', 'oral', 'retake', 'osce', 'other')),
  difficulty smallint check (difficulty between 1 and 5),
  tendency text check (char_length(tendency) <= 3000),
  recalled text check (char_length(recalled) <= 3000),
  file_path text check (char_length(file_path) <= 300),
  file_name text check (char_length(file_name) <= 200),
  created_at timestamptz not null default now(),
  check (
    coalesce(btrim(tendency), '') <> '' or coalesce(btrim(recalled), '') <> '' or file_path is not null
  )
);
create index if not exists exam_notes_subject_idx on public.exam_notes (subject_id, academic_year desc, created_at desc);

alter table public.exam_notes enable row level security;

-- 投稿できるのは、その科目の学校のメンバー。ファイルは「学校ID/自分のID/…」の場所のものだけ
create or replace function public.can_post_exam_note(p_subject uuid, p_file_path text)
returns boolean
language sql stable security definer set search_path = ''
as $f$
  select exists (
    select 1 from public.exam_subjects s
    where s.id = p_subject
      and public.is_school_member(s.school_id)
      and (p_file_path is null or p_file_path like s.school_id::text || '/' || (select auth.uid())::text || '/%')
  );
$f$;
revoke execute on function public.can_post_exam_note(uuid, text) from public, anon;
grant execute on function public.can_post_exam_note(uuid, text) to authenticated;

create policy exam_notes_insert on public.exam_notes
  for insert to authenticated
  with check (user_id = (select auth.uid()) and public.can_post_exam_note(subject_id, file_path));
create policy exam_notes_select_own on public.exam_notes
  for select to authenticated using (user_id = (select auth.uid()));
create policy exam_notes_update_own on public.exam_notes
  for update to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy exam_notes_delete_own on public.exam_notes
  for delete to authenticated using (user_id = (select auth.uid()));

revoke all on table public.exam_notes from public, anon, authenticated;
grant select, delete on table public.exam_notes to authenticated;
grant insert (subject_id, academic_year, exam_type, difficulty, tendency, recalled, file_path, file_name)
  on table public.exam_notes to authenticated;
grant update (academic_year, exam_type, difficulty, tendency, recalled)
  on table public.exam_notes to authenticated;
grant all on table public.exam_notes to service_role;

-- 科目のメモ一覧(同じ学校のメンバーのみ)。投稿者のIDは返さない
create or replace function public.list_exam_notes(p_subject uuid)
returns table (
  id uuid, academic_year smallint, exam_type text, difficulty smallint,
  tendency text, recalled text, file_path text, file_name text, created_at timestamptz, is_mine boolean
)
language sql stable security definer set search_path = ''
as $f$
  select n.id, n.academic_year, n.exam_type, n.difficulty, n.tendency, n.recalled,
         n.file_path, n.file_name, n.created_at, (n.user_id = (select auth.uid()))
  from public.exam_notes n
  join public.exam_subjects s on s.id = n.subject_id
  where n.subject_id = p_subject and public.is_school_member(s.school_id)
  order by n.academic_year desc, n.created_at desc;
$f$;
revoke execute on function public.list_exam_notes(uuid) from public, anon;
grant execute on function public.list_exam_notes(uuid) to authenticated;

-- =========================================================
-- 4. ファイル置き場(非公開)。パスは「学校ID/投稿者のID/ファイル名」
-- =========================================================
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('exam-files', 'exam-files', false, 10485760,
        array['application/pdf', 'image/png', 'image/jpeg', 'image/webp'])
on conflict (id) do update
  set public = false, file_size_limit = 10485760,
      allowed_mime_types = array['application/pdf', 'image/png', 'image/jpeg', 'image/webp'];

create policy exam_files_member_select on storage.objects
  for select to authenticated
  using (bucket_id = 'exam-files' and public.is_school_member_text((storage.foldername(name))[1]));

create policy exam_files_member_insert on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'exam-files'
    and public.is_school_member_text((storage.foldername(name))[1])
    and (storage.foldername(name))[2] = (select auth.uid())::text
  );

-- 削除できるのは、投稿した本人と運営(著作権などの削除申出への対応)
create policy exam_files_owner_or_admin_delete on storage.objects
  for delete to authenticated
  using (
    bucket_id = 'exam-files'
    and (
      (storage.foldername(name))[2] = (select auth.uid())::text
      or exists (select 1 from public.admin_users a where a.user_id = (select auth.uid()))
    )
  );

-- =========================================================
-- 5. 通報の対象に試験メモを追加
-- =========================================================
alter table public.reports drop constraint if exists reports_target_type_check;
alter table public.reports
  add constraint reports_target_type_check
  check (target_type in ('post', 'comment', 'message', 'group_message', 'hospital_review',
                         'internship_review', 'student_question', 'student_answer', 'exam_note'));

-- 運営用: 削除前に、添付ファイルの場所を知る(ファイル本体は、画面側で先に削除する)
create or replace function public.admin_exam_note_file(p_note uuid)
returns text
language sql stable security definer set search_path = ''
as $f$
  select n.file_path from public.exam_notes n
  where n.id = p_note
    and exists (select 1 from public.admin_users a where a.user_id = (select auth.uid()));
$f$;
revoke execute on function public.admin_exam_note_file(uuid) from public, anon;
grant execute on function public.admin_exam_note_file(uuid) to authenticated;

drop function if exists public.admin_list_reports(text);
create or replace function public.admin_list_reports(p_status text default 'open')
returns table (
  id uuid, target_type text, target_id uuid, reason text, detail text, status text,
  admin_note text, created_at timestamptz, reporter_email text, snippet text, link_path text
)
language sql stable security definer set search_path = ''
as $f$
  select
    r.id, r.target_type, r.target_id, r.reason, r.detail, r.status, r.admin_note, r.created_at,
    u.email,
    left(case r.target_type
      when 'post' then (select coalesce(nullif(p.title, ''), '') || ' ' || coalesce(p.content, '') from public.posts p where p.id = r.target_id)
      when 'comment' then (select c.content from public.comments c where c.id = r.target_id)
      when 'message' then (select m.content from public.messages m where m.id = r.target_id)
      when 'group_message' then (select g.content from public.group_messages g where g.id = r.target_id)
      when 'hospital_review' then (select h.comment from public.hospital_reviews h where h.id = r.target_id)
      when 'internship_review' then (select i.comment from public.internship_reviews i where i.id = r.target_id)
      when 'student_question' then (select sq.title || ' ' || sq.body from public.student_questions sq where sq.id = r.target_id)
      when 'student_answer' then (select sa.body from public.student_answers sa where sa.id = r.target_id)
      when 'exam_note' then (select coalesce(n.tendency, '') || ' ' || coalesce(n.recalled, '') || case when n.file_path is not null then ' [添付ファイルあり: ' || coalesce(n.file_name, '') || ']' else '' end from public.exam_notes n where n.id = r.target_id)
    end, 300),
    case r.target_type
      when 'post' then '/posts/' || r.target_id::text
      when 'comment' then (select '/posts/' || c.post_id::text from public.comments c where c.id = r.target_id)
      when 'hospital_review' then (select '/hospitals/' || h.hospital_id::text from public.hospital_reviews h where h.id = r.target_id)
      when 'internship_review' then (select '/hospitals/' || i.hospital_id::text from public.internship_reviews i where i.id = r.target_id)
      when 'student_question' then '/student/questions/' || r.target_id::text
      when 'student_answer' then (select '/student/questions/' || sa.question_id::text from public.student_answers sa where sa.id = r.target_id)
      when 'exam_note' then (select '/student/exams/' || n.subject_id::text from public.exam_notes n where n.id = r.target_id)
      else null
    end
  from public.reports r
  left join public.users u on u.id = r.reporter_id
  where exists (select 1 from public.admin_users a where a.user_id = (select auth.uid()))
    and (p_status = 'all' or r.status = p_status)
  order by r.created_at desc;
$f$;
revoke execute on function public.admin_list_reports(text) from public, anon;
grant execute on function public.admin_list_reports(text) to authenticated;

create or replace function public.admin_resolve_report(p_id uuid, p_action text, p_note text default null)
returns text
language plpgsql security definer set search_path = ''
as $f$
declare
  r public.reports%rowtype;
begin
  if not exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())) then
    raise exception 'forbidden';
  end if;

  select * into r from public.reports where id = p_id;
  if not found then
    raise exception 'not found';
  end if;

  if p_action = 'delete' then
    case r.target_type
      when 'post' then
        delete from public.comments where post_id = r.target_id;
        delete from public.likes where post_id = r.target_id;
        delete from public.notifications where post_id = r.target_id;
        delete from public.posts where id = r.target_id;
      when 'comment' then delete from public.comments where id = r.target_id;
      when 'message' then delete from public.messages where id = r.target_id;
      when 'group_message' then delete from public.group_messages where id = r.target_id;
      when 'hospital_review' then delete from public.hospital_reviews where id = r.target_id;
      when 'internship_review' then delete from public.internship_reviews where id = r.target_id;
      when 'student_question' then
        delete from public.notifications where question_id = r.target_id;
        delete from public.student_questions where id = r.target_id;
      when 'student_answer' then delete from public.student_answers where id = r.target_id;
      when 'exam_note' then delete from public.exam_notes where id = r.target_id;
    end case;
    update public.reports set status = 'resolved', admin_note = p_note, resolved_at = now() where id = p_id;
  elsif p_action = 'resolve' then
    update public.reports set status = 'resolved', admin_note = p_note, resolved_at = now() where id = p_id;
  elsif p_action = 'dismiss' then
    update public.reports set status = 'dismissed', admin_note = p_note, resolved_at = now() where id = p_id;
  else
    raise exception 'bad action';
  end if;

  return 'ok';
end
$f$;
revoke execute on function public.admin_resolve_report(uuid, text, text) from public, anon;
grant execute on function public.admin_resolve_report(uuid, text, text) to authenticated;
