// PT/リハビリ領域でよく検索されるであろう日本語医学用語 → 標準的な英語
// （PubMedのMeSH表記に寄せた一般的な言い回し）の対応表。
// 汎用の機械翻訳（MyMemory）は「変形性膝関節症」→「gonarthrosis」のような
// 辞書的だが実際にはあまり使われない訳語を返すことがあるため、
// よく使われる用語だけでも正しい英語に変換できるようにする。
//
// 日本語の文字数が長い語から先にマッチさせないと、短い語（例:「膝」）が
// 先に置き換わってしまうため、長さの降順で並べる。
const RAW_GLOSSARY = (
  [
    ["変形性膝関節症", "knee osteoarthritis"],
  ["変形性股関節症", "hip osteoarthritis"],
  ["変形性脊椎症", "spondylosis"],
  ["関節リウマチ", "rheumatoid arthritis"],
  ["大腿骨頸部骨折", "femoral neck fracture"],
  ["大腿骨近位部骨折", "hip fracture"],
  ["肩関節周囲炎", "frozen shoulder"],
  ["腱板断裂", "rotator cuff tear"],
  ["前十字靭帯損傷", "ACL injury"],
  ["半月板損傷", "meniscus injury"],
  ["足関節捻挫", "ankle sprain"],
  ["椎間板ヘルニア", "disc herniation"],
  ["頸椎症", "cervical spondylosis"],
  ["廃用症候群", "disuse syndrome"],
  ["誤嚥性肺炎", "aspiration pneumonia"],
  ["摂食嚥下障害", "dysphagia"],
  ["末梢神経障害", "peripheral neuropathy"],
  ["ロコモティブシンドローム", "locomotive syndrome"],
  ["パーキンソン病", "Parkinson's disease"],
  ["人工膝関節置換術", "total knee arthroplasty"],
  ["人工股関節置換術", "total hip arthroplasty"],
  ["高位脛骨骨切り術", "high tibial osteotomy"],
  ["慢性閉塞性肺疾患", "chronic obstructive pulmonary disease"],
  ["五十肩", "frozen shoulder"],
  ["脊髄損傷", "spinal cord injury"],
  ["脳血管疾患", "cerebrovascular disease"],
  ["脳梗塞", "cerebral infarction"],
  ["脳出血", "cerebral hemorrhage"],
  ["脳卒中", "stroke"],
  ["骨粗鬆症", "osteoporosis"],
  ["認知症", "dementia"],
  ["糖尿病", "diabetes mellitus"],
  ["心不全", "heart failure"],
  ["サルコペニア", "sarcopenia"],
  ["フレイル", "frailty"],
  ["褥瘡", "pressure ulcer"],
  ["拘縮", "contracture"],
  ["腰痛", "low back pain"],
  ["理学療法", "physical therapy"],
  ["運動療法", "exercise therapy"],
  ["作業療法", "occupational therapy"],
  ["リハビリテーション", "rehabilitation"],
  ["バランス訓練", "balance training"],
  ["歩行訓練", "gait training"],
  ["筋力トレーニング", "strength training"],
  ["ストレッチ", "stretching"],
  ["関節可動域", "range of motion"],
  ["膝", "knee"],
  ["股関節", "hip"],
  ["肩", "shoulder"],
  ["肘", "elbow"],
  ["手関節", "wrist"],
  ["足関節", "ankle"],
  ["腰椎", "lumbar spine"],
  ["頸椎", "cervical spine"],
  ["胸椎", "thoracic spine"],
  ["大腿", "thigh"],
  ["下腿", "lower leg"],
    ["足部", "foot"],
  ] as [string, string][]
).sort((a, b) => b[0].length - a[0].length);

function containsJapaneseChar(s: string): boolean {
  return /[぀-ヿ㐀-鿿]/.test(s);
}

export function translateMedicalJapanese(text: string): {
  result: string;
  fullyTranslated: boolean;
} {
  let result = text;

  for (const [ja, en] of RAW_GLOSSARY) {
    if (result.includes(ja)) {
      result = result.split(ja).join(en);
    }
  }

  return { result, fullyTranslated: !containsJapaneseChar(result) };
}
