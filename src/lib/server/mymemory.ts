// MyMemory無料翻訳APIの薄いラッパー（サーバー側専用）。
// 単語単体だと辞書エントリ（ふりがな・スラッシュ付き）が混じることが
// あるため、記号を除去するだけの最低限のクリーンアップを行う。

export function containsJapanese(s: string): boolean {
  return /[぀-ヿ㐀-鿿]/.test(s);
}

function cleanTranslation(raw: string): string {
  return raw
    .replace(/\[[^\]]*\]/g, " ")
    .replace(/\//g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export async function translateText(
  text: string,
  from: "ja" | "en",
  to: "ja" | "en"
): Promise<string | null> {
  try {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`,
      { signal: AbortSignal.timeout(6000) }
    );
    if (!res.ok) return null;

    const data = (await res.json()) as {
      responseData?: { translatedText?: string };
    };
    const raw = data.responseData?.translatedText;
    if (!raw) return null;

    const cleaned = cleanTranslation(raw);
    if (!cleaned) return null;
    // 英訳したはずなのに日本語が残っている＝翻訳できていないので諦める
    if (to === "en" && containsJapanese(cleaned)) return null;

    return cleaned;
  } catch {
    return null;
  }
}
