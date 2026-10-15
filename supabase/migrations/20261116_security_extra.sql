-- セキュリティの見直し（追加分）
--  1) 資格の目標は、ログインしている人だけが読める（ログインなしでは、読めない）
--  2) 古い見本の表 pts は、使っていないので、誰も読めなくする（削除はしない）
--  3) 免許番号の列は、画面で使っていないので、書き込まれても空にする
--  4) トリガー用の関数は、直接呼べなくする
drop policy if exists qualification_targets_select_public on public.qualification_targets;
create policy qualification_targets_select_authenticated on public.qualification_targets for select to authenticated using (true);

revoke all on public.pts from anon, authenticated;

create or replace function public.certifications_no_license_number()
returns trigger language plpgsql set search_path = '' as $f$
begin
  new.license_number := null;
  return new;
end
$f$;
drop trigger if exists certifications_no_license_number on public.certifications;
create trigger certifications_no_license_number before insert or update on public.certifications
  for each row execute function public.certifications_no_license_number();
revoke execute on function public.certifications_no_license_number() from public, anon, authenticated;

revoke execute on function public.pt_profiles_hide_workplace() from public, anon, authenticated;
