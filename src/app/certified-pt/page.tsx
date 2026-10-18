import type { Metadata } from "next";
import Link from "next/link";
import PaperSiteFrame, { type GuideSite } from "@/components/paper-search/PaperSiteFrame";
import { CERT_FIELDS } from "@/content/certifiedFields";
import { SITE_NAME, SITE_URL } from "@/lib/site";

// 内容は、日本理学療法士協会の公式ページ（下の「出典」）を、2026-10-18に確認したもの。制度は変わるので、申請前に必ず公式で確かめる
const CHECKED = "2026年10月18日";
const OFFICIAL = "https://www.japanpt.or.jp/pt/lifelonglearning/new/nintei/";

const TITLE = "認定理学療法士の取り方｜要件・流れ・費用・更新を、公式情報でまとめました";
const DESCRIPTION =
  "認定理学療法士になるための3つの要件、申請から認定までの流れ、費用の目安、21の分野、5年ごとの更新、2027年4月からの変更を、日本理学療法士協会の公式情報をもとに、1ページで。確認日と出典つき。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/certified-pt" },
  openGraph: { title: `${TITLE}｜${SITE_NAME}`, description: DESCRIPTION, url: "/certified-pt" },
  twitter: { card: "summary_large_image", title: `${TITLE}｜${SITE_NAME}`, description: DESCRIPTION },
};

const REGISTER = "/register?type=pt&utm_source=certified-pt&utm_medium=web&utm_campaign=certified-pt";

const SITE: GuideSite = {
  brand: "認定理学療法士ガイド",
  href: "/certified-pt",
  register: REGISTER,
  blurb: "の、認定理学療法士の入口です。",
  links: [{ href: "/columns/certified-pt-renewal-2026", label: "更新の考え方" }],
};

// 専門理学療法士の分野ごとの取得者数: 同上（2026年3月31日データ）
const SPECIALIST_FIELDS: [string, number][] = [
  ["基礎理学療法", 384], ["神経理学療法", 416], ["小児理学療法", 289], ["運動器理学療法", 534], ["スポーツ理学療法", 415], ["心血管理学療法", 288], ["呼吸理学療法", 299],
  ["糖尿病理学療法", 247], ["地域理学療法", 240], ["予防理学療法", 246], ["支援工学理学療法", 219], ["物理療法", 32], ["理学療法教育", 107],
];

const REQUIREMENTS = [
  { n: "①", title: "指定研修カリキュラム（eラーニング）", body: "全分野共通の12コマ（1コマ90分、計18時間）。受講費12,000円（税別）。4月中旬〜3月下旬の開催。有効期限は5年間で、複数の分野を申請するときも、1回の受講で足ります。" },
  { n: "②", title: "臨床認定カリキュラム（教育機関）", body: "分野ごとの必須科目15コマ＋選択科目5コマ以上。申し込み先は教育機関で、受講費も教育機関ごとに違います。申請する前の年度までに、受講を終えている必要があります。" },
  { n: "③", title: "日本理学療法学術研修大会への参加", body: "大会の全日程に参加します（発表は不要）。例年5〜6月ごろの開催。都道府県士会やブロックの学会は、含まれません。有効期限は5年間です。" },
];

const STEPS = [
  "登録理学療法士を取得する（認定の前提）",
  "3つの要件を満たす（臨床認定カリキュラムは、申請の前の年度までに）",
  "協会のマイページから新規申請する",
  "申請料を支払う（未納だと受験できません）",
  "試験を受ける",
  "合格発表",
  "次の年度から、認定理学療法士になる",
  "認定証が届く（例年5月末ごろ。マイページでは4月から出力できます）",
];

const FAQS = [
  { q: "認定理学療法士になるには、最短で何年かかりますか？", a: "登録理学療法士が前提です。登録理学療法士は、前期研修が最短2年、後期研修が最短3年（実地経験3年＝36か月を含む）とされています。そのあと、認定の要件を満たして、申請・試験になります。個人の状況で変わるので、公式の最新の案内で確かめてください。" },
  { q: "試験は難しいですか？合格率は？", a: "試験は、マークシートの五者択一で、共通問題9問＋分野の問題15問（1分野あたり）の計24問です。合格率は、協会の公式ページでは公表を確認できませんでした（合格発表は、合格者の一覧のみ）。数字を示している情報は、出どころを確かめてください。" },
  { q: "複数の分野を取れますか？", a: "同時に申請できるのは3分野までです。指定研修カリキュラム（①）は、1回の受講で足ります。申請料は1分野ごとにかかります。" },
  { q: "申請したあとに、キャンセルや返金はできますか？", a: "公式ページには、申請後の返金・キャンセルはできないと書かれています。" },
  { q: "更新で、学会発表や論文が必要ですか？", a: "2027年4月1日以降の更新申請からは、論文の投稿や、学会での筆頭演者としての発表は、必須の要件ではなくなります（活動としては、引き続き更新の点数になります）。それより前の更新申請は、現行の要件です。" },
  { q: "このページの情報は、いつのものですか？", a: `${CHECKED}に確認した、日本理学療法士協会の公式ページの内容です。制度は改定されるため、申請の前には、必ず公式ページと最新のマニュアルをご確認ください。` },
];

const SOURCES = [
  { label: "認定理学療法士について（日本理学療法士協会）", url: OFFICIAL },
  { label: "認定・専門理学療法士制度について（同）", url: "https://www.japanpt.or.jp/pt/lifelonglearning/new/certif-specialized/" },
  { label: "生涯学習制度の見直し（同）", url: "https://www.japanpt.or.jp/pt/lifelonglearning/new/minaoshi/" },
  { label: "登録理学療法士の取得方法（同）", url: "https://www.japanpt.or.jp/pt/lifelonglearning/new/zenki-kouki/" },
  { label: "各資格の取得状況（分野別の取得者数・2026年3月31日データ）", url: "https://www.japanpt.or.jp/pt/lifelonglearning/statistics/" },
  { label: "2025年度eラーニングコンテンツ一覧（後期研修の申込金額）", url: "https://www.japanpt.or.jp/pt/seminar/asset/pdf/e-learning_20250402.pdf" },
  { label: "認定・専門理学療法士の分野・英語表記・定義（PDF）", url: "https://www.japanpt.or.jp/pt/lifelonglearning/asset/pdf/ninteisenmon_meishouteigi20221121.pdf" },
];

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-bold">{children}</h2>;
}

export default function CertifiedPtGuide() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: TITLE,
      description: DESCRIPTION,
      inLanguage: "ja",
      mainEntityOfPage: `${SITE_URL}/certified-pt`,
      datePublished: "2026-10-18",
      dateModified: "2026-10-18",
      author: { "@type": "Organization", name: SITE_NAME },
      publisher: { "@type": "Organization", name: SITE_NAME },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: SITE_NAME, item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "認定理学療法士の取り方", item: `${SITE_URL}/certified-pt` },
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
            認定PTの
            <br />
            取得・更新を、
            <br />
            かんたん管理。
          </p>
          <p className="mt-4 text-base font-bold leading-7 text-gray-900 sm:text-lg">
            資格と分野を選ぶだけ。協会の条件にそって、「あと何をすればいいか」を自動で計算します。研修や学会の記録が、そのまま進捗になります。
          </p>
          <ul className="mt-4 space-y-1.5 text-sm font-semibold text-gray-900">
            <li>✓ 登録・認定・専門理学療法士に対応（取得も、更新も）</li>
            <li>✓ 記録を残すだけ。合計と「あと何回」は、自動で計算</li>
            <li>✓ 無料・登録は1分</li>
          </ul>
          <Link href={REGISTER} className="mt-6 inline-block rounded-full bg-gray-900 px-8 py-4 text-base font-bold text-white shadow-sm">
            無料で、管理をはじめる →
          </Link>
        </div>
      </section>

      <section className="px-5 pb-6 pt-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold tracking-[0.14em] text-teal-700">CERTIFIED PT GUIDE</p>
          <h1 className="mt-2 text-2xl font-bold leading-snug tracking-tight text-balance sm:text-4xl">認定理学療法士の取り方を、公式情報で、1ページに。</h1>
          <p className="mt-3 text-sm leading-7 text-gray-700">
            要件・流れ・費用・分野・更新を、日本理学療法士協会の公式ページをもとに、まとめました。確認日は{CHECKED}です。古い制度（ポイント制のころ）の情報は、載せていません。
          </p>
          <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-xs leading-6 text-amber-900">
            制度や日程は、毎年のように変わります。申請の前には、必ず<a href={OFFICIAL} target="_blank" rel="noopener noreferrer" className="font-bold underline">公式ページ</a>と最新の申請マニュアルで確かめてください。このページは公式のものではありません。
          </div>
        </div>
      </section>

      <section className="px-5 pb-8">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-5 shadow-sm">
          <H2>先に、要点</H2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-7 text-gray-800">
            <li>前提は<strong>登録理学療法士</strong>の取得。そのうえで、3つの要件（研修2つ＋学術研修大会への参加）を満たして、申請し、試験に合格すると取得できます。</li>
            <li>試験は24問のマークシート。申請料は1分野10,000円（税別）で、3分野まで同時に申請できます。</li>
            <li>5年ごとの更新があります。更新には、活動の100点（分野ごと）と、更新時研修が必要です。</li>
            <li>2027年4月から、更新の要件が一部変わります（下の「これからの変更」）。</li>
          </ul>
        </div>
      </section>

      <section className="px-5 pb-8">
        <div className="mx-auto max-w-3xl">
          <H2>取得の3つの要件（すべて必要）</H2>
          <ul className="mt-4 space-y-3">
            {REQUIREMENTS.map((r) => (
              <li key={r.n} className="rounded-2xl border border-gray-200 bg-white p-4">
                <p className="text-sm font-bold">{r.n} {r.title}</p>
                <p className="mt-1 text-sm leading-7 text-gray-700">{r.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-5 pb-8">
        <div className="mx-auto max-w-3xl">
          <H2>取得までの流れ</H2>
          <ol className="mt-4 space-y-2">
            {STEPS.map((s, i) => (
              <li key={s} className="flex gap-3 rounded-xl border border-gray-200 bg-white p-3 text-sm leading-6">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-700 text-xs font-bold text-white">{i + 1}</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
          <p className="mt-3 text-xs leading-6 text-gray-600">
            2026年度の日程は、申請が8月3日〜8月31日、試験が12月6日（日）、合格発表が2027年2月末ごろの予定でした。2027年度以降の日程は、公式の発表を待ってください（例年、8月ごろ申請・12月ごろ試験）。
          </p>
        </div>
      </section>

      <section className="px-5 pb-8">
        <div className="mx-auto max-w-3xl">
          <H2>費用の目安</H2>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-gray-200 bg-white">
            <table className="w-full min-w-[460px] text-left text-sm">
              <thead className="bg-gray-50 text-xs text-gray-600">
                <tr><th className="px-3 py-2">項目</th><th className="px-3 py-2">金額（公式の記載）</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr><td className="px-3 py-2">指定研修カリキュラム（eラーニング）</td><td className="px-3 py-2">12,000円（税別）</td></tr>
                <tr><td className="px-3 py-2">臨床認定カリキュラム</td><td className="px-3 py-2">教育機関ごとに違う</td></tr>
                <tr><td className="px-3 py-2">日本理学療法学術研修大会の参加費</td><td className="px-3 py-2">大会ごとに違う（大会の公式サイトで確認）</td></tr>
                <tr><td className="px-3 py-2">（前提）登録理学療法士の後期研修（eラーニング）</td><td className="px-3 py-2">1コマ300円〜600円、一部のセット2,000円（2025年度の協会の一覧）</td></tr>
                <tr><td className="px-3 py-2">新規の申請料</td><td className="px-3 py-2">1分野につき10,000円（税別）</td></tr>
                <tr><td className="px-3 py-2">更新の申請料</td><td className="px-3 py-2">1分野につき10,000円（税別）</td></tr>
                <tr><td className="px-3 py-2">更新時研修（eラーニング）</td><td className="px-3 py-2">1分野につき5,000円（税別）</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs leading-6 text-gray-600">
            後期研修の金額は2025年度の一覧で、2026年度の金額は確認できていません。講座によっては、士会の研修会で受ける場合もあります。会費（協会＋都道府県士会）も別にかかりますが、都道府県ごとに違うため、載せていません。総額は、公式で確かめてください。
          </p>
        </div>
      </section>

      <section className="px-5 pb-8">
        <div className="mx-auto max-w-3xl">
          <div id="fields" className="scroll-mt-20"><H2>認定の分野（21分野）</H2></div>
          <p className="mt-2 text-sm leading-7 text-gray-700">分野ごとに申請し、試験は共通問題＋その分野の問題です。分野の名前から、分野ごとのページへ進めます。数字は、各分野の取得者数（2026年3月31日時点、協会の公表）です。人気や、取りやすさを示すものではありません。</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {CERT_FIELDS.map((f) => (
              <li key={f.slug}>
                <Link href={`/certified-pt/${f.slug}`} className="block rounded-full border border-teal-200 bg-white px-3 py-1.5 text-xs font-medium text-teal-900 hover:border-teal-500">
                  {f.name}
                  <span className="ml-1.5 font-normal text-gray-500">{f.n.toLocaleString()}人</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-5 pb-8">
        <div className="mx-auto max-w-3xl">
          <H2>専門理学療法士（参考）</H2>
          <p className="mt-2 text-sm leading-7 text-gray-700">
            専門理学療法士は、認定よりも高い専門性を示す、別の資格です。協会の公式ページでは、新規申請の要件として、指定研修カリキュラム、士会・ブロック主催の学術大会への参加、連合会員団体の学術大会での発表、査読付きの原著論文が挙げられ、口頭試問があります。こちらも、登録理学療法士が前提で、5年ごとの更新です。細かい要件・日程・費用は、このページでは扱いません。公式の最新の案内で、確かめてください。
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {SPECIALIST_FIELDS.map(([f, n]) => (
              <li key={f} className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-800">
                {f}
                <span className="ml-1.5 font-normal text-gray-500">{n.toLocaleString()}人</span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs leading-6 text-gray-500">分野ごとの取得者数は、2026年3月31日時点（協会の公表）です。</p>
        </div>
      </section>

      <section className="px-5 pb-8">
        <div className="mx-auto max-w-3xl">
          <H2>5年ごとの更新</H2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-7 text-gray-800">
            <li>前提は、登録理学療法士の取得（登録理学療法士も、別に更新が必要です）。</li>
            <li>申請は、例年1月中（年度で前後）。活動の期間は、取得・更新した年度の4月から、申請のときまで。</li>
            <li><strong>維持・研鑽のための活動で、100点</strong>（分野ごと）。登録理学療法士のポイントと、重ねて使うことはできません。</li>
            <li><strong>更新時研修</strong>（eラーニング。共通4コマ＋分野別1コマ、計5時間）。複数の分野を持つときは、分野ごとに受講が必要です。</li>
            <li>2022年度以降の初回の更新に限り、学会発表などの要件が免除され、更新の年度が2年間あります。</li>
          </ul>
          <p className="mt-3 text-sm">
            更新の記録の残し方は、<Link href="/columns/certified-pt-renewal-2026" className="font-bold text-teal-800 underline">コラム「認定・専門理学療法士の更新」</Link>へ。
          </p>
        </div>
      </section>

      <section className="px-5 pb-8">
        <div className="mx-auto max-w-3xl rounded-2xl border border-sky-200 bg-sky-50 p-5">
          <H2>これからの変更（公式の発表）</H2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-7 text-gray-800">
            <li>2026年4月1日から、更新の100点で認められる活動が広がりました（ブロック発刊誌への論文投稿、都道府県士会承認の研修会の講師や症例検討会の座長、所定の学術雑誌の論文査読）。</li>
            <li>2027年4月1日以降の更新申請から、論文投稿または筆頭演者での学会発表が、必須の要件ではなくなります。</li>
            <li>2027年4月1日から、更新時研修は、eラーニングから、分野別研修（3コマ）に変わります。</li>
            <li>協会は、2029年度に、制度を大きく改定する予定としています。</li>
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
          <h2 className="text-xl font-bold text-white">取得・更新の進み具合を、アプリで管理する</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-7 text-white/85">
            無料アプリ「Re:light」では、資格ごとの目標（必要な件数・更新サイクル）を登録して、研修や学会発表の記録を、進捗として積み上げられます。
          </p>
          <Link href={REGISTER} className="mt-5 inline-block rounded-full bg-white px-7 py-3.5 text-sm font-bold text-gray-900">
            Re:lightを無料で使う（1分）
          </Link>
        </div>
      </section>

      <section className="px-5 py-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-sm font-bold">出典（{CHECKED}に確認）</h2>
          <ul className="mt-2 space-y-1 text-xs leading-6 text-gray-600">
            {SOURCES.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline">{s.label}</a>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-gray-500">最終更新: 2026-10-18</p>
        </div>
      </section>
    </PaperSiteFrame>
  );
}
