-- 一問一答の、学校単位の利用制限（学校コード）
--  - 契約した学校ごとに、専用の学校コードを発行する。先生・学生が、そのコードを入れると、その学校の所属になる
--  - 利用の制限は、運営の設定（app_settings: quiz_requires_school）で、オン・オフできる。**既定はオフ**（いまの利用者の使い方は、変わらない）。オンにすると、学校に所属していない人は、一問一答が使えなくなる（運営は、常に使える）
--  - 契約の期間（valid_from / valid_until）・停止（status）・人数の上限（seat_limit）で、学校ごとの利用権限を管理する
--  - 先生の機能（クラス・テスト・結果）は、これまでどおり「自分のクラスだけ」。学校コードを知っていても、他校のデータは見えない
--  - 既存の表 `schools`（試験情報・ランキング用の、学生が選ぶ学校名）とは、別のもの

-- ---------------------------------------------------------
-- 設定
-- ---------------------------------------------------------
create table if not exists public.app_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);
alter table public.app_settings enable row level security;
revoke all on table public.app_settings from anon, authenticated;
insert into public.app_settings (key, value) values ('quiz_requires_school', 'false'::jsonb) on conflict (key) do nothing;

-- ---------------------------------------------------------
-- 契約校・所属・コードの入力の記録
-- ---------------------------------------------------------
create table if not exists public.licensed_schools (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 100),
  code text not null unique,
  status text not null default 'active' check (status in ('active', 'suspended')),
  valid_from date,
  valid_until date,
  seat_limit integer check (seat_limit is null or seat_limit > 0),
  plan text not null default 'standard' check (char_length(plan) <= 40),
  note text check (note is null or char_length(note) <= 500),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.licensed_schools enable row level security;
revoke all on table public.licensed_schools from anon, authenticated;

create table if not exists public.school_members (
  user_id uuid primary key references auth.users (id) on delete cascade,
  school_id uuid not null references public.licensed_schools (id) on delete cascade,
  role text not null check (role in ('student', 'teacher')),
  joined_at timestamptz not null default now()
);
create index if not exists school_members_school_idx on public.school_members (school_id);
alter table public.school_members enable row level security;
revoke all on table public.school_members from anon, authenticated;

create table if not exists public.school_code_attempts (
  user_id uuid not null references auth.users (id) on delete cascade,
  at timestamptz not null default now()
);
create index if not exists school_code_attempts_user_idx on public.school_code_attempts (user_id, at desc);
alter table public.school_code_attempts enable row level security;
revoke all on table public.school_code_attempts from anon, authenticated;

alter table public.quiz_classes add column if not exists school_id uuid references public.licensed_schools (id) on delete set null;

-- ---------------------------------------------------------
-- 内部の関数（クライアントからは呼べない）
-- ---------------------------------------------------------
create or replace function public.school_is_active(p_school uuid)
returns boolean
language sql stable security definer set search_path = ''
as $f$
  select exists (
    select 1 from public.licensed_schools l
    where l.id = p_school and l.status = 'active'
      and (l.valid_from is null or l.valid_from <= (now() at time zone 'Asia/Tokyo')::date)
      and (l.valid_until is null or l.valid_until >= (now() at time zone 'Asia/Tokyo')::date)
  );
$f$;
revoke execute on function public.school_is_active(uuid) from public, anon, authenticated;

create or replace function public.quiz_requires_school()
returns boolean
language sql stable security definer set search_path = ''
as $f$
  select coalesce((select s.value = 'true'::jsonb from public.app_settings s where s.key = 'quiz_requires_school'), false);
$f$;
revoke execute on function public.quiz_requires_school() from public, anon, authenticated;

-- 制限がオフなら、だれでも通る。オンなら、契約中の学校に所属している人（と運営）だけ
create or replace function public.quiz_school_gate_ok(p_uid uuid)
returns boolean
language sql stable security definer set search_path = ''
as $f$
  select not public.quiz_requires_school()
      or exists (select 1 from public.admin_users a where a.user_id = p_uid)
      or exists (select 1 from public.school_members m where m.user_id = p_uid and public.school_is_active(m.school_id));
$f$;
revoke execute on function public.quiz_school_gate_ok(uuid) from public, anon, authenticated;

create or replace function public.school_new_code()
returns text
language plpgsql volatile security definer set search_path = ''
as $f$
declare
  v_alphabet constant text := 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  v_code text;
  i integer;
begin
  loop
    v_code := '';
    for i in 1..8 loop
      v_code := v_code || substr(v_alphabet, 1 + floor(random() * length(v_alphabet))::integer, 1);
    end loop;
    exit when not exists (select 1 from public.licensed_schools l where l.code = v_code);
  end loop;
  return v_code;
end
$f$;
revoke execute on function public.school_new_code() from public, anon, authenticated;

-- 一問一答を使える人（制限がオンのときは、学校の所属も必要）。制限がオフのときは、これまでと同じ
create or replace function public.quiz_can_use()
returns boolean
language sql stable security definer set search_path = ''
as $f$
  select exists (
    select 1 from public.users u
    where u.id = (select auth.uid()) and u.account_type in ('student', 'pt', 'teacher')
  ) and public.quiz_school_gate_ok((select auth.uid()));
$f$;

-- 先生の機能（承認済み・停止されていない・制限がオンのときは学校の所属あり）
create or replace function public.quiz_is_teacher()
returns boolean
language sql stable security definer set search_path = ''
as $f$
  select exists (select 1 from public.quiz_teachers t where t.user_id = (select auth.uid()) and not t.suspended)
     and public.quiz_school_gate_ok((select auth.uid()));
$f$;

-- ---------------------------------------------------------
-- 利用者向け
-- ---------------------------------------------------------
-- 自分の、一問一答の利用の状態
create or replace function public.quiz_access_state()
returns jsonb
language plpgsql stable security definer set search_path = ''
as $f$
declare
  v_uid uuid := (select auth.uid());
  m public.school_members%rowtype;
  l public.licensed_schools%rowtype;
  v_req boolean := public.quiz_requires_school();
  v_school jsonb := null;
begin
  if v_uid is null then
    return jsonb_build_object('required', v_req, 'has_access', not v_req, 'school', null);
  end if;
  select * into m from public.school_members where user_id = v_uid;
  if found then
    select * into l from public.licensed_schools where id = m.school_id;
    v_school := jsonb_build_object('id', l.id, 'name', l.name, 'role', m.role, 'active', public.school_is_active(l.id), 'valid_until', l.valid_until);
  end if;
  return jsonb_build_object('required', v_req, 'has_access', public.quiz_school_gate_ok(v_uid), 'school', v_school);
end
$f$;
revoke execute on function public.quiz_access_state() from public, anon;
grant execute on function public.quiz_access_state() to authenticated;

-- 学校コードを入れて、所属する。間違いは、1時間に10回まで
create or replace function public.school_join(p_code text)
returns jsonb
language plpgsql security definer set search_path = ''
as $f$
declare
  v_uid uuid := (select auth.uid());
  v_type text;
  v_role text;
  l public.licensed_schools%rowtype;
  cur public.school_members%rowtype;
begin
  select account_type into v_type from public.users where id = v_uid;
  if v_uid is null or v_type is null or v_type not in ('student', 'pt', 'teacher') then
    raise exception 'not allowed';
  end if;
  delete from public.school_code_attempts where user_id = v_uid and at < now() - interval '1 day';
  if (select count(*) from public.school_code_attempts where user_id = v_uid and at > now() - interval '1 hour') >= 10 then
    raise exception 'too many attempts';
  end if;

  select * into l from public.licensed_schools where code = upper(btrim(coalesce(p_code, '')));
  if not found then
    insert into public.school_code_attempts (user_id) values (v_uid);
    return jsonb_build_object('error', 'not_found');
  end if;
  if not public.school_is_active(l.id) then
    return jsonb_build_object('error', 'inactive');
  end if;

  select * into cur from public.school_members where user_id = v_uid;
  if found then
    if cur.school_id = l.id then
      return jsonb_build_object('id', l.id, 'name', l.name, 'role', cur.role);
    end if;
    return jsonb_build_object('error', 'already_member');
  end if;

  if l.seat_limit is not null and (select count(*) from public.school_members m where m.school_id = l.id) >= l.seat_limit then
    return jsonb_build_object('error', 'full');
  end if;

  -- 先生の機能が承認されている人、または、先生のアカウントは、先生。それ以外は、学生
  v_role := case when v_type = 'teacher' or exists (select 1 from public.quiz_teachers t where t.user_id = v_uid) then 'teacher' else 'student' end;
  insert into public.school_members (user_id, school_id, role) values (v_uid, l.id, v_role);
  return jsonb_build_object('id', l.id, 'name', l.name, 'role', v_role);
end
$f$;
revoke execute on function public.school_join(text) from public, anon;
grant execute on function public.school_join(text) to authenticated;

create or replace function public.school_leave()
returns void
language sql security definer set search_path = ''
as $f$
  delete from public.school_members where user_id = (select auth.uid());
$f$;
revoke execute on function public.school_leave() from public, anon;
grant execute on function public.school_leave() to authenticated;

-- クラスを作るとき、先生の学校を、クラスに付ける。参加は、同じ学校の人だけ
create or replace function public.quiz_create_class(p_name text)
returns jsonb
language plpgsql security definer set search_path = ''
as $f$
declare
  v_uid uuid := (select auth.uid());
  v_alphabet constant text := 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  v_code text;
  v_id uuid;
  v_school uuid;
  i integer;
  tries integer := 0;
begin
  if not public.quiz_is_teacher() then
    raise exception 'teacher only';
  end if;
  if btrim(coalesce(p_name, '')) = '' then
    raise exception 'name required';
  end if;
  select school_id into v_school from public.school_members where user_id = v_uid;

  loop
    v_code := '';
    for i in 1..6 loop
      v_code := v_code || substr(v_alphabet, 1 + floor(random() * length(v_alphabet))::integer, 1);
    end loop;
    begin
      insert into public.quiz_classes (teacher_id, name, join_code, school_id)
      values (v_uid, left(btrim(p_name), 60), v_code, v_school)
      returning id into v_id;
      exit;
    exception when unique_violation then
      tries := tries + 1;
      if tries > 10 then raise; end if;
    end;
  end loop;

  return jsonb_build_object('id', v_id, 'join_code', v_code);
end
$f$;

create or replace function public.quiz_join_class(p_code text)
returns jsonb
language plpgsql security definer set search_path = ''
as $f$
declare
  v_uid uuid := (select auth.uid());
  c public.quiz_classes%rowtype;
  v_my_school uuid;
begin
  if v_uid is null or not public.quiz_can_use() then
    raise exception 'not allowed';
  end if;
  delete from public.quiz_join_attempts where user_id = v_uid and at < now() - interval '1 day';
  if (select count(*) from public.quiz_join_attempts where user_id = v_uid and at > now() - interval '1 hour') >= 10 then
    raise exception 'too many attempts';
  end if;
  select * into c from public.quiz_classes
  where join_code = upper(btrim(coalesce(p_code, ''))) and not archived;
  if not found then
    insert into public.quiz_join_attempts (user_id) values (v_uid);
    return jsonb_build_object('error', 'not_found');
  end if;
  if c.teacher_id = v_uid then
    raise exception 'own class';
  end if;
  -- 学校のクラスには、同じ学校の人だけ（学校が付いていないクラスは、これまでどおり）
  if c.school_id is not null then
    select school_id into v_my_school from public.school_members where user_id = v_uid;
    if v_my_school is distinct from c.school_id then
      return jsonb_build_object('error', 'other_school');
    end if;
  end if;
  insert into public.quiz_class_members (class_id, user_id) values (c.id, v_uid) on conflict do nothing;
  return jsonb_build_object('id', c.id, 'name', c.name);
end
$f$;

-- ---------------------------------------------------------
-- 運営向け
-- ---------------------------------------------------------
create or replace function public.admin_quiz_settings()
returns jsonb
language plpgsql stable security definer set search_path = ''
as $f$
begin
  if not exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())) then
    raise exception 'forbidden';
  end if;
  return jsonb_build_object('requires_school', public.quiz_requires_school());
end
$f$;
revoke execute on function public.admin_quiz_settings() from public, anon;
grant execute on function public.admin_quiz_settings() to authenticated;

create or replace function public.admin_set_quiz_requires_school(p_on boolean)
returns void
language plpgsql security definer set search_path = ''
as $f$
begin
  if not exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())) then
    raise exception 'forbidden';
  end if;
  insert into public.app_settings (key, value, updated_at) values ('quiz_requires_school', to_jsonb(coalesce(p_on, false)), now())
  on conflict (key) do update set value = excluded.value, updated_at = now();
  insert into public.quiz_audit_log (user_id, action, target_type) values ((select auth.uid()), case when p_on then 'setting_school_required_on' else 'setting_school_required_off' end, 'setting');
end
$f$;
revoke execute on function public.admin_set_quiz_requires_school(boolean) from public, anon;
grant execute on function public.admin_set_quiz_requires_school(boolean) to authenticated;

create or replace function public.admin_list_schools()
returns table (
  id uuid, name text, code text, status text, active boolean, valid_from date, valid_until date,
  seat_limit integer, plan text, note text, teacher_count integer, student_count integer, created_at timestamptz
)
language sql stable security definer set search_path = ''
as $f$
  select l.id, l.name, l.code, l.status, public.school_is_active(l.id), l.valid_from, l.valid_until, l.seat_limit, l.plan, l.note,
         (select count(*)::integer from public.school_members m where m.school_id = l.id and m.role = 'teacher'),
         (select count(*)::integer from public.school_members m where m.school_id = l.id and m.role = 'student'),
         l.created_at
  from public.licensed_schools l
  where exists (select 1 from public.admin_users a where a.user_id = (select auth.uid()))
  order by l.created_at desc;
$f$;
revoke execute on function public.admin_list_schools() from public, anon;
grant execute on function public.admin_list_schools() to authenticated;

create or replace function public.admin_save_school(
  p_id uuid, p_name text, p_valid_from date, p_valid_until date, p_seat_limit integer, p_plan text, p_note text
)
returns uuid
language plpgsql security definer set search_path = ''
as $f$
declare
  v_id uuid;
begin
  if not exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())) then
    raise exception 'forbidden';
  end if;
  if btrim(coalesce(p_name, '')) = '' then raise exception 'name required'; end if;
  if p_valid_from is not null and p_valid_until is not null and p_valid_until < p_valid_from then raise exception 'bad period'; end if;
  if p_id is null then
    insert into public.licensed_schools (name, code, valid_from, valid_until, seat_limit, plan, note)
    values (left(btrim(p_name), 100), public.school_new_code(), p_valid_from, p_valid_until, p_seat_limit, coalesce(nullif(btrim(p_plan), ''), 'standard'), nullif(btrim(coalesce(p_note, '')), ''))
    returning id into v_id;
  else
    update public.licensed_schools
       set name = left(btrim(p_name), 100), valid_from = p_valid_from, valid_until = p_valid_until, seat_limit = p_seat_limit,
           plan = coalesce(nullif(btrim(p_plan), ''), 'standard'), note = nullif(btrim(coalesce(p_note, '')), ''), updated_at = now()
     where id = p_id returning id into v_id;
    if v_id is null then raise exception 'not found'; end if;
  end if;
  return v_id;
end
$f$;
revoke execute on function public.admin_save_school(uuid, text, date, date, integer, text, text) from public, anon;
grant execute on function public.admin_save_school(uuid, text, date, date, integer, text, text) to authenticated;

create or replace function public.admin_rotate_school_code(p_id uuid)
returns text
language plpgsql security definer set search_path = ''
as $f$
declare
  v_code text := public.school_new_code();
begin
  if not exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())) then
    raise exception 'forbidden';
  end if;
  update public.licensed_schools set code = v_code, updated_at = now() where id = p_id;
  if not found then raise exception 'not found'; end if;
  insert into public.quiz_audit_log (user_id, action, target_type, target_id) values ((select auth.uid()), 'school_code_rotate', 'school', p_id);
  return v_code;
end
$f$;
revoke execute on function public.admin_rotate_school_code(uuid) from public, anon;
grant execute on function public.admin_rotate_school_code(uuid) to authenticated;

create or replace function public.admin_set_school_status(p_id uuid, p_status text)
returns void
language plpgsql security definer set search_path = ''
as $f$
begin
  if not exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())) then
    raise exception 'forbidden';
  end if;
  if p_status not in ('active', 'suspended') then raise exception 'bad status'; end if;
  update public.licensed_schools set status = p_status, updated_at = now() where id = p_id;
  if not found then raise exception 'not found'; end if;
  insert into public.quiz_audit_log (user_id, action, target_type, target_id) values ((select auth.uid()), 'school_' || p_status, 'school', p_id);
end
$f$;
revoke execute on function public.admin_set_school_status(uuid, text) from public, anon;
grant execute on function public.admin_set_school_status(uuid, text) to authenticated;

create or replace function public.admin_list_school_members(p_school uuid)
returns table (user_id uuid, name text, email text, role text, joined_at timestamptz)
language sql stable security definer set search_path = ''
as $f$
  select m.user_id,
         coalesce((select p.full_name from public.pt_profiles p where p.user_id = m.user_id limit 1), u.full_name),
         u.email, m.role, m.joined_at
  from public.school_members m
  left join public.users u on u.id = m.user_id
  where m.school_id = p_school and exists (select 1 from public.admin_users a where a.user_id = (select auth.uid()))
  order by m.role, m.joined_at;
$f$;
revoke execute on function public.admin_list_school_members(uuid) from public, anon;
grant execute on function public.admin_list_school_members(uuid) to authenticated;

create or replace function public.admin_remove_school_member(p_user uuid)
returns void
language plpgsql security definer set search_path = ''
as $f$
begin
  if not exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())) then
    raise exception 'forbidden';
  end if;
  delete from public.school_members where user_id = p_user;
end
$f$;
revoke execute on function public.admin_remove_school_member(uuid) from public, anon;
grant execute on function public.admin_remove_school_member(uuid) to authenticated;

-- 操作の記録: 所属・退出
create or replace function public.school_audit_trigger()
returns trigger
language plpgsql security definer set search_path = ''
as $f$
declare
  v_uid uuid := (select auth.uid());
begin
  if tg_op = 'INSERT' then
    insert into public.quiz_audit_log (user_id, action, target_type, target_id) values (v_uid, 'school_join', 'school', new.school_id);
  elsif tg_op = 'DELETE' and exists (select 1 from public.licensed_schools l where l.id = old.school_id) then
    insert into public.quiz_audit_log (user_id, action, target_type, target_id) values (v_uid, 'school_leave', 'school', old.school_id);
  end if;
  return null;
end
$f$;
revoke execute on function public.school_audit_trigger() from public, anon, authenticated;
drop trigger if exists school_audit_members on public.school_members;
create trigger school_audit_members after insert or delete on public.school_members for each row execute function public.school_audit_trigger();

-- 記録の一覧に、学校の名前を出す
create or replace function public.admin_list_quiz_audit(p_limit integer default 100)
returns table (id bigint, created_at timestamptz, actor_email text, actor_name text, action text, target_type text, target_label text)
language sql stable security definer set search_path = ''
as $f$
  select l.id, l.created_at, u.email,
         coalesce((select p.full_name from public.pt_profiles p where p.user_id = l.user_id limit 1), u.full_name),
         l.action, l.target_type,
         case l.target_type
           when 'class' then (select c.name from public.quiz_classes c where c.id = l.target_id)
           when 'assignment' then (select a.title from public.quiz_assignments a where a.id = l.target_id)
           when 'user' then (select coalesce(tu.full_name, tu.email) from public.users tu where tu.id = l.target_id)
           when 'school' then (select s.name from public.licensed_schools s where s.id = l.target_id)
         end
  from public.quiz_audit_log l
  left join public.users u on u.id = l.user_id
  where exists (select 1 from public.admin_users a where a.user_id = (select auth.uid()))
  order by l.created_at desc
  limit least(greatest(coalesce(p_limit, 100), 1), 500);
$f$;
