"use client";

import { useState } from "react";
import { notify } from "@/lib/notify";
import { askConfirm } from "@/lib/confirm";
import { supabase } from "@/lib/supabase";
import type { AccountType } from "@/lib/account";
import ReportButton from "@/components/ReportButton";

export type HospitalAnswer = { id: string; body: string; author_name: string | null; is_worker: boolean; created_at: string; is_mine: boolean };
export type HospitalQuestion = { id: string; body: string; author_name: string | null; created_at: string; is_mine: boolean; answers: HospitalAnswer[] };

const AREA = "w-full rounded-2xl border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-gray-900";
const day = (s: string) => new Date(s).toLocaleDateString("ja-JP");

// 職場ページの「質問」タブ。その職場について知りたいことを聞き、働いている人が答える。
// 働いているかの確認はしない（回答者の自己申告）。読み書きできるのは、ログインしたPTと学生
export default function HospitalQuestions({ hospitalId, hospitalName, accountType, loggedIn, questions, onChanged }: { hospitalId: string; hospitalName: string; accountType: AccountType | null; loggedIn: boolean; questions: HospitalQuestion[]; onChanged: () => void }) {
  const [body, setBody] = useState("");
  const [anon, setAnon] = useState(true);
  const [busy, setBusy] = useState(false);
  const [answerFor, setAnswerFor] = useState<string | null>(null);
  const [aBody, setABody] = useState("");
  const [aAnon, setAAnon] = useState(true);
  const [aWorker, setAWorker] = useState(false);

  const canUse = accountType === "pt" || accountType === "student";

  async function userId() {
    const { data } = await supabase.auth.getUser();
    return data.user?.id ?? null;
  }

  async function ask() {
    if (busy) return;
    const text = body.trim();
    if (text.length < 5) return notify("質問は、5文字以上で書いてください");
    setBusy(true);
    const uid = await userId();
    const { error } = uid ? await supabase.from("hospital_questions").insert({ hospital_id: hospitalId, user_id: uid, body: text, is_anonymous: anon }) : { error: true };
    setBusy(false);
    if (error) return notify("投稿できませんでした。内容を確かめて、もう一度お試しください");
    notify("質問を投稿しました");
    setBody("");
    onChanged();
  }

  async function answer(questionId: string) {
    if (busy) return;
    const text = aBody.trim();
    if (!text) return notify("答えを書いてください");
    setBusy(true);
    const uid = await userId();
    const { error } = uid ? await supabase.from("hospital_answers").insert({ question_id: questionId, user_id: uid, body: text, is_anonymous: aAnon, is_worker: aWorker }) : { error: true };
    setBusy(false);
    if (error) return notify("投稿できませんでした。内容を確かめて、もう一度お試しください");
    notify("答えを投稿しました");
    setABody(""); setAnswerFor(null);
    onChanged();
  }

  async function remove(table: "hospital_questions" | "hospital_answers", id: string) {
    if (!(await askConfirm("削除しますか？（元に戻せません）"))) return;
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) return notify("削除できませんでした");
    onChanged();
  }

  return (
    <section className="mt-5 rounded-3xl border border-gray-100 bg-white p-6">
      <h2 className="text-sm font-semibold text-gray-500">質問（{canUse ? questions.length : "—"}）</h2>
      <p className="mt-2 text-xs leading-5 text-gray-500">{hospitalName}について知りたいことを、ここで働いている人に聞けます。給与・教育・雰囲気など、なんでも。</p>

      {!canUse ? (
        <p className="mt-3 rounded-2xl bg-gray-50 p-4 text-sm leading-6 text-gray-600">
          {loggedIn ? "質問と答えは、理学療法士と学生のアカウントで読み書きできます。" : "質問と答えは、ログインした理学療法士・学生が読み書きできます。"}
        </p>
      ) : (
        <>
          <div className="mt-3 space-y-2">
            <textarea aria-label="質問" rows={3} maxLength={500} value={body} onChange={(e) => setBody(e.target.value)} placeholder="知りたいこと（例：新人の教育は、どんな流れですか？）　※患者さん・個人が特定される情報は書かないでください" className={AREA} />
            <label className="flex items-center gap-2 text-xs text-gray-600"><input type="checkbox" checked={anon} onChange={(e) => setAnon(e.target.checked)} />匿名で投稿する</label>
            <button type="button" onClick={ask} disabled={busy} className="w-full rounded-full bg-relight-gradient py-2.5 text-sm font-semibold text-white disabled:opacity-50">{busy ? "投稿中…" : "質問する"}</button>
          </div>

          {questions.length === 0 ? (
            <p className="mt-5 text-sm text-gray-400">この職場への質問は、まだありません。最初の質問をどうぞ</p>
          ) : (
            <ul className="mt-5 space-y-4">
              {questions.map((q) => (
                <li key={q.id} className="rounded-2xl border border-gray-100 p-4">
                  <p className="text-[11px] text-gray-400">{day(q.created_at)}　{q.author_name ?? "匿名"}</p>
                  <p className="mt-1 whitespace-pre-wrap text-sm font-semibold text-gray-900">Q. {q.body}</p>
                  {q.answers.length > 0 && (
                    <ul className="mt-3 space-y-2">
                      {q.answers.map((a) => (
                        <li key={a.id} className="rounded-xl bg-gray-50 p-3">
                          <p className="text-[11px] text-gray-500">
                            {a.author_name ?? "匿名"}　{day(a.created_at)}
                            {a.is_worker && <span className="ml-2 rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-gray-700">この職場で働いている（本人の申告）</span>}
                          </p>
                          <p className="mt-1 whitespace-pre-wrap text-sm text-gray-800">A. {a.body}</p>
                          {a.is_mine ? <button type="button" onClick={() => remove("hospital_answers", a.id)} className="mt-1 text-[11px] text-gray-400 underline">削除</button> : <div className="mt-1"><ReportButton targetType="hospital_answer" targetId={a.id} /></div>}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-2 flex gap-4 text-xs">
                    <button type="button" onClick={() => setAnswerFor(answerFor === q.id ? null : q.id)} className="font-semibold text-gray-700 underline">{answerFor === q.id ? "閉じる" : "答える"}</button>
                    {q.is_mine ? <button type="button" onClick={() => remove("hospital_questions", q.id)} className="text-gray-400 underline">質問を削除</button> : <ReportButton targetType="hospital_question" targetId={q.id} />}
                  </div>
                  {answerFor === q.id && (
                    <div className="mt-2 space-y-2">
                      <textarea aria-label="答え" rows={3} maxLength={1500} value={aBody} onChange={(e) => setABody(e.target.value)} placeholder="知っていること・経験を書いてください" className={AREA} />
                      <label className="flex items-center gap-2 text-xs text-gray-600"><input type="checkbox" checked={aWorker} onChange={(e) => setAWorker(e.target.checked)} />この職場で働いています（自己申告）</label>
                      <label className="flex items-center gap-2 text-xs text-gray-600"><input type="checkbox" checked={aAnon} onChange={(e) => setAAnon(e.target.checked)} />匿名で投稿する</label>
                      <button type="button" onClick={() => answer(q.id)} disabled={busy} className="w-full rounded-full bg-black py-2.5 text-sm font-semibold text-white disabled:opacity-50">{busy ? "投稿中…" : "答えを投稿する"}</button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
      <p className="mt-4 text-[11px] leading-5 text-gray-400">答えは、投稿した人の経験や考えで、職場の公式な回答ではありません。働いているかどうかは、運営は確認していません。うそのない、思いやりのある投稿をお願いします。</p>
    </section>
  );
}
