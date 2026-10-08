"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { notify } from "@/lib/notify";

type Row = {
  id: string;
  created_at: string;
  category: string;
  role: string | null;
  body: string;
  contact: string | null;
  status: "new" | "read" | "done";
  admin_note: string | null;
};

const CATEGORY_LABEL: Record<string, string> = { request: "機能の要望", problem: "困りごと", question: "質問", other: "その他" };
const ROLE_LABEL: Record<string, string> = { pt: "PT", student: "学生", researcher: "研究者", general: "一般", other: "その他" };

// 運営用: 意見箱に届いた意見（匿名。ログインしていた人のアカウントは、保存していない）
export default function AdminFeedback() {
  const [filter, setFilter] = useState<"new" | "read" | "done" | "all">("new");
  const [rows, setRows] = useState<Row[] | null>(null);

  const load = useCallback(async () => {
    setRows(null);
    const { data } = await supabase.rpc("admin_list_feedback", { p_status: filter });
    setRows((data ?? []) as Row[]);
  }, [filter]);

  useEffect(() => {
    load();
  }, [load]);

  async function setStatus(id: string, status: Row["status"]) {
    const { error } = await supabase.rpc("admin_set_feedback", { p_id: id, p_status: status, p_note: null });
    if (error) {
      notify("更新に失敗しました");
      return;
    }
    load();
  }

  return (
    <section className="mb-8">
      <div className="rounded-2xl border bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold text-gray-900">意見箱</h2>
          <div className="flex gap-1.5">
            {(
              [
                ["new", "未読"],
                ["read", "読んだ"],
                ["done", "対応済み"],
                ["all", "すべて"],
              ] as const
            ).map(([k, l]) => (
              <button
                key={k}
                onClick={() => setFilter(k)}
                aria-pressed={filter === k}
                className={`rounded-full px-3 py-1 text-xs ${filter === k ? "bg-black text-white" : "border border-gray-200 text-gray-600"}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {rows === null ? (
          <p className="mt-4 text-sm text-gray-500">読み込み中…</p>
        ) : rows.length === 0 ? (
          <p className="mt-4 text-sm text-gray-500">この状態の意見は、ありません。</p>
        ) : (
          <ul className="mt-4 divide-y divide-gray-100">
            {rows.map((r) => (
              <li key={r.id} className="py-3">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="rounded-full bg-sky-100 px-2 py-0.5 font-semibold text-sky-800">{CATEGORY_LABEL[r.category] ?? r.category}</span>
                  {r.role && <span className="rounded-full bg-gray-100 px-2 py-0.5 text-gray-700">{ROLE_LABEL[r.role] ?? r.role}</span>}
                  <span className="text-gray-500">{r.created_at.slice(0, 16).replace("T", " ")}</span>
                </div>
                <p className="mt-1.5 whitespace-pre-wrap text-sm leading-6 text-gray-900">{r.body}</p>
                {r.contact && <p className="mt-1 text-xs text-gray-600">連絡先: {r.contact}</p>}
                <div className="mt-2 flex gap-2">
                  {r.status !== "read" && (
                    <button onClick={() => setStatus(r.id, "read")} className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-700">
                      読んだ
                    </button>
                  )}
                  {r.status !== "done" && (
                    <button onClick={() => setStatus(r.id, "done")} className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-700">
                      対応済み
                    </button>
                  )}
                  {r.status !== "new" && (
                    <button onClick={() => setStatus(r.id, "new")} className="text-xs text-gray-500 underline">
                      未読に戻す
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
