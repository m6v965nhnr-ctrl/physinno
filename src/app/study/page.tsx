"use client";

import { useMyAccount } from "@/lib/useMyAccount";
import StudyHub from "@/components/student/StudyHub";
import { LoadingScreen } from "@/components/states";

// 勉強（一問一答）。マイページとは、別の機能として、下のメニューから開く
export default function StudyPage() {
  const { loading, accountType } = useMyAccount(["student", "pt"]);
  if (loading) return <LoadingScreen />;

  return (
    <main className="min-h-dvh bg-[#fafafa] pb-28">
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-2xl px-5 py-2">
          <h1 className="text-lg font-semibold text-gray-900">勉強</h1>
        </div>
      </header>
      <div className="mx-auto max-w-2xl px-5 py-2">
        <StudyHub isStudent={accountType === "student"} />
      </div>
    </main>
  );
}
