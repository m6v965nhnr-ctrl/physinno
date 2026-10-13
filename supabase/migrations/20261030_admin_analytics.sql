-- 運営用の分析: 登録者数の推移（日ごと・アカウントの種類別）、サマリー、日ごとの活動（投稿・コメント・いいね）。
-- 運営（admin_users）だけが呼べる。日付は、日本時間。
-- p_exclude_test = true のとき、テスト用（@example.com）のアカウントと、運営のアカウントを数えない。

create or replace function public.admin_signups_daily(p_days int default 30, p_exclude_test boolean default true)
returns table (day date, account_type text, n bigint)
language sql
stable
security definer
set search_path = ''
as $f$
  select (u.created_at at time zone 'Asia/Tokyo')::date as day,
         coalesce(u.account_type, 'unset') as account_type,
         count(*) as n
  from public.users u
  where exists (select 1 from public.admin_users a where a.user_id = (select auth.uid()))
    and u.created_at >= (date_trunc('day', now() at time zone 'Asia/Tokyo') - make_interval(days => greatest(1, least(coalesce(p_days, 30), 730)) - 1)) at time zone 'Asia/Tokyo'
    and (not p_exclude_test or (coalesce(u.email, '') not ilike '%@example.com'
         and not exists (select 1 from public.admin_users a2 where a2.user_id = u.id)))
  group by 1, 2
  order by 1, 2;
$f$;
revoke execute on function public.admin_signups_daily(int, boolean) from public, anon;
grant execute on function public.admin_signups_daily(int, boolean) to authenticated;

create or replace function public.admin_signup_summary(p_exclude_test boolean default true)
returns jsonb
language sql
stable
security definer
set search_path = ''
as $f$
  with base as (
    select (u.created_at at time zone 'Asia/Tokyo')::date as day, coalesce(u.account_type, 'unset') as t
    from public.users u
    where exists (select 1 from public.admin_users a where a.user_id = (select auth.uid()))
      and (not p_exclude_test or (coalesce(u.email, '') not ilike '%@example.com'
           and not exists (select 1 from public.admin_users a2 where a2.user_id = u.id)))
  ), today as (select (now() at time zone 'Asia/Tokyo')::date as d)
  select jsonb_build_object(
    'total', (select count(*) from base),
    'today', (select count(*) from base, today where base.day = today.d),
    'last7', (select count(*) from base, today where base.day > today.d - 7),
    'prev7', (select count(*) from base, today where base.day <= today.d - 7 and base.day > today.d - 14),
    'last30', (select count(*) from base, today where base.day > today.d - 30),
    'prev30', (select count(*) from base, today where base.day <= today.d - 30 and base.day > today.d - 60),
    'pt', (select count(*) from base where t = 'pt'),
    'student', (select count(*) from base where t = 'student'),
    'general', (select count(*) from base where t = 'general'),
    'first_day', (select min(day) from base)
  );
$f$;
revoke execute on function public.admin_signup_summary(boolean) from public, anon;
grant execute on function public.admin_signup_summary(boolean) to authenticated;

create or replace function public.admin_activity_daily(p_days int default 30)
returns table (day date, posts bigint, comments bigint, likes bigint)
language sql
stable
security definer
set search_path = ''
as $f$
  with since as (
    select (date_trunc('day', now() at time zone 'Asia/Tokyo') - make_interval(days => greatest(1, least(coalesce(p_days, 30), 365)) - 1)) at time zone 'Asia/Tokyo' as t
  ), d as (
    select (x.created_at at time zone 'Asia/Tokyo')::date as day, 'p' as k from public.posts x, since where x.created_at >= since.t
    union all select (c.created_at at time zone 'Asia/Tokyo')::date, 'c' from public.comments c, since where c.created_at >= since.t
    union all select (l.created_at at time zone 'Asia/Tokyo')::date, 'l' from public.likes l, since where l.created_at >= since.t
  )
  select d.day,
         count(*) filter (where d.k = 'p'),
         count(*) filter (where d.k = 'c'),
         count(*) filter (where d.k = 'l')
  from d
  where exists (select 1 from public.admin_users a where a.user_id = (select auth.uid()))
  group by d.day
  order by d.day;
$f$;
revoke execute on function public.admin_activity_daily(int) from public, anon;
grant execute on function public.admin_activity_daily(int) to authenticated;
