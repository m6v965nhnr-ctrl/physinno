-- 病院の口コミに、数字で答える欄（雇用形態・年収・月の残業・年間休日）と「女性の働きやすさ」を足す（すべて任意）。
-- 平均は、3件以上そろった項目だけ画面に出す（個人が特定されないように）。
alter table public.hospital_reviews
  add column if not exists women_friendly smallint check (women_friendly between 1 and 10),
  add column if not exists employment_type text check (employment_type in ('常勤', '非常勤', 'パート')),
  add column if not exists annual_income integer check (annual_income between 100 and 3000),
  add column if not exists monthly_overtime_hours integer check (monthly_overtime_hours between 0 and 300),
  add column if not exists annual_holidays integer check (annual_holidays between 50 and 200);

drop function if exists public.get_hospital_reviews(uuid);

create function public.get_hospital_reviews(p_hospital_id uuid)
 returns table(id uuid, hospital_id uuid, work_environment smallint, education_system smallint, salary smallint, overtime smallint, paid_leave smallint, openness smallint, overall_score smallint, comment text, is_anonymous boolean, created_at timestamp with time zone, is_mine boolean, women_friendly smallint, employment_type text, annual_income integer, monthly_overtime_hours integer, annual_holidays integer)
 language sql stable security definer set search_path to ''
as $function$
  select r.id, r.hospital_id, r.work_environment, r.education_system, r.salary,
         r.overtime, r.paid_leave, r.openness, r.overall_score, r.comment,
         r.is_anonymous, r.created_at,
         (r.user_id = (select auth.uid())) as is_mine,
         r.women_friendly, r.employment_type, r.annual_income, r.monthly_overtime_hours, r.annual_holidays
  from public.hospital_reviews r
  where r.hospital_id = p_hospital_id
    and not public.is_blocked_by_me(r.user_id)
  order by r.created_at desc;
$function$;

grant execute on function public.get_hospital_reviews(uuid) to anon, authenticated;
