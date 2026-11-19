-- 口コミサイトマップ（/kuchikomi/sitemap）が、種類ごとに id の順で取るための索引。
-- 既存の hospitals_category_type_name_idx（name 順）だと、深いページで匿名ロールの3秒の制限を超える。
create index if not exists hospitals_category_type_id_idx on public.hospitals (facility_category, facility_type, id);
