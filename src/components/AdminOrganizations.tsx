"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { notify } from "@/lib/notify";
import { ORG_STATUS_LABEL, Org } from "@/lib/recruit";

type Row = Org & { owner_name: string | null; created_at: string; hospital_name?: string | null };

// 運営用: 組織（求人・スカウトを使う施設・企業）の確認と承認。承認されるまで、求人の公開・スカウトはできない
export default function AdminOrganizations() {
  const [rows, setRows] = useState<Row[]>([]);
  const [note, setNote] = useState<Record<string, string>>({});
  const load = useCallback(async () => {
    const { data } = await supabase.rpc("admin_list_organizations");
    setRows((data ?? []) as Row[]);
  }, []);
  useEffect(() => {
    load();
  }, [load]);

  async function review(id: string, status: Org["status"]) {
    const { error } = await supabase.rpc("admin_review_organization", { p_id: id, p_status: status, p_note: note[id] ?? null });
    if (error) return notify("更新できませんでした");
    notify("更新しました");
    load();
  }

  const pending = rows.filter((r) => r.status === "pending").length;
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-4">
      <h2 className="text-sm font-semibold">組織の確認（求人・スカウト）{pending > 0 && <span className="ml-2 rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">確認待ち {pending}</span>}</h2>
      {rows.length === 0 ? <p className="mt-2 text-xs text-gray-500">登録された組織は、まだありません</p> : (
        <ul className="mt-2 space-y-3">
          {rows.map((r) => (
            <li key={r.id} className="rounded-xl bg-gray-50 p-3 text-xs">
              <p className="text-sm font-semibold">{r.name}　<span className="font-normal text-gray-500">{ORG_STATUS_LABEL[r.status].split("（")[0]}</span></p>
              <p className="mt-0.5 text-gray-600">{r.facility_category}{r.facility_type ? `・${r.facility_type}` : ""}　{r.prefecture ?? ""}　登録者：{r.owner_name ?? "（名前なし）"}</p>
              {r.website && <a href={r.website} target="_blank" rel="noopener noreferrer" className="break-all underline">{r.website}</a>}
              <p className="mt-1 text-gray-700">職場ページとのひもづけ：{r.hospital_id ? <a href={`/hospitals/${r.hospital_id}`} target="_blank" rel="noopener noreferrer" className="underline">{r.hospital_name ?? "（名前なし）"}</a> : "なし"}　<span className="text-gray-500">（承認すると、この組織の投稿が、そのページの「投稿」タブに出ます。組織名と見くらべてください）</span></p>
              {r.description && <p className="mt-1 whitespace-pre-wrap text-gray-700">{r.description}</p>}
              <input aria-label="本人に伝えるメモ（任意）" placeholder="本人に伝えるメモ（任意）" value={note[r.id] ?? ""} maxLength={500} onChange={(e) => setNote({ ...note, [r.id]: e.target.value })} className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-1.5" />
              <div className="mt-2 flex flex-wrap gap-2">
                <button type="button" onClick={() => review(r.id, "approved")} className="rounded-full bg-black px-3 py-1 text-white">承認</button>
                <button type="button" onClick={() => review(r.id, "rejected")} className="rounded-full border border-gray-300 bg-white px-3 py-1">承認しない</button>
                <button type="button" onClick={() => review(r.id, "suspended")} className="rounded-full border border-red-200 bg-white px-3 py-1 text-red-700">停止</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
