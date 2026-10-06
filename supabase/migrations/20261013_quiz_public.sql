-- 国家試験の過去問を、ログインなしで読める公開ページ（/kokushi）用に返す関数。
-- 問題・選択肢・正答は厚生労働省が公開している情報。AI解説は含めない（登録者向け）。
create or replace function public.quiz_public_exams()
returns table(exam_no smallint, total bigint)
language sql stable security definer set search_path = public as $$
  select q.exam_no, count(*) from public.quiz_questions q
  group by q.exam_no order by q.exam_no desc;
$$;

create or replace function public.quiz_public_list(p_exam integer)
returns table(session text, no smallint, unit_name text, field text, stem text, excluded boolean)
language sql stable security definer set search_path = public as $$
  select q.session, q.no, u.name, u.field, left(regexp_replace(coalesce(nullif(q.intro, ''), q.stem), '\s+', ' ', 'g'), 80), q.excluded
    from public.quiz_questions q
    left join public.quiz_units u on u.id = q.unit
   where q.exam_no = p_exam
   order by case q.session when 'am' then 0 else 1 end, q.no;
$$;

create or replace function public.quiz_public_question(p_exam integer, p_session text, p_no integer)
returns table(exam_no smallint, session text, no smallint, unit_name text, field text, intro text, stem text,
              choices jsonb, answers jsonb, need smallint, image text, book_images jsonb,
              choices_in_image boolean, excluded boolean)
language sql stable security definer set search_path = public as $$
  select q.exam_no, q.session, q.no, u.name, u.field, q.intro, q.stem, q.choices, q.answers, q.need,
         q.image, q.book_images, q.choices_in_image, q.excluded
    from public.quiz_questions q
    left join public.quiz_units u on u.id = q.unit
   where q.exam_no = p_exam and q.session = p_session and q.no = p_no;
$$;

revoke execute on function public.quiz_public_exams() from public;
revoke execute on function public.quiz_public_list(integer) from public;
revoke execute on function public.quiz_public_question(integer, text, integer) from public;
grant execute on function public.quiz_public_exams() to anon, authenticated;
grant execute on function public.quiz_public_list(integer) to anon, authenticated;
grant execute on function public.quiz_public_question(integer, text, integer) to anon, authenticated;
