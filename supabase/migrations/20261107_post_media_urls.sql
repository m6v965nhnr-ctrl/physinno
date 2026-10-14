-- 投稿に、写真・動画・資料を何枚でも添付できるようにする。
-- media_urls に、添付のURLを順番に入れる（image_url には、1つ目を入れたまま。古い画面・OGP用）。
alter table public.posts add column if not exists media_urls text[] not null default '{}';
update public.posts set media_urls = array[image_url] where image_url is not null and media_urls = '{}';

-- 戻り値の列が増えるので、作り直す（公開範囲の判定 full_access は、そのまま）
drop function if exists public.list_posts_v2(uuid, text[], timestamptz, integer, text, uuid, uuid);

create or replace function public.list_posts_v2(p_author uuid DEFAULT NULL::uuid, p_types text[] DEFAULT NULL::text[], p_before timestamp with time zone DEFAULT NULL::timestamp with time zone, p_limit integer DEFAULT 30, p_level text DEFAULT NULL::text, p_id uuid DEFAULT NULL::uuid, p_group uuid DEFAULT NULL::uuid)
 returns table(id uuid, user_id uuid, post_type text, title text, content text, image_url text, video_url text, like_count integer, comment_count integer, created_at timestamp with time zone, updated_at timestamp with time zone, case_category text, case_title text, media_url text, disease_category text, reference_url text, conference_name text, achieved_on date, is_public boolean, details jsonb, visibility text, title_public boolean, is_anonymous boolean, target_level text, restricted boolean, is_mine boolean, group_id uuid, group_name text, media_urls text[])
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
         case when b.full_access then (select g.name from public.groups g where g.id = b.group_id) end,
         case when b.full_access then b.media_urls else '{}'::text[] end
  from base b
  where b.full_access or (b.title_public and b.visibility <> 'group')
  order by b.created_at desc
  limit least(coalesce(p_limit, 30), 100);
$function$;

grant execute on function public.list_posts_v2(uuid, text[], timestamptz, integer, text, uuid, uuid) to anon, authenticated;
