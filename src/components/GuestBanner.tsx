"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

// ログインしていない訪問者に、「見るだけ」であることと、登録の案内を出す。ログイン中は、何も出さない
export function useIsGuest() {
  const [guest, setGuest] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setGuest(!session));
  }, []);

  return guest;
}

export default function GuestBanner({ text }: { text?: string }) {
  const guest = useIsGuest();
  if (!guest) return null;

  return (
    <div className="mb-4 flex flex-col items-start gap-3 rounded-2xl bg-relight-gradient px-5 py-4 text-gray-900 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm leading-6">
        {text ?? "いまは、ゲストとして見ています。無料登録すると、投稿・コメント・保存・メッセージが使えます。"}
      </p>
      <div className="flex shrink-0 gap-2">
        <Link href="/register" className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-gray-900">
          無料で登録
        </Link>
        <Link href="/login" className="rounded-full border border-gray-900/40 px-4 py-2 text-xs font-semibold text-gray-900">
          ログイン
        </Link>
        <Link href="/guest" className="px-1 py-2 text-xs text-gray-900 underline">
          立場を切り替える
        </Link>
      </div>
    </div>
  );
}
