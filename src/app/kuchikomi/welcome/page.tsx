import type { Metadata } from "next";
import KuchikomiFrame from "@/components/kuchikomi/KuchikomiFrame";
import KuchikomiWelcome from "@/components/kuchikomi/KuchikomiWelcome";

export const metadata: Metadata = {
  title: { absolute: "登録できました｜リハ職の本音" },
  robots: { index: false, follow: true }, // 操作のページ。検索には出さない
};

export default function Page() {
  return (
    <KuchikomiFrame>
      <KuchikomiWelcome />
    </KuchikomiFrame>
  );
}
