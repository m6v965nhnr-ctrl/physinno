"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { notify } from "@/lib/notify";
import { askConfirm } from "@/lib/confirm";
import { blockUser, unblockUser } from "@/lib/blocks";

// プロフィールなどに置く、ブロック／解除のボタン（自分自身・未ログインには出さない）
export default function BlockUserButton({ userId, className = "" }: { userId: string; className?: string }) {
  const [blocked, setBlocked] = useState<boolean | null>(null);
  const [busy, setBusy] = useState(false);
  const [meId, setMeId] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!alive || !user) return;
      setMeId(user.id);
      const { data } = await supabase.rpc("is_blocked_by_me", { p_user: userId });
      if (alive) setBlocked(data === true);
    })();
    return () => {
      alive = false;
    };
  }, [userId]);

  if (!meId || meId === userId || blocked === null) return null;

  async function toggle() {
    setBusy(true);
    if (blocked) {
      const error = await unblockUser(userId);
      if (error) notify(error);
      else {
        setBlocked(false);
        notify("ブロックを解除しました");
      }
    } else if (
      await askConfirm(
        "この人をブロックしますか？ この人の投稿・コメント・メッセージが、あなたには表示されなくなります（相手には伝わりません。いつでも解除できます）",
        { okLabel: "ブロックする", danger: true },
      )
    ) {
      const error = await blockUser(userId);
      if (error) notify(error);
      else {
        setBlocked(true);
        notify("ブロックしました。この人の内容は表示されなくなります");
      }
    }
    setBusy(false);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={busy}
      className={`text-xs text-gray-400 underline hover:text-gray-600 disabled:opacity-50 ${className}`}
    >
      {blocked ? "ブロックを解除する" : "この人をブロックする"}
    </button>
  );
}
