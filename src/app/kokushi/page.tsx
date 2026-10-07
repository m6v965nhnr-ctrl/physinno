import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { examYear, getPublicExams } from "@/lib/kokushi";
import KokushiCta from "./KokushiCta";

export const revalidate = 86400;

const TITLE = "理学療法士国家試験 過去問【第57回〜第61回】無料・正答つき";
const DESCRIPTION =
  "理学療法士国家試験の過去問（第57回〜第61回・各200問）を、ログインなしで無料公開。1問ずつ解いて正答を確認できます。無料登録で全問の解説・間違えた問題の復習・模擬試験も。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/kokushi" },
  openGraph: { title: `${TITLE}｜${SITE_NAME}`, description: DESCRIPTION, url: "/kokushi" },
  twitter: { card: "summary_large_image", title: `${TITLE}｜${SITE_NAME}`, description: DESCRIPTION },
};

const TIPS = [
  {
    title: "まずは直近の回を、時間を計って通しで解く",
    body: "午前・午後それぞれ100問を160分で解きます。最初に1回分を通して解くと、時間配分と苦手な科目がはっきりします。",
  },
  {
    title: "間違えた問題だけを、繰り返す",
    body: "国家試験は過去問と似た論点がくり返し出題されます。正解した問題より、間違えた問題を3回解き直すほうが点数は伸びます。",
  },
  {
    title: "科目ごとの正答率で、勉強の配分を決める",
    body: "専門（運動学・評価学・治療学）と共通（解剖・生理・病理など）のどちらが弱いかを数字で見ると、残りの期間の使い方が決まります。",
  },
];

export default async function KokushiIndexPage() {
  const exams = await getPublicExams();
  const totalQuestions = exams.reduce((sum, e) => sum + e.total, 0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: SITE_NAME, item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "理学療法士国家試験 過去問", item: `${SITE_URL}/kokushi` },
    ],
  };

  return (
    <main className="min-h-screen bg-[#fafafa] px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-800">
          ← {SITE_NAME}
        </Link>

        <h1 className="mt-6 text-2xl font-bold leading-snug text-gray-900 sm:text-3xl">
          理学療法士国家試験 過去問
          <span className="block text-base font-semibold text-gray-600 sm:text-lg">
            第57回〜第61回・全{totalQuestions.toLocaleString()}問を無料で（正答つき）
          </span>
        </h1>

        <p className="mt-4 text-sm leading-7 text-gray-700">
          厚生労働省が公開している理学療法士国家試験の問題を、1問ずつ解いて正答を確認できます。
          ログインは不要で、解説も3問まで読めます。全問の解説・間違えた問題の復習・模擬試験は、無料登録で使えます。
        </p>

        <h2 className="mt-10 text-lg font-bold text-gray-900">回ごとに解く</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {exams.map((e) => (
            <li key={e.exam_no}>
              <Link
                href={`/kokushi/${e.exam_no}`}
                className="block rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-gray-400"
              >
                <span className="block text-lg font-semibold text-gray-900">第{e.exam_no}回（{examYear(e.exam_no)}年）</span>
                <span className="mt-1 block text-sm text-gray-600">午前・午後 全{e.total}問</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <KokushiCta />
        </div>

        <h2 className="mt-12 text-lg font-bold text-gray-900">過去問の効果的な使い方</h2>
        <div className="mt-4 space-y-4">
          {TIPS.map((t) => (
            <section key={t.title} className="rounded-2xl bg-white p-5">
              <h3 className="text-base font-semibold text-gray-900">{t.title}</h3>
              <p className="mt-2 text-sm leading-7 text-gray-700">{t.body}</p>
            </section>
          ))}
        </div>

        <p className="mt-10 text-xs leading-6 text-gray-500">
          出典：厚生労働省ホームページ「理学療法士国家試験の問題及び正答」。正答は厚生労働省の発表に基づきます。採点から除外された問題には、その旨を表示しています。
        </p>
      </div>
    </main>
  );
}
