"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

// 名前が未入力のPTプロフィールは公開のPT一覧に出ないため、
// ホームで気づけるように案内する（新規登録の導線を通らない既存ユーザー向け）
export default function ProfileNameNudge({ userId }: { userId: string }) {
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    if (!userId) return;

    supabase
      .from("pt_profiles")
      .select("full_name")
      .eq("user_id", userId)
      .maybeSingle()
      .then(({ data }) => {
        setMissing(!data?.full_name?.trim());
      });
  }, [userId]);

  if (!missing) return null;

  return (
    <Link
      href="/mypage/edit?welcome=1"
      className="mx-5 mt-4 block rounded-2xl bg-emerald-50 p-4 transition hover:bg-emerald-100"
    >
      <p className="text-sm font-semibold text-emerald-800">
        プロフィールに名前を入力しましょう
      </p>
      <p className="mt-1 text-xs leading-5 text-emerald-700">
        名前が未入力だと、他の理学療法士の検索結果に表示されません。名前・勤務先・専門分野だけでOKです →
      </p>
    </Link>
  );
}
