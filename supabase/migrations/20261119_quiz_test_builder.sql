-- 先生のテスト作成: 下書き → 問題の調整（追加・削除・並べ替え・プレビュー）→ 公開（配る）、複製
--  - 課題（quiz_assignments）に status（draft / published）を足す。いままでの課題は、すべて公開済み。これから作る課題は、下書きから始まる
--  - 学生には、公開済みの課題だけが見える・解ける
--  - 問題の入れ替えは、まだ誰も解答していない課題だけ（結果が変わらないように）

alter table public.quiz_assignments add column if not exists status text not null default 'published'
  check (status in ('draft', 'published'));
alter table public.quiz_assignments alter column status set default 'draft';

-- 学生: 公開済みの課題だけ
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
  where public.quiz_can_use() and a.status = 'published'
  order by a.created_at desc;
$f$;

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
  where a.id = p_assignment and a.status = 'published' and public.quiz_can_use()
  order by t.ord;
$f$;

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
    where a.id = p_assignment and a.status = 'published' and p_question = any (a.question_ids)
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

-- 内部用: 自分（先生）の課題か確かめて、課題の行を返す。クライアントからは呼べない
create or replace function public.quiz_own_assignment(p_assignment uuid)
returns public.quiz_assignments
language plpgsql stable security definer set search_path = ''
as $f$
declare
  a public.quiz_assignments%rowtype;
begin
  if not public.quiz_is_teacher() then
    raise exception 'teacher only';
  end if;
  select x.* into a from public.quiz_assignments x
  join public.quiz_classes c on c.id = x.class_id
  where x.id = p_assignment and c.teacher_id = (select auth.uid());
  if not found then raise exception 'not found'; end if;
  return a;
end
$f$;
revoke execute on function public.quiz_own_assignment(uuid) from public, anon, authenticated;

-- 先生: 課題ごとの状態（draft / published）
create or replace function public.quiz_assignment_statuses(p_class uuid)
returns table (id uuid, status text)
language sql stable security definer set search_path = ''
as $f$
  select a.id, a.status
  from public.quiz_assignments a
  join public.quiz_classes c on c.id = a.class_id
  where a.class_id = p_class and c.teacher_id = (select auth.uid()) and public.quiz_is_teacher();
$f$;
revoke execute on function public.quiz_assignment_statuses(uuid) from public, anon;
grant execute on function public.quiz_assignment_statuses(uuid) to authenticated;

-- 先生: 問題の検索（追加用）。正答・解説は返さない
create or replace function public.quiz_teacher_search_questions(
  p_unit text default null, p_exam integer default null, p_difficulty text default 'any',
  p_keyword text default null, p_limit integer default 30
)
returns table (id uuid, label text, unit text, stem text)
language sql stable security definer set search_path = ''
as $f$
  select q.id,
         '第' || q.exam_no || '回 ' || case q.session when 'am' then '午前' else '午後' end || q.no,
         q.unit,
         left(q.stem, 80)
  from public.quiz_pool(nullif(p_unit, ''), p_exam, coalesce(nullif(p_difficulty, ''), 'any')) as pid(id)
  join public.quiz_questions q on q.id = pid.id
  where public.quiz_is_teacher()
    and (nullif(btrim(coalesce(p_keyword, '')), '') is null
         or q.stem ilike '%' || replace(replace(btrim(p_keyword), '%', '\%'), '_', '\_') || '%'
         or q.choices::text ilike '%' || replace(replace(btrim(p_keyword), '%', '\%'), '_', '\_') || '%')
  order by q.exam_no desc, q.session, q.no
  limit least(greatest(coalesce(p_limit, 30), 1), 100);
$f$;
revoke execute on function public.quiz_teacher_search_questions(text, integer, text, text, integer) from public, anon;
grant execute on function public.quiz_teacher_search_questions(text, integer, text, text, integer) to authenticated;

-- 先生: プレビュー（正答・解説つき。自分の課題だけ）
create or replace function public.quiz_assignment_preview(p_assignment uuid)
returns jsonb
language plpgsql stable security definer set search_path = ''
as $f$
declare
  a public.quiz_assignments%rowtype;
  v_cls public.quiz_classes%rowtype;
  v_has_answers boolean;
  v_qs jsonb;
begin
  a := public.quiz_own_assignment(p_assignment);
  select * into v_cls from public.quiz_classes where id = a.class_id;
  select exists (select 1 from public.quiz_assignment_answers x where x.assignment_id = a.id) into v_has_answers;

  select coalesce(jsonb_agg(jsonb_build_object(
           'id', q.id,
           'label', '第' || q.exam_no || '回 ' || case q.session when 'am' then '午前' else '午後' end || q.no,
           'unit', q.unit, 'intro', q.intro, 'stem', q.stem, 'choices', q.choices, 'need', q.need,
           'answers', q.answers, 'explanation', q.explanation, 'explanation_source', q.explanation_source,
           'image', q.image, 'choices_in_image', q.choices_in_image
         ) order by t.ord), '[]'::jsonb) into v_qs
  from unnest(a.question_ids) with ordinality as t(qid, ord)
  join public.quiz_questions q on q.id = t.qid;

  return jsonb_build_object(
    'id', a.id, 'class_id', a.class_id, 'class_name', v_cls.name, 'title', a.title, 'status', a.status,
    'due_at', a.due_at, 'has_answers', v_has_answers, 'questions', v_qs
  );
end
$f$;
revoke execute on function public.quiz_assignment_preview(uuid) from public, anon;
grant execute on function public.quiz_assignment_preview(uuid) to authenticated;

-- 先生: 問題の入れ替え（追加・削除・並べ替えの結果を、まとめて保存）。誰も解答していない課題だけ
create or replace function public.quiz_set_assignment_questions(p_assignment uuid, p_ids uuid[])
returns void
language plpgsql security definer set search_path = ''
as $f$
declare
  a public.quiz_assignments%rowtype;
  v_ids uuid[];
begin
  a := public.quiz_own_assignment(p_assignment);
  if exists (select 1 from public.quiz_assignment_answers x where x.assignment_id = a.id) then
    raise exception 'already answered';
  end if;
  -- 重複を除く（順番は保つ）。存在して、採点除外でない問題だけ。最大50問
  select coalesce(array_agg(u.id order by u.ord), '{}') into v_ids
  from (
    select t.id, min(t.ord) as ord
    from unnest(coalesce(p_ids, '{}')) with ordinality as t(id, ord)
    join public.quiz_questions q on q.id = t.id and not q.excluded
    group by t.id
    order by min(t.ord)
    limit 50
  ) u;
  if coalesce(array_length(v_ids, 1), 0) = 0 then
    raise exception 'no questions';
  end if;
  update public.quiz_assignments set question_ids = v_ids where id = a.id;
end
$f$;
revoke execute on function public.quiz_set_assignment_questions(uuid, uuid[]) from public, anon;
grant execute on function public.quiz_set_assignment_questions(uuid, uuid[]) to authenticated;

-- 先生: 題名・期限（いつでも）
create or replace function public.quiz_set_assignment_meta(p_assignment uuid, p_title text, p_due timestamptz)
returns void
language plpgsql security definer set search_path = ''
as $f$
declare
  a public.quiz_assignments%rowtype;
begin
  a := public.quiz_own_assignment(p_assignment);
  if btrim(coalesce(p_title, '')) = '' then raise exception 'title required'; end if;
  update public.quiz_assignments set title = left(btrim(p_title), 80), due_at = p_due where id = a.id;
end
$f$;
revoke execute on function public.quiz_set_assignment_meta(uuid, text, timestamptz) from public, anon;
grant execute on function public.quiz_set_assignment_meta(uuid, text, timestamptz) to authenticated;

-- 先生: 公開（学生に配る）
create or replace function public.quiz_publish_assignment(p_assignment uuid)
returns void
language plpgsql security definer set search_path = ''
as $f$
declare
  a public.quiz_assignments%rowtype;
begin
  a := public.quiz_own_assignment(p_assignment);
  if coalesce(array_length(a.question_ids, 1), 0) = 0 then raise exception 'no questions'; end if;
  update public.quiz_assignments set status = 'published' where id = a.id;
end
$f$;
revoke execute on function public.quiz_publish_assignment(uuid) from public, anon;
grant execute on function public.quiz_publish_assignment(uuid) to authenticated;

-- 先生: 複製（下書きとして。別のクラスにも複製できる。自分のクラスだけ）
create or replace function public.quiz_duplicate_assignment(p_assignment uuid, p_class uuid default null)
returns uuid
language plpgsql security definer set search_path = ''
as $f$
declare
  a public.quiz_assignments%rowtype;
  v_class uuid;
  v_id uuid;
begin
  a := public.quiz_own_assignment(p_assignment);
  v_class := coalesce(p_class, a.class_id);
  if not exists (
    select 1 from public.quiz_classes c
    where c.id = v_class and c.teacher_id = (select auth.uid()) and not c.archived
  ) then
    raise exception 'class not found';
  end if;
  insert into public.quiz_assignments (class_id, title, unit, exam_no, difficulty, question_ids, due_at, status)
  values (v_class, left(a.title || '（コピー）', 80), a.unit, a.exam_no, a.difficulty, a.question_ids, null, 'draft')
  returning id into v_id;
  return v_id;
end
$f$;
revoke execute on function public.quiz_duplicate_assignment(uuid, uuid) from public, anon;
grant execute on function public.quiz_duplicate_assignment(uuid, uuid) to authenticated;

-- 先生: 削除（誰も解答していない課題だけ）
create or replace function public.quiz_delete_assignment(p_assignment uuid)
returns void
language plpgsql security definer set search_path = ''
as $f$
declare
  a public.quiz_assignments%rowtype;
begin
  a := public.quiz_own_assignment(p_assignment);
  if exists (select 1 from public.quiz_assignment_answers x where x.assignment_id = a.id) then
    raise exception 'already answered';
  end if;
  delete from public.quiz_assignments where id = a.id;
end
$f$;
revoke execute on function public.quiz_delete_assignment(uuid) from public, anon;
grant execute on function public.quiz_delete_assignment(uuid) to authenticated;

-- クラスの状況: 公開済みの課題だけを数える
create or replace function public.quiz_class_dashboard(p_class uuid)
returns jsonb
language plpgsql stable security definer set search_path = ''
as $f$
declare
  v_class public.quiz_classes%rowtype;
  v_assign integer;
  v_members integer;
  v_students jsonb;
  v_units jsonb;
  v_weak jsonb;
begin
  if not public.quiz_is_teacher() then
    raise exception 'teacher only';
  end if;
  select * into v_class from public.quiz_classes where id = p_class and teacher_id = (select auth.uid());
  if not found then raise exception 'not found'; end if;

  select count(*)::integer into v_assign from public.quiz_assignments where class_id = p_class and status = 'published';
  select count(*)::integer into v_members from public.quiz_class_members where class_id = p_class;

  select coalesce(jsonb_agg(to_jsonb(s) order by s.name), '[]'::jsonb) into v_students
  from (
    select coalesce((select p.full_name from public.pt_profiles p where p.user_id = m.user_id limit 1), '（名前未設定）') as name,
           (select count(*)::integer from public.quiz_assignments a
             where a.class_id = p_class and a.status = 'published'
               and (select count(*) from public.quiz_assignment_answers x where x.assignment_id = a.id and x.user_id = m.user_id) >= array_length(a.question_ids, 1)) as finished,
           (select count(*)::integer from public.quiz_assignments a
             where a.class_id = p_class and a.status = 'published' and a.due_at is not null and a.due_at < now()
               and (select count(*) from public.quiz_assignment_answers x where x.assignment_id = a.id and x.user_id = m.user_id) < array_length(a.question_ids, 1)) as overdue,
           (select count(*)::integer from public.quiz_assignment_answers x join public.quiz_assignments a on a.id = x.assignment_id
             where a.class_id = p_class and x.user_id = m.user_id) as answered,
           (select count(*)::integer from public.quiz_assignment_answers x join public.quiz_assignments a on a.id = x.assignment_id
             where a.class_id = p_class and x.user_id = m.user_id and x.correct) as correct,
           (select max(x.answered_at) from public.quiz_assignment_answers x join public.quiz_assignments a on a.id = x.assignment_id
             where a.class_id = p_class and x.user_id = m.user_id) as last_at
    from public.quiz_class_members m
    where m.class_id = p_class
  ) s;

  select coalesce(jsonb_agg(to_jsonb(u) order by u.name), '[]'::jsonb) into v_units
  from (
    select coalesce(un.name, '（単元なし）') as name,
           count(*)::integer as answered,
           (count(*) filter (where x.correct))::integer as correct
    from public.quiz_assignment_answers x
    join public.quiz_assignments a on a.id = x.assignment_id and a.class_id = p_class
    join public.quiz_class_members m on m.class_id = p_class and m.user_id = x.user_id
    join public.quiz_questions q on q.id = x.question_id
    left join public.quiz_units un on un.id::text = q.unit::text
    group by 1
  ) u;

  select coalesce(jsonb_agg(to_jsonb(w)), '[]'::jsonb) into v_weak
  from (
    select q.id,
           '第' || q.exam_no || '回 ' || case q.session when 'am' then '午前' else '午後' end || q.no as label,
           left(q.stem, 80) as stem,
           count(*)::integer as answered,
           (count(*) filter (where x.correct))::integer as correct
    from public.quiz_assignment_answers x
    join public.quiz_assignments a on a.id = x.assignment_id and a.class_id = p_class
    join public.quiz_class_members m on m.class_id = p_class and m.user_id = x.user_id
    join public.quiz_questions q on q.id = x.question_id
    group by q.id, q.exam_no, q.session, q.no, q.stem
    having count(*) >= 2
    order by (count(*) filter (where x.correct))::float / count(*), count(*) desc
    limit 10
  ) w;

  return jsonb_build_object(
    'class_name', v_class.name, 'members', v_members, 'assignments', v_assign,
    'students', v_students, 'units', v_units, 'weak', v_weak
  );
end
$f$;
revoke execute on function public.quiz_class_dashboard(uuid) from public, anon;
grant execute on function public.quiz_class_dashboard(uuid) to authenticated;
