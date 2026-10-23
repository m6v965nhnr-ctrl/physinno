-- 連投・荒らし対策: 同じ人（組織）が、24時間に投稿できる数に上限を設ける（DBで強制する）
create or replace function public.enforce_org_post_rate() returns trigger
language plpgsql security definer set search_path = '' as $f$
begin
  if (select count(*) from public.org_posts where organization_id = new.organization_id and created_at > now() - interval '24 hours') >= 10 then
    raise exception 'too_many';
  end if;
  return new;
end $f$;
create or replace function public.enforce_hospital_question_rate() returns trigger
language plpgsql security definer set search_path = '' as $f$
begin
  if (select count(*) from public.hospital_questions where user_id = new.user_id and created_at > now() - interval '24 hours') >= 10 then
    raise exception 'too_many';
  end if;
  return new;
end $f$;
create or replace function public.enforce_hospital_answer_rate() returns trigger
language plpgsql security definer set search_path = '' as $f$
begin
  if (select count(*) from public.hospital_answers where user_id = new.user_id and created_at > now() - interval '24 hours') >= 30 then
    raise exception 'too_many';
  end if;
  return new;
end $f$;
revoke all on function public.enforce_org_post_rate(), public.enforce_hospital_question_rate(), public.enforce_hospital_answer_rate() from public, anon, authenticated;
drop trigger if exists org_posts_rate on public.org_posts;
create trigger org_posts_rate before insert on public.org_posts for each row execute function public.enforce_org_post_rate();
drop trigger if exists hospital_questions_rate on public.hospital_questions;
create trigger hospital_questions_rate before insert on public.hospital_questions for each row execute function public.enforce_hospital_question_rate();
drop trigger if exists hospital_answers_rate on public.hospital_answers;
create trigger hospital_answers_rate before insert on public.hospital_answers for each row execute function public.enforce_hospital_answer_rate();
