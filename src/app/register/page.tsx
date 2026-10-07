"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { getAttribution } from "@/lib/attribution";
import { graduationYearOptions } from "@/lib/student";

type AccountType = "pt" | "general" | "student";

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
    value: "student",
    label: "学生（PTをめざす）",
    description: "実習・就活・国試をサポート",
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
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [referredBy, setReferredBy] = useState("");
  const yearOptions = graduationYearOptions();
  const [graduationYear, setGraduationYear] = useState(String(yearOptions[0]));

  // トップページのボタンから来たとき（?type=pt / ?type=general）は種類を選んだ状態にする
  // 招待リンク（?ref=招待した人のユーザーID）はサインアップ時にそのまま渡す
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type");
    if (type === "pt" || type === "general" || type === "student") {
      setAccountType(type);
    }

    const ref = params.get("ref");
    if (ref) {
      setReferredBy(ref);
    }
  }, []);

  async function handleRegister() {
    setError("");

    if (!accountType) {
      setError("アカウントの種類（PT／学生／一般）を選んでください");
      return;
    }

    if (!agreed) {
      setError("利用規約とプライバシーポリシーへの同意が必要です");
      return;
    }

    if (!email || !password) {
      setError("メールアドレスとパスワードを入力してください");
      return;
    }

    if (password.length < 8) {
      setError("パスワードは8文字以上にしてください");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // DBトリガー on_auth_user_created が users.account_type / referred_by に保存します
        data: {
          account_type: accountType,
          referred_by: referredBy || undefined,
          graduation_year: accountType === "student" ? graduationYear : undefined,
          // どのリンクから来たか（運営の集計用。utm_source などがあるときだけ入る）
          ...getAttribution(),
        },
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

    // 一般の方は検索から始める。PTは、他のPTに見つけてもらえるよう
    // まずプロフィール（名前・勤務先・専門分野）の入力へ案内する。
    // 学生は、名前と養成校・卒業予定年などを入れる設定画面へ案内する
    router.push(
      accountType === "general"
        ? "/pts"
        : accountType === "student"
          ? "/student/settings?welcome=1"
          : "/mypage/edit?welcome=1"
    );
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
              className="grid grid-cols-1 gap-3 sm:grid-cols-3"
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

          {accountType === "student" && (
            <div>
              <label className="mb-2 block text-sm font-medium" htmlFor="field-year">
                卒業予定（3月卒業の年）
              </label>

              <select
                id="field-year"
                value={graduationYear}
                onChange={(e) => setGraduationYear(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-sm outline-none focus:border-gray-400"
              >
                {yearOptions.map((y) => (
                  <option key={y} value={y}>
                    {y}年3月卒業予定
                  </option>
                ))}
              </select>

              <p className="mt-2 text-xs leading-5 text-gray-400">
                卒業した翌年の4月1日に、自動でPTのアカウントに切り替わります（あとから設定で変更できます）。
                養成校名や卒業予定は、本人だけに表示され、公開されません。
              </p>
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-medium" htmlFor="field-1">
              メールアドレス
            </label>

            <input id="field-1"
              type="email"
              name="email"
              autoComplete="email"
              inputMode="email"
              spellCheck={false}
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="example@email.com"
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-sm outline-none focus:border-gray-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium" htmlFor="field-2">
              パスワード
            </label>

            <input id="field-2"
              type="password"
              name="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="8文字以上"
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-sm outline-none focus:border-gray-400"
            />
          </div>

          <label className="flex items-start gap-2 text-xs text-gray-600">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300"
            />
            <span>
              <Link href="/terms" target="_blank" className="underline">
                利用規約
              </Link>
              と
              <Link href="/privacy" target="_blank" className="underline">
                プライバシーポリシー
              </Link>
              に同意します
            </span>
          </label>

          {error && (
            <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            onClick={handleRegister}
            disabled={loading || !agreed}
            className="w-full rounded-full bg-black py-3.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "登録中…" : "新規登録"}
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