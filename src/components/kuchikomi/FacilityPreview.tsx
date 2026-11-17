import ReviewRadarChart from "@/components/ReviewRadarChart";
import StarRating from "@/components/StarRating";

// 「施設をタップすると、こんな画面」の見本（コードで描いた、操作できない画像）。
// 施設名・点数は、サンプル。実在の施設の評価ではない（トップの文にも書く）。
// スマホでも切れずに全体が見えるよう、縦を短くしてある（レーダーチャートと点数を横に並べる）
const SAMPLE: { label: string; value: number }[] = [
  { label: "職場環境", value: 8.0 },
  { label: "教育体制", value: 8.5 },
  { label: "給与満足度", value: 6.5 },
  { label: "残業の少なさ", value: 7.0 },
  { label: "有休消化率", value: 7.5 },
  { label: "風通しの良さ", value: 9.0 },
];

// バーは、4本だけ（縦を短くするため）
const BARS = [SAMPLE[0], SAMPLE[1], SAMPLE[3], SAMPLE[5]];

const TABS: [string, string][] = [["TOP", ""], ["口コミ", "12"], ["投稿", "0"], ["質問", "0"], ["採用情報", ""]];

export default function FacilityPreview({ caption = true }: { caption?: boolean }) {
  return (
    <figure className="mx-auto w-full max-w-[290px] shrink-0">
      <div aria-hidden="true" className="rounded-[1.75rem] border-[5px] border-gray-800 bg-[#fafafa] shadow-xl">
        <div className="mx-auto mt-1 h-1 w-12 rounded-full bg-gray-300" />
        <div className="px-2.5 pb-2.5 pt-1.5 text-left">
          <div className="rounded-xl border border-gray-100 bg-white p-2.5">
            <p className="text-[12px] font-semibold leading-snug text-gray-900">○○リハビリテーション病院</p>
            <p className="mt-0.5 text-[9px] text-gray-500">東京都 ○○区 ・ 中規模</p>
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
              <span className="rounded-full border border-gray-300 px-2 py-0.5 text-[8px] text-gray-700">🌐 公式サイト</span>
              <span className="rounded-full bg-relight-gradient px-2.5 py-0.5 text-[8px] font-medium">＋ フォローする</span>
            </div>
          </div>

          <div className="mt-1.5 flex overflow-hidden rounded-lg bg-relight-gradient text-center text-[8px] font-semibold">
            {TABS.map(([t, n], i) => (
              <div key={t} className={`flex flex-1 flex-col items-center gap-0.5 px-0.5 py-1 ${i === 0 ? "bg-white text-gray-900" : ""}`}>
                <span className="min-w-5 rounded border border-current px-1 text-[8px] leading-4">{n || "–"}</span>
                {t}
              </div>
            ))}
          </div>

          <div className="mt-1.5 rounded-xl border border-gray-100 bg-white p-2.5">
            <p className="text-[9px] font-semibold text-gray-500">職場の総合評価</p>
            {/* 点数と星を、レーダーチャートの上に。チャートは、中央（正中線）に合わせる */}
            <div className="mt-1 flex items-end justify-center gap-2 rounded-lg bg-gray-50 py-1">
              <div className="text-center">
                <p className="text-[7px] font-semibold leading-none text-gray-500">総合評価</p>
                <p className="text-xl font-extrabold leading-none text-gray-900">8.0<span className="ml-0.5 text-[8px] font-semibold text-gray-500">/ 10</span></p>
              </div>
              <div className="pb-0.5 text-left">
                <StarRating score={8.0} className="text-[11px]" />
                <p className="mt-0.5 text-[7px] leading-none text-gray-500">12件の口コミ</p>
              </div>
            </div>
            <div className="mx-auto mt-1 w-[78%]">
              <ReviewRadarChart items={SAMPLE} />
            </div>
            <ul className="mt-1 space-y-1">
              {BARS.map((it) => (
                <li key={it.label} className="flex items-center gap-1.5">
                  <span className="w-[4.2rem] shrink-0 text-[7px] text-gray-700">{it.label}</span>
                  <span className="h-1.5 flex-1 rounded-full bg-gray-100">
                    <span className="block h-1.5 rounded-full bg-brand-500" style={{ width: `${(it.value / 10) * 100}%` }} />
                  </span>
                  <span className="w-5 text-right text-[7px] font-semibold text-gray-900">{it.value.toFixed(1)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {caption && <figcaption className="mt-3 text-center text-xs font-medium text-gray-600">施設をタップしたあとの画面（サンプル）</figcaption>}
    </figure>
  );
}
