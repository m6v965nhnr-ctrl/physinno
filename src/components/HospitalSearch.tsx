"use client";

import { useState } from "react";
import Link from "next/link";
import {
  HospitalGroup,
  WORKPLACE_SIZE_LABEL,
  WorkplaceSize,
  listPtsByWorkplace,
  searchHospitals,
} from "@/lib/hospitals";
import type { PtProfile } from "@/lib/types";
import { ptNameWithTitle } from "@/lib/format";

// 「病院」専用のテーブルは無く、PTが登録している勤務先を集約して表示している。
// 都道府県・規模（PTが任意で設定）で絞り込める。病院名は自由入力の集約の
// ため、表記ゆれで同じ病院が別件として出ることがある旨を案内に明記する。
export default function HospitalSearch() {
  const [prefecture, setPrefecture] = useState("");
  const [size, setSize] = useState<WorkplaceSize | "">("");
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState(false);
  const [hospitals, setHospitals] = useState<HospitalGroup[]>([]);

  const [selected, setSelected] = useState<HospitalGroup | null>(null);
  const [pts, setPts] = useState<PtProfile[]>([]);
  const [loadingPts, setLoadingPts] = useState(false);

  async function handleSearch() {
    setSearching(true);
    setSearched(true);
    setSelected(null);

    const results = await searchHospitals({
      prefecture: prefecture.trim() || undefined,
      size: size || undefined,
    });

    setHospitals(results);
    setSearching(false);
  }

  async function handleSelect(h: HospitalGroup) {
    setSelected(h);
    setLoadingPts(true);
    setPts(await listPtsByWorkplace(h.workplace));
    setLoadingPts(false);
  }

  if (selected) {
    return (
      <div>
        <button
          onClick={() => setSelected(null)}
          className="text-sm text-gray-400 hover:text-gray-700"
        >
          ← 病院一覧に戻る
        </button>

        <h2 className="mt-3 text-lg font-semibold text-gray-900">
          {selected.workplace}
        </h2>
        <p className="mt-1 text-xs text-gray-500">
          {[selected.prefecture, selected.city].filter(Boolean).join(" ")}
          {selected.size && (
            <>
              {" ・ "}
              {WORKPLACE_SIZE_LABEL[selected.size as WorkplaceSize] ?? selected.size}
            </>
          )}
        </p>

        <div className="mt-4 space-y-3">
          {loadingPts && (
            <p className="text-sm text-gray-400">読み込み中…</p>
          )}

          {!loadingPts && pts.length === 0 && (
            <p className="text-sm text-gray-400">在籍PTが見つかりませんでした</p>
          )}

          {pts.map((pt) => (
            <Link
              key={pt.id}
              href={`/pts/${pt.id}`}
              className="block rounded-2xl border border-gray-100 p-4 hover:border-gray-300"
            >
              <p className="text-sm font-semibold text-gray-900">
                {ptNameWithTitle(pt.full_name)}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                ⭐ {pt.rating || 0}（{pt.review_count || 0}件） ・ {pt.specialty}
              </p>
            </Link>
          ))}
        </div>
      </div>
    );
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
        PTが登録している勤務先をもとに集計しています。規模はPTが任意で設定するため、未設定の病院は規模での絞り込みに出てきません。
      </p>

      {searched && (
        <div className="mt-6 space-y-3">
          {!searching && hospitals.length === 0 && (
            <p className="text-sm text-gray-400">見つかりませんでした</p>
          )}

          {hospitals.map((h) => (
            <button
              key={h.workplace}
              onClick={() => handleSelect(h)}
              className="block w-full rounded-2xl border border-gray-100 p-4 text-left hover:border-gray-300"
            >
              <p className="text-sm font-semibold text-gray-900">{h.workplace}</p>
              <p className="mt-1 text-xs text-gray-500">
                {[h.prefecture, h.city].filter(Boolean).join(" ") || "地域未設定"}
                {h.size && (
                  <>
                    {" ・ "}
                    {WORKPLACE_SIZE_LABEL[h.size as WorkplaceSize] ?? h.size}
                  </>
                )}
                {" ・ 在籍PT "}
                {h.ptCount}人
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
