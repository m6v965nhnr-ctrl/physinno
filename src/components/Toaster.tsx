"use client";

import { useEffect, useRef, useState } from "react";
import { NOTIFY_EVENT, NotifyDetail } from "@/lib/notify";

type Toast = NotifyDetail & { id: number };

// notify() で送られたメッセージを表示する。ページ遷移をまたいで残り、数秒で消える
export default function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(1);

  useEffect(() => {
    function onNotify(event: Event) {
      const detail = (event as CustomEvent<NotifyDetail>).detail;
      const id = nextId.current++;

      setToasts((prev) => [...prev.slice(-2), { ...detail, id }]);

      window.setTimeout(
        () => setToasts((prev) => prev.filter((t) => t.id !== id)),
        detail.kind === "error" ? 6000 : 4000
      );
    }

    window.addEventListener(NOTIFY_EVENT, onNotify);
    return () => window.removeEventListener(NOTIFY_EVENT, onNotify);
  }, []);

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 z-[10000] flex flex-col items-center gap-2 px-4"
      style={{ bottom: "calc(env(safe-area-inset-bottom) + 84px)" }}
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          role={t.kind === "error" ? "alert" : "status"}
          className={`pointer-events-auto max-w-md whitespace-pre-line break-words rounded-2xl px-5 py-3 text-sm leading-6 text-white shadow-lg ${
            t.kind === "error" ? "bg-red-600" : "bg-gray-900"
          }`}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
