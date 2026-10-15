// 下のメニューのアイコン。どれも、同じ大きさ・同じ線の太さにそろえる（文字や絵文字は、大きさがバラバラになるため使わない）
const base = {
  width: 26,
  height: 26,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

const PATHS: Record<string, React.ReactNode> = {
  // マイページ（人）
  "/mypage": (
    <>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M4.5 20c.9-3.6 3.9-5.6 7.5-5.6s6.6 2 7.5 5.6" />
    </>
  ),
  // 検索（虫めがね）
  "/pts": (
    <>
      <circle cx="10.5" cy="10.5" r="6.2" />
      <path d="M15.2 15.2 20 20" />
    </>
  ),
  // 勉強（開いた本）
  "/study": (
    <>
      <path d="M3.5 5.8c2.8-.9 5.5-.6 8.5 1v12.7c-3-1.6-5.7-1.9-8.5-1z" />
      <path d="M20.5 5.8c-2.8-.9-5.5-.6-8.5 1v12.7c3-1.6 5.7-1.9 8.5-1z" />
    </>
  ),
  // 投稿（＋）
  "/posts/create": (
    <>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </>
  ),
  // メッセージ（ふきだし）
  "/messages": <path d="M4 5.5h16v10.5H9.5L5.5 20v-4H4z" />,
  // ホーム（家）
  "/home": (
    <>
      <path d="M4 11.2 12 4l8 7.2" />
      <path d="M6 10v10h12V10" />
    </>
  ),
  // 通知（ベル）
  "/notifications": (
    <>
      <path d="M6 16.5V11a6 6 0 1 1 12 0v5.5l1.5 1.5h-15z" />
      <path d="M10 20.5a2.2 2.2 0 0 0 4 0" />
    </>
  ),
  // ゲスト: 見てみる（目）
  "/guest": (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="2.8" />
    </>
  ),
  // ゲスト: 過去問（書類）
  "/kokushi": (
    <>
      <path d="M6 3.5h8.5L19 8v12.5H6z" />
      <path d="M14 3.5V8h5" />
      <path d="M9 13h7M9 16.5h7" />
    </>
  ),
  // ゲスト: 登録・ログイン（人）
  "/register": (
    <>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M4.5 20c.9-3.6 3.9-5.6 7.5-5.6s6.6 2 7.5 5.6" />
    </>
  ),
};

export default function NavIcon({ href }: { href: string }) {
  const base0 = href.split("?")[0];
  return <svg {...base}>{PATHS[base0] ?? PATHS["/home"]}</svg>;
}
