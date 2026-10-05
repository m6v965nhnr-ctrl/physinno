import { ImageResponse } from "next/og";

export const alt = "Re:light｜理学療法士のための症例共有・論文検索・病院情報";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const HEADLINE = "理学療法士の臨床を、ひとりにしない。";
const SUB = "症例共有・論文検索・病院の口コミ・PT同士のつながり";

// 日本語を表示するため、使う文字だけの Noto Sans JP をGoogle Fontsから取得する
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

export default async function OpengraphImage() {
  const font = await loadJapaneseFont(HEADLINE + SUB + "Re:light");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #55c7dc 0%, #45d0c2 50%, #4ed7a7 100%)",
          color: "#ffffff",
          fontFamily: font ? "NotoSansJP" : "sans-serif",
        }}
      >
        <div style={{ fontSize: 40, fontWeight: 700, opacity: 0.95 }}>Re:light</div>
        <div style={{ marginTop: 28, fontSize: font ? 64 : 56, fontWeight: 700, lineHeight: 1.3 }}>
          {font ? HEADLINE : "A community for physical therapists"}
        </div>
        <div style={{ marginTop: 28, fontSize: 32, opacity: 0.95 }}>
          {font ? SUB : "Cases / Papers / Hospitals / Connections"}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: font ? [{ name: "NotoSansJP", data: font, weight: 700, style: "normal" }] : [],
    }
  );
}
