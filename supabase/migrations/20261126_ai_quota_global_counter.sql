-- AIの1日の全体上限: 毎回、全員の行を合計するのをやめ、日ごとの1行のカウンターで数える
-- （利用者が増えても、1回あたりの処理が増えない）。ユーザーごとの上限は、従来どおり ai_usage で数える。
create table if not exists public.ai_usage_global (
  day date primary key,
  n integer not null default 0
);
alter table public.ai_usage_global enable row level security;
revoke all on public.ai_usage_global from anon, authenticated;

-- 今日の分を、既存の記録から引き継ぐ
insert into public.ai_usage_global (day, n)
select day, coalesce(sum(n), 0) from public.ai_usage
where day = (now() at time zone 'Asia/Tokyo')::date
group by day
on conflict (day) do nothing;

create or replace function public.take_ai_quota(p_feature text)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_uid uuid := (select auth.uid());
  v_day date := (now() at time zone 'Asia/Tokyo')::date;
  v_user_cap integer;
  v_global_cap constant integer := 1500;
  v_g integer;
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

  insert into public.ai_usage (day, user_id, feature, n)
  values (v_day, v_uid, p_feature, 1)
  on conflict (day, user_id, feature) do update set n = public.ai_usage.n + 1
  returning n into v_n;

  if v_n > v_user_cap then
    update public.ai_usage set n = v_user_cap where day = v_day and user_id = v_uid and feature = p_feature;
    return 'user_limit';
  end if;

  -- 全体の上限: 上限に届いていなければ、1つ増やす（届いていたら、自分の分を戻して断る）
  insert into public.ai_usage_global (day, n) values (v_day, 0) on conflict (day) do nothing;
  update public.ai_usage_global set n = n + 1 where day = v_day and n < v_global_cap returning n into v_g;
  if v_g is null then
    update public.ai_usage set n = n - 1 where day = v_day and user_id = v_uid and feature = p_feature;
    return 'global_limit';
  end if;

  return 'ok';
end
$$;
