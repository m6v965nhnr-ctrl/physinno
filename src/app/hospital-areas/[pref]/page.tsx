import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PREFECTURES } from "@/lib/prefectures";
import { HOSPITAL_DATA_NOTE, listHospitalsInPrefecture } from "@/lib/hospitalAreas";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const revalidate = 86400;
export const dynamicParams = false;

export function generateStaticParams() {
  return PREFECTURES.map((pref) => ({ pref }));
}

type Props = { params: Promise<{ pref: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pref = decodeURIComponent((await params).pref);
  const title = `${pref}の病院一覧｜理学療法士・学生向け`;
  const description = `${pref}の病院を、市区町村ごとに一覧できます。病床数・所在地を確認して、各病院のページで、理学療法士の職場環境の口コミ・採用情報を見られます。`;
  return {
    title,
    description,
    alternates: { canonical: `/hospital-areas/${encodeURIComponent(pref)}` },
    openGraph: { title: `${title}｜${SITE_NAME}`, description, url: `/hospital-areas/${encodeURIComponent(pref)}` },
  };
}

export default async function HospitalAreaPage({ params }: Props) {
  const pref = decodeURIComponent((await params).pref);
  if (!PREFECTURES.includes(pref as (typeof PREFECTURES)[number])) notFound();
  const hospitals = await listHospitalsInPrefecture(pref);

  // 市区町村ごとにまとめる（並びは、取得時に市区町村・名前の順）
  const byCity = new Map<string, typeof hospitals>();
  for (const h of hospitals) {
    const k = h.city || "その他";
    byCity.set(k, [...(byCity.get(k) ?? []), h]);
  }

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: SITE_NAME, item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "病院を都道府県から探す", item: `${SITE_URL}/hospital-areas` },
        { "@type": "ListItem", position: 3, name: `${pref}の病院一覧`, item: `${SITE_URL}/hospital-areas/${encodeURIComponent(pref)}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${pref}の病院一覧`,
      numberOfItems: hospitals.length,
      itemListElement: hospitals.slice(0, 100).map((h, i) => ({ "@type": "ListItem", position: i + 1, name: h.name, url: `${SITE_URL}/hospitals/${h.id}` })),
    },
  ];
  const cityNames = [...byCity.keys()].filter((c) => c !== "その他");

  return (
    <main className="min-h-screen bg-[#fafafa] px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-3xl">
        <Link href="/hospital-areas" className="text-sm text-gray-500 hover:text-gray-800">← 都道府県の一覧</Link>
        <h1 className="mt-6 text-2xl font-bold leading-snug text-gray-900 sm:text-3xl">{pref}の病院一覧</h1>
        <p className="mt-3 text-sm leading-7 text-gray-700">
          {pref}の、リハビリテーション科のある病院{hospitals.length}件（{cityNames.length}の市区町村）です。病院の名前から、基本情報・口コミ・採用情報のページへ進めます。
        </p>
        {cityNames.length > 1 && (
          <p className="mt-2 text-xs leading-6 text-gray-500">
            市区町村：
            {cityNames.map((c, i) => (
              <span key={c}>
                {i > 0 && "・"}
                <a href={`#${encodeURIComponent(c)}`} className="underline">{c}</a>
              </span>
            ))}
          </p>
        )}
        {hospitals.length === 0 && <p className="mt-6 text-sm text-gray-500">この県の病院は、まだ登録されていません。</p>}
        {[...byCity.entries()].map(([city, list]) => (
          <section key={city} id={city} className="mt-8">
            <h2 className="text-base font-bold text-gray-900">{city}（{list.length}）</h2>
            <ul className="mt-2 divide-y divide-gray-100 rounded-2xl border border-gray-200 bg-white">
              {list.map((h) => (
                <li key={h.id}>
                  <Link href={`/hospitals/${h.id}`} className="flex items-center justify-between gap-3 px-4 py-3 text-sm hover:bg-gray-50">
                    <span className="min-w-0 truncate text-gray-900">{h.name}</span>
                    {h.beds_total ? <span className="shrink-0 text-xs text-gray-500">{h.beds_total}床</span> : null}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
        <p className="mt-8 text-sm text-gray-700">
          <Link href="/hospital-areas" className="font-semibold underline">ほかの都道府県の病院</Link>・
          <Link href="/certified-pt" className="font-semibold underline">認定理学療法士の取り方</Link>・
          <Link href="/kokushi" className="font-semibold underline">国試の過去問</Link>
        </p>
        <p className="mt-4 text-xs leading-6 text-gray-500">{HOSPITAL_DATA_NOTE}。</p>
      </div>
    </main>
  );
}
