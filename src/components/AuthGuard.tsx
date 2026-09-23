"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { getMyAccountType, isPtOnlyPath } from "@/lib/account";

const publicPaths = ["/", "/login", "/register"];

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
      if (publicPaths.includes(pathname)) {
        setChecking(false);
        return;
      }

      // PT向けページでは種類の確認が終わるまで中身を出さない
      if (isPtOnlyPath(pathname)) {
        setChecking(true);
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (cancelled) return;

      if (!user) {
        router.replace("/");
        return;
      }

      // 一般ユーザーは PT向けのページ（ホーム・投稿など）を開けない
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

    return () => {
      cancelled = true;
    };
  }, [pathname, router]);

  if (checking && !publicPaths.includes(pathname)) {
    return (
      <main className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <p className="text-sm text-gray-400">
          読み込み中...
        </p>
      </main>
    );
  }

  return <>{children}</>;
}
