// 点数（10点満点）を、星5つの黄色い部分の長さで表す。小数点まで、細かく塗り分ける（例: 7.0 → 星3.5個ぶん）
export default function StarRating({ score, max = 10, className = "text-lg" }: { score: number; max?: number; className?: string }) {
  const pct = Math.max(0, Math.min(100, (score / max) * 100));
  return (
    <span role="img" aria-label={`評価 ${score.toFixed(1)} / ${max}`} className={`relative inline-block leading-none ${className}`}>
      <span aria-hidden="true" className="text-gray-300">★★★★★</span>
      <span aria-hidden="true" className="absolute left-0 top-0 overflow-hidden whitespace-nowrap text-amber-400" style={{ width: `${pct}%` }}>
        ★★★★★
      </span>
    </span>
  );
}
