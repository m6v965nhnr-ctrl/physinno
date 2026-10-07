// 「AIに相談」の入力項目（すべて選択式・数値。自由な文章は入力できない）。
// 画面とサーバーで同じ定義を使い、サーバーでは、この一覧にない値は受け付けない。

export const AGE_BANDS = ["10代以下", "20〜30代", "40〜50代", "60代", "70代", "80代", "90代以上"] as const;
export const SEXES = ["回答しない", "男性", "女性"] as const;
export const AI_PHASES = ["急性期", "回復期", "生活期・維持期", "外来"] as const;

export const PROBLEMS = [
  "疼痛",
  "関節可動域の制限",
  "筋力低下",
  "バランス低下・ふらつき",
  "歩行障害",
  "立ち上がり・移乗が難しい",
  "運動麻痺",
  "痙縮・筋緊張の異常",
  "感覚障害",
  "息切れ・呼吸困難",
  "持久力の低下",
  "認知機能の低下",
  "せん妄",
  "嚥下・誤嚥のリスク",
  "転倒の既往",
  "起立性低血圧",
  "拘縮・褥瘡のリスク",
  "低栄養・体重減少",
] as const;

export const GOALS = [
  "疼痛の軽減",
  "屋内歩行の自立",
  "屋外歩行",
  "階段昇降",
  "立ち上がり・移乗の自立",
  "転倒の予防",
  "息切れの軽減・活動量の向上",
  "ADL（日常生活動作）の自立",
  "自宅への退院",
  "スポーツ・仕事への復帰",
] as const;

// 任意の評価値（数値）
export const MEASURES = [
  { key: "tug", label: "TUG", unit: "秒", min: 3, max: 120 },
  { key: "speed10m", label: "10m歩行速度", unit: "m/秒", min: 0.05, max: 3 },
  { key: "walk6min", label: "6分間歩行距離", unit: "m", min: 20, max: 800 },
  { key: "nrs", label: "疼痛（NRS 0〜10）", unit: "点", min: 0, max: 10 },
  { key: "spo2", label: "安静時SpO2", unit: "%", min: 70, max: 100 },
] as const;

export type MeasureKey = (typeof MEASURES)[number]["key"];

export type SuggestInput = {
  topic: string; // 疾患の slug（空なら、疾患を指定しない）
  age: (typeof AGE_BANDS)[number];
  sex: (typeof SEXES)[number];
  phase: (typeof AI_PHASES)[number];
  problems: (typeof PROBLEMS)[number][];
  measures: Partial<Record<MeasureKey, number>>;
  goal: (typeof GOALS)[number];
};

export type SuggestOption = {
  title: string;
  why: string;
  how: string;
  cautions: string;
  search_query: string;
};

export type SuggestResult = {
  summary: string;
  check_first: string[];
  options: SuggestOption[];
  safety: string[];
};
