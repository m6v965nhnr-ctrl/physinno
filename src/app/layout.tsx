import type { Metadata, Viewport } from "next";
import "./globals.css";
import AuthGuard from "@/components/AuthGuard";
import BottomNavWrapper from "@/components/BottomNavWrapper";
import Toaster from "@/components/Toaster";

export const metadata: Metadata = {
  title: "Re:light",
  description: "理学療法士をつなぐプラットフォーム",
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
