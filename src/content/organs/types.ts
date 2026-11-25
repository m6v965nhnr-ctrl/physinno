// 臓器・仕組みカード（解剖・生理の周辺知識）。各記述 t の根拠は、sources の n を s で示す
export type Claim = { t: string; s: number[] };

export type OrganCard = {
  slug: string;
  name: string;
  reading: string;
  // 神経系・呼吸器系・循環器系・消化器系・腎泌尿器系・内分泌系・感覚器系・生殖器系 など
  system: string;
  // 問題文・選択肢に書かれうる別の表記・部位名（噴門・幽門など）・略称。名前のかっこ内の語は自動で足される
  aliases: string[];
  summary: Claim;
  location: Claim[];
  structure: Claim[];
  function: Claim[];
  mechanism: Claim[];
  // q: 過去問の問題ID（例: 52-am-3）
  examPoints: { t: string; q: string[]; s: number[] }[];
  // 関係する疾患・検査・ほかの臓器の slug
  diseases: string[];
  tests: string[];
  related: string[];
  // 自作の模式図（public/organs/ 以下）
  figures: { src: string; alt: string; caption: string }[];
  sources: { n: number; title: string; org: string; url: string; checked: string; kind: string }[];
  checkedOn: string;
  // ai: 作成者とは別のAIが出典と照合済み。human: 専門家が確認済み
  review: "ai" | "human";
};
