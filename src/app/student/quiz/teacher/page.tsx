"use client";

import Link from "next/link";
import TeacherPage from "@/components/teacher/TeacherPage";
import { useTeacherData } from "@/components/teacher/useTeacherData";
import { dueText } from "@/lib/quizClass";
import { percent } from "@/lib/quiz";

// 先生用ホーム: いまの状況と、やることへの近道
function HomeBody() {
  const { classes, tests } = useTeacherData();
  if (classes === null) return <p className="py-10 text-center text-sm text-gray-400">読み込み中…</p>;

  if (classes.length === 0) {
    return (
      <section className="space-y-3 rounded-2xl bg-white p-4 shadow-sm">
        <p className="text-sm font-semibold">はじめに、クラスを作りましょう</p>
        <ol className="list-decimal space-y-1 pl-5 text-xs leading-6 text-gray-600">
          <li>「クラス」で、クラスを作ります（6文字の参加コードが出ます）。</li>
          <li>参加コード（または参加用のURL）を、学生に伝えます。</li>
          <li>「テスト」で、国試の過去問からテストを作って、配ります。</li>
          <li>「分析」で、学生ごと・単元ごとの状況を見ます。</li>
        </ol>
        <Link href="/student/quiz/teacher/classes" className="inline-block rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white">
          クラスを作る
        </Link>
      </section>
    );
  }

  const students = classes.reduce((s, c) => s + c.member_count, 0);
  const drafts = tests.filter((t) => t.status === "draft");
  const published = tests.filter((t) => t.status !== "draft");
  const waiting = published.filter((t) => t.member_count > 0 && t.finished_count < t.member_count).slice(0, 5);

  return (
    <>
      <section className="grid grid-cols-3 gap-2 text-center">
        {[
          ["クラス", classes.length, "つ"],
          ["学生", students, "人"],
          ["公開中のテスト", published.length, "件"],
        ].map(([label, n, unit]) => (
          <div key={label as string} className="rounded-2xl bg-white p-3 shadow-sm">
            <p className="text-[11px] text-gray-500">{label}</p>
            <p className="mt-1 text-xl font-bold">
              {n}
              <span className="text-xs font-medium text-gray-500">{unit}</span>
            </p>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-2 gap-2">
        <Link href="/student/quiz/teacher/tests?new=1" className="rounded-2xl bg-black px-4 py-3 text-center text-sm font-medium text-white">
          テストを作る
        </Link>
        <Link href="/student/quiz/teacher/analysis" className="rounded-2xl border border-gray-300 bg-white px-4 py-3 text-center text-sm font-medium text-gray-800">
          分析を見る
        </Link>
      </section>

      {drafts.length > 0 && (
        <section className="rounded-2xl bg-white p-4 shadow-sm">
          <p className="text-sm font-semibold">下書き（学生には、まだ見えません）</p>
          <ul className="mt-2 divide-y divide-gray-100">
            {drafts.map((t) => (
              <li key={t.id}>
                <Link href={`/student/quiz/teacher/test?id=${t.id}`} className="flex items-center justify-between gap-3 py-2 text-sm">
                  <span className="min-w-0 truncate">{t.title}</span>
                  <span className="shrink-0 text-[11px] text-sky-700">続きをつくる ›</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="rounded-2xl bg-white p-4 shadow-sm">
        <p className="text-sm font-semibold">まだ終わっていない学生がいるテスト</p>
        {waiting.length === 0 ? (
          <p className="mt-2 text-xs leading-5 text-gray-500">{published.length === 0 ? "公開中のテストは、まだありません。" : "すべてのテストを、全員が終えています。"}</p>
        ) : (
          <ul className="mt-2 space-y-2">
            {waiting.map((t) => (
              <li key={t.id}>
                <Link href={`/student/quiz/teacher/assignment?id=${t.id}`} className="block rounded-xl border border-gray-200 p-3 transition hover:bg-gray-50">
                  <div className="flex items-start justify-between gap-2">
                    <p className="min-w-0 truncate text-sm font-medium">{t.title}</p>
                    <span className="shrink-0 text-xs text-gray-500">
                      提出 {t.finished_count}/{t.member_count}人
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-gray-500">
                    {t.class_name} ・ {dueText(t.due_at)}
                    {t.answered_total > 0 ? ` ・ 平均正答率 ${percent(t.correct_total, t.answered_total)}%` : ""}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}

export default function TeacherHomePage() {
  return (
    <TeacherPage title="先生用ホーム" description="学生に配ったテストの結果を、まとめて見られます。学生が見せてよいとした、一問一答の進み具合も、分析から見られます。">
      <HomeBody />
    </TeacherPage>
  );
}
