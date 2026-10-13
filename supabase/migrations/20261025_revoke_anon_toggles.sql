-- ログインが必要な「いいね・保存」の切り替え関数を、ログイン前（anon）からは呼べないようにする。
-- 関数の中でもログインを確認しているが、入口でも閉じておく（念のための二重の守り）。
revoke execute on function public.toggle_editorial_idea_like(text, text) from public, anon;
grant execute on function public.toggle_editorial_idea_like(text, text) to authenticated;

revoke execute on function public.toggle_training_reaction(uuid, text) from public, anon;
grant execute on function public.toggle_training_reaction(uuid, text) to authenticated;
