-- 過去問ドリル(理学療法士国家試験の一問一答)
-- 問題・正答は厚生労働省が公開している国家試験の問題(出典: 厚生労働省ホームページ、公共データ利用規約 PDL1.0)。
-- 画面から直接テーブルは読まず、関数(RPC)だけを通す。学生・PTのアカウントだけが使える。

-- =========================================================
-- 1. 単元
-- =========================================================
create table if not exists public.quiz_units (
  id text primary key,
  name text not null,
  field text not null,
  sort integer not null default 0
);

alter table public.quiz_units enable row level security;
revoke all on table public.quiz_units from public, anon, authenticated;
grant all on table public.quiz_units to service_role;

-- =========================================================
-- 2. 問題
-- =========================================================
create table if not exists public.quiz_questions (
  id uuid primary key default gen_random_uuid(),
  exam_no smallint not null,                       -- 第何回
  session text not null check (session in ('am', 'pm')),
  no smallint not null,                            -- 午前・午後それぞれの問題番号(1〜100)
  unit text not null references public.quiz_units (id),
  intro text not null default '',                  -- 「次の文により、2、3の問いに答えよ」の本文
  stem text not null,
  choices jsonb not null,                          -- 選択肢5つ(図の中にある場合は空文字)
  answers jsonb not null default '[]'::jsonb,      -- 正解として認める組。例 [[2],[3]] / 2つ選べは [[3,5]]
  need smallint not null default 1,                -- 選ぶ数
  excluded boolean not null default false,        -- 採点対象外(厚労省が除外した問題)
  image text,                                      -- 問題の図(/quiz/ 以下のパス)
  book_images jsonb not null default '[]'::jsonb,  -- 別冊の図
  choices_in_image boolean not null default false,
  explanation text,
  explanation_source text check (explanation_source in ('ai', 'official')),
  created_at timestamptz not null default now(),
  unique (exam_no, session, no)
);

create index if not exists quiz_questions_unit_idx on public.quiz_questions (unit);

alter table public.quiz_questions enable row level security;
revoke all on table public.quiz_questions from public, anon, authenticated;
grant all on table public.quiz_questions to service_role;

-- =========================================================
-- 3. 解答の記録(本人のみ)
-- =========================================================
create table if not exists public.quiz_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  question_id uuid not null references public.quiz_questions (id) on delete cascade,
  attempts integer not null default 0,
  correct_count integer not null default 0,
  last_correct boolean,
  last_choice jsonb,
  bookmarked boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (user_id, question_id)
);

alter table public.quiz_progress enable row level security;
revoke all on table public.quiz_progress from public, anon, authenticated;
grant all on table public.quiz_progress to service_role;

-- =========================================================
-- 4. 関数
-- =========================================================
create or replace function public.quiz_can_use()
returns boolean
language sql stable security definer set search_path = ''
as $f$
  select exists (
    select 1 from public.users u
    where u.id = (select auth.uid()) and u.account_type in ('student', 'pt')
  );
$f$;
revoke execute on function public.quiz_can_use() from public, anon;
grant execute on function public.quiz_can_use() to authenticated;

-- 単元ごとの問題数と、自分の進み具合
create or replace function public.quiz_list_units()
returns table (id text, name text, field text, sort integer, total integer, answered integer, correct integer)
language sql stable security definer set search_path = ''
as $f$
  select u.id, u.name, u.field, u.sort,
         count(q.id)::integer,
         count(p.question_id) filter (where p.attempts > 0)::integer,
         count(p.question_id) filter (where p.last_correct)::integer
  from public.quiz_units u
  left join public.quiz_questions q on q.unit = u.id and not q.excluded
  left join public.quiz_progress p on p.question_id = q.id and p.user_id = (select auth.uid())
  where public.quiz_can_use()
  group by u.id, u.name, u.field, u.sort
  order by u.sort;
$f$;
revoke execute on function public.quiz_list_units() from public, anon;
grant execute on function public.quiz_list_units() to authenticated;

-- 回ごとの問題数と、自分の進み具合
create or replace function public.quiz_list_exams()
returns table (exam_no integer, total integer, answered integer, correct integer)
language sql stable security definer set search_path = ''
as $f$
  select q.exam_no::integer,
         count(q.id)::integer,
         count(p.question_id) filter (where p.attempts > 0)::integer,
         count(p.question_id) filter (where p.last_correct)::integer
  from public.quiz_questions q
  left join public.quiz_progress p on p.question_id = q.id and p.user_id = (select auth.uid())
  where not q.excluded and public.quiz_can_use()
  group by q.exam_no
  order by q.exam_no desc;
$f$;
revoke execute on function public.quiz_list_exams() from public, anon;
grant execute on function public.quiz_list_exams() to authenticated;

-- 範囲(単元・回)ごとの、すべて/未回答/間違い/ブックマークの件数
create or replace function public.quiz_mode_counts(p_unit text default null, p_exam integer default null)
returns table (all_count integer, unanswered integer, wrong integer, bookmarked integer)
language sql stable security definer set search_path = ''
as $f$
  select count(q.id)::integer,
         count(q.id) filter (where coalesce(p.attempts, 0) = 0)::integer,
         count(q.id) filter (where p.last_correct is false)::integer,
         count(q.id) filter (where p.bookmarked)::integer
  from public.quiz_questions q
  left join public.quiz_progress p on p.question_id = q.id and p.user_id = (select auth.uid())
  where not q.excluded
    and public.quiz_can_use()
    and (p_unit is null or q.unit = p_unit)
    and (p_exam is null or q.exam_no = p_exam);
$f$;
revoke execute on function public.quiz_mode_counts(text, integer) from public, anon;
grant execute on function public.quiz_mode_counts(text, integer) to authenticated;

-- 出題。正答は返さない(答え合わせのときに quiz_answer / quiz_reveal で返す)
create or replace function public.quiz_list_questions(
  p_unit text default null,
  p_exam integer default null,
  p_mode text default 'all',
  p_limit integer default 20,
  p_shuffle boolean default true
)
returns table (
  id uuid, exam_no integer, session text, no integer, unit text,
  intro text, stem text, choices jsonb, need integer, image text, book_images jsonb,
  choices_in_image boolean, bookmarked boolean, last_correct boolean
)
language sql stable security definer set search_path = ''
as $f$
  select q.id, q.exam_no::integer, q.session, q.no::integer, q.unit,
         q.intro, q.stem, q.choices, q.need::integer, q.image, q.book_images,
         q.choices_in_image, coalesce(p.bookmarked, false), p.last_correct
  from public.quiz_questions q
  left join public.quiz_progress p on p.question_id = q.id and p.user_id = (select auth.uid())
  where not q.excluded
    and public.quiz_can_use()
    and (p_unit is null or q.unit = p_unit)
    and (p_exam is null or q.exam_no = p_exam)
    and case p_mode
          when 'unanswered' then coalesce(p.attempts, 0) = 0
          when 'wrong' then p.last_correct is false
          when 'bookmarked' then coalesce(p.bookmarked, false)
          else true
        end
  order by case when p_shuffle then random() end, q.exam_no desc, q.session, q.no
  limit least(coalesce(p_limit, 300), 300);
$f$;
revoke execute on function public.quiz_list_questions(text, integer, text, integer, boolean) from public, anon;
grant execute on function public.quiz_list_questions(text, integer, text, integer, boolean) to authenticated;

-- 答え合わせ。結果を記録して、正答と解説を返す
create or replace function public.quiz_answer(p_question uuid, p_choice integer[])
returns jsonb
language plpgsql security definer set search_path = ''
as $f$
declare
  v_uid uuid := (select auth.uid());
  v_q public.quiz_questions;
  v_chosen jsonb;
  v_ok boolean;
begin
  if v_uid is null or not public.quiz_can_use() then
    raise exception 'not allowed';
  end if;

  select * into v_q from public.quiz_questions where id = p_question;
  if not found then
    raise exception 'not found';
  end if;

  select coalesce(to_jsonb(array_agg(x order by x)), '[]'::jsonb) into v_chosen
  from (select distinct x from unnest(p_choice) as x where x between 1 and 5) s;

  v_ok := exists (select 1 from jsonb_array_elements(v_q.answers) a where a = v_chosen);

  insert into public.quiz_progress (user_id, question_id, attempts, correct_count, last_correct, last_choice)
  values (v_uid, p_question, 1, case when v_ok then 1 else 0 end, v_ok, v_chosen)
  on conflict (user_id, question_id) do update
    set attempts = public.quiz_progress.attempts + 1,
        correct_count = public.quiz_progress.correct_count + case when v_ok then 1 else 0 end,
        last_correct = v_ok,
        last_choice = v_chosen,
        updated_at = now();

  return jsonb_build_object(
    'correct', v_ok,
    'answers', v_q.answers,
    'explanation', v_q.explanation,
    'explanation_source', v_q.explanation_source
  );
end
$f$;
revoke execute on function public.quiz_answer(uuid, integer[]) from public, anon;
grant execute on function public.quiz_answer(uuid, integer[]) to authenticated;

-- 答えだけ見る(記録しない)
create or replace function public.quiz_reveal(p_question uuid)
returns jsonb
language sql stable security definer set search_path = ''
as $f$
  select jsonb_build_object(
    'answers', q.answers, 'explanation', q.explanation, 'explanation_source', q.explanation_source
  )
  from public.quiz_questions q
  where q.id = p_question and public.quiz_can_use();
$f$;
revoke execute on function public.quiz_reveal(uuid) from public, anon;
grant execute on function public.quiz_reveal(uuid) to authenticated;

create or replace function public.quiz_toggle_bookmark(p_question uuid)
returns boolean
language plpgsql security definer set search_path = ''
as $f$
declare
  v_uid uuid := (select auth.uid());
  v_new boolean;
begin
  if v_uid is null or not public.quiz_can_use() then
    raise exception 'not allowed';
  end if;

  insert into public.quiz_progress (user_id, question_id, bookmarked)
  values (v_uid, p_question, true)
  on conflict (user_id, question_id) do update
    set bookmarked = not public.quiz_progress.bookmarked, updated_at = now()
  returning bookmarked into v_new;

  return v_new;
end
$f$;
revoke execute on function public.quiz_toggle_bookmark(uuid) from public, anon;
grant execute on function public.quiz_toggle_bookmark(uuid) to authenticated;

-- =========================================================
-- 5. 問題の誤りの通報(運営への通報の対象に追加)。問題そのものは「削除」しても消さず、運営が直す
-- =========================================================
alter table public.reports drop constraint if exists reports_target_type_check;
alter table public.reports
  add constraint reports_target_type_check
  check (target_type in ('post', 'comment', 'message', 'group_message', 'hospital_review',
                         'internship_review', 'student_question', 'student_answer', 'exam_note',
                         'quiz_question'));

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

-- =========================================================
-- 6. 単元の一覧
-- =========================================================
insert into public.quiz_units (id, name, field, sort) values
  ('anatomy', '解剖学', '基礎医学', 1),
  ('physiology', '生理学', '基礎医学', 2),
  ('kinesiology', '運動学', '基礎医学', 3),
  ('pathology', '病理学・薬理・栄養', '基礎医学', 4),
  ('psychology', '臨床心理学・精神医学', '臨床医学', 5),
  ('internal', '内科学（循環・呼吸・代謝ほか）', '臨床医学', 6),
  ('orthopedics', '整形外科学', '臨床医学', 7),
  ('neurology', '神経内科・脳神経外科', '臨床医学', 8),
  ('pediatrics', '小児科学・発達', '臨床医学', 9),
  ('other_medicine', '外科・皮膚科・救急・老年医学など', '臨床医学', 10),
  ('rehab_concept', 'リハビリテーション概論・関係法規・社会保障', 'リハビリテーション医学', 11),
  ('eval_basic', '理学療法評価学（ROM・MMT・検査測定）', '理学療法評価', 12),
  ('eval_exam', '臨床検査・画像・バイタルサイン', '理学療法評価', 13),
  ('therapeutic_exercise', '運動療法学', '理学療法治療', 14),
  ('physical_agents', '物理療法学', '理学療法治療', 15),
  ('adl', '日常生活活動・福祉用具・住環境', '理学療法治療', 16),
  ('prosthetics', '義肢装具学', '理学療法治療', 17),
  ('pt_neuro', '神経系疾患の理学療法', '疾患別の理学療法', 18),
  ('pt_ortho', '運動器疾患の理学療法', '疾患別の理学療法', 19),
  ('pt_internal', '内部障害の理学療法（呼吸・循環・代謝・がん）', '疾患別の理学療法', 20),
  ('pt_pediatric', '小児・発達障害の理学療法', '疾患別の理学療法', 21),
  ('pt_geriatric', '高齢者・認知症の理学療法', '疾患別の理学療法', 22),
  ('pt_community', '地域理学療法・予防・スポーツ・女性', '疾患別の理学療法', 23),
  ('pt_admin', '理学療法管理・研究法・統計', 'その他', 24)
on conflict (id) do update set name = excluded.name, field = excluded.field, sort = excluded.sort;
