"use client";

import LineShareButton from "@/components/LineShareButton";
import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import ReportButton from "@/components/ReportButton";
import { notify } from "@/lib/notify";
import { scrollPageToTop } from "@/lib/scroll";
import { useMyAccount } from "@/lib/useMyAccount";
import {
  QuizMode,
  QuizQuestion,
  QuizReveal,
  MODES,
  answerQuestion,
  imageUrl,
  listQuizQuestions,
  type QuizKeyword,
  listQuizUnits,
  percent,
  questionLabel,
  revealQuestion,
  toggleBookmark,
} from "@/lib/quiz";
import { answerAssignmentQuestion, listAssignmentQuestions } from "@/lib/quizClass";
import { shareContent, shareUrl } from "@/lib/share";
import { LoadingScreen } from "@/components/states";

type Params = {
  unit: string | null;
  exam: number | null;
  mode: QuizMode;
  n: number;
  shuffle: boolean;
  assignment: string | null; // クラスの課題のとき、課題のid
  keyword: QuizKeyword | null; // キーワードで絞ったとき
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
    keyword: q.get("kw")
      ? {
          keyword: (q.get("kw") ?? "").slice(0, 50),
          related: (q.get("rel") ?? "").split("|").map((t) => t.trim()).filter(Boolean).slice(0, 12),
        }
      : null,
  };
}

type Result = { question: QuizQuestion; chosen: number[]; correct: boolean | null };

// 結果の画面で、間違えた問題をひらいたときの中身（選択肢・自分の選択・正答・解説）
function ReviewPanel({ q, chosen, reveal }: { q: QuizQuestion; chosen: number[]; reveal: QuizReveal | undefined }) {
  if (!reveal) return <p className="mt-2 px-1 text-xs text-gray-400">読み込み中…</p>;
  const correctSet = new Set(reveal.answers.flat());
  const mine = new Set(chosen);
  return (
    <div className="mt-2 space-y-2 rounded-xl bg-white p-3 text-sm leading-7 text-gray-800">
      {q.intro && <p className="rounded-lg bg-gray-50 p-2 text-xs leading-6 text-gray-600">{q.intro}</p>}
      <p className="whitespace-pre-wrap">{q.stem}</p>
      {q.image && (
        <img src={imageUrl(q.image)} alt="問題の図" loading="lazy" decoding="async" className="mx-auto max-h-80 w-full rounded-lg border border-gray-100 object-contain" />
      )}
      {q.choices_in_image ? (
        <p className="text-xs text-gray-600">
          選択肢は、図の中にあります。あなたの選択: {chosen.length ? chosen.join("・") : "なし"} ／ 正答: {reveal.answers.length === 0 ? "（採点対象外）" : reveal.answers.map((g) => g.join("・")).join(" または ")}
        </p>
      ) : (
        <ol className="space-y-1">
          {q.choices.map((c, i) => {
            const n = i + 1;
            const isCorrect = correctSet.has(n);
            const isMine = mine.has(n);
            return (
              <li
                key={n}
                className={`rounded-lg px-2 py-1 text-sm ${
                  isCorrect ? "bg-emerald-50 text-emerald-900" : isMine ? "bg-red-50 text-red-800" : "text-gray-700"
                }`}
              >
                {n}. {c}
                {isCorrect && <span className="ml-1 text-xs font-semibold">（正答）</span>}
                {isMine && !isCorrect && <span className="ml-1 text-xs font-semibold">（あなたの選択）</span>}
                {isMine && isCorrect && <span className="ml-1 text-xs">（あなたの選択）</span>}
              </li>
            );
          })}
        </ol>
      )}
      {reveal.explanation ? (
        <div>
          <p className="text-xs font-semibold text-gray-700">解説</p>
          <p className="mt-1 whitespace-pre-wrap text-sm leading-7 text-gray-700">{reveal.explanation}</p>
          {reveal.explanation_source === "ai" && <p className="mt-1 text-[11px] text-gray-400">AIが作成した解説です。誤りを含むことがあります。</p>}
        </div>
      ) : (
        <p className="text-xs text-gray-500">この問題の解説は、まだありません。</p>
      )}
    </div>
  );
}

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
  // 結果の画面から、間違えた問題を開き直しているとき
  const [fromResults, setFromResults] = useState(false);
  // 課題の結果の画面で、ひらいている間違えた問題（その場でひらく）と、読み込んだ正答・解説
  const [openWrong, setOpenWrong] = useState<string | null>(null);
  const [reveals, setReveals] = useState<Record<string, QuizReveal>>({});

  const load = useCallback(async (p: Params) => {
    setQuestions(null);
    setIdx(0);
    setSelected([]);
    setReveal(null);
    setResults([]);
    setFromResults(false);

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
      keyword: p.keyword,
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
    scrollPageToTop();
  }

  async function toggleBm(id: string) {
    const v = await toggleBookmark(id);
    if (v === null) {
      notify("ブックマークに失敗しました");
      return;
    }
    setBookmarks((b) => ({ ...b, [id]: v }));
  }

  async function handleBookmark() {
    if (!q) return;
    await toggleBm(q.id);
  }

  // 結果の画面で、問題をタップ → その問題（正答・解説つき）に戻る
  async function toggleWrong(r: Result) {
    const id = r.question.id;
    if (openWrong === id) {
      setOpenWrong(null);
      return;
    }
    setOpenWrong(id);
    if (reveals[id]) return;
    const rv = await revealQuestion(id);
    if (!rv) {
      notify("問題を開けませんでした。もう一度お試しください");
      setOpenWrong(null);
      return;
    }
    setReveals((m) => ({ ...m, [id]: rv }));
  }

  async function openReview(r: Result) {
    if (!questions || busy) return;
    const i = questions.findIndex((x) => x.id === r.question.id);
    if (i < 0) return;
    setBusy(true);
    const rv = await revealQuestion(r.question.id);
    setBusy(false);
    if (!rv) {
      notify("問題を開けませんでした。もう一度お試しください");
      return;
    }
    setIdx(i);
    setSelected(r.chosen);
    setReveal({ ...rv, correct: r.correct === null ? undefined : r.correct });
    setFromResults(true);
    scrollPageToTop();
  }

  function backToResults() {
    if (!questions) return;
    setIdx(questions.length);
    setSelected([]);
    setReveal(null);
    setFromResults(false);
    scrollPageToTop();
  }

  if (loading || !params || questions === null) {
    return (
      <LoadingScreen />
    );
  }

  const isAssignment = Boolean(params.assignment);
  const backHref = isAssignment ? "/student/quiz/classes" : "/study";
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
            {isAssignment
              ? "この課題を開けません。クラスから退出したか、課題が削除された可能性があります。"
              : params.mode === "wrong"
                ? "間違えた問題は、いまありません。ぜんぶ解き直せました。この調子です。"
                : "この条件に合う問題はありません。"}
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

    const wrongParams: Params = { unit: params.unit, exam: params.exam, mode: "wrong", n: 0, shuffle: true, assignment: null, keyword: params.keyword };

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
              <p className="mt-0.5 text-[11px] text-gray-400">
                {isAssignment ? "問題文をタップすると、選択肢・正答・解説が開きます" : "問題文をタップすると、その問題（正答・解説つき）に戻れます"}
              </p>
              <ul className="mt-2 space-y-2">
                {wrong.map((r) => (
                  <li key={r.question.id} className="rounded-xl bg-gray-50 p-2.5">
                   <div className="flex items-start gap-2">
                    <button
                      type="button"
                      onClick={() => (isAssignment ? toggleWrong(r) : openReview(r))}
                      disabled={busy}
                      aria-expanded={isAssignment ? openWrong === r.question.id : undefined}
                      className="min-w-0 flex-1 text-left text-sm leading-6 text-gray-800"
                    >
                      <span className="mr-2 rounded-full bg-red-50 px-2 py-0.5 text-[10px] text-red-600">
                        {questionLabel(r.question)}
                      </span>
                      {r.question.stem.slice(0, 60)}
                      {r.question.stem.length > 60 ? "…" : ""}
                      <span className="ml-1 text-[11px] text-sky-700">
                        {isAssignment ? (openWrong === r.question.id ? "閉じる ▲" : "解説を見る ▼") : "解説を見る ›"}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleBm(r.question.id)}
                      aria-pressed={!!bookmarks[r.question.id]}
                      className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium ${
                        bookmarks[r.question.id] ? "border-amber-400 bg-amber-50 text-amber-700" : "border-gray-300 bg-white text-gray-600"
                      }`}
                    >
                      {bookmarks[r.question.id] ? "★ 保存済み" : "☆ 保存"}
                    </button>
                   </div>
                   {isAssignment && openWrong === r.question.id && (
                     <ReviewPanel q={r.question} chosen={r.chosen} reveal={reveals[r.question.id]} />
                   )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="grid gap-2">
            {!isAssignment && scored.length > 0 && (
              <button
                onClick={() =>
                  shareContent({
                    title: "理学療法士国家試験 過去問ドリル",
                    text: `理学療法士国家試験の過去問ドリル、${ok}/${scored.length}問 正解（正答率${percent(ok, scored.length)}%）！ #理学療法士 #国試`,
                    url: shareUrl("/kokushi", "drill-result"),
                  })
                }
                className="rounded-full border border-sky-300 bg-sky-50 py-2.5 text-sm font-medium text-sky-800"
              >
                この結果を友達に送る
              </button>
            )}
            {!isAssignment && scored.length > 0 && (
              <LineShareButton
                text={`理学療法士国家試験の過去問ドリルを解いたよ（${ok}/${scored.length}問 正解）。登録なしで、1問ずつ解けるよ`}
                url={shareUrl("/kokushi", "drill-result-line")}
                label="LINEで友達に送る"
              />
            )}
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
              {isAssignment ? "課題の一覧に戻る" : "勉強に戻る"}
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
            {fromResults ? (
              <button type="button" onClick={backToResults} className="text-gray-500">
                ← 結果に戻る
              </button>
            ) : (
              <Link href={backHref} className="text-gray-400">
                ← {isAssignment ? "あとで続ける" : "やめる"}
              </Link>
            )}
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
              className={`flex items-center justify-between gap-3 rounded-2xl p-4 ${
                reveal.correct === true
                  ? "bg-emerald-50 text-emerald-900"
                  : reveal.correct === false
                    ? "bg-red-50 text-red-800"
                    : "bg-gray-100 text-gray-800"
              }`}
              role="status"
            >
              <div className="min-w-0">
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
              {/* 解説を読まない人もいるので、正誤のすぐ右に「次へ」 */}
              <button onClick={fromResults ? backToResults : next} className="shrink-0 rounded-full bg-black px-4 py-3 text-sm font-bold text-white">
                {fromResults ? "結果に戻る" : idx + 1 >= questions.length ? "結果を見る" : "次の問題へ"} →
              </button>
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
              <div className="flex items-center gap-3">
                <ReportButton targetType="quiz_question" targetId={q.id} />
                {!isAssignment && (
                  <button
                    onClick={() =>
                      shareContent({
                        title: `${questionLabel(q)}｜理学療法士国家試験`,
                        text: `理学療法士国家試験 ${questionLabel(q)}、解ける？ #理学療法士 #国試`,
                        url: shareUrl(`/kokushi/${q.exam_no}/${q.session}/${q.no}`, "drill-question"),
                      })
                    }
                    className="text-xs text-sky-700 underline"
                  >
                    この問題を友達に送る
                  </button>
                )}
              </div>
              <button onClick={fromResults ? backToResults : next} className="rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white">
                {fromResults ? "結果に戻る" : idx + 1 >= questions.length ? "結果を見る" : "次の問題へ"}
              </button>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
