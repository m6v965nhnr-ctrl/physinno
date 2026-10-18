import type { Metadata } from "next";
import Link from "next/link";
import PaperSiteFrame, { type GuideSite } from "@/components/paper-search/PaperSiteFrame";
import { REGIONS } from "@/lib/prefectures";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const TITLE = "理学療法士の就活ガイド｜病院の選び方・見学・応募の流れ";
const DESCRIPTION =
  "理学療法士・理学療法学生の就職活動を、1ページで。就活の流れ、病院を選ぶときに見る10のポイント、病院見学で聞くこと、履歴書・面接の準備、全国の病院の探し方までを、チェックリストつきでまとめました。無料。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/job-hunting" },
  openGraph: { title: `${TITLE}｜${SITE_NAME}`, description: DESCRIPTION, url: "/job-hunting" },
  twitter: { card: "summary_large_image", title: `${TITLE}｜${SITE_NAME}`, description: DESCRIPTION },
};

const REGISTER = "/register?type=student&utm_source=job-hunting&utm_medium=web&utm_campaign=job-hunting";

const SITE: GuideSite = {
  brand: "理学療法士の就活ガイド",
  href: "/job-hunting",
  register: REGISTER,
  blurb: "の、就職活動の入口です。",
  links: [{ href: "/hospital-areas", label: "病院を探す" }],
};

const STEPS = [
  { label: "気になる", body: "働き方・領域・地域から、気になる病院を集める。まずは、数を絞らずに、広く見る。" },
  { label: "見学予約", body: "病院の募集要項や公式サイトで、見学の受け付け方法を確認して、予約する。" },
  { label: "見学済み", body: "見学で見たこと・聞いたことを、その日のうちに記録する。比べるときの材料になる。" },
  { label: "応募", body: "募集要項と、提出書類・締め切りを確認して、応募する。" },
  { label: "面接", body: "志望理由・希望する領域・将来像を、自分の言葉で話せるようにしておく。" },
  { label: "内定", body: "条件（給与・休日・配属）を、書面で確認する。迷うときは、見学した記録と見比べる。" },
];

const POINTS = [
  { t: "病院の役割", d: "急性期・回復期・生活期（訪問・通所）・外来など。自分が学びたい時期の患者さんに関われるか。" },
  { t: "配属と担当領域", d: "希望の領域に配属されるか。ローテーションの有無。入職後に、異動があるか。" },
  { t: "教育体制", d: "新人教育の内容、勉強会・症例検討、相談できる先輩の人数。プリセプター制度の有無。" },
  { t: "PTの人数と年齢構成", d: "何人で、どの年代が多いか。先輩が少なすぎないか。辞める人が多くないか。" },
  { t: "1日の仕事量と残業", d: "1日に担当する患者さんの人数・単位数の目安、記録や会議の時間、残業の実際。" },
  { t: "給与の内訳", d: "基本給と手当の内訳、昇給、賞与。総額だけでなく、何が含まれているかを見る。" },
  { t: "休日と有給", d: "年間休日、有給の取りやすさ、夏季・冬季の休み。希望の日に休めるか。" },
  { t: "学会・研修の支援", d: "参加費や交通費の補助、勤務扱いかどうか。発表の機会があるか。" },
  { t: "資格取得のサポート", d: "認定・専門理学療法士をめざす人への支援。研修の日の勤務の調整。" },
  { t: "通勤・住まい・福利厚生", d: "通勤時間、寮や住宅手当、院内の保育・食堂など。長く続けられる環境か。" },
];

const VISIT_QUESTIONS = [
  "新人が最初の1年で、1日にどのくらいの患者さんを担当しますか？",
  "新人教育は、具体的にどんな流れですか？ 相談できる人は決まっていますか？",
  "リハビリスタッフは、何人で、どんな年代の構成ですか？",
  "残業や、持ち帰りの仕事は、どのくらいありますか？",
  "有給は、どのくらい取れていますか？ 希望の日に休めますか？",
  "学会や研修の参加は、どんな支援がありますか？",
  "他の職種（医師・看護師など）と、どんなふうに連携していますか？",
  "この病院で働く、先輩の1日の流れを、見せてもらえますか？",
];

const FAQS = [
  { q: "病院見学は、必ず必要ですか？", a: "必須ではありません。ただ、職場の雰囲気や、スタッフの様子は、資料だけでは分かりにくいので、見学をする人は多いです。受け付け方法は、病院ごとに違うため、募集要項や公式サイトで確認してください。" },
  { q: "給与や休日は、どこで確認すればよいですか？", a: "病院の募集要項（求人票）が、基本です。口コミは、あくまで参考にして、内定の前には、条件を書面で確かめてください。" },
  { q: "口コミは、信じてよいですか？", a: "1人の感想は、その人の立場や時期に左右されます。複数の人の評価の傾向を見て、見学で自分の目で確かめるのがおすすめです。Re:lightの口コミは、理学療法士による6項目の評価です。" },
  { q: "どこまで絞ってから、見学すればよいですか？", a: "最初は、広く見て構いません。見学のあとに、今回のチェックリストで比べると、絞りやすくなります。" },
  { q: "履歴書や面接の準備は、どうすればよいですか？", a: "下のコラムに、履歴書・自己PRの書き方をまとめています。志望理由は、見学で見たことと結びつけると、説得力が出ます。" },
];

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-bold">{children}</h2>;
}

export default function JobHuntingGuide() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: TITLE,
      description: DESCRIPTION,
      inLanguage: "ja",
      mainEntityOfPage: `${SITE_URL}/job-hunting`,
      datePublished: "2026-10-19",
      dateModified: "2026-10-19",
      author: { "@type": "Organization", name: SITE_NAME },
      publisher: { "@type": "Organization", name: SITE_NAME },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: SITE_NAME, item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "理学療法士の就活ガイド", item: `${SITE_URL}/job-hunting` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  return (
    <PaperSiteFrame site={SITE}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="px-5 pt-6">
        <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl bg-relight-gradient p-6 shadow-sm sm:p-8">
          <p className="text-xs font-bold tracking-[0.14em] text-gray-900/70">Re:light なら</p>
          <p className="mt-2 text-[34px] font-black leading-tight tracking-tight text-gray-900 sm:text-5xl">
            就活の
            <br />
            進み具合を、
            <br />
            ひと目で管理。
          </p>
          <p className="mt-4 text-base font-bold leading-7 text-gray-900 sm:text-lg">
            気になる → 見学予約 → 見学済み → 応募 → 面接 → 内定。病院ごとの状況を、一覧で記録できます。約5,000の病院と、PTの職場の口コミ（6項目）も、同じアプリで見られます。
          </p>
          <ul className="mt-4 space-y-1.5 text-sm font-semibold text-gray-900">
            <li>✓ 病院ページから、「見学したい」をワンタップで記録</li>
            <li>✓ 給与・休日・病床数などで、病院を絞り込み</li>
            <li>✓ 無料・登録は1分</li>
          </ul>
          <Link href={REGISTER} className="mt-6 inline-block rounded-full bg-gray-900 px-8 py-4 text-base font-bold text-white shadow-sm">
            無料ではじめる（1分） →
          </Link>
        </div>
      </section>

      <section className="px-5 pb-6 pt-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold tracking-[0.14em] text-teal-700">JOB HUNTING GUIDE</p>
          <h1 className="mt-2 text-2xl font-bold leading-snug tracking-tight text-balance sm:text-4xl">理学療法士の就活を、チェックリストで。</h1>
          <p className="mt-3 text-sm leading-7 text-gray-700">
            就活の流れ、病院を選ぶときに見るポイント、病院見学で聞くことを、まとめました。一般的な考え方で、病院ごとの条件は、各病院の募集要項が優先です。
          </p>
        </div>
      </section>

      <section className="px-5 pb-8">
        <div className="mx-auto max-w-3xl">
          <H2>就活の流れ</H2>
          <ol className="mt-4 space-y-2">
            {STEPS.map((s, i) => (
              <li key={s.label} className="flex gap-3 rounded-xl border border-gray-200 bg-white p-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-700 text-xs font-bold text-white">{i + 1}</span>
                <span className="text-sm leading-6">
                  <b className="mr-2">{s.label}</b>
                  <span className="text-gray-700">{s.body}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-5 pb-8">
        <div className="mx-auto max-w-3xl">
          <H2>病院を選ぶときに見る、10のポイント</H2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {POINTS.map((p, i) => (
              <li key={p.t} className="rounded-2xl border border-gray-200 bg-white p-4">
                <p className="text-sm font-bold">
                  <span className="mr-2 text-teal-700">{i + 1}</span>
                  {p.t}
                </p>
                <p className="mt-1 text-sm leading-6 text-gray-700">{p.d}</p>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs leading-6 text-gray-600">
            Re:lightの病院ページでは、PTによる口コミ（職場環境・教育体制・給与・残業の少なさ・有休消化率・風通しの良さ）を、項目ごとのバーで見られます。資格の支援については、
            <Link href="/certified-pt" className="underline">認定理学療法士の取り方</Link>
            もご覧ください。
          </p>
        </div>
      </section>

      <section className="px-5 pb-8">
        <div className="mx-auto max-w-3xl">
          <H2>病院見学で聞くこと</H2>
          <ul className="mt-4 space-y-2">
            {VISIT_QUESTIONS.map((q) => (
              <li key={q} className="flex gap-3 rounded-xl border border-gray-200 bg-white p-3 text-sm leading-6">
                <span aria-hidden className="text-teal-700">□</span>
                <span>{q}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs leading-6 text-gray-600">聞きにくいことは、見学のあと、メールで質問する方法もあります。聞いた答えは、その日のうちに記録しておくと、比べやすくなります。</p>
        </div>
      </section>

      <section className="px-5 pb-8">
        <div className="mx-auto max-w-3xl">
          <H2>全国の病院を探す</H2>
          <p className="mt-2 text-sm leading-7 text-gray-700">リハビリテーション科のある病院を、地方ごとに探せます。</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {REGIONS.map((r) => (
              <li key={r.name}>
                <Link href={`/hospital-areas#${r.name}`} className="block rounded-full border border-teal-200 bg-white px-4 py-2 text-sm font-medium text-teal-900 hover:border-teal-500">
                  {r.name}の病院
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-5 pb-8">
        <div className="mx-auto max-w-3xl">
          <H2>履歴書・面接・キャリアの記事</H2>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              ["resume-writing-pt", "理学療法士の履歴書・職務経歴書の書き方｜自己PR例文つき"],
              ["portfolio-for-job-change", "PTの転職で差がつくポートフォリオの作り方"],
              ["pt-salary-reality", "理学療法士は「稼げない」って本当？年収の実態とこれからの働き方"],
              ["pt-oversupply-reality", "理学療法士は「多すぎる」のか？需給の実態とこれからのキャリア戦略"],
            ].map(([slug, label]) => (
              <li key={slug}>
                <Link href={`/columns/${slug}`} className="block rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800 hover:border-gray-400">{label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-5 pb-10">
        <div className="mx-auto max-w-3xl">
          <H2>よくある質問</H2>
          <dl className="mt-4 space-y-3">
            {FAQS.map((f) => (
              <div key={f.q} className="rounded-2xl border border-gray-200 bg-white p-4">
                <dt className="text-sm font-bold">{f.q}</dt>
                <dd className="mt-1 text-sm leading-7 text-gray-700">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-[var(--lp-g900,#134e5a)] px-5 py-12 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-xl font-bold text-white">就活の記録と病院の口コミを、ひとつのアプリで</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-7 text-white/85">
            学生は、国試の過去問・実習の管理・実習先の口コミも、無料で使えます。
          </p>
          <Link href={REGISTER} className="mt-5 inline-block rounded-full bg-white px-7 py-3.5 text-sm font-bold text-gray-900">
            Re:lightを無料で使う（1分）
          </Link>
        </div>
      </section>

      <p className="px-5 py-6 text-center text-xs text-gray-500">最終更新: 2026-10-19</p>
    </PaperSiteFrame>
  );
}
