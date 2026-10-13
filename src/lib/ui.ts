// 検索まわり（論文・病院・PT）の、入力欄・ボタン・絞り込みチップの共通の見た目。
// 色は globals.css のトークンを使う。ここを直せば、3つの検索が、一緒に変わる。
export const INPUT_CLASS =
  "w-full rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-gray-900 disabled:bg-gray-50 disabled:text-gray-400";

export const PRIMARY_BUTTON_CLASS =
  "w-full rounded-full bg-black py-2.5 text-sm font-semibold text-white disabled:opacity-50";

// 絞り込みのチップ（押すと、選択／解除）
export function chipClass(on: boolean) {
  return `rounded-full border px-3 py-1.5 text-xs font-medium transition ${
    on ? "border-black bg-black text-white" : "border-gray-300 bg-white text-gray-700"
  }`;
}
