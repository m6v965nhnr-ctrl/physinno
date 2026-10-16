"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useMyAccount } from "@/lib/useMyAccount";
import { percent } from "@/lib/quiz";
import { ClassDashboard, TeacherAssignment, dueText, getClassDashboard, listAssignments } from "@/lib/quizClass";
import { LoadingScreen } from "@/components/states";

type Student = ClassDashboard["students"][number];

// 先生用: クラスの状況。見えるのは、いまクラスにいる学生の、配った課題の結果だけ
// 要フォロー = 期限切れの未提出が多い順、次に正答率が低い順
function followOrder(a: Student, b: Student) {
  if (b.overdue !== a.overdue) return b.overdue - a.overdue;
  const ra = a.answered === 0 ? -1 : a.correct / a.answered;
  const rb = b.answered === 0 ? -1 : b.correct / b.answered;
  return ra - rb;
}

function csvCell(v: string | number) {
  return `"${String(v).replace(/"/g, '""')}"`;
}

function downloadCsv(d: ClassDashboard) {
  const rows = [
    ["名前", "提出した課題", "期限切れの未提出", "解答数", "正解数", "正答率(%)", "最後に解いた日"],
    ...d.students.map((s) => [
      s.name,
      s.finished,
      s.overdue,
      s.answered,
      s.correct,
      s.answered === 0 ? "" : percent(s.correct, s.answered),
      s.last_at ? new Date(s.last_at).toLocaleDateString("ja-JP") : "",
    ]),
  ];
  const csv = "﻿" + rows.map((r) => r.map(csvCell).join(",")).join("\r\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = `${d.class_name}_学生ごとの状況.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function QuizClassDashboardPage() {
  const { loading } = useMyAccount(["pt", "teacher"], "/study");
  const [data, setData] = useState<ClassDashboard | null | undefined>(undefined);
  const [assignments, setAssignments] = useState<TeacherAssignment[]>([]);

  useEffect(() => {
    if (loading) return;
    const id = new URLSearchParams(window.location.search).get("id");
    if (!id) {
      setData(null);
      return;
    }
    getClassDashboard(id).then(setData);
    listAssignments(id).then(setAssignments);
  }, [loading]);

  if (loading || data === undefined) return <LoadingScreen />;

  if (data === null) {
    return (
      <main className="min-h-screen bg-[#fafafa] px-6 py-10">
        <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 text-center shadow-sm">
          <p className="text-sm text-gray-600">このクラスの状況を表示できません。</p>
          <Link href="/student/quiz/teacher" className="mt-4 inline-block rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white">
            戻る
          </Link>
        </div>
      </main>
    );
  }

  const answeredAll = data.students.reduce((a, s) => a + s.answered, 0);
  const correctAll = data.students.reduce((a, s) => a + s.correct, 0);
  const overdueStudents = data.students.filter((s) => s.overdue > 0).length;
  const students = [...data.students].sort(followOrder);
  const units = [...data.units].sort((a, b) => a.correct / a.answered - b.correct / b.answered);

  return (
    <main className="min-h-screen bg-[#fafafa] pb-28">
      <header className="border-b border-gray-100 bg-white px-6 py-5">
        <div className="mx-auto max-w-2xl">
          <Link href="/student/quiz/teacher" className="text-sm text-gray-400">
            ← クラスと課題
          </Link>
          <h1 className="mt-2 text-xl font-semibold tracking-tight">{data.class_name}</h1>
          <p className="mt-1 text-xs text-gray-500">学生 {data.members}人 ・ 課題 {data.assignments}件</p>
        </div>
      </header>

      <div className="mx-auto max-w-2xl space-y-4 px-6 py-5">
        <section className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-2xl bg-white p-3 shadow-sm">
            <p className="text-[11px] text-gray-500">平均正答率</p>
            <p className="mt-1 text-xl font-bold">{answeredAll === 0 ? "-" : `${percent(correctAll, answeredAll)}%`}</p>
          </div>
          <div className="rounded-2xl bg-white p-3 shadow-sm">
            <p className="text-[11px] text-gray-500">解答数</p>
            <p className="mt-1 text-xl font-bold">{answeredAll}</p>
          </div>
          <div className="rounded-2xl bg-white p-3 shadow-sm">
            <p className="text-[11px] text-gray-500">期限切れの未提出</p>
            <p className={`mt-1 text-xl font-bold ${overdueStudents > 0 ? "text-red-600" : ""}`}>
              {overdueStudents}
              <span className="text-xs font-medium text-gray-500">人</span>
            </p>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold">学生ごと</p>
            {data.students.length > 0 && (
              <button onClick={() => downloadCsv(data)} className="rounded-full border border-gray-300 px-3 py-1 text-xs text-gray-700">
                CSVで保存
              </button>
            )}
          </div>
          <p className="mt-1 text-[11px] text-gray-400">フォローが必要そうな順（期限切れの未提出が多い→正答率が低い）。配った課題の結果だけです。</p>
          {students.length === 0 ? (
            <p className="mt-2 text-xs text-gray-500">クラスに学生がいません。参加コードを伝えてください。</p>
          ) : (
            <ul className="mt-2 divide-y divide-gray-100">
              {students.map((s, i) => (
                <li key={i} className="py-2 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <span className="min-w-0 truncate">{s.name}</span>
                    <span className="shrink-0 text-xs text-gray-600">
                      {s.answered === 0 ? "未着手" : `${percent(s.correct, s.answered)}%（${s.correct}/${s.answered}問）`}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-gray-500">
                    提出 {s.finished}/{data.assignments}件
                    {s.overdue > 0 && <span className="ml-2 text-red-600">期限切れの未提出 {s.overdue}件</span>}
                    {s.last_at && <span className="ml-2">最後に解いた日 {new Date(s.last_at).toLocaleDateString("ja-JP")}</span>}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>

        {units.length > 0 && (
          <section className="rounded-2xl bg-white p-4 shadow-sm">
            <p className="text-sm font-semibold">単元ごとの正答率</p>
            <p className="mt-1 text-[11px] text-gray-400">低い順。授業で補う単元の目安になります。</p>
            <ul className="mt-2 space-y-2">
              {units.map((u) => {
                const rate = percent(u.correct, u.answered);
                return (
                  <li key={u.name}>
                    <div className="flex items-center justify-between gap-3 text-xs">
                      <span className="min-w-0 truncate text-gray-800">{u.name}</span>
                      <span className={`shrink-0 font-semibold ${rate < 50 ? "text-red-600" : "text-gray-800"}`}>
                        {rate}%（{u.correct}/{u.answered}）
                      </span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-gray-100" aria-hidden="true">
                      <div className="h-full rounded-full bg-gray-900" style={{ width: `${rate}%` }} />
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {data.weak.length > 0 && (
          <section className="rounded-2xl bg-white p-4 shadow-sm">
            <p className="text-sm font-semibold">正答率の低い問題</p>
            <p className="mt-1 text-[11px] text-gray-400">2人以上が解いた問題から、低い順に最大10問。</p>
            <ul className="mt-2 divide-y divide-gray-100">
              {data.weak.map((q) => (
                <li key={q.id} className="py-2">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[11px] text-gray-400">{q.label}</span>
                    <span className={`text-xs font-semibold ${percent(q.correct, q.answered) < 50 ? "text-red-600" : "text-gray-800"}`}>
                      {percent(q.correct, q.answered)}%（{q.correct}/{q.answered}人）
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs leading-5 text-gray-600">
                    {q.stem}
                    {q.stem.length >= 80 ? "…" : ""}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="rounded-2xl bg-white p-4 shadow-sm">
          <p className="text-sm font-semibold">課題ごと</p>
          {assignments.length === 0 ? (
            <p className="mt-2 text-xs text-gray-500">まだ課題がありません。「クラスと課題」から配れます。</p>
          ) : (
            <ul className="mt-2 space-y-2">
              {assignments.map((a) => (
                <li key={a.id}>
                  <Link
                    href={`/student/quiz/teacher/assignment?id=${a.id}`}
                    className="block rounded-xl border border-gray-200 p-3 transition hover:bg-gray-50"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="min-w-0 truncate text-sm font-medium">{a.title}</p>
                      <span className="shrink-0 text-xs text-gray-500">
                        提出 {a.finished_count}/{a.member_count}人
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] text-gray-500">
                      {a.n}問 ・ {dueText(a.due_at)}
                      {a.answered_total > 0 ? ` ・ 平均正答率 ${percent(a.correct_total, a.answered_total)}%` : ""}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
