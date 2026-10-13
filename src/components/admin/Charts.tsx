"use client";

// 運営画面用の、軽い棒グラフ・折れ線グラフ（SVG。外部のグラフ部品は使わない）。
// 画面の幅に合わせて縮み、数字は、グラフの下の「数字で見る」でも読める。

export type Series = { name: string; color: string };
export type Bar = { label: string; values: number[] };

// 目盛りの最大値を、切りのよい数にする（例: 37 → 40、8 → 10）
function niceMax(max: number): number {
  if (max <= 5) return 5;
  const pow = Math.pow(10, Math.floor(Math.log10(max)));
  const n = max / pow;
  const step = n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10;
  return step * pow;
}

const W = 640;
const H = 240;
const M = { top: 12, right: 12, bottom: 34, left: 38 };

function Axes({ max, labels, every }: { max: number; labels: string[]; every: number }) {
  const innerW = W - M.left - M.right;
  const innerH = H - M.top - M.bottom;
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((r) => Math.round(max * r));

  return (
    <>
      {ticks.map((t) => {
        const y = M.top + innerH - (t / max) * innerH;
        return (
          <g key={t}>
            <line x1={M.left} x2={W - M.right} y1={y} y2={y} stroke="#e5e7eb" strokeWidth={1} />
            <text x={M.left - 6} y={y + 4} textAnchor="end" fontSize={11} fill="#4b5563">
              {t}
            </text>
          </g>
        );
      })}
      {labels.map((l, i) =>
        i % every === 0 ? (
          <text
            key={i}
            x={M.left + (innerW / labels.length) * (i + 0.5)}
            y={H - 12}
            textAnchor="middle"
            fontSize={11}
            fill="#4b5563"
          >
            {l}
          </text>
        ) : null
      )}
    </>
  );
}

// 積み上げの棒グラフ（系列ごとに色を変える）
export function StackedBarChart({
  bars,
  series,
  ariaLabel,
}: {
  bars: Bar[];
  series: Series[];
  ariaLabel: string;
}) {
  const totals = bars.map((b) => b.values.reduce((a, v) => a + v, 0));
  const max = niceMax(Math.max(1, ...totals));
  const innerW = W - M.left - M.right;
  const innerH = H - M.top - M.bottom;
  const slot = innerW / Math.max(1, bars.length);
  const barW = Math.max(2, Math.min(34, slot * 0.7));
  const every = Math.max(1, Math.ceil(bars.length / 10));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={ariaLabel} className="h-auto w-full">
      <Axes max={max} labels={bars.map((b) => b.label)} every={every} />
      {bars.map((b, i) => {
        let acc = 0;
        const x = M.left + slot * i + (slot - barW) / 2;
        return (
          <g key={i}>
            <title>{`${b.label}: ${b.values.map((v, k) => `${series[k]?.name ?? ""} ${v}`).join(" / ")}`}</title>
            {b.values.map((v, k) => {
              if (v <= 0) return null;
              const h = (v / max) * innerH;
              const y = M.top + innerH - ((acc + v) / max) * innerH;
              acc += v;
              return <rect key={k} x={x} y={y} width={barW} height={h} fill={series[k]?.color ?? "#9ca3af"} rx={1.5} />;
            })}
          </g>
        );
      })}
    </svg>
  );
}

// 折れ線グラフ（累計の推移など）
export function LineChart({
  points,
  color,
  ariaLabel,
}: {
  points: { label: string; value: number }[];
  color: string;
  ariaLabel: string;
}) {
  const max = niceMax(Math.max(1, ...points.map((p) => p.value)));
  const innerW = W - M.left - M.right;
  const innerH = H - M.top - M.bottom;
  const step = innerW / Math.max(1, points.length);
  const every = Math.max(1, Math.ceil(points.length / 10));
  const xy = points.map((p, i) => [M.left + step * (i + 0.5), M.top + innerH - (p.value / max) * innerH] as const);
  const line = xy.map(([x, y]) => `${x},${y}`).join(" ");
  const area = xy.length ? `${M.left + step * 0.5},${M.top + innerH} ${line} ${xy[xy.length - 1][0]},${M.top + innerH}` : "";

  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={ariaLabel} className="h-auto w-full">
      <Axes max={max} labels={points.map((p) => p.label)} every={every} />
      {area && <polygon points={area} fill={color} opacity={0.12} />}
      <polyline points={line} fill="none" stroke={color} strokeWidth={2.5} strokeLinejoin="round" />
      {points.length <= 45 &&
        xy.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={2.5} fill={color}>
            <title>{`${points[i].label}: ${points[i].value}`}</title>
          </circle>
        ))}
    </svg>
  );
}

// グラフの凡例
export function Legend({ series }: { series: Series[] }) {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-700">
      {series.map((s) => (
        <li key={s.name} className="flex items-center gap-1.5">
          <span aria-hidden="true" className="inline-block h-3 w-3 rounded-sm" style={{ background: s.color }} />
          {s.name}
        </li>
      ))}
    </ul>
  );
}
