-- 職場口コミサイト: 理学療法士・作業療法士・言語聴覚士を選んで登録できるようにする（2026-11-17）
-- 作業療法士・言語聴覚士は、アカウントの種類は「一般」（general）のまま、職種（profession）だけを持つ。
-- PT向けの機能（account_type='pt' に依存する画面・RLS）には、影響しない。職種は自己申告（資格の確認はしない）。

alter table public.users add column if not exists profession text;
alter table public.users drop constraint if exists users_profession_check;
alter table public.users add constraint users_profession_check check (profession is null or profession in ('pt', 'ot', 'st'));
grant select (profession) on public.users to authenticated;  -- 更新は、下の関数（登録時のトリガー・set_my_profession）だけ
update public.users set profession = 'pt' where account_type = 'pt' and profession is null;

-- 登録時: account_type='pt' → 職種 pt。'general' で職種に ot / st が渡されたときだけ、その職種を保存する
create or replace function public.handle_new_user()
 returns trigger
 language plpgsql
 security definer
 set search_path to ''
as $function$
declare
  v_type text := new.raw_user_meta_data ->> 'account_type';
  v_prof text := new.raw_user_meta_data ->> 'profession';
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

  insert into public.users (id, email, account_type, referred_by, full_name, profession)
  values (
    new.id,
    new.email,
    case when v_type in ('pt', 'general', 'student', 'teacher', 'org') then v_type else null end,
    v_ref,
    v_name,
    case when v_type = 'pt' then 'pt' when v_type = 'general' and v_prof in ('ot', 'st') then v_prof else null end
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

-- すでに「一般」で登録した作業療法士・言語聴覚士が、あとから職種を選ぶ（1回だけ。自己申告）
create or replace function public.set_my_profession(p_profession text)
returns void
language plpgsql
security definer
set search_path = ''
as $f$
begin
  if p_profession not in ('ot', 'st') then
    raise exception 'invalid_profession';
  end if;
  update public.users set profession = p_profession
  where id = (select auth.uid()) and account_type = 'general' and profession is null;
end;
$f$;
revoke all on function public.set_my_profession(text) from public, anon;
grant execute on function public.set_my_profession(text) to authenticated;

-- 職場口コミを書ける人: PT（account_type='pt'）と、職種が作業療法士・言語聴覚士の人
create or replace function public.is_rehab_pro(p_user uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $f$
  select exists (select 1 from public.users u where u.id = p_user and (u.account_type = 'pt' or u.profession in ('ot', 'st')));
$f$;
revoke all on function public.is_rehab_pro(uuid) from public, anon;
grant execute on function public.is_rehab_pro(uuid) to authenticated;

drop policy if exists hospital_reviews_insert_own on public.hospital_reviews;
create policy hospital_reviews_insert_own on public.hospital_reviews for insert to authenticated
  with check ((select auth.uid()) = user_id and public.is_rehab_pro((select auth.uid())));
drop policy if exists hospital_reviews_update_own on public.hospital_reviews;
create policy hospital_reviews_update_own on public.hospital_reviews for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id and public.is_rehab_pro((select auth.uid())));

-- 口コミの投稿者の職種（個人は特定されない。ログインなしは、読める3件だけ）
create or replace function public.get_hospital_review_professions(p_hospital uuid)
returns table(review_id uuid, profession text)
language sql
stable
security definer
set search_path = ''
as $f$
  select r.id, case when u.account_type = 'pt' then 'pt' else u.profession end
  from public.hospital_reviews r
  join public.users u on u.id = r.user_id
  where r.hospital_id = p_hospital and not public.is_blocked_by_me(r.user_id)
  order by r.created_at desc
  limit case when (select auth.uid()) is null then 3 end;
$f$;
revoke all on function public.get_hospital_review_professions(uuid) from public;
grant execute on function public.get_hospital_review_professions(uuid) to anon, authenticated;
