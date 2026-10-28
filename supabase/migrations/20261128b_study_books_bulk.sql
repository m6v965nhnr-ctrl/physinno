-- 参考書の進捗：学生のショートカット導線用
--  - study_my_books: 自分が参加している、すべてのクラスの参考書をまとめて見る（クラスを指定しなくてよい）
--  - study_add_log_pages: ページ番号をいくつでも渡すと、連続するページをまとめて1件の記録にして保存する
--    （タップで1ページずつ選ぶのと、範囲でまとめて選ぶのを、同じ下書き（選択中のページの集合）で扱えるようにする）

create or replace function public.study_my_books()
returns table (id uuid, name text, total_pages integer, class_id uuid, class_name text, unit_count integer)
language sql stable security definer set search_path = ''
as $f$
  select b.id, b.name, b.total_pages, b.class_id, c.name,
         (select count(*)::integer from public.study_book_units u where u.book_id = b.id)
  from public.study_books b
  join public.quiz_classes c on c.id = b.class_id
  join public.quiz_class_members m on m.class_id = b.class_id and m.user_id = (select auth.uid())
  where not b.archived
  order by b.created_at desc;
$f$;
revoke execute on function public.study_my_books() from public, anon;
grant execute on function public.study_my_books() to authenticated;

create or replace function public.study_add_log_pages(p_book uuid, p_pages integer[], p_studied_on date)
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

  select array_agg(distinct x order by x) into v_sorted from unnest(p_pages) as x where x > 0;
  if v_sorted is null then
    raise exception 'no pages';
  end if;

  v_start := v_sorted[1];
  v_prev := v_sorted[1];
  for v_i in 2..coalesce(array_length(v_sorted, 1), 1) loop
    v_p := v_sorted[v_i];
    if v_p > v_prev + 1 then
      insert into public.study_book_logs (book_id, user_id, page_start, page_end, studied_on)
      values (p_book, (select auth.uid()), v_start, v_prev, coalesce(p_studied_on, current_date));
      v_count := v_count + 1;
      v_start := v_p;
    end if;
    v_prev := v_p;
  end loop;
  insert into public.study_book_logs (book_id, user_id, page_start, page_end, studied_on)
  values (p_book, (select auth.uid()), v_start, v_prev, coalesce(p_studied_on, current_date));
  v_count := v_count + 1;

  return v_count;
end
$f$;
revoke execute on function public.study_add_log_pages(uuid, integer[], date) from public, anon;
grant execute on function public.study_add_log_pages(uuid, integer[], date) to authenticated;
