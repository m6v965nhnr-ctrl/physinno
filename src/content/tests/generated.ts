// 自動生成（scripts/build-tests.mjs）。直接は編集しない
import type { TestCard } from "./types";
export const TESTS: TestCard[] = [
 {
  "slug": "abg-acid-base",
  "name": "動脈血ガスの基準値と酸塩基平衡",
  "category": "臨床検査",
  "aliases": [
   "動脈血ガス",
   "動脈血ガス分析",
   "血液ガス",
   "酸塩基平衡",
   "アシドーシス",
   "アルカローシス",
   "呼吸性アシドーシス",
   "呼吸性アルカローシス",
   "代謝性アシドーシス",
   "代謝性アルカローシス",
   "アシデミア",
   "アルカレミア",
   "PaCO2",
   "HCO3",
   "Kussmaul呼吸",
   "クスマウル呼吸",
   "CO2ナルコーシス"
  ],
  "rows": [
   {
    "item": "動脈血ガスの基準値(pH・PaCO2・HCO3−)",
    "target": "酸塩基平衡の判定の出発点",
    "value": "pH 7.35〜7.45、PaCO2 35〜45 mmHg(Torr)、HCO3− 24±2 mEq/L(22〜26)、PaO2 80〜100 mmHg(室内気)。pH 7.35未満=アシデミア、7.45超=アルカレミア",
    "exam": "57-pm-64(誤答:「正常動脈血pH 6.4」)／50回(誤答:「正常の血液pHは7.0」)／52-am-3・56-am-19・53-pm-34(pH・PaCO2・HCO3−を読んで病態を判定)",
    "q": [
     "57-pm-64",
     "52-am-3",
     "56-am-19",
     "53-pm-34"
    ],
    "note": "確認済み[S1][S2][S3]。HCO3−は[S2]の24±2から22〜26と表記。国試の誤答のpH 6.4・7.0は基準範囲(7.35〜7.45)から大きく外れる",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.wakayama-med.ac.jp/hospital/shinryo/inspection/files/496000.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.wakayama-med.ac.jp/med/eccm/assets/images/library/er_morning/02.pdf"
     },
     {
      "label": "S3",
      "url": "https://www.msdmanuals.com/ja-jp/professional/10-内分泌疾患と代謝性疾患/酸塩基の調節と障害/酸塩基平衡障害"
     }
    ]
   },
   {
    "item": "酸塩基平衡の4分類(一次変化と代償)",
    "target": "呼吸性/代謝性のアシドーシス・アルカローシスの判定",
    "value": "呼吸性アシドーシス=PaCO2↑(低換気)でpH<7.35、腎が代償してHCO3−↑／呼吸性アルカローシス=PaCO2↓(過換気)でpH>7.45、HCO3−↓／代謝性アシドーシス=HCO3−↓でpH<7.35、代償でPaCO2↓／代謝性アルカローシス=HCO3−↑でpH>7.45、代償でPaCO2↑。まずpHでアシデミアかアルカレミアかを見て、PaCO2(呼吸性)とHCO3−(代謝性)のどちらが一次変化かを判断する",
    "exam": "52-am-3(pH 7.473・PaCO2 33.4・HCO3− 22.8 → 呼吸性アルカローシス(正答))／56-am-19(pH 7.48・PaCO2 32・HCO3− 23.0 → 呼吸性アルカローシス(正答))／58-am-44(pH・PCO2・HCO3−の表から呼吸性アシドーシスを選ぶ。正答は選択肢3)／53-pm-34(pH 7.32・PaCO2 33・HCO3− 17 → 代謝性アシドーシス+呼吸性代償)",
    "q": [
     "52-am-3",
     "56-am-19",
     "58-am-44",
     "53-pm-34"
    ],
    "note": "確認済み[S1][S2]。代償の程度の目安(例:代謝性アシドーシスでHCO3−が1 mEq/L低下するごとにPaCO2が約1.2 mmHg低下)も示されるが、資料は「経験則」としている。58-am-44の表の数値は問題文から確認できず",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/10-内分泌疾患と代謝性疾患/酸塩基の調節と障害/酸塩基平衡障害"
     },
     {
      "label": "S2",
      "url": "https://www.wakayama-med.ac.jp/med/eccm/assets/images/library/er_morning/02.pdf"
     }
    ]
   },
   {
    "item": "呼吸性アルカローシス(過換気)",
    "target": "過換気・PaCO2低下",
    "value": "分時換気量の増加(過換気)でPaCO2が低下(資料の定義は38 mmHg未満)し、pHが上昇する(>7.45)。急性ではPaCO2が10 mmHg下がるごとにHCO3−が1〜2 mEq/L低下",
    "exam": "57-pm-64(正答:過換気では呼吸性アルカローシス。誤答:「呼吸性アルカローシスで酸性尿」「嘔吐で代謝性アシドーシス」)／50回(誤答:過換気では呼吸性アシドーシス)",
    "q": [
     "57-pm-64"
    ],
    "note": "確認済み[S1]。尿のpHについては資料に記載がなく確認していない",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/10-内分泌疾患と代謝性疾患/酸塩基の調節と障害/酸塩基平衡障害"
     }
    ]
   },
   {
    "item": "代謝性アルカローシス(嘔吐)",
    "target": "嘔吐・胃液吸引・利尿薬・低カリウム血症",
    "value": "HCO3−の一次性増加(資料の目安は28 mEq/L超)でpHは高値またはほぼ正常。原因=反復する嘔吐や胃液吸引による胃酸(HCl)・Cl−の喪失(体液量も減少)、利尿薬、低カリウム血症",
    "exam": "60-pm-66(正答:嘔吐。誤答:飢餓・下痢・重症の喘息・CO2ナルコーシス)／57-pm-64(誤答:嘔吐で代謝性アシドーシス)／50回(正答:嘔吐では代謝性アルカローシス。誤答に「代謝性アルカローシスでKussmaul呼吸」)",
    "q": [
     "60-pm-66",
     "57-pm-64"
    ],
    "note": "確認済み[S1][S2]。60-pm-66の誤答のうち、下痢=消化液のHCO3−喪失で代謝性アシドーシス、飢餓=絶食・低栄養でのケトアシドーシス(代謝性アシドーシス)[S3]、CO2ナルコーシス=呼吸性アシドーシスで生じる症状[S4]。重症の喘息は資料で確認していない",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/10-内分泌疾患と代謝性疾患/酸塩基の調節と障害/代謝性アルカローシス"
     },
     {
      "label": "S2",
      "url": "https://www.msdmanuals.com/ja-jp/professional/10-内分泌疾患と代謝性疾患/酸塩基の調節と障害/酸塩基平衡障害"
     },
     {
      "label": "S3",
      "url": "https://www.msdmanuals.com/ja-jp/professional/10-内分泌疾患と代謝性疾患/酸塩基の調節と障害/代謝性アシドーシス"
     },
     {
      "label": "S4",
      "url": "https://www.msdmanuals.com/ja-jp/professional/10-内分泌疾患と代謝性疾患/酸塩基の調節と障害/呼吸性アシドーシス"
     }
    ]
   },
   {
    "item": "代謝性アシドーシス(下痢・腎不全・ケトアシドーシス)",
    "target": "尿毒症・ケトアシドーシス・下痢",
    "value": "HCO3−の一次性減少(資料の目安は24 mEq/L未満)でpH<7.35、代償でPaCO2が低下。原因=ケトン体(1型糖尿病・飢餓・慢性アルコール使用)や乳酸の蓄積、腎不全(酸排泄・HCO3−再吸収の低下)、下痢などによる消化管からのHCO3−喪失。アシデミアでは高カリウム血症、アルカレミアでは低カリウム血症を生じやすい",
    "exam": "60-pm-94(正答:尿毒症は代謝性アシドーシスを示す。誤答:低カリウム血症を生じやすい・血清クレアチニン濃度は低下)／60-pm-66(下痢・飢餓は代謝性アシドーシス側)",
    "q": [
     "60-pm-94",
     "60-pm-66"
    ],
    "note": "確認済み[S1][S2]。資料は「尿毒症」という語でなく「腎不全」で記載。血清クレアチニンの変化は資料で確認していない(腎機能低下では酸排泄が低下する、までを確認)",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/10-内分泌疾患と代謝性疾患/酸塩基の調節と障害/代謝性アシドーシス"
     },
     {
      "label": "S2",
      "url": "https://www.msdmanuals.com/ja-jp/professional/10-内分泌疾患と代謝性疾患/酸塩基の調節と障害/酸塩基平衡障害"
     }
    ]
   },
   {
    "item": "Kussmaul呼吸",
    "target": "代謝性アシドーシスに対する呼吸性代償",
    "value": "代謝性アシドーシスで酸性に傾いた血液を是正するため、肺胞換気が代償的に増えてPaCO2が低下する深い呼吸。資料の記載: 専門家版=長く深い呼吸(呼吸数は正常)・呼吸困難感を伴わない、家庭版=深く速くなる傾向。糖尿病ケトアシドーシスで典型",
    "exam": "59-am-93(ケトアシドーシスでKussmaul呼吸が起こる理由=CO2を排出するため(正答)。誤答:O2を取り込む・H+減少・HCO3−増加・pH上昇を基準値に戻す)／53-pm-34(pH 7.32・PaCO2 33・HCO3− 17から予想される呼吸=Kussmaul呼吸(正答)。誤答:徐呼吸・頻呼吸・無呼吸・Cheyne-Stokes呼吸)／57-pm-64(誤答:代謝性アルカローシスでKussmaul呼吸)",
    "q": [
     "59-am-93",
     "53-pm-34",
     "57-pm-64"
    ],
    "note": "確認済み[S1][S2]。資料に「Kussmaul呼吸」という語そのものはない(深い呼吸・過呼吸として記載)。呼吸数について資料間で表現が違う(正常/速い)ため、国試は「代謝性アシドーシスの呼吸性代償」という点を問うと整理するとよい",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/10-内分泌疾患と代謝性疾患/酸塩基の調節と障害/代謝性アシドーシス"
     },
     {
      "label": "S2",
      "url": "https://www.msdmanuals.com/ja-jp/home/12-ホルモンと代謝の病気/糖尿病と糖代謝異常/糖尿病性ケトアシドーシス"
     }
    ]
   },
   {
    "item": "呼吸性アシドーシス(低換気・COPD・神経筋疾患)",
    "target": "高二酸化炭素血症",
    "value": "低換気でCO2が蓄積しPaCO2が上昇(資料の定義は40 mmHg超)、pH<7.35。腎でのHCO3−再吸収が3〜5日かけて増え、この代償の程度で急性と慢性を区別。低換気の原因=COPDなどの肺疾患、神経筋疾患(筋力低下)、呼吸中枢の障害。CO2ナルコーシス=急性増悪時の頭痛・錯乱・眠気・昏迷",
    "exam": "53-am-91(Duchenne型筋ジストロフィーでPaCO2が上昇(正答))／59-am-35(誤答:ALSで動脈血二酸化炭素分圧が低下しやすい)／54-pm-17(COPD症例 PaCO2 47・HCO3− 29.5)／54-pm-22(COPDではPaCO2上昇)／51回(COPD急性増悪=酸素分圧低下・二酸化炭素分圧上昇(正))",
    "q": [
     "53-am-91",
     "59-am-35",
     "54-pm-17",
     "54-pm-22"
    ],
    "note": "確認済み[S1][S2]。「ALS・DMDでPaCO2が上昇する」は、神経筋疾患が低換気の原因になること[S1]とALSで呼吸筋筋力低下が起こること(MSD ALSの項)からの整理で、疾患ごとの数値は資料にない",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/10-内分泌疾患と代謝性疾患/酸塩基の調節と障害/呼吸性アシドーシス"
     },
     {
      "label": "S2",
      "url": "https://www.msdmanuals.com/ja-jp/professional/10-内分泌疾患と代謝性疾患/酸塩基の調節と障害/酸塩基平衡障害"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "abi",
  "name": "足関節上腕血圧比(ABI)",
  "category": "臨床検査",
  "aliases": [
   "ABI",
   "足関節上腕血圧比",
   "間欠性跛行",
   "トレッドミル歩行"
  ],
  "rows": [
   {
    "item": "足関節上腕血圧比（ABI）",
    "target": "末梢動脈疾患（PAD）・閉塞性動脈硬化症",
    "value": "正常1.00〜1.40、境界0.91〜0.99、0.90以下は異常低値、1.40超は異常高値",
    "exam": "58-pm-30 誤答「ABI基準値0.75〜0.9」。52-am-13 誤答「閉塞性動脈硬化症でABI 1.2以上」（0.9以下が正）。57-am-25 正答（運動療法前に重要）。60-pm-16 誤答選択肢（ABIは下肢動脈）。60-pm-35 誤答「PADでABIが高い」",
    "q": [
     "52-am-13",
     "57-am-25",
     "58-pm-30",
     "60-pm-16",
     "60-pm-35"
    ],
    "note": "確認済み [S4]（2022年改訂版 PADガイドライン）。出題の「0.75〜0.9」「1.2以上」は公式の正常範囲と合わない",
    "conflict": false,
    "sources": [
     {
      "label": "S4",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2022/03/JCS2022_Azuma.pdf"
     }
    ]
   },
   {
    "item": "足関節上腕血圧比(ABI)",
    "target": "末梢動脈疾患(下肢閉塞性動脈疾患)",
    "value": "安静時ABIの正常値は1.00〜1.40、0.91〜0.99はボーダーライン、0.90以下は異常低値、1.40より高値は異常高値(石灰化)",
    "exam": "55-am-25: 「ABIの基準値は1.5〜2.0」は誤答。52-am-13: 閉塞性動脈硬化症の検査法=トレッドミル歩行で間欠性跛行の出現(正答。誤答=立位体前屈で痛みの軽減・足背動脈の触診でリズムの不整・下垂試験で感覚異常の出現)",
    "q": [
     "52-am-13",
     "55-am-25"
    ],
    "note": "確認済み(原文) [S7] p.4.2.2 の記載。国試の誤答「1.5〜2.0」は基準と食い違うため誤り(国試の判定と整合)",
    "conflict": true,
    "sources": [
     {
      "label": "S7",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2022/03/JCS2022_Azuma.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-19",
  "review": "ai"
 },
 {
  "slug": "acetabular-angle",
  "name": "臼蓋角",
  "category": "臨床検査",
  "aliases": [
   "臼蓋角"
  ],
  "rows": [
   {
    "item": "臼蓋角",
    "target": "発育性股関節形成不全（臼蓋形成不全）",
    "value": "臼蓋角30度以上で臼蓋形成不全と診断",
    "exam": "53-am-19 問題文 生後4か月・X線で臼蓋角を選ぶ（正答e、数値の出題はなし）。53-am-20 同症例（リーメンビューゲル装具）",
    "q": [
     "53-am-19",
     "53-am-20"
    ],
    "note": "確認済み [S24]（乳児健診の二次検診の手引き）",
    "conflict": false,
    "sources": [
     {
      "label": "S24",
      "url": "https://www.jpoa.org/wp-content/uploads/2013/07/180306.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-19",
  "review": "ai"
 },
 {
  "slug": "als-niv",
  "name": "ALSのNPPV導入基準",
  "category": "臨床検査",
  "aliases": [
   "NPPV",
   "NIV"
  ],
  "rows": [
   {
    "item": "筋萎縮性側索硬化症（ALS）のNIV（NPPV）導入基準",
    "target": "呼吸不全の判断・NPPV導入時期",
    "value": "指針の記載: %FVC 80%未満（EFNS、NICEは起坐呼吸を伴う場合）／50%未満（AAN、NICE）、SNIP 40 cmH2O未満、MIP 60 cmH2O未満、PCO2 45 mmHg以上、夜間SpO2 88%未満が5分以上",
    "exam": "56-am-44 正答 PaCO2 60 mmHg。誤答: PaO2 80 mmHg、睡眠中SpO2 94%、最大吸気圧75 cmH2O、%FVC 85%（いずれも導入基準に達しない）。59-pm-12 問題文 %VC 95%・PaO2 90・PaCO2 40（ALS症例、BFO導入）",
    "q": [
     "56-am-44",
     "59-pm-12"
    ],
    "note": "確認済み [S10]。入力の「%FVC<50%」は一つの基準（AAN・NICE）で、EFNSは80%未満と食い違いがある（指針に併記）",
    "conflict": true,
    "sources": [
     {
      "label": "S10",
      "url": "https://neurology-jp.org/guidelinem/pdf/als_2023.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-19",
  "review": "ai"
 },
 {
  "slug": "aortic-dissection-rehab",
  "name": "大動脈解離のリハ開始・中止基準",
  "category": "リスク管理",
  "aliases": [
   "大動脈解離"
  ],
  "rows": [
   {
    "item": "大動脈解離のリハ開始基準:RASS",
    "target": "大動脈解離のリハ",
    "value": "−2≦RASS≦＋1、かつ30分以内に鎮静が必要な不穏がない。中止基準=RASS≦−3、または鎮静薬の増量・新規投与が必要なRASS＞2",
    "exam": "61-am-41(基準範囲内にあるのは「RASS」が正答。選択肢の数値は文字として残っていない)",
    "q": [
     "61-am-41"
    ],
    "note": "確認済み[S9](表62・表63)",
    "conflict": false,
    "sources": [
     {
      "label": "S9",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2020/07/JCS2020_Ogino.pdf"
     }
    ]
   },
   {
    "item": "大動脈解離のリハ開始基準:体温・呼吸・SpO₂・FiO₂",
    "target": "大動脈解離のリハ",
    "value": "体温=38.5℃以上の発熱がない／呼吸数<35回/min／SaO₂≧90%／FiO₂<0.6",
    "exam": "61-am-41(誤答選択肢:体温38.8℃(38.5℃以上で不可)・呼吸数38回/分(35未満が基準)・SaO₂85%(90%以上が基準)・FiO₂0.7(0.6未満が基準))",
    "q": [
     "61-am-41"
    ],
    "note": "確認済み[S9](表62)",
    "conflict": false,
    "sources": [
     {
      "label": "S9",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2020/07/JCS2020_Ogino.pdf"
     }
    ]
   },
   {
    "item": "大動脈解離のリハ開始基準",
    "target": "大動脈解離",
    "value": "開始: −2≦RASS≦1／呼吸回数<35/分／SaO2≧90%／FiO2<0.6／血圧・心拍数のコントロール達成／新たな重症不整脈・心筋虚血を示唆するECG変化なし／38.5℃以上の発熱なし",
    "exam": "61-am-41「基準範囲内の組合せ」: 正答=RASS(数値はDBで欠落)。誤答(範囲外)選択肢=体温38.8℃・呼吸数38回/分・SaO2 85%・FiO2 0.7",
    "q": [
     "61-am-41"
    ],
    "note": "確認済み(S2 表62, 2026-11-19)。誤答4つはすべて表62の範囲外で整合",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2020/07/JCS2020_Ogino.pdf"
     }
    ]
   },
   {
    "item": "大動脈解離のリハ中止基準",
    "target": "大動脈解離",
    "value": "中止: RASS≦−3／鎮静薬増量が必要なRASS>2／労作時呼吸困難・患者の拒否／呼吸数<5または≧40/分／SpO2 88〜90%または4%以上低下／運動療法下にHR≧100/分・収縮期血圧>140 mmHg／新たな重症不整脈・心筋虚血",
    "exam": "(国試での直接出題は無し。61-am-41の関連基準)",
    "q": [],
    "note": "確認済み(S2 表63, 2026-11-19)",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2020/07/JCS2020_Ogino.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-19",
  "review": "ai"
 },
 {
  "slug": "aphasia-types",
  "name": "失語症のタイプ分類(流暢性・理解・復唱)",
  "category": "診断基準・分類",
  "aliases": [
   "失語症",
   "Broca失語",
   "ブローカ失語",
   "Wernicke失語",
   "ウェルニッケ失語",
   "伝導失語",
   "健忘失語",
   "失名詞失語",
   "超皮質性運動失語",
   "超皮質性感覚失語",
   "全失語",
   "SLTA",
   "標準失語症検査",
   "WAB失語症検査",
   "錯語",
   "迂言",
   "喚語困難"
  ],
  "rows": [
   {
    "item": "伝導失語",
    "target": "流暢・理解良好・復唱不良の失語",
    "value": "発話は流暢で、錯語(音韻性錯語)が目立つ。聴覚理解は良好。復唱が障害される(頻繁な錯語を伴う)。読解は良好で、書字は障害されない。",
    "exam": "61-pm-20(正答:言語理解良好・発語流暢・錯語と保続・呼称で自己修正を繰り返し失敗・復唱不良=伝導失語。誤答:Broca・Wernicke・健忘・全失語)。56-am-36(誤答:伝導失語で復唱が保たれる)。53-pm-82(誤答:伝導失語=非流暢・中等〜重度)。51回(正答:伝導失語の特徴=音韻性錯語。誤答:ジャーゴン・非流暢性発話・重度の理解障害・良好な復唱)",
    "q": [
     "61-pm-20",
     "56-am-36",
     "53-pm-82"
    ],
    "note": "確認済み[S1][S2]。国試の誤答(復唱が保たれる・非流暢・重度の理解障害)は資料と合わない。『保続』『自己修正の繰り返し』は症例文の記述で、資料の型の説明には出てこない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/multimedia/table/%E5%A4%B1%E8%AA%9E%E3%81%AE%E7%A8%AE%E9%A1%9E"
     },
     {
      "label": "S2",
      "url": "https://www.jstage.jst.go.jp/article/neuropsychology/37/4/37_17132/_pdf"
     }
    ]
   },
   {
    "item": "健忘(失名詞)失語",
    "target": "流暢・理解良好・復唱良好の失語",
    "value": "発話は流暢で、物品名が出ない(失名詞)。意味のない・回りくどい(迂言的な)発話と錯語がみられる。聴覚理解・読解は良好、復唱は正常。病変は言語野のどこでも起こりうる(通常は小さい病変)。",
    "exam": "54-pm-48(正答:喚語困難・迂言、発話は流暢、理解と復唱が良好=健忘失語。誤答:伝導・Wernicke・超皮質性運動・超皮質性感覚)。56-am-36(誤答:健忘失語で聴覚理解が障害される)。53-pm-82(誤答:健忘失語=非流暢・良好)。61-pm-20(誤答選択肢)",
    "q": [
     "54-pm-48",
     "56-am-36",
     "53-pm-82",
     "61-pm-20"
    ],
    "note": "確認済み[S1]。資料は『失名詞失語』の名称。国試の誤答(理解障害・非流暢)は資料と合わない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/multimedia/table/%E5%A4%B1%E8%AA%9E%E3%81%AE%E7%A8%AE%E9%A1%9E"
     }
    ]
   },
   {
    "item": "Broca(ブローカ)失語",
    "target": "非流暢・理解良好・復唱不良の失語(運動性失語)",
    "value": "発話は非流暢(遅く努力性で、短い語句、プロソディーの障害、前置詞・接続詞が少ない)。理解は良好。復唱は障害される。失名詞と非流暢性失書を伴う。病変は左前頭皮質または前頭頭頂領域(ブローカ野を含む)の大きな病変。",
    "exam": "56-am-36(正答:Broca失語=自発言語が障害される)。53-pm-82(正答:Broca失語=非流暢・軽〜中等度の障害)。61-pm-20(誤答選択肢)",
    "q": [
     "56-am-36",
     "53-pm-82",
     "61-pm-20"
    ],
    "note": "確認済み[S1]。53-pm-82の『軽〜中等度』という重症度は、資料では確認できていない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/multimedia/table/%E5%A4%B1%E8%AA%9E%E3%81%AE%E7%A8%AE%E9%A1%9E"
     }
    ]
   },
   {
    "item": "Wernicke(ウェルニッケ)失語",
    "target": "流暢・理解不良・復唱不良の失語(感覚性失語)",
    "value": "発話は流暢で錯語が多く、文法形は多様だがほとんど意味が伝わらない。聴覚理解・読解は不良。復唱も障害される。失名詞、流暢性失書を伴う。病変は左側頭頭頂皮質(ウェルニッケ野を含む)の大きな病変。",
    "exam": "56-am-36(誤答:Wernicke失語で聴覚理解が保たれる)。53-pm-82(誤答:Wernicke失語=流暢・良好)。61-pm-20(誤答選択肢)",
    "q": [
     "56-am-36",
     "53-pm-82",
     "61-pm-20"
    ],
    "note": "確認済み[S1]。『流暢だが理解は不良』が要点で、国試の『良好』は誤り。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/multimedia/table/%E5%A4%B1%E8%AA%9E%E3%81%AE%E7%A8%AE%E9%A1%9E"
     }
    ]
   },
   {
    "item": "超皮質性運動失語・超皮質性感覚失語",
    "target": "復唱が保たれる失語",
    "value": "超皮質性運動失語=Broca失語に似るが復唱は正常(発音の明瞭さはしばしば保たれる)。超皮質性感覚失語=Wernicke失語に似るが復唱は正常。いずれも復唱が保たれるのが特徴。",
    "exam": "56-am-36(誤答:超皮質性失語で復唱が障害される)。53-pm-82(誤答:超皮質性運動失語=流暢・重度)。54-pm-48(誤答選択肢)",
    "q": [
     "56-am-36",
     "53-pm-82",
     "54-pm-48"
    ],
    "note": "確認済み[S1]。運動失語はBroca失語に似る(非流暢)ので、国試の『流暢』は資料と合わない。重症度の記載は資料にない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/multimedia/table/%E5%A4%B1%E8%AA%9E%E3%81%AE%E7%A8%AE%E9%A1%9E"
     }
    ]
   },
   {
    "item": "全失語",
    "target": "非流暢・理解不良・復唱不良の最重症型",
    "value": "口頭・書字ともに重度の失名詞。発話は非流暢で量が少ない。理解は不良、復唱も障害。失読・失書を伴う。病変は左前頭側頭頭頂皮質(ブローカ野・ウェルニッケ野を含む)の大きな病変。",
    "exam": "61-pm-20(誤答選択肢)",
    "q": [
     "61-pm-20"
    ],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/multimedia/table/%E5%A4%B1%E8%AA%9E%E3%81%AE%E7%A8%AE%E9%A1%9E"
     }
    ]
   },
   {
    "item": "タイプ分類の3つの軸(流暢性・理解・復唱)",
    "target": "失語型の見分け方",
    "value": "失語症は、流暢性、復唱の可否、言語理解からタイプ分類ができる。流暢性を決める因子は、句の長さ、プロソディー、会話の速度、努力性、休止、構音の歪みなど。失語症者の約2/3は流暢・非流暢のどちらかに分けられる。",
    "exam": "53-pm-82・54-pm-48(流暢性・理解・復唱の組合せで型を問う設問)",
    "q": [
     "53-pm-82",
     "54-pm-48"
    ],
    "note": "確認済み[S3][S4]。分類は目安で、型に当てはまらない例もある。",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://www.jstage.jst.go.jp/article/jjrmc/53/4/53_273/_pdf"
     },
     {
      "label": "S4",
      "url": "https://www.jstage.jst.go.jp/article/jsnt/33/3/33_362/_pdf"
     }
    ]
   },
   {
    "item": "失語症の検査(SLTA・WAB)",
    "target": "失語の重症度・特徴の評価",
    "value": "重症度は標準化された失語症検査(標準失語症検査SLTA、WAB失語症検査など)で判定される。",
    "exam": "54-pm-36(SLTAは誤答選択肢)。60-am-10(誤答選択肢:WAB=失語の検査。WCST=遂行機能、SCP=pusherの評価は別の領域)",
    "q": [
     "54-pm-36",
     "60-am-10"
    ],
    "note": "確認済み[S4](SLTA・WABが失語の検査である点)。WCSTとSCPの対応は資料では確認していない。",
    "conflict": false,
    "sources": [
     {
      "label": "S4",
      "url": "https://www.jstage.jst.go.jp/article/jsnt/33/3/33_362/_pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "apley-test",
  "name": "Apleyテスト",
  "category": "検査法・徴候",
  "aliases": [
   "Apley test",
   "Apley's test",
   "Apley grind test",
   "Apleyの圧迫テスト",
   "アプレーテスト",
   "アプレイテスト",
   "Apley compression test"
  ],
  "rows": [
   {
    "item": "Apley 圧迫(grinding)テスト",
    "target": "半月板損傷",
    "value": "腹臥位で膝を直角に屈曲し、検者が体重をかけて脛骨をテーブル側へ圧迫したまま強く回旋する。圧迫を加えると痛みが増せば陽性で、半月板損傷を考える",
    "exam": "52-pm-32(誤答選択肢: 腰椎椎間板ヘルニアで陽性となるテストとして。正答は大腿神経伸張テスト。Apleyは半月板の検査)",
    "q": [
     "52-pm-32"
    ],
    "note": "確認済み[S1](1947年のApleyの原記述)。腰椎椎間板ヘルニアの検査(Lasègue・大腿神経伸張テスト)ではない",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC2796951/"
     }
    ]
   },
   {
    "item": "Apley 牽引(distraction)テスト",
    "target": "靱帯・関節包(回旋捻挫)との区別",
    "value": "同じ姿勢で下腿を上方へ引き上げ(牽引)、その状態で回旋する。牽引で痛みが回旋のみより増せば陽性で、半月板ではなく靱帯(回旋捻挫)を考える",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1](原記述)。牽引で増悪=靱帯、圧迫で増悪=半月板、という対比",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC2796951/"
     }
    ]
   },
   {
    "item": "診断精度",
    "target": "臨床での使い方",
    "value": "報告では感度16〜41%、特異度80〜93%程度で、感度が低く特異度が高い。McMurrayテスト同様、単独で確定せず他の所見と合わせる",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。研究ごとの報告値",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC2796951/"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "apraxia",
  "name": "失行の種類と検査(観念運動失行・観念失行・肢節運動失行)",
  "category": "検査法・徴候",
  "aliases": [
   "観念運動失行",
   "観念失行",
   "観念性失行",
   "観念運動性失行",
   "肢節運動失行",
   "拮抗失行",
   "構成失行",
   "着衣失行",
   "SPTA",
   "標準高次動作性検査",
   "apraxia",
   "パントマイム",
   "脳梁失行"
  ],
  "rows": [
   {
    "item": "観念運動失行(IMA)",
    "target": "口頭命令・模倣でできない失行",
    "value": "習熟した動作を、口頭命令でのパントマイム(象徴的動作)で最も困難になり、模倣・実際の物品使用で改善しやすい。誤りは動作の空間的・時間的な乱れ(内容の取り違えではない)。日常の自然な場面では、検査でできない動作ができることがある。",
    "exam": "55-am-27(正答:『歯を磨くまねをして』の口頭命令ではできないが自発的には歯磨きができる=観念運動失行)。51-pm-27(誤答:キツネの指の模倣不能=観念運動失行の記述)。52-am-84(正答:『歯を磨くまねをしてください』が観念運動失行の検査)。50-pm-26・56-pm-19(観念運動失行は誤答選択肢)",
    "q": [
     "55-am-27",
     "52-am-84",
     "51-pm-27",
     "50-pm-26",
     "56-pm-19"
    ],
    "note": "確認済み[S1][S2]。資料間で、観念運動失行は『全般に困難』とする整理と『模倣・実使用で改善』とする整理があり、程度は症例差がある。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/neuropsychology/32/3/32_216/_pdf"
     },
     {
      "label": "S2",
      "url": "https://www.neurology-jp.org/sokaitiho/neuro2013/pdf/slide/slide3-1.pdf"
     }
    ]
   },
   {
    "item": "観念失行(IA)",
    "target": "物品使用の誤り・系列動作の誤りの失行",
    "value": "物品の使用や複数物品の系列動作で、内容の誤り(他の意味のある動作への取り違え、順序の誤り・省略)が出る。例:鍵を歯ブラシのように使う、マッチを点火せずろうそくにこすりつける。観念運動失行より模倣は保たれやすい。",
    "exam": "56-pm-19(正答:くしを歯ブラシに使う等=観念失行)。51-pm-27(正答:杖を上下逆さまにして使おうとする=観念失行)。50-am-5・50-am-6(観念失行は誤答選択肢)。52-pm-9(正答:観念失行)。52-am-84(『紙を折って封筒に入れて』は一連の物品使用の課題)",
    "q": [
     "56-pm-19",
     "51-pm-27",
     "50-am-5",
     "50-am-6",
     "52-pm-9",
     "52-am-84"
    ],
    "note": "確認済み[S1][S2]。観念失行と観念運動失行の症候上の違いは、研究者の間でなお議論がある(S1)。52-pm-9は症例からの判断問題で、症例文までは確認していない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/neuropsychology/32/3/32_216/_pdf"
     },
     {
      "label": "S2",
      "url": "https://www.neurology-jp.org/sokaitiho/neuro2013/pdf/slide/slide3-1.pdf"
     }
    ]
   },
   {
    "item": "失行の検査課題と、検査でないもの",
    "target": "失行の検査・スクリーニング",
    "value": "課題の例:物品なしの慣習動作(敬礼・おいでおいで・バイバイ)、物品を使うまね(金槌・鋸・ドアをノック)、実際の物品使用、一連の複数物品の動作(ろうそくに火をつける・手紙を封筒に入れ切手を貼る・ポットと急須で茶を入れる)、動作の模倣。スクリーニングの例としてFAST-R、WABの行為の下位検査、標準高次動作性検査(SPTA)が挙げられている。物の名前を答える呼称は、失行の課題の一覧に入っていない。",
    "exam": "54-am-84(正答:失行の検査でないもの=日常物品の名前を答えてもらう。検査である=お茶を入れる・金槌で釘を打つ・『おいでおいで』・歯ブラシを持ったつもりで歯磨きのまね)。60-am-10(誤答選択肢:道具を使用したパントマイムは失行の検査)",
    "q": [
     "54-am-84",
     "60-am-10"
    ],
    "note": "確認済み[S2]。呼称が失語・失名辞の検査であるという位置づけは、この資料には明記がない(課題一覧に含まれないことのみ確認)。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.neurology-jp.org/sokaitiho/neuro2013/pdf/slide/slide3-1.pdf"
     }
    ]
   },
   {
    "item": "肢節運動失行(LKA)",
    "target": "手指の巧緻動作の失行",
    "value": "手指の巧緻動作に特異的な障害で、実使用・模倣・パントマイムのすべてで巧緻性が落ちる。左右差が特徴。運動麻痺との異同が問題で、失行に分類する立場と運動麻痺と連続して捉える立場がある。障害肢と反対側の中心領域(中心前回・中心後回)の病変で報告される。",
    "exam": "55-am-27・56-pm-19(肢節運動失行は誤答選択肢)",
    "q": [
     "55-am-27",
     "56-pm-19"
    ],
    "note": "確認済み[S1]。51-am-96の組合せ『Lewy小体型認知症―肢節運動失行』が誤りとされた点は、資料では確認していない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/neuropsychology/32/3/32_216/_pdf"
     }
    ]
   },
   {
    "item": "検査条件による難しさの違い",
    "target": "失行の検査の組み立て・解釈",
    "value": "多くは言語指示、模倣、実際の物品の順に困難(言語指示は模倣より、物品使用のまねは実使用より難しいことが多い)。動作が複雑になるほど難しい。検査場面でできない行為が、日常の自然な状況ではできることがある。失語を伴うことが多いため、模倣と物品使用の成績が重要。",
    "exam": "55-am-27(口頭命令ではできないが自発的にはできる、の根拠)",
    "q": [
     "55-am-27"
    ],
    "note": "確認済み[S2]。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.neurology-jp.org/sokaitiho/neuro2013/pdf/slide/slide3-1.pdf"
     }
    ]
   },
   {
    "item": "失行との鑑別(失語・失認・麻痺・失調など)",
    "target": "失行でない障害の除外",
    "value": "麻痺・パーキンソン症状・失調・不随意運動は、いつも同じ誤り方をする。失語による了解障害では模倣や物品使用は障害されない。視覚失認・触覚失認は、言語指示では行為が正しくできるが呼称ができない。認知症では課題全般ができなくなり、知能検査の成績も低下する。",
    "exam": "52-pm-9の選択肢(視覚性失認・運動維持困難・右上肢運動麻痺・右上肢深部覚障害は誤答)",
    "q": [
     "52-pm-9"
    ],
    "note": "確認済み[S2]。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.neurology-jp.org/sokaitiho/neuro2013/pdf/slide/slide3-1.pdf"
     }
    ]
   },
   {
    "item": "脳梁損傷と左手の失行(参考)",
    "target": "左手だけの失行",
    "value": "脳梁損傷で劣位半球側(左手)の観念運動失行が生じることはよく知られている。最初の記載例は、左手の失行・失書と右上肢麻痺で、左前大脳動脈領域(脳梁・前頭葉前内側部)などの病巣。症状は症例ごとに異なる。",
    "exam": "56-am-17(正答:前頭葉腫瘍で可能性が最も低いのは拮抗失行)の周辺知識。ただし拮抗失行の定義・病巣は今回の資料では確認していない",
    "q": [
     "56-am-17"
    ],
    "note": "確認済み[S1]。拮抗失行そのものの記載は資料になく、56-am-17の正誤は裏づけられていない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/neuropsychology/32/3/32_216/_pdf"
     }
    ]
   },
   {
    "item": "構成失行(参考)",
    "target": "描画・組み立て・模写の障害",
    "value": "課題を理解し身体能力もあるのに、物を描く・組み立てる・模写することができない。例:単純な図形を認識できても模写できない。",
    "exam": "56-pm-19(構成失行は誤答選択肢)",
    "q": [
     "56-pm-19"
    ],
    "note": "確認済み[S3]。着衣失行・拮抗失行はこの資料に記載がなく確認できていない。",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-神経疾患/脳葉の機能および機能障害/失行"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "aquatic-unloading",
  "name": "水中運動の免荷率",
  "category": "物理療法",
  "aliases": [
   "水中運動",
   "水中歩行"
  ],
  "rows": [
   {
    "item": "水中運動の免荷率(水位)",
    "target": "水中立位・水中運動",
    "value": "水位が臍の高さ: 体重は約50%(免荷約50%)。首まで: 約10%。腋窩: 約20%",
    "exam": "54-am-9 正答=図4(体重の約50%が免荷)／59-pm-20 正答=図4(同)。図は未確認(選択肢は図のみ)",
    "q": [
     "54-am-9",
     "59-pm-20"
    ],
    "note": "確認済み(S14, 2026-11-19)(学術総説。診療ガイドラインではない)。図(水位)は未確認",
    "conflict": false,
    "sources": [
     {
      "label": "S14",
      "url": "https://www.jstage.jst.go.jp/article/jjrm1963/42/2/42_2_138/_pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-19",
  "review": "ai"
 },
 {
  "slug": "asia",
  "name": "ASIA(AIS・キーマッスル・感覚キーポイント)",
  "category": "診断基準・分類",
  "aliases": [
   "ASIA",
   "AIS",
   "ASIA機能障害尺度",
   "Frankel",
   "キーマッスル",
   "key muscle",
   "デルマトーム",
   "皮膚分節",
   "感覚キーポイント"
  ],
  "rows": [
   {
    "item": "ASIA機能障害尺度（AIS）A〜E",
    "target": "脊髄損傷の重症度（ISNCSCI）",
    "value": "A=完全（S4-5に感覚・運動とも保たれない）／B=感覚不全（神経学的損傷高位より下、S4-5を含み感覚のみ保たれ、運動は保たれない。運動は運動高位から3髄節を超えて下に保たれない）／C=運動不全（肛門の随意収縮がある、または感覚不全で運動が3髄節を超えて保たれ、かつ損傷高位より下のkey muscleの半数未満がMMT3以上）／D=運動不全（同、key muscleの半数以上がMMT3以上）／E=正常。仙髄回避（S4-5の感覚・肛門深部圧・肛門の随意収縮）の有無で完全・不全を判断",
    "exam": "60-pm-19（問題文: key muscle 三角筋4・肘屈筋5・肘伸筋2・手関節背屈筋3・中指末節屈筋0・小指外転筋0・下肢0、乳頭以下の触覚・痛覚脱失、肛門の随意収縮と感覚あり。DB正答=B）／61-pm-13（正答: A。key muscle 肘伸筋2・中指末節屈筋0・小指外転筋0・下肢0、乳頭以下脱失、直腸診で随意収縮・肛門深部圧・周囲の感覚が消失）／61-am-13（問題文: 第6頸髄損傷AIS A、自律神経過反射の対応）／53-am-8（問題文・正答: 胸部大動脈解離ステントグラフト内挿術後の麻痺、ASIA評価表の図から重症度と損傷部位を選ぶ。正答は脊髄の前方。図は未確認）",
    "q": [
     "53-am-8",
     "60-pm-19",
     "61-am-13",
     "61-pm-13"
    ],
    "note": "確認済み(公式): ASIA/ISCOS ISNCSCI ワークシート 2019 https://asia-spinalinjury.org/wp-content/uploads/2019/04/ASIA-ISCOS-IntlWorksheet_2019.pdf を読了（A〜Eの定義、Cは「key muscle半数未満がgrade3以上」、Dは「半数以上」）。【食い違い（60-pm-19）】公式では肛門の随意収縮があれば運動不全（C以上）で、運動高位C6（肘屈筋5・手関節背屈筋3）より下の key muscle（肘伸筋2など）は半数未満のgrade3以上=Cとなる。DB正答のBと矛盾。問題文の原文（肛門の随意収縮の有無）の確認が必要。61-pm-13は公式と整合。2026-11-19",
    "conflict": true,
    "sources": [
     {
      "label": "資料1",
      "url": "https://asia-spinalinjury.org/wp-content/uploads/2019/04/ASIA-ISCOS-IntlWorksheet_2019.pdf"
     }
    ]
   },
   {
    "item": "ASIA key muscle（髄節別キーマッスル）",
    "target": "運動髄節の判定",
    "value": "C5=肘関節屈筋群／C6=手関節伸筋群／C7=肘関節伸筋群／C8=中指の深指屈筋（指屈筋群）／T1=小指外転筋／L2=股関節屈筋群（腸腰筋）／L3=膝関節伸筋群／L4=足関節背屈筋群／L5=長母趾伸筋／S1=足関節底屈筋群",
    "exam": "54-am-82（正答: T1=小指外転筋／誤答: C6=上腕二頭筋、C8=上腕三頭筋、L1=大腿四頭筋、L5=前脛骨筋）／57-am-82（正答: C5=肘関節屈筋群／誤答: C6=肘関節伸筋群、C7=小指外転筋、L2=膝関節伸筋群、L3=足関節背屈筋群）／58-pm-83（正答: C6残存で手関節背屈・肘関節屈曲／誤答: 小指外転・母指内転・中指DIP屈曲）／61-pm-13・60-pm-19（問題文のkey muscle）",
    "q": [
     "54-am-82",
     "57-am-82",
     "58-pm-83",
     "60-pm-19",
     "61-pm-13"
    ],
    "note": "確認済み(公式): 上記ワークシートでC5・C6・C7・L2〜S1を読了。C8・T1は検索結果の要約（ISNCSCI 2019）。国試誤答の正しい髄節（C6=手関節伸筋、C7=肘伸筋、L3=膝伸筋、L4=足背屈筋、L2=股屈筋）は公式の一覧と整合。2026-11-19",
    "conflict": false,
    "sources": [
     {
      "label": "資料1",
      "url": "https://asia-spinalinjury.org/wp-content/uploads/2019/04/ASIA-ISCOS-IntlWorksheet_2019.pdf"
     }
    ]
   },
   {
    "item": "ASIAの感覚キーポイント・デルマトーム(髄節)",
    "target": "脊髄損傷の感覚レベル判定",
    "value": "ISNCSCIキーセンサリーポイント: C3=鎖骨上窩、C4=肩鎖関節、C5=肘窩の外側(橈側)、C6=母指(基節骨背側)、C7=中指、C8=小指、T4=乳頭の高さ(鎖骨中線・第4肋間)、T10=臍の高さ、T12=鼠径靱帯の中点、L3=大腿骨内側顆、L4=内果、L5=足背(第3中足趾節関節)、S1=踵骨外側、S2=膝窩の中点、S3=坐骨結節、S4/5=肛門周囲",
    "exam": "56-pm-83: T4=乳頭(正答)。誤答=C5鎖骨上窩(正しくはC3)・T12臍(正しくはT10)・L3鼠径靱帯(正しくはT12)・S4膝窩(正しくはS2)。53-pm-56: 乳頭―第4胸髄節(正答)、誤答=母指―第3頸髄節(正しくはC6)・臍―第8胸髄節(T10)・膝―第1腰髄節(L3)・肛門―第1仙髄節(S4/5)。54-pm-14: 腰椎椎間板ヘルニア、右片脚立位で踵の挙上ができない(S1髄節)→重度の感覚鈍麻の部位を図から選ぶ(正答は④、図は未確認)。56-am-15: 腰部と下腿後面〜足背外側部の痛み=L5/S1(正答)",
    "q": [
     "53-pm-56",
     "54-pm-14",
     "56-am-15",
     "56-pm-83"
    ],
    "note": "確認済み(原文) [S8](2008年6月版)。入力の注記「C4肩鎖関節/C5は肘窩外側」「臍T10」「L3は大腿内側顆」「膝窩S2」はすべて[S8]で確認。図の問題は図未確認",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.mhlw.go.jp/toukei/list/dl/73-22-01.pdf"
     },
     {
      "label": "S8",
      "url": "https://asia-spinalinjury.org/wp-content/uploads/2016/02/Key_Sensory_Points.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-19",
  "review": "ai"
 },
 {
  "slug": "autonomic-dysreflexia",
  "name": "自律神経過反射",
  "category": "リスク管理",
  "aliases": [
   "自律神経過反射"
  ],
  "rows": [
   {
    "item": "自律神経過反射",
    "target": "脊髄損傷(T6以上)",
    "value": "第5・6胸髄より上の損傷で起こる。血圧上昇(200 mmHg以上にも)・頭痛・顔面紅潮・損傷レベルより上の発汗・鼻づまり・徐脈(60/分以下)。対応: ただちに座位(頭を上げる)・原因(膀胱・直腸・締め付け)の除去・血圧と脈拍の測定",
    "exam": "61-am-13 問題文 血圧220/100 mmHg・頭痛・顔面紅潮・発汗 → 正答=排尿・排便状況の確認。誤答選択肢=頻脈・臥位にする・重篤な合併症は生じない・腰髄損傷にも生じやすい／57-pm-83 正答=発汗・高血圧。誤答=頻脈・低血糖・四肢の疼痛／52-pm-82 正答=高血圧・顔面紅潮。誤答=頻脈・低血糖・損傷レベルより下の発汗",
    "q": [
     "52-pm-82",
     "57-pm-83",
     "61-am-13"
    ],
    "note": "確認済み(S15, 2026-11-19)(国立別府重度障害者センターの在宅生活ハンドブック)。食い違い: 資料は「第5・6胸髄より上」「T7レベル以上」と記載、国試は「T6以上」。SBP 220 mmHgは重度高血圧(200以上)と整合",
    "conflict": true,
    "sources": [
     {
      "label": "S15",
      "url": "https://www.rehab.go.jp/beppu/book/pdf/livinghome_no25.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-19",
  "review": "ai"
 },
 {
  "slug": "balance-tests",
  "name": "バランス・転倒リスクの評価(TUG・片脚立位・SPPB)",
  "category": "評価尺度",
  "aliases": [
   "TUG",
   "Timed Up and Go",
   "片脚立位",
   "SPPB"
  ],
  "rows": [
   {
    "item": "TUG(Timed Up and Go) 方法",
    "target": "移動能力・バランス・転倒リスク",
    "value": "肘掛け付き椅子の座位から立ち上がり、3m歩き、折り返して再び着座するまでの時間(「心地よい早さ」)。6m先ではない",
    "exam": "55-pm-27(正答2つ=バランス機能の評価方法である／動作開始から背もたれ座位までの時間を測定する。誤答=開始肢位は立位／6m先に目印／歩行補助具の使用を禁止)／60-am-12(Brunnstrom上肢Ⅳ下肢Ⅳの右片麻痺・通所リハ利用者の転倒リスク評価=TUGが正答。誤答=NIHSS・UPDRS・modified Tardieu・PCI。カットオフ値は出題なし)",
    "q": [
     "55-pm-27",
     "60-am-12"
    ],
    "note": "確認済み[S10](3m・肘掛け椅子・折り返し)。「歩行補助具の使用を禁止」(誤)は S10 では未確認",
    "conflict": false,
    "sources": [
     {
      "label": "S10",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2021/03/JCS2021_Makita.pdf"
     }
    ]
   },
   {
    "item": "片脚立位時間",
    "target": "バランス・運動器不安定症",
    "value": "開眼で両手を腰に当て、片足を5cm上げて最大60秒まで測定。15秒以下は運動器不安定症の診断基準。5秒間の片脚立位が不可能なことは3年以内の外傷を伴う転倒の予測因子",
    "exam": "54-am-26(片脚立位時間 10秒→55秒=延長=改善(誤答選択肢))／56-am-6(誤答:片脚立位時間は全身持久性の評価ではない)",
    "q": [
     "54-am-26",
     "56-am-6"
    ],
    "note": "確認済み[S10]",
    "conflict": false,
    "sources": [
     {
      "label": "S10",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2021/03/JCS2021_Makita.pdf"
     }
    ]
   },
   {
    "item": "SPPB",
    "target": "下肢機能・フレイル",
    "value": "3課題(バランステスト(閉脚・セミタンデム・タンデム立位)・4m歩行時間・椅子から5回の立ち上がり時間)。各0〜4点、12点満点。3点刻みで「きわめて低運動機能」「低運動機能」「中等度」「良好」",
    "exam": "60-am-34(誤答:「FRTはSPPBの一部」→SPPBはバランス・歩行・椅子立ち上がりの3課題で、FRTは含まれない)",
    "q": [
     "60-am-34"
    ],
    "note": "確認済み[S10]",
    "conflict": false,
    "sources": [
     {
      "label": "S10",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2021/03/JCS2021_Makita.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-19",
  "review": "ai"
 },
 {
  "slug": "barthel-index",
  "name": "Barthel Index(BI)",
  "category": "評価尺度",
  "aliases": [
   "Barthel Index",
   "Barthel指数",
   "バーセルインデックス",
   "BI"
  ],
  "rows": [
   {
    "item": "Barthel Index 全体",
    "target": "ADL の自立度(0=全依存〜100=自立)",
    "value": "10項目・合計0〜100点。評価は「している」ADL(できるADLではない)。見守りが必要なら自立ではない。中間段階は本人が努力の50%超を担う",
    "exam": "59-pm-50(誤答選択肢:「食事の準備の項目を含む」は誤り=項目は食事・移乗・整容・トイレ・入浴・歩行・階段・更衣・排便・排尿)／61-pm-37(誤答:「高次脳機能評価が含まれる」)／53-pm-35(誤答:「がん患者の身体機能評価尺度」ではない)／54-am-50(誤答:「スコアが高くなる」はフレイルでは誤=低下)",
    "q": [
     "53-pm-35",
     "54-am-50",
     "59-pm-50",
     "61-pm-37"
    ],
    "note": "確認済み[S1](項目・0〜100・ガイドライン)。「食事の準備」「高次脳機能」を含まないことは S1 の項目表で確認",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.sralab.org/sites/default/files/2017-07/barthel.pdf"
     }
    ]
   },
   {
    "item": "BI 食事",
    "target": "食事動作",
    "value": "10点=自立／5点=切る・バターを塗る等に介助、または食事形態の調整が必要／0点=不能",
    "exam": "59-pm-50(誤答:「自立の得点は7点」→正しくは10点)／58-pm-41(自立で10点の項目の誤答側に「食事」)／52-am-6(食事=食物を刻めば左手スプーンで食べられる→5点。選択肢「食事」は10点ではない=誤答)",
    "q": [
     "52-am-6",
     "58-pm-41",
     "59-pm-50"
    ],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.sralab.org/sites/default/files/2017-07/barthel.pdf"
     }
    ]
   },
   {
    "item": "BI 入浴",
    "target": "入浴動作",
    "value": "5点=自立(シャワー可)／0点=依存",
    "exam": "58-pm-41(自立5点の項目=入浴が正答)／52-am-6(シャワーで洗体に介助→0点。10点ではない=誤答)／53-am-7(入浴=部分介助→0点)／61-am-6(入浴=介助→0点)／55-am-5(入浴自立→5点)",
    "q": [
     "52-am-6",
     "53-am-7",
     "55-am-5",
     "58-pm-41",
     "61-am-6"
    ],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.sralab.org/sites/default/files/2017-07/barthel.pdf"
     }
    ]
   },
   {
    "item": "BI 整容",
    "target": "整容動作",
    "value": "5点=自立(顔・髪・歯・ひげ剃り。用具は提供)／0点=介助が必要",
    "exam": "58-pm-41(自立5点の項目=整容が正答)／53-am-7・61-am-6・55-am-5(整容自立→5点として加算)",
    "q": [
     "53-am-7",
     "55-am-5",
     "58-pm-41",
     "61-am-6"
    ],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.sralab.org/sites/default/files/2017-07/barthel.pdf"
     }
    ]
   },
   {
    "item": "BI 更衣",
    "target": "更衣動作",
    "value": "10点=自立(ボタン・ファスナー・靴ひもを含む)／5点=介助を要するが半分は自力／0点=全介助",
    "exam": "58-pm-41(誤答選択肢「更衣」=自立で10点であり5点ではない)／53-am-7(更衣自立→10点)／55-am-5(着替え自立→10点)",
    "q": [
     "53-am-7",
     "55-am-5",
     "58-pm-41"
    ],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.sralab.org/sites/default/files/2017-07/barthel.pdf"
     }
    ]
   },
   {
    "item": "BI 排便コントロール",
    "target": "排便管理",
    "value": "10点=失禁なし／5点=時々失敗／0点=失禁(浣腸が必要を含む)",
    "exam": "53-am-7(排便に時々失禁→5点)／55-am-5(排便自立→10点)／61-am-6(排泄コントロール良好→10点)",
    "q": [
     "53-am-7",
     "55-am-5",
     "61-am-6"
    ],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.sralab.org/sites/default/files/2017-07/barthel.pdf"
     }
    ]
   },
   {
    "item": "BI 排尿コントロール",
    "target": "排尿管理",
    "value": "10点=失禁なし／5点=時々失敗／0点=失禁、または留置カテーテルで自己管理不能",
    "exam": "58-pm-41(誤答選択肢「排尿コントロール」=自立で10点)／53-am-7(排尿に時々失禁→5点)／55-am-5・61-am-6(自立→10点)",
    "q": [
     "53-am-7",
     "55-am-5",
     "58-pm-41",
     "61-am-6"
    ],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.sralab.org/sites/default/files/2017-07/barthel.pdf"
     }
    ]
   },
   {
    "item": "BI トイレ動作",
    "target": "トイレ動作",
    "value": "10点=自立(着脱・清拭まで)／5点=一部介助、自力で一部可能／0点=全介助",
    "exam": "52-am-6(トイレ=衣服操作に介助→5点。10点ではない=誤答)／53-am-7(トイレ=部分介助→5点)／61-am-6(下衣の上げ下ろしに介助→5点)／55-am-5(自立→10点)",
    "q": [
     "52-am-6",
     "53-am-7",
     "55-am-5",
     "61-am-6"
    ],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.sralab.org/sites/default/files/2017-07/barthel.pdf"
     }
    ]
   },
   {
    "item": "BI 移乗(ベッド⇔椅子)",
    "target": "移乗動作",
    "value": "15点=自立／10点=軽介助(言語または身体)／5点=大介助(1〜2人の身体介助)で座位保持可／0点=不能(座位バランスなし)",
    "exam": "52-am-6(車椅子とベッド間の移乗で見守りが必要→10点=正答)／53-am-7(移乗に監視が必要→10点)／61-am-6(移乗は自力→15点)／55-am-5(移乗自立→15点)",
    "q": [
     "52-am-6",
     "53-am-7",
     "55-am-5",
     "61-am-6"
    ],
    "note": "確認済み[S1](「見守り=軽介助=10点」は原版の「verbal」介助の解釈。原版に「見守り」の語は直接ない)",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.sralab.org/sites/default/files/2017-07/barthel.pdf"
     }
    ]
   },
   {
    "item": "BI 移動(平地歩行・車椅子)",
    "target": "移動能力",
    "value": "15点=自立(杖等の補助具可)で50ヤード超／10点=1人の介助(言語または身体)で50ヤード超／5点=車椅子で自立(角を曲がれる)50ヤード超／0点=不動または50ヤード未満",
    "exam": "52-am-6(歩けないが車椅子を50m以上自力駆動→5点。選択肢「移動」は10点ではない=誤答)／53-am-7(車椅子で移動自立→5点)／61-am-6(杖と装具で介助30m歩行は0点相当。車椅子駆動可で5点)／55-am-5(歩行器で45m以上→15点)",
    "q": [
     "52-am-6",
     "53-am-7",
     "55-am-5",
     "61-am-6"
    ],
    "note": "確認済み[S1]。★原版は「50ヤード(約45.7m)超」。55-am-5 の問題文は「45m以上」で距離の表記が異なる(日本版の記載と考えられるが日本版の資料は未取得)",
    "conflict": true,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.sralab.org/sites/default/files/2017-07/barthel.pdf"
     }
    ]
   },
   {
    "item": "BI 階段",
    "target": "階段昇降",
    "value": "10点=自立／5点=介助(言語・身体・用具の運搬)／0点=不能",
    "exam": "55-am-5(階段は部分介助→5点)／61-am-6(階段に介助→5点)／53-am-7(記載なし→0点で計算して55点)",
    "q": [
     "53-am-7",
     "55-am-5",
     "61-am-6"
    ],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.sralab.org/sites/default/files/2017-07/barthel.pdf"
     }
    ]
   },
   {
    "item": "BI 自立で5点になる項目",
    "target": "配点の識別",
    "value": "自立で5点になるのは「整容」「入浴」の2項目のみ。他の項目は自立で10点または15点",
    "exam": "58-pm-41(正答=整容・入浴。誤答=更衣・食事・排尿コントロールは自立で10点)",
    "q": [
     "58-pm-41"
    ],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.sralab.org/sites/default/files/2017-07/barthel.pdf"
     }
    ]
   },
   {
    "item": "BI 計算問題:52-am-6",
    "target": "症例から項目別得点",
    "value": "10点と評価される項目=車椅子とベッド間の移乗(見守り=軽介助)。食事5・入浴0・移動(車椅子)5・トイレ5",
    "exam": "52-am-6(正答=移乗)",
    "q": [
     "52-am-6"
    ],
    "note": "確認済み[S1]。配点表で再計算して正答と一致",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.sralab.org/sites/default/files/2017-07/barthel.pdf"
     }
    ]
   },
   {
    "item": "BI 計算問題:53-am-7",
    "target": "右片麻痺のADL→総得点",
    "value": "食事10＋整容5＋更衣10＋トイレ5＋入浴0＋移乗10＋車椅子移動5＋排便5＋排尿5＋階段0＝55点",
    "exam": "53-am-7(選択肢35/45/55/65/75点、正答55点)",
    "q": [
     "53-am-7"
    ],
    "note": "確認済み[S1]。再計算して正答と一致",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.sralab.org/sites/default/files/2017-07/barthel.pdf"
     }
    ]
   },
   {
    "item": "BI 計算問題:55-am-5",
    "target": "慢性心不全のADL→総得点",
    "value": "食事10＋移乗15＋整容5＋トイレ10＋入浴5＋更衣10＋排便10＋排尿10＋歩行(補助具使用・45m以上)15＋階段(部分介助)5＝95点",
    "exam": "55-am-5(選択肢75/80/85/90/95点。DBの正答は90点と95点の両方を許容)",
    "q": [
     "55-am-5"
    ],
    "note": "確認済み[S1]。★原版の配点で再計算すると95点。90点も正答に許容されている理由(歩行距離の扱い等)は資料で確認できず、食い違いの可能性",
    "conflict": true,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.sralab.org/sites/default/files/2017-07/barthel.pdf"
     }
    ]
   },
   {
    "item": "BI 計算問題:61-am-6",
    "target": "右脳出血・左片麻痺→総得点",
    "value": "移乗15＋車椅子移動5＋階段(介助)5＋入浴(介助)0＋トイレ(下衣の上げ下ろしに介助)5＋排便10＋排尿10＋食事10＋整容5＝65点(更衣の記載なし→0点で計算した場合)",
    "exam": "61-am-6(選択肢55〜75点、5点刻み、正答65点)",
    "q": [
     "61-am-6"
    ],
    "note": "確認済み[S1]。更衣を0点とすれば正答65点と一致。更衣の扱いが問題文にないため一部は推定",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.sralab.org/sites/default/files/2017-07/barthel.pdf"
     }
    ]
   },
   {
    "item": "BI 総合点の重症度区分(Shah 1989)",
    "target": "依存度の程度",
    "value": "0〜20=全依存／21〜60=重度依存／61〜90=中等度依存／91〜99=軽度依存／100=自立",
    "exam": "出題なし(参考)",
    "q": [],
    "note": "確認済み[S2]。S2 は Shah 1989 の改変として記載",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://strokengine.ca/en/assessments/barthel-index-bi/"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-19",
  "review": "ai"
 },
 {
  "slug": "berg-balance-scale",
  "name": "Berg Balance Scale(BBS・FBS)",
  "category": "評価尺度",
  "aliases": [
   "BBS",
   "FBS",
   "Berg Balance Scale",
   "Functional Balance Scale",
   "バーグバランススケール",
   "Berg式バランススケール"
  ],
  "rows": [
   {
    "item": "BBS の構成(14項目・各0〜4・満点56点)",
    "target": "高齢者・脳卒中などのバランス能力",
    "value": "14項目、各項目0〜4の5段階で採点し、合計の満点は56点。高いほどバランスが良好(0=その課題ができない、4=自立して安全にできる)。所要時間は15〜20分ほど。",
    "exam": "61-pm-40(誤答:16項目・1〜4の4段階)／50回(正答:14項目からなる・得点が高いほどバランス能力が高い。誤答:1項目は4段階の評定)／57-am-36(FBS 42→52点は上昇=好ましい変化)／54-am-26(FBS 47→33点は低下=バランス機能の低下)／49-pm-10(症例の前提:FBS 52点)／49-pm-48(FBSは値が大きいほど機能良好)",
    "q": [
     "61-pm-40",
     "57-am-36",
     "54-am-26",
     "49-pm-10",
     "49-pm-48"
    ],
    "note": "確認済み[S1][S2][S3]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.apta.org/contentassets/8dc2763e7cfe4f97bbb9f98ccdf9d60a/bergbalancetest.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.sralab.org/rehabilitation-measures/berg-balance-scale"
     },
     {
      "label": "S3",
      "url": "https://www.e-arm.org/journal/view.php?number=4366"
     }
    ]
   },
   {
    "item": "BBS の14項目の内容",
    "target": "検査課題",
    "value": "①座位からの立ち上がり ②支持なし立位 ③背もたれなし座位 ④立位から着座 ⑤移乗 ⑥閉眼立位 ⑦閉脚立位 ⑧上肢前方リーチ ⑨床の物を拾う ⑩左右の後方を振り向く ⑪360度回転 ⑫台に足を交互にのせる ⑬片足を前に出した立位(タンデム) ⑭片脚立位。歩行(4m歩行時間など)の課題は含まれない。",
    "exam": "61-pm-40(正答:評価項目にタンデム立位保持が含まれる。誤答:4m歩行時間を含む)／50回(誤答:外乱負荷への反応を中心とした検査)",
    "q": [
     "61-pm-40"
    ],
    "note": "確認済み[S1]。用紙の項目に歩行速度の課題はない。外乱負荷への反応が中心の検査ではない点は、用紙の課題が静的・動的な姿勢保持中心であることからの整理。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.apta.org/contentassets/8dc2763e7cfe4f97bbb9f98ccdf9d60a/bergbalancetest.pdf"
     }
    ]
   },
   {
    "item": "転倒リスクのカットオフ",
    "target": "転倒の予測",
    "value": "Berg(1992)では、56点=バランス良好、45点未満=転倒リスクが高い可能性。対象によって値は異なり、Shumway-Cook(1997)は転倒歴ありで51点未満・転倒歴なしで42点未満が転倒の予測に有用(感度91%・特異度82%)、施設入所高齢者では47点未満(Viveiro 2019、感度94.4%・特異度54.8%)とされる。",
    "exam": "61-pm-40(誤答:転倒リスクのカットオフ値は56点=満点であってカットオフではない)／50回(誤答:カットオフ値は52点)／56-pm-20(正答:杖歩行自立の高齢者の転倒リスク評価にFBSが適切)",
    "q": [
     "61-pm-40",
     "56-pm-20"
    ],
    "note": "確認済み[S1]。最もよく使われるのは45点未満だが、単一の値ではない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.sralab.org/rehabilitation-measures/berg-balance-scale"
     }
    ]
   },
   {
    "item": "得点の目安(記録用紙)",
    "target": "移動能力のおおまかな区分",
    "value": "記録用紙の付記: 0〜20点=車椅子レベル、21〜40点=介助歩行、41〜56点=自立。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。この区分は移動能力の目安で、転倒リスクの区分として書かれたものではない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.apta.org/contentassets/8dc2763e7cfe4f97bbb9f98ccdf9d60a/bergbalancetest.pdf"
     }
    ]
   },
   {
    "item": "BBS が使われる対象・場面",
    "target": "評価指標の使い分け",
    "value": "脳卒中・脊髄損傷・多発性硬化症・Parkinson病・前庭障害などの患者や高齢者のバランス評価に使われる。脊髄小脳変性症の診療ガイドラインでも、姿勢障害の評価として紹介されている。",
    "exam": "55-pm-12(小脳性運動失調で「適切でない指標」を問う設問に、FBSは適切な指標として並ぶ=誤答側)／58-pm-50(BBSはバランス。VASは疼痛、MMSEは認知機能)／59-pm-82・53-am-37(正答:フレイルの高齢者でFBSは低値)",
    "q": [
     "55-pm-12",
     "58-pm-50",
     "59-pm-82",
     "53-am-37"
    ],
    "note": "確認済み[S1][S2]。フレイルとBBSの関連は、このカードの資料では確認していない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.sralab.org/rehabilitation-measures/berg-balance-scale"
     },
     {
      "label": "S2",
      "url": "https://neurology-jp.org/guidelinem/sd_mst/sd_mst_2018.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "bit-neglect",
  "name": "BIT行動性無視検査日本版(半側空間無視の検査)",
  "category": "検査法・徴候",
  "aliases": [
   "BIT",
   "Behavioral Inattention Test",
   "Behavioural Inattention Test",
   "行動性無視検査",
   "線分抹消試験",
   "線分抹消検査",
   "文字抹消試験",
   "星印抹消試験",
   "線分二等分試験"
  ],
  "rows": [
   {
    "item": "BITの構成とカットオフ",
    "target": "半側空間無視のスクリーニング・重症度把握",
    "value": "通常検査(6下位検査)は最高146点・カットオフ131点、行動検査(日常生活場面を模した9課題)は最高81点・カットオフ68点。いずれもカットオフ点以下を異常とする(2つの合計は足さずに別々に判定)",
    "exam": "59-pm-19(左片麻痺で常に右を向き左からの声かけに反応が遅い→最も優先度が高い検査結果=BITが正答)／誤答選択肢として登場: 53-am-29(記憶障害の評価はRBMT)、54-pm-41(「遂行機能障害―BIT」「半側空間無視―BADS」は誤り)、55-pm-8(数字を1から順に結ぶ検査はTMT-A)、49-pm-80(「1本の実のなる木を描く」検査はバウムテスト)、61-am-4・61-am-37・61-am-98(各問の誤答選択肢)",
    "q": [
     "59-pm-19",
     "53-am-29",
     "54-pm-41",
     "55-pm-8",
     "49-pm-80",
     "61-am-4",
     "61-am-37",
     "61-am-98"
    ],
    "note": "確認済み[S1]。通常検査の満点を141点とする解説もあるが、下位検査の最高点の合計(36+40+54+4+9+3)は146点でS1と一致",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/hbfr/24/3/24_3_232/_pdf"
     },
     {
      "label": "S2",
      "url": "https://www.st-medica.com/2016/03/behavioural-inattention-test-bit.html"
     }
    ]
   },
   {
    "item": "抹消試験(線分・文字・星印)",
    "target": "見落とし(抹消)の有無",
    "value": "線分抹消=最高36点(カットオフ34)、文字抹消=最高40点(カットオフ34)、星印抹消=最高54点(カットオフ51)。所要時間の正常上限の目安は線分抹消55秒・文字抹消160秒・星印抹消100秒(小泉ら2004)。時間をかけて代償的に探索している場合や、不規則な走査経路も無視の可能性を示す",
    "exam": "60-am-10(左片麻痺・常に非麻痺側を向き麻痺側の食べ残し・磨き残しが多い→最も優先順位が高い検査=線分抹消試験が正答)／52-pm-15(線分抹消検査で紙面左下方の線分を消せない左片麻痺。正答はプリズム眼鏡を用いたリーチ動作)",
    "q": [
     "60-am-10",
     "52-pm-15"
    ],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/hbfr/24/3/24_3_232/_pdf"
     }
    ]
   },
   {
    "item": "模写・線分二等分・描画試験",
    "target": "描き落とし・二等分点の偏り",
    "value": "模写=最高4点(カットオフ3)、線分二等分=最高9点(カットオフ7)、描画=最高3点(カットオフ2)。線分二等分では、100mm以上の長い線分は長いほど二等分点が右へ偏り、25mm程度の短い線分では逆に左へ偏る(cross-over)ことがある",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/hbfr/24/3/24_3_232/_pdf"
     }
    ]
   },
   {
    "item": "半側空間無視の判定の考え方",
    "target": "診断・見落とし防止",
    "value": "下位検査の1つでも、病巣と反対側の見落とし・描き落とし・線分二等分の偏りがあれば半側空間無視ありと診断できる。通常検査の合計がカットオフを超えていても、個々の下位検査のカットオフまで検討すると見落としが少ない。軽度・慢性期の患者は星印抹消などのカットオフをクリアすることがある",
    "exam": "57-pm-19(左片麻痺・机上検査の結果を図で提示。対応として誤っているのは「車椅子の右側のブレーキレバーを延長する」。検査名は図で未確認)",
    "q": [
     "57-pm-19"
    ],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/hbfr/24/3/24_3_232/_pdf"
     }
    ]
   },
   {
    "item": "行動検査(日常場面の課題)",
    "target": "日常生活での無視の程度",
    "value": "写真・電話・メニュー・音読・時計・硬貨・書写・地図・トランプの9課題。1課題の最高点は9点で合計81点、カットオフ68点以下を異常とする",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1](硬貨・書写・地図・トランプ課題と合計は表で確認)。課題名の全9種の並びは[S2]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/hbfr/24/3/24_3_232/_pdf"
     },
     {
      "label": "S2",
      "url": "https://www.st-medica.com/2016/03/behavioural-inattention-test-bit.html"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "bladder-function",
  "name": "排尿機能(尿意・膀胱容量・残尿)",
  "category": "臨床検査",
  "aliases": [
   "残尿量",
   "膀胱容量",
   "初発尿意"
  ],
  "rows": [
   {
    "item": "初発尿意・最大膀胱容量・残尿量",
    "target": "正常な蓄尿・排尿機能、神経因性膀胱",
    "value": "初発尿意 150〜250 mL、最大尿意（最大膀胱容量）300〜500 mL。慢性尿閉は300 mL以上の残尿とされる。脊髄損傷のバランス膀胱は残尿率20%以下（100 mL以下）",
    "exam": "56-pm-59 選択肢「成人の初発尿意は300〜350 mL」「最大容量は約1,200 mL」（どちらも不適。正答キーが空）。55-pm-84 誤答「残尿150 mLでは導尿は不要」",
    "q": [
     "55-pm-84",
     "56-pm-59"
    ],
    "note": "確認済み [S25]（残尿150 mLの導尿基準そのものは単一の閾値を確認できず）",
    "conflict": false,
    "sources": [
     {
      "label": "S25",
      "url": "https://www.jstage.jst.go.jp/article/spinalsurg/27/1/27_4/_pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-19",
  "review": "ai"
 },
 {
  "slug": "blood-tests-disease",
  "name": "疾患と血液検査所見(心筋梗塞・Dダイマー・血友病・骨髄腫・NT-proBNP)",
  "category": "臨床検査",
  "aliases": [
   "心筋トロポニン",
   "トロポニン",
   "CK-MB",
   "ミオグロビン",
   "心筋逸脱酵素",
   "心筋バイオマーカー",
   "Dダイマー",
   "D-ダイマー",
   "NT-proBNP",
   "BNP",
   "血友病",
   "多発性骨髄腫",
   "骨髄腫"
  ],
  "rows": [
   {
    "item": "急性心筋梗塞後に上昇する血液検査",
    "target": "心筋壊死のマーカー",
    "value": "心筋から血中へ逸脱して上昇するもの=CK・CK-MB・ミオグロビン・AST・LDH・心筋トロポニンT/I。心筋トロポニンは心筋特異度が高く健常人で上昇しない(基準=健常人の99パーセンタイル値超)。CK-MBはSTEMIで発症後3〜8時間で上昇、10〜24時間で最大、3〜6日で正常化",
    "exam": "56-am-91(上昇しないのはクレアチニン(正答)。トロポニンT・ミオグロビン・LD・CKは上昇)／50回(AMI後の血液検査所見でないもの=クレアチニン上昇(正答))／51回(誤答に「AST」「単球」)／60-am-39(誤答:CK-MB-末梢動脈疾患)",
    "q": [
     "56-am-91",
     "60-am-39"
    ],
    "note": "確認済み[S1]。資料の心筋マーカー一覧にクレアチニンは含まれない。白血球・単球の変化は資料で未確認。CK-MBは心筋のマーカーであり末梢動脈疾患とは結びつかない",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2018/11/JCS2018_kimura.pdf"
     }
    ]
   },
   {
    "item": "Dダイマー",
    "target": "深部静脈血栓症(DVT)の診断補助",
    "value": "検査前確率が低い人でDダイマーが基準未満なら原則DVTを除外できる(感度の高い測定法で1000 ng/mL未満)。中等度の検査前確率では500 ng/mL未満で除外。陽性は非特異的で、肝疾患・外傷・妊娠・炎症・最近の手術・がん・高齢でも上昇する(感度は高いが特異度は低い)",
    "exam": "60-am-39(正答:Dダイマー-深部静脈血栓症(DVT))",
    "q": [
     "60-am-39"
    ],
    "note": "確認済み[S1]。基準値は測定法で異なる",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/04-心血管疾患/末梢静脈疾患/深部静脈血栓症-dvt"
     }
    ]
   },
   {
    "item": "血友病",
    "target": "出血性疾患の症状と検査",
    "value": "症状=関節出血(繰り返すと滑膜炎・関節症)・筋肉血腫・後腹膜出血、頭蓋内出血。検査はPTT(APTT)が延長し、PTと血小板数は正常",
    "exam": "55-pm-92(血友病の最多症状=関節内出血(正答)。誤答:血小板数減少・出血時間延長)",
    "q": [
     "55-pm-92"
    ],
    "note": "確認済み[S1]。出血時間は資料に記載がなく未確認。「最多」という頻度は資料で確認していない(症状の最初に関節出血が挙がる)",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/11-血液学および腫瘍学/凝固障害/血友病"
     }
    ]
   },
   {
    "item": "多発性骨髄腫",
    "target": "形質細胞の腫瘍",
    "value": "高カルシウム血症(診断時に約10%)・貧血(約80%)・腎障害・多発する溶骨性病変と病的骨折・易感染性が特徴。診断=骨髄形質細胞10%以上、血漿/尿中Mタンパク、臓器障害(高カルシウム血症・腎機能不全・貧血・骨病変)",
    "exam": "55-pm-93(特徴的でないもの=低カルシウム血症(正答)。貧血・腎障害・易感染性・病的骨折は特徴的)",
    "q": [
     "55-pm-93"
    ],
    "note": "確認済み[S1]。資料に「CRAB」の語はないが、臓器障害の4項目がそれに当たる",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/11-血液学および腫瘍学/形質細胞疾患/多発性骨髄腫"
     }
    ]
   },
   {
    "item": "NT-proBNP(BNP)",
    "target": "心不全の指標",
    "value": "慢性心不全の運動療法の対象の目安(診療報酬上の基準):LVEF 40%以下、peak VO2が標準値の80%以下、BNP 80 pg/mL以上またはNT-proBNP 400 pg/mL以上のいずれか。経過中は症状・体重・BNPまたはNT-proBNPの変化に留意",
    "exam": "60-am-39(誤答:NT-proBNP-間質性肺疾患。NT-proBNPは心不全に用いる検査)",
    "q": [
     "60-am-39"
    ],
    "note": "確認済み[S1]。間質性肺疾患のマーカーはKL-6・SP-D(既存カードblood-tests)。eGFR-COPDの誤りは腎機能の指標である点(既存カードegfr)",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2021/03/JCS2021_Makita.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "blood-tests",
  "name": "血液検査の基準値",
  "category": "臨床検査",
  "aliases": [
   "白血球",
   "ヘモグロビン",
   "血小板",
   "クレアチニン",
   "CRP",
   "血清カリウム",
   "血清カルシウム",
   "ALP",
   "アルカリホスファターゼ",
   "CK",
   "クレアチンキナーゼ",
   "アミラーゼ",
   "KL-6",
   "SP-D"
  ],
  "rows": [
   {
    "item": "白血球数",
    "target": "炎症・感染の指標",
    "value": "共用基準範囲 3.3〜8.6 ×10^3/μL",
    "exam": "57-am-1 問題文 7.5×10^3/μL（基準3.3〜8.6）。61-pm-44 誤答（白血球数は腎機能評価に不適）",
    "q": [
     "57-am-1",
     "61-pm-44"
    ],
    "note": "確認済み [S1]（問題文の基準と一致）",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jccls.org/wp-content/uploads/2019/10/igakukyouikukijyun.pdf"
     }
    ]
   },
   {
    "item": "ヘモグロビン（血色素量）",
    "target": "貧血",
    "value": "共用基準範囲 男13.7〜16.8、女11.6〜14.8 g/dL。貧血の診断閾値は未確認",
    "exam": "57-am-1 問題文 12.5 g/dL（女性、基準11.6〜14.8）。53-pm-92 大球性貧血（葉酸欠乏）",
    "q": [
     "53-pm-92",
     "57-am-1"
    ],
    "note": "確認済み [S1]（基準範囲）。貧血の診断閾値は一次資料で未確認",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jccls.org/wp-content/uploads/2019/10/igakukyouikukijyun.pdf"
     }
    ]
   },
   {
    "item": "血小板数",
    "target": "出血傾向、肝不全、栄養評価では不適",
    "value": "共用基準範囲 158〜348 ×10^3/μL",
    "exam": "52-pm-50 正答「栄養評価に血小板数は不適」。52-pm-94 誤答「血友病で血小板減少」（正常）。55-am-46 誤答「多発性筋炎の運動負荷を血小板数で決める」。55-pm-92 誤答「血友病で血小板減少・出血時間延長」。58-am-92 誤答「肝不全で血小板増加」",
    "q": [
     "52-pm-50",
     "52-pm-94",
     "55-am-46",
     "55-pm-92",
     "58-am-92"
    ],
    "note": "確認済み [S1]（基準範囲）。出血時間の基準値は出題になし",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jccls.org/wp-content/uploads/2019/10/igakukyouikukijyun.pdf"
     }
    ]
   },
   {
    "item": "血清クレアチニン",
    "target": "腎機能、筋量",
    "value": "共用基準範囲 男0.65〜1.07、女0.46〜0.79 mg/dL",
    "exam": "57-am-1 問題文 0.74 mg/dL（女性、基準0.46〜0.79）。55-am-93 誤答「尿毒症で血清クレアチニン低下」（上昇）。57-am-47 正答「筋量の影響を受ける」。56-am-91 正答「心筋梗塞で上昇しない」。53-pm-24 誤答「加齢でクレアチニンクリアランス増加」",
    "q": [
     "53-pm-24",
     "55-am-93",
     "56-am-91",
     "57-am-1",
     "57-am-47"
    ],
    "note": "確認済み [S1]（基準範囲）",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jccls.org/wp-content/uploads/2019/10/igakukyouikukijyun.pdf"
     }
    ]
   },
   {
    "item": "CRP",
    "target": "炎症",
    "value": "共用基準範囲 0.00〜0.14 mg/dL",
    "exam": "57-am-1 問題文 2.25 mg/dL（基準0.00〜0.14）。57-am-17 問題文 3.1 mg/dL（基準0.3未満）。61-am-10 問題文「炎症反応は正常」（骨髄炎を否定）",
    "q": [
     "57-am-1",
     "57-am-17",
     "61-am-10"
    ],
    "note": "確認済み [S1]（57-am-1 の基準は一致）。57-am-17 の「0.3未満」は共用基準（0.14以下）と食い違う。施設により異なる",
    "conflict": true,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jccls.org/wp-content/uploads/2019/10/igakukyouikukijyun.pdf"
     }
    ]
   },
   {
    "item": "血清カリウム",
    "target": "尿毒症、神経性大食症",
    "value": "共用基準範囲 3.6〜4.8 mmol/L",
    "exam": "55-am-93 誤答「尿毒症で低カリウム血症」。52-am-99 誤答「神経性大食症で高カリウム血症」",
    "q": [
     "52-am-99",
     "55-am-93"
    ],
    "note": "確認済み [S1]（基準範囲）。高・低の区分の閾値は出題になし",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jccls.org/wp-content/uploads/2019/10/igakukyouikukijyun.pdf"
     }
    ]
   },
   {
    "item": "血清カルシウム",
    "target": "多発性骨髄腫、転移性骨腫瘍、骨粗鬆症",
    "value": "共用基準範囲 8.8〜10.1 mg/dL",
    "exam": "59-pm-94 誤答「前立腺癌転移で高率に低カルシウム血症」。57-pm-93 正答「多発性骨髄腫に特徴的でないのは低カルシウム血症」。57-am-89 誤答「原発性骨粗鬆症で低カルシウム血症」",
    "q": [
     "57-am-89",
     "57-pm-93",
     "59-pm-94"
    ],
    "note": "確認済み [S1]（基準範囲）",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jccls.org/wp-content/uploads/2019/10/igakukyouikukijyun.pdf"
     }
    ]
   },
   {
    "item": "ALP（アルカリホスファターゼ）",
    "target": "骨肉腫（上昇）",
    "value": "共用基準範囲 106〜322 U/L（測定法により異なる）",
    "exam": "61-am-10 問題文「ALP上昇」（骨肉腫・正答）。53-am-87 誤答「関節リウマチでALP高値」",
    "q": [
     "53-am-87",
     "61-am-10"
    ],
    "note": "確認済み [S1]（基準範囲）。測定法で値が変わる",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jccls.org/wp-content/uploads/2019/10/igakukyouikukijyun.pdf"
     }
    ]
   },
   {
    "item": "血清CK",
    "target": "筋炎・筋疾患、運動負荷量の目安",
    "value": "共用基準範囲 男59〜248、女41〜153 U/L",
    "exam": "57-pm-84 正答「多発性筋炎でCK上昇」。58-pm-17 誤答「重症筋無力症でCKを指標に運動量調整」。54-pm-91 誤答「重症筋無力症でCK上昇」。55-am-46 誤答（目安は血小板数ではない）。56-am-91 正答「心筋梗塞でCKは上昇」",
    "q": [
     "54-pm-91",
     "55-am-46",
     "56-am-91",
     "57-pm-84",
     "58-pm-17"
    ],
    "note": "確認済み [S1]（基準範囲）",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jccls.org/wp-content/uploads/2019/10/igakukyouikukijyun.pdf"
     }
    ]
   },
   {
    "item": "血中アミラーゼ",
    "target": "急性膵炎",
    "value": "共用基準範囲 44〜132 U/L",
    "exam": "54-pm-93 誤答「急性膵炎で血中アミラーゼが低下」（上昇が正）",
    "q": [
     "54-pm-93"
    ],
    "note": "確認済み [S1]（基準範囲。急性膵炎の診断閾値は出題になし）",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jccls.org/wp-content/uploads/2019/10/igakukyouikukijyun.pdf"
     }
    ]
   },
   {
    "item": "KL-6・SP-D",
    "target": "間質性肺炎の血清マーカー",
    "value": "KL-6 500 U/mL未満、SP-D 110 ng/mL未満",
    "exam": "57-am-17 問題文 KL-6 790 U/mL（基準500未満、間質性肺炎）。59-am-2 誤答選択肢（SP-D）。60-am-39 誤答「SP-D-慢性心不全」",
    "q": [
     "57-am-17",
     "59-am-2",
     "60-am-39"
    ],
    "note": "確認済み [S27]",
    "conflict": false,
    "sources": [
     {
      "label": "S27",
      "url": "https://www.jstage.jst.go.jp/article/naika/96/10/96_2144/_pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-19",
  "review": "ai"
 },
 {
  "slug": "bls",
  "name": "一次救命処置(BLS)",
  "category": "リスク管理",
  "aliases": [
   "一次救命処置",
   "BLS",
   "胸骨圧迫",
   "AED"
  ],
  "rows": [
   {
    "item": "一次救命処置: 胸骨圧迫の回数",
    "target": "成人の心停止(BLS)",
    "value": "胸骨圧迫は100〜120回/分",
    "exam": "54-am-38 正答「胸骨圧迫は1分間に100〜120回」／58-pm-26 正答(救急措置で正しいのは100〜120回/分)／59-am-40 正答「100回」(選択肢20・50・70・100・130回)／52-am-22 誤答選択肢「胸骨圧迫10回/分」",
    "q": [
     "52-am-22",
     "54-am-38",
     "58-pm-26",
     "59-am-40"
    ],
    "note": "確認済み(S9 JRC2020, S10 指針2025(JRC2025準拠), 2026-11-19)。改訂前後で変更なし。59-am-40の正答「100回」は100〜120回/分の下限で整合、130回は範囲外",
    "conflict": false,
    "sources": [
     {
      "label": "S9",
      "url": "https://www.jrc-cpr.org/wp-content/uploads/2022/07/JRC_0017-0046_BLS.pdf"
     },
     {
      "label": "S10",
      "url": "https://qqzaidan.jp/wp-content/uploads/2026/09/shishin2025_shimin_teisei_0910.pdf"
     }
    ]
   },
   {
    "item": "一次救命処置: 胸骨圧迫の深さ",
    "target": "成人の心停止(BLS)",
    "value": "胸が約5 cm沈む深さ。6 cmを超えない(2020)。小児は胸の厚さの約1/3",
    "exam": "54-am-38 誤答選択肢「胸骨が1 cm程度沈む強さ」／52-am-22 誤答選択肢「胸が1 cm沈む強さ」(正答の記録は約5 cm)",
    "q": [
     "52-am-22",
     "54-am-38"
    ],
    "note": "確認済み(S9 JRC2020「6 cmを超えない」, S10 指針2025「約5 cm」, 2026-11-19)。JRC2025原文の「6 cm」記述は本文未確認(指針2025は約5 cmまで)",
    "conflict": false,
    "sources": [
     {
      "label": "S9",
      "url": "https://www.jrc-cpr.org/wp-content/uploads/2022/07/JRC_0017-0046_BLS.pdf"
     },
     {
      "label": "S10",
      "url": "https://qqzaidan.jp/wp-content/uploads/2026/09/shishin2025_shimin_teisei_0910.pdf"
     }
    ]
   },
   {
    "item": "一次救命処置: 人工呼吸・AED・胸骨圧迫の中断",
    "target": "成人のBLS",
    "value": "人工呼吸は約1秒かけ胸が上がる程度の量を吹き込む、2回まで(胸が上がらなくても)。2回の吹込みの間の胸骨圧迫の中断はできるだけ短く(10秒以内)。電気ショックの後は直ちに胸骨圧迫(CPR)を再開。ショックは傷病者から離れて実施",
    "exam": "52-am-22 正答「人工呼吸は胸が上がる程度の空気を吹き込む」。誤答選択肢=呼吸数測定・人工呼吸10回以上連続／54-am-38 誤答選択肢「口対口の吹込みは続けて10回以上」「AED後は胸骨圧迫を行わない」「胸骨圧迫をしながら電気ショック」",
    "q": [
     "52-am-22",
     "54-am-38"
    ],
    "note": "確認済み(S9, S10, 2026-11-19)",
    "conflict": false,
    "sources": [
     {
      "label": "S9",
      "url": "https://www.jrc-cpr.org/wp-content/uploads/2022/07/JRC_0017-0046_BLS.pdf"
     },
     {
      "label": "S10",
      "url": "https://qqzaidan.jp/wp-content/uploads/2026/09/shishin2025_shimin_teisei_0910.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-19",
  "review": "ai"
 },
 {
  "slug": "bmi",
  "name": "BMI",
  "category": "臨床検査",
  "aliases": [
   "BMI",
   "体格指数"
  ],
  "rows": [
   {
    "item": "BMI",
    "target": "低体重・肥満の判定、栄養状態",
    "value": "BMI 18.5未満＝低体重、18.5以上25未満＝普通体重、25以上＝肥満（25〜30未満が肥満1度）",
    "exam": "61-pm-9 問題文 BMI 17.0（低体重）。60-am-14 問題文 身長165cm・体重45kg（BMI約16.5）。56-am-20 問題文 身長160cm・体重85.0kg（BMI約33）。56-pm-39 誤答「BMI 22.5未満で栄養障害」。52-pm-50 誤答（BMIは栄養評価に有用）。",
    "q": [
     "52-pm-50",
     "56-am-20",
     "56-pm-39",
     "60-am-14",
     "61-pm-9"
    ],
    "note": "確認済み [S22][S3]（日本肥満学会の判定）。56-pm-39 の「22.5未満」は公式の18.5未満と食い違うため誤り。GLIM基準のBMI値は日本栄養治療学会の頁で数値を確認できず（未確認）",
    "conflict": true,
    "sources": [
     {
      "label": "S3",
      "url": "https://www.jds.or.jp/uploads/fckeditor/files/uid000025_67756964655F323031382D323031392E706466.pdf"
     },
     {
      "label": "S22",
      "url": "https://www.jasso.or.jp/data/magazine/pdf/chart_A.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-19",
  "review": "ai"
 },
 {
  "slug": "brunnstrom-stage",
  "name": "Brunnstrom stage(BRS)",
  "category": "評価尺度",
  "aliases": [
   "Brunnstrom",
   "Brunnstrom法ステージ",
   "Brunnstrom recovery stage",
   "ブルンストローム",
   "ブルンストロームステージ",
   "Brunnstrom法"
  ],
  "rows": [
   {
    "item": "Brunnstrom stage 全体(Ⅰ〜Ⅵ)",
    "target": "片麻痺の回復段階(上肢・手指・下肢を別々に判定)",
    "value": "上肢・手指・下肢それぞれをⅠ〜Ⅵの6段階で評価する。Ⅰ=弛緩性(随意運動なし)／Ⅱ=わずかな共同運動・連合反応(痙縮の出現)／Ⅲ=共同運動を随意的に起こせる(痙縮が強い)／Ⅳ=分離運動が一部出現(痙縮が減り始める)／Ⅴ=分離運動が広がる／Ⅵ=分離運動が自由で、やや巧緻性に欠ける程度(ほぼ正常)。麻痺の回復段階の評価で、筋力の評価ではない。",
    "exam": "52-am-83(誤答:「筋力低下―Brunnstrom法ステージ」。入力記録では要確認)／51-am-7(図から上肢Ⅴ・手指Ⅴ・下肢Ⅴが正答)／症例の前提として多数(上肢Ⅱ・下肢Ⅲ、上肢・手指・下肢ともⅢなど)",
    "q": [
     "52-am-83",
     "51-am-7"
    ],
    "note": "確認[S1][S2][S6]。段階の説明は[S1](論文の表)と民間評価表[S3]。筋力はMotricity Indexなど別の尺度で評価すると[S2]が整理している。基準は一部あいまいで、段階間の一貫性に欠けるため微細な変化の把握には向かない[S2]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC9493089/"
     },
     {
      "label": "S2",
      "url": "https://www.jstage.jst.go.jp/article/jptpr/36/1/36_1/_pdf/-char/en"
     },
     {
      "label": "S3",
      "url": "https://www.stroke-lab.com/wp-content/uploads/2021/10/Br-PDF.pdf"
     },
     {
      "label": "S6",
      "url": "https://www.jstage.jst.go.jp/article/jjrmc/48/11/48_11_709/_pdf"
     }
    ]
   },
   {
    "item": "Brunnstrom stage 下肢Ⅲ・Ⅳ",
    "target": "下肢の回復段階",
    "value": "Ⅲ=座位で、明らかな関節運動を伴う屈筋共同運動(股・膝・足関節が同時に屈曲)。Ⅳ=座位で、膝を90°以上屈曲して足を床の後方へすべらす／座位で、踵を床につけたまま足関節を背屈する。",
    "exam": "59-pm-33(正答:座位で踵接地での足関節背屈=下肢Ⅳ。「ステージⅣの判定基準」を問う)／55-pm-33(誤答:下肢Ⅲ=座位で膝屈曲位、踵を床につけたまま足関節背屈。これはⅣの課題)／58-pm-33(誤答:下肢Ⅳ=座位で股・膝・足関節を同時に屈曲。これはⅢの課題)",
    "q": [
     "59-pm-33",
     "55-pm-33",
     "58-pm-33"
    ],
    "note": "確認[S3]。民間の評価表の記載で、公的資料での原文確認は未。国試の正答・誤答の整理と一致している。Ⅳの2課題のどちらでよいかなど、判定の細則は資料により扱いが異なる。",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://www.stroke-lab.com/wp-content/uploads/2021/10/Br-PDF.pdf"
     },
     {
      "label": "S4",
      "url": "https://www.stroke-lab.com/evaluation/21682"
     }
    ]
   },
   {
    "item": "Brunnstrom stage 下肢Ⅴ・Ⅵ",
    "target": "下肢の回復段階",
    "value": "Ⅴ=立位で、股関節を伸展位のまま膝関節のみ屈曲／立位で、踵を床につけたまま足関節を背屈。Ⅵ=立位での股関節外転(骨盤挙上の範囲を超える)／座位での下腿の内外旋(足の内外がえしを伴う)。",
    "exam": "58-pm-33(正答:下肢Ⅴ=立位で股伸展位のまま膝関節のみ屈曲。誤答:下肢Ⅵ=立位で膝伸展位で足関節のみ屈曲)／55-pm-33(誤答:下肢Ⅳ=立位で股関節伸展位での膝屈曲(Ⅴの課題)、下肢Ⅴ=立位で股関節外転(Ⅵの課題))／51-am-7(下肢Ⅴ=立位で股伸展位のまま膝屈曲)／61-am-34(下肢ステージⅤの脳卒中に足関節底屈制動式短下肢装具が適切、の組合せ)",
    "q": [
     "58-pm-33",
     "55-pm-33",
     "51-am-7",
     "61-am-34"
    ],
    "note": "確認[S3][S4]。民間の評価表の記載で、公的資料での原文確認は未。国試の正答・誤答の整理と一致している。",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://www.stroke-lab.com/wp-content/uploads/2021/10/Br-PDF.pdf"
     },
     {
      "label": "S4",
      "url": "https://www.stroke-lab.com/evaluation/21682"
     }
    ]
   },
   {
    "item": "Brunnstrom stage 上肢Ⅳ",
    "target": "上肢の回復段階",
    "value": "Ⅳ=座位で、腰の後ろに手を持っていく／肘伸展位で肩関節を90°屈曲する／肘を90°屈曲した位置で前腕の回内外をする。",
    "exam": "59-pm-33(ステージⅣの判定を問う。誤答:座位で肩関節90°外転=Ⅴ、肘伸展位で肩90°屈曲し前腕回内外=Ⅴ)／58-pm-33(誤答:上肢Ⅳ=座位で肘伸展位での前腕回内外。これはⅤの課題)／58-pm-15(問題文:上肢Ⅳ・手指Ⅲ・下肢Ⅳ)",
    "q": [
     "59-pm-33",
     "58-pm-33",
     "58-pm-15"
    ],
    "note": "確認[S3]。民間の評価表の記載。Ⅳは肘屈曲位での前腕回内外、肘伸展位での回内外はⅤ、と区別する。公的資料での原文確認は未。",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://www.stroke-lab.com/wp-content/uploads/2021/10/Br-PDF.pdf"
     },
     {
      "label": "S4",
      "url": "https://www.stroke-lab.com/evaluation/21682"
     }
    ]
   },
   {
    "item": "Brunnstrom stage 上肢Ⅴ",
    "target": "上肢の回復段階",
    "value": "Ⅴ=座位で、肘伸展・前腕回内位で肩関節を90°外転する(横水平挙上)／肘伸展位で手を頭上まで前方挙上する／肘伸展位・肩屈曲90°での前腕回内外。",
    "exam": "51-am-7(正答:上肢=肘伸展位で側方水平挙上=Ⅴ)／58-pm-33(誤答:上肢Ⅴ=座位で肘伸展位で前方水平位挙上。これはⅣ相当の課題)／59-pm-33(誤答:座位で肩90°外転は上肢Ⅴの課題)",
    "q": [
     "51-am-7",
     "58-pm-33",
     "59-pm-33"
    ],
    "note": "確認[S3]。民間の評価表の記載。肩90°屈曲までの肘伸展位挙上はⅣ、頭上までの挙上や肩90°外転はⅤ。公的資料での原文確認は未。",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://www.stroke-lab.com/wp-content/uploads/2021/10/Br-PDF.pdf"
     },
     {
      "label": "S4",
      "url": "https://www.stroke-lab.com/evaluation/21682"
     }
    ]
   },
   {
    "item": "Brunnstrom stage 手指Ⅱ〜Ⅵ",
    "target": "手指の回復段階",
    "value": "Ⅱ=全手指の屈曲がわずかに出現／Ⅲ=全手指屈曲で握れるが離せない／Ⅳ=不十分な全指伸展、横つまみが可能で母指の動きで離せる／Ⅴ=対向つまみ、円筒握り・球握り、全可動域の全指伸展／Ⅵ=個別の手指運動が可能。",
    "exam": "59-pm-33(誤答:手指で対向つまみ=Ⅴ)／55-pm-33(誤答:手指Ⅲ=不十分な全指伸展。これはⅣの課題)／51-am-7(手指Ⅴ=対向つまみ)",
    "q": [
     "59-pm-33",
     "55-pm-33",
     "51-am-7"
    ],
    "note": "確認[S3]。民間の評価表の記載。公的資料での原文確認は未。",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://www.stroke-lab.com/wp-content/uploads/2021/10/Br-PDF.pdf"
     }
    ]
   },
   {
    "item": "Brunnstrom stage 上肢Ⅲ(共同運動の構成)",
    "target": "屈筋共同運動・伸筋共同運動の要素",
    "value": "屈筋共同運動=肩外転・外旋、肘屈曲、前腕回外(手を対側の膝から同側の耳へ)。伸筋共同運動=肩内転・内旋、肘伸展、前腕回内(手を同側の耳から対側の膝へ)。Ⅲでは明らかな関節運動を伴うこれらの共同運動が随意的にできる。",
    "exam": "55-pm-33(正答:上肢Ⅲ=座位で肩関節内転・肘関節伸展・前腕回内)／55-pm-9(問題文:上肢Ⅲ・下肢Ⅳ。屈曲共同運動が出た患者で促通すべき筋=上腕三頭筋)",
    "q": [
     "55-pm-33",
     "55-pm-9"
    ],
    "note": "確認済み[S5](共同運動の構成。大学が公開するFugl-Meyer日本語版の記載)。Ⅲの課題との対応は[S3]。",
    "conflict": false,
    "sources": [
     {
      "label": "S5",
      "url": "https://gu.se/sites/default/files/2024-08/fugl-meyer-assessment-japanese-2024-06-09.pdf"
     },
     {
      "label": "S3",
      "url": "https://www.stroke-lab.com/wp-content/uploads/2021/10/Br-PDF.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "burns",
  "name": "熱傷の深度・面積・重症度",
  "category": "診断基準・分類",
  "aliases": [
   "熱傷",
   "9の法則",
   "Artzの基準"
  ],
  "rows": [
   {
    "item": "熱傷の深度分類",
    "target": "熱傷の深さ",
    "value": "Ⅰ度=紅斑・有痛性／浅達性Ⅱ度=紅斑・水疱・有痛性（水疱は圧迫で発赤が消失）／深達性Ⅱ度=紅斑・紫斑〜白色・水疱・知覚鈍麻（水疱は圧迫しても発赤が消失しない）／Ⅲ度=黒色・褐色または白色・水疱なし・無痛性",
    "exam": "54-am-94（正答: 深達性Ⅱ度熱傷では疼痛がみられる（DB正答）／誤答: Ⅰ度で水疱、浅達性Ⅱ度で水疱底は蒼白、Ⅲ度で創底から上皮化）／57-pm-34（正答: 深達性Ⅱ度で痛覚鈍麻）／53-am-77（誤答: 第Ⅰ度熱傷では熱感なし、浅達性Ⅱ度は瘢痕を残す、深達性Ⅱ度の水疱底は発赤、第Ⅲ度は疼痛が著明。正答は鼻咽腔内に煤=気道熱傷を疑う）／59-am-36（誤答: Ⅲ度熱傷は汗腺まで達しない、Ⅰ度熱傷部位は植皮術を要する、壊死組織は赤色）／55-am-20（問題文: Ⅲ度5%・Ⅱ度15%・気道熱傷）",
    "q": [
     "53-am-77",
     "54-am-94",
     "55-am-20",
     "57-pm-34",
     "59-am-36"
    ],
    "note": "確認済み(公式): 日本内科学会雑誌 111(2) 熱傷（創傷・褥瘡・熱傷ガイドライン-6、日皮会誌127:2261-2292, 2017 の表1を引用）https://www.jstage.jst.go.jp/article/naika/111/2/111_271/_pdf を読了。【食い違い】54-am-94は問題DBの正答（深達性Ⅱ度は疼痛あり）と、57-pm-34（深達性Ⅱ度は痛覚鈍麻）が、深達性Ⅱ度の疼痛の有無で割れている。ガイドライン表は「知覚鈍麻」で、完全に無痛ではない=疼痛が残る場合があると解釈できるが、確定は未確認。「浅達性Ⅱ度で瘢痕」「Ⅲ度は汗腺」などの誤答根拠は問題文のみ。2026-11-19",
    "conflict": true,
    "sources": [
     {
      "label": "資料1",
      "url": "https://www.jstage.jst.go.jp/article/naika/111/2/111_271/_pdf"
     }
    ]
   },
   {
    "item": "熱傷面積の算定・重症度・輸液適応",
    "target": "熱傷面積・重症度",
    "value": "面積: 9の法則（成人）・5の法則（小児）・Lund & Browder・手掌法（手掌=体表面積の約1%）。上肢1本9%・下肢1本18%・体幹前面/後面各18%。重症度: 中等症〜重症=Ⅱ度15%以上またはⅢ度2%以上、気道熱傷、顔面・手足・会陰部の熱傷、電撃傷・化学熱傷など／軽症=Ⅱ度15%未満かつⅢ度2%未満。輸液療法=成人15%以上（TBSA）、小児10%以上",
    "exam": "60-am-94（正答: Ⅱ度20%の熱傷には初期輸液が行われる／誤答: 化学損傷には洗浄を避ける、重症熱傷では蛋白質の異化は低下、受傷後早期には創傷被覆材を使用しない、広範囲熱傷の壊死組織に早期手術を行わない）／54-am-94・57-pm-34（誤答: 熱傷面積はⅠ・Ⅱ・Ⅲ度すべてを合わせる）／55-am-20（問題文: Ⅲ度5%+Ⅱ度15%）",
    "q": [
     "54-am-94",
     "55-am-20",
     "57-pm-34",
     "60-am-94"
    ],
    "note": "確認済み(公式): 同上 日本内科学会雑誌 111(2) を読了、および日本熱傷学会 http://www.jsbi-burn.org/ippan/chishiki/outline.html（手掌法1%、上肢9%・下肢18%）。【食い違い】同論文で輸液適応が、表は「15%以上」、本文は「15%を超える」。熱傷面積にⅠ度を含めない点（国試の誤答「すべて合算」の根拠）は、本文が改ページで切れて読めず未確認。2026-11-19",
    "conflict": true,
    "sources": [
     {
      "label": "資料1",
      "url": "http://www.jsbi-burn.org/ippan/chishiki/outline.html（手掌法1%"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-19",
  "review": "ai"
 },
 {
  "slug": "cancer-rehab-risk",
  "name": "がん患者のリハビリテーションのリスク管理(骨髄抑制・中止基準)",
  "category": "リスク管理",
  "aliases": [
   "骨髄抑制",
   "がんのリハビリテーション",
   "がんリハビリテーション",
   "がんリハ"
  ],
  "rows": [
   {
    "item": "血液所見による中止基準(骨髄抑制)",
    "target": "がん患者のリハビリテーションの中止基準",
    "value": "ヘモグロビン7.5 g/dL以下、血小板50,000/μL以下、白血球3,000/μL以下は、リハビリテーションの中止基準の例とされる。",
    "exam": "56-am-47(正答:骨髄抑制の状態に合わせて理学療法の内容を変更する)",
    "q": [
     "56-am-47"
    ],
    "note": "確認済み[S1]。日本緩和医療学会サイト掲載の2016年版ガイドライン資料(運動療法の章)で、2013年の日本リハビリテーション医学会のがんのリハビリテーションガイドラインなどを引いた「教科書的な注意事項(GPP)」。現行版(第2版・2019年)の本文は未確認。数値で一律に中止するというより、状態に合わせて内容を変える国試の言い回しと合う。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://jspm.ne.jp/files/guideline/cam_2016/03_04.pdf"
     }
    ]
   },
   {
    "item": "その他の中止基準",
    "target": "がん患者のリハビリテーションの中止基準",
    "value": "骨転移／腸・膀胱・尿管などの管腔臓器、血管、脊髄の圧迫／持続する痛み・呼吸困難・運動障害を伴う胸膜・心嚢・後腹膜への浸出液／中枢神経の機能低下・意識障害・頭蓋内圧亢進／低・高カリウム血症、低ナトリウム血症、低・高カルシウム血症／起立性低血圧／110回/分以上の頻脈・心室性不整脈／38.3℃以上の発熱。",
    "exam": "56-am-47(同じ設問の背景。この行の数値は直接は問われていない)",
    "q": [
     "56-am-47"
    ],
    "note": "確認済み[S1]。日本緩和医療学会サイト掲載の2016年版ガイドライン資料(運動療法の章)で、2013年の日本リハビリテーション医学会のがんのリハビリテーションガイドラインなどを引いた「教科書的な注意事項(GPP)」。現行版(第2版・2019年)の本文は未確認。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://jspm.ne.jp/files/guideline/cam_2016/03_04.pdf"
     }
    ]
   },
   {
    "item": "運動を避ける時期・場面",
    "target": "がん治療中の運動療法の一般的注意",
    "value": "抗がん剤の点滴中と治療後24時間以内は運動を避ける。重い貧血があるときは改善してから行う。白血球が減っているときは感染予防のため公共施設での運動を避ける。放射線治療中は皮膚を守るため(塩素を含む)プールを避ける。高齢者では重い骨粗鬆症や骨転移に注意する。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。日本緩和医療学会サイト掲載の2016年版ガイドライン資料(運動療法の章)で、2013年の日本リハビリテーション医学会のがんのリハビリテーションガイドラインなどを引いた「教科書的な注意事項(GPP)」。現行版(第2版・2019年)の本文は未確認。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://jspm.ne.jp/files/guideline/cam_2016/03_04.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "cerebellar-ataxia",
  "name": "小脳性運動失調の症候と協調性検査(SARA)",
  "category": "検査法・徴候",
  "aliases": [
   "小脳性運動失調",
   "運動失調",
   "SARA",
   "測定異常",
   "ジスメトリー",
   "dysmetria",
   "反復拮抗運動障害",
   "反復拮抗運動不能",
   "企図振戦",
   "運動分解",
   "鼻指鼻試験",
   "指鼻試験",
   "踵脛試験",
   "前腕回内外試験",
   "注視方向性眼振",
   "断綴性発語",
   "筋緊張低下"
  ],
  "rows": [
   {
    "item": "小脳性運動失調の症候(障害部位ごと)",
    "target": "小脳障害の症候の整理",
    "value": "小脳半球:運動分解・測定異常(測定過多)・反復拮抗運動障害・筋緊張低下・リバウンド現象・小脳性構音障害。虫部:歩行障害・平衡障害(継ぎ足歩行の選択的障害)。片葉:前庭眼反射の異常(眼振・眼球運動の測定異常)。歯状核から出る遠心路:企図振戦・動作性ミオクローヌス。",
    "exam": "60-pm-83(正答:筋緊張低下・ジスメトリー。誤答:静止時振戦・深部感覚障害・病的反射陽性)。56-pm-82(左小脳半球梗塞で生じやすい=構音障害)。56-am-34(歯状核−協調運動障害の組合せが正答)。50-am-26(小脳皮質〜上小脳脚の病巣=動作時振戦が正答)",
    "q": [
     "60-pm-83",
     "56-pm-82",
     "56-am-34",
     "50-am-26"
    ],
    "note": "確認済み[S1]。静止時振戦は資料の小脳症候に含まれない(振戦は企図振戦)。56-am-34の『歯状核−協調運動障害』は、資料では歯状核出力の障害が企図振戦・ミオクローヌスと対応し、協調運動障害は小脳機能障害一般として記載されており、細かい対応は確認できていない。左小脳半球梗塞の失調が同側に出るという点は資料では未確認。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://neurology-jp.org/guidelinem/sd_mst/sd_mst_2018.pdf"
     }
    ]
   },
   {
    "item": "SARA(運動失調の評価尺度)",
    "target": "脊髄小脳変性症などの運動失調の重症度",
    "value": "8項目・最重症40点。歩行(0〜8)、立位(0〜6)、坐位(0〜4)、言語障害(0〜6)、指追い試験(0〜4)、鼻-指試験(0〜4)、手の回内回外(0〜4)、踵-すね試験(0〜4)。四肢の4項目は左右を別々に採点し平均を使う。点が高いほど重症。",
    "exam": "58-am-32(正答:脊髄小脳変性症の運動失調を評価するもの=SARA)",
    "q": [
     "58-am-32"
    ],
    "note": "確認済み[S1][S2]。ICARS(19項目・最重症100点)よりも簡便に作られた尺度(S1)。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://neurology-jp.org/guidelinem/sd_mst/sd_mst_2018.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.sralab.org/sites/default/files/2017-06/SARA.pdf"
     }
    ]
   },
   {
    "item": "測定異常(ジスメトリー)",
    "target": "目標までの距離を誤る協調運動の障害",
    "value": "運動が目標を行き過ぎる(overshoot)または届かない(undershoot)。SARAの指追い試験では、目標からのずれの大きさ(5cm未満・15cm未満・15cm超)で採点する。眼球運動でも測定異常(サッカードの測定異常)がみられる。",
    "exam": "57-pm-8(多発性硬化症の小脳症状。図の動きは測定異常=正答。図は未確認)。60-pm-83(ジスメトリーは正答)。52-pm-12(鼻指鼻試験で測定異常あり)",
    "q": [
     "57-pm-8",
     "60-pm-83",
     "52-pm-12"
    ],
    "note": "確認済み[S1][S2]。57-pm-8の図の内容は確認していない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://neurology-jp.org/guidelinem/sd_mst/sd_mst_2018.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.sralab.org/sites/default/files/2017-06/SARA.pdf"
     }
    ]
   },
   {
    "item": "反復拮抗運動障害と前腕回内外試験",
    "target": "拮抗する運動を素早く交互に行う能力",
    "value": "手の回内・回外を交互に、ペースを上げて行わせる。SARAでは、大腿の上で回内回外を10サイクル繰り返し、規則性と所要時間(10秒未満か)で採点する。",
    "exam": "56-pm-29(正答:前腕回内外試験=反復拮抗運動障害の検査。誤答:線引き試験・継ぎ足歩行・片足立ち検査・示指−耳朶試験)",
    "q": [
     "56-pm-29"
    ],
    "note": "確認済み[S2][S3]。継ぎ足歩行はSARAの歩行・立位の評価に使われる(別の協調性・バランス検査)。線引き試験と示指−耳朶試験は資料に記載がなく確認していない。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.sralab.org/sites/default/files/2017-06/SARA.pdf"
     },
     {
      "label": "S3",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-%E7%A5%9E%E7%B5%8C%E7%96%BE%E6%82%A3/%E7%A5%9E%E7%B5%8C%E5%AD%A6%E7%9A%84%E8%A8%BA%E5%AF%9F/%E6%AD%A9%E8%A1%8C-%E5%A7%BF%E5%8B%A2-%E3%81%8A%E3%82%88%E3%81%B3%E5%8D%94%E8%AA%BF%E9%81%8B%E5%8B%95%E3%81%AE%E8%A9%95%E4%BE%A1"
     }
    ]
   },
   {
    "item": "鼻指鼻(指鼻)試験・踵脛試験と企図振戦",
    "target": "上肢・下肢の協調運動の検査",
    "value": "指鼻試験=指を自分の鼻に当て、次に検者の指に当てる。踵脛試験=踵を反対の膝に当て、すねに沿って動かす。どちらでも、片側から反対側へ振れる企図振戦は小脳機能障害を示唆する。SARAの鼻-指試験は、運動時の振戦の振幅(2cm未満・5cm未満・5cm超)で採点。",
    "exam": "52-am-83(正答:運動失調 ── 指鼻試験)。52-pm-12(鼻指鼻試験で測定異常・注視方向性眼振・構音障害から小脳性失調と判断し、rhythmic stabilizationが正答)。51-pm-9(鼻から目標へ示指を動かした軌跡=企図振戦・測定障害の図から、みられる可能性が高いのは断綴性発語)",
    "q": [
     "52-am-83",
     "52-pm-12",
     "51-pm-9"
    ],
    "note": "確認済み[S2][S3]。rhythmic stabilizationが小脳性失調に適応という点、断綴性発語の位置づけは資料では確認していない(構音障害が小脳半球障害の症候である点のみ[S1]で確認)。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.sralab.org/sites/default/files/2017-06/SARA.pdf"
     },
     {
      "label": "S3",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-%E7%A5%9E%E7%B5%8C%E7%96%BE%E6%82%A3/%E7%A5%9E%E7%B5%8C%E5%AD%A6%E7%9A%84%E8%A8%BA%E5%AF%9F/%E6%AD%A9%E8%A1%8C-%E5%A7%BF%E5%8B%A2-%E3%81%8A%E3%82%88%E3%81%B3%E5%8D%94%E8%AA%BF%E9%81%8B%E5%8B%95%E3%81%AE%E8%A9%95%E4%BE%A1"
     }
    ]
   },
   {
    "item": "小脳性・深部感覚性・前庭性の運動失調の違い",
    "target": "失調のタイプの見分け",
    "value": "運動失調は小脳系・深部感覚系・前庭系のいずれの障害でも起こる。深部感覚性:起立歩行が不安定で、閉眼で悪化(Romberg陽性、視覚で代償)。前庭性:回転性めまい・悪心、定方向性眼振や頭位変換性眼振、一側への偏倚(閉眼足踏み試験で回転、羅針盤歩行)。小脳性は注視方向性眼振が特徴的。",
    "exam": "60-pm-83(誤答:深部感覚障害)。53-am-36(前庭性に特異的ではない選択肢として提示)",
    "q": [
     "60-pm-83",
     "53-am-36"
    ],
    "note": "確認済み[S1]。53-am-36は選択肢の中身が入力記録にないため、どの所見かは確認できていない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://neurology-jp.org/guidelinem/sd_mst/sd_mst_2018.pdf"
     }
    ]
   },
   {
    "item": "小脳性運動失調の歩行",
    "target": "歩行観察での小脳性失調の判断",
    "value": "平衡の維持が難しいため、安定を得ようとして歩隔を広くとって歩く。",
    "exam": "52-pm-12(症例:歩隔やや広い・前後への振り子様の歩容=小脳性失調と判断する問題)",
    "q": [
     "52-pm-12"
    ],
    "note": "確認済み[S3]。『前後への振り子様』の歩容そのものは資料に記載がなく、歩隔の拡大のみ確認。",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-%E7%A5%9E%E7%B5%8C%E7%96%BE%E6%82%A3/%E7%A5%9E%E7%B5%8C%E5%AD%A6%E7%9A%84%E8%A8%BA%E5%AF%9F/%E6%AD%A9%E8%A1%8C-%E5%A7%BF%E5%8B%A2-%E3%81%8A%E3%82%88%E3%81%B3%E5%8D%94%E8%AA%BF%E9%81%8B%E5%8B%95%E3%81%AE%E8%A9%95%E4%BE%A1"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "cobb-angle",
  "name": "Cobb角",
  "category": "臨床検査",
  "aliases": [
   "Cobb角",
   "コブ角"
  ],
  "rows": [
   {
    "item": "Cobb角",
    "target": "脊柱側弯症の装具・手術の適応",
    "value": "装具療法は25°を超えて進行が予測される場合（目安25〜40°）。25°未満でも外見上のhumpが大きければ装具。45°を超えると手術適応",
    "exam": "60-pm-13 問題文 15歳女子・胸椎Cobb角30°→Milwaukee装具（正答）",
    "q": [
     "60-pm-13"
    ],
    "note": "確認済み [S23]（装具学会誌の総説。学会ガイドライン本体は未確認）",
    "conflict": false,
    "sources": [
     {
      "label": "S23",
      "url": "https://www.jstage.jst.go.jp/article/jspo/32/3/32_198/_pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-19",
  "review": "ai"
 },
 {
  "slug": "cranial-nerve-exam",
  "name": "脳神経の検査(支配神経・反射)",
  "category": "検査法・徴候",
  "aliases": [
   "脳神経",
   "脳神経検査",
   "副神経",
   "三叉神経",
   "顔面神経",
   "舌咽神経",
   "迷走神経",
   "舌下神経",
   "動眼神経",
   "滑車神経",
   "外転神経",
   "内耳神経",
   "視神経",
   "対光反射",
   "角膜反射",
   "咽頭反射",
   "前庭動眼反射",
   "眼輪筋",
   "味覚",
   "cranial nerve"
  ],
  "rows": [
   {
    "item": "副神経(Ⅺ)",
    "target": "運動神経のみの脳神経/胸鎖乳突筋・僧帽筋の検査",
    "value": "胸鎖乳突筋と僧帽筋(上部)を支配する。検査は、胸鎖乳突筋=抵抗に逆らって頭部を回旋させ筋を触れる、僧帽筋上部=抵抗に逆らって肩を挙上させる。主に運動性の神経で、迷走神経と合流して喉頭・咽頭・軟口蓋の運動にも関わる。",
    "exam": "60-am-53(運動神経線維のみを含む脳神経=副神経が正答)／53-am-61(誤答:咽頭反射―副神経)",
    "q": [
     "60-am-53",
     "53-am-61"
    ],
    "note": "確認済み[S1][S2]。副神経は主に運動性だが、近年は少量の感覚(侵害受容)線維を含むとの報告もある[S2]。国試は「運動神経線維のみ」と整理しており、設問の選択肢の範囲では副神経が答え。咽頭反射は舌咽・迷走神経[S1]。",
    "conflict": true,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-神経疾患/神経学的診察/脳神経の評価"
     },
     {
      "label": "S2",
      "url": "https://pubmed.ncbi.nlm.nih.gov/29939544/"
     }
    ]
   },
   {
    "item": "三叉神経(Ⅴ):顔面の感覚と咀嚼筋",
    "target": "顔面の皮膚感覚を担う脳神経",
    "value": "顔面の感覚(眼神経V1・上顎神経V2・下顎神経V3の3枝)と咀嚼筋の運動を担う。検査はピンで顔面の感覚を調べ、咬筋を触れながら歯をくいしばらせ、開口に抵抗を加える。",
    "exam": "60-pm-47(顔面の皮膚感覚=第Ⅴ脳神経(三叉神経))",
    "q": [
     "60-pm-47"
    ],
    "note": "確認済み[S1][S2]。顔面の感覚が全て消失しているときは下顎角(C2支配)も調べる[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-神経疾患/神経学的診察/脳神経の評価"
     },
     {
      "label": "S2",
      "url": "https://pubmed.ncbi.nlm.nih.gov/29489263/"
     }
    ]
   },
   {
    "item": "顔面神経(Ⅶ)の検査(表情筋・眼輪筋)",
    "target": "顔面神経麻痺の検査と、他の脳神経との区別",
    "value": "顔面表情筋、舌の前2/3の味覚(感覚)、アブミ骨筋、涙腺などの副交感神経を担う。検査は自然な表情や笑顔、額のしわ寄せ、閉眼の左右差を見る。額のしわ寄せと閉眼が保たれ下顔面だけが麻痺するときは、病変が中枢側(上位)にあると考える。",
    "exam": "56-am-30(第Ⅶ脳神経の検査=眼輪筋筋力が正答。誤答:眼球運動(Ⅲ・Ⅳ・Ⅵ)、咀嚼筋力(Ⅴ)、調節反射(Ⅲ)、軟口蓋反射(Ⅸ・Ⅹ))",
    "q": [
     "56-am-30"
    ],
    "note": "確認済み[S1][S2]。誤答の眼球運動=Ⅲ・Ⅳ・Ⅵ、咀嚼筋=Ⅴ、軟口蓋の挙上=Ⅸ・Ⅹは[S1]と一致。調節反射=Ⅲは資料で未確認。眼輪筋そのものの記載は無く、閉眼の確認が眼輪筋の検査にあたる。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-神経疾患/神経学的診察/脳神経の評価"
     },
     {
      "label": "S2",
      "url": "https://pubmed.ncbi.nlm.nih.gov/30252375/"
     }
    ]
   },
   {
    "item": "味覚の支配神経",
    "target": "味覚を伝える脳神経",
    "value": "舌の前2/3の味覚は顔面神経(Ⅶ)。検査は舌の前2/3に甘味・酸味・塩味・苦味の溶液を綿棒で与えて調べる。",
    "exam": "60-pm-53(味覚を支配する脳神経=舌咽神経・迷走神経が正答(2つ)。選択肢に顔面神経はない)／49-pm-57(味覚を支配=顔面神経・舌咽神経)",
    "q": [
     "60-pm-53",
     "49-pm-57"
    ],
    "note": "舌の前2/3=顔面神経は確認済み[S1][S2]。国試の「舌咽神経・迷走神経」(舌後方・咽頭側の味覚)は、今回の資料では確認できていないので、ここには書かない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-神経疾患/神経学的診察/脳神経の評価"
     },
     {
      "label": "S2",
      "url": "https://pubmed.ncbi.nlm.nih.gov/30252375/"
     }
    ]
   },
   {
    "item": "対光反射(Ⅱ・Ⅲ)",
    "target": "瞳孔の対光反応を担う脳神経",
    "value": "視神経(Ⅱ)は直接・間接(共感性)対光反射の検査に関わり、動眼神経(Ⅲ)は瞳孔の左右対称性と対光反応の敏捷さの確認に関わる。薄暗い部屋で瞳孔不同と対光反応を見る。",
    "exam": "53-am-61(対光反射―動眼神経が正答。他は誤答:角膜反射―視神経、前庭動眼反射―三叉神経、下顎反射―顔面神経、咽頭反射―副神経)",
    "q": [
     "53-am-61"
    ],
    "note": "確認済み[S1]。国試は反射の遠心路(動眼神経)を答えさせている。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-神経疾患/神経学的診察/脳神経の評価"
     }
    ]
   },
   {
    "item": "角膜反射(Ⅴ・Ⅶ)",
    "target": "角膜反射の求心路",
    "value": "三叉神経(Ⅴ)は角膜反射の求心路。検査は綿球で角膜の下側または側方に触れる。顔面神経麻痺による瞬目の減弱と区別して判定する。",
    "exam": "53-am-61(誤答:角膜反射―視神経)",
    "q": [
     "53-am-61"
    ],
    "note": "確認済み[S1]。遠心路が顔面神経であることは今回の資料に明記が無く、書いていない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-神経疾患/神経学的診察/脳神経の評価"
     }
    ]
   },
   {
    "item": "咽頭反射・口蓋挙上(Ⅸ・Ⅹ)",
    "target": "舌咽神経・迷走神経の検査",
    "value": "舌咽神経(Ⅸ)と迷走神経(Ⅹ)は口蓋の挙上と咽頭反射に関わり、同時に評価する。検査は「あー」と発声させて口蓋の挙上を見て、舌圧子で咽頭後壁の左右に触れて咽頭反射を調べる。迷走神経は声帯運動にも関わり、嗄声があれば声帯を見る。両側の咽頭反射の消失は健常者でもありうる。",
    "exam": "53-am-61(誤答:咽頭反射―副神経)／56-am-30(誤答:軟口蓋反射(Ⅸ・Ⅹ)は第Ⅶ脳神経の検査ではない)",
    "q": [
     "53-am-61",
     "56-am-30"
    ],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-神経疾患/神経学的診察/脳神経の評価"
     }
    ]
   },
   {
    "item": "内耳神経(Ⅷ):前庭機能・聴覚",
    "target": "前庭動眼反射を担う脳神経の整理",
    "value": "内耳神経(Ⅷ)は聴覚と前庭機能を担う。検査はささやき声による聴力、Weber・Rinne試験、眼振の観察、頭部強制回旋試験、Dix-Hallpike法など。",
    "exam": "53-am-61(誤答:前庭動眼反射―三叉神経)",
    "q": [
     "53-am-61"
    ],
    "note": "確認済み[S1]。前庭動眼反射=前庭機能(内耳神経)の側であり、三叉神経ではない。「前庭動眼反射」という語そのものは資料に出てこない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-神経疾患/神経学的診察/脳神経の評価"
     }
    ]
   },
   {
    "item": "舌下神経(Ⅻ)",
    "target": "舌の運動を支配する神経と、その神経核の位置",
    "value": "舌の運動を支配する。検査は舌を出させて、萎縮・線維束性収縮・偏位を確認する(偏位は病変側)。舌下神経核とその根は延髄にある。",
    "exam": "49-pm-54(舌の運動を支配する神経(舌下神経)の神経核=延髄)",
    "q": [
     "49-pm-54"
    ],
    "note": "確認済み[S1][S2]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-神経疾患/神経学的診察/脳神経の評価"
     },
     {
      "label": "S2",
      "url": "https://www.igaku-shoin.co.jp/seigo/00601/p146_5-1.pdf"
     }
    ]
   },
   {
    "item": "眼球運動(Ⅲ・Ⅳ・Ⅵ)",
    "target": "眼球運動を担う脳神経",
    "value": "動眼神経(Ⅲ)・滑車神経(Ⅳ)・外転神経(Ⅵ)が眼球運動を担う(外転神経は外直筋)。動眼神経は眼瞼挙上と瞳孔にも関わる。検査は指やペンライトを4象限と正中線を横切るように動かして、眼球運動・眼位・眼瞼下垂・眼振を見る。",
    "exam": "56-am-30(第Ⅶ脳神経の検査の誤答:眼球運動(Ⅲ・Ⅳ・Ⅵ))",
    "q": [
     "56-am-30"
    ],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-神経疾患/神経学的診察/脳神経の評価"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "crutch-cane-fitting",
  "name": "松葉杖・T字杖の適合(長さ・握り・杖先の位置)",
  "category": "検査法・徴候",
  "aliases": [
   "松葉杖",
   "腋窩支持型杖",
   "T字杖",
   "ロフストランド杖",
   "前腕支持型杖",
   "杖の長さ",
   "脇当て",
   "杖先",
   "杖の適合",
   "松葉杖歩行",
   "3動作歩行",
   "2動作歩行"
  ],
  "rows": [
   {
    "item": "松葉杖(腋窩支持型)の長さ:脇当てと腋窩の間",
    "target": "松葉杖の長さの合わせ方",
    "value": "脇当ての上端が腋窩から2〜3横指(約5cm)下にくるように長さを調整する(MSDマニュアルの手順の別の箇所では2.5〜5cm下)。愛媛県立中央病院の指導資料も『指3本分空ける』。脇に隙間なく当てるのではない。",
    "exam": "58-pm-12(正答:腋窩と脇当ての隙間=3横指・肘関節屈曲30度の組合せ)。61-pm-22(誤答:脇当てと腋窩を隙間なく／杖は身長から50cm引いた長さ)。52-am-31(誤答:松葉杖の脇当ては腋窩から15cm下方)",
    "q": [
     "58-pm-12",
     "61-pm-22",
     "52-am-31"
    ],
    "note": "確認済み[S1][S2]。『身長から50cm引く』という算式は資料に記載がなく確認できていない。『腋窩から15cm下方』は資料の2〜3横指(約5cm)と合わない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/22-外傷と中毒/ギプス固定/腋窩支持型杖の調整と腋窩支持型杖による歩行"
     },
     {
      "label": "S2",
      "url": "https://www.eph.pref.ehime.jp/epch/guide/asset/reha-single-crutch-20230106.pdf"
     }
    ]
   },
   {
    "item": "松葉杖の握りの高さと肘の角度",
    "target": "握りの位置の合わせ方",
    "value": "握り(ハンドグリップ)は肘が軽く曲がる位置に調整する(MSDマニュアルでは肘が約20〜30°屈曲。手順の別箇所では約15〜30°)。愛媛県立中央病院の資料も『肘は軽く曲げる』。",
    "exam": "58-pm-12(正答:肘関節屈曲30度)。61-pm-22(誤答:肘関節伸展位)。53-pm-19(杖の肘角度:屈曲30度=関節角度150度が正答)",
    "q": [
     "58-pm-12",
     "61-pm-22",
     "53-pm-19"
    ],
    "note": "確認済み[S1][S2]。肘屈曲30度は関節角度でいうと150度(180度が完全伸展)。MSDマニュアルの記載内に15〜30°と20〜30°の幅がある。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/22-外傷と中毒/ギプス固定/腋窩支持型杖の調整と腋窩支持型杖による歩行"
     },
     {
      "label": "S2",
      "url": "https://www.eph.pref.ehime.jp/epch/guide/asset/reha-single-crutch-20230106.pdf"
     }
    ]
   },
   {
    "item": "杖先の位置(松葉杖・T字杖)",
    "target": "杖の長さを決めるときの立ち位置",
    "value": "T字杖:足先より約15cm外側に杖先を置き、肘を約30度曲げた高さにする(テクノエイド協会)。松葉杖:愛媛県立中央病院の資料では足から前方15cm・外側15cm。MSDマニュアルでは、靴の側面から外側に約5cm、つま先から前方15cm。",
    "exam": "53-pm-19(正答:杖先は足先の前外側15cm・肘関節30度屈曲=15cm・150度。誤答:20cm-100度／15cm-100度／5cm-150度／5cm-180度)。61-pm-22(誤答:杖先はつま先前方5cm)",
    "q": [
     "53-pm-19",
     "61-pm-22"
    ],
    "note": "確認済み[S2][S3][S1]。外側の距離は資料により15cm(愛媛・T字杖)と約5cm(MSD)で異なる。国試の正答(15cm)はT字杖・愛媛の資料と一致。前方5cm・杖先が前外側5cmとする選択肢は、資料の前方15cmと合わない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/22-外傷と中毒/ギプス固定/腋窩支持型杖の調整と腋窩支持型杖による歩行"
     },
     {
      "label": "S2",
      "url": "https://www.eph.pref.ehime.jp/epch/guide/asset/reha-single-crutch-20230106.pdf"
     },
     {
      "label": "S3",
      "url": "https://www.techno-aids.or.jp/howto/product.php?code=120303"
     }
    ]
   },
   {
    "item": "T字杖の握りの高さ(肘屈曲30°・大転子)",
    "target": "杖の長さの目安",
    "value": "一般に、杖の長さは肘屈曲30°や大転子の高さで調整される。軽く肘を曲げて握れる高さが力を入れやすい。極端な円背など姿勢・歩き方によっては個別の調整が必要。",
    "exam": "61-pm-22(正答:握りの高さは大転子)。52-am-31(誤答:T字杖の握りは肘45度屈曲)",
    "q": [
     "61-pm-22",
     "52-am-31"
    ],
    "note": "確認済み[S3][S4]。大転子の高さは研究論文の抄録にある一般的な目安の記載で、公的な指針としては確認できていない。肘45度屈曲は資料の約30度と合わない。",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://www.techno-aids.or.jp/howto/product.php?code=120303"
     },
     {
      "label": "S4",
      "url": "https://www.jstage.jst.go.jp/article/cjpt/2004/0/2004_0_E0836/_article/-char/ja/"
     }
    ]
   },
   {
    "item": "松葉杖の荷重のかけ方と神経障害",
    "target": "松葉杖使用時の注意",
    "value": "腋窩に体重をかけず、手(握り)に荷重する。腋窩でもたれると橈骨神経の一過性の伝導障害が起こりうる(橈骨神経は腋窩で表在性)。前腕支持型杖(ロフストランド杖)は腋窩に荷重しないため、そのリスクがなく、体重の大部分を手で支える。",
    "exam": "出題は直接なし(参考)。52-am-31(正答:ロフストランド杖の前腕支え位置は前腕近位1/3)は資料に記載がなく未確認",
    "q": [],
    "note": "確認済み[S1][S2]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/22-外傷と中毒/ギプス固定/腋窩支持型杖の調整と腋窩支持型杖による歩行"
     },
     {
      "label": "S2",
      "url": "https://www.eph.pref.ehime.jp/epch/guide/asset/reha-single-crutch-20230106.pdf"
     }
    ]
   },
   {
    "item": "杖の歩行パターンと荷重量の目安",
    "target": "杖・松葉杖歩行の進め方",
    "value": "T字杖は健側の手につき、不安定なら3動作、安定していれば2動作。階段は、上りは杖→健側→患側、下りは杖→患側→健側。愛媛県立中央病院の資料では、2/3荷重なら松葉杖1本、1/4〜1/3荷重なら松葉杖2本を使う。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S3][S2]。荷重量と本数の対応は一施設の患者向け資料の記載。",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://www.techno-aids.or.jp/howto/product.php?code=120303"
     },
     {
      "label": "S2",
      "url": "https://www.eph.pref.ehime.jp/epch/guide/asset/reha-single-crutch-20230106.pdf"
     },
     {
      "label": "S5",
      "url": "https://www.eph.pref.ehime.jp/epch/guide/asset/reha-partial-weight-bearing-20230106.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "csf-gbs",
  "name": "髄液検査(ギラン・バレー症候群)",
  "category": "臨床検査",
  "aliases": [
   "髄液検査",
   "蛋白細胞解離"
  ],
  "rows": [
   {
    "item": "髄液検査（GBS）",
    "target": "ギラン・バレー症候群",
    "value": "蛋白細胞解離。細胞数10/μL以下は診断を支持、50/μL以上は他疾患を疑う。Brighton基準: 細胞数50/μL未満・蛋白45 mg/dL超",
    "exam": "59-pm-85 正答（GBSの診断に有用）。53-am-9 誤答「髄液で細胞数増加」（増えない）。F波は延長（出題は53-am-9「F波潜時短縮」が誤り、60-pm-43「F波潜時延長・出現率減少」が正答）",
    "q": [
     "53-am-9",
     "59-pm-85",
     "60-pm-43"
    ],
    "note": "確認済み [S18]（髄液の数値）。F波の数値基準は出題になし",
    "conflict": false,
    "sources": [
     {
      "label": "S18",
      "url": "https://www.neurology-jp.org/guidelinem/pdf/gbs_2024_01.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-19",
  "review": "ai"
 },
 {
  "slug": "deep-tendon-reflex",
  "name": "深部腱反射(伸張反射)",
  "category": "検査法・徴候",
  "aliases": [
   "腱反射",
   "伸張反射",
   "膝蓋腱反射",
   "アキレス腱反射",
   "上腕二頭筋反射",
   "上腕三頭筋反射",
   "腕橈骨筋反射",
   "筋伸張反射",
   "tendon reflex",
   "stretch reflex",
   "DTR",
   "折りたたみナイフ現象",
   "クローヌス"
  ],
  "rows": [
   {
    "item": "深部腱反射の反射中枢(髄節)と支配神経",
    "target": "腱反射の低下・消失から障害髄節・神経根を推定する",
    "value": "上腕二頭筋反射=C5-6(筋皮神経)／腕橈骨筋反射=C5-6(橈骨神経)／上腕三頭筋反射=C7-8(橈骨神経)／膝蓋腱反射=L2-4(大腿神経)／アキレス腱反射=S1-2(脛骨神経)",
    "exam": "61-am-21(正答:腕橈骨筋反射 C5・6。誤答:上腕二頭筋 C3・4、上腕三頭筋 C4・5、膝蓋腱 T12・L1、アキレス腱 L3・4)／57-am-53(誤りの組合せ:腕橈骨筋反射 C8・Th1。上腕二頭筋C5・6、上腕三頭筋C7・8、膝蓋腱L2〜4、アキレス腱S1・2は正しい)／56-am-83(第7頸髄後根障害→上腕三頭筋腱反射の低下が正答)／49-am-35(S1神経根障害で膝蓋腱反射が低下は誤。S1はアキレス腱反射)／50-pm-91(C6・7間の外側型ヘルニアで腕橈骨筋反射が亢進は誤答)",
    "q": [
     "61-am-21",
     "57-am-53",
     "56-am-83",
     "50-pm-45",
     "50-pm-91",
     "49-am-35"
    ],
    "note": "確認済み[S1]。国試の正答はこの表記と一致する。MSDマニュアル[S2]は主な髄節をC6・C7・L4・S1と、より絞って書いており、資料によって幅がある(学習・国試では[S1]の表記で覚える)。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pubmed.ncbi.nlm.nih.gov/32965909/"
     },
     {
      "label": "S2",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-神経疾患/神経学的診察/反射の評価"
     }
    ]
   },
   {
    "item": "伸張反射(腱反射)の反射弓",
    "target": "受容器・求心路・遠心路の組合せを答える",
    "value": "腱を叩いて筋を急に伸ばす→受容器=筋紡錘→求心路=Ia線維(一次終末。二次終末のⅡ群線維も筋紡錘由来)→脊髄で同名筋のα運動ニューロンを単シナプス性に興奮→遠心路=α運動線維→錘外筋が収縮。関与するニューロンは感覚・運動の2つで、シナプスは1つ(単シナプス反射)。Ib線維は腱器官(Golgi腱器官)由来で、介在ニューロンを介してα運動ニューロンを抑制する側。",
    "exam": "58-am-62(誤りを選ぶ問題。受容器は錘内筋線維、感覚入力はIa線維、運動出力はα運動ニューロンは正しい扱い)／57-pm-62(正答:運動出力はα運動神経を介する。誤:感覚入力はⅢ群、錘外筋線維が受容器、反射閾値は一定、高齢者では亢進)／53-am-62(正答:単シナプス反射。誤:侵害受容反射、求心性線維はIb群、遠心性線維はγ運動線維、錘内線維を支配するのはα運動線維)／52-am-63(腱を叩いて筋を急速に伸ばしたときの感覚受容器=筋紡錘。誤:Pacini小体・Ruffini終末・自由神経終末・Meissner小体)／49-pm-56(筋紡錘の求心性線維=Ⅰa・Ⅱ)／50-am-41(運動直前に反対方向へ徒手的刺激を加えると運動が誘導されやすい現象=伸張反射。誤:相反抑制・屈曲反射など)",
    "q": [
     "58-am-62",
     "57-pm-62",
     "53-am-62",
     "52-am-63",
     "49-pm-56",
     "50-am-41"
    ],
    "note": "確認済み[S1][S2][S3]。Ib線維が腱器官由来であることは[S3]の図。「錘内線維を支配するのはγ運動ニューロン」は[S1]の記述(α運動ニューロンは錘外筋を支配)。国試との食い違いはない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.ncbi.nlm.nih.gov/books/NBK562238/"
     },
     {
      "label": "S2",
      "url": "https://ehealth.kcl.ac.uk/tel/muscle-spindle/07_functional-aspects.html"
     },
     {
      "label": "S3",
      "url": "https://www.igaku-shoin.co.jp/seigo/201401_01_p164.pdf"
     }
    ]
   },
   {
    "item": "γ運動ニューロンの役割(筋紡錘の感度調節)",
    "target": "γ運動ニューロンの興奮と腱反射の関係を答える",
    "value": "γ運動ニューロンは錘内筋線維を収縮・弛緩させ、筋紡錘の感度(=反射の応答)を調節する(アセチルコリンによる)。反射増強法(Jendrassik手技)の最中は、ヒトの筋紡錘Ia求心線維の伸張への感度が上がることが測定されている。",
    "exam": "58-am-62(正答として選ぶ誤り文:「γ運動ニューロンの興奮で深部腱反射は減弱する」。実際は感度調節の側で増強)",
    "q": [
     "58-am-62"
    ],
    "note": "確認済み[S1][S2]。資料の記載は「感度を調節する」「Jendrassik中に筋紡錘の感度が上がる」まで。「γ興奮=反射増強」と明記した文は確認できていないが、国試の「減弱する」が誤りという扱いとは矛盾しない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.ncbi.nlm.nih.gov/books/NBK562238/"
     },
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC2269775/"
     }
    ]
   },
   {
    "item": "腱反射の亢進・低下が示すもの",
    "target": "上位運動ニューロン障害と下位運動ニューロン障害の鑑別",
    "value": "亢進=上位運動ニューロン障害(前角細胞より中枢側の病変。基底核の障害は除く)。減弱・消失=下位運動ニューロン障害(前角細胞・脊髄根・末梢神経の病変)。左右差があれば異常を疑う。持続するクローヌスは上位運動ニューロン障害を示唆する。多発性硬化症・ALS・脊髄損傷は上位/下位の鑑別が要る例。",
    "exam": "55-pm-25(腱反射が亢進する疾患=多発性硬化症が正答。誤答:多発性筋炎・Guillain-Barré症候群・尿毒症性ニューロパチー・Duchenne型筋ジストロフィー)／55-am-35(ALSの下位運動ニューロン徴候=線維束性収縮。誤答:痙縮・仮性球麻痺・腹壁反射消失・アキレス腱反射亢進は上位運動ニューロン側)／56-pm-63(「痙縮では伸張反射が低下する」は誤。亢進)／60-pm-29(Parkinson病でみられるのは姿勢反射障害。膝蓋腱反射亢進・Babinski反射陽性・痙縮は誤答)／49-pm-33(Duchenneで下肢腱反射が亢進は誤)／51-am-93(OPLLで下肢腱反射消失は誤)",
    "q": [
     "55-pm-25",
     "55-am-35",
     "56-pm-63",
     "60-pm-29",
     "49-pm-33",
     "51-am-93"
    ],
    "note": "確認済み[S1][S2]。Guillain-Barré症候群・Duchenne型・多発性筋炎・Parkinson病・OPLLの個別の反射所見は、この2資料には書かれておらず未確認(上位/下位の原則から答える)。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-神経疾患/神経学的診察/反射の評価"
     },
     {
      "label": "S2",
      "url": "https://www.ncbi.nlm.nih.gov/books/NBK562238/"
     }
    ]
   },
   {
    "item": "腱反射が低下・消失する主な原因",
    "target": "末梢性の反射低下(ニューロパチーなど)の把握",
    "value": "末梢神経障害が無反射(areflexia)の最多の原因で、糖尿病・アルコール・尿毒症・ビタミン欠乏・アミロイドーシス・中毒などが挙げられる。他に甲状腺機能低下症・低体温・小脳機能障害・β遮断薬でも反射が低下しうる。",
    "exam": "49-pm-43(糖尿病性神経障害でアキレス腱反射が低下=正答)／51-pm-30(糖尿病性多発神経障害の早期異常として「膝蓋腱反射」は誤り)",
    "q": [
     "49-pm-43",
     "51-pm-30"
    ],
    "note": "確認済み[S1]。「アキレス腱反射のほうが膝蓋腱反射より早期に低下する」は、この資料には書かれておらず未確認。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.ncbi.nlm.nih.gov/books/NBK562238/"
     }
    ]
   },
   {
    "item": "痙縮と折りたたみナイフ現象",
    "target": "痙縮時の筋緊張の変化と関与する感覚線維",
    "value": "痙縮は速度依存性で、すばやく伸展して初めて検出できる。上腕二頭筋を伸展→筋紡錘Ia線維→α運動ニューロンの単シナプス性興奮(腱反射と同じ原理)が過剰に亢進して抵抗が高まる→筋の張力で腱器官が興奮し、Ib線維が介在ニューロンを介してα運動ニューロンを抑制→急に抵抗が落ちる(折りたたみナイフ現象。生理学的には伸び反応に相当)。",
    "exam": "50-am-62(折りたたみナイフ現象に関与する感覚神経線維=Ⅰbが正答)／56-pm-63(痙縮では伸張反射が亢進)",
    "q": [
     "50-am-62",
     "56-pm-63"
    ],
    "note": "確認済み[S1]。国試との食い違いはない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.igaku-shoin.co.jp/seigo/201401_01_p164.pdf"
     }
    ]
   },
   {
    "item": "反射の強さの段階・増強法・クローヌス",
    "target": "腱反射の記録と、反射が出にくいときの検査の工夫",
    "value": "NINDSの0〜4段階:0=消失／1=小さい(わずか。増強法でのみ出る反応を含む)／2=正常範囲の下半分／3=正常範囲の上半分／4=正常より強い(クローヌスを含む)。反射増強法(Jendrassik手技):下肢の腱は両手を組んで左右に強く引き合っている間に叩く。クローヌスは足関節を素早く背屈して調べ、持続性のものは上位運動ニューロン障害を示唆し、正常所見ではない。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1][S2]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pubmed.ncbi.nlm.nih.gov/32965909/"
     },
     {
      "label": "S2",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-神経疾患/神経学的診察/反射の評価"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "development-milestones",
  "name": "運動・言語発達の目安",
  "category": "検査法・徴候",
  "aliases": [
   "運動発達",
   "頸定",
   "首のすわり",
   "パラシュート反応",
   "ひとり歩き",
   "言語発達",
   "喃語"
  ],
  "rows": [
   {
    "item": "運動発達の通過率(はいはい・四つ這い)",
    "target": "運動発達の遅れの判断",
    "value": "2010年調査: はいはい通過率 7〜8か月未満51.1%(50%超)、9〜10か月未満90.3%(90%超)。2023年調査: 7〜8か月47.6%、8〜9か月67.4%、10〜11か月で91.0%(90%以上は生後10〜11か月未満)。身体診察マニュアル: 9〜10か月で四つ這い・つかまり立ち可能、四つ這いをしない場合(ずり這い・シャッフリング)は他疾患の除外が必要。幅: 2010年と2023年で90%到達月齢が約1か月ずれる(2023年の方が遅い)",
    "exam": "54-pm-10: 生後8か月の乳児、運動発達の遅れ、図の姿勢→優先して行う運動=四つ這い(正答)。誤答=寝返り・膝立ち・立ち上がり・免荷立位での交互振り出し。入力注記「9〜10か月ころ(要確認)」は2010年調査の90%通過と一致",
    "q": [
     "54-pm-10"
    ],
    "note": "確認済み(原文) [S2]表9・[S3]表9・[S4] p.35",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.mhlw.go.jp/toukei/list/dl/73-22-01.pdf"
     },
     {
      "label": "S3",
      "url": "https://www.cfa.go.jp/assets/contents/node/basic_page/field_ref_resources/b32105e4-fa26-42eb-97d0-2e5cbaef703a/25a6391e/20241225_policies_boshihoken_r5-nyuuyoujityousa_10.pdf"
     },
     {
      "label": "S4",
      "url": "https://www.cfa.go.jp/assets/contents/node/basic_page/field_ref_resources/0b505d2e-87a3-488b-a78c-46a38fbcf38b/94412340/20250722_policies_boshihoken_manuals-etc_19.pdf"
     }
    ]
   },
   {
    "item": "姿勢・運動発達の月齢の目安(首のすわり〜ひとり歩き)",
    "target": "運動発達の順序・遅れの判断",
    "value": "50%を超える月齢区間(2010年): 首のすわり3〜4か月(63.0%)・ねがえり4〜5か月(52.7%)・ひとりすわり7〜8か月(68.1%)・はいはい7〜8か月(51.1%)・つかまり立ち8〜9か月(57.4%)・ひとり歩き1歳1〜2か月(71.4%、0〜1か月は49.3%)。90%以上: 首のすわり4〜5か月未満／ねがえり6〜7／ひとりすわり9〜10／はいはい9〜10／つかまり立ち11〜12／ひとり歩き1歳3〜4か月未満。2023年の90%以上: 首4〜5／ねがえり6〜7／ひとりすわり9〜10／はいはい10〜11／つかまり立ち11〜12／ひとり歩き1歳4〜5か月未満",
    "exam": "57-pm-2: 図に示す3つの姿勢の出現順序を選ぶ(正答A→C→B、図は未確認)。この順序の根拠となる月齢の目安として載せた",
    "q": [
     "57-pm-2"
    ],
    "note": "確認済み(原文) [S2]表9・[S3]表9。図の姿勢との対応は未確認",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.mhlw.go.jp/toukei/list/dl/73-22-01.pdf"
     },
     {
      "label": "S3",
      "url": "https://www.cfa.go.jp/assets/contents/node/basic_page/field_ref_resources/b32105e4-fa26-42eb-97d0-2e5cbaef703a/25a6391e/20241225_policies_boshihoken_r5-nyuuyoujityousa_10.pdf"
     }
    ]
   },
   {
    "item": "頸定(引き起こし反応)",
    "target": "運動発達遅滞・脳性麻痺の疑い",
    "value": "4か月で床から45度まで引き起こしたとき、頭部と体幹の軸が一致し頭が後ろに倒れない=頸定。45度で頭が後屈したまま、または90度まで引き起こして首をゆすると大きく揺れる=頸定未完了(3〜4か月前半なら約1か月後に再確認、4か月後半は受診を勧める)",
    "exam": "56-pm-16: 痙直型四肢麻痺8歳の背臥位姿勢と引き起こしの図から車椅子設定を選ぶ(図は未確認、正答は胸と骨盤のベルト固定)。引き起こし反応の判定基準として参考に載せた",
    "q": [
     "56-pm-16"
    ],
    "note": "確認済み(原文) [S4] p.22。国試の図そのものは未確認",
    "conflict": false,
    "sources": [
     {
      "label": "S4",
      "url": "https://www.cfa.go.jp/assets/contents/node/basic_page/field_ref_resources/0b505d2e-87a3-488b-a78c-46a38fbcf38b/94412340/20250722_policies_boshihoken_manuals-etc_19.pdf"
     }
    ]
   },
   {
    "item": "パラシュート反応(10か月)",
    "target": "正常な乳児の姿勢反応",
    "value": "9〜10か月でパラシュート反射が確立。10か月で前方パラシュート反射がみられない・左右差がある・手を握ったまま=異常",
    "exam": "52-pm-91: 10か月の正常児でみられる=パラシュート反応(正答)。誤答=Moro反射・手の把握反応・緊張性迷路反射・非対称性緊張性頸反射(いずれも消失済み)",
    "q": [
     "52-pm-91"
    ],
    "note": "確認済み(原文) [S4] p.34-36。国試の正誤と矛盾なし。側方・後方の出現月齢は未確認",
    "conflict": false,
    "sources": [
     {
      "label": "S4",
      "url": "https://www.cfa.go.jp/assets/contents/node/basic_page/field_ref_resources/0b505d2e-87a3-488b-a78c-46a38fbcf38b/94412340/20250722_policies_boshihoken_manuals-etc_19.pdf"
     }
    ]
   },
   {
    "item": "言語発達の目安",
    "target": "言語発達の遅れ",
    "value": "厚労省2010年: 単語を言う割合は7〜8か月2.2%、8〜9か月6.5%、1歳0〜1か月57.6%、1歳6〜7か月未満で90%以上(94.7%)。Denver II 90%達成: 8か月「パ・ダ・マ」、10か月「喃語を話す」、12か月「意味なくパパ・ママという」。幅: 喃語の開始(国試6か月)と、90%達成月齢(8〜10か月)は基準が異なる",
    "exam": "57-am-85: 喃語は6か月ころ(正答)、言語的意味理解は10か月ころ(正答)。誤答=有意味語の発語は8か月ころ・2語文は1歳ころ・言語獲得の臨界期は3歳ころ",
    "q": [
     "57-am-85"
    ],
    "note": "確認済み(原文) [S2]表10・[S4] p.18-19。食い違い: 喃語「6か月」は国試の正答だが、資料の90%達成月齢は8〜10か月(基準が違う)。「有意味語8か月は誤」は2010年調査の単語通過率(8〜9か月6.5%)と整合。言語的意味理解10か月・臨界期3歳・2語文は未確認",
    "conflict": true,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.mhlw.go.jp/toukei/list/dl/73-22-01.pdf"
     },
     {
      "label": "S4",
      "url": "https://www.cfa.go.jp/assets/contents/node/basic_page/field_ref_resources/0b505d2e-87a3-488b-a78c-46a38fbcf38b/94412340/20250722_policies_boshihoken_manuals-etc_19.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-19",
  "review": "ai"
 },
 {
  "slug": "diabetes-diagnosis",
  "name": "糖尿病の診断(血糖・HbA1c)",
  "category": "臨床検査",
  "aliases": [
   "HbA1c",
   "空腹時血糖",
   "随時血糖"
  ],
  "rows": [
   {
    "item": "空腹時血糖・随時血糖・HbA1c（糖尿病の診断）",
    "target": "糖尿病型の判定",
    "value": "糖尿病型: 空腹時血糖126 mg/dL以上、OGTT 2時間値200 mg/dL以上、随時血糖200 mg/dL以上、HbA1c 6.5%以上。正常型: 空腹時110未満かつ2時間値140未満",
    "exam": "57-am-19 問題文 空腹時血糖385 mg/dL（基準65〜109）、HbA1c 8.6%（基準4.6〜6.2）。56-am-20 問題文 HbA1c 8.2%・空腹時血糖145。53-pm-11 問題文 空腹時血糖305。59-am-2 誤答（HbA1c）。58-am-17 誤答「HbA1cで運動強度を決める」。61-pm-44 誤答（HbA1cは腎機能に不適）",
    "q": [
     "53-pm-11",
     "56-am-20",
     "57-am-19",
     "58-am-17",
     "59-am-2",
     "61-pm-44"
    ],
    "note": "確認済み [S2]。57-am-19 の基準範囲（HbA1c 4.6〜6.2、血糖65〜109）は共用基準範囲 [S1]（HbA1c 4.9〜6.0、血糖73〜109）と食い違い、施設により異なる",
    "conflict": true,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jccls.org/wp-content/uploads/2019/10/igakukyouikukijyun.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.jds.or.jp/uploads/files/publications/gl2024/01.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-19",
  "review": "ai"
 },
 {
  "slug": "diabetes-exercise",
  "name": "糖尿病の運動療法",
  "category": "リスク管理",
  "aliases": [
   "糖尿病の運動療法"
  ],
  "rows": [
   {
    "item": "糖尿病の運動療法の禁止・制限基準",
    "target": "運動療法の可否",
    "value": "空腹時血糖250 mg/dL以上、または尿ケトン体中等度以上陽性は運動療法を禁止・制限",
    "exam": "54-pm-47 誤答「尿ケトン体陽性なら有酸素運動を行う」。53-pm-11 問題文 空腹時血糖305・尿ケトン体陽性（2型糖尿病）。57-am-19 問題文 空腹時血糖385・尿ケトン体陰性。56-am-20 問題文 空腹時血糖145・HbA1c 8.2",
    "q": [
     "53-pm-11",
     "54-pm-47",
     "56-am-20",
     "57-am-19"
    ],
    "note": "確認済み [S3]",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://www.jds.or.jp/uploads/fckeditor/files/uid000025_67756964655F323031382D323031392E706466.pdf"
     }
    ]
   },
   {
    "item": "糖尿病: 運動を禁止・制限する血糖・ケトン体",
    "target": "2型糖尿病の運動療法",
    "value": "運動を禁止あるいは制限した方がよい: 空腹時血糖値≧250 mg/dL／尿ケトン体陽性(中等度以上)",
    "exam": "57-am-19 正答「空腹時血糖250 mg/dL未満」(開始条件)。誤答選択肢=感覚障害の改善・脂質異常症の改善・尿中ケトン体陽性・HbA1cが基準値内／53-pm-11 問題文 空腹時血糖305 mg/dL・尿ケトン体陽性 → 正答「病棟内歩行など軽度な負荷にとどめる」。誤答選択肢=安静臥床・1日200 kcal・1RMの80%・目標心拍数115/分20分／53-am-93 誤答「空腹時血糖が高いほど運動量を増やす」／52-pm-93 誤答「尿中ケトン体が陽性の場合も推奨」／54-pm-47 誤答「尿中ケトン体陽性の場合は有酸素運動」",
    "q": [
     "52-pm-93",
     "53-am-93",
     "53-pm-11",
     "54-pm-47",
     "57-am-19"
    ],
    "note": "確認済み(S7 p.運動療法(図5), 2026-11-19)。S6(診療GL2024)本文には250の数値は無い。「禁止あるいは制限」のため国試53-pm-11の「軽度な負荷にとどめる」と整合",
    "conflict": false,
    "sources": [
     {
      "label": "S6",
      "url": "https://www.jds.or.jp/uploads/files/publications/gl2024/04_1.pdf"
     },
     {
      "label": "S7",
      "url": "https://www.med.or.jp/dl-med/tounyoubyou/essence2022.pdf"
     }
    ]
   },
   {
    "item": "糖尿病: 網膜症",
    "target": "増殖(前増殖)網膜症",
    "value": "前増殖網膜症以上: 激しい有酸素運動・ジャンプ・衝撃・頭位を下げる・息こらえ(Valsalva)=禁忌となる場合がある。運動前に眼科医のチェック",
    "exam": "54-pm-47 正答「増殖性網膜症がある場合、強い等尺性収縮は推奨されない」／53-am-93 正答「増殖性網膜症があれば運動強度を軽く」／58-am-17 問題文 増殖前網膜症合併(インスリン療法中・血液透析)",
    "q": [
     "53-am-93",
     "54-pm-47",
     "58-am-17"
    ],
    "note": "確認済み(S6 4章 CQ4-2付近, 2026-11-19)",
    "conflict": false,
    "sources": [
     {
      "label": "S6",
      "url": "https://www.jds.or.jp/uploads/files/publications/gl2024/04_1.pdf"
     }
    ]
   },
   {
    "item": "糖尿病: 有酸素運動の頻度・時間・強度",
    "target": "2型糖尿病",
    "value": "有酸素運動は中強度(最大酸素摂取量の40〜60%)で週150分以上・週3回以上・運動しない日が2日間以上続かない。レジスタンス運動は連続しない日に週2〜3回。強度RPE 11〜13(4〜6メッツ程度)",
    "exam": "56-am-20 正答(誤り)「有酸素運動は1回10分、週に合計40分程度」。正しい側=食事の1時間後・筋力増強運動は週2〜3回・有酸素運動の強度は最大酸素摂取量の50%程度・身体活動量増加のための生活指導／60-pm-36 正答=インスリン抵抗性を改善する",
    "q": [
     "56-am-20",
     "60-pm-36"
    ],
    "note": "確認済み(S6 4章／S7, 2026-11-19)。「食事の1時間後」の「1時間」はGLに数値なし(未確認)。食後に行うと食後高血糖の改善が期待できる、のみ確認",
    "conflict": false,
    "sources": [
     {
      "label": "S6",
      "url": "https://www.jds.or.jp/uploads/files/publications/gl2024/04_1.pdf"
     },
     {
      "label": "S7",
      "url": "https://www.med.or.jp/dl-med/tounyoubyou/essence2022.pdf"
     }
    ]
   },
   {
    "item": "糖尿病: 運動のタイミングと薬物療法",
    "target": "糖尿病(インスリン・SU薬)",
    "value": "インスリン・SU薬使用時は低血糖に注意(禁忌ではない)。食後に運動する場合は運動前の追加インスリンを減量、運動前の血糖が低値なら補食。血糖低下作用は約48時間",
    "exam": "54-pm-47 誤答選択肢「食後すぐに開始」「インスリン治療中は禁忌」／53-am-93 誤答「食後すぐ開始」「インスリン投与中は中止」／60-pm-36 誤答「血糖値に関わらず推奨」「シックデイに関わらず推奨」／58-am-17 正答「倦怠感を訴えるときは低血糖症状の可能性」",
    "q": [
     "53-am-93",
     "54-pm-47",
     "58-am-17",
     "60-pm-36"
    ],
    "note": "確認済み(S6 4章, 2026-11-19)。「食後1〜2時間」の数値は未確認",
    "conflict": false,
    "sources": [
     {
      "label": "S6",
      "url": "https://www.jds.or.jp/uploads/files/publications/gl2024/04_1.pdf"
     }
    ]
   },
   {
    "item": "糖尿病: 低血糖症状・中止基準",
    "target": "糖尿病運動療法中",
    "value": "冷汗(低血糖症状)は中止。低血糖発作は心リハの相対的中止基準にも記載",
    "exam": "56-am-46 正答「冷汗」。誤答選択肢=発汗・体温37.0℃・Borg指数13・脈拍数110/分",
    "q": [
     "56-am-46"
    ],
    "note": "確認済み(S1 表25の低血糖発作, 2026-11-19)。冷汗の語は表になく(症状として整合)",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2021/03/JCS2021_Makita.pdf"
     }
    ]
   },
   {
    "item": "糖尿病: 運動処方の他の数値(1RM・消費kcal)",
    "target": "2型糖尿病の入院患者",
    "value": "筋力増強の強度は最大挙上重量の60〜80%×8〜12回(ガイド2023)。「1日200 kcal」「1RM 80%」の基準は糖尿病資料に無し",
    "exam": "53-pm-11 誤答選択肢「1日200 kcalを消費させる運動」「1RMの80%で下肢の筋力増強運動」「目標心拍数115/分」",
    "q": [
     "53-pm-11"
    ],
    "note": "確認済み(筋力増強60〜80%はS8 筋トレ資料, 2026-11-19)。他の数値は未確認",
    "conflict": false,
    "sources": [
     {
      "label": "S8",
      "url": "https://www.mhlw.go.jp/content/001194020.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-19",
  "review": "ai"
 },
 {
  "slug": "dmd-stage",
  "name": "筋ジストロフィーの機能障害度",
  "category": "評価尺度",
  "aliases": [
   "機能障害度",
   "厚生省筋萎縮症研究班"
  ],
  "rows": [
   {
    "item": "機能障害度(厚生省筋萎縮症研究班・新分類)",
    "target": "筋ジストロフィー(DMD)の障害段階",
    "value": "ステージ1=階段昇降可能(1a手の介助なし、1b手の膝おさえ)／2=階段昇降可能(2a片手手すり、2b片手手すり＋膝おさえ、2c両手手すり)／3=椅子から起立可能／4=歩行可能(4a独歩5m以上、4b物につかまれば5m以上)／5=四つ這い／6=ずり這い／7=座位保持可能／8=座位保持不可能",
    "exam": "60-am-6(6歳男児、MMT下肢近位2・遠位3、屋内は四つ這い、車椅子通学=ステージ5が正答。選択肢ステージ4〜8)",
    "q": [
     "60-am-6"
    ],
    "note": "確認済み[S14](表1)",
    "conflict": false,
    "sources": [
     {
      "label": "S14",
      "url": "https://www.neurology-jp.org/guidelinem/pdf/dmd_03.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-19",
  "review": "ai"
 },
 {
  "slug": "dyspnea-scale",
  "name": "息切れの評価(mMRC・Hugh-Jones)",
  "category": "評価尺度",
  "aliases": [
   "mMRC",
   "Hugh-Jones",
   "ヒュー・ジョーンズ"
  ],
  "rows": [
   {
    "item": "mMRC 息切れスケール 全体",
    "target": "呼吸困難(息切れ)の程度",
    "value": "Grade 0〜4の5段階。呼吸リハの保険適用はmMRC Grade 1以上(旧MRC Grade 2以上)",
    "exam": "61-am-8(COPD。緩やかな上り坂・平坦での早歩きで息切れ→Grade 1が正答。選択肢Grade 0〜4)／57-am-17(間質性肺炎の症例にGrade 3=問題文)／54-pm-40(誤答:Hugh-Jones分類／mMRC息切れスケールは息切れの評価で運動強度の指標ではない)",
    "q": [
     "54-pm-40",
     "57-am-17",
     "61-am-8"
    ],
    "note": "確認済み[S11][S12]",
    "conflict": false,
    "sources": [
     {
      "label": "S11",
      "url": "https://www.med.or.jp/dl-med/nosmoke/copd_essence2014_hosoku.pdf"
     },
     {
      "label": "S12",
      "url": "https://www.jstage.jst.go.jp/article/jjrmc/54/12/54_941/_pdf"
     }
    ]
   },
   {
    "item": "mMRC Grade 0",
    "target": "息切れの程度",
    "value": "激しい運動をしたときだけ息切れがある",
    "exam": "61-am-8(誤答選択肢Grade 0)",
    "q": [
     "61-am-8"
    ],
    "note": "確認済み[S11]",
    "conflict": false,
    "sources": [
     {
      "label": "S11",
      "url": "https://www.med.or.jp/dl-med/nosmoke/copd_essence2014_hosoku.pdf"
     }
    ]
   },
   {
    "item": "mMRC Grade 1",
    "target": "息切れの程度",
    "value": "平坦な道を早足で歩く、あるいは緩やかな上り坂を歩くときに息切れがある",
    "exam": "61-am-8(正答)",
    "q": [
     "61-am-8"
    ],
    "note": "確認済み[S11]",
    "conflict": false,
    "sources": [
     {
      "label": "S11",
      "url": "https://www.med.or.jp/dl-med/nosmoke/copd_essence2014_hosoku.pdf"
     }
    ]
   },
   {
    "item": "mMRC Grade 2",
    "target": "息切れの程度",
    "value": "息切れがあるので、同年代の人より平坦な道を歩くのが遅い、あるいは平坦な道を自分のペースで歩いているとき息切れのために立ち止まることがある",
    "exam": "61-am-8(誤答選択肢Grade 2)",
    "q": [
     "61-am-8"
    ],
    "note": "確認済み[S11]",
    "conflict": false,
    "sources": [
     {
      "label": "S11",
      "url": "https://www.med.or.jp/dl-med/nosmoke/copd_essence2014_hosoku.pdf"
     }
    ]
   },
   {
    "item": "mMRC Grade 3",
    "target": "息切れの程度",
    "value": "平坦な道を約100m、あるいは数分歩くと息切れのために立ち止まる",
    "exam": "57-am-17(間質性肺炎の症例:mMRC Grade 3、6MWT 200m)",
    "q": [
     "57-am-17"
    ],
    "note": "確認済み[S11]",
    "conflict": false,
    "sources": [
     {
      "label": "S11",
      "url": "https://www.med.or.jp/dl-med/nosmoke/copd_essence2014_hosoku.pdf"
     }
    ]
   },
   {
    "item": "mMRC Grade 4",
    "target": "息切れの程度",
    "value": "息切れがひどく家から出られない、あるいは衣服の着替えをするときにも息切れがある",
    "exam": "61-am-8(誤答選択肢Grade 4)",
    "q": [
     "61-am-8"
    ],
    "note": "確認済み[S11]",
    "conflict": false,
    "sources": [
     {
      "label": "S11",
      "url": "https://www.med.or.jp/dl-med/nosmoke/copd_essence2014_hosoku.pdf"
     }
    ]
   },
   {
    "item": "Hugh-Jones 分類",
    "target": "息切れによる労作能力の低下",
    "value": "Ⅰ度=同年齢の健常者とほとんど同様の労作ができ、歩行・階段昇降も健常者並み／Ⅱ度=同様に歩行できるが、坂・階段は健常者並みにできない／Ⅲ度=平地でも健常者並みには歩けないが、自分のペースなら1.6km以上歩ける／Ⅳ度=休まなければ50ヤード(約46m)も歩けない／Ⅴ度=会話・衣服の着脱にも息切れがあり、外出できない",
    "exam": "54-pm-40(誤答選択肢:運動強度の指標ではなく息切れの評価)",
    "q": [
     "54-pm-40"
    ],
    "note": "確認済み[S12](PDFの数字が文字化けしているため、1.6km・50ヤードは検索要約と照合)",
    "conflict": false,
    "sources": [
     {
      "label": "S12",
      "url": "https://www.jstage.jst.go.jp/article/jjrmc/54/12/54_941/_pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-19",
  "review": "ai"
 },
 {
  "slug": "ecg-arrhythmias",
  "name": "不整脈の心電図(期外収縮・房室ブロック・頻拍・細動・粗動)",
  "category": "臨床検査",
  "aliases": [
   "不整脈",
   "房室ブロック",
   "第1度房室ブロック",
   "第2度房室ブロック",
   "第3度房室ブロック",
   "完全房室ブロック",
   "Ⅰ度房室ブロック",
   "Ⅲ度房室ブロック",
   "Wenckebach",
   "ウェンケバッハ",
   "Mobitz",
   "モビッツ",
   "心室期外収縮",
   "心室性期外収縮",
   "心房性期外収縮",
   "PVC",
   "VPC",
   "心室頻拍",
   "心室細動",
   "心房細動",
   "心房粗動",
   "Lown分類",
   "ローン分類",
   "R on T",
   "除細動"
  ],
  "rows": [
   {
    "item": "心室期外収縮(PVC)",
    "target": "基本の心周期より早く心室から出る興奮",
    "value": "先行するP波がなく、幅の広いQRS波(0.12秒以上)。多くは完全な代償性休止を伴う。2連発・多形性(波形が異なる)・R on T(前の拍のT波に重なる)は要注意で、R on Tは心室細動を誘発しうる。3拍に1回=三段脈、2拍に1回=二段脈。無症状・軽度なら経過観察",
    "exam": "58-pm-2(心電図から心室期外収縮(正答))／56-am-2(図①〜⑤から心室性期外収縮=②)／59-pm-16(波形から心室期外収縮(正答))／54-pm-18(正答:洞調律よりも早く出現する心室興奮。誤答:3段脈・P波がみられる・QRS幅0.12秒未満)／53-am-2(③心室性期外収縮・④心房性期外収縮)／55-am-2(心房性期外収縮が正答。誤答に心室性期外収縮)／49-pm-19(多源性心室期外収縮=④。形の異なる2種のPVC)",
    "q": [
     "58-pm-2",
     "56-am-2",
     "59-pm-16",
     "54-pm-18",
     "53-am-2",
     "55-am-2",
     "49-pm-19"
    ],
    "note": "確認済み[S1][S2][S3]。心室期外収縮が「P波なし・幅広いQRS・代償性休止」である点は[S3]、QRS幅0.12秒以上・R on T・三連発以上のVTは[S1]。心房性期外収縮の波形は資料で未確認",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://square.umin.ac.jp/saspe/news/18.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.msdmanuals.com/ja-jp/professional/04-心血管疾患/特定の不整脈/心室性期外収縮-vpb"
     },
     {
      "label": "S3",
      "url": "https://www.msdmanuals.com/ja-jp/professional/04-心血管疾患/不整脈および伝導障害の概要/不整脈の概要"
     }
    ]
   },
   {
    "item": "Lown分類(心室期外収縮の重症度)",
    "target": "心室性不整脈の重症度・運動中止の目安",
    "value": "Lown分類2度以上の心室性不整脈が運動中止の目安(PT教科書)。多形性・2連発・R on Tが重症側の所見として図示される",
    "exam": "49-pm-19(多源性心室期外収縮(Lown 3)=④)／60-pm-20(誤答:AはLown分類Ⅲ)／57-am-46(単発性心室期外収縮は運動中止の対象でない)",
    "q": [
     "49-pm-19",
     "60-pm-20",
     "57-am-46"
    ],
    "note": "確認済み[S1]は「2度以上=中止の目安」のみ。各度(0〜5度)の定義は資料で本文確認できず、Lown 3=多源性は国試の記録で未確認",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.igaku-shoin.co.jp/download_file/view/12341/12752"
     },
     {
      "label": "S2",
      "url": "https://square.umin.ac.jp/saspe/news/18.pdf"
     }
    ]
   },
   {
    "item": "第1度房室ブロック",
    "target": "房室伝導の遅れ",
    "value": "PR間隔が0.20秒超に延長(拍動間で一定)。QRS波の脱落はなく、P波の後に必ずQRS波が続く",
    "exam": "56-am-75(正答:第1度房室ブロックではQRS波は脱落しない。誤答:第1度でPR間隔0.1秒以上)／61-am-7・52-pm-14(誤答:Ⅰ度/Ⅱ度房室ブロック)",
    "q": [
     "56-am-75",
     "61-am-7",
     "52-pm-14"
    ],
    "note": "確認済み[S1][S2]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/04-心血管疾患/不整脈の各論/房室ブロック"
     },
     {
      "label": "S2",
      "url": "https://www.msdmanuals.com/ja-jp/professional/04-心血管疾患/心血管系に関する検査および手技/心電図検査"
     }
    ]
   },
   {
    "item": "第2度房室ブロック(Mobitz Ⅰ型・Ⅱ型)",
    "target": "周期的にQRSが脱落",
    "value": "Mobitz Ⅰ型(Wenckebach)=PR間隔が拍ごとに徐々に延長し、ついにQRSが脱落、脱落直後に最短へ戻る(QRS幅が狭ければ房室結節の障害が多い)。Mobitz Ⅱ型=PR間隔は一定のまま突然QRSが脱落(脱落をまたぐR-R間隔は他の2倍)",
    "exam": "56-am-75(誤答:Wenckebach型でPR間隔不変・Mobitz Ⅱ型でPR間隔が徐々に延長)／52-pm-14(誤答:Ⅱ度房室ブロック)",
    "q": [
     "56-am-75",
     "52-pm-14"
    ],
    "note": "確認済み[S1]。国試の誤答2つは、Ⅰ型=漸延長、Ⅱ型=一定、という資料の記載と逆",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/04-心血管疾患/不整脈の各論/房室ブロック"
     }
    ]
   },
   {
    "item": "第3度(完全)房室ブロック",
    "target": "房室間の伝導が完全に途絶",
    "value": "P波とQRS波が無関係に出現(房室解離)。P波は消えず、P波のレートがQRSレートより速い。補充調律:ヒス束より上位(接合部)=狭いQRS・35〜50/分で比較的確実、下位(心室)=広いQRS・20〜40/分で不確実",
    "exam": "56-am-75(誤答:第3度でP波が完全に脱落)／51-am-12(慢性心不全・めまいと失神→Ⅲ度房室ブロック(正))／51-pm-91(右冠動脈閉塞に特徴的=房室伝導ブロック(正))／61-am-7(誤答:Ⅲ度房室ブロック)",
    "q": [
     "56-am-75",
     "51-am-12",
     "51-pm-91",
     "61-am-7"
    ],
    "note": "確認済み[S1]。右冠動脈閉塞と房室ブロックの関係は資料で未確認(国試の記録)",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/04-心血管疾患/不整脈の各論/房室ブロック"
     }
    ]
   },
   {
    "item": "心房細動(AF)",
    "target": "心房波の不規則な頻拍",
    "value": "独立したP波がなく、基線に細かく不規則な速い波(f波、心房波は300回/分超)が続き、R-R間隔は絶対的に不規則",
    "exam": "52-pm-14(冠動脈バイパス術後の運動療法中の胸部不快感の心電図→心房細動(正答)。誤答:洞性徐脈・WPW症候群・心室性期外収縮・Ⅱ度房室ブロック)／61-am-7(誤答:心房細動)",
    "q": [
     "52-pm-14",
     "61-am-7"
    ],
    "note": "確認済み[S1][S2]。運動療法で新規発生なら中止して医師へ報告、慢性で心拍数が安定していれば実施への影響は少ない(PT教科書)",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/04-心血管疾患/不整脈および伝導障害の概要/不整脈の概要"
     },
     {
      "label": "S2",
      "url": "https://www.igaku-shoin.co.jp/download_file/view/12341/12752"
     }
    ]
   },
   {
    "item": "心房粗動(AFL)",
    "target": "規則的な心房波の頻拍",
    "value": "規則的で一様な心房波(通常型はII・III・aVFで鋸歯状波、V1で陽性の粗動波)。心房拍数240〜440回/分(Ⅰ型240〜340、Ⅱ型340〜440)。房室伝導は変動し、運動で伝導が亢進し頻拍になることがある",
    "exam": "57-am-3(5つの波形から心房粗動を選ぶ(正答1。図は未確認))／61-am-7・59-pm-16(誤答:心房粗動)",
    "q": [
     "57-am-3",
     "61-am-7",
     "59-pm-16"
    ],
    "note": "確認済み[S1][S2][S3]。心房拍数は[S1]の240〜440、MSDは「通常250/分超」と表現が異なる",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2020/01/JCS2020_Ono.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.msdmanuals.com/ja-jp/professional/04-心血管疾患/不整脈および伝導障害の概要/不整脈の概要"
     },
     {
      "label": "S3",
      "url": "https://www.igaku-shoin.co.jp/download_file/view/12341/12752"
     }
    ]
   },
   {
    "item": "心室頻拍(VT)",
    "target": "致死的不整脈",
    "value": "PVCが100回/分以上で3連発以上続くもの。幅の広いQRSの頻拍で、持続性は30秒以上。規則的で幅広いQRSの頻拍は、否定できるまで心室頻拍として対応。運動療法では心室頻拍・心室細動の出現は絶対的中止基準",
    "exam": "55-pm-24(除細動が必要となる可能性が高い不整脈=心室頻拍(正答)。誤答:Ⅰ度房室ブロック・単発の上室期外収縮・慢性心房細動・連続しない心室期外収縮)／57-am-46(運動中止=胸痛・チアノーゼ・胸部不快感を伴う心室頻拍。単発性心室期外収縮は中止不要)",
    "q": [
     "55-pm-24",
     "57-am-46"
    ],
    "note": "確認済み[S1][S2][S3]。「単発性PVCは中止不要」は国試の記録で、資料の記載は「無症状・軽度なら治療不要」の範囲",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://square.umin.ac.jp/saspe/news/18.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.msdmanuals.com/ja-jp/professional/04-心血管疾患/不整脈および伝導障害の概要/不整脈の概要"
     },
     {
      "label": "S3",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2021/03/JCS2021_Makita.pdf"
     }
    ]
   },
   {
    "item": "心室細動(VF)・除細動の適応",
    "target": "電気ショックの適応リズム",
    "value": "心室細動(VF)と無脈性心室頻拍が電気ショック(除細動)の適応。心静止・無脈性電気活動(PEA)は適応ではなく、アドレナリンの静脈内投与が行われる。VFの心電図はP波・QRS波・T波がなく基線が不規則に揺れる",
    "exam": "60-pm-87(電気的除細動の適応=心室細動・心室頻拍(正答)。誤答:心静止・洞性頻脈・房室ブロック)／55-pm-24",
    "q": [
     "60-pm-87",
     "55-pm-24"
    ],
    "note": "確認済み[S1][S2]。資料は「VFまたは無脈性VT」と書くため、国試の「心室頻拍」は脈のない場合を指す。Holter心電図の用途(54-am-89)は資料で未確認",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/21-救命医療/心停止と心肺蘇生-cpr/成人における心肺蘇生-cpr"
     },
     {
      "label": "S2",
      "url": "https://www.igaku-shoin.co.jp/download_file/view/12341/12752"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "ecg-waveform-intervals",
  "name": "心電図の波形・間隔・心拍数・ST変化",
  "category": "臨床検査",
  "aliases": [
   "心電図",
   "ECG",
   "12誘導心電図",
   "モニター心電図",
   "QRS波",
   "QRS幅",
   "P波",
   "T波",
   "PR間隔",
   "QT間隔",
   "ST低下",
   "ST上昇",
   "洞性徐脈",
   "洞性頻脈"
  ],
  "rows": [
   {
    "item": "P波・QRS波・T波・PR間隔が表すもの",
    "target": "心電図波形の意味",
    "value": "P波=心房の脱分極／QRS波=心室の脱分極(心室の興奮過程)／T波=心室の再分極／PR間隔=心房の脱分極の開始から心室の脱分極の開始までの時間(房室伝導時間)",
    "exam": "61-pm-39(心室の興奮過程を表す=QRS波群(正答)。誤答:P波・PQ間隔・PR区間・T波)／60-am-65(誤答:P波は心室の興奮に対応)／57-am-64(誤答:P波はHis束の伝導・QRS波は洞房結節の伝導・T波は心室筋の脱分極)／53-pm-68(正答:PR間隔は房室伝導時間。誤答:P波はHis束の興奮・QRS波はPurkinje線維の興奮・ST間隔は心室内興奮到達時間・T波は心室の脱分極)",
    "q": [
     "61-pm-39",
     "60-am-65",
     "57-am-64",
     "53-pm-68"
    ],
    "note": "確認済み[S1]。誤答の「P波=His束・心室」「QRS波=洞房結節」「T波=脱分極」は資料の定義と食い違う。「QRS波=Purkinje線維の興奮」「ST間隔」の定義は資料で確認していない",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/04-心血管疾患/心血管系に関する検査および手技/心電図検査"
     }
    ]
   },
   {
    "item": "PR間隔・QRS幅・QTcの正常範囲",
    "target": "房室伝導・心室内伝導の評価",
    "value": "PR間隔 0.10〜0.20秒(0.20秒超=第1度房室ブロック)／QRS幅 0.07〜0.10秒(0.10〜0.11秒=不完全脚ブロックまたは非特異的な心室内伝導遅延、0.12秒以上=完全脚ブロックまたは心室内伝導遅延)／QTc 男性350〜450 ms・女性360〜460 ms",
    "exam": "56-am-75(誤答:第1度房室ブロックでPR間隔0.1秒以上。基準は0.20秒超)／54-pm-18(PVCのQRS幅0.12秒未満は誤答)",
    "q": [
     "56-am-75",
     "54-pm-18"
    ],
    "note": "確認済み[S1]。心室期外収縮のQRS幅0.12秒以上は別資料で確認(ecg-arrhythmiasカード)",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/04-心血管疾患/心血管系に関する検査および手技/心電図検査"
     }
    ]
   },
   {
    "item": "心電図の紙送りと心拍数の求め方",
    "target": "心電図の読み方(時間・心拍数)",
    "value": "標準の記録速度は25 mm/秒(1 mm=0.04秒)。QRS幅3 mm=0.12秒。心拍数=60÷R-R間隔(秒)(例:R-R間隔0.8秒=75回/分)",
    "exam": "49-am-19(モニター心電図①〜⑤で心拍数75/分以上100/分未満=④。25 mm/s・10 mm/mVの記録からR-R間隔で算出)／54-pm-18(QRS幅3 mm=0.12秒の確認問題として教科書に引用)",
    "q": [
     "49-am-19",
     "54-pm-18"
    ],
    "note": "確認済み[S1]。教科書の復習問題の解説で、25 mm/秒・R波間隔0.8秒→75回/分、QRS幅3 mm→0.12秒と示される。1 mm=0.04秒は25 mm/秒からの計算",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.igaku-shoin.co.jp/download_file/view/12341/12752"
     }
    ]
   },
   {
    "item": "洞調律・洞性徐脈・洞性頻脈の心拍数",
    "target": "心拍数による不整脈の区分",
    "value": "成人の安静時の洞心拍数は通常60〜100回/分。徐脈性不整脈は成人で60回/分未満、頻脈性は安静時100回/分超(資料の一般的な定義)。洞性頻脈は運動・疾患・感情の高まりに伴う交感神経系・カテコラミン活性の亢進による",
    "exam": "61-am-7(β遮断薬内服中の心不全の心電図。正答:洞性徐脈。誤答:心室期外収縮・心房細動・心房粗動・Ⅲ度房室ブロック)／60-pm-20(誤答:Aの心拍数は60/分未満・Bの心拍数は120/分以上)",
    "q": [
     "61-am-7",
     "60-pm-20"
    ],
    "note": "確認済み[S1]。洞性徐脈専用の数値基準は資料になく、徐脈性不整脈全般の「60回/分未満」を適用。β遮断薬で心拍数が下がる点は資料で確認していない",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/04-心血管疾患/不整脈および伝導障害の概要/不整脈の概要"
     }
    ]
   },
   {
    "item": "ST上昇・ST低下の意味と運動中の扱い",
    "target": "虚血の評価・運動療法の中止基準",
    "value": "ST上昇=心筋虚血・心筋梗塞のほか心膜炎・高カリウム血症・肺塞栓症など。ST低下=心内膜下虚血・低カリウム血症・ジギタリスなど。運動療法中:Q波のない誘導(aVR・aVL・V1以外)で1 mm以上のST上昇=絶対的中止、1 mm以上のST低下=相対的中止",
    "exam": "60-pm-20(慢性心不全の運動前(A)・自転車エルゴメータ30 W中(B)の心電図。正答:BではSTの低下を認める。誤答:Aでは陰性T波・Aの心拍数は60/分未満・AはLown分類Ⅲ・Bの心拍数は120/分以上。図は未確認)",
    "q": [
     "60-pm-20"
    ],
    "note": "確認済み[S1][S2]。運動中止基準は既存カード(exercise-stop-criteria)と重複",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/04-心血管疾患/心血管系に関する検査および手技/心電図検査"
     },
     {
      "label": "S2",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2021/03/JCS2021_Makita.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "eeg",
  "name": "脳波の周波数帯",
  "category": "臨床検査",
  "aliases": [
   "脳波",
   "α波",
   "β波",
   "θ波",
   "δ波"
  ],
  "rows": [
   {
    "item": "脳波の周波数帯",
    "target": "健常成人の基礎律動",
    "value": "α波 8〜13 Hz、β波 14〜30 Hz、θ波 4〜7 Hz、δ波 0.5〜3 Hz",
    "exam": "61-am-99 正答「安静閉眼時の基礎律動=α波」。57-am-76 誤答「成人の安静覚醒閉眼時の背景活動はθ帯域」（α帯域が正）",
    "q": [
     "57-am-76",
     "61-am-99"
    ],
    "note": "確認済み [S26]",
    "conflict": false,
    "sources": [
     {
      "label": "S26",
      "url": "https://www.jstage.jst.go.jp/article/jscn/42/6/42_365/_pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-19",
  "review": "ai"
 },
 {
  "slug": "egfr",
  "name": "eGFR・尿蛋白(慢性腎臓病)",
  "category": "臨床検査",
  "aliases": [
   "eGFR",
   "GFR",
   "尿蛋白",
   "蛋白尿"
  ],
  "rows": [
   {
    "item": "eGFR",
    "target": "慢性腎臓病（CKD）、腎機能",
    "value": "CKD: 蛋白尿0.15 g/gCr以上（30 mg/gCr以上のアルブミン尿）、またはGFR 60 mL/分/1.73 m2未満が3か月以上",
    "exam": "61-pm-44 正答「腎機能評価に最適=eGFR」。60-am-39 誤答「eGFR-COPD」",
    "q": [
     "60-am-39",
     "61-pm-44"
    ],
    "note": "確認済み [S6]",
    "conflict": false,
    "sources": [
     {
      "label": "S6",
      "url": "https://cdn.jsn.or.jp/medic/guideline/pdf/guide/001-294.pdf"
     }
    ]
   },
   {
    "item": "尿蛋白",
    "target": "慢性腎臓病、尿検査",
    "value": "0.15 g/gCr以上の蛋白尿（30 mg/gCr以上のアルブミン尿）",
    "exam": "61-am-92 正答「慢性腎臓病で蛋白尿」。57-am-47 誤答「蛋白尿の評価は随時尿のみ」。55-pm-75 正答「尿ミオグロビン-横紋筋融解症」",
    "q": [
     "55-pm-75",
     "57-am-47",
     "61-am-92"
    ],
    "note": "確認済み [S6]。57-am-47 の随時尿のみは誤り",
    "conflict": false,
    "sources": [
     {
      "label": "S6",
      "url": "https://cdn.jsn.or.jp/medic/guideline/pdf/guide/001-294.pdf"
     }
    ]
   },
   {
    "item": "CKD GFR区分（病期）",
    "target": "慢性腎臓病の重症度",
    "value": "G1 正常または高値 90以上／G2 正常または軽度低下 60〜89／G3a 軽度〜中等度低下 45〜59／G3b 中等度〜高度低下 30〜44／G4 高度低下〜末期腎不全 15〜29／G5 末期腎不全(ESKD) 15未満（mL/分/1.73m²）。6区分。尿アルブミン/Cr（mg/gCr）30未満/30〜299/300以上、尿蛋白/Cr（g/gCr）0.15未満/0.15〜0.49/0.50以上",
    "exam": "57-am-47（誤答選択肢: eGFRは4つの段階に分類される→正しくは6区分）／52-am-44（誤答選択肢: 病期分類ステージ5の症例では5〜6METsの運動が適応。ステージ5=GFR15未満、正答は血液透析日にも運動療法が行われる）",
    "q": [
     "52-am-44",
     "57-am-47"
    ],
    "note": "確認済み(公式): 日本腎臓学会「エビデンスに基づくCKD診療ガイドライン2023」第1章 https://jsn.or.jp/data/gl2023_ckd_ch01.pdf の表を読了。出題時点との区分の差は無し（6区分は2012年版から継続、旧版は未確認）。2026-11-19",
    "conflict": false,
    "sources": [
     {
      "label": "資料1",
      "url": "https://jsn.or.jp/data/gl2023_ckd_ch01.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-19",
  "review": "ai"
 },
 {
  "slug": "endurance-training-effects",
  "name": "全身持久力トレーニングの効果",
  "category": "リスク管理",
  "aliases": [
   "持久力トレーニング",
   "持久性トレーニング",
   "全身持久力トレーニング",
   "有酸素トレーニング",
   "最大酸素摂取量",
   "嫌気性代謝閾値",
   "トレーニング効果"
  ],
  "rows": [
   {
    "item": "最大心拍数は持久力トレーニングでほとんど変わらない",
    "target": "長期の持久力トレーニングの影響",
    "value": "有酸素トレーニングで、同じ運動量(絶対負荷)での心拍数は下がる。一方、最大心拍数は、トレーニングの状況によらずほぼ変わらないという見解が一般的(数%程度変わりうるという報告もある)。",
    "exam": "61-am-63(正答:長期の持久力トレーニングの影響を受けにくい=最大心拍数。誤答:心拍出量・筋の脂肪代謝能・毛細血管密度・速筋と遅筋の線維の割合)",
    "q": [
     "61-am-63"
    ],
    "note": "確認済み[S2](PubMed掲載の要旨を読んで確認。本文は未入手)。3〜7%程度の変化がありうるという報告もあるが、国試の「受けにくい」と矛盾しない。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://pubmed.ncbi.nlm.nih.gov/10688280/"
     }
    ]
   },
   {
    "item": "最大心拍出量・最大酸素摂取量は増える",
    "target": "全身持久力トレーニングの心血管系の効果",
    "value": "有酸素トレーニングで有酸素能力(最大酸素摂取量)が大きく上がる。もっとも重要な適応は最大心拍出量の増加で、心臓の大きさ・収縮力・血液量が増えて、心室の充満が増え、1回拍出量が大きくなる。",
    "exam": "57-pm-36(正答:最大酸素摂取量が増加する・同一運動強度での換気量が減少する。誤答:最大心拍出量が減少する)／61-am-63(誤答側:心拍出量は変化する)",
    "q": [
     "57-pm-36",
     "61-am-63"
    ],
    "note": "確認済み[S1](PubMed掲載の要旨を読んで確認)。「同一強度での換気量の減少」は今回の資料では確認できなかったため載せていない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pubmed.ncbi.nlm.nih.gov/26756625/"
     }
    ]
   },
   {
    "item": "骨格筋の毛細血管・酸素を取り出す力",
    "target": "全身持久力トレーニングの末梢の効果",
    "value": "動脈・細動脈・毛細血管が構造も数も適応する。筋内の細い血管のネットワークが大きくなり、拡散する面積が増え距離が短くなって、筋が酸素を取り出す力が高まる。",
    "exam": "61-am-63(誤答側:毛細血管密度は変化する)",
    "q": [
     "61-am-63"
    ],
    "note": "確認済み[S1](PubMed掲載の要旨を読んで確認)。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pubmed.ncbi.nlm.nih.gov/26756625/"
     }
    ]
   },
   {
    "item": "嫌気性代謝閾値(AT)は上がる方向",
    "target": "全身持久力トレーニングとAT",
    "value": "嫌気性代謝閾値付近か、やや上の強さのトレーニングは、有酸素能力(最大酸素摂取量)と嫌気性代謝閾値の水準の両方を高める。",
    "exam": "57-pm-36(誤答:嫌気性代謝閾値の運動強度が低下する)",
    "q": [
     "57-pm-36"
    ],
    "note": "確認済み[S3](PMC掲載の要旨を読んで確認。ATの強さでトレーニングした場合の記述で、一般のトレーニング効果としての詳しい根拠は本文未確認)。",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3438148"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "energy-metabolism",
  "name": "エネルギー代謝(RMR・呼吸商・基礎代謝・食事誘発性熱産生)",
  "category": "臨床検査",
  "aliases": [
   "RMR",
   "エネルギー代謝率",
   "基礎代謝",
   "基礎代謝量",
   "呼吸商",
   "特異動的作用",
   "食事誘発性熱産生",
   "食事誘発性体熱産生",
   "RQ",
   "SDA"
  ],
  "rows": [
   {
    "item": "エネルギー代謝率(RMR)",
    "target": "身体活動の強度(基礎代謝量を基準)",
    "value": "RMR=(活動時のエネルギー消費量−安静時のエネルギー消費量)÷基礎代謝量=活動(労作)代謝量÷基礎代謝量。METsとの関係はRMR=1.2×(METs−1)。",
    "exam": "56-am-69(正答:労作代謝量÷基礎代謝量。誤答:労作代謝量÷安静時代謝量など)／52-pm-69(正答:RMRは基礎代謝量を基準とした運動強度)／54-am-69(正しい記述:RMRは基礎代謝量を基準とした運動強度)／59-am-69(誤答:RMRは安静時代謝量が基準)／第51回(エネルギー代謝率の計算式=労作代謝量÷基礎代謝量(正))",
    "q": [
     "56-am-69",
     "52-pm-69",
     "54-am-69",
     "59-am-69"
    ],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.tyojyu.or.jp/net/kenkou-tyoju/undou-kiso/undou-energy.html"
     }
    ]
   },
   {
    "item": "呼吸商(RQ)",
    "target": "栄養素の燃焼の指標",
    "value": "RQ=二酸化炭素産生量÷酸素消費量(比)。糖質1.0、たんぱく質約0.8、脂質0.7。RQが1.0を超えるのは糖質の過剰供給を示すとされる。",
    "exam": "61-pm-69(正答:蛋白質のRQは脂質より大きい。誤答:換気障害の指標・長時間運動で増加・糖質燃焼が増えると低下・『CO2排出量−O2消費量』)／59-pm-63(正答:単位時間あたりのCO2産生量とO2消費量の比)／59-am-69(誤答:糖質の燃焼が多くなると低下)／57-am-69(正:脂肪燃焼が多くなるとRQは低下)／54-am-69(RQは摂取栄養素で異なる:正しい記述)",
    "q": [
     "61-pm-69",
     "59-pm-63",
     "59-am-69",
     "57-am-69",
     "54-am-69"
    ],
    "note": "確認済み[S1][S2]。値は英語の教育資料[S1]で確認(日本の公的資料では本文確認できず)。糖質が増えるとRQは上がり、脂肪が増えると下がる、は値(1.0と0.7)からの帰結で、資料に直接の文はない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.openanesthesia.org/high-respiratory-quotient-lipogenesis"
     },
     {
      "label": "S2",
      "url": "https://tsukuba.repo.nii.ac.jp/record/39342/files/DA07882.pdf"
     }
    ]
   },
   {
    "item": "METsと基礎代謝の関係",
    "target": "代謝当量の定義との混同(誤答になりやすい点)",
    "value": "メッツ値=座位安静時代謝量の倍数で表した活動強度で、1 MET=安静時(座位)の酸素摂取量3.5 mL/kg/分。絶食時の座位安静時代謝量は仰臥位で測る基礎代謝量よりおよそ10%大きく、メッツ値×1.1≒Af(基礎代謝量の倍数)。",
    "exam": "61-am-68(誤答:METsは作業時と安静時の代謝量の差で表す(正しくは倍数=比))／59-am-69(誤答:METsは基礎代謝量が基準)／57-am-69(正:1MET=3.5mL/kg/分。誤:安静時代謝量は基礎代謝量より小さい)／52-pm-69(誤答:METは安静臥位が基準)／59-am-5(1 MET=3.5 mL/min/kg)",
    "q": [
     "61-am-68",
     "59-am-69",
     "57-am-69",
     "52-pm-69",
     "59-am-5"
    ],
    "note": "確認済み[S1][S2]。METs自体の基準値は既存カード mets を参照。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.mhlw.go.jp/content/10904750/001580149.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.tyojyu.or.jp/net/kenkou-tyoju/undou-kiso/undou-energy.html"
     }
    ]
   },
   {
    "item": "食事誘発性熱産生(特異動的作用)",
    "target": "食後のエネルギー消費の増加",
    "value": "食後の熱産生は摂取エネルギーの約10%に相当し、たんぱく質など食事の栄養組成の影響を受ける。栄養素ごとでは、たんぱく質のみ摂取で摂取エネルギーの約30%、糖質のみ約6%、脂質のみ約4%。",
    "exam": "61-am-68(正答:食後の消費エネルギー増加はたんぱく質摂取で大きい)／54-am-69(SDAは食物摂取後の熱産生増加:正しい記述)／52-pm-69(誤答:SDAは消費エネルギーの減少)",
    "q": [
     "61-am-68",
     "54-am-69",
     "52-pm-69"
    ],
    "note": "確認済み[S1][S2]。資料は『特異動的作用』ではなく『食事誘発性(体)熱産生』と表記。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.mhlw.go.jp/content/10904750/001580149.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.tyojyu.or.jp/net/kenkou-tyoju/tairyoku-kiki/energy-sokutei.html"
     }
    ]
   },
   {
    "item": "基礎代謝(量)",
    "target": "覚醒状態で必要な最小限のエネルギー",
    "value": "覚醒状態で必要な最小限のエネルギー。早朝空腹時に、快適な室内で安静仰臥位・覚醒状態で測定する。1日のエネルギー消費量の約60%を占める(健康長寿ネット)。",
    "exam": "61-am-68(誤答:基礎代謝は安静立位で計測)／第50回(『安静臥床で計測する』は正しい記述)",
    "q": [
     "61-am-68"
    ],
    "note": "確認済み[S1][S2]。同性同年齢で体表面積に比例、副腎髄質ホルモンで上昇などの記述(第49・50回)は引用資料で未確認。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.mhlw.go.jp/content/10904750/001580149.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.tyojyu.or.jp/net/kenkou-tyoju/undou-kiso/undou-energy.html"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "exercise-intensity",
  "name": "運動強度の決め方(Karvonen法・Borg指数)",
  "category": "リスク管理",
  "aliases": [
   "Karvonen法",
   "カルボーネン法",
   "Borg指数",
   "Borgスケール",
   "ボルグ",
   "修正Borg",
   "CPX",
   "心肺運動負荷試験",
   "嫌気性代謝閾値",
   "ランプ負荷"
  ],
  "rows": [
   {
    "item": "Karvonen法",
    "target": "目標心拍数の算出",
    "value": "目標心拍数=(最高心拍数−安静時心拍数)×k＋安静時心拍数。kは通常0.6(合併症のない若年急性心筋梗塞など)、高リスク例0.4〜0.5、心不全例0.3〜0.5",
    "exam": "55-pm-91(誤答:β遮断薬服用中の運動負荷量の指標としてKarvonen法=心拍応答が不安定なため不適)",
    "q": [
     "55-pm-91"
    ],
    "note": "確認済み[S10](k の値と、β遮断薬投与例では心拍数による処方を避けBorg指数を用いること)",
    "conflict": false,
    "sources": [
     {
      "label": "S10",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2021/03/JCS2021_Makita.pdf"
     }
    ]
   },
   {
    "item": "運動療法の中止基準(Borg指数)",
    "target": "運動の中止",
    "value": "心リハの運動中止基準の例=自覚症状(息切れ・疲労感)がBorg指数14以上など",
    "exam": "55-am-8(COPD。選択肢「修正Borg指数5」は誤答。中止すべき状態の正答はSpO₂ 82%)",
    "q": [
     "55-am-8"
    ],
    "note": "確認済み[S10](Borg 14以上は心疾患の例)。★COPD・呼吸リハの中止基準(修正Borgの値)は資料未取得で未確認",
    "conflict": true,
    "sources": [
     {
      "label": "S10",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2021/03/JCS2021_Makita.pdf"
     }
    ]
   },
   {
    "item": "Borg指数(6〜20点)・運動強度の目安",
    "target": "心筋梗塞後・心リハ・糖尿病の有酸素運動",
    "value": "中強度=Borg 12〜13(ややきつい)=HRR 40〜59%=最高心拍数64〜76%=peak VO2 40〜59%。低強度=Borg 9〜11。高強度=Borg 14〜17。AMI回復期: 12〜13(ややつらい)。心不全でCPX不可: 11〜13。ICU中止の補助: Borg 14以上(強心薬投与中)",
    "exam": "60-am-18 正答=Borg指数11〜13／52-pm-43 誤答選択肢「Borg指数16レベルの運動」(目安は11〜13)／54-pm-47 誤答選択肢「Borg指数17前後」／60-pm-36 誤答選択肢「Borg指数17程度」／56-am-46 誤答選択肢「Borg指数13」(中止基準でない)／糖尿病 53-am-93",
    "q": [
     "52-pm-43",
     "53-am-93",
     "54-pm-47",
     "56-am-46",
     "60-am-18",
     "60-pm-36"
    ],
    "note": "確認済み(S1 表16・17・37・63／S6 4章, 2026-11-19)。細かい食い違い: 国試の正答は「11〜13」だが、心リハGL2021の中強度・AMI回復期は「12〜13」(11は低強度側／心不全は11〜13)。糖尿病GLは開始時RPE 11〜12、慣れたら12〜13",
    "conflict": true,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2021/03/JCS2021_Makita.pdf"
     },
     {
      "label": "S6",
      "url": "https://www.jds.or.jp/uploads/files/publications/gl2024/04_1.pdf"
     }
    ]
   },
   {
    "item": "Karvonen法",
    "target": "運動処方の目標心拍数",
    "value": "目標HR=(最高HR−安静時HR)×k+安静時HR。k: 通常0.6(0.4〜0.6)、高リスク(LVEF<40%、70歳以上など)0.4〜0.5、心不全0.3〜0.5。HRR 40〜60%",
    "exam": "60-pm-4 正答110/分: 70歳・最大HR150(220−年齢)・安静時HR70・k=0.5 → 70+0.5×(150−70)=110(選択肢90/100/110/120/130)／54-pm-40 誤答選択肢「Karvonen法」(自覚的強度の指標でなく心拍数による算出法)／55-pm-91 誤答選択肢「Karvonen法」「最大予測心拍数」「安静時心拍数」(β遮断薬服用中は不適)",
    "q": [
     "54-pm-40",
     "55-pm-91",
     "60-pm-4"
    ],
    "note": "確認済み(S1 表16, 2026-11-19)。k=0.5は高リスク例の範囲内で整合。式 最大HR=220−年齢 は資料に明記なく問題文提示の式(未確認)",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2021/03/JCS2021_Makita.pdf"
     }
    ]
   },
   {
    "item": "β遮断薬服用中の運動強度の指標",
    "target": "β遮断薬服用・変時性応答不全",
    "value": "心拍数による処方は不適。Borg指数を用いる。簡便法(安静時HR+30)はβ遮断薬投与例で+20",
    "exam": "55-pm-91 正答=Borg指数。誤答選択肢=PCI・Karvonen法・安静時心拍数・最大予測心拍数",
    "q": [
     "55-pm-91"
    ],
    "note": "確認済み(S1 表16, 2026-11-19)。PCI(Physiological Cost Index)の記載は資料に無く未確認",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2021/03/JCS2021_Makita.pdf"
     }
    ]
   },
   {
    "item": "目標心拍数・%最高心拍数の数値",
    "target": "有酸素運動の強度(COPD・糖尿病)",
    "value": "最高心拍数の50〜70%(心不全)、DM: 開始 最大心拍数の50〜60%→慣れたら60〜70%。目標心拍数の絶対値(130/分、115/分)の基準は資料に無し",
    "exam": "54-pm-17 誤答選択肢「目標心拍数130/分」／53-pm-11 誤答選択肢「目標心拍数115/分で有酸素運動20分間」",
    "q": [
     "53-pm-11",
     "54-pm-17"
    ],
    "note": "確認済み(S1 表37／S6, 2026-11-19)(%最高心拍数の範囲のみ)。130/分・115/分そのものの当否は未確認",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2021/03/JCS2021_Makita.pdf"
     },
     {
      "label": "S6",
      "url": "https://www.jds.or.jp/uploads/files/publications/gl2024/04_1.pdf"
     }
    ]
   },
   {
    "item": "%最大酸素摂取量・最大仕事量(COPDの有酸素運動)",
    "target": "COPD(在宅酸素・FEV1% 42%)",
    "value": "呼吸リハの低強度負荷=peak VO2の40〜60%。高強度=60〜80%相当(別表)。METs・最大仕事量%・修正Borgの絶対値の基準は資料に無し",
    "exam": "54-pm-17「有酸素運動の運動強度として最も適切」: 正答=最大酸素摂取量の40%。誤答選択肢=7 METs・修正Borg指数7・最大仕事量の75%・目標心拍数130/分",
    "q": [
     "54-pm-17"
    ],
    "note": "確認済み(S16 表(低強度=VO2peakの40〜60%), 2026-11-19)(正答の40%は範囲の下限)。他の選択肢の値は未確認",
    "conflict": false,
    "sources": [
     {
      "label": "S16",
      "url": "https://www.jsrcr.jp/publish/file/rehabilitation_statement2018_v2.pdf"
     }
    ]
   },
   {
    "item": "嫌気性代謝閾値(AT)の定義",
    "target": "運動生理",
    "value": "AT=血中乳酸が急増し始める点。(誤: 低下する点)",
    "exam": "61-pm-29 誤答選択肢「ATとは血中乳酸濃度が低下する点」。正答=有酸素性エネルギー供給は大量のATPを生産できる",
    "q": [
     "61-pm-29"
    ],
    "note": "確認済み(AT=ATレベルでの処方の語義はS1 表16・17, 2026-11-19)。乳酸急増の定義文は一次資料で未確認(教科書)",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2021/03/JCS2021_Makita.pdf"
     }
    ]
   },
   {
    "item": "全身持久力改善に必要な運動負荷(ワット)",
    "target": "持久力トレーニング",
    "value": "強度は最高酸素摂取量(VO2peak)の50〜75%程度(ガイド2023)。心リハ: peak VO2の40〜59%(中強度)。最大酸素摂取量3,500 mL/分のグラフに対する%相当のワット数を読む問題",
    "exam": "53-am-15 正答200 W(選択肢50/100/200/300/350 W)。am-14のグラフと連問",
    "q": [
     "53-am-15"
    ],
    "note": "確認済み(強度の目安は S8 全身持久力資料／S1 表17, 2026-11-19)。200 Wの導出はグラフ(未確認)に依存し問題文のみ",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2021/03/JCS2021_Makita.pdf"
     },
     {
      "label": "S8",
      "url": "https://www.mhlw.go.jp/content/001194020.pdf"
     }
    ]
   },
   {
    "item": "ランプ負荷法・運動負荷試験の方式",
    "target": "運動負荷試験(CPX)",
    "value": "ランプ負荷=直線的(連続)漸増負荷(例 20 W/分)。多段階漸増=Bruce法・シャトルウォーキング(ISWT)。固定負荷=Master's two-step(マスターシングル)。6分間歩行=一定時間の自己ペース歩行",
    "exam": "54-am-23「固定負荷で行う運動負荷試験」: 正答=マスターシングルテスト。誤答選択肢=Bruce法・ランプ負荷法・6分間歩行テスト・シャトルウォーキングテスト／53-pm-2 問題文 1分間に20ワット増加させるランプ負荷法(CPXの図の解釈)／59-am-5 問題文 20 Watts/分のランプ負荷法／61-pm-18 誤答選択肢 Ramp負荷・多段階漸増負荷",
    "q": [
     "53-pm-2",
     "54-am-23",
     "59-am-5",
     "61-pm-18"
    ],
    "note": "確認済み(S1: ランプ=直線的漸増、ISWT=多段階漸増, 2026-11-19)。Bruce法の多段階、Master's固定負荷の定義文は未確認(教科書)",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2021/03/JCS2021_Makita.pdf"
     }
    ]
   },
   {
    "item": "運動負荷の様式(インターバル等)",
    "target": "TAVI術後・運動処方",
    "value": "高強度インターバルトレーニング(HIIT)の例: 高強度=最高心拍数85〜95%を3〜4分×4回、中強度(60〜70%)を3〜4分×3回",
    "exam": "61-pm-18 正答=インターバルトレーニング(高強度45秒と低強度90秒を交互)。誤答選択肢=Ramp負荷・コンディショニング・サーキットトレーニング・多段階漸増負荷",
    "q": [
     "61-pm-18"
    ],
    "note": "確認済み(S1 表19, 2026-11-19)。食い違い: 問題文の45秒/90秒は表19の例(3〜4分)と異なる。区分名(インターバル)としては整合",
    "conflict": true,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2021/03/JCS2021_Makita.pdf"
     }
    ]
   },
   {
    "item": "筋力増強運動の負荷強度(%1RM)",
    "target": "レジスタンストレーニング",
    "value": "反復可能回数とRM: 5回=1RMの90%、8回=80%、12回=70%。筋力増強の目安 60〜80%×8〜12回。心不全: 上肢30〜40%・下肢50〜60%、10〜15回、Borg13以下。開始はRPE 11〜13。筋力維持20〜30%は資料に無し",
    "exam": "61-am-32 誤答選択肢「レジスタンス運動は最大負荷の90%で実施」(加齢による筋萎縮)／60-am-40 誤答選択肢「筋力維持には最大筋力の40〜50%以上の負荷が必要」(記録上は維持20〜30%、増強60〜80%)／53-pm-11 「1RMの80%」",
    "q": [
     "53-pm-11",
     "60-am-40",
     "61-am-32"
    ],
    "note": "確認済み(S1 レジスタンス欄・表37／S8 筋トレ資料, 2026-11-19)。「維持20〜30%」「高齢者の適切な%」は未確認",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2021/03/JCS2021_Makita.pdf"
     },
     {
      "label": "S8",
      "url": "https://www.mhlw.go.jp/content/001194020.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-19",
  "review": "ai"
 },
 {
  "slug": "exercise-stop-criteria",
  "name": "運動療法の禁忌・中止基準",
  "category": "リスク管理",
  "aliases": [
   "運動療法の中止基準",
   "Anderson・土肥の基準",
   "アンダーソン・土肥"
  ],
  "rows": [
   {
    "item": "運動療法の禁忌(心血管)",
    "target": "虚血性心疾患・心血管疾患の運動療法",
    "value": "絶対的禁忌: 不安定狭心症または閾値の低い心筋虚血(平地ゆっくり歩行=2 METで誘発)／過去3日以内の心不全自覚症状の増悪／血行動態異常の原因となるコントロール不良の不整脈(心室細動・持続性心室頻拍)／活動性の心筋炎・心膜炎・心内膜炎／急性全身性疾患または発熱 ほか。相対的禁忌: 発症2日以内の急性心筋梗塞・高度房室ブロック・血行動態が保持された非持続性VT/頻脈性心房細動 ほか。禁忌でないもの: 高齢・LVEF低下・血行動態が保持され心拍数コントロール良好な不整脈 ほか",
    "exam": "53-am-39「禁忌となるのはどれか。2つ選べ」: 正答=活動性の心筋炎・コントロールされていない不整脈。誤答選択肢=安定狭心症・代償性心不全・Ⅰ度房室ブロック",
    "q": [
     "53-am-39"
    ],
    "note": "確認済み(S1 表25, 2026-11-19)。ただし「安定狭心症」「代償性心不全」「Ⅰ度房室ブロック」は表25に明記がない(禁忌は不安定狭心症・過去3日以内の心不全増悪・高度房室ブロック(相対的)なので、解釈としては整合)",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2021/03/JCS2021_Makita.pdf"
     }
    ]
   },
   {
    "item": "運動療法の中止すべき状態(症状・不整脈)",
    "target": "心リハ・運動療法中",
    "value": "絶対的中止: 患者の中止希望／意識状態の悪化／心停止・高度徐脈・致死的不整脈(VT・VF)／強い胸痛・腹痛・背部痛・血圧低下・意識消失等／Q波のない誘導(aVR・aVL・V1以外)で1 mm以上のST上昇／事故。相対的中止: 同一強度で胸部症状・めまい・低血糖発作等が悪化／新たな不整脈／1 mm以上のST低下",
    "exam": "57-am-46「運動療法を中止する状態として誤っているのは」: 正答(誤り側)=単発性心室期外収縮。中止すべきとして並んだ選択肢=胸痛の出現・チアノーゼ・喘鳴による呼吸困難感・胸部不快感を伴う心室頻拍",
    "q": [
     "57-am-46"
    ],
    "note": "確認済み(S1 表25, 2026-11-19)。表25に「単発性心室期外収縮」「チアノーゼ」「喘鳴」の語は無い(単発PVCは致死的不整脈でも新規の不整脈の悪化でもないため中止基準に載らない、と整合。チアノーゼ・喘鳴の個別基準は未確認)",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2021/03/JCS2021_Makita.pdf"
     }
    ]
   },
   {
    "item": "ST低下",
    "target": "運動中の心電図(慢性心不全の運動療法)",
    "value": "1 mm(0.1 mV)以上のST低下=相対的中止基準",
    "exam": "60-pm-20 エルゴメーター30W中の心電図B「STの低下を認める」=正答(心電図の図は未確認)",
    "q": [
     "60-pm-20"
    ],
    "note": "確認済み(S1 表25, 2026-11-19)。記録にあった「水平型・下降型」の型の指定は表25に無い",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2021/03/JCS2021_Makita.pdf"
     }
    ]
   },
   {
    "item": "運動中の心拍数(上限・下限)",
    "target": "慢性心不全(運動処方・過負荷の目安)",
    "value": "CPX不可の場合 運動時心拍数 120/分以下(安静座位時+20〜30/分)。過負荷の目安: 同一強度で心拍数+10/分以上・Borg 2段階以上上昇・SpO2 90%未満または5%以上低下・収縮期血圧20 mmHg以上低下",
    "exam": "60-pm-20 誤答選択肢「Aの心拍数は60/分未満」「Bの心拍数は120/分以上」(図は未確認で、値の当否は判定不能)",
    "q": [
     "60-pm-20"
    ],
    "note": "確認済み(S1 表37, 2026-11-19)(120/分以下の基準)。国試の図の心拍数そのものは未確認",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2021/03/JCS2021_Makita.pdf"
     }
    ]
   },
   {
    "item": "運動開始してよい状態(全身持久力トレーニング)",
    "target": "全身状態・バイタル",
    "value": "開始可の目安: SpO2 ≥90%(94%は可)。開始・実施すべきでない: 心室頻拍(致死的不整脈)／収縮期血圧<80 mmHg(60は該当)／発熱(急性全身性疾患または発熱は絶対的禁忌)／脈拍140/分(ICU基準でHR>130は中止)",
    "exam": "58-am-83「積極的な全身持久力トレーニングを開始してよい状態はどれか」: 正答=経皮的酸素飽和度94%。誤答選択肢=心室頻拍・脈拍140/分・体温38.6℃・収縮期血圧60 mmHg",
    "q": [
     "58-am-83"
    ],
    "note": "確認済み(S1 表25／S3 Table2・4, 2026-11-19)。「脈拍140/分」は心リハ表25に上限の数値が無く、ICU中止基準(HR>130/分)で整合",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2021/03/JCS2021_Makita.pdf"
     },
     {
      "label": "S3",
      "url": "https://www.jstage.jst.go.jp/article/jsicm/24/2/24_24_255/_article/-char/ja"
     }
    ]
   },
   {
    "item": "血圧: 重症高血圧・上昇",
    "target": "運動療法の禁忌・中止",
    "value": "重症高血圧=原則 収縮期>200 mmHg または 拡張期>110 mmHg(絶対的禁忌)。運動中止: 収縮期≥250 mmHg または 拡張期≥115 mmHg。「運動前より20 mmHg上昇」の基準は資料に無い",
    "exam": "60-am-18 誤答選択肢「拡張期血圧120 mmHgでは運動が可能」／55-am-8 誤答選択肢「収縮期血圧が安静時より20 mmHg上昇」／55-pm-44 誤答選択肢「収縮期血圧220 mmHg」(脳血管障害の離床を控える側)",
    "q": [
     "55-am-8",
     "55-pm-44",
     "60-am-18"
    ],
    "note": "確認済み(S1 表25, 2026-11-19)。「20 mmHg上昇」自体は資料に基準が無く未確認(慢性心不全の過負荷指標は「低下20 mmHg」)",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2021/03/JCS2021_Makita.pdf"
     }
    ]
   },
   {
    "item": "血圧: 低血圧・平均血圧",
    "target": "運動療法・ICU離床の開始中止",
    "value": "運動中止: 収縮期血圧<80 mmHg(心リハ)。ICU: 開始 MAP≥65 mmHg、中止 MAP<65 または>110 mmHg、収縮期>180 mmHg・収縮期または拡張期20%低下",
    "exam": "58-am-83 誤答選択肢「収縮期血圧60 mmHg」／59-pm-17 正答の1つ「平均血圧65 mmHg以上」／60-pm-10 正答「平均動脈圧80 mmHg」／57-am-18 血圧85/60",
    "q": [
     "57-am-18",
     "58-am-83",
     "59-pm-17",
     "60-pm-10"
    ],
    "note": "確認済み(S1 表25／S3 Table2・4, 2026-11-19)",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2021/03/JCS2021_Makita.pdf"
     },
     {
      "label": "S3",
      "url": "https://www.jstage.jst.go.jp/article/jsicm/24/2/24_24_255/_article/-char/ja"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-19",
  "review": "ai"
 },
 {
  "slug": "facial-palsy",
  "name": "顔面神経麻痺の症候・評価(柳原法・House-Brackmann法)",
  "category": "検査法・徴候",
  "aliases": [
   "顔面神経麻痺",
   "顔面麻痺",
   "Bell麻痺",
   "ベル麻痺",
   "Ramsay Hunt症候群",
   "ハント症候群",
   "柳原法",
   "40点法",
   "House-Brackmann",
   "Yanagihara",
   "兎眼",
   "額のしわ寄せ",
   "閉眼障害"
  ],
  "rows": [
   {
    "item": "中枢性と末梢性の顔面麻痺の違い(額・閉眼)",
    "target": "顔面麻痺の部位診断(核上性か末梢性か)",
    "value": "中枢性:顔面上部(前額部)は両側性の支配のため、主に顔面下部の筋力が低下し、額のしわ寄せは可能。通常は眉寄せと強い閉眼もできる。末梢性:患側は平坦で無表情になり、額のしわ寄せ・瞬目・しかめ面が制限されるか不能になる。",
    "exam": "第50回(顔面筋MMT表:左の口角挙筋・口輪筋・鼻筋のみ低下、額・眼輪筋は保たれる→正答は被殻出血=中枢性。誤答:Bell麻痺・重症筋無力症・Ramsay Hunt症候群・筋強直性ジストロフィー)／52-am-16(Bell麻痺症例で『保たれる運動』を選ぶ:正答は奥歯を噛む。額にしわを寄せる・まぶたを閉じる・口唇を閉じ突き出すは障害される選択肢)",
    "q": [
     "52-am-16"
    ],
    "note": "確認済み[S1]。奥歯を噛む(咬筋)が顔面神経麻痺で保たれる点と、重症筋無力症などが誤答である理由は引用資料で未確認。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-神経疾患/神経眼科疾患および脳神経の疾患/顔面神経麻痺"
     }
    ]
   },
   {
    "item": "閉眼・瞬目と顔面神経(兎眼・眼輪筋)",
    "target": "顔面神経麻痺の症候",
    "value": "末梢性の顔面神経麻痺では額のしわ寄せ・瞬目・しかめ面などの動きが制限される。中枢性病変では通常、強い閉眼ができる。",
    "exam": "58-am-7(強く閉眼させると左兎眼→顔面神経障害)／56-am-30(第Ⅶ脳神経の検査:正答は眼輪筋筋力。誤答:眼球運動・咀嚼筋力・調節反射・軟口蓋反射)／第49回(『顔面神経―開眼障害』は誤り=閉眼障害)",
    "q": [
     "58-am-7",
     "56-am-30"
    ],
    "note": "確認済み[S1]。『眼輪筋』『兎眼』という語と、他の脳神経(Ⅲ・Ⅳ・Ⅵ・Ⅴ・Ⅸ・Ⅹ)との対応は引用資料で未確認。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-神経疾患/神経眼科疾患および脳神経の疾患/顔面神経麻痺"
     }
    ]
   },
   {
    "item": "柳原法(40点法)",
    "target": "顔面神経麻痺の重症度・予後・治癒の判定",
    "value": "顔面の各部位の動きを0・2・4点(1・3点は使わない)で採点して合計する部位別(regional)評価で、40点満点。日本顔面神経学会の2016年ステートメントで名称は『柳原法』に統一され、完全麻痺は10点以下(旧8点以下)、完全治癒は38点以上かつ中等度以上の病的共同運動がないこと(旧36点以上)、治癒判定は発症1年以降(旧6か月)に改められた。重症度の区分例は20点以上=軽症、18〜12点=中等症、10点以下=重症(文献により異なる)。",
    "exam": "出題は直接なし(参考。第50回は顔面筋MMT表を提示)",
    "q": [],
    "note": "確認済み[S1][S2][S3]。診療ガイドライン2023年版の本文は未公開のため、学会声明[S1]と、同ガイドラインを引用した病院論文[S3]で確認。重症度区分の点数は資料により異なる。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://jsfnr.org/assessment_term/docs/mahi_hyoka.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.jstage.jst.go.jp/article/jibiinkoka1947/104/7/104_7_735/_pdf"
     },
     {
      "label": "S3",
      "url": "https://petit.lib.yamaguchi-u.ac.jp/30014/files/168011"
     }
    ]
   },
   {
    "item": "House-Brackmann法",
    "target": "顔面神経麻痺の総括的(gross)評価",
    "value": "顔面全体の動きを総括的に評価する方法で、grade IからVIの6段階。安静時の対称性、前額のしわ寄せ・閉眼・口角の運動に加え、後遺症(異常共同運動・拘縮・痙攣)の評価基準を持つ。柳原法には後遺障害の評価項目がなく、各項目の点数に重みづけもない。欧米で一般的で、日本では柳原法が標準。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1][S2]。各gradeの定義(表)は資料中で画像のため引用していない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/jibiinkoka1947/104/7/104_7_735/_pdf"
     },
     {
      "label": "S2",
      "url": "https://www.jstage.jst.go.jp/article/otoljpn1991/3/2/3_2_241/_pdf"
     }
    ]
   },
   {
    "item": "Bell麻痺・Ramsay Hunt症候群と病変部位",
    "target": "末梢性顔面神経麻痺の原因",
    "value": "Bell麻痺は歴史的に特発性の末梢性(第Ⅶ脳神経)麻痺とされてきた(用語の扱いは一定でない)。Ramsay Hunt症候群=耳帯状疱疹(膝神経節帯状疱疹)。病変が膝神経節より近位だと、唾液分泌・味覚・涙液分泌の障害や聴覚過敏を伴うことがある。",
    "exam": "52-am-16(Bell麻痺の症例)／第50回(誤答選択肢にBell麻痺・Ramsay Hunt症候群)",
    "q": [
     "52-am-16"
    ],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-神経疾患/神経眼科疾患および脳神経の疾患/顔面神経麻痺"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "fim",
  "name": "機能的自立度評価法(FIM)",
  "category": "評価尺度",
  "aliases": [
   "FIM",
   "機能的自立度評価法"
  ],
  "rows": [
   {
    "item": "FIM 全体",
    "target": "ADLの介助量",
    "value": "運動13項目＋認知5項目＝18項目。各1〜7点の7段階、合計18〜126点(最低は18点で、0点にはならない)",
    "exam": "52-pm-29(正答に近い選択肢:運動13・認知5項目。誤答:「全介助で0点」)／53-pm-83・58-am-16・54-pm-8・59-am-10・56-pm-13・60-am-20・57-am-29・57-am-86(各設問は下の行)／53-am-25(誤答:「主観的幸福感を評価できる」)／53-pm-35(誤答:がん患者の尺度)／58-pm-50(誤答:「FIM－呼吸機能」)",
    "q": [
     "52-pm-29",
     "53-am-25",
     "53-pm-35",
     "53-pm-83",
     "54-pm-8",
     "56-pm-13",
     "57-am-29",
     "57-am-86",
     "58-am-16",
     "58-pm-50",
     "59-am-10",
     "60-am-20"
    ],
    "note": "確認済み[S3]",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://www.mhlw.go.jp/file/05-Shingikai-12404000-Hokenkyoku-Iryouka/0000184198.pdf"
     }
    ]
   },
   {
    "item": "FIM 運動項目の構成",
    "target": "運動ADL",
    "value": "13項目=セルフケア6(食事・整容・清拭・更衣上半身・更衣下半身・トイレ動作:計42〜6点)＋排泄2(排尿・排便コントロール:14〜2点)＋移乗3(ベッド椅子車椅子・トイレ・浴槽シャワー:21〜3点)＋移動2(歩行車椅子・階段:14〜2点)。合計91〜13点",
    "exam": "52-pm-29(正答:排尿管理が運動項目)／60-am-20(運動項目の満点91点を前提とする設問)／57-am-86(正答:更衣は上半身と下半身を分けて評価する)",
    "q": [
     "52-pm-29",
     "57-am-86",
     "60-am-20"
    ],
    "note": "確認済み[S3]",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://www.mhlw.go.jp/file/05-Shingikai-12404000-Hokenkyoku-Iryouka/0000184198.pdf"
     }
    ]
   },
   {
    "item": "FIM 認知項目の構成",
    "target": "認知ADL",
    "value": "5項目=コミュニケーション2(理解・表出:14〜2点)＋社会認識3(社会的交流・問題解決・記憶:21〜3点)。合計35〜5点。見当識の項目はない",
    "exam": "52-pm-29(正答:問題解決が認知項目。誤答:「認知の完全自立42点」→正しくは35点)／57-am-86(正答:社会的交流を評価する。誤答:「見当識を評価する」)",
    "q": [
     "52-pm-29",
     "57-am-86"
    ],
    "note": "確認済み[S3]。★「42点」はセルフケア6項目の満点であり、認知の満点(35点)ではない",
    "conflict": true,
    "sources": [
     {
      "label": "S3",
      "url": "https://www.mhlw.go.jp/file/05-Shingikai-12404000-Hokenkyoku-Iryouka/0000184198.pdf"
     }
    ]
   },
   {
    "item": "FIM 7段階の名称",
    "target": "介助量の区分",
    "value": "7=完全自立／6=修正自立／5=監視(準備を含む)／4=最小介助／3=中等度介助／2=最大介助／1=全介助。7・6は「自立」、5〜2は「部分介助」、1は「完全介助」",
    "exam": "53-pm-83(4点=最小介助を選ぶ)／58-am-16(3点=中等度介助)／57-am-29(修正自立)／54-pm-8・59-am-10・56-pm-13(5・6・7点)",
    "q": [
     "53-pm-83",
     "54-pm-8",
     "56-pm-13",
     "57-am-29",
     "58-am-16",
     "59-am-10"
    ],
    "note": "確認済み[S3](名称と区分)。各段階の具体的な基準は下の行",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://www.mhlw.go.jp/file/05-Shingikai-12404000-Hokenkyoku-Iryouka/0000184198.pdf"
     }
    ]
   },
   {
    "item": "FIM 124点の計算",
    "target": "補助具使用の自立",
    "value": "18項目×7点=126点。歩行・車椅子と階段の2項目が杖使用で自立(各6点)＝126−2＝124点",
    "exam": "59-am-10・56-pm-13(選択肢100/112/120/124/126点。正答124点)",
    "q": [
     "56-pm-13",
     "59-am-10"
    ],
    "note": "確認済み[S3](満点126・6点=修正自立)。「杖使用=6点」の根拠は二次[U20]",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://www.mhlw.go.jp/file/05-Shingikai-12404000-Hokenkyoku-Iryouka/0000184198.pdf"
     },
     {
      "label": "U20",
      "url": "https://rehab.cloud/mag/3518/"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-19",
  "review": "ai"
 },
 {
  "slug": "frailty-criteria",
  "name": "フレイルの判定基準(Fried基準・J-CHS基準)",
  "category": "診断基準・分類",
  "aliases": [
   "フレイル",
   "Fried基準",
   "Friedの基準",
   "J-CHS",
   "CHS基準",
   "改訂日本版CHS基準",
   "日本版フレイル基準",
   "プレフレイル",
   "身体的フレイル",
   "frailty",
   "frailty phenotype"
  ],
  "rows": [
   {
    "item": "改訂日本版CHS基準(J-CHS) 全体",
    "target": "日本人高齢者の身体的フレイルの判定",
    "value": "5項目(体重減少・筋力低下・疲労感・歩行速度・身体活動)のうち、3項目以上=フレイル、1〜2項目=プレフレイル、該当なし=健常(ロバスト)。",
    "exam": "59-am-45(判定要件でないのは「歩行距離の減少」が正答。疲労感・筋力低下・体重減少・身体活動低下は要件)／54-am-50(正答:疲労感が増す・動作が緩慢になる。誤答:BMI増加・寝たきり・Barthel Index高値)／52-am-25(誤答:体重増加・「精神的活力」を要素とする、など)／59-pm-82(フレイル高齢者の特徴)",
    "q": [
     "59-am-45",
     "54-am-50",
     "52-am-25",
     "59-pm-82"
    ],
    "note": "確認済み[S1]。基準は2020年の改訂(Satake S, Arai H. Geriatr Gerontol Int 2020)。5項目は身体面で、「歩行距離」「BMI」「骨密度」「肺活量」「柔軟性」「ADL」は項目に含まれない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.tyojyu.or.jp/net/byouki/frailty/shindan.html"
     }
    ]
   },
   {
    "item": "J-CHS 筋力低下・歩行速度の基準",
    "target": "握力と歩行速度のカットオフ",
    "value": "筋力低下=握力が男性28 kg未満・女性18 kg未満。歩行速度=通常歩行速度が1.0 m/秒未満。",
    "exam": "60-am-33(2つ選ぶ。正答:歩行速度の低下・身体活動量の減少。誤答:骨密度の減少・柔軟性の低下・肺活量の低下)／57-am-83(フレイルとサルコペニアの共通の評価項目=握力低下・歩行速度低下。体重減少・疲労感・活動減少はフレイル側)",
    "q": [
     "60-am-33",
     "57-am-83"
    ],
    "note": "確認済み[S1]。握力・歩行速度は数値で測る項目。サルコペニアとの共通項目という整理は国試の記載で、本資料では確認していない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.tyojyu.or.jp/net/byouki/frailty/shindan.html"
     }
    ]
   },
   {
    "item": "J-CHS 体重減少・疲労感・身体活動の基準",
    "target": "問診で判定する3項目",
    "value": "体重減少=6か月で2 kg以上の(意図しない)体重減少。疲労感=(ここ2週間)わけもなく疲れたような感じがする。身体活動=「軽い運動・体操をしていますか」「定期的な運動・スポーツをしていますか」の2つとも「週に1回もしていない」。",
    "exam": "60-am-33(身体活動量の減少は要件=正答)／59-am-45(疲労感・体重減少・身体活動低下は要件=誤答選択肢として提示)／54-am-50(疲労感が増す=正答)",
    "q": [
     "60-am-33",
     "59-am-45",
     "54-am-50"
    ],
    "note": "確認済み[S1]。体重減少は基本チェックリスト11番、疲労感は25番の質問に対応する。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.tyojyu.or.jp/net/byouki/frailty/shindan.html"
     }
    ]
   },
   {
    "item": "Friedらの基準(CHS基準・フレイルの表現型)",
    "target": "身体的フレイルの原型となる基準",
    "value": "5項目(意図しない体重減少・自己申告の疲労感・筋力低下(握力)・歩行速度の低下・身体活動の低下)のうち3項目以上でフレイル。1〜2項目は中間段階(プレフレイル)。原著の体重減少は過去1年で約10ポンド(約4.5 kg)。",
    "exam": "60-am-33(Friedの基準の要件を問う)／54-am-50(Friedらの表現型)／52-am-25(Fried基準・J-CHS基準。該当者が「約1割弱」とする選択肢が誤答)",
    "q": [
     "60-am-33",
     "54-am-50",
     "52-am-25"
    ],
    "note": "確認済み[S2]。原著(米国のCardiovascular Health Study、65歳以上)での有病率は6.9%。日本の地域在住高齢者の有病率は本資料では確認していない。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://pubmed.ncbi.nlm.nih.gov/11253156/"
     }
    ]
   },
   {
    "item": "フレイルの概念と判定基準の範囲",
    "target": "身体面以外を含めた評価との区別",
    "value": "Fried基準・J-CHS基準は身体的フレイルの5項目で判定する。一方、市民向けの「フレイルチェック」(指輪っかテスト・イレブンチェック)は、身体・精神・社会の3つの面を見る別の簡易評価である。",
    "exam": "52-am-25(誤答選択肢:精神・心理面も判断要素に含まれる)／61-pm-30(基本チェックリストに「指輪っかテスト」「反復唾液嚥下テスト」は含まれない=誤答。基本チェックリストは既存カードを参照)",
    "q": [
     "52-am-25",
     "61-pm-30"
    ],
    "note": "確認済み[S1]。精神・心理面を5項目に含むとする選択肢が誤りかどうかは、本資料の5項目の範囲から判断した。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.tyojyu.or.jp/net/byouki/frailty/shindan.html"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "froment-sign",
  "name": "Froment徴候(尺骨神経麻痺)",
  "category": "検査法・徴候",
  "aliases": [
   "Froment徴候",
   "Froment sign",
   "Froment's sign",
   "フロマン徴候",
   "フローマン徴候",
   "フローマンサイン",
   "フロマンサイン"
  ],
  "rows": [
   {
    "item": "Froment徴候の手技と陽性",
    "target": "尺骨神経麻痺",
    "value": "両手の母指と示指で紙をつまみ、反対方向に引っ張る。母指の第1関節(IP関節)が曲がれば陽性で、尺骨神経麻痺を示す。",
    "exam": "55-am-32(正答:陽性のとき麻痺を疑う神経=尺骨神経。誤答:肩甲背神経・正中神経・長胸神経・橈骨神経)／49回(「前骨間神経麻痺―Froment徴候」は誤。Froment=尺骨神経)",
    "q": [
     "55-am-32"
    ],
    "note": "確認済み[S1][S2]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.joa.or.jp/public/sick/condition/ulnar_nerve_palsy.html"
     },
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC12675992/"
     }
    ]
   },
   {
    "item": "陽性になるしくみ(母指内転筋の弱さと代償)",
    "target": "母指内転筋(尺骨神経支配)と長母指屈筋(正中神経の枝)",
    "value": "母指内転筋が弱いと紙を保持できず、長母指屈筋で代償して母指IP関節が過度に屈曲する。同じ代償で示指のPIP関節も屈曲し、「OKサイン」様の形になる。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1][S2]。長母指屈筋は主に正中神経(前骨間神経)の支配。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC12675992/"
     },
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC8216845/"
     }
    ]
   },
   {
    "item": "尺骨神経麻痺のほかの所見",
    "target": "尺骨神経麻痺の診断",
    "value": "母指球以外の手内筋が萎縮し、環指・小指のMP関節が過伸展してIP関節が曲がるかぎ爪変形(鷲手)になる。Tinelサイン(神経障害部を叩くと支配領域に放散痛)があれば障害部位が確定でき、手内筋萎縮・かぎ爪変形・Froment徴候陽性があれば診断がつく。Wartenberg徴候(小指の外転位)も尺骨神経障害の徴候。",
    "exam": "50回(肘部管症候群を疑う所見:正答=小指のしびれ・Froment徴候)／51回(肘部管症候群:正答=小指球の筋萎縮・Froment徴候陽性を2つ選ぶ)",
    "q": [],
    "note": "確認済み[S1][S2]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.joa.or.jp/public/sick/condition/ulnar_nerve_palsy.html"
     },
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC12675992/"
     }
    ]
   },
   {
    "item": "肘部管症候群と尺骨神経",
    "target": "肘で尺骨神経が圧迫・牽引される病態",
    "value": "初期は小指と環指の一部にしびれが出る。麻痺が進むと手の筋肉がやせ、小指と環指の変形が起こる。肘の内側を軽く叩くと小指・環指にしびれが走る(Tinel様)。",
    "exam": "50回・51回(肘部管症候群でみられる所見に小指のしびれ・小指球萎縮・Froment徴候が挙がる)",
    "q": [],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.joa.or.jp/public/sick/condition/cubital_tunnel_syndrome.html"
     }
    ]
   },
   {
    "item": "正中神経・前骨間神経の障害との区別",
    "target": "手根管症候群・前骨間神経麻痺",
    "value": "手根管症候群(正中神経)は母指〜環指(橈側)のしびれと母指球筋の萎縮で、母指と示指でOKの丸ができなくなる。前骨間神経麻痺は母指と示指の第1関節が曲げられず、丸を作ると両方の第1関節が反り返る涙のしずくサイン。感覚障害はない。Froment徴候は尺骨神経の徴候。",
    "exam": "58-pm-91(誤答:手根管症候群でFroment徴候が陽性は誤り)／49回(誤答:前骨間神経麻痺―Froment徴候)",
    "q": [
     "58-pm-91"
    ],
    "note": "確認済み[S1][S2]。「猿手」の記載は、このカードの資料では確認していない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.joa.or.jp/public/sick/condition/carpal_tunnel_syndrome.html"
     },
     {
      "label": "S2",
      "url": "https://www.joa.or.jp/public/sick/condition/anterior_interosseous_nerve_palsy.html"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "fugl-meyer-assessment",
  "name": "Fugl-Meyer Assessment(FMA)",
  "category": "評価尺度",
  "aliases": [
   "Fugl-Meyer",
   "Fugl Meyer",
   "フューグルマイヤー",
   "フーグルマイヤー",
   "FMA-UE",
   "FMA-LE"
  ],
  "rows": [
   {
    "item": "FMA 全体の構成と満点",
    "target": "脳卒中片麻痺の運動機能・総合評価",
    "value": "運動(上肢66＋下肢34=100)・感覚24・バランス14・他動関節可動域44・関節痛44の6領域、満点226点。ADL・高次脳機能・認知・歩行速度の領域は構成にない。",
    "exam": "60-am-30(正答:満点226点)／61-pm-37(誤答:高次脳機能評価は含まない)／59-am-82(誤答:ADLの評価スケールではない)／54-am-34(誤答:ADLの評価を含む。含まれるのは運動機能・感覚・バランス・関節可動域・疼痛)／52-am-33(正答:評価項目に感覚機能がある)／57-am-35(誤答:認知症スクリーニングではない)／58-am-82(誤答:FMA－歩行速度)",
    "q": [
     "60-am-30",
     "61-pm-37",
     "59-am-82",
     "54-am-34",
     "52-am-33",
     "57-am-35",
     "58-am-82"
    ],
    "note": "確認済み[S1][S2][S3]。原著の要旨も運動機能・バランス・感覚・関節機能を挙げる[S3]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/jptpr/36/1/36_1/_pdf/-char/en"
     },
     {
      "label": "S2",
      "url": "https://www.sralab.org/rehabilitation-measures/fugl-meyer-assessment-motor-recovery-after-stroke"
     },
     {
      "label": "S3",
      "url": "https://europepmc.org/article/MED/1135616"
     }
    ]
   },
   {
    "item": "FMA 採点方法",
    "target": "各項目の評価段階",
    "value": "各項目を3段階(0=できない、1=部分的にできる、2=完全にできる)で採点する。反射項目だけは0か2のみ。",
    "exam": "60-am-30(誤答:評価は4段階)",
    "q": [
     "60-am-30"
    ],
    "note": "確認済み[S1][S4]。国試の誤答の言い回し(4段階)と異なり、実際は3段階。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/jptpr/36/1/36_1/_pdf/-char/en"
     },
     {
      "label": "S4",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC12340990/"
     }
    ]
   },
   {
    "item": "FMA 感覚項目",
    "target": "感覚機能(上肢12＋下肢12=24点)",
    "value": "触覚(上肢:上腕・前腕と手掌、下肢:脚と足底)と深部感覚=位置覚(肩・肘・手・母指/股・膝・足・母趾)を、閉眼で非麻痺側と比べて評価する。痛覚の項目はない。",
    "exam": "60-am-30(誤答:感覚は痛覚を評価)／52-am-33(正答:評価項目に感覚機能がある)",
    "q": [
     "60-am-30",
     "52-am-33"
    ],
    "note": "確認済み[S5][S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S5",
      "url": "https://gu.se/sites/default/files/2024-08/fugl-meyer-assessment-japanese-2024-06-09.pdf"
     },
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/jptpr/36/1/36_1/_pdf/-char/en"
     }
    ]
   },
   {
    "item": "FMA 運動項目の並び(Brunnstrom stageとの共通点)",
    "target": "運動機能(上肢66・下肢34)",
    "value": "上肢=反射→屈筋・伸筋共同運動→分離運動(手を腰椎へ、肩屈曲0〜90°、肘90°での前腕回内外)→正常に近い運動→正常反射。続いて手関節・手・協調性/スピード。下肢=反射→共同運動→座位・立位での分離運動→正常反射、協調性/スピード。回復段階の順に並び、共同運動や分離運動の課題がBrunnstrom stageと重なる。",
    "exam": "60-am-30(正答:Brunnstrom法ステージと共通する評価項目がある)／55-pm-12(正答:運動失調の評価として適切でない指標=FMA)",
    "q": [
     "60-am-30",
     "55-pm-12"
    ],
    "note": "確認[S5]。上肢の「手を腰椎へ」「肩屈曲90°」「肘90°での前腕回内外」がBrunnstrom stage上肢Ⅳの課題と同じであることは、民間の評価表[S6]との照合で確認(公的資料での確認は未)。協調性/スピード(振戦・測定障害・時間)の項目はあるが、運動失調の評価法ではなく片麻痺の評価尺度。",
    "conflict": false,
    "sources": [
     {
      "label": "S5",
      "url": "https://gu.se/sites/default/files/2024-08/fugl-meyer-assessment-japanese-2024-06-09.pdf"
     },
     {
      "label": "S6",
      "url": "https://www.stroke-lab.com/wp-content/uploads/2021/10/Br-PDF.pdf"
     }
    ]
   },
   {
    "item": "FMA 上肢・下肢の運動の満点内訳",
    "target": "運動機能の配点",
    "value": "上肢66点=肩・肘・前腕(36)＋手関節(10)＋手(14)＋協調性/スピード(6)。下肢34点=股・膝・足(28)＋協調性/スピード(6)。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S5]。大学公開の日本語版の記録用紙。",
    "conflict": false,
    "sources": [
     {
      "label": "S5",
      "url": "https://gu.se/sites/default/files/2024-08/fugl-meyer-assessment-japanese-2024-06-09.pdf"
     }
    ]
   },
   {
    "item": "FMA バランス・関節可動域・関節痛",
    "target": "運動以外の領域",
    "value": "バランス14点=座位(端座位保持・閉眼での保護伸展反応)と立位(両脚・片脚立位)。他動関節可動域44点(上肢24＋下肢20)。関節痛44点(他動運動時の痛み、上肢24＋下肢20)。",
    "exam": "54-am-34(含まれるのは運動機能・感覚・バランス・関節可動域・疼痛)",
    "q": [
     "54-am-34"
    ],
    "note": "確認済み[S1][S5]。バランスの具体的な課題は[S1]の要約による。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/jptpr/36/1/36_1/_pdf/-char/en"
     },
     {
      "label": "S5",
      "url": "https://gu.se/sites/default/files/2024-08/fugl-meyer-assessment-japanese-2024-06-09.pdf"
     }
    ]
   },
   {
    "item": "FMA 運動の重症度の目安",
    "target": "運動障害の重症度(カットオフ)",
    "value": "運動合計(100点):35点以下=重度、36〜55点=重度〜中等度、56〜79点=中等度、80点以上=軽度。FMA-UE(66点):15点以下=重度、16〜34点=重度〜中等度、35〜53点=中等度〜軽度、54点以上=軽度。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。報告された分類で、診断や治療の指示ではない。全項目の実施は約40分かかり、臨床では運動項目のみやFMA-UEのみで使うことが多い。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/jptpr/36/1/36_1/_pdf/-char/en"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "gait-cycle",
  "name": "正常歩行周期",
  "category": "検査法・徴候",
  "aliases": [
   "歩行周期",
   "立脚期",
   "遊脚期"
  ],
  "rows": [
   {
    "item": "正常歩行周期の割合",
    "target": "歩行周期の区分",
    "value": "立脚相約60%・遊脚相約40%(約6:4)。Perry区分(AAPMR): 初期接地0〜2%・荷重応答2〜12%・立脚中期12〜31%(反対側の爪先離地で開始)・立脚終期31〜50%・前遊脚期50〜62%(反対側の初期接地〜同側の爪先離地)・遊脚初期62〜75%・遊脚中期75〜87%・遊脚終期87〜100%。両脚支持は立脚相のうち約20%(初期・前遊脚)",
    "exam": "57-pm-74: 「一側下肢の立脚相と遊脚相の割合は7:3」は誤答(約6:4)。正答は足関節が1歩行周期に背屈・底屈が2回。56-pm-24: 右前遊脚期=左踵接地から右爪先離地まで(正答)。誤答は立脚中期(右踵接地〜左爪先離地)・立脚終期(左踵離地〜右踵離地)・遊脚中期・遊脚終期の定義。60-am-74: 立脚相の後半は抑制期・重心は立脚中期で最も側方へ(正答)・遊脚側の骨盤は上方傾斜・歩行速度が速いと遊脚相の比率は低下・遊脚相で下肢が体幹後方にある時期は減速期(誤答)。61-pm-74: 遊脚後期に遊脚側下肢が減速(正答)",
    "q": [
     "56-pm-24",
     "57-pm-74",
     "60-am-74",
     "61-pm-74"
    ],
    "note": "確認済み(原文) [S10]。国試の立脚相6:4・前遊脚期の定義と整合。立脚中期の誤答定義の細部、60-am-74・61-pm-74の他選択肢は資料未照合(問題文のみ)",
    "conflict": false,
    "sources": [
     {
      "label": "S10",
      "url": "https://now.aapmr.org/biomechanics-normal-gait/"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-19",
  "review": "ai"
 },
 {
  "slug": "gait-parameters",
  "name": "歩行パラメータ(歩行率・歩幅・歩行比)と異常歩行",
  "category": "検査法・徴候",
  "aliases": [
   "歩行率",
   "歩幅",
   "歩隔",
   "足角",
   "ステップ時間",
   "歩行速度",
   "歩行比",
   "ケイデンス",
   "10m歩行テスト",
   "10MWT",
   "異常歩行",
   "鶏歩",
   "steppage gait",
   "動揺性歩行",
   "waddling gait",
   "はさみ歩行",
   "分回し歩行",
   "歩行分析"
  ],
  "rows": [
   {
    "item": "歩行率・歩幅・歩行速度の定義と計算",
    "target": "歩行の基本パラメータ",
    "value": "歩行率=1分間の歩数(単位は歩/分、steps/min)。歩幅=一側の踵接地位置から反対脚の踵接地位置までの距離。歩行速度=1秒間に進む距離。定義から、歩行速度(m/分)=歩幅(m)×歩行率(歩/分)。例:歩行率120歩/分×歩幅0.4m=48m/分=0.8m/秒。45cm×80歩/分=36m/分=0.6m/秒。",
    "exam": "59-pm-9(歩行率120歩/分・歩行速度0.8m/秒→歩幅40cmが正答)。57-am-74(歩幅45cm・歩行率80歩/分→歩行速度0.6m/秒)。61-pm-31(歩行率の単位=歩/分が正答。誤答:パーセント・秒/歩・m/分・m/歩)",
    "q": [
     "59-pm-9",
     "57-am-74",
     "61-pm-31"
    ],
    "note": "確認済み[S1][S2]。速度=歩幅×歩行率の式は、資料の定義(歩幅=距離、歩行率=歩数/分)からの換算で、算式そのものを書いた記載ではない。上の2題の計算結果は国試の正答と一致。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/rika/19/3/19_3_217/_pdf"
     },
     {
      "label": "S2",
      "url": "https://www.jstage.jst.go.jp/article/rika1996/14/3/14_3_101/_pdf"
     }
    ]
   },
   {
    "item": "歩行比(歩幅÷歩行率)",
    "target": "歩行の効率の指標",
    "value": "歩行比=歩幅÷歩行率。歩行速度を変えても歩幅と歩行率の比はほぼ一定(歩行比不変則)で、歩幅(m)≒歩行率(歩/分)×0.006。加齢では、この比が成人(0.006)より低い値(0.004〜0.005程度)になると記載されている。",
    "exam": "61-pm-74(誤答:高齢者では歩行比は大きくなる)。57-pm-74(誤答:歩行比は高齢者で大きくなる)。50-pm-43(誤答:高齢者では歩行比が大きくなる)",
    "q": [
     "61-pm-74",
     "57-pm-74",
     "50-pm-43"
    ],
    "note": "確認済み[S2][S3]。資料のPDF本文は一部欠けて読み取れ、高齢者の数値(0.004〜0.005)の読みは一部推定を含むが、『成人より低値』の方向は国試の誤答(大きくなる)と矛盾する。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.jstage.jst.go.jp/article/rika1996/14/3/14_3_101/_pdf"
     },
     {
      "label": "S3",
      "url": "https://www.jstage.jst.go.jp/article/cjpt/2008/0/2008_0_A3P2025/_pdf"
     }
    ]
   },
   {
    "item": "歩行分析の用語(足角・歩隔・歩幅・ステップ時間)",
    "target": "歩行分析の計測用語",
    "value": "足角=進行方向と足軸のなす角(爪先開き角)。歩隔=左右の踵の開き幅(進行方向と直角方向)。歩幅=踵接地位置から反対脚の踵接地位置までの距離。ステップ時間=一側脚の踵接地から反対脚の踵接地までの所要時間。",
    "exam": "53-am-23(正答:進行方向と足の長軸がなす角度=足角。誤答:身長が高いほど重複歩距離は短くなる／両脚支持期は速度が速いと長くなる／歩隔を歩幅としている／一側の踵接地から再び接地までの時間をステップ時間としている)",
    "q": [
     "53-am-23"
    ],
    "note": "確認済み[S1]。歩隔を歩幅とする誤りと、ステップ時間の誤った定義(同側踵の再接地までは重複歩の時間に当たる)は資料の定義と合わない。重複歩距離と身長の関係、両脚支持期と歩行速度の関係は資料では確認していない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/rika/19/3/19_3_217/_pdf"
     }
    ]
   },
   {
    "item": "高齢者の歩行の特徴",
    "target": "加齢による歩行の変化",
    "value": "歩行速度は加齢とともに低下し、60歳以後は急激に低下する。この低下は歩行率と歩幅の低下による(特に歩幅の低下が著明)。歩行率は加齢とともに直線的に低下する。",
    "exam": "60-am-95(正答:高齢者歩行の特徴=歩幅の減少。誤答:歩隔の減少・歩行率の増加・遊脚期の延長・両脚支持期の短縮)",
    "q": [
     "60-am-95"
    ],
    "note": "確認済み[S2]。『歩行率の増加』は資料(直線的に低下)と合わない。歩隔・遊脚期・両脚支持期の記載は確認できていない。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.jstage.jst.go.jp/article/rika1996/14/3/14_3_101/_pdf"
     }
    ]
   },
   {
    "item": "異常歩行の名称と原因",
    "target": "歩行観察での異常歩行の判別",
    "value": "小脳性運動失調:歩隔を広くとって歩く。筋力低下による下垂足:鶏歩(つま先が引っかからないよう足を高く上げる)。痙性麻痺:はさみ歩行と分回し歩行。筋力低下(資料の訳語は『骨盤底筋』):動揺性歩行。深部感覚(固有感覚)障害:足の位置を絶えず確認しながら歩く。",
    "exam": "56-pm-30(正答:steppage gait=総腓骨神経麻痺、waddling gait=下肢帯の筋力低下。誤答:frozen gait=小脳性運動失調、scissors gait=パーキンソニズム、wide-based gait=両下肢の痙縮)。53-pm-26(正答:大殿筋歩行=筋ジストロフィー。誤答:鶏歩―脛骨神経麻痺・踵足歩行―脳卒中・動揺歩行―小脳性運動失調症・はさみ脚歩行―正常圧水頭症)。50-pm-73(誤答:総腓骨神経麻痺―分回し歩行)",
    "q": [
     "56-pm-30",
     "53-pm-26",
     "50-pm-73"
    ],
    "note": "確認済み[S4]。scissors(はさみ)歩行は痙性麻痺、wide-based(歩隔広い)は小脳性で、国試の誤答の組合せ(パーキンソニズム・両下肢の痙縮)と入れ替わっている。動揺性歩行の原因は資料が『骨盤底筋』と訳しており、国試の『下肢帯の筋力低下』と語が違う(訳語の問題の可能性があるが原文は未確認)。下垂足の神経名(総腓骨神経)は資料に記載なし。frozen gait・大殿筋歩行・踵足歩行・正常圧水頭症の歩行は資料に記載がなく未確認。",
    "conflict": true,
    "sources": [
     {
      "label": "S4",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-%E7%A5%9E%E7%B5%8C%E7%96%BE%E6%82%A3/%E7%A5%9E%E7%B5%8C%E5%AD%A6%E7%9A%84%E8%A8%BA%E5%AF%9F/%E6%AD%A9%E8%A1%8C-%E5%A7%BF%E5%8B%A2-%E3%81%8A%E3%82%88%E3%81%B3%E5%8D%94%E8%AA%BF%E9%81%8B%E5%8B%95%E3%81%AE%E8%A9%95%E4%BE%A1"
     }
    ]
   },
   {
    "item": "10m歩行テスト",
    "target": "歩行速度の評価",
    "value": "10mの直線距離をできるだけ速く歩く時間を測り、平均歩行速度(m/秒)を算出する。歩行能力を反映する。バランス・転倒リスクの評価にはTUG、Four Square Step Testなどが別に挙げられている。",
    "exam": "59-pm-29(選択肢:10m歩行テストは動的バランス評価検査ではない)",
    "q": [
     "59-pm-29"
    ],
    "note": "確認済み[S5](下肢切断者の評価の記載)。10m歩行テストを動的バランス検査に分類していない点は資料の整理と一致するが、一般の歩行評価全体についての分類の確認ではない。",
    "conflict": false,
    "sources": [
     {
      "label": "S5",
      "url": "https://jarm.or.jp/lla/document/guidelines.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "gbs-rehab",
  "name": "ギラン・バレー症候群(GBS)のリハビリテーション",
  "category": "リスク管理",
  "aliases": [
   "ギラン・バレー症候群",
   "ギランバレー症候群",
   "Guillain-Barré",
   "Guillain-Barre",
   "GBS"
  ],
  "rows": [
   {
    "item": "急性期のリハビリ(早期から・他動的ROM)",
    "target": "GBSの急性期・人工呼吸器管理中",
    "value": "早期からリハビリテーション治療を行う。不動による廃用症候群を最小限にする予防措置になる。関節の拘縮があると、神経が回復してもADL障害が残るため、他動的な関節可動域訓練を行う。急性期の神経筋電気刺激(NMES)で筋萎縮が少なかったという報告があり、有効な可能性はあるが、今後の検証が必要。",
    "exam": "50-pm-8(GBS・発症3日・人工呼吸器管理中に不適切=筋力増強運動(正答)。他は体位変換・胸郭ストレッチ・ROM運動・30°リクライニング位)",
    "q": [
     "50-pm-8"
    ],
    "note": "確認済み[S1](日本神経学会 2024年版 Q&A 18-9)。「筋力増強運動は不適切」とは本文に明記がなく、急性期は他動ROMと廃用予防が中心という記載。国試の正答と矛盾はない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.neurology-jp.org/guidelinem/pdf/gbs_2024_01.pdf"
     }
    ]
   },
   {
    "item": "回復期以降の運動療法・疲労",
    "target": "GBSの回復期以降",
    "value": "医学的管理のもとでの集学的リハ(理学療法・作業療法・装具など)が、神経機能の回復・ADL・QOLの改善に有用。運動療法は筋力や移動能力を改善し、疲労を軽くする。適度な運動療法が疲労を改善する。1年後に34%で下垂足があったという報告があり、必要なら装具を作る。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1](Q&A 18-9・18-10)。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.neurology-jp.org/guidelinem/pdf/gbs_2024_01.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "gcs",
  "name": "Glasgow Coma Scale(GCS)",
  "category": "評価尺度",
  "aliases": [
   "GCS",
   "Glasgow Coma Scale",
   "グラスゴー・コーマ・スケール"
  ],
  "rows": [
   {
    "item": "GCS 全体",
    "target": "意識障害",
    "value": "開眼E(1〜4)＋最良言語反応V(1〜5)＋最良運動反応M(1〜6)、合計3〜15点。E4V5M6=15点",
    "exam": "56-pm-2(入院時E4V5M6。離床練習を中止すべき所見=「GCS E2V2M5」が正答)／52-am-33(誤答:「評価項目に関節可動域がある」)／57-pm-35(誤答:疼痛検査ではない)",
    "q": [
     "52-am-33",
     "56-pm-2",
     "57-pm-35"
    ],
    "note": "確認済み[S7][S21](区分名と合計3〜15)",
    "conflict": false,
    "sources": [
     {
      "label": "S7",
      "url": "https://www.jstage.jst.go.jp/article/naika/99/5/99_1082/_pdf"
     },
     {
      "label": "S21",
      "url": "https://www.glasgowcomascale.org/what-is-gcs/"
     }
    ]
   },
   {
    "item": "GCS 開眼 E",
    "target": "開眼反応",
    "value": "E4=自発的に開眼／E3=呼びかけにより開眼／E2=痛み刺激により開眼／E1=なし",
    "exam": "58-pm-28(正答=E2=痛み刺激で開眼。誤答=E3は呼びかけで開眼(自発開眼はE4))",
    "q": [
     "58-pm-28"
    ],
    "note": "確認済み[S7]",
    "conflict": false,
    "sources": [
     {
      "label": "S7",
      "url": "https://www.jstage.jst.go.jp/article/naika/99/5/99_1082/_pdf"
     }
    ]
   },
   {
    "item": "GCS 言語 V",
    "target": "最良言語反応",
    "value": "V5=見当識あり／V4=混乱した会話／V3=不適当な発語／V2=理解不明の音声／V1=なし",
    "exam": "58-pm-28(誤答=V4は混乱した会話。日時・場所が言えるのはV5)",
    "q": [
     "58-pm-28"
    ],
    "note": "確認済み[S7]",
    "conflict": false,
    "sources": [
     {
      "label": "S7",
      "url": "https://www.jstage.jst.go.jp/article/naika/99/5/99_1082/_pdf"
     }
    ]
   },
   {
    "item": "GCS 運動 M",
    "target": "最良運動反応",
    "value": "M6=命令に応じて可／M5=疼痛部へ／M4=逃避反応として／M3=異常な屈曲運動／M2=伸展反応(徐脳姿勢)／M1=なし",
    "exam": "58-pm-28(誤答=M4は逃避屈曲(払いのけはM5)、M5は疼痛部位を払いのける(指示に従うのはM6))",
    "q": [
     "58-pm-28"
    ],
    "note": "確認済み[S7]",
    "conflict": false,
    "sources": [
     {
      "label": "S7",
      "url": "https://www.jstage.jst.go.jp/article/naika/99/5/99_1082/_pdf"
     }
    ]
   },
   {
    "item": "GCS E2V2M5",
    "target": "離床の中止判断",
    "value": "合計9点(E2＋V2＋M5)。入院時15点からの悪化=意識レベル低下",
    "exam": "56-pm-2(正答。「離床練習を中止すべき所見」)",
    "q": [
     "56-pm-2"
    ],
    "note": "確認済み[S7](区分から9点と計算)。「中止基準」としての根拠は問題文のみ",
    "conflict": false,
    "sources": [
     {
      "label": "S7",
      "url": "https://www.jstage.jst.go.jp/article/naika/99/5/99_1082/_pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-19",
  "review": "ai"
 },
 {
  "slug": "gmfcs",
  "name": "GMFCS",
  "category": "評価尺度",
  "aliases": [
   "GMFCS",
   "粗大運動能力分類システム"
  ],
  "rows": [
   {
    "item": "GMFCS 全体",
    "target": "脳性麻痺の粗大運動能力の分類",
    "value": "レベルⅠ〜Ⅴの5段階。Ⅰ=制限なしに歩く／Ⅱ=制限を伴って歩く／Ⅲ=手に持つ移動器具を使って歩く／Ⅳ=制限を伴う自力移動(電動の移動手段可)／Ⅴ=手動車椅子で移送される。2歳未満・2〜4歳・4〜6歳・6〜12歳・12〜18歳の年齢帯ごとに定義が異なる",
    "exam": "61-pm-36(誤答:「重症度をレベルⅠ〜Ⅴに分類」はGMFMではなくGMFCS)／59-am-91(誤答:脳卒中の尺度ではない)",
    "q": [
     "59-am-91",
     "61-pm-36"
    ],
    "note": "確認済み[S13]",
    "conflict": false,
    "sources": [
     {
      "label": "S13",
      "url": "https://canchild.ca/wp-content/uploads/2025/03/GMFCS-ER_English-ACCESS.pdf"
     }
    ]
   },
   {
    "item": "GMFCS 6〜12歳 レベルⅠ",
    "target": "脳性麻痺(6〜12歳)",
    "value": "自宅・学校・屋外・地域で歩く。縁石の昇降は介助なし、階段は手すりなしで昇降。走る・跳ぶは速度・バランス・協調性が制限される",
    "exam": "60-am-25(誤答:「Ⅰ=階段で手すり使用」→手すりなしが正しい)",
    "q": [
     "60-am-25"
    ],
    "note": "確認済み[S13]",
    "conflict": false,
    "sources": [
     {
      "label": "S13",
      "url": "https://canchild.ca/wp-content/uploads/2025/03/GMFCS-ER_English-ACCESS.pdf"
     }
    ]
   },
   {
    "item": "GMFCS 6〜12歳 レベルⅡ",
    "target": "脳性麻痺(6〜12歳)",
    "value": "ほとんどの場所で歩く。長距離歩行や不整地・傾斜・混雑・狭い場所・物を持つ場面で困難。階段は手すりを持って昇降(手すりがなければ介助)。屋外・地域では介助・手に持つ移動器具・長距離は車輪付き移動。「歩く」の定義は介助や手に持つ移動器具を使わない(装具の装着は可)",
    "exam": "55-pm-46(8歳、階段昇降に手すりが必要、長距離歩行や狭い場所で介助が必要→レベルⅡが正答)／60-am-25(6〜12歳で正答=Ⅱ「装具なしで歩行」)／53-am-47(レベルⅡの運動指導=歩行補助具なしでの歩行練習が正答。誤答=車椅子駆動・割り座・バニーホッピング・スタンディングボード)",
    "q": [
     "53-am-47",
     "55-pm-46",
     "60-am-25"
    ],
    "note": "確認済み[S13]",
    "conflict": false,
    "sources": [
     {
      "label": "S13",
      "url": "https://canchild.ca/wp-content/uploads/2025/03/GMFCS-ER_English-ACCESS.pdf"
     }
    ]
   },
   {
    "item": "GMFCS 6〜12歳 レベルⅢ",
    "target": "脳性麻痺(6〜12歳)",
    "value": "屋内の大半で手に持つ移動器具(杖・クラッチ・歩行器)を使って歩く。座位でシートベルトが必要なことがある。起立移乗に介助または支持面が必要。長距離は車輪付き移動。階段は手すり＋見守りまたは介助",
    "exam": "55-pm-13(痙直型両麻痺8歳、レベルⅢ(床上はバニーホッピング、学校内は車椅子自立)で車椅子の設定。正答=フットサポートはスイングアウト式)／57-am-16(レベルⅢ・痙直型両麻痺、立位姿勢から治療方針=体幹筋の同時収縮を促す)／60-am-25(誤答:「Ⅲ=不整地の歩行」)",
    "q": [
     "55-pm-13",
     "57-am-16",
     "60-am-25"
    ],
    "note": "確認済み[S13]",
    "conflict": false,
    "sources": [
     {
      "label": "S13",
      "url": "https://canchild.ca/wp-content/uploads/2025/03/GMFCS-ER_English-ACCESS.pdf"
     }
    ]
   },
   {
    "item": "GMFCS 6〜12歳 レベルⅣ",
    "target": "脳性麻痺(6〜12歳)",
    "value": "ほとんどの場面で身体介助または電動の移動が必要。座位に体幹・骨盤の支持のある座位保持装置が必要。移乗は大半で身体介助。家庭では床上移動・短距離の介助歩行・電動移動、体幹支持歩行器は位置を整えれば使用可。学校・屋外・地域では手動車椅子で移送または電動",
    "exam": "61-pm-17(痙直型両麻痺6歳8か月。座位保持不可、立位保持・移乗に介助、車輪付き歩行器で介助10m、屋外は車椅子移送か電動車椅子自立操作→レベルⅣが正答。選択肢Ⅰ〜Ⅴ)／60-am-25(誤答:「Ⅳ=通常の椅子で座位保持」→座位保持装置が必要)",
    "q": [
     "60-am-25",
     "61-pm-17"
    ],
    "note": "確認済み[S13]",
    "conflict": false,
    "sources": [
     {
      "label": "S13",
      "url": "https://canchild.ca/wp-content/uploads/2025/03/GMFCS-ER_English-ACCESS.pdf"
     }
    ]
   },
   {
    "item": "GMFCS 6〜12歳 レベルⅤ",
    "target": "脳性麻痺(6〜12歳)",
    "value": "あらゆる場面で手動車椅子で移送される。頭部・体幹の抗重力姿勢の保持が制限される。移乗は全介助。家庭では床上で短距離を動くか抱きかかえられる。電動移動は大幅な適合で自力可",
    "exam": "60-am-25(誤答:「Ⅴ=四つ這い移動可能」。入力ではⅤの記述として誤りとされた(要確認))",
    "q": [
     "60-am-25"
    ],
    "note": "確認済み[S13]。★S13 のⅤは「家庭では床上で短距離を動くことがある」とあり、Ⅳの「床上移動(寝返り・這い)」との線引きは本文の記述のみでは明瞭でない",
    "conflict": true,
    "sources": [
     {
      "label": "S13",
      "url": "https://canchild.ca/wp-content/uploads/2025/03/GMFCS-ER_English-ACCESS.pdf"
     }
    ]
   },
   {
    "item": "GMFCS 4〜6歳 レベルⅡ",
    "target": "脳性麻痺(4〜6歳)",
    "value": "椅子に座り両手が自由。床・椅子から立つには安定した面を押す／引く必要がある。屋内と屋外の平坦な短距離は手に持つ移動器具なしで歩行。階段は手すりを持って昇降、走る・跳ぶはできない",
    "exam": "58-am-12(5歳6か月、歩行補助具なしで屋外歩行可、階段昇降は手すり必要=レベルⅡが正答。選択肢Ⅰ〜Ⅴ)",
    "q": [
     "58-am-12"
    ],
    "note": "確認済み[S13]",
    "conflict": false,
    "sources": [
     {
      "label": "S13",
      "url": "https://canchild.ca/wp-content/uploads/2025/03/GMFCS-ER_English-ACCESS.pdf"
     }
    ]
   },
   {
    "item": "GMFCS 2〜4歳 レベルⅢ",
    "target": "脳性麻痺(2〜4歳)",
    "value": "床座位は割り座が多く、座位をとるのに介助が必要なことがある。腹這いまたは四つ這いが主な自力移動手段。屋内を手に持つ移動器具(歩行器)と大人の介助で短距離歩くことがある",
    "exam": "52-am-43(3歳6か月、ロフストランド杖などの手に持つ移動器具で歩行可能=レベルⅢが正答。誤答=Ⅰ・Ⅱ・Ⅳ・Ⅴ)",
    "q": [
     "52-am-43"
    ],
    "note": "確認済み[S13]。S13 の「手に持つ移動器具」の定義に杖・クラッチを含む",
    "conflict": false,
    "sources": [
     {
      "label": "S13",
      "url": "https://canchild.ca/wp-content/uploads/2025/03/GMFCS-ER_English-ACCESS.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-19",
  "review": "ai"
 },
 {
  "slug": "gowers-sign",
  "name": "Gowers徴候(登はん性起立)",
  "category": "検査法・徴候",
  "aliases": [
   "Gowers徴候",
   "Gowers sign",
   "Gowers' sign",
   "Gowers’ sign",
   "ガワーズ徴候",
   "登はん性起立",
   "登攀性起立",
   "Gowers' time"
  ],
  "rows": [
   {
    "item": "Gowers徴候(登はん性起立)とは",
    "target": "近位筋の筋力低下(Duchenne型筋ジストロフィー)",
    "value": "床から立ち上がるとき、手で床を押し、次に自分の脚(膝・大腿)を手で伝うようによじ登って立位になる動作。近位筋の筋力低下で起こる。Duchenne型筋ジストロフィーを疑う所見の1つ。",
    "exam": "60-am-44(正答:登はん性起立を示すのはDuchenne型筋ジストロフィー)／57-pm-23(正答:生じやすい疾患=Duchenne型筋ジストロフィー)／49回(床からの立ち上がりで登はん性起立=Duchenne型)／54-pm-6(選択肢のみ:Gowers徴候はDuchenne型の近位筋筋力低下)",
    "q": [
     "60-am-44",
     "57-pm-23",
     "54-pm-6"
    ],
    "note": "確認済み[S1]。Duchenne型以外でも近位筋の筋力低下で出うるかは、このカードの資料では確認していない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4966503/"
     }
    ]
   },
   {
    "item": "Duchenne型筋ジストロフィーの特徴",
    "target": "進行性の近位筋力低下",
    "value": "近位筋の筋力低下が下肢から出る。つま先歩き・動揺性歩行・脊柱前弯がみられ、走る・跳ぶ・階段昇降・床からの起立が難しくなる。腓腹部を中心に硬い仮性肥大がある。筋力低下は進行し、屈曲拘縮や脊柱側弯が生じる。大半が12歳までに車椅子が必要になる。軽い非進行性の知的障害が約3分の1にある。",
    "exam": "58-pm-34(正答:筋力低下が進行すればGowers徴候がみられる=Duchenne型筋ジストロフィー。誤答:知的障害はまれ、遠位筋から萎縮、発症初期から拘縮、5歳ごろまでに歩行不能)",
    "q": [
     "58-pm-34"
    ],
    "note": "確認済み[S1]。誤答の「遠位筋から萎縮」は近位筋優位に反し、「知的障害はまれ」は約3分の1にあるという記載に合わず、「5歳ごろまでに歩行不能」は12歳までに車椅子が必要という記載と合わない。「発症初期から拘縮」は資料に初期の記載がなく、判断できない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/19-小児科/遺伝性筋疾患/デュシェンヌ型筋ジストロフィーおよびベッカー型筋ジストロフィー"
     }
    ]
   },
   {
    "item": "仰臥位からの起立時間(Gowers' time)",
    "target": "運動機能の評価",
    "value": "Duchenne型筋ジストロフィーの診療ガイドラインは、歩行可能な小児の運動機能評価法の1つとして、仰臥位からの起立時間(Gowers' time)を、6分間歩行試験などとともに時間を測る検査として紹介している。ステロイドの効果のモニターにも、臥位から起立に要する時間などを定期的に評価するとよいとされる。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.neurology-jp.org/guidelinem/pdf/dmd_03.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "hand-finger-deformities",
  "name": "手指の変形(ボタン穴変形・Heberden結節ほか)",
  "category": "検査法・徴候",
  "aliases": [
   "ボタン穴変形",
   "ボタンホール変形",
   "スワンネック変形",
   "Heberden結節",
   "ヘバーデン結節",
   "Bouchard結節",
   "ブシャール結節",
   "フォーク状変形",
   "尺側偏位",
   "boutonniere",
   "swan neck"
  ],
  "rows": [
   {
    "item": "ボタン穴変形(boutonniere deformity)",
    "target": "PIP関節の伸筋腱(中央索)の障害による変形",
    "value": "PIP関節(指先から2番目の関節)が屈曲したまま伸びず、DIP関節(指先の関節)が過伸展する。原因は外傷(PIP関節背側の中央索の断裂など)や、関節リウマチなどによる中央索の弱化。",
    "exam": "58-am-10(自動ROM:PIP伸展−45°・DIP過伸展などの数値からボタン穴変形が正答。誤答:Z変形・鉤爪変形・Krukenberg変形・スワンネック変形)／49-pm-35(ボタンホール変形=PIP関節の伸筋腱断裂が正答。誤答:スワンネック=DIP屈筋腱断裂、槌指=MP関節屈筋腱断裂など)",
    "q": [
     "58-am-10",
     "49-pm-35"
    ],
    "note": "確認済み[S1]。58-am-10はPIPの伸展制限とDIPの過伸展という組み合わせから判断する問題。49-pm-35の他の選択肢(スワンネック・槌指・Volkmann拘縮・Dupuytren拘縮)の記述は本資料では確認していない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.orthoinfo.org/en/diseases--conditions/boutonniere-deformity/"
     }
    ]
   },
   {
    "item": "関節リウマチの手指の典型的な変形",
    "target": "関節リウマチ(RA)で見られる手の変形と合併症",
    "value": "MCP関節から伸筋腱が尺側へ滑脱し、指が尺側に偏位(尺側偏位)する変形が典型的で、スワンネック変形とボタン穴変形も同様に典型的。進行すると指が短くなったり関節が脱臼して強く変形することがあり、指の伸筋腱が断裂して手術が必要になることもある。",
    "exam": "58-pm-88(RAで起こりにくい変形:フォーク状変形が正答。誤答:オペラグラス変形・尺側偏位・スワンネック変形・ボタン穴変形)／51-am-34(RAに合併しやすいもの=指伸筋腱皮下断裂が正答)／49-pm-13(RA12年・突然指が伸展できない→障害されたのは総指伸筋)",
    "q": [
     "58-pm-88",
     "51-am-34",
     "49-pm-13"
    ],
    "note": "確認済み[S2][S3]。スワンネック変形の関節の形(どの関節が過伸展・屈曲か)と、オペラグラス変形については、本資料で確認できていない。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.msdmanuals.com/ja-jp/professional/06-筋骨格系疾患と結合組織疾患/関節疾患/関節リウマチ-ra"
     },
     {
      "label": "S3",
      "url": "https://www.joa.or.jp/public/sick/condition/rheumatoid_arthritis.html"
     }
    ]
   },
   {
    "item": "Heberden結節・Bouchard結節(変形性関節症)",
    "target": "手指の変形性関節症(一次性OA)の所見",
    "value": "Heberden結節=DIP関節の硬組織(骨性)の隆起。Bouchard結節=PIP関節の硬組織(骨性)の隆起。DIP・PIP関節は変形性関節症の好発部位で、母指CM関節は手で最も疼痛が生じやすい関節。DIP関節が腫れたり曲がったりし、痛みを伴うこともある。",
    "exam": "56-pm-86(一次性変形性関節症の手指所見:Heberden結節・Bouchard結節が正答。誤答:ボタン穴変形・スワンネック変形(関節リウマチ)、Charcot関節)／51-am-34(誤答選択肢:Heberden結節は関節リウマチの合併症ではなく変形性関節症)",
    "q": [
     "56-pm-86",
     "51-am-34"
    ],
    "note": "確認済み[S4][S5]。DIPはHeberden、PIPはBouchardと対で覚える。Charcot関節は本資料の対象外で未確認。",
    "conflict": false,
    "sources": [
     {
      "label": "S4",
      "url": "https://www.msdmanuals.com/ja-jp/professional/06-筋骨格系疾患と結合組織疾患/関節疾患/変形性関節症-oa"
     },
     {
      "label": "S5",
      "url": "https://www.jssh.or.jp/ippan/sikkan/pdf/4heba-den.pdf"
     }
    ]
   },
   {
    "item": "フォーク状変形(橈骨遠位端骨折)",
    "target": "Colles骨折などの手首の変形",
    "value": "手のひらをついて転んだ後、手首にフォークを伏せて置いたような変形が見られる。橈骨が手首のところ(遠位端)で折れる骨折(コレス骨折・スミス骨折)で、強い痛みと短時間での腫れを伴う。",
    "exam": "58-pm-88(RAで起こりにくい変形の正答:フォーク状変形。Colles骨折の変形)",
    "q": [
     "58-pm-88"
    ],
    "note": "確認済み[S6]。関節リウマチの変形ではない、という区別が出題ポイント。",
    "conflict": false,
    "sources": [
     {
      "label": "S6",
      "url": "https://www.joa.or.jp/public/sick/condition/distal_radius_fracture.html"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "hds-r",
  "name": "改訂長谷川式簡易知能評価スケール(HDS-R)",
  "category": "評価尺度",
  "aliases": [
   "HDS-R",
   "改訂長谷川式",
   "長谷川式"
  ],
  "rows": [
   {
    "item": "HDS-R 満点・構成",
    "target": "認知症のスクリーニング",
    "value": "30点満点。9項目(年齢・時間の見当識・場所の見当識・3単語の即時記銘と遅延再生・計算・数字の逆唱・物品記銘・言語流暢性)",
    "exam": "61-pm-81(正答=「数字を逆から言う」(数唱)と「知っている野菜の名前をできるだけ多く」(語の流暢性)。誤答=文章を書く／手の形を真似る／図版を見て答える=MMSE等の項目)／61-am-80(誤答:質問紙法ではない)／59-pm-81(誤答:日常記憶の検出に最適でない)／52-am-81(語の流暢性課題を含む検査=HDS-Rが正答。誤答=MMPI・MMSE・WCST・Rorschach)",
    "q": [
     "52-am-81",
     "59-pm-81",
     "61-am-80",
     "61-pm-81"
    ],
    "note": "確認済み[S4]。「文章を書く(文章書字)」「図形模写」はMMSEの項目であることも S4 で確認",
    "conflict": false,
    "sources": [
     {
      "label": "S4",
      "url": "https://www.jpn-geriat-soc.or.jp/tool/pdf/tool_02.pdf"
     }
    ]
   },
   {
    "item": "HDS-R カットオフ",
    "target": "認知症疑い",
    "value": "20点以下で認知症疑い(感度93%・特異度86%)",
    "exam": "出題の直接の数値はなし(HDS-Rの出題は構成項目)",
    "q": [],
    "note": "確認済み[S4]。S20 は「21/20」と記載し同じ区切り",
    "conflict": false,
    "sources": [
     {
      "label": "S4",
      "url": "https://www.jpn-geriat-soc.or.jp/tool/pdf/tool_02.pdf"
     },
     {
      "label": "S20",
      "url": "https://www.jstage.jst.go.jp/article/jamt/66/J-STAGE-2/66_17J2-3/_html/-char/ja"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-19",
  "review": "ai"
 },
 {
  "slug": "head-ct-stroke",
  "name": "頭部CT(脳卒中の画像診断)",
  "category": "臨床検査",
  "aliases": [
   "頭部CT",
   "単純CT",
   "頭部単純CT",
   "CT像",
   "低吸収域",
   "高吸収域",
   "early CT sign",
   "頭部X線CT"
  ],
  "rows": [
   {
    "item": "脳梗塞(超急性期)とCT",
    "target": "虚血性脳卒中の画像診断",
    "value": "CT所見は前方循環の大きな梗塞でも最初の数時間は軽微なことがあり、中等度から大きな梗塞は虚血から6〜12時間以内に低吸収域として描出される。小さな梗塞(ラクナ)はMRIでしか描出されないことがある。早期CT所見:レンズ核境界の不鮮明化、皮質・髄質境界の消失、脳溝の消失、淡い低吸収域。",
    "exam": "61-pm-11(発症1時間・頭部単純CTに異常なし→次に行う検査=MRI(正答))／58-am-90(発症2時間の脳梗塞の典型画像=拡散強調像の高信号(正答)。誤答:単純CTの高吸収域・低吸収域)",
    "q": [
     "61-pm-11",
     "58-am-90"
    ],
    "note": "確認済み[S1][S2]。58-pm-77(低吸収域=脳梗塞慢性期)は慢性期の記載が資料になく未確認。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-神経疾患/脳卒中/虚血性脳卒中"
     },
     {
      "label": "S2",
      "url": "https://www.jsts.gr.jp/img/smanual.pdf"
     }
    ]
   },
   {
    "item": "くも膜下出血とCT",
    "target": "くも膜下出血の診断",
    "value": "発症6時間以内に単純CTを行えば感度は非常に高い。臨床的に疑われるのに画像で確認できない場合、またはCTをすぐ行えない場合は腰椎穿刺を行う。確定後は従来の脳血管造影(代替はMRA・CTA)で原因を調べる。",
    "exam": "60-pm-91(早期診断で優先度が高い検査=頭部CT(正答)。誤答:腰椎穿刺・頭部X線・脳血管造影・脳血流シンチグラフィ)／54-pm-77(急性期の診断に最も有用=単純CT(正答)。誤答:MRI T1・T2強調像など)／59-pm-4(JCSⅢ-200・項部硬直→くも膜下出血(正答))",
    "q": [
     "60-pm-91",
     "54-pm-77",
     "59-pm-4"
    ],
    "note": "確認済み[S1]。腰椎穿刺・脳血管造影は『CTで確認できない場合・確定後』の位置づけ。MRIのT1・T2像が誤答になる理由は資料で未確認。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-神経疾患/脳卒中/くも膜下出血-sah"
     }
    ]
   },
   {
    "item": "脳出血とCT",
    "target": "脳内出血の診断・好発部位",
    "value": "単純CTで出血は高吸収域としてみえる。多くは基底核・大脳皮質・小脳・橋に発生し、視床・基底核内にも多い。高血圧性出血の最多部位は被殻。通常は画像検査で確定診断できる。",
    "exam": "56-pm-90(出血部位=視床(正答))／59-am-3(入浴中の意識障害と左片麻痺→脳出血(正答)。誤答:慢性硬膜下血腫・くも膜下出血・脳梗塞・脳挫傷)／52-pm-76(発症6時間の頭部CT→被殻出血(正答))／54-am-6(運動麻痺なし・ふらつきの脳出血=小脳出血)",
    "q": [
     "56-pm-90",
     "59-am-3",
     "52-pm-76",
     "54-am-6"
    ],
    "note": "確認済み[S1]。図は見ていないため各設問の出血部位は国試の正答記録による。症状と部位の対応(視床・小脳)は資料で未確認。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-神経疾患/脳卒中/脳内出血"
     }
    ]
   },
   {
    "item": "小脳・脳幹のCTの限界",
    "target": "後頭蓋窩の病変の画像診断",
    "value": "後頭蓋窩・脳幹のCT画像は骨によるストリークアーチファクトで損なわれやすい。小脳・脳幹の梗塞は低吸収域が明らかでないことがある。MRIはCTより高い分解能で神経系の構造を描出できる。",
    "exam": "61-am-86(CTとMRIの比較:正答『頭部CTは短時間で撮影できる』。誤答:被ばくしない・脳幹部の病巣がわかりやすい・脳出血の診断に有効でない・急性期脳梗塞の診断に有用)",
    "q": [
     "61-am-86"
    ],
    "note": "確認済み[S1][S2]。『CTは短時間で撮影できる』『CTは被ばくする』は引用資料に記載がなく未確認(MSDにCTが迅速との文は見つからなかった)。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://msdmanuals.com/ja-jp/%E3%83%97%E3%83%AD%E3%83%95%E3%82%A7%E3%83%83%E3%82%B7%E3%83%A7%E3%83%8A%E3%83%AB/07-%E7%A5%9E%E7%B5%8C%E7%96%BE%E6%82%A3/%E7%A5%9E%E7%B5%8C%E7%B3%BB%E3%81%AE%E6%A4%9C%E6%9F%BB%E3%81%8A%E3%82%88%E3%81%B3%E6%89%8B%E6%8A%80/%E7%A5%9E%E7%B5%8C%E7%96%BE%E6%82%A3%E3%81%AB%E3%81%8A%E3%81%91%E3%82%8Bmri"
     },
     {
      "label": "S2",
      "url": "https://www.jsts.gr.jp/img/smanual.pdf"
     }
    ]
   },
   {
    "item": "静注血栓溶解療法の前の画像",
    "target": "超急性期脳梗塞での画像の使い方",
    "value": "単純CTまたはMRIで頭蓋内出血を除外し、早期虚血性変化の程度を評価する(推奨A・エビデンス高)。広範な早期虚血性変化がある患者には静注血栓溶解療法を行わないよう勧められる(推奨D・高)。必要最低限の画像診断に留め、時間を浪費しない(推奨A・低)。",
    "exam": "出題は直接なし(参考。61-pm-11の流れに関連)",
    "q": [],
    "note": "確認済み[S1]。日本脳卒中学会の適正治療指針 第三版 2023年9月追補。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jsts.gr.jp/img/rt-pa03_supple.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "head-mri-stroke",
  "name": "頭部MRI(拡散強調像・FLAIR・MRA)",
  "category": "臨床検査",
  "aliases": [
   "頭部MRI",
   "拡散強調像",
   "拡散強調画像",
   "DWI",
   "FLAIR",
   "MRA",
   "T2*強調像",
   "MR血管撮影"
  ],
  "rows": [
   {
    "item": "拡散強調画像(DWI)",
    "target": "超急性期の脳梗塞の検出",
    "value": "虚血性脳卒中を迅速・早期に検出でき、早期の虚血に対する感度が高い。CTの直後に撮影できる。CTで確認できないときは通常DWIで虚血性脳卒中を同定できる。小さな梗塞(ラクナ)はMRIでしか描出されないことがある。",
    "exam": "61-pm-11(CT異常なし→MRI(正答))／58-am-90(発症2時間の脳梗塞=拡散強調像の高信号域(正答))／55-pm-85(DWIが最も有用=脳梗塞急性期(正答))／59-am-86(正答:拡散強調画像は急性期脳梗塞の診断に有用)／51-am-94(発症3時間のDWI→脳梗塞(正))／54-am-89(『DWIは陳旧性梗塞の検索に用いる』は誤り)",
    "q": [
     "61-pm-11",
     "58-am-90",
     "55-pm-85",
     "59-am-86",
     "51-am-94",
     "54-am-89"
    ],
    "note": "確認済み[S1][S2]。DWIが『高信号』に描出されること、陳旧性梗塞には向かないことは引用資料に直接の文がなく、国試の記録による(早期の虚血に感度が高いという記載とは矛盾しない)。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://msdmanuals.com/ja-jp/%E3%83%97%E3%83%AD%E3%83%95%E3%82%A7%E3%83%83%E3%82%B7%E3%83%A7%E3%83%8A%E3%83%AB/07-%E7%A5%9E%E7%B5%8C%E7%96%BE%E6%82%A3/%E7%A5%9E%E7%B5%8C%E7%B3%BB%E3%81%AE%E6%A4%9C%E6%9F%BB%E3%81%8A%E3%82%88%E3%81%B3%E6%89%8B%E6%8A%80/%E7%A5%9E%E7%B5%8C%E7%96%BE%E6%82%A3%E3%81%AB%E3%81%8A%E3%81%91%E3%82%8Bmri"
     },
     {
      "label": "S2",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-神経疾患/脳卒中/虚血性脳卒中"
     }
    ]
   },
   {
    "item": "DWI/FLAIRミスマッチ",
    "target": "発症時刻不明の脳梗塞",
    "value": "発症時刻が不明でも、頭部MRIのDWIの虚血性変化がFLAIRで明瞭でない場合は、発症4.5時間以内の可能性が高い。このような症例への静注血栓溶解療法は考慮してもよい(C1・エビデンス中)。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jsts.gr.jp/img/rt-pa03_supple.pdf"
     }
    ]
   },
   {
    "item": "FLAIR像",
    "target": "髄液と脱髄病変・くも膜下出血の描出",
    "value": "FLAIRでは髄液は暗く、脱髄病変は白く見える。FLAIRでくも膜下出血を評価できる(日本脳卒中学会の研修到達目標)。",
    "exam": "60-pm-86(多発性硬化症でMRIが診断に有用(正答))／58-am-3(82歳女性・歩行障害のFLAIR像:正答は多発性脳梗塞)／57-pm-14(多系統萎縮症のFLAIR像)",
    "q": [
     "60-pm-86",
     "58-am-3"
    ],
    "note": "確認済み[S1][S2]。多発性脳梗塞・多系統萎縮症のFLAIR所見、T2強調像で髄液が高信号になることは引用資料で未確認。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://msdmanuals.com/ja-jp/%E3%83%97%E3%83%AD%E3%83%95%E3%82%A7%E3%83%83%E3%82%B7%E3%83%A7%E3%83%8A%E3%83%AB/07-%E7%A5%9E%E7%B5%8C%E7%96%BE%E6%82%A3/%E7%A5%9E%E7%B5%8C%E7%B3%BB%E3%81%AE%E6%A4%9C%E6%9F%BB%E3%81%8A%E3%82%88%E3%81%B3%E6%89%8B%E6%8A%80/%E7%A5%9E%E7%B5%8C%E7%96%BE%E6%82%A3%E3%81%AB%E3%81%8A%E3%81%91%E3%82%8Bmri"
     },
     {
      "label": "S2",
      "url": "https://www.jsts.gr.jp/img/smanual.pdf"
     }
    ]
   },
   {
    "item": "出血の評価(T2*画像など)",
    "target": "MRIでの脳出血の評価",
    "value": "T2*画像で脳出血を評価できる。T1・T2・FLAIR画像での脳出血の経時変化も到達目標に挙げられている(日本脳卒中学会の研修マニュアル)。",
    "exam": "54-am-89(正しい記述『T2*強調像は出血病変の検索に用いる』が誤答選択肢側)／55-pm-85(DWIが最も有用でないもの:頭蓋底骨折・脳室内出血・脳出血急性期・くも膜下出血急性期)",
    "q": [
     "54-am-89",
     "55-pm-85"
    ],
    "note": "確認済み[S1]。研修の到達目標としての記載で、信号の見え方の詳細は資料にない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jsts.gr.jp/img/smanual.pdf"
     }
    ]
   },
   {
    "item": "MRA・CTAによる血管評価",
    "target": "主幹動脈閉塞・脳動脈瘤の評価",
    "value": "MR血管撮影で主幹動脈閉塞性病変や脳動脈瘤を評価できる。後方循環では頸動脈超音波よりMRA・CTAの方が良好な画像が得られる。CTA・MRAは通常緊急に行うが、適応があればtPA静注を遅らせない。",
    "exam": "54-am-14(MRI・MRAから閉塞血管=右中大脳動脈(正答))／54-am-89(正しい記述『頸部MRAは頸動脈狭窄の検索に用いる』が誤答選択肢側)／第49回pm-3(頭部MRAで閉塞=右内頸動脈)",
    "q": [
     "54-am-14",
     "54-am-89"
    ],
    "note": "確認済み[S1][S2]。頸動脈狭窄の検索にMRAを使う点は直接の記載なし(後方循環でMRA・CTAが良好という記載のみ)。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-神経疾患/脳卒中/虚血性脳卒中"
     },
     {
      "label": "S2",
      "url": "https://www.jsts.gr.jp/img/smanual.pdf"
     }
    ]
   },
   {
    "item": "MRIの利点と禁忌",
    "target": "CTとの使い分け・検査前の確認",
    "value": "MRIはCTより高い分解能で神経系の構造を描出でき、CTが骨のアーチファクトで損なわれやすい後頭蓋窩・脳幹に向く。禁忌・注意:ペースメーカー植込み、過去6週間以内の心臓または頸動脈ステント留置、強磁性体の動脈瘤クリップなど磁場で加熱・移動しうる金属。",
    "exam": "61-am-86(CTとMRIの比較問題の背景)",
    "q": [
     "61-am-86"
    ],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://msdmanuals.com/ja-jp/%E3%83%97%E3%83%AD%E3%83%95%E3%82%A7%E3%83%83%E3%82%B7%E3%83%A7%E3%83%8A%E3%83%AB/07-%E7%A5%9E%E7%B5%8C%E7%96%BE%E6%82%A3/%E7%A5%9E%E7%B5%8C%E7%B3%BB%E3%81%AE%E6%A4%9C%E6%9F%BB%E3%81%8A%E3%82%88%E3%81%B3%E6%89%8B%E6%8A%80/%E7%A5%9E%E7%B5%8C%E7%96%BE%E6%82%A3%E3%81%AB%E3%81%8A%E3%81%91%E3%82%8Bmri"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "higher-brain-signs",
  "name": "高次脳機能障害の主要症候(半側空間無視・Gerstmann・純粋失読・診断基準)",
  "category": "検査法・徴候",
  "aliases": [
   "高次脳機能障害",
   "半側空間無視",
   "病態失認",
   "相貌失認",
   "Gerstmann症候群",
   "ゲルストマン症候群",
   "純粋失読",
   "失算",
   "手指失認",
   "注意障害",
   "記憶障害",
   "遂行機能障害",
   "社会的行動障害",
   "BADS",
   "作話"
  ],
  "rows": [
   {
    "item": "半側空間無視",
    "target": "右半球(特に頭頂葉)損傷の症候",
    "value": "脳損傷の反対側の空間で刺激を見落とす。右半球損傷(特に頭頂葉)で左側の無視がしばしばみられる。同名半盲とは別(半盲だけなら視線を動かせば見える)。評価は線分2等分・線分抹消・絵の模写・自発画など。重度では身体が病巣側を向き、促しても無視側を見られない。",
    "exam": "50-am-5(右半球梗塞で出現しやすい症状=半側空間無視(正答))／50-am-6(車椅子駆動で廊下の左壁によくぶつかる=正答)／54-pm-20(誤答選択肢『左側の人や物にぶつかる』)",
    "q": [
     "50-am-5",
     "50-am-6",
     "54-pm-20"
    ],
    "note": "確認済み[S1][S2]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://mhlw-grants.niph.go.jp/system/files/report_pdf/%E9%AB%98%E6%AC%A1%E8%84%B3%E6%A9%9F%E8%83%BD%E9%9A%9C%E5%AE%B3%E3%82%AB%E3%82%99%E3%82%A4%E3%83%88%E3%82%99%E3%83%A9%E3%82%A4%E3%83%B320240828.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-%E7%A5%9E%E7%B5%8C%E7%96%BE%E6%82%A3/%E8%84%B3%E8%91%89%E3%81%AE%E6%A9%9F%E8%83%BD%E3%81%8A%E3%82%88%E3%81%B3%E6%A9%9F%E8%83%BD%E9%9A%9C%E5%AE%B3/%E5%A4%B1%E8%AA%8D"
     }
    ]
   },
   {
    "item": "Gerstmann症候群",
    "target": "優位半球の頭頂後頭領域の障害",
    "value": "手指失認・左右弁別障害・失算・失書の四徴からなる。責任病巣は左(優位)半球の角回を含む頭頂後頭領域とされる(Gerstmann 1940)。四徴が一つの症候群として共通の基盤をもつかには議論がある。",
    "exam": "50-am-84(頭頂葉病変で生じる症候=Gerstmann症候群(正答)。誤答:歩行失行・視覚失認・Anton症状・Parkinson症状)／51-am-83(Gerstmann症候群=失算(正)。誤答:健忘・失構音・遂行機能障害・半側空間無視)",
    "q": [
     "50-am-84",
     "51-am-83"
    ],
    "note": "確認済み[S1][S2]。学会発表要旨と症例報告の抄録による補助的な確認で、診療ガイドライン等の本文は見つからなかった。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/pacjpa/87/0/87_3C-010-PD/_pdf/-char/en"
     },
     {
      "label": "S2",
      "url": "https://www.jstage.jst.go.jp/article/apr/21/1/21_1_16/_article/-char/ja/"
     }
    ]
   },
   {
    "item": "純粋失読",
    "target": "失書を伴わない失読(後頭葉病変)",
    "value": "文字・単語とも読めず、自分で書いたものも読めない。1字ずつ読む(逐次読み)、文字数が多いほど困難になる。読めない文字を手指でなぞると読めることがある(なぞり読み)。読みに比べて書字は保たれる。古典型は左後頭葉内側と脳梁膨大部の病巣で、脳梁膨大部を含まない非古典型もある。",
    "exam": "58-pm-36(誤りの組合せ問題:『純粋失読―文字を指でなぞっても読めない』は誤答選択肢)",
    "q": [
     "58-pm-36"
    ],
    "note": "確認済み[S1]。正答は肢節運動失行で、失行・失語(伝導失語など)の各選択肢は既存の apraxia・aphasia-types を参照。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/neuropsychology/32/4/32_311/_pdf"
     }
    ]
   },
   {
    "item": "病態失認",
    "target": "右(非優位)半球頭頂葉の損傷",
    "value": "障害の存在への認識の欠如、または病識の欠如。しばしば右(非優位)半球の頭頂葉損傷(急性脳卒中・外傷性脳損傷など)に合併する。",
    "exam": "54-am-15(同じ症例の設問で病態失認)／51-pm-27(『病態失認・半側空間無視』は観念失行の説明として誤りの選択肢)",
    "q": [
     "54-am-15",
     "51-pm-27"
    ],
    "note": "確認済み[S1]。54-am-15の設問文は入力記録が要約のみ。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-%E7%A5%9E%E7%B5%8C%E7%96%BE%E6%82%A3/%E8%84%B3%E8%91%89%E3%81%AE%E6%A9%9F%E8%83%BD%E3%81%8A%E3%82%88%E3%81%B3%E6%A9%9F%E8%83%BD%E9%9A%9C%E5%AE%B3/%E5%A4%B1%E8%AA%8D"
     }
    ]
   },
   {
    "item": "相貌失認",
    "target": "下側頭葉(紡錘状回)の損傷",
    "value": "一般的な顔の特徴や物体は同定できるのに、親しい人の顔を同定できない。下側頭葉の損傷に伴い、多くは両側性の小さな病変で、特に紡錘状回にみられる。",
    "exam": "49-pm-55(相貌失認に関与する部位=紡錘状回)／54-pm-20(誤答選択肢『声を聞かないとわからない』)",
    "q": [
     "49-pm-55",
     "54-pm-20"
    ],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-%E7%A5%9E%E7%B5%8C%E7%96%BE%E6%82%A3/%E8%84%B3%E8%91%89%E3%81%AE%E6%A9%9F%E8%83%BD%E3%81%8A%E3%82%88%E3%81%B3%E6%A9%9F%E8%83%BD%E9%9A%9C%E5%AE%B3/%E5%A4%B1%E8%AA%8D"
     }
    ]
   },
   {
    "item": "高次脳機能障害の診断基準(行政)",
    "target": "診断・支援の対象",
    "value": "Ⅰ:脳の器質的病変の原因となる疾病・受傷があり、日常・社会生活の制約の主たる原因が記憶障害・注意障害・遂行機能障害・社会的行動障害などの認知障害。Ⅱ:MRI・CT・脳波などで器質的病変が確認できる。Ⅲ:先天性疾患・発達障害・周産期脳損傷などは除外。Ⅰ〜Ⅲをすべて満たし、急性期症状を脱した後に診断する。学術用語としては失語・失行・失認も含む。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。令和5年版の研究班提案の診断基準(旧診断基準の改訂案)。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://mhlw-grants.niph.go.jp/system/files/report_pdf/%E9%AB%98%E6%AC%A1%E8%84%B3%E6%A9%9F%E8%83%BD%E9%9A%9C%E5%AE%B3%E3%82%AB%E3%82%99%E3%82%A4%E3%83%88%E3%82%99%E3%83%A9%E3%82%A4%E3%83%B320240828.pdf"
     }
    ]
   },
   {
    "item": "注意障害",
    "target": "全般性注意障害",
    "value": "集中困難・注意散漫(ある刺激に焦点を当てにくく、他の刺激に注意を奪われやすい。評価:抹消・検出課題、Stroopテスト、心的統制課題)と、注意の持続・維持困難(長時間で成績が低下。評価:CPT、抹消課題)。",
    "exam": "51-am-28(料理中の電話に気付けない=注意の配分性障害(正)。誤答:選択性・持続性・転換性・方向性)",
    "q": [
     "51-am-28"
    ],
    "note": "確認済み[S1]。資料は『全般性注意障害』として集中困難と持続困難を挙げ、『配分性』の記載は引用範囲になく未確認。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://mhlw-grants.niph.go.jp/system/files/report_pdf/%E9%AB%98%E6%AC%A1%E8%84%B3%E6%A9%9F%E8%83%BD%E9%9A%9C%E5%AE%B3%E3%82%AB%E3%82%99%E3%82%A4%E3%83%88%E3%82%99%E3%83%A9%E3%82%A4%E3%83%B320240828.pdf"
     }
    ]
   },
   {
    "item": "記憶障害",
    "target": "前向健忘・逆向健忘",
    "value": "前向健忘=発症後に新しい情報やエピソードを覚えられない。逆向健忘=発症以前の記憶の喪失。作話・失見当識を伴うことがある。評価:WMS-R・RBMT・S-PA・Rey聴覚的言語学習検査・Rey-Osterrieth複雑図形・Benton視覚記銘検査など。",
    "exam": "54-pm-20(SAH術後3か月:毎日初対面のように挨拶する=記銘力障害(正答))",
    "q": [
     "54-pm-20"
    ],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://mhlw-grants.niph.go.jp/system/files/report_pdf/%E9%AB%98%E6%AC%A1%E8%84%B3%E6%A9%9F%E8%83%BD%E9%9A%9C%E5%AE%B3%E3%82%AB%E3%82%99%E3%82%A4%E3%83%88%E3%82%99%E3%83%A9%E3%82%A4%E3%83%B320240828.pdf"
     }
    ]
   },
   {
    "item": "遂行機能障害・社会的行動障害",
    "target": "前頭葉機能・行動面の障害",
    "value": "遂行機能障害=目的に適った行動の計画障害と実行障害(自己モニター・修正の障害)。評価にBADS(遂行機能障害症候群の行動評価)など。社会的行動障害=意欲・発動性の低下、情動コントロールの障害、対人関係の障害、依存的行動、固執。",
    "exam": "51-am-83(Gerstmann症候群の誤答選択肢に遂行機能障害)",
    "q": [],
    "note": "確認済み[S1]。BADSの点数・カットオフは資料で未確認。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://mhlw-grants.niph.go.jp/system/files/report_pdf/%E9%AB%98%E6%AC%A1%E8%84%B3%E6%A9%9F%E8%83%BD%E9%9A%9C%E5%AE%B3%E3%82%AB%E3%82%99%E3%82%A4%E3%83%88%E3%82%99%E3%83%A9%E3%82%A4%E3%83%B320240828.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "hoehn-yahr",
  "name": "Hoehn-Yahr重症度分類",
  "category": "評価尺度",
  "aliases": [
   "Hoehn-Yahr",
   "Hoehn&Yahr",
   "ホーエン・ヤール",
   "Hoehn and Yahr",
   "Hoehn & Yahr",
   "ホーン・ヤール"
  ],
  "rows": [
   {
    "item": "Hoehn-Yahr 全体",
    "target": "パーキンソン病の重症度",
    "value": "0度=パーキンソニズムなし／1度=一側性／2度=両側性／3度=軽〜中等度で姿勢反射障害あり、日常生活に介助不要／4度=高度障害だが歩行は介助なしにどうにか可能／5度=介助なしにはベッドまたは車椅子生活",
    "exam": "52-am-10(歩行中の方向転換で不安定、姿勢反射障害あり、日常生活はほぼ自立=ステージⅢが正答。誤答=Ⅰ・Ⅱ・Ⅳ・Ⅴ)／58-pm-14(安静時振戦・筋強剛・歩行時のバランス低下=ステージⅢが正答)／58-am-15・60-pm-11(ステージⅢ。すくみ足・小刻み歩行・突進。聴覚刺激・等間隔の線を踏む歩行が正答)／55-am-15(ステージⅣ。広いところで歩くが正答)",
    "q": [
     "52-am-10",
     "55-am-15",
     "58-am-15",
     "58-pm-14",
     "60-pm-11"
    ],
    "note": "確認済み[S6]",
    "conflict": false,
    "sources": [
     {
      "label": "S6",
      "url": "https://www.nanbyou.or.jp/entry/314"
     }
    ]
   },
   {
    "item": "パーキンソン病 生活機能障害度",
    "target": "日常生活の介助量",
    "value": "1度=日常生活・通院にほとんど介助を要しない／2度=部分的介助を要する／3度=全面的介助を要し、独立では歩行・起立不能。指定難病の対象=Hoehn-Yahr 3度以上かつ生活機能障害度2度以上",
    "exam": "出題なし(参考)",
    "q": [],
    "note": "確認済み[S6]",
    "conflict": false,
    "sources": [
     {
      "label": "S6",
      "url": "https://www.nanbyou.or.jp/entry/314"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-19",
  "review": "ai"
 },
 {
  "slug": "iadl-lawton",
  "name": "IADL(手段的ADL・Lawton)",
  "category": "評価尺度",
  "aliases": [
   "IADL",
   "手段的ADL",
   "手段的日常生活動作",
   "Lawton",
   "ロートン",
   "Lawton IADL",
   "instrumental activities of daily living"
  ],
  "rows": [
   {
    "item": "IADL に含まれる行為(Lawton IADL 8項目)",
    "target": "地域生活に必要な、より複雑な活動",
    "value": "電話の使用／買い物／食事の準備／家事(掃除などの家屋維持)／洗濯／交通機関の利用(バスなど)／服薬の管理／金銭(家計)の管理の8項目。",
    "exam": "59-pm-25(正答:家屋維持・家計管理)／58-am-24(正答:食事の準備)／56-pm-31(正答:家計管理・洗濯)／53-pm-41(正答:掃除をする・電話をかける)／49回(IADL=買い物・洗濯)／51回(IADL=バスの利用)",
    "q": [
     "59-pm-25",
     "58-am-24",
     "56-pm-31",
     "53-pm-41"
    ],
    "note": "確認済み[S1]。Lawtonらが1969年に、地域で暮らすために必要なより複雑なADLを測る目的で作った尺度。国試の「掃除」「家屋維持」は家事の項目、「バスの利用」は交通機関の利用に当たる。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10001756/"
     },
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10905928/"
     }
    ]
   },
   {
    "item": "基本的ADLの項目(Katz)と、国試で誤答になった行為",
    "target": "IADLではない行為の見分け",
    "value": "Katz指数の基本的ADLは、入浴・更衣・トイレ動作・移乗・排泄コントロール(失禁)・食事の6領域。",
    "exam": "58-am-24(誤答:洗顔・靴下・寝返り・シャワー)／56-pm-31(誤答:更衣・入浴・排泄)／59-pm-25(誤答:意思疎通・階段昇降・排泄コントロール)／53-pm-41(誤答:階段昇降・髪を洗う・髭を剃る)／49回(誤答:移乗・整容・排泄)／51回(誤答:化粧・義足の装着・歩行器歩行・車椅子からベッドへの移乗)",
    "q": [
     "58-am-24",
     "56-pm-31",
     "59-pm-25",
     "53-pm-41"
    ],
    "note": "確認済み[S2](Katzの6領域)。整容・階段昇降・寝返り・歩行などはKatzの6領域にないが、国試ではIADLではなく基本的な動作側の誤答として出ている。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10905928/"
     }
    ]
   },
   {
    "item": "Lawton IADL 採点",
    "target": "IADLの自立度",
    "value": "8項目それぞれを、できない(部分的にできる)=0、できる=1で採点し、合計0〜8点。高いほど自立。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。8項目すべてが0/1で、合計の最大は8点。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10001756/"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "icf",
  "name": "国際生活機能分類(ICF)",
  "category": "評価尺度",
  "aliases": [
   "ICF",
   "国際生活機能分類"
  ],
  "rows": [
   {
    "item": "ICF 共通評価スケール",
    "target": "問題の程度(心身機能・身体構造・活動と参加・環境因子)",
    "value": "0=問題なし(0〜4%)／1=軽度(5〜24%)／2=中等度(25〜49%)／3=重度(50〜95%)／4=完全(96〜100%)／8=詳細不明／9=非該当",
    "exam": "58-am-21(ICFの評価点の記述の正誤)の前提",
    "q": [
     "58-am-21"
    ],
    "note": "確認済み[S17](ICF日本語版)",
    "conflict": false,
    "sources": [
     {
      "label": "S17",
      "url": "https://www.mhlw.go.jp/shingi/2007/03/dl/s0327-5l.pdf"
     }
    ]
   },
   {
    "item": "ICF 活動と参加:第1評価点",
    "target": "活動と参加",
    "value": "第1評価点=実行状況(現在の環境における問題・困難度:performance)",
    "exam": "58-am-21(正答:活動と参加の第一評価点は実行状況での困難度)",
    "q": [
     "58-am-21"
    ],
    "note": "確認済み[S17]",
    "conflict": false,
    "sources": [
     {
      "label": "S17",
      "url": "https://www.mhlw.go.jp/shingi/2007/03/dl/s0327-5l.pdf"
     }
    ]
   },
   {
    "item": "ICF 活動と参加:第2評価点",
    "target": "活動と参加",
    "value": "第2評価点=能力(支援なし/介助なしでの制限)。第3評価点=能力(支援あり)。第4評価点=実行状況(支援なし)",
    "exam": "58-am-21(誤答:「活動と参加の第二評価点=支援ありでの能力」→支援なしの能力が正しい)",
    "q": [
     "58-am-21"
    ],
    "note": "確認済み[S17](実行状況・能力(支援なし)・能力(支援あり)の3つの評価を厚労省資料で確認)。★第4評価点(支援なしでの実行状況)の記載は検索要約のみで、本文では確認できず",
    "conflict": true,
    "sources": [
     {
      "label": "S17",
      "url": "https://www.mhlw.go.jp/shingi/2007/03/dl/s0327-5l.pdf"
     }
    ]
   },
   {
    "item": "ICF 心身機能:第1評価点",
    "target": "心身機能",
    "value": "第1評価点=機能障害の程度や大きさ(否定的スケール)",
    "exam": "58-am-21(誤答:「心身機能の第一評価点=障害の性質」→障害の程度が正しい)",
    "q": [
     "58-am-21"
    ],
    "note": "確認済み[S17]",
    "conflict": false,
    "sources": [
     {
      "label": "S17",
      "url": "https://www.mhlw.go.jp/shingi/2007/03/dl/s0327-5l.pdf"
     }
    ]
   },
   {
    "item": "ICF 身体構造:第1・第2評価点",
    "target": "身体構造",
    "value": "第1評価点=構造障害の程度や大きさ。第2評価点=変化の性状(0=変化なし、1=全欠損、2=部分的欠損、3=付加的な部分、4=異常な大きさ、5=不連続、6=位置の変異、7=構造上の質的変化)",
    "exam": "58-am-21(誤答:「身体構造の第二評価点=部位」→変化の性状が正しい)",
    "q": [
     "58-am-21"
    ],
    "note": "確認済み[S17](第2評価点=変化の性状。「部位」は第2評価点ではない)",
    "conflict": false,
    "sources": [
     {
      "label": "S17",
      "url": "https://www.mhlw.go.jp/shingi/2007/03/dl/s0327-5l.pdf"
     }
    ]
   },
   {
    "item": "ICF 環境因子の「+」記号",
    "target": "環境因子",
    "value": "阻害因子と促進因子の程度を示す。促進因子は小数点を「+」に置き換えて表す",
    "exam": "58-am-21(誤答:「環境因子の+記号=阻害因子」→促進因子が正しい)",
    "q": [
     "58-am-21"
    ],
    "note": "確認済み[S17]",
    "conflict": false,
    "sources": [
     {
      "label": "S17",
      "url": "https://www.mhlw.go.jp/shingi/2007/03/dl/s0327-5l.pdf"
     }
    ]
   },
   {
    "item": "ICFの評価点",
    "target": "ICFの評価尺度",
    "value": "共通評価点: 0=問題なし、1=軽度、2=中等度、3=重度、4=完全な問題、8=詳細不明、9=非該当。心身機能の第一評価点=機能障害の程度や大きさ。身体構造の第一評価点=構造障害の程度や大きさ、第二評価点=構造の変化の性質（0=変化なし、1=全欠損、2=部分的欠損、3=付加的な部分、4=異常な大きさ、5=不連続、6=位置の変異、7=質的変化、8=詳細不明、9=非該当）。活動と参加の第一評価点=実行状況（現在の環境における問題）、能力=介助なしでの制限。環境因子=阻害因子と促進因子それぞれの程度（促進は「+」）",
    "exam": "55-am-22（正答: 身体構造の第二評価点=各身体部位における変化の性質／誤答: 活動と参加の能力の評価点=促進あるいは阻害する程度、環境因子の第一評価点=個人の遂行能力、身体構造の第一評価点=機能障害の程度や大きさ、心身機能の第一評価点=構造障害の程度や大きさ）／56-pm-21（正答: 各構成要素は相互に関連、活動と参加の第一評価点は実行状況／誤答: 障害を有した人のみが対象、ICFコアセットでは全コードを評価、ライフスタイルは環境因子の1つ）",
    "q": [
     "55-am-22",
     "56-pm-21"
    ],
    "note": "確認済み(公式): 厚労省「国際生活機能分類」日本語版（dinf掲載）https://www.dinf.ne.jp/doc/japanese/intl/icf/icf.html の表3「評価点」を読了。55-am-22の誤答4つは、公式の記載と照らして誤りと確認（促進・阻害は環境因子、遂行能力=実行状況、機能障害=心身機能、構造障害=身体構造）。活動と参加の評価点基準（暫定案）は https://www.mhlw.go.jp/shingi/2007/03/dl/s0327-5l.pdf （検索ヒット、未読）。2026-11-19",
    "conflict": false,
    "sources": [
     {
      "label": "資料1",
      "url": "https://www.dinf.ne.jp/doc/japanese/intl/icf/icf.html"
     },
     {
      "label": "資料2",
      "url": "https://www.mhlw.go.jp/shingi/2007/03/dl/s0327-5l.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-19",
  "review": "ai"
 },
 {
  "slug": "icu-mobilization",
  "name": "ICU・急性期の離床の開始・中止基準",
  "category": "リスク管理",
  "aliases": [
   "離床の開始基準",
   "早期離床",
   "RASS"
  ],
  "rows": [
   {
    "item": "離床の開始基準:RASS",
    "target": "ICU・急性期の離床",
    "value": "−2≦RASS≦＋1、かつ30分以内に鎮静が必要な不穏がない。−3以下(RASS≦−3)は重篤な覚醒障害、＋2以上(RASS≧2)は過度の興奮で、早期離床を原則行わない",
    "exam": "59-pm-17(脳梗塞・急性発症2日目:選択肢「RASS −3」は積極的離床の条件に当たらず誤答)／60-pm-10(食道癌術後ICU:選択肢「RASS −3である」は誤答)",
    "q": [
     "59-pm-17",
     "60-pm-10"
    ],
    "note": "確認済み[S8](表1・表2)",
    "conflict": false,
    "sources": [
     {
      "label": "S8",
      "url": "https://www.jsicm.org/pdf/soki_riha_1707.pdf"
     }
    ]
   },
   {
    "item": "離床の開始基準:呼吸・循環",
    "target": "ICU・急性期の離床",
    "value": "呼吸回数<35/min／SaO₂≧90%／FiO₂<0.6／PEEP<10 cmH₂O／心拍数50〜120/min(一定時間持続)／平均血圧(MAP)≧65 mmHg／疼痛=NRS≦3またはVAS≦3(BPS≦5・CPOT≦2)",
    "exam": "59-pm-17(正答=心拍数80/分・平均血圧65 mmHg以上。誤答=呼吸数40/分・神経症状の増悪・RASS−3)／60-pm-10(正答=平均動脈圧80 mmHg。誤答=NRS8・心拍数120/分・SOFA前日より4点増加・RASS−3)",
    "q": [
     "59-pm-17",
     "60-pm-10"
    ],
    "note": "確認済み[S8](表2) ★60-pm-10 は誤答とされた「心拍数120/分」が S8 の表2では基準「50〜120/min」の範囲に含まれる。正答が平均動脈圧80のみとなる根拠は S8 では確認できず、食い違いの可能性(別の基準・版の違いは未確認)",
    "conflict": true,
    "sources": [
     {
      "label": "S8",
      "url": "https://www.jsicm.org/pdf/soki_riha_1707.pdf"
     }
    ]
   },
   {
    "item": "離床の開始基準:疼痛 NRS",
    "target": "離床の判断",
    "value": "NRS≦3(またはVAS≦3)が開始基準。NRS8は基準外",
    "exam": "60-pm-10(誤答:「疼痛がNRS 8」)／61-am-20(TKA術後3日・体動時NRS 6点=問題文)",
    "q": [
     "60-pm-10",
     "61-am-20"
    ],
    "note": "確認済み[S8](NRS≦3)。61-am-20 の NRS6 は問題文のみ",
    "conflict": false,
    "sources": [
     {
      "label": "S6",
      "url": "https://www.nanbyou.or.jp/entry/314"
     },
     {
      "label": "S8",
      "url": "https://www.jsicm.org/pdf/soki_riha_1707.pdf"
     }
    ]
   },
   {
    "item": "発熱・体温",
    "target": "運動・離床の可否",
    "value": "急性全身性疾患または発熱=運動療法の絶対的禁忌(心リハ)。大動脈解離の開始: 38.5℃以上の発熱がない。大血管術後の中止: 37.5℃以上",
    "exam": "58-am-83 誤答選択肢「体温38.6℃」／61-am-41 誤答選択肢「体温38.8℃」／54-am-19 問題文 体温37.5℃(COPD急性増悪・人工呼吸管理)／56-am-46 誤答選択肢「体温37.0℃」(糖尿病の中止基準)",
    "q": [
     "54-am-19",
     "56-am-46",
     "58-am-83",
     "61-am-41"
    ],
    "note": "確認済み(S1 表25／S2 表62・66, 2026-11-19)。37.0℃を中止とする基準は無く、誤答と整合",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2021/03/JCS2021_Makita.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2020/07/JCS2020_Ogino.pdf"
     }
    ]
   },
   {
    "item": "心拍数の開始・中止基準(ICU・脳卒中)",
    "target": "離床・早期リハ",
    "value": "ICU開始: HR 50〜120/分が一定時間持続。ICU中止: HR<40 または >130/分。脳卒中急性期: 心拍数に一定の見解なし、40/分未満の徐脈で中止が一般的、新たに急に生じた異常でなく他のバイタルが安定していれば継続可。心リハ中止: HR≤40/分",
    "exam": "59-pm-17 正答の1つ「心拍数80/分」／60-pm-10 誤答選択肢「心拍数120/分」／56-pm-2 誤答選択肢「心拍数105/分」(入院時102)／55-am-8 誤答選択肢「心拍数105/分」／56-am-46 誤答選択肢「脈拍数110/分」",
    "q": [
     "55-am-8",
     "56-am-46",
     "56-pm-2",
     "59-pm-17",
     "60-pm-10"
    ],
    "note": "確認済み(S3 Table2・4／S4 CQ2-4／S1 表25, 2026-11-19)。食い違い: 60-pm-10の「心拍数120/分」はICU開始基準(HR≥50または≤120)の範囲内に当たるが、国試では離床不可の誤答扱い(他の選択肢が正答の平均動脈圧80 mmHgのため単独の可否は未確定)",
    "conflict": true,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2021/03/JCS2021_Makita.pdf"
     },
     {
      "label": "S3",
      "url": "https://www.jstage.jst.go.jp/article/jsicm/24/2/24_24_255/_article/-char/ja"
     },
     {
      "label": "S4",
      "url": "https://jsts.gr.jp/img/acute_rehabilitation.pdf"
     }
    ]
   },
   {
    "item": "SpO2の基準(運動・離床)",
    "target": "運動の開始・中止、呼吸器疾患",
    "value": "心リハ中止: SpO2<90% または安静時から5%以上低下。ICU開始: SaO2≥90%。ICU中止: SpO2<88%(別表: 88〜90%または4%以上低下)。呼吸リハ(高強度負荷の適応): 運動時SpO2≥90%",
    "exam": "55-am-8 正答「SpO2 82%」(COPD、中止すべき状態)／58-am-83 正答「経皮的酸素飽和度94%」／59-am-49 誤答選択肢「有酸素運動はSpO2 60%を目標に実施」／61-am-41 誤答選択肢「SaO2 85%」／57-am-18 問題文 SpO2 96%／60-am-14 問題文 SpO2 95%(room air)",
    "q": [
     "55-am-8",
     "57-am-18",
     "58-am-83",
     "59-am-49",
     "60-am-14",
     "61-am-41"
    ],
    "note": "確認済み(S1 表25／S2 表62・63／S3 Table2・4・5／S16, 2026-11-19)。COPDなど呼吸疾患に固有の中止基準(呼吸リハビリテーションマニュアル)は一次資料を取得できず未確認。「SpO2 90%前後を維持」(間質性肺疾患)は呼吸疾患別資料では未確認",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2021/03/JCS2021_Makita.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2020/07/JCS2020_Ogino.pdf"
     },
     {
      "label": "S3",
      "url": "https://www.jstage.jst.go.jp/article/jsicm/24/2/24_24_255/_article/-char/ja"
     },
     {
      "label": "S16",
      "url": "https://www.jsrcr.jp/publish/file/rehabilitation_statement2018_v2.pdf"
     }
    ]
   },
   {
    "item": "呼吸数の基準",
    "target": "離床・バイタル・健常成人",
    "value": "ICU開始: 呼吸回数<35/分。ICU中止: <5/分 または >40/分。大血管術後の開始: 頻呼吸(呼吸回数30/分未満であること)。健常成人安静時の呼吸数の基準値は資料で未確認",
    "exam": "59-pm-17 誤答選択肢「呼吸数40/分」／61-am-41 誤答選択肢「呼吸数38回/分」／52-am-64 誤答選択肢「健常者の安静時呼吸数は25/分程度」(記録上は12〜20/分が正)／55-am-8 誤答選択肢「呼吸数22/分」／54-am-19 問題文 呼吸数26回/分・努力性呼吸／57-am-18 問題文 呼吸数19／60-am-14 問題文 呼吸数20",
    "q": [
     "52-am-64",
     "54-am-19",
     "55-am-8",
     "57-am-18",
     "59-pm-17",
     "60-am-14",
     "61-am-41"
    ],
    "note": "確認済み(ICU・大動脈の呼吸数: S3 Table2・4／S2 表62・63・65, 2026-11-19)。健常成人安静時 12〜20回/分は未確認(公式資料を取得できなかった)",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2020/07/JCS2020_Ogino.pdf"
     },
     {
      "label": "S3",
      "url": "https://www.jstage.jst.go.jp/article/jsicm/24/2/24_24_255/_article/-char/ja"
     }
    ]
   },
   {
    "item": "意識レベル・鎮静(RASS)",
    "target": "ICU・急性期の離床",
    "value": "開始: −2≦RASS≦1(かつ30分以内に鎮静が必要だった不穏がない)。中止: RASS≦−3、または鎮静薬の増量・新規投与が必要なRASS>2",
    "exam": "59-pm-17 誤答選択肢「RASS −3」／60-pm-10 誤答選択肢「RASS −3」／61-am-41 正答「RASS」(選択肢の数値はDBで欠落)",
    "q": [
     "59-pm-17",
     "60-pm-10",
     "61-am-41"
    ],
    "note": "確認済み(S3 Table2・5／S2 表62・63, 2026-11-19)",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2020/07/JCS2020_Ogino.pdf"
     },
     {
      "label": "S3",
      "url": "https://www.jstage.jst.go.jp/article/jsicm/24/2/24_24_255/_article/-char/ja"
     }
    ]
   },
   {
    "item": "疼痛(NRS)",
    "target": "ICU離床の開始",
    "value": "開始: NRS≦3 または VAS≦3(自己申告不能時はBPS≦5またはCPOT≦2)",
    "exam": "60-pm-10 誤答選択肢「疼痛がNRS 8である」",
    "q": [
     "60-pm-10"
    ],
    "note": "確認済み(S3 Table2, 2026-11-19)",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://www.jstage.jst.go.jp/article/jsicm/24/2/24_24_255/_article/-char/ja"
     }
    ]
   },
   {
    "item": "ICU離床・運動の開始基準(まとめ)",
    "target": "食道癌術後ICU・急性期脳梗塞",
    "value": "開始: RASS−2〜1／NRS≦3／呼吸回数<35／SaO2≧90%／FiO2<0.6／PEEP<10 cmH2O／HR 50〜120／MAP≧65 mmHg／昇圧剤の24時間以内の増量なし。中止: RR<5または>40、SpO2<88%、HR<40または>130、収縮期>180、MAP<65または>110 ほか",
    "exam": "60-pm-10「積極的に離床を行ってもよいのはどの場合か」: 正答=平均動脈圧80 mmHg。誤答選択肢=RASS−3・NRS 8・心拍数120/分・SOFA +4点",
    "q": [
     "60-pm-10"
    ],
    "note": "確認済み(S3 Table2〜5, 2026-11-19)。食い違い: 心拍数120/分は開始基準内、SOFAは基準なし",
    "conflict": true,
    "sources": [
     {
      "label": "S3",
      "url": "https://www.jstage.jst.go.jp/article/jsicm/24/2/24_24_255/_article/-char/ja"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-19",
  "review": "ai"
 },
 {
  "slug": "infection-precautions",
  "name": "感染予防策(標準予防策・感染経路別予防策)",
  "category": "リスク管理",
  "aliases": [
   "標準予防策",
   "スタンダードプリコーション",
   "接触予防策",
   "接触感染予防策",
   "飛沫予防策",
   "飛沫感染予防策",
   "空気予防策",
   "空気感染予防策",
   "感染経路別予防策",
   "ガウンテクニック",
   "手指衛生",
   "MRSA",
   "個人防護具",
   "Standard Precautions",
   "Contact Precautions",
   "Droplet Precautions",
   "Airborne Precautions"
  ],
  "rows": [
   {
    "item": "接触予防策: ガウン・手袋は退室前に病室内で脱いで廃棄",
    "target": "MRSAなど接触感染する菌の患者のケア",
    "value": "ガウン・手袋は入室時に着け、病室(患者の環境)を出る前に脱いで捨て、そのあとに手指衛生を行う。脱ぐときは衣服や皮膚が汚れた環境に触れないようにする。",
    "exam": "56-am-1(正答:ガウンは退室時に病室内で脱いで廃棄する。MRSA・個室の症例)",
    "q": [
     "56-am-1"
    ],
    "note": "確認済み[S1][S2]。S2(厚労省2007年資料)にも「退室時にはガウンを脱いで手指消毒」とある。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.cdc.gov/infection-control/media/pdfs/Guideline-Isolation-H.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.mhlw.go.jp/shingi/2007/03/dl/s0315-4f33.pdf"
     }
    ]
   },
   {
    "item": "手袋を外したあとも手指衛生が必要・手袋のままドアノブに触れない",
    "target": "接触予防策・標準予防策での手袋の扱い",
    "value": "手袋は退室前に外して捨てる。手袋を外したあとにも手指衛生を行う(手袋をしていても省略しない)。同じ手袋を複数の患者に使わず、洗って再使用もしない。",
    "exam": "56-am-1(誤答:退室時に手袋を装着したままドアノブに触れる/手袋を装着していれば手指消毒は不要)",
    "q": [
     "56-am-1"
    ],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.cdc.gov/infection-control/media/pdfs/Guideline-Isolation-H.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.mhlw.go.jp/shingi/2007/03/dl/s0315-4f33.pdf"
     }
    ]
   },
   {
    "item": "接触予防策の患者配置(個室・コホート)",
    "target": "MRSAなど多剤耐性菌の保菌・感染患者",
    "value": "個室が望ましい。個室が足りないときは、同じ病原体の患者を同室にする(コホート)か、感染対策担当者に相談して配置を決める。同室ではベッド間を約1m(CDCは3フィート)以上あけ、カーテンで仕切る。MRSAなど多剤耐性菌は、施設の感染対策チームが重要と判断したときに接触予防策の対象とし、継続的な伝播がある・急性期でリスクが高い・創をおおえないときなどに勧められる。",
    "exam": "56-am-1(MRSA・個室の症例。誤答:個室のドアは開放してはならない)／50-am-86(正答:MRSA=接触感染)",
    "q": [
     "56-am-1",
     "50-am-86"
    ],
    "note": "確認済み[S1][S2]。ドアを閉める要件が明記されているのは空気予防策の陰圧室(AIIR)で、接触予防策の項にはドア開放を禁じる記載は見つけられなかった[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.cdc.gov/infection-control/media/pdfs/Guideline-Isolation-H.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.mhlw.go.jp/shingi/2007/03/dl/s0315-4f33.pdf"
     }
    ]
   },
   {
    "item": "標準予防策: 手指衛生のタイミング・創傷皮膚に触れたとき",
    "target": "すべての患者のケア",
    "value": "手指衛生を行う場面: 患者に直接触れる前／血液・体液・排泄物・粘膜・傷のある皮膚・創傷被覆材に触れたあと／同じ患者でも汚れた部位から清潔な部位へ手が移る前／患者の健常な皮膚に触れたあと／患者のすぐ近くの物品に触れたあと／手袋を外したあと。",
    "exam": "56-pm-50(正答:創傷のある皮膚に触れてしまったときは、他の部位に触れる前に手洗いをする)",
    "q": [
     "56-pm-50"
    ],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.cdc.gov/infection-control/media/pdfs/Guideline-Isolation-H.pdf"
     }
    ]
   },
   {
    "item": "標準予防策の対象",
    "target": "すべての医療の場面",
    "value": "感染症の診断の有無にかかわらず、すべての患者に適用する。血液・体液・分泌物・排泄物(汗を除く)・傷のある皮膚・粘膜は、感染性をもちうるものとして扱う。",
    "exam": "56-pm-50(誤答:標準予防策は感染のある患者のみを対象とする)",
    "q": [
     "56-pm-50"
    ],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.cdc.gov/infection-control/media/pdfs/Guideline-Isolation-H.pdf"
     }
    ]
   },
   {
    "item": "標準予防策: 手袋・眼の防護(ゴーグル)",
    "target": "汗への接触・ゴーグルと眼鏡",
    "value": "手袋は、血液・体液・粘膜・傷のある皮膚(便や尿が漏れる患者の皮膚なども)に触れる見込みのときに着ける。汗は標準予防策で感染性を考える対象から除かれている。飛沫やしぶきのおそれがあるときは、ゴーグルやフェイスシールドで眼を守る。ふだんの眼鏡やコンタクトレンズは、十分な眼の防護とはみなされない。",
    "exam": "56-pm-50(誤答:汗に触れるときは手袋を着ける／ゴーグルは眼鏡で代用できる)",
    "q": [
     "56-pm-50"
    ],
    "note": "確認済み[S1]。「汗は対象外」は感染性を考える対象の話で、手袋の使用が禁止という意味ではない(予想される接触に応じて選ぶ)。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.cdc.gov/infection-control/media/pdfs/Guideline-Isolation-H.pdf"
     }
    ]
   },
   {
    "item": "手洗いと擦式アルコール手指消毒の使い分け",
    "target": "手洗いの方法",
    "value": "目に見える汚れや血液・体液の汚れがあるときは、石けんと流水で手洗いする。見た目に汚れがなければ、擦式アルコール手指消毒薬が第一選択。芽胞をつくる菌(C. difficileなど)の可能性があるときは、アルコールが効きにくいので石けんと流水で洗う。",
    "exam": "56-pm-50(誤答:手洗いは温水で行う)",
    "q": [
     "56-pm-50"
    ],
    "note": "確認済み[S1][S3]。S3(厚労科研の介護施設向けガイド)も、通常は擦式アルコール、汚れたときは流水と石けんとする。温水を指定する記載は見つけられなかった。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.cdc.gov/infection-control/media/pdfs/Guideline-Isolation-H.pdf"
     },
     {
      "label": "S3",
      "url": "https://www.med.nagoya-u.ac.jp/kansenseigyo/kousei/kousei3/2.pdf"
     }
    ]
   },
   {
    "item": "空気予防策と呼吸用保護具(N95)",
    "target": "結核・麻疹・水痘などの空気感染",
    "value": "空気感染する病原体(結核菌・麻疹・水痘など)に使う。陰圧などの空気感染隔離室に患者を入れ、医療者は入室前にマスクまたは呼吸用保護具(N95以上など)を着ける。MRSAなどの接触予防策で求められる個人防護具はガウンと手袋で、N95は含まれない。",
    "exam": "56-am-1(誤答:N95マスクを装着する)／50-am-86(誤答:結核の経口感染。結核は空気感染)",
    "q": [
     "56-am-1",
     "50-am-86"
    ],
    "note": "確認済み[S1][S3]。マスクか呼吸用保護具かは病原体ごとに決まる[S1]。S3も、接触予防策でのケアには手袋とガウン(またはビニールエプロン)を着けるとしている。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.cdc.gov/infection-control/media/pdfs/Guideline-Isolation-H.pdf"
     },
     {
      "label": "S3",
      "url": "https://www.med.nagoya-u.ac.jp/kansenseigyo/kousei/kousei3/2.pdf"
     }
    ]
   },
   {
    "item": "飛沫予防策(インフルエンザなど)",
    "target": "インフルエンザ・百日咳・アデノウイルスなど",
    "value": "咳やくしゃみなどの大きな飛沫で伝わる病原体に使う。個室が望ましい。医療者は、患者に近づくとき(約1m以内)にサージカルマスクを着ける(N95は不要)。患者を室外へ移すときは、患者にマスクを着けてもらう。",
    "exam": "49-am-78(正答:飛沫感染=インフルエンザウイルス。誤答:MRSA・C. difficile・B型肝炎ウイルス・緑膿菌)",
    "q": [
     "49-am-78"
    ],
    "note": "確認済み[S1][S2]。MRSAとC. difficileは接触予防策、B型肝炎は標準予防策の対象[S1]。約1mはS2(邦訳)、CDC原文は3フィート。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.cdc.gov/infection-control/media/pdfs/Guideline-Isolation-H.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.mhlw.go.jp/shingi/2007/03/dl/s0315-4f33.pdf"
     }
    ]
   },
   {
    "item": "感染症ごとの予防策の型(破傷風・A型肝炎・帯状疱疹)",
    "target": "感染経路の見分け",
    "value": "破傷風=標準予防策(人から人へはうつらない)。A型肝炎=標準予防策(糞口感染。おむつや失禁のある患者では接触予防策を追加)。帯状疱疹=免疫が正常で病変を覆える局所例は標準予防策、播種性などでは空気+接触予防策。",
    "exam": "50-am-86(正答:MRSA=接触感染。誤答:結核の経口感染／破傷風の媒介動物による感染／A型肝炎の血液による感染／帯状疱疹の飛沫感染)",
    "q": [
     "50-am-86"
    ],
    "note": "確認済み[S1][S4]。「媒介動物による」という言い回しそのものは資料で直接確認していない(S1は破傷風が人から人へうつらないことだけを記載)。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.cdc.gov/infection-control/media/pdfs/Guideline-Isolation-H.pdf"
     },
     {
      "label": "S4",
      "url": "https://www.fsc.go.jp/sonota/factsheets/11hepatitis.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "intermittent-claudication",
  "name": "間欠性跛行の鑑別とトレッドミル歩行試験",
  "category": "検査法・徴候",
  "aliases": [
   "間欠性跛行",
   "間欠跛行",
   "トレッドミル歩行試験",
   "トレッドミル歩行",
   "歩行負荷試験",
   "運動負荷ABI",
   "神経性跛行",
   "血行性跛行",
   "intermittent claudication",
   "閉塞性動脈硬化症",
   "LEAD"
  ],
  "rows": [
   {
    "item": "トレッドミル歩行負荷試験(運動負荷ABI)",
    "target": "下肢閉塞性動脈疾患(LEAD)の間欠性跛行の重症度評価・神経性と血行性の鑑別",
    "value": "歩行負荷で虚血肢は足関節血圧(ABI)が下がる。設定の目安はTASC IIが3.5 km/時・傾斜12%、ESCが3 km/時・傾斜10%、日本は2.4 km/時・傾斜12%が多く、歩行は最長5分以内。運動後にABIが20%以上、または足関節血圧が20 mmHg以上低下したら異常。歩行が難しい人は足関節屈伸など他の運動負荷を考える。",
    "exam": "52-am-13(正答:閉塞性動脈硬化症の検査と結果の組合せ『トレッドミル歩行―間欠性跛行の出現』)",
    "q": [
     "52-am-13"
    ],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2022/03/JCS2022_Azuma.pdf"
     }
    ]
   },
   {
    "item": "血行性(閉塞性動脈硬化症)の間欠性跛行の特徴",
    "target": "閉塞性動脈硬化症(LEAD)",
    "value": "一定の歩行距離で痛み・だるさ・こむらがえり(しびれを伴うこともある)が出て、休むと数分で軽減する。体位の影響はない。下肢の動脈拍動は減弱し、足部動脈の触知は不良になるが、限局性の腸骨動脈病変では足部動脈の触知が正常のことがある。",
    "exam": "52-am-13(誤答選択肢『足背動脈の触診―リズムの不整』『立位体前屈―痛みの軽減』『下垂試験―感覚異常』)／51-pm-18(症例:300m歩行ごとの下肢痛・5〜6分の休息・座位や立位で痛まない)",
    "q": [
     "52-am-13",
     "51-pm-18"
    ],
    "note": "確認済み[S1]。拍動は減弱・消失の方向で、『リズムの不整』を所見とする記載は資料にない。『立位体前屈で痛みが軽減』は神経性(下の行)の特徴で血行性には当てはまらない。『下垂試験』の記載は資料で未確認。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2022/03/JCS2022_Azuma.pdf"
     }
    ]
   },
   {
    "item": "神経性の間欠性跛行(腰部脊柱管狭窄症)の特徴",
    "target": "腰部脊柱管狭窄症(神経根型・馬尾型)・腰椎変性すべり症",
    "value": "立つ・歩くで下肢の痛み・しびれ・脱力が悪化し、座る・前かがみで軽減する。脊柱管は前かがみで広くなる。自転車や前屈歩行では症状が出にくい。排尿後の残尿感、股間のほてり、便秘などの馬尾症状を伴うことがある(馬尾型は直腸膀胱障害・会陰部の感覚障害を伴うことがある)。血行性と似た症状になることがあるので鑑別が必要。",
    "exam": "52-am-87(第4腰椎変性すべり症:間欠性跛行・下肢痛・頻尿・会陰部の熱感は正しい、痙性歩行は誤り)／第50回(両下肢のしびれと間欠性跛行・足背動脈は触知可・体幹前屈で歩行が容易→Williams型装具)",
    "q": [
     "52-am-87"
    ],
    "note": "確認済み[S1][S2]。JOA資料の馬尾症状は『残尿感・股間のほてり・便秘』で、『頻尿』の記載はない。Williams型装具、痙性歩行が誤りである理由、51-am-93(OPLL)・51-pm-36(Parkinson病)の誤答の根拠は資料で未確認。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2022/03/JCS2022_Azuma.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.joa.or.jp/public/sick/pdf/MO0013CKA.pdf"
     }
    ]
   },
   {
    "item": "運動療法(トレッドミル・トラック歩行)",
    "target": "跛行のあるLEAD(間欠性跛行)",
    "value": "歩行が他の運動(サイクリング・階段昇降など)より優れる。跛行が出る強度で歩き、痛みが中等度になれば休むことを繰り返す。1回30〜60分、週3回、少なくとも3か月が推奨。監督下運動療法の方が非監督下より効果が大きく、可能なら推奨。跛行のLEADは運動療法+薬物療法が第一選択。運動療法はABIを改善させない。",
    "exam": "51-pm-18(症例に対する練習:正答トレッドミル歩行練習。誤答:寒冷療法・極超短波・PNF最大抵抗運動・弾性ストッキング圧迫)",
    "q": [
     "51-pm-18"
    ],
    "note": "確認済み[S1]。誤答の各選択肢を否定する記載は資料にない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2022/03/JCS2022_Azuma.pdf"
     }
    ]
   },
   {
    "item": "運動後ABIの回復時間",
    "target": "間欠性跛行の重症度・治療効果の判定",
    "value": "歩行後に低下したABIは時間とともに負荷前値に戻る。回復時間は虚血に対する代償機能を反映し、遅いほど機能障害が強い。運動療法や血行再建後の効果判定は、治療前と同じ運動負荷量で行う。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2022/03/JCS2022_Azuma.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "involuntary-movements",
  "name": "不随意運動・神経徴候(振戦・舞踏運動・ミオクローヌス・ミオトニア・Westphal現象)",
  "category": "検査法・徴候",
  "aliases": [
   "不随意運動",
   "舞踏運動",
   "アテトーゼ",
   "バリスム",
   "ヘミバリスム",
   "ミオクローヌス",
   "羽ばたき振戦",
   "ミオトニア",
   "把握ミオトニア",
   "叩打ミオトニア",
   "Westphal現象",
   "ウェストファル現象",
   "安静時振戦",
   "姿勢時振戦",
   "多系統萎縮症",
   "筋強直性ジストロフィー"
  ],
  "rows": [
   {
    "item": "筋強直性ジストロフィー―ミオトニア",
    "target": "筋収縮後の弛緩の遅れ",
    "value": "ミオトニー(ミオトニア)は筋収縮後に弛緩が遅れる現象。握った手が開きにくい(把握ミオトニー)、強く噛みしめると口が開きにくい、筋腹をハンマーで叩くと一定時間収縮する(叩打ミオトニー)。咀嚼筋が早期から障害されて斧様顔貌の一因になり、四肢遠位筋の筋力低下・筋萎縮、ときに下垂足、前頭部脱毛もみられる",
    "exam": "54-pm-6(つり革を握ると放しにくい・四肢遠位筋優位の筋力低下・前頭部脱毛・側頭筋と咬筋の萎縮→ミオトニアが正答。誤答=アテトーゼ・Gowers徴候・Lhermitte徴候・Romberg徴候)／55-pm-89(筋強直性ジストロフィーでミオトニアがみられるが正答)／50-am-92(下垂足・斧状顔貌が正答。入力記録)／50-pm-92(DMDで「ミオトニア現象」は誤り。入力記録)",
    "q": [
     "54-pm-6",
     "55-pm-89",
     "50-am-92",
     "50-pm-92"
    ],
    "note": "確認済み[S1][S2]。斧様顔貌は[S1]、前頭部脱毛と遠位筋の筋力低下・下垂足は[S2]で確認(S2は斧状顔貌・側頭筋/咬筋の記載なし)",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/naika/114/4/114_678/_pdf"
     },
     {
      "label": "S2",
      "url": "https://www.msdmanuals.com/ja-jp/professional/19-小児科/遺伝性筋疾患/筋強直性ジストロフィー"
     }
    ]
   },
   {
    "item": "多系統萎縮症―自律神経障害",
    "target": "起立性低血圧を伴う神経変性疾患",
    "value": "自律神経障害(立ちくらみ、尿・便失禁)、小脳症状、重度になりうるパーキンソニズム(レボドパへの反応は通常よくない)、錐体路徴候、早期からの転倒・平衡障害",
    "exam": "55-pm-87(疾患と頻度の多い症候の組合せ→多系統萎縮症―起立性低血圧が正答。誤答=Alzheimer型認知症―羽ばたき振戦、Huntington病―線維束性収縮、多発性硬化症―舞踏運動、ALS―静止時振戦)",
    "q": [
     "55-pm-87"
    ],
    "note": "確認済み[S1]。出典は「立ちくらみ」と書き、起立性低血圧の語は使わない(同じ症状と解釈)",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-%E7%A5%9E%E7%B5%8C%E7%96%BE%E6%82%A3/%E9%81%8B%E5%8B%95%E9%9A%9C%E5%AE%B3%E7%96%BE%E6%82%A3%E3%81%8A%E3%82%88%E3%81%B3%E5%B0%8F%E8%84%B3%E7%96%BE%E6%82%A3/%E4%BA%8C%E6%AC%A1%E6%80%A7%E3%81%8A%E3%82%88%E3%81%B3%E9%9D%9E%E5%AE%9A%E5%9E%8B%E3%83%91%E3%83%BC%E3%82%AD%E3%83%B3%E3%82%BD%E3%83%8B%E3%82%BA%E3%83%A0"
     }
    ]
   },
   {
    "item": "Westphal現象(Parkinson病)",
    "target": "Parkinson病でみられる現象",
    "value": "Parkinson病で、背理性筋収縮(逆説収縮。筋固縮の一現象で、受動的に短縮した筋が収縮して新しい肢位を保つ)と結びつけて報告される。症例報告では、歩行中の前脛骨筋の持続収縮が筋疲労を招き、遊脚期の背屈保持が難しくなって転倒につながると考察されている",
    "exam": "57-pm-33(Parkinson病の評価で適切=Westphal現象が正答。誤答=Beevor徴候・Finkelstein test・MAS・SARA)／56-am-9(on-off現象が正答で、Westphal現象は誤答選択肢)",
    "q": [
     "57-pm-33",
     "56-am-9"
    ],
    "note": "確認済み[S1](1症例報告)。Westphal現象そのものの定義文は出典に明記がなく、「他動的に背屈した足関節が背屈位のまま保たれる」といった説明は未確認のため書かない。Parkinson病の振戦・強剛・on-offは既存の parkinson-signs-motor-complications を参照",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pu-hiroshima.repo.nii.ac.jp/record/1218/files/KJ00000044627.pdf"
     }
    ]
   },
   {
    "item": "振戦の分類",
    "target": "振戦の種類と疾患",
    "value": "安静時振戦=身体の一部が完全に支えられた静止時に出て、活動で最小または消失(最も多い原因はParkinson病)。動作時振戦=随意的に動かすと最大で、姿勢時振戦(腕を伸ばして保持するとき)と運動時振戦に分かれる(本態性振戦など)。企図振戦=目標に近づくほど増強し、小脳疾患でみられる",
    "exam": "57-am-27(律動的な不随意運動=振戦が正答。誤答=チック・バリスム・アテトーゼ・ミオクローヌス)／52-am-34(Parkinson病の徴候は突進現象・歯車様固縮。「動作時振戦」は誤答)／49回(企図振戦はParkinson病の徴候でない。入力記録)",
    "q": [
     "57-am-27",
     "52-am-34"
    ],
    "note": "確認済み[S1]。「律動的」という定義文は出典で確認していない(バリスム・アテトーゼはリズムがないと記載)",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-%E7%A5%9E%E7%B5%8C%E7%96%BE%E6%82%A3/%E9%81%8B%E5%8B%95%E9%9A%9C%E5%AE%B3%E7%96%BE%E6%82%A3%E3%81%8A%E3%82%88%E3%81%B3%E5%B0%8F%E8%84%B3%E7%96%BE%E6%82%A3/%E6%8C%AF%E6%88%A6"
     }
    ]
   },
   {
    "item": "舞踏運動・アテトーゼ・バリスム・Huntington病",
    "target": "不規則な不随意運動の区別",
    "value": "舞踏運動=主に遠位筋と顔面の、不規則で流れるような止められない動き。アテトーゼ=舞踏運動より遅く、リズムがなく、ゆっくり体をよじる動き。ヘミバリスム=片側の、速くリズムのない、腕や脚の近位部が激しく放り出されるような動き。Huntington病は舞踏運動・アテトーゼ・ミオクローヌスなどを示し、常染色体顕性遺伝(HTT遺伝子のCAGリピート異常)。進行期は舞踏運動が無動-固縮に置き換わる",
    "exam": "55-pm-87(「Huntington病―線維束性収縮」「多発性硬化症―舞踏運動」は誤答選択肢)／57-am-27(バリスム・アテトーゼは誤答選択肢)",
    "q": [
     "55-pm-87",
     "57-am-27"
    ],
    "note": "確認済み[S1][S2]。Huntington病のページに線維束性収縮の記載はない",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-%E7%A5%9E%E7%B5%8C%E7%96%BE%E6%82%A3/%E9%81%8B%E5%8B%95%E9%9A%9C%E5%AE%B3%E7%96%BE%E6%82%A3%E3%81%8A%E3%82%88%E3%81%B3%E5%B0%8F%E8%84%B3%E7%96%BE%E6%82%A3/%E8%88%9E%E8%B8%8F%E9%81%8B%E5%8B%95-%E3%82%A2%E3%83%86%E3%83%88%E3%83%BC%E3%82%BC-%E3%81%8A%E3%82%88%E3%81%B3%E3%83%98%E3%83%9F%E3%83%90%E3%83%AA%E3%82%B9%E3%83%A0"
     },
     {
      "label": "S2",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-%E7%A5%9E%E7%B5%8C%E7%96%BE%E6%82%A3/%E9%81%8B%E5%8B%95%E9%9A%9C%E5%AE%B3%E7%96%BE%E6%82%A3%E3%81%8A%E3%82%88%E3%81%B3%E5%B0%8F%E8%84%B3%E7%96%BE%E6%82%A3/%E3%83%8F%E3%83%B3%E3%83%81%E3%83%B3%E3%83%88%E3%83%B3%E7%97%85"
     }
    ]
   },
   {
    "item": "ミオクローヌス・羽ばたき振戦",
    "target": "電撃様の不随意収縮",
    "value": "ミオクローヌス=単一の筋または筋群に起こる電気ショック様の短い不随意収縮。羽ばたき振戦(asterixis)は陰性ミオクローヌス(筋緊張が突然失われる)の一例で、重度の肝不全でみられる。姿勢で誘発され、肘と手掌を屈曲して腕の外転を保つと出る",
    "exam": "55-pm-87(「Alzheimer型認知症―羽ばたき振戦」は誤答選択肢)／57-am-27(ミオクローヌスは誤答選択肢)／52-am-34(ミオクローヌスはParkinson病の徴候でないため誤答)",
    "q": [
     "55-pm-87",
     "57-am-27",
     "52-am-34"
    ],
    "note": "確認済み[S1][S2]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-%E7%A5%9E%E7%B5%8C%E7%96%BE%E6%82%A3/%E9%81%8B%E5%8B%95%E9%9A%9C%E5%AE%B3%E7%96%BE%E6%82%A3%E3%81%8A%E3%82%88%E3%81%B3%E5%B0%8F%E8%84%B3%E7%96%BE%E6%82%A3/%E3%83%9F%E3%82%AA%E3%82%AF%E3%83%AD%E3%83%BC%E3%83%8C%E3%82%B9"
     },
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-%E7%A5%9E%E7%B5%8C%E7%96%BE%E6%82%A3/%E9%81%8B%E5%8B%95%E9%9A%9C%E5%AE%B3%E7%96%BE%E6%82%A3%E3%81%8A%E3%82%88%E3%81%B3%E5%B0%8F%E8%84%B3%E7%96%BE%E6%82%A3/%E6%8C%AF%E6%88%A6"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "jcs",
  "name": "Japan Coma Scale(JCS)",
  "category": "評価尺度",
  "aliases": [
   "JCS",
   "Japan Coma Scale",
   "ジャパン・コーマ・スケール"
  ],
  "rows": [
   {
    "item": "JCS 全体の構成",
    "target": "意識障害(3-3-9度方式)",
    "value": "0=清明／Ⅰ(1・2・3)=刺激しなくても覚醒／Ⅱ(10・20・30)=刺激すると覚醒／Ⅲ(100・200・300)=刺激しても覚醒しない",
    "exam": "55-pm-44(誤答:「JCS 3桁」は急性期の離床を控える側。積極的離床が可能な場合の正答は「重度な運動麻痺」)／55-am-39(誤答:神経筋再教育が「JCSⅢ-200にも適応される」。正答は「随意運動を促通する」)",
    "q": [
     "55-am-39",
     "55-pm-44"
    ],
    "note": "確認済み[S7]",
    "conflict": false,
    "sources": [
     {
      "label": "S7",
      "url": "https://www.jstage.jst.go.jp/article/naika/99/5/99_1082/_pdf"
     }
    ]
   },
   {
    "item": "JCS Ⅰ-1〜Ⅰ-3",
    "target": "覚醒している",
    "value": "1=大体清明だが今ひとつはっきりしない／2=見当識障害がある／3=自分の名前・生年月日が言えない",
    "exam": "出題は直接なし(Ⅰ桁の区分の参考)",
    "q": [],
    "note": "確認済み[S7]",
    "conflict": false,
    "sources": [
     {
      "label": "S7",
      "url": "https://www.jstage.jst.go.jp/article/naika/99/5/99_1082/_pdf"
     }
    ]
   },
   {
    "item": "JCS Ⅱ-10",
    "target": "刺激で覚醒",
    "value": "10=普通の呼びかけで容易に開眼する",
    "exam": "54-am-10(誤答選択肢Ⅱ-10)",
    "q": [
     "54-am-10"
    ],
    "note": "確認済み[S7]",
    "conflict": false,
    "sources": [
     {
      "label": "S7",
      "url": "https://www.jstage.jst.go.jp/article/naika/99/5/99_1082/_pdf"
     }
    ]
   },
   {
    "item": "JCS Ⅱ-20",
    "target": "刺激で覚醒",
    "value": "20=大きな声または体を揺さぶることにより開眼する",
    "exam": "53-pm-1(呼びかけでも大声でも開眼せず、体を揺さぶって初めて開眼するがすぐ閉眼=Ⅱ-20が正答。選択肢Ⅱ-10/20/30/Ⅲ-100/Ⅲ-200)／54-am-19(問題文にJCS Ⅱ-20)／54-am-10(誤答選択肢Ⅱ-20)",
    "q": [
     "53-pm-1",
     "54-am-10",
     "54-am-19"
    ],
    "note": "確認済み[S7]",
    "conflict": false,
    "sources": [
     {
      "label": "S7",
      "url": "https://www.jstage.jst.go.jp/article/naika/99/5/99_1082/_pdf"
     }
    ]
   },
   {
    "item": "JCS Ⅱ-30",
    "target": "刺激で覚醒",
    "value": "30=痛み刺激を加えつつ呼びかけを繰り返すと辛うじて開眼する",
    "exam": "53-pm-1・54-am-10(誤答選択肢Ⅱ-30)",
    "q": [
     "53-pm-1",
     "54-am-10"
    ],
    "note": "確認済み[S7]",
    "conflict": false,
    "sources": [
     {
      "label": "S7",
      "url": "https://www.jstage.jst.go.jp/article/naika/99/5/99_1082/_pdf"
     }
    ]
   },
   {
    "item": "JCS Ⅲ-100",
    "target": "刺激で覚醒しない",
    "value": "100=痛み刺激に対して払いのけるような動作をする",
    "exam": "54-am-10(大声で呼びかけても開眼せず、胸骨部の痛み刺激で刺激部位を払いのける動き=Ⅲ-100が正答。選択肢Ⅱ-10・Ⅱ-20・Ⅱ-30・Ⅲ-100・Ⅲ-200)／53-pm-1(誤答選択肢Ⅲ-100)",
    "q": [
     "53-pm-1",
     "54-am-10"
    ],
    "note": "確認済み[S7]",
    "conflict": false,
    "sources": [
     {
      "label": "S7",
      "url": "https://www.jstage.jst.go.jp/article/naika/99/5/99_1082/_pdf"
     }
    ]
   },
   {
    "item": "JCS Ⅲ-200",
    "target": "刺激で覚醒しない",
    "value": "200=痛み刺激で少し手足を動かしたり顔をしかめる",
    "exam": "59-pm-4(くも膜下出血の症例が「JCSⅢ-200」で搬入=問題文)／55-am-39(誤答の前提)／54-am-10・53-pm-1(誤答選択肢Ⅲ-200)",
    "q": [
     "53-pm-1",
     "54-am-10",
     "55-am-39",
     "59-pm-4"
    ],
    "note": "確認済み[S7]",
    "conflict": false,
    "sources": [
     {
      "label": "S7",
      "url": "https://www.jstage.jst.go.jp/article/naika/99/5/99_1082/_pdf"
     }
    ]
   },
   {
    "item": "JCS Ⅲ-300",
    "target": "刺激で覚醒しない",
    "value": "300=痛み刺激に全く反応しない",
    "exam": "出題なし(参考)",
    "q": [],
    "note": "確認済み[S7]",
    "conflict": false,
    "sources": [
     {
      "label": "S7",
      "url": "https://www.jstage.jst.go.jp/article/naika/99/5/99_1082/_pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-19",
  "review": "ai"
 },
 {
  "slug": "joint-position-sense",
  "name": "関節位置覚の検査法(模倣法・再現法・母指探し試験)",
  "category": "検査法・徴候",
  "aliases": [
   "母指探し試験",
   "母指探しテスト",
   "thumb localizing test",
   "関節定位覚",
   "模倣法",
   "模倣試験",
   "再現法",
   "再現試験",
   "位置覚検査",
   "運動覚"
  ],
  "rows": [
   {
    "item": "位置覚検査の指示(模倣法)",
    "target": "麻痺側の位置覚の検査",
    "value": "模倣法=四肢関節の1つを他動的に動かして一定の角度に保ち、反対側の同じ関節で同じ角度をまねさせ、設定角度とまねた角度の差で判断する。臨床では模倣法が使われるが、目で見た判断で定量的でない。一方、MSDマニュアルは、手指の末節や足趾を上下に動かして閉眼のまま動きを識別できるか確かめる方法を関節位置覚の検査として記載している",
    "exam": "58-pm-15(Brunnstrom上肢Ⅳ・手指Ⅲ・下肢Ⅳの左片麻痺。位置覚検査の指示として「左腕を動かしますので、右腕でまねをしてください」が正答。誤答=掌を上に向けて腕を水平保持／左足の親指が何回動いたか答える／右膝を曲げて左脚で同じように／親指が手の甲側に動いたら「上」と答える)",
    "q": [
     "58-pm-15"
    ],
    "note": "確認済み[S1][S3]。MSDは上下の動きを識別させる方法を位置覚の検査に含め、国試は方向回答の選択肢を誤りとした(国試は模倣法が正答)ため、呼び方・方法の整理が資料とずれる",
    "conflict": true,
    "sources": [
     {
      "label": "S1",
      "url": "https://iuhw.repo.nii.ac.jp/record/816/files/32206AS287.pdf"
     },
     {
      "label": "S3",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-神経疾患/神経学的診察/感覚の評価"
     }
    ]
   },
   {
    "item": "再現法(模倣法との違い)",
    "target": "位置覚検査の2つの方法",
    "value": "再現法=検査する四肢関節を他動的に動かして一定の角度に保った位置を記憶させ、その後位置を変えてから、記憶した位置に自分で戻させる。設定角度と再現した角度の差で判断する。模倣法は反対側の関節で同じ角度をまねる点が違う",
    "exam": "50-am-17(誤答選択肢:「検査肢の他動運動による再現試験」「検査肢の自動運動による再現試験」)",
    "q": [
     "50-am-17"
    ],
    "note": "確認済み[S1]。国試の「非検査肢の自動/他動運動による模倣試験」も誤答選択肢だった(軽度認知症で口頭の詳細な説明が理解しにくい症例のため)",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://iuhw.repo.nii.ac.jp/record/816/files/32206AS287.pdf"
     }
    ]
   },
   {
    "item": "母指探し試験(thumb localizing test)",
    "target": "上肢の深部感覚の簡便な検査",
    "value": "検者が麻痺側の腕を固定した位置に置き、被検者は反対側(健側)の手で、その母指の先をつまむ。腕を置く前に検者が肢をいろいろな方向に動かし、開始位置から位置を推測できないようにする。研究では3つの肢位(前腕中間位・肘90°屈曲、母指が口の高さ、母指が体幹の正中)で、視覚を遮った条件で行った。判定は0=正常(まっすぐ速くつまむ)、1=軽度障害(数cmはずれるが直ちに修正、または手が揺れる)、2=中等度障害(母指の周りを探す・偶然触れる・皮膚をたどる)、3=重度障害(届かない、または腕に偶然触れて皮膚をたどり母指の先に着く)",
    "exam": "50-am-17(軽度の感覚障害が予想され、軽度認知症で口頭の詳細な手順の説明が理解しにくい多発性脳梗塞の症例の深部感覚検査=関節定位覚(母指探し)検査が正答)",
    "q": [
     "50-am-17"
    ],
    "note": "確認済み[S2](脳卒中片麻痺での信頼性・妥当性を検討した研究。Hirayamaらの方法と記載)。「閉眼」ではなく目隠しでの検査が報告されている。国試の「関節定位覚」と同一視する点は国試の表記による",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7380647/"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "kihon-checklist",
  "name": "基本チェックリスト",
  "category": "評価尺度",
  "aliases": [
   "基本チェックリスト"
  ],
  "rows": [
   {
    "item": "基本チェックリスト(介護予防)",
    "target": "生活機能の低下・要介護リスク",
    "value": "全25項目。事業対象者の目安=1〜20番のうち10項目該当、など。BMI<18.5が低栄養の項目(12番)。6か月で2〜3kg以上の体重減少(11番)。階段を手すりや壁をつたわらず昇る(6番)、椅子から何もつかまらず立ち上がる(7番)、15分位続けて歩く(8番)、この1年間の転倒(9番)、転倒への不安(10番)",
    "exam": "59-pm-43(低栄養の判断基準のBMI。選択肢16.5/18.5/20.5/22.5/24.5未満。正答18.5未満)／58-pm-48(質問項目でないもの=「何もつかまらずに床から立ち上がっていますか」。実際は「椅子に座った状態から」。誤答=転倒不安、15分続けて歩く、この一年間の転倒、階段を手すり・壁をつたわらず昇る)／57-am-36(基本チェックリストの該当項目が4→10項目に増加=悪化方向)",
    "q": [
     "57-am-36",
     "58-pm-48",
     "59-pm-43"
    ],
    "note": "確認済み[S15](25項目・BMI<18.5・各質問文・「1〜20のうち10項目該当」)。57-am-36 の「4→10項目」は問題文のみ",
    "conflict": false,
    "sources": [
     {
      "label": "S15",
      "url": "https://www.mhlw.go.jp/file/05-Shingikai-12401000-Hokenkyoku-Soumuka/0000182223.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-19",
  "review": "ai"
 },
 {
  "slug": "knee-ligament-tests",
  "name": "膝靱帯の検査(引き出し・Lachman・内外反ストレステスト)",
  "category": "検査法・徴候",
  "aliases": [
   "後方引き出しテスト",
   "前方引き出しテスト",
   "posterior drawer test",
   "anterior drawer test",
   "Lachmanテスト",
   "Lachman test",
   "ラックマンテスト",
   "外反ストレステスト",
   "内反ストレステスト",
   "valgus stress test",
   "varus stress test",
   "膝靱帯",
   "後十字靱帯",
   "内側側副靱帯",
   "外側側副靱帯",
   "ACL",
   "PCL",
   "MCL",
   "LCL"
  ],
  "rows": [
   {
    "item": "後方引き出しテスト(後十字靱帯 PCL)",
    "target": "後十字靱帯損傷",
    "value": "背臥位で股関節を約45度、膝を80〜90度屈曲。検者は患者の足に座って固定し、近位脛骨を握って関節裂隙の両側に母指を置く。ハムストリングスの力が抜けているのを確認し、後方への力を加え、脛骨の後方移動量を健側と比べる。健側より緩みが大きければ陽性。後方移動は5mm未満(グレードⅠ)・5〜10mm(Ⅱ)・10mm超(Ⅲ)で評価される。感度69%・特異度98%(1件の研究)。",
    "exam": "60-pm-9(膝の靱帯ストレステスト。図で矢印=検査者が力を加えた方向。検査の対象=後十字靱帯が正答。誤答:前十字靱帯、内側側副靱帯、外側側副靱帯、内側半月板)／52-pm-16(転倒1か月後の膝不安定感。図の検査で陽性のとき損傷されるのは後十字靱帯が正答。誤答:外側側副靱帯・前十字靱帯・腸脛靱帯・内側側副靱帯)／第49回(前十字靱帯断裂―膝後方引き出しテストは誤)／第51回(「Posterior drawerテスト」(後十字靱帯)が誤答の扱い)",
    "q": [
     "60-pm-9",
     "52-pm-16"
    ],
    "note": "確認済み[S1][S2]。後方への力で脛骨が後ろに動く=PCL、という対応は国試と一致。60-pm-9・52-pm-16は図が未確認で、テスト名が後方引き出しかは推定。第51回の設問の組合せ(何と組み合わせて誤りか)は未確認。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC12875799/"
     },
     {
      "label": "S2",
      "url": "https://stritch.luc.edu/lumen/meded/medicine/pulmonar/pdself/knee_NJ.pdf"
     }
    ]
   },
   {
    "item": "外反ストレステスト(内側側副靱帯)・内反ストレステスト(外側側副靱帯)",
    "target": "内側側副靱帯(MCL)・外側側副靱帯(LCL)損傷",
    "value": "背臥位で膝を軽く屈曲位に保つ。外反ストレス:膝の外側を押さえ、遠位脛骨を外側へ動かして外転(外反)の力を加え、内側側副靱帯を調べる。内反ストレス:膝の内側を押さえ、遠位脛骨を内側へ動かして内転(内反)の力を加え、外側側副靱帯を調べる。健側より緩みが大きければ陽性。緩みはnegative(終末抵抗が硬い)・1+・2+・3+で記録する。",
    "exam": "54-pm-3(誤答選択肢:外反ストレステスト/内反ストレステスト=内側側副靱帯/外側側副靱帯)／第49回(半月板断裂―膝外反ストレステストは誤)／52-pm-16・60-pm-9(誤答に内側側副靱帯・外側側副靱帯。後十字靱帯の検査の設問)",
    "q": [
     "54-pm-3",
     "52-pm-16",
     "60-pm-9"
    ],
    "note": "確認済み[S1]。外反ストレス=内側側副靱帯、内反ストレス=外側側副靱帯。半月板の検査は別にMcMurrayテストがある[S1]ため、「半月板断裂―外反ストレステスト」は誤り。54-pm-3の問題の組合せは未確認。屈曲角度(0度と30度など)の記載は資料に無く書かない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://stritch.luc.edu/lumen/meded/medicine/pulmonar/pdself/knee_NJ.pdf"
     }
    ]
   },
   {
    "item": "前方引き出しテスト(前十字靱帯 ACL)",
    "target": "前十字靱帯損傷",
    "value": "背臥位で股関節を約45度、膝を90度屈曲。検者は患者の足に座って固定し、近位脛骨を両手で握って、ゆっくり前方へ垂直に力を加える。健側と比べて脛骨の前方移動が大きければ陽性。前十字靱帯にはLachmanテストの方が望ましい、とされる。",
    "exam": "第50回(膝前十字靱帯断裂の評価=前方引き出しテストが正答)／第49回(前十字靱帯断裂―膝後方引き出しテストは誤)／54-pm-3(誤答選択肢:前方引き出しテスト/Lachmanテスト=前十字靱帯)",
    "q": [
     "54-pm-3"
    ],
    "note": "確認済み[S1][S2]。前方引き出し=ACL、後方引き出し=PCLの対応。54-pm-3の問題文・正答は未確認で、この選択肢がなぜ誤答かは不明。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5997333/"
     },
     {
      "label": "S2",
      "url": "https://stritch.luc.edu/lumen/meded/medicine/pulmonar/pdself/knee_NJ.pdf"
     }
    ]
   },
   {
    "item": "Lachmanテスト(前十字靱帯 ACL)",
    "target": "前十字靱帯損傷",
    "value": "背臥位で膝を15〜30度(資料により約20度)屈曲。一方の手で脛骨近位、他方の手で大腿骨遠位を保持し、すばやく前方へ垂直に力を加える。脛骨の前方移動や終末抵抗(end-feel)が消えていて、健側と明らかに違えば陽性。ACL断裂の検出に感度・特異度とも高いとされ、あるコホートではこのテスト単独の陽性尤度比が38.4。",
    "exam": "54-pm-3(誤答選択肢:前方引き出しテスト/Lachmanテスト=前十字靱帯)",
    "q": [
     "54-pm-3"
    ],
    "note": "確認済み[S1][S2][S3]。屈曲角度は資料で15〜30度・20度と幅がある。感度85%・特異度94%(メタ解析)という前回の値は今回の資料で確認できず書かない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5997333/"
     },
     {
      "label": "S2",
      "url": "https://stritch.luc.edu/lumen/meded/medicine/pulmonar/pdself/knee_NJ.pdf"
     },
     {
      "label": "S3",
      "url": "https://pubmed.ncbi.nlm.nih.gov/12690600/"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "lachman-test",
  "name": "Lachmanテスト・前方引き出しテスト(前十字靱帯)",
  "category": "検査法・徴候",
  "aliases": [
   "ラックマン",
   "前方引出しテスト",
   "前十字靱帯損傷",
   "前十字靭帯損傷",
   "ACL損傷"
  ],
  "rows": [
   {
    "item": "Lachmanテストの手技と陽性",
    "target": "前十字靱帯(ACL)損傷",
    "value": "背臥位で膝を20〜30度屈曲し、大腿を固定して脛骨を前方に引き、脛骨の前方移動量と終末抵抗(エンドポイント)を見る。終末抵抗がしっかりある(firm)なら正常側、終末抵抗が消失している(absent)場合はACL損傷を示す。",
    "exam": "60-am-41(正答:前十字靱帯損傷で陽性)／61-am-30(誤答:半月板には誤り=前十字靱帯)／59-am-32・54-pm-3・53-pm-12(誤答選択肢:Lachmanテスト=前十字靱帯)",
    "q": [
     "60-am-41",
     "61-am-30",
     "59-am-32",
     "54-pm-3",
     "53-pm-12"
    ],
    "note": "確認済み[S1][S2]。終末抵抗の有無だけでの判定は感度0.81・特異度1.0と報告(45人の研究)。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5031379/"
     },
     {
      "label": "S2",
      "url": "https://pubmed.ncbi.nlm.nih.gov/25709863/"
     }
    ]
   },
   {
    "item": "前方引き出しテストの手技",
    "target": "前十字靱帯(ACL)損傷",
    "value": "膝を90度屈曲、股関節を約45度屈曲、足部を固定し、ハムストリングスを緩めて脛骨を前後に引き、前方への動きを見る。前十字靱帯の検査。",
    "exam": "54-pm-3(誤答選択肢:前方引き出しテストとLachmanテスト=前十字靱帯)",
    "q": [
     "54-pm-3"
    ],
    "note": "確認済み[S1][S2]。手技は研究報告の記載で、Lachmanは30度付近・前方引き出しは90度付近で脛骨の前後移動を見る。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5031379/"
     },
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC2988045/"
     }
    ]
   },
   {
    "item": "診断精度(メタ解析)",
    "target": "ACL断裂の診断",
    "value": "2006年のメタ解析: Lachmanは感度85%・特異度94%でACL断裂の診断に最も有用とされ、pivot shiftは特異度98%だが感度24%、前方引き出しは慢性期は感度92%・特異度91%だが急性期は良くない。2022年のメタ解析ではLachmanは感度81%・特異度85%、pivot shiftは感度55%・特異度94%と、Lachmanは以前の報告より低いとされた。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1][S2]。2つの研究で数値が違う。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pubmed.ncbi.nlm.nih.gov/16715828/"
     },
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC9464183/"
     }
    ]
   },
   {
    "item": "前十字靱帯損傷の臨床像",
    "target": "膝の靱帯損傷",
    "value": "前十字靱帯は膝関節の中にあり、損傷すると関節内の出血(関節血腫)がたまりやすい。急性期のあとは下り坂やひねる動作で膝の不安定感が目立つことがある。診断は徒手的な診察が重要で、MRIが補助になる。損傷した靱帯は固定だけでは治らず、スポーツ復帰を望む場合は手術(腱による再建)が勧められる。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1][S2]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://jsoa.or.jp/content/images/2023/05/s06.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.joa.or.jp/public/publication/pdf/joa_014.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "lasegue-slr",
  "name": "Lasègue徴候・SLRテスト(下肢伸展挙上テスト)",
  "category": "検査法・徴候",
  "aliases": [
   "Lasègue",
   "Lasègue徴候",
   "Lasègueテスト",
   "Lasègue test",
   "Lasegue",
   "ラセーグ",
   "ラセーグ徴候",
   "ラセグ",
   "SLR",
   "SLRテスト",
   "下肢伸展挙上",
   "下肢伸展挙上テスト",
   "straight leg raising",
   "straight leg raise",
   "交差SLR"
  ],
  "rows": [
   {
    "item": "SLR(下肢伸展挙上試験)の手技と陽性",
    "target": "腰椎椎間板ヘルニアの坐骨神経痛",
    "value": "膝を伸ばしたまま下肢を持ち上げ、坐骨神経痛(下肢への放散痛)が出るかを見る。腰椎椎間板ヘルニアでは、この試験のほか、下肢の感覚の鈍さや足の力の弱さなどで診断し、X線・MRIで確定する。",
    "exam": "56-pm-44(正答:腰椎椎間板ヘルニアで陽性)／53-pm-12(正答:腰痛・右殿部痛・右下肢痛・MRIで椎間板ヘルニアの患者で陽性になる検査)／54-am-3(正答:図の検査方法の名称=SLR)／60-pm-82(誤答:深部感覚障害で陽性となるものとしては誤り)",
    "q": [
     "56-pm-44",
     "53-pm-12",
     "54-am-3",
     "60-pm-82"
    ],
    "note": "確認済み[S1]。陽性とする角度(70度以下など)は、このカードの資料では確認していない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.joa.or.jp/public/publication/pdf/joa_002.pdf"
     }
    ]
   },
   {
    "item": "SLRの診断精度",
    "target": "腰椎椎間板ヘルニア",
    "value": "手術例を対象としたメタ解析で、SLRは感度が高く(0.91〜0.92)、特異度が低い(0.26〜0.28)。診断精度は特異度の低さで限られる。単独では多くの徒手検査の診断成績は低く、検査を組み合わせると特異度が上がる。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1][S2]。対象は手術例が中心。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pubmed.ncbi.nlm.nih.gov/10788860/"
     },
     {
      "label": "S2",
      "url": "https://pubmed.ncbi.nlm.nih.gov/20166095/"
     }
    ]
   },
   {
    "item": "交差SLR(crossed SLR)",
    "target": "腰椎椎間板ヘルニア",
    "value": "メタ解析では特異度が高く(0.88〜0.90)、感度が低い(0.28〜0.29)。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1][S2]。交差SLRの手技の説明は、このカードの資料では確認していない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pubmed.ncbi.nlm.nih.gov/10788860/"
     },
     {
      "label": "S2",
      "url": "https://pubmed.ncbi.nlm.nih.gov/20166095/"
     }
    ]
   },
   {
    "item": "ハムストリングスの影響",
    "target": "SLR陽性の解釈",
    "value": "SLRの痛みは、ハムストリングスの tightness(短縮)など腰椎神経根以外の原因でも起こり、偽陽性になりうる。",
    "exam": "54-am-4(正答:SLRで陽性となるのはハムストリングス損傷。誤答:アキレス腱断裂・膝蓋骨脱臼・大腿筋膜張筋短縮・大腿四頭筋短縮)／51回(縫工筋―SLRテストは誤り。SLRはハムストリングス短縮・坐骨神経伸張)／49回(腓腹筋断裂―SLRは誤)",
    "q": [
     "54-am-4"
    ],
    "note": "確認済み[S1]。資料は「tightness(短縮)」、国試の正答は「ハムストリングス損傷」と表現が違うため、conflictとした。",
    "conflict": true,
    "sources": [
     {
      "label": "S1",
      "url": "https://pubmed.ncbi.nlm.nih.gov/23220802/"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "leg-pulse-palpation",
  "name": "下肢動脈の触知部位(足背動脈・後脛骨動脈)",
  "category": "検査法・徴候",
  "aliases": [
   "足背動脈",
   "後脛骨動脈",
   "膝窩動脈",
   "脈拍触知",
   "動脈触知"
  ],
  "rows": [
   {
    "item": "足背動脈・後脛骨動脈の触診部位",
    "target": "足関節・足部の血流の確認",
    "value": "足背動脈は前足部(足背)で、後脛骨動脈は内果の後方で触診する。",
    "exam": "後脛骨動脈=内果後方(外果後方は誤)／足背動脈=長母指伸筋腱と長指伸筋腱の間(正)",
    "q": [],
    "note": "確認済み[S1]。MSDマニュアルは腱を目印にした記載がなく、『長母指伸筋腱と長指伸筋腱の間』は未確認。問題IDは入力記録になし。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/06-筋骨格系疾患と結合組織疾患/関節症状を有する患者へのアプローチ/足関節の評価"
     }
    ]
   },
   {
    "item": "閉塞性動脈硬化症での脈の触診",
    "target": "下肢閉塞性動脈疾患の身体診察",
    "value": "脈の触診では膝窩動脈や足背動脈を主に調べる。下肢の動脈拍動は減弱し、ABIが0.9未満なら閉塞性動脈硬化症を強く疑う。",
    "exam": "52-am-13(誤答選択肢『足背動脈の触診―リズムの不整』。正しくは拍動の減弱・消失)",
    "q": [
     "52-am-13"
    ],
    "note": "確認済み[S1][S2]。大腿動脈・橈骨動脈・上腕動脈・内頸動脈の触知部位は公式資料の本文を確認できず未掲載。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.tyojyu.or.jp/net/byouki/heisokuseidoumyakukoukashou/shindan.html"
     },
     {
      "label": "S2",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2022/03/JCS2022_Azuma.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "lhermitte-sign",
  "name": "Lhermitte徴候(頸部前屈時の電撃痛)",
  "category": "検査法・徴候",
  "aliases": [
   "Lhermitte",
   "Lhermitte徴候",
   "Lhermitte sign",
   "Lhermitte's sign",
   "レルミット徴候",
   "レルミット",
   "Lhermitte現象",
   "barber chair phenomenon"
  ],
  "rows": [
   {
    "item": "Lhermitte徴候とは",
    "target": "多発性硬化症などの頸髄病変",
    "value": "頸部を前屈したときに、電気が走るような感覚(電撃様のしびれ・痛み)が脊柱に沿って下方に広がり、しばしば下肢・上肢・体幹に及ぶ。barber chair phenomenonとも呼ばれる。",
    "exam": "56-pm-44(正答:頸部の前屈により背部中央に走る)／53-am-34(正答:多発性硬化症で頸部前屈により項部から下肢へ電撃痛が放散)／61-am-16(正答:多発性硬化症で起き上がり時に背中から下方へ電撃痛。誤答:Barré徴候・Gowers徴候・Horner徴候・Uhthoff徴候)／54-pm-6(選択肢のみ:Lhermitte徴候=頸部前屈で電撃痛)",
    "q": [
     "56-pm-44",
     "53-am-34",
     "61-am-16",
     "54-pm-6"
    ],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4445188/"
     }
    ]
   },
   {
    "item": "起こる病態と病変部位",
    "target": "原因疾患",
    "value": "多発性硬化症の患者114人中33.3%で経験されたという報告があり、MRIでは頸髄の後索の病変が原因とされる。亜急性連合性脊髄変性症・頸部外傷・頸椎椎間板ヘルニア・放射線脊髄炎などでも起こり、特異的な徴候ではない。",
    "exam": "53-am-34・61-am-16(多発性硬化症の症状として正答)／55-am-17・59-am-31にも選択肢として出題(本カードでは問題文を未確認)",
    "q": [
     "53-am-34",
     "61-am-16"
    ],
    "note": "確認済み[S1]。55-am-17と59-am-31は問題文の詳細をこのカードで確認していないため、問題IDには含めていない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4445188/"
     }
    ]
   },
   {
    "item": "診断の感度・特異度",
    "target": "徴候としての価値",
    "value": "診断の感度は3〜17%と低い。非特異的な圧迫性脊髄症に対する特異度は97%という報告がある。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4445188/"
     }
    ]
   },
   {
    "item": "Uhthoff現象(ウートフ現象)との区別",
    "target": "多発性硬化症の症状",
    "value": "Uhthoff現象は、熱い風呂に入るなどして体温が上がると、MSの症状が一時的に悪くなる現象。Lhermitte徴候は頸部前屈で誘発される電撃様の感覚で、別の徴候。",
    "exam": "61-am-16(誤答選択肢:Uhthoff徴候)",
    "q": [
     "61-am-16"
    ],
    "note": "確認済み[S1][S2]。「体温低下で悪化」は誤りとされる点は、このカードの資料では確認していない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.nanbyou.or.jp/entry/3806"
     },
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4445188/"
     }
    ]
   },
   {
    "item": "灼熱感や視床痛との区別",
    "target": "痛みの性質",
    "value": "Lhermitte徴候の感覚は、焼けるような痛みではなく電撃様。",
    "exam": "57-pm-89(誤答:Lhermitte徴候は痛みとして灼熱感を生じるものではない。正答=視床痛)／55-am-87(視床痛の設問で「Lhermitte徴候がみられる」は誤)",
    "q": [
     "57-pm-89",
     "55-am-87"
    ],
    "note": "確認済み[S1]。視床痛の症状そのものは、このカードの資料では確認していない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4445188/"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "limb-circumference",
  "name": "周径の測定(四肢・断端・下腿周囲長・胸囲)",
  "category": "検査法・徴候",
  "aliases": [
   "四肢周径",
   "大腿周径",
   "下腿周径",
   "下腿周囲長",
   "下腿周囲径",
   "周囲径",
   "断端周径",
   "断端成熟",
   "指輪っかテスト",
   "Yubi-wakka",
   "胸囲",
   "ふくらはぎ周囲長",
   "calf circumference"
  ],
  "rows": [
   {
    "item": "断端周径の測り方(大腿切断・下腿切断)",
    "target": "義足作製前後の断端の形状・浮腫の評価",
    "value": "立位で、ソケット上縁にあたる部位(大腿断端=坐骨結節、下腿断端=膝蓋腱中央)のレベルから5cm間隔で周径を測る。同じ部位を繰り返し測って変化を追う。",
    "exam": "54-pm-33(正答:大腿切断では坐骨結節を基準に計測点を決める。誤答:1か所で計測／下腿切断は最大膨隆部で計測／下腿切断は背臥位で計測／月に2回計測)",
    "q": [
     "54-pm-33"
    ],
    "note": "確認済み[S1]。資料は『5cm間隔で複数点』『下腿は膝蓋腱中央レベルから』『立位』『朝夕の日内変動で追う』としており、国試の誤答(1か所・最大膨隆部・背臥位・月2回)はいずれも資料と合わない。誤答の内容は入力記録の推定を含む。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://jarm.or.jp/lla/document/guidelines.pdf"
     }
    ]
   },
   {
    "item": "胸囲の測定(測る時期・メジャーの当て方)",
    "target": "身体計測(胸囲)",
    "value": "公的な乳幼児の計測手順では、左右の乳頭点を通り体軸に垂直な面に巻尺を回し、強く締めず皮膚面からずり落ちない程度にする。読み取りは自然呼吸で呼気と吸気の中間。1mm単位で記録。",
    "exam": "54-pm-25(正答:安静呼吸の呼気の終わりに測定する)",
    "q": [
     "54-pm-25"
    ],
    "note": "確認済み[S2](対象は乳幼児身体発育調査)。国試の正答は『呼気の終わり』だが、この公的手順は『呼気と吸気の中間』であり食い違う。成人の胸囲の公式手順は今回の資料では確認できていない。",
    "conflict": true,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.mhlw.go.jp/houdou/0110/h1024-4d.html"
     }
    ]
   },
   {
    "item": "指輪っかテスト(下腿周囲の簡易チェック)",
    "target": "サルコペニアのリスクの自己スクリーニング",
    "value": "非利き足の最大ふくらはぎ周囲を、両手の母指と示指でつくった輪と比べる。『ふくらはぎが輪より太い(囲めない)』『ちょうど囲める』『輪が余る(隙間ができる)』の3群に分ける。太い群に比べ、ちょうど囲める群はサルコペニアのオッズ比2.4、隙間群は6.6。",
    "exam": "59-pm-18(正答:サルコペニア。誤答:フレイル・ダイナペニア・ロコモティブシンドローム・コンパートメント症候群。図は未確認で、補助資料から指輪っかテストと推定)",
    "q": [
     "59-pm-18"
    ],
    "note": "確認済み[S3]。簡易な自己スクリーニングで、診断ではない。",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://pubmed.ncbi.nlm.nih.gov/28898523/"
     }
    ]
   },
   {
    "item": "下腿周囲長のカットオフ(AWGS 2019)",
    "target": "サルコペニアのスクリーニング(筋量低下の目安)",
    "value": "男性34cm未満・女性33cm未満(スクリーニングの1つ。ほかにSARC-F 4点以上、SARC-CalF 11点以上)",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S4]。診断そのものではなく、評価に進むかを決める入り口の基準。",
    "conflict": false,
    "sources": [
     {
      "label": "S4",
      "url": "https://pubmed.ncbi.nlm.nih.gov/32033882/"
     }
    ]
   },
   {
    "item": "下腿周囲長と栄養評価(MNA)",
    "target": "高齢者の栄養状態の評価",
    "value": "MNAのふくらはぎの周囲長(CC):31cm未満=0点、31cm以上=1点(MNA完全版の様式)。",
    "exam": "52-pm-50(体重減少率・BMI・血清アルブミン値・下腿周囲径は栄養評価に有用=誤答選択肢。正答は血小板数)",
    "q": [
     "52-pm-50"
    ],
    "note": "確認済み[S5]。下腿周囲径が栄養評価の指標に含まれる点は国試と一致。",
    "conflict": false,
    "sources": [
     {
      "label": "S5",
      "url": "https://www.mna-elderly.com/forms/MNA_japanese.pdf"
     }
    ]
   },
   {
    "item": "四肢周径の測定部位(公的様式)",
    "target": "筋萎縮・浮腫の評価、障害認定",
    "value": "年金の認定様式:上腕・前腕=中央部、大腿=膝蓋骨上縁の上10cm、下腿=最大周径。身体障害者診断書の様式(千葉県):上腕・前腕・下腿=最大周径、大腿=膝蓋骨上縁10cm。",
    "exam": "56-pm-27(正答:メジャーは皮膚に密着させる。誤答:記録は1cm単位／寒い時期は着衣の上から／大腿周径は膝45°屈曲位／下腿周径は後面をベッドに密着)。61-am-20(大腿周径の計測は『共同参加』の例=実習の参加レベルの設問)",
    "q": [
     "56-pm-27",
     "61-am-20"
    ],
    "note": "確認済み[S6][S7]。上腕・前腕は様式により『中央部』と『最大周径』で書き分けがある。メジャーの密着・記録単位・測定肢位は、この2資料には記載がなく確認できていない(56-pm-27の選択肢の正誤は資料では裏づけられない)。",
    "conflict": false,
    "sources": [
     {
      "label": "S6",
      "url": "https://www.nenkin.go.jp/service/jukyu/seido/shougainenkin/ninteikijun/20140604.files/3-1-7-5.pdf"
     },
     {
      "label": "S7",
      "url": "https://www.pref.chiba.lg.jp/shoufuku/techou/documents/04-2shitai0603.pdf"
     }
    ]
   },
   {
    "item": "断端成熟の目安",
    "target": "義足を本作りしてよい状態かの判断",
    "value": "朝夕に同じ部位の周径を測り、日内変動が10mm以内で、その値が約1週間同じで、日内変動が非切断肢側と同程度になったとき成熟と判断。触診で、硬く張った断端が柔らかくなり皮膚にしわが出る状態も目安。安静時周径と圧迫時周径の差は断端軟部組織の柔軟性の指標(絶対値の基準はない)。",
    "exam": "54-pm-33の周辺知識(断端成熟度の確認のための周径計測)",
    "q": [],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://jarm.or.jp/lla/document/guidelines.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "limb-length-measurement",
  "name": "四肢長の測定(上肢長・下肢長・棘果長)",
  "category": "検査法・徴候",
  "aliases": [
   "棘果長",
   "転子果長",
   "下肢長",
   "上肢長",
   "肢長",
   "四肢長",
   "脚長差",
   "SMD",
   "TMD"
  ],
  "rows": [
   {
    "item": "下肢長(棘果長)",
    "target": "下肢長の左右差・脚長差の測定",
    "value": "障害認定で用いる下肢長=上前腸骨棘の尖端から脛骨内果の尖端までの長さ",
    "exam": "56-am-28(棘果長=上前腸骨棘の最下端〜内果の最下端(正答)。転子果長の起点は大転子の最上端。国試の「小転子の最上端〜外果の外側突出点」は誤答)／61-pm-6(棘果長 右84.0 cm・左82.0 cm、転子果長 左右80.5 cm、大腿長44.5 cm、下腿長36.0 cmから左右差の原因部位を考える)",
    "q": [
     "56-am-28",
     "61-pm-6"
    ],
    "note": "確認済み[S1]。日本年金機構の障害認定の測定法で、国試の「最下端」と資料の「尖端」は表現が異なるが同じ骨指標を指すとみられる(確認はしていない)。転子果長・大腿長・下腿長の測定点は資料にない",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.nenkin.go.jp/service/jukyu/seido/shougainenkin/ninteikijun/20140604.files/3-1-7-5.pdf"
     }
    ]
   },
   {
    "item": "上肢長",
    "target": "上肢長の測定",
    "value": "障害認定で用いる上肢長=肩峰の先端から橈骨茎状突起の先端までの長さ",
    "exam": "56-am-28(四肢長の起点・終点=上腕骨外側上顆の外側突出部・大転子の最上端部(正答)。誤答:肩峰の最前端部・上前腸骨棘の最上端など)",
    "q": [
     "56-am-28"
    ],
    "note": "確認済み[S1]。国試の選択肢(上腕骨外側上顆・大転子など)は資料の上肢長(肩峰先端〜橈骨茎状突起先端)とは別の起点で、直接は比較できない",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.nenkin.go.jp/service/jukyu/seido/shougainenkin/ninteikijun/20140604.files/3-1-7-5.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "lipids",
  "name": "脂質異常症の基準(TG・LDL-C・HDL-C)",
  "category": "臨床検査",
  "aliases": [
   "LDL-C",
   "HDL-C",
   "トリグリセライド",
   "中性脂肪",
   "LDLコレステロール",
   "HDLコレステロール"
  ],
  "rows": [
   {
    "item": "トリグリセライド（TG）・LDL-C・HDL-C",
    "target": "脂質異常症",
    "value": "LDL-C 140 mg/dL以上（境界120〜139）、HDL-C 40未満、TG 150以上（空腹時）・175以上（随時）、non-HDL-C 170以上",
    "exam": "57-am-19 問題文 TG 362（基準30〜150）、LDL-C 128（基準70〜139）。61-am-25 正答「有酸素運動でHDL-C増加」（TG、LDL-C、内臓脂肪、IMTは減少）。54-pm-23 正答「持久力運動で中性脂肪低下」",
    "q": [
     "54-pm-23",
     "57-am-19",
     "61-am-25"
    ],
    "note": "確認済み [S5]。57-am-19 の基準範囲（TG 30〜150、LDL 70〜139）は施設値で共用基準範囲 [S1]（TG 男40〜234・女30〜117、LDL 65〜163）と異なる",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jccls.org/wp-content/uploads/2019/10/igakukyouikukijyun.pdf"
     },
     {
      "label": "S5",
      "url": "https://www.j-athero.org/jp/wp-content/uploads/publications/pdf/GL2022_s/jas_gl2022_220808.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-19",
  "review": "ai"
 },
 {
  "slug": "locomo",
  "name": "ロコモ度テスト",
  "category": "診断基準・分類",
  "aliases": [
   "ロコモ度",
   "ロコモティブシンドローム",
   "立ち上がりテスト",
   "2ステップテスト"
  ],
  "rows": [
   {
    "item": "ロコモ度判定（ロコモ度テスト）",
    "target": "ロコモティブシンドローム",
    "value": "ロコモ度1=立ち上がり: 片脚40cmが不可（両脚20cmは可）／2ステップ値1.1以上1.3未満／ロコモ25が7点以上16点未満（いずれか1つ）。ロコモ度2=両脚20cm不可（30cmは可）／2ステップ値0.9以上1.1未満／ロコモ25が16点以上24点未満。ロコモ度3=両脚30cm不可／2ステップ値0.9未満／ロコモ25が24点以上。テスト=立ち上がり・2ステップ・ロコモ25の3つ（ロコモ度は3段階）",
    "exam": "61-pm-23（正答: サルコペニアは一因／誤答: 社会的な脆弱性を含む、ロコモ度には5段階、診断に筋力測定が必須、ロコトレとして閉眼でスクワット）／60-pm-17（問題文: 介護予防のスクリーニングテストの図、正答はロコモティブシンドローム。テスト名は図で判断、図は未確認。誤答: サルコペニア・ダイナペニア・ポストポリオ症候群・メタボ）／56-pm-84（誤答選択肢）",
    "q": [
     "56-pm-84",
     "60-pm-17",
     "61-pm-23"
    ],
    "note": "確認済み(公式): 日本整形外科学会 ロコモチャレンジ！ https://locomo-joa.jp/check/judge を読了。度3追加は2020年（https://locomo-joa.jp/news/info/kzo81mfae075lvuc 、検索結果で確認）。61-pm-23「5段階」は誤り（公式は3段階）で整合。「閉眼でスクワット」「筋力測定が必須」の誤りの根拠は問題DBのみ。2026-11-19",
    "conflict": false,
    "sources": [
     {
      "label": "資料1",
      "url": "https://locomo-joa.jp/check/judge"
     },
     {
      "label": "資料2",
      "url": "https://locomo-joa.jp/news/info/kzo81mfae075lvuc"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-19",
  "review": "ai"
 },
 {
  "slug": "long-term-care-certification",
  "name": "要介護認定・介護保険の仕組み",
  "category": "診断基準・分類",
  "aliases": [
   "介護保険",
   "要介護認定",
   "要介護度",
   "要支援",
   "介護認定審査会",
   "主治医意見書",
   "特定疾病",
   "第1号被保険者",
   "第2号被保険者",
   "第一号被保険者",
   "第二号被保険者",
   "福祉用具貸与"
  ],
  "rows": [
   {
    "item": "被保険者と保険者",
    "target": "介護保険の加入者と運営者",
    "value": "第1号被保険者=65歳以上の者(原因を問わず、要介護・要支援状態になったとき給付)。第2号被保険者=40〜64歳の医療保険加入者(末期がん・関節リウマチなど加齢に起因する疾病=特定疾病が原因の場合に限り給付)。保険者・認定を行うのは市町村。",
    "exam": "58-am-95(誤答:第1号被保険者は75歳以上、都道府県の窓口で申請)／56-am-94(誤答:第二号被保険者の対象年齢は65歳以上、都道府県の担当部署に申請。正答は利用者が自由に事業者を選定できる)／55-am-95(誤答:45歳以上に加入を義務づけ、都道府県に申請)／53-am-95(誤答:申請は都道府県、65歳未満は給付なし)",
    "q": [
     "58-am-95",
     "56-am-94",
     "55-am-95",
     "53-am-95"
    ],
    "note": "確認済み[S1][S2]。40〜64歳も、特定疾病が原因なら給付の対象(「65歳未満は給付なし」は誤り)。「申請の窓口は市町村」は、資料が市町村の調査・認定を示すことからの整理で、窓口の明記までは確認していない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.mhlw.go.jp/content/001512842.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.mhlw.go.jp/topics/kaigo/nintei/gaiyo1.html"
     }
    ]
   },
   {
    "item": "要介護認定の流れ(一次判定・二次判定)",
    "target": "要介護度が決まるまでの手順",
    "value": "申請後、市町村の認定調査員が心身の状況を調査(認定調査)し、主治医意見書とともにコンピュータで一次判定。その結果と主治医意見書などをもとに、保健・医療・福祉の学識経験者による介護認定審査会が審査判定(二次判定)を行い、市町村が認定する。",
    "exam": "58-am-95(正答:介護認定審査会で要介護度を判定する)／56-am-94(誤答:介護度は1次判定で決定される。二次判定で決まる)／55-am-95(正答:要介護度の認定は介護認定審査会で判定される)／53-am-95(正答:要介護認定には主治医意見書が必要。誤答:ケアプランはケアマネジャーのみ)",
    "q": [
     "58-am-95",
     "56-am-94",
     "55-am-95",
     "53-am-95"
    ],
    "note": "確認済み[S1][S2]。介護認定審査会は市町村に設置される。要介護認定は介護サービスの必要度(手間)の判定で、病気の重さと必ずしも一致しない[S3]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.mhlw.go.jp/content/001512842.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.mhlw.go.jp/topics/kaigo/nintei/gaiyo1.html"
     },
     {
      "label": "S3",
      "url": "https://www.mhlw.go.jp/topics/kaigo/nintei/gaiyo2.html"
     }
    ]
   },
   {
    "item": "要介護状態区分と基準時間",
    "target": "要支援・要介護の区分",
    "value": "要支援1・2、要介護1〜5の7区分。一次判定の要介護認定等基準時間:要支援1=25分以上32分未満／要支援2・要介護1=32分以上50分未満／要介護2=50分以上70分未満／要介護3=70分以上90分未満／要介護4=90分以上110分未満／要介護5=110分以上。",
    "exam": "53-am-95(誤答:要支援と要介護を合わせて6段階。実際は7段階)／第51回(要介護2の症例。通所リハビリテーションの目標で優先順位が低いのは家事動作の自立。問題IDは入力になし)",
    "q": [
     "53-am-95"
    ],
    "note": "確認済み[S3]。要支援2と要介護1は基準時間が同じ帯で、状態の維持・改善可能性などを踏まえて分けられる。非該当を含めて8と数える資料の記載は確認していない。基準時間は1分間タイムスタディによる尺度で、実際の介護時間ではない。",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://www.mhlw.go.jp/topics/kaigo/nintei/gaiyo2.html"
     }
    ]
   },
   {
    "item": "特定疾病(16疾病)の範囲",
    "target": "第2号被保険者(40〜64歳)が給付を受けられる疾病",
    "value": "がん(回復の見込みがない状態に限る)／関節リウマチ／筋萎縮性側索硬化症／後縦靱帯骨化症／骨折を伴う骨粗鬆症／初老期における認知症／進行性核上性麻痺・大脳皮質基底核変性症・パーキンソン病／脊髄小脳変性症／脊柱管狭窄症／早老症／多系統萎縮症／糖尿病性神経障害・糖尿病性腎症・糖尿病性網膜症／脳血管疾患／閉塞性動脈硬化症／慢性閉塞性肺疾患／両側の膝関節または股関節に著しい変形を伴う変形性関節症。",
    "exam": "61-pm-47(正答:脊髄小脳変性症・閉塞性動脈硬化症。誤答:拡張型心筋症・間質性肺疾患・変形性肘関節症)／57-pm-95(正答:脊髄小脳変性症・閉塞性動脈硬化症)",
    "q": [
     "61-pm-47",
     "57-pm-95"
    ],
    "note": "確認済み[S3]。変形性関節症は「両側の膝または股関節」に限られるため、肘関節は対象外。16という数は、資料の列挙を数えたもの。",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://www.mhlw.go.jp/topics/kaigo/nintei/gaiyo3.html"
     }
    ]
   },
   {
    "item": "特定疾病に当たらない疾患(国試で誤答になった例)",
    "target": "国試で該当・非該当が問われた疾患の整理",
    "value": "一覧にある:パーキンソン病、慢性閉塞性肺疾患(COPD)、脊髄小脳変性症、閉塞性動脈硬化症。一覧にない:慢性腎不全(糖尿病性腎症は一覧にある)、拡張型心筋症、間質性肺疾患、変形性肘関節症。",
    "exam": "55-am-95(誤答:COPDは特定疾病ではない。COPDは一覧にある)／58-am-95(誤答:特定疾病に慢性腎不全がある)／第50回(正答:Parkinson病。誤答:筋ジストロフィー・多発性硬化症・多発性筋炎・ポリオ後症候群。問題IDは入力になし)",
    "q": [
     "55-am-95",
     "58-am-95"
    ],
    "note": "確認済み[S3]。「特定疾患(難病)」と「特定疾病(介護保険)」は別の制度で、用語に注意。筋ジストロフィー・多発性硬化症・多発性筋炎・ポリオ後症候群が一覧にないことは、列挙の範囲から確認した。",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://www.mhlw.go.jp/topics/kaigo/nintei/gaiyo3.html"
     }
    ]
   },
   {
    "item": "福祉用具貸与(要支援・要介護1の軽度者)",
    "target": "軽度者の給付対象になる用具",
    "value": "貸与の種目は、車いす・特殊寝台・床ずれ防止用具・体位変換器・手すり・スロープ・歩行器・歩行補助つえ・認知症老人徘徊感知機器・移動用リフト・自動排泄処理装置。このうち手すり・スロープ・歩行器・歩行補助つえ以外は、要支援・要介護1では原則給付対象外(状態により例外あり)。2024年4月から、固定用スロープ・歩行器(歩行車を除く)・単点杖(松葉づえを除く)・多点杖は、貸与と販売の選択制。",
    "exam": "60-am-22(要支援1で貸与の給付対象:ウォーカーケインが正答。誤答:T字杖・車椅子・特殊寝台・移動用リフト)",
    "q": [
     "60-am-22"
    ],
    "note": "確認済み[S4][S5]。車椅子・特殊寝台・移動用リフトが原則対象外なのは資料と一致。一方、「T字杖」は誤答だが、資料では歩行補助つえ(単点杖を含む)は貸与の種目で、2024年4月から貸与か販売かを選べる扱い。T字杖=単点杖との対応は本資料に語がなく筆者の推定。ウォーカーケインが正答とされた理由は資料から確認できない。",
    "conflict": true,
    "sources": [
     {
      "label": "S4",
      "url": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000212398.html"
     },
     {
      "label": "S5",
      "url": "https://www.mhlw.go.jp/content/12300000/000875875.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "lung-sounds-auscultation",
  "name": "肺音の聴診(呼吸音・副雑音)",
  "category": "検査法・徴候",
  "aliases": [
   "肺音",
   "呼吸音",
   "副雑音",
   "捻髪音",
   "水泡音",
   "水疱音",
   "笛音",
   "いびき音",
   "断続性副雑音",
   "連続性副雑音",
   "断続性ラ音",
   "連続性ラ音",
   "fine crackles",
   "coarse crackles",
   "crackles",
   "ファインクラックル",
   "コースクラックル",
   "wheeze",
   "wheezes",
   "rhonchi",
   "気管支呼吸音",
   "肺胞呼吸音",
   "気管呼吸音",
   "聴診所見"
  ],
  "rows": [
   {
    "item": "捻髪音(fine crackles)",
    "target": "間質性肺疾患(特発性肺線維症など)の聴診所見",
    "value": "細かく短い高調の断続音(約5ms・約650Hz)。吸気のみで、吸気の中期〜終末に聴かれる。小さな気道が前の呼気で閉じ、吸気で突然開く音。体位変換で変わるが、咳では変わらず、口元では聴こえない。肺底部から始まりやすい。間質性肺疾患・心不全の初期で聴かれる。特発性肺線維症(IPF)では吸気の早い時期から始まり吸気終末まで続くことがある。",
    "exam": "56-pm-91(IPF:胸部で捻髪音を聴取することが多いが正答。誤答:閉塞性換気障害を示す(拘束性)、湿性咳嗽が主症状(乾性咳嗽))／59-pm-41(間質性肺疾患でコースクラックル(水泡音)を聴取は誤)／59-am-37(ファインクラックルを聴取したので吸引するは誤)／55-am-24(捻髪音(fine crackles)は呼気は誤。吸気)／53-am-35(COPDで胸部聴診の捻髪音は誤答)／第49回(間質性肺炎の聴診が水泡音は誤。捻髪音)",
    "q": [
     "56-pm-91",
     "59-pm-41",
     "59-am-37",
     "55-am-24",
     "53-am-35"
    ],
    "note": "確認済み[S1][S2]。「吸引しない」理由は、捻髪音が気道分泌物ではなく小さな気道の開放で生じる音であること[S1]から整理できる(吸引の適否そのものを書いた記述は未確認)。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4518345"
     },
     {
      "label": "S2",
      "url": "https://www.msdmanuals.com/ja-jp/professional/05-%E8%82%BA%E7%96%BE%E6%82%A3/%E8%82%BA%E7%96%BE%E6%82%A3%E3%82%92%E6%9C%89%E3%81%99%E3%82%8B%E6%82%A3%E8%80%85%E3%81%B8%E3%81%AE%E3%82%A2%E3%83%97%E3%83%AD%E3%83%BC%E3%83%81/%E8%82%BA%E7%96%BE%E6%82%A3%E6%82%A3%E8%80%85%E3%81%AE%E8%A9%95%E4%BE%A1"
     }
    ]
   },
   {
    "item": "水泡音(coarse crackles)",
    "target": "気道分泌物・肺水腫・慢性気管支炎など",
    "value": "大きく低調の断続音(約15ms・約350Hz)。吸気が中心だが呼気にも聴かれ、部位は一定しない。咳で変わるが体位変換では変わらず、口元でも聴こえる。気道を空気が通るとき断続的に開閉する音で、慢性気管支炎・重度の肺水腫で聴かれる。MSDでは、虚脱した気道・肺胞が開くことを示し、無気肺・肺水腫・間質性肺疾患で聴かれるとされる。",
    "exam": "52-am-12(嚥下障害患者の胸部X線から予想される所見=右胸部聴診で水疱音が正答。誤答:胸痛・乾性咳嗽・頸静脈怒張・右胸部打診で鼓音)／53-pm-76(体温38.5℃、右下肺野に水泡音→大葉性肺炎)／第50回(誤嚥性肺炎で左胸部に肺胞呼吸音、右胸部に水泡音)",
    "q": [
     "52-am-12",
     "53-pm-76"
    ],
    "note": "確認済み[S1][S2]。[S1]は肺炎でもcracklesが聴かれると述べるが、肺炎が粗い音か細かい音かの区別までは書いていない。国試の「肺炎=水泡音」は[S1]と矛盾しないが、その区別自体は今回未確認。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4518345"
     },
     {
      "label": "S2",
      "url": "https://www.msdmanuals.com/ja-jp/professional/05-%E8%82%BA%E7%96%BE%E6%82%A3/%E8%82%BA%E7%96%BE%E6%82%A3%E3%82%92%E6%9C%89%E3%81%99%E3%82%8B%E6%82%A3%E8%80%85%E3%81%B8%E3%81%AE%E3%82%A2%E3%83%97%E3%83%AD%E3%83%BC%E3%83%81/%E8%82%BA%E7%96%BE%E6%82%A3%E6%82%A3%E8%80%85%E3%81%AE%E8%A9%95%E4%BE%A1"
     }
    ]
   },
   {
    "item": "笛音(wheeze)・いびき音(rhonchi)",
    "target": "気道狭窄(喘息・COPDなど)の聴診所見",
    "value": "連続性の副雑音(約250ms以上続く)。笛音=高調(主な周波数400Hz以上)で、多くは呼気に強いが、吸気や両相にも聴かれる。いびき音=低調(約200Hz以下、150Hz前後のいびきのような音)。喘息・COPDでは胸部全体で笛音が聴かれ、異物・粘液栓・腫瘍による局所的な閉塞では局所の笛音になる。MSDでは笛音は吸気より呼気で増強し、末梢気道の狭小化に関連、いびき音は慢性気管支炎などの気道病変で聴かれるとされる。",
    "exam": "55-am-24(笛音(wheezes)は吸気初期に聴かれるは誤答)",
    "q": [
     "55-am-24"
    ],
    "note": "確認済み[S1][S2]。笛音は呼気に強いことが多いが、吸気・両相のこともある[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4518345"
     },
     {
      "label": "S2",
      "url": "https://www.msdmanuals.com/ja-jp/professional/05-%E8%82%BA%E7%96%BE%E6%82%A3/%E8%82%BA%E7%96%BE%E6%82%A3%E3%82%92%E6%9C%89%E3%81%99%E3%82%8B%E6%82%A3%E8%80%85%E3%81%B8%E3%81%AE%E3%82%A2%E3%83%97%E3%83%AD%E3%83%BC%E3%83%81/%E8%82%BA%E7%96%BE%E6%82%A3%E6%82%A3%E8%80%85%E3%81%AE%E8%A9%95%E4%BE%A1"
     }
    ]
   },
   {
    "item": "気管支呼吸音・肺胞呼吸音(正常と異常な聴取)",
    "target": "正常呼吸音の区別、肺の硬化(肺炎)の所見",
    "value": "肺胞呼吸音(vesicular)=肺野の大半で聴かれる正常な音で、吸気:呼気の長さは約3:1。気管支呼吸音=大きく硬い高調の音で、吸気より呼気が長い(吸気:呼気は約1:2)。正常では胸骨柄の前面や背部のC7〜T3の間で聴かれ、肺野末梢で聴こえるのは異常で、肺炎などの肺の硬化で聴かれる。",
    "exam": "55-am-24(気管支呼吸音は吸気のみ・肺胞呼吸音は呼気終末に強くなるは誤答)／第50回(誤嚥性肺炎で左胸部に肺胞呼吸音=正常側)",
    "q": [
     "55-am-24"
    ],
    "note": "確認済み[S1][S2]。「吸気のみ」「呼気終末に強い」を誤りとする国試の扱いと矛盾しない(気管支呼吸音は吸気・呼気の両相があり呼気が長い)。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4518345"
     },
     {
      "label": "S2",
      "url": "https://www.msdmanuals.com/ja-jp/professional/05-%E8%82%BA%E7%96%BE%E6%82%A3/%E8%82%BA%E7%96%BE%E6%82%A3%E3%82%92%E6%9C%89%E3%81%99%E3%82%8B%E6%82%A3%E8%80%85%E3%81%B8%E3%81%AE%E3%82%A2%E3%83%97%E3%83%AD%E3%83%BC%E3%83%81/%E8%82%BA%E7%96%BE%E6%82%A3%E6%82%A3%E8%80%85%E3%81%AE%E8%A9%95%E4%BE%A1"
     }
    ]
   },
   {
    "item": "気管呼吸音",
    "target": "正常呼吸音の吸気・呼気の関係",
    "value": "気管の上で聴かれる、硬く非常に大きい高調の音。吸気と呼気の両相があり、両者は同程度で、間に明らかな切れ目がある。",
    "exam": "55-am-24(正答:気管呼吸音は吸気より呼気の方が大きい)",
    "q": [
     "55-am-24"
    ],
    "note": "国試の正答「呼気の方が大きい」と、この資料の「両相は同程度」が食い違う。呼気が大きい・長いとする別の資料は今回確認できていない。[S1]は国外の総説。国試は日本の教科書の記載に沿った出題の可能性があり、判断は教科書で。",
    "conflict": true,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4518345"
     }
    ]
   },
   {
    "item": "呼吸音の減弱・消失(COPDなど)",
    "target": "COPD・胸水・気胸などの聴診所見",
    "value": "呼吸音は、換気が浅い・気道閉塞・気腫性の嚢胞(ブラ)・過膨張・気胸・胸水や胸膜の肥厚・肥満で弱くなる。MSDでは、気道内の空気の動きが減る状態(喘息・COPD、胸水、気胸、気管支内の閉塞性病変)で減弱するとされる。COPDではcracklesは少なく、吸気の早期に出て、重い気道閉塞と関連する。喘息・慢性気管支炎では呼気延長を伴う肺胞呼吸音になることがある。",
    "exam": "53-am-35(COPDの身体所見=呼吸音低下が正答。誤答:乾性咳嗽、肺野打診での濁音、胸郭柔軟性の増加、胸部聴診での捻髪音)",
    "q": [
     "53-am-35"
    ],
    "note": "確認済み[S1][S2]。COPDで「濁音」「胸郭柔軟性の増加」「乾性咳嗽」が誤りという点は、この資料では直接確認していない(濁音は液体や硬化を示すとされる[S2])。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4518345"
     },
     {
      "label": "S2",
      "url": "https://www.msdmanuals.com/ja-jp/professional/05-%E8%82%BA%E7%96%BE%E6%82%A3/%E8%82%BA%E7%96%BE%E6%82%A3%E3%82%92%E6%9C%89%E3%81%99%E3%82%8B%E6%82%A3%E8%80%85%E3%81%B8%E3%81%AE%E3%82%A2%E3%83%97%E3%83%AD%E3%83%BC%E3%83%81/%E8%82%BA%E7%96%BE%E6%82%A3%E6%82%A3%E8%80%85%E3%81%AE%E8%A9%95%E4%BE%A1"
     }
    ]
   },
   {
    "item": "打診での濁音",
    "target": "胸水・肺の硬化の所見",
    "value": "濁音は、その下に液体または硬化があることを示す。胸水の有無と程度の評価で最も重要な手技とされる。",
    "exam": "52-am-12(誤嚥性肺炎の理学所見で、右胸部打診で鼓音は誤答)／53-am-35(COPDで肺野打診での濁音は誤答)",
    "q": [
     "52-am-12",
     "53-am-35"
    ],
    "note": "確認済み[S1]。鼓音・過共鳴(気胸など)の記載は[S1]に無く、未確認のため書かない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/05-%E8%82%BA%E7%96%BE%E6%82%A3/%E8%82%BA%E7%96%BE%E6%82%A3%E3%82%92%E6%9C%89%E3%81%99%E3%82%8B%E6%82%A3%E8%80%85%E3%81%B8%E3%81%AE%E3%82%A2%E3%83%97%E3%83%AD%E3%83%BC%E3%83%81/%E8%82%BA%E7%96%BE%E6%82%A3%E6%82%A3%E8%80%85%E3%81%AE%E8%A9%95%E4%BE%A1"
     }
    ]
   },
   {
    "item": "副雑音の分類(断続性・連続性)",
    "target": "聴診用語の整理",
    "value": "断続性の音=crackles(細かい捻髪音fine・粗い水泡音coarse)、連続性の音=wheeze(笛音)・rhonchi(いびき音)。連続性副雑音は約250ms以上続く。副雑音には他に、squeak(squawk)、胸膜摩擦音、stridor(吸気性喘鳴)がある。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4518345"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "lvef",
  "name": "左室駆出率(LVEF)",
  "category": "臨床検査",
  "aliases": [
   "LVEF",
   "左室駆出率",
   "EF"
  ],
  "rows": [
   {
    "item": "左室駆出率（LVEF）",
    "target": "心不全の分類",
    "value": "2017・2021年版: HFrEF 40%未満、HFmrEF 40〜49%、HFpEF 50%以上。2025年改訂版: HFrEF 40%以下、HFmrEF 41〜49%、HFpEF 50%以上",
    "exam": "60-pm-4 問題文 LVEF<40%（急性心筋梗塞、低左心機能）。52-am-93 誤答「運動療法でLVEF増加」。55-am-42 誤答「運動療法でLVEFが低下」",
    "q": [
     "52-am-93",
     "55-am-42",
     "60-pm-4"
    ],
    "note": "確認済み [S11][S12]。60-pm-4 の「40%未満」は2017年版と一致、2025年版（40%以下）とは境界が異なる",
    "conflict": false,
    "sources": [
     {
      "label": "S11",
      "url": "https://jscvs.or.jp/wp-content/uploads/2020/06/JCS2017_tsutsui_ooriginal_190830.pdf"
     },
     {
      "label": "S12",
      "url": "https://www.jstage.jst.go.jp/article/numa/84/5/84_189/_pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-19",
  "review": "ai"
 },
 {
  "slug": "mcmurray-test",
  "name": "McMurrayテスト",
  "category": "検査法・徴候",
  "aliases": [
   "McMurray test",
   "McMurray's test",
   "McMurray徴候",
   "マクマレーテスト",
   "マックマレーテスト",
   "マクマレー試験"
  ],
  "rows": [
   {
    "item": "McMurrayテストの手技",
    "target": "半月板損傷(後節)",
    "value": "仰臥位で膝を最大屈曲し、踵を持って下腿を回旋させ、屈曲位から直角付近まで膝を戻す。足を外旋位で行うと内側半月板、内旋位で外側半月板後部を調べる。屈曲角度を変えると後節全体を調べられる",
    "exam": "54-pm-3(図の検査名=McMurray)／54-pm-4(陽性で疑う病態=半月板損傷)／61-am-30(正答)／53-pm-12(選択肢の説明: 半月板)／49〜51回(半月板損傷の検査として問われる)",
    "q": [
     "54-pm-3",
     "54-pm-4",
     "61-am-30",
     "53-pm-12"
    ],
    "note": "確認済み[S1](1940年の原法の記述)。国試では「半月板損傷」と対応づけて出る。判定は関節内のクリック(snap)で、原法は回旋時の音を重視",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC2796951/"
     }
    ]
   },
   {
    "item": "陽性の判定",
    "target": "半月板損傷の所見",
    "value": "操作中に関節内でクリック(snap)が触れる・聞こえる。損傷した半月板では、患者が以前に膝が外れた(ひっかかった)ときと同じ感覚だと答える。正常だが緩い半月でクリックが出ても、痛みや不快感は伴わない",
    "exam": "59-am-4(膝捻挫後、内側・膝窩部痛でMcMurray陽性、X線異常なし→次に確認する検査を問う。入力の記録ではMRI)",
    "q": [
     "59-am-4"
    ],
    "note": "確認済み[S1]。「次にMRI」という選択は本資料では確認できなかった(原著レビューは診断精度の限界を述べる)",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC2796951/"
     }
    ]
   },
   {
    "item": "診断精度",
    "target": "臨床での使い方",
    "value": "感度は報告により約20〜70%と幅があり、特異度は約70〜90%台と比較的高い。感度が低いため、単独では臨床診断に限界があるとされ、関節裂隙の圧痛など他の所見や画像と合わせて判断する。外側半月板では、内旋時の外側関節裂隙痛の陽性的中率が29%にとどまった報告もある",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。数値は研究ごとの報告値で、基準値ではない",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC2796951/"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "medullary-brainstem-syndromes",
  "name": "延髄・脳幹症候群(Wallenberg・MLF・Brown-Séquard)",
  "category": "検査法・徴候",
  "aliases": [
   "Wallenberg症候群",
   "Wallenberg",
   "ワレンベルグ症候群",
   "延髄外側症候群",
   "延髄外側梗塞",
   "外側延髄症候群",
   "lateral medullary syndrome",
   "PICA症候群",
   "側方突進",
   "lateropulsion",
   "延髄内側症候群",
   "medial medullary syndrome",
   "Dejerine症候群",
   "内側縦束症候群",
   "MLF症候群",
   "核間性眼筋麻痺",
   "internuclear ophthalmoplegia",
   "Brown-Sequard症候群",
   "ブラウン・セカール症候群",
   "脊髄半側損傷"
  ],
  "rows": [
   {
    "item": "延髄外側(Wallenberg)症候群の症候と側性",
    "target": "病巣側・反対側の症候を組み合わせて答える",
    "value": "病巣と同側:顔面の温痛覚脱失(三叉神経脊髄路と核)、Horner症候群(延髄網様体を下る交感神経路)、上下肢の小脳性運動失調(脊髄小脳路)、迷走神経麻痺による嚥下障害・嗄声・カーテン徴候、めまい・嘔吐と病巣側への突進(lateropulsion。前庭神経核)。病巣と反対側:外側脊髄視床路の障害による上下肢の温痛覚低下。運動麻痺と深部感覚障害は認められないことが診断のポイント。",
    "exam": "54-pm-43(左延髄外側症候群で正しいもの=右上下肢の温痛覚障害。誤答:右Horner徴候・右角膜反射低下・右上下肢の運動失調・右上下肢の深部感覚障害)／49-pm-5(右の小脳性失調・Horner症候群・顔面温痛覚障害+左上下肢温痛覚障害・深部感覚保たれる→右延髄外側)／49-pm-6(立位でpulsionが出る方向=病巣側)／50-pm-25(右延髄背外側の脳梗塞で認められるのは右下肢の運動失調)／52-am-50(側方突進の責任病巣=延髄外側部)／第51回(右PICA閉塞でみられないのは右片麻痺。右眼瞼下垂(Horner)・右小脳性運動失調・右顔面温痛覚障害・左上下肢温痛覚障害はみられる)",
    "q": [
     "54-pm-43",
     "49-pm-5",
     "49-pm-6",
     "50-pm-25",
     "52-am-50"
    ],
    "note": "確認済み[S1]。国試の正答・誤答はこの整理と一致。[S1]は「上下肢」の温痛覚低下と書く(体幹を含むかの記載は無い)。第50回pm-5(55歳男性・突然のめまい・左下肢の深部感覚低下が正答)は図が未確認で、外側症候群なら深部感覚は保たれるのが原則のため、病巣が外側以外の可能性がある。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.igaku-shoin.co.jp/seigo/00601/p146_5-1.pdf"
     }
    ]
   },
   {
    "item": "延髄外側症候群の責任血管",
    "target": "Wallenberg症候群の原因血管",
    "value": "延髄外側は主に後下小脳動脈(PICA)の延髄外側枝が栄養し、PICAは椎骨動脈から出る。PICA閉塞が代表的な原因だが、純粋な延髄外側梗塞130例の血管造影では椎骨動脈の病変が67%、PICAの病変は10%だった。原因として動脈硬化・高血圧、まれに椎骨動脈解離。",
    "exam": "第51回(右PICA閉塞=Wallenberg症候群の症候の組合せ)",
    "q": [],
    "note": "確認済み[S1][S2]。PICA閉塞=典型例という国試の扱いと、実際の画像研究で椎骨動脈病変が多い点には違いがあるが、設問上はPICA症候群として答える。[S1]は眼科の解説サイト。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://eyewiki.org/Wallenberg_Syndrome"
     },
     {
      "label": "S2",
      "url": "https://pubmed.ncbi.nlm.nih.gov/12805095/"
     }
    ]
   },
   {
    "item": "延髄内側症候群・舌下神経核(舌の運動障害)",
    "target": "延髄内側の障害で出る症候と、舌の運動を支配する核の位置",
    "value": "延髄内側の主な構造は錐体、内側毛帯、舌下神経核、内側縦束で、前脊髄動脈の傍正中枝などが栄養する。内側の梗塞(Dejerine症候群)の報告例では、病巣と反対側の顔面を免れる片麻痺、反対側の触覚・深部感覚の低下、病巣側の舌麻痺がみられた。舌下神経核とその根は延髄にある。",
    "exam": "52-am-27(延髄の障害でみられやすい症状=舌の運動障害が正答。誤答:兎眼・眼瞼下垂・共同偏視・対光反射の障害)／49-pm-54(舌の運動を支配する神経の神経核=延髄)",
    "q": [
     "52-am-27",
     "49-pm-54"
    ],
    "note": "確認済み[S1][S2][S3]。症候は1例報告[S2]に基づく。兎眼は顔面神経、眼瞼下垂・対光反射は動眼神経(中脳)、共同偏視は前頭眼野などの病変で起こる、という国試側の整理は、この資料では直接確認していない(下位脳神経の検査は脳神経カード参照)。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pubmed.ncbi.nlm.nih.gov/32809425/"
     },
     {
      "label": "S2",
      "url": "https://www.jstage.jst.go.jp/article/jstroke1979/12/2/12_2_116/_article/-char/en"
     },
     {
      "label": "S3",
      "url": "https://www.igaku-shoin.co.jp/seigo/00601/p146_5-1.pdf"
     }
    ]
   },
   {
    "item": "内側縦束(MLF)症候群(核間性眼筋麻痺)",
    "target": "MLF障害でみられる眼球運動障害と病巣の部位",
    "value": "内側縦束(MLF)の病変で起こる眼球運動障害(核間性眼筋麻痺)。病変側の眼の内転障害と、外転する側の眼の眼振が特徴。MLFは脳幹の内側にある線維束(延髄内側の構造にも挙げられる)。",
    "exam": "56-am-82(誤答選択肢:内側縦束症候群は後頭葉の障害は誤り。脳幹の障害)",
    "q": [
     "56-am-82"
    ],
    "note": "確認済み[S1][S2]。「後頭葉ではなく脳幹」という国試の扱いと一致。MLFが橋に主に位置するなど細かい位置は今回の資料では確認していない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pubmed.ncbi.nlm.nih.gov/28722999/"
     },
     {
      "label": "S2",
      "url": "https://pubmed.ncbi.nlm.nih.gov/32809425/"
     }
    ]
   },
   {
    "item": "Brown-Séquard症候群",
    "target": "脊髄半側損傷の症候(脳幹症候群との区別)",
    "value": "脊髄の半側損傷による不全型の脊髄症候群。損傷と同側に筋力低下・麻痺と固有感覚・振動覚の消失、反対側に温痛覚の消失が出る。症状の程度は損傷部位や機序で異なる。",
    "exam": "56-pm-44(誤答選択肢:Brown-Séquard症候群は両側の横断性の損傷は誤り。脊髄の片側(半側)損傷)",
    "q": [
     "56-pm-44"
    ],
    "note": "確認済み[S1]。国試の扱いと一致。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pubmed.ncbi.nlm.nih.gov/30844162/"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "metabolic-syndrome",
  "name": "メタボリックシンドロームの診断基準",
  "category": "診断基準・分類",
  "aliases": [
   "メタボリックシンドローム",
   "メタボ"
  ],
  "rows": [
   {
    "item": "メタボリックシンドローム診断基準（8学会、2005）",
    "target": "内臓脂肪型肥満＋代謝異常",
    "value": "腹囲 男性85cm以上・女性90cm以上（必須。内臓脂肪面積100cm²に相当）＋以下の2項目以上: ①中性脂肪150mg/dL以上 かつ/または HDL-C 40mg/dL未満 ②収縮期血圧130mmHg以上 かつ/または 拡張期85mmHg以上 ③空腹時血糖110mg/dL以上。LDL-Cは含まれない",
    "exam": "53-pm-93（問題文・正答: 含まれない=LDLコレステロール。含まれる=中性脂肪・空腹時血糖・収縮期血圧・ウエスト周囲径）／61-am-18（問題文: 58歳男性、腹囲120cm・血圧150/90、正答は自転車エルゴメーター）／56-pm-84（誤答選択肢: メタボリックシンドローム=筋量減少は診断基準に含まれない）／60-pm-17（誤答選択肢）／56-am-23（正答: メタボの予防教育=一次予防）",
    "q": [
     "53-pm-93",
     "56-am-23",
     "56-pm-84",
     "60-pm-17",
     "61-am-18"
    ],
    "note": "確認済み(公式): 厚労省 検討会資料「メタボリックシンドローム及び関連疾患に関する検査方法について」（平成17年）https://www.mhlw.go.jp/shingi/2005/08/s0826-9d.html を読了（HDLは抽出結果が「≤40」、学会基準は「40未満」と理解、原文表記は未確認）。腹囲の男女値は e-ヘルスネット https://kennet.mhlw.go.jp/information/information/metabolic-summaries/m-01.html でも確認（ページに血圧・脂質・血糖の数値表は無し）。特定健診の保健指導判定値（血糖の基準が異なる可能性）は未確認。改訂の有無は確認できず。2026-11-19",
    "conflict": false,
    "sources": [
     {
      "label": "資料1",
      "url": "https://www.mhlw.go.jp/shingi/2005/08/s0826-9d.html"
     },
     {
      "label": "資料2",
      "url": "https://kennet.mhlw.go.jp/information/information/metabolic-summaries/m-01.html"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-19",
  "review": "ai"
 },
 {
  "slug": "mets",
  "name": "METs(代謝当量)",
  "category": "リスク管理",
  "aliases": [
   "METs",
   "メッツ",
   "代謝当量"
  ],
  "rows": [
   {
    "item": "代謝当量（METs）",
    "target": "運動強度、心肺運動負荷試験",
    "value": "1 MET=3.5 mL/kg/分（メッツ値×3.5＝最高酸素摂取量 mL/kg/分）",
    "exam": "57-am-69 正答「1MET=3.5 mL/kg/分」。59-am-5 問題文 1 MET=3.5 mL/min/kg（AT 約6 METs）。56-pm-11 問題文 最高酸素摂取量2,625 mL/分（体重90kg）の60%→5 METs（正答）",
    "q": [
     "56-pm-11",
     "57-am-69",
     "59-am-5"
    ],
    "note": "確認済み [S28]",
    "conflict": false,
    "sources": [
     {
      "label": "S28",
      "url": "https://www.mhlw.go.jp/content/001194020.pdf"
     }
    ]
   },
   {
    "item": "1 MET の定義",
    "target": "エネルギー代謝・METs",
    "value": "1 MET=安静時(安静座位)のVO2=3.5 mL/kg/分。安静臥位・基礎代謝を基準にするのは誤り",
    "exam": "59-am-5 問題文 1 METの酸素摂取量=3.5 mL/min/kg／59-am-69 誤答選択肢「METsは基礎代謝量を基準」「RMRは安静時代謝量を基準」／52-pm-69 誤答選択肢「MET(代謝当量)は安静臥位基準」／54-am-69 正答(誤りの選択肢)「METは安静臥位時の代謝量を基準」／61-am-68 誤答選択肢「METsは作業時代謝量と安静時代謝量の差で表す」",
    "q": [
     "52-pm-69",
     "54-am-69",
     "59-am-5",
     "59-am-69",
     "61-am-68"
    ],
    "note": "確認済み(S1 定義, S8 METsの定義: 安静座位時を1メッツ, 2026-11-19)。臥位・差で表す、が誤りである点も整合",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2021/03/JCS2021_Makita.pdf"
     },
     {
      "label": "S8",
      "url": "https://www.mhlw.go.jp/content/001194020.pdf"
     }
    ]
   },
   {
    "item": "METsとエネルギー消費量の式",
    "target": "運動処方・消費kcal",
    "value": "国試の式: 消費kcal=1.05×METs×時間×体重(kg)。例 3 METs・1時間・60 kg=約189 kcal、5 METs・0.5時間・80 kg=210 kcal。現行ガイド2023の式: METs×時間×体重(kg)(1.05を掛けない)。この式だと3×1×60=180、5×0.5×80=200 kcal",
    "exam": "58-pm-13 正答190 kcal(選択肢190〜350)／60-am-4 正答210 kcal(選択肢110/160/210/260/310)",
    "q": [
     "58-pm-13",
     "60-am-4"
    ],
    "note": "確認済み(式の形はS8 欄外注, 2026-11-19)。食い違い: 国試は1.05を含む式で正答が決まるが、現行ガイド2023の式は1.05を含まず、国試の選択肢には180・200 kcalが無い。1.05の出典(2013基準・旧運動指針の資料)は未取得で未確認",
    "conflict": true,
    "sources": [
     {
      "label": "S8",
      "url": "https://www.mhlw.go.jp/content/001194020.pdf"
     }
    ]
   },
   {
    "item": "歩行のMETs(通常歩行4 km/h)",
    "target": "身体活動の強度",
    "value": "普通歩行(平地, 67 m/分(≒4 km/h))=3.0 METs。国試の正答区分「3〜4 METs」",
    "exam": "54-pm-69 正答「通常歩行(4 km/h)の代謝当量=3〜4 METs」。誤答選択肢=1〜2・5〜6・7〜8・9〜10 METs",
    "q": [
     "54-pm-69"
    ],
    "note": "確認済み(S8 METs表(参考資料), 2026-11-19)。3.0は国試の区分3〜4の範囲に含まれ整合",
    "conflict": false,
    "sources": [
     {
      "label": "S8",
      "url": "https://www.mhlw.go.jp/content/001194020.pdf"
     }
    ]
   },
   {
    "item": "歩行80 m/分のMETs",
    "target": "身体活動の強度",
    "value": "歩行(平地, 75〜85 m/分, ほどほどの速さ)=3.5 METs",
    "exam": "55-pm-48 正答「3.5 METs」。誤答選択肢=1.5・5.0・6.0・7.0 METs",
    "q": [
     "55-pm-48"
    ],
    "note": "確認済み(S8 METs表(参考資料), 2026-11-19)",
    "conflict": false,
    "sources": [
     {
      "label": "S8",
      "url": "https://www.mhlw.go.jp/content/001194020.pdf"
     }
    ]
   },
   {
    "item": "身体活動基準: 強度別の活動例(METs)",
    "target": "健康づくり・身体活動基準2013",
    "value": "4.0 METs=ラジオ体操第1(卓球・パワーヨガ)。3.0 METs未満の例: 立位・皿洗い=1.8／子どもを抱えながら立つ=2.0／ピアノの演奏=2.3／植物への水やり=2.5。3 METs以上=中強度(3〜5.9)、6以上=高強度、座位行動=1.5 METs以下",
    "exam": "58-am-25「身体活動基準2013で強度が4 METs以上となる運動の例」: 正答=ラジオ体操第1。誤答選択肢=皿洗い・ピアノ・植物への水やり・子供を抱えながら立つ",
    "q": [
     "58-am-25"
    ],
    "note": "確認済み(S8 METs表, 2026-11-19)。2013年版の元の表は未取得で、現行(ガイド2023, 国立健康・栄養研究所2011改訂版ベース)の値で照合。成人推奨: 3 METs以上を週23 METs・時以上、運動は週4 METs・時以上(2023年版)",
    "conflict": false,
    "sources": [
     {
      "label": "S8",
      "url": "https://www.mhlw.go.jp/content/001194020.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-19",
  "review": "ai"
 },
 {
  "slug": "mi-exercise",
  "name": "心筋梗塞後の運動療法",
  "category": "リスク管理",
  "aliases": [],
  "rows": [
   {
    "item": "心筋梗塞後の在宅運動(頻度・時間・強度)",
    "target": "急性心筋梗塞(PCI後・退院後)",
    "value": "有酸素運動: 頻度 中強度は週5日以上(≧5日)、高強度は週3〜5日。1回 中強度30〜60分。強度 Borg 12〜13(または 40〜59% HRR)。拡張期血圧>110 mmHg は運動禁忌の目安(重症高血圧)",
    "exam": "60-am-18 正答=Borg指数11〜13。誤答選択肢=運動頻度は週2回以内・1回10分以下・拡張期血圧120 mmHgでは運動が可能・運動強度は最高酸素摂取量の10〜20%／52-pm-43 正答=週3日以上の有酸素運動。誤答選択肢=Borg 16・1日10分程度のジョギング・等尺性収縮・心拍数を増加させない",
    "q": [
     "52-pm-43",
     "60-am-18"
    ],
    "note": "確認済み(S1 表17・表25 *1, 2026-11-19)。食い違い: 52-pm-43の正答「週3日以上」は、表17の中強度「週5日以上」と数値が異なる(心不全は週3〜5回)。誤答は表の範囲外で整合(10〜20%は低強度未満)",
    "conflict": true,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2021/03/JCS2021_Makita.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-19",
  "review": "ai"
 },
 {
  "slug": "mmpi",
  "name": "MMPI(ミネソタ多面人格目録)",
  "category": "評価尺度",
  "aliases": [
   "MMPI",
   "MMPI-2",
   "ミネソタ多面人格目録",
   "ミネソタ多面人格検査",
   "Minnesota Multiphasic Personality Inventory"
  ],
  "rows": [
   {
    "item": "MMPIの分類",
    "target": "心理検査の種類(質問紙法)",
    "value": "あらかじめ決められた質問に「はい・いいえ・どちらともいえない」で答える質問紙法の人格検査。投影法(ロールシャッハ・SCT・TATなど)や作業検査法(クレペリンなど)とは別の種類",
    "exam": "57-am-81(正答: 質問紙法)／59-am-78(誤答選択肢: 質問紙法の説明)／54-am-81(選択肢: HTP・MMPI・P-Fスタディ・ASQ)／51回(投影法ではない)",
    "q": [
     "57-am-81",
     "59-am-78",
     "54-am-81"
    ],
    "note": "確認済み[S2][S4]",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://kompas.hosp.keio.ac.jp/exam/000388/"
     },
     {
      "label": "S4",
      "url": "https://crd.ndl.go.jp/reference/entry/index.php?page=ref_view&id=1000221958"
     }
    ]
   },
   {
    "item": "MMPIの構成",
    "target": "人格・精神病理の検査",
    "value": "Hathaway と McKinley が開発。質問項目は550。精神疾患名に対応する10の臨床尺度と、回答の歪曲を調べる妥当性尺度(疑問尺度を含め4つ)からなる。好人物に見せかけたり症状を過大に見せたりする回答を妥当性尺度で検出できる。項目が多く労力がかかり、分析が複雑という短所がある",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1][S3]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://tk.seitoku-u.ac.jp/cms_tk_seitoku/wp-content/uploads/2024/12/%E8%81%96%E5%BE%B3%E5%A4%A7%E5%AD%A6%E5%85%AC%E8%AA%8D%E5%BF%83%E7%90%86%E5%B8%AB%E5%85%A5%E5%AD%A6%E8%AA%AC%E6%98%8E%E4%BC%9A%E6%A8%A1%E6%93%AC%E8%AC%9B%E7%BE%A9%E3%83%91%E3%83%BC%E3%82%BD%E3%83%8A%E3%83%AA%E3%83%86%E3%82%A3%E6%A4%9C%E6%9F%BB.pdf"
     },
     {
      "label": "S3",
      "url": "https://hyogo-u.repo.nii.ac.jp/record/3531/files/iwai_2008_05_rp.pdf"
     }
    ]
   },
   {
    "item": "評価対象ではないもの",
    "target": "出題での誤りの選択肢",
    "value": "MMPIは人格・精神病理を測る検査で、脳卒中の身体機能評価や前頭葉機能検査ではない。心理検査は診断の補助資料として用いる",
    "exam": "59-am-91(誤答: 脳卒中の身体機能評価)／49回(前頭葉機能検査ではない)",
    "q": [
     "59-am-91"
    ],
    "note": "確認済み[S1][S2]。「身体機能評価・前頭葉機能検査ではない」は、MMPIが人格検査であることからの整理",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://tk.seitoku-u.ac.jp/cms_tk_seitoku/wp-content/uploads/2024/12/%E8%81%96%E5%BE%B3%E5%A4%A7%E5%AD%A6%E5%85%AC%E8%AA%8D%E5%BF%83%E7%90%86%E5%B8%AB%E5%85%A5%E5%AD%A6%E8%AA%AC%E6%98%8E%E4%BC%9A%E6%A8%A1%E6%93%AC%E8%AC%9B%E7%BE%A9%E3%83%91%E3%83%BC%E3%82%BD%E3%83%8A%E3%83%AA%E3%83%86%E3%82%A3%E6%A4%9C%E6%9F%BB.pdf"
     },
     {
      "label": "S2",
      "url": "https://kompas.hosp.keio.ac.jp/exam/000388/"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "mmse",
  "name": "MMSE",
  "category": "評価尺度",
  "aliases": [
   "MMSE",
   "Mini-Mental State Examination"
  ],
  "rows": [
   {
    "item": "MMSE 満点・構成",
    "target": "全般的認知機能",
    "value": "30点満点。11項目(時間・場所の見当識、3単語の即時・遅延再生、計算、物品呼称、文章復唱、3段階口頭命令、書字命令、文章書字、図形模写)",
    "exam": "61-am-98(誤答:「人格検査」ではない)／59-am-9(誤答:優先度が低い=全般認知)／59-pm-81(誤答:日常生活場面の記憶障害の検出には最適でない)",
    "q": [
     "59-am-9",
     "59-pm-81",
     "61-am-98"
    ],
    "note": "確認済み[S4]",
    "conflict": false,
    "sources": [
     {
      "label": "S4",
      "url": "https://www.jpn-geriat-soc.or.jp/tool/pdf/tool_02.pdf"
     }
    ]
   },
   {
    "item": "MMSE カットオフ:認知症疑い",
    "target": "認知症のスクリーニング",
    "value": "23点以下で認知症疑い(感度81%・特異度89%)",
    "exam": "57-am-35(認知症のスクリーニング検査=MMSEが正答)／56-pm-18(認知症患者のMMSEは13点=30点満点・23点以下で認知症疑い)",
    "q": [
     "56-pm-18",
     "57-am-35"
    ],
    "note": "確認済み[S4]。S20 は「24/23」と記載し同じ区切り",
    "conflict": false,
    "sources": [
     {
      "label": "S4",
      "url": "https://www.jpn-geriat-soc.or.jp/tool/pdf/tool_02.pdf"
     },
     {
      "label": "S20",
      "url": "https://www.jstage.jst.go.jp/article/jamt/66/J-STAGE-2/66_17J2-3/_html/-char/ja"
     }
    ]
   },
   {
    "item": "MMSE カットオフ:MCI",
    "target": "軽度認知障害",
    "value": "27点以下でMCIが疑われる(感度45〜60%・特異度65〜90%)",
    "exam": "出題なし(参考。入力の27/28点に対応)",
    "q": [],
    "note": "確認済み[S4]",
    "conflict": false,
    "sources": [
     {
      "label": "S4",
      "url": "https://www.jpn-geriat-soc.or.jp/tool/pdf/tool_02.pdf"
     }
    ]
   },
   {
    "item": "MMSE による重症度の例",
    "target": "認知症の重症度",
    "value": "軽度=21点以上／中等度=11〜20点／重度=0〜10点",
    "exam": "56-pm-18(MMSE 13点=中等度に当たる)／57-am-36(MMSE 25→20点で悪化方向。30点満点)",
    "q": [
     "56-pm-18",
     "57-am-36"
    ],
    "note": "確認済み[S4](表3「認知症の重症度の判定例」)",
    "conflict": false,
    "sources": [
     {
      "label": "S4",
      "url": "https://www.jpn-geriat-soc.or.jp/tool/pdf/tool_02.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-19",
  "review": "ai"
 },
 {
  "slug": "modified-ashworth-scale",
  "name": "Modified Ashworth Scale(MAS)",
  "category": "評価尺度",
  "aliases": [
   "Modified Ashworth",
   "Ashworth",
   "修正アシュワース",
   "改訂アシュワーススケール",
   "アシュワーススケール"
  ],
  "rows": [
   {
    "item": "MAS 全体(6段階)と何を評価するか",
    "target": "痙縮(他動運動に対する筋緊張の亢進)の程度",
    "value": "0・1・1+・2・3・4の6段階。関節を他動的に動かしたときの抵抗の大きさで判定する。0=筋緊張の増加なし／4=屈曲または伸展位で固縮。",
    "exam": "54-pm-36(誤答:疼痛の評価ではない。痙縮の評価)／57-am-28(誤答:注意障害の検査ではない)／57-pm-33(誤答:Parkinson病の評価として誤り。固縮の評価はWestphalなど)／61-pm-37(誤答:高次脳機能評価は含まない)／49-am-46(誤答:バランスを評価できるものの選択肢)／50回(痙縮の評価であり、症状なし〜死亡の分類ではない)",
    "q": [
     "54-pm-36",
     "57-am-28",
     "57-pm-33",
     "61-pm-37"
    ],
    "note": "確認済み[S1][S2]。Bohannon & Smithの基準による段階。疼痛・注意・バランス・高次脳機能の評価法ではない(段階の定義に含まれない)。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC13289203"
     },
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC13374442"
     }
    ]
   },
   {
    "item": "MAS 0・1・1+",
    "target": "軽度の痙縮の見分け",
    "value": "0=筋緊張の増加なし。1=軽度の増加(引っかかりとその消失、または可動域の最終域でわずかな抵抗)。1+=軽度の増加(引っかかりに続き、可動域の残り=半分未満でわずかな抵抗)。",
    "exam": "59-pm-34(正答:足関節を底屈位から背屈位へ他動的に動かし、最終域に若干の抵抗感=MAS 1。選択肢は0・1・1+・2・3)／49回pm-10(症例でMAS 1)",
    "q": [
     "59-pm-34"
    ],
    "note": "確認済み[S1][S2]。「最終域でのわずかな抵抗」=1、「引っかかりの後、可動域の半分未満にわたる抵抗」=1+。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC13289203"
     },
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC13374442"
     }
    ]
   },
   {
    "item": "MAS 2",
    "target": "中等度の痙縮",
    "value": "可動域の大部分で筋緊張の増加がより明らかだが、動かす部位は容易に動く(他動運動は容易)。",
    "exam": "53-pm-33(正答:肘を屈曲位から他動的に伸展、可動域の全範囲にわたり抵抗感があるが運動は容易=2)／56-pm-6(問題文:左下腿三頭筋のMASは2。ダブルクレンザック式短下肢装具の誤りを問う設問の前提)／52-pm-13(問題文:右下腿三頭筋のMASは2。装具選択の条件)／51回(多発性硬化症の右内反尖足でMAS 2。治療は電気刺激療法)",
    "q": [
     "53-pm-33",
     "56-pm-6",
     "52-pm-13"
    ],
    "note": "確認済み[S1][S2]。資料の表現は「可動域の大部分(most of the range)」で、国試の「全範囲」の言い回しと少し違うが、正答は2。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC13289203"
     },
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC13374442"
     }
    ]
   },
   {
    "item": "MAS 3・4",
    "target": "重度の痙縮・固縮",
    "value": "3=筋緊張の著明な増加で、他動運動が困難。4=動かす部位が屈曲または伸展位で固縮している。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1][S2]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC13289203"
     },
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC13374442"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "modified-borg-scale",
  "name": "修正Borgスケール(CR10)",
  "category": "評価尺度",
  "aliases": [
   "修正Borg",
   "修正ボルグ",
   "修正Borg指数",
   "修正Borgスケール",
   "修正ボルグスケール",
   "Borg CR10",
   "Borg CR-10",
   "modified Borg"
  ],
  "rows": [
   {
    "item": "修正Borgスケール(0〜10)の段階",
    "target": "息切れ・足の疲れなどの自覚症状の強さ",
    "value": "0=何ともない／0.5=極めて弱い(やっとわかる程度)／1=かなり弱い／2=弱い／3=中程度／4=いくらか強い／5=強い／7=かなり強い／9=極めて強い／10=最大(6と8には言葉がない)。息切れや疲れを自分で数字にして答える。",
    "exam": "54-pm-40(正答:全身持久力トレーニング中の自覚的運動強度の指標=修正Borg指数。誤答:Karvonen法・Hugh-Jones分類・%最大酸素摂取量・mMRC息切れスケール)／57-am-18(運動前の修正Borgは3)",
    "q": [
     "54-pm-40",
     "57-am-18"
    ],
    "note": "確認済み[S1][S2]。段階の言葉は病院の患者向け資料[S1]による。S2は0〜10の数字に呼吸困難の強さの言葉を当てはめる方法と説明している。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://minamiokayama.hosp.go.jp/clinical/file/reha_exercise.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.jstage.jst.go.jp/article/jsrcr/30/2/30_172/_html/-char/ja"
     }
    ]
   },
   {
    "item": "運動中の休憩の目安",
    "target": "呼吸器疾患の運動・日常生活でのリスク管理",
    "value": "SpO2が90%以下、または修正Borgスケールが6を超えるときは、運動負荷が強いので休憩する(患者向けの目安)。",
    "exam": "55-am-8(COPD:中止すべき状態の正答=SpO2 82%。誤答側:修正Borg指数5=6を超えない)",
    "q": [
     "55-am-8"
    ],
    "note": "確認済み[S1]。患者向けの「休憩の目安」で、医療者向けの中止基準の数値は、この資料では確認していない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://minamiokayama.hosp.go.jp/clinical/file/reha_exercise.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "mrs",
  "name": "modified Rankin Scale(mRS)",
  "category": "評価尺度",
  "aliases": [
   "mRS",
   "modified Rankin Scale"
  ],
  "rows": [
   {
    "item": "mRS 全体",
    "target": "脳卒中後の全般的な障害度・自立度",
    "value": "0〜6の7段階(0=まったく症候がない〜5=重度の障害・寝たきり、6=死亡)。歩行速度・筋緊張・バランスなどの個別項目は含まない",
    "exam": "54-am-34(誤答:「歩行速度の評価を含む」)／52-am-33(誤答:「評価項目に筋緊張がある」)／58-am-82(誤答:「mRS－バランス機能」)／57-pm-35(誤答:疼痛検査ではない)／53-pm-35(誤答:がん患者用ではない)",
    "q": [
     "52-am-33",
     "53-pm-35",
     "54-am-34",
     "57-pm-35",
     "58-am-82"
    ],
    "note": "確認済み[S5]",
    "conflict": false,
    "sources": [
     {
      "label": "S5",
      "url": "https://www.mhlw.go.jp/bunya/iryouhoken/iryouhoken15/dl/other1-1-5.pdf"
     }
    ]
   },
   {
    "item": "mRS 0〜2",
    "target": "日常生活が自立",
    "value": "0=まったく症候がない／1=症候はあっても明らかな障害はない(日常の勤めや活動は行える)／2=軽度の障害(発症以前の活動がすべて行えるわけではないが、自分の身の回りのことは介助なしで行える)",
    "exam": "出題なし(参考)",
    "q": [],
    "note": "確認済み[S5]",
    "conflict": false,
    "sources": [
     {
      "label": "S5",
      "url": "https://www.mhlw.go.jp/bunya/iryouhoken/iryouhoken15/dl/other1-1-5.pdf"
     }
    ]
   },
   {
    "item": "mRS 3〜5",
    "target": "介助が必要",
    "value": "3=中等度の障害(何らかの介助を必要とするが、歩行は介助なし)／4=中等度から重度の障害(歩行や身体的要求に介助が必要)／5=重度の障害(寝たきり、失禁、常に介護と見守りが必要)／6=死亡",
    "exam": "出題なし(参考)",
    "q": [],
    "note": "確認済み[S5]",
    "conflict": false,
    "sources": [
     {
      "label": "S5",
      "url": "https://www.mhlw.go.jp/bunya/iryouhoken/iryouhoken15/dl/other1-1-5.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-19",
  "review": "ai"
 },
 {
  "slug": "ms-rehab",
  "name": "多発性硬化症(MS)のリハビリテーション",
  "category": "リスク管理",
  "aliases": [
   "多発性硬化症",
   "ウートフ現象",
   "Uhthoff現象",
   "ウートフ徴候",
   "Uhthoff",
   "Multiple sclerosis",
   "EDSS"
  ],
  "rows": [
   {
    "item": "熱非耐性(ウートフ現象)と温熱療法",
    "target": "MS患者の運動・物理療法での注意",
    "value": "MS患者は熱に弱く(ウートフ現象など)、体温が上がると症状が一時的に悪くなりうる。運動の強さ・量や、訓練室の温度・湿度に注意する。疼痛や異常感覚には、軽いストレッチ・リラクセーション・寒冷療法を用いる。",
    "exam": "59-pm-39(正答:寛解期のMSで禁忌=温熱療法。他動ROM練習・中等度の有酸素運動・低強度の筋力増強・電気刺激は禁忌でない)",
    "q": [
     "59-pm-39"
    ],
    "note": "確認済み[S1](日本神経学会 2017年版 第15章 CQ15-1)。本文に「温熱療法は禁忌」という語そのものはないが、熱非耐性への注意と寒冷療法の使用は、国試の正答と合う。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.neurology-jp.org/guidelinem/msgl/koukasyo_onm_2017_16.pdf"
     }
    ]
   },
   {
    "item": "寛解期・安定期の運動療法の強さ",
    "target": "EDSS 6.0程度までのMS患者",
    "value": "EDSS 6.0程度までは、軽〜中等度の強度で、持久性運動・筋力増強運動・バランス運動・歩行練習を行う(運動耐容能・筋力・バランス・易疲労性・歩行・QOLの改善が報告)。持久性運動は最大酸素摂取量の60%程度(ややきつく、翌日に疲れが残らない程度)までなら、症状の悪化や再発のリスクは少ないと考えられる。EDSS 6.5以上は、歩行補助具の使用や、座位・臥位でできる低強度の運動を検討する。",
    "exam": "59-pm-39(禁忌でない選択肢:中等度の有酸素運動・低強度の筋力増強)",
    "q": [
     "59-pm-39"
    ],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.neurology-jp.org/guidelinem/msgl/koukasyo_onm_2017_16.pdf"
     }
    ]
   },
   {
    "item": "急性期・回復期の進め方",
    "target": "MSの時期別のリハビリ",
    "value": "急性期は炎症をしずめるため積極的な運動はせず、身の回り動作程度の運動量を保つ。自動運動が難しいときは、良肢位保持・体位変換・関節運動・呼吸理学療法を行う。回復期は軽度の強度、安定期は軽度〜中等度の強度で行う。",
    "exam": "59-pm-39(他動ROM練習は禁忌でない。急性期にも関節運動を行う記載と合う)",
    "q": [
     "59-pm-39"
    ],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.neurology-jp.org/guidelinem/msgl/koukasyo_onm_2017_16.pdf"
     }
    ]
   },
   {
    "item": "痙縮への対応(電気刺激など)",
    "target": "MSの痙縮",
    "value": "痙縮は寛解期でも重い障害として残ることがある。徒手的ストレッチ・装具療法・高頻度経皮的電気刺激などを行う。",
    "exam": "59-pm-39(電気刺激は禁忌でない)",
    "q": [
     "59-pm-39"
    ],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.neurology-jp.org/guidelinem/msgl/koukasyo_onm_2017_16.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "needle-emg",
  "name": "針筋電図(神経原性・筋原性・ALS)",
  "category": "臨床検査",
  "aliases": [
   "筋電図",
   "針筋電図",
   "EMG",
   "線維束攣縮",
   "線維束性収縮",
   "線維性収縮",
   "運動単位電位",
   "干渉パターン",
   "神経原性変化",
   "筋原性変化",
   "巨大運動単位電位"
  ],
  "rows": [
   {
    "item": "針筋電図:神経原性と筋原性",
    "target": "脱神経と筋疾患の区別",
    "value": "正常の安静筋は電気的に無活動。脱神経では異常な自発活動(線維性収縮・線維束性収縮)や刺入時活動の増大が出る。神経原性(脱神経・再支配)=動員される運動単位が減り、残った運動単位が大きくなって巨大な(高振幅の)電位になる。筋原性=個々の筋線維の障害で振幅は減少し、干渉パターンは保たれる",
    "exam": "57-am-91(誤答:針筋電図の神経原性変化で低振幅・短持続)／57-pm-84(誤答:筋原性で「筋電図での高振幅電位波形」)／58-am-14(誤答:針筋電図の低振幅短持続電位(筋原性側))",
    "q": [
     "57-am-91",
     "57-pm-84",
     "58-am-14"
    ],
    "note": "確認済み[S1]。資料に電位の「持続時間」(短持続・長持続)の記載はなく、確認できたのは振幅(神経原性=大きい、筋原性=小さい)のみ。誤答の「神経原性で低振幅」は資料と逆",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-神経疾患/神経系の検査および手技/筋電図検査と神経伝導検査"
     }
    ]
   },
   {
    "item": "ALSの筋電図・神経伝導検査",
    "target": "筋萎縮性側索硬化症の診断",
    "value": "針筋電図が最も有用な検査。線維性収縮・陽性波・線維束性収縮、ときに巨大運動単位電位が、症状のない肢でもみられる。神経伝導検査では脱髄や神経筋伝達障害の所見はなく、通常は疾患の後期まで神経伝導速度は正常。感覚は通常保たれる",
    "exam": "61-pm-90(ALSの診断に最も有用な検査。誤答:SPECT・頭部CT・頸部超音波・体性感覚誘発電位。正答は図の選択肢)／59-pm-91(ALSの典型所見=針筋電図で線維束攣縮の電位(正答。図は未確認))／49回(ALSで針筋電図が両側前脛骨筋に右側優位の神経原性変化→右側プラスチック短下肢装具(正答))",
    "q": [
     "61-pm-90",
     "59-pm-91"
    ],
    "note": "確認済み[S1]。資料は「神経原性変化」という語を使わず、上記の所見を記載。61-pm-90の正答が針筋電図であることは、図の選択肢のため未確認。反復刺激試験(重症筋無力症のwaning)は既存カードrepetitive-stimulation",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-神経疾患/末梢神経系疾患および運動単位疾患/筋萎縮性側索硬化症-als-とその他の運動ニューロン疾患-mnd"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "nerve-conduction-study",
  "name": "神経伝導検査(伝導速度・F波・脱髄と軸索障害)",
  "category": "臨床検査",
  "aliases": [
   "神経伝導検査",
   "神経伝導速度",
   "末梢神経伝導検査",
   "運動神経伝導検査",
   "運動神経伝導速度",
   "MCV",
   "NCS",
   "誘発筋電図",
   "F波",
   "遠位潜時",
   "伝導ブロック",
   "複合筋活動電位",
   "CMAP",
   "脱髄",
   "軸索変性"
  ],
  "rows": [
   {
    "item": "脱髄と軸索障害の見分け",
    "target": "神経伝導検査の読み方",
    "value": "脱髄=伝導速度が大きく低下(遠位潜時・F波潜時の延長も)。軸索障害=振幅(CMAP)の低下が主で、伝導速度の低下は比較的小さい。筋疾患では伝導速度は典型的に正常。GBS診療ガイドラインの脱髄基準の例(2神経以上):伝導速度<正常下限の90%、遠位潜時>正常上限の110%、F波最短潜時>正常上限の120%。軸索型は脱髄基準を満たさず遠位CMAP<正常下限の80%",
    "exam": "57-am-91(正答:脱髄病変では神経伝導速度が低下する。誤答:軸索変性で振幅は低下しない・感覚神経の伝導速度は測定できない・筋疾患で伝導速度低下・針筋電図の神経原性変化で低振幅・短持続)／54-am-7(正中神経を手首・肘で刺激した波形から病態を選ぶ。正答=脱髄(伝導速度低下)。誤答:運動ニューロン変性・軸索変性・神経筋接合部異常・正常)／58-am-14(CIDP:誘発筋電図で伝導速度低下(正答))／53-am-9(GBS:末梢神経伝導検査で伝導速度が低下(正答))",
    "q": [
     "57-am-91",
     "54-am-7",
     "58-am-14",
     "53-am-9"
    ],
    "note": "確認済み[S1][S2]。感覚神経伝導検査もGBSの初期評価で実施される(正中・尺骨・腓腹神経)[S2]ため「感覚神経の伝導速度は測定できない」は誤り。軸索変性で振幅が低下する点は[S1]と整合",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-神経疾患/神経系の検査および手技/筋電図検査と神経伝導検査"
     },
     {
      "label": "S2",
      "url": "https://www.neurology-jp.org/guidelinem/pdf/gbs_2024_01.pdf"
     }
    ]
   },
   {
    "item": "伝導速度の求め方・遠位潜時",
    "target": "運動神経伝導検査の基本",
    "value": "神経を複数点で電気刺激し、筋収縮が始まるまでの時間を記録。伝導速度=区間の距離÷その区間の通過時間(刺激点間の潜時の差)。遠位潜時=筋に最も近い区間の所要時間",
    "exam": "54-am-7(刺激部位間の距離175 mm。問題文の正常範囲は振幅3.5 mV以上・MCV 48 m/s以上)／57-pm-6・57-pm-7(GBS症例:尺骨神経の振幅と伝導速度が下限を下回り、最も障害される運動=小指外転)",
    "q": [
     "54-am-7",
     "57-pm-6",
     "57-pm-7"
    ],
    "note": "確認済み[S1]。国試の正常値は問題文の設定で、資料に共通の基準値の記載はない。57-pm-6/7の個別データの判読は資料で確認していない",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-神経疾患/神経系の検査および手技/筋電図検査と神経伝導検査"
     }
    ]
   },
   {
    "item": "F波",
    "target": "近位部の伝導の評価",
    "value": "近位の脱髄(例:GBSの初期)では、遠位の所見が正常でもF波だけが延長することがある。GBSの初期評価は正中・尺骨・脛骨神経の運動神経伝導検査とF波検査。F波最短潜時が正常上限の120%超は脱髄の基準の1つ。軸索型(AMAN)ではF波が消失することがある",
    "exam": "60-pm-43(F波の潜時延長と出現率減少がみられる疾患=GBS(正答))／58-am-14・53-am-9(誤答:F波潜時短縮)",
    "q": [
     "60-pm-43",
     "58-am-14",
     "53-am-9"
    ],
    "note": "確認済み[S1][S2]。「出現率の減少」は資料で直接確認していない(AMANで消失しうる点のみ確認)。H反射(Ia群求心性線維を刺激、59-pm-28)は本文で確認できず、このカードには載せていない",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-神経疾患/神経系の検査および手技/筋電図検査と神経伝導検査"
     },
     {
      "label": "S2",
      "url": "https://www.neurology-jp.org/guidelinem/pdf/gbs_2024_01.pdf"
     }
    ]
   },
   {
    "item": "Guillain-Barré症候群(GBS)の臨床像と検査",
    "target": "急性の免疫介在性多発ニューロパチー",
    "value": "先行イベント(感染など)から4週以内に発症する両側性の弛緩性運動麻痺で、罹患肢の腱反射は消失または減弱、髄液は蛋白細胞解離。症状は4週以内にピーク。先行イベントは76%で、上気道感染35%・消化器感染27%。感覚障害は運動障害より軽いのが通常。神経伝導検査は初期から感度が高く診断に有用。髄液で細胞数>50/μLなら他疾患の可能性が高まる",
    "exam": "61-pm-25(正答:呼吸器感染を契機に発症。誤答:深部腱反射は亢進・神経伝導速度は保たれる・感覚障害は四肢中枢部に強い)／59-pm-14(両側正中・腓骨神経で活動電位の振幅が著明に減少→GBS(正答))／59-pm-91(誤答:運動神経伝導の遠位潜時延長・感覚神経伝導の伝導ブロック)／54-am-91(下肢の複数神経でMCV低下→GBS(正答))／53-am-9(誤答:髄液で細胞数増加・頸髄MRIで髄内信号異常・連続刺激でM波振幅漸増・F波潜時短縮)",
    "q": [
     "61-pm-25",
     "59-pm-14",
     "59-pm-91",
     "54-am-91",
     "53-am-9"
    ],
    "note": "確認済み[S1]。GBSには脱髄型(AIDP)と軸索型(AMAN/AMSAN)があり、軸索型は振幅低下が主体(59-pm-14と整合)。59-pm-91の2つの誤答と「感覚障害は四肢中枢部に強い」の個別の否定は資料と直接照合できず、後者は「感覚障害は運動障害より軽い」との整合のみ。髄液の詳細は既存カードcsf-gbs",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.neurology-jp.org/guidelinem/pdf/gbs_2024_01.pdf"
     }
    ]
   },
   {
    "item": "手根管症候群と神経伝導検査",
    "target": "正中神経の絞扼性障害",
    "value": "手根管で正中神経が圧迫される。診断は主に臨床評価で、神経伝導検査は重症例や診断が不確かな場合の補助(他の末梢神経障害・近位部の圧迫障害の除外)。Tinel徴候=手根管部の叩打で正中神経領域の錯感覚、Phalen徴候=手関節屈曲でしびれ再現",
    "exam": "60-am-86(末梢神経伝導検査が診断に有用=手根管症候群(正答)。誤答:Parkinson病・多系統萎縮症・筋ジストロフィー・閉塞性動脈硬化症)／50回(誤答:肘部管症候群で正中神経伝導速度の低下。尺骨神経の障害)",
    "q": [
     "60-am-86"
    ],
    "note": "確認済み[S1]。資料の冒頭要約は「神経伝導速度検査で確定」、本文は「ときに行う」と表現が揺れる。肘部管症候群が尺骨神経の障害である点は資料で未確認(国試の記録)。Tinel徴候は既存の別カードあり",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/06-筋骨格系疾患と結合組織疾患/手疾患/手根管症候群"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "nerve-sensory-area",
  "name": "末梢神経・腕神経叢の感覚障害の分布",
  "category": "検査法・徴候",
  "aliases": [
   "感覚支配領域",
   "感覚鈍麻",
   "感覚障害の分布",
   "腕神経叢損傷",
   "腕神経叢",
   "下神経幹",
   "外側神経束",
   "腕神経叢の上位型",
   "腕神経叢の下位型"
  ],
  "rows": [
   {
    "item": "環指は橈側=正中神経・尺側=尺骨神経",
    "target": "手掌側の感覚支配",
    "value": "正中神経は母指から環指の母指側(3本半)の手のひら側、尺骨神経は小指と環指の小指側半分(手のひら側・手の甲側)と前腕の尺側。環指が正中神経と尺骨神経で分かれる",
    "exam": "57-pm-28(正中神経と尺骨神経の表在感覚支配領域で、掌側が橈側と尺側に分かれる手指=環指が正答)",
    "q": [
     "57-pm-28"
    ],
    "note": "確認済み[S1]。手根管症候群・尺骨神経麻痺のページの記載を合わせた整理",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.joa.or.jp/public/sick/condition/carpal_tunnel_syndrome.html"
     },
     {
      "label": "S1",
      "url": "https://www.joa.or.jp/public/sick/condition/ulnar_nerve_palsy.html"
     }
    ]
   },
   {
    "item": "橈骨神経の感覚障害",
    "target": "手背の感覚",
    "value": "上腕中央部で障害されると、母指・示指・中指の背側を含む手背から前腕の母指側に感覚障害が出る。後骨間神経麻痺では感覚障害はない",
    "exam": "53-pm-5(車椅子のアームレストで右上腕外側を長時間圧迫、右手背の斜線部に感覚鈍麻→橈骨神経が正答。誤答=腋窩・筋皮・尺骨・正中神経。図は未確認)",
    "q": [
     "53-pm-5"
    ],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.joa.or.jp/public/sick/condition/radial_nerve_palsy.html"
     }
    ]
   },
   {
    "item": "腕神経叢損傷の型と感覚障害",
    "target": "腕神経叢のどこが障害されたか",
    "value": "上位型=肩の挙上と肘の屈曲が不可能(肩の回旋・前腕の回外も低下)、感覚障害は上腕近位外側と前腕外側。下位型=手首・手指の屈筋と手内筋(骨間筋・小指球筋)の麻痺で、感覚障害は前腕と手の尺側。全型=上肢全体。神経根の引き抜きではホルネル徴候がみられる",
    "exam": "55-am-9(肺尖部がんの浸潤で環指・小指〜前腕中央・内側の痛覚過敏→浸潤部位=下神経幹が正答。誤答=C7・C8神経根・外側神経束・後神経束)／54-am-16(腕神経叢の損傷で前腕外側と母指〜環指の掌側に感覚鈍麻→筋力低下は円回内筋・上腕二頭筋が正答。図は未確認)",
    "q": [
     "55-am-9",
     "54-am-16"
    ],
    "note": "確認済み[S1]。JOAのページは上位型・下位型と、上・下神経幹や神経根(C5-6、C8-T1)との対応を明記していない。国試の下神経幹の分布(尺側)は下位型の記載と矛盾しないが、対応づけは本資料だけでは確認できない",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.joa.or.jp/public/sick/condition/brachial_plexus_injury.html"
     }
    ]
   },
   {
    "item": "総腓骨神経の感覚障害",
    "target": "下腿外側〜足背",
    "value": "しびれ・感覚鈍麻は下腿外側から足背、第5趾を除く足趾背側に出る",
    "exam": "54-am-83(「足根管―足背の異常感覚」は誤答選択肢=足背は総腓骨神経の領域。腓骨頭―下垂足が正答)",
    "q": [
     "54-am-83"
    ],
    "note": "確認済み[S1]。髄節(デルマトーム)の感覚キーポイントは既存の asia カードを参照",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.joa.or.jp/public/sick/condition/peroneal_nerve_palsy.html"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "nihss",
  "name": "NIH Stroke Scale(NIHSS)",
  "category": "評価尺度",
  "aliases": [
   "NIH Stroke Scale",
   "National Institutes of Health Stroke Scale",
   "NIH脳卒中スケール"
  ],
  "rows": [
   {
    "item": "NIHSS 構成と得点",
    "target": "脳卒中(急性期)の神経学的重症度",
    "value": "1a〜11の11項目(意識水準・意識障害の質問・従命、注視、視野、顔面麻痺、上肢・下肢の運動、運動失調、感覚、言語、構音障害、消去現象と注意障害)。合計0〜42点で、高いほど重症。",
    "exam": "59-am-91(正答の1つ:脳卒中の身体機能評価尺度として選ぶ)／54-am-34(正答:意識状態の評価を含む)／57-am-33(正答:評価されるのは意識障害・顔面麻痺)／52-am-33(誤答:評価項目にバランスがある)",
    "q": [
     "59-am-91",
     "54-am-34",
     "57-am-33",
     "52-am-33"
    ],
    "note": "確認済み[S1]。病院の公開資料(日本語版)による。項目の評価はリストの順に行い、評価後に戻って変更しない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://okayama-gmc.or.jp/shimin/application/files/1215/5366/8042/board_nihss.pdf"
     }
    ]
   },
   {
    "item": "NIHSS に含まれない項目",
    "target": "他の評価尺度との混同を避ける",
    "value": "項目表にバランス、深部腱反射、関節可動域、歩行速度、転倒リスクの項目はない。運動失調(7番)は、鼻-指-鼻試験・膝-踵試験で四肢ごとに評価する項目で、バランスの項目ではない。",
    "exam": "57-am-33(誤答:バランス障害・深部腱反射・歩行速度)／58-am-82(誤答:NIHSS－関節可動域)／52-am-33(誤答:評価項目にバランス)／60-am-12(誤答:転倒リスク評価には不適切)",
    "q": [
     "57-am-33",
     "58-am-82",
     "52-am-33",
     "60-am-12"
    ],
    "note": "確認済み[S1]。11項目の表に出てこないことによる確認。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://okayama-gmc.or.jp/shimin/application/files/1215/5366/8042/board_nihss.pdf"
     }
    ]
   },
   {
    "item": "NIHSS 意識の項目(1a・1b・1c)",
    "target": "意識状態の評価",
    "value": "1a意識水準:0=完全覚醒、1=簡単な刺激で覚醒、2=繰り返し・強い刺激で覚醒、3=完全に無反応(0〜3)。1b質問(今月の月・年齢):0=両方正解、1=片方正解、2=両方不正解。1c従命(開眼閉眼・手を握る開く):0=両方可、1=片方可、2=両方不可。",
    "exam": "54-am-34(正答:意識状態の評価を含む)／57-am-33(正答:意識障害)",
    "q": [
     "54-am-34",
     "57-am-33"
    ],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://okayama-gmc.or.jp/shimin/application/files/1215/5366/8042/board_nihss.pdf"
     }
    ]
   },
   {
    "item": "NIHSS 高次脳機能に関わる項目(言語・消去現象と注意障害)",
    "target": "失語・半側不注意などの評価",
    "value": "9最良の言語:0=失語なし、1=軽度〜中等度、2=重度、3=無言・全失語。11消去現象と注意障害:0=異常なし、1=視覚・触覚・聴覚・視空間・自己身体の不注意、または1つの感覚様式での2点同時刺激に対する消去現象、2=重度の半側不注意、または2つ以上の感覚様式での消去現象。",
    "exam": "61-pm-37(正答:高次脳機能評価が含まれる評価)",
    "q": [
     "61-pm-37"
    ],
    "note": "確認済み[S1]。国試の記録では、失語・半側空間無視などの項目を含む点が根拠。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://okayama-gmc.or.jp/shimin/application/files/1215/5366/8042/board_nihss.pdf"
     }
    ]
   },
   {
    "item": "NIHSS 顔面麻痺・上下肢の運動",
    "target": "運動麻痺の評価",
    "value": "4顔面麻痺:0=正常、1=軽度(顔面下半分に麻痺はあるが少し動く)、2=部分的(下半分の完全麻痺)、3=完全麻痺(上半分・下半分とも)。5上肢:臥位45度・座位90度で10秒保持できるか、6下肢:臥位30度で5秒保持できるかを、0=下垂なし〜4=全く動かない、で左右別に評価する。",
    "exam": "57-am-33(正答:顔面麻痺)／59-am-91(身体機能の評価として選ぶ)",
    "q": [
     "57-am-33",
     "59-am-91"
    ],
    "note": "確認済み[S1]。非麻痺側から実施する。切断・関節癒合はN(評価不能)。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://okayama-gmc.or.jp/shimin/application/files/1215/5366/8042/board_nihss.pdf"
     }
    ]
   },
   {
    "item": "NIHSS 評価の原則と昏睡のときの得点",
    "target": "評価の進め方",
    "value": "項目順に評価し、結果をすぐ記録する。評価した項目に戻って変更しない。患者が実際に行ったことで採点し、推測しない。1a=3(昏睡)のときは、7(失調)のみ0点でほかは最悪の評価となり、合計40点(満点42点)になる。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://okayama-gmc.or.jp/shimin/application/files/1215/5366/8042/board_nihss.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "nyha",
  "name": "NYHA心機能分類(NYHA)",
  "category": "診断基準・分類",
  "aliases": [
   "NYHA",
   "NYHA分類",
   "New York Heart Association",
   "ニューヨーク心臓協会",
   "心機能分類"
  ],
  "rows": [
   {
    "item": "NYHA心機能分類 全体",
    "target": "心不全(心疾患)の重症度",
    "value": "身体活動による自覚症状の程度で重症度を分ける、4段階(Ⅰ〜Ⅳ度)の分類。Ⅱ度はさらにⅡs(身体活動に軽度の制限)とⅡm(中等度の制限)に分けられる。",
    "exam": "54-am-37(正答:自覚症状により重症度を分類する。誤答:「5段階分類である」「Ⅰ度は日常生活で疲労・呼吸困難がある」「Ⅱ度は日常生活以下の労作で症状」「Ⅳ度は安静時に心不全症状がない」)",
    "q": [
     "54-am-37"
    ],
    "note": "確認済み[S1]。5段階ではなく4段階。検査値ではなく自覚症状で分ける点が正答のポイント。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.mhlw.go.jp/file/05-Shingikai-10901000-Kenkoukyoku-Soumuka/0000202651.pdf"
     }
    ]
   },
   {
    "item": "NYHA Ⅲ度",
    "target": "身体活動の高度な制限",
    "value": "安静時は無症状。日常的な身体活動より軽い労作(日常的な活動以下の労作)で、疲労・動悸・呼吸困難・狭心痛が出る。",
    "exam": "58-am-19(問題文:class Ⅲ「軽い労作で症状が出る」)／55-am-5(症例の背景としてclass Ⅲを提示。分類自体は問われていない)",
    "q": [
     "58-am-19",
     "55-am-5"
    ],
    "note": "確認済み[S1]。「軽い労作で症状」はⅢ度の記述。Ⅱ度は日常的な身体活動で症状が出る点で区別する。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.mhlw.go.jp/file/05-Shingikai-10901000-Kenkoukyoku-Soumuka/0000202651.pdf"
     }
    ]
   },
   {
    "item": "NYHA Ⅰ度",
    "target": "心疾患はあるが活動制限なし",
    "value": "心疾患はあるが身体活動に制限はない。日常的な身体活動では、著しい疲労・動悸・呼吸困難・狭心痛が生じない。",
    "exam": "57-pm-18(問題文:class Ⅰ。TAVI後の症例)／61-am-19(誤答選択肢「NYHA Ⅰ」。入院関連機能低下の説明としては誤りで、正答はHAD)／54-am-37(誤答:「Ⅰ度は日常生活で疲労・呼吸困難がある」)",
    "q": [
     "57-pm-18",
     "61-am-19",
     "54-am-37"
    ],
    "note": "確認済み[S1]。Ⅰ度は日常生活で症状が出ない段階。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.mhlw.go.jp/file/05-Shingikai-10901000-Kenkoukyoku-Soumuka/0000202651.pdf"
     }
    ]
   },
   {
    "item": "NYHA Ⅱ度",
    "target": "身体活動の軽度〜中等度の制限",
    "value": "軽度ないし中等度の身体活動の制限がある。安静時は無症状だが、日常的な身体活動で疲労・動悸・呼吸困難・狭心痛が生じる。",
    "exam": "第50回(慢性心不全・NYHA class Ⅱの70歳男性、在宅リハ。正しい生活・運動指導を問う。問題IDは入力になし)／54-am-37(誤答:「Ⅱ度は日常生活以下の労作で症状」=これはⅢ度の記述)",
    "q": [
     "54-am-37"
    ],
    "note": "確認済み[S1]。ガイドライン上、Ⅱ度はⅡs(軽度制限)とⅡm(中等度制限)に細分される。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.mhlw.go.jp/file/05-Shingikai-10901000-Kenkoukyoku-Soumuka/0000202651.pdf"
     }
    ]
   },
   {
    "item": "NYHA Ⅳ度",
    "target": "いかなる身体活動も制限",
    "value": "心疾患のため、いかなる身体活動も制限される。心不全症状や狭心痛が安静時にも存在し、わずかな労作でこれらが増悪する。",
    "exam": "54-am-37(誤答:「Ⅳ度は安静時に心不全症状がない」。Ⅳ度は安静時にも症状がある)",
    "q": [
     "54-am-37"
    ],
    "note": "確認済み[S1]。安静時の症状の有無が、Ⅲ度(安静時は無症状)との区別点。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.mhlw.go.jp/file/05-Shingikai-10901000-Kenkoukyoku-Soumuka/0000202651.pdf"
     }
    ]
   },
   {
    "item": "心不全ステージ分類との対応",
    "target": "ステージ分類との関係",
    "value": "ガイドラインの対比表では、ステージA・B(器質的心疾患のないリスク/あるリスクの段階)はNYHA分類に「該当なし」。症候性のステージCと治療抵抗性のステージDに、NYHA Ⅰ〜Ⅳ度が対応づけられている。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。学習用の整理で、診断・治療の指示ではない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.mhlw.go.jp/file/05-Shingikai-10901000-Kenkoukyoku-Soumuka/0000202651.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "pao2-spo2",
  "name": "動脈血酸素分圧(PaO2)・SpO2",
  "category": "臨床検査",
  "aliases": [
   "PaO2",
   "SpO2",
   "動脈血酸素分圧",
   "経皮的動脈血酸素飽和度"
  ],
  "rows": [
   {
    "item": "動脈血酸素分圧（PaO2）・SpO2",
    "target": "呼吸不全の定義、在宅酸素療法（HOT）の適応",
    "value": "室内気でPaO2 60mmHg以下（SpO2 約90%）＝呼吸不全。準呼吸不全は70≧PaO2＞60。HOT: PaO2 55mmHg以下、または60mmHg以下で睡眠時・労作時に著しい低酸素血症",
    "exam": "52-am-3 問題文 PaO2 60.2（低酸素血症）。60-am-16 問題文 PaO2 60→100 mmHg（腹臥位）。55-am-7/8 問題文 PaO2 65 Torr。54-pm-17 問題文 PaO2 65 Torr（在宅酸素療法中）。56-am-19 問題文 PaO2 66。53-pm-34 問題文 PaO2 83。59-pm-12 問題文 PaO2 90。56-am-44 誤答選択肢 PaO2 80（NPPV適応とならない）。60-am-14 問題文 SpO2 95%（室内気）。56-am-44 誤答 睡眠中SpO2 94%",
    "q": [
     "52-am-3",
     "53-pm-34",
     "54-pm-17",
     "55-am-7",
     "56-am-19",
     "56-am-44",
     "59-pm-12",
     "60-am-14",
     "60-am-16"
    ],
    "note": "確認済み [S21]（呼吸不全の定義・HOT基準）。成人の正常値 PaO2 80〜100 Torr は一次資料で未確認",
    "conflict": false,
    "sources": [
     {
      "label": "S21",
      "url": "https://www.jrs.or.jp/file/pulse-oximeter_medical.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-19",
  "review": "ai"
 },
 {
  "slug": "parkinson-signs-motor-complications",
  "name": "パーキンソン病の運動症状と薬効変動(wearing-off・on-off)",
  "category": "検査法・徴候",
  "aliases": [
   "wearing-off",
   "wearing off",
   "ウェアリングオフ",
   "on-off",
   "on/off",
   "オンオフ",
   "オン・オフ現象",
   "すくみ足",
   "すくみ現象",
   "freezing of gait",
   "突進現象",
   "後方突進",
   "retropulsion",
   "歯車様固縮",
   "歯車様強剛",
   "歯車現象",
   "cogwheel",
   "静止時振戦",
   "矛盾性運動",
   "運動合併症"
  ],
  "rows": [
   {
    "item": "wearing-off現象",
    "target": "L-ドパ長期治療での薬効変動",
    "value": "L-ドパの効果が数時間(2〜3時間程度)で切れて動けなくなる。薬が効くon時間と効かないoff時間が出て、次の服薬までは改善しない。服薬のタイミングと関連して起こる(予測できる)日内変動",
    "exam": "61-pm-16(正答: L-dopaの効用時間が短縮=Wearing-off。誤答: On-off・Cushing現象・Pusher現象・Raynaud現象)",
    "q": [
     "61-pm-16"
    ],
    "note": "確認済み[S2][S3]。on-offとの違いは、wearing-offは服薬と関連して予測でき次の服薬まで改善しない点",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.neurology-jp.org/guidelinem/pdgl/parkinson_2018_26.pdf"
     },
     {
      "label": "S3",
      "url": "https://www.nanbyou.or.jp/entry/169"
     }
    ]
   },
   {
    "item": "on-off現象",
    "target": "L-ドパ長期治療での薬効変動",
    "value": "スイッチを入れたり切ったりするように、症状が急激に良くなったり悪くなったりする現象。血中濃度や服薬のタイミングと無関係に変動し、発症機序は十分に解明されていない",
    "exam": "56-am-9(正答: L-dopa服用後30分程度で突然動けなくなることを繰り返す=on-off。誤答: wearing-off・Westphal現象・pusher現象・frozen現象)／61-pm-16(誤答選択肢)",
    "q": [
     "56-am-9",
     "61-pm-16"
    ],
    "note": "確認済み[S2]。国試の設問は「服用後30分程度で突然」と書くが、診療ガイドライン本文では「服薬タイミングと無関係に急激に変動」とされ、「30分」という数値は確認できなかった。突然・繰り返す点で見分ける",
    "conflict": true,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.neurology-jp.org/guidelinem/pdgl/parkinson_2018_26.pdf"
     }
    ]
   },
   {
    "item": "L-ドパ長期治療で起こる問題症状",
    "target": "抗パーキンソン病薬の長期使用",
    "value": "L-ドパ長期治療では、症状の日内変動(wearing-off・on-off)、ジスキネジア(ドパ誘発性不随意運動)、精神症状などの問題が出る。欧米の古いデータでは、L-ドパ開始5年後に約半数で日内変動に悩むとされる",
    "exam": "49-am-84(長期投与で生じうるのは on-off・wearing-off・精神症状・不随意運動の増強。誤りは高血圧)",
    "q": [
     "49-am-84"
    ],
    "note": "確認済み[S4](2011年版)。「高血圧」が誤りである点は本文では確認できず、選択肢の誤りの根拠は本資料にない",
    "conflict": false,
    "sources": [
     {
      "label": "S4",
      "url": "https://www.neurology-jp.org/guidelinem/pdf/parkinson_03.pdf"
     }
    ]
   },
   {
    "item": "歯車様強剛(固縮)",
    "target": "パーキンソン病の筋強剛",
    "value": "他動的に関節を動かしたときの筋トーヌス亢進による抵抗。他動運動の速度に関係せず、痙縮と区別される。小刻みで規則的なひっかかりを伴うものを歯車現象、抵抗がほぼ一定なら鉛管様強剛。現在は「固縮」より「強剛」の呼称",
    "exam": "52-am-34(正答: 突進現象・歯車様固縮。誤答: 眼振・動作時振戦・ミオクローヌス)",
    "q": [
     "52-am-34"
    ],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.neurology-jp.org/guidelinem/pdgl/parkinson_2018_07.pdf"
     }
    ]
   },
   {
    "item": "静止時振戦",
    "target": "パーキンソン病の振戦",
    "value": "多くは4〜6Hzの規則的な静止時振戦。精神的緊張で増強し、睡眠時に消える。動作時振戦が混在したり、少数ながら動作時振戦のみの例もある",
    "exam": "52-am-34(誤答選択肢に「動作時振戦」)",
    "q": [
     "52-am-34"
    ],
    "note": "確認済み[S1]。本文は静止時振戦が多いとしており、「動作時振戦」を選ぶ誤答選択肢と対応する",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.neurology-jp.org/guidelinem/pdgl/parkinson_2018_07.pdf"
     }
    ]
   },
   {
    "item": "姿勢保持障害・後方突進現象",
    "target": "パーキンソン病の姿勢反射障害",
    "value": "病初期にはほとんどなく、進行に伴って出現する。pull test(立位で外力を加える)で押された方向に容易に転倒し、特に後方に倒れる現象を後方突進現象(retropulsion)と呼ぶ",
    "exam": "52-am-34(正答選択肢に「突進現象」)",
    "q": [
     "52-am-34"
    ],
    "note": "確認済み[S1]。Hoehn-Yahr 3度の姿勢反射障害は既存カード hoehn-yahr を参照",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.neurology-jp.org/guidelinem/pdgl/parkinson_2018_07.pdf"
     }
    ]
   },
   {
    "item": "すくみ足",
    "target": "パーキンソン病の歩行障害",
    "value": "歩行開始時・方向転換時・狭い所の通過時・目標直前などに起こりやすい。床の線や敷石をまたぐ(視覚キュー)、メトロノーム音(聴覚キュー)などで軽減し、矛盾性歩行(kinésie paradoxale)と呼ぶ。そのほか体重移動、横向きに歩く、かけ声、床に線を想像する、などの工夫がある",
    "exam": "49-am-27(改善: 床に引かれた横線をまたぐ)／50回(廊下の図柄: 市松模様が正答)／51回(適切でないもの=歩幅を狭めた歩行。適切: 横歩き・階段昇降・スラローム・メトロノーム)",
    "q": [
     "49-am-27"
    ],
    "note": "確認済み[S1][S2]。視覚・聴覚キュー、横向きに歩く、は本文と一致。50回の市松模様と、51回の「歩幅を狭めた歩行は不適切」の根拠は本資料では確認できなかった",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.neurology-jp.org/guidelinem/pdgl/parkinson_2018_07.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.neurology-jp.org/guidelinem/pdgl/parkinson_2018_26.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "patrick-test",
  "name": "Patrickテスト(FABER)",
  "category": "検査法・徴候",
  "aliases": [
   "Patrick test",
   "Patrick's test",
   "Patrick徴候",
   "パトリックテスト",
   "パトリック試験",
   "FABER test",
   "FABERテスト",
   "フェーバーテスト",
   "Thomas test",
   "トーマステスト"
  ],
  "rows": [
   {
    "item": "Patrickテスト(FABER)の手技",
    "target": "股関節・仙腸関節",
    "value": "背臥位で、検査側の足を反対側の膝に乗せる(股関節を屈曲・外転・外旋した4の字の肢位。FABER=Flexion, Abduction, External Rotation)。反対側のASISをテーブルに押さえ、曲げた膝をテーブル側へ押し下げる",
    "exam": "61-am-30・60-am-87・54-am-3・53-am-34・52-pm-32(いずれも誤答選択肢として登場。Patrickは股関節・仙腸関節の検査で、半月板・股関節屈曲拘縮・腰椎椎間板ヘルニアの検査ではない)／50回(股関節・仙腸関節疾患の検査)／51回(下肢長の左右差に関連するテストとして正答)",
    "q": [
     "61-am-30",
     "60-am-87",
     "54-am-3",
     "53-am-34",
     "52-pm-32"
    ],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7646135/"
     }
    ]
   },
   {
    "item": "陽性の判定",
    "target": "痛みの部位で疾患を読み分ける",
    "value": "屈曲した膝側の仙腸関節に痛みが出れば陽性。殿部の痛みは仙腸関節障害を、鼠径部の痛みは股関節の病変を示唆する",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7646135/"
     }
    ]
   },
   {
    "item": "診断精度(仙腸関節)",
    "target": "臨床での使い方",
    "value": "仙腸関節ブロックを基準にした研究で、FABERは物理テストの中で特異度・陽性的中率が最も高かった(特異度66.7%、感度71.8%)。ただし報告で幅があり、単独では確定できない。複数の誘発テストを組み合わせて判断する",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。1つの研究の値で、基準値ではない",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7646135/"
     }
    ]
   },
   {
    "item": "対比: Thomasテスト",
    "target": "股関節屈曲拘縮",
    "value": "背臥位で一側の股・膝を最大屈曲して胸に抱え、骨盤は中間位に保つ。対側の下肢が台から浮いて隙間ができれば、股関節の屈曲拘縮(伸展制限)を示す。骨盤傾斜を制御しないと妥当性が低い",
    "exam": "60-am-87・52-pm-32(誤答選択肢の説明: 股関節屈曲拘縮の検査はThomas。Patrickは別)",
    "q": [
     "60-am-87",
     "52-pm-32"
    ],
    "note": "確認済み[S2]。国試では、Patrick=股関節・仙腸関節、Thomas=股関節屈曲拘縮として区別される",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4991856/"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "peripheral-nerve-palsy-signs",
  "name": "末梢神経麻痺の症候と感覚領域(正中・尺骨・橈骨・腓骨神経)",
  "category": "検査法・徴候",
  "aliases": [
   "下垂手",
   "鷲手",
   "かぎ爪変形",
   "下垂足",
   "下垂指",
   "涙滴徴候",
   "涙のしずくサイン",
   "前骨間神経麻痺",
   "正中神経麻痺",
   "橈骨神経麻痺",
   "腓骨神経麻痺",
   "肘部管症候群",
   "手根管症候群",
   "drop hand",
   "drop foot"
  ],
  "rows": [
   {
    "item": "正中神経と尺骨神経の感覚支配(環指)",
    "target": "感覚障害の範囲から障害神経を推定",
    "value": "正中神経:母指から環指母指側1/2の掌側の感覚。尺骨神経:小指と環指小指側1/2の掌背側と前腕尺側の感覚。環指は橈側が正中神経、尺側が尺骨神経。",
    "exam": "57-pm-28(環指は橈側が正中神経・尺側が尺骨神経)",
    "q": [
     "57-pm-28"
    ],
    "note": "確認済み[S1][S2]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.joa.or.jp/public/sick/condition/median_nerve_paralysis.html"
     },
     {
      "label": "S2",
      "url": "https://www.joa.or.jp/public/sick/condition/ulnar_nerve_palsy.html"
     }
    ]
   },
   {
    "item": "前骨間神経麻痺(涙滴徴候)",
    "target": "正中神経の枝の障害",
    "value": "前骨間神経は母指・示指の第1関節(IP・DIP)の屈曲を支配し、皮膚の感覚は支配しない。麻痺では母指と示指で丸を作らせると母指・示指の第1関節が過伸展して涙のしずくに似た形になり(涙のしずくサイン陽性)、感覚障害はない。原因は神経炎が多い。",
    "exam": "涙滴徴候=前骨間神経麻痺(正答)。誤答の組合せに『肘部管症候群―涙滴徴候』",
    "q": [],
    "note": "確認済み[S1]。国試の『涙滴徴候』はJOAの『涙のしずくサイン』と同じ所見。問題IDは入力記録になし。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.joa.or.jp/public/sick/condition/median_nerve_paralysis.html"
     }
    ]
   },
   {
    "item": "橈骨神経麻痺(下垂手)と後骨間神経麻痺(下垂指)",
    "target": "上腕中央部での橈骨神経障害",
    "value": "上腕中央部で橈骨神経が障害されると下垂手になり、手首の背屈と手指MP関節の伸展ができない。母指・示指・中指の背側を含む手背から前腕母指側の感覚が障害される。後骨間神経のみの障害(運動神経のみ)では下垂指になり、手首の背屈はできるがMP関節が伸ばせず、感覚の異常はない。原因は外傷・上腕骨骨折・圧迫など。",
    "exam": "誤答の組合せ:『手根管症候群―下垂手』(下垂手は橈骨神経)、『腋窩神経麻痺―下垂指』『大腿神経麻痺―下垂足』『副神経麻痺―翼状肩甲』",
    "q": [],
    "note": "確認済み[S1]。手根管症候群が猿手になる、副神経・長胸神経と翼状肩甲の関係は引用資料で未確認。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.joa.or.jp/public/sick/condition/radial_nerve_palsy.html"
     }
    ]
   },
   {
    "item": "腓骨神経麻痺(下垂足)",
    "target": "膝外側(腓骨頭)での圧迫",
    "value": "足関節と足趾が背屈できなくなり下垂足(drop foot)になる。感覚は下腿外側から足背、第5趾を除く足趾背側で障害される。最多の原因は腓骨頭部(膝外側)の外部からの圧迫(牽引中の長期臥床・ギプスなど)。",
    "exam": "下垂足=腓骨頭(総腓骨神経)の絞扼(正答)。誤答の組合せに『大腿神経麻痺―下垂足』",
    "q": [],
    "note": "確認済み[S1]。JOA資料は『腓骨神経』と表記し『総腓骨神経』の語は使っていない。足根管症候群の症状(足底)は公式資料を確認できず未掲載。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.joa.or.jp/public/sick/condition/peroneal_nerve_palsy.html"
     }
    ]
   },
   {
    "item": "尺骨神経麻痺(鷲手)と肘部管症候群",
    "target": "尺骨神経の障害",
    "value": "外傷・腫瘍以外の主な原因は肘部管症候群とギヨン管症候群。母指球以外の手内筋が萎縮し、環指・小指のMP関節が過伸展して第1・2関節が屈曲する鉤爪(鷲手)変形になる。Froment徴候=母指と示指で紙をつまんで引くと母指の第1関節が曲がれば陽性。",
    "exam": "誤答の組合せに『肘部管症候群―涙滴徴候』(涙滴徴候は前骨間神経麻痺)",
    "q": [],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.joa.or.jp/public/sick/condition/ulnar_nerve_palsy.html"
     }
    ]
   },
   {
    "item": "手根管症候群",
    "target": "正中神経の絞扼",
    "value": "初期は示指・中指がしびれ、進行すると母指から環指母指側の3本半の指がしびれる。夜明けに強くなり、手を振ると楽になる。進行すると母指球がやせ、母指と示指でOKサインの丸が作れなくなる。手首をたたくと指先に響くティネル様サイン、手首を曲げて症状が悪化するファレンテスト。",
    "exam": "誤答の組合せ:『手根管―下垂手』(下垂手は橈骨神経)",
    "q": [],
    "note": "確認済み[S1]。Tinel徴候の詳細は既存カード tinel-sign を参照。『猿手』の語はJOA資料にない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.joa.or.jp/public/sick/condition/carpal_tunnel_syndrome.html"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "pressure-ulcer-turning",
  "name": "褥瘡予防の体位変換",
  "category": "リスク管理",
  "aliases": [
   "体位変換"
  ],
  "rows": [
   {
    "item": "褥瘡予防の体位変換",
    "target": "胸髄損傷者の褥瘡予防",
    "value": "体位変換は基本的に2時間以内の間隔(推奨度B)。粘弾性フォームマットレス等の体圧分散寝具では4時間以内でも可。30度側臥位・90度側臥位のどちらでも可(30度にこだわらず体型・好みに応じる)。円座は用いない。骨突出部のマッサージは行わない",
    "exam": "52-pm-49 正答=30度側臥位。誤答選択肢=体位変換は6時間ごと・好発部位に円座・ベッドアップ80度以上・好発部位のマッサージ",
    "q": [
     "52-pm-49"
    ],
    "note": "確認済み(S12 第4版 CQ, 2026-11-19)。ベッドアップ「80度以上」「30度程度」の数値は第4版で見つからず未確認。第5版(2022)は未取得",
    "conflict": false,
    "sources": [
     {
      "label": "S12",
      "url": "https://minds.jcqhc.or.jp/common/summary/pdf/c00350.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-19",
  "review": "ai"
 },
 {
  "slug": "primitive-reflexes",
  "name": "原始反射の消失時期",
  "category": "検査法・徴候",
  "aliases": [
   "原始反射",
   "Moro反射",
   "モロー反射",
   "手掌把握反射",
   "ATNR",
   "非対称性緊張性頸反射",
   "自動歩行",
   "Galant反射",
   "ギャラン反射",
   "Babinski反射",
   "バビンスキー反射"
  ],
  "rows": [
   {
    "item": "Moro反射の消失時期",
    "target": "原始反射の残存・消失の判断",
    "value": "4か月までに消失(第I相のみは6週以降)。4か月でMoro反射が残存=異常所見。StatPearls: 4〜6か月で消失、生後6か月を超えて残る場合は異常とみなす。幅: 国内マニュアル4か月までvs海外4〜6か月",
    "exam": "54-pm-85: Milani運動発達評価表で消失時期が最も遅いものを選ぶ問題の誤答選択肢(入力注記「4〜6か月ころ消失」)。55-am-85・59-am-6・60-pm-6・56-pm-85・54-am-8 でも選択肢に出現(いずれも誤答。55-am-85は「消失時期が最も遅い」の誤答)",
    "q": [
     "54-am-8",
     "54-pm-85",
     "55-am-85",
     "56-pm-85",
     "59-am-6",
     "60-pm-6"
    ],
    "note": "確認済み(原文) [S4] p.23、[S5]。Milani表そのものは原典未取得(未確認)",
    "conflict": false,
    "sources": [
     {
      "label": "S4",
      "url": "https://www.cfa.go.jp/assets/contents/node/basic_page/field_ref_resources/0b505d2e-87a3-488b-a78c-46a38fbcf38b/94412340/20250722_policies_boshihoken_manuals-etc_19.pdf"
     },
     {
      "label": "S5",
      "url": "https://www.ncbi.nlm.nih.gov/sites/books/NBK554606/"
     }
    ]
   },
   {
    "item": "手掌把握反射の消失時期",
    "target": "原始反射の残存・消失の判断",
    "value": "生後3か月頃から消失し始め遅くとも5〜6か月までに消失。強く残存=異常所見。StatPearls: 4〜6か月で消失。幅: 3〜6か月(出典により異なる)",
    "exam": "54-pm-85: Milaniの消失時期を問う選択肢(誤答。入力注記「4〜6か月ころ消失」)。54-am-47(誤答選択肢)",
    "q": [
     "54-am-47",
     "54-pm-85"
    ],
    "note": "確認済み(原文) [S4] p.23、[S5]",
    "conflict": false,
    "sources": [
     {
      "label": "S4",
      "url": "https://www.cfa.go.jp/assets/contents/node/basic_page/field_ref_resources/0b505d2e-87a3-488b-a78c-46a38fbcf38b/94412340/20250722_policies_boshihoken_manuals-etc_19.pdf"
     },
     {
      "label": "S5",
      "url": "https://www.ncbi.nlm.nih.gov/sites/books/NBK554606/"
     }
    ]
   },
   {
    "item": "非対称性緊張性頸反射(ATNR)の消失時期・肢位",
    "target": "原始反射の残存・脳性麻痺の姿勢",
    "value": "StatPearls: 約35週で出現し3〜4か月で統合。国試の選択肢には「4〜6か月ころ消失」(Milani)。強いATNR肢位(仰臥位で頭が一方を向いたまま動かせない)=姿勢の異常(診察マニュアル)。肢位: 顔を向けた側の上下肢が伸展(58-am-86の正答選択肢)",
    "exam": "54-pm-85(Milani)の誤答選択肢。58-am-86: ATNR=頸部を回旋させた側の上肢・下肢の伸展(正答の1つ)。60-pm-6: 5歳・痙直型四肢麻痺の背臥位姿勢に影響する反射=ATNR(正答)。54-am-8: 3歳・右片麻痺で背臥位から起き上がるときに影響=ATNR(正答)。61-pm-12: 誤答。59-am-85 ほかで選択肢",
    "q": [
     "54-am-8",
     "54-pm-85",
     "58-am-86",
     "59-am-85",
     "60-pm-6",
     "61-pm-12"
    ],
    "note": "確認済み(原文) [S5][S4] p.22。食い違い: 国試選択肢の「4〜6か月」と StatPearls の「3〜4か月」には幅がある(Milani表の原典は未確認)。58-am-86の肢位記述は資料未照合(問題文のみ)",
    "conflict": true,
    "sources": [
     {
      "label": "S4",
      "url": "https://www.cfa.go.jp/assets/contents/node/basic_page/field_ref_resources/0b505d2e-87a3-488b-a78c-46a38fbcf38b/94412340/20250722_policies_boshihoken_manuals-etc_19.pdf"
     },
     {
      "label": "S5",
      "url": "https://www.ncbi.nlm.nih.gov/sites/books/NBK554606/"
     }
    ]
   },
   {
    "item": "自動歩行(原始歩行)の消失時期",
    "target": "原始反射の消失",
    "value": "生後2〜3か月で消失(StatPearls)。国試選択肢の入力注記も「2〜3か月ころ」",
    "exam": "54-pm-85: Milaniの選択肢(誤答)。61-pm-12: 誤答。53-pm-27: アテトーゼ型で残存しやすい反射を問う誤答選択肢",
    "q": [
     "53-pm-27",
     "54-pm-85",
     "61-pm-12"
    ],
    "note": "確認済み(原文) [S5]",
    "conflict": false,
    "sources": [
     {
      "label": "S5",
      "url": "https://www.ncbi.nlm.nih.gov/sites/books/NBK554606/"
     }
    ]
   },
   {
    "item": "Galant反射の消失時期",
    "target": "原始反射の消失・アテトーゼ型での残存",
    "value": "StatPearls: 4〜6か月で消失。(国内の育児サイトでは3〜9か月と幅があるが非公式のため採用せず)",
    "exam": "53-pm-27: アテトーゼ型脳性麻痺で残存しやすい反射=Galant反射(正答)。60-pm-85・54-am-8は誤答。58-am-86の誤答選択肢では「Galant=体幹の回旋」(正しくは背部刺激で刺激側へ体幹が側屈)",
    "q": [
     "53-pm-27",
     "60-pm-85"
    ],
    "note": "確認済み(原文) [S5](消失時期)。体幹回旋/側屈の記述は未確認",
    "conflict": false,
    "sources": [
     {
      "label": "S5",
      "url": "https://www.ncbi.nlm.nih.gov/sites/books/NBK554606/"
     }
    ]
   },
   {
    "item": "Babinski反射の正常月齢",
    "target": "病的反射か正常な原始反射かの判断",
    "value": "新生児では陽性が正常。StatPearls: 12〜24か月で消失。陽性所見=足底刺激で母趾の背屈(＋他趾の開扇)。上位運動ニューロン障害で成人でも陽性",
    "exam": "59-am-85: 出生時に出現しているもの(正答の対象外、誤答)。52-am-35: Duchenne型でBabinski陽性は誤答。58-pm-6: Babinski陽性(亜急性連合性脊髄変性症)。60-pm-29: Parkinson病でBabinski陽性は誤答",
    "q": [
     "52-am-35",
     "58-pm-6",
     "59-am-85",
     "60-pm-29"
    ],
    "note": "確認済み(原文) [S5](12〜24か月)。陽性所見の定義は確認済み(要約) https://www.ncbi.nlm.nih.gov/sites/books/NBK519009/",
    "conflict": false,
    "sources": [
     {
      "label": "S5",
      "url": "https://www.ncbi.nlm.nih.gov/sites/books/NBK554606/"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-19",
  "review": "ai"
 },
 {
  "slug": "ra-acr-eular-2010",
  "name": "関節リウマチの分類基準(2010 ACR/EULAR)",
  "category": "診断基準・分類",
  "aliases": [
   "関節リウマチ分類基準",
   "ACR/EULAR",
   "2010年ACR/EULAR",
   "RA分類基準",
   "抗CCP抗体",
   "ACPA",
   "リウマトイド因子"
  ],
  "rows": [
   {
    "item": "分類基準の対象と判定",
    "target": "RAの分類(早期例)",
    "value": "対象=明確な滑膜炎(腫脹)が1関節以上にあり、他の疾患で説明できない患者。関節病変・血清学・急性期反応物質・罹患期間の4領域の合計が6点以上(10点満点)でRAと分類。6点未満でも、経過で基準を満たすことがある",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。原著(Arthritis Rheum 2010;62:2569/Ann Rheum Dis 2010;69:1580)の表3。骨びらん(RAに典型的)を伴う長期例や過去に基準を満たした例もRAと分類してよいとされる",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://hal.univ-brest.fr/hal-01557559/document"
     }
    ]
   },
   {
    "item": "関節病変の点数(0〜5点)",
    "target": "罹患関節の数と部位",
    "value": "大関節1個=0／大関節2〜10個=1／小関節1〜3個=2(大関節の有無を問わない)／小関節4〜10個=3／11関節超(小関節を1つ以上含む)=5。DIP・第1CMC・第1MTPは評価から除く",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。原著(Arthritis Rheum 2010;62:2569/Ann Rheum Dis 2010;69:1580)の表3",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://hal.univ-brest.fr/hal-01557559/document"
     }
    ]
   },
   {
    "item": "血清学的検査の点数(0〜3点)",
    "target": "RF・抗CCP抗体(ACPA)",
    "value": "RF・ACPAとも陰性=0／低力価陽性(正常上限超〜3倍以下)=2／高力価陽性(正常上限の3倍超)=3。RFが陽性・陰性でしか分からない場合、陽性は低力価陽性として扱う",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。原著(Arthritis Rheum 2010;62:2569/Ann Rheum Dis 2010;69:1580)の表3",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://hal.univ-brest.fr/hal-01557559/document"
     }
    ]
   },
   {
    "item": "急性期反応物質・罹患期間の点数(各0〜1点)",
    "target": "CRP・赤沈、症状の持続",
    "value": "CRP・赤沈とも正常=0、異常=1(基準は施設による)／症状の持続(患者の自己申告)6週未満=0、6週以上=1",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。原著(Arthritis Rheum 2010;62:2569/Ann Rheum Dis 2010;69:1580)の表3。表の記載が不鮮明なため、急性期反応物質は「CRPまたは赤沈の異常」と整理",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://hal.univ-brest.fr/hal-01557559/document"
     }
    ]
   },
   {
    "item": "大関節・小関節の定義",
    "target": "関節数の数え方",
    "value": "大関節=肩・肘・股・膝・足関節。小関節=MCP・PIP・第2〜5 MTP・母指IP・手関節。11関節超の区分では、顎・肩鎖・胸鎖関節など表にない関節も数に含められる(小関節を最低1つ含む)",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。原著(Arthritis Rheum 2010;62:2569/Ann Rheum Dis 2010;69:1580)の表3",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://hal.univ-brest.fr/hal-01557559/document"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "rbmt",
  "name": "リバーミード行動記憶検査(RBMT)",
  "category": "評価尺度",
  "aliases": [
   "RBMT",
   "リバーミード行動記憶検査",
   "リバーミード",
   "リバミード行動記憶検査",
   "Rivermead Behavioural Memory Test",
   "Rivermead",
   "日本版RBMT",
   "行動記憶検査"
  ],
  "rows": [
   {
    "item": "RBMTの目的",
    "target": "日常生活での記憶障害の検出",
    "value": "記憶障害による日常生活上の困難を明らかにするために作られた記憶検査。失点した項目は日常生活でも障害を来している可能性が高いと考えられる",
    "exam": "59-pm-81(正答: 日常生活場面で必要とされる記憶の障害を検出するのに最も適した検査)／53-am-29(正答: 記憶障害の評価法)",
    "q": [
     "59-pm-81",
     "53-am-29"
    ],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/neuropsychology/39/3/39_17190/_pdf/-char/ja"
     }
    ]
   },
   {
    "item": "下位検査の内容",
    "target": "日常場面を想定した課題",
    "value": "顔写真を見せて姓名を覚える(顔と名前の連合記憶)、検査室内で決めた道順を覚える(道順)、20分後に鳴るアラームで決められた言葉を言う(約束)など、日常場面に即した課題を含む。さらに言語性・視覚性の記憶検査と、直後再生・遅延再生の下位検査がある",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。下位検査の全項目名・配点は本資料では確認していない",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/neuropsychology/39/3/39_17190/_pdf/-char/ja"
     }
    ]
   },
   {
    "item": "得点と実施",
    "target": "結果の表し方",
    "value": "成績はスクリーニング点と標準プロフィール点の2種類で表し、標準プロフィール点は下位検査間で直接比較できる。実施時間は平均約27分。同等難度の並行バッテリーが4つあり、練習効果を避けて繰り返し評価できる。日本版は2002年初版、2023年に手引きと記録用紙の増補版が出た",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/neuropsychology/39/3/39_17190/_pdf/-char/ja"
     }
    ]
   },
   {
    "item": "他の記憶・認知検査との区別",
    "target": "検査の使い分け",
    "value": "WMS-Rは物語・図形・言語性対連合・視覚性対連合などからなる総合的な記憶検査で、5つの指標(平均100・標準偏差15)を出す。実施に45〜60分かかる。日常場面の記憶障害の検出にはRBMTが向く",
    "exam": "61-am-4・61-am-37・61-am-98(TMT・WAIS-IV・WCST・WMS-R・BIT・RBMT・VPTAは各問の選択肢。WAIS・WMS-R・MMSEは人格検査ではない)",
    "q": [
     "61-am-4",
     "61-am-37",
     "61-am-98"
    ],
    "note": "確認済み[S1]。TMT・WCST・BIT・VPTAの内容は本カードの範囲外",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/neuropsychology/39/3/39_17190/_pdf/-char/ja"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "repetitive-stimulation",
  "name": "反復刺激試験",
  "category": "臨床検査",
  "aliases": [
   "反復刺激試験",
   "waning",
   "waxing",
   "漸減現象",
   "漸増現象"
  ],
  "rows": [
   {
    "item": "反復刺激試験（重症筋無力症）",
    "target": "重症筋無力症（MG）の診断",
    "value": "3 Hzで10回刺激し、減衰率10%以上で異常（顔面筋では7〜8%に下げる）",
    "exam": "54-pm-91 誤答「MGで振幅の漸増」（漸減が正）。57-pm-44 誤答「waxing現象」（waningが正）。59-pm-91 誤答「ALSでWaning・Waxing」。58-am-14 誤答「CIDPで反復刺激でwaning・waxing」",
    "q": [
     "54-pm-91",
     "57-pm-44",
     "58-am-14",
     "59-pm-91"
    ],
    "note": "確認済み [S17]",
    "conflict": false,
    "sources": [
     {
      "label": "S17",
      "url": "https://www.neurology-jp.org/guidelinem/pdf/mg_2022.pdf"
     }
    ]
   },
   {
    "item": "反復刺激試験（ランバート・イートン症候群）",
    "target": "LEMSの診断",
    "value": "低頻度刺激（2〜5 Hz）で10%以上の漸減。高頻度刺激（20〜50 Hz）または10秒間の最大随意収縮後に60%以上の漸増",
    "exam": "53-am-9 誤答「連続刺激でM波振幅漸増」（LEMSの所見）。58-am-14 誤答（waxing）。54-pm-91・57-pm-44（waxing）",
    "q": [
     "53-am-9",
     "54-pm-91",
     "57-pm-44",
     "58-am-14"
    ],
    "note": "確認済み [S17]",
    "conflict": false,
    "sources": [
     {
      "label": "S17",
      "url": "https://www.neurology-jp.org/guidelinem/pdf/mg_2022.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-19",
  "review": "ai"
 },
 {
  "slug": "respiratory-failure-aado2",
  "name": "呼吸不全の分類・A-aDO2・低酸素血症の機序",
  "category": "診断基準・分類",
  "aliases": [
   "呼吸不全",
   "Ⅰ型呼吸不全",
   "Ⅱ型呼吸不全",
   "I型呼吸不全",
   "II型呼吸不全",
   "A-aDO2",
   "AaDO2",
   "肺胞気動脈血酸素分圧較差",
   "酸素解離曲線",
   "換気血流比",
   "拡散障害",
   "低酸素血症",
   "肺胞低換気",
   "右左シャント"
  ],
  "rows": [
   {
    "item": "呼吸不全の定義とⅠ型・Ⅱ型",
    "target": "呼吸不全の分類",
    "value": "室内気でPaO2 60 Torr以下=呼吸不全。PaCO2 45 Torr以下=Ⅰ型、45 Torr超=Ⅱ型。PaO2 60超〜70 Torr以下=準呼吸不全。呼吸不全が1か月以上続くと慢性呼吸不全",
    "exam": "58-am-18(COPDによるⅡ型呼吸不全)／58-am-94(正答:肺塞栓症はⅠ型呼吸不全を呈する)／55-am-7・55-am-8(症例のPaO2 65 Torr・PaCO2 48 Torr)",
    "q": [
     "58-am-18",
     "58-am-94",
     "55-am-7",
     "55-am-8"
    ],
    "note": "確認済み[S1][S2]。資料は多発性肺血栓塞栓症を拡散障害(A-aDO2開大=Ⅰ型の機序)の原因に挙げる[S1]。55-am-7/8の値はPaO2 60超〜70で準呼吸不全の範囲、PaCO2は45超。慢性呼吸不全でⅡ型の肺疾患としてCOPDが挙がること自体は資料で個別確認していない",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://jspm.ne.jp/files/guideline/respira_2016/02_02.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.jrs.or.jp/file/disease_h02.pdf"
     }
    ]
   },
   {
    "item": "A-aDO2(肺胞気動脈血酸素分圧較差)",
    "target": "Ⅰ型とⅡ型の鑑別・ガス交換の指標",
    "value": "A-aDO2=PAO2−PaO2。室内気のPAO2=150−PaCO2/0.8。目安は10 Torr以下=正常、10〜20=境界、20以上=異常。Ⅰ型は開大(換気血流比不均等・拡散障害・右左シャント)。純粋な肺胞低換気(Ⅱ型)では正常範囲",
    "exam": "58-pm-85(Ⅱ型で正常、Ⅰ型で増加するもの=A-aDO2(正答)。誤答:1秒率・肺活量・PaO2・PaCO2)",
    "q": [
     "58-pm-85"
    ],
    "note": "確認済み[S1]。基準は資料で異なり、別資料(MSD)は「典型的な正常値は20未満」とし加齢・FiO2上昇で開大するとする[S2]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://jspm.ne.jp/files/guideline/respira_2016/02_02.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.msdmanuals.com/ja-jp/professional/05-肺疾患/肺機能検査-pft-pulmonary-function-test/ガス交換の測定"
     }
    ]
   },
   {
    "item": "低酸素血症の機序",
    "target": "換気血流比不均等・拡散障害・シャント・肺胞低換気",
    "value": "①肺胞低換気(PaCO2↑、A-aDO2正常)／②換気血流比不均等(A-aDO2開大、酸素吸入でPaO2は改善)／③拡散障害(開大。運動時に顕在化しやすい。CO2はO2の約20倍速く拡散するため、肺胞低換気がなければPaCO2は上がらない)／④右左シャント(開大。酸素吸入でも改善しにくい)／⑤吸入気酸素分圧の低下(高地)",
    "exam": "60-am-16(COVID-19肺炎で背臥位PaO2 60→腹臥位100 mmHg。最も影響した要因=換気血流比(正答)。誤答:肺拡散能・解剖学的死腔・肺動静脈奇形・吸入気酸素濃度)／59-pm-41(拡散障害による低酸素血症(正答))／61-pm-64(誤答:シャント時の換気血流比は増加・肺胞O2の拡散能がCO2より高い)",
    "q": [
     "60-am-16",
     "59-pm-41",
     "61-pm-64"
    ],
    "note": "確認済み[S1]。「肺胞O2の拡散能がCO2より高い」は誤り(CO2が約20倍速い)。シャント時の換気血流比の増減、腹臥位で換気血流比が改善する機序は資料に記載がなく未確認",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://jspm.ne.jp/files/guideline/respira_2016/02_02.pdf"
     }
    ]
   },
   {
    "item": "酸素解離曲線の移動",
    "target": "ヘモグロビンの酸素親和性",
    "value": "右方移動(Hbの酸素親和性が低下=組織で酸素を放しやすい)=H+濃度上昇(pH低下)・PCO2上昇・体温上昇・赤血球2,3-DPG増加。左方移動=これらが低下(pH上昇など)",
    "exam": "61-pm-64(誤答:pH増加で酸素解離曲線は右方移動。正しくは左方)／55-am-64(PaCO2が上昇するとHbから酸素が解離しやすくなる(正答))",
    "q": [
     "61-pm-64",
     "55-am-64"
    ],
    "note": "確認済み[S1]。55-am-64の誤答「頸動脈小体はPaO2よりPaCO2の変化を感知しやすい」は資料で確認していない",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/05-肺疾患/肺機能検査-pft-pulmonary-function-test/ガス交換の測定"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "romberg-test",
  "name": "Romberg試験・徴候",
  "category": "検査法・徴候",
  "aliases": [
   "Romberg",
   "Romberg徴候",
   "Romberg sign",
   "Romberg test",
   "Romberg's test",
   "ロンベルグ試験",
   "ロンベルグ徴候",
   "ロンベルグ",
   "ロンベルク徴候",
   "ロンベルクテスト",
   "Romberg肢位"
  ],
  "rows": [
   {
    "item": "Romberg試験の手技と陽性",
    "target": "閉眼での立位保持",
    "value": "靴を脱ぎ、足をそろえて(閉脚立位)、開眼で約30秒、続いて閉眼で30秒〜1分立つ。検者は支えず、転倒に備えて近くにいる。閉眼でバランスを崩す(動揺が増える・足が動く・倒れる)と陽性",
    "exam": "61-pm-71(誤答: Romberg肢位は開脚立位より安定性が高い。閉脚のため支持基底面は開脚立位より狭い)／60-pm-12(閉眼でふらつく症例。名称は出題文になし)／61-am-40(Hoehn&Yahrの判定問題の誤答選択肢。入力の記録による)",
    "q": [
     "61-pm-71",
     "60-pm-12",
     "61-am-40"
    ],
    "note": "確認済み[S2]。立位バランスの安定性そのものの比較は本資料では確認していない",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://my.clevelandclinic.org/health/diagnostics/22901-romberg-test"
     }
    ]
   },
   {
    "item": "陽性となる病態: 深部感覚障害(後索性)",
    "target": "脊髄後索・末梢神経性の感覚性運動失調",
    "value": "Romberg徴候陽性は、もともと下肢の深部感覚(固有感覚)障害を示唆する所見で、閉眼で視覚情報が断たれ、立位保持の感覚成分が障害されていると解釈されてきた。脊髄癆、糖尿病性ニューロパチー(偽性脊髄癆)、亜急性脊髄連合変性症などでみられる。",
    "exam": "60-pm-82(正答: 深部感覚障害で陽性)／56-pm-34(正答: 脊髄性運動失調でRomberg徴候陽性。誤答: 折りたたみナイフ現象・断綴性発語・酩酊歩行・羽ばたき振戦)／59-am-31(誤答選択肢: 後索障害)／52-am-83・52-pm-12(錐体路障害の評価ではない)／54-pm-6(Gowers・Lhermitteとの区別)",
    "q": [
     "60-pm-82",
     "56-pm-34",
     "59-am-31",
     "52-am-83",
     "52-pm-12",
     "54-pm-6"
    ],
    "note": "確認済み[S1]。「錐体路障害の評価ではない」は、深部感覚障害を示唆する検査であることからの整理。深部感覚障害が明らかでなくても陽性になることがある点は別の行を参照",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/clinicalneurol/63/4/63_cn-001820/_html/-char/ja"
     }
    ]
   },
   {
    "item": "小脳性では古典的に陰性",
    "target": "小脳性運動失調との鑑別",
    "value": "感覚性(後索型)ではRomberg陽性、小脳性では古典的には陰性。小脳性の歩行は開脚でよろめく。小脳障害では通常陽性にならないが、前庭小脳や脊髄小脳路の障害では閉眼で不安定さが増すことはある",
    "exam": "51回(小脳性の企図振戦でみられるものに「Romberg徴候陽性」は誤り)／56-pm-34(小脳性の断綴性発語・酩酊歩行は誤答)",
    "q": [],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/clinicalneurol/63/4/63_cn-001820/_html/-char/ja"
     }
    ]
   },
   {
    "item": "前庭性との関係",
    "target": "前庭障害・めまい",
    "value": "前庭性の失調は後索性ともRomberg試験の陽性が共通し、鑑別には使えない。後索性・小脳性では踵膝試験が障害されるが、前庭性では通常正常。Romberg徴候は末梢前庭障害のスクリーニングにも用いられる",
    "exam": "53-am-36(後索性・小脳性に比べ前庭性に最も関連する異常。正答は耳鳴り。Romberg試験陽性は誤答選択肢)",
    "q": [
     "53-am-36"
    ],
    "note": "確認済み[S1][S3]。陽性は後索性と共通のため、前庭性に「最も」特徴的とは言えない",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/clinicalneurol/63/4/63_cn-001820/_html/-char/ja"
     },
     {
      "label": "S3",
      "url": "https://www.jstage.jst.go.jp/article/jser/81/3/81_142/_article/-char/en"
     }
    ]
   },
   {
    "item": "注意点",
    "target": "陽性の読み方",
    "value": "脊髄癆で深部感覚障害が明らかでない例や、失明後にも閉眼で陽性となることがあり、広義の前庭系の関与も考えられている。下肢の筋力低下(足の内反力の低下)でも陽性になることがある。検査は単独でなく深部感覚検査などと併せて判断する",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/clinicalneurol/63/4/63_cn-001820/_html/-char/ja"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "rorschach-test",
  "name": "Rorschachテスト",
  "category": "評価尺度",
  "aliases": [
   "Rorschach",
   "Rorschach test",
   "ロールシャッハテスト",
   "ロールシャッハ・テスト",
   "ロールシャッハ検査",
   "ロールシャッハ",
   "インクブロット",
   "インクのしみ"
  ],
  "rows": [
   {
    "item": "図版と実施",
    "target": "ロールシャッハテストの内容",
    "value": "紙にインクを落として二つ折りにして作った、ほぼ左右対称の図版10枚を使う(無彩色5枚、有彩色5枚)。1枚ずつ提示して何に見えるかを自由に答えてもらい(自由反応段階)、次になぜそう見えたかを尋ね(質問段階)、データを分析する",
    "exam": "59-am-78(正答: 左右対称のインクのシミの図版を順番に提示する検査)",
    "q": [
     "59-am-78"
    ],
    "note": "確認済み[S1][S5]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://tk.seitoku-u.ac.jp/cms_tk_seitoku/wp-content/uploads/2024/12/%E8%81%96%E5%BE%B3%E5%A4%A7%E5%AD%A6%E5%85%AC%E8%AA%8D%E5%BF%83%E7%90%86%E5%B8%AB%E5%85%A5%E5%AD%A6%E8%AA%AC%E6%98%8E%E4%BC%9A%E6%A8%A1%E6%93%AC%E8%AC%9B%E7%BE%A9%E3%83%91%E3%83%BC%E3%82%BD%E3%83%8A%E3%83%AA%E3%83%86%E3%82%A3%E6%A4%9C%E6%9F%BB.pdf"
     },
     {
      "label": "S5",
      "url": "https://www.gakushuin.ac.jp/univ/let/top/publication/JI_23/JI_23_006.pdf"
     }
    ]
   },
   {
    "item": "分類: 投影法",
    "target": "心理検査の種類",
    "value": "曖昧な刺激に自由に反応させ、無意識的な心の動きを探る投影法の代表。質問紙法ではない。SCT・TAT・P-Fスタディ・バウムテストも投影法に分類される。熟練が必要で主観が入りやすく、妥当性への疑問も指摘される",
    "exam": "57-am-35(誤答: 認知症スクリーニングではない)／57-am-81(バウムテスト・Rorschach: 投影法で質問紙法ではない)／51回(投影法)",
    "q": [
     "57-am-35",
     "57-am-81"
    ],
    "note": "確認済み[S1][S2][S4]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://tk.seitoku-u.ac.jp/cms_tk_seitoku/wp-content/uploads/2024/12/%E8%81%96%E5%BE%B3%E5%A4%A7%E5%AD%A6%E5%85%AC%E8%AA%8D%E5%BF%83%E7%90%86%E5%B8%AB%E5%85%A5%E5%AD%A6%E8%AA%AC%E6%98%8E%E4%BC%9A%E6%A8%A1%E6%93%AC%E8%AC%9B%E7%BE%A9%E3%83%91%E3%83%BC%E3%82%BD%E3%83%8A%E3%83%AA%E3%83%86%E3%82%A3%E6%A4%9C%E6%9F%BB.pdf"
     },
     {
      "label": "S2",
      "url": "https://kompas.hosp.keio.ac.jp/exam/000388/"
     },
     {
      "label": "S4",
      "url": "https://crd.ndl.go.jp/reference/entry/index.php?page=ref_view&id=1000221958"
     }
    ]
   },
   {
    "item": "SCT(文章完成法)・P-Fスタディとの区別",
    "target": "人格検査の種類",
    "value": "SCTは未完成の刺激文の続きを自由に書く投影法で、投影法の中では比較的意識に近い。P-Fスタディも投映法に分類される。いずれも認知機能検査・介護負担度・自己効力感の尺度ではない",
    "exam": "55-pm-81(誤答の組合せ: SCT―認知機能、P-Fスタディ―認知症介護負担度、Rorschach―自己効力感)",
    "q": [
     "55-pm-81"
    ],
    "note": "確認済み[S1][S4]。「認知機能・介護負担度・自己効力感ではない」は、人格検査であることからの整理",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://tk.seitoku-u.ac.jp/cms_tk_seitoku/wp-content/uploads/2024/12/%E8%81%96%E5%BE%B3%E5%A4%A7%E5%AD%A6%E5%85%AC%E8%AA%8D%E5%BF%83%E7%90%86%E5%B8%AB%E5%85%A5%E5%AD%A6%E8%AA%AC%E6%98%8E%E4%BC%9A%E6%A8%A1%E6%93%AC%E8%AC%9B%E7%BE%A9%E3%83%91%E3%83%BC%E3%82%BD%E3%83%8A%E3%83%AA%E3%83%86%E3%82%A3%E6%A4%9C%E6%9F%BB.pdf"
     },
     {
      "label": "S4",
      "url": "https://crd.ndl.go.jp/reference/entry/index.php?page=ref_view&id=1000221958"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "rsbi-cpf",
  "name": "人工呼吸器からの離脱と咳の強さ(RSBI・CPF)",
  "category": "臨床検査",
  "aliases": [
   "RSBI",
   "浅速呼吸指数",
   "CPF",
   "咳最大流量"
  ],
  "rows": [
   {
    "item": "浅速呼吸指数（f/VT、RSBI）",
    "target": "人工呼吸器離脱の可否",
    "value": "f/VT 105回/min/L未満（離脱の目安）",
    "exam": "60-am-3 誤答選択肢「f/TVが150以上であれば筋力増強運動を行う」（150は基準外のため誤り。正答データなし）",
    "q": [
     "60-am-3"
    ],
    "note": "確認済み [S16]",
    "conflict": false,
    "sources": [
     {
      "label": "S16",
      "url": "https://www.jsicm.org/pdf/kokyuki_ridatsu1503b.pdf"
     }
    ]
   },
   {
    "item": "咳最大流量（CPF）",
    "target": "咳介助・NIV開始の目安（ALS）",
    "value": "CPF 270 L/min未満で機械的咳嗽補助、160 L/min未満でNIV開始",
    "exam": "57-am-45 誤答「咳介助を行う目安にならない」（目安になる）。値は出題なし",
    "q": [
     "57-am-45"
    ],
    "note": "確認済み [S10]",
    "conflict": false,
    "sources": [
     {
      "label": "S10",
      "url": "https://neurology-jp.org/guidelinem/pdf/als_2023.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-19",
  "review": "ai"
 },
 {
  "slug": "sara",
  "name": "Scale for the Assessment and Rating of Ataxia(運動失調の評価尺度)",
  "category": "評価尺度",
  "aliases": [
   "Scale for the Assessment and Rating of Ataxia",
   "運動失調の評価尺度",
   "ICARS",
   "International Cooperative Ataxia Rating Scale"
  ],
  "rows": [
   {
    "item": "SARA の概要(8項目・満点40点)",
    "target": "小脳性運動失調の重症度(脊髄小脳変性症など)",
    "value": "歩行・立位・坐位・言語障害・指追い試験・鼻-指試験・手の回内回外運動・踵-すね試験の8項目で評価し、最重度が40点。0点=運動失調なしで、点が高いほど重い。ICARSより簡便な評価を目的に作られ、脊髄小脳失調症の患者で信頼性・妥当性が検討された。",
    "exam": "59-am-48・58-am-32(正答:脊髄小脳変性症の運動失調の評価指標)／57-am-34(正答の1つ:脊髄小脳変性症の包括的評価指標)／57-pm-33(誤答:Parkinson病の評価としては誤)／55-pm-12(小脳性運動失調の症例で「適切でない指標」を選ぶ設問で、SARAは適切な指標=誤答側)",
    "q": [
     "59-am-48",
     "58-am-32",
     "57-am-34",
     "57-pm-33",
     "55-pm-12"
    ],
    "note": "確認済み[S1][S2][S3]。8項目・最重症40点は日本神経学会ガイドラインの記載。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://neurology-jp.org/guidelinem/sd_mst/sd_mst_2018.pdf"
     },
     {
      "label": "S2",
      "url": "https://pubmed.ncbi.nlm.nih.gov/16769946/"
     },
     {
      "label": "S3",
      "url": "https://www.sralab.org/sites/default/files/2017-06/SARA.pdf"
     }
    ]
   },
   {
    "item": "SARA の項目と配点",
    "target": "8項目の内訳",
    "value": "歩行0〜8(8=支えがあっても歩けない)、立位0〜6(6=片腕で支えても10秒立てない)、坐位0〜4、言語障害0〜6(6=発話が理解できない)。指追い試験・鼻-指試験・手の回内回外運動・踵-すね試験は各0〜4で、左右別に採点して平均を使う。合計=8+6+4+6+16=40点。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。左右の平均を使う点は記録用紙の記載。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.sralab.org/sites/default/files/2017-06/SARA.pdf"
     }
    ]
   },
   {
    "item": "集中リハビリテーションの転帰指標",
    "target": "脊髄小脳変性症の理学療法",
    "value": "小脳失調が主体の脊髄小脳変性症では、バランスや歩行に対する理学療法を集中的に行うと小脳失調や歩行が改善する(推奨グレード1B)。研究での介入量の例は1〜2時間/回×週3〜7回×4週間。転帰指標にはSARA・歩行速度・バランス指標・FIMなどが使われ、短期的にSARAと歩行速度が改善し、改善は6〜12か月維持されていた。",
    "exam": "60-am-43(正答:SARA=脊髄小脳変性症・多系統萎縮症診療ガイドライン2018で集中リハの転帰指標として示されているもの。誤答:筋力・咳嗽力・深部感覚・関節可動域)",
    "q": [
     "60-am-43"
    ],
    "note": "確認済み[S1]。SARAのほか歩行速度・FIMなども転帰指標に使われる。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://neurology-jp.org/guidelinem/sd_mst/sd_mst_2018.pdf"
     }
    ]
   },
   {
    "item": "SARA 15〜20点以上とADL",
    "target": "作業療法・ADL支援の目安",
    "value": "SARAが15〜20点以上になるとADLに支障が出る傾向が強いため、支障のあるADLに関連した動作練習で改善が得られる可能性がある(エビデンスレベルV)。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。エビデンスレベルは低い(V)。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://neurology-jp.org/guidelinem/sd_mst/sd_mst_2018.pdf"
     }
    ]
   },
   {
    "item": "ICARS・UMSARS・BBSとの関係",
    "target": "運動失調・多系統萎縮症の評価尺度の使い分け",
    "value": "運動失調の半定量的評価の代表はICARS(19項目・最重症100点)とSARA。多系統萎縮症の重症度にはUMSARS。姿勢障害の評価にはBerg Balance Scale(日本語版あり)も紹介されている。",
    "exam": "55-pm-12の設問でも、FBS(Berg)は運動失調の評価として並ぶ側の選択肢(SARAと同様に適切な指標)",
    "q": [],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://neurology-jp.org/guidelinem/sd_mst/sd_mst_2018.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "sci-functional-level",
  "name": "脊髄損傷の機能残存レベルとADL(Zancolli分類)",
  "category": "診断基準・分類",
  "aliases": [
   "Zancolli",
   "Zancolli分類",
   "Zancolliの分類",
   "ザンコリ分類",
   "機能残存レベル",
   "残存機能レベル",
   "頸髄損傷",
   "脊髄損傷",
   "トランスファーボード",
   "万能カフ"
  ],
  "rows": [
   {
    "item": "Zancolli分類(頸髄損傷の上肢の残存機能)",
    "target": "頸髄損傷の上肢機能の評価",
    "value": "1 肘屈曲可能群=C5〜6(上腕二頭筋・上腕筋。A=腕橈骨筋の機能なし C5A、B=あり C5B)／2 手関節伸展可能群=C6〜7(長・短橈側手根伸筋。A=背屈力が弱い C6A、B=強い)／3 手指伸展可能群=C7〜8(総指伸筋・小指伸筋・尺側手根伸筋)／4 手指屈曲可能群=C8〜Th1(固有示指伸筋・長母指伸筋・深指屈筋・尺側手根屈筋)。",
    "exam": "58-pm-83(第6頸髄節まで機能残存の上肢機能:手関節背屈・肘関節屈曲が正答。誤答:小指外転・母指内転・中指DIP屈曲)／55-pm-18(受傷8週後のMMTの表から機能残存レベルを問う。正答はC6。C6は手関節背屈の筋)／49-am-12(MMT表:三角筋5・上腕二頭筋5・上腕三頭筋2・橈側手根伸筋5・指伸筋2・小指外転筋0→C6)",
    "q": [
     "58-pm-83",
     "55-pm-18",
     "49-am-12"
    ],
    "note": "確認済み[S1]。C6は手関節伸展(橈側手根伸筋)が残る段階で、指伸筋(C7)は含まれない。中指DIP屈曲(深指屈筋)は4群(C8〜)に当たる。小指外転・母指内転の髄節は本資料で確認できていない。Zancolli分類は本来、手の機能再建のための分類で、肩周囲筋の状態は反映されない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.hwc.or.jp/hospital/pdf/sekisonpanf.pdf"
     }
    ]
   },
   {
    "item": "C6レベルのサブグループ",
    "target": "C6の細分類(C6A、C6BⅠ〜Ⅲ)",
    "value": "C6A=手関節背屈力が弱い。C6B=手関節背屈力が強い。そのうちⅠ=円回内筋・橈側手根屈筋・上腕三頭筋の機能なし、Ⅱ=円回内筋の機能あり、Ⅲ=円回内筋・橈側手根屈筋・上腕三頭筋の機能あり。",
    "exam": "出題は直接なし(C6の機能を問う59-pm-13・58-pm-83・55-pm-18・54-pm-15の理解の参考)",
    "q": [],
    "note": "確認済み[S1]。[S1]の目安表では、C6BⅢから移乗・入浴が◎(用具なしで自立可能)、更衣はC6BⅡから◎とされている。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.hwc.or.jp/hospital/pdf/sekisonpanf.pdf"
     }
    ]
   },
   {
    "item": "レベル別ADL到達度の目安(兵庫県リハビリ中央病院の経験にもとづく表)",
    "target": "完全麻痺での食事・更衣・移乗・自動車運転などの自立度",
    "value": "記号:×=全介助／△=福祉用具・自助具・環境設定などの条件で自立できる場合がある／○=条件があればほとんどの場合自立可能／◎=特異例を除き、用具なしで自立可能。食事:C4=△、C5A=△、C5B〜C7=○、C8以下=◎。更衣:C4・C5A=×、C5B・C6A=△、C6BⅠ=○、C6BⅡ以下=◎。移乗:C4=×、C5A=△、C5B〜C6BⅡ=○、C6BⅢ以下=◎。自動車運転:C4〜C5B=×、C6A=△、C6BⅠ〜C8=○、胸髄以下=◎。",
    "exam": "53-am-84(機能残存レベルと動作。正答:C7—更衣。誤答:C4—万能カフを用いた食事、C5—前方移乗、C6—橈側-手掌握り、C8—長下肢装具での歩行)／56-pm-41(完全損傷の機能残存レベルと実用能力。正答:第3胸髄節=自動車への移乗。誤答:第5頸髄節=プッシュアップ、第10胸髄節=両長下肢装具歩行、第12胸髄節=両短下肢装具歩行)",
    "q": [
     "53-am-84",
     "56-pm-41"
    ],
    "note": "確認済み[S1]。あくまで1施設の経験にもとづく目安で、レベル以外の要因でも変わると資料が断っている。表ではC4の食事は条件付きで自立する場合があるとされ(△)、国試が「C4—万能カフを用いた食事」を誤りとする点とは、表現の厳しさが異なる。C5の前方移乗・C6の橈側-手掌握り・下肢装具での歩行は本資料では確認できていない。",
    "conflict": true,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.hwc.or.jp/hospital/pdf/sekisonpanf.pdf"
     }
    ]
   },
   {
    "item": "動作ごとに自立しやすいレベル(退院時のFIMの報告)",
    "target": "車いす駆動・食事・更衣・排泄・入浴の自立レベル",
    "value": "車いす駆動=C6以下で自力駆動が自立可能(C5でも条件が整えば可)／食事=C5以下で自助具・環境調整により自立可能／更衣=C7以下は入院中に自立可能、C6以上も長期の練習で自立し得る(衣服の改良が必要)／自己導尿=男性はC5B、女性はC6B2以下で2〜3か月の練習により自立／排便・入浴=C6でも専用の車いす・自助具と長期の練習により自立可能。",
    "exam": "53-am-84(正答:C7—更衣。誤答:C4—万能カフを用いた食事)／57-am-44(C7残存で自立が最も困難なのは、床面から車椅子への乗り移りが正答)",
    "q": [
     "53-am-84",
     "57-am-44"
    ],
    "note": "確認済み[S2]。当センターの退院時の平均値にもとづき、各レベルの自立度の限界値ではないと資料が断っている。「床から車いすへの乗り移り」は資料に記載がなく、57-am-44は確認できていない。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.hwc.or.jp/hospital/file/sekison01.pdf"
     }
    ]
   },
   {
    "item": "移乗の方法(リフト・前方・側方・トランスファーボード)",
    "target": "頸髄損傷の移乗動作の選び方",
    "value": "移乗にはリフト移乗・前方移乗・側方移乗がある。前方移乗は臀部挙上(プッシュアップ)能力が低い人に、側方移乗はプッシュアップが可能で体幹バランスが比較的よい人に選ばれる。練習でリフト→前方→側方へと進む例が多い。トランスファーボードなどの補助用具を使うと、高位頸損でも獲得できる動作になる。",
    "exam": "57-am-15(トランスファーボード移乗の図→C6が正答)／54-pm-15(トランスファーボードを用いた車椅子からベッドへの移乗を獲得目標とする機能残存レベル=C6が正答)／59-pm-13(プッシュアップを獲得できる最も高位の機能残存レベル=C6が正答)",
    "q": [
     "57-am-15",
     "54-pm-15",
     "59-pm-13"
    ],
    "note": "確認済み[S2]。移乗やプッシュアップが可能になる最高位の髄節(C6)は本資料に明記がなく、国試の正答(C6)は資料から確認できていない。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.hwc.or.jp/hospital/file/sekison01.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "sensory-examination",
  "name": "感覚検査(表在・深部・複合感覚と解離性感覚障害)",
  "category": "検査法・徴候",
  "aliases": [
   "感覚検査",
   "解離性感覚障害",
   "温痛覚解離",
   "Brown-Séquard症候群",
   "ブラウン-セカール症候群",
   "前脊髄動脈症候群",
   "前脊髄症候群",
   "振動覚",
   "音叉",
   "128Hz音叉",
   "位置覚",
   "関節位置覚",
   "複合感覚",
   "皮質感覚",
   "二点識別覚",
   "2点識別",
   "立体認知",
   "皮膚書字覚",
   "消去現象",
   "Romberg試験",
   "ロンベルク試験",
   "温痛覚",
   "深部感覚",
   "表在感覚"
  ],
  "rows": [
   {
    "item": "Brown-Séquard症候群の感覚障害・運動麻痺",
    "target": "脊髄半側障害での解離性感覚障害",
    "value": "病変と同側:不全麻痺、触覚・位置覚・振動覚の消失。病変の反対側:温痛覚の消失。脊髄視床路は脊髄内で対側性に温痛覚を伝え、他の大部分の神経路は同側性に伝える。",
    "exam": "55-pm-83(正答:損傷髄節より下位の反対側に現れる=痛覚障害・温度覚障害。誤答:運動麻痺・触覚障害・深部覚障害=同側に出る)",
    "q": [
     "55-pm-83"
    ],
    "note": "確認済み[S1]。国試の誤答の整理(運動麻痺・触覚・深部覚は同側)は資料と一致。まれな症候群で、典型例は穿通性外傷による。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-神経疾患/脊髄疾患/脊髄疾患の概要"
     }
    ]
   },
   {
    "item": "感覚検査の器具と方法(振動覚・位置覚・痛覚・触覚・温度覚)",
    "target": "感覚の種類ごとの検査",
    "value": "振動覚=128Hzの音叉を叩いて遠位指節間関節にあて、検者の指を関節の下に置いて、振動の終わりを患者と検者でほぼ同時に感じるか確かめる。位置覚=手指の末節・足趾を上下に動かし、閉眼で動きの方向を答えさせる。痛覚=安全ピンなどで軽くつつき、左右差・鋭い鈍いを尋ねる。軽い触覚=綿球。温度覚=通常は冷たい音叉。",
    "exam": "61-pm-24(正答:深部感覚検査(振動覚)に使うのは音叉。誤答:試験管(温度覚)・ノギス(2点識別覚)・つまようじ(痛覚)・モノフィラメント(触覚))",
    "q": [
     "61-pm-24"
    ],
    "note": "確認済み[S2]。音叉=振動覚は資料と一致。試験管・ノギス・つまようじ・モノフィラメントは資料に記載がなく確認できていない(資料は温度覚に冷たい音叉、痛覚に安全ピンを挙げている)。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-神経疾患/神経学的診察/感覚の評価"
     }
    ]
   },
   {
    "item": "前脊髄症候群(前脊髄動脈の梗塞)の感覚",
    "target": "脊髄腹側の障害での感覚障害の型",
    "value": "後索以外のすべての神経路が障害されるため、位置覚・振動覚は保たれる(温痛覚などは障害される)。",
    "exam": "49-pm-31(正答:前脊髄動脈症候群で損傷レベル以下で低下するのは温度覚。二点識別覚・運動覚・位置覚・振動覚は保たれる)",
    "q": [
     "49-pm-31"
    ],
    "note": "確認済み[S1]。『二点識別覚・運動覚』が保たれる点は資料に明記がなく、位置覚・振動覚(後索系)が保たれる点のみ確認。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-神経疾患/脊髄疾患/脊髄疾患の概要"
     }
    ]
   },
   {
    "item": "複合感覚(皮質感覚)の検査",
    "target": "大脳皮質レベルの感覚の評価",
    "value": "握らせた物を当てる(立体認知)、手掌に書いた数字を当てる(皮膚書字覚)、指先の2点を区別する(2点識別感覚)。刺激を両側同時に与えると片側を感じない感覚消去現象も皮質感覚障害の指標。関節位置覚は、後索-内側毛帯路を通る深部感覚として別に扱われる。",
    "exam": "49-pm-62(正答:複合感覚に含まれないのは関節位置覚。重量覚・部位覚・立体覚・二点識別覚は複合感覚)",
    "q": [
     "49-pm-62"
    ],
    "note": "確認済み[S2]。資料の皮質感覚の例に重量覚・部位覚は含まれず、国試の分類の全体は資料では確認できていない。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-神経疾患/神経学的診察/感覚の評価"
     }
    ]
   },
   {
    "item": "感覚の伝導路と局在診断(温痛覚・位置覚・振動覚)",
    "target": "感覚障害から病変部位を絞る",
    "value": "局在診断に最も有用なのは、脊髄視床路を通る温痛覚と、後索-内側毛帯路を通る位置覚・振動覚。軽い触覚は異常のスクリーニングには使えるが、部位の特定には向かない。Romberg試験(閉眼で足をそろえて立てない)は下肢の位置覚異常を示唆する。重度の位置覚低下では偽性アテトーゼがみられる。",
    "exam": "55-pm-83・49-pm-31・61-pm-24の背景知識",
    "q": [],
    "note": "確認済み[S2]。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-神経疾患/神経学的診察/感覚の評価"
     }
    ]
   },
   {
    "item": "感覚障害の分布と病変部位",
    "target": "障害パターンから病変部位を推定",
    "value": "手袋靴下型=遠位部の末梢神経。単一の皮膚分節または神経枝=単一の神経(多発性単神経炎)または神経根。特定の皮膚分節以下の感覚低下=脊髄。サドル領域の感覚消失=馬尾。顔面と体部で交代性の分布=脳幹。片側感覚消失=脳。",
    "exam": "51回(右後下小脳動脈閉塞=Wallenberg症候群:右顔面の温痛覚障害・左上下肢の温痛覚障害はみられる=解離性感覚障害。みられないのは右片麻痺が正答)",
    "q": [
     "51-pm-88"
    ],
    "note": "確認済み[S2](『顔面と体部で交代性=脳幹』)。Wallenberg症候群そのものの記載は資料になく、51回の正答は資料では直接裏づけていない。問題ID 51-pm-88は別項目(小脳症状)の入力記録の記載から対応づけた推定。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-神経疾患/神経学的診察/感覚の評価"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "serum-albumin",
  "name": "血清アルブミン(Alb)",
  "category": "臨床検査",
  "aliases": [
   "血清アルブミン",
   "アルブミン値",
   "血中アルブミン",
   "血漿アルブミン",
   "低アルブミン血症",
   "Alb",
   "albumin"
  ],
  "rows": [
   {
    "item": "血清アルブミンの基準範囲",
    "target": "栄養状態・肝機能の指標",
    "value": "共用基準範囲(医学教育用)は4.1〜5.1 g/dL。施設・測定法で基準値の表記が少し異なることがある(病院の資料には3.9〜4.9 g/dLとする例もある)。",
    "exam": "52-pm-50(栄養状態の評価指標のうち、体重減少率・BMI・血清アルブミン値・下腿周囲径は有用な指標として挙げられた。正答は血小板数)",
    "q": [
     "52-pm-50"
    ],
    "note": "確認済み[S1][S2]。国試は基準値そのものではなく、栄養評価の指標として使えるかを問う形。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jccls.org/wp-content/uploads/2019/10/igakukyouikukijyun.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.hosp.tohoku.ac.jp/wp-content/uploads/2022/07/NST_publication76.pdf"
     }
    ]
   },
   {
    "item": "半減期と栄養指標としての位置づけ",
    "target": "長期の栄養状態の評価",
    "value": "半減期は約21日(2〜3週間)と長く、血中濃度の変動が小さい。そのため長期の栄養状態や栄養障害のスクリーニングに使う静的栄養指標で、測定値は1週間以上前からの状態を反映する。",
    "exam": "第51回(長期臥床患者で、測定値が1週以上前の状態を反映する指標=血清アルブミン。問題IDは入力になし)／第49回(大腿骨近位部骨折術後で、栄養障害の参考になる血液検査=アルブミン)／第50回(選択肢「血中アルブミン」)",
    "q": [],
    "note": "確認済み[S1][S2]。1か月以内の値を指標にするのが理想とされる[S2]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.hosp.mie-u.ac.jp/wp-content/themes/mieuhosp/assets/doc/section/eiyou/nst05.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.mhlw.go.jp/topics/2009/05/dl/tp0501-1e_0004.pdf"
     }
    ]
   },
   {
    "item": "低栄養リスクの判断(血清アルブミン値)",
    "target": "低栄養状態のリスク分類(介護予防の栄養改善)",
    "value": "3.6 g/dL以上=低リスク／3.0〜3.5 g/dL=中リスク／3.0 g/dL未満=高リスク。BMI・体重減少率・食事摂取量なども合わせて判断する。",
    "exam": "52-pm-50(血清アルブミン値は栄養評価に有用な指標として選択肢に出た)",
    "q": [
     "52-pm-50"
    ],
    "note": "確認済み[S1]。厚生労働省の様式例(2009年)に基づく。同じ資料で、栄養改善サービス継続の目安として「3.5 g/dL以下」も挙げられている。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.mhlw.go.jp/topics/2009/05/dl/tp0501-1e_0004.pdf"
     }
    ]
   },
   {
    "item": "アルブミンが低下する・上昇する状況",
    "target": "検査値の解釈",
    "value": "低下:蛋白欠乏性の栄養障害、肝障害、ネフローゼ症候群、慢性炎症、輸液過剰など。上昇:脱水など。肝臓で合成され、炎症時はCRPの合成が優先されて合成が抑えられ低下する。",
    "exam": "54-am-49(誤答選択肢:廃用症候群で「高齢者では高アルブミン血症を認める」。低アルブミン側が正しい方向。正答は二次性サルコペニア)／53-pm-24(誤答選択肢:加齢で「血漿アルブミン量の増加」。正答は抗原抗体反応の低下)",
    "q": [
     "54-am-49",
     "53-pm-24"
    ],
    "note": "確認済み[S1][S2]。資料に「廃用症候群」「加齢」での変化の記載はなく、国試の2問は資料では直接確認できていない(低下する状況の一般的な方向づけのみ)。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.hosp.tohoku.ac.jp/wp-content/uploads/2022/07/NST_publication76.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.hosp.mie-u.ac.jp/wp-content/themes/mieuhosp/assets/doc/section/eiyou/nst05.pdf"
     }
    ]
   },
   {
    "item": "動的栄養指標(RTP)との違い",
    "target": "短期の栄養変化を見る指標との使い分け",
    "value": "アルブミンの半減期は21日。プレアルブミン(トランスサイレチン)は約2日、トランスフェリンは約7日、レチノール結合蛋白は約0.5日と短く、栄養介入の効果判定など動的な指標に使う。",
    "exam": "出題は直接なし(第51回の「1週以上前の状態を反映」を理解する参考)",
    "q": [],
    "note": "確認済み[S1][S2]。資料によって半減期の数値に幅がある(アルブミン14〜21日など)。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.hosp.mie-u.ac.jp/wp-content/themes/mieuhosp/assets/doc/section/eiyou/nst05.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.hosp.tohoku.ac.jp/wp-content/uploads/2022/07/NST_publication76.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "sf-36",
  "name": "SF-36",
  "category": "評価尺度",
  "aliases": [
   "SF-36"
  ],
  "rows": [
   {
    "item": "SF-36",
    "target": "健康関連QOL(包括的・疾患非特異的)",
    "value": "36項目、8つの下位尺度=身体機能・日常役割機能(身体)・体の痛み・全体的健康感・活力・社会生活機能・日常役割機能(精神)・心の健康(1項目の「健康の推移」を除く35項目で得点化)",
    "exam": "61-am-27(正答:社会生活機能に関する質問が含まれる。誤答:IADLの指標／下位尺度は5つ(正しくは8つ)／客観的評価指標／健常高齢者は対象でない)／60-pm-30(下位尺度に含まれないのは「栄養状態」=正答。含まれる=活力・体の痛み・社会生活機能・全体的健康観)／58-pm-45(下位尺度は「体の痛み」が正答。誤答=環境因子・筋力・睡眠の質・認知機能)／58-am-99(統合失調症患者の健康関連QOLの測定=SF-36が正答)／59-am-47・56-pm-26(QOL評価尺度・8つの下位尺度で構成)／52-pm-25(包括的QOL尺度。誤答:効用値算出・4つの下位尺度・疾患特異的・主観的満足感)／53-am-25(誤答:包括的尺度であり主観的幸福感ではない)",
    "q": [
     "52-pm-25",
     "53-am-25",
     "56-pm-26",
     "58-am-99",
     "58-pm-45",
     "59-am-47",
     "60-pm-30",
     "61-am-27"
    ],
    "note": "確認済み[S18]。「8つの下位尺度」の名称は S18 の構造図とあわせて確認(各尺度の項目数は検索要約のみ)。★「効用値を直接出さない」は未確認",
    "conflict": true,
    "sources": [
     {
      "label": "S18",
      "url": "https://www.jstage.jst.go.jp/article/yotsu/8/1/8_1_38/_pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-19",
  "review": "ai"
 },
 {
  "slug": "sharrard-spina-bifida",
  "name": "二分脊椎のSharrard分類・麻痺レベル",
  "category": "診断基準・分類",
  "aliases": [
   "Sharrard",
   "Sharrard分類",
   "Sharrardの分類",
   "シャラード分類",
   "二分脊椎",
   "脊髄髄膜瘤",
   "Hoffer分類",
   "Hofferの分類",
   "Menelaus"
  ],
  "rows": [
   {
    "item": "Sharrard分類(麻痺レベルによる6群)",
    "target": "二分脊椎の下肢麻痺レベルの分類",
    "value": "1群=胸髄／2群=L1〜L2／3群=L3〜L4／4群=L5／5群=S1／6群=運動麻痺なし。麻痺レベルは、筋力が残存する(MMT 3以上の)最下位の髄節で表す。例:L4以上の支配筋がMMT 3以上で、L5以下がMMT 3未満ならL4レベル。",
    "exam": "59-am-14(6歳男児の歩行の図から予測されるSharrard分類の上限。選択肢Ⅰ〜Ⅴ群。正答はⅡ群)／56-am-8(潜在性二分脊椎6歳男児。MMT:大腿四頭筋5・内側ハムストリングス3・前脛骨筋3・後脛骨筋2→正答はⅢ群)／55-am-19(8歳女児、Ⅳ群。歩行練習で適切なものを問う)",
    "q": [
     "59-am-14",
     "56-am-8",
     "55-am-19"
    ],
    "note": "確認済み[S1]。群の番号が大きいほど麻痺は軽く、歩行予後がよい。国試の59-am-14は図の問題で、図の内容は本資料では確認できない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/spinalsurg/28/2/28_128/_pdf"
     }
    ]
   },
   {
    "item": "L3・L4レベルの残存筋(Menelausの方法)",
    "target": "Ⅲ群(L3〜L4)にあたる筋力のめやす",
    "value": "L3=股関節の屈曲・内転は正常、大腿四頭筋がMMT 3以上、内側ハムストリングもある程度効く。L4=大腿四頭筋も正常、内側ハムストリングと前脛骨筋がMMT 3以上、殿筋・後脛骨筋もある程度効く。",
    "exam": "56-am-8(大腿四頭筋5・内側ハムストリングス3・前脛骨筋3・後脛骨筋2がⅢ群に当たる。L4の筋力パターンに相当)",
    "q": [
     "56-am-8"
    ],
    "note": "確認済み[S1]。この表はSharrardの方法を修正したMenelausの方法によるもので、Sharrardの方法と麻痺レベルの評価が異なる症例もあり、判断には慎重さが必要とされる。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/spinalsurg/28/2/28_128/_pdf"
     }
    ]
   },
   {
    "item": "麻痺レベルと移動能力(歩行予後)",
    "target": "歩行の可否・実用歩行の限界",
    "value": "運動麻痺レベルが移動能力に最も大きく関係し、L4レベルより下位の麻痺では実用歩行を獲得できるとされる。L3レベルは杖と装具を用いた屋内外の歩行を目指す。胸髄・L1〜L2レベル(高位麻痺)は、地域内を歩く(community ambulator)ことを目指すのは現実的でなく、将来は車いす移動となる可能性が高い。",
    "exam": "60-pm-25(短下肢装具で自立歩行が可能な機能残存レベルの上限=L4が正答)／53-am-10(4歳、短い距離なら独歩可能な顕在性二分脊椎。予測される機能残存レベルの上限=L4が正答)／57-pm-15(第4腰髄残存・6歳の歩行練習。正答は短下肢装具のみ、または短下肢装具と杖の併用)／第49〜51回(第5腰髄残存で最もみられやすいのは踵足変形、第2腰髄=両側長下肢装具とロフストランド杖での歩行など。問題IDは入力になし)",
    "q": [
     "60-pm-25",
     "53-am-10",
     "57-pm-15"
    ],
    "note": "確認済み[S1]。「L4が上限」という国試の答えは、資料の「L4より下位で実用歩行」と整合するが、装具の種類(短下肢装具など)までは資料の記載から確認していない。踵足変形など変形と麻痺レベルの対応は本資料では確認できていない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/spinalsurg/28/2/28_128/_pdf"
     }
    ]
   },
   {
    "item": "歩行できる割合(麻痺レベル別)",
    "target": "レベルごとの歩行獲得の目安",
    "value": "歩行が可能だった割合(Williamsらの報告をまとめた表):胸髄=20%(7/35)、上位腰髄(L1/2)=50%(5/10)、中位腰髄(L3)=60%(9/15)、下位腰髄(L4/5)=84%(38/45)、仙髄=100%(68/68)。胸髄〜上位腰髄では、5歳までに歩行できても7歳前後に歩行をやめることが多い。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。対象人数が少ない報告の要約で、個々の児の予後を示すものではない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/spinalsurg/28/2/28_128/_pdf"
     }
    ]
   },
   {
    "item": "装具の考え方(レベル別)",
    "target": "短下肢装具・長下肢装具・骨盤帯付き長下肢装具の使い分け",
    "value": "下腿三頭筋が弱いと立位で下腿が前傾してしゃがみ肢位(crouch posture)になりやすく、継手を調整した短下肢装具が有用。膝関節の筋力低下や不安定性があれば長下肢装具を用いる。高位麻痺の歩行訓練には骨盤帯付き長下肢装具を用い、交互歩行を目指したreciprocal gait orthosis(RGO)はそれより高い移動能力が得られるとされる。",
    "exam": "55-am-19(Ⅳ群。正答は靴型装具を使用する。誤答:長下肢装具、短下肢装具+ロフストランド杖、長下肢装具+ロフストランド杖、骨盤帯付き長下肢装具+PCW)／第51回(両側の長下肢装具とロフストランド杖での歩行の図から予測される残存レベル=第2腰髄)／第50回(第12胸髄—「長下肢装具で杖なし歩行可能」は誤答)",
    "q": [
     "55-am-19"
    ],
    "note": "確認済み[S1]。Ⅳ群(L5)で靴型装具が適切という国試の正答は、本資料に靴型装具の記載がなく確認できていない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/spinalsurg/28/2/28_128/_pdf"
     }
    ]
   },
   {
    "item": "Hoffer分類(歩行能力の4群)",
    "target": "二分脊椎の歩行能力の評価",
    "value": "community ambulator(装具の有無にかかわらず屋内外を歩行)／household ambulator(屋外は車いす、屋内は歩行)／non-functional ambulator(日常の移動は車いすだが歩行訓練を行っている)／non-ambulator(歩行不能で車いす)。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/spinalsurg/28/2/28_128/_pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "sias",
  "name": "SIAS",
  "category": "評価尺度",
  "aliases": [
   "SIAS",
   "脳卒中機能障害評価法"
  ],
  "rows": [
   {
    "item": "SIAS 全体",
    "target": "脳卒中の機能障害",
    "value": "麻痺側運動機能・筋緊張・腱反射・感覚・関節可動域・疼痛・体幹機能・視空間認知・言語・非麻痺側機能(1993年原著では「運動・腱反射・筋緊張・感覚・可動域・疼痛・体幹・高次脳・健側機能」)。各テストを0〜5点または0〜3点で採点。運動機能は0〜5点",
    "exam": "59-am-33(含まれる項目=視空間認知(正答)。含まれない=意識障害・異常知覚・嚥下機能・測定障害)／59-am-91・58-am-82(正答:SIAS－体幹機能)／57-pm-32(含まれる=非麻痺側筋力(正答)。含まれない=意識レベル・痛覚・病的反射)／61-am-33(正答:非麻痺側の握力。誤答=注視・痛覚・病的反射・膝関節可動域)／54-am-34(正答:非麻痺側機能の評価を含む)／52-am-33(誤答:意識障害)／56-pm-20(誤答:転倒リスク評価ではない)",
    "q": [
     "52-am-33",
     "54-am-34",
     "56-pm-20",
     "57-pm-32",
     "58-am-82",
     "59-am-33",
     "59-am-91",
     "61-am-33"
    ],
    "note": "確認済み[S16](領域と0〜5/0〜3点)。★「満点76点」「各領域の項目数」「言語を含むこと」は S16 の本文では確認できず(二次の検索要約では76点・9領域22項目)。入力ファイルの「要確認」も引き継ぐ",
    "conflict": true,
    "sources": [
     {
      "label": "S16",
      "url": "https://www.jstage.jst.go.jp/article/jjrm1964/30/4/30_4_273/_pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-19",
  "review": "ai"
 },
 {
  "slug": "six-minute-walk-test",
  "name": "6分間歩行テスト(6MWT)",
  "category": "評価尺度",
  "aliases": [
   "6MWT",
   "6MWD",
   "6分間歩行試験",
   "6分間歩行距離",
   "6分間歩行",
   "6-minute walk test",
   "six-minute walk test"
  ],
  "rows": [
   {
    "item": "6MWTの目的と指標",
    "target": "運動耐容能・全身持久性の評価",
    "value": "6分間にできるだけ長く歩いた総歩行距離(6MWD)を主な指標にする。特殊な設備が要らない簡便な検査で、心疾患・呼吸器疾患で運動耐容能や予後、リハの効果判定に使われる。年齢・性別・身長・体重の影響を受ける。",
    "exam": "56-am-6(正答:肺がん根治術後・退院時の全身持久性の評価として選ぶ)／58-am-19(正答:NYHA class IIIの僧帽弁閉鎖不全症で経皮的僧帽弁形成術後、退院時の運動機能評価)／55-am-36(正答の1つ:6分間の総歩行距離で評価する)／59-pm-29・49回(誤答:バランス・動的バランスの評価ではなく、持久力・運動耐容能の評価)",
    "q": [
     "56-am-6",
     "58-am-19",
     "55-am-36",
     "59-pm-29"
    ],
    "note": "確認済み[S1][S2]。[S1]は最大努力の負荷試験と位置づけ、[S3]の手順は「できるだけ長く歩く」「走ったり小走りにはならない」と指示する。表現の違いはあるが、いずれも持久力(運動耐容能)の検査。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2021/03/JCS2021_Makita.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.jstage.jst.go.jp/article/jsrcr/28/2/28_286/_html/-char/ja"
     },
     {
      "label": "S3",
      "url": "https://cdn.clinicaltrials.gov/large-docs/04/NCT03399604/Prot_000.pdf"
     }
    ]
   },
   {
    "item": "6MWT 検者の位置",
    "target": "検査手順(ペースを作らない)",
    "value": "検者は付き添って(横に並んで)歩かない。スタートライン付近に立ち、周回数を数えて見守る。",
    "exam": "55-am-36(誤答:被験者の斜め前方に並んで歩く)／50回(「誤っているのはどれか」の正答=被検者の横に並んで歩く。ほかの選択肢は正しい内容)",
    "q": [
     "55-am-36"
    ],
    "note": "確認済み[S2][S3]。[S3]は米国胸部学会(ATS)2002の手順を転載した臨床試験計画書の付録で、一次資料そのものではない。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.jstage.jst.go.jp/article/jsrcr/28/2/28_286/_html/-char/ja"
     },
     {
      "label": "S3",
      "url": "https://cdn.clinicaltrials.gov/large-docs/04/NCT03399604/Prot_000.pdf"
     }
    ]
   },
   {
    "item": "6MWT 声かけと残り時間",
    "target": "検査手順(標準化)",
    "value": "声かけは1分ごとに、決まった言葉で伝える。その中で残り時間を知らせる(例:1分後に「あと5分」、以後「あと4分」「半分です」「あと2分」「あと1分」)。残り15秒で終わりの合図を予告する。これ以外の励ましは使わない。",
    "exam": "55-am-36(誤答:残りの時間を伝えられない)／50回(正しい内容の1つ:被検者に残りの時間を伝える)",
    "q": [
     "55-am-36"
    ],
    "note": "確認済み[S2][S3]。声かけの文言は[S3]の転載(ATS 2002)による。日本語の言い回しは要約。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.jstage.jst.go.jp/article/jsrcr/28/2/28_286/_html/-char/ja"
     },
     {
      "label": "S3",
      "url": "https://cdn.clinicaltrials.gov/large-docs/04/NCT03399604/Prot_000.pdf"
     }
    ]
   },
   {
    "item": "6MWT 途中で立ち止まったとき",
    "target": "検査手順(休憩の扱い)",
    "value": "休憩してよいと事前に伝える。立ち止まっても、壁にもたれてよいので歩けるようになったら再開するよう促し、タイマーは止めない。検査を続けることを拒む、または中止すべき状態のときに中止し、距離・止めた時間・理由を記録する。",
    "exam": "55-am-36(誤答:途中で立ち止まったらテスト中止)",
    "q": [
     "55-am-36"
    ],
    "note": "確認済み[S2][S3]。立ち止まっただけでは中止にならない。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.jstage.jst.go.jp/article/jsrcr/28/2/28_286/_html/-char/ja"
     },
     {
      "label": "S3",
      "url": "https://cdn.clinicaltrials.gov/large-docs/04/NCT03399604/Prot_000.pdf"
     }
    ]
   },
   {
    "item": "6MWT 前後に記録する項目",
    "target": "自覚症状・バイタルの変化",
    "value": "検査の前後に、心拍数・呼吸困難・疲労感(Borg scale)・SpO2を記録する。終了後は「何が歩行を妨げたか」も尋ねる。",
    "exam": "55-am-36(正答の1つ:自覚症状の変化を記録する)／50回(正しい内容の1つ:自覚症状の変化を記録する)",
    "q": [
     "55-am-36"
    ],
    "note": "確認済み[S2][S3]。[S2]は測定項目として呼吸困難・疲労感などを挙げ、図の説明でBorg CR-10を使っている。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.jstage.jst.go.jp/article/jsrcr/28/2/28_286/_html/-char/ja"
     },
     {
      "label": "S3",
      "url": "https://cdn.clinicaltrials.gov/large-docs/04/NCT03399604/Prot_000.pdf"
     }
    ]
   },
   {
    "item": "6MWT 実施回数と練習効果",
    "target": "結果の解釈(学習効果)",
    "value": "検査を重ねると成績が良くなる(学習効果)。このため初回は2回行い、良い方の値を使う方法が推奨されている。施設間の比較が難しく、検者の施行法の影響も受ける。",
    "exam": "50回(正しい内容の1つ:テストは2回施行する)",
    "q": [],
    "note": "確認済み[S1][S4]。2回施行は[S4](総説)の記述。ATS 2002の原文では確認できていない。50回の問題IDは入力記録に番号がないため空欄。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2021/03/JCS2021_Makita.pdf"
     },
     {
      "label": "S4",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7609960"
     }
    ]
   },
   {
    "item": "6MWT 歩行コース",
    "target": "検査環境",
    "value": "平坦で直線の廊下に30 mのコースをとり、折り返して歩く(1往復60 m)。3 mごとに目印、折り返し点にコーン。屋内で場所が足りないときは20 m直線などの変法もある。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1][S2][S3]。コースの形・長さで距離が変わる。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2021/03/JCS2021_Makita.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.jstage.jst.go.jp/article/jsrcr/28/2/28_286/_html/-char/ja"
     },
     {
      "label": "S3",
      "url": "https://cdn.clinicaltrials.gov/large-docs/04/NCT03399604/Prot_000.pdf"
     }
    ]
   },
   {
    "item": "6MWT 中止する所見",
    "target": "リスク管理",
    "value": "胸痛、耐えがたい呼吸困難、下肢のけいれん、ふらつき、冷汗、顔面蒼白のとき、すぐに中止する。座らせるか臥位にし、血圧・脈拍・SpO2を確認する。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S3]。ATS 2002の転載による。日本の運動療法の中止基準は別カード(運動療法の中止基準)も参照。",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://cdn.clinicaltrials.gov/large-docs/04/NCT03399604/Prot_000.pdf"
     }
    ]
   },
   {
    "item": "6MWD の解釈(変化量・予後)",
    "target": "症例の距離の読み方",
    "value": "COPDで臨床的に意味のある最小変化量は25〜33 m(中央値30 m)。6MWDが低い(300〜450 m)と死亡率が高く、300 m未満で予後が悪いとされる。",
    "exam": "57-am-17(問題文:間質性肺炎で200 m)／58-pm-18(問題文:肺がん術前の6分間歩行距離560 m、SpO2 95%以上、ADL自立で状態良好の根拠)",
    "q": [
     "57-am-17",
     "58-pm-18"
    ],
    "note": "確認済み[S2]。変化量はCOPD患者での値で、疾患により異なる。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.jstage.jst.go.jp/article/jsrcr/28/2/28_286/_html/-char/ja"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "spirometry",
  "name": "呼吸機能検査(スパイロメトリー)",
  "category": "臨床検査",
  "aliases": [
   "スパイロメトリー",
   "%肺活量",
   "%VC",
   "1秒率",
   "FEV1",
   "%FEV1",
   "肺拡散能",
   "DLco"
  ],
  "rows": [
   {
    "item": "%肺活量（%VC）",
    "target": "拘束性換気障害",
    "value": "%VC 80%未満",
    "exam": "56-am-19 問題文 %VC 54%→拘束性（正答）。61-pm-9 問題文 %VC 75%。55-am-7 問題文 %VC 81%（COPD症例）。54-pm-17 問題文 %VC 62%。59-pm-12 問題文 %VC 95%（ALS症例）。55-am-73 誤答選択肢「拘束性=%肺活量90%未満」。59-pm-41 誤答「間質性肺疾患で閉塞性換気障害」（拘束性が正）",
    "q": [
     "54-pm-17",
     "55-am-7",
     "55-am-73",
     "56-am-19",
     "59-pm-12",
     "59-pm-41",
     "61-pm-9"
    ],
    "note": "確認済み [S7]（%VC 80%未満を拘束性と診断）。55-am-73 の「90%未満」は公式の80%と食い違うため誤り。入力の「(要確認)」は解消",
    "conflict": true,
    "sources": [
     {
      "label": "S7",
      "url": "https://www.aichi-amt.or.jp/aamt/wp-content/uploads/2024/03/aicc-guide-19.lung_function.pdf（地域の検査標準化団体の資料で、学会ガイドラインそのものではない"
     }
    ]
   },
   {
    "item": "1秒率（FEV1/FVC、FEV1.0%）",
    "target": "閉塞性換気障害、COPD診断（気管支拡張薬吸入後）",
    "value": "1秒率 70%未満＝閉塞性。COPD診断は吸入後 FEV1/FVC 70%未満",
    "exam": "55-am-73 誤答「閉塞性換気障害=1秒率80%未満」。55-am-7 問題文 FEV1% 31%。54-pm-17 問題文 FEV1% 42%。56-am-19 問題文 FEV1% 82%（閉塞なし）。57-pm-38 問題文 1秒率80%（FEV1の計算）。58-pm-3 正答「1秒率低下」。58-pm-85 誤答選択肢（1秒率）。54-am-77 誤答「1秒率=1秒量÷%肺活量」（正しくは÷努力肺活量）",
    "q": [
     "54-am-77",
     "54-pm-17",
     "55-am-7",
     "55-am-73",
     "56-am-19",
     "57-pm-38",
     "58-pm-3",
     "58-pm-85"
    ],
    "note": "確認済み [S7][S8][S9]。55-am-73 の「80%未満」は公式の70%と食い違うため誤り",
    "conflict": true,
    "sources": [
     {
      "label": "S7",
      "url": "https://www.aichi-amt.or.jp/aamt/wp-content/uploads/2024/03/aicc-guide-19.lung_function.pdf（地域の検査標準化団体の資料で、学会ガイドラインそのものではない"
     },
     {
      "label": "S8",
      "url": "https://www.jstage.jst.go.jp/article/naika/101/6/101_1631/_pdf"
     },
     {
      "label": "S9",
      "url": "https://www.jstage.jst.go.jp/article/naika/109/12/109_2496/_pdf"
     }
    ]
   },
   {
    "item": "%1秒量（%FEV1）",
    "target": "気流閉塞の重症度（COPD病期。GOLD1:≧80、2:50〜80未満、3:30〜50未満、4:30未満）",
    "value": "%FEV1 80%以上／50%以上80%未満／30%以上50%未満／30%未満",
    "exam": "57-pm-38 問題文 FEV1 4.00L÷予測3.46L→%FEV1 約116%（正答5）。COPD症例 55-am-7・54-pm-17 の重症度に関わる（病期分類そのものは出題なし）",
    "q": [
     "54-pm-17",
     "55-am-7",
     "57-pm-38"
    ],
    "note": "確認済み [S8][S9][S7]",
    "conflict": false,
    "sources": [
     {
      "label": "S7",
      "url": "https://www.aichi-amt.or.jp/aamt/wp-content/uploads/2024/03/aicc-guide-19.lung_function.pdf（地域の検査標準化団体の資料で、学会ガイドラインそのものではない"
     },
     {
      "label": "S8",
      "url": "https://www.jstage.jst.go.jp/article/naika/101/6/101_1631/_pdf"
     },
     {
      "label": "S9",
      "url": "https://www.jstage.jst.go.jp/article/naika/109/12/109_2496/_pdf"
     }
    ]
   },
   {
    "item": "肺拡散能（%DLco）",
    "target": "拡散障害",
    "value": "予測値の80%以上を正常と判定",
    "exam": "54-pm-22 正答「COPDで拡散能低下」。59-am-64 問題文（拡散能に影響するのはHbと肺胞表面積）。59-pm-41 正答「拡散障害による低酸素血症」。56-am-19 誤答「拡散障害」。値の記載は出題になし",
    "q": [
     "54-pm-22",
     "56-am-19",
     "59-am-64",
     "59-pm-41"
    ],
    "note": "確認済み [S7]",
    "conflict": false,
    "sources": [
     {
      "label": "S7",
      "url": "https://www.aichi-amt.or.jp/aamt/wp-content/uploads/2024/03/aicc-guide-19.lung_function.pdf（地域の検査標準化団体の資料で、学会ガイドラインそのものではない"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-19",
  "review": "ai"
 },
 {
  "slug": "standing-posture-plumb-line",
  "name": "立位姿勢の評価(重心線・基準線)",
  "category": "検査法・徴候",
  "aliases": [
   "重心線",
   "重力線",
   "立位姿勢",
   "静止立位",
   "安静立位",
   "基本的立位姿勢",
   "支持基底面",
   "身体重心",
   "plumb line",
   "Kendall"
  ],
  "rows": [
   {
    "item": "矢状面の基準線(重心線)が通る点",
    "target": "立位姿勢の観察・アライメント評価",
    "value": "理想的な立位を側面から見ると、垂直線は耳、頚椎椎体、肩関節、体幹の中央、大腿骨大転子を通り、膝関節の中央部の少し前、外果の少し前方を通る(Kendallの基本姿勢の記述)。",
    "exam": "61-am-22(安静立位の重心線は外果の前方が正答。誤答:耳垂の前方、肩峰の前方、大転子の前方、膝蓋骨の前方)／58-pm-73(基本的立位姿勢を矢状面から見たとき重心線が通る位置=外果の前方が正答。誤答:後頭隆起・烏口突起・大転子前方・膝蓋骨前方)／第50回(成人の静止立位で重心線は足関節軸の前方を通るが正答。誤答:膝関節軸の後方、環椎後頭関節の後方など)／第49・51回(重心線は膝関節軸の前方。「仙骨の後方」「膝関節中心の後方1〜2cm」は誤り)",
    "q": [
     "61-am-22",
     "58-pm-73"
    ],
    "note": "確認済み[S1]。[S1]は大学紀要の文献考察で、Kendallの記述を引用している二次資料。この資料では基準線は大転子「を通る」と書かれており、国試の「大転子の前方」を誤りとする扱いと矛盾しない。国試側の「大転子のやや後方」という表現は、今回の資料では確認できなかった。「耳垂」という細かい位置や外果前方の距離(cm)は今回確認できていない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://sozo-air.repo.nii.ac.jp/record/260/files/07tujimura.pdf"
     }
    ]
   },
   {
    "item": "静止立位が安定する条件(重心線と支持基底面)",
    "target": "姿勢の力学的な安定性の考え方",
    "value": "静止姿勢では、頭部・体幹・四肢の各体節の重心を合成した重心線が支持基底面の中に落ち、その位置が支持基底面の中心に近いほど安定性がよい。",
    "exam": "61-pm-71(正答:重心線は上前腸骨棘を通らない、支持基底面は足底とその間を含む面)",
    "q": [
     "61-pm-71"
    ],
    "note": "確認済み[S1](文献考察での引用)。「重心線は上前腸骨棘を通らない」は、基準線が通る点の記述(耳・肩・大転子・膝・外果)と矛盾しない。「足底とその間を含む面」という支持基底面の定義の文言は資料で未確認。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://sozo-air.repo.nii.ac.jp/record/260/files/07tujimura.pdf"
     }
    ]
   },
   {
    "item": "全身の重心の高さ",
    "target": "身体重心の位置を答える",
    "value": "全身の重心は、身長の約55%の高さで、仙骨の岬角付近、第2仙椎の前方にある。",
    "exam": "第50回(成人の静止立位。誤答:重心位置は第2腰椎のやや前方、小児より身長に対する重心位置が高い)／第51回(立位の重心:「仙骨の後方」は誤り)",
    "q": [],
    "note": "確認済み[S1]。出典はOklahoma大学健康科学センターの生体力学の講義ページ。小児は成人より重心が高い・閉眼での変化などは確認できず記載しない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://ouhsc.edu/bserdac/dthompso/web/namics/mass.htm"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "stroke-early-mobilization",
  "name": "脳卒中急性期の離床基準",
  "category": "リスク管理",
  "aliases": [
   "急性期脳梗塞の離床",
   "脳卒中の離床"
  ],
  "rows": [
   {
    "item": "急性期脳梗塞の離床基準",
    "target": "急性期脳梗塞(発症2日目)",
    "value": "離床してよい: 心拍数80/分、平均血圧65 mmHg以上(ICU開始基準 HR50〜120、MAP≧65 と整合)。離床してはいけない: 呼吸数40/分(>35)、神経症状の増悪、RASS−3",
    "exam": "59-pm-17「積極的に離床を行ってもよいのはどの場合か。2つ選べ」: 正答=心拍数80/分・平均血圧65 mmHg以上。誤答選択肢=呼吸数40/分・神経症状の増悪・RASS −3",
    "q": [
     "59-pm-17"
    ],
    "note": "確認済み(S3 Table2・4・5／S4 CQ2-1, 2-4, 2026-11-19)。神経症状増悪での中止は数値でなく状態の基準",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://www.jstage.jst.go.jp/article/jsicm/24/2/24_24_255/_article/-char/ja"
     },
     {
      "label": "S4",
      "url": "https://jsts.gr.jp/img/acute_rehabilitation.pdf"
     }
    ]
   },
   {
    "item": "急性期脳血管障害の離床基準",
    "target": "急性期脳卒中",
    "value": "国試出題時の基準(脳卒中治療ガイドライン2015年版): JCS1桁・運動禁忌の心疾患や全身合併症なし・神経症候の増悪なし。現行(2021以降): JCSの水準の文言は削除。学会指針2023: 数値の一律基準なし、バイタル異常時は訓練継続より原因検索と治療を優先、SpO2≦90%や収縮期≧160 mmHgで訓練を遅らせる/中止する施設が多い(調査)",
    "exam": "55-pm-44「積極的に離床を行ってもよいのは」: 正答=重度な運動麻痺。誤答選択肢(離床を控える側)=JCS 3桁・神経症状の増悪・収縮期血圧220 mmHg・重篤な全身性合併症",
    "q": [
     "55-pm-44"
    ],
    "note": "確認済み(S4 CQ2-4／S5〔二次資料: 2015年版の記述と2021年改訂での削除〕, 2026-11-19)。2015年版の原文は未取得、2021年版本文も未取得(S5経由の二次確認)。収縮期220 mmHgの数値基準は資料に無く未確認",
    "conflict": false,
    "sources": [
     {
      "label": "S4",
      "url": "https://jsts.gr.jp/img/acute_rehabilitation.pdf"
     }
    ]
   },
   {
    "item": "離床中止の所見(脳卒中)",
    "target": "心原性脳梗塞・離床練習",
    "value": "意識や神経症状の悪化(GCSの低下)は中止し原因検索・治療を優先。HR・血圧の基準: HR105は開始基準内、収縮期160 mmHgは調査で「進める施設40%未満」の水準",
    "exam": "56-pm-2「離床練習を中止すべき所見」: 入院時 血圧145/78・心拍数102/分・GCS E4V5M6。正答=GCS E2V2M5。誤答選択肢=心拍数105/分・血圧160/72 mmHg・左上下肢筋緊張軽度亢進・Brunnstrom stage 上肢Ⅲ下肢Ⅲ",
    "q": [
     "56-pm-2"
    ],
    "note": "確認済み(S4 CQ2-4／S3 Table2, 2026-11-19)。食い違い候補: 血圧160/72 mmHgを中止とする国試の扱いはなく、S4の調査(収縮期≧160で訓練を進める施設40%未満)とは基準が異なる(調査であって基準ではない)",
    "conflict": true,
    "sources": [
     {
      "label": "S3",
      "url": "https://www.jstage.jst.go.jp/article/jsicm/24/2/24_24_255/_article/-char/ja"
     },
     {
      "label": "S4",
      "url": "https://jsts.gr.jp/img/acute_rehabilitation.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-19",
  "review": "ai"
 },
 {
  "slug": "swallowing-screening",
  "name": "嚥下スクリーニング検査(RSST・MWST・FT)",
  "category": "検査法・徴候",
  "aliases": [
   "RSST",
   "反復唾液嚥下テスト",
   "MWST",
   "改訂水飲みテスト",
   "フードテスト"
  ],
  "rows": [
   {
    "item": "反復唾液嚥下テスト(RSST)",
    "target": "摂食嚥下障害(誤嚥)のスクリーニング",
    "value": "30秒間の空嚥下が3回未満=陽性(問題あり)。3回以上=正常範囲。口頭指示に従えない場合は判定不可。VFでの誤嚥検出: 感度0.98・特異度0.66",
    "exam": "55-pm-20 問題文: 「RSST 5回/30秒」(症例の結果=陰性側)。ほかのMWST・食物テストも良好→障害は先行期(正答)",
    "q": [
     "55-pm-20"
    ],
    "note": "確認済み(原文) [S1] p.24/39。国試の値と矛盾なし",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jsdr.or.jp/wp-content/uploads/file/doc/assessment2019-announce.pdf"
     }
    ]
   },
   {
    "item": "改訂水飲みテスト(MWST)",
    "target": "摂食嚥下障害(誤嚥)のスクリーニング",
    "value": "冷水3mLを口腔底へ注ぎ嚥下指示(舌背には注がない)。評点1: 嚥下なし・むせる and/or 呼吸切迫／2: 嚥下あり・呼吸切迫／3: 嚥下あり・呼吸良好・むせる and/or 湿性嗄声／4: 嚥下あり・呼吸良好・むせなし／5: 4に加え反復嚥下が30秒以内に2回可能。カットオフ4点(感度1.0・特異度0.71)。4点以上なら最大2回追加し最も悪い評点を採用",
    "exam": "55-pm-20 問題文: MWSTで「嚥下後の呼吸は良好でむせもない」(=4点相当)。入力の注記「冷水3mL(要確認)」→確認できた",
    "q": [
     "55-pm-20"
    ],
    "note": "確認済み(原文) [S1] p.25/39。注: 検索ツールの要約は「カットオフ3点」と誤って返したが、原文は4点",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jsdr.or.jp/wp-content/uploads/file/doc/assessment2019-announce.pdf"
     }
    ]
   },
   {
    "item": "フードテスト(FT)",
    "target": "摂食嚥下障害(誤嚥)のスクリーニング",
    "value": "ティースプーン1杯(約4g)のプリンを嚥下。評点1〜5(MWSTと同様。3は口腔内残留中等度、4は残留ほぼなし)。カットオフ4点(感度1.0・特異度0.82)",
    "exam": "55-pm-20 問題文: 「食物テストでは呼吸良好でむせもない」。57-pm-37 誤答選択肢: FT・MWST・RSST・VEは「嚥下反射惹起の瞬間の食物の流れ」を観察できない(誤りではなく、観察できるのはVF=正答2)",
    "q": [
     "55-pm-20",
     "57-pm-37"
    ],
    "note": "確認済み(原文) [S1] p.26/39(FTの値)。「流れが観察できるのはVF」の記述自体は[S1]の本文では未照合=問題文のみ",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jsdr.or.jp/wp-content/uploads/file/doc/assessment2019-announce.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-19",
  "review": "ai"
 },
 {
  "slug": "thomas-test",
  "name": "Thomasテスト",
  "category": "検査法・徴候",
  "aliases": [
   "Thomasテスト(変法)",
   "modified Thomas test",
   "変法Thomasテスト"
  ],
  "rows": [
   {
    "item": "Thomasテスト(原法)",
    "target": "股関節の屈曲拘縮(股関節屈筋群の短縮)",
    "value": "背臥位で、一側の股関節・膝を最大に曲げて胸に引き付け、骨盤を中間位に保つ。反対側の脚は力を抜いて台の上に伸ばしておく。この反対側の脚が台から浮き、台との間にすき間ができれば陽性で、反対側の股関節屈曲拘縮を示す",
    "exam": "60-am-87(正答:股関節屈曲拘縮を調べる検査)／59-am-32(正答:股関節の屈曲拘縮を調べる)／50回(正答:股関節に屈曲拘縮がある場合に陽性を示す検査)／54-am-3(選択肢の一つとして出題。正誤の細部は記録では未確認)",
    "q": [
     "54-am-3",
     "59-am-32",
     "60-am-87"
    ],
    "note": "確認済み[S1]。Hugh Owen Thomasにちなむ検査で、もとは股関節屈曲拘縮を除外するために作られたとされる",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://doi.org/10.7717/peerj.2325"
     }
    ]
   },
   {
    "item": "Thomasテスト(変法)の方法と判定",
    "target": "股関節屈筋の短縮(伸展制限)",
    "value": "台の端で行い、反対側(検査側)の脚を台から垂らして、股関節伸展角度を測れるようにする。検査側の太ももが水平より上(股関節が0°まで伸展できない)なら陽性(不合格)で、股関節屈筋の短縮を示す",
    "exam": "49回(変法で評価できないもの=左腓腹筋の短縮。誤答:右腸腰筋・左大殿筋・左ヒラメ筋・左大腿四頭筋。図は一側の股・膝を胸に引き付け、反対側を台から垂らす)",
    "q": [],
    "note": "確認済み[S1][S2]。変法で評価される筋は、腸腰筋・大腿直筋・大腿筋膜張筋と記載されている[S2]。国試49回の選択肢の組み合わせは、問題文を確認していないため、資料と照合していない",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://doi.org/10.7717/peerj.2325"
     },
     {
      "label": "S2",
      "url": "https://doi.org/10.26603/001c.120899"
     }
    ]
   },
   {
    "item": "Thomasテストと大腿直筋の関係",
    "target": "検査の対象筋の整理",
    "value": "国試では、Thomasテストは腸腰筋の短縮・股関節屈曲拘縮の検査として扱い、「大腿直筋―Thomasテスト」の組合せは誤りとされた。一方、変法の文献では、腸腰筋・大腿直筋・大腿筋膜張筋などを評価する方法と書かれている",
    "exam": "51回(「大腿直筋―Thomasテスト」が誤り)",
    "q": [],
    "note": "国試は原法=屈曲拘縮(腸腰筋)として答える。変法では大腿直筋も評価対象とする文献があり、扱いが分かれる。大腿直筋の短縮の検査名は、今回の資料では確認していない",
    "conflict": true,
    "sources": [
     {
      "label": "S2",
      "url": "https://doi.org/10.26603/001c.120899"
     },
     {
      "label": "S1",
      "url": "https://doi.org/10.7717/peerj.2325"
     }
    ]
   },
   {
    "item": "Thomasテスト(変法)の精度・注意点",
    "target": "検査の限界(骨盤の傾き)",
    "value": "骨盤の前傾・後傾で結果が変わる。骨盤の傾きを制御しない変法では、股関節伸展制限の検出で感度31.8%・特異度57.1%と低かった(健常大学生29名)。腰椎の下に手を入れて骨盤を中間位に保つと、再現性は高かった(級内相関0.85〜0.91、64名)",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1][S2]。小規模な研究に基づく数値で、診断精度の確定値ではない",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://doi.org/10.7717/peerj.2325"
     },
     {
      "label": "S2",
      "url": "https://doi.org/10.26603/001c.120899"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "thompson-test",
  "name": "Thompsonテスト(Simmondsテスト)",
  "category": "検査法・徴候",
  "aliases": [
   "Thompson test",
   "Thompson's test",
   "トンプソンテスト",
   "Thompson squeeze test",
   "calf squeeze test",
   "Simmonds test",
   "シモンズテスト"
  ],
  "rows": [
   {
    "item": "Thompsonテストの方法と陽性所見",
    "target": "アキレス腱断裂",
    "value": "腹臥位で膝を直角に曲げ、ふくらはぎ(下腿三頭筋)を握る。正常では足関節が底屈するが、断裂していると底屈が起こらない=陽性。断裂部には陥凹(へこみ)も触れる",
    "exam": "61-pm-88(正答:アキレス腱断裂で陽性)／60-am-87(「Thompson=股関節屈曲拘縮の検査」は誤り)／54-am-3・59-pm-3・53-pm-12・53-pm-32(選択肢の一つとして出題。各設問での正誤の細部は記録では未確認)／58-am-43(「アキレス腱周囲炎で陽性」は誤り)／49回(アキレス腱断裂―Thompson)／50回(アキレス腱周囲炎でのThompson陽性は誤り)／51回(「ハムストリングス―Thompson」が誤り)",
    "q": [
     "53-pm-12",
     "53-pm-32",
     "54-am-3",
     "58-am-43",
     "59-pm-3",
     "60-am-87",
     "61-pm-88"
    ],
    "note": "確認済み[S1][S2]。[S2]ではThompson test(calf squeeze test)として記載。Simmondsテストの名称は国試の項目名による(今回の資料では確認していない)",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://jsoa.or.jp/content/images/2023/05/s09-1.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.msdmanuals.com/ja-jp/professional/22-%E5%A4%96%E5%82%B7%E3%81%A8%E4%B8%AD%E6%AF%92/%E6%8D%BB%E6%8C%AB%E3%81%8A%E3%82%88%E3%81%B3%E3%81%9D%E3%81%AE%E4%BB%96%E3%81%AE%E8%BB%9F%E9%83%A8%E7%B5%84%E7%B9%94%E6%90%8D%E5%82%B7/%E3%82%A2%E3%82%AD%E3%83%AC%E3%82%B9%E8%85%B1%E8%A3%82%E5%82%B7"
     }
    ]
   },
   {
    "item": "Thompsonテストの精度と限界",
    "target": "診断の確からしさ",
    "value": "システマティックレビュー(3研究)で、calf-squeeze test(Thompsonテスト)は、アキレス腱断裂の臨床検査のなかで感度・特異度ともに最も高く、感度0.96(95%CI 0.93〜0.99)・特異度0.93(0.84〜1.00)。ただし部分断裂では正常になることがあり、見逃されうる",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S3][S2]。研究数が少ない。完全断裂の見逃しを減らすため、Thompson・Matles・陥凹の触知を組み合わせて評価する[S2]",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://pubmed.ncbi.nlm.nih.gov/25243736/"
     },
     {
      "label": "S2",
      "url": "https://www.msdmanuals.com/ja-jp/professional/22-%E5%A4%96%E5%82%B7%E3%81%A8%E4%B8%AD%E6%AF%92/%E6%8D%BB%E6%8C%AB%E3%81%8A%E3%82%88%E3%81%B3%E3%81%9D%E3%81%AE%E4%BB%96%E3%81%AE%E8%BB%9F%E9%83%A8%E7%B5%84%E7%B9%94%E6%90%8D%E5%82%B7/%E3%82%A2%E3%82%AD%E3%83%AC%E3%82%B9%E8%85%B1%E8%A3%82%E5%82%B7"
     }
    ]
   },
   {
    "item": "アキレス腱断裂の背景と治療(誤答選択肢の確認)",
    "target": "断裂の起こり方・治療方針",
    "value": "腱の変性を基盤に起こり、膝を伸ばした状態でのジャンプや蹴り出しで、腓腹筋・ヒラメ筋が急に収縮して生じることが多い。若年ではスポーツ、高齢では日常活動中の受傷が多い。治療は保存療法(ギプス・装具)と手術があり、保存療法でも早期に適切に荷重すれば再断裂率は手術と同等になってきた",
    "exam": "61-pm-88の誤答選択肢:つま先立ち可能／学童期に集中／背屈位でギプス固定／陳旧例は端々縫合(いずれも誤り)",
    "q": [
     "61-pm-88"
    ],
    "note": "確認済み[S1]。国試の誤答選択肢のうち、「学童期に集中」は、資料の受傷年代(若年のスポーツ・高齢の日常活動)と合わない。つま先立ち・ギプス固定の肢位・陳旧例の縫合法は、今回の資料では確認していないので書かない",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://jsoa.or.jp/content/images/2023/05/s09-1.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "tinel-sign",
  "name": "Tinel徴候",
  "category": "検査法・徴候",
  "aliases": [
   "Tinel sign",
   "Tinel's sign",
   "ティネル徴候",
   "ティネルサイン",
   "Tinel様徴候",
   "Phalenテスト",
   "Phalen test",
   "Phalen徴候",
   "ファーレンテスト"
  ],
  "rows": [
   {
    "item": "Tinel徴候(手根管症候群)",
    "target": "手根管症候群(正中神経の絞扼)",
    "value": "手関節の手掌側で、手根管部の正中神経をハンマーや指で叩く。正中神経の支配領域(母指〜環指橈側)にしびれ・放散痛が出れば陽性。診断を支持する所見の一つ。Tinel徴候はもともと、末梢神経が再生している先端の位置を、叩打による痛みで知るための所見",
    "exam": "56-am-82(正答:Tinel徴候が陽性となるのは手根管症候群。誤答:視床症候群・Cushing症候群・内側縦束症候群・Shy-Drager症候群)／51回(「Tinel徴候陰性」が誤り=陽性になる)／53-am-34(誤答選択肢:末梢神経の叩打による放散痛)",
    "q": [
     "53-am-34",
     "56-am-82"
    ],
    "note": "確認済み[S1][S2][S3]。手根管症候群の診断は、短母指外転筋の筋力低下・母指球筋萎縮なども合わせて行う[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jsnt.gr.jp/guideline/img/syukonkan.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.jstage.jst.go.jp/article/jscn/41/3/41_164/_pdf/-char/ja"
     },
     {
      "label": "S3",
      "url": "https://www.msdmanuals.com/ja-jp/professional/06-%E7%AD%8B%E9%AA%A8%E6%A0%BC%E7%B3%BB%E7%96%BE%E6%82%A3%E3%81%A8%E7%B5%90%E5%90%88%E7%B5%84%E7%B9%94%E7%96%BE%E6%82%A3/%E6%89%8B%E7%96%BE%E6%82%A3/%E6%89%8B%E6%A0%B9%E7%AE%A1%E7%97%87%E5%80%99%E7%BE%A4"
     }
    ]
   },
   {
    "item": "Phalenテスト・逆Phalenテスト",
    "target": "手根管症候群",
    "value": "Phalen: 手関節を屈曲位に約1分保持し、しびれ・異常感覚が再現されれば陽性。逆Phalen: 手関節を伸展位で同様に行う。いずれも手根管内の圧上昇による症状の再現を見る。逆Phalenのほうが手根管内圧の上昇が大きいとされる",
    "exam": "出題は直接なし(Phalenは参考)",
    "q": [],
    "note": "確認済み[S1][S2]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jsnt.gr.jp/guideline/img/syukonkan.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.jstage.jst.go.jp/article/jscn/41/3/41_164/_pdf/-char/ja"
     }
    ]
   },
   {
    "item": "Tinel徴候・Phalenテストの精度(手根管症候群)",
    "target": "診断の確からしさ",
    "value": "メタ解析(7研究)の統合値は、Phalen: 感度0.57・特異度0.67、Tinel: 感度0.45・特異度0.78。Tinelは感度が低く特異度が高い、Phalenは中等度。単独の検査で診断せず、感覚・運動の検査、問診票などと組み合わせる",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S4]。研究ごとの幅は大きい(Phalen感度0.12〜0.92、Tinel感度0.17〜0.97)",
    "conflict": false,
    "sources": [
     {
      "label": "S4",
      "url": "https://pubmed.ncbi.nlm.nih.gov/37366626/"
     }
    ]
   },
   {
    "item": "Tinel徴候(足根管症候群)",
    "target": "足根管症候群(後脛骨神経の絞扼)",
    "value": "内果下部の後脛骨神経を叩く(または触れる)と、末梢にピリピリ感が出る。疼痛は果の後ろ(内果後部)に多く、足底や足趾に広がることがある。立位・歩行で悪化する",
    "exam": "59-pm-3(正答:足底のしびれ・疼痛、母指外転筋萎縮の例で、内果下方でTinel徴候が陽性=足根管症候群)",
    "q": [
     "59-pm-3"
    ],
    "note": "確認済み[S5]。国試の問題文の「母指外転筋萎縮」は、足の場合は母趾外転筋に当たる可能性があるが、筋萎縮はS5に記載がないため確認していない",
    "conflict": false,
    "sources": [
     {
      "label": "S5",
      "url": "https://www.msdmanuals.com/ja-jp/professional/06-%E7%AD%8B%E9%AA%A8%E6%A0%BC%E7%B3%BB%E7%96%BE%E6%82%A3%E3%81%A8%E7%B5%90%E5%90%88%E7%B5%84%E7%B9%94%E7%96%BE%E6%82%A3/%E8%B6%B3%E3%81%8A%E3%82%88%E3%81%B3%E8%B6%B3%E9%96%A2%E7%AF%80%E3%81%AE%E7%96%BE%E6%82%A3/%E8%B6%B3%E6%A0%B9%E7%AE%A1%E7%97%87%E5%80%99%E7%BE%A4"
     }
    ]
   },
   {
    "item": "Tinel徴候(肘部管症候群)",
    "target": "肘部管症候群(尺骨神経の絞扼)",
    "value": "肘関節の肘部管の位置で尺骨神経を叩くと、手の尺側(環指・小指側)に錯感覚が出れば陽性。症状は環指・小指と手の尺側のしびれ、進行すると手内在筋の筋力低下",
    "exam": "57-am-84(誤答:「肘部管のTinel徴候が陽性」は、前骨間神経麻痺・後骨間神経麻痺に共通する所見ではない)",
    "q": [
     "57-am-84"
    ],
    "note": "確認済み[S6]。肘部管は尺骨神経の部位であり、前骨間・後骨間神経の障害の所見ではない、という整理(S6から導いた記載)",
    "conflict": false,
    "sources": [
     {
      "label": "S6",
      "url": "https://www.msdmanuals.com/ja-jp/professional/06-%E7%AD%8B%E9%AA%A8%E6%A0%BC%E7%B3%BB%E7%96%BE%E6%82%A3%E3%81%A8%E7%B5%90%E5%90%88%E7%B5%84%E7%B9%94%E7%96%BE%E6%82%A3/%E6%89%8B%E7%96%BE%E6%82%A3/%E8%82%98%E9%83%A8%E7%AE%A1%E7%97%87%E5%80%99%E7%BE%A4"
     }
    ]
   },
   {
    "item": "Guyon管症候群とTinel徴候",
    "target": "手根管症候群との区別",
    "value": "Guyon管症候群は、手関節の高さで尺骨神経が絞扼される病態。症例報告では、Guyon管部よりやや近位でTinel徴候を認め、環指・小指のしびれ、鷲手、小指外転筋・母指内転筋の萎縮、Froment徴候を伴った。手根管症候群(正中神経)の症候として「Guyon管のTinel徴候陽性」を挙げるのは誤り",
    "exam": "59-am-92(誤答:手根管症候群の症候として「Guyon管のTinel徴候陽性」)",
    "q": [
     "59-am-92"
    ],
    "note": "確認済み[S7][S8][S2]。Guyon管症候群の記載は症例報告による。手根管内圧の上昇がGuyon管にも及び、手根管症候群とGuyon管症候群が合併する例もある[S2]ため、合併例は別として扱う",
    "conflict": false,
    "sources": [
     {
      "label": "S7",
      "url": "https://www.jstage.jst.go.jp/article/jcsoa/21/1/21_1_171/_article/-char/ja"
     },
     {
      "label": "S8",
      "url": "https://www.jstage.jst.go.jp/article/jsma/72/1/72_138/_article/-char/ja"
     },
     {
      "label": "S2",
      "url": "https://www.jstage.jst.go.jp/article/jscn/41/3/41_164/_pdf/-char/ja"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "tracheal-suction",
  "name": "気管吸引",
  "category": "リスク管理",
  "aliases": [
   "気管吸引",
   "吸引圧"
  ],
  "rows": [
   {
    "item": "気管吸引: 吸引圧",
    "target": "人工気道を有する成人の気管吸引",
    "value": "国試(2013年版ベース): 最大150 mmHg(20 kPa)以下。2023年版: 吸引圧を制限することを弱く推奨(推奨度C)、推奨される吸引圧は専門家により200 mmHg(≒26.6 kPa)以下",
    "exam": "54-pm-39 正答「吸引圧は最大150 mmHg」／53-pm-49 誤答選択肢「吸引圧20 kPa(150 mmHg)以上」／59-am-37 誤答選択肢「成人の吸引圧は80 mmHg程度が推奨される」",
    "q": [
     "53-pm-49",
     "54-pm-39",
     "59-am-37"
    ],
    "note": "確認済み(S11 CQ5-5, 2026-11-19)。食い違い(改訂): 国試54・53回の「150 mmHg」は2013年版の値。現行の2023年版は「200 mmHg以下」(2013年版の150を引用して記載)。80 mmHgを推奨とする記述は資料に無い",
    "conflict": true,
    "sources": [
     {
      "label": "S11",
      "url": "https://square.umin.ac.jp/jrcm/guideline/kikanguideline2023.pdf"
     }
    ]
   },
   {
    "item": "気管吸引: 吸引時間",
    "target": "人工気道を有する成人",
    "value": "1回の吸引(挿入開始から終了)は15秒以内(弱く推奨, エビデンスレベルⅥ・推奨度C)。(陰圧をかける時間10秒以内は別資料の記述で未確認)",
    "exam": "54-pm-39 誤答選択肢「1回の吸引時間は30秒以上」／53-pm-49 誤答選択肢「1回30秒程度の吸引」",
    "q": [
     "53-pm-49",
     "54-pm-39"
    ],
    "note": "確認済み(S11 CQ5-6, 2026-11-19)。30秒は基準を超える(誤答と整合)",
    "conflict": false,
    "sources": [
     {
      "label": "S11",
      "url": "https://square.umin.ac.jp/jrcm/guideline/kikanguideline2023.pdf"
     }
    ]
   },
   {
    "item": "気管吸引: カテーテル挿入の深さ・無菌操作",
    "target": "開放式気管吸引",
    "value": "吸引カテーテルを深く挿入しない(弱く推奨, 推奨度B)。気管分岐部に当たらない(1〜2 cm手前までの文献あり)。開放式吸引の無菌操作の可否は資料の別CQ(滅菌手袋と未滅菌手袋の比較)",
    "exam": "54-pm-39 誤答「カテーテル先端は気管分岐部の先まで」／53-pm-49 誤答「カテーテルは気管分岐部の先まで」／59-am-37 正答=無菌的操作とカテーテル先端が気管分岐部に当たらない深さ",
    "q": [
     "53-pm-49",
     "54-pm-39",
     "59-am-37"
    ],
    "note": "確認済み(S11 CQ5-3, 2026-11-19)。無菌操作の「必須」とする記述は別CQで解釈要(未確認)",
    "conflict": false,
    "sources": [
     {
      "label": "S11",
      "url": "https://square.umin.ac.jp/jrcm/guideline/kikanguideline2023.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-19",
  "review": "ai"
 },
 {
  "slug": "trail-making-test",
  "name": "Trail Making Test(TMT)",
  "category": "評価尺度",
  "aliases": [
   "Trail Making Test",
   "トレイルメイキングテスト",
   "TMT-A",
   "TMT-B",
   "TMT-J"
  ],
  "rows": [
   {
    "item": "TMT は何を見る検査か",
    "target": "注意機能(注意障害)の評価",
    "value": "紙と鉛筆で行う検査で、注意機能の評価に広く使われる。Part Bでは作業記憶や認知の柔軟性も関わるとされ、遂行機能の一部も反映する。QOL評価・人格検査・知能検査ではない",
    "exam": "57-am-28(正答:注意障害の検査)／54-pm-41(正答:注意障害―TMT)／52-am-29(正答:注意機能の検査。誤答:SCT・MMPI・バウムテスト・Kohs立方体組合せテスト)／61-am-4・61-am-37・61-am-98(選択肢の一つとして出て、各問の正答ではない)／59-am-47・56-pm-26(誤答:QOL評価尺度ではない)",
    "q": [
     "52-am-29",
     "54-pm-41",
     "56-pm-26",
     "57-am-28",
     "59-am-47",
     "61-am-4",
     "61-am-37",
     "61-am-98"
    ],
    "note": "確認済み[S1][S2]。日本版(TMT-J)は2019年に公表されたと報告されている",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/jjrm/69/4/69_351/_article/"
     },
     {
      "label": "S2",
      "url": "https://www.frontiersin.org/articles/10.3389/fnagi.2022.832158/full"
     }
    ]
   },
   {
    "item": "TMT-A(Part A)の手順",
    "target": "注意(視覚探索・処理速度)",
    "value": "紙上に散らばった1〜25の数字を、できるだけ速く昇順に線でつなぐ。制限時間240秒(日本の高齢者調査での設定)。所要時間(秒)を測る",
    "exam": "55-pm-8(正答:1〜25の数字を順に線でつなぐ所要時間を測る検査図=TMT-A)",
    "q": [
     "55-pm-8"
    ],
    "note": "確認済み[S2]。Part Aは視覚探索など処理速度を反映するとされる",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.frontiersin.org/articles/10.3389/fnagi.2022.832158/full"
     }
    ]
   },
   {
    "item": "TMT-B(Part B)の手順",
    "target": "注意の転換・作業記憶(より高次の注意)",
    "value": "数字(1〜13)とひらがな(あ〜し・12文字)を交互に、昇順に線でつなぐ。制限時間300秒(日本の高齢者調査での設定)。Part Aより課題が難しく、完了できない人も増える",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S2]。Part Bは作業記憶や認知の柔軟性が関わるとされる。論文の記載は「数字1〜13またはひらがな最初の12文字」",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.frontiersin.org/articles/10.3389/fnagi.2022.832158/full"
     }
    ]
   },
   {
    "item": "TMT の結果の読み方(所要時間・誤り)",
    "target": "注意障害の程度の判断",
    "value": "記録するのは、制限時間内に完了できたか・所要時間(秒)・誤りの数。脳疾患では注意障害が強いほど所要時間が長くなる。所要時間は短いほど良好で、数値が大きいことを良好とは判断できない",
    "exam": "49-pm-48(値が大きいと機能良好と判断できる、は誤り)／49-pm-80(絵を描く検査ではない、という設問)／51回(投影法ではない、という設問)",
    "q": [],
    "note": "確認済み[S1][S2]。研究では、誤りが出たらそこで止めて、その箇所から再開する方法が報告されている",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/jjrm/69/4/69_351/_article/"
     },
     {
      "label": "S2",
      "url": "https://www.frontiersin.org/articles/10.3389/fnagi.2022.832158/full"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "trendelenburg-sign",
  "name": "Trendelenburg徴候",
  "category": "検査法・徴候",
  "aliases": [
   "Trendelenburg sign",
   "Trendelenburg test",
   "トレンデレンブルグ徴候",
   "トレンデレンブルグ試験",
   "Trendelenburg歩行",
   "Trendelenburg跛行",
   "Duchenne歩行",
   "Duchenne跛行"
  ],
  "rows": [
   {
    "item": "Trendelenburg徴候の方法と陽性所見",
    "target": "股関節外転筋(中殿筋・小殿筋)の機能低下",
    "value": "立位で一側の股関節を90°屈曲(片脚立ち)にし、左右の腸骨稜の高さを見る。挙上した側の腸骨稜が、立脚側より下がれば陽性。立脚側へ体幹を傾けて代償する場合も、立脚側の外転筋(中殿筋・小殿筋)の弱さを示す。立脚側の外転筋の機能を見る検査",
    "exam": "59-am-31(正答:変形性股関節症でみられる。誤答:Tinel=絞扼神経障害、Froment=尺骨神経、Romberg=後索障害、Lhermitte=頸髄)／49-am-15(「左Trendelenburg徴候」は誤答)／51-am-4(「左Trendelenburg徴候」は伸展制限股では予想されない=誤答)",
    "q": [
     "59-am-31"
    ],
    "note": "確認済み[S1][S2]。[S1]は理学療法の解説サイト(二次資料)。[S2]は、この検査を股関節外転筋の機能の評価法として標準化した原著。陽性の判定基準(角度・時間)は資料により異なる",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.physiotutors.com/ja/wiki/trendelenburg-sign/"
     },
     {
      "label": "S2",
      "url": "https://pubmed.ncbi.nlm.nih.gov/4055873/"
     }
    ]
   },
   {
    "item": "Trendelenburg徴候がみられる疾患(変形性股関節症)",
    "target": "股関節疾患での骨盤の側方下降",
    "value": "重度の変形性股関節症(とくに臼蓋形成不全に伴う例)では、骨盤の側方下降=Trendelenburg徴候がみられる。大腿骨頭の上方移動が大きいほど骨盤が下がり、体幹を患側へ傾けるDuchenne跛行は、疼痛の影響を受けていた(股関節症18例)",
    "exam": "56-am-33(正答:生じやすい疾患は変形性股関節症=中殿筋機能低下。誤答:変形性足関節症・膝関節症・腰椎分離症・腰部脊柱管狭窄症)／59-am-31(正答:変形性股関節症)／51-pm-36(Trendelenburg歩行の原因=変形性股関節症。正)",
    "q": [
     "56-am-33",
     "59-am-31"
    ],
    "note": "確認済み[S3]。小規模(18例)の歩行解析の報告。Perthes病での陽性・陰性(49-pm-32の記載)は今回の資料では確認していない",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://pubmed.ncbi.nlm.nih.gov/30757914/"
     }
    ]
   },
   {
    "item": "変形性膝関節症でも陽性になりうるか",
    "target": "国試の誤答選択肢(膝関節症)との関係",
    "value": "小規模な報告(15例30脚)で、症状のある変形性膝関節症の23脚中21脚でTrendelenburg徴候が陽性だった(外転筋のMMTは良好)。下肢の機械軸の内側偏位が原因になりうると考察されている",
    "exam": "56-am-33(誤答選択肢:変形性膝関節症)",
    "q": [
     "56-am-33"
    ],
    "note": "国試は「生じやすい疾患=変形性股関節症」と答える設問で、膝関節症は誤答とされた。文献では膝OAで陽性になる報告もあるが、少数例の予備的報告であり、国試では股関節症(中殿筋機能低下)を選ぶ。確認済み[S4]",
    "conflict": true,
    "sources": [
     {
      "label": "S4",
      "url": "https://www.jstage.jst.go.jp/article/nishiseisai1951/49/1/49_1_28/_article/-char/en"
     }
    ]
   },
   {
    "item": "偽陽性・偽陰性の原因(検査の落とし穴)",
    "target": "結果の解釈",
    "value": "偽陽性の原因は、疼痛・患者の非協力・胸郭と腸骨稜の衝突。偽陰性の原因は、骨盤の上下の筋を使う代償と、立脚側へ体幹を倒すこと。この検査は股関節外転筋の機能の評価法として解釈する",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S2]。健常50名・脊椎や股関節の疾患103名を調べた報告",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://pubmed.ncbi.nlm.nih.gov/4055873/"
     }
    ]
   },
   {
    "item": "Trendelenburg試験の精度(変形性股関節症の判別)",
    "target": "診断の確からしさ",
    "value": "股関節症20名・健常20名の研究で、片脚立位での骨盤-大腿の内転角を使うと、股関節症の判別は感度0.55・特異度0.70・陽性尤度比1.83。研究者は、早期の股関節症の判別には有用でないとした",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S5]。少人数の研究",
    "conflict": false,
    "sources": [
     {
      "label": "S5",
      "url": "https://pubmed.ncbi.nlm.nih.gov/20331375/"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "ultrasound-therapy",
  "name": "超音波療法",
  "category": "物理療法",
  "aliases": [
   "超音波療法"
  ],
  "rows": [
   {
    "item": "超音波療法: 周波数",
    "target": "腰部筋筋膜炎・足底腱膜炎",
    "value": "1 MHz=深部(皮下2〜5 cm)、3 MHz=表層。使用は1または3 MHz",
    "exam": "56-pm-9 正答「周波数を1 MHzとする」／57-am-9 誤答選択肢「周波数を10 MHzとする」",
    "q": [
     "56-pm-9",
     "57-am-9"
    ],
    "note": "確認済み(S13, 2026-11-19)(学会誌の教育講演。診療ガイドラインではない)",
    "conflict": false,
    "sources": [
     {
      "label": "S13",
      "url": "https://www.jstage.jst.go.jp/article/jjeapt/24/1/24_16-9/_pdf/-char/ja"
     }
    ]
   },
   {
    "item": "超音波療法: 照射時間率・導子",
    "target": "超音波治療",
    "value": "照射時間率: 非温熱20〜50%、温熱100%。BNR・導子と皮膚の距離の基準は資料に無し",
    "exam": "56-pm-9 正答「照射時間率を100%」(温熱)。誤答選択肢=導子を皮膚面から5 cm離す・BNR 6の導子を固定法／57-am-9 正答「照射時間率を40%」、誤答「プローブを5 cm以上離す」／54-am-40 誤答「温熱効果を目的とする場合には照射時間率5%」",
    "q": [
     "54-am-40",
     "56-pm-9",
     "57-am-9"
    ],
    "note": "確認済み(照射時間率: S13, 2026-11-19)。BNR・5 cm離す・40%の当否の細部は未確認(40%は非温熱20〜50%の範囲内)",
    "conflict": false,
    "sources": [
     {
      "label": "S13",
      "url": "https://www.jstage.jst.go.jp/article/jjeapt/24/1/24_16-9/_pdf/-char/ja"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-19",
  "review": "ai"
 },
 {
  "slug": "wais",
  "name": "ウェクスラー成人知能検査(WAIS)",
  "category": "評価尺度",
  "aliases": [
   "WAIS-IV",
   "WAIS-Ⅳ",
   "WAIS-III",
   "WAIS-Ⅲ",
   "Wechsler Adult Intelligence Scale",
   "ウェクスラー式知能検査",
   "ウェクスラー成人知能検査"
  ],
  "rows": [
   {
    "item": "WAIS は何を見る検査か",
    "target": "成人の知能(認知能力を多面的に測る)",
    "value": "個別式の知能検査。医療・就労・教育で使われる。人格検査・認知症スクリーニング・遂行機能検査・発達評価の検査ではない",
    "exam": "59-pm-19(誤答選択肢:WAIS-IVは知能検査)／57-am-35・57-pm-85(誤答選択肢:WAIS-Ⅲは認知症スクリーニング・発達評価ではない)／55-pm-29(誤答選択肢:WAIS-Ⅲは遂行機能の検査として誤り)／61-am-4・61-am-37・61-am-98(選択肢の一つとして出て、各問の正答ではない。WAIS・WMS-R・MMSEは人格検査ではない)",
    "q": [
     "55-pm-29",
     "57-am-35",
     "57-pm-85",
     "59-pm-19",
     "61-am-4",
     "61-am-37",
     "61-am-98"
    ],
    "note": "確認済み[S1]。「人格検査・認知症スクリーニングではない」は、検査の種類(知能検査)からの整理で、国試の誤答の理由と合わせた",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.nichibun.co.jp/seek/kensa/wais4.html"
     }
    ]
   },
   {
    "item": "日本版 WAIS-IV の構成",
    "target": "知能の合成得点",
    "value": "2018年発行、適用年齢16歳0カ月〜90歳11カ月。下位検査は15(基本10・補助5)。基本10で、全検査IQ(FSIQ)と4指標(言語理解VCI・知覚推理PRI・ワーキングメモリーWMI・処理速度PSI)の5つの合成得点が出る。補助の得点として一般知的能力指標(GAI)・認知熟達度指標(CPI)。実施は60〜90分",
    "exam": "出題は直接なし(参考)。59-pm-19でWAIS-IVが知能検査として出た",
    "q": [],
    "note": "確認済み[S1]。WAIS-IVには言語性IQ(VIQ)・動作性IQ(PIQ)の掲載がない(指標方式)",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.nichibun.co.jp/seek/kensa/wais4.html"
     }
    ]
   },
   {
    "item": "WAIS-III の解釈で使う指数",
    "target": "旧版(WAIS-III)の結果の読み方",
    "value": "WAIS-IIIの解釈では、群指数のほか、言語性IQ・動作性IQによる解釈の手順がある。WAIS-IVはその改訂版にあたる",
    "exam": "57-am-35・57-pm-85・55-pm-29(WAIS-Ⅲが選択肢として出た)",
    "q": [
     "55-pm-29",
     "57-am-35",
     "57-pm-85"
    ],
    "note": "確認済み[S2]。解釈書の目次に基づく記載で、各指数の算出法は書かない",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.nichibun.co.jp/seek/book/63659.html"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "wcst",
  "name": "ウィスコンシンカード分類検査(WCST)",
  "category": "検査法・徴候",
  "aliases": [
   "WCST",
   "Wisconsin Card Sorting Test",
   "ウィスコンシンカード分類検査",
   "ウィスコンシン・カード・ソーティング",
   "KWCST",
   "慶應版WCST"
  ],
  "rows": [
   {
    "item": "WCSTとは(遂行機能・保続の検査)",
    "target": "遂行機能障害・前頭葉機能の評価",
    "value": "カードの分類ルールを、正しい/誤りというフィードバックだけから推測させ、ルールが変わったときに切り替えられるかをみる神経心理検査。実行機能と保続を測り、前頭葉損傷の指標とされる。主な得点は保続エラーの数",
    "exam": "55-pm-29(遂行機能障害の診断に用いる検査=WCSTが正答)／誤答選択肢として登場: 57-am-28(注意障害の検査はTMT)、57-am-81(質問紙法ではない)、52-am-81(語の流暢性課題を含む検査はHDS-R)、54-pm-36(疼痛評価ではない)、55-pm-81(「WCST―自我状態」は誤り)",
    "q": [
     "55-pm-29",
     "57-am-28",
     "57-am-81",
     "52-am-81",
     "54-pm-36",
     "55-pm-81"
    ],
    "note": "確認済み[S1]。国試では「遂行機能(セットの転換)」の検査として覚える。注意・質問紙・人格・疼痛の検査ではない",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.lancaster.ac.uk/fas/psych/glossary/wisconsin_card_sorting_test_-wcst/"
     }
    ]
   },
   {
    "item": "標準版WCSTの手順",
    "target": "検査の進め方",
    "value": "128枚のカード(色4種・形4種・数4種の組合せ)を、4枚の刺激カードのどれかに合わせて分類させる。検者は正しい/誤りとだけ伝える。連続10回正しく分類すると、予告なしに分類のルールが変わる",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.lancaster.ac.uk/fas/psych/glossary/wisconsin_card_sorting_test_-wcst/"
     }
    ]
   },
   {
    "item": "慶應版WCST(KWCST)",
    "target": "日本で使われる短縮版",
    "value": "カードを128枚から48枚に減らし、短い休止をはさんで2段階で提示し、第2段階の前に簡単な教示を行う。指標は達成カテゴリー数・Nelson型保続エラー・セット維持困難・最初のカテゴリー達成までの反応カード数・総誤反応数。健常者335名(5〜82歳)の検討では、30代半ば〜40代半ばで成績が最もよかった",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S2](要旨の記載)。カットオフ値は出典になく書いていない",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.jstage.jst.go.jp/article/ojjscn1969/36/6/36_6_475/_article/-char/en"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "wheelchair-fitting-environment",
  "name": "車椅子の適合寸法と住環境(スロープ・回転スペース)",
  "category": "検査法・徴候",
  "aliases": [
   "車椅子の適合",
   "車椅子の寸法",
   "標準型車椅子",
   "座幅",
   "座面高",
   "座の奥行き",
   "バックサポート",
   "アームサポート",
   "スロープの勾配",
   "傾斜路",
   "車椅子の回転",
   "180度転回",
   "車椅子の廊下幅",
   "フィッティング"
  ],
  "rows": [
   {
    "item": "スロープ(傾斜路)の勾配",
    "target": "段差解消のスロープの長さの計算",
    "value": "傾斜路の勾配は1/12を超えないこと(高さ16cm以下のものは1/8を超えない)。勾配1/12なら、段差の高さ×12がスロープの長さ。25cmの段差なら25cm×12=300cm=3.0m。",
    "exam": "61-am-29(25cmの段差、車椅子自走→3.0mが正答。誤答:1.0・1.5・2.0・2.5m)",
    "q": [
     "61-am-29"
    ],
    "note": "確認済み[S1][S2]。国試の3.0mは勾配1/12の計算と一致。『車椅子自走』の設問条件と勾配の対応は、資料では確認していない(資料は車椅子使用者に配慮した建築基準としての勾配)。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.mlit.go.jp/jutakukentiku/content/001892110.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.mlit.go.jp/jutakukentiku/build/barrier-free.files/04-01yuudoukijunsyourei.pdf"
     }
    ]
   },
   {
    "item": "車椅子の回転に必要なスペース(180度転回・360度回転)",
    "target": "廊下幅・通路の設計",
    "value": "車椅子使用者が180°転回(方向転換)するために必要なスペースは140cm×140cm以上。360°回転するために必要なスペースは直径150cm以上。",
    "exam": "58-am-13(全幅70cm・全長120cmの車椅子が180度方向転換するのに必要な最小の廊下幅=140cmが正答。選択肢90・120・140・180・200cm)",
    "q": [
     "58-am-13"
    ],
    "note": "確認済み[S1]。国試の正答140cmは180°転回の目安と一致。この問いは車椅子の寸法を使う設問のため、資料の140cm角の目安とそのまま同じ根拠かは確認していない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.mlit.go.jp/jutakukentiku/content/001892110.pdf"
     }
    ]
   },
   {
    "item": "座幅の決め方",
    "target": "車椅子の適合(身体計測に基づく寸法)",
    "value": "自走用:腰幅+3〜4cm程度。介助用:腰幅+4〜5cm程度。カタログの座幅はメーカー・機種で基準(フレームの内側・外側)が異なるため、実際の寸法との関係を確認する。",
    "exam": "53-pm-14(厚さ3cmのクッション使用の症例で、座幅40cmと肘掛けの高さ23cmがどちらも正答扱い。計測値は図で、図は未確認)",
    "q": [
     "53-pm-14"
    ],
    "note": "確認済み[S3]。計測値(腰幅)が図のため、40cmが腰幅+何cmかは確認していない。",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://www.techno-aids.or.jp/research/vol18.pdf"
     }
    ]
   },
   {
    "item": "座面高の決め方",
    "target": "車椅子の適合",
    "value": "手こぎ・介助移動:下腿長(使用する靴・装具を含む)+クッション高+4cm。足こぎ:下腿長(靴・装具を含む)+クッション高。座面が低すぎると仙骨座りの原因になり、立ち上がりもしにくい。",
    "exam": "53-pm-14(膝窩からフットプレートの値などを含む寸法の問題。図は未確認)",
    "q": [
     "53-pm-14"
    ],
    "note": "確認済み[S3]。",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://www.techno-aids.or.jp/research/vol18.pdf"
     }
    ]
   },
   {
    "item": "座の奥行きの決め方",
    "target": "車椅子の適合",
    "value": "大腿長−2〜3cm程度(背のフィッティングを行ったうえで)。足こぎの場合は大腿長−3〜5cm程度。奥行きが長いと膝の裏がぶつかり、仙骨座りの原因になる。",
    "exam": "53-pm-14(シート長43cmなどの選択肢。図は未確認)",
    "q": [
     "53-pm-14"
    ],
    "note": "確認済み[S3]。",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://www.techno-aids.or.jp/research/vol18.pdf"
     }
    ]
   },
   {
    "item": "バックサポート・アームサポートの高さ",
    "target": "車椅子の適合",
    "value": "バックサポート高は40〜45cmが目安。自走用は肩甲骨下端より低くするのが基本(高齢者は座る機能を重視して肩甲骨にかかる高さでもよい)。アームサポートの高さ=座面から肘までの高さ+クッション高。",
    "exam": "53-pm-14(背もたれ高45cm、肘掛けの高さ23cmの選択肢。図は未確認)",
    "q": [
     "53-pm-14"
    ],
    "note": "確認済み[S3]。クッション3cmを含む計算の可否は計測値(図)が確認できないため未検証。",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://www.techno-aids.or.jp/research/vol18.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "wisc",
  "name": "WISC(ウェクスラー児童用知能検査)",
  "category": "評価尺度",
  "aliases": [
   "WISC",
   "WISC-III",
   "WISC-Ⅲ",
   "WISC-IV",
   "WISC-Ⅳ",
   "WISC-V",
   "ウェクスラー児童用知能検査",
   "ウィスク"
  ],
  "rows": [
   {
    "item": "WISCの位置づけ(知能検査)",
    "target": "児童の知的発達水準の評価",
    "value": "個別式の知能検査。日本版WISC-IVの対象は5歳0か月〜16歳11か月。WISC-Vも原版は6歳から適用だが、日本版は5歳から評価できる。全検査IQ(FSIQ)が全般的な知的水準を示す",
    "exam": "53-pm-85(知能検査はどれか→WISC-Ⅲが正答)／57-pm-85(発達評価はどれか→正答はDDST-Ⅱ。WISC-Ⅲ・WPPSI-Ⅱ・K-ABCⅡ・WAIS-Ⅲは誤答選択肢)",
    "q": [
     "53-pm-85",
     "57-pm-85"
    ],
    "note": "確認済み[S1][S2]。国試は「知能検査」か「発達評価(発達スクリーニング)」かで分けている",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://k-rain.repo.nii.ac.jp/record/2000006/files/ningenkaihatsu_14_006.pdf"
     },
     {
      "label": "S2",
      "url": "https://sakushin-u.repo.nii.ac.jp/record/816/files/SDR50007.pdf"
     }
    ]
   },
   {
    "item": "WISC-Ⅲ(旧版)",
    "target": "国試の選択肢に出る版",
    "value": "全検査IQ(FIQ)に加え、言語性・動作性の検査から得点を出す構成。次の版のWISC-Ⅳで、従来の言語性IQ・動作性IQは廃止されて全検査IQに統合された",
    "exam": "53-pm-85(正答)／57-pm-85(誤答選択肢)",
    "q": [
     "53-pm-85",
     "57-pm-85"
    ],
    "note": "確認済み[S1][S2]。現行は日本版WISC-IV(2010年刊)とWISC-V(2022年刊)",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://k-rain.repo.nii.ac.jp/record/2000006/files/ningenkaihatsu_14_006.pdf"
     },
     {
      "label": "S2",
      "url": "https://sakushin-u.repo.nii.ac.jp/record/816/files/SDR50007.pdf"
     }
    ]
   },
   {
    "item": "WISC-Ⅳ(日本版2010年刊)",
    "target": "4指標で認知特性をみる",
    "value": "10の基本検査(ほかに補助検査5)から、全検査IQと4つの指標(言語理解VCI・知覚推理PRI・ワーキングメモリーWMI・処理速度PSI)を算出する",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1][S2]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://k-rain.repo.nii.ac.jp/record/2000006/files/ningenkaihatsu_14_006.pdf"
     },
     {
      "label": "S2",
      "url": "https://sakushin-u.repo.nii.ac.jp/record/816/files/SDR50007.pdf"
     }
    ]
   },
   {
    "item": "WISC-V(日本版2022年刊)",
    "target": "5つの主要指標",
    "value": "主要指標は5つ(言語理解・視空間・流動性推理・ワーキングメモリー・処理速度)。下位検査は16。全検査IQは7下位検査(類似・単語・積木模様・行列推理・バランス・数唱・符号)で算出できる",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://k-rain.repo.nii.ac.jp/record/2000006/files/ningenkaihatsu_14_006.pdf"
     }
    ]
   },
   {
    "item": "WISCの得点の見方",
    "target": "IQ・指標の解釈",
    "value": "全検査IQと各指標の合成得点は平均100・標準偏差15。下位検査の評価点は平均10・標準偏差3。WISC-Vの分類記述は130以上=極めて高い、120〜129=非常に高い、110〜119=平均の上、90〜109=平均、80〜89=平均の下、70〜79=非常に低い、69以下=極めて低い",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。学習用の要約で、診断・判定の指示ではない",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://k-rain.repo.nii.ac.jp/record/2000006/files/ningenkaihatsu_14_006.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 }
];
