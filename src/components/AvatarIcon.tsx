// 写真未設定のときの、人型のプレースホルダー（頭＝丸、体＝縦長の楕円の上半分）。
// 色は「採用担当に伝える」の背景と同じ emerald-50
export default function AvatarIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={`text-emerald-50 ${className}`}>
      <circle cx="50" cy="35" r="18" fill="currentColor" />
      <ellipse cx="50" cy="100" rx="42" ry="48" fill="currentColor" />
    </svg>
  );
}
