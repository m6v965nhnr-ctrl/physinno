"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { notify } from "@/lib/notify";
import { useMyAccount } from "@/lib/useMyAccount";
import {
  ExamSubject,
  ExamTerm,
  GRADES,
  TERMS,
  TERM_LABEL,
  School,
  addExamSubject,
  getMySchool,
  listExamSubjects,
} from "@/lib/exams";

// 試験情報: 学年・学期を選ぶと科目が並び、科目を開くと、その試験のコメントと投稿ができる
export default function ExamsPage() {
  const { loading, userId } = useMyAccount(["student", "pt"]);

  const [school, setSchool] = useState<School | null | undefined>(undefined);
  const [grade, setGrade] = useState<number | null>(null);
  const [term, setTerm] = useState<ExamTerm | null>(null);
  const [subjects, setSubjects] = useState<ExamSubject[]>([]);
  const [fetching, setFetching] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [formGrade, setFormGrade] = useState(1);
  const [formTerm, setFormTerm] = useState<ExamTerm>("first");
  const [adding, setAdding] = useState(false);

  const load = useCallback(async () => {
    setFetching(true);
    setSubjects(await listExamSubjects(grade, term));
    setFetching(false);
  }, [grade, term]);

  useEffect(() => {
    if (!userId) return;
    getMySchool(userId).then(setSchool);
  }, [userId]);

  useEffect(() => {
    if (school) load();
  }, [school, load]);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim()) {
      notify("科目名を入力してください");
      return;
    }

    setAdding(true);
    const { error } = await addExamSubject(name, formGrade, formTerm);
    setAdding(false);

    if (error) {
      notify(error);
      return;
    }

    notify("科目を追加しました");
    setName("");
    setShowForm(false);
    setGrade(formGrade);
    setTerm(formTerm);
    // 絞り込みを追加した科目に合わせたので、再取得は load の依存で走る
    if (grade === formGrade && term === formTerm) load();
  }

  if (loading || school === undefined) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-sm text-gray-400">読み込み中…</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fafafa] pb-28">
      <header className="border-b border-gray-100 bg-white px-6 py-5">
        <div className="mx-auto max-w-2xl">
          <Link href="/student" className="text-sm text-gray-400">
            ← 学生ホーム
          </Link>
          <h1 className="mt-2 text-xl font-semibold tracking-tight">試験情報（学校の科目ごと）</h1>
          <p className="mt-1 text-xs leading-5 text-gray-500">
            どんなテストだったか、出題の傾向や勉強法を、同じ学校の学生・卒業生で共有します。投稿者は表示されません。
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-6 py-5">
        {!school ? (
          <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
            <p className="text-sm font-semibold text-gray-900">先に、学校を登録してください</p>
            <p className="mt-2 text-xs leading-5 text-gray-500">
              試験情報は、同じ学校を登録した人どうしで共有します。設定で、養成校名を入力してください。
            </p>
            <Link
              href="/student/settings"
              className="mt-4 inline-block rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white"
            >
              設定を開く
            </Link>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">{school.name}</span> の試験情報
            </p>

            <fieldset className="mt-3">
              <legend className="text-xs text-gray-500">学年</legend>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {[null, ...GRADES.slice(0, 4)].map((g) => (
                  <button
                    key={g ?? "all"}
                    onClick={() => setGrade(g)}
                    aria-pressed={grade === g}
                    className={`rounded-full border px-3 py-1.5 text-xs ${
                      grade === g ? "border-black bg-black text-white" : "border-gray-200 bg-white text-gray-600"
                    }`}
                  >
                    {g ? `${g}年生` : "すべて"}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-3">
              <legend className="text-xs text-gray-500">学期</legend>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {[null, ...TERMS].map((t) => (
                  <button
                    key={t ?? "all"}
                    onClick={() => setTerm(t)}
                    aria-pressed={term === t}
                    className={`rounded-full border px-3 py-1.5 text-xs ${
                      term === t ? "border-black bg-black text-white" : "border-gray-200 bg-white text-gray-600"
                    }`}
                  >
                    {t ? TERM_LABEL[t] : "すべて"}
                  </button>
                ))}
              </div>
            </fieldset>

            <ul className="mt-5 space-y-2.5">
              {!fetching && subjects.length === 0 && (
                <li className="rounded-2xl bg-white p-6 text-center text-sm text-gray-400 shadow-sm">
                  この条件の科目はまだありません。下の「科目を追加」から登録できます。
                </li>
              )}

              {subjects.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/student/exams/${s.id}`}
                    className="flex items-center justify-between gap-3 rounded-2xl bg-white p-4 shadow-sm transition hover:bg-gray-50"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-gray-900">{s.name}</span>
                      <span className="mt-0.5 block text-[11px] text-gray-400">
                        {s.grade}年生・{TERM_LABEL[s.term]}
                      </span>
                    </span>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] ${
                        s.note_count > 0 ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {s.note_count > 0 ? `メモ ${s.note_count}件` : "まだメモなし"}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-5">
              <button
                onClick={() => setShowForm((v) => !v)}
                className="w-full rounded-full border border-gray-300 bg-white py-2.5 text-sm font-medium text-gray-800"
              >
                {showForm ? "閉じる" : "+ 科目を追加"}
              </button>
            </div>

            {showForm && (
              <form onSubmit={handleAdd} className="mt-3 space-y-3 rounded-2xl bg-white p-4 shadow-sm">
                <label className="block text-xs text-gray-500">
                  科目名（授業名）
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={60}
                    required
                    placeholder="例: 運動学Ⅰ"
                    className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900"
                  />
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <label className="block text-xs text-gray-500">
                    学年
                    <select
                      value={formGrade}
                      onChange={(e) => setFormGrade(Number(e.target.value))}
                      className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900"
                    >
                      {GRADES.map((g) => (
                        <option key={g} value={g}>
                          {g}年生
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block text-xs text-gray-500">
                    学期
                    <select
                      value={formTerm}
                      onChange={(e) => setFormTerm(e.target.value as ExamTerm)}
                      className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900"
                    >
                      {TERMS.map((t) => (
                        <option key={t} value={t}>
                          {TERM_LABEL[t]}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <p className="text-[11px] leading-5 text-gray-400">
                  科目は、同じ学校の人みんなで共有されます。すでに同じ科目がないか、上の一覧を確認してから追加してください。
                </p>

                <button
                  type="submit"
                  disabled={adding}
                  className="w-full rounded-full bg-black py-2.5 text-sm font-medium text-white disabled:opacity-50"
                >
                  {adding ? "追加中…" : "追加する"}
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </main>
  );
}
