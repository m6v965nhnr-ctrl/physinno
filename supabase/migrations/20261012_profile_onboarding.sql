-- 初回プロフィール登録の完了日時。未完了のPTはプロフィール入力画面から先へ進めない
alter table public.pt_profiles add column if not exists onboarded_at timestamptz;

-- 既存ユーザーは強制しない（名前が入っているプロフィールは完了扱い）
update public.pt_profiles
   set onboarded_at = coalesce(updated_at, created_at, now())
 where onboarded_at is null
   and coalesce(full_name, '') <> '';
