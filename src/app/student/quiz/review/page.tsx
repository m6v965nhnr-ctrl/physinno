"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LoadingScreen } from "@/components/states";
import { useMyAccount } from "@/lib/useMyAccount";
import { TestReview, listMyReviews } from "@/lib/quizClass";

const pt = (correct: number, n: number) => (n > 0 ? Math.round((correct / n) * 1000) / 10 : 0);

// 先生が配ったテストの振り返り。点数・平均点・中央値・クラスでの順位・偏差値
export default function TestReviewPage() {
  const { loading } = useMyAccount(["student", "pt"]);
  const [list, setList] = useState<TestReview[] | null>(null);

  useEffect(() => {
    if (!loading) listMyReviews().then(setList);
  }, [loading]);

  if (loading || list === null) return <LoadingScreen />;

  return (
    <main className="min-h-screen bg-[#fafafa] pb-28">
      <header className="border-b border-gray-100 bg-white px-6 py-5">
        <div className="mx-auto max-w-2xl">
          <Link href="/study" className="text-sm text-gray-400">← 勉強にもどる</Link>
          <h1 className="mt-1 text-xl font-semibold tracking-tight">テスト振り返り</h1>
          <p className="mt-1 text-xs leading-5 text-gray-500">先生のテストを最後まで解くと、ここに出ます。点数は100点満点にしています。</p>
        </div>
      </header>
      <div className="mx-auto max-w-2xl space-y-3 px-6 py-5">
        {list.length === 0 ? (
          <section className="rounded-2xl bg-white p-4 text-sm leading-6 text-gray-600 shadow-sm">
            <p>まだ、最後まで解いたテストがありません。</p>
            <Link href="/student/quiz/classes" className="mt-3 inline-block rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white">クラスのテストへ</Link>
          </section>
        ) : (
          list.map((t) => (
            <section key={t.id} className="rounded-2xl bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold">{t.title}</p>
              <p className="mt-0.5 text-[11px] text-gray-500">{t.class_name} ・ {new Date(t.created_at).toLocaleDateString("ja-JP")} ・ {t.n}問</p>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                {[
                  ["あなたの点数", `${pt(t.my_correct, t.n)}点`, `${t.my_correct}/${t.n}問正解`],
                  ["平均点", `${pt(t.mean, t.n)}点`, ""],
                  ["中央値", `${pt(t.median, t.n)}点`, ""],
                  ["順位", `${t.rank}位`, `${t.participants}人中`],
                  ["偏差値", t.deviation === null ? "-" : String(t.deviation), t.deviation === null ? "2人以上で出ます" : ""],
                ].map(([label, v, sub]) => (
                  <div key={label} className="rounded-xl bg-gray-50 p-2">
                    <p className="text-[10px] text-gray-500">{label}</p>
                    <p className="mt-0.5 text-base font-bold">{v}</p>
                    {sub && <p className="text-[10px] text-gray-400">{sub}</p>}
                  </div>
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </main>
  );
}
