import type { Metadata } from "next";
import { supabasePublic } from "@/lib/supabasePublic";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { ptName } from "@/lib/format";
import { ACHIEVEMENT_CATEGORY_LABEL } from "@/lib/achievements";

type Props = { params: Promise<{ id: string }> };

const CASE_LABEL = "症例報告";

async function getPost(id: string) {
  // 公開範囲の外の人（ログインしていない人を含む）には、題名だけ、または何も返らない。匿名の投稿には作者が付かない
  const { data: rows } = await supabasePublic.rpc("list_posts", { p_id: id, p_limit: 1 });
  const data = (rows ?? [])[0] as
    | {
        id: string;
        user_id: string | null;
        title: string | null;
        content: string | null;
        post_type: string | null;
        disease_category: string | null;
        conference_name: string | null;
        created_at: string;
        is_anonymous: boolean;
        restricted: boolean;
      }
    | undefined;

  if (!data) return null;

  const { data: pt } = data.user_id
    ? await supabasePublic
        .from("pt_profiles")
        .select("full_name, specialty, qualification")
        .eq("user_id", data.user_id)
        .maybeSingle()
    : { data: null };

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
  const authorName = post.is_anonymous ? "匿名のPT" : ptName(pt?.full_name ?? null);
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
          name: result.post.is_anonymous ? "匿名のPT" : ptName(result.pt?.full_name ?? null),
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
