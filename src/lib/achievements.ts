import { supabase } from "@/lib/supabase";

export type AchievementCategory =
  | "conference"
  | "case_presentation"
  | "training"
  | "paper"
  | "other";

export const ACHIEVEMENT_CATEGORY_LABEL: Record<AchievementCategory, string> = {
  conference: "学会発表",
  case_presentation: "院内症例発表",
  training: "研修受講",
  paper: "論文",
  other: "その他",
};

export const ACHIEVEMENT_CATEGORIES = Object.keys(
  ACHIEVEMENT_CATEGORY_LABEL
) as AchievementCategory[];

// 学会名・発表題名・概要の入力欄を出すカテゴリ
export const ACHIEVEMENT_CATEGORIES_WITH_DETAILS: AchievementCategory[] = [
  "conference",
  "case_presentation",
];

export type Achievement = {
  id: string;
  user_id: string;
  category: AchievementCategory;
  title: string | null;
  conference_name: string | null;
  achieved_on: string;
  memo: string | null;
  created_at: string;
};

export type QualificationTarget = {
  id: string;
  user_id: string;
  name: string;
  required_total: number;
  renewal_years: number;
  cycle_start: string;
  created_at: string;
};

export async function listAchievements(
  userId: string
): Promise<Achievement[]> {
  const { data } = await supabase
    .from("achievements")
    .select("*")
    .eq("user_id", userId)
    .order("achieved_on", { ascending: false });

  return data || [];
}

export async function addAchievement(params: {
  userId: string;
  category: AchievementCategory;
  title?: string;
  conferenceName?: string;
  achievedOn?: string;
  memo?: string;
}) {
  const { error } = await supabase.from("achievements").insert({
    user_id: params.userId,
    category: params.category,
    title: params.title || null,
    conference_name: params.conferenceName || null,
    achieved_on: params.achievedOn || new Date().toISOString().slice(0, 10),
    memo: params.memo || null,
  });

  return error ? error.message : null;
}

export async function deleteAchievement(id: string) {
  const { error } = await supabase.from("achievements").delete().eq("id", id);
  return error ? error.message : null;
}

export async function listQualificationTargets(
  userId: string
): Promise<QualificationTarget[]> {
  const { data } = await supabase
    .from("qualification_targets")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  return data || [];
}

export async function addQualificationTarget(params: {
  userId: string;
  name: string;
  requiredTotal: number;
  renewalYears: number;
  cycleStart?: string;
}) {
  const { error } = await supabase.from("qualification_targets").insert({
    user_id: params.userId,
    name: params.name,
    required_total: params.requiredTotal,
    renewal_years: params.renewalYears,
    cycle_start: params.cycleStart || new Date().toISOString().slice(0, 10),
  });

  return error ? error.message : null;
}

export async function deleteQualificationTarget(id: string) {
  const { error } = await supabase
    .from("qualification_targets")
    .delete()
    .eq("id", id);

  return error ? error.message : null;
}

export type QualificationProgress = {
  target: QualificationTarget;
  count: number;
  remaining: number;
  deadline: Date;
  monthsRemaining: number;
};

// 資格の更新サイクル開始日以降の実績数から、達成状況・更新期限を計算する
export function computeQualificationProgress(
  target: QualificationTarget,
  achievements: Achievement[]
): QualificationProgress {
  const cycleStart = new Date(target.cycle_start);

  const count = achievements.filter(
    (a) => new Date(a.achieved_on) >= cycleStart
  ).length;

  const deadline = new Date(cycleStart);
  deadline.setFullYear(deadline.getFullYear() + target.renewal_years);

  const monthsRemaining = Math.max(
    0,
    Math.round(
      (deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24 * 30.44)
    )
  );

  return {
    target,
    count,
    remaining: Math.max(0, target.required_total - count),
    deadline,
    monthsRemaining,
  };
}
