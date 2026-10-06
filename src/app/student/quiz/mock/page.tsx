"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { notify } from "@/lib/notify";
import { useMyAccount } from "@/lib/useMyAccount";
import {
  MOCK_MINUTES,
  MockGrade,
  MockGradeItem,
  MockQuestion,
  QuizReveal,
  gradeExam,
  imageUrl,
  listExamQuestions,
  listQuizUnits,
  percent,
  revealQuestion,
} from "@/lib/quiz";

type Session = "am" | "pm";

type Saved = {
  startedAt: number;
  answers: Record<string, number[]>;
  flags: string[];
  idx: number;
};

const SESSION_LABEL: Record<Session, string> = { am: "午前", pm: "午後" };
const LIMIT_MS = MOCK_MINUTES * 60 * 1000;

function fmt(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

function storageKey(exam: number, session: Session) {
  return `relight-mock-${exam}-${session}`;
}

function loadSaved(exam: number, session: Session): Saved | null {
  try {
    const raw = window.localStorage.getItem(storageKey(exam, session));
    if (!raw) return null;
    const v = JSON.parse(raw) as Saved;
    if (!v.startedAt || Date.now() - v.startedAt > LIMIT_MS + 30 * 60 * 1000) return null;
    return v;
  } catch {
    return null;
  }
}

function writeSaved(exam: number, session: Session, v: Saved | null) {
  try {
    if (v) window.localStorage.setItem(storageKey(exam, session), JSON.stringify(v));
    else window.localStorage.removeItem(storageKey(exam, session));
  } catch {
    // 保存できなくても、そのまま続けられる
  }
}

// 模擬試験: 1回分の午前または午後(約100問)を、時間制限つきで通して解き、最後にまとめて採点する
export default function MockExamPage() {
  const { loading } = useMyAccount(["student", "pt"]);

  const [exam, setExam] = useState<number | null>(null);
  const [session, setSession] = useState<Session>("am");
  const [questions, setQuestions] = useState<MockQuestion[] | null>(null);
  const [unitNames, setUnitNames] = useState<Record<string, string>>({});

  const [phase, setPhase] = useState<"intro" | "running" | "grading" | "result">("intro");
  const [saved, setSaved] = useState<Saved | null>(null);
  const [startedAt, setStartedAt] = useState(0);
  const [now, setNow] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number[]>>({});
  const [flags, setFlags] = useState<string[]>([]);
  const [idx, setIdx] = useState(0);
  const [showNav, setShowNav] = useState(false);
  const [grade, setGrade] = useState<MockGrade | null>(null);
  const [usedSeconds, setUsedSeconds] = useState(0);
  const gradingRef = useRef(false);

  useEffect(() => {
    if (loading) return;
    const q = new URLSearchParams(window.location.search);
    const e = Number(q.get("exam"));
    const s = (q.get("session") === "pm" ? "pm" : "am") as Session;
    setExam(e);
    setSession(s);
    setSaved(loadSaved(e, s));
    setNow(Date.now());
    listExamQuestions(e, s).then(setQuestions);
    listQuizUnits().then((us) => setUnitNames(Object.fromEntries(us.map((u) => [u.id, u.name]))));
  }, [loading]);

  const begin = useCallback(
    (resume: Saved | null) => {
      if (exam === null) return;
      const v: Saved = resume ?? { startedAt: Date.now(), answers: {}, flags: [], idx: 0 };
      setStartedAt(v.startedAt);
      setAnswers(v.answers);
      setFlags(v.flags);
      setIdx(Math.min(v.idx, Math.max(0, (questions?.length ?? 1) - 1)));
      setNow(Date.now());
      writeSaved(exam, session, v);
      setPhase("running");
    },
    [exam, session, questions]
  );

  // 途中経過を保存する(ページを閉じても、続きから解ける)
  useEffect(() => {
    if (phase !== "running" || exam === null) return;
    writeSaved(exam, session, { startedAt, answers, flags, idx });
  }, [phase, exam, session, startedAt, answers, flags, idx]);

  const submit = useCallback(
    async (auto = false) => {
      if (exam === null || gradingRef.current) return;
      gradingRef.current = true;
      setPhase("grading");
      const seconds = Math.min(LIMIT_MS, Date.now() - startedAt) / 1000;
      const g = await gradeExam(exam, session, answers, seconds);
      gradingRef.current = false;

      if (!g) {
        notify("採点に失敗しました。もう一度お試しください");
        setPhase("running");
        return;
      }

      writeSaved(exam, session, null);
      setUsedSeconds(seconds);
      setGrade(g);
      setPhase("result");
      window.scrollTo({ top: 0 });
      if (auto) notify("時間になったので、採点しました");
    },
    [exam, session, startedAt, answers]
  );

  useEffect(() => {
    if (phase !== "running") return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [phase]);

  const remaining = LIMIT_MS - (now - startedAt);

  useEffect(() => {
    if (phase === "running" && now > 0 && remaining <= 0) submit(true);
  }, [phase, now, remaining, submit]);

  if (loading || exam === null || questions === null) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-sm text-gray-400">読み込み中…</p>
      </main>
    );
  }

  const title = `第${exam}回 ${SESSION_LABEL[session]}`;

  if (questions.length === 0) {
    return (
      <main className="min-h-screen bg-[#fafafa] px-6 py-10">
        <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 text-center shadow-sm">
          <p className="text-sm text-gray-600">この回の問題は、まだありません。</p>
          <Link href="/student/quiz" className="mt-4 inline-block rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white">
            戻る
          </Link>
        </div>
      </main>
    );
  }

  // ------------------------------------------------------- はじめる前
  if (phase === "intro") {
    return (
      <main className="min-h-screen bg-[#fafafa] pb-28">
        <header className="border-b border-gray-100 bg-white px-6 py-5">
          <div className="mx-auto max-w-2xl">
            <Link href="/student/quiz" className="text-sm text-gray-400">
              ← 過去問ドリル
            </Link>
            <h1 className="mt-2 text-xl font-semibold tracking-tight">模擬試験　{title}</h1>
          </div>
        </header>

        <div className="mx-auto max-w-2xl space-y-4 px-6 py-5">
          <section className="space-y-2 rounded-2xl bg-white p-4 text-sm leading-7 text-gray-700 shadow-sm">
            <p>
              {title}の問題（{questions.length}問）を、本番と同じ解答時間（{MOCK_MINUTES}分）で、通して解きます。
            </p>
            <ul className="list-disc space-y-1 pl-5 text-xs leading-6 text-gray-600">
              <li>答え合わせは、最後にまとめて行います。途中で、正解や解説は見られません。</li>
              <li>「あとで見直す」の印を付けられます。問題の一覧から、好きな問題へ移れます。</li>
              <li>途中でページを閉じても、この端末では、続きから解けます（時間は進み続けます）。</li>
              <li>時間になると、自動で採点します。採点除外の問題は、出しません。</li>
              <li>採点すると、答えた問題は、ドリルの記録（間違えた問題の復習など）にも反映されます。</li>
            </ul>
          </section>

          {saved ? (
            <div className="space-y-2">
              <p className="text-center text-xs text-gray-500">
                途中までの記録があります（残り時間 {fmt(LIMIT_MS - (now - saved.startedAt))}）
              </p>
              <button
                onClick={() => begin(saved)}
                className="w-full rounded-full bg-black py-3 text-sm font-medium text-white"
              >
                続きから解く
              </button>
              <button
                onClick={() => {
                  writeSaved(exam, session, null);
                  setSaved(null);
                }}
                className="w-full rounded-full border border-gray-300 py-3 text-sm text-gray-700"
              >
                記録を消して、最初からやり直す
              </button>
            </div>
          ) : (
            <button
              onClick={() => begin(null)}
              className="w-full rounded-full bg-black py-3 text-sm font-medium text-white"
            >
              試験をはじめる（{MOCK_MINUTES}分）
            </button>
          )}
        </div>
      </main>
    );
  }

  // ------------------------------------------------------- 採点中
  if (phase === "grading") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-sm text-gray-500">採点しています…</p>
      </main>
    );
  }

  // ------------------------------------------------------- 結果
  if (phase === "result" && grade) {
    return (
      <ResultView
        title={title}
        exam={exam}
        session={session}
        questions={questions}
        grade={grade}
        usedSeconds={usedSeconds}
        unitNames={unitNames}
        onRetry={() => {
          setGrade(null);
          setSaved(null);
          setPhase("intro");
        }}
      />
    );
  }

  // ------------------------------------------------------- 解答中
  const qs = questions;
  const q = qs[idx];
  const chosen = answers[q.id] ?? [];
  const answeredCount = questions.filter((x) => (answers[x.id] ?? []).length > 0).length;
  const flagged = flags.includes(q.id);
  const low = remaining < 10 * 60 * 1000;

  function pick(n: number) {
    setAnswers((prev) => {
      const cur = prev[q.id] ?? [];
      let next: number[];
      if (q.need === 1) next = cur.includes(n) ? [] : [n];
      else if (cur.includes(n)) next = cur.filter((x) => x !== n);
      else next = cur.length >= q.need ? cur : [...cur, n].sort();
      return { ...prev, [q.id]: next };
    });
  }

  function toggleFlag() {
    setFlags((f) => (f.includes(q.id) ? f.filter((x) => x !== q.id) : [...f, q.id]));
  }

  function handleSubmit() {
    const unanswered = qs.length - answeredCount;
    const msg =
      unanswered > 0
        ? `未回答が${unanswered}問あります。このまま採点しますか？`
        : "採点しますか？（採点すると、解答は変えられません）";
    if (confirm(msg)) submit();
  }

  const optionClass = (n: number) =>
    `flex w-full items-start gap-3 rounded-xl border px-3 py-3 text-left text-sm leading-6 transition ${
      chosen.includes(n) ? "border-gray-900 bg-gray-50" : "border-gray-200 bg-white hover:bg-gray-50"
    }`;

  return (
    <main className="min-h-screen bg-[#fafafa] pb-28">
      <header className="sticky top-0 z-10 border-b border-gray-100 bg-white px-4 py-3">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-2">
          <div className="min-w-0 text-xs text-gray-500">
            <p className="truncate font-medium text-gray-700">模擬試験　{title}</p>
            <p>
              {answeredCount} / {questions.length}問 回答済み
            </p>
          </div>
          <p
            className={`shrink-0 rounded-full px-3 py-1 text-sm font-semibold tabular-nums ${
              low ? "bg-red-50 text-red-600" : "bg-gray-100 text-gray-800"
            }`}
            role="timer"
            aria-label="残り時間"
          >
            {fmt(remaining)}
          </p>
          <button
            onClick={handleSubmit}
            className="shrink-0 rounded-full bg-black px-4 py-2 text-xs font-medium text-white"
          >
            採点する
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-2xl space-y-4 px-6 py-5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">問{q.no}</p>
          <div className="flex gap-2">
            <button
              onClick={toggleFlag}
              aria-pressed={flagged}
              className={`rounded-full border px-3 py-1 text-xs ${
                flagged ? "border-amber-400 bg-amber-50 text-amber-700" : "border-gray-300 text-gray-500"
              }`}
            >
              {flagged ? "★ あとで見直す" : "☆ あとで見直す"}
            </button>
            <button
              onClick={() => setShowNav((v) => !v)}
              className="rounded-full border border-gray-300 px-3 py-1 text-xs text-gray-600"
            >
              問題の一覧
            </button>
          </div>
        </div>

        {showNav && (
          <div className="rounded-2xl bg-white p-3 shadow-sm">
            <div className="grid grid-cols-10 gap-1.5">
              {questions.map((x, i) => {
                const done = (answers[x.id] ?? []).length > 0;
                const fl = flags.includes(x.id);
                return (
                  <button
                    key={x.id}
                    onClick={() => {
                      setIdx(i);
                      setShowNav(false);
                      window.scrollTo({ top: 0 });
                    }}
                    aria-label={`問${x.no}${done ? "（回答済み）" : ""}${fl ? "（見直す）" : ""}`}
                    className={`rounded-md py-1.5 text-[11px] ${
                      i === idx ? "ring-2 ring-emerald-500" : ""
                    } ${done ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600"} ${
                      fl ? "outline outline-2 outline-amber-400" : ""
                    }`}
                  >
                    {x.no}
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-[11px] text-gray-400">黒＝回答済み　黄色の枠＝あとで見直す　緑の枠＝今の問題</p>
          </div>
        )}

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

          {q.need > 1 && <p className="text-xs font-semibold text-amber-700">{q.need}つ選んでください</p>}
        </section>

        {q.choices_in_image ? (
          <div className="grid grid-cols-5 gap-2" role="group" aria-label="選択肢">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} onClick={() => pick(n)} aria-pressed={chosen.includes(n)} className={`${optionClass(n)} justify-center`}>
                {n}
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-2" role="group" aria-label="選択肢">
            {q.choices.map((c, i) => (
              <button key={i} onClick={() => pick(i + 1)} aria-pressed={chosen.includes(i + 1)} className={optionClass(i + 1)}>
                <span className="shrink-0 font-semibold">{i + 1}</span>
                <span className="min-w-0">{c}</span>
              </button>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={() => {
              setIdx((i) => Math.max(0, i - 1));
              window.scrollTo({ top: 0 });
            }}
            disabled={idx === 0}
            className="flex-1 rounded-full border border-gray-300 py-2.5 text-sm text-gray-700 disabled:opacity-40"
          >
            ← 前の問題
          </button>
          <button
            onClick={() => {
              setIdx((i) => Math.min(qs.length - 1, i + 1));
              window.scrollTo({ top: 0 });
            }}
            disabled={idx === qs.length - 1}
            className="flex-1 rounded-full bg-black py-2.5 text-sm font-medium text-white disabled:opacity-40"
          >
            次の問題 →
          </button>
        </div>
      </div>
    </main>
  );
}

// ------------------------------------------------------- 結果と見直し
function ResultView({
  title,
  exam,
  session,
  questions,
  grade,
  usedSeconds,
  unitNames,
  onRetry,
}: {
  title: string;
  exam: number;
  session: Session;
  questions: MockQuestion[];
  grade: MockGrade;
  usedSeconds: number;
  unitNames: Record<string, string>;
  onRetry: () => void;
}) {
  const [filter, setFilter] = useState<"all" | "wrong" | "none">("wrong");

  const qById = useMemo(() => Object.fromEntries(questions.map((x) => [x.id, x])), [questions]);

  const byUnit = useMemo(() => {
    const m: Record<string, { total: number; ok: number }> = {};
    for (const it of grade.items) {
      const v = (m[it.unit] ??= { total: 0, ok: 0 });
      v.total += 1;
      if (it.correct) v.ok += 1;
    }
    return Object.entries(m).sort((a, b) => a[1].ok / a[1].total - b[1].ok / b[1].total);
  }, [grade]);

  const shown = grade.items.filter((it) =>
    filter === "all" ? true : filter === "wrong" ? !it.correct && it.chosen : !it.chosen
  );
  const wrongCount = grade.items.filter((it) => !it.correct && it.chosen).length;
  const noneCount = grade.items.filter((it) => !it.chosen).length;
  const pct = percent(grade.score, grade.total);

  return (
    <main className="min-h-screen bg-[#fafafa] pb-28">
      <header className="border-b border-gray-100 bg-white px-6 py-5">
        <div className="mx-auto max-w-2xl">
          <Link href="/student/quiz" className="text-sm text-gray-400">
            ← 過去問ドリル
          </Link>
          <h1 className="mt-2 text-xl font-semibold tracking-tight">模擬試験の結果　{title}</h1>
        </div>
      </header>

      <div className="mx-auto max-w-2xl space-y-4 px-6 py-5">
        <section className="rounded-2xl bg-white p-5 text-center shadow-sm">
          <p className="text-xs text-gray-500">正解数</p>
          <p className="mt-1 text-4xl font-bold tracking-tight">
            {grade.score}
            <span className="text-lg font-medium text-gray-500"> / {grade.total}問</span>
          </p>
          <p className="mt-1 text-sm text-gray-600">正答率 {pct}%　（解答時間 {fmt(usedSeconds * 1000)}）</p>
          <p className="mt-2 text-[11px] leading-5 text-gray-400">
            合格の目安は、おおむね6割です（実際の合格基準は、回によって異なり、午前・午後を合わせた総得点と、実地問題の得点で決まります）。
          </p>
        </section>

        <section className="rounded-2xl bg-white p-4 shadow-sm">
          <p className="text-sm font-semibold">単元ごとの結果（正答率の低い順）</p>
          <ul className="mt-3 space-y-2">
            {byUnit.map(([unit, v]) => (
              <li key={unit} className="text-sm">
                <div className="flex items-center justify-between gap-3">
                  <span className="min-w-0 truncate">{unitNames[unit] ?? unit}</span>
                  <span className="shrink-0 text-xs text-gray-500">
                    {v.ok} / {v.total}問（{percent(v.ok, v.total)}%）
                  </span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-gray-100" aria-hidden="true">
                  <div className="h-full rounded-full bg-emerald-500" style={{ width: `${percent(v.ok, v.total)}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-3">
          <div className="flex gap-1 rounded-full bg-gray-100 p-1 text-xs" role="tablist">
            {(
              [
                ["wrong", `間違い（${wrongCount}）`],
                ["none", `未回答（${noneCount}）`],
                ["all", `すべて（${grade.total}）`],
              ] as const
            ).map(([k, label]) => (
              <button
                key={k}
                role="tab"
                aria-selected={filter === k}
                onClick={() => setFilter(k)}
                className={`flex-1 rounded-full px-2 py-2 ${
                  filter === k ? "bg-white font-semibold text-gray-900 shadow-sm" : "text-gray-500"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {shown.length === 0 ? (
            <p className="rounded-2xl bg-white p-4 text-center text-sm text-gray-400 shadow-sm">
              この条件の問題は、ありません。
            </p>
          ) : (
            shown.map((it) => <ReviewItem key={it.id} item={it} q={qById[it.id]} exam={exam} session={session} />)
          )}
        </section>

        <div className="grid gap-2">
          <button onClick={onRetry} className="rounded-full bg-black py-2.5 text-sm font-medium text-white">
            もう一度、この回の模擬試験を解く
          </button>
          <Link href="/student/quiz" className="rounded-full border border-gray-300 py-2.5 text-center text-sm text-gray-800">
            過去問ドリルに戻る
          </Link>
        </div>
      </div>
    </main>
  );
}

function ReviewItem({
  item,
  q,
  exam,
  session,
}: {
  item: MockGradeItem;
  q: MockQuestion | undefined;
  exam: number;
  session: Session;
}) {
  const [open, setOpen] = useState(false);
  const [reveal, setReveal] = useState<QuizReveal | null>(null);

  if (!q) return null;
  const question = q;

  const answerUnion = new Set(item.answers.flat());

  async function toggle() {
    const next = !open;
    setOpen(next);
    if (next && !reveal) setReveal(await revealQuestion(question.id));
  }

  const badge = item.correct
    ? "bg-emerald-50 text-emerald-700"
    : item.chosen
      ? "bg-red-50 text-red-600"
      : "bg-gray-100 text-gray-500";

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <button onClick={toggle} aria-expanded={open} className="flex w-full items-start justify-between gap-3 text-left">
        <span className="min-w-0 text-sm leading-6">
          <span className={`mr-2 rounded-full px-2 py-0.5 text-[10px] ${badge}`}>
            問{item.no}　{item.correct ? "正解" : item.chosen ? "不正解" : "未回答"}
          </span>
          <span className="text-gray-700">
            {question.stem.slice(0, 50)}
            {question.stem.length > 50 ? "…" : ""}
          </span>
        </span>
        <span className="shrink-0 text-xs text-gray-400">{open ? "閉じる" : "開く"}</span>
      </button>

      {open && (
        <div className="mt-3 space-y-3">
          {question.intro && <p className="rounded-xl bg-gray-50 p-3 text-xs leading-6 text-gray-600">{question.intro}</p>}
          <p className="whitespace-pre-wrap text-sm leading-7 text-gray-900">{question.stem}</p>

          {question.book_images.map((p) => (
            <img key={p} loading="lazy" decoding="async" src={imageUrl(p)} alt="別冊の図" className="mx-auto max-h-80 w-full rounded-xl border border-gray-100 object-contain" />
          ))}
          {question.image && (
            <img loading="lazy" decoding="async" src={imageUrl(question.image)} alt="問題の図" className="mx-auto max-h-96 w-full rounded-xl border border-gray-100 object-contain" />
          )}

          {question.choices_in_image ? (
            <p className="text-sm text-gray-700">
              あなたの答え: {item.chosen ? item.chosen.join("・") : "（未回答）"}　／　正答:{" "}
              {item.answers.map((s) => s.join("・")).join(" または ")}
            </p>
          ) : (
            <ul className="space-y-1.5">
              {question.choices.map((c, i) => {
                const n = i + 1;
                const isAnswer = answerUnion.has(n);
                const isChosen = item.chosen?.includes(n);
                const cls = isAnswer
                  ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                  : isChosen
                    ? "border-red-400 bg-red-50 text-red-800"
                    : "border-gray-200 text-gray-500";
                return (
                  <li key={i} className={`flex gap-3 rounded-xl border px-3 py-2 text-sm leading-6 ${cls}`}>
                    <span className="shrink-0 font-semibold">{n}</span>
                    <span className="min-w-0">
                      {c}
                      {isChosen && <span className="ml-2 text-[11px]">（あなたの答え）</span>}
                      {isAnswer && <span className="ml-2 text-[11px]">（正答）</span>}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}

          <div className="rounded-xl bg-gray-50 p-3">
            <p className="text-xs font-semibold text-gray-700">解説</p>
            {reveal === null ? (
              <p className="mt-1 text-xs text-gray-400">読み込み中…</p>
            ) : reveal.explanation ? (
              <>
                <p className="mt-1 whitespace-pre-wrap text-sm leading-7 text-gray-700">{reveal.explanation}</p>
                {reveal.explanation_source === "ai" && (
                  <p className="mt-2 text-[11px] leading-5 text-gray-400">
                    この解説はAIが作成したもので、誤りを含むことがあります。教科書・ガイドラインで確認してください。
                  </p>
                )}
              </>
            ) : (
              <p className="mt-1 text-xs text-gray-400">この問題の解説は、まだありません。</p>
            )}
            {reveal?.ref_url && (
              <p className="mt-2 text-xs text-gray-500">
                外部サイトの{" "}
                <a href={reveal.ref_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  明日へブログ
                </a>{" "}
                も参考になります。
              </p>
            )}
          </div>

          <p className="text-[11px] text-gray-400">
            第{exam}回 {SESSION_LABEL[session]}問{item.no}
          </p>
        </div>
      )}
    </div>
  );
}
