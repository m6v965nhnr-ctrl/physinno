"use client";

import { useEffect, useState } from "react";
import {
  MedicalHistoryEntry,
  addMedicalHistory,
  deleteMedicalHistory,
  listMyMedicalHistory,
} from "@/lib/medicalHistory";
import { notify } from "@/lib/notify";

// 患者(一般)アカウントが自分の病歴・持病を記録する。
// エントリごとに公開/非公開を選べ、公開にするとメッセージでやり取りする
// PTから見えるようになる（非公開は本人以外には見えない）。
export default function MedicalHistorySection({ userId }: { userId: string }) {
  const [entries, setEntries] = useState<MedicalHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  const [conditionName, setConditionName] = useState("");
  const [memo, setMemo] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  async function load() {
    setLoading(true);
    setEntries(await listMyMedicalHistory(userId));
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleAdd() {
    if (!conditionName.trim()) {
      notify("病名・症状名を入力してください");
      return;
    }

    setAdding(true);
    const error = await addMedicalHistory({
      userId,
      conditionName: conditionName.trim(),
      memo,
      isPublic,
    });
    setAdding(false);

    if (error) {
      notify(error);
      return;
    }

    setConditionName("");
    setMemo("");
    setIsPublic(false);
    await load();
  }

  async function handleDelete(id: string) {
    const error = await deleteMedicalHistory(id);
    if (error) {
      notify(error);
      return;
    }
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-5">
      <p className="text-sm font-semibold text-gray-900">病歴・持病</p>
      <p className="mt-1 text-xs text-gray-500">
        公開にすると、メッセージでやり取りする理学療法士に見えるようになります。非公開は自分だけが見られます。
      </p>

      {loading && <p className="mt-4 text-xs text-gray-400">読み込み中…</p>}

      {!loading && entries.length > 0 && (
        <div className="mt-4 space-y-2">
          {entries.map((e) => (
            <div
              key={e.id}
              className="flex items-start justify-between gap-2 rounded-xl bg-gray-50 px-3 py-2.5"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-900">
                    {e.condition_name}
                  </p>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      e.is_public
                        ? "bg-relight-gradient text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {e.is_public ? "公開" : "非公開"}
                  </span>
                </div>
                {e.memo && (
                  <p className="mt-0.5 text-xs text-gray-500">{e.memo}</p>
                )}
              </div>

              <button
                onClick={() => handleDelete(e.id)}
                className="shrink-0 text-gray-300 hover:text-gray-500"
                aria-label="削除"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 space-y-2 rounded-xl bg-gray-50 p-3">
        <input
          value={conditionName}
          onChange={(e) => setConditionName(e.target.value)}
          placeholder="病名・症状名（例：変形性膝関節症）"
          className="w-full rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-gray-400"
        />
        <textarea
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="メモ（任意）"
          rows={2}
          className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-gray-400"
        />

        <label className="flex items-center gap-2 px-1 text-xs text-gray-600">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
          PTに公開する
        </label>

        <button
          onClick={handleAdd}
          disabled={adding}
          className="w-full rounded-full bg-relight-gradient py-2.5 text-sm font-medium text-white disabled:opacity-50"
        >
          {adding ? "追加中…" : "＋ 追加する"}
        </button>
      </div>
    </div>
  );
}
