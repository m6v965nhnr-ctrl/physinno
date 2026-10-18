"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useMyAccount } from "@/lib/useMyAccount";
import { QuizUnit, imageUrl, listQuizUnits, percent } from "@/lib/quiz";
import { AssignmentMatrix, AssignmentPreview, AssignmentResults, ChoiceStats, dueText, getAssignmentMatrix, getAssignmentPreview, getAssignmentResults, getChoiceStats } from "@/lib/quizClass";
import { LoadingScreen } from "@/components/states";

type View = "student" | "question" | "unit" | "matrix";

const VIEWS: { key: View; label: string }[] = [
  { key: "student", label: "学生ごと" },
  { key: "question", label: "問題ごと" },
  { key: "unit", label: "分野ごと" },
  { key: "matrix", label: "学生×分野" },
];

// 正答率の見せ方。色だけに頼らず、記号と文字も付ける
function rateClass(rate: number) {
  return rate < 50 ? "text-red-600" : "text-gray-800";
}

// 先生用: 課題の結果。学生ごと・問題ごと・分野ごと・学生×分野を、切り替えて見る
export default function QuizAssignmentResultsPage() {
  const { loading } = useMyAccount(["pt", "teacher"], "/study");
  const [id, setId] = useState("");
  const [res, setRes] = useState<AssignmentResults | null | undefined>(undefined);
  const [matrix, setMatrix] = useState<AssignmentMatrix | null>(null);
  const [units, setUnits] = useState<QuizUnit[]>([]);
  const [view, setView] = useState<View>("student");
  const [unitFilter, setUnitFilter] = useState("");
  const [lowFirst, setLowFirst] = useState(false);
  // 問題ごと: ひらいている問題・問題の中身（正答・解説つき）・選択肢ごとの選んだ人数
  const [openQ, setOpenQ] = useState<string | null>(null);
  const [preview, setPreview] = useState<AssignmentPreview | null>(null);
  const [stats, setStats] = useState<ChoiceStats | null>(null);

  useEffect(() => {
    if (loading) return;
    const aid = new URLSearchParams(window.location.search).get("id");
    if (!aid) {
      setRes(null);
      return;
    }
    setId(aid);
    getAssignmentResults(aid).then(setRes);
    getAssignmentMatrix(aid).then(setMatrix);
    getAssignmentPreview(aid).then(setPreview);
    getChoiceStats(aid).then(setStats);
    listQuizUnits().then(setUnits);
  }, [loading]);

  const unitName = (u: string | null) => (u ? (units.find((x) => x.id === u)?.name ?? u) : "（分野なし）");

  // 問題 → 分野
  const unitOf = useMemo(() => new Map((matrix?.questions ?? []).map((q) => [q.id, q.unit ?? ""])), [matrix]);

  // 分野ごと: 解答の件数と正解の件数
  const unitStats = useMemo(() => {
    const m = new Map<string, { answered: number; correct: number; questions: number }>();
    (matrix?.questions ?? []).forEach((q) => {
      const k = q.unit ?? "";
      m.set(k, { answered: 0, correct: 0, questions: (m.get(k)?.questions ?? 0) + 1 });
    });
    (matrix?.students ?? []).forEach((st) =>
      Object.entries(st.cells).forEach(([qid, ok]) => {
        const k = unitOf.get(qid) ?? "";
        const v = m.get(k);
        if (v) {
          v.answered += 1;
          if (ok) v.correct += 1;
        }
      })
    );
    return [...m.entries()].map(([unit, v]) => ({ unit, ...v }));
  }, [matrix, unitOf]);

  if (loading || res === undefined) {
    return <LoadingScreen />;
  }

  if (res === null) {
    return (
      <main className="min-h-screen bg-[#fafafa] px-6 py-10">
        <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 text-center shadow-sm">
          <p className="text-sm text-gray-600">この課題の結果を表示できません。</p>
          <Link href="/student/quiz/teacher/tests" className="mt-4 inline-block rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white">
            戻る
          </Link>
        </div>
      </main>
    );
  }

  const submitted = res.students.filter((s) => s.answered >= res.total).length;
  const answeredAll = res.students.reduce((a, s) => a + s.answered, 0);
  const correctAll = res.students.reduce((a, s) => a + s.correct, 0);

  const questions = res.questions
    .map((q, i) => ({ ...q, order: i, unit: unitOf.get(q.id) ?? "" }))
    .filter((q) => !unitFilter || q.unit === unitFilter);
  if (lowFirst) {
    questions.sort((a, b) => (a.answered === 0 ? 2 : a.correct / a.answered) - (b.answered === 0 ? 2 : b.correct / b.answered));
  }

  const sortedUnits = [...unitStats].sort((a, b) => (a.answered === 0 ? 2 : a.correct / a.answered) - (b.answered === 0 ? 2 : b.correct / b.answered));
  const matrixUnits = [...unitStats].sort((a, b) => unitName(a.unit || null).localeCompare(unitName(b.unit || null), "ja"));

  return (
    <main className="min-h-screen bg-[#fafafa] pb-28">
      <header className="border-b border-gray-100 bg-white px-6 py-5">
        <div className="mx-auto max-w-2xl">
          <Link href="/student/quiz/teacher/tests" className="text-sm text-gray-400">
            ← テスト
          </Link>
          <p className="mt-2 text-xs text-gray-400">{res.class_name}</p>
          <h1 className="text-xl font-semibold tracking-tight">{res.title}</h1>
          <p className="mt-1 text-xs text-gray-500">
            {res.total}問 ・ {dueText(res.due_at)}
          </p>
          {id && (
            <Link href={`/student/quiz/teacher/test?id=${id}`} className="mt-1 inline-block text-[11px] text-sky-700">
              問題の内容を見る・複製
            </Link>
          )}
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

        {/* 見方の切り替え */}
        <div role="group" aria-label="結果の見方" className="sticky top-0 z-10 -mx-1 flex gap-1 rounded-2xl bg-[#fafafa] px-1 py-1">
          {VIEWS.map((v) => (
            <button
              key={v.key}
              type="button"
              aria-pressed={view === v.key}
              onClick={() => setView(v.key)}
              className={`flex-1 rounded-full px-2 py-2 text-xs font-semibold transition ${
                view === v.key ? "bg-black text-white" : "border border-gray-200 bg-white text-gray-700"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>

        {view === "student" && (
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
        )}

        {view === "question" && (
          <section className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-semibold">問題ごとの正答率</p>
              <label className="flex items-center gap-1 text-[11px] text-gray-600">
                <input type="checkbox" checked={lowFirst} onChange={(e) => setLowFirst(e.target.checked)} />
                正答率の低い順
              </label>
            </div>
            <label className="mt-2 flex items-center gap-2 text-[11px] text-gray-500">
              分野
              <select
                value={unitFilter}
                onChange={(e) => setUnitFilter(e.target.value)}
                aria-label="分野で絞り込む"
                className="min-w-0 flex-1 rounded-xl border border-gray-300 bg-white px-2 py-1.5 text-xs text-gray-900"
              >
                <option value="">すべて</option>
                {matrixUnits.map((u) => (
                  <option key={u.unit} value={u.unit}>
                    {unitName(u.unit || null)}（{u.questions}問）
                  </option>
                ))}
              </select>
            </label>
            {questions.length === 0 ? (
              <p className="mt-3 text-xs text-gray-500">この分野の問題は、ありません。</p>
            ) : (
              <ul className="mt-2 divide-y divide-gray-100">
                {questions.map((q) => {
                  const rate = percent(q.correct, q.answered);
                  const detail = preview?.questions.find((x) => x.id === q.id);
                  const st = stats?.[q.id];
                  const isOpen = openQ === q.id;
                  const correctSet = new Set(detail?.answers.flat() ?? []);
                  return (
                    <li key={q.id} className="py-2">
                      <button type="button" onClick={() => setOpenQ(isOpen ? null : q.id)} aria-expanded={isOpen} className="block w-full text-left">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-[11px] text-gray-400">
                            {q.label} ・ {unitName(q.unit || null)}
                          </span>
                          <span className={`text-xs font-semibold ${q.answered === 0 ? "text-gray-400" : rateClass(rate)}`}>
                            {q.answered === 0 ? "未回答" : `${rate}%（${q.correct}/${q.answered}人）`}
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs leading-5 text-gray-600">
                          {q.stem}
                          {q.stem.length >= 80 ? "…" : ""}
                          <span className="ml-1 text-[11px] text-sky-700">{isOpen ? "閉じる ▲" : "選択肢の割合を見る ▼"}</span>
                        </p>
                      </button>
                      {isOpen && (
                        <div className="mt-2 space-y-2 rounded-xl bg-gray-50 p-3 text-xs leading-6 text-gray-800">
                          {!detail ? (
                            <p className="text-gray-400">読み込み中…</p>
                          ) : (
                            <>
                              {detail.intro && <p className="text-gray-500">{detail.intro}</p>}
                              <p className="whitespace-pre-wrap text-gray-900">{detail.stem}</p>
                              {detail.image && (
                                <img src={imageUrl(detail.image)} alt="問題の図" loading="lazy" className="max-h-72 w-full rounded-lg border border-gray-100 bg-white object-contain" />
                              )}
                              {detail.choices_in_image ? (
                                <p className="text-gray-600">
                                  選択肢は、図の中にあります。正答: {detail.answers.length === 0 ? "（採点対象外）" : detail.answers.map((g) => g.join("・")).join(" または ")}
                                </p>
                              ) : (
                                <ol className="space-y-1.5">
                                  {detail.choices.map((c, i) => {
                                    const n = i + 1;
                                    const picked = st?.choices[String(n)] ?? 0;
                                    const share = st && st.answered > 0 ? percent(picked, st.answered) : 0;
                                    const isCorrect = correctSet.has(n);
                                    return (
                                      <li key={n} className={`rounded-lg px-2 py-1.5 ${isCorrect ? "bg-emerald-50" : "bg-white"}`}>
                                        <div className="flex items-start justify-between gap-2">
                                          <span className={isCorrect ? "font-semibold text-emerald-800" : ""}>
                                            {n}. {c}
                                            {isCorrect && <span className="ml-1 text-[11px]">（正答）</span>}
                                          </span>
                                          <span className="shrink-0 text-[11px] font-semibold text-gray-700">
                                            {st ? `${share}%（${picked}人）` : "-"}
                                          </span>
                                        </div>
                                        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-gray-100" aria-hidden="true">
                                          <div className={`h-full rounded-full ${isCorrect ? "bg-emerald-600" : "bg-gray-500"}`} style={{ width: `${share}%` }} />
                                        </div>
                                      </li>
                                    );
                                  })}
                                </ol>
                              )}
                              {st && st.answered > 0 && detail.need > 1 && <p className="text-[11px] text-gray-500">複数選ぶ問題です。割合は、その選択肢を選んだ人の割合です（合計は100%を超えます）。</p>}
                              {detail.explanation && (
                                <div>
                                  <p className="font-semibold text-gray-800">解説</p>
                                  <p className="whitespace-pre-wrap">{detail.explanation}</p>
                                  {detail.explanation_source === "ai" && <p className="mt-1 text-[11px] text-gray-500">AIが作成した解説です。誤りを含むことがあります。</p>}
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        )}

        {view === "unit" && (
          <section className="rounded-2xl bg-white p-4 shadow-sm">
            <p className="text-sm font-semibold">分野ごとの正答率</p>
            <p className="mt-1 text-[11px] text-gray-400">正答率の低い順。授業で補う分野の目安です。</p>
            {!matrix ? (
              <p className="mt-2 text-xs text-gray-500">読み込み中…</p>
            ) : (
              <ul className="mt-2 space-y-3">
                {sortedUnits.map((u) => {
                  const rate = percent(u.correct, u.answered);
                  return (
                    <li key={u.unit}>
                      <div className="flex items-center justify-between gap-3 text-xs">
                        <span className="min-w-0 truncate text-gray-800">
                          {unitName(u.unit || null)}（{u.questions}問）
                        </span>
                        <span className={`shrink-0 font-semibold ${u.answered === 0 ? "text-gray-400" : rateClass(rate)}`}>
                          {u.answered === 0 ? "未回答" : `${rate}%（${u.correct}/${u.answered}）`}
                        </span>
                      </div>
                      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-gray-100" aria-hidden="true">
                        <div className="h-full rounded-full bg-gray-900" style={{ width: `${u.answered === 0 ? 0 : rate}%` }} />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setUnitFilter(u.unit);
                          setView("question");
                        }}
                        className="mt-1 text-[11px] text-sky-700"
                      >
                        この分野の問題を見る ›
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        )}

        {view === "matrix" && (
          <section className="rounded-2xl bg-white p-4 shadow-sm">
            <p className="text-sm font-semibold">学生 × 分野</p>
            <p className="mt-1 text-[11px] text-gray-400">▼ は、正答率50%未満（要復習）。数字は、正答率（正解/解答）です。</p>
            {!matrix ? (
              <p className="mt-2 text-xs text-gray-500">読み込み中…</p>
            ) : matrix.students.length === 0 ? (
              <p className="mt-2 text-xs text-gray-500">クラスに学生がいません。</p>
            ) : (
              <div className="mt-2 overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-0 text-xs">
                  <thead>
                    <tr>
                      <th className="sticky left-0 z-[1] bg-white px-2 py-2 text-left font-medium text-gray-500">学生</th>
                      {matrixUnits.map((u) => (
                        <th key={u.unit} className="min-w-[4.5rem] px-2 py-2 text-center font-medium text-gray-500">
                          {unitName(u.unit || null)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {matrix.students.map((st, i) => (
                      <tr key={i}>
                        <th scope="row" className="sticky left-0 z-[1] max-w-[7rem] truncate border-t border-gray-100 bg-white px-2 py-2 text-left font-medium text-gray-800">
                          {st.name}
                        </th>
                        {matrixUnits.map((u) => {
                          let a = 0;
                          let c = 0;
                          Object.entries(st.cells).forEach(([qid, ok]) => {
                            if ((unitOf.get(qid) ?? "") === u.unit) {
                              a += 1;
                              if (ok) c += 1;
                            }
                          });
                          const rate = percent(c, a);
                          const low = a > 0 && rate < 50;
                          return (
                            <td
                              key={u.unit}
                              className={`border-t border-gray-100 px-2 py-2 text-center ${
                                a === 0 ? "text-gray-300" : low ? "bg-red-50 font-semibold text-red-700" : rate >= 80 ? "bg-emerald-50 text-emerald-800" : "text-gray-800"
                              }`}
                            >
                              {a === 0 ? (
                                "-"
                              ) : (
                                <>
                                  {low && <span aria-hidden="true">▼</span>}
                                  {rate}%<span className="block text-[10px] font-normal text-gray-500">{c}/{a}</span>
                                </>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
