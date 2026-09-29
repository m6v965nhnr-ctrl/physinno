import type { Metadata } from "next";
import { supabasePublic } from "@/lib/supabasePublic";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { ptName } from "@/lib/format";
import { ACHIEVEMENT_CATEGORY_LABEL } from "@/lib/achievements";

type Props = { params: Promise<{ id: string }> };

const CASE_LABEL = "症例報告";

async function getPost(id: string) {
  const { data } = await supabasePublic
    .from("posts")
    .select(
      "id, user_id, title, content, post_type, disease_category, conference_name, created_at"
    )
    .eq("id", id)
    .maybeSingle();

  if (!data) return null;

  const { data: pt } = await supabasePublic
    .from("pt_profiles")
    .select("full_name, specialty, qualification")
    .eq("user_id", data.user_id)
    .maybeSingle();

  return { post: data, pt };
}

function labelFor(postType: string | null, diseaseCategory: string | null) {
  if (postType === "case") {
    return [CASE_LABEL, diseaseCategory].filter(Boolean).join("・");
  }

  if (postType && postType in ACHIEVEMENT_CATEGORY_LABEL) {
    return ACHIEVEMENT_CATEGORY_LABEL[
      postType as keyof typeof ACHIEVEMENT_CATEGORY_LABEL
    ];
  }

  return "投稿";
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const result = await getPost(id);

  if (!result) {
    return { title: "投稿", robots: { index: false, follow: true } };
  }

  const { post, pt } = result;
  const authorName = ptName(pt?.full_name ?? null);
  const kind = labelFor(post.post_type, post.disease_category);

  const title = post.title ? `${post.title}（${kind}）` : `${authorName}の${kind}`;

  const description =
    (post.content || "").replace(/\s+/g, " ").slice(0, 90) ||
    `${authorName}による${kind}の投稿です。`;

  return {
    title,
    description,
    alternates: { canonical: `/posts/${id}` },
    openGraph: {
      title: `${title}｜${SITE_NAME}`,
      description,
      url: `/posts/${id}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title}｜${SITE_NAME}`,
      description,
    },
  };
}

export default async function PostLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getPost(id);

  const jsonLd = result
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: result.post.title || labelFor(result.post.post_type, result.post.disease_category),
        author: {
          "@type": "Person",
          name: ptName(result.pt?.full_name ?? null),
        },
        datePublished: result.post.created_at,
        url: `${SITE_URL}/posts/${id}`,
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
        },
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
