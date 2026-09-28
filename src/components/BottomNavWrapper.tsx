"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { AccountType, getMyAccountType } from "@/lib/account";

type Menu = {
  href: string;
  icon: string;
  label: string;
};

// 通知はホーム画面内のボタン（Re:light見出しの下）に置くため、
// PTのボトムナビには含めない（一般の方にはホーム相当の画面がないため残す）
const PT_MENUS: Menu[] = [
  { href: "/home", icon: "⌂", label: "ホーム" },
  { href: "/messages", icon: "💬", label: "メッセージ" },
  { href: "/posts/create", icon: "+", label: "投稿" },
  { href: "/pts", icon: "⌕", label: "検索" },
  { href: "/mypage", icon: "○", label: "マイページ" },
];

// 一般の方：PTを探す・メッセージ・通知・マイページのみ
const GENERAL_MENUS: Menu[] = [
  { href: "/pts", icon: "⌕", label: "検索" },
  { href: "/messages", icon: "💬", label: "メッセージ" },
  { href: "/notifications", icon: "🔔", label: "通知" },
  { href: "/mypage", icon: "○", label: "マイページ" },
];

export default function BottomNavWrapper() {
  const pathname = usePathname();

  const [loggedIn, setLoggedIn] = useState(false);
  const [accountType, setAccountType] = useState<AccountType | null>(null);
  const [checked, setChecked] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    let mounted = true;

    async function applyUser(userId: string | null) {
      if (!userId) {
        if (!mounted) return;
        setLoggedIn(false);
        setAccountType(null);
        setChecked(true);
        setUnreadCount(0);
        return;
      }

      const type = await getMyAccountType(userId);

      const { count } = await supabase
        .from("notifications")
        .select("id", { count: "exact", head: true })
        .eq("user_id", userId)
        .eq("is_read", false);

      if (!mounted) return;

      setLoggedIn(true);
      setAccountType(type);
      setChecked(true);
      setUnreadCount(count || 0);
    }

    supabase.auth.getUser().then(({ data: { user } }) => {
      applyUser(user?.id ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      applyUser(session?.user?.id ?? null);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [pathname]);

  // ログイン状態の確認が終わるまで何も表示しない
  if (!checked) {
    return null;
  }

  // ログイン前のページでは表示しない
  if (
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/register"
  ) {
    return null;
  }

  if (!loggedIn) {
    return null;
  }

  const menus = accountType === "general" ? GENERAL_MENUS : PT_MENUS;

  function isActive(href: string) {
    if (href === "/home" || href === "/posts/create") {
      return pathname === href;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <nav
      aria-label="メインメニュー"
      className="fixed bottom-0 left-0 right-0 z-[9999] border-t border-gray-200 bg-white print:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto flex max-w-xl items-center justify-around px-1 py-2">
        {menus.map((menu) => {
          const active = isActive(menu.href);

          return (
            <Link
              key={menu.href}
              href={menu.href}
              aria-current={active ? "page" : undefined}
              aria-label={
                menu.href === "/notifications" && unreadCount > 0
                  ? `${menu.label}（未読${unreadCount}件）`
                  : undefined
              }
              className={`flex min-w-[64px] flex-col items-center gap-0.5 rounded-xl px-2 py-1.5 transition active:scale-95 ${
                active
                  ? "font-semibold text-black"
                  : "text-gray-400"
              }`}
            >
              <span
                aria-hidden="true"
                className={`relative flex h-7 items-center justify-center leading-none ${
                  menu.href === "/posts/create"
                    ? "text-3xl font-light"
                    : "text-2xl"
                }`}
              >
                {menu.icon}
                {menu.href === "/notifications" && unreadCount > 0 && (
                  <span className="absolute -right-1.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-semibold text-white">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </span>

              <span className="text-[11px]">
                {menu.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
