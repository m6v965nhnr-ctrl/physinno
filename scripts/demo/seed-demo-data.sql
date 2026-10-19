-- 先生向けデモ用のデータ（架空の学生10人と、その解答）。本番DBに入れる。消すときは cleanup-demo-data.sql。
--  ・学生は、ログインできない（パスワードなし）。メール: demo-student-01〜10@example.com（管理画面の集計では、テスト用として除外される）
--  ・学校名は「デモ大学（動作確認用）」、ランキングは非表示。他の利用者の画面には出ない
--  ・先生（sensei@example.com）の既存クラスを「国試対策クラス（デモ）」に名前変更し、課題3件（公開済み）と解答を入れる
--  ・student@example.com（デモ用の学生）は、課題3に、まだ解答していない → 面談の場で、実際に解いて見せる
do $$
declare
  v_class uuid := 'a29bcb23-5fe6-4f6b-b486-3a1d7bea3b67';
  names text[] := array['A','B','C','D','E','F','G','H','I','J'];
  abil numeric[] := array[0.92,0.85,0.78,0.72,0.66,0.60,0.52,0.45,0.38,0.30];
  v_ids uuid[] := '{}';
  v_uid uuid;
  i int; k int;
  qsets uuid[][] ;
  q1 uuid[]; q2 uuid[]; q3 uuid[]; qids uuid[];
  a_ids uuid[] := '{}'; v_a uuid;
  r record;
  h int; qh int; u numeric; qd numeric; pc numeric; ok boolean; c int; n int; ch int; off int; ncomplete int; pos int;
begin
  if exists (select 1 from auth.users where email like 'demo-student-%@example.com') then
    raise exception 'すでに入っています（先に cleanup-demo-data.sql）';
  end if;

  -- 学生10人
  for i in 1..10 loop
    v_uid := gen_random_uuid();
    v_ids := v_ids || v_uid;
    insert into auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, recovery_token, email_change, email_change_token_new)
    values ('00000000-0000-0000-0000-000000000000', v_uid, 'authenticated', 'authenticated', format('demo-student-%s@example.com', lpad(i::text, 2, '0')), '', now(),
            '{"provider":"email","providers":["email"]}'::jsonb,
            jsonb_build_object('account_type', 'student', 'full_name', 'デモ学生' || names[i], 'demo', true),
            now() - interval '20 days', now(), '', '', '', '');
    insert into public.pt_profiles (user_id, full_name, is_student) values (v_uid, 'デモ学生' || names[i], true);
    update public.student_profiles set school_name = 'デモ大学（動作確認用）', ranking_hidden = true where user_id = v_uid;
    insert into public.quiz_class_members (class_id, user_id, joined_at, share_progress)
    values (v_class, v_uid, now() - interval '18 days', i <= 7);
  end loop;

  update public.quiz_classes set name = '国試対策クラス（デモ）' where id = v_class;

  -- 課題3件（単一選択の問題だけ）
  select array_agg(id) into q1 from (select id from public.quiz_questions where coalesce(excluded,false) = false and need = 1 and jsonb_array_length(answers->0) = 1 and unit in ('anatomy','kinesiology') order by md5(id::text || 'a1') limit 10) s;
  select array_agg(id) into q2 from (select id from public.quiz_questions where coalesce(excluded,false) = false and need = 1 and jsonb_array_length(answers->0) = 1 and unit in ('eval_basic','neurology') order by md5(id::text || 'a2') limit 10) s;
  select array_agg(id) into q3 from (select id from public.quiz_questions where coalesce(excluded,false) = false and need = 1 and jsonb_array_length(answers->0) = 1 and exam_no = 60 and session = 'am' order by md5(id::text || 'a3') limit 10) s;

  for k in 1..3 loop
    qids := case k when 1 then q1 when 2 then q2 else q3 end;
    insert into public.quiz_assignments (class_id, title, unit, exam_no, question_ids, due_at, status, created_at)
    values (v_class,
            case k when 1 then '運動学・解剖の確認（10問）' when 2 then '評価学・神経の基礎（10問）' else '第60回 午前から（10問）' end,
            null, case when k = 3 then 60 else null end, qids,
            case k when 1 then timestamptz '2026-10-10 14:59+00' when 2 then timestamptz '2026-10-17 14:59+00' else timestamptz '2026-10-26 14:59+00' end,
            'published', now() - interval '14 days' + (k - 1) * interval '3 days')
    returning id into v_a;
    a_ids := a_ids || v_a;

    for i in 1..10 loop
      -- 何問まで解いたか: 課題1は全員／課題2は1〜8番／課題3は1〜5番が全部、6・7番は途中まで、ほかは未着手
      ncomplete := case
        when k = 1 then 10
        when k = 2 then case when i <= 8 then 10 else 0 end
        else case when i <= 5 then 10 when i in (6, 7) then 6 else 0 end end;
      pos := 0;
      for r in select id, answers, jsonb_array_length(choices) as nc from public.quiz_questions where id = any(qids) order by array_position(qids, id) loop
        pos := pos + 1;
        exit when pos > ncomplete;
        h := abs(('x' || substr(md5(r.id::text || i::text || k::text), 1, 8))::bit(32)::int);
        qh := abs(('x' || substr(md5(r.id::text), 1, 8))::bit(32)::int);
        u := (h % 1000) / 1000.0;
        qd := ((qh % 500) / 1000.0) - 0.25;
        pc := least(0.97, greatest(0.05, abil[i] + qd));
        ok := u < pc;
        c := (r.answers->0->>0)::int;
        n := r.nc;
        if ok then ch := c;
        else
          off := case when (h % 10) < 7 then 1 + (qh % (n - 1)) else 1 + ((h / 7) % (n - 1)) end;  -- 間違いは、特定の選択肢に偏りやすい
          ch := ((c - 1 + off) % n) + 1;
        end if;
        insert into public.quiz_assignment_answers (assignment_id, user_id, question_id, chosen, correct, answered_at)
        values (v_a, v_ids[i], r.id, jsonb_build_array(ch), ok, now() - interval '1 day' * (1 + (h % 9)) - interval '1 minute' * pos);
      end loop;
    end loop;
  end loop;

  -- 学習の進み具合（クラス全体の画面用）: 力の高い学生ほど、多く解いている
  for i in 1..10 loop
    for r in select id, answers, jsonb_array_length(choices) as nc from public.quiz_questions
             where coalesce(excluded,false) = false and need = 1 and jsonb_array_length(answers->0) = 1
             order by md5(id::text || i::text) limit (60 + (11 - i) * 10) loop
      h := abs(('x' || substr(md5(r.id::text || i::text || 'p'), 1, 8))::bit(32)::int);
      qh := abs(('x' || substr(md5(r.id::text), 1, 8))::bit(32)::int);
      qd := ((qh % 500) / 1000.0) - 0.25;
      pc := least(0.97, greatest(0.05, abil[i] + qd));
      ok := ((h % 1000) / 1000.0) < pc;
      c := (r.answers->0->>0)::int;
      n := r.nc;
      ch := case when ok then c else ((c - 1 + 1 + (h / 11) % (n - 1)) % n) + 1 end;
      insert into public.quiz_progress (user_id, question_id, attempts, correct_count, last_correct, last_choice, bookmarked, updated_at)
      values (v_ids[i], r.id, 1 + (h % 3), case when ok then least(1 + (h % 3), 1 + (h / 3) % 2) else 0 end, ok, jsonb_build_array(ch), (h % 17) = 0, now() - interval '1 day' * (h % 14))
      on conflict (user_id, question_id) do nothing;
    end loop;
  end loop;
end $$;
