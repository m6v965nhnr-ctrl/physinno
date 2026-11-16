import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ldJson } from "@/lib/jsonLd";
import { supabasePublic } from "@/lib/supabasePublic";
import { HOSPITAL_COLUMNS } from "@/lib/hospitalColumns";
import { REVIEW_AXES, REVIEW_AXIS_LABEL, type Hospital, type HospitalReview, type IncomeByAge, type ReviewTopic } from "@/lib/hospitals";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { getReviewStats } from "@/lib/kuchikomi";
import KuchikomiFrame from "@/components/kuchikomi/KuchikomiFrame";
import ReviewsSection from "@/components/kuchikomi/ReviewsSection";
import ReviewBars from "@/components/ReviewBars";
import IncomeByAgeChart from "@/components/IncomeByAgeChart";

// 検索から来る人向けの、1施設の口コミページ。ログインなしで見えるのは新しい3件まで（DB側で絞る）。
// 口コミが1件もない施設は、薄いページが検索に出ないよう、検索の対象外にする（noindex）
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
  const title = n > 0 ? `${h.name}の口コミ・評判（${n}件）｜リハビリ職の職場環境` : `${h.name}の口コミ・評判｜リハビリ職の職場環境`;
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

  const [stats, rev, top, inc, prof] = await Promise.all([
    getReviewStats(id),
    supabasePublic.rpc("get_hospital_reviews", { p_hospital_id: id }),
    supabasePublic.rpc("get_hospital_review_topics", { p_hospital: id }),
    supabasePublic.rpc("get_hospital_income_by_age", { p_hospital: id }),
    supabasePublic.rpc("get_hospital_review_professions", { p_hospital: id }),
  ]);
  const professions = Object.fromEntries(((prof.data ?? []) as { review_id: string; profession: string | null }[]).map((x) => [x.review_id, x.profession]));
  const reviews = ((rev.data ?? []) as HospitalReview[]).map((r) => ({ ...r, is_mine: false }));
  const topics = ((top.data ?? []) as ReviewTopic[]).map((t) => ({ ...t, is_mine: false }));
  const income = ((inc.data ?? []) as { age_band: number; n: number | string; avg_income: number }[]).map((r) => ({ ...r, n: Number(r.n) })) as IncomeByAge[];
  const total = stats?.review_count ?? 0;
  const place = [h.prefecture, h.city].filter(Boolean).join(" ");

  const axisAvg = stats
    ? [stats.avg_work_environment, stats.avg_education_system, stats.avg_salary, stats.avg_overtime, stats.avg_paid_leave, stats.avg_openness]
    : [];

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
        { "@type": "ListItem", position: 1, name: "リハビリ職の職場口コミ", item: `${SITE_URL}/kuchikomi` },
        { "@type": "ListItem", position: 2, name: h.name, item: `${SITE_URL}/kuchikomi/${id}` },
      ],
    },
  ];

  return (
    <KuchikomiFrame>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(jsonLd) }} />
      <div className="mx-auto max-w-3xl px-5 py-8">
        <Link href="/kuchikomi" className="text-sm text-gray-500 hover:text-gray-800">← 職場口コミのトップ</Link>
        <h1 className="mt-4 text-2xl font-bold leading-snug text-gray-900" style={{ textWrap: "balance" }}>{h.name}の職場口コミ</h1>
        <p className="mt-1 text-sm text-gray-600">{place}{h.facility_type ? ` ・ ${h.facility_type}` : ""}</p>

        {total > 0 && stats?.avg_overall != null && (
          <section aria-label="総合評価" className="mt-5 rounded-3xl border border-gray-100 bg-white p-5">
            <p className="text-sm text-gray-500">総合評価（口コミ{total}件の平均）</p>
            <p className="mt-1 text-4xl font-black tabular-nums text-gray-900">{stats.avg_overall.toFixed(1)}<span className="ml-1 text-base font-semibold text-gray-500">/ 10</span></p>
            <ReviewBars items={REVIEW_AXES.map((a, i) => ({ label: REVIEW_AXIS_LABEL[a], value: axisAvg[i] ?? 0 }))} />
          </section>
        )}

        <ReviewsSection hospitalId={id} hospitalName={h.name} totalCount={total} initialReviews={reviews} initialTopics={topics} initialProfessions={professions} />

        {income.length > 0 && <IncomeByAgeChart data={income} />}

        <section className="mt-6 rounded-3xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-500">{h.name}のほかの情報</h2>
          <p className="mt-2 text-sm leading-6 text-gray-700">基本情報、疾患比率、採用情報、職場への質問は、Re:lightの病院ページで見られます。</p>
          <Link href={`/hospitals/${id}`} className="mt-3 inline-block rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-800">病院ページを開く</Link>
        </section>
      </div>
    </KuchikomiFrame>
  );
}
