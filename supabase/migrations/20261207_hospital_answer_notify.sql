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
