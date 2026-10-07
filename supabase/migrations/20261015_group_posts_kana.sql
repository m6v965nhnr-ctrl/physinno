-- 適用済み（relight-tokyo）。PTのふりがな検索と、グループのメンバーだけに公開する投稿
alter table public.pt_profiles add column if not exists full_name_kana text;
alter table public.posts add column if not exists group_id uuid references public.groups(id) on delete cascade;
create index if not exists posts_group_id_idx on public.posts(group_id) where group_id is not null;
alter table public.posts drop constraint if exists posts_visibility_check;
alter table public.posts add constraint posts_visibility_check check (visibility = any (array['public','followers','private','group']));
alter table public.posts drop constraint if exists posts_group_visibility_check;
alter table public.posts add constraint posts_group_visibility_check check ((visibility = 'group') = (group_id is not null));

alter policy allow_insert_posts on public.posts with check ((select auth.uid()) = user_id and not (select public.is_general_user()) and (group_id is null or public.is_group_member(group_id, (select auth.uid()))));
alter policy allow_update_posts on public.posts with check ((select auth.uid()) = user_id and (group_id is null or public.is_group_member(group_id, (select auth.uid()))));

-- can_read_post に「グループのメンバー」を追加し、list_posts_v2（p_group・group_id・group_name 付き）を追加
-- 本文は Supabase 上の定義を参照（list_posts は互換のため残す。グループ向けの投稿はメンバー以外に返さない）
