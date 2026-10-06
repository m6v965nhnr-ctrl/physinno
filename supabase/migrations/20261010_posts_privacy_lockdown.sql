-- 投稿の公開範囲・匿名投稿: 第2段（テーブルの直接の読み取りを絞る）
-- 20261010_posts_privacy.sql と、新しい画面（list_posts / list_comments を使う）を公開したあとに適用する
--
--  - posts: 本人の投稿だけ直接読める。ほかの人の投稿は list_posts() 経由（公開範囲・匿名の処理が入る）
--  - comments: 本人のコメントだけ直接読める。ほかは list_comments() 経由
--  - likes: 読める投稿へのいいねだけ読める。いいね・コメントは、読める投稿にだけできる

drop policy if exists "allow_select_posts" on public.posts;
drop policy if exists "allow_anon_select_public_posts" on public.posts;
create policy posts_select_own on public.posts
  for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Anyone can read comments" on public.comments;
create policy comments_select_own on public.comments
  for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "allow_insert_comments" on public.comments;
create policy allow_insert_comments on public.comments
  for insert to authenticated
  with check (
    (select auth.uid()) = user_id
    and not (select is_general_user())
    and public.can_read_post(post_id)
  );

drop policy if exists "Allow authenticated users to read likes" on public.likes;
drop policy if exists "a" on public.likes;
create policy likes_select_readable on public.likes
  for select to anon, authenticated
  using (public.can_read_post(post_id));

drop policy if exists "b" on public.likes;
create policy likes_insert_readable on public.likes
  for insert to authenticated
  with check ((select auth.uid()) = user_id and public.can_read_post(post_id));
