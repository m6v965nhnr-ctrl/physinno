-- seed-demo-data.sql で入れたデモ用データを、すべて消す。実際の利用者のデータには触れない（demo-student-XX@example.com と、デモ用の課題3件だけ）。
do $$
declare v_ids uuid[]; v_class uuid := 'a29bcb23-5fe6-4f6b-b486-3a1d7bea3b67';
begin
  select array_agg(id) into v_ids from auth.users where email like 'demo-student-%@example.com';
  delete from public.quiz_assignment_answers where user_id = any(coalesce(v_ids, '{}'));
  delete from public.quiz_assignments where class_id = v_class and title in ('運動学・解剖の確認（10問）', '評価学・神経の基礎（10問）', '第60回 午前から（10問）');
  delete from public.quiz_progress where user_id = any(coalesce(v_ids, '{}'));
  delete from public.quiz_class_members where user_id = any(coalesce(v_ids, '{}'));
  delete from public.student_profiles where user_id = any(coalesce(v_ids, '{}'));
  delete from public.pt_profiles where user_id = any(coalesce(v_ids, '{}'));
  delete from public.users where id = any(coalesce(v_ids, '{}'));
  delete from auth.users where id = any(coalesce(v_ids, '{}'));
  update public.quiz_classes set name = 'テストクラス（先生の動作確認）' where id = v_class;
end $$;
