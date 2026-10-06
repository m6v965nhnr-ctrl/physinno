import { supabase } from "@/lib/supabase";

export type AccountType = "pt" | "general" | "student";

export const ACCOUNT_TYPE_LABEL: Record<AccountType, string> = {
  pt: "PT",
  general: "一般",
  student: "学生",
};

// PTと同じ画面・機能を使えるアカウント(PT・学生)。一般の方だけが対象外
export function isPtLike(type: AccountType | null) {
  return type === "pt" || type === "student";
}

// 一般の方が開けないページ（PT同士のコミュニティ機能）
export const PT_ONLY_PATH_PREFIXES = [
  "/home",
  "/posts",
  "/groups",
  "/profile/edit",
  "/mypage/edit",
  "/mypage/achievements",
  "/student",
];

export function isPtOnlyPath(pathname: string) {
  return PT_ONLY_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

// ログインなしで見られるPT検索・プロフィールページ（DBのRLSもanonの閲覧を許可済み）。
// /pts/{id}/review のように、閲覧以外の操作を伴うページは対象外にする。
const PUBLIC_PT_PATH = /^\/pts(\/[^/]+(\/portfolio)?)?$/;

export function isPublicPtPath(pathname: string) {
  return PUBLIC_PT_PATH.test(pathname);
}

// 投稿（症例・実績）の個別ページもログインなしで見られるようにする。
// シェアされたリンクを開いた人がログイン壁で内容を見られない状態だと、
// 「投稿→シェア→新規登録」という広がり方がそもそも成立しないため。
// 一覧(/posts)・投稿作成(/posts/create)・編集(/posts/{id}/edit)は対象外。
const PUBLIC_POST_PATH = /^\/posts\/(?!create$)[^/]+$/;

export function isPublicPostPath(pathname: string) {
  return PUBLIC_POST_PATH.test(pathname);
}

// SEO向けのコラム記事（一覧・個別ページとも誰でも読める）
const PUBLIC_COLUMN_PATH = /^\/columns(\/[^/]+)?$/;

export function isPublicColumnPath(pathname: string) {
  return PUBLIC_COLUMN_PATH.test(pathname);
}

// 病院ページもログインなしで見られるようにする（患者さんが病院を探す導線のため）。
// フォロー・口コミの投稿はページ内でログインを促す。
const PUBLIC_HOSPITAL_PATH = /^\/hospitals(\/[^/]+)?$/;

export function isPublicHospitalPath(pathname: string) {
  return PUBLIC_HOSPITAL_PATH.test(pathname);
}

// ログイン中ユーザーのアカウント種類を取得（未設定なら null）
export async function getMyAccountType(
  userId: string
): Promise<AccountType | null> {
  const { data } = await supabase
    .from("users")
    .select("account_type")
    .eq("id", userId)
    .maybeSingle();

  const type = data?.account_type;

  return type === "pt" || type === "general" || type === "student" ? type : null;
}

// 卒業予定年を過ぎた学生を、その場で PT に切り替える(毎日の自動処理とは別に、ログイン時にも実行する)。
// 戻り値: 切り替え後(または現在)のアカウント種類
export async function syncMyAccountType(): Promise<AccountType | null> {
  const { data, error } = await supabase.rpc("sync_my_account_type");
  if (error) return null;

  return data === "pt" || data === "general" || data === "student" ? data : null;
}

// 本人のアカウント種類を変更（DB関数 set_my_account_type）
export async function setMyAccountType(type: "pt" | "general") {
  const { error } = await supabase.rpc("set_my_account_type", {
    p_type: type,
  });

  return error ? error.message : null;
}

// 国家試験の過去問ページ（/kokushi 以下）は誰でも読める（学生が検索から見つけられるように）
const PUBLIC_KOKUSHI_PATH = /^\/kokushi(\/.*)?$/;

export function isPublicKokushiPath(pathname: string) {
  return PUBLIC_KOKUSHI_PATH.test(pathname);
}
