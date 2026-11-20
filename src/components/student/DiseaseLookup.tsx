"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { findDiseases } from "@/lib/diseaseMatch";
import type { Disease } from "@/content/diseases/types";

const tabs = (d: Disease) =>
  [
    { key: "sym", label: "症状・所見", items: d.symptoms.map((c) => c.t) },
    { key: "dx", label: "診断・検査", items: d.diagnosis.map((c) => c.t) },
    { key: "cls", label: "分類・重症度", items: d.classification.map((c) => c.t) },
    { key: "tx", label: "治療・リハ", items: [...d.treatment, ...d.pt].map((c) => c.t) },
    { key: "risk", label: "リスク管理", items: d.risk.map((c) => c.t) },
    { key: "exam", label: "国試で問われる点", items: d.examPoints.map((c) => c.t) },
  ].filter((t) => t.items.length > 0);

// 問題・解説に出てくる疾患を、1タップで確かめる（どんな病気か・主な症状・国試で問われる点）
export default function DiseaseLookup({ text }: { text: string }) {
  const diseases = useMemo(() => findDiseases(text), [text]);
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [tab, setTab] = useState<string | null>(null);
  if (diseases.length === 0) return null;
  const d = diseases.find((x) => x.slug === openSlug);

  return (
    <div className="mt-3 rounded-xl bg-gray-50 p-3">
      <p className="text-xs font-semibold text-gray-700">出てきた疾患を確かめる</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {diseases.slice(0, 10).map((x) => (
          <button
            key={x.slug}
            type="button"
            aria-pressed={openSlug === x.slug}
            onClick={() => { setOpenSlug(openSlug === x.slug ? null : x.slug); setTab(null); }}
            className={`rounded-full border px-3 py-1 text-xs ${
              openSlug === x.slug ? "border-rose-500 bg-rose-50 text-rose-800" : "border-gray-300 bg-white text-gray-700"
            }`}
          >
            {x.name.replace(/\(.*?\)/g, "")}
          </button>
        ))}
      </div>
      {d && (
        <div className="mt-3 space-y-3 rounded-lg bg-white p-3 text-sm leading-6 text-gray-900">
          <p>{d.summary.t}</p>
          <div className="flex flex-wrap gap-1.5" role="tablist">
            {tabs(d).map((t) => (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={tab === t.key}
                onClick={() => setTab(tab === t.key ? null : t.key)}
                className={`rounded-md border px-2.5 py-1 text-xs font-semibold ${tab === t.key ? "border-gray-800 bg-gray-800 text-white" : "border-gray-300 text-gray-700"}`}
              >
                {t.label}
              </button>
            ))}
          </div>
          {tabs(d).find((t) => t.key === tab) && (
            <ul className="list-disc space-y-1.5 pl-5">
              {tabs(d).find((t) => t.key === tab)!.items.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          )}
          <p className="text-xs text-gray-500">
            <Link href={`/columns/diseases/${d.slug}`} target="_blank" className="font-semibold text-blue-600 underline">
              {d.name.replace(/\(.*?\)/g, "")}のくわしい解説（出典つき）→
            </Link>
          </p>
        </div>
      )}
      <p className="mt-2 text-[11px] leading-4 text-gray-400">学習用の要約です（出典は、くわしい解説のページに載せています）。診断・治療の指示ではありません。</p>
    </div>
  );
}
