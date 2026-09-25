import { createClient } from "@supabase/supabase-js";
import { extractText, getDocumentProxy } from "unpdf";
import { PREF_SITES, Seminar } from "../../../../../supabase/functions/sync-seminars/parsers";
import { syncPrefSite } from "../../../../../supabase/functions/sync-seminars/pref";

// Supabase の Edge Function からはアクセスを拒否される士会サイト（403）を、
// Vercel Cron（vercel.json）から毎日 0:05（JST）頃に取得する。
// 認証: Vercel Cron が付ける Authorization: Bearer $CRON_SECRET

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// Edge Function からアクセスを拒否される士会サイト（記事・PDFも含めてこちらで取得）
const BLOCKED_IN_EDGE = ["tochigi", "miyazaki", "toyama"];

// 公開Googleカレンダーを載せている士会サイト（EdgeからはGoogleが429を返すためこちらで取得）
const WITH_CALENDAR = ["akita", "aomori", "gunma", "shimane", "ishikawa", "nagano", "wakayama"];

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15";

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

  const today = new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 10);

  const deps = {
    today,
    fetchText: async (u: string) => {
      const res = await fetch(u, options(12000));
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return { text: await res.text(), url: res.url };
    },
    fetchBytes: async (u: string) => {
      const res = await fetch(u, options(20000));
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return new Uint8Array(await res.arrayBuffer());
    },
    pdfToText: async (bytes: Uint8Array) => {
      const pdf = await getDocumentProxy(bytes);
      return (await extractText(pdf, { mergePages: true })).text;
    },
  };

  const rows: Seminar[] = [];
  const stats: Record<string, string> = {};

  const targets: { site: (typeof PREF_SITES)[number]; mode: "all" | "calendar" }[] = [
    ...PREF_SITES.filter((s) => BLOCKED_IN_EDGE.includes(s.code)).map((site) => ({ site, mode: "all" as const })),
    ...PREF_SITES.filter((s) => WITH_CALENDAR.includes(s.code)).map((site) => ({ site, mode: "calendar" as const })),
  ];

  for (const { site, mode } of targets) {
    try {
      const r = await syncPrefSite(site, { ...deps, mode });
      rows.push(...r.rows);
      stats[`${site.prefecture}(${mode})`] = JSON.stringify(r.stat);
    } catch (e) {
      stats[site.prefecture] = `skip ${String(e).slice(0, 80)}`;
    }
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  );

  const unique = new Map(rows.map((r) => [r.id, r]));

  const { data, error } = await supabase.rpc("ingest_seminars", {
    p_token: secret,
    p_rows: [...unique.values()],
  });

  if (error) {
    return Response.json({ error: error.message, stats }, { status: 500 });
  }

  return Response.json({ saved: data, stats });
}
