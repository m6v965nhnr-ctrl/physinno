"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import TeacherPage from "@/components/teacher/TeacherPage";
import ClassDashboardView from "@/components/teacher/ClassDashboardView";
import ClassProgressView from "@/components/teacher/ClassProgressView";
import { useTeacherData } from "@/components/teacher/useTeacherData";

// 先生用: 分析（クラスの状況。学生ごと・分野ごと・正答率の低い問題・テストごと）
function AnalysisBody() {
  const { classes } = useTeacherData(false);
  const [classId, setClassId] = useState("");
  const [mode, setMode] = useState<"tests" | "progress">("tests");

  useEffect(() => {
    if (!classes || classes.length === 0) return;
    const want = new URLSearchParams(window.location.search).get("class");
    setClassId(classes.find((c) => c.id === want)?.id ?? classes[0].id);
  }, [classes]);

  if (classes === null) return <p className="py-10 text-center text-sm text-gray-400">読み込み中…</p>;

  if (classes.length === 0) {
    return (
      <section className="rounded-2xl bg-white p-4 text-sm leading-6 text-gray-700 shadow-sm">
        <p>分析は、クラスにテストを配って、学生が解くと見られます。</p>
        <Link href="/student/quiz/teacher/classes" className="mt-3 inline-block rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white">
          クラスを作る
        </Link>
      </section>
    );
  }

  return (
    <>
      {classes.length > 1 && (
        <div role="group" aria-label="クラスを選ぶ" className="flex flex-wrap gap-2">
          {classes.map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={classId === c.id}
              onClick={() => setClassId(c.id)}
              className={`rounded-full px-4 py-2 text-xs font-semibold ${classId === c.id ? "bg-black text-white" : "border border-gray-200 bg-white text-gray-700"}`}
            >
              {c.name}
            </button>
          ))}
        </div>
      )}
      <div role="group" aria-label="見るもの" className="flex gap-1.5">
        {([["tests", "テストの結果"], ["progress", "一問一答の進み具合"]] as const).map(([k, label]) => (
          <button
            key={k}
            type="button"
            aria-pressed={mode === k}
            onClick={() => setMode(k)}
            className={`flex-1 rounded-full px-3 py-2 text-xs font-semibold ${mode === k ? "bg-black text-white" : "border border-gray-200 bg-white text-gray-700"}`}
          >
            {label}
          </button>
        ))}
      </div>
      {classId && mode === "tests" && <ClassDashboardView key={classId} classId={classId} />}
      {classId && mode === "progress" && <ClassProgressView key={classId} classId={classId} />}
    </>
  );
}

export default function TeacherAnalysisPage() {
  return (
    <TeacherPage title="分析" description="配ったテストの結果と、学生が見せてよいとした一問一答の進み具合を、学生ごと・分野ごとに見て、授業や復習に生かせます。">
      <AnalysisBody />
    </TeacherPage>
  );
}
