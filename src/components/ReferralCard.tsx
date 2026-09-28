"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { notify } from "@/lib/notify";
import { SITE_URL } from "@/lib/site";

// 招待リンク経由の登録者数を表示し、リンクをコピーできるカード
export default function ReferralCard({ userId }: { userId: string }) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;

    supabase.rpc("get_my_referral_count").then(({ data }) => {
      if (mounted) setCount(typeof data === "number" ? data : 0);
    });

    return () => {
      mounted = false;
    };
  }, []);

  const link = `${SITE_URL}/register?ref=${userId}`;

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Re:light",
          text: "理学療法士のためのコミュニティアプリ Re:light に登録しませんか？",
          url: link,
        });
        return;
      } catch {
        // ユーザーがキャンセルした場合等はコピーにフォールバック
      }
    }

    try {
      await navigator.clipboard.writeText(link);
      notify("招待リンクをコピーしました");
    } catch {
      notify("コピーに失敗しました。手動でリンクを選択してください");
    }
  }

  return (
    <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-gray-900">同僚を招待する</p>
        {count !== null && (
          <span className="text-xs text-gray-400">招待人数: {count}人</span>
        )}
      </div>

      <p className="mt-1 text-xs text-gray-500">
        招待リンクから登録すると、自動で相互フォローになります
      </p>

      <button
        onClick={handleShare}
        className="mt-3 w-full rounded-full bg-relight-gradient py-2.5 text-sm font-medium text-white"
      >
        招待リンクを共有
      </button>
    </div>
  );
}
