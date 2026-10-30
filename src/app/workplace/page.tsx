"use client";

import { Suspense } from "react";
import Link from "next/link";
import HospitalSearch from "@/components/HospitalSearch";

// PTのボトムナビ「職場」。以前は検索タブの中にあった職場口コミを、ここへ移した
export default function WorkplacePage() {
  return (
    <Suspense
      fallback={<main className="mx-auto max-w-2xl px-5 py-10" />}
    >
      <WorkplacePageInner />
    </Suspense>
  );
}

function WorkplacePageInner() {
  return (
    <main className="min-h-screen bg-white px-6 py-8 pb-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold mb-1">職場口コミ</h1>
        <div className="mb-3 flex flex-wrap gap-2 text-xs">
          <Link href="/jobs" className="rounded-full border border-gray-300 bg-white px-4 py-1.5 font-medium">求人を探す</Link>
          <Link href="/scouts" className="rounded-full border border-gray-300 bg-white px-4 py-1.5 font-medium">スカウト</Link>
          <Link href="/org" className="rounded-full border border-gray-300 bg-white px-4 py-1.5 font-medium">組織の方：求人の管理</Link>
        </div>
        <HospitalSearch />
      </div>
    </main>
  );
}
