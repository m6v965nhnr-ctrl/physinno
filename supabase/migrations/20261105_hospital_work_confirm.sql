-- 病院の情報（疾患比率・採用情報・規模など）を編集できる人:
--   ・「あなたは本当にここで働いていますか？」に「はい」と答えた、PTのアカウント
--   ・病院を登録した人・運営している人
-- 「はい」の記録は、本人にだけ見える（プロフィールとは、つなげない。他の人には、どこで働いているかは、伝わらない）。
create table if not exists public.hospital_edit_confirmations (
  user_id uuid not null references auth.users(id) on delete cascade,
  hospital_id uuid not null references public.hospitals(id) on delete cascade,
  confirmed_at timestamptz not null default now(),
  primary key (user_id, hospital_id)
);
create index if not exists hospital_edit_confirmations_hospital_idx on public.hospital_edit_confirmations (hospital_id);

alter table public.hospital_edit_confirmations enable row level security;
create policy hospital_edit_confirmations_select_own on public.hospital_edit_confirmations
  for select to authenticated using (user_id = (select auth.uid()));
create policy hospital_edit_confirmations_delete_own on public.hospital_edit_confirmations
  for delete to authenticated using (user_id = (select auth.uid()));
revoke insert, update on public.hospital_edit_confirmations from anon, authenticated;
revoke all on public.hospital_edit_confirmations from anon;

-- 「はい、ここで働いています」と答える（PTのアカウントだけ）
create or replace function public.confirm_hospital_work(p_hospital uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $f$
declare
  v_uid uuid := (select auth.uid());
begin
  if v_uid is null then
    raise exception 'ログインが必要です';
  end if;
  if not exists (select 1 from public.users u where u.id = v_uid and u.account_type = 'pt') then
    raise exception 'PTのアカウントだけが、病院の情報を編集できます';
  end if;
  if not exists (select 1 from public.hospitals h where h.id = p_hospital) then
    raise exception '病院が見つかりません';
  end if;
  insert into public.hospital_edit_confirmations (user_id, hospital_id) values (v_uid, p_hospital)
  on conflict do nothing;
end
$f$;
revoke execute on function public.confirm_hospital_work(uuid) from public, anon;
grant execute on function public.confirm_hospital_work(uuid) to authenticated;

-- 編集できる人か（画面と、DBの書き込みの許可の、両方で使う）
create or replace function public.can_edit_hospital_data(p_hospital uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $f$
  select exists (
    select 1 from public.hospital_edit_confirmations c
    join public.users u on u.id = c.user_id and u.account_type = 'pt'
    where c.user_id = (select auth.uid()) and c.hospital_id = p_hospital
  ) or exists (
    select 1 from public.hospitals h
    where h.id = p_hospital
      and ((select auth.uid()) = h.created_by or (select auth.uid()) = h.claimed_by)
  );
$f$;
revoke execute on function public.can_edit_hospital_data(uuid) from public, anon;
grant execute on function public.can_edit_hospital_data(uuid) to authenticated;

-- 書き込みの許可も、同じ判定にそろえる（以前は、プロフィールの連携が条件だった）
drop policy if exists hospitals_update_staff on public.hospitals;
create policy hospitals_update_staff on public.hospitals for update to authenticated
  using (public.can_edit_hospital_data(id)) with check (public.can_edit_hospital_data(id));

drop policy if exists hospital_disease_ratios_write_staff on public.hospital_disease_ratios;
create policy hospital_disease_ratios_write_staff on public.hospital_disease_ratios for all to authenticated
  using (public.can_edit_hospital_data(hospital_id)) with check (public.can_edit_hospital_data(hospital_id));

-- 病院の作成者・運営者の列は、編集できる人でも、書き換えられないようにする
revoke update (id, created_by, claimed_by, created_at) on public.hospitals from authenticated;
