"use client";

import { useCallback, useEffect, useId, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import ReportButton from "@/components/ReportButton";
import { notify } from "@/lib/notify";
import { findPrivacyRisk } from "@/lib/privacyCheck";
import { useMyAccount } from "@/lib/useMyAccount";
import {
  DIFFICULTY_LABEL,
  EXAM_TYPES,
  EXAM_TYPE_LABEL,
  ExamNote,
  ExamSubjectDetail,
  ExamType,
  TERM_LABEL,
  deleteExamNote,
  getExamFileUrl,
  getExamSubject,
  listExamNotes,
  postExamNote,
  uploadExamFile,
  validateExamFile,
} from "@/lib/exams";

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
}

// 科目の試験ページ: 試験メモ(出題の傾向・覚えている出題内容・ファイル)を読み、投稿できる
export default function ExamSubjectPage() {
  const params = useParams();
  const id = params.id as string;
  const titleId = useId();

  const { loading, userId } = useMyAccount(["student", "pt"]);

  const [subject, setSubject] = useState<ExamSubjectDetail | null | undefined>(undefined);
  const [notes, setNotes] = useState<ExamNote[]>([]);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const thisYear = new Date().getFullYear();
  const [year, setYear] = useState(String(thisYear));
  const [examType, setExamType] = useState<ExamType>("written");
  const [difficulty, setDifficulty] = useState<number | null>(null);
  const [tendency, setTendency] = useState("");
  const [recalled, setRecalled] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [rights, setRights] = useState(false);

  const load = useCallback(async () => {
    if (!userId) return;
    const [s, n] = await Promise.all([getExamSubject(id), listExamNotes(id)]);
    setSubject(s);
    setNotes(n);
  }, [id, userId]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    if (!f) {
      setFile(null);
      return;
    }
    const problem = validateExamFile(f);
    if (problem) {
      notify(problem);
      e.target.value = "";
      setFile(null);
      return;
    }
    setFile(f);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!subject) return;

    if (!tendency.trim() && !recalled.trim() && !file) {
      notify("出題の傾向・覚えている出題内容・ファイルのどれかを入力してください");
      return;
    }

    if (file && !rights) {
      notify("ファイルを添付するときは、利用できる資料であることの確認にチェックしてください");
      return;
    }

    const risk = findPrivacyRisk(`${tendency}\n${recalled}`);
    if (
      risk &&
      !confirm(`${risk}が含まれているようです。\n個人が特定できる情報（先生や学生の個人名など）は書かないでください。このまま投稿しますか？`)
    ) {
      return;
    }

    setSaving(true);

    let filePath: string | null = null;
    if (file) {
      const uploaded = await uploadExamFile(subject.school_id, userId, file);
      if (uploaded.error || !uploaded.path) {
        setSaving(false);
        notify("ファイルをアップロードできませんでした");
        return;
      }
      filePath = uploaded.path;
    }

    const error = await postExamNote({
      subject_id: subject.id,
      academic_year: Number(year),
      exam_type: examType,
      difficulty,
      tendency,
      recalled,
      file_path: filePath,
      file_name: file ? file.name.slice(0, 200) : null,
    });

    setSaving(false);

    if (error) {
      notify("投稿できませんでした。もう一度お試しください");
      return;
    }

    notify("投稿しました。ありがとうございます");
    setOpen(false);
    setTendency("");
    setRecalled("");
    setDifficulty(null);
    setFile(null);
    setRights(false);
    load();
  }

  async function handleDelete(note: ExamNote) {
    if (!confirm("あなたの投稿を削除しますか？（添付ファイルも消えます）")) return;
    const error = await deleteExamNote(note);
    if (error) {
      notify("削除できませんでした");
      return;
    }
    load();
  }

  async function openFile(path: string) {
    const url = await getExamFileUrl(path);
    if (!url) {
      notify("ファイルを開けませんでした");
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  }

  if (loading || subject === undefined) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-sm text-gray-400">読み込み中…</p>
      </main>
    );
  }

  if (!subject) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white px-6">
        <p className="text-sm text-gray-500">この科目は見つかりませんでした（同じ学校の人だけが見られます）</p>
        <Link href="/student/exams" className="rounded-full bg-black px-5 py-2 text-sm text-white">
          試験情報へ戻る
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fafafa] pb-28">
      <header className="border-b border-gray-100 bg-white px-6 py-5">
        <div className="mx-auto max-w-2xl">
          <Link href="/student/exams" className="text-sm text-gray-400">
            ← 科目の一覧
          </Link>
          <h1 className="mt-2 text-xl font-semibold tracking-tight">{subject.name}</h1>
          <p className="mt-1 text-xs text-gray-500">
            {subject.school_name}・{subject.grade}年生・{TERM_LABEL[subject.term]}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-2xl space-y-4 px-6 py-5">
        <button
          onClick={() => setOpen(true)}
          className="w-full rounded-full bg-black py-3 text-sm font-medium text-white"
        >
          + この試験について書く
        </button>

        <ul className="space-y-3">
          {notes.length === 0 && (
            <li className="rounded-2xl bg-white p-6 text-center text-sm text-gray-400 shadow-sm">
              まだ投稿がありません。受けた試験の傾向や勉強法を、後輩のために残しませんか？
            </li>
          )}

          {notes.map((n) => (
            <li key={n.id} className="rounded-2xl bg-white p-4 shadow-sm">
              <div className="flex flex-wrap items-center gap-2 text-[11px]">
                <span className="rounded-full bg-gray-900 px-2.5 py-0.5 text-white">{n.academic_year}年度</span>
                <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-gray-700">
                  {EXAM_TYPE_LABEL[n.exam_type]}
                </span>
                {n.difficulty && (
                  <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-amber-700">
                    難易度 {n.difficulty}（{DIFFICULTY_LABEL[n.difficulty]}）
                  </span>
                )}
                <span className="ml-auto text-gray-400">{formatDate(n.created_at)}</span>
              </div>

              {n.tendency && (
                <div className="mt-3">
                  <p className="text-xs font-semibold text-gray-500">出題の傾向・勉強法</p>
                  <p className="mt-1 whitespace-pre-wrap text-sm leading-7 text-gray-800">{n.tendency}</p>
                </div>
              )}

              {n.recalled && (
                <div className="mt-3">
                  <p className="text-xs font-semibold text-gray-500">覚えている出題内容</p>
                  <p className="mt-1 whitespace-pre-wrap text-sm leading-7 text-gray-800">{n.recalled}</p>
                </div>
              )}

              {n.file_path && (
                <button
                  onClick={() => openFile(n.file_path!)}
                  className="mt-3 inline-flex max-w-full items-center gap-1.5 rounded-full border border-gray-300 px-3.5 py-2 text-xs text-gray-800 hover:bg-gray-50"
                >
                  📎 <span className="truncate">{n.file_name || "添付ファイル"}</span>
                </button>
              )}

              <div className="mt-3 flex items-center justify-between">
                <span className="text-[11px] text-gray-400">{n.is_mine ? "あなたの投稿" : "匿名"}</span>
                {n.is_mine ? (
                  <button onClick={() => handleDelete(n)} className="text-xs text-gray-400 hover:text-red-500">
                    削除
                  </button>
                ) : (
                  <ReportButton targetType="exam_note" targetId={n.id} />
                )}
              </div>
            </li>
          ))}
        </ul>

        <p className="text-[11px] leading-5 text-gray-400">
          投稿は、同じ学校の学生・卒業生だけに表示され、投稿者は分かりません。先生・学校の権利を侵害する内容や、事実と異なる内容は、各投稿の「通報」から運営へ連絡できます。
          学校・先生からの削除の申出は、
          <Link href="/contact" className="underline">
            運営へのメッセージ
          </Link>
          で受け付けています。
        </p>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[10000] flex items-end justify-center bg-black/40 sm:items-center"
          onClick={() => setOpen(false)}
        >
          <form
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onSubmit={handleSubmit}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[92vh] w-full max-w-md space-y-4 overflow-y-auto rounded-t-3xl bg-white p-5 sm:rounded-3xl"
          >
            <div className="flex items-start justify-between">
              <h2 id={titleId} className="text-base font-semibold text-gray-900">
                {subject.name}の試験について書く
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="閉じる"
                className="text-xl leading-none text-gray-400"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <label className="block text-xs text-gray-500">
                年度
                <input
                  type="number"
                  min={2000}
                  max={2100}
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  required
                  className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900"
                />
              </label>

              <label className="block text-xs text-gray-500">
                試験の種類
                <select
                  value={examType}
                  onChange={(e) => setExamType(e.target.value as ExamType)}
                  className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900"
                >
                  {EXAM_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {EXAM_TYPE_LABEL[t]}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <fieldset>
              <legend className="text-xs text-gray-500">難易度（任意）</legend>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    aria-pressed={difficulty === n}
                    onClick={() => setDifficulty(difficulty === n ? null : n)}
                    className={`rounded-full border px-3 py-1.5 text-xs ${
                      difficulty === n ? "border-black bg-black text-white" : "border-gray-200 text-gray-600"
                    }`}
                  >
                    {n} {DIFFICULTY_LABEL[n]}
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="block text-xs text-gray-500">
              出題の傾向・勉強法
              <textarea
                value={tendency}
                onChange={(e) => setTendency(e.target.value)}
                maxLength={3000}
                rows={4}
                placeholder="例: 毎年、筋の起始停止と作用が出る。授業のスライドの図がそのまま出題される。"
                className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900"
              />
            </label>

            <label className="block text-xs text-gray-500">
              覚えている範囲の出題内容（自分の言葉で）
              <textarea
                value={recalled}
                onChange={(e) => setRecalled(e.target.value)}
                maxLength={3000}
                rows={4}
                placeholder="例: 大腿四頭筋の作用を選ぶ問題、歩行周期の各相の名称を書く問題…"
                className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900"
              />
            </label>

            <div className="rounded-xl border border-gray-200 p-3">
              <label className="block text-xs text-gray-500">
                過去問などのファイル（任意・PDF/画像・10MBまで）
                <input
                  type="file"
                  accept="application/pdf,image/png,image/jpeg,image/webp"
                  onChange={handleFileChange}
                  className="mt-1 block w-full text-xs"
                />
              </label>

              {file && (
                <label className="mt-3 flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-[11px] leading-5 text-amber-900">
                  <input type="checkbox" checked={rights} onChange={(e) => setRights(e.target.checked)} className="mt-0.5" />
                  <span>
                    このファイルは、<strong>学校・先生が配布や共有を認めているもの</strong>、または<strong>自分で作った資料</strong>です。
                    先生や学校の著作物を無断で共有することは、著作権や学則に反するおそれがあります。権利者から削除の申出があった場合は、削除します。
                  </span>
                </label>
              )}
            </div>

            <p className="rounded-xl bg-amber-50 p-3 text-[11px] leading-5 text-amber-800">
              先生や他の学生の個人名は書かないでください。試験問題の全文を写すより、「傾向」と「自分の言葉でのメモ」を中心にしてください。投稿者は他のユーザーに表示されません。
            </p>

            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-full bg-black py-2.5 text-sm font-medium text-white disabled:opacity-50"
            >
              {saving ? "投稿中…" : "投稿する"}
            </button>
          </form>
        </div>
      )}
    </main>
  );
}
