"use client";

import NavIcon from "@/components/NavIcons";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { withReturnTo } from "@/lib/returnTo";
import { isAdminUser } from "@/lib/admin";
import { touchLastSeen } from "@/lib/lastSeen";
import { supabase } from "@/lib/supabase";
import { AccountType, getMyAccountType, isPublicPaperSitePath, syncMyAccountType } from "@/lib/account";
import { notify } from "@/lib/notify";
import { useGuestRole } from "@/lib/guestRole";
import { myOrganization } from "@/lib/recruit";

type Menu = {
  href: string;
  icon: string;
  label: string;
};

// 通知はホーム画面内のボタン（Re:light見出しの下）に置くため、
// PTのボトムナビには含めない（一般の方にはホーム相当の画面がないため残す）
const PT_MENUS: Menu[] = [
  { href: "/mypage", icon: "○", label: "マイページ" },
  { href: "/pts", icon: "⌕", label: "検索" },
  { href: "/posts/create", icon: "+", label: "投稿" },
  { href: "/messages", icon: "💬", label: "メッセージ" },
  { href: "/home", icon: "⌂", label: "ホーム" },
];

// ログインしていない訪問者（ゲスト閲覧）：見て回るための最小限のメニューと、登録への入口
// 立場（PT／学生）を選んだゲストごとに、メニューを変える
const GUEST_MENUS_UNSET: Menu[] = [
  { href: "/guest", icon: "⌂", label: "見てみる" },
  { href: "/pts", icon: "⌕", label: "検索" },
  { href: "/kokushi", icon: "📝", label: "過去問" },
  { href: "/register", icon: "○", label: "登録・ログイン" },
];

// 先生（クラス・テスト・分析）の画面のメニュー
const TEACHER_BASE = "/student/quiz/teacher";
const TEACHER_MENUS: Menu[] = [
  { href: `${TEACHER_BASE}/account`, icon: "○", label: "アカウント" },
  { href: `${TEACHER_BASE}/tests`, icon: "📝", label: "テスト" },
  { href: `${TEACHER_BASE}/analysis`, icon: "📊", label: "分析" },
  { href: `${TEACHER_BASE}/classes`, icon: "👥", label: "クラス" },
  { href: TEACHER_BASE, icon: "⌂", label: "ホーム" },
];

// 先生のメニューの、いまの場所。テストの作成・課題の結果は「テスト」、クラスの状況は「分析」に含める
function teacherActive(href: string, pathname: string) {
  if (href === TEACHER_BASE) return pathname === TEACHER_BASE;
  if (href.endsWith("/tests")) return /^\/student\/quiz\/teacher\/(tests|test|assignment)(\/|$)/.test(pathname);
  if (href.endsWith("/analysis")) return /^\/student\/quiz\/teacher\/(analysis|class)(\/|$)/.test(pathname);
  return pathname === href || pathname.startsWith(`${href}/`);
}

// ゲスト用のメニューを出さないページ（トップ・認証まわり）
const NO_NAV_PATHS = ["/", "/start", "/setup", "/login", "/register", "/forgot-password", "/reset-password", "/guest", "/teachers", "/for-pt", "/for-students", "/for-general", "/for-org"];

// 一般の方：PTを探す・メッセージ・通知・マイページのみ
const GENERAL_MENUS: Menu[] = [
  { href: "/pts", icon: "⌕", label: "検索" },
  { href: "/messages", icon: "💬", label: "メッセージ" },
  { href: "/notifications", icon: "🔔", label: "通知" },
  { href: "/mypage", icon: "○", label: "マイページ" },
];

// 施設（組織）のアカウント：ホーム（自分の施設・求人・投稿）・PT検索・投稿・スカウトのメッセージ・マイページ
const ORG_MENUS: Menu[] = [
  { href: "/org", icon: "⌂", label: "ホーム" },
  { href: "/pts", icon: "⌕", label: "検索" },
  { href: "/org/posts/new", icon: "+", label: "投稿" },
  { href: "/scouts", icon: "💬", label: "メッセージ" },
  { href: "/mypage", icon: "○", label: "マイページ" },
];

export default function BottomNavWrapper() {
  const pathname = usePathname();

  const [loggedIn, setLoggedIn] = useState(false);
  const [accountType, setAccountType] = useState<AccountType | null>(null);
  const [isOrg, setIsOrg] = useState(false);
  const [checked, setChecked] = useState(false);
  // 運営のアカウントには、下のメニュー（ホーム・検索など）を出さない
  const [isAdmin, setIsAdmin] = useState(false);
  const guestRole = useGuestRole();
  const [unreadNotifCount, setUnreadNotifCount] = useState(0);
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  const userIdRef = useRef<string | null>(null);
  const prevPathnameRef = useRef(pathname);

  // 下のメニューを、画面に見えている範囲の下に、いつも合わせる。
  // iPhoneのホーム画面アプリで、スクロールすると、メニューが本文といっしょに上へついてきてしまうことがあったため、
  // 見えている範囲（visualViewport）の下と、メニューの下がずれたら、そのずれだけ、transformで戻す。ずれがなければ、何もしない
  useEffect(() => {
    const NAV = 'nav[aria-label="メインメニュー"]';
    let raf = 0;
    const debug = new URLSearchParams(window.location.search).get("navdebug") === "1";
    let box: HTMLDivElement | null = null;
    if (debug) {
      box = document.createElement("div");
      box.style.cssText = "position:fixed;top:60px;left:6px;z-index:2147483647;background:rgba(0,0,0,.8);color:#0f0;font:11px/1.4 monospace;padding:6px;border-radius:6px;pointer-events:none;white-space:pre";
      document.body.appendChild(box);
    }
    const fix = () => {
      raf = 0;
      const nav = document.querySelector<HTMLElement>(NAV);
      if (!nav) return;
      const vv = window.visualViewport;
      const visibleBottom = vv ? vv.offsetTop + vv.height : window.innerHeight;
      const cur = Number(nav.dataset.shift || 0);
      const rect = nav.getBoundingClientRect();
      const natural = rect.bottom - cur;
      const diff = Math.round(visibleBottom - natural);
      if (Math.abs(diff - cur) > 2) {
        nav.dataset.shift = String(diff);
        nav.style.transform = diff === 0 ? "" : `translateY(${diff}px)`;
      }
      if (box) {
        box.textContent = [
          `scrollY ${Math.round(window.scrollY)}  el.scrollTop ${Math.round(document.scrollingElement?.scrollTop ?? -1)}`,
          `innerH ${window.innerHeight}  vv.h ${vv ? Math.round(vv.height) : "-"}  vv.top ${vv ? Math.round(vv.offsetTop) : "-"}  vv.pageTop ${vv ? Math.round(vv.pageTop) : "-"}`,
          `nav.bottom ${Math.round(rect.bottom)}  shift ${nav.dataset.shift || 0}  docH ${document.documentElement.scrollHeight}`,
        ].join("\n");
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(fix);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.visualViewport?.addEventListener("scroll", schedule);
    window.visualViewport?.addEventListener("resize", schedule);
    const timer = window.setInterval(schedule, 700); // スクロールの余韻（慣性）のあいだも、合わせ続ける
    schedule();
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.visualViewport?.removeEventListener("scroll", schedule);
      window.visualViewport?.removeEventListener("resize", schedule);
      window.clearInterval(timer);
      if (raf) cancelAnimationFrame(raf);
      box?.remove();
    };
  }, []);

  // スマホで文字を入力しているあいだは、下のメニューを隠す。
  // iPhoneは、キーボードが出ているときに画面をスクロールすると、画面の下に固定したメニューが、上のほうへ動いてしまうため
  const [typing, setTyping] = useState(false);
  useEffect(() => {
    const touch = window.matchMedia("(pointer: coarse)");
    const isField = (el: Element | null) =>
      !!el && el.matches('textarea, select, [contenteditable="true"], input:not([type="checkbox"]):not([type="radio"]):not([type="range"]):not([type="button"]):not([type="submit"]):not([type="file"])');
    const update = () => setTyping(touch.matches && isField(document.activeElement));
    // キーボードを閉じたあとに、画面の下に固定したものの位置が、キーボードがあったときのまま戻らないことがある（iPhone）。
    // 少しだけ画面を動かして、位置を計算し直させる
    const reflow = () => {
      if (!touch.matches || isField(document.activeElement)) return;
      window.scrollBy(0, 1);
      window.scrollBy(0, -1);
    };
    const onOut = () => {
      setTimeout(update, 0); // 別の入力欄に移るときに、一瞬だけ出ないように
      setTimeout(reflow, 120);
      setTimeout(reflow, 500);
    };
    window.visualViewport?.addEventListener("resize", reflow);
    document.addEventListener("focusin", update);
    document.addEventListener("focusout", onOut);
    return () => {
      document.removeEventListener("focusin", update);
      document.removeEventListener("focusout", onOut);
      window.visualViewport?.removeEventListener("resize", reflow);
    };
  }, []);

  async function refreshUnreadCounts(userId: string) {
    const [{ count }, { data: unreadConvCount }] = await Promise.all([
      supabase
        .from("notifications")
        .select("id", { count: "exact", head: true })
        .eq("user_id", userId)
        .eq("is_read", false),
      supabase.rpc("get_unread_conversation_count"),
    ]);

    setUnreadNotifCount(count || 0);
    setUnreadMessageCount(
      typeof unreadConvCount === "number" ? unreadConvCount : 0
    );
  }

  // ログイン状態・未読件数は、マウント時とログイン状態が変わった時だけ取得する
  // （画面遷移のたびに毎回問い合わせると無駄なリクエストが積み重なるため）
  useEffect(() => {
    let mounted = true;

    async function applyUser(userId: string | null) {
      userIdRef.current = userId;

      if (!userId) {
        if (!mounted) return;
        setIsAdmin(false);
        setLoggedIn(false);
        setAccountType(null);
        setChecked(true);
        setUnreadNotifCount(0);
        setUnreadMessageCount(0);
        return;
      }

      touchLastSeen();
      const admin = await isAdminUser(userId);
      if (!mounted) return;
      setIsAdmin(admin);

      let type = await getMyAccountType(userId);

      // 卒業予定年を過ぎた学生は、ここでPTに切り替え、プロフィールの入力へ案内する
      if (type === "student") {
        const synced = await syncMyAccountType();
        if (synced === "pt") {
          type = "pt";
          notify("ご卒業おめでとうございます！PTのアカウントに切り替わりました。プロフィールを入力しましょう");
          window.location.href = "/mypage/edit?welcome=1";
          return;
        }
      }

      // 施設（組織）を登録している一般アカウントには、施設用のメニューを出す
      const org = type === "general" ? await myOrganization().catch(() => null) : null;

      if (!mounted) return;

      setLoggedIn(true);
      setIsOrg(!!org);
      setAccountType(type);
      setChecked(true);

      await refreshUnreadCounts(userId);
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      applyUser(session?.user?.id ?? null);
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
  }, []);

  // 通知・メッセージ一覧を開いて既読にした後、他のページへ戻ったタイミングで
  // バッジの数だけ更新する（毎回の画面遷移では問い合わせない）
  useEffect(() => {
    const prevPathname = prevPathnameRef.current;
    prevPathnameRef.current = pathname;

    const leftNotifications = prevPathname === "/notifications";
    const leftMessages =
      prevPathname === "/messages" || prevPathname?.startsWith("/messages/");

    if ((leftNotifications || leftMessages) && userIdRef.current) {
      refreshUnreadCounts(userIdRef.current);
    }
  }, [pathname]);

  // 下のメニューを出す画面かどうか（出す画面では、画面全体ではなく、本文だけをスクロールさせる。globals.css の data-shell）。
  // iPhoneで、一番上・一番下まで行ってさらに引っ張ったときに、下のメニューが本文といっしょに動いてしまうのを防ぐため
  const hideForAdmin = isAdmin && pathname.startsWith("/admin");
  const shellOn = checked && !hideForAdmin && !NO_NAV_PATHS.includes(pathname) && !isPublicPaperSitePath(pathname);
  useEffect(() => {
    const root = document.documentElement;
    if (shellOn) root.setAttribute("data-shell", "");
    else root.removeAttribute("data-shell");
    return () => root.removeAttribute("data-shell");
  }, [shellOn]);

  // ログイン状態の確認が終わるまで何も表示しない
  if (!checked) {
    return null;
  }

  // 運営のアカウントでも、運営の画面（/admin）以外では、ふつうのメニューを出す
  if (hideForAdmin) {
    return null;
  }

  // トップ・ログイン・登録のページでは表示しない
  if (NO_NAV_PATHS.includes(pathname) || isPublicPaperSitePath(pathname)) {
    return null;
  }

  // 立場（PT／学生）を選んで中を見ているゲストには、本物と同じメニューを「見るだけ」で出す（押せない）
  const previewOnly = !loggedIn && (guestRole === "pt" || guestRole === "student");

  // ログインしていない訪問者（立場を選んでいない人）には、ゲスト用のメニューを出す
  // 先生のアカウント、または、先生の画面（PTの先生も）では、先生のメニュー
  const teacherMode = loggedIn && (accountType === "teacher" || pathname.startsWith(TEACHER_BASE));
  const baseMenus = teacherMode
    ? TEACHER_MENUS
    : previewOnly
    ? PT_MENUS
    : !loggedIn
      ? GUEST_MENUS_UNSET
      : accountType === "org"
        ? ORG_MENUS
      : accountType === "general"
        ? isOrg
          ? ORG_MENUS
          : GENERAL_MENUS
        : accountType === "student"
          ? PT_MENUS.map((m) => (m.href === "/posts/create" ? { href: "/study", icon: "🎯", label: "勉強" } : m))
          : PT_MENUS;

  // ゲストの「登録・ログイン」は、いま見ている画面を覚えて、登録のあとに戻す
  const menus = baseMenus.map((m) =>
    !loggedIn && m.href === "/register"
      ? { ...m, href: withReturnTo("/register", pathname + (typeof window !== "undefined" ? window.location.search : "")) }
      : m
  );

  function isActive(href: string) {
    if (teacherMode) return teacherActive(href, pathname);
    if (accountType === "org" || (isOrg && accountType === "general")) {
      if (href === "/org") return pathname === "/org" || pathname.startsWith("/org/jobs");
      if (href === "/org/posts/new") return pathname.startsWith("/org/posts");
    }
    const [base, query] = href.split("?");
    const search = typeof window !== "undefined" ? window.location.search : "";

    // 「?mode=ideas」のように、同じページの中のタブを指すメニュー
    if (query) return pathname === base && search.includes(query);

    // 同じページ（/pts）でも、タブを指す別のメニューがあるときは、そちらを優先する
    if (pathname === base && menus.some((m) => m.href.startsWith(`${base}?`) && search.includes(m.href.split("?")[1]))) {
      return false;
    }

    // 学生のマイページは /student に移るので、そこでも「マイページ」を選んだ状態にする（移ったあとで、選択が外れないように）
    if (base === "/mypage" && accountType === "student") {
      return pathname === "/mypage" || (pathname.startsWith("/student") && !pathname.startsWith("/student/quiz"));
    }

    // 勉強は、過去問を解く画面（/student/quiz/...）も含む
    if (base === "/study") return pathname.startsWith("/study") || pathname.startsWith("/student/quiz");

    if (base === "/home" || base === "/posts/create") {
      return pathname === base;
    }

    return pathname === base || pathname.startsWith(`${base}/`);
  }

  // いま開いているメニューの位置（なければ -1）。ここに、背景の丸がスライドして移動する
  const activeIndex = previewOnly
    ? menus.findIndex((m) => m.href === "/home")
    : menus.findIndex((m) => isActive(m.href));

  return (
    <nav
      aria-label="メインメニュー"
      hidden={typing}
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[9999] px-3 print:hidden"
      style={{ paddingBottom: "max(0.5rem, calc(env(safe-area-inset-bottom) - 0.4rem))" }}
    >
      <div
        className="pointer-events-auto relative mx-auto grid max-w-xl items-center rounded-full border border-white/70 bg-white/65 px-1 py-1 shadow-[0_8px_24px_rgba(0,0,0,0.14)] backdrop-blur-xl backdrop-saturate-150"
        style={{ gridTemplateColumns: `repeat(${menus.length}, minmax(0, 1fr))` }}
      >
        {/* いまの場所を示す背景（メニューを切り替えると、なめらかに横へ動く） */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-1 left-1 top-1 rounded-full bg-black/[0.07] transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none"
          style={{
            width: `calc((100% - 0.5rem) / ${menus.length})`,
            transform: `translateX(${Math.max(activeIndex, 0) * 100}%)`,
            opacity: activeIndex >= 0 ? 1 : 0,
          }}
        />
        {menus.map((menu, index) => {
          const active = index === activeIndex;

          const badgeCount =
            menu.href === "/notifications"
              ? unreadNotifCount
              : menu.href === "/messages"
              ? unreadMessageCount
              : 0;

          const inner = (
            <span
              className={`flex flex-col items-center gap-0.5 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none ${
                active ? "scale-110" : ""
              }`}
            >
              <span
                aria-hidden="true"
                className="relative flex h-7 w-7 items-center justify-center leading-none"
              >
                <NavIcon href={menu.href} />
                {badgeCount > 0 && (
                  <span className="absolute -right-1.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-semibold text-white">
                    {badgeCount > 9 ? "9+" : badgeCount}
                  </span>
                )}
              </span>
              <span className="whitespace-nowrap text-[11px]">{menu.label}</span>
            </span>
          );

          // 見るだけのとき: 同じ見た目で、押せないメニュー（ホームだけ、いまの画面として濃く出す）
          if (previewOnly) {
            return (
              <span
                key={menu.href}
                aria-disabled="true"
                title="無料登録すると使えます"
                className={`relative z-10 flex cursor-not-allowed select-none justify-center rounded-full px-2 py-1 ${
                  active ? "font-semibold text-black" : "text-gray-400"
                }`}
              >
                {inner}
              </span>
            );
          }

          return (
            <Link
              key={menu.href}
              href={menu.href}
              aria-current={active ? "page" : undefined}
              aria-label={
                badgeCount > 0
                  ? `${menu.label}（未読${badgeCount}件）`
                  : undefined
              }
              className={`relative z-10 flex justify-center rounded-full px-2 py-1 transition-colors active:opacity-70 ${
                active ? "font-semibold text-black" : "text-gray-400"
              }`}
            >
              {inner}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
