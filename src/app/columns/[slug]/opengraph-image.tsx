import { ImageResponse } from "next/og";
import { getColumnMeta } from "@/lib/columns";

// 記事ごとのOG画像（XやLINEで共有されたときに、タイトル入りのカードが出る）
export const alt = "Re:light のガイド記事";
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

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = getColumnMeta(slug);
  const title = meta?.title ?? "理学療法士のためのガイド";
  const category = meta?.category ?? "ガイド";
  const font = await loadJapaneseFont(title + category + "Re:light 出典つき");

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
          background: "linear-gradient(135deg, #55c7dc 0%, #45d0c2 50%, #4ed7a7 100%)",
          color: "#ffffff",
          fontFamily: "noto",
        }}
      >
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            background: "rgba(255,255,255,0.25)",
            borderRadius: 9999,
            padding: "10px 28px",
            fontSize: 30,
            fontWeight: 700,
          }}
        >
          {category}
        </div>
        <div style={{ display: "flex", fontSize: title.length > 40 ? 52 : 62, fontWeight: 700, lineHeight: 1.35 }}>
          {title.length > 70 ? `${title.slice(0, 70)}…` : title}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 32, fontWeight: 700 }}>
          <div style={{ display: "flex" }}>Re:light｜出典つきのPT向けガイド</div>
          <div style={{ display: "flex", opacity: 0.9 }}>relight-1wet.vercel.app</div>
        </div>
      </div>
    ),
    { ...size, fonts: font ? [{ name: "noto", data: font, weight: 700 as const, style: "normal" as const }] : undefined }
  );
}
