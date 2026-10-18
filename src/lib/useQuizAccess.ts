"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AccessState, getAccessState } from "@/lib/school";

// 一問一答の画面で使う。学校コードが必要な設定のとき、所属していない人は、学校コードの画面へ案内する
export function useRequireQuizAccess(redirect = true) {
  const router = useRouter();
  const [state, setState] = useState<AccessState | null>(null);
  useEffect(() => {
    let cancelled = false;
    getAccessState().then((s) => {
      if (cancelled) return;
      setState(s);
      if (redirect && s && s.required && !s.has_access) router.replace("/school");
    });
    return () => {
      cancelled = true;
    };
  }, [redirect, router]);
  return state;
}
