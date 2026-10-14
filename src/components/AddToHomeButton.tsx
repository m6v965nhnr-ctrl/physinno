"use client";

import { useEffect, useState } from "react";
import { isInAppBrowser, isIosDevice, useInstall } from "@/lib/install";

// マイページの「ホーム画面に追加」。目立つ色で、押すと、機種・ブラウザに合わせたやり方を出す。
//  - iPhone(Safari): 共有ボタン →（見当たらなければ「表示を増やす」）→「ホーム画面に追加」
//  - LINE・Instagramなどの中: 先に、Safari（Androidは Chrome）で開き直す
//  - Android(Chrome): ワンタップ。出ないときは、メニュー（⋮）から
export default function AddToHomeButton() {
  const { mode, promptInstall } = useInstall();
  const [open, setOpen] = useState(false);
  const [inApp, setInApp] = useState(false);
  const [ios, setIos] = useState(false);

  useEffect(() => {
    setInApp(isInAppBrowser());
    setIos(isIosDevice());
  }, []);

  // 追加済みのアプリの中では、出さない（場所を取らない）
  if (mode === null || mode === "installed") return null;

  const step = "flex gap-3 text-sm leading-6 text-gray-800";
  const num = "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white";

  return (
    <section
      aria-labelledby="add-to-home-title"
      className="mt-6 overflow-hidden rounded-2xl border-2 border-sky-300 bg-gradient-to-br from-sky-50 to-emerald-50 p-4"
    >
      <div className="flex items-start gap-3">
        <span aria-hidden="true" className="text-3xl leading-none">
          📲
        </span>
        <div className="min-w-0">
          <h2 id="add-to-home-title" className="text-sm font-bold text-gray-900">
            ホーム画面に追加して、1タップで開く
          </h2>
          <p className="mt-0.5 text-xs leading-5 text-gray-600">アプリのアイコンが、スマホに並びます。毎回、検索せずに開けます（無料・数秒）。</p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          if (mode === "android" && !open) {
            promptInstall().catch(() => setOpen(true));
            return;
          }
          setOpen((v) => !v);
        }}
        aria-expanded={open}
        className="mt-3 w-full rounded-full bg-gradient-to-r from-sky-500 to-emerald-500 py-3 text-sm font-bold text-white shadow-sm active:scale-[0.98]"
      >
        {open ? "やり方を閉じる" : "ホーム画面に追加する"}
      </button>

      {open && (
        <div className="mt-3 space-y-3 rounded-xl bg-white p-3">
          {inApp ? (
            <>
              <p className="text-xs font-semibold text-amber-800">
                LINE・Instagramなどのアプリの中で開いているときは、先に、{ios ? "Safari" : "Chrome"}で開き直してください。
              </p>
              <ol className="space-y-2.5">
                <li className={step}>
                  <span className={num}>1</span>
                  <span>
                    画面の右上・右下にある「…」や共有ボタンから、<b>「{ios ? "Safariで開く" : "ブラウザで開く（Chrome）"}」</b>を選びます。
                    <span className="mt-0.5 block text-xs text-gray-500">（LINEは右下の共有ボタン、Instagramは右上・右下の「…」にあります）</span>
                  </span>
                </li>
                <li className={step}>
                  <span className={num}>2</span>
                  <span>開き直した画面で、ログインして、このマイページを開きます。</span>
                </li>
                <li className={step}>
                  <span className={num}>3</span>
                  <span>
                    ここにある、<b>「ホーム画面に追加する」</b>をもう一度押して、案内に従います。
                  </span>
                </li>
              </ol>
            </>
          ) : ios ? (
            <ol className="space-y-2.5">
              <li className={step}>
                <span className={num}>1</span>
                <span>
                  画面の下（または上）にある、<b>共有ボタン（□に↑）</b>を押します。
                </span>
              </li>
              <li className={step}>
                <span className={num}>2</span>
                <span>
                  メニューを、下へスクロールして、<b>「ホーム画面に追加」</b>を探して押します。
                  <span className="mt-1 block rounded-lg bg-amber-50 px-2.5 py-1.5 text-xs leading-5 text-amber-900">
                    見当たらないとき：メニューの上のほうにある、<b>「表示を増やす」（∨）</b>を押すと、「ホーム画面に追加」が出ます。
                  </span>
                </span>
              </li>
              <li className={step}>
                <span className={num}>3</span>
                <span>
                  右上の<b>「追加」</b>を押して、完了です。
                </span>
              </li>
              <li className="text-xs leading-5 text-gray-500">
                ※ 初めて、ホーム画面のアイコンから開くときだけ、もう一度ログインが必要です（iPhoneの仕様で、Safariとは別になります）。<br />
                ※ Safari以外のブラウザ（Chromeなど）で、共有メニューに出ないときは、Safariで開き直してください。
              </li>
            </ol>
          ) : (
            <ol className="space-y-2.5">
              <li className={step}>
                <span className={num}>1</span>
                <span>
                  Chromeの右上にある<b>「⋮」</b>を押します。
                </span>
              </li>
              <li className={step}>
                <span className={num}>2</span>
                <span>
                  <b>「ホーム画面に追加」</b>（または「アプリをインストール」）を選びます。
                </span>
              </li>
              <li className={step}>
                <span className={num}>3</span>
                <span>表示された画面で、<b>「追加」</b>（「インストール」）を押して、完了です。</span>
              </li>
              <li className="text-xs leading-5 text-gray-500">
                ※ パソコンで開いているときは、スマホのブラウザ（iPhoneはSafari、AndroidはChrome）で、このページを開いてください。
              </li>
            </ol>
          )}
        </div>
      )}
    </section>
  );
}
