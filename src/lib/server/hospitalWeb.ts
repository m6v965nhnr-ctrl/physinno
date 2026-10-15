// 病院の公式サイトを、サーバーから読む・調べるための部品（Cron用）
const UA = "Mozilla/5.0 (compatible; RelightHospitalSync/1.0; +https://relight-1wet.vercel.app)";
const SOFT404 = /(404|not\s*found|ページが見つかりません|お探しのページ|存在しません|削除されました)/i;

// 登録されたURLは、病院を作った人が入力できる。サーバー内部のアドレスを読まされないよう、公開サイトの形だけを許す
export function safePublicUrl(raw: string): URL | null {
  try {
    const u = new URL(raw.startsWith("http") ? raw : `https://${raw}`);
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;
    if (u.username || u.password) return null;
    const h = u.hostname.toLowerCase();
    if (!h.includes(".") || h === "localhost" || /^[\d.]+$/.test(h) || h.includes(":") || /\.(local|internal|localhost)$/.test(h)) return null;
    return u;
  } catch {
    return null;
  }
}

export type LinkStatus = "ok" | "dead" | "unknown";

// 「見つかりません」と言える場合だけ dead。証明書の期限切れ・タイムアウト・ロボット避け(403/429)などは、判定できないので unknown 以上にしない
export async function probeSite(raw: string): Promise<LinkStatus> {
  const u = safePublicUrl(raw);
  if (!u) return "dead";
  try {
    const res = await fetch(u, {
      redirect: "follow",
      headers: { "User-Agent": UA, "Accept-Language": "ja" },
      signal: AbortSignal.timeout(7000),
      cache: "no-store",
    });
    if (res.status === 404 || res.status === 410) return "dead";
    if (res.status >= 500) return "unknown";
    if (res.status === 200 && (res.headers.get("content-type") || "").includes("html")) {
      const text = (await res.text()).slice(0, 4000);
      const title = (text.match(/<title[^>]*>([^<]*)<\/title>/i) || [])[1] || "";
      if (SOFT404.test(title)) return "dead";
    }
    return "ok";
  } catch (e) {
    const code = String((e as { cause?: { code?: string } })?.cause?.code ?? "");
    return code === "ENOTFOUND" || code === "ECONNREFUSED" ? "dead" : "unknown";
  }
}

export function htmlToText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<!--[\s\S]*?-->/gi, " ")
    .replace(/<br\s*\/?>|<\/(p|div|li|tr|h\d|dt|dd|th|td)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/[ \t　]+/g, " ")
    .replace(/\n\s*\n+/g, "\n")
    .trim();
}

export async function fetchHtml(u: URL): Promise<string | null> {
  try {
    const res = await fetch(u, { redirect: "follow", headers: { "User-Agent": UA, "Accept-Language": "ja" }, signal: AbortSignal.timeout(7000), cache: "no-store" });
    if (!res.ok || !(res.headers.get("content-type") || "").includes("html")) return null;
    const buf = new Uint8Array(await res.arrayBuffer()).slice(0, 600_000);
    const ct = res.headers.get("content-type") || "";
    const head = new TextDecoder("utf-8").decode(buf.slice(0, 2000));
    const label = /charset=([\w-]+)/i.exec(ct)?.[1] ?? /charset=["']?([\w-]+)/i.exec(head)?.[1] ?? "utf-8";
    try {
      return new TextDecoder(label).decode(buf);
    } catch {
      return new TextDecoder("utf-8").decode(buf);
    }
  } catch {
    return null;
  }
}

// トップページから、採用のページらしいリンクを探す（同じサイトの中だけ）
export function findRecruitLinks(html: string, base: URL, max = 2): URL[] {
  const found: URL[] = [];
  const re = /<a\s[^>]*href=["']([^"'#]+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) && found.length < max) {
    const label = htmlToText(m[2]).slice(0, 40);
    if (!/(採用|求人|募集|リクルート|recruit|career|職員|セラピスト)/i.test(`${label} ${m[1]}`)) continue;
    try {
      const u = new URL(m[1], base);
      if (u.hostname !== base.hostname || !/^https?:$/.test(u.protocol) || /\.(pdf|jpe?g|png|zip)$/i.test(u.pathname)) continue;
      if (!found.some((f) => f.href === u.href)) found.push(u);
    } catch {}
  }
  return found;
}
