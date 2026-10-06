-- 勤務先を、ほかの人に公開しない設定
--  - pt_profiles.hide_workplace が true のとき、勤務先・病院ID・所属部署・勤務先の規模は、
--    公開のプロフィール(pt_profiles)には保存せず、本人だけが読める pt_private に移す(トリガーで自動)
--  - 公開のプロフィールは、誰でも読める表なので、画面で隠すのではなく、値そのものを置かない
--  - 公開に戻すと、元の値を pt_profiles に戻す

alter table public.pt_profiles add column if not exists hide_workplace boolean not null default false;

alter table public.pt_private
  add column if not exists hidden_workplace text,
  add column if not exists hidden_hospital_id uuid,
  add column if not exists hidden_department text,
  add column if not exists hidden_workplace_size text;

create or replace function public.pt_profiles_hide_workplace()
returns trigger
language plpgsql security definer set search_path = ''
as $f$
declare
  s public.pt_private%rowtype;
  v_w text;
  v_h uuid;
  v_d text;
  v_s text;
begin
  if new.user_id is null then
    return new;
  end if;

  select * into s from public.pt_private where user_id = new.user_id;

  if new.hide_workplace then
    -- 値が変わっていない更新(他の列だけを更新したときなど)は、保管してある値を残す
    if tg_op = 'UPDATE' and old.hide_workplace then
      v_w := case when new.workplace is not distinct from old.workplace then s.hidden_workplace else nullif(new.workplace, '') end;
      v_h := case when new.hospital_id is not distinct from old.hospital_id then s.hidden_hospital_id else new.hospital_id end;
      v_d := case when new.department is not distinct from old.department then s.hidden_department else nullif(new.department, '') end;
      v_s := case when new.workplace_size is not distinct from old.workplace_size then s.hidden_workplace_size else nullif(new.workplace_size, '') end;
    else
      v_w := nullif(new.workplace, '');
      v_h := new.hospital_id;
      v_d := nullif(new.department, '');
      v_s := nullif(new.workplace_size, '');
    end if;

    insert into public.pt_private (user_id, hidden_workplace, hidden_hospital_id, hidden_department, hidden_workplace_size)
    values (new.user_id, v_w, v_h, v_d, v_s)
    on conflict (user_id) do update
      set hidden_workplace = excluded.hidden_workplace,
          hidden_hospital_id = excluded.hidden_hospital_id,
          hidden_department = excluded.hidden_department,
          hidden_workplace_size = excluded.hidden_workplace_size,
          updated_at = now();

    new.workplace := null;
    new.hospital_id := null;
    new.department := null;
    new.workplace_size := null;
  elsif tg_op = 'UPDATE' and old.hide_workplace then
    -- 公開に戻す: 送られてこなかった値は、保管してあった値で戻す
    new.workplace := coalesce(nullif(new.workplace, ''), s.hidden_workplace);
    new.hospital_id := coalesce(new.hospital_id, s.hidden_hospital_id);
    new.department := coalesce(nullif(new.department, ''), s.hidden_department);
    new.workplace_size := coalesce(nullif(new.workplace_size, ''), s.hidden_workplace_size);

    update public.pt_private
      set hidden_workplace = null, hidden_hospital_id = null, hidden_department = null,
          hidden_workplace_size = null, updated_at = now()
    where user_id = new.user_id;
  end if;

  return new;
end
$f$;

drop trigger if exists pt_profiles_hide_workplace on public.pt_profiles;
create trigger pt_profiles_hide_workplace
  before insert or update on public.pt_profiles
  for each row execute function public.pt_profiles_hide_workplace();
