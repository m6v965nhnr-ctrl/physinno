"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { askConfirm } from "@/lib/confirm";
import { notify } from "@/lib/notify";
import { ClassMessage, deleteClassMessage, listClassMessages, postClassMessage } from "@/lib/quizClass";

const time = (iso: string) => new Date(iso).toLocaleString("ja-JP", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" });

// クラスのチャット。クラスの全員（先生と学生）が読める。学生から先生への質問と、先生の回答も、ここに流れる
export default function ClassChat({ classId, height = "h-[60vh]" }: { classId: string; height?: string }) {
  const [msgs, setMsgs] = useState<ClassMessage[] | null | undefined>(undefined);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  const load = useCallback(async () => {
    setMsgs(await listClassMessages(classId));
  }, [classId]);

  useEffect(() => {
    load();
    const t = setInterval(load, 15000);
    return () => clearInterval(t);
  }, [load]);

  useEffect(() => {
    if (!msgs) return;
    endRef.current?.scrollIntoView({ block: "end", behavior: first.current ? "auto" : "smooth" });
    first.current = false;
  }, [msgs?.length]); // eslint-disable-line react-hooks/exhaustive-deps

  async function send() {
    const body = text.trim();
    if (!body || busy) return;
    setBusy(true);
    const ok = await postClassMessage(classId, "chat", body);
    setBusy(false);
    if (!ok) return notify("送れませんでした（短い時間に何度も送ると、止まります）");
    setText("");
    load();
  }

  async function remove(id: string) {
    if (!(await askConfirm("このメッセージを消しますか？"))) return;
    if (!(await deleteClassMessage(id))) return notify("消せませんでした");
    load();
  }

  if (msgs === undefined) return <p className="py-6 text-center text-sm text-gray-400">読み込み中…</p>;
  if (msgs === null) return <p className="py-6 text-center text-sm text-gray-500">このクラスのチャットは開けません。</p>;

  const byId = new Map(msgs.map((m) => [m.id, m]));

  return (
    <div className="flex flex-col gap-2">
      <div className={`${height} space-y-2 overflow-y-auto rounded-xl bg-gray-50 p-2`} aria-live="polite">
        {msgs.length === 0 && <p className="py-8 text-center text-xs text-gray-400">まだメッセージはありません。</p>}
        {msgs.map((m) => {
          const q = m.reply_to ? byId.get(m.reply_to) : null;
          const label = m.kind === "question" ? "🙋 先生への質問" : m.kind === "answer" ? "✅ 先生の回答" : m.from_teacher ? "先生" : null;
          return (
            <div key={m.id} className={`flex ${m.mine ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-6 ${m.kind === "chat" ? (m.mine ? "bg-black text-white" : "bg-white text-gray-900 shadow-sm") : "border border-emerald-200 bg-emerald-50 text-gray-900"}`}>
                <p className={`text-[10px] ${m.kind === "chat" && m.mine ? "text-white/70" : "text-gray-500"}`}>
                  {label && <span className="mr-1 font-semibold">{label}</span>}
                  {m.kind === "question" && m.anonymous && !m.mine ? "匿名" : m.author ?? ""}
                  {m.kind === "question" && m.anonymous && m.mine ? "（匿名で送信）" : ""} ・ {time(m.created_at)}
                </p>
                {q && <p className="mt-1 border-l-2 border-emerald-300 pl-2 text-[11px] text-gray-500">{q.body.slice(0, 60)}{q.body.length > 60 ? "…" : ""}</p>}
                <p className="whitespace-pre-wrap break-words">{m.body}</p>
                {m.mine && (
                  <button type="button" onClick={() => remove(m.id)} className="mt-0.5 text-[10px] underline opacity-60">
                    消す
                  </button>
                )}
              </div>
            </div>
          );
        })}
        <div ref={endRef} />
      </div>
      <div className="flex gap-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={1}
          maxLength={1000}
          placeholder="クラスのみんなに送る"
          aria-label="クラスのチャットに送る内容"
          className="min-w-0 flex-1 resize-none rounded-xl border border-gray-300 px-3 py-2 text-sm"
        />
        <button type="button" onClick={send} disabled={busy || !text.trim()} className="shrink-0 rounded-full bg-black px-5 py-2 text-sm font-medium text-white disabled:opacity-40">
          送る
        </button>
      </div>
    </div>
  );
}
