-- 退会（アカウントの削除）。本人だけが、自分のアカウントを、画面から削除できる。
--
-- 方針:
--  ・個人情報（プロフィール・非公開情報・メッセージ・フォロー・通知・学習記録・ポートフォリオなど）は、すべて削除する。
--  ・投稿は、本人が選ぶ: p_keep_posts = true なら、投稿を「匿名」にして残す（投稿者との結びつきを切る）。
--    false なら、投稿も、それについたいいね・コメントごと削除する。
--  ・コメント・いいねは、削除する（コメントの外部キーが、ユーザーを必要とするため）。
--  ・病院情報（コミュニティで作った病院の基本情報）は残し、作成者・管理者の紐づけだけを外す。
--  ・運営（admin_users）は、退会できない（誤操作で運営がいなくなるのを防ぐ）。
--  ・画像などのファイル（Storage）は、画面側で先に削除する（ストレージの削除ポリシーを、本人のフォルダに限り追加）。
--
-- バックアップに残る情報は、一定期間後に消える（プライバシーポリシーに記載）。

-- 本人のフォルダのファイルを、本人が削除できるようにする（退会時に、画像などを消すため）
drop policy if exists own_folder_delete_profile_and_post_media on storage.objects;
create policy own_folder_delete_profile_and_post_media
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id in ('profile-images', 'post-media')
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

-- 自分のフォルダの中を、一覧できるようにする（退会時に、削除するファイルを探すため）。
-- 公開のバケットは、URLを知っていれば誰でも読めるので、公開の範囲は変わらない
drop policy if exists own_folder_select_post_media on storage.objects;
create policy own_folder_select_post_media
  on storage.objects
  for select
  to authenticated
  using (
    bucket_id = 'post-media'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

create or replace function public.delete_my_account(p_keep_posts boolean default false)
returns boolean
language plpgsql
security definer
set search_path = ''
as $f$
declare
  v_uid uuid := (select auth.uid());
  v_pt_id uuid;
  -- 退会したユーザーの投稿の、持ち主の印（実在しない固定のID）。誰とも結びつかない
  v_gone constant uuid := '00000000-0000-0000-0000-000000000000';
begin
  if v_uid is null then
    raise exception 'ログインしてください';
  end if;

  if exists (select 1 from public.admin_users a where a.user_id = v_uid) then
    raise exception '運営のアカウントは、この画面から退会できません';
  end if;

  select id into v_pt_id from public.pt_profiles where user_id = v_uid;

  -- 1) 投稿
  if p_keep_posts then
    -- 投稿者との結びつきを切り、匿名にして残す（グループ限定の投稿は、グループごと消えるため対象外）
    update public.posts
       set user_id = v_gone, is_anonymous = true
     where user_id = v_uid and group_id is null;
  end if;

  -- 残さない投稿（または、グループの投稿）は、それについたコメント・いいね・添付とともに削除する
  delete from public.comments where post_id in (select id from public.posts where user_id = v_uid);
  delete from public.likes where post_id in (select id from public.posts where user_id = v_uid);
  delete from public.posts where user_id = v_uid;

  -- 2) 自分が書いたコメント・いいね
  delete from public.comments where user_id = v_uid;
  delete from public.likes where user_id = v_uid;

  -- 3) フォロー・レビュー・メール送信記録
  delete from public.follows where following_user = v_uid or followed_user = v_uid;
  delete from public.reviews where user_id = v_uid;
  if v_pt_id is not null then
    delete from public.reviews where pt_id = v_pt_id;
  end if;
  delete from public.email_log where user_id = v_uid;
  delete from public.operator_messages where user_id = v_uid;

  -- 4) 病院情報は残し、自分との結びつきだけを外す
  update public.hospitals set created_by = null where created_by = v_uid;
  update public.hospitals set claimed_by = null where claimed_by = v_uid;
  update public.hospital_disease_ratios set updated_by = null where updated_by = v_uid;

  -- 5) プロフィール・アカウント
  delete from public.pt_profiles where user_id = v_uid;
  delete from public.users where id = v_uid;

  -- 6) ログイン情報の削除。ここで、外部キーのCASCADEにより、残りの個人データ（メッセージ・学習記録・
  --    ポートフォリオ・通知・保存した論文など）がまとめて消える
  delete from auth.users where id = v_uid;

  return true;
end
$f$;

revoke execute on function public.delete_my_account(boolean) from public, anon;
grant execute on function public.delete_my_account(boolean) to authenticated;
