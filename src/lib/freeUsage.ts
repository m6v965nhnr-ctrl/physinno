// 登録なし（ゲスト）の無料利用の回数。直近24時間に5回まで。最初の1回から24時間たつと、また使える（古い順に、戻っていく）。
// この端末のブラウザに、使った時刻を保存するだけの簡易な仕組み。保存を消せば、回数は戻る。
//  shortcut: 端末ごとの数え方。厳密にするなら、サーバー（IPや端末ID）で数える。外部サイトへの負担は、サーバー側の回数制限で、別に守っている
export const FREE_LIMIT = 5;
const WINDOW_MS = 24 * 60 * 60 * 1000;

const storageKey = (feature: string) => `relight:free-usage:${feature}`;

function read(feature: string): number[] {
  try {
    const raw = window.localStorage.getItem(storageKey(feature));
    const list = raw ? (JSON.parse(raw) as unknown) : [];
    const now = Date.now();
    return Array.isArray(list) ? list.filter((t): t is number => typeof t === "number" && now - t < WINDOW_MS) : [];
  } catch {
    return [];
  }
}

export type FreeUsage = { used: number; left: number; resetAt: number | null };

export function freeUsage(feature: string): FreeUsage {
  const list = read(feature);
  const used = list.length;
  // 上限に達しているとき、いちばん古い記録から24時間たつと、1回ぶん戻る
  const resetAt = used >= FREE_LIMIT ? Math.min(...list) + WINDOW_MS : null;
  return { used, left: Math.max(0, FREE_LIMIT - used), resetAt };
}

export function recordFreeUse(feature: string) {
  try {
    window.localStorage.setItem(storageKey(feature), JSON.stringify([...read(feature), Date.now()]));
  } catch {
    // 保存できない環境では、数えられない（制限なしになる）
  }
}

export function waitText(resetAt: number): string {
  const min = Math.max(1, Math.ceil((resetAt - Date.now()) / 60000));
  const h = Math.floor(min / 60);
  return h > 0 ? `${h}時間${min % 60}分` : `${min}分`;
}
