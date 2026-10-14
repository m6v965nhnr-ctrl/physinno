"use client";

import { useState } from "react";
import { useInstall } from "@/lib/install";

// マイページの「ホーム画面に追加」ボタン。
// Android(Chrome)はワンタップで追加、iPhoneは共有メニューからの手順を出す（iOSの仕様で、自動では追加できない）
export default function AddToHomeButton() {
  const { mode, promptInstall } = useInstall();
  const [showSteps, setShowSteps] = useState(false);

  if (mode !== "ios" && mode !== "android") return null;

  return (
    <div className="mt-3 rounded-2xl border border-gray-100 bg-white p-5">
      <p className="text-sm font-semibold text-gray-900">スマホのホーム画面に追加</p>
      <p className="mt-1 text-xs leading-5 text-gray-500">アイコンをタップするだけで、アプリのように開けます。</p>
      <button
        type="button"
        onClick={() => (mode === "android" ? promptInstall() : setShowSteps((v) => !v))}
        className="mt-3 w-full rounded-full border border-gray-300 bg-white py-2.5 text-sm font-medium text-gray-800 hover:bg-gray-50"
      >
        ホーム画面に追加する
      </button>
      {mode === "ios" && showSteps && (
        <ol className="mt-3 list-decimal space-y-1 pl-5 text-xs leading-6 text-gray-700">
          <li>Safariで、この画面を開いたままにします</li>
          <li>画面下の共有ボタン（□に↑）を押します</li>
          <li>「ホーム画面に追加」を選んで、「追加」を押します</li>
          <li>初めて開くときだけ、アプリの中でもう一度ログインしてください（iPhoneの仕様で、Safariとは別になります）</li>
        </ol>
      )}
    </div>
  );
}
