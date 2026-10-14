"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { getMyAccountTypeChecked, landingPathFor, setMyAccountType } from "@/lib/account";
import StudentSetupForm from "@/components/StudentSetupForm";

// アカウントの種類が未設定の人が、最初に必ず通る画面（ここで決めるまで、他の画面には進めない）。
// プロフィール編集まで行かなくても、ここで「PT」か「学生」を選べる
export default function SetupAccountPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const [choice, setChoice] = useState<"pt" | "student" | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!alive) return;
      if (!session) {
        router.replace("/login");
        return;
      }
      const result = await getMyAccountTypeChecked(session.user.id);
      if (!alive) return;
      // 通信に失敗したときは、設定を求めない（設定済みの人の種類を、上書きしてしまわないため）
      if (!result.ok) {
        setLoadFailed(true);
        return;
      }
      // すでに設定済みの人は、ここに用はない
      if (result.type) {
        router.replace(landingPathFor(result.type));
        return;
      }
      setReady(true);
    })();
    return () => {
      alive = false;
    };
  }, [router]);

  async function pick(type: "pt" | "general") {
    if (saving) return;
    setSaving(true);
    setError("");
    const message = await setMyAccountType(type);
    setSaving(false);
    if (message) {
      setError(message);
      return;
    }
    // 画面の確認（PTは、初回のプロフィール入力など）は、移動先で行われる
    window.location.href = landingPathFor(type);
  }

  if (loadFailed) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-white px-6 text-center">
        <p className="text-sm text-gray-600">読み込めませんでした。通信を確認して、もう一度お試しください。</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white"
        >
          もう一度読み込む
        </button>
      </main>
    );
  }

  if (!ready) {
    return <main className="min-h-dvh bg-white" />;
  }

  const card = (on: boolean) =>
    `block w-full rounded-2xl border-2 px-5 py-4 text-left transition ${
      on ? "border-gray-900 bg-gray-50" : "border-gray-200 bg-white hover:border-gray-400"
    }`;

  return (
    <main className="min-h-dvh bg-white px-6 py-12">
      <div className="mx-auto max-w-md">
        <p className="text-sm font-semibold text-gray-500">Re:light</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-gray-900">
          アカウントの種類を教えてください
        </h1>
        <p className="mt-3 text-sm leading-6 text-gray-600">
          選ぶと、論文検索や国試の過去問など、あなたに合った機能が使えるようになります。あとで変えることもできます。
        </p>

        <div className="mt-6 space-y-3">
          <button type="button" onClick={() => pick("pt")} disabled={saving} className={card(false)}>
            <span className="block text-base font-semibold text-gray-900">理学療法士（PT）</span>
            <span className="mt-1 block text-xs leading-5 text-gray-500">
              論文検索・臨床アイデア・症例の共有・研修情報
            </span>
          </button>

          <button
            type="button"
            onClick={() => setChoice(choice === "student" ? null : "student")}
            aria-expanded={choice === "student"}
            className={card(choice === "student")}
          >
            <span className="block text-base font-semibold text-gray-900">学生</span>
            <span className="mt-1 block text-xs leading-5 text-gray-500">
              国試の過去問・実習と就活の管理・先輩PTに質問
            </span>
          </button>
          {choice === "student" && <StudentSetupForm />}
        </div>

        {error && <p className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-xs text-red-600">{error}</p>}

        <button
          type="button"
          onClick={() => pick("general")}
          disabled={saving}
          className="mt-8 block w-full text-center text-xs text-gray-500 underline underline-offset-4 disabled:opacity-50"
        >
          理学療法士でも学生でもない（一般の方）
        </button>

        <p className="mt-6 text-center text-[11px] leading-5 text-gray-400">
          資格は自己申告です。
        </p>
      </div>
    </main>
  );
}
