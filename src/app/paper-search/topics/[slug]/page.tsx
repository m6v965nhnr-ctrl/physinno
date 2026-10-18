import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PaperSearch from "@/components/PaperSearch";
import PaperSiteFrame, { PAPER_SITE_REGISTER } from "@/components/paper-search/PaperSiteFrame";
import { PAPER_TOPICS, PAPER_TOPICS_UPDATED, getTopic } from "@/content/paperTopics";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return PAPER_TOPICS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const t = getTopic((await params).slug);
  if (!t) return {};
  const title = `${t.ja}の論文の探し方｜日本語で、8サイトまとめて検索`;
  const description = `${t.ja}の論文を探すための、日本語・英語の検索語（${t.en}）と、関連する言葉。登録なし・無料で、PubMed・J-STAGEなど8つの論文サイトを、まとめて検索できます。`;
  return {
    title,
    description,
    alternates: { canonical: `/paper-search/topics/${t.slug}` },
    openGraph: { title: `${title}｜${SITE_NAME}`, description, url: `/paper-search/topics/${t.slug}` },
  };
}

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const t = getTopic((await params).slug);
  if (!t) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "理学療法の論文検索", item: `${SITE_URL}/paper-search` },
      { "@type": "ListItem", position: 2, name: "テーマから探す", item: `${SITE_URL}/paper-search/topics` },
      { "@type": "ListItem", position: 3, name: t.ja, item: `${SITE_URL}/paper-search/topics/${t.slug}` },
    ],
  };
  const others = PAPER_TOPICS.filter((x) => x.slug !== t.slug && x.area === t.area);

  return (
    <PaperSiteFrame>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-4xl px-5 py-10">
        <nav className="text-sm text-gray-500" aria-label="パンくず">
          <Link href="/paper-search" className="hover:text-gray-800">論文検索</Link>
          {" › "}
          <Link href="/paper-search/topics" className="hover:text-gray-800">テーマ</Link>
        </nav>
        <h1 className="mt-4 text-2xl font-bold leading-snug sm:text-3xl">{t.ja}の、論文の探し方</h1>
        <p className="mt-3 text-sm leading-7 text-gray-700">
          {t.ja}の論文を、日本語・英語の両方で、まとめて探せます。検索語と関連する言葉を、使い分けると、見つかる論文が増えます。
        </p>

        <section className="mt-6 grid gap-3 sm:grid-cols-2" aria-label="検索語">
          <div className="rounded-2xl border border-gray-200 bg-white p-4">
            <p className="text-xs font-bold text-teal-800">日本語の検索語</p>
            <p className="mt-1 text-base font-bold">{t.ja}</p>
            <p className="mt-2 text-xs text-gray-500">関連する言葉</p>
            <ul className="mt-1 flex flex-wrap gap-1.5">
              {t.related.ja.map((w) => (
                <li key={w} className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-800">{w}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-4">
            <p className="text-xs font-bold text-teal-800">英語の検索語</p>
            <p className="mt-1 text-base font-bold">{t.en}</p>
            <p className="mt-2 text-xs text-gray-500">関連する言葉</p>
            <ul className="mt-1 flex flex-wrap gap-1.5">
              {t.related.en.map((w) => (
                <li key={w} className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-800">{w}</li>
              ))}
            </ul>
          </div>
        </section>

        <p className="mt-4 rounded-2xl bg-teal-50 p-4 text-sm leading-7 text-teal-950">
          <span className="font-bold">探し方のポイント: </span>
          {t.tip}
        </p>

        <section className="mt-6 rounded-2xl bg-white p-3 shadow-sm sm:p-5" aria-label="検索">
          <PaperSearch initialQuery={t.ja} />
        </section>

        <p className="mt-4 text-xs leading-6 text-gray-500">
          検索結果は、各論文サイトの情報です。治療の効果や、臨床での使い方は、論文の原文を読んで、判断してください。エビデンスレベルの見方は、
          <Link href="/evidence-levels" className="mx-1 underline">エビデンスレベル早見表</Link>
          へ。
        </p>

        {others.length > 0 && (
          <section className="mt-8">
            <h2 className="text-base font-bold">同じ分野のテーマ</h2>
            <ul className="mt-2 flex flex-wrap gap-2">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={`/paper-search/topics/${o.slug}`} className="inline-block rounded-full border border-teal-200 bg-white px-4 py-2 text-sm text-teal-900 hover:bg-teal-50">{o.ja}</Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mt-10 rounded-2xl bg-[var(--lp-g900,#134e5a)] p-6 text-center text-white">
          <h2 className="text-base font-bold text-white">見つけた論文を、保存して、AIで読む</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-7 text-white/85">無料アプリ「Re:light」で、論文の保存・AIでの要約と質問（出典つき）が使えます。</p>
          <Link href={PAPER_SITE_REGISTER} className="mt-4 inline-block rounded-full bg-white px-6 py-3 text-sm font-bold text-gray-900">
            Re:lightを無料で使う（1分）
          </Link>
        </section>
        <p className="mt-6 text-center text-xs text-gray-500">最終更新: {PAPER_TOPICS_UPDATED}</p>
      </div>
    </PaperSiteFrame>
  );
}
