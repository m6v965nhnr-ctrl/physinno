"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type AccountType = "pt" | "general";

const ACCOUNT_TYPE_OPTIONS: {
  value: AccountType;
  label: string;
  description: string;
}[] = [
  {
    value: "pt",
    label: "PT（理学療法士）",
    description: "PT同士で交流・情報共有",
  },
  {
    value: "general",
    label: "一般",
    description: "PTを探す・レビューを書く",
  },
];

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState<AccountType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleRegister() {
    setError("");

    if (!accountType) {
      setError("アカウントの種類（PT／一般）を選んでください");
      return;
    }

    if (!email || !password) {
      setError("メールアドレスとパスワードを入力してください");
      return;
    }

    if (password.length < 6) {
      setError("パスワードは6文字以上にしてください");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // DBトリガー on_auth_user_created が users.account_type に保存します
        data: { account_type: accountType },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (!data.user) {
      setError("登録に失敗しました");
      setLoading(false);
      return;
    }

    // 一般ユーザーはPT検索から、PTはホームから始める
    router.push(accountType === "general" ? "/pts" : "/home");
  }

  return (
    <main className="min-h-screen bg-[#fafafa] px-6 py-12">
      <div className="mx-auto max-w-md">

        <Link
          href="/"
          className="text-sm text-gray-400"
        >
          ← Re:light
        </Link>

        <h1 className="mt-10 text-3xl font-semibold tracking-tight">
          新規登録
        </h1>

        <p className="mt-3 text-sm text-gray-500">
          Re:lightをはじめましょう
        </p>

        <div className="mt-10 space-y-5">

          <div>
            <p className="mb-2 block text-sm font-medium">
              アカウントの種類
            </p>

            <div
              role="radiogroup"
              aria-label="アカウントの種類"
              className="grid grid-cols-2 gap-3"
            >
              {ACCOUNT_TYPE_OPTIONS.map((option) => {
                const selected = accountType === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setAccountType(option.value)}
                    className={`rounded-2xl border px-4 py-3.5 text-left transition ${
                      selected
                        ? "border-black bg-black text-white"
                        : "border-gray-200 bg-white text-gray-900 hover:border-gray-400"
                    }`}
                  >
                    <span className="block text-sm font-medium">
                      {option.label}
                    </span>
                    <span
                      className={`mt-1 block text-xs ${
                        selected ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      {option.description}
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="mt-2 text-xs text-gray-400">
              資格は自己申告です。
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              メールアドレス
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="example@email.com"
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-sm outline-none focus:border-gray-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              パスワード
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="6文字以上"
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-sm outline-none focus:border-gray-400"
            />
          </div>

          {error && (
            <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full rounded-full bg-black py-3.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "登録中..." : "新規登録"}
          </button>

          <p className="text-center text-sm text-gray-500">
            すでにアカウントをお持ちですか？
            <Link
              href="/login"
              className="ml-1 font-medium text-gray-900 underline underline-offset-4"
            >
              ログイン
            </Link>
          </p>

        </div>
      </div>
    </main>
  );
}