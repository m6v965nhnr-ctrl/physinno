import { ImageResponse } from "next/og";

export const alt = "理学療法士国家試験 過去問（第49回〜第61回）無料・正答つき｜Re:light";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TEXT = "理学療法士国家試験過去問第49回〜第61回無料・正答つき登録なしで1問ずつ解けますRe:light";

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

export default async function KokushiOpengraphImage() {
  const font = await loadJapaneseFont(TEXT);

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
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            fontSize: 28,
            fontWeight: 700,
            padding: "8px 24px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.45)",
          }}
        >
          無料・正答つき
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 700, lineHeight: 1.25 }}>理学療法士国家試験 過去問</div>
          <div style={{ display: "flex", marginTop: 16, fontSize: 40, fontWeight: 700 }}>第49回〜第61回・登録なしで1問ずつ</div>
        </div>

        <div style={{ display: "flex", fontSize: 28, fontWeight: 700 }}>Re:light</div>
      </div>
    ),
    { ...size, fonts: font ? [{ name: "NotoSansJP", data: font, weight: 700, style: "normal" }] : [] }
  );
}
