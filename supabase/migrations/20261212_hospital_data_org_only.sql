-- 疾患比率と採用情報を編集できるのは、その施設にひもづいた承認済みの組織（採用アカウント）だけにする
-- （これまでは、在籍を自己申告したPT・作成者・運営者も編集できた。病院の基本情報の編集は、これまで通り）

create or replace function public.is_hospital_org(p_hospital uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $f$
  select exists (
    select 1 from public.organizations o
    where o.hospital_id = p_hospital
      and o.owner_id = (select auth.uid())
      and o.status = 'approved'
  );
$f$;

revoke all on function public.is_hospital_org(uuid) from public, anon;
grant execute on function public.is_hospital_org(uuid) to authenticated;

drop policy if exists hospital_disease_ratios_write_staff on public.hospital_disease_ratios;
create policy hospital_disease_ratios_write_staff on public.hospital_disease_ratios for all to authenticated
  using (public.is_hospital_org(hospital_id)) with check (public.is_hospital_org(hospital_id));

drop policy if exists hospital_recruit_write_staff on public.hospital_recruit;
create policy hospital_recruit_write_staff on public.hospital_recruit for all to authenticated
  using (public.is_hospital_org(hospital_id)) with check (public.is_hospital_org(hospital_id));

-- 採用情報の自由記述（hospitals.recruitment_info）は、列の権限ごと閉じて、関数経由だけにする
revoke update (recruitment_info) on public.hospitals from authenticated;

create or replace function public.set_hospital_recruitment_info(p_hospital uuid, p_text text)
returns void
language plpgsql
security definer
set search_path = ''
as $f$
begin
  if not public.is_hospital_org(p_hospital) then
    raise exception 'not allowed';
  end if;
  update public.hospitals
  set recruitment_info = nullif(left(btrim(coalesce(p_text, '')), 2000), '')
  where id = p_hospital;
end;
$f$;

revoke all on function public.set_hospital_recruitment_info(uuid, text) from public, anon;
grant execute on function public.set_hospital_recruitment_info(uuid, text) to authenticated;
