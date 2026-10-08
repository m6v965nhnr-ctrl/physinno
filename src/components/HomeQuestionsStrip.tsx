"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getMyAccountType } from "@/lib/account";
import { QUESTION_CATEGORY_LABEL, QuestionSummary, listQuestions } from "@/lib/studentQa";

// PTのホーム（投稿の一覧）に、学生からの「先輩に質問」を出す。PTのアカウントだけ。
// 学生は、名前を出すか、匿名にするかを選んで質問している（匿名の質問は、誰が書いたかを返さない）
export default function HomeQuestionsStrip({ userId }: { userId: string }) {
  const [items, setItems] = useState<QuestionSummary[] | null>(null);

  useEffect(() => {
    if (!userId) return;
    (async () => {
      if ((await getMyAccountType(userId)) !== "pt") return;
      const rows = await listQuestions(null, 0, 20);
      // 自分が答える立場なので、回答のない質問を先に
      const others = rows.filter((q) => !q.is_mine);
      others.sort((a, b) => Number(a.answer_count > 0) - Number(b.answer_count > 0));
      setItems(others.slice(0, 3));
    })();
  }, [userId]);

  if (!items || items.length === 0) return null;

  return (
    <section aria-label="学生からの質問" className="mx-5 mt-4 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-bold text-emerald-900">🙋 学生からの質問（先輩に質問）</p>
        <Link href="/student/questions" className="shrink-0 text-xs text-emerald-800 underline">
          すべて見る
        </Link>
      </div>
      <p className="mt-0.5 text-xs leading-5 text-emerald-800">実習・国試・就活のことを、あなたの経験で答えてあげませんか。</p>

      <ul className="mt-3 space-y-2">
        {items.map((q) => (
          <li key={q.id}>
            <Link href={`/student/questions/${q.id}`} className="block rounded-xl bg-white p-3 transition hover:bg-emerald-50">
              <p className="text-[11px] text-gray-600">
                <span className="mr-1.5 rounded-full bg-emerald-100 px-2 py-0.5 font-semibold text-emerald-800">
                  {QUESTION_CATEGORY_LABEL[q.category]}
                </span>
                {q.author_name ? `${q.author_name}さん（学生）` : "匿名の学生"}
                <span className="ml-1">・{q.answer_count > 0 ? `回答 ${q.answer_count}件` : "回答をまっています"}</span>
              </p>
              <p className="mt-1 text-sm font-semibold text-gray-900">{q.title}</p>
              <p className="mt-0.5 line-clamp-2 text-xs leading-5 text-gray-600">{q.body_preview}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
