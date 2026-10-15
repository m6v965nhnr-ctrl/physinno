"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import StreakBadge from "@/components/student/StreakBadge";
import { QuizExam, QuizModeCounts, QuizUnit, getModeCounts, getStreak, listQuizExams, listQuizUnits, percent } from "@/lib/quiz";

function Bar({ answered, total }: { answered: number; total: number }) {
  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-gray-100" aria-hidden="true">
      <div className="h-full rounded-full bg-emerald-500" style={{ width: `${percent(answered, total)}%` }} />
    </div>
  );
}

// 「投稿」の中の「勉強」。国試の過去問を、一問一答で解く。
// 大きな「今日の10問」を最上段に、次に近道（復習・ブックマーク・模擬試験）、そのあとに科目・回から選べる
export default function StudyHub() {
  const [units, setUnits] = useState<QuizUnit[] | null>(null);
  const [exams, setExams] = useState<QuizExam[]>([]);
  const [counts, setCounts] = useState<QuizModeCounts | null>(null);
  const [streak, setStreak] = useState<{ streak: number; doneToday: boolean } | null>(null);

  useEffect(() => {
    Promise.all([listQuizUnits(), listQuizExams(), getModeCounts(null, null), getStreak()]).then(([u, e, c, s]) => {
      setUnits(u);
      setExams(e);
      setCounts(c);
      setStreak(s);
    });
  }, []);

  if (!units) {
    return <p className="py-16 text-center text-sm text-gray-400">読み込み中…</p>;
  }

  const total = units.reduce((a, u) => a + u.total, 0);
  const answered = units.reduce((a, u) => a + u.answered, 0);
  const correct = units.reduce((a, u) => a + u.correct, 0);
  const rate = percent(correct, answered);

  // まだ解いていない問題があれば、そこから。なければ全問から
  const todayMode = counts && counts.unanswered > 0 ? "unanswered" : "all";
  // n=0 は、最後まで（全問）。「今日の10問」だけ、10問で終わる
  const play = (extra: string, mode: string = todayMode, n = 0) => `/student/quiz/play?${extra}${extra ? "&" : ""}mode=${mode}&n=${n}&order=random`;

  const fields = Array.from(new Set(units.map((u) => u.field)));
  const sortedExams = [...exams].sort((x, y) => y.exam_no - x.exam_no);

  return (
    <div className="space-y-5">
      {/* 今日の10問 */}
      <section className="rounded-3xl bg-relight-gradient p-5 shadow-sm" aria-labelledby="study-title">
        <div className="flex items-center justify-between gap-2">
          <h2 id="study-title" className="text-xl font-extrabold tracking-tight">
            🎯 一問一答
          </h2>
          <StreakBadge className="bg-white/70" />
        </div>
        <p className="mt-1 text-sm font-semibold">国試の過去問を、1問ずつ。答えたら、すぐ解説。</p>

        <Link href={play("", todayMode, 10)} className="mt-4 flex items-center justify-between rounded-2xl bg-white px-5 py-4 text-gray-900 shadow-sm transition active:scale-[0.99]">
          <span>
            <span className="block text-lg font-extrabold">{answered === 0 ? "▶ まず10問、解いてみよう" : "▶ 今日の10問"}</span>
            <span className="block text-xs font-semibold text-gray-600">
              {streak && !streak.doneToday ? "今日は、まだ解いていません" : todayMode === "unanswered" ? "まだ解いていない問題から" : "全問から、ランダムに"}
              ・約3分
            </span>
          </span>
          <span aria-hidden="true" className="text-2xl font-bold">→</span>
        </Link>

        <div className="mt-3 rounded-2xl bg-white/70 p-3">
          <div className="flex items-end justify-between text-sm font-bold">
            <span>
              解いた問題 <span className="text-xl">{answered.toLocaleString()}</span>
              <span className="text-xs font-semibold"> / {total.toLocaleString()}問</span>
            </span>
            <span>
              正答率 <span className="text-xl">{answered > 0 ? rate : "-"}</span>
              {answered > 0 && <span className="text-xs font-semibold">%</span>}
            </span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white" aria-hidden="true">
            <div className="h-full rounded-full bg-gray-900" style={{ width: `${percent(answered, total)}%` }} />
          </div>
        </div>
      </section>

      {/* 近道 */}
      <section className="grid grid-cols-3 gap-2" aria-label="近道">
        {counts && counts.wrong > 0 ? (
          <Link href={play("", "wrong")} className="rounded-2xl bg-white p-3 text-center shadow-sm transition active:scale-[0.98]">
            <span aria-hidden="true" className="text-xl">🔁</span>
            <span className="mt-1 block text-xs font-bold text-gray-900">間違いの復習</span>
            <span className="block text-[11px] font-semibold text-red-500">{counts.wrong}問</span>
          </Link>
        ) : (
          <div className="rounded-2xl bg-white p-3 text-center opacity-50 shadow-sm">
            <span aria-hidden="true" className="text-xl">🔁</span>
            <span className="mt-1 block text-xs font-bold text-gray-900">間違いの復習</span>
            <span className="block text-[11px] text-gray-400">まだなし</span>
          </div>
        )}
        {counts && counts.bookmarked > 0 ? (
          <Link href={play("", "bookmarked")} className="rounded-2xl bg-white p-3 text-center shadow-sm transition active:scale-[0.98]">
            <span aria-hidden="true" className="text-xl">🔖</span>
            <span className="mt-1 block text-xs font-bold text-gray-900">ブックマーク</span>
            <span className="block text-[11px] font-semibold text-gray-600">{counts.bookmarked}問</span>
          </Link>
        ) : (
          <div className="rounded-2xl bg-white p-3 text-center opacity-50 shadow-sm">
            <span aria-hidden="true" className="text-xl">🔖</span>
            <span className="mt-1 block text-xs font-bold text-gray-900">ブックマーク</span>
            <span className="block text-[11px] text-gray-400">まだなし</span>
          </div>
        )}
        <Link href="/student/quiz/mock" className="rounded-2xl bg-white p-3 text-center shadow-sm transition active:scale-[0.98]">
          <span aria-hidden="true" className="text-xl">⏱</span>
          <span className="mt-1 block text-xs font-bold text-gray-900">模擬試験</span>
          <span className="block text-[11px] font-semibold text-gray-600">160分</span>
        </Link>
      </section>

      {/* 科目から */}
      <section className="rounded-3xl bg-white p-4 shadow-sm">
        <h3 className="text-sm font-bold text-gray-900">科目から選ぶ</h3>
        <p className="mt-0.5 text-xs text-gray-500">選ぶと、すぐに始まります。最後の問題まで続けて解けます（やめるのは、いつでも）</p>
        <div className="mt-3 divide-y divide-gray-100">
          {fields.map((f) => {
            const list = units.filter((u) => u.field === f).sort((a, b) => a.sort - b.sort);
            const a = list.reduce((s, u) => s + u.answered, 0);
            const t = list.reduce((s, u) => s + u.total, 0);
            return (
              <details key={f} className="group py-1">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-3">
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-gray-900">{f}</span>
                    <span className="block text-[11px] text-gray-500">
                      {a}/{t}問
                    </span>
                  </span>
                  <span aria-hidden="true" className="text-xs text-gray-400 group-open:rotate-180">▼</span>
                </summary>
                <ul className="mb-2 space-y-1.5">
                  {list.map((u) => (
                    <li key={u.id}>
                      <Link href={play(`unit=${u.id}`, u.answered < u.total ? "unanswered" : "all")} className="block rounded-xl bg-gray-50 px-3 py-2.5 transition active:scale-[0.99]">
                        <span className="flex items-center justify-between gap-2 text-sm">
                          <span className="min-w-0 truncate font-medium text-gray-900">{u.name}</span>
                          <span className="shrink-0 text-[11px] text-gray-500">
                            {u.answered}/{u.total}
                            {u.answered > 0 && <span className="ml-1 font-semibold text-emerald-600">{percent(u.correct, u.answered)}%</span>}
                          </span>
                        </span>
                        <span className="mt-1.5 block">
                          <Bar answered={u.answered} total={u.total} />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            );
          })}
        </div>
      </section>

      {/* 回から */}
      <section className="rounded-3xl bg-white p-4 shadow-sm">
        <h3 className="text-sm font-bold text-gray-900">回から選ぶ</h3>
        <ul className="mt-3 grid grid-cols-2 gap-2">
          {sortedExams.map((e) => (
            <li key={e.exam_no}>
              <Link href={play(`exam=${e.exam_no}`, e.answered < e.total ? "unanswered" : "all")} className="block rounded-xl bg-gray-50 px-3 py-2.5 transition active:scale-[0.99]">
                <span className="flex items-center justify-between text-sm font-semibold text-gray-900">
                  第{e.exam_no}回
                  <span className="text-[11px] font-normal text-gray-500">
                    {e.answered}/{e.total}
                  </span>
                </span>
                <span className="mt-1.5 block">
                  <Bar answered={e.answered} total={e.total} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <Link href="/student/quiz" className="block rounded-2xl border border-gray-200 bg-white px-4 py-3 text-center text-sm font-medium text-gray-700">
        すべての機能（キーワード検索・PDF・学校ランキング）→
      </Link>
    </div>
  );
}
