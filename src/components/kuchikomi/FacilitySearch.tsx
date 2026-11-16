"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { HOSPITAL_COLUMNS } from "@/lib/hospitalColumns";
import { PREFECTURES } from "@/lib/prefectures";
import { INPUT_CLASS, PRIMARY_BUTTON_CLASS } from "@/lib/ui";

type Row = { id: string; name: string; prefecture: string | null; city: string | null; facility_type: string | null };

// 施設名（一部でよい）と都道府県で探す。結果は、口コミの有無にかかわらず出す（口コミがなければ「書く」へ）
export default function FacilitySearch() {
  const [keyword, setKeyword] = useState("");
  const [prefecture, setPrefecture] = useState("");
  const [rows, setRows] = useState<Row[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);

  async function search(e: React.FormEvent) {
    e.preventDefault();
    const kw = keyword.trim();
    if (!kw && !prefecture) return;
    setBusy(true);
    setFailed(false);
    let q = supabase
      .from("hospitals")
      .select(HOSPITAL_COLUMNS)
      .order("facility_type", { ascending: true, nullsFirst: true })
      .order("name")
      .limit(30);
    if (kw) q = q.ilike("name", `%${kw.replace(/[%,]/g, " ")}%`);
    if (prefecture) q = q.eq("prefecture", prefecture);
    const { data, error } = await q;
    setBusy(false);
    if (error) {
      setFailed(true);
      return;
    }
    setRows((data ?? []) as unknown as Row[]);
  }

  return (
    <div>
      <form onSubmit={search} className="grid gap-2 sm:grid-cols-[1fr_9rem_auto]">
        <input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="施設名（例: 〇〇病院）" aria-label="施設名" className={INPUT_CLASS} />
        <select value={prefecture} onChange={(e) => setPrefecture(e.target.value)} aria-label="都道府県" className={INPUT_CLASS}>
          <option value="">都道府県</option>
          {PREFECTURES.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <button type="submit" disabled={busy} className={`${PRIMARY_BUTTON_CLASS} disabled:opacity-60`}>{busy ? "検索中…" : "探す"}</button>
      </form>
      {failed && <p role="alert" className="mt-3 text-sm text-red-600">検索できませんでした。もう一度お試しください。</p>}
      {rows && rows.length === 0 && <p className="mt-3 text-sm text-gray-600">見つかりませんでした。施設名の一部だけで、もう一度お試しください。</p>}
      {rows && rows.length > 0 && (
        <ul className="mt-3 space-y-2">
          {rows.map((h) => (
            <li key={h.id}>
              <Link href={`/kuchikomi/${h.id}`} className="block rounded-2xl border border-gray-200 bg-white px-4 py-3 transition hover:border-gray-400">
                <span className="block text-sm font-semibold text-gray-900">{h.name}</span>
                <span className="mt-0.5 block text-xs text-gray-500">{[h.prefecture, h.city].filter(Boolean).join(" ")}{h.facility_type ? ` ・ ${h.facility_type}` : ""}</span>
              </Link>
            </li>
          ))}
          {rows.length >= 30 && <li className="px-1 text-xs text-gray-500">上位30件を表示しています。条件を絞ると、見つけやすくなります。</li>}
        </ul>
      )}
    </div>
  );
}
