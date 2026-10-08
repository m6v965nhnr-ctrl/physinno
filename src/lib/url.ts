// 参考URLなど、ユーザーが入力したリンクを、安全に扱う。
// http(s) の URL だけを、リンクとして認める（javascript: などは認めない）。「www.」で始まるものは、https:// を補う。
export function safeHttpUrl(value: string | null | undefined): string | null {
  const v = (value ?? "").trim();
  if (!v || /\s/.test(v)) return null;

  const candidate = /^www\./i.test(v) ? `https://${v}` : v;
  if (!/^https?:\/\//i.test(candidate)) return null;

  try {
    const u = new URL(candidate);
    if ((u.protocol !== "http:" && u.protocol !== "https:") || !u.hostname.includes(".")) return null;
    return u.toString();
  } catch {
    return null;
  }
}

export const REFERENCE_URL_ERROR = "参考URLは、https:// から始まるURLを入力してください（URLがない場合は、空のままで大丈夫です）";
