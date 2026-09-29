import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { supabasePublic } from "@/lib/supabasePublic";
import { COLUMNS } from "@/lib/columns";

// 1時間ごとに再生成する（新しく登録されたPTのプロフィールもそのうち反映される）
export const revalidate = 3600;

const MAX_PROFILES = 5000;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/pts`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/register`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/columns`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
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

  return [...staticEntries, ...columnEntries, ...ptEntries];
}
