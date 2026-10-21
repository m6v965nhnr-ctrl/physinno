import type { Metadata } from "next";

// 立場を選ぶだけの入口。検索結果には出さない（トップと中身が重なるため）
export const metadata: Metadata = {
  title: "ログインなしで、中を見てみる",
  robots: { index: false, follow: true },
  alternates: { canonical: "/guest" },
};

export default function GuestLayout({ children }: { children: React.ReactNode }) {
  return children;
}
