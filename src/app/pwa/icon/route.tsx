import { ImageResponse } from "next/og";

// ホーム画面用のアイコン(PNG)。/pwa/icon?size=192|512|180 、maskable=1 で余白つき(Androidの丸型などに対応)
const SIZES = new Set([180, 192, 512]);

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const requested = Number(searchParams.get("size"));
  const size = SIZES.has(requested) ? requested : 512;
  const maskable = searchParams.get("maskable") === "1";

  // maskable は外側の約10%が切り取られることがあるため、文字を中央に小さめに置く
  const fontSize = Math.round(size * (maskable ? 0.46 : 0.62));
  const radius = maskable ? 0 : Math.round(size * 0.22);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #55c7dc 0%, #45d0c2 50%, #4ed7a7 100%)",
          borderRadius: radius,
          color: "#ffffff",
          fontSize,
          fontWeight: 700,
          fontFamily: "sans-serif",
        }}
      >
        R
      </div>
    ),
    { width: size, height: size }
  );
}
