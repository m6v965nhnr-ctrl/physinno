"use client";

import { useCallback, useEffect, useState } from "react";
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
  archiveStudyBook,
  listStudyUnits,
  addStudyUnit,
  updateStudyUnit,
  deleteStudyUnit,
  getTeacherStudyProgress,
  getTeacherStudentLogs,
} from "@/lib/studyBooks";

// 記録の回数（0〜5回以上）で、気温・降水量の予報のように、少しずつ色を濃くする。0回・1回は、今までどおりの色のまま
const COUNT_COLORS = ["text-gray-400", "text-gray-500", "text-emerald-500", "text-emerald-600", "text-emerald-700 font-semibold", "text-emerald-800 font-bold"];
function countColor(n: number) {
  return COUNT_COLORS[Math.min(Math.max(n, 0), 5)];
}

function expandPages(logs: StudyLog[]): Set<number> {
  const s = new Set<number>();
  for (const l of logs) for (let p = l.page_start; p <= l.page_end; p++) s.add(p);
  return s;
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

function StudentDetail({ bookId, userId, units }: { bookId: string; userId: string; units: StudyUnit[] }) {
  const [logs, setLogs] = useState<StudyLog[] | null>(null);
  useEffect(() => {
    getTeacherStudentLogs(bookId, userId).then(setLogs);
  }, [bookId, userId]);

  if (logs === null) return <p className="py-2 text-xs text-gray-400">読み込み中…</p>;

  const done = expandPages(logs);
  function unitStatus(u: StudyUnit) {
    let n = 0;
    for (let p = u.page_start; p <= u.page_end; p++) if (done.has(p)) n++;
    const total = u.page_end - u.page_start + 1;
    if (n === 0) return "未";
    if (n >= total) return "済み";
    return `途中（${n}/${total}）`;
  }

  return (
    <div className="space-y-3 border-t border-gray-100 pt-2">
      {units.length > 0 && (
        <ul className="space-y-1">
          {units.map((u) => (
            <li key={u.id} className="flex justify-between text-xs">
              <span className="text-gray-600">{u.name}</span>
              <span className="text-gray-400">{unitStatus(u)}</span>
            </li>
          ))}
        </ul>
      )}
      {logs.length === 0 ? (
        <p className="text-xs text-gray-400">まだ記録がありません。</p>
      ) : (
        <ul className="space-y-1">
          {logs.map((l) => (
            <li key={l.id} className="text-xs text-gray-500">
              {l.studied_on} ・ p.{l.page_start}
              {l.page_end !== l.page_start ? `-${l.page_end}` : ""}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function BookProgress({ bookId }: { bookId: string }) {
  const [rows, setRows] = useState<StudyStudentProgress[] | null>(null);
  const [units, setUnits] = useState<StudyUnit[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  useEffect(() => {
    getTeacherStudyProgress(bookId).then(setRows);
    listStudyUnits(bookId).then(setUnits);
  }, [bookId]);

  if (rows === null) return <p className="text-xs text-gray-400">読み込み中…</p>;
  if (rows.length === 0) return <p className="text-xs text-gray-500">まだ、クラスに学生がいません。</p>;

  return (
    <ul className="divide-y divide-gray-100">
      {rows.map((r) => (
        <li key={r.user_id} className="py-1.5">
          <button onClick={() => setExpanded(expanded === r.user_id ? null : r.user_id)} className="w-full text-left text-xs">
            <span className="font-medium">{r.name}</span>
            <span className={`ml-2 ${countColor(r.log_count)}`}>
              {r.furthest_page ? `p.${r.furthest_page}まで（記録${r.log_count}回・最終 ${r.last_studied_on}）` : "記録なし"}
            </span>
          </button>
          {expanded === r.user_id && <StudentDetail bookId={bookId} userId={r.user_id} units={units} />}
        </li>
      ))}
    </ul>
  );
}

function BookCard({ book, onChanged }: { book: StudyBook; onChanged: () => void }) {
  const [open, setOpen] = useState<"units" | "progress" | null>(null);

  async function handleArchiveToggle() {
    if (!book.archived && !(await askConfirm(`「${book.name}」を終了します。学生には見えなくなります。よろしいですか？`))) return;
    if (await archiveStudyBook(book.id, !book.archived)) onChanged();
    else notify("変更できませんでした");
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
        <button onClick={handleArchiveToggle} className="shrink-0 text-[11px] text-gray-400 underline">
          {book.archived ? "再開する" : "終了する"}
        </button>
      </div>
      <div className="flex gap-2">
        <button onClick={() => setOpen(open === "units" ? null : "units")} className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700">
          単元を編集
        </button>
        <button onClick={() => setOpen(open === "progress" ? null : "progress")} className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700">
          学生の進み具合
        </button>
      </div>
      {open === "units" && (
        <div className="space-y-3 rounded-xl bg-gray-50 p-3">
          <BookUnits bookId={book.id} />
          <button onClick={() => setOpen(null)} className="w-full rounded-full bg-black py-2 text-xs font-medium text-white">
            完了
          </button>
        </div>
      )}
      {open === "progress" && (
        <div className="space-y-3 rounded-xl bg-gray-50 p-3">
          <BookProgress bookId={book.id} />
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
