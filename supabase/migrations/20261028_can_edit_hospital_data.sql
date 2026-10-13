-- 病院の情報（疾患比率・採用情報）を編集できる人かどうかを、サーバー側で判定する。
-- 編集できるのは、その病院に在籍するPT、病院を登録した人、運営している人。
-- （作成者・運営者のユーザーIDを、画面から読めなくするため、判定をDB関数に移す）
create or replace function public.can_edit_hospital_data(p_hospital uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $f$
  select exists (
    select 1 from public.pt_profiles p
    where p.user_id = (select auth.uid()) and p.hospital_id = p_hospital
  ) or exists (
    select 1 from public.hospitals h
    where h.id = p_hospital
      and ((select auth.uid()) = h.created_by or (select auth.uid()) = h.claimed_by)
  );
$f$;

revoke execute on function public.can_edit_hospital_data(uuid) from public, anon;
grant execute on function public.can_edit_hospital_data(uuid) to authenticated;
