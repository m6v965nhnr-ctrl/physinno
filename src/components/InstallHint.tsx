"use client";

import { useEffect, useState } from "react";
import { useInstall } from "@/lib/install";

const KEY = "relight-install-hint-dismissed";

// 「ホーム画面に追加」の案内（ホーム）。すでにアプリとして開いている人・閉じた人には出さない。
export default function InstallHint() {
  const { mode, promptInstall } = useInstall();
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    try {
      setDismissed(!!localStorage.getItem(KEY));
    } catch {
      setDismissed(false);
    }
  }, []);

  if (dismissed || (mode !== "ios" && mode !== "android")) return null;

  const dismiss = () => {
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      // 保存できなくても、この画面では閉じる
    }
    setDismissed(true);
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
            await promptInstall();
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
