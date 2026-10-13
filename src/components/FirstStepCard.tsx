"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getMyAccountType } from "@/lib/account";
import { dismissFirstStep, hasSearchedPapers, isFirstStepDismissed } from "@/lib/firstSteps";

// PTのホームに出す「はじめの1歩」。やることは1つだけ: 論文を1本、探してみる。
// 論文を1回検索するか、閉じるまで表示する（学生は、学生ホームの一問一答ドリルが、はじめの1歩）
export default function FirstStepCard({ userId }: { userId: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!userId || hasSearchedPapers() || isFirstStepDismissed()) return;
    getMyAccountType(userId).then((type) => setShow(type === "pt"));
  }, [userId]);

  if (!show) return null;

  return (
    <section
      aria-label="はじめの1歩"
      className="mx-5 mt-4 rounded-2xl border border-brand-200 bg-brand-50 p-4"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold text-brand-800">はじめの1歩</p>
          <p className="mt-1 text-base font-bold text-gray-900">論文を1本、探してみましょう</p>
          <p className="mt-1 text-xs leading-5 text-gray-700">
            日本語でも英語でも、9つのサイトを同時に検索できます。エビデンスレベルでの絞り込みも。
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            dismissFirstStep();
            setShow(false);
          }}
          aria-label="この案内を閉じる"
          className="shrink-0 rounded-full px-2 py-1 text-gray-500"
        >
          ×
        </button>
      </div>
      <Link
        href="/pts?mode=papers"
        className="mt-3 flex items-center justify-between rounded-xl bg-gray-900 px-4 py-3 text-sm font-bold text-white"
      >
        論文を探す
        <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}
