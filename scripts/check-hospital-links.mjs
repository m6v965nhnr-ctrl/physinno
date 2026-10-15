// 病院の公式サイトのリンクが、いまも開けるかを調べる（読み取りのみ。結果はJSONで出力）
// 使い方: node scripts/check-hospital-links.mjs out.json
// 死んでいる判定: つながらない・404/410・5xx・「ページが見つかりません」の画面。403/429 などは、ロボット避けの可能性があるので、生きているとみなす
import { readFileSync, writeFileSync } from "node:fs";

function env(name) {
  if (process.env[name]) return process.env[name];
  const m = readFileSync(new URL("../.env.local", import.meta.url), "utf8").match(new RegExp(`^${name}=(.*)$`, "m"));
  return m ? m[1].trim() : "";
}
const base = env("NEXT_PUBLIC_SUPABASE_URL");
const key = env("NEXT_PUBLIC_SUPABASE_ANON_KEY");
const out = process.argv[2] || "hospital-links.json";
const UA = "Mozilla/5.0 (compatible; RelightLinkCheck/1.0)";
const SOFT404 = /(404|not\s*found|ページが見つかりません|お探しのページ|存在しません|削除されました)/i;

async function listHospitals() {
  const rows = [];
  for (let from = 0; ; from += 1000) {
    const r = await fetch(`${base}/rest/v1/hospitals?select=id,website&website=not.is.null&order=id`, {
      headers: { apikey: key, Authorization: `Bearer ${key}`, Range: `${from}-${from + 999}` },
    });
    const page = await r.json();
    rows.push(...page);
    if (page.length < 1000) break;
  }
  return rows;
}

export async function probe(url) {
  const u = url.startsWith("http") ? url : `https://${url}`;
  try {
    const res = await fetch(u, { redirect: "follow", headers: { "User-Agent": UA, "Accept-Language": "ja" }, signal: AbortSignal.timeout(10000) });
    if (res.status === 404 || res.status === 410 || res.status >= 500) return { ok: false, why: `HTTP ${res.status}` };
    if (res.status === 200) {
      const ct = res.headers.get("content-type") || "";
      if (ct.includes("html")) {
        const buf = Buffer.from(await res.arrayBuffer()).subarray(0, 4000);
        const text = new TextDecoder("utf-8", { fatal: false }).decode(buf);
        const title = (text.match(/<title[^>]*>([^<]*)<\/title>/i) || [])[1] || "";
        if (SOFT404.test(title)) return { ok: false, why: `title: ${title.slice(0, 40)}` };
      }
    }
    return { ok: true, final: res.url };
  } catch (e) {
    return { ok: false, why: String(e?.cause?.code || e?.name || e).slice(0, 40) };
  }
}

const hospitals = await listHospitals();
console.error(`checking ${hospitals.length}`);
const results = [];
let i = 0, done = 0;

async function worker() {
  while (i < hospitals.length) {
    const h = hospitals[i++];
    let r = await probe(h.website);
    let fallback = null;
    if (!r.ok) {
      // 個別ページが消えただけかもしれないので、同じドメインのトップを試す
      try {
        const origin = new URL(h.website.startsWith("http") ? h.website : `https://${h.website}`).origin;
        if (origin !== h.website.replace(/\/$/, "")) {
          const t = await probe(origin);
          if (t.ok) fallback = origin;
        }
      } catch {}
    }
    results.push({ id: h.id, website: h.website, ok: r.ok, why: r.why, fallback });
    if (++done % 500 === 0) console.error(done);
  }
}
await Promise.all(Array.from({ length: 40 }, worker));
writeFileSync(out, JSON.stringify(results));
const dead = results.filter((r) => !r.ok);
console.error(`ok=${results.length - dead.length} dead=${dead.length} repaired=${dead.filter((r) => r.fallback).length}`);
