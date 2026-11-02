import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// 公開ページ（トップ・登録・PT検索とプロフィール・病院ページ・コラム・規約）だけを
// 検索対象にし、ログインが必要な画面（レビュー投稿・メッセージ等）は除外する
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: [
        "/$",
        "/register",
        "/pts",
        "/pts/*",
        "/hospitals/*",
        "/jobs",
        "/jobs/*",
        "/columns",
        "/columns/*",
        "/kokushi",
        "/kokushi/*",
        "/schools",
        "/schools/*",
        "/paper-search",
        "/paper-search/*",
        "/certified-pt",
        "/certified-pt/*",
        "/job-hunting",
        "/hospital-areas",
        "/hospital-areas/*",
        "/facility-areas",
        "/facility-areas/*",
        "/evidence-levels",
        "/terms",
        "/privacy",
      ],
      disallow: [
        "/login",
        "/forgot-password",
        "/reset-password",
        "/home",
        "/posts",
        "/pts/*/review",
        "/mypage",
        "/profile",
        "/messages",
        "/following",
        "/admin", "/org", "/scouts",
        "/student",
        "/groups",
        "/notifications",
        "/api",
      ],
    },
    // /sitemap.xml: 病院・クリニック（facility_category='病院・医療機関'）など。
    // /facilities/sitemap/*.xml: それ以外の施設（介護・訪問・障害福祉など、約13万件。5万URL上限のため分割）
    // shortcut: チャンク数0〜3を固定で書いている(facilities/sitemap.tsのMAX_FACILITIES=160,000件まで対応)。
    // 施設が増えてチャンクが5個目(4)以上になったら、ここにも追記する
    sitemap: [`${SITE_URL}/sitemap.xml`, `${SITE_URL}/facilities/sitemap/0.xml`, `${SITE_URL}/facilities/sitemap/1.xml`, `${SITE_URL}/facilities/sitemap/2.xml`, `${SITE_URL}/facilities/sitemap/3.xml`],
  };
}
