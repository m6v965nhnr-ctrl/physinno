"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { notify } from "@/lib/notify";
import {
  REPORT_REASONS,
  REPORT_REASON_LABEL,
  REPORT_TARGET_LABEL,
  ReportReason,
  ReportTargetType,
  submitReport,
} from "@/lib/reports";

// 投稿・コメント・メッセージ・口コミを運営へ通報する(削除の申出もここから)
export default function ReportButton({
  targetType,
  targetId,
  className = "",
}: {
  targetType: ReportTargetType;
  targetId: string;
  className?: string;
}) {
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState<ReportReason>("privacy");
  const [detail, setDetail] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  async function openDialog() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      notify("通報するにはログインしてください");
      return;
    }

    setOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);

    const error = await submitReport({ targetType, targetId, reason, detail });

    setSending(false);

    if (error) {
      notify(error);
      return;
    }

    setDone(true);
    setOpen(false);
    setDetail("");
    notify("通報を受け付けました。運営が内容を確認します");
  }

  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        disabled={done}
        className={`text-xs text-gray-400 hover:text-gray-600 disabled:cursor-default disabled:hover:text-gray-400 ${className}`}
      >
        {done ? "通報済み" : "通報"}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[10000] flex items-end justify-center bg-black/40 sm:items-center"
          onClick={() => setOpen(false)}
        >
          <form
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onSubmit={handleSubmit}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-white p-5 sm:rounded-3xl"
          >
            <div className="flex items-start justify-between">
              <h2 id={titleId} className="text-base font-semibold text-gray-900">
                この{REPORT_TARGET_LABEL[targetType]}を通報する
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="閉じる"
                className="text-xl leading-none text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <p className="mt-2 text-xs leading-5 text-gray-500">
              内容は運営だけが確認します。相手には、通報したことは伝わりません。
              権利を侵害されたとして削除を求める場合も、ここから申し出られます。
            </p>

            <fieldset className="mt-4 space-y-2">
              <legend className="text-sm font-medium text-gray-900">理由</legend>
              {REPORT_REASONS.map((r) => (
                <label key={r} className="flex items-start gap-2 text-sm text-gray-700">
                  <input
                    type="radio"
                    name={`reason-${titleId}`}
                    value={r}
                    checked={reason === r}
                    onChange={() => setReason(r)}
                    className="mt-1"
                  />
                  {REPORT_REASON_LABEL[r]}
                </label>
              ))}
            </fieldset>

            <label className="mt-4 block text-sm font-medium text-gray-900">
              詳しい内容（任意）
              <textarea
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
                maxLength={2000}
                rows={4}
                placeholder="どの部分が問題か、分かる範囲で教えてください"
                className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm font-normal text-gray-900 outline-none focus:border-gray-500"
              />
            </label>

            <p className="mt-2 text-xs leading-4 text-gray-400">
              ログインしていない方や、ユーザーでない方の申出は{" "}
              <Link href="/contact" className="underline">
                運営へのメッセージ
              </Link>
              からお願いします。
            </p>

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-full border border-gray-200 py-2.5 text-sm text-gray-700"
              >
                キャンセル
              </button>
              <button
                type="submit"
                disabled={sending}
                className="flex-1 rounded-full bg-black py-2.5 text-sm font-medium text-white disabled:opacity-50"
              >
                {sending ? "送信中…" : "通報する"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
