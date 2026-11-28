"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const SUB = "whitespace-nowrap rounded-full border border-gray-300 bg-white px-3 py-2 text-xs font-bold text-gray-800";

// ヘッダーの右側。登録前は「ログイン」、ログイン中は「マイページ」。「口コミを書く」は常に出す
export default function KuchikomiHeaderActions() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setLoggedIn(!!data.session));
    const { data } = supabase.auth.onAuthStateChange((_e, session) => setLoggedIn(!!session));
    return () => data.subscription.unsubscribe();
  }, []);

  return (
    <>
      <Link href={loggedIn ? "/kuchikomi/mypage" : "/kuchikomi/login"} className={SUB}>{loggedIn ? "マイページ" : "ログイン"}</Link>
      <Link href="/kuchikomi/write" className="whitespace-nowrap rounded-full bg-relight-gradient px-4 py-2 text-xs font-bold">口コミを書く</Link>
    </>
  );
}
