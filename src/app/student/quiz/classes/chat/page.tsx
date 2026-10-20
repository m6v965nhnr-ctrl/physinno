"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ClassChat from "@/components/ClassChat";
import { LoadingScreen } from "@/components/states";
import { useMyAccount } from "@/lib/useMyAccount";
import { ClassRoom, listClassRooms } from "@/lib/quizClass";

// クラスのチャット（クラスの全員が読める）
export default function ClassChatPage() {
  const { loading } = useMyAccount(["student", "pt", "teacher"]);
  const [id, setId] = useState<string | null>(null);
  const [room, setRoom] = useState<ClassRoom | null>(null);

  useEffect(() => {
    if (loading) return;
    const cid = new URLSearchParams(window.location.search).get("id") ?? "";
    setId(cid);
    listClassRooms().then((rs) => setRoom(rs.find((r) => r.id === cid) ?? null));
  }, [loading]);

  if (loading || id === null) return <LoadingScreen />;

  return (
    <main className="min-h-screen bg-[#fafafa] pb-28">
      <header className="border-b border-gray-100 bg-white px-6 py-5">
        <div className="mx-auto max-w-2xl">
          <Link href="/messages" className="text-sm text-gray-400">← メッセージ</Link>
          <h1 className="mt-1 text-xl font-semibold tracking-tight">{room?.name ?? "クラスのチャット"}</h1>
          <p className="mt-1 text-xs leading-5 text-gray-500">クラスの先生と学生が見られます。先生への質問と、先生の回答も、ここに出ます。</p>
        </div>
      </header>
      <div className="mx-auto max-w-2xl px-6 py-5">{id ? <ClassChat classId={id} /> : <p className="text-sm text-gray-500">クラスが指定されていません。</p>}</div>
    </main>
  );
}
