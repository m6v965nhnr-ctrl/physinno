-- 登録が、アプリのどの画面から始まったか（ゲストで見ていた画面・トップのボタンなど）の集計。運営だけが見られる。
-- 登録時に、画面のパスだけを user_metadata の signup_from に入れてある（クエリ・個人情報は含めない）。
create or replace function public.admin_signup_pages(p_days int default 30)
returns table (signup_from text, signups bigint)
language sql
stable
security definer
set search_path = ''
as $$
  select
    coalesce(nullif(u.raw_user_meta_data ->> 'signup_from', ''), '(不明・直接)') as signup_from,
    count(*) as signups
  from auth.users u
  where u.created_at >= now() - make_interval(days => greatest(1, least(coalesce(p_days, 30), 365)))
    and exists (select 1 from public.admin_users a where a.user_id = (select auth.uid()))
  group by 1
  order by signups desc, 1;
$$;

revoke execute on function public.admin_signup_pages(int) from public, anon;
grant execute on function public.admin_signup_pages(int) to authenticated;
