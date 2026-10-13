-- 通知メールを、種類ごと（コメント・メッセージ・フォロー・質問への回答）にオン・オフできるようにする。
-- 全体のスイッチ（users.email_notifications）はそのまま。種類ごとの設定は、オフにした種類だけを持つ。
alter table public.users
  add column if not exists email_notification_kinds jsonb not null default '{}'::jsonb;

-- 本人の設定を読む（users テーブルはクライアントから直接読み書きしない設計）
create or replace function public.get_my_email_notification_settings()
returns table (enabled boolean, kinds jsonb)
language sql
stable
security definer
set search_path = ''
as $f$
  select coalesce(u.email_notifications, true), coalesce(u.email_notification_kinds, '{}'::jsonb)
  from public.users u where u.id = (select auth.uid());
$f$;
revoke execute on function public.get_my_email_notification_settings() from public, anon;
grant execute on function public.get_my_email_notification_settings() to authenticated;

create or replace function public.set_my_email_notification_kind(p_kind text, p_enabled boolean)
returns void
language plpgsql
security definer
set search_path = ''
as $f$
begin
  if p_kind not in ('comment', 'message', 'follow', 'answer') then
    raise exception 'bad kind';
  end if;
  update public.users
     set email_notification_kinds = coalesce(email_notification_kinds, '{}'::jsonb) || jsonb_build_object(p_kind, p_enabled)
   where id = (select auth.uid());
end
$f$;
revoke execute on function public.set_my_email_notification_kind(text, boolean) from public, anon;
grant execute on function public.set_my_email_notification_kind(text, boolean) to authenticated;

-- メールを送る前に、種類ごとの設定も見る（オフにした種類は送らない）
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
  v_actor text;
  v_url text;
  v_secret text;
begin
  if p_user is null or p_user = p_actor then
    return;
  end if;

  select u.email, u.email_notifications, u.email_notification_kinds, u.created_at
    into v_email, v_enabled, v_kinds, v_created
    from public.users u where u.id = p_user;

  if v_email is null or coalesce(v_enabled, false) = false or v_created > now() - interval '2 minutes' then
    return;
  end if;

  -- この種類だけ、オフにしている
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
    body := jsonb_build_object('to', v_email, 'kind', p_kind, 'actor', coalesce(v_actor, 'ユーザー')),
    timeout_milliseconds := 10000
  );
exception when others then
  return;
end
$f$;
revoke execute on function public.queue_email(uuid, uuid, text) from public, anon, authenticated;
