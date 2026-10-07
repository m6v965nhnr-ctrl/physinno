// 臨床アイデア辞書の型。疾患の中身は、この形でコードに持つ（PTの確認・修正は、ファイルの差分で見える）。
// PTが投稿するアイデアは、DB（clinical_ideas）にあり、疾患の slug でひも付く。

export type EvalItem = {
  name: string; // 評価の項目（例: 疼痛、歩行）
  how: string; // 何を、どう見るか（検査名・見るポイント）
};

export type IdeaItem = {
  title: string; // アイデアの名前
  purpose: string; // 何のために
  how: string; // 進め方
  points: string; // 実施のポイント・注意
};

export type Topic = {
  slug: string;
  category: CategoryKey;
  name: string;
  summary: string;
  evaluation: EvalItem[];
  ideas: IdeaItem[];
  cautions: string[]; // 中止・医師へ相談の目安など、リスク管理
  refs: string[]; // 参考にした公開資料（ガイドライン名など）
  // 論文検索に渡す英語の検索語
  searchQuery: string;
};

export type CategoryKey =
  | "cardiac"
  | "cerebrovascular"
  | "musculoskeletal"
  | "respiratory"
  | "disuse"
  | "cancer"
  | "disability"
  | "intractable";

export type Category = {
  key: CategoryKey;
  // 診療報酬上の「疾患別リハビリテーション料」の区分名
  name: string;
  short: string;
  description: string;
  // 中身をまだ用意していない区分
  comingSoon?: boolean;
};
