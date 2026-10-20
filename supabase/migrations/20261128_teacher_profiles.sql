-- 先生の登録情報（学校名・学部名・学科名・アイコン）。PTのプロフィール（pt_profiles）とは分ける
-- あわせて、クラスのチャット・得点の名前は、pt_profiles に無いとき users.full_name を使う

create table if not exists public.teacher_profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  school_name text not null default '' check (char_length(school_name) <= 100),
  faculty text not null default '' check (char_length(faculty) <= 100),
  department text not null default '' check (char_length(department) <= 100),
  icon_url text,
  updated_at timestamptz not null default now()
);
alter table public.teacher_profiles enable row level security;
create policy teacher_profiles_select_own on public.teacher_profiles for select to authenticated using (user_id = (select auth.uid()));
create policy teacher_profiles_insert_own on public.teacher_profiles for insert to authenticated with check (user_id = (select auth.uid()));
create policy teacher_profiles_update_own on public.teacher_profiles for update to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
grant select, insert, update on public.teacher_profiles to authenticated;

create or replace function public.quiz_class_messages_list(p_class uuid)
returns jsonb
language plpgsql stable security definer set search_path = ''
as $f$
declare
  v_role text := public.quiz_class_role(p_class);
  v_uid uuid := (select auth.uid());
begin
  if v_role is null then
    return null;
  end if;
  return coalesce((
    select jsonb_agg(x order by x.created_at)
    from (
      select m.id, m.kind, m.body, m.created_at, m.reply_to, m.anonymous,
             (m.user_id = v_uid) as mine,
             (m.user_id = (select c.teacher_id from public.quiz_classes c where c.id = p_class)) as from_teacher,
             case
               when m.anonymous and m.user_id <> v_uid then null
               else coalesce(
                 (select p.full_name from public.pt_profiles p where p.user_id = m.user_id limit 1),
                 (select u.full_name from public.users u where u.id = m.user_id),
                 '（名前未設定）')
             end as author
      from public.quiz_class_messages m
      where m.class_id = p_class
      order by m.created_at desc
      limit 300
    ) x
  ), '[]'::jsonb);
end
$f$;
revoke execute on function public.quiz_class_messages_list(uuid) from public, anon;
grant execute on function public.quiz_class_messages_list(uuid) to authenticated;
