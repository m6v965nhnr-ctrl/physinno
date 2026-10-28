-- 理解度を、先生が見たいかどうかで、その参考書ごとに出す/出さないを選べるようにする
-- オフなら、学生のタップ画面でもスライダーを出さない（先生が見ないものを、学生に入力させない）

alter table public.study_books add column if not exists show_understanding boolean not null default true;

drop function if exists public.study_create_book(uuid, text, integer);
drop function if exists public.study_update_book(uuid, text, integer);
drop function if exists public.study_list_books(uuid);
drop function if exists public.study_my_books();

create or replace function public.study_create_book(p_class uuid, p_name text, p_total_pages integer, p_show_understanding boolean default true)
returns uuid
language plpgsql security definer set search_path = ''
as $f$
declare
  v_id uuid;
begin
  if public.quiz_class_role(p_class) <> 'teacher' then
    raise exception 'teacher only';
  end if;
  if nullif(btrim(coalesce(p_name, '')), '') is null then
    raise exception 'name required';
  end if;
  insert into public.study_books (class_id, teacher_id, name, total_pages, show_understanding)
  values (p_class, (select auth.uid()), left(btrim(p_name), 80), p_total_pages, coalesce(p_show_understanding, true))
  returning id into v_id;
  return v_id;
end
$f$;
revoke execute on function public.study_create_book(uuid, text, integer, boolean) from public, anon;
grant execute on function public.study_create_book(uuid, text, integer, boolean) to authenticated;

create or replace function public.study_update_book(p_book uuid, p_name text, p_total_pages integer, p_show_understanding boolean default true)
returns boolean
language plpgsql security definer set search_path = ''
as $f$
begin
  if coalesce(trim(p_name), '') = '' then
    raise exception 'name required';
  end if;
  update public.study_books b
  set name = trim(p_name), total_pages = p_total_pages, show_understanding = coalesce(p_show_understanding, true)
  where b.id = p_book and b.teacher_id = (select auth.uid());
  return found;
end
$f$;
revoke execute on function public.study_update_book(uuid, text, integer, boolean) from public, anon;
grant execute on function public.study_update_book(uuid, text, integer, boolean) to authenticated;

create or replace function public.study_list_books(p_class uuid)
returns table (id uuid, name text, total_pages integer, archived boolean, unit_count integer, created_at timestamptz, show_understanding boolean)
language sql stable security definer set search_path = ''
as $f$
  select b.id, b.name, b.total_pages, b.archived,
         (select count(*)::integer from public.study_book_units u where u.book_id = b.id),
         b.created_at, b.show_understanding
  from public.study_books b
  where b.class_id = p_class and public.quiz_class_role(p_class) is not null
  order by b.archived, b.created_at desc;
$f$;
revoke execute on function public.study_list_books(uuid) from public, anon;
grant execute on function public.study_list_books(uuid) to authenticated;

create or replace function public.study_my_books()
returns table (id uuid, name text, total_pages integer, class_id uuid, class_name text, unit_count integer, show_understanding boolean)
language sql stable security definer set search_path = ''
as $f$
  select b.id, b.name, b.total_pages, b.class_id, c.name,
         (select count(*)::integer from public.study_book_units u where u.book_id = b.id),
         b.show_understanding
  from public.study_books b
  join public.quiz_classes c on c.id = b.class_id
  join public.quiz_class_members m on m.class_id = b.class_id and m.user_id = (select auth.uid())
  where not b.archived
  order by b.created_at desc;
$f$;
revoke execute on function public.study_my_books() from public, anon;
grant execute on function public.study_my_books() to authenticated;
