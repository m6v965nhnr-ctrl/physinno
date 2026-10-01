import { supabase } from "@/lib/supabase";
import type { PtProfile } from "@/lib/types";

// 「病院」専用のテーブルは無く、PTが登録している勤務先(workplace)の
// 自由入力テキストを集約して一覧化している。表記ゆれ（「〇〇病院」と
// 「〇〇病院 リハビリ科」等）はそのまま別の病院として数えられる点に注意。
export type WorkplaceSize = "small" | "medium" | "large";

export const WORKPLACE_SIZE_LABEL: Record<WorkplaceSize, string> = {
  small: "小規模（〜50床目安）",
  medium: "中規模（50〜300床目安）",
  large: "大規模（300床以上目安）",
};

export type HospitalGroup = {
  workplace: string;
  prefecture: string | null;
  city: string | null;
  size: string | null;
  ptCount: number;
};

export async function searchHospitals({
  prefecture,
  size,
}: {
  prefecture?: string;
  size?: WorkplaceSize;
}): Promise<HospitalGroup[]> {
  let query = supabase
    .from("pt_profiles")
    .select("workplace, prefecture, city, workplace_size")
    .not("workplace", "is", null)
    .neq("workplace", "");

  if (prefecture) query = query.ilike("prefecture", `%${prefecture}%`);
  if (size) query = query.eq("workplace_size", size);

  const { data } = await query.limit(500);
  if (!data) return [];

  const map = new Map<string, HospitalGroup>();

  for (const row of data) {
    const workplace = (row.workplace ?? "").trim();
    if (!workplace) continue;

    const existing = map.get(workplace);
    if (existing) {
      existing.ptCount += 1;
      if (!existing.prefecture) existing.prefecture = row.prefecture;
      if (!existing.city) existing.city = row.city;
      if (!existing.size) existing.size = row.workplace_size;
    } else {
      map.set(workplace, {
        workplace,
        prefecture: row.prefecture,
        city: row.city,
        size: row.workplace_size,
        ptCount: 1,
      });
    }
  }

  return [...map.values()].sort((a, b) => b.ptCount - a.ptCount);
}

export async function listPtsByWorkplace(workplace: string): Promise<PtProfile[]> {
  const { data } = await supabase
    .from("pt_profiles")
    .select("*")
    .eq("workplace", workplace)
    .order("rating", { ascending: false, nullsFirst: false });

  return data ?? [];
}
