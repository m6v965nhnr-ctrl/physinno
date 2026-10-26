import { ldJson } from "@/lib/jsonLd";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PREFECTURES } from "@/lib/prefectures";
import { FACILITY_AREA_TYPES, listFacilitiesInPrefecture, type FacilityAreaSlug } from "@/lib/hospitalAreas";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const revalidate = 86400;

type Props = { params: Promise<{ type: string; pref: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type, pref: rawPref } = await params;
  const pref = decodeURIComponent(rawPref);
  const label = FACILITY_AREA_TYPES[type as FacilityAreaSlug];
  if (!label) return {};
  const title = `${pref}の${label}一覧`;
  const description = `${pref}の${label}を、市区町村ごとに一覧できます。各施設のページで、理学療法士による職場環境の口コミ・質問・採用情報を見られます。`;
  return { title, description, alternates: { canonical: `/facility-areas/${type}/${encodeURIComponent(pref)}` }, openGraph: { title: `${title}｜${SITE_NAME}`, description } };
}

export default async function FacilityAreaPrefPage({ params }: Props) {
  const { type, pref: rawPref } = await params;
  const pref = decodeURIComponent(rawPref);
  const label = FACILITY_AREA_TYPES[type as FacilityAreaSlug];
  if (!label || !PREFECTURES.includes(pref as (typeof PREFECTURES)[number])) notFound();
  const list = await listFacilitiesInPrefecture(label, pref);

  const byCity = new Map<string, typeof list>();
  for (const h of list) {
    const k = h.city || "その他";
    byCity.set(k, [...(byCity.get(k) ?? []), h]);
  }
  const cityNames = [...byCity.keys()].filter((c) => c !== "その他");

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: SITE_NAME, item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "施設の種類から探す", item: `${SITE_URL}/facility-areas` },
        { "@type": "ListItem", position: 3, name: `${label}`, item: `${SITE_URL}/facility-areas/${type}` },
        { "@type": "ListItem", position: 4, name: `${pref}の${label}一覧`, item: `${SITE_URL}/facility-areas/${type}/${encodeURIComponent(pref)}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${pref}の${label}一覧`,
      numberOfItems: list.length,
      itemListElement: list.slice(0, 100).map((h, i) => ({ "@type": "ListItem", position: i + 1, name: h.name, url: `${SITE_URL}/hospitals/${h.id}` })),
    },
  ];

  return (
    <main className="min-h-screen bg-[#fafafa] px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(jsonLd) }} />
      <div className="mx-auto max-w-3xl">
        <Link href={`/facility-areas/${type}`} className="text-sm text-gray-500 hover:text-gray-800">← 都道府県の一覧</Link>
        <h1 className="mt-6 text-2xl font-bold leading-snug text-gray-900 sm:text-3xl">{pref}の{label}一覧</h1>
        <p className="mt-3 text-sm leading-7 text-gray-700">
          {pref}の{label}{list.length === 1000 ? "（最初の1,000件）" : `${list.length}件`}です。施設の名前から、基本情報・口コミ・採用情報のページへ進めます。
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
        {list.length === 0 && <p className="mt-6 text-sm text-gray-500">この県の{label}は、まだ登録されていません。</p>}
        {[...byCity.entries()].map(([city, items]) => (
          <section key={city} id={city} className="mt-8">
            <h2 className="text-base font-bold text-gray-900">{city}（{items.length}）</h2>
            <ul className="mt-2 divide-y divide-gray-100 rounded-2xl border border-gray-200 bg-white">
              {items.map((h) => (
                <li key={h.id}>
                  <Link href={`/hospitals/${h.id}`} className="flex items-center justify-between gap-3 px-4 py-3 text-sm hover:bg-gray-50">
                    <span className="min-w-0 truncate text-gray-900">{h.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
        <p className="mt-8 text-sm text-gray-700">
          <Link href={`/facility-areas/${type}`} className="font-semibold underline">ほかの都道府県の{label}</Link>・
          <Link href="/hospital-areas" className="font-semibold underline">病院を探す</Link>・
          <Link href="/columns/first-year-rehab-basics" className="font-semibold underline">リハの前に知っておくこと総まとめ</Link>
        </p>
        <p className="mt-4 text-xs leading-6 text-gray-500">出典：厚生労働省「介護サービス情報公表システム」オープンデータ（2026年6月末時点、CC BY）、医療情報ネットのオープンデータなどを加工して作成。</p>
      </div>
    </main>
  );
}
