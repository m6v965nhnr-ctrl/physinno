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
  "slug": "allen-test",
  "name": "Allenテスト",
  "category": "検査法・徴候",
  "aliases": [
   "Allenテスト",
   "Allen テスト",
   "Allen test",
   "Allen's test",
   "アレンテスト",
   "アレン試験",
   "Modified Allen test",
   "改良Allenテスト"
  ],
  "rows": [
   {
    "item": "Allenテスト(手の側副血行・橈骨動脈と尺骨動脈の開存)",
    "target": "動脈穿刺・採血・動脈ライン留置や橈骨動脈採取の前に、手の二重の血流(橈骨動脈と尺骨動脈)が保たれているかを見る",
    "value": "手を何度か握らせて血を絞った状態で、橈骨動脈と尺骨動脈の両方を圧迫して手を蒼白にする。次に片方の圧迫だけを離し、もう一方は圧迫したまま手の色の戻りを見る。約10秒以内に色が戻れば、離した側の動脈から十分に血流が来ていて側副血行が良好と読む。尺骨側を離して見る標準法と、橈骨側を離して見る逆向きの方法があり、両方向で行う考え方もある。",
    "exam": "51-pm-32(「頸椎の椎間孔圧迫試験」を選ぶ問題で、Allenテストは誤答選択肢。正答はSpurlingテスト。誤答にはほかにAdson・Morley・Wright)",
    "q": [
     "51-pm-32"
    ],
    "note": "確認済み[S1][S2]。色の戻りの秒数は資料や研究で違い(Taberは約10秒、研究では3〜6秒などのカットオフが検討された[S3])、1つの値に決まっていない。1929年にAllenが、尺骨動脈の閉塞性血栓血管炎の診断に用いたのが始まり[S2]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.tabers.com/tabersonline/pview/Tabers-Dictionary/765380/all/Allen%20test"
     },
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4632347/"
     }
    ]
   },
   {
    "item": "Allenテスト(胸郭出口症候群の誘発テストとしての意味)",
    "target": "小胸筋の緊張による胸郭出口部の圧迫(腕神経叢・血管)を見る誘発テスト",
    "value": "座位で、検査する側の肩を90°外転・肘を90°屈曲し、橈骨動脈の脈を触れながら、上腕を外旋させ、同時に頭を反対側へ回旋させる。脈が弱くなる、または消えれば、小胸筋による神経血管束の圧迫を疑う。偽陽性が多い検査とされる。",
    "exam": "51-pm-32(選択肢Adson・Allen・Morley・Wrightはどれも胸郭出口症候群の誘発テストの名前として並ぶ。問われたのは頸椎の椎間孔圧迫試験=Spurlingなので、いずれも誤答)",
    "q": [
     "51-pm-32"
    ],
    "note": "確認済み[S1]。日本整形外科学会の患者向け解説(胸郭出口症候群)にはAdson・Wright・Roos・Edenが載るがAllenは載っていない。1つの名前が「手の血流のテスト」と「胸郭出口の誘発テスト」の2つの意味で使われる点に注意。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.tabers.com/tabersonline/pview/Tabers-Dictionary/765380/all/Allen%20test"
     }
    ]
   },
   {
    "item": "Allenテストの診断精度(冠動脈バイパス用の橈骨動脈採取前)",
    "target": "手の血流の評価として、どこまで信頼できるか",
    "value": "ドプラ超音波を基準にした93手の研究では、色の戻り6秒をカットオフにすると感度54.5%・特異度91.7%・正確度78.5%。3秒だと感度100%だが特異度27%。著者は、どのカットオフでも判別検査として十分ではなく、ドプラ超音波などより客観的な検査に置き換えるべきと結論した。別の145例の研究では、感度73.2%・特異度97.1%で、「手の循環のスクリーニングとして妥当。陰性なら橈骨動脈の採取は安全、陽性ならさらに調べる」と評価された。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S3][S4]。研究により結論が分かれる。単独で採取の可否を決めず、必要に応じて超音波などと併せる。",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://pubmed.ncbi.nlm.nih.gov/11081899/"
     },
     {
      "label": "S4",
      "url": "https://pubmed.ncbi.nlm.nih.gov/17889550/"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
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
  "slug": "anorexia-nervosa-findings",
  "name": "神経性やせ症(神経性無食欲症)の身体・検査所見",
  "category": "臨床検査",
  "aliases": [
   "神経性無食欲症",
   "神経性やせ症",
   "神経性食欲不振症",
   "拒食症",
   "摂食障害",
   "リフィーディング症候群",
   "再栄養症候群"
  ],
  "rows": [
   {
    "item": "血液検査の所見",
    "target": "神経性やせ症を疑う検査異常",
    "value": "総コレステロール高値(高コレステロール血症)、低血糖(グルコース低下)、低カリウム・低ナトリウム、低リン・低マグネシウム、AST・ALT上昇(飢餓による)、白血球・血小板減少と貧血、甲状腺ホルモン(T3・T4)低下、コルチゾール上昇。嘔吐がある人ではアミラーゼ(唾液腺型)が上がる。",
    "exam": "58-pm-100(神経性無食欲症で生じやすいのはどれか。正答は高コレステロール血症。誤答は頻脈・高血圧・高血糖・高リン血症)",
    "q": [
     "58-pm-100"
    ],
    "note": "確認済み[S1][S2][S3]。MSDマニュアルは、血液検査の異常は出てもごく軽度としている。",
    "conflict": false,
    "sources": [
     {
      "label": "S4",
      "url": "https://dept.dokkyomed.ac.jp/dep-m/edsupport/resources/medical_cooperation_03.pdf"
     },
     {
      "label": "S2",
      "url": "https://mhlw-grants.niph.go.jp/system/files/2014/143011/201410001A_upload/201410001A0017.pdf"
     },
     {
      "label": "S3",
      "url": "https://www.msdmanuals.com/ja-jp/professional/08-%E7%B2%BE%E7%A5%9E%E7%96%BE%E6%82%A3/%E6%91%82%E9%A3%9F%E7%97%87%E7%BE%A4/%E7%A5%9E%E7%B5%8C%E6%80%A7%E3%82%84%E3%81%9B%E7%97%87"
     }
    ]
   },
   {
    "item": "循環器・全身の所見",
    "target": "低栄養による身体の変化",
    "value": "徐脈(60/分未満)、低血圧(収縮期90 mmHg未満)、起立性低血圧、低体温(36℃以下)。心電図は徐脈・QT延長・不整脈・房室ブロックなど、心エコーは心嚢液貯留・僧帽弁逸脱、胸部X線は心胸郭比の低下。うぶ毛の密生、浮腫、便秘、女性では無月経もみられる。",
    "exam": "58-pm-100(誤答選択肢の頻脈・高血圧は逆で、徐脈・低血圧が一般的)",
    "q": [
     "58-pm-100"
    ],
    "note": "確認済み[S1][S2][S3]",
    "conflict": false,
    "sources": [
     {
      "label": "S4",
      "url": "https://dept.dokkyomed.ac.jp/dep-m/edsupport/resources/medical_cooperation_03.pdf"
     },
     {
      "label": "S2",
      "url": "https://mhlw-grants.niph.go.jp/system/files/2014/143011/201410001A_upload/201410001A0017.pdf"
     },
     {
      "label": "S3",
      "url": "https://www.msdmanuals.com/ja-jp/professional/08-%E7%B2%BE%E7%A5%9E%E7%96%BE%E6%82%A3/%E6%91%82%E9%A3%9F%E7%97%87%E7%BE%A4/%E7%A5%9E%E7%B5%8C%E6%80%A7%E3%82%84%E3%81%9B%E7%97%87"
     }
    ]
   },
   {
    "item": "低血糖",
    "target": "飢餓による代謝の変化",
    "value": "肝臓のグリコーゲンの蓄えが少ないため、低血糖を起こしやすい。血糖60 mg/dL未満で意識障害や低体温などの症状があれば、ブドウ糖の静脈内投与の対象になる。",
    "exam": "58-pm-100(誤答選択肢の高血糖は逆で、低血糖が起こりやすい)",
    "q": [
     "58-pm-100"
    ],
    "note": "確認済み[S2]",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://mhlw-grants.niph.go.jp/system/files/2014/143011/201410001A_upload/201410001A0017.pdf"
     }
    ]
   },
   {
    "item": "低リン血症と再栄養",
    "target": "リフィーディング症候群に関わる所見",
    "value": "栄養不良では血清リンが低下する。再栄養の過程では、インスリン増加に伴いリンやカリウムが細胞内に取り込まれ、さらに低下する。血清リン1.0 mg/dL未満で意識障害・心不全・けいれんなど重い症状が出て、死因になりうる。",
    "exam": "58-pm-100(誤答選択肢の高リン血症は逆で、低リン血症が問題になる)",
    "q": [
     "58-pm-100"
    ],
    "note": "確認済み[S1][S2]",
    "conflict": false,
    "sources": [
     {
      "label": "S4",
      "url": "https://dept.dokkyomed.ac.jp/dep-m/edsupport/resources/medical_cooperation_03.pdf"
     },
     {
      "label": "S2",
      "url": "https://mhlw-grants.niph.go.jp/system/files/2014/143011/201410001A_upload/201410001A0017.pdf"
     }
    ]
   },
   {
    "item": "入院を考える目安",
    "target": "身体的緊急時の指針",
    "value": "入院適応の項目に、低血糖、電解質異常(特に緊急はK 2.5 mEq/L未満・P 2 mg/dL未満)、心電図異常(QT延長・徐脈。心拍数40未満や不整脈は緊急)、低血圧(90/60 mmHg未満は緊急)、低体温(35℃未満は緊急)などがある。低カリウム血症は3.0 mEq/L未満で入院が好ましい。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。小児・成人の個別の判断は主治医による。学習用の要約。",
    "conflict": false,
    "sources": [
     {
      "label": "S4",
      "url": "https://dept.dokkyomed.ac.jp/dep-m/edsupport/resources/medical_cooperation_03.pdf"
     }
    ]
   },
   {
    "item": "内分泌・骨の変化",
    "target": "長期の低栄養の影響",
    "value": "性腺ホルモンの低下、T3・T4の軽度低下、コルチゾール分泌の増加、骨密度の低下がみられる。月経は多くの女性で止まるが、現在の診断基準には含まれない。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1][S3]",
    "conflict": false,
    "sources": [
     {
      "label": "S4",
      "url": "https://dept.dokkyomed.ac.jp/dep-m/edsupport/resources/medical_cooperation_03.pdf"
     },
     {
      "label": "S3",
      "url": "https://www.msdmanuals.com/ja-jp/professional/08-%E7%B2%BE%E7%A5%9E%E7%96%BE%E6%82%A3/%E6%91%82%E9%A3%9F%E7%97%87%E7%BE%A4/%E7%A5%9E%E7%B5%8C%E6%80%A7%E3%82%84%E3%81%9B%E7%97%87"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
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
  "slug": "barre-sign",
  "name": "Barré徴候(上肢・下肢)",
  "category": "検査法・徴候",
  "aliases": [
   "Barré徴候",
   "Barré 徴候",
   "Barré sign",
   "Barré test",
   "Barréテスト",
   "Barré試験",
   "バレー徴候",
   "上肢Barré",
   "上肢Barré徴候",
   "上肢バレー徴候",
   "下肢Barré",
   "下肢Barré徴候",
   "下肢バレー徴候",
   "Mingazzini",
   "Mingazzini徴候",
   "ミンガッツィーニ",
   "上肢挙上試験",
   "pronator drift"
  ],
  "rows": [
   {
    "item": "上肢Barré徴候(Mingazziniの上肢挙上試験)",
    "target": "上肢の軽い運動麻痺(錐体路の障害)を見つける",
    "value": "両腕を前に伸ばして手のひらを上に向け、指をそろえ、閉眼で保持させる。上肢の下降・前腕の回内・肘の屈曲があるかを見て、上肢が回内しながら下がれば陽性(日本神経学会の手引き)。麻痺側の腕は、下がるだけでなく、肘などが軽く曲がることもある。なお、tPA治療の判定の際は手のひらを下に向けて行うとされる。",
    "exam": "60-pm-82(「深部感覚障害で陽性となるのは」の誤答選択肢。正答はRomberg徴候。ほかの誤答はKernig・Lasègue・カーテン徴候)／61-am-16(多発性硬化症の電撃痛の問題で、Barré徴候は誤答。正答はLhermitte徴候)／55-am-17(Uhthoff徴候の設問で、Barré徴候は誤答選択肢)",
    "q": [
     "60-pm-82",
     "61-am-16",
     "55-am-17"
    ],
    "note": "確認済み[S1][S2]。Barré徴候は運動麻痺を見る検査で、深部感覚障害を見る検査ではない。Guillain-Barré症候群とは別のもの(名前に「Barré」が入るだけ。疾患名と検査名を混同しない)。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.neurology-jp.org/news/news_20080715_01.html"
     },
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5878183/"
     }
    ]
   },
   {
    "item": "下肢Barré徴候",
    "target": "下肢の軽い運動麻痺(錐体路の障害)を見つける",
    "value": "腹臥位で両膝を90°屈曲させ、両足が接しないようにその肢位を保たせる。下腿が下降したら陽性。腹臥位が難しい場合もあり、必須の検査ではない(日本神経学会の手引き)。Barréが1919年に報告した方法で、麻痺側の下肢が下がる。膝などの痛みで関節が動かしにくいと偽陽性になりうる。",
    "exam": "出題は直接なし(参考。出題は上肢側の名称や、感覚障害との区別で問われている)",
    "q": [],
    "note": "確認済み[S1][S2]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.neurology-jp.org/news/news_20080715_01.html"
     },
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5878183/"
     }
    ]
   },
   {
    "item": "Mingazzini徴候(下肢)",
    "target": "下肢の軽い運動麻痺を見つける",
    "value": "仰臥位で股関節を約90°屈曲し、下腿をベッドと水平に保たせる。下腿が下降したら陽性(日本神経学会の手引き)。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。上肢の挙上試験・下肢の試験ともMingazziniが1913年に報告し、Barréが後に詳しく紹介した。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.neurology-jp.org/news/news_20080715_01.html"
     },
     {
      "label": "S3",
      "url": "https://www.jstage.jst.go.jp/article/clinicalneurol/55/7/55_cn-000693/_article"
     }
    ]
   },
   {
    "item": "名前の由来(BarréとMingazzini)",
    "target": "日本でBarré試験と呼ばれる検査の成り立ち",
    "value": "上肢・下肢のドリフト試験はMingazziniが1913年に報告。Barréは1919年に腹臥位の下肢の試験を報告し、1937年にMingazziniの上肢・下肢の試験を、自分の患者の写真つきで紹介した。Barréが原著を引用しなかったため、日本では「上肢Barré試験」の呼び名・手技の記載がばらつき、日本神経学会の手引きでは「Mingazziniの上肢挙上試験」と併記される。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S2][S3]",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5878183/"
     },
     {
      "label": "S3",
      "url": "https://www.jstage.jst.go.jp/article/clinicalneurol/55/7/55_cn-000693/_article"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
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
  "slug": "baum-test",
  "name": "バウムテスト",
  "category": "臨床検査",
  "aliases": [
   "バウム・テスト",
   "Baum test",
   "樹木画",
   "樹木画テスト",
   "実のなる木",
   "コッホ",
   "描画法",
   "投影描画法",
   "Picture-Frustration Study",
   "Sentence Completion Test",
   "NEO Personality Inventory",
   "質問紙法",
   "投影法",
   "投映法"
  ],
  "rows": [
   {
    "item": "バウムテスト(樹木画)",
    "target": "描画による投影法の人格検査",
    "value": "「実のなる木を1本描いてください」という教示で木の絵を自由に描かせる描画法(投影法)。A4用紙・濃い鉛筆・消しゴムを使い、全体の印象・根/幹/樹冠/枝葉の形態分析、筆圧などの動態分析、紙面上の位置の空間分析を行う。質問紙法ではない。",
    "exam": "56-am-79(誤答選択肢: 「イラスト風の人物のセリフを書き込む」検査ではない)／57-am-35・57-am-81(誤答選択肢: バウムテスト・Rorschachは投影法。質問紙法ではない)／59-am-78(誤答選択肢: 描画法)／第49回に「1本の実のなる木を描いてください」の指示(問題IDは未確認)",
    "q": [
     "56-am-79",
     "57-am-35",
     "57-am-81",
     "59-am-78"
    ],
    "note": "確認済み[S1][S2]。考案年は資料により1945年・1949年と食い違うため、年は覚えなくてよい。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://tk.seitoku-u.ac.jp/cms_tk_seitoku/wp-content/uploads/2024/12/%E8%81%96%E5%BE%B3%E5%A4%A7%E5%AD%A6%E5%85%AC%E8%AA%8D%E5%BF%83%E7%90%86%E5%B8%AB%E5%85%A5%E5%AD%A6%E8%AA%AC%E6%98%8E%E4%BC%9A%E6%A8%A1%E6%93%AC%E8%AC%9B%E7%BE%A9%E3%83%91%E3%83%BC%E3%82%BD%E3%83%8A%E3%83%AA%E3%83%86%E3%82%A3%E6%A4%9C%E6%9F%BB.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.tokyomirai.ac.jp/info/research/bulletin/pdf/05/fukawa.pdf"
     }
    ]
   },
   {
    "item": "P-Fスタディ(絵画欲求不満テスト)",
    "target": "漫画風の場面で人物のセリフを書き込む検査",
    "value": "日常のかるい欲求不満場面24場面。漫画風の絵で、左の人物のことばに対する右の人物の返答を書き込ませる。顔や表情は省かれている。投影法の一種(制限のある準投影法とも呼ばれる)。",
    "exam": "56-am-79(正答=P-Fスタディ。問題文「イラスト風に描かれた人物のセリフを書き込む形式の心理検査」)",
    "q": [
     "56-am-79"
    ],
    "note": "確認済み[S3][S2]。",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://tokyo-ondai.repo.nii.ac.jp/record/1442/files/111_fujita2.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.tokyomirai.ac.jp/info/research/bulletin/pdf/05/fukawa.pdf"
     }
    ]
   },
   {
    "item": "SCT(文章完成法)",
    "target": "未完成の文の続きを書く投影法",
    "value": "あらかじめ書かれた未完成の刺激文の続きを、思い浮かぶままに自由に書かせる。自己概念・対人関係・家族関係などが現れると考える。投影法の中では比較的意識に近いレベルで、集団でも実施できる。",
    "exam": "56-am-79(誤答選択肢: 人物のセリフを書き込む検査ではなく、文章の続きを書く検査)",
    "q": [
     "56-am-79"
    ],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://tk.seitoku-u.ac.jp/cms_tk_seitoku/wp-content/uploads/2024/12/%E8%81%96%E5%BE%B3%E5%A4%A7%E5%AD%A6%E5%85%AC%E8%AA%8D%E5%BF%83%E7%90%86%E5%B8%AB%E5%85%A5%E5%AD%A6%E8%AA%AC%E6%98%8E%E4%BC%9A%E6%A8%A1%E6%93%AC%E8%AC%9B%E7%BE%A9%E3%83%91%E3%83%BC%E3%82%BD%E3%83%8A%E3%83%AA%E3%83%86%E3%82%A3%E6%A4%9C%E6%9F%BB.pdf"
     }
    ]
   },
   {
    "item": "MPI(モーズレイ性格検査)",
    "target": "Eysenckの質問紙法の性格検査",
    "value": "Eysenckが作った質問紙法。下位尺度は社会的外向性(E)と神経症的傾向(N)で、各24項目。回答の妥当性をみる虚偽性尺度(L)もある。",
    "exam": "56-am-79(誤答選択肢: 質問紙法であり、セリフを書き込む形式ではない)",
    "q": [
     "56-am-79"
    ],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://tk.seitoku-u.ac.jp/cms_tk_seitoku/wp-content/uploads/2024/12/%E8%81%96%E5%BE%B3%E5%A4%A7%E5%AD%A6%E5%85%AC%E8%AA%8D%E5%BF%83%E7%90%86%E5%B8%AB%E5%85%A5%E5%AD%A6%E8%AA%AC%E6%98%8E%E4%BC%9A%E6%A8%A1%E6%93%AC%E8%AC%9B%E7%BE%A9%E3%83%91%E3%83%BC%E3%82%BD%E3%83%8A%E3%83%AA%E3%83%86%E3%82%A3%E6%A4%9C%E6%9F%BB.pdf"
     }
    ]
   },
   {
    "item": "NEO-PI-R(改訂版NEO人格目録)",
    "target": "5因子モデルの質問紙法の性格検査",
    "value": "Costa & McCraeが作った240項目の質問紙。5因子(神経症傾向・外向性・開放性・調和性・誠実性)について、各6つの側面を測る。日本版もあり、短縮版のNEO-FFIは60項目。",
    "exam": "56-am-79(誤答選択肢: 質問紙法であり、セリフを書き込む形式ではない)",
    "q": [
     "56-am-79"
    ],
    "note": "確認済み[S4]。",
    "conflict": false,
    "sources": [
     {
      "label": "S4",
      "url": "https://iwate-u.repo.nii.ac.jp/record/14511/files/arfe-v77pp55-70.pdf"
     }
    ]
   },
   {
    "item": "投影法と質問紙法の区別",
    "target": "人格検査の分類",
    "value": "質問紙法: 「はい・いいえ」などで自己評定させ、意識的・自己概念的な水準をとらえる(MPI・MMPI・YG・NEO-PI-R)。投影法: あいまいな刺激への自由な反応から、より深い特徴をとらえる(Rorschach・TAT・SCT・P-Fスタディ・バウムテスト)。",
    "exam": "57-am-35・57-am-81(バウムテスト・Rorschachは投影法。質問紙法の選択肢としては誤り)／59-am-78(描画法の選択肢)",
    "q": [
     "57-am-35",
     "57-am-81",
     "59-am-78"
    ],
    "note": "確認済み[S1][S2]。NEO-PI-Rが質問紙法である点は[S4]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://tk.seitoku-u.ac.jp/cms_tk_seitoku/wp-content/uploads/2024/12/%E8%81%96%E5%BE%B3%E5%A4%A7%E5%AD%A6%E5%85%AC%E8%AA%8D%E5%BF%83%E7%90%86%E5%B8%AB%E5%85%A5%E5%AD%A6%E8%AA%AC%E6%98%8E%E4%BC%9A%E6%A8%A1%E6%93%AC%E8%AC%9B%E7%BE%A9%E3%83%91%E3%83%BC%E3%82%BD%E3%83%8A%E3%83%AA%E3%83%86%E3%82%A3%E6%A4%9C%E6%9F%BB.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.tokyomirai.ac.jp/info/research/bulletin/pdf/05/fukawa.pdf"
     },
     {
      "label": "S4",
      "url": "https://iwate-u.repo.nii.ac.jp/record/14511/files/arfe-v77pp55-70.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
  "review": "ai"
 },
 {
  "slug": "bedrest-muscle-weakness",
  "name": "臥床による筋力低下・筋萎縮",
  "category": "リスク管理",
  "aliases": [
   "臥床による筋力低下",
   "臥床による筋",
   "筋力低下率",
   "廃用性筋萎縮",
   "廃用性筋力低下",
   "臥床と筋力"
  ],
  "rows": [
   {
    "item": "筋力低下の部位差",
    "target": "臥床で上肢と下肢のどちらの筋力が落ちやすいか",
    "value": "上肢より下肢の筋力低下が大きい。2〜3週の臥床後、最大筋力の低下は肘より膝で大きく、膝では屈曲より伸展の低下率が大きかった。先行研究(Deitrick 1948、6〜7週臥床)では、足関節背屈13.3%・底屈20.8%に対し肘関節屈曲は6.6%",
    "exam": "49-am-83(正答:上肢筋に比べ下肢筋で筋力低下が大きい)",
    "q": [
     "49-am-83"
    ],
    "note": "確認済み[S1]。誤答の「手内筋は数日で著明な筋力低下」「筋細胞膜のアセチルコリン感受性の増強」は資料で確認できず。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/jjrm1964/30/1/30_1_63/_pdf"
     }
    ]
   },
   {
    "item": "筋力低下の速さ(率)",
    "target": "臥床中の筋力低下の目安",
    "value": "安静臥床のままでは、初期に約1〜3%/日、10〜15%/週の割合で筋力が低下し、3〜5週間で約50%に低下すると言われている。24時間の安静臥床でも筋力が1〜2%低下するという報告もある",
    "exam": "49-am-83(誤答:下肢筋では1週間に50%の筋力低下=実際は1週で約10〜15%、50%は3〜5週)",
    "q": [
     "49-am-83"
    ],
    "note": "確認済み[S1][S2]。「と言われている」という概数。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.hokeniryo.metro.tokyo.lg.jp/documents/d/hokeniryo/siryou162"
     },
     {
      "label": "S2",
      "url": "https://www.jstage.jst.go.jp/article/jjrmc/62/5/62_62.474/_pdf"
     }
    ]
   },
   {
    "item": "筋の太さ(筋厚)",
    "target": "臥床後の筋の太さ",
    "value": "2〜3週の臥床後、超音波で測った筋厚は被検筋のいずれも平均で減少した(7例)。減少率は大腿直筋が最大23.4%、外側広筋が最小4.2%",
    "exam": "49-am-83(誤答:最大筋腹の太さは保たれる=実際は減少する)",
    "q": [
     "49-am-83"
    ],
    "note": "確認済み[S1]。個々には増加した例もあり、筋力低下率と筋厚減少率に有意な相関はなかった。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/jjrm1964/30/1/30_1_63/_pdf"
     }
    ]
   },
   {
    "item": "筋力を維持するのに必要な負荷",
    "target": "廃用予防の運動の強さ",
    "value": "毎日数秒間、最大張力の20〜30%の筋収縮を行えば筋力の維持が可能。30%を超える負荷で筋力は増大し、20%未満では維持できない",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.hokeniryo.metro.tokyo.lg.jp/documents/d/hokeniryo/siryou162"
     }
    ]
   },
   {
    "item": "抗重力筋に強い",
    "target": "筋萎縮が強く出る筋",
    "value": "姿勢の保持と歩行に関係する抗重力筋に強く起こりやすい(下肢・体幹の筋)",
    "exam": "54-am-49(誤答選択肢:筋萎縮は上肢に強くみられる)",
    "q": [
     "54-am-49"
    ],
    "note": "確認済み[S1]。「下肢・体幹」は抗重力筋の例としての整理。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.hokeniryo.metro.tokyo.lg.jp/documents/d/hokeniryo/siryou162"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
  "review": "ai"
 },
 {
  "slug": "bender-gestalt-test",
  "name": "Bender Gestalt test(BGT)",
  "category": "評価尺度",
  "aliases": [
   "Bender Gestalt",
   "Bender gestalt test",
   "Bender-Gestalt",
   "BGT",
   "ベンダー・ゲシュタルト",
   "ベンダーゲシュタルト",
   "視覚運動ゲシュタルト"
  ],
  "rows": [
   {
    "item": "Bender Gestalt test(BGT)の課題",
    "target": "視覚運動機能・視知覚・認知の評価",
    "value": "9つの幾何学図形を、白紙に1つずつ模写させる(運動反応の正確さ・協調性を見る)。1938年にBenderが発表した。図形は、Wertheimerが1923年にゲシュタルト知覚を示すために作った30図形から選ばれた。",
    "exam": "50-pm-80(図形を使う課題の検査名を選ぶ問題で、Bender gestalt testは誤答選択肢。正答はRey-Osterrieth complex figure test(選択肢4)。ほかの誤答はRavenの色彩マトリックス・Rey聴覚性言語学習検査・Stroopテスト)",
    "q": [
     "50-pm-80"
    ],
    "note": "確認済み[S1]。9つの図形の模写という点で、1つの複雑な図形を模写して再生するRey-Osterrieth複雑図形検査と区別する。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC12022457/"
     }
    ]
   },
   {
    "item": "Bender Gestalt testの採点・使われ方・限界",
    "target": "年齢・疾患との関係と、検査の限界",
    "value": "Koppitzの採点法(1964)では、図形の誤りに点がつき、年齢とともに得点が減って12歳ごろにほぼ0になる(子どもの視覚運動発達の目安)。認知症・アルツハイマー病などの神経変性疾患の診断に有用とする報告があり、脳卒中や頭部外傷後にも使われる。一方、感度・特異度の結果は一定せず、解釈が主観的で、文化・教育・年齢の影響を受ける。軽い認知障害には鈍いとされ、ほかの検査と併用することが勧められる。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。系統的レビューに基づく要約。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC12022457/"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
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
  "slug": "body-temperature-physiology",
  "name": "体温の測定部位・日内変動・基礎体温",
  "category": "臨床検査",
  "aliases": [
   "基礎体温",
   "腋窩温",
   "直腸温",
   "口腔温",
   "核心温度",
   "深部体温",
   "体温調節中枢",
   "体温の日内変動",
   "概日リズム",
   "サーカディアンリズム"
  ],
  "rows": [
   {
    "item": "体温の日内変動",
    "target": "体温の生理(概日リズム)",
    "value": "ヒトの体温は午後〜夕方に最も高く、明け方に最も低くなる概日リズムを示す。ノンレム睡眠時は覚醒時より低下する。女性は排卵後に約0.6℃上昇し、月経開始とともに低下する周期的変動がある。",
    "exam": "56-pm-66(体温について正しいのを2つ選ぶ。正答=「午前よりも午後にかけて高くなる」)",
    "q": [
     "56-pm-66"
    ],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://mededucation.hiroshima-u.ac.jp/pdf/download/%E4%BD%93%E6%B8%A9.pdf"
     }
    ]
   },
   {
    "item": "測定部位による違い",
    "target": "体温測定(核心温度との関係)",
    "value": "臨床的に重要なのは核心温度。体温測定には腋窩温・口腔温・直腸温を用いるが、腋窩温<口腔温<直腸温≒核心温度の関係がある。健常者でも3部位は同じ値にならない。",
    "exam": "56-pm-66(「直腸温は腋窩温よりも低い」は誤り。直腸温のほうが高い)",
    "q": [
     "56-pm-66"
    ],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://mededucation.hiroshima-u.ac.jp/pdf/download/%E4%BD%93%E6%B8%A9.pdf"
     }
    ]
   },
   {
    "item": "基礎体温",
    "target": "安静時の体温(排卵・月経周期の把握など)",
    "value": "基礎体温は安静時の体温で、毎朝ベッドから出る前に測定して記録する。専用体温計は1/10度単位で読める。",
    "exam": "56-pm-66(正答=「基礎体温は早朝覚醒安静時の体温である」)",
    "q": [
     "56-pm-66"
    ],
    "note": "確認済み[S2]。英語の患者向け資料(Healthwise)で、日本の学会資料ではない。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://myhealth.alberta.ca/Health/pages/conditions.aspx?hwid=stb117006"
     }
    ]
   },
   {
    "item": "体温調節中枢",
    "target": "体温調節の中枢(視床下部)",
    "value": "体温調節中枢の中心は視床下部の視索前野と前視床下部にある。中枢温度受容器も主に視床下部(視索前野・前視床下部)にあり、温ニューロンと冷ニューロンがある。",
    "exam": "56-pm-66(「体温調節中枢は小脳にある」は誤り)",
    "q": [
     "56-pm-66"
    ],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://mededucation.hiroshima-u.ac.jp/pdf/download/%E4%BD%93%E6%B8%A9.pdf"
     }
    ]
   },
   {
    "item": "加齢と体温",
    "target": "高齢者の平熱",
    "value": "高齢者では、皮下脂肪の減少・代謝の低下・薬剤などの加齢に伴う変化で、基礎の体温が低めになることがある(数値の記載なし)。自分の平熱を把握することが勧められる。",
    "exam": "56-pm-66(「高齢者は小児よりも高い」は誤り)",
    "q": [
     "56-pm-66"
    ],
    "note": "要注意[S3]: 一般向けの健康情報で、小児との直接比較は確認できていない。「高齢者は小児より高い」を否定する根拠としては間接的。",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://www.harvardhealth.org/healthy-aging-and-longevity/when-is-body-temperature-too-low"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "bone-joint-xray",
  "name": "骨・関節の単純X線所見(変形性膝関節症・Perthes病・橈骨遠位端骨折)",
  "category": "臨床検査",
  "aliases": [
   "単純X線",
   "単純エックス線",
   "エックス線写真",
   "X線写真",
   "X線像",
   "エックス線像",
   "変形性膝関節症",
   "関節裂隙",
   "骨硬化",
   "骨棘",
   "Kellgren-Lawrence",
   "Perthes病",
   "ペルテス病",
   "コーレス骨折",
   "橈骨遠位端骨折"
  ],
  "rows": [
   {
    "item": "変形性膝関節症のX線所見",
    "target": "画像による診断と重症度評価",
    "value": "単純X線(立位前後・側面・軸射)で、関節裂隙の狭小化・消失、軟骨下骨の骨硬化、骨棘などを認める。X線撮影が診断のゴールドスタンダード。重症度はKellgren-Lawrence(KL)分類(骨棘形成と関節裂隙狭小化で0〜4の5段階)。Rosenberg撮影は早期の裂隙狭小化の検出に有用。",
    "exam": "57-pm-31: 変形性膝関節症のX線所見で「骨硬化像がみられる」は正しい(正答に含まれる)。誤=男性に好発・膝外反変形を生じやすい。52-am-86: 「エックス線像では外側関節裂隙が狭小化している」は誤答(内側が多い)。",
    "q": [
     "57-pm-31",
     "52-am-86"
    ],
    "note": "確認済み[S1][S2]。図は未確認。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.joa.or.jp/topics/2023/files/guideline.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.joa.or.jp/public/sick/condition/osteoarthritis.html"
     }
    ]
   },
   {
    "item": "変形性膝関節症のアラインメント・関節液・性差",
    "target": "内反膝(内側型)、関節液の性状、好発",
    "value": "ほとんどが内反膝を呈する。大腿脛骨角(FTA)は内側型で増大、外側型で減少し、日本人では最も頻度が高いのは内側型。関節穿刺では、薄黄色・透明で曳糸性のある滑液が貯留する。X線で関節症を認める割合(KL2度以上)は男性42.0%、女性61.5%と報告され、女性に多い。",
    "exam": "52-am-86: 「関節液は混濁している」は誤答(実際は薄黄色・透明)。57-pm-31: 「男性に好発する」「膝外反変形を生じやすい」は誤答(女性に多く、内反が多い)。",
    "q": [
     "52-am-86",
     "57-pm-31"
    ],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.joa.or.jp/topics/2023/files/guideline.pdf"
     }
    ]
   },
   {
    "item": "Perthes病(小児の股関節痛とX線)",
    "target": "小児の大腿骨頭骨端部の壊死",
    "value": "小児の大腿骨頭壊死(骨端部が壊死)。日本整形外科学会の資料では5〜7歳の男児に多く、MSDマニュアルでは5〜10歳で最も多く男児に多い(通常は片側性)。股関節痛・大腿部痛・膝痛、跛行が主症状。診断はX線が基本で、必要に応じてMRI。初期のX線は正常か軽度の扁平化のみのことがあり、後に大腿骨頭の断片化が示される。",
    "exam": "60-pm-2: 6歳男児の右股関節痛・単純X線から疑う疾患=Perthes病(正答)。55-pm-5: 5歳女児の左股関節痛のX線から=Perthes病(正答)。誤答=大腿骨頭壊死症・大腿骨頭すべり症・単純性股関節炎・発育性股関節形成不全。",
    "q": [
     "60-pm-2",
     "55-pm-5"
    ],
    "note": "確認済み[S3][S4]。男児に多いが、55-pm-5は女児での出題。大腿骨頭すべり症などとの鑑別の詳細は今回の資料に記載がなく、書いていない。図は未確認。",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://www.joa.or.jp/public/pdf/joa_037.pdf"
     },
     {
      "label": "S4",
      "url": "https://www.msdmanuals.com/ja-jp/professional/19-小児科/小児における骨疾患/レッグ-カルベ-ペルテス病"
     }
    ]
   },
   {
    "item": "橈骨遠位端骨折(Colles骨折・Smith骨折)とフォーク状変形",
    "target": "手をついて転倒したときの手関節部の骨折",
    "value": "受傷機転=手を伸ばした状態での転倒。Colles骨折=背側転位・屈曲で、大半の症例を占め、特に高齢者に多い。尺骨茎状突起骨折を伴うことが多い。外観はフォーク状変形(silver fork・dinner fork)。Smith骨折=掌側転位で頻度が低く、受傷時に手関節が屈曲していた場合に起こる。X線は前後像・側面像で確認し、関節内骨折の評価にCTが必要なことがある。",
    "exam": "53-am-43: 手関節背屈位で手をついて転倒した症例のX線で、正答=Colles骨折。誤答=chauffeur骨折・Galeazzi骨折・Monteggia骨折・Smith骨折。",
    "q": [
     "53-am-43"
    ],
    "note": "確認済み[S5]。chauffeur・Galeazzi・Monteggia骨折の説明は同資料になく、確認できていない(Smith骨折は掌側転位なので背屈位の受傷とは合わない)。図は未確認。",
    "conflict": false,
    "sources": [
     {
      "label": "S5",
      "url": "https://www.msdmanuals.com/ja-jp/professional/22-外傷と中毒/骨折/橈骨遠位端骨折"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "bone-metastasis",
  "name": "転移性骨腫瘍(骨転移の好発部位・溶骨型と造骨型・高カルシウム血症)",
  "category": "診断基準・分類",
  "aliases": [
   "転移性骨腫瘍",
   "骨転移",
   "溶骨性転移",
   "造骨性転移",
   "溶骨型",
   "造骨型",
   "溶骨性",
   "造骨性",
   "病的骨折"
  ],
  "rows": [
   {
    "item": "骨転移の好発部位",
    "target": "骨転移の臨床像",
    "value": "転移部位は脊椎が最も多く、次いで大腿骨・骨盤・肋骨。脊椎では胸椎・腰椎に好発し、四肢の末梢骨への転移はまれ。基本的に多発性。血流の豊富な造血髄(赤色髄)の多い骨に好発し、Batson脊椎静脈叢も関与する。",
    "exam": "59-pm-94(誤答=「頭蓋骨に好発する」)",
    "q": [
     "59-pm-94"
    ],
    "note": "確認済み[S1]。好発部位として頭蓋骨は挙げられていない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jsmo.or.jp/news/jsmo/doc/20220819.pdf"
     }
    ]
   },
   {
    "item": "溶骨型と造骨型(どのがんに多いか)",
    "target": "画像・組織像の分類",
    "value": "組織像は溶骨型・造骨型・骨梁間型・混合型の4型(実際は溶骨と造骨が共存し、優位なほうで分類)。溶骨型=乳がん・肺がん・甲状腺がん・腎細胞がんなど多くのがんで、骨梁の破壊・吸収を特徴とし骨折を起こしやすい。造骨型=前立腺がんで最も多く、乳がんなどでもみられる。",
    "exam": "59-pm-94(誤答=「前立腺癌では溶骨性転移が多い」。前立腺癌は造骨型が最多)",
    "q": [
     "59-pm-94"
    ],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jsmo.or.jp/news/jsmo/doc/20220819.pdf"
     }
    ]
   },
   {
    "item": "造骨型転移と病的骨折",
    "target": "骨折リスク",
    "value": "造骨型の骨転移では骨折は生じにくいと思われがちだが、圧迫骨折による椎体の扁平化はしばしばみられる。溶骨型は骨梁の破壊のため骨折を起こしやすい。",
    "exam": "59-pm-94(正答=「造骨性の骨転移では病的骨折は少ない」)",
    "q": [
     "59-pm-94"
    ],
    "note": "確認済み[S1]。国試は溶骨型と比べた相対的な意味で「少ない」を正答とした。資料は「造骨型でも椎体の圧迫骨折はしばしばある」と注意を促しており、受け取り方に差がある。",
    "conflict": true,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jsmo.or.jp/news/jsmo/doc/20220819.pdf"
     }
    ]
   },
   {
    "item": "がんの高カルシウム血症",
    "target": "骨転移に伴う血液所見",
    "value": "がん患者の20〜30%に高カルシウム血症がみられ、多発性骨髄腫・乳がん・肺非小細胞がんで多い。骨転移がなくても起こる。骨転移に伴う場合は局所性骨溶解性高カルシウム血症(LOH)。骨転移に伴う頻度は、乳がん13%、前立腺がん1%、肺がん4%と報告されている。低カルシウム血症ではない。",
    "exam": "59-pm-94(誤答=「高率に低カルシウム血症をきたす」)",
    "q": [
     "59-pm-94"
    ],
    "note": "確認済み[S1]。高カルシウム血症は緊急対応が必要となることがある。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jsmo.or.jp/news/jsmo/doc/20220819.pdf"
     }
    ]
   },
   {
    "item": "骨転移の痛みの治療",
    "target": "疼痛管理",
    "value": "痛みは安静時痛と体動時痛を分けて評価する。安静時痛には非オピオイド鎮痛薬・オピオイド鎮痛薬を定時投与する。",
    "exam": "59-pm-94(誤答=「痛みには温熱療法が第一選択となる」)",
    "q": [
     "59-pm-94"
    ],
    "note": "確認済み[S1]。温熱療法を第一選択とする記載は、この資料では見つからなかった。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jsmo.or.jp/news/jsmo/doc/20220819.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "bragard-test",
  "name": "Bragardテスト",
  "category": "検査法・徴候",
  "aliases": [
   "Bragardテスト",
   "Bragard徴候",
   "Bragard test",
   "Bragard sign",
   "Bragard",
   "ブラガード",
   "ブラガードテスト",
   "ブラガード徴候"
  ],
  "rows": [
   {
    "item": "Bragardテスト(SLRに足関節の背屈を加える)",
    "target": "腰椎椎間板ヘルニアなどの坐骨神経・神経根の症状を誘発する(疼痛誘発テスト)",
    "value": "SLR(下肢伸展挙上)の最後に足関節の背屈を加える。背屈で、いつもの放散痛(神経根痛)が再現・増強すれば陽性。背屈を加えると、SLRで陽性になる角度が小さくなり、神経由来の症状と筋骨格由来の症状を見分ける手がかりになる。",
    "exam": "60-pm-27(「腰椎椎間板ヘルニアの疼痛誘発テストはどれか」の正答。誤答はAdson・Eichhoff・Thomsen・Yergason)／50-am-32(「股関節に屈曲拘縮がある場合に陽性」の誤答選択肢。正答はThomasテスト)",
    "q": [
     "60-pm-27",
     "50-am-32"
    ],
    "note": "確認済み[S1]。手順の定義(背屈を加えるときの角度や進め方)は一定せず、70°を超えて行ってよいかも不明とされる。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7992338"
     }
    ]
   },
   {
    "item": "SLRの陽性の目安(Bragardの前提)",
    "target": "SLRが陽性かどうかの判定",
    "value": "SLRは、股関節屈曲30〜70°の間に、坐骨神経の走行に沿って膝より下へ放散する痛みが出れば陽性とされる。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。Lasègue徴候(SLR)そのものは別カードにまとめてある。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7992338"
     }
    ]
   },
   {
    "item": "足関節背屈などを加えた「拡張SLR」",
    "target": "神経由来の症状かどうかの見分け",
    "value": "SLRで症状が出る角度で、足関節背屈(坐骨神経への張力)か股関節内旋(腰仙部神経根への張力)を加え、症状が増強したら神経由来と判断する(拡張SLR)。40人(坐骨神経痛20人・対照20人)の研究で、2人の検者の一致は高かった(κ=0.85)。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。信頼性の研究で、診断精度の研究ではない(基準となる検査なし)。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7992338"
     }
    ]
   },
   {
    "item": "修正Bragardテストの診断精度",
    "target": "電気診断で確認された腰仙部神経根障害に対する成績",
    "value": "506例の疑い例のうち、電気診断で神経根障害が確認された312例で、修正Bragardテストの感度69.3%・特異度67.42%・陽性的中率73.15%・陰性的中率63.16%(陽性尤度比2.13・陰性尤度比0.46)。SLR陰性だった114例のうち79例でBragardは陽性だった。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S2]。成績は中等度で、SLRが陰性のときの補助として有用かもしれない、という位置づけ。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5883635"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
  "review": "ai"
 },
 {
  "slug": "breathing-observation",
  "name": "呼吸の視診・努力性呼吸(呼吸補助筋・吸気時の陥凹・異常呼吸パターン)",
  "category": "検査法・徴候",
  "aliases": [
   "努力性呼吸",
   "努力呼吸",
   "呼吸補助筋",
   "呼吸補助筋活動",
   "胸鎖乳突筋",
   "斜角筋",
   "吸気時の陥凹",
   "胸骨上切痕",
   "胸骨上窩",
   "鎖骨上窩",
   "陥没呼吸",
   "奇異呼吸",
   "シーソー様呼吸",
   "下顎呼吸",
   "あえぎ呼吸",
   "起座呼吸",
   "Cheyne-Stokes呼吸",
   "チェーン・ストークス呼吸",
   "Biot呼吸",
   "呼吸パターン",
   "呼吸の視診",
   "Hoover徴候"
  ],
  "rows": [
   {
    "item": "呼吸補助筋と努力性呼吸",
    "target": "呼吸不全時の視診",
    "value": "日本呼吸療法医学会の指針では、努力性呼吸=運動時や呼吸不全時などに換気量・流量を増すために呼吸補助筋を使うもの。吸息の補助筋は胸鎖乳突筋・斜角筋・僧帽筋、呼息の補助筋は腹直筋・腹斜筋。安静呼息では視診・触診で確認できる呼吸筋活動はない。胸鎖乳突筋は体表に近く収縮を視認でき、慢性呼吸不全では常時の活動で肥大することがある。",
    "exam": "60-pm-14 問題文(頸部の呼吸補助筋活動の亢進)",
    "q": [
     "60-pm-14"
    ],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://square.umin.ac.jp/jrcm/pdf/jihatsukokyu_191024.pdf"
     }
    ]
   },
   {
    "item": "吸気時の陥凹(肋間・鎖骨上窩・胸骨上窩)",
    "target": "肺の拡張不良の所見",
    "value": "肺が十分に拡張できないと吸息時に胸腔内の陰圧が大きくなり、肋間をはじめ胸郭体表に陥凹が出る。体表と胸腔が近い鎖骨上窩・胸骨上窩の陥凹も同時に確認する。肺の拡張性が損なわれた状態で努力性の胸式吸気をすると大きな胸腔内陰圧が生じ、肋間・鎖骨上窩・胸骨上窩の陥凹を認める。",
    "exam": "60-pm-14 問題文(吸気時の胸骨上切痕および鎖骨上窩の陥凹)。正答=徒手的な胸郭可動域の拡大運動(誤答:気道吸引・上肢筋力増強・腹部引き込み動作・負荷を加えた吸気筋トレーニング)",
    "q": [
     "60-pm-14"
    ],
    "note": "確認済み[S1]。指針の用語は「陥凹」。正答の理学療法の選択理由は、この資料では確認していない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://square.umin.ac.jp/jrcm/pdf/jihatsukokyu_191024.pdf"
     }
    ]
   },
   {
    "item": "奇異呼吸・シーソー様呼吸",
    "target": "異常な呼吸パターン",
    "value": "奇異呼吸=吸気時に腹部が陥没し呼気時に突出する、自然な呼吸と逆のパターン。呼吸筋疲労や上気道閉塞で起こることがある(緩和医療学会ガイドライン)。日本呼吸療法医学会の指針は、胸部と腹部が逆方向に動く呼吸を「シーソー様呼吸」と呼び、左右胸郭が逆位相に動く場合にも奇異呼吸が使われるため同指針では用いない、としている。",
    "exam": "51-am-88 誤答選択肢(奇異呼吸)",
    "q": [
     "51-am-88"
    ],
    "note": "確認済み[S1][S2]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jspm.ne.jp/files/guideline/respira_2011/02_05.pdf"
     },
     {
      "label": "S2",
      "url": "https://square.umin.ac.jp/jrcm/pdf/jihatsukokyu_191024.pdf"
     }
    ]
   },
   {
    "item": "下顎呼吸(あえぎ呼吸)・Cheyne-Stokes呼吸・Biot呼吸",
    "target": "呼吸リズムの異常",
    "value": "呼吸リズムの異常のうち、周期的な異常=Cheyne-Stokes呼吸(中枢神経系の異常・心不全・尿毒症・オピオイド過量・終末期などでみられる)、不規則な異常=あえぎ呼吸(下顎呼吸)・失調性呼吸(Biot呼吸)で、不規則な異常は中枢神経系(特に橋・延髄レベル)の障害による。",
    "exam": "51-am-88 誤答選択肢(下顎呼吸)",
    "q": [
     "51-am-88"
    ],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jspm.ne.jp/files/guideline/respira_2011/02_05.pdf"
     }
    ]
   },
   {
    "item": "心不全と起座呼吸",
    "target": "心不全の症状",
    "value": "MSDマニュアルの表:右心不全(左心不全を伴うことが多い)の浮腫の所見として、労作時呼吸困難・起座呼吸・発作性夜間呼吸困難がみられる。",
    "exam": "51-am-88 正答=起座呼吸(心不全に特徴的な呼吸)",
    "q": [
     "51-am-88"
    ],
    "note": "確認済み[S1]。起座呼吸の定義そのものは、この資料では確認していない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/multimedia/table/浮腫の主な原因"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "bruce-protocol",
  "name": "Bruce法(多段階運動負荷試験)",
  "category": "検査法・徴候",
  "aliases": [
   "Bruce法",
   "ブルース法",
   "多段階運動負荷試験",
   "多段階負荷試験",
   "トレッドミル負荷試験",
   "トレッドミル運動負荷試験",
   "ランプ負荷法",
   "シャトルウォーキングテスト"
  ],
  "rows": [
   {
    "item": "Bruce法の概要",
    "target": "運動負荷量を段階的に増やす負荷試験",
    "value": "トレッドミルの速度と傾斜を約3分ごとに段階的に上げていく多段階の運動負荷試験(最も頻用されるプロトコル)。年齢別の最大予測心拍数の85%(目標心拍数)に達するか、症状が出るまで行う",
    "exam": "50-pm-46(正答:Bruce法=運動負荷量を段階的に増加させる評価法。誤答:踏み台昇降テスト・12分間歩行テスト・ハンドグリップテスト・マスターシングルテスト)／54-am-23(誤答選択肢:Bruce法=多段階であり、設問の「固定負荷」ではない)",
    "q": [
     "50-pm-46",
     "54-am-23"
    ],
    "note": "確認済み[S1][S2]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/04-心血管疾患/心血管系に関する検査および手技/負荷試験"
     },
     {
      "label": "S2",
      "url": "https://kasumigaura.hosp.go.jp/files/000218709.pdf"
     }
    ]
   },
   {
    "item": "Bruce法の段階(標準法)",
    "target": "7段階・各3分のトレッドミル",
    "value": "各段階3分。段階1:1.7mph(2.7km/h)・傾斜10%／2:2.5mph(4.0km/h)・12%／3:3.4mph(5.5km/h)・14%／4:4.2mph(6.8km/h)・16%／5:5.0mph(8.0km/h)・18%／6:5.5mph(8.9km/h)・20%／7:6.0mph(9.7km/h)・22%",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "二次資料[S1]の表(ACSM・AHA 2013を引用)。国試で数値は問われていない。METsは資料ごとに値が異なるため載せない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://en.wikipedia.org/wiki/Bruce_protocol"
     }
    ]
   },
   {
    "item": "運動負荷試験の目的",
    "target": "Bruce法などの運動負荷(トレッドミル)",
    "value": "運動で心筋酸素需要を増やして虚血を誘発する。薬物負荷よりも運動負荷のほうが望ましいとされる",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/04-心血管疾患/心血管系に関する検査および手技/負荷試験"
     }
    ]
   },
   {
    "item": "マスター2階段試験",
    "target": "Bruce法とは別の負荷試験",
    "value": "マスター2階段試験は、負荷量が少なく感度が低い・運動中の心電図モニターができない、が問題点。一方で多人数を短時間で行えるため総合検診では行われる。Bruce法のようなトレッドミルや自転車エルゴメータの多段階負荷試験とは別に扱われている",
    "exam": "50-pm-46(誤答選択肢:マスターシングルテスト)／54-am-23(正答:マスターシングルテスト=固定負荷)",
    "q": [
     "50-pm-46",
     "54-am-23"
    ],
    "note": "確認済み[S1]。資料に「固定負荷」という語は出てこないため、固定負荷との対応は設問側の整理。マスターシングルテストはマスター2階段試験の一種として整理される(本文での直接記載は未確認)。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/jjcdp1974/29/1/29_1_39/_pdf"
     }
    ]
   },
   {
    "item": "運動負荷試験の方法(3種)",
    "target": "心血管疾患の運動負荷試験の方法",
    "value": "マスター2階段試験、自転車エルゴメータ、トレッドミルの3つ。医療機関での冠動脈疾患の診断にはトレッドミルが主に使われるようになっている。スクリーニング用にBruce法の第1段階を省略して第2段階から始める方法も提案されている",
    "exam": "50-pm-46(選択肢の比較)",
    "q": [
     "50-pm-46"
    ],
    "note": "確認済み[S1]。1994年の解説。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/jjcdp1974/29/1/29_1_39/_pdf"
     }
    ]
   },
   {
    "item": "ランプ負荷・シャトルウォーキング",
    "target": "漸増負荷の運動耐容能評価",
    "value": "ランプ負荷=直線的に漸増するトレッドミルなどの負荷(CPXで用いる)。シャトルウォーキング試験=多段階漸増の最大運動負荷試験。6分間歩行試験=6分間歩行距離を測る最大運動負荷試験",
    "exam": "54-am-23(誤答選択肢:ランプ負荷法・シャトルウォーキングテスト・6分間歩行テスト)",
    "q": [
     "54-am-23"
    ],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2021/03/JCS2021_Makita.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
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
  "slug": "canadian-hip-prosthesis",
  "name": "カナダ式股義足(股関節離断用義足)",
  "category": "検査法・徴候",
  "aliases": [
   "カナダ式股義足",
   "カナダ式",
   "股義足",
   "股関節離断",
   "股離断",
   "股継手",
   "股屈曲制限バンド",
   "ヒップディスアーティキュレーション"
  ],
  "rows": [
   {
    "item": "股継手の位置と角度",
    "target": "カナダ式股義足の構造(安定性)",
    "value": "股継手はソケットの前下方に取り付ける(固定式・遊動式がある)。正常な股関節軸に対して45°前下方に付けると、立位で義足に体重をかけるだけで股継手を伸展させる力が働き、安定する。",
    "exam": "50-pm-37(誤答:「股継手を正常股関節軸より45°前上方につける」→前下方が正しい)",
    "q": [
     "50-pm-37"
    ],
    "note": "確認済み[S1][S2][S3]。角度は国試解説サイト[S1]と義肢装具士向けサイト[S2](片側骨盤切除用の記載)で一致。国試の正答と一致。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://asitahe.com/50rigaku36-40national-examanation-pm/"
     },
     {
      "label": "S2",
      "url": "https://postudent.com/hip_prosthesis/4/"
     },
     {
      "label": "S3",
      "url": "https://www.kousaikai.or.jp/support/knowledge/g-prosthetichand/g-prostheticleg/"
     }
    ]
   },
   {
    "item": "ソケットの形と固定・懸垂",
    "target": "カナダ式股義足のソケット",
    "value": "断端から骨盤までのヒップ全体を包み、義足の安定と懸垂を図る(骨盤全体をソケットで固定するので自己懸垂力がある)。国試の解説では、固定は両側腸骨稜上部と坐骨の3点、懸垂は切断対側の腸骨稜で行うとされる。",
    "exam": "50-pm-37(正答側の選択肢:ソケットの固定を両側腸骨稜の上部と坐骨の3点で行う／ソケットの懸垂を切断対側の腸骨稜で行う)",
    "q": [
     "50-pm-37"
    ],
    "note": "確認済み[S1][S3]。3点固定・対側腸骨稜の懸垂は国試解説サイト[S1]の記載で、公的資料[S3]では「骨盤を包み、安定と懸垂」までを確認した。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://asitahe.com/50rigaku36-40national-examanation-pm/"
     },
     {
      "label": "S3",
      "url": "https://www.kousaikai.or.jp/support/knowledge/g-prosthetichand/g-prostheticleg/"
     }
    ]
   },
   {
    "item": "荷重線(ベンチアライメント)",
    "target": "殻構造の股義足のアライメント",
    "value": "矢状面で、股継手と膝継手を通る直線が踵の後方25〜40mmに落ちる。膝継手中心を通る垂直線は、トゥブレークと踵を結ぶ線の中間を通る。前額面では左右の機械軸が正中線に対して対称。",
    "exam": "50-pm-37(正答側の選択肢:股継手と膝継手を通る線が踵の25〜40mm後方を通る)",
    "q": [
     "50-pm-37"
    ],
    "note": "確認済み[S1][S2]。国試の記述と一致。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://asitahe.com/50rigaku36-40national-examanation-pm/"
     },
     {
      "label": "S2",
      "url": "https://postudent.com/hip_prosthesis/4/"
     }
    ]
   },
   {
    "item": "適応・膝継手",
    "target": "カナダ式股義足の使われ方",
    "value": "適応は股関節離断。膝継手の基本構造は大腿義足と同じだが、安定性の高いものが使われる。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S3]。「股屈曲制限バンド」の記載は、確認できた資料がないため載せていない(国試[50-pm-37]では正しい選択肢として出た)。",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://www.kousaikai.or.jp/support/knowledge/g-prosthetichand/g-prostheticleg/"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
  "review": "ai"
 },
 {
  "slug": "cancer-fatigue-scale",
  "name": "Cancer Fatigue Scale(CFS)",
  "category": "評価尺度",
  "aliases": [
   "Cancer Fatigue Scale",
   "cancer fatigue scale",
   "がん倦怠感尺度",
   "がん関連疲労",
   "がん患者の倦怠感",
   "倦怠感の評価",
   "Brief Fatigue Inventory",
   "簡易倦怠感尺度"
  ],
  "rows": [
   {
    "item": "CFSの概要",
    "target": "がん患者の多次元的な倦怠感(だるさ)の評価",
    "value": "自己記入式の質問票。15項目、1(いいえ)〜5(とても)の5段階で、約2分で記入できる。身体的・精神的・認知的の3つの次元の倦怠感を評価する",
    "exam": "59-am-20(誤答選択肢:CFS。問いは乳癌周術期の「活動能力の評価方法」で、正答はKPS。CFSは倦怠感の評価で活動能力の評価ではない)",
    "q": [
     "59-am-20"
    ],
    "note": "確認済み[S1]。国立がんセンター(現・国立がん研究センター)精神腫瘍学研究部の資料。活動能力の評価(KPS・ECOG PS)は別カード",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pod.ncc.go.jp/jp/epoc/division/psycho_oncology/kashiwa/020/030/CDS_CFS_info.pdf"
     }
    ]
   },
   {
    "item": "開発と信頼性・妥当性",
    "target": "原著",
    "value": "奥山らが日本で開発(2000年)。因子分析で15項目・3下位尺度(身体・精神・認知)に整理し、307名のがん患者で検証した。全15項目の内的整合性(クロンバックα)0.88、倦怠感のVASとの相関 r=0.67、再テスト信頼性は平均 r=0.69",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S2]。PubMedの要旨で確認",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://pubmed.ncbi.nlm.nih.gov/10687321/"
     }
    ]
   },
   {
    "item": "倦怠感の定義と頻度",
    "target": "CFSが測る症状",
    "value": "倦怠感は、身体的・精神的な消耗を含む衰弱として特徴づけられる主観的な症状。終末期に限らず経過のあらゆる時期や、手術・化学療法・放射線療法・造血幹細胞移植に伴って現れ、頻度は30〜80%とされる",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pod.ncc.go.jp/jp/epoc/division/psycho_oncology/kashiwa/020/030/CDS_CFS_info.pdf"
     }
    ]
   },
   {
    "item": "使用時の注意",
    "target": "自己記入式の限界",
    "value": "全身状態が重い場合や、せん妄・認知症などの認知障害で回答の信頼性に問題がある場合がある。質問票の内容や状況によっては患者がストレスを感じることもあり、身体的・心理的な状態への配慮が要る",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pod.ncc.go.jp/jp/epoc/division/psycho_oncology/kashiwa/020/030/CDS_CFS_info.pdf"
     }
    ]
   },
   {
    "item": "Brief Fatigue Inventory(BFI)との違い",
    "target": "がんの倦怠感の別の尺度",
    "value": "BFIは米国のCleelandらが開発した簡便な質問票。10項目(倦怠感の有無1・強さ3・生活への支障6)で、「この24時間の」状態を答える。9つの0〜10の数値評価の平均を総合的倦怠感スコアとし、著者らは1〜3を軽症、4〜6を中等症、7〜10を重症と定義するのが適切とした。CFSは日本で開発され、3次元を評価できる点が特徴",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S3]。国立がん研究センターの日本語版BFIの説明資料",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://pod.ncc.go.jp/jp/epoc/division/psycho_oncology/kashiwa/020/030/BFI.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
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
  "slug": "cardiothoracic-ratio",
  "name": "心胸郭比(CTR)",
  "category": "臨床検査",
  "aliases": [
   "心胸郭比",
   "心胸比",
   "CTR",
   "心拡大",
   "Cardiothoracic ratio"
  ],
  "rows": [
   {
    "item": "うっ血性心不全と心胸郭比",
    "target": "胸部X線での心拡大の判定",
    "value": "うっ血性心不全では胸部X線で心拡大や肺うっ血がみられる。心拡大の目安は、後前方向(PA)撮影で心胸郭比0.5(50%)以上。",
    "exam": "52-am-36(うっ血性心不全でみられるのはどれか。正答は咳嗽。誤答選択肢の「心胸郭比40%」は50%未満で、心拡大の基準を満たさない)",
    "q": [
     "52-am-36"
    ],
    "note": "確認済み[S1][S2]。50%は目安で、撮影条件や体格で変わる。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.mhlw.go.jp/topics/2006/11/dl/tp1122-1k05.pdf"
     },
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC12499798"
     }
    ]
   },
   {
    "item": "心胸郭比の測り方",
    "target": "定義",
    "value": "胸部X線正面像で、心臓の最大横径を胸郭の最大内横径で割った値(心臓の幅/肺の幅の割合)。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S2][S3]",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC12499798"
     },
     {
      "label": "S3",
      "url": "https://www.hosp.tohoku.ac.jp/wp-content/uploads/2023/10/nochioka_press.pdf"
     }
    ]
   },
   {
    "item": "撮影条件による違い",
    "target": "PA像とAP像",
    "value": "測定は後前方向(PA)撮影が望ましい。前後方向(AP)撮影では心陰影が大きく写り、比が大きくなりやすい。呼吸の状態や患者の回旋でも値は変わる。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S2]",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC12499798"
     }
    ]
   },
   {
    "item": "経時変化と心不全の発症",
    "target": "心不全の発症予測(研究)",
    "value": "東北大学の研究(ステージB心不全の登録患者5,126名)では、登録時の心胸郭比が53%を超え、かつ年に0.5%ずつ上昇する人が、後に心不全を発症しやすかった。発症しなかった群は平均50%で、年0.1%程度の増加。心胸郭比と心エコーの左室拡張末期径との相関は低い。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S3]。1回の値より、年単位の変化を見る研究結果。",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://www.hosp.tohoku.ac.jp/wp-content/uploads/2023/10/nochioka_press.pdf"
     }
    ]
   },
   {
    "item": "心胸郭比が小さくなる例(神経性やせ症)",
    "target": "低栄養での心臓の変化",
    "value": "神経性やせ症の胸部X線所見として、心胸郭比の低下がある(心エコーでは心嚢液貯留・僧帽弁逸脱など)。",
    "exam": "出題は直接なし(参考。58-pm-100は神経性やせ症の検査所見の設問)",
    "q": [],
    "note": "確認済み[S4]",
    "conflict": false,
    "sources": [
     {
      "label": "S4",
      "url": "https://dept.dokkyomed.ac.jp/dep-m/edsupport/resources/medical_cooperation_03.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
  "review": "ai"
 },
 {
  "slug": "categorical-survival-tests",
  "name": "カイ二乗検定・Fisherの正確確率検定・log-rank検定",
  "category": "診断基準・分類",
  "aliases": [
   "カイ二乗検定",
   "カイ2乗検定",
   "χ2検定",
   "Fisherの正確確率検定",
   "Fisherの正確検定",
   "フィッシャーの正確検定",
   "log-rank検定",
   "ログランク検定",
   "Kaplan-Meier",
   "生存曲線",
   "カテゴリ変数",
   "期待度数",
   "2値変数"
  ],
  "rows": [
   {
    "item": "カテゴリ(2値)データの割合の比較: カイ二乗検定とFisherの正確確率検定",
    "target": "病気・死亡などイベントの有無(2値変数)の発生割合が群間で異なるかの検定",
    "value": "総症例数が40例以上ならカイ二乗検定、20例未満ならFisherの正確確率検定が勧められる。20〜39例のときは、「群間で差がない」と仮定した場合の期待値(イベントあり・なしの期待人数)が各群5人以上ならカイ二乗検定を用いる。",
    "exam": "55-pm-21: 対応のない正規分布の連続変数の2群間の差の検定では、Studentのt検定が正答。Fisherの正確確率検定は誤答選択肢(カテゴリデータの検定)。",
    "q": [
     "55-pm-21"
    ],
    "note": "確認済み[S1]。連続変数の平均値の比較にはt検定や順位検定を使う(カテゴリの割合の検定とは別)。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.amed.go.jp/content/000034160.pdf"
     }
    ]
   },
   {
    "item": "生存時間の比較: log-rank検定",
    "target": "Kaplan-Meier法の生存曲線(累積生存割合)を群間で比べる",
    "value": "Kaplan-Meier曲線の群間比較にlog-rank検定を用いる。P値が有意水準(5%)を下回れば、2群の生存時間曲線に統計的な有意差があると判断する。打ち切り例(追跡が途切れた例)はその後の分母から除いて計算する。",
    "exam": "55-pm-21: 誤答選択肢「log-rank検定」(連続変数の2群の平均値の比較ではなく、生存時間の比較に使う)。",
    "q": [
     "55-pm-21"
    ],
    "note": "確認済み[S2]。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.amed.go.jp/content/000048641.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "center-of-pressure-sway",
  "name": "重心動揺検査(足圧中心の動揺・開眼/閉眼・前後/左右)",
  "category": "臨床検査",
  "aliases": [
   "重心動揺検査",
   "重心動揺計",
   "重心動揺",
   "身体動揺",
   "動揺面積",
   "外周面積",
   "総軌跡長",
   "単位軌跡長",
   "実効値面積",
   "ロンベルグ率",
   "スタビロメトリー",
   "足圧中心",
   "開脚立位",
   "静止立位"
  ],
  "rows": [
   {
    "item": "前後方向と左右方向の動揺の大きさ",
    "target": "静止立位での動揺の方向差",
    "value": "健常成人14名(ロンベルグ立位)では、総移動距離は開眼・閉眼とも前後方向(Y軸)が左右方向(X軸)より長く(開眼 前後50.9cm・左右47.2cm、閉眼 前後58.5cm・左右53.2cm)、平均速度も前後が左右より有意に大きい。開脚立位では閉脚より左右が安定するため、前後方向の単位軌跡長が増えると推察されている。",
    "exam": "52-pm-74(誤答:「重心動揺は左右より前後方向が小さい」→前後方向のほうが大きい。正答は「腓腹筋は持続的に活動している」)",
    "q": [
     "52-pm-74"
    ],
    "note": "確認済み[S1][S2]。国試の判定(前後が小さいは誤り)と矛盾しない。数値は機種・条件で変わるため、他の研究の値と直接比べない。加齢では左右方向の動揺が増えるとする報告もある[S2]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://nagasaki-u.repo.nii.ac.jp/record/19124/files/iryou03_00_14_t.pdf"
     },
     {
      "label": "S2",
      "url": "https://nagasaki-u.repo.nii.ac.jp/record/19052/files/igaku17_02_07_t.pdf"
     }
    ]
   },
   {
    "item": "開眼と閉眼の違い",
    "target": "視覚の影響(ロンベルグ立位)",
    "value": "閉眼で動揺は増える。健常成人14名で、軌跡面積は開眼2.19±0.71cm²→閉眼3.12±1.55cm²(5%水準で有意に増加)、総移動距離も開眼より閉眼で長い(1%水準で有意)。開眼と閉眼の差を見る指標としてロンベルグ率(外周面積・総軌跡長)が使われる。",
    "exam": "49-am-73(誤答:「重心動揺は閉眼で減少する」→閉眼で増加)",
    "q": [
     "49-am-73"
    ],
    "note": "確認済み[S1][S3]。若年健常者14名の報告で、範囲は限られる。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://nagasaki-u.repo.nii.ac.jp/record/19124/files/iryou03_00_14_t.pdf"
     },
     {
      "label": "S3",
      "url": "https://www.jstage.jst.go.jp/article/jser/80/3/80_167/_article/-char/ja"
     }
    ]
   },
   {
    "item": "加齢による変化",
    "target": "年齢と動揺面積・動揺距離",
    "value": "動揺面積は6〜20代で年齢とともに減り、20代で最も安定し、50代まで少しずつ増え、それ以降は急に増える(臼井の報告を[S2]が引用)。60歳以上では動揺距離が延び、左右方向の動揺が増える傾向がある。中高年(平均63.6歳)は若年者より前後方向の単位軌跡長が大きかった(開脚立位・30秒)。",
    "exam": "49-am-73(誤答:「年齢で変化しない」)",
    "q": [
     "49-am-73"
    ],
    "note": "確認済み[S2](加齢の経過は他の報告の引用であり、二次的な確認)。第51回で出題された「老年期には加齢に伴い面積が増大する(正)」とも矛盾しない。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://nagasaki-u.repo.nii.ac.jp/record/19052/files/igaku17_02_07_t.pdf"
     }
    ]
   },
   {
    "item": "解析項目と測定条件・基準値案(100Hz)",
    "target": "重心動揺検査の解析項目",
    "value": "解析項目:外周面積・実効値面積・矩形面積・総軌跡長・単位軌跡長・単位面積軌跡長・動揺中心変位(左右・前後)・ロンベルグ率(外周面積・総軌跡長)の10項目。開眼60秒の後に閉眼60秒を測定。健常365名(20代〜80歳以上)の基準値案は「平均±2SD」と「5・95パーセンタイル」を併用する案で、男女共通で使える可能性があるとされた。",
    "exam": "49-pm-48(静止立位の身体動揺面積:値の大小と良否に関する選択肢)",
    "q": [
     "49-pm-48"
    ],
    "note": "確認済み[S3]。基準値は機種・サンプリング周波数に依存する「案」で、診断の閾値ではない。面積が大きいほど不良かどうかの記述は確認できた資料に直接なく、載せていない。",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://www.jstage.jst.go.jp/article/jser/80/3/80_167/_article/-char/ja"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
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
   "筋緊張低下",
   "小脳半球梗塞",
   "小脳梗塞"
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
  "slug": "chest-imaging-xray-ct",
  "name": "胸部X線・胸部CTの所見(COPD・胸水・間質性肺炎)",
  "category": "臨床検査",
  "aliases": [
   "胸部X線",
   "胸部エックス線",
   "胸部単純X線",
   "胸部エックス線写真",
   "胸部CT",
   "肺気腫",
   "低吸収領域",
   "LAA",
   "肺野の透過性亢進",
   "横隔膜の平低化",
   "胸水",
   "蜂巣肺",
   "すりガラス陰影",
   "間質性肺炎",
   "間質性肺疾患",
   "エックス線単純写真",
   "冠状断CT"
  ],
  "rows": [
   {
    "item": "COPDの胸部単純X線所見",
    "target": "肺気腫による肺の過膨張の反映",
    "value": "肺野の透過性亢進／肺野末梢血管影の狭小化／心胸比(CTR)の減少／肋間の開大／横隔膜の平低化／胸骨後腔・心臓後腔の拡大(側面像)。主に肺気腫病変による肺の過膨張を反映した所見。",
    "exam": "53-pm-95: COPDの胸部X線写真で認める所見=肺野の透過性亢進(正答)。誤答=横隔膜挙上・心陰影拡大・肋間腔の狭小化・シルエットサイン。",
    "q": [
     "53-pm-95"
    ],
    "note": "確認済み[S1]。誤答の3つは逆向きの所見(横隔膜は平低化、心陰影は縮小=CTR減少、肋間は開大)。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/naika/101/6/101_1549/_pdf"
     }
    ]
   },
   {
    "item": "肺気腫の胸部CT所見と、呼吸機能への影響",
    "target": "気腫病変の画像評価と、そこから予想される変化",
    "value": "肺気腫は、CTで肺野の低吸収領域(LAA)として見える。小さな病変を見落とさないため、スライス厚2〜3mm以下の薄い画像が必要。気腫病変を定量する閾値には−950HUや−960HUが使われる。CTは単純X線よりX線被曝がはるかに多い。閉塞性障害では1秒率が70%未満となり、FRC・残気量は増大、肺コンプライアンスは上昇する。",
    "exam": "51-am-17: 80歳男性の胸部CT(図・肺気腫)から予想されるのは1秒率の低下(正答)。誤答=肥満・残気量の低下・気道抵抗の低下・肺コンプライアンスの低下。",
    "q": [
     "51-am-17"
    ],
    "note": "確認済み[S1][S2][S3]。誤答のうち、残気量は気腫(閉塞性)で増大[S2]、肺コンプライアンスは肺気腫で上昇[S3]なので、「低下」は誤り。気道抵抗・肥満は今回確認できていない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/naika/101/6/101_1549/_pdf"
     },
     {
      "label": "S2",
      "url": "https://www.aichi-amt.or.jp/aamt/wp-content/uploads/2024/03/aicc-guide-19.lung_function.pdf"
     },
     {
      "label": "S3",
      "url": "https://www.kango-roo.com/learning/2327/"
     }
    ]
   },
   {
    "item": "胸水の画像検出と原因",
    "target": "胸水が見える量と、漏出性・滲出性の違い",
    "value": "通常の胸部X線で胸水が分かるのは約150mL以上たまった場合。胸部CTでは少量でも分かる。漏出性胸水(非炎症性)=心不全・肝硬変・ネフローゼ症候群・腎不全など肺以外の原因が多く、通常は両側。滲出性胸水(炎症や胸膜の病気)=感染(細菌・結核)・肺癌や悪性胸膜中皮腫などの腫瘍・関節リウマチなどの膠原病で、通常は片側。",
    "exam": "51-pm-95: 胸部CT(別冊)の矢印の所見=胸水(正答)。誤答=肺炎・肺癌・肺塞栓・心嚢液貯留。",
    "q": [
     "51-pm-95"
    ],
    "note": "確認済み[S4]。図は未確認。X線の側臥位撮影などの手技は、今回の資料では確認できていない。",
    "conflict": false,
    "sources": [
     {
      "label": "S4",
      "url": "https://www.jrs.or.jp/citizen/faq/q25.html"
     }
    ]
   },
   {
    "item": "間質性肺炎(特発性間質性肺炎)の画像・呼吸機能",
    "target": "拘束性障害と、X線・HRCTの特徴的所見",
    "value": "呼吸機能: %VC<80%(拘束性障害)、%DLCO<80%(拡散障害)。胸部X線: 両側びまん性陰影・中下肺野で外側優位・肺野の縮小(1を含む2項目以上で陽性)。HRCT(病理診断がない特発性肺線維症の場合): 胸膜直下の陰影分布と蜂巣肺が必須。ほかに牽引性気管支・細気管支拡張、すりガラス陰影、浸潤影(病型により異なる)。",
    "exam": "59-am-19: 73歳女性の胸部単純X線(図)から間質性肺疾患(正答)。誤答=気胸・気管切開術後・肺葉切除術後・COPD。59-pm-41: 間質性肺疾患で胸部X線写真で線維化(正答)。「閉塞性換気障害を呈する」は誤り(拘束性)。",
    "q": [
     "59-am-19",
     "59-pm-41"
    ],
    "note": "確認済み[S5](診断基準の記述)。59-pm-41の「線維化」は診断基準に直接の語はなく、びまん性陰影・蜂巣肺などの所見から。図は未確認。",
    "conflict": false,
    "sources": [
     {
      "label": "S5",
      "url": "https://www.nanbyou.or.jp/wp-content/uploads/upload_files/File/085-201804-kijyun.pdf"
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
  "slug": "correlation-analysis",
  "name": "相関分析(Pearson・Spearmanの相関係数)",
  "category": "診断基準・分類",
  "aliases": [
   "相関分析",
   "相関係数",
   "Pearsonの相関係数",
   "ピアソンの相関係数",
   "Spearmanの順位相関係数",
   "スピアマンの相関係数",
   "順位相関",
   "散布図",
   "関連の強さ"
  ],
  "rows": [
   {
    "item": "相関分析が答える問い(差の検定との違い)",
    "target": "2つの変数の間に関係があるか、どの程度かを見る分析",
    "value": "2群のアウトカムの差を比べるなら、t検定などの「差の検定」。1群のデータで、2つの変数の関係の有無(例: コレステロール値が上がれば血圧も上がるか)を見たいときは、相関に関する検定を用いる。連続変数どうしの組み合わせでは、相関係数(Pearson、Spearman)を使う。",
    "exam": "56-pm-22: 相関分析は選択肢の1つ(誤答)。「関連の強さ」を見る分析で、対応なし3群の差は分散分析、対応あり2群はPaired-t検定、対応なし2群のノンパラメトリックはMann-WhitneyのU検定、というように問われた。50-pm-49(第50回)でも「関連の強さの分析」が選択肢に出た。",
    "q": [
     "56-pm-22",
     "50-pm-49"
    ],
    "note": "確認済み[S1][S2]。群間の差を問う設問に相関分析は当たらない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.amed.go.jp/content/000034160.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.fmu.ac.jp/gendeqsp/data/file/manual_statistics_01.pdf"
     }
    ]
   },
   {
    "item": "PearsonとSpearmanの相関の検定",
    "target": "2つの連続変数の相関を調べる代表的な方法",
    "value": "2つの連続変数の相関を調べる検定には、Pearsonの相関係数の検定とSpearmanの相関係数の検定がある。同じデータでも、どちらを使うかでP値が大きく変わることがある(教材の例: Pearson P=0.54、Spearman P<0.0001)。両方行って望ましい結果だけを採用してはならず、使う検定は計画書で事前に決める。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。どちらを使うかの条件(正規性など)は、今回の資料では明記が確認できず、書いていない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.amed.go.jp/content/000034160.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
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
  "slug": "crps",
  "name": "複合性局所疼痛症候群(CRPS)・肩手症候群",
  "category": "診断基準・分類",
  "aliases": [
   "CRPS",
   "複合性局所疼痛症候群",
   "肩手症候群",
   "反射性交感神経性ジストロフィー",
   "RSD",
   "カウザルギー",
   "Sudeck骨萎縮",
   "ズデック骨萎縮",
   "Sudeck萎縮",
   "CRPS type I",
   "CRPS type II",
   "complex regional pain syndrome"
  ],
  "rows": [
   {
    "item": "CRPS type I と type II の区別",
    "target": "CRPSの分類(神経損傷の有無)",
    "value": "神経損傷が明らかでないもの=type I(従来の反射性交感神経性ジストロフィー)／末梢神経損傷が明らかなもの=type II(従来のカウザルギー)。肩手症候群・RSD・カウザルギーなどの呼び名は、国際疼痛学会が複合性局所疼痛症候群(CRPS)に統一した",
    "exam": "58-pm-89(type Iに分類されるものを2つ。正答=肩手症候群・Sudeck骨萎縮／誤答=幻肢痛・視床痛・帯状疱疹後神経痛)／56-pm-25(正答=type IIは末梢神経損傷を伴う〈伝導検査異常〉)／第51回(CRPSに関連=Sudeck骨萎縮が正答。誤答=Dupuytren拘縮・Volkmann拘縮・無腐性壊死・異所性骨化)",
    "q": [
     "58-pm-89",
     "56-pm-25"
    ],
    "note": "確認済み[S1][S3]。両型の区別は臨床的意義が乏しいとする記載もある[S3]。Sudeck骨萎縮がtype Iにのみ当たるかは資料で断定できず、国試の整理(type I)に従った",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://jspc.gr.jp/Contents/public/pdf/shishin/6-12.pdf"
     },
     {
      "label": "S3",
      "url": "https://www.jstage.jst.go.jp/article/jjrmc/53/8/53_610/_pdf"
     }
    ]
   },
   {
    "item": "CRPSの症状の特徴(痛覚過敏・アロディニア・浮腫・発汗・皮膚温)",
    "target": "CRPSにみられる症状と、合致しない所見",
    "value": "疼痛=灼熱痛・アロディニア・痛覚過敏／腫脹=浮腫／自律神経症状=皮膚温・皮膚色調の変化(上昇も低下もある)・発汗異常／運動障害=筋力低下・関節拘縮・振戦・ジストニア／その他=毛・爪の成長障害、皮膚萎縮。痛みは原因の傷害に不釣り合いに強い。痛覚鈍麻は症状として挙がっていない",
    "exam": "52-am-11(正答=痛覚鈍麻は合致しない／誤答=浮腫・発汗異常・アロディニア・皮膚温の変化)／56-pm-25(誤答=痛覚過敏・発汗異常・皮膚温異常は両型にみられる)",
    "q": [
     "52-am-11",
     "56-pm-25"
    ],
    "note": "確認済み[S3][S5]。痛覚鈍麻が『ない』ことは、資料の症状表に載っていないことからの判断",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://www.jstage.jst.go.jp/article/jjrmc/53/8/53_610/_pdf"
     },
     {
      "label": "S5",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-神経疾患/疼痛/複合性局所疼痛症候群-crps"
     }
    ]
   },
   {
    "item": "脳卒中後の肩手症候群(発症しやすい人・時期・症状)",
    "target": "脳卒中後のCRPS(患側上肢)",
    "value": "症状=患側の手指・手背を中心に痛み・腫れ・熱感・色調変化。発症は脳卒中後おおむね2週〜3か月との報告。リスク=肩関節亜脱臼・痙縮・Brunnstrom手指ステージが低い(麻痺が重い)・Barthel indexが低い・女性・左片麻痺(メタ解析)",
    "exam": "第49回(49-pm-25。正答=麻痺が重度の場合に発症しやすい／誤答=患側の手に冷感・星状神経節ブロックは無効・発症後3週以内に生じやすい・自動的ROM運動は症状を悪化)",
    "q": [
     "49-pm-25"
    ],
    "note": "確認済み[S2][S6]。『冷感』は誤り(熱感が記載)。『3週以内に生じやすい』『自動ROM運動で悪化』は、本文で裏づけを確認できなかった",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.jstage.jst.go.jp/article/jnkm/5/1/5_09/_article/-char/en"
     },
     {
      "label": "S6",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC8622266/"
     }
    ]
   },
   {
    "item": "星状神経節ブロック・交感神経ブロック",
    "target": "CRPSの治療(神経ブロック)",
    "value": "星状神経節ブロックは発症早期の上肢CRPSに有効とする報告がある。胸部交感神経節ブロックは上肢CRPSに有効で早期施行が推奨。グアネチジンなどの交感神経遮断薬の投与は有効でない",
    "exam": "49-pm-25(誤答選択肢『星状神経節ブロックは無効』)",
    "q": [
     "49-pm-25"
    ],
    "note": "確認済み[S1]。ただし脳卒中後の肩手症候群では『確立した治療はなく、星状神経節ブロックなども十分な効果は得られていない』との記載もある[S2]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://jspc.gr.jp/Contents/public/pdf/shishin/6-12.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.jstage.jst.go.jp/article/jnkm/5/1/5_09/_article/-char/en"
     }
    ]
   },
   {
    "item": "骨萎縮(Sudeck骨萎縮)・X線所見",
    "target": "CRPSの骨病変",
    "value": "単純X線の骨萎縮像は、CRPSの他覚的所見として有用。組織損傷後の骨病変として、Sudeck骨萎縮が歴史的に知られる。骨萎縮・脱灰は外傷後の非CRPS患者にもみられ、単独では非特異的",
    "exam": "58-pm-89(正答の1つ=Sudeck骨萎縮)／56-pm-25(誤答=骨萎縮は両型にみられる)／第51回(Sudeck骨萎縮が正答)",
    "q": [
     "58-pm-89",
     "56-pm-25"
    ],
    "note": "確認済み[S3][S4][S5]。骨萎縮が両型に等しくみられるかは、資料で直接は確認できなかった",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://www.jstage.jst.go.jp/article/jjrmc/53/8/53_610/_pdf"
     },
     {
      "label": "S4",
      "url": "https://www.jstage.jst.go.jp/article/jjspc1994/10/2/10_2_127/_article/-char/ja/"
     },
     {
      "label": "S5",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-神経疾患/疼痛/複合性局所疼痛症候群-crps"
     }
    ]
   },
   {
    "item": "2008年 厚生労働省研究班の判定指標(臨床用)",
    "target": "CRPSのスクリーニング(診断基準ではない)",
    "value": "病期のいずれかで自覚症状5項目中2項目以上、かつ診察時の他覚所見5項目中2項目以上。項目=皮膚・爪・毛の萎縮性変化／関節可動域制限／痛み(持続性・不釣合い)または知覚過敏(他覚はアロディニア・痛覚過敏)／発汗の亢進・低下／浮腫。研究用は各3項目以上。臨床用の感度82.6%・特異度78.8%",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。診断基準・重症度判定ではなく、治療方針決定や専門施設への紹介判断が目的",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://jspc.gr.jp/Contents/public/pdf/shishin/6-12.pdf"
     }
    ]
   },
   {
    "item": "1994年 IASPの診断基準",
    "target": "CRPSの診断(国際疼痛学会)",
    "value": "(1)原因の傷害と不釣り合いな強い持続痛・アロディニア・痛覚過敏、(2)病期のいずれかで疼痛部位に浮腫・皮膚血流の変化・発汗異常のいずれか、(3)症状を説明できる他の原因がない",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。特異度が低いため、運動機能などを加えたBudapest基準が評価されている",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://jspc.gr.jp/Contents/public/pdf/shishin/6-12.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
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
   "クローヌス",
   "筋紡錘",
   "錘内筋線維",
   "Ia線維"
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
  "slug": "dermatome-key-points",
  "name": "デルマトーム(皮膚分節)と髄節・神経根の対応",
  "category": "検査法・徴候",
  "aliases": [
   "デルマトーム",
   "皮膚分節",
   "髄節",
   "髄節支配",
   "支配髄節",
   "キーセンサリーポイント",
   "神経根症状",
   "障害神経根",
   "腰椎椎間板ヘルニア",
   "変形性頸椎症",
   "頸椎症"
  ],
  "rows": [
   {
    "item": "体幹・上肢のデルマトーム(ISNCSCI感覚キーポイント)",
    "target": "髄節と皮膚の対応",
    "value": "C5=肘窩の外側(橈側)／C6=母指(基節骨背側)／C7=中指／C8=小指／T4=乳頭の高さ(鎖骨中線・第4肋間)／T10=臍の高さ／T12=鼠径靱帯の中点",
    "exam": "53-pm-56(デルマトームと支配髄節の組合せ。乳頭=第4胸髄節が正答。誤答=母指―第3頸髄節(正しくはC6)・臍―第8胸髄節(T10)・膝―第1腰髄節(L3)・肛門―第1仙髄節(S4/5))",
    "q": [
     "53-pm-56"
    ],
    "note": "確認済み[S1]。キーセンサリーポイントは各髄節の代表点で、皮膚分節の全体の広がりを示すものではない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://asia-spinalinjury.org/wp-content/uploads/2016/02/Key_Sensory_Points.pdf"
     }
    ]
   },
   {
    "item": "下肢のデルマトーム(ISNCSCI感覚キーポイント)",
    "target": "髄節と皮膚の対応(腰椎椎間板ヘルニアの高位診断にも使う)",
    "value": "L2=大腿前内側／L3=大腿骨内側顆(膝の内側)／L4=内果／L5=足背(第3中足趾節関節)／S1=踵骨の外側／S2=膝窩の中央／S3=坐骨結節／S4-5=肛門周囲",
    "exam": "56-am-15(腰部〜下腿後面〜足背外側部の痛みの椎間板ヘルニア高位=L5/S1・正答)／54-pm-14(右の片脚立位で踵を挙上できない患者の重度感覚鈍麻の部位。図から選ぶ・正答は④。図は未確認)／51-am-9(腰椎MRIから予想される所見=左足部の感覚障害・正答)／53-pm-56(肛門=S4/5、膝=L3)",
    "q": [
     "56-am-15",
     "54-pm-14",
     "51-am-9",
     "53-pm-56"
    ],
    "note": "確認済み[S1]。国試の問題は図や痛みの範囲の記述から高位を推定させる形で、キーポイントの対応だけでは決まらない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://asia-spinalinjury.org/wp-content/uploads/2016/02/Key_Sensory_Points.pdf"
     }
    ]
   },
   {
    "item": "キーマッスル(ISNCSCI運動のキーマッスル)",
    "target": "髄節と筋の対応",
    "value": "C5=肘屈筋／C6=手関節伸筋／C7=肘伸筋／C8=手指屈筋／T1=小指外転筋／L2=股関節屈筋／L3=膝伸筋／L4=足関節背屈筋／L5=長母趾伸筋(長趾伸筋)／S1=足関節底屈筋",
    "exam": "55-am-14(変形性頸椎症で頸部伸展時に母指のしびれ→筋力低下が最も出やすい筋=長橈側手根伸筋・正答。母指はC6の感覚キーポイントで、手関節伸筋もC6)／54-pm-14(右の片脚立位で踵挙上ができない=足関節底屈の筋力低下=S1が関与)",
    "q": [
     "55-am-14",
     "54-pm-14"
    ],
    "note": "確認済み[S1]。キーマッスルの表記は「wrist extensors」などで、個々の筋名(長橈側手根伸筋)までは資料に書かれていない。母指=C6との対応で国試の正答と整合する。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.sralab.org/sites/default/files/2017-07/International_Stds_Diagram_Worksheet.pdf"
     },
     {
      "label": "S2",
      "url": "https://asia-spinalinjury.org/wp-content/uploads/2016/02/Key_Sensory_Points.pdf"
     }
    ]
   },
   {
    "item": "腰椎椎間板ヘルニアでの高位診断",
    "target": "L4・L5・S1の神経根障害",
    "value": "好発高位はL4/5とL5/S。L4神経根障害では膝蓋腱反射、S1神経根障害ではアキレス腱反射の低下・消失を見る(診断精度は高くない)。疼痛放散・感覚障害(デルマトーム)・筋力・腱反射・SLRテストを合わせ、問診・身体所見・画像で総合的に判断する",
    "exam": "56-am-15(L5/S1が正答)／54-pm-14(S1の障害を疑う症例)／51-am-9(足部の感覚障害)",
    "q": [
     "56-am-15",
     "54-pm-14",
     "51-am-9"
    ],
    "note": "確認済み[S1]。疼痛放散の範囲ではL5とS1の区別がつきにくいとする報告も本文にある。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://minds.jcqhc.or.jp/common/summary/pdf/c00645.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "descriptive-statistics",
  "name": "代表値と散布度(平均値・中央値・最頻値・分散・標準偏差)",
  "category": "診断基準・分類",
  "aliases": [
   "代表値",
   "散布度",
   "平均値",
   "中央値",
   "最頻値",
   "標準偏差",
   "外れ値",
   "記述統計",
   "算術平均"
  ],
  "rows": [
   {
    "item": "極端な値(外れ値)を除いたときの変化",
    "target": "外れ値が各統計量に与える影響",
    "value": "極端に小さい値を除くと平均値は大きくなる(外れ値は平均値を引き寄せる)。最大値は変わらず、最頻値は通常変わらない。ばらつきを表す分散・標準偏差は、平均から離れた値がなくなるので小さくなる",
    "exam": "53-pm-21(標本Aの極端に小さい誤記入値を除いた標本Bで、標本Aより大きい統計量=平均値(正答)。誤答:分散・最大値・最頻値・標準偏差)",
    "q": [
     "53-pm-21"
    ],
    "note": "確認済み[S1][S2]。外れ値が平均値を引き上げる例は[S1]、標準偏差・分散の定義は[S2]。「分散・標準偏差が小さくなる」は[S2]の定義(平均からのずれの二乗の平均)から導いた説明。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.pref.niigata.lg.jp/uploaded/life/797712_2538664_misc.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.stat.go.jp/info/kenkyu/kyouiku/pdf/4siryo2.pdf"
     }
    ]
   },
   {
    "item": "平均値",
    "target": "データ全体の代表値",
    "value": "データの合計をデータの数で割った値(算術平均・単純平均)。すべての値を使うので、全データを踏まえた特徴がわかる一方、外れ値の影響を受ける",
    "exam": "53-pm-21(外れ値除去で大きくなる統計量の正答)",
    "q": [
     "53-pm-21"
    ],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.pref.niigata.lg.jp/uploaded/life/797712_2538664_misc.pdf"
     }
    ]
   },
   {
    "item": "中央値",
    "target": "データを順に並べた真ん中の値",
    "value": "小さい(大きい)順に並べて、ちょうど中央に位置する値。データ数が偶数なら中央2つを足して2で割る。極端な値がある場合は、平均値より実情に近いことがある",
    "exam": "出題は直接なし(53-pm-21の問題文に「中央値」が出る)",
    "q": [],
    "note": "確認済み[S1]。資料の例(5人の年収で、1人だけ極端に高い)では、平均値より中央値の方が他の4人に近い。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.pref.niigata.lg.jp/uploaded/life/797712_2538664_misc.pdf"
     }
    ]
   },
   {
    "item": "最頻値",
    "target": "最も多く現れる値",
    "value": "データの中で最も頻繁に出現する値。ヒストグラムでは最も棒が高いところ",
    "exam": "53-pm-21(誤答選択肢。外れ値を1つ除いても最頻値は通常変わらない)",
    "q": [
     "53-pm-21"
    ],
    "note": "確認済み[S1][S2]。「除いても変わらない」は定義からの説明。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.pref.niigata.lg.jp/uploaded/life/797712_2538664_misc.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.stat.go.jp/info/kenkyu/kyouiku/pdf/4siryo2.pdf"
     }
    ]
   },
   {
    "item": "代表値の選び方",
    "target": "どの代表値を使うか",
    "value": "①平均値と中央値を比べ、大きくずれなければ平均値 ②ずれが大きければ中央値と最頻値を比べて適切な方を選ぶ ③どれも一長一短なら代表値を使わない選択もある。外れ値がある場合や分布が偏っている場合は選択を検討する",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.pref.niigata.lg.jp/uploaded/life/797712_2538664_misc.pdf"
     }
    ]
   },
   {
    "item": "分散と標準偏差(散布度)",
    "target": "データの散らばり具合",
    "value": "分散=各値と平均値との差の二乗の平均。標準偏差=分散の平方根(分散は標準偏差の2乗)。どちらも大きいほどデータが散らばっている",
    "exam": "53-pm-21(誤答選択肢。外れ値を除くと小さくなる側なので、「大きくなる統計量」には当たらない)",
    "q": [
     "53-pm-21"
    ],
    "note": "確認済み[S2]",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.stat.go.jp/info/kenkyu/kyouiku/pdf/4siryo2.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
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
  "slug": "diagnostic-test-accuracy",
  "name": "診断精度(感度・特異度・尤度比・的中率)",
  "category": "臨床検査",
  "aliases": [
   "感度・特異度",
   "特異度",
   "陽性尤度比",
   "陰性尤度比",
   "尤度比",
   "陽性的中率",
   "陰性的中率",
   "的中率",
   "適中率",
   "偽陽性率",
   "偽陰性率",
   "有病率",
   "カットオフ値",
   "ROC曲線",
   "sensitivity",
   "specificity",
   "likelihood ratio",
   "PPV",
   "NPV"
  ],
  "rows": [
   {
    "item": "感度と特異度の定義(2×2表)",
    "target": "検査が疾患を見つける力(感度)と、疾患のない人を正しく除く力(特異度)",
    "value": "感度=疾患のある人のうち検査陽性の割合=TP/(TP+FN)。特異度=疾患のない人のうち検査陰性の割合=TN/(TN+FP)。感度は偽陰性率の補数、特異度は偽陽性率の補数。感度・特異度は有病率に左右されない。",
    "exam": "55-am-1: 感度80%・特異度95%・陽性的中率85%・陰性的中率90%の表。「罹患していない人で陰性と判定される確率は95%」が正答(特異度)。「罹患者で陽性と判定される確率は85%」は誤答(罹患者で陽性になる割合=感度は80%)。",
    "q": [
     "55-am-1"
    ],
    "note": "確認済み[S1][S2]。表の読み替えは、縦に集計すれば的中率、横に(疾患の有無で)集計すれば感度・特異度。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/24-その他のトピック/臨床的意思決定/医学的検査および検査結果の理解"
     },
     {
      "label": "S2",
      "url": "https://jslm.org/books/guideline/2018/04.pdf"
     }
    ]
   },
   {
    "item": "陽性的中率(PPV)・陰性的中率(NPV)",
    "target": "検査結果が出たあとに、その結果がどれだけ当たっているか",
    "value": "PPV=陽性と判定された人のうち実際に疾患がある割合=TP/(TP+FP)。NPV=陰性と判定された人のうち実際に疾患がない割合=TN/(TN+FN)。的中率は有病率で大きく変わる(有病率が低いと陽性的中率は著しく低下する)。",
    "exam": "55-am-1: 「陰性の場合に罹患していない確率は90%」が正答(NPV)。「陽性のとき罹患している確率は80%」は誤答(陽性のとき罹患=PPVは85%で、80%は感度)。「陰性のとき罹患している確率は15%」は誤答(陰性のとき罹患=1−NPV=10%)。",
    "q": [
     "55-am-1"
    ],
    "note": "確認済み[S1][S2]。「1−NPV=10%」は定義(NPV=陰性のうち非罹患の割合)からの計算。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/24-その他のトピック/臨床的意思決定/医学的検査および検査結果の理解"
     },
     {
      "label": "S2",
      "url": "https://jslm.org/books/guideline/2018/04.pdf"
     }
    ]
   },
   {
    "item": "陽性尤度比・陰性尤度比の式",
    "target": "感度と特異度を1つにまとめた、検査の切れ味の指標",
    "value": "陽性尤度比(LR+)=感度÷(1−特異度)。陰性尤度比(LR−)=(1−感度)÷特異度。尤度比=「有疾患群である結果をとる確率÷無疾患群で同じ結果をとる確率」。尤度比が1なら鑑別能なし(情報をもたらさない)。LR+は大きいほど、LR−は0に近いほど検査の切れ味が良い。",
    "exam": "52-pm-22: 陽性尤度比が「感度÷(1−特異度)で計算できる」が正答。誤答=検査的中率と同義/陰性尤度比と足すと1になる/値が小さいほど妥当性が高い/実際の該当者のうち検査で陽性となる割合(これは感度の定義)。",
    "q": [
     "52-pm-22"
    ],
    "note": "確認済み[S1][S2]。LR+とLR−は別の式なので、足しても1にならない。LR+は小さいほど良いのではなく、大きいほど有用。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/24-その他のトピック/臨床的意思決定/医学的検査および検査結果の理解"
     },
     {
      "label": "S2",
      "url": "https://jslm.org/books/guideline/2018/04.pdf"
     }
    ]
   },
   {
    "item": "陽性尤度比の計算例(表から)",
    "target": "2×2表から感度・偽陽性率を求め、LR+を出す手順",
    "value": "症状あり(疾患あり)100人: 検査陽性30・陰性70 → 感度=30/100=0.30。症状なし100人: 陽性40・陰性60 → 偽陽性率(1−特異度)=40/100=0.40。LR+=0.30÷0.40=0.75。",
    "exam": "61-pm-26: 表から陽性尤度比を計算し、0.75が正答。誤答は0.30(感度そのもの)など。",
    "q": [
     "61-pm-26"
    ],
    "note": "確認済み[S1]の式に当てはめた計算。0.75は1未満で、陽性でも診断を支持する根拠にならない(尤度比1で情報なし[S1])。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/24-その他のトピック/臨床的意思決定/医学的検査および検査結果の理解"
     }
    ]
   },
   {
    "item": "尤度比の目安と使い分け(SpPin・SnNout)",
    "target": "確定診断(rule in)・除外診断(rule out)に向く検査の選び方",
    "value": "LR+が10以上=診断を支持する強い証拠(特異度の高い検査で陽性=SpPin、検査前確率が高いとき確定に有用)。LR−が0.1以下=診断を否定する強い証拠(感度の高い検査で陰性=SnNout、検査前確率が低いとき除外に有用)。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1][S2]。目安であり、絶対的な基準ではない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/24-その他のトピック/臨床的意思決定/医学的検査および検査結果の理解"
     },
     {
      "label": "S2",
      "url": "https://jslm.org/books/guideline/2018/04.pdf"
     }
    ]
   },
   {
    "item": "カットオフ値と感度・特異度の関係",
    "target": "数値で出る検査の陽性基準を変えたときの変化",
    "value": "カットオフ値を変えると感度と特異度は変動し、一方が上がると他方が下がる(損益の関係)。両者を組み合わせて評価するのが尤度比。カットオフごとの変化をプロットしたものがROC曲線。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S2]。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://jslm.org/books/guideline/2018/04.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "disability-acceptance-stages",
  "name": "障害受容の5段階(上田)",
  "category": "診断基準・分類",
  "aliases": [
   "障害受容",
   "障害の受容",
   "障害受容の過程",
   "受容過程",
   "ショック期",
   "否認期",
   "混乱期",
   "解決への努力期",
   "受容期",
   "価値転換",
   "段階論"
  ],
  "rows": [
   {
    "item": "上田の障害受容の5段階(順序)",
    "target": "障害を負った後の心理過程の段階",
    "value": "ショック期 → 否認期 → 混乱期 → 解決への努力期 → 受容期 の順。2番目は否認期",
    "exam": "56-pm-79(正答:否認期。「障害受容に至る5つの過程で一般的に2番目に現れるのはどれか」。選択肢:混乱期・受容期・否認期・ショック期・解決への努力期)",
    "q": [
     "56-pm-79"
    ],
    "note": "確認済み[S1]。2024年の大学紀要の総説が、上田(1983)の受容過程として5つの時期名を挙げている。なお同総説の本文には段階数を「6段階」と書く誤記があるが、列挙された名称は5つ",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://da.lib.kobe-u.ac.jp/da/kernel/0100491705/0100491705.pdf"
     }
    ]
   },
   {
    "item": "受容期の位置づけ(価値転換)",
    "target": "上田の定義",
    "value": "上田は障害受容を、あきらめでも居直りでもなく、障害に対する価値観(感)の転換とした。障害があっても人間としての価値は下がらないと認識し、恥や劣等感を乗り越えて積極的な生活態度に転じること。価値転換の完成を「受容期」とし、そこに至るには「解決への努力期」で、本人や家族だけに価値転換を求めず、支援者自身も価値転換することが必要とされた",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://da.lib.kobe-u.ac.jp/da/kernel/0100491705/0100491705.pdf"
     }
    ]
   },
   {
    "item": "Cohn(1961)・Fink(1967)の段階論",
    "target": "海外の段階モデル(混同注意)",
    "value": "Cohn は「ショック・回復への期待・悲哀・防衛・適応」の5段階、Fink は危機理論に基づき「ショック・防衛的退行・自認とストレスの再起・適応と変化」の4段階とされる",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。上田の5段階の時期名とは別",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://da.lib.kobe-u.ac.jp/da/kernel/0100491705/0100491705.pdf"
     }
    ]
   },
   {
    "item": "段階は一直線に進むとは限らない",
    "target": "臨床での注意",
    "value": "上田の受容過程をもとに脳卒中患者97名で調べた研究では、段階の通りに進むとは限らず、多くの患者が経験する段階とそうでない段階があり、行き戻りする人や途中の段階を飛ばす人もいた",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。総説が紹介する研究(岡本ら)の結果",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://da.lib.kobe-u.ac.jp/da/kernel/0100491705/0100491705.pdf"
     }
    ]
   },
   {
    "item": "悲嘆の5段階(否認・怒り・取引・抑うつ・受容)",
    "target": "別のモデル(混同注意)",
    "value": "脳卒中患者は障害とともに生きることを受け入れるまでに、一般に否認・怒り・取引・抑うつ・受容の悲嘆の5段階を経るとされる。長寿科学振興財団の解説も、否認→怒り→逃避反応(取引)→受容の流れで説明している。「ショック期・混乱期・解決への努力期」の名称は上田の5段階",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S2][S3]。国試56-pm-79の選択肢は上田の5段階の名称",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.jstage.jst.go.jp/article/jjrmc/50/12/50_951/_article/-char/ja"
     },
     {
      "label": "S3",
      "url": "https://www.tyojyu.or.jp/net/byouki/rehabilitation/shougai-juyou.html"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
  "review": "ai"
 },
 {
  "slug": "disuse-syndrome-bedrest",
  "name": "廃用症候群・長期臥床の影響",
  "category": "リスク管理",
  "aliases": [
   "廃用症候群",
   "廃用症候群の症状",
   "長期臥床",
   "長期の安静臥床",
   "長期間の安静臥床",
   "安静臥床",
   "臥床の影響",
   "デコンディショニング",
   "脱調節",
   "deconditioning",
   "安静時心拍数",
   "尿中カルシウム"
  ],
  "rows": [
   {
    "item": "安静時心拍数(臥床で増加)",
    "target": "長期臥床・廃用で安静時心拍数はどうなるか",
    "value": "安静時心拍数は低下しない(増加するとされる)。2〜3週の臥床後に安静時心拍数・収縮期血圧は増加傾向(女性7例・有意差なし)。機序として、臥床で減る1回心拍出量を心拍数の増加で代償するという説明がある(Saltin 1968)",
    "exam": "53-pm-84(正答:心拍数=低下しないもの。誤答:筋力・肺活量・身体活動性・胃腸管運動=いずれも低下)／54-pm-84(誤答:安静時心拍数の減少)／59-pm-83(誤答:安静時心拍数の低下)",
    "q": [
     "53-pm-84",
     "54-pm-84",
     "59-pm-83"
    ],
    "note": "確認済み[S1]。小規模研究で有意差は出ていない点に注意。下の行も参照。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/jjrm1964/30/1/30_1_63/_pdf"
     }
    ]
   },
   {
    "item": "安静時心拍数:資料間の不一致",
    "target": "資料による記載の違い",
    "value": "梅本ら(2025)の図6「安静臥床による身体機能低下」は、0〜3日の欄で安静時心拍数を「減少」に分類している。上の行の報告(増加傾向)および国試の扱い(低下しない)とは逆",
    "exam": "53-pm-84・54-pm-84・59-pm-83と同じ論点",
    "q": [],
    "note": "臥床初期か長期か、研究対象で結果が異なる可能性がある。国試では「臥床で安静時心拍数が減る」を誤りとして出題されている。出典の図は[S1]。",
    "conflict": true,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/jjrmc/62/5/62_62.474/_pdf"
     }
    ]
   },
   {
    "item": "筋力低下・筋萎縮",
    "target": "廃用で筋はどうなるか",
    "value": "筋蛋白の合成低下・分解亢進で起こり、姿勢保持と歩行に関わる抗重力筋に強く起こりやすい。安静臥床のままでは初期に約1〜3%/日、10〜15%/週の低下。詳しくは「臥床による筋力低下・筋萎縮」カード",
    "exam": "53-pm-84(誤答:筋力=低下する)／54-am-49(誤答選択肢:筋萎縮は上肢に強くみられる。実際は抗重力筋・下肢に強い。ほかの選択肢は未確認)",
    "q": [
     "53-pm-84",
     "54-am-49"
    ],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.hokeniryo.metro.tokyo.lg.jp/documents/d/hokeniryo/siryou162"
     }
    ]
   },
   {
    "item": "循環器(循環血液量・静脈還流・起立性低血圧・静脈血栓)",
    "target": "廃用・臥床の循環器への影響",
    "value": "循環血液量(血漿量)の低下・血管運動調節障害・心筋機能低下→起立性低血圧(めまい・失神)。下肢筋のポンプ作用の減少→血流停滞と凝固能亢進→静脈血栓。臥床による心血管機能の低下は心筋の廃用・循環血漿量の減少・静脈還流の障害による。24時間の安静臥床でも血漿量が5〜10%低下するという報告がある",
    "exam": "54-pm-84(正答:循環血液量の減少)／59-pm-83(正答:深部静脈血栓)／56-pm-46(正答:起立性低血圧がみられる)／51-am-82(誤答選択肢:静脈還流量=上昇しない)",
    "q": [
     "54-pm-84",
     "59-pm-83",
     "56-pm-46",
     "51-am-82"
    ],
    "note": "確認済み[S1][S2][S3]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.hokeniryo.metro.tokyo.lg.jp/documents/d/hokeniryo/siryou162"
     },
     {
      "label": "S2",
      "url": "https://www.jstage.jst.go.jp/article/jjrmc/62/5/62_62.474/_pdf"
     },
     {
      "label": "S3",
      "url": "https://www.jstage.jst.go.jp/article/jjrm1964/30/1/30_1_63/_pdf"
     }
    ]
   },
   {
    "item": "呼吸器",
    "target": "廃用・臥床の呼吸器への影響",
    "value": "呼吸筋の筋力低下・胸郭可動域制限により、一回換気量・分時換気量・肺活量・機能的残気量が低下する。背臥位が続くと気管支に粘液がたまり、線毛の浄化機能が損なわれて(沈下性)肺炎の素地になる",
    "exam": "53-pm-84(誤答:肺活量=低下する)／54-pm-84(誤答:1回換気量の増加・予備呼気量の増加)",
    "q": [
     "53-pm-84",
     "54-pm-84"
    ],
    "note": "確認済み[S1]。予備呼気量そのものの記載は確認できず(機能的残気量の低下の記載)。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.hokeniryo.metro.tokyo.lg.jp/documents/d/hokeniryo/siryou162"
     }
    ]
   },
   {
    "item": "骨・カルシウム代謝",
    "target": "臥床で骨・尿中カルシウムはどうなるか",
    "value": "不動で骨吸収が亢進し骨萎縮(続発性骨粗鬆症)、骨量減少により高Ca血症・高Ca尿症となり尿路結石ができやすい。尿中カルシウム排泄能力は臥床15日以上で増加、骨密度は減少",
    "exam": "51-am-82(正答:尿中カルシウム=上昇)／59-pm-83(誤答:低カルシウム血症。実際は高Ca血症側)／60-am-83(誤答選択肢:骨密度=減少する)",
    "q": [
     "51-am-82",
     "59-pm-83",
     "60-am-83"
    ],
    "note": "確認済み[S1][S2]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.hokeniryo.metro.tokyo.lg.jp/documents/d/hokeniryo/siryou162"
     },
     {
      "label": "S2",
      "url": "https://www.jstage.jst.go.jp/article/jjrmc/62/5/62_62.474/_pdf"
     }
    ]
   },
   {
    "item": "耐糖能・免疫",
    "target": "臥床で耐糖能・免疫能はどうなるか",
    "value": "梅本ら(2025)の図では、臥床0〜3日で耐糖能が減少、8〜14日で白血球の貪食能が減少に分類されている",
    "exam": "51-am-82(誤答選択肢:免疫能・耐糖能=上昇しない(低下側))",
    "q": [
     "51-am-82"
    ],
    "note": "確認済み[S1](図の記載)。免疫能全般ではなく「白血球貪食能」の記載。クレアチニン・クリアランスは確認できず。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/jjrmc/62/5/62_62.474/_pdf"
     }
    ]
   },
   {
    "item": "消化器",
    "target": "臥床で胃腸の動きはどうなるか",
    "value": "不動で交感神経系が亢進し、腸管蠕動運動が低下する。食物の通過時間延長が食欲低下・食事量減少・便秘・低栄養につながる。胃液分泌も臥床0〜3日で減少に分類されている",
    "exam": "53-pm-84(誤答:胃腸管運動=低下する)／60-am-83(誤答選択肢:腸管蠕動運動=増加しない)",
    "q": [
     "53-pm-84",
     "60-am-83"
    ],
    "note": "確認済み[S1][S2]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.hokeniryo.metro.tokyo.lg.jp/documents/d/hokeniryo/siryou162"
     },
     {
      "label": "S2",
      "url": "https://www.jstage.jst.go.jp/article/jjrmc/62/5/62_62.474/_pdf"
     }
    ]
   },
   {
    "item": "精神神経系",
    "target": "臥床・不動の精神神経面への影響",
    "value": "身体活動量の低下と感覚入力の減少により、意欲・集中力の低下、感情鈍麻、うつ、知的機能の減衰、見当識・睡眠覚醒リズムの障害が起こる",
    "exam": "54-pm-84(正答:記銘力の低下)",
    "q": [
     "54-pm-84"
    ],
    "note": "確認済み[S1]。「記銘力」という語は資料にはなく、知的機能の減衰として整理。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.hokeniryo.metro.tokyo.lg.jp/documents/d/hokeniryo/siryou162"
     }
    ]
   },
   {
    "item": "廃用症候群の定義",
    "target": "廃用症候群とは",
    "value": "身体の不活動状態により生ずる二次的障害。不動・低運動・臥床に起因する全身の諸症状の総称で、筋骨格系・循環呼吸器系・内分泌代謝系・精神神経系など多臓器に現れ、日常生活自立度を低下させる。各臓器の機能低下が悪循環をつくる",
    "exam": "53-pm-84(誤答選択肢:身体活動性=低下する)",
    "q": [
     "53-pm-84"
    ],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.hokeniryo.metro.tokyo.lg.jp/documents/d/hokeniryo/siryou162"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
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
  "slug": "double-product",
  "name": "二重積(ダブルプロダクト)",
  "category": "リスク管理",
  "aliases": [
   "二重積",
   "ダブルプロダクト",
   "Double Product",
   "double product",
   "心仕事量",
   "心臓二重積"
  ],
  "rows": [
   {
    "item": "二重積の定義",
    "target": "運動時の心臓の仕事量・心筋酸素需要の指標",
    "value": "二重積(DP)=心拍数 × 収縮期血圧。規定因子は心拍数と収縮期血圧の2つ",
    "exam": "59-pm-36(2つ選ぶ。正答:心拍数・収縮期血圧。誤答:呼吸数・一回拍出量・動静脈酸素較差)",
    "q": [
     "59-pm-36"
    ],
    "note": "確認済み[S1]。診療ガイドラインでDPを「収縮期血圧と心拍数の積」と説明。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2018/11/JCS2018_kimura.pdf"
     }
    ]
   },
   {
    "item": "二重積の意味",
    "target": "心筋酸素消費量との関係",
    "value": "DPは心筋の酸素消費量と強い相関(報告値 r=0.90)があり、運動中の心臓の仕事量を間接的に推測する指標として使われてきた",
    "exam": "59-pm-36(二重積が何を反映するかの前提知識)",
    "q": [
     "59-pm-36"
    ],
    "note": "確認済み[S1]。呼吸数・一回拍出量・動静脈酸素較差は、資料の二重積の定義に含まれない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://air.repo.nii.ac.jp/record/1447/files/mom1.pdf"
     }
    ]
   },
   {
    "item": "運動療法による二重積の変化",
    "target": "運動療法の身体的効果",
    "value": "運動療法の効果として、最大下の同一負荷強度での心仕事量(心臓二重積)が減少する(ガイドラインの推奨ランクA)",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。2012年改訂版。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jacr.jp/pdf/JCS2012_nohara_d_2015.01.14.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
  "review": "ai"
 },
 {
  "slug": "drehmann-sign",
  "name": "Drehmann徴候",
  "category": "検査法・徴候",
  "aliases": [
   "Drehmann徴候",
   "Drehmann sign",
   "Drehmann",
   "ドレーマン",
   "ドレーマン徴候",
   "大腿骨頭すべり症",
   "SCFE",
   "slipped capital femoral epiphysis"
  ],
  "rows": [
   {
    "item": "Drehmann徴候",
    "target": "大腿骨頭すべり症(slipped capital femoral epiphysis:SCFE)",
    "value": "股関節を他動的に屈曲していくと、屈曲に伴って、その股関節が不随意に外転・外旋すれば陽性。患側の股関節で起きる。SCFEで認められる特異的な所見の1つ。",
    "exam": "57-am-31(右大腿骨頭すべり症でDrehmann徴候陽性。背臥位で右下肢を他動的に屈曲したときの関節運動の正答=右股関節が外転・外旋(選択肢3)。誤答:左股関節が屈曲・外旋/左股関節が内転・外旋/右股関節が外転・内旋/右股関節が内転・内旋)",
    "q": [
     "57-am-31"
    ],
    "note": "確認済み[S1][S2]。屈曲に伴う「外旋」は両資料で共通。外転も伴うとするのは[S1]。国試の正答(外転・外旋)と一致。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC8702267/"
     },
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11533300/"
     }
    ]
   },
   {
    "item": "大腿骨頭すべり症の診察所見",
    "target": "Drehmann徴候以外の身体所見・症状",
    "value": "股関節の可動域制限(とくに内旋・屈曲・外転)。患肢は外旋位をとり、短縮することがある。膝・大腿・鼠径部の断続的な痛みや、患肢で体重をかけにくいことが多く、痛みの部位が膝などで紛らわしいことがある。診断には診察が重要とされる。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S3]。資料はドイツ語の論文で、Drehmann徴候は項目名のみ触れられ、手技の説明は[S1][S2]から。",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10781806/"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
  "review": "ai"
 },
 {
  "slug": "drop-arm-test",
  "name": "Drop armテスト",
  "category": "検査法・徴候",
  "aliases": [
   "Drop armテスト",
   "drop armテスト",
   "drop arm テスト",
   "drop arm test",
   "Drop arm sign",
   "drop arm sign",
   "ドロップアーム",
   "ドロップアームテスト",
   "ドロップアームサイン"
  ],
  "rows": [
   {
    "item": "Drop armテスト(手技と陽性)",
    "target": "肩腱板断裂(とくに棘上筋)の徒手検査",
    "value": "肘を伸ばした腕を、検者が他動的に90°外転させ(外旋位で肘を支える)、支えを外して、ゆっくり下ろすよう指示する。腕を保てず突然落ちる・ゆっくり下ろせない場合、または下ろすときの痛みがある場合を陽性とする。腱板断裂を疑う。下ろすときの痛みは、棘上筋の完全断裂を示唆することがある。",
    "exam": "58-am-33(「腱板損傷の検査で正しいのは」の正答。誤答はChair・Jackson・Spurling・Thomsen)／55-pm-86(「肩腱板断裂で陽性となるのは」の正答。誤答はAdson・Finkelstein・Phalen・Thomsen)／53-pm-32(「腱板断裂損傷の徒手検査で陽性となる可能性が最も高いのは」の正答。誤答はanterior apprehension・Morley・Thompson・「Yargason」(=Yergasonの誤記))",
    "q": [
     "58-am-33",
     "55-pm-86",
     "53-pm-32"
    ],
    "note": "確認済み[S1]。国試の正答(腱板断裂で陽性)と一致。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC13566503/"
     }
    ]
   },
   {
    "item": "Drop armテストの診断精度と限界",
    "target": "陰性でも腱板断裂は否定できない",
    "value": "特異度は高いが、感度は低い。メタ解析では診断オッズ比1.45で、単独では診断的な有意差に達しなかったとする報告もある。腱板断裂の確定には、外旋ラグサイン(90°で特異度0.99・診断オッズ比12.70)など別の所見や画像を組み合わせる。単独で決められる検査はなく、複数の検査を組み合わせると診断精度が上がる。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1][S2]。資料間で、Drop armの「特異度が高い」(一般的評価)と「メタ解析で有意でない」という見方に幅がある。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC13566503/"
     },
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC13096753/"
     }
    ]
   },
   {
    "item": "Drop armテストが陽性になる割合(MRIでの断裂の程度別)",
    "target": "完全断裂と部分断裂での違い",
    "value": "162例(MRIで完全断裂125例・部分断裂37例)で、Drop armテスト陽性は完全断裂で81例(64.8%)、部分断裂で14例(37.8%)。完全断裂で陽性が多い(p=0.003)。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S3]。MRI所見との比較で、手術所見との感度・特異度ではない。",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC12009592/"
     }
    ]
   },
   {
    "item": "腱板のほかの徒手検査(比較)",
    "target": "どの腱の検査かの整理",
    "value": "Jobe(empty can)テスト=棘上筋。抵抗に対する脱力で陽性。Lift-offテスト=肩甲下筋。特異度は90%超と高いが感度は18〜35%と低く、陽性なら確認に使い、陰性で除外はできない。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC13566503/"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
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
  "slug": "edema-pitting-nonpitting",
  "name": "浮腫の圧痕性・非圧痕性(甲状腺機能低下症・リンパ浮腫・心不全)",
  "category": "検査法・徴候",
  "aliases": [
   "圧痕性浮腫",
   "非圧痕性浮腫",
   "圧窩性浮腫",
   "非圧窩性浮腫",
   "圧痕",
   "圧窩",
   "pitting edema",
   "non-pitting edema",
   "粘液水腫",
   "甲状腺機能低下症の浮腫",
   "組織液",
   "浮腫の評価"
  ],
  "rows": [
   {
    "item": "非圧痕性浮腫を生じる疾患:甲状腺機能低下症",
    "target": "浮腫の性状から疾患を考える",
    "value": "厚生労働省の重篤副作用疾患別対応マニュアル(甲状腺機能低下症)は、他覚所見として甲状腺腫・体重増加・徐脈・嗄声とともに「浮腫(non-pitting edema)」を挙げている。",
    "exam": "52-pm-26 正答=甲状腺機能低下症(非圧痕性浮腫を生じる疾患を選ぶ設問。誤答にネフローゼ症候群・肝硬変・心不全・熱傷)",
    "q": [
     "52-pm-26"
    ],
    "note": "確認済み[S1]。誤答側の疾患(ネフローゼ・肝硬変・心不全・熱傷)が圧痕性かどうかは、この資料では個別には確認していない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.mhlw.go.jp/topics/2006/11/dl/tp1122-1d09.pdf"
     }
    ]
   },
   {
    "item": "右心不全の浮腫は圧痕性",
    "target": "圧痕性浮腫の代表例",
    "value": "右心不全の直接的な影響(静脈圧上昇)による浮腫は、対称性・就下性(dependent)・無痛性の圧痕性浮腫で、しばしば左心不全を伴い、労作時呼吸困難・起座呼吸・発作性夜間呼吸困難がみられる、とMSDマニュアルの表に記載。",
    "exam": "52-pm-26 誤答選択肢(心不全は圧痕性側)",
    "q": [
     "52-pm-26"
    ],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/multimedia/table/浮腫の主な原因"
     }
    ]
   },
   {
    "item": "ネフローゼ症候群・肝疾患による浮腫(膠質浸透圧低下)",
    "target": "全身性浮腫の原因",
    "value": "MSDマニュアルの表では、血漿膠質浸透圧の低下による浮腫の原因として、ネフローゼ症候群(びまん性の浮腫、しばしば著明な腹水、ときに眼窩周囲の浮腫)と、アルブミン合成の低下(肝疾患・低栄養。しばしば著明な腹水)が挙げられる。",
    "exam": "52-pm-26 誤答選択肢(ネフローゼ症候群・肝硬変)",
    "q": [
     "52-pm-26"
    ],
    "note": "確認済み[S1]。この表には、これらの浮腫が圧痕性かどうかは明記されていない(国試の入力記録では圧痕性側の扱い)。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/multimedia/table/浮腫の主な原因"
     }
    ]
   },
   {
    "item": "リンパ浮腫の性状(圧痕性→非圧痕性へ)",
    "target": "リンパ浮腫",
    "value": "リンパ浮腫は慢性化すると硬い線維性の非圧痕性浮腫になる。浮腫の表では、リンパ管閉塞による浮腫は初期は圧痕性で、その後に線維化を来す。",
    "exam": "53-pm-15 問題文(挙上で改善せず皮膚が固く非圧窩性浮腫のリンパ浮腫)",
    "q": [
     "53-pm-15"
    ],
    "note": "確認済み[S1][S2]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/04-心血管疾患/リンパ系疾患/リンパ浮腫"
     },
     {
      "label": "S2",
      "url": "https://www.msdmanuals.com/ja-jp/professional/multimedia/table/浮腫の主な原因"
     }
    ]
   },
   {
    "item": "浮腫の診察:圧痕の確認",
    "target": "身体診察",
    "value": "圧痕とは、浮腫のある部位を指で押したときに間質液の移動で生じる、視認・触知できる陥凹。圧痕の有無と程度を記録する(あわせて程度・熱感・紅斑・圧痛・左右対称性を確認)。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S3]。",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://www.msdmanuals.com/ja-jp/professional/04-心血管疾患/心血管疾患の症状/浮腫"
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
  "slug": "elbow-ocd",
  "name": "肘離断性骨軟骨炎(上腕骨小頭OCD・外側型野球肘)",
  "category": "臨床検査",
  "aliases": [
   "離断性骨軟骨炎",
   "上腕骨小頭離断性骨軟骨炎",
   "野球肘",
   "外側型野球肘",
   "野球肘検診",
   "OCD",
   "関節ねずみ",
   "関節内遊離体"
  ],
  "rows": [
   {
    "item": "学童期の野球選手での有病率",
    "target": "検診での発見頻度",
    "value": "検診で見つかる頻度は数%。山梨の検診は小学4〜6年生(希望した中学1年生を含む)297名中8名で約2.7%。千葉の検診で上腕骨小頭に不整を認めた割合は小学生1.7%・中学生2.7%。",
    "exam": "60-am-89「肘離断性骨軟骨炎で誤っているのはどれか」の正答(=誤りの記述)=「学童期の野球選手の有病率は20〜30%である」。",
    "q": [
     "60-am-89"
    ],
    "note": "確認済み[S2][S3]。資料の約2〜3%に対し、20〜30%は一桁大きい。検診の対象や基準で数字は変わる。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.jstage.jst.go.jp/article/rika/33/6/33_969/_pdf"
     },
     {
      "label": "S3",
      "url": "https://www.jstage.jst.go.jp/article/jossm/41/1/41_34/_article/-char/ja/"
     }
    ]
   },
   {
    "item": "超音波検査の役割",
    "target": "初期の診断",
    "value": "OCDの初期は症状に乏しい。超音波(ポータブルエコー)は、X線で見つからない早期病変や、軟骨層だけの遊離も描出できる。野球肘検診では、理学所見とポータブルエコーの両方が使われる。",
    "exam": "60-am-89 の選択肢「超音波画像は初期診断に有用である」は正しい記述(正答ではない)。",
    "q": [
     "60-am-89"
    ],
    "note": "確認済み[S2]。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.jstage.jst.go.jp/article/rika/33/6/33_969/_pdf"
     }
    ]
   },
   {
    "item": "好発年齢・スポーツ",
    "target": "誰に起こるか",
    "value": "外側型野球肘の症状は離断性骨軟骨炎によるものが多く、10代前半で発症し、投手に多いが野手にも生じる。成長期の関節軟骨に強い負荷が続くと起こり、投げすぎが原因。初期は11歳(小学5年生)前後で発症しやすいとされる。",
    "exam": "60-am-89 の選択肢「10〜20代に多い」「投球を伴うスポーツで多い」はどちらも正しい記述(正答ではない)。",
    "q": [
     "60-am-89"
    ],
    "note": "確認済み[S1][S2]。資料の「10代前半」に対し、選択肢の「10〜20代」はより広い表現で、国試は正しい記述として扱っている。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://jsoa.or.jp/content/images/2023/05/vol.11_%E9%87%8E%E7%90%83%E8%82%98%E3%83%BB%E3%83%86%E3%83%8B%E3%82%B9%E8%82%98%E3%83%BB%E3%82%B4%E3%83%AB%E3%83%95%E8%82%98.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.jstage.jst.go.jp/article/rika/33/6/33_969/_pdf"
     }
    ]
   },
   {
    "item": "治療の方針",
    "target": "保存療法と手術",
    "value": "野球肘では、投球の制限など保存療法をしっかり行う。3〜6か月程度の保存療法に反応しない場合は手術を考慮する。遊離する前ならスクリューや骨釘で固定、遊離が生じたら関節鏡視下の遊離体摘出か骨軟骨柱の移植を行う。",
    "exam": "60-am-89 の選択肢「初期では保存療法が第一選択である」は正しい記述(正答ではない)。",
    "q": [
     "60-am-89"
    ],
    "note": "確認済み[S1]。出典は「初期」の定義を書いておらず、野球肘全体の保存療法の方針として確認した。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://jsoa.or.jp/content/images/2023/05/vol.11_%E9%87%8E%E7%90%83%E8%82%98%E3%83%BB%E3%83%86%E3%83%8B%E3%82%B9%E8%82%98%E3%83%BB%E3%82%B4%E3%83%AB%E3%83%95%E8%82%98.pdf"
     }
    ]
   },
   {
    "item": "X線所見・症状",
    "target": "進行した時期の所見",
    "value": "軟骨に亀裂が生じたまま競技を続けると軟骨がはがれ、関節内遊離体(関節ねずみ)ができる。疼痛や、遊離体の挟まりによるロッキングを生じる。関節内遊離体はX線で確認できる場合が多い。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://jsoa.or.jp/content/images/2023/05/vol.11_%E9%87%8E%E7%90%83%E8%82%98%E3%83%BB%E3%83%86%E3%83%8B%E3%82%B9%E8%82%98%E3%83%BB%E3%82%B4%E3%83%AB%E3%83%95%E8%82%98.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
  "review": "ai"
 },
 {
  "slug": "ely-test",
  "name": "Elyテスト(大腿直筋の短縮)",
  "category": "検査法・徴候",
  "aliases": [
   "Ely",
   "Elyテスト",
   "Ely test",
   "Ely's test",
   "Elyのテスト",
   "エリーテスト",
   "Duncan-Ely",
   "尻上がり現象",
   "腹臥位で膝関節を屈曲"
  ],
  "rows": [
   {
    "item": "Elyテスト(方法と陽性所見)",
    "target": "大腿直筋の短縮(柔軟性低下)",
    "value": "腹臥位で、検者が患者の膝を他動的に最大まで曲げる(踵を殿部へ近づける)。膝を曲げる途中で患者が股関節を自然に曲げてしまう(骨盤・殿部が台から持ち上がる)か、痛みが出れば陽性で、大腿直筋が短縮していると判断する。",
    "exam": "61-pm-4(腹臥位で膝関節を屈曲させたところ、図のような現象が見られた。短縮が疑われる筋は=大腿直筋(正答)。誤答は大殿筋・腸腰筋・梨状筋・大腿二頭筋。図は、検者が膝を曲げると殿部が持ち上がる場面)",
    "q": [
     "61-pm-4"
    ],
    "note": "確認済み[S1][S2]。[S2]は、骨盤の持ち上がり(hip hiking)や骨盤前傾を代償動作とみなし、ベルトで骨盤を抑えて測っている。大腿直筋が短いと膝を曲げる動きに骨盤が引かれて殿部が上がる、と理解する。61-pm-4の図は問題画像で確認。Thomasテストとの関係はthomas-testのカードも参照。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.physiotutors.com/ja/wiki/elys-test/"
     },
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7575148/"
     }
    ]
   },
   {
    "item": "大腿直筋の走行(なぜ膝を曲げると見えるか)",
    "target": "解剖の理解",
    "value": "大腿直筋は下前腸骨棘(AIIS)から脛骨粗面まで走り、股関節と膝関節の両方をまたぐ筋。そのため短縮していると、膝を曲げたときに股関節側へ引かれて骨盤が動く。",
    "exam": "61-pm-4(大腿直筋が正答。腸腰筋・大殿筋・梨状筋は股関節だけをまたぎ、大腿二頭筋は膝の屈筋で、この現象の説明に合わない選択肢)",
    "q": [
     "61-pm-4"
    ],
    "note": "確認済み[S1](走行)。選択肢ごとの説明(股関節だけをまたぐ等)は、筋の付着からの整理で、資料に書かれた文ではない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.physiotutors.com/ja/wiki/elys-test/"
     }
    ]
   },
   {
    "item": "Elyテストは半月板の検査ではない",
    "target": "検査の取り違えを防ぐ",
    "value": "Elyテストは大腿直筋の長さ(膝を曲げる方向の柔軟性)を見る筋長テスト。半月板損傷の検査は、ApleyテストやMcMurrayテストなど別のテスト(別のカード参照)。",
    "exam": "61-am-30(半月板損傷の診断に有用なテストを2つ選ぶ問題で、Elyテストは誤答選択肢。正答はApleyテストとMcMurrayテスト。他の誤答はLachman・Patrick)",
    "q": [
     "61-am-30"
    ],
    "note": "確認済み[S1][S2]。正答の2つは過去問の公式正答による。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.physiotutors.com/ja/wiki/elys-test/"
     },
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7575148/"
     }
    ]
   },
   {
    "item": "Elyテストの角度の測り方と信頼性",
    "target": "測定・再現性",
    "value": "骨盤をベルトで台に固定し、膝の屈曲角度を角度計(ゴニオメーター)で測る方法では、検者内ICC 0.900・検者間ICC 0.914(良好〜優秀)。真の変化とみなせる最小変化量は約8度。骨盤固定をしない先行研究(Peeler 2008)では、陽性・陰性の一致度はκ=0.52(検者内)・0.46(検者間)、角度のICCは0.69・0.66で、中等度にとどまった。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S2][S3]。無症状の成人71人(平均24.6歳)での値。骨盤の代償動作を抑えると再現性が上がる、という結果。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7575148/"
     },
     {
      "label": "S3",
      "url": "https://pubmed.ncbi.nlm.nih.gov/18186129/"
     }
    ]
   },
   {
    "item": "同じ肢位(腹臥位・膝屈曲)で行う関連テスト",
    "target": "他のテストとの区別",
    "value": "同じような手順(または少し変えた手順)で、仙腸関節の機能障害(Yeomanテスト)、大腿神経の伸張(Nachlasテスト)、大腿直筋の痙縮(Duncan-Elyテスト)も調べられる。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S2]。Elyテスト自体は筋の長さの検査。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7575148/"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
  "review": "ai"
 },
 {
  "slug": "end-feel",
  "name": "最終域感(エンドフィール)",
  "category": "検査法・徴候",
  "aliases": [
   "最終域感",
   "エンドフィール",
   "end feel",
   "end-feel",
   "軟部組織性",
   "軟部組織の接近",
   "靱帯性",
   "関節包性",
   "筋スパズム性",
   "結合組織性",
   "軟部組織の伸張"
  ],
  "rows": [
   {
    "item": "軟部組織性(軟部組織の接近) 膝関節屈曲",
    "target": "正常な膝屈曲の最終域感",
    "value": "膝屈曲の正常な最終域感は軟部組織性(ふくらはぎと太ももの軟部組織が接触して止まる。軟らかく沈み込むような止まり方)。肘関節屈曲も同じ型の例。",
    "exam": "53-am-72(正常な膝屈曲の最終域感。正答=軟部組織性。選択肢は虚性・筋性・骨性・靱帯性・軟部組織性)／52-am-28(正答=軟部組織の接近―膝関節屈曲)",
    "q": [
     "53-am-72",
     "52-am-28"
    ],
    "note": "確認済み[S1][S2][S3]。選択肢の「筋性」「靱帯性」は資料により呼び方が異なる(下の行を参照)。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.un.shijonawate-gakuen.ac.jp/feature/file/open-resource_ot01.pdf"
     },
     {
      "label": "S2",
      "url": "https://sites.google.com/my.shu.ac.uk/anatomyforphysios/anatomy/joints/2c-joint-end-feels"
     },
     {
      "label": "S3",
      "url": "https://book.physiotutors.com/content/knee-assessment/basic-assessment-of-the-knee/passive-range-of-motion-prom-of-the-knee/"
     }
    ]
   },
   {
    "item": "骨性(bone to bone) 肘関節伸展",
    "target": "骨同士がぶつかる最終域感",
    "value": "硬く、急に止まる(痛みを伴わない)。代表例は肘関節伸展(肘頭が肘頭窩に当たる)。",
    "exam": "52-am-28(誤答選択肢: 筋の伸張感―肘関節伸展、骨性―手指MP関節伸展。肘伸展は骨性であり、MP伸展は骨性ではない)",
    "q": [
     "52-am-28"
    ],
    "note": "確認済み[S1][S2]。MP関節伸展は下の「結合組織性」の例として挙げられている[S2]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.un.shijonawate-gakuen.ac.jp/feature/file/open-resource_ot01.pdf"
     },
     {
      "label": "S2",
      "url": "https://sites.google.com/my.shu.ac.uk/anatomyforphysios/anatomy/joints/2c-joint-end-feels"
     }
    ]
   },
   {
    "item": "結合組織性(組織の伸張・firm) 関節包・靱帯",
    "target": "関節包や靱帯が伸ばされて止まる最終域感",
    "value": "硬いが弾力があり、徐々に止まる。例: 肩関節外旋、手関節背屈、股関節伸展(S1)。英語資料では肩外旋・膝伸展・MP関節伸展を例に挙げる(S2)。",
    "exam": "52-am-28(誤答選択肢: 骨性―手指MP関節伸展、靱帯の伸張―SLR、関節包の伸張―前腕回外。SLRや前腕回外の最終域感は資料で個別に確認できていない)",
    "q": [
     "52-am-28"
    ],
    "note": "確認済み[S1][S2]。日本の資料では「結合組織性」、国試の選択肢では「靱帯性」「関節包の伸張」と書かれ、呼び名が揃わない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.un.shijonawate-gakuen.ac.jp/feature/file/open-resource_ot01.pdf"
     },
     {
      "label": "S2",
      "url": "https://sites.google.com/my.shu.ac.uk/anatomyforphysios/anatomy/joints/2c-joint-end-feels"
     }
    ]
   },
   {
    "item": "異常な最終域感(虚性・筋スパズム性・関節包性・ばね様)",
    "target": "病的な最終域感の種類と意味",
    "value": "虚性(empty): 抵抗を感じる前に強い痛みで運動を拒む／筋スパズム性: 可動域の途中で急に止まる(防御性収縮)／関節包性: 硬く止まる(関節包の短縮・線維化、凍結肩など)／ばね様: 弾力のある抵抗で跳ね返される(関節内遊離体・半月板損傷など)。",
    "exam": "53-am-72(誤答選択肢に虚性・筋性が含まれる。正常な膝屈曲の最終域感としては不適)",
    "q": [
     "53-am-72"
    ],
    "note": "確認済み[S1]。英語資料(S2)では異常を hard/soft/firm/empty で分けており、分類は資料により異なる。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.un.shijonawate-gakuen.ac.jp/feature/file/open-resource_ot01.pdf"
     },
     {
      "label": "S2",
      "url": "https://sites.google.com/my.shu.ac.uk/anatomyforphysios/anatomy/joints/2c-joint-end-feels"
     }
    ]
   },
   {
    "item": "最終域感の見方と使い道",
    "target": "可動域制限の原因の推定",
    "value": "他動運動の最終域で検者の手に伝わる「動きの止まり方」。角度だけでなく止まり方の質も合わせて評価し、可動域制限の原因(制限因子)を推定する。正常な関節でも本来と違う質・タイミングで出れば異常と判定する。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。大学の公開講義資料にもとづく。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.un.shijonawate-gakuen.ac.jp/feature/file/open-resource_ot01.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
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
  "slug": "enjoji-developmental-test",
  "name": "遠城寺式乳幼児分析的発達検査(九大小児科改訂版)",
  "category": "評価尺度",
  "aliases": [
   "遠城寺式",
   "遠城寺式乳幼児分析的発達検査",
   "遠城寺式発達検査",
   "九大小児科改訂版",
   "乳幼児分析的発達検査",
   "発達検査表",
   "つたい歩き",
   "人見知り"
  ],
  "rows": [
   {
    "item": "0歳11か月の段(つたい歩き・コップ・人見知り)",
    "target": "乳児期後半の発達の目安",
    "value": "0:11の段=移動運動「つたい歩きをする」／手「おもちゃの車を手で走らせる」／基本的習慣「コップを自分で持って飲む」／対人関係「人見知りをする」／発語「音声をまねようとする」／言語理解「「バイバイ」「さようなら」に反応する」",
    "exam": "61-am-85(獲得が最も早い=人見知りをする=正答。誤答:走る・2語言える・排尿を予告する・積み木を2つ重ねる)／58-pm-86(12か月以前=人見知り・コップを自分で持って飲むが正答)／50-am-29(11か月のコップを自分で持って飲む=正答)／51-am-35(つたい歩きの時期に可能=コップを自分で持って飲む=正答)",
    "q": [
     "61-am-85",
     "58-pm-86",
     "50-am-29",
     "51-am-35"
    ],
    "note": "確認済み[S1]。新潟県医師会の乳幼児健診の手引に転載された検査表(九大小児科改訂版)の文字情報で確認。月齢は表の月齢欄の表記(段)。原典は遠城寺宗徳・合屋長英らの検査法(慶応通信)で、実施は原典の手引に従う。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.hapiny.niigata.jp/download/h27_sannkousiryou5.pdf"
     }
    ]
   },
   {
    "item": "1歳2か月の段(お菓子のつつみ紙・2語)",
    "target": "1歳台前半の発達の目安",
    "value": "1:2の段=移動「2〜3歩あるく」／手「コップの中の小粒をとり出そうとする」／基本的習慣「お菓子のつつみ紙をとって食べる」／対人「ほめられると同じ動作をくり返す」／発語「2語言える」／言語理解「要求を理解する(3/3)」",
    "exam": "56-am-92(1歳6か月までに獲得=お菓子のつつみ紙をとって食べる=正答)／51-am-35(誤答:2語言える)",
    "q": [
     "56-am-92",
     "51-am-35"
    ],
    "note": "確認済み[S1]。新潟県医師会の乳幼児健診の手引に転載された検査表(九大小児科改訂版)の文字情報で確認。月齢は表の月齢欄の表記(段)。原典は遠城寺宗徳・合屋長英らの検査法(慶応通信)で、実施は原典の手引に従う。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.hapiny.niigata.jp/download/h27_sannkousiryou5.pdf"
     }
    ]
   },
   {
    "item": "1歳4〜6か月の段(積木2つ・3語・走る)",
    "target": "1歳台後半の発達の目安",
    "value": "1:4の段=靴をはいて歩く／積木を二つ重ねる／自分の口もとをひとりでふこうとする／簡単な手伝いをする／3語言える／簡単な命令を実行する。1:6の段=走る／コップからコップへ水をうつす／パンツをはかせるとき両足をひろげる／困難なことに出会うと助けを求める",
    "exam": "61-am-85・58-pm-86・51-am-35(誤答選択肢の走る・3語言える・積み木を2つ重ねる。いずれも0:11の段より後)／50-am-29(誤答:12か月の積木を2つ重ねる=表では1:4の段)",
    "q": [
     "61-am-85",
     "58-pm-86",
     "51-am-35",
     "50-am-29"
    ],
    "note": "確認済み[S1]。新潟県医師会の乳幼児健診の手引に転載された検査表(九大小児科改訂版)の文字情報で確認。月齢は表の月齢欄の表記(段)。原典は遠城寺宗徳・合屋長英らの検査法(慶応通信)で、実施は原典の手引に従う。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.hapiny.niigata.jp/download/h27_sannkousiryou5.pdf"
     }
    ]
   },
   {
    "item": "2歳0か月の段(ボールを前にける 等)",
    "target": "2歳前後の発達の目安",
    "value": "2:0の段=ボールを前にける／積木を横に二つ以上ならべる／排尿を予告する／親から離れて遊ぶ／二語文を話す／「もうひとつ」「もうすこし」がわかる",
    "exam": "56-am-92(誤答:ボールを前にける・積木を横に二つ以上ならべる・親から離れて遊ぶ)／61-am-85(誤答:排尿を予告する)／51-am-35(誤答:ボールを前に蹴る)",
    "q": [
     "56-am-92",
     "61-am-85",
     "51-am-35"
    ],
    "note": "確認済み[S1]。新潟県医師会の乳幼児健診の手引に転載された検査表(九大小児科改訂版)の文字情報で確認。月齢は表の月齢欄の表記(段)。原典は遠城寺宗徳・合屋長英らの検査法(慶応通信)で、実施は原典の手引に従う。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.hapiny.niigata.jp/download/h27_sannkousiryou5.pdf"
     }
    ]
   },
   {
    "item": "2歳6か月の段(直線・姓名・大小)",
    "target": "2歳台後半の発達の目安",
    "value": "2:6の段=足を交互に出して階段をあがる／まねて直線を引く／こぼさないでひとりで食べる／友達とけんかをすると言いつけにくる／自分の姓名を言う／大きい、小さいがわかる",
    "exam": "50-am-29(誤答:15か月の自分の姓名を言う=表では2:6の段)／51-am-35(誤答:まねて直線を引く)／56-am-92(誤答:大きい小さいがわかる)",
    "q": [
     "50-am-29",
     "51-am-35",
     "56-am-92"
    ],
    "note": "確認済み[S1]。新潟県医師会の乳幼児健診の手引に転載された検査表(九大小児科改訂版)の文字情報で確認。月齢は表の月齢欄の表記(段)。原典は遠城寺宗徳・合屋長英らの検査法(慶応通信)で、実施は原典の手引に従う。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.hapiny.niigata.jp/download/h27_sannkousiryou5.pdf"
     }
    ]
   },
   {
    "item": "0歳5〜10か月の段(笑いかける・つかまり立ち)",
    "target": "乳児期の発達の目安",
    "value": "0:5の段=基本的習慣「おもちゃを見ると動きが活発になる」／対人「人を見ると笑いかける」。0:9の段=移動「ものにつかまって立っている」。0:10の段=移動「つかまって立ちあがる」／対人「身ぶりをまねする」",
    "exam": "50-am-29(誤答:5か月の人見知り=表の人見知りは0:11の段、6か月のものにつかまって立つ=表では0:9〜0:10の段)",
    "q": [
     "50-am-29"
    ],
    "note": "確認済み[S1]。新潟県医師会の乳幼児健診の手引に転載された検査表(九大小児科改訂版)の文字情報で確認。月齢は表の月齢欄の表記(段)。原典は遠城寺宗徳・合屋長英らの検査法(慶応通信)で、実施は原典の手引に従う。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.hapiny.niigata.jp/download/h27_sannkousiryou5.pdf"
     }
    ]
   },
   {
    "item": "検査の構成(6領域・月齢の刻み)",
    "target": "検査の枠組み",
    "value": "6領域=移動運動・手の運動・基本的習慣・対人関係・発語・言語理解(運動・社会性・言語にまとまる)。表の月齢は0:0〜4:8。段の刻みは1歳まで1か月、1:0〜1:6は2か月、1:6〜3:0は3か月、3:0以降は4か月",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。新潟県医師会の乳幼児健診の手引に転載された検査表(九大小児科改訂版)の文字情報で確認。月齢は表の月齢欄の表記(段)。原典は遠城寺宗徳・合屋長英らの検査法(慶応通信)で、実施は原典の手引に従う。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.hapiny.niigata.jp/download/h27_sannkousiryou5.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "epilepsy-seizure-types",
  "name": "てんかん発作型(ILAE2017)と小児欠神てんかん",
  "category": "診断基準・分類",
  "aliases": [
   "てんかん",
   "欠神発作",
   "小児欠神てんかん",
   "定型欠神発作",
   "単純部分発作",
   "複雑部分発作",
   "焦点起始発作",
   "全般起始発作",
   "焦点意識保持発作",
   "焦点意識減損発作",
   "側頭葉てんかん",
   "内側側頭葉てんかん",
   "特発性てんかん",
   "特発性全般てんかん",
   "過換気",
   "3Hz棘徐波",
   "棘徐波複合"
  ],
  "rows": [
   {
    "item": "欠神発作(定型欠神発作)",
    "target": "全般起始の非運動発作",
    "value": "全般起始の非運動発作。突然の動作停止と意識消失があり、起始・終了が速やか。焦点意識減損発作より低年齢で起こりやすく、機能の回復も速い。脳波は規則的な3Hz(2.5〜4Hz)の全般性棘徐波複合。",
    "exam": "49-pm-97(「欠神発作について正しいのは」。正答=学童期の発症が多い。誤答=知的障害を伴う・チアノーゼを伴う・部分発作に分類される・けいれんは一側上肢から全身に広がる)／52-pm-99(正答の1つ=欠神発作は過換気によって誘発される)",
    "q": [
     "49-pm-97",
     "52-pm-99"
    ],
    "note": "確認済み[S1][S2]。チアノーゼの有無は開いた資料では確認できていない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.pref.chiba.lg.jp/junkan/shinryoka/shinkate/documents/tenkanbunrui2017.pdf"
     },
     {
      "label": "S2",
      "url": "https://eprints.gla.ac.uk/270405/1/270405.pdf"
     }
    ]
   },
   {
    "item": "小児欠神てんかん(CAE)の臨床像",
    "target": "典型的な欠神発作を呈するてんかん症候群",
    "value": "発症は4〜10歳が典型(範囲2〜13歳)。発達・神経学的所見は通常正常(知的障害は例外的)。女児にやや多い(60〜75%)。約60%は思春期早期までに寛解。診断基準では典型欠神発作と3Hz(2.5〜4Hz)の全般性棘徐波が必須で、欠神発作の頻発期の前後に全般強直間代発作(GTCS)がある場合などは除外項目。",
    "exam": "49-pm-97(正答=学童期の発症が多い)",
    "q": [
     "49-pm-97"
    ],
    "note": "確認済み[S1]。若年欠神てんかんは典型発症9〜13歳(範囲8〜20歳)で、小児欠神てんかんと区別される[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://eprints.gla.ac.uk/270405/1/270405.pdf"
     }
    ]
   },
   {
    "item": "過呼吸(過換気)による誘発",
    "target": "脳波検査の賦活法",
    "value": "小児欠神てんかんでは約3分間の過換気で全般性棘徐波が誘発される(未治療で過換気がきちんとできたのに誘発されなければCAEは除外)。初回のてんかん性発作では、光刺激・過呼吸・睡眠を含めた脳波の記録が推奨される。",
    "exam": "52-pm-99(正答の1つ=欠神発作は過換気によって誘発される)",
    "q": [
     "52-pm-99"
    ],
    "note": "確認済み[S1][S2]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://eprints.gla.ac.uk/270405/1/270405.pdf"
     },
     {
      "label": "S2",
      "url": "https://neurology-jp.org/guidelinem/epgl/tenkan_2018_01.pdf"
     }
    ]
   },
   {
    "item": "焦点発作の意識による区別と全般発作(旧・単純/複雑部分発作との対応)",
    "target": "発作型の分類",
    "value": "焦点意識保持発作=旧「単純部分発作」(意識障害なし)／焦点意識減損発作=旧「複雑部分発作」(発作のどの時点でも意識障害があればこちら)。全般起始発作は起始時から両側大脳半球のネットワークが関与する(片側にとどまらない)。",
    "exam": "52-pm-99(誤答=「単純部分発作は意識障害がみられる」「全般発作は発作開始時にてんかん放電が大脳半球の片側にとどまっている」)",
    "q": [
     "52-pm-99"
    ],
    "note": "確認済み[S1][S2]。1981年分類では単純部分発作は「意識減損はない」、複雑部分発作は「意識障害あり」[S2]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.pref.chiba.lg.jp/junkan/shinryoka/shinkate/documents/tenkanbunrui2017.pdf"
     },
     {
      "label": "S2",
      "url": "https://neurology-jp.org/guidelinem/epgl/tenkan_2018_01.pdf"
     }
    ]
   },
   {
    "item": "側頭葉てんかん(海馬硬化を伴う内側側頭葉てんかん)の発作",
    "target": "複雑部分発作(焦点意識減損発作)をきたす代表的な型",
    "value": "上腹部不快感などの前兆(ないこともある)の後に意識減損し、強直や口・手の自動症を呈し、発作後にもうろう状態となる。発症は6〜14歳に多い。薬剤抵抗性になりやすい。",
    "exam": "52-pm-99(正答の1つ=「複雑部分発作は側頭葉てんかんに多くみられる」)",
    "q": [
     "52-pm-99"
    ],
    "note": "確認済み[S1]。資料は指定難病「海馬硬化を伴う内側側頭葉てんかん」の概要で、側頭葉てんかん全般で複雑部分発作が最も多いとまでは、ここでは確認できていない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.mhlw.go.jp/file/06-Seisakujouhou-10900000-Kenkoukyoku/0000157154.docx"
     }
    ]
   },
   {
    "item": "特発性てんかん",
    "target": "病因による分類(1989年分類)",
    "value": "特発性部分てんかん=小児期に発症・画像所見で異常なし・思春期までに寛解。特発性全般てんかん=25歳以上の発症はまれで他の神経症候なし。特発性全般てんかんと特発性部分てんかんでは器質的異常の頻度がきわめて低い。2017年のILAE分類では「特発性」は「素因性」に置き換えられたが、小児欠神・若年欠神・若年ミオクロニー・全般強直間代発作のみの4症候群は「特発性全般てんかん」の名称が残された。",
    "exam": "52-pm-99(誤答=「特発性てんかんは脳の器質的病変が特定できる」)",
    "q": [
     "52-pm-99"
    ],
    "note": "確認済み[S1][S2][S3]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://neurology-jp.org/guidelinem/epgl/tenkan_2018_01.pdf"
     },
     {
      "label": "S2",
      "url": "https://neurology-jp.org/guidelinem/epgl/tenkan_2018_02.pdf"
     },
     {
      "label": "S3",
      "url": "https://www.jstage.jst.go.jp/article/manms/18/4/18_333/_pdf/-char/ja"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "esr",
  "name": "赤血球沈降速度(赤沈・ESR)",
  "category": "臨床検査",
  "aliases": [
   "赤血球沈降速度",
   "赤沈",
   "血沈",
   "ESR",
   "Westergren法",
   "ウェスターグレン法"
  ],
  "rows": [
   {
    "item": "赤沈が低下する(遅くなる)病態",
    "target": "赤沈の低下",
    "value": "多血症(赤血球が多すぎる)、低フィブリノゲン血症、著明な白血球増多、鎌状赤血球症など赤血球の形の異常、高粘稠度をきたす異常蛋白血症など。DICも低下の原因に挙げる資料があり、DICの急速に進むタイプではフィブリノゲンが急激に低下する。",
    "exam": "51-am-85「赤血球沈降速度が低下するのはどれか」の正答=播種性血管内凝固症候群(DIC)(選択肢: 貧血・肝硬変・悪性腫瘍・細菌感染・DIC)。",
    "q": [
     "51-am-85"
    ],
    "note": "一部確認。AAFP[S2]は低フィブリノゲン血症などで低下と記し、DICの語は出ない。DICの記載は[S3](Wiki型の救急医学リファレンス)で、フィブリノゲン低下は[S4]。DICで下がる理由はフィブリノゲン低下からの学習用の整理。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.aafp.org/pubs/afp/issues/1999/1001/p1443.html"
     },
     {
      "label": "S3",
      "url": "https://wikem.org/wiki/ESR/ja"
     },
     {
      "label": "S4",
      "url": "https://www.msdmanuals.com/ja-jp/professional/11-血液学および腫瘍学/凝固障害/播種性血管内凝固症候群-dic"
     }
    ]
   },
   {
    "item": "赤沈が亢進する(速くなる)病態",
    "target": "赤沈の亢進",
    "value": "貧血、感染症、炎症、悪性腫瘍、フィブリノゲンが増える状態(妊娠・糖尿病・腎不全・心疾患・膠原病など)。高齢・女性でも高め。貧血では赤血球の密度が下がり、凝集塊が速く沈む。",
    "exam": "51-am-85 の誤答(赤沈が亢進する側)=貧血・悪性腫瘍・細菌感染。肝硬変も誤答だが、赤沈の向きは資料で確認できなかった。",
    "q": [
     "51-am-85"
    ],
    "note": "確認済み[S2]。肝硬変と赤沈の関係は[S2][S3]に記載がなく、このカードでは判断しない。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.aafp.org/pubs/afp/issues/1999/1001/p1443.html"
     },
     {
      "label": "S3",
      "url": "https://wikem.org/wiki/ESR/ja"
     }
    ]
   },
   {
    "item": "赤沈のしくみと測定法",
    "target": "測定の原理",
    "value": "抗凝固した血液を縦の管に立て、1時間に赤血球が沈んだ距離(mm)を測る。主な決め手はフィブリノゲンで、血中のフィブリノゲン量と赤沈は直接相関する。Westergren法が標準的に使われる。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S2]。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.aafp.org/pubs/afp/issues/1999/1001/p1443.html"
     }
    ]
   },
   {
    "item": "赤沈の基準値",
    "target": "基準範囲",
    "value": "施設の例(京都大学病院検査部): 男性2〜10 mm/時、女性3〜15 mm/時。AAFPの上限の目安: 50歳未満は男15・女20 mm/時、50歳以上は男20・女30 mm/時。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1][S2]。基準は施設・方法・年齢で異なるため、各施設の値で読む。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://clinlab.kuhp.kyoto-u.ac.jp/wp-content/uploads/2024/10/kensa_setumei_ketueki.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.aafp.org/pubs/afp/issues/1999/1001/p1443.html"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
  "review": "ai"
 },
 {
  "slug": "evidence-level",
  "name": "エビデンスレベル(研究デザインとエビデンスの強さ)",
  "category": "診断基準・分類",
  "aliases": [
   "エビデンスレベル",
   "エビデンスの強さ",
   "エビデンスの質",
   "エビデンスの確実性",
   "症例集積研究",
   "症例報告",
   "診療ガイドライン",
   "推奨グレード",
   "Minds"
  ],
  "rows": [
   {
    "item": "研究デザインごとの出発点の評価",
    "target": "エビデンスの強さの初期評価(Minds)",
    "value": "RCTのみのエビデンス総体=強。観察研究(コホート・症例対照)のみ=弱。症例報告・症例集積のみ=とても弱。最終はA強・B中・C弱・D非常に弱に分類",
    "exam": "54-pm-21(最もエビデンスレベルが高い=無作為化比較試験が正答。誤答:コホート研究・症例集積研究・症例対照研究・症例報告)",
    "q": [
     "54-pm-21"
    ],
    "note": "確認済み[S1]。RCTが1件しかないときは、原則弱と判定し内容を吟味するなどの例外がある[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jspm.ne.jp/files/specialistCertification/seminar/manual_4_2017.pdf"
     }
    ]
   },
   {
    "item": "エビデンスの強さの判定のしかた",
    "target": "診療ガイドライン作成での評価",
    "value": "研究デザインを出発点に、評価を下げる5項目・上げる3項目を検討し、メタアナリシスができれば行い、総合して決める。研究報告1件ごとの研究デザインだけでレベル付けする必要はない",
    "exam": "49-am-49(診療ガイドラインについて。誤答:エビデンスレベルは統計的に計算される／推奨グレードに従う義務がある／理学療法のガイドラインは存在しない／主に評価と診断の妥当性を示す。正答は世界で統一の方法を示したものではない)",
    "q": [
     "49-am-49"
    ],
    "note": "確認済み[S1]。判定は項目を総合する作業と書かれており、単純な統計計算とは書かれていない。49-am-49の正答(世界で統一の方法ではない)そのものは、この資料では直接確認していない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jspm.ne.jp/files/specialistCertification/seminar/manual_4_2017.pdf"
     }
    ]
   },
   {
    "item": "エビデンスに関する用語",
    "target": "質・レベル・強さ・確実性",
    "value": "質・レベル・限界・強さ・確信度・確実性は同じ意味で使われてきた。Mindsは広い意味の評価を「エビデンスの確実性」とし、推奨作成の段階では「エビデンスの強さ」を用いる",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jspm.ne.jp/files/specialistCertification/seminar/manual_4_2017.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "exercise-circulatory-response",
  "name": "動的運動時の循環応答(末梢血管抵抗・心拍出量・平均血圧)",
  "category": "リスク管理",
  "aliases": [
   "末梢血管抵抗",
   "総末梢血管抵抗",
   "全身血管抵抗",
   "動的運動",
   "運動時の循環応答",
   "運動時の血圧",
   "自転車エルゴメータ",
   "運動時の心拍出量"
  ],
  "rows": [
   {
    "item": "運動時の末梢血管抵抗",
    "target": "ランニング・自転車など大きな筋群を使う動的運動",
    "value": "大きな筋群を使う運動では、筋の血管で代謝性の血管拡張が起こり、全身の血管抵抗(末梢血管抵抗)が低下する。",
    "exam": "58-am-39(健常者が自転車エルゴメータで中等度負荷を20分行ったとき、運動前より低下するもの。正答=末梢血管抵抗。誤答=SpO2・収縮期血圧・心拍数・体温)",
    "q": [
     "58-am-39"
    ],
    "note": "確認済み[S1][S2](英語の総説)。この資料では運動時の心拍数は増加すると記載。収縮期血圧と体温が上がることは、この資料では確認できていない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4628760"
     },
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4000959"
     }
    ]
   },
   {
    "item": "運動時の心拍出量・心拍数",
    "target": "動的運動時の循環調節",
    "value": "心拍出量は心拍数(HR)と一回拍出量(SV)の増加により増え、末梢血管抵抗の低下による血圧低下を打ち消す。心拍数の増加には副交感神経の活動低下と交感神経の活動亢進が関わる。",
    "exam": "58-am-39(心拍数は運動で増加するため、「運動前より低下するもの」としては誤答)",
    "q": [
     "58-am-39"
    ],
    "note": "確認済み[S2]",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4000959"
     }
    ]
   },
   {
    "item": "運動時の平均血圧",
    "target": "動的運動時の血圧調節",
    "value": "末梢血管抵抗が大きく低下しても、健常者の動的運動で平均血圧(MAP)の上昇は小〜中等度にとどまる。圧受容器反射が筋の血管拡張と心拍数を調節し、血圧の過度な変動を防ぐ。",
    "exam": "58-am-39(収縮期血圧は誤答選択肢。この資料では収縮期血圧の変化の数値は確認できていない)",
    "q": [
     "58-am-39"
    ],
    "note": "確認済み[S1]。収縮期血圧・拡張期血圧の個別の変化は、この資料では確認できていない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4628760"
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
   "CPX",
   "心肺運動負荷試験",
   "嫌気性代謝閾値",
   "ランプ負荷",
   "1RM",
   "%1RM",
   "レジスタンス運動",
   "筋力増強運動",
   "インターバルトレーニング",
   "最大心拍数",
   "運動負荷量"
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
  "slug": "exercise-test-types",
  "name": "運動負荷試験の方式(マスター二階段・踏み台昇降・ハンドグリップ)",
  "category": "臨床検査",
  "aliases": [
   "マスターシングルテスト",
   "マスターシングル",
   "マスター2階段試験",
   "マスターダブル",
   "踏み台昇降テスト",
   "踏み台昇降",
   "ハーバードステップテスト",
   "Harvard step test",
   "ハンドグリップテスト",
   "ハンドグリップ",
   "Bruceプロトコル",
   "運動負荷心電図",
   "運動負荷試験"
  ],
  "rows": [
   {
    "item": "Bruce法(段階的に負荷を増やす方式)",
    "target": "運動負荷量を段階的に増加させる評価法",
    "value": "トレッドミルの速度と傾斜を、約3分ごとに上げていく多段階の漸増負荷(Bruceプロトコルは最も頻用される)。目標は年齢別の予測最大心拍数の85%、または症状が出るまで。",
    "exam": "50-pm-46(運動負荷量を段階的に増加させる評価法はどれか。正答=Bruce法。誤答選択肢=踏み台昇降テスト・12分間歩行テスト・ハンドグリップテスト・マスターシングルテスト)",
    "q": [
     "50-pm-46"
    ],
    "note": "確認済み[S1]。各段階の速度・傾斜の数値は[S1]に記載がなく、書いていない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/04-%E5%BF%83%E8%A1%80%E7%AE%A1%E7%96%BE%E6%82%A3/%E5%BF%83%E8%A1%80%E7%AE%A1%E7%B3%BB%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E6%A4%9C%E6%9F%BB%E3%81%8A%E3%82%88%E3%81%B3%E6%89%8B%E6%8A%80/%E8%B2%A0%E8%8D%B7%E8%A9%A6%E9%A8%93"
     }
    ]
   },
   {
    "item": "マスター二階段試験(マスターシングルテスト)",
    "target": "運動負荷心電図(虚血・不整脈の判定)。固定負荷の方式",
    "value": "高さ23 cmの二段の階段を、ステップ音に合わせて往復(昇降)し、前後の心電図を記録する。回数や時間は、症状・年齢・体重・性別で変える。負荷は段階的に増やさず、決めた量を一度に行う(単一段階の固定負荷)。",
    "exam": "50-pm-46(誤答選択肢=マスターシングルテスト。段階的増加ではない)／58-am-19(NYHA III・僧帽弁形成術後の退院時の運動機能評価で、誤答選択肢。正答は6分間歩行テスト)",
    "q": [
     "50-pm-46",
     "58-am-19"
    ],
    "note": "確認済み[S2][S3]。「固定(単一段階)負荷」の分類は[S3](看護学習サイト)の記述。学会資料では未確認。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://tokyo-hp.hosp.go.jp/bumon/kensa/pdf/fuka.pdf"
     },
     {
      "label": "S3",
      "url": "https://www.kango-roo.com/learning/1502/"
     }
    ]
   },
   {
    "item": "マスター試験のシングル・ダブル・トリプル",
    "target": "マスター二階段試験の負荷量の違い",
    "value": "シングル=年齢・性別・体重から決めた昇降回数を1分30秒で行う。ダブル=回数を2倍にして3分、トリプル=3倍にして4分30秒。運動後は直ちに仰臥位で心電図を記録し、直後・3分後・5分後(必要に応じ10分後)にも記録する。運動中は心電図をモニターしないので、胸痛などがあれば中止する。",
    "exam": "出題は直接なし(参考)。選択肢「マスターシングルテスト」の意味を確かめる行",
    "q": [],
    "note": "確認済み[S3]。看護学習サイトの記述で、学会資料では回数の表などを確認していない。",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://www.kango-roo.com/learning/1502/"
     }
    ]
   },
   {
    "item": "踏み台昇降テスト",
    "target": "全身持久力の評価(一定負荷の方式)",
    "value": "健康長寿ネットの方式: 踏み台の高さは男性40 cm・女性35 cm。1分間に30回(2秒に1回)のペースで3分間昇降する。運動終了後の1〜1分30秒、2〜2分30秒、3〜3分30秒に、座位で心拍数を測る。得点=(180[秒]÷3回分の心拍数の和×2)×100。同じ昇降を繰り返す一定の負荷で行う。",
    "exam": "50-pm-46(誤答選択肢=踏み台昇降テスト。段階的に負荷を増やす方式ではない)",
    "q": [
     "50-pm-46"
    ],
    "note": "確認済み[S4]。踏み台の高さ・時間はテストにより異なる(下の行を参照)。",
    "conflict": false,
    "sources": [
     {
      "label": "S4",
      "url": "https://www.tyojyu.or.jp/net/kenkou-tyoju/tairyoku-kiki/fumidai.html"
     }
    ]
   },
   {
    "item": "ハーバードステップテスト(原法)との違い",
    "target": "踏み台昇降テストの由来・条件の違い",
    "value": "日本の踏み台昇降テストは、ハーバード大学のステップテストを日本人向けに改変したもの。時間は5分から3分に短縮され、台の高さは20インチ(50.8 cm)から男性40 cm・女性35 cmに変更されている。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S4]。海外の記載では原法の台は男性50.8 cm・女性40 cmなど資料により異なる。",
    "conflict": false,
    "sources": [
     {
      "label": "S4",
      "url": "https://www.tyojyu.or.jp/net/kenkou-tyoju/tairyoku-kiki/fumidai.html"
     }
    ]
   },
   {
    "item": "ハンドグリップ(等尺性運動)の負荷",
    "target": "等尺性運動の循環器反応(血圧上昇)をみる負荷",
    "value": "握力計を一定の力で握り続ける等尺性運動。研究で多い方法は、最大随意収縮(MVC)の30%で2分間の収縮を4セット。急性反応として血圧が上がり、握る強さが大きいほど上昇が大きい(統合値: 収縮期+33.4 mmHg・拡張期+25.1 mmHg。≦30% MVCで+27.5/+20.1、30超〜60% MVCで+40.7/+31.9 mmHg)。膝伸展やデッドリフトなど大きな筋群を使う等尺性運動の方が、さらに血圧反応が大きい。",
    "exam": "50-pm-46(誤答選択肢=ハンドグリップテスト。等尺性の負荷で、段階的に増やす評価法ではない)／58-am-19(誤答選択肢。退院時の運動機能評価には不適。正答は6分間歩行テスト)",
    "q": [
     "50-pm-46",
     "58-am-19"
    ],
    "note": "確認済み[S5](等尺性運動のメタ解析。数値は研究の統合値で、診断用の標準手順ではない)。「ハンドグリップテスト」を運動負荷試験として行う標準的な手順は、今回の資料では確認できなかったため書いていない。",
    "conflict": false,
    "sources": [
     {
      "label": "S5",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11273125"
     }
    ]
   },
   {
    "item": "退院時の運動耐容能の評価(6分間歩行試験)",
    "target": "心疾患患者の運動機能・運動耐容能の評価",
    "value": "6分間歩行試験は、6分間歩行距離(6MWD)を測る運動耐容能の評価法。心肺運動負荷試験のpeak VO2との相関が高く、予後の推定にも使われる。弱点は、施設間の比較が難しいこと、実施方法の影響を受けること、繰り返すと成績が上がること。",
    "exam": "58-am-19(NYHA III・僧帽弁閉鎖不全症の術後、退院時の運動機能評価。正答=6分間歩行テスト。誤答=クリニカルシナリオ分類・マスターシングルテスト・Nohria-Stevenson分類・ハンドグリップテスト)",
    "q": [
     "58-am-19"
    ],
    "note": "確認済み[S6]。クリニカルシナリオ・Nohria-Stevenson分類は急性心不全の病態分類で、運動機能評価ではない点は[S6]で未確認(国試の解答の整理)。6MWTの手順は既存の「6分間歩行テスト(6MWT)」カードを参照。",
    "conflict": false,
    "sources": [
     {
      "label": "S6",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2021/03/JCS2021_Makita.pdf"
     }
    ]
   },
   {
    "item": "運動負荷試験(運動負荷心電図)の位置づけとマスターシングル試験",
    "target": "運動負荷心電図の目的、心臓リハでの使われ方",
    "value": "運動負荷試験(いわゆる運動負荷心電図)は、呼気ガス分析を併用しない運動負荷試験で、運動による心拍数・血圧の反応の評価や、虚血の心電図診断に使う。心筋梗塞の心臓リハのクリティカルパス例では、心臓リハビリ室での運動療法の段階に「非エントリー例ではマスターシングル試験またはシャワー浴負荷試験」と書かれている(「非エントリー例」の意味は本文で確認していない)。",
    "exam": "出題は直接なし(参考。58-am-19・50-pm-46のマスターシングルテストの位置づけ)",
    "q": [],
    "note": "確認済み[S6]",
    "conflict": false,
    "sources": [
     {
      "label": "S6",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2021/03/JCS2021_Makita.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
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
  "slug": "fact-g",
  "name": "FACT(Functional Assessment of Cancer Therapy)",
  "category": "評価尺度",
  "aliases": [
   "FACT-G",
   "Functional Assessment of Cancer Therapy",
   "FACT-B",
   "FACT-F",
   "がん患者のQOL尺度",
   "がん治療の機能評価",
   "FACT-G7",
   "FACT-8D"
  ],
  "rows": [
   {
    "item": "FACT-G(がん一般用QOL尺度)",
    "target": "がん患者の健康関連QOL",
    "value": "27項目・4領域(身体面7、社会/家族面7、心理面6、機能面7)。各項目0(全くない)〜4(非常にある)の5段階で、合計0〜108点、高いほどQOLが良い",
    "exam": "59-am-20(誤答選択肢:FACT。問いは乳癌周術期の「活動能力の評価方法」で、正答はKPS。FACTはQOL尺度で活動能力の評価ではない)",
    "q": [
     "59-am-20"
    ],
    "note": "確認済み[S1][S2][S3]。27項目・4領域・0〜4はS1、各領域の項目数はS2(日本語版の資料)、合計0〜108点はS3。想起期間は本文で確認できていないため載せない",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://qol.thoracic.org/sections/instruments/fj/pages/fact-g.html"
     },
     {
      "label": "S2",
      "url": "https://www.jmari.med.or.jp/download/WP056.pdf"
     },
     {
      "label": "S3",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10448388/"
     }
    ]
   },
   {
    "item": "FACTの追加尺度(がん種・症状別)",
    "target": "FACT-Gに足して使う尺度",
    "value": "FACT-G に疾患・症状ごとの追加項目を足して使う。例: FACT-B(乳癌用)=FACT-G+乳癌特異面9項目、FACT-F(疲労用)、FACT-O(卵巣癌用)、FACT-Cx(子宮頸癌用)、FACT-P(前立腺癌用)など",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S2]。2001年時点の日医総研の資料で、日本語版の整備状況の記載。現在の状況は未確認",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.jmari.med.or.jp/download/WP056.pdf"
     }
    ]
   },
   {
    "item": "FACT-G7(簡易版)",
    "target": "短時間でQOLを見る",
    "value": "FACT-Gの優先度の高い7項目の簡易版。身体面(疲労・痛み・吐き気)、心理面(病状悪化への心配)、機能面(人生を楽しめること・現在のQOLへの満足・睡眠)から選ばれ、合計0〜28点で高いほど良好",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S3]",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10448388/"
     }
    ]
   },
   {
    "item": "FACT-8D",
    "target": "QALY算出用の選好に基づく尺度",
    "value": "FACT-Gの27項目のうち9項目を使い、8つの領域(吐き気・痛み・疲労・睡眠・仕事・心配・悲しみ・家族や友人の支え)から健康効用値を算出する",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S4]。日本の効用値の報告(Health Qual Life Outcomes 2025)",
    "conflict": false,
    "sources": [
     {
      "label": "S4",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC12574001/"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
  "review": "ai"
 },
 {
  "slug": "fall-risk-factors",
  "name": "高齢者の転倒リスク因子",
  "category": "リスク管理",
  "aliases": [
   "転倒リスク",
   "転倒の危険因子",
   "転倒リスク因子",
   "転倒予防",
   "転倒歴",
   "内的因子",
   "外的因子",
   "転倒危険因子"
  ],
  "rows": [
   {
    "item": "転倒の原因の構造",
    "target": "転倒を多因子で考える枠組み",
    "value": "原因はたいてい多因子。内的因子(加齢に伴う機能低下・疾患・薬の有害作用)、外的因子(環境内の障害物)、状況的因子(特定の活動や状況。例:夜中にトイレへ急ぐ)の相互作用。最も一貫した予測因子は転倒歴",
    "exam": "49-pm-17(転倒した高齢者への住環境の助言を問う設問)／53-pm-37(転倒リスク因子でないものを選ぶ)",
    "q": [
     "49-pm-17",
     "53-pm-37"
    ],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/20-%E8%80%81%E5%B9%B4%E5%8C%BB%E5%AD%A6/%E9%AB%98%E9%BD%A2%E8%80%85%E3%81%AE%E8%BB%A2%E5%80%92/%E9%AB%98%E9%BD%A2%E8%80%85%E3%81%AE%E8%BB%A2%E5%80%92"
     }
    ]
   },
   {
    "item": "主な内的因子",
    "target": "高齢者で転倒リスクを上げる身体・認知の要因",
    "value": "筋力低下(種類を問わず主要な予測因子)、平衡・歩行の障害、視力・コントラスト感度・深径覚・暗順応の低下、感覚障害、認知障害、慢性・急性疾患、薬剤。リスク因子として挙げられる例:筋力低下・転倒歴・歩行やバランスの障害・補助具の使用・視覚障害・関節炎・ADL障害・うつ・認知障害・80歳超",
    "exam": "53-pm-37(リスク因子=視力障害・下肢筋力低下・認知機能低下・複数回転倒の既往。これらは誤答選択肢)",
    "q": [
     "53-pm-37"
    ],
    "note": "確認済み[S1][S2]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/20-%E8%80%81%E5%B9%B4%E5%8C%BB%E5%AD%A6/%E9%AB%98%E9%BD%A2%E8%80%85%E3%81%AE%E8%BB%A2%E5%80%92/%E9%AB%98%E9%BD%A2%E8%80%85%E3%81%AE%E8%BB%A2%E5%80%92"
     },
     {
      "label": "S2",
      "url": "https://www.aafp.org/pubs/afp/issues/2005/0701/p81.html"
     }
    ]
   },
   {
    "item": "リスクの大きさの目安",
    "target": "どの因子が特に強いか",
    "value": "下肢筋力低下は転倒のオッズを約4倍に、転倒歴と歩行・バランスの障害は約3倍に高めるとされる",
    "exam": "53-pm-37(誤答選択肢の下肢筋力低下・複数回転倒の既往はこれに当たる)",
    "q": [
     "53-pm-37"
    ],
    "note": "確認済み[S2]。原著の数値は研究により幅がある。学習用の目安",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.aafp.org/pubs/afp/issues/2005/0701/p81.html"
     }
    ]
   },
   {
    "item": "性別",
    "target": "「男性であること」は転倒リスク因子か",
    "value": "S1では、女性は男性より転倒することが多いと書かれている。男性を転倒リスク因子として挙げた記載は確認できなかった",
    "exam": "53-pm-37(記録上の正答選択肢=男性。リスク因子との関連が低いものとして出題)",
    "q": [
     "53-pm-37"
    ],
    "note": "確認済み[S1]。正答選択肢の正確な文言は未確認。「男性がリスクではない」ことまでS1が明記しているわけではない",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/20-%E8%80%81%E5%B9%B4%E5%8C%BB%E5%AD%A6/%E9%AB%98%E9%BD%A2%E8%80%85%E3%81%AE%E8%BB%A2%E5%80%92/%E9%AB%98%E9%BD%A2%E8%80%85%E3%81%AE%E8%BB%A2%E5%80%92"
     }
    ]
   },
   {
    "item": "薬剤",
    "target": "転倒リスクを上げる薬",
    "value": "転倒リスクは使用薬剤数に応じて増える(S2では4剤以上が強い関連)。転倒のリスクを上げる薬として最も多く報告されるのは向精神薬",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1][S2]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/20-%E8%80%81%E5%B9%B4%E5%8C%BB%E5%AD%A6/%E9%AB%98%E9%BD%A2%E8%80%85%E3%81%AE%E8%BB%A2%E5%80%92/%E9%AB%98%E9%BD%A2%E8%80%85%E3%81%AE%E8%BB%A2%E5%80%92"
     },
     {
      "label": "S2",
      "url": "https://www.aafp.org/pubs/afp/issues/2005/0701/p81.html"
     }
    ]
   },
   {
    "item": "外的因子・環境",
    "target": "住環境への助言の根拠",
    "value": "環境因子は単独でも、内的因子との相互作用でも転倒リスクを上げる。姿勢の制御や移動が必要な環境(滑りやすい場所など)と、なじみのない環境(新居への転居など)で最もリスクが高い",
    "exam": "49-pm-17(つたい歩きで床から立ち上がろうとして転倒した高齢者の住環境助言)",
    "q": [
     "49-pm-17"
    ],
    "note": "確認済み[S1]。個別の住環境助言の中身は、設問の状況により異なる",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/20-%E8%80%81%E5%B9%B4%E5%8C%BB%E5%AD%A6/%E9%AB%98%E9%BD%A2%E8%80%85%E3%81%AE%E8%BB%A2%E5%80%92/%E9%AB%98%E9%BD%A2%E8%80%85%E3%81%AE%E8%BB%A2%E5%80%92"
     }
    ]
   },
   {
    "item": "転倒による骨折のリスク",
    "target": "転倒が骨折につながりやすい要因",
    "value": "骨折につながる外傷的転倒のリスクは、骨粗鬆症や加齢による骨質の変化(骨の脆弱化)と、サルコペニア(動揺に対する防御反応の低下)で増える",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/20-%E8%80%81%E5%B9%B4%E5%8C%BB%E5%AD%A6/%E9%AB%98%E9%BD%A2%E8%80%85%E3%81%AE%E8%BB%A2%E5%80%92/%E9%AB%98%E9%BD%A2%E8%80%85%E3%81%AE%E8%BB%A2%E5%80%92"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "fecal-occult-blood-test",
  "name": "便潜血検査(免疫法)",
  "category": "臨床検査",
  "aliases": [
   "便潜血",
   "便潜血検査",
   "免疫学的便潜血検査",
   "便潜血反応",
   "FIT",
   "FOBT",
   "大腸がん検診",
   "大腸癌検診"
  ],
  "rows": [
   {
    "item": "便潜血検査と大腸癌の発見",
    "target": "大腸癌の検診・発見の入口",
    "value": "免疫法は、抗ヒトヘモグロビン抗体で便に混じったヒトの血液(Hb)だけを検出する。陽性(要精検)になったら、精密検査として全大腸内視鏡検査を行う(精密検査の主要な方法)。",
    "exam": "50-am-94(大腸癌について誤っているのはどれか。便潜血陽性が診断上重要な所見である、は正しい内容の選択肢。正答は「転移は肺転移が最も多い」)",
    "q": [
     "50-am-94"
    ],
    "note": "確認済み[S1]。国試では便潜血陽性を重要な所見として扱う。ガイドライン上は検診(スクリーニング)の検査で、陽性は癌の確定ではなく精密検査が必要という位置づけ。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://canscreen.ncc.go.jp/guideline/colon_guideline2024.pdf"
     }
    ]
   },
   {
    "item": "化学法と免疫法の違い",
    "target": "検査の特徴",
    "value": "化学法は精度を保つため食事制限・薬剤制限が必要。免疫法はヒトHbに特異的で、食事・薬剤の制限が不要。感度は化学法より高いか同等で、特異度は化学法と差がない。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://canscreen.ncc.go.jp/guideline/colon_guideline2024.pdf"
     }
    ]
   },
   {
    "item": "検診としての推奨と対象",
    "target": "対策型・任意型の大腸がん検診",
    "value": "推奨グレードA(対策型・任意型ともに実施を推奨)。開始は40歳(45歳・50歳も許容)、終了は74歳が望ましい。採便は1回法でも2回法でも可。検診間隔は1年から2年にすることも可能。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。採便回数は1回でも2回でもよいとされる。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://canscreen.ncc.go.jp/guideline/colon_guideline2024.pdf"
     }
    ]
   },
   {
    "item": "カットオフ値と要精検率",
    "target": "免疫法の運用",
    "value": "免疫法は便中Hbを定量して陽性・陰性を分ける。単位は便1gあたりのHb量(μg/g)。2018年度の全国集計ではカットオフ20〜30μg/g未満の設定が最多(37.9%)。事業評価の目安として、40〜74歳の陽性率(要精検率)は7%以下。メーカーごとのカットオフは直接比べられない。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://canscreen.ncc.go.jp/guideline/colon_guideline2024.pdf"
     }
    ]
   },
   {
    "item": "感度の目安(大腸がん)",
    "target": "見逃しの程度",
    "value": "免疫法による大腸がんの感度は、近位結腸で約0.67、遠位結腸で約0.72と同程度。進行性腫瘍(AN)の感度は大腸がんよりずっと低く、近位結腸で0.25、遠位結腸で0.38。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。感度は検査1回あたりの研究の統合値。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://canscreen.ncc.go.jp/guideline/colon_guideline2024.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
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
  "slug": "finkelstein-eichhoff",
  "name": "Finkelsteinテスト・Eichhoffテスト(de Quervain病)",
  "category": "検査法・徴候",
  "aliases": [
   "Finkelstein",
   "Finkelsteinテスト",
   "Finkelstein test",
   "フィンケルシュタイン",
   "Eichhoff",
   "Eichhoffテスト",
   "Eichhoff test",
   "アイヒホフ",
   "アイヒホッフ",
   "de Quervain病",
   "de Quervain",
   "ドゥケルバン病",
   "ドゥケルバン症候群",
   "ドケルバン病",
   "橈骨茎状突起部狭窄性腱鞘炎"
  ],
  "rows": [
   {
    "item": "Finkelsteinテスト(de Quervain病の疼痛誘発)",
    "target": "de Quervain病(第1伸筋腱区画の腱鞘炎)",
    "value": "検者が患者の母指を持って手掌側へ曲げ、手関節を尺側へ他動的に曲げる(尺屈)。橈骨茎状突起の近く、第1区画の腱鞘部に強い痛みが出れば陽性で、de Quervain病が強く疑われる。",
    "exam": "54-am-33(上腕二頭筋腱炎で陽性になる検査の誤答選択肢。正答はYergason)／55-pm-86(肩腱板断裂で陽性になる検査の誤答選択肢。正答はdrop arm)／57-pm-33(Parkinson病の評価の誤答選択肢。正答はWestphal現象)／49回(「後骨間神経麻痺―Finkelsteinテスト」は誤り。Finkelsteinはde Quervain病の検査)",
    "q": [
     "54-am-33",
     "55-pm-86",
     "57-pm-33"
    ],
    "note": "確認済み[S1][S2]。資料間で手技の書き方が違う。MSDマニュアル日本語版は「母指を手掌側に曲げて他の指で包み(握り込み)、手関節を尺屈」と書くが、この「母指を握り込む」方法は文献ではEichhoffテストとされ、Finkelsteinの原法は検者が母指をつかんで行う方法とされる[S2][S4]。国試では「de Quervain病の検査」として問われる(他の疾患の選択肢は誤り)。",
    "conflict": true,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/06-筋骨格系疾患と結合組織疾患/手疾患/ドゥケルバン症候群"
     },
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6103758"
     },
     {
      "label": "S4",
      "url": "https://en.wikipedia.org/wiki/Eichoff_maneuver"
     }
    ]
   },
   {
    "item": "Eichhoffテスト(Finkelsteinテストとの違い)",
    "target": "de Quervain病(母指を握り込む方法)",
    "value": "患者が母指を手のひらの中に入れて他の指で握り込み、検者が手全体を尺側へ他動的に曲げる(尺屈)。母指を検者がつかむFinkelsteinテストとは手順が違う。無症状の36人(72手関節)では、Eichhoffで偽陽性が8手関節(5人)、Finkelsteinは0で、特異度は89%対100%だった(痛みの強さもEichhoffが強い)。",
    "exam": "60-pm-27(腰椎椎間板ヘルニアの疼痛誘発テストを問う問題で、Eichhoffテストは誤答選択肢。選択肢はAdson・Bragard・Eichhoff・Thomsen・Yergasonで、正答はBragard)",
    "q": [
     "60-pm-27"
    ],
    "note": "確認済み[S2][S4]。Eichhoffはde Quervain病の検査で、腰椎椎間板ヘルニアの検査ではない。同じ問題の他の選択肢は、Adson=胸郭出口症候群、Thomsen=上腕骨外側上顆炎、Yergason=上腕二頭筋腱炎の検査(別のカード参照)。[S2]は症状のある人を含めておらず、感度は比べていない。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6103758"
     },
     {
      "label": "S4",
      "url": "https://en.wikipedia.org/wiki/Eichoff_maneuver"
     }
    ]
   },
   {
    "item": "de Quervain病とは",
    "target": "病態の理解",
    "value": "手首の親指側にある第1伸筋腱区画(短母指伸筋腱と長母指外転筋腱)の狭窄性腱鞘炎。手首と母指のうずく痛みが動かすと悪化し、橈骨茎状突起のすぐ近く(近位)に圧痛が出る。現在は短母指伸筋腱の腱鞘炎が主体と考えられている。",
    "exam": "出題は直接なし(Finkelsteinテストの対象疾患として、上の行の問題で間接的に問われる)",
    "q": [],
    "note": "確認済み[S1][S3]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/06-筋骨格系疾患と結合組織疾患/手疾患/ドゥケルバン症候群"
     },
     {
      "label": "S3",
      "url": "https://www.jmedj.co.jp/cdn/shop/files/978-4-7849-0511-9.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
  "review": "ai"
 },
 {
  "slug": "fracture-eponyms-wrist-forearm",
  "name": "骨折の名称と部位(Colles・Smith・Barton・Bennett・Monteggia)",
  "category": "診断基準・分類",
  "aliases": [
   "Colles骨折",
   "Smith骨折",
   "Barton骨折",
   "Bennett骨折",
   "Monteggia骨折",
   "コレス骨折",
   "スミス骨折",
   "silver fork変形"
  ],
  "rows": [
   {
    "item": "Colles骨折",
    "target": "橈骨遠位端骨折(遠位骨片が背側へ転位)",
    "value": "橈骨遠位端の骨折で、手首側の骨片が手の甲側(背側)へずれる。フォークを伏せたような変形(silver fork変形)。手のひらをついて転倒して起こり、骨粗鬆症のある中高年の女性に多い。正中神経が骨片や腫れで圧迫・損傷されることがあり、母指〜薬指の感覚障害、示指先端のしびれ、つまみ力の低下が出る。",
    "exam": "58-am-89(正答=「合併症に正中神経損傷がある」。誤答=「成人より小児に多い」「尺骨遠位端の骨折である」「遠位骨片は掌側に転位する」)／49-pm-87(誤答=「Colles骨折 ―― 上腕骨骨幹部」)",
    "q": [
     "58-am-89",
     "49-pm-87"
    ],
    "note": "確認済み[S1][S2]。橈骨遠位端骨折の大半は背側転位で特に高齢者に多いとされ、小児に多いとは書かれていない[S2]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.joa.or.jp/public/sick/condition/distal_radius_fracture.html"
     },
     {
      "label": "S2",
      "url": "https://www.msdmanuals.com/ja-jp/professional/22-%E5%A4%96%E5%82%B7%E3%81%A8%E4%B8%AD%E6%AF%92/%E9%AA%A8%E6%8A%98/%E6%A9%88%E9%AA%A8%E9%81%A0%E4%BD%8D%E7%AB%AF%E9%AA%A8%E6%8A%98"
     }
    ]
   },
   {
    "item": "Smith骨折",
    "target": "橈骨遠位端骨折(遠位骨片が掌側へ転位)",
    "value": "橈骨遠位端の骨折で、遠位骨片が掌側(手のひら側)に転位・屈曲する(reverse Colles)。手関節が屈曲した状態で転倒して起こる。Colles骨折より頻度は低い。",
    "exam": "49-pm-87(正答=「Smith骨折 ―― 橈骨遠位端」)",
    "q": [
     "49-pm-87"
    ],
    "note": "確認済み[S1][S2][S3]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.joa.or.jp/public/sick/condition/distal_radius_fracture.html"
     },
     {
      "label": "S2",
      "url": "https://www.msdmanuals.com/ja-jp/professional/22-%E5%A4%96%E5%82%B7%E3%81%A8%E4%B8%AD%E6%AF%92/%E9%AA%A8%E6%8A%98/%E6%A9%88%E9%AA%A8%E9%81%A0%E4%BD%8D%E7%AB%AF%E9%AA%A8%E6%8A%98"
     },
     {
      "label": "S3",
      "url": "https://intjem.biomedcentral.com/articles/10.1186/s12245-015-0075-2"
     }
    ]
   },
   {
    "item": "Barton骨折",
    "target": "橈骨遠位端の関節内骨折",
    "value": "橈骨遠位端の斜めの関節内骨折で、遠位骨片が背側または掌側に転位する(掌側Barton・背側Barton)。不安定で、手術が必要になることが多い。尺骨遠位端の骨折ではない。",
    "exam": "49-pm-87(誤答=「Barton骨折 ―― 尺骨遠位端」)",
    "q": [
     "49-pm-87"
    ],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://intjem.biomedcentral.com/articles/10.1186/s12245-015-0075-2"
     }
    ]
   },
   {
    "item": "Bennett骨折",
    "target": "第1中手骨基部の骨折",
    "value": "第1中手骨(母指)基部の斜めの関節内骨折。第2中手骨ではない。",
    "exam": "49-pm-87(誤答=「Bennett骨折 ―― 第2中手骨基部」)",
    "q": [
     "49-pm-87"
    ],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://intjem.biomedcentral.com/articles/10.1186/s12245-015-0075-2"
     }
    ]
   },
   {
    "item": "Monteggia骨折",
    "target": "尺骨近位の骨折＋橈骨頭脱臼",
    "value": "尺骨近位部の骨折に、近位橈尺関節・腕橈関節の脱臼(橈骨頭脱臼)を伴う脱臼骨折。橈骨骨幹部の骨折ではない。",
    "exam": "49-pm-87(誤答=「Monteggia骨折 ―― 橈骨骨幹部」)",
    "q": [
     "49-pm-87"
    ],
    "note": "確認済み[S1]。橈骨の骨折と遠位橈尺関節の脱臼はGaleazzi骨折(別の骨折)。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://intjem.biomedcentral.com/articles/10.1186/s12245-015-0075-2"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
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
  "slug": "ftld-pick-disease",
  "name": "前頭側頭葉変性症(Pick病・前頭側頭型認知症)",
  "category": "診断基準・分類",
  "aliases": [
   "Pick病",
   "ピック病",
   "前頭側頭型認知症",
   "前頭側頭葉変性症",
   "前頭側頭葉型認知症",
   "行動異常型前頭側頭型認知症",
   "限局性の大脳皮質の萎縮",
   "意味性認知症",
   "常同行動",
   "FTD"
  ],
  "rows": [
   {
    "item": "Pick病と前頭側頭型認知症",
    "target": "前頭葉・側頭葉が萎縮する認知症",
    "value": "Pick病は、特定のタイプの前頭側頭型認知症にみられる脳の変化を指す用語で、重度の萎縮・神経細胞の喪失・ピック細胞(異常な細胞)が特徴。前頭葉と側頭葉が萎縮し、神経細胞が失われる。前頭側頭葉変性症は主として初老期に発症し、人格変化・行動障害・失語などがゆっくり進む。",
    "exam": "54-pm-35「前頭葉と側頭葉に限局性の大脳皮質の萎縮を認める疾患」の正答=Pick病(誤答: Alzheimer型認知症・正常圧水頭症・脳血管性認知症・Lewy小体型認知症)。",
    "q": [
     "54-pm-35"
    ],
    "note": "確認済み[S2][S1]。難病の概要[S1]に「Pick病」の語は出ず、Pick病との関係は[S2]。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.msdmanuals.com/ja-jp/home/09-脳-脊髄-末梢神経の病気/せん妄と認知症/前頭側頭型認知症"
     },
     {
      "label": "S1",
      "url": "https://www.mhlw.go.jp/content/10905000/001174064.pdf"
     }
    ]
   },
   {
    "item": "(行動異常型)前頭側頭型認知症の画像所見",
    "target": "CT/MRIとSPECT/PET",
    "value": "CT/MRIで両側性の前頭葉・側頭葉前部の境界明瞭な萎縮(前頭葉白質病変を伴うこともある)。SPECT/PETで同じ部位の血流(代謝)低下。",
    "exam": "54-pm-35 の正答Pick病(前頭側頭型認知症)の画像の特徴。",
    "q": [
     "54-pm-35"
    ],
    "note": "確認済み[S1]。CT・MRIでは、かなり進行するまで特徴的な変化が見えないことがある[S2]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.mhlw.go.jp/content/10905000/001174064.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.msdmanuals.com/ja-jp/home/09-脳-脊髄-末梢神経の病気/せん妄と認知症/前頭側頭型認知症"
     }
    ]
   },
   {
    "item": "他の認知症との画像の違い",
    "target": "鑑別(誤答選択肢の画像)",
    "value": "Alzheimer病: 嗅内野・海馬の萎縮、側頭頭頂葉外側部の萎縮。SPECT/PETは後部帯状回・楔前部・側頭頭頂葉外側の血流(代謝)低下。Lewy小体型認知症: CT/MRIで特異的所見なし。SPECT/PETは後頭葉の血流(代謝)低下、線条体ドパミントランスポーターの取り込み低下、MIBG心筋シンチの取り込み低下。血管性認知症: 梗塞(主幹動脈領域・連合野・境界域)や小血管病変(多発ラクナ・広範な白質病変)。",
    "exam": "54-pm-35 の誤答選択肢(Alzheimer型認知症・脳血管性認知症・Lewy小体型認知症)の特徴。正常圧水頭症は誤答の1つだが、資料に記載がなくこのカードでは扱わない。",
    "q": [
     "54-pm-35"
    ],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.mhlw.go.jp/content/10905000/001174064.pdf"
     }
    ]
   },
   {
    "item": "前頭側頭型認知症の行動障害",
    "target": "症状の特徴",
    "value": "常同行動(毎日同じコースの散歩・時刻表的な生活)、脱抑制・反社会的行動(万引き・盗食など)、注意の転導性の亢進、被影響性の亢進(模倣・強迫的言語応答)、食行動の変化(過食・濃い味や甘い物を好む)、自発性の低下、共感の困難。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.mhlw.go.jp/content/10905000/001174064.pdf"
     }
    ]
   },
   {
    "item": "発症年齢・経過・治療",
    "target": "発症時期と予後の目安",
    "value": "主として初老期に発症。指定難病の診断基準では、発症が65歳以下を対象とし、70歳以上の発症はまれとする。典型例は65歳以下で発症とするマニュアルもある。根本的な治療薬は未確立で、SSRIなどの抗うつ薬が行動異常の緩和に有効との報告がある。発症からの平均寿命は行動障害型で約6〜9年、意味性失語型で約12年。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1][S2]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.mhlw.go.jp/content/10905000/001174064.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.msdmanuals.com/ja-jp/home/09-脳-脊髄-末梢神経の病気/せん妄と認知症/前頭側頭型認知症"
     }
    ]
   },
   {
    "item": "意味性認知症",
    "target": "側頭葉前部の萎縮と言語障害",
    "value": "CT/MRIで非対称性の側頭葉前部の萎縮。診断基準の中核症状は物品呼称の障害と単語理解の障害。語義失語(単語レベルでは復唱が良好でも物の名前が言えない)がみられる。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.mhlw.go.jp/content/10905000/001174064.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
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
  "slug": "galeazzi-allis-sign",
  "name": "Galeazzi徴候(Allis徴候)",
  "category": "検査法・徴候",
  "aliases": [
   "Galeazzi徴候",
   "Galeazzi sign",
   "Galeazzi test",
   "Galeazzi テスト",
   "Allis徴候",
   "Allis sign",
   "Allisテスト",
   "Allis test",
   "アリス徴候",
   "ガレアッツィ徴候"
  ],
  "rows": [
   {
    "item": "Galeazzi(Allis)徴候の方法と所見",
    "target": "発育性股関節形成不全・股関節脱臼のスクリーニング",
    "value": "背臥位で股関節と膝関節を屈曲し(MSDマニュアルは90度、足を台に置く)、左右の膝の高さを比べる。患側の膝が低い(大腿が短く見える)=片側の股関節脱臼などを示唆",
    "exam": "58-pm-9(図の所見から「右股関節脱臼」が正答の設問)／60-am-87(「股関節屈曲拘縮を調べるのは」の誤答選択肢=Allisテスト。屈曲拘縮はThomasテスト)",
    "q": [
     "58-pm-9",
     "60-am-87"
    ],
    "note": "確認済み[S1][S2][S3]。Allis徴候とGaleazzi徴候は同じ所見の別名として扱われる[S2]。国試の図は確認できていない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/19-小児科/先天性筋骨格異常/発育性股関節形成不全-ddh"
     },
     {
      "label": "S2",
      "url": "https://www.aafp.org/pubs/afp/issues/2001/0201/p565.html"
     },
     {
      "label": "S3",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5063769/"
     }
    ]
   },
   {
    "item": "この徴候の限界",
    "target": "解釈の注意",
    "value": "この徴候だけで診断はできない(脱臼に特有の所見はないとされる[S2])。膝の高さの差は下肢長差と関連づけて述べられる[S3]。確定は画像検査(超音波・X線)で行う",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S2][S3]。両側例では左右差が出にくい点は、本文で確認できなかったため書かない。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.aafp.org/pubs/afp/issues/2001/0201/p565.html"
     },
     {
      "label": "S3",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5063769/"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "garden-classification",
  "name": "Garden分類(大腿骨頚部骨折)",
  "category": "診断基準・分類",
  "aliases": [
   "Garden分類",
   "ガーデン分類",
   "Garden stage",
   "大腿骨頚部骨折",
   "大腿骨頸部骨折"
  ],
  "rows": [
   {
    "item": "Garden分類 stage I〜IV",
    "target": "大腿骨頚部骨折の転位の程度(単純X線)",
    "value": "stage I=不完全骨折／II=完全骨折で転位なし／III=完全骨折で転位あり／IV=完全骨折で転位が高度。I・IIを非転位型、III・IVを転位型とまとめる。",
    "exam": "58-am-89(「Colles骨折で正しいのはどれか」。誤答=「骨折の分類にはGarden分類が用いられる」。Garden分類は大腿骨頚部骨折の分類で、Colles骨折(橈骨遠位端骨折)のものではない)",
    "q": [
     "58-am-89"
    ],
    "note": "確認済み[S1](公立病院の総説。ガイドライン本文は、ここでは未確認)。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://hospital.city.sendai.jp/pdf/p003-008%2029.pdf"
     }
    ]
   },
   {
    "item": "Garden分類と治療方針",
    "target": "手術の選択",
    "value": "非転位型(I・II)は骨癒合率が高く骨頭壊死の合併率が低いので、内固定材を用いた観血的整復固定術が第一選択。転位型(III・IV)は人工骨頭置換術が推奨される。年齢や全身状態を考慮して個別に選ぶ。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://hospital.city.sendai.jp/pdf/p003-008%2029.pdf"
     }
    ]
   },
   {
    "item": "大腿骨頚部(内側)骨折の特徴",
    "target": "病態",
    "value": "関節内で折れる内側骨折は血液循環が悪く骨癒合が得にくい。血流障害により、のちに骨頭がつぶれる骨頭壊死の合併に注意する。骨粗鬆症のある高齢者に多い。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.joa.or.jp/public/sick/condition/femoral_neck_fracture.html"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "gbs-hughes-egos",
  "name": "Guillain-Barré症候群の機能グレード(Hughes)と予後スコア(EGOS)",
  "category": "評価尺度",
  "aliases": [
   "Guillain-Barré障害スコア",
   "Guillain-Barré 障害スコア",
   "GBS障害スコア",
   "GBS disability score",
   "GBS disability scale",
   "Hughes",
   "Hughesの機能グレード",
   "Hughes機能グレード",
   "Hughes functional grade",
   "Hughes functional grading scale",
   "機能グレード尺度",
   "EGOS",
   "Erasmus GBS Outcome Score",
   "Erasmus GBS Outcome Scale",
   "ギラン・バレー症候群の予後予測"
  ],
  "rows": [
   {
    "item": "EGOS(Erasmus GBS Outcome Scale)",
    "target": "発症6か月後に介助なしで歩けない確率の予測",
    "value": "3項目の合計(1〜7点)。(1)発症年齢:>60歳=1、41〜60歳=0.5、≦40歳=0。(2)発症前4週以内の下痢:なし=0、あり=1。(3)入院2週後のHughes機能グレード:0または1=1、2=2、3=3、4=4、5=5。合計点が高いほど6か月後の歩行不能の確率が高く、1〜83%の範囲で予測できる。EGOSスコア3以下では5%以下、7では約83%。",
    "exam": "54-am-2(32歳=0点、先行する下痢あり=1点、入院2週後の障害スコア5(人工呼吸管理)=5点で合計6点。6か月後に歩行不可能な確率は、問題のグラフから60%が正答(選択肢3)。誤答は20・30・80・90%)",
    "q": [
     "54-am-2"
    ],
    "note": "確認済み[S3][S5]。スコア3以下・7の確率は日本のガイドライン本文にあるが、合計6点の確率の数値は本文にはなく、国試では問題のグラフから読む。EGOSは欧米の研究から作られ、日本でそのまま通用するかは今後の検証が望まれるとガイドラインに書かれている。",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://www.neurology-jp.org/guidelinem/gbs/sinkei_gbs_2013_04.pdf"
     },
     {
      "label": "S5",
      "url": "https://pubmed.ncbi.nlm.nih.gov/17537676/"
     }
    ]
   },
   {
    "item": "Hughesの機能グレード尺度(FG、GBS障害スコア)",
    "target": "ギラン・バレー症候群の重症度・経過の評価",
    "value": "FG0=正常/FG1=軽微な神経症候あり/FG2=歩行器などの支えなしで5m歩行可/FG3=歩行器や支えがあれば5m歩行可/FG4=ベッド上か車椅子に限られる(支えがあっても5m歩けない)/FG5=補助換気(人工呼吸)が必要/FG6=死亡。",
    "exam": "54-am-2(問題文の「障害スコアが5(人工呼吸管理)」=FG5。この値がEGOSの3項目の1つになる)",
    "q": [
     "54-am-2"
    ],
    "note": "確認済み[S1]。国試の「Guillain-Barré障害スコア」は、このHughesの機能グレード(障害スコア)のこと。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.neurology-jp.org/guidelinem/gbs/sinkei_gbs_2013_01.pdf"
     }
    ]
   },
   {
    "item": "FGと治療の目安",
    "target": "免疫療法・血漿浄化療法を行うかの判断に使われる",
    "value": "血漿浄化療法(単純血漿交換など)の保険適用は、FG4以上の場合に限られる。IVIgは急性増悪期で歩行が難しい重症例に適応される。発症4週以降の回復期でも、無治療でFG3以上なら積極的な免疫調整療法が考慮されるが、その場合はGBSの診断やCIDPなどとの鑑別を見直す。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S4]",
    "conflict": false,
    "sources": [
     {
      "label": "S4",
      "url": "https://www.neurology-jp.org/guidelinem/gbs/sinkei_gbs_2013_05.pdf"
     }
    ]
   },
   {
    "item": "GBSの自然経過(FGで見たもの)",
    "target": "症状のピークと回復の時期",
    "value": "1983〜84年の英国の調査で、症状のピークは発症7日以内に34%、14日以内に70%、21日以内に84%。4週ごろまで進行性に悪化し、その後3〜12か月で徐々に回復する。12か月後は67%が完全回復(FG0)、20%が後遺症を残し(FG1〜4)、13%が死亡(FG6)。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S2]。血漿交換・IVIg普及前の古い調査に基づく数字。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.neurology-jp.org/guidelinem/gbs/sinkei_gbs_2013_02.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
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
  "slug": "glioma-who-grade",
  "name": "脳腫瘍のWHOグレード(神経膠腫・膠芽腫)",
  "category": "診断基準・分類",
  "aliases": [
   "神経膠芽腫",
   "膠芽腫",
   "glioblastoma",
   "GBM",
   "神経膠腫",
   "グリオーマ",
   "glioma",
   "WHO grade",
   "WHOグレード",
   "脳腫瘍の悪性度"
  ],
  "rows": [
   {
    "item": "膠芽腫(glioblastoma)のグレード",
    "target": "成人型びまん性膠腫のうち最も悪性",
    "value": "膠芽腫はIDH野生型の成人型びまん性膠腫で、WHOグレード4",
    "exam": "52-am-75(悪性度が最も高い=神経膠芽腫が正答。誤答=海綿状血管腫・下垂体腺腫・神経鞘腫・髄膜腫)",
    "q": [
     "52-am-75"
    ],
    "note": "確認済み[S1]。誤答の4つの腫瘍のグレードは、本文で確認できなかったためこのカードには載せない",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://ganjoho.jp/public/cancer/glioma/treatment.html"
     }
    ]
   },
   {
    "item": "WHOグレード1〜4の意味",
    "target": "脳腫瘍の悪性度の目安",
    "value": "脳腫瘍にはTNM分類のようなステージがなく、グレード1〜4で分類する。数字が大きいほど悪性度が高い。グレード1は、手術で全部取れれば再発のおそれがほとんどない良性腫瘍。グレード2〜4は上がるほど増殖が速い。グレードは摘出組織の病理と遺伝子検査で判定する",
    "exam": "52-am-75(悪性度の比較)",
    "q": [
     "52-am-75"
    ],
    "note": "確認済み[S1][S2]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://ganjoho.jp/public/cancer/glioma/treatment.html"
     },
     {
      "label": "S2",
      "url": "https://ganjoho.jp/public/cancer/brain_tumor/treatment.html"
     }
    ]
   },
   {
    "item": "成人型びまん性膠腫のグレード(2021年WHO分類)",
    "target": "星細胞腫・乏突起膠腫・膠芽腫の区別",
    "value": "乏突起膠腫(IDH変異+1p/19q共欠失)=グレード2・3／星細胞腫(IDH変異、共欠失なし)=グレード2・3・4／膠芽腫(IDH野生型)=グレード4。2021年分類では『退形成性』の語は使わない。乏突起膠腫は星細胞腫より一般に悪性度が低い",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。2021年のWHO分類(第5版)に基づく",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://ganjoho.jp/public/cancer/glioma/treatment.html"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
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
  "slug": "gmfm",
  "name": "GMFM(粗大運動能力尺度)",
  "category": "評価尺度",
  "aliases": [
   "GMFM",
   "GMFM-88",
   "GMFM-66",
   "粗大運動能力尺度",
   "粗大運動機能尺度",
   "Item Map",
   "アイテムマップ",
   "GMAE"
  ],
  "rows": [
   {
    "item": "GMFM-88 の構成と採点",
    "target": "脳性麻痺児などの粗大運動の評価",
    "value": "88項目・5領域(A 臥位と寝返り、B 座位、C 四つ這いと膝立ち、D 立位、E 歩行・走行・ジャンプ)。各項目は0〜3の4段階(0=開始しない、1=開始するが10%未満、2=部分的に完了、3=完全に完了)。領域別の%と総合%を出す",
    "exam": "56-am-31(誤答:「4領域88項目」→正しくは5領域、「各項目0〜4の5段階」→正しくは0〜3の4段階)／54-am-36(誤答:「各項目0〜4の5段階」)",
    "q": [
     "56-am-31",
     "54-am-36"
    ],
    "note": "確認済み[S1][S2]。セルフケア(ADL)の領域はない",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11540451"
     },
     {
      "label": "S2",
      "url": "https://canchild.ca/resources/321-gmfm-scoring/"
     }
    ]
   },
   {
    "item": "課題の基準年齢",
    "target": "項目はどの子どもを基準に作られたか",
    "value": "項目は、定型発達の子どもが5歳までにできる課題で構成されている(健常5歳児が達成可能)",
    "exam": "54-am-36(正答=健常5歳児であれば達成可能な項目で構成される)／56-am-31(誤答:「健常3歳児が達成可能」)",
    "q": [
     "54-am-36",
     "56-am-31"
    ],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11540451"
     }
    ]
   },
   {
    "item": "尺度の性質(GMFM-88とGMFM-66)",
    "target": "順序尺度か間隔尺度か",
    "value": "GMFM-88は順序尺度。GMFM-66は、Rasch分析で項目を難易度順に並べ、順序データを間隔尺度に変換したもので、66項目。採点にはGMAEソフトが必要で、0〜100点の総合点と95%信頼区間が出る",
    "exam": "54-am-36(誤答:「GMFM-88は間隔尺度として使用される」)",
    "q": [
     "54-am-36"
    ],
    "note": "確認済み[S1][S2]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11540451"
     },
     {
      "label": "S2",
      "url": "https://canchild.ca/resources/321-gmfm-scoring/"
     }
    ]
   },
   {
    "item": "Item Map",
    "target": "項目の難易度を示す図",
    "value": "項目の難易度の推定値を示す図(項目番号順・難易度順で表示できる)。子どもができた項目、能力水準に近い項目、出現しつつある技能がわかり、GMFM-66のGMAE/GMFM App+で出る。次に取り組む課題や目標を考える材料になる",
    "exam": "61-pm-36(正答:Item Mapを作成できる)／56-am-31(正答:次に獲得すべき能力をItem Mapで予測・検討できる)／54-am-36(誤答:「Item Mapの使用により認知機能の判定が可能」)",
    "q": [
     "61-pm-36",
     "56-am-31",
     "54-am-36"
    ],
    "note": "確認済み[S2]。出典のItem Mapは運動項目の難易度の情報で、認知機能の判定の記載はない",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://canchild.ca/resources/321-gmfm-scoring/"
     }
    ]
   },
   {
    "item": "対象",
    "target": "どんな子どもに使う尺度か",
    "value": "もとは脳性麻痺児(5か月〜16歳)で妥当性が確認された。その後、ダウン症・後天性脳損傷・骨形成不全・福山型先天性筋ジストロフィー・脊髄性筋萎縮症などでも信頼性・妥当性が報告されている。ほかの集団に使うときは、その集団での確認が必要。GMFM-66の対象は脳性麻痺",
    "exam": "61-pm-36(誤答:「二分脊椎が対象」「対象年齢0〜18歳」「セルフケアの評価を含む」)",
    "q": [
     "61-pm-36"
    ],
    "note": "確認済み[S1]。出典の列挙に二分脊椎は含まれない。「0〜18歳」は出典の年齢(5か月〜16歳)と異なる",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11540451"
     }
    ]
   },
   {
    "item": "GMFCSとの違い",
    "target": "「レベルⅠ〜Ⅴの分類」はGMFCS",
    "value": "GMFCSは脳性麻痺児の運動機能・補助具の必要度を、Ⅰ(軽い)〜Ⅴ(重い)の5段階に分類するシステム。GMFMは変化を測る評価尺度。GMFCSは分類のためのもので、変化の測定には使わない",
    "exam": "61-pm-36(誤答:「重症度をレベルⅠ〜Ⅴに分類」→これはGMFCS)",
    "q": [
     "61-pm-36"
    ],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11540451"
     }
    ]
   },
   {
    "item": "GMFM-88 と GMFM-66 の使い分け",
    "target": "どちらを使うか",
    "value": "GMFM-66はGMFM-88のA〜C領域から22項目を除いており、幼い子どもやGMFCSレベルⅤにはGMFM-88が勧められる。GMFM-66は、検査中に装具・靴・補助具を使えない(GMFM-88は使える)",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11540451"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
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
  "slug": "h-reflex-nerve-conduction-basics",
  "name": "H反射(H波)と神経線維の興奮伝導",
  "category": "臨床検査",
  "aliases": [
   "H反射",
   "H波",
   "ヒラメ筋",
   "Ia群求心性線維",
   "Ia線維",
   "興奮伝導",
   "跳躍伝導",
   "有髄線維",
   "1本の神経線維"
  ],
  "rows": [
   {
    "item": "H反射を導出するために刺激する神経線維",
    "target": "脊髄反射(単シナプス反射)の評価",
    "value": "電気刺激でGroup Ia求心性線維(筋紡錘一次終末由来)を興奮させる→脊髄でα運動ニューロンにシナプス結合→α運動神経を通って筋で波形が記録される。通常は脛骨神経刺激→ヒラメ筋で記録(正中神経刺激→橈側手根屈筋でも可)。",
    "exam": "59-pm-28(「H反射を導出するために刺激する神経」。正答=Ia群求心性線維。誤答=α運動神経線維・γ運動神経線維・Ib群・II群求心性線維)",
    "q": [
     "59-pm-28"
    ],
    "note": "確認済み[S1]。求心性神経にはゴルジ腱器官由来のIb線維も含まれ、そのシナプス後抑制でH波が小さくなりうる[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/rika1996/15/4/15_4_187/_pdf"
     }
    ]
   },
   {
    "item": "H波の性質(随意収縮・H/M比・出現しないとき)",
    "target": "H波の読み方",
    "value": "H波の導出には弱い刺激を用いる。弱い随意収縮でH波の振幅は増え、潜時はほとんど変わらない(随意収縮は出現閾値を下げる)。ヒラメ筋H波は足関節背屈位で抑制される。振幅H/M比は痙縮で増加する(健常者でも幅が広い)。H波が出ないときは、求心性感覚神経障害または上位中枢の興奮性低下が考えられる。",
    "exam": "出題は直接なし(参考。59-pm-28 の背景)",
    "q": [],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/rika1996/15/4/15_4_187/_pdf"
     }
    ]
   },
   {
    "item": "1本の神経線維の興奮伝導(太さ・髄鞘・跳躍伝導)",
    "target": "神経生理の基本",
    "value": "興奮(活動電位)は線維が太いほど速く伝わる。有髄線維では髄鞘が絶縁体となり、活動電位はランビエ絞輪から絞輪へ飛び飛びに伝わる(跳躍伝導)=興奮が髄鞘に伝わるのではない。髄鞘は隣の線維との混線も防ぐ。活動電位は伝わる間に減衰せず、前方の膜が閾値に達して新たな活動電位が生じることで再生される。",
    "exam": "52-pm-61(2つ選ぶ。正答=「興奮は減衰せずに伝わる」「太い線維ほど速く伝わる」。誤答=「有髄線維では興奮が髄鞘に伝わる」。「一方向に伝わる」「並走する別の線維に伝わる」も誤答)",
    "q": [
     "52-pm-61"
    ],
    "note": "確認済み[S1][S2]。「一方向に伝わる」が誤りである点(軸索は両方向に伝わりうる)は、ここで開いた資料では確認できていない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.kango-roo.com/learning/2106/"
     },
     {
      "label": "S2",
      "url": "https://neurotext.library.stonybrook.edu/C4/C4_6/C4_6.html"
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
   "MR血管撮影",
   "MRI"
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
  "slug": "heart-failure-signs",
  "name": "右心不全・左心不全(うっ血性心不全)の症状と身体所見",
  "category": "検査法・徴候",
  "aliases": [
   "右心不全",
   "左心不全",
   "うっ血性心不全",
   "起坐呼吸",
   "発作性夜間呼吸困難",
   "頸静脈怒張",
   "肝腫大",
   "肝脾腫",
   "下腿浮腫",
   "肺うっ血",
   "体うっ血",
   "肺水腫"
  ],
  "rows": [
   {
    "item": "右心不全(体静脈うっ血)の症状・所見",
    "target": "右房圧の上昇による全身のうっ血",
    "value": "頸静脈怒張・下腿浮腫(末梢の圧痕性浮腫)・肝腫大・肝頸静脈逆流・腹水・腹部膨満感・食欲不振。主症状は足の腫れと疲労感",
    "exam": "52-pm-65(右心不全の症候で正しいのは2つ=肝脾腫・下腿浮腫が正答。誤答=肺水腫・起坐呼吸・チアノーゼ)／49-pm-85(右心不全では下腿浮腫がみられる=正答。誤答=左心不全で肝腫大・左心不全で頸静脈怒張・右心不全で肺動脈圧上昇)",
    "q": [
     "52-pm-65",
     "49-pm-85"
    ],
    "note": "確認済み[S1][S2]。資料に「脾腫」の記載はなく、国試の「肝脾腫」は肝腫大に対応する所見として確認(脾腫自体は未確認)。チアノーゼ・肺動脈圧上昇の記載も資料になく未確認。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.mhlw.go.jp/topics/2006/11/dl/tp1122-1k05.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.msdmanuals.com/ja-jp/professional/04-%E5%BF%83%E8%A1%80%E7%AE%A1%E7%96%BE%E6%82%A3/%E5%BF%83%E4%B8%8D%E5%85%A8/%E5%BF%83%E4%B8%8D%E5%85%A8"
     }
    ]
   },
   {
    "item": "左心不全(肺静脈うっ血)の症状・所見",
    "target": "左房圧の上昇による肺うっ血",
    "value": "初期は労作時の息切れ・動悸・易疲労感。進行すると発作性夜間呼吸困難や起坐呼吸が出て、安静時にも息苦しくなる。水泡音・湿性ラ音、肺水腫、Ⅲ音・Ⅳ音を聴取。胸部X線では心拡大・間質性/肺胞性浮腫・胸水",
    "exam": "52-pm-65(誤答選択肢の肺水腫・起坐呼吸は左心不全=肺うっ血の所見)／49-pm-85(誤答「左心不全では肝腫大/頸静脈怒張」=体静脈うっ血の所見で、左心不全の所見ではない)",
    "q": [
     "52-pm-65",
     "49-pm-85"
    ],
    "note": "確認済み[S1][S2]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.mhlw.go.jp/topics/2006/11/dl/tp1122-1k05.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.msdmanuals.com/ja-jp/professional/04-%E5%BF%83%E8%A1%80%E7%AE%A1%E7%96%BE%E6%82%A3/%E5%BF%83%E4%B8%8D%E5%85%A8/%E5%BF%83%E4%B8%8D%E5%85%A8"
     }
    ]
   },
   {
    "item": "起座呼吸(起坐呼吸)",
    "target": "心不全に特徴的な呼吸の型",
    "value": "臥位をとった直後に生じ、座位で速やかに軽減する呼吸困難。発作性夜間呼吸困難は就寝後数時間で呼吸困難が起きて目が覚め、座位を15〜20分保つまで軽減しない",
    "exam": "51-am-88(心不全に特徴的な呼吸=起座呼吸が正答。誤答=下顎呼吸・陥没呼吸・奇異呼吸・鼻翼呼吸)",
    "q": [
     "51-am-88"
    ],
    "note": "確認済み[S2]。厚労省資料でも、発作性夜間呼吸困難や起坐呼吸は心不全の進行で出る症状として記載[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.msdmanuals.com/ja-jp/professional/04-%E5%BF%83%E8%A1%80%E7%AE%A1%E7%96%BE%E6%82%A3/%E5%BF%83%E4%B8%8D%E5%85%A8/%E5%BF%83%E4%B8%8D%E5%85%A8"
     },
     {
      "label": "S1",
      "url": "https://www.mhlw.go.jp/topics/2006/11/dl/tp1122-1k05.pdf"
     }
    ]
   },
   {
    "item": "うっ血性心不全で早期にみられる症状・所見",
    "target": "問診・身体所見で拾うべき項目",
    "value": "労作時の息切れ・易疲労感・発作性夜間呼吸困難・咳嗽(夜間咳嗽)・血痰(泡沫状ピンク色)・下腿浮腫・腹部膨満・食欲不振・急激な体重増加。身体所見では頸静脈怒張・湿性ラ音・心拡大・肝腫大・下腿浮腫",
    "exam": "52-am-36(うっ血性心不全でみられるのは=咳嗽が正答。誤答=皮膚紅潮・頸動脈雑音・心胸郭比40%・初期の体重減少。資料では心拡大・体重は「急激な増加」)／53-pm-20(うっ血性心不全の離床前の問診で重要性が低い質問=「喉が渇きやすいですか」。咳・痰、仰向けで寝られるか、息切れ、むくみは重要な質問)",
    "q": [
     "52-am-36",
     "53-pm-20"
    ],
    "note": "確認済み[S1]。「喉の渇き」は資料の症状一覧に載っていない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.mhlw.go.jp/topics/2006/11/dl/tp1122-1k05.pdf"
     }
    ]
   },
   {
    "item": "左房圧の上昇と心不全の初期症状",
    "target": "僧帽弁疾患などで左房圧が上がる場合",
    "value": "左房圧の上昇による肺うっ血に起因する症状として、初期には労作時の息切れ・動悸・易疲労感が出る(安静時は無症状)",
    "exam": "49-am-92(僧帽弁狭窄症による心不全で初期からみられるのは=呼吸困難が正答。誤答=頸静脈怒張・肝脾腫・浮腫・高血圧)",
    "q": [
     "49-am-92"
    ],
    "note": "確認済み[S1]。僧帽弁狭窄症そのものの病態は資料になく、左房圧上昇→肺うっ血という流れから対応づけた。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.mhlw.go.jp/topics/2006/11/dl/tp1122-1k05.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "hhd-torque",
  "name": "ハンドヘルドダイナモメーター(HHD)とトルクの計算",
  "category": "検査法・徴候",
  "aliases": [
   "ハンドヘルドダイナモメーター",
   "ハンドヘルドダイナモメータ",
   "ハンドヘルドダイナモ",
   "HHD",
   "hand-held dynamometer",
   "handheld dynamometer",
   "徒手筋力計",
   "筋力測定器",
   "膝関節伸展トルク",
   "膝伸展トルク",
   "膝関節伸展等尺性筋力",
   "等尺性膝伸展筋力",
   "モーメントアーム",
   "レバーアーム"
  ],
  "rows": [
   {
    "item": "トルクの計算(力×腕の長さ)",
    "target": "測定した筋力(kgf)から関節トルク(Nm)を求める",
    "value": "トルク(Nm)=力(N)×回転中心から力を測る点までの距離(m)。HHDでは、膝関節の外側裂隙(関節中心)からセンサー中央までの距離を測ってトルクを出す。力は kgf を N に直し(×9.8)、距離は cm を m に直して掛ける",
    "exam": "55-pm-4(正答: 約68.6 Nm。筋力測定器で膝関節伸展等尺性筋力28 kgf。図のb=25 cmを腕の長さとして 28×9.8×0.25≒68.6 Nm。a=33 cmは使わない。誤答: 約6.9・17.2・34.5・51.8 Nm)",
    "q": [
     "55-pm-4"
    ],
    "note": "確認済み[S1][S2]。この設問の図(a・bの位置)は確認していないため、「bを腕の長さに使う」は入力の解析記録による",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7032982/"
     },
     {
      "label": "S2",
      "url": "https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b8"
     }
    ]
   },
   {
    "item": "単位の換算(kgfとN)",
    "target": "計算の途中の換算",
    "value": "1 kgf=9.80665 N(厳密な値)。国試の計算では約9.8を使う。28 kgf≒274 N",
    "exam": "55-pm-4(28 kgf×9.8を計算に使う)",
    "q": [
     "55-pm-4"
    ],
    "note": "確認済み[S2]",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b8"
     }
    ]
   },
   {
    "item": "HHDによる膝伸展等尺性筋力の測定例",
    "target": "測定方法の一例(標準手順ではない)",
    "value": "座位で、測定側の大腿の下にタオルを入れて水平に保ち、膝関節90°屈曲、非測定側のつま先は床か台につける。上肢はベッドで体を支える。センサーを下腿遠位の前面に、下端を足首(果)の直上にして面ファスナーで固定し、固定ベルトで支柱とつなぐ。最大努力を5秒間(3秒で最大に達する)行い、30秒以上あけて複数回測定し最高値を採る。この方法のHHDは等速性装置との比較で、男性で妥当性・信頼性が高いと考えられた(女性は更なる研究が必要)",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。大学生42名の研究1件の方法で、膝伸展の測定条件は研究ごとに統一されていない",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7032982/"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
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
  "slug": "hip-arthroplasty-posterior-precautions",
  "name": "人工股関節・人工骨頭置換術後(後方進入法)の脱臼予防と理学療法",
  "category": "リスク管理",
  "aliases": [
   "人工股関節置換術",
   "人工股関節全置換術",
   "THA",
   "THR",
   "人工骨頭置換術",
   "人工骨頭挿入術",
   "BHA",
   "後方進入法",
   "後方アプローチ",
   "脱臼予防",
   "脱臼肢位",
   "股関節の脱臼"
  ],
  "rows": [
   {
    "item": "後方進入法後に脱臼しやすい肢位・動作",
    "target": "後方脱臼の予防(人工股関節全置換術・人工骨頭挿入術)",
    "value": "股関節を過剰に曲げる(90度以上の深屈曲)・足を内側に入れる(内股=内転・内旋)姿勢が脱臼しやすい。避ける例: 低い椅子に座る、しゃがむ、正座でお辞儀、割り座・横座り、足を組む、足を後ろに引きすぎて靴を履く。立ち上がりは足を手前に引いて胸を張り、深く屈まない。寝返りでは足の間に枕を挟み、内旋しないようにする。",
    "exam": "51-pm-42(人工骨頭置換術・後方アプローチ後、全荷重可能な時期の理学療法で適切でないもの=低い椅子から股関節内旋位での立ち上がり練習)／61-pm-7(後方進入法の人工股関節置換術後。「立ち上がり動作は股関節内旋位で行う」は誤り、「術後2週は股関節を45度以上屈曲しない」も誤り)",
    "q": [
     "51-pm-42",
     "61-pm-7"
    ],
    "note": "確認済み[S1][S2]。いずれも病院の患者向け資料で、学会ガイドラインではない。深屈曲の目安は資料で「90度以上」。「45度以上」を制限とする記載は確認できていない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://mito.jrc.or.jp/data/media/mito-jrc/uploads/2026/03/20260313/Posterior_Approach.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.khp.kitasato-u.ac.jp/byoutou/6c_seikeigeka/thr.pdf"
     }
    ]
   },
   {
    "item": "術後の荷重・離床の目安(人工股関節置換術)",
    "target": "術後早期の理学療法",
    "value": "1〜2日目=床上安静、または耐えられれば部分荷重での移動／3〜5日目=部分荷重／6〜8日目=補助器具を用いた全荷重へ移行／術後4〜8日後に歩行訓練／約11日目以降に階段昇降。",
    "exam": "61-pm-7(「術後3週は免荷とする」「術後3日はベッド上安静とする」はいずれも誤り。正答=術後翌日から筋力増強運動を開始する)",
    "q": [
     "61-pm-7"
    ],
    "note": "確認済み[S3]。MSDマニュアルの目安で、国内の施設・術式(セメント使用の有無など)で異なりうる。3週間免荷や3日間の安静を示す記載は確認できていない。",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://www.msdmanuals.com/ja-jp/professional/24-その他のトピック/リハビリテーション/股関節手術のリハビリテーション"
     }
    ]
   },
   {
    "item": "術後の筋力増強運動の開始",
    "target": "術後早期の理学療法",
    "value": "筋力増強は術後できるだけ早く開始する。当初は患肢を完全伸展した状態での等尺性運動のみ行い、その後、運動を徐々に増やす。体幹と大腿四頭筋を強化する運動を毎日行う。",
    "exam": "61-pm-7(正答=術後翌日から筋力増強運動を開始する)／51-pm-42(重錘を用いた大腿四頭筋の筋力増強、背臥位での股関節外転運動などは適切側の選択肢)",
    "q": [
     "61-pm-7",
     "51-pm-42"
    ],
    "note": "確認済み[S3]。資料に「術後翌日」という日数の明記はなく、「できるだけ早く」と記載。",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://www.msdmanuals.com/ja-jp/professional/24-その他のトピック/リハビリテーション/股関節手術のリハビリテーション"
     }
    ]
   },
   {
    "item": "生活動作の制限期間",
    "target": "脱臼予防の生活指導",
    "value": "ある病院の資料では、基本的に術後3か月は洋式の生活とし、床へ座る・立つ動作は術後3か月経った時点で指導する。同じく術後3か月は足の間に枕をはさんで横向きになる。",
    "exam": "61-pm-7(選択肢「術後2週は股関節を45度以上屈曲しない」は誤り。期間・角度の根拠は資料の記載と一致しない)",
    "q": [
     "61-pm-7"
    ],
    "note": "確認済み[S2]。1病院の資料(2004年改正)であり、制限期間は施設・術式により異なる。MSDマニュアルでは、角度や期間の具体的な数値の記載はない[S3]。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.khp.kitasato-u.ac.jp/byoutou/6c_seikeigeka/thr.pdf"
     },
     {
      "label": "S3",
      "url": "https://www.msdmanuals.com/ja-jp/professional/24-その他のトピック/リハビリテーション/股関節手術のリハビリテーション"
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
  "slug": "icu-severe-nmes",
  "name": "重症期の運動療法(神経筋電気刺激・昇圧剤使用中)",
  "category": "リスク管理",
  "aliases": [
   "神経筋電気刺激",
   "NMES",
   "電気刺激療法",
   "昇圧剤",
   "昇圧薬",
   "強心昇圧薬",
   "循環作動薬",
   "血管作動薬",
   "人工呼吸管理中",
   "ICU獲得筋力低下",
   "重症患者のリハビリテーション"
  ],
  "rows": [
   {
    "item": "人工呼吸管理・高用量昇圧剤中の選択(NMES)",
    "target": "能動的な運動が難しい重症期の筋力低下予防",
    "value": "積極的な早期リハビリテーションが適応できない患者では、神経筋電気刺激療法(NMES)などの手段も考慮する。NMESは急性期でも安全に使用可能で、敗血症性ショック急性期の患者でも代謝を悪化させなかったとの報告がある",
    "exam": "61-am-9(食道癌術後・挿管人工呼吸管理中・高用量昇圧剤。正答:下肢筋に対する神経筋電気刺激。誤答:能動的座位練習・呼吸筋トレーニング・非上肢支持持久性運動・股関節伸展の関節可動域運動)",
    "q": [
     "61-am-9"
    ],
    "note": "確認済み[S1]。過度に早期の積極的リハビリテーションは有害になりうる、という文脈での記載。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/jjrmc/61/6/61_61.452/_pdf"
     }
    ]
   },
   {
    "item": "積極的な運動を原則行わない状態",
    "target": "ICUで早期離床・積極運動を控える場合",
    "value": "強心昇圧薬を大量に投与しても血圧が低すぎる場合／不安定な循環動態でIABPなどの補助循環を必要とする場合／体位を変えただけで血圧が大きく変動する場合、などでは早期離床や早期からの積極的な運動を原則行わない",
    "exam": "61-am-9(高用量昇圧剤使用中のため、能動的座位練習・持久性運動などの能動的・積極的な運動は不適、という整理)",
    "q": [
     "61-am-9"
    ],
    "note": "確認済み[S1]。選択肢ごとの適否は設問側の整理で、資料は一般原則。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jsicm.org/pdf/soki_riha_1707.pdf"
     }
    ]
   },
   {
    "item": "昇圧剤の用量の目安",
    "target": "運動・離床の可否に関わる用量",
    "value": "治療の安全基準(絶対禁忌・レベル1)に「高容量の強心薬:ドパミン>10μg/kg/min、ノルアドレナリン>0.1μg/kg/min」。McWilliamsらの端座位基準では、ノルアドレナリン>0.2μg/kg/minで除外、0.1〜0.2μg/kg/minで制限。離床の開始基準には「ドパミンやノルアドレナリンの投与量が24時間以内に増量されていない」",
    "exam": "61-am-9(昇圧剤使用中の運動療法の選択の背景)",
    "q": [
     "61-am-9"
    ],
    "note": "確認済み[S1]。数値は各基準の目安で、実臨床では医師の判断による。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jsicm.org/pdf/soki_riha_1707.pdf"
     }
    ]
   },
   {
    "item": "低用量の循環作動薬での運動",
    "target": "自動運動の安全性",
    "value": "Hodgsonらのエキスパートコンセンサス(2014)では、低用量の循環作動薬投与で血圧が保てる場合は自動運動による有害事象の発生は低い。ECMOやIABP管理中でも、ベッド上の運動に限れば有害事象の発生は低いとされる",
    "exam": "61-am-9(高用量=低用量の場合と区別)",
    "q": [
     "61-am-9"
    ],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jsicm.org/pdf/soki_riha_1707.pdf"
     }
    ]
   },
   {
    "item": "J-ReCIP 2023(NMES)",
    "target": "日本の重症患者リハビリテーション診療ガイドライン",
    "value": "ICU成人に対する神経電気刺激(神経筋電気刺激)は「弱く推奨」、エビデンスの確実性は「中」",
    "exam": "61-am-9(正答:神経筋電気刺激)",
    "q": [
     "61-am-9"
    ],
    "note": "確認済み[S1]。2023年版のCQ-3(NMESまたは床上エルゴメーター)。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/jjrmc/61/6/61_61.444/_pdf"
     }
    ]
   },
   {
    "item": "JSICMエキスパートコンセンサス2017(電気刺激)",
    "target": "筋力低下の予防効果の評価",
    "value": "集中治療領域での電気刺激療法は、筋力低下を予防するエビデンスが十分でない(安全性・実施可能性は報告されている)",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "2017年版は「エビデンス不十分」、2023年版(J-ReCIP)は「弱く推奨」と推奨が異なる。新しい2023年版を優先して学ぶ。[S1]",
    "conflict": true,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jsicm.org/pdf/soki_riha_1707.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
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
  "slug": "inph-hakim-triad",
  "name": "特発性正常圧水頭症(iNPH)・Hakim三徴",
  "category": "診断基準・分類",
  "aliases": [
   "iNPH",
   "NPH",
   "正常圧水頭症",
   "特発性正常圧水頭症",
   "Hakim三徴",
   "Hakim",
   "Evans index",
   "DESH",
   "タップテスト",
   "髄液排除試験",
   "腰椎-腹腔シャント",
   "脳室-腹腔シャント"
  ],
  "rows": [
   {
    "item": "三徴(歩行障害・認知障害・排尿障害)",
    "target": "特発性正常圧水頭症の主症状",
    "value": "先行疾患なく脳室拡大が生じ、髄液圧は正常で、認知障害・歩行障害・排尿障害の3つが緩徐に進行する",
    "exam": "59-pm-5(自発性低下・行動異常・頻回な転倒に加え、考えられる特徴的な症状=排尿障害が正答)／51-pm-99(みられる所見=脳室拡大・小刻み歩行・自発性低下。腰椎-腹腔シャント術)",
    "q": [
     "59-pm-5",
     "51-pm-99"
    ],
    "note": "確認済み[S1]。三徴=歩行・認知・排尿の障害",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://jnph.umin.jp/file/guideline20250717.pdf"
     }
    ]
   },
   {
    "item": "三徴それぞれの特徴",
    "target": "症状の見分け方",
    "value": "歩行=歩幅が小さい・すり足・開脚(外股)・すくみ足・方向転換で不安定・転倒しやすい／認知=精神運動速度の低下・注意障害・無為(アパシー)など前頭葉機能障害が目立ち、記憶障害は比較的軽い／排尿=過活動膀胱(頻尿から切迫性尿失禁)",
    "exam": "59-pm-5(自発性低下=アパシー、頻回な転倒=歩行障害に当たり、残る排尿障害が正答)",
    "q": [],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://jnph.umin.jp/file/guideline20250717.pdf"
     }
    ]
   },
   {
    "item": "髄液所見(圧・細胞数・蛋白)",
    "target": "iNPHの髄液",
    "value": "髄液圧は正常(20cmH2O以下)。細胞数・蛋白も正常。probable iNPHの条件に含まれる",
    "exam": "51-pm-99(特発性正常圧水頭症で誤り=髄液で細胞増加が正答)",
    "q": [
     "51-pm-99"
    ],
    "note": "確認済み[S1]。細胞数は正常なので『細胞増加』は誤り",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://jnph.umin.jp/file/guideline20250717.pdf"
     }
    ]
   },
   {
    "item": "診断の段階(suspected・possible・probable・definite)",
    "target": "診療ガイドライン第3版の診断分類",
    "value": "possible=60歳以上・脳室拡大(Evans index>0.3)・三徴のうち1つ以上があり、他疾患で説明できず、水頭症の明らかな先行疾患がない／probable=さらにDESH所見+歩行障害+髄液圧・性状が正常、またはタップテストで三徴が改善／definite=シャント術後に三徴が客観的に改善",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://jnph.umin.jp/file/guideline20250717.pdf"
     }
    ]
   },
   {
    "item": "画像所見(Evans index・DESH)",
    "target": "iNPHの画像診断",
    "value": "Evans index=両側側脳室前角間最大幅÷同一断面の頭蓋内腔横径。0.3を超えると脳室拡大。DESH=脳室拡大+シルビウス裂の拡大+高位円蓋部・正中部のくも膜下腔の狭小化(脳梁角が90度以下に鋭角化)",
    "exam": "51-pm-99(みられる所見として脳室拡大)",
    "q": [],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://jnph.umin.jp/file/guideline20250717.pdf"
     }
    ]
   },
   {
    "item": "タップテスト(髄液排除試験)",
    "target": "シャント術の適応判断",
    "value": "腰椎穿刺で髄液を30〜50mL排除し、前後で三徴を評価して改善を確認する。改善の目安=TUG・10m歩行の所要時間10%以上短縮、MMSE 3点以上、FAB 2点以上、iNPHGS 1以上、mRS 1以上の改善",
    "exam": "出題は直接なし(参考。腰椎穿刺で髄液を排出して歩行が改善する状態=正常圧水頭症)",
    "q": [],
    "note": "確認済み[S1]。タップ陰性でもシャント後に改善する場合があるとされる",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://jnph.umin.jp/file/guideline20250717.pdf"
     }
    ]
   },
   {
    "item": "シャント術と認知機能の改善",
    "target": "手術で改善しうる認知障害",
    "value": "適切にシャント手術を行うと80%でADLが改善し、46%で他覚的な認知障害が消失すると報告される。術式にはLP(腰部くも膜下腔-腹腔)・VP(脳室-腹腔)・VA(脳室-心房)シャントがある",
    "exam": "51-am-92(脳外科的手術で認知機能が改善しうる疾患=慢性硬膜下血腫・正常圧水頭症が正答)",
    "q": [
     "51-am-92"
    ],
    "note": "確認済み[S1](正常圧水頭症の部分のみ。慢性硬膜下血腫はこの資料では確認していない)",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://jnph.umin.jp/file/guideline20250717.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
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
  "slug": "jddst-r-denver",
  "name": "JDDST-R・DDST(デンバー式発達スクリーニング検査)",
  "category": "検査法・徴候",
  "aliases": [
   "JDDST-R",
   "JDDST",
   "DDST",
   "DDST-Ⅱ",
   "DDST-II",
   "DDSTⅡ",
   "DDST Ⅱ",
   "Denver II",
   "デンバー式発達スクリーニング検査",
   "デンバー発達判定法",
   "改訂日本版デンバー式",
   "J-Denver II",
   "デンバーⅡ",
   "デンバーII"
  ],
  "rows": [
   {
    "item": "発達スクリーニング検査であること(知能検査ではない)",
    "target": "検査の種類の見分け",
    "value": "DDST系は、乳幼児の発達の遅れや偏りをふるい分ける(スクリーニング)検査。原版DDSTの結果は、デンバー市の乳幼児の標準的発達に基づく基準で「異常・疑問・正常」に判定する。日本版のDenver II(J-Denver II)は、遅れの疑いは分かるが、どの領域が遅れているかまでは特定できない。",
    "exam": "53-pm-85(知能検査はどれか。正答=WISC-Ⅲ。JDDST-Rは誤答選択肢で、発達のスクリーニング検査)／57-pm-85(発達評価はどれか。正答=DDST Ⅱ。WAIS-Ⅲ・WISC-Ⅲ・K-ABC Ⅱ・WPPSI-Ⅱは誤答)",
    "q": [
     "53-pm-85",
     "57-pm-85"
    ],
    "note": "確認済み[S1][S2]。[S1]は原版DDST、[S2]は日本版Denver IIの記載。JDDST-R(改訂日本版)そのものの手引き・月齢表は入手できなかった。本カードは、日本版Denver II(J-Denver II)・米国版Denver IIの公開資料で確認できた範囲に限る。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.niph.go.jp/wadai/mhlw/1976/s5105004.pdf"
     },
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6899956/"
     }
    ]
   },
   {
    "item": "構成と通過率の区分(25・50・75・90%)",
    "target": "結果の読み方",
    "value": "4つの領域(個人-社会・言語・微細運動-適応・粗大運動)。各項目について、その課題を子どもの25%・50%・75%・90%ができる月齢を標準枠として示す。90%の子どもができる課題ができない=「遅れ(delay)」、75〜90%の子どもができる課題ができない=「注意(caution)」。遅れが1つ以上、または注意が2つ以上で、発達の遅れの疑い(スクリーニング陽性)。",
    "exam": "59-am-83(JDDST-Rで「母指と示指によるつまみ動作」の通過率75%が含まれる時期はどれか。選択肢は3〜4・6〜7・9〜10・12〜13・15〜16か月で、公式正答は12〜13か月。この月齢はJDDST-R原典の表で確かめられていない)",
    "q": [
     "59-am-83"
    ],
    "note": "確認済み[S2](J-Denver IIの構成と判定)。「注意」「遅れ」の判定のしかたはJDDST-Rでは別の書き方の可能性があり、JDDST-Rの項目別の月齢(つまみ動作の75%など)は資料で確認できていない。JDDST-R(改訂日本版)そのものの手引き・月齢表は入手できなかった。本カードは、日本版Denver II(J-Denver II)・米国版Denver IIの公開資料で確認できた範囲に限る。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6899956/"
     }
    ]
   },
   {
    "item": "乳児期の発達のマイルストン(Denver IIで90%以上ができる月齢)",
    "target": "月齢の目安",
    "value": "個人-社会: 0か月 顔を見つめる→3か月 笑いかける→4か月 手をみつめる→6か月 玩具をとる→8か月 自分で食べる→12か月 拍手をまねる・欲しいものを示す・バイバイ。微細運動-適応: 4か月 ガラガラを握る・両手を合わす→5か月 物に手を伸ばす→10か月 親指を使ってつかむ。言語: 8か月 パ・ダ・マなどをいう→10か月 喃語→12か月 意味なく「パパ」「ママ」。粗大運動: 3か月 首がすわる→6か月 寝返り→8か月 座れる(5秒以上)→10か月 つかまり立ち・一人ですわる→11か月 つかまって立ち上がる。",
    "exam": "54-am-86(JDDST-Rの個人-社会領域で最も早く可能になるのはどれか。正答=ビスケットを自分で食べる。誤答=手を洗ってふく・簡単なお手伝い・コップから飲む・上着などを脱ぐ)",
    "q": [
     "54-am-86"
    ],
    "note": "確認済み[S3]。これは米国版Denver IIで90%以上ができる月齢を使った健診マニュアルの表で、JDDST-Rの数値ではない。国試の正答は公式正答表による。ただし「自分で食べる」が乳児期の早い項目(8か月)である点は、国試の正答と同じ向き。",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://www.cfa.go.jp/assets/contents/node/basic_page/field_ref_resources/0b505d2e-87a3-488b-a78c-46a38fbcf38b/94412340/20250722_policies_boshihoken_manuals-etc_19.pdf"
     }
    ]
   },
   {
    "item": "Denver II の改訂(米国版・1992年)",
    "target": "検査の成り立ち",
    "value": "旧版DDSTから改訂され、125項目になった。言語項目が86%増え、構音の項目が加わり、新しい年齢の目盛り、より軽い遅れを見つける新しい判定区分(注意)、行動評価尺度が加わった。項目は、実施・採点のしやすさや再現性などに加え、「90%の子どもができる年齢が段階的に進むこと」を条件に選ばれた。",
    "exam": "出題は直接なし(参考。57-pm-85のDDST Ⅱはこの改訂版)",
    "q": [],
    "note": "確認済み[S4]。125項目は米国版Denver IIの数で、JDDST-Rの項目数とは別。",
    "conflict": false,
    "sources": [
     {
      "label": "S4",
      "url": "https://pubmed.ncbi.nlm.nih.gov/1370185/"
     },
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6899956/"
     }
    ]
   },
   {
    "item": "日本版Denver II(J-Denver II)",
    "target": "日本での標準化",
    "value": "原版Denver IIの項目のうち、日本の文化に合わない3項目を除き、日本の子ども1,819人で再標準化した。判定基準は原版と同じ。英語版の基準では、発達が遅れている子どもを多めに見積もる可能性が指摘されている。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S2]。JDDST-R(1980年代の改訂日本版)とJ-Denver IIは別の版。JDDST-R(改訂日本版)そのものの手引き・月齢表は入手できなかった。本カードは、日本版Denver II(J-Denver II)・米国版Denver IIの公開資料で確認できた範囲に限る。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6899956/"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
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
  "slug": "kafo-checkout",
  "name": "長下肢装具の適合判定(チェックアウト)",
  "category": "検査法・徴候",
  "aliases": [
   "長下肢装具",
   "両側支柱付長下肢装具",
   "骨盤帯付長下肢装具",
   "下肢装具の適合",
   "装具の適合判定",
   "チェックアウト",
   "下腿半月",
   "大腿半月",
   "大腿カフ",
   "外側支柱",
   "内側支柱",
   "膝継手軸",
   "足継手軸",
   "股継手軸",
   "KAFO",
   "LLB"
  ],
  "rows": [
   {
    "item": "下腿半月(下腿カフ)上縁の高さ",
    "target": "長下肢装具の適合判定(下腿部)",
    "value": "上縁は腓骨頭下端から2〜3cm下。腓骨頭の下を浅く走る腓骨神経をカフで圧迫しないため。",
    "exam": "49-pm-40(正答:下腿半月上縁は腓骨頭から2〜3cm下方)／61-am-24(誤答:腓骨頭から5〜6cm下)／52-pm-30(誤答:腓骨頭下端の直下)／51-pm-41(誤答:下半月は腓骨頭上端)",
    "q": [
     "49-pm-40",
     "51-pm-41",
     "52-pm-30",
     "61-am-24"
    ],
    "note": "確認済み[S1][S2](国試解説サイト。公的資料では数値を未確認)。国試の正答(49-pm-40)と一致。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://nazenani-sougu.com/kokushi/pt53-am13/"
     },
     {
      "label": "S2",
      "url": "https://nazenani-sougu.com/kokushi/pt52-pm30/"
     }
    ]
   },
   {
    "item": "大腿近位の支柱・カフ上縁の高さ(外側・内側)",
    "target": "長下肢装具の適合判定(大腿部・装具の全長)",
    "value": "外側:大転子下端から2〜3cm下。内側:会陰部から2〜3cm下。大転子や会陰部に支柱・カフが食い込まないための設定。",
    "exam": "49-pm-40(正答:内側支柱は会陰部から2〜3cm下。誤答:外側支柱は上前腸骨棘から2〜3cm下)／61-am-24(誤答:外側支柱の高さは大転子)",
    "q": [
     "49-pm-40",
     "61-am-24"
    ],
    "note": "確認済み[S1][S2](国試解説サイト)。国試の正答(49-pm-40)と一致。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://nazenani-sougu.com/kokushi/pt53-am13/"
     },
     {
      "label": "S2",
      "url": "https://nazenani-sougu.com/kokushi/pt52-pm30/"
     }
    ]
   },
   {
    "item": "大腿遠位カフと下腿カフの位置関係",
    "target": "長下肢装具の適合判定(カフの位置)",
    "value": "大腿遠位カフの位置は下腿カフで決まる。下腿カフ上縁と大腿遠位カフ下縁が、膝継手から等距離になるように設定する(膝を最大屈曲すると両カフの縁が接する位置関係)。",
    "exam": "61-am-24(正答:大腿下位半月と膝継手の距離=下腿半月と膝継手の距離)",
    "q": [
     "61-am-24"
    ],
    "note": "確認済み[S1][S2](国試解説サイト)。国試の正答と一致。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://nazenani-sougu.com/kokushi/pt53-am13/"
     },
     {
      "label": "S2",
      "url": "https://nazenani-sougu.com/kokushi/pt52-pm30/"
     }
    ]
   },
   {
    "item": "膝継手軸の位置",
    "target": "長下肢装具の適合判定(膝継手)",
    "value": "前額面:内転筋結節と膝関節裂隙の中間点の高さを通る。矢状面:膝の前後径の1/2の点と後方1/3の点の中間点を通る。1軸の継手を膝関節の回転中心に比較的近く置く。",
    "exam": "52-pm-30(正答:矢状面で前後径の1/2と後方1/3の中間点)／49-pm-40(誤答:膝継手の高さは膝関節の関節裂隙)／51-pm-41(誤答:膝継手―膝関節裂隙中央)／61-am-24(誤答:大腿骨顆部の2〜3cm下)",
    "q": [
     "49-pm-40",
     "51-pm-41",
     "52-pm-30",
     "61-am-24"
    ],
    "note": "確認済み[S2](国試解説サイト)。国試の正答(52-pm-30)と一致し、「関節裂隙の高さ」とする選択肢が誤答になる点とも矛盾しない。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://nazenani-sougu.com/kokushi/pt52-pm30/"
     }
    ]
   },
   {
    "item": "足継手軸の位置",
    "target": "長下肢装具の適合判定(足継手)",
    "value": "前額面:外果の中央(内果下端)を通り、床面に平行。水平面:外果中央を通り足部中心線に直交。個人差が大きいので、実際は反対側とのバランスも見て調整することがある。",
    "exam": "51-pm-41(正答:足継手は内果下端)／52-pm-30(誤答:足継手軸は内果中央)／49-pm-40(誤答:外果下端に合わせる)／61-am-24(誤答:内果と外果の中央を結ぶ線)",
    "q": [
     "49-pm-40",
     "51-pm-41",
     "52-pm-30",
     "61-am-24"
    ],
    "note": "確認済み[S2](国試解説サイト)。国試の正答(51-pm-41)と一致。「外果中央」と「内果下端」は同じ高さを指す書き方で、覚えるときは国試の言い回し(内果下端)に合わせるとよい。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://nazenani-sougu.com/kokushi/pt52-pm30/"
     }
    ]
   },
   {
    "item": "骨盤帯・股継手軸の位置(骨盤帯付長下肢装具)",
    "target": "骨盤帯付長下肢装具の適合判定",
    "value": "股継手軸:大転子から前方1〜2cm、上方2cmの点。骨盤帯:側面では腸骨稜と大転子の中間、背面では上後腸骨棘と仙骨下縁の中間。",
    "exam": "52-pm-30(誤答:骨盤帯は腸骨稜と上前腸骨棘の間／股継手軸は小転子より2cm上方)／51-pm-41(誤答:骨盤帯―腸骨稜頂点、股継手―大転子上端)",
    "q": [
     "51-pm-41",
     "52-pm-30"
    ],
    "note": "確認済み[S2](国試解説サイト)。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://nazenani-sougu.com/kokushi/pt52-pm30/"
     }
    ]
   },
   {
    "item": "身体と装具のすき間(クリアランス)",
    "target": "両側支柱付き装具の適合判定",
    "value": "両側支柱付きの装具では、通常2〜3mm程度のすき間を設ける。内果・外果などの骨突起部は5mm程度。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S2](国試解説サイト)。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://nazenani-sougu.com/kokushi/pt52-pm30/"
     }
    ]
   },
   {
    "item": "長下肢装具の基本構造(両側支柱型)",
    "target": "長下肢装具の定義",
    "value": "大腿上部から足底に及び、膝関節と足関節の動きを制御する装具。両側支柱型は、下肢の内外両側に金属支柱を持ち、大腿部と下腿部でそれぞれ両支柱を結ぶ金属の半月を持つ。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S3](厚生労働省の補装具費支給事務ガイドブック)。",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://www.mhlw.go.jp/file/06-Seisakujouhou-12200000-Shakaiengokyokushougaihokenfukushibu/0000070150.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
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
  "slug": "kps-ecog-performance-status",
  "name": "活動能力の評価(Karnofsky Performance Status・ECOG PS)",
  "category": "評価尺度",
  "aliases": [
   "KPS",
   "Karnofsky",
   "Karnofsky Performance Status",
   "カルノフスキー",
   "Performance Status",
   "パフォーマンスステータス",
   "ECOG",
   "活動能力の評価"
  ],
  "rows": [
   {
    "item": "Karnofsky Performance Status(KPS)",
    "target": "がん患者の活動能力・全身状態の評価",
    "value": "100から0までを10点刻みで評価する(点数が高いほど良好)。100=普通の生活・労働が可能／90=特に看護する必要はない／70=労働はできないが家庭での療養が可能／60=日常生活の大部分で介助が必要／40=動けず、適切な医療・介護が必要／30=全く動けず入院が必要／20=入院が必要で重症／10=危篤。",
    "exam": "59-am-20(乳房温存手術を予定している早期乳癌の周術期理学療法で、活動能力の評価方法として正しいのはKPS。誤答=CFS(cancer fatigue scale)・FACT・PPI・TNM分類)",
    "q": [
     "59-am-20"
    ],
    "note": "確認済み[S1]。80・50点の文言は資料の表から読み取れないため書いていない。出典は日本緩和医療学会ガイドライン中の抜粋表。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jspm.ne.jp/files/guideline/glhyd_2013/01_02.pdf"
     }
    ]
   },
   {
    "item": "ECOG Performance Status(PS)",
    "target": "がん患者の全身状態の評価(JCOG日本語訳)",
    "value": "0=全く問題なく活動できる(発病前と同じ日常生活が制限なく行える)／1=激しい活動は制限されるが歩行可能で軽作業・座っての作業はできる／2=歩行可能で身の回りのことはすべて可能だが作業はできず、日中の50%以上はベッド外で過ごす／3=限られた身の回りのことしかできず、日中の50%以上をベッドか椅子で過ごす／4=全く動けず、身の回りのことは全くできない。",
    "exam": "出題は直接なし(参考。59-am-20 のKPSと同じ「全身状態の指標」)",
    "q": [],
    "note": "確認済み[S1]。パフォーマンスステータスは全身状態の指標の1つで、日常生活の制限の程度を示す[S2]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://jcog.jp/assets/C_150_0050.pdf"
     },
     {
      "label": "S2",
      "url": "https://ganjoho.jp/public/qa_links/dictionary/dic01/modal/Performance_Status.html"
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
  "slug": "lift-off-test",
  "name": "Lift-offテスト(Gerber)",
  "category": "検査法・徴候",
  "aliases": [
   "Lift-offテスト",
   "Lift-off test",
   "lift-off sign",
   "リフトオフテスト",
   "リフトオフ",
   "Gerberテスト",
   "Gerber test",
   "肩甲下筋テスト",
   "手背を腰部"
  ],
  "rows": [
   {
    "item": "Lift-offテストの手技と陽性",
    "target": "肩甲下筋(肩関節内旋筋)の機能・断裂",
    "value": "手背を腰部(腰椎の中ほど)に当てた位置から、手を背中から後方へ離すように自分で持ち上げさせる。離せない、離した位置を保てない(支えを外すと戻る=lag)、肘や肩の伸展で代償する場合を陽性とし、肩甲下筋の断裂や著しい筋力低下を示唆する。前提として、手が腰まで届く十分な他動の内旋ができることを確認する(できないと偽陽性になる)",
    "exam": "54-pm-5(正答: 肩甲下筋。20歳男性、肩の疼痛。図の肢位から手背を腰部から離すよう指示したが離せなかった。誤答: 棘下筋・棘上筋・小円筋・上腕二頭筋。図は未確認)",
    "q": [
     "54-pm-5"
    ],
    "note": "確認済み[S1][S2]。国試の「手背を腰部から離せない」は陽性所見に一致",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC12127584/"
     },
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC13566503/"
     }
    ]
   },
   {
    "item": "原法と位置づけ",
    "target": "検査の成り立ち",
    "value": "Gerberらが1991年に、肩甲下筋腱の孤立性断裂16例の報告の中で示した簡便な手技で、臨床的に意味のある断裂を診断または除外できるとした(内旋筋力の低下・外旋の増加も所見)。肩甲下筋の完全性をみるために最初に考案された検査で、のちに internal rotation lag sign、belly-press test(変法がNapoleon test)、belly-off sign、bear-hug test が報告された",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S3][S4]。確定診断には超音波・MRIなどの画像を用いる(原著)",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://pubmed.ncbi.nlm.nih.gov/1670434/"
     },
     {
      "label": "S4",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC8822023/"
     }
    ]
   },
   {
    "item": "診断精度(特異度は高いが感度は低い)",
    "target": "結果の読み方",
    "value": "メタ解析(13研究)では、bear-hug・belly-press・internal rotation lag sign・lift-offの4検査はいずれもまとめた特異度が0.90超、感度は0.60未満で、どれも単独では肩甲下筋断裂の診断に十分とはいえない。陽性は断裂の確認に役立つが、陰性でも否定できない。感度の報告は研究で幅があり、18〜35%とする報告から、前向き144例の研究での77.4%まである",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S2][S4][S1]。研究ごとの対象・基準(関節鏡・超音波・MRI)や部分断裂か全層断裂かで値が変わる",
    "conflict": false,
    "sources": [
     {
      "label": "S4",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC8822023/"
     },
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC13566503/"
     },
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC12127584/"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
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
  "slug": "liver-failure-signs-labs",
  "name": "肝不全(肝機能低下)の症候と検査値",
  "category": "臨床検査",
  "aliases": [
   "肝不全",
   "肝機能不全",
   "肝臓の機能不全",
   "肝機能低下",
   "肝硬変",
   "非代償性肝硬変",
   "肝性脳症",
   "出血傾向",
   "Child-Pugh分類",
   "Child-Pugh",
   "チャイルド・ピュー分類",
   "高アンモニア血症"
  ],
  "rows": [
   {
    "item": "肝不全・肝硬変で起こる症候",
    "target": "病態の見分け方",
    "value": "肝細胞の機能が全体に低下し、腹水・肝性脳症(意識障害)・黄疸・出血傾向などが現れる。黄疸・腹水・肝性脳症がそろうものが非代償性肝硬変。肝不全に陥ると腹水・肝性脳症・消化管出血を合併する。",
    "exam": "49-pm-76(肝臓の機能不全で起こらないのは=高コレステロール血症が正答。黄疸・腹水・出血傾向・意識障害は起こる)／58-am-92(肝不全でみられるのは=腹水貯留が正答。誤答は脳炎・裂肛・血小板増加・高アルブミン血症)",
    "q": [
     "49-pm-76",
     "58-am-92"
    ],
    "note": "確認済み[S1]。資料の脳の症状は「肝性脳症」で、脳炎や裂肛の記載はない。主に肝硬変(慢性)の資料で、急性肝不全は別の病態。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jsge.or.jp/committees/guideline/disease/pdf/kankouhen_2023.pdf"
     }
    ]
   },
   {
    "item": "血液検査の変化",
    "target": "肝臓の合成・処理能力の低下",
    "value": "合成能の低下: 血中アルブミンと総コレステロールが低下、血液を固める蛋白が減り固まりにくくなる(PT活性値の低下)。処理能の低下: ビリルビンやヒアルロン酸が上昇。脾臓の腫れ(脾腫)により血小板が破壊されて減少する。",
    "exam": "49-pm-76(誤答選択肢の高コレステロール血症は逆で、総コレステロールは低下)／58-am-92(誤答選択肢の血小板増加・高アルブミン血症は逆で、血小板減少・低アルブミン血症)",
    "q": [
     "49-pm-76",
     "58-am-92"
    ],
    "note": "確認済み[S1]。これらの値は条件で変わり、単独では肝硬変と診断できない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jsge.or.jp/committees/guideline/disease/pdf/kankouhen_2023.pdf"
     }
    ]
   },
   {
    "item": "肝性脳症とアンモニア",
    "target": "意識障害の原因",
    "value": "肝臓の働きの低下や、肝臓を迂回するシャントのため、アンモニアなど本来処理される物質が脳に届いて意識障害を起こす。血漿アンモニア値が上昇し、指標になる。程度は軽いものから昏睡まで。慢性の肝性脳症のほとんどは肝硬変による。",
    "exam": "49-pm-76(意識障害は起こる=選択肢の一つ)",
    "q": [
     "49-pm-76"
    ],
    "note": "確認済み[S1]。症状とアンモニア値には時間的なずれがありうる。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jsge.or.jp/committees/guideline/disease/pdf/kankouhen_2023.pdf"
     }
    ]
   },
   {
    "item": "腹水",
    "target": "肝硬変の腹水",
    "value": "肝硬変では血液を肝臓が受け入れにくくなり、一部が腹水となって腹腔に漏れる。腹水は淡黄色で、蛋白やアルブミンの濃度が低く、通常は無菌。血中アルブミンが下がると、水分を血管内に引きつける力が弱まり、腹水がたまりやすくなる。",
    "exam": "58-am-92(正答の腹水貯留)",
    "q": [
     "58-am-92"
    ],
    "note": "確認済み[S1]。腹水は腹膜炎・がん・腎不全・心不全などでもたまる。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jsge.or.jp/committees/guideline/disease/pdf/kankouhen_2023.pdf"
     }
    ]
   },
   {
    "item": "Child-Pugh分類",
    "target": "肝硬変の重症度",
    "value": "5項目を1〜3点で採点してクラスA・B・Cに分ける。肝性脳症(なし/軽度/時々昏睡)、腹水(なし/少量/中等量)、ビリルビン(2.0未満/2.0〜3.0/3.0超 mg/dL)、アルブミン(3.5超/2.8〜3.5/2.8未満 g/dL)、PT活性値(70超/40〜70/40未満 %)。代償性はクラスA、非代償性はクラスB・C。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。合計点とクラスの対応は資料の表を参照。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jsge.or.jp/committees/guideline/disease/pdf/kankouhen_2023.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
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
  "slug": "lung-volumes-compliance",
  "name": "肺気量分画・肺胞換気量・肺コンプライアンス",
  "category": "臨床検査",
  "aliases": [
   "肺気量分画",
   "スパイログラム",
   "予備呼気量",
   "予備吸気量",
   "残気量",
   "機能的残気量",
   "全肺気量",
   "最大吸気量",
   "1回換気量",
   "死腔",
   "死腔換気量",
   "肺胞換気量",
   "分時肺胞換気量",
   "肺コンプライアンス",
   "コンプライアンス",
   "フローボリューム曲線",
   "ピークフロー",
   "PEF",
   "FRC",
   "TLC",
   "ERV",
   "IRV"
  ],
  "rows": [
   {
    "item": "肺気量分画の構成と、スパイロメトリーで測れないもの",
    "target": "1次分画(volume)と2次分画(capacity)の区別",
    "value": "1次分画=予備吸気量(IRV)・1回換気量(TV)・予備呼気量(ERV)・残気量(RV)の4つ。2次分画=2つ以上の1次分画からなる全肺気量(TLC)・肺活量(VC)・最大吸気量(IC)・機能的残気量(FRC)。スパイロメトリーではRVを直接測れないため、RVを含むFRCとTLCも測れない。FRCをガス希釈法(He閉鎖回路法など)で求め、TLC=FRC+IC、RV=FRC−ERVで算出する。",
    "exam": "52-am-1: スパイログラムの図から予備呼気量を選ぶ(正答は安静呼気位から最大呼気位までの区間)。58-am-69: 肺活量の算出に最低限必要な肺気量分画=全肺気量と残気量(正答)。誤答=予備吸気量・予備呼気量・1回換気量。",
    "q": [
     "52-am-1",
     "58-am-69"
    ],
    "note": "確認済み[S1]。予備呼気量が「安静呼気位(FRC)〜最大呼気位(RV)の間」になるのは、RV=FRC−ERVからの導出。肺活量=最大吸気位〜最大呼気位の肺気量変化で、RVが最大呼気位の気量なので、VC=TLC−RVとなる(導出)。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.aichi-amt.or.jp/aamt/wp-content/uploads/2024/03/aicc-guide-19.lung_function.pdf"
     }
    ]
   },
   {
    "item": "機能的残気量(FRC)・残気量(RV)の定義と病態での変化",
    "target": "閉塞性・拘束性での肺気量の変化",
    "value": "FRC=安静呼気位で肺・気道系に存在する空気の量(若年成人でTLCの約50%)。RV=最大呼気位で存在する空気の量。閉塞性換気障害ではFRC・RVとも増大する(空気の捉えこみ、肺胞壁の破壊による気腫化で肺コンプライアンスが上昇)。拘束性障害ではFRC・RVが低下する(肺の弾性収縮力が増加)。",
    "exam": "61-am-44: COPDで増加するのは機能的残気量・全肺気量(正答2つ)。低下するのは1秒量・ピークフロー・予備吸気量(誤答として提示)。",
    "q": [
     "61-am-44"
    ],
    "note": "確認済み[S1](FRC・RVの増大)。全肺気量・予備吸気量・1秒量・ピークフローの変化は、今回の資料では個別に確認できていない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.aichi-amt.or.jp/aamt/wp-content/uploads/2024/03/aicc-guide-19.lung_function.pdf"
     }
    ]
   },
   {
    "item": "フローボリューム曲線とPEF",
    "target": "最大努力呼出の流量と肺気量の関係",
    "value": "気流量(flow)と肺気量(volume)の関係の曲線。最大吸気位から最大努力で呼出して記録したものが最大呼気フローボリューム曲線。PEF(最大呼気流量)=呼出の初期に出現する流量の最大値。FEF50・FEF75=努力肺活量の50%・25%肺気量位の呼気流量。病態ごとに特徴的なパターンを示す。",
    "exam": "50-am-18: 62歳男性のフローボリューム曲線(図)から最も考えられる疾患=慢性閉塞性肺疾患(正答)。誤答=肺癌・肺線維症・肺葉切除後・上気道狭窄。",
    "q": [
     "50-am-18"
    ],
    "note": "確認済み[S1](定義)。各疾患の曲線の形そのものは、資料で図のみで示され、本文では確認できていない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.aichi-amt.or.jp/aamt/wp-content/uploads/2024/03/aicc-guide-19.lung_function.pdf"
     }
    ]
   },
   {
    "item": "肺胞換気量(分時肺胞換気量)の計算",
    "target": "実際にガス交換に使われる換気量",
    "value": "分時肺胞換気量=(1回換気量−死腔量)×呼吸数。成人の1回換気量は約500mL、解剖学的死腔は約150mL。例: (500−150)×16回=5,600mL/分(分時換気量は500×16=8,000mL/分)。",
    "exam": "60-am-70: 肺胞換気量の算出に使う2つ=1回換気量・死腔換気量(正答)。誤答=残気量・予備吸気量・予備呼気量。",
    "q": [
     "60-am-70"
    ],
    "note": "確認済み[S2](看護学習サイトの解説。学会ガイドラインそのものではない)。呼吸数も式に含まれるが、設問は肺気量分画の2つを選ぶ形。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.kango-roo.com/learning/2925/"
     }
    ]
   },
   {
    "item": "肺コンプライアンス",
    "target": "肺の軟らかさ(伸びやすさ)",
    "value": "C=ΔV/ΔP(圧−容積曲線の勾配)。正常値は約0.2 L/cmH2O。肺気腫のように肺が軟らかくなるとCは大きくなり、肺線維症のように硬くなるとCは小さくなる。同じ圧変化でより大きな容量変化が得られるなら、コンプライアンスは増加している。",
    "exam": "54-pm-7: 人工呼吸器モニターの気道内圧と肺気量位の図で、理学療法の前後に同じ圧で量が増加(自発呼吸なし)→肺コンプライアンスの増加(正答)。誤答=肺活量の増加・残気量の減少・気道抵抗の増加・胸郭柔軟性の低下。",
    "q": [
     "54-pm-7"
    ],
    "note": "確認済み[S3](看護学習サイトの解説。学会ガイドラインそのものではない)。図は未確認。",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://www.kango-roo.com/learning/2327/"
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
  "slug": "lymphedema-staging-care",
  "name": "リンパ浮腫(病期分類・日常生活指導・蜂窩織炎のとき)",
  "category": "診断基準・分類",
  "aliases": [
   "リンパ浮腫",
   "蜂窩織炎",
   "蜂巣炎",
   "弾性スリーブ",
   "弾性ストッキング",
   "リンパドレナージ",
   "国際リンパ学会",
   "複合的治療",
   "圧迫療法"
  ],
  "rows": [
   {
    "item": "リンパ浮腫の病期(国際リンパ学会ISL)",
    "target": "重症度・病期の分類",
    "value": "0期=リンパ液の輸送に障害はあるが腫脹は明らかでなく無症状／1期=発症初期で、組織液の貯留は挙上で軽減し、圧痕を生じる／2期=挙上のみで腫脹が軽減することはほとんどなく、圧痕が明らか／2期後期=組織の線維化が明らかで、圧痕ができることもできないこともある／3期=組織が硬くなり(線維性)圧痕は生じず、皮膚の肥厚・色素過剰・脂肪沈着・疣贅などの皮膚変化を認める。",
    "exam": "52-am-15(右上肢リンパ浮腫でステージⅡと診断。日常生活指導として正答=皮膚の保湿)／57-pm-47(乳癌術後の上肢リンパ浮腫・病期分類Ⅱ期。正答=患肢の皮膚の保湿)",
    "q": [
     "52-am-15",
     "57-pm-47"
    ],
    "note": "確認済み[S1](診療報酬の算定要件に付された参考資料。ガイドライン本文は未確認)。Ⅱ期後期以降を重症とする。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jsgo.or.jp/news/img/lymph.pdf"
     }
    ]
   },
   {
    "item": "リンパ浮腫の日常生活指導(スキンケア・衣類・入浴・除毛)",
    "target": "生活上の注意",
    "value": "保湿ケアで皮膚のバリア機能を保ち、細菌の侵入(感染)を防ぐ。衣類・下着・袖口は身体を締め付けないゆったりしたものを選ぶ。長時間のサウナや熱い温泉は「ほどほど」にする。食事の制限はない(バランスのよい食事)。除毛・剃毛は電気シェーバーなど皮膚への負担の少ないものを使い、脱毛クリームや永久脱毛は医療者に相談する。疲れたら腕や足を心臓より高くして休む。",
    "exam": "52-am-15・57-pm-47(正答=皮膚の保湿。誤答=むだ毛を処理する／水分摂取を制限する／熱い温度で入浴する(長湯)／腕を締め付けるような服を着る)",
    "q": [
     "52-am-15",
     "57-pm-47"
    ],
    "note": "確認済み[S1][S2]。「むだ毛を処理する」は、処理するなら皮膚への負担が少ない方法で、という位置づけ。水分摂取の制限については、この資料に記載がない(食事の制限はないとのみ)。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pod.ncc.go.jp/jp/ncch/clinic/breast_surgery/080/lymph_tishiki.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.musashino.jrc.or.jp/img/documents/23-287_pamphlet_B.pdf"
     }
    ]
   },
   {
    "item": "蜂窩織炎を合併したとき",
    "target": "感染・炎症時の対応",
    "value": "リンパ液の流れが悪い部位は免疫力が低下し、小さな傷などから細菌が入って蜂窩織炎(赤み・熱感・痛み、ときに高熱)を起こしやすい。症状が出たら早く担当医に連絡する。患肢を安静に保ち、赤く熱を持った部分を保冷剤や氷枕などで冷やす。ドレナージ(マッサージ)や弾性スリーブ・ストッキング(圧迫)は刺激となり炎症を広げるため、炎症が治って医師と相談するまで中断する。",
    "exam": "53-pm-15(子宮頸癌術後の右下肢リンパ浮腫・非圧窩性浮腫・2日前に蜂窩織炎を発症し薬物療法中。正答=患部の冷却。誤答=スキンケア休止・圧迫下での下肢運動・用手的リンパドレナージ・経皮的電気刺激療法(TENS))",
    "q": [
     "53-pm-15"
    ],
    "note": "確認済み[S1][S2]。圧迫下での運動は圧迫の中断期間にあたるため行わない(資料は圧迫・ドレナージの中断を指示)。「スキンケア休止」「TENS」について、この資料に記載はない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pod.ncc.go.jp/jp/ncch/clinic/breast_surgery/080/lymph_tishiki.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.musashino.jrc.or.jp/img/documents/23-287_pamphlet_B.pdf"
     }
    ]
   },
   {
    "item": "リンパ浮腫の治療(複合的治療)",
    "target": "理学療法の内容",
    "value": "「日常生活でできる工夫」に加え、スキンケア・用手的リンパドレナージ・弾性包帯や弾性着衣による圧迫療法・圧迫した状態での運動を組み合わせた「複合的治療」が推奨されている。用手的リンパドレナージはリンパ浮腫と診断されてから行うもので、予防のためではない。",
    "exam": "50-pm-41(緩和ケア病棟のリハビリテーション。誤答=「リンパ浮腫に対して理学療法は行わない」。正答=患者の意思に合わせて理学療法の内容を変更する)",
    "q": [
     "50-pm-41"
    ],
    "note": "確認済み[S1]。緩和ケア病棟での適応(終末期の浮腫への対応)は、ここで開いた資料では確認できていない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.musashino.jrc.or.jp/img/documents/23-287_pamphlet_B.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "macrocytic-anemia-mcv",
  "name": "大球性貧血と貧血のMCV分類",
  "category": "臨床検査",
  "aliases": [
   "大球性貧血",
   "大型の赤血球",
   "大型赤血球",
   "大赤血球",
   "巨赤芽球性貧血",
   "悪性貧血",
   "葉酸欠乏性貧血",
   "ビタミンB12欠乏",
   "小球性貧血",
   "正球性貧血",
   "平均赤血球容積"
  ],
  "rows": [
   {
    "item": "大球性貧血(MCV 100 fL超)の代表",
    "target": "末梢血に大型の赤血球が出る貧血",
    "value": "大球性貧血の代表は巨赤芽球性貧血(ビタミンB12欠乏=悪性貧血・胃切除後、葉酸欠乏)。そのほか肝疾患、甲状腺機能低下症、骨髄異形成症候群、白血病、抗腫瘍剤、アルコール多飲でも大球性になる。網赤血球が増えると(急性出血・溶血性貧血)MCVは上がることがある。",
    "exam": "53-pm-92(末梢血に大型の赤血球が出現するのはどれか。正答は葉酸欠乏性貧血。誤答は再生不良性貧血・消化管出血・鉄欠乏性貧血・溶血性貧血)",
    "q": [
     "53-pm-92"
    ],
    "note": "確認済み[S1][S2]。資料の表では、急性出血や溶血性貧血も網赤血球増加によりMCVが上がる(大球性側にも載る)。国試は典型例として葉酸欠乏を正答としており、溶血性貧血を誤答とする点が資料の書き方と一致しない。",
    "conflict": true,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.japha.jp/doc/2107ga-01.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.msdmanuals.com/ja-jp/professional/11-%E8%A1%80%E6%B6%B2%E5%AD%A6%E3%81%8A%E3%82%88%E3%81%B3%E8%85%AB%E7%98%8D%E5%AD%A6/%E8%B5%A4%E8%A1%80%E7%90%83%E7%94%A3%E7%94%9F%E4%BD%8E%E4%B8%8B%E3%81%AB%E3%82%88%E3%82%8B%E8%B2%A7%E8%A1%80/%E5%B7%A8%E8%B5%A4%E8%8A%BD%E7%90%83%E6%80%A7%E8%B2%A7%E8%A1%80"
     }
    ]
   },
   {
    "item": "貧血のMCVによる分類",
    "target": "貧血の鑑別の最初の手がかり",
    "value": "小球性(MCV 80 fL未満)=鉄欠乏性貧血・二次性貧血・サラセミア・鉄芽球性貧血。正球性(80〜100 fL)=出血性貧血・溶血性貧血・再生不良性貧血・赤芽球癆・二次性貧血・白血病・骨髄異形成症候群・多発性骨髄腫。大球性(100 fL超)=巨赤芽球性貧血(B12・葉酸欠乏)など。",
    "exam": "53-pm-92(誤答の再生不良性貧血は正球性、鉄欠乏性貧血は小球性)",
    "q": [
     "53-pm-92"
    ],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.japha.jp/doc/2107ga-01.pdf"
     }
    ]
   },
   {
    "item": "大球性の程度と疑う疾患",
    "target": "MCVの値からの絞り込み",
    "value": "軽度大球性(MCV 100〜120 fL)なら肝疾患・甲状腺機能低下症・骨髄異形成症候群・アルコール多飲・網赤血球増加を疑う。高度大球性(120 fL超)ならまず悪性貧血と胃切除後貧血(巨赤芽球性貧血)を疑う。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.japha.jp/doc/2107ga-01.pdf"
     }
    ]
   },
   {
    "item": "巨赤芽球性貧血の血液塗抹所見",
    "target": "形態の特徴",
    "value": "大型で楕円形の赤血球(大楕円赤血球)、赤血球の大小不同・形の不ぞろい、好中球の過分葉がみられる。ハウエル・ジョリー小体もよくみられる。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S2]。鉄欠乏を合併すると大赤血球が目立たないことがある。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.msdmanuals.com/ja-jp/professional/11-%E8%A1%80%E6%B6%B2%E5%AD%A6%E3%81%8A%E3%82%88%E3%81%B3%E8%85%AB%E7%98%8D%E5%AD%A6/%E8%B5%A4%E8%A1%80%E7%90%83%E7%94%A3%E7%94%9F%E4%BD%8E%E4%B8%8B%E3%81%AB%E3%82%88%E3%82%8B%E8%B2%A7%E8%A1%80/%E5%B7%A8%E8%B5%A4%E8%8A%BD%E7%90%83%E6%80%A7%E8%B2%A7%E8%A1%80"
     }
    ]
   },
   {
    "item": "ビタミンB12欠乏・葉酸欠乏の原因",
    "target": "巨赤芽球性貧血の背景",
    "value": "B12欠乏で最も多いのは、内因子の分泌障害による悪性貧血。胃炎・胃バイパス術・クローン病・条虫感染での吸収不良も原因。食事だけが原因になるのはまれ(完全菜食など)。葉酸欠乏は、食事制限・慢性飲酒・食欲不振、吸収不良(セリアック病など)、妊娠や慢性溶血などの需要増加で起こる。",
    "exam": "53-pm-92(正答の葉酸欠乏性貧血の背景)",
    "q": [
     "53-pm-92"
    ],
    "note": "確認済み[S2]",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.msdmanuals.com/ja-jp/professional/11-%E8%A1%80%E6%B6%B2%E5%AD%A6%E3%81%8A%E3%82%88%E3%81%B3%E8%85%AB%E7%98%8D%E5%AD%A6/%E8%B5%A4%E8%A1%80%E7%90%83%E7%94%A3%E7%94%9F%E4%BD%8E%E4%B8%8B%E3%81%AB%E3%82%88%E3%82%8B%E8%B2%A7%E8%A1%80/%E5%B7%A8%E8%B5%A4%E8%8A%BD%E7%90%83%E6%80%A7%E8%B2%A7%E8%A1%80"
     }
    ]
   },
   {
    "item": "網赤血球(RET)による貧血の鑑別",
    "target": "MCVに次ぐ手がかり",
    "value": "網赤血球が増加=急性出血・溶血性貧血(回復期)を疑う。高度に減少=赤芽球癆を疑う。正常〜減少=骨髄低形成・造血器腫瘍・二次性貧血・鉄/ビタミンB12/葉酸欠乏・薬剤性など。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.japha.jp/doc/2107ga-01.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
  "review": "ai"
 },
 {
  "slug": "mallet-finger-hand-injuries",
  "name": "槌指(マレット指)と手指の外傷・腱鞘炎(ばね指・ボクサー骨折)",
  "category": "診断基準・分類",
  "aliases": [
   "槌 指",
   "マレット指",
   "マレット変形",
   "マレットフィンガー",
   "mallet finger",
   "ばね指",
   "弾発指",
   "ボクサー骨折",
   "突き指"
  ],
  "rows": [
   {
    "item": "槌指(マレット指)の病態と所見",
    "target": "ボールが指先に当たるなどで生じる指先の屈曲変形",
    "value": "伸筋腱が末節骨の付着部から剥離し(骨片を伴うこともある)、DIP関節が屈曲位になる。自分では伸ばせないが、他人が動かせば容易に伸ばせる(自動伸展不能・他動伸展可能)。受傷直後は腫れ・皮下出血、爪下血腫を伴うことがある",
    "exam": "53-pm-18(手にバスケットボールが当たって受傷、手指の写真とX線 → 槌指が正答。誤答:ばね指・ボクサー骨折・ムチランス変形・Bennett骨折)",
    "q": [
     "53-pm-18"
    ],
    "note": "確認済み[S1]。写真・X線の図は未確認。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/22-外傷と中毒/捻挫およびその他の軟部組織損傷/槌指"
     }
    ]
   },
   {
    "item": "槌指の画像診断と治療",
    "target": "診断の進め方と固定",
    "value": "通常は診察で診断。X線は骨折の有無の確認で、骨折は側面像でわかる(腱断裂のみならX線が正常のこともある)。治療は背側副子でDIP関節を伸展位に固定して6〜8週間。関節面の25%を超える骨折や亜脱臼を伴う骨折は手術が必要になることがある",
    "exam": "53-pm-18(手指の写真とX線から槌指を選ぶ設問)",
    "q": [
     "53-pm-18"
    ],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/22-外傷と中毒/捻挫およびその他の軟部組織損傷/槌指"
     }
    ]
   },
   {
    "item": "ばね指(弾発指)",
    "target": "指の屈筋腱と腱鞘の炎症(槌指との区別)",
    "value": "指が屈曲位で動かなくなり、パチンと音を立てて突然伸展する。屈伸時に弾発現象やロッキング、指の付け根に圧痛・結節。関節リウマチや糖尿病に多い。診断は臨床所見中心で、画像検査は通常不要。治療は副子・温熱・NSAIDs、無効ならステロイド注射、さらに手術(腱鞘を解放)",
    "exam": "53-pm-18(誤答選択肢。ボール外傷後のDIP関節が伸ばせない変形ではない)",
    "q": [
     "53-pm-18"
    ],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/06-筋骨格系疾患と結合組織疾患/手疾患/弾発指-狭窄性屈筋腱腱鞘炎"
     }
    ]
   },
   {
    "item": "ボクサー骨折(中手骨骨折)",
    "target": "硬いものを殴って生じる中手骨の骨折",
    "value": "壁や人の顎など硬いものを殴ったときに多いため「ボクサー骨折」と呼ばれる。指の関節が腫れて圧痛があり、骨片がずれたり回転したりして指の位置がずれることがある。診断は複数方向のX線。治療は整復(必要時)と副子固定を数週間。口の歯で皮膚が傷つくと感染に注意",
    "exam": "53-pm-18(誤答選択肢。ボール外傷で指先が伸ばせなくなる所見は槌指)",
    "q": [
     "53-pm-18"
    ],
    "note": "確認済み[S1]。第5中手骨頸部骨折という具体的な部位は、この資料では確認していない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/home/25-外傷と中毒/骨折/手のひらの骨折"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
  "review": "ai"
 },
 {
  "slug": "master-two-step-test",
  "name": "マスター二階段試験(Master two-step test)",
  "category": "臨床検査",
  "aliases": [
   "マスター二階段試験",
   "マスター2階段負荷試験",
   "マスターシングル試験",
   "Master's two-step test",
   "Master two-step",
   "Master 2-step",
   "Master's step test"
  ],
  "rows": [
   {
    "item": "負荷の型:単一段階(固定負荷)",
    "target": "運動負荷試験の分類",
    "value": "マスター2階段試験は、一定の負荷量を開始から終了まで続ける「単一段階負荷」。負荷量を時間ごとに増やす「多段階負荷」はトレッドミル(Bruce法など)・自転車エルゴメータ",
    "exam": "54-am-23(正答:固定負荷にて行う運動負荷試験=マスターシングルテスト)／50-pm-46(「運動負荷量を段階的に増加させる評価法」の正答はBruce法。マスターシングルテストは誤答)／58-am-19(退院時の運動機能評価:正答は6分間歩行テスト、マスターシングルテスト・ハンドグリップテストは誤答)",
    "q": [
     "54-am-23",
     "50-pm-46",
     "58-am-19"
    ],
    "note": "確認済み[S1]。Bruce法が多段階であることは[S1]でトレッドミルの代表的プロトコールとして触れられている",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.kango-roo.com/learning/1502/"
     }
    ]
   },
   {
    "item": "方法:台の高さ・昇降回数・時間",
    "target": "シングル負荷とダブル負荷",
    "value": "高さ9インチ(23 cm)の凸型2段の台。年齢・性別・体重から求めた昇降回数を1分30秒で行う=シングル負荷。その2倍の回数を3分で行う=ダブル負荷",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。昇降回数は表から求める(具体的な表の値は未確認のため記載しない)",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.kango-roo.com/learning/1502/"
     }
    ]
   },
   {
    "item": "手順:心電図の記録",
    "target": "手順",
    "value": "座位で安静時の心電図→台の昇降(上下1回=6動作で、6動作目に回れ右して折り返す)→運動後ただちに椅子に座り、回復時の心電図を記録",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S2]。大学紀要の記述で、方法の流れの確認用",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://hosei.ecats-library.jp/da/repository/00007169/29tomita.pdf"
     }
    ]
   },
   {
    "item": "臨床での使われ方(心臓リハ)",
    "target": "急性心筋梗塞の心臓リハ(クリニカルパス例)",
    "value": "日本循環器学会ガイドライン(2021年改訂版)に示された急性心筋梗塞の10日パス例で、心臓リハビリのエントリーテスト非該当例の負荷として「マスターシングル試験またはシャワー浴負荷試験」が記されている",
    "exam": "58-am-19(経皮的僧帽弁形成術後の退院時の運動機能評価では、マスターシングルテストは誤答。正答は6分間歩行テスト)",
    "q": [
     "58-am-19"
    ],
    "note": "確認済み[S3]。急性心筋梗塞のパスの記載であり、弁膜症の退院時評価への推奨ではない",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2021/03/JCS2021_Makita.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
  "review": "ai"
 },
 {
  "slug": "mci-mild-cognitive-impairment",
  "name": "軽度認知障害(MCI)",
  "category": "診断基準・分類",
  "aliases": [
   "MCI",
   "軽度認知障害",
   "mild cognitive impairment",
   "健忘型MCI",
   "コンバート率"
  ],
  "rows": [
   {
    "item": "MCIの有病率(65歳以上)",
    "target": "疫学",
    "value": "我が国の65歳以上のMCI有病率は15.5%(2022年調査、性年齢調整後、約559万人)。認知症は12.3%(約443万人)で、合わせて約28%。2012年調査ではMCI 13.0%(約400万人)、認知症15.0%(約462万人)。診療ガイドラインでは、研究ごとに異なるが65歳以上で15〜25%、罹患率は20〜50/1,000人年程度と推定される。",
    "exam": "60-am-26(「我が国の65歳以上の高齢者におけるMCIの有病率で適切なのはどれか」。選択肢5・15・35・55・75%。正答=15%)",
    "q": [
     "60-am-26"
    ],
    "note": "確認済み[S1][S2]。2040年の推計はMCI約613万人(2022年の有病率が一定と仮定した場合)[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.mhlw.go.jp/content/001279920.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.neurology-jp.org/guidelinem/degl/degl_2017_04.pdf"
     }
    ]
   },
   {
    "item": "MCIから認知症への移行・正常への回復",
    "target": "経過",
    "value": "軽度認知障害から認知症へのコンバートはおよそ5〜15%/年、正常へのリバートはおよそ16〜41%/年と考えられる(研究により幅がある。専門医による追跡のほうが移行率は高い)。5年間の観察で837名のうち352名(42.1%)がAlzheimer型認知症に進んだとする報告もある。",
    "exam": "49-am-98(Alzheimer型認知症について。誤答=「軽度認知障害の80%はAlzheimer型認知症に移行する」。正答は別の選択肢)",
    "q": [
     "49-am-98"
    ],
    "note": "確認済み[S1]。MCIの全員が認知症になるわけではなく、正常に戻る人もいる。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.neurology-jp.org/guidelinem/degl/degl_2017_04.pdf"
     }
    ]
   },
   {
    "item": "MCIの定義と診断",
    "target": "診断",
    "value": "認知症とも知的に正常とも言えない中間状態。①もの忘れの訴え ②神経心理検査で年齢に比して記憶障害を確認 ③一般的な認知機能は正常 ④家事や仕事などの日常生活動作(ADL)は概ね正常 ⑤認知症ではない。分類は健忘型(amnestic)か非健忘型か、さらに単一領域か複数領域か。定型のMCI診断法が確立されているとは言い難い。",
    "exam": "出題は直接なし(参考。60-am-26・49-am-98 の背景)",
    "q": [],
    "note": "確認済み[S1][S2]。S1は2010年版ガイドライン。厚生労働省の資料でも「日常生活は自立しているため認知症とは診断されない状態」と定義されている。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.neurology-jp.org/guidelinem/degl/sinkei_degl_2010_cqivb-1.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.mhlw.go.jp/content/001279920.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
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
  "slug": "measurement-scales",
  "name": "尺度水準(名義・順序・間隔・比率尺度)",
  "category": "診断基準・分類",
  "aliases": [
   "尺度水準",
   "名義尺度",
   "順序尺度",
   "間隔尺度",
   "比率尺度",
   "Likert尺度",
   "リッカート尺度",
   "徒手筋力テスト 尺度"
  ],
  "rows": [
   {
    "item": "順序尺度",
    "target": "数値の大きさが意味をもつ尺度",
    "value": "数値の大きさに意味がある(例:リレーの順位)。順位は決まるが間隔は等しいとは限らない。名義・順序尺度のデータには順位に基づく検定を用いる",
    "exam": "53-am-21(誤答:順序尺度を「重さ、長さ、時間などの物理量」とする説明/Likert尺度を比率尺度とする説明)／49-pm-24(Danielsの徒手筋力テストは順序尺度=正答選択肢)",
    "q": [
     "53-am-21",
     "49-pm-24"
    ],
    "note": "確認済み[S1]。大阪大学図書館の講義資料の定義。MMTを順序尺度とする点は出題の記載で、この資料の例には載っていない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.library.osaka-u.ac.jp/doc/LS_20181211_statistics.pdf"
     }
    ]
   },
   {
    "item": "名義尺度",
    "target": "数値の大きさが意味をもたない尺度",
    "value": "数値を入れ替えても構わない(例:リレーのレーン番号と組の対応)",
    "exam": "53-am-21(誤答:名義尺度を「大小関係や程度のような順位を有する尺度」とする説明。順位をもつのは順序尺度)",
    "q": [
     "53-am-21"
    ],
    "note": "確認済み[S1]。大阪大学図書館の講義資料の定義。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.library.osaka-u.ac.jp/doc/LS_20181211_statistics.pdf"
     }
    ]
   },
   {
    "item": "間隔尺度",
    "target": "順序尺度の条件+間隔が一定",
    "value": "数値の加減を考えられる(例:タイムの20秒と21秒と22秒の差が等しい)。倍数は考えない",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。大阪大学図書館の講義資料の定義。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.library.osaka-u.ac.jp/doc/LS_20181211_statistics.pdf"
     }
    ]
   },
   {
    "item": "比率尺度",
    "target": "間隔尺度の条件+倍数を考えられる",
    "value": "数値の加減乗除を考えられる(例:走行距離100mは200mの半分)",
    "exam": "53-am-21(誤答の元になる定義。重さ・長さ・時間などの物理量は比率尺度として扱われる)",
    "q": [
     "53-am-21"
    ],
    "note": "確認済み[S1]。大阪大学図書館の講義資料の定義。この資料は「リレーのタイム」を間隔尺度の例に、「距離」を比率尺度の例に挙げる。国試は「時間」を比率尺度側に置くため、時間の分類は教材で表現が分かれる点に注意。",
    "conflict": true,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.library.osaka-u.ac.jp/doc/LS_20181211_statistics.pdf"
     }
    ]
   },
   {
    "item": "尺度と検定の選択の関係",
    "target": "データの種類による分岐",
    "value": "対応あり・なしのフロー図で、名義尺度・順序尺度のデータと、間隔尺度・比率尺度のデータで選ぶ検定が分かれる(例:間隔・比率尺度で正規分布なら対応のあるt検定やStudent/Welchのt検定、そうでなければ順位に基づく検定)",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。大阪大学図書館の講義資料の定義。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.library.osaka-u.ac.jp/doc/LS_20181211_statistics.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "medical-interview-skills",
  "name": "医療面接の技法(開かれた質問・閉じた質問・反映・是認)",
  "category": "検査法・徴候",
  "aliases": [
   "医療面接",
   "面接技法",
   "問診",
   "開かれた質問",
   "開いた質問",
   "開放型質問",
   "開放型質問法",
   "自由質問法",
   "閉じた質問",
   "閉鎖質問",
   "閉鎖質問法",
   "オープンクエスチョン",
   "クローズドクエスチョン",
   "共感的",
   "傾聴",
   "反映",
   "是認"
  ],
  "rows": [
   {
    "item": "開放型質問法(開かれた質問・自由質問法)",
    "target": "情報収集・患者の訴えを自分の言葉で話してもらう",
    "value": "話す内容を患者に決めさせる質問。「それはどういうことですか?」「もう少し詳しく話していただけますか?」など、患者が自分の言葉で症状や問題点を表現できる",
    "exam": "60-pm-38(開かれた質問=「退院後は何をしますか」が正答。誤答=はい・いいえで答えられる質問)／52-am-26(自由質問法=「どのようなことでお困りですか」が正答。誤答=名前・家族の人数・発症時期・右か左かを問う限定・選択式の質問)／53-pm-50(開いた質問=「今日の具合はいかがですか」が正答)",
    "q": [
     "60-pm-38",
     "52-am-26",
     "53-pm-50"
    ],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/jjpm/59/4/59_302/_pdf/-char/ja"
     }
    ]
   },
   {
    "item": "閉鎖質問法(閉じた質問)",
    "target": "確認・絞り込み",
    "value": "「はい」「いいえ」、または単純な語句で答えられる質問。「絞り込み」では最初に開放型を使い、途中から閉鎖型に切り替えて対象を狭める。閉鎖質問の多用は、患者の不安の開示と有意な負の相関があったと報告されている",
    "exam": "60-pm-38(「右膝は痛みますか」「朝食を食べましたか」「昨晩は熟睡できましたか」「椅子から立ち上がれますか」はいずれも閉じた質問=誤答)／53-pm-50(閉じた質問の例に挙げられた「膝内側ですか、外側ですか、それとも前ですか」は選択肢を示す質問)",
    "q": [
     "60-pm-38",
     "53-pm-50"
    ],
    "note": "確認済み[S1]。国試の「選択式質問」は資料の閉鎖質問(単純な語句で答えられる質問)の一種として整理した。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/jjpm/59/4/59_302/_pdf/-char/ja"
     }
    ]
   },
   {
    "item": "促進・まとめ・絞り込み(情報を得る3つの技法)",
    "target": "身体的情報を多く得る面接技法",
    "value": "絞り込み=最初は開放型、途中から閉鎖型で範囲を狭める／促進=患者が話し続けられるよう促す語句や振る舞い(「はは、なるほど」など)／まとめ=聞いた内容をまとめて確認する(まとめの定義の詳細は本文で未確認)",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。「まとめ」の具体的な定義は抽出できた範囲では記載なし。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/jjpm/59/4/59_302/_pdf/-char/ja"
     }
    ]
   },
   {
    "item": "反映・是認(感情を受け止める応答)",
    "target": "共感的な対応・信頼関係",
    "value": "反映=医師(医療者)が患者に観察された感情に言及すること／是認=患者を受け止めるような会話で、患者の世界を壊さない関わり。反映と是認は患者満足度と有意に関連した",
    "exam": "49-pm-79(「治る見込みがないのにリハを続けるのは苦しい」への共感的な対応=「つらく感じているのですね」が正答)／50-pm-20(「明日の手術が心配です」への対応=「手術を明日に控えて、いろいろと心配になりますよね」が正答。誤答=「手術をやめたいということですか」など)",
    "q": [
     "49-pm-79",
     "50-pm-20"
    ],
    "note": "確認済み[S1]。国試の「共感的応答」は資料の「反映・是認」に当たる。Rogersの来談者中心療法(49-pm-81)は資料になく未確認。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/jjpm/59/4/59_302/_pdf/-char/ja"
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
  "slug": "memory-process-classification",
  "name": "記憶の過程と分類(記銘・保持・想起/展望記憶/エピソード記憶ほか)",
  "category": "検査法・徴候",
  "aliases": [
   "記憶過程",
   "記銘",
   "想起",
   "展望記憶",
   "予定記憶",
   "エピソード記憶",
   "意味記憶",
   "手続き記憶",
   "プライミング",
   "短期記憶",
   "長期記憶",
   "ワーキングメモリー",
   "作業記憶",
   "前向性健忘",
   "逆向性健忘",
   "顕在記憶",
   "潜在記憶"
  ],
  "rows": [
   {
    "item": "記憶の過程(取り込み・保持・取り出し)",
    "target": "記憶障害の理解",
    "value": "記憶は「情報の取り込み(記銘)→保持→取り出し(再生・再認=想起)」のいずれの段階でも障害を受ける。大阪府の手引きは記憶障害を、新しい情報を覚え、保持し、必要なときに引き出すことの困難と説明する。",
    "exam": "56-am-78 正答=記銘・想起(誤答:計画立案・転換・配分)",
    "q": [
     "56-am-78"
    ],
    "note": "確認済み[S1][S2]。「記憶過程の要素」としての記銘・保持・想起は埼玉県資料の表現による。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.pref.saitama.lg.jp/documents/20853/rikaihen.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.pref.osaka.lg.jp/documents/5405/r6handbook_daiippen.pdf"
     }
    ]
   },
   {
    "item": "遂行機能・注意の要素(記憶過程ではない)",
    "target": "誤答選択肢の整理",
    "value": "遂行機能には、目標の設定、計画の立案と実行、効果的な行動、自己の行動のモニタリングと客観的評価が含まれる。全般性注意は選択性・持続性・転換性・配分性に分けられる。したがって「計画立案」は遂行機能、「転換」「配分」は注意の要素で、記憶過程(記銘・保持・想起)の要素ではない。",
    "exam": "56-am-78 誤答選択肢(計画立案・転換・配分)",
    "q": [
     "56-am-78"
    ],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.fukushi.metro.tokyo.lg.jp/documents/d/fukushi/2022handbook-2shou-2"
     }
    ]
   },
   {
    "item": "展望記憶(予定記憶)",
    "target": "未来の予定・約束の記憶",
    "value": "未来の出来事(約束)を成就するための記憶。例:「明日3時にAさんに会う」なら、その事実を覚え、時刻近くになったら思い起こす必要がある。J-STAGEの総説抄録でも、展望記憶は未来の出来事を意図し自発的に想起するもの、とされる。",
    "exam": "50-am-79 正答=展望記憶(「30分後にベルが鳴ったら訓練を終了してください」)",
    "q": [
     "50-am-79"
    ],
    "note": "確認済み[S1][S2]。誤答は意味記憶・手続き記憶・プライミング・エピソード記憶。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.fukushi.metro.tokyo.lg.jp/documents/d/fukushi/2022handbook-2shou-2"
     },
     {
      "label": "S2",
      "url": "https://www.jstage.jst.go.jp/article/hbfr/39/3/39_320/_article/-char/ja/"
     }
    ]
   },
   {
    "item": "エピソード記憶・意味記憶・手続き記憶",
    "target": "記憶の内容による分類",
    "value": "エピソード記憶=過去に経験した個人的な出来事の記憶(例:昨日学校で数学を勉強した)／意味記憶=言葉の概念に関する一般知識(例:横断歩道とは何か)／手続き記憶=繰り返しの学習で体得した技術・手順(スポーツや楽器演奏)。",
    "exam": "50-am-79 誤答選択肢(意味記憶・手続き記憶・エピソード記憶)",
    "q": [
     "50-am-79"
    ],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.fukushi.metro.tokyo.lg.jp/documents/d/fukushi/2022handbook-2shou-2"
     }
    ]
   },
   {
    "item": "記憶の分類(保持時間・顕在/潜在)",
    "target": "分類の全体像",
    "value": "埼玉県の資料の図:記憶は長期記憶と短期記憶(短期の保持)に分かれ、長期記憶は顕在記憶(エピソード記憶・意味記憶)と潜在記憶(手続き記憶・プライミング)に分かれる。短期記憶は数秒〜1分程度、長期記憶は数分〜数十年に及ぶ(近時記憶=数分〜数か月前、遠隔記憶=何年にもわたる過去)。",
    "exam": "50-am-79 誤答選択肢(プライミング)",
    "q": [
     "50-am-79"
    ],
    "note": "確認済み[S1][S2]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.pref.saitama.lg.jp/documents/20853/rikaihen.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.fukushi.metro.tokyo.lg.jp/documents/d/fukushi/2022handbook-2shou-2"
     }
    ]
   },
   {
    "item": "前向性健忘・逆向性健忘・ワーキングメモリー",
    "target": "記憶障害の用語",
    "value": "前向性健忘=発症・受傷の後の出来事の記憶障害(新しいことの学習が困難)／逆向性健忘=発症・受傷の前の出来事の記憶障害／作業記憶=課題遂行中に情報を一時的に保持し、適宜引き出す記憶。作話=記憶の欠落を事実と異なる内容で埋めて話すこと。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.fukushi.metro.tokyo.lg.jp/documents/d/fukushi/2022handbook-2shou-2"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "memory-time-classification",
  "name": "記憶の時間的分類(即時・近時・遠隔記憶)と数唱",
  "category": "検査法・徴候",
  "aliases": [
   "数唱",
   "数字の順唱",
   "順唱",
   "逆唱",
   "デジットスパン",
   "digit span",
   "即時記憶",
   "近時記憶",
   "遠隔記憶",
   "記憶の分類"
  ],
  "rows": [
   {
    "item": "即時記憶と数唱(digit span)",
    "target": "注意・即時記憶の簡易評価",
    "value": "即時記憶=数十秒程度、情報を保持し続ける能力(例: 未知の電話番号を、かけるまでの短い間だけ覚えておく)。神経心理学では注意機能に含まれる。診察場面では3単語の直後再生や、Serial 7・digit spanで簡易に評価し、低下があれば注意障害(せん妄・confusional stateを含む)を考える",
    "exam": "60-pm-80(数字の順唱で評価できる記憶=即時記憶が正答。誤答=遠隔記憶・近時記憶・作動記憶・手続き記憶)／58-pm-79(即時記憶と関連があるのは=数字の順唱を行わせる、が正答)",
    "q": [
     "60-pm-80",
     "58-pm-79"
    ],
    "note": "確認済み[S1]。資料は数唱を「簡易な注意機能の評価」として挙げ、即時記憶が注意機能に含まれるとしており、国試の正答と整合する。作動記憶・手続き記憶は資料の抽出範囲で定義が未確認。順唱・逆唱の正常桁数は未確認のため記載しない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/neuropsychology/39/3/39_17190/_pdf"
     }
    ]
   },
   {
    "item": "近時記憶",
    "target": "遅延再生で評価される記憶",
    "value": "記銘してから数分〜数時間〜数日後に取り出す記憶。遅延再生・遅延再認(記銘の数分〜30分後に再生・再認)は近時記憶の評価",
    "exam": "58-pm-79(誤答選択肢「昨夜の夕食のおかずは何でしたか」「いったん覚えてもらった言葉を3分後に思い出させる」は近時記憶)／60-pm-80(誤答選択肢の近時記憶)",
    "q": [
     "58-pm-79",
     "60-pm-80"
    ],
    "note": "確認済み[S1]。近時記憶と遠隔記憶の間に明確な時間的な区別はない、と資料に明記。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/neuropsychology/39/3/39_17190/_pdf"
     }
    ]
   },
   {
    "item": "遠隔記憶",
    "target": "過去の古い出来事の記憶",
    "value": "月〜年単位の経過後に取り出す記憶。内容により3分類: 自伝的記憶(個人的な出来事の記憶)・社会的記憶(それぞれの時代に話題になった社会的出来事の記憶)・個人的意味記憶(通った学校名や中学1年の担任の名前など)",
    "exam": "58-pm-79(誤答選択肢「以前の社会的な事件を思い出させる」=社会的記憶、「結婚したのは何歳のときですか」=個人的な過去の出来事で、いずれも遠隔記憶)／60-pm-80(誤答選択肢の遠隔記憶)",
    "q": [
     "58-pm-79",
     "60-pm-80"
    ],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/neuropsychology/39/3/39_17190/_pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "meningeal-signs",
  "name": "髄膜刺激徴候(項部硬直・Kernig徴候・Brudzinski徴候)",
  "category": "検査法・徴候",
  "aliases": [
   "髄膜刺激徴候",
   "髄膜刺激症状",
   "項部硬直",
   "Kernig",
   "Kernig徴候",
   "Kernig sign",
   "ケルニッヒ",
   "Brudzinski",
   "Brudzinski徴候",
   "ブルジンスキー",
   "項部徴候",
   "nuchal rigidity",
   "jolt accentuation"
  ],
  "rows": [
   {
    "item": "髄膜刺激徴候を誘発しやすい体位",
    "target": "検査の姿勢",
    "value": "国試の正答は長座位(選択肢は側臥位・端座位・長座位・背臥位・腹臥位)。資料で確認できたのは、Kernigは原法では坐位で行い、現在は背臥位で股・膝を直角に曲げて行うのが一般的、という点まで。「長座位」を誘発体位とする記載は確認できなかった。",
    "exam": "60-pm-45(髄膜刺激徴候を誘発しやすい体位はどれか。正答=長座位)",
    "q": [
     "60-pm-45"
    ],
    "note": "[S2]を確認。国試の正答(長座位)と資料(坐位・背臥位)の表現が違うため食い違いとして残す。Kernig徴候は、炎症のある神経根が引き伸ばされるのを防ぐ、ハムストリングスの防御的な緊張として説明される[S2]。股関節を曲げて膝を伸ばす姿勢は、この伸張が加わる姿勢になる(資料の説明からの推論)。",
    "conflict": true,
    "sources": [
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3548367/"
     }
    ]
   },
   {
    "item": "項部硬直(nuchal rigidity)",
    "target": "髄膜刺激徴候",
    "value": "頸部を他動的または能動的に曲げる(屈曲)ときの抵抗。変形性頸椎症や、筋肉痛を伴うインフルエンザによる頸部のこわばりとは、「頸部の回旋はできるが屈曲ができない」点で区別される(髄膜刺激では主に屈曲が制限される)。出現までに時間がかかることがある。",
    "exam": "59-pm-4(51歳女性、突然の意識障害、JCSⅢ-200、項部硬直陽性、発症時の頭部CTで疑う疾患=くも膜下出血(正答)。誤答は髄膜炎・脳腫瘍・脳膿瘍・急性硬膜下血腫)",
    "q": [
     "59-pm-4"
    ],
    "note": "確認済み[S1]。項部硬直は髄膜炎だけの所見ではない(くも膜下出血でも出る)。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-神経疾患/髄膜炎/髄膜炎の概要"
     }
    ]
   },
   {
    "item": "Kernig徴候",
    "target": "髄膜刺激徴候",
    "value": "背臥位で股関節と膝関節を直角に曲げ、検者が膝をゆっくり伸ばす。膝関節を135度以上(ほぼ伸びた角度)まで他動的に伸ばそうとして、抵抗または痛みが出れば陽性。原法では痛みは必須ではなかったが、臨床では痛みを陽性の条件に含める人が多い。",
    "exam": "60-pm-82(深部感覚障害で陽性になるのはどれか。正答=Romberg徴候。Kernig徴候は誤答選択肢で、髄膜刺激徴候。他の誤答はBarré徴候・Lasègue徴候・カーテン徴候)",
    "q": [
     "60-pm-82"
    ],
    "note": "確認済み[S1][S2]。Lasègue徴候(SLR)は坐骨神経・神経根の伸張テストで別のカードあり。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-神経疾患/髄膜炎/髄膜炎の概要"
     },
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3548367/"
     }
    ]
   },
   {
    "item": "Brudzinski徴候(項部徴候)",
    "target": "髄膜刺激徴候",
    "value": "背臥位で、検者が片手を患者の後頭部の下、もう片手を胸に置き、頸部を他動的に前へ曲げる。股関節と膝関節が反射的に曲がれば陽性(完全でも部分的でもよい)。Brudzinskiは、一方の下肢を他動的に曲げると反対側の下肢が反射的に曲がる(対側下肢徴候)なども記載した。",
    "exam": "出題は直接なし(参考。髄膜刺激徴候の仲間として)",
    "q": [],
    "note": "確認済み[S1][S2]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-神経疾患/髄膜炎/髄膜炎の概要"
     },
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3548367/"
     }
    ]
   },
   {
    "item": "くも膜下出血での項部硬直の出方",
    "target": "くも膜下出血の症状",
    "value": "突然の激しい頭痛が数秒でピークに達し、意識障害を伴うことがある。項部硬直は、小脳扁桃ヘルニアが起こらない限り、初期には通常みられない。24時間以内に化学性髄膜炎による髄膜刺激徴候と嘔吐が出ることがある。",
    "exam": "59-pm-4(項部硬直陽性・JCSⅢ-200・突然の意識障害の症例からくも膜下出血を選ぶ。CT所見も合わせて判断する問題)",
    "q": [
     "59-pm-4"
    ],
    "note": "確認済み[S3]。国試の症例は項部硬直陽性だが、MSDは「初期には通常みられない」とする。項部硬直の有無だけで除外せず、突然発症・CT所見と合わせて判断する(本カードの整理)。",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-神経疾患/脳卒中/くも膜下出血-sah"
     }
    ]
   },
   {
    "item": "髄膜刺激徴候の診断精度",
    "target": "検査の限界",
    "value": "感度は低く、特異度は高い。腰椎穿刺前の成人297人の前向き研究では、Kernig徴候・Brudzinski徴候の感度はどちらも5%、項部硬直は30%で、3つとも髄膜炎かどうかをうまく見分けられなかった(陽性尤度比はほぼ1)。ほかの報告でも感度は5〜27%、特異度は成人で約95%(Kernig・Brudzinski)。陰性でも髄膜炎は否定できないが、陽性なら可能性は高い、と整理されている。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S2][S4]。乳児(6か月未満)・高齢者・免疫低下・昏睡では徴候が出ないことがある[S2]。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3548367/"
     },
     {
      "label": "S4",
      "url": "https://pubmed.ncbi.nlm.nih.gov/12060874/"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
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
  "slug": "moyamoya-disease",
  "name": "もやもや病(脳血管造影・鈴木分類)",
  "category": "診断基準・分類",
  "aliases": [
   "もやもや病",
   "ウィリス動脈輪閉塞症",
   "もやもや血管",
   "脳血管造影",
   "脳血管造影検査",
   "鈴木分類",
   "類もやもや病",
   "内頚動脈終末部",
   "内頸動脈終末部"
  ],
  "rows": [
   {
    "item": "もやもや病とは",
    "target": "疾患の概要",
    "value": "日本人に多発する原因不明の進行性の脳血管閉塞症。脳血管撮影で、両側の内頚動脈終末部に狭窄または閉塞と、その周囲の異常血管網(もやもや血管)を認める。指定難病。",
    "exam": "60-pm-15 正答=もやもや病(選択肢: 脳炎・脳腫瘍・もやもや病・硬膜動静脈瘻・アテローム性脳梗塞)。症例は25歳女性で、熱いラーメンを吹いて冷ましていると右の手足に力が入らなくなる症状が数分続き、脳血管造影(正面像・側面像)が示された。画像そのものはこのカードでは未確認。",
    "q": [
     "60-pm-15"
    ],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://mhlw-grants.niph.go.jp/system/files/download_pdf/2021/202111022A.pdf"
     }
    ]
   },
   {
    "item": "小児例の症状と誘発因子",
    "target": "一過性の脱力発作など",
    "value": "小児例は脳虚血の症状で始まることが多く、意識障害・脱力発作(四肢麻痺・片麻痺・単麻痺)・感覚異常・不随意運動・けいれん・頭痛など。虚血発作は過呼吸(啼泣など)で誘発され、反復し、病側の左右が交代することもある。",
    "exam": "60-pm-15 の「熱いものを吹く」ことで片側の脱力が数分続く、という経過に対応する。",
    "q": [
     "60-pm-15"
    ],
    "note": "確認済み[S1]。出典は「過呼吸(啼泣など)」と記載。熱い食べ物を吹く動作が過呼吸にあたることは、問題の状況からの学習用の補足。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://mhlw-grants.niph.go.jp/system/files/download_pdf/2021/202111022A.pdf"
     }
    ]
   },
   {
    "item": "診断基準(画像)",
    "target": "脳血管造影とMRI/MRA",
    "value": "診断には脳血管造影などの画像診断が必須。脳血管造影では(1)頭蓋内内頚動脈終末部を中心とした領域の狭窄または閉塞、(2)動脈相でもやもや血管(異常血管網)がみられる。両側性・片側性を問わない。MRIでは1.5テスラ以上の機種で、MRAの内頚動脈終末部の狭窄または閉塞、heavy T2強調画像での両側の内頚動脈終末部・中大脳動脈水平部の血管外径の縮小、MRAでの脳底部・脳室周囲の異常血管網の3つがそろえば診断してよい。片側性や動脈硬化を合併する病変では、脳血管造影で他の疾患を除外することが必須。",
    "exam": "60-pm-15 は脳血管造影の画像から疑う疾患を選ぶ問題。",
    "q": [
     "60-pm-15"
    ],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://mhlw-grants.niph.go.jp/system/files/download_pdf/2021/202111022A.pdf"
     }
    ]
   },
   {
    "item": "発症年齢・性差・疫学",
    "target": "好発年齢",
    "value": "発症年齢は二峰性で、5〜10歳を中心とする高い山と30〜40歳を中心とする低い山がある。男女比は1:2.5(女性に多い)。有病率は10万人あたり3〜10.5人。家族性の発症が10〜20%。RNF213遺伝子の多型p.R4810Kが感受性遺伝子で、日本人患者の80〜90%が保因する。",
    "exam": "60-pm-15 の患者は25歳の女性。",
    "q": [
     "60-pm-15"
    ],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://mhlw-grants.niph.go.jp/system/files/download_pdf/2021/202111022A.pdf"
     }
    ]
   },
   {
    "item": "成人例の症状",
    "target": "出血と虚血",
    "value": "成人例は頭蓋内出血(多くは脳室内出血、そのほかくも膜下出血・脳内出血)が40〜50代を中心にみられ、成人例の30〜40%に頭蓋内出血を認める。虚血発作で発症する場合もあり、小児と同様に高度な脳循環不全を示す例も、症状が限局して軽い例もある。無症候で発見される例が増えている(3〜16%)。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://mhlw-grants.niph.go.jp/system/files/download_pdf/2021/202111022A.pdf"
     }
    ]
   },
   {
    "item": "鈴木分類(脳血管撮影の病期)",
    "target": "閉塞性変化の進行度",
    "value": "第1期: carotid fork狭小期(内頚動脈終末部の狭窄)。第2期: もやもや初発期。第3期: もやもや増勢期(前・中大脳動脈が脱落し始める)。第4期: もやもや細微期(後大脳動脈が脱落し始める)。第5期: もやもや縮小期(内頚動脈系主幹動脈がほとんど消失)。第6期: もやもや消失期(外頚動脈・椎骨動脈系のみ血流を保つ)。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。形態学的に進んでいても臨床的に重症とは限らない(側副路で代償されるため)。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://mhlw-grants.niph.go.jp/system/files/download_pdf/2021/202111022A.pdf"
     }
    ]
   },
   {
    "item": "鑑別診断(類もやもや病)",
    "target": "除外する病態",
    "value": "類似の脳血管病変が、自己免疫疾患(SLE・抗リン脂質抗体症候群・結節性多発動脈炎・顕微鏡的多発血管炎・シェーグレン症候群)、髄膜炎、脳腫瘍、ダウン症候群、神経線維腫症1型、頭部放射線照射の既往に伴う場合は「類もやもや病」として除外する。甲状腺機能亢進症の合併例は、もやもや病として診断してよい。",
    "exam": "出題は直接なし(参考)。60-pm-15 の誤答選択肢の脳腫瘍・脳炎などとの鑑別の背景。",
    "q": [],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://mhlw-grants.niph.go.jp/system/files/download_pdf/2021/202111022A.pdf"
     }
    ]
   },
   {
    "item": "治療",
    "target": "外科的血行再建術",
    "value": "急性期は血圧管理・脳圧亢進対策などの内科的治療。脳虚血発作には外科的血行再建術が有効とされ、慢性期に行うことが多い。浅側頭動脈-中大脳動脈吻合術を中心とする直接血行再建術、側頭筋接着術などの間接血行再建術、両者を併用する複合血行再建術がある。出血例への直接または複合血行再建術は脳出血の再発予防効果があるとされる。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://mhlw-grants.niph.go.jp/system/files/download_pdf/2021/202111022A.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
  "review": "ai"
 },
 {
  "slug": "mpi-maudsley",
  "name": "モーズレイ性格検査(MPI)",
  "category": "検査法・徴候",
  "aliases": [
   "MPI",
   "モーズレイ性格検査",
   "モーズレー性格検査",
   "Maudsley Personality Inventory"
  ],
  "rows": [
   {
    "item": "MPI(モーズレイ性格検査)の構成",
    "target": "人格(パーソナリティ)の質問紙検査",
    "value": "Eysenckが作成した人格質問紙検査。下位尺度は、外向性(E)と神経症的傾向(N)の2つと、回答の妥当性を見る虚偽(L)尺度。E・Nは各24項目で、施行しやすく短時間で回答できる。日本版(1970年に岩原らが作成)は「はい・いいえ」式で80項目(E 24・N 24・L 20・ダミー12)、満点はE 48・N 48・L 40、所要は約10分。",
    "exam": "56-am-79(「イラスト風に描かれた人物のセリフを書き込む」形式の心理検査を問う問題で、モーズレイ性格検査〈MPI〉は誤答選択肢。正答はP-Fスタディ。他の誤答はSCT・バウムテスト・NEO-PI-R)",
    "q": [
     "56-am-79"
    ],
    "note": "確認済み[S1][S2][S3]。[S2]は日本版の使用報告で、項目数の内訳は[S2]による。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://tk.seitoku-u.ac.jp/cms_tk_seitoku/wp-content/uploads/2024/12/%E8%81%96%E5%BE%B3%E5%A4%A7%E5%AD%A6%E5%85%AC%E8%AA%8D%E5%BF%83%E7%90%86%E5%B8%AB%E5%85%A5%E5%AD%A6%E8%AA%AC%E6%98%8E%E4%BC%9A%E6%A8%A1%E6%93%AC%E8%AC%9B%E7%BE%A9%E3%83%91%E3%83%BC%E3%82%BD%E3%83%8A%E3%83%AA%E3%83%86%E3%82%A3%E6%A4%9C%E6%9F%BB.pdf"
     },
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5559986/"
     },
     {
      "label": "S3",
      "url": "https://www.jstage.jst.go.jp/article/psycholres1954/12/4/12_4_176/_article/-char/en"
     }
    ]
   },
   {
    "item": "MPIは質問紙法(投影法ではない)",
    "target": "検査の種類の見分け",
    "value": "あらかじめ決まった質問に自分で答える質問紙法の人格検査。人物のセリフを書き込むP-Fスタディ、文章の続きを書くSCT、木を描くバウムテストは、投影法で別の種類(別のカード参照)。",
    "exam": "56-am-79(「人物のセリフを書き込む」に当てはまるのはP-Fスタディで、MPIは質問紙のため誤り)",
    "q": [
     "56-am-79"
    ],
    "note": "確認済み[S1]。質問紙法の例としてMPI・MMPI・YG性格検査、投影法の例としてSCT・バウムテスト・TAT・Rorschachが同じ資料に挙げられている。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://tk.seitoku-u.ac.jp/cms_tk_seitoku/wp-content/uploads/2024/12/%E8%81%96%E5%BE%B3%E5%A4%A7%E5%AD%A6%E5%85%AC%E8%AA%8D%E5%BF%83%E7%90%86%E5%B8%AB%E5%85%A5%E5%AD%A6%E8%AA%AC%E6%98%8E%E4%BC%9A%E6%A8%A1%E6%93%AC%E8%AC%9B%E7%BE%A9%E3%83%91%E3%83%BC%E3%82%BD%E3%83%8A%E3%83%AA%E3%83%86%E3%82%A3%E6%A4%9C%E6%9F%BB.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
  "review": "ai"
 },
 {
  "slug": "mrc-sum-score",
  "name": "MRC sum score(ICU-AW)",
  "category": "評価尺度",
  "aliases": [
   "MRC sum score",
   "MRC sum-score",
   "MRCスコア",
   "MRC sum",
   "Medical Research Council",
   "ICU-AW",
   "ICU獲得性筋力低下",
   "集中治療室獲得性筋力低下",
   "ICU-acquired weakness"
  ],
  "rows": [
   {
    "item": "MRC sum score の求め方",
    "target": "ICU-AW(ICU獲得性筋力低下)の評価",
    "value": "左右の上下肢6筋群=12か所(肩・腕の外転/肘(前腕)屈曲/手関節伸展/股関節屈曲/膝伸展/足関節背屈)を徒手筋力テストで評価し、合計0〜60点(満点60点)",
    "exam": "60-am-37(正答:MRC sum scoreで評価できるのはICU-AW。誤答=意識障害・嚥下障害・HAD・抑うつ)／59-pm-42(問題文:MRC sum scoreによるICU-AWの判定)",
    "q": [
     "60-am-37",
     "59-pm-42"
    ],
    "note": "確認済み[S1][S2]。各筋0〜5点は徒手筋力テストの段階(12筋×5=60点)。筋群の呼び方は資料により「肘屈曲/前腕屈曲」など差がある",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4592111/"
     },
     {
      "label": "S2",
      "url": "https://www.jsicm.org/provider/pdf/pics02.pdf"
     }
    ]
   },
   {
    "item": "ICU-AW の判定基準(カットオフ)",
    "target": "ICU-AWの疑い",
    "value": "合計が60点満点中48点未満、または検査可能な筋の平均が4点未満で、重症患者に急性に生じた四肢の筋力低下。24時間以上あけて2回以上測定する",
    "exam": "59-pm-42(正答:両側合計48点未満／平均4点未満。誤答=すべて同一の背臥位で測定する・ICU入室時の検査で判定する・握力20 kg未満)",
    "q": [
     "59-pm-42"
    ],
    "note": "確認済み[S1][S2]。48点÷12筋=平均4点。「同一の背臥位で測定」が誤りとされる理由は、今回の資料では確認していない",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4592111/"
     },
     {
      "label": "S2",
      "url": "https://www.jsicm.org/provider/pdf/pics02.pdf"
     }
    ]
   },
   {
    "item": "測定できる状態(覚醒・協力)",
    "target": "いつ測れるか",
    "value": "患者が覚醒し、十分な協力と理解が得られる必要がある。せん妄などの意識障害があると評価が難しい。鎮静・せん妄・昏睡中は早期の筋力評価の妨げになる",
    "exam": "59-pm-42(誤答:「ICU入室時の検査で判定する」)／60-am-37(誤答:意識障害は評価対象ではない)",
    "q": [
     "59-pm-42",
     "60-am-37"
    ],
    "note": "確認済み[S1][S2]。MRC sum scoreは意識や嚥下ではなく、筋力(ICU-AW)を見る指標",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.jsicm.org/provider/pdf/pics02.pdf"
     },
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4592111/"
     }
    ]
   },
   {
    "item": "ICU-AW と判断する前の鑑別",
    "target": "他の筋力低下の原因を除く",
    "value": "重症病態以外に筋力低下をきたす疾患を確認する(ギラン・バレー症候群・重症筋無力症・ALSなどの神経筋疾患、頸髄・脳幹疾患、甲状腺疾患などの内分泌疾患、低カリウム血症・高マグネシウム血症などの電解質異常)",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S2]。[S1]も、重症病態以外にもっともらしい原因がないことを診断の条件としている",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.jsicm.org/provider/pdf/pics02.pdf"
     },
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4592111/"
     }
    ]
   },
   {
    "item": "握力によるICU-AWの目安",
    "target": "MRCとは別の指標",
    "value": "握力計での目安は男性11 kg未満・女性7 kg未満(文献値)。MRC sum scoreでは、60点満点中48点未満=ICU-AW(有意な筋力低下)、36点未満=重度の筋力低下の目安",
    "exam": "59-pm-42(誤答:「握力が20 kg未満である」はMRC sum scoreの判定条件ではない)",
    "q": [
     "59-pm-42"
    ],
    "note": "確認済み[S1]。[S1]は重度の目安を「36/48」と書くが、60点満点の誤記と思われる。国試の選択肢の20 kgは、この文献の値と一致しない。握力はMRC sum scoreの判定基準ではない",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4592111/"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
  "review": "ai"
 },
 {
  "slug": "mri-basics",
  "name": "MRIの基本(T1強調像・T2強調像・適応と禁忌)",
  "category": "臨床検査",
  "aliases": [
   "MRI",
   "T1強調像",
   "T2強調像",
   "T1強調画像",
   "T2強調画像",
   "腰椎MRI",
   "膝MRI",
   "足部MRI",
   "MR画像",
   "磁気共鳴画像"
  ],
  "rows": [
   {
    "item": "T1強調像・T2強調像での見え方",
    "target": "画像の信号(白黒)の読み方",
    "value": "脂肪: T1強調像で明るい(高信号)、T2強調像で比較的暗い(低信号)。水・液体(髄液など): T1強調像で比較的暗く、T2強調像で明るい。T1強調像は正常の軟部組織の解剖や脂肪の確認に適し、T2強調像は液体や異常(腫瘍・炎症・外傷など)の描出に適する。",
    "exam": "59-am-86: 「T2強調画像で髄液は低信号」は誤答(髄液はT2強調像で高信号)。正答は「拡散強調画像は急性期脳梗塞の診断に有用」。",
    "q": [
     "59-am-86"
    ],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/24-その他のトピック/放射線学的検査の原則/mri"
     }
    ]
   },
   {
    "item": "MRIが得意な部位(脊髄・関節・軟部組織)",
    "target": "運動器・神経のどの評価にMRIを使うか",
    "value": "軟部組織のコントラスト分解能が必要な場合はCTよりMRIが好まれる。脊髄・頭蓋内の異常、炎症、外傷の評価、関節内の障害の評価、筋骨格系の腫瘍の評価に用いる。膝関節MRIでは半月板の所見が示される。",
    "exam": "51-am-9: 腰椎MRI(矢状断・水平断)の図を用いた問題。52-am-9: 腰背部X線とMRIから病態を2つ選ぶ問題(正答は骨粗鬆症・椎体圧迫骨折。誤答=脊椎分離症・脊柱管狭窄症・椎間板ヘルニア)。52-am-14: 足部MRI(アキレス腱断裂)で損傷部位を示し、受傷直後の処置を問う問題。",
    "q": [
     "51-am-9",
     "52-am-9",
     "52-am-14"
    ],
    "note": "確認済み[S1](一般的な適応)。上記3問は図の読影を伴い、図は未確認。個々の疾患のMRI所見(椎体圧迫骨折・アキレス腱断裂など)は今回の資料で確認できていない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/24-その他のトピック/放射線学的検査の原則/mri"
     }
    ]
   },
   {
    "item": "MRIの禁忌とCTとの比較",
    "target": "検査前の確認事項と、CTとの違い",
    "value": "強磁性金属、磁気作動式・電子制御式の医療機器(ペースメーカー、植込み型除細動器、人工内耳など)、導線を含む材料が体内にある患者では相対的禁忌。機器の安全性が確認されるまで検査を行わない。MRIはCTより撮影に時間がかかり、比較的高価で、どこでもすぐ使えるとは限らない。",
    "exam": "出題は直接なし(参考)。61-am-86(第61回)で「CTは短時間で撮影できる」が正答の選択肢として出た。",
    "q": [],
    "note": "確認済み[S1]。CTとMRIの被曝量の比較は、今回の資料に具体的記載がなく書いていない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/24-その他のトピック/放射線学的検査の原則/mri"
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
  "slug": "myerson-sign",
  "name": "Myerson徴候(眉間反射)",
  "category": "検査法・徴候",
  "aliases": [
   "Myerson徴候",
   "Myerson's sign",
   "Myerson sign",
   "マイヤーソン徴候",
   "眉間反射",
   "眉間叩打",
   "眉間を叩く",
   "glabellar tap",
   "glabellar reflex",
   "glabellar tap sign"
  ],
  "rows": [
   {
    "item": "Myerson徴候(眉間反射)の見方",
    "target": "前頭葉解放徴候・パーキンソニズムの所見",
    "value": "眉間(両眉のあいだ)を指で繰り返し軽く叩く。正常では最初の数回は瞬目するが、叩き続けると慣れ(habituation)が生じて瞬目が止まる。叩くたびに瞬目が続いて止まらないのがMyerson徴候で異常所見。研究の一例では、約2回/秒で21回叩き、瞬目3回以下を正常・4回以上を異常とした(判定回数は文献により異なる)。",
    "exam": "49-pm-89(正答: Parkinson病の症状・徴候として正しいのはMyerson徴候。誤答: 企図振戦・アテトーゼ・ミオクロニー発作・折りたたみナイフ現象)",
    "q": [
     "49-pm-89"
    ],
    "note": "確認済み[S1][S2]。判定の叩打回数は研究ごとの設定。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://en.wikipedia.org/wiki/Glabellar_reflex"
     },
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC8536581/"
     }
    ]
   },
   {
    "item": "Parkinson病での出現",
    "target": "Parkinson病の補助的な所見",
    "value": "Parkinson病患者25人と健常者25人を比べた研究では、snout反射や眉間反射(glabellar tap)などが患者で明らかに多く、原始反射は診断の助けになりうると結論された。別の研究でも、眉間反射はパーキンソン症候群で比較的出やすい(感度が比較的高い)所見とされた。",
    "exam": "49-pm-89(正答)。60-pm-90(誤答選択肢: 腰椎椎間板ヘルニアでMyerson徴候は陽性、は誤り=別行)",
    "q": [
     "49-pm-89"
    ],
    "note": "確認済み[S3][S4]。",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://pubmed.ncbi.nlm.nih.gov/8270937/"
     },
     {
      "label": "S4",
      "url": "https://pubmed.ncbi.nlm.nih.gov/15452308/"
     }
    ]
   },
   {
    "item": "特異性・精度の限界",
    "target": "鑑別診断での使い方",
    "value": "Parkinson病・進行性核上性麻痺・多系統萎縮症の間で眉間反射の出現頻度に有意差はなく、疾患を区別する力(特異性)は乏しい。Parkinson病と本態性振戦を比べた研究では感度78.3%・特異度36.2%で、時間が経つと20%の患者で異常から正常に変わった。臨床では補助的な所見として扱う。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S2][S4][S5]。精度の数値は1つの研究の結果。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC8536581/"
     },
     {
      "label": "S4",
      "url": "https://pubmed.ncbi.nlm.nih.gov/15452308/"
     },
     {
      "label": "S5",
      "url": "https://www.jstage.jst.go.jp/article/clinicalneurol/60/12/60_cn-001459/_html/-char/ja"
     }
    ]
   },
   {
    "item": "腰椎椎間板ヘルニアの診察所見",
    "target": "腰椎椎間板ヘルニアの身体所見(Myerson徴候は含まれない)",
    "value": "診療ガイドラインが示す診察は、体幹前屈制限・tight hamstrings・疼痛性側弯、神経学的所見(感覚障害の範囲、下肢への放散痛、筋力低下、深部腱反射)、下肢伸展挙上テスト(SLRT)・交差SLRT・大腿神経伸展テストなど。眉間反射(Myerson徴候)は挙げられていない。",
    "exam": "60-pm-90(誤答選択肢: 腰椎椎間板ヘルニアでMyerson徴候は陽性である。正答は「脱出髄核は吸収されることがある」)",
    "q": [
     "60-pm-90"
    ],
    "note": "確認済み[S6]。ガイドライン本文にMyerson徴候の記載がないことを確認(記載なし=陽性所見として扱われていない)。",
    "conflict": false,
    "sources": [
     {
      "label": "S6",
      "url": "https://minds.jcqhc.or.jp/common/summary/pdf/c00645.pdf"
     }
    ]
   },
   {
    "item": "同問の他の選択肢(腰椎椎間板ヘルニアの基本)",
    "target": "60-pm-90 の正誤の根拠",
    "value": "有病率は約1%(「約15%」は誤り)。20〜40歳代の男性に多く、小児・高齢者では少ない(「小児期に多い」は誤り)。症候性ヘルニアの60%以上で画像上の退縮があり、sequestration型・extrusion型は吸収されやすい(「吸収されることがある」が正しい)。症状に膀胱直腸障害が挙がり、「生じない」は誤り。",
    "exam": "60-pm-90(正答: 脱出髄核は吸収されることがある。誤答: 小児期に多い・膀胱直腸障害は生じない・人口の約15%)",
    "q": [
     "60-pm-90"
    ],
    "note": "確認済み[S6]。",
    "conflict": false,
    "sources": [
     {
      "label": "S6",
      "url": "https://minds.jcqhc.or.jp/common/summary/pdf/c00645.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
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
  "slug": "neo-pi-r",
  "name": "NEO-PI-R(Revised NEO Personality Inventory)",
  "category": "評価尺度",
  "aliases": [
   "NEO-PI-R",
   "NEO-PI",
   "Revised NEO Personality Inventory",
   "NEO人格検査",
   "ビッグファイブ",
   "Big Five",
   "5因子モデル",
   "五因子モデル"
  ],
  "rows": [
   {
    "item": "NEO-PI-R の構成",
    "target": "性格(5因子)の質問紙検査",
    "value": "英語版は240項目。5つの領域(ドメイン)のそれぞれに6つの下位尺度(facet)があり、計30下位尺度",
    "exam": "56-am-79(誤答:「イラスト風に描かれた人物のセリフを書き込む」心理検査の正答はP-Fスタディ)／58-am-99(誤答:統合失調症の健康関連QOLの測定に使えるのはSF-36。NEO-PI-Rは性格検査でQOL尺度ではない)",
    "q": [
     "56-am-79",
     "58-am-99"
    ],
    "note": "確認済み[S1]=240項目、[S2]=1領域あたり6 facet(合計30は計算値)",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://kaken.nii.ac.jp/en/grant/KAKENHI-PROJECT-04610090"
     },
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC9614413/"
     }
    ]
   },
   {
    "item": "5つの領域(ビッグファイブ)",
    "target": "測る性格の側面",
    "value": "神経症傾向・外向性・開放性(開かれていること)・調和性・誠実性(日本語版の資料では「良心性」とも表記)",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。開放性・誠実性などは資料により訳語が異なる",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://kaken.nii.ac.jp/en/grant/KAKENHI-PROJECT-04610090"
     }
    ]
   },
   {
    "item": "日本語版の標準化",
    "target": "日本人への適用",
    "value": "英語版を2名が日本語に翻訳し、日本在住のアメリカ人が逆翻訳して作成。大学生200名での信頼性(クロンバックα)は、神経症傾向.926・外向性.882・開放性.859・調和性.831・誠実性.915。著者らは、基本的に日本人にも適用できるとした",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。これは科研費課題の報告で、現在の市販版の標準化とは別",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://kaken.nii.ac.jp/en/grant/KAKENHI-PROJECT-04610090"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
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
  "slug": "nonparametric-tests",
  "name": "Kruskal-Wallis・Mann-Whitney・Wilcoxon検定(ノンパラメトリック検定)",
  "category": "診断基準・分類",
  "aliases": [
   "Kruskal-Wallis検定",
   "Kruskal-Wallis",
   "クラスカル・ウォリス",
   "Mann-WhitneyのU検定",
   "Mann-Whitney",
   "Mann-Whitney U",
   "U検定",
   "Wilcoxon符号付順位検定",
   "Wilcoxonの符号順位検定",
   "Wilcoxon順位和検定",
   "Wilcoxonの順位和検定",
   "Friedman検定",
   "ノンパラメトリック検定"
  ],
  "rows": [
   {
    "item": "検定の選び方(正規性・対応・群の数)",
    "target": "2群・3群以上の差の検定",
    "value": "正規分布あり: 対応なし2群=Student/Welchのt検定、対応なし3群以上=一元配置分散分析、対応あり2群=対応のあるt検定、対応あり3群以上=反復測定分散分析。正規分布なし: 対応なし2群=Wilcoxon順位和検定(Mann-WhitneyのU検定)、対応なし3群以上=Kruskal-Wallis検定、対応あり2群=Wilcoxon符号順位検定、対応あり3群以上=Friedman検定",
    "exam": "56-pm-22(対応なし・非正規・3群=Kruskal-Wallis)／59-am-21(対応あり・非正規・2群=Wilcoxon符号付順位)／60-am-11(対応あり・正規・2群=Paired-t)／55-pm-21(対応なし・正規・2群=Student)／61-am-28(3群以上の平均値の差=一元配置分散分析)／50-pm-49(3群の平均値の差=分散分析)",
    "q": [
     "56-pm-22",
     "59-am-21",
     "60-am-11",
     "55-pm-21",
     "61-am-28",
     "50-pm-49"
    ],
    "note": "確認済み[S1][S2]。大学の講義資料(福島県立医大・大阪大学)で、表は一致。「対応がある」=同じ人の前後など、データの1行が同一対象にあたる場合[S1][S2]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.fmu.ac.jp/gendeqsp/data/file/manual_statistics_01.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.library.osaka-u.ac.jp/doc/LS_20181211_statistics.pdf"
     }
    ]
   },
   {
    "item": "Kruskal-Wallis検定",
    "target": "対応がなく正規分布でない3群以上",
    "value": "対応なし・正規分布でない・3群以上の差の検定。全体の差だけを調べ、群間の差は多重比較で調べる(総当たり: Steel-Dwass・Games-Howell・Scheffe、対照群あり: Steel)",
    "exam": "56-pm-22(対応がなく正規分布を示さない連続変数の3群間の差=正答)／59-am-21・60-am-11(誤答選択肢)／55-pm-21(誤答選択肢)",
    "q": [
     "56-pm-22",
     "59-am-21",
     "60-am-11",
     "55-pm-21"
    ],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.fmu.ac.jp/gendeqsp/data/file/manual_statistics_01.pdf"
     }
    ]
   },
   {
    "item": "Mann-WhitneyのU検定(Wilcoxonの順位和検定)",
    "target": "対応がなく正規分布でない2群",
    "value": "対応なし2群のノンパラメトリック検定。名義・順序尺度のデータ、データ数が10以下、または明らかに正規分布でないときに用いる(大阪大学の資料)",
    "exam": "59-am-21・60-am-11・56-pm-22・61-am-28(いずれも誤答選択肢。対応あり、正規分布、3群、平均値の差の設問のため)",
    "q": [
     "59-am-21",
     "60-am-11",
     "56-pm-22",
     "61-am-28"
    ],
    "note": "確認済み[S1][S2]。Wilcoxonの順位和検定とMann-WhitneyのU検定は同じ枠に並べられている[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.fmu.ac.jp/gendeqsp/data/file/manual_statistics_01.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.library.osaka-u.ac.jp/doc/LS_20181211_statistics.pdf"
     }
    ]
   },
   {
    "item": "Wilcoxonの符号付順位検定",
    "target": "対応があり正規分布でない2群",
    "value": "対応あり2群のノンパラメトリック検定。間隔・比率尺度のデータで、データ数が10以下、または明らかに正規分布でないときに用いる(大阪大学の資料)。正規分布のデータなら対応のあるt検定",
    "exam": "59-am-21(対応があり正規分布を示さない連続変数の2群間の差=正答)／60-am-11(誤答:データが正規分布のため不適切)",
    "q": [
     "59-am-21",
     "60-am-11"
    ],
    "note": "確認済み[S1][S2]。資料の表記は「符号順位(和)検定」で、国試は「符号付順位検定」「符号順位検定」と表記。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.fmu.ac.jp/gendeqsp/data/file/manual_statistics_01.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.library.osaka-u.ac.jp/doc/LS_20181211_statistics.pdf"
     }
    ]
   },
   {
    "item": "Friedman検定",
    "target": "対応あり・正規分布でない3群以上",
    "value": "対応のある3群以上でノンパラメトリックのとき用いる(反復測定分散分析のノンパラメトリック側の位置づけ)",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.fmu.ac.jp/gendeqsp/data/file/manual_statistics_01.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "nrs-numerical-rating-scale",
  "name": "NRS(数値評価スケール)",
  "category": "評価尺度",
  "aliases": [
   "NRS",
   "Numerical Rating Scale",
   "Numeric Rating Scale",
   "numerical rating scale",
   "数値評価スケール",
   "数値的評価スケール",
   "数値評価尺度"
  ],
  "rows": [
   {
    "item": "NRS とは(0〜10の11段階)",
    "target": "痛みの強さの自己評価",
    "value": "痛みを0〜10の11段階に分け、痛みが全くないのを0、考えられるなかで最悪の痛みを10として、点数を答えてもらう。評価するのは痛みの強さ",
    "exam": "54-pm-27(正答は「順序尺度である」。誤答=「10段階で評価する」[0〜10の11段階]・「疼痛の性質を評価する」[強さを評価])／58-pm-50(正答:NRS=疼痛)／57-pm-35(正答:face scaleとNRSが疼痛検査)",
    "q": [
     "54-pm-27",
     "58-pm-50",
     "57-pm-35"
    ],
    "note": "確認済み[S1]。「性質」ではなく強度を見る点が誤答の根拠",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://jspm.ne.jp/files/guideline/pain_2020/02_02.pdf"
     }
    ]
   },
   {
    "item": "尺度水準:順序尺度",
    "target": "データの扱い",
    "value": "NRSの得点は順序のある区分で、各区分の幅は等しくない。間隔尺度としての性質は疑わしく、順序尺度として扱う",
    "exam": "54-pm-27(正答:「順序尺度である」)",
    "q": [
     "54-pm-27"
    ],
    "note": "確認済み[S2]。術後疼痛の大規模登録データ(34万件超)の解析。尺度水準の一般論は「尺度水準」のカードも参照",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://pubmed.ncbi.nlm.nih.gov/37851363/"
     }
    ]
   },
   {
    "item": "疼痛強度の目安(軽度・中等度・高度)",
    "target": "がん疼痛ガイドラインでの区分",
    "value": "NRS 1〜3=軽度、4〜6=中等度、7〜10=高度(専門家の合意による便宜的な区分。統一された見解はない)",
    "exam": "61-am-20(TKA術後3日・体動時NRS 6点=問題文の数値。この区分では中等度に当たる)",
    "q": [
     "61-am-20"
    ],
    "note": "確認済み[S1]。区分はがん疼痛のガイドライン上の便宜的な定めで、国試問題は数値を示しただけ",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://jspm.ne.jp/files/guideline/pain_2020/02_02.pdf"
     }
    ]
   },
   {
    "item": "離床の開始基準(ICU・急性期)",
    "target": "積極的な離床・運動の開始",
    "value": "自己申告できる場合 NRS≦3 またはVAS≦3。申告できない場合は BPS≦5 またはCPOT≦2",
    "exam": "60-pm-10(誤答:「疼痛がNRS 8である」。正答は平均動脈圧80 mmHg)",
    "q": [
     "60-pm-10"
    ],
    "note": "確認済み[S3]",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://www.jsicm.org/pdf/soki_riha_1707.pdf"
     }
    ]
   },
   {
    "item": "他の疼痛尺度との違い(VAS・VRS・FPS)",
    "target": "尺度の使い分け",
    "value": "VAS=100 mmの線上に印をつける。VRS=痛みの強さを表す言葉を選ぶ。FPS(顔の表情)=現在の痛みに合う顔を選び、3歳以上の小児の自己評価で有用性が報告。これらのうち一般にはNRSが推奨される",
    "exam": "57-pm-35(正答:face scaleとNRS。GCS・mRS・MTSは疼痛の検査ではない)",
    "q": [
     "57-pm-35"
    ],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://jspm.ne.jp/files/guideline/pain_2020/02_02.pdf"
     }
    ]
   },
   {
    "item": "小児での使用",
    "target": "幼児にNRSを使えるか",
    "value": "NRSは数の概念の理解が必要。小児の慢性疼痛では8歳以上での使用が検討できる目安とされ、年少児は乖離が大きい。幼い小児にはフェイススケールが使われる",
    "exam": "54-pm-27(誤答:「幼児の疼痛評価に使用される」)",
    "q": [
     "54-pm-27"
    ],
    "note": "確認済み[S4](8歳以上の目安)、[S1](FPSは3歳以上)",
    "conflict": false,
    "sources": [
     {
      "label": "S4",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4158959"
     },
     {
      "label": "S1",
      "url": "https://jspm.ne.jp/files/guideline/pain_2020/02_02.pdf"
     }
    ]
   },
   {
    "item": "患者間の比較",
    "target": "同じ点数の意味",
    "value": "疼痛強度のカットオフには統一した見解がなく、同じNRSの点数でも追加の鎮痛を希望するかは患者で異なる。自己申告の主観的評価で、患者間の比較には向かない",
    "exam": "54-pm-27(誤答:「患者間の比較に有効である」)",
    "q": [
     "54-pm-27"
    ],
    "note": "確認済み[S5](NRS 5〜10と答えた患者の19%が追加のオピオイドを希望しなかった報告)、[S1]。「向かない」は資料の記述から導いた学習用の要約",
    "conflict": false,
    "sources": [
     {
      "label": "S5",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC9074792"
     },
     {
      "label": "S1",
      "url": "https://jspm.ne.jp/files/guideline/pain_2020/02_02.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
  "review": "ai"
 },
 {
  "slug": "nuclear-medicine-neuro",
  "name": "核医学検査(MIBG心筋シンチグラフィー・DATスキャン・脳血流SPECT)",
  "category": "臨床検査",
  "aliases": [
   "MIBG",
   "MIBG心筋シンチグラフィー",
   "MIBG心筋シンチ",
   "心縦隔比",
   "心/縦隔比",
   "H/M比",
   "SPECT",
   "脳血流SPECT",
   "局所脳血流",
   "DATスキャン",
   "ドパミントランスポーター",
   "核医学検査"
  ],
  "rows": [
   {
    "item": "MIBG心筋シンチグラフィー(心/縦隔比)",
    "target": "Parkinson病・Lewy小体型認知症と、PSP・MSAなどの鑑別",
    "value": "心臓の交感神経(節後線維)の分布を画像化する検査。Parkinson病(Lewy小体病)では心筋のMIBG集積が高率に低下し、心/縦隔比(H/M比)が低い。臨床的に鑑別が難しい進行性核上性麻痺(PSP)・多系統萎縮症(MSA)では集積はほとんど低下しない。",
    "exam": "56-am-89(進行性核上性麻痺について。誤答選択肢「MIBG心筋シンチグラフィーで心/縦隔比が低下する」。正答は「垂直方向の眼球運動障害を呈する」)",
    "q": [
     "56-am-89"
    ],
    "note": "確認済み[S1]。Lewy小体型認知症でも低下する[S2]。虚血性心疾患・心不全・糖尿病・末梢神経障害や一部の薬剤でも集積が下がりうるため、結果は慎重に解釈する[S2]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.nms.ac.jp/sh/jmanms/pdf/003040167.pdf"
     },
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5496518/"
     }
    ]
   },
   {
    "item": "脳血流SPECT: 後頭葉の血流低下",
    "target": "Lewy小体型認知症とAlzheimer型認知症の鑑別",
    "value": "Lewy小体型認知症(や認知機能障害を伴うParkinson病)では後頭葉皮質を中心とした血流低下がみられる。Alzheimer病では後部帯状回や楔前部の血流低下が目立つ。",
    "exam": "57-am-97(「後頭葉の血流量低下が特徴的なのはどれか」。正答=Lewy小体型認知症。誤答=HIV認知症・血管性認知症・前頭側頭型認知症・Alzheimer型認知症)",
    "q": [
     "57-am-97"
    ],
    "note": "確認済み[S1][S2]。2017年改訂のDLB診断基準では、SPECT/PETでの後頭葉の活動低下は「支持的」バイオマーカー(診断特異性は指標的より低い)[S2]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.nms.ac.jp/sh/jmanms/pdf/003040167.pdf"
     },
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5496518/"
     }
    ]
   },
   {
    "item": "Lewy小体型認知症(DLB)の診断バイオマーカー(2017年改訂基準)",
    "target": "DLBの診断",
    "value": "指標的: ①SPECT/PETで基底核のDAT(ドパミントランスポーター)取り込み低下 ②MIBG心筋シンチの取り込み低下 ③睡眠ポリグラフでREM睡眠時の筋活動低下(REM sleep without atonia)。支持的: CT/MRIで内側側頭葉が比較的保たれる／SPECT/PETで全般的な取り込み低下・後頭葉の活動低下／FDG-PETの帯状回島徴候など。",
    "exam": "出題は直接なし(参考。56-am-89・57-am-97 の背景)",
    "q": [],
    "note": "確認済み[S1]。中核的特徴1つ以上＋指標的バイオマーカー1つ以上でprobable DLB。バイオマーカーのみで認知症があり中核的特徴がなければpossible DLB。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5496518/"
     }
    ]
   },
   {
    "item": "DATスキャン(123I-FP-CIT SPECT)",
    "target": "DLBとAlzheimer病の鑑別",
    "value": "基底核(線条体)のドパミントランスポーター取り込み低下を示す。DLBとADの鑑別に有用(感度78%・特異度90%)で、Alzheimer病では取り込みは保たれる。PSP・MSA・大脳皮質基底核変性症・前頭側頭型認知症でも取り込みが低下しうるため、これらの除外が必要。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5496518/"
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
  "slug": "odds-ratio-ci",
  "name": "オッズ比と95%信頼区間の読み方",
  "category": "診断基準・分類",
  "aliases": [
   "オッズ比",
   "95%信頼区間",
   "95 %信頼区間",
   "信頼区間",
   "ハザード比",
   "ロジスティック回帰",
   "ロジスティック分析",
   "有意差なし"
  ],
  "rows": [
   {
    "item": "オッズ比の95%信頼区間と有意差の判定",
    "target": "オッズ比(・ハザード比)が有意かどうか",
    "value": "95%信頼区間に1が含まれなければ有意、含まれれば有意でない。オッズ比1は「両群で同じ」を意味し、区間に1が入ると同じ(差なし)の可能性を否定できないため。区間が全部1より小さい(例 0.65〜0.89)、または全部1より大きい(例 1.39〜5.67)なら有意。",
    "exam": "49-pm-49(2つのバランス練習の効果を比べるオッズ比の95%信頼区間。有意なのは1を含まない「0.65〜0.89」と「1.39〜5.67」。誤答:0.89〜1.39、0.65〜1.39、0.65〜5.67はいずれも1を含む)",
    "q": [
     "49-pm-49"
    ],
    "note": "確認済み[S1]。国試の正答と一致。差の指標が「差」(平均値の差など)のときは基準が0になる[S2]ので、1と0を混同しない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.med.hirosaki-u.ac.jp/~uro/research/Statistical_Analysis_v3.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.jstage.jst.go.jp/article/jsatj/7/1/7_23/_pdf"
     }
    ]
   },
   {
    "item": "オッズ比の大きさの意味",
    "target": "オッズ比の読み方",
    "value": "オッズ比(ハザード比も同様)が1=ある疾患・事象へのなりやすさが両群で同じ。1より大きい=一方の群でよりなりやすい。1より小さい=一方の群でなりにくい。",
    "exam": "49-pm-49(オッズ比の読み方を前提とした設問)",
    "q": [
     "49-pm-49"
    ],
    "note": "確認済み[S1](大学の講義資料)。計算式は、確認できた資料に載っていないためここには書かない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.med.hirosaki-u.ac.jp/~uro/research/Statistical_Analysis_v3.pdf"
     }
    ]
   },
   {
    "item": "信頼区間の意味と「有意差なし」の解釈",
    "target": "信頼区間の読み方の注意",
    "value": "95%信頼区間は、同じ調査を100回繰り返して区間を作ると、約95回は真の値(母集団の値)を含む区間、という意味。区間が狭いほど推定の精度が高い。区間が広くて有意でないときは、データ数が少ない、または交絡などの影響を疑う。「有意差なし」は「差がない」と確かめられたという意味ではない。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S2](日本アスレティックトレーニング学会誌の統計解説)。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.jstage.jst.go.jp/article/jsatj/7/1/7_23/_pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
  "review": "ai"
 },
 {
  "slug": "osteoporosis-diagnosis",
  "name": "原発性骨粗鬆症の診断基準(脆弱性骨折・YAM)",
  "category": "診断基準・分類",
  "aliases": [
   "骨粗鬆症",
   "原発性骨粗鬆症",
   "脆弱性骨折",
   "骨粗鬆症性骨折",
   "骨粗鬆症の診断基準",
   "YAM",
   "若年成人平均値",
   "骨量減少"
  ],
  "rows": [
   {
    "item": "診断基準Ⅰ 脆弱性骨折がある場合",
    "target": "骨密度を問わず診断できる骨折と、骨密度の確認が要る骨折の区別",
    "value": "前提:続発性骨粗鬆症や他の低骨量疾患を除く。①椎体骨折または大腿骨近位部骨折がある→骨密度に関係なく骨粗鬆症。②その他の脆弱性骨折があり、骨密度がYAMの80%未満→骨粗鬆症",
    "exam": "60-pm-33(診断基準に含まれる脆弱性骨折部位。記録上の正答=椎体。誤答選択肢=上腕骨遠位部・橈骨近位部・大腿骨遠位部・距骨)",
    "q": [
     "60-pm-33"
    ],
    "note": "確認済み[S1]。誤答の「上腕骨遠位部」「橈骨近位部」「大腿骨遠位部」は、基準の部位名(上腕骨近位部・橈骨遠位端・大腿骨近位部)の近位/遠位を入れ替えた形。部位名の近位・遠位に注意",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://fukuyama.hosp.go.jp/files/000063079.pdf"
     }
    ]
   },
   {
    "item": "「その他の脆弱性骨折」に含まれる部位",
    "target": "診断基準Ⅰ-②の対象部位",
    "value": "肋骨、骨盤(恥骨・坐骨・仙骨を含む)、上腕骨近位部、橈骨遠位端、下腿骨。これらは骨密度がYAMの80%未満であることが条件(椎体・大腿骨近位部は条件なし)",
    "exam": "60-pm-33(誤答選択肢の上腕骨遠位部・橈骨近位部はこの表記と異なる)／51-pm-31(最も起こりやすい骨粗鬆症性骨折の選択肢に橈骨。記録上の正答=橈骨。誤答=頸椎・鎖骨・尺骨・距骨)",
    "q": [
     "51-pm-31",
     "60-pm-33"
    ],
    "note": "確認済み[S1][S2]。骨粗鬆症による骨折の好発部位は、椎体・大腿骨近位部・橈骨遠位端・上腕骨近位部・肋骨など[S2]。51-pm-31は選択肢に椎体がなく、橈骨(遠位端)が骨粗鬆症性骨折の好発部位に当たる、という出題と読める(設問文の全文は未確認)",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://fukuyama.hosp.go.jp/files/000063079.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.seikei.kuhp.kyoto-u.ac.jp/wp-content/uploads/2018/05/Osteoporosis-Guideline2011.pdf"
     }
    ]
   },
   {
    "item": "診断基準Ⅱ 脆弱性骨折がない場合",
    "target": "骨密度による診断",
    "value": "骨密度がYAMの70%以下、または−2.5SD以下。YAM=若年成人平均値(腰椎は20〜44歳、大腿骨近位部は20〜29歳)",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://fukuyama.hosp.go.jp/files/000063079.pdf"
     }
    ]
   },
   {
    "item": "脆弱性骨折の定義",
    "target": "「脆弱性」の意味",
    "value": "軽微な外力で起きた非外傷性骨折。軽微な外力とは、立った姿勢からの転倒か、それ以下の外力",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1][S2]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://fukuyama.hosp.go.jp/files/000063079.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.seikei.kuhp.kyoto-u.ac.jp/wp-content/uploads/2018/05/Osteoporosis-Guideline2011.pdf"
     }
    ]
   },
   {
    "item": "椎体骨折の特徴",
    "target": "診断基準で椎体骨折が特別扱いされる理由",
    "value": "最も頻度の高い骨粗鬆症性骨折で、好発部位は胸腰椎移行部(次いでTh7を中心とした中位胸椎)。形態椎体骨折の3分の2は無症候性なので、脊椎エックス線で確認することが望ましい",
    "exam": "60-pm-33(正答=椎体の背景)",
    "q": [
     "60-pm-33"
    ],
    "note": "確認済み[S1][S2]。51-pm-31の「橈骨」を選ぶ問題とは、選択肢に椎体がない点で矛盾しない",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://fukuyama.hosp.go.jp/files/000063079.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.seikei.kuhp.kyoto-u.ac.jp/wp-content/uploads/2018/05/Osteoporosis-Guideline2011.pdf"
     }
    ]
   },
   {
    "item": "骨密度の測定部位と骨量減少",
    "target": "診断に使う骨密度の取り方",
    "value": "原則として腰椎(L1〜L4またはL2〜L4)または大腿骨近位部(頚部またはtotal hip)。複数部位を測ったときは、より低い%値またはSD値を採用。骨量減少は−2.5SDより大きく−1.0SD未満",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。困難なときは橈骨・第二中手骨(この場合は%のみ使用)",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://fukuyama.hosp.go.jp/files/000063079.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "osteosarcoma-primary-bone-tumor",
  "name": "骨肉腫と原発性悪性骨腫瘍(好発・診断・生検)",
  "category": "診断基準・分類",
  "aliases": [
   "骨肉腫",
   "骨軟部腫瘍",
   "悪性骨腫瘍",
   "原発性悪性骨腫瘍",
   "軟骨肉腫",
   "Ewing肉腫",
   "ユーイング肉腫",
   "骨巨細胞腫",
   "骨腫瘍"
  ],
  "rows": [
   {
    "item": "骨軟部腫瘍が疑われるときの診断確定=生検",
    "target": "悪性骨腫瘍の確定診断",
    "value": "診断には問診・血液検査・X線・CT・MRI・骨シンチ・PETなどを用いるが、最終的には生検(腫瘍組織を採取し、病理医が良悪性と病名を確認)で診断する。骨肉腫は、顕微鏡で腫瘍性の類骨・骨を確認して診断する。",
    "exam": "61-am-93(「診断確定に最も重要なのはどれか」。正答=生検。誤答=PET-CT・血液検査・骨密度測定・超音波検査)",
    "q": [
     "61-am-93"
    ],
    "note": "確認済み[S1][S2]。資料は骨の肉腫(骨肉腫)についての記述。軟部腫瘍そのものは、ここでは確認していない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pod.ncc.go.jp/jp/rcc/about/bone_sarcomas/no1honenosarcoma.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.ncc.go.jp/jp/rcc/about/0152/index.html"
     }
    ]
   },
   {
    "item": "骨肉腫の好発年齢・部位・症状",
    "target": "骨肉腫の臨床像",
    "value": "10〜20歳代に多い(約60%)が、40歳以上も約30%。男女比は約1.5:1。好発部位は長管骨の骨幹端で、大腿骨遠位>脛骨近位>上腕骨近位の順。数週〜数か月続く局所の痛みと腫脹で発症し、はじめは運動時痛、次第に安静時にも痛む。膝や肩の周囲の痛み・腫脹で受診する例が多い。",
    "exam": "61-am-10(12歳男児・約2か月来の膝関節痛・下腿近位部の腫脹と圧痛と安静時痛・炎症反応は正常・ALP上昇・X線とMRI所見→正答=骨肉腫。誤答=骨挫傷・骨髄炎・軟骨肉腫・疲労骨折)",
    "q": [
     "61-am-10"
    ],
    "note": "確認済み[S1]。画像所見(X線・MRIの読影)は、ここでは確認していない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.ncc.go.jp/jp/rcc/about/0152/index.html"
     }
    ]
   },
   {
    "item": "骨肉腫でのALP上昇",
    "target": "骨肉腫の血液所見",
    "value": "血液検査ではしばしばアルカリフォスファターゼ(ALP)の上昇を認める。ALPは、術前化学療法への反応や、治療終了後の再発・転移の指標としても用いる。診断は生検による病理診断で行う。",
    "exam": "61-am-10(問題文に「炎症反応は正常で、ALPの上昇」)",
    "q": [
     "61-am-10"
    ],
    "note": "確認済み[S1]。骨髄炎で炎症反応が上がる点は、この資料では扱っていない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.ncc.go.jp/jp/rcc/about/0152/index.html"
     }
    ]
   },
   {
    "item": "ほかの骨腫瘍との年齢・部位の違い",
    "target": "鑑別",
    "value": "軟骨肉腫=主に40歳代以上、大腿骨・骨盤・上腕骨に多い／Ewing肉腫=主に20歳以下、大腿骨・骨盤骨・脊椎に多く、骨以外の軟部組織にも発生／骨巨細胞腫=20代前後の膝周囲に多く、WHO分類で中間悪性型、骨折するまで症状がないこともある。",
    "exam": "61-am-10(誤答選択肢の軟骨肉腫は中高年に多い)",
    "q": [
     "61-am-10"
    ],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pod.ncc.go.jp/jp/rcc/about/bone_sarcomas/no1honenosarcoma.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "pain-drawing",
  "name": "痛み図(ペインドローイング)",
  "category": "評価尺度",
  "aliases": [
   "痛み図",
   "ペインドローイング",
   "Pain drawing",
   "ペインダイアグラム",
   "ボディダイアグラム",
   "疼痛図",
   "幻肢痛",
   "イラストで図示"
  ],
  "rows": [
   {
    "item": "幻肢痛と痛み図(痛みの部位を図示させる)",
    "target": "切断後の幻肢痛・残存肢痛の部位の把握",
    "value": "幻肢痛は、切断された四肢があった位置に感じる痛み。残存肢の痛み(神経腫など)は、断端に限局するのが典型。痛む場所をイラスト(人体図)に図示させる方法が、国試では正しい対応とされた。",
    "exam": "59-pm-38(四肢切断後の幻肢痛への対応で正しいものを2つ選ぶ。正答=ミラーセラピーが有用である／患者に幻肢痛が残存している部位をイラストで図示させる。誤答=経皮的電気刺激法は禁忌・義肢装着練習は幻肢痛を増悪させる・鎮痛薬はプレガバリンよりNSAIDsを優先)",
    "q": [
     "59-pm-38"
    ],
    "note": "確認済み[S1](幻肢痛・残存肢痛の部位の違い)。「幻肢痛の評価に痛み図を使う」ことの直接の記載は今回の資料では確認できていない(国試の正答に依る)。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/24-%E3%81%9D%E3%81%AE%E4%BB%96%E3%81%AE%E3%83%88%E3%83%94%E3%83%83%E3%82%AF/%E7%BE%A9%E8%82%A2/%E6%AE%8B%E5%AD%98%E8%82%A2%E3%81%AE%E7%96%BC%E7%97%9B"
     }
    ]
   },
   {
    "item": "痛み図の方法・わかること",
    "target": "痛みの分布(広がり)と性質を視覚的に把握する",
    "value": "人体図(ボディダイアグラム)に、痛みや感覚症状(うずく・灼ける・ピリピリ・しびれ・触れると過敏など)が出ている範囲と性質を、色分けのマーカーで患者自身に記入させる。分布の広がりと性質を記録する方法。",
    "exam": "59-pm-38(選択肢「幻肢痛が残存している部位をイラストで図示させる」が正答)",
    "q": [
     "59-pm-38"
    ],
    "note": "確認済み[S2](色つき痛み図の研究の方法の記述)。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://pubmed.ncbi.nlm.nih.gov/33200188/"
     }
    ]
   },
   {
    "item": "神経障害性疼痛の識別への利用",
    "target": "神経障害性疼痛か、それ以外の痛みかの見分け",
    "value": "慢性痛の213人(神経障害性疼痛と臨床診断されたのは151人=70.9%)で、色つき痛み図を医師2名が盲検で分類した。第一印象での正解は64.3%・73.2%。分布と性質の基準を決めて判定すると、2名とも正しく分類できたのは80.2%、感度80.1%・特異度80.6%。簡単なベッドサイドのスクリーニングとして使える、と著者は述べている。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S2]。1つの症例対照研究の結果で、診断の基準にはならない。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://pubmed.ncbi.nlm.nih.gov/33200188/"
     }
    ]
   },
   {
    "item": "痛み図の限界(心理状態の判定には使えない)",
    "target": "痛み図で何が言えないか",
    "value": "痛み図の特異な描き方や広い範囲の記入から、心理的な不調を判定できる根拠はないとされる。19件の研究を統合した結果、心理状態の予測は感度の中央値56%・特異度79.5%で、診断の道具としては低く、ばらつきが大きいと判断された。心理面のスクリーニングとしての使用は勧められていない。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S3](腰痛が中心の研究の系統的レビュー)",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://pubmed.ncbi.nlm.nih.gov/16772800/"
     }
    ]
   },
   {
    "item": "痛みの強さの評価(数値尺度・VAS)との使い分け",
    "target": "痛みの強さと部位・性質を、別々の方法で評価する",
    "value": "強さは自己報告が基本。数値尺度は0〜10点(0=痛みなし、10=これまでで最も強い痛み)、VASは10 cmの線の左端(痛みなし)から印までの距離(mm)で得点化する。部位は限局性・びまん性・深在性・表在性などで、性質は鋭い・鈍い・灼熱感などで記述する。痛み図は部位・広がり・性質を絵で記録する方法で、強さは別の尺度で測る。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S4]。[S4]には痛み図(ボディダイアグラム)の記載がなく、「強さは別の尺度で測る」という整理は[S2]の目的(分布と性質を示す)との組み合わせ。",
    "conflict": false,
    "sources": [
     {
      "label": "S4",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-%E7%A5%9E%E7%B5%8C%E7%96%BE%E6%82%A3/%E7%96%BC%E7%97%9B/%E7%96%BC%E7%97%9B%E3%81%AE%E8%A9%95%E4%BE%A1"
     },
     {
      "label": "S2",
      "url": "https://pubmed.ncbi.nlm.nih.gov/33200188/"
     }
    ]
   },
   {
    "item": "幻肢痛の特徴と治療(同じ問題の誤答選択肢の確認)",
    "target": "幻肢痛への対応(TENS・義肢・薬物)",
    "value": "幻肢痛の表現はピリピリ・電撃様・刺す・ズキズキ・灼ける・締め付けなど。義肢を装着していない時、特に夜間に起こりやすい。薬を使わない治療として経皮的電気神経刺激(TENS)、鍼、脊髄刺激療法が挙がる。鎮痛薬としてNSAIDやアセトアミノフェンが使われることがあり、神経障害性疼痛では抗うつ薬・抗てんかん薬を含む集学的治療を行う。",
    "exam": "59-pm-38(誤答選択肢=経皮的電気刺激法は禁忌・義肢装着練習は幻肢痛を増悪させる・鎮痛薬はプレガバリンよりNSAIDsを優先)",
    "q": [
     "59-pm-38"
    ],
    "note": "確認済み[S1]。[S1]にミラーセラピーの記載はなく、ミラーセラピーが有用という点(国試の正答)は未確認。プレガバリンとNSAIDの優先順位も[S1]では確認できていない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/24-%E3%81%9D%E3%81%AE%E4%BB%96%E3%81%AE%E3%83%88%E3%83%94%E3%83%83%E3%82%AF/%E7%BE%A9%E8%82%A2/%E6%AE%8B%E5%AD%98%E8%82%A2%E3%81%AE%E7%96%BC%E7%97%9B"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
  "review": "ai"
 },
 {
  "slug": "palpation-surface-anatomy",
  "name": "触診の基礎(体表から触れる骨指標・筋・腱・神経)",
  "category": "検査法・徴候",
  "aliases": [
   "体表から触れ",
   "体表から触知",
   "触知部位",
   "触知できる",
   "皮膚組織直下に触知",
   "筋膜を触知",
   "体表解剖",
   "体表から触れる",
   "胸骨角",
   "頸切痕",
   "舟状骨粗面",
   "縫工筋",
   "長腓骨筋",
   "ヒラメ筋",
   "尺側手根屈筋腱",
   "尺骨神経の触知",
   "ランドマーク"
  ],
  "rows": [
   {
    "item": "胸骨角(ルイ角)",
    "target": "体表から触れる骨指標。第2肋骨の目印",
    "value": "胸骨柄と胸骨体の接合部。多くの場合、突出していて体表から触れる。ここに第2肋軟骨が結合するので、胸骨角を見つければ第2肋骨の位置が分かる。胸骨角が分かりにくいときは、鎖骨の直下に大きく触れる肋骨を第2肋骨としてもよい。",
    "exam": "52-am-52(正答:胸骨角・舟状骨粗面。誤答:歯突起・結節間溝・顆間隆起)",
    "q": [
     "52-am-52"
    ],
    "note": "確認済み[S1]。舟状骨粗面が体表から触れることは、確認できた資料がないため載せていない。誤答の歯突起・結節間溝・顆間隆起が触れにくい理由も未確認。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jstage.jst.go.jp/article/jsrcr/32/3/32_293/_pdf/-char/en"
     }
    ]
   },
   {
    "item": "胸骨の頸切痕",
    "target": "体表から触れる骨指標",
    "value": "左右の鎖骨の間、胸骨柄の上にある、頸の前面下部のくぼみ。T2〜T3椎骨の高さ。指を当てて触れる。",
    "exam": "51-pm-59(正答:皮膚組織直下に触知できるのは胸骨の頸切痕。誤答:軸椎の歯突起・上腕骨の結節間溝・尺骨の滑車切痕・寛骨の寛骨臼切痕)",
    "q": [
     "51-pm-59"
    ],
    "note": "確認済み[S2](百科事典。解剖書での確認は未)。国試の正答と矛盾しない。誤答の4つが触れにくいことは、確認できた資料がない。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://en.wikipedia.org/wiki/Jugular_notch"
     }
    ]
   },
   {
    "item": "尺骨神経(肘での触知部位)",
    "target": "末梢神経の体表での位置",
    "value": "肘では、上腕骨内側上顆の後ろ(肘頭と内側上顆の間、肘部管)を通り、ここで触れる。骨と皮膚の間にあり筋や骨で守られていないため、ぶつけたときにしびれが出やすい。",
    "exam": "61-pm-60(正答:尺骨神経=肘頭と上腕骨内側上顆の間。誤答:脛骨神経=外果とアキレス腱の間／正中神経=上腕近位部で烏口腕筋の外側／腕神経叢=胸鎖乳突筋の胸骨頭と鎖骨頭の間／総腓骨神経=膝窩部で半腱様筋腱の内側)",
    "q": [
     "61-pm-60"
    ],
    "note": "確認済み[S3](百科事典)と[S4](MSDマニュアル:肘の内側で叩くとTinel徴候)。国試の正答と一致。誤答側の位置は確認できた資料がなく、記述していない。",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://en.wikipedia.org/wiki/Ulnar_nerve"
     },
     {
      "label": "S4",
      "url": "https://www.msdmanuals.com/ja-jp/professional/06-筋骨格系疾患と結合組織疾患/手疾患/肘部管症候群"
     }
    ]
   },
   {
    "item": "縫工筋",
    "target": "上前腸骨棘のすぐ遠位に触れる筋",
    "value": "上前腸骨棘から起こり、大腿の前面を斜めに内下方へ走り、脛骨の前内側(鵞足)に付く。股関節の屈曲・弱い外転・外旋と、膝関節の屈曲に働く。",
    "exam": "61-am-58(左下肢の運動時の図。左上前腸骨棘のすぐ遠位に筋緊張を触知する筋=縫工筋(正答)。誤答:大腿直筋・薄筋・半腱様筋・半膜様筋)",
    "q": [
     "61-am-58"
    ],
    "note": "確認済み[S5](百科事典)。起始が上前腸骨棘という点は国試の記述と一致。触診の肢位・手技は、確認できた資料がないため載せていない。",
    "conflict": false,
    "sources": [
     {
      "label": "S5",
      "url": "https://en.wikipedia.org/wiki/Sartorius_muscle"
     }
    ]
   },
   {
    "item": "長腓骨筋(浅層の筋)",
    "target": "皮下組織の直下に筋膜を触れる筋",
    "value": "下腿外側区画にあり、3つの腓骨筋(長腓骨筋・短腓骨筋・第三腓骨筋)の中で最も浅い。腓骨頭と腓骨外側面の上部から起こり、外果の後ろを回って第1中足骨底と内側楔状骨に付く。浅腓骨神経の支配。",
    "exam": "52-pm-52(正答:長腓骨筋。誤答:棘上筋・方形回内筋・小殿筋・中間広筋)",
    "q": [
     "52-pm-52"
    ],
    "note": "確認済み[S6](百科事典)。「皮下直下に筋膜を触れる」という言い回しそのものは資料にない。国試の正答(浅い筋)とは矛盾しない。",
    "conflict": false,
    "sources": [
     {
      "label": "S6",
      "url": "https://en.wikipedia.org/wiki/Fibularis_longus"
     }
    ]
   },
   {
    "item": "深層にある筋(中間広筋・小殿筋・方形回内筋)",
    "target": "触知しにくい筋との区別",
    "value": "中間広筋:大腿直筋の深層にある(大腿四頭筋の最も深い中央の筋)。小殿筋:中殿筋のすぐ深層にある。方形回内筋:前腕前面の深層(深指屈筋・長母指屈筋と同じ深層)で、前腕遠位にある。",
    "exam": "52-pm-52(いずれも誤答の選択肢。棘上筋の位置は資料で未確認)",
    "q": [
     "52-pm-52"
    ],
    "note": "確認済み[S7][S8][S9](百科事典)。棘上筋については、確認できた資料がない。",
    "conflict": false,
    "sources": [
     {
      "label": "S7",
      "url": "https://en.wikipedia.org/wiki/Vastus_intermedius"
     },
     {
      "label": "S8",
      "url": "https://en.wikipedia.org/wiki/Gluteus_minimus"
     },
     {
      "label": "S9",
      "url": "https://en.wikipedia.org/wiki/Pronator_quadratus_muscle"
     }
    ]
   },
   {
    "item": "ヒラメ筋と腓腹筋の位置関係",
    "target": "下腿後面の筋",
    "value": "ヒラメ筋は腓腹筋の深層にあり、膝の少し下から踵まで走る。腓骨頭の後面と腓骨の上1/4、脛骨内側縁の中1/3から起こり、アキレス腱として踵骨後面に付く。",
    "exam": "56-am-60(右下腿後面の図でヒラメ筋の触知部位を選ぶ。正答は④(図問題))",
    "q": [
     "56-am-60"
    ],
    "note": "確認済み[S10](百科事典)。図の選択肢の位置(どこで触れるか)は、確認できた資料がないため載せていない。",
    "conflict": false,
    "sources": [
     {
      "label": "S10",
      "url": "https://en.wikipedia.org/wiki/Soleus_muscle"
     }
    ]
   },
   {
    "item": "尺側手根屈筋腱",
    "target": "手首の前面で見える腱",
    "value": "前腕遠位の前面で見える。手首の直前にある3本の腱のうち最も尺側(小指側)。豆状骨に付く。",
    "exam": "49-am-59(体表から触れる腱の図。⑤=尺側手根屈筋腱が正答。誤答:長母指屈筋腱・浅指屈筋腱・深指屈筋腱は手根管内で浮き出ない、腕橈骨筋腱は橈側)",
    "q": [
     "49-am-59"
    ],
    "note": "確認済み[S11](百科事典。「見える」の記載。「触れる」とは書かれていない)。誤答の腱が浮き出ない理由は資料で未確認。",
    "conflict": false,
    "sources": [
     {
      "label": "S11",
      "url": "https://en.wikipedia.org/wiki/Flexor_carpi_ulnaris_muscle"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
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
  "slug": "parametric-tests",
  "name": "t検定・一元配置分散分析(正規分布を仮定する検定)",
  "category": "診断基準・分類",
  "aliases": [
   "t検定",
   "Paired-t検定",
   "対応のあるt検定",
   "Studentのt検定",
   "Welchのt検定",
   "Welch検定",
   "一元配置分散分析",
   "分散分析",
   "ANOVA",
   "パラメトリック検定",
   "検定の選択",
   "多重比較"
  ],
  "rows": [
   {
    "item": "検定の選び方(正規性・対応・群の数)",
    "target": "2群・3群以上の差の検定",
    "value": "正規分布あり: 対応なし2群=Student/Welchのt検定、対応なし3群以上=一元配置分散分析、対応あり2群=対応のあるt検定、対応あり3群以上=反復測定分散分析。正規分布なし: 対応なし2群=Wilcoxon順位和検定(Mann-WhitneyのU検定)、対応なし3群以上=Kruskal-Wallis検定、対応あり2群=Wilcoxon符号順位検定、対応あり3群以上=Friedman検定",
    "exam": "56-pm-22(対応なし・非正規・3群=Kruskal-Wallis)／59-am-21(対応あり・非正規・2群=Wilcoxon符号付順位)／60-am-11(対応あり・正規・2群=Paired-t)／55-pm-21(対応なし・正規・2群=Student)／61-am-28(3群以上の平均値の差=一元配置分散分析)／50-pm-49(3群の平均値の差=分散分析)",
    "q": [
     "56-pm-22",
     "59-am-21",
     "60-am-11",
     "55-pm-21",
     "61-am-28",
     "50-pm-49"
    ],
    "note": "確認済み[S1][S2]。大学の講義資料(福島県立医大・大阪大学)で、表は一致。「対応がある」=同じ人の前後など、データの1行が同一対象にあたる場合[S1][S2]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.fmu.ac.jp/gendeqsp/data/file/manual_statistics_01.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.library.osaka-u.ac.jp/doc/LS_20181211_statistics.pdf"
     }
    ]
   },
   {
    "item": "対応のあるt検定(Paired-t検定)",
    "target": "同じ対象の前後比較など、対応がある2群・正規分布",
    "value": "条件(大阪大学の資料): 対応あり／間隔尺度または比率尺度／データ数11以上／正規分布または仮定できる",
    "exam": "60-am-11(Parkinson病30名の導入前後の歩行速度、正規分布=Paired-t検定が正答)／59-am-21・56-pm-22(誤答選択肢)",
    "q": [
     "60-am-11",
     "59-am-21",
     "56-pm-22"
    ],
    "note": "確認済み[S2]。データ数の目安(11以上)はこの資料の基準。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.library.osaka-u.ac.jp/doc/LS_20181211_statistics.pdf"
     }
    ]
   },
   {
    "item": "Studentのt検定・Welchのt検定",
    "target": "対応がない正規分布の2群",
    "value": "条件: 対応なし／間隔尺度または比率尺度／正規分布／等分散を仮定できればStudent、仮定できなければWelch(等分散はF検定で調べる)",
    "exam": "55-pm-21(対応なし・正規分布の連続変数2群=Studentのt検定が正答)／50-pm-49(Welch検定は誤答選択肢)",
    "q": [
     "55-pm-21",
     "50-pm-49"
    ],
    "note": "確認済み[S1][S2]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.fmu.ac.jp/gendeqsp/data/file/manual_statistics_01.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.library.osaka-u.ac.jp/doc/LS_20181211_statistics.pdf"
     }
    ]
   },
   {
    "item": "一元配置分散分析(ANOVA)",
    "target": "3群以上の平均値の差(正規分布・対応なし)",
    "value": "3群以上の全体のばらつきの差を検定する。どの群とどの群に差があるかは分からないため、有意なら多重比較に進む(総当たり: Bonferroni・Tukey-Kramer・Holm など、対照群あり: Dunnett)",
    "exam": "61-am-28(3群以上の連続変数の平均値の差=正答)／50-pm-49(3群の平均値の差=分散分析が正答)／56-pm-22・59-am-21・60-am-11(誤答選択肢)",
    "q": [
     "61-am-28",
     "50-pm-49",
     "56-pm-22",
     "59-am-21",
     "60-am-11"
    ],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.fmu.ac.jp/gendeqsp/data/file/manual_statistics_01.pdf"
     }
    ]
   },
   {
    "item": "3群以上にt検定を繰り返してはいけない",
    "target": "多重性(第1種の過誤の増加)",
    "value": "t検定を繰り返すと全体の有意水準が上がる(5%水準で2回行うと1−0.95²≒0.0975で約10%)。3群以上は分散分析で全体を調べ、そのあと多重比較で群間を調べる",
    "exam": "50-pm-49(選択肢「t検定」は3群の比較には使えず誤答)",
    "q": [
     "50-pm-49"
    ],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.fmu.ac.jp/gendeqsp/data/file/manual_statistics_01.pdf"
     }
    ]
   },
   {
    "item": "反復測定分散分析",
    "target": "対応あり・正規分布の3群以上",
    "value": "対応のある3群以上(例:同じ人の介入前・中・後)の正規分布のデータに用いる",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.fmu.ac.jp/gendeqsp/data/file/manual_statistics_01.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
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
  "slug": "pathologic-reflexes",
  "name": "病的反射(Babinski・Chaddock・Oppenheim・Gordon・Gonda・Schaeffer・Hoffmann)",
  "category": "検査法・徴候",
  "aliases": [
   "病的反射",
   "Babinski",
   "バビンスキー",
   "Chaddock",
   "チャドック",
   "Oppenheim",
   "オッペンハイム",
   "Gordon反射",
   "Gonda",
   "Gonda反射",
   "Schaeffer",
   "Schaeffer反射",
   "Hoffmann",
   "Hoffmann反射",
   "ホフマン反射",
   "足底反射",
   "錐体路徴候",
   "脛骨内縁"
  ],
  "rows": [
   {
    "item": "Oppenheim反射",
    "target": "錐体路障害(上位運動ニューロン障害)で出る足底の病的反射",
    "value": "脛骨前面を膝蓋骨の直下から足部へ向けて、指の関節で強くこする。陽性=母趾の伸展(背屈)と他の足趾の開扇",
    "exam": "54-pm-24(「脛骨内縁を上方から下方へこすりおろす」=Oppenheim反射の正しい組合せ・正答)／59-am-6(図で脛骨内縁をこすりおろす検査=Oppenheim・正答。選択肢Babinski・Chaddock・Gonda・Gordon)／61-am-12(病的反射の手技を図で選ぶ問題。図は未確認)",
    "q": [
     "54-pm-24",
     "59-am-6",
     "61-am-12"
    ],
    "note": "確認済み[S1]。国試は「脛骨内縁」、資料は「脛骨前面」と書くが、脛骨の前縁〜内側面を上から下へこする手技として同じ。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/%E3%83%97%E3%83%AD%E3%83%95%E3%82%A7%E3%83%83%E3%82%B7%E3%83%A7%E3%83%8A%E3%83%AB/07-%E7%A5%9E%E7%B5%8C%E7%96%BE%E6%82%A3/%E7%A5%9E%E7%B5%8C%E5%AD%A6%E7%9A%84%E8%A8%BA%E5%AF%9F/%E5%8F%8D%E5%B0%84%E3%81%AE%E8%A9%95%E4%BE%A1"
     }
    ]
   },
   {
    "item": "Babinski反射",
    "target": "足底の病的反射の基本",
    "value": "舌圧子や打腱器の柄で、足底の外縁を踵から母趾の付け根に向けて、強いが傷つけない程度にこする。陽性=母趾の伸展と他の足趾の開扇(しばしば膝・股関節の屈曲を伴う)",
    "exam": "出題は直接なし(59-am-6・61-am-12の選択肢として並ぶ)",
    "q": [
     "59-am-6",
     "61-am-12"
    ],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/%E3%83%97%E3%83%AD%E3%83%95%E3%82%A7%E3%83%83%E3%82%B7%E3%83%A7%E3%83%8A%E3%83%AB/07-%E7%A5%9E%E7%B5%8C%E7%96%BE%E6%82%A3/%E7%A5%9E%E7%B5%8C%E5%AD%A6%E7%9A%84%E8%A8%BA%E5%AF%9F/%E5%8F%8D%E5%B0%84%E3%81%AE%E8%A9%95%E4%BE%A1"
     }
    ]
   },
   {
    "item": "Chaddock反射",
    "target": "足底刺激を嫌がる場合などの代わりの誘発法",
    "value": "足の外側を外果から小趾に向けて、先の尖っていない器具でこする。陽性=母趾の伸展と足趾の開扇",
    "exam": "54-pm-24(誤答選択肢「足の内果の下方を後ろから前へこする」は部位が外果でなく内果になっており誤り)／59-am-6・61-am-12(選択肢)",
    "q": [
     "54-pm-24",
     "59-am-6",
     "61-am-12"
    ],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/%E3%83%97%E3%83%AD%E3%83%95%E3%82%A7%E3%83%83%E3%82%B7%E3%83%A7%E3%83%8A%E3%83%AB/07-%E7%A5%9E%E7%B5%8C%E7%96%BE%E6%82%A3/%E7%A5%9E%E7%B5%8C%E5%AD%A6%E7%9A%84%E8%A8%BA%E5%AF%9F/%E5%8F%8D%E5%B0%84%E3%81%AE%E8%A9%95%E4%BE%A1"
     }
    ]
   },
   {
    "item": "Hoffmann反射",
    "target": "上肢の病的反射(錐体路徴候)",
    "value": "検者が患者の第3指(または第4指)の爪を、上から下へ軽くはじく。陽性=母指と示指の遠位指節間関節が不随意に屈曲する",
    "exam": "61-am-12(図の選択肢に名称が並ぶ。図は未確認)",
    "q": [
     "61-am-12"
    ],
    "note": "確認済み[S1]。Trömner反射・Wartenberg徴候は資料に記載がなく未確認。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/%E3%83%97%E3%83%AD%E3%83%95%E3%82%A7%E3%83%83%E3%82%B7%E3%83%A7%E3%83%8A%E3%83%AB/07-%E7%A5%9E%E7%B5%8C%E7%96%BE%E6%82%A3/%E7%A5%9E%E7%B5%8C%E5%AD%A6%E7%9A%84%E8%A8%BA%E5%AF%9F/%E5%8F%8D%E5%B0%84%E3%81%AE%E8%A9%95%E4%BE%A1"
     }
    ]
   },
   {
    "item": "Gordon反射",
    "target": "足底反射の変法(母趾の伸展を見る)",
    "value": "ふくらはぎの筋(腓腹筋)を握るように圧迫する。陽性=母趾の伸展と足趾の開扇",
    "exam": "54-pm-24(誤答選択肢「アキレス腱を強くつまむ」は部位が違う。腓腹筋をつかむのがGordon)／59-am-6(選択肢)",
    "q": [
     "54-pm-24",
     "59-am-6"
    ],
    "note": "確認済み[S2]。二次資料(Wikipedia)のみで確認。日本の教科書・神経学の資料での再確認が望ましい。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://en.wikipedia.org/wiki/Babinski_sign"
     }
    ]
   },
   {
    "item": "Gonda反射",
    "target": "足底反射の変法",
    "value": "第4趾を屈曲させて、急に離す(国試の選択肢では「第4指をつまみ下方へ引っ張る」)。陽性=母趾の伸展",
    "exam": "54-pm-24(選択肢「第4指をつまみ下方へ引っ張る」)／59-am-6(選択肢)",
    "q": [
     "54-pm-24",
     "59-am-6"
    ],
    "note": "確認済み[S2]。二次資料(Wikipedia)のみで確認。日本の教科書・神経学の資料での再確認が望ましい。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://en.wikipedia.org/wiki/Babinski_sign"
     }
    ]
   },
   {
    "item": "Schaeffer反射",
    "target": "足底反射の変法",
    "value": "アキレス腱を強くつまむ(圧迫する)。陽性=母趾の伸展",
    "exam": "54-pm-24(選択肢「足底面の外縁を踵から上へこすりあげる」はSchaefferの手技と違い誤り。アキレス腱をつまむ手技はSchaeffer)",
    "q": [
     "54-pm-24"
    ],
    "note": "確認済み[S2]。二次資料(Wikipedia)のみで確認。日本の教科書・神経学の資料での再確認が望ましい。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://en.wikipedia.org/wiki/Babinski_sign"
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
  "slug": "pedi",
  "name": "PEDI(Pediatric Evaluation of Disability Inventory)",
  "category": "評価尺度",
  "aliases": [
   "PEDI",
   "Pediatric Evaluation of Disability Inventory"
  ],
  "rows": [
   {
    "item": "PEDI の3つの部分",
    "target": "構成",
    "value": "Part I 機能的スキル=197項目(セルフケア73・移動59・社会的機能65)、各項目0(できない)/1(できる)の2段階。Part II 介助者による援助=20項目(セルフケア8・移動7・社会的機能5)、0〜5。Part III 調整=同じ20項目で、必要な環境・用具の調整をN(なし)/C(子ども向け)/R(リハビリ用具)/E(大がかりな調整)で評価",
    "exam": "57-pm-29(正答:補装具の使用頻度を評価できる=調整の尺度。誤答=「機能的スキルは0〜3の4段階」[実際は0/1の2段階])／49-pm-47(正答:補助具の使用状況・介護者による援助の状態を評価できる)",
    "q": [
     "57-pm-29",
     "49-pm-47"
    ],
    "note": "確認済み[S1](項目数と採点)、[S3](73・59・65項目)。国試は「使用頻度」「使用状況」と書くが、資料では調整=必要な用具・環境調整の区分で、「頻度」の語は確認できていない",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://sralab.org/rehabilitation-measures/pediatric-evaluation-disability-inventory"
     },
     {
      "label": "S3",
      "url": "https://kaken.nii.ac.jp/ja/file/KAKENHI-PROJECT-25350660/25350660seika.pdf"
     }
    ]
   },
   {
    "item": "評価するもの:能力と実行状況",
    "target": "何を測るか",
    "value": "機能的活動における、能力(機能的スキル=特定の生活動作ができる/できない)と、パフォーマンス(それに必要な介助の程度=介助者支援)の両方を評価する。健常児のデータにもとづく尺度化スコアで、年齢とは無関係に同じ尺度上で比較できる",
    "exam": "49-pm-47(正答:特定のことができる能力を評価する／介護者による援助の状態を評価できる／正常発達からの偏差を評価できる)／第50回(正答:機能的スキルを測定する)",
    "q": [
     "49-pm-47"
    ],
    "note": "確認済み[S3]。「正常発達からの偏差」の語は資料では直接確認できていない(健常児データとの比較は[S3])",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://kaken.nii.ac.jp/ja/file/KAKENHI-PROJECT-25350660/25350660seika.pdf"
     }
    ]
   },
   {
    "item": "対象年齢",
    "target": "いつから使えるか",
    "value": "原版は6か月〜7歳半の子どもが対象",
    "exam": "49-pm-47(誤答:「4か月児から評価の対象になる」)／57-pm-29(誤答:「出生直後から使用可能である」)",
    "q": [
     "49-pm-47",
     "57-pm-29"
    ],
    "note": "確認済み[S2]。[S1]は0〜8歳、[S4]は6か月〜7歳と書き、資料により幅が異なる",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3631526"
     },
     {
      "label": "S1",
      "url": "https://sralab.org/rehabilitation-measures/pediatric-evaluation-disability-inventory"
     },
     {
      "label": "S4",
      "url": "https://www.apta.org/patient-care/evidence-based-practice-resources/test-measures/pediatric-evaluation-of-disability-inventory-pedi"
     }
    ]
   },
   {
    "item": "対象となる子ども",
    "target": "疾患",
    "value": "脳性麻痺、二分脊椎、ダウン症候群、発達障害などの子どもに使われている。日本でも脳性麻痺児790名のPEDIデータが報告されている",
    "exam": "57-pm-29(誤答:「二分脊椎は対象にならない」)／第50回(誤答:「脳性麻痺は対象にならない」)",
    "q": [
     "57-pm-29"
    ],
    "note": "確認済み[S4](二分脊椎ほか)、[S3](脳性麻痺児790名)",
    "conflict": false,
    "sources": [
     {
      "label": "S4",
      "url": "https://www.apta.org/patient-care/evidence-based-practice-resources/test-measures/pediatric-evaluation-of-disability-inventory-pedi"
     },
     {
      "label": "S3",
      "url": "https://kaken.nii.ac.jp/ja/file/KAKENHI-PROJECT-25350660/25350660seika.pdf"
     }
    ]
   },
   {
    "item": "評価の方法",
    "target": "誰がどう評価するか",
    "value": "保護者への構造化面接、観察、専門職の判断のいずれか、またはその組み合わせで行う。実施時間は資料で31〜60分(慣れた者は20〜30分とされる)",
    "exam": "第50回(誤答:「評価に要する時間はWeeFIMより短い」)",
    "q": [],
    "note": "確認済み[S1]。WeeFIMとの時間比較は資料では確認していない",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://sralab.org/rehabilitation-measures/pediatric-evaluation-disability-inventory"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
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
  "slug": "pf-study",
  "name": "P-Fスタディ(絵画欲求不満テスト)",
  "category": "検査法・徴候",
  "aliases": [
   "P-Fスタディ",
   "PFスタディ",
   "P-F study",
   "PF study",
   "Picture Frustration Study",
   "絵画欲求不満テスト",
   "絵画欲求不満",
   "Rosenzweig",
   "ローゼンツァイク"
  ],
  "rows": [
   {
    "item": "P-Fスタディの内容",
    "target": "欲求不満場面での反応をみる人格検査",
    "value": "日常でだれもが経験する軽い欲求不満の場面24場面を、漫画風の絵で示す。左側の人物のせりふが刺激として書かれ、受検者は右側の人物がどう答えるかという言語反応を書き込む。人物の表情は省略されている。反応を決まった枠組みで採点できるため、制限のある『準投映法』ともいわれる。",
    "exam": "56-am-79(正答: イラスト風に描かれた人物のセリフを書き込む心理検査=P-Fスタディ)／59-am-78(選択肢のみ。インクのシミの図版を順に示す検査の正答はRorschachテスト)／54-am-81(選択肢のみ。検査の一部が示された問いの正答はSCT)／55-pm-81(誤答の組合せ: P-Fスタディ―認知症介護負担度)",
    "q": [
     "56-am-79",
     "59-am-78",
     "54-am-81",
     "55-pm-81"
    ],
    "note": "確認済み[S1]。投映法に分類する資料も準投映法とする資料もあり、国試では他の投映法・質問紙法との区別で問われている。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://tokyo-ondai.repo.nii.ac.jp/record/1442/files/111_fujita2.pdf"
     },
     {
      "label": "S2",
      "url": "https://u-ryukyu.repo.nii.ac.jp/record/2003932/files/No21p043.pdf"
     }
    ]
   },
   {
    "item": "アグレッションの方向(3つ)",
    "target": "反応が誰に向かうかの分類",
    "value": "他責(攻撃や責任を他人・環境に向ける)、自責(責任を自分に帰する)、無責(誰にも責任はない、不可避の事態と考える)の3方向。以前は外罰・内罰・無罰と呼ばれていた。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1][S2]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://tokyo-ondai.repo.nii.ac.jp/record/1442/files/111_fujita2.pdf"
     },
     {
      "label": "S2",
      "url": "https://u-ryukyu.repo.nii.ac.jp/record/2003932/files/No21p043.pdf"
     }
    ]
   },
   {
    "item": "アグレッションの型(3つ)と評点因子",
    "target": "反応がどう展開するかの分類",
    "value": "障害優位(O-D: 欲求不満を起こした障害を指摘したり軽視したりして、失望・不満を表す)、自我防衛(E-D: 自我を守るための反応。他者への非難や自己非難、責任の否認など)、欲求固執(N-P: 欲求不満を解決しようと問題解決を求め続ける反応)の3型。方向3×型3の9つの評点因子(E′・E・e、I′・I・i、M′・M・m)に、特殊な2つを加えた11因子で採点し、集団順応度(GCR)や反応転移も参考にする。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。型の説明は[S1]の表の要約。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://tokyo-ondai.repo.nii.ac.jp/record/1442/files/111_fujita2.pdf"
     }
    ]
   },
   {
    "item": "他の心理検査との区別",
    "target": "選択肢の検査の特徴",
    "value": "SCT(文章完成法)は未完成の文の続きを自由に書く投影法で、比較的意識に近い。バウムテストは『実のなる木を1本描く』描画の投影法。MPI(モーズレイ性格検査)はEysenckの質問紙で、外向性(E)と神経症的傾向(N)と虚偽性(L)をみる。NEO-PI-Rは240項目の質問紙で、神経症傾向・外向性・開放性・調和性・誠実性の5因子を各6側面で測る。",
    "exam": "56-am-79(誤答選択肢: SCT=文章完成法、バウムテスト=樹木画、MPI、NEO-PI-R。人物のセリフを書き込むのはP-Fスタディ)／49-pm-80(『1本の実のなる木を描く』検査の正答はバウムテスト)",
    "q": [
     "56-am-79",
     "49-pm-80"
    ],
    "note": "確認済み[S1](SCT・バウムテスト)[S2](MPI)[S3](NEO-PI-R)。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://tk.seitoku-u.ac.jp/cms_tk_seitoku/wp-content/uploads/2025/08/%E8%81%96%E5%BE%B3%E5%A4%A7%E5%AD%A6%E5%85%AC%E8%AA%8D%E5%BF%83%E7%90%86%E5%B8%AB%E5%85%A5%E5%AD%A6%E8%AA%AC%E6%98%8E%E4%BC%9A%E6%A8%A1%E6%93%AC%E8%AC%9B%E7%BE%A9%E3%83%91%E3%83%BC%E3%82%BD%E3%83%8A%E3%83%AA%E3%83%86%E3%82%A3%E6%A4%9C%E6%9F%BB.pdf"
     },
     {
      "label": "S2",
      "url": "https://tk.seitoku-u.ac.jp/cms_tk_seitoku/wp-content/uploads/2024/12/%E8%81%96%E5%BE%B3%E5%A4%A7%E5%AD%A6%E5%85%AC%E8%AA%8D%E5%BF%83%E7%90%86%E5%B8%AB%E5%85%A5%E5%AD%A6%E8%AA%AC%E6%98%8E%E4%BC%9A%E6%A8%A1%E6%93%AC%E8%AC%9B%E7%BE%A9%E3%83%91%E3%83%BC%E3%82%BD%E3%83%8A%E3%83%AA%E3%83%86%E3%82%A3%E6%A4%9C%E6%9F%BB.pdf"
     },
     {
      "label": "S3",
      "url": "https://iwate-u.repo.nii.ac.jp/record/14511/files/arfe-v77pp55-70.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
  "review": "ai"
 },
 {
  "slug": "physical-disability-internal",
  "name": "身体障害者障害程度等級表(内部障害の区分)",
  "category": "診断基準・分類",
  "aliases": [
   "内部障害",
   "身体障害者障害程度等級表",
   "障害程度等級表",
   "身体障害認定基準",
   "身体障害者福祉法",
   "代謝機能障害",
   "心臓機能障害",
   "呼吸器機能障害",
   "小腸機能障害",
   "膀胱機能障害",
   "じん臓機能障害",
   "肝臓機能障害",
   "免疫機能障害"
  ],
  "rows": [
   {
    "item": "内部障害の区分(7つ)",
    "target": "身体障害者福祉法の障害程度等級表で「内部障害」に当たるもの",
    "value": "心臓機能障害／じん臓機能障害／呼吸器機能障害／ぼうこう又は直腸機能障害／小腸機能障害／ヒト免疫不全ウイルス(HIV)による免疫機能障害／肝臓機能障害 の7つ",
    "exam": "49-am-94・51-pm-84(同じ設問。正答:代謝機能障害=内部障害に含まれない。誤答:心臓・小腸・膀胱・呼吸器の各機能障害=いずれも内部障害)",
    "q": [
     "49-am-94",
     "51-pm-84"
    ],
    "note": "確認済み[S1][S2]。認定基準の「内臓の機能障害」は1心臓〜7肝臓の7区分で、代謝機能障害という区分はない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.mhlw.go.jp/file/06-Seisakujouhou-12200000-Shakaiengokyokushougaihokenfukushibu/kijun_all.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.pref.osaka.lg.jp/documents/5332/toukyuuhyou.pdf"
     }
    ]
   },
   {
    "item": "膀胱機能障害の位置づけ",
    "target": "「ぼうこう」の障害の区分名",
    "value": "区分名は「ぼうこう又は直腸機能障害」。ぼうこう(膀胱)の機能障害も内部障害に含まれる",
    "exam": "49-am-94・51-pm-84(誤答選択肢:膀胱機能障害。内部障害に「当たる」ので「でないもの」ではない)",
    "q": [
     "49-am-94",
     "51-pm-84"
    ],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.mhlw.go.jp/file/06-Seisakujouhou-12200000-Shakaiengokyokushougaihokenfukushibu/kijun_all.pdf"
     }
    ]
   },
   {
    "item": "等級の範囲(心臓・じん臓・呼吸器)",
    "target": "等級表で認められる等級",
    "value": "心臓・じん臓・呼吸器の機能障害は1級・3級・4級(2級の区分はない)。HIVによる免疫機能障害と肝臓機能障害は1〜4級",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。基準の本文で、心臓・じん臓・呼吸器は1・3・4級の記載のみ。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.mhlw.go.jp/file/06-Seisakujouhou-12200000-Shakaiengokyokushougaihokenfukushibu/kijun_all.pdf"
     }
    ]
   },
   {
    "item": "呼吸器機能障害の等級基準",
    "target": "呼吸器機能障害の1・3・4級",
    "value": "指数(予測肺活量1秒率=1秒量÷予測肺活量×100)または動脈血O2分圧で判定。1級:指数20以下またはPaO2 50Torr以下(呼吸困難が強く歩行がほとんど不可、指数測定不能も含む)／3級:指数20超〜30以下またはPaO2 50超〜60Torr以下／4級:指数30超〜40以下またはPaO2 60超〜70Torr以下",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。「指数」は一般のFEV1/FVCとは別の定義。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.mhlw.go.jp/file/06-Seisakujouhou-12200000-Shakaiengokyokushougaihokenfukushibu/kijun_all.pdf"
     }
    ]
   },
   {
    "item": "じん臓機能障害の等級基準(3・4級)",
    "target": "じん臓機能障害の判定指標",
    "value": "3級:内因性クレアチニンクリアランス10以上20ml/分未満、または血清Cr 5.0以上8.0mg/dl未満(かつ家庭内での極めて温和な生活以外は著しく制限、または所定の所見2つ以上)／4級:CCr 20以上30ml/分未満、または血清Cr 3.0以上5.0mg/dl未満。eGFRがあれば10以上20未満を4級相当、10未満を3級相当として扱ってよい",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.mhlw.go.jp/file/06-Seisakujouhou-12200000-Shakaiengokyokushougaihokenfukushibu/kijun_all.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
  "review": "ai"
 },
 {
  "slug": "postural-perturbation-response",
  "name": "立位の外乱応答(足関節戦略・股関節戦略)",
  "category": "検査法・徴候",
  "aliases": [
   "外乱応答",
   "足関節戦略",
   "股関節戦略",
   "ankle strategy",
   "hip strategy",
   "プラットホーム",
   "姿勢戦略",
   "床面の移動"
  ],
  "rows": [
   {
    "item": "床面が後方へ動いたとき(前方動揺)",
    "target": "最初に働く筋",
    "value": "床が後方へ動くと身体は前方へ動揺し、弱い外乱では身体の後面の筋(腓腹筋・ハムストリングス・脊柱起立筋)が主に活動する。足関節戦略では足関節まわりの筋から始まり、遠位から近位の順に活動が広がるので、最も早いのは腓腹筋(足関節周囲の筋)。",
    "exam": "57-pm-1(プラットホームが後方へ動いたとき、外乱に対して最も早く筋活動が観察された筋①は=腓腹筋が正答。選択肢は脊柱起立筋・前脛骨筋・ハムストリングス・腓腹筋・腹直筋。図は未確認)",
    "q": [
     "57-pm-1"
    ],
    "note": "確認済み[S1][S2][S3]。図(筋活動の波形)は未確認。論文では、後方並進で内側腓腹筋の活動開始が短かった(下腿三頭筋が伸張されるため、と著者が解釈)。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://kaken.nii.ac.jp/ja/file/KAKENHI-PROJECT-22700548/22700548seika.pdf"
     },
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4316530"
     },
     {
      "label": "S3",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3986462"
     }
    ]
   },
   {
    "item": "床面が前方へ動いたとき(後方動揺)",
    "target": "前面の筋の反応",
    "value": "床が前方へ動くと身体は後方へ動揺し、弱い外乱では前脛骨筋・大腿四頭筋・腹部の筋が働く。健常者の実験では、前脛骨筋が先に(外乱後約0.10秒)、大腿四頭筋が少し遅れて(約0.14秒)活動した。",
    "exam": "出題は直接なし(参考。57-pm-1の選択肢の前脛骨筋・腹直筋は、この向きで働く筋)",
    "q": [],
    "note": "確認済み[S1][S2]。潜時は1つの研究の値で、条件により異なる。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://kaken.nii.ac.jp/ja/file/KAKENHI-PROJECT-22700548/22700548seika.pdf"
     },
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4316530"
     }
    ]
   },
   {
    "item": "外乱の大きさと戦略",
    "target": "足関節戦略と股関節戦略の使い分け",
    "value": "弱い外乱では足関節戦略、強い外乱では股関節戦略を使う。台が足より短いなど足関節戦略を使いにくいときは、体幹や大腿の筋が逆の近位から遠位の順に活動する(股関節戦略)。強い前方動揺(床の後方移動)では腹筋群・大腿四頭筋、強い後方動揺(床の前方移動)では脊柱起立筋群・ハムストリングスが働くと説明されている。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1][S2]。Nashnerらの報告をまとめた研究報告書・論文の記述。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://kaken.nii.ac.jp/ja/file/KAKENHI-PROJECT-22700548/22700548seika.pdf"
     },
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4316530"
     }
    ]
   },
   {
    "item": "筋活動が始まる時間",
    "target": "反応の速さ",
    "value": "外乱後およそ250ミリ秒以内に、測定したすべての筋で活動が始まった。床の水平移動(並進)のほうが回転より、ほとんどの筋で活動開始が早い。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S3]。1つの研究の結果。",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3986462"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
  "review": "ai"
 },
 {
  "slug": "ppi-palliative-prognostic-index",
  "name": "Palliative Prognostic Index",
  "category": "評価尺度",
  "aliases": [
   "Palliative Prognostic Index",
   "palliative prognostic index",
   "PPI〈palliative prognostic index〉",
   "パリアティブ・プログノスティック・インデックス"
  ],
  "rows": [
   {
    "item": "PPI の目的と対象",
    "target": "予後予測(活動能力の評価ではない)",
    "value": "終末期がん患者の予後予測。評価者は医療者、場面は緩和ケア病棟。PPS・経口摂取・浮腫・安静時の呼吸困難・せん妄の5項目から得点を出す(Morita 1999)",
    "exam": "59-am-20(乳房温存手術予定の早期乳癌の周術期PTで、活動能力の評価方法として正しいのはKPS。PPI〈palliative prognostic index〉は誤答=予後予測の指標)",
    "q": [
     "59-am-20"
    ],
    "note": "確認済み[S3][S2]。国試では「活動能力の評価」に当たらない選択肢",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://plaza.umin.ac.jp/~pcpkg/ppi.html"
     },
     {
      "label": "S2",
      "url": "https://pubmed.ncbi.nlm.nih.gov/10335930/"
     }
    ]
   },
   {
    "item": "PPI の5項目と配点",
    "target": "合計点の出し方",
    "value": "PPS 10〜20=4.0、30〜50=2.5、60以上=0。経口摂取 著明に減少(数口以下)=2.5、中程度に減少=1.0、正常=0。浮腫あり=1.0。安静時の呼吸困難あり=3.5。せん妄あり=4.0(薬物単独・臓器障害に伴わないものは含めない)。該当点を合計",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。消化管閉塞で高カロリー輸液を受けている場合、経口摂取は「正常」とする",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://jspm.ne.jp/files/guideline/glhyd_2013/01_02.pdf"
     }
    ]
   },
   {
    "item": "PPI のカットオフ",
    "target": "生存期間の予測",
    "value": "合計が6より大きい=3週以内に死亡する確率が感度80%・特異度85%(陽性反応適中度71%・陰性反応適中度90%)。原著では4より大きい=6週生存予測が感度80%・特異度77%",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1][S2]。資料により「6以上」「6.5以上」と書かれることがあり、原著・ガイドラインは「6より大きい」",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://jspm.ne.jp/files/guideline/glhyd_2013/01_02.pdf"
     },
     {
      "label": "S2",
      "url": "https://pubmed.ncbi.nlm.nih.gov/10335930/"
     }
    ]
   },
   {
    "item": "PPI の3群(原著)",
    "target": "予後の群分け",
    "value": "検証群で、A群(PPI≦2.0)・B群(2.0<PPI≦4.0)・C群(PPI>4.0)に分けると、A群>B群>C群の順に生存期間が長かった",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S2]",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://pubmed.ncbi.nlm.nih.gov/10335930/"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
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
  "slug": "prevention-levels",
  "name": "予防の段階(一次・二次・三次予防)",
  "category": "診断基準・分類",
  "aliases": [
   "一次予防",
   "二次予防",
   "三次予防",
   "1次予防",
   "2次予防",
   "3次予防",
   "primary prevention",
   "secondary prevention",
   "tertiary prevention",
   "Leavell",
   "健康増進",
   "疾病予防",
   "健康保護"
  ],
  "rows": [
   {
    "item": "一次予防(健康増進・健康保護・疾病予防)",
    "target": "病気の原因を絶つ段階",
    "value": "健康増進=生活習慣の改善(運動・栄養・喫煙・飲酒対策)／健康保護=環境の危険因子の削減(職場の安全・環境保健)／疾病予防=発病の予防(感染症予防・母子保健・循環器疾患の予防)",
    "exam": "49-pm-84(一次予防=健康増進が正答。誤答=再発予防・早期発見・重症化予防・リハビリテーション)／56-am-23(一次予防=メタボリックシンドロームの予防教育が正答)",
    "q": [
     "49-pm-84",
     "56-am-23"
    ],
    "note": "確認済み[S1]。3つは互いに影響し、純粋に分割するのは難しいと書かれている。56-am-23の他の選択肢(高血圧症患者の運動療法、脳出血患者の合併症予防など)の分類は資料に直接なし",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.mhlw.go.jp/www1/topics/kenko21_11/s0.html"
     }
    ]
   },
   {
    "item": "二次予防(早期発見・早期治療)",
    "target": "病気を早く見つける段階",
    "value": "病気の早期発見・早期治療。疾病発見(case finding:多数の中から少数の異常者を見つける。健診・検診など)とリスク発見(risk finding:見つけた対象のリスクを下げる)に分かれる",
    "exam": "53-pm-22(誤答=『健康診断は一次』。健診は二次予防に当たる)／49-pm-84(誤答=早期発見は一次ではない)",
    "q": [
     "53-pm-22",
     "49-pm-84"
    ],
    "note": "確認済み[S1]。『健康診断』という語そのものの分類は資料に書かれていないが、二次予防=早期発見の定義から判断",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.mhlw.go.jp/www1/topics/kenko21_11/s0.html"
     }
    ]
   },
   {
    "item": "三次予防(リハビリテーション)",
    "target": "社会的不利を防ぐ段階",
    "value": "第三段階の三次予防はリハビリテーションで、社会的不利の予防",
    "exam": "49-pm-84(誤答選択肢=リハビリテーションは三次予防)／53-pm-22(誤答=『糖尿病の運動療法は三次』)",
    "q": [
     "49-pm-84",
     "53-pm-22"
    ],
    "note": "確認済み[S1]。再発予防・合併症予防・重症化予防を何次に置くかは、この資料には直接なく、国試の正答・誤答の記録に従った",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.mhlw.go.jp/www1/topics/kenko21_11/s0.html"
     }
    ]
   },
   {
    "item": "仕分けの例(禁煙・ワクチン・健診)",
    "target": "具体例の予防段階",
    "value": "禁煙(喫煙対策)=一次予防の健康増進に含まれる／ワクチン接種(感染症予防)=一次予防の疾病予防／健診による早期発見=二次予防",
    "exam": "53-pm-22(正答=ワクチン接種は一次予防／誤答=健康診断は一次、禁煙は二次、合併症の予防は二次、糖尿病の運動療法は三次)",
    "q": [
     "53-pm-22"
    ],
    "note": "確認済み[S1]。合併症予防・糖尿病の運動療法の分類は資料に直接なし",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.mhlw.go.jp/www1/topics/kenko21_11/s0.html"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
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
  "slug": "ptb-offloading-orthosis",
  "name": "PTB式免荷装具(膝蓋腱支持式)",
  "category": "検査法・徴候",
  "aliases": [
   "PTB式免荷装具",
   "PTB免荷装具",
   "PTB装具",
   "膝蓋腱支持式",
   "膝蓋腱荷重",
   "歩行あぶみ",
   "パッテン底",
   "免荷装具",
   "PTB式"
  ],
  "rows": [
   {
    "item": "歩行あぶみ(パッテン底)の位置",
    "target": "PTB式免荷装具の構造(立位・歩行の安定)",
    "value": "歩行あぶみは舟状骨の真下(下腿長軸よりやや前方)に置く。体重心線にほぼ重なる位置で接地して、立位・歩行を安定させる。",
    "exam": "50-pm-38(正答:歩行あぶみ(パッテン底)は舟状骨の真下に置く)",
    "q": [
     "50-pm-38"
    ],
    "note": "確認済み[S1](国試解説サイト)。国試の正答と一致。公的資料では位置を確認できなかった。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://asitahe.com/50rigaku36-40national-examanation-pm/"
     }
    ]
   },
   {
    "item": "荷重する部位と避ける部位",
    "target": "PTB式の荷重の考え方",
    "value": "荷重するのは膝蓋靭帯(膝蓋腱)部と脛骨内側顆部。膝蓋骨そのものは荷重部位ではない。荷重を避ける(除圧する)のは、脛骨粗面・脛骨稜・脛骨顆部の前面・腓骨頭・ハムストリングスの走行部。",
    "exam": "50-pm-38(誤答:「ハムストリングスを圧迫するように装着する」「膝蓋骨は荷重部位である」)",
    "q": [
     "50-pm-38"
    ],
    "note": "確認済み[S1][S2]。国試解説サイトとリハビリ病院の解説で一致。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://asitahe.com/50rigaku36-40national-examanation-pm/"
     },
     {
      "label": "S2",
      "url": "https://www.yurin.or.jp/rehabilitation/blog/?id=8722"
     }
    ]
   },
   {
    "item": "膝関節の扱い",
    "target": "PTB式免荷装具と膝",
    "value": "膝関節は固定されず、動かせる(膝蓋腱部で体重を支え、膝から下を宙に浮かせる)。",
    "exam": "50-pm-38(誤答:「膝関節は固定される」)",
    "q": [
     "50-pm-38"
    ],
    "note": "確認済み[S1](国試解説サイト)。病院資料[S2]では膝の可動の記載は確認できなかった。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://asitahe.com/50rigaku36-40national-examanation-pm/"
     },
     {
      "label": "S2",
      "url": "https://www.yurin.or.jp/rehabilitation/blog/?id=8722"
     }
    ]
   },
   {
    "item": "適応(骨折部位・免荷の程度)",
    "target": "PTB式免荷装具を使う場面",
    "value": "主に下腿骨(脛腓骨)や足根骨など、膝から下の骨折に使う。膝蓋骨まわりで体重を支え、足部は宙に浮く。完全免荷にも部分荷重にもでき、早くから患部に荷重をかけられる。使用は医師が決める。",
    "exam": "50-pm-38(誤答:「脛骨高原骨折で適応となる」。国試の解説では除圧部位と骨折部位が重なるため適応外とされる)",
    "q": [
     "50-pm-38"
    ],
    "note": "食い違いあり。国試解説サイト[S1]は脛骨高原骨折を適応外とする。一方、リハビリ病院の解説[S2]は脛骨高原骨折にも処方されるとする。学習では国試の正答(脛骨高原骨折は選ばない)に従い、実際の適応は医師の判断。下腿骨骨折が主な適応であることは[S3]で確認。",
    "conflict": true,
    "sources": [
     {
      "label": "S1",
      "url": "https://asitahe.com/50rigaku36-40national-examanation-pm/"
     },
     {
      "label": "S2",
      "url": "https://www.yurin.or.jp/rehabilitation/blog/?id=8722"
     },
     {
      "label": "S3",
      "url": "https://www.jstage.jst.go.jp/article/jssd/63/0/63_238/_pdf/-char/ja"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
  "review": "ai"
 },
 {
  "slug": "pulse-palpation-sites",
  "name": "動脈の触知部位(脈拍)",
  "category": "検査法・徴候",
  "aliases": [
   "脈拍の触知",
   "動脈の触知",
   "総頸動脈",
   "上腕動脈",
   "橈骨動脈",
   "大腿動脈",
   "浅側頭動脈",
   "腋窩動脈",
   "内頸動脈",
   "長母指伸筋腱",
   "橈側手根屈筋腱"
  ],
  "rows": [
   {
    "item": "総頸動脈",
    "target": "頸部の脈拍の触知部位",
    "value": "喉頭と胸鎖乳突筋の前縁の間(輪状軟骨の高さ)で触れる。胸鎖乳突筋の前縁側であり、外縁ではない。成人の蘇生では第一選択の部位。両側を同時に押さえない(脳血流を下げるおそれ)。",
    "exam": "56-pm-58(正答=総頸動脈―胸鎖乳突筋の前縁)／53-pm-60(誤答=総頸動脈―胸鎖乳突筋の外縁)／58-pm-59(図で総頸動脈の触知部位を選ぶ。正答は足背動脈の図で、総頸動脈の図は誤)／60-pm-58(誤っている組合せ=内頸動脈―鎖骨内側1/3)",
    "q": [
     "56-pm-58",
     "53-pm-60",
     "58-pm-59",
     "60-pm-58"
    ],
    "note": "確認済み[S1][S6]。内頸動脈は体表の触知部位として資料に載っておらず、問題では誤りの組合せとして出ている。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.ncbi.nlm.nih.gov/books/NBK312/"
     },
     {
      "label": "S6",
      "url": "https://www.ncbi.nlm.nih.gov/books/NBK593199/"
     }
    ]
   },
   {
    "item": "足背動脈",
    "target": "足背の脈拍の触知部位",
    "value": "足の甲(前面)で、長母指伸筋腱の外側(長母指伸筋腱と長指伸筋腱の間にあたる)。舟状骨の隆起の近く(約1cm以内)にある。約10%の人では解剖学的な変異で触れない。母趾を伸ばさせると腱が浮いて探しやすい。",
    "exam": "58-pm-59(図の正答=足背動脈)／53-pm-60(正答=足背動脈―長母指伸筋腱と長指伸筋腱の間)／55-pm-56(足背動脈―長母指伸筋腱と長指伸筋腱の間は正しい組合せ)／60-pm-58(足背動脈―長母指伸筋腱外側は正しい組合せ)",
    "q": [
     "58-pm-59",
     "53-pm-60",
     "55-pm-56",
     "60-pm-58"
    ],
    "note": "確認済み[S2]。資料は「長母指伸筋腱の外側」と記載し、「長指伸筋腱との間」という言い方は資料に出てこない。位置としては同じ付近。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.ncbi.nlm.nih.gov/sites/books/NBK542175/"
     }
    ]
   },
   {
    "item": "後脛骨動脈",
    "target": "足関節内側の脈拍の触知部位",
    "value": "内果(内くるぶし)のすぐ後方。外果の後方ではない。触れにくく、特に慣れない人には難しい。",
    "exam": "55-pm-56(誤っている組合せ=後脛骨動脈―外果後方。正しくは内果後方)／58-pm-59(図の誤選択肢として後脛骨動脈)",
    "q": [
     "55-pm-56",
     "58-pm-59"
    ],
    "note": "確認済み[S2][S6]。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.ncbi.nlm.nih.gov/sites/books/NBK542175/"
     },
     {
      "label": "S6",
      "url": "https://www.ncbi.nlm.nih.gov/books/NBK593199/"
     }
    ]
   },
   {
    "item": "橈骨動脈",
    "target": "手首の脈拍の触知部位",
    "value": "手首の横じわ(手関節の皮線)より近位で、橈側手根屈筋腱のすぐ外側(橈側)。前腕の掌側・橈側(母指側)にあたる。",
    "exam": "56-pm-58(誤答選択肢に橈骨動脈の触知部位)／55-pm-56(橈骨動脈―前腕掌側面外側遠位部は正しい組合せ)／58-pm-59(図の誤選択肢として橈骨動脈)／60-pm-58(橈骨動脈―橈側手根屈筋腱外側は正しい組合せ)",
    "q": [
     "56-pm-58",
     "55-pm-56",
     "58-pm-59",
     "60-pm-58"
    ],
    "note": "確認済み[S3]。",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://www.ncbi.nlm.nih.gov/sites/books/NBK546626/"
     },
     {
      "label": "S4",
      "url": "https://www.ncbi.nlm.nih.gov/books/NBK393/"
     }
    ]
   },
   {
    "item": "上腕動脈",
    "target": "上腕〜肘前面の脈拍の触知部位",
    "value": "肘の前面(肘窩のすぐ近位)で、上腕二頭筋腱の内側(尺側)、上腕骨内側上顆の外側。二頭筋腱の外側ではない。乳児の蘇生で評価する部位。",
    "exam": "60-pm-58(正しい組合せ=上腕動脈―上腕二頭筋腱内側)／55-pm-56(上腕動脈―上腕二頭筋後内側縁は正しい組合せ)／53-pm-60(誤答=上腕動脈―二頭筋腱の外側)／56-pm-58(誤答選択肢に上腕動脈の触知部位)",
    "q": [
     "60-pm-58",
     "55-pm-56",
     "53-pm-60",
     "56-pm-58"
    ],
    "note": "確認済み[S2][S4]。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.ncbi.nlm.nih.gov/sites/books/NBK542175/"
     },
     {
      "label": "S4",
      "url": "https://www.ncbi.nlm.nih.gov/books/NBK393/"
     }
    ]
   },
   {
    "item": "大腿動脈",
    "target": "鼠径部の脈拍の触知部位",
    "value": "鼠径靱帯のすぐ遠位で、恥骨結合と上前腸骨棘の間のうち中点より内側寄り。ショックの評価や蘇生で確認する。",
    "exam": "60-pm-58(正しい組合せ=大腿動脈―上前腸骨棘と恥骨結節を結ぶ中点)／55-pm-56(大腿動脈―Scarpa三角内は正しい組合せ)／56-pm-58(誤答選択肢に大腿動脈の触知部位)／53-pm-60(誤答=大腿動脈―腸腰筋の外側)",
    "q": [
     "60-pm-58",
     "55-pm-56",
     "56-pm-58",
     "53-pm-60"
    ],
    "note": "国試は「中点」。StatPearlsは「恥骨結合と上前腸骨棘の間の半分より内側寄り」と書き、教科書で表現が分かれる。確認済み[S2]。Scarpa三角内という表現は資料の本文では確認できていない。",
    "conflict": true,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.ncbi.nlm.nih.gov/sites/books/NBK542175/"
     }
    ]
   },
   {
    "item": "浅側頭動脈",
    "target": "側頭部の脈拍の触知部位",
    "value": "耳の前方の浅いところにあり、触れやすい。耳の後方ではない。",
    "exam": "53-pm-60(誤答=浅側頭動脈―外耳孔の後方)",
    "q": [
     "53-pm-60"
    ],
    "note": "確認済み[S4]。「外耳孔」を基準にした記載は資料にない(「耳の前方」と書かれている)。",
    "conflict": false,
    "sources": [
     {
      "label": "S4",
      "url": "https://www.ncbi.nlm.nih.gov/books/NBK393/"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
  "review": "ai"
 },
 {
  "slug": "pusher-syndrome",
  "name": "Pusher現象(SCP)",
  "category": "検査法・徴候",
  "aliases": [
   "Pusher現象",
   "pusher",
   "プッシャー現象",
   "プッシャー症候群",
   "押す人症候群",
   "pusher syndrome",
   "pusher behavior",
   "pusher behaviour",
   "contraversive pushing",
   "Scale for Contraversive Pushing",
   "SCP",
   "Burke Lateropulsion Scale",
   "lateropulsion"
  ],
  "rows": [
   {
    "item": "Pusher現象の特徴",
    "target": "脳卒中後の姿勢異常(非麻痺側で押して麻痺側へ傾く)",
    "value": "脳卒中後に、非麻痺側の上下肢で床や周囲を押して麻痺側へ体を傾け、支えなしでは麻痺側へ倒れてしまう。さらに、傾いた体を他人が正中・垂直へ戻そうとすると抵抗する。つまり身体軸は『麻痺側』に傾く。",
    "exam": "57-am-40(「身体軸が非麻痺側に傾斜する」が誤りの記述=正答。正しくは麻痺側へ傾斜)／56-am-9(L-dopa服用後に突然動けなくなる現象の問いで、pusher現象は誤答選択肢。正答はon-off現象)",
    "q": [
     "57-am-40",
     "56-am-9"
    ],
    "note": "確認済み[S1][S2][S5]。56-am-9のon-off現象側の確認は本カードでは行っていない(既存カードparkinson-signs-motor-complications参照)。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC1579228"
     },
     {
      "label": "S2",
      "url": "https://pubmed.ncbi.nlm.nih.gov/11087771/"
     },
     {
      "label": "S5",
      "url": "https://www.igaku-shoin.co.jp/misc/pdf/ptj_eoi/5406.pdf"
     }
    ]
   },
   {
    "item": "垂直判断との関係",
    "target": "Pusher現象の機序",
    "value": "Pusher患者は、自分の体が非麻痺側へ約18度傾いた状態を『まっすぐ(垂直)』と感じる(自覚的姿勢垂直SPVの異常)。一方、自覚的視覚垂直(SVV)は障害されない。重力に対する身体の向きを感じ取る別の系の障害と考えられている。",
    "exam": "57-am-40(正しい記述として出題: 垂直判断の障害が関係する。この問いの誤りは「非麻痺側に傾斜」)",
    "q": [
     "57-am-40"
    ],
    "note": "確認済み[S2]。垂直判断のうち問題になるのは姿勢の垂直(SPV)で、視覚的垂直は保たれるという報告。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://pubmed.ncbi.nlm.nih.gov/11087771/"
     }
    ]
   },
   {
    "item": "好発側(右半球・左半球)",
    "target": "Pusher現象の頻度と経過",
    "value": "急性期脳卒中1660人の調査で、pusher行動は9.4%にみられた。右大脳半球損傷で17.4%、左半球損傷で9.5%と右に多く(リスク比1.83)、回復も右半球損傷のほうが遅かった。",
    "exam": "57-am-40(正しい記述として出題: 右半球損傷に多い)",
    "q": [
     "57-am-40"
    ],
    "note": "確認済み[S3]。別の105人の研究[S4]では損傷側による頻度差はなかったと報告されており、研究により結果が違う。国試は右半球に多い側の記述。",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://pubmed.ncbi.nlm.nih.gov/22382159/"
     },
     {
      "label": "S4",
      "url": "https://pubmed.ncbi.nlm.nih.gov/18617579/"
     }
    ]
   },
   {
    "item": "SCPの構成と診断",
    "target": "Scale for Contraversive Pushing(SCP)",
    "value": "座位と立位で、(1)自発的な姿勢の対称性、(2)非麻痺側の腕・脚を外転・伸展して押す力を強めるか、(3)他動的に姿勢を直されることへの抵抗、の3つをみる。原法では3つすべてがあり、姿勢と外転・伸展は座位+立位の合計が1以上(各最大2)、かつ抵抗がある場合にpusher現象と診断する。",
    "exam": "60-am-10(誤答選択肢: pusherの評価としてSCP。右脳出血の症例で最優先は線分抹消試験。症例が正中位修正に抵抗しないためSCPの優先度は低い)",
    "q": [
     "60-am-10"
    ],
    "note": "確認済み[S1]。SCPの項目と原法の診断規則は[S1]の記載による。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC1579228"
     }
    ]
   },
   {
    "item": "SCPのカットオフ(Baccini)",
    "target": "SCPで何点以上をpusherとするか",
    "value": "脳卒中直後105人で3つの基準を比較。合計点>0(Crit_1)は臨床診断との一致が低く(κ=.212)、各セクションの下位得点がいずれも>0(Crit_2)が最も一致し(κ=.933)、各セクション≧1(Crit_3)は一致はやや低い(κ=.754)が偽陽性がなかった。目的に応じて基準を選ぶとよいとされた。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S4]。",
    "conflict": false,
    "sources": [
     {
      "label": "S4",
      "url": "https://pubmed.ncbi.nlm.nih.gov/18617579/"
     }
    ]
   },
   {
    "item": "評価法の種類",
    "target": "Pusher現象の評価表",
    "value": "臨床で使われる評価表は4種類: 最初に発表された『Pusher評価チャート』、現在最も広く使われるSCP、最も細かい段階付けができるBurke Lateropulsion Scale(BLS)、4段階で最も簡便なFour-Point Pusher Score。SCPとBLSの比較では138評価中31で分類が食い違い、すべてBLSで陽性・SCPで陰性で、BLSは立位・歩行での軽いpusherを拾いやすい可能性がある。",
    "exam": "60-am-10(SCPは誤答選択肢)",
    "q": [
     "60-am-10"
    ],
    "note": "確認済み[S5][S6]。",
    "conflict": false,
    "sources": [
     {
      "label": "S5",
      "url": "https://www.igaku-shoin.co.jp/misc/pdf/ptj_eoi/5406.pdf"
     },
     {
      "label": "S6",
      "url": "https://pubmed.ncbi.nlm.nih.gov/24459174/"
     }
    ]
   },
   {
    "item": "治療の考え方",
    "target": "Pusher現象へのアプローチ",
    "value": "現時点でpusher現象を確実に改善させる確立した方法はないとされる。動作練習では、安定した端座位を獲得してから、逆方向連鎖化による起き上がり練習など、誤りを避ける学習(無誤学習)を取り入れる方法が紹介されている。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S5](特集記事の要約)。",
    "conflict": false,
    "sources": [
     {
      "label": "S5",
      "url": "https://www.igaku-shoin.co.jp/misc/pdf/ptj_eoi/5406.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
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
  "slug": "raven-cpm",
  "name": "Raven色彩マトリックス検査(RCPM)",
  "category": "検査法・徴候",
  "aliases": [
   "RCPM",
   "Raven色彩マトリックス検査",
   "Raven色彩マトリックス",
   "レーヴン色彩マトリックス検査",
   "レーヴン色彩マトリックス",
   "Raven's colored progressive matrices",
   "Raven's coloured progressive matrices",
   "colored progressive matrices",
   "coloured progressive matrices",
   "Raven色彩"
  ],
  "rows": [
   {
    "item": "RCPMの概要",
    "target": "非言語性の知能(論理的思考・類推)の検査",
    "value": "言葉を使わず図形で考える非言語性の検査。A・Ab・Bの3セット(各12問)計36問で、制限時間なし、個別でも集団でも約15〜30分。結果は1つの素点で、基準データに基づくパーセンタイルに換算する。対象は5〜11歳の子ども、高齢者、知的・身体的な障害のある人。",
    "exam": "51-am-80(『遅延再生を含まない』検査として正答: RCPM。他の選択肢のRBMT・MMSE・HDS-R・RAVLTは遅延再生を含む検査として出題)／50-pm-80(図に示す課題を用いる検査の問いで、RCPMは誤答選択肢)",
    "q": [
     "51-am-80",
     "50-pm-80"
    ],
    "note": "確認済み[S1](構成・対象・時間)。『遅延再生を含まない』は、36問の図形課題のみという構成からの整理で、出典に『遅延再生なし』の明記はない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.pearsonassessments.com/store/en/usd/p/100000098.html"
     }
    ]
   },
   {
    "item": "注意障害の検査ではない",
    "target": "RCPMと注意・遂行機能・記憶の検査の区別",
    "value": "高次脳機能障害の診断基準ガイドラインが注意障害の参考検査として挙げるのは、抹消・検出課題、Stroop test、心的統制課題、Continuous Performance Testなど。Raven色彩マトリックス検査は注意の検査ではなく、推理・類推をみる知能検査の側。",
    "exam": "57-am-28(『注意障害の検査はどれか』で、RCPMは誤答選択肢。正答はTMT)",
    "q": [
     "57-am-28"
    ],
    "note": "確認済み[S1][S2]。ガイドラインの注意障害の例示にRCPMが含まれないことを確認(記載がない=注意の検査として扱われていない)。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.pearsonassessments.com/store/en/usd/p/100000098.html"
     },
     {
      "label": "S2",
      "url": "https://www.rehab.go.jp/application/files/3115/1669/0095/3_1_04_1.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
  "review": "ai"
 },
 {
  "slug": "ravlt",
  "name": "Rey聴覚性言語学習検査(RAVLT)",
  "category": "検査法・徴候",
  "aliases": [
   "RAVLT",
   "Rey Auditory Verbal Learning Test",
   "Rey auditory verbal learning test",
   "Rey聴覚性言語学習検査",
   "Rey聴覚的言語学習テスト",
   "Rey聴覚言語性学習検査",
   "聴覚性言語学習検査",
   "単語リスト学習課題",
   "単語リスト学習"
  ],
  "rows": [
   {
    "item": "RAVLTの手順",
    "target": "言語性(聴覚性)の学習・記憶の検査",
    "value": "意味のつながりのない15語のリストA を読み上げ、そのつど自由再生させる(5回)。次に別の15語のリストB を1回提示して再生させ、その直後にリストA をもう一度再生させる。約20分後にリストA を遅延再生し、最後にA の15語をB の語や関連語を含む50語の中から選ぶ再認を行う。",
    "exam": "51-am-80(『遅延再生を含まないのはどれか』で、RAVLTは遅延再生を含むので誤答選択肢。正答はRCPM)／50-pm-80(図に示す課題を用いる検査の問いで、RAVLTは誤答選択肢。正答はRey-Osterrieth複雑図形検査)",
    "q": [
     "51-am-80",
     "50-pm-80"
    ],
    "note": "確認済み[S1]。遅延再生までの時間は報告により20〜30分と幅がある(S1は20分)。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5226952"
     }
    ]
   },
   {
    "item": "前向健忘の評価での位置づけ",
    "target": "高次脳機能障害の記憶障害(前向健忘)の参考検査",
    "value": "国立障害者リハビリテーションセンターの診断基準ガイドラインは、前向健忘の参考検査として、ウェクスラー記憶検査、対語記銘課題(三宅式など)、単語リスト学習課題(Rey聴覚的言語学習テストなど)、視覚学習課題(Rey-Osterrieth複雑図形検査・ベントン視覚記銘検査など)を挙げている。RAVLTは『単語リスト学習課題』にあたる。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S2]。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.rehab.go.jp/application/files/3115/1669/0095/3_1_04_1.pdf"
     }
    ]
   },
   {
    "item": "日常記憶の検査との違い",
    "target": "RAVLTとRBMTの使い分け",
    "value": "RAVLTは単語リストの学習・再生を調べる検査で、日常生活で必要な記憶を直接試す検査ではない。日常生活場面の記憶障害の検出に適するのはリバーミード行動記憶検査(RBMT。別カード参照)。",
    "exam": "59-pm-81(日常生活場面で必要な記憶の障害の検出に最も適した検査は? RAVLTは誤答選択肢。正答はRBMT)",
    "q": [
     "59-pm-81"
    ],
    "note": "RBMTが日常記憶の検査であるという側は既存カードrbmtに記載。RAVLTが単語リスト学習課題である点は[S1][S2]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5226952"
     },
     {
      "label": "S2",
      "url": "https://www.rehab.go.jp/application/files/3115/1669/0095/3_1_04_1.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
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
  "slug": "research-terms-confounder-population",
  "name": "研究用語(交絡因子・母集団・標本・無作為抽出)",
  "category": "診断基準・分類",
  "aliases": [
   "交絡因子",
   "中間因子",
   "母集団",
   "標本調査",
   "標本抽出",
   "無作為抽出",
   "標本誤差",
   "非標本誤差",
   "多変量解析",
   "研究に関する用語"
  ],
  "rows": [
   {
    "item": "交絡因子",
    "target": "要因(曝露)と結果の関連をゆがめる第3の因子",
    "value": "要因と結果の関係に影響して、見かけの関連をゆがめる(かく乱する)他の因子。成立の3条件=①結果(疾病)発生の危険因子である ②要因(曝露)と関係がある ③要因と結果の中間因子ではない",
    "exam": "53-am-21(正答選択肢:「交絡因子=2つの要因の関連をかく乱する他の因子」)",
    "q": [
     "53-am-21"
    ],
    "note": "確認済み[S1]。国試の説明と一致。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.fmu.ac.jp/gendeqsp/data/file/manual_statistics_03.pdf"
     }
    ]
   },
   {
    "item": "交絡因子の調整",
    "target": "交絡の影響を除いて関連を見る方法",
    "value": "多変量解析で、交絡因子の影響を除いたうえで要因と結果の関連を調べる。デザイン段階で調整しきれない因子を解析モデルに入れる、という位置づけ",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。層別化・マッチングなど他の方法は、この資料では確認していない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.fmu.ac.jp/gendeqsp/data/file/manual_statistics_03.pdf"
     }
    ]
   },
   {
    "item": "交絡因子と中間因子の区別",
    "target": "調整してよい因子かの見極め",
    "value": "要因と結果の間の経路上にある因子(要因が中間因子を介して結果の原因になる)は、交絡因子ではない。見極めは重要だが難しく、過去の文献や生理学的・生化学的な機序から判断する",
    "exam": "出題は直接なし(参考。交絡の条件③に対応)",
    "q": [],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.fmu.ac.jp/gendeqsp/data/file/manual_statistics_03.pdf"
     }
    ]
   },
   {
    "item": "母集団",
    "target": "調べたい対象の全体",
    "value": "標本調査で、調べる対象とされている元の集団全体。標本調査の目的は、標本から母集団の状況をできるだけ正確に推計すること",
    "exam": "53-am-21(誤答選択肢:「母集団=実際の研究の対象となるもの」。実際に調べる対象として取り出されるのは標本)",
    "q": [
     "53-am-21"
    ],
    "note": "確認済み[S2]。総務省統計局の資料は標本調査の説明で、研究デザイン全般の定義ではないが、母集団と標本の関係は同じ。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.stat.go.jp/info/kenkyu/kyouiku/pdf/4siryo2.pdf"
     }
    ]
   },
   {
    "item": "標本(サンプル)",
    "target": "母集団から取り出して実際に調べる一部",
    "value": "対象のすべてを調べず、一部だけを取り出して調査するのが標本調査で、取り出されたものを標本という。母集団のよい縮図となるように抽出することが重要",
    "exam": "53-am-21(「実際の研究の対象」は標本に当たる、という切り分けで母集団の選択肢が誤り)",
    "q": [
     "53-am-21"
    ],
    "note": "確認済み[S2]",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.stat.go.jp/info/kenkyu/kyouiku/pdf/4siryo2.pdf"
     }
    ]
   },
   {
    "item": "無作為抽出(ランダムサンプリング)",
    "target": "標本の選び方",
    "value": "選ぶ際の恣意性をなくし、完全に確率的に母集団から標本を選ぶ方法",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S2]",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.stat.go.jp/info/kenkyu/kyouiku/pdf/4siryo2.pdf"
     }
    ]
   },
   {
    "item": "標本誤差と非標本誤差",
    "target": "調査結果が真の値とずれる原因",
    "value": "標本誤差=全数調査でなく標本調査をしたことで生じる誤差。非標本誤差=それ以外の誤差(誤回答・未回答など)",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S2]",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.stat.go.jp/info/kenkyu/kyouiku/pdf/4siryo2.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
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
  "slug": "rey-osterrieth-complex-figure",
  "name": "Rey-Osterrieth複雑図形検査(ROCFT)",
  "category": "検査法・徴候",
  "aliases": [
   "ROCFT",
   "ROCF",
   "Rey-Osterrieth複雑図形",
   "Rey-Osterrieth複雑図形検査",
   "Rey-Osterrieth complex figure test",
   "Rey-Osterrieth complex figure",
   "Rey Osterrieth complex figure",
   "Rey複雑図形検査",
   "Rey複雑図形",
   "Reyの複雑図形検査",
   "Reyの複雑図形",
   "複雑図形検査",
   "Rey's complex figure"
  ],
  "rows": [
   {
    "item": "課題の内容と測るもの",
    "target": "視空間構成と視覚記憶の検査",
    "value": "34本の線分と円の中の3つの点からなる無意味で複雑な図形を、まず見ながら模写させる。続いて、一定時間(最も一般的なのは3分)をおいて見ずに思い出して描かせる(再生)。視空間の知覚・構成機能と、非言語性(視覚性)の記憶を測る。",
    "exam": "50-pm-80(図に示す課題を用いる検査として正答: Rey-Osterrieth複雑図形検査)／59-am-9(脳挫傷後の人格・行動変化の症例で最優先の検査の問いで、Rey複雑図形検査は誤答選択肢。正答はFAB)",
    "q": [
     "50-pm-80",
     "59-am-9"
    ],
    "note": "確認済み[S1][S2]。再生までの間隔は研究により3分・30分などがある。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.ed.ehime-u.ac.jp/~kiyou/2008/pdf/09.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.frontiersin.org/articles/10.3389/fneur.2021.680474/pdf"
     }
    ]
   },
   {
    "item": "採点(Osterrieth法)",
    "target": "模写・再生の得点化",
    "value": "図形を18の部位に分け、各部位を最大2点で採点して合計36点とするのが一般的。正確な形で正確な位置=2点、形は正確だが位置が不正確、または位置は正確だが形が不正確=1点、形も位置も不正確だが何を描いたか分かる=0.5点、描かれていない=0点。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1][S2]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.ed.ehime-u.ac.jp/~kiyou/2008/pdf/09.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.frontiersin.org/articles/10.3389/fneur.2021.680474/pdf"
     }
    ]
   },
   {
    "item": "前向健忘の検査としての位置づけ",
    "target": "記憶障害の評価での分類",
    "value": "診断基準ガイドラインは、前向健忘の参考検査の『視覚学習課題』として、Rey-Osterrieth複雑図形検査やベントン視覚記銘検査を挙げている。言語性の記憶をみる単語リスト学習課題(RAVLTなど)とは別の領域。",
    "exam": "59-am-9(誤答選択肢。視空間認知・視覚記憶の検査であり、この症例の最優先ではない)",
    "q": [
     "59-am-9"
    ],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.rehab.go.jp/application/files/3115/1669/0095/3_1_04_1.pdf"
     }
    ]
   },
   {
    "item": "注意障害・遂行機能障害の検査ではない",
    "target": "ROCFTと他の高次脳機能検査の区別",
    "value": "ガイドラインの注意障害の例示は抹消・検出課題、Stroop test、心的統制課題、CPT、遂行機能障害の評価法の例示はBADSなどで、Rey-Osterrieth複雑図形検査は含まれない。模写・再生には計画や組織化の要素も関わるとされるが、国試では注意や遂行機能の検査としては誤りとされた。",
    "exam": "57-am-28(『注意障害の検査はどれか』で誤答選択肢。正答はTMT)／55-pm-29(『遂行機能障害の診断に用いる検査』でReyの複雑図形検査は誤答選択肢。正答はWCST)",
    "q": [
     "57-am-28",
     "55-pm-29"
    ],
    "note": "確認済み[S1][S2]。ガイドラインの例示に含まれないことの確認(記載がない=検査の目的としては扱われていない)。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.rehab.go.jp/application/files/3115/1669/0095/3_1_04_1.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.frontiersin.org/articles/10.3389/fneur.2021.680474/pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
  "review": "ai"
 },
 {
  "slug": "rice-acute-trauma",
  "name": "RICE処置・肉ばなれの急性期対応",
  "category": "リスク管理",
  "aliases": [
   "RICE",
   "RICE処置",
   "アイシング",
   "氷冷",
   "応急処置",
   "肉ばなれ",
   "肉離れ",
   "ハムストリングスの肉ばなれ",
   "Osgood-Schlatter病",
   "オスグッド",
   "オスグッド・シュラッター病",
   "脛骨粗面",
   "脛骨結節"
  ],
  "rows": [
   {
    "item": "RICE処置の4要素",
    "target": "捻挫・肉ばなれなど四肢のスポーツ外傷の応急処置",
    "value": "R=Rest(安静: 副子・テーピングで損傷部位を固定)／I=Ice(冷却)／C=Compression(圧迫: パッドを当てテーピング・弾性包帯で軽く圧迫して固定)／E=Elevation(挙上: 損傷部位を心臓より高く)。「止血」は4要素に含まれない。",
    "exam": "49-am-95(「外傷後のRICEに含まれないのはどれか」。正答=止血。安静・氷冷・圧迫・挙上は含まれる)",
    "q": [
     "49-am-95"
    ],
    "note": "確認済み[S1]。目的は、安静=腫脹や血管・神経の損傷を防ぐ、冷却=二次性の低酸素障害による細胞壊死と腫脹を抑える、圧迫=内出血と腫脹を防ぐ、挙上=腫脹を防ぎ軽減する(資料の説明の要約)。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://jsoa.or.jp/content/images/2023/05/s03.pdf"
     }
    ]
   },
   {
    "item": "肉ばなれの急性期(受傷直後〜48時間)の対応",
    "target": "筋腱損傷(肉ばなれ)の初期対応",
    "value": "損傷の部位・程度によらず、受傷直後〜48時間はスポーツ外傷一般と同じくRICEが基本。損傷筋の緊張を除いた肢位で保護する。固定は最小限にとどめ、共動筋のある筋腱損傷では少なくとも2週間以内にストレッチングを開始する。筋実質〜筋腱移行部周囲の出血(Ⅰ型)は数日〜1週間の局所安静後にアスレティックリハビリテーションへ移行する。",
    "exam": "49-pm-14(野球の走塁中の右大腿後面の肉ばなれ、骨折なし。適切=下肢の挙上・浮腫の予防・アイシング・弾性包帯での圧迫。適切でないもの=超音波照射)",
    "q": [
     "49-pm-14"
    ],
    "note": "確認済み[S2]。資料の急性期の処置はRICEで、超音波は次の行のとおりリハビリ期の物理療法として出てくる。急性期の超音波を明確に禁じる文言は確認できていない(国試の「適切でない」は、急性期の基本処置に含まれないことと整合)。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.japan-sports.or.jp/Portals/0/data/supoken/doc/studiesreports/2001_2020/H2005.pdf"
     }
    ]
   },
   {
    "item": "冷却(アイシング)の方法",
    "target": "RICEのIce",
    "value": "氷を入れたビニール袋やアイスバッグで患部を冷却。15〜20分冷やし(患部の感覚がなくなったら)はずし、痛みが出てきたら再び冷やす。これを1〜3日繰り返す。直接氷を当てず、アンダーラップを巻く、または氷袋をタオルでくるむ。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://jsoa.or.jp/content/images/2023/05/s03.pdf"
     }
    ]
   },
   {
    "item": "肉ばなれのリハビリ期の物理療法",
    "target": "アスレティックリハビリテーション期(急性期のあと)",
    "value": "トレーニング前は患部へのホットパック・マッサージなどで血流を高める。トレーニング後はアイシングを行い、そのあと超音波治療・低周波治療などを行う。",
    "exam": "49-pm-14(超音波照射が「適切でない」とされた選択肢。急性期ではなくリハビリ期の物理療法として記載される)",
    "q": [
     "49-pm-14"
    ],
    "note": "確認済み[S2]。急性期(受傷後48時間まで)の処置ではなく、アスレティックリハビリテーション期の記載。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.japan-sports.or.jp/Portals/0/data/supoken/doc/studiesreports/2001_2020/H2005.pdf"
     }
    ]
   },
   {
    "item": "Osgood-Schlatter病の保存療法",
    "target": "成長期の脛骨粗面の牽引性障害(膝前面の痛み・脛骨粗面の圧痛)",
    "value": "伝統的な保存療法は、安静(スポーツ休止)・アイシング・NSAIDs・運動療法。運動療法は大腿四頭筋のストレッチが一般的とされるが、有効性のエビデンスは少ない。発症早期に運動を休止すると多くで骨性修復が得られ(初期・進行期に発見し休止した例の約9割、復帰は平均3.8週)、剥離骨片ができて痛みが増悪した場合は長期の運動制限が必要。",
    "exam": "49-am-14(10歳女児、運動後の膝痛、脛骨結節部の圧痛。正答=運動の制限。誤答=ギプス固定・運動後の極超短波・運動後のホットパック・腸脛靱帯のストレッチ)",
    "q": [
     "49-am-14"
    ],
    "note": "確認済み[S3]。資料には温熱療法やギプス固定の記載はなく、これらを否定する文言は確認できていない。アイシングは一般的だが効果を検証した報告はないとされる。",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://www.jstage.jst.go.jp/article/jsatj/4/1/4_29/_pdf/-char/ja"
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
  "slug": "schizophrenia-subtypes",
  "name": "統合失調症の病型(緊張型・破瓜型・妄想型など)",
  "category": "診断基準・分類",
  "aliases": [
   "統合失調症の病型",
   "統合失調症の亜型",
   "緊張型",
   "破瓜型",
   "妄想型",
   "緊張病",
   "カタレプシー",
   "catatonic schizophrenia",
   "hebephrenic schizophrenia",
   "paranoid schizophrenia"
  ],
  "rows": [
   {
    "item": "緊張型(F20.2)",
    "target": "興奮・昏迷などの運動・意志面の異常が目立つ型",
    "value": "精神運動の障害が前面に出る型。過活動(興奮)と昏迷の間を行き来する、自動的に従う状態と拒絶が交互に出る、不自然な姿勢を長く保つ、激しい興奮の発作が目立つ、などがある。カタレプシー・蝋屈症もこの型に含まれる",
    "exam": "58-am-97(正答:緊張型。問題文「興奮や昏迷などの意志発動の異常が主体」)",
    "q": [
     "58-am-97"
    ],
    "note": "確認済み[S1]。国試の「意志発動の異常(興奮・昏迷)」は、資料の「精神運動障害(過活動と昏迷など)」に当たる言い換えとして読んだ",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://classbrowser.nhs.uk/ICD-10-5TH-Edition/vol1/block-f20-f29.htm"
     }
    ]
   },
   {
    "item": "破瓜型(F20.1)",
    "target": "感情の変化が前面に出る型",
    "value": "感情の変化が目立つ。妄想・幻覚は断片的で移ろいやすい。行動は無責任で予測しにくく、わざとらしい癖が多い。気分は浅く不適切で、思考がまとまらず、会話が支離滅裂になり、社会的に引きこもりやすい。陰性症状(感情の平板化・意欲の低下)が急速に進むため予後は一般に不良で、診断は思春期〜若年成人が基本",
    "exam": "58-am-97(誤答選択肢:破瓜型。意志発動の異常が主体なのは緊張型)",
    "q": [
     "58-am-97"
    ],
    "note": "確認済み[S1]。資料では hebephrenic(別名 disorganized)",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://classbrowser.nhs.uk/ICD-10-5TH-Edition/vol1/block-f20-f29.htm"
     }
    ]
   },
   {
    "item": "妄想型(F20.0)",
    "target": "妄想が中心の型",
    "value": "比較的安定した、しばしば被害的な妄想が中心。多くは幻覚(特に幻聴)や知覚の障害を伴う。感情・意欲・言語の障害や緊張病症状は、ないか目立たない",
    "exam": "58-am-97(誤答選択肢:妄想型)",
    "q": [
     "58-am-97"
    ],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://classbrowser.nhs.uk/ICD-10-5TH-Edition/vol1/block-f20-f29.htm"
     }
    ]
   },
   {
    "item": "単純型(F20.6)",
    "target": "幻覚・妄想が先行せず陰性症状が進む型",
    "value": "奇妙な行動がゆっくり進行し、社会の要求に応えられなくなって全体の機能が低下する。残遺型に特徴的な陰性症状(感情の鈍麻・意欲の喪失)が、はっきりした精神病症状を先行させずに現れる",
    "exam": "58-am-97(誤答選択肢:単純型)",
    "q": [
     "58-am-97"
    ],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://classbrowser.nhs.uk/ICD-10-5TH-Edition/vol1/block-f20-f29.htm"
     }
    ]
   },
   {
    "item": "残遺型(F20.5)",
    "target": "慢性期の陰性症状が残る型",
    "value": "統合失調症の慢性期で、初期から後期へ明らかに進んだ後の段階。長期の陰性症状(精神運動の鈍化・活動性低下・感情の平板化・会話の乏しさ・自己管理や社会的機能の低下など)が特徴。長く続くが、必ずしも不可逆ではない",
    "exam": "58-am-97(誤答選択肢:残遺型)",
    "q": [
     "58-am-97"
    ],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://classbrowser.nhs.uk/ICD-10-5TH-Edition/vol1/block-f20-f29.htm"
     }
    ]
   },
   {
    "item": "鑑別不能型(未分化型・F20.3)",
    "target": "どの型にも当てはまらない型",
    "value": "統合失調症の一般的な診断基準は満たすが、妄想型・破瓜型・緊張型のどれにも当てはまらない、または複数の型の特徴を持ち、特定の型が優勢でないもの",
    "exam": "出題は直接なし(参考)",
    "q": [
     "58-am-97"
    ],
    "note": "確認済み[S1]。58-am-97の選択肢には出ていない",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://classbrowser.nhs.uk/ICD-10-5TH-Edition/vol1/block-f20-f29.htm"
     }
    ]
   },
   {
    "item": "病型分類の現在の扱い",
    "target": "国試の病型は古典的分類(ICD-10・DSM-IV)",
    "value": "DSM-5 では、DSM-IV にあった下位分類(妄想型・破瓜型・緊張型・未分化型・残遺型)が削除され、症状の次元を評価する方式になった。理由として、異質性を十分に反映せず、時間とともに安定しにくく、経過や治療反応を予測しなかったことなどが挙げられている",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S2]。ICD-10の病型(S1)は上の各行。ICD-11については本文で確認できていないため記載しない",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4393695"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
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
  "slug": "sct-sentence-completion",
  "name": "SCT(文章完成法)",
  "category": "評価尺度",
  "aliases": [
   "SCT",
   "文章完成法",
   "文章完成テスト"
  ],
  "rows": [
   {
    "item": "SCTの方法(文章完成法)",
    "target": "人格(パーソナリティ)検査の種類。投影法",
    "value": "あらかじめ書かれている未完成の刺激文の続きを、思い浮かぶまま自由に書いてもらう。書かれた内容に自己概念・対人関係・家族関係などが投影されると考え、本人の状態やパーソナリティを理解する",
    "exam": "54-am-81(正答: 心理検査の一部の図を示し、この検査法を選ぶ。選択肢はHTP・SCT・MMPI・P-Fスタディ・ASQで、正答はSCT。図は未確認)／56-am-79(誤答選択肢: 「イラスト風に描かれた人物のセリフを書き込む」はP-Fスタディで、SCTではない)",
    "q": [
     "54-am-81",
     "56-am-79"
    ],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://tk.seitoku-u.ac.jp/cms_tk_seitoku/wp-content/uploads/2024/12/%E8%81%96%E5%BE%B3%E5%A4%A7%E5%AD%A6%E5%85%AC%E8%AA%8D%E5%BF%83%E7%90%86%E5%B8%AB%E5%85%A5%E5%AD%A6%E8%AA%AC%E6%98%8E%E4%BC%9A%E6%A8%A1%E6%93%AC%E8%AC%9B%E7%BE%A9%E3%83%91%E3%83%BC%E3%82%BD%E3%83%8A%E3%83%AA%E3%83%86%E3%82%A3%E6%A4%9C%E6%9F%BB.pdf"
     }
    ]
   },
   {
    "item": "SCTの位置づけ・長所と短所",
    "target": "投影法の中での特徴",
    "value": "投影法の中では比較的意識に近いレベルの検査。長所: 施行が容易、集団に実施できる、質的な情報が得られる。短所・限界: 本人の言語表出によるため深層心理までは捉えにくい、言語表出能力が必要、数量化など客観的評価が難しい、解釈に習熟が必要。単独でなく、より深い層を探るロールシャッハテストなど別の投影法と組み合わせる(テストバッテリー)のが一般的",
    "exam": "出題は直接なし(参考)。第49回(前頭葉機能検査ではない)・第51回(投影法)の選択肢として出ていた記録があるが、問題IDは入力になし",
    "q": [],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://tk.seitoku-u.ac.jp/cms_tk_seitoku/wp-content/uploads/2024/12/%E8%81%96%E5%BE%B3%E5%A4%A7%E5%AD%A6%E5%85%AC%E8%AA%8D%E5%BF%83%E7%90%86%E5%B8%AB%E5%85%A5%E5%AD%A6%E8%AA%AC%E6%98%8E%E4%BC%9A%E6%A8%A1%E6%93%AC%E8%AC%9B%E7%BE%A9%E3%83%91%E3%83%BC%E3%82%BD%E3%83%8A%E3%83%AA%E3%83%86%E3%82%A3%E6%A4%9C%E6%9F%BB.pdf"
     }
    ]
   },
   {
    "item": "SCTと他の人格検査の区別",
    "target": "人格検査の種類(投影法・質問紙法)",
    "value": "SCT・ロールシャッハテスト・P-Fスタディ・バウムテストはいずれも投影法に分類される人格検査。P-Fスタディは24の欲求不満場面への言語反応から人格を調べる検査で、SCTのように文の続きを書く検査ではない。バウムテストは「実のなる木を1本描く」描画による検査。いずれも認知機能検査・認知症の介護負担度の尺度・自己効力感の尺度ではない",
    "exam": "55-pm-81(誤答の組合せ: SCT―認知機能、P-Fスタディ―認知症介護負担度、Rorschach―自己効力感。正答は選択肢5で、内容は入力になし)",
    "q": [
     "55-pm-81"
    ],
    "note": "確認済み[S1][S2]。「認知機能・介護負担度・自己効力感ではない」は、人格検査であることからの整理(各検査の一次資料の記載そのものではない)",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://tk.seitoku-u.ac.jp/cms_tk_seitoku/wp-content/uploads/2024/12/%E8%81%96%E5%BE%B3%E5%A4%A7%E5%AD%A6%E5%85%AC%E8%AA%8D%E5%BF%83%E7%90%86%E5%B8%AB%E5%85%A5%E5%AD%A6%E8%AA%AC%E6%98%8E%E4%BC%9A%E6%A8%A1%E6%93%AC%E8%AC%9B%E7%BE%A9%E3%83%91%E3%83%BC%E3%82%BD%E3%83%8A%E3%83%AA%E3%83%86%E3%82%A3%E6%A4%9C%E6%9F%BB.pdf"
     },
     {
      "label": "S2",
      "url": "https://konan-wu.repo.nii.ac.jp/record/918/files/038-02.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
  "review": "ai"
 },
 {
  "slug": "seddon-classification",
  "name": "Seddon分類(末梢神経損傷)",
  "category": "診断基準・分類",
  "aliases": [
   "Seddon分類",
   "Seddon",
   "Sunderland分類",
   "neurapraxia",
   "ニューラプラキシア",
   "axonotmesis",
   "アクソノトメーシス",
   "neurotmesis",
   "ニューロトメーシス",
   "末梢神経損傷",
   "Waller変性",
   "ワーラー変性",
   "Wallerian degeneration"
  ],
  "rows": [
   {
    "item": "neurapraxia(ニューラプラキシア)",
    "target": "最も軽い末梢神経損傷",
    "value": "髄鞘の障害(局所の脱髄・虚血)による一過性の伝導ブロック。軸索の連続性は保たれ、Waller変性は起こらない。損傷部で伝導が途絶え、末梢側の伝導は正常。外科的処置なしで、髄鞘の回復とともに数週〜数か月(約12週以内の報告)で完全に回復する。Tinel徴候は出ない",
    "exam": "52-pm-35(最も予後良好=ニューラプラキシアが正答)",
    "q": [
     "52-pm-35"
    ],
    "note": "確認済み[S1][S2]。回復期間は資料により『数時間〜数か月』『12週以内』と幅がある",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC8571504/"
     },
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4045362/"
     }
    ]
   },
   {
    "item": "axonotmesis(アクソノトメーシス)",
    "target": "軸索損傷(結合組織は残る)",
    "value": "軸索と髄鞘が断裂するが、神経周膜・上膜など外側の結合組織は保たれる。損傷部より遠位でWaller変性が起こる。近位の軸索が再生して標的に達すれば回復しうる。自然回復はneurapraxiaより遅い(Sunderland II〜IVにまたがり、III・IVでは手術を要することがある)",
    "exam": "52-pm-35(誤答選択肢=アクソノトメーシス、Waller変性)",
    "q": [
     "52-pm-35"
    ],
    "note": "確認済み[S1]。Waller変性は損傷後に遠位の神経で起こる変化で、neurapraxiaでは起こらない。『神経根引き抜き損傷』は資料で分類を確認していない",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC8571504/"
     }
    ]
   },
   {
    "item": "neurotmesis(ニューロトメーシス)",
    "target": "最重症(完全断裂)",
    "value": "軸索とすべての結合組織が完全に断裂した状態。自然回復は期待できず、手術(修復)が必要。放置すると機能しない神経腫ができうる",
    "exam": "52-pm-35(誤答選択肢=ニューロトメーシス)",
    "q": [
     "52-pm-35"
    ],
    "note": "確認済み[S1][S2]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC8571504/"
     },
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4045362/"
     }
    ]
   },
   {
    "item": "Seddon分類とSunderland分類の対応",
    "target": "障害の深さと回復の見込み",
    "value": "neurapraxia=Sunderland I(髄鞘のみ、自然回復あり)／axonotmesis=II(軸索まで、遅れて回復)・III(神経内膜まで、回復は不確実で手術を要することも)・IV(神経周膜まで、自然回復は非常に難しく手術が必要)／neurotmesis=V(上膜まで全断裂、手術が必要)",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。Seddon分類は1943年に提唱された3区分",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC8571504/"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
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
  "slug": "silfverskiold-test",
  "name": "Silfverskiöld試験(二関節筋の短縮判定)",
  "category": "検査法・徴候",
  "aliases": [
   "Silfverskiold",
   "Silfverskiöld test",
   "Silfverskiold test",
   "シルファースキョルド",
   "シルフェルスキョルド",
   "二関節筋",
   "腓腹筋の短縮",
   "ヒラメ筋の短縮",
   "足背屈可動域",
   "足関節背屈可動域",
   "膝屈曲位",
   "膝伸展位"
  ],
  "rows": [
   {
    "item": "Silfverskiöld試験の考え方",
    "target": "足関節の背屈制限が、腓腹筋(二関節筋)だけの短縮か、それ以外(ヒラメ筋・関節包・骨性など)かの区別",
    "value": "膝を伸ばした位置と曲げた位置で他動背屈を比べる。膝屈曲位で背屈が大きく改善すれば、腓腹筋(膝をまたぐ二関節筋)だけの短縮(陽性)。膝を曲げても伸ばしても制限が変わらなければ、ヒラメ筋・関節包・骨性などを含む下腿〜足関節全体の制限を考える。",
    "exam": "49-pm-7(片麻痺の足背屈の他動・自動可動域を、膝屈曲位と伸展位で測った表の解釈。表: 屈曲位 他動20°/自動20°、伸展位 他動10°(疼痛あり)/自動5°。正答=分離運動の障害がある。誤答=ヒラメ筋の短縮・足の靱帯の疼痛・腓腹筋の収縮時痛・前脛骨筋MMT2未満)",
    "q": [
     "49-pm-7"
    ],
    "note": "確認済み[S2]。表では他動背屈が屈曲位20°から伸展位10°に下がり、屈曲位の方が大きいので、腓腹筋の関与を示す形(ヒラメ筋の短縮は選べない)。「分離運動の障害」の判断(伸展位で自動が他動より小さい)は問題の解答にもとづく整理で、資料の本文では確認できていない。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11558460/"
     }
    ]
   },
   {
    "item": "足関節背屈の参考可動域と測定肢位",
    "target": "関節可動域測定での足背屈",
    "value": "参考可動域は0〜20°。測定は膝関節を屈曲位で行う(腓腹筋をゆるめて測る)。",
    "exam": "49-pm-7(膝屈曲位の他動20°は参考可動域内に当たる)",
    "q": [
     "49-pm-7"
    ],
    "note": "確認済み[S1]。日本リハビリテーション医学会・日本整形外科学会・日本足の外科学会の「関節可動域表示ならびに測定法(2022年4月改訂)」。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jarm.or.jp/member/document/kadou/03.pdf"
     }
    ]
   },
   {
    "item": "陽性の基準(差の大きさ)",
    "target": "腓腹筋短縮と判定する閾値",
    "value": "文献により基準が分かれる。膝屈曲位と伸展位の背屈角の差10°を基準にする立場と、膝伸展位で中間位(0°)を超えて背屈できないことを基準にする立場がある。陽性の厳密な閾値は一致していない。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S3]。原著は、自分たちの研究では陽性の基準を決められないと述べている。",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6996460/"
     }
    ]
   },
   {
    "item": "脳卒中の痙縮への使い方の注意",
    "target": "片麻痺の尖足で腓腹筋とヒラメ筋のどちらが過活動かを見分ける用途",
    "value": "原法は、腓腹筋だけの拘縮かそれ以外かを区別するもの。「膝屈曲で背屈が増える=腓腹筋、変わらない=ヒラメ筋」と痙縮の筋の見分けに使う臨床家もいるが、脳卒中成人で神経ブロックと比べた研究では、この使い方は有効と支持されなかった。",
    "exam": "49-pm-7(脳卒中片麻痺の背屈可動域の表の解釈)",
    "q": [
     "49-pm-7"
    ],
    "note": "確認済み[S2]。後ろ向き観察研究1件(2024)の結果で、断定はできない。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11558460/"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
  "review": "ai"
 },
 {
  "slug": "sins-spine-tumor",
  "name": "転移性脊椎腫瘍の安定性スコア(SINS)",
  "category": "診断基準・分類",
  "aliases": [
   "SINS",
   "Spinal Instability Neoplastic Score",
   "転移性脊椎腫瘍",
   "脊椎腫瘍の安定性",
   "脊椎の不安定性"
  ],
  "rows": [
   {
    "item": "SINS 部位点(固定・半固定・可動・移行部)",
    "target": "腫瘍のある脊椎部位による不安定性への寄与",
    "value": "移行部(後頭骨〜C2、C7〜T2、T11〜L1、L5〜S1)=3点／可動部(C3〜C6、L2〜L4)=2点／半固定(T3〜T10)=1点／固定(S2〜S5)=0点",
    "exam": "61-pm-93(最も安定性が高い部位=S2〜S5が正答／誤答=C7〜T2・T11〜L1・L5・S1〈いずれも移行部3点〉、L2・L3〈可動部2点〉)",
    "q": [
     "61-pm-93"
    ],
    "note": "確認済み[S1]。原著(Fisher 2010)の表を引用した文献で確認。原著そのものは未開封",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5721994"
     }
    ]
   },
   {
    "item": "SINS 合計点と判定",
    "target": "転移性脊椎腫瘍の安定性の判定",
    "value": "合計0〜18点。0〜6=安定／7〜12=不確定(不安定の可能性)／13〜18=不安定。7点以上では外科的コンサルトが推奨される",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。同文献の表では安定を『1-6』と書くが、本文は0〜6",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5721994"
     }
    ]
   },
   {
    "item": "SINS の6項目",
    "target": "スコアの構成",
    "value": "(1)病変の部位、(2)疼痛の性状、(3)骨病変の型、(4)X線での脊柱アライメント、(5)椎体破壊の程度、(6)後側方要素(椎弓根・椎間関節など)の浸潤。各点数を合計する。2010年に Spine Oncology Study Group が提唱",
    "exam": "出題は直接なし(参考。61-pm-93は(1)の部位点を問う)",
    "q": [],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5721994"
     }
    ]
   },
   {
    "item": "SINS その他の項目の点数",
    "target": "疼痛・骨病変・アライメント・椎体破壊・後側方要素",
    "value": "メカニカルな痛み=あり3/なし(他の痛み)2/無痛の病変1／骨病変=溶骨性2・混合性1・造骨性0／アライメント=亜脱臼・すべり4、変形(後弯・側弯)2、正常0／椎体圧潰=50%超3、50%未満2、圧潰なしで椎体の50%超に浸潤1／後側方要素=両側3、片側1",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。二次資料の表の間で疼痛・後側方要素の点数表記に差がある報告があり、原著での最終確認が望ましい",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5721994"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
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
  "slug": "sleep-diary",
  "name": "睡眠日誌(睡眠表)と概日リズム睡眠・覚醒障害",
  "category": "検査法・徴候",
  "aliases": [
   "睡眠日誌",
   "睡眠表",
   "睡眠記録",
   "睡眠相後退症候群",
   "睡眠相後退",
   "睡眠・覚醒障害",
   "概日リズム睡眠",
   "睡眠相前進症候群",
   "睡眠相前進",
   "不規則型睡眠・覚醒リズム",
   "非24時間睡眠・覚醒リズム",
   "DSWPD",
   "DSPS",
   "アクチグラフィ",
   "アクチグラフィー",
   "体内時計"
  ],
  "rows": [
   {
    "item": "睡眠相後退症候群(DSWPD)で睡眠日誌が有用な理由",
    "target": "概日リズム睡眠・覚醒障害の診断",
    "value": "診断基準の一つに「睡眠日誌(可能ならアクチグラフィ併用)」がある。日誌で、習慣的な睡眠時間帯が社会的に望ましい時刻より遅れている(通常2時間超)ことを確かめる。入眠は午前1〜6時ごろまで遅れ、起床は午前遅くから午後になりやすい。自由に眠れる日は、睡眠の質・量が保たれたまま後退した位相を保つ。",
    "exam": "57-am-98(正答:睡眠日誌の記載が最も有用なのは睡眠相後退症候群。他の選択肢:原発性不眠症、ナルコレプシー、レム睡眠行動障害、閉塞性睡眠時無呼吸)",
    "q": [
     "57-am-98"
    ],
    "note": "確認済み[S1](AASM「ICSD-3-TR」概日リズム睡眠・覚醒障害の章の草稿)。他の選択肢の疾患で日誌がどう役立つかは、確認できた資料がないため載せていない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://aasm.org/wp-content/uploads/2022/05/ICSD-3-TR-CRSWD-Draft.pdf"
     }
    ]
   },
   {
    "item": "睡眠日誌をつける期間",
    "target": "概日リズム睡眠・覚醒障害の評価",
    "value": "睡眠日誌とアクチグラフィは、少なくとも7日間、できれば14日間行う。勤務・登校日と休日の両方を含める。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1](ICSD-3-TR草稿。最終版の文言は未確認)。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://aasm.org/wp-content/uploads/2022/05/ICSD-3-TR-CRSWD-Draft.pdf"
     }
    ]
   },
   {
    "item": "睡眠相後退症候群の臨床像と治療",
    "target": "睡眠相後退症候群",
    "value": "社会的に望ましい時刻に寝つき・目覚めることが慢性的に難しい。多くは午前3〜6時ごろにならないと寝つけず、重要な予定があっても起きられない。思春期〜青年期に多い。治療は、朝の高照度光療法または夜のメラトニン投与で体内時計を前進させる。",
    "exam": "57-am-98(睡眠日誌が有用な疾患として問われた)",
    "q": [
     "57-am-98"
    ],
    "note": "確認済み[S2](厚生労働省 e-ヘルスネット)。診断のしかたの記載は[S2]にはなく、[S1]で確認。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://kennet.mhlw.go.jp/information/information/dictionary/heart/yk-028.html"
     }
    ]
   },
   {
    "item": "睡眠相前進症候群(ASWPD)",
    "target": "概日リズム睡眠・覚醒障害",
    "value": "夕方に強い眠気が出て、早朝に目が覚める。高齢者に多い。睡眠日誌では、習慣的な睡眠時間帯が一定して前にずれていることを確かめる(日誌は7日以上、できれば14日)。治療は、入眠前の高照度光療法(位相を後退させる)。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1][S2]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://aasm.org/wp-content/uploads/2022/05/ICSD-3-TR-CRSWD-Draft.pdf"
     },
     {
      "label": "S2",
      "url": "https://kennet.mhlw.go.jp/information/information/dictionary/heart/yk-028.html"
     }
    ]
   },
   {
    "item": "不規則型睡眠・覚醒リズム障害",
    "target": "概日リズム睡眠・覚醒障害",
    "value": "睡眠日誌・アクチグラフィで、主となる睡眠時間帯がなく、24時間に少なくとも3回の不規則な睡眠が現れる(1回2〜4時間ほどが多く、日によって変わる)。7日以上、できれば14日の記録で見分ける。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1](ICSD-3-TR草稿)。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://aasm.org/wp-content/uploads/2022/05/ICSD-3-TR-CRSWD-Draft.pdf"
     }
    ]
   },
   {
    "item": "非24時間睡眠・覚醒リズム障害と交代勤務障害",
    "target": "概日リズム睡眠・覚醒障害",
    "value": "非24時間型:睡眠・覚醒と体内時計の位相が安定せず、入眠・起床が毎日遅れていく。記録は少なくとも14日(視覚障害者ではそれ以上が望ましい)。交代勤務障害:勤務スケジュールと睡眠時間帯が重なる不眠・過度の眠気。睡眠日誌は少なくとも14日(勤務日と休日)。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1](ICSD-3-TR草稿)。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://aasm.org/wp-content/uploads/2022/05/ICSD-3-TR-CRSWD-Draft.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
  "review": "ai"
 },
 {
  "slug": "spine-provocation-tests",
  "name": "脊椎の誘発テスト(Spurling・Jackson・Kemp・FNST)",
  "category": "検査法・徴候",
  "aliases": [
   "Spurlingテスト",
   "スパーリングテスト",
   "Jacksonテスト",
   "ジャクソンテスト",
   "Kempテスト",
   "ケンプテスト",
   "FNST",
   "大腿神経伸展テスト",
   "椎間孔圧迫試験",
   "椎間孔圧迫テスト",
   "Femoral nerve stretch test"
  ],
  "rows": [
   {
    "item": "Spurlingテスト(椎間孔圧迫試験)",
    "target": "頚椎症性神経根症・頸椎椎間板ヘルニア",
    "value": "頸椎を少し後屈させた状態で側屈させる。頚椎症性神経根症では患側へ側屈させると椎間孔の狭窄が増強し、患側上肢へ放散痛が出れば陽性。",
    "exam": "51-pm-32(「頸椎の椎間孔圧迫試験はどれか」の正答=Spurlingテスト。誤答=Adson・Allen・Morley・Wright)",
    "q": [
     "51-pm-32"
    ],
    "note": "確認済み[S1]。国試では「椎間孔圧迫試験」と呼ばれるテストがSpurlingテストに当たる(資料では「椎間孔狭窄が増強する」と記載)。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://hama-med.repo.nii.ac.jp/record/2000311/files/%E9%96%A2%E7%AF%80%E5%A4%96%E7%A7%91-41-17.pdf"
     }
    ]
   },
   {
    "item": "Jacksonテスト",
    "target": "頚椎椎間板ヘルニア・頚椎症性神経根症",
    "value": "頸椎を後屈して軸圧(頭部への圧迫)をかける。上肢への放散痛が見られれば陽性。",
    "exam": "出題は直接なし(参考。Spurlingテストと対比される)",
    "q": [],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://hama-med.repo.nii.ac.jp/record/2000311/files/%E9%96%A2%E7%AF%80%E5%A4%96%E7%A7%91-41-17.pdf"
     }
    ]
   },
   {
    "item": "Kempテスト",
    "target": "腰部脊柱管狭窄症・腰椎椎間孔狭窄",
    "value": "立位で肩幅に足を開き、体をやや後方に反らしたまま側屈させる。臀部や下肢への放散痛があれば、同側の腰椎椎間孔狭窄を疑う。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://hama-med.repo.nii.ac.jp/record/2000311/files/%E9%96%A2%E7%AF%80%E5%A4%96%E7%A7%91-41-17.pdf"
     }
    ]
   },
   {
    "item": "大腿神経伸展テスト(FNST)",
    "target": "L3・L4神経根障害(腰部脊柱管狭窄症・椎間板ヘルニア)",
    "value": "腹臥位で下肢を挙上して股関節を伸展させる。大腿前面(大腿神経領域)への放散痛が出れば陽性。",
    "exam": "出題は直接なし(参考。SLRはL5・S1、FNSTはL3・L4)",
    "q": [],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://hama-med.repo.nii.ac.jp/record/2000311/files/%E9%96%A2%E7%AF%80%E5%A4%96%E7%A7%91-41-17.pdf"
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
  "slug": "spurling-jackson-test",
  "name": "Spurlingテスト・Jacksonテスト(頸椎の神経根症状の誘発)",
  "category": "検査法・徴候",
  "aliases": [
   "スパーリング",
   "頸椎椎間孔圧迫試験",
   "頚椎椎間孔圧迫試験",
   "Maximum Cervical Compression",
   "頸椎症性神経根症",
   "頚椎症性神経根症",
   "頸部神経根症"
  ],
  "rows": [
   {
    "item": "Spurlingテスト(Maximum Cervical Compression)",
    "target": "頸椎症性神経根症など、頸部神経根の圧迫",
    "value": "座位の患者の後ろに立ち、頸椎を側屈・伸展・同側へ回旋させ、少しずつ上から軸圧を加える。陽性=上肢の痛み・しびれ・感覚異常の再現(神経根症候群を示唆)。頸部痛だけが出る場合は局所の頸椎病変を示唆",
    "exam": "55-pm-32(Spurlingテスト陽性で疑う疾患=頸椎症性神経根症・正答。誤答=環軸関節回旋位固定・腰椎椎間板ヘルニア・腰椎分離症・腰部脊柱管狭窄症)／51-pm-32(頸椎の椎間孔圧迫試験=Spurling・正答。選択肢Adson・Allen・Morley・Wright)／58-am-33(腱板損傷の検査として誤答選択肢)",
    "q": [
     "55-pm-32",
     "51-pm-32",
     "58-am-33"
    ],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.uws.edu/wp-content/uploads/2026/06/Cervical-Orthopedic-Tests.pdf"
     }
    ]
   },
   {
    "item": "Spurlingテストの精度と使い方",
    "target": "診断での位置づけ",
    "value": "特異度は高く、感度は中等度とされる(系統的レビューの要約)。検者間信頼性は中〜低。他の検査(頸椎牽引テストなど)と組み合わせて判断する",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。日本語の解説でも、痛みの再現・増強があれば神経根圧迫の診断を確定しやすいと述べられている[S2]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.uws.edu/wp-content/uploads/2026/06/Cervical-Orthopedic-Tests.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.jstage.jst.go.jp/article/jjsop/47/2/47_11/_article/-char/ja"
     }
    ]
   },
   {
    "item": "Jacksonテスト(頸椎圧迫テスト)",
    "target": "頸椎の神経根刺激・椎間関節病変",
    "value": "座位で、頭部に上から垂直に圧迫を加える。陽性=上肢への放散痛・しびれ(神経根の圧迫を示唆)、または局所の頸部痛(椎間関節・筋の病変を示唆)。Spurlingより特異性は低いとされる",
    "exam": "58-am-33(腱板損傷の検査として誤答選択肢。腱板損傷の検査ではない)",
    "q": [
     "58-am-33"
    ],
    "note": "出典[S1]は引用元の記載がない解説ページ。頭位(中間位か後屈か)の記載は資料で分かれるため、手技の細部は教科書で再確認が必要。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://physioassessment.vercel.app/test/jackson-compression-test"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
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
  "slug": "stroop-test",
  "name": "Stroop test(ストループテスト)",
  "category": "評価尺度",
  "aliases": [
   "Stroop test",
   "Stroop",
   "ストループテスト",
   "ストループ検査",
   "ストループ課題",
   "ストループ効果",
   "ストループ干渉",
   "新ストループ検査"
  ],
  "rows": [
   {
    "item": "Stroop testとは(何をみる検査か)",
    "target": "認知的干渉を抑える能力(抑制・実行機能)",
    "value": "色の名前を表す単語を、単語の意味と異なる色のインクで印刷し、「単語を読む」のではなく「インクの色を答える」よう求める。自動化している「読む」反応を抑えて、慣れていない「色を答える」を行う必要があり、不一致の条件で遅れや誤りが生じる。これをStroop効果(ストループ干渉)という",
    "exam": "55-pm-8(誤答選択肢: 「1から25までの数字を順に線でつなぐ時間を測る」検査はTMT-Aが正答。Stroop testは選択肢の一つ)／59-pm-19(誤答選択肢: 右を向き左からの声かけに反応が遅い左片麻痺患者で優先度が高いのはBIT。Stroop testは選択肢の一つ)／50-pm-80(誤答選択肢: 「図に示す課題を用いる」検査の正答はRey-Osterrieth複雑図形検査。Stroop testは選択肢の一つ。図は未確認)",
    "q": [
     "50-pm-80",
     "55-pm-8",
     "59-pm-19"
    ],
    "note": "確認済み[S1]。今回の記録では、Stroop testが正答になる問題は入力になし(いずれも誤答選択肢)",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5388755/"
     }
    ]
   },
   {
    "item": "課題の構成(3つの条件)",
    "target": "最も一般的な版の手順",
    "value": "3つの表を、できるだけ速く答える。①色名の単語を黒インクで印刷した表(単語を読む) ②色のパッチの色名を答える表(色の呼称) ③色名の単語を、単語と異なる色のインクで印刷した表(インクの色を答える。色-単語条件)。③が不一致(干渉)条件",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。これは原法(Stroop 1935)に基づく最も一般的な版の説明。日本で用いられる版(新ストループ検査など)の手順は確認していない",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5388755/"
     }
    ]
   },
   {
    "item": "何を反映するか(前頭葉・実行機能)",
    "target": "障害との関係",
    "value": "成績は注意・集中だけでは説明されず、反応を抑える実行機能(前頭葉領域)に強く関わるとされる。不一致条件で、前頭葉に病変のある患者やパーキンソン病の患者に、速度ではなく正確さの低下が報告されている",
    "exam": "出題は直接なし(参考)。59-pm-19のように「注意障害」の場面でも選択肢に出るが、半側空間無視を疑う場面ではBITが優先",
    "q": [],
    "note": "確認済み[S1]。確認できたのは資料の記述(注意・集中だけでなく実行機能も反映)まで。国試・教科書で「注意の検査」「前頭葉機能検査」のどちらに分類されるかは確認していない",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5388755/"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
  "review": "ai"
 },
 {
  "slug": "strumpell-sign",
  "name": "Strümpell現象(脛骨筋現象)",
  "category": "検査法・徴候",
  "aliases": [
   "Strümpell現象",
   "Strumpell現象",
   "Strümpell",
   "Strumpell",
   "ストリュンペル現象",
   "ストリュンペル",
   "シュトリュンペル現象",
   "シュトリュンペル",
   "脛骨筋現象",
   "脛骨筋徴候",
   "脛骨現象",
   "tibialis sign",
   "tibialis phenomenon"
  ],
  "rows": [
   {
    "item": "Strümpell現象の誘発と反応",
    "target": "錐体路障害(片麻痺)でみられる下肢の連合反応",
    "value": "麻痺側の股関節と膝関節を随意的に曲げると、足関節が不随意に背屈し、内反する(母趾や全趾の背屈を伴うこともある)。抵抗をかけて動かすと強まる。正常では、股・膝を強く曲げると足は底屈する",
    "exam": "52-pm-48(正答: 足関節背屈。端座位で一側の股関節屈曲に抵抗をかけたとき。誤答: 股関節外旋・膝関節屈曲・膝関節伸展・足関節底屈)",
    "q": [
     "52-pm-48"
    ],
    "note": "確認済み[S1]。設問は股関節屈曲に抵抗をかける形で、資料の「股・膝の屈曲」とは動かす関節の書き方が少し違うが、反応(足関節背屈)は一致",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://neupsykey.com/associated-movements-4/"
     },
     {
      "label": "S3",
      "url": "https://kotobank.jp/word/%E3%82%B7%E3%83%A5%E3%83%88%E3%83%AA%E3%83%A5%E3%83%B3%E3%83%9A%E3%83%AB%E7%8F%BE%E8%B1%A1-789105"
     }
    ]
   },
   {
    "item": "資料による記述の違い",
    "target": "反応の書き方",
    "value": "反応の書き方は資料で異なる。教科書の章: 足関節の背屈と内反(母趾・全趾の背屈を伴うことも)。辞典: 伸ばした下肢を抵抗に逆らって曲げると足が背屈・内転。歴史的論文の紹介: 膝を曲げると母趾の背屈と足の回外。いずれも足(足関節)の背屈が中心",
    "exam": "出題は背屈のみ(52-pm-48)。内反・内転・回外を問う出題の記録はなし",
    "q": [
     "52-pm-48"
    ],
    "note": "確認済み[S1][S2][S3]。学習用には「股・膝の屈曲に伴う足関節背屈」を基本に覚え、内反・内転・回外は資料で表現が違うと理解しておく",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://neupsykey.com/associated-movements-4/"
     },
     {
      "label": "S2",
      "url": "https://karger.com/article/FullText/329270"
     },
     {
      "label": "S3",
      "url": "https://kotobank.jp/word/%E3%82%B7%E3%83%A5%E3%83%88%E3%83%AA%E3%83%A5%E3%83%B3%E3%83%9A%E3%83%AB%E7%8F%BE%E8%B1%A1-789105"
     }
    ]
   },
   {
    "item": "徴候の意味",
    "target": "何を示すか",
    "value": "錐体路(皮質脊髄路)の障害による下肢の麻痺を示す徴候。Strümpellが1901年の論文で詳しく記載し、現在はStrümpell's signとも呼ばれる。同じ論文でStrümpellは、錐体路障害による抑制の欠如から起こる筋の共同現象として、上肢の回内現象(pronation phenomenon)も論じた",
    "exam": "出題は直接なし(参考)。52-pm-48は、この現象が出現したことを歩行動作の練習に役立てる、という場面",
    "q": [],
    "note": "確認済み[S1][S2]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://neupsykey.com/associated-movements-4/"
     },
     {
      "label": "S2",
      "url": "https://karger.com/article/FullText/329270"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
  "review": "ai"
 },
 {
  "slug": "study-design-observational",
  "name": "研究デザイン(観察研究・コホート研究・ケースコントロール研究)",
  "category": "診断基準・分類",
  "aliases": [
   "コホート研究",
   "ケースコントロール研究",
   "ケース・コントロール研究",
   "症例対照研究",
   "観察研究",
   "観察的研究",
   "介入研究",
   "横断研究",
   "前向きコホート",
   "リコールバイアス",
   "選択バイアス",
   "無作為化比較試験",
   "ランダム化比較試験",
   "メタアナリシス",
   "システマティックレビュー",
   "RCT"
  ],
  "rows": [
   {
    "item": "観察研究と介入研究の区別",
    "target": "研究者が曝露・治療に手を加えるか(介入)、加えず観察するか(観察)",
    "value": "介入=研究目的で、人の健康に関する事象に影響を与える要因(予防・診断・治療のための投薬・検査等を含む)の有無や程度を制御する行為。観察研究=介入を行わない研究。コホート研究・ケースコントロール研究は、曝露が本人の意思や自然な状況で決まり、実験的な介入でない観察研究に当たる。",
    "exam": "58-am-23: 観察的研究を研究デザインとするものを2つ選ぶ。正答=コホート研究・ケースコントロール研究。誤答=メタアナリシス・無作為化比較対照試験・システマティックレビュー。51-am-49: 介入研究に該当するのは「2群に分けた治療の前向き比較」(正答)。観察研究(誤答)=特定集団での継続的な治療の観察/通常行われている治療の効果判定/複数データによる横断的比較/過去の治療成績間の比較。",
    "q": [
     "58-am-23",
     "51-am-49"
    ],
    "note": "確認済み[S1][S2]。指針本文には「観察研究」の定義文はなく「介入を行わない」研究という扱い。メタアナリシス・システマティックレビューの位置づけは今回の資料では確認できていない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.mhlw.go.jp/web/t_doc?dataId=00012250"
     },
     {
      "label": "S2",
      "url": "https://www.icrweb.jp/mod/resource/view.php?id=30"
     }
    ]
   },
   {
    "item": "コホート研究",
    "target": "曝露(原因)の有無で群を作り、その後の発症(結果)を追跡する",
    "value": "観察の方向=原因→結果(前向き)。曝露を先に測定し、その後の疾病の発生を追う。利点=観察の時間的順序と因果の順序が同じ(思い出しバイアスを避けられる)、いろいろな疾病を調べられる。欠点=まれな疾病に不向き、費用と時間がかかる(10年以上の追跡など)。",
    "exam": "52-am-23: 喫煙群と非喫煙群に分け、将来の脳血管障害の発生を追跡する研究 → コホート研究(正答)。誤答=横断研究・記述的研究・症例対照研究・無作為化比較試験。",
    "q": [
     "52-am-23"
    ],
    "note": "確認済み[S2]。喫煙は本人の習慣で決まっており、研究者が割り付けていないので観察研究(RCTではない)。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.icrweb.jp/mod/resource/view.php?id=30"
     }
    ]
   },
   {
    "item": "ケース・コントロール研究(症例対照研究)",
    "target": "疾患のある人(ケース)とない人(コントロール)を集め、過去の曝露を比べる",
    "value": "観察の方向=結果→原因(後ろ向き)。曝露情報は発症後に得るためリコールバイアスの影響を受ける。ケースとコントロールで母集団が異なることが多く、選択(セレクション)バイアスが問題。対象疾患は1つ。まれな疾患に有利、短期間・低費用で行える。",
    "exam": "52-am-23: 誤答選択肢「症例対照研究」(正答はコホート研究)。58-am-23: 観察研究として正答の1つ。",
    "q": [
     "52-am-23",
     "58-am-23"
    ],
    "note": "確認済み[S2]。コホート研究の中でケース・コントロール研究を行う「ネステッド・ケース・コントロール研究」という設計もある。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.icrweb.jp/mod/resource/view.php?id=30"
     }
    ]
   },
   {
    "item": "観察研究の限界とエビデンスレベル",
    "target": "コホート研究・ケースコントロール研究と、無作為化比較試験の位置づけ",
    "value": "コホート研究はケース・コントロール研究よりエビデンスレベルが上。ただし曝露は本人の意思で、実験的介入ではないため、統計解析で他の要因(交絡)を完全にコントロールすることはできず、これは観察研究の限界。エビデンスレベルは無作為化比較試験より下。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S2]。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.icrweb.jp/mod/resource/view.php?id=30"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
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
  "slug": "thomsen-chair-test",
  "name": "Thomsenテスト・Chairテスト(上腕骨外側上顆炎)",
  "category": "検査法・徴候",
  "aliases": [
   "Thomsen",
   "Thomsenテスト",
   "トムゼンテスト",
   "Chair",
   "Chairテスト",
   "Chair test",
   "チェアテスト",
   "上腕骨外側上顆炎",
   "テニス肘",
   "抵抗下手関節背屈テスト",
   "中指伸展テスト"
  ],
  "rows": [
   {
    "item": "Thomsenテスト(抵抗下手関節背屈テスト)",
    "target": "上腕骨外側上顆炎(テニス肘)",
    "value": "手関節を抵抗に逆らって背屈させ、肘の外側に痛みが出るかを見る。診療ガイドラインでは「いわゆるThomsenテスト」。診断基準の一つ(②抵抗下手関節背屈運動で肘外側に疼痛)。報告された陽性率は77〜100%(上顆炎と診断された患者での陽性率)。肘伸展位・前腕回内位で行うと陽性率が高い報告がある",
    "exam": "55-pm-86(肩腱板断裂で陽性となる検査として誤答選択肢)／58-am-33(腱板損傷の検査として誤答選択肢)／58-am-37(胸郭出口症候群で陽性となる検査として誤答選択肢)／60-pm-27(腰椎椎間板ヘルニアの疼痛誘発テストとして誤答選択肢)。いずれもThomsenは肘外側の腱付着部の検査で、正答は別の検査",
    "q": [
     "55-pm-86",
     "58-am-33",
     "58-am-37",
     "60-pm-27"
    ],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://minds.jcqhc.or.jp/common/summary/pdf/c00521.pdf"
     }
    ]
   },
   {
    "item": "上腕骨外側上顆炎の診断基準",
    "target": "診断",
    "value": "①外側上顆の伸筋群起始部に最も強い圧痛 ②抵抗下手関節背屈運動で肘外側に疼痛 ③腕橈関節の障害など伸筋群起始部以外の障害は除外",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。身体所見では短橈側手根伸筋腱の圧痛・中指伸展テスト・握力低下も重要とされる。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://minds.jcqhc.or.jp/common/summary/pdf/c00521.pdf"
     }
    ]
   },
   {
    "item": "Chairテスト(椅子持ち上げテスト)",
    "target": "上腕骨外側上顆炎",
    "value": "背もたれの高い軽い椅子の前に立ち、患側の肘を伸ばして手関節を曲げ、親指・人差し指・中指で背もたれをつかんで、腕を伸ばしたまま持ち上げる。肘外側の痛みや圧痛が出れば疑う",
    "exam": "58-am-33(誤答選択肢。腱板損傷の検査ではない)",
    "q": [
     "58-am-33"
    ],
    "note": "確認済み[S2]。自分で行う簡易テストとして紹介された手順。陽性の細かい基準は資料に明記なし。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.healthline.com/health/tennis-elbow-test"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "thoracic-outlet-tests",
  "name": "胸郭出口症候群の誘発テスト(Adson・Wright・Roos・Eden・Morley)",
  "category": "検査法・徴候",
  "aliases": [
   "Adsonテスト",
   "アドソンテスト",
   "Wrightテスト",
   "ライトテスト",
   "Roosテスト",
   "ルーステスト",
   "Edenテスト",
   "エデンテスト",
   "Morleyテスト",
   "モーレーテスト",
   "モーリーテスト",
   "胸郭出口症候群",
   "3分間テスト",
   "過外転テスト"
  ],
  "rows": [
   {
    "item": "Adsonテスト",
    "target": "胸郭出口症候群(斜角筋部での鎖骨下動脈の圧迫)",
    "value": "座位で患側に顔を向けて首を反らせ(頸部伸展・患側へ回旋)、深呼吸させる。鎖骨下動脈が圧迫され、橈骨動脈の脈が弱くなる、または触れなくなれば陽性。",
    "exam": "51-pm-32(頸椎の椎間孔圧迫試験を選ぶ問題。Adsonは誤答。正答はSpurling)／54-am-33(上腕二頭筋腱炎で陽性となる検査。Adsonは誤答。正答はYergason)／60-pm-27(腰椎椎間板ヘルニアの疼痛誘発テスト。Adsonは誤答。正答はBragard)",
    "q": [
     "51-pm-32",
     "54-am-33",
     "60-pm-27"
    ],
    "note": "確認済み[S1]。国試ではいずれも「胸郭出口症候群の検査」として誤答側に出る。日本の1982年の比較研究では、陽性率は低いが診断的価値があるとされた[S2]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.joa.or.jp/public/sick/condition/thoracic_outlet_syndrome.html"
     },
     {
      "label": "S2",
      "url": "https://www.jstage.jst.go.jp/article/nishiseisai1951/30/3/30_3_448/_article/-char/en"
     }
    ]
   },
   {
    "item": "Wrightテスト(過外転テスト)",
    "target": "胸郭出口症候群(肩の過外転での血管・神経の圧迫)",
    "value": "座位で両肩を90度外転・90度外旋、肘を90度屈曲させる。橈骨動脈の脈が弱くなる・触れなくなる、または手の血行が失われて白くなれば陽性。",
    "exam": "51-pm-32(選択肢の誤答の1つ)",
    "q": [
     "51-pm-32"
    ],
    "note": "確認済み[S1]。健常者の約半数がWright陽性という報告がある[S2]ため、陽性だけでは診断できない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.joa.or.jp/public/sick/condition/thoracic_outlet_syndrome.html"
     },
     {
      "label": "S2",
      "url": "https://www.jstage.jst.go.jp/article/nishiseisai1951/30/3/30_3_448/_article/-char/en"
     }
    ]
   },
   {
    "item": "Roosテスト(3分間テスト)",
    "target": "胸郭出口症候群",
    "value": "Wrightと同じ肢位(両肩90度外転・外旋、肘90度屈曲)で、両手の指を3分間屈伸させる。しびれや前腕のだるさで続けられず、途中で腕を降ろしてしまえば陽性。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。1982年の比較研究では、3分間テスト陽性とMorleyテストでの放散痛が診断価値が最も高いと考えられた[S2]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.joa.or.jp/public/sick/condition/thoracic_outlet_syndrome.html"
     },
     {
      "label": "S2",
      "url": "https://www.jstage.jst.go.jp/article/nishiseisai1951/30/3/30_3_448/_article/-char/en"
     }
    ]
   },
   {
    "item": "Edenテスト(肋鎖間圧迫テスト)",
    "target": "胸郭出口症候群(腕神経叢の絞扼による上肢のしびれ)",
    "value": "座位で胸を張らせ、両肩を後下方に引かせる(両手を後下方へ牽引)。橈骨動脈の脈が弱くなる、または触れなくなれば陽性。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1][S3]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.joa.or.jp/public/sick/condition/thoracic_outlet_syndrome.html"
     },
     {
      "label": "S3",
      "url": "https://hama-med.repo.nii.ac.jp/record/2000311/files/%E9%96%A2%E7%AF%80%E5%A4%96%E7%A7%91-41-17.pdf"
     }
    ]
   },
   {
    "item": "Morleyテスト(腕神経叢圧迫テスト)",
    "target": "胸郭出口症候群(腕神経叢の圧痛・放散痛)",
    "value": "両腕を体側に置いた姿勢で、検者が鎖骨上窩を30秒間圧迫する。痛みや典型的な知覚異常(放散痛・症状の再現)が出れば陽性。局所の圧痛だけでは陽性としない。",
    "exam": "51-pm-32(選択肢の誤答の1つ)",
    "q": [
     "51-pm-32"
    ],
    "note": "要注意[S4]: 手技は理学療法系の解説サイトの記載で、学会資料では確認できていない。放散痛が診断的に有用とされた点は日本の研究[S2]で確認。",
    "conflict": false,
    "sources": [
     {
      "label": "S4",
      "url": "https://www.physiotutors.com/ja/wiki/morley-test/"
     },
     {
      "label": "S2",
      "url": "https://www.jstage.jst.go.jp/article/nishiseisai1951/30/3/30_3_448/_article/-char/en"
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
  "slug": "tnm-classification",
  "name": "TNM分類(がんの病期分類)",
  "category": "診断基準・分類",
  "aliases": [
   "TNM分類",
   "TNM",
   "UICC",
   "癌取扱い規約",
   "がんの病期"
  ],
  "rows": [
   {
    "item": "TNM分類とは(T・N・M)",
    "target": "がんの進行度(ステージ)の分類",
    "value": "がんがどれだけ進んでいるか(ステージ・病期)で分類する方法。T=最初に発生したがん(原発巣)の大きさ・広がり(深達度)／N=リンパ節への転移と広がり／M=離れた臓器への転移の有無。この3要素を組み合わせて進み具合を評価する。治療方針を考える指標の1つ。",
    "exam": "61-pm-84(「TNM分類で誤っているのはどれか」。誤り=「臓器に特異的な分類である」。正しい=がんの病期分類である・腫瘍の大きさを含める・遠隔転移の有無を含める・リンパ行性転移の有無を含める)／59-am-20(周術期の「活動能力の評価方法」の誤答。正答=KPS)",
    "q": [
     "61-pm-84",
     "59-am-20"
    ],
    "note": "確認済み[S1]。TNM分類は活動能力(全身状態)ではなく、がんそのものの進行度を表す。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://ganjoho.jp/public/qa_links/dictionary/dic01/modal/TNM_bunrui.html"
     }
    ]
   },
   {
    "item": "国際基準(UICC)と日本の癌取扱い規約",
    "target": "分類の種類",
    "value": "国際的な指標として「UICC TNM分類」がある。日本では臓器別に各学会が作る「癌取扱い規約」にもTNM記号を使った分類があり、両者で記載が異なる臓器もある。",
    "exam": "61-pm-84(「臓器に特異的な分類である」が誤り)",
    "q": [
     "61-pm-84"
    ],
    "note": "確認済み[S1]。T・Nの具体的な区分は臓器ごとに定められる(例: 大腸がんでは壁深達度)。TNMは臓器をこえて使われる共通の枠組みで、国試はこれを「臓器に特異的」とした選択肢を誤りとしている。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://ganjoho.jp/public/qa_links/dictionary/dic01/modal/TNM_bunrui.html"
     }
    ]
   },
   {
    "item": "大腸がんでの例",
    "target": "ステージの決まり方の具体例",
    "value": "ステージは0〜4の5段階。壁深達度(T因子)・リンパ節転移(N因子)・遠隔転移(M因子)の3因子の組合せで決める。0=がんが粘膜内にとどまる／1=固有筋層までにとどまる／2=固有筋層を超えて浸潤／3=深さに関わらずリンパ節転移あり／4=深さやリンパ節転移に関わらず他臓器へ転移あり。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。国内の「大腸癌取扱い規約」に準じた解説で、国際的なTNM分類とは共通点が多い。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.ncc.go.jp/jp/ncch/clinic/colorectal_surgery/160/index.html"
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
  "slug": "transfemoral-prosthesis-gait-deviations",
  "name": "大腿義足の異常歩行と原因(vaulting・体幹側屈・膝の不安定性)",
  "category": "検査法・徴候",
  "aliases": [
   "義足の異常歩行",
   "義足歩行",
   "大腿義足",
   "vaulting",
   "ヴォールティング",
   "爪先立ち",
   "伸び上がり",
   "体幹の側屈",
   "義足側への側屈",
   "分回し",
   "外転歩行",
   "ソケット外壁",
   "ソケット初期屈曲角",
   "初期屈曲角",
   "ソケットの内転角度",
   "ソケット内転角",
   "義足長",
   "膝折れ",
   "義足の膝の不安定",
   "底屈制動",
   "義足足部"
  ],
  "rows": [
   {
    "item": "Vaulting(健側の爪先立ち・伸び上がり)",
    "target": "遊脚相の異常",
    "value": "義足側の原因:義足が長すぎる/膝の安定性(アライメント)が強すぎる/膝の摩擦が強く遊脚で曲がりにくい。切断者側の原因:股関節の外転拘縮、膝を曲げる自信のなさ(筋力低下・つまずきの恐れ)、習慣。",
    "exam": "56-am-32 正答=義足長が長すぎる(誤答:ソケット内転角度大・股外転筋力不足・股伸展筋力不足・ソケット初期屈曲角度不足)",
    "q": [
     "56-am-32"
    ],
    "note": "確認済み[S1]。英語の大腿義足の歩行異常一覧表(教育用)による。国試の設問は義足の種類・条件を限定していないので、学習の整理として扱い、教科書の記載と併せて確認すること。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.physicaltherapy.com/files/event/02600/02613/tfgaitdeviationscheatsheet.pdf"
     }
    ]
   },
   {
    "item": "体幹の側方傾斜(義足側への側屈)",
    "target": "立脚期の異常",
    "value": "義足側の原因:ソケット外側壁の形状が不適切で大腿骨の外側支持が不十分/義足が短すぎる/坐骨枝への圧を避ける/義足が外転位でアライメントされ歩隔が広い。切断者側の原因:バランス不良、中殿筋の筋力低下、断端の過敏・疼痛、断端が極端に短く骨盤のてこが不足、習慣。",
    "exam": "60-pm-41 正答=ソケット外壁の高さ不足・義足側股関節外転筋群の筋力低下(誤答:体重荷重線が足部内側・義足が長すぎる・ソケット初期内転角が大きすぎる)",
    "q": [
     "60-pm-41"
    ],
    "note": "確認済み[S1]。英語の大腿義足の歩行異常一覧表(教育用)による。国試の設問は義足の種類・条件を限定していないので、学習の整理として扱い、教科書の記載と併せて確認すること。 設問の「ソケット外壁の高さ不足」は、表の「外側壁の形状が不適切」に対応すると解釈した。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.physicaltherapy.com/files/event/02600/02613/tfgaitdeviationscheatsheet.pdf"
     }
    ]
   },
   {
    "item": "義足膝の不安定性(膝折れ)",
    "target": "立脚期の異常",
    "value": "義足側の原因:アライメントの安定性が不足/ソケットの初期屈曲が不足/足部の底屈抵抗(底屈バンパー・ヒールウェッジ)が強すぎて踵接地で膝が折れる/背屈の制限が不十分で膝制御が不完全。切断者側の原因:股関節伸展筋力の低下、強い股関節屈曲拘縮。",
    "exam": "51-pm-12 正答=義足足部の底屈制動が強すぎる(立脚初期の過度の膝屈曲。誤答:左股関節の伸展制限・toe-out角過大・ソケット初期屈曲角が小さすぎる・足部が前方すぎる)",
    "q": [
     "51-pm-12"
    ],
    "note": "確認済み[S1]。英語の大腿義足の歩行異常一覧表(教育用)による。国試の設問は義足の種類・条件を限定していないので、学習の整理として扱い、教科書の記載と併せて確認すること。 「ソケット初期屈曲の不足」も膝の不安定の原因として同じ表に挙がるが、51-pm-12では誤答選択肢に入っている点に注意(設問は立脚初期の過度の膝屈曲で、国試の正答は底屈制動の強さ)。",
    "conflict": true,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.physicaltherapy.com/files/event/02600/02613/tfgaitdeviationscheatsheet.pdf"
     }
    ]
   },
   {
    "item": "分回し歩行・外転歩行",
    "target": "遊脚期・立脚期の異常",
    "value": "分回し歩行の義足側の原因:義足が長すぎる/膝のアライメント安定性や摩擦が大きく遊脚で膝が曲がりにくい。外転歩行の義足側の原因:義足が長すぎる、外転を付けすぎ、内側壁の形状不良(坐骨枝圧を避けて義足を離す)、外側壁の支持不足、骨盤帯が体から離れすぎ。",
    "exam": "出題は直接なし(参考。大腿義足の異常歩行の類題)",
    "q": [],
    "note": "確認済み[S1]。英語の大腿義足の歩行異常一覧表(教育用)による。国試の設問は義足の種類・条件を限定していないので、学習の整理として扱い、教科書の記載と併せて確認すること。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.physicaltherapy.com/files/event/02600/02613/tfgaitdeviationscheatsheet.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "transtibial-prosthesis-alignment",
  "name": "下腿義足のソケットと角度設定(初期屈曲角・初期内転角)",
  "category": "検査法・徴候",
  "aliases": [
   "下腿義足",
   "下腿切断",
   "PTB式ソケット",
   "PTB式義足",
   "KBM式",
   "PTS式",
   "ソケットの初期屈曲角",
   "ソケットの初期内転角",
   "初期内転角",
   "初期屈曲角",
   "toe-out",
   "トウアウト",
   "ライナー式",
   "足部内側が浮"
  ],
  "rows": [
   {
    "item": "初期内転角の不足と足部内側の浮き",
    "target": "下腿義足の静的立位の観察(前額面)",
    "value": "静的立位で足部の内側が床から浮く異常は、前額面の角度設定の問題として考える。ソケットの初期内転角の不足がこれにあたる。初期屈曲角は矢状面、toe-out角は水平面の設定なので、前額面の浮きの原因にならない。",
    "exam": "56-am-39(正答:初期内転角が不足している。誤答:toe-out角が大きすぎる／初期屈曲角が不足／ソケット外壁が高すぎる／足部が外側に位置しすぎている)",
    "q": [
     "56-am-39"
    ],
    "note": "確認済み[S1](国試解説サイト。消去法による説明)。国試の正答と一致。公的資料では原因との対応を確認できなかった。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://nazenani-sougu.com/kokushi/pt56-am39/"
     }
    ]
   },
   {
    "item": "初期屈曲角と立脚後期の膝折れ",
    "target": "下腿義足の歩行観察(矢状面)",
    "value": "ソケットの初期屈曲角は矢状面で調整する角度設定。なお、立脚後期の膝折れの原因が初期屈曲角の大きすぎにある、という対応そのものは、確認できた資料がなく、ここには載せていない(国試の正答のみ記録)。",
    "exam": "61-am-3(下腿切断。立脚後期の膝折れの原因=ソケットの初期屈曲角が大きすぎる(正答)。誤答:前足部が硬すぎる／靴の踵が低すぎる／足部が底屈しすぎる／ソケットが足部に対して後ろすぎる)",
    "q": [
     "61-am-3"
    ],
    "note": "矢状面の設定であることのみ確認[S1]。原因の機序は未確認のため、教科書(義肢学)で確認すること。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://nazenani-sougu.com/kokushi/pt56-am39/"
     }
    ]
   },
   {
    "item": "下腿義足のソケットの種類(PTB・KBM・PTS・ライナー式)",
    "target": "下腿義足のソケットと懸垂",
    "value": "PTB式:従来から最も一般的。ソフトインサートを付けて装着し、断端の動きを義足に伝えやすい。KBM式:大腿骨顆の上方を両側から包んで懸垂。PTS式:体重の支え方はPTB式に似るが大腿骨顆部を完全に包み、自己懸垂性がある。ライナー式:シリコーン製ライナーで懸垂し、皮膚を守る。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S2]。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.kousaikai.or.jp/support/knowledge/g-prosthetichand/g-prostheticleg/"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
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
  "slug": "trunk-orthosis",
  "name": "体幹装具の種類と制限する動き(Jewett・Knight・Williams・Taylor)",
  "category": "検査法・徴候",
  "aliases": [
   "体幹装具",
   "脊椎装具",
   "Jewett型",
   "Jewett",
   "ジュエット型",
   "ジュウェット",
   "Knight型",
   "Knight",
   "ナイト型",
   "Williams型",
   "Williams",
   "ウィリアムス型",
   "ウイリアムス型",
   "Taylor型",
   "Taylor",
   "テイラー型",
   "Steindler",
   "スタインドラー型",
   "腰仙椎装具",
   "胸腰仙椎装具",
   "ダーメンコルセット"
  ],
  "rows": [
   {
    "item": "Jewett型(ジュエット型)",
    "target": "胸腰椎の前屈を制限する装具",
    "value": "胸骨パッド・恥骨パッド・後方パッドの3点固定。前方から胸骨部と恥骨上部、後方から胸腰椎部に力を加えて前屈を制限し、後屈は可能。後彎の矯正を図る。",
    "exam": "49-am-40(誤答:「Jewett型装具は体幹後屈の制限を目的とする」→前屈の制限が正しい)",
    "q": [
     "49-am-40"
    ],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.mhlw.go.jp/file/06-Seisakujouhou-12200000-Shakaiengokyokushougaihokenfukushibu/0000070150.pdf"
     }
    ]
   },
   {
    "item": "Knight型(ナイト型)",
    "target": "腰椎の動きを制限する腰椎装具",
    "value": "強固な後方支柱2本・側方支柱・骨盤帯・胸椎バンドからなる逆T字型の構造。腰椎の伸展・屈曲・側屈・回旋を制限し、腹圧で体重を支え、腰椎前彎を軽減する。前部は軟性なので半硬性装具ともいう。",
    "exam": "49-am-40(正答:Knight型装具は腰椎後屈(伸展)の制限を目的とする)",
    "q": [
     "49-am-40"
    ],
    "note": "確認済み[S1]。国試の正答と矛盾しない(伸展の制限を含む)。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.mhlw.go.jp/file/06-Seisakujouhou-12200000-Shakaiengokyokushougaihokenfukushibu/0000070150.pdf"
     }
    ]
   },
   {
    "item": "Williams型(ウィリアムス型)",
    "target": "腰椎前彎を伴う疾患・脊椎分離症などに用いる腰椎装具",
    "value": "骨盤帯・胸椎バンド・側方支柱・後側方支柱からなる。後屈と側屈を制限し、前屈は可能にする(Knight型・Jewett型と逆の発想)。",
    "exam": "49-am-40(誤答:「Williams型装具は体幹前屈の制限を目的とする」→後屈と側屈の制限が正しい)",
    "q": [
     "49-am-40"
    ],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.mhlw.go.jp/file/06-Seisakujouhou-12200000-Shakaiengokyokushougaihokenfukushibu/0000070150.pdf"
     }
    ]
   },
   {
    "item": "Taylor型(テイラー型)・Knight-Taylor型・Steindler型",
    "target": "胸椎・胸腰椎を支持する装具",
    "value": "Taylor型:上部腰椎から胸椎部を支持。後方に金属支柱があり、肩を固定する紐をつけ、前面は軟性。前屈と後屈を制限。Knight-Taylor型:Knight型の後方支柱を上へ伸ばし、前屈・後屈・側屈を制限。Steindler型:金属枠の硬性装具で胸椎装具の中で最も固定力が強く、前屈・後屈・側屈・回旋を制限。",
    "exam": "49-am-40(誤答:「Taylor型装具は頸椎から仙椎までの可動域を制限する」→上部腰椎から胸椎の支持で、頸椎は含まれない)",
    "q": [
     "49-am-40"
    ],
    "note": "確認済み[S1]。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.mhlw.go.jp/file/06-Seisakujouhou-12200000-Shakaiengokyokushougaihokenfukushibu/0000070150.pdf"
     }
    ]
   },
   {
    "item": "軟性体幹装具(コルセット)の働き",
    "target": "軟性装具の基本",
    "value": "主に布製で体幹の輪郭に合わせて作る(一般にコルセット)。腹腔内圧(腹圧)を上げて、椎体と椎間板への負荷を減らす役割をもつ。",
    "exam": "49-am-40(選択肢にダーメンコルセットが出たが、下端の位置についての記述は資料で未確認)",
    "q": [
     "49-am-40"
    ],
    "note": "確認済み[S1]。ダーメンコルセットの下端の位置は、確認できた資料がないため載せていない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.mhlw.go.jp/file/06-Seisakujouhou-12200000-Shakaiengokyokushougaihokenfukushibu/0000070150.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
  "review": "ai"
 },
 {
  "slug": "twelve-minute-walk-test",
  "name": "12分間歩行テスト(12MWT)",
  "category": "評価尺度",
  "aliases": [
   "12分間歩行テスト",
   "12分間歩行",
   "12分間歩行試験",
   "12分間歩行距離",
   "12MWT",
   "12-minute walk test",
   "twelve-minute walking test",
   "12分間走",
   "クーパーテスト"
  ],
  "rows": [
   {
    "item": "12分間歩行テストとは",
    "target": "運動耐容能(日常生活の障害の目安)",
    "value": "12分間に歩いた距離で運動耐容能を見る定時間の歩行テスト。1976年に McGavin らが慢性気管支炎で報告し、歩行距離は努力肺活量・最大酸素摂取量・換気量と有意に関係し、1秒量とは弱い関係だった",
    "exam": "50-pm-46(誤答選択肢:12分間歩行テスト。問いは「運動負荷量を段階的に増加させる評価法」で、正答はBruce法)",
    "q": [
     "50-pm-46"
    ],
    "note": "確認済み[S1]。負荷を段階的に上げる検査ではなく、決めた時間に歩ける距離を測る形(S1の方法の記述からの要約。励まし方や休憩などの細かい手順は本文で確認できていない)",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://pubmed.ncbi.nlm.nih.gov/1260350/"
     }
    ]
   },
   {
    "item": "段階的に負荷を増やす検査との区別",
    "target": "50-pm-46の選択肢の整理",
    "value": "シャトルウォーキング試験は多段階漸増の運動負荷試験。6分間歩行試験は、6分間にできるだけ長い距離を自分のペースで歩く。12分間歩行は時間を12分に決めて距離を測る歩行テストで、負荷を段階的に上げるものではない",
    "exam": "50-pm-46(段階的に負荷を増やす評価法=Bruce法が正答。12分間歩行テストは誤答)",
    "q": [
     "50-pm-46"
    ],
    "note": "確認済み[S2][S3]。シャトルウォーキングはS2、6分間歩行の自己ペースはS3。12分間歩行の項はS1と合わせた要約。Bruce法は運動強度カードも参照",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://www.j-circ.or.jp/cms/wp-content/uploads/2021/03/JCS2021_Makita.pdf"
     },
     {
      "label": "S3",
      "url": "https://www.jstage.jst.go.jp/article/jsrcr/28/2/28_286/_html/-char/ja"
     },
     {
      "label": "S1",
      "url": "https://pubmed.ncbi.nlm.nih.gov/1260350/"
     }
    ]
   },
   {
    "item": "由来(Cooperの12分間走)",
    "target": "歴史",
    "value": "Cooper(1968)は空軍の男性115名で12分間の全力走を行った。McGavin ら(1976)はこれを歩行に改め、日常動作に近いとして、病院の廊下でCOPDなどの患者に用いた",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S4]。総説の記述。歩行中の指示(最大限の距離を歩くか、休憩可か)は本文で確認できていない",
    "conflict": false,
    "sources": [
     {
      "label": "S4",
      "url": "https://jxym.amegroups.org/article/view/4832/html"
     }
    ]
   },
   {
    "item": "6分間歩行テストとの関係",
    "target": "なぜ6分が使われるか",
    "value": "Butland ら(1982)は2・6・12分の歩行を比べ、12分は検者に時間がかかり患者には負担が大きいと評価した。2分は区別する力が弱く、6分間歩行が妥当な折衷とされた。歩行速度は最初の2分で最高になり、その後は2分ごとの距離が安定した",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S4]",
    "conflict": false,
    "sources": [
     {
      "label": "S4",
      "url": "https://jxym.amegroups.org/article/view/4832/html"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
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
  "slug": "updrs",
  "name": "UPDRS(MDS-UPDRS)",
  "category": "評価尺度",
  "aliases": [
   "UPDRS",
   "MDS-UPDRS",
   "Unified Parkinson's Disease Rating Scale",
   "パーキンソン病統一スケール",
   "パーキンソン病統一評価尺度"
  ],
  "rows": [
   {
    "item": "UPDRS(MDS-UPDRS)の構成と対象",
    "target": "Parkinson病の症状・日常生活・運動合併症の包括的評価",
    "value": "4部構成。Part I=非運動症状の日常生活(13項目)、Part II=運動症状の日常生活(13項目)、Part III=運動検査(評価者が診察で採点。18項目・33採点)、Part IV=運動合併症(6項目)。計65採点。各項目は0=正常、1=わずか、2=軽度、3=中等度、4=重度の5段階。従来版UPDRSは55項目。",
    "exam": "58-am-32(脊髄小脳変性症の運動失調の評価はSARAが正答。UPDRSは誤答選択肢=Parkinson病の尺度)／59-am-91(脳卒中患者の身体機能評価はNIHSS・SIASが正答。UPDRSは誤答選択肢)／60-am-12(片麻痺の通所者の転倒リスク評価はTUGが正答。UPDRSは誤答選択肢)",
    "q": [
     "58-am-32",
     "59-am-91",
     "60-am-12"
    ],
    "note": "確認済み[S1][S2]。日本語名「パーキンソン病統一スケール」は検索用の別名で、本資料では確認していない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.cms.gov/files/document/mds-updrsenglishfinal.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.bumc.bu.edu/len/files/2009/01/new-updrs.pdf"
     }
    ]
   },
   {
    "item": "Part III 固縮(項目3.3)",
    "target": "運動検査(Part III)の代表項目",
    "value": "頸部と4肢を別々に、力を抜かせて他動的にゆっくり関節を動かして評価(上肢は手首と肘、下肢は股と膝を同時に)。0=固縮なし／1=対側の活性化動作(指タッピング・手の開閉・踵タッピングなど)をしたときだけ検出／2=活性化動作なしで検出、全可動域は容易に得られる／3=全可動域は努力して得られる／4=全可動域が得られない。",
    "exam": "60-am-29(UPDRS Version 3.0の運動能力検査の項目はどれか。正答=固縮。誤答=嚥下・転倒・寝返り・歩行中のすくみ)",
    "q": [
     "60-am-29"
    ],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.cms.gov/files/document/mds-updrsenglishfinal.pdf"
     }
    ]
   },
   {
    "item": "Part II 日常生活の項目(嚥下・寝返り・すくみ・転倒)",
    "target": "運動症状が日常生活に与える影響(患者・介護者の自己記入が中心)",
    "value": "Part IIの13項目は、発語・唾液とよだれ・咀嚼と嚥下(2.3)・食事動作・着衣・清潔・書字・趣味や活動・寝返り(2.9)・振戦・ベッド/車/深い椅子からの立ち上がり・歩行とバランス(2.12)・すくみ(2.13)。「転倒」は従来版にあった項目だが、MDS版では日常体験の項目に入れず、診察(Part III)側で扱うとされる。",
    "exam": "60-am-29(誤答選択肢の嚥下・寝返り・歩行中のすくみ・転倒は、いずれもPart III運動検査の項目ではないという扱い)／60-am-12(転倒リスク評価としてUPDRSは不適切=誤答)",
    "q": [
     "60-am-29",
     "60-am-12"
    ],
    "note": "確認済み[S1][S2]。食い違い: 「歩行中のすくみ」は、Part IIの2.13(日常生活のすくみ)だけでなく、Part IIIにも3.11「歩行のすくみ(freezing of gait)」の運動検査項目がある。国試の正答は固縮で、すくみを誤答とした扱いは、選択肢の言い回しがPart IIの2.13を指す前提と考えられる(推測)。Part III 3.12(姿勢の安定性)が転倒に関わる診察項目。",
    "conflict": true,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.cms.gov/files/document/mds-updrsenglishfinal.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.bumc.bu.edu/len/files/2009/01/new-updrs.pdf"
     }
    ]
   },
   {
    "item": "Part III 運動検査の項目一覧",
    "target": "診察で採点する運動症状(Parkinson病の運動検査)",
    "value": "3.1 発語／3.2 表情／3.3 固縮／3.4 指タップ／3.5 手の運動／3.6 手の回内・回外／3.7 つま先タップ／3.8 下肢の敏捷性／3.9 椅子からの立ち上がり／3.10 歩行／3.11 歩行のすくみ／3.12 姿勢の安定性／3.13 姿勢／3.14 動作全体の自発性(身体の動作緩慢)／3.15 手の姿勢時振戦／3.16 手の動作時振戦／3.17 安静時振戦の振幅／3.18 安静時振戦の持続性。感覚を診る検査項目はない。",
    "exam": "54-am-35(UPDRSの評価項目でないものは、感覚が正答。誤答選択肢の姿勢・歩行はPart IIIに含まれる側)",
    "q": [
     "54-am-35"
    ],
    "note": "確認済み[S1]。「感覚」の扱いは下の行を参照。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.cms.gov/files/document/mds-updrsenglishfinal.pdf"
     }
    ]
   },
   {
    "item": "歩行(Part III 3.10)",
    "target": "歩行障害の重症度",
    "value": "少なくとも10 m歩いて折り返す。歩幅・速さ・足の挙上・踵接地・方向転換・腕振りをみる(すくみは別項目)。0=問題なし／1=自立歩行、軽い障害／2=自立歩行だが著しい障害／3=安全な歩行に杖や歩行器が必要(人の介助は不要)／4=全く歩けない、または他者の介助が必要。",
    "exam": "54-am-35(誤答選択肢=歩行。UPDRSの評価項目に含まれる)",
    "q": [
     "54-am-35"
    ],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.cms.gov/files/document/mds-updrsenglishfinal.pdf"
     }
    ]
   },
   {
    "item": "姿勢の安定性(Part III 3.12)・姿勢(3.13)",
    "target": "姿勢反射障害(後方突進)の評価",
    "value": "3.12は、立位の患者の肩を後ろから急に強く引き(1回目は説明用で採点しない)、後ろへのステップ数をみる。0=1〜2歩で回復／1=3〜5歩、自力で回復／2=5歩超、自力で回復／3=姿勢反応がなく、検者が支えないと倒れる／4=非常に不安定で、軽く引くだけで、または自然にバランスを崩す。2歩までは正常。3.13は立位姿勢の観察。",
    "exam": "54-am-35(誤答選択肢=姿勢。UPDRSの評価項目に含まれる)",
    "q": [
     "54-am-35"
    ],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.cms.gov/files/document/mds-updrsenglishfinal.pdf"
     }
    ]
   },
   {
    "item": "ジスキネジア(Part IV 4.1・4.2)",
    "target": "運動合併症(ジスキネジア)の評価",
    "value": "4.1=起きている時間のうちジスキネジアのある割合。0=なし／1=25%以下／2=26〜50%／3=51〜75%／4=75%超。4.2=ジスキネジアが日常の活動・対人場面に与える影響。Part IVはほかにOFF状態の時間・症状変動の影響と複雑さ・OFF期の有痛性ジストニアを含む(計6項目)。",
    "exam": "54-am-35(誤答選択肢=ジスキネジア。UPDRSの評価項目に含まれる)",
    "q": [
     "54-am-35"
    ],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.cms.gov/files/document/mds-updrsenglishfinal.pdf"
     }
    ]
   },
   {
    "item": "知的機能(Part I 1.1 認知障害)",
    "target": "Parkinson病の認知機能面の評価",
    "value": "Part Iの項目1.1「認知障害(Cognitive impairment)」。従来版UPDRSの「知的機能の障害(Intellectual impairment)」に対応する。ほかにPart Iには幻覚・精神症状、抑うつ、不安、アパシー、睡眠、日中の過眠、疲労などの項目がある。",
    "exam": "54-am-35(誤答選択肢=知的機能。UPDRSの評価項目に含まれる)",
    "q": [
     "54-am-35"
    ],
    "note": "確認済み[S1][S2]。採点の基準文は読んでいない(項目の存在と対応関係のみ確認)。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.cms.gov/files/document/mds-updrsenglishfinal.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.bumc.bu.edu/len/files/2009/01/new-updrs.pdf"
     }
    ]
   },
   {
    "item": "感覚(国試で「評価項目でない」とされた点)",
    "target": "UPDRSの評価項目に含まれないもの",
    "value": "運動検査(Part III)に感覚を診る項目はない。一方でPart Iの1.9「痛みとその他の感覚」は、患者が報告する症状の項目(従来版では「感覚の訴え(Sensory complaints related to parkinsonism)」)として存在する。",
    "exam": "54-am-35(UPDRSの評価項目でないものはどれか。正答=感覚。誤答選択肢=姿勢・歩行・知的機能・ジスキネジア)",
    "q": [
     "54-am-35"
    ],
    "note": "食い違い: 資料では、感覚検査はないが、患者報告の「痛みとその他の感覚」の項目は存在する[S1][S2]。国試の「感覚」は感覚検査(客観的な診察項目)を指すと考えられる(推測)。",
    "conflict": true,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.cms.gov/files/document/mds-updrsenglishfinal.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.bumc.bu.edu/len/files/2009/01/new-updrs.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
  "review": "ai"
 },
 {
  "slug": "urinary-incontinence-types",
  "name": "尿失禁の分類(腹圧性・切迫性・溢流性・機能性)",
  "category": "診断基準・分類",
  "aliases": [
   "尿失禁",
   "腹圧性尿失禁",
   "切迫性尿失禁",
   "溢流性尿失禁",
   "機能性尿失禁",
   "反射性尿失禁",
   "混合型尿失禁",
   "混合性尿失禁",
   "骨盤底筋体操",
   "骨盤底筋訓練",
   "ケーゲル体操"
  ],
  "rows": [
   {
    "item": "腹圧性尿失禁",
    "target": "咳・くしゃみなど腹圧が上がったときの尿漏れ",
    "value": "腹圧の急な上昇(咳・くしゃみ・笑う・体を曲げる・物を持ち上げる など)で尿が漏れる。漏出量は少量〜中等量。女性は出産の合併症や萎縮性尿道炎が主な原因、男性は前立腺全摘除術などの後に起こりうる",
    "exam": "59-am-77(問題文「咳をしたときに生じる尿失禁」→正答=腹圧性。選択肢=溢流性・機能性・切迫性・反射性・腹圧性)／49-pm-37(骨盤底筋体操の効果が最も期待される→腹圧性が正答)",
    "q": [
     "59-am-77",
     "49-pm-37"
    ],
    "note": "確認済み[S1][S2]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/03-%E6%B3%8C%E5%B0%BF%E5%99%A8%E7%96%BE%E6%82%A3/%E6%8E%92%E5%B0%BF%E9%9A%9C%E5%AE%B3/%E6%88%90%E4%BA%BA%E3%81%AE%E5%B0%BF%E5%A4%B1%E7%A6%81"
     },
     {
      "label": "S2",
      "url": "https://aichi.med.or.jp/webcms/wp-content/uploads/2023/06/71_1_p025_Special1-Yoshikawa.pdf"
     }
    ]
   },
   {
    "item": "骨盤底筋体操(ケーゲル体操)の適応",
    "target": "どの尿失禁に効果が期待できるか",
    "value": "骨盤底筋体操はしばしば有効で、特に腹圧性尿失禁に有効。骨盤底筋(大腿・腹筋・殿筋ではなく)を、10秒収縮→10秒弛緩、1セット10〜15回を1日3セット行う例が示されている。日本のガイドラインでも、女性の腹圧性尿失禁を含む下部尿路症状への骨盤底筋訓練は推奨グレードA",
    "exam": "49-pm-37(正答=腹圧性尿失禁。誤答=溢流性・切迫性・機能性・過活動膀胱)",
    "q": [
     "49-pm-37"
    ],
    "note": "確認済み[S1][S2]。回数・時間は例示であり、実際の指導は個別に",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/03-%E6%B3%8C%E5%B0%BF%E5%99%A8%E7%96%BE%E6%82%A3/%E6%8E%92%E5%B0%BF%E9%9A%9C%E5%AE%B3/%E6%88%90%E4%BA%BA%E3%81%AE%E5%B0%BF%E5%A4%B1%E7%A6%81"
     },
     {
      "label": "S2",
      "url": "https://aichi.med.or.jp/webcms/wp-content/uploads/2023/06/71_1_p025_Special1-Yoshikawa.pdf"
     }
    ]
   },
   {
    "item": "切迫性尿失禁",
    "target": "尿意切迫と同時または直後の尿漏れ",
    "value": "抑えられない切迫した尿意の直後に、中等量〜多量の尿が漏れる。夜間頻尿・夜間の失禁が多い。高齢者で最も多い型。主な原因は排尿筋過活動(特発性のほか、加齢・認知症・脳卒中による前頭葉の排尿中枢の機能障害など)",
    "exam": "59-am-77(誤答選択肢)／49-pm-37(誤答選択肢)",
    "q": [
     "59-am-77",
     "49-pm-37"
    ],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/03-%E6%B3%8C%E5%B0%BF%E5%99%A8%E7%96%BE%E6%82%A3/%E6%8E%92%E5%B0%BF%E9%9A%9C%E5%AE%B3/%E6%88%90%E4%BA%BA%E3%81%AE%E5%B0%BF%E5%A4%B1%E7%A6%81"
     }
    ]
   },
   {
    "item": "溢流性尿失禁",
    "target": "尿閉に伴い、あふれて少しずつ漏れる",
    "value": "膀胱に過度にたまった尿が徐々に漏れる。通常は少量だが持続的に漏れることがある。男性では2番目に多い型。排尿筋の収縮力低下や下部尿路閉塞で膀胱が空にならないことが原因",
    "exam": "59-am-77(誤答選択肢)／49-pm-37(誤答選択肢)",
    "q": [
     "59-am-77",
     "49-pm-37"
    ],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/03-%E6%B3%8C%E5%B0%BF%E5%99%A8%E7%96%BE%E6%82%A3/%E6%8E%92%E5%B0%BF%E9%9A%9C%E5%AE%B3/%E6%88%90%E4%BA%BA%E3%81%AE%E5%B0%BF%E5%A4%B1%E7%A6%81"
     }
    ]
   },
   {
    "item": "機能性尿失禁",
    "target": "尿路の異常ではなく、認知・身体機能や環境による",
    "value": "認知機能・身体機能の障害(認知症・脳卒中など)や、排尿の制御を妨げる環境の障壁が原因。例:尿意に気づかない、トイレの場所がわからない、遠いトイレまで歩けない。尿禁制の神経経路・尿路の仕組みは正常なことがある",
    "exam": "59-am-77(誤答選択肢)／49-pm-37(誤答選択肢)",
    "q": [
     "59-am-77",
     "49-pm-37"
    ],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/03-%E6%B3%8C%E5%B0%BF%E5%99%A8%E7%96%BE%E6%82%A3/%E6%8E%92%E5%B0%BF%E9%9A%9C%E5%AE%B3/%E6%88%90%E4%BA%BA%E3%81%AE%E5%B0%BF%E5%A4%B1%E7%A6%81"
     }
    ]
   },
   {
    "item": "混合型尿失禁",
    "target": "複数の型が合併",
    "value": "上記の型が混合したもの。最も多い組み合わせは、切迫性と腹圧性の併発、または切迫性または腹圧性と機能性の併発",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/03-%E6%B3%8C%E5%B0%BF%E5%99%A8%E7%96%BE%E6%82%A3/%E6%8E%92%E5%B0%BF%E9%9A%9C%E5%AE%B3/%E6%88%90%E4%BA%BA%E3%81%AE%E5%B0%BF%E5%A4%B1%E7%A6%81"
     }
    ]
   },
   {
    "item": "「反射性」という用語の扱い",
    "target": "選択肢に出る「反射性尿失禁」の位置づけ",
    "value": "S1では、尿意切迫や腹圧上昇などの予告なく尿が突然噴出する状態は「しばしば反射的または無意識的尿失禁と呼ばれ」、典型的には排尿筋過活動を示唆する、と書かれている。「反射性尿失禁」を独立した型として定義した記載は、S1では確認できなかった",
    "exam": "59-am-77(誤答選択肢に「反射性」)",
    "q": [
     "59-am-77"
    ],
    "note": "確認済み[S1]。反射性尿失禁の詳しい定義は、本文で確認できなかったため書いていない(脊髄損傷との関連は別の資料で確認してください)",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/03-%E6%B3%8C%E5%B0%BF%E5%99%A8%E7%96%BE%E6%82%A3/%E6%8E%92%E5%B0%BF%E9%9A%9C%E5%AE%B3/%E6%88%90%E4%BA%BA%E3%81%AE%E5%B0%BF%E5%A4%B1%E7%A6%81"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 },
 {
  "slug": "viral-hepatitis",
  "name": "ウイルス肝炎(A・B・C型)と肝炎ウイルス検査",
  "category": "臨床検査",
  "aliases": [
   "ウイルス性肝炎",
   "A型肝炎",
   "B型肝炎",
   "C型肝炎",
   "B型肝炎ワクチン",
   "HCV抗原",
   "HCV抗体",
   "HCV-RNA",
   "HCVコア抗原",
   "HBs抗原",
   "慢性肝炎",
   "急性増悪期"
  ],
  "rows": [
   {
    "item": "B型肝炎ワクチン(感染予防)",
    "target": "B型肝炎ウイルス感染の予防",
    "value": "ワクチンは感染の予防に有効。3回接種後の感染防御効果は20年以上続くと考えられる(抗体獲得率は40歳までの接種で95%)。2016年4月以降生まれの0歳児が定期接種の対象(2016年10月開始)。接種で母子感染(垂直感染)を防げた報告もある",
    "exam": "53-pm-94(「B型肝炎ワクチンは感染の予防に有効である」=正答)",
    "q": [
     "53-pm-94"
    ],
    "note": "確認済み[S1][S2]。定期接種の対象・時期は制度開始時(2016年)の情報で、現行の運用は別途確認が必要。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.mhlw.go.jp/file/06-Seisakujouhou-10900000-Kenkoukyoku/0000137554.pdf"
     },
     {
      "label": "S2",
      "url": "https://www.mhlw.go.jp/content/10906000/001615371.pdf"
     }
    ]
   },
   {
    "item": "C型肝炎の検査(HCV抗体・HCV-RNA・HCV抗原)",
    "target": "C型肝炎ウイルスの現在の感染を確かめる検査",
    "value": "HCV抗体=スクリーニング。現在の感染者(血中HCV-RNA陽性)だけでなく、既往の感染者(RNA陰性)も陽性になる。現在感染の診断=HCV-RNA(real time PCR)。HCVコア抗原は現在の感染を意味するが、感度はHCV-RNAに及ばない(安価・定量性・迅速)",
    "exam": "53-pm-94(誤答選択肢「C型肝炎のキャリアはHCV抗原が陽性である」)",
    "q": [
     "53-pm-94"
    ],
    "note": "国試ではこの選択肢が誤り扱い。一方、資料ではHCVコア抗原の陽性は現在の感染を意味するとされ、国試の誤りの根拠は資料から確認できない(診断の基本はHCV抗体+HCV-RNAという扱いと思われる)。確認済み[S1]",
    "conflict": true,
    "sources": [
     {
      "label": "S1",
      "url": "https://mhlw-grants.niph.go.jp/system/files/report_pdf/202424020A-buntan4.pdf"
     }
    ]
   },
   {
    "item": "A型肝炎",
    "target": "A型肝炎ウイルスによる急性肝炎",
    "value": "慢性化することはない(まれに劇症化)。主な感染経路は汚染された食品や水などを介した経口感染。潜伏期は平均4週間。一般に予後は良く、特異的な治療法はなく対症療法が中心",
    "exam": "53-pm-94(誤答選択肢「A型肝炎の慢性化率は約20%である」)",
    "q": [
     "53-pm-94"
    ],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.mhlw.go.jp/bunya/kenkou/kekkaku-kansenshou11/01-04-03.html"
     }
    ]
   },
   {
    "item": "慢性肝炎の原因ウイルス(B型・C型)",
    "target": "慢性肝炎(炎症が6か月以上持続)の原因",
    "value": "慢性肝炎はB型・C型肝炎ウイルスによるものが多い。2021年度の患者数(推計)は、慢性肝炎がB型約18万人・C型約16万人。持続感染者数(2020年推計)はB型約92〜94万人・C型約18〜48万人",
    "exam": "53-pm-94(誤答選択肢「慢性肝炎の原因ウイルスで最も多いのはB型である」)",
    "q": [
     "53-pm-94"
    ],
    "note": "国試ではB型が最多とする選択肢が誤り扱い。しかし厚生労働省の最近の資料では、慢性肝炎の患者数はB型の方がやや多く、国試の扱い(C型が最多とする考え方)と食い違う。出題当時と現在で状況が変わった可能性がある。確認済み[S1]",
    "conflict": true,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.mhlw.go.jp/content/10901000/001664302.pdf"
     }
    ]
   },
   {
    "item": "慢性肝炎・肝硬変と運動",
    "target": "肝疾患での運動の位置づけ",
    "value": "運動療法と栄養療法を組み合わせた肝臓リハビリテーションは、肝硬変に伴うサルコペニアなどへの基本的な治療とされる。ただしChild-Pugh C(肝硬変)の運動療法を推奨できるエビデンスは乏しい",
    "exam": "53-pm-94(誤答選択肢「慢性肝炎においては急性増悪期を過ぎても運動制限を行う」)",
    "q": [
     "53-pm-94"
    ],
    "note": "確認済み[S1]。資料は肝硬変・脂肪性肝疾患・肝癌を扱い、慢性肝炎の運動制限そのものには触れていない。国試の選択肢が誤りである点は、資料からは直接確認できていない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.jsh.or.jp/medical/committeeactivity/shakaihoken/method.html"
     }
    ]
   },
   {
    "item": "C型肝炎の持続感染化",
    "target": "感染後にキャリアになる割合",
    "value": "C型は年齢に関係なく約70%が持続感染(キャリア)になる。感染力はB型より弱い。自然経過では徐々に進行し、多くは慢性肝炎を発症",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.mhlw.go.jp/content/10901000/001664302.pdf"
     }
    ]
   },
   {
    "item": "B型肝炎の持続感染化(キャリア)",
    "target": "感染時期によるキャリア化の違い",
    "value": "2〜3歳頃までに感染すると90%以上がキャリア化。成人の感染では約1%(欧米型のウイルスで10%程度)。キャリアの85〜90%は無症候のまま経過",
    "exam": "出題は直接なし(参考。B型ワクチンが乳児の母子感染予防などに使われる背景)",
    "q": [],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.mhlw.go.jp/content/10901000/001664302.pdf"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
  "review": "ai"
 },
 {
  "slug": "vitamin-b12",
  "name": "ビタミンB12(胃全摘後の欠乏・亜急性連合性脊髄変性症)",
  "category": "臨床検査",
  "aliases": [
   "ビタミンB12",
   "血清ビタミンB12",
   "B12欠乏",
   "胃全摘出術",
   "胃全摘術",
   "胃全摘",
   "胃切除後",
   "内因子",
   "亜急性連合性脊髄変性症",
   "亜急性脊髄連合変性症"
  ],
  "rows": [
   {
    "item": "胃全摘術後の貧血(ビタミンB12欠乏)",
    "target": "胃切除後に起こる貧血",
    "value": "胃全摘後は吸収に必要な物質(内因子)が分泌されず、肝臓の貯蔵が術後数年で尽きるとビタミンB12欠乏性貧血になる。症状の例は舌がつるつるになる・白髪が増える・足のしびれ。治療はビタミンB12の筋肉注射。胃切除後は食事量の減少や胃酸の減少による鉄欠乏性貧血も起こる。",
    "exam": "51-pm-85「胃全摘出術後に起こりやすいのはどれか」の正答=貧血(選択肢: 脱水・貧血・脂肪便・出血傾向・低蛋白血症)。問題文にB12の語はなく、貧血の中身がB12欠乏であることを知っていれば解ける。",
    "q": [
     "51-pm-85"
    ],
    "note": "確認済み[S1][S2]。脱水・脂肪便・出血傾向・低蛋白血症が誤りである理由は、このカードでは確認していない。",
    "conflict": false,
    "sources": [
     {
      "label": "S2",
      "url": "https://pod.ncc.go.jp/jp/ncce/CHEER/advice/080/001_hinnketu.pdf"
     },
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/09-栄養障害/ビタミン欠乏症-依存症-および中毒/ビタミンb12欠乏症"
     }
    ]
   },
   {
    "item": "ビタミンB12の貯蔵と欠乏が出るまでの期間",
    "target": "欠乏の発症時期",
    "value": "肝臓に大量に貯蔵されており、摂取が止まっても通常は3〜5年は必要量を維持できる。腸肝循環による再吸収が失われた場合は、数か月〜1年程度。胃全摘後は術後数年で貯蔵が尽きるとされる。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1][S2]。年数は目安で、個人差がある。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/09-栄養障害/ビタミン欠乏症-依存症-および中毒/ビタミンb12欠乏症"
     },
     {
      "label": "S2",
      "url": "https://pod.ncc.go.jp/jp/ncce/CHEER/advice/080/001_hinnketu.pdf"
     }
    ]
   },
   {
    "item": "ビタミンB12欠乏による貧血の特徴",
    "target": "貧血の型",
    "value": "巨赤芽球性貧血(赤血球が大きい大球性)が特徴。多くは潜行性に進み、症状の割に貧血が重いことが多い。舌炎などの消化管症状を伴うことがある。吸収不良の最多原因は高齢者の胃酸低下。内因子の欠如(自己免疫性萎縮性胃炎・胃の手術など)でも起こる。",
    "exam": "出題は直接なし(参考。51-pm-85の「貧血」の中身)",
    "q": [],
    "note": "確認済み[S1]。悪性貧血は本来、内因子欠乏を伴う自己免疫性萎縮性胃炎によるB12欠乏性貧血を指す。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/09-栄養障害/ビタミン欠乏症-依存症-および中毒/ビタミンb12欠乏症"
     }
    ]
   },
   {
    "item": "ビタミンB12欠乏の神経症状(亜急性連合性脊髄変性症)",
    "target": "脊髄・末梢神経の障害",
    "value": "貧血などの血液異常がなくても出ることがある。早期は四肢の位置覚・振動覚の低下、軽〜中等度の筋力低下と反射低下。後期は痙性、反射亢進(アキレス腱反射は消失することがある)、伸展性足底反応、下肢の位置覚・振動覚の著明な低下、運動失調。触覚・痛覚・温度覚は通常障害されない。",
    "exam": "58-pm-6 正答=亜急性連合性脊髄変性症(選択肢: 皮膚筋炎・Shy-Drager症候群・筋萎縮性側索硬化症・ポストポリオ症候群)。症例文から選ぶ問題で、症例文の詳細はこのカードでは未確認。",
    "q": [
     "58-pm-6"
    ],
    "note": "確認済み[S1][S3]。出典の本文は「白質が障害される」と書き、後索・側索という語は使っていない。",
    "conflict": false,
    "sources": [
     {
      "label": "S3",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-神経疾患/脊髄疾患/亜急性連合性脊髄変性症"
     },
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/09-栄養障害/ビタミン欠乏症-依存症-および中毒/ビタミンb12欠乏症"
     }
    ]
   },
   {
    "item": "血清ビタミンB12値と補助的な検査",
    "target": "欠乏の診断",
    "value": "血清B12が200 pg/mL未満で欠乏が示唆される。200〜350 pg/mLは境界域で、血清メチルマロン酸(MMA)を追加する。MMAの上昇はB12欠乏を支持し、葉酸欠乏では正常のまま。ホモシステインはB12・葉酸のどちらの欠乏でも上がる。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。数値は米国系のマニュアルの記載で、施設の基準値とは異なることがある。葉酸の補充はB12欠乏を覆い隠すため、葉酸も確認する。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/09-栄養障害/ビタミン欠乏症-依存症-および中毒/ビタミンb12欠乏症"
     }
    ]
   },
   {
    "item": "ビタミンB12欠乏の治療と経過",
    "target": "治療・予後の目安",
    "value": "重症では筋肉内注射、軽症で神経症状がなければ大量の経口投与でも内因子がなくても吸収される。血液所見は通常6週間以内に改善するが、神経症状の回復ははるかに長くかかり、数か月〜数年続くと不可逆になることがある。原因が是正されない限り生涯の補充が必要。葉酸だけで代用してはいけない(神経症状が進むことがある)。",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1][S3]。学習用の要約で、治療の指示ではない。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.msdmanuals.com/ja-jp/professional/09-栄養障害/ビタミン欠乏症-依存症-および中毒/ビタミンb12欠乏症"
     },
     {
      "label": "S3",
      "url": "https://www.msdmanuals.com/ja-jp/professional/07-神経疾患/脊髄疾患/亜急性連合性脊髄変性症"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-25",
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
 },
 {
  "slug": "yergason-speed-test",
  "name": "Yergasonテスト・Speedテスト(上腕二頭筋長頭腱炎)",
  "category": "検査法・徴候",
  "aliases": [
   "Yergason",
   "Yergasonテスト",
   "Yergason test",
   "Yargason",
   "Yargason test",
   "ヤーガソン",
   "ヤーガソンテスト",
   "Speed",
   "Speedテスト",
   "スピードテスト",
   "上腕二頭筋腱炎",
   "上腕二頭筋長頭腱炎",
   "結節間溝"
  ],
  "rows": [
   {
    "item": "Yergasonテスト",
    "target": "上腕二頭筋(長頭)腱炎",
    "value": "腕を体側につけ、肘を90度に曲げた位置で、検者の抵抗に逆らって前腕を回外させる。陽性=結節間溝(上腕二頭筋腱の溝)に痛みが出る",
    "exam": "54-am-33(上腕二頭筋腱炎で陽性を呈する検査=Yergason・正答。選択肢Adson・Apley・Finkelstein・Kemp)／53-pm-32(腱板断裂の徒手検査の選択肢に「Yargason test」と綴られ誤答。正答はdrop arm test)／60-pm-27(腰椎椎間板ヘルニアの疼痛誘発テストとして誤答選択肢)",
    "q": [
     "54-am-33",
     "53-pm-32",
     "60-pm-27"
    ],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.aafp.org/pubs/afp/issues/2009/0901/p470.html"
     }
    ]
   },
   {
    "item": "Speedテスト",
    "target": "上腕二頭筋(長頭)腱炎",
    "value": "肘を伸ばし前腕を回外した姿勢で、検者の抵抗に逆らって肩を前方挙上する。陽性=結節間溝に放散する痛み",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.aafp.org/pubs/afp/issues/2009/0901/p470.html"
     }
    ]
   },
   {
    "item": "結節間溝の圧痛",
    "target": "上腕二頭筋腱炎の身体所見",
    "value": "最も多い単独所見は結節間溝の圧痛。上腕を外旋すると圧痛点が後外側へ移ることが、二頭筋腱損傷に特異性の高い所見とされる",
    "exam": "出題は直接なし(参考)",
    "q": [],
    "note": "確認済み[S1]。国試で出る検査名の対応(二頭筋腱炎=Yergason)を覚えるための補足。",
    "conflict": false,
    "sources": [
     {
      "label": "S1",
      "url": "https://www.aafp.org/pubs/afp/issues/2009/0901/p470.html"
     }
    ]
   }
  ],
  "checkedOn": "2026-11-20",
  "review": "ai"
 }
];
