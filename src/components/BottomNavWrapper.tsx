
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function BottomNavWrapper() {
  const pathname = usePathname();

  const [loggedIn, setLoggedIn] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function checkLogin() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!mounted) return;

      setLoggedIn(!!user);
      setChecked(true);
    }

    checkLogin();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!mounted) return;

        setLoggedIn(!!session?.user);
        setChecked(true);
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // ログイン状態の確認が終わるまで何も表示しない
  if (!checked) {
    return null;
  }

  // ログイン前は表示しない
  if (
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/register"
  ) {
    return null;
  }

  // 未ログインなら表示しない
  if (!loggedIn) {
    return null;
  }

  const menus = [
  {
    href: "/home",
    icon: "⌂",
    label: "ホーム",
  },
  {
    href: "/messages",
    icon: "💬",
    label: "メッセージ",
  },
  {
    href: "/posts/create",
    icon: "+",
    label: "投稿",
  },
  {
    href: "/pts",
    icon: "⌕",
    label: "PT検索",
  },
  {
    href: "/mypage",
    icon: "○",
    label: "マイページ",
  },
];

  function isActive(href: string) {
    if (href === "/home") {
      return pathname === "/home";
    }

    if (href === "/pts") {
      return (
        pathname === "/pts" ||
        pathname.startsWith("/pts/")
      );
    }

    if (href === "/posts/create") {
      return pathname === "/posts/create";
    }

    if (href === "/messages") {
      return (
        pathname === "/messages" ||
        pathname.startsWith("/messages/")
      );
    }

    if (href === "/mypage") {
      return (
        pathname === "/mypage" ||
        pathname.startsWith("/mypage/")
      );
    }

    return pathname === href;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[9999] border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-xl items-center justify-around px-1 py-2">
        {menus.map((menu) => {
          const active = isActive(menu.href);

          return (
            <Link
              key={menu.href}
              href={menu.href}
              className={`flex min-w-[64px] flex-col items-center gap-0.5 rounded-xl px-2 py-1.5 transition active:scale-95 ${
                active
                  ? "font-semibold text-black"
                  : "text-gray-400"
              }`}
            >
              <span
                className={`flex h-7 items-center justify-center leading-none ${
                  menu.href === "/posts/create"
                    ? "text-3xl font-light"
                    : "text-2xl"
                }`}
              >
                {menu.icon}
              </span>

              <span className="text-[10px]">
                {menu.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}