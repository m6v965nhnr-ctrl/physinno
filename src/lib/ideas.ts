import { supabase } from "@/lib/supabase";

// 臨床アイデア（PTが投稿して、PT・学生が読む）。読み取りは RPC 経由（匿名の投稿は、投稿者を返さない）

export type IdeaPhase = "acute" | "recovery" | "chronic" | "outpatient" | "any";

export const PHASE_LABEL: Record<IdeaPhase, string> = {
  acute: "急性期",
  recovery: "回復期",
  chronic: "生活期・維持期",
  outpatient: "外来",
  any: "時期を問わない",
};

export const PHASES = Object.keys(PHASE_LABEL) as IdeaPhase[];

export type PtIdea = {
  id: string;
  topic_slug: string;
  title: string;
  goal: string | null;
  phase: IdeaPhase;
  method: string;
  points: string | null;
  patient_traits: string | null;
  impressions: string | null;
  refs: string | null;
  is_anonymous: boolean;
  created_at: string;
  author_id: string | null;
  author_name: string | null;
  author_qualification: string | null;
  author_experience: number | null;
  is_mine: boolean;
  like_count: number;
  save_count: number;
  practiced_count: number;
  my_like: boolean;
  my_save: boolean;
  my_practiced: boolean;
};

export type ReactionKind = "like" | "save" | "practiced";

export const REACTION_LABEL: Record<ReactionKind, { on: string; off: string; icon: string }> = {
  like: { off: "いいね", on: "いいね済み", icon: "👍" },
  save: { off: "保存", on: "保存済み", icon: "🔖" },
  practiced: { off: "実践した", on: "実践した", icon: "🧑‍⚕️" },
};

type Raw = Omit<PtIdea, "like_count" | "save_count" | "practiced_count" | "author_experience"> & {
  like_count: number | string;
  save_count: number | string;
  practiced_count: number | string;
  author_experience: number | null;
};

function normalize(r: Raw): PtIdea {
  return {
    ...r,
    like_count: Number(r.like_count),
    save_count: Number(r.save_count),
    practiced_count: Number(r.practiced_count),
  };
}

export async function listIdeas(opts: {
  topic?: string | null;
  sort?: "new" | "popular";
  savedOnly?: boolean;
  limit?: number;
}): Promise<PtIdea[]> {
  const { data, error } = await supabase.rpc("list_clinical_ideas", {
    p_topic: opts.topic ?? null,
    p_sort: opts.sort ?? "new",
    p_saved_only: opts.savedOnly ?? false,
    p_limit: opts.limit ?? 50,
  });
  if (error) return [];
  return ((data ?? []) as Raw[]).map(normalize);
}

export async function ideaCounts(): Promise<Record<string, number>> {
  const { data } = await supabase.rpc("clinical_idea_counts");
  const out: Record<string, number> = {};
  for (const r of (data ?? []) as { topic_slug: string; n: number | string }[]) out[r.topic_slug] = Number(r.n);
  return out;
}

// 反応のオン・オフ。戻り値は、操作後にオンかどうか（失敗したら null）
export async function toggleReaction(ideaId: string, kind: ReactionKind): Promise<boolean | null> {
  const { data, error } = await supabase.rpc("toggle_idea_reaction", { p_idea: ideaId, p_kind: kind });
  if (error) return null;
  return Boolean(data);
}

export type IdeaInput = {
  topic_slug: string;
  title: string;
  goal: string;
  phase: IdeaPhase;
  method: string;
  points: string;
  patient_traits: string;
  impressions: string;
  refs: string;
  is_anonymous: boolean;
};

const nz = (s: string) => (s.trim() ? s.trim() : null);

export async function createIdea(userId: string, v: IdeaInput): Promise<{ ok: boolean; message?: string }> {
  const { error } = await supabase.from("clinical_ideas").insert({
    user_id: userId,
    topic_slug: v.topic_slug,
    title: v.title.trim(),
    goal: nz(v.goal),
    phase: v.phase,
    method: v.method.trim(),
    points: nz(v.points),
    patient_traits: nz(v.patient_traits),
    impressions: nz(v.impressions),
    refs: nz(v.refs),
    is_anonymous: v.is_anonymous,
  });
  if (error) return { ok: false, message: error.message };
  return { ok: true };
}

export async function deleteIdea(id: string): Promise<boolean> {
  const { error } = await supabase.from("clinical_ideas").delete().eq("id", id);
  return !error;
}
