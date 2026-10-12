-- 登録フォームで入力した名前(必須)を users.full_name に保存する
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
    case when v_type in ('pt', 'general', 'student') then v_type else null end,
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
