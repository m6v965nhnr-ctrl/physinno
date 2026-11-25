"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { findDiseases } from "@/lib/diseaseMatch";
import type { Disease } from "@/content/diseases/types";

// 開いたカードだけを、1枚ずつ読み込む（全部を画面の束に入れない）
const cache = new Map<string, Disease>();

// 「病型の三つ。本文…」のように短い見出しで始まる点は、見出しを太字にして頭に入りやすくする
function PointText({ t }: { t: string }) {
  const i = t.indexOf("。");
  // 文の途中（は・が・読点を含む）は見出しではないので、そのまま出す
  if (i < 0 || i > 14 || i === t.length - 1 || /[はが、,]/.test(t.slice(0, i))) return <span>{t}</span>;
  return (
    <span>
      <span className="font-semibold">{t.slice(0, i + 1)}</span>
      <br />
      {t.slice(i + 1)}
    </span>
  );
}

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
        <div className="mt-3 rounded-lg border-l-4 border-rose-400 bg-white p-3 text-gray-900">
          <p className="text-sm font-bold">
            {d.name.replace(/\(.*?\)/g, "")}
            <span className="ml-2 text-[11px] font-semibold text-rose-700">国試で問われる点</span>
          </p>
          {d.examPoints.length > 0 ? (
            <ol className="mt-2 divide-y divide-gray-100 text-sm leading-7">
              {d.examPoints.map((c, i) => (
                <li key={c.t} className="flex gap-2.5 py-2 first:pt-0 last:pb-0">
                  <span aria-hidden className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-50 text-[11px] font-bold text-rose-700">{i + 1}</span>
                  <PointText t={c.t} />
                </li>
              ))}
            </ol>
          ) : (
            <p className="mt-2 text-sm leading-7">{d.summary.t}</p>
          )}
          <p className="mt-3 border-t border-gray-100 pt-2 text-xs text-gray-500">
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
