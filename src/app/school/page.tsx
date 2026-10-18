"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { askConfirm } from "@/lib/confirm";
import { notify } from "@/lib/notify";
import { useMyAccount } from "@/lib/useMyAccount";
import { AccessState, getAccessState, joinSchool, leaveSchool } from "@/lib/school";
import { LoadingScreen } from "@/components/states";

const MESSAGE: Record<string, string> = {
  not_found: "学校コードが見つかりません。先生から伝えられたコードを、確かめてください",
  inactive: "この学校のご利用期間が、終わっているか、停止されています。学校の担当の先生に、確かめてください",
  already_member: "すでに、別の学校に所属しています。変えたいときは、いまの学校から外れてから、入れ直してください",
  full: "この学校の、利用できる人数が、いっぱいです。学校の担当の先生に、確かめてください",
  throttled: "コードの間違いが続いたため、しばらく入れられません。1時間ほどあけて、先生に確かめてからお試しください",
  failed: "うまくいきませんでした。もう一度お試しください",
};

// 学校コードを入れて、学校に所属する。先生も学生も、同じコード（先生の機能は、運営の承認が別に必要）
export default function SchoolPage() {
  const { loading, accountType } = useMyAccount(["student", "pt", "teacher"], "/study");
  const [state, setState] = useState<AccessState | null | undefined>(undefined);
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [tried, setTried] = useState(false);

  const load = useCallback(async () => setState(await getAccessState()), []);
  useEffect(() => {
    if (!loading) load();
  }, [loading, load]);

  if (loading || state === undefined) return <LoadingScreen />;

  const back = accountType === "teacher" ? "/student/quiz/teacher" : "/study";

  async function handleJoin() {
    if (busy) return;
    if (code.trim().length < 8) {
      setTried(true);
      return;
    }
    setBusy(true);
    const r = await joinSchool(code.trim());
    setBusy(false);
    if (!r.ok) {
      notify(MESSAGE[r.reason]);
      return;
    }
    notify(`「${r.name}」に所属しました`);
    setCode("");
    load();
  }

  async function handleLeave() {
    if (!(await askConfirm("この学校から外れます。学校のクラスは使えなくなり、学校コードが必要な設定では、一問一答も使えなくなります。よろしいですか？", { okLabel: "外れる", danger: true }))) return;
    if (!(await leaveSchool())) {
      notify("外れられませんでした");
      return;
    }
    load();
  }

  const s = state?.school;

  return (
    <main className="min-h-screen bg-[#fafafa] pb-28">
      <header className="border-b border-gray-100 bg-white px-6 py-5">
        <div className="mx-auto max-w-2xl">
          <Link href={back} className="text-sm text-gray-400">
            ← もどる
          </Link>
          <h1 className="mt-2 text-xl font-semibold tracking-tight">学校コード</h1>
          <p className="mt-1 text-xs leading-5 text-gray-500">学校のコードを入れると、その学校の一問一答（クラス・テスト・学習状況）を使えます。コードは、学校の先生から伝えられます。</p>
        </div>
      </header>

      <div className="mx-auto max-w-2xl space-y-4 px-6 py-5">
        {s ? (
          <section className="space-y-2 rounded-2xl bg-white p-4 shadow-sm">
            <p className="text-xs text-gray-400">所属している学校</p>
            <p className="text-base font-semibold">{s.name}</p>
            <p className="text-xs text-gray-600">
              {s.role === "teacher" ? "先生として所属" : "学生として所属"}
              {s.valid_until ? ` ・ ご利用期間: ${s.valid_until} まで` : ""}
              {!s.active && <span className="ml-2 rounded-full bg-red-50 px-2 py-0.5 text-red-700">いまは利用できません（期間が終わった、または、停止中）</span>}
            </p>
            <button onClick={handleLeave} className="pt-1 text-xs text-gray-400 underline">
              この学校から外れる
            </button>
          </section>
        ) : (
          <section className="space-y-2 rounded-2xl bg-white p-4 shadow-sm">
            <p className="text-sm font-semibold">学校コードを入れる</p>
            <div className="flex gap-2">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                maxLength={8}
                placeholder="学校コード（8文字）"
                aria-label="学校コード"
                autoCapitalize="characters"
                className="min-w-0 flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm tracking-widest"
              />
              <button onClick={handleJoin} disabled={busy} className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white disabled:opacity-40">
                所属する
              </button>
            </div>
            {tried && code.trim().length < 8 && (
              <p className="text-xs text-red-600" role="status">
                入れられない理由：学校コードは、8文字です
              </p>
            )}
            <p className="text-[11px] leading-5 text-gray-400">学校には、1つだけ所属できます。コードを知っていても、他の学校のデータは見えません。</p>
          </section>
        )}

        {state?.required && !state.has_access && (
          <section className="rounded-2xl bg-amber-50 p-4 text-xs leading-6 text-amber-900">
            一問一答は、学校コードで所属した人が使えます。上のコードを入れると、使えるようになります。
          </section>
        )}
      </div>
    </main>
  );
}
