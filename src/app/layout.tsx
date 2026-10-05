import type { Metadata, Viewport } from "next";
import "./globals.css";
import AuthGuard from "@/components/AuthGuard";
import BottomNavWrapper from "@/components/BottomNavWrapper";
import Toaster from "@/components/Toaster";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s｜${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  // ホーム画面に追加したときの見え方（iPhone）
  icons: { apple: "/pwa/icon?size=180" },
  appleWebApp: { capable: true, title: SITE_NAME, statusBarStyle: "default" },
  // Google Search Console の所有権確認（Vercelの環境変数に設定）
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

// ノッチ付き端末で下部ナビが隠れないよう viewport-fit=cover にし、safe-area を各所で考慮する
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="min-h-screen">
        <a href="#main-content" className="skip-link">
          本文へ移動
        </a>

        <div id="main-content" tabIndex={-1} className="outline-none">
          <AuthGuard>{children}</AuthGuard>
        </div>

        <BottomNavWrapper />
        <Toaster />
      </body>
    </html>
  );
}
