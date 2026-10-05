"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AccountType, getMyAccountType } from "@/lib/account";
import { computeCountdown, getMyStudentProfile } from "@/lib/student";
import { listQuestions } from "@/lib/studentQa";

// ホームに出す、アカウントの種類ごとの案内
//  学生: 国試・卒業までの日数と、学生ホームへの入口
//  PT  : 回答を待っている学生の質問
export default function HomeAudienceCard({ userId }: { userId: string }) {
  const [accountType, setAccountType] = useState<AccountType | null>(null);
  const [examDays, setExamDays] = useState<number | null>(null);
  const [graduationDays, setGraduationDays] = useState<number | null>(null);
  const [waiting, setWaiting] = useState(0);

  useEffect(() => {
    if (!userId) return;

    (async () => {
      const type = await getMyAccountType(userId);
      setAccountType(type);

      if (type === "student") {
        const profile = await getMyStudentProfile(userId);
        if (profile) {
          const c = computeCountdown(profile);
          setExamDays(c.examDays);
          setGraduationDays(c.graduationDays);
        }
      }

      if (type === "pt") {
        const recent = await listQuestions(null, 0, 30);
        setWaiting(recent.filter((q) => q.answer_count === 0 && !q.is_mine).length);
      }
    })();
  }, [userId]);

  if (accountType === "student") {
    return (
      <Link
        href="/student"
        className="mx-5 mt-4 block rounded-2xl bg-gradient-to-r from-cyan-50 to-emerald-50 p-4 transition hover:from-cyan-100 hover:to-emerald-100"
      >
        <p className="text-sm font-semibold text-gray-900">学生ホーム（実習・就活・国試）</p>
        <p className="mt-1 text-xs leading-5 text-gray-600">
          {examDays !== null && examDays >= 0 ? `国試まであと${examDays}日` : "国試お疲れさまでした"}
          {graduationDays !== null && graduationDays >= 0 ? `・卒業まであと${graduationDays}日` : ""}
          　トラッカーや学習ログを開く →
        </p>
      </Link>
    );
  }

  if (accountType === "pt" && waiting > 0) {
    return (
      <Link
        href="/student/questions"
        className="mx-5 mt-4 block rounded-2xl bg-emerald-50 p-4 transition hover:bg-emerald-100"
      >
        <p className="text-sm font-semibold text-emerald-800">学生から{waiting}件の質問が回答を待っています</p>
        <p className="mt-1 text-xs leading-5 text-emerald-700">
          実習・国試・就活のことを、あなたの経験で答えてあげませんか →
        </p>
      </Link>
    );
  }

  return null;
}
