import { AGE_BANDS, type IncomeByAge } from "@/lib/hospitals";

// 年齢の層（5歳ごと）別の平均年収。3件以上そろった層だけ棒を出す
export default function IncomeByAgeChart({ data }: { data: IncomeByAge[] }) {
  const max = Math.max(...data.map((d) => d.avg_income), 1);
  const byBand = new Map(data.map((d) => [d.age_band, d]));
  return (
    <section className="mt-5 rounded-3xl border border-gray-100 bg-white p-6">
      <h2 className="text-sm font-semibold text-gray-500">年齢ごとの年収の推移（口コミの平均）</h2>
      {data.length < 2 ? (
        <p className="mt-3 text-sm leading-6 text-gray-500">年収と年齢を答えた口コミが、年齢の層ごとに3件以上そろうと、ここに表示されます（少ない件数だと、回答した人が特定されるおそれがあるため）。</p>
      ) : (
        <div className="mt-4 flex items-end gap-1.5" role="img" aria-label={`年齢ごとの平均年収。${data.map((d) => `${AGE_BANDS.find((b) => b.value === d.age_band)?.label}は${d.avg_income}万円`).join("、")}`}>
          {AGE_BANDS.map((b) => {
            const d = byBand.get(b.value);
            return (
              <div key={b.value} className="flex min-w-0 flex-1 flex-col items-center justify-end text-center">
                {d ? (
                  <>
                    <span className="text-[11px] font-semibold text-gray-900">{d.avg_income}</span>
                    <span className="mt-1 block w-full rounded-t-lg bg-relight-gradient" style={{ height: `${Math.max(8, (d.avg_income / max) * 110)}px` }} />
                    <span className="mt-1 text-[10px] text-gray-400">{d.n}件</span>
                  </>
                ) : (
                  <span className="block h-[2px] w-full bg-gray-200" />
                )}
                <span className="mt-1 text-[10px] leading-3 text-gray-500">{b.label.replace("歳", "")}</span>
              </div>
            );
          })}
        </div>
      )}
      <p className="mt-3 text-[11px] leading-5 text-gray-400">単位は万円。口コミの投稿者が任意で答えた年収と年齢の平均で、実際の給与を保証するものではありません。件数が3件に満たない層は表示しません。</p>
    </section>
  );
}
