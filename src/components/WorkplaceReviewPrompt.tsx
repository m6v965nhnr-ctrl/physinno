"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { canPostWorkplaceReview, getMyAccountType, getMyProfession } from "@/lib/account";
import { supabase } from "@/lib/supabase";

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
  // プロフィールの勤務先（施設に結びついているとき）。分かれば、その施設の投稿画面へ1タップで行ける
  const [workplace, setWorkplace] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    if (!userId || isDismissed()) return;
    getMyAccountType(userId).then(async (type) => {
      if (!canPostWorkplaceReview(type, await getMyProfession(userId))) return;
      setShow(true);
      const { data } = await supabase.from("pt_profiles").select("hospital_id").eq("user_id", userId).maybeSingle();
      const hid = (data as { hospital_id: string | null } | null)?.hospital_id;
      if (!hid) return;
      const { data: h } = await supabase.from("hospitals").select("id, name").eq("id", hid).maybeSingle();
      if (h) setWorkplace(h as { id: string; name: string });
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
      <Link href={workplace ? `/hospitals/${workplace.id}?tab=reviews&review=1` : "/kuchikomi/write"} className="mt-3 inline-block text-sm font-semibold text-amber-700 underline">
        {workplace ? `${workplace.name}の口コミを書く（1分）→` : "口コミを書く →"}
      </Link>
    </div>
  );
}
