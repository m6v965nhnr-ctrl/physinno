-- 職場口コミの単体サイト（/kuchikomi）用。ログインなしで読めるのは、各施設の新しい3件まで。4件目以降は、ログインした人だけ。
-- 件数・平均点は、ログインなしでも出す（検索結果のスニペットと、「あと◯件」の表示に使う）。

-- 1) 口コミ一覧: ログインなし(auth.uid() が null)は、新しい順に3件まで。
create or replace function public.get_hospital_reviews(p_hospital_id uuid)
 returns table(id uuid, hospital_id uuid, work_environment smallint, education_system smallint, salary smallint, overtime smallint, paid_leave smallint, openness smallint, overall_score smallint, comment text, is_anonymous boolean, created_at timestamp with time zone, is_mine boolean, women_friendly smallint, employment_type text, annual_income integer, monthly_overtime_hours integer, annual_holidays integer, age_band smallint)
 language sql stable security definer set search_path to ''
as $function$
  select r.id, r.hospital_id, r.work_environment, r.education_system, r.salary,
         r.overtime, r.paid_leave, r.openness, r.overall_score, r.comment,
         r.is_anonymous, r.created_at,
         (r.user_id = (select auth.uid())) as is_mine,
         r.women_friendly, r.employment_type, r.annual_income, r.monthly_overtime_hours, r.annual_holidays,
         case when r.user_id = (select auth.uid()) then r.age_band end -- 他の人の年齢は返さない（本人の編集用）
  from public.hospital_reviews r
  where r.hospital_id = p_hospital_id
    and not public.is_blocked_by_me(r.user_id)
  order by r.created_at desc
  limit case when (select auth.uid()) is null then 3 end; -- ログインなしは3件まで（null = 制限なし）
$function$;
grant execute on function public.get_hospital_reviews(uuid) to anon, authenticated;

-- 2) 分類コメント: ログインなしは、読める3件の口コミに付いたものだけ。
create or replace function public.get_hospital_review_topics(p_hospital uuid)
returns table(id uuid, review_id uuid, category text, body text, created_at timestamptz, is_mine boolean)
language sql stable security definer set search_path = '' as $f$
  select t.id, t.review_id, t.category, t.body, t.created_at, (t.user_id = (select auth.uid()))
  from public.hospital_review_topics t
  where t.hospital_id = p_hospital and not public.is_blocked_by_me(t.user_id)
    and ((select auth.uid()) is not null
         or t.review_id in (select r.id from public.hospital_reviews r where r.hospital_id = p_hospital order by r.created_at desc limit 3))
  order by t.created_at desc;
$f$;
revoke all on function public.get_hospital_review_topics(uuid) from public;
grant execute on function public.get_hospital_review_topics(uuid) to anon, authenticated;

-- 3) 件数と平均点（ログインなしでも返す。個人は特定できない集計値だけ）
create or replace function public.get_hospital_review_stats(p_hospital uuid)
returns table(review_count bigint, avg_overall numeric, avg_work_environment numeric, avg_education_system numeric, avg_salary numeric, avg_overtime numeric, avg_paid_leave numeric, avg_openness numeric)
language sql stable security definer set search_path = '' as $f$
  select count(*), round(avg(r.overall_score), 2), round(avg(r.work_environment), 2), round(avg(r.education_system), 2),
         round(avg(r.salary), 2), round(avg(r.overtime), 2), round(avg(r.paid_leave), 2), round(avg(r.openness), 2)
  from public.hospital_reviews r where r.hospital_id = p_hospital;
$f$;
revoke all on function public.get_hospital_review_stats(uuid) from public;
grant execute on function public.get_hospital_review_stats(uuid) to anon, authenticated;

-- 4) 口コミのある施設の一覧（口コミサイトのトップ・都道府県別・サイトマップ用）
create or replace function public.list_reviewed_hospitals(p_prefecture text default null, p_limit integer default 24, p_offset integer default 0)
returns table(id uuid, name text, prefecture text, city text, facility_type text, review_count bigint, avg_overall numeric, last_at timestamptz)
language sql stable security definer set search_path = '' as $f$
  select h.id, h.name, h.prefecture, h.city, h.facility_type, s.c, s.a, s.l
  from (select hospital_id, count(*) c, round(avg(overall_score), 2) a, max(created_at) l from public.hospital_reviews group by hospital_id) s
  join public.hospitals h on h.id = s.hospital_id
  where p_prefecture is null or h.prefecture = p_prefecture
  order by s.c desc, s.l desc
  limit least(greatest(p_limit, 1), 1000) offset greatest(p_offset, 0);
$f$;
revoke all on function public.list_reviewed_hospitals(text, integer, integer) from public;
grant execute on function public.list_reviewed_hospitals(text, integer, integer) to anon, authenticated;
