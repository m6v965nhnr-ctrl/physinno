"use client";

import { useState } from "react";
import Link from "next/link";
import { notify } from "@/lib/notify";
import { askQuestion, findPrivacyRisk, QUESTION_CATEGORY_LABEL, QuestionCategory } from "@/lib/studentQa";
import type { AccountType } from "@/lib/account";

export type HospitalQuestion = { id: string; category: QuestionCategory; title: string; body_preview: string; author_name: string | null; answer_count: number; created_at: string; is_mine: boolean };

const AREA = "w-full rounded-2xl border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-gray-900";

// 職場ページの「質問」タブ。質問できるのは学生（既存の質問の仕組みと同じ）。答えるのは、現役のPT。読めるのは、PTと学生だけ
export default function HospitalQuestions({ hospitalId, hospitalName, accountType, questions, onChanged }: { hospitalId: string; hospitalName: string; accountType: AccountType | null; questions: HospitalQuestion[]; onChanged: () => void }) {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<QuestionCategory>("job");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [anon, setAnon] = useState(true);
  const [busy, setBusy] = useState(false);

  const canRead = accountType === "pt" || accountType === "student";

  async function submit() {
    if (busy) return;
    if (!title.trim() || !body.trim()) return notify("タイトルと、質問の内容を書いてください");
    const risk = findPrivacyRisk(`${title}\n${body}`);
    if (risk) return notify(risk);
    setBusy(true);
    const error = await askQuestion({ category, title, body, isAnonymous: anon, hospitalId });
    setBusy(false);
    if (error) return notify("投稿できませんでした。内容を確かめて、もう一度お試しください");
    notify("質問を投稿しました");
    setTitle(""); setBody(""); setOpen(false);
    onChanged();
  }

  return (
    <section className="mt-5 rounded-3xl border border-gray-100 bg-white p-6">
      <h2 className="text-sm font-semibold text-gray-500">質問（{canRead ? questions.length : "—"}）</h2>
      {!canRead ? (
        <p className="mt-3 text-sm leading-6 text-gray-500">この職場への質問は、学生が投稿し、現役の理学療法士が答えます。内容は、ログインした理学療法士・学生だけが読めます。</p>
      ) : (
        <>
          {accountType === "student" ? (
            <div className="mt-3">
              <button type="button" onClick={() => setOpen(!open)} className="w-full rounded-full bg-relight-gradient py-2.5 text-sm font-semibold text-white">{open ? "閉じる" : "この職場について質問する"}</button>
              {open && (
                <div className="mt-3 space-y-2">
                  <select aria-label="質問の種類" value={category} onChange={(e) => setCategory(e.target.value as QuestionCategory)} className="w-full rounded-full border border-gray-300 bg-white px-4 py-2.5 text-sm">
                    {(Object.keys(QUESTION_CATEGORY_LABEL) as QuestionCategory[]).map((c) => <option key={c} value={c}>{QUESTION_CATEGORY_LABEL[c]}</option>)}
                  </select>
                  <input aria-label="タイトル" value={title} maxLength={100} onChange={(e) => setTitle(e.target.value)} placeholder="タイトル（例：新人の教育は、どんな流れですか？）" className="w-full rounded-full border border-gray-300 bg-white px-4 py-2.5 text-sm" />
                  <textarea aria-label="質問の内容" rows={4} maxLength={2000} value={body} onChange={(e) => setBody(e.target.value)} placeholder={`${hospitalName}について、知りたいこと（患者さん・個人が特定される情報は、書かないでください）`} className={AREA} />
                  <label className="flex items-center gap-2 text-xs text-gray-600"><input type="checkbox" checked={anon} onChange={(e) => setAnon(e.target.checked)} />匿名で投稿する</label>
                  <button type="button" onClick={submit} disabled={busy} className="w-full rounded-full bg-black py-2.5 text-sm font-semibold text-white disabled:opacity-50">{busy ? "投稿中…" : "質問を投稿する"}</button>
                </div>
              )}
            </div>
          ) : (
            <p className="mt-3 text-xs leading-5 text-gray-500">質問は、学生が投稿します。この職場で働いている方は、答えて、後輩の力になれます。</p>
          )}
          {questions.length === 0 ? (
            <p className="mt-4 text-sm text-gray-400">この職場への質問は、まだありません</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {questions.map((q) => (
                <li key={q.id}>
                  <Link href={`/student/questions/${q.id}`} className="block rounded-2xl border border-gray-100 p-4">
                    <p className="text-[11px] text-gray-400">{QUESTION_CATEGORY_LABEL[q.category] ?? ""}　{new Date(q.created_at).toLocaleDateString("ja-JP")}　{q.author_name ?? "匿名"}</p>
                    <p className="mt-1 text-sm font-semibold text-gray-900">Q. {q.title}</p>
                    <p className="mt-1 line-clamp-2 text-xs text-gray-600">{q.body_preview}</p>
                    <p className="mt-2 text-xs text-gray-500">{q.answer_count > 0 ? `A. ${q.answer_count}人が回答` : "まだ回答がありません"}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
      <p className="mt-3 text-[11px] leading-5 text-gray-400">答えは、個人の経験にもとづくもので、職場の公式な回答ではありません。</p>
    </section>
  );
}
