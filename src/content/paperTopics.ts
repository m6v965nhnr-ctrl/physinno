// 論文検索サイトの、テーマ別ページ（/paper-search/topics/[slug]）。
// 書くのは、「探し方」だけ（検索語・関連語・絞り込みのコツ）。治療の効果などの医学的な主張は、書かない（論文を読んで、判断する）。
export type PaperTopic = {
  slug: string;
  ja: string; // 日本語の検索語
  en: string; // 英語の検索語
  area: string; // 分野（一覧の見出し）
  related: { ja: string[]; en: string[] }; // 関連語（言い換え・近い言葉）
  tip: string; // このテーマの探し方のひとこと
};

export const PAPER_TOPICS_UPDATED = "2026-10-18";

export const PAPER_TOPICS: PaperTopic[] = [
  { slug: "knee-osteoarthritis", ja: "変形性膝関節症", en: "knee osteoarthritis exercise therapy", area: "運動器", related: { ja: ["膝OA", "運動療法", "歩行"], en: ["knee OA", "exercise", "gait"] }, tip: "運動療法を調べるときは、「運動療法」「exercise」を足すと、介入の論文に絞れます。" },
  { slug: "low-back-pain", ja: "腰痛", en: "low back pain physical therapy", area: "運動器", related: { ja: ["慢性腰痛", "体幹", "運動療法"], en: ["chronic low back pain", "core stability", "exercise"] }, tip: "急性と慢性で、論文の内容が大きく変わります。「慢性」「chronic」で、範囲を決めてから探すと、読む量を減らせます。" },
  { slug: "frozen-shoulder", ja: "肩関節周囲炎", en: "adhesive capsulitis frozen shoulder", area: "運動器", related: { ja: ["五十肩", "凍結肩", "可動域"], en: ["frozen shoulder", "range of motion", "mobilization"] }, tip: "「五十肩」「凍結肩」など、呼び名が複数あります。日本語は、言い換えをいくつか試すと、見つかる論文が増えます。" },
  { slug: "hip-fracture", ja: "大腿骨近位部骨折", en: "hip fracture rehabilitation", area: "運動器", related: { ja: ["大腿骨頸部骨折", "術後", "早期離床"], en: ["femoral neck fracture", "postoperative", "early mobilization"] }, tip: "術後のリハビリを調べるときは、「術後」「postoperative」を足します。" },
  { slug: "acl-reconstruction", ja: "前十字靱帯損傷", en: "anterior cruciate ligament reconstruction rehabilitation", area: "運動器・スポーツ", related: { ja: ["ACL", "再建術", "スポーツ復帰"], en: ["ACL", "return to sport", "reconstruction"] }, tip: "英語では「ACL」の略語でも、よくヒットします。「return to sport」を足すと、復帰の基準の論文を探せます。" },
  { slug: "stroke-rehabilitation", ja: "脳卒中リハビリテーション", en: "stroke rehabilitation", area: "神経", related: { ja: ["脳梗塞", "片麻痺", "歩行訓練"], en: ["hemiparesis", "gait training", "upper limb"] }, tip: "上肢・歩行・嚥下など、テーマを足して絞ると、読みたい論文が見つかりやすくなります。" },
  { slug: "parkinson-disease", ja: "パーキンソン病", en: "Parkinson disease physical therapy", area: "神経", related: { ja: ["すくみ足", "バランス", "運動療法"], en: ["freezing of gait", "balance", "exercise"] }, tip: "症状（すくみ足・バランス）で絞ると、介入の論文が探しやすくなります。" },
  { slug: "spinal-cord-injury", ja: "脊髄損傷", en: "spinal cord injury rehabilitation", area: "神経", related: { ja: ["脊損", "車椅子", "歩行再建"], en: ["wheelchair", "locomotor training", "neurorehabilitation"] }, tip: "損傷の高さ（頸髄・胸髄）で、論文の内容が変わります。範囲を決めてから探します。" },
  { slug: "cerebral-palsy", ja: "脳性麻痺", en: "cerebral palsy physical therapy", area: "小児", related: { ja: ["痙直型", "粗大運動", "GMFCS"], en: ["spastic", "gross motor function", "GMFCS"] }, tip: "「GMFCS」の分類で、対象を絞った論文が多くあります。" },
  { slug: "cardiac-rehabilitation", ja: "心臓リハビリテーション", en: "cardiac rehabilitation", area: "内部障害", related: { ja: ["心不全", "心筋梗塞", "運動耐容能"], en: ["heart failure", "myocardial infarction", "exercise capacity"] }, tip: "疾患（心不全・心筋梗塞）と、評価（運動耐容能）を足して絞ります。" },
  { slug: "pulmonary-rehabilitation", ja: "呼吸リハビリテーション", en: "pulmonary rehabilitation COPD", area: "内部障害", related: { ja: ["COPD", "慢性閉塞性肺疾患", "呼吸筋トレーニング"], en: ["chronic obstructive pulmonary disease", "inspiratory muscle training"] }, tip: "「COPD」は、日英とも、そのまま検索語になります。" },
  { slug: "sarcopenia-frailty", ja: "サルコペニア・フレイル", en: "sarcopenia frailty exercise older adults", area: "高齢者", related: { ja: ["筋力トレーニング", "栄養", "介護予防"], en: ["resistance training", "nutrition", "prevention"] }, tip: "運動と栄養の両方の論文があります。「運動」「栄養」のどちらを探すのか、先に決めます。" },
  { slug: "fall-prevention", ja: "転倒予防", en: "fall prevention older adults exercise", area: "高齢者", related: { ja: ["バランス", "高齢者", "転倒リスク"], en: ["balance training", "fall risk", "community-dwelling"] }, tip: "対象（地域在住・入院中）で、論文の内容が変わります。対象を足して探します。" },
  { slug: "chronic-pain", ja: "慢性疼痛", en: "chronic pain exercise therapy", area: "痛み", related: { ja: ["痛みの教育", "運動療法", "認知行動"], en: ["pain neuroscience education", "cognitive behavioral", "central sensitization"] }, tip: "「痛みの教育（pain neuroscience education）」など、介入の名前で探すと、絞り込めます。" },
];

export function getTopic(slug: string) {
  return PAPER_TOPICS.find((t) => t.slug === slug);
}
