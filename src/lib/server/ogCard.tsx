import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

async function loadJapaneseFont(text: string) {
  try {
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@700&text=${encodeURIComponent(text)}`)
    ).text();
    const url = css.match(/src: url\((.+?)\) format/)?.[1];
    if (!url) return null;
    return await (await fetch(url)).arrayBuffer();
  } catch {
    return null;
  }
}

// 公開ページの共有用の画像（SNSで共有したときに出る）。日本語のフォントは、使う文字だけを取得する
export async function ogCard({ badge, title, sub }: { badge: string; title: string; sub: string }) {
  const font = await loadJapaneseFont(badge + title + sub + "Re:light");
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
          color: "#062f3a",
          fontFamily: font ? "NotoSansJP" : "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignSelf: "flex-start", fontSize: 28, fontWeight: 700, padding: "8px 24px", borderRadius: 999, background: "rgba(255,255,255,0.45)" }}>
          {badge}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 72, fontWeight: 700, lineHeight: 1.25 }}>{title}</div>
          <div style={{ display: "flex", marginTop: 16, fontSize: 38, fontWeight: 700 }}>{sub}</div>
        </div>
        <div style={{ display: "flex", fontSize: 28, fontWeight: 700 }}>Re:light</div>
      </div>
    ),
    { ...OG_SIZE, fonts: font ? [{ name: "NotoSansJP", data: font, weight: 700, style: "normal" }] : [] }
  );
}
