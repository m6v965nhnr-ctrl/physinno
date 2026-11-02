import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { supabasePublic } from "@/lib/supabasePublic";

// 病院・クリニック（facility_category='病院・医療機関'）は、ルートのsitemap.tsに入っている。
// それ以外の「PTが働く施設」（介護・高齢者福祉、小児・障害福祉、訪問・在宅。合計約13万件）は、
// Googleの1ファイルあたり5万URLの上限があるため、generateSitemapsで分割した、別のサイトマップにする。
export const revalidate = 3600;

const CHUNK_SIZE = 40000;
const MAX_FACILITIES = 160000;

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

export default async function sitemap({ id }: { id: Promise<string> }): Promise<MetadataRoute.Sitemap> {
  const chunkId = Number(await id);
  const start = chunkId * CHUNK_SIZE;
  const end = Math.min(start + CHUNK_SIZE, MAX_FACILITIES);

  const rows: { id: string; created_at: string | null }[] = [];
  for (let from = start; from < end; from += 1000) {
    const { data } = await supabasePublic
      .from("hospitals")
      .select("id, created_at")
      .neq("facility_category", "病院・医療機関")
      .order("id")
      .range(from, Math.min(from + 999, end - 1));
    if (!data || data.length === 0) break;
    rows.push(...data);
    if (data.length < 1000) break;
  }

  return rows.map((h) => ({
    url: `${SITE_URL}/hospitals/${h.id}`,
    lastModified: h.created_at ? new Date(h.created_at) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.4,
  }));
}
