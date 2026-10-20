"use client";

import Link from "next/link";
import { useState } from "react";

const MENU = [
  { href: "/for-pt", label: "理学療法士の方へ" },
  { href: "/for-students", label: "学生の方へ" },
  { href: "/teachers", label: "教員の方へ" },
  { href: "/for-general", label: "一般の方へ" },
];

// ホームページの上の帯。Re:light の横の3本バーで、4つの入口を開く
export default function LpHeader({ registerHref }: { registerHref: string }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--lp-g100)] bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[60px] max-w-5xl items-center justify-between gap-3 px-5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="メニュー"
            aria-expanded={open}
            aria-controls="lp-menu"
            onClick={() => setOpen((o) => !o)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full hover:bg-[var(--lp-g50)]"
          >
            <span className="block h-0.5 w-5 rounded bg-[var(--lp-g900)]" />
            <span className="block h-0.5 w-5 rounded bg-[var(--lp-g900)]" />
            <span className="block h-0.5 w-5 rounded bg-[var(--lp-g900)]" />
          </button>
          <Link href="/" className="text-xl font-bold tracking-tight text-[var(--lp-g900)]">
            Re:light
          </Link>
        </div>
        <nav className="flex items-center gap-1.5 sm:gap-3" aria-label="メイン">
          <Link href="/guest" className="hidden rounded-full px-3 py-2 text-sm font-bold text-[var(--lp-g700)] hover:bg-[var(--lp-g50)] sm:inline-block">
            中を見てみる
          </Link>
          <Link href="/login" className="px-2 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
            ログイン
          </Link>
          <Link href={registerHref} className="rounded-full bg-relight-gradient px-4 py-2.5 text-sm font-bold">
            無料登録
          </Link>
        </nav>
      </div>
      {open && (
        <ul id="lp-menu" className="border-t border-[var(--lp-g100)] bg-white px-5 py-2 shadow-md">
          {MENU.map((m) => (
            <li key={m.href}>
              <Link href={m.href} onClick={() => setOpen(false)} className="block border-b border-[var(--lp-g100)] py-3 text-sm font-bold text-[var(--lp-g900)] last:border-b-0">
                {m.label} <span aria-hidden="true" className="text-[var(--lp-g600)]">→</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
