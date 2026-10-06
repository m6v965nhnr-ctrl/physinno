import { ImageResponse } from "next/og";
import { supabasePublic } from "@/lib/supabasePublic";
import { ptName } from "@/lib/format";
import { ACHIEVEMENT_CATEGORY_LABEL } from "@/lib/achievements";

export const alt = "投稿｜Re:light";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadJapaneseFont(text: string) {
  try {
    const css = await (
      await fetch(
        `https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@700&text=${encodeURIComponent(text)}`
      )
    ).text();
    const url = css.match(/src: url\((.+?)\) format/)?.[1];
    if (!url) return null;
    return await (await fetch(url)).arrayBuffer();
  } catch {
    return null;
  }
}

function labelFor(postType: string | null, diseaseCategory: string | null) {
  if (postType === "case") {
    return ["症例報告", diseaseCategory].filter(Boolean).join("・");
  }

  if (postType && postType in ACHIEVEMENT_CATEGORY_LABEL) {
    return ACHIEVEMENT_CATEGORY_LABEL[
      postType as keyof typeof ACHIEVEMENT_CATEGORY_LABEL
    ];
  }

  return "投稿";
}

// シェアされた投稿がブランド付きの見た目になるようにする（生の本文スクショではなく要約カード）
export default async function PostOpengraphImage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // 公開範囲の外の人には、題名だけ、または何も返らない。匿名の投稿には作者が付かない
  const { data: rows } = await supabasePublic.rpc("list_posts", { p_id: id, p_limit: 1 });
  const post = ((rows ?? [])[0] ?? null) as {
    title: string | null;
    content: string | null;
    user_id: string | null;
    post_type: string | null;
    disease_category: string | null;
    is_anonymous: boolean;
  } | null;

  const { data: pt } = post?.user_id
    ? await supabasePublic
        .from("pt_profiles")
        .select("full_name, specialty, qualification")
        .eq("user_id", post.user_id)
        .maybeSingle()
    : { data: null };

  const kind = labelFor(post?.post_type ?? null, post?.disease_category ?? null);
  const name = post?.is_anonymous ? "匿名のPT" : ptName(pt?.full_name ?? null);
  const role = pt?.specialty || pt?.qualification || "理学療法士";
  const headline = post?.title || (post?.content || "").slice(0, 40);

  const font = await loadJapaneseFont(
    kind + headline + name + role + "Re:lightの投稿"
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "linear-gradient(135deg, #55c7dc 0%, #45d0c2 50%, #4ed7a7 100%)",
          color: "#ffffff",
          fontFamily: font ? "NotoSansJP" : "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            fontSize: 28,
            fontWeight: 700,
            padding: "8px 24px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.25)",
          }}
        >
          {kind}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: headline.length > 24 ? 48 : 60,
            fontWeight: 700,
            lineHeight: 1.4,
          }}
        >
          {headline}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 700 }}>
            {name}
          </div>
          <div style={{ display: "flex", marginTop: 8, fontSize: 24, opacity: 0.85 }}>
            {role}・Re:light
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: font ? [{ name: "NotoSansJP", data: font, weight: 700, style: "normal" }] : [],
    }
  );
}
