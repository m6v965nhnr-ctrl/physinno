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

// 同じ文の翻訳は、1日ぶん保存して、MyMemoryへの問い合わせ（無料枠は文字数の制限あり）を減らす。
// 成功したものだけ保存する。サーバーの1インスタンスの中だけ（再起動・別インスタンスでは、また問い合わせる）
const TRANSLATION_TTL_MS = 24 * 60 * 60 * 1000;
const TRANSLATION_CACHE_MAX = 500;
const translationCache = new Map<string, { value: string; at: number }>();

export async function translateText(
  text: string,
  from: "ja" | "en",
  to: "ja" | "en"
): Promise<string | null> {
  const key = `${from}|${to}|${text}`;
  const hit = translationCache.get(key);
  if (hit && Date.now() - hit.at < TRANSLATION_TTL_MS) return hit.value;

  const value = await fetchTranslation(text, from, to);
  if (value) {
    if (translationCache.size >= TRANSLATION_CACHE_MAX) {
      // 古いものから消す（Mapは、入れた順に並ぶ）
      translationCache.delete(translationCache.keys().next().value as string);
    }
    translationCache.set(key, { value, at: Date.now() });
  }
  return value;
}

async function fetchTranslation(
  text: string,
  from: "ja" | "en",
  to: "ja" | "en"
): Promise<string | null> {
  try {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}${
        process.env.CONTACT_EMAIL ? `&de=${encodeURIComponent(process.env.CONTACT_EMAIL)}` : ""
      }`,
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
