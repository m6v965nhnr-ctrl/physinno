import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// 公開ページ（トップ・登録）だけを検索対象にし、ログイン後の画面は除外する
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/$", "/register"],
      disallow: [
        "/login",
        "/home",
        "/posts",
        "/pts",
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
