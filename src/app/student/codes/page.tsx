"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { askConfirm } from "@/lib/confirm";
import { notify } from "@/lib/notify";
import { useMyAccount } from "@/lib/useMyAccount";
import { AccessState, getAccessState, joinSchool } from "@/lib/school";
import { MyClass, joinClass, leaveClass, listMyJoinedClasses, setShareProgress } from "@/lib/quizClass";
import { LoadingScreen } from "@/components/states";
import { INPUT_CLASS, PRIMARY_BUTTON_CLASS } from "@/lib/ui";

const SCHOOL_MESSAGE: Record<string, string> = {
  not_found: "学校コードが見つかりません。先生から伝えられたコードを、確かめてください",
  inactive: "この学校のご利用期間が、終わっているか、停止されています。学校の担当の先生に、確かめてください",
  already_member: "すでに、別の学校に所属しています。変えたいときは、いまの学校から外れてから、入れ直してください",
  full: "この学校の、利用できる人数が、いっぱいです。学校の担当の先生に、確かめてください",
  throttled: "コードの間違いが続いたため、しばらく入れられません。1時間ほどあけて、先生に確かめてからお試しください",
  failed: "うまくいきませんでした。もう一度お試しください",
};

// 学校コード（同じ学校の人をまとめる）と、クラスコード（先生が作ったクラスに入る）を、1つの画面で登録する
export default function CodesPage() {
  const { loading } = useMyAccount(["student", "pt", "teacher"], "/study");
  const [access, setAccess] = useState<AccessState | null | undefined>(undefined);
  const [classes, setClasses] = useState<MyClass[]>([]);
  const [schoolCode, setSchoolCode] = useState("");
  const [classCode, setClassCode] = useState("");
  const [share, setShare] = useState(false);
  const [busy, setBusy] = useState<"" | "school" | "class">("");

  const load = useCallback(async () => {
    const [a, c] = await Promise.all([getAccessState(), listMyJoinedClasses().catch(() => [])]);
    setAccess(a);
    setClasses(c);
  }, []);
  useEffect(() => {
    if (!loading) load();
  }, [loading, load]);

  useEffect(() => {
    // 先生が送った参加用のURL（?code=XXXXXX）から開いたときは、クラスコードを入れておく
    const c = new URLSearchParams(window.location.search).get("code");
    if (c) setClassCode(c.trim().toUpperCase().slice(0, 12));
  }, []);

  if (loading || access === undefined) return <LoadingScreen />;
  const school = access?.school ?? null;

  async function handleSchool() {
    const c = schoolCode.trim();
    if (busy || c.length < 8) return notify("学校コードは、8文字です");
    setBusy("school");
    const r = await joinSchool(c);
    setBusy("");
    if (!r.ok) return notify(SCHOOL_MESSAGE[r.reason]);
    notify(`「${r.name}」に所属しました`);
    setSchoolCode("");
    load();
  }

  async function handleClass() {
    const c = classCode.trim();
    if (busy || !c) return;
    if (!(await askConfirm(`このクラスの先生に、配られた課題の結果（あなたの名前と、正解・不正解）が見えるようになります。${share ? "あわせて、一問一答の進み具合も、先生に見えます。" : "一問一答の進み具合は、先生に見えません。"}どちらも、あとから変えられます。クラスには、いつでも退出できます。参加しますか？`))) return;
    setBusy("class");
    const r = await joinClass(c);
    setBusy("");
    if (r === "throttled") return notify("コードの間違いが続いたため、しばらく参加できません。1時間ほどあけて、先生に確かめてからお試しください");
    if (r === "other_school") return notify("このクラスは、別の学校のクラスです。学校コードで、同じ学校に所属しているか、確かめてください");
    if (!r) return notify("クラスコードが見つかりません。コードを確かめてください");
    await setShareProgress(r.id, share);
    notify(`「${r.name}」に参加しました`);
    setClassCode("");
    load();
  }

  async function handleLeave(c: MyClass) {
    if (!(await askConfirm(`「${c.name}」から退出します。先生には、この課題の結果が見えなくなります。よろしいですか？`))) return;
    if (!(await leaveClass(c.id))) return notify("退出に失敗しました");
    notify("退出しました");
    load();
  }

  return (
    <main className="min-h-screen bg-[#fafafa] px-5 py-8 pb-28">
      <div className="mx-auto max-w-md space-y-4">
        <Link href="/study" className="text-sm text-gray-400">← 勉強へ</Link>
        <h1 className="text-xl font-semibold tracking-tight">コードを登録</h1>
        <p className="text-xs leading-5 text-gray-500">
          先に、先生から渡された<b>学校コード</b>を入れて、同じ学校の人をまとめます。そのあと、先生がクラスを作った場合は、<b>クラスコード</b>を入れると、そのクラスの課題やテストが届きます。
        </p>

        <section className="space-y-2 rounded-2xl bg-white p-4 shadow-sm" aria-labelledby="c-school">
          <h2 id="c-school" className="text-sm font-semibold">① 学校コード</h2>
          {school ? (
            <p className="text-sm text-gray-700">🏫 <b>{school.name}</b> に、{school.role === "teacher" ? "先生" : "学生"}として所属しています。<Link href="/school" className="ml-1 text-xs text-gray-500 underline">変更・外れる</Link></p>
          ) : (
            <>
              <input value={schoolCode} onChange={(e) => setSchoolCode(e.target.value.toUpperCase().replace(/\s/g, "").slice(0, 8))} placeholder="学校コード（8文字）" aria-label="学校コード" autoCapitalize="characters" className={INPUT_CLASS} />
              <button type="button" onClick={handleSchool} disabled={busy !== "" || schoolCode.length < 8} className={PRIMARY_BUTTON_CLASS}>{busy === "school" ? "確認中…" : "学校に所属する"}</button>
            </>
          )}
        </section>

        <section className="space-y-2 rounded-2xl bg-white p-4 shadow-sm" aria-labelledby="c-class">
          <h2 id="c-class" className="text-sm font-semibold">② クラスコード</h2>
          {classes.length > 0 && (
            <ul className="space-y-1">
              {classes.map((c) => (
                <li key={c.id} className="flex items-center justify-between rounded-xl bg-gray-50 px-3 py-2 text-sm">
                  <span>📋 {c.name}{c.teacher_name ? <span className="ml-1 text-xs text-gray-500">（{c.teacher_name}先生）</span> : null}</span>
                  <button type="button" onClick={() => handleLeave(c)} className="text-xs text-gray-500 underline">退出</button>
                </li>
              ))}
            </ul>
          )}
          <input value={classCode} onChange={(e) => setClassCode(e.target.value.toUpperCase().replace(/\s/g, "").slice(0, 12))} placeholder="クラスコード（先生が作ったクラスの6文字）" aria-label="クラスコード" autoCapitalize="characters" className={INPUT_CLASS} />
          <label className="flex items-start gap-2 text-xs leading-5 text-gray-600">
            <input type="checkbox" checked={share} onChange={(e) => setShare(e.target.checked)} className="mt-1" />
            一問一答の進み具合（解いた数・正答率）も、先生に見せる（あとから変えられます）
          </label>
          <button type="button" onClick={handleClass} disabled={busy !== "" || !classCode.trim()} className={PRIMARY_BUTTON_CLASS}>{busy === "class" ? "確認中…" : "クラスに参加する"}</button>
          <Link href="/student/quiz/classes" className="block text-center text-xs text-gray-500 underline">配られた課題を見る</Link>
        </section>
      </div>
    </main>
  );
}
