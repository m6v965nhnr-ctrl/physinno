// 研修・学会・講習の「主催団体」の一覧（Events の絞り込みに使う）。
// 分類は、団体の分野ごと。団体名・別名は、イベントの主催者名・題名との照合に使う。
// url は、公式サイト（取得できたものだけ。毎日の自動取得の対象）。名称・URLは、掲載前に確認すること（統合・改称がありうる）。
export type SeminarOrg = {
  code: string;
  name: string;
  group: string;
  url?: string;
  aliases: string[];
};

export const ORG_GROUPS: string[] = [
  "総合・職能団体",
  "理学療法専門分野",
  "離床・急性期・集中治療",
  "呼吸器・呼吸リハビリテーション",
  "運動器・整形外科・疼痛",
  "脳卒中・神経",
  "心臓・循環器",
  "スポーツ・運動科学",
  "小児・発達",
  "リハビリテーション全般・多職種連携",
  "がん・緩和ケア・リンパ浮腫",
  "高齢者・介護・地域包括ケア",
  "物理療法・基礎医学",
  "ウィメンズヘルス・産前産後",
  "糖尿病・代謝・栄養・嚥下",
  "義肢装具・福祉用具",
  "精神・心理・産業保健・予防",
  "研修・資格・実技講習"
];

export const SEMINAR_ORGS: SeminarOrg[] = [
  {
    "code": "japanpt",
    "name": "日本理学療法士協会",
    "group": "総合・職能団体",
    "url": "https://www.japanpt.or.jp/",
    "aliases": [
      "日本理学療法士協会",
      "理学療法士協会"
    ]
  },
  {
    "code": "jspt",
    "name": "日本理学療法学会連合",
    "group": "総合・職能団体",
    "url": "https://www.jspt.or.jp/",
    "aliases": [
      "日本理学療法学会連合",
      "理学療法学会連合"
    ]
  },
  {
    "code": "pref-pt",
    "name": "都道府県理学療法士会",
    "group": "総合・職能団体",
    "aliases": [
      "都道府県理学療法士会",
      "理学療法士会"
    ]
  },
  {
    "code": "ptrenmei",
    "name": "日本理学療法士連盟",
    "group": "総合・職能団体",
    "url": "https://www.pt-renmei.jp/",
    "aliases": [
      "日本理学療法士連盟",
      "理学療法士連盟"
    ]
  },
  {
    "code": "zendai",
    "name": "全国大学理学療法学教育学会",
    "group": "総合・職能団体",
    "url": "https://jaunpte.site/",
    "aliases": [
      "全国大学理学療法学教育学会",
      "大学理学療法学教育学会"
    ]
  },
  {
    "code": "zenrikou",
    "name": "全国リハビリテーション学校協会",
    "group": "総合・職能団体",
    "aliases": [
      "全国リハビリテーション学校協会",
      "リハビリテーション学校協会"
    ]
  },
  {
    "code": "ptstudent",
    "name": "日本理学療法学生協会",
    "group": "総合・職能団体",
    "url": "http://jptsa.web.fc2.com/",
    "aliases": [
      "日本理学療法学生協会",
      "理学療法学生協会"
    ]
  },
  {
    "code": "msk-pt",
    "name": "日本運動器理学療法学会",
    "group": "理学療法専門分野",
    "url": "https://www.jspt.or.jp/jsmspt/",
    "aliases": [
      "日本運動器理学療法学会",
      "運動器理学療法",
      "運動器理学療法学会"
    ]
  },
  {
    "code": "resp-pt",
    "name": "日本呼吸理学療法学会",
    "group": "理学療法専門分野",
    "url": "https://www.jspt.or.jp/jsrpt/",
    "aliases": [
      "日本呼吸理学療法学会",
      "呼吸理学療法",
      "呼吸理学療法学会"
    ]
  },
  {
    "code": "neuro-pt",
    "name": "日本神経理学療法学会",
    "group": "理学療法専門分野",
    "url": "https://www.jspt.or.jp/jsnpt/",
    "aliases": [
      "日本神経理学療法学会",
      "神経理学療法",
      "神経理学療法学会"
    ]
  },
  {
    "code": "cardio-pt",
    "name": "日本循環器理学療法学会",
    "group": "理学療法専門分野",
    "url": "https://www.jspt.or.jp/jscvpt/",
    "aliases": [
      "日本循環器理学療法学会",
      "循環器理学療法",
      "循環器理学療法学会"
    ]
  },
  {
    "code": "sports-pt",
    "name": "日本スポーツ理学療法学会",
    "group": "理学療法専門分野",
    "url": "https://www.jspt.or.jp/jsspt/",
    "aliases": [
      "日本スポーツ理学療法学会",
      "スポーツ理学療法",
      "スポーツ理学療法学会"
    ]
  },
  {
    "code": "pediatric-pt",
    "name": "日本小児理学療法学会",
    "group": "理学療法専門分野",
    "url": "https://www.jspt.or.jp/jsppt/",
    "aliases": [
      "日本小児理学療法学会",
      "小児理学療法",
      "小児理学療法学会"
    ]
  },
  {
    "code": "cancer-pt",
    "name": "日本がん・リンパ浮腫理学療法学会",
    "group": "理学療法専門分野",
    "url": "https://www.jspt.or.jp/jspto/",
    "aliases": [
      "日本がん・リンパ浮腫理学療法学会",
      "がん・リンパ浮腫",
      "リンパ浮腫理学療法",
      "がん・リンパ浮腫理学療法学会"
    ]
  },
  {
    "code": "diabetes-pt",
    "name": "日本糖尿病理学療法学会",
    "group": "理学療法専門分野",
    "url": "https://www.jspt.or.jp/jsptdm/",
    "aliases": [
      "日本糖尿病理学療法学会",
      "糖尿病理学療法",
      "糖尿病理学療法学会"
    ]
  },
  {
    "code": "prevent-pt",
    "name": "日本予防理学療法学会",
    "group": "理学療法専門分野",
    "url": "https://www.jspt.or.jp/prevention/",
    "aliases": [
      "日本予防理学療法学会",
      "予防理学療法",
      "予防理学療法学会"
    ]
  },
  {
    "code": "community-pt",
    "name": "日本地域理学療法学会",
    "group": "理学療法専門分野",
    "url": "https://www.jspt.or.jp/jsccpt/",
    "aliases": [
      "日本地域理学療法学会",
      "地域理学療法",
      "地域理学療法学会"
    ]
  },
  {
    "code": "basic-pt",
    "name": "日本基礎理学療法学会",
    "group": "理学療法専門分野",
    "url": "https://www.jspt.or.jp/jsptf/",
    "aliases": [
      "日本基礎理学療法学会",
      "基礎理学療法",
      "基礎理学療法学会"
    ]
  },
  {
    "code": "physical-agent",
    "name": "日本物理療法研究会",
    "group": "理学療法専門分野",
    "url": "https://www.jspt.or.jp/jseapt/",
    "aliases": [
      "日本物理療法研究会",
      "物理療法研究会"
    ]
  },
  {
    "code": "msk-manual",
    "name": "日本筋骨格系徒手理学療法研究会",
    "group": "理学療法専門分野",
    "url": "https://www.jspt.or.jp/jfompt/",
    "aliases": [
      "日本筋骨格系徒手理学療法研究会",
      "筋骨格系徒手理学療法研究会"
    ]
  },
  {
    "code": "sangyo-pt",
    "name": "日本産業理学療法研究会",
    "group": "理学療法専門分野",
    "url": "https://www.jspt.or.jp/occhealth/",
    "aliases": [
      "日本産業理学療法研究会",
      "産業理学療法",
      "産業理学療法研究会"
    ]
  },
  {
    "code": "mental-pt",
    "name": "日本精神・心理領域理学療法学会",
    "group": "理学療法専門分野",
    "url": "https://www.jspt.or.jp/ioptmh/",
    "aliases": [
      "日本精神・心理領域理学療法学会",
      "精神・心理領域",
      "精神・心理領域理学療法学会"
    ]
  },
  {
    "code": "edu-pt",
    "name": "日本理学療法教育学会",
    "group": "理学療法専門分野",
    "url": "https://www.jspt.or.jp/jspte/",
    "aliases": [
      "日本理学療法教育学会",
      "理学療法教育",
      "理学療法教育学会"
    ]
  },
  {
    "code": "mgmt-pt",
    "name": "日本理学療法管理学会",
    "group": "理学療法専門分野",
    "url": "https://www.jspt.or.jp/kanri/",
    "aliases": [
      "日本理学療法管理学会",
      "理学療法管理",
      "理学療法管理学会"
    ]
  },
  {
    "code": "assist-pt",
    "name": "日本支援工学理学療法学会",
    "group": "理学療法専門分野",
    "url": "https://www.jspt.or.jp/jptsat/",
    "aliases": [
      "日本支援工学理学療法学会",
      "支援工学",
      "支援工学理学療法学会"
    ]
  },
  {
    "code": "nutri-pt",
    "name": "日本栄養・嚥下理学療法学会",
    "group": "理学療法専門分野",
    "url": "https://www.jspt.or.jp/jsptns/",
    "aliases": [
      "日本栄養・嚥下理学療法学会",
      "栄養・嚥下理学療法",
      "栄養・嚥下理学療法学会"
    ]
  },
  {
    "code": "womens-pt",
    "name": "日本ウィメンズヘルス・メンズヘルス理学療法学会",
    "group": "理学療法専門分野",
    "url": "https://www.jspt.or.jp/jsptwmh/",
    "aliases": [
      "日本ウィメンズヘルス・メンズヘルス理学療法学会",
      "ウィメンズヘルス",
      "メンズヘルス",
      "ウィメンズヘルス・メンズヘルス理学療法学会"
    ]
  },
  {
    "code": "rishou",
    "name": "日本離床学会",
    "group": "離床・急性期・集中治療",
    "url": "https://www.rishou.org/",
    "aliases": [
      "日本離床学会",
      "離床学会"
    ]
  },
  {
    "code": "jsicm",
    "name": "日本集中治療医学会",
    "group": "離床・急性期・集中治療",
    "url": "https://www.jsicm.org/",
    "aliases": [
      "日本集中治療医学会",
      "集中治療医学会"
    ]
  },
  {
    "code": "jaam",
    "name": "日本救急医学会",
    "group": "離床・急性期・集中治療",
    "url": "https://www.jaam.jp/",
    "aliases": [
      "日本救急医学会",
      "救急医学会"
    ]
  },
  {
    "code": "jrcm",
    "name": "日本呼吸療法医学会",
    "group": "離床・急性期・集中治療",
    "aliases": [
      "日本呼吸療法医学会",
      "呼吸療法医学会"
    ]
  },
  {
    "code": "jsem",
    "name": "日本臨床救急医学会",
    "group": "離床・急性期・集中治療",
    "url": "https://jsem.me/",
    "aliases": [
      "日本臨床救急医学会",
      "臨床救急医学会"
    ]
  },
  {
    "code": "critical-nurse",
    "name": "日本クリティカルケア看護学会",
    "group": "離床・急性期・集中治療",
    "aliases": [
      "日本クリティカルケア看護学会",
      "クリティカルケア看護",
      "クリティカルケア看護学会"
    ]
  },
  {
    "code": "acute-rehab",
    "name": "日本急性期リハビリテーション医学会",
    "group": "離床・急性期・集中治療",
    "aliases": [
      "日本急性期リハビリテーション医学会",
      "急性期リハビリテーション医学会"
    ]
  },
  {
    "code": "pics",
    "name": "日本PICS研究会",
    "group": "離床・急性期・集中治療",
    "aliases": [
      "日本PICS研究会",
      "PICS研究会"
    ]
  },
  {
    "code": "jsce",
    "name": "日本臨床工学会",
    "group": "離床・急性期・集中治療",
    "aliases": [
      "日本臨床工学会",
      "臨床工学会"
    ]
  },
  {
    "code": "jspu",
    "name": "日本褥瘡学会",
    "group": "離床・急性期・集中治療",
    "url": "https://www.jspu.org/",
    "aliases": [
      "日本褥瘡学会",
      "褥瘡学会"
    ]
  },
  {
    "code": "jrs",
    "name": "日本呼吸器学会",
    "group": "呼吸器・呼吸リハビリテーション",
    "url": "https://www.jrs.or.jp/",
    "aliases": [
      "日本呼吸器学会",
      "呼吸器学会"
    ]
  },
  {
    "code": "jsrcr",
    "name": "日本呼吸ケア・リハビリテーション学会",
    "group": "呼吸器・呼吸リハビリテーション",
    "aliases": [
      "日本呼吸ケア・リハビリテーション学会",
      "呼吸ケア・リハビリテーション学会"
    ]
  },
  {
    "code": "asthma",
    "name": "日本喘息学会",
    "group": "呼吸器・呼吸リハビリテーション",
    "aliases": [
      "日本喘息学会",
      "喘息学会"
    ]
  },
  {
    "code": "kekkaku",
    "name": "日本結核・非結核性抗酸菌症学会",
    "group": "呼吸器・呼吸リハビリテーション",
    "url": "https://www.kekkaku.gr.jp/",
    "aliases": [
      "日本結核・非結核性抗酸菌症学会",
      "結核・非結核性抗酸菌症学会"
    ]
  },
  {
    "code": "lung-cancer",
    "name": "日本肺癌学会",
    "group": "呼吸器・呼吸リハビリテーション",
    "url": "https://www.haigan.gr.jp/",
    "aliases": [
      "日本肺癌学会",
      "肺癌学会"
    ]
  },
  {
    "code": "resp-surgery",
    "name": "日本呼吸器外科学会",
    "group": "呼吸器・呼吸リハビリテーション",
    "url": "https://jacsurg.gr.jp/",
    "aliases": [
      "日本呼吸器外科学会",
      "呼吸器外科学会"
    ]
  },
  {
    "code": "allergy",
    "name": "日本アレルギー学会",
    "group": "呼吸器・呼吸リハビリテーション",
    "url": "https://www.jsaweb.jp/",
    "aliases": [
      "日本アレルギー学会",
      "アレルギー学会"
    ]
  },
  {
    "code": "sleep",
    "name": "日本睡眠学会",
    "group": "呼吸器・呼吸リハビリテーション",
    "url": "https://www.jssr.jp/",
    "aliases": [
      "日本睡眠学会",
      "睡眠学会"
    ]
  },
  {
    "code": "clin-physiol",
    "name": "日本臨床生理学会",
    "group": "呼吸器・呼吸リハビリテーション",
    "aliases": [
      "日本臨床生理学会",
      "臨床生理学会"
    ]
  },
  {
    "code": "joa",
    "name": "日本整形外科学会",
    "group": "運動器・整形外科・疼痛",
    "url": "https://www.joa.or.jp/",
    "aliases": [
      "日本整形外科学会",
      "整形外科学会"
    ]
  },
  {
    "code": "undouki-kagaku",
    "name": "日本運動器科学会",
    "group": "運動器・整形外科・疼痛",
    "aliases": [
      "日本運動器科学会",
      "運動器科学会"
    ]
  },
  {
    "code": "jcoa",
    "name": "日本臨床整形外科学会",
    "group": "運動器・整形外科・疼痛",
    "aliases": [
      "日本臨床整形外科学会",
      "臨床整形外科学会"
    ]
  },
  {
    "code": "shoulder",
    "name": "日本肩関節学会",
    "group": "運動器・整形外科・疼痛",
    "aliases": [
      "日本肩関節学会",
      "肩関節学会"
    ]
  },
  {
    "code": "knee",
    "name": "日本膝関節学会",
    "group": "運動器・整形外科・疼痛",
    "aliases": [
      "日本膝関節学会",
      "膝関節学会"
    ]
  },
  {
    "code": "hip",
    "name": "日本股関節学会",
    "group": "運動器・整形外科・疼痛",
    "aliases": [
      "日本股関節学会",
      "股関節学会"
    ]
  },
  {
    "code": "back-pain",
    "name": "日本腰痛学会",
    "group": "運動器・整形外科・疼痛",
    "aliases": [
      "日本腰痛学会",
      "腰痛学会"
    ]
  },
  {
    "code": "spine",
    "name": "日本脊椎脊髄病学会",
    "group": "運動器・整形外科・疼痛",
    "url": "https://ssl.jssr.gr.jp/",
    "aliases": [
      "日本脊椎脊髄病学会",
      "脊椎脊髄病学会"
    ]
  },
  {
    "code": "fracture",
    "name": "日本骨折治療学会",
    "group": "運動器・整形外科・疼痛",
    "aliases": [
      "日本骨折治療学会",
      "骨折治療学会"
    ]
  },
  {
    "code": "osteoporosis",
    "name": "日本骨粗鬆症学会",
    "group": "運動器・整形外科・疼痛",
    "url": "http://www.josteo.com/",
    "aliases": [
      "日本骨粗鬆症学会",
      "骨粗鬆症学会"
    ]
  },
  {
    "code": "bone-metab",
    "name": "日本骨代謝学会",
    "group": "運動器・整形外科・疼痛",
    "url": "https://jsbmr.umin.jp/",
    "aliases": [
      "日本骨代謝学会",
      "骨代謝学会"
    ]
  },
  {
    "code": "foot-surgery",
    "name": "日本足の外科学会",
    "group": "運動器・整形外科・疼痛",
    "aliases": [
      "日本足の外科学会",
      "足の外科学会"
    ]
  },
  {
    "code": "hand-surgery",
    "name": "日本手外科学会",
    "group": "運動器・整形外科・疼痛",
    "url": "https://www.jssh.or.jp/",
    "aliases": [
      "日本手外科学会",
      "手外科学会"
    ]
  },
  {
    "code": "elbow",
    "name": "日本肘関節学会",
    "group": "運動器・整形外科・疼痛",
    "aliases": [
      "日本肘関節学会",
      "肘関節学会"
    ]
  },
  {
    "code": "arthroplasty",
    "name": "日本人工関節学会",
    "group": "運動器・整形外科・疼痛",
    "aliases": [
      "日本人工関節学会",
      "人工関節学会"
    ]
  },
  {
    "code": "josks",
    "name": "日本関節鏡・膝・スポーツ整形外科学会",
    "group": "運動器・整形外科・疼痛",
    "aliases": [
      "日本関節鏡・膝・スポーツ整形外科学会",
      "関節鏡・膝・スポーツ整形外科学会"
    ]
  },
  {
    "code": "pain",
    "name": "日本疼痛学会",
    "group": "運動器・整形外科・疼痛",
    "aliases": [
      "日本疼痛学会",
      "疼痛学会"
    ]
  },
  {
    "code": "pain-clinic",
    "name": "日本ペインクリニック学会",
    "group": "運動器・整形外科・疼痛",
    "url": "https://www.jspc.gr.jp/",
    "aliases": [
      "日本ペインクリニック学会",
      "ペインクリニック学会"
    ]
  },
  {
    "code": "rheuma",
    "name": "日本リウマチ学会",
    "group": "運動器・整形外科・疼痛",
    "url": "https://www.ryumachi-jp.com/",
    "aliases": [
      "日本リウマチ学会",
      "リウマチ学会"
    ]
  },
  {
    "code": "rheuma-rehab",
    "name": "日本リウマチリハビリテーション研究会",
    "group": "運動器・整形外科・疼痛",
    "aliases": [
      "日本リウマチリハビリテーション研究会",
      "リウマチリハビリテーション研究会"
    ]
  },
  {
    "code": "shoes",
    "name": "日本靴医学会",
    "group": "運動器・整形外科・疼痛",
    "aliases": [
      "日本靴医学会",
      "靴医学会"
    ]
  },
  {
    "code": "jsts",
    "name": "日本脳卒中学会",
    "group": "脳卒中・神経",
    "url": "https://www.jsts.gr.jp/",
    "aliases": [
      "日本脳卒中学会",
      "脳卒中学会"
    ]
  },
  {
    "code": "neurosurgery",
    "name": "日本脳神経外科学会",
    "group": "脳卒中・神経",
    "url": "https://jns-official.jp/",
    "aliases": [
      "日本脳神経外科学会",
      "脳神経外科学会"
    ]
  },
  {
    "code": "neurology",
    "name": "日本神経学会",
    "group": "脳卒中・神経",
    "url": "https://www.neurology-jp.org/",
    "aliases": [
      "日本神経学会",
      "神経学会"
    ]
  },
  {
    "code": "neuro-therapy",
    "name": "日本神経治療学会",
    "group": "脳卒中・神経",
    "url": "https://www.jsnt.gr.jp/",
    "aliases": [
      "日本神経治療学会",
      "神経治療学会"
    ]
  },
  {
    "code": "higher-brain",
    "name": "日本高次脳機能障害学会",
    "group": "脳卒中・神経",
    "url": "http://www.higherbrain.or.jp/",
    "aliases": [
      "日本高次脳機能障害学会",
      "高次脳機能障害学会"
    ]
  },
  {
    "code": "aphasia",
    "name": "日本失語症学会",
    "group": "脳卒中・神経",
    "url": "https://www.higherbrain.or.jp/",
    "aliases": [
      "日本失語症学会",
      "失語症学会",
      "日本高次脳機能障害学会"
    ]
  },
  {
    "code": "neuro-rehab",
    "name": "日本ニューロリハビリテーション学会",
    "group": "脳卒中・神経",
    "aliases": [
      "日本ニューロリハビリテーション学会",
      "ニューロリハビリテーション学会"
    ]
  },
  {
    "code": "neuro-rehab2",
    "name": "日本神経リハビリテーション学会",
    "group": "脳卒中・神経",
    "aliases": [
      "日本神経リハビリテーション学会",
      "神経リハビリテーション学会"
    ]
  },
  {
    "code": "parkinson",
    "name": "日本パーキンソン病・運動障害疾患学会",
    "group": "脳卒中・神経",
    "aliases": [
      "日本パーキンソン病・運動障害疾患学会",
      "パーキンソン病・運動障害疾患学会"
    ]
  },
  {
    "code": "epilepsy",
    "name": "日本てんかん学会",
    "group": "脳卒中・神経",
    "url": "https://jes-jp.org/",
    "aliases": [
      "日本てんかん学会",
      "てんかん学会"
    ]
  },
  {
    "code": "dementia",
    "name": "日本認知症学会",
    "group": "脳卒中・神経",
    "url": "https://dementia-japan.org/",
    "aliases": [
      "日本認知症学会",
      "認知症学会"
    ]
  },
  {
    "code": "botulinum",
    "name": "日本ボツリヌス治療学会",
    "group": "脳卒中・神経",
    "aliases": [
      "日本ボツリヌス治療学会",
      "ボツリヌス治療学会"
    ]
  },
  {
    "code": "clin-neurophys",
    "name": "日本臨床神経生理学会",
    "group": "脳卒中・神経",
    "url": "https://square.umin.ac.jp/JSCN/index.html",
    "aliases": [
      "日本臨床神経生理学会",
      "臨床神経生理学会"
    ]
  },
  {
    "code": "spinal-cord",
    "name": "日本脊髄障害医学会",
    "group": "脳卒中・神経",
    "aliases": [
      "日本脊髄障害医学会",
      "脊髄障害医学会"
    ]
  },
  {
    "code": "jacr",
    "name": "日本心臓リハビリテーション学会",
    "group": "心臓・循環器",
    "url": "https://www.jacr.jp/",
    "aliases": [
      "日本心臓リハビリテーション学会",
      "心臓リハビリテーション学会"
    ]
  },
  {
    "code": "jcs",
    "name": "日本循環器学会",
    "group": "心臓・循環器",
    "url": "https://www.j-circ.or.jp/",
    "aliases": [
      "日本循環器学会",
      "循環器学会"
    ]
  },
  {
    "code": "heart-failure",
    "name": "日本心不全学会",
    "group": "心臓・循環器",
    "aliases": [
      "日本心不全学会",
      "心不全学会"
    ]
  },
  {
    "code": "cvit",
    "name": "日本心血管インターベンション治療学会",
    "group": "心臓・循環器",
    "aliases": [
      "日本心血管インターベンション治療学会",
      "心血管インターベンション治療学会"
    ]
  },
  {
    "code": "cv-surgery",
    "name": "日本心臓血管外科学会",
    "group": "心臓・循環器",
    "url": "https://jscvs.or.jp",
    "aliases": [
      "日本心臓血管外科学会",
      "心臓血管外科学会"
    ]
  },
  {
    "code": "vascular-surgery",
    "name": "日本血管外科学会",
    "group": "心臓・循環器",
    "url": "https://www.jsvs.org/",
    "aliases": [
      "日本血管外科学会",
      "血管外科学会"
    ]
  },
  {
    "code": "hypertension",
    "name": "日本高血圧学会",
    "group": "心臓・循環器",
    "url": "https://www.jpnsh.jp/",
    "aliases": [
      "日本高血圧学会",
      "高血圧学会"
    ]
  },
  {
    "code": "atherosclerosis",
    "name": "日本動脈硬化学会",
    "group": "心臓・循環器",
    "url": "https://www.j-athero.org/jp/",
    "aliases": [
      "日本動脈硬化学会",
      "動脈硬化学会"
    ]
  },
  {
    "code": "arrhythmia",
    "name": "日本不整脈心電学会",
    "group": "心臓・循環器",
    "aliases": [
      "日本不整脈心電学会",
      "不整脈心電学会"
    ]
  },
  {
    "code": "echo",
    "name": "日本心エコー図学会",
    "group": "心臓・循環器",
    "aliases": [
      "日本心エコー図学会",
      "心エコー図学会"
    ]
  },
  {
    "code": "heart-disease",
    "name": "日本心臓病学会",
    "group": "心臓・循環器",
    "aliases": [
      "日本心臓病学会",
      "心臓病学会"
    ]
  },
  {
    "code": "sports-med",
    "name": "日本臨床スポーツ医学会",
    "group": "スポーツ・運動科学",
    "url": "https://www.rinspo.jp/",
    "aliases": [
      "日本臨床スポーツ医学会",
      "臨床スポーツ医学会"
    ]
  },
  {
    "code": "jossm",
    "name": "日本整形外科スポーツ医学会",
    "group": "スポーツ・運動科学",
    "aliases": [
      "日本整形外科スポーツ医学会",
      "整形外科スポーツ医学会"
    ]
  },
  {
    "code": "japan-sports",
    "name": "日本スポーツ協会",
    "group": "スポーツ・運動科学",
    "url": "https://www.japan-sports.or.jp/",
    "aliases": [
      "日本スポーツ協会",
      "スポーツ協会"
    ]
  },
  {
    "code": "physfit",
    "name": "日本体力医学会",
    "group": "スポーツ・運動科学",
    "url": "https://plaza.umin.ac.jp/jspfsm/",
    "aliases": [
      "日本体力医学会",
      "体力医学会"
    ]
  },
  {
    "code": "exercise-physiol",
    "name": "日本運動生理学会",
    "group": "スポーツ・運動科学",
    "aliases": [
      "日本運動生理学会",
      "運動生理学会"
    ]
  },
  {
    "code": "training-sci",
    "name": "日本トレーニング科学会",
    "group": "スポーツ・運動科学",
    "aliases": [
      "日本トレーニング科学会",
      "トレーニング科学会"
    ]
  },
  {
    "code": "at-society",
    "name": "日本アスレティックトレーニング学会",
    "group": "スポーツ・運動科学",
    "aliases": [
      "日本アスレティックトレーニング学会",
      "アスレティックトレーニング学会"
    ]
  },
  {
    "code": "clin-biomech",
    "name": "日本臨床バイオメカニクス学会",
    "group": "スポーツ・運動科学",
    "aliases": [
      "日本臨床バイオメカニクス学会",
      "臨床バイオメカニクス学会"
    ]
  },
  {
    "code": "biomech",
    "name": "日本バイオメカニクス学会",
    "group": "スポーツ・運動科学",
    "aliases": [
      "日本バイオメカニクス学会",
      "バイオメカニクス学会"
    ]
  },
  {
    "code": "athletics",
    "name": "日本陸上競技学会",
    "group": "スポーツ・運動科学",
    "aliases": [
      "日本陸上競技学会",
      "陸上競技学会"
    ]
  },
  {
    "code": "pediatrics",
    "name": "日本小児科学会",
    "group": "小児・発達",
    "url": "https://www.jpeds.or.jp/",
    "aliases": [
      "日本小児科学会",
      "小児科学会"
    ]
  },
  {
    "code": "child-neuro",
    "name": "日本小児神経学会",
    "group": "小児・発達",
    "url": "https://www.childneuro.jp",
    "aliases": [
      "日本小児神経学会",
      "小児神経学会"
    ]
  },
  {
    "code": "dev-disorder",
    "name": "日本発達障害学会",
    "group": "小児・発達",
    "aliases": [
      "日本発達障害学会",
      "発達障害学会"
    ]
  },
  {
    "code": "jarm",
    "name": "日本リハビリテーション医学会",
    "group": "リハビリテーション全般・多職種連携",
    "url": "https://www.jarm.or.jp/",
    "aliases": [
      "日本リハビリテーション医学会",
      "リハビリテーション医学会"
    ]
  },
  {
    "code": "severe-disability",
    "name": "日本重症心身障害学会",
    "group": "小児・発達",
    "aliases": [
      "日本重症心身障害学会",
      "重症心身障害学会"
    ]
  },
  {
    "code": "ped-ortho",
    "name": "日本小児整形外科学会",
    "group": "小児・発達",
    "aliases": [
      "日本小児整形外科学会",
      "小児整形外科学会"
    ]
  },
  {
    "code": "ped-rehab",
    "name": "日本小児リハビリテーション医学会",
    "group": "小児・発達",
    "aliases": [
      "日本小児リハビリテーション医学会",
      "小児リハビリテーション医学会"
    ]
  },
  {
    "code": "cp-research",
    "name": "日本脳性麻痺研究会",
    "group": "小児・発達",
    "aliases": [
      "日本脳性麻痺研究会",
      "脳性麻痺研究会"
    ]
  },
  {
    "code": "bobath",
    "name": "日本ボバース研究会",
    "group": "小児・発達",
    "aliases": [
      "日本ボバース研究会",
      "ボバース研究会",
      "ボバース講習会",
      "JBITA",
      "日本ボバース"
    ]
  },
  {
    "code": "jsco-treat",
    "name": "日本癌治療学会",
    "group": "がん・緩和ケア・リンパ浮腫",
    "url": "https://www.jsco.or.jp",
    "aliases": [
      "日本癌治療学会",
      "癌治療学会"
    ]
  },
  {
    "code": "jsmo",
    "name": "日本臨床腫瘍学会",
    "group": "がん・緩和ケア・リンパ浮腫",
    "url": "https://www.jsmo.or.jp/",
    "aliases": [
      "日本臨床腫瘍学会",
      "臨床腫瘍学会"
    ]
  },
  {
    "code": "cancer-assoc",
    "name": "日本癌学会",
    "group": "がん・緩和ケア・リンパ浮腫",
    "url": "https://www.cancer.or.jp",
    "aliases": [
      "日本癌学会",
      "癌学会"
    ]
  },
  {
    "code": "palliative",
    "name": "日本緩和医療学会",
    "group": "がん・緩和ケア・リンパ浮腫",
    "url": "https://www.jspm.ne.jp/",
    "aliases": [
      "日本緩和医療学会",
      "緩和医療学会"
    ]
  },
  {
    "code": "psycho-onc",
    "name": "日本サイコオンコロジー学会",
    "group": "がん・緩和ケア・リンパ浮腫",
    "aliases": [
      "日本サイコオンコロジー学会",
      "サイコオンコロジー学会"
    ]
  },
  {
    "code": "lymphedema",
    "name": "日本リンパ浮腫治療学会",
    "group": "がん・緩和ケア・リンパ浮腫",
    "aliases": [
      "日本リンパ浮腫治療学会",
      "リンパ浮腫治療学会"
    ]
  },
  {
    "code": "breast",
    "name": "日本乳癌学会",
    "group": "がん・緩和ケア・リンパ浮腫",
    "url": "https://www.jbcs.gr.jp/",
    "aliases": [
      "日本乳癌学会",
      "乳癌学会"
    ]
  },
  {
    "code": "head-neck",
    "name": "日本頭頸部癌学会",
    "group": "がん・緩和ケア・リンパ浮腫",
    "aliases": [
      "日本頭頸部癌学会",
      "頭頸部癌学会"
    ]
  },
  {
    "code": "palliative-rehab",
    "name": "日本緩和ケアリハビリテーション研究会",
    "group": "がん・緩和ケア・リンパ浮腫",
    "aliases": [
      "日本緩和ケアリハビリテーション研究会",
      "緩和ケアリハビリテーション研究会"
    ]
  },
  {
    "code": "geriatrics",
    "name": "日本老年医学会",
    "group": "高齢者・介護・地域包括ケア",
    "url": "https://www.jpn-geriat-soc.or.jp/",
    "aliases": [
      "日本老年医学会",
      "老年医学会"
    ]
  },
  {
    "code": "geriatric-therapy",
    "name": "日本老年療法学会",
    "group": "高齢者・介護・地域包括ケア",
    "aliases": [
      "日本老年療法学会",
      "老年療法学会"
    ]
  },
  {
    "code": "gerontology",
    "name": "日本老年社会科学会",
    "group": "高齢者・介護・地域包括ケア",
    "aliases": [
      "日本老年社会科学会",
      "老年社会科学会"
    ]
  },
  {
    "code": "sarcopenia",
    "name": "日本サルコペニア・フレイル学会",
    "group": "高齢者・介護・地域包括ケア",
    "aliases": [
      "日本サルコペニア・フレイル学会",
      "サルコペニア・フレイル学会",
      "フレイル"
    ]
  },
  {
    "code": "fall-prevent",
    "name": "日本転倒予防学会",
    "group": "高齢者・介護・地域包括ケア",
    "aliases": [
      "日本転倒予防学会",
      "転倒予防学会"
    ]
  },
  {
    "code": "kaigo-fukushi",
    "name": "日本介護福祉学会",
    "group": "高齢者・介護・地域包括ケア",
    "aliases": [
      "日本介護福祉学会",
      "介護福祉学会"
    ]
  },
  {
    "code": "kaigo-yobo",
    "name": "日本介護予防・健康づくり学会",
    "group": "高齢者・介護・地域包括ケア",
    "aliases": [
      "日本介護予防・健康づくり学会",
      "介護予防・健康づくり学会"
    ]
  },
  {
    "code": "zaitaku",
    "name": "日本在宅医療連合学会",
    "group": "高齢者・介護・地域包括ケア",
    "aliases": [
      "日本在宅医療連合学会",
      "在宅医療連合学会"
    ]
  },
  {
    "code": "houmon-rehab",
    "name": "日本訪問リハビリテーション協会",
    "group": "高齢者・介護・地域包括ケア",
    "aliases": [
      "日本訪問リハビリテーション協会",
      "訪問リハビリテーション協会"
    ]
  },
  {
    "code": "day-care",
    "name": "全国デイ・ケア協会",
    "group": "高齢者・介護・地域包括ケア",
    "url": "http://www.day-care.jp/",
    "aliases": [
      "全国デイ・ケア協会",
      "デイ・ケア協会"
    ]
  },
  {
    "code": "kaifukuki",
    "name": "回復期リハビリテーション病棟協会",
    "group": "高齢者・介護・地域包括ケア",
    "url": "https://www.rehabili.jp/",
    "aliases": [
      "回復期リハビリテーション病棟協会"
    ]
  },
  {
    "code": "rehab-hospital",
    "name": "日本リハビリテーション病院・施設協会",
    "group": "高齢者・介護・地域包括ケア",
    "url": "http://www.rehakyoh.jp/",
    "aliases": [
      "日本リハビリテーション病院・施設協会",
      "リハビリテーション病院・施設協会"
    ]
  },
  {
    "code": "physical-med",
    "name": "日本物理療法学会",
    "group": "物理療法・基礎医学",
    "url": "https://www.jseapt.com/",
    "aliases": [
      "日本物理療法学会",
      "物理療法学会"
    ]
  },
  {
    "code": "bme",
    "name": "日本生体医工学会",
    "group": "物理療法・基礎医学",
    "url": "http://jsmbe.org/",
    "aliases": [
      "日本生体医工学会",
      "生体医工学会"
    ]
  },
  {
    "code": "mr-med",
    "name": "日本磁気共鳴医学会",
    "group": "物理療法・基礎医学",
    "url": "https://www.jsmrm.jp",
    "aliases": [
      "日本磁気共鳴医学会",
      "磁気共鳴医学会"
    ]
  },
  {
    "code": "ultrasound",
    "name": "日本超音波医学会",
    "group": "物理療法・基礎医学",
    "url": "https://www.jsum.or.jp/",
    "aliases": [
      "日本超音波医学会",
      "超音波医学会"
    ]
  },
  {
    "code": "anatomy",
    "name": "日本解剖学会",
    "group": "物理療法・基礎医学",
    "url": "https://www.anatomy.or.jp/",
    "aliases": [
      "日本解剖学会",
      "解剖学会"
    ]
  },
  {
    "code": "physiology",
    "name": "日本生理学会",
    "group": "物理療法・基礎医学",
    "url": "https://www.physiology.jp/",
    "aliases": [
      "日本生理学会",
      "生理学会"
    ]
  },
  {
    "code": "womens-med",
    "name": "日本女性医学学会",
    "group": "ウィメンズヘルス・産前産後",
    "url": "https://www.jmwh.jp/",
    "aliases": [
      "日本女性医学学会",
      "女性医学学会"
    ]
  },
  {
    "code": "obgyn",
    "name": "日本産科婦人科学会",
    "group": "ウィメンズヘルス・産前産後",
    "url": "https://www.jsog.or.jp/",
    "aliases": [
      "日本産科婦人科学会",
      "産科婦人科学会"
    ]
  },
  {
    "code": "obgyn-pt",
    "name": "日本産婦人科理学療法研究会",
    "group": "ウィメンズヘルス・産前産後",
    "aliases": [
      "日本産婦人科理学療法研究会",
      "産婦人科理学療法研究会"
    ]
  },
  {
    "code": "pelvic-floor",
    "name": "日本骨盤底医学会",
    "group": "ウィメンズヘルス・産前産後",
    "aliases": [
      "日本骨盤底医学会",
      "骨盤底医学会"
    ]
  },
  {
    "code": "maternal",
    "name": "日本母性衛生学会",
    "group": "ウィメンズヘルス・産前産後",
    "aliases": [
      "日本母性衛生学会",
      "母性衛生学会"
    ]
  },
  {
    "code": "midwife",
    "name": "日本助産学会",
    "group": "ウィメンズヘルス・産前産後",
    "aliases": [
      "日本助産学会",
      "助産学会"
    ]
  },
  {
    "code": "sexual-function",
    "name": "日本性機能学会",
    "group": "ウィメンズヘルス・産前産後",
    "aliases": [
      "日本性機能学会",
      "性機能学会"
    ]
  },
  {
    "code": "jds",
    "name": "日本糖尿病学会",
    "group": "糖尿病・代謝・栄養・嚥下",
    "url": "https://www.jds.or.jp/",
    "aliases": [
      "日本糖尿病学会",
      "糖尿病学会"
    ]
  },
  {
    "code": "obesity",
    "name": "日本肥満学会",
    "group": "糖尿病・代謝・栄養・嚥下",
    "url": "https://www.jasso.or.jp/",
    "aliases": [
      "日本肥満学会",
      "肥満学会"
    ]
  },
  {
    "code": "endocrine",
    "name": "日本内分泌学会",
    "group": "糖尿病・代謝・栄養・嚥下",
    "url": "https://www.j-endo.jp/",
    "aliases": [
      "日本内分泌学会",
      "内分泌学会"
    ]
  },
  {
    "code": "clin-nutrition",
    "name": "日本臨床栄養学会",
    "group": "糖尿病・代謝・栄養・嚥下",
    "aliases": [
      "日本臨床栄養学会",
      "臨床栄養学会"
    ]
  },
  {
    "code": "jsdr",
    "name": "日本摂食嚥下リハビリテーション学会",
    "group": "糖尿病・代謝・栄養・嚥下",
    "url": "https://www.jsdr.or.jp/",
    "aliases": [
      "日本摂食嚥下リハビリテーション学会",
      "摂食嚥下リハビリテーション学会"
    ]
  },
  {
    "code": "swallow-med",
    "name": "日本嚥下医学会",
    "group": "糖尿病・代謝・栄養・嚥下",
    "aliases": [
      "日本嚥下医学会",
      "嚥下医学会"
    ]
  },
  {
    "code": "geri-dental",
    "name": "日本老年歯科医学会",
    "group": "糖尿病・代謝・栄養・嚥下",
    "aliases": [
      "日本老年歯科医学会",
      "老年歯科医学会"
    ]
  },
  {
    "code": "jspen",
    "name": "日本静脈経腸栄養学会",
    "group": "糖尿病・代謝・栄養・嚥下",
    "aliases": [
      "日本静脈経腸栄養学会",
      "静脈経腸栄養学会"
    ]
  },
  {
    "code": "jsph",
    "name": "日本病態栄養学会",
    "group": "糖尿病・代謝・栄養・嚥下",
    "url": "https://www.eiyou.or.jp/",
    "aliases": [
      "日本病態栄養学会",
      "病態栄養学会"
    ]
  },
  {
    "code": "jspo",
    "name": "日本義肢装具学会",
    "group": "義肢装具・福祉用具",
    "url": "http://www.jspo.jp",
    "aliases": [
      "日本義肢装具学会",
      "義肢装具学会"
    ]
  },
  {
    "code": "jaspo",
    "name": "日本義肢装具士協会",
    "group": "義肢装具・福祉用具",
    "aliases": [
      "日本義肢装具士協会",
      "義肢装具士協会"
    ]
  },
  {
    "code": "seating",
    "name": "日本車椅子シーティング協会",
    "group": "義肢装具・福祉用具",
    "aliases": [
      "日本車椅子シーティング協会",
      "車椅子シーティング協会"
    ]
  },
  {
    "code": "seating-consul",
    "name": "日本シーティング・コンサルタント協会",
    "group": "義肢装具・福祉用具",
    "url": "http://seating-consultants.org/",
    "aliases": [
      "日本シーティング・コンサルタント協会",
      "シーティング・コンサルタント協会"
    ]
  },
  {
    "code": "fukushi-yogu",
    "name": "日本福祉用具・生活支援用具協会",
    "group": "義肢装具・福祉用具",
    "url": "http://www.jaspa.gr.jp/",
    "aliases": [
      "日本福祉用具・生活支援用具協会",
      "福祉用具・生活支援用具協会"
    ]
  },
  {
    "code": "rehab-eng",
    "name": "日本リハビリテーション工学協会",
    "group": "義肢装具・福祉用具",
    "aliases": [
      "日本リハビリテーション工学協会",
      "リハビリテーション工学協会"
    ]
  },
  {
    "code": "ergonomics",
    "name": "日本人間工学会",
    "group": "義肢装具・福祉用具",
    "aliases": [
      "日本人間工学会",
      "人間工学会"
    ]
  },
  {
    "code": "robot-rehab",
    "name": "日本ロボットリハビリテーション・ケア研究会",
    "group": "義肢装具・福祉用具",
    "aliases": [
      "日本ロボットリハビリテーション・ケア研究会",
      "ロボットリハビリテーション・ケア研究会"
    ]
  },
  {
    "code": "psychiatry",
    "name": "日本精神神経学会",
    "group": "精神・心理・産業保健・予防",
    "url": "https://www.jspn.or.jp/",
    "aliases": [
      "日本精神神経学会",
      "精神神経学会"
    ]
  },
  {
    "code": "psychosomatic",
    "name": "日本心身医学会",
    "group": "精神・心理・産業保健・予防",
    "url": "https://shinshin-igaku.com/",
    "aliases": [
      "日本心身医学会",
      "心身医学会"
    ]
  },
  {
    "code": "cbt",
    "name": "日本認知療法・認知行動療法学会",
    "group": "精神・心理・産業保健・予防",
    "aliases": [
      "日本認知療法・認知行動療法学会",
      "認知療法・認知行動療法学会"
    ]
  },
  {
    "code": "occ-health",
    "name": "日本産業衛生学会",
    "group": "精神・心理・産業保健・予防",
    "url": "https://www.sanei.or.jp/",
    "aliases": [
      "日本産業衛生学会",
      "産業衛生学会"
    ]
  },
  {
    "code": "public-health",
    "name": "日本公衆衛生学会",
    "group": "精神・心理・産業保健・予防",
    "url": "https://www.jsph.jp/",
    "aliases": [
      "日本公衆衛生学会",
      "公衆衛生学会"
    ]
  },
  {
    "code": "health-edu",
    "name": "日本健康教育学会",
    "group": "精神・心理・産業保健・予防",
    "aliases": [
      "日本健康教育学会",
      "健康教育学会"
    ]
  },
  {
    "code": "health-support",
    "name": "日本健康支援学会",
    "group": "精神・心理・産業保健・予防",
    "aliases": [
      "日本健康支援学会",
      "健康支援学会"
    ]
  },
  {
    "code": "rehab-collab",
    "name": "日本リハビリテーション連携科学学会",
    "group": "リハビリテーション全般・多職種連携",
    "aliases": [
      "日本リハビリテーション連携科学学会",
      "リハビリテーション連携科学学会"
    ]
  },
  {
    "code": "jaot",
    "name": "日本作業療法士協会",
    "group": "リハビリテーション全般・多職種連携",
    "url": "https://www.jaot.or.jp/",
    "aliases": [
      "日本作業療法士協会",
      "作業療法士協会"
    ]
  },
  {
    "code": "jaslht",
    "name": "日本言語聴覚士協会",
    "group": "リハビリテーション全般・多職種連携",
    "url": "https://www.japanslht.or.jp/",
    "aliases": [
      "日本言語聴覚士協会",
      "言語聴覚士協会"
    ]
  },
  {
    "code": "rehab-nursing",
    "name": "日本リハビリテーション看護学会",
    "group": "リハビリテーション全般・多職種連携",
    "aliases": [
      "日本リハビリテーション看護学会",
      "リハビリテーション看護学会"
    ]
  },
  {
    "code": "iryo-mgmt",
    "name": "日本医療マネジメント学会",
    "group": "リハビリテーション全般・多職種連携",
    "aliases": [
      "日本医療マネジメント学会",
      "医療マネジメント学会"
    ]
  },
  {
    "code": "hospital-mgmt",
    "name": "日本医療・病院管理学会",
    "group": "リハビリテーション全般・多職種連携",
    "url": "https://www.jsha.gr.jp/",
    "aliases": [
      "日本医療・病院管理学会",
      "医療・病院管理学会"
    ]
  },
  {
    "code": "rehab-nutrition",
    "name": "日本リハビリテーション栄養学会",
    "group": "リハビリテーション全般・多職種連携",
    "aliases": [
      "日本リハビリテーション栄養学会",
      "リハビリテーション栄養学会"
    ]
  },
  {
    "code": "clin-ethics",
    "name": "日本臨床倫理学会",
    "group": "リハビリテーション全般・多職種連携",
    "aliases": [
      "日本臨床倫理学会",
      "臨床倫理学会"
    ]
  },
  {
    "code": "jrat",
    "name": "大規模災害リハビリテーション支援関連団体協議会（JRAT）",
    "group": "リハビリテーション全般・多職種連携",
    "aliases": [
      "大規模災害リハビリテーション支援関連団体協議会（JRAT）",
      "JRAT",
      "大規模災害リハビリテーション"
    ]
  },
  {
    "code": "rt3",
    "name": "3学会合同呼吸療法認定士の講習会",
    "group": "研修・資格・実技講習",
    "aliases": [
      "呼吸療法認定士",
      "3学会合同呼吸療法"
    ]
  },
  {
    "code": "certified-pt",
    "name": "認定・専門理学療法士関連の研修",
    "group": "研修・資格・実技講習",
    "aliases": [
      "認定理学療法士",
      "専門理学療法士"
    ]
  },
  {
    "code": "ipnfa",
    "name": "PNF（国際PNF協会・日本PNF学会）の講習会",
    "group": "研修・資格・実技講習",
    "aliases": [
      "IPNFA",
      "PNF学会",
      "国際PNF協会"
    ]
  },
  {
    "code": "manual-pt",
    "name": "徒手理学療法（国際徒手理学療法学会など）の研修",
    "group": "研修・資格・実技講習",
    "aliases": [
      "徒手理学療法",
      "日本徒手理学療法学会"
    ]
  },
  {
    "code": "sports-at-seminar",
    "name": "スポーツ・アスレティックトレーニングの研修",
    "group": "研修・資格・実技講習",
    "aliases": [
      "アスレティックトレーニング",
      "スポーツ理学療法"
    ]
  },
  {
    "code": "univ-open",
    "name": "大学・病院・医療法人が主催する公開研修会",
    "group": "研修・資格・実技講習",
    "aliases": [
      "大学院",
      "大学病院",
      "附属病院",
      "医療法人",
      "国際医療福祉大学",
      "兵庫医科大学"
    ]
  },
  {
    "code": "private",
    "name": "民間・その他の主催（セミナー会社・研究会など）",
    "group": "研修・資格・実技講習",
    "aliases": [
      "民間・その他の主催（セミナー会社・研究会など）"
    ]
  },
  {
    "code": "kansai-pt",
    "name": "関西理学療法学会",
    "group": "理学療法専門分野",
    "aliases": [
      "関西理学療法学会"
    ]
  },
  {
    "code": "tsusho-care",
    "name": "日本通所ケア研究会",
    "group": "高齢者・介護・地域包括ケア",
    "aliases": [
      "日本通所ケア研究会",
      "通所ケア研究会"
    ]
  },
  {
    "code": "rehab-senmon",
    "name": "リハビリテーション専門職団体協議会",
    "group": "リハビリテーション全般・多職種連携",
    "aliases": [
      "リハビリテーション専門職団体協議会"
    ]
  }
];

// 都道府県理学療法士会（pref-* の取得元）と、その他（民間・不明）の、特別な行き先
const PREF_CODE = "pref-pt";
const OTHER_CODE = "private";

type OrgInput = { source: string; source_label?: string | null; organizer?: string | null; title?: string | null };

// イベントが、どの団体のものか。取得元 → 主催者名 → 題名の順で照合する。分からなければ「民間・その他」
export function orgCodeOf(s: OrgInput): string {
  if (s.source.startsWith("org-")) return s.source.slice(4);
  if (s.source.startsWith("pref-") || s.source === "pt-kanagawa") return PREF_CODE;
  if (s.source === "jpta" || s.source.startsWith("jpta-")) return "japanpt";

  const hay = [s.organizer, s.source_label].filter(Boolean).join(" ");
  const hit = (text: string) => {
    let best: { code: string; len: number } | null = null;
    for (const o of SEMINAR_ORGS) {
      for (const a of o.aliases) {
        if (a.length >= 4 && text.includes(a) && (!best || a.length > best.len)) best = { code: o.code, len: a.length };
      }
    }
    return best?.code ?? null;
  };

  return hit(hay) ?? hit(s.title ?? "") ?? OTHER_CODE;
}

export function orgsInGroup(group: string): SeminarOrg[] {
  return SEMINAR_ORGS.filter((o) => o.group === group);
}
