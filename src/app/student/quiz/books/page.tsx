"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { notify } from "@/lib/notify";
import { askConfirm } from "@/lib/confirm";
import { useMyAccount } from "@/lib/useMyAccount";
import { useRequireQuizAccess } from "@/lib/useQuizAccess";
import {
  MyStudyBook,
  StudyUnit,
  StudyLog,
  listMyBooks,
  listStudyUnits,
  addStudyLogPages,
  deleteStudyLog,
  updateStudyLog,
  listMyStudyLogs,
  understandingLabel,
} from "@/lib/studyBooks";
import { LoadingScreen } from "@/components/states";

// 学生用: 参考書の進捗。ページをタップ、または範囲でまとめて選んで記録する。本の中身は一切扱わない

function todayStr() {
  return new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Tokyo" });
}

function pageCounts(logs: StudyLog[]): Map<number, number> {
  const m = new Map<number, number>();
  for (const l of logs) for (let p = l.page_start; p <= l.page_end; p++) m.set(p, (m.get(p) ?? 0) + 1);
  return m;
}

// 記録した回数（0〜5回以上）で、気温・降水量の予報のように、少しずつ色を濃くする。0回・1回は、今までどおりの色のまま
const CELL_COLORS = [
  "bg-gray-100 text-gray-500 active:bg-gray-200",
  "bg-emerald-100 text-emerald-700",
  "bg-teal-500 text-white",
  "bg-blue-500 text-white",
  "bg-indigo-500 text-white",
  "bg-purple-600 text-white",
];
function cellColor(n: number) {
  return CELL_COLORS[Math.min(Math.max(n, 0), 5)];
}

// 理解度（0.0〜10.0）を、細い線の上の丸を動かして選ぶ
function UnderstandingSlider({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs text-gray-600">
        <span>理解度</span>
        <span className="font-semibold text-gray-800">
          {value.toFixed(1)}　{understandingLabel(value)}
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={10}
        step={0.1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label="理解度"
        className="mt-2 h-4 w-full cursor-pointer appearance-none bg-transparent
          [&::-webkit-slider-runnable-track]:h-1.5 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-blue-950
          [&::-moz-range-track]:h-1.5 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-blue-950
          [&::-webkit-slider-thumb]:-mt-[5px] [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-500
          [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-emerald-500"
      />
    </div>
  );
}

function EditLogRow({ log, onDone }: { log: StudyLog; onDone: (changed: boolean) => void }) {
  const [start, setStart] = useState(String(log.page_start));
  const [end, setEnd] = useState(String(log.page_end));
  const [date, setDate] = useState(log.studied_on);
  const [understanding, setUnderstanding] = useState(log.understanding ?? 5);
  const [busy, setBusy] = useState(false);

  async function handleSave() {
    const s = Number(start);
    const e = Number(end);
    if (!s || !e || e < s) {
      notify("正しいページ範囲を入れてください");
      return;
    }
    setBusy(true);
    const ok = await updateStudyLog(log.id, s, e, date, understanding);
    setBusy(false);
    if (!ok) {
      notify("変更できませんでした");
      return;
    }
    onDone(true);
  }

  return (
    <li className="space-y-2 py-2">
      <div className="grid grid-cols-3 gap-2">
        <input value={start} onChange={(e) => setStart(e.target.value)} inputMode="numeric" aria-label="開始ページ" className="min-w-0 rounded-lg border border-gray-300 px-2 py-1 text-xs" />
        <input value={end} onChange={(e) => setEnd(e.target.value)} inputMode="numeric" aria-label="終了ページ" className="min-w-0 rounded-lg border border-gray-300 px-2 py-1 text-xs" />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} aria-label="日付" className="min-w-0 rounded-lg border border-gray-300 px-2 py-1 text-xs" />
      </div>
      <UnderstandingSlider value={understanding} onChange={setUnderstanding} />
      <div className="flex gap-2">
        <button onClick={handleSave} disabled={busy} className="rounded-full bg-black px-3 py-1 text-xs font-medium text-white disabled:opacity-40">
          保存
        </button>
        <button onClick={() => onDone(false)} className="rounded-full border border-gray-300 px-3 py-1 text-xs font-medium text-gray-700">
          やめる
        </button>
      </div>
    </li>
  );
}

function BookDetail({ book, onBack }: { book: MyStudyBook; onBack: () => void }) {
  const [units, setUnits] = useState<StudyUnit[] | null>(null);
  const [logs, setLogs] = useState<StudyLog[] | null>(null);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [rangeFrom, setRangeFrom] = useState("");
  const [rangeTo, setRangeTo] = useState("");
  const [date, setDate] = useState(todayStr());
  const [understanding, setUnderstanding] = useState(5);
  const [extra, setExtra] = useState(0);
  const [busy, setBusy] = useState(false);
  const [editingLogId, setEditingLogId] = useState<string | null>(null);
  const [jumpTo, setJumpTo] = useState("");
  const [pendingJump, setPendingJump] = useState<number | null>(null);
  const cellRefs = useRef<Map<number, HTMLButtonElement>>(new Map());

  const load = useCallback(async () => {
    const [u, l] = await Promise.all([listStudyUnits(book.id), listMyStudyLogs(book.id, 200)]);
    setUnits(u);
    setLogs(l);
  }, [book.id]);
  useEffect(() => {
    load();
  }, [load]);

  const counts = useMemo(() => (logs ? pageCounts(logs) : new Map<number, number>()), [logs]);
  const furthest = logs && logs.length > 0 ? Math.max(...logs.map((l) => l.page_end)) : 0;
  const unitMax = units && units.length > 0 ? Math.max(...units.map((u) => u.page_end)) : 0;
  const visibleMax = Math.max(book.total_pages ?? 0, unitMax, furthest, 30) + extra;

  function toggle(p: number) {
    setSelected((s) => {
      const next = new Set(s);
      if (next.has(p)) next.delete(p);
      else next.add(p);
      return next;
    });
  }

  function addRange() {
    const from = Number(rangeFrom);
    const to = Number(rangeTo);
    if (!from || !to || to < from) {
      notify("正しいページ範囲を入れてください（開始・終了とも）");
      return;
    }
    if (to - from > 500) {
      notify("一度に選べるのは500ページまでです");
      return;
    }
    setSelected((s) => {
      const next = new Set(s);
      for (let p = from; p <= to; p++) next.add(p);
      return next;
    });
    setRangeFrom("");
    setRangeTo("");
    notify(`p.${from}〜${to} を選択に追加しました`);
  }

  async function handleSave() {
    if (selected.size === 0) {
      notify("ページを選んでください");
      return;
    }
    setBusy(true);
    const ok = await addStudyLogPages(book.id, [...selected], date, understanding);
    setBusy(false);
    if (!ok) {
      notify("記録できませんでした");
      return;
    }
    notify(`${selected.size}ページ、記録しました`);
    setSelected(new Set());
    setUnderstanding(5);
    load();
  }

  async function handleDeleteLog(id: string) {
    if (!(await askConfirm("この記録を削除します。よろしいですか？"))) return;
    if (await deleteStudyLog(id)) load();
    else notify("削除できませんでした");
  }

  function handleJump() {
    const target = Number(jumpTo);
    if (!target || target < 1) {
      notify("正しいページ番号を入れてください");
      return;
    }
    if (target > visibleMax) setExtra((e) => e + (target - visibleMax) + 10);
    setPendingJump(target);
  }

  useEffect(() => {
    if (pendingJump == null) return;
    const el = cellRefs.current.get(pendingJump);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      setPendingJump(null);
    }
  }, [pendingJump, extra]);

  const unitAt = (p: number) => units?.find((u) => u.page_start <= p && p <= u.page_end);

  const cells: React.ReactNode[] = [];
  let lastLabel: string | null = null;
  for (let p = 1; p <= visibleMax; p++) {
    const u = unitAt(p);
    const label = u ? `${u.name}（p.${u.page_start}〜${u.page_end}）` : "その他";
    if (label !== lastLabel) {
      cells.push(
        <p key={`h${p}`} className="col-span-full mt-2 text-[10px] font-semibold text-gray-500 first:mt-0">
          {label}
        </p>
      );
      lastLabel = label;
    }
    const count = counts.get(p) ?? 0;
    const isSelected = selected.has(p);
    cells.push(
      <button
        key={p}
        ref={(el) => {
          if (el) cellRefs.current.set(p, el);
          else cellRefs.current.delete(p);
        }}
        onClick={() => toggle(p)}
        aria-label={`${p}ページ${count > 0 ? `（記録${count}回）` : ""}${isSelected ? "（選択中）" : ""}`}
        aria-pressed={isSelected}
        className={`h-7 w-7 shrink-0 rounded text-[9px] font-medium transition ${isSelected ? "bg-emerald-500 text-white" : cellColor(count)}`}
      >
        {p}
      </button>
    );
  }

  return (
    <section className="space-y-3">
      <button onClick={onBack} className="text-xs text-gray-400">
        ← 参考書を選びなおす
      </button>

      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <p className="text-sm font-semibold">{book.name}</p>
        <p className="mt-0.5 text-xs text-gray-500">
          {book.class_name} ・ {counts.size}ページ記録済み
          {book.total_pages ? `（全${book.total_pages}ページ中）` : ""}
        </p>
      </div>

      <div className="space-y-2 rounded-2xl bg-white p-4 shadow-sm">
        <p className="text-xs font-semibold text-gray-700">まとめて選ぶ</p>
        <div className="grid grid-cols-2 gap-2">
          <input value={rangeFrom} onChange={(e) => setRangeFrom(e.target.value)} placeholder="開始p" inputMode="numeric" aria-label="開始ページ" className="min-w-0 rounded-lg border border-gray-300 px-2 py-1.5 text-sm" />
          <input value={rangeTo} onChange={(e) => setRangeTo(e.target.value)} placeholder="終了p" inputMode="numeric" aria-label="終了ページ" className="min-w-0 rounded-lg border border-gray-300 px-2 py-1.5 text-sm" />
        </div>
        <button onClick={addRange} className="w-full rounded-full border border-gray-300 py-1.5 text-xs font-medium text-gray-700">
          選択に追加
        </button>
      </div>

      <div className="space-y-2 rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-semibold text-gray-700">タップして選ぶ</p>
          <div className="flex flex-wrap items-center justify-end gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <span key={n} className={`rounded px-1.5 py-0.5 text-[9px] font-medium ${CELL_COLORS[n]}`}>
                {n}周{n === 5 ? "+" : ""}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            value={jumpTo}
            onChange={(e) => setJumpTo(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleJump()}
            placeholder="ページ番号"
            inputMode="numeric"
            aria-label="移動したいページ番号"
            className="w-24 min-w-0 rounded-lg border border-gray-300 px-2 py-1.5 text-sm"
          />
          <button onClick={handleJump} className="rounded-full border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700">
            そのページへ移動
          </button>
        </div>
        <div className="max-h-96 overflow-y-auto rounded-xl border border-gray-100 p-2">
          <div className="grid grid-cols-8 gap-1 sm:grid-cols-10">{cells}</div>
          <button onClick={() => setExtra((e) => e + 50)} className="mt-2 text-xs text-gray-400 underline">
            もっと表示（+50ページ）
          </button>
        </div>
      </div>

      <div className="sticky bottom-16 z-10 space-y-2 rounded-2xl bg-white p-4 shadow-md">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-gray-600">選択中: {selected.size}ページ</p>
          <label className="flex items-center gap-1.5 text-xs text-gray-500">
            日付
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} aria-label="日付" className="rounded-lg border border-gray-300 px-2 py-1 text-xs" />
          </label>
        </div>
        <UnderstandingSlider value={understanding} onChange={setUnderstanding} />
        <button onClick={handleSave} disabled={busy || selected.size === 0} className="w-full rounded-full bg-black py-2.5 text-sm font-medium text-white disabled:opacity-40">
          記録する
        </button>
        <p className="text-[11px] text-gray-400">この記録は、クラスの先生に見えます。</p>
      </div>

      {logs && logs.length > 0 && (
        <details className="rounded-2xl bg-white shadow-sm">
          <summary className="cursor-pointer list-none px-4 py-3 text-xs font-medium text-gray-700">これまでの記録 ▾</summary>
          <ul className="divide-y divide-gray-100 px-4 pb-3">
            {logs.map((l) =>
              editingLogId === l.id ? (
                <EditLogRow
                  key={l.id}
                  log={l}
                  onDone={(changed) => {
                    setEditingLogId(null);
                    if (changed) load();
                  }}
                />
              ) : (
                <li key={l.id} className="flex items-center justify-between gap-2 py-1.5 text-xs">
                  <span>
                    {l.studied_on} ・ p.{l.page_start}〜{l.page_end}
                    {l.understanding != null && ` ・ 理解度 ${l.understanding.toFixed(1)}（${understandingLabel(l.understanding)}）`}
                  </span>
                  <span className="flex shrink-0 gap-2">
                    <button onClick={() => setEditingLogId(l.id)} className="text-gray-500 underline">
                      編集
                    </button>
                    <button onClick={() => handleDeleteLog(l.id)} className="text-red-500 underline">
                      削除
                    </button>
                  </span>
                </li>
              )
            )}
          </ul>
        </details>
      )}
    </section>
  );
}

function BooksList({ books, onSelect }: { books: MyStudyBook[]; onSelect: (b: MyStudyBook) => void }) {
  if (books.length === 0) {
    return <p className="rounded-2xl bg-white p-4 text-xs leading-5 text-gray-500 shadow-sm">まだ、参考書は登録されていません。先生が登録すると、ここに表示されます。</p>;
  }
  return (
    <ul className="space-y-2">
      {books.map((b) => (
        <li key={b.id}>
          <button onClick={() => onSelect(b)} className="block w-full rounded-2xl bg-white p-4 text-left shadow-sm transition active:bg-gray-50">
            <p className="text-sm font-semibold">{b.name}</p>
            <p className="mt-0.5 text-[11px] text-gray-400">
              {b.class_name}
              {b.total_pages ? ` ・ 全${b.total_pages}ページ` : ""} ・ 単元 {b.unit_count}件
            </p>
          </button>
        </li>
      ))}
    </ul>
  );
}

export default function StudyBooksPage() {
  useRequireQuizAccess();
  const { loading } = useMyAccount(["student", "pt"]);
  const [books, setBooks] = useState<MyStudyBook[] | null>(null);
  const [selected, setSelected] = useState<MyStudyBook | null>(null);

  useEffect(() => {
    if (loading) return;
    listMyBooks().then(setBooks);
  }, [loading]);

  if (loading || books === null) return <LoadingScreen />;

  return (
    <main className="min-h-screen bg-[#fafafa] pb-28">
      <header className="border-b border-gray-100 bg-white px-6 py-5">
        <div className="mx-auto max-w-2xl">
          <Link href="/study" className="text-sm text-gray-400">
            ← 勉強
          </Link>
          <h1 className="mt-2 text-xl font-semibold tracking-tight">参考書の進捗</h1>
          <p className="mt-1 text-xs leading-5 text-gray-500">{selected ? "やったページをタップして、まとめて記録できます。" : "参考書を選んでください。"}</p>
        </div>
      </header>
      <div className="mx-auto max-w-2xl space-y-4 px-6 py-5">
        {selected ? <BookDetail book={selected} onBack={() => setSelected(null)} /> : <BooksList books={books} onSelect={setSelected} />}
      </div>
    </main>
  );
}
