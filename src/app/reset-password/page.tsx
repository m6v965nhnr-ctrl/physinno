"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { getMyAccountType } from "@/lib/account";
import { notify } from "@/lib/notify";

// メールの再設定リンクから開き、新しいパスワードを決めるページ
export default function ResetPasswordPage() {
  const [state, setState] = useState<"checking" | "ready" | "invalid">("checking");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;

    // リンクの有効期限切れ・無効のときは、アドレスの後ろ(#)にエラーが付いてくる
    const hasLinkError = /error=|error_code=/.test(window.location.hash);

    // リンクを開いた直後は、アプリが自動で「再設定用のログイン状態」を作る(完了を待ってから確認する)
    const timer = setTimeout(async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (cancelled) return;
      setState(session && !hasLinkError ? "ready" : "invalid");
    }, 600);

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" && !cancelled) setState("ready");
    });

    return () => {
      cancelled = true;
      clearTimeout(timer);
      subscription.unsubscribe();
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (password.length < 8) {
      notify("パスワードは8文字以上にしてください");
      return;
    }
    if (password !== confirm) {
      notify("確認用のパスワードが一致しません");
      return;
    }

    setSaving(true);
    const { data, error } = await supabase.auth.updateUser({ password });
    setSaving(false);

    if (error) {
      if (/same|different/i.test(error.message)) {
        notify("今までと違うパスワードにしてください");
      } else if (/weak|short|characters/i.test(error.message)) {
        notify("パスワードが短い、または簡単すぎます。別のパスワードにしてください");
      } else {
        notify("パスワードを変更できませんでした。リンクの期限が切れている可能性があります");
      }
      return;
    }

    setDone(true);
    notify("パスワードを変更しました");

    const type = data.user ? await getMyAccountType(data.user.id) : null;
    setTimeout(() => {
      window.location.href = type === "general" ? "/pts" : type === "student" ? "/student" : "/home";
    }, 1500);
  }

  return (
    <main className="min-h-screen bg-[#fafafa] px-6 py-12">
      <div className="mx-auto max-w-md">
        <h1 className="text-3xl font-semibold tracking-tight">新しいパスワード</h1>

        {state === "checking" && <p className="mt-8 text-sm text-gray-400">確認しています…</p>}

        {state === "invalid" && (
          <div className="mt-8 space-y-4 rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-gray-900">このリンクは使えません</p>
            <p className="text-sm leading-7 text-gray-600">
              リンクの有効期限が切れているか、すでに使われた可能性があります。もう一度、再設定のメールを送ってください。
            </p>
            <Link
              href="/forgot-password"
              className="inline-block rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white"
            >
              再設定のメールを送る
            </Link>
          </div>
        )}

        {state === "ready" && !done && (
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <p className="text-sm leading-7 text-gray-600">新しいパスワードを入力してください（8文字以上）。</p>

            <input
              type="password"
              name="new-password"
              autoComplete="new-password"
              aria-label="新しいパスワード"
              placeholder="新しいパスワード（8文字以上）"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-base outline-none focus:border-gray-400"
            />
            <input
              type="password"
              name="confirm-password"
              autoComplete="new-password"
              aria-label="新しいパスワード（確認）"
              placeholder="もう一度入力"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-base outline-none focus:border-gray-400"
            />

            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-full bg-black py-3.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
            >
              {saving ? "変更中…" : "パスワードを変更する"}
            </button>
          </form>
        )}

        {done && (
          <p className="mt-8 rounded-2xl bg-white p-6 text-sm leading-7 text-gray-700 shadow-sm">
            パスワードを変更しました。まもなく移動します…
          </p>
        )}
      </div>
    </main>
  );
}
