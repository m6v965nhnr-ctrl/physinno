-- 新しい投稿（施設の投稿・職場の質問と回答・口コミの分類コメント）も、通報できるようにする。運営は、通報の画面から削除できる。
-- あわせて、求人・応援コメントも、通報から削除できるようにする（以前は、削除を押しても、何も消えていなかった）
alter table public.reports drop constraint if exists reports_target_type_check;
alter table public.reports add constraint reports_target_type_check check (target_type = any (array['post','comment','message','group_message','hospital_review','internship_review','student_question','student_answer','exam_note','quiz_question','clinical_idea','training_method','profile_comment','job_posting','scout','org_post','hospital_question','hospital_answer','hospital_review_topic']));

create or replace function public.admin_list_reports(p_status text default 'open')
returns table(id uuid, target_type text, target_id uuid, reason text, detail text, status text, admin_note text, created_at timestamptz, reporter_email text, snippet text, link_path text)
language sql stable security definer set search_path = '' as $f$
  select
    r.id, r.target_type, r.target_id, r.reason, r.detail, r.status, r.admin_note, r.created_at,
    u.email,
    left(case r.target_type
      when 'post' then (select coalesce(nullif(p.title, ''), '') || ' ' || coalesce(p.content, '') from public.posts p where p.id = r.target_id)
      when 'comment' then (select c.content from public.comments c where c.id = r.target_id)
      when 'message' then (select m.content from public.messages m where m.id = r.target_id)
      when 'group_message' then (select g.content from public.group_messages g where g.id = r.target_id)
      when 'hospital_review' then (select h.comment from public.hospital_reviews h where h.id = r.target_id)
      when 'internship_review' then (select i.comment from public.internship_reviews i where i.id = r.target_id)
      when 'student_question' then (select sq.title || ' ' || sq.body from public.student_questions sq where sq.id = r.target_id)
      when 'student_answer' then (select sa.body from public.student_answers sa where sa.id = r.target_id)
      when 'quiz_question' then (select '第' || qq.exam_no || '回 ' || case qq.session when 'am' then '午前' else '午後' end || qq.no || ' ' || qq.stem from public.quiz_questions qq where qq.id = r.target_id)
      when 'clinical_idea' then (select ci.title || ' ' || ci.method from public.clinical_ideas ci where ci.id = r.target_id)
      when 'training_method' then (select tm.title || ' ' || tm.method from public.training_methods tm where tm.id = r.target_id)
      when 'exam_note' then (select coalesce(n.tendency, '') || ' ' || coalesce(n.recalled, '') || case when n.file_path is not null then ' [添付ファイルあり: ' || coalesce(n.file_name, '') || ']' else '' end from public.exam_notes n where n.id = r.target_id)
      when 'org_post' then (select op.body || case when jsonb_array_length(op.media) > 0 then ' [写真・動画 ' || jsonb_array_length(op.media) || '件]' else '' end from public.org_posts op where op.id = r.target_id)
      when 'hospital_question' then (select hq.body from public.hospital_questions hq where hq.id = r.target_id)
      when 'hospital_answer' then (select ha.body from public.hospital_answers ha where ha.id = r.target_id)
      when 'hospital_review_topic' then (select t.category || ' ' || t.body from public.hospital_review_topics t where t.id = r.target_id)
      when 'job_posting' then (select j.title || ' ' || coalesce(j.description, '') from public.job_postings j where j.id = r.target_id)
      when 'profile_comment' then (select pc.body from public.profile_comments pc where pc.id = r.target_id)
    end, 300),
    case r.target_type
      when 'post' then '/posts/' || r.target_id::text
      when 'comment' then (select '/posts/' || c.post_id::text from public.comments c where c.id = r.target_id)
      when 'hospital_review' then (select '/hospitals/' || h.hospital_id::text from public.hospital_reviews h where h.id = r.target_id)
      when 'internship_review' then (select '/hospitals/' || i.hospital_id::text from public.internship_reviews i where i.id = r.target_id)
      when 'student_question' then '/student/questions/' || r.target_id::text
      when 'student_answer' then (select '/student/questions/' || sa.question_id::text from public.student_answers sa where sa.id = r.target_id)
      when 'quiz_question' then '/student/quiz'
      when 'clinical_idea' then (select '/ideas/' || ci.topic_slug from public.clinical_ideas ci where ci.id = r.target_id)
      when 'training_method' then (select '/training?region=' || tm.region from public.training_methods tm where tm.id = r.target_id)
      when 'exam_note' then (select '/student/exams/' || n.subject_id::text from public.exam_notes n where n.id = r.target_id)
      when 'org_post' then (select '/hospitals/' || o.hospital_id::text from public.org_posts op join public.organizations o on o.id = op.organization_id where op.id = r.target_id and o.hospital_id is not null)
      when 'hospital_question' then (select '/hospitals/' || hq.hospital_id::text from public.hospital_questions hq where hq.id = r.target_id)
      when 'hospital_answer' then (select '/hospitals/' || hq.hospital_id::text from public.hospital_answers ha join public.hospital_questions hq on hq.id = ha.question_id where ha.id = r.target_id)
      when 'hospital_review_topic' then (select '/hospitals/' || t.hospital_id::text from public.hospital_review_topics t where t.id = r.target_id)
      when 'job_posting' then '/jobs/' || r.target_id::text
      else null
    end
  from public.reports r
  left join public.users u on u.id = r.reporter_id
  where exists (select 1 from public.admin_users a where a.user_id = (select auth.uid()))
    and (p_status = 'all' or r.status = p_status)
  order by r.created_at desc;
$f$;

create or replace function public.admin_resolve_report(p_id uuid, p_action text, p_note text default null)
returns text language plpgsql security definer set search_path = '' as $f$
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
      when 'org_post' then delete from public.org_posts where id = r.target_id;
      when 'hospital_question' then delete from public.hospital_questions where id = r.target_id;
      when 'hospital_answer' then delete from public.hospital_answers where id = r.target_id;
      when 'hospital_review_topic' then delete from public.hospital_review_topics where id = r.target_id;
      when 'job_posting' then delete from public.job_postings where id = r.target_id;
      when 'profile_comment' then delete from public.profile_comments where id = r.target_id;
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
$f$;

-- 施設の投稿の写真・動画は、投稿を消す前に、運営が、ファイル本体も消せるようにする
create or replace function public.admin_org_post_media(p_post uuid) returns jsonb
language sql stable security definer set search_path = '' as $f$
  select coalesce((select op.media from public.org_posts op where op.id = p_post), '[]'::jsonb)
  where exists (select 1 from public.admin_users a where a.user_id = (select auth.uid()));
$f$;
revoke all on function public.admin_org_post_media(uuid) from public, anon;
grant execute on function public.admin_org_post_media(uuid) to authenticated;

create policy org_media_admin_delete on storage.objects for delete to authenticated
  using (bucket_id = 'org-media' and exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())));
