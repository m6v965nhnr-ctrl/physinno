import { createClient } from "@supabase/supabase-js";
import { isGeminiConfigured } from "@/lib/server/gemini";
import { extract } from "@/lib/server/hospitalRecruit";

// 病院の公式サイト（トップ＋採用のページ）から、給与・休日・アクセスなどを読み取って、hospital_recruit に入れる。
// 毎日、病床の多い病院から約18件。1病院は、約30日に1回。Vercel Cron（vercel.json）から呼ぶ。
//  ・AIが出した値は、「原文の抜粋（q）」が、ページの文面に本当にあるものだけを採用する（ないものは捨てる）
//  ・お金（月給・賞与・年収）は、3〜9月だけ更新する（初めての取り込みだけは、時期を問わない）
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const BATCH = 18;
const CONCURRENCY = 6;

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return new Response("Unauthorized", { status: 401 });
  }
  if (!isGeminiConfigured()) return Response.json({ skipped: "GEMINI_API_KEY がありません" });

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    auth: { persistSession: false },
  });

  const { data: targets, error } = await supabase.rpc("next_recruit_targets", { p_token: secret, p_limit: BATCH });
  if (error) return Response.json({ error: error.message }, { status: 500 });

  const month = new Date(Date.now() + 9 * 3600 * 1000).getUTCMonth() + 1; // 日本の月
  const moneySeason = month >= 3 && month <= 9;

  const list = (targets ?? []) as { id: string; website: string; has_money: boolean }[];
  const rows: Record<string, unknown>[] = [];
  let next = 0;
  let readable = 0;

  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (next < list.length) {
        const h = list[next++];
        const r = await extract(h.website, moneySeason || !h.has_money);
        // 読めなかった病院も、取得日だけ記録する（毎日、同じ病院を試さないため）
        if (r && !r.empty) {
          readable++;
          rows.push({ hospital_id: h.id, ...r.row });
        } else {
          rows.push({ hospital_id: h.id });
        }
      }
    })
  );

  const { data: saved, error: saveError } = await supabase.rpc("ingest_hospital_recruit", { p_token: secret, p_rows: rows });
  if (saveError) return Response.json({ error: saveError.message }, { status: 500 });

  return Response.json({ targets: list.length, readable, saved, moneySeason });
}
