import { createClient } from "@supabase/supabase-js";
import type { Seminar } from "../../../../../supabase/functions/sync-seminars/parsers";
import {
  DOORKEEPER_KEYWORDS,
  KOKUCHPRO_KEYWORDS,
  doorkeeperUrl,
  kokuchproUrl,
  parseDoorkeeper,
  parseKokuchpro,
} from "@/lib/server/communityEvents";

// 小さな勉強会・セミナー（こくちーず・Doorkeeper）の、理学療法・リハビリに関わるものを、毎日集める。
// 検索のページを、1ページずつ（相手に負担をかけないよう、少しずつ）読む。Vercel Cron（vercel.json）から呼ぶ。
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const PAGES = 4;
const CONCURRENCY = 3;
const BUDGET_MS = 45_000;
const UA = "Mozilla/5.0 (compatible; RelightSeminarSync/1.0; +https://relight-1wet.vercel.app)";

async function get(url: string) {
  const res = await fetch(url, { headers: { "User-Agent": UA, "Accept-Language": "ja" }, signal: AbortSignal.timeout(12000), cache: "no-store" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res;
}

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const today = new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 10);
  const jobs: (() => Promise<Seminar[]>)[] = [];
  for (const kw of KOKUCHPRO_KEYWORDS)
    for (let p = 1; p <= PAGES; p++) jobs.push(async () => parseKokuchpro(await (await get(kokuchproUrl(kw, p))).text(), today));
  for (const kw of DOORKEEPER_KEYWORDS)
    for (let p = 1; p <= 2; p++) jobs.push(async () => parseDoorkeeper(await (await get(doorkeeperUrl(kw, p))).json(), today));

  const rows: Seminar[] = [];
  const started = Date.now();
  let next = 0;
  let failed = 0;

  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (next < jobs.length && Date.now() - started < BUDGET_MS) {
        const job = jobs[next++];
        try {
          rows.push(...(await job()));
        } catch {
          failed++;
        }
        await new Promise((r) => setTimeout(r, 800)); // 相手に負担をかけない
      }
    })
  );

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { auth: { persistSession: false } });
  const unique = [...new Map(rows.map((r) => [r.id, r])).values()];
  const { data, error } = await supabase.rpc("ingest_seminars", { p_token: secret, p_rows: unique });

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ jobs: jobs.length, done: next, failed, fetched: unique.length, saved: data });
}
