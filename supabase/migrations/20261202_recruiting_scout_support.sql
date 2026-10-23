-- 採用情報（組織・求人）、PTへのスカウト、プロフィールへのいいね・応援コメント
-- 方針: 書き込みは、RLSと、権限を確認するDB関数（RPC）だけ。組織は運営の承認が済むまで、求人を公開できず、スカウトも送れない。
-- 既存の users / pt_profiles / follows / user_blocks / reports / notifications / admin_users を再利用する。

-- ============ ① 組織 ============
create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null unique references auth.users(id) on delete cascade,
  name text not null check (char_length(btrim(name)) between 1 and 100),
  facility_category text not null check (char_length(facility_category) <= 30),
  facility_type text check (facility_type is null or char_length(facility_type) <= 40),
  prefecture text check (prefecture is null or char_length(prefecture) <= 10),
  city text check (city is null or char_length(city) <= 50),
  website text check (website is null or (char_length(website) <= 300 and website ~* '^https?://')),
  description text check (description is null or char_length(description) <= 2000),
  logo_url text check (logo_url is null or (char_length(logo_url) <= 500 and logo_url ~* '^https://')),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected', 'suspended')),
  review_note text check (review_note is null or char_length(review_note) <= 500),
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.organizations enable row level security;

drop policy if exists organizations_public_read on public.organizations;
create policy organizations_public_read on public.organizations for select to anon, authenticated using (status = 'approved');
drop policy if exists organizations_owner_read on public.organizations;
create policy organizations_owner_read on public.organizations for select to authenticated using (owner_id = (select auth.uid()));
drop policy if exists organizations_owner_insert on public.organizations;
create policy organizations_owner_insert on public.organizations for insert to authenticated with check (owner_id = (select auth.uid()));
drop policy if exists organizations_owner_update on public.organizations;
create policy organizations_owner_update on public.organizations for update to authenticated using (owner_id = (select auth.uid())) with check (owner_id = (select auth.uid()));

-- owner_id と review_note は、一覧・詳細で読めない（本人は my_organization() で読む）。status・承認日時は、本人も直接は書けない
grant select (id, name, facility_category, facility_type, prefecture, city, website, description, logo_url, status, created_at, updated_at) on public.organizations to anon, authenticated;
grant insert (owner_id, name, facility_category, facility_type, prefecture, city, website, description, logo_url) on public.organizations to authenticated;
grant update (name, facility_category, facility_type, prefecture, city, website, description, logo_url) on public.organizations to authenticated;

create or replace function public.organizations_guard() returns trigger
language plpgsql set search_path = '' as $f$
begin
  new.updated_at := now();
  -- 承認後に、名前・サイトを書き換えたら、もう一度、確認に戻す（なりすまし対策）
  if tg_op = 'UPDATE' and old.status = 'approved' and new.status = old.status
     and (new.name is distinct from old.name or new.website is distinct from old.website) then
    new.status := 'pending';
    new.reviewed_at := null;
  end if;
  return new;
end $f$;
drop trigger if exists organizations_guard on public.organizations;
create trigger organizations_guard before update on public.organizations for each row execute function public.organizations_guard();

-- ============ ② 求人 ============
create table if not exists public.job_postings (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  title text not null check (char_length(btrim(title)) between 1 and 100),
  employment_type text check (employment_type is null or employment_type in ('常勤', '非常勤', 'パート', '業務委託', 'その他')),
  prefecture text check (prefecture is null or char_length(prefecture) <= 10),
  city text check (city is null or char_length(city) <= 50),
  salary_text text check (salary_text is null or char_length(salary_text) <= 200),
  work_hours text check (work_hours is null or char_length(work_hours) <= 300),
  holidays text check (holidays is null or char_length(holidays) <= 300),
  description text check (description is null or char_length(description) <= 4000),
  requirements text check (requirements is null or char_length(requirements) <= 2000),
  benefits text check (benefits is null or char_length(benefits) <= 2000),
  status text not null default 'draft' check (status in ('draft', 'open', 'closed')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists job_postings_open_idx on public.job_postings (status, published_at desc);
create index if not exists job_postings_org_idx on public.job_postings (organization_id);
create index if not exists job_postings_pref_idx on public.job_postings (prefecture) where status = 'open';
alter table public.job_postings enable row level security;

drop policy if exists job_postings_public_read on public.job_postings;
create policy job_postings_public_read on public.job_postings for select to anon, authenticated
  using (status = 'open' and exists (select 1 from public.organizations o where o.id = organization_id and o.status = 'approved'));
drop policy if exists job_postings_owner_all on public.job_postings;
create policy job_postings_owner_all on public.job_postings for all to authenticated
  using (exists (select 1 from public.organizations o where o.id = organization_id and o.owner_id = (select auth.uid())))
  with check (
    exists (select 1 from public.organizations o where o.id = organization_id and o.owner_id = (select auth.uid()))
    and (status <> 'open' or exists (select 1 from public.organizations o where o.id = organization_id and o.status = 'approved'))
  );

grant select on public.job_postings to anon, authenticated;
grant insert (organization_id, title, employment_type, prefecture, city, salary_text, work_hours, holidays, description, requirements, benefits, status) on public.job_postings to authenticated;
grant update (title, employment_type, prefecture, city, salary_text, work_hours, holidays, description, requirements, benefits, status) on public.job_postings to authenticated;
grant delete on public.job_postings to authenticated;

create or replace function public.job_postings_guard() returns trigger
language plpgsql set search_path = '' as $f$
begin
  new.updated_at := now();
  if new.status = 'open' and (tg_op = 'INSERT' or old.status is distinct from 'open') then new.published_at := now(); end if;
  if tg_op = 'INSERT' and (select count(*) from public.job_postings where organization_id = new.organization_id) >= 50 then
    raise exception 'too many postings';
  end if;
  return new;
end $f$;
drop trigger if exists job_postings_guard on public.job_postings;
create trigger job_postings_guard before insert or update on public.job_postings for each row execute function public.job_postings_guard();

-- ============ ③ PTのスカウト受付設定 ============
alter table public.pt_profiles add column if not exists accept_scouts boolean not null default false;
grant select (accept_scouts) on public.pt_profiles to anon, authenticated;
grant insert (accept_scouts), update (accept_scouts) on public.pt_profiles to authenticated;

-- ============ ④ スカウト ============
create table if not exists public.scouts (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  job_id uuid references public.job_postings(id) on delete set null,
  pt_user_id uuid not null references auth.users(id) on delete cascade,
  sender_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'open' check (status in ('open', 'declined')),
  pt_replied boolean not null default false,
  created_at timestamptz not null default now(),
  last_message_at timestamptz not null default now(),
  pt_read_at timestamptz,
  org_read_at timestamptz,
  unique (organization_id, pt_user_id)
);
create index if not exists scouts_pt_idx on public.scouts (pt_user_id, last_message_at desc);
create index if not exists scouts_org_idx on public.scouts (organization_id, last_message_at desc);
create index if not exists scouts_sender_idx on public.scouts (sender_id);
create index if not exists scouts_job_idx on public.scouts (job_id);
create table if not exists public.scout_messages (
  id uuid primary key default gen_random_uuid(),
  scout_id uuid not null references public.scouts(id) on delete cascade,
  sender_id uuid not null references auth.users(id) on delete cascade,
  body text not null check (char_length(btrim(body)) between 1 and 2000),
  created_at timestamptz not null default now()
);
create index if not exists scout_messages_scout_idx on public.scout_messages (scout_id, created_at);
create index if not exists scout_messages_sender_idx on public.scout_messages (sender_id);
alter table public.scouts enable row level security;
alter table public.scout_messages enable row level security;

drop policy if exists scouts_participants_read on public.scouts;
create policy scouts_participants_read on public.scouts for select to authenticated
  using (pt_user_id = (select auth.uid()) or exists (select 1 from public.organizations o where o.id = organization_id and o.owner_id = (select auth.uid())));
drop policy if exists scout_messages_participants_read on public.scout_messages;
create policy scout_messages_participants_read on public.scout_messages for select to authenticated
  using (exists (select 1 from public.scouts s where s.id = scout_id));
-- 書き込みの権限は、付けない（すべて、下の関数だけ）
grant select on public.scouts, public.scout_messages to authenticated;

-- ============ ⑤ プロフィールへのいいね・応援コメント ============
create table if not exists public.profile_likes (
  pt_user_id uuid not null references auth.users(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (pt_user_id, user_id),
  check (pt_user_id <> user_id)
);
create index if not exists profile_likes_user_idx on public.profile_likes (user_id);
create table if not exists public.profile_comments (
  id uuid primary key default gen_random_uuid(),
  pt_user_id uuid not null references auth.users(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  body text not null check (char_length(btrim(body)) between 1 and 300),
  anonymous boolean not null default true,
  hidden boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists profile_comments_pt_idx on public.profile_comments (pt_user_id, created_at desc);
create index if not exists profile_comments_user_idx on public.profile_comments (user_id);
alter table public.profile_likes enable row level security;
alter table public.profile_comments enable row level security;
-- どちらも、直接は読み書きできない（関数だけ）

-- 通報の対象に追加
alter table public.reports drop constraint if exists reports_target_type_check;
alter table public.reports add constraint reports_target_type_check check (target_type = any (array['post','comment','message','group_message','hospital_review','internship_review','student_question','student_answer','exam_note','quiz_question','clinical_idea','training_method','profile_comment','job_posting','scout']::text[]));

-- ============ 関数 ============
create or replace function public.my_organization() returns jsonb
language sql stable security definer set search_path = '' as $f$
  select to_jsonb(o) - 'owner_id' from public.organizations o where o.owner_id = (select auth.uid());
$f$;

create or replace function public.admin_list_organizations() returns jsonb
language plpgsql stable security definer set search_path = '' as $f$
begin
  if not exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())) then raise exception 'not allowed'; end if;
  return coalesce((select jsonb_agg(x order by (x->>'status') = 'pending' desc, x->>'created_at' desc) from (
    select jsonb_build_object('id', o.id, 'name', o.name, 'facility_category', o.facility_category, 'facility_type', o.facility_type, 'prefecture', o.prefecture, 'website', o.website, 'description', o.description, 'status', o.status, 'review_note', o.review_note, 'created_at', o.created_at, 'owner_name', u.full_name) x
    from public.organizations o left join public.users u on u.id = o.owner_id limit 200) t), '[]'::jsonb);
end $f$;

create or replace function public.admin_review_organization(p_id uuid, p_status text, p_note text default null) returns boolean
language plpgsql security definer set search_path = '' as $f$
begin
  if not exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())) then raise exception 'not allowed'; end if;
  if p_status not in ('approved', 'rejected', 'suspended', 'pending') then raise exception 'bad status'; end if;
  update public.organizations set status = p_status, review_note = left(nullif(btrim(coalesce(p_note, '')), ''), 500), reviewed_at = now() where id = p_id;
  return found;
end $f$;

create or replace function public.send_scout(p_pt uuid, p_job uuid, p_body text) returns jsonb
language plpgsql security definer set search_path = '' as $f$
declare
  me uuid := (select auth.uid());
  org public.organizations%rowtype;
  s public.scouts%rowtype;
  b text := btrim(coalesce(p_body, ''));
  v_job uuid := p_job;
begin
  if me is null then raise exception 'not allowed'; end if;
  select * into org from public.organizations where owner_id = me;
  if not found or org.status <> 'approved' then return jsonb_build_object('error', 'org_not_approved'); end if;
  if char_length(b) < 10 or char_length(b) > 2000 then return jsonb_build_object('error', 'bad_body'); end if;
  if p_pt = me or not exists (select 1 from public.users u join public.pt_profiles p on p.user_id = u.id where u.id = p_pt and u.account_type = 'pt' and p.accept_scouts)
     or exists (select 1 from public.user_blocks k where k.blocker_id = p_pt and k.blocked_id = me) then
    return jsonb_build_object('error', 'not_accepting');
  end if;
  if v_job is not null and not exists (select 1 from public.job_postings j where j.id = v_job and j.organization_id = org.id) then v_job := null; end if;

  select * into s from public.scouts where organization_id = org.id and pt_user_id = p_pt;
  if found then
    if s.status = 'declined' then return jsonb_build_object('error', 'declined'); end if;
    if not s.pt_replied then return jsonb_build_object('error', 'already_sent'); end if;
    insert into public.scout_messages (scout_id, sender_id, body) values (s.id, me, b);
    update public.scouts set last_message_at = now(), org_read_at = now() where id = s.id;
  else
    if (select count(*) from public.scouts x where x.organization_id = org.id and x.created_at > now() - interval '1 day') >= 20 then
      return jsonb_build_object('error', 'too_many');
    end if;
    insert into public.scouts (organization_id, job_id, pt_user_id, sender_id, org_read_at) values (org.id, v_job, p_pt, me, now()) returning * into s;
    insert into public.scout_messages (scout_id, sender_id, body) values (s.id, me, b);
  end if;
  insert into public.notifications (user_id, actor_id, type, is_read) values (p_pt, me, 'scout', false);
  return jsonb_build_object('id', s.id);
end $f$;

create or replace function public.scout_reply(p_scout uuid, p_body text) returns jsonb
language plpgsql security definer set search_path = '' as $f$
declare
  me uuid := (select auth.uid());
  s public.scouts%rowtype;
  o public.organizations%rowtype;
  b text := btrim(coalesce(p_body, ''));
  is_pt boolean;
begin
  if me is null then raise exception 'not allowed'; end if;
  select * into s from public.scouts where id = p_scout;
  if not found then return jsonb_build_object('error', 'not_found'); end if;
  select * into o from public.organizations where id = s.organization_id;
  is_pt := s.pt_user_id = me;
  if not is_pt and o.owner_id <> me then return jsonb_build_object('error', 'not_found'); end if;
  if char_length(b) < 1 or char_length(b) > 2000 then return jsonb_build_object('error', 'bad_body'); end if;
  if s.status = 'declined' then return jsonb_build_object('error', 'declined'); end if;
  if not is_pt and (not s.pt_replied or o.status <> 'approved') then return jsonb_build_object('error', 'already_sent'); end if;
  if (select count(*) from public.scout_messages m where m.sender_id = me and m.created_at > now() - interval '1 hour') >= 30 then return jsonb_build_object('error', 'too_many'); end if;
  insert into public.scout_messages (scout_id, sender_id, body) values (s.id, me, b);
  if is_pt then
    update public.scouts set pt_replied = true, last_message_at = now(), pt_read_at = now() where id = s.id;
    insert into public.notifications (user_id, actor_id, type, is_read) values (o.owner_id, me, 'scout_reply', false);
  else
    update public.scouts set last_message_at = now(), org_read_at = now() where id = s.id;
    insert into public.notifications (user_id, actor_id, type, is_read) values (s.pt_user_id, me, 'scout', false);
  end if;
  return jsonb_build_object('ok', true);
end $f$;

create or replace function public.scout_decline(p_scout uuid) returns boolean
language plpgsql security definer set search_path = '' as $f$
begin
  update public.scouts set status = 'declined', pt_read_at = now() where id = p_scout and pt_user_id = (select auth.uid());
  return found;
end $f$;

create or replace function public.scout_mark_read(p_scout uuid) returns void
language sql security definer set search_path = '' as $f$
  update public.scouts s set
    pt_read_at = case when s.pt_user_id = (select auth.uid()) then now() else s.pt_read_at end,
    org_read_at = case when exists (select 1 from public.organizations o where o.id = s.organization_id and o.owner_id = (select auth.uid())) then now() else s.org_read_at end
  where s.id = p_scout and (s.pt_user_id = (select auth.uid()) or exists (select 1 from public.organizations o where o.id = s.organization_id and o.owner_id = (select auth.uid())));
$f$;

create or replace function public.list_my_scouts() returns jsonb
language sql stable security definer set search_path = '' as $f$
  select coalesce(jsonb_agg(r order by (r->>'last_message_at') desc), '[]'::jsonb) from (
    select jsonb_build_object(
      'id', s.id,
      'role', case when s.pt_user_id = (select auth.uid()) then 'pt' else 'org' end,
      'org_name', o.name,
      'pt_user_id', s.pt_user_id,
      'pt_name', coalesce(nullif(btrim(p.full_name), ''), '理学療法士'),
      'job_title', j.title,
      'status', s.status,
      'last_message_at', s.last_message_at,
      'unread', case when s.pt_user_id = (select auth.uid()) then (s.pt_read_at is null or s.pt_read_at < s.last_message_at) else (s.org_read_at is null or s.org_read_at < s.last_message_at) end,
      'last_body', left((select m.body from public.scout_messages m where m.scout_id = s.id order by m.created_at desc limit 1), 80)
    ) r
    from public.scouts s
    join public.organizations o on o.id = s.organization_id
    left join public.pt_profiles p on p.user_id = s.pt_user_id
    left join public.job_postings j on j.id = s.job_id
    where s.pt_user_id = (select auth.uid()) or o.owner_id = (select auth.uid())
    order by s.last_message_at desc limit 100
  ) t;
$f$;

create or replace function public.profile_social(p_pt uuid) returns jsonb
language sql stable security definer set search_path = '' as $f$
  select jsonb_build_object(
    'likes', (select count(*) from public.profile_likes l where l.pt_user_id = p_pt),
    'liked', exists (select 1 from public.profile_likes l where l.pt_user_id = p_pt and l.user_id = (select auth.uid())),
    'org_can_scout', exists (select 1 from public.organizations o where o.owner_id = (select auth.uid()) and o.status = 'approved')
                     and exists (select 1 from public.pt_profiles p where p.user_id = p_pt and p.accept_scouts)
  );
$f$;

create or replace function public.toggle_profile_like(p_pt uuid) returns jsonb
language plpgsql security definer set search_path = '' as $f$
declare me uuid := (select auth.uid()); did boolean;
begin
  if me is null or me = p_pt or not exists (select 1 from public.users u where u.id = p_pt and u.account_type = 'pt') then raise exception 'not allowed'; end if;
  if exists (select 1 from public.user_blocks k where k.blocker_id = p_pt and k.blocked_id = me) then raise exception 'not allowed'; end if;
  delete from public.profile_likes where pt_user_id = p_pt and user_id = me;
  did := not found;
  if did then
    insert into public.profile_likes (pt_user_id, user_id) values (p_pt, me);
    if not exists (select 1 from public.notifications n where n.user_id = p_pt and n.actor_id = me and n.type = 'profile_like' and n.created_at > now() - interval '1 day') then
      insert into public.notifications (user_id, actor_id, type, is_read) values (p_pt, me, 'profile_like', false);
    end if;
  end if;
  return jsonb_build_object('liked', did, 'likes', (select count(*) from public.profile_likes where pt_user_id = p_pt));
end $f$;

create or replace function public.list_profile_comments(p_pt uuid) returns jsonb
language sql stable security definer set search_path = '' as $f$
  select coalesce(jsonb_agg(r order by (r->>'created_at') desc), '[]'::jsonb) from (
    select jsonb_build_object(
      'id', c.id, 'body', c.body, 'created_at', c.created_at,
      'author', case when c.anonymous then '匿名の方' else coalesce(nullif(btrim(u.full_name), ''), '匿名の方') end,
      'author_type', case u.account_type when 'pt' then '理学療法士' when 'student' then '学生' when 'general' then 'ご利用者・一般の方' else '' end,
      'mine', c.user_id = (select auth.uid()),
      'can_delete', c.user_id = (select auth.uid()) or c.pt_user_id = (select auth.uid())
    ) r
    from public.profile_comments c join public.users u on u.id = c.user_id
    where c.pt_user_id = p_pt and not c.hidden
      and not exists (select 1 from public.user_blocks k where k.blocker_id = (select auth.uid()) and k.blocked_id = c.user_id)
    order by c.created_at desc limit 100
  ) t;
$f$;

create or replace function public.add_profile_comment(p_pt uuid, p_body text, p_anonymous boolean default true) returns jsonb
language plpgsql security definer set search_path = '' as $f$
declare me uuid := (select auth.uid()); b text := btrim(coalesce(p_body, ''));
begin
  if me is null or me = p_pt or not exists (select 1 from public.users u where u.id = p_pt and u.account_type = 'pt') then raise exception 'not allowed'; end if;
  if char_length(b) < 1 or char_length(b) > 300 then return jsonb_build_object('error', 'bad_body'); end if;
  if exists (select 1 from public.user_blocks k where k.blocker_id = p_pt and k.blocked_id = me) then raise exception 'not allowed'; end if;
  if (select count(*) from public.profile_comments c where c.user_id = me and c.created_at > now() - interval '1 day') >= 10 then return jsonb_build_object('error', 'too_many'); end if;
  insert into public.profile_comments (pt_user_id, user_id, body, anonymous) values (p_pt, me, b, coalesce(p_anonymous, true));
  insert into public.notifications (user_id, actor_id, type, is_read) values (p_pt, me, 'profile_comment', false);
  return jsonb_build_object('ok', true);
end $f$;

create or replace function public.delete_profile_comment(p_id uuid) returns boolean
language plpgsql security definer set search_path = '' as $f$
begin
  delete from public.profile_comments c where c.id = p_id and (c.user_id = (select auth.uid()) or c.pt_user_id = (select auth.uid())
    or exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())));
  return found;
end $f$;

-- 実行権限: 関数は、ログイン中の人だけ（プロフィールの数・コメントの閲覧は、ログインなしでも可）
do $$
declare f text;
begin
  foreach f in array array[
    'my_organization()', 'admin_list_organizations()', 'admin_review_organization(uuid,text,text)', 'send_scout(uuid,uuid,text)',
    'scout_reply(uuid,text)', 'scout_decline(uuid)', 'scout_mark_read(uuid)', 'list_my_scouts()', 'toggle_profile_like(uuid)',
    'add_profile_comment(uuid,text,boolean)', 'delete_profile_comment(uuid)', 'profile_social(uuid)', 'list_profile_comments(uuid)',
    'organizations_guard()', 'job_postings_guard()'
  ] loop
    execute format('revoke all on function public.%s from public, anon', f);
  end loop;
  foreach f in array array[
    'my_organization()', 'admin_list_organizations()', 'admin_review_organization(uuid,text,text)', 'send_scout(uuid,uuid,text)',
    'scout_reply(uuid,text)', 'scout_decline(uuid)', 'scout_mark_read(uuid)', 'list_my_scouts()', 'toggle_profile_like(uuid)',
    'add_profile_comment(uuid,text,boolean)', 'delete_profile_comment(uuid)', 'profile_social(uuid)', 'list_profile_comments(uuid)'
  ] loop
    execute format('grant execute on function public.%s to authenticated', f);
  end loop;
end $$;
grant execute on function public.profile_social(uuid), public.list_profile_comments(uuid) to anon;

-- 標準で付く権限が、列の限定を上書きしないように、いったん外してから、必要な分だけ付け直す（本番の検査で、owner_id が読めたため）
revoke select on public.organizations from anon, authenticated;
grant select (id, name, facility_category, facility_type, prefecture, city, website, description, logo_url, status, created_at, updated_at) on public.organizations to anon, authenticated;
revoke all on public.scouts, public.scout_messages from anon;
revoke all on public.profile_likes, public.profile_comments from anon, authenticated;
revoke references, trigger, truncate on public.organizations, public.job_postings, public.scouts, public.scout_messages, public.profile_likes, public.profile_comments from anon, authenticated;
