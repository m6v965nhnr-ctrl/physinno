// 厚生労働省が公開している、理学療法士国家試験の問題・正答のPDF(出典: 厚生労働省ホームページ、公共データ利用規約 PDL1.0)

export type OfficialExam = {
  exam_no: number;
  date: string;
  code: string;
};

export const OFFICIAL_EXAMS: OfficialExam[] = [
  { exam_no: 61, date: "2026年2月23日", code: "tp260424" },
  { exam_no: 60, date: "2025年2月24日", code: "tp250428" },
  { exam_no: 59, date: "2024年2月18日", code: "tp240424" },
  { exam_no: 58, date: "2023年2月19日", code: "tp230524" },
  { exam_no: 57, date: "2022年2月20日", code: "tp220421" },
];

const BASE = "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics";

export function officialPdfs(e: OfficialExam) {
  const f = (name: string) => `${BASE}/dl/${e.code}-${name}.pdf`;
  return [
    { label: "午前 問題", href: f("08a_01") },
    { label: "午前 問題（別冊・図）", href: f("08a_02") },
    { label: "午後 問題", href: f("08b_01") },
    { label: "午後 問題（別冊・図）", href: f("08b_02") },
    { label: "正答", href: f("08seitou") },
  ];
}

export function officialPage(e: OfficialExam) {
  return `${BASE}/${e.code}-08_09.html`;
}
