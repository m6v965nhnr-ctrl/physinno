import PaperCredits from "@/components/papers/PaperCredits";
import type { Metadata } from "next";
import Link from "next/link";
import PaperSearch from "@/components/PaperSearch";
import PaperSiteFrame, { PAPER_SITE_REGISTER } from "@/components/paper-search/PaperSiteFrame";
import { PAPER_TOPICS, PAPER_TOPICS_UPDATED } from "@/content/paperTopics";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const TITLE = "理学療法の論文検索｜日本語で、8サイトまとめて、無料・登録なし";
const DESCRIPTION =
  "理学療法士のための論文検索。日本語で入力すると、英語に自動で翻訳して、PubMed・J-STAGE・CiNiiなど8つの論文サイトを、まとめて検索します。登録不要・無料。新しい順・被引用数順の並べ替え、エビデンスレベルでの絞り込みもできます。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/paper-search" },
  openGraph: { title: `${TITLE}｜${SITE_NAME}`, description: DESCRIPTION, url: "/paper-search" },
  twitter: { card: "summary_large_image", title: `${TITLE}｜${SITE_NAME}`, description: DESCRIPTION },
};

const SITES = [
  { name: "PubMed", note: "医学・生命科学の論文（米国国立医学図書館）", url: "https://pubmed.ncbi.nlm.nih.gov/" },
  { name: "J-STAGE", note: "日本の学会誌・論文（科学技術振興機構）", url: "https://www.jstage.jst.go.jp/" },
  { name: "CiNii Research", note: "日本の論文・書籍・研究データ（国立情報学研究所）", url: "https://cir.nii.ac.jp/" },
  { name: "Semantic Scholar", note: "学術論文の検索（AI2）", url: "https://www.semanticscholar.org/" },
  { name: "Europe PMC", note: "生命科学の論文（欧州）", url: "https://europepmc.org/" },
  { name: "OpenAlex", note: "学術論文の、オープンなデータ", url: "https://openalex.org/" },
  { name: "ClinicalTrials.gov", note: "臨床試験の登録", url: "https://clinicaltrials.gov/" },
  { name: "DOAJ", note: "オープンアクセスの雑誌", url: "https://doaj.org/" },
];

const STEPS = [
  { title: "日本語で、検索語を入れる", body: "「変形性膝関節症」「脳卒中 歩行」など、いつもの言葉で大丈夫です。英語でも検索できます。" },
  { title: "英語に翻訳して、日英で同時に検索", body: "日本語を、英語に自動で翻訳し、日本語・英語の両方で、8つのサイトを検索します。" },
  { title: "新しい順・被引用数順で見て、原文へ", body: "気になる論文は、掲載元のページへ移動します。エビデンスレベルでの絞り込みもできます。" },
];

const FAQS = [
  { q: "登録や料金は、必要ですか？", a: "検索は、登録なしで、無料で使えます。論文の保存や、AIでの要約・質問は、無料登録後に、Re:lightで使えます。" },
  { q: "どのサイトを、検索していますか？", a: "PubMed・J-STAGE・CiNii Research・Semantic Scholar・Europe PMC・OpenAlex・ClinicalTrials.gov・DOAJ の8つです。PEDro・医中誌Web（有料）・Google Scholarは、検索語を入れた外部リンクで開けます。" },
  { q: "日本語で検索しても、英語の論文は、出ますか？", a: "はい。検索語を英語に自動で翻訳して、英語の論文も、あわせて探します。翻訳は、医学用語の用語集を先に使い、足りない部分は機械翻訳で補います。うまく翻訳されないときは、英語で入れ直してください。" },
  { q: "被引用数で、並べ替えられますか？", a: "はい。PubMed・Semantic Scholar・Europe PMC・OpenAlex の論文は、引用された数を取得できます。取得できないサイトの論文は、被引用数順では、後ろに並びます。" },
  { q: "エビデンスレベルは、どう決めていますか？", a: "出版タイプ・登録情報で確実に分かるものと、題名・要約の文面から推定するものがあります。推定は、確実ではありません。「確実に判定できたものだけ」に絞る設定もあります。論文は、必ず、原文で確かめてください。" },
  { q: "患者さんの情報を、入れてもよいですか？", a: "入れないでください。検索語は、外部の論文サイトと、翻訳のサービスに、送られます。" },
];

export default function PaperSearchLanding() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "理学療法の論文検索",
      url: `${SITE_URL}/paper-search`,
      description: DESCRIPTION,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web",
      inLanguage: "ja",
      offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  return (
    <PaperSiteFrame>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="px-5 pb-6 pt-10">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-bold tracking-[0.14em] text-teal-700">PAPER SEARCH</p>
          <h1 className="mt-2 text-2xl font-bold leading-snug tracking-tight sm:text-4xl">
            理学療法の論文を、
            <br />
            日本語で、8サイトまとめて。
          </h1>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="特長">
            {["無料", "登録なし", "すぐ終わる"].map((t) => (
              <li key={t} className="rounded-full bg-teal-50 px-3.5 py-1.5 text-sm font-bold text-teal-800">
                <span aria-hidden="true">✓ </span>
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-700">
            日本語で入れると、英語に翻訳して、日本語と英語の両方で、PubMed・J-STAGE・CiNiiなどを、まとめて検索します。論文探しの時間を、短くします。
          </p>
        </div>
      </section>

      <section className="px-5 pb-10" aria-label="論文検索">
        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-3 shadow-sm sm:p-5">
          <PaperSearch />
        </div>
      </section>

      <section className="px-5 pb-10">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-xl font-bold">使い方（3ステップ）</h2>
          <ol className="mt-4 grid gap-3 sm:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.title} className="rounded-2xl border border-gray-200 bg-white p-4">
                <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-full bg-relight-gradient text-sm font-bold">{i + 1}</span>
                <h3 className="mt-3 text-base font-bold">{s.title}</h3>
                <p className="mt-1 text-sm leading-7 text-gray-700">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-5 pb-10">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-xl font-bold">テーマから探す</h2>
          <p className="mt-1 text-sm leading-7 text-gray-600">よく探されるテーマの、検索語と、関連する言葉をまとめました。</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {PAPER_TOPICS.map((t) => (
              <li key={t.slug}>
                <Link href={`/paper-search/topics/${t.slug}`} className="inline-block rounded-full border border-teal-200 bg-white px-4 py-2 text-sm font-medium text-teal-900 hover:bg-teal-50">
                  {t.ja}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm">
            <Link href="/paper-search/topics" className="font-bold text-teal-800 underline">テーマの一覧を見る →</Link>
          </p>
        </div>
      </section>

      <section className="px-5 pb-10">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-xl font-bold">検索している、8つのサイト</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {SITES.map((s) => (
              <li key={s.name} className="rounded-xl border border-gray-200 bg-white p-3">
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-teal-900 underline">{s.name}</a>
                <p className="mt-0.5 text-xs leading-5 text-gray-600">{s.note}</p>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs leading-6 text-gray-500">各サイトが公開しているデータから、題名・要旨などを取得して表示します。論文の本文は、掲載元のページで読みます。</p>
          <div className="mt-2"><PaperCredits /></div>
        </div>
      </section>

      <section className="px-5 pb-10">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-xl font-bold">よくある質問</h2>
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
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-xl font-bold text-white">見つけた論文を、保存して、AIで読む</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-7 text-white/85">
            無料アプリ「Re:light」では、論文の保存・AIでの要約と質問（論文を根拠に、出典つき）・臨床アイデア・認定理学療法士の進捗管理が使えます。
          </p>
          <Link href={PAPER_SITE_REGISTER} className="mt-5 inline-block rounded-full bg-white px-7 py-3.5 text-sm font-bold text-gray-900">
            Re:lightを無料で使う（1分）
          </Link>
        </div>
      </section>

      <p className="px-5 py-6 text-center text-xs text-gray-500">最終更新: {PAPER_TOPICS_UPDATED}</p>
    </PaperSiteFrame>
  );
}
