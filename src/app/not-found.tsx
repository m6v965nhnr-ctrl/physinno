import type { Metadata } from "next";
import { HomeLink, MessageScreen } from "@/components/states";

export const metadata: Metadata = { title: "ページが見つかりません" };

export default function NotFound() {
  return (
    <MessageScreen
      title="ページが見つかりません"
      body="アドレスが違うか、ページが削除されたかもしれません。"
    >
      <HomeLink />
      <HomeLink href="/" label="トップページへ" />
    </MessageScreen>
  );
}
