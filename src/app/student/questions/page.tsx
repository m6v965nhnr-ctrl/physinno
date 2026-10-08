"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { notify } from "@/lib/notify";
import { useMyAccount } from "@/lib/useMyAccount";
import {
  QUESTION_CATEGORIES,
  QUESTION_CATEGORY_LABEL,
  QuestionCategory,
  QuestionSummary,
  askQuestion,
  findPrivacyRisk,
  listQuestions,
} from "@/lib/studentQa";

const PAGE_SIZE = 30;

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

// 先輩に質問: 学生が質問し、現役のPTが回答する
export default function StudentQuestionsPage() {
  const { loading, userId, accountType } = useMyAccount(["student", "pt"]);
  const isStudent = accountType === "student";

  const [category, setCategory] = useState<QuestionCategory | null>(null);
  const [questions, setQuestions] = useState<QuestionSummary[]>([]);
  const [fetching, setFetching] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [formCategory, setFormCategory] = useState<QuestionCategory>("practicum");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [anonymous, setAnonymous] = useState(true);
  const [sending, setSending] = useState(false);

  const load = useCallback(
    async (reset: boolean) => {
      if (!userId) return;
      setFetching(true);
      const offset = reset ? 0 : questions.length;
      const rows = await listQuestions(category, offset, PAGE_SIZE);
      setQuestions((prev) => (reset ? rows : [...prev, ...rows]));
      setHasMore(rows.length === PAGE_SIZE);
      setFetching(false);
    },
    // questions.length は「もっと見る」のときだけ使う
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userId, category]
  );

  useEffect(() => {
    load(true);
  }, [load]);

  async function handleAsk(e: React.FormEvent) {
    e.preventDefault();

    const risk = findPrivacyRisk(`${title}\n${body}`);
    if (
      risk &&
      !confirm(
        `${risk}が含まれているようです。\n患者さんや個人が特定できる情報は書かないでください。このまま送信しますか？`
      )
    ) {
      return;
    }

    setSending(true);
    const error = await askQuestion({ category: formCategory, title, body, isAnonymous: anonymous });
    setSending(false);

    if (error) {
      notify("質問を送信できませんでした");
      return;
    }

    notify("質問を投稿しました。現役のPTが答えてくれるのを待ちましょう");
    setTitle("");
    setBody("");
    setShowForm(false);
    load(true);
  }

  if (loading) {
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
          <Link href={isStudent ? "/student" : "/home"} className="text-sm text-gray-400">
            ← {isStudent ? "学生ホーム" : "ホーム"}
          </Link>
          <h1 className="mt-2 text-xl font-semibold tracking-tight">先輩に質問</h1>
          <p className="mt-1 text-xs leading-5 text-gray-500">
            {isStudent
              ? "実習・国試・就活のことを、現役のPTに聞けます。匿名で投稿できます。"
              : "学生からの質問に、あなたの経験で答えてあげてください。回答は学生の励みになります。"}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-6 py-5">
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {[null, ...QUESTION_CATEGORIES].map((c) => (
            <button
              key={c ?? "all"}
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={`shrink-0 rounded-full border px-3 py-1.5 text-xs ${
                category === c ? "border-black bg-black text-white" : "border-gray-200 bg-white text-gray-600"
              }`}
            >
              {c ? QUESTION_CATEGORY_LABEL[c] : "すべて"}
            </button>
          ))}
        </div>

        {isStudent && (
          <div className="mt-4">
            <button
              onClick={() => setShowForm((v) => !v)}
              className="w-full rounded-full bg-black py-2.5 text-sm font-medium text-white"
            >
              {showForm ? "閉じる" : "+ 質問する"}
            </button>
          </div>
        )}

        {showForm && (
          <form onSubmit={handleAsk} className="mt-4 space-y-3 rounded-2xl bg-white p-4 shadow-sm">
            <label className="block text-xs text-gray-500">
              カテゴリ
              <select
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value as QuestionCategory)}
                className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900"
              >
                {QUESTION_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {QUESTION_CATEGORY_LABEL[c]}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-xs text-gray-500">
              タイトル
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={100}
                required
                placeholder="例: 評価実習の前に、勉強しておくといいことは？"
                className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900"
              />
            </label>

            <label className="block text-xs text-gray-500">
              内容
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                maxLength={3000}
                required
                rows={5}
                placeholder="状況や、知りたいことを具体的に書くと、答えてもらいやすくなります"
                className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900"
              />
            </label>

            <fieldset>
              <legend className="text-xs text-gray-500">PTのホームに、質問として表示されます。名前を出しますか？</legend>
              <div className="mt-1.5 grid grid-cols-2 gap-2">
                {([
                  [true, "匿名で質問する", "名前は、表示しません"],
                  [false, "名前を出して質問する", "「○○さん（学生）」と表示"],
                ] as const).map(([v, label, hint]) => (
                  <label
                    key={String(v)}
                    className={`cursor-pointer rounded-xl border px-3 py-2.5 text-left ${
                      anonymous === v ? "border-gray-900 bg-gray-50" : "border-gray-200"
                    }`}
                  >
                    <input type="radio" name="q-anonymous" checked={anonymous === v} onChange={() => setAnonymous(v)} className="sr-only" />
                    <span className="block text-sm font-semibold text-gray-900">{label}</span>
                    <span className="block text-[11px] text-gray-600">{hint}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <p className="rounded-xl bg-amber-50 p-3 text-[11px] leading-5 text-amber-800">
              実習先の指導者の個人名や、患者さんが特定できる情報（氏名・年齢・日付・病名の組み合わせなど）は書かないでください。
            </p>

            <button
              type="submit"
              disabled={sending}
              className="w-full rounded-full bg-black py-2.5 text-sm font-medium text-white disabled:opacity-50"
            >
              {sending ? "送信中…" : "質問を投稿する"}
            </button>
          </form>
        )}

        <ul className="mt-4 space-y-3">
          {!fetching && questions.length === 0 && (
            <li className="rounded-2xl bg-white p-6 text-center text-sm text-gray-400 shadow-sm">
              {isStudent ? "まだ質問がありません。最初の質問をしてみましょう。" : "まだ質問はありません。"}
            </li>
          )}

          {questions.map((q) => (
            <li key={q.id}>
              <Link
                href={`/student/questions/${q.id}`}
                className="block rounded-2xl bg-white p-4 shadow-sm transition hover:bg-gray-50"
              >
                <div className="flex items-center gap-2 text-[11px]">
                  <span className="rounded-full bg-gray-900 px-2 py-0.5 text-white">
                    {QUESTION_CATEGORY_LABEL[q.category]}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 ${
                      q.answer_count > 0 ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {q.answer_count > 0 ? `回答 ${q.answer_count}件` : "回答待ち"}
                  </span>
                  {q.is_mine && <span className="text-gray-400">あなたの質問</span>}
                  <span className="ml-auto text-gray-400">{formatDate(q.created_at)}</span>
                </div>
                <p className="mt-2 text-sm font-semibold text-gray-900">{q.title}</p>
                <p className="mt-1 line-clamp-2 text-xs leading-5 text-gray-500">{q.body_preview}</p>
                <p className="mt-2 text-[11px] text-gray-400">
                  {q.author_name ? `${q.author_name}さん` : "匿名の学生"}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        {hasMore && (
          <button
            onClick={() => load(false)}
            disabled={fetching}
            className="mt-4 w-full rounded-full border border-gray-200 bg-white py-2.5 text-sm text-gray-600 disabled:opacity-50"
          >
            {fetching ? "読み込み中…" : "もっと見る"}
          </button>
        )}
      </div>
    </main>
  );
}
