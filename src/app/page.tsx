"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    }

    getUser();
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    location.reload();
  }

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6">

      <div className="w-full max-w-5xl">

        <div className="flex justify-end mb-10">

          {user ? (
            <div className="flex items-center gap-4">

              <span className="text-gray-700">
                ログイン中
              </span>

              <button
                onClick={logout}
                className="border px-4 py-2 rounded-full"
              >
                ログアウト
              </button>

            </div>
          ) : (
            <div className="flex gap-3">

              <a href="/login">
                <button className="border px-5 py-2 rounded-full">
                  ログイン
                </button>
              </a>

              <a href="/register">
                <button className="bg-black text-white px-5 py-2 rounded-full">
                  新規登録
                </button>
              </a>

            </div>
          )}

        </div>

        <div className="text-center">

          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Physinno
          </h1>

          <p className="text-xl text-gray-600 mb-10">
            理学療法士の価値を可視化し、
            <br />
            患者・PT・医療をつなぐプラットフォーム
          </p>

          <div className="flex gap-4 justify-center">

            <a href="/pts">
              <button className="bg-black text-white px-6 py-3 rounded-full">
                PTを探す
              </button>
            </a>

            <a href="/register">
              <button className="border border-gray-300 px-6 py-3 rounded-full">
                PTとして登録
              </button>
            </a>

          </div>

        </div>

      </div>

    </main>
  );
}