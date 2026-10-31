-- しばらく使っていない人へのお知らせメール(reminder)を、3週間後まで待たず、週1回に早める。
-- 新規登録の急増に対して、最初の数日〜1週間で離脱する人が多いことが分かったため、
-- 21日/60日という間隔だと手遅れになる人が多い(SNS経由の新規登録者が21日以内に
-- 対象から外れてしまうため)。しきい値・再送間隔をどちらも7日に短縮する。
create or replace function public.queue_inactive_reminders(p_dry_run boolean default false)
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  r record;
  n integer := 0;
begin
  for r in
    select u.id
    from public.users u
    where u.email is not null
      and coalesce(u.email_notifications, true)
      and coalesce(u.email_notification_kinds ->> 'reminder', 'true') <> 'false'
      and u.last_seen_at < now() - interval '7 days'
      and u.created_at < now() - interval '7 days'
      and not exists (select 1 from public.admin_users a where a.user_id = u.id)
      and not exists (
        select 1 from public.email_log l
        where l.user_id = u.id and l.kind = 'reminder' and l.sent_at > now() - interval '7 days'
      )
    order by u.last_seen_at
    limit 50
  loop
    n := n + 1;
    if not p_dry_run then
      perform public.queue_email(r.id, null, 'reminder');
    end if;
  end loop;
  return n;
end
$$;
