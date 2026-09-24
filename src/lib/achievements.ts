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

// カテゴリごとの入力欄の見た目（タイトル欄のプレースホルダー・概要欄のラベル等）
export const ACHIEVEMENT_FIELD_CONFIG: Record<
  AchievementCategory,
  {
    titlePlaceholder: string;
    memoLabel: string;
    showConferenceName: boolean;
  }
> = {
  conference: {
    titlePlaceholder: "発表題名",
    memoLabel: "概要",
    showConferenceName: true,
  },
  case_presentation: {
    titlePlaceholder: "発表題名",
    memoLabel: "概要",
    showConferenceName: false,
  },
  training: {
    titlePlaceholder: "講義名（例: 運動器疾患のリハビリテーション研修）",
    memoLabel: "概要",
    showConferenceName: false,
  },
  paper: {
    titlePlaceholder:
      "論文タイトル（例: 変形性膝関節症患者に対する運動療法の効果）",
    memoLabel: "概要",
    showConferenceName: false,
  },
  other: {
    titlePlaceholder: "タイトル",
    memoLabel: "内容",
    showConferenceName: false,
  },
};

function isAchievementCategory(value: string): value is AchievementCategory {
  return (ACHIEVEMENT_CATEGORIES as string[]).includes(value);
}

// 実績（学会発表・院内症例発表など）は posts テーブルに投稿として保存される
export type Achievement = {
  id: string;
  user_id: string;
  category: AchievementCategory;
  title: string | null;
  conference_name: string | null;
  memo: string | null;
  achieved_on: string;
  is_public: boolean;
  created_at: string;
};

type PostRow = {
  id: string;
  user_id: string;
  post_type: string;
  title: string | null;
  conference_name: string | null;
  content: string | null;
  achieved_on: string | null;
  is_public: boolean;
  created_at: string;
};

function toAchievement(row: PostRow): Achievement | null {
  if (!isAchievementCategory(row.post_type)) {
    return null;
  }

  return {
    id: row.id,
    user_id: row.user_id,
    category: row.post_type,
    title: row.title,
    conference_name: row.conference_name,
    memo: row.content,
    achieved_on: row.achieved_on || row.created_at.slice(0, 10),
    is_public: row.is_public,
    created_at: row.created_at,
  };
}

// 本人のマイページ用: 公開・非公開を問わず全ての実績投稿を取得
export async function listMyAchievements(
  userId: string
): Promise<Achievement[]> {
  const { data } = await supabase
    .from("posts")
    .select(
      "id, user_id, post_type, title, conference_name, content, achieved_on, is_public, created_at"
    )
    .eq("user_id", userId)
    .in("post_type", ACHIEVEMENT_CATEGORIES)
    .order("achieved_on", { ascending: false });

  return ((data || []) as PostRow[])
    .map(toAchievement)
    .filter((a): a is Achievement => a !== null);
}

// 公開ポートフォリオ用: 公開設定の実績投稿のみ取得
export async function listPublicAchievements(
  userId: string
): Promise<Achievement[]> {
  const { data } = await supabase
    .from("posts")
    .select(
      "id, user_id, post_type, title, conference_name, content, achieved_on, is_public, created_at"
    )
    .eq("user_id", userId)
    .eq("is_public", true)
    .in("post_type", ACHIEVEMENT_CATEGORIES)
    .order("achieved_on", { ascending: false });

  return ((data || []) as PostRow[])
    .map(toAchievement)
    .filter((a): a is Achievement => a !== null);
}

export async function deleteAchievement(id: string) {
  const { error } = await supabase.from("posts").delete().eq("id", id);
  return error ? error.message : null;
}

export type QualificationTarget = {
  id: string;
  user_id: string;
  name: string;
  required_total: number;
  renewal_years: number;
  cycle_start: string;
  created_at: string;
};

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
