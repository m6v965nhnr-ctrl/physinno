import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PTを探す",
  description:
    "全国の理学療法士（PT）を、地域や専門分野から検索できます。経験年数・保有資格・利用者のレビューを見比べて、自分に合った理学療法士を見つけられます。",
  alternates: { canonical: "/pts" },
  openGraph: {
    title: "PTを探す｜Re:light",
    description:
      "全国の理学療法士（PT）を、地域や専門分野から検索できます。経験年数・保有資格・利用者のレビューを見比べられます。",
  },
};

export default function PtsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
