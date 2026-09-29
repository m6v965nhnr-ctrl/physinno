"use client";

import Link from "next/link";
import type { PtProfile } from "@/lib/types";

type ChecklistItem = {
  label: string;
  filled: boolean;
};

// プロフィールの主要項目がどれだけ埋まっているかを表示し、
// 未入力の項目を具体的に示して編集画面への入力を促す（LinkedInの「プロフィールの充実度」を参考）
export default function ProfileCompletenessCard({
  profile,
}: {
  profile: Partial<PtProfile> | null;
}) {
  const items: ChecklistItem[] = [
    { label: "プロフィール写真", filled: !!profile?.profile_image },
    { label: "勤務先", filled: !!profile?.workplace },
    { label: "専門分野", filled: !!profile?.specialty },
    { label: "経験年数", filled: profile?.experience_years != null },
    { label: "資格", filled: !!profile?.qualification },
    { label: "自己紹介", filled: !!profile?.biography },
    { label: "自分の強み", filled: !!profile?.strengths },
  ];

  const filledCount = items.filter((i) => i.filled).length;
  const percent = Math.round((filledCount / items.length) * 100);
  const missing = items.filter((i) => !i.filled).map((i) => i.label);

  if (percent === 100) return null;

  return (
    <Link
      href="/mypage/edit"
      className="mt-6 block rounded-2xl border border-gray-100 bg-white p-5 transition hover:border-gray-200"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-gray-900">
          プロフィール充実度
        </p>
        <p className="text-sm font-semibold text-relight-blue">{percent}%</p>
      </div>

      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-relight-gradient transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>

      {missing.length > 0 && (
        <p className="mt-2 text-xs text-gray-500">
          未入力: {missing.join("・")}
        </p>
      )}
    </Link>
  );
}
