"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { findDiseases } from "@/lib/diseaseMatch";
import type { Disease } from "@/content/diseases/types";

// 開いたカードだけを、1枚ずつ読み込む（全部を画面の束に入れない）
const cache = new Map<string, Disease>();

// 問題・解説に出てくる疾患を、1タップで確かめる（国試で問われる点だけを出す。周辺の情報は出さない）
export default function DiseaseLookup({ text }: { text: string }) {
  const diseases = useMemo(() => findDiseases(text), [text]);
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [card, setCard] = useState<Disease | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    setFailed(false);
    if (!openSlug) { setCard(null); return; }
    const hit = cache.get(openSlug);
    if (hit) { setCard(hit); return; }
    setCard(null);
    let live = true;
    fetch(`/diseases/${openSlug}.json`)
      .then((r) => (r.ok ? (r.json() as Promise<Disease>) : Promise.reject()))
      .then((c) => { cache.set(openSlug, c); if (live) setCard(c); })
      .catch(() => { if (live) setFailed(true); });
    return () => { live = false; };
  }, [openSlug]);
  if (diseases.length === 0) return null;
  const d = card && card.slug === openSlug ? card : null;

  return (
    <div className="mt-3 rounded-xl bg-gray-50 p-3">
      <p className="text-xs font-semibold text-gray-700">出てきた疾患を確かめる</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {diseases.slice(0, 10).map((x) => (
          <button
            key={x.slug}
            type="button"
            aria-pressed={openSlug === x.slug}
            onClick={() => { setOpenSlug(openSlug === x.slug ? null : x.slug); }}
            className={`rounded-full border px-3 py-1 text-xs ${
              openSlug === x.slug ? "border-rose-500 bg-rose-50 text-rose-800" : "border-gray-300 bg-white text-gray-700"
            }`}
          >
            {x.name.replace(/\(.*?\)/g, "")}
          </button>
        ))}
      </div>
      {openSlug && !d && (
        <p className="mt-3 text-xs text-gray-500">{failed ? "読み込めませんでした。電波のよいところで、もう一度タップしてください。" : "読み込み中…"}</p>
      )}
      {d && (
        <div className="mt-3 space-y-3 rounded-lg bg-white p-3 text-sm leading-6 text-gray-900">
          <p className="text-xs font-semibold text-gray-500">国試で問われる点</p>
          {d.examPoints.length > 0 ? (
            <ul className="list-disc space-y-1.5 pl-5">
              {d.examPoints.map((c) => (
                <li key={c.t}>{c.t}</li>
              ))}
            </ul>
          ) : (
            <p>{d.summary.t}</p>
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
