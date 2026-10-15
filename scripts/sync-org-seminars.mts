// 学会・団体のサイトから、研修・学会の告知を、すべての団体について、いま集める（毎日の自動取得を待たずに、最初に入れるとき用）。
// 使い方: INGEST_TOKEN=... node scripts/sync-org-seminars.mts [出力JSON]   （トークンがなければ、集めた結果をJSONに書くだけ）
import { execFile } from "node:child_process";
import { readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";
import { candidateToOrgSeminar, isUsableOrgEvent } from "../supabase/functions/sync-seminars/parsers.ts";
import type { Seminar } from "../supabase/functions/sync-seminars/parsers.ts";
import { syncPrefSite } from "../supabase/functions/sync-seminars/pref.ts";
import { SEMINAR_ORGS } from "../src/lib/seminarOrgs.ts";

const run = promisify(execFile);
const UA = "Mozilla/5.0 (compatible; RelightSeminarSync/1.0; +https://relight-1wet.vercel.app)";
const opt = (ms: number) => ({ headers: { "User-Agent": UA, "Accept-Language": "ja" }, redirect: "follow" as const, signal: AbortSignal.timeout(ms) });
let seq = 0;

const deps = {
  today: new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 10),
  mode: "articles" as const,
  toSeminar: candidateToOrgSeminar,
  fetchText: async (u: string) => {
    const res = await fetch(u, opt(12000));
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return { text: await res.text(), url: res.url };
  },
  fetchBytes: async (u: string) => {
    const res = await fetch(u, opt(20000));
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return new Uint8Array(await res.arrayBuffer());
  },
  pdfToText: async (bytes: Uint8Array) => {
    const tmp = join(tmpdir(), `os-${process.pid}-${seq++}.pdf`);
    writeFileSync(tmp, bytes);
    try {
      const { stdout } = await run("pdftotext", ["-layout", "-l", "6", "-enc", "UTF-8", tmp, "-"], { timeout: 20000, maxBuffer: 5_000_000 });
      return stdout;
    } finally {
      try { unlinkSync(tmp); } catch {}
    }
  },
};

const targets = SEMINAR_ORGS.filter((o) => o.url);
const rows: Seminar[] = [];
const stats: Record<string, string> = {};
let next = 0;

await Promise.all(
  Array.from({ length: 8 }, async () => {
    while (next < targets.length) {
      const o = targets[next++];
      try {
        const r = await syncPrefSite({ code: o.code, prefecture: "", name: o.name, url: o.url! }, deps);
        const ok = r.rows.filter((x) => isUsableOrgEvent(x, deps.today));
        rows.push(...ok);
        stats[o.code] = `${ok.length} (候補${r.stat.candidates})`;
      } catch (e) {
        stats[o.code] = `skip ${String(e).slice(0, 50)}`;
      }
    }
  })
);

const unique = [...new Map(rows.map((r) => [r.id, r])).values()];
writeFileSync(process.argv[2] || "/tmp/org-seminars.json", JSON.stringify(unique));
console.log(`団体 ${targets.length} / 告知 ${unique.length}`);
for (const [k, v] of Object.entries(stats)) if (!v.startsWith("0 ")) console.log(k, v);

const token = process.env.INGEST_TOKEN;
if (token) {
  const env = (n: string) => readFileSync(new URL("../.env.local", import.meta.url), "utf8").match(new RegExp(`^${n}=(.*)$`, "m"))![1].trim();
  const base = env("NEXT_PUBLIC_SUPABASE_URL");
  const key = env("NEXT_PUBLIC_SUPABASE_ANON_KEY");
  const res = await fetch(`${base}/rest/v1/rpc/ingest_seminars`, {
    method: "POST",
    headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ p_token: token, p_rows: unique }),
  });
  console.log("保存", res.status, await res.text());
}
process.exit(0);
