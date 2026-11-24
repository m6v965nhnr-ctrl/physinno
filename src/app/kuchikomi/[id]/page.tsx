import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ldJson } from "@/lib/jsonLd";
import { supabasePublic } from "@/lib/supabasePublic";
import { HOSPITAL_COLUMNS } from "@/lib/hospitalColumns";
import { REVIEW_AXES, REVIEW_AXIS_LABEL, type Hospital, type HospitalReview, type ReviewTopic } from "@/lib/hospitals";
import { SITE_URL } from "@/lib/site";
import { getReviewStats, listReviewedHospitals } from "@/lib/kuchikomi";
import KuchikomiFrame from "@/components/kuchikomi/KuchikomiFrame";
import HospitalDetail from "@/components/hospital/HospitalDetail";
import StarRating from "@/components/StarRating";
import { HospitalInitialProvider } from "@/app/hospitals/[id]/HospitalInitial";

// 検索から来る人向けの、1施設の口コミページ。画面は、アプリの職場ページ（/hospitals/[id]）と同じ（TOP・口コミ・投稿・質問・採用情報）。
// ログインなしで読める口コミは新しい3件まで（DB側で絞る）。口コミが1件もない施設は、薄いページが検索に出ないよう、検索の対象外にする（noindex）。
// 画面の本体はブラウザで組み立てるので、検索エンジン向けに、サーバーでも、口コミの要約・構造化データ・同じ県の施設へのリンクを出す
// 14.6万ページを巡回されても、再生成（サーバーのCPU）を月1回に抑える。口コミが増えても、1週間以内には反映される
export const revalidate = 2592000;

// 「どのIDがあるか」を返す関数を足さないと、再生成(revalidate)の設定があっても、キャッシュされずに毎回サーバーが組み立てる。空を返せば、最初のアクセスで作って、あとはキャッシュを返す
export function generateStaticParams() {
  return [];
}

type Props = { params: Promise<{ id: string }> };

async function getHospital(id: string) {
  if (!/^[0-9a-f-]{36}$/i.test(id)) return null;
  const { data } = await supabasePublic.from("hospitals").select(HOSPITAL_COLUMNS).eq("id", id).maybeSingle();
  return (data as Hospital | null) ?? null;
}

// 施設の種類に合った、schema.org の型（病院は Hospital、診療所は MedicalClinic、それ以外は LocalBusiness）
function schemaType(h: Hospital) {
  if (!h.facility_type) return "Hospital";
  if (h.facility_type === "クリニック・診療所") return "MedicalClinic";
  return "LocalBusiness";
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const h = await getHospital(id);
  if (!h) return { title: "職場口コミ", robots: { index: false, follow: true } };
  const stats = await getReviewStats(id);
  const n = stats?.review_count ?? 0;
  // 全施設を、検索に出す（口コミがなくても、「◯◯ 口コミ」で見つけてもらう）。サイトマップ（検索エンジンへの案内）は、段階的に広げる（app/kuchikomi/sitemap.ts）
  const indexable = true;
  const place = [h.prefecture, h.city].filter(Boolean).join("");
  const title = n > 0 ? `${h.name}の口コミ・評判（${n}件）｜リハ職の本音` : `${h.name}の口コミ・評判｜リハ職の本音`;
  // 説明文は、検索結果で切れないよう、約110字までに収める
  const description =
    n > 0
      ? `${place ? `${place}の` : ""}${h.name}の職場口コミ${n}件（平均${(stats?.avg_overall ?? 0).toFixed(1)}/10）。教育体制・残業・給与・人間関係など、PT・OT・STの職場選びに。`
      : `${place ? `${place}の` : ""}${h.name}の、PT・OT・STの職場口コミのページです。働いたことのある方は、匿名で口コミを書けます。`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/kuchikomi/${id}` },
    robots: indexable ? undefined : { index: false, follow: true },
    openGraph: { title, description, url: `/kuchikomi/${id}`, type: "website", siteName: "リハ職の本音", locale: "ja_JP" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function KuchikomiHospitalPage({ params }: Props) {
  const { id } = await params;
  const h = await getHospital(id);
  if (!h) notFound();

  const [stats, rev, top, related] = await Promise.all([
    getReviewStats(id),
    supabasePublic.rpc("get_hospital_reviews", { p_hospital_id: id }), // ログインなしは、新しい3件まで
    supabasePublic.rpc("get_hospital_review_topics", { p_hospital: id }),
    h.prefecture ? listReviewedHospitals(9, h.prefecture) : Promise.resolve([]),
  ]);
  const reviews = (rev.data ?? []) as HospitalReview[];
  const topics = (top.data ?? []) as ReviewTopic[];
  const total = stats?.review_count ?? 0;
  const others = related.filter((x) => x.id !== id).slice(0, 8);
  const place = [h.prefecture, h.city].filter(Boolean).join(" ");

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": schemaType(h),
      name: h.name,
      url: `${SITE_URL}/kuchikomi/${id}`,
      ...(h.website ? { sameAs: [h.website] } : {}),
      ...(h.phone ? { telephone: h.phone } : {}),
      address: {
        "@type": "PostalAddress",
        addressCountry: "JP",
        ...(h.prefecture ? { addressRegion: h.prefecture } : {}),
        ...(h.city ? { addressLocality: h.city } : {}),
        ...(h.address ? { streetAddress: h.address } : {}),
      },
      ...(total > 0 && stats?.avg_overall
        ? {
            aggregateRating: { "@type": "AggregateRating", ratingValue: stats.avg_overall.toFixed(1), reviewCount: total, bestRating: "10", worstRating: "1" },
            // 読める口コミ（新しい3件まで）。投稿者は匿名（氏名は公開していない）
            review: reviews.map((r) => ({
              "@type": "Review",
              author: { "@type": "Person", name: "リハビリ職（匿名）" },
              datePublished: r.created_at.slice(0, 10),
              reviewRating: { "@type": "Rating", ratingValue: r.overall_score, bestRating: 10, worstRating: 1 },
              ...(r.comment ? { reviewBody: r.comment } : {}),
            })),
          }
        : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "リハ職の本音", item: `${SITE_URL}/kuchikomi` },
        ...(h.prefecture ? [{ "@type": "ListItem", position: 2, name: `${h.prefecture}の病院・施設`, item: `${SITE_URL}/hospital-areas/${encodeURIComponent(h.prefecture)}` }] : []),
        { "@type": "ListItem", position: h.prefecture ? 3 : 2, name: h.name, item: `${SITE_URL}/kuchikomi/${id}` },
      ],
    },
  ];

  return (
    <KuchikomiFrame>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(jsonLd) }} />
      <HospitalInitialProvider hospital={h}>
        {/* 検索エンジン・読み上げ向けの、口コミの要約（画面と同じ内容）。画面の本体は、ブラウザで組み立てる */}
        {total > 0 && (
          <section className="sr-only" aria-label={`${h.name}の口コミの要約`}>
            <h2>{h.name}の口コミ（{total}件）</h2>
            <p>
              {place}の{h.name}の、リハビリ職（理学療法士・作業療法士・言語聴覚士）による職場の口コミです。総合評価は、10点満点で平均{(stats?.avg_overall ?? 0).toFixed(1)}点（{total}件）。
              {stats && REVIEW_AXES.map((a, i) => {
                const v = [stats.avg_work_environment, stats.avg_education_system, stats.avg_salary, stats.avg_overtime, stats.avg_paid_leave, stats.avg_openness][i];
                return v != null ? `${REVIEW_AXIS_LABEL[a]} ${v.toFixed(1)}点。` : "";
              })}
            </p>
            {reviews.map((r) => (
              <article key={r.id}>
                <p>総合 {r.overall_score}/10。{r.comment ?? ""}</p>
                {topics.filter((t) => t.review_id === r.id).map((t) => (
                  <p key={t.id}>{t.category}: {t.body}</p>
                ))}
              </article>
            ))}
          </section>
        )}
        {total === 0 && (
          <section className="sr-only" aria-label={`${h.name}の口コミ`}>
            <h2>{h.name}の口コミ</h2>
            <p>{place}の{h.name}の、リハビリ職（理学療法士・作業療法士・言語聴覚士）向けの職場口コミのページです。まだ口コミは投稿されていません。働いたことのある方は、無料登録（約1分）のあと、匿名で口コミを書けます。</p>
          </section>
        )}
        <HospitalDetail variant="kuchikomi" />
      </HospitalInitialProvider>

      {/* 同じ県の、口コミのある施設（内部リンク） */}
      {others.length > 0 && h.prefecture && (
        <section className="px-5 pb-10">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-base font-bold text-gray-900">{h.prefecture}の、口コミのある施設</h2>
            <ul className="mt-2 grid gap-2 sm:grid-cols-2">
              {others.map((o) => (
                <li key={o.id}>
                  <Link href={`/kuchikomi/${o.id}`} className="block h-full rounded-2xl border border-gray-200 bg-white px-4 py-3 hover:border-gray-400">
                    <span className="block text-sm font-semibold text-gray-900">{o.name}</span>
                    <span className="mt-0.5 block text-xs text-gray-500">{o.city ?? ""}</span>
                    <span className="mt-1 flex items-center gap-1.5 text-xs text-gray-700">
                      {o.avg_overall != null && <StarRating score={o.avg_overall} className="text-sm" />}
                      <span>口コミ{o.review_count}件{o.avg_overall != null ? ` ・ ${o.avg_overall.toFixed(1)} / 10` : ""}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-gray-500">
              <Link href={`/hospital-areas/${encodeURIComponent(h.prefecture)}`} className="underline">{h.prefecture}の病院を、一覧から探す</Link>
            </p>
          </div>
        </section>
      )}
    </KuchikomiFrame>
  );
}
