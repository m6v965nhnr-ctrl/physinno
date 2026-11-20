// 検査・評価法・基準値のカード（国試の周辺知識）。行ごとに、出典（label・url）を持つ
export type TestRow = {
  item: string;
  target: string;
  value: string;
  // 国試での出題（正答・誤答の選択肢・問題文の別を含む、原文の要約）
  exam: string;
  // q: 過去問の問題ID（例: 52-am-3）
  q: string[];
  // 確認の記録。conflict が true のときは、国試の記載と現行の資料の違いを書いている
  note: string;
  conflict: boolean;
  sources: { label: string; url: string }[];
};

export type TestCard = {
  slug: string;
  name: string;
  category: string;
  // 問題文・選択肢に書かれうる別の表記（略称・英語名など）。名前のかっこ内の略称は、自動で足される
  aliases: string[];
  rows: TestRow[];
  checkedOn: string;
  // 照合の状態。ai: 作成者とは別のAIが出典と照合済み。human: 専門家が確認済み
  review: "ai" | "human";
};
