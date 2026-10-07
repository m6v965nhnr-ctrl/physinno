"use client";

import Link from "next/link";
import PtSearchPanel from "@/components/PtSearchPanel";

// ホームの「PT検索」。名前・地域・専門分野で、理学療法士を探す
export default function HomePtSearchPage() {
  return (
    <main className="search-large min-h-screen bg-white px-6 py-8 pb-24">
      <div className="mx-auto max-w-3xl">
        <Link href="/home" className="text-sm text-gray-400 hover:text-gray-700">
          ← ホーム
        </Link>
        <h1 className="mb-3 mt-3 text-3xl font-semibold">PTを探す</h1>
        <PtSearchPanel showTitle={false} />
      </div>
    </main>
  );
}
