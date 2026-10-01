"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Hospital,
  WORKPLACE_SIZE_LABEL,
  WorkplaceSize,
  searchHospitals,
} from "@/lib/hospitals";

// 病院はPTが作成・編集できる施設ページ。検索結果から /hospitals/{id} に
// 遷移すると、フォローや職場環境の口コミを見られる。
export default function HospitalSearch() {
  const [prefecture, setPrefecture] = useState("");
  const [size, setSize] = useState<WorkplaceSize | "">("");
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState(false);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);

  async function handleSearch() {
    setSearching(true);
    setSearched(true);

    const results = await searchHospitals({
      prefecture: prefecture.trim() || undefined,
      size: size || undefined,
    });

    setHospitals(results);
    setSearching(false);
  }

  return (
    <div>
      <div className="space-y-3">
        <input
          value={prefecture}
          onChange={(e) => setPrefecture(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          placeholder="地域（都道府県）"
          className="w-full rounded-full border px-5 py-3"
          aria-label="地域（都道府県）"
        />

        <select
          value={size}
          onChange={(e) => setSize(e.target.value as WorkplaceSize | "")}
          className="w-full rounded-full border px-5 py-3"
          aria-label="病院の規模"
        >
          <option value="">規模を指定しない</option>
          {(Object.keys(WORKPLACE_SIZE_LABEL) as WorkplaceSize[]).map((key) => (
            <option key={key} value={key}>
              {WORKPLACE_SIZE_LABEL[key]}
            </option>
          ))}
        </select>

        <button
          onClick={handleSearch}
          disabled={searching}
          className="w-full rounded-full bg-black py-3 text-white disabled:opacity-50"
        >
          {searching ? "検索中…" : "🔍 検索"}
        </button>
      </div>

      <p className="mt-3 text-xs text-gray-400">
        PTが登録した病院が対象です。規模はPTが任意で設定するため、未設定の病院は規模での絞り込みに出てきません。
      </p>

      {searched && (
        <div className="mt-6 space-y-3">
          {!searching && hospitals.length === 0 && (
            <p className="text-sm text-gray-400">見つかりませんでした</p>
          )}

          {hospitals.map((h) => (
            <Link
              key={h.id}
              href={`/hospitals/${h.id}`}
              className="block rounded-2xl border border-gray-100 p-4 hover:border-gray-300"
            >
              <p className="text-sm font-semibold text-gray-900">{h.name}</p>
              <p className="mt-1 text-xs text-gray-500">
                {[h.prefecture, h.city].filter(Boolean).join(" ") || "地域未設定"}
                {h.size && (
                  <>
                    {" ・ "}
                    {WORKPLACE_SIZE_LABEL[h.size as WorkplaceSize] ?? h.size}
                  </>
                )}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
