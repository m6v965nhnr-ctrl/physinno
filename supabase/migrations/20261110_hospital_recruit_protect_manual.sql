-- 自動の取り込みが上書きしてよいのは、自動で入れた行（source_name = 病院の採用ページ）だけ。人が入れた行（PT・運営者の転記）は守る
-- 採用の目安を取りにいく病院（病床の多い順。最後に取ってから約30日たった病院だけ。在籍PTが入力した病院は、自動では上書きしない）
create or replace function public.next_recruit_targets(p_token text, p_limit integer default 20)
returns table (id uuid, website text, has_money boolean)
language plpgsql security definer set search_path = public, extensions
as $f$
begin
  if not exists (select 1 from public.seminar_ingest_secret where hash = encode(extensions.digest(coalesce(p_token, ''), 'sha256'), 'hex')) then
    raise exception 'unauthorized';
  end if;
  return query
    select h.id, h.website, (r.monthly_min is not null or r.annual_stated_min is not null)
    from public.hospitals h
    left join public.hospital_recruit r on r.hospital_id = h.id
    where h.website is not null
      and h.website_status is distinct from 'dead'
      and (r.hospital_id is null or r.source_name = '病院の採用ページ')
      and (r.fetched_at is null or r.fetched_at < now() - interval '30 days')
    order by r.fetched_at nulls first, h.beds_total desc nulls last
    limit least(coalesce(p_limit, 20), 50);
end
$f$;

-- 取り込んだ採用の目安を書く。値が null の項目は、これまでの値を残す（お金の項目は、呼び出し側が、3〜9月だけ送る）
create or replace function public.ingest_hospital_recruit(p_token text, p_rows jsonb)
returns integer
language plpgsql security definer set search_path = public, extensions
as $f$
declare n integer;
begin
  if not exists (select 1 from public.seminar_ingest_secret where hash = encode(extensions.digest(coalesce(p_token, ''), 'sha256'), 'hex')) then
    raise exception 'unauthorized';
  end if;
  if jsonb_array_length(p_rows) > 100 then raise exception 'too many rows'; end if;

  insert into public.hospital_recruit as t (hospital_id, employment_types, monthly_min, monthly_max, bonus_months,
    annual_stated_min, annual_stated_max, weekly_off_days, annual_holidays, tags, access_station, access_minutes,
    access_mode, source_name, source_url, fetched_at, updated_at)
  select r.hospital_id, coalesce(r.employment_types, '{}'), r.monthly_min, r.monthly_max, r.bonus_months,
    r.annual_stated_min, r.annual_stated_max, r.weekly_off_days, r.annual_holidays, coalesce(r.tags, '{}'),
    r.access_station, r.access_minutes, r.access_mode, '病院の採用ページ', r.source_url, now(), now()
  from jsonb_to_recordset(p_rows) as r(hospital_id uuid, employment_types text[], monthly_min integer, monthly_max integer,
    bonus_months numeric, annual_stated_min integer, annual_stated_max integer, weekly_off_days integer,
    annual_holidays integer, tags text[], access_station text, access_minutes integer, access_mode text, source_url text)
  where exists (select 1 from public.hospitals h where h.id = r.hospital_id)
  on conflict (hospital_id) do update set
    employment_types = case when cardinality(excluded.employment_types) > 0 then excluded.employment_types else t.employment_types end,
    monthly_min = coalesce(excluded.monthly_min, t.monthly_min),
    monthly_max = coalesce(excluded.monthly_max, t.monthly_max),
    bonus_months = coalesce(excluded.bonus_months, t.bonus_months),
    annual_stated_min = coalesce(excluded.annual_stated_min, t.annual_stated_min),
    annual_stated_max = coalesce(excluded.annual_stated_max, t.annual_stated_max),
    weekly_off_days = coalesce(excluded.weekly_off_days, t.weekly_off_days),
    annual_holidays = coalesce(excluded.annual_holidays, t.annual_holidays),
    tags = case when cardinality(excluded.tags) > 0 then excluded.tags else t.tags end,
    access_station = coalesce(excluded.access_station, t.access_station),
    access_minutes = coalesce(excluded.access_minutes, t.access_minutes),
    access_mode = coalesce(excluded.access_mode, t.access_mode),
    source_name = excluded.source_name,
    source_url = coalesce(excluded.source_url, t.source_url),
    fetched_at = now(), updated_at = now()
  where t.source_name = '病院の採用ページ';
  get diagnostics n = row_count;
  return n;
end
$f$;

