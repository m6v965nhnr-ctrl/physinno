-- 学生アカウント(理学療法士をめざす学生)
--  - アカウント種別 'student' を追加し、卒業予定年を入れておくと卒業後(4月1日)に自動で 'pt' へ切り替わる
--  - 実習・就活トラッカー / 国試の学習ログ / 実習先の口コミ / 先輩に質問
--  - 通報の対象に、実習先の口コミ・質問・回答を追加
--  - 病院に診療科・病床数の列を追加(学生の病院探し用)

-- =========================================================
-- 1. アカウント種別 'student'
-- =========================================================
alter table public.users drop constraint if exists users_account_type_check;
alter table public.users
  add constraint users_account_type_check
  check (account_type is null or account_type in ('pt', 'general', 'student'));

-- 学生のプロフィール(名前など)は pt_profiles に置く(コメント・メッセージで名前を表示するため)。
-- ただし is_student の行は、ログインしていない人には見せない・PT検索には出さない。
alter table public.pt_profiles
  add column if not exists is_student boolean not null default false;

drop policy if exists "Allow public read pt_profiles" on public.pt_profiles;
create policy "Allow public read pt_profiles" on public.pt_profiles
  for select to anon using (is_student = false);

-- is_student は、アカウント種別から必ず決まるようにする(本人が書き換えて公開側に出ることを防ぐ)
create or replace function public.trg_pt_profiles_set_student()
returns trigger
language plpgsql security definer set search_path = ''
as $f$
begin
  new.is_student := coalesce(
    (select u.account_type = 'student' from public.users u where u.id = new.user_id),
    false
  );
  return new;
end
$f$;
revoke all on function public.trg_pt_profiles_set_student() from public, anon, authenticated;

drop trigger if exists pt_profiles_set_student on public.pt_profiles;
create trigger pt_profiles_set_student
  before insert or update on public.pt_profiles
  for each row execute function public.trg_pt_profiles_set_student();

-- =========================================================
-- 2. 学生の非公開情報(養成校・卒業予定年・国試日)
-- =========================================================
create table if not exists public.student_profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  school_name text check (char_length(school_name) <= 100),
  graduation_year integer not null check (graduation_year between 2000 and 2100),
  national_exam_date date,
  graduated_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.student_profiles enable row level security;

create policy student_profiles_select_own on public.student_profiles
  for select to authenticated using (user_id = (select auth.uid()));
create policy student_profiles_insert_own on public.student_profiles
  for insert to authenticated with check (user_id = (select auth.uid()));
create policy student_profiles_update_own on public.student_profiles
  for update to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));

revoke all on table public.student_profiles from public, anon, authenticated;
grant select on table public.student_profiles to authenticated;
grant update (school_name, graduation_year, national_exam_date, updated_at) on table public.student_profiles to authenticated;
grant all on table public.student_profiles to service_role;

-- 登録時のトリガー(学生なら student_profiles も作る)
create or replace function public.handle_new_user()
returns trigger
language plpgsql security definer set search_path = ''
as $f$
declare
  v_type text := new.raw_user_meta_data ->> 'account_type';
  v_ref_raw text := new.raw_user_meta_data ->> 'referred_by';
  v_ref uuid;
  v_year integer;
  v_now_jst timestamp := now() at time zone 'Asia/Tokyo';
  v_min_year integer;
begin
  begin
    v_ref := v_ref_raw::uuid;
  exception when others then
    v_ref := null;
  end;

  if v_ref is not null and v_ref = new.id then
    v_ref := null;
  end if;

  if v_ref is not null and not exists (select 1 from public.users where id = v_ref) then
    v_ref := null;
  end if;

  insert into public.users (id, email, account_type, referred_by)
  values (
    new.id,
    new.email,
    case when v_type in ('pt', 'general', 'student') then v_type else null end,
    v_ref
  )
  on conflict (id) do nothing;

  -- 学生: 卒業予定年(3月卒業の年)を保存。範囲外・未入力なら、いちばん近い卒業年にする
  if v_type = 'student' then
    v_min_year := extract(year from v_now_jst)::integer + case when extract(month from v_now_jst) <= 3 then 0 else 1 end;
    begin
      v_year := nullif(new.raw_user_meta_data ->> 'graduation_year', '')::integer;
    exception when others then
      v_year := null;
    end;
    if v_year is null or v_year < v_min_year or v_year > v_min_year + 8 then
      v_year := v_min_year;
    end if;

    insert into public.student_profiles (user_id, graduation_year)
    values (new.id, v_year)
    on conflict (user_id) do nothing;
  end if;

  -- 招待経由の登録は、招待した人・された人を自動で相互フォローにする
  if v_ref is not null then
    insert into public.follows (following_user, followed_user)
    select new.id, v_ref
    where not exists (
      select 1 from public.follows
      where following_user = new.id and followed_user = v_ref
    );

    insert into public.follows (following_user, followed_user)
    select v_ref, new.id
    where not exists (
      select 1 from public.follows
      where following_user = v_ref and followed_user = new.id
    );

    insert into public.notifications (user_id, actor_id, type, is_read)
    values
      (v_ref, new.id, 'follow', false),
      (new.id, v_ref, 'follow', false);
  end if;

  return new;
end;
$f$;

-- 一般・未設定のアカウントを学生にする(PTは学生に戻れない)
create or replace function public.become_student(p_graduation_year integer, p_school text default null)
returns text
language plpgsql security definer set search_path = ''
as $f$
declare
  v_uid uuid := auth.uid();
  v_type text;
  v_now_jst timestamp := now() at time zone 'Asia/Tokyo';
  v_min_year integer;
begin
  if v_uid is null then
    raise exception 'ログインしてください';
  end if;

  select account_type into v_type from public.users where id = v_uid;
  if v_type = 'pt' then
    raise exception 'PTのアカウントは学生に変更できません';
  end if;

  v_min_year := extract(year from v_now_jst)::integer + case when extract(month from v_now_jst) <= 3 then 0 else 1 end;
  if p_graduation_year is null or p_graduation_year < v_min_year or p_graduation_year > v_min_year + 8 then
    raise exception '卒業予定年が正しくありません';
  end if;

  insert into public.users (id, email, account_type)
  select v_uid, a.email, 'student' from auth.users a where a.id = v_uid
  on conflict (id) do update set account_type = 'student', updated_at = now();

  insert into public.student_profiles (user_id, school_name, graduation_year)
  values (v_uid, nullif(btrim(p_school), ''), p_graduation_year)
  on conflict (user_id) do update
    set school_name = excluded.school_name, graduation_year = excluded.graduation_year,
        graduated_at = null, updated_at = now();

  update public.pt_profiles set is_student = true where user_id = v_uid;

  return 'student';
end
$f$;
revoke execute on function public.become_student(integer, text) from public, anon;
grant execute on function public.become_student(integer, text) to authenticated;

-- 学生 → PT は手動でも切り替えられる(早めに免許を取った場合など)。学生は一般に変更できない
create or replace function public.set_my_account_type(p_type text)
returns text
language plpgsql security definer set search_path = ''
as $f$
declare
  v_uid uuid := auth.uid();
  v_current text;
begin
  if v_uid is null then
    raise exception 'ログインしてください';
  end if;

  if p_type not in ('pt', 'general') then
    raise exception 'アカウントの種類が正しくありません';
  end if;

  select account_type into v_current from public.users where id = v_uid;

  if p_type = 'general' and v_current = 'student' then
    raise exception '学生のアカウントは、一般アカウントには変更できません';
  end if;

  if p_type = 'general' and exists (
    select 1 from public.pt_profiles where user_id = v_uid
  ) then
    raise exception 'PTプロフィールがあるため、一般アカウントには変更できません';
  end if;

  insert into public.users (id, email, account_type)
  select v_uid, a.email, p_type from auth.users a where a.id = v_uid
  on conflict (id) do update
    set account_type = excluded.account_type,
        updated_at = now();

  if v_current = 'student' and p_type = 'pt' then
    update public.pt_profiles set is_student = false where user_id = v_uid;
    update public.student_profiles set graduated_at = now() where user_id = v_uid;
  end if;

  return p_type;
end;
$f$;

-- 卒業(翌4月1日・日本時間)を過ぎた学生を PT に切り替える。p_user を指定するとその人だけ
create or replace function public.graduate_students(p_user uuid default null)
returns integer
language plpgsql security definer set search_path = ''
as $f$
declare
  v_ids uuid[];
begin
  select coalesce(array_agg(sp.user_id), '{}')
    into v_ids
    from public.student_profiles sp
    join public.users u on u.id = sp.user_id
    where u.account_type = 'student'
      and make_date(sp.graduation_year, 4, 1) <= (now() at time zone 'Asia/Tokyo')::date
      and (p_user is null or sp.user_id = p_user);

  if array_length(v_ids, 1) is null then
    return 0;
  end if;

  update public.users set account_type = 'pt', updated_at = now() where id = any (v_ids);
  update public.pt_profiles set is_student = false where user_id = any (v_ids);
  update public.student_profiles set graduated_at = now() where user_id = any (v_ids);

  insert into public.notifications (user_id, actor_id, type, is_read)
  select id, id, 'graduated', false from unnest(v_ids) as id;

  return array_length(v_ids, 1);
end
$f$;
revoke all on function public.graduate_students(uuid) from public, anon, authenticated;

create or replace function public.graduate_due_students()
returns integer
language sql security definer set search_path = ''
as $f$ select public.graduate_students(null); $f$;
revoke all on function public.graduate_due_students() from public, anon, authenticated;

-- ログイン時に呼ぶ: 自分が卒業済みなら、その場で PT に切り替えて、現在の種類を返す
create or replace function public.sync_my_account_type()
returns text
language plpgsql security definer set search_path = ''
as $f$
declare
  v_uid uuid := auth.uid();
begin
  if v_uid is null then
    return null;
  end if;
  perform public.graduate_students(v_uid);
  return (select account_type from public.users where id = v_uid);
end
$f$;
revoke execute on function public.sync_my_account_type() from public, anon;
grant execute on function public.sync_my_account_type() to authenticated;

-- 毎日 0:10(日本時間)にも実行する
select cron.schedule('graduate-students', '10 15 * * *', 'select public.graduate_due_students()');

-- 研修・学会情報は、学生も読める
drop policy if exists "pt users can read seminars" on public.seminars;
create policy "pt users can read seminars" on public.seminars
  for select to authenticated
  using (exists (
    select 1 from public.users u
    where u.id = (select auth.uid()) and u.account_type in ('pt', 'student')
  ));

-- =========================================================
-- 3. 実習・就活トラッカー
-- =========================================================
create table if not exists public.student_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  kind text not null check (kind in ('practicum', 'job', 'task')),
  status text not null check (status in (
    'planned', 'ongoing', 'done',
    'interested', 'visit_booked', 'visited', 'applied', 'interview', 'offer', 'declined',
    'todo'
  )),
  title text not null check (char_length(title) between 1 and 120),
  hospital_id uuid references public.hospitals (id) on delete set null,
  practicum_type text check (practicum_type in ('observation', 'evaluation', 'comprehensive', 'other')),
  starts_on date,
  ends_on date,
  due_on date,
  memo text check (char_length(memo) <= 2000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists student_items_user_kind_idx on public.student_items (user_id, kind, due_on);

alter table public.student_items enable row level security;
create policy student_items_own on public.student_items
  for all to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));

revoke all on table public.student_items from public, anon, authenticated;
grant select, insert, update, delete on table public.student_items to authenticated;
grant all on table public.student_items to service_role;

-- =========================================================
-- 4. 国試の学習ログ
-- =========================================================
create table if not exists public.study_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  studied_on date not null default current_date,
  subject text not null check (char_length(subject) between 1 and 40),
  minutes integer not null check (minutes between 1 and 1440),
  confidence smallint check (confidence between 1 and 5),
  memo text check (char_length(memo) <= 500),
  created_at timestamptz not null default now()
);
create index if not exists study_logs_user_date_idx on public.study_logs (user_id, studied_on desc);

alter table public.study_logs enable row level security;
create policy study_logs_own on public.study_logs
  for all to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));

revoke all on table public.study_logs from public, anon, authenticated;
grant select, insert, update, delete on table public.study_logs to authenticated;
grant all on table public.study_logs to service_role;

-- =========================================================
-- 5. 実習先の口コミ(実習生の声)。投稿者は表示しない
-- =========================================================
create table if not exists public.internship_reviews (
  id uuid primary key default gen_random_uuid(),
  hospital_id uuid not null references public.hospitals (id) on delete cascade,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  practicum_type text not null check (practicum_type in ('observation', 'evaluation', 'comprehensive', 'other')),
  practicum_year integer check (practicum_year between 2000 and 2100),
  guidance smallint not null check (guidance between 1 and 10),
  workload smallint not null check (workload between 1 and 10),
  sleep smallint not null check (sleep between 1 and 10),
  access smallint not null check (access between 1 and 10),
  learning smallint not null check (learning between 1 and 10),
  atmosphere smallint not null check (atmosphere between 1 and 10),
  comment text check (char_length(comment) <= 2000),
  created_at timestamptz not null default now(),
  unique (user_id, hospital_id)
);
create index if not exists internship_reviews_hospital_idx on public.internship_reviews (hospital_id, created_at desc);

alter table public.internship_reviews enable row level security;

create policy internship_reviews_insert_student on public.internship_reviews
  for insert to authenticated
  with check (
    user_id = (select auth.uid())
    and exists (select 1 from public.users u where u.id = (select auth.uid()) and u.account_type = 'student')
  );
create policy internship_reviews_select_own on public.internship_reviews
  for select to authenticated using (user_id = (select auth.uid()));
create policy internship_reviews_update_own on public.internship_reviews
  for update to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy internship_reviews_delete_own on public.internship_reviews
  for delete to authenticated using (user_id = (select auth.uid()));

revoke all on table public.internship_reviews from public, anon, authenticated;
grant select, delete on table public.internship_reviews to authenticated;
grant insert (hospital_id, practicum_type, practicum_year, guidance, workload, sleep, access, learning, atmosphere, comment)
  on table public.internship_reviews to authenticated;
grant update (practicum_type, practicum_year, guidance, workload, sleep, access, learning, atmosphere, comment)
  on table public.internship_reviews to authenticated;
grant all on table public.internship_reviews to service_role;

-- PT・学生だけが読める(一般の方・ログインしていない人には出さない)。投稿者のIDは返さない
create or replace function public.get_internship_reviews(p_hospital_id uuid)
returns table (
  id uuid, practicum_type text, practicum_year integer,
  guidance smallint, workload smallint, sleep smallint, access smallint, learning smallint, atmosphere smallint,
  comment text, created_at timestamptz, is_mine boolean
)
language sql stable security definer set search_path = ''
as $f$
  select r.id, r.practicum_type, r.practicum_year,
         r.guidance, r.workload, r.sleep, r.access, r.learning, r.atmosphere,
         r.comment, r.created_at, (r.user_id = (select auth.uid()))
  from public.internship_reviews r
  where r.hospital_id = p_hospital_id
    and exists (select 1 from public.users u where u.id = (select auth.uid()) and u.account_type in ('pt', 'student'))
  order by r.created_at desc;
$f$;
revoke execute on function public.get_internship_reviews(uuid) from public, anon;
grant execute on function public.get_internship_reviews(uuid) to authenticated;

create or replace function public.internship_review_counts(p_ids uuid[])
returns table (hospital_id uuid, review_count bigint)
language sql stable security definer set search_path = ''
as $f$
  select r.hospital_id, count(*)
  from public.internship_reviews r
  where r.hospital_id = any (p_ids)
    and exists (select 1 from public.users u where u.id = (select auth.uid()) and u.account_type in ('pt', 'student'))
  group by r.hospital_id;
$f$;
revoke execute on function public.internship_review_counts(uuid[]) from public, anon;
grant execute on function public.internship_review_counts(uuid[]) to authenticated;

-- =========================================================
-- 6. 先輩に質問(学生が質問、PTが回答)
-- =========================================================
create table if not exists public.student_questions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  category text not null check (category in ('practicum', 'exam', 'job', 'career', 'other')),
  title text not null check (char_length(title) between 1 and 100),
  body text not null check (char_length(body) between 1 and 3000),
  hospital_id uuid references public.hospitals (id) on delete set null,
  is_anonymous boolean not null default true,
  created_at timestamptz not null default now()
);
create index if not exists student_questions_created_idx on public.student_questions (created_at desc);

create table if not exists public.student_answers (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.student_questions (id) on delete cascade,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  body text not null check (char_length(body) between 1 and 3000),
  created_at timestamptz not null default now()
);
create index if not exists student_answers_question_idx on public.student_answers (question_id, created_at);

alter table public.student_questions enable row level security;
alter table public.student_answers enable row level security;

create policy student_questions_insert_student on public.student_questions
  for insert to authenticated
  with check (
    user_id = (select auth.uid())
    and exists (select 1 from public.users u where u.id = (select auth.uid()) and u.account_type = 'student')
  );
create policy student_questions_select_own on public.student_questions
  for select to authenticated using (user_id = (select auth.uid()));
create policy student_questions_delete_own on public.student_questions
  for delete to authenticated using (user_id = (select auth.uid()));

-- 回答できるのは、PT または その質問をした本人(追加の補足)
create or replace function public.can_answer_question(p_question uuid)
returns boolean
language sql stable security definer set search_path = ''
as $f$
  select exists (
    select 1 from public.users u
    where u.id = (select auth.uid())
      and (
        u.account_type = 'pt'
        or exists (select 1 from public.student_questions q where q.id = p_question and q.user_id = u.id)
      )
  );
$f$;
revoke execute on function public.can_answer_question(uuid) from public, anon;
grant execute on function public.can_answer_question(uuid) to authenticated;

create policy student_answers_insert on public.student_answers
  for insert to authenticated
  with check (user_id = (select auth.uid()) and public.can_answer_question(question_id));
create policy student_answers_select_own on public.student_answers
  for select to authenticated using (user_id = (select auth.uid()));
create policy student_answers_delete_own on public.student_answers
  for delete to authenticated using (user_id = (select auth.uid()));

revoke all on table public.student_questions from public, anon, authenticated;
revoke all on table public.student_answers from public, anon, authenticated;
grant select, delete on table public.student_questions to authenticated;
grant insert (category, title, body, hospital_id, is_anonymous) on table public.student_questions to authenticated;
grant select, delete on table public.student_answers to authenticated;
grant insert (question_id, body) on table public.student_answers to authenticated;
grant all on table public.student_questions to service_role;
grant all on table public.student_answers to service_role;

-- 質問の一覧(PT・学生のみ)。匿名の質問は投稿者を返さない
create or replace function public.list_student_questions(
  p_category text default null, p_limit integer default 30, p_offset integer default 0
)
returns table (
  id uuid, category text, title text, body_preview text, hospital_id uuid, hospital_name text,
  author_id uuid, author_name text, answer_count bigint, created_at timestamptz, is_mine boolean
)
language sql stable security definer set search_path = ''
as $f$
  select q.id, q.category, q.title, left(q.body, 160), q.hospital_id, h.name,
         case when q.is_anonymous then null else q.user_id end,
         case when q.is_anonymous then null else (select p.full_name from public.pt_profiles p where p.user_id = q.user_id limit 1) end,
         (select count(*) from public.student_answers a where a.question_id = q.id),
         q.created_at, (q.user_id = (select auth.uid()))
  from public.student_questions q
  left join public.hospitals h on h.id = q.hospital_id
  where exists (select 1 from public.users u where u.id = (select auth.uid()) and u.account_type in ('pt', 'student'))
    and (p_category is null or q.category = p_category)
  order by q.created_at desc
  limit least(greatest(p_limit, 1), 100) offset greatest(p_offset, 0);
$f$;
revoke execute on function public.list_student_questions(text, integer, integer) from public, anon;
grant execute on function public.list_student_questions(text, integer, integer) to authenticated;

create or replace function public.get_student_question(p_id uuid)
returns table (
  id uuid, category text, title text, body text, hospital_id uuid, hospital_name text,
  author_id uuid, author_name text, created_at timestamptz, is_mine boolean
)
language sql stable security definer set search_path = ''
as $f$
  select q.id, q.category, q.title, q.body, q.hospital_id, h.name,
         case when q.is_anonymous then null else q.user_id end,
         case when q.is_anonymous then null else (select p.full_name from public.pt_profiles p where p.user_id = q.user_id limit 1) end,
         q.created_at, (q.user_id = (select auth.uid()))
  from public.student_questions q
  left join public.hospitals h on h.id = q.hospital_id
  where q.id = p_id
    and exists (select 1 from public.users u where u.id = (select auth.uid()) and u.account_type in ('pt', 'student'));
$f$;
revoke execute on function public.get_student_question(uuid) from public, anon;
grant execute on function public.get_student_question(uuid) to authenticated;

create or replace function public.list_student_answers(p_question_id uuid)
returns table (
  id uuid, body text, created_at timestamptz, author_id uuid, author_name text,
  author_is_pt boolean, is_mine boolean, is_asker boolean
)
language sql stable security definer set search_path = ''
as $f$
  select a.id, a.body, a.created_at, a.user_id,
         (select p.full_name from public.pt_profiles p where p.user_id = a.user_id limit 1),
         coalesce((select u2.account_type = 'pt' from public.users u2 where u2.id = a.user_id), false),
         (a.user_id = (select auth.uid())),
         (a.user_id = q.user_id)
  from public.student_answers a
  join public.student_questions q on q.id = a.question_id
  where a.question_id = p_question_id
    and exists (select 1 from public.users u where u.id = (select auth.uid()) and u.account_type in ('pt', 'student'))
  order by a.created_at;
$f$;
revoke execute on function public.list_student_answers(uuid) from public, anon;
grant execute on function public.list_student_answers(uuid) to authenticated;

-- 回答が付いたら、質問した人に通知(質問が匿名でも、質問者のIDは回答者に渡さずDB内で処理する)
alter table public.notifications add column if not exists question_id uuid;

create or replace function public.trg_student_answers_notify()
returns trigger
language plpgsql security definer set search_path = ''
as $f$
declare
  v_owner uuid;
begin
  select user_id into v_owner from public.student_questions where id = new.question_id;
  if v_owner is not null and v_owner <> new.user_id then
    insert into public.notifications (user_id, actor_id, type, question_id, is_read)
    values (v_owner, new.user_id, 'answer', new.question_id, false);
  end if;
  return new;
end
$f$;
revoke all on function public.trg_student_answers_notify() from public, anon, authenticated;

drop trigger if exists student_answers_notify on public.student_answers;
create trigger student_answers_notify
  after insert on public.student_answers
  for each row execute function public.trg_student_answers_notify();

-- 回答の通知はメールでも知らせる
create or replace function public.trg_notifications_email()
returns trigger
language plpgsql security definer set search_path = ''
as $f$
begin
  if new.type in ('comment', 'follow', 'answer') then
    perform public.queue_email(new.user_id, new.actor_id, new.type);
  end if;
  return new;
end
$f$;
revoke all on function public.trg_notifications_email() from public, anon, authenticated;

-- =========================================================
-- 7. 通報の対象を追加
-- =========================================================
alter table public.reports drop constraint if exists reports_target_type_check;
alter table public.reports
  add constraint reports_target_type_check
  check (target_type in ('post', 'comment', 'message', 'group_message', 'hospital_review',
                         'internship_review', 'student_question', 'student_answer'));

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
    end, 300),
    case r.target_type
      when 'post' then '/posts/' || r.target_id::text
      when 'comment' then (select '/posts/' || c.post_id::text from public.comments c where c.id = r.target_id)
      when 'hospital_review' then (select '/hospitals/' || h.hospital_id::text from public.hospital_reviews h where h.id = r.target_id)
      when 'internship_review' then (select '/hospitals/' || i.hospital_id::text from public.internship_reviews i where i.id = r.target_id)
      when 'student_question' then '/student/questions/' || r.target_id::text
      when 'student_answer' then (select '/student/questions/' || sa.question_id::text from public.student_answers sa where sa.id = r.target_id)
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
        -- 投稿に紐づくコメント・いいね・通知も一緒に消す(連動して消える設定がないため)
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

-- =========================================================
-- 8. 病院の診療科・病床数(学生の病院探し用)。値は別途、厚労省オープンデータから投入する
-- =========================================================
alter table public.hospitals
  add column if not exists departments text[],
  add column if not exists beds_general integer,
  add column if not exists beds_long_term integer,
  add column if not exists beds_psychiatric integer,
  add column if not exists beds_total integer;
create index if not exists hospitals_departments_idx on public.hospitals using gin (departments);
