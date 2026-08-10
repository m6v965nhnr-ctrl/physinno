"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleRegister() {
    setError("");

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

    router.push("/home");
  }

  return (
    <main className="min-h-screen bg-[#fafafa] px-6 py-12">
      <div className="mx-auto max-w-md">

        <Link
          href="/"
          className="text-sm text-gray-400"
        >
          ← Physinno
        </Link>

        <h1 className="mt-10 text-3xl font-semibold tracking-tight">
          新規登録
        </h1>

        <p className="mt-3 text-sm text-gray-500">
          Physinnoをはじめましょう
        </p>

        <div className="mt-10 space-y-5">

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