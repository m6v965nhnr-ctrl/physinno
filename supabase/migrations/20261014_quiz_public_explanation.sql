-- 公開の過去問ページで、答え合わせのあとに解説を出す（未登録は画面側で3問まで）
create or replace function public.quiz_public_explanation(p_exam integer, p_session text, p_no integer)
returns table(explanation text, explanation_source text)
language sql stable security definer set search_path = public as $$
  select q.explanation, q.explanation_source
    from public.quiz_questions q
   where q.exam_no = p_exam and q.session = p_session and q.no = p_no;
$$;
revoke execute on function public.quiz_public_explanation(integer, text, integer) from public;
grant execute on function public.quiz_public_explanation(integer, text, integer) to anon, authenticated;
