"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { getMyAccountType } from "@/lib/account";
import { notify } from "@/lib/notify";
import { DEFAULT_AUDIENCE, audiencePayload } from "@/components/PostAudienceFields";

// ホームの上にある、かんたん投稿。文章だけなら、その場で投稿できる（写真・症例・実績などは、「くわしく書く」から）。
// 学生には、「勉強」への近道も出す
export default function HomeComposer({ userId, onPosted }: { userId: string; onPosted: () => void }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [posting, setPosting] = useState(false);
  const [isStudent, setIsStudent] = useState(false);

  useEffect(() => {
    getMyAccountType(userId).then((t) => setIsStudent(t === "student"));
  }, [userId]);

  async function post() {
    const content = text.trim();
    if (!content || posting) return;
    setPosting(true);
    const { error } = await supabase.from("posts").insert({
      user_id: userId,
      title: null,
      content,
      post_type: "normal",
      ...audiencePayload(DEFAULT_AUDIENCE, false),
    });
    setPosting(false);

    if (error) {
      notify("投稿できませんでした。もう一度お試しください");
      return;
    }
    notify("投稿しました");
    setText("");
    setOpen(false);
    onPosted();
  }

  return (
    <section aria-label="投稿する" className="mx-5 mt-4 rounded-2xl border border-gray-200 bg-white p-3">
      {!open ? (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex-1 rounded-full bg-gray-100 px-4 py-3 text-left text-sm text-gray-500"
          >
            ✏️ いま、なにを共有しますか？
          </button>
          {isStudent && (
            <Link href="/posts/create?tab=study" className="shrink-0 rounded-full bg-relight-gradient px-4 py-3 text-xs font-bold">
              🎯 勉強
            </Link>
          )}
        </div>
      ) : (
        <div>
          <textarea
            autoFocus
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={2000}
            rows={4}
            placeholder="いま、なにを共有しますか？（患者さんが特定される情報は書かないでください）"
            aria-label="投稿の本文"
            className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-400"
          />
          <div className="mt-2 flex items-center justify-between gap-2">
            <Link href="/posts/create" className="text-xs font-medium text-gray-500 underline">
              写真・症例などは、くわしく書く
            </Link>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => setOpen(false)} className="rounded-full px-3 py-2 text-xs text-gray-500">
                閉じる
              </button>
              <button
                type="button"
                onClick={post}
                disabled={posting || !text.trim()}
                className="rounded-full bg-black px-5 py-2 text-sm font-semibold text-white disabled:opacity-40"
              >
                {posting ? "投稿中…" : "投稿"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
