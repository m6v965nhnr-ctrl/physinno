import { createClient } from "@supabase/supabase-js";
import {
  UGOITA_PRODUCTS_URL,
  Seminar,
  parseUgoita,
} from "../../../../../supabase/functions/sync-seminars/parsers";

// ウゴイタラボ（pro.ugoitalab.com）のセミナー一覧（公開されている商品情報）を取り込む。
// Vercel Cron（vercel.json）から毎日 0:10（JST）頃に呼び出す。
// 認証: Vercel Cron が付ける Authorization: Bearer $CRON_SECRET

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const UA = "Mozilla/5.0 (compatible; RelightSeminarSync/1.0)";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;

  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const today = new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 10);
  const rows = new Map<string, Seminar>();
  const errors: string[] = [];

  for (let page = 1; page <= 4; page++) {
    try {
      const res = await fetch(`${UGOITA_PRODUCTS_URL}?limit=250&page=${page}`, {
        headers: { "User-Agent": UA, "Accept-Language": "ja" },
        signal: AbortSignal.timeout(15000),
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = (await res.json()) as { products?: unknown[] };
      const products = json.products ?? [];
      if (products.length === 0) break;
      for (const r of parseUgoita(products as Parameters<typeof parseUgoita>[0], today)) rows.set(r.id, r);
      if (products.length < 250) break;
    } catch (e) {
      errors.push(`page ${page}: ${String(e)}`);
      break;
    }
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  );

  const { data, error } = await supabase.rpc("ingest_seminars", {
    p_token: secret,
    p_rows: [...rows.values()],
  });

  if (error) {
    return Response.json({ error: error.message, errors }, { status: 500 });
  }

  return Response.json({ saved: data, fetched: rows.size, errors });
}
