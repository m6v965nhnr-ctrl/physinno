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
  size: string | null;
  created_by: string | null;
  created_at: string;
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
  prefecture,
  size,
}: {
  prefecture?: string;
  size?: WorkplaceSize;
}): Promise<Hospital[]> {
  let query = supabase.from("hospitals").select("*").order("name");

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
  size,
  createdBy,
}: {
  name: string;
  prefecture?: string;
  city?: string;
  address?: string;
  phone?: string;
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
