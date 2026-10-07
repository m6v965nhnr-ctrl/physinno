"use client";

import Link from "next/link";
import IdeasBrowser from "@/components/IdeasBrowser";

export default function IdeasPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] px-5 py-8 pb-28">
      <div className="mx-auto max-w-2xl">
        <Link href="/pts?mode=ideas" className="text-sm text-gray-400 hover:text-gray-700">
          ← 検索
        </Link>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-gray-900">臨床アイデア</h1>
        <div className="mt-3">
          <IdeasBrowser />
        </div>
      </div>
    </main>
  );
}
