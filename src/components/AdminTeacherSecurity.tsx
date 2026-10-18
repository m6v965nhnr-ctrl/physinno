"use client";

import { useCallback, useEffect, useState } from "react";
import { notify } from "@/lib/notify";
import { askConfirm } from "@/lib/confirm";
import { AdminAuditRow, AdminTeacher, listAdminTeachers, listQuizAudit, setTeacherSuspended } from "@/lib/quizClass";

const ACTION_LABEL: Record<string, string> = {
  class_create: "クラスを作った",
  class_archive: "クラスを閉じた",
  class_join: "クラスに参加した（学生）",
  class_leave: "クラスから退出した（学生）",
  test_create: "テストの下書きを作った",
  test_publish: "テストを学生に配った",
  test_delete: "テストを削除した",
  view_class: "クラスの状況を見た",
  view_results: "テストの結果を見た",
  view_matrix: "学生×分野の結果を見た",
  teacher_request: "先生の申請",
  teacher_request_approved: "先生の申請を承認した",
  teacher_request_rejected: "先生の申請を却下した",
  teacher_approved: "先生として承認された",
  teacher_suspend: "先生を停止した",
  teacher_resume: "先生を再開した",
};

// 運営用: 承認済みの先生の一覧（停止・再開）と、クラス・テスト・結果の閲覧の操作の記録
export default function AdminTeacherSecurity() {
  const [teachers, setTeachers] = useState<AdminTeacher[]>([]);
  const [audit, setAudit] = useState<AdminAuditRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const [t, a] = await Promise.all([listAdminTeachers(), listQuizAudit(100)]);
    setTeachers(t);
    setAudit(a);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function toggle(t: AdminTeacher) {
    const stop = !t.suspended;
    if (!(await askConfirm(`${t.full_name ?? t.email ?? "この先生"}（${t.school_name ?? ""}）を${stop ? "停止" : "再開"}します。${stop ? "停止すると、クラス・テスト・結果の画面が、すぐに使えなくなります。" : ""}よろしいですか？`))) return;
    setBusy(t.user_id);
    const ok = await setTeacherSuspended(t.user_id, stop);
    setBusy("");
    if (!ok) {
      notify("処理に失敗しました");
      return;
    }
    load();
  }

  return (
    <section className="mb-8">
      <div className="rounded-2xl border bg-white p-5">
        <h2 className="text-lg font-semibold text-gray-900">過去問ドリル：先生の管理と操作の記録</h2>
        <p className="mt-1 text-sm text-gray-500">先生ごとに、停止・再開できます。学生の結果を見た記録も残ります（同じ画面は30分に1回）。</p>

        {loading ? (
          <p className="mt-4 text-sm text-gray-400">読み込み中…</p>
        ) : (
          <>
            <h3 className="mt-4 text-sm font-semibold text-gray-800">承認済みの先生（{teachers.length}人）</h3>
            {teachers.length === 0 ? (
              <p className="mt-2 text-sm text-gray-400">まだいません。</p>
            ) : (
              <ul className="mt-2 divide-y divide-gray-100">
                {teachers.map((t) => (
                  <li key={t.user_id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                    <div className="min-w-0 text-sm">
                      <p className="font-medium text-gray-900">
                        {t.full_name ?? "（名前なし）"} <span className="font-normal text-gray-500">{t.email}</span>
                        {t.suspended && <span className="ml-2 rounded-full bg-red-50 px-2 py-0.5 text-xs text-red-700">停止中</span>}
                      </p>
                      <p className="mt-0.5 text-xs text-gray-600">
                        {t.school_name} ・ クラス {t.class_count}・学生 {t.student_count}人
                      </p>
                    </div>
                    <button
                      onClick={() => toggle(t)}
                      disabled={busy === t.user_id}
                      className={`shrink-0 rounded-full px-4 py-1.5 text-sm disabled:opacity-40 ${t.suspended ? "bg-black text-white" : "border border-red-200 text-red-700"}`}
                    >
                      {t.suspended ? "再開する" : "停止する"}
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <h3 className="mt-6 text-sm font-semibold text-gray-800">操作の記録（新しい順・最大100件）</h3>
            {audit.length === 0 ? (
              <p className="mt-2 text-sm text-gray-400">記録はまだありません。</p>
            ) : (
              <ul className="mt-2 divide-y divide-gray-100 text-xs">
                {audit.map((r) => (
                  <li key={r.id} className="py-2">
                    <span className="text-gray-400">{new Date(r.created_at).toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })}</span>
                    <span className="ml-2 font-medium text-gray-900">{ACTION_LABEL[r.action] ?? r.action}</span>
                    <span className="ml-2 text-gray-600">{r.actor_name ?? r.actor_email ?? "（不明）"}</span>
                    {r.target_label && <span className="ml-2 text-gray-500">→ {r.target_label}</span>}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </section>
  );
}
