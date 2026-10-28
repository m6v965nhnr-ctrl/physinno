-- 直前の移行(20261128_quiz_ai_questions.sql)で、quiz_teacher_search_questions に p_source を足した際、
-- 引数の数が変わったため「create or replace」が新しいオーバーロードとして追加され、
-- 古い5引数版が残ってしまった（PostgRESTがどちらを呼ぶか決められず、呼び出しが300 Multiple Choicesで失敗する不具合）。
-- 古いシグネチャを削除する。

drop function if exists public.quiz_teacher_search_questions(text, integer, text, text, integer);
