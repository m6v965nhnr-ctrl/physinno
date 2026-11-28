import type { Metadata } from "next";
import KuchikomiFrame from "@/components/kuchikomi/KuchikomiFrame";
import DeleteAccountForm from "@/components/DeleteAccountForm";

export const metadata: Metadata = {
  title: { absolute: "退会｜リハ職の本音" },
  robots: { index: false, follow: true }, // 操作のページ。検索には出さない
};

export default function Page() {
  return (
    <KuchikomiFrame>
      <DeleteAccountForm site="kuchikomi" />
    </KuchikomiFrame>
  );
}
