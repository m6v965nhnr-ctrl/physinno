"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CONFIRM_EVENT, ConfirmDetail } from "@/lib/confirm";

// askConfirm() の確認ダイアログ。複数が重なったら、順番に出す。
// Esc・外側のタップ＝キャンセル。最初のフォーカスは、安全な「キャンセル」側。
export default function ConfirmHost() {
  const [queue, setQueue] = useState<ConfirmDetail[]>([]);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const okRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  const current = queue[0];

  useEffect(() => {
    function onConfirm(event: Event) {
      const detail = (event as CustomEvent<ConfirmDetail>).detail;
      setQueue((prev) => [...prev, detail]);
    }
    window.addEventListener(CONFIRM_EVENT, onConfirm);
    return () => window.removeEventListener(CONFIRM_EVENT, onConfirm);
  }, []);

  const close = useCallback(
    (ok: boolean) => {
      if (!current) return;
      current.resolve(ok);
      setQueue((prev) => prev.slice(1));
    },
    [current]
  );

  useEffect(() => {
    if (!current) return;

    previousFocus.current = document.activeElement as HTMLElement | null;
    cancelRef.current?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close(false);
      }
      if (event.key === "Tab") {
        // 2つのボタンの間だけで、フォーカスを回す
        event.preventDefault();
        const active = document.activeElement;
        (active === cancelRef.current ? okRef.current : cancelRef.current)?.focus();
      }
    }
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      previousFocus.current?.focus?.();
    };
  }, [current, close]);

  if (!current) return null;

  const danger = current.options.danger ?? /削除|消え/.test(current.message);
  const okLabel = current.options.okLabel ?? (/削除/.test(current.message) ? "削除する" : "OK");
  const cancelLabel = current.options.cancelLabel ?? "キャンセル";

  return (
    <div
      className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/40 px-5 print:hidden"
      onClick={() => close(false)}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-describedby="confirm-message"
        className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <p id="confirm-message" className="whitespace-pre-line break-words text-sm leading-7 text-gray-800">
          {current.message}
        </p>

        <div className="mt-6 flex gap-3">
          <button
            ref={cancelRef}
            type="button"
            onClick={() => close(false)}
            className="flex-1 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-800"
          >
            {cancelLabel}
          </button>
          <button
            ref={okRef}
            type="button"
            onClick={() => close(true)}
            className={`flex-1 rounded-full px-4 py-3 text-sm font-semibold ${
              danger ? "bg-red-600 text-white" : "bg-gray-900 text-white"
            }`}
          >
            {okLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
