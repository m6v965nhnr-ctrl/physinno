import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import {
  PT_EXAM_LABEL,
  PT_EXAM_NO,
  PT_SCHOOL_SOURCE,
  PT_UNIVERSITIES,
  PT_UNIVERSITY_NEW_GRAD_RATE,
  getPtUniversity,
} from "@/content/schools/pt-universities";

export const dynamicParams = false;

export function generateStaticParams() {
  return PT_UNIVERSITIES.map((u) => ({ slug: u.slug }));
}

type Props = { params: Promise<{ slug: string }> };

const rateText = (n: number) => `${n.toFixed(1)}%`;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const u = getPtUniversity((await params).slug);
  if (!u) return { title: "学校が見つかりません", robots: { index: false, follow: true } };

  const title = `${u.name}の理学療法士国家試験 合格率【第${PT_EXAM_NO}回・新卒】${rateText(u.rate)}`;
  const description = `${u.name}（${u.kind}大学）の理学療法士国家試験 第${PT_EXAM_NO}回の合格状況（大学新卒）。受験者${u.takers}人・合格者${u.passers}人・合格率${rateText(u.rate)}。出典と見かたの注意つき。過去問は無料で解けます。`;
  const url = `/schools/${encodeURIComponent(u.slug)}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${title}｜${SITE_NAME}`, description, url },
    twitter: { card: "summary_large_image", title: `${title}｜${SITE_NAME}`, description },
  };
}

export default async function SchoolPage({ params }: Props) {
  const u = getPtUniversity((await params).slug);
  if (!u) notFound();

  const diff = Math.round((u.rate - PT_UNIVERSITY_NEW_GRAD_RATE) * 10) / 10;
  const onePersonPt = Math.round((100 / u.takers) * 10) / 10;
  const officialSearch = `https://www.google.com/search?q=${encodeURIComponent(`${u.name} 理学療法`)}`;
  const url = `${SITE_URL}/schools/${encodeURIComponent(u.slug)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "CollegeOrUniversity", name: u.name, url },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: SITE_NAME, item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "理学療法士養成校の国試合格状況", item: `${SITE_URL}/schools` },
          { "@type": "ListItem", position: 3, name: u.name, item: url },
        ],
      },
    ],
  };

  // 隣り合う学校へのリンク（内部リンク）
  const idx = PT_UNIVERSITIES.findIndex((x) => x.slug === u.slug);
  const related = [PT_UNIVERSITIES[idx - 1], PT_UNIVERSITIES[idx + 1]].filter(Boolean);

  return (
    <main className="min-h-screen bg-[#fafafa] px-6 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <div className="mx-auto max-w-3xl">
        <Link href="/schools" className="text-sm text-gray-500 hover:text-gray-800">
          ← 理学療法士養成校の国試合格状況
        </Link>

        <p className="mt-6 text-xs font-semibold text-gray-600">{u.kind}大学</p>
        <h1 className="mt-1 text-2xl font-bold leading-snug text-gray-900 sm:text-3xl">
          {u.name}
          <span className="block text-base font-semibold text-gray-600 sm:text-lg">理学療法士国家試験 合格状況</span>
        </h1>

        {/* 1. 合格実績 */}
        <section className="mt-8 rounded-3xl border border-gray-200 bg-white p-6" aria-labelledby="result">
          <h2 id="result" className="text-lg font-bold text-gray-900">
            ① 国家試験の合格実績（{PT_EXAM_LABEL}・大学新卒）
          </h2>

          <dl className="mt-4 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-2xl bg-gray-50 p-4">
              <dt className="text-xs text-gray-600">受験者</dt>
              <dd className="mt-1 text-2xl font-bold text-gray-900">{u.takers}人</dd>
            </div>
            <div className="rounded-2xl bg-gray-50 p-4">
              <dt className="text-xs text-gray-600">合格者</dt>
              <dd className="mt-1 text-2xl font-bold text-gray-900">{u.passers}人</dd>
            </div>
            <div className="rounded-2xl bg-gray-50 p-4">
              <dt className="text-xs text-gray-600">合格率</dt>
              <dd className="mt-1 text-2xl font-bold text-gray-900">{rateText(u.rate)}</dd>
            </div>
          </dl>

          <div className="mt-5">
            <div className="flex items-center justify-between text-xs text-gray-700">
              <span>この大学</span>
              <span>{rateText(u.rate)}</span>
            </div>
            <div className="mt-1 h-3 overflow-hidden rounded-full bg-gray-100" aria-hidden="true">
              <div className="h-full rounded-full bg-brand-600" style={{ width: `${u.rate}%` }} />
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-gray-700">
              <span>全国の大学新卒（理学療法士）</span>
              <span>{rateText(PT_UNIVERSITY_NEW_GRAD_RATE)}</span>
            </div>
            <div className="mt-1 h-3 overflow-hidden rounded-full bg-gray-100" aria-hidden="true">
              <div className="h-full rounded-full bg-gray-400" style={{ width: `${PT_UNIVERSITY_NEW_GRAD_RATE}%` }} />
            </div>
            <p className="mt-3 text-sm text-gray-700">
              全国の大学新卒の合格率との差: {diff > 0 ? "+" : ""}
              {diff.toFixed(1)}ポイント
            </p>
          </div>
        </section>

        {/* 2. 見かたの注意 */}
        <section className="mt-6 rounded-3xl border border-gray-200 bg-white p-6" aria-labelledby="notes">
          <h2 id="notes" className="text-lg font-bold text-gray-900">② この数字の見かたの注意</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-gray-700">
            <li>
              <strong>大学新卒のみ</strong>の数字です。既卒（卒業後に受験した人）は含みません。
            </li>
            <li>
              受験者が少ないと、1人の違いで、合格率が大きく動きます。この大学の受験者は{u.takers}人なので、1人で約{onePersonPt}
              ポイント変わります。1年の数字だけで、学校を比べるのは、おすすめしません。
            </li>
            <li>
              学校選びでは、合格率のほかに、実習先、カリキュラム、通いやすさ、学費なども大切です。最新の情報は、学校の公式サイトや説明会で確認してください。
            </li>
            <li>
              出典:{" "}
              <a href={PT_SCHOOL_SOURCE.url} target="_blank" rel="noopener noreferrer" className="underline">
                {PT_SCHOOL_SOURCE.name}
              </a>
              （{PT_SCHOOL_SOURCE.published}）。数字に誤りがあれば、
              <Link href="/feedback" className="underline">意見箱</Link>
              からお知らせください。確認して、訂正します。
            </li>
          </ul>
          <p className="mt-4 text-sm">
            <a href={officialSearch} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-800 underline">
              {u.name}の公式サイトを検索する ↗
            </a>
          </p>
        </section>

        {/* 3. Re:lightでできること */}
        <section className="mt-6 rounded-3xl border border-gray-200 bg-white p-6" aria-labelledby="relight">
          <h2 id="relight" className="text-lg font-bold text-gray-900">③ {u.name}で学ぶ人・目指す人へ</h2>
          <p className="mt-2 text-sm leading-7 text-gray-700">
            Re:lightは、理学療法士と、理学療法士をめざす学生のための、無料のアプリです。
          </p>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-gray-800">
            <li>・<strong>国試の過去問</strong>（第51〜61回・約1,900問）を、1問ずつ解いて、すぐ解説</li>
            <li>・<strong>実習先の口コミ</strong>と、全国の病院情報</li>
            <li>・<strong>先輩に質問</strong>（匿名でもOK）、実習レポートの構成・誤字脱字のチェック</li>
          </ul>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/kokushi"
              className="rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-900"
            >
              過去問を解いてみる（登録なし）
            </Link>
            <Link
              href={`/register?type=student&utm_source=schools&utm_medium=seo&utm_campaign=${encodeURIComponent(u.slug)}`}
              className="rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white"
            >
              学生として無料ではじめる
            </Link>
          </div>
        </section>

        {related.length > 0 && (
          <nav aria-label="ほかの大学" className="mt-8 text-sm">
            <p className="font-semibold text-gray-900">ほかの大学の合格状況</p>
            <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/schools/${encodeURIComponent(r.slug)}`} className="underline">
                    {r.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/schools" className="underline">一覧を見る</Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </main>
  );
}
