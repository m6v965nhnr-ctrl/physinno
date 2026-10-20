"use client";

import { useEffect, useMemo, useState } from "react";
import { QuizUnit, listQuizUnits, percent } from "@/lib/quiz";
import {
  AssignmentMatrix,
  AssignmentResults,
  ClassDashboard,
  ClassScores,
  dueText,
  getAssignmentMatrix,
  getAssignmentResults,
  getClassDashboard,
  getClassScores,
} from "@/lib/quizClass";
import PdfButton from "@/components/teacher/PdfButton";
import StudentTrend from "@/components/teacher/StudentTrend";

const rateClass = (r: number) => (r < 50 ? "text-red-600" : "text-gray-800");

function Chips<T extends string>({ value, onChange, options, label }: { value: T; onChange: (v: T) => void; options: [T, string][]; label: string }) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-1.5" data-html2canvas-ignore="true">
      {options.map(([k, text]) => (
        <button key={k} type="button" aria-pressed={value === k} onClick={() => onChange(k)} className={`whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-semibold ${value === k ? "bg-black text-white" : "border border-gray-200 text-gray-700"}`}>
          {text}
        </button>
      ))}
    </div>
  );
}

const byName = (a: string, b: string) => a.localeCompare(b, "ja");

type StudentSort = "name" | "low" | "high";
const STUDENT_SORTS: [StudentSort, string][] = [["name", "名前順"], ["low", "点数の低い順"], ["high", "点数の高い順"]];
type QSort = "order" | "high" | "low";
const Q_SORTS: [QSort, string][] = [["order", "テスト順"], ["high", "正答率の高い順"], ["low", "正答率の低い順"]];
type RateSort = "high" | "low";
const RATE_SORTS: [RateSort, string][] = [["high", "高い順"], ["low", "低い順"]];

// ひとつのテストの結果: 学生ごと・問題ごと・単元ごと（開いたときに読み込む）
function TestDetail({ id, title, classLabel, units, onPick }: { id: string; title: string; classLabel: string; units: QuizUnit[]; onPick: (name: string) => void }) {
  const [res, setRes] = useState<AssignmentResults | null | undefined>(undefined);
  const [matrix, setMatrix] = useState<AssignmentMatrix | null>(null);
  const [view, setView] = useState<"student" | "question" | "unit">("student");
  const [ss, setSs] = useState<StudentSort>("name");
  const [qs, setQs] = useState<QSort>("order");
  const [us, setUs] = useState<RateSort>("low");

  useEffect(() => {
    getAssignmentResults(id).then(setRes);
    getAssignmentMatrix(id).then(setMatrix);
  }, [id]);

  const students = useMemo(() => {
    const l = [...(res?.students ?? [])];
    const rate = (s: (typeof l)[number]) => (s.answered === 0 ? null : s.correct / (res?.total || 1));
    if (ss === "name") return l.sort((a, b) => byName(a.name, b.name));
    return l.sort((a, b) => {
      const ra = rate(a), rb = rate(b);
      if (ra === null || rb === null) return ra === rb ? byName(a.name, b.name) : ra === null ? 1 : -1; // 未提出は、最後
      return (ss === "low" ? ra - rb : rb - ra) || byName(a.name, b.name);
    });
  }, [res, ss]);

  const questions = useMemo(() => {
    const l = (res?.questions ?? []).map((q, i) => ({ ...q, i, rate: q.answered ? q.correct / q.answered : -1 }));
    if (qs === "high") return l.sort((a, b) => b.rate - a.rate);
    if (qs === "low") return l.sort((a, b) => (a.rate < 0 ? 1 : b.rate < 0 ? -1 : a.rate - b.rate));
    return l;
  }, [res, qs]);

  const unitRows = useMemo(() => {
    const unitOf = new Map((matrix?.questions ?? []).map((q) => [q.id, q.unit ?? ""]));
    const m = new Map<string, { answered: number; correct: number }>();
    (matrix?.students ?? []).forEach((st) =>
      Object.entries(st.cells).forEach(([qid, ok]) => {
        const k = unitOf.get(qid) ?? "";
        const v = m.get(k) ?? { answered: 0, correct: 0 };
        v.answered += 1;
        if (ok) v.correct += 1;
        m.set(k, v);
      })
    );
    const l = [...m.entries()].map(([unit, v]) => ({ unit, ...v, rate: v.correct / v.answered }));
    return l.sort((a, b) => (us === "low" ? a.rate - b.rate : b.rate - a.rate));
  }, [matrix, us]);

  const unitName = (u: string) => (u ? (units.find((x) => x.id === u)?.name ?? u) : "（単元なし）");

  if (res === undefined) return <p className="py-3 text-xs text-gray-400">読み込み中…</p>;
  if (res === null) return <p className="py-3 text-xs text-gray-500">結果を表示できません。</p>;

  const pdfId = `test-pdf-${id}`;
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div role="group" aria-label="見かた" className="flex gap-1.5">
          {([["student", "学生ごと"], ["question", "問題ごと"], ["unit", "単元ごと"]] as const).map(([k, l]) => (
            <button key={k} type="button" aria-pressed={view === k} onClick={() => setView(k)} className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${view === k ? "bg-black text-white" : "border border-gray-200 text-gray-700"}`}>
              {l}
            </button>
          ))}
        </div>
        <PdfButton targetId={pdfId} filename={`${title}_${view === "student" ? "学生ごと" : view === "question" ? "問題ごと" : "単元ごと"}`} />
      </div>

      {view === "student" && <Chips label="学生の並べ替え" value={ss} onChange={setSs} options={STUDENT_SORTS} />}
      {view === "question" && <Chips label="問題の並べ替え" value={qs} onChange={setQs} options={Q_SORTS} />}
      {view === "unit" && <Chips label="単元の並べ替え" value={us} onChange={setUs} options={RATE_SORTS} />}

      <div id={pdfId} className="bg-white">
        <p className="pb-1 text-sm font-semibold">
          {title}（{classLabel}）
          <span className="ml-2 text-[11px] font-normal text-gray-500">{view === "student" ? "学生ごと" : view === "question" ? "問題ごと" : "単元ごと"}</span>
        </p>

        {view === "student" && (
          <ul className="divide-y divide-gray-100">
            {students.map((s, i) => (
              <li key={i} className="flex items-center justify-between gap-3 py-2 text-sm">
                <button type="button" onClick={() => onPick(s.name)} className="min-w-0 truncate text-left text-sky-800 underline decoration-dotted">
                  {s.name}
                </button>
                <span className="shrink-0 text-xs">
                  {s.answered === 0 ? (
                    <span className="text-gray-400">未提出</span>
                  ) : (
                    <span className={`font-semibold ${rateClass(percent(s.correct, res.total))}`}>
                      {percent(s.correct, res.total)}点（{s.correct}/{res.total}問）
                    </span>
                  )}
                </span>
              </li>
            ))}
            {students.length === 0 && <li className="py-2 text-xs text-gray-500">学生がいません。</li>}
          </ul>
        )}

        {view === "question" && (
          <ul className="divide-y divide-gray-100">
            {questions.map((q) => (
              <li key={q.id} className="py-2">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] text-gray-400">{q.i + 1}. {q.label}</span>
                  <span className={`text-xs font-semibold ${q.rate >= 0 ? rateClass(Math.round(q.rate * 100)) : "text-gray-400"}`}>
                    {q.rate >= 0 ? `${percent(q.correct, q.answered)}%（${q.correct}/${q.answered}人）` : "解答なし"}
                  </span>
                </div>
                <p className="mt-0.5 text-xs leading-5 text-gray-600">{q.stem}</p>
              </li>
            ))}
          </ul>
        )}

        {view === "unit" && (
          <ul className="space-y-2">
            {unitRows.length === 0 && <li className="text-xs text-gray-500">まだ解答がありません。</li>}
            {unitRows.map((u) => {
              const r = percent(u.correct, u.answered);
              return (
                <li key={u.unit}>
                  <div className="flex items-center justify-between gap-3 text-xs">
                    <span className="min-w-0 truncate text-gray-800">{unitName(u.unit)}</span>
                    <span className={`shrink-0 font-semibold ${rateClass(r)}`}>{r}%（{u.correct}/{u.answered}）</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-gray-100" aria-hidden="true">
                    <div className="h-full rounded-full bg-gray-900" style={{ width: `${r}%` }} />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

function Pull({ title, note, right, children }: { title: string; note?: string; right?: React.ReactNode; children: React.ReactNode }) {
  return (
    <details className="group rounded-2xl bg-white shadow-sm">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3.5 text-sm font-semibold">
        <span>{title}</span>
        <span className="text-xs text-gray-400 group-open:rotate-180">▾</span>
      </summary>
      <div className="space-y-2 border-t border-gray-100 px-4 py-3">
        {note && <p className="text-[11px] text-gray-400">{note}</p>}
        {right}
        {children}
      </div>
    </details>
  );
}

// 先生用: クラスの状況。いちばん上が「テストごと」。学生ごと・単元ごと・正答率の低い問題は、プルダウンで開く
export default function ClassDashboardView({ classId }: { classId: string }) {
  const [data, setData] = useState<ClassDashboard | null | undefined>(undefined);
  const [scores, setScores] = useState<ClassScores | null>(null);
  const [units, setUnits] = useState<QuizUnit[]>([]);
  const [opened, setOpened] = useState<Set<string>>(new Set());
  const [trend, setTrend] = useState<string | null>(null);
  const [ss, setSs] = useState<StudentSort>("name");
  const [us, setUs] = useState<RateSort>("low");

  useEffect(() => {
    setData(undefined);
    getClassDashboard(classId).then(setData);
    getClassScores(classId).then(setScores);
    listQuizUnits().then(setUnits);
  }, [classId]);

  const classStudents = useMemo(() => {
    const l = (data?.students ?? []).map((s) => ({ ...s, rate: s.answered ? s.correct / s.answered : null }));
    if (ss === "name") return l.sort((a, b) => byName(a.name, b.name));
    return l.sort((a, b) => {
      if (a.rate === null || b.rate === null) return a.rate === b.rate ? byName(a.name, b.name) : a.rate === null ? 1 : -1;
      return (ss === "low" ? a.rate - b.rate : b.rate - a.rate) || byName(a.name, b.name);
    });
  }, [data, ss]);

  const unitRows = useMemo(() => [...(data?.units ?? [])].sort((a, b) => (us === "low" ? 1 : -1) * (a.correct / a.answered - b.correct / b.answered)), [data, us]);

  if (data === undefined) return <p className="py-10 text-center text-sm text-gray-400">読み込み中…</p>;
  if (data === null) return <p className="rounded-2xl bg-white p-6 text-center text-sm text-gray-600 shadow-sm">このクラスの状況を表示できません。</p>;

  const tests = [...(scores?.tests ?? [])].reverse(); // 新しいテストが上
  const answeredAll = data.students.reduce((a, s) => a + s.answered, 0);
  const correctAll = data.students.reduce((a, s) => a + s.correct, 0);

  return (
    <>
      <div>
        <p className="text-base font-semibold">{data.class_name}</p>
        <p className="mt-0.5 text-xs text-gray-500">
          学生 {data.members}人 ・ 公開中のテスト {data.assignments}件 ・ 平均正答率 {answeredAll === 0 ? "-" : `${percent(correctAll, answeredAll)}%`}
        </p>
      </div>

      <section className="space-y-2">
        <p className="text-sm font-semibold">テストごと</p>
        {tests.length === 0 ? (
          <p className="rounded-2xl bg-white p-4 text-xs text-gray-500 shadow-sm">まだ公開したテストがありません。「テスト」から作って、配れます。</p>
        ) : (
          tests.map((t) => {
            const subs = (scores?.students ?? []).map((s) => s.scores[t.id]).filter((x) => x && x.a >= t.n);
            const avg = subs.length ? Math.round((subs.reduce((a, x) => a + x.c, 0) / subs.length / t.n) * 100) : null;
            return (
              <details
                key={t.id}
                className="group rounded-2xl bg-white shadow-sm"
                onToggle={(e) => {
                  if ((e.currentTarget as HTMLDetailsElement).open) setOpened((o) => new Set(o).add(t.id));
                }}
              >
                <summary className="cursor-pointer list-none px-4 py-3">
                  <div className="flex items-start justify-between gap-2">
                    <p className="min-w-0 truncate text-sm font-medium">{t.title}</p>
                    <span className="shrink-0 text-xs text-gray-500">提出 {subs.length}/{data.members}人 ▾</span>
                  </div>
                  <p className="mt-1 text-[11px] text-gray-500">
                    {new Date(t.created_at).toLocaleDateString("ja-JP")} ・ {t.n}問 ・ {dueText(t.due_at)}
                    {avg !== null ? ` ・ 平均点 ${avg}点` : ""}
                  </p>
                </summary>
                <div className="border-t border-gray-100 px-4 py-3">
                  {opened.has(t.id) && <TestDetail id={t.id} title={t.title} classLabel={data.class_name} units={units} onPick={setTrend} />}
                </div>
              </details>
            );
          })
        )}
      </section>

      <Pull title="学生ごと" note="配ったテスト全体での正答率です。名前をタップすると、その学生の得点の推移が見られます。" right={<Chips label="学生の並べ替え" value={ss} onChange={setSs} options={STUDENT_SORTS} />}>
        <div className="flex justify-end">
          <PdfButton targetId="class-students-pdf" filename={`${data.class_name}_学生ごと`} />
        </div>
        <div id="class-students-pdf" className="bg-white">
          <p className="pb-1 text-sm font-semibold">{data.class_name} 学生ごと</p>
          {classStudents.length === 0 ? (
            <p className="text-xs text-gray-500">クラスに学生がいません。参加コードを伝えてください。</p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {classStudents.map((s, i) => (
                <li key={i} className="flex items-center justify-between gap-3 py-2 text-sm">
                  <button type="button" onClick={() => setTrend(s.name)} className="min-w-0 truncate text-left text-sky-800 underline decoration-dotted">
                    {s.name}
                  </button>
                  <span className="shrink-0 text-xs">
                    {s.rate === null ? <span className="text-gray-400">未着手</span> : <span className={`font-semibold ${rateClass(Math.round(s.rate * 100))}`}>{percent(s.correct, s.answered)}%（{s.correct}/{s.answered}問）</span>}
                    {s.overdue > 0 && <span className="ml-2 text-red-600">未提出 {s.overdue}件</span>}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Pull>

      <Pull title="単元ごとの正答率" note="授業で補う単元の目安になります。" right={<Chips label="単元の並べ替え" value={us} onChange={setUs} options={RATE_SORTS} />}>
        <div className="flex justify-end">
          <PdfButton targetId="class-units-pdf" filename={`${data.class_name}_単元ごと`} />
        </div>
        <div id="class-units-pdf" className="bg-white">
          <p className="pb-1 text-sm font-semibold">{data.class_name} 単元ごとの正答率</p>
          {unitRows.length === 0 ? (
            <p className="text-xs text-gray-500">まだ解答がありません。</p>
          ) : (
            <ul className="space-y-2">
              {unitRows.map((u) => {
                const r = percent(u.correct, u.answered);
                return (
                  <li key={u.name}>
                    <div className="flex items-center justify-between gap-3 text-xs">
                      <span className="min-w-0 truncate text-gray-800">{u.name}</span>
                      <span className={`shrink-0 font-semibold ${rateClass(r)}`}>{r}%（{u.correct}/{u.answered}）</span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-gray-100" aria-hidden="true">
                      <div className="h-full rounded-full bg-gray-900" style={{ width: `${r}%` }} />
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </Pull>

      <Pull title="正答率の低い問題" note="2人以上が解いた問題から、低い順に最大10問。">
        <div className="flex justify-end">
          <PdfButton targetId="class-weak-pdf" filename={`${data.class_name}_正答率の低い問題`} />
        </div>
        <div id="class-weak-pdf" className="bg-white">
          <p className="pb-1 text-sm font-semibold">{data.class_name} 正答率の低い問題</p>
          {data.weak.length === 0 ? (
            <p className="text-xs text-gray-500">まだありません。</p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {data.weak.map((q) => (
                <li key={q.id} className="py-2">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[11px] text-gray-400">{q.label}</span>
                    <span className={`text-xs font-semibold ${rateClass(percent(q.correct, q.answered))}`}>{percent(q.correct, q.answered)}%（{q.correct}/{q.answered}人）</span>
                  </div>
                  <p className="mt-0.5 text-xs leading-5 text-gray-600">
                    {q.stem}
                    {q.stem.length >= 80 ? "…" : ""}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Pull>

      {trend && scores && <StudentTrend scores={scores} name={trend} onClose={() => setTrend(null)} />}
    </>
  );
}
