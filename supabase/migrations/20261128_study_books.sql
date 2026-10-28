-- 参考書の進捗機能
--  - 先生が、クラスごとに「参考書」を作る。本の名前は先生の自由入力（出版社名・書名は書かない。本の中身は一切扱わない）
--  - 先生が、その本の「単元」を、名前とページ範囲（p.10〜p.25 など）で登録する。単元名も先生の自由入力
--  - 学生は、「今日はp.◯〜◯をやった」を記録する（ログ）。先生には、クラスの学生の「どこまで進んだか（最も進んだページ）」が見える
--  - 著作権メモ：ページ数・先生が決めた単元名はいずれも事実・短い語句で、本文・問題・解説・図はいっさい保存しない（リサーチ/2026-10-28_参考書進捗機能の著作権リスク.md）

create table if not exists public.study_books (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.quiz_classes (id) on delete cascade,
  teacher_id uuid not null references auth.users (id) on delete cascade,
  name text not null check (char_length(btrim(name)) between 1 and 80),
  total_pages integer check (total_pages is null or total_pages > 0),
  archived boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists study_books_class_idx on public.study_books (class_id);

create table if not exists public.study_book_units (
  id uuid primary key default gen_random_uuid(),
  book_id uuid not null references public.study_books (id) on delete cascade,
  name text not null check (char_length(btrim(name)) between 1 and 60),
  page_start integer not null check (page_start > 0),
  page_end integer not null check (page_end >= page_start),
  sort integer not null default 0,
  created_at timestamptz not null default now()
);
create index if not exists study_book_units_book_idx on public.study_book_units (book_id, sort);

create table if not exists public.study_book_logs (
  id uuid primary key default gen_random_uuid(),
  book_id uuid not null references public.study_books (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  page_start integer not null check (page_start > 0),
  page_end integer not null check (page_end >= page_start),
  studied_on date not null default current_date,
  created_at timestamptz not null default now()
);
create index if not exists study_book_logs_book_user_idx on public.study_book_logs (book_id, user_id, studied_on desc);

alter table public.study_books enable row level security;
alter table public.study_book_units enable row level security;
alter table public.study_book_logs enable row level security;
revoke all on table public.study_books, public.study_book_units, public.study_book_logs from public, anon, authenticated;
grant all on table public.study_books, public.study_book_units, public.study_book_logs to service_role;

-- =========================================================
-- 先生: 参考書・単元の作成と管理
-- =========================================================
create or replace function public.study_create_book(p_class uuid, p_name text, p_total_pages integer)
returns uuid
language plpgsql security definer set search_path = ''
as $f$
declare
  v_id uuid;
begin
  if public.quiz_class_role(p_class) <> 'teacher' then
    raise exception 'teacher only';
  end if;
  if nullif(btrim(coalesce(p_name, '')), '') is null then
    raise exception 'name required';
  end if;
  insert into public.study_books (class_id, teacher_id, name, total_pages)
  values (p_class, (select auth.uid()), left(btrim(p_name), 80), p_total_pages)
  returning id into v_id;
  return v_id;
end
$f$;
revoke execute on function public.study_create_book(uuid, text, integer) from public, anon;
grant execute on function public.study_create_book(uuid, text, integer) to authenticated;

create or replace function public.study_archive_book(p_book uuid, p_archived boolean)
returns void
language sql security definer set search_path = ''
as $f$
  update public.study_books set archived = coalesce(p_archived, true)
  where id = p_book and teacher_id = (select auth.uid());
$f$;
revoke execute on function public.study_archive_book(uuid, boolean) from public, anon;
grant execute on function public.study_archive_book(uuid, boolean) to authenticated;

create or replace function public.study_add_unit(p_book uuid, p_name text, p_page_start integer, p_page_end integer)
returns uuid
language plpgsql security definer set search_path = ''
as $f$
declare
  v_id uuid;
  v_sort integer;
begin
  if not exists (select 1 from public.study_books b where b.id = p_book and b.teacher_id = (select auth.uid())) then
    raise exception 'not found';
  end if;
  if nullif(btrim(coalesce(p_name, '')), '') is null then
    raise exception 'name required';
  end if;
  if p_page_start is null or p_page_end is null or p_page_start < 1 or p_page_end < p_page_start then
    raise exception 'bad page range';
  end if;
  select coalesce(max(sort), 0) + 1 into v_sort from public.study_book_units where book_id = p_book;
  insert into public.study_book_units (book_id, name, page_start, page_end, sort)
  values (p_book, left(btrim(p_name), 60), p_page_start, p_page_end, v_sort)
  returning id into v_id;
  return v_id;
end
$f$;
revoke execute on function public.study_add_unit(uuid, text, integer, integer) from public, anon;
grant execute on function public.study_add_unit(uuid, text, integer, integer) to authenticated;

create or replace function public.study_delete_unit(p_unit uuid)
returns void
language sql security definer set search_path = ''
as $f$
  delete from public.study_book_units u
  using public.study_books b
  where u.id = p_unit and u.book_id = b.id and b.teacher_id = (select auth.uid());
$f$;
revoke execute on function public.study_delete_unit(uuid) from public, anon;
grant execute on function public.study_delete_unit(uuid) to authenticated;

-- =========================================================
-- 先生・学生の両方: クラスの参考書・単元の一覧（内容は読むだけ）
-- =========================================================
create or replace function public.study_list_books(p_class uuid)
returns table (id uuid, name text, total_pages integer, archived boolean, unit_count integer, created_at timestamptz)
language sql stable security definer set search_path = ''
as $f$
  select b.id, b.name, b.total_pages, b.archived,
         (select count(*)::integer from public.study_book_units u where u.book_id = b.id),
         b.created_at
  from public.study_books b
  where b.class_id = p_class and public.quiz_class_role(p_class) is not null
  order by b.archived, b.created_at desc;
$f$;
revoke execute on function public.study_list_books(uuid) from public, anon;
grant execute on function public.study_list_books(uuid) to authenticated;

create or replace function public.study_list_units(p_book uuid)
returns table (id uuid, name text, page_start integer, page_end integer, sort integer)
language sql stable security definer set search_path = ''
as $f$
  select u.id, u.name, u.page_start, u.page_end, u.sort
  from public.study_book_units u
  join public.study_books b on b.id = u.book_id
  where u.book_id = p_book and public.quiz_class_role(b.class_id) is not null
  order by u.sort;
$f$;
revoke execute on function public.study_list_units(uuid) from public, anon;
grant execute on function public.study_list_units(uuid) to authenticated;

-- =========================================================
-- 学生: 進捗の記録
-- =========================================================
create or replace function public.study_add_log(p_book uuid, p_page_start integer, p_page_end integer, p_studied_on date)
returns uuid
language plpgsql security definer set search_path = ''
as $f$
declare
  v_class uuid;
  v_id uuid;
begin
  select class_id into v_class from public.study_books where id = p_book;
  if v_class is null or public.quiz_class_role(v_class) is null then
    raise exception 'not found';
  end if;
  if p_page_start is null or p_page_end is null or p_page_start < 1 or p_page_end < p_page_start then
    raise exception 'bad page range';
  end if;
  insert into public.study_book_logs (book_id, user_id, page_start, page_end, studied_on)
  values (p_book, (select auth.uid()), p_page_start, p_page_end, coalesce(p_studied_on, current_date))
  returning id into v_id;
  return v_id;
end
$f$;
revoke execute on function public.study_add_log(uuid, integer, integer, date) from public, anon;
grant execute on function public.study_add_log(uuid, integer, integer, date) to authenticated;

create or replace function public.study_delete_log(p_log uuid)
returns void
language sql security definer set search_path = ''
as $f$
  delete from public.study_book_logs where id = p_log and user_id = (select auth.uid());
$f$;
revoke execute on function public.study_delete_log(uuid) from public, anon;
grant execute on function public.study_delete_log(uuid) to authenticated;

create or replace function public.study_my_logs(p_book uuid, p_limit integer default 30)
returns table (id uuid, page_start integer, page_end integer, studied_on date, created_at timestamptz)
language sql stable security definer set search_path = ''
as $f$
  select l.id, l.page_start, l.page_end, l.studied_on, l.created_at
  from public.study_book_logs l
  where l.book_id = p_book and l.user_id = (select auth.uid())
  order by l.studied_on desc, l.created_at desc
  limit least(greatest(coalesce(p_limit, 30), 1), 200);
$f$;
revoke execute on function public.study_my_logs(uuid, integer) from public, anon;
grant execute on function public.study_my_logs(uuid, integer) to authenticated;

create or replace function public.study_my_progress(p_book uuid)
returns table (furthest_page integer, last_studied_on date)
language sql stable security definer set search_path = ''
as $f$
  select max(l.page_end)::integer, max(l.studied_on)
  from public.study_book_logs l
  where l.book_id = p_book and l.user_id = (select auth.uid());
$f$;
revoke execute on function public.study_my_progress(uuid) from public, anon;
grant execute on function public.study_my_progress(uuid) to authenticated;

-- =========================================================
-- 先生: クラスの学生ごとの進捗（テストの結果と同じく、先生には常に見える。質問3の一問一答の共有設定とは別）
-- =========================================================
create or replace function public.study_teacher_progress(p_book uuid)
returns table (user_id uuid, name text, furthest_page integer, last_studied_on date, log_count integer)
language plpgsql security definer set search_path = ''
as $f$
declare
  v_class uuid;
begin
  select class_id into v_class from public.study_books where id = p_book and teacher_id = (select auth.uid());
  if v_class is null then
    raise exception 'not found';
  end if;
  return query
  select m.user_id,
         coalesce((select p.full_name from public.pt_profiles p where p.user_id = m.user_id limit 1), '（名前未設定）'),
         (select max(l.page_end)::integer from public.study_book_logs l where l.book_id = p_book and l.user_id = m.user_id),
         (select max(l.studied_on) from public.study_book_logs l where l.book_id = p_book and l.user_id = m.user_id),
         (select count(*)::integer from public.study_book_logs l where l.book_id = p_book and l.user_id = m.user_id)
  from public.quiz_class_members m
  where m.class_id = v_class
  order by 2;
end
$f$;
revoke execute on function public.study_teacher_progress(uuid) from public, anon;
grant execute on function public.study_teacher_progress(uuid) to authenticated;
