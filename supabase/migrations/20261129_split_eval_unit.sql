-- 「理学療法評価学（ROM・MMT・検査測定）」を、ROM・MMT・検査測定の3つに分ける。
-- eval_basic は、検査測定として残す（保存したURLや、先生が作ったテストの単元指定が、そのまま使えるように）
update public.quiz_units set sort = sort + 2 where sort >= 13;
insert into public.quiz_units (id, name, field, sort) values
  ('eval_rom', '理学療法評価学（ROM：関節可動域）', '理学療法評価', 12),
  ('eval_mmt', '理学療法評価学（MMT：徒手筋力テスト）', '理学療法評価', 13)
on conflict (id) do nothing;
update public.quiz_units set name = '理学療法評価学（検査測定）', sort = 14 where id = 'eval_basic';

-- 関節可動域測定法の問題
update public.quiz_questions q set unit = 'eval_rom'
where q.unit = 'eval_basic'
  and (q.exam_no::text || q.session || q.no::text) in (
    '56am3','56am29','56am72','56pm3','56pm28','57am4','57am26','57pm3','57pm26','57pm73',
    '58am28','58am31','58pm16','59am7','59am27','59pm1','60am5','60am19','60pm5','60pm28','61am1','61pm1');

-- 徒手筋力テスト（Daniels・MRC sum score・筋力評価）の問題
update public.quiz_questions q set unit = 'eval_mmt'
where q.unit = 'eval_basic'
  and (q.exam_no::text || q.session || q.no::text) in (
    '57am5','57pm4','57pm27','58am1','58pm1','58pm27','59am8','59pm2','59pm42',
    '60am1','60am9','60am37','60pm1','61am2','61am42','61pm2');
