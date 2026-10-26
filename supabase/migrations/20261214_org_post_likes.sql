-- 施設の投稿への「いいね」。誰が押したかは本人以外に見せず、数だけ公開する
create table if not exists public.org_post_likes (
  post_id uuid not null references public.org_posts(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (post_id, user_id)
);

alter table public.org_post_likes enable row level security;

-- 本人の行だけ読める（自分が押したかの確認用）。数は下の関数で返す
create policy org_post_likes_own on public.org_post_likes for all to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));

revoke all on public.org_post_likes from anon, public;
grant select, insert, delete on public.org_post_likes to authenticated;

-- いいねの数（誰が押したかは返さない）。ゲストにも見せる
create or replace function public.org_post_like_counts(p_post_ids uuid[])
returns table (post_id uuid, likes bigint)
language sql
stable
security definer
set search_path = ''
as $f$
  select l.post_id, count(*) from public.org_post_likes l
  where l.post_id = any(p_post_ids)
  group by l.post_id;
$f$;

revoke all on function public.org_post_like_counts(uuid[]) from public;
grant execute on function public.org_post_like_counts(uuid[]) to anon, authenticated;
