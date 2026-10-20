"use client";

import { useState } from "react";
import Link from "next/link";
import type { ColumnMeta } from "@/lib/columns";

// コラムの一覧。分野で絞り込み・言葉で検索できる
export default function ColumnList({ columns }: { columns: ColumnMeta[] }) {
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");
  const cats = Array.from(new Set(columns.map((c) => c.category)));
  const key = q.trim();
  const list = columns.filter((c) => (cat === "all" || c.category === cat) && (!key || c.title.includes(key) || c.description.includes(key)));

  return (
    <div>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <Link href="/columns/muscles" className="rounded-2xl border border-[var(--relight-line)] bg-white p-4 text-sm font-semibold text-gray-900">
          💪 筋の一覧
          <span className="mt-1 block text-xs font-normal text-gray-500">起始・停止・支配神経・作用（213）</span>
        </Link>
        <Link href="/columns/bones" className="rounded-2xl border border-[var(--relight-line)] bg-white p-4 text-sm font-semibold text-gray-900">
          🦴 骨の一覧
          <span className="mt-1 block text-xs font-normal text-gray-500">特徴・関節・付着する筋（64）</span>
        </Link>
      </div>

      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="コラムを検索"
        placeholder="コラムを探す（例: 国試、給料、症例）"
        className="mt-6 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-gray-400"
      />
      <div className="mt-3 flex flex-wrap gap-1.5">
        {["all", ...cats].map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={cat === c}
            onClick={() => setCat(c)}
            className={`rounded-full border px-3 py-1 text-xs ${cat === c ? "border-gray-900 bg-gray-900 text-white" : "border-gray-300 bg-white text-gray-600"}`}
          >
            {c === "all" ? "すべて" : c}
          </button>
        ))}
      </div>
      <p className="mt-3 text-xs text-gray-400">{list.length}件</p>

      <div className="mt-2 space-y-4">
        {list.map((c) => (
          <Link key={c.slug} href={`/columns/${c.slug}`} className="block rounded-2xl border border-gray-100 bg-white p-5 transition hover:border-gray-200">
            <span className="inline-block rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-relight-blue">{c.category}</span>
            <p className="mt-3 text-base font-semibold text-gray-900">{c.title}</p>
            <p className="mt-2 text-sm leading-6 text-gray-500">{c.description}</p>
            <p className="mt-3 text-xs text-gray-400">{c.publishedAt}</p>
          </Link>
        ))}
        {list.length === 0 && <p className="py-8 text-center text-sm text-gray-400">見つかりませんでした。</p>}
      </div>
    </div>
  );
}
