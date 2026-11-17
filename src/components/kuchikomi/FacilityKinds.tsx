"use client";

import { useRef } from "react";
import { FACILITY_KINDS, KIND_EVENT } from "@/lib/kuchikomi";

// 「探せる施設の種類（15）▾」。押すと一覧が開き、種類を選ぶと、その種類で、下の検索欄が、すぐ検索する
export default function FacilityKinds() {
  const ref = useRef<HTMLDetailsElement>(null);

  function pick(k: (typeof FACILITY_KINDS)[number]) {
    window.dispatchEvent(new CustomEvent(KIND_EVENT, { detail: { category: k.category, type: k.type } }));
    if (ref.current) ref.current.open = false;
    document.getElementById("facility-search")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <details ref={ref} className="group relative">
      <summary className="inline-flex cursor-pointer list-none items-center gap-1 rounded-full border border-gray-900/25 bg-white/50 px-2.5 py-1 text-[11px] font-bold text-gray-900 [&::-webkit-details-marker]:hidden">
        探せる施設の種類（{FACILITY_KINDS.length}）
        <span aria-hidden="true" className="transition group-open:rotate-180">▾</span>
      </summary>
      <div className="absolute left-0 top-full z-20 mt-1.5 w-[min(22rem,calc(100vw-4.5rem))] rounded-2xl border border-gray-200 bg-white p-3 shadow-lg">
        <p className="text-[11px] font-semibold text-gray-600">タップすると、その種類で探します</p>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {FACILITY_KINDS.map((k) => (
            <li key={k.label}>
              <button type="button" onClick={() => pick(k)} className="rounded-full border border-gray-300 bg-white px-2.5 py-1 text-[11px] font-semibold text-gray-800 hover:border-gray-500">
                {k.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}
