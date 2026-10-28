-- 参考書の進捗に、理解度（0.0〜10.0、小数点第1位まで）を追加
-- 記録するときに、スライダーで0〜10を選べるようにし、先生にも見えるようにする

alter table public.study_book_logs add column if not exists understanding numeric(3, 1);
alter table public.study_book_logs add constraint study_book_logs_understanding_check
  check (understanding is null or (understanding >= 0 and understanding <= 10));

-- 出力の列を増やすため、先にdropしてから作り直す（列構成の変更はcreate or replaceだけでは通らない）
drop function if exists public.study_add_log_pages(uuid, integer[], date);
drop function if exists public.study_update_log(uuid, integer, integer, date);
drop function if exists public.study_my_logs(uuid, integer);
drop function if exists public.study_teacher_student_logs(uuid, uuid);

create or replace function public.study_add_log_pages(p_book uuid, p_pages integer[], p_studied_on date, p_understanding numeric default null)
returns integer
language plpgsql security definer set search_path = ''
as $f$
declare
  v_class uuid;
  v_sorted integer[];
  v_start integer;
  v_prev integer;
  v_count integer := 0;
  v_p integer;
  v_i integer;
begin
  select class_id into v_class from public.study_books where id = p_book;
  if v_class is null or public.quiz_class_role(v_class) is null then
    raise exception 'not found';
  end if;
  if p_understanding is not null and (p_understanding < 0 or p_understanding > 10) then
    raise exception 'bad understanding';
  end if;

  select array_agg(distinct x order by x) into v_sorted from unnest(p_pages) as x where x > 0;
  if v_sorted is null then
    raise exception 'no pages';
  end if;

  v_start := v_sorted[1];
  v_prev := v_sorted[1];
  for v_i in 2..coalesce(array_length(v_sorted, 1), 1) loop
    v_p := v_sorted[v_i];
    if v_p > v_prev + 1 then
      insert into public.study_book_logs (book_id, user_id, page_start, page_end, studied_on, understanding)
      values (p_book, (select auth.uid()), v_start, v_prev, coalesce(p_studied_on, current_date), p_understanding);
      v_count := v_count + 1;
      v_start := v_p;
    end if;
    v_prev := v_p;
  end loop;
  insert into public.study_book_logs (book_id, user_id, page_start, page_end, studied_on, understanding)
  values (p_book, (select auth.uid()), v_start, v_prev, coalesce(p_studied_on, current_date), p_understanding);
  v_count := v_count + 1;

  return v_count;
end
$f$;
revoke execute on function public.study_add_log_pages(uuid, integer[], date, numeric) from public, anon;
grant execute on function public.study_add_log_pages(uuid, integer[], date, numeric) to authenticated;

create or replace function public.study_update_log(p_log uuid, p_page_start integer, p_page_end integer, p_studied_on date, p_understanding numeric default null)
returns void
language plpgsql security definer set search_path = ''
as $f$
begin
  if p_page_start is null or p_page_end is null or p_page_start < 1 or p_page_end < p_page_start then
    raise exception 'bad page range';
  end if;
  if p_understanding is not null and (p_understanding < 0 or p_understanding > 10) then
    raise exception 'bad understanding';
  end if;
  update public.study_book_logs
  set page_start = p_page_start, page_end = p_page_end, studied_on = coalesce(p_studied_on, studied_on), understanding = p_understanding
  where id = p_log and user_id = (select auth.uid());
end
$f$;
revoke execute on function public.study_update_log(uuid, integer, integer, date, numeric) from public, anon;
grant execute on function public.study_update_log(uuid, integer, integer, date, numeric) to authenticated;

create or replace function public.study_my_logs(p_book uuid, p_limit integer default 30)
returns table (id uuid, page_start integer, page_end integer, studied_on date, created_at timestamptz, understanding numeric)
language sql stable security definer set search_path = ''
as $f$
  select l.id, l.page_start, l.page_end, l.studied_on, l.created_at, l.understanding
  from public.study_book_logs l
  where l.book_id = p_book and l.user_id = (select auth.uid())
  order by l.studied_on desc, l.created_at desc
  limit least(greatest(coalesce(p_limit, 30), 1), 200);
$f$;
revoke execute on function public.study_my_logs(uuid, integer) from public, anon;
grant execute on function public.study_my_logs(uuid, integer) to authenticated;

create or replace function public.study_teacher_student_logs(p_book uuid, p_user uuid)
returns table (id uuid, page_start integer, page_end integer, studied_on date, understanding numeric)
language plpgsql security definer set search_path = ''
as $f$
declare
  v_class uuid;
begin
  select b.class_id into v_class from public.study_books b where b.id = p_book and b.teacher_id = (select auth.uid());
  if v_class is null then
    raise exception 'not found';
  end if;
  if not exists (select 1 from public.quiz_class_members m where m.class_id = v_class and m.user_id = p_user) then
    raise exception 'not found';
  end if;
  return query
  select l.id, l.page_start, l.page_end, l.studied_on, l.understanding
  from public.study_book_logs l
  where l.book_id = p_book and l.user_id = p_user
  order by l.studied_on desc, l.created_at desc;
end
$f$;
revoke execute on function public.study_teacher_student_logs(uuid, uuid) from public, anon;
grant execute on function public.study_teacher_student_logs(uuid, uuid) to authenticated;
