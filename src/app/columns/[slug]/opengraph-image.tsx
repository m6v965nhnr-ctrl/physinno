import { ImageResponse } from "next/og";
import { getColumnMeta } from "@/lib/columns";
import { SITE_NAME } from "@/lib/site";

export const alt = "コラム｜Re:light";
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

export default async function ColumnOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = getColumnMeta(slug);

  const title = meta?.title || "コラム";
  const category = meta?.category || "";

  const font = await loadJapaneseFont(title + category + SITE_NAME + "編集部");

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
        {category && (
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
            {category}
          </div>
        )}

        <div
          style={{
            display: "flex",
            fontSize: title.length > 28 ? 48 : 58,
            fontWeight: 700,
            lineHeight: 1.4,
          }}
        >
          {title}
        </div>

        <div style={{ display: "flex", fontSize: 28, fontWeight: 700, opacity: 0.9 }}>
          {SITE_NAME} 編集部
        </div>
      </div>
    ),
    {
      ...size,
      fonts: font ? [{ name: "NotoSansJP", data: font, weight: 700, style: "normal" }] : [],
    }
  );
}
