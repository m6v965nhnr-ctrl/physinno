import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// 公開ページ（トップ・登録・PT検索とプロフィール）だけを検索対象にし、
// ログインが必要な画面（レビュー投稿・メッセージ等）は除外する
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/$", "/register", "/pts", "/pts/*"],
      disallow: [
        "/login",
        "/home",
        "/posts",
        "/pts/*/review",
        "/mypage",
        "/profile",
        "/messages",
        "/following",
        "/admin",
        "/api",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
