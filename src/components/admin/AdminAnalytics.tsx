"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Bar, Legend, LineChart, Series, StackedBarChart } from "@/components/admin/Charts";

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
type ActivityRow = { day: string; posts: number; comments: number; likes: number };

type Unit = "day" | "week" | "month";

const TYPE_ORDER = ["pt", "student", "general", "unset"] as const;
const TYPE_SERIES: Record<(typeof TYPE_ORDER)[number], Series> = {
  pt: { name: "PT", color: "#0e8ea5" },
  student: { name: "学生", color: "#10b981" },
  general: { name: "一般", color: "#f59e0b" },
  unset: { name: "未設定", color: "#9ca3af" },
};
const ACTIVITY_SERIES: Series[] = [
  { name: "投稿", color: "#0e8ea5" },
  { name: "コメント", color: "#10b981" },
  { name: "いいね", color: "#f472b6" },
];

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
  if (unit === "day") return iso;
  if (unit === "week") return weekStart(iso);
  return iso.slice(0, 7);
}
function bucketLabel(key: string, unit: Unit): string {
  if (unit === "month") {
    const [y, m] = key.split("-");
    return `${y}/${Number(m)}`;
  }
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

function Pills<T extends string | number>({
  value,
  options,
  onChange,
  label,
}: {
  value: T;
  options: [T, string][];
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-1.5">
      {options.map(([v, l]) => (
        <button
          key={String(v)}
          type="button"
          onClick={() => onChange(v)}
          aria-pressed={value === v}
          className={`rounded-full px-3 py-1 text-xs ${value === v ? "bg-black text-white" : "border border-gray-300 text-gray-700"}`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

// 運営用: 登録者数の推移と、アプリの活動の分析
export default function AdminAnalytics() {
  const [range, setRange] = useState(30);
  const [unit, setUnit] = useState<Unit>("day");
  const [includeTest, setIncludeTest] = useState(false);

  const [summary, setSummary] = useState<Summary | null>(null);
  const [signups, setSignups] = useState<SignupRow[] | null>(null);
  const [activity, setActivity] = useState<ActivityRow[] | null>(null);

  useEffect(() => {
    let mounted = true;
    setSummary(null);
    setSignups(null);
    setActivity(null);

    supabase.rpc("admin_signup_summary", { p_exclude_test: !includeTest }).then(({ data }) => {
      if (mounted) setSummary((data ?? null) as Summary | null);
    });
    supabase.rpc("admin_signups_daily", { p_days: range, p_exclude_test: !includeTest }).then(({ data }) => {
      if (mounted) setSignups(((data ?? []) as SignupRow[]).map((r) => ({ ...r, n: Number(r.n) })));
    });
    supabase.rpc("admin_activity_daily", { p_days: Math.min(range, 90) }).then(({ data }) => {
      if (mounted)
        setActivity(
          ((data ?? []) as ActivityRow[]).map((r) => ({
            day: r.day,
            posts: Number(r.posts),
            comments: Number(r.comments),
            likes: Number(r.likes),
          }))
        );
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
      label: bucketLabel(k, unit),
      values: shown.map((t) => sums.get(`${k}|${t}`) ?? 0),
    }));
    const totalsPerBar = bars.map((b) => b.values.reduce((a, v) => a + v, 0));
    const inRange = totalsPerBar.reduce((a, v) => a + v, 0);

    // 累計: 期間の前までの人数 ＋ 期間内の積み上げ
    const baseline = Math.max(0, (summary?.total ?? inRange) - inRange);
    let acc = baseline;
    const cumulative = bars.map((b, i) => {
      acc += totalsPerBar[i];
      return { label: b.label, value: acc };
    });

    return { bars, series: shown.map((t) => TYPE_SERIES[t]), cumulative, inRange, keys, totalsPerBar };
  }, [signups, range, unit, summary]);

  // ---- 活動（日ごと）----
  const activityView = useMemo(() => {
    if (!activity) return null;
    const count = Math.min(range, 90);
    const days = daysBack(count);
    const map = new Map(activity.map((r) => [r.day, r]));
    const unitForActivity: Unit = unit === "month" ? "week" : unit;

    const keys: string[] = [];
    for (const d of days) {
      const k = bucketKey(d, unitForActivity);
      if (keys[keys.length - 1] !== k) keys.push(k);
    }
    const sums = new Map<string, [number, number, number]>();
    for (const d of days) {
      const r = map.get(d);
      if (!r) continue;
      const k = bucketKey(d, unitForActivity);
      const cur = sums.get(k) ?? [0, 0, 0];
      sums.set(k, [cur[0] + r.posts, cur[1] + r.comments, cur[2] + r.likes]);
    }
    const bars: Bar[] = keys.map((k) => ({ label: bucketLabel(k, unitForActivity), values: sums.get(k) ?? [0, 0, 0] }));
    const total = bars.reduce((a, b) => a + b.values.reduce((x, v) => x + v, 0), 0);
    return { bars, total, days: count };
  }, [activity, range, unit]);

  const c7 = summary ? change(summary.last7, summary.prev7) : null;
  const c30 = summary ? change(summary.last30, summary.prev30) : null;
  const typeTotal = summary ? summary.pt + summary.student + summary.general : 0;
  const unitLabel = unit === "day" ? "日" : unit === "week" ? "週" : "月";

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

      {/* 期間・単位 */}
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
        <Pills
          label="期間"
          value={range}
          onChange={setRange}
          options={[
            [7, "7日"],
            [30, "30日"],
            [90, "90日"],
            [180, "半年"],
            [365, "1年"],
          ]}
        />
        <Pills
          label="集計の単位"
          value={unit}
          onChange={setUnit}
          options={[
            ["day", "日ごと"],
            ["week", "週ごと"],
            ["month", "月ごと"],
          ]}
        />
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
            <details className="mt-2">
              <summary className="cursor-pointer text-xs text-gray-700">数字で見る</summary>
              <div className="mt-2 max-h-64 overflow-auto">
                <table className="w-full text-left text-xs">
                  <thead className="sticky top-0 bg-white text-gray-600">
                    <tr>
                      <th className="py-1 pr-2 font-medium">{unit === "month" ? "月" : unit === "week" ? "週のはじまり" : "日"}</th>
                      {signupView.series.map((s) => (
                        <th key={s.name} className="py-1 pr-2 text-right font-medium">
                          {s.name}
                        </th>
                      ))}
                      <th className="py-1 text-right font-medium">計</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[...signupView.bars].reverse().map((b, i) => (
                      <tr key={i}>
                        <td className="py-1 pr-2 text-gray-800">{b.label}</td>
                        {b.values.map((v, k) => (
                          <td key={k} className="py-1 pr-2 text-right text-gray-800">
                            {v}
                          </td>
                        ))}
                        <td className="py-1 text-right font-semibold text-gray-900">{b.values.reduce((a, v) => a + v, 0)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          </>
        )}
      </div>

      {/* 累計 */}
      <div className="mt-4 rounded-2xl border border-gray-100 bg-white p-4">
        <h3 className="text-sm font-semibold text-gray-900">登録者数の累計</h3>
        {!signupView ? (
          <p className="mt-4 text-sm text-gray-500">読み込み中…</p>
        ) : (
          <div className="mt-2">
            <LineChart points={signupView.cumulative} color="#0e8ea5" ariaLabel="登録者数の累計の推移" />
          </div>
        )}
      </div>

      {/* 活動 */}
      <div className="mt-4 rounded-2xl border border-gray-100 bg-white p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-sm font-semibold text-gray-900">アプリの活動（投稿・コメント・いいね）</h3>
          {activityView && (
            <p className="text-xs text-gray-600">
              直近{activityView.days}日の合計: <strong>{activityView.total}件</strong>
            </p>
          )}
        </div>
        {!activityView ? (
          <p className="mt-4 text-sm text-gray-500">読み込み中…</p>
        ) : (
          <>
            <div className="mt-2">
              <Legend series={ACTIVITY_SERIES} />
            </div>
            <div className="mt-2">
              <StackedBarChart bars={activityView.bars} series={ACTIVITY_SERIES} ariaLabel="投稿・コメント・いいねの件数の推移" />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
