"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useMyAccount } from "@/lib/useMyAccount";
import { ScoutRow, fmtDate } from "@/lib/recruit";
import { EmptyState, ErrorState, LoadingScreen } from "@/components/states";

// スカウトの一覧。PTは届いたスカウト、組織は送ったスカウト（同じ画面）
export default function ScoutsPage() {
  const { loading } = useMyAccount(["pt", "general", "teacher", "org"], "/pts");
  const [rows, setRows] = useState<ScoutRow[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (loading) return;
    supabase.rpc("list_my_scouts").then(({ data, error: e }) => (e ? setError(true) : setRows((data ?? []) as ScoutRow[])));
  }, [loading]);

  if (loading) return <LoadingScreen />;
  return (
    <main className="min-h-screen bg-[#fafafa] px-5 py-8 pb-28">
      <div className="mx-auto max-w-2xl space-y-4">
        <Link href="/mypage" className="text-sm text-gray-400">← マイページ</Link>
        <h1 className="text-2xl font-semibold">スカウト</h1>
        <p className="text-xs leading-5 text-gray-500">組織から届いたスカウトと、送ったスカウトです。内容は、送った組織と、受け取った人だけが読めます。受け付けの設定は、プロフィールの編集にあります。</p>
        {error ? <ErrorState onRetry={() => location.reload()} /> : rows === null ? <p className="text-sm text-gray-400">読み込み中…</p> : rows.length === 0 ? (
          <EmptyState title="まだスカウトはありません" description="プロフィールの編集で「スカウトを受け付ける」をオンにすると、承認された組織から届くことがあります" />
        ) : (
          <ul className="space-y-2">
            {rows.map((r) => (
              <li key={r.id}>
                <Link href={`/scouts/${r.id}`} className="block rounded-2xl bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold">{r.role === "pt" ? r.org_name : `${r.pt_name} さん`}</p>
                    <span className="flex shrink-0 items-center gap-1 text-[11px] text-gray-500">{r.status === "declined" && "辞退済み"}{r.unread && <span className="rounded-full bg-red-500 px-2 py-0.5 text-white">未読</span>}</span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-gray-400">{r.role === "pt" ? "届いたスカウト" : "送ったスカウト"}{r.job_title ? `・求人：${r.job_title}` : ""}・{fmtDate(r.last_message_at)}</p>
                  <p className="mt-1 line-clamp-2 text-xs text-gray-600">{r.last_body}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
