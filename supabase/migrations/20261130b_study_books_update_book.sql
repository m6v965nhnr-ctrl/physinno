-- 参考書の名前・総ページ数を、作ったあとでも編集できるようにする（今まで編集手段がなかった）

create or replace function public.study_update_book(p_book uuid, p_name text, p_total_pages integer)
returns boolean
language plpgsql security definer set search_path = ''
as $f$
begin
  if coalesce(trim(p_name), '') = '' then
    raise exception 'name required';
  end if;
  update public.study_books b
  set name = trim(p_name), total_pages = p_total_pages
  where b.id = p_book and b.teacher_id = (select auth.uid());
  return found;
end
$f$;
revoke execute on function public.study_update_book(uuid, text, integer) from public, anon;
grant execute on function public.study_update_book(uuid, text, integer) to authenticated;
