import type { Category } from "./types";

// 診療報酬の疾患別リハビリテーション料の区分（心大血管疾患・脳血管疾患等・運動器・呼吸器・廃用症候群・がん患者・障害児（者）・難病患者）。
// 中身（疾患）は、運動器・呼吸器・脳血管疾患等（神経系）・廃用症候群から用意している
export const CATEGORIES: Category[] = [
  {
    key: "musculoskeletal",
    name: "運動器リハビリテーション",
    short: "運動器",
    description: "骨・関節・筋・靱帯・神経の疾患や外傷（膝OA、骨折、腰痛、肩、スポーツ外傷など）",
  },
  {
    key: "respiratory",
    name: "呼吸器リハビリテーション",
    short: "呼吸器",
    description: "COPD、肺炎、間質性肺炎、周術期、ICUでの早期離床など",
  },
  {
    key: "cerebrovascular",
    name: "脳血管疾患等リハビリテーション（神経系）",
    short: "脳血管疾患等・神経系",
    description: "脳卒中、パーキンソン病、脊髄損傷など中枢神経・神経筋の疾患",
  },
  {
    key: "disuse",
    name: "廃用症候群リハビリテーション",
    short: "廃用症候群",
    description: "安静や入院で起こる機能低下（筋力低下、起立性低血圧、拘縮、認知症・せん妄を伴う高齢者など）",
  },
  {
    key: "cardiac",
    name: "心大血管疾患リハビリテーション",
    short: "心大血管疾患",
    description: "心筋梗塞、心不全、心臓手術後、大血管疾患など",
    comingSoon: true,
  },
  {
    key: "cancer",
    name: "がん患者リハビリテーション",
    short: "がん患者",
    description: "がんの治療前後の機能維持・回復",
    comingSoon: true,
  },
  {
    key: "disability",
    name: "障害児（者）リハビリテーション",
    short: "障害児（者）",
    description: "脳性麻痺、発達障害、重症心身障害など",
    comingSoon: true,
  },
  {
    key: "intractable",
    name: "難病患者リハビリテーション",
    short: "難病患者",
    description: "ALS、多発性硬化症、脊髄小脳変性症など",
    comingSoon: true,
  },
];

export function getCategory(key: string) {
  return CATEGORIES.find((c) => c.key === key);
}
