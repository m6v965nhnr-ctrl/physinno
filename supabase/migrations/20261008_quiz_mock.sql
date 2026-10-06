-- 過去問ドリル: 模擬試験(通しで解いて、最後にまとめて採点)と、印刷用(問題・正答・解説)

-- 模擬試験の結果の記録(本人のみ)
create table if not exists public.quiz_mock_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  exam_no smallint not null,
  session text not null check (session in ('am', 'pm')),
  score integer not null,
  total integer not null,
  seconds integer,
  created_at timestamptz not null default now()
);

create index if not exists quiz_mock_attempts_user_idx on public.quiz_mock_attempts (user_id, exam_no, session);

alter table public.quiz_mock_attempts enable row level security;
revoke all on table public.quiz_mock_attempts from public, anon, authenticated;
grant all on table public.quiz_mock_attempts to service_role;

-- 1回分(午前または午後)の問題。正答は返さない。採点除外の問題は出さない
create or replace function public.quiz_exam_questions(p_exam integer, p_session text)
returns table (
  id uuid, no integer, unit text, intro text, stem text, choices jsonb, need integer,
  image text, book_images jsonb, choices_in_image boolean
)
language sql stable security definer set search_path = ''
as $f$
  select q.id, q.no::integer, q.unit, q.intro, q.stem, q.choices, q.need::integer,
         q.image, q.book_images, q.choices_in_image
  from public.quiz_questions q
  where q.exam_no = p_exam and q.session = p_session and not q.excluded and public.quiz_can_use()
  order by q.no;
$f$;
revoke execute on function public.quiz_exam_questions(integer, text) from public, anon;
grant execute on function public.quiz_exam_questions(integer, text) to authenticated;

-- まとめて採点。p_answers は {"問題のid": [選んだ番号, ...], ...}。答えた問題だけ、解答の記録にも反映する
create or replace function public.quiz_grade(p_exam integer, p_session text, p_answers jsonb, p_seconds integer default null)
returns jsonb
language plpgsql security definer set search_path = ''
as $f$
declare
  v_uid uuid := (select auth.uid());
  r record;
  v_chosen jsonb;
  v_ok boolean;
  v_items jsonb := '[]'::jsonb;
  v_score integer := 0;
  v_total integer := 0;
begin
  if v_uid is null or not public.quiz_can_use() then
    raise exception 'not allowed';
  end if;

  for r in
    select q.id, q.no, q.unit, q.answers
    from public.quiz_questions q
    where q.exam_no = p_exam and q.session = p_session and not q.excluded
    order by q.no
  loop
    v_total := v_total + 1;
    v_chosen := null;

    if p_answers ? r.id::text then
      select coalesce(to_jsonb(array_agg(x order by x)), '[]'::jsonb) into v_chosen
      from (
        select distinct (e)::integer as x
        from jsonb_array_elements_text(p_answers -> r.id::text) as e
        where (e)::integer between 1 and 5
      ) s;
    end if;

    if v_chosen is not null and v_chosen <> '[]'::jsonb then
      v_ok := exists (select 1 from jsonb_array_elements(r.answers) a where a = v_chosen);

      insert into public.quiz_progress (user_id, question_id, attempts, correct_count, last_correct, last_choice)
      values (v_uid, r.id, 1, case when v_ok then 1 else 0 end, v_ok, v_chosen)
      on conflict (user_id, question_id) do update
        set attempts = public.quiz_progress.attempts + 1,
            correct_count = public.quiz_progress.correct_count + case when v_ok then 1 else 0 end,
            last_correct = v_ok,
            last_choice = v_chosen,
            updated_at = now();
    else
      v_chosen := null;
      v_ok := false;
    end if;

    if v_ok then
      v_score := v_score + 1;
    end if;

    v_items := v_items || jsonb_build_array(jsonb_build_object(
      'id', r.id, 'no', r.no, 'unit', r.unit, 'chosen', v_chosen, 'correct', v_ok, 'answers', r.answers
    ));
  end loop;

  insert into public.quiz_mock_attempts (user_id, exam_no, session, score, total, seconds)
  values (v_uid, p_exam, p_session, v_score, v_total, p_seconds);

  return jsonb_build_object('score', v_score, 'total', v_total, 'items', v_items);
end
$f$;
revoke execute on function public.quiz_grade(integer, text, jsonb, integer) from public, anon;
grant execute on function public.quiz_grade(integer, text, jsonb, integer) to authenticated;

-- 回・午前午後ごとの、前回と最高の点数
create or replace function public.quiz_mock_summary()
returns table (exam_no integer, session text, attempts integer, last_score integer, last_total integer, best_score integer)
language sql stable security definer set search_path = ''
as $f$
  select a.exam_no::integer, a.session, count(*)::integer,
         (array_agg(a.score order by a.created_at desc))[1],
         (array_agg(a.total order by a.created_at desc))[1],
         max(a.score)
  from public.quiz_mock_attempts a
  where a.user_id = (select auth.uid()) and public.quiz_can_use()
  group by a.exam_no, a.session;
$f$;
revoke execute on function public.quiz_mock_summary() from public, anon;
grant execute on function public.quiz_mock_summary() to authenticated;

-- 印刷用: 問題・正答・解説をまとめて返す(採点除外の問題も含め、除外の印をつける)
create or replace function public.quiz_print_exam(p_exam integer, p_session text)
returns table (
  id uuid, no integer, unit text, intro text, stem text, choices jsonb, need integer,
  image text, book_images jsonb, choices_in_image boolean, excluded boolean,
  answers jsonb, explanation text, explanation_source text
)
language sql stable security definer set search_path = ''
as $f$
  select q.id, q.no::integer, q.unit, q.intro, q.stem, q.choices, q.need::integer,
         q.image, q.book_images, q.choices_in_image, q.excluded,
         q.answers, q.explanation, q.explanation_source
  from public.quiz_questions q
  where q.exam_no = p_exam and q.session = p_session and public.quiz_can_use()
  order by q.no;
$f$;
revoke execute on function public.quiz_print_exam(integer, text) from public, anon;
grant execute on function public.quiz_print_exam(integer, text) to authenticated;
