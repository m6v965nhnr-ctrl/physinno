import type { Metadata } from "next";
import Link from "next/link";
import { ldJson } from "@/lib/jsonLd";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { KUCHIKOMI_REGISTER, FREE_REVIEW_LIMIT, listReviewedHospitals } from "@/lib/kuchikomi";
import { REVIEW_AXES, REVIEW_AXIS_LABEL, REVIEW_TOPICS } from "@/lib/hospitals";
import { REGIONS } from "@/lib/prefectures";
import { FACILITY_AREA_TYPES } from "@/lib/hospitalAreas";
import KuchikomiFrame from "@/components/kuchikomi/KuchikomiFrame";
import FacilitySearch from "@/components/kuchikomi/FacilitySearch";
import FacilityPreview from "@/components/kuchikomi/FacilityPreview";

export const revalidate = 3600;

const TITLE = "リハ職の本音｜理学療法士・作業療法士・言語聴覚士の職場口コミ・病院の評判";
const DESCRIPTION =
  "理学療法士（PT）・作業療法士（OT）・言語聴覚士（ST）の、病院・施設選びのための口コミサイト。教育体制・残業・給与・人間関係・女性の働きやすさを、6項目の評価と分類ごとのコメントで確認できます。全国約14.6万の病院・施設から検索。登録なしでも各施設3件まで読めます。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["リハ職の本音", "理学療法士 口コミ", "作業療法士 口コミ", "言語聴覚士 口コミ", "リハビリ 職場 評判", "PT OT ST 転職", "病院 口コミ リハビリ"],
  alternates: { canonical: "/kuchikomi" },
  openGraph: { title: `${TITLE}｜${SITE_NAME}`, description: DESCRIPTION, url: "/kuchikomi", type: "website" },
  twitter: { card: "summary_large_image", title: `${TITLE}｜${SITE_NAME}`, description: DESCRIPTION },
};

const JOBS = [
  {
    name: "理学療法士（PT）",
    points: ["担当する患者層（急性期・回復期・生活期）", "1日の単位数と記録の量", "新人教育・勉強会・学会参加の支援", "リハ室の広さ・機器・歩行訓練の設備"],
  },
  {
    name: "作業療法士（OT）",
    points: ["リハ科の中での役割分担・担当領域", "ADL・手の機能・高次脳機能など、関われる範囲", "作業療法室の設備と、使える物品", "他職種との連携と、相談しやすさ"],
  },
  {
    name: "言語聴覚士（ST）",
    points: ["STが何人いるか（1人職場かどうか）", "相談できる先輩・学べる環境", "摂食嚥下・失語症・小児など、担当できる領域", "検査・訓練の道具と、他職種との連携"],
  },
];

const CHECKS = [
  { t: "リハ科の人数と、雰囲気", d: "同じ職種の先輩が何人いるか、相談しやすいか。人間関係は、働き続けられるかを左右します。" },
  { t: "教育・研修のしくみ", d: "新人のときの教育担当（プリセプターなど）、勉強会、学会や認定資格の取得への支援があるか。" },
  { t: "1日の流れと、業務量", d: "1日に担当する人数・単位数、記録や書類の量、カンファレンスなどの時間。" },
  { t: "残業と、休みの取りやすさ", d: "残業の多さ、有給の取りやすさ、年間休日。入職後のギャップが出やすい点です。" },
  { t: "給与・待遇", d: "給与・賞与・手当、昇給のしくみ、福利厚生。募集要項と、実際の声を見比べます。" },
  { t: "ライフイベントとの両立", d: "産休・育休、時短勤務、復職のしやすさ。長く働けるかを考えるときの材料になります。" },
];

const FAQS = [
  { q: "作業療法士・言語聴覚士でも使えますか？", a: `はい。理学療法士・作業療法士・言語聴覚士のどなたでも、読むことも、書くこともできます。各施設の新しい口コミ${FREE_REVIEW_LIMIT}件までは、登録なしで読めます。すべての口コミを読む・書くには、無料登録（ログイン）が必要です。登録のとき、職種を選べます。` },
  { q: "口コミは、誰が書いていますか？", a: "理学療法士・作業療法士・言語聴覚士として登録した方（職種は自己申告）です。各口コミに、投稿した人の職種が表示されます。匿名での投稿もできます。投稿者の氏名などは、ほかの利用者には表示されません。" },
  { q: "登録しなくても読めますか？", a: `各施設の新しい口コミ${FREE_REVIEW_LIMIT}件までは、登録なしで読めます。それ以降は、無料登録（ログイン）で、すべての口コミと分類ごとのコメントを読めます。` },
  { q: "どんな項目が分かりますか？", a: `職場環境・教育体制・給与満足度・残業の少なさ・有休消化率・風通しの良さの${REVIEW_AXES.length}項目（10点満点）に加えて、教育・研修、症例・患者層、残業・休暇、人間関係、女性の働きやすさなど${REVIEW_TOPICS.length}分類のコメントと、年収・残業時間・年間休日などの数字（回答があるもの）を確認できます。` },
  { q: "口コミのない施設もありますか？", a: "全国約14.6万件の病院・施設を検索できますが、口コミが付いている施設は、まだ一部です。口コミのない施設のページからは、最初の1件を書けます。" },
  { q: "口コミは、信じてよいですか？", a: "1人の感想は、その人の立場や時期に左右されます。複数の口コミの傾向を見て、病院見学や募集要項で確かめるのがおすすめです。事実と異なる口コミや、権利を侵害する口コミは、通報できます。" },
  { q: "施設の関係者です。口コミを削除・訂正してほしいです。", a: "運営へのメッセージから、削除・訂正を申し出られます。内容を確認して対応します。" },
  { q: "学生でも使えますか？", a: "読むことはできます。就職先・実習先の候補を探す学生の方は、就活ガイドもご覧ください。職場の口コミを書けるのは、現役の理学療法士・作業療法士・言語聴覚士です。学生の方は、実習先での経験を、病院ページの「実習生の声」に書けます。" },
];

export default async function KuchikomiTop() {
  const reviewed = await listReviewedHospitals(12);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "リハ職の本音",
      alternateName: ["リハ職の本音｜PT・OT・STの職場口コミ", "理学療法士・作業療法士・言語聴覚士の職場口コミ"],
      url: `${SITE_URL}/kuchikomi`,
      inLanguage: "ja",
      publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: SITE_NAME, item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "リハ職の本音", item: `${SITE_URL}/kuchikomi` },
      ],
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

      {/* ① ヒーロー: 検索が主役 */}
      <section className="px-5 pt-6">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-relight-gradient p-6 shadow-sm sm:p-10">
          <p className="text-xs font-bold tracking-[0.14em] text-gray-900/70">PT・OT・STの職場口コミ</p>
          <h1 className="mt-2 text-4xl font-black leading-tight tracking-tight text-gray-900 sm:text-6xl">リハ職の本音</h1>
          <p className="mt-2 text-lg font-black leading-snug text-gray-900 sm:text-2xl">職場の本当のところが、分かる。</p>
          <p className="mt-3 text-sm font-bold leading-7 text-gray-900 sm:text-base">
            理学療法士・作業療法士・言語聴覚士のための、病院・施設の口コミ。教育体制・残業・給与・人間関係を、6項目の評価と、分類ごとの声で。
          </p>
          <ul className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-gray-900">
            <li className="rounded-full bg-white/60 px-3 py-1.5">登録なしで{FREE_REVIEW_LIMIT}件まで読める</li>
            <li className="rounded-full bg-white/60 px-3 py-1.5">匿名で投稿できる</li>
            <li className="rounded-full bg-white/60 px-3 py-1.5">無料</li>
            <li className="rounded-full bg-white/60 px-3 py-1.5">全国約14.6万の病院・施設</li>
          </ul>
        </div>
      </section>

      {/* ② 職場を探す（名前／条件。ボタンで切り替え） */}
      <section className="px-5 pt-6">
        <div className="mx-auto max-w-4xl rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-bold text-gray-900">気になる職場を探す</h2>
          <p className="mt-1 text-sm text-gray-600">施設名で探すか、地域や施設の種類で絞って探せます。口コミがない施設も、最初の1件を書けます。</p>
          <div className="mt-4"><FacilitySearch /></div>
        </div>
      </section>

      {/* ③ 口コミのある施設 */}
      <section className="px-5 pt-10">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-xl font-bold text-gray-900">口コミのある施設</h2>
          {reviewed.length === 0 ? (
            <div className="mt-3 rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-8 text-center">
              <p className="text-sm font-semibold text-gray-800">口コミは、これから集まります</p>
              <p className="mt-2 text-sm leading-6 text-gray-600">あなたの職場の口コミが、これから職場を選ぶ後輩の力になります。施設を探して、最初の口コミを書いてみませんか。</p>
            </div>
          ) : (
            <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
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

      {/* 施設をタップしたあとの画面の見本 */}
      <section className="px-5 pt-12">
        <div className="mx-auto grid max-w-4xl items-center gap-8 md:grid-cols-[280px_1fr]">
          <FacilityPreview />
          <div>
            <h2 className="text-xl font-bold text-gray-900">施設をタップすると、こんな画面</h2>
            <p className="mt-2 text-sm leading-7 text-gray-700">
              口コミの平均が、レーダーチャートと項目ごとのバーで分かります。タブを切り替えて、口コミ・投稿・質問・採用情報も見られます。
            </p>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-gray-700">
              <li className="flex gap-2"><span aria-hidden="true" className="text-brand-600">●</span><span><strong className="text-gray-900">TOP</strong>: 総合評価・レーダーチャート・年収や残業の平均</span></li>
              <li className="flex gap-2"><span aria-hidden="true" className="text-brand-600">●</span><span><strong className="text-gray-900">口コミ</strong>: 教育・残業・人間関係などの分類ごとに読める</span></li>
              <li className="flex gap-2"><span aria-hidden="true" className="text-brand-600">●</span><span><strong className="text-gray-900">投稿・質問</strong>: 施設からのお知らせと、働く人への質問</span></li>
              <li className="flex gap-2"><span aria-hidden="true" className="text-brand-600">●</span><span><strong className="text-gray-900">採用情報</strong>: 給与・休日などの募集の情報</span></li>
            </ul>
            <p className="mt-3 text-xs leading-5 text-gray-500">画面のイメージです。施設名と点数は、サンプルで、実在の施設の評価ではありません。</p>
          </div>
        </div>
      </section>

      {/* ③ 分かること */}
      <section className="px-5 pt-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-xl font-bold text-gray-900">口コミで、分かること</h2>
          <p className="mt-2 text-sm leading-7 text-gray-700">
            募集要項だけでは見えにくい、職場の中の様子を、リハビリ職の声で確認できます。
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-gray-100 bg-white p-5">
              <h3 className="text-base font-bold text-gray-900">6項目の評価（10点満点）</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {REVIEW_AXES.map((a) => (
                  <li key={a} className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-800">{REVIEW_AXIS_LABEL[a]}</li>
                ))}
              </ul>
              <p className="mt-3 text-xs leading-6 text-gray-600">口コミの平均を、レーダーチャートと項目ごとのバーで確認できます。年収・月の残業・年間休日は、回答があるものの平均を出します。</p>
            </div>
            <div className="rounded-3xl border border-gray-100 bg-white p-5">
              <h3 className="text-base font-bold text-gray-900">{REVIEW_TOPICS.length}分類のコメント</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {REVIEW_TOPICS.map((t) => (
                  <li key={t.key} className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-800">{t.key}</li>
                ))}
              </ul>
              <p className="mt-3 text-xs leading-6 text-gray-600">「残業・休暇」「教育・研修」など、気になる分類だけを、選んで読めます。</p>
            </div>
          </div>
        </div>
      </section>

      {/* ④ 職種別 */}
      <section className="px-5 pt-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-xl font-bold text-gray-900">職種ごとに、見ておきたいこと</h2>
          <p className="mt-2 text-sm leading-7 text-gray-700">理学療法士・作業療法士・言語聴覚士は、同じリハビリ職でも、職場選びで気になる点が少しずつ違います。口コミを読むときの、目安にしてください。</p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {JOBS.map((j) => (
              <div key={j.name} className="rounded-3xl border border-gray-100 bg-white p-5">
                <h3 className="text-base font-bold text-gray-900">{j.name}</h3>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-gray-700">
                  {j.points.map((p) => (
                    <li key={p} className="flex gap-2"><span aria-hidden="true" className="text-brand-600">●</span><span>{p}</span></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ⑤ 地域・種類から探す（内部リンク） */}
      <section className="px-5 pt-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-xl font-bold text-gray-900">都道府県から、病院を探す</h2>
          <div className="mt-4 space-y-4">
            {REGIONS.map((r) => (
              <div key={r.name} className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
                <h3 className="w-16 shrink-0 text-sm font-bold text-gray-900">{r.name}</h3>
                <ul className="flex flex-wrap gap-2">
                  {r.prefectures.map((p) => (
                    <li key={p}>
                      <Link href={`/hospital-areas/${encodeURIComponent(p)}`} className="inline-block rounded-full border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-800 hover:border-gray-500">{p}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <h2 className="mt-10 text-xl font-bold text-gray-900">施設の種類から、探す</h2>
          <p className="mt-2 text-sm leading-7 text-gray-700">老健・デイケア・訪問リハなど、生活期の職場も探せます。</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {Object.entries(FACILITY_AREA_TYPES).map(([slug, label]) => (
              <li key={slug}>
                <Link href={`/facility-areas/${slug}`} className="inline-block rounded-full border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-800 hover:border-gray-500">{label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ⑥ 職場選びのチェック */}
      <section className="px-5 pt-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-xl font-bold text-gray-900">リハビリ職の、職場選びで見る6つのポイント</h2>
          <ol className="mt-4 grid gap-3 md:grid-cols-2">
            {CHECKS.map((c, i) => (
              <li key={c.t} className="flex gap-3 rounded-2xl border border-gray-100 bg-white p-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-relight-gradient text-sm font-bold" aria-hidden="true">{i + 1}</span>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">{c.t}</h3>
                  <p className="mt-1 text-sm leading-6 text-gray-700">{c.d}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-3 text-sm leading-7 text-gray-700">
            見学の聞き方や、応募の流れは、<Link href="/job-hunting" className="font-semibold underline">リハビリ職の就活ガイド</Link>にまとめています。
          </p>
        </div>
      </section>

      {/* ⑦ 使い方 */}
      <section className="px-5 pt-12">
        <div className="mx-auto max-w-4xl rounded-3xl border border-gray-100 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900">使い方</h2>
          <ol className="mt-4 grid gap-4 md:grid-cols-3">
            <li><p className="text-sm font-bold text-gray-900">① 探す</p><p className="mt-1 text-sm leading-6 text-gray-700">施設名や都道府県で検索。各施設の新しい口コミ{FREE_REVIEW_LIMIT}件までは、登録なしで読めます。</p></li>
            <li><p className="text-sm font-bold text-gray-900">② もっと読む</p><p className="mt-1 text-sm leading-6 text-gray-700">無料登録（ログイン）で、すべての口コミと、分類ごとのコメントを読めます。</p></li>
            <li><p className="text-sm font-bold text-gray-900">③ 書く</p><p className="mt-1 text-sm leading-6 text-gray-700">登録のとき、職種（PT・OT・ST）を選べます。口コミを投稿できます。匿名にもできます。</p></li>
          </ol>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link href={KUCHIKOMI_REGISTER} className="rounded-full bg-relight-gradient px-5 py-2.5 text-sm font-bold">無料で登録する（PT・OT・ST）</Link>
            <Link href="/login" className="rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-800">ログイン</Link>
          </div>
        </div>
      </section>

      {/* ⑧ 口コミを守る取り組み */}
      <section className="px-5 pt-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-xl font-bold text-gray-900">口コミを、安心して使うために</h2>
          <ul className="mt-3 grid gap-3 md:grid-cols-3">
            <li className="rounded-2xl border border-gray-100 bg-white p-4 text-sm leading-6 text-gray-700"><strong className="text-gray-900">投稿者は特定されません。</strong>匿名でも、記名でも、投稿者の氏名などは、ほかの利用者に表示されません（職種だけ表示されます）。</li>
            <li className="rounded-2xl border border-gray-100 bg-white p-4 text-sm leading-6 text-gray-700"><strong className="text-gray-900">通報できます。</strong>事実と異なる口コミ、権利を侵害する口コミは、各口コミの「通報」から運営へ連絡できます。</li>
            <li className="rounded-2xl border border-gray-100 bg-white p-4 text-sm leading-6 text-gray-700"><strong className="text-gray-900">施設の関係者の方へ。</strong><Link href="/contact" className="underline">運営へのメッセージ</Link>から、削除・訂正を申し出られます。</li>
          </ul>
        </div>
      </section>

      {/* ⑨ FAQ */}
      <section className="px-5 pt-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-xl font-bold text-gray-900">よくある質問</h2>
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

      {/* ⑩ 最後のCTA */}
      <section className="px-5 py-12">
        <div className="mx-auto max-w-4xl rounded-3xl bg-relight-gradient p-6 text-center sm:p-8">
          <p className="text-xl font-black text-gray-900">職場選びを、ひとりで悩まない。</p>
          <p className="mt-2 text-sm font-bold leading-6 text-gray-900">無料登録で、すべての口コミが読めます。</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <Link href={KUCHIKOMI_REGISTER} className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-gray-900">無料で登録する（PT・OT・ST）</Link>
          </div>
        </div>
      </section>
    </KuchikomiFrame>
  );
}
