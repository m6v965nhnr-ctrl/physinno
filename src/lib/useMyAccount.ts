"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { AccountType, getMyAccountType } from "@/lib/account";

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
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (cancelled) return;

      if (!user) {
        router.replace("/login");
        return;
      }

      const accountType = await getMyAccountType(user.id);

      if (cancelled) return;

      if (!accountType || !allowedKey.split(",").includes(accountType)) {
        router.replace(accountType === "general" ? "/pts" : redirectTo);
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
