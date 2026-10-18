"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { notify } from "@/lib/notify";
import { useMyAccount } from "@/lib/useMyAccount";
import { useRequireQuizAccess } from "@/lib/useQuizAccess";
import {
  MyAssignment,
  MyClass,
  dueText,
  getMyClassSharing,
  joinClass,
  setShareProgress,
  leaveClass,
  listMyAssignments,
  listMyJoinedClasses,
} from "@/lib/quizClass";
import { percent } from "@/lib/quiz";
import { askConfirm } from "@/lib/confirm";
import { LoadingScreen } from "@/components/states";

// 先生が作ったクラスに入って、配られた課題を解く画面
export default function QuizClassesPage() {
  useRequireQuizAccess();
  const { loading } = useMyAccount(["student", "pt"]);

  const [classes, setClasses] = useState<MyClass[] | null>(null);
  const [assignments, setAssignments] = useState<MyAssignment[]>([]);
  const [code, setCode] = useState("");
  // 一問一答の進み具合を、先生に見せるか（参加するときに選ぶ。あとから、クラスごとに変えられる）
  const [shareOnJoin, setShareOnJoin] = useState(true);
  const [sharing, setSharing] = useState<Record<string, boolean>>({});
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const [cs, as, sh] = await Promise.all([listMyJoinedClasses(), listMyAssignments(), getMyClassSharing()]);
    setSharing(sh);
    setClasses(cs);
    setAssignments(as);
  }, []);

  useEffect(() => {
    if (loading) return;
    load();
    // 先生が送った参加用のURL（?code=XXXXXX）から開いたときは、コードを入れておく（参加は、確認のあとに本人が押す）
    const c = new URLSearchParams(window.location.search).get("code");
    if (c) setCode(c.trim().toUpperCase().slice(0, 6));
  }, [loading, load]);

  async function handleJoin() {
    const c = code.trim();
    if (!c || busy) return;

    if (
      !await askConfirm(
        `このクラスの先生に、配られた課題の結果（あなたの名前と、正解・不正解）が見えるようになります。${
          shareOnJoin
            ? "あわせて、一問一答の進み具合（解いた数・正答率・分野ごとの正答率・最後に解いた日）も、先生に見えます。"
            : "一問一答の進み具合（自分で解いた記録）は、先生に見えません。"
        }どちらも、あとから変えられます。クラスには、いつでも退出できます。参加しますか？`
      )
    ) {
      return;
    }

    setBusy(true);
    const r = await joinClass(c);
    setBusy(false);

    if (r === "throttled") {
      notify("コードの間違いが続いたため、しばらく参加できません。1時間ほどあけて、先生に確かめてからお試しください");
      return;
    }
    if (r === "other_school") {
      notify("このクラスは、別の学校のクラスです。学校コードで、同じ学校に所属しているか、確かめてください");
      return;
    }
    if (!r) {
      notify("参加コードが見つかりません。コードを確かめてください");
      return;
    }

    // 進み具合の共有は、参加するときの選択のとおりにする
    await setShareProgress(r.id, shareOnJoin);
    notify(`「${r.name}」に参加しました`);
    setCode("");
    load();
  }

  async function handleLeave(c: MyClass) {
    if (!await askConfirm(`「${c.name}」から退出します。先生には、この課題の結果が見えなくなります。よろしいですか？`)) return;
    const ok = await leaveClass(c.id);
    if (!ok) {
      notify("退出に失敗しました");
      return;
    }
    load();
  }

  if (loading || classes === null) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <main className="min-h-screen bg-[#fafafa] pb-28">
      <header className="border-b border-gray-100 bg-white px-6 py-5">
        <div className="mx-auto max-w-2xl">
          <Link href="/study" className="text-sm text-gray-400">
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
          <label className="mt-2 flex items-start gap-2 text-xs leading-5 text-gray-600">
            <input type="checkbox" checked={shareOnJoin} onChange={(e) => setShareOnJoin(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0" />
            <span>一問一答の進み具合（解いた数・正答率・分野ごと）も、先生に見せる。あとから、いつでも変えられます。</span>
          </label>
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
                  <div className="flex shrink-0 flex-col items-end gap-1.5">
                    <label className="flex items-center gap-1.5 text-[11px] text-gray-600">
                      <input
                        type="checkbox"
                        checked={!!sharing[c.id]}
                        onChange={async (e) => {
                          const v = e.target.checked;
                          setSharing((m) => ({ ...m, [c.id]: v }));
                          if (!(await setShareProgress(c.id, v))) {
                            setSharing((m) => ({ ...m, [c.id]: !v }));
                            notify("変更できませんでした");
                          }
                        }}
                        className="h-4 w-4"
                      />
                      進み具合を先生に見せる
                    </label>
                    <button onClick={() => handleLeave(c)} className="text-xs text-gray-500 underline">
                      退出する
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}
