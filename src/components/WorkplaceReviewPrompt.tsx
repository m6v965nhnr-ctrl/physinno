"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getMyAccountType } from "@/lib/account";

const DISMISSED_KEY = "relight_workplace_review_prompt_dismissed";

function isDismissed() {
  try {
    return localStorage.getItem(DISMISSED_KEY) === "1";
  } catch {
    return false;
  }
}

function dismiss() {
  try {
    localStorage.setItem(DISMISSED_KEY, "1");
  } catch {
    // 保存できない環境（プライベートモードなど）では、閉じても次回また出るだけ
  }
}

// PTのホームに出す、職場口コミ投稿のお願い。閉じるまで表示する（本人がどの病院で働いているかは
// サーバー側で持っていないため、特定の病院名は出さない一般的な案内にする）
export default function WorkplaceReviewPrompt({ userId }: { userId: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!userId || isDismissed()) return;
    getMyAccountType(userId).then((type) => {
      if (type === "pt") setShow(true);
    });
  }, [userId]);

  if (!show) return null;

  return (
    <div className="mx-5 mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-gray-900">今の職場、または前の職場の口コミを書いてみませんか</p>
          <p className="mt-1 text-xs leading-5 text-gray-600">
            転職を考えている人が、職場の雰囲気・働きやすさを知る手がかりになります。投稿者の名前は、ほかの人には出ません。
          </p>
        </div>
        <button
          onClick={() => {
            dismiss();
            setShow(false);
          }}
          aria-label="閉じる"
          className="shrink-0 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>
      <Link href="/workplace" className="mt-3 inline-block text-sm font-semibold text-amber-700 underline">
        口コミを書く →
      </Link>
    </div>
  );
}
