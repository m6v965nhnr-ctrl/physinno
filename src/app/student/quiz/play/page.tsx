"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import ReportButton from "@/components/ReportButton";
import { notify } from "@/lib/notify";
import { useMyAccount } from "@/lib/useMyAccount";
import {
  QuizMode,
  QuizQuestion,
  QuizReveal,
  MODES,
  answerQuestion,
  imageUrl,
  listQuizQuestions,
  listQuizUnits,
  percent,
  questionLabel,
  revealQuestion,
  toggleBookmark,
} from "@/lib/quiz";
import { answerAssignmentQuestion, listAssignmentQuestions } from "@/lib/quizClass";

type Params = {
  unit: string | null;
  exam: number | null;
  mode: QuizMode;
  n: number;
  shuffle: boolean;
  assignment: string | null; // クラスの課題のとき、課題のid
};

function readParams(): Params {
  const q = new URLSearchParams(window.location.search);
  const mode = (q.get("mode") ?? "all") as QuizMode;
  const n = Number(q.get("n") ?? 20);
  return {
    unit: q.get("unit"),
    exam: q.get("exam") ? Number(q.get("exam")) : null,
    mode: MODES.includes(mode) ? mode : "all",
    n: Number.isFinite(n) ? n : 20,
    shuffle: q.get("order") !== "seq",
    assignment: q.get("assignment"),
  };
}

type Result = { question: QuizQuestion; chosen: number[]; correct: boolean | null };

// 一問一答の画面。選ぶとすぐに正誤と正答が出る
export default function QuizPlayPage() {
  const { loading } = useMyAccount(["student", "pt"]);

  const [params, setParams] = useState<Params | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[] | null>(null);
  const [unitNames, setUnitNames] = useState<Record<string, string>>({});

  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  const [reveal, setReveal] = useState<QuizReveal | null>(null);
  const [busy, setBusy] = useState(false);
  const [results, setResults] = useState<Result[]>([]);
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>({});

  const load = useCallback(async (p: Params) => {
    setQuestions(null);
    setIdx(0);
    setSelected([]);
    setReveal(null);
    setResults([]);

    // クラスの課題: 前に答えた問題は飛ばして、続きから始める
    if (p.assignment) {
      const aqs = await listAssignmentQuestions(p.assignment);
      const answered = aqs.filter((x) => x.my_chosen !== null);
      setResults(answered.map((x) => ({ question: x, chosen: x.my_chosen ?? [], correct: x.my_correct })));
      const firstOpen = aqs.findIndex((x) => x.my_chosen === null);
      setIdx(firstOpen === -1 ? aqs.length : firstOpen);
      setQuestions(aqs);
      setBookmarks(Object.fromEntries(aqs.map((x) => [x.id, x.bookmarked])));
      return;
    }

    const qs = await listQuizQuestions({
      unit: p.unit,
      exam: p.exam,
      mode: p.mode,
      limit: p.n === 0 ? null : p.n,
      shuffle: p.shuffle,
    });
    setQuestions(qs);
    setBookmarks(Object.fromEntries(qs.map((q) => [q.id, q.bookmarked])));
  }, []);

  useEffect(() => {
    if (loading) return;
    const p = readParams();
    setParams(p);
    load(p);
    listQuizUnits().then((us) => setUnitNames(Object.fromEntries(us.map((u) => [u.id, u.name]))));
  }, [loading, load]);

  const q = questions && idx < questions.length ? questions[idx] : null;
  const done = questions !== null && idx >= questions.length;

  // 正解として認める選択肢のすべて(いずれかを選べば正解になる問題もある)
  const answerUnion = useMemo(() => {
    if (!reveal) return new Set<number>();
    return new Set(reveal.answers.flat());
  }, [reveal]);

  async function submit(choice: number[]) {
    if (!q || busy || reveal) return;
    setBusy(true);
    const r = params?.assignment
      ? await answerAssignmentQuestion(params.assignment, q.id, choice)
      : await answerQuestion(q.id, choice);
    setBusy(false);

    if (!r) {
      notify("答え合わせに失敗しました。もう一度お試しください");
      return;
    }

    setSelected(choice);
    setReveal(r);
    setResults((prev) => [...prev, { question: q, chosen: choice, correct: Boolean(r.correct) }]);
  }

  function handlePick(n: number) {
    if (!q || reveal || busy) return;

    if (q.need === 1) {
      submit([n]);
      return;
    }

    setSelected((prev) =>
      prev.includes(n) ? prev.filter((x) => x !== n) : prev.length >= q.need ? prev : [...prev, n].sort()
    );
  }

  async function handleReveal() {
    if (!q || busy || reveal) return;
    setBusy(true);
    const r = await revealQuestion(q.id);
    setBusy(false);

    if (!r) {
      notify("正答を取得できませんでした。もう一度お試しください");
      return;
    }

    setReveal({ ...r, correct: undefined });
    setResults((prev) => [...prev, { question: q, chosen: [], correct: null }]);
  }

  function next() {
    setIdx((i) => i + 1);
    setSelected([]);
    setReveal(null);
    window.scrollTo({ top: 0 });
  }

  async function handleBookmark() {
    if (!q) return;
    const v = await toggleBookmark(q.id);
    if (v === null) {
      notify("ブックマークに失敗しました");
      return;
    }
    setBookmarks((b) => ({ ...b, [q.id]: v }));
  }

  if (loading || !params || questions === null) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-sm text-gray-400">読み込み中…</p>
      </main>
    );
  }

  const isAssignment = Boolean(params.assignment);
  const backHref = isAssignment ? "/student/quiz/classes" : "/student/quiz";
  const scope = isAssignment
    ? "クラスの課題"
    : params.unit
      ? unitNames[params.unit] ?? ""
      : params.exam
        ? `第${params.exam}回`
        : "全範囲";

  if (questions.length === 0) {
    return (
      <main className="min-h-screen bg-[#fafafa] px-6 py-10">
        <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 text-center shadow-sm">
          <p className="text-sm text-gray-600">
            {isAssignment ? "この課題を開けません。クラスから退出したか、課題が削除された可能性があります。" : "この条件に合う問題はありません。"}
          </p>
          <Link href={backHref} className="mt-4 inline-block rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white">
            戻る
          </Link>
        </div>
      </main>
    );
  }

  if (done) {
    const scored = results.filter((r) => r.correct !== null);
    const ok = scored.filter((r) => r.correct).length;
    const wrong = results.filter((r) => r.correct === false);

    const wrongParams: Params = { unit: params.unit, exam: params.exam, mode: "wrong", n: 0, shuffle: true, assignment: null };

    return (
      <main className="min-h-screen bg-[#fafafa] pb-28">
        <header className="border-b border-gray-100 bg-white px-6 py-5">
          <div className="mx-auto max-w-2xl">
            <p className="text-xs text-gray-400">{scope}</p>
            <h1 className="mt-1 text-xl font-semibold tracking-tight">お疲れさまでした</h1>
          </div>
        </header>

        <div className="mx-auto max-w-2xl space-y-4 px-6 py-5">
          <section className="rounded-2xl bg-white p-5 text-center shadow-sm">
            <p className="text-xs text-gray-500">今回の結果</p>
            <p className="mt-1 text-4xl font-bold tracking-tight">
              {ok}
              <span className="text-lg font-medium text-gray-500"> / {scored.length}問 正解</span>
            </p>
            <p className="mt-1 text-sm text-gray-500">正答率 {percent(ok, scored.length)}%</p>
          </section>

          {wrong.length > 0 && (
            <section className="rounded-2xl bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold">間違えた問題</p>
              <ul className="mt-2 space-y-2">
                {wrong.map((r) => (
                  <li key={r.question.id} className="text-sm leading-6 text-gray-700">
                    <span className="mr-2 rounded-full bg-red-50 px-2 py-0.5 text-[10px] text-red-600">
                      {questionLabel(r.question)}
                    </span>
                    {r.question.stem.slice(0, 60)}
                    {r.question.stem.length > 60 ? "…" : ""}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="grid gap-2">
            {!isAssignment && (
              <button
                onClick={() => load(params)}
                className="rounded-full bg-black py-2.5 text-sm font-medium text-white"
              >
                もう一度、同じ条件で解く
              </button>
            )}
            {wrong.length > 0 && !isAssignment && (
              <button
                onClick={() => {
                  setParams(wrongParams);
                  load(wrongParams);
                }}
                className="rounded-full border border-gray-300 py-2.5 text-center text-sm text-gray-800"
              >
                間違えた問題だけ、復習する
              </button>
            )}
            <Link href={backHref} className="rounded-full border border-gray-300 py-2.5 text-center text-sm text-gray-800">
              {isAssignment ? "課題の一覧に戻る" : "単元の一覧に戻る"}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (!q) return null;

  const unitName = unitNames[q.unit];
  const needText = q.need > 1 ? `${q.need}つ選んでください` : null;

  function optionClass(n: number) {
    const base = "flex w-full items-start gap-3 rounded-xl border px-3 py-3 text-left text-sm leading-6 transition";
    if (reveal) {
      const isAnswer = answerUnion.has(n);
      const isChosen = selected.includes(n);
      if (isAnswer) return `${base} border-emerald-500 bg-emerald-50 text-emerald-900`;
      if (isChosen) return `${base} border-red-400 bg-red-50 text-red-800`;
      return `${base} border-gray-200 text-gray-400`;
    }
    return `${base} ${selected.includes(n) ? "border-gray-900 bg-gray-50" : "border-gray-200 bg-white hover:bg-gray-50"}`;
  }

  return (
    <main className="min-h-screen bg-[#fafafa] pb-28">
      <header className="sticky top-0 z-10 border-b border-gray-100 bg-white px-6 py-3">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <Link href={backHref} className="text-gray-400">
              ← {isAssignment ? "あとで続ける" : "やめる"}
            </Link>
            <span>
              {scope} ・ {idx + 1} / {questions.length}
            </span>
          </div>
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-gray-100" aria-hidden="true">
            <div className="h-full bg-emerald-500" style={{ width: `${(idx / questions.length) * 100}%` }} />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-2xl space-y-4 px-6 py-5">
        <div className="flex items-center justify-between">
          <p className="text-[11px] text-gray-400">
            {questionLabel(q)}
            {unitName ? ` ・ ${unitName}` : ""}
          </p>
          <button
            onClick={handleBookmark}
            aria-pressed={bookmarks[q.id]}
            className={`rounded-full border px-3 py-1 text-xs ${
              bookmarks[q.id] ? "border-amber-400 bg-amber-50 text-amber-700" : "border-gray-300 text-gray-500"
            }`}
          >
            {bookmarks[q.id] ? "★ ブックマーク済み" : "☆ ブックマーク"}
          </button>
        </div>

        <section className="space-y-3 rounded-2xl bg-white p-4 shadow-sm">
          {q.intro && <p className="rounded-xl bg-gray-50 p-3 text-xs leading-6 text-gray-600">{q.intro}</p>}
          <p className="whitespace-pre-wrap text-sm leading-7 text-gray-900">{q.stem}</p>

          {q.book_images.map((p) => (
            <img
              key={p}
              loading="lazy"
              decoding="async"
              src={imageUrl(p)}
              alt="問題に付いている別冊の図"
              className="mx-auto max-h-[28rem] w-full rounded-xl border border-gray-100 object-contain"
            />
          ))}
          {q.image && (
            <img
              loading="lazy"
              decoding="async"
              src={imageUrl(q.image)}
              alt="問題の図"
              className="mx-auto max-h-[36rem] w-full rounded-xl border border-gray-100 object-contain"
            />
          )}

          {needText && <p className="text-xs font-semibold text-amber-700">{needText}</p>}
        </section>

        {q.choices_in_image ? (
          <div className="grid grid-cols-5 gap-2" role="group" aria-label="選択肢">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => handlePick(n)}
                aria-pressed={selected.includes(n)}
                className={`${optionClass(n)} justify-center`}
              >
                {n}
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-2" role="group" aria-label="選択肢">
            {q.choices.map((c, i) => (
              <button key={i} onClick={() => handlePick(i + 1)} aria-pressed={selected.includes(i + 1)} className={optionClass(i + 1)}>
                <span className="shrink-0 font-semibold">{i + 1}</span>
                <span className="min-w-0">{c}</span>
              </button>
            ))}
          </div>
        )}

        {!reveal && (
          <div className="flex gap-2">
            {q.need > 1 && (
              <button
                onClick={() => submit(selected)}
                disabled={selected.length !== q.need || busy}
                className="flex-1 rounded-full bg-black py-2.5 text-sm font-medium text-white disabled:opacity-40"
              >
                答え合わせ
              </button>
            )}
            {!isAssignment && (
              <button
                onClick={handleReveal}
                disabled={busy}
                className={`rounded-full border border-gray-300 px-5 py-2.5 text-sm text-gray-700 disabled:opacity-40 ${
                  q.need > 1 ? "" : "flex-1"
                }`}
              >
                答えを見る
              </button>
            )}
          </div>
        )}

        {reveal && (
          <section className="space-y-3">
            <div
              className={`rounded-2xl p-4 ${
                reveal.correct === true
                  ? "bg-emerald-50 text-emerald-900"
                  : reveal.correct === false
                    ? "bg-red-50 text-red-800"
                    : "bg-gray-100 text-gray-800"
              }`}
              role="status"
            >
              <p className="text-base font-bold">
                {reveal.correct === true ? "正解！" : reveal.correct === false ? "不正解" : "答え"}
              </p>
              <p className="mt-1 text-sm">
                正答:{" "}
                {reveal.answers.length === 0
                  ? "（この問題は、厚生労働省が採点の対象から除外しています）"
                  : reveal.answers.map((s) => s.join("・")).join(" または ")}
              </p>
              {reveal.answers.length > 1 && (
                <p className="mt-1 text-[11px] opacity-80">厚生労働省が、複数の答えを正解として認めた問題です。</p>
              )}
            </div>

            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold">解説</p>
              {reveal.explanation ? (
                <>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-gray-700">{reveal.explanation}</p>
                  {reveal.explanation_source === "ai" && (
                    <p className="mt-2 text-[11px] leading-5 text-gray-400">
                      この解説はAIが作成したもので、誤りを含むことがあります。教科書・ガイドラインで確認してください。
                    </p>
                  )}
                </>
              ) : (
                <p className="mt-2 text-xs leading-5 text-gray-400">
                  この問題の解説は、まだありません。正答は厚生労働省が公開しているものです。
                </p>
              )}

              {reveal.ref_url && (
                <p className="mt-3 text-xs leading-5 text-gray-500">
                  もっと詳しい解説は、外部サイトの{" "}
                  <a
                    href={reveal.ref_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    明日へブログ（この問題を含むページ）
                  </a>{" "}
                  も参考になります。
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <ReportButton targetType="quiz_question" targetId={q.id} />
              <button onClick={next} className="rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white">
                {idx + 1 >= questions.length ? "結果を見る" : "次の問題へ"}
              </button>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
