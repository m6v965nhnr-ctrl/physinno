"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  AdminReport,
  REPORT_REASON_LABEL,
  REPORT_TARGET_LABEL,
  listAdminReports,
  resolveAdminReport,
} from "@/lib/reports";
import { notify } from "@/lib/notify";
import { adminRemoveExamNoteFile } from "@/lib/exams";

type Filter = "open" | "resolved" | "dismissed";

const FILTER_LABEL: Record<Filter, string> = {
  open: "未対応",
  resolved: "対応済み",
  dismissed: "問題なし",
};

// 運営用: 通報の一覧と、削除・クローズの操作
export default function AdminReports() {
  const [filter, setFilter] = useState<Filter>("open");
  const [reports, setReports] = useState<AdminReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState("");

  const load = useCallback(async (f: Filter) => {
    setLoading(true);
    setReports(await listAdminReports(f));
    setLoading(false);
  }, []);

  useEffect(() => {
    load(filter);
  }, [filter, load]);

  async function act(report: AdminReport, action: "delete" | "resolve" | "dismiss") {
    const confirmText =
      action === "delete"
        ? `この${REPORT_TARGET_LABEL[report.target_type]}を削除して、通報を対応済みにします。元に戻せません。よろしいですか？`
        : null;

    if (confirmText && !confirm(confirmText)) return;

    const note = action === "delete" ? "運営が削除" : undefined;

    setBusyId(report.id);

    // 試験メモの添付ファイル(過去問など)は、メモを消す前に、ファイル本体も削除する
    if (action === "delete" && report.target_type === "exam_note") {
      await adminRemoveExamNoteFile(report.target_id);
    }

    const error = await resolveAdminReport(report.id, action, note);
    setBusyId("");

    if (error) {
      notify(`操作に失敗しました: ${error}`);
      return;
    }

    notify(action === "delete" ? "削除しました" : "通報を閉じました");
    load(filter);
  }

  return (
    <section className="mb-8 rounded-2xl border bg-white p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-gray-900">通報・削除申請</h2>

        <div className="flex gap-1 rounded-full bg-gray-100 p-1 text-xs">
          {(Object.keys(FILTER_LABEL) as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-3 py-1.5 ${
                filter === f ? "bg-white font-semibold text-gray-900 shadow-sm" : "text-gray-500"
              }`}
            >
              {FILTER_LABEL[f]}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {loading ? (
          <p className="text-sm text-gray-400">読み込み中…</p>
        ) : reports.length === 0 ? (
          <p className="text-sm text-gray-400">該当する通報はありません。</p>
        ) : (
          reports.map((r) => (
            <div key={r.id} className="rounded-xl border border-gray-100 p-4">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded-full bg-gray-900 px-2.5 py-0.5 font-medium text-white">
                  {REPORT_TARGET_LABEL[r.target_type]}
                </span>
                <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-amber-700">
                  {REPORT_REASON_LABEL[r.reason]}
                </span>
                <span className="text-gray-400">
                  {new Date(r.created_at).toLocaleString("ja-JP")}
                </span>
              </div>

              <p className="mt-3 whitespace-pre-wrap rounded-lg bg-gray-50 p-3 text-sm text-gray-700">
                {r.snippet ?? "（対象はすでに削除されています）"}
              </p>

              {r.detail && (
                <p className="mt-2 whitespace-pre-wrap text-xs text-gray-600">
                  通報者のコメント: {r.detail}
                </p>
              )}

              <p className="mt-2 text-xs text-gray-400">通報者: {r.reporter_email ?? "不明"}</p>

              {r.admin_note && (
                <p className="mt-1 text-xs text-gray-400">対応メモ: {r.admin_note}</p>
              )}

              {r.status === "open" && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {r.link_path && (
                    <Link
                      href={r.link_path}
                      target="_blank"
                      className="rounded-full border border-gray-200 px-3 py-1.5 text-xs text-gray-700"
                    >
                      対象を開く
                    </Link>
                  )}
                  <button
                    disabled={busyId === r.id || !r.snippet}
                    onClick={() => act(r, "delete")}
                    className="rounded-full bg-red-600 px-3 py-1.5 text-xs font-medium text-white disabled:opacity-40"
                  >
                    削除する
                  </button>
                  <button
                    disabled={busyId === r.id}
                    onClick={() => act(r, "dismiss")}
                    className="rounded-full border border-gray-200 px-3 py-1.5 text-xs text-gray-700 disabled:opacity-40"
                  >
                    問題なしで閉じる
                  </button>
                  <button
                    disabled={busyId === r.id}
                    onClick={() => act(r, "resolve")}
                    className="rounded-full border border-gray-200 px-3 py-1.5 text-xs text-gray-700 disabled:opacity-40"
                  >
                    対応済みにする
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}
