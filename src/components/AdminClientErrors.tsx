"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { notify } from "@/lib/notify";

type Row = {
  id: string;
  first_seen: string;
  last_seen: string;
  path: string;
  message: string;
  stack: string | null;
  user_agent: string | null;
  count: number;
  status: "new" | "seen" | "fixed";
};

// 運営用: ユーザーの画面で起きたエラー（同じものは、まとめて回数を表示）。ユーザーの情報は、保存していない
export default function AdminClientErrors() {
  const [filter, setFilter] = useState<"new" | "seen" | "fixed" | "all">("new");
  const [rows, setRows] = useState<Row[] | null>(null);

  const load = useCallback(async () => {
    setRows(null);
    const { data } = await supabase.rpc("admin_list_client_errors", { p_status: filter });
    setRows((data ?? []) as Row[]);
  }, [filter]);

  useEffect(() => {
    load();
  }, [load]);

  async function setStatus(id: string, status: Row["status"]) {
    const { error } = await supabase.rpc("admin_set_client_error", { p_id: id, p_status: status });
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
          <h2 className="text-lg font-semibold text-gray-900">画面のエラー</h2>
          <div className="flex gap-1.5">
            {(
              [
                ["new", "新しい"],
                ["seen", "確認した"],
                ["fixed", "直した"],
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
          <p className="mt-4 text-sm text-gray-500">この状態のエラーは、ありません。</p>
        ) : (
          <ul className="mt-4 divide-y divide-gray-100">
            {rows.map((r) => (
              <li key={r.id} className="py-3">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="rounded-full bg-red-100 px-2 py-0.5 font-semibold text-red-800">{r.count}回</span>
                  <span className="font-mono text-gray-700">{r.path}</span>
                  <span className="text-gray-500">最後: {r.last_seen.slice(0, 16).replace("T", " ")}</span>
                </div>
                <p className="mt-1.5 break-words text-sm font-semibold text-gray-900">{r.message}</p>
                {r.stack && (
                  <details className="mt-1">
                    <summary className="cursor-pointer text-xs text-gray-600">詳しく見る</summary>
                    <pre className="mt-1 max-h-48 overflow-auto whitespace-pre-wrap rounded-xl bg-gray-50 p-2 text-[11px] text-gray-700">
                      {r.stack}
                      {r.user_agent ? `\n\n${r.user_agent}` : ""}
                    </pre>
                  </details>
                )}
                <div className="mt-2 flex gap-2">
                  {r.status !== "seen" && (
                    <button onClick={() => setStatus(r.id, "seen")} className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-700">
                      確認した
                    </button>
                  )}
                  {r.status !== "fixed" && (
                    <button onClick={() => setStatus(r.id, "fixed")} className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-700">
                      直した
                    </button>
                  )}
                  {r.status !== "new" && (
                    <button onClick={() => setStatus(r.id, "new")} className="text-xs text-gray-500 underline">
                      新しいに戻す
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
