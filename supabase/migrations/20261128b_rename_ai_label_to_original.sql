-- AI作成の問題のラベルを「AI作成」→「オリジナル問題」に統一（quiz_assignment_previewと表記を合わせる）

create or replace function public.quiz_teacher_search_questions(
  p_unit text default null, p_exam integer default null, p_difficulty text default 'any',
  p_keyword text default null, p_limit integer default 30, p_source text default 'any'
)
returns table (id uuid, label text, unit text, stem text, source text)
language sql stable security definer set search_path = ''
as $f$
  select q.id,
         case when q.source = 'ai_generated' then 'オリジナル問題' else '第' || q.exam_no || '回 ' || case q.session when 'am' then '午前' else '午後' end || q.no end,
         q.unit,
         left(q.stem, 80),
         q.source
  from public.quiz_pool(nullif(p_unit, ''), p_exam, coalesce(nullif(p_difficulty, ''), 'any')) as pid(id)
  join public.quiz_questions q on q.id = pid.id
  where public.quiz_is_teacher()
    and (nullif(btrim(coalesce(p_keyword, '')), '') is null
         or q.stem ilike '%' || replace(replace(btrim(p_keyword), '%', '\%'), '_', '\_') || '%'
         or q.choices::text ilike '%' || replace(replace(btrim(p_keyword), '%', '\%'), '_', '\_') || '%')
    and (coalesce(nullif(p_source, ''), 'any') = 'any' or q.source = p_source)
  order by q.exam_no desc, q.session, q.no
  limit least(greatest(coalesce(p_limit, 30), 1), 100);
$f$;
