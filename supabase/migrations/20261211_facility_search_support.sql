-- 施設の大量取り込み（約14.6万件）に合わせた検索の支え
-- 1) 市区町村の一覧: これまでは hospitals から1,000行だけ読んで作っていたため、取りこぼしていた。distinct をDB側で行う
create or replace function public.hospital_cities(p_prefecture text)
returns text[]
language sql
stable
security invoker
set search_path = ''
as $f$
  select coalesce(array_agg(city order by city), '{}')
  from (
    select distinct city from public.hospitals
    where prefecture = p_prefecture and city is not null
  ) t;
$f$;

revoke all on function public.hospital_cities(text) from public;
grant execute on function public.hospital_cities(text) to anon, authenticated;

-- 2) 県・市区町村での絞り込みと distinct を速くする索引
create index if not exists hospitals_prefecture_city_idx on public.hospitals (prefecture, city);
