import type { Metadata } from "next";
import KuchikomiFrame from "@/components/kuchikomi/KuchikomiFrame";
import KuchikomiRegister from "@/components/kuchikomi/KuchikomiRegister";

export const metadata: Metadata = {
  title: { absolute: "無料会員登録｜リハ職の本音" },
  robots: { index: false, follow: true }, // 操作のページ。検索には出さない
};

export default function Page() {
  return (
    <KuchikomiFrame>
      <KuchikomiRegister />
    </KuchikomiFrame>
  );
}
