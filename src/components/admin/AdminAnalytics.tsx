"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Bar, Legend, Series, StackedBarChart } from "@/components/admin/Charts";

type Summary = {
  total: number;
  today: number;
  last7: number;
  prev7: number;
  last30: number;
  prev30: number;
  pt: number;
  student: number;
  general: number;
  first_day: string | null;
};
type SignupRow = { day: string; account_type: string; n: number };

type Unit = "day" | "week";

const TYPE_ORDER = ["pt", "student", "general", "unset"] as const;
const TYPE_SERIES: Record<(typeof TYPE_ORDER)[number], Series> = {
  pt: { name: "PT", color: "#0e8ea5" },
  student: { name: "学生", color: "#10b981" },
  general: { name: "一般", color: "#f59e0b" },
  unset: { name: "未設定", color: "#9ca3af" },
};

// ---- 日付の処理（日本時間の「YYYY-MM-DD」で扱う）----
const pad = (n: number) => String(n).padStart(2, "0");
function toIso(d: Date) {
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
}
function jstToday(): string {
  return toIso(new Date(Date.now() + 9 * 3600 * 1000));
}
function addDays(iso: string, delta: number): string {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + delta);
  return toIso(d);
}
function daysBack(count: number): string[] {
  const end = jstToday();
  return Array.from({ length: count }, (_, i) => addDays(end, -(count - 1 - i)));
}
// 週は、月曜はじまり
function weekStart(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  const dow = (d.getUTCDay() + 6) % 7;
  return addDays(iso, -dow);
}
function bucketKey(iso: string, unit: Unit): string {
  return unit === "day" ? iso : weekStart(iso);
}
function bucketLabel(key: string): string {
  const [, m, d] = key.split("-");
  return `${Number(m)}/${Number(d)}`;
}

function change(cur: number, prev: number): { text: string; tone: string } {
  if (prev === 0) return { text: cur > 0 ? "前の期間は 0 人" : "—", tone: "text-gray-500" };
  const pct = Math.round(((cur - prev) / prev) * 100);
  if (pct === 0) return { text: "前の期間と同じ", tone: "text-gray-500" };
  return pct > 0
    ? { text: `▲ ${pct}%（前の期間 ${prev} 人）`, tone: "text-emerald-700" }
    : { text: `▼ ${Math.abs(pct)}%（前の期間 ${prev} 人）`, tone: "text-red-700" };
}

function Card({ label, value, sub, tone }: { label: string; value: number | string; sub?: string; tone?: string }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4">
      <p className="text-xs font-medium text-gray-600">{label}</p>
      <p className="mt-1 text-3xl font-bold tracking-tight text-gray-900">{value}</p>
      {sub && <p className={`mt-1 text-[11px] leading-4 ${tone ?? "text-gray-500"}`}>{sub}</p>}
    </div>
  );
}

// 期間ごとに、日数と集計の単位(全期間だけ週ごと、それ以外は日ごと)を決める
const PERIODS: { key: "30" | "90" | "all"; label: string }[] = [
  { key: "30", label: "30日" },
  { key: "90", label: "90日" },
  { key: "all", label: "全期間" },
];

// 運営用: 登録者数の推移の分析（必要な数字だけに絞ってある）
export default function AdminAnalytics() {
  const [period, setPeriod] = useState<"30" | "90" | "all">("30");
  const [includeTest, setIncludeTest] = useState(false);

  const [summary, setSummary] = useState<Summary | null>(null);
  const [signups, setSignups] = useState<SignupRow[] | null>(null);

  // 全期間は、最初の登録日からの日数（最低30日）
  const daysSinceFirst = summary?.first_day
    ? Math.max(30, Math.round((Date.now() - new Date(`${summary.first_day}T00:00:00Z`).getTime()) / 86400000) + 1)
    : 30;
  const range = period === "30" ? 30 : period === "90" ? 90 : daysSinceFirst;
  const unit: Unit = range > 90 ? "week" : "day";

  useEffect(() => {
    let mounted = true;
    setSummary(null);
    setSignups(null);

    supabase.rpc("admin_signup_summary", { p_exclude_test: !includeTest }).then(({ data }) => {
      if (mounted) setSummary((data ?? null) as Summary | null);
    });
    supabase.rpc("admin_signups_daily", { p_days: range, p_exclude_test: !includeTest }).then(({ data }) => {
      if (mounted) setSignups(((data ?? []) as SignupRow[]).map((r) => ({ ...r, n: Number(r.n) })));
    });

    return () => {
      mounted = false;
    };
  }, [range, includeTest]);

  // ---- 登録者数（期間・単位ごとに集計）----
  const signupView = useMemo(() => {
    if (!signups) return null;

    const days = daysBack(range);
    const keys: string[] = [];
    for (const d of days) {
      const k = bucketKey(d, unit);
      if (keys[keys.length - 1] !== k) keys.push(k);
    }

    const present = TYPE_ORDER.filter((t) => signups.some((r) => r.account_type === t && r.n > 0));
    const shown = present.length > 0 ? present : (["pt"] as const);

    const sums = new Map<string, number>(); // `${key}|${type}`
    for (const r of signups) {
      const k = bucketKey(r.day, unit);
      const t = (TYPE_ORDER as readonly string[]).includes(r.account_type) ? r.account_type : "unset";
      sums.set(`${k}|${t}`, (sums.get(`${k}|${t}`) ?? 0) + r.n);
    }

    const bars: Bar[] = keys.map((k) => ({
      label: bucketLabel(k),
      values: shown.map((t) => sums.get(`${k}|${t}`) ?? 0),
    }));
    const inRange = bars.reduce((a, b) => a + b.values.reduce((x, v) => x + v, 0), 0);

    return { bars, series: shown.map((t) => TYPE_SERIES[t]), inRange };
  }, [signups, range, unit]);

  const c7 = summary ? change(summary.last7, summary.prev7) : null;
  const c30 = summary ? change(summary.last30, summary.prev30) : null;
  const typeTotal = summary ? summary.pt + summary.student + summary.general : 0;
  const unitLabel = unit === "day" ? "日" : "週";

  return (
    <section id="analytics" className="mb-10 scroll-mt-20">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">登録の分析</h2>
          <p className="mt-1 text-xs leading-5 text-gray-600">日付は日本時間。運営のアカウントは数えません。</p>
        </div>
        <label className="flex items-center gap-2 text-xs text-gray-700">
          <input type="checkbox" checked={includeTest} onChange={(e) => setIncludeTest(e.target.checked)} />
          テスト用アカウント（@example.com）も数える
        </label>
      </div>

      {/* サマリー */}
      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Card label="登録者の合計" value={summary ? summary.total : "…"} sub={summary?.first_day ? `${summary.first_day} から` : undefined} />
        <Card label="今日" value={summary ? summary.today : "…"} />
        <Card label="直近7日" value={summary ? summary.last7 : "…"} sub={c7?.text} tone={c7?.tone} />
        <Card label="直近30日" value={summary ? summary.last30 : "…"} sub={c30?.text} tone={c30?.tone} />
      </div>

      {/* 種類の内訳 */}
      {summary && typeTotal > 0 && (
        <div className="mt-4 rounded-2xl border border-gray-100 bg-white p-4">
          <p className="text-xs font-medium text-gray-600">アカウントの種類</p>
          <div className="mt-2 flex h-4 overflow-hidden rounded-full bg-gray-100" role="img" aria-label={`PT ${summary.pt}人、学生 ${summary.student}人、一般 ${summary.general}人`}>
            {([
              ["pt", summary.pt],
              ["student", summary.student],
              ["general", summary.general],
            ] as const).map(([t, n]) =>
              n > 0 ? <div key={t} style={{ width: `${(n / typeTotal) * 100}%`, background: TYPE_SERIES[t].color }} /> : null
            )}
          </div>
          <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-800">
            {([
              ["pt", summary.pt],
              ["student", summary.student],
              ["general", summary.general],
            ] as const).map(([t, n]) => (
              <li key={t} className="flex items-center gap-1.5">
                <span aria-hidden="true" className="inline-block h-3 w-3 rounded-sm" style={{ background: TYPE_SERIES[t].color }} />
                {TYPE_SERIES[t].name} <strong>{n}人</strong>（{Math.round((n / typeTotal) * 100)}%）
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 期間 */}
      <div className="mt-6 flex flex-wrap gap-1.5" role="group" aria-label="期間">
        {PERIODS.map((p) => (
          <button
            key={p.key}
            type="button"
            onClick={() => setPeriod(p.key)}
            aria-pressed={period === p.key}
            className={`rounded-full px-3 py-1 text-xs ${period === p.key ? "bg-black text-white" : "border border-gray-300 text-gray-700"}`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* 登録者数の棒グラフ */}
      <div className="mt-4 rounded-2xl border border-gray-100 bg-white p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-sm font-semibold text-gray-900">登録者数（{unitLabel}ごと）</h3>
          {signupView && <p className="text-xs text-gray-600">この期間: <strong>{signupView.inRange}人</strong></p>}
        </div>
        {!signupView ? (
          <p className="mt-4 text-sm text-gray-500">読み込み中…</p>
        ) : (
          <>
            <div className="mt-2">
              <Legend series={signupView.series} />
            </div>
            <div className="mt-2">
              <StackedBarChart
                bars={signupView.bars}
                series={signupView.series}
                ariaLabel={`${unitLabel}ごとの登録者数。この期間の合計は${signupView.inRange}人`}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
