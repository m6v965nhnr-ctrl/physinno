"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { getAttribution } from "@/lib/attribution";
import { trackRegistration } from "@/lib/metaPixel";
import { track } from "@vercel/analytics";
import { graduationYearOptions } from "@/lib/student";
import { rememberReturnTo, signupFromPath, takeReturnTo } from "@/lib/returnTo";

type AccountType = "pt" | "general" | "student" | "teacher";

// 先生（大学・専門学校）は、種類を選ばせず、専用の入力欄だけにする（/register?type=teacher）。PTのプロフィールは作らない
// 採用担当（病院・施設・企業）は、一般として登録し、登録後に /org で組織をつくる（/register?type=org）

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
    value: "teacher",
    label: "教員（養成校の先生）",
    description: "クラス・テストをつくって、学生の状況を見る",
  },
  {
    value: "general",
    label: "一般",
    description: "PTを探す・レビューを書く",
  },
];

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState<AccountType | null>(null);
  const [isOrg, setIsOrg] = useState(false);
  const [orgName, setOrgName] = useState("");
  const isTeacher = accountType === "teacher";
  const [school, setSchool] = useState("");
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [icon, setIcon] = useState<File | null>(null);
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
    if (type === "pt" || type === "general" || type === "student" || type === "teacher") {
      setAccountType(type);
    }
    if (type === "org") {
      setIsOrg(true);
    }

    // ゲストとして見ていた画面（?next=）を覚えておき、プロフィールの入力が終わったら、そこへ戻す
    rememberReturnTo(params.get("next"));

    const ref = params.get("ref");
    if (ref) {
      setReferredBy(ref);
    }
  }, []);

  async function handleRegister() {
    setError("");

    if (!isTeacher && !isOrg && !accountType) {
      setError("アカウントの種類（PT／学生／教員／一般）を選んでください");
      return;
    }

    if (isTeacher && (!school.trim() || !faculty.trim() || !department.trim())) {
      setError("学校名・学部名・学科名を入力してください");
      document.getElementById("field-school")?.focus();
      return;
    }

    if (isTeacher && (!icon || !icon.type.startsWith("image/") || icon.size > 5 * 1024 * 1024)) {
      setError("アイコンの画像を1枚選んでください（5MBまで）");
      return;
    }

    if (isOrg && !orgName.trim()) {
      setError("病院名・法人名を入力してください");
      document.getElementById("field-org-name")?.focus();
      return;
    }

    if (!agreed) {
      setError("利用規約とプライバシーポリシーへの同意が必要です");
      return;
    }

    if (!fullName.trim()) {
      setError("名前を入力してください");
      document.getElementById("field-name")?.focus();
      return;
    }

    if (!email || !password) {
      setError("メールアドレスとパスワードを入力してください");
      return;
    }

    // 先生は、学生の結果を扱うので、パスワードは10文字以上
    const minLen = isTeacher ? 10 : 8;
    if (password.length < minLen) {
      setError(`パスワードは${minLen}文字以上にしてください`);
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // DBトリガー on_auth_user_created が users.account_type / referred_by に保存します
        data: {
          account_type: isTeacher ? "teacher" : isOrg ? "org" : accountType,
          // 先生: 所属・補足は、運営が承認の確認に使う（DBトリガーが先生の申請を作る）
          school: isTeacher ? `${school.trim()} ${faculty.trim()} ${department.trim()}`.slice(0, 100) : undefined,
          org_name: isOrg ? orgName.trim().slice(0, 100) : undefined,
          full_name: fullName.trim().slice(0, 50),
          referred_by: referredBy || undefined,
          graduation_year: accountType === "student" ? graduationYear : undefined,
          // どのリンクから来たか（運営の集計用。utm_source などがあるときだけ入る）
          ...getAttribution(),
          // どの画面から登録が始まったか（パスだけ。運営の集計用）
          signup_from: signupFromPath(),
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

    trackRegistration();
    // 種類ごとの登録数（個人は特定できない。/register は集計の許可パス）
    track("register_done", { type: isTeacher ? "teacher" : isOrg ? "org" : accountType ?? "" });

    // 先生の学校・学部・学科・アイコン（ログインできた場合は、ここで保存。できなかったときは、アカウントの画面で入れられる）
    if (isTeacher && icon && data.session) {
      const path = `${data.user.id}/${Date.now()}.${icon.name.split(".").pop() || "jpg"}`;
      const up = await supabase.storage.from("profile-images").upload(path, icon, { upsert: true, contentType: icon.type });
      const iconUrl = up.error ? null : supabase.storage.from("profile-images").getPublicUrl(path).data.publicUrl;
      await supabase.from("teacher_profiles").insert({
        user_id: data.user.id,
        school_name: school.trim().slice(0, 100),
        faculty: faculty.trim().slice(0, 100),
        department: department.trim().slice(0, 100),
        icon_url: iconUrl,
      });
    }

    // 組織名は、ここで登録しておく（/orgで、残りの情報を入れて運営の確認に出す）
    if (isOrg && data.session) {
      await supabase.from("organizations").insert({
        name: orgName.trim().slice(0, 100),
        facility_category: "病院・医療機関",
        owner_id: data.user.id,
      });
    }

    // 一般の方は検索から始める。PTは、他のPTに見つけてもらえるよう
    // まずプロフィール（名前・勤務先・専門分野）の入力へ案内する。
    // 学生は、名前と養成校・卒業予定年などを入れる設定画面へ案内する
    router.push(
      isTeacher
        ? "/student/quiz/teacher"
        : isOrg
        ? "/org"
        : accountType === "general"
        ? (takeReturnTo() ?? "/pts")
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
          {isTeacher ? "先生の新規登録" : isOrg ? "採用担当の新規登録" : "新規登録"}
        </h1>

        <p className="mt-3 text-sm text-gray-500">
          {isTeacher
            ? "養成校の教員向けです。クラスとテストをつくって、学生の状況を見られます。"
            : isOrg
            ? "病院・施設・企業の採用担当向けです。登録後に組織の情報を入れると、運営の確認のあと、求人の掲載やPTへのスカウトができます。"
            : "Re:lightをはじめましょう"}
        </p>

        <div className="mt-10 space-y-5">

          {!isOrg && (
          <div>
            <p className="mb-2 block text-sm font-medium">
              アカウントの種類 <span className="text-xs font-normal text-red-500">（必須）</span>
            </p>

            <div
              role="radiogroup"
              aria-label="アカウントの種類"
              className="grid grid-cols-1 gap-3 sm:grid-cols-2"
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
                        selected ? "text-white/90" : "text-gray-500"
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
          )}

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
            <label className="mb-2 block text-sm font-medium" htmlFor="field-name">
              名前 <span className="text-xs font-normal text-red-500">（必須）</span>
            </label>

            <input id="field-name"
              type="text"
              name="name"
              autoComplete="name"
              maxLength={50}
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={accountType === "student" ? "山田 太郎（ニックネームでも可）" : "山田 太郎"}
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-sm outline-none focus:border-gray-400"
            />

            <p className="mt-2 text-xs leading-5 text-gray-400">
              {isTeacher
                ? "クラスに参加した学生に、先生の名前として表示されます。"
                : isOrg
                ? "担当者の名前です。"
                : "コメントやメッセージで、ほかのユーザーに表示されます。あとから変更できます。"}
            </p>
          </div>

          {isOrg && (
            <div>
              <label className="mb-2 block text-sm font-medium" htmlFor="field-org-name">
                病院名・法人名 <span className="text-xs font-normal text-red-500">（必須）</span>
              </label>

              <input id="field-org-name"
                type="text"
                maxLength={100}
                required
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                placeholder="例：〇〇病院、株式会社〇〇"
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-sm outline-none focus:border-gray-400"
              />

              <p className="mt-2 text-xs leading-5 text-gray-400">
                施設の種類・所在地などの残りの情報は、登録のあとに入れます。運営が確認すると、求人の掲載とスカウトができます。
              </p>
            </div>
          )}

          {isTeacher && (
            <>
              {[
                ["field-school", "学校名", school, setSchool, "例：○○大学"],
                ["field-faculty", "学部名", faculty, setFaculty, "例：保健医療学部"],
                ["field-department", "学科名", department, setDepartment, "例：理学療法学科"],
              ].map(([id, label, v, set, ph]) => (
                <div key={id as string}>
                  <label className="mb-2 block text-sm font-medium" htmlFor={id as string}>
                    {label as string} <span className="text-xs font-normal text-red-500">（必須）</span>
                  </label>
                  <input
                    id={id as string}
                    type="text"
                    maxLength={100}
                    value={v as string}
                    onChange={(e) => (set as (x: string) => void)(e.target.value)}
                    placeholder={ph as string}
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-sm outline-none focus:border-gray-400"
                  />
                </div>
              ))}

              <div>
                <label className="mb-2 block text-sm font-medium" htmlFor="field-icon">
                  アイコン（画像1枚） <span className="text-xs font-normal text-red-500">（必須）</span>
                </label>
                <input id="field-icon" type="file" accept="image/*" onChange={(e) => setIcon(e.target.files?.[0] ?? null)} className="block w-full text-sm" />
                <p className="mt-2 text-xs leading-5 text-gray-400">
                  学校・学部・学科は、運営が先生であることを確認するために使います。確認が済むと、クラスと課題を作れるようになります。
                </p>
              </div>
            </>
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
              placeholder={isTeacher ? "10文字以上" : "8文字以上"}
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
              <Link href="/terms" target="_blank" rel="noopener" className="underline">
                利用規約
              </Link>
              と
              <Link href="/privacy" target="_blank" rel="noopener" className="underline">
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

          {/* アカウントの種類と名前は、必須。そろうまで、登録できない（足りないものを、ボタンの上に出す） */}
          {(() => {
            const missing = [!isTeacher && !isOrg && !accountType && "アカウントの種類", !fullName.trim() && "名前", isOrg && !orgName.trim() && "病院名・法人名", isTeacher && (!school.trim() || !faculty.trim() || !department.trim()) && "学校・学部・学科", isTeacher && !icon && "アイコン", !agreed && "利用規約への同意"].filter(Boolean);
            return missing.length > 0 ? (
              <p className="text-center text-xs text-red-600" role="status">
                未入力：{missing.join("・")}
              </p>
            ) : null;
          })()}

          <button
            onClick={handleRegister}
            disabled={loading || !agreed || (!isTeacher && !isOrg && !accountType) || !fullName.trim() || (isOrg && !orgName.trim()) || (isTeacher && (!school.trim() || !faculty.trim() || !department.trim() || !icon))}
            className="w-full rounded-full bg-black py-3.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "登録中…" : isTeacher ? "先生として登録" : "新規登録"}
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