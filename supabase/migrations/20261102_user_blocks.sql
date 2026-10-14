-- ユーザーのブロック（App Storeの審査で、ユーザー生成コンテンツのあるアプリに求められる）。
-- ブロックした人の投稿・コメント・メッセージ・口コミなどは、ブロックした本人の画面から消える。
-- ブロックされた側は、ブロックした人にメッセージを送れない。ブロックされたことは、相手に知らせない。

create table if not exists public.user_blocks (
  blocker_id uuid not null references auth.users(id) on delete cascade,
  blocked_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (blocker_id, blocked_id),
  check (blocker_id <> blocked_id)
);
create index if not exists user_blocks_blocked_idx on public.user_blocks (blocked_id);

alter table public.user_blocks enable row level security;
-- 自分がブロックした人だけ見える（ブロックされた側からは見えない）。追加・解除は下の関数から行う。
create policy user_blocks_select_own on public.user_blocks
  for select to authenticated using (blocker_id = (select auth.uid()));
create policy user_blocks_delete_own on public.user_blocks
  for delete to authenticated using (blocker_id = (select auth.uid()));
revoke insert, update on public.user_blocks from anon, authenticated;
revoke all on public.user_blocks from anon;

-- 自分がブロックしている相手か
create or replace function public.is_blocked_by_me(p_user uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.user_blocks b
    where b.blocker_id = (select auth.uid()) and b.blocked_id = p_user
  );
$$;

-- p_user が自分をブロックしているか（メッセージ送信の拒否に使う）。
-- ブロックされたことを相手に教えないため、API（/rpc）に公開されない private スキーマに置く。
create schema if not exists private;
grant usage on schema private to anon, authenticated;
create or replace function private.blocks_me(p_user uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.user_blocks b
    where b.blocker_id = p_user and b.blocked_id = (select auth.uid())
  );
$$;
revoke execute on function private.blocks_me(uuid) from public;
grant execute on function private.blocks_me(uuid) to authenticated;

-- ブロックする（フォロー関係は双方向とも外す）
create or replace function public.block_user(p_user uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_me uuid := (select auth.uid());
begin
  if v_me is null then
    raise exception 'ログインが必要です';
  end if;
  if p_user is null or p_user = v_me then
    raise exception '自分自身はブロックできません';
  end if;
  insert into public.user_blocks (blocker_id, blocked_id) values (v_me, p_user)
  on conflict do nothing;
  delete from public.follows
  where (following_user = v_me and followed_user = p_user)
     or (following_user = p_user and followed_user = v_me);
end;
$$;

create or replace function public.unblock_user(p_user uuid)
returns void
language sql
security definer
set search_path = ''
as $$
  delete from public.user_blocks
  where blocker_id = (select auth.uid()) and blocked_id = p_user;
$$;

-- ブロック中の一覧（設定画面の解除用）。名前はプロフィールから。
create or replace function public.list_my_blocks()
returns table (user_id uuid, full_name text, created_at timestamptz)
language sql
stable
security definer
set search_path = ''
as $$
  select b.blocked_id,
         (select p.full_name from public.pt_profiles p where p.user_id = b.blocked_id limit 1),
         b.created_at
  from public.user_blocks b
  where b.blocker_id = (select auth.uid())
  order by b.created_at desc;
$$;

revoke execute on function public.block_user(uuid), public.unblock_user(uuid), public.list_my_blocks() from public, anon;
grant execute on function public.block_user(uuid), public.unblock_user(uuid), public.list_my_blocks() to authenticated;
grant execute on function public.is_blocked_by_me(uuid) to anon, authenticated;

-- 画面から直接読まれる表: ブロックした人の行を、読む側から消す（restrictive＝他の許可に関係なく必ず効く）。
-- 未ログイン(anon)は user_blocks を読めないので、表を直接参照せず、関数経由にする
do $$
declare
  t record;
begin
  for t in
    select * from (values
      ('posts', 'user_id'),
      ('comments', 'user_id'),
      ('group_messages', 'user_id'),
      ('messages', 'sender_id'),
      ('hospital_reviews', 'user_id'),
      ('internship_reviews', 'user_id'),
      ('student_questions', 'user_id'),
      ('student_answers', 'user_id'),
      ('clinical_ideas', 'user_id'),
      ('training_methods', 'user_id'),
      ('exam_notes', 'user_id')
    ) as v(tbl, col)
  loop
    execute format('drop policy if exists %I on public.%I', 'hide_blocked_' || t.tbl, t.tbl);
    execute format(
      'create policy %I on public.%I as restrictive for select using (not public.is_blocked_by_me(%I))',
      'hide_blocked_' || t.tbl, t.tbl, t.col);
  end loop;
end $$;

-- 会話: ブロックした相手との会話は一覧から消す。ブロックしてきた相手には送らせない。
drop policy if exists hide_blocked_conversations on public.conversations;
create policy hide_blocked_conversations on public.conversations as restrictive for select
  using (not public.is_blocked_by_me(case when (select auth.uid()) = user1_id then user2_id else user1_id end));

drop policy if exists no_new_conversation_if_blocked on public.conversations;
create policy no_new_conversation_if_blocked on public.conversations as restrictive for insert
  with check (not private.blocks_me(case when (select auth.uid()) = user1_id then user2_id else user1_id end));

drop policy if exists no_message_if_blocked on public.messages;
create policy no_message_if_blocked on public.messages as restrictive for insert
  with check (not exists (
    select 1 from public.conversations c
    where c.id = conversation_id
      and private.blocks_me(case when c.user1_id = (select auth.uid()) then c.user2_id else c.user1_id end)
  ));

-- 内容を返す関数（security definer で、上の方針が効かないもの）に、同じ絞り込みを足す
create or replace function public.get_hospital_reviews(p_hospital_id uuid)
 returns table(id uuid, hospital_id uuid, work_environment smallint, education_system smallint, salary smallint, overtime smallint, paid_leave smallint, openness smallint, overall_score smallint, comment text, is_anonymous boolean, created_at timestamp with time zone, is_mine boolean)
 language sql stable security definer set search_path to ''
as $function$
  select r.id, r.hospital_id, r.work_environment, r.education_system, r.salary,
         r.overtime, r.paid_leave, r.openness, r.overall_score, r.comment,
         r.is_anonymous, r.created_at,
         (r.user_id = (select auth.uid())) as is_mine
  from public.hospital_reviews r
  where r.hospital_id = p_hospital_id
    and not public.is_blocked_by_me(r.user_id)
  order by r.created_at desc;
$function$;

create or replace function public.get_internship_reviews(p_hospital_id uuid)
 returns table(id uuid, practicum_type text, practicum_year integer, guidance smallint, workload smallint, sleep smallint, access smallint, learning smallint, atmosphere smallint, comment text, created_at timestamp with time zone, is_mine boolean)
 language sql stable security definer set search_path to ''
as $function$
  select r.id, r.practicum_type, r.practicum_year,
         r.guidance, r.workload, r.sleep, r.access, r.learning, r.atmosphere,
         r.comment, r.created_at, (r.user_id = (select auth.uid()))
  from public.internship_reviews r
  where r.hospital_id = p_hospital_id
    and exists (select 1 from public.users u where u.id = (select auth.uid()) and u.account_type in ('pt', 'student'))
    and not public.is_blocked_by_me(r.user_id)
  order by r.created_at desc;
$function$;

create or replace function public.list_comments(p_post_ids uuid[])
 returns table(id uuid, post_id uuid, user_id uuid, content text, created_at timestamp with time zone, by_author boolean, is_mine boolean)
 language sql stable security definer set search_path to ''
as $function$
  select c.id, c.post_id,
         case
           when p.is_anonymous and c.user_id = p.user_id and c.user_id is distinct from (select auth.uid()) then null
           else c.user_id
         end,
         c.content, c.created_at,
         (c.user_id = p.user_id),
         coalesce(c.user_id = (select auth.uid()), false)
  from public.comments c
  join public.posts p on p.id = c.post_id
  where c.post_id = any (p_post_ids)
    and public.can_read_post(c.post_id)
    and not public.is_blocked_by_me(c.user_id)
  order by c.created_at;
$function$;

create or replace function public.list_posts_v2(p_author uuid DEFAULT NULL::uuid, p_types text[] DEFAULT NULL::text[], p_before timestamp with time zone DEFAULT NULL::timestamp with time zone, p_limit integer DEFAULT 30, p_level text DEFAULT NULL::text, p_id uuid DEFAULT NULL::uuid, p_group uuid DEFAULT NULL::uuid)
 returns table(id uuid, user_id uuid, post_type text, title text, content text, image_url text, video_url text, like_count integer, comment_count integer, created_at timestamp with time zone, updated_at timestamp with time zone, case_category text, case_title text, media_url text, disease_category text, reference_url text, conference_name text, achieved_on date, is_public boolean, details jsonb, visibility text, title_public boolean, is_anonymous boolean, target_level text, restricted boolean, is_mine boolean, group_id uuid, group_name text)
 language sql stable security definer set search_path to ''
as $function$
  with v as (select (select auth.uid()) as uid),
  base as (
    select p.*,
           coalesce(p.user_id = v.uid, false) as mine,
           (
             coalesce(p.user_id = v.uid, false)
             or p.visibility = 'public'
             or (p.visibility = 'followers' and v.uid is not null and exists (
                   select 1 from public.follows f
                   where f.following_user = v.uid and f.followed_user = p.user_id))
             or (p.visibility = 'group' and v.uid is not null and public.is_group_member(p.group_id, v.uid))
           ) as full_access
    from public.posts p, v
    where (p_id is null or p.id = p_id)
      and (p_author is null or (p.user_id = p_author and (not p.is_anonymous or p.user_id = v.uid)))
      and (p_types is null or p.post_type = any (p_types))
      and (p_before is null or p.created_at < p_before)
      and (p_level is null or p.target_level in ('all', p_level))
      and (p_group is null or p.group_id = p_group)
      and not public.is_blocked_by_me(p.user_id)
  )
  select b.id,
         case when b.is_anonymous and not b.mine then null else b.user_id end,
         b.post_type, b.title,
         case when b.full_access then b.content end,
         case when b.full_access then b.image_url end,
         case when b.full_access then b.video_url end,
         (select count(*)::integer from public.likes l where l.post_id = b.id),
         case when b.full_access then (select count(*)::integer from public.comments c where c.post_id = b.id) else 0 end,
         b.created_at, b.updated_at, b.case_category, b.case_title,
         case when b.full_access then b.media_url end,
         b.disease_category,
         case when b.full_access then b.reference_url end,
         case when b.full_access then b.conference_name end,
         b.achieved_on, b.is_public,
         case when b.full_access then b.details else '{}'::jsonb end,
         b.visibility, b.title_public, b.is_anonymous, b.target_level,
         not b.full_access, b.mine,
         case when b.full_access then b.group_id end,
         case when b.full_access then (select g.name from public.groups g where g.id = b.group_id) end
  from base b
  where b.full_access or (b.title_public and b.visibility <> 'group')
  order by b.created_at desc
  limit least(coalesce(p_limit, 30), 100);
$function$;

create or replace function public.get_student_question(p_id uuid)
 returns table(id uuid, category text, title text, body text, hospital_id uuid, hospital_name text, author_id uuid, author_name text, created_at timestamp with time zone, is_mine boolean)
 language sql stable security definer set search_path to ''
as $function$
  select q.id, q.category, q.title, q.body, q.hospital_id, h.name,
         case when q.is_anonymous then null else q.user_id end,
         case when q.is_anonymous then null else (select p.full_name from public.pt_profiles p where p.user_id = q.user_id limit 1) end,
         q.created_at, (q.user_id = (select auth.uid()))
  from public.student_questions q
  left join public.hospitals h on h.id = q.hospital_id
  where q.id = p_id
    and exists (select 1 from public.users u where u.id = (select auth.uid()) and u.account_type in ('pt', 'student'))
    and not public.is_blocked_by_me(q.user_id);
$function$;

create or replace function public.list_student_questions(p_category text DEFAULT NULL::text, p_limit integer DEFAULT 30, p_offset integer DEFAULT 0)
 returns table(id uuid, category text, title text, body_preview text, hospital_id uuid, hospital_name text, author_id uuid, author_name text, answer_count bigint, created_at timestamp with time zone, is_mine boolean)
 language sql stable security definer set search_path to ''
as $function$
  select q.id, q.category, q.title, left(q.body, 160), q.hospital_id, h.name,
         case when q.is_anonymous then null else q.user_id end,
         case when q.is_anonymous then null else (select p.full_name from public.pt_profiles p where p.user_id = q.user_id limit 1) end,
         (select count(*) from public.student_answers a where a.question_id = q.id),
         q.created_at, (q.user_id = (select auth.uid()))
  from public.student_questions q
  left join public.hospitals h on h.id = q.hospital_id
  where exists (select 1 from public.users u where u.id = (select auth.uid()) and u.account_type in ('pt', 'student'))
    and (p_category is null or q.category = p_category)
    and not public.is_blocked_by_me(q.user_id)
  order by q.created_at desc
  limit least(greatest(p_limit, 1), 100) offset greatest(p_offset, 0);
$function$;

create or replace function public.list_student_answers(p_question_id uuid)
 returns table(id uuid, body text, created_at timestamp with time zone, author_id uuid, author_name text, author_is_pt boolean, is_mine boolean, is_asker boolean)
 language sql stable security definer set search_path to ''
as $function$
  select a.id, a.body, a.created_at, a.user_id,
         (select p.full_name from public.pt_profiles p where p.user_id = a.user_id limit 1),
         coalesce((select u2.account_type = 'pt' from public.users u2 where u2.id = a.user_id), false),
         (a.user_id = (select auth.uid())),
         (a.user_id = q.user_id)
  from public.student_answers a
  join public.student_questions q on q.id = a.question_id
  where a.question_id = p_question_id
    and exists (select 1 from public.users u where u.id = (select auth.uid()) and u.account_type in ('pt', 'student'))
    and not public.is_blocked_by_me(a.user_id)
  order by a.created_at;
$function$;

create or replace function public.list_clinical_ideas(p_topic text DEFAULT NULL::text, p_sort text DEFAULT 'new'::text, p_saved_only boolean DEFAULT false, p_limit integer DEFAULT 50)
 returns table(id uuid, topic_slug text, title text, goal text, phase text, method text, points text, patient_traits text, impressions text, refs text, is_anonymous boolean, created_at timestamp with time zone, author_id uuid, author_name text, author_qualification text, author_experience integer, is_mine boolean, like_count bigint, save_count bigint, practiced_count bigint, my_like boolean, my_save boolean, my_practiced boolean)
 language sql stable security definer set search_path to ''
as $function$
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
      and not public.is_blocked_by_me(i.user_id)
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
$function$;

create or replace function public.list_training_methods(p_region text DEFAULT NULL::text, p_muscle text DEFAULT NULL::text, p_sort text DEFAULT 'new'::text, p_limit integer DEFAULT 100)
 returns table(id uuid, region text, muscle text, title text, purpose text, body_position text, equipment text, method text, points text, is_anonymous boolean, created_at timestamp with time zone, author_id uuid, author_name text, author_experience integer, is_mine boolean, like_count integer, save_count integer, my_like boolean, my_save boolean)
 language sql stable security definer set search_path to ''
as $function$
  with v as (select (select auth.uid()) as uid)
  select t.id, t.region, t.muscle, t.title, t.purpose, t.body_position, t.equipment, t.method, t.points,
         t.is_anonymous, t.created_at,
         case when t.is_anonymous and t.user_id is distinct from v.uid then null else t.user_id end,
         case when t.is_anonymous and t.user_id is distinct from v.uid then null else p.full_name end,
         case when t.is_anonymous and t.user_id is distinct from v.uid then null else p.experience_years::integer end,
         coalesce(t.user_id = v.uid, false),
         (select count(*)::integer from public.training_method_reactions r where r.method_id = t.id and r.kind = 'like'),
         (select count(*)::integer from public.training_method_reactions r where r.method_id = t.id and r.kind = 'save'),
         exists (select 1 from public.training_method_reactions r where r.method_id = t.id and r.kind = 'like' and r.user_id = v.uid),
         exists (select 1 from public.training_method_reactions r where r.method_id = t.id and r.kind = 'save' and r.user_id = v.uid)
  from public.training_methods t
  cross join v
  left join public.pt_profiles p on p.user_id = t.user_id
  where (p_region is null or t.region = p_region)
    and (p_muscle is null or t.muscle = p_muscle)
    and not public.is_blocked_by_me(t.user_id)
  order by case when p_sort = 'popular'
             then (select count(*) from public.training_method_reactions r where r.method_id = t.id and r.kind = 'like') end desc nulls last,
           t.created_at desc
  limit least(coalesce(p_limit, 100), 200);
$function$;
