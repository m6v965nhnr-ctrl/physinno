import { createClient } from "@supabase/supabase-js";
import {
  JPTA_SEARCH_URL,
  Seminar,
  jptaFormFields,
  parseJptaSearch,
} from "../../../../../supabase/functions/sync-seminars/parsers";

// 日本理学療法士協会（マイページ）のセミナー検索結果を取り込む。
// Supabase Edge Function からは mypage.japanpt.or.jp へTLS接続できないため、
// Vercel Cron（vercel.json）から毎日 0:00（JST）に呼び出す。
// 認証: Vercel Cron が付ける Authorization: Bearer $CRON_SECRET

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const UA = "Mozilla/5.0 (compatible; RelightSeminarSync/1.0)";

async function searchWindow(st: string, ed: string) {
  const first = await fetch(JPTA_SEARCH_URL, {
    headers: { "User-Agent": UA, "Accept-Language": "ja" },
    cache: "no-store",
  });
  const html = await first.text();
  const cookie = first.headers
    .getSetCookie()
    .map((c) => c.split(";")[0])
    .join("; ");

  const override: Record<string, string> = {
    "Seminar[ymd_open_st]": st,
    "Seminar[ymd_open_ed]": ed,
    "Seminar[isDetailVisible]": "1",
  };

  const body = new URLSearchParams();

  for (const [k, v] of jptaFormFields(html)) {
    if (
      k in override ||
      k === "Seminar[type_search]" ||
      k === "Seminar[type_search][]" ||
      k === "action"
    ) {
      continue;
    }
    body.append(k, v);
  }

  for (const [k, v] of Object.entries(override)) body.append(k, v);
  body.append("Seminar[type_search]", "");
  body.append("Seminar[type_search][]", "0");
  body.append("Seminar[type_search][]", "1"); // 申込条件外・満員も含める
  body.append("action", "next");

  const res = await fetch(JPTA_SEARCH_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: cookie,
      "User-Agent": UA,
    },
    body: body.toString(),
    cache: "no-store",
  });

  return parseJptaSearch(await res.text());
}

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;

  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const now = new Date(Date.now() + 9 * 3600 * 1000);
  const iso = (d: Date) => d.toISOString().slice(0, 10);
  const today = iso(now);

  const rows = new Map<string, Seminar>();
  const errors: string[] = [];

  // 3か月ごとの窓で8回（約2年分）
  for (let q = 0; q < 8; q++) {
    const st = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + q * 3, q === 0 ? now.getUTCDate() : 1)
    );
    const ed = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + (q + 1) * 3, 0)
    );

    try {
      for (const r of await searchWindow(iso(st), iso(ed))) {
        if (r.end_date >= today) rows.set(r.id, r);
      }
    } catch (e) {
      errors.push(`${iso(st)}: ${String(e)}`);
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
