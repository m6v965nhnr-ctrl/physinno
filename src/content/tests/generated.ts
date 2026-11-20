// 自動生成（scripts/build-tests.mjs）。直接は編集しない
import type { TestCard } from "./types";
export const TESTS: TestCard[] = [
 {
  "slug": "abi",
  "name": "足関節上腕血圧比(ABI)",
  "category": "臨床検査",
  "aliases": [
   "ABI",
   "足関節上腕血圧比"
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
   "key muscle"
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
  "slug": "exercise-intensity",
  "name": "運動強度の決め方(Karvonen法・Borg指数)",
  "category": "リスク管理",
  "aliases": [
   "Karvonen法",
   "カルボーネン法",
   "Borg指数",
   "Borgスケール",
   "ボルグ"
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
  "slug": "hoehn-yahr",
  "name": "Hoehn-Yahr重症度分類",
  "category": "評価尺度",
  "aliases": [
   "Hoehn-Yahr",
   "Hoehn&Yahr",
   "ホーエン・ヤール"
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
 }
];
