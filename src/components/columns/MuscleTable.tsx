"use client";

import { useState } from "react";
import { MUSCLES, REGIONS, type MuscleRegion } from "@/content/muscles/data";

// 筋の一覧。部位で絞り込み・名前や神経で検索できる
export default function MuscleTable() {
  const [region, setRegion] = useState<MuscleRegion | "all">("all");
  const [q, setQ] = useState("");
  const key = q.trim();
  const list = MUSCLES.filter(
    (m) =>
      (region === "all" || m.region === region) &&
      (!key || [m.name, m.nerve, m.origin, m.insertion, m.action, ...m.aliases].some((t) => t.includes(key))),
  );

  return (
    <div>
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="筋の名前・神経・作用で探す（例: 大腿神経、外旋）"
        className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-gray-400"
      />
      <div className="mt-3 flex flex-wrap gap-1.5">
        {(["all", ...REGIONS] as const).map((r) => (
          <button
            key={r}
            type="button"
            aria-pressed={region === r}
            onClick={() => setRegion(r)}
            className={`rounded-full border px-3 py-1 text-xs ${
              region === r ? "border-gray-900 bg-gray-900 text-white" : "border-gray-300 bg-white text-gray-600"
            }`}
          >
            {r === "all" ? "すべて" : r}
          </button>
        ))}
      </div>
      <p className="mt-3 text-xs text-gray-400">{list.length}件</p>

      <ul className="mt-2 space-y-3">
        {list.map((m) => (
          <li key={m.id} id={m.id} className="scroll-mt-4 rounded-2xl border border-gray-100 bg-white p-4">
            <div className="flex items-baseline justify-between gap-2">
              <h2 className="text-base font-semibold text-gray-900">{m.name}</h2>
              <span className="shrink-0 text-[11px] text-gray-400">{m.region}</span>
            </div>
            <dl className="mt-2 space-y-1.5 text-sm leading-6 text-gray-800">
              {(
                [
                  ["起始", m.origin],
                  ["停止", m.insertion],
                  ["支配神経", m.nerve],
                  ["作用", m.action],
                ] as const
              ).map(([k, v]) => (
                <div key={k} className="grid grid-cols-[4.5rem_1fr] gap-2">
                  <dt className="text-xs font-semibold text-gray-500">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
      {list.length === 0 && <p className="mt-6 text-center text-sm text-gray-400">見つかりませんでした。</p>}
    </div>
  );
}
