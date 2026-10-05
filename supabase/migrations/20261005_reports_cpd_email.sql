-- 通報・削除申請 / 資格目標の拡張(ポイント・対象の種類) / メール通知
-- ※ app_config の notify_webhook_secret は、このファイルには含めない(本番で別途設定する)

-- =========================================================
-- 1. 通報・削除申請
-- =========================================================
create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  target_type text not null check (target_type in ('post', 'comment', 'message', 'group_message', 'hospital_review')),
  target_id uuid not null,
  reason text not null check (reason in ('privacy', 'defamation', 'false_info', 'harassment', 'copyright', 'spam', 'other')),
  detail text check (char_length(detail) <= 2000),
  status text not null default 'open' check (status in ('open', 'resolved', 'dismissed')),
  admin_note text,
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

-- 同じ人が同じ対象を未対応のまま何度も通報できないようにする
create unique index if not exists reports_one_open_per_reporter
  on public.reports (reporter_id, target_type, target_id) where status = 'open';
create index if not exists reports_status_created_idx on public.reports (status, created_at desc);

alter table public.reports enable row level security;

create policy reports_insert_own on public.reports
  for insert to authenticated
  with check (reporter_id = (select auth.uid()));

create policy reports_select_own on public.reports
  for select to authenticated
  using (reporter_id = (select auth.uid()));

-- クライアントから書けるのは通報の内容だけ(状態・対応メモは運営のみ)
revoke all on table public.reports from public, anon, authenticated;
grant select on table public.reports to authenticated;
grant insert (target_type, target_id, reason, detail) on table public.reports to authenticated;
grant all on table public.reports to service_role;

-- 運営用: 通報の一覧(対象の内容の冒頭つき)
create or replace function public.admin_list_reports(p_status text default 'open')
returns table (
  id uuid, target_type text, target_id uuid, reason text, detail text, status text,
  admin_note text, created_at timestamptz, reporter_email text, snippet text, link_path text
)
language sql stable security definer set search_path = ''
as $f$
  select
    r.id, r.target_type, r.target_id, r.reason, r.detail, r.status, r.admin_note, r.created_at,
    u.email,
    left(case r.target_type
      when 'post' then (select coalesce(nullif(p.title, ''), '') || ' ' || coalesce(p.content, '') from public.posts p where p.id = r.target_id)
      when 'comment' then (select c.content from public.comments c where c.id = r.target_id)
      when 'message' then (select m.content from public.messages m where m.id = r.target_id)
      when 'group_message' then (select g.content from public.group_messages g where g.id = r.target_id)
      when 'hospital_review' then (select h.comment from public.hospital_reviews h where h.id = r.target_id)
    end, 300),
    case r.target_type
      when 'post' then '/posts/' || r.target_id::text
      when 'comment' then (select '/posts/' || c.post_id::text from public.comments c where c.id = r.target_id)
      when 'hospital_review' then (select '/hospitals/' || h.hospital_id::text from public.hospital_reviews h where h.id = r.target_id)
      else null
    end
  from public.reports r
  left join public.users u on u.id = r.reporter_id
  where exists (select 1 from public.admin_users a where a.user_id = (select auth.uid()))
    and (p_status = 'all' or r.status = p_status)
  order by r.created_at desc;
$f$;

-- 運営用: 通報への対応(削除 / 問題なしとして閉じる / 対応済み)
create or replace function public.admin_resolve_report(p_id uuid, p_action text, p_note text default null)
returns text
language plpgsql security definer set search_path = ''
as $f$
declare
  r public.reports%rowtype;
begin
  if not exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())) then
    raise exception 'forbidden';
  end if;

  select * into r from public.reports where id = p_id;
  if not found then
    raise exception 'not found';
  end if;

  if p_action = 'delete' then
    case r.target_type
      when 'post' then
        -- 投稿に紐づくコメント・いいね・通知も一緒に消す(連動して消える設定がないため)
        delete from public.comments where post_id = r.target_id;
        delete from public.likes where post_id = r.target_id;
        delete from public.notifications where post_id = r.target_id;
        delete from public.posts where id = r.target_id;
      when 'comment' then delete from public.comments where id = r.target_id;
      when 'message' then delete from public.messages where id = r.target_id;
      when 'group_message' then delete from public.group_messages where id = r.target_id;
      when 'hospital_review' then delete from public.hospital_reviews where id = r.target_id;
    end case;
    update public.reports set status = 'resolved', admin_note = p_note, resolved_at = now() where id = p_id;
  elsif p_action = 'resolve' then
    update public.reports set status = 'resolved', admin_note = p_note, resolved_at = now() where id = p_id;
  elsif p_action = 'dismiss' then
    update public.reports set status = 'dismissed', admin_note = p_note, resolved_at = now() where id = p_id;
  else
    raise exception 'bad action';
  end if;

  return 'ok';
end
$f$;

revoke execute on function public.admin_list_reports(text) from public, anon;
revoke execute on function public.admin_resolve_report(uuid, text, text) from public, anon;
grant execute on function public.admin_list_reports(text) to authenticated;
grant execute on function public.admin_resolve_report(uuid, text, text) to authenticated;

-- =========================================================
-- 2. 資格目標の拡張(数え方・対象にする実績の種類)
-- =========================================================
alter table public.qualification_targets
  add column if not exists unit text not null default 'count' check (unit in ('count', 'points')),
  add column if not exists count_categories text[] not null
    default array['conference', 'case_presentation', 'training', 'paper', 'other'];

-- =========================================================
-- 3. メール通知
-- =========================================================
alter table public.users
  add column if not exists email_notifications boolean not null default true;

create table if not exists public.app_config (
  key text primary key,
  value text not null
);
alter table public.app_config enable row level security;
revoke all on table public.app_config from public, anon, authenticated;
grant all on table public.app_config to service_role;

create table if not exists public.email_log (
  id bigserial primary key,
  user_id uuid not null,
  kind text not null,
  sent_at timestamptz not null default now()
);
create index if not exists email_log_user_kind_idx on public.email_log (user_id, kind, sent_at desc);
alter table public.email_log enable row level security;
revoke all on table public.email_log from public, anon, authenticated;
grant all on table public.email_log to service_role;
revoke all on sequence public.email_log_id_seq from public, anon, authenticated;

-- 通知メールを送る依頼を出す(本文は含めない。誰から何が届いたかだけを送る)
create or replace function public.queue_email(p_user uuid, p_actor uuid, p_kind text)
returns void
language plpgsql security definer set search_path = ''
as $f$
declare
  v_email text;
  v_enabled boolean;
  v_created timestamptz;
  v_actor text;
  v_url text;
  v_secret text;
begin
  if p_user is null or p_user = p_actor then
    return;
  end if;

  select u.email, u.email_notifications, u.created_at
    into v_email, v_enabled, v_created
    from public.users u where u.id = p_user;

  -- 登録直後(招待経由の自動フォローなど)は送らない
  if v_email is null or coalesce(v_enabled, false) = false or v_created > now() - interval '2 minutes' then
    return;
  end if;

  -- 同じ種類は10分に1通まで
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
  -- メールの失敗で本来の操作(コメント・メッセージ)を失敗させない
  return;
end
$f$;
revoke all on function public.queue_email(uuid, uuid, text) from public, anon, authenticated;

create or replace function public.trg_notifications_email()
returns trigger
language plpgsql security definer set search_path = ''
as $f$
begin
  if new.type in ('comment', 'follow') then
    perform public.queue_email(new.user_id, new.actor_id, new.type);
  end if;
  return new;
end
$f$;
revoke all on function public.trg_notifications_email() from public, anon, authenticated;

drop trigger if exists notifications_email on public.notifications;
create trigger notifications_email
  after insert on public.notifications
  for each row execute function public.trg_notifications_email();

create or replace function public.trg_messages_email()
returns trigger
language plpgsql security definer set search_path = ''
as $f$
declare
  v_to uuid;
begin
  select case when c.user1_id = new.sender_id then c.user2_id else c.user1_id end
    into v_to
    from public.conversations c where c.id = new.conversation_id;
  perform public.queue_email(v_to, new.sender_id, 'message');
  return new;
end
$f$;
revoke all on function public.trg_messages_email() from public, anon, authenticated;

drop trigger if exists messages_email on public.messages;
create trigger messages_email
  after insert on public.messages
  for each row execute function public.trg_messages_email();

-- 自分の通知メール設定だけを変更できる(users は直接更新できない設計のため専用の関数を使う)
create or replace function public.set_my_email_notifications(p_enabled boolean)
returns void
language sql security definer set search_path = ''
as $f$
  update public.users set email_notifications = p_enabled where id = (select auth.uid());
$f$;
revoke execute on function public.set_my_email_notifications(boolean) from public, anon;
grant execute on function public.set_my_email_notifications(boolean) to authenticated;
