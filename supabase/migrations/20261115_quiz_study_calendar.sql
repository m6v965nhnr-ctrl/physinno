-- 学習のカレンダー: 日ごとに、解いた問題の数も持つ（これまでの日は、1以上、として1を入れる）
alter table public.quiz_study_days add column if not exists solved integer not null default 1;

create or replace function public.quiz_note_study_day()
returns trigger
language plpgsql security definer set search_path = ''
as $f$
begin
  insert into public.quiz_study_days (user_id, day, solved)
  values (new.user_id, (now() at time zone 'Asia/Tokyo')::date, 1)
  on conflict (user_id, day) do update set solved = public.quiz_study_days.solved + 1;
  return new;
end;
$f$;
revoke execute on function public.quiz_note_study_day() from public, anon, authenticated;

-- 自分の、勉強した日（問題を解いた日・学習ログを付けた日）。日付ごとに、解いた問題数と、学習の分数
create or replace function public.quiz_study_calendar(p_from date, p_to date)
returns table (day date, solved integer, minutes integer)
language sql stable security definer set search_path = ''
as $f$
  with me as (select (select auth.uid()) as uid),
  q as (select s.day, s.solved from public.quiz_study_days s, me where s.user_id = me.uid and s.day between p_from and p_to),
  l as (select g.studied_on as day, sum(g.minutes)::integer as minutes from public.study_logs g, me where g.user_id = me.uid and g.studied_on between p_from and p_to group by g.studied_on)
  select coalesce(q.day, l.day), coalesce(q.solved, 0), coalesce(l.minutes, 0)
  from q full join l on l.day = q.day
  where public.quiz_can_use()
  order by 1;
$f$;
revoke execute on function public.quiz_study_calendar(date, date) from public, anon;
grant execute on function public.quiz_study_calendar(date, date) to authenticated;
