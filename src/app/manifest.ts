import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

// 「ホーム画面に追加」したときの名前・アイコン・起動画面
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME}（リライト）`,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    lang: "ja",
    start_url: "/start",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      { src: "/icons/relight-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/relight-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      // ロゴは中央の約70%に収まっているので、そのまま丸型などに切り取られても欠けない
      { src: "/icons/relight-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
