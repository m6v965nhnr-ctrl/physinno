"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LoadingScreen } from "@/components/states";
import { notify } from "@/lib/notify";
import { useMyAccount } from "@/lib/useMyAccount";
import { MyClass, listMyJoinedClasses, postClassMessage } from "@/lib/quizClass";

// 学生から先生への質問。匿名にするか、選べる。質問と回答は、クラスのチャットに流れる（クラスのみんなが読める）
export default function AskTeacherPage() {
  const { loading } = useMyAccount(["student", "pt"]);
  const [classes, setClasses] = useState<MyClass[] | null>(null);
  const [classId, setClassId] = useState("");
  const [text, setText] = useState("");
  const [anonymous, setAnonymous] = useState(true);
  const [busy, setBusy] = useState(false);
  const [sentTo, setSentTo] = useState<string | null>(null);

  useEffect(() => {
    if (loading) return;
    listMyJoinedClasses().then((cs) => {
      setClasses(cs);
      setClassId(cs[0]?.id ?? "");
    });
  }, [loading]);

  async function send() {
    if (!classId || !text.trim() || busy) return;
    setBusy(true);
    const ok = await postClassMessage(classId, "question", text.trim(), { anonymous });
    setBusy(false);
    if (!ok) return notify("送れませんでした。しばらくしてから、もう一度お試しください");
    setText("");
    setSentTo(classId);
  }

  if (loading || classes === null) return <LoadingScreen />;

  return (
    <main className="min-h-screen bg-[#fafafa] pb-28">
      <header className="border-b border-gray-100 bg-white px-6 py-5">
        <div className="mx-auto max-w-2xl">
          <Link href="/study" className="text-sm text-gray-400">← 勉強にもどる</Link>
          <h1 className="mt-1 text-xl font-semibold tracking-tight">先生に質問</h1>
        </div>
      </header>
      <div className="mx-auto max-w-2xl space-y-4 px-6 py-5">
        {classes.length === 0 ? (
          <section className="rounded-2xl bg-white p-4 text-sm leading-6 text-gray-700 shadow-sm">
            <p>質問するには、先生のクラスに参加してください。先生から送られたクラスコードを、入れると参加できます。</p>
            <Link href="/student/quiz/classes" className="mt-3 inline-block rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white">クラスに参加する</Link>
          </section>
        ) : (
          <section className="space-y-3 rounded-2xl bg-white p-4 shadow-sm">
            {classes.length > 1 && (
              <select value={classId} onChange={(e) => setClassId(e.target.value)} aria-label="クラスを選ぶ" className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm">
                {classes.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            )}
            <textarea value={text} onChange={(e) => setText(e.target.value)} rows={5} maxLength={1000} placeholder="先生への質問を入力" aria-label="質問の内容" className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm leading-6" />
            <div role="radiogroup" aria-label="匿名にするか" className="grid grid-cols-2 gap-2">
              {([[true, "匿名で送る"], [false, "名前を出して送る"]] as const).map(([v, label]) => (
                <button key={label} type="button" role="radio" aria-checked={anonymous === v} onClick={() => setAnonymous(v)} className={`rounded-xl border px-3 py-2 text-sm font-medium ${anonymous === v ? "border-black bg-black text-white" : "border-gray-300 text-gray-700"}`}>
                  {label}
                </button>
              ))}
            </div>
            <p className="text-[11px] leading-5 text-gray-400">
              {anonymous ? "匿名にすると、先生にも、クラスのみんなにも、名前は出ません。" : "あなたの名前が、先生とクラスのみんなに出ます。"}
              質問と先生の回答は、クラスのチャットに流れて、クラスのみんなが読めます。
            </p>
            <button type="button" onClick={send} disabled={busy || !text.trim()} className="w-full rounded-full bg-black py-2.5 text-sm font-medium text-white disabled:opacity-40">
              質問を送る
            </button>
            {sentTo && (
              <p className="text-xs text-emerald-700" role="status">
                送りました。回答は、<Link href={`/student/quiz/classes/chat?id=${sentTo}`} className="underline">クラスのチャット</Link>に届きます。
              </p>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
