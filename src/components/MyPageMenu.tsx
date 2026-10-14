"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";

// マイページ左上の「⋯」メニュー。運営へのメッセージ・意見箱／ログアウト／ブロック中のユーザー／退会
export default function MyPageMenu({ onLogout, className = "" }: { onLogout: () => void; className?: string }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const item = "block w-full px-4 py-3 text-left text-sm text-gray-800 hover:bg-gray-50";

  return (
    <div ref={wrapRef} className={`absolute left-3 top-3 z-30 ${className}`}>
      <button
        type="button"
        aria-label="メニュー"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-xl font-bold leading-none text-gray-700 shadow-sm ring-1 ring-gray-200 hover:bg-white"
      >
        <span aria-hidden="true">⋯</span>
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          className="mt-2 w-64 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg"
        >
          <Link role="menuitem" href="/feedback" className={item} onClick={() => setOpen(false)}>
            運営へのメッセージ・意見箱
          </Link>
          <Link role="menuitem" href="/mypage/blocked" className={`${item} border-t border-gray-100`} onClick={() => setOpen(false)}>
            ブロック中のユーザー
          </Link>
          <button
            role="menuitem"
            type="button"
            onClick={() => {
              setOpen(false);
              onLogout();
            }}
            className={`${item} border-t border-gray-100`}
          >
            ログアウト
          </button>
          <Link
            role="menuitem"
            href="/mypage/delete-account"
            className={`${item} border-t border-gray-100 text-red-600`}
            onClick={() => setOpen(false)}
          >
            退会する（アカウントの削除）
          </Link>
        </div>
      )}
    </div>
  );
}
