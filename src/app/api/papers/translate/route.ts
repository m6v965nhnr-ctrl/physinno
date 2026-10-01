import { translateText } from "@/lib/server/mymemory";

// 検索結果の論文タイトルを日本語にまとめて翻訳するためのAPI。
// 「今は直訳でもいい」との方針のため、用語集は使わずMyMemoryの
// 素の翻訳結果をそのまま返す。

export const dynamic = "force-dynamic";
export const maxDuration = 25;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const texts = body?.texts;

  if (!Array.isArray(texts)) {
    return Response.json({ translations: [] });
  }

  const inputs = texts.filter((t): t is string => typeof t === "string").slice(0, 60);
  const translations = await Promise.all(
    inputs.map((t) => translateText(t, "en", "ja"))
  );

  return Response.json({ translations });
}
