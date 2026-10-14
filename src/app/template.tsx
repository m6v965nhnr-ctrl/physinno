// 画面を移動するたびに、中身がやわらかく現れる（LINEのように、メニューの切り替えがなめらかに見える）
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-in">{children}</div>;
}
