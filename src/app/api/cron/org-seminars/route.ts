import { createClient } from "@supabase/supabase-js";
import { extractText, getDocumentProxy } from "unpdf";
import { Seminar, candidateToOrgSeminar, isUsableOrgEvent } from "../../../../../supabase/functions/sync-seminars/parsers";
import { syncPrefSite } from "../../../../../supabase/functions/sync-seminars/pref";
import { SEMINAR_ORGS } from "@/lib/seminarOrgs";

// 学会・団体（理学療法の専門分野・関連学会・協会など）の公式サイトから、研修・学会・講習の告知を集める。
// 団体の一覧は src/lib/seminarOrgs.ts（公式サイトのURLがあるものが対象）。
// 団体が多いので、1日に1/4ずつ（1団体は、4日に1回）。Vercel Cron（vercel.json）から呼ぶ。
// 認証: Vercel Cron が付ける Authorization: Bearer $CRON_SECRET
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const GROUPS = 4;
const CONCURRENCY = 6;
const BUDGET_MS = 45_000;

const UA = "Mozilla/5.0 (compatible; RelightSeminarSync/1.0; +https://relight-1wet.vercel.app)";
const options = (ms: number) => ({
  headers: { "User-Agent": UA, "Accept-Language": "ja" },
  redirect: "follow" as const,
  signal: AbortSignal.timeout(ms),
  cache: "no-store" as const,
});

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const now = Date.now();
  const today = new Date(now + 9 * 3600 * 1000).toISOString().slice(0, 10);
  const slot = Math.floor(now / 86_400_000) % GROUPS;

  const deps = {
    today,
    mode: "articles" as const,
    toSeminar: candidateToOrgSeminar,
    fetchText: async (u: string) => {
      const res = await fetch(u, options(10000));
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return { text: await res.text(), url: res.url };
    },
    fetchBytes: async (u: string) => {
      const res = await fetch(u, options(15000));
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return new Uint8Array(await res.arrayBuffer());
    },
    pdfToText: async (bytes: Uint8Array) => {
      const pdf = await getDocumentProxy(bytes);
      return (await extractText(pdf, { mergePages: true })).text;
    },
  };

  const targets = SEMINAR_ORGS.filter((o) => o.url).filter((_, i) => i % GROUPS === slot);
  const rows: Seminar[] = [];
  const stats: Record<string, string> = {};
  const started = Date.now();
  let next = 0;

  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (next < targets.length && Date.now() - started < BUDGET_MS) {
        const o = targets[next++];
        try {
          const r = await syncPrefSite({ code: o.code, prefecture: "", name: o.name, url: o.url! }, deps);
          const ok = r.rows.filter((x) => isUsableOrgEvent(x, today));
          rows.push(...ok);
          stats[o.code] = `${ok.length}`;
        } catch (e) {
          stats[o.code] = `skip ${String(e).slice(0, 40)}`;
        }
      }
    })
  );

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    auth: { persistSession: false },
  });

  const unique = new Map(rows.map((r) => [r.id, r]));
  const { data, error } = await supabase.rpc("ingest_seminars", { p_token: secret, p_rows: [...unique.values()] });

  if (error) return Response.json({ error: error.message, stats }, { status: 500 });
  return Response.json({ slot, orgs: targets.length, fetched: unique.size, saved: data, stats });
}
