"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  getMyAccountType,
  getMyAccountTypeChecked,
  isPtOnlyPath,
  isTeacherPath,
  TEACHER_HOME,
  isPublicColumnPath,
  isPublicHospitalPath,
  isPublicPostPath,
  isPublicKokushiPath,
  isPublicSchoolPath,
  isPublicPaperSitePath,
  isPublicGuestPath,
  isPublicPtPath,
  peekAccountType,
  clearAccountTypeCache,
} from "@/lib/account";
import { isAdminUser } from "@/lib/admin";
import { isStandaloneApp } from "@/lib/install";
import { hasName, isAllowedBeforeOnboarding, isOnboarded, markOnboarded } from "@/lib/onboarding";

const publicPaths = ["/", "/login", "/register", "/forgot-password", "/reset-password", "/terms", "/privacy", "/evidence-levels", "/guest", "/guest/student", "/feedback", "/start", "/teachers", "/for-pt", "/for-students", "/for-general"];

// アカウントの種類が未設定の人は、これらを除く、どの画面にも進めない（/setup へ送る）
const SETUP_EXEMPT_PATHS = ["/", "/login", "/register", "/forgot-password", "/reset-password", "/terms", "/privacy", "/feedback", "/setup", "/start"];

// 種類が設定済みか。設定済みと分かった人は、このタブでは再確認しない（毎回の画面移動で問い合わせないため）
async function hasAccountType(userId: string): Promise<boolean> {
  const key = `relight-has-type-${userId}`;
  try {
    if (sessionStorage.getItem(key)) return true;
  } catch {
    // 保存できない環境では、毎回確認する
  }
  const result = await getMyAccountTypeChecked(userId);
  // 通信に失敗したときは、止めない（設定済みの人を、設定の画面へ送ってしまわないため）
  if (!result.ok) return true;
  if (result.type) {
    try {
      sessionStorage.setItem(key, "1");
    } catch {
      // 何もしない
    }
  }
  return !!result.type;
}

// ホーム画面のアプリとして開いたときは、ログインなしで見られるゲスト用の画面は出さない（これらの画面だけ、ログインなしでも開ける）
const STANDALONE_OPEN_PATHS = ["/login", "/register", "/forgot-password", "/reset-password", "/terms", "/privacy", "/feedback"];

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function checkAuth() {
      // ホーム画面のアプリで、ログインしていないときは、どの画面から始まっても、ログイン画面へ
      if (isStandaloneApp() && !STANDALONE_OPEN_PATHS.includes(pathname)) {
        const {
          data: { session: s0 },
        } = await supabase.auth.getSession();
        if (cancelled) return;
        if (!s0) {
          router.replace("/login");
          return;
        }
      }

      // 種類が未設定の人は、設定の画面から先へ進めない（運営のアカウントは対象外）
      if (!SETUP_EXEMPT_PATHS.includes(pathname)) {
        const {
          data: { session: early },
        } = await supabase.auth.getSession();
        if (cancelled) return;
        if (early?.user && !(await hasAccountType(early.user.id)) && !(await isAdminUser(early.user.id))) {
          if (cancelled) return;
          router.replace("/setup");
          return;
        }

        // PT・学生は、名前が入っていなければ、名前を入れる画面から先へ進めない（初回登録が済んでいる人も、公開のページも対象）
        if (
          early?.user &&
          !isAllowedBeforeOnboarding(pathname) &&
          !pathname.startsWith("/student/settings") &&
          !(await hasName(early.user.id)) &&
          !(await isAdminUser(early.user.id))
        ) {
          const type = await getMyAccountType(early.user.id);
          if (cancelled) return;
          if (type === "pt" || type === "student") {
            router.replace(type === "pt" ? "/mypage/edit?welcome=1" : "/student/settings?welcome=1");
            return;
          }
        }
      }

      // PT検索・プロフィール・投稿個別ページ・コラム・病院ページはログインなしで閲覧できる（コメント等の操作は各ページ側でログインを促す）
      if (
        publicPaths.includes(pathname) ||
        isPublicPtPath(pathname) ||
        isPublicPostPath(pathname) ||
        isPublicColumnPath(pathname) ||
        isPublicHospitalPath(pathname) ||
        isPublicKokushiPath(pathname) ||
        isPublicSchoolPath(pathname) ||
        isPublicPaperSitePath(pathname)
      ) {
        setChecking(false);
        return;
      }

      // PT向けページでは種類の確認が終わるまで中身を出さない
      // （種類をすでに確認している人は、待たずに進む）
      if (isPtOnlyPath(pathname)) {
        const { data: { session: s1 } } = await supabase.auth.getSession();
        if (!(s1?.user && peekAccountType(s1.user.id))) setChecking(true);
      }

      // getUser()は毎回サーバーに検証リクエストを送るため、トークンの
      // 自動リフレッシュ処理と競合して稀に「実際はログイン中なのに
      // 一瞬だけ未ログイン扱いされる」ことがある。getSession()は
      // クライアント初期化時のリフレッシュ結果を信頼して読むため、
      // このルーティング用の判定にはこちらが安全（実データへのアクセスは
      // 別途サーバー側のRLSで保護される）
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const user = session?.user ?? null;

      if (cancelled) return;

      if (!user) {
        // ゲスト閲覧ができるページは、ログインなしでも開ける（ログイン中の人は、これまでどおり下の確認へ進む）
        if (isPublicGuestPath(pathname)) {
          setChecking(false);
          return;
        }
        // ホーム画面のアプリとして開いたときは、サイトの紹介ではなく、ログイン画面へ
        router.replace(isStandaloneApp() ? "/login" : "/");
        return;
      }

      // 運営のアカウントは、PTの初回プロフィール入力などを求めない（運営画面に、そのまま入れる）
      if (await isAdminUser(user.id)) {
        if (cancelled) return;
        setChecking(false);
        return;
      }

      let accountType: Awaited<ReturnType<typeof getMyAccountType>> | undefined;

      // 一般の方は PT向けのページ（ホーム・投稿など）を開けない
      if (isPtOnlyPath(pathname)) {
        accountType = await getMyAccountType(user.id);

        if (cancelled) return;

        if (accountType === "general") {
          router.replace("/pts");
          return;
        }

        // 先生のアカウントは、先生の画面だけ（PTの画面へ入ってしまったら、先生の画面へ戻す）
        if (accountType === "teacher" && !isTeacherPath(pathname)) {
          router.replace(TEACHER_HOME);
          return;
        }
      }

      // PTは、初回プロフィール登録（必須項目の入力）が済むまで入力画面から先へ進めない
      if (!isAllowedBeforeOnboarding(pathname) && !(await isOnboarded(user.id))) {
        if (accountType === undefined) {
          accountType = await getMyAccountType(user.id);
        }

        if (cancelled) return;

        if (accountType === "pt") {
          router.replace("/mypage/edit?welcome=1");
          return;
        }

        // 確認が済んだ。このタブでは再確認しない
        markOnboarded(user.id);
      }

      setChecking(false);
    }

    checkAuth();

    // セッションが実際に失効した場合（本人によるログアウト等）はその場で反映する
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT" || event === "SIGNED_IN") clearAccountTypeCache();
      if (event === "SIGNED_OUT") {
        // ログアウトした直後は、Face IDのログインを、自動で始めない
        try {
          sessionStorage.setItem("relight-logged-out", "1");
        } catch {
          // 何もしない
        }
      }
      if (event === "SIGNED_OUT" && !publicPaths.includes(pathname)) {
        router.replace(isStandaloneApp() ? "/login" : "/");
      }
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [pathname, router]);

  if (
    checking &&
    !publicPaths.includes(pathname) &&
    !isPublicPtPath(pathname) &&
    !isPublicPostPath(pathname) &&
    !isPublicColumnPath(pathname) &&
    !isPublicHospitalPath(pathname) &&
    !isPublicKokushiPath(pathname) &&
    !isPublicSchoolPath(pathname) &&
    !isPublicPaperSitePath(pathname)
  ) {
    return (
      <main className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <p className="text-sm text-gray-400">
          読み込み中…
        </p>
      </main>
    );
  }

  return <>{children}</>;
}
