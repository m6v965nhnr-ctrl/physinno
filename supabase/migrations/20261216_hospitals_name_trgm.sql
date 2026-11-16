-- 施設名の部分一致検索(ilike '%...%')を速くする。職場口コミサイトの施設検索は、ログインなし(statement_timeout 3s)でも使うため
create extension if not exists pg_trgm with schema extensions;
create index if not exists hospitals_name_trgm_idx on public.hospitals using gin (name extensions.gin_trgm_ops);
analyze public.hospitals;
