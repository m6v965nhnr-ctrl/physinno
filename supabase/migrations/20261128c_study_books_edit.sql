-- 参考書の進捗：あとから編集できるように
--  - study_update_unit: 先生が、単元の名前・ページ範囲をあとから直せる
--  - study_update_log: 学生が、自分の記録（ページ範囲・日付）をあとから直せる

create or replace function public.study_update_unit(p_unit uuid, p_name text, p_page_start integer, p_page_end integer)
returns void
language plpgsql security definer set search_path = ''
as $f$
begin
  if not exists (
    select 1 from public.study_book_units u join public.study_books b on b.id = u.book_id
    where u.id = p_unit and b.teacher_id = (select auth.uid())
  ) then
    raise exception 'not found';
  end if;
  if nullif(btrim(coalesce(p_name, '')), '') is null then
    raise exception 'name required';
  end if;
  if p_page_start is null or p_page_end is null or p_page_start < 1 or p_page_end < p_page_start then
    raise exception 'bad page range';
  end if;
  update public.study_book_units
  set name = left(btrim(p_name), 60), page_start = p_page_start, page_end = p_page_end
  where id = p_unit;
end
$f$;
revoke execute on function public.study_update_unit(uuid, text, integer, integer) from public, anon;
grant execute on function public.study_update_unit(uuid, text, integer, integer) to authenticated;

create or replace function public.study_update_log(p_log uuid, p_page_start integer, p_page_end integer, p_studied_on date)
returns void
language plpgsql security definer set search_path = ''
as $f$
begin
  if p_page_start is null or p_page_end is null or p_page_start < 1 or p_page_end < p_page_start then
    raise exception 'bad page range';
  end if;
  update public.study_book_logs
  set page_start = p_page_start, page_end = p_page_end, studied_on = coalesce(p_studied_on, studied_on)
  where id = p_log and user_id = (select auth.uid());
end
$f$;
revoke execute on function public.study_update_log(uuid, integer, integer, date) from public, anon;
grant execute on function public.study_update_log(uuid, integer, integer, date) to authenticated;
