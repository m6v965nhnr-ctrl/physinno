import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ldJson } from "@/lib/jsonLd";
import { supabasePublic } from "@/lib/supabasePublic";
import { HOSPITAL_COLUMNS } from "@/lib/hospitalColumns";
import type { Hospital } from "@/lib/hospitals";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { getReviewStats } from "@/lib/kuchikomi";
import KuchikomiFrame from "@/components/kuchikomi/KuchikomiFrame";
import HospitalDetail from "@/components/hospital/HospitalDetail";
import { HospitalInitialProvider } from "@/app/hospitals/[id]/HospitalInitial";

// 検索から来る人向けの、1施設の口コミページ。画面は、アプリの職場ページ（/hospitals/[id]）と同じ（TOP・口コミ・投稿・質問・採用情報）。
// ログインなしで読める口コミは新しい3件まで（DB側で絞る）。口コミが1件もない施設は、薄いページが検索に出ないよう、検索の対象外にする（noindex）
export const revalidate = 3600;

type Props = { params: Promise<{ id: string }> };

async function getHospital(id: string) {
  if (!/^[0-9a-f-]{36}$/i.test(id)) return null;
  const { data } = await supabasePublic.from("hospitals").select(HOSPITAL_COLUMNS).eq("id", id).maybeSingle();
  return (data as Hospital | null) ?? null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const h = await getHospital(id);
  if (!h) return { title: "職場口コミ", robots: { index: false, follow: true } };
  const stats = await getReviewStats(id);
  const n = stats?.review_count ?? 0;
  const place = [h.prefecture, h.city].filter(Boolean).join("");
  const title = n > 0 ? `${h.name}の口コミ・評判（${n}件）｜リハ職の本音` : `${h.name}の口コミ・評判｜リハ職の本音`;
  const description =
    n > 0
      ? `${place ? `${place}の` : ""}${h.name}の、リハビリ職（理学療法士・作業療法士・言語聴覚士）の職場選びに役立つ口コミ${n}件（6項目の評価、平均${(stats?.avg_overall ?? 0).toFixed(1)}/10）。教育体制・残業・給与・人間関係などを確認できます。`
      : `${place ? `${place}の` : ""}${h.name}の、リハビリ職（理学療法士・作業療法士・言語聴覚士）向けの職場口コミのページです。まだ口コミはありません。働いたことのあるリハビリ職の方の投稿をお待ちしています。`;
  return {
    title,
    description,
    alternates: { canonical: `/kuchikomi/${id}` },
    robots: n > 0 ? undefined : { index: false, follow: true },
    openGraph: { title: `${title}｜${SITE_NAME}`, description, url: `/kuchikomi/${id}` },
    twitter: { card: "summary", title: `${title}｜${SITE_NAME}`, description },
  };
}

export default async function KuchikomiHospitalPage({ params }: Props) {
  const { id } = await params;
  const h = await getHospital(id);
  if (!h) notFound();
  const stats = await getReviewStats(id);
  const total = stats?.review_count ?? 0;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Hospital",
      name: h.name,
      url: `${SITE_URL}/kuchikomi/${id}`,
      address: { "@type": "PostalAddress", addressCountry: "JP", ...(h.prefecture ? { addressRegion: h.prefecture } : {}), ...(h.city ? { addressLocality: h.city } : {}) },
      ...(total > 0 && stats?.avg_overall
        ? { aggregateRating: { "@type": "AggregateRating", ratingValue: stats.avg_overall.toFixed(1), reviewCount: total, bestRating: "10", worstRating: "1" } }
        : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "リハ職の本音", item: `${SITE_URL}/kuchikomi` },
        { "@type": "ListItem", position: 2, name: h.name, item: `${SITE_URL}/kuchikomi/${id}` },
      ],
    },
  ];

  return (
    <KuchikomiFrame>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(jsonLd) }} />
      <HospitalInitialProvider hospital={h}>
        <HospitalDetail variant="kuchikomi" />
      </HospitalInitialProvider>
    </KuchikomiFrame>
  );
}
