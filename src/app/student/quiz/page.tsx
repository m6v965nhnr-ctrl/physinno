"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMyAccount } from "@/lib/useMyAccount";
import QuizSchoolRanking from "@/components/student/QuizSchoolRanking";
import { OFFICIAL_EXAMS, officialPage, officialPdfs } from "@/lib/quizPdf";
import {
  MODES,
  MODE_LABEL,
  QuizExam,
  QuizMode,
  QuizModeCounts,
  QuizUnit,
  MockSummary,
  MOCK_MINUTES,
  getMockSummary,
  fetchRelatedTerms,
  getModeCounts,
  listQuizExams,
  listQuizUnits,
  percent,
} from "@/lib/quiz";

type Target =
  | { kind: "unit"; id: string; name: string }
  | { kind: "exam"; id: number; name: string }
  | { kind: "all"; name: string }
  | { kind: "keyword"; keyword: string; related: string[]; name: string };

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

  const [tab, setTab] = useState<"unit" | "exam" | "mock" | "pdf">("unit");
  const [mocks, setMocks] = useState<MockSummary[]>([]);
  const [units, setUnits] = useState<QuizUnit[] | null>(null);
  const [exams, setExams] = useState<QuizExam[] | null>(null);

  const [target, setTarget] = useState<Target | null>(null);
  const [counts, setCounts] = useState<QuizModeCounts | null>(null);
  const [mode, setMode] = useState<QuizMode>("all");
  const [n, setN] = useState(20);
  const [shuffle, setShuffle] = useState(true);

  // キーワードで絞る（例: 糖尿病）
  const [keyword, setKeyword] = useState("");
  const [findingTerms, setFindingTerms] = useState(false);

  async function searchByKeyword() {
    const kw = keyword.replace(/[%_|\\]/g, "").trim().slice(0, 40);
    if (!kw) return;
    setFindingTerms(true);
    const related = await fetchRelatedTerms(kw);
    setFindingTerms(false);
    setTarget({ kind: "keyword", keyword: kw, related, name: `「${kw}」の問題` });
  }

  useEffect(() => {
    if (loading) return;
    listQuizUnits().then(setUnits);
    listQuizExams().then(setExams);
    getMockSummary().then(setMocks);
  }, [loading]);

  useEffect(() => {
    if (!target) return;
    setCounts(null);
    getModeCounts(
      target.kind === "unit" ? target.id : null,
      target.kind === "exam" ? target.id : null,
      target.kind === "keyword" ? { keyword: target.keyword, related: target.related } : null
    ).then(
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
    if (target.kind === "keyword") {
      q.set("kw", target.keyword);
      if (target.related.length > 0) q.set("rel", target.related.join("|"));
    }
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
        <div className="grid items-start gap-4 sm:grid-cols-2">
        <section className={`rounded-2xl bg-white p-4 shadow-sm ${accountType === "student" ? "" : "sm:col-span-2"}`}>
          <p className="text-xs text-gray-500">あなたの進み具合</p>
          <div className="mt-2 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-xl bg-gray-50 px-2 py-2.5">
              <p className="text-[11px] text-gray-500">解いた</p>
              <p className="mt-0.5 text-xl font-bold tracking-tight">
                {answered}
                <span className="block text-[11px] font-medium leading-4 text-gray-500">/ {total}問</span>
              </p>
            </div>
            <div className="rounded-xl bg-gray-50 px-2 py-2.5">
              <p className="text-[11px] text-gray-500">正解</p>
              <p className="mt-0.5 text-xl font-bold tracking-tight">
                {correct}
                <span className="ml-0.5 text-[11px] font-medium text-gray-500">問</span>
              </p>
            </div>
            <div className="rounded-xl bg-gray-50 px-2 py-2.5">
              <p className="text-[11px] text-gray-500">正答率</p>
              <p className="mt-0.5 text-xl font-bold tracking-tight">
                {percent(correct, answered)}
                <span className="ml-0.5 text-[11px] font-medium text-gray-500">%</span>
              </p>
            </div>
          </div>
          <p className="mt-1.5 text-[11px] text-gray-500">正答率は、最後の答えで数えます</p>
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

        {/* 同じ学校の学生どうしのランキング（学生のみ） */}
        {accountType === "student" && <QuizSchoolRanking />}
        </div>

        {/* キーワードで絞る */}
        <section className="rounded-2xl bg-white p-4 shadow-sm">
          <p className="text-sm font-semibold">🔎 キーワードで絞って解く</p>
          <p className="mt-0.5 text-[11px] leading-4 text-gray-500">
            例：「糖尿病」と入れると、問題文・選択肢に「糖尿病」がある問題と、関係する問題（HbA1c・インスリン・合併症など）を集めます
          </p>
          <div className="mt-3 flex gap-2">
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.nativeEvent.isComposing) searchByKeyword();
              }}
              placeholder="例：糖尿病、脳梗塞、ICF"
              aria-label="キーワード"
              className="min-w-0 flex-1 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm outline-none focus:border-gray-900"
            />
            <button
              onClick={searchByKeyword}
              disabled={findingTerms || !keyword.trim()}
              className="shrink-0 rounded-full bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
            >
              {findingTerms ? "探し中…" : "探す"}
            </button>
          </div>
          <p className="mt-2 text-[11px] leading-4 text-gray-500">
            ※ 国試では、人名のついた病名や評価法は、英語で書かれていることがあります（例：Parkinson、Brunnstrom、Guillain）。見つからないときは、英語でも探してみてください。
          </p>
        </section>

        <section className="grid grid-cols-2 gap-2">
          <Link href="/student/quiz/classes" className="rounded-2xl bg-white p-3 shadow-sm transition hover:bg-gray-50">
            <span className="block text-sm font-semibold">📋 クラスの課題</span>
            <span className="mt-0.5 block text-[11px] leading-4 text-gray-500">先生から配られた課題を解く</span>
          </Link>
          <Link href="/student/quiz/teacher" className="rounded-2xl bg-white p-3 shadow-sm transition hover:bg-gray-50">
            <span className="block text-sm font-semibold">👩‍🏫 先生の方はこちら</span>
            <span className="mt-0.5 block text-[11px] leading-4 text-gray-500">クラスを作って課題を配る</span>
          </Link>
        </section>

        <div className="flex gap-1 rounded-full bg-gray-100 p-1 text-sm" role="tablist">
          {(
            [
              ["unit", "単元ごと"],
              ["exam", "回ごと"],
              ["mock", "模擬試験"],
              ["pdf", "PDF・印刷"],
            ] as const
          ).map(([k, label]) => (
            <button
              key={k}
              role="tab"
              aria-selected={tab === k}
              onClick={() => setTab(k)}
              className={`flex-1 rounded-full px-1 py-2 text-xs sm:text-sm ${
                tab === k ? "bg-white font-semibold text-gray-900 shadow-sm" : "text-gray-500"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "unit" &&
          fields.map((f, fi) => {
            const list = units.filter((u) => u.field === f && u.total > 0);
            const fTotal = list.reduce((acc, u) => acc + u.total, 0);
            const fAnswered = list.reduce((acc, u) => acc + u.answered, 0);
            return (
              <details key={f} open={fi === 0} className="group rounded-2xl bg-white shadow-sm">
                <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-3">
                  <span className="min-w-0 flex-1 text-sm font-semibold text-gray-900">{f}</span>
                  <span className="w-16 shrink-0 sm:w-24">
                    <ProgressBar answered={fAnswered} total={fTotal} />
                  </span>
                  <span className="w-16 shrink-0 text-right text-xs text-gray-500">
                    {fAnswered > 0 ? `${fAnswered}/${fTotal}問` : `${fTotal}問`}
                  </span>
                  <span className="shrink-0 text-gray-400 transition group-open:rotate-180" aria-hidden>
                    ▾
                  </span>
                </summary>
                <div className="divide-y divide-gray-100 border-t border-gray-100">
                  {list.map((u) => (
                    <button
                      key={u.id}
                      onClick={() => setTarget({ kind: "unit", id: u.id, name: u.name })}
                      title={
                        u.answered === 0
                          ? "まだ解いていません"
                          : `${u.answered}問 解いた ・ 正解 ${u.correct}問 ・ 正答率 ${percent(u.correct, u.answered)}%`
                      }
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition hover:bg-gray-50"
                    >
                      <span className="min-w-0 flex-1 text-sm font-medium leading-5 text-gray-900">{u.name}</span>
                      <span className="w-16 shrink-0 sm:w-24">
                        <ProgressBar answered={u.answered} total={u.total} />
                      </span>
                      <span className="w-16 shrink-0 text-right text-xs text-gray-500">
                        {u.answered > 0 ? `${u.answered}/${u.total}問` : `${u.total}問`}
                      </span>
                    </button>
                  ))}
                </div>
              </details>
            );
          })}

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

        {tab === "mock" && (
          <div className="space-y-3">
            <p className="text-xs leading-5 text-gray-500">
              1回分の午前または午後を、本番と同じ解答時間（{MOCK_MINUTES}分）で、通して解きます。答え合わせは、最後にまとめて行います。
            </p>
            {(exams ?? []).map((e) => (
              <section key={e.exam_no} className="rounded-2xl bg-white p-4 shadow-sm">
                <p className="text-sm font-semibold">第{e.exam_no}回 理学療法士国家試験</p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {(["am", "pm"] as const).map((sess) => {
                    const m = mocks.find((x) => x.exam_no === e.exam_no && x.session === sess);
                    return (
                      <Link
                        key={sess}
                        href={`/student/quiz/mock?exam=${e.exam_no}&session=${sess}`}
                        className="rounded-xl border border-gray-200 p-3 text-center transition hover:bg-gray-50"
                      >
                        <span className="block text-sm font-semibold">{sess === "am" ? "午前" : "午後"}</span>
                        <span className="mt-0.5 block text-[11px] text-gray-500">
                          {m ? `前回 ${m.last_score}/${m.last_total}問 ・ 最高 ${m.best_score}問` : "まだ解いていません"}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}

        {tab === "pdf" && (
          <div className="space-y-3">
            <p className="text-xs leading-5 text-gray-500">
              厚生労働省が公開している、公式の問題・正答のPDFと、このアプリで作った、解説つきの印刷用ページ（PDFで保存できます）です。
            </p>
            {OFFICIAL_EXAMS.map((e) => (
              <section key={e.exam_no} className="rounded-2xl bg-white p-4 shadow-sm">
                <p className="text-sm font-semibold">
                  第{e.exam_no}回 <span className="text-xs font-normal text-gray-500">（{e.date}実施）</span>
                </p>

                <p className="mt-3 text-xs font-semibold text-gray-600">公式PDF（厚生労働省）</p>
                <ul className="mt-1.5 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                  {officialPdfs(e).map((f) => (
                    <li key={f.href}>
                      <a
                        href={f.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-800 hover:bg-gray-50"
                      >
                        📄 {f.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-1.5 text-[11px] text-gray-400">
                  <a href={officialPage(e)} target="_blank" rel="noopener noreferrer" className="underline">
                    厚生労働省の公開ページ
                  </a>
                </p>

                <p className="mt-3 text-xs font-semibold text-gray-600">解説つき（印刷・PDF保存）</p>
                <div className="mt-1.5 grid grid-cols-2 gap-1.5">
                  {(["am", "pm"] as const).map((sess) => (
                    <Link
                      key={sess}
                      href={`/student/quiz/print?exam=${e.exam_no}&session=${sess}`}
                      className="rounded-lg border border-gray-200 px-3 py-2 text-center text-xs text-gray-800 hover:bg-gray-50"
                    >
                      🖨️ {sess === "am" ? "午前" : "午後"}（問題・正答・解説）
                    </Link>
                  ))}
                </div>
              </section>
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

            {target.kind === "keyword" && (
              <div className="rounded-xl bg-gray-50 p-3 text-xs leading-5 text-gray-600">
                <p>
                  問題文・選択肢に「{target.keyword}」がある問題：
                  <span className="font-semibold text-gray-900">
                    {counts?.direct_count === undefined ? "…" : `${counts.direct_count}問`}
                  </span>
                  （先に出題します）
                </p>
                {target.related.length > 0 && (
                  <p className="mt-1">
                    関係する言葉でも探しました：
                    <span className="text-gray-900">{target.related.join("・")}</span>
                  </p>
                )}
              </div>
            )}

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
