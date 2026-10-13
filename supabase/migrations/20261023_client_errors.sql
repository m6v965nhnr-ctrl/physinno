-- 画面（ブラウザ）で起きたエラーを集める、簡単な監視。外部サービスは使わない。
-- ユーザーのID・メールアドレスは、保存しない（どの画面で、どんなエラーが、何回起きたかだけ）。
create table if not exists public.client_errors (
  id uuid primary key default gen_random_uuid(),
  first_seen timestamptz not null default now(),
  last_seen timestamptz not null default now(),
  -- 同じエラーを、まとめるための印（メッセージ＋画面）
  fingerprint text not null unique,
  path text not null,
  message text not null,
  stack text,
  user_agent text,
  count integer not null default 1,
  status text not null default 'new' check (status in ('new', 'seen', 'fixed'))
);

alter table public.client_errors enable row level security;
revoke all on table public.client_errors from public, anon, authenticated;
grant all on table public.client_errors to service_role;

create or replace function public.report_client_error(
  p_message text,
  p_stack text default null,
  p_path text default null,
  p_user_agent text default null
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $f$
declare
  v_message text := left(btrim(coalesce(p_message, '')), 500);
  -- 画面のパスは、クエリ・URLの個別のID(UUID)を除いて、保存する
  v_path text := left(regexp_replace(regexp_replace(coalesce(p_path, '/'), '\?.*$', ''), '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}', ':id', 'g'), 200);
  v_fp text;
begin
  if v_message = '' then
    return false;
  end if;

  v_fp := md5(v_message || '|' || v_path);

  -- 荒らし・大量のエラー対策: 新しい種類のエラーは、1時間に50種類まで
  if not exists (select 1 from public.client_errors where fingerprint = v_fp)
     and (select count(*) from public.client_errors where first_seen > now() - interval '1 hour') >= 50 then
    return false;
  end if;

  insert into public.client_errors (fingerprint, path, message, stack, user_agent)
  values (v_fp, v_path, v_message, left(p_stack, 2000), left(p_user_agent, 200))
  on conflict (fingerprint) do update
    set count = public.client_errors.count + 1,
        last_seen = now(),
        status = case when public.client_errors.status = 'fixed' then 'new' else public.client_errors.status end;

  return true;
end
$f$;

revoke execute on function public.report_client_error(text, text, text, text) from public;
grant execute on function public.report_client_error(text, text, text, text) to anon, authenticated;

create or replace function public.admin_list_client_errors(p_status text default 'new')
returns table (id uuid, first_seen timestamptz, last_seen timestamptz, path text, message text, stack text, user_agent text, count integer, status text)
language sql
stable
security definer
set search_path = ''
as $f$
  select e.id, e.first_seen, e.last_seen, e.path, e.message, e.stack, e.user_agent, e.count, e.status
  from public.client_errors e
  where exists (select 1 from public.admin_users a where a.user_id = (select auth.uid()))
    and (p_status = 'all' or e.status = p_status)
  order by e.last_seen desc
  limit 100;
$f$;
revoke execute on function public.admin_list_client_errors(text) from public, anon;
grant execute on function public.admin_list_client_errors(text) to authenticated;

create or replace function public.admin_set_client_error(p_id uuid, p_status text)
returns boolean
language plpgsql
security definer
set search_path = ''
as $f$
begin
  if not exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())) then
    raise exception 'forbidden';
  end if;
  if p_status not in ('new', 'seen', 'fixed') then
    raise exception 'bad status';
  end if;
  update public.client_errors set status = p_status where id = p_id;
  return found;
end
$f$;
revoke execute on function public.admin_set_client_error(uuid, text) from public, anon;
grant execute on function public.admin_set_client_error(uuid, text) to authenticated;
