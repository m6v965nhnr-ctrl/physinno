"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { track } from "@vercel/analytics";
import { supabase } from "@/lib/supabase";
import { getAttribution } from "@/lib/attribution";
import { trackRegistration } from "@/lib/metaPixel";
import { rememberReturnTo, signupFromPath, takeReturnTo } from "@/lib/returnTo";
import { clearGuestRole } from "@/lib/guestRole";
import { INPUT_CLASS, PRIMARY_BUTTON_CLASS, chipClass } from "@/lib/ui";
import { facilityReturnPath } from "@/lib/kuchikomi";

const PROFESSIONS = [
  { v: "pt", label: "理学療法士（PT）" },
  { v: "ot", label: "作業療法士（OT）" },
  { v: "st", label: "言語聴覚士（ST）" },
] as const;

// 「リハ職の本音」の会員登録。アカウントは Re:light と共通
export default function KuchikomiRegister() {
  const router = useRouter();
  const [profession, setProfession] = useState<"pt" | "ot" | "st" | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    rememberReturnTo(new URLSearchParams(window.location.search).get("next"));
  }, []);

  const missing = [!profession && "職種", !fullName.trim() && "名前", !email.trim() && "メールアドレス", password.length < 8 && "パスワード（8文字以上）", !agreed && "利用規約への同意"].filter(Boolean);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (loading || missing.length > 0) return;
    setError("");
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        // DBトリガーが users に保存する。OT・STは、アカウントの種類は「一般」で、職種だけを持つ
        data: {
          account_type: profession === "pt" ? "pt" : "general",
          profession: profession === "pt" ? undefined : profession,
          full_name: fullName.trim().slice(0, 50),
          referred_by: new URLSearchParams(window.location.search).get("ref") || undefined,
          ...getAttribution(),
          signup_from: signupFromPath(),
        },
      },
    });
    if (error || !data.user) {
      setError(/already registered/i.test(error?.message ?? "") ? "このメールアドレスは登録済みです。下の「ログイン」から入ってください" : (error?.message ?? "登録に失敗しました"));
      setLoading(false);
      return;
    }
    trackRegistration();
    clearGuestRole();
    track("register_done", { type: profession as string });
    const next = facilityReturnPath(takeReturnTo());
    router.push(next ? `/kuchikomi/welcome?next=${encodeURIComponent(next)}` : "/kuchikomi/welcome");
  }

  return (
    <div className="mx-auto max-w-md px-5 py-8">
      <h1 className="text-2xl font-bold text-gray-900">無料会員登録</h1>
      <p className="mt-2 text-sm leading-7 text-gray-700">無料・約1分で登録できます。登録のあと、そのまま口コミを書けます。</p>
      <form onSubmit={submit} className="mt-6 space-y-5">
        <fieldset>
          <legend className="mb-2 text-sm font-bold text-gray-900">職種（自己申告）</legend>
          <div className="flex flex-wrap gap-2">
            {PROFESSIONS.map((p) => (
              <button key={p.v} type="button" aria-pressed={profession === p.v} onClick={() => setProfession(p.v)} className={chipClass(profession === p.v)}>{p.label}</button>
            ))}
          </div>
        </fieldset>
        <div>
          <label htmlFor="kr-name" className="mb-2 block text-sm font-bold text-gray-900">名前</label>
          <input id="kr-name" autoComplete="name" maxLength={50} value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="山田 太郎" className={INPUT_CLASS} />
          <p className="mt-2 text-sm font-bold text-gray-900">口コミは匿名でできます。</p>
          <p className="text-xs leading-5 text-gray-500">口コミに、名前は出ません。同じアカウントで Re:light に投稿やコメントをするときは、名前が表示されます。</p>
        </div>
        <div>
          <label htmlFor="kr-email" className="mb-2 block text-sm font-bold text-gray-900">メールアドレス</label>
          <input id="kr-email" type="email" autoComplete="email" inputMode="email" spellCheck={false} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@email.com" className={INPUT_CLASS} />
        </div>
        <div>
          <label htmlFor="kr-password" className="mb-2 block text-sm font-bold text-gray-900">パスワード</label>
          <input id="kr-password" type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="8文字以上" className={INPUT_CLASS} />
        </div>
        <label className="flex items-start gap-2 text-xs leading-5 text-gray-600">
          <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            <Link href="/terms" target="_blank" rel="noopener" className="underline">利用規約</Link>と
            <Link href="/privacy" target="_blank" rel="noopener" className="underline">プライバシーポリシー</Link>
            に同意します（アカウントは Re:light と共通です）
          </span>
        </label>
        {error && <p role="alert" className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
        {missing.length > 0 && <p role="status" className="text-center text-xs text-red-600">未入力：{missing.join("・")}</p>}
        <button type="submit" disabled={loading || missing.length > 0} className={PRIMARY_BUTTON_CLASS}>{loading ? "登録中…" : "登録して次へ"}</button>
        <p className="text-center text-sm text-gray-600">
          登録済みの方は<Link href="/kuchikomi/login" className="ml-1 font-bold underline">ログイン</Link>
        </p>
      </form>
    </div>
  );
}
