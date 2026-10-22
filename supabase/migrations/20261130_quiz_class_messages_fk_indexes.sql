-- 外部キーに索引がなく、クラスチャットの返信・投稿者の検索が、件数が増えると遅くなるため
create index if not exists quiz_class_messages_reply_to_idx on public.quiz_class_messages (reply_to);
create index if not exists quiz_class_messages_user_id_idx on public.quiz_class_messages (user_id);
