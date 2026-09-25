-- Re:light: このリポジトリの機能追加で本番DBに適用済みのスキーマ変更（参照用・再現用）。
-- 秘密の値（取り込み用トークンのハッシュ・anonキー）は含めていません。

-- ===== レビューの匿名投稿 =====
alter table public.reviews add column if not exists is_anonymous boolean not null default false;

-- ===== 研修・学会情報（News） =====
create table if not exists public.seminars (
  id text primary key,                       -- 例: ptotst:106433 / jpta:165370 / pref-akita:ics-xxxx
  source text not null,
  source_label text not null,
  title text not null,
  organizer text,
  kind text not null default 'セミナー',
  start_date date not null,
  end_date date not null,
  date_text text,
  format text check (format in ('online','offline','hybrid')),
  prefecture text,
  region text,
  fee_text text,
  fee_yen integer,
  is_free boolean not null default false,
  fields text[] not null default '{}',
  summary text,
  url text not null,
  seen_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);
create index if not exists seminars_start_date_idx on public.seminars (start_date);
create index if not exists seminars_end_date_idx on public.seminars (end_date);
alter table public.seminars enable row level security;

-- PTアカウントのみ閲覧可。書き込みは Edge Function（service role）と ingest_seminars のみ
create policy "pt users can read seminars" on public.seminars
  for select to authenticated
  using (exists (select 1 from public.users u where u.id = (select auth.uid()) and u.account_type = 'pt'));

create table if not exists public.seminar_sync_log (job text primary key, ran_at timestamptz not null default now());
alter table public.seminar_sync_log enable row level security;

create table if not exists public.seminar_saves (
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  seminar_id text not null references public.seminars(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, seminar_id)
);
create index if not exists seminar_saves_seminar_id_idx on public.seminar_saves (seminar_id);
alter table public.seminar_saves enable row level security;
create policy "own saves select" on public.seminar_saves for select to authenticated using (user_id = (select auth.uid()));
create policy "own saves insert" on public.seminar_saves for insert to authenticated with check (user_id = (select auth.uid()));
create policy "own saves delete" on public.seminar_saves for delete to authenticated using (user_id = (select auth.uid()));

-- Vercel Cron（Node）からの取り込み用。トークン（CRON_SECRET）のSHA-256ハッシュだけをDBに持つ
create table if not exists public.seminar_ingest_secret (hash text primary key);
alter table public.seminar_ingest_secret enable row level security;
-- insert into public.seminar_ingest_secret (hash) values (encode(extensions.digest('<CRON_SECRET>', 'sha256'), 'hex'));

create or replace function public.ingest_seminars(p_token text, p_rows jsonb)
returns integer language plpgsql security definer set search_path = public, extensions as $$
declare n integer;
begin
  if not exists (select 1 from public.seminar_ingest_secret
                 where hash = encode(extensions.digest(coalesce(p_token, ''), 'sha256'), 'hex')) then
    raise exception 'unauthorized';
  end if;
  if jsonb_array_length(p_rows) > 1000 then raise exception 'too many rows'; end if;

  insert into public.seminars (id, source, source_label, title, organizer, kind, start_date, end_date, date_text,
    format, prefecture, region, fee_text, fee_yen, is_free, fields, summary, url, seen_at)
  select r.id, r.source, r.source_label, r.title, r.organizer, r.kind, r.start_date, r.end_date, r.date_text,
    r.format, r.prefecture, r.region, r.fee_text, r.fee_yen, coalesce(r.is_free, false), coalesce(r.fields, '{}'),
    r.summary, r.url, now()
  from jsonb_to_recordset(p_rows) as r(id text, source text, source_label text, title text, organizer text, kind text,
    start_date date, end_date date, date_text text, format text, prefecture text, region text, fee_text text,
    fee_yen integer, is_free boolean, fields text[], summary text, url text)
  where r.source = 'jpta' or r.source like 'pref-%'
  on conflict (id) do update set title = excluded.title, organizer = excluded.organizer, kind = excluded.kind,
    start_date = excluded.start_date, end_date = excluded.end_date, date_text = excluded.date_text,
    format = excluded.format, prefecture = excluded.prefecture, region = excluded.region,
    fee_text = excluded.fee_text, fee_yen = excluded.fee_yen, is_free = excluded.is_free,
    fields = excluded.fields, summary = excluded.summary, url = excluded.url, seen_at = now();
  get diagnostics n = row_count;
  return n;
end $$;
revoke execute on function public.ingest_seminars(text, jsonb) from public, authenticated;
grant execute on function public.ingest_seminars(text, jsonb) to anon;

-- ===== 毎日 0:00(JST)=15:00(UTC) の取得（pg_cron → Edge Function sync-seminars） =====
-- run_seminar_sync(p_cleanup) は pg_net で ptotst / pref / osaka / jpta-other / jpta-nichiken / pt-kanagawa の各ジョブを
-- 小分けに呼び出す（Authorization には anon キーを使用）。詳細は docs/ARCHITECTURE.md
-- select cron.schedule('seminar-sync-daily',    '0 15 * * *',  $$select public.run_seminar_sync(false)$$);
-- select cron.schedule('seminar-cleanup-daily', '30 15 * * *', $$select public.run_seminar_sync(true)$$);

-- ===== 公開プロフィールから非公開項目を分離 =====
create table if not exists public.pt_private (
  user_id uuid primary key default auth.uid() references auth.users(id) on delete cascade,
  license_number text,
  self_assessment_private text,
  updated_at timestamptz not null default now()
);
alter table public.pt_private enable row level security;
create policy "own private select" on public.pt_private for select to authenticated using (user_id = (select auth.uid()));
create policy "own private insert" on public.pt_private for insert to authenticated with check (user_id = (select auth.uid()));
create policy "own private update" on public.pt_private for update to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy "own private delete" on public.pt_private for delete to authenticated using (user_id = (select auth.uid()));
alter table public.pt_profiles drop column if exists license_number;
alter table public.pt_profiles drop column if exists self_assessment_private;

-- ===== 性能・権限の是正（Supabase advisors 対応） =====
-- RLS内の auth.uid() / is_general_user() を (select ...) で包み、行ごとの再評価を避ける（65ポリシー）
-- 外部キー索引
create index if not exists comments_user_id_idx on public.comments (user_id);
create index if not exists conversations_user2_id_idx on public.conversations (user2_id);
create index if not exists messages_sender_id_idx on public.messages (sender_id);
create index if not exists notifications_actor_id_idx on public.notifications (actor_id);
create index if not exists notifications_message_id_idx on public.notifications (message_id);
create index if not exists notifications_post_id_idx on public.notifications (post_id);
drop policy if exists "Allow select pt_profiles" on public.pt_profiles;

-- ストレージ: 自分のフォルダ（{user_id}/...）にだけアップロード可能。サイズ・種類の上限を設定
drop policy if exists "s" on storage.objects;
drop policy if exists "allow_upload_profile_images vejz8c_0" on storage.objects;
create policy "own folder upload profile and post media" on storage.objects
  for insert to authenticated
  with check (bucket_id in ('profile-images', 'post-media') and (storage.foldername(name))[1] = (select auth.uid())::text);
update storage.buckets set file_size_limit = 10485760, allowed_mime_types = array['image/*'] where id = 'profile-images';
update storage.buckets set file_size_limit = 52428800, allowed_mime_types = array['image/*','video/*','application/pdf'] where id = 'post-media';
update storage.buckets set file_size_limit = 20971520 where id = 'portfolio-files';
