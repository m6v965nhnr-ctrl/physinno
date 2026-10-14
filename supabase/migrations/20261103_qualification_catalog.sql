-- 資格の目標（登録・認定・専門理学療法士）。種類・分野・目的（取得／更新）と、チェックした項目を持てるようにする。
-- 既存の「自分で設定する目標」は、kind が null のまま、今までどおり動く。
alter table public.qualification_targets
  add column if not exists kind text check (kind in ('registered', 'certified', 'specialist')),
  add column if not exists field text,
  add column if not exists mode text check (mode in ('acquire', 'renew')),
  add column if not exists checklist jsonb not null default '{}'::jsonb;
