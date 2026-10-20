-- クラスのチャット・先生への質問、クラス全体の得点（推移用）、学生のテスト振り返り
--  - quiz_class_messages: クラスのチャット（kind=chat）、学生から先生への質問（question。匿名を選べる）、先生の回答（answer）
--  - 匿名の質問は、書いた本人以外（先生・ほかの学生）には、名前を返さない

create table if not exists public.quiz_class_messages (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.quiz_classes (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  kind text not null check (kind in ('chat', 'question', 'answer')),
  body text not null check (char_length(btrim(body)) between 1 and 1000),
  anonymous boolean not null default false,
  reply_to uuid references public.quiz_class_messages (id) on delete cascade,
  created_at timestamptz not null default now()
);
create index if not exists quiz_class_messages_class_idx on public.quiz_class_messages (class_id, created_at desc);
alter table public.quiz_class_messages enable row level security;
-- 表は、関数（security definer）からだけ読み書きする。直接のポリシーは作らない

-- 自分の、そのクラスでの立場: teacher / member / null
create or replace function public.quiz_class_role(p_class uuid)
returns text
language sql stable security definer set search_path = ''
as $f$
  select case
    when exists (select 1 from public.quiz_classes c where c.id = p_class and c.teacher_id = (select auth.uid()) and not c.archived) then 'teacher'
    when exists (
      select 1 from public.quiz_class_members m join public.quiz_classes c on c.id = m.class_id
      where m.class_id = p_class and m.user_id = (select auth.uid()) and not c.archived
    ) then 'member'
    else null
  end;
$f$;
revoke execute on function public.quiz_class_role(uuid) from public, anon;
grant execute on function public.quiz_class_role(uuid) to authenticated;

create or replace function public.quiz_class_messages_list(p_class uuid)
returns jsonb
language plpgsql stable security definer set search_path = ''
as $f$
declare
  v_role text := public.quiz_class_role(p_class);
  v_uid uuid := (select auth.uid());
begin
  if v_role is null then
    return null;
  end if;
  return coalesce((
    select jsonb_agg(x order by x.created_at)
    from (
      select m.id, m.kind, m.body, m.created_at, m.reply_to, m.anonymous,
             (m.user_id = v_uid) as mine,
             (m.user_id = (select c.teacher_id from public.quiz_classes c where c.id = p_class)) as from_teacher,
             case
               when m.anonymous and m.user_id <> v_uid then null
               else coalesce((select p.full_name from public.pt_profiles p where p.user_id = m.user_id limit 1), '（名前未設定）')
             end as author
      from public.quiz_class_messages m
      where m.class_id = p_class
      order by m.created_at desc
      limit 300
    ) x
  ), '[]'::jsonb);
end
$f$;
revoke execute on function public.quiz_class_messages_list(uuid) from public, anon;
grant execute on function public.quiz_class_messages_list(uuid) to authenticated;

create or replace function public.quiz_class_post(p_class uuid, p_kind text, p_body text, p_anonymous boolean, p_reply_to uuid)
returns uuid
language plpgsql security definer set search_path = ''
as $f$
declare
  v_role text := public.quiz_class_role(p_class);
  v_uid uuid := (select auth.uid());
  v_id uuid;
begin
  if v_role is null then
    raise exception 'not in class';
  end if;
  if p_kind not in ('chat', 'question', 'answer') then
    raise exception 'bad kind';
  end if;
  if p_kind = 'question' and v_role <> 'member' then
    raise exception 'members only';
  end if;
  if p_kind = 'answer' then
    if v_role <> 'teacher' then
      raise exception 'teacher only';
    end if;
    if not exists (select 1 from public.quiz_class_messages q where q.id = p_reply_to and q.class_id = p_class and q.kind = 'question') then
      raise exception 'question not found';
    end if;
  end if;
  if btrim(coalesce(p_body, '')) = '' or char_length(p_body) > 1000 then
    raise exception 'bad body';
  end if;
  -- 連投を止める（1分に20件まで）
  if (select count(*) from public.quiz_class_messages m where m.user_id = v_uid and m.created_at > now() - interval '1 minute') >= 20 then
    raise exception 'too fast';
  end if;
  insert into public.quiz_class_messages (class_id, user_id, kind, body, anonymous, reply_to)
  values (p_class, v_uid, p_kind, btrim(p_body), (p_kind = 'question' and coalesce(p_anonymous, false)), case when p_kind = 'answer' then p_reply_to end)
  returning id into v_id;
  return v_id;
end
$f$;
revoke execute on function public.quiz_class_post(uuid, text, text, boolean, uuid) from public, anon;
grant execute on function public.quiz_class_post(uuid, text, text, boolean, uuid) to authenticated;

-- 自分の書き込み、または、先生が自分のクラスの書き込みを消す
create or replace function public.quiz_class_message_delete(p_id uuid)
returns void
language sql security definer set search_path = ''
as $f$
  delete from public.quiz_class_messages m
  where m.id = p_id
    and (m.user_id = (select auth.uid()) or public.quiz_class_role(m.class_id) = 'teacher');
$f$;
revoke execute on function public.quiz_class_message_delete(uuid) from public, anon;
grant execute on function public.quiz_class_message_delete(uuid) to authenticated;

-- 自分が入っているクラス（学生）の、チャットの入口用。最新の書き込みの時刻つき
create or replace function public.quiz_class_rooms()
returns jsonb
language sql stable security definer set search_path = ''
as $f$
  select coalesce(jsonb_agg(jsonb_build_object(
    'id', c.id, 'name', c.name,
    'last_at', (select max(m.created_at) from public.quiz_class_messages m where m.class_id = c.id),
    'last_text', (select m.body from public.quiz_class_messages m where m.class_id = c.id order by m.created_at desc limit 1)
  ) order by c.created_at desc), '[]'::jsonb)
  from public.quiz_classes c
  where not c.archived and (
    c.teacher_id = (select auth.uid())
    or exists (select 1 from public.quiz_class_members m where m.class_id = c.id and m.user_id = (select auth.uid()))
  );
$f$;
revoke execute on function public.quiz_class_rooms() from public, anon;
grant execute on function public.quiz_class_rooms() to authenticated;

-- ---------------------------------------------------------
-- 先生: クラス全体の、テストごと・学生ごとの得点（推移・テスト別の分析用）
-- ---------------------------------------------------------
create or replace function public.quiz_class_scores(p_class uuid)
returns jsonb
language plpgsql stable security definer set search_path = ''
as $f$
declare
  v_class public.quiz_classes%rowtype;
  v_tests jsonb;
  v_students jsonb;
begin
  if not public.quiz_is_teacher() then
    return null;
  end if;
  select * into v_class from public.quiz_classes c where c.id = p_class and c.teacher_id = (select auth.uid()) and not c.archived;
  if not found then
    return null;
  end if;

  select coalesce(jsonb_agg(jsonb_build_object('id', a.id, 'title', a.title, 'created_at', a.created_at, 'due_at', a.due_at, 'n', cardinality(a.question_ids)) order by a.created_at), '[]'::jsonb)
  into v_tests
  from public.quiz_assignments a where a.class_id = p_class and a.status = 'published';

  select coalesce(jsonb_agg(jsonb_build_object('name', s.name, 'scores', s.scores) order by s.name), '[]'::jsonb)
  into v_students
  from (
    select coalesce((select p.full_name from public.pt_profiles p where p.user_id = m.user_id limit 1), '（名前未設定）') as name,
           coalesce((
             select jsonb_object_agg(r.aid, jsonb_build_object('a', r.answered, 'c', r.correct))
             from (
               select ans.assignment_id as aid, count(*) as answered, count(*) filter (where ans.correct) as correct
               from public.quiz_assignment_answers ans
               join public.quiz_assignments qa on qa.id = ans.assignment_id and qa.class_id = p_class and qa.status = 'published'
               where ans.user_id = m.user_id
               group by ans.assignment_id
             ) r
           ), '{}'::jsonb) as scores
    from public.quiz_class_members m
    where m.class_id = p_class
  ) s;

  return jsonb_build_object('class_name', v_class.name, 'tests', v_tests, 'students', v_students);
end
$f$;
revoke execute on function public.quiz_class_scores(uuid) from public, anon;
grant execute on function public.quiz_class_scores(uuid) to authenticated;

-- ---------------------------------------------------------
-- 学生: 自分が最後まで解いた、先生のテストの振り返り（平均・中央値・順位・偏差値）
-- ---------------------------------------------------------
create or replace function public.quiz_my_reviews()
returns jsonb
language sql stable security definer set search_path = ''
as $f$
  with a as (
    select qa.id, qa.title, qa.created_at, c.name as class_name, cardinality(qa.question_ids) as n
    from public.quiz_assignments qa
    join public.quiz_classes c on c.id = qa.class_id and not c.archived
    join public.quiz_class_members me on me.class_id = qa.class_id and me.user_id = (select auth.uid())
    where qa.status = 'published'
  ),
  s as (
    select a.id as aid, ans.user_id, count(*) as answered, count(*) filter (where ans.correct) as correct
    from a
    join public.quiz_assignment_answers ans on ans.assignment_id = a.id
    join public.quiz_assignments qa on qa.id = a.id
    join public.quiz_class_members m on m.class_id = qa.class_id and m.user_id = ans.user_id
    group by a.id, ans.user_id
  ),
  done as (select s.* from s join a on a.id = s.aid where s.answered >= a.n),
  agg as (
    select aid, count(*) as participants, avg(correct)::float as mean,
           percentile_cont(0.5) within group (order by correct)::float as median,
           coalesce(stddev_pop(correct), 0)::float as sd
    from done group by aid
  )
  select coalesce(jsonb_agg(jsonb_build_object(
    'id', a.id, 'title', a.title, 'class_name', a.class_name, 'created_at', a.created_at, 'n', a.n,
    'my_correct', d.correct, 'participants', g.participants, 'mean', g.mean, 'median', g.median,
    'rank', 1 + (select count(*) from done d2 where d2.aid = a.id and d2.correct > d.correct),
    'deviation', case when g.participants >= 2 and g.sd > 0 then round((50 + 10 * (d.correct - g.mean) / g.sd)::numeric, 1) end
  ) order by a.created_at desc), '[]'::jsonb)
  from a
  join done d on d.aid = a.id and d.user_id = (select auth.uid())
  join agg g on g.aid = a.id;
$f$;
revoke execute on function public.quiz_my_reviews() from public, anon;
grant execute on function public.quiz_my_reviews() to authenticated;
