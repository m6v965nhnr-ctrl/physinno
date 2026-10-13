"use client";

import { useEffect } from "react";
import { HomeLink, MessageScreen } from "@/components/states";
import { reportClientError } from "@/lib/errorReport";

// 画面の表示中に予期しないエラーが起きたとき（真っ白にならないように）
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
    reportClientError(error, "error-boundary");
  }, [error]);

  return (
    <MessageScreen
      title="うまく表示できませんでした"
      body="一時的な問題かもしれません。もう一度試しても直らないときは、時間をおいてからお試しください。"
    >
      <button
        type="button"
        onClick={reset}
        className="rounded-full bg-gray-900 px-5 py-3 text-sm font-semibold text-white"
      >
        もう一度試す
      </button>
      <HomeLink />
    </MessageScreen>
  );
}
