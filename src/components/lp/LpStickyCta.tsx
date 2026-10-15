"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// スマホだけ、ファーストビューを過ぎたら、下に「無料で登録」を固定して見せる（登録までの道を、いつも見える所に）
export default function LpStickyCta({ registerHref }: { registerHref: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-[var(--lp-g200)] bg-white/95 px-4 pt-3 shadow-[0_-6px_20px_rgba(10,61,42,0.10)] backdrop-blur transition-transform duration-300 md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
      aria-hidden={!show}
    >
      <div className="mx-auto flex max-w-md items-center gap-2">
        <Link href="/guest" tabIndex={show ? 0 : -1} className="shrink-0 rounded-full border-2 border-[var(--lp-g700)] px-4 py-3 text-sm font-bold text-[var(--lp-g700)]">
          中を見る
        </Link>
        <Link href={registerHref} tabIndex={show ? 0 : -1} className="flex-1 rounded-full bg-[var(--lp-g700)] px-4 py-3 text-center text-sm font-bold text-white">
          無料で登録する（1分）
        </Link>
      </div>
    </div>
  );
}
