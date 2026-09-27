import type { Metadata } from "next";
import { supabasePublic } from "@/lib/supabasePublic";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { ptName } from "@/lib/format";

type Props = { params: Promise<{ id: string }> };

async function getPt(id: string) {
  const { data } = await supabasePublic
    .from("pt_profiles")
    .select(
      "id, full_name, qualification, specialty, workplace, prefecture, city, experience_years, biography, profile_image, rating, review_count"
    )
    .eq("id", id)
    .maybeSingle();

  return data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const pt = await getPt(id);

  if (!pt) {
    return { title: "PTプロフィール", robots: { index: false, follow: true } };
  }

  const name = ptName(pt.full_name);
  const place = [pt.prefecture, pt.city].filter(Boolean).join("");
  const role = pt.specialty || pt.qualification || "理学療法士";

  const description = [
    place && `${place}`,
    pt.workplace && `${pt.workplace}に勤務`,
    role,
    pt.experience_years ? `経験${pt.experience_years}年` : null,
    pt.review_count ? `レビュー${pt.review_count}件` : null,
  ]
    .filter(Boolean)
    .join("・") || `${name}のプロフィールページです。`;

  const title = `${name}（${role}）`;

  return {
    title,
    description,
    alternates: { canonical: `/pts/${id}` },
    openGraph: {
      title: `${title}｜${SITE_NAME}`,
      description,
      url: `/pts/${id}`,
      images: pt.profile_image ? [{ url: pt.profile_image }] : undefined,
    },
    twitter: {
      card: pt.profile_image ? "summary" : "summary_large_image",
      title: `${title}｜${SITE_NAME}`,
      description,
    },
  };
}

export default async function PtProfileLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pt = await getPt(id);

  // Google の構造化データガイドラインに合わせ、個人（Person）に対する
  // レビュー・評価点（AggregateRating／Review）は付与しない。
  const jsonLd = pt
    ? {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Person",
            name: ptName(pt.full_name),
            jobTitle: pt.specialty || pt.qualification || "理学療法士",
            url: `${SITE_URL}/pts/${id}`,
            image: pt.profile_image || undefined,
            description: pt.biography || undefined,
            worksFor: pt.workplace
              ? { "@type": "Organization", name: pt.workplace }
              : undefined,
            homeLocation:
              pt.prefecture || pt.city
                ? {
                    "@type": "Place",
                    address: {
                      "@type": "PostalAddress",
                      addressRegion: pt.prefecture || undefined,
                      addressLocality: pt.city || undefined,
                    },
                  }
                : undefined,
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_URL },
              { "@type": "ListItem", position: 2, name: "PTを探す", item: `${SITE_URL}/pts` },
              {
                "@type": "ListItem",
                position: 3,
                name: ptName(pt.full_name),
                item: `${SITE_URL}/pts/${id}`,
              },
            ],
          },
        ],
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {children}
    </>
  );
}
