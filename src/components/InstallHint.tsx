"use client";

import { useEffect, useState } from "react";

const KEY = "relight-install-hint-dismissed";

// Chromeのインストール案内イベント（型は標準にないので最小限だけ定義）
type InstallEvent = Event & { prompt: () => Promise<void> };

// 「ホーム画面に追加」の案内。すでにアプリとして開いている・閉じた人には出さない。
// iPhone(Safari)は共有メニューから追加する手順を、Android(Chrome)はボタンで追加する。
export default function InstallHint() {
  const [mode, setMode] = useState<"ios" | "android" | null>(null);
  const [installEvent, setInstallEvent] = useState<InstallEvent | null>(null);

  useEffect(() => {
    try {
      if (localStorage.getItem(KEY)) return;
    } catch {
      // 保存できない環境でも、案内は出す
    }
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true;
    if (standalone) return;

    const ua = navigator.userAgent;
    // iPadOS は Macintosh を名乗るので、タッチ対応かで見分ける
    const ios = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
    if (ios) {
      // Safari以外（アプリ内ブラウザなど）では共有メニューに「ホーム画面に追加」が出ないので案内しない
      if (/CriOS|FxiOS|EdgiOS|Line|Instagram|FBAN|FBAV|Twitter/.test(ua)) return;
      setMode("ios");
      return;
    }
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setInstallEvent(e as InstallEvent);
      setMode("android");
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  if (!mode) return null;

  const dismiss = () => {
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      // 保存できなくても、この画面では閉じる
    }
    setMode(null);
  };

  return (
    <div className="mx-5 mt-4 rounded-2xl bg-sky-50 p-4">
      <p className="text-sm font-semibold text-sky-900">ホーム画面に追加すると、アプリのように開けます</p>
      {mode === "ios" ? (
        <p className="mt-1 text-xs leading-5 text-sky-800">
          Safariの下にある共有ボタン（□に↑）から「ホーム画面に追加」を選んでください。
        </p>
      ) : (
        <button
          type="button"
          onClick={async () => {
            await installEvent?.prompt();
            dismiss();
          }}
          className="mt-2 rounded-full bg-sky-600 px-4 py-1.5 text-xs font-semibold text-white"
        >
          ホーム画面に追加する
        </button>
      )}
      <button type="button" onClick={dismiss} className="mt-2 block text-xs text-sky-700 underline">
        今は追加しない
      </button>
    </div>
  );
}
