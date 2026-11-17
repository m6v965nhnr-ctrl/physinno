-- 施設の種類（分類×種類）で絞り、名前順に並べる検索（職場口コミサイト）を、ゲスト用の3秒の制限の中で速くする
create index if not exists hospitals_category_type_name_idx on public.hospitals (facility_category, facility_type, name);
analyze public.hospitals;
