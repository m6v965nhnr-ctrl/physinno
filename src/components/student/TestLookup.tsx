"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { findTests } from "@/lib/testMatch";

// 問題・解説に出てくる検査・評価法・基準値を、1タップで確かめる
export default function TestLookup({ text }: { text: string }) {
  const tests = useMemo(() => findTests(text), [text]);
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  if (tests.length === 0) return null;
  const d = tests.find((x) => x.slug === openSlug);

  return (
    <div className="mt-3 rounded-xl bg-gray-50 p-3">
      <p className="text-xs font-semibold text-gray-700">出てきた検査・基準値を確かめる</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {tests.slice(0, 10).map((x) => (
          <button
            key={x.slug}
            type="button"
            aria-pressed={openSlug === x.slug}
            onClick={() => setOpenSlug(openSlug === x.slug ? null : x.slug)}
            className={`rounded-full border px-3 py-1 text-xs ${
              openSlug === x.slug ? "border-teal-600 bg-teal-50 text-teal-800" : "border-gray-300 bg-white text-gray-700"
            }`}
          >
            {x.name.replace(/\(.*?\)/g, "")}
          </button>
        ))}
      </div>
      {d && (
        <div className="mt-3 space-y-2.5 rounded-lg bg-white p-3 text-sm leading-6 text-gray-900">
          {d.rows.slice(0, 6).map((r) => (
            <div key={r.item}>
              <p className="text-xs font-semibold text-gray-500">{r.item}</p>
              <p>{r.value}</p>
              {r.conflict && <p className="mt-0.5 text-[11px] leading-5 text-amber-700">国試の記載と現行の資料で、違いがあります（くわしい解説を参照）</p>}
            </div>
          ))}
          {d.rows.length > 6 && <p className="text-xs text-gray-500">ほか {d.rows.length - 6} 項目</p>}
          <p className="text-xs text-gray-500">
            <Link href={`/columns/tests/${d.slug}`} target="_blank" className="font-semibold text-blue-600 underline">
              {d.name.replace(/\(.*?\)/g, "")}のくわしい解説（出典つき）→
            </Link>
          </p>
        </div>
      )}
      <p className="mt-2 text-[11px] leading-4 text-gray-400">学習用の要約です（出典は、くわしい解説のページに載せています）。診断・治療の指示ではありません。</p>
    </div>
  );
}
