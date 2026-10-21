import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "意見箱（登録なし・匿名）",
  description: "Re:lightへの、困っていること・ほしい機能を、登録なし・匿名で送れます。みんなで作っていくためのご意見をお待ちしています。",
  alternates: { canonical: "/feedback" },
};

export default function FeedbackLayout({ children }: { children: React.ReactNode }) {
  return children;
}
