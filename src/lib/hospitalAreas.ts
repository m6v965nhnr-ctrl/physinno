import { supabasePublic } from "@/lib/supabasePublic";

export const HOSPITAL_DATA_NOTE = "出典：厚生労働省 医療情報ネット オープンデータ（2024年12月1日時点・一部は2025年12月1日時点、公共データ利用規約PDL1.0）を加工して作成";

// 都道府県ごとの病院数。1回の取得は1,000件までなので、ページを分けて数える
export async function countHospitalsByPrefecture(): Promise<Record<string, number>> {
  const counts: Record<string, number> = {};
  for (let from = 0; from < 10000; from += 1000) {
    // このページは「リハビリテーション科のある病院」の一覧なので、介護施設などは数えない
    const { data } = await supabasePublic.from("hospitals").select("prefecture").eq("facility_category", "病院・医療機関").order("id").range(from, from + 999);
    if (!data || data.length === 0) break;
    for (const r of data) if (r.prefecture) counts[r.prefecture] = (counts[r.prefecture] ?? 0) + 1;
    if (data.length < 1000) break;
  }
  return counts;
}

export type AreaHospital = { id: string; name: string; city: string | null; beds_total: number | null };

export async function listHospitalsInPrefecture(pref: string): Promise<AreaHospital[]> {
  const { data } = await supabasePublic
    .from("hospitals")
    .select("id, name, city, beds_total")
    .eq("facility_category", "病院・医療機関")
    .eq("prefecture", pref)
    .order("city")
    .order("name")
    .limit(1000);
  return (data as AreaHospital[] | null) ?? [];
}
