"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { findOrgans } from "@/lib/organMatch";

const short = (n: string) => n.replace(/\(.*?\)|（.*?）/g, "");

// 問題・解説に出てくる臓器・部位・仕組みを、1タップで確かめる（図つき）
export default function OrganLookup({ text }: { text: string }) {
  const organs = useMemo(() => findOrgans(text), [text]);
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  if (organs.length === 0) return null;
  const d = organs.find((x) => x.slug === openSlug);
  const fig = d?.figures[0];

  return (
    <div className="mt-3 rounded-xl bg-gray-50 p-3">
      <p className="text-xs font-semibold text-gray-700">出てきた臓器・仕組みを確かめる</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {organs.slice(0, 4).map((x) => (
          <button
            key={x.slug}
            type="button"
            aria-pressed={openSlug === x.slug}
            onClick={() => setOpenSlug(openSlug === x.slug ? null : x.slug)}
            className={`rounded-full border px-3 py-1 text-xs ${
              openSlug === x.slug ? "border-teal-600 bg-teal-50 text-teal-800" : "border-gray-300 bg-white text-gray-700"
            }`}
          >
            {short(x.name)}
          </button>
        ))}
      </div>
      {d && (
        <div className="mt-3 rounded-lg border-l-4 border-teal-500 bg-white p-3 text-gray-900">
          <p className="text-sm font-bold">{short(d.name)}</p>
          {fig && (
            <figure className="mt-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={fig.src} alt={fig.alt} loading="lazy" decoding="async" className="w-full rounded-lg border border-gray-100 bg-white" />
              <figcaption className="mt-1 text-[10px] leading-4 text-gray-400">{fig.caption}</figcaption>
            </figure>
          )}
          <p className="mt-2 text-sm leading-7">{d.summary.t}</p>
          {d.location.slice(0, 2).map((c) => (
            <p key={c.t} className="mt-1 text-sm leading-7 text-gray-700">{c.t}</p>
          ))}
          <p className="mt-3 border-t border-gray-100 pt-2 text-xs text-gray-500">
            <Link href={`/columns/organs/${d.slug}`} target="_blank" className="font-semibold text-blue-600 underline">
              {short(d.name)}のくわしい解説（出典つき）→
            </Link>
          </p>
        </div>
      )}
      <p className="mt-2 text-[11px] leading-4 text-gray-400">学習用の要約と模式図です（出典は、くわしい解説のページに載せています）。診断・治療の指示ではありません。</p>
    </div>
  );
}
