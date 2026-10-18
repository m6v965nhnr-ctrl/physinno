import type { Metadata } from "next";
import Link from "next/link";
import { PREFECTURES, REGIONS } from "@/lib/prefectures";
import { HOSPITAL_DATA_NOTE, countHospitalsByPrefecture } from "@/lib/hospitalAreas";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const revalidate = 86400;

const TITLE = "全国の病院を、都道府県から探す｜理学療法士・学生向け";
const DESCRIPTION = "全国の病院（約5,000件）を、都道府県ごとに一覧できます。病床数・所在地を確認して、各病院のページで、理学療法士の職場環境の口コミ・採用情報を見られます。実習先や就職先を探す学生にも。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/hospital-areas" },
  openGraph: { title: `${TITLE}｜${SITE_NAME}`, description: DESCRIPTION, url: "/hospital-areas" },
};

export default async function HospitalAreasPage() {
  const counts = await countHospitalsByPrefecture();
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: SITE_NAME, item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "病院を都道府県から探す", item: `${SITE_URL}/hospital-areas` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "都道府県別の病院一覧",
      itemListElement: PREFECTURES.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: `${p}の病院一覧`, url: `${SITE_URL}/hospital-areas/${encodeURIComponent(p)}` })),
    },
  ];
  return (
    <main className="min-h-screen bg-[#fafafa] px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-800">← {SITE_NAME}</Link>
        <h1 className="mt-6 text-2xl font-bold leading-snug text-gray-900 text-balance sm:text-3xl"><span className="inline-block">全国の病院を、</span><span className="inline-block">都道府県から探す</span></h1>
        <p className="mt-4 text-sm leading-7 text-gray-700">
          実習先や就職先の候補を探すための、リハビリテーション科のある病院の一覧です。各病院のページでは、基本情報のほか、理学療法士による職場環境の口コミや、採用情報（登録があるもの）を見られます。
        </p>
        <nav aria-label="地方" className="mt-6 flex flex-wrap gap-2">
          {REGIONS.map((r) => (
            <a key={r.name} href={`#${r.name}`} className="rounded-full border border-gray-300 bg-white px-4 py-1.5 text-sm font-medium text-gray-800 hover:border-gray-500">
              {r.name}
            </a>
          ))}
        </nav>
        {REGIONS.map((r) => {
          const regionTotal = r.prefectures.reduce((sum, p) => sum + (counts[p] ?? 0), 0);
          return (
            <section key={r.name} id={r.name} className="mt-10 scroll-mt-6">
              <h2 className="flex items-baseline gap-3 border-b-2 border-gray-900 pb-2 text-xl font-bold text-gray-900">
                {r.name}
                <span className="text-sm font-normal text-gray-500">{regionTotal.toLocaleString()}件</span>
              </h2>
              <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {r.prefectures.map((p) => (
                  <li key={p}>
                    <Link href={`/hospital-areas/${encodeURIComponent(p)}`} className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm transition hover:border-gray-400">
                      <span className="font-medium text-gray-900">{p}</span>
                      <span className="text-xs text-gray-500">{counts[p] ?? 0}件</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
        <p className="mt-6 text-xs leading-6 text-gray-500">
          {HOSPITAL_DATA_NOTE}。都道府県によって、載っている件数に差があります（件数が少ない県は、データが十分でない可能性があります）。
        </p>
        <p className="mt-4 text-sm text-gray-700">
          全国で {total.toLocaleString()} 件。あわせて、
          <Link href="/job-hunting" className="font-semibold underline">就活ガイド</Link>・
          <Link href="/certified-pt" className="font-semibold underline">認定理学療法士の取り方</Link>・
          <Link href="/kokushi" className="font-semibold underline">国試の過去問</Link>・
          <Link href="/paper-search" className="font-semibold underline">論文検索</Link>
          も、ご覧ください。
        </p>
        <div className="mt-8 rounded-2xl bg-relight-gradient px-6 py-5 text-white">
          <p className="text-base font-semibold">口コミ・条件での絞り込みは、無料登録で</p>
          <p className="mt-1 text-sm leading-6 text-white/95">給与・休日・診療科・病床数などで絞り込んで、気になる病院をフォローできます。</p>
          <Link href="/register?utm_source=hospital-areas&utm_medium=web&utm_campaign=hospital-areas" className="mt-4 inline-block rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-gray-900">無料ではじめる</Link>
        </div>
      </div>
    </main>
  );
}
