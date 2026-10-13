-- しばらく使っていない人への、お知らせメール（3週間）。
--  ・最後に使った日（users.last_seen_at）を、1日1回だけ記録する（画面を開いたとき）。
--  ・毎日1回、「3週間以上使っていない」人に、お知らせを1通だけ送る（同じ人には、60日あけて、また送る）。
--  ・全体のメールのスイッチと、「お知らせ」の種類ごとのスイッチ（reminder）がオフの人には、送らない。
--  ・1回の実行で、最大50人まで。
-- すでに登録している人は、このマイグレーションを適用した時点から、3週間を数える（いきなり送らない）。

alter table public.users add column if not exists last_seen_at timestamptz;
update public.users set last_seen_at = now() where last_seen_at is null;
alter table public.users alter column last_seen_at set default now();

-- 画面を開いたとき（1日1回）、自分の「最後に使った日」を更新する
create or replace function public.touch_last_seen()
returns void
language sql
security definer
set search_path = ''
as $f$
  update public.users set last_seen_at = now()
  where id = (select auth.uid()) and (last_seen_at is null or last_seen_at < now() - interval '12 hours');
$f$;
revoke execute on function public.touch_last_seen() from public, anon;
grant execute on function public.touch_last_seen() to authenticated;

-- 通知メールの種類に「お知らせ（reminder）」を足す
create or replace function public.set_my_email_notification_kind(p_kind text, p_enabled boolean)
returns void
language plpgsql
security definer
set search_path = ''
as $f$
begin
  if p_kind not in ('comment', 'message', 'follow', 'answer', 'reminder') then
    raise exception 'bad kind';
  end if;
  update public.users
     set email_notification_kinds = coalesce(email_notification_kinds, '{}'::jsonb) || jsonb_build_object(p_kind, p_enabled)
   where id = (select auth.uid());
end
$f$;
revoke execute on function public.set_my_email_notification_kind(text, boolean) from public, anon;
grant execute on function public.set_my_email_notification_kind(text, boolean) to authenticated;

-- メールの宛先の人の種類（PT・学生）も、送信口へ渡す（案内する機能を変えるため）
create or replace function public.queue_email(p_user uuid, p_actor uuid, p_kind text)
returns void
language plpgsql
security definer
set search_path = ''
as $f$
declare
  v_email text;
  v_enabled boolean;
  v_kinds jsonb;
  v_created timestamptz;
  v_type text;
  v_actor text;
  v_url text;
  v_secret text;
begin
  if p_user is null or p_user = p_actor then
    return;
  end if;

  select u.email, u.email_notifications, u.email_notification_kinds, u.created_at, u.account_type
    into v_email, v_enabled, v_kinds, v_created, v_type
    from public.users u where u.id = p_user;

  if v_email is null or coalesce(v_enabled, false) = false or v_created > now() - interval '2 minutes' then
    return;
  end if;

  if coalesce(v_kinds ->> p_kind, 'true') = 'false' then
    return;
  end if;

  if exists (
    select 1 from public.email_log l
    where l.user_id = p_user and l.kind = p_kind and l.sent_at > now() - interval '10 minutes'
  ) then
    return;
  end if;

  select coalesce(nullif(p.full_name, ''), nullif(u2.full_name, ''), 'ユーザー')
    into v_actor
    from public.users u2
    left join public.pt_profiles p on p.user_id = u2.id
    where u2.id = p_actor;

  select value into v_url from public.app_config where key = 'notify_webhook_url';
  select value into v_secret from public.app_config where key = 'notify_webhook_secret';
  if v_url is null or v_secret is null then
    return;
  end if;

  insert into public.email_log (user_id, kind) values (p_user, p_kind);

  perform net.http_post(
    url := v_url,
    headers := jsonb_build_object('Content-Type', 'application/json', 'x-notify-secret', v_secret),
    body := jsonb_build_object('to', v_email, 'kind', p_kind, 'actor', coalesce(v_actor, 'ユーザー'), 'account_type', coalesce(v_type, '')),
    timeout_milliseconds := 10000
  );
exception when others then
  return;
end
$f$;
revoke execute on function public.queue_email(uuid, uuid, text) from public, anon, authenticated;

-- 3週間以上使っていない人に、お知らせを送る（毎日1回、pg_cron が呼ぶ）。p_dry_run = true なら、送らずに、対象の人数だけを返す
create or replace function public.queue_inactive_reminders(p_dry_run boolean default false)
returns integer
language plpgsql
security definer
set search_path = ''
as $f$
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
      and u.last_seen_at < now() - interval '21 days'
      and u.created_at < now() - interval '21 days'
      and not exists (select 1 from public.admin_users a where a.user_id = u.id)
      and not exists (
        select 1 from public.email_log l
        where l.user_id = u.id and l.kind = 'reminder' and l.sent_at > now() - interval '60 days'
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
$f$;
revoke execute on function public.queue_inactive_reminders(boolean) from public, anon, authenticated;

-- 毎日 10:00（日本時間）に実行
select cron.unschedule('inactive-reminders') where exists (select 1 from cron.job where jobname = 'inactive-reminders');
select cron.schedule('inactive-reminders', '0 1 * * *', $$select public.queue_inactive_reminders(false)$$);
