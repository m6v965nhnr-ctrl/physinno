"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  getMyAccountType,
  isPtOnlyPath,
  isPublicColumnPath,
  isPublicHospitalPath,
  isPublicPostPath,
  isPublicPtPath,
} from "@/lib/account";

const publicPaths = ["/", "/login", "/register", "/terms", "/privacy"];

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
      // PT検索・プロフィール・投稿個別ページ・コラム・病院ページはログインなしで閲覧できる（コメント等の操作は各ページ側でログインを促す）
      if (
        publicPaths.includes(pathname) ||
        isPublicPtPath(pathname) ||
        isPublicPostPath(pathname) ||
        isPublicColumnPath(pathname) ||
        isPublicHospitalPath(pathname)
      ) {
        setChecking(false);
        return;
      }

      // PT向けページでは種類の確認が終わるまで中身を出さない
      if (isPtOnlyPath(pathname)) {
        setChecking(true);
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
        router.replace("/");
        return;
      }

      // 一般の方は PT向けのページ（ホーム・投稿など）を開けない
      if (isPtOnlyPath(pathname)) {
        const accountType = await getMyAccountType(user.id);

        if (cancelled) return;

        if (accountType === "general") {
          router.replace("/pts");
          return;
        }
      }

      setChecking(false);
    }

    checkAuth();

    // セッションが実際に失効した場合（本人によるログアウト等）はその場で反映する
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT" && !publicPaths.includes(pathname)) {
        router.replace("/");
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
    !isPublicHospitalPath(pathname)
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
