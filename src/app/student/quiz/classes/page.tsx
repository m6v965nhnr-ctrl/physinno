"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { notify } from "@/lib/notify";
import { useMyAccount } from "@/lib/useMyAccount";
import {
  MyAssignment,
  MyClass,
  dueText,
  joinClass,
  leaveClass,
  listMyAssignments,
  listMyJoinedClasses,
} from "@/lib/quizClass";
import { percent } from "@/lib/quiz";

// 先生が作ったクラスに入って、配られた課題を解く画面
export default function QuizClassesPage() {
  const { loading } = useMyAccount(["student", "pt"]);

  const [classes, setClasses] = useState<MyClass[] | null>(null);
  const [assignments, setAssignments] = useState<MyAssignment[]>([]);
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const [cs, as] = await Promise.all([listMyJoinedClasses(), listMyAssignments()]);
    setClasses(cs);
    setAssignments(as);
  }, []);

  useEffect(() => {
    if (loading) return;
    load();
  }, [loading, load]);

  async function handleJoin() {
    const c = code.trim();
    if (!c || busy) return;

    if (
      !confirm(
        "このクラスの先生に、配られた課題の結果（あなたの名前と、正解・不正解）が見えるようになります。普段の自習の記録は見えません。クラスには、いつでも退出できます。参加しますか？"
      )
    ) {
      return;
    }

    setBusy(true);
    const r = await joinClass(c);
    setBusy(false);

    if (!r) {
      notify("参加コードが見つかりません。コードを確かめてください");
      return;
    }

    notify(`「${r.name}」に参加しました`);
    setCode("");
    load();
  }

  async function handleLeave(c: MyClass) {
    if (!confirm(`「${c.name}」から退出します。先生には、この課題の結果が見えなくなります。よろしいですか？`)) return;
    const ok = await leaveClass(c.id);
    if (!ok) {
      notify("退出に失敗しました");
      return;
    }
    load();
  }

  if (loading || classes === null) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-sm text-gray-400">読み込み中…</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fafafa] pb-28">
      <header className="border-b border-gray-100 bg-white px-6 py-5">
        <div className="mx-auto max-w-2xl">
          <Link href="/student/quiz" className="text-sm text-gray-400">
            ← 過去問ドリル
          </Link>
          <h1 className="mt-2 text-xl font-semibold tracking-tight">クラスの課題</h1>
          <p className="mt-1 text-xs leading-5 text-gray-500">
            先生から配られた参加コードを入れると、課題が届きます。
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-2xl space-y-4 px-6 py-5">
        <section className="rounded-2xl bg-white p-4 shadow-sm">
          <p className="text-sm font-semibold">クラスに参加する</p>
          <div className="mt-2 flex gap-2">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              maxLength={6}
              placeholder="参加コード（6文字）"
              aria-label="参加コード"
              autoCapitalize="characters"
              className="min-w-0 flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm tracking-widest"
            />
            <button
              onClick={handleJoin}
              disabled={busy || code.trim().length < 6}
              className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white disabled:opacity-40"
            >
              参加
            </button>
          </div>
        </section>

        <section>
          <h2 className="mb-2 text-sm font-semibold text-gray-700">届いている課題</h2>
          {assignments.length === 0 ? (
            <p className="rounded-2xl bg-white p-4 text-xs leading-5 text-gray-500 shadow-sm">
              課題はまだありません。先生が課題を配ると、ここに表示されます。
            </p>
          ) : (
            <ul className="space-y-2">
              {assignments.map((a) => {
                const finished = a.answered >= a.n;
                return (
                  <li key={a.id}>
                    <Link
                      href={`/student/quiz/play?assignment=${a.id}`}
                      className="block rounded-2xl bg-white p-4 shadow-sm transition hover:bg-gray-50"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-[11px] text-gray-400">{a.class_name}</p>
                          <p className="mt-0.5 text-sm font-semibold">{a.title}</p>
                          <p className="mt-1 text-xs text-gray-500">
                            {a.n}問 ・ {dueText(a.due_at)}
                          </p>
                        </div>
                        <span
                          className={`shrink-0 rounded-full px-3 py-1 text-xs ${
                            finished ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {finished
                            ? `完了 ${a.correct}/${a.n}（${percent(a.correct, a.n)}%）`
                            : a.answered > 0
                              ? `途中 ${a.answered}/${a.n}`
                              : "未着手"}
                        </span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        {classes.length > 0 && (
          <section>
            <h2 className="mb-2 text-sm font-semibold text-gray-700">参加しているクラス</h2>
            <ul className="space-y-2">
              {classes.map((c) => (
                <li key={c.id} className="flex items-center justify-between gap-3 rounded-2xl bg-white p-4 shadow-sm">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{c.name}</p>
                    {c.teacher_name && <p className="text-[11px] text-gray-400">先生: {c.teacher_name}</p>}
                  </div>
                  <button onClick={() => handleLeave(c)} className="shrink-0 text-xs text-gray-500 underline">
                    退出する
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}
