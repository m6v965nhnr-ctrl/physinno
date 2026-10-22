// 厚生労働省が公開している、理学療法士国家試験の問題・正答のPDF(出典: 厚生労働省ホームページ、公共データ利用規約 PDL1.0)

export type OfficialExam = {
  exam_no: number;
  date: string;
  code: string;
  old?: boolean;
  files?: string[];
};

export const OFFICIAL_EXAMS: OfficialExam[] = [
  { exam_no: 61, date: "2026年2月23日", code: "tp260424" },
  { exam_no: 60, date: "2025年2月24日", code: "tp250428" },
  { exam_no: 59, date: "2024年2月18日", code: "tp240424" },
  { exam_no: 58, date: "2023年2月19日", code: "tp230524" },
  { exam_no: 57, date: "2022年2月20日", code: "tp220421" },
  { exam_no: 56, date: "2021年2月21日", code: "tp210416" },
  { exam_no: 55, date: "2020年2月23日", code: "tp200414" },
  { exam_no: 54, date: "2019年2月24日", code: "tp190415" },
  { exam_no: 53, date: "2018年2月25日", code: "tp180511" },
  { exam_no: 52, date: "2017年2月26日", code: "tp170425" },
  { exam_no: 51, date: "2016年2月28日", code: "tp160411-06", old: true },
  { exam_no: 50, date: "2015年2月22日", code: "tp150511-06", old: true },
  { exam_no: 49, date: "2014年2月23日", code: "tp140512-06", files: ["1a", "1b", "1c", "1d", "1e"] },
];

const BASE = "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics";

export function officialPdfs(e: OfficialExam) {
  const f = (name: string) => `${BASE}/dl/${e.code}-${name}.pdf`;
  if (e.files) {
    const [a1, a2, b1, b2, ans] = e.files;
    return [
      { label: "午前 問題", href: f(a1) },
      { label: "午前 問題（別冊・図）", href: f(a2) },
      { label: "午後 問題", href: f(b1) },
      { label: "午後 問題（別冊・図）", href: f(b2) },
      { label: "正答", href: f(ans) },
    ];
  }
  if (e.old) {
    return [
      { label: "午前 問題", href: f("1am_01") },
      { label: "午前 問題（別冊・図）", href: f("1am_02") },
      { label: "午後 問題", href: f("1pm_01") },
      { label: "午後 問題（別冊・図）", href: f("1pm_02") },
      { label: "正答", href: f("1seitou") },
    ];
  }
  return [
    { label: "午前 問題", href: f("08a_01") },
    { label: "午前 問題（別冊・図）", href: f("08a_02") },
    { label: "午後 問題", href: f("08b_01") },
    { label: "午後 問題（別冊・図）", href: f("08b_02") },
    { label: "正答", href: f("08seitou") },
  ];
}

export function officialPage(e: OfficialExam) {
  return e.old || e.files ? `${BASE}/${e.code}.html` : `${BASE}/${e.code}-08_09.html`;
}
