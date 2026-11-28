import type { Metadata } from "next";
import KuchikomiFrame from "@/components/kuchikomi/KuchikomiFrame";
import KuchikomiMyPage from "@/components/kuchikomi/KuchikomiMyPage";

export const metadata: Metadata = {
  title: { absolute: "マイページ｜リハ職の本音" },
  robots: { index: false, follow: true }, // 操作のページ。検索には出さない
};

export default function Page() {
  return (
    <KuchikomiFrame>
      <KuchikomiMyPage />
    </KuchikomiFrame>
  );
}
