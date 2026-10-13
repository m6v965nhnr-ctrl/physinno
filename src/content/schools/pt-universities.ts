// 理学療法士国家試験 大学別の合格状況（大学新卒のみ）。第61回（2026年2月実施・3月23日合格発表）。
// 出典: 旺文社 教育情報センター「第61回 理学療法士・作業療法士 国家試験結果」（2026年4月3日。データは厚生労働省発表資料に基づく）。
// scripts/schools/extract-obunsha.mjs で、PDFから取り出した。数字は、出典のまま（人数・合格率は、大学新卒のみ）。
// 専門学校・短期大学のデータは、公表された資料が確認できていないため、含めていない。

export type PtUniversity = {
  slug: string;
  name: string;
  kind: "国立" | "公立" | "私立";
  takers: number;
  passers: number;
  rate: number;
};

export const PT_EXAM_NO = 61;
export const PT_EXAM_LABEL = "第61回（2026年2月実施）";
// 第61回・理学療法士・大学新卒の、全国の合格率（パーセント）
export const PT_UNIVERSITY_NEW_GRAD_RATE = 96.6;
export const PT_SCHOOL_SOURCE = {
  name: "旺文社 教育情報センター「第61回 理学療法士・作業療法士 国家試験結果」（データは厚生労働省発表資料に基づく）",
  url: "https://eic.obunsha.co.jp/file/educational_info/2026/kokushi/0403_02.pdf",
  published: "2026年4月3日",
};

const RAW: Omit<PtUniversity, "slug">[] = [
 {
  "name": "北海道大学",
  "kind": "国立",
  "takers": 14,
  "passers": 14,
  "rate": 100
 },
 {
  "name": "弘前大学",
  "kind": "国立",
  "takers": 21,
  "passers": 21,
  "rate": 100
 },
 {
  "name": "秋田大学",
  "kind": "国立",
  "takers": 15,
  "passers": 15,
  "rate": 100
 },
 {
  "name": "筑波技術大学",
  "kind": "国立",
  "takers": 5,
  "passers": 2,
  "rate": 40
 },
 {
  "name": "群馬大学",
  "kind": "国立",
  "takers": 20,
  "passers": 20,
  "rate": 100
 },
 {
  "name": "金沢大学",
  "kind": "国立",
  "takers": 18,
  "passers": 18,
  "rate": 100
 },
 {
  "name": "信州大学",
  "kind": "国立",
  "takers": 14,
  "passers": 14,
  "rate": 100
 },
 {
  "name": "名古屋大学",
  "kind": "国立",
  "takers": 18,
  "passers": 18,
  "rate": 100
 },
 {
  "name": "京都大学",
  "kind": "国立",
  "takers": 16,
  "passers": 16,
  "rate": 100
 },
 {
  "name": "神戸大学",
  "kind": "国立",
  "takers": 20,
  "passers": 20,
  "rate": 100
 },
 {
  "name": "広島大学",
  "kind": "国立",
  "takers": 32,
  "passers": 32,
  "rate": 100
 },
 {
  "name": "長崎大学",
  "kind": "国立",
  "takers": 19,
  "passers": 19,
  "rate": 100
 },
 {
  "name": "大分大学",
  "kind": "国立",
  "takers": 28,
  "passers": 28,
  "rate": 100
 },
 {
  "name": "鹿児島大学",
  "kind": "国立",
  "takers": 21,
  "passers": 21,
  "rate": 100
 },
 {
  "name": "札幌医科大学",
  "kind": "公立",
  "takers": 20,
  "passers": 20,
  "rate": 100
 },
 {
  "name": "青森県立保健大学",
  "kind": "公立",
  "takers": 32,
  "passers": 32,
  "rate": 100
 },
 {
  "name": "山形県立保健医療大学",
  "kind": "公立",
  "takers": 19,
  "passers": 18,
  "rate": 94.7
 },
 {
  "name": "福島県立医科大学",
  "kind": "公立",
  "takers": 38,
  "passers": 38,
  "rate": 100
 },
 {
  "name": "茨城県立医療大学",
  "kind": "公立",
  "takers": 43,
  "passers": 42,
  "rate": 97.7
 },
 {
  "name": "埼玉県立大学",
  "kind": "公立",
  "takers": 40,
  "passers": 39,
  "rate": 97.5
 },
 {
  "name": "千葉県立保健医療大学",
  "kind": "公立",
  "takers": 22,
  "passers": 22,
  "rate": 100
 },
 {
  "name": "東京都立大学",
  "kind": "公立",
  "takers": 36,
  "passers": 35,
  "rate": 97.2
 },
 {
  "name": "神奈川県立保健福祉大学",
  "kind": "公立",
  "takers": 22,
  "passers": 21,
  "rate": 95.5
 },
 {
  "name": "大阪公立大学",
  "kind": "公立",
  "takers": 26,
  "passers": 26,
  "rate": 100
 },
 {
  "name": "県立広島大学",
  "kind": "公立",
  "takers": 34,
  "passers": 34,
  "rate": 100
 },
 {
  "name": "日本医療大学",
  "kind": "私立",
  "takers": 77,
  "passers": 76,
  "rate": 98.7
 },
 {
  "name": "北海道医療大学",
  "kind": "私立",
  "takers": 78,
  "passers": 78,
  "rate": 100
 },
 {
  "name": "北海道科学大学",
  "kind": "私立",
  "takers": 46,
  "passers": 45,
  "rate": 97.8
 },
 {
  "name": "北海道千歳リハビリテーション大学",
  "kind": "私立",
  "takers": 73,
  "passers": 73,
  "rate": 100
 },
 {
  "name": "北海道文教大学",
  "kind": "私立",
  "takers": 97,
  "passers": 88,
  "rate": 90.7
 },
 {
  "name": "東北福祉大学",
  "kind": "私立",
  "takers": 44,
  "passers": 44,
  "rate": 100
 },
 {
  "name": "東北文化学園大学",
  "kind": "私立",
  "takers": 64,
  "passers": 63,
  "rate": 98.4
 },
 {
  "name": "医療創生大学",
  "kind": "私立",
  "takers": 58,
  "passers": 55,
  "rate": 94.8
 },
 {
  "name": "つくば国際大学",
  "kind": "私立",
  "takers": 68,
  "passers": 67,
  "rate": 98.5
 },
 {
  "name": "国際医療福祉大学（保健医療）",
  "kind": "私立",
  "takers": 96,
  "passers": 96,
  "rate": 100
 },
 {
  "name": "国際医療福祉大学（成田保健医療）",
  "kind": "私立",
  "takers": 81,
  "passers": 81,
  "rate": 100
 },
 {
  "name": "国際医療福祉大学（小田原保健医療）",
  "kind": "私立",
  "takers": 66,
  "passers": 66,
  "rate": 100
 },
 {
  "name": "国際医療福祉大学（福岡保健医療）",
  "kind": "私立",
  "takers": 61,
  "passers": 61,
  "rate": 100
 },
 {
  "name": "群馬医療福祉大学",
  "kind": "私立",
  "takers": 39,
  "passers": 39,
  "rate": 100
 },
 {
  "name": "群馬パース大学",
  "kind": "私立",
  "takers": 65,
  "passers": 63,
  "rate": 96.9
 },
 {
  "name": "高崎健康福祉大学",
  "kind": "私立",
  "takers": 48,
  "passers": 47,
  "rate": 97.9
 },
 {
  "name": "埼玉医科大学",
  "kind": "私立",
  "takers": 47,
  "passers": 47,
  "rate": 100
 },
 {
  "name": "東都大学",
  "kind": "私立",
  "takers": 58,
  "passers": 58,
  "rate": 100
 },
 {
  "name": "日本医療科学大学",
  "kind": "私立",
  "takers": 71,
  "passers": 68,
  "rate": 95.8
 },
 {
  "name": "日本保健医療大学",
  "kind": "私立",
  "takers": 29,
  "passers": 26,
  "rate": 89.7
 },
 {
  "name": "人間総合科学大学",
  "kind": "私立",
  "takers": 24,
  "passers": 21,
  "rate": 87.5
 },
 {
  "name": "植草学園大学",
  "kind": "私立",
  "takers": 32,
  "passers": 32,
  "rate": 100
 },
 {
  "name": "BC東京医療大学",
  "kind": "私立",
  "takers": 67,
  "passers": 66,
  "rate": 98.5
 },
 {
  "name": "城西国際大学",
  "kind": "私立",
  "takers": 43,
  "passers": 43,
  "rate": 100
 },
 {
  "name": "杏林大学",
  "kind": "私立",
  "takers": 55,
  "passers": 55,
  "rate": 100
 },
 {
  "name": "順天堂大学",
  "kind": "私立",
  "takers": 113,
  "passers": 113,
  "rate": 100
 },
 {
  "name": "昭和医科大学",
  "kind": "私立",
  "takers": 29,
  "passers": 29,
  "rate": 100
 },
 {
  "name": "帝京大学（福岡医療技術）",
  "kind": "私立",
  "takers": 48,
  "passers": 45,
  "rate": 93.8
 },
 {
  "name": "帝京科学大学（医療科学－東京理学療法）",
  "kind": "私立",
  "takers": 67,
  "passers": 63,
  "rate": 94
 },
 {
  "name": "帝京科学大学（医療科学）",
  "kind": "私立",
  "takers": 69,
  "passers": 66,
  "rate": 95.7
 },
 {
  "name": "帝京平成大学（健康メディカル）",
  "kind": "私立",
  "takers": 95,
  "passers": 93,
  "rate": 97.9
 },
 {
  "name": "帝京平成大学（健康医療スポーツ）",
  "kind": "私立",
  "takers": 80,
  "passers": 80,
  "rate": 100
 },
 {
  "name": "東京医療学院大学",
  "kind": "私立",
  "takers": 78,
  "passers": 66,
  "rate": 84.6
 },
 {
  "name": "東京家政大学",
  "kind": "私立",
  "takers": 56,
  "passers": 47,
  "rate": 83.9
 },
 {
  "name": "東京工科大学",
  "kind": "私立",
  "takers": 69,
  "passers": 69,
  "rate": 100
 },
 {
  "name": "東京国際大学",
  "kind": "私立",
  "takers": 56,
  "passers": 53,
  "rate": 94.6
 },
 {
  "name": "文京学院大学",
  "kind": "私立",
  "takers": 76,
  "passers": 66,
  "rate": 86.8
 },
 {
  "name": "目白大学",
  "kind": "私立",
  "takers": 53,
  "passers": 51,
  "rate": 96.2
 },
 {
  "name": "北里大学",
  "kind": "私立",
  "takers": 45,
  "passers": 45,
  "rate": 100
 },
 {
  "name": "湘南医療大学",
  "kind": "私立",
  "takers": 36,
  "passers": 36,
  "rate": 100
 },
 {
  "name": "新潟医療福祉大学",
  "kind": "私立",
  "takers": 115,
  "passers": 115,
  "rate": 100
 },
 {
  "name": "新潟リハビリテーション大学",
  "kind": "私立",
  "takers": 30,
  "passers": 29,
  "rate": 96.7
 },
 {
  "name": "金城大学",
  "kind": "私立",
  "takers": 65,
  "passers": 65,
  "rate": 100
 },
 {
  "name": "福井医療大学",
  "kind": "私立",
  "takers": 40,
  "passers": 39,
  "rate": 97.5
 },
 {
  "name": "健康科学大学",
  "kind": "私立",
  "takers": 57,
  "passers": 55,
  "rate": 96.5
 },
 {
  "name": "長野保健医療大学",
  "kind": "私立",
  "takers": 43,
  "passers": 43,
  "rate": 100
 },
 {
  "name": "岐阜保健大学",
  "kind": "私立",
  "takers": 51,
  "passers": 51,
  "rate": 100
 },
 {
  "name": "中部学院大学",
  "kind": "私立",
  "takers": 42,
  "passers": 41,
  "rate": 97.6
 },
 {
  "name": "聖隷クリストファー大学",
  "kind": "私立",
  "takers": 40,
  "passers": 40,
  "rate": 100
 },
 {
  "name": "常葉大学（健康科学）",
  "kind": "私立",
  "takers": 50,
  "passers": 46,
  "rate": 92
 },
 {
  "name": "常葉大学（保健医療）",
  "kind": "私立",
  "takers": 33,
  "passers": 33,
  "rate": 100
 },
 {
  "name": "星城大学",
  "kind": "私立",
  "takers": 35,
  "passers": 33,
  "rate": 94.3
 },
 {
  "name": "中部大学",
  "kind": "私立",
  "takers": 42,
  "passers": 39,
  "rate": 92.9
 },
 {
  "name": "豊橋創造大学",
  "kind": "私立",
  "takers": 48,
  "passers": 48,
  "rate": 100
 },
 {
  "name": "名古屋葵大学",
  "kind": "私立",
  "takers": 35,
  "passers": 30,
  "rate": 85.7
 },
 {
  "name": "名古屋学院大学",
  "kind": "私立",
  "takers": 67,
  "passers": 65,
  "rate": 97
 },
 {
  "name": "日本福祉大学",
  "kind": "私立",
  "takers": 38,
  "passers": 37,
  "rate": 97.4
 },
 {
  "name": "藤田医科大学",
  "kind": "私立",
  "takers": 78,
  "passers": 78,
  "rate": 100
 },
 {
  "name": "鈴鹿医療科学大学",
  "kind": "私立",
  "takers": 41,
  "passers": 39,
  "rate": 95.1
 },
 {
  "name": "京都橘大学",
  "kind": "私立",
  "takers": 55,
  "passers": 55,
  "rate": 100
 },
 {
  "name": "佛教大学",
  "kind": "私立",
  "takers": 36,
  "passers": 36,
  "rate": 100
 },
 {
  "name": "藍野大学",
  "kind": "私立",
  "takers": 99,
  "passers": 98,
  "rate": 99
 },
 {
  "name": "和泉大学",
  "kind": "私立",
  "takers": 36,
  "passers": 34,
  "rate": 94.4
 },
 {
  "name": "大阪電気通信大学",
  "kind": "私立",
  "takers": 40,
  "passers": 40,
  "rate": 100
 },
 {
  "name": "大阪人間科学大学",
  "kind": "私立",
  "takers": 42,
  "passers": 40,
  "rate": 95.2
 },
 {
  "name": "大阪保健医療大学",
  "kind": "私立",
  "takers": 64,
  "passers": 64,
  "rate": 100
 },
 {
  "name": "大阪行岡医療大学",
  "kind": "私立",
  "takers": 39,
  "passers": 31,
  "rate": 79.5
 },
 {
  "name": "関西医科大学",
  "kind": "私立",
  "takers": 52,
  "passers": 52,
  "rate": 100
 },
 {
  "name": "関西医療大学",
  "kind": "私立",
  "takers": 62,
  "passers": 61,
  "rate": 98.4
 },
 {
  "name": "関西福祉科学大学",
  "kind": "私立",
  "takers": 73,
  "passers": 69,
  "rate": 94.5
 },
 {
  "name": "四條畷学園大学",
  "kind": "私立",
  "takers": 33,
  "passers": 33,
  "rate": 100
 },
 {
  "name": "森ノ宮医療大学",
  "kind": "私立",
  "takers": 71,
  "passers": 71,
  "rate": 100
 },
 {
  "name": "大和大学",
  "kind": "私立",
  "takers": 38,
  "passers": 38,
  "rate": 100
 },
 {
  "name": "甲南女子大学",
  "kind": "私立",
  "takers": 42,
  "passers": 41,
  "rate": 97.6
 },
 {
  "name": "神戸学院大学",
  "kind": "私立",
  "takers": 33,
  "passers": 33,
  "rate": 100
 },
 {
  "name": "神戸国際大学",
  "kind": "私立",
  "takers": 65,
  "passers": 63,
  "rate": 96.9
 },
 {
  "name": "宝塚医療大学（保健医療）",
  "kind": "私立",
  "takers": 52,
  "passers": 47,
  "rate": 90.4
 },
 {
  "name": "宝塚医療大学（和歌山保健医療）",
  "kind": "私立",
  "takers": 63,
  "passers": 62,
  "rate": 98.4
 },
 {
  "name": "姫路獨協大学",
  "kind": "私立",
  "takers": 23,
  "passers": 23,
  "rate": 100
 },
 {
  "name": "兵庫医科大学",
  "kind": "私立",
  "takers": 45,
  "passers": 45,
  "rate": 100
 },
 {
  "name": "畿央大学",
  "kind": "私立",
  "takers": 75,
  "passers": 75,
  "rate": 100
 },
 {
  "name": "奈良学園大学",
  "kind": "私立",
  "takers": 47,
  "passers": 41,
  "rate": 87.2
 },
 {
  "name": "川崎医療福祉大学",
  "kind": "私立",
  "takers": 74,
  "passers": 73,
  "rate": 98.6
 },
 {
  "name": "吉備国際大学",
  "kind": "私立",
  "takers": 27,
  "passers": 25,
  "rate": 92.6
 },
 {
  "name": "広島国際大学",
  "kind": "私立",
  "takers": 66,
  "passers": 66,
  "rate": 100
 },
 {
  "name": "広島都市学園大学",
  "kind": "私立",
  "takers": 53,
  "passers": 52,
  "rate": 98.1
 },
 {
  "name": "徳島文理大学",
  "kind": "私立",
  "takers": 61,
  "passers": 59,
  "rate": 96.7
 },
 {
  "name": "九州栄養福祉大学",
  "kind": "私立",
  "takers": 77,
  "passers": 76,
  "rate": 98.7
 },
 {
  "name": "福岡国際医療福祉大学",
  "kind": "私立",
  "takers": 38,
  "passers": 38,
  "rate": 100
 },
 {
  "name": "令和健康科学大学",
  "kind": "私立",
  "takers": 56,
  "passers": 55,
  "rate": 98.2
 },
 {
  "name": "西九州大学",
  "kind": "私立",
  "takers": 31,
  "passers": 26,
  "rate": 83.9
 },
 {
  "name": "九州看護福祉大学",
  "kind": "私立",
  "takers": 38,
  "passers": 28,
  "rate": 73.7
 },
 {
  "name": "熊本保健科学大学",
  "kind": "私立",
  "takers": 57,
  "passers": 57,
  "rate": 100
 },
 {
  "name": "アール医療専門職大学",
  "kind": "私立",
  "takers": 36,
  "passers": 31,
  "rate": 86.1
 },
 {
  "name": "東京保健医療専門職大学",
  "kind": "私立",
  "takers": 68,
  "passers": 54,
  "rate": 79.4
 },
 {
  "name": "びわこリハビリテーション専門職大学",
  "kind": "私立",
  "takers": 58,
  "passers": 54,
  "rate": 93.1
 },
 {
  "name": "和歌山リハビリテーション専門職大学",
  "kind": "私立",
  "takers": 37,
  "passers": 26,
  "rate": 70.3
 },
 {
  "name": "岡山医療専門職大学",
  "kind": "私立",
  "takers": 42,
  "passers": 40,
  "rate": 95.2
 },
 {
  "name": "高知リハビリテーション専門職大学",
  "kind": "私立",
  "takers": 74,
  "passers": 66,
  "rate": 89.2
 }
];

export const PT_UNIVERSITIES: PtUniversity[] = RAW.map((u) => ({ ...u, slug: u.name }));

export function getPtUniversity(slug: string): PtUniversity | undefined {
  let decoded = slug;
  try {
    decoded = decodeURIComponent(slug);
  } catch {
    // そのまま比べる
  }
  return PT_UNIVERSITIES.find((u) => u.slug === decoded);
}
