-- AI機能（Gemini）の、1日あたりの使用回数の上限。使いすぎ・悪用・費用の暴走を防ぐ。
--  ・ユーザーごとに、機能ごとの上限（下の表）
--  ・全体で、1日の上限（無料枠をあふれさせない）
-- 日付は、日本時間。ログイン中のユーザーだけが呼べる。上限を変えるときは、この関数を直す。
create table if not exists public.ai_usage (
  day date not null,
  user_id uuid not null references auth.users (id) on delete cascade,
  feature text not null,
  n integer not null default 0,
  primary key (day, user_id, feature)
);

alter table public.ai_usage enable row level security;
revoke all on table public.ai_usage from public, anon, authenticated;
grant all on table public.ai_usage to service_role;

create or replace function public.take_ai_quota(p_feature text)
returns text
language plpgsql
security definer
set search_path = ''
as $f$
declare
  v_uid uuid := (select auth.uid());
  v_day date := (now() at time zone 'Asia/Tokyo')::date;
  v_user_cap integer;
  v_global_cap constant integer := 1500;
  v_global integer;
  v_n integer;
begin
  if v_uid is null then
    return 'unauthorized';
  end if;

  v_user_cap := case p_feature
    when 'ideas' then 20
    when 'papers_ai' then 40
    when 'report_helper' then 20
    when 'quiz_related' then 60
    when 'translate_abstract' then 100
    else 30
  end;

  select coalesce(sum(n), 0) into v_global from public.ai_usage where day = v_day;
  if v_global >= v_global_cap then
    return 'global_limit';
  end if;

  insert into public.ai_usage (day, user_id, feature, n)
  values (v_day, v_uid, p_feature, 1)
  on conflict (day, user_id, feature) do update set n = public.ai_usage.n + 1
  returning n into v_n;

  if v_n > v_user_cap then
    -- 上限を超えた分は、数えない（上限に張りつく）
    update public.ai_usage set n = v_user_cap where day = v_day and user_id = v_uid and feature = p_feature;
    return 'user_limit';
  end if;

  return 'ok';
end
$f$;

revoke execute on function public.take_ai_quota(text) from public, anon;
grant execute on function public.take_ai_quota(text) to authenticated;
