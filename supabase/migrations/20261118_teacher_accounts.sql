-- 先生のアカウント（account_type = 'teacher'）
--  - 大学・専門学校の先生が、PTのプロフィールなしで登録できる。登録と同時に、先生の申請（運営の承認待ち）が入る
--  - 承認されるまで、できることは変わらない（クラスを作れるのは、承認された先生だけ）
--  - 先生は、一問一答の問題一覧を読める（課題を作るために必要。quiz_can_use に含める）。ランキング・PTの機能・学生の機能は、使えない

alter table public.users drop constraint if exists users_account_type_check;
alter table public.users
  add constraint users_account_type_check
  check (account_type is null or account_type in ('pt', 'general', 'student', 'teacher'));

create or replace function public.quiz_can_use()
returns boolean
language sql stable security definer set search_path = ''
as $f$
  select exists (
    select 1 from public.users u
    where u.id = (select auth.uid()) and u.account_type in ('student', 'pt', 'teacher')
  );
$f$;

create or replace function public.quiz_request_teacher(p_school text, p_note text default null)
returns void
language plpgsql security definer set search_path = ''
as $f$
declare
  v_uid uuid := (select auth.uid());
begin
  if v_uid is null or not exists (select 1 from public.users u where u.id = v_uid and u.account_type in ('pt', 'teacher')) then
    raise exception 'pt or teacher only';
  end if;
  if exists (select 1 from public.quiz_teachers t where t.user_id = v_uid) then
    return;
  end if;
  insert into public.quiz_teacher_requests (user_id, school_name, note)
  values (v_uid, left(btrim(p_school), 100), nullif(left(btrim(coalesce(p_note, '')), 500), ''))
  on conflict (user_id) where status = 'open' do nothing;
end
$f$;

create or replace function public.admin_list_teacher_requests(p_status text default 'open')
returns table (
  id uuid, user_id uuid, email text, full_name text, school_name text, note text,
  status text, created_at timestamptz
)
language sql stable security definer set search_path = ''
as $f$
  select r.id, r.user_id, u.email,
         coalesce((select p.full_name from public.pt_profiles p where p.user_id = r.user_id limit 1), u.full_name),
         r.school_name, r.note, r.status, r.created_at
  from public.quiz_teacher_requests r
  left join public.users u on u.id = r.user_id
  where exists (select 1 from public.admin_users a where a.user_id = (select auth.uid()))
    and (p_status = 'all' or r.status = p_status)
  order by r.created_at desc;
$f$;

create or replace function public.quiz_my_classes()
returns table (id uuid, name text, teacher_name text, joined_at timestamptz)
language sql stable security definer set search_path = ''
as $f$
  select c.id, c.name,
         coalesce((select p.full_name from public.pt_profiles p where p.user_id = c.teacher_id limit 1),
                  (select u.full_name from public.users u where u.id = c.teacher_id)),
         m.joined_at
  from public.quiz_class_members m
  join public.quiz_classes c on c.id = m.class_id
  where m.user_id = (select auth.uid()) and not c.archived and public.quiz_can_use()
  order by m.joined_at desc;
$f$;

-- 登録時の処理。先生のときは、登録フォームの所属・補足から、先生の申請（承認待ち）も作る
create or replace function public.handle_new_user()
 returns trigger
 language plpgsql
 security definer
 set search_path to ''
as $function$
declare
  v_type text := new.raw_user_meta_data ->> 'account_type';
  v_ref_raw text := new.raw_user_meta_data ->> 'referred_by';
  v_name text := nullif(left(btrim(coalesce(new.raw_user_meta_data ->> 'full_name', '')), 50), '');
  v_ref uuid;
  v_year integer;
  v_now_jst timestamp := now() at time zone 'Asia/Tokyo';
  v_min_year integer;
begin
  begin
    v_ref := v_ref_raw::uuid;
  exception when others then
    v_ref := null;
  end;

  if v_ref is not null and v_ref = new.id then
    v_ref := null;
  end if;

  if v_ref is not null and not exists (select 1 from public.users where id = v_ref) then
    v_ref := null;
  end if;

  insert into public.users (id, email, account_type, referred_by, full_name)
  values (
    new.id,
    new.email,
    case when v_type in ('pt', 'general', 'student', 'teacher') then v_type else null end,
    v_ref,
    v_name
  )
  on conflict (id) do nothing;

  if v_type = 'student' then
    v_min_year := extract(year from v_now_jst)::integer + case when extract(month from v_now_jst) <= 3 then 0 else 1 end;
    begin
      v_year := nullif(new.raw_user_meta_data ->> 'graduation_year', '')::integer;
    exception when others then
      v_year := null;
    end;
    if v_year is null or v_year < v_min_year or v_year > v_min_year + 8 then
      v_year := v_min_year;
    end if;

    insert into public.student_profiles (user_id, graduation_year)
    values (new.id, v_year)
    on conflict (user_id) do nothing;
  end if;

  if v_type = 'teacher' then
    insert into public.quiz_teacher_requests (user_id, school_name, note)
    values (
      new.id,
      coalesce(nullif(left(btrim(coalesce(new.raw_user_meta_data ->> 'school', '')), 100), ''), '（未入力）'),
      nullif(left(btrim(coalesce(new.raw_user_meta_data ->> 'teacher_note', '')), 500), '')
    )
    on conflict (user_id) where status = 'open' do nothing;
  end if;

  if v_ref is not null then
    insert into public.follows (following_user, followed_user)
    select new.id, v_ref
    where not exists (
      select 1 from public.follows
      where following_user = new.id and followed_user = v_ref
    );

    insert into public.follows (following_user, followed_user)
    select v_ref, new.id
    where not exists (
      select 1 from public.follows
      where following_user = v_ref and followed_user = new.id
    );

    insert into public.notifications (user_id, actor_id, type, is_read)
    values
      (v_ref, new.id, 'follow', false),
      (new.id, v_ref, 'follow', false);
  end if;

  return new;
end;
$function$;
