"use client";

import { use, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { notify } from "@/lib/notify";
import { askConfirm } from "@/lib/confirm";
import { useMyAccount } from "@/lib/useMyAccount";
import { SCOUT_ERROR, ScoutMessage, ScoutRow, rpcResult } from "@/lib/recruit";
import ReportButton from "@/components/ReportButton";
import { LoadingScreen } from "@/components/states";

export default function ScoutThreadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { loading, userId } = useMyAccount(["pt", "general", "teacher", "org"], "/pts");
  const [row, setRow] = useState<ScoutRow | null | undefined>(undefined);
  const [msgs, setMsgs] = useState<ScoutMessage[]>([]);
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);
  const marked = useRef(false);

  const load = useCallback(async () => {
    const [{ data: list }, { data: m }] = await Promise.all([
      supabase.rpc("list_my_scouts"),
      supabase.from("scout_messages").select("id, sender_id, body, created_at").eq("scout_id", id).order("created_at"),
    ]);
    setRow(((list ?? []) as ScoutRow[]).find((x) => x.id === id) ?? null);
    setMsgs((m ?? []) as ScoutMessage[]);
    if (!marked.current) { marked.current = true; supabase.rpc("scout_mark_read", { p_scout: id }); }
  }, [id]);
  useEffect(() => {
    if (!loading) load();
  }, [loading, load]);

  if (loading || row === undefined) return <LoadingScreen />;
  if (!row) return <main className="p-8 text-sm">このスカウトは、見つかりません。<Link href="/scouts" className="underline">一覧へ</Link></main>;

  async function send() {
    if (busy || !body.trim()) return;
    setBusy(true);
    const r = await rpcResult("scout_reply", { p_scout: id, p_body: body });
    setBusy(false);
    if (!r.ok) return notify(SCOUT_ERROR[r.error ?? ""] ?? "送れませんでした");
    setBody("");
    load();
  }
  async function decline() {
    if (!(await askConfirm("このスカウトを辞退します。相手には、辞退したことが伝わり、これ以上、送れなくなります。よろしいですか？"))) return;
    const { data } = await supabase.rpc("scout_decline", { p_scout: id });
    notify(data ? "辞退しました" : "辞退できませんでした");
    load();
  }

  const mineIsPt = row.role === "pt";
  return (
    <main className="min-h-screen bg-[#fafafa] px-5 py-8 pb-28">
      <div className="mx-auto max-w-2xl space-y-3">
        <Link href="/scouts" className="text-sm text-gray-400">← スカウト一覧</Link>
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <p className="text-sm font-semibold">{mineIsPt ? row.org_name : `${row.pt_name} さん`}</p>
          <p className="mt-0.5 text-[11px] text-gray-400">{mineIsPt ? "組織からのスカウト" : "送ったスカウト"}{row.job_title ? `・関連する求人：${row.job_title}` : ""}{row.status === "declined" ? "・辞退済み" : ""}</p>
          {!mineIsPt && <Link href={`/pts/${row.pt_user_id}`} className="mt-1 inline-block text-xs underline">プロフィールを見る</Link>}
        </div>
        <ul className="space-y-2">
          {msgs.map((m) => (
            <li key={m.id} className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm ${m.sender_id === userId ? "ml-auto bg-black text-white" : "bg-white shadow-sm"}`}>
              {m.body}
              <span className={`mt-1 block text-[10px] ${m.sender_id === userId ? "text-white/60" : "text-gray-400"}`}>{new Date(m.created_at).toLocaleString("ja-JP", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
            </li>
          ))}
        </ul>
        {row.status === "declined" ? <p className="text-center text-xs text-gray-500">辞退されたため、返信できません</p> : (
          <div className="space-y-2">
            {!mineIsPt && !msgs.some((m) => m.sender_id !== userId) ? <p className="text-xs text-gray-500">相手から返信があるまで、続けては送れません。</p> : (
              <>
                <textarea aria-label="返信" rows={3} maxLength={2000} value={body} onChange={(e) => setBody(e.target.value)} placeholder="返信を書く" className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-gray-900" />
                <button type="button" onClick={send} disabled={busy || !body.trim()} className="w-full rounded-full bg-black py-2.5 text-sm font-semibold text-white disabled:opacity-50">{busy ? "送信中…" : "返信する"}</button>
              </>
            )}
            {mineIsPt && <button type="button" onClick={decline} className="w-full rounded-full border border-gray-300 bg-white py-2 text-xs text-gray-600">このスカウトを辞退する</button>}
          </div>
        )}
        <div className="text-right"><ReportButton targetType="scout" targetId={id} /></div>
      </div>
    </main>
  );
}
