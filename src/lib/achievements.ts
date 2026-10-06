import { supabase } from "@/lib/supabase";
import { listPosts } from "@/lib/posts";

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
  // 研修や学会で得た単位・ポイント(投稿の詳細情報「CPDポイント」。未入力は 0)
  points: number;
  // 題名だけ公開されている実績（概要・学会名などは、公開範囲の人にだけ見える）
  titleOnly?: boolean;
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
  details: Record<string, unknown> | null;
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
    points: Number(row.details?.cpd_points) || 0,
  };
}

// 本人のマイページ用: 公開・非公開を問わず全ての実績投稿を取得
export async function listMyAchievements(
  userId: string
): Promise<Achievement[]> {
  const { data } = await supabase
    .from("posts")
    .select(
      "id, user_id, post_type, title, conference_name, content, achieved_on, is_public, created_at, details"
    )
    .eq("user_id", userId)
    .in("post_type", ACHIEVEMENT_CATEGORIES)
    .order("achieved_on", { ascending: false });

  return ((data || []) as PostRow[])
    .map(toAchievement)
    .filter((a): a is Achievement => a !== null);
}

// 公開ポートフォリオ用: 見てよい範囲の実績投稿を取得（公開範囲の外の人には、題名だけ公開のものは題名だけ）
export async function listPublicAchievements(
  userId: string
): Promise<Achievement[]> {
  const rows = await listPosts({ author: userId, types: ACHIEVEMENT_CATEGORIES, limit: 100 });

  return rows
    .map((row): Achievement | null => {
      const a = toAchievement({
        id: row.id,
        user_id: row.user_id ?? userId,
        post_type: row.post_type,
        title: row.title,
        conference_name: row.conference_name,
        content: row.content,
        achieved_on: row.achieved_on,
        is_public: row.is_public,
        created_at: row.created_at,
        details: row.details,
      });
      return a ? { ...a, titleOnly: row.restricted } : null;
    })
    .filter((a): a is Achievement => a !== null)
    .sort((x, y) => (x.achieved_on < y.achieved_on ? 1 : -1));
}

export async function deleteAchievement(id: string) {
  const { error } = await supabase.from("posts").delete().eq("id", id);
  return error ? error.message : null;
}

// 目標の数え方: count = 実績1件を1回と数える / points = 実績に入力したポイントを合計する
export type QualificationUnit = "count" | "points";

export type QualificationTarget = {
  id: string;
  user_id: string;
  name: string;
  required_total: number;
  renewal_years: number;
  cycle_start: string;
  created_at: string;
  unit: QualificationUnit;
  count_categories: AchievementCategory[];
};

export async function listQualificationTargets(
  userId: string
): Promise<QualificationTarget[]> {
  const { data } = await supabase
    .from("qualification_targets")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  return (data || []) as QualificationTarget[];
}

export type QualificationInput = {
  name: string;
  requiredTotal: number;
  renewalYears: number;
  cycleStart: string;
  unit: QualificationUnit;
  categories: AchievementCategory[];
};

function toRow(input: QualificationInput) {
  return {
    name: input.name.trim(),
    required_total: Math.max(1, Math.round(input.requiredTotal) || 1),
    renewal_years: Math.max(1, Math.round(input.renewalYears) || 1),
    cycle_start: input.cycleStart || new Date().toISOString().slice(0, 10),
    unit: input.unit,
    count_categories: input.categories.length > 0 ? input.categories : ACHIEVEMENT_CATEGORIES,
  };
}

export async function addQualificationTarget(userId: string, input: QualificationInput) {
  const { error } = await supabase
    .from("qualification_targets")
    .insert({ user_id: userId, ...toRow(input) });

  return error ? error.message : null;
}

export async function updateQualificationTarget(id: string, input: QualificationInput) {
  const { error } = await supabase
    .from("qualification_targets")
    .update(toRow(input))
    .eq("id", id);

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
  // 今のサイクルで積み上げた数(回数、またはポイント)
  value: number;
  // 対象になった実績の件数
  activityCount: number;
  remaining: number;
  achieved: boolean;
  percent: number;
  deadline: Date;
  monthsRemaining: number;
  expired: boolean;
  // ポイントで数えるときの、1回あたりの平均ポイント(記録がなければ null)
  averagePoints: number | null;
  // 「あと何回」: 回数の目標ならそのまま残り、ポイントなら平均ポイントから見積もった回数(見積もれなければ null)
  timesLeft: number | null;
  // 期限までに、月に何回のペースが必要か
  perMonth: number | null;
};

// 更新サイクルの期間内で、対象にした種類の実績を数え、あと何回・何ポイントかを計算する
export function computeQualificationProgress(
  target: QualificationTarget,
  achievements: Achievement[],
  now: Date = new Date()
): QualificationProgress {
  const cycleStart = new Date(target.cycle_start);

  const deadline = new Date(cycleStart);
  deadline.setFullYear(deadline.getFullYear() + target.renewal_years);

  const categories = target.count_categories?.length
    ? target.count_categories
    : ACHIEVEMENT_CATEGORIES;

  const counted = achievements.filter((a) => {
    const on = new Date(a.achieved_on);
    return on >= cycleStart && on <= deadline && categories.includes(a.category);
  });

  const isPoints = target.unit === "points";
  const value = isPoints
    ? counted.reduce((sum, a) => sum + a.points, 0)
    : counted.length;

  const remaining = Math.max(0, target.required_total - value);
  const achieved = remaining === 0;

  const withPoints = counted.filter((a) => a.points > 0);
  const averagePoints =
    isPoints && withPoints.length > 0
      ? withPoints.reduce((sum, a) => sum + a.points, 0) / withPoints.length
      : null;

  const timesLeft = achieved
    ? 0
    : isPoints
      ? averagePoints
        ? Math.ceil(remaining / averagePoints)
        : null
      : remaining;

  const msPerMonth = 1000 * 60 * 60 * 24 * 30.44;
  const monthsExact = (deadline.getTime() - now.getTime()) / msPerMonth;
  const monthsRemaining = Math.max(0, Math.round(monthsExact));
  const expired = deadline.getTime() < now.getTime();

  const perMonth =
    !achieved && timesLeft !== null && monthsExact > 0
      ? Math.round((timesLeft / monthsExact) * 10) / 10
      : null;

  return {
    target,
    value,
    activityCount: counted.length,
    remaining,
    achieved,
    percent: Math.min(100, Math.round((value / target.required_total) * 100)),
    deadline,
    monthsRemaining,
    expired,
    averagePoints,
    timesLeft,
    perMonth,
  };
}
