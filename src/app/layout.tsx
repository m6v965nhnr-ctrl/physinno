import type { Metadata } from "next";
import "./globals.css";
import AuthGuard from "@/components/AuthGuard";
import BottomNavWrapper from "@/components/BottomNavWrapper";

export const metadata: Metadata = {
  title: "Physinno",
  description: "理学療法士をつなぐプラットフォーム",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="min-h-screen">
        <AuthGuard>
          {children}
        </AuthGuard>

        <BottomNavWrapper />
      </body>
    </html>
  );
}