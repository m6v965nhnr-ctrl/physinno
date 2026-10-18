// 認定理学療法士の分野（21分野）。出典: 日本理学療法士協会
//  ・分野名・英語表記・定義: 「認定・専門理学療法士の分野・英語表記・定義」（PDF） https://www.japanpt.or.jp/pt/lifelonglearning/asset/pdf/ninteisenmon_meishouteigi20221121.pdf
//  ・取得者数: 「各資格の取得状況」（2026年3月31日データ） https://www.japanpt.or.jp/pt/lifelonglearning/statistics/
// 分野の追加・変更や、数字の更新は、公式で確かめてから直す。
export const CERT_FIELDS_CHECKED = "2026年10月18日";
export const CERT_FIELDS_COUNT_DATE = "2026年3月31日";

const SUFFIX = "知識と技能を習得し、一定の経験を有し、安全で適切に実践することができる";

export type CertField = { slug: string; name: string; en: string; def: string; n: number };

export const CERT_FIELDS: CertField[] = [
  { slug: "stroke", name: "脳卒中", en: "Stroke and brain injury", def: `脳卒中による神経障害の理学療法に関する${SUFFIX}`, n: 4286 },
  { slug: "neuromuscular", name: "神経筋障害", en: "Neuromuscular disorders", def: `神経筋疾患による神経筋障害の理学療法に関する${SUFFIX}`, n: 275 },
  { slug: "spinal-cord", name: "脊髄障害", en: "Spinal cord injury", def: `脊髄損傷による神経障害の理学療法に関する${SUFFIX}`, n: 156 },
  { slug: "developmental", name: "発達障害", en: "Developmental disabilities", def: `心身の発達障害の理学療法に関する${SUFFIX}`, n: 444 },
  { slug: "orthopaedic", name: "運動器", en: "Orthopaedic disorders", def: `骨折、外傷、骨関節疾患などによる運動器障害の理学療法に関する${SUFFIX}`, n: 5113 },
  { slug: "amputation", name: "切断", en: "Amputation", def: `壊死、腫瘍、外傷疾患による切断を中心とした理学療法に関する${SUFFIX}`, n: 44 },
  { slug: "sports", name: "スポーツ理学療法", en: "Sports Physical Therapy", def: `スポーツに関連した外傷・障害の理学療法に関する${SUFFIX}`, n: 989 },
  { slug: "manipulative", name: "徒手理学療法", en: "Manipulative Physical Therapy", def: `徒手理学療法に関する${SUFFIX}`, n: 298 },
  { slug: "cardiovascular", name: "循環", en: "Cardiovascular disease", def: `心大血管疾患、循環機能低下などによる循環障害の理学療法に関する${SUFFIX}`, n: 1372 },
  { slug: "pulmonary", name: "呼吸", en: "Pulmonary disease", def: `呼吸器疾患、呼吸機能低下などによる呼吸障害の理学療法に関する${SUFFIX}`, n: 1608 },
  { slug: "metabolic", name: "代謝", en: "Metabolic disease", def: `糖尿病などによる代謝障害の理学療法に関する${SUFFIX}`, n: 504 },
  { slug: "community", name: "地域理学療法", en: "Community based physical therapy", def: `地域・在宅における理学療法に関する${SUFFIX}`, n: 1666 },
  { slug: "health-promotion", name: "健康増進・参加", en: "Health promotion and Participation", def: `健康増進・参加に関する理学療法の${SUFFIX}`, n: 204 },
  { slug: "frailty-prevention", name: "介護予防", en: "Prevention for frail elderly", def: `介護予防ならびに障害予防に関する理学療法の${SUFFIX}`, n: 659 },
  { slug: "prosthetics-orthotics", name: "補装具", en: "Prosthetics and Orthotics and Technical Aids", def: `義肢・装具や福祉機器・用具に関する${SUFFIX}`, n: 222 },
  { slug: "physical-agents", name: "物理療法", en: "Physical agents", def: `光線、電気などの物理的な刺激を生体に適用するための${SUFFIX}`, n: 117 },
  { slug: "wound-care", name: "褥瘡・創傷ケア", en: "Wound care", def: `褥瘡・創傷ケアに関する理学療法の${SUFFIX}`, n: 18 },
  { slug: "pain", name: "疼痛管理", en: "Pain", def: `疼痛に対する理学療法の${SUFFIX}`, n: 26 },
  { slug: "clinical-education", name: "臨床教育", en: "Clinical education", def: `理学療法に関連する臨床教育に必要な${SUFFIX}`, n: 276 },
  { slug: "management", name: "管理・運営", en: "Management", def: `職場の労務管理・運営および衛生管理・運営に関する${SUFFIX}`, n: 584 },
  { slug: "school-education", name: "学校教育", en: "Education for physical therapist", def: "学校教育を行う上での知識と技能を習得し、一定の経験を有し、適切に実践することができる", n: 151 },
];

export const CERT_TOTAL = CERT_FIELDS.reduce((s, f) => s + f.n, 0);

export function certFieldBySlug(slug: string) {
  return CERT_FIELDS.find((f) => f.slug === slug);
}

// 取得者数の多い順での順位（1始まり）
export function certFieldRank(f: CertField) {
  return [...CERT_FIELDS].sort((a, b) => b.n - a.n).findIndex((x) => x.slug === f.slug) + 1;
}
