-- 先生用: 課題の結果を、学生・問題・分野で切り替えて見るための、学生×問題の正誤
--  - いまクラスにいる学生の、この課題の解答だけ（これまでと同じ範囲）
--  - 分野は、問題に付いている単元（quiz_questions.unit）
create or replace function public.quiz_assignment_matrix(p_assignment uuid)
returns jsonb
language plpgsql stable security definer set search_path = ''
as $f$
declare
  a public.quiz_assignments%rowtype;
  v_students jsonb;
  v_questions jsonb;
begin
  a := public.quiz_own_assignment(p_assignment);

  select coalesce(jsonb_agg(jsonb_build_object('name', s.name, 'cells', s.cells) order by s.name), '[]'::jsonb) into v_students
  from (
    select coalesce((select p.full_name from public.pt_profiles p where p.user_id = m.user_id limit 1), '（名前未設定）') as name,
           coalesce((
             select jsonb_object_agg(x.question_id::text, x.correct)
             from public.quiz_assignment_answers x
             where x.assignment_id = a.id and x.user_id = m.user_id
           ), '{}'::jsonb) as cells
    from public.quiz_class_members m
    where m.class_id = a.class_id
  ) s;

  select coalesce(jsonb_agg(jsonb_build_object('id', q.id, 'unit', q.unit) order by t.ord), '[]'::jsonb) into v_questions
  from unnest(a.question_ids) with ordinality as t(qid, ord)
  join public.quiz_questions q on q.id = t.qid;

  return jsonb_build_object('students', v_students, 'questions', v_questions);
end
$f$;
revoke execute on function public.quiz_assignment_matrix(uuid) from public, anon;
grant execute on function public.quiz_assignment_matrix(uuid) to authenticated;
