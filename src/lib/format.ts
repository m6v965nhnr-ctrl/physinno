// 表示名まわりの共通処理。
// full_name が未設定のときのフォールバック名を一箇所にまとめ、
// 「◯◯ PT」という敬称付き表示と組み合わせても重複しないようにする。

export const DEFAULT_PT_NAME = "名前未設定のPT";

// 一覧・メッセージなど、PTであることが前提の画面でそのまま表示する名前
export function ptName(fullName: string | null | undefined) {
  return fullName?.trim() || DEFAULT_PT_NAME;
}

// 投稿・コメントなど、名前の後ろに「PT」という敬称を付けて表示する箇所用。
// 未設定のときは DEFAULT_PT_NAME がすでに「PT」を含むため、敬称は付け直さない。
export function ptNameWithTitle(fullName: string | null | undefined) {
  const name = fullName?.trim();
  return name ? `${name} PT` : DEFAULT_PT_NAME;
}
