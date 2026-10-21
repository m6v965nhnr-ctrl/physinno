"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AccountType } from "@/lib/account";
import { notify } from "@/lib/notify";
import { useMyAccount } from "@/lib/useMyAccount";
import { TeacherStatus, getTeacherStatus, requestTeacher } from "@/lib/quizClass";
import { AccessState, getAccessState } from "@/lib/school";
import { LoadingScreen } from "@/components/states";

// 先生の画面（ホーム・テスト・分析・クラス・アカウント）の、共通の枠。
// 先生として承認されるまでは、申請の案内だけを出す（gated=false の画面を除く）

function Gate({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<TeacherStatus | null>(null);
  const [school, setSchool] = useState("");
  const [note, setNote] = useState("");
  const [tried, setTried] = useState(false);
  const [busy, setBusy] = useState(false);

  const [access, setAccess] = useState<AccessState | null>(null);
  const load = useCallback(async () => {
    setStatus(await getTeacherStatus());
    setAccess(await getAccessState());
  }, []);
  useEffect(() => {
    load();
  }, [load]);

  async function handleRequest() {
    if (busy) return;
    if (!school.trim()) {
      setTried(true);
      return;
    }
    setBusy(true);
    const ok = await requestTeacher(school.trim(), note.trim());
    setBusy(false);
    if (!ok) {
      notify("申請に失敗しました。もう一度お試しください");
      return;
    }
    notify("申請しました。運営が確認します");
    load();
  }

  if (status === null) return <p className="py-10 text-center text-sm text-gray-400">読み込み中…</p>;
  if (status === "approved") {
    // 学校コードが必要な設定のとき、学校に所属していない先生は、先に学校コード
    if (access?.required && !access.has_access) {
      return (
        <section className="rounded-2xl bg-white p-4 text-sm leading-6 text-gray-700 shadow-sm">
          <p className="font-semibold">学校コードを入れてください</p>
          <p className="mt-1 text-xs leading-5 text-gray-500">クラスとテストは、学校に所属した先生が使えます。学校のコードは、学校の担当の方（または運営）から伝えられます。</p>
          <Link href="/school" className="mt-3 inline-block rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white">
            学校コードを入れる
          </Link>
        </section>
      );
    }
    return <>{children}</>;
  }

  if (status === "suspended") {
    return (
      <section className="rounded-2xl bg-white p-4 text-sm leading-6 text-gray-700 shadow-sm">
        <p className="font-semibold">先生の機能は、いま停止されています</p>
        <p className="mt-1 text-xs leading-5 text-gray-500">運営が、このアカウントの先生の機能を停止しています。心当たりがない場合や、ご不明な点は、意見箱からお知らせください。</p>
        <Link href="/feedback" className="mt-3 inline-block rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-gray-800">
          意見箱へ
        </Link>
      </section>
    );
  }

  if (status === "pending") {
    return (
      <section className="rounded-2xl bg-white p-4 text-sm leading-6 text-gray-700 shadow-sm">
        <p className="font-semibold">先生としての確認中です</p>
        <p className="mt-1 text-xs leading-5 text-gray-500">申請を受け付けました。運営が確認しています。承認されると、クラスとテストを作れるようになります（この画面を開き直すと、反映されます）。</p>
      </section>
    );
  }

  return (
    <section className="space-y-3 rounded-2xl bg-white p-4 shadow-sm">
      <p className="text-sm font-semibold">先生として使うには、申請が必要です</p>
      <p className="text-xs leading-5 text-gray-500">
        養成校などで教えている方が対象です。運営が確認して承認すると、クラスとテストを作れるようになります。
        {status === "rejected" && " （前回の申請は承認されませんでした。内容を確かめて、もう一度申請できます）"}
      </p>
      <input value={school} onChange={(e) => setSchool(e.target.value)} maxLength={100} placeholder="所属（学校名など）" aria-label="所属" className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm" />
      <textarea value={note} onChange={(e) => setNote(e.target.value)} maxLength={500} rows={3} placeholder="担当している科目や、確認に役立つことなど（任意）" aria-label="補足" className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm" />
      <button onClick={handleRequest} disabled={busy} className="w-full rounded-full bg-black py-2.5 text-sm font-medium text-white disabled:opacity-40">
        先生として申請する
      </button>
      {tried && !school.trim() && (
        <p className="text-xs text-red-600" role="status">
          申請できません：所属（学校名など）を入れてください
        </p>
      )}
    </section>
  );
}

export default function TeacherPage({
  title,
  description,
  gated = true,
  children,
}: {
  title: string;
  description?: string;
  gated?: boolean;
  children: React.ReactNode | ((accountType: AccountType) => React.ReactNode);
}) {
  const { loading, accountType } = useMyAccount(["pt", "teacher"], "/study");
  if (loading || !accountType) return <LoadingScreen />;

  const body = typeof children === "function" ? children(accountType) : children;

  return (
    <main className="min-h-screen bg-[#fafafa] pb-28">
      <header className="border-b border-gray-100 bg-white px-6 py-2.5">
        <div className="mx-auto max-w-2xl">
          {accountType !== "teacher" && (
            <Link href="/study" className="text-sm text-gray-400">
              ← 勉強にもどる
            </Link>
          )}
          <h1 className="text-xl font-semibold leading-tight tracking-tight">{title}</h1>
          {description && <p className="mt-1 text-xs leading-5 text-gray-500">{description}</p>}
        </div>
      </header>
      <div className="mx-auto max-w-2xl space-y-3 px-6 py-4">{gated ? <Gate>{body}</Gate> : body}</div>
    </main>
  );
}
