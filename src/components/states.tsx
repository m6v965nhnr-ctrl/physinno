import Link from "next/link";
import type { ReactNode } from "react";

// 読み込み中・空・失敗の表示を、共通の見た目にする部品。

// 画面全体の読み込み中（スクリーンリーダーにも「読み込み中」と伝わる）
export function LoadingScreen({ message = "読み込み中…" }: { message?: string }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-3">
        <span
          aria-hidden="true"
          className="h-6 w-6 animate-spin rounded-full border-2 border-gray-200 border-t-brand-600"
        />
        <p className="text-sm text-gray-500">{message}</p>
      </div>
    </main>
  );
}

// 一覧が空のとき。次の行動（ボタン）を1つ添えられる
export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-10 text-center">
      <p className="text-sm font-semibold text-gray-800">{title}</p>
      {description && <p className="mt-2 text-sm leading-6 text-gray-600">{description}</p>}
      {action && <div className="mt-4 flex justify-center">{action}</div>}
    </div>
  );
}

// 読み込みに失敗したとき。「もう一度」で再取得できる
export function ErrorState({
  message = "読み込めませんでした。通信の状態を確認して、もう一度お試しください。",
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div role="alert" className="rounded-3xl border border-red-200 bg-red-50 px-6 py-8 text-center">
      <p className="text-sm leading-6 text-red-800">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white"
        >
          もう一度読み込む
        </button>
      )}
    </div>
  );
}

// エラー画面・見つからない画面の共通の枠
export function MessageScreen({
  title,
  body,
  children,
}: {
  title: string;
  body: string;
  children?: ReactNode;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="w-full max-w-sm text-center">
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        <p className="mt-3 text-sm leading-7 text-gray-600">{body}</p>
        <div className="mt-6 flex flex-col gap-3">{children}</div>
      </div>
    </main>
  );
}

export function HomeLink({ label = "ホームへ戻る", href = "/home" }: { label?: string; href?: string }) {
  return (
    <Link href={href} className="rounded-full border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800">
      {label}
    </Link>
  );
}
