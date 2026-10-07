import { ImageResponse } from "next/og";
import { EVIDENCE_LEVELS } from "@/lib/evidence";

export const alt = "エビデンスレベル早見表 I〜VI｜Re:light";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TITLE = "エビデンスレベル早見表";

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

export default async function OpengraphImage() {
  const rows = EVIDENCE_LEVELS.map((l) => ({ key: l.key, short: l.short }));
  const font = await loadJapaneseFont(TITLE + "Re:light論文の強さ" + rows.map((r) => r.key + r.short).join(""));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "52px 64px",
          background: "linear-gradient(135deg, #55c7dc 0%, #45d0c2 50%, #4ed7a7 100%)",
          color: "#ffffff",
          fontFamily: font ? "NotoSansJP" : "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30, fontWeight: 700 }}>
          <span>{font ? TITLE : "Evidence levels"}</span>
          <span>Re:light</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 26, gap: 10 }}>
          {rows.map((r, i) => (
            <div
              key={r.key}
              style={{
                display: "flex",
                alignItems: "center",
                background: "rgba(255,255,255,0.92)",
                color: "#0c4a6e",
                borderRadius: 14,
                padding: "8px 22px",
                marginLeft: i * 18,
              }}
            >
              <span style={{ width: 90, fontSize: 36, fontWeight: 700 }}>{r.key}</span>
              <span style={{ fontSize: 32, fontWeight: 700 }}>{font ? r.short : ""}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size, fonts: font ? [{ name: "NotoSansJP", data: font, weight: 700, style: "normal" }] : [] }
  );
}
