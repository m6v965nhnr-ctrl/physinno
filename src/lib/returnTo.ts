// ゲストとして見ていた画面を覚えておき、登録・ログインのあとに戻す。
// 戻り先は、このサイト内のパスだけ（外部サイトへ飛ばされないように検証する）。
const KEY = "relight_return_to";

// 戻り先として許すのは、"/" で始まる、このサイト内のパスだけ
export function safeReturnPath(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const path = raw.trim();
  if (path.length === 0 || path.length > 300) return null;
  if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return null;
  // 認証まわりの画面に戻すと、ぐるぐる回ってしまう
  if (/^\/(login|register|forgot-password|reset-password)(\/|\?|$)/.test(path)) return null;
  return path;
}

export function rememberReturnTo(raw: string | null | undefined) {
  const path = safeReturnPath(raw);
  if (!path) return;
  try {
    sessionStorage.setItem(KEY, path);
  } catch {
    // 保存できない環境では、戻り先なしで進む
  }
}

// 覚えていた戻り先を、取り出して消す（1回だけ使う）
export function takeReturnTo(): string | null {
  try {
    const value = sessionStorage.getItem(KEY);
    sessionStorage.removeItem(KEY);
    return safeReturnPath(value);
  } catch {
    return null;
  }
}

// 「いま見ているページ」への、登録・ログインのリンクに付ける
export function withReturnTo(base: "/register" | "/login", current: string): string {
  const path = safeReturnPath(current);
  return path ? `${base}?next=${encodeURIComponent(path)}` : base;
}
