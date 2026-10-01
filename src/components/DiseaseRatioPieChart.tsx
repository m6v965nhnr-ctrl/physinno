"use client";

// 新規ライブラリを追加せず、CSSのconic-gradientだけで円グラフを描画する

const COLORS = [
  "#2dd4bf",
  "#60a5fa",
  "#f472b6",
  "#fbbf24",
  "#a78bfa",
  "#34d399",
  "#fb923c",
  "#94a3b8",
];

export default function DiseaseRatioPieChart({
  data,
}: {
  data: { category: string; percentage: number }[];
}) {
  const total = data.reduce((sum, d) => sum + d.percentage, 0);
  if (total <= 0) return null;

  const stops = data.map((d, i) => {
    const before = data.slice(0, i).reduce((sum, x) => sum + x.percentage, 0);
    const start = (before / total) * 360;
    const end = ((before + d.percentage) / total) * 360;
    return `${COLORS[i % COLORS.length]} ${start}deg ${end}deg`;
  });

  return (
    <div className="flex items-center gap-5">
      <div
        className="h-36 w-36 shrink-0 rounded-full"
        style={{ background: `conic-gradient(${stops.join(", ")})` }}
      />

      <div className="space-y-1.5">
        {data.map((d, i) => (
          <div key={d.category} className="flex items-center gap-2 text-xs">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: COLORS[i % COLORS.length] }}
            />
            <span className="text-gray-700">{d.category}</span>
            <span className="text-gray-400">{d.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
