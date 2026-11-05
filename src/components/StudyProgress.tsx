"use client";

import { useMemo, useState } from "react";
import { StackedBarChart } from "@/components/admin/Charts";
import { StudyLog } from "@/lib/studyBooks";

// 参考書の進み具合のバー・グラフ（先生のクラス画面・学生本人の画面の両方で使う）

export function pageCounts(logs: StudyLog[]): Map<number, number> {
  const m = new Map<number, number>();
  for (const l of logs) for (let p = l.page_start; p <= l.page_end; p++) m.set(p, (m.get(p) ?? 0) + 1);
  return m;
}

// 1周目〜5周目以上の色。バーの左から、回数の少ない色→多い色の順に積み上げ、残りは灰色（未）
export const BAR_COLORS = ["bg-emerald-400", "bg-teal-500", "bg-blue-500", "bg-indigo-500", "bg-purple-600"];

export function ProgressBar({ counts, from, to }: { counts: Map<number, number>; from: number; to: number }) {
  const total = to - from + 1;
  if (total <= 0) return null;
  const buckets = [0, 0, 0, 0, 0];
  for (let p = from; p <= to; p++) {
    const c = counts.get(p) ?? 0;
    if (c > 0) buckets[Math.min(c, 5) - 1]++;
  }
  const done = buckets.reduce((a, b) => a + b, 0);
  return (
    <div className="space-y-1">
      <div className="flex h-3 w-full overflow-hidden rounded-full bg-gray-200">
        {buckets.map((n, i) => (n > 0 ? <div key={i} className={BAR_COLORS[i]} style={{ width: `${(n / total) * 100}%` }} /> : null))}
      </div>
      <p className="text-[10px] text-gray-400">
        {done}/{total}ページ（{Math.round((done / total) * 100)}%）
      </p>
    </div>
  );
}

// 「日々の記録」: 1件の記録が何ページぶんか（終了p - 開始p + 1）を、日または週ごとに積み上げる
function pagesOf(l: StudyLog): number {
  return l.page_end - l.page_start + 1;
}
// 週は月曜はじまり（studied_onは "YYYY-MM-DD" の日付文字列）
function mondayOf(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  const dow = (d.getUTCDay() + 6) % 7;
  d.setUTCDate(d.getUTCDate() - dow);
  return d.toISOString().slice(0, 10);
}
function bucketLabel(key: string): string {
  const [, m, d] = key.split("-");
  return `${Number(m)}/${Number(d)}`;
}

export function DailyRecordView({ logs }: { logs: StudyLog[] }) {
  const [unit, setUnit] = useState<"day" | "week">("day");

  const bars = useMemo(() => {
    const map = new Map<string, number>();
    for (const l of logs) {
      const key = unit === "day" ? l.studied_on : mondayOf(l.studied_on);
      map.set(key, (map.get(key) ?? 0) + pagesOf(l));
    }
    return Array.from(map.entries())
      .sort(([a], [b]) => (a < b ? -1 : 1))
      .slice(-14)
      .map(([key, value]) => ({ label: bucketLabel(key), values: [value] }));
  }, [logs, unit]);

  if (logs.length === 0) return <p className="py-8 text-center text-xs text-gray-400">まだ記録がありません。</p>;

  const lastStudiedOn = logs.reduce((latest, l) => (l.studied_on > latest ? l.studied_on : latest), logs[0].studied_on);
  const daysSince = Math.floor((Date.parse(new Date().toISOString().slice(0, 10)) - Date.parse(lastStudiedOn)) / 86400000);

  return (
    <div className="space-y-3">
      <div role="tablist" aria-label="表示の単位" className="grid w-40 grid-cols-2 rounded-full border border-gray-200 p-1 text-xs font-medium">
        {(["day", "week"] as const).map((u) => (
          <button
            key={u}
            role="tab"
            aria-selected={unit === u}
            onClick={() => setUnit(u)}
            className={`rounded-full py-1.5 transition ${unit === u ? "bg-gray-900 text-white" : "text-gray-500"}`}
          >
            {u === "day" ? "日ごと" : "週ごと"}
          </button>
        ))}
      </div>
      {daysSince >= 7 && (
        <p className="rounded-lg bg-amber-50 px-3 py-2 text-[11px] text-amber-800">最後の記録から{daysSince}日たっています。</p>
      )}
      <StackedBarChart bars={bars} series={[{ name: "ページ数", color: "#0e8ea5" }]} ariaLabel={`${unit === "day" ? "日ごと" : "週ごと"}のページ数`} />
    </div>
  );
}
