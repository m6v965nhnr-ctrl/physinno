-- 数字で答えてもらった項目（年収・残業・年間休日・女性の働きやすさ）の平均。3件以上の回答がそろった項目だけ返す（個人が特定されないように）
create or replace function public.get_hospital_review_numbers(p_hospital uuid)
returns table(kind text, n bigint, avg_value numeric)
language sql stable security definer set search_path = '' as $f$
  select k.kind, k.n, k.a from (
    select 'annual_income'::text kind, count(r.annual_income) n, round(avg(r.annual_income), 1) a from public.hospital_reviews r where r.hospital_id = p_hospital
    union all select 'monthly_overtime_hours', count(r.monthly_overtime_hours), round(avg(r.monthly_overtime_hours), 1) from public.hospital_reviews r where r.hospital_id = p_hospital
    union all select 'annual_holidays', count(r.annual_holidays), round(avg(r.annual_holidays), 1) from public.hospital_reviews r where r.hospital_id = p_hospital
    union all select 'women_friendly', count(r.women_friendly), round(avg(r.women_friendly), 2) from public.hospital_reviews r where r.hospital_id = p_hospital
  ) k where k.n >= 3;
$f$;
revoke all on function public.get_hospital_review_numbers(uuid) from public;
grant execute on function public.get_hospital_review_numbers(uuid) to anon, authenticated;
