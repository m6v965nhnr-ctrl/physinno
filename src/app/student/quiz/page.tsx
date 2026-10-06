"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMyAccount } from "@/lib/useMyAccount";
import {
  MODES,
  MODE_LABEL,
  QuizExam,
  QuizMode,
  QuizModeCounts,
  QuizUnit,
  getModeCounts,
  listQuizExams,
  listQuizUnits,
  percent,
} from "@/lib/quiz";

type Target = { kind: "unit"; id: string; name: string } | { kind: "exam"; id: number; name: string } | { kind: "all"; name: string };

const COUNTS = [10, 20, 50, 0];

function ProgressBar({ answered, total }: { answered: number; total: number }) {
  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-gray-100" aria-hidden="true">
      <div className="h-full rounded-full bg-emerald-500" style={{ width: `${percent(answered, total)}%` }} />
    </div>
  );
}

// 過去問ドリル: 単元ごと・回ごとに、理学療法士国家試験の過去問を一問一答で解く
export default function QuizHomePage() {
  const router = useRouter();
  const { loading, accountType } = useMyAccount(["student", "pt"]);
  const titleId = useId();

  const [tab, setTab] = useState<"unit" | "exam">("unit");
  const [units, setUnits] = useState<QuizUnit[] | null>(null);
  const [exams, setExams] = useState<QuizExam[] | null>(null);

  const [target, setTarget] = useState<Target | null>(null);
  const [counts, setCounts] = useState<QuizModeCounts | null>(null);
  const [mode, setMode] = useState<QuizMode>("all");
  const [n, setN] = useState(20);
  const [shuffle, setShuffle] = useState(true);

  useEffect(() => {
    if (loading) return;
    listQuizUnits().then(setUnits);
    listQuizExams().then(setExams);
  }, [loading]);

  useEffect(() => {
    if (!target) return;
    setCounts(null);
    getModeCounts(target.kind === "unit" ? target.id : null, target.kind === "exam" ? target.id : null).then(
      (c) => {
        setCounts(c);
        // 前回間違えた問題があれば、最初からそれを選んでおく
        setMode(c.wrong > 0 ? "wrong" : c.unanswered > 0 ? "unanswered" : "all");
      }
    );
  }, [target]);

  useEffect(() => {
    if (!target) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setTarget(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [target]);

  if (loading || !units) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-sm text-gray-400">読み込み中…</p>
      </main>
    );
  }

  const total = units.reduce((a, u) => a + u.total, 0);
  const answered = units.reduce((a, u) => a + u.answered, 0);
  const correct = units.reduce((a, u) => a + u.correct, 0);

  const fields = Array.from(new Set(units.map((u) => u.field)));

  function start() {
    if (!target) return;
    const q = new URLSearchParams();
    if (target.kind === "unit") q.set("unit", target.id);
    if (target.kind === "exam") q.set("exam", String(target.id));
    q.set("mode", mode);
    q.set("n", String(n));
    q.set("order", shuffle ? "random" : "seq");
    router.push(`/student/quiz/play?${q.toString()}`);
  }

  const countOf = (m: QuizModeCounts, k: QuizMode) =>
    k === "all" ? m.all_count : k === "unanswered" ? m.unanswered : k === "wrong" ? m.wrong : m.bookmarked;

  return (
    <main className="min-h-screen bg-[#fafafa] pb-28">
      <header className="border-b border-gray-100 bg-white px-6 py-5">
        <div className="mx-auto max-w-2xl">
          <Link href={accountType === "student" ? "/student" : "/home"} className="text-sm text-gray-400">
            ← {accountType === "student" ? "学生ホーム" : "ホーム"}
          </Link>
          <h1 className="mt-2 text-xl font-semibold tracking-tight">過去問ドリル</h1>
          <p className="mt-1 text-xs leading-5 text-gray-500">
            理学療法士国家試験の過去問を、単元ごとに一問一答で。答えはその場で確認できます。
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-2xl space-y-4 px-6 py-5">
        <section className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs text-gray-500">あなたの進み具合</p>
              <p className="mt-1 text-2xl font-bold tracking-tight">
                {answered}
                <span className="ml-1 text-sm font-medium text-gray-500">/ {total}問 解いた</span>
              </p>
              <p className="mt-0.5 text-xs text-gray-500">そのうち正解 {correct}問</p>
            </div>
            <p className="text-right text-xs text-gray-500">
              正答率（最後の答えで数えます）
              <span className="ml-1 text-lg font-bold text-gray-900">{percent(correct, answered)}%</span>
            </p>
          </div>
          <div className="mt-3">
            <ProgressBar answered={answered} total={total} />
          </div>
          <button
            onClick={() => setTarget({ kind: "all", name: "すべての問題" })}
            className="mt-3 w-full rounded-full bg-black py-2.5 text-sm font-medium text-white"
          >
            全範囲からランダムに解く
          </button>
        </section>

        <div className="flex gap-1 rounded-full bg-gray-100 p-1 text-sm" role="tablist">
          {(
            [
              ["unit", "単元ごと"],
              ["exam", "回ごと"],
            ] as const
          ).map(([k, label]) => (
            <button
              key={k}
              role="tab"
              aria-selected={tab === k}
              onClick={() => setTab(k)}
              className={`flex-1 rounded-full px-2 py-2 ${
                tab === k ? "bg-white font-semibold text-gray-900 shadow-sm" : "text-gray-500"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "unit" &&
          fields.map((f) => (
            <section key={f}>
              <h2 className="mb-2 text-xs font-semibold text-gray-500">{f}</h2>
              <div className="space-y-2">
                {units
                  .filter((u) => u.field === f && u.total > 0)
                  .map((u) => (
                    <button
                      key={u.id}
                      onClick={() => setTarget({ kind: "unit", id: u.id, name: u.name })}
                      className="block w-full rounded-2xl bg-white p-4 text-left shadow-sm transition hover:bg-gray-50"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-sm font-semibold">{u.name}</span>
                        <span className="shrink-0 text-xs text-gray-500">{u.total}問</span>
                      </div>
                      <div className="mt-2">
                        <ProgressBar answered={u.answered} total={u.total} />
                      </div>
                      <p className="mt-1.5 text-[11px] text-gray-400">
                        {u.answered === 0 ? "まだ解いていません" : `${u.answered}問 解いた ・ 正解 ${u.correct}問 ・ 正答率 ${percent(u.correct, u.answered)}%`}
                      </p>
                    </button>
                  ))}
              </div>
            </section>
          ))}

        {tab === "exam" && (
          <div className="space-y-2">
            {(exams ?? []).map((e) => (
              <button
                key={e.exam_no}
                onClick={() => setTarget({ kind: "exam", id: e.exam_no, name: `第${e.exam_no}回` })}
                className="block w-full rounded-2xl bg-white p-4 text-left shadow-sm transition hover:bg-gray-50"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="text-sm font-semibold">第{e.exam_no}回 理学療法士国家試験</span>
                  <span className="shrink-0 text-xs text-gray-500">{e.total}問</span>
                </div>
                <div className="mt-2">
                  <ProgressBar answered={e.answered} total={e.total} />
                </div>
                <p className="mt-1.5 text-[11px] text-gray-400">
                  {e.answered === 0 ? "まだ解いていません" : `${e.answered}問 解いた ・ 正解 ${e.correct}問 ・ 正答率 ${percent(e.correct, e.answered)}%`}
                </p>
              </button>
            ))}
          </div>
        )}

        <p className="text-[11px] leading-5 text-gray-400">
          問題・正答の出典: 厚生労働省ホームページ（理学療法士国家試験の問題および正答）。画面に表示するにあたり、問題の整形と単元の分類をしています。
          分類や文字の読み取りに誤りがある場合は、問題の画面の「通報」からお知らせください。
          図の問題は、厚生労働省が公開している図をそのまま表示しています。
        </p>
      </div>

      {target && (
        <div
          className="fixed inset-0 z-[10000] flex items-end justify-center bg-black/40 sm:items-center"
          onClick={() => setTarget(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[92vh] w-full max-w-md space-y-4 overflow-y-auto rounded-t-3xl bg-white p-5 sm:rounded-3xl"
          >
            <div className="flex items-start justify-between">
              <h3 id={titleId} className="text-base font-semibold text-gray-900">
                {target.name}
              </h3>
              <button
                onClick={() => setTarget(null)}
                aria-label="閉じる"
                className="text-xl leading-none text-gray-400"
              >
                ×
              </button>
            </div>

            <fieldset>
              <legend className="text-xs text-gray-500">出題する問題</legend>
              <div className="mt-2 space-y-2">
                {MODES.map((m) => {
                  const c = counts ? countOf(counts, m) : null;
                  const disabled = c === 0;
                  return (
                    <label
                      key={m}
                      className={`flex items-center justify-between rounded-xl border px-3 py-2.5 text-sm ${
                        mode === m ? "border-gray-900 bg-gray-50" : "border-gray-200"
                      } ${disabled ? "opacity-40" : ""}`}
                    >
                      <span className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="quiz-mode"
                          checked={mode === m}
                          disabled={disabled}
                          onChange={() => setMode(m)}
                        />
                        {MODE_LABEL[m]}
                      </span>
                      <span className="text-xs text-gray-500">{c === null ? "…" : `${c}問`}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-xs text-gray-500">問題数</legend>
              <div className="mt-2 flex gap-2">
                {COUNTS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setN(c)}
                    aria-pressed={n === c}
                    className={`flex-1 rounded-full border px-2 py-2 text-sm ${
                      n === c ? "border-gray-900 bg-gray-900 text-white" : "border-gray-300 text-gray-700"
                    }`}
                  >
                    {c === 0 ? "全部" : `${c}問`}
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" checked={shuffle} onChange={(e) => setShuffle(e.target.checked)} />
              ランダムな順番にする
            </label>

            <button
              onClick={start}
              disabled={!counts || countOf(counts, mode) === 0}
              className="w-full rounded-full bg-black py-2.5 text-sm font-medium text-white disabled:opacity-40"
            >
              解き始める
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
