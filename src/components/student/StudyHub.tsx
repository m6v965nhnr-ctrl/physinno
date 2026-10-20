"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRequireQuizAccess } from "@/lib/useQuizAccess";
import { useRouter } from "next/navigation";
import StreakBadge from "@/components/student/StreakBadge";
import { OFFICIAL_EXAMS, officialPage, officialPdfs } from "@/lib/quizPdf";
import {
  MOCK_MINUTES,
  MockSummary,
  QuizExam,
  QuizMode,
  QuizModeCounts,
  QuizUnit,
  fetchRelatedTerms,
  getMockSummary,
  getModeCounts,
  getStreak,
  listQuizExams,
  listQuizUnits,
  percent,
} from "@/lib/quiz";

function Bar({ answered, total }: { answered: number; total: number }) {
  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-gray-100" aria-hidden="true">
      <div className="h-full rounded-full bg-emerald-500" style={{ width: `${percent(answered, total)}%` }} />
    </div>
  );
}

type Setting = "auto" | QuizMode;
type Tab = "unit" | "exam" | "mock" | "pdf";

// 勉強（一問一答）。進み具合・今日の10問・近道・科目／回／模擬試験／PDF・キーワード・大学内ランキング・クラスの課題を、1つの画面に。
// 「出題の設定」（どの問題を・どの順で・何問）は、ここで選んで、下のどこから始めても使われる
export default function StudyHub({ isStudent = true }: { isStudent?: boolean }) {
  // 学校コードが必要な設定のとき、所属していない人は、学校コードの画面へ
  const access = useRequireQuizAccess();
  const router = useRouter();
  const [units, setUnits] = useState<QuizUnit[] | null>(null);
  const [exams, setExams] = useState<QuizExam[]>([]);
  const [mocks, setMocks] = useState<MockSummary[]>([]);
  const [counts, setCounts] = useState<QuizModeCounts | null>(null);
  const [streak, setStreak] = useState<{ streak: number; doneToday: boolean } | null>(null);

  const [mode, setMode] = useState<Setting>("auto");
  const [order, setOrder] = useState<"random" | "seq">("random");
  const [n, setN] = useState(0); // 0 = 最後まで
  const [tab, setTab] = useState<Tab>("unit");
  const [keyword, setKeyword] = useState("");
  const [finding, setFinding] = useState(false);

  useEffect(() => {
    Promise.all([listQuizUnits(), listQuizExams(), getModeCounts(null, null), getStreak(), getMockSummary()]).then(([u, e, c, s, m]) => {
      setUnits(u);
      setExams(e);
      setCounts(c);
      setStreak(s);
      setMocks(m);
    });
  }, []);

  if (!units) {
    return <p className="py-16 text-center text-sm text-gray-400">読み込み中…</p>;
  }

  const total = units.reduce((a, u) => a + u.total, 0);
  const answered = units.reduce((a, u) => a + u.answered, 0);
  const correct = units.reduce((a, u) => a + u.correct, 0);

  // 出題の設定を使った、問題の画面へのリンク。「おまかせ」は、まだ解いていない問題があればそれ、なければ全問
  const href = (extra: string, hasUnanswered: boolean) => {
    const m: QuizMode = mode === "auto" ? (hasUnanswered ? "unanswered" : "all") : mode;
    return `/student/quiz/play?${extra}${extra ? "&" : ""}mode=${m}&n=${n}&order=${order}`;
  };
  const fixed = (m: QuizMode, count: number) => `/student/quiz/play?mode=${m}&n=${count}&order=random`;

  const todayUnanswered = !!counts && counts.unanswered > 0;
  const fields = Array.from(new Set(units.map((u) => u.field)));
  const sortedExams = [...exams].sort((x, y) => y.exam_no - x.exam_no);

  async function searchKeyword() {
    const kw = keyword.replace(/[%_|\\]/g, "").trim().slice(0, 40);
    if (!kw) return;
    setFinding(true);
    const related = await fetchRelatedTerms(kw);
    setFinding(false);
    const q = new URLSearchParams({ kw });
    if (related.length > 0) q.set("rel", related.join("|"));
    router.push(href(q.toString(), false));
  }

  const tile = "flex min-h-[2.75rem] flex-col items-center justify-center rounded-xl bg-white px-1 py-1.5 text-center shadow-sm transition active:scale-[0.98]";

  return (
    <div className="space-y-4">
      {/* いちばん上：進み具合（細く） */}
      <section className="rounded-2xl bg-relight-gradient px-4 py-3 shadow-sm" aria-labelledby="study-title">
        <div className="flex items-center justify-between gap-2">
          <h2 id="study-title" className="text-base font-extrabold tracking-tight">
            🎯 一問一答
          </h2>
          <StreakBadge className="bg-white/70" />
        </div>
        <div className="mt-2 flex items-end justify-between gap-2 text-center">
          <p className="text-left">
            <span className="text-xl font-extrabold">{answered.toLocaleString()}</span>
            <span className="ml-0.5 text-[10px] font-semibold">/{total.toLocaleString()}問 解いた</span>
          </p>
          <p>
            <span className="text-xl font-extrabold">{correct.toLocaleString()}</span>
            <span className="ml-0.5 text-[10px] font-semibold">正解</span>
          </p>
          <p>
            <span className="text-xl font-extrabold">{answered > 0 ? `${percent(correct, answered)}%` : "-"}</span>
            <span className="ml-0.5 text-[10px] font-semibold">正答率</span>
          </p>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/80" aria-hidden="true">
          <div className="h-full rounded-full bg-gray-900" style={{ width: `${percent(answered, total)}%` }} />
        </div>
      </section>

      {/* キーワード（細く）。ヒーローのすぐ下 */}
      <section className="rounded-2xl bg-white px-3 py-2.5 shadow-sm">
        <div className="flex items-center gap-2">
          <span aria-hidden="true">🔎</span>
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.nativeEvent.isComposing) searchKeyword();
            }}
            placeholder="キーワードで解く（例：糖尿病、ICF）"
            aria-label="キーワードで解く"
            className="min-w-0 flex-1 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm outline-none focus:border-gray-900"
          />
          <button onClick={searchKeyword} disabled={finding || !keyword.trim()} className="shrink-0 rounded-full bg-black px-4 py-1.5 text-sm font-medium text-white disabled:opacity-40">
            {finding ? "…" : "解く"}
          </button>
        </div>
        <p className="mt-1 pl-6 text-[10px] leading-4 text-gray-400">関係する問題も集めます。人名のつく病名・評価法は、英語でも。</p>
      </section>

      {/* 近道（縦を狭く） */}
      <section className="grid grid-cols-4 gap-1.5" aria-label="近道">
        {[
          { icon: "🔁", label: "復習", n: counts?.wrong ?? 0, href: fixed("wrong", 0), color: "text-red-500" },
          { icon: "🔖", label: "保存", n: counts?.bookmarked ?? 0, href: fixed("bookmarked", 0), color: "text-gray-600" },
        ].map((t) =>
          t.n > 0 ? (
            <Link key={t.label} href={t.href} className={tile}>
              <span className="text-[11px] font-bold text-gray-900"><span aria-hidden="true">{t.icon} </span>{t.label}</span>
              <span className={`block text-[10px] font-semibold ${t.color}`}>{t.n}問</span>
            </Link>
          ) : (
            <div key={t.label} className={`${tile} opacity-50`}>
              <span className="text-[11px] font-bold text-gray-900"><span aria-hidden="true">{t.icon} </span>{t.label}</span>
              <span className="block text-[10px] text-gray-400">まだなし</span>
            </div>
          )
        )}
        <Link href="/student/quiz/review" className={tile}>
          <span className="text-[11px] font-bold leading-tight text-gray-900"><span aria-hidden="true">📈 </span>テスト振り返り</span>
        </Link>
        <Link href="/student/quiz/ask" className={tile}>
          <span className="text-[11px] font-bold leading-tight text-gray-900"><span aria-hidden="true">🙋 </span>先生に質問</span>
        </Link>
      </section>

      {/* 出題の設定（科目・回・全範囲・キーワードから始めるとき、これが使われる） */}
      <section className="rounded-2xl bg-white p-3 shadow-sm" aria-label="出題の設定">
        <div className="grid grid-cols-3 gap-2">
          <label className="block">
            <span className="mb-1 block text-[10px] font-semibold text-gray-500">問題</span>
            <select value={mode} onChange={(e) => setMode(e.target.value as Setting)} className="w-full rounded-xl border border-gray-200 bg-white px-2 py-2 text-xs font-medium text-gray-900">
              <option value="auto">おまかせ</option>
              <option value="all">すべて</option>
              <option value="unanswered">まだ解いていない</option>
              <option value="wrong">間違えた</option>
              <option value="bookmarked">保存した</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-[10px] font-semibold text-gray-500">順番</span>
            <select value={order} onChange={(e) => setOrder(e.target.value as "random" | "seq")} className="w-full rounded-xl border border-gray-200 bg-white px-2 py-2 text-xs font-medium text-gray-900">
              <option value="random">ランダム</option>
              <option value="seq">問題番号順</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-[10px] font-semibold text-gray-500">問題数</span>
            <select value={n} onChange={(e) => setN(Number(e.target.value))} className="w-full rounded-xl border border-gray-200 bg-white px-2 py-2 text-xs font-medium text-gray-900">
              <option value={0}>最後まで</option>
              <option value={10}>10問</option>
              <option value={20}>20問</option>
              <option value={50}>50問</option>
            </select>
          </label>
        </div>
      </section>

      {/* 科目・回・模擬試験・PDF */}
      <section className="space-y-3">
        <div className="grid grid-cols-4 gap-1 rounded-full bg-gray-100 p-1 text-xs sm:text-sm" role="tablist" aria-label="問題の選び方">
          {(
            [
              ["unit", "科目"],
              ["exam", "回"],
              ["mock", "模擬試験"],
              ["pdf", "PDF"],
            ] as const
          ).map(([k, label]) => (
            <button
              key={k}
              role="tab"
              aria-selected={tab === k}
              onClick={() => setTab(k)}
              className={`rounded-full py-2 ${tab === k ? "bg-white font-semibold text-gray-900 shadow-sm" : "text-gray-500"}`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "unit" &&
          fields.map((f) => {
            const list = units.filter((u) => u.field === f && u.total > 0).sort((a, b) => a.sort - b.sort);
            const a = list.reduce((s, u) => s + u.answered, 0);
            const t = list.reduce((s, u) => s + u.total, 0);
            return (
              <details key={f} className="group rounded-2xl bg-white shadow-sm">
                <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-3">
                  <span className="min-w-0 flex-1 text-sm font-semibold text-gray-900">{f}</span>
                  <span className="w-20 shrink-0">
                    <Bar answered={a} total={t} />
                  </span>
                  <span className="w-16 shrink-0 text-right text-xs text-gray-500">{a > 0 ? `${a}/${t}` : `${t}問`}</span>
                  <span aria-hidden="true" className="shrink-0 text-gray-400 transition group-open:rotate-180">▾</span>
                </summary>
                <div className="divide-y divide-gray-100 border-t border-gray-100">
                  {list.map((u) => (
                    <Link
                      key={u.id}
                      href={href(`unit=${u.id}`, u.answered < u.total)}
                      className="flex items-center gap-3 px-4 py-2.5 transition active:bg-gray-50"
                    >
                      <span className="min-w-0 flex-1 text-sm font-medium leading-5 text-gray-900">{u.name}</span>
                      <span className="w-20 shrink-0">
                        <Bar answered={u.answered} total={u.total} />
                      </span>
                      <span className="w-16 shrink-0 text-right text-xs text-gray-500">
                        {u.answered > 0 ? (
                          <>
                            {u.answered}/{u.total}
                            <span className="block font-semibold text-emerald-600">{percent(u.correct, u.answered)}%</span>
                          </>
                        ) : (
                          `${u.total}問`
                        )}
                      </span>
                    </Link>
                  ))}
                </div>
              </details>
            );
          })}

        {tab === "exam" && (
          <div className="divide-y divide-gray-100 overflow-hidden rounded-2xl bg-white shadow-sm">
            {sortedExams.map((e) => (
              <Link key={e.exam_no} href={href(`exam=${e.exam_no}`, e.answered < e.total)} className="flex items-center gap-3 px-4 py-3 transition active:bg-gray-50">
                <span className="min-w-0 flex-1 text-sm font-semibold text-gray-900">第{e.exam_no}回</span>
                <span className="w-24 shrink-0">
                  <Bar answered={e.answered} total={e.total} />
                </span>
                <span className="w-16 shrink-0 text-right text-xs text-gray-500">
                  {e.answered > 0 ? (
                    <>
                      {e.answered}/{e.total}
                      <span className="block font-semibold text-emerald-600">{percent(e.correct, e.answered)}%</span>
                    </>
                  ) : (
                    `${e.total}問`
                  )}
                </span>
              </Link>
            ))}
          </div>
        )}

        {tab === "mock" && (
          <div className="space-y-3">
            <p className="text-xs leading-5 text-gray-500">
              1回分の午前または午後を、本番と同じ解答時間（{MOCK_MINUTES}分）で、通して解きます。答え合わせは、最後にまとめて行います。
            </p>
            <div className="grid grid-cols-2 gap-3">
              {sortedExams.map((e) => (
                <section key={e.exam_no} className="rounded-2xl bg-white p-3 shadow-sm">
                  <p className="text-sm font-semibold">第{e.exam_no}回</p>
                  <div className="mt-2 grid grid-cols-2 gap-1.5">
                    {(["am", "pm"] as const).map((sess) => {
                      const m = mocks.find((x) => x.exam_no === e.exam_no && x.session === sess);
                      return (
                        <Link
                          key={sess}
                          href={`/student/quiz/mock?exam=${e.exam_no}&session=${sess}`}
                          className="rounded-xl border border-gray-200 px-1 py-2 text-center transition active:bg-gray-50"
                        >
                          <span className="block text-sm font-semibold">{sess === "am" ? "午前" : "午後"}</span>
                          <span className="mt-0.5 block text-[11px] leading-4 text-gray-500">{m ? `${m.last_score}/${m.last_total}問` : "未挑戦"}</span>
                        </Link>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          </div>
        )}

        {tab === "pdf" && (
          <div className="space-y-3">
            <p className="text-xs leading-5 text-gray-500">
              厚生労働省が公開している公式の問題・正答のPDFと、このアプリで作った、解説つきの印刷用ページ（PDFで保存できます）です。
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
                      <a href={f.href} target="_blank" rel="noopener noreferrer" className="block rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-800">
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
                    <Link key={sess} href={`/student/quiz/print?exam=${e.exam_no}&session=${sess}`} className="rounded-lg border border-gray-200 px-3 py-2 text-center text-xs text-gray-800">
                      🖨️ {sess === "am" ? "午前" : "午後"}（問題・正答・解説）
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </section>

      {/* 同じ学校の学生どうしのランキング（学生のみ） */}

      {/* クラス */}
      <Link href="/school" className="flex items-center justify-between rounded-2xl bg-white p-3 shadow-sm transition active:bg-gray-50">
        <span>
          <span className="block text-sm font-semibold">🏫 {access?.school ? access.school.name : "学校コードを入れる"}</span>
          <span className="mt-0.5 block text-[11px] leading-4 text-gray-500">
            {access?.school ? (access.school.role === "teacher" ? "先生として所属しています" : "学生として所属しています") : "学校の先生から伝えられたコードで、学校のクラスに入れます"}
          </span>
        </span>
        <span aria-hidden="true" className="text-gray-400">›</span>
      </Link>

      <section className={`grid gap-2 ${isStudent ? "grid-cols-1" : "grid-cols-2"}`}>
        <Link href="/student/quiz/classes" className="rounded-2xl bg-white p-3 shadow-sm transition active:bg-gray-50">
          <span className="block text-sm font-semibold">📋 クラスの課題</span>
          <span className="mt-0.5 block text-[11px] leading-4 text-gray-500">先生から配られた課題を解く</span>
        </Link>
        {!isStudent && (
          <Link href="/student/quiz/teacher" className="rounded-2xl bg-white p-3 shadow-sm transition active:bg-gray-50">
            <span className="block text-sm font-semibold">👩‍🏫 先生の方はこちら</span>
            <span className="mt-0.5 block text-[11px] leading-4 text-gray-500">クラスを作って課題を配る</span>
          </Link>
        )}
      </section>

      <p className="text-[11px] leading-5 text-gray-400">
        問題・正答の出典: 厚生労働省ホームページ（理学療法士国家試験の問題および正答）。画面に表示するにあたり、問題の整形と単元の分類をしています。
        分類や文字の読み取りに誤りがある場合は、問題の画面の「通報」からお知らせください。図の問題は、厚生労働省が公開している図をそのまま表示しています。
      </p>
    </div>
  );
}
