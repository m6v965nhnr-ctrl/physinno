"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BlockedUser, listMyBlocks, unblockUser } from "@/lib/blocks";
import { notify } from "@/lib/notify";

// ブロック中のユーザーの一覧と、解除
export default function BlockedUsersPage() {
  const [items, setItems] = useState<BlockedUser[] | null>(null);
  const [busyId, setBusyId] = useState("");

  useEffect(() => {
    listMyBlocks().then(setItems);
  }, []);

  async function release(u: BlockedUser) {
    setBusyId(u.user_id);
    const error = await unblockUser(u.user_id);
    setBusyId("");
    if (error) {
      notify(error);
      return;
    }
    setItems((prev) => (prev || []).filter((x) => x.user_id !== u.user_id));
    notify("ブロックを解除しました");
  }

  return (
    <main className="min-h-screen bg-white px-6 py-10 pb-28">
      <div className="mx-auto max-w-lg">
        <Link href="/mypage" className="text-sm text-gray-500">
          ← マイページ
        </Link>

        <h1 className="mt-4 text-2xl font-semibold tracking-tight">ブロック中のユーザー</h1>
        <p className="mt-2 text-sm leading-6 text-gray-600">
          ブロックした人の投稿・コメント・メッセージは、あなたには表示されません。相手には、ブロックしたことは伝わりません。
        </p>

        {items === null ? (
          <p className="mt-8 text-sm text-gray-400">読み込み中…</p>
        ) : items.length === 0 ? (
          <p className="mt-8 text-sm text-gray-500">ブロック中のユーザーはいません。</p>
        ) : (
          <ul className="mt-6 divide-y divide-gray-100 rounded-2xl border border-gray-100">
            {items.map((u) => (
              <li key={u.user_id} className="flex items-center justify-between gap-3 px-4 py-3">
                <span className="truncate text-sm text-gray-900">{u.full_name?.trim() || "ユーザー"}</span>
                <button
                  type="button"
                  onClick={() => release(u)}
                  disabled={busyId === u.user_id}
                  className="shrink-0 rounded-full border border-gray-300 px-4 py-1.5 text-xs text-gray-700 disabled:opacity-50"
                >
                  解除する
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
