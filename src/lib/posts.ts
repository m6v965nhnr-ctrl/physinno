import { supabase } from "@/lib/supabase";

// 投稿の公開範囲・匿名・題名だけ公開・対象レベル。
// 投稿・コメントの読み取りは、サーバー側の関数(list_posts / list_comments)を通す。
// 公開範囲の外の人には本文を返さず、匿名の投稿には作者の情報を返さない(画面側で隠しているのではない)

export type Visibility = "public" | "followers" | "private";

export const VISIBILITY_LABEL: Record<Visibility, string> = {
  public: "全員に公開",
  followers: "フォロワーだけ",
  private: "自分だけ",
};

export const VISIBILITY_HINT: Record<Visibility, string> = {
  public: "ログインしていない人にも読まれます",
  followers: "あなたをフォローしている人だけが読めます",
  private: "あなたにだけ見えます（ポートフォリオの下書き向け）",
};

export type TargetLevel = "all" | "student" | "newcomer" | "junior" | "mid" | "veteran";

export const LEVEL_LABEL: Record<TargetLevel, string> = {
  all: "どのレベルでも",
  student: "学生向け",
  newcomer: "新人向け（1〜3年目）",
  junior: "若手向け（4〜7年目）",
  mid: "中堅向け（8〜15年目）",
  veteran: "ベテラン向け（16年目〜）",
};

export const LEVEL_SHORT: Record<TargetLevel, string> = {
  all: "全レベル",
  student: "学生",
  newcomer: "新人",
  junior: "若手",
  mid: "中堅",
  veteran: "ベテラン",
};

export const LEVELS = Object.keys(LEVEL_LABEL) as TargetLevel[];

// 読む人のレベル(経験年数から)。学生は student。分からなければ null
export function levelOfReader(experienceYears: number | null | undefined, isStudent = false): TargetLevel | null {
  if (isStudent) return "student";
  if (experienceYears === null || experienceYears === undefined || !Number.isFinite(experienceYears)) return null;
  if (experienceYears <= 3) return "newcomer";
  if (experienceYears <= 7) return "junior";
  if (experienceYears <= 15) return "mid";
  return "veteran";
}

export type FeedPost = {
  id: string;
  user_id: string | null; // 匿名の投稿（本人以外から見たとき）は null
  post_type: string;
  title: string | null;
  content: string | null;
  image_url: string | null;
  video_url: string | null;
  like_count: number;
  comment_count: number;
  created_at: string;
  updated_at: string | null;
  case_category: string | null;
  case_title: string | null;
  media_url: string | null;
  disease_category: string | null;
  reference_url: string | null;
  conference_name: string | null;
  achieved_on: string | null;
  is_public: boolean;
  details: Record<string, unknown> | null;
  visibility: Visibility;
  title_public: boolean;
  is_anonymous: boolean;
  target_level: TargetLevel;
  restricted: boolean; // 本文は見せず、題名だけ見せている
  is_mine: boolean;
};

export async function listPosts(params: {
  author?: string | null;
  types?: string[] | null;
  before?: string | null;
  limit?: number;
  level?: TargetLevel | null;
  id?: string | null;
}): Promise<FeedPost[]> {
  const { data } = await supabase.rpc("list_posts", {
    p_author: params.author ?? null,
    p_types: params.types ?? null,
    p_before: params.before ?? null,
    p_limit: params.limit ?? 30,
    p_level: params.level ?? null,
    p_id: params.id ?? null,
  });
  return (data ?? []) as FeedPost[];
}

export async function getPost(id: string): Promise<FeedPost | null> {
  const rows = await listPosts({ id, limit: 1 });
  return rows[0] ?? null;
}

export type FeedComment = {
  id: string;
  post_id: string;
  user_id: string | null; // 匿名の投稿で、作者が書いたコメントは null
  content: string;
  created_at: string;
  by_author: boolean;
  is_mine: boolean;
};

export async function listComments(postIds: string[]): Promise<FeedComment[]> {
  if (postIds.length === 0) return [];
  const { data } = await supabase.rpc("list_comments", { p_post_ids: postIds });
  return (data ?? []) as FeedComment[];
}

// いいね・コメントの通知。匿名の投稿でも、サーバー側で宛先(投稿者)を決める
export async function notifyPostAuthor(postId: string, type: "like" | "comment"): Promise<void> {
  await supabase.rpc("notify_post_author", { p_post: postId, p_type: type });
}
