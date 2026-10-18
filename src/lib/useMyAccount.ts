"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { AccountType, TEACHER_HOME, getMyAccountType } from "@/lib/account";

// ログイン中のユーザーとアカウント種類を取得する。
// allowed に含まれない種類の人(または未ログインの人)は、redirectTo(未指定なら /home)へ案内する
export function useMyAccount(allowed: AccountType[], redirectTo = "/home") {
  const router = useRouter();
  const [state, setState] = useState<{
    loading: boolean;
    userId: string;
    accountType: AccountType | null;
  }>({ loading: true, userId: "", accountType: null });

  const allowedKey = allowed.join(",");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      // 画面の振り分け用なので、端末の保存済みのログイン情報を読む（毎回、認証サーバーへ問い合わせない）。データは、DBのRLSで守られている
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const user = session?.user ?? null;

      if (cancelled) return;

      if (!user) {
        router.replace("/login");
        return;
      }

      const accountType = await getMyAccountType(user.id);

      if (cancelled) return;

      if (!accountType || !allowedKey.split(",").includes(accountType)) {
        router.replace(accountType === "general" ? "/pts" : accountType === "teacher" ? TEACHER_HOME : redirectTo);
        return;
      }

      setState({ loading: false, userId: user.id, accountType });
    })();

    return () => {
      cancelled = true;
    };
  }, [allowedKey, redirectTo, router]);

  return state;
}
