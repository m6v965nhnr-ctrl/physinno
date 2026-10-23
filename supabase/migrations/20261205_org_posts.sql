-- 施設アカウントの投稿（お知らせ・採用情報。写真・動画つき）。職場ページの「投稿」タブと、PT・学生のホームに流す
-- 方針: 公開できるのは、運営が承認した組織だけ。読むのは関数（list_org_posts）から。書くのは、組織の持ち主だけ

-- ① 組織と、職場ページ（hospitals）のひもづけ
alter table public.organizations add column if not exists hospital_id uuid references public.hospitals(id) on delete set null;
grant select (hospital_id) on public.organizations to anon, authenticated;
grant insert (hospital_id) on public.organizations to authenticated;
grant update (hospital_id) on public.organizations to authenticated;
create index if not exists organizations_hospital_idx on public.organizations (hospital_id);

create or replace function public.organizations_guard() returns trigger
language plpgsql set search_path = '' as $f$
begin
  new.updated_at := now();
  -- 承認後に、名前・サイト・ひもづける職場ページを書き換えたら、もう一度、確認に戻す（なりすまし対策）
  if tg_op = 'UPDATE' and old.status = 'approved' and new.status = old.status
     and (new.name is distinct from old.name or new.website is distinct from old.website or new.hospital_id is distinct from old.hospital_id) then
    new.status := 'pending';
    new.reviewed_at := null;
  end if;
  return new;
end $f$;

-- ② 投稿
create table if not exists public.org_posts (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  kind text not null default 'info' check (kind in ('info', 'recruit')),
  body text not null check (char_length(btrim(body)) between 1 and 2000),
  media jsonb not null default '[]'::jsonb check (jsonb_typeof(media) = 'array' and jsonb_array_length(media) <= 4),
  job_id uuid references public.job_postings(id) on delete set null,
  created_at timestamptz not null default now()
);
create index if not exists org_posts_org_idx on public.org_posts (organization_id, created_at desc);
create index if not exists org_posts_job_idx on public.org_posts (job_id);
alter table public.org_posts enable row level security;
revoke all on public.org_posts from public, anon, authenticated;
grant select, insert, delete on public.org_posts to authenticated;

-- メディアは {path, type} の配列。pathは「組織のID/…」で始まり、typeは image か video
create or replace function public.org_post_media_ok(p_org uuid, p_media jsonb) returns boolean
language sql immutable set search_path = '' as $f$
  select not exists (
    select 1 from jsonb_array_elements(p_media) m
    where jsonb_typeof(m) <> 'object' or (m->>'type') not in ('image', 'video')
       or (m->>'path') is null or (m->>'path') not like (p_org::text || '/%') or char_length(m->>'path') > 200
  );
$f$;

-- 組織の持ち主かどうか（organizations.owner_id は、公開しない列なので、関数（SECURITY DEFINER）で確かめる）
create or replace function public.is_my_org(p_org uuid, p_need_approved boolean default false) returns boolean
language sql stable security definer set search_path = '' as $f$
  select exists (select 1 from public.organizations o where o.id = p_org and o.owner_id = (select auth.uid()) and (not p_need_approved or o.status = 'approved'));
$f$;
revoke all on function public.is_my_org(uuid, boolean) from public, anon;
grant execute on function public.is_my_org(uuid, boolean) to authenticated;

create policy org_posts_owner_select on public.org_posts for select to authenticated using (public.is_my_org(organization_id));
create policy org_posts_owner_insert on public.org_posts for insert to authenticated
  with check (public.is_my_org(organization_id, true) and public.org_post_media_ok(organization_id, media)
    and (job_id is null or exists (select 1 from public.job_postings j where j.id = job_id and j.organization_id = org_posts.organization_id)));
create policy org_posts_owner_delete on public.org_posts for delete to authenticated using (public.is_my_org(organization_id));

-- 以前のポリシーは、読めない列（owner_id）を参照していて、求人の作成・スカウトの閲覧が「権限なし」で失敗していた。関数で置き換える
drop policy if exists job_postings_owner_all on public.job_postings;
create policy job_postings_owner_all on public.job_postings for all to authenticated
  using (public.is_my_org(organization_id))
  with check (public.is_my_org(organization_id) and (status <> 'open' or public.is_my_org(organization_id, true)));
drop policy if exists scouts_participants_read on public.scouts;
create policy scouts_participants_read on public.scouts for select to authenticated
  using (pt_user_id = (select auth.uid()) or public.is_my_org(organization_id));
revoke references, trigger, truncate on public.organizations from anon, authenticated;

-- ③ 一覧（承認された組織の投稿だけ。ログインなしでも読める。職場ページ用は p_hospital を指定）
create or replace function public.list_org_posts(p_hospital uuid default null, p_limit integer default 20, p_before timestamptz default null)
returns table(id uuid, kind text, body text, media jsonb, job_id uuid, created_at timestamptz, org_id uuid, org_name text, org_category text, org_logo text, hospital_id uuid)
language sql stable security definer set search_path = '' as $f$
  select p.id, p.kind, p.body, p.media, p.job_id, p.created_at, o.id, o.name, o.facility_category, o.logo_url, o.hospital_id
  from public.org_posts p
  join public.organizations o on o.id = p.organization_id
  where o.status = 'approved'
    and (p_hospital is null or o.hospital_id = p_hospital)
    and (p_before is null or p.created_at < p_before)
  order by p.created_at desc
  limit least(greatest(p_limit, 1), 50);
$f$;
revoke all on function public.list_org_posts(uuid, integer, timestamptz) from public;
grant execute on function public.list_org_posts(uuid, integer, timestamptz) to anon, authenticated;

-- ④ 写真・動画の置き場（公開）。パスは「組織のID/ファイル名」
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('org-media', 'org-media', true, 31457280, array['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/quicktime'])
on conflict (id) do update set public = true, file_size_limit = 31457280,
  allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/quicktime'];

create policy org_media_owner_insert on storage.objects for insert to authenticated
  with check (bucket_id = 'org-media' and (storage.foldername(name))[1] ~ '^[0-9a-f-]{36}$' and public.is_my_org(((storage.foldername(name))[1])::uuid, true));
create policy org_media_owner_delete on storage.objects for delete to authenticated
  using (bucket_id = 'org-media' and (storage.foldername(name))[1] ~ '^[0-9a-f-]{36}$' and public.is_my_org(((storage.foldername(name))[1])::uuid));
