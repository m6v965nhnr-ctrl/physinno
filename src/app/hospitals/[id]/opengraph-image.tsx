import { ImageResponse } from "next/og";
import { supabasePublic } from "@/lib/supabasePublic";

export const alt = "病院の基本情報と職場環境の口コミ｜Re:light";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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

// シェア・検索結果で、病院名つきのブランドカードにする（病院の基本情報は、もともと公開されているものだけ）
export default async function HospitalOpengraphImage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { data: hospital } = await supabasePublic
    .from("hospitals")
    .select("name, prefecture, city")
    .eq("id", id)
    .maybeSingle();

  const name = hospital?.name ?? "病院";
  const place = [hospital?.prefecture, hospital?.city].filter(Boolean).join(" ");
  const font = await loadJapaneseFont(name + place + "Re:light病院の基本情報と職場環境の口コミ");

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
          病院の基本情報と口コミ
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: name.length > 18 ? 56 : 72, fontWeight: 700, lineHeight: 1.3 }}>{name}</div>
          {place && <div style={{ display: "flex", marginTop: 16, fontSize: 32, fontWeight: 700 }}>{place}</div>}
        </div>

        <div style={{ display: "flex", fontSize: 28, fontWeight: 700 }}>Re:light｜理学療法士の職場環境の口コミ</div>
      </div>
    ),
    { ...size, fonts: font ? [{ name: "NotoSansJP", data: font, weight: 700, style: "normal" }] : [] }
  );
}
