"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import TeacherPage from "@/components/teacher/TeacherPage";
import { supabase } from "@/lib/supabase";
import { TeacherStatus, getTeacherStatus } from "@/lib/quizClass";

const STATUS_LABEL: Record<TeacherStatus, string> = {
  approved: "承認済み（クラスとテストを作れます）",
  suspended: "停止中（運営が、先生の機能を止めています）",
  pending: "確認中（運営が確認しています）",
  rejected: "承認されませんでした（もう一度申請できます）",
  none: "未申請",
};

// 先生用: アカウント（名前・状態・ログアウト・退会）
function AccountBody({ accountType }: { accountType: string }) {
  const [info, setInfo] = useState<{ name: string; email: string } | null>(null);
  const [status, setStatus] = useState<TeacherStatus | null>(null);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase.from("users").select("full_name").eq("id", user.id).maybeSingle();
      setInfo({ name: data?.full_name ?? "", email: user.email ?? "" });
    })();
    getTeacherStatus().then(setStatus);
  }, []);

  return (
    <>
      <section className="space-y-2 rounded-2xl bg-white p-4 text-sm shadow-sm">
        <p className="text-xs text-gray-400">お名前（学生に、先生の名前として表示されます）</p>
        <p className="font-semibold">{info ? info.name || "（未設定）" : "…"}</p>
        <p className="pt-1 text-xs text-gray-400">メールアドレス</p>
        <p>{info?.email ?? "…"}</p>
        <p className="pt-1 text-xs text-gray-400">先生としての状態</p>
        <p>{status ? STATUS_LABEL[status] : "…"}</p>
      </section>

      {accountType !== "teacher" && (
        <section className="rounded-2xl bg-white p-4 shadow-sm">
          <p className="text-xs leading-5 text-gray-500">このアカウントは、理学療法士のアカウントです。PTとしての画面は、こちらから。</p>
          <Link href="/home" className="mt-2 inline-block rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-gray-800">
            PTの画面へ
          </Link>
        </section>
      )}

      <section className="rounded-2xl bg-white p-4 shadow-sm">
        <ul className="divide-y divide-gray-100 text-sm">
          <li>
            <Link href="/feedback" className="block py-2.5">ご意見・ご要望（匿名）</Link>
          </li>
          <li>
            <Link href="/terms" className="block py-2.5">利用規約</Link>
          </li>
          <li>
            <Link href="/privacy" className="block py-2.5">プライバシーポリシー</Link>
          </li>
        </ul>
      </section>

      <section className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
        <button
          onClick={async () => {
            await supabase.auth.signOut();
            window.location.href = "/";
          }}
          className="rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-gray-800"
        >
          ログアウト
        </button>
        <Link href="/mypage/delete-account" className="text-xs text-gray-400 underline">
          退会する
        </Link>
      </section>
    </>
  );
}

export default function TeacherAccountPage() {
  return (
    <TeacherPage title="アカウント" gated={false}>
      {(type) => <AccountBody accountType={type} />}
    </TeacherPage>
  );
}
