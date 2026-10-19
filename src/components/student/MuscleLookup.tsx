"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { findMuscles } from "@/lib/muscleMatch";

// 問題・解説に出てくる筋を、1タップで確かめる（起始・停止・支配神経・作用）
export default function MuscleLookup({ text }: { text: string }) {
  const muscles = useMemo(() => findMuscles(text), [text]);
  const [openId, setOpenId] = useState<string | null>(null);
  if (muscles.length === 0) return null;

  const open = muscles.find((m) => m.id === openId);
  const rows: [string, string][] = open
    ? [
        ["起始", open.origin],
        ["停止", open.insertion],
        ["支配神経", open.nerve],
        ["作用", open.action],
      ]
    : [];

  return (
    <div className="mt-3 rounded-xl bg-gray-50 p-3">
      <p className="text-xs font-semibold text-gray-700">出てきた筋を確かめる</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {muscles.slice(0, 12).map((m) => (
          <button
            key={m.id}
            type="button"
            aria-pressed={openId === m.id}
            onClick={() => setOpenId(openId === m.id ? null : m.id)}
            className={`rounded-full border px-3 py-1 text-xs ${
              openId === m.id ? "border-emerald-500 bg-emerald-50 text-emerald-800" : "border-gray-300 bg-white text-gray-700"
            }`}
          >
            {m.name}
          </button>
        ))}
      </div>
      {open && (
        <dl className="mt-3 space-y-2 rounded-lg bg-white p-3 text-xs leading-5 text-gray-700">
          {rows.map(([k, v]) => (
            <div key={k}>
              <dt className="font-semibold text-gray-500">{k}</dt>
              <dd className="text-sm leading-6 text-gray-900">{v}</dd>
            </div>
          ))}
          <p className="text-[11px] leading-4 text-gray-400">
            編集部がまとめた要約です。髄節などは教科書で確認してください。
            <Link href={`/columns/muscles#${open.id}`} className="ml-1 text-blue-600 underline">
              筋の一覧を見る
            </Link>
          </p>
        </dl>
      )}
    </div>
  );
}
