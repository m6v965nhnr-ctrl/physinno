"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { notify } from "@/lib/notify";
import { askConfirm } from "@/lib/confirm";
import { Job, SCOUT_ERROR, myOrganization, rpcResult } from "@/lib/recruit";
import ReportButton from "@/components/ReportButton";

type Social = { likes: number; liked: boolean; org_can_scout: boolean };
type Comment = { id: string; body: string; created_at: string; author: string; author_type: string; mine: boolean; can_delete: boolean };

const AREA = "w-full rounded-2xl border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-gray-900";

// PTの公開プロフィールに出す「応援（いいね・コメント）」と、承認済みの組織からの「スカウト」。
// 数は、能力や医療の質を表すものではない。コメントは、実際の担当患者さんによる確認済みの評価ではない
export default function ProfileSocial({ ptUserId, loggedIn, isSelf, appealQuote }: { ptUserId: string; loggedIn: boolean; isSelf: boolean; appealQuote?: string | null }) {
  const [s, setS] = useState<Social | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [body, setBody] = useState("");
  const [anon, setAnon] = useState(true);
  const [busy, setBusy] = useState(false);
  const [scoutOpen, setScoutOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobId, setJobId] = useState("");

  const load = useCallback(async () => {
    const [a, b] = await Promise.all([supabase.rpc("profile_social", { p_pt: ptUserId }), supabase.rpc("list_profile_comments", { p_pt: ptUserId })]);
    setS((a.data as Social | null) ?? { likes: 0, liked: false, org_can_scout: false });
    setComments((b.data ?? []) as Comment[]);
  }, [ptUserId]);
  useEffect(() => {
    load();
  }, [load]);

  async function like() {
    if (!loggedIn) return notify("いいねには、ログインが必要です");
    const { data, error } = await supabase.rpc("toggle_profile_like", { p_pt: ptUserId });
    if (error) return notify("いいねできませんでした");
    setS((x) => (x ? { ...x, liked: (data as { liked: boolean }).liked, likes: (data as { likes: number }).likes } : x));
  }
  async function post() {
    if (busy || !body.trim()) return;
    setBusy(true);
    const r = await rpcResult("add_profile_comment", { p_pt: ptUserId, p_body: body, p_anonymous: anon });
    setBusy(false);
    if (!r.ok) return notify(r.error === "too_many" ? "1日に送れるコメントの数に達しました" : r.error === "bad_body" ? "コメントは、300文字以内で書いてください" : "コメントできませんでした");
    setBody("");
    load();
  }
  async function remove(c: Comment) {
    if (!(await askConfirm("このコメントを削除します。よろしいですか？"))) return;
    const { data } = await supabase.rpc("delete_profile_comment", { p_id: c.id });
    notify(data ? "削除しました" : "削除できませんでした");
    load();
  }
  async function openScout() {
    setScoutOpen(!scoutOpen);
    if (jobs.length === 0) {
      const o = await myOrganization();
      if (o) {
        const { data } = await supabase.from("job_postings").select("*").eq("organization_id", o.id).eq("status", "open");
        setJobs((data ?? []) as Job[]);
      }
    }
  }
  async function sendScout() {
    if (busy) return;
    setBusy(true);
    const r = await rpcResult("send_scout", { p_pt: ptUserId, p_job: jobId || null, p_body: msg });
    setBusy(false);
    if (!r.ok) return notify(SCOUT_ERROR[r.error ?? ""] ?? "送れませんでした");
    notify("スカウトを送りました");
    setMsg("");
    setScoutOpen(false);
  }

  if (!s) return null;
  return (
    <section className="mt-6 space-y-4 rounded-2xl bg-white p-5 shadow-sm" aria-label="応援とスカウト">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold">応援</h2>
        {!isSelf && (
          <button type="button" onClick={like} aria-pressed={s.liked} className={`rounded-full border px-4 py-1.5 text-sm font-medium ${s.liked ? "border-rose-300 bg-rose-50 text-rose-700" : "border-gray-300 bg-white text-gray-700"}`}>
            {s.liked ? "♥" : "♡"} いいね {s.likes}
          </button>
        )}
        {isSelf && <span className="text-sm text-gray-600">♥ {s.likes}</span>}
      </div>
      <p className="text-[11px] leading-5 text-gray-500">いいねやコメントの数は、理学療法士の能力や医療の質を示すものではありません。コメントは、Re:lightの登録ユーザーからの応援で、実際に担当した患者さんによる確認済みの評価ではありません。</p>

      {s.org_can_scout && !isSelf && (
        <div>
          <button type="button" onClick={openScout} className="w-full rounded-full bg-black py-2.5 text-sm font-semibold text-white">この方にスカウトを送る</button>
          {scoutOpen && (
            <div className="mt-2 space-y-2">
              <select aria-label="関連する求人" value={jobId} onChange={(e) => setJobId(e.target.value)} className="w-full rounded-full border border-gray-300 bg-white px-4 py-2.5 text-sm"><option value="">関連する求人：なし</option>{jobs.map((j) => <option key={j.id} value={j.id}>{j.title}</option>)}</select>
              {/* プロフィールを読んだことが伝わるスカウトは、返信されやすい。引用つきの書き出しを用意する */}
              {!msg && (
                <button
                  type="button"
                  onClick={() =>
                    setMsg(
                      (appealQuote ? `「${appealQuote}」というプロフィールを拝見し、ぜひお話ししたいと思いご連絡しました。\n` : "プロフィールを拝見し、ぜひお話ししたいと思いご連絡しました。\n") +
                        "私たちは（施設名・地域）で、（どんな患者さん・利用者さんが多いか）。あなたの（良いと思った点）が、（職場のどんな場面）で活きると感じています。\nまずは見学だけでも歓迎です。"
                    )
                  }
                  className="rounded-full border border-gray-300 bg-white px-4 py-1.5 text-xs font-medium text-gray-700"
                >
                  ✍ プロフィールを引用した書き出しを入れる
                </button>
              )}
              <textarea aria-label="スカウトのメッセージ" rows={5} maxLength={2000} value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="なぜ、この方に声をかけたか、どんな職場かを、具体的に書いてください（10文字以上）" className={AREA} />
              <p className="text-[11px] text-gray-500">同じ相手には、返信があるまで、続けて送れません。受け取った方は、辞退できます。</p>
              <button type="button" onClick={sendScout} disabled={busy || msg.trim().length < 10} className="w-full rounded-full bg-black py-2.5 text-sm font-semibold text-white disabled:opacity-50">{busy ? "送信中…" : "送る"}</button>
            </div>
          )}
        </div>
      )}

      {!isSelf && (
        loggedIn ? (
          <div className="space-y-2">
            <textarea aria-label="応援コメント" rows={3} maxLength={300} value={body} onChange={(e) => setBody(e.target.value)} placeholder="感謝や応援のメッセージ（300文字まで）" className={AREA} />
            <p className="text-[11px] leading-5 text-amber-800">患者さんの実名・診断名・治療の内容など、個人が特定できる医療の情報は、書かないでください。見つけた場合は、通報できます。</p>
            <label className="flex items-center gap-2 text-xs text-gray-600"><input type="checkbox" checked={anon} onChange={(e) => setAnon(e.target.checked)} />匿名で投稿する</label>
            <button type="button" onClick={post} disabled={busy || !body.trim()} className="w-full rounded-full border border-gray-300 bg-white py-2 text-sm font-semibold disabled:opacity-50">コメントする</button>
          </div>
        ) : (
          <p className="text-xs text-gray-500">コメントやいいねには、<Link href="/login" className="underline">ログイン</Link>が必要です。</p>
        )
      )}

      {comments.length > 0 && (
        <ul className="space-y-3">
          {comments.map((c) => (
            <li key={c.id} className="border-t border-gray-100 pt-3 text-sm">
              <p className="text-xs text-gray-500">{c.author}{c.author_type ? `（${c.author_type}）` : ""}・{new Date(c.created_at).toLocaleDateString("ja-JP")}</p>
              <p className="mt-1 whitespace-pre-wrap text-gray-800">{c.body}</p>
              <div className="mt-1 flex items-center gap-3 text-xs">
                {c.can_delete && <button type="button" onClick={() => remove(c)} className="text-gray-500 underline">削除</button>}
                {!c.mine && loggedIn && <ReportButton targetType="profile_comment" targetId={c.id} />}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
