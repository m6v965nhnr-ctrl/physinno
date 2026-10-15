import { createClient } from "@supabase/supabase-js";
import { LinkStatus, probeSite } from "@/lib/server/hospitalWeb";

// 病院の公式サイトのリンクが、いまも開けるかを調べる。毎日、いちばん長く調べていない病院から約170件（全体で約1か月に1周）。
// 「見つかりません」の病院は、画面でリンクを出さない（website_status = dead）。Vercel Cron（vercel.json）から呼ぶ。
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const BATCH = 170;
const CONCURRENCY = 40;

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    auth: { persistSession: false },
  });

  const { data: targets, error } = await supabase.rpc("next_hospital_checks", { p_token: secret, p_limit: BATCH });
  if (error) return Response.json({ error: error.message }, { status: 500 });

  const list = (targets ?? []) as { id: string; website: string }[];
  const results: { id: string; status: LinkStatus }[] = [];
  let next = 0;

  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (next < list.length) {
        const h = list[next++];
        results.push({ id: h.id, status: await probeSite(h.website) });
      }
    })
  );

  const { error: saveError } = await supabase.rpc("record_hospital_links", { p_token: secret, p_rows: results });
  if (saveError) return Response.json({ error: saveError.message }, { status: 500 });

  return Response.json({ checked: results.length, dead: results.filter((r) => r.status === "dead").length });
}
