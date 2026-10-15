-- 病院の採用の目安（雇用形態・給与・休日・アクセス）。検索の絞り込み用。1病院に1行。
--  ・年収: 月給だけの病院は「月給×12」、賞与が「◯か月分」の病院は「月給×(12＋か月数)」で、自動で計算する（年収が直接書かれていれば、それを使う）
--  ・書けるのは、「ここで働いています」と答えたPT・病院の登録者・（出典つきの）自動取り込みだけ
create table if not exists public.hospital_recruit (
  hospital_id uuid primary key references public.hospitals(id) on delete cascade,
  employment_types text[] not null default '{}',          -- 常勤 / 非常勤 / パート
  monthly_min integer check (monthly_min between 0 and 2000000),
  monthly_max integer check (monthly_max between 0 and 2000000),
  bonus_months numeric(3,1) check (bonus_months between 0 and 12),
  annual_stated_min integer check (annual_stated_min between 0 and 30000000),
  annual_stated_max integer check (annual_stated_max between 0 and 30000000),
  annual_min integer generated always as (
    coalesce(annual_stated_min, case when monthly_min is not null then round(monthly_min * (12 + coalesce(bonus_months, 0)))::integer end)
  ) stored,
  annual_max integer generated always as (
    coalesce(annual_stated_max, annual_stated_min,
             case when coalesce(monthly_max, monthly_min) is not null then round(coalesce(monthly_max, monthly_min) * (12 + coalesce(bonus_months, 0)))::integer end)
  ) stored,
  weekly_off_days integer check (weekly_off_days between 1 and 3),   -- 週休◯日
  annual_holidays integer check (annual_holidays between 50 and 200),
  tags text[] not null default '{}',                       -- こだわりポイント（土日休み・寮あり など）
  access_station text,
  access_minutes integer check (access_minutes between 0 and 180),
  access_mode text check (access_mode in ('walk', 'bus', 'shuttle', 'car')),
  source_name text,
  source_url text,
  fetched_at timestamptz,
  updated_at timestamptz not null default now()
);
create index if not exists hospital_recruit_annual_idx on public.hospital_recruit (annual_max);

alter table public.hospital_recruit enable row level security;
create policy hospital_recruit_read on public.hospital_recruit for select to anon, authenticated using (true);
create policy hospital_recruit_write_staff on public.hospital_recruit for all to authenticated
  using (public.can_edit_hospital_data(hospital_id)) with check (public.can_edit_hospital_data(hospital_id));
revoke all on public.hospital_recruit from anon, authenticated;
grant select on public.hospital_recruit to anon, authenticated;
grant insert, update, delete on public.hospital_recruit to authenticated;

-- 公式サイトのリンクが生きているか（定期チェックの結果）。死んでいるリンクは、画面に出さない
alter table public.hospitals
  add column if not exists website_status text check (website_status in ('ok', 'dead')),
  add column if not exists website_checked_at timestamptz;
grant select (website_status, website_checked_at) on public.hospitals to anon, authenticated;
