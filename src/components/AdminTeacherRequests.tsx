"use client";

import { useCallback, useEffect, useState } from "react";
import { notify } from "@/lib/notify";
import { TeacherRequest, listTeacherRequests, resolveTeacherRequest } from "@/lib/quizClass";

// 運営用: 過去問ドリルの「先生」の申請を、承認・却下する
export default function AdminTeacherRequests() {
  const [requests, setRequests] = useState<TeacherRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setRequests(await listTeacherRequests("open"));
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function act(r: TeacherRequest, approve: boolean) {
    if (!confirm(`${r.full_name ?? r.email ?? "このユーザー"}（${r.school_name}）の申請を${approve ? "承認" : "却下"}します。よろしいですか？`)) {
      return;
    }
    setBusyId(r.id);
    const ok = await resolveTeacherRequest(r.id, approve);
    setBusyId("");
    if (!ok) {
      notify("処理に失敗しました");
      return;
    }
    load();
  }

  return (
    <section className="mb-8">
      <div className="rounded-2xl border bg-white p-5">
        <h2 className="text-lg font-semibold text-gray-900">過去問ドリル：先生の申請</h2>
        <p className="mt-1 text-sm text-gray-500">承認すると、そのPTアカウントがクラスと課題を作れるようになります。</p>

        {loading ? (
          <p className="mt-4 text-sm text-gray-400">読み込み中…</p>
        ) : requests.length === 0 ? (
          <p className="mt-4 text-sm text-gray-400">未対応の申請はありません。</p>
        ) : (
          <ul className="mt-4 divide-y divide-gray-100">
            {requests.map((r) => (
              <li key={r.id} className="flex flex-wrap items-start justify-between gap-3 py-3">
                <div className="min-w-0 text-sm">
                  <p className="font-medium text-gray-900">
                    {r.full_name ?? "（名前なし）"} <span className="font-normal text-gray-500">{r.email}</span>
                  </p>
                  <p className="mt-0.5 text-gray-700">所属: {r.school_name}</p>
                  {r.note && <p className="mt-0.5 whitespace-pre-wrap text-xs text-gray-500">{r.note}</p>}
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    onClick={() => act(r, true)}
                    disabled={busyId === r.id}
                    className="rounded-full bg-black px-4 py-1.5 text-sm text-white disabled:opacity-40"
                  >
                    承認
                  </button>
                  <button
                    onClick={() => act(r, false)}
                    disabled={busyId === r.id}
                    className="rounded-full border border-gray-300 px-4 py-1.5 text-sm text-gray-700 disabled:opacity-40"
                  >
                    却下
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
