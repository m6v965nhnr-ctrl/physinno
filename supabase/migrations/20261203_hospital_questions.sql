-- 職場ページの「質問」: その職場について知りたいことを聞き、その職場で働いている人が答える。
-- 働いているかどうかの確認はしない（回答者の自己申告・モラルに任せる）。読み書きできるのは、ログインしたPTと学生
drop function if exists public.list_hospital_questions(uuid, integer);

create table if not exists public.hospital_questions (
  id uuid primary key default gen_random_uuid(),
  hospital_id uuid not null references public.hospitals(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  body text not null check (char_length(body) between 5 and 500),
  is_anonymous boolean not null default true,
  created_at timestamptz not null default now()
);
create table if not exists public.hospital_answers (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.hospital_questions(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 1500),
  is_anonymous boolean not null default true,
  is_worker boolean not null default false, -- 「この職場で働いています」の自己申告
  created_at timestamptz not null default now()
);
create index if not exists hospital_questions_hospital_idx on public.hospital_questions (hospital_id, created_at desc);
create index if not exists hospital_answers_question_idx on public.hospital_answers (question_id, created_at);
create index if not exists hospital_questions_user_idx on public.hospital_questions (user_id);
create index if not exists hospital_answers_user_idx on public.hospital_answers (user_id);

alter table public.hospital_questions enable row level security;
alter table public.hospital_answers enable row level security;
revoke all on public.hospital_questions, public.hospital_answers from public, anon, authenticated;
grant select, insert, delete on public.hospital_questions, public.hospital_answers to authenticated;

-- 一覧は下の関数から読む（投稿者のIDを返さないため）。表で読めるのは、自分の投稿だけ
create policy hospital_questions_select_own on public.hospital_questions for select to authenticated using (user_id = (select auth.uid()));
create policy hospital_answers_select_own on public.hospital_answers for select to authenticated using (user_id = (select auth.uid()));
create policy hospital_questions_insert on public.hospital_questions for insert to authenticated
  with check (user_id = (select auth.uid()) and exists (select 1 from public.users u where u.id = (select auth.uid()) and u.account_type in ('pt', 'student')));
create policy hospital_answers_insert on public.hospital_answers for insert to authenticated
  with check (user_id = (select auth.uid()) and exists (select 1 from public.users u where u.id = (select auth.uid()) and u.account_type in ('pt', 'student')));
create policy hospital_questions_delete_own on public.hospital_questions for delete to authenticated using (user_id = (select auth.uid()));
create policy hospital_answers_delete_own on public.hospital_answers for delete to authenticated using (user_id = (select auth.uid()));

create or replace function public.list_hospital_questions(p_hospital uuid, p_limit integer default 30)
returns table(id uuid, body text, author_name text, created_at timestamptz, is_mine boolean, answers jsonb)
language sql stable security definer set search_path = '' as $f$
  select q.id, q.body,
         case when q.is_anonymous then null else (select p.full_name from public.pt_profiles p where p.user_id = q.user_id limit 1) end,
         q.created_at, (q.user_id = (select auth.uid())),
         coalesce((select jsonb_agg(jsonb_build_object(
             'id', a.id, 'body', a.body, 'is_worker', a.is_worker, 'created_at', a.created_at,
             'is_mine', a.user_id = (select auth.uid()),
             'author_name', case when a.is_anonymous then null else (select p.full_name from public.pt_profiles p where p.user_id = a.user_id limit 1) end
           ) order by a.created_at)
           from public.hospital_answers a where a.question_id = q.id and not public.is_blocked_by_me(a.user_id)), '[]'::jsonb)
  from public.hospital_questions q
  where q.hospital_id = p_hospital
    and exists (select 1 from public.users u where u.id = (select auth.uid()) and u.account_type in ('pt', 'student'))
    and not public.is_blocked_by_me(q.user_id)
  order by q.created_at desc
  limit least(greatest(p_limit, 1), 100);
$f$;
revoke all on function public.list_hospital_questions(uuid, integer) from public, anon;
grant execute on function public.list_hospital_questions(uuid, integer) to authenticated;

-- 口コミに「年齢」を足す（年収の推移用・任意）。25=25歳以下 30=26〜30歳 35=31〜35歳 40 45 50 55=51歳以上
alter table public.hospital_reviews add column if not exists age_band smallint check (age_band in (25, 30, 35, 40, 45, 50, 55));

drop function if exists public.get_hospital_reviews(uuid);
create function public.get_hospital_reviews(p_hospital_id uuid)
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
  order by r.created_at desc;
$function$;
grant execute on function public.get_hospital_reviews(uuid) to anon, authenticated;

-- 年齢の層ごとの平均年収。3件以上そろった層だけ返す（個人が特定されないように）
create or replace function public.get_hospital_income_by_age(p_hospital uuid)
returns table(age_band smallint, n bigint, avg_income integer)
language sql stable security definer set search_path = '' as $f$
  select r.age_band, count(*), round(avg(r.annual_income))::integer
  from public.hospital_reviews r
  where r.hospital_id = p_hospital and r.age_band is not null and r.annual_income is not null
  group by r.age_band having count(*) >= 3
  order by r.age_band;
$f$;
revoke all on function public.get_hospital_income_by_age(uuid) from public;
grant execute on function public.get_hospital_income_by_age(uuid) to anon, authenticated;
