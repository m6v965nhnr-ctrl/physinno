import type { Metadata } from "next";
import { getColumnMeta } from "@/lib/columns";
import { SITE_NAME, SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const meta = getColumnMeta(slug);

  if (!meta) {
    return { title: "コラム", robots: { index: false, follow: true } };
  }

  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/columns/${slug}` },
    openGraph: {
      title: `${meta.title}｜${SITE_NAME}`,
      description: meta.description,
      url: `/columns/${slug}`,
      type: "article",
      publishedTime: meta.publishedAt,
      modifiedTime: meta.updatedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: `${meta.title}｜${SITE_NAME}`,
      description: meta.description,
    },
  };
}

export default async function ColumnLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = getColumnMeta(slug);

  const jsonLd = meta
    ? {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Article",
            headline: meta.title,
            description: meta.description,
            datePublished: meta.publishedAt,
            dateModified: meta.updatedAt,
            author: { "@type": "Organization", name: `${SITE_NAME}編集部` },
            publisher: { "@type": "Organization", name: SITE_NAME },
            url: `${SITE_URL}/columns/${slug}`,
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_URL },
              { "@type": "ListItem", position: 2, name: "コラム", item: `${SITE_URL}/columns` },
              { "@type": "ListItem", position: 3, name: meta.title, item: `${SITE_URL}/columns/${slug}` },
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
