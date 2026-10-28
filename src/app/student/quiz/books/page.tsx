"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { notify } from "@/lib/notify";
import { askConfirm } from "@/lib/confirm";
import { useMyAccount } from "@/lib/useMyAccount";
import { useRequireQuizAccess } from "@/lib/useQuizAccess";
import {
  StudyBook,
  StudyUnit,
  StudyLog,
  StudyProgress,
  listStudyBooks,
  listStudyUnits,
  addStudyLog,
  deleteStudyLog,
  listMyStudyLogs,
  getMyStudyProgress,
} from "@/lib/studyBooks";
import { LoadingScreen } from "@/components/states";

// 学生用: 参考書の進捗の記録。「今日はp.◯〜◯をやった」を記録すると、先生に進み具合が伝わる

function todayStr() {
  return new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Tokyo" });
}

function BookDetail({ book }: { book: StudyBook }) {
  const [units, setUnits] = useState<StudyUnit[] | null>(null);
  const [progress, setProgress] = useState<StudyProgress | null>(null);
  const [logs, setLogs] = useState<StudyLog[] | null>(null);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [date, setDate] = useState(todayStr());
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const [u, p, l] = await Promise.all([listStudyUnits(book.id), getMyStudyProgress(book.id), listMyStudyLogs(book.id)]);
    setUnits(u);
    setProgress(p);
    setLogs(l);
    setStart(String((p.furthest_page ?? 0) + 1));
  }, [book.id]);
  useEffect(() => {
    load();
  }, [load]);

  async function handleAdd() {
    const s = Number(start);
    const e = Number(end);
    if (!s || !e || e < s) {
      notify("正しいページ範囲を入れてください");
      return;
    }
    setBusy(true);
    const ok = await addStudyLog(book.id, s, e, date);
    setBusy(false);
    if (!ok) {
      notify("記録できませんでした");
      return;
    }
    setEnd("");
    notify("記録しました");
    load();
  }

  async function handleDelete(id: string) {
    if (!(await askConfirm("この記録を削除します。よろしいですか？"))) return;
    if (await deleteStudyLog(id)) load();
    else notify("削除できませんでした");
  }

  const furthest = progress?.furthest_page ?? 0;
  const percent = book.total_pages ? Math.min(100, Math.round((furthest / book.total_pages) * 100)) : null;

  return (
    <section className="space-y-3 rounded-2xl bg-white p-4 shadow-sm">
      <div>
        <p className="text-sm font-semibold">{book.name}</p>
        <p className="mt-0.5 text-xs text-gray-500">
          {furthest > 0 ? `p.${furthest}まで記録済み` : "まだ記録がありません"}
          {book.total_pages ? `（全${book.total_pages}ページ中）` : ""}
        </p>
        {percent !== null && (
          <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-gray-100">
            <div className="h-full bg-emerald-500" style={{ width: `${percent}%` }} />
          </div>
        )}
      </div>

      {units && units.length > 0 && (
        <ul className="space-y-1 rounded-xl bg-gray-50 p-2.5 text-xs">
          {units.map((u) => {
            const done = furthest >= u.page_end;
            const inProgress = !done && furthest >= u.page_start;
            return (
              <li key={u.id} className="flex items-center justify-between gap-2">
                <span className={done ? "text-gray-400 line-through" : ""}>
                  {u.name}（p.{u.page_start}〜{u.page_end}）
                </span>
                {done && <span className="shrink-0 text-emerald-600">済み</span>}
                {inProgress && <span className="shrink-0 text-amber-600">途中</span>}
              </li>
            );
          })}
        </ul>
      )}

      <div className="space-y-2 rounded-xl bg-gray-50 p-3">
        <p className="text-xs font-semibold text-gray-700">今日のぶんを記録する</p>
        <div className="grid grid-cols-3 gap-2">
          <input value={start} onChange={(e) => setStart(e.target.value)} placeholder="開始p" inputMode="numeric" aria-label="開始ページ" className="rounded-lg border border-gray-300 px-2 py-1.5 text-sm" />
          <input value={end} onChange={(e) => setEnd(e.target.value)} placeholder="終了p" inputMode="numeric" aria-label="終了ページ" className="rounded-lg border border-gray-300 px-2 py-1.5 text-sm" />
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} aria-label="日付" className="rounded-lg border border-gray-300 px-2 py-1.5 text-sm" />
        </div>
        <button onClick={handleAdd} disabled={busy} className="w-full rounded-full bg-black py-2 text-sm font-medium text-white disabled:opacity-40">
          記録する
        </button>
        <p className="text-[11px] text-gray-400">この記録は、クラスの先生に見えます。</p>
      </div>

      {logs && logs.length > 0 && (
        <details className="rounded-xl border border-gray-200">
          <summary className="cursor-pointer list-none px-3 py-2 text-xs font-medium text-gray-700">これまでの記録 ▾</summary>
          <ul className="divide-y divide-gray-100 px-3 pb-2">
            {logs.map((l) => (
              <li key={l.id} className="flex items-center justify-between gap-2 py-1.5 text-xs">
                <span>
                  {l.studied_on} ・ p.{l.page_start}〜{l.page_end}
                </span>
                <button onClick={() => handleDelete(l.id)} className="shrink-0 text-red-500 underline">
                  削除
                </button>
              </li>
            ))}
          </ul>
        </details>
      )}
    </section>
  );
}

function BooksForClass({ classId }: { classId: string }) {
  const [books, setBooks] = useState<StudyBook[] | null>(null);
  useEffect(() => {
    listStudyBooks(classId).then((bs) => setBooks(bs.filter((b) => !b.archived)));
  }, [classId]);

  if (books === null) return <p className="py-6 text-center text-sm text-gray-400">読み込み中…</p>;
  if (books.length === 0) return <p className="rounded-2xl bg-white p-4 text-xs leading-5 text-gray-500 shadow-sm">このクラスには、まだ参考書が登録されていません。</p>;

  return (
    <div className="space-y-3">
      {books.map((b) => (
        <BookDetail key={b.id} book={b} />
      ))}
    </div>
  );
}

export default function StudyBooksPage() {
  useRequireQuizAccess();
  const { loading } = useMyAccount(["student", "pt"]);
  const [classId, setClassId] = useState<string | null>(null);
  useEffect(() => {
    setClassId(new URLSearchParams(window.location.search).get("class"));
  }, []);

  if (loading || classId === null) return <LoadingScreen />;

  return (
    <main className="min-h-screen bg-[#fafafa] pb-28">
      <header className="border-b border-gray-100 bg-white px-6 py-5">
        <div className="mx-auto max-w-2xl">
          <Link href="/student/quiz/classes" className="text-sm text-gray-400">
            ← クラスの課題
          </Link>
          <h1 className="mt-2 text-xl font-semibold tracking-tight">参考書の進捗</h1>
          <p className="mt-1 text-xs leading-5 text-gray-500">今日やったページを記録すると、先生に進み具合が伝わります。</p>
        </div>
      </header>
      <div className="mx-auto max-w-2xl space-y-4 px-6 py-5">
        {classId ? <BooksForClass classId={classId} /> : <p className="rounded-2xl bg-white p-6 text-center text-sm text-gray-600 shadow-sm">クラスが指定されていません。</p>}
      </div>
    </main>
  );
}
