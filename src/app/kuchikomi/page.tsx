import type { Metadata } from "next";
import Link from "next/link";
import { ldJson } from "@/lib/jsonLd";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { KUCHIKOMI_REGISTER, FREE_REVIEW_LIMIT, listReviewedHospitals } from "@/lib/kuchikomi";
import KuchikomiFrame from "@/components/kuchikomi/KuchikomiFrame";
import FacilitySearch from "@/components/kuchikomi/FacilitySearch";

export const revalidate = 3600;

const TITLE = "理学療法士の職場口コミ｜病院・施設の評判を、現役PTの声で";
const DESCRIPTION = "全国の病院・施設で働く理学療法士による、職場環境の口コミ。教育体制・残業・給与・人間関係・女性の働きやすさを、6項目の評価と分類ごとのコメントで確認できます。就職・転職・実習先選びに。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/kuchikomi" },
  openGraph: { title: `${TITLE}｜${SITE_NAME}`, description: DESCRIPTION, url: "/kuchikomi" },
};

const FAQS = [
  { q: "口コミは、誰が書いていますか？", a: "理学療法士のアカウントで登録した人が書きます。匿名での投稿もできます。投稿者の情報は、ほかの利用者には表示されません。" },
  { q: `登録しなくても読めますか？`, a: `各施設の新しい口コミ${FREE_REVIEW_LIMIT}件までは、登録なしで読めます。それ以降は、無料登録（ログイン）で、すべて読めます。` },
  { q: "学生でも書けますか？", a: "職場の口コミを書けるのは、現役の理学療法士です。学生の方は、実習先での経験を、病院ページの「実習生の声」に書けます。" },
  { q: "口コミは、信じてよいですか？", a: "1人の感想は、その人の立場や時期に左右されます。複数の口コミの傾向を見て、見学で確かめてください。事実と異なる口コミは、通報できます。" },
];

export default async function KuchikomiTop() {
  const reviewed = await listReviewedHospitals(24);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "PTの職場口コミ",
      url: `${SITE_URL}/kuchikomi`,
      inLanguage: "ja",
      publisher: { "@type": "Organization", name: SITE_NAME },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  return (
    <KuchikomiFrame>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(jsonLd) }} />

      <section className="px-5 pt-6">
        <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl bg-relight-gradient p-6 shadow-sm sm:p-8">
          <p className="text-xs font-bold tracking-[0.14em] text-gray-900/70">現役PTの声で、職場を選ぶ</p>
          <h1 className="mt-2 text-3xl font-black leading-tight tracking-tight text-gray-900 sm:text-4xl">理学療法士の職場口コミ</h1>
          <p className="mt-3 text-sm font-bold leading-7 text-gray-900 sm:text-base">
            教育体制・残業・給与・人間関係・女性の働きやすさ。全国約14.6万の病院・施設の中から、気になる職場を探せます。
          </p>
        </div>
      </section>

      <section className="px-5 pt-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-lg font-bold text-gray-900">施設を探す</h2>
          <p className="mt-1 text-sm text-gray-600">施設名の一部か、都道府県で探せます。口コミがない施設も、最初の1件を書けます。</p>
          <div className="mt-3"><FacilitySearch /></div>
        </div>
      </section>

      <section className="px-5 pt-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-lg font-bold text-gray-900">口コミのある施設</h2>
          {reviewed.length === 0 ? (
            <div className="mt-3 rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-8 text-center">
              <p className="text-sm font-semibold text-gray-800">口コミは、これから集まります</p>
              <p className="mt-2 text-sm leading-6 text-gray-600">あなたの職場の口コミが、これから職場を選ぶ後輩の力になります。施設を探して、最初の口コミを書いてみませんか。</p>
            </div>
          ) : (
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {reviewed.map((h) => (
                <li key={h.id}>
                  <Link href={`/kuchikomi/${h.id}`} className="block h-full rounded-2xl border border-gray-200 bg-white px-4 py-3 transition hover:border-gray-400">
                    <span className="block text-sm font-semibold text-gray-900">{h.name}</span>
                    <span className="mt-0.5 block text-xs text-gray-500">{[h.prefecture, h.city].filter(Boolean).join(" ")}</span>
                    <span className="mt-1 block text-xs text-gray-700">口コミ{h.review_count}件{h.avg_overall != null ? ` ・ 平均 ${h.avg_overall.toFixed(1)} / 10` : ""}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="px-5 pt-8">
        <div className="mx-auto max-w-3xl rounded-3xl border border-gray-100 bg-white p-6">
          <h2 className="text-lg font-bold text-gray-900">このサイトの使い方</h2>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-gray-700">
            <li><strong>読む:</strong> 各施設の新しい口コミ{FREE_REVIEW_LIMIT}件までは、登録なしで読めます。</li>
            <li><strong>もっと読む:</strong> Re:lightに無料登録（ログイン）すると、すべての口コミと分類ごとのコメントを読めます。</li>
            <li><strong>書く:</strong> 理学療法士のアカウントで、口コミを投稿できます。匿名にもできます。</li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href={KUCHIKOMI_REGISTER} className="rounded-full bg-relight-gradient px-5 py-2.5 text-sm font-bold">無料で登録する</Link>
            <Link href="/login" className="rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-800">ログイン</Link>
          </div>
        </div>
      </section>

      <section className="px-5 py-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-lg font-bold text-gray-900">よくある質問</h2>
          <dl className="mt-3 space-y-3">
            {FAQS.map((f) => (
              <div key={f.q} className="rounded-2xl border border-gray-100 bg-white p-4">
                <dt className="text-sm font-bold text-gray-900">{f.q}</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </KuchikomiFrame>
  );
}
