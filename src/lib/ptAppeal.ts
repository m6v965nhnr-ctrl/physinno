import { supabase } from "@/lib/supabase";

// 「採用担当に伝える」ページの選択肢と、読み書きの共通部品。
// 公開プロフィールの項目（pt_profiles）と、承認された組織にだけ見える希望（pt_work_prefs）を扱う。

export const VALUE_TAGS = [
  "患者さんとの対話",
  "チームで動く",
  "根拠（エビデンス）を大事に",
  "学び続ける",
  "生活を見すえた支援",
  "目標を一緒に決める",
  "後輩を育てる",
  "地域とのつながり",
  "最後まで諦めない",
  "安全第一",
] as const;

export const SEEK_TAGS = [
  "教育・研修の体制",
  "症例の数・幅広さ",
  "チームの雰囲気",
  "専門性を深められる",
  "地域・在宅に関われる",
  "働き方の柔軟さ",
  "長く続けられる環境",
  "新しいことに挑戦できる",
  "患者さんと向き合う時間",
  "後輩・学生の指導に関われる",
] as const;

export const EMPLOYMENT_OPTIONS = ["常勤", "非常勤・パート", "副業・兼業", "まず見学したい"] as const;

export type Pref3 = "ok" | "consult" | "ng";
export const PREF3_LABEL: Record<Pref3, string> = { ok: "できる", consult: "相談したい", ng: "難しい" };

export type StartTiming = "now" | "within3m" | "within6m" | "later" | "undecided";
export const START_TIMING_LABEL: Record<StartTiming, string> = {
  now: "すぐに",
  within3m: "3か月以内",
  within6m: "6か月以内",
  later: "それより先",
  undecided: "まだ決めていない",
};

export const ONE_LINER_MAX = 60;
export const LEARNING_MAX = 200;
export const WHY_MAX = 1000;
export const AREAS_MAX = 100;
export const NOTE_MAX = 300;
export const TAG_MAX = 3;

export const ONE_LINER_EXAMPLES = [
  "患者さんの「できた」を、一緒に喜べるPTでありたいです",
  "学び続けて、チームに頼られるPTを目指しています",
  "生活に戻るところまで、見すえて関わります",
];

export const WHY_STARTERS = ["きっかけは、", "いま思うのは、", "これから、"];

export type WorkPrefs = {
  seek_tags: string[];
  areas: string | null;
  shift_pref: Pref3 | null;
  visit_pref: Pref3 | null;
  employment: string[];
  start_timing: StartTiming | null;
  note: string | null;
};

export const EMPTY_PREFS: WorkPrefs = {
  seek_tags: [],
  areas: null,
  shift_pref: null,
  visit_pref: null,
  employment: [],
  start_timing: null,
  note: null,
};

export type AppealFields = {
  one_liner?: string | null;
  values_tags?: string[] | null;
  why_pt?: string | null;
  learning_now?: string | null;
};

// 完成度は、「採用担当が知りたい5つ」のうち、いくつ書けたか
export const APPEAL_STEPS = ["ひとこと", "PTになった理由", "大切にしていること", "今学んでいること", "働き方の希望"] as const;

export function appealProgress(a: AppealFields, prefs: WorkPrefs | null): boolean[] {
  // 書き出しだけ（「きっかけは、」など）では、書けたことにしない
  const filled = (s?: string | null, min = 1) => (s?.trim().length ?? 0) >= min;
  return [
    filled(a.one_liner, 8),
    filled(a.why_pt, 15),
    (a.values_tags?.length ?? 0) > 0,
    filled(a.learning_now, 8),
    Boolean(prefs && ((prefs.seek_tags?.length ?? 0) > 0 || prefs.start_timing || filled(prefs.areas, 2))),
  ];
}

// 本人または承認された組織だけが、行を読める（RLS）。読めないときは null
export async function getWorkPrefs(userId: string): Promise<WorkPrefs | null> {
  const { data } = await supabase
    .from("pt_work_prefs")
    .select("seek_tags, areas, shift_pref, visit_pref, employment, start_timing, note")
    .eq("user_id", userId)
    .maybeSingle();
  if (!data) return null;
  return {
    seek_tags: data.seek_tags ?? [],
    areas: data.areas ?? null,
    shift_pref: (data.shift_pref as Pref3 | null) ?? null,
    visit_pref: (data.visit_pref as Pref3 | null) ?? null,
    employment: data.employment ?? [],
    start_timing: (data.start_timing as StartTiming | null) ?? null,
    note: data.note ?? null,
  };
}

export async function saveWorkPrefs(userId: string, p: WorkPrefs) {
  return supabase.from("pt_work_prefs").upsert(
    {
      user_id: userId,
      seek_tags: p.seek_tags.slice(0, TAG_MAX),
      areas: p.areas?.trim().slice(0, AREAS_MAX) || null,
      shift_pref: p.shift_pref,
      visit_pref: p.visit_pref,
      employment: p.employment.slice(0, 4),
      start_timing: p.start_timing,
      note: p.note?.trim().slice(0, NOTE_MAX) || null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" }
  );
}
