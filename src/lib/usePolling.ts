import { useEffect, useRef } from "react";

// 画面が見えている間だけ、数秒おきに fn を呼ぶ（Realtimeの接続を使わない、チャットの新着取得用）。
// 画面に戻ってきたときは、すぐに1回呼ぶ。前の呼び出しが終わっていなければ、重ねて呼ばない
export function usePolling(fn: () => void | Promise<void>, ms: number, enabled: boolean) {
  const latest = useRef(fn);
  useEffect(() => {
    latest.current = fn;
  });

  useEffect(() => {
    if (!enabled) return;
    let busy = false;
    const run = async () => {
      if (busy || document.hidden) return;
      busy = true;
      try {
        await latest.current();
      } finally {
        busy = false;
      }
    };
    const timer = setInterval(run, ms);
    document.addEventListener("visibilitychange", run);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", run);
    };
  }, [ms, enabled]);
}
