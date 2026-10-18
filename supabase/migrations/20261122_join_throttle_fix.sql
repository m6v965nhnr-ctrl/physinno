-- 参加コードの総当たり対策の修正: 「見つからない」で例外を出すと、失敗の記録も、取り消されてしまう。
-- 例外にせず、{"error":"not_found"} を返して、記録を残す（10回までで、1時間止める）
create or replace function public.quiz_join_class(p_code text)
returns jsonb
language plpgsql security definer set search_path = ''
as $f$
declare
  v_uid uuid := (select auth.uid());
  c public.quiz_classes%rowtype;
begin
  if v_uid is null or not public.quiz_can_use() then
    raise exception 'not allowed';
  end if;
  delete from public.quiz_join_attempts where user_id = v_uid and at < now() - interval '1 day';
  if (select count(*) from public.quiz_join_attempts where user_id = v_uid and at > now() - interval '1 hour') >= 10 then
    raise exception 'too many attempts';
  end if;
  select * into c from public.quiz_classes
  where join_code = upper(btrim(coalesce(p_code, ''))) and not archived;
  if not found then
    insert into public.quiz_join_attempts (user_id) values (v_uid);
    return jsonb_build_object('error', 'not_found');
  end if;
  if c.teacher_id = v_uid then
    raise exception 'own class';
  end if;
  insert into public.quiz_class_members (class_id, user_id) values (c.id, v_uid) on conflict do nothing;
  return jsonb_build_object('id', c.id, 'name', c.name);
end
$f$;
