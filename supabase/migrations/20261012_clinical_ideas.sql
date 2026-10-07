-- 臨床アイデア（PTが自分のリハビリのアイデアを登録し、PT・学生が読める）
--  - 疾患の中身（評価・編集部のアイデア）はコード側（src/content/ideas）に持ち、ここには「PTの投稿」と「反応」だけ置く
--  - 読めるのは PT・学生のアカウントだけ。投稿できるのは PT のアカウントだけ
--  - 他人の投稿は、表に直接はさわらせず、RPC（list_clinical_ideas など）経由で返す。匿名の投稿は投稿者の user_id を返さない
--  - 反応: いいね・保存・実践した

-- =========================================================
-- 1. 読む資格の確認
-- =========================================================
create or replace function public.clinical_reader()
returns boolean
language sql stable security definer set search_path = ''
as $f$
  select exists (
    select 1 from public.users u
    where u.id = (select auth.uid()) and u.account_type in ('pt', 'student')
  );
$f$;
revoke execute on function public.clinical_reader() from public, anon;
grant execute on function public.clinical_reader() to authenticated;

create or replace function public.clinical_author()
returns boolean
language sql stable security definer set search_path = ''
as $f$
  select exists (
    select 1 from public.users u
    where u.id = (select auth.uid()) and u.account_type = 'pt'
  );
$f$;
revoke execute on function public.clinical_author() from public, anon;
grant execute on function public.clinical_author() to authenticated;

-- =========================================================
-- 2. 投稿
-- =========================================================
create table if not exists public.clinical_ideas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  topic_slug text not null check (char_length(topic_slug) between 1 and 60),
  title text not null check (char_length(btrim(title)) between 2 and 80),
  goal text check (goal is null or char_length(goal) <= 200),
  phase text not null default 'any' check (phase in ('acute', 'recovery', 'chronic', 'outpatient', 'any')),
  method text not null check (char_length(btrim(method)) between 5 and 2000),
  points text check (points is null or char_length(points) <= 1000),
  patient_traits text check (patient_traits is null or char_length(patient_traits) <= 500),
  impressions text check (impressions is null or char_length(impressions) <= 1000),
  refs text check (refs is null or char_length(refs) <= 800),
  is_anonymous boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists clinical_ideas_topic_idx on public.clinical_ideas (topic_slug, created_at desc);
create index if not exists clinical_ideas_user_idx on public.clinical_ideas (user_id, created_at desc);

alter table public.clinical_ideas enable row level security;

revoke all on table public.clinical_ideas from public, anon, authenticated;
grant select, insert, update, delete on table public.clinical_ideas to authenticated;
grant all on table public.clinical_ideas to service_role;

-- 自分の投稿だけ、表から直接読める（ほかの人の投稿は RPC 経由）
create policy clinical_ideas_select_own on public.clinical_ideas
  for select to authenticated using (user_id = (select auth.uid()));
create policy clinical_ideas_insert_own on public.clinical_ideas
  for insert to authenticated
  with check (user_id = (select auth.uid()) and public.clinical_author());
create policy clinical_ideas_update_own on public.clinical_ideas
  for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()) and public.clinical_author());
create policy clinical_ideas_delete_own on public.clinical_ideas
  for delete to authenticated using (user_id = (select auth.uid()));

-- 1日に投稿できる数を制限（荒らし・連投の防止）
create or replace function public.clinical_ideas_limit()
returns trigger
language plpgsql security definer set search_path = ''
as $f$
begin
  if (select count(*) from public.clinical_ideas
       where user_id = new.user_id and created_at > now() - interval '1 day') >= 20 then
    raise exception '1日に投稿できるアイデアは20件までです';
  end if;
  return new;
end
$f$;
drop trigger if exists clinical_ideas_limit_trg on public.clinical_ideas;
create trigger clinical_ideas_limit_trg before insert on public.clinical_ideas
  for each row execute function public.clinical_ideas_limit();

create or replace function public.clinical_ideas_touch()
returns trigger
language plpgsql set search_path = ''
as $f$
begin
  new.updated_at := now();
  return new;
end
$f$;
drop trigger if exists clinical_ideas_touch_trg on public.clinical_ideas;
create trigger clinical_ideas_touch_trg before update on public.clinical_ideas
  for each row execute function public.clinical_ideas_touch();

-- =========================================================
-- 3. 反応（いいね・保存・実践した）
-- =========================================================
create table if not exists public.clinical_idea_reactions (
  idea_id uuid not null references public.clinical_ideas (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  kind text not null check (kind in ('like', 'save', 'practiced')),
  created_at timestamptz not null default now(),
  primary key (idea_id, user_id, kind)
);

alter table public.clinical_idea_reactions enable row level security;
revoke all on table public.clinical_idea_reactions from public, anon, authenticated;
grant select on table public.clinical_idea_reactions to authenticated;
grant all on table public.clinical_idea_reactions to service_role;

create policy clinical_idea_reactions_select_own on public.clinical_idea_reactions
  for select to authenticated using (user_id = (select auth.uid()));

-- 反応のオン・オフ（戻り値: 今、オンかどうか）
create or replace function public.toggle_idea_reaction(p_idea uuid, p_kind text)
returns boolean
language plpgsql security definer set search_path = ''
as $f$
declare
  v_uid uuid := (select auth.uid());
begin
  if v_uid is null or not public.clinical_reader() then
    raise exception 'ログインしてください';
  end if;
  if p_kind not in ('like', 'save', 'practiced') then
    raise exception 'bad kind';
  end if;
  if not exists (select 1 from public.clinical_ideas where id = p_idea) then
    raise exception 'not found';
  end if;

  if exists (select 1 from public.clinical_idea_reactions where idea_id = p_idea and user_id = v_uid and kind = p_kind) then
    delete from public.clinical_idea_reactions where idea_id = p_idea and user_id = v_uid and kind = p_kind;
    return false;
  end if;

  insert into public.clinical_idea_reactions (idea_id, user_id, kind) values (p_idea, v_uid, p_kind);
  return true;
end
$f$;
revoke execute on function public.toggle_idea_reaction(uuid, text) from public, anon;
grant execute on function public.toggle_idea_reaction(uuid, text) to authenticated;

-- =========================================================
-- 4. 一覧（投稿者は、匿名でなければ名前・資格・経験を返す。匿名なら user_id も名前も返さない）
-- =========================================================
create or replace function public.list_clinical_ideas(
  p_topic text default null,
  p_sort text default 'new',
  p_saved_only boolean default false,
  p_limit int default 50
)
returns table (
  id uuid, topic_slug text, title text, goal text, phase text, method text, points text,
  patient_traits text, impressions text, refs text, is_anonymous boolean, created_at timestamptz,
  author_id uuid, author_name text, author_qualification text, author_experience int,
  is_mine boolean,
  like_count bigint, save_count bigint, practiced_count bigint,
  my_like boolean, my_save boolean, my_practiced boolean
)
language sql stable security definer set search_path = ''
as $f$
  with me as (select (select auth.uid()) as uid),
  base as (
    select
      i.*,
      (select count(*) from public.clinical_idea_reactions r where r.idea_id = i.id and r.kind = 'like') as lc,
      (select count(*) from public.clinical_idea_reactions r where r.idea_id = i.id and r.kind = 'save') as sc,
      (select count(*) from public.clinical_idea_reactions r where r.idea_id = i.id and r.kind = 'practiced') as pc,
      exists (select 1 from public.clinical_idea_reactions r, me where r.idea_id = i.id and r.user_id = me.uid and r.kind = 'like') as ml,
      exists (select 1 from public.clinical_idea_reactions r, me where r.idea_id = i.id and r.user_id = me.uid and r.kind = 'save') as ms,
      exists (select 1 from public.clinical_idea_reactions r, me where r.idea_id = i.id and r.user_id = me.uid and r.kind = 'practiced') as mp
    from public.clinical_ideas i
    where public.clinical_reader()
      and (p_topic is null or i.topic_slug = p_topic)
  )
  select
    b.id, b.topic_slug, b.title, b.goal, b.phase, b.method, b.points, b.patient_traits, b.impressions, b.refs,
    b.is_anonymous, b.created_at,
    case when b.is_anonymous then null else b.user_id end,
    case when b.is_anonymous then null else p.full_name end,
    case when b.is_anonymous then null else p.qualification end,
    case when b.is_anonymous then null else p.experience_years::int end,
    (b.user_id = (select uid from me)),
    b.lc, b.sc, b.pc, b.ml, b.ms, b.mp
  from base b
  left join public.pt_profiles p on p.user_id = b.user_id
  where (not coalesce(p_saved_only, false)) or b.ms
  order by
    case when p_sort = 'popular' then (b.pc * 3 + b.sc * 2 + b.lc) end desc nulls last,
    b.created_at desc
  limit least(greatest(coalesce(p_limit, 50), 1), 100);
$f$;
revoke execute on function public.list_clinical_ideas(text, text, boolean, int) from public, anon;
grant execute on function public.list_clinical_ideas(text, text, boolean, int) to authenticated;

-- 疾患ごとの、みんなのアイデアの件数
create or replace function public.clinical_idea_counts()
returns table (topic_slug text, n bigint)
language sql stable security definer set search_path = ''
as $f$
  select i.topic_slug, count(*) from public.clinical_ideas i
  where public.clinical_reader()
  group by i.topic_slug;
$f$;
revoke execute on function public.clinical_idea_counts() from public, anon;
grant execute on function public.clinical_idea_counts() to authenticated;

-- =========================================================
-- 5. 通報の対象に追加
-- =========================================================
alter table public.reports drop constraint if exists reports_target_type_check;
alter table public.reports
  add constraint reports_target_type_check
  check (target_type in ('post', 'comment', 'message', 'group_message', 'hospital_review',
                         'internship_review', 'student_question', 'student_answer', 'exam_note',
                         'quiz_question', 'clinical_idea'));

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
      when 'quiz_question' then (select '第' || qq.exam_no || '回 ' || case qq.session when 'am' then '午前' else '午後' end || qq.no || ' ' || qq.stem from public.quiz_questions qq where qq.id = r.target_id)
      when 'clinical_idea' then (select ci.title || ' ' || ci.method from public.clinical_ideas ci where ci.id = r.target_id)
      when 'exam_note' then (select coalesce(n.tendency, '') || ' ' || coalesce(n.recalled, '') || case when n.file_path is not null then ' [添付ファイルあり: ' || coalesce(n.file_name, '') || ']' else '' end from public.exam_notes n where n.id = r.target_id)
    end, 300),
    case r.target_type
      when 'post' then '/posts/' || r.target_id::text
      when 'comment' then (select '/posts/' || c.post_id::text from public.comments c where c.id = r.target_id)
      when 'hospital_review' then (select '/hospitals/' || h.hospital_id::text from public.hospital_reviews h where h.id = r.target_id)
      when 'internship_review' then (select '/hospitals/' || i.hospital_id::text from public.internship_reviews i where i.id = r.target_id)
      when 'student_question' then '/student/questions/' || r.target_id::text
      when 'student_answer' then (select '/student/questions/' || sa.question_id::text from public.student_answers sa where sa.id = r.target_id)
      when 'quiz_question' then '/student/quiz'
      when 'clinical_idea' then (select '/ideas/' || ci.topic_slug from public.clinical_ideas ci where ci.id = r.target_id)
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
      when 'clinical_idea' then delete from public.clinical_ideas where id = r.target_id;
      when 'quiz_question' then null;
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
