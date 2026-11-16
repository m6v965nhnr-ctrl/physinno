"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { listReviewedHospitals, type ReviewedHospital } from "@/lib/kuchikomi";

// 職場の検索画面の、検索ボタンの下に出す「いま口コミのある職場」。検索する前でも、口コミを読み始められる
export default function ReviewedHospitals() {
  const [rows, setRows] = useState<ReviewedHospital[] | null>(null);

  useEffect(() => {
    let alive = true;
    listReviewedHospitals(12).then((r) => {
      if (alive) setRows(r);
    });
    return () => {
      alive = false;
    };
  }, []);

  if (rows === null) return null;

  return (
    <section aria-label="口コミのある職場" className="mt-6">
      <h2 className="text-sm font-semibold text-gray-500">口コミのある職場</h2>
      {rows.length === 0 ? (
        <p className="mt-2 text-sm leading-6 text-gray-500">まだ口コミはありません。職場を検索して、最初の口コミを書いてみませんか。</p>
      ) : (
        <ul className="mt-2 space-y-2">
          {rows.map((h) => (
            <li key={h.id}>
              <Link href={`/hospitals/${h.id}?tab=reviews`} className="block rounded-2xl border border-gray-100 p-4 hover:border-gray-300">
                <p className="text-sm font-semibold text-gray-900">{h.name}</p>
                <p className="mt-1 text-xs text-gray-500">{[h.prefecture, h.city].filter(Boolean).join(" ") || "地域未設定"}</p>
                <p className="mt-1.5">
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs text-emerald-700">
                    口コミ {h.review_count}件{h.avg_overall != null ? ` ・ 平均 ${h.avg_overall.toFixed(1)} / 10` : ""}
                  </span>
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
