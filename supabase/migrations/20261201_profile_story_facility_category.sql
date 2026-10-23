-- ① PTの公開プロフィール: 理学療法士になった理由・資格の経緯・資格の活かし方（本番には適用済みの列。再実行しても安全）
alter table public.pt_profiles
  add column if not exists why_pt text check (why_pt is null or char_length(why_pt) <= 1000),
  add column if not exists qualification_story text check (qualification_story is null or char_length(qualification_story) <= 1000),
  add column if not exists qualification_use text check (qualification_use is null or char_length(qualification_use) <= 1000);

-- ② 勤務先を、病院だけでなく、介護・訪問・小児・スポーツ・教育・企業・行政・産業・独立などにも広げる
-- 施設の大分類（11種）と種類。既存の施設は、すべて「病院・医療機関」
alter table public.hospitals
  add column if not exists facility_category text not null default '病院・医療機関' check (char_length(facility_category) <= 30),
  add column if not exists facility_type text check (facility_type is null or char_length(facility_type) <= 40);
create index if not exists hospitals_facility_category_idx on public.hospitals (facility_category);
grant select (facility_category, facility_type) on public.hospitals to anon, authenticated;
grant insert (facility_category, facility_type) on public.hospitals to authenticated;
grant update (facility_category, facility_type) on public.hospitals to authenticated;
