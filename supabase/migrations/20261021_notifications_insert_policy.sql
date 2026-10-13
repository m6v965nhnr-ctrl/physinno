-- 通知を、他人宛てに自由に作れてしまう問題を直す。
-- 今までの方針は「actor_id が本人」だけを見ていたため、宛先(user_id)と種類(type)を自由に指定できた。
-- ブラウザ（authenticated）から直接作れるのは、次の4つだけにする。
--   follow       … 本人が、その相手をフォローしている行がある
--   endorsement  … 本人が、その相手のスキルに「いいね」している行がある
--   group_created / group_joined … 自分宛て
-- いいね・コメント・回答・卒業などの通知は、これまでどおり SECURITY DEFINER の関数・トリガー経由
-- （notify_post_author / trg_student_answers_notify / graduate_students など。RLSの対象外）。
drop policy if exists notifications_insert_authenticated on public.notifications;

create policy notifications_insert_authenticated
  on public.notifications
  for insert
  to authenticated
  with check (
    (select auth.uid()) = actor_id
    and (
      (type in ('group_created', 'group_joined') and user_id = (select auth.uid()))
      or (
        type = 'follow'
        and post_id is null and message_id is null and question_id is null and group_id is null
        and exists (
          select 1 from public.follows f
          where f.following_user = (select auth.uid()) and f.followed_user = notifications.user_id
        )
      )
      or (
        type = 'endorsement'
        and post_id is null and message_id is null and question_id is null and group_id is null
        and exists (
          select 1 from public.skill_endorsements e
          join public.skills s on s.id = e.skill_id
          where e.endorser_id = (select auth.uid()) and s.user_id = notifications.user_id
        )
      )
    )
  );
