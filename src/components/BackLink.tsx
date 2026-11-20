"use client";

import { useRouter } from "next/navigation";

// 直前の画面（一問一答の解説など）に戻る。直接開いた等で履歴が無いときは、fallbackへ
export default function BackLink({ fallback }: { fallback: string }) {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => (window.history.length > 1 ? router.back() : router.push(fallback))}
      className="text-xs text-gray-400 hover:text-gray-700"
    >
      ← 戻る
    </button>
  );
}
