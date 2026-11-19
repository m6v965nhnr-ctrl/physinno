import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { supabasePublic } from "@/lib/supabasePublic";
import { listReviewedHospitals } from "@/lib/kuchikomi";

// 職場口コミサイト（/kuchikomi）の施設ページのサイトマップ（/kuchikomi/sitemap/0.xml 〜）。
// 施設ページは、全施設（約14.6万件）が検索の対象（noindex にしない）。1ファイルは5万件までなので、種類ごとに4つに分ける。
// 口コミのある施設は、0番に入れる（更新が新しいことを伝える）。種類を足すときは、1ファイルが5万件を超えないように CHUNKS に足す。
// 注意: robots.ts の kuchikomi のサイトマップ一覧は、CHUNKS の数に合わせて書いている。
export const revalidate = 86400;
export const maxDuration = 60;

// [分類, 種類]。種類が null は「病院」（facility_type が空）。分類と種類の両方で絞ると、索引（facility_category, facility_type, name）が使え、ゲスト用の3秒の制限に収まる
type Kind = [string, string | null];
const CHUNKS: Kind[][] = [
  [
    ["病院・医療機関", null],
    ["介護・高齢者福祉施設", "介護老人保健施設（老健）"],
    ["訪問・在宅分野", "訪問リハビリテーション事業所"],
    ["介護・高齢者福祉施設", "デイケア"],
    ["介護・高齢者福祉施設", "介護医療院"],
    ["小児・障害福祉分野", "障害者支援施設"],
    ["小児・障害福祉分野", "重症心身障害児・者施設"],
    ["訪問・在宅分野", "訪問看護ステーション"],
  ],
  [
    ["病院・医療機関", "クリニック・診療所"],
    ["介護・高齢者福祉施設", "特別養護老人ホーム（特養）"],
    ["介護・高齢者福祉施設", "有料老人ホーム"],
    ["小児・障害福祉分野", "障害福祉サービス事業所"],
  ],
  [
    ["小児・障害福祉分野", "児童発達支援事業所"],
    ["小児・障害福祉分野", "放課後等デイサービス"],
  ],
  [["介護・高齢者福祉施設", "デイサービス"]],
];

export async function generateSitemaps() {
  return CHUNKS.map((_, id) => ({ id }));
}

type Row = { id: string; created_at: string | null };

async function listType([category, type]: Kind): Promise<Row[]> {
  const out: Row[] = [];
  // 深いページを OFFSET で取ると、匿名ロールの3秒の制限を超える（約3万件目で3.6秒）。id の続きから取る
  let last: string | null = null;
  for (let n = 0; n < 60; n++) {
    let q = supabasePublic.from("hospitals").select("id, created_at").eq("facility_category", category);
    q = type === null ? q.is("facility_type", null) : q.eq("facility_type", type);
    if (last) q = q.gt("id", last);
    const { data, error } = await q.order("id").limit(1000);
    if (error) throw new Error(`sitemap: ${category}/${type}: ${error.message}`); // 一部が欠けた形で出さない（再生成のときに、やり直す）
    if (!data || data.length === 0) break;
    out.push(...(data as Row[]));
    if (data.length < 1000) break;
    last = (data[data.length - 1] as Row).id;
  }
  return out;
}

export default async function sitemap(props: { id: Promise<string> }): Promise<MetadataRoute.Sitemap> {
  const id = Number(await props.id);
  const kinds = CHUNKS[id];
  if (!kinds) return [];
  const ids = new Map<string, Date>();

  // 口コミのある施設は、0番に入れる
  if (id === 0) for (const h of await listReviewedHospitals(1000)) ids.set(h.id, h.last_at ? new Date(h.last_at) : new Date());

  // 種類ごとに、同時に取る（時間を短くする）
  const lists = await Promise.all(kinds.map(listType));
  for (const rows of lists) for (const r of rows) if (!ids.has(r.id)) ids.set(r.id, r.created_at ? new Date(r.created_at) : new Date());

  return [...ids].map(([hid, last]) => ({
    url: `${SITE_URL}/kuchikomi/${hid}`,
    lastModified: last,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));
}
