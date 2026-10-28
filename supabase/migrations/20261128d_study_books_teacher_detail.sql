-- 参考書の進捗：先生が、生徒名をタップしたときの詳しい記録（その生徒の記録の一覧）

create or replace function public.study_teacher_student_logs(p_book uuid, p_user uuid)
returns table (id uuid, page_start integer, page_end integer, studied_on date)
language plpgsql security definer set search_path = ''
as $f$
declare
  v_class uuid;
begin
  select class_id into v_class from public.study_books where id = p_book and teacher_id = (select auth.uid());
  if v_class is null then
    raise exception 'not found';
  end if;
  if not exists (select 1 from public.quiz_class_members m where m.class_id = v_class and m.user_id = p_user) then
    raise exception 'not found';
  end if;
  return query
  select l.id, l.page_start, l.page_end, l.studied_on
  from public.study_book_logs l
  where l.book_id = p_book and l.user_id = p_user
  order by l.studied_on desc, l.created_at desc;
end
$f$;
revoke execute on function public.study_teacher_student_logs(uuid, uuid) from public, anon;
grant execute on function public.study_teacher_student_logs(uuid, uuid) to authenticated;
