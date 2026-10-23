// 病院テーブルで、画面・検索から読んでよい列。
// created_by / claimed_by（病院を登録・運営している人のユーザーID）は、ログインの有無に関わらず、読めない（DBの権限で閉じている）。
// 病院テーブルに列を足したときは、この一覧と、DBの列の権限（grant select）の両方に足すこと。
export const HOSPITAL_COLUMNS =
  "id, facility_category, facility_type, name, prefecture, city, address, phone, size, created_at, email, website, data_source, data_source_note, recruitment_info, departments, beds_general, beds_long_term, beds_psychiatric, beds_total, website_status";
