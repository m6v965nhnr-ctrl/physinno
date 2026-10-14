import { translateText } from "@/lib/server/mymemory";

// 検索結果の論文タイトルを日本語にまとめて翻訳するためのAPI。
// 「今は直訳でもいい」との方針のため、用語集は使わずMyMemoryの
// 素の翻訳結果をそのまま返す。

export const dynamic = "force-dynamic";
export const maxDuration = 25;

export async function POST(request: Request) {
  // 大きなデータを、読み込まない
  if (Number(request.headers.get("content-length") ?? 0) > 20_000) {
    return Response.json({ translations: [] }, { status: 413 });
  }
  const body = await request.json().catch(() => null);
  const texts = body?.texts;

  if (!Array.isArray(texts)) {
    return Response.json({ translations: [] });
  }

  // 外部の翻訳サービスの無料枠を、他人に使い切られないよう、件数と長さを制限する（論文のタイトル程度の長さ）
  const inputs = texts
    .filter((t): t is string => typeof t === "string")
    .slice(0, 30)
    .map((t) => t.slice(0, 300));
  const translations = await Promise.all(
    inputs.map((t) => translateText(t, "en", "ja"))
  );

  return Response.json({ translations });
}
