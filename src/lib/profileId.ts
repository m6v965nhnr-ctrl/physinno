// /pts/{id} の id は、プロフィールの id でも、ユーザーの id（user_id）でも開けるようにする。
// （フォロー一覧やコメントのアイコンなど、user_id からリンクしている画面があるため）
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function profileIdFilter(id: string): string {
  // uuid の形でない値は、どの行にも一致しない条件にする（PostgREST の or 条件を壊さないため）
  if (!UUID.test(id)) return "id.eq.00000000-0000-0000-0000-000000000000";
  return `id.eq.${id},user_id.eq.${id}`;
}
