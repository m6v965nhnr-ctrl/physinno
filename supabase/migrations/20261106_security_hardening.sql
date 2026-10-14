-- セキュリティ監査（2026-10-14）の対処。
--  1) 匿名レビュー（reviews）の投稿者ID（user_id）を、API経由で読めないようにする（読むための関数は、先に追加済み）
--  2) 証明書などの保管庫（portfolio-files）を、非公開にする（誰でも、一覧・取得できた）
--  3) 使わない権限（匿名の書き込み、TRUNCATE など）を外す（RLSに頼りきらない、二重の守り）
--  4) 証明写真の保管庫に、ファイルの大きさ・種類の制限

-- ===== 0) 読むための関数（先に適用済み）=====
create or replace function public.list_pt_reviews(p_pt uuid)
returns table (id uuid, pt_id uuid, rating integer, comment text, reviewer_type text, is_anonymous boolean, created_at timestamptz, is_mine boolean)
language sql stable security definer set search_path = ''
as $f$
  select r.id, r.pt_id, r.rating, r.comment, r.reviewer_type, r.is_anonymous, r.created_at,
         coalesce(r.user_id = (select auth.uid()), false)
  from public.reviews r
  where r.pt_id = p_pt and not public.is_blocked_by_me(r.user_id)
  order by r.created_at desc;
$f$;
grant execute on function public.list_pt_reviews(uuid) to anon, authenticated;

create or replace function public.list_my_reviews()
returns table (id uuid, pt_id uuid, rating integer, comment text, created_at timestamptz)
language sql stable security definer set search_path = ''
as $f$
  select r.id, r.pt_id, r.rating, r.comment, r.created_at
  from public.reviews r where r.user_id = (select auth.uid()) order by r.created_at desc;
$f$;
revoke execute on function public.list_my_reviews() from public, anon;
grant execute on function public.list_my_reviews() to authenticated;

-- ===== 1) reviews: user_id の列を、読めなくする（書き込み・RLSの判定には、影響しない）=====
-- 注意: reviews に列を足したら、ここに ALTER で grant select を足すこと（足さないと、読めない）
revoke select on public.reviews from anon, authenticated;
grant select (id, pt_id, comment, rating, created_at, reviewer_type, is_anonymous) on public.reviews to anon, authenticated;

-- ===== 2) portfolio-files を非公開に =====
update storage.buckets set public = false where id = 'portfolio-files';
drop policy if exists portfolio_files_public_read on storage.objects;
create policy portfolio_files_owner_select on storage.objects for select to authenticated
  using (bucket_id = 'portfolio-files' and (storage.foldername(name))[1] = (select auth.uid())::text);
-- 公開にした添付だけは、ログイン中の他の人も、署名つきURLで開ける
create policy portfolio_files_public_attachment_select on storage.objects for select to authenticated
  using (bucket_id = 'portfolio-files' and exists (select 1 from public.attachments a where a.is_public and a.file_url = name));

-- ===== 3) 権限の見直し =====
revoke insert, update, delete, truncate, references, trigger on all tables in schema public from anon;
revoke truncate, references, trigger on all tables in schema public from authenticated;
revoke all on public.seminar_ingest_secret, public.seminar_sync_log from anon, authenticated;
revoke select on public.users, public.pt_private, public.admin_users, public.operator_messages,
  public.conversations, public.messages, public.notifications from anon;
alter default privileges for role postgres in schema public revoke insert, update, delete, truncate, references, trigger on tables from anon;

-- ===== 4) 証明写真: 画像だけ・8MBまで =====
update storage.buckets
   set file_size_limit = 8388608,
       allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif']
 where id = 'id-photos';
