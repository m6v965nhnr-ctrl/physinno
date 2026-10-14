"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { getStreak } from "@/lib/quiz";

// 学習の連続日数の小さなバッジ。連続が1日以上のときだけ出す（ゲスト・未開始のときは何も出さない）
export default function StreakBadge({ className }: { className?: string }) {
  const [s, setS] = useState<{ streak: number; doneToday: boolean } | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session) setS(await getStreak());
    });
  }, []);

  if (!s || s.streak < 1) return null;
  return (
    <span
      className={`inline-block rounded-full px-3 py-0.5 text-[11px] font-bold ${className ?? ""}`}
      aria-label={s.doneToday ? `${s.streak}日連続で学習中` : `${s.streak}日連続。今日も解くと続きます`}
    >
      <span aria-hidden="true">🔥 {s.streak}日連続{s.doneToday ? "" : "・今日も解こう"}</span>
    </span>
  );
}
