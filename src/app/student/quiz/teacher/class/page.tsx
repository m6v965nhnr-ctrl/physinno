"use client";

import { useEffect, useState } from "react";
import TeacherPage from "@/components/teacher/TeacherPage";
import ClassDashboardView from "@/components/teacher/ClassDashboardView";

// クラスの状況（直接のリンク用）。普段は「分析」から開く
export default function QuizClassDashboardPage() {
  const [id, setId] = useState<string | null>(null);
  useEffect(() => {
    setId(new URLSearchParams(window.location.search).get("id") ?? "");
  }, []);

  return (
    <TeacherPage title="クラスの状況">
      {id === null ? null : id ? <ClassDashboardView classId={id} /> : <p className="rounded-2xl bg-white p-6 text-center text-sm text-gray-600 shadow-sm">クラスが指定されていません。</p>}
    </TeacherPage>
  );
}
