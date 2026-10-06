import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { SESSIONS, SESSION_LABEL, examYear, getPublicList, questionPath } from "@/lib/kokushi";
import KokushiCta from "../KokushiCta";

export const revalidate = 86400;

type Props = { params: Promise<{ exam: string }> };

function parseExam(value: string) {
  const n = Number(value);
  return Number.isInteger(n) && n > 0 && n < 200 ? n : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const examNo = parseExam((await params).exam);
  if (!examNo) return { title: "過去問", robots: { index: false } };
  const title = `第${examNo}回 理学療法士国家試験（${examYear(examNo)}年）過去問 全200問・正答つき`;
  const description = `第${examNo}回理学療法士国家試験（${examYear(examNo)}年実施）の午前・午後 全200問を無料で公開。1問ずつ解いて正答を確認できます。科目ごとの一覧から苦手分野だけを解くことも。`;
  return {
    title,
    description,
    alternates: { canonical: `/kokushi/${examNo}` },
    openGraph: { title: `${title}｜${SITE_NAME}`, description, url: `/kokushi/${examNo}` },
  };
}

export default async function KokushiExamPage({ params }: Props) {
  const examNo = parseExam((await params).exam);
  if (!examNo) notFound();

  const items = await getPublicList(examNo);
  if (items.length === 0) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: SITE_NAME, item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "理学療法士国家試験 過去問", item: `${SITE_URL}/kokushi` },
      { "@type": "ListItem", position: 3, name: `第${examNo}回`, item: `${SITE_URL}/kokushi/${examNo}` },
    ],
  };

  return (
    <main className="min-h-screen bg-[#fafafa] px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-3xl">
        <Link href="/kokushi" className="text-sm text-gray-500 hover:text-gray-800">
          ← 過去問トップ
        </Link>

        <h1 className="mt-6 text-2xl font-bold leading-snug text-gray-900 sm:text-3xl">
          第{examNo}回 理学療法士国家試験 過去問
          <span className="block text-base font-semibold text-gray-600">{examYear(examNo)}年実施・午前／午後 全{items.length}問</span>
        </h1>

        <p className="mt-4 text-sm leading-7 text-gray-700">
          問題をタップすると、1問ずつ解いて正答を確認できます。
        </p>

        {SESSIONS.map((session) => {
          const list = items.filter((i) => i.session === session);
          if (list.length === 0) return null;
          return (
            <section key={session} className="mt-10">
              <h2 className="text-lg font-bold text-gray-900">
                {SESSION_LABEL[session]}（{list.length}問）
              </h2>
              <ol className="mt-3 divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-200 bg-white">
                {list.map((q) => (
                  <li key={q.no}>
                    <Link href={questionPath(examNo, session, q.no)} className="flex gap-3 px-4 py-3 hover:bg-gray-50">
                      <span className="w-14 shrink-0 text-sm font-semibold text-gray-900">
                        {SESSION_LABEL[session]}{q.no}
                      </span>
                      <span className="min-w-0 flex-1">
                        {q.unit_name && (
                          <span className="mr-2 inline-block rounded-full bg-cyan-50 px-2 py-0.5 text-xs font-semibold text-gray-700">
                            {q.unit_name}
                          </span>
                        )}
                        <span className="text-sm text-gray-700">{q.stem}…</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </section>
          );
        })}

        <div className="mt-10">
          <KokushiCta />
        </div>

        <p className="mt-8 text-xs leading-6 text-gray-500">出典：厚生労働省ホームページ「理学療法士国家試験の問題及び正答」</p>
      </div>
    </main>
  );
}
