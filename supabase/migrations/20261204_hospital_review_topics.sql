-- 職場口コミを「分類（教育・給与・業務量など）」ごとに書く・読めるようにする。1つの口コミに、書きたい分類だけ書ける
create table if not exists public.hospital_review_topics (
  id uuid primary key default gen_random_uuid(),
  review_id uuid not null references public.hospital_reviews(id) on delete cascade,
  hospital_id uuid not null references public.hospitals(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  category text not null check (char_length(category) between 1 and 30),
  body text not null check (char_length(body) between 5 and 1000),
  created_at timestamptz not null default now(),
  unique (review_id, category)
);
create index if not exists hospital_review_topics_hospital_idx on public.hospital_review_topics (hospital_id, category);
create index if not exists hospital_review_topics_user_idx on public.hospital_review_topics (user_id);

alter table public.hospital_review_topics enable row level security;
revoke all on public.hospital_review_topics from public, anon, authenticated;
grant select, insert, update, delete on public.hospital_review_topics to authenticated;

create policy hospital_review_topics_select_own on public.hospital_review_topics for select to authenticated using (user_id = (select auth.uid()));
create policy hospital_review_topics_insert_own on public.hospital_review_topics for insert to authenticated
  with check (user_id = (select auth.uid()) and exists (select 1 from public.hospital_reviews r where r.id = hospital_review_topics.review_id and r.user_id = (select auth.uid()) and r.hospital_id = hospital_review_topics.hospital_id));
create policy hospital_review_topics_update_own on public.hospital_review_topics for update to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy hospital_review_topics_delete_own on public.hospital_review_topics for delete to authenticated using (user_id = (select auth.uid()));

-- 一覧は関数から読む（投稿者のIDを返さない）。口コミ本体と同じく、ログインなしでも読める
create or replace function public.get_hospital_review_topics(p_hospital uuid)
returns table(id uuid, review_id uuid, category text, body text, created_at timestamptz, is_mine boolean)
language sql stable security definer set search_path = '' as $f$
  select t.id, t.review_id, t.category, t.body, t.created_at, (t.user_id = (select auth.uid()))
  from public.hospital_review_topics t
  where t.hospital_id = p_hospital and not public.is_blocked_by_me(t.user_id)
  order by t.created_at desc;
$f$;
revoke all on function public.get_hospital_review_topics(uuid) from public;
grant execute on function public.get_hospital_review_topics(uuid) to anon, authenticated;
