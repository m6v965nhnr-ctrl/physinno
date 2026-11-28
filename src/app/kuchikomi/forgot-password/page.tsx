import type { Metadata } from "next";
import KuchikomiFrame from "@/components/kuchikomi/KuchikomiFrame";
import ForgotPasswordForm from "@/components/ForgotPasswordForm";

export const metadata: Metadata = {
  title: { absolute: "パスワードの再設定｜リハ職の本音" },
  robots: { index: false, follow: true }, // 操作のページ。検索には出さない
};

export default function Page() {
  return (
    <KuchikomiFrame>
      <ForgotPasswordForm loginHref="/kuchikomi/login" />
    </KuchikomiFrame>
  );
}
