"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { notify } from "@/lib/notify";
import { SchoolRanking, SchoolRankRow, getSchoolRanking, setRankingHidden } from "@/lib/quiz";

const MEDAL = ["🥇", "🥈", "🥉"];

function displayName(row: SchoolRankRow) {
  if (row.is_me) return `${row.name ?? "あなた"}（あなた）`;
  return row.name ?? "匿名の学生";
}

// 同じ学校で登録している学生どうしの、一問一答の正解数ランキング
// - 1〜3位は大きく、4〜10位は開いて見る（プルダウン）
// - 11位より下の人は、自分の順位だけがわかる
export default function QuizSchoolRanking() {
  const [data, setData] = useState<SchoolRanking | null | undefined>(undefined);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getSchoolRanking().then(setData);
  }, []);

  if (data === undefined) {
    return (
      <section className="rounded-2xl border border-[var(--relight-line)] bg-white p-4 shadow-sm">
        <p className="text-sm text-gray-400">ランキングを読み込み中…</p>
      </section>
    );
  }
  if (data === null) return null;

  if (!data.school) {
    return (
      <section className="rounded-2xl border border-[var(--relight-line)] bg-white p-4 shadow-sm">
        <p className="text-sm font-semibold">🏆 学校内ランキング</p>
        <p className="mt-1 text-xs leading-5 text-gray-500">
          学校を登録すると、同じ学校の学生どうしで、正解数のランキングが見られます。
        </p>
        <Link href="/student/settings" className="mt-2 inline-block text-xs font-semibold text-sky-700 underline">
          学校を登録する
        </Link>
      </section>
    );
  }

  const top = data.top ?? [];
  const podium = top.filter((r) => r.rank <= 3);
  const rest = top.filter((r) => r.rank > 3);

  async function toggleHidden() {
    if (!data) return;
    const next = !data.my_hidden;
    setSaving(true);
    const ok = await setRankingHidden(next);
    setSaving(false);
    if (!ok) {
      notify("変更できませんでした。時間をおいてお試しください");
      return;
    }
    notify(next ? "ランキングでは名前を出さないようにしました" : "ランキングに名前を出すようにしました");
    setData(await getSchoolRanking());
  }

  return (
    <section className="rounded-2xl border border-[var(--relight-line)] bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-semibold">🏆 {data.school}のランキング</p>
          <p className="text-[11px] leading-4 text-gray-500">
            同じ学校の{data.members}人の正解数（最後の答えで数えます）
          </p>
        </div>
      </div>

      {top.length === 0 ? (
        <p className="mt-3 rounded-xl bg-gray-50 px-3 py-4 text-center text-xs leading-5 text-gray-500">
          まだ正解した人がいません。最初の1位になりましょう。
        </p>
      ) : (
        <>
          <ol className="mt-3 space-y-2">
            {podium.map((r, i) => (
              <li
                key={`p${i}`}
                className={`flex items-center gap-3 rounded-xl px-3 py-1.5 ${
                  r.is_me ? "bg-amber-100 ring-1 ring-amber-300" : "bg-amber-50"
                }`}
              >
                <span className="text-2xl" aria-label={`${r.rank}位`}>
                  {MEDAL[r.rank - 1]}
                </span>
                <span className="min-w-0 flex-1 truncate text-sm font-semibold text-gray-900">{displayName(r)}</span>
                <span className="shrink-0 text-sm font-bold text-gray-900">
                  {r.correct}
                  <span className="ml-0.5 text-[11px] font-medium text-gray-500">問</span>
                </span>
              </li>
            ))}
          </ol>

          {rest.length > 0 && (
            <details className="group mt-2 rounded-xl border border-gray-200" open={rest.some((r) => r.is_me) || undefined}>
              <summary className="flex cursor-pointer list-none items-center justify-between px-3 py-2 text-xs font-semibold text-gray-600">
                4位〜10位を見る
                <span className="transition group-open:rotate-180" aria-hidden>
                  ▾
                </span>
              </summary>
              <ol className="divide-y divide-gray-100 border-t border-gray-100">
                {rest.map((r, i) => (
                  <li
                    key={`r${i}`}
                    className={`flex items-center gap-3 px-3 py-2 text-sm ${r.is_me ? "bg-sky-50 font-semibold" : ""}`}
                  >
                    <span className="w-8 shrink-0 text-xs font-semibold text-gray-500">{r.rank}位</span>
                    <span className="min-w-0 flex-1 truncate text-gray-800">{displayName(r)}</span>
                    <span className="shrink-0 text-gray-900">{r.correct}問</span>
                  </li>
                ))}
              </ol>
            </details>
          )}
        </>
      )}

      {/* 自分の順位（10位より下の人は、ここだけでわかる） */}
      {data.my_rank != null && (
        <div className="mt-3 flex items-center justify-between rounded-xl bg-gray-900 px-3 py-2.5 text-white">
          <span className="text-xs">あなたの順位</span>
          <span className="text-sm font-bold">
            {data.members}人中 {data.my_rank}位
            <span className="ml-2 text-xs font-normal text-white/80">正解 {data.my_correct ?? 0}問</span>
          </span>
        </div>
      )}
      <label className="mt-3 flex items-center gap-2 text-[11px] text-gray-500">
        <input type="checkbox" checked={!!data.my_hidden} disabled={saving} onChange={toggleHidden} />
        ランキングでは、自分の名前を出さない（「匿名の学生」と表示）
      </label>
    </section>
  );
}
