// 患者さんが特定されそうな書き方・連絡先を、投稿やAIに送る前に警告するための簡易チェック。
// 見つかった場合は、その内容(種類)を返す。完全な検出ではないため、最終的には書く人が確認する

// 「患者さん」「利用者さん」のような一般的な呼び方は、個人名ではないので警告しない
const GENERIC_BEFORE_SAN = /^(患者|利用者|対象者|ご?家族|お子|子ども|ご本人|本人|皆|みな|お客|先輩|後輩|先生|相手|当事者|ケース|症例|被験者|参加者)$/;

export function findPrivacyRisk(text: string): string | null {
  if (/\d{2,4}-\d{2,4}-\d{3,4}/.test(text) || /0\d{9,10}/.test(text)) return "電話番号らしき数字";
  if (/[\w.+-]+@[\w-]+\.[\w.-]+/.test(text)) return "メールアドレス";
  if (/(19|20)\d{2}[年/.-]\s?\d{1,2}[月/.-]\s?\d{1,2}/.test(text)) return "具体的な日付（生年月日など）";

  for (const m of text.matchAll(/([一-龥ぁ-んァ-ン]{1,6})(さん|様|氏)(が|は|の|に|を|、|。|$)/g)) {
    // 直前に付いた文字を後ろから削って、一般的な呼び方で終わっていれば除外する
    const before = m[1];
    const isGeneric = Array.from({ length: before.length }, (_, i) => before.slice(i)).some((tail) =>
      GENERIC_BEFORE_SAN.test(tail)
    );
    if (!isGeneric) return "「〇〇さん」のような個人名らしき表現";
  }

  return null;
}
