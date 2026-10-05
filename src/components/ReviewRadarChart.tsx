// 職場環境の口コミ（6項目・各1〜10点）の平均を、六角形のレーダーチャートで表示する。
// 外部のグラフライブラリは使わず、SVGだけで描く。

const SIZE_W = 340;
const SIZE_H = 300;
const CX = SIZE_W / 2;
const CY = 150;
const RADIUS = 92;
const LABEL_RADIUS = 116;
const MAX_SCORE = 10;
const RINGS = [2, 4, 6, 8, 10];

function point(index: number, count: number, radius: number) {
  // 真上から時計回りに配置
  const angle = -Math.PI / 2 + (index * 2 * Math.PI) / count;
  return {
    x: CX + radius * Math.cos(angle),
    y: CY + radius * Math.sin(angle),
  };
}

function polygon(count: number, radiusOf: (i: number) => number) {
  return Array.from({ length: count }, (_, i) => {
    const p = point(i, count, radiusOf(i));
    return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
  }).join(" ");
}

export default function ReviewRadarChart({
  items,
}: {
  items: { label: string; value: number }[];
}) {
  const count = items.length;
  const summary = items.map((i) => `${i.label} ${i.value.toFixed(1)}`).join("、");

  return (
    <svg
      viewBox={`0 0 ${SIZE_W} ${SIZE_H}`}
      role="img"
      aria-label={`職場環境の評価（10点満点の平均）: ${summary}`}
      className="mx-auto w-full max-w-sm"
    >
      {/* 目盛りの六角形 */}
      {RINGS.map((ring) => (
        <polygon
          key={ring}
          points={polygon(count, () => (ring / MAX_SCORE) * RADIUS)}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={ring === MAX_SCORE ? 1.5 : 1}
        />
      ))}

      {/* 中心から各項目への軸 */}
      {items.map((_, i) => {
        const p = point(i, count, RADIUS);
        return (
          <line key={i} x1={CX} y1={CY} x2={p.x} y2={p.y} stroke="#e5e7eb" strokeWidth={1} />
        );
      })}

      {/* 目盛りの数字（真上の軸の上に表示） */}
      {[5, 10].map((ring) => (
        <text
          key={ring}
          x={CX + 4}
          y={CY - (ring / MAX_SCORE) * RADIUS + 10}
          fontSize={8}
          fill="#9ca3af"
        >
          {ring}
        </text>
      ))}

      {/* 平均点の面 */}
      <polygon
        points={polygon(count, (i) => (Math.max(0, items[i].value) / MAX_SCORE) * RADIUS)}
        fill="rgba(52, 211, 153, 0.28)"
        stroke="#10b981"
        strokeWidth={2}
        strokeLinejoin="round"
      />

      {/* 各項目の点と数値 */}
      {items.map((item, i) => {
        const p = point(i, count, (Math.max(0, item.value) / MAX_SCORE) * RADIUS);
        return <circle key={item.label} cx={p.x} cy={p.y} r={3.5} fill="#10b981" />;
      })}

      {/* 項目名と平均点 */}
      {items.map((item, i) => {
        const p = point(i, count, LABEL_RADIUS);
        const anchor = Math.abs(p.x - CX) < 8 ? "middle" : p.x < CX ? "end" : "start";
        return (
          <text
            key={item.label}
            x={p.x}
            y={p.y}
            textAnchor={anchor}
            dominantBaseline="middle"
            fontSize={11}
            fill="#374151"
          >
            <tspan>{item.label}</tspan>
            <tspan x={p.x} dy={13} fontWeight={600} fill="#059669">
              {item.value.toFixed(1)}
            </tspan>
          </text>
        );
      })}
    </svg>
  );
}
