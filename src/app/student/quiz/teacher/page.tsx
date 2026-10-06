"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { notify } from "@/lib/notify";
import { useMyAccount } from "@/lib/useMyAccount";
import { QuizExam, QuizUnit, listQuizExams, listQuizUnits, percent } from "@/lib/quiz";
import {
  DIFFICULTY_LABEL,
  Difficulty,
  PoolCounts,
  TeacherAssignment,
  TeacherClass,
  TeacherStatus,
  archiveClass,
  createAssignment,
  createClass,
  dueText,
  getPoolCounts,
  getTeacherStatus,
  listAssignments,
  listMyClasses,
  requestTeacher,
} from "@/lib/quizClass";

const COUNT_OPTIONS = [5, 10, 20, 30, 50];

// 先生用: クラスを作って、参加コードを配り、課題（単元・回・難易度で選んだ問題）を出す
export default function QuizTeacherPage() {
  const { loading } = useMyAccount(["pt"], "/student/quiz");

  const [status, setStatus] = useState<TeacherStatus | null>(null);
  const [classes, setClasses] = useState<TeacherClass[]>([]);
  const [units, setUnits] = useState<QuizUnit[]>([]);
  const [exams, setExams] = useState<QuizExam[]>([]);

  const [school, setSchool] = useState("");
  const [note, setNote] = useState("");
  const [className, setClassName] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const st = await getTeacherStatus();
    setStatus(st);
    if (st === "approved") {
      const [cs, us, es] = await Promise.all([listMyClasses(), listQuizUnits(), listQuizExams()]);
      setClasses(cs);
      setUnits(us);
      setExams(es);
    }
  }, []);

  useEffect(() => {
    if (loading) return;
    load();
  }, [loading, load]);

  async function handleRequest() {
    if (!school.trim() || busy) return;
    setBusy(true);
    const ok = await requestTeacher(school.trim(), note.trim());
    setBusy(false);
    if (!ok) {
      notify("申請に失敗しました。もう一度お試しください");
      return;
    }
    notify("申請しました。運営が確認します");
    load();
  }

  async function handleCreateClass() {
    if (!className.trim() || busy) return;
    setBusy(true);
    const r = await createClass(className.trim());
    setBusy(false);
    if (!r) {
      notify("クラスを作れませんでした");
      return;
    }
    setClassName("");
    notify(`クラスを作りました。参加コード: ${r.join_code}`);
    load();
  }

  if (loading || status === null) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-sm text-gray-400">読み込み中…</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fafafa] pb-28">
      <header className="border-b border-gray-100 bg-white px-6 py-5">
        <div className="mx-auto max-w-2xl">
          <Link href="/student/quiz" className="text-sm text-gray-400">
            ← 過去問ドリル
          </Link>
          <h1 className="mt-2 text-xl font-semibold tracking-tight">先生用：クラスと課題</h1>
          <p className="mt-1 text-xs leading-5 text-gray-500">
            学生に課題を配って、結果をまとめて見られます。見えるのは、配った課題の結果（名前・正解・不正解）だけです。
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-2xl space-y-4 px-6 py-5">
        {(status === "none" || status === "rejected") && (
          <section className="space-y-3 rounded-2xl bg-white p-4 shadow-sm">
            <p className="text-sm font-semibold">先生として使うには、申請が必要です</p>
            <p className="text-xs leading-5 text-gray-500">
              養成校などで教えている方が対象です。運営が確認して承認すると、クラスと課題を作れるようになります。
              {status === "rejected" && " （前回の申請は承認されませんでした。内容を確かめて、もう一度申請できます）"}
            </p>
            <input
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              maxLength={100}
              placeholder="所属（学校名など）"
              aria-label="所属"
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
            />
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              maxLength={500}
              rows={3}
              placeholder="担当している科目や、確認に役立つことなど（任意）"
              aria-label="補足"
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
            />
            <button
              onClick={handleRequest}
              disabled={busy || !school.trim()}
              className="w-full rounded-full bg-black py-2.5 text-sm font-medium text-white disabled:opacity-40"
            >
              先生として申請する
            </button>
          </section>
        )}

        {status === "pending" && (
          <section className="rounded-2xl bg-white p-4 text-sm leading-6 text-gray-700 shadow-sm">
            申請を受け付けました。運営が確認しています。承認されると、この画面からクラスを作れます。
          </section>
        )}

        {status === "approved" && (
          <>
            <section className="space-y-2 rounded-2xl bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold">クラスを作る</p>
              <div className="flex gap-2">
                <input
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  maxLength={60}
                  placeholder="クラス名（例：3年A組 国試対策）"
                  aria-label="クラス名"
                  className="min-w-0 flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm"
                />
                <button
                  onClick={handleCreateClass}
                  disabled={busy || !className.trim()}
                  className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white disabled:opacity-40"
                >
                  作る
                </button>
              </div>
              <p className="text-xs leading-5 text-gray-400">
                作ると、6文字の参加コードが出ます。学生に伝えると、学生が「クラスの課題」から参加できます。
              </p>
            </section>

            {classes.length === 0 ? (
              <p className="rounded-2xl bg-white p-4 text-xs leading-5 text-gray-500 shadow-sm">
                クラスはまだありません。
              </p>
            ) : (
              classes.map((c) => <ClassCard key={c.id} cls={c} units={units} exams={exams} onChanged={load} />)
            )}
          </>
        )}
      </div>
    </main>
  );
}

function ClassCard({
  cls,
  units,
  exams,
  onChanged,
}: {
  cls: TeacherClass;
  units: QuizUnit[];
  exams: QuizExam[];
  onChanged: () => void;
}) {
  const [assignments, setAssignments] = useState<TeacherAssignment[] | null>(null);
  const [creating, setCreating] = useState(false);

  const [title, setTitle] = useState("");
  const [unit, setUnit] = useState("");
  const [exam, setExam] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("any");
  const [n, setN] = useState(10);
  const [due, setDue] = useState("");
  const [pool, setPool] = useState<PoolCounts | null>(null);
  const [busy, setBusy] = useState(false);

  const loadAssignments = useCallback(async () => {
    setAssignments(await listAssignments(cls.id));
  }, [cls.id]);

  useEffect(() => {
    loadAssignments();
  }, [loadAssignments]);

  // 条件に合う問題の数(難易度別)
  useEffect(() => {
    if (!creating) return;
    let cancelled = false;
    getPoolCounts(unit || null, exam ? Number(exam) : null).then((p) => {
      if (!cancelled) setPool(p);
    });
    return () => {
      cancelled = true;
    };
  }, [creating, unit, exam]);

  const available = pool
    ? difficulty === "any"
      ? pool.all_count
      : difficulty === "easy"
        ? pool.easy
        : difficulty === "normal"
          ? pool.normal
          : pool.hard
    : null;

  async function handleCreate() {
    if (!title.trim() || busy) return;
    if (available === 0) {
      notify("この条件に合う問題がありません。条件を変えてください");
      return;
    }
    setBusy(true);
    const id = await createAssignment({
      classId: cls.id,
      title: title.trim(),
      unit: unit || null,
      exam: exam ? Number(exam) : null,
      difficulty,
      n,
      due: due ? `${due}T23:59:59+09:00` : null,
    });
    setBusy(false);
    if (!id) {
      notify("課題を作れませんでした");
      return;
    }
    notify("課題を配りました");
    setCreating(false);
    setTitle("");
    setDue("");
    loadAssignments();
    onChanged();
  }

  async function handleArchive() {
    if (!confirm(`「${cls.name}」を閉じます。学生には、このクラスの課題が見えなくなります。よろしいですか？`)) return;
    const ok = await archiveClass(cls.id);
    if (!ok) {
      notify("クラスを閉じられませんでした");
      return;
    }
    onChanged();
  }

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(cls.join_code);
      notify("参加コードをコピーしました");
    } catch {
      notify(`参加コード: ${cls.join_code}`);
    }
  }

  return (
    <section className="space-y-3 rounded-2xl bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{cls.name}</p>
          <p className="mt-0.5 text-xs text-gray-500">学生 {cls.member_count}人 ・ 課題 {cls.assignment_count}件</p>
        </div>
        <button onClick={copyCode} className="shrink-0 rounded-xl bg-gray-50 px-3 py-2 text-center" aria-label="参加コードをコピー">
          <span className="block text-xs text-gray-400">参加コード（タップでコピー）</span>
          <span className="block text-lg font-bold tracking-[0.25em]">{cls.join_code}</span>
        </button>
      </div>

      {assignments && assignments.length > 0 && (
        <ul className="space-y-2">
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
                <p className="mt-1 text-xs text-gray-500">
                  {a.n}問 ・ {dueText(a.due_at)}
                  {a.answered_total > 0 ? ` ・ 平均正答率 ${percent(a.correct_total, a.answered_total)}%` : ""}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {!creating ? (
        <div className="flex items-center justify-between">
          <button onClick={() => setCreating(true)} className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white">
            課題を作る
          </button>
          <button onClick={handleArchive} className="text-xs text-gray-400 underline">
            このクラスを閉じる
          </button>
        </div>
      ) : (
        <div className="space-y-3 rounded-xl bg-gray-50 p-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={80}
            placeholder="課題の名前（例：運動学 第1回）"
            aria-label="課題の名前"
            className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm"
          />

          <div className="grid grid-cols-2 gap-2">
            <label className="text-xs text-gray-500">
              単元
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-2 py-2 text-sm text-gray-900"
              >
                <option value="">すべて</option>
                {units.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-xs text-gray-500">
              回
              <select
                value={exam}
                onChange={(e) => setExam(e.target.value)}
                className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-2 py-2 text-sm text-gray-900"
              >
                <option value="">すべて</option>
                {exams.map((x) => (
                  <option key={x.exam_no} value={x.exam_no}>
                    第{x.exam_no}回
                  </option>
                ))}
              </select>
            </label>
          </div>

          <fieldset>
            <legend className="text-xs text-gray-500">難易度（全ユーザーの正答率から決まります）</legend>
            <div className="mt-1 space-y-1">
              {(Object.keys(DIFFICULTY_LABEL) as Difficulty[]).map((d) => {
                const count = pool ? (d === "any" ? pool.all_count : pool[d]) : null;
                return (
                  <label key={d} className="flex items-center gap-2 text-sm">
                    <input type="radio" name={`diff-${cls.id}`} checked={difficulty === d} onChange={() => setDifficulty(d)} />
                    <span>{DIFFICULTY_LABEL[d]}</span>
                    {count !== null && <span className="text-xs text-gray-400">{count}問</span>}
                  </label>
                );
              })}
            </div>
            <p className="mt-1 text-xs leading-5 text-gray-400">
              難易度は、5人以上が解いた問題にだけ付きます。解いた人が少ないうちは、「指定しない」がおすすめです。
            </p>
          </fieldset>

          <div className="grid grid-cols-2 gap-2">
            <label className="text-xs text-gray-500">
              問題数
              <select
                value={n}
                onChange={(e) => setN(Number(e.target.value))}
                className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-2 py-2 text-sm text-gray-900"
              >
                {COUNT_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}問
                  </option>
                ))}
              </select>
            </label>
            <label className="text-xs text-gray-500">
              期限（任意）
              <input
                type="date"
                value={due}
                onChange={(e) => setDue(e.target.value)}
                className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-2 py-2 text-sm text-gray-900"
              />
            </label>
          </div>

          {available !== null && available < n && available > 0 && (
            <p className="text-xs text-amber-700">この条件に合う問題は{available}問です。{available}問で配ります。</p>
          )}

          <div className="flex gap-2">
            <button
              onClick={handleCreate}
              disabled={busy || !title.trim() || available === 0}
              className="flex-1 rounded-full bg-black py-2.5 text-sm font-medium text-white disabled:opacity-40"
            >
              この条件で、ランダムに選んで配る
            </button>
            <button onClick={() => setCreating(false)} className="rounded-full border border-gray-300 px-4 py-2.5 text-sm text-gray-700">
              やめる
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
