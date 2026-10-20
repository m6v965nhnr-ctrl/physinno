"use client";

import { useEffect, useMemo, useState } from "react";
import { QuizUnit, listQuizUnits, percent } from "@/lib/quiz";
import { ClassProgress, getClassProgress } from "@/lib/quizClass";

// 先生用: クラスの学生の、一問一答（学生が自分で解いたもの）の進み具合。学生が「先生に見せる」をオンにしている人だけ
export default function ClassProgressView({ classId }: { classId: string }) {
  const [data, setData] = useState<ClassProgress | null | undefined>(undefined);
  const [units, setUnits] = useState<QuizUnit[]>([]);
  const [now] = useState(() => Date.now());

  useEffect(() => {
    setData(undefined);
    getClassProgress(classId).then(setData);
    listQuizUnits().then(setUnits);
  }, [classId]);

  const unitName = (id: string) => units.find((u) => u.id === id)?.name ?? id;

  const rows = useMemo(() => {
    const list = [...(data?.students ?? [])];
    return list.sort((a, b) => a.name.localeCompare(b.name, "ja"));
  }, [data]);

  if (data === undefined) return <p className="py-10 text-center text-sm text-gray-400">読み込み中…</p>;
  if (data === null) return <p className="rounded-2xl bg-white p-6 text-center text-sm text-gray-600 shadow-sm">進み具合を表示できません。</p>;

  const sharedCount = data.students.filter((s) => s.shared).length;
  const days = (iso: string | null) => (iso ? Math.floor((now - new Date(iso).getTime()) / 86400000) : null);

  return (
    <section className="space-y-3 rounded-2xl bg-white p-4 shadow-sm">
      <div>
        <p className="text-sm font-semibold">一問一答の進み具合</p>
        <p className="mt-1 text-[11px] leading-5 text-gray-400">
          学生が自分で解いた記録のうち、学生が「先生に見せる」をオンにしている人だけが見えます（{sharedCount}/{data.students.length}人）。参加するときのチェック、または、学生の「クラスの課題」の画面で、いつでも変えられます。
        </p>
      </div>


      {rows.length === 0 ? (
        <p className="text-xs text-gray-500">クラスに学生がいません。</p>
      ) : (
        <ul className="divide-y divide-gray-100">
          {rows.map((s, i) => {
            if (!s.shared) {
              return (
                <li key={i} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                  <span className="min-w-0 truncate">{s.name}</span>
                  <span className="shrink-0 text-xs text-gray-400">共有していません</span>
                </li>
              );
            }
            const answered = s.answered ?? 0;
            const rate = s.attempts ? percent(s.correct ?? 0, s.attempts) : null;
            const idle = days(s.last_at);
            return (
              <li key={i} className="py-2.5">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="min-w-0 truncate font-medium">{s.name}</span>
                  <span className="shrink-0 text-xs text-gray-600">
                    {answered}/{data.total}問 ・ {rate === null ? "-" : `正答率 ${rate}%`}
                  </span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-gray-100" aria-hidden="true">
                  <div className="h-full rounded-full bg-gray-900" style={{ width: `${percent(answered, data.total)}%` }} />
                </div>
                <p className="mt-1 text-[11px] text-gray-500">
                  {idle === null ? "まだ解いていません" : idle === 0 ? "最後に解いた日: 今日" : `最後に解いた日: ${idle}日前`}
                </p>
                {s.units && s.units.length > 0 && (
                  <details className="group mt-1">
                    <summary className="cursor-pointer list-none text-[11px] text-sky-700">分野ごとを見る ▾</summary>
                    <ul className="mt-1.5 space-y-1.5">
                      {[...s.units]
                        .sort((a, b) => a.correct / a.attempts - b.correct / b.attempts)
                        .map((u) => {
                          const r = percent(u.correct, u.attempts);
                          return (
                            <li key={u.unit} className="text-[11px]">
                              <div className="flex items-center justify-between gap-2">
                                <span className="min-w-0 truncate text-gray-700">{unitName(u.unit)}</span>
                                <span className={`shrink-0 font-semibold ${r < 50 ? "text-red-600" : "text-gray-800"}`}>
                                  {r < 50 ? "▼ " : ""}
                                  {r}% ・ {u.answered}/{data.unit_totals[u.unit] ?? "?"}問
                                </span>
                              </div>
                              <div className="mt-0.5 h-1 overflow-hidden rounded-full bg-gray-100" aria-hidden="true">
                                <div className="h-full rounded-full bg-gray-900" style={{ width: `${r}%` }} />
                              </div>
                            </li>
                          );
                        })}
                    </ul>
                  </details>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
