import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";

const TITLE = "理学療法士の求人｜病院・介護・訪問・企業まで、条件で探す";
const DESCRIPTION = "運営が確認した病院・クリニック・介護施設・訪問看護・医療系企業などの、理学療法士の求人を、都道府県・雇用形態・施設の種類で探せます。給与などの未掲載の項目は、そのまま「未掲載」と表示します。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/jobs" },
  openGraph: { title: `${TITLE}｜${SITE_NAME}`, description: DESCRIPTION, url: "/jobs" },
  twitter: { card: "summary_large_image", title: `${TITLE}｜${SITE_NAME}`, description: DESCRIPTION },
};

export default function JobsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
