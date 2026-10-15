"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// 一問一答の入口は、下のメニューの「勉強」（/study）に1つにまとめた。古いリンクは、そちらへ
export default function QuizHomeRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/study");
  }, [router]);
  return null;
}
