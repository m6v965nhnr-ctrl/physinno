import { redirect } from "next/navigation";

// 旧プロフィール編集ページ。現在は /mypage/edit に統合されています。
export default function LegacyProfileEditPage() {
  redirect("/mypage/edit");
}
