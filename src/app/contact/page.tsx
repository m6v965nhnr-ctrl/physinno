import { redirect } from "next/navigation";

// 「運営へのメッセージ」は、意見箱（/feedback）にまとめた。これまでのリンクが切れないよう、転送する
export default function ContactPage() {
  redirect("/feedback");
}
