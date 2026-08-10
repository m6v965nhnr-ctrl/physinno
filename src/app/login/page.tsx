"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    console.log(data);
    console.log(error);

    if (error) {
      alert(error.message);
      return;
    }

    alert("ログインしました");

    router.push("/home");
  }

  return (
    <main className="min-h-screen bg-white px-6 py-12">
      <div className="max-w-md mx-auto">

        <h1 className="
          text-3xl
          font-semibold
          mb-10
        ">
          ログイン
        </h1>

        <div className="space-y-5">

          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="
              w-full
              border
              rounded-full
              px-5
              py-3
            "
          />

          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="
              w-full
              border
              rounded-full
              px-5
              py-3
            "
          />

          <button
            onClick={login}
            className="
              w-full
              bg-black
              text-white
              rounded-full
              py-3
            "
          >
            ログイン
          </button>

          <button
            onClick={() => router.push("/")}
            className="
              w-full
              border
              border-gray-300
              bg-white
              text-gray-700
              rounded-full
              py-3
            "
          >
            最初の画面に戻る
          </button>

        </div>

      </div>
    </main>
  );
}