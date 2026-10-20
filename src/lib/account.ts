import { supabase } from "@/lib/supabase";

export type AccountType = "pt" | "general" | "student" | "teacher";

export const ACCOUNT_TYPE_LABEL: Record<AccountType, string> = {
  pt: "PT",
  general: "一般",
  student: "学生",
  teacher: "先生",
};

function isAccountType(v: unknown): v is AccountType {
  return v === "pt" || v === "general" || v === "student" || v === "teacher";
}

// 先生のアカウント（大学・専門学校の先生）が使える画面。それ以外のPT向けの画面は、先生の画面へ戻す
export const TEACHER_HOME = "/student/quiz/teacher";

export function isTeacherPath(pathname: string) {
  return pathname === TEACHER_HOME || pathname.startsWith(`${TEACHER_HOME}/`);
}

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
  "/study",
  "/ideas",
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
const PUBLIC_COLUMN_PATH = /^\/columns(\/(muscles|bones)\/[^/]+|\/[^/]+)?$/;

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

  return isAccountType(type) ? type : null;
}

// 通信の失敗と、「本当に未設定」を区別して返す（失敗のときに、設定済みの人を未設定扱いにしないため）
export async function getMyAccountTypeChecked(
  userId: string
): Promise<{ ok: true; type: AccountType | null } | { ok: false }> {
  const { data, error } = await supabase
    .from("users")
    .select("account_type")
    .eq("id", userId)
    .maybeSingle();

  if (error) return { ok: false };

  const type = data?.account_type;

  return { ok: true, type: isAccountType(type) ? type : null };
}

// 卒業予定年を過ぎた学生を、その場で PT に切り替える(毎日の自動処理とは別に、ログイン時にも実行する)。
// 戻り値: 切り替え後(または現在)のアカウント種類
export async function syncMyAccountType(): Promise<AccountType | null> {
  const { data, error } = await supabase.rpc("sync_my_account_type");
  if (error) return null;

  return isAccountType(data) ? data : null;
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

// 理学療法士養成校（大学）の、国家試験の合格状況ページ（SEO用。誰でも読める）
const PUBLIC_SCHOOL_PATH = /^\/schools(\/.*)?$/;

export function isPublicSchoolPath(pathname: string) {
  return PUBLIC_SCHOOL_PATH.test(pathname);
}

// 論文検索の入口サイト（/paper-search 以下）は、誰でも使える（検索流入用）
const PUBLIC_PAPER_SITE_PATH = /^\/(paper-search|certified-pt|hospital-areas|job-hunting)(\/.*)?$/;

export function isPublicPaperSitePath(pathname: string) {
  return PUBLIC_PAPER_SITE_PATH.test(pathname);
}

// ログインなしで「見て、触れる」ページ（ゲスト閲覧）。投稿・コメント・メッセージ・保存などの操作は、ページ側で登録を案内する。
// /ideas/new・/ideas/ai・/ideas/saved は、ログインが必要なので含めない
const PUBLIC_GUEST_PATH = /^\/(home|home\/pt-search|posts|ideas|ideas\/(?!new$|ai$|saved$)[^/]+|training)$/;

export function isPublicGuestPath(pathname: string) {
  return PUBLIC_GUEST_PATH.test(pathname);
}


// ログインした直後（とホーム画面のアプリを開いたとき）に最初に開く画面。
// PT・一般の方は、いちばん使われる「検索」、学生はマイページ。種類が未設定なら、設定の画面
export function landingPathFor(accountType: AccountType | null | undefined): string {
  // 種類が未設定の人は、先に設定の画面へ
  if (!accountType) return "/setup";
  if (accountType === "teacher") return TEACHER_HOME;
  return accountType === "student" ? "/mypage" : "/pts";
}
