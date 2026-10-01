import { supabase } from "@/lib/supabase";

export type MedicalHistoryEntry = {
  id: string;
  user_id: string;
  condition_name: string;
  memo: string | null;
  is_public: boolean;
  created_at: string;
};

// 本人の病歴・持病を一覧取得（本人なら公開/非公開問わず全件見える）
export async function listMyMedicalHistory(
  userId: string
): Promise<MedicalHistoryEntry[]> {
  const { data } = await supabase
    .from("medical_history")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return data ?? [];
}

// 他人の病歴・持病を取得（RLSにより、公開設定かつ閲覧者がPTアカウントの場合のみ返る）
export async function listPublicMedicalHistory(
  userId: string
): Promise<MedicalHistoryEntry[]> {
  const { data } = await supabase
    .from("medical_history")
    .select("*")
    .eq("user_id", userId)
    .eq("is_public", true)
    .order("created_at", { ascending: false });

  return data ?? [];
}

export async function addMedicalHistory({
  userId,
  conditionName,
  memo,
  isPublic,
}: {
  userId: string;
  conditionName: string;
  memo?: string;
  isPublic: boolean;
}): Promise<string | null> {
  const { error } = await supabase.from("medical_history").insert({
    user_id: userId,
    condition_name: conditionName,
    memo: memo?.trim() || null,
    is_public: isPublic,
  });

  return error ? error.message : null;
}

export async function deleteMedicalHistory(id: string): Promise<string | null> {
  const { error } = await supabase.from("medical_history").delete().eq("id", id);
  return error ? error.message : null;
}
