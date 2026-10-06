"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import ReportButton from "@/components/ReportButton";
import { notify } from "@/lib/notify";
import { useMyAccount } from "@/lib/useMyAccount";
import {
  Answer,
  QUESTION_CATEGORY_LABEL,
  QuestionDetail,
  answerQuestion,
  deleteAnswer,
  deleteQuestion,
  findPrivacyRisk,
  getQuestion,
  listAnswers,
} from "@/lib/studentQa";

function formatDateTime(iso: string) {
  const d = new Date(iso);
  return `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export default function StudentQuestionPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { loading, userId, accountType } = useMyAccount(["student", "pt"]);

  const [question, setQuestion] = useState<QuestionDetail | null | undefined>(undefined);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  const load = useCallback(async () => {
    if (!userId) return;
    const [q, a] = await Promise.all([getQuestion(id), listAnswers(id)]);
    setQuestion(q);
    setAnswers(a);
  }, [id, userId]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleAnswer(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;

    const risk = findPrivacyRisk(text);
    if (
      risk &&
      !confirm(
        `${risk}が含まれているようです。\n患者さんや個人が特定できる情報は書かないでください。このまま送信しますか？`
      )
    ) {
      return;
    }

    setSending(true);
    const error = await answerQuestion(id, text);
    setSending(false);

    if (error) {
      notify("送信できませんでした");
      return;
    }

    setText("");
    load();
  }

  async function handleDeleteAnswer(answerId: string) {
    if (!confirm("この回答を削除しますか？")) return;
    await deleteAnswer(answerId);
    load();
  }

  async function handleDeleteQuestion() {
    if (!confirm("この質問を削除しますか？回答も一緒に消えます。")) return;
    const error = await deleteQuestion(id);
    if (error) {
      notify("削除できませんでした");
      return;
    }
    router.push("/student/questions");
  }

  if (loading || question === undefined) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-sm text-gray-400">読み込み中…</p>
      </main>
    );
  }

  if (!question) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white px-6">
        <p className="text-sm text-gray-500">この質問は見つかりませんでした（削除された可能性があります）</p>
        <Link href="/student/questions" className="rounded-full bg-black px-5 py-2 text-sm text-white">
          質問の一覧へ
        </Link>
      </main>
    );
  }

  const canAnswer = accountType === "pt" || question.is_mine;

  return (
    <main className="min-h-screen bg-[#fafafa] pb-28">
      <header className="border-b border-gray-100 bg-white px-6 py-5">
        <div className="mx-auto max-w-2xl">
          <Link href="/student/questions" className="text-sm text-gray-400">
            ← 質問の一覧
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-2xl space-y-4 px-6 py-5">
        <article className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 text-[11px]">
            <span className="rounded-full bg-gray-900 px-2 py-0.5 text-white">
              {QUESTION_CATEGORY_LABEL[question.category]}
            </span>
            <span className="text-gray-400">{formatDateTime(question.created_at)}</span>
            <span className="ml-auto text-gray-400">
              {question.author_name ? `${question.author_name}さん` : "匿名の学生"}
            </span>
          </div>

          <h1 className="mt-3 text-lg font-semibold leading-7 text-gray-900">{question.title}</h1>
          <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-gray-700">{question.body}</p>

          <div className="mt-4 flex justify-end gap-4">
            {question.is_mine ? (
              <button onClick={handleDeleteQuestion} className="text-xs text-gray-400 hover:text-red-500">
                削除
              </button>
            ) : (
              <ReportButton targetType="student_question" targetId={question.id} />
            )}
          </div>
        </article>

        <section>
          <h2 className="text-sm font-semibold text-gray-900">回答 {answers.length}件</h2>

          <ul className="mt-3 space-y-3">
            {answers.length === 0 && (
              <li className="rounded-2xl bg-white p-5 text-center text-sm text-gray-400 shadow-sm">
                まだ回答はありません。
              </li>
            )}

            {answers.map((a) => (
              <li key={a.id} className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2 text-xs">
                  {a.is_asker ? (
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-gray-600">質問した学生</span>
                  ) : (
                    <>
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-emerald-700">
                        {a.author_is_pt ? "現役PT" : "学生"}
                      </span>
                      <Link href={`/pts/${a.author_id}`} className="font-medium text-gray-900 underline underline-offset-2">
                        {a.author_name || "ユーザー"}
                      </Link>
                    </>
                  )}
                  <span className="ml-auto text-gray-400">{formatDateTime(a.created_at)}</span>
                </div>

                <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-gray-700">{a.body}</p>

                <div className="mt-2 flex justify-end">
                  {a.is_mine ? (
                    <button onClick={() => handleDeleteAnswer(a.id)} className="text-xs text-gray-400 hover:text-red-500">
                      削除
                    </button>
                  ) : (
                    <ReportButton targetType="student_answer" targetId={a.id} />
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>

        {canAnswer ? (
          <form onSubmit={handleAnswer} className="space-y-3 rounded-2xl bg-white p-4 shadow-sm">
            <label className="block text-sm font-semibold text-gray-900">
              {question.is_mine ? "補足・お礼を書く" : "回答する"}
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                maxLength={3000}
                rows={4}
                required
                placeholder={
                  question.is_mine
                    ? "回答へのお礼や、追加で聞きたいことなど"
                    : "あなたの経験をもとに、具体的に答えてあげてください"
                }
                className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm font-normal text-gray-900"
              />
            </label>
            <p className="text-[11px] leading-5 text-gray-400">
              医療・診療の助言ではなく、あなたの個人的な経験としてお答えください。患者さんが特定できる情報や、実習先の指導者の個人名は書かないでください。
            </p>
            <button
              type="submit"
              disabled={sending}
              className="w-full rounded-full bg-black py-2.5 text-sm font-medium text-white disabled:opacity-50"
            >
              {sending ? "送信中…" : "送信する"}
            </button>
          </form>
        ) : (
          <p className="rounded-2xl bg-white p-4 text-center text-xs text-gray-400 shadow-sm">
            回答できるのは、現役のPTです。
          </p>
        )}
      </div>
    </main>
  );
}
