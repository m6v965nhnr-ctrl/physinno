// 小さな勉強会・セミナー（こくちーず・Doorkeeper）を、いま集める（毎日の自動取得を待たずに、最初に入れるとき用）。
// 使い方: INGEST_TOKEN=... node scripts/sync-community-seminars.mts [出力JSON]   （トークンがなければ、集めた結果をJSONに書くだけ）
import { readFileSync, writeFileSync } from "node:fs";
import type { Seminar } from "../supabase/functions/sync-seminars/parsers.ts";
import { DOORKEEPER_KEYWORDS, KOKUCHPRO_KEYWORDS, doorkeeperUrl, kokuchproUrl, parseDoorkeeper, parseKokuchpro } from "../src/lib/server/communityEvents.ts";

const UA = "Mozilla/5.0 (compatible; RelightSeminarSync/1.0; +https://relight-1wet.vercel.app)";
const today = new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 10);
const PAGES = Number(process.env.PAGES || 8);
const rows: Seminar[] = [];
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function get(url: string) {
  const res = await fetch(url, { headers: { "User-Agent": UA, "Accept-Language": "ja" }, signal: AbortSignal.timeout(20000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res;
}

const stats: Record<string, number> = {};
for (const kw of KOKUCHPRO_KEYWORDS) {
  for (let page = 1; page <= PAGES; page++) {
    try {
      const found = parseKokuchpro(await (await get(kokuchproUrl(kw, page))).text(), today);
      rows.push(...found);
      stats[`こくちーず:${kw}`] = (stats[`こくちーず:${kw}`] ?? 0) + found.length;
    } catch {
      break;
    }
    await sleep(1200); // 相手に負担をかけないよう、1ページごとに待つ
  }
}
for (const kw of DOORKEEPER_KEYWORDS) {
  for (let page = 1; page <= PAGES; page++) {
    try {
      const found = parseDoorkeeper(await (await get(doorkeeperUrl(kw, page))).json(), today);
      rows.push(...found);
      stats[`Doorkeeper:${kw}`] = (stats[`Doorkeeper:${kw}`] ?? 0) + found.length;
    } catch {
      break;
    }
    await sleep(1200);
  }
}

const unique = [...new Map(rows.map((r) => [r.id, r])).values()];
writeFileSync(process.argv[2] || "/tmp/community-seminars.json", JSON.stringify(unique));
console.log(`告知 ${unique.length}`, stats);

const token = process.env.INGEST_TOKEN;
if (token) {
  const env = (n: string) => readFileSync(new URL("../.env.local", import.meta.url), "utf8").match(new RegExp(`^${n}=(.*)$`, "m"))![1].trim();
  const res = await fetch(`${env("NEXT_PUBLIC_SUPABASE_URL")}/rest/v1/rpc/ingest_seminars`, {
    method: "POST",
    headers: { apikey: env("NEXT_PUBLIC_SUPABASE_ANON_KEY"), Authorization: `Bearer ${env("NEXT_PUBLIC_SUPABASE_ANON_KEY")}`, "Content-Type": "application/json" },
    body: JSON.stringify({ p_token: token, p_rows: unique }),
  });
  console.log("保存", res.status, await res.text());
}
process.exit(0);
