-- 職場ページの「質問」タブ: 既存の質問（student_questions）を、職場ごとに一覧する。読めるのは、既存と同じ、PTと学生だけ
create or replace function public.list_hospital_questions(p_hospital uuid, p_limit integer default 30)
returns table(id uuid, category text, title text, body_preview text, author_name text, answer_count bigint, created_at timestamp with time zone, is_mine boolean)
language sql stable security definer set search_path = '' as $f$
  select q.id, q.category, q.title, left(q.body, 160),
         case when q.is_anonymous then null else (select p.full_name from public.pt_profiles p where p.user_id = q.user_id limit 1) end,
         (select count(*) from public.student_answers a where a.question_id = q.id),
         q.created_at, (q.user_id = (select auth.uid()))
  from public.student_questions q
  where q.hospital_id = p_hospital
    and exists (select 1 from public.users u where u.id = (select auth.uid()) and u.account_type in ('pt', 'student'))
    and not public.is_blocked_by_me(q.user_id)
  order by q.created_at desc
  limit least(greatest(p_limit, 1), 100);
$f$;
revoke all on function public.list_hospital_questions(uuid, integer) from public, anon;
grant execute on function public.list_hospital_questions(uuid, integer) to authenticated;
