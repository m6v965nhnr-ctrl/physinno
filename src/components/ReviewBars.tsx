// 職場環境の口コミ（6項目・各1〜10点）の平均を、項目ごとのバーと数字で表示する（スマホでも読みやすいように、レーダーチャートと併用）
export default function ReviewBars({ items }: { items: { label: string; value: number }[] }) {
  return (
    <ul className="mt-4 space-y-2.5" aria-label="項目ごとの平均点（10点満点）">
      {items.map((it) => (
        <li key={it.label} className="flex items-center gap-3">
          <span className="w-36 shrink-0 text-xs leading-tight text-gray-700">{it.label}</span>
          <span className="h-2.5 flex-1 rounded-full bg-gray-100" role="presentation">
            <span className="block h-2.5 rounded-full bg-brand-500" style={{ width: `${Math.min(100, (it.value / 10) * 100)}%` }} />
          </span>
          <span className="w-8 shrink-0 text-right text-sm font-semibold tabular-nums text-gray-900">{it.value.toFixed(1)}</span>
        </li>
      ))}
    </ul>
  );
}
