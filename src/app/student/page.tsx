"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useMyAccount } from "@/lib/useMyAccount";
import StudentHomeView from "@/components/student/StudentHomeView";
import {
  StudentItem,
  StudentProfile,
  StudyLog,
  getMyStudentProfile,
  listStudentItems,
  listStudyLogs,
} from "@/lib/student";
import { LoadingScreen } from "@/components/states";

// 学生のホーム: 卒業・国試までの日数、直近の予定、今週の学習、各機能への入口
export default function StudentHomePage() {
  const router = useRouter();
  const { loading, userId } = useMyAccount(["student"]);

  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [items, setItems] = useState<StudentItem[]>([]);
  const [logs, setLogs] = useState<StudyLog[]>([]);
  const [name, setName] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    if (!userId) return;

    (async () => {
      const [p, i, l, { data: pt }] = await Promise.all([
        getMyStudentProfile(userId),
        listStudentItems(userId),
        listStudyLogs(userId, 120),
        supabase.from("pt_profiles").select("full_name").eq("user_id", userId).maybeSingle(),
      ]);

      setProfile(p);
      setItems(i);
      setLogs(l);
      setName(pt?.full_name?.trim() || null);
    })();
  }, [userId]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  if (loading || name === undefined || !profile) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <StudentHomeView name={name} profile={profile} items={items} logs={logs} onLogout={handleLogout} />
  );
}
