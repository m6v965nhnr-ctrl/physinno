"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { PIXEL_ENABLED, getConsent, loadPixel, setConsent, trackPageView, type Consent } from "@/lib/metaPixel";

// 広告の効果測定（Metaピクセル）の同意バナー。環境変数が未設定のときは、何も表示せず、何も読み込まない
export default function MetaPixel() {
  const pathname = usePathname();
  const [consent, setConsentState] = useState<Consent>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!PIXEL_ENABLED) return;
    const c = getConsent();
    setConsentState(c);
    setReady(true);
    if (c === "granted") loadPixel();
  }, []);

  // ページを移動するたびに、同意している人だけ PageView を送る
  useEffect(() => {
    if (PIXEL_ENABLED && consent === "granted") trackPageView();
  }, [pathname, consent]);

  if (!PIXEL_ENABLED || !ready || consent !== null) return null;

  function choose(v: "granted" | "denied") {
    setConsent(v);
    setConsentState(v);
    if (v === "granted") loadPixel();
  }

  return (
    <div
      role="dialog"
      aria-label="広告の効果測定について"
      className="fixed inset-x-3 bottom-20 z-50 mx-auto max-w-md rounded-2xl border border-gray-200 bg-white p-4 shadow-lg"
    >
      <p className="text-xs leading-5 text-gray-700">
        広告の効果を測るため、Meta（Facebook・Instagram）の計測ツールを使うことがあります。同意すると、閲覧したページや登録の完了が、Metaに送られます。同意しなくても、すべての機能を使えます。
        <a href="/privacy" className="ml-1 underline">
          詳しく
        </a>
      </p>
      <div className="mt-3 flex gap-2">
        <button onClick={() => choose("denied")} className="flex-1 rounded-full border border-gray-300 py-2 text-xs text-gray-700">
          同意しない
        </button>
        <button onClick={() => choose("granted")} className="flex-1 rounded-full bg-black py-2 text-xs font-medium text-white">
          同意する
        </button>
      </div>
    </div>
  );
}
