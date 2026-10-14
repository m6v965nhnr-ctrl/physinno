"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { isStandaloneApp } from "@/lib/install";

// ホーム画面のアプリとして開いたときは、サイトの紹介（トップ）ではなく、ホーム（ログイン済み）かログイン画面へ送る。
// iPhoneは、追加したときに開いていたページから起動することがあるため、トップから始まる場合に備える
export default function StandaloneRedirect() {
  const router = useRouter();

  useEffect(() => {
    if (!isStandaloneApp()) return;
    supabase.auth.getSession().then(({ data: { session } }) => {
      router.replace(session ? "/home" : "/login");
    });
  }, [router]);

  return null;
}
