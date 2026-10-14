"use client";

import { useEffect, useState } from "react";

// ホーム画面に追加できる状態か。
//   installed: すでにアプリとして開いている / ios: 共有メニューから追加（手順を案内）/ android: ボタンで追加 / none: できない・不明
export type InstallMode = "installed" | "ios" | "android" | "none";

// LINE・Instagram・Facebook・Xなどの「アプリの中のブラウザ」では、共有メニューに「ホーム画面に追加」が出ない（Safari/Chromeで開き直す必要がある）
export function isInAppBrowser(): boolean {
  return typeof navigator !== "undefined" && /Line\/|Instagram|FBAN|FBAV|FB_IAB|Twitter|MicroMessenger|KAKAOTALK|TikTok|Snapchat/i.test(navigator.userAgent);
}

export function isIosDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  return /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
}

type InstallEvent = Event & { prompt: () => Promise<void> };

// iOSのホーム画面アプリは、Safariとログイン状態などが別（iOSの仕様）
export function isStandaloneApp(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

export function useInstall() {
  const [mode, setMode] = useState<InstallMode | null>(null);
  const [installEvent, setInstallEvent] = useState<InstallEvent | null>(null);

  useEffect(() => {
    if (isStandaloneApp()) {
      setMode("installed");
      return;
    }
    const ua = navigator.userAgent;
    // iPadOS は Macintosh を名乗るので、タッチ対応かで見分ける
    const ios = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
    if (ios) {
      // アプリ内ブラウザ（LINE・Instagram等）は、別の案内を出す（ここでは、追加できない扱い）
      setMode(isInAppBrowser() ? "none" : "ios");
      return;
    }
    setMode("none");
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setInstallEvent(e as InstallEvent);
      setMode("android");
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  async function promptInstall() {
    await installEvent?.prompt();
  }

  return { mode, promptInstall };
}
