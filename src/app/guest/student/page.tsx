"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { setGuestRole } from "@/lib/guestRole";
import StudentHomeView from "@/components/student/StudentHomeView";
import type { StudentProfile } from "@/lib/student";

// 学生として、ログインなしで見るとき: 本物の学生ホームと同じ画面を、見るだけで出す（ボタンは押せない）
export default function GuestStudentPage() {
  const [profile, setProfile] = useState<StudentProfile | null>(null);

  useEffect(() => {
    setGuestRole("student");
    // 見本: いちばん近い3月に卒業する学生（国試の日数が出るように）
    const now = new Date();
    const year = now.getMonth() >= 3 ? now.getFullYear() + 1 : now.getFullYear();
    setProfile({ user_id: "guest", school_name: null, graduation_year: year, national_exam_date: null, graduated_at: null });
  }, []);

  if (!profile) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-sm text-gray-400">読み込み中…</p>
      </main>
    );
  }

  return (
    <StudentHomeView
      name="ゲスト"
      profile={profile}
      items={[]}
      logs={[]}
      preview
      banner={
        <div className="flex flex-col items-start gap-3 rounded-2xl bg-relight-gradient px-5 py-4 text-gray-900 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-6">
            これは、学生ホームの見本です（見るだけ。ボタンは押せません）。無料登録すると、そのまま使えます。
          </p>
          <div className="flex shrink-0 gap-2">
            <Link href="/register?type=student" className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-gray-900">
              無料で登録
            </Link>
            <Link href="/login" className="rounded-full border border-gray-900/40 px-4 py-2 text-xs font-semibold text-gray-900">
              ログイン
            </Link>
            <Link href="/guest" className="px-1 py-2 text-xs text-gray-900 underline">
              立場を切り替える
            </Link>
          </div>
        </div>
      }
    />
  );
}
