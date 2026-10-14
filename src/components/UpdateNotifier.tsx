"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const CURRENT = process.env.NEXT_PUBLIC_BUILD_ID || "dev";
const CHECK_EVERY_MS = 10 * 60 * 1000;
// これ以上、画面を離れていたあとに戻ってきて、古いままなら、自動で読み込み直す（入力中のものが失われにくい間隔）
const AUTO_RELOAD_AFTER_MS = 30 * 60 * 1000;
const CHUNK_RELOAD_KEY = "relight-chunk-reload-at";

// 公開された新しいバージョンに、全員が追いつくための仕組み。
//  - 画面を開いたとき・戻ってきたとき・10分おきに、いまのバージョンを確かめる
//  - 古ければ、下に「更新する」を出す。次に画面を移動するときは、自動で最新に読み込み直す
//  - 長く離れていて戻ったときも、自動で読み込み直す
//  - 古い部品を読み込めずに失敗したときも、1回だけ自動で読み込み直す
export default function UpdateNotifier() {
  const pathname = usePathname();
  const [outdated, setOutdated] = useState(false);
  const outdatedRef = useRef(false);
  const hiddenAtRef = useRef<number | null>(null);
  const firstPathRef = useRef(pathname);

  const check = useCallback(async () => {
    if (CURRENT === "dev" || outdatedRef.current) return;
    try {
      const res = await fetch("/api/version", { cache: "no-store" });
      if (!res.ok) return;
      const { id } = (await res.json()) as { id?: string };
      if (id && id !== "dev" && id !== CURRENT) {
        outdatedRef.current = true;
        setOutdated(true);
      }
    } catch {
      // オフラインなどのときは、次の機会に確かめる
    }
  }, []);

  useEffect(() => {
    check();
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") check();
    }, CHECK_EVERY_MS);

    const onVisibility = async () => {
      if (document.visibilityState === "hidden") {
        hiddenAtRef.current = Date.now();
        return;
      }
      const away = hiddenAtRef.current ? Date.now() - hiddenAtRef.current : 0;
      hiddenAtRef.current = null;
      await check();
      if (outdatedRef.current && away > AUTO_RELOAD_AFTER_MS) window.location.reload();
    };
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("online", check);

    // 古い部品（ファイル）が、もう無くて読み込めないとき
    const onChunkError = (message: string) => {
      if (!/ChunkLoadError|Loading chunk|Loading CSS chunk|Failed to fetch dynamically imported module/i.test(message)) return;
      try {
        const last = Number(sessionStorage.getItem(CHUNK_RELOAD_KEY) || 0);
        if (Date.now() - last < 60_000) return; // 読み込み直しを繰り返さない
        sessionStorage.setItem(CHUNK_RELOAD_KEY, String(Date.now()));
      } catch {
        // 保存できない環境では、無限に繰り返さないため、何もしない
        return;
      }
      window.location.reload();
    };
    const onError = (e: ErrorEvent) => onChunkError(String(e.message || e.error || ""));
    const onRejection = (e: PromiseRejectionEvent) => onChunkError(String(e.reason?.message || e.reason || ""));
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);

    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("online", check);
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, [check]);

  // 古いと分かっているときに画面を移動したら、移動先を最新で読み込み直す
  useEffect(() => {
    if (pathname === firstPathRef.current) return;
    firstPathRef.current = pathname;
    if (outdatedRef.current) window.location.reload();
  }, [pathname]);

  if (!outdated) return null;

  return (
    <div
      role="status"
      className="fixed inset-x-0 z-[10000] flex justify-center px-4 print:hidden"
      style={{ bottom: "calc(5.5rem + env(safe-area-inset-bottom))" }}
    >
      <div className="flex items-center gap-3 rounded-full bg-gray-900 py-2 pl-4 pr-2 text-xs text-white shadow-lg">
        <span>新しいバージョンがあります</span>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-gray-900"
        >
          更新する
        </button>
      </div>
    </div>
  );
}
