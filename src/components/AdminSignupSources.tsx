"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Row = { utm_source: string; utm_medium: string | null; utm_campaign: string | null; signups: number };

// 運営用: 最近の登録が、どのリンクから来たか（Instagram・広告・紹介など）
export default function AdminSignupSources() {
  const [days, setDays] = useState(30);
  const [rows, setRows] = useState<Row[] | null>(null);

  useEffect(() => {
    let mounted = true;
    setRows(null);
    supabase.rpc("admin_signup_sources", { p_days: days }).then(({ data }) => {
      if (mounted) setRows(((data ?? []) as Row[]).map((r) => ({ ...r, signups: Number(r.signups) })));
    });
    return () => {
      mounted = false;
    };
  }, [days]);

  const total = rows?.reduce((sum, r) => sum + r.signups, 0) ?? 0;

  return (
    <section className="mb-8">
      <div className="rounded-2xl border bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold text-gray-900">登録の経路</h2>
          <div className="flex gap-1.5">
            {[7, 30, 90].map((d) => (
              <button
                key={d}
                onClick={() => setDays(d)}
                aria-pressed={days === d}
                className={`rounded-full px-3 py-1 text-xs ${
                  days === d ? "bg-black text-white" : "border border-gray-200 text-gray-600"
                }`}
              >
                {d}日
              </button>
            ))}
          </div>
        </div>
        <p className="mt-1 text-xs leading-5 text-gray-500">
          リンクに <code>?utm_source=instagram&amp;utm_medium=reel&amp;utm_campaign=任意の名前</code> を付けて配ると、
          そのリンクから登録した人数が分かります。印のないものは「リンクの印なし」にまとまります。
        </p>

        {rows === null ? (
          <p className="mt-4 text-sm text-gray-400">読み込み中…</p>
        ) : rows.length === 0 ? (
          <p className="mt-4 text-sm text-gray-400">この期間の登録はありません。</p>
        ) : (
          <table className="mt-4 w-full text-left text-sm">
            <thead className="text-xs text-gray-500">
              <tr>
                <th className="py-1 pr-2 font-medium">source</th>
                <th className="py-1 pr-2 font-medium">medium</th>
                <th className="py-1 pr-2 font-medium">campaign</th>
                <th className="py-1 text-right font-medium">登録（計 {total}）</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((r, i) => (
                <tr key={i}>
                  <td className="py-1.5 pr-2 text-gray-900">{r.utm_source}</td>
                  <td className="py-1.5 pr-2 text-gray-600">{r.utm_medium ?? "-"}</td>
                  <td className="py-1.5 pr-2 text-gray-600">{r.utm_campaign ?? "-"}</td>
                  <td className="py-1.5 text-right font-semibold text-gray-900">{r.signups}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
