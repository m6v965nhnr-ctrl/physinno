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

// 登録が、どの画面から始まったか（運営の集計用）。パスだけ（クエリ・個人情報は含めない）。
// 優先: ゲストとして見ていた画面（?next=）→ 同じサイト内の、ひとつ前のページ
export function signupFromPath(): string | undefined {
  try {
    const next = safeReturnPath(new URLSearchParams(window.location.search).get("next"));
    if (next) return next.split("?")[0].slice(0, 80);

    if (document.referrer) {
      const ref = new URL(document.referrer);
      if (ref.origin === window.location.origin) {
        const path = safeReturnPath(ref.pathname);
        if (path) return path.slice(0, 80);
      }
    }
  } catch {
    // 取れなければ、記録しない
  }
  return undefined;
}
