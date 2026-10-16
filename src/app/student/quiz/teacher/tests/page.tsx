"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import TeacherPage from "@/components/teacher/TeacherPage";
import NewTestForm from "@/components/teacher/NewTestForm";
import { useTeacherData } from "@/components/teacher/useTeacherData";
import { dueText } from "@/lib/quizClass";
import { percent } from "@/lib/quiz";

// 先生用: テストの一覧と、新しいテストを作る
function TestsBody() {
  const { classes, tests, units, exams } = useTeacherData();
  const [creating, setCreating] = useState(false);
  const [defaultClass, setDefaultClass] = useState<string | undefined>();

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (p.get("new") === "1") setCreating(true);
    setDefaultClass(p.get("class") ?? undefined);
  }, []);

  if (classes === null) return <p className="py-10 text-center text-sm text-gray-400">読み込み中…</p>;

  if (classes.length === 0) {
    return (
      <section className="rounded-2xl bg-white p-4 text-sm leading-6 text-gray-700 shadow-sm">
        <p>テストを配るには、先にクラスが必要です。</p>
        <Link href="/student/quiz/teacher/classes" className="mt-3 inline-block rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white">
          クラスを作る
        </Link>
      </section>
    );
  }

  const drafts = tests.filter((t) => t.status === "draft");
  const published = tests.filter((t) => t.status !== "draft");

  return (
    <>
      {creating ? (
        <NewTestForm classes={classes} units={units} exams={exams} defaultClassId={defaultClass} onCancel={() => setCreating(false)} />
      ) : (
        <button onClick={() => setCreating(true)} className="w-full rounded-full bg-black py-3 text-sm font-medium text-white">
          テストを作る
        </button>
      )}

      {drafts.length > 0 && (
        <section className="rounded-2xl bg-white p-4 shadow-sm">
          <p className="text-sm font-semibold">下書き</p>
          <ul className="mt-2 space-y-2">
            {drafts.map((t) => (
              <li key={t.id}>
                <Link href={`/student/quiz/teacher/test?id=${t.id}`} className="block rounded-xl border border-gray-200 p-3 transition hover:bg-gray-50">
                  <div className="flex items-start justify-between gap-2">
                    <p className="min-w-0 truncate text-sm font-medium">{t.title}</p>
                    <span className="shrink-0 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700">下書き</span>
                  </div>
                  <p className="mt-1 text-[11px] text-gray-500">
                    {t.class_name} ・ {t.n}問 ・ 学生には、まだ見えません
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="rounded-2xl bg-white p-4 shadow-sm">
        <p className="text-sm font-semibold">公開中のテスト</p>
        {published.length === 0 ? (
          <p className="mt-2 text-xs leading-5 text-gray-500">まだありません。「テストを作る」から、作って配れます。</p>
        ) : (
          <ul className="mt-2 space-y-2">
            {published.map((t) => (
              <li key={t.id}>
                <Link href={`/student/quiz/teacher/assignment?id=${t.id}`} className="block rounded-xl border border-gray-200 p-3 transition hover:bg-gray-50">
                  <div className="flex items-start justify-between gap-2">
                    <p className="min-w-0 truncate text-sm font-medium">{t.title}</p>
                    <span className="shrink-0 text-xs text-gray-500">
                      提出 {t.finished_count}/{t.member_count}人
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-gray-500">
                    {t.class_name} ・ {t.n}問 ・ {dueText(t.due_at)}
                    {t.answered_total > 0 ? ` ・ 平均正答率 ${percent(t.correct_total, t.answered_total)}%` : ""}
                  </p>
                </Link>
                <Link href={`/student/quiz/teacher/test?id=${t.id}`} className="mt-1 inline-block pl-1 text-[11px] text-sky-700">
                  問題の内容を見る・複製
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}

export default function TeacherTestsPage() {
  return (
    <TeacherPage title="テスト" description="国試の過去問からテストを作って、クラスに配ります。配る前に、問題の確認・追加・並べ替えができます。">
      <TestsBody />
    </TeacherPage>
  );
}
