"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { sendOperatorMessage } from "@/lib/operatorMessages";
import { notify } from "@/lib/notify";

export default function ContactOperatorPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [saving, setSaving] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSend() {
    if (!title.trim() || !content.trim()) {
      notify("タイトルと内容を入力してください");
      return;
    }

    setSaving(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      notify("ログインしてください");
      setSaving(false);
      return;
    }

    const error = await sendOperatorMessage({
      title: title.trim(),
      content: content.trim(),
      isAnonymous,
      userId: user.id,
    });

    setSaving(false);

    if (error) {
      notify(error || "送信に失敗しました");
      return;
    }

    setSent(true);
    setTitle("");
    setContent("");
  }

  return (
    <main className="min-h-screen bg-[#fafafa] px-5 py-8 pb-28">
      <div className="mx-auto max-w-md">
        <Link href="/mypage" className="text-sm text-gray-400 hover:text-gray-700">
          ← 戻る
        </Link>

        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-gray-900">
          運営へのメッセージ
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          ご意見・ご要望・不具合報告など、運営にお伝えしたいことをお送りください。
        </p>

        {sent ? (
          <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 text-center">
            <p className="text-sm text-gray-900">
              メッセージを送信しました。ありがとうございます。
            </p>
            <button
              onClick={() => setSent(false)}
              className="mt-4 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              もう一件送る
            </button>
          </div>
        ) : (
          <div className="mt-6 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium" htmlFor="contact-title">
                タイトル
              </label>
              <input
                id="contact-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="例：病院検索の不具合について"
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-sm outline-none focus:border-gray-400"
              />
            </div>

            <div>
              <label
                className="mb-2 block text-sm font-medium"
                htmlFor="contact-content"
              >
                内容
              </label>
              <textarea
                id="contact-content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                placeholder="具体的な内容をご記入ください"
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-sm outline-none focus:border-gray-400"
              />
            </div>

            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
              />
              匿名で送る
            </label>

            <button
              onClick={handleSend}
              disabled={saving}
              className="w-full rounded-full bg-black py-3.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
            >
              {saving ? "送信中…" : "送信する"}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
