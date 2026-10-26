"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { getLocalUser } from "@/lib/authUser";
import { notify } from "@/lib/notify";

// 施設の投稿への「いいね」。数は誰でも見え、誰が押したかは本人しか分からない
// shortcut: 投稿ごとに数を1回ずつ取得する, フィードが長くなったら親でまとめて取得に変える
export default function OrgPostLike({ postId }: { postId: string }) {
  const [likes, setLikes] = useState(0);
  const [mine, setMine] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let off = false;
    (async () => {
      const { data } = await supabase.rpc("org_post_like_counts", { p_post_ids: [postId] });
      if (!off) setLikes(Number((data as { likes: number }[] | null)?.[0]?.likes ?? 0));
      const { data: { user } } = await getLocalUser();
      if (off || !user) return;
      setUserId(user.id);
      const { data: m } = await supabase.from("org_post_likes").select("post_id").eq("post_id", postId).eq("user_id", user.id).maybeSingle();
      if (!off) setMine(!!m);
    })();
    return () => { off = true; };
  }, [postId]);

  async function toggle() {
    if (!userId) return notify("いいねには、ログインが必要です");
    if (busy) return;
    setBusy(true);
    if (mine) {
      const { error } = await supabase.from("org_post_likes").delete().eq("post_id", postId).eq("user_id", userId);
      if (!error) { setMine(false); setLikes((n) => Math.max(0, n - 1)); }
    } else {
      const { error } = await supabase.from("org_post_likes").insert({ post_id: postId, user_id: userId });
      if (!error) { setMine(true); setLikes((n) => n + 1); }
    }
    setBusy(false);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={mine}
      className={`flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium ${mine ? "border-rose-300 bg-rose-50 text-rose-700" : "border-gray-200 bg-white text-gray-600"}`}
    >
      {mine ? "♥" : "♡"} いいね{likes > 0 ? ` ${likes}` : ""}
    </button>
  );
}
