import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

// 「ホーム画面に追加」したときの名前・アイコン・起動画面
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME}（リライト）`,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    lang: "ja",
    start_url: "/home",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#45d0c2",
    icons: [
      { src: "/pwa/icon?size=192", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/pwa/icon?size=512", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/pwa/icon?size=512&maskable=1", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
