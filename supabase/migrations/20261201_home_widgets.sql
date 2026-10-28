-- 学生ホームのウィジェット（今日の学習・校内ランキング・国試まで・卒業まで）を
-- 先生がクラスごとに表示する/しないを選べ、学生も自分のホームから個別に非表示にできるようにする

alter table public.student_profiles add column if not exists hidden_widgets text[] not null default '{}';
alter table public.student_profiles add constraint student_profiles_hidden_widgets_check
  check (hidden_widgets <@ array['study_calendar','ranking','exam_countdown','graduation_countdown']::text[]);

alter table public.quiz_classes add column if not exists hidden_widgets text[] not null default '{}';
alter table public.quiz_classes add constraint quiz_classes_hidden_widgets_check
  check (hidden_widgets <@ array['study_calendar','ranking','exam_countdown','graduation_countdown']::text[]);

-- 学生が、自分のホームから1つだけ非表示/再表示する
create or replace function public.set_student_widget_hidden(p_widget text, p_hidden boolean)
returns void
language plpgsql security definer set search_path = ''
as $f$
begin
  if p_widget not in ('study_calendar', 'ranking', 'exam_countdown', 'graduation_countdown') then
    raise exception 'invalid widget';
  end if;
  update public.student_profiles p
  set hidden_widgets = case
    when p_hidden then (select coalesce(array_agg(distinct w), '{}') from unnest(p.hidden_widgets || array[p_widget]) as w)
    else array_remove(p.hidden_widgets, p_widget)
  end
  where p.user_id = (select auth.uid());
end
$f$;
revoke execute on function public.set_student_widget_hidden(text, boolean) from public, anon;
grant execute on function public.set_student_widget_hidden(text, boolean) to authenticated;

-- 先生が、クラスごとに表示するウィジェットを選ぶ（「やる気をなくすかもしれない」ものを外せるように）
create or replace function public.quiz_set_class_widgets(p_class uuid, p_hidden text[])
returns void
language plpgsql security definer set search_path = ''
as $f$
begin
  if exists (select 1 from unnest(p_hidden) w where w not in ('study_calendar', 'ranking', 'exam_countdown', 'graduation_countdown')) then
    raise exception 'invalid widget';
  end if;
  update public.quiz_classes c
  set hidden_widgets = p_hidden
  where c.id = p_class and c.teacher_id = (select auth.uid());
end
$f$;
revoke execute on function public.quiz_set_class_widgets(uuid, text[]) from public, anon;
grant execute on function public.quiz_set_class_widgets(uuid, text[]) to authenticated;

-- 先生が、設定画面を開いたときに、今のクラスの設定を読む
create or replace function public.quiz_class_widgets(p_class uuid)
returns text[]
language sql security definer set search_path = '' stable
as $f$
  select coalesce(c.hidden_widgets, '{}') from public.quiz_classes c where c.id = p_class and c.teacher_id = (select auth.uid())
$f$;
revoke execute on function public.quiz_class_widgets(uuid) from public, anon;
grant execute on function public.quiz_class_widgets(uuid) to authenticated;

-- 学生ホームが、どのウィジェットを出すか（自分の設定と、参加しているクラスの先生の設定を、両方とも尊重する＝どちらかが非表示なら非表示）
-- locked_by_class = true のものは、先生がクラスで外しているので、学生の設定画面では選べない（その旨を出すために返す）
create or replace function public.get_home_widget_visibility()
returns table (widget text, visible boolean, locked_by_class boolean)
language plpgsql security definer set search_path = '' stable
as $f$
declare
  v_mine text[];
  v_class_hidden text[];
  v_keys text[] := array['study_calendar', 'ranking', 'exam_countdown', 'graduation_countdown'];
begin
  select coalesce(p.hidden_widgets, '{}') into v_mine from public.student_profiles p where p.user_id = (select auth.uid());
  select coalesce(array_agg(distinct x), '{}') into v_class_hidden
  from public.quiz_class_members m
  join public.quiz_classes c on c.id = m.class_id
  cross join lateral unnest(c.hidden_widgets) as x
  where m.user_id = (select auth.uid());

  return query
  select k, not (k = any(v_mine) or k = any(v_class_hidden)), k = any(v_class_hidden)
  from unnest(v_keys) as k;
end
$f$;
revoke execute on function public.get_home_widget_visibility() from public, anon;
grant execute on function public.get_home_widget_visibility() to authenticated;
