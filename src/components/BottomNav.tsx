"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function BottomNavWrapper() {
  const pathname = usePathname();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function checkLogin() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setLoggedIn(!!user);
    }

    checkLogin();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setLoggedIn(!!session?.user);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

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
      href: "/pts",
      icon: "⌕",
      label: "PT検索",
    },
    {
      href: "/posts/create",
      icon: "+",
      label: "投稿",
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

    if (href === "/mypage") {
      return (
        pathname === "/mypage" ||
        pathname.startsWith("/mypage/")
      );
    }

    return pathname === href;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-xl items-center justify-around px-2 py-2">
        {menus.map((menu) => {
          const active = isActive(menu.href);

          return (
            <Link
              key={menu.href}
              href={menu.href}
              className={`
                flex
                min-w-[72px]
                flex-col
                items-center
                gap-0.5
                rounded-xl
                px-3
                py-1.5
                transition
                active:scale-95
                ${
                  active
                    ? "font-semibold text-black"
                    : "text-gray-400"
                }
              `}
            >
              <span
                className={`
                  flex
                  h-7
                  items-center
                  justify-center
                  leading-none
                  ${
                    menu.href === "/posts/create"
                      ? "text-3xl font-light"
                      : "text-2xl"
                  }
                `}
              >
                {menu.icon}
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