"use client";

import { useCallback, useEffect, useState } from "react";
import TeacherPage from "@/components/teacher/TeacherPage";
import { notify } from "@/lib/notify";
import { askConfirm } from "@/lib/confirm";
import {
  StudyBook,
  StudyUnit,
  StudyStudentProgress,
  listStudyBooks,
  createStudyBook,
  archiveStudyBook,
  listStudyUnits,
  addStudyUnit,
  deleteStudyUnit,
  getTeacherStudyProgress,
} from "@/lib/studyBooks";

// 先生用: 参考書の進捗機能。本の名前・単元名は先生の自由入力。本の中身（問題・解説）は、いっさい扱わない

function BookUnits({ bookId }: { bookId: string }) {
  const [units, setUnits] = useState<StudyUnit[] | null>(null);
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
          {units.map((u) => (
            <li key={u.id} className="flex items-center justify-between gap-2 py-1.5 text-xs">
              <span>
                {u.name}（p.{u.page_start}〜{u.page_end}）
              </span>
              <button onClick={() => handleDelete(u.id)} className="shrink-0 text-red-500 underline">
                削除
              </button>
            </li>
          ))}
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

function BookProgress({ bookId }: { bookId: string }) {
  const [rows, setRows] = useState<StudyStudentProgress[] | null>(null);
  useEffect(() => {
    getTeacherStudyProgress(bookId).then(setRows);
  }, [bookId]);

  if (rows === null) return <p className="text-xs text-gray-400">読み込み中…</p>;
  if (rows.length === 0) return <p className="text-xs text-gray-500">まだ、クラスに学生がいません。</p>;

  return (
    <ul className="divide-y divide-gray-100">
      {rows.map((r) => (
        <li key={r.user_id} className="py-1.5 text-xs">
          <span className="font-medium">{r.name}</span>
          <span className="ml-2 text-gray-500">
            {r.furthest_page ? `p.${r.furthest_page}まで（記録${r.log_count}回・最終 ${r.last_studied_on}）` : "記録なし"}
          </span>
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
