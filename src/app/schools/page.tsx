import { ldJson } from "@/lib/jsonLd";
import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import {
  PT_EXAM_LABEL,
  PT_SCHOOL_SOURCE,
  PT_UNIVERSITIES,
  PT_UNIVERSITY_NEW_GRAD_RATE,
} from "@/content/schools/pt-universities";

const TITLE = "理学療法士養成校（大学）の国家試験 合格状況【第61回・新卒】";
const DESCRIPTION = `理学療法士国家試験 ${PT_EXAM_LABEL}の、大学別の合格状況（大学新卒）。${PT_UNIVERSITIES.length}大学の受験者数・合格者数・合格率を、出典つきでまとめました。見かたの注意も。`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/schools" },
  openGraph: { title: `${TITLE}｜${SITE_NAME}`, description: DESCRIPTION, url: "/schools" },
  twitter: { card: "summary_large_image", title: `${TITLE}｜${SITE_NAME}`, description: DESCRIPTION },
};

const KINDS = ["国立", "公立", "私立"] as const;

export default function SchoolsIndexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: SITE_NAME, item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "理学療法士養成校の国試合格状況", item: `${SITE_URL}/schools` },
    ],
  };

  return (
    <main className="min-h-screen bg-[#fafafa] px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(jsonLd) }} />
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-800">
          ← {SITE_NAME}
        </Link>

        <h1 className="mt-6 text-2xl font-bold leading-snug text-gray-900 sm:text-3xl">
          理学療法士養成校（大学）の国家試験 合格状況
          <span className="block text-base font-semibold text-gray-600 sm:text-lg">{PT_EXAM_LABEL}・大学新卒</span>
        </h1>

        <p className="mt-4 text-sm leading-7 text-gray-700">
          {PT_UNIVERSITIES.length}大学の、理学療法士国家試験の合格状況（大学新卒のみ）です。全国の大学新卒の合格率は
          {PT_UNIVERSITY_NEW_GRAD_RATE}%でした。受験者が少ない大学は、1人の違いで合格率が大きく動くため、1年の数字だけで、学校を比べるのはおすすめしません。
          専門学校・短期大学の数字は、公表された資料が確認できていないため、まだ載せていません。
        </p>
        <p className="mt-2 text-xs leading-6 text-gray-600">
          出典:{" "}
          <a href={PT_SCHOOL_SOURCE.url} target="_blank" rel="noopener noreferrer" className="underline">
            {PT_SCHOOL_SOURCE.name}
          </a>
          （{PT_SCHOOL_SOURCE.published}）
        </p>

        {KINDS.map((kind) => {
          const list = PT_UNIVERSITIES.filter((u) => u.kind === kind);
          return (
            <section key={kind} className="mt-10" aria-labelledby={`k-${kind}`}>
              <h2 id={`k-${kind}`} className="text-lg font-bold text-gray-900">
                {kind}大学（{list.length}）
              </h2>
              <ul className="mt-3 divide-y divide-gray-100 rounded-2xl border border-gray-200 bg-white">
                {list.map((u) => (
                  <li key={u.slug}>
                    <Link
                      href={`/schools/${encodeURIComponent(u.slug)}`}
                      className="flex items-center justify-between gap-3 px-4 py-3 text-sm hover:bg-gray-50"
                    >
                      <span className="font-medium text-gray-900">{u.name}</span>
                      <span className="shrink-0 text-gray-700">
                        {u.passers}/{u.takers}人・{u.rate.toFixed(1)}%
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        <div className="mt-10 rounded-2xl bg-relight-gradient px-6 py-5 text-white">
          <p className="text-base font-semibold">国試の過去問、約1,200問を無料で</p>
          <p className="mt-1 text-sm leading-6 text-white/95">登録なしで、1問ずつ。答えるとすぐ解説。</p>
          <Link href="/kokushi" className="mt-4 inline-block rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-gray-900">
            過去問を解いてみる
          </Link>
        </div>
      </div>
    </main>
  );
}
