import { supabase } from "@/lib/supabase";

// 筋肉・部位別の「訓練のレパートリー」。PTが「こういう訓練があるよ」と登録して、みんなで見る。
// 疾患別（臨床アイデア）とは別に、「この筋肉を鍛えたいけど、いつものやり方では反応がよくない」ときに探せるようにする

export type Region = { key: string; name: string; muscles: string[] };

// 部位と、代表的な筋肉（国試・臨床でよく扱うもの）
export const REGIONS: Region[] = [
  { key: "neck", name: "頸部", muscles: ["胸鎖乳突筋", "頸部深層屈筋群", "斜角筋", "頭板状筋"] },
  { key: "scapula", name: "肩甲帯", muscles: ["僧帽筋（上部）", "僧帽筋（中部）", "僧帽筋（下部）", "菱形筋", "前鋸筋", "肩甲挙筋", "小胸筋"] },
  { key: "shoulder", name: "肩関節", muscles: ["三角筋", "棘上筋", "棘下筋", "小円筋", "肩甲下筋", "大円筋", "広背筋", "大胸筋"] },
  { key: "elbow", name: "肘・前腕", muscles: ["上腕二頭筋", "上腕筋", "腕橈骨筋", "上腕三頭筋", "回内筋群", "回外筋"] },
  { key: "hand", name: "手関節・手指", muscles: ["手関節背屈筋群", "手関節掌屈筋群", "手指屈筋群", "手指伸筋群", "母指球筋", "骨間筋・虫様筋"] },
  { key: "trunk_front", name: "体幹（腹部）", muscles: ["腹直筋", "外腹斜筋", "内腹斜筋", "腹横筋", "骨盤底筋群"] },
  { key: "trunk_back", name: "体幹（背部）", muscles: ["脊柱起立筋", "多裂筋", "腰方形筋"] },
  { key: "respiratory", name: "呼吸筋", muscles: ["横隔膜", "肋間筋", "呼吸補助筋"] },
  { key: "hip", name: "股関節", muscles: ["大殿筋", "中殿筋", "小殿筋", "腸腰筋", "内転筋群", "深層外旋六筋", "大腿筋膜張筋"] },
  { key: "knee", name: "膝関節", muscles: ["大腿四頭筋", "内側広筋", "ハムストリングス", "膝窩筋"] },
  { key: "ankle", name: "足関節・足部", muscles: ["前脛骨筋", "下腿三頭筋", "後脛骨筋", "腓骨筋群", "足趾屈筋群・足内在筋"] },
];

export function getRegion(key: string | null | undefined): Region | undefined {
  return REGIONS.find((r) => r.key === key);
}

// 目的（選択式）
export const PURPOSES = ["筋力", "筋持久力", "筋の活性化・収縮を促す", "柔軟性・ストレッチ", "協調性・コントロール", "動作の中で使う"] as const;
// 肢位（選択式）
export const POSITIONS = ["背臥位", "腹臥位", "側臥位", "座位", "立位", "四つ這い", "その他"] as const;

export type TrainingMethod = {
  id: string;
  region: string;
  muscle: string | null;
  title: string;
  purpose: string | null;
  body_position: string | null;
  equipment: string | null;
  method: string;
  points: string | null;
  is_anonymous: boolean;
  created_at: string;
  author_id: string | null;
  author_name: string | null;
  author_experience: number | null;
  is_mine: boolean;
  like_count: number;
  save_count: number;
  my_like: boolean;
  my_save: boolean;
};

export async function listTrainingMethods(opts: {
  region?: string | null;
  muscle?: string | null;
  sort?: "new" | "popular";
}): Promise<TrainingMethod[]> {
  const { data, error } = await supabase.rpc("list_training_methods", {
    p_region: opts.region ?? null,
    p_muscle: opts.muscle ?? null,
    p_sort: opts.sort ?? "new",
    p_limit: 100,
  });
  if (error) return [];
  return ((data ?? []) as TrainingMethod[]).map((r) => ({
    ...r,
    like_count: Number(r.like_count),
    save_count: Number(r.save_count),
  }));
}

// 部位ごと・筋肉ごとの登録数
export async function trainingCounts(): Promise<{ byRegion: Record<string, number>; byMuscle: Record<string, number> }> {
  const { data } = await supabase.rpc("training_method_counts");
  const byRegion: Record<string, number> = {};
  const byMuscle: Record<string, number> = {};
  for (const r of (data ?? []) as { region: string; muscle: string | null; n: number | string }[]) {
    const n = Number(r.n);
    byRegion[r.region] = (byRegion[r.region] ?? 0) + n;
    if (r.muscle) byMuscle[`${r.region}:${r.muscle}`] = n;
  }
  return { byRegion, byMuscle };
}

// いいね・保存のオン・オフ。戻り値は、操作後にオンかどうか（失敗・未ログインは null）
export async function toggleTrainingReaction(id: string, kind: "like" | "save"): Promise<boolean | null> {
  const { data, error } = await supabase.rpc("toggle_training_reaction", { p_method: id, p_kind: kind });
  if (error) return null;
  return Boolean(data);
}

export type TrainingInput = {
  region: string;
  muscle: string;
  title: string;
  purpose: string;
  body_position: string;
  equipment: string;
  method: string;
  points: string;
  is_anonymous: boolean;
};

const nz = (s: string) => (s.trim() ? s.trim() : null);

export async function createTrainingMethod(userId: string, v: TrainingInput): Promise<boolean> {
  const { error } = await supabase.from("training_methods").insert({
    user_id: userId,
    region: v.region,
    muscle: nz(v.muscle),
    title: v.title.trim(),
    purpose: nz(v.purpose),
    body_position: nz(v.body_position),
    equipment: nz(v.equipment),
    method: v.method.trim(),
    points: nz(v.points),
    is_anonymous: v.is_anonymous,
  });
  return !error;
}

export async function deleteTrainingMethod(id: string): Promise<boolean> {
  const { error } = await supabase.from("training_methods").delete().eq("id", id);
  return !error;
}
