"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useMyAccount } from "@/lib/useMyAccount";
import { percent } from "@/lib/quiz";
import { AssignmentResults, dueText, getAssignmentResults } from "@/lib/quizClass";

// 先生用: 課題の結果（学生ごと・問題ごと）
export default function QuizAssignmentResultsPage() {
  const { loading } = useMyAccount(["pt"], "/student/quiz");
  const [res, setRes] = useState<AssignmentResults | null | undefined>(undefined);

  useEffect(() => {
    if (loading) return;
    const id = new URLSearchParams(window.location.search).get("id");
    if (!id) {
      setRes(null);
      return;
    }
    getAssignmentResults(id).then(setRes);
  }, [loading]);

  if (loading || res === undefined) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-sm text-gray-400">読み込み中…</p>
      </main>
    );
  }

  if (res === null) {
    return (
      <main className="min-h-screen bg-[#fafafa] px-6 py-10">
        <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 text-center shadow-sm">
          <p className="text-sm text-gray-600">この課題の結果を表示できません。</p>
          <Link href="/student/quiz/teacher" className="mt-4 inline-block rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white">
            戻る
          </Link>
        </div>
      </main>
    );
  }

  const submitted = res.students.filter((s) => s.answered >= res.total).length;
  const answeredAll = res.students.reduce((a, s) => a + s.answered, 0);
  const correctAll = res.students.reduce((a, s) => a + s.correct, 0);

  return (
    <main className="min-h-screen bg-[#fafafa] pb-28">
      <header className="border-b border-gray-100 bg-white px-6 py-5">
        <div className="mx-auto max-w-2xl">
          <Link href="/student/quiz/teacher" className="text-sm text-gray-400">
            ← クラスと課題
          </Link>
          <p className="mt-2 text-xs text-gray-400">{res.class_name}</p>
          <h1 className="text-xl font-semibold tracking-tight">{res.title}</h1>
          <p className="mt-1 text-xs text-gray-500">
            {res.total}問 ・ {dueText(res.due_at)}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-2xl space-y-4 px-6 py-5">
        <section className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-2xl bg-white p-3 shadow-sm">
            <p className="text-[11px] text-gray-500">提出</p>
            <p className="mt-1 text-xl font-bold">
              {submitted}
              <span className="text-xs font-medium text-gray-500"> / {res.students.length}人</span>
            </p>
          </div>
          <div className="rounded-2xl bg-white p-3 shadow-sm">
            <p className="text-[11px] text-gray-500">平均正答率</p>
            <p className="mt-1 text-xl font-bold">{answeredAll === 0 ? "-" : `${percent(correctAll, answeredAll)}%`}</p>
          </div>
          <div className="rounded-2xl bg-white p-3 shadow-sm">
            <p className="text-[11px] text-gray-500">解答数</p>
            <p className="mt-1 text-xl font-bold">{answeredAll}</p>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-4 shadow-sm">
          <p className="text-sm font-semibold">学生ごと</p>
          {res.students.length === 0 ? (
            <p className="mt-2 text-xs text-gray-500">クラスに学生がいません。</p>
          ) : (
            <ul className="mt-2 divide-y divide-gray-100">
              {res.students.map((s, i) => (
                <li key={i} className="flex items-center justify-between gap-3 py-2 text-sm">
                  <span className="min-w-0 truncate">{s.name}</span>
                  <span className="shrink-0 text-xs text-gray-600">
                    {s.answered === 0 ? (
                      <span className="text-red-600">未着手</span>
                    ) : (
                      <>
                        {s.correct}/{s.answered}問 正解（{percent(s.correct, s.answered)}%）
                        {s.answered < res.total && <span className="ml-1 text-amber-700">途中</span>}
                      </>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-2xl bg-white p-4 shadow-sm">
          <p className="text-sm font-semibold">問題ごとの正答率</p>
          <p className="mt-1 text-[11px] text-gray-400">正答率の低い問題は、授業で取り上げる候補です。</p>
          <ul className="mt-2 divide-y divide-gray-100">
            {res.questions.map((q) => {
              const rate = percent(q.correct, q.answered);
              return (
                <li key={q.id} className="py-2">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[11px] text-gray-400">{q.label}</span>
                    <span
                      className={`text-xs font-semibold ${
                        q.answered === 0 ? "text-gray-400" : rate < 50 ? "text-red-600" : "text-gray-800"
                      }`}
                    >
                      {q.answered === 0 ? "未回答" : `${rate}%（${q.correct}/${q.answered}人）`}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs leading-5 text-gray-600">
                    {q.stem}
                    {q.stem.length >= 80 ? "…" : ""}
                  </p>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </main>
  );
}
