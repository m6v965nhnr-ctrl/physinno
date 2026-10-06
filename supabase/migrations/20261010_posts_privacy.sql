-- 投稿の公開範囲・匿名投稿・題名だけ公開・対象レベル
--
-- 【この SQL の位置づけ: 第1段（加えるだけ。いまの画面は、そのまま動く）】
--  - posts に visibility / title_public / is_anonymous / target_level を足す
--  - 読む側は RPC(list_posts / list_comments / notify_post_author)を使う。作者を隠す・本文を隠す処理は、サーバー側で行う
--  - 第2段(20261010_posts_privacy_lockdown.sql)で、テーブルの直接の読み取りを、本人の分だけに絞る
--    (新しい画面を公開してから適用する)

-- =========================================================
-- 1. 列
-- =========================================================
alter table public.posts
  add column if not exists visibility text not null default 'public',
  add column if not exists title_public boolean not null default false,
  add column if not exists is_anonymous boolean not null default false,
  add column if not exists target_level text not null default 'all';

alter table public.posts drop constraint if exists posts_visibility_check;
alter table public.posts add constraint posts_visibility_check
  check (visibility in ('public', 'followers', 'private'));

alter table public.posts drop constraint if exists posts_target_level_check;
alter table public.posts add constraint posts_target_level_check
  check (target_level in ('all', 'student', 'newcomer', 'junior', 'mid', 'veteran'));

-- 匿名にできるのは、全員に公開する投稿だけ(フォロワー限定の匿名は、作者が特定されてしまう)
alter table public.posts drop constraint if exists posts_anonymous_public_check;

-- 既存の投稿: 公開・非公開を、そのまま公開範囲に引き継ぐ
update public.posts set visibility = case when is_public then 'public' else 'private' end
where visibility = 'public' and is_public = false;

alter table public.posts add constraint posts_anonymous_public_check
  check (not is_anonymous or visibility = 'public');

-- is_public(古い画面が使う)と visibility を、食い違わないように保つ
create or replace function public.posts_sync_visibility()
returns trigger
language plpgsql
set search_path = ''
as $f$
begin
  if tg_op = 'INSERT' then
    -- 古い画面が is_public = false だけを送ってきたときは、非公開として扱う
    if new.is_public = false and new.visibility = 'public' then
      new.visibility := 'private';
    end if;
  else
    if new.is_public is distinct from old.is_public and new.visibility = old.visibility then
      new.visibility := case when new.is_public then 'public' else 'private' end;
    end if;
  end if;
  new.is_public := (new.visibility = 'public');
  if new.is_anonymous and new.visibility <> 'public' then
    new.is_anonymous := false;
  end if;
  return new;
end
$f$;

drop trigger if exists posts_sync_visibility on public.posts;
create trigger posts_sync_visibility
  before insert or update on public.posts
  for each row execute function public.posts_sync_visibility();

create index if not exists posts_level_idx on public.posts (target_level, created_at desc);

-- =========================================================
-- 2. 読める投稿かどうか
-- =========================================================
create or replace function public.can_read_post(p_post uuid)
returns boolean
language sql stable security definer set search_path = ''
as $f$
  select exists (
    select 1
    from public.posts p
    where p.id = p_post
      and (
        p.visibility = 'public'
        or p.user_id = (select auth.uid())
        or (
          p.visibility = 'followers'
          and exists (
            select 1 from public.follows f
            where f.following_user = (select auth.uid()) and f.followed_user = p.user_id
          )
        )
      )
  );
$f$;
revoke execute on function public.can_read_post(uuid) from public;
grant execute on function public.can_read_post(uuid) to anon, authenticated;

-- =========================================================
-- 3. 投稿の一覧・1件
--    - 公開範囲の外の人には、題名だけ公開の投稿は題名だけ(restricted = true)、それ以外は返さない
--    - 匿名の投稿は、本人以外には user_id を返さず、作者の投稿一覧にも出さない
--    - いいね数・コメント数は、その場で数える
-- =========================================================
create or replace function public.list_posts(
  p_author uuid default null,
  p_types text[] default null,
  p_before timestamptz default null,
  p_limit integer default 30,
  p_level text default null,
  p_id uuid default null
)
returns table (
  id uuid, user_id uuid, post_type text, title text, content text, image_url text, video_url text,
  like_count integer, comment_count integer, created_at timestamptz, updated_at timestamptz,
  case_category text, case_title text, media_url text, disease_category text, reference_url text,
  conference_name text, achieved_on date, is_public boolean, details jsonb,
  visibility text, title_public boolean, is_anonymous boolean, target_level text,
  restricted boolean, is_mine boolean
)
language sql stable security definer set search_path = ''
as $f$
  with v as (select (select auth.uid()) as uid),
  base as (
    select p.*,
           coalesce(p.user_id = v.uid, false) as mine,
           (
             coalesce(p.user_id = v.uid, false)
             or p.visibility = 'public'
             or (
               p.visibility = 'followers' and v.uid is not null
               and exists (
                 select 1 from public.follows f
                 where f.following_user = v.uid and f.followed_user = p.user_id
               )
             )
           ) as full_access
    from public.posts p, v
    where (p_id is null or p.id = p_id)
      and (p_author is null or (p.user_id = p_author and (not p.is_anonymous or p.user_id = v.uid)))
      and (p_types is null or p.post_type = any (p_types))
      and (p_before is null or p.created_at < p_before)
      and (p_level is null or p.target_level in ('all', p_level))
  )
  select b.id,
         case when b.is_anonymous and not b.mine then null else b.user_id end,
         b.post_type,
         b.title,
         case when b.full_access then b.content end,
         case when b.full_access then b.image_url end,
         case when b.full_access then b.video_url end,
         (select count(*)::integer from public.likes l where l.post_id = b.id),
         case when b.full_access then (select count(*)::integer from public.comments c where c.post_id = b.id) else 0 end,
         b.created_at, b.updated_at,
         b.case_category, b.case_title,
         case when b.full_access then b.media_url end,
         b.disease_category,
         case when b.full_access then b.reference_url end,
         case when b.full_access then b.conference_name end,
         b.achieved_on, b.is_public,
         case when b.full_access then b.details else '{}'::jsonb end,
         b.visibility, b.title_public, b.is_anonymous, b.target_level,
         not b.full_access,
         b.mine
  from base b
  where b.full_access or b.title_public
  order by b.created_at desc
  limit least(coalesce(p_limit, 30), 100);
$f$;
revoke execute on function public.list_posts(uuid, text[], timestamptz, integer, text, uuid) from public;
grant execute on function public.list_posts(uuid, text[], timestamptz, integer, text, uuid) to anon, authenticated;

-- =========================================================
-- 4. コメント(読める投稿のものだけ。匿名の投稿では、作者のコメントから user_id を外す)
-- =========================================================
create or replace function public.list_comments(p_post_ids uuid[])
returns table (
  id uuid, post_id uuid, user_id uuid, content text, created_at timestamptz,
  by_author boolean, is_mine boolean
)
language sql stable security definer set search_path = ''
as $f$
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
  order by c.created_at;
$f$;
revoke execute on function public.list_comments(uuid[]) from public;
grant execute on function public.list_comments(uuid[]) to anon, authenticated;

-- =========================================================
-- 5. 投稿者への通知(匿名の投稿では、画面が投稿者を知らないので、サーバー側で宛先を決める)
-- =========================================================
create or replace function public.notify_post_author(p_post uuid, p_type text)
returns void
language plpgsql security definer set search_path = ''
as $f$
declare
  v_uid uuid := (select auth.uid());
  v_author uuid;
begin
  if v_uid is null or p_type not in ('like', 'comment') then
    return;
  end if;
  if not public.can_read_post(p_post) then
    return;
  end if;
  select user_id into v_author from public.posts where id = p_post;
  if v_author is null or v_author = v_uid then
    return;
  end if;
  insert into public.notifications (user_id, actor_id, type, post_id, is_read)
  values (v_author, v_uid, p_type, p_post, false);
end
$f$;
revoke execute on function public.notify_post_author(uuid, text) from public, anon;
grant execute on function public.notify_post_author(uuid, text) to authenticated;
