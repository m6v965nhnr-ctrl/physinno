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
  created_by: string | null;
  // 病院側が自分でこのページを運営したい場合、将来的にここへ本人のuser_idを
  // 紐付ける想定（今回はスキーマのみ用意。実際の運営申請フローは未実装）
  claimed_by: string | null;
  // 厚労省オープンデータから一括登録した病院には出典を記録する
  // （公共データ利用規約PDL1.0の出典明記・加工表示の義務に対応）
  data_source: string | null;
  data_source_note: string | null;
  created_at: string;
};

export type DiseaseRatio = {
  id: string;
  hospital_id: string;
  category: string;
  percentage: number;
};

export type HospitalReview = {
  id: string;
  hospital_id: string;
  user_id: string;
  rating: number;
  comment: string | null;
  is_anonymous: boolean;
  created_at: string;
};

export async function searchHospitals({
  keyword,
  prefecture,
  size,
}: {
  keyword?: string;
  prefecture?: string;
  size?: WorkplaceSize;
}): Promise<Hospital[]> {
  let query = supabase.from("hospitals").select("*").order("name");

  // 正式名称（例：「公益社団法人〇〇　△△病院」）で登録されているため、
  // 一般的に呼ばれる名前の一部でも見つかるよう部分一致で検索する
  if (keyword) query = query.ilike("name", `%${keyword}%`);
  if (prefecture) query = query.ilike("prefecture", `%${prefecture}%`);
  if (size) query = query.eq("size", size);

  const { data } = await query.limit(100);
  return data ?? [];
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
  const { data } = await supabase
    .from("hospital_reviews")
    .select("*")
    .eq("hospital_id", hospitalId)
    .order("created_at", { ascending: false });

  return data ?? [];
}

// 1人のPTにつき1病院1件まで（既にあれば上書き更新）
export async function upsertHospitalReview({
  hospitalId,
  userId,
  rating,
  comment,
  isAnonymous,
}: {
  hospitalId: string;
  userId: string;
  rating: number;
  comment?: string;
  isAnonymous: boolean;
}): Promise<string | null> {
  const { error } = await supabase.from("hospital_reviews").upsert(
    {
      hospital_id: hospitalId,
      user_id: userId,
      rating,
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
