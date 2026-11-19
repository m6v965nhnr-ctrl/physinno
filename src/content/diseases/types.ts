// 疾患カード（国試の周辺知識）。各記述 t の根拠は、sources の n を s で示す
export type Claim = { t: string; s: number[] };

export type Disease = {
  slug: string;
  name: string;
  reading: string;
  // 問題文・選択肢に書かれうる別の表記（略称・英語名など）。名前のかっこ内の略称は、自動で足される
  aliases: string[];
  system: string;
  summary: Claim;
  cause: Claim[];
  symptoms: Claim[];
  diagnosis: Claim[];
  treatment: Claim[];
  pt: Claim[];
  // q: 過去問の問題ID（例: 52-am-3）
  examPoints: { t: string; q: string[]; s: number[] }[];
  confusable: { name: string; diff: string; s: number[] }[];
  related: string[];
  // サイト内の、リハ・評価の詳しいガイドの slug（/columns/<slug>）
  guide?: string;
  sources: { n: number; title: string; org: string; url: string; checked: string; kind: string }[];
  // sources の確認日のうち最も新しいもの
  checkedOn: string;
  // 照合の状態。ai: 作成者とは別のAIが出典と照合済み。human: 専門家が確認済み
  review: "ai" | "human";
};
