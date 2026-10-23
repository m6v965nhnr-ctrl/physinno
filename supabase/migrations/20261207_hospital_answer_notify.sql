-- 職場への質問に回答がついたら、質問した人に通知する（回答が匿名のときは、回答者は表示しない）
alter table public.notifications add column if not exists hospital_id uuid references public.hospitals(id) on delete cascade;

create or replace function public.trg_hospital_answers_notify() returns trigger
language plpgsql security definer set search_path = '' as $f$
declare
  v_owner uuid;
  v_hospital uuid;
begin
  select user_id, hospital_id into v_owner, v_hospital from public.hospital_questions where id = new.question_id;
  if v_owner is not null and v_owner <> new.user_id then
    insert into public.notifications (user_id, actor_id, type, hospital_id, is_read)
    values (v_owner, case when new.is_anonymous then null else new.user_id end, 'hospital_answer', v_hospital, false);
  end if;
  return new;
end
$f$;
revoke all on function public.trg_hospital_answers_notify() from public, anon, authenticated;
drop trigger if exists hospital_answers_notify on public.hospital_answers;
create trigger hospital_answers_notify after insert on public.hospital_answers for each row execute function public.trg_hospital_answers_notify();
create index if not exists notifications_hospital_idx on public.notifications (hospital_id) where hospital_id is not null;

-- 運営の組織の確認画面に、ひもづけた職場ページ（hospital_id・名前）を出す
create or replace function public.admin_list_organizations() returns jsonb
language plpgsql stable security definer set search_path = '' as $f$
begin
  if not exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())) then raise exception 'not allowed'; end if;
  return coalesce((select jsonb_agg(x order by (x->>'status') = 'pending' desc, x->>'created_at' desc) from (
    select jsonb_build_object('id', o.id, 'name', o.name, 'facility_category', o.facility_category, 'facility_type', o.facility_type, 'prefecture', o.prefecture, 'website', o.website, 'description', o.description, 'status', o.status, 'review_note', o.review_note, 'created_at', o.created_at, 'owner_name', u.full_name, 'hospital_id', o.hospital_id, 'hospital_name', h.name) x
    from public.organizations o left join public.users u on u.id = o.owner_id left join public.hospitals h on h.id = o.hospital_id limit 200) t), '[]'::jsonb);
end $f$;
