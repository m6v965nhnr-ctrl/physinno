-- 筋肉・部位別の訓練レパートリー（本番には Supabase MCP で適用済み）
-- training_methods / training_method_reactions / list_training_methods / training_method_counts /
-- toggle_training_reaction / my_received_likes（訓練のいいねも獲得いいねに含める）
-- reports_target_type_check に 'training_method' を追加 / admin_list_reports に訓練を追加

-- ▼ まだ適用していないもの: Supabase の SQL Editor で実行してください
-- 運営画面の「削除」で、通報された訓練を消せるようにする
CREATE OR REPLACE FUNCTION public.admin_resolve_report(p_id uuid, p_action text, p_note text DEFAULT NULL::text)
 RETURNS text LANGUAGE plpgsql SECURITY DEFINER SET search_path TO ''
AS $function$
declare
  r public.reports%rowtype;
begin
  if not exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())) then
    raise exception 'forbidden';
  end if;
  select * into r from public.reports where id = p_id;
  if not found then raise exception 'not found'; end if;

  if p_action = 'delete' then
    case r.target_type
      when 'post' then
        delete from public.comments where post_id = r.target_id;
        delete from public.likes where post_id = r.target_id;
        delete from public.notifications where post_id = r.target_id;
        delete from public.posts where id = r.target_id;
      when 'comment' then delete from public.comments where id = r.target_id;
      when 'message' then delete from public.messages where id = r.target_id;
      when 'group_message' then delete from public.group_messages where id = r.target_id;
      when 'hospital_review' then delete from public.hospital_reviews where id = r.target_id;
      when 'internship_review' then delete from public.internship_reviews where id = r.target_id;
      when 'student_question' then
        delete from public.notifications where question_id = r.target_id;
        delete from public.student_questions where id = r.target_id;
      when 'student_answer' then delete from public.student_answers where id = r.target_id;
      when 'exam_note' then delete from public.exam_notes where id = r.target_id;
      when 'clinical_idea' then delete from public.clinical_ideas where id = r.target_id;
      when 'training_method' then delete from public.training_methods where id = r.target_id;
      when 'quiz_question' then null;
      else null;
    end case;
    update public.reports set status = 'resolved', admin_note = p_note, resolved_at = now() where id = p_id;
  elsif p_action = 'resolve' then
    update public.reports set status = 'resolved', admin_note = p_note, resolved_at = now() where id = p_id;
  elsif p_action = 'dismiss' then
    update public.reports set status = 'dismissed', admin_note = p_note, resolved_at = now() where id = p_id;
  else
    raise exception 'bad action';
  end if;
  return 'ok';
end
$function$;
