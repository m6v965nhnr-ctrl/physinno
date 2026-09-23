"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { getMyAccountType } from "@/lib/account";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    const user = data.user;

    if (!user) {
      alert("ログインユーザーを確認できませんでした");
      return;
    }

    alert("ログインしました");

    // 管理者は管理画面へ（admin_users テーブルで判定）
    const { data: adminData } = await supabase
      .from("admin_users")
      .select("user_id")
      .eq("user_id", user.id)
      .limit(1);

    if (adminData && adminData.length > 0) {
      router.push("/admin");
      return;
    }

    // 一般ユーザーはPT検索、PTはホームへ
    const accountType = await getMyAccountType(user.id);

    router.push(accountType === "general" ? "/pts" : "/home");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        color: "#111111",
        padding: "48px 24px",
      }}
    >
      <div
        style={{
          maxWidth: "448px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            color: "#111111",
            fontSize: "30px",
            fontWeight: 600,
            marginBottom: "40px",
          }}
        >
          ログイン
        </h1>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 20px",
              border: "1px solid #999999",
              borderRadius: "9999px",
              backgroundColor: "#ffffff",
              color: "#111111",
              fontSize: "16px",
              outline: "none",
            }}
          />

          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 20px",
              border: "1px solid #999999",
              borderRadius: "9999px",
              backgroundColor: "#ffffff",
              color: "#111111",
              fontSize: "16px",
              outline: "none",
            }}
          />

          <button
            onClick={login}
            style={{
              width: "100%",
              padding: "12px",
              border: "none",
              borderRadius: "9999px",
              backgroundColor: "#111111",
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            ログイン
          </button>

          <button
            onClick={() => router.push("/")}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #999999",
              borderRadius: "9999px",
              backgroundColor: "#ffffff",
              color: "#222222",
              fontSize: "16px",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            最初の画面に戻る
          </button>
        </div>
      </div>
    </main>
  );
}