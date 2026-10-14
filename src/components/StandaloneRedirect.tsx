"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { isStandaloneApp } from "@/lib/install";
import { getMyAccountType, landingPathFor } from "@/lib/account";

// ホーム画面のアプリとして開いたときは、サイトの紹介（トップ）ではなく、最初の画面（PT・一般は検索、学生はマイページ）か、
// 未ログインならログイン画面へ送る。iPhoneは、追加したときに開いていたページから起動することがあるため、
// トップから始まる場合にも備える。always を付けると、ブラウザで開いたときも送る（/start 用）
export default function StandaloneRedirect({ always = false }: { always?: boolean }) {
  const router = useRouter();

  useEffect(() => {
    if (!always && !isStandaloneApp()) return;
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) {
        router.replace("/login");
        return;
      }
      router.replace(landingPathFor(await getMyAccountType(session.user.id)));
    });
  }, [router, always]);

  return null;
}
