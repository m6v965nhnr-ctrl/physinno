"use client";

import { useState } from "react";
import { daysUntil, estimatedExamDate } from "@/lib/student";

// 国試までの日数。日程は毎年、厚生労働省が公表する（2月23日ごろは目安）。表示のたびに計算するので、日がずれない
export default function ExamCountdown() {
  const [now] = useState(() => new Date());
  let exam = estimatedExamDate(now.getFullYear());
  if (daysUntil(exam, now) < 0) exam = estimatedExamDate(now.getFullYear() + 1);

  return (
    <div className="mt-6 rounded-2xl border border-teal-200 bg-white p-4">
      <p className="text-xs text-gray-500">{exam.getFullYear()}年2月の国家試験まで（目安）</p>
      <p className="mt-1 text-2xl font-bold text-gray-900">
        あと <span suppressHydrationWarning>{daysUntil(exam, now)}</span> 日
      </p>
      <p className="mt-1 text-[11px] leading-5 text-gray-500">
        2月23日ごろを目安に、自動で計算しています。実際の日程は、
        <a href="https://www.mhlw.go.jp/kouseiroudoushou/shikaku_shiken/rigakuryouhoushi" target="_blank" rel="noopener noreferrer" className="underline">厚生労働省の発表</a>
        で確認してください。
      </p>
    </div>
  );
}
