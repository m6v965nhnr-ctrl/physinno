-- PTが「採用担当に伝えたいこと」を、見やすく書けるようにする。
-- 1) 公開プロフィールに、ひとこと・大切にしていること・今学んでいること
-- 2) 承認された組織にだけ見える、働き方の希望（pt_work_prefs）

alter table public.pt_profiles
  add column if not exists one_liner text,
  add column if not exists values_tags text[] not null default '{}',
  add column if not exists learning_now text;

alter table public.pt_profiles
  add constraint pt_profiles_one_liner_len check (one_liner is null or char_length(one_liner) <= 60),
  add constraint pt_profiles_learning_len check (learning_now is null or char_length(learning_now) <= 200),
  add constraint pt_profiles_values_tags_max check (coalesce(array_length(values_tags, 1), 0) <= 3);

create table if not exists public.pt_work_prefs (
  user_id uuid primary key references auth.users(id) on delete cascade,
  seek_tags text[] not null default '{}',
  areas text,
  shift_pref text check (shift_pref in ('ok', 'ng', 'consult')),
  visit_pref text check (visit_pref in ('ok', 'ng', 'consult')),
  employment text[] not null default '{}',
  start_timing text check (start_timing in ('now', 'within3m', 'within6m', 'later', 'undecided')),
  note text,
  updated_at timestamptz not null default now(),
  constraint pt_work_prefs_seek_max check (coalesce(array_length(seek_tags, 1), 0) <= 3),
  constraint pt_work_prefs_employment_max check (coalesce(array_length(employment, 1), 0) <= 4),
  constraint pt_work_prefs_areas_len check (areas is null or char_length(areas) <= 100),
  constraint pt_work_prefs_note_len check (note is null or char_length(note) <= 300)
);

alter table public.pt_work_prefs enable row level security;

-- organizations.owner_id は列の権限で直接読めないため、承認済みの組織の持ち主かどうかは関数で確かめる
create or replace function public.is_approved_org_owner()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.organizations o where o.owner_id = (select auth.uid()) and o.status = 'approved');
$$;
revoke all on function public.is_approved_org_owner() from public;
grant execute on function public.is_approved_org_owner() to authenticated;

create policy "own work prefs" on public.pt_work_prefs
  for all to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

-- スカウトを受け付けているPTの希望だけ、承認された組織が読める
create policy "approved org reads work prefs" on public.pt_work_prefs
  for select to authenticated
  using (
    public.is_approved_org_owner()
    and exists (select 1 from public.pt_profiles p where p.user_id = pt_work_prefs.user_id and p.accept_scouts and not p.is_student)
  );

revoke all on public.pt_work_prefs from anon, public;
grant select, insert, update, delete on public.pt_work_prefs to authenticated;
