-- AIが作った国試対策問題（先生が「AIで問題を作る」ボタンで使う）
--  - quiz_questions に source（official/ai_generated）と review_status（pending/approved/rejected）を足す。
--  - AI作成の問題は、運営がレビューして approved にしたものだけ、先生のテスト作成画面に出る。
--  - 学生の自主学習（単元別ドリル・回別ドリル）には、AI作成の問題を一切出さない。先生が課題に選んだときだけ、学生に届く。
--  - 検証の根拠（参考にしたサイトやガイドのURL）を review_sources に残す。

alter table public.quiz_questions add column if not exists source text not null default 'official'
  check (source in ('official', 'ai_generated'));
alter table public.quiz_questions add column if not exists review_status text not null default 'approved'
  check (review_status in ('pending', 'approved', 'rejected'));
alter table public.quiz_questions add column if not exists review_sources jsonb not null default '[]'::jsonb;
alter table public.quiz_questions add column if not exists generated_at timestamptz;

-- AI作成問題は、exam_no の実在する回（〜61）とぶつからないよう 9000番台を使う。unique(exam_no, session, no) はそのまま使える。
comment on column public.quiz_questions.source is 'official=厚労省の過去問 / ai_generated=AIが作った対策問題（exam_noは9000番台のダミー）';
comment on column public.quiz_questions.review_sources is '検証に使った出典（[{"url":"...","note":"..."}]）。画面には出さず、運営の確認用。';

-- =========================================================
-- 学生の自主学習から、AI作成の問題を除く（単元別・回別ドリル）
-- =========================================================
create or replace function public.quiz_list_units()
returns table (id text, name text, field text, sort integer, total integer, answered integer, correct integer)
language sql stable security definer set search_path = ''
as $f$
  select u.id, u.name, u.field, u.sort,
         count(q.id)::integer,
         count(p.question_id) filter (where p.attempts > 0)::integer,
         count(p.question_id) filter (where p.last_correct)::integer
  from public.quiz_units u
  left join public.quiz_questions q on q.unit = u.id and not q.excluded and q.source = 'official'
  left join public.quiz_progress p on p.question_id = q.id and p.user_id = (select auth.uid())
  where public.quiz_can_use()
  group by u.id, u.name, u.field, u.sort
  order by u.sort;
$f$;
revoke execute on function public.quiz_list_units() from public, anon;
grant execute on function public.quiz_list_units() to authenticated;

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
  where not q.excluded and public.quiz_can_use() and q.source = 'official'
  group by q.exam_no
  order by q.exam_no desc;
$f$;
revoke execute on function public.quiz_list_exams() from public, anon;
grant execute on function public.quiz_list_exams() to authenticated;

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
    and q.source = 'official'
    and (p_unit is null or q.unit = p_unit)
    and (p_exam is null or q.exam_no = p_exam);
$f$;
revoke execute on function public.quiz_mode_counts(text, integer) from public, anon;
grant execute on function public.quiz_mode_counts(text, integer) to authenticated;

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
    and q.source = 'official'
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

-- =========================================================
-- 先生: quiz_pool は「承認済みのAI問題」だけ混ぜる（レビュー前のものは、先生にもランダム抽選にも出さない）
-- =========================================================
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
    and (q.source = 'official' or q.review_status = 'approved')
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

-- 先生: 問題検索（source指定を足す。AI問題のラベルは「AI作成」と出す）
create or replace function public.quiz_teacher_search_questions(
  p_unit text default null, p_exam integer default null, p_difficulty text default 'any',
  p_keyword text default null, p_limit integer default 30, p_source text default 'any'
)
returns table (id uuid, label text, unit text, stem text, source text)
language sql stable security definer set search_path = ''
as $f$
  select q.id,
         case when q.source = 'ai_generated' then 'AI作成' else '第' || q.exam_no || '回 ' || case q.session when 'am' then '午前' else '午後' end || q.no end,
         q.unit,
         left(q.stem, 80),
         q.source
  from public.quiz_pool(nullif(p_unit, ''), p_exam, coalesce(nullif(p_difficulty, ''), 'any')) as pid(id)
  join public.quiz_questions q on q.id = pid.id
  where public.quiz_is_teacher()
    and (nullif(btrim(coalesce(p_keyword, '')), '') is null
         or q.stem ilike '%' || replace(replace(btrim(p_keyword), '%', '\%'), '_', '\_') || '%'
         or q.choices::text ilike '%' || replace(replace(btrim(p_keyword), '%', '\%'), '_', '\_') || '%')
    and (coalesce(nullif(p_source, ''), 'any') = 'any' or q.source = p_source)
  order by q.exam_no desc, q.session, q.no
  limit least(greatest(coalesce(p_limit, 30), 1), 100);
$f$;
revoke execute on function public.quiz_teacher_search_questions(text, integer, text, text, integer, text) from public, anon;
grant execute on function public.quiz_teacher_search_questions(text, integer, text, text, integer, text) to authenticated;

-- 先生: 「AIで問題を作る」ボタン。単元を選んで件数を指定すると、承認済みのAI問題をランダムに課題へ足す（まだ誰も解答していない課題だけ）
create or replace function public.quiz_teacher_add_ai_questions(p_assignment uuid, p_unit text, p_n integer default 10)
returns integer
language plpgsql security definer set search_path = ''
as $f$
declare
  a public.quiz_assignments%rowtype;
  v_new uuid[];
  v_ids uuid[];
begin
  a := public.quiz_own_assignment(p_assignment);
  if exists (select 1 from public.quiz_assignment_answers x where x.assignment_id = a.id) then
    raise exception 'already answered';
  end if;
  if nullif(btrim(coalesce(p_unit, '')), '') is null then
    raise exception 'unit required';
  end if;

  select coalesce(array_agg(x.id), '{}') into v_new
  from (
    select q.id
    from public.quiz_questions q
    where not q.excluded
      and q.source = 'ai_generated'
      and q.review_status = 'approved'
      and q.unit = p_unit
      and not (q.id = any (coalesce(a.question_ids, '{}')))
    order by random()
    limit greatest(1, least(coalesce(p_n, 10), 30))
  ) x;

  if coalesce(array_length(v_new, 1), 0) = 0 then
    return 0;
  end if;

  select coalesce(array_agg(u.id order by u.ord), '{}') into v_ids
  from (
    select t.id, min(t.ord) as ord
    from unnest(coalesce(a.question_ids, '{}') || v_new) with ordinality as t(id, ord)
    group by t.id
    order by min(t.ord)
    limit 50
  ) u;

  update public.quiz_assignments set question_ids = v_ids where id = a.id;
  return array_length(v_new, 1);
end;
$f$;
revoke execute on function public.quiz_teacher_add_ai_questions(uuid, text, integer) from public, anon;
grant execute on function public.quiz_teacher_add_ai_questions(uuid, text, integer) to authenticated;

-- 先生: 単元ごとに、承認済みAI問題が何問あるか（ボタンの手前で件数を見せる）
create or replace function public.quiz_ai_question_counts()
returns table (unit text, total integer)
language sql stable security definer set search_path = ''
as $f$
  select q.unit, count(*)::integer
  from public.quiz_questions q
  where public.quiz_is_teacher()
    and q.source = 'ai_generated' and q.review_status = 'approved' and not q.excluded
  group by q.unit;
$f$;
revoke execute on function public.quiz_ai_question_counts() from public, anon;
grant execute on function public.quiz_ai_question_counts() to authenticated;
