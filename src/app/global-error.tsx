"use client";

import "./globals.css";

// 全体の枠（layout）自体でエラーが起きたときの、最後の砦
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="ja">
      <body className="min-h-screen">
        <main className="flex min-h-screen items-center justify-center bg-white px-6">
          <div className="w-full max-w-sm text-center">
            <h1 className="text-xl font-bold text-gray-900">うまく表示できませんでした</h1>
            <p className="mt-3 text-sm leading-7 text-gray-600">
              一時的な問題かもしれません。ページを読み込み直してください。
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <button
                type="button"
                onClick={reset}
                className="rounded-full bg-gray-900 px-5 py-3 text-sm font-semibold text-white"
              >
                もう一度試す
              </button>
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href="/" className="rounded-full border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800">
                トップへ戻る
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
