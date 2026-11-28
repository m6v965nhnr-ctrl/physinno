"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { rememberReturnTo, takeReturnTo } from "@/lib/returnTo";
import { clearGuestRole } from "@/lib/guestRole";
import { INPUT_CLASS, PRIMARY_BUTTON_CLASS } from "@/lib/ui";
import { KUCHIKOMI_REGISTER } from "@/lib/kuchikomi";

export default function KuchikomiLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    rememberReturnTo(new URLSearchParams(window.location.search).get("next"));
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (loading || !email.trim() || !password) return;
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (error) {
      setError("ログインできませんでした。メールアドレスとパスワードを確かめてください");
      setLoading(false);
      return;
    }
    clearGuestRole();
    router.push(takeReturnTo() ?? "/kuchikomi");
  }

  return (
    <div className="mx-auto max-w-md px-5 py-8">
      <h1 className="text-2xl font-bold text-gray-900">ログイン</h1>
      <p className="mt-2 text-sm leading-7 text-gray-700">Re:light に登録済みの方は、同じメールアドレスとパスワードで入れます。</p>
      <form onSubmit={submit} className="mt-6 space-y-4">
        <input type="email" name="email" autoComplete="email" inputMode="email" spellCheck={false} aria-label="メールアドレス" placeholder="メールアドレス" value={email} onChange={(e) => setEmail(e.target.value)} className={INPUT_CLASS} />
        <input type="password" name="password" autoComplete="current-password" aria-label="パスワード" placeholder="パスワード" value={password} onChange={(e) => setPassword(e.target.value)} className={INPUT_CLASS} />
        {error && <p role="alert" className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
        <button type="submit" disabled={loading || !email.trim() || !password} className={PRIMARY_BUTTON_CLASS}>{loading ? "確認中…" : "ログイン"}</button>
      </form>
      <div className="mt-5 space-y-3 text-center text-sm text-gray-600">
        <p><Link href="/kuchikomi/forgot-password" className="underline">パスワードを忘れた方</Link></p>
        <p>はじめての方は<Link href={KUCHIKOMI_REGISTER} className="ml-1 font-bold underline">無料会員登録</Link></p>
      </div>
    </div>
  );
}
