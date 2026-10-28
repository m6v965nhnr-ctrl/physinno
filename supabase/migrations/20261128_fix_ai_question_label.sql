-- quiz_assignment_preview が、AI作成の問題にも「第9001回」のような実在しない回数を表示していたのを修正。
-- AI作成の問題は「オリジナル問題」というラベルにする（quiz_teacher_search_questionsの「AI作成」ラベルと同じ考え方）。

create or replace function public.quiz_assignment_preview(p_assignment uuid)
returns jsonb
language plpgsql stable security definer set search_path = ''
as $f$
declare
  a public.quiz_assignments%rowtype;
  v_cls public.quiz_classes%rowtype;
  v_has_answers boolean;
  v_qs jsonb;
begin
  a := public.quiz_own_assignment(p_assignment);
  select * into v_cls from public.quiz_classes where id = a.class_id;
  select exists (select 1 from public.quiz_assignment_answers x where x.assignment_id = a.id) into v_has_answers;

  select coalesce(jsonb_agg(jsonb_build_object(
           'id', q.id,
           'label', case when q.source = 'ai_generated' then 'オリジナル問題' else '第' || q.exam_no || '回 ' || case q.session when 'am' then '午前' else '午後' end || q.no end,
           'unit', q.unit, 'intro', q.intro, 'stem', q.stem, 'choices', q.choices, 'need', q.need,
           'answers', q.answers, 'explanation', q.explanation, 'explanation_source', q.explanation_source,
           'image', q.image, 'choices_in_image', q.choices_in_image
         ) order by t.ord), '[]'::jsonb) into v_qs
  from unnest(a.question_ids) with ordinality as t(qid, ord)
  join public.quiz_questions q on q.id = t.qid;

  return jsonb_build_object(
    'id', a.id, 'class_id', a.class_id, 'class_name', v_cls.name, 'title', a.title, 'status', a.status,
    'due_at', a.due_at, 'has_answers', v_has_answers, 'questions', v_qs
  );
end
$f$;
