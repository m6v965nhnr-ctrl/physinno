"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { getMyAccountType, landingPathFor, syncMyAccountType } from "@/lib/account";
import { notify } from "@/lib/notify";
import { rememberReturnTo, takeReturnTo } from "@/lib/returnTo";
import { askConfirm } from "@/lib/confirm";
import { clearGuestRole } from "@/lib/guestRole";
import {
  biometricAvailable,
  declinedBiometric,
  hasSavedLogin,
  readSavedLogin,
  rememberDeclinedBiometric,
  saveLogin,
} from "@/lib/biometric";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Face IDで入れるとき（iPhoneアプリで、保存済みのとき）
  const [faceReady, setFaceReady] = useState(false);

  // ゲストとして見ていた画面から来たとき（?next=）は、ログインのあとにそこへ戻す
  useEffect(() => {
    rememberReturnTo(new URLSearchParams(window.location.search).get("next"));
  }, []);

  // iPhoneアプリで、保存済みなら、Face IDのボタンを出す。アプリを開いて最初だけ、自動で顔認証を始める（ログアウトした直後は始めない）
  useEffect(() => {
    let alive = true;
    (async () => {
      if (!(await biometricAvailable()) || !(await hasSavedLogin())) return;
      if (!alive) return;
      setFaceReady(true);
      try {
        if (sessionStorage.getItem("relight-logged-out") || sessionStorage.getItem("relight-bio-auto")) return;
        sessionStorage.setItem("relight-bio-auto", "1");
      } catch {
        return;
      }
      loginWithFace();
    })();
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loginWithFace() {
    const saved = await readSavedLogin();
    if (!saved) return;
    await login(saved.email, saved.password, true);
  }

  async function login(emailArg: string = email, passwordArg: string = password, viaFace = false) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailArg,
      password: passwordArg,
    });

    if (error) {
      notify(error.message);
      return;
    }

    const user = data.user;

    if (!user) {
      notify("ログインユーザーを確認できませんでした");
      return;
    }

    notify("ログインしました");
    clearGuestRole();
    try {
      sessionStorage.removeItem("relight-logged-out");
    } catch {
      // 何もしない
    }

    // iPhoneアプリで、パスワードで入れたとき: 次から Face ID で入れるように、1度だけ、案内する
    if (!viaFace && (await biometricAvailable()) && !(await hasSavedLogin()) && !declinedBiometric()) {
      if (
        await askConfirm("次から、Face ID（顔認証）でログインしますか？ メールアドレスとパスワードは、このiPhoneの中だけに、安全に保存されます。", {
          okLabel: "はい",
          cancelLabel: "しない",
        })
      ) {
        if (!(await saveLogin(emailArg, passwordArg))) notify("Face IDの設定ができませんでした");
      } else {
        rememberDeclinedBiometric(true);
      }
    }

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

    // PT・一般の方は検索、学生はマイページへ
    let accountType = await getMyAccountType(user.id);

    // 卒業予定年を過ぎた学生は、ここでPTに切り替える
    if (accountType === "student") {
      accountType = (await syncMyAccountType()) ?? accountType;
    }

    router.push(takeReturnTo() ?? landingPathFor(accountType));
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
            name="email"
            autoComplete="email"
            inputMode="email"
            spellCheck={false}
            aria-label="メールアドレス"
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
            name="password"
            autoComplete="current-password"
            aria-label="パスワード"
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

          {faceReady && (
            <button
              onClick={loginWithFace}
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #111111",
                borderRadius: "9999px",
                backgroundColor: "#ffffff",
                color: "#111111",
                fontSize: "16px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Face IDでログイン
            </button>
          )}

          <button
            onClick={() => login()}
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

          <Link
            href="/forgot-password"
            style={{ textAlign: "center", color: "#444444", fontSize: "14px", textDecoration: "underline" }}
          >
            パスワードを忘れた方はこちら
          </Link>

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