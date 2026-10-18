import type { Metadata } from "next";
import Link from "next/link";
import PaperSiteFrame from "@/components/paper-search/PaperSiteFrame";
import { PAPER_TOPICS, PAPER_TOPICS_UPDATED } from "@/content/paperTopics";
import { SITE_NAME } from "@/lib/site";

const TITLE = "理学療法の論文を、テーマから探す｜検索語と関連語";
const DESCRIPTION = "変形性膝関節症・腰痛・脳卒中・COPD・転倒予防など、理学療法でよく探されるテーマごとに、日本語・英語の検索語と、関連する言葉をまとめました。そのまま、8つの論文サイトを、まとめて検索できます。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/paper-search/topics" },
  openGraph: { title: `${TITLE}｜${SITE_NAME}`, description: DESCRIPTION, url: "/paper-search/topics" },
};

export default function TopicsIndex() {
  const areas = Array.from(new Set(PAPER_TOPICS.map((t) => t.area)));
  return (
    <PaperSiteFrame>
      <div className="mx-auto max-w-4xl px-5 py-10">
        <Link href="/paper-search" className="text-sm text-gray-500 hover:text-gray-800">← 論文検索</Link>
        <h1 className="mt-4 text-2xl font-bold leading-snug sm:text-3xl">理学療法の論文を、テーマから探す</h1>
        <p className="mt-3 text-sm leading-7 text-gray-700">テーマを選ぶと、検索語・関連する言葉・探し方のポイントと、その場での検索結果が出ます。</p>
        {areas.map((area) => (
          <section key={area} className="mt-8" aria-labelledby={`a-${area}`}>
            <h2 id={`a-${area}`} className="text-lg font-bold">{area}</h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {PAPER_TOPICS.filter((t) => t.area === area).map((t) => (
                <li key={t.slug}>
                  <Link href={`/paper-search/topics/${t.slug}`} className="block rounded-xl border border-gray-200 bg-white p-4 hover:bg-teal-50">
                    <span className="block text-sm font-bold">{t.ja}</span>
                    <span className="mt-0.5 block text-xs text-gray-500">{t.en}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
        <p className="mt-8 text-xs text-gray-500">最終更新: {PAPER_TOPICS_UPDATED}</p>
      </div>
    </PaperSiteFrame>
  );
}
