-- PTのプロフィールと、病院ページの「連携」をやめる（PTが不安に感じるため。ユーザー判断 2026-10-14）。
-- 勤務先は、自由入力の文字だけ。すでにつながっていた分は解除済み。古い画面から送られても、連携が復活しないよう、DBでも止める。
update public.pt_profiles set hospital_id = null where hospital_id is not null;
update public.pt_private set hidden_hospital_id = null where hidden_hospital_id is not null;

create or replace function public.pt_profiles_no_hospital_link()
returns trigger
language plpgsql
set search_path = ''
as $f$
begin
  new.hospital_id := null;
  return new;
end
$f$;

drop trigger if exists aa_pt_profiles_no_hospital_link on public.pt_profiles;
-- 名前順で、他のトリガー（勤務先を非公開にする処理）より先に動かすため、先頭になる名前にする
create trigger aa_pt_profiles_no_hospital_link
  before insert or update on public.pt_profiles
  for each row execute function public.pt_profiles_no_hospital_link();
