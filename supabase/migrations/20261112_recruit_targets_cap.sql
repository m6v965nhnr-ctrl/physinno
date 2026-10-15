-- 1日に取りにいく病院の上限を、50 から 200 に（約30日で全病院を1周するため、1日約155件が必要）
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
    limit least(coalesce(p_limit, 20), 200);
end
$f$;

-- 取り込んだ採用の目安を書く。値が null の項目は、これまでの値を残す（お金の項目は、呼び出し側が、3〜9月だけ送る）
