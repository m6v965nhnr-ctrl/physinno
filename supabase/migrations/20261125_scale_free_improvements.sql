-- 規模が大きくなったときに備えた、無料でできる改善（2026-10-18の性能調査にもとづく）
--  1. quiz_pool: 難易度を使わないとき（any）は、全員の解答記録の集計をしない
--  2. quiz_teacher_pool_counts: 難易度ごとの数は、画面から外れたので計算しない（all_count だけ。easy/normal/hard は 0）
--  3. quiz_answer・quiz_grade: 数秒以内の、同じ送信の重複（回線の途中切れのやり直し・二重タップ）では、解答回数を二重に数えない
--  4. 索引: messages(conversation_id, created_at)・ai_usage(user_id)・quiz_classes(school_id)。小さな記録表に主キー

-- 1.
create or replace function public.quiz_pool(p_unit text, p_exam integer, p_difficulty text)
returns setof uuid
language plpgsql stable security definer set search_path = ''
as $f$
begin
  if p_difficulty is null or p_difficulty = 'any' then
    return query
      select q.id from public.quiz_questions q
      where not q.excluded and (p_unit is null or q.unit = p_unit) and (p_exam is null or q.exam_no = p_exam);
    return;
  end if;

  return query
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
end
$f$;
revoke execute on function public.quiz_pool(text, integer, text) from public, anon, authenticated;

-- 2.
create or replace function public.quiz_teacher_pool_counts(p_unit text default null, p_exam integer default null)
returns table (all_count integer, easy integer, normal integer, hard integer)
language sql stable security definer set search_path = ''
as $f$
  select (select count(*)::integer from public.quiz_pool(p_unit, p_exam, 'any')), 0, 0, 0
  where public.quiz_is_teacher();
$f$;

-- 3.
create or replace function public.quiz_answer(p_question uuid, p_choice integer[])
returns jsonb
language plpgsql security definer set search_path = ''
as $f$
declare
  v_uid uuid := (select auth.uid());
  v_q public.quiz_questions;
  v_chosen jsonb;
  v_ok boolean;
  v_dupe boolean;
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

  -- 直前（5秒以内）に、同じ問題へ、同じ選択を記録していたら、重複の送信とみなして、数えない
  v_dupe := exists (
    select 1 from public.quiz_progress p
    where p.user_id = v_uid and p.question_id = p_question and p.last_choice = v_chosen
      and p.updated_at > now() - interval '5 seconds'
  );

  if not v_dupe then
    insert into public.quiz_progress (user_id, question_id, attempts, correct_count, last_correct, last_choice)
    values (v_uid, p_question, 1, case when v_ok then 1 else 0 end, v_ok, v_chosen)
    on conflict (user_id, question_id) do update
      set attempts = public.quiz_progress.attempts + 1,
          correct_count = public.quiz_progress.correct_count + case when v_ok then 1 else 0 end,
          last_correct = v_ok,
          last_choice = v_chosen,
          updated_at = now();
  end if;

  return jsonb_build_object(
    'correct', v_ok,
    'answers', v_q.answers,
    'explanation', v_q.explanation,
    'explanation_source', v_q.explanation_source,
    'ref_url', v_q.ref_url
  );
end
$f$;

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
  v_dupe boolean;
begin
  if v_uid is null or not public.quiz_can_use() then
    raise exception 'not allowed';
  end if;

  -- 直前（60秒以内）に、同じ回・同じ午前午後を採点していたら、重複の送信とみなして、記録を二重に足さない（採点の結果は、そのまま返す）
  v_dupe := exists (
    select 1 from public.quiz_mock_attempts a
    where a.user_id = v_uid and a.exam_no = p_exam and a.session = p_session
      and a.created_at > now() - interval '60 seconds'
  );

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

      if not v_dupe then
        insert into public.quiz_progress (user_id, question_id, attempts, correct_count, last_correct, last_choice)
        values (v_uid, r.id, 1, case when v_ok then 1 else 0 end, v_ok, v_chosen)
        on conflict (user_id, question_id) do update
          set attempts = public.quiz_progress.attempts + 1,
              correct_count = public.quiz_progress.correct_count + case when v_ok then 1 else 0 end,
              last_correct = v_ok,
              last_choice = v_chosen,
              updated_at = now();
      end if;
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

  if not v_dupe then
    insert into public.quiz_mock_attempts (user_id, exam_no, session, score, total, seconds)
    values (v_uid, p_exam, p_session, v_score, v_total, p_seconds);
  end if;

  return jsonb_build_object('score', v_score, 'total', v_total, 'items', v_items);
end
$f$;

-- 4.
create index if not exists messages_conversation_created_idx on public.messages (conversation_id, created_at desc);
create index if not exists ai_usage_user_idx on public.ai_usage (user_id);
create index if not exists quiz_classes_school_idx on public.quiz_classes (school_id);
alter table public.quiz_join_attempts add column if not exists id bigint generated always as identity primary key;
alter table public.school_code_attempts add column if not exists id bigint generated always as identity primary key;
