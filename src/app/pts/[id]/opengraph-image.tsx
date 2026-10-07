import { ImageResponse } from "next/og";
import { supabasePublic } from "@/lib/supabasePublic";
import { ptName } from "@/lib/format";

export const alt = "PTプロフィール｜Re:light";
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

// 個人ページ共有時に「誰の・どんなプロフィールか」が一目で伝わり、
// かつRe:lightのブランドが乗った画像になるようにする（生の証明写真は出さない）
export default async function PtOpengraphImage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: pt } = await supabasePublic
    .from("pt_profiles")
    .select(
      "full_name, qualification, specialty, workplace, prefecture, city, experience_years, review_count"
    )
    .eq("id", id)
    .maybeSingle();

  const name = ptName(pt?.full_name || null);
  const role = pt?.specialty || pt?.qualification || "理学療法士";
  const place = [pt?.prefecture, pt?.city].filter(Boolean).join("");

  const metaLine = [
    place,
    pt?.workplace,
    pt?.experience_years ? `${pt.experience_years}年目` : null,
  ]
    .filter(Boolean)
    .join("　　");

  const font = await loadJapaneseFont(
    name + role + metaLine + "Re:lightのプロフィール"
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
        <div style={{ display: "flex", fontSize: 34, fontWeight: 700, opacity: 0.95 }}>
          Re:light のプロフィール
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 72, fontWeight: 700 }}>
            {name}
          </div>
          <div style={{ display: "flex", marginTop: 20, fontSize: 40, opacity: 0.95 }}>
            {role}
          </div>
          {metaLine && (
            <div style={{ display: "flex", marginTop: 16, fontSize: 28, opacity: 0.85 }}>
              {metaLine}
            </div>
          )}
        </div>

        <div style={{ display: "flex", fontSize: 26, opacity: 0.85 }}>
          {pt?.review_count ? `レビュー${pt.review_count}件・` : ""}
          理学療法士のためのコミュニティ Re:light
        </div>
      </div>
    ),
    {
      ...size,
      fonts: font ? [{ name: "NotoSansJP", data: font, weight: 700, style: "normal" }] : [],
    }
  );
}
