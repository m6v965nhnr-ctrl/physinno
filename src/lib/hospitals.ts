import { supabase } from "@/lib/supabase";
import type { PtProfile } from "@/lib/types";

export type WorkplaceSize = "small" | "medium" | "large";

export const WORKPLACE_SIZE_LABEL: Record<WorkplaceSize, string> = {
  small: "小規模（〜50床目安）",
  medium: "中規模（50〜300床目安）",
  large: "大規模（300床以上目安）",
};

export type Hospital = {
  id: string;
  name: string;
  prefecture: string | null;
  city: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  size: string | null;
  // 採用情報は自動収集せず、在籍PTが手入力する前提のフリーテキスト
  recruitment_info: string | null;
  created_by: string | null;
  // 病院側が自分でこのページを運営したい場合、将来的にここへ本人のuser_idを
  // 紐付ける想定（今回はスキーマのみ用意。実際の運営申請フローは未実装）
  claimed_by: string | null;
  // 厚労省オープンデータから一括登録した病院には出典を記録する
  // （公共データ利用規約PDL1.0の出典明記・加工表示の義務に対応）
  data_source: string | null;
  data_source_note: string | null;
  // 厚労省オープンデータの診療科・病床数(学生の病院探し用)。未取得の病院は null
  departments: string[] | null;
  beds_general: number | null;
  beds_long_term: number | null;
  beds_psychiatric: number | null;
  beds_total: number | null;
  created_at: string;
};

export type BedType = "general" | "long_term" | "psychiatric";

export const BED_TYPE_LABEL: Record<BedType, string> = {
  general: "一般病床あり（急性期・回復期など）",
  long_term: "療養病床あり（長期療養・生活期）",
  psychiatric: "精神病床あり",
};

// 病院探しで絞り込みに使う診療科(PTの就職・実習で関わりが多いもの)
export const DEPARTMENT_FILTERS = [
  "整形外科",
  "脳神経外科",
  "神経内科",
  "リハビリテーション科",
  "循環器内科",
  "呼吸器内科",
  "小児科",
  "精神科",
  "リウマチ科",
  "救急科",
];

// 診療科・病床のデータが取り込まれているか(未取得のうちは絞り込み欄を出さない)
export async function hasHospitalDetailData(): Promise<boolean> {
  const { count } = await supabase
    .from("hospitals")
    .select("id", { count: "exact", head: true })
    .not("departments", "is", null)
    .limit(1);

  return (count ?? 0) > 0;
}

export type DiseaseRatio = {
  id: string;
  hospital_id: string;
  category: string;
  percentage: number;
};

export const REVIEW_AXES = [
  "work_environment",
  "education_system",
  "salary",
  "overtime",
  "paid_leave",
  "openness",
] as const;

export type ReviewAxis = (typeof REVIEW_AXES)[number];

export const REVIEW_AXIS_LABEL: Record<ReviewAxis, string> = {
  work_environment: "職場環境",
  education_system: "教育体制",
  salary: "給与",
  overtime: "残業の少なさ",
  paid_leave: "有休消化率",
  openness: "風通しの良さ",
};

// 投稿者(user_id)は匿名・記名にかかわらずクライアントへ返さない。
// 自分の口コミかどうかだけ is_mine で分かる
export type HospitalReview = {
  id: string;
  hospital_id: string;
  is_mine: boolean;
  work_environment: number;
  education_system: number;
  salary: number;
  overtime: number;
  paid_leave: number;
  openness: number;
  overall_score: number;
  comment: string | null;
  is_anonymous: boolean;
  created_at: string;
};

export async function searchHospitals({
  keyword,
  prefecture,
  city,
  size,
  departments,
  bedType,
}: {
  keyword?: string;
  prefecture?: string;
  city?: string;
  size?: WorkplaceSize;
  departments?: string[];
  bedType?: BedType;
}): Promise<Hospital[]> {
  let query = supabase.from("hospitals").select("*").order("name");

  // 正式名称（例：「公益社団法人〇〇　△△病院」）で登録されているため、
  // 一般的に呼ばれる名前の一部でも見つかるよう部分一致で検索する
  if (keyword) query = query.ilike("name", `%${keyword}%`);
  if (prefecture) query = query.ilike("prefecture", `%${prefecture}%`);
  if (city) query = query.ilike("city", `%${city}%`);
  if (size) query = query.eq("size", size);
  if (departments && departments.length > 0) query = query.contains("departments", departments);
  if (bedType === "general") query = query.gt("beds_general", 0);
  if (bedType === "long_term") query = query.gt("beds_long_term", 0);
  if (bedType === "psychiatric") query = query.gt("beds_psychiatric", 0);

  const { data } = await query.limit(100);
  return data ?? [];
}

// 選択された都道府県に実在する市区町村だけをプルダウンに出すため、
// 病院データから distinct な city を取得する
export async function listCitiesByPrefecture(
  prefecture: string
): Promise<string[]> {
  const { data } = await supabase
    .from("hospitals")
    .select("city")
    .ilike("prefecture", `%${prefecture}%`)
    .not("city", "is", null);

  const cities = new Set<string>();
  (data ?? []).forEach((row) => {
    if (row.city) cities.add(row.city);
  });

  return Array.from(cities).sort((a, b) => a.localeCompare(b, "ja"));
}

export async function getHospital(id: string): Promise<Hospital | null> {
  const { data } = await supabase
    .from("hospitals")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  return data ?? null;
}

export async function createHospital({
  name,
  prefecture,
  city,
  address,
  phone,
  email,
  website,
  size,
  createdBy,
}: {
  name: string;
  prefecture?: string;
  city?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  size?: WorkplaceSize;
  createdBy: string;
}): Promise<{ hospital: Hospital | null; error: string | null }> {
  const { data, error } = await supabase
    .from("hospitals")
    .insert({
      name: name.trim(),
      prefecture: prefecture?.trim() || null,
      city: city?.trim() || null,
      address: address?.trim() || null,
      phone: phone?.trim() || null,
      email: email?.trim() || null,
      website: website?.trim() || null,
      size: size || null,
      created_by: createdBy,
    })
    .select()
    .single();

  return { hospital: data ?? null, error: error?.message ?? null };
}

export async function listPtsByHospital(hospitalId: string): Promise<PtProfile[]> {
  const { data } = await supabase
    .from("pt_profiles")
    .select("*")
    .eq("hospital_id", hospitalId)
    .eq("is_student", false)
    .order("rating", { ascending: false, nullsFirst: false });

  return data ?? [];
}

export async function getFollowerCount(hospitalId: string): Promise<number> {
  const { count } = await supabase
    .from("hospital_follows")
    .select("*", { count: "exact", head: true })
    .eq("hospital_id", hospitalId);

  return count ?? 0;
}

export async function isFollowingHospital(
  hospitalId: string,
  userId: string
): Promise<boolean> {
  const { data } = await supabase
    .from("hospital_follows")
    .select("id")
    .eq("hospital_id", hospitalId)
    .eq("user_id", userId)
    .maybeSingle();

  return Boolean(data);
}

export async function followHospital(
  hospitalId: string,
  userId: string
): Promise<string | null> {
  const { error } = await supabase
    .from("hospital_follows")
    .insert({ hospital_id: hospitalId, user_id: userId });

  return error ? error.message : null;
}

export async function unfollowHospital(
  hospitalId: string,
  userId: string
): Promise<string | null> {
  const { error } = await supabase
    .from("hospital_follows")
    .delete()
    .eq("hospital_id", hospitalId)
    .eq("user_id", userId);

  return error ? error.message : null;
}

export async function listHospitalReviews(
  hospitalId: string
): Promise<HospitalReview[]> {
  const { data } = await supabase.rpc("get_hospital_reviews", {
    p_hospital_id: hospitalId,
  });

  return (data ?? []) as HospitalReview[];
}

// 1人のPTにつき1病院1件まで（既にあれば上書き更新）
export async function upsertHospitalReview({
  hospitalId,
  userId,
  scores,
  overallScore,
  comment,
  isAnonymous,
}: {
  hospitalId: string;
  userId: string;
  scores: Record<ReviewAxis, number>;
  overallScore: number;
  comment?: string;
  isAnonymous: boolean;
}): Promise<string | null> {
  const { error } = await supabase.from("hospital_reviews").upsert(
    {
      hospital_id: hospitalId,
      user_id: userId,
      ...scores,
      overall_score: overallScore,
      comment: comment?.trim() || null,
      is_anonymous: isAnonymous,
    },
    { onConflict: "hospital_id,user_id" }
  );

  return error ? error.message : null;
}

export async function listDiseaseRatios(hospitalId: string): Promise<DiseaseRatio[]> {
  const { data } = await supabase
    .from("hospital_disease_ratios")
    .select("*")
    .eq("hospital_id", hospitalId);

  return data ?? [];
}

// 在籍PT（またはこのページの作成者・運営者）のみ編集できる。HPのスクレイピング
// ではなく、カテゴリごとの比率を手入力してもらう前提
export async function setDiseaseRatios(
  hospitalId: string,
  userId: string,
  ratios: { category: string; percentage: number }[]
): Promise<string | null> {
  const { error } = await supabase.from("hospital_disease_ratios").upsert(
    ratios.map((r) => ({
      hospital_id: hospitalId,
      category: r.category,
      percentage: r.percentage,
      updated_by: userId,
    })),
    { onConflict: "hospital_id,category" }
  );

  return error ? error.message : null;
}

// 採用情報は自動スクレイピングではなく、在籍PT（または作成者・運営者）が
// 手入力する前提のフリーテキスト
export async function updateRecruitmentInfo(
  hospitalId: string,
  recruitmentInfo: string
): Promise<string | null> {
  const { error } = await supabase
    .from("hospitals")
    .update({ recruitment_info: recruitmentInfo.trim() || null })
    .eq("id", hospitalId);

  return error ? error.message : null;
}

export async function canEditHospitalData(
  hospitalId: string,
  userId: string
): Promise<boolean> {
  const [{ data: staffRow }, { data: hospitalRow }] = await Promise.all([
    supabase
      .from("pt_profiles")
      .select("id")
      .eq("user_id", userId)
      .eq("hospital_id", hospitalId)
      .maybeSingle(),
    supabase
      .from("hospitals")
      .select("created_by, claimed_by")
      .eq("id", hospitalId)
      .maybeSingle(),
  ]);

  if (staffRow) return true;
  if (!hospitalRow) return false;

  return hospitalRow.created_by === userId || hospitalRow.claimed_by === userId;
}
