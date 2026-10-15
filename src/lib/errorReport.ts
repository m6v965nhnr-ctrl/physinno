import { supabase } from "@/lib/supabase";

// 画面で起きた予期しないエラーを、運営の画面に集める（ユーザーのIDなどは、送らない）。
// 通信の失敗・拡張機能のエラーなど、アプリの問題ではないものは、送らない。
const IGNORE = [
  /ResizeObserver loop/i,
  /^Script error\.?$/i,
  /chrome-extension:|moz-extension:|safari-extension:/i,
  /Failed to fetch|NetworkError|Load failed|network request failed/i,
  /AbortError|The user aborted a request|signal is aborted/i,
  /Non-Error promise rejection/i,
  /ChunkLoadError|Loading chunk .* failed|Failed to load chunk/i,
  /NotAllowedError|play\(\) request was interrupted/i,
  // 他のアプリの中で開いたときに、そのアプリが差し込む部品（Googleアプリなどの内蔵ブラウザ・iPhoneの拡張機能）のエラー
  /iabjs:\/\/|webkit-masked-url:|Java exception was raised during method invocation/i,
];

const sent = new Set<string>();
let budget = 5; // 1回のページ表示で、送るのは5件まで

export function reportClientError(error: unknown, context?: string) {
  try {
    if (typeof window === "undefined" || budget <= 0) return;

    const err = error as { message?: string; stack?: string } | string | null | undefined;
    const message = typeof err === "string" ? err : err?.message || String(err ?? "");
    const stack = typeof err === "object" && err ? err.stack : undefined;

    if (!message || IGNORE.some((re) => re.test(message) || (stack ? re.test(stack) : false))) return;

    const key = `${window.location.pathname}|${message}`;
    if (sent.has(key)) return;
    sent.add(key);
    budget--;

    void supabase
      .rpc("report_client_error", {
        p_message: context ? `[${context}] ${message}` : message,
        p_stack: stack ?? null,
        p_path: window.location.pathname,
        p_user_agent: navigator.userAgent,
      })
      .then(() => {}, () => {});
  } catch {
    // エラーの報告で、さらにエラーを出さない
  }
}
