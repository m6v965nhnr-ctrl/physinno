"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import TeacherPage from "@/components/teacher/TeacherPage";
import { notify } from "@/lib/notify";
import { askConfirm } from "@/lib/confirm";
import {
  StudyBook,
  StudyUnit,
  StudyLog,
  StudyStudentProgress,
  listStudyBooks,
  createStudyBook,
  updateStudyBook,
  archiveStudyBook,
  listStudyUnits,
  addStudyUnit,
  updateStudyUnit,
  deleteStudyUnit,
  getTeacherStudyProgress,
  getTeacherStudentLogs,
} from "@/lib/studyBooks";

// 記録の回数（0〜5回以上）で、気温・降水量の予報のように、少しずつ色を濃くする。0回・1回は、今までどおりの色のまま
const COUNT_COLORS = ["text-gray-400", "text-gray-500", "text-teal-600", "text-blue-600", "text-indigo-600", "text-purple-600 font-semibold"];
function countColor(n: number) {
  return COUNT_COLORS[Math.min(Math.max(n, 0), 5)];
}

function pageCounts(logs: StudyLog[]): Map<number, number> {
  const m = new Map<number, number>();
  for (const l of logs) for (let p = l.page_start; p <= l.page_end; p++) m.set(p, (m.get(p) ?? 0) + 1);
  return m;
}

// 学生のマス目と同じ色（1周目〜5周目以上）。バーの左から、回数の少ない色→多い色の順に積み上げ、残りは灰色（未）
const BAR_COLORS = ["bg-emerald-400", "bg-teal-500", "bg-blue-500", "bg-indigo-500", "bg-purple-600"];
function ProgressBar({ counts, from, to }: { counts: Map<number, number>; from: number; to: number }) {
  const total = to - from + 1;
  if (total <= 0) return null;
  const buckets = [0, 0, 0, 0, 0];
  for (let p = from; p <= to; p++) {
    const c = counts.get(p) ?? 0;
    if (c > 0) buckets[Math.min(c, 5) - 1]++;
  }
  const done = buckets.reduce((a, b) => a + b, 0);
  return (
    <div className="space-y-1">
      <div className="flex h-3 w-full overflow-hidden rounded-full bg-gray-200">
        {buckets.map((n, i) => (n > 0 ? <div key={i} className={BAR_COLORS[i]} style={{ width: `${(n / total) * 100}%` }} /> : null))}
      </div>
      <p className="text-[10px] text-gray-400">
        {done}/{total}ページ（{Math.round((done / total) * 100)}%）
      </p>
    </div>
  );
}

// 先生用: 参考書の進捗機能。本の名前・単元名は先生の自由入力。本の中身（問題・解説）は、いっさい扱わない

function EditUnitRow({ unit, onDone }: { unit: StudyUnit; onDone: (changed: boolean) => void }) {
  const [name, setName] = useState(unit.name);
  const [start, setStart] = useState(String(unit.page_start));
  const [end, setEnd] = useState(String(unit.page_end));
  const [busy, setBusy] = useState(false);

  async function handleSave() {
    const s = Number(start);
    const e = Number(end);
    if (!name.trim() || !s || !e || e < s) {
      notify("単元名と、正しいページ範囲を入れてください");
      return;
    }
    setBusy(true);
    const ok = await updateStudyUnit(unit.id, name.trim(), s, e);
    setBusy(false);
    if (!ok) {
      notify("変更できませんでした");
      return;
    }
    onDone(true);
  }

  return (
    <li className="space-y-2 py-2">
      <div className="grid grid-cols-[1fr_4rem_4rem] gap-2">
        <input value={name} onChange={(e) => setName(e.target.value)} maxLength={60} aria-label="単元名" className="rounded-lg border border-gray-300 px-2 py-1.5 text-xs" />
        <input value={start} onChange={(e) => setStart(e.target.value)} inputMode="numeric" aria-label="開始ページ" className="rounded-lg border border-gray-300 px-2 py-1.5 text-xs" />
        <input value={end} onChange={(e) => setEnd(e.target.value)} inputMode="numeric" aria-label="終了ページ" className="rounded-lg border border-gray-300 px-2 py-1.5 text-xs" />
      </div>
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

function BookUnits({ bookId }: { bookId: string }) {
  const [units, setUnits] = useState<StudyUnit[] | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => setUnits(await listStudyUnits(bookId)), [bookId]);
  useEffect(() => {
    load();
  }, [load]);

  async function handleAdd() {
    const s = Number(start);
    const e = Number(end);
    if (!name.trim() || !s || !e || e < s) {
      notify("単元名と、正しいページ範囲を入れてください");
      return;
    }
    setBusy(true);
    const id = await addStudyUnit(bookId, name.trim(), s, e);
    setBusy(false);
    if (!id) {
      notify("追加できませんでした");
      return;
    }
    setName("");
    setStart("");
    setEnd("");
    load();
  }

  async function handleDelete(unitId: string) {
    if (!(await askConfirm("この単元を削除します。よろしいですか？"))) return;
    if (await deleteStudyUnit(unitId)) load();
    else notify("削除できませんでした");
  }

  return (
    <div className="space-y-2">
      {units === null ? (
        <p className="text-xs text-gray-400">読み込み中…</p>
      ) : units.length === 0 ? (
        <p className="text-xs text-gray-500">単元はまだありません。</p>
      ) : (
        <ul className="divide-y divide-gray-100">
          {units.map((u) =>
            editingId === u.id ? (
              <EditUnitRow
                key={u.id}
                unit={u}
                onDone={(changed) => {
                  setEditingId(null);
                  if (changed) load();
                }}
              />
            ) : (
              <li key={u.id} className="flex items-center justify-between gap-2 py-1.5 text-xs">
                <span>
                  {u.name}（p.{u.page_start}〜{u.page_end}）
                </span>
                <span className="flex shrink-0 gap-2">
                  <button onClick={() => setEditingId(u.id)} className="text-gray-500 underline">
                    編集
                  </button>
                  <button onClick={() => handleDelete(u.id)} className="text-red-500 underline">
                    削除
                  </button>
                </span>
              </li>
            )
          )}
        </ul>
      )}
      <div className="grid grid-cols-[1fr_4rem_4rem] gap-2">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="単元名（例：呼吸器）" maxLength={60} aria-label="単元名" className="rounded-lg border border-gray-300 px-2 py-1.5 text-xs" />
        <input value={start} onChange={(e) => setStart(e.target.value)} placeholder="開始p" inputMode="numeric" aria-label="開始ページ" className="rounded-lg border border-gray-300 px-2 py-1.5 text-xs" />
        <input value={end} onChange={(e) => setEnd(e.target.value)} placeholder="終了p" inputMode="numeric" aria-label="終了ページ" className="rounded-lg border border-gray-300 px-2 py-1.5 text-xs" />
      </div>
      <button onClick={handleAdd} disabled={busy} className="rounded-full border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 disabled:opacity-40">
        単元を追加
      </button>
    </div>
  );
}

// 先生が、生徒名をタップしたときに出す、その生徒ひとりの画面（テストの得点の推移と同じ、モーダルの見せ方）
function StudentProgressDetail({
  bookId,
  userId,
  name,
  totalPages,
  units,
  onClose,
}: {
  bookId: string;
  userId: string;
  name: string;
  totalPages: number | null;
  units: StudyUnit[];
  onClose: () => void;
}) {
  const [logs, setLogs] = useState<StudyLog[] | null>(null);
  useEffect(() => {
    getTeacherStudentLogs(bookId, userId).then(setLogs);
  }, [bookId, userId]);

  const counts = logs ? pageCounts(logs) : new Map<number, number>();

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-end justify-center bg-black/40 sm:items-center" role="dialog" aria-modal="true" aria-label={`${name}さんの参考書の進み具合`}>
      <div className="max-h-[80dvh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:rounded-2xl">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-semibold">{name}さんの参考書の進み具合</p>
          <button type="button" onClick={onClose} className="rounded-full border border-gray-300 px-3 py-1 text-xs text-gray-700">
            閉じる
          </button>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-1">
          {BAR_COLORS.map((c, i) => (
            <span key={i} className={`rounded px-1.5 py-0.5 text-[9px] font-medium text-white ${c}`}>
              {i + 1}周{i === BAR_COLORS.length - 1 ? "+" : ""}
            </span>
          ))}
        </div>
        {logs === null ? (
          <p className="py-8 text-center text-xs text-gray-400">読み込み中…</p>
        ) : (
          <div className="mt-3 space-y-4">
            {totalPages ? (
              <div>
                <p className="mb-1 text-xs font-semibold text-gray-700">全体</p>
                <ProgressBar counts={counts} from={1} to={totalPages} />
              </div>
            ) : null}
            {units.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-700">単元ごと</p>
                {units.map((u) => (
                  <div key={u.id}>
                    <p className="mb-1 text-xs text-gray-600">{u.name}</p>
                    <ProgressBar counts={counts} from={u.page_start} to={u.page_end} />
                  </div>
                ))}
              </div>
            )}
            {logs.length === 0 ? (
              <p className="text-xs text-gray-400">まだ記録がありません。</p>
            ) : (
              <ul className="divide-y divide-gray-100">
                {logs.map((l) => (
                  <li key={l.id} className="py-1.5 text-xs text-gray-500">
                    {l.studied_on} ・ p.{l.page_start}
                    {l.page_end !== l.page_start ? `-${l.page_end}` : ""}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

function BookProgress({ book }: { book: StudyBook }) {
  const [rows, setRows] = useState<StudyStudentProgress[] | null>(null);
  const [units, setUnits] = useState<StudyUnit[]>([]);
  const [opened, setOpened] = useState<StudyStudentProgress | null>(null);
  useEffect(() => {
    getTeacherStudyProgress(book.id).then(setRows);
    listStudyUnits(book.id).then(setUnits);
  }, [book.id]);

  if (rows === null) return <p className="text-xs text-gray-400">読み込み中…</p>;
  if (rows.length === 0) return <p className="text-xs text-gray-500">まだ、クラスに学生がいません。</p>;

  // 総ページ数が未登録でも、単元の一番大きいページ番号を「全体」の目安として使う
  const effectiveTotal = book.total_pages ?? (units.length > 0 ? Math.max(...units.map((u) => u.page_end)) : null);

  return (
    <>
      <ul className="divide-y divide-gray-100">
        {rows.map((r) => (
          <li key={r.user_id} className="py-1.5 text-xs">
            <button type="button" onClick={() => setOpened(r)} className="text-left font-medium text-sky-800 underline decoration-dotted">
              {r.name}
            </button>
            <span className={`ml-2 ${countColor(r.log_count)}`}>
              {r.furthest_page ? `p.${r.furthest_page}まで（記録${r.log_count}回・最終 ${r.last_studied_on}）` : "記録なし"}
            </span>
          </li>
        ))}
      </ul>
      {opened && (
        <StudentProgressDetail bookId={book.id} userId={opened.user_id} name={opened.name} totalPages={effectiveTotal} units={units} onClose={() => setOpened(null)} />
      )}
    </>
  );
}

function EditBookHeader({ book, onDone }: { book: StudyBook; onDone: (changed: boolean) => void }) {
  const [name, setName] = useState(book.name);
  const [totalPages, setTotalPages] = useState(book.total_pages ? String(book.total_pages) : "");
  const [busy, setBusy] = useState(false);

  async function handleSave() {
    if (!name.trim()) {
      notify("参考書の名前を入れてください");
      return;
    }
    setBusy(true);
    const ok = await updateStudyBook(book.id, name.trim(), totalPages.trim() ? Number(totalPages) : null);
    setBusy(false);
    if (!ok) {
      notify("変更できませんでした");
      return;
    }
    onDone(true);
  }

  return (
    <div className="space-y-2">
      <input value={name} onChange={(e) => setName(e.target.value)} maxLength={80} aria-label="参考書の名前" className="w-full rounded-lg border border-gray-300 px-2 py-1.5 text-sm" />
      <input
        value={totalPages}
        onChange={(e) => setTotalPages(e.target.value)}
        placeholder="総ページ数（任意）"
        inputMode="numeric"
        aria-label="総ページ数"
        className="w-full rounded-lg border border-gray-300 px-2 py-1.5 text-sm"
      />
      <div className="flex gap-2">
        <button onClick={handleSave} disabled={busy} className="rounded-full bg-black px-3 py-1 text-xs font-medium text-white disabled:opacity-40">
          保存
        </button>
        <button onClick={() => onDone(false)} className="rounded-full border border-gray-300 px-3 py-1 text-xs font-medium text-gray-700">
          やめる
        </button>
      </div>
    </div>
  );
}

function BookCard({ book, onChanged }: { book: StudyBook; onChanged: () => void }) {
  const [open, setOpen] = useState<"units" | "progress" | null>(null);
  const [editing, setEditing] = useState(false);

  async function handleArchiveToggle() {
    if (!book.archived && !(await askConfirm(`「${book.name}」を終了します。学生には見えなくなります。よろしいですか？`))) return;
    if (await archiveStudyBook(book.id, !book.archived)) onChanged();
    else notify("変更できませんでした");
  }

  if (editing) {
    return (
      <section className="rounded-2xl bg-white p-4 shadow-sm">
        <EditBookHeader
          book={book}
          onDone={(changed) => {
            setEditing(false);
            if (changed) onChanged();
          }}
        />
      </section>
    );
  }

  return (
    <section className="space-y-2 rounded-2xl bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{book.name}</p>
          <p className="mt-0.5 text-[11px] text-gray-400">
            {book.total_pages ? `全${book.total_pages}ページ・` : ""}単元 {book.unit_count}件
            {book.archived && " ・ 終了済み"}
          </p>
        </div>
        <div className="flex shrink-0 gap-2 text-[11px] text-gray-400">
          <button onClick={() => setEditing(true)} className="underline">
            編集
          </button>
          <button onClick={handleArchiveToggle} className="underline">
            {book.archived ? "再開する" : "終了する"}
          </button>
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={() => setOpen(open === "progress" ? null : "progress")} className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700">
          学生の進み具合
        </button>
        <button onClick={() => setOpen(open === "units" ? null : "units")} className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700">
          単元を編集
        </button>
      </div>
      {open === "progress" && (
        <div className="space-y-3 rounded-xl bg-gray-50 p-3">
          <BookProgress book={book} />
          <button onClick={() => setOpen(null)} className="w-full rounded-full bg-black py-2 text-xs font-medium text-white">
            完了
          </button>
        </div>
      )}
      {open === "units" && (
        <div className="space-y-3 rounded-xl bg-gray-50 p-3">
          <BookUnits bookId={book.id} />
          <button onClick={() => setOpen(null)} className="w-full rounded-full bg-black py-2 text-xs font-medium text-white">
            完了
          </button>
        </div>
      )}
    </section>
  );
}

function BooksBody({ classId }: { classId: string }) {
  const [books, setBooks] = useState<StudyBook[] | null>(null);
  const [name, setName] = useState("");
  const [totalPages, setTotalPages] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => setBooks(await listStudyBooks(classId)), [classId]);
  useEffect(() => {
    load();
  }, [load]);

  async function handleCreate() {
    if (!name.trim()) {
      notify("参考書の名前を入れてください");
      return;
    }
    setBusy(true);
    const id = await createStudyBook(classId, name.trim(), totalPages.trim() ? Number(totalPages) : null);
    setBusy(false);
    if (!id) {
      notify("作れませんでした");
      return;
    }
    setName("");
    setTotalPages("");
    load();
  }

  return (
    <>
      <section className="space-y-2 rounded-2xl bg-white p-4 shadow-sm">
        <p className="text-sm font-semibold">参考書を追加</p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="本の名前（学生にわかればOK。例：クエスチョンバンク2026）"
          maxLength={80}
          aria-label="参考書の名前"
          className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
        />
        <input
          value={totalPages}
          onChange={(e) => setTotalPages(e.target.value)}
          placeholder="総ページ数（任意）"
          inputMode="numeric"
          aria-label="総ページ数"
          className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
        />
        <button onClick={handleCreate} disabled={busy} className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white disabled:opacity-40">
          追加する
        </button>
        <p className="text-[11px] leading-5 text-gray-400">本の中身（問題・解説）はここには載せません。ページ数と単元名だけを登録します。</p>
      </section>

      {books === null ? (
        <p className="py-6 text-center text-sm text-gray-400">読み込み中…</p>
      ) : books.length === 0 ? (
        <p className="rounded-2xl bg-white p-4 text-xs leading-5 text-gray-500 shadow-sm">参考書はまだありません。</p>
      ) : (
        <div className="space-y-3">
          {books.map((b) => (
            <BookCard key={b.id} book={b} onChanged={load} />
          ))}
        </div>
      )}
    </>
  );
}

export default function TeacherBooksPage() {
  const [classId, setClassId] = useState<string | null>(null);
  useEffect(() => {
    setClassId(new URLSearchParams(window.location.search).get("class"));
  }, []);

  return (
    <TeacherPage title="参考書" description="クラスで使っている参考書のページ数と単元を登録し、学生の進み具合を見られます。">
      {classId === null ? null : classId ? (
        <BooksBody classId={classId} />
      ) : (
        <p className="rounded-2xl bg-white p-6 text-center text-sm text-gray-600 shadow-sm">クラスが指定されていません。</p>
      )}
    </TeacherPage>
  );
}
