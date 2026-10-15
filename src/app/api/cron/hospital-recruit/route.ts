import { createClient } from "@supabase/supabase-js";
import { extractText, getDocumentProxy } from "unpdf";
import { scan, setPdfToText } from "../../../../../scripts/hospital-scan-core.mjs";

// 病院の公式サイト（トップ→採用ページ→理学療法士・募集要項のページ／PDF→サイトマップ）から、給与・休日・アクセスなどを、
// 書いてあるとおりに抜き出して、hospital_recruit に入れる（AIは使わない。scripts/hospital-scan-core.mjs）。
// 毎日、いちばん長く取っていない病院から約130件（全体で約30日に1周）。Vercel Cron（vercel.json）から呼ぶ。
//  ・お金（月給・賞与・年収）は、3〜9月だけ更新する（初めての取り込みだけは、時期を問わない）
//  ・人が入れた行（在籍PT・運営者の転記）は、DB側で上書きしない
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const BATCH = 130;
const CONCURRENCY = 24;
const BUDGET_MS = 42_000; // これを過ぎたら、新しい病院は始めない（残りは、次の日に回る）

setPdfToText(async (buf) => {
  const pdf = await getDocumentProxy(buf);
  const { text } = await extractText(pdf, { mergePages: true });
  return text;
});

const MONEY_KEYS = ["monthly_min", "monthly_max", "bonus_months", "annual_stated_min", "annual_stated_max"] as const;

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    auth: { persistSession: false },
  });

  const { data: targets, error } = await supabase.rpc("next_recruit_targets", { p_token: secret, p_limit: BATCH });
  if (error) return Response.json({ error: error.message }, { status: 500 });

  const month = new Date(Date.now() + 9 * 3600 * 1000).getUTCMonth() + 1; // 日本の月
  const moneySeason = month >= 3 && month <= 9;

  const list = (targets ?? []) as { id: string; website: string; has_money: boolean }[];
  const rows: Record<string, unknown>[] = [];
  const started = Date.now();
  let next = 0;
  let withMoney = 0;

  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (next < list.length && Date.now() - started < BUDGET_MS) {
        const h = list[next++];
        let r: Record<string, unknown>;
        try {
          r = { ...(await scan({ id: h.id, website: h.website })) };
        } catch {
          r = {};
        }
        // お金は、3〜9月か、まだお金の情報がない病院だけ。読めなかった病院も、取得日だけ記録する（毎日、同じ病院を試さないため）
        if (!(moneySeason || !h.has_money)) for (const k of MONEY_KEYS) delete r[k];
        if (r.monthly_min || r.annual_stated_min) withMoney++;
        rows.push({ ...r, hospital_id: h.id });
      }
    })
  );

  let saved = 0;
  for (let i = 0; i < rows.length; i += 100) {
    const { data, error: saveError } = await supabase.rpc("ingest_hospital_recruit", { p_token: secret, p_rows: rows.slice(i, i + 100) });
    if (saveError) return Response.json({ error: saveError.message }, { status: 500 });
    saved += Number(data ?? 0);
  }

  return Response.json({ targets: list.length, scanned: rows.length, withMoney, saved, moneySeason });
}
