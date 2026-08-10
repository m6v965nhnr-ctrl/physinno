"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] flex items-center justify-center px-6">
      <div className="w-full max-w-md text-center">

        <h1 className="text-4xl font-semibold tracking-tight text-gray-900">
          Physinno
        </h1>

        <p className="mt-5 text-sm leading-7 text-gray-500">
          理学療法士の価値を可視化し、
          <br />
          患者・PT・医療をつなぐプラットフォーム
        </p>

        <div className="mt-12 space-y-3">

          <Link
            href="/login"
            className="block w-full rounded-full bg-black px-6 py-3.5 text-sm font-medium text-white transition hover:bg-gray-800 active:scale-[0.98]"
          >
            ログイン
          </Link>

          <Link
            href="/register"
            className="block w-full rounded-full border border-gray-300 bg-white px-6 py-3.5 text-sm font-medium text-gray-900 transition hover:bg-gray-50 active:scale-[0.98]"
          >
            新規登録
          </Link>

        </div>

      </div>
    </main>
  );
}