"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { QuizModeCounts, getModeCounts, listQuizExams, percent } from "@/lib/quiz";

// 学生ホームの、いちばん目立つ場所に置く「一問一答ドリル」（メイン機能）。
// 解いた数・正答率と、いますぐ始められるボタン（今日の10問・間違えた問題の復習）を出す
export default function QuizHero() {
  const [counts, setCounts] = useState<QuizModeCounts | null>(null);
  const [stat, setStat] = useState<{ total: number; answered: number; correct: number } | null>(null);

  useEffect(() => {
    Promise.all([getModeCounts(null, null), listQuizExams()]).then(([c, exams]) => {
      setCounts(c);
      setStat({
        total: exams.reduce((a, e) => a + e.total, 0),
        answered: exams.reduce((a, e) => a + e.answered, 0),
        correct: exams.reduce((a, e) => a + e.correct, 0),
      });
    });
  }, []);

  const total = stat?.total ?? 1000;
  const answered = stat?.answered ?? 0;
  const rate = percent(stat?.correct ?? 0, answered);

  // まだ解いていない問題があれば、そこから。なければ全問からランダムに
  const todayMode = counts && counts.unanswered > 0 ? "unanswered" : "all";
  const todayHref = `/student/quiz/play?mode=${todayMode}&n=10&order=random`;

  return (
    <section aria-labelledby="quiz-hero-title" className="overflow-hidden rounded-3xl bg-relight-gradient p-5 shadow-sm">
      <p className="inline-block rounded-full bg-white/70 px-3 py-0.5 text-[11px] font-bold">メイン機能</p>
      <h2 id="quiz-hero-title" className="mt-2 text-2xl font-extrabold tracking-tight">
        🎯 一問一答ドリル
      </h2>
      <p className="mt-1 text-sm font-semibold leading-6">国試の過去問 {total.toLocaleString()} 問を、1問ずつ。答えたらすぐ、解説。</p>

      <div className="mt-4 rounded-2xl bg-white/70 p-3">
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

      <div className="mt-4 space-y-2">
        <Link
          href={todayHref}
          className="flex items-center justify-between rounded-2xl bg-white px-5 py-4 text-gray-900 shadow-sm transition active:scale-[0.99]"
        >
          <span>
            <span className="block text-base font-extrabold">▶ 今日の10問を解く</span>
            <span className="block text-xs font-semibold text-gray-600">
              {todayMode === "unanswered" ? "まだ解いていない問題から、ランダムに" : "全問から、ランダムに"}
            </span>
          </span>
          <span aria-hidden="true" className="text-xl font-bold">
            →
          </span>
        </Link>

        <div className="grid grid-cols-2 gap-2">
          {counts && counts.wrong > 0 ? (
            <Link
              href="/student/quiz/play?mode=wrong&n=10&order=random"
              className="rounded-2xl bg-white/80 px-4 py-3 text-center text-sm font-bold text-gray-900 transition active:scale-[0.99]"
            >
              🔁 間違えた問題を復習
              <span className="block text-[11px] font-semibold text-gray-700">{counts.wrong}問</span>
            </Link>
          ) : (
            <Link
              href="/student/quiz/mock"
              className="rounded-2xl bg-white/80 px-4 py-3 text-center text-sm font-bold text-gray-900 transition active:scale-[0.99]"
            >
              ⏱ 模擬試験
              <span className="block text-[11px] font-semibold text-gray-700">本番と同じ160分</span>
            </Link>
          )}
          <Link
            href="/student/quiz"
            className="rounded-2xl bg-white/80 px-4 py-3 text-center text-sm font-bold text-gray-900 transition active:scale-[0.99]"
          >
            📚 単元・回から選ぶ
            <span className="block text-[11px] font-semibold text-gray-700">すべての機能</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
