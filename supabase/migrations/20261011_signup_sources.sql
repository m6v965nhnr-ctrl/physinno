-- 登録の経路（どの投稿・広告・紹介のリンクから来たか）の集計。運営だけが見られる。
-- 登録時に、リンクの utm_source などを user_metadata に入れてあるので、それを集計する（新しい列・外部ツールは使わない）。
create or replace function public.admin_signup_sources(p_days int default 30)
returns table (utm_source text, utm_medium text, utm_campaign text, signups bigint)
language sql
stable
security definer
set search_path = ''
as $$
  select
    coalesce(u.raw_user_meta_data ->> 'utm_source', '(リンクの印なし)') as utm_source,
    u.raw_user_meta_data ->> 'utm_medium' as utm_medium,
    u.raw_user_meta_data ->> 'utm_campaign' as utm_campaign,
    count(*) as signups
  from auth.users u
  where u.created_at >= now() - make_interval(days => greatest(1, least(coalesce(p_days, 30), 365)))
    and exists (select 1 from public.admin_users a where a.user_id = (select auth.uid()))
  group by 1, 2, 3
  order by signups desc, 1;
$$;

revoke execute on function public.admin_signup_sources(int) from public, anon;
grant execute on function public.admin_signup_sources(int) to authenticated;
