import { supabase } from "@/lib/supabase";
import type { PracticumType } from "@/lib/student";

// 実習先の口コミ(実習生の声)。投稿者は表示しない。読めるのは PT と学生のみ

export const INTERNSHIP_AXES = ["guidance", "workload", "sleep", "access", "learning", "atmosphere"] as const;
export type InternshipAxis = (typeof INTERNSHIP_AXES)[number];

// どれも「高いほど良い」向きの点数(課題は「少ない・軽い」ほど高い)
export const INTERNSHIP_AXIS_LABEL: Record<InternshipAxis, string> = {
  guidance: "指導の雰囲気",
  workload: "課題の少なさ",
  sleep: "睡眠時間の確保",
  access: "通いやすさ",
  learning: "学べる内容",
  atmosphere: "病院の雰囲気",
};

export type InternshipReview = {
  id: string;
  practicum_type: PracticumType;
  practicum_year: number | null;
  guidance: number;
  workload: number;
  sleep: number;
  access: number;
  learning: number;
  atmosphere: number;
  comment: string | null;
  created_at: string;
  is_mine: boolean;
};

export async function listInternshipReviews(hospitalId: string): Promise<InternshipReview[]> {
  const { data } = await supabase.rpc("get_internship_reviews", { p_hospital_id: hospitalId });
  return (data || []) as InternshipReview[];
}

export async function internshipReviewCounts(hospitalIds: string[]): Promise<Record<string, number>> {
  if (hospitalIds.length === 0) return {};

  const { data } = await supabase.rpc("internship_review_counts", { p_ids: hospitalIds });
  const counts: Record<string, number> = {};
  for (const row of (data || []) as { hospital_id: string; review_count: number | string }[]) {
    counts[row.hospital_id] = Number(row.review_count);
  }
  return counts;
}

export type InternshipInput = {
  practicum_type: PracticumType;
  practicum_year: number | null;
  scores: Record<InternshipAxis, number>;
  comment: string;
};

// 自分の口コミがあれば更新、なければ新規投稿
export async function saveInternshipReview(
  hospitalId: string,
  existingId: string | null,
  input: InternshipInput
): Promise<string | null> {
  const fields = {
    practicum_type: input.practicum_type,
    practicum_year: input.practicum_year,
    ...input.scores,
    comment: input.comment.trim() || null,
  };

  const { error } = existingId
    ? await supabase.from("internship_reviews").update(fields).eq("id", existingId)
    : await supabase.from("internship_reviews").insert({ hospital_id: hospitalId, ...fields });

  return error ? error.message : null;
}

export async function deleteInternshipReview(id: string): Promise<string | null> {
  const { error } = await supabase.from("internship_reviews").delete().eq("id", id);
  return error ? error.message : null;
}

export function averageScores(reviews: InternshipReview[]) {
  return INTERNSHIP_AXES.map((axis) => ({
    axis,
    label: INTERNSHIP_AXIS_LABEL[axis],
    value: reviews.length
      ? Math.round((reviews.reduce((s, r) => s + r[axis], 0) / reviews.length) * 10) / 10
      : 0,
  }));
}
