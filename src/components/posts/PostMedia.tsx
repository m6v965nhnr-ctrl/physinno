import { mediaKind } from "@/lib/postMedia";

// 写真と動画（リンクの中に置いてよい）。1枚は大きく、2枚以上は2列で並べる
export function PostMediaVisual({ urls, detail = false }: { urls: string[]; detail?: boolean }) {
  const visual = urls.filter((u) => mediaKind(u) !== "pdf");
  if (visual.length === 0) return null;

  const multi = !detail && visual.length > 1;

  return (
    <div className={`mt-4 ${multi ? "grid grid-cols-2 gap-1.5" : "space-y-3"}`}>
      {visual.map((u) =>
        mediaKind(u) === "video" ? (
          <video
            key={u}
            src={u}
            controls
            playsInline
            className={`w-full rounded-xl ${multi ? "aspect-square object-cover" : "max-h-[700px]"}`}
          />
        ) : detail ? (
          <a key={u} href={u} target="_blank" rel="noopener noreferrer" className="block">
            <img loading="lazy" decoding="async" src={u} alt="添付した写真" className="w-full max-h-[700px] rounded-xl object-contain" />
          </a>
        ) : (
          <img
            key={u}
            loading="lazy"
            decoding="async"
            src={u}
            alt="投稿画像"
            className={`w-full rounded-xl ${multi ? "aspect-square object-cover" : "max-h-[600px] object-cover"}`}
          />
        )
      )}
    </div>
  );
}

// PDFの資料へのリンク（リンクの外に置く）
export function PostMediaFiles({ urls, compact = false }: { urls: string[]; compact?: boolean }) {
  const pdfs = urls.filter((u) => mediaKind(u) === "pdf");
  if (pdfs.length === 0) return null;

  return (
    <>
      {pdfs.map((u, i) => (
        <a
          key={u}
          href={u}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={`block w-fit rounded-lg border bg-gray-50 hover:bg-gray-100 ${
            compact ? "px-2.5 py-1.5 text-xs text-gray-600" : "px-3 py-2 text-sm"
          }`}
        >
          📄 添付資料を開く{pdfs.length > 1 ? `（${i + 1}）` : ""}
        </a>
      ))}
    </>
  );
}
