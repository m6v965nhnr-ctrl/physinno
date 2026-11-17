import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { supabasePublic } from "@/lib/supabasePublic";
import { listReviewedHospitals } from "@/lib/kuchikomi";

// 職場口コミサイト（/kuchikomi）の施設ページのサイトマップ（/kuchikomi/sitemap.xml）。
// 施設ページは、全施設（約14.6万件）が検索の対象（noindex にしない）。ただし、検索エンジンへの案内（サイトマップ）は、
// Vercel無料枠の使用量を抑えるため、段階的に広げる。第2段階: 病院・老健・訪問リハ・デイケア・介護医療院・障害者支援施設・重症心身障害児者施設（約2万件）と、口コミが付いた施設。
// 広げるときは、SITEMAP_TYPES に種類を足す（1ファイルは5万件まで。それを超えたら generateSitemaps で分割する）。
export const revalidate = 86400;
export const maxDuration = 60;

// [分類, 種類]。種類が null は「病院」（facility_type が空）。分類と種類の両方で絞ると、索引（facility_category, facility_type, name）が使え、ゲスト用の3秒の制限に収まる
const SITEMAP_TYPES: [string, string | null][] = [
  ["病院・医療機関", null],
  ["介護・高齢者福祉施設", "介護老人保健施設（老健）"],
  ["訪問・在宅分野", "訪問リハビリテーション事業所"],
  ["介護・高齢者福祉施設", "デイケア"],
  ["介護・高齢者福祉施設", "介護医療院"],
  ["小児・障害福祉分野", "障害者支援施設"],
  ["小児・障害福祉分野", "重症心身障害児・者施設"],
];

type Row = { id: string; created_at: string | null };

async function listType([category, type]: [string, string | null]): Promise<Row[]> {
  const out: Row[] = [];
  // APIの1回の上限(1,000件)を超えるので、ページを分けて取る
  for (let from = 0; from < 8000; from += 1000) {
    let q = supabasePublic.from("hospitals").select("id, created_at").eq("facility_category", category);
    q = type === null ? q.is("facility_type", null) : q.eq("facility_type", type);
    const { data, error } = await q.order("name").order("id").range(from, from + 999);
    if (error) throw new Error(`sitemap: ${category}/${type}: ${error.message}`); // 一部が欠けた形で出さない（再生成のときに、やり直す）
    if (!data || data.length === 0) break;
    out.push(...(data as Row[]));
    if (data.length < 1000) break;
  }
  return out;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const ids = new Map<string, Date>();

  // 口コミのある施設（更新が新しいことを伝える）
  for (const h of await listReviewedHospitals(1000)) ids.set(h.id, h.last_at ? new Date(h.last_at) : new Date());

  // 種類ごとに、同時に取る（時間を短くする）
  const lists = await Promise.all(SITEMAP_TYPES.map(listType));
  for (const rows of lists) for (const r of rows) if (!ids.has(r.id)) ids.set(r.id, r.created_at ? new Date(r.created_at) : new Date());

  return [...ids].map(([id, last]) => ({
    url: `${SITE_URL}/kuchikomi/${id}`,
    lastModified: last,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));
}
