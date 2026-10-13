"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { PtProfile } from "@/lib/types";
import { listQuestions } from "@/lib/studentQa";
import { getMyAccountType } from "@/lib/account";

type Todo = {
  key: string;
  title: string;
  hint: string;
  href: string;
  progress?: number;
};

// プロフィールの主要項目が、どれだけ埋まっているか
export function profileCompleteness(profile: Partial<PtProfile> | null) {
  const items = [
    { label: "プロフィール写真", filled: !!profile?.profile_image },
    { label: "勤務先", filled: !!profile?.workplace },
    { label: "専門分野", filled: !!profile?.specialty },
    { label: "経験年数", filled: profile?.experience_years != null },
    { label: "資格", filled: !!profile?.qualification },
    { label: "自己紹介", filled: !!profile?.biography },
    { label: "自分の強み", filled: !!profile?.strengths },
  ];
  const filled = items.filter((i) => i.filled).length;
  return {
    percent: Math.round((filled / items.length) * 100),
    missing: items.filter((i) => !i.filled).map((i) => i.label),
  };
}

// マイページの「今日やること」。プロフィール・学生からの質問・今日の10問を、1枚にまとめる
export default function TodayTodos({
  userId,
  profile,
}: {
  userId: string;
  profile: Partial<PtProfile> | null;
}) {
  const [unanswered, setUnanswered] = useState(0);

  useEffect(() => {
    if (!userId) return;
    (async () => {
      if ((await getMyAccountType(userId)) !== "pt") return;
      const rows = await listQuestions(null, 0, 20);
      setUnanswered(rows.filter((q) => !q.is_mine && q.answer_count === 0).length);
    })();
  }, [userId]);

  const { percent, missing } = profileCompleteness(profile);

  const todos: Todo[] = [];

  if (percent < 100) {
    todos.push({
      key: "profile",
      title: `プロフィールを仕上げる（${percent}%）`,
      hint: `未入力: ${missing.join("・")}`,
      href: "/mypage/edit",
      progress: percent,
    });
  }

  if (unanswered > 0) {
    todos.push({
      key: "questions",
      title: `学生からの質問に答える（${unanswered}${unanswered >= 20 ? "件以上" : "件"}）`,
      hint: "あなたの経験が、後輩の力になります",
      href: "/student/questions",
    });
  }

  todos.push({
    key: "quiz",
    title: "今日の10問で、力試し",
    hint: "国試の過去問を、1問ずつ。約3分",
    href: "/student/quiz/play?mode=unanswered&n=10&order=random",
  });

  return (
    <section aria-labelledby="today-todos-title" className="mt-6 rounded-2xl border border-gray-100 bg-white p-5">
      <h2 id="today-todos-title" className="text-sm font-semibold text-gray-900">
        今日やること
      </h2>
      <ul className="mt-3 divide-y divide-gray-100">
        {todos.map((t) => (
          <li key={t.key}>
            <Link href={t.href} className="flex items-center gap-3 py-3">
              <span
                aria-hidden="true"
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-gray-300"
              />
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-gray-900">{t.title}</span>
                <span className="mt-0.5 block text-xs leading-5 text-gray-600">{t.hint}</span>
                {t.progress !== undefined && (
                  <span className="mt-2 block h-1.5 w-full overflow-hidden rounded-full bg-gray-100" aria-hidden="true">
                    <span className="block h-full rounded-full bg-relight-gradient" style={{ width: `${t.progress}%` }} />
                  </span>
                )}
              </span>
              <span aria-hidden="true" className="text-gray-400">
                ›
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
