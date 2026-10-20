"use client";

import { useCallback, useEffect, useState } from "react";
import { askConfirm } from "@/lib/confirm";
import { notify } from "@/lib/notify";
import { ClassMessage, deleteClassMessage, listClassMessages, postClassMessage } from "@/lib/quizClass";

const time = (iso: string) => new Date(iso).toLocaleString("ja-JP", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" });

// 先生用: 学生からの質問と、回答。回答は、クラスのチャットに流れる（クラスのみんなが読める）
export default function ClassQuestions({ classId, onCount }: { classId: string; onCount?: (open: number) => void }) {
  const [msgs, setMsgs] = useState<ClassMessage[] | null>(null);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState("");

  const load = useCallback(async () => {
    const m = await listClassMessages(classId);
    setMsgs(m);
    if (m) onCount?.(m.filter((q) => q.kind === "question" && !m.some((a) => a.reply_to === q.id)).length);
  }, [classId, onCount]);

  useEffect(() => {
    load();
  }, [load]);

  async function reply(q: ClassMessage) {
    const body = (drafts[q.id] ?? "").trim();
    if (!body || busy) return;
    setBusy(q.id);
    const ok = await postClassMessage(classId, "answer", body, { replyTo: q.id });
    setBusy("");
    if (!ok) return notify("回答を送れませんでした");
    setDrafts((d) => ({ ...d, [q.id]: "" }));
    load();
  }

  async function remove(id: string) {
    if (!(await askConfirm("このメッセージを消しますか？（回答もあわせて消えます）"))) return;
    if (!(await deleteClassMessage(id))) return notify("消せませんでした");
    load();
  }

  if (msgs === null) return <p className="py-3 text-xs text-gray-400">読み込み中…</p>;
  const questions = msgs.filter((m) => m.kind === "question").reverse();
  if (questions.length === 0) return <p className="py-3 text-xs text-gray-500">質問は、まだありません。</p>;

  return (
    <ul className="space-y-3">
      {questions.map((q) => {
        const answers = msgs.filter((a) => a.reply_to === q.id);
        return (
          <li key={q.id} className="rounded-xl border border-gray-200 p-3">
            <p className="text-[11px] text-gray-500">
              {q.anonymous ? "匿名" : q.author} ・ {time(q.created_at)}
              {answers.length === 0 && <span className="ml-2 font-semibold text-red-600">未回答</span>}
            </p>
            <p className="mt-1 whitespace-pre-wrap text-sm leading-6">{q.body}</p>
            {answers.map((a) => (
              <div key={a.id} className="mt-2 rounded-lg bg-emerald-50 p-2 text-sm">
                <p className="text-[10px] text-gray-500">✅ 回答 ・ {time(a.created_at)}</p>
                <p className="whitespace-pre-wrap leading-6">{a.body}</p>
              </div>
            ))}
            <div className="mt-2 flex gap-2">
              <textarea
                value={drafts[q.id] ?? ""}
                onChange={(e) => setDrafts((d) => ({ ...d, [q.id]: e.target.value }))}
                rows={2}
                maxLength={1000}
                placeholder={answers.length ? "回答を、もう一つ追加" : "回答を入力"}
                aria-label="回答"
                className="min-w-0 flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm"
              />
              <button type="button" onClick={() => reply(q)} disabled={busy === q.id || !(drafts[q.id] ?? "").trim()} className="shrink-0 self-end rounded-full bg-black px-4 py-2 text-xs font-medium text-white disabled:opacity-40">
                回答する
              </button>
            </div>
            <button type="button" onClick={() => remove(q.id)} className="mt-1 text-[10px] text-gray-400 underline">
              この質問を消す
            </button>
          </li>
        );
      })}
    </ul>
  );
}
