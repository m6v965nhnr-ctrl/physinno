-- 意見箱（匿名）。ログイン中でも、アカウントとはひも付けない（user_id を保存しない）
create table if not exists public.feedback_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  category text not null default 'other' check (category in ('request', 'problem', 'question', 'other')),
  role text check (role is null or role in ('pt', 'student', 'researcher', 'general', 'other')),
  body text not null check (char_length(btrim(body)) between 3 and 2000),
  -- 返信が必要なときだけ、本人が任意で書く
  contact text check (contact is null or char_length(contact) <= 200),
  status text not null default 'new' check (status in ('new', 'read', 'done')),
  admin_note text check (admin_note is null or char_length(admin_note) <= 1000)
);

alter table public.feedback_messages enable row level security;
revoke all on table public.feedback_messages from public, anon, authenticated;
grant all on table public.feedback_messages to service_role;
-- 直接の読み書きは、誰にもさせない（送信は submit_feedback、閲覧は運営だけの RPC）

create or replace function public.submit_feedback(
  p_body text,
  p_category text default 'other',
  p_role text default null,
  p_contact text default null
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $f$
declare
  v_body text := btrim(coalesce(p_body, ''));
  v_cat text := case when p_category in ('request', 'problem', 'question', 'other') then p_category else 'other' end;
  v_role text := case when p_role in ('pt', 'student', 'researcher', 'general', 'other') then p_role else null end;
  v_contact text := nullif(btrim(coalesce(p_contact, '')), '');
begin
  if char_length(v_body) < 3 or char_length(v_body) > 2000 then
    raise exception '3〜2000文字で入力してください';
  end if;
  if v_contact is not null and char_length(v_contact) > 200 then
    raise exception '連絡先が長すぎます';
  end if;

  -- 荒らし・連投の防止: 全体で、1時間に60件まで。同じ本文の連続投稿は、受け付けない
  if (select count(*) from public.feedback_messages where created_at > now() - interval '1 hour') >= 60 then
    raise exception 'ただいま混み合っています。しばらくしてからお試しください';
  end if;
  if exists (select 1 from public.feedback_messages where body = v_body and created_at > now() - interval '1 day') then
    return true;
  end if;

  insert into public.feedback_messages (category, role, body, contact) values (v_cat, v_role, v_body, v_contact);
  return true;
end
$f$;
revoke execute on function public.submit_feedback(text, text, text, text) from public;
grant execute on function public.submit_feedback(text, text, text, text) to anon, authenticated;

-- 運営用: 一覧と、状態の更新
create or replace function public.admin_list_feedback(p_status text default 'new')
returns table (id uuid, created_at timestamptz, category text, role text, body text, contact text, status text, admin_note text)
language sql
stable
security definer
set search_path = ''
as $f$
  select f.id, f.created_at, f.category, f.role, f.body, f.contact, f.status, f.admin_note
  from public.feedback_messages f
  where exists (select 1 from public.admin_users a where a.user_id = (select auth.uid()))
    and (p_status = 'all' or f.status = p_status)
  order by f.created_at desc
  limit 200;
$f$;
revoke execute on function public.admin_list_feedback(text) from public, anon;
grant execute on function public.admin_list_feedback(text) to authenticated;

create or replace function public.admin_set_feedback(p_id uuid, p_status text, p_note text default null)
returns boolean
language plpgsql
security definer
set search_path = ''
as $f$
begin
  if not exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())) then
    raise exception 'forbidden';
  end if;
  if p_status not in ('new', 'read', 'done') then
    raise exception 'bad status';
  end if;
  update public.feedback_messages set status = p_status, admin_note = p_note where id = p_id;
  return found;
end
$f$;
revoke execute on function public.admin_set_feedback(uuid, text, text) from public, anon;
grant execute on function public.admin_set_feedback(uuid, text, text) to authenticated;
