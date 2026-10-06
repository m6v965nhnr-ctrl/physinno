"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { notify } from "@/lib/notify";

// パスワードを忘れた人が、登録したメールアドレスに「再設定用のリンク」を受け取るページ
export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const address = email.trim();
    if (!address) {
      notify("メールアドレスを入力してください");
      return;
    }

    setSending(true);

    const { error } = await supabase.auth.resetPasswordForEmail(address, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setSending(false);

    // 登録されていないアドレスでも、エラーにならず同じ表示になる(登録の有無を知られないため)。
    // エラーになるのは、短時間に何度も送ったときや、メールの送信そのものに失敗したとき
    if (error) {
      if (/rate|seconds|too many|limit/i.test(error.message)) {
        notify("短い間に何度も送れません。1分ほど待ってから、もう一度お試しください");
      } else {
        console.error("RESET PASSWORD ERROR", error.message);
        notify("メールを送れませんでした。時間をおいてもう一度お試しください。続く場合は、運営へのメッセージからご連絡ください");
      }
      return;
    }

    setSent(true);
  }

  return (
    <main className="min-h-screen bg-[#fafafa] px-6 py-12">
      <div className="mx-auto max-w-md">
        <Link href="/login" className="text-sm text-gray-400">
          ← ログインに戻る
        </Link>

        <h1 className="mt-10 text-3xl font-semibold tracking-tight">パスワードの再設定</h1>

        {sent ? (
          <div className="mt-8 space-y-4 rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-gray-900">メールを送りました</p>
            <p className="text-sm leading-7 text-gray-600">
              <span className="break-all font-medium">{email.trim()}</span>{" "}
              が登録されている場合は、パスワードを再設定するためのリンクをお送りしました。メールのリンクを開いて、新しいパスワードを設定してください。
            </p>
            <ul className="list-disc space-y-1 pl-5 text-xs leading-6 text-gray-500">
              <li>届くまで、数分かかることがあります。</li>
              <li>迷惑メールフォルダも確認してください。</li>
              <li>リンクの有効期限は1時間です。切れたときは、もう一度やり直してください。</li>
              <li>登録したメールアドレスが分からないときは、運営へのメッセージからご連絡ください。</li>
            </ul>
            <button
              onClick={() => setSent(false)}
              className="text-xs text-gray-500 underline underline-offset-4"
            >
              メールアドレスを入力し直す
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <p className="text-sm leading-7 text-gray-600">
              登録したメールアドレスを入力してください。パスワードを再設定するためのリンクを、メールでお送りします。
            </p>

            <input
              type="email"
              name="email"
              autoComplete="email"
              inputMode="email"
              spellCheck={false}
              aria-label="メールアドレス"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-base outline-none focus:border-gray-400"
            />

            <button
              type="submit"
              disabled={sending}
              className="w-full rounded-full bg-black py-3.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
            >
              {sending ? "送信中…" : "再設定のメールを送る"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
