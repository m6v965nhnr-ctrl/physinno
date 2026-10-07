// Meta（Facebook・Instagram）広告の効果測定ピクセル。
// 環境変数 NEXT_PUBLIC_META_PIXEL_ID が設定されていないときは、何も読み込まず、何も送らない（初期状態）。
// 設定されているときも、訪問者が同意した場合だけ読み込む。

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || "";
export const PIXEL_ENABLED = META_PIXEL_ID.length > 0;

const CONSENT_KEY = "relight_ads_consent";

export type Consent = "granted" | "denied" | null;

export function getConsent(): Consent {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(v: "granted" | "denied") {
  try {
    window.localStorage.setItem(CONSENT_KEY, v);
  } catch {
    // 保存できない環境では、そのページの間だけ有効
  }
}

type Fbq = ((...args: unknown[]) => void) & { queue?: unknown[]; loaded?: boolean; callMethod?: (...a: unknown[]) => void };

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

// Meta公式の読み込みコードと同じ内容（fbevents.js を読み込む）
export function loadPixel() {
  if (!PIXEL_ENABLED || typeof window === "undefined" || window.fbq) return;

  const fbq: Fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else (fbq.queue = fbq.queue || []).push(args);
  } as Fbq;
  fbq.queue = [];
  fbq.loaded = true;
  window.fbq = fbq;
  window._fbq = fbq;

  const s = document.createElement("script");
  s.async = true;
  s.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(s);

  fbq("init", META_PIXEL_ID);
}

export function trackPageView() {
  window.fbq?.("track", "PageView");
}

// 登録が完了したとき（同意していて、読み込み済みのときだけ送られる）
export function trackRegistration() {
  window.fbq?.("track", "CompleteRegistration");
}
