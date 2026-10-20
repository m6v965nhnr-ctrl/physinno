"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { ClassScores } from "@/lib/quizClass";
import PdfButton from "@/components/teacher/PdfButton";

const date = (iso: string) => new Date(iso).toLocaleDateString("ja-JP", { month: "numeric", day: "numeric" });

// 先生用: 学生ひとりの、テストごとの得点の推移（棒グラフ。縦＝点数、横＝日付とテスト名）。テストは、チェックで選ぶ
export default function StudentTrend({ scores, name, onClose }: { scores: ClassScores; name: string; onClose: () => void }) {
  const student = scores.students.find((s) => s.name === name); // 同じ名前の学生がいると、先に見つかった人
  const [picked, setPicked] = useState<Set<string>>(() => new Set(scores.tests.map((t) => t.id)));
  if (!student) return null;

  const rows = scores.tests
    .filter((t) => picked.has(t.id))
    .map((t) => {
      const s = student.scores[t.id];
      return { ...t, point: s && s.a > 0 ? Math.round((s.c / t.n) * 100) : null };
    });

  function toggle(id: string) {
    setPicked((p) => {
      const n = new Set(p);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  }

  // 画面の動き（page-in）の中だと、fixed がずれて下のメニューの後ろに入るので、body の直下に出す
  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-end justify-center bg-black/40 sm:items-center" role="dialog" aria-modal="true" aria-label={`${name}さんの得点の推移`}>
      <div className="max-h-[80dvh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:rounded-2xl">
        <div className="flex items-center justify-between gap-2" data-html2canvas-ignore="true">
          <p className="text-sm font-semibold">{name}さんの得点の推移</p>
          <div className="flex gap-2">
            <PdfButton targetId="student-trend-pdf" filename={`${name}_得点の推移`} />
            <button type="button" onClick={onClose} className="rounded-full border border-gray-300 px-3 py-1 text-xs text-gray-700">閉じる</button>
          </div>
        </div>

        <div id="student-trend-pdf" className="bg-white pt-2">
          <p className="text-sm font-semibold">{name}さん ・ {scores.class_name}</p>
          <p className="text-[11px] text-gray-500">縦：点数（100点満点） 横：日付とテスト名</p>
          {rows.length === 0 ? (
            <p className="py-8 text-center text-xs text-gray-400">下のチェックで、テストを選んでください。</p>
          ) : (
            <div className="mt-2 overflow-x-auto">
              <div className="flex h-44 items-end gap-3 border-b border-l border-gray-300 pl-2 pr-2" style={{ minWidth: rows.length * 64 }}>
                {rows.map((r) => (
                  <div key={r.id} className="flex h-full w-14 shrink-0 flex-col justify-end text-center">
                    <p className="text-[11px] font-semibold">{r.point === null ? "未提出" : r.point}</p>
                    <div className="mx-auto w-8 rounded-t bg-emerald-500" style={{ height: `${r.point ?? 0}%` }} />
                  </div>
                ))}
              </div>
              <div className="flex gap-3 pl-2 pr-2" style={{ minWidth: rows.length * 64 }}>
                {rows.map((r) => (
                  <div key={r.id} className="w-14 shrink-0 pt-1 text-center text-[10px] leading-tight text-gray-600">
                    <p>{date(r.created_at)}</p>
                    <p className="break-words">{r.title}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <details className="mt-3 rounded-xl border border-gray-200" data-html2canvas-ignore="true">
          <summary className="cursor-pointer list-none px-3 py-2.5 text-sm font-semibold text-gray-800">
            グラフに出すテスト（{picked.size}/{scores.tests.length}件） <span className="text-gray-400">▾</span>
          </summary>
          {scores.tests.length === 0 ? (
            <p className="px-3 pb-3 text-xs text-gray-400">公開したテストがありません。</p>
          ) : (
            <ul className="space-y-1 border-t border-gray-100 px-3 py-2">
              {scores.tests.map((t) => (
                <li key={t.id}>
                  <label className="flex items-center gap-2 py-1 text-sm">
                    <input type="checkbox" checked={picked.has(t.id)} onChange={() => toggle(t.id)} />
                    <span className="min-w-0 truncate">{date(t.created_at)} {t.title}</span>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </details>
      </div>
    </div>,
    document.body
  );
}
