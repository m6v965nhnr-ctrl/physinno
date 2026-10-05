import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { supabasePublic } from "@/lib/supabasePublic";
import { COLUMNS } from "@/lib/columns";

// 1時間ごとに再生成する（新しく登録されたPTのプロフィールもそのうち反映される）
export const revalidate = 3600;

const MAX_PROFILES = 5000;
const MAX_HOSPITALS = 20000;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/pts`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/register`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/columns`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const columnEntries: MetadataRoute.Sitemap = COLUMNS.map((c) => ({
    url: `${SITE_URL}/columns/${c.slug}`,
    lastModified: new Date(c.updatedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const { data: pts } = await supabasePublic
    .from("pt_profiles")
    .select("id, updated_at")
    .order("updated_at", { ascending: false })
    .limit(MAX_PROFILES);

  const ptEntries: MetadataRoute.Sitemap = (pts || []).map((pt) => ({
    url: `${SITE_URL}/pts/${pt.id}`,
    lastModified: pt.updated_at ? new Date(pt.updated_at) : now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  // 病院ページ（厚労省オープンデータ由来を含む約5,000件）も検索から見つけてもらえるようにする
  // APIの1回あたりの取得上限(1,000件)を超えるため、ページを分けて取得する
  const hospitals: { id: string; created_at: string | null }[] = [];
  for (let from = 0; from < MAX_HOSPITALS; from += 1000) {
    const { data } = await supabasePublic
      .from("hospitals")
      .select("id, created_at")
      .order("created_at", { ascending: false })
      .order("id")
      .range(from, from + 999);
    if (!data || data.length === 0) break;
    hospitals.push(...data);
    if (data.length < 1000) break;
  }

  const hospitalEntries: MetadataRoute.Sitemap = hospitals.map((h) => ({
    url: `${SITE_URL}/hospitals/${h.id}`,
    lastModified: h.created_at ? new Date(h.created_at) : now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticEntries, ...columnEntries, ...ptEntries, ...hospitalEntries];
}
