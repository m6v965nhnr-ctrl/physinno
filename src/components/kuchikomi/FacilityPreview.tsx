import ReviewRadarChart from "@/components/ReviewRadarChart";

// 「施設をタップすると、こんな画面」の見本（コードで描いた、操作できない画像）。
// 施設名・点数は、サンプル。実在の施設の評価ではない（画面の下にも書く）
const SAMPLE: { label: string; value: number }[] = [
  { label: "職場環境", value: 8.0 },
  { label: "教育体制", value: 8.5 },
  { label: "給与満足度", value: 6.5 },
  { label: "残業の少なさ", value: 7.0 },
  { label: "有休消化率", value: 7.5 },
  { label: "風通しの良さ", value: 9.0 },
];

const TABS: [string, string][] = [["TOP", ""], ["口コミ", "12"], ["投稿", "0"], ["質問", "0"], ["採用情報", ""]];

export default function FacilityPreview() {
  return (
    <figure className="mx-auto w-[280px] shrink-0">
      <div aria-hidden="true" className="rounded-[2rem] border-[6px] border-gray-800 bg-[#fafafa] shadow-xl">
        <div className="mx-auto mt-1 h-1.5 w-14 rounded-full bg-gray-300" />
        <div className="h-[520px] overflow-hidden rounded-b-[1.5rem] px-3 pb-3 pt-2 text-left">
          <div className="rounded-2xl border border-gray-100 bg-white p-3">
            <p className="text-[13px] font-semibold leading-snug text-gray-900">○○リハビリテーション病院</p>
            <p className="mt-0.5 text-[9px] text-gray-500">東京都 ○○区 ・ 中規模</p>
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <span className="rounded-full border border-gray-300 px-2 py-0.5 text-[8px] text-gray-700">🌐 公式サイト</span>
              <span className="rounded-full bg-relight-gradient px-2.5 py-0.5 text-[8px] font-medium">＋ フォローする</span>
              <span className="text-[8px] text-gray-600">総合 8.0/10（12件）</span>
            </div>
          </div>

          <div className="mt-2 flex overflow-hidden rounded-xl bg-relight-gradient text-center text-[8px] font-semibold">
            {TABS.map(([t, n], i) => (
              <div key={t} className={`flex flex-1 flex-col items-center gap-0.5 px-0.5 py-1.5 ${i === 0 ? "bg-white text-gray-900" : ""}`}>
                <span className="min-w-5 rounded border border-current px-1 text-[8px] leading-4">{n || "–"}</span>
                {t}
              </div>
            ))}
          </div>

          <div className="mt-2 rounded-2xl border border-gray-100 bg-white p-3">
            <p className="text-[9px] font-semibold text-gray-500">職場の総合評価</p>
            <div className="mt-1.5 flex items-end justify-center gap-2 rounded-xl bg-gray-50 py-1.5">
              <div className="text-center">
                <p className="text-[8px] font-semibold text-gray-500">総合評価</p>
                <p className="text-2xl font-extrabold leading-none text-gray-900">8.0<span className="ml-0.5 text-[9px] font-semibold text-gray-500">/ 10</span></p>
              </div>
              <p className="pb-0.5 text-sm leading-none text-amber-400">★★★★<span className="text-gray-300">★</span></p>
            </div>
            <ReviewRadarChart items={SAMPLE} />
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs font-medium text-gray-600">施設をタップしたあとの画面（サンプル）</figcaption>
    </figure>
  );
}
