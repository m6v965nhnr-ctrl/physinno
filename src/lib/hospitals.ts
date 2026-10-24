import { supabase } from "@/lib/supabase";
import { HOSPITAL_COLUMNS } from "@/lib/hospitalColumns";
import { DEFAULT_FACILITY_CATEGORY, isValidFacility } from "@/lib/facilityTypes";
import type { PtProfile } from "@/lib/types";

export type WorkplaceSize = "small" | "medium" | "large";

export const WORKPLACE_SIZE_LABEL: Record<WorkplaceSize, string> = {
  small: "小規模（〜50床目安）",
  medium: "中規模（50〜300床目安）",
  large: "大規模（300床以上目安）",
};

export type Hospital = {
  id: string;
  facility_category?: string | null;
  facility_type?: string | null;
  name: string;
  prefecture: string | null;
  city: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  size: string | null;
  // 採用情報は自動収集せず、在籍PTが手入力する前提のフリーテキスト
  recruitment_info: string | null;
  // 病院を登録した人・運営している人のID。DBの権限で、読めない（常に undefined）。書き込みのときだけ使う
  created_by?: string | null;
  // 病院側が自分でこのページを運営したい場合、将来的にここへ本人のuser_idを
  // 紐付ける想定（今回はスキーマのみ用意。実際の運営申請フローは未実装）
  claimed_by?: string | null;
  // 厚労省オープンデータから一括登録した病院には出典を記録する
  // （公共データ利用規約PDL1.0の出典明記・加工表示の義務に対応）
  data_source: string | null;
  data_source_note: string | null;
  // 厚労省オープンデータの診療科・病床数(学生の病院探し用)。未取得の病院は null
  departments: string[] | null;
  beds_general: number | null;
  beds_long_term: number | null;
  beds_psychiatric: number | null;
  beds_total: number | null;
  // 公式サイトのリンクの確認結果（定期チェック）。dead のときは、リンクを出さない
  website_status?: "ok" | "dead" | null;
  created_at: string;
  // 採用の目安（検索のときだけ、いっしょに読む）
  hospital_recruit?: HospitalRecruit | null;
};

export type AccessMode = "walk" | "bus" | "shuttle" | "car";

export const ACCESS_MODE_LABEL: Record<AccessMode, string> = {
  walk: "徒歩",
  bus: "バス",
  shuttle: "送迎バス",
  car: "車",
};

export type HospitalRecruit = {
  hospital_id: string;
  employment_types: string[];
  monthly_min: number | null;
  monthly_max: number | null;
  bonus_months: number | null;
  annual_stated_min: number | null;
  annual_stated_max: number | null;
  // 年収: 月給だけなら「月給×12」、賞与が「◯か月分」なら「月給×(12＋か月数)」で、DBが自動で計算する
  annual_min: number | null;
  annual_max: number | null;
  weekly_off_days: number | null;
  annual_holidays: number | null;
  tags: string[];
  access_station: string | null;
  access_minutes: number | null;
  access_mode: AccessMode | null;
  source_name: string | null;
  source_url: string | null;
  fetched_at: string | null;
  updated_at: string;
};

export const EMPLOYMENT_TYPES = ["常勤", "非常勤", "パート"];

// こだわりポイント（PT・OT人材バンクなどの絞り込みを参考にした、PTの病院探しで多い条件）
export const RECRUIT_TAGS = [
  "土日休み",
  "土日祝休み",
  "日祝休み",
  "残業少なめ",
  "賞与あり",
  "昇給あり",
  "住宅手当あり",
  "寮あり",
  "託児所あり",
  "産休育休可",
  "新卒可",
  "教育充実",
  "車通勤可",
];

export const ANNUAL_OPTIONS = [300, 350, 400, 450, 500, 550, 600];
export const BED_COUNT_OPTIONS: { value: string; label: string; min: number; max: number | null }[] = [
  { value: "s", label: "〜99床", min: 0, max: 99 },
  { value: "m", label: "100〜299床", min: 100, max: 299 },
  { value: "l", label: "300〜499床", min: 300, max: 499 },
  { value: "xl", label: "500床以上", min: 500, max: null },
];
export const HOLIDAY_OPTIONS = [
  { value: "w2", label: "週休2日以上" },
  { value: "w3", label: "週休3日" },
  { value: "h110", label: "年間休日110日以上" },
  { value: "h120", label: "年間休日120日以上" },
];
export const ACCESS_OPTIONS = [5, 10, 15, 20];

// 年収の表示（「450〜520万円」）。1つしか分からないときは、その値だけ
export function annualLabel(r: Pick<HospitalRecruit, "annual_min" | "annual_max">): string | null {
  const lo = r.annual_min ? Math.round(r.annual_min / 10000) : null;
  const hi = r.annual_max ? Math.round(r.annual_max / 10000) : null;
  if (lo && hi && lo !== hi) return `${lo}〜${hi}万円`;
  const v = hi ?? lo;
  return v ? `${v}万円` : null;
}

export function accessLabel(r: Pick<HospitalRecruit, "access_station" | "access_minutes" | "access_mode">): string | null {
  if (!r.access_station && r.access_minutes == null) return null;
  const mode = r.access_mode ? ACCESS_MODE_LABEL[r.access_mode] : "";
  const min = r.access_minutes != null ? `${r.access_minutes}分` : "";
  return `${r.access_station ? `${r.access_station} から ` : ""}${mode}${min}`.trim();
}

export type BedType = "general" | "long_term" | "psychiatric";

export const BED_TYPE_LABEL: Record<BedType, string> = {
  general: "一般病床あり（急性期・回復期など）",
  long_term: "療養病床あり（長期療養・生活期）",
  psychiatric: "精神病床あり",
};

export type DiseaseRatio = {
  id: string;
  hospital_id: string;
  category: string;
  percentage: number;
};

export const REVIEW_AXES = [
  "work_environment",
  "education_system",
  "salary",
  "overtime",
  "paid_leave",
  "openness",
] as const;

export type ReviewAxis = (typeof REVIEW_AXES)[number];

export const REVIEW_AXIS_LABEL: Record<ReviewAxis, string> = {
  work_environment: "職場環境",
  education_system: "教育体制（新人教育）",
  salary: "給与満足度",
  overtime: "残業の少なさ",
  paid_leave: "有休消化率",
  openness: "風通しの良さ",
};

// 投稿者(user_id)は匿名・記名にかかわらずクライアントへ返さない。
// 自分の口コミかどうかだけ is_mine で分かる
export type HospitalReview = {
  id: string;
  hospital_id: string;
  is_mine: boolean;
  work_environment: number;
  education_system: number;
  salary: number;
  overtime: number;
  paid_leave: number;
  openness: number;
  overall_score: number;
  comment: string | null;
  is_anonymous: boolean;
  created_at: string;
  // 数字で答える欄（任意。答えていなければ null）
  women_friendly: number | null;
  employment_type: string | null;
  annual_income: number | null; // 万円
  monthly_overtime_hours: number | null;
  annual_holidays: number | null;
  age_band: number | null; // 自分の口コミだけ入る（編集用）
};

// 年収の推移用の年齢の層（5歳ごと）。値は、その層の上限
export const AGE_BANDS: { value: number; label: string }[] = [
  { value: 25, label: "25歳以下" },
  { value: 30, label: "30歳以下" },
  { value: 35, label: "35歳以下" },
  { value: 40, label: "40歳以下" },
  { value: 45, label: "45歳以下" },
  { value: 50, label: "50歳以下" },
  { value: 55, label: "51歳以上" },
];

export type IncomeByAge = { age_band: number; n: number; avg_income: number };

// 3件以上そろった層だけ、サーバーが返す
export async function getIncomeByAge(hospitalId: string): Promise<IncomeByAge[]> {
  const { data } = await supabase.rpc("get_hospital_income_by_age", { p_hospital: hospitalId });
  return ((data ?? []) as { age_band: number; n: number | string; avg_income: number }[]).map((r) => ({ ...r, n: Number(r.n) }));
}

// 口コミの分類（理学療法士が職場を選ぶときに気になる項目）。「その他・全体」は、分類なしの従来のコメント用
export const REVIEW_TOPICS: { key: string; hint: string }[] = [
  { key: "教育・研修", hint: "新人教育、プリセプター、勉強会、学会参加の支援" },
  { key: "症例・患者層", hint: "疾患の種類、急性期・回復期・生活期、症例の数" },
  { key: "業務量・単位数", hint: "1日の単位数、ノルマ、書類・記録の量" },
  { key: "残業・休暇", hint: "残業の多さ、有給の取りやすさ、休日" },
  { key: "給与・待遇", hint: "給与・賞与・手当、昇給、福利厚生" },
  { key: "人間関係・雰囲気", hint: "リハ科内の雰囲気、他職種との連携、相談しやすさ" },
  { key: "女性の働きやすさ", hint: "産休・育休、時短、復職、ライフイベントとの両立" },
  { key: "設備・リハ環境", hint: "リハ室の広さ、機器、物理療法・歩行訓練の設備" },
  { key: "キャリア・成長", hint: "認定・専門、研究、役職、他部署への異動" },
  { key: "入職理由とギャップ", hint: "入職した理由と、入ってからの違い。辞めたいと思った理由" },
];
export const REVIEW_TOPIC_OTHER = "その他・全体";

export type ReviewTopic = { id: string; review_id: string; category: string; body: string; created_at: string; is_mine: boolean };

export async function listReviewTopics(hospitalId: string): Promise<ReviewTopic[]> {
  const { data } = await supabase.rpc("get_hospital_review_topics", { p_hospital: hospitalId });
  return (data ?? []) as ReviewTopic[];
}

export type ReviewExtra = {
  women_friendly: number | null;
  employment_type: string | null;
  annual_income: number | null;
  monthly_overtime_hours: number | null;
  annual_holidays: number | null;
  age_band: number | null;
};

export const EMPTY_REVIEW_EXTRA: ReviewExtra = {
  women_friendly: null,
  employment_type: null,
  annual_income: null,
  monthly_overtime_hours: null,
  annual_holidays: null,
  age_band: null,
};

export type RecruitFilters = {
  annualMin?: number; // 万円
  employment?: string;
  holiday?: string;
  tags?: string[];
  accessMode?: AccessMode;
  accessMinutes?: number;
};

export function hasRecruitFilters(f: RecruitFilters): boolean {
  return !!(f.annualMin || f.employment || f.holiday || f.tags?.length || f.accessMode || f.accessMinutes);
}

export async function searchHospitals({
  keyword,
  prefecture,
  city,
  size,
  bedType,
  bedCount,
  recruit = {},
  category,
  facilityType,
}: {
  keyword?: string;
  prefecture?: string;
  city?: string;
  size?: WorkplaceSize;
  bedType?: BedType;
  bedCount?: string;
  recruit?: RecruitFilters;
  category?: string;
  facilityType?: string;
}): Promise<Hospital[]> {
  // 給与・休日・アクセスで絞るときは、その情報がある病院だけ（!inner）。絞らないときは、あれば付ける
  const inner = hasRecruitFilters(recruit) ? "!inner" : "";
  let query = supabase.from("hospitals").select(`${HOSPITAL_COLUMNS}, hospital_recruit${inner}(*)`).order("name");

  // 正式名称（例：「公益社団法人〇〇　△△病院」）で登録されているため、
  // 一般的に呼ばれる名前の一部でも見つかるよう部分一致で検索する
  if (keyword) query = query.ilike("name", `%${keyword}%`);
  if (prefecture) query = query.ilike("prefecture", `%${prefecture}%`);
  if (city) query = query.ilike("city", `%${city}%`);
  if (size) query = query.eq("size", size);
  if (category && isValidFacility(category, null)) query = query.eq("facility_category", category);
  if (category && facilityType && isValidFacility(category, facilityType)) query = query.eq("facility_type", facilityType);
  if (bedType === "general") query = query.gt("beds_general", 0);
  if (bedType === "long_term") query = query.gt("beds_long_term", 0);
  if (bedType === "psychiatric") query = query.gt("beds_psychiatric", 0);

  const range = BED_COUNT_OPTIONS.find((o) => o.value === bedCount);
  if (range) {
    query = query.gte("beds_total", range.min);
    if (range.max !== null) query = query.lte("beds_total", range.max);
  }

  if (recruit.annualMin) query = query.gte("hospital_recruit.annual_max", recruit.annualMin * 10000);
  if (recruit.employment) query = query.contains("hospital_recruit.employment_types", [recruit.employment]);
  if (recruit.holiday === "w2") query = query.gte("hospital_recruit.weekly_off_days", 2);
  if (recruit.holiday === "w3") query = query.gte("hospital_recruit.weekly_off_days", 3);
  if (recruit.holiday === "h110") query = query.gte("hospital_recruit.annual_holidays", 110);
  if (recruit.holiday === "h120") query = query.gte("hospital_recruit.annual_holidays", 120);
  if (recruit.tags && recruit.tags.length > 0) query = query.contains("hospital_recruit.tags", recruit.tags);
  if (recruit.accessMode) query = query.eq("hospital_recruit.access_mode", recruit.accessMode);
  if (recruit.accessMinutes) query = query.lte("hospital_recruit.access_minutes", recruit.accessMinutes);

  const { data } = await query.limit(100);
  return (data as unknown as Hospital[] | null) ?? [];
}

// 選択された都道府県に実在する市区町村だけをプルダウンに出すため、
// 病院データから distinct な city を取得する
export async function listCitiesByPrefecture(
  prefecture: string
): Promise<string[]> {
  // 施設が増えて1,000行の読み込みでは取りこぼすため、DB側で distinct（hospital_cities 関数）
  const { data } = await supabase.rpc("hospital_cities", { p_prefecture: prefecture });
  return ((data ?? []) as string[]).sort((a, b) => a.localeCompare(b, "ja"));
}

export async function getHospital(id: string): Promise<Hospital | null> {
  const { data } = await supabase
    .from("hospitals")
    .select(HOSPITAL_COLUMNS)
    .eq("id", id)
    .maybeSingle();

  return (data as Hospital | null) ?? null;
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
  facilityCategory,
  facilityType,
}: {
  name: string;
  facilityCategory?: string;
  facilityType?: string;
  prefecture?: string;
  city?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  size?: WorkplaceSize;
  createdBy: string;
}): Promise<{ hospital: Hospital | null; error: string | null }> {
  const cat = facilityCategory && isValidFacility(facilityCategory, facilityType) ? facilityCategory : DEFAULT_FACILITY_CATEGORY;
  const typ = facilityType && isValidFacility(cat, facilityType) ? facilityType : null;
  const { data, error } = await supabase
    .from("hospitals")
    .insert({
      facility_category: cat,
      facility_type: typ,
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
    .select(HOSPITAL_COLUMNS)
    .single();

  return { hospital: (data as Hospital | null) ?? null, error: error?.message ?? null };
}

export async function listPtsByHospital(hospitalId: string): Promise<PtProfile[]> {
  const { data } = await supabase
    .from("pt_profiles")
    .select("*")
    .eq("hospital_id", hospitalId)
    .eq("is_student", false)
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
  const { data } = await supabase.rpc("get_hospital_reviews", {
    p_hospital_id: hospitalId,
  });

  return (data ?? []) as HospitalReview[];
}

// 1人のPTにつき1病院1件まで（既にあれば上書き更新）
export async function upsertHospitalReview({
  hospitalId,
  userId,
  scores,
  overallScore,
  comment,
  isAnonymous,
  extra = EMPTY_REVIEW_EXTRA,
  topics = {},
}: {
  hospitalId: string;
  userId: string;
  scores: Record<ReviewAxis, number>;
  overallScore: number;
  comment?: string;
  isAnonymous: boolean;
  extra?: ReviewExtra;
  topics?: Record<string, string>; // 分類 → コメント（空は保存しない）
}): Promise<string | null> {
  const { data, error } = await supabase.from("hospital_reviews").upsert(
    {
      hospital_id: hospitalId,
      user_id: userId,
      ...scores,
      overall_score: overallScore,
      comment: comment?.trim() || null,
      is_anonymous: isAnonymous,
      ...extra,
    },
    { onConflict: "hospital_id,user_id" }
  ).select("id").single();

  if (error || !data) return error ? error.message : "保存できませんでした";

  // 分類ごとのコメントは、いったん消して入れ直す（書き換え・消去に対応）
  const del = await supabase.from("hospital_review_topics").delete().eq("review_id", data.id);
  if (del.error) return del.error.message;
  const rows = Object.entries(topics)
    .map(([category, body]) => ({ category, body: body.trim() }))
    .filter((t) => t.body && REVIEW_TOPICS.some((x) => x.key === t.category))
    .map((t) => ({ review_id: data.id, hospital_id: hospitalId, user_id: userId, ...t }));
  if (rows.length) {
    const ins = await supabase.from("hospital_review_topics").insert(rows);
    if (ins.error) return ins.error.message.includes("check") ? "分類ごとのコメントは、5文字以上で書いてください" : ins.error.message;
  }
  return null;
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

// 採用情報は自動スクレイピングではなく、在籍PT（または作成者・運営者）が
// 手入力する前提のフリーテキスト
export async function updateRecruitmentInfo(
  hospitalId: string,
  recruitmentInfo: string
): Promise<string | null> {
  const { error } = await supabase
    .from("hospitals")
    .update({ recruitment_info: recruitmentInfo.trim() || null })
    .eq("id", hospitalId);

  return error ? error.message : null;
}

export async function canEditHospitalData(
  hospitalId: string,
  _userId: string
): Promise<boolean> {
  // 在籍している・作成した・運営している人かどうかは、サーバー側（DB関数）で判定する
  // （作成者・運営者のIDは、画面からは読めないため）
  const { data } = await supabase.rpc("can_edit_hospital_data", { p_hospital: hospitalId });
  return data === true;
}
