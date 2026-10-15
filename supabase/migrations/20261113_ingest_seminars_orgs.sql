-- 学会・団体のサイトから集めた研修・学会（source = org-<団体コード>）も、取り込めるようにする
CREATE OR REPLACE FUNCTION public.ingest_seminars(p_token text, p_rows jsonb)
 RETURNS integer
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
declare
  n integer;
begin
  if not exists (
    select 1 from public.seminar_ingest_secret
    where hash = encode(extensions.digest(coalesce(p_token, ''), 'sha256'), 'hex')
  ) then
    raise exception 'unauthorized';
  end if;

  if jsonb_array_length(p_rows) > 1000 then
    raise exception 'too many rows';
  end if;

  insert into public.seminars (
    id, source, source_label, title, organizer, kind, start_date, end_date, date_text,
    format, prefecture, region, fee_text, fee_yen, is_free, fields, summary, url, seen_at
  )
  select
    r.id, r.source, r.source_label, r.title, r.organizer, r.kind, r.start_date, r.end_date, r.date_text,
    r.format, r.prefecture, r.region, r.fee_text, r.fee_yen, coalesce(r.is_free, false),
    coalesce(r.fields, '{}'), r.summary, r.url, now()
  from jsonb_to_recordset(p_rows) as r(
    id text, source text, source_label text, title text, organizer text, kind text,
    start_date date, end_date date, date_text text, format text, prefecture text, region text,
    fee_text text, fee_yen integer, is_free boolean, fields text[], summary text, url text
  )
  where r.source = 'jpta' or r.source like 'pref-%' or r.source = 'ugoita' or r.source like 'org-%'
  on conflict (id) do update set
    title = excluded.title, organizer = excluded.organizer, kind = excluded.kind,
    start_date = excluded.start_date, end_date = excluded.end_date, date_text = excluded.date_text,
    format = excluded.format, prefecture = excluded.prefecture, region = excluded.region,
    fee_text = excluded.fee_text, fee_yen = excluded.fee_yen, is_free = excluded.is_free,
    fields = excluded.fields, summary = excluded.summary, url = excluded.url, seen_at = now();

  get diagnostics n = row_count;
  return n;
end;
$function$;
