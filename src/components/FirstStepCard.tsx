"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getMyAccountType } from "@/lib/account";
import {
  dismissFirstStep,
  hasLiked,
  hasSavedPaper,
  hasSearchedPapers,
  isFirstStepDismissed,
} from "@/lib/firstSteps";

type Step = { key: string; title: string; hint: string; href: string; cta: string; done: boolean };

// PTのホームに出す「はじめの3歩」。論文を探す → 保存する → 投稿にいいね、を順番に1つずつ案内する。
// 3つ終わるか、閉じるまで表示する（学生は、学生ホームの一問一答ドリルが、はじめの1歩）
export default function FirstStepCard({ userId }: { userId: string }) {
  const [steps, setSteps] = useState<Step[] | null>(null);

  useEffect(() => {
    if (!userId || isFirstStepDismissed()) return;

    getMyAccountType(userId).then((type) => {
      if (type !== "pt") return;

      const list: Step[] = [
        {
          key: "search",
          title: "論文を1本、探してみましょう",
          hint: "日本語でも英語でも、8つのサイトを同時に検索できます。エビデンスレベルでの絞り込みも。",
          href: "/pts?mode=papers",
          cta: "論文を探す",
          done: hasSearchedPapers(),
        },
        {
          key: "save",
          title: "気になった論文を、保存しましょう",
          hint: "検索結果の「保存」を押すと、あとから「保存リスト」で、まとめて読み返せます。",
          href: "/pts?mode=papers",
          cta: "論文を保存しに行く",
          done: hasSavedPaper(),
        },
        {
          key: "like",
          title: "ほかの人の投稿に、いいねしてみましょう",
          hint: "下の投稿の、ハートを押すだけです。投稿した人に、通知が届きます。",
          href: "#feed",
          cta: "投稿を見る",
          done: hasLiked(),
        },
      ];

      setSteps(list.some((s) => !s.done) ? list : null);
    });
  }, [userId]);

  if (!steps) return null;

  const current = steps.find((s) => !s.done) ?? steps[0];
  const doneCount = steps.filter((s) => s.done).length;

  return (
    <section aria-label="はじめの3歩" className="mx-5 mt-4 rounded-2xl border border-brand-200 bg-brand-50 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-bold text-brand-800">はじめの3歩（{doneCount}/3）</p>
          <p className="mt-1 text-base font-bold text-gray-900">{current.title}</p>
          <p className="mt-1 text-xs leading-5 text-gray-700">{current.hint}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            dismissFirstStep();
            setSteps(null);
          }}
          aria-label="この案内を閉じる"
          className="shrink-0 rounded-full px-2 py-1 text-gray-500"
        >
          ×
        </button>
      </div>

      <ol className="mt-3 flex gap-1.5" aria-label="進み具合">
        {steps.map((s, i) => (
          <li
            key={s.key}
            className={`flex-1 rounded-full px-2 py-1 text-center text-[11px] font-semibold ${
              s.done ? "bg-gray-900 text-white" : s === current ? "bg-white text-gray-900 ring-2 ring-gray-900" : "bg-white/70 text-gray-600"
            }`}
          >
            {s.done ? "✓ " : `${i + 1}. `}
            {s.key === "search" ? "探す" : s.key === "save" ? "保存" : "いいね"}
          </li>
        ))}
      </ol>

      <Link
        href={current.href}
        className="mt-3 flex items-center justify-between rounded-xl bg-gray-900 px-4 py-3 text-sm font-bold text-white"
      >
        {current.cta}
        <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}
