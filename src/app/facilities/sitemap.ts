import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { supabasePublic } from "@/lib/supabasePublic";

// 病院・クリニック（facility_category='病院・医療機関'）は、ルートのsitemap.tsに入っている。
// それ以外の「PTが働く施設」（介護・高齢者福祉、小児・障害福祉、訪問・在宅。合計約13万件）は、
// Googleの1ファイルあたり5万URLの上限があるため、generateSitemapsで分割した、別のサイトマップにする。
export const revalidate = 3600;

const CHUNK_SIZE = 40000;
// 無料プランのCPU上限を超えて一時停止した(2026-11-06)ため、一旦は件数を絞って様子を見る。
// 問題なければ、少しずつ増やしていく(本来の全件は160000)。robots.tsのsitemap一覧も、
// チャンク数が変わるたびに合わせて直すこと。
const MAX_FACILITIES = 10000;

async function countNonMedicalFacilities() {
  const { count } = await supabasePublic
    .from("hospitals")
    .select("id", { count: "exact", head: true })
    .neq("facility_category", "病院・医療機関");
  return count ?? 0;
}

export async function generateSitemaps() {
  const total = await countNonMedicalFacilities();
  const chunks = Math.max(1, Math.ceil(Math.min(total, MAX_FACILITIES) / CHUNK_SIZE));
  return Array.from({ length: chunks }, (_, id) => ({ id }));
}

// idで絞り込んで1000件ずつ読み進める（OFFSETは深いページほどDBが遅くなり、
// 本番で「canceling statement due to statement timeout」になったため使わない）
async function fetchPage(afterId: string | null) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    let query = supabasePublic.from("hospitals").select("id, created_at").neq("facility_category", "病院・医療機関").order("id").limit(1000);
    if (afterId) query = query.gt("id", afterId);
    const { data, error } = await query;
    if (!error) return data;
    if (attempt === 3) throw new Error(`facilities sitemap fetch failed: ${error.message}`);
    await new Promise((r) => setTimeout(r, attempt * 500));
  }
  return null;
}

export default async function sitemap({ id }: { id: Promise<string> }): Promise<MetadataRoute.Sitemap> {
  const chunkId = Number(await id);
  const start = chunkId * CHUNK_SIZE;
  const end = Math.min(start + CHUNK_SIZE, MAX_FACILITIES);

  // 自分のチャンクより前の分も、同じidの並びで読み進める必要がある(前のチャンクの終点が分からないため)
  let afterId: string | null = null;
  let seen = 0;
  const rows: { id: string; created_at: string | null }[] = [];

  while (seen < end) {
    const page = await fetchPage(afterId);
    if (!page || page.length === 0) break;
    for (const row of page) {
      if (seen >= start && seen < end) rows.push(row);
      seen++;
    }
    afterId = page[page.length - 1].id;
    if (page.length < 1000) break;
  }

  return rows.map((h) => ({
    url: `${SITE_URL}/hospitals/${h.id}`,
    lastModified: h.created_at ? new Date(h.created_at) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.4,
  }));
}
