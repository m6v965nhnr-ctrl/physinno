-- 学習の連続日数(ストリーク)。解答(quiz_progress)の記録が増えた日を、日本時間の「日」で1行ずつ持つ。
-- 理由: quiz_progress.updated_at は最新の解答しか残らず、同じ問題を解き直すと前の日が消えるため。
-- 持つのは「誰が・どの日に解いたか」だけ(問題・正誤は持たない)。本人以外は読めない。
create table if not exists public.quiz_study_days (
  user_id uuid not null references auth.users (id) on delete cascade,
  day date not null,
  primary key (user_id, day)
);
alter table public.quiz_study_days enable row level security;
revoke all on table public.quiz_study_days from public, anon, authenticated;
grant all on table public.quiz_study_days to service_role;

-- 解答が増えたときだけ記録(ブックマークの切り替えでは増えない)
create or replace function public.quiz_note_study_day()
returns trigger
language plpgsql security definer set search_path = ''
as $f$
begin
  insert into public.quiz_study_days (user_id, day)
  values (new.user_id, (now() at time zone 'Asia/Tokyo')::date)
  on conflict do nothing;
  return new;
end;
$f$;
revoke execute on function public.quiz_note_study_day() from public, anon, authenticated;

drop trigger if exists quiz_progress_study_day on public.quiz_progress;
create trigger quiz_progress_study_day
  after insert or update of attempts on public.quiz_progress
  for each row when (new.attempts > 0)
  execute function public.quiz_note_study_day();

-- 既存の解答から、最後に解いた日だけ補う(それ以前の日は復元できない)
insert into public.quiz_study_days (user_id, day)
select distinct user_id, (updated_at at time zone 'Asia/Tokyo')::date
from public.quiz_progress where attempts > 0
on conflict do nothing;

-- 連続日数。今日まだ解いていなければ、昨日までの連続を返す(日が変わった瞬間に0に見えないように)
create or replace function public.quiz_streak()
returns table (streak integer, done_today boolean)
language sql stable security definer set search_path = ''
as $f$
  with me as (select (select auth.uid()) as uid, (now() at time zone 'Asia/Tokyo')::date as today),
  d as (select s.day from public.quiz_study_days s, me where s.user_id = me.uid),
  a as (
    select case when exists (select 1 from d, me where d.day = me.today) then me.today
                when exists (select 1 from d, me where d.day = me.today - 1) then me.today - 1 end as anchor
    from me
  ),
  run as (
    select d.day + (row_number() over (order by d.day desc))::integer as k
    from d, a where a.anchor is not null and d.day <= a.anchor
  )
  select coalesce((select count(*) from run, a where run.k = a.anchor + 1), 0)::integer,
         exists (select 1 from d, me where d.day = me.today)
  where public.quiz_can_use();
$f$;
revoke execute on function public.quiz_streak() from public, anon;
grant execute on function public.quiz_streak() to authenticated;
