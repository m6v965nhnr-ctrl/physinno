-- 病院テーブルの「作成者(created_by)・運営者(claimed_by)」のユーザーIDを、誰からも読めなくする。
-- 勤務先を隠している人が、病院を登録した人として、ID経由で特定されるのを防ぐ。
-- 列の権限で閉じる（RLSの条件・INSERT/UPDATE は、これまでどおり動く）。
-- 注意: 病院テーブルに列を足したら、ここに ALTER で grant select を足すこと（足さないと、読めない）。
revoke select on public.hospitals from anon, authenticated;

grant select (
  id, name, prefecture, city, address, phone, size, created_at, email, website,
  data_source, data_source_note, recruitment_info, departments,
  beds_general, beds_long_term, beds_psychiatric, beds_total
) on public.hospitals to anon, authenticated;
