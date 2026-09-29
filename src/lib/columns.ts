// コラム（SEO向け読み物コンテンツ）のメタデータ一覧。
// 本文は src/content/columns/{slug}.tsx にJSXとして持つ（DBを介さない静的コンテンツ）。
// 執筆者は個人PTになりすまさず、一貫して「Re:light編集部」名義にする。

export type ColumnMeta = {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string; // YYYY-MM-DD
  updatedAt: string; // YYYY-MM-DD
};

export const COLUMNS: ColumnMeta[] = [
  {
    slug: "case-presentation-how-to",
    title: "症例発表・症例報告の書き方完全ガイド｜構成のコツと例文",
    description:
      "院内症例発表や学会発表で「何をどう書けばいいか分からない」を解決。症例報告の基本構成、考察の書き方、よくある減点ポイントまで具体的に解説します。",
    category: "症例・臨床",
    publishedAt: "2026-09-29",
    updatedAt: "2026-09-29",
  },
  {
    slug: "certified-pt-renewal-2026",
    title: "認定理学療法士・専門理学療法士の更新完全ガイド【2026年版】",
    description:
      "5年ごとの更新に必要なポイントの仕組み、期限管理のコツ、直前で慌てないための年間スケジュールの立て方を、最新制度に沿って解説します。",
    category: "資格・キャリア",
    publishedAt: "2026-09-29",
    updatedAt: "2026-09-29",
  },
  {
    slug: "portfolio-for-job-change",
    title: "PTの転職で差がつくポートフォリオの作り方",
    description:
      "職務経歴書だけでは伝わらない「臨床の厚み」をどう見せるか。理学療法士の転職・キャリアアップで評価されるポートフォリオの中身と作り方を解説します。",
    category: "資格・キャリア",
    publishedAt: "2026-09-29",
    updatedAt: "2026-09-29",
  },
  {
    slug: "resume-writing-pt",
    title: "理学療法士の履歴書・職務経歴書の書き方｜自己PR例文つき",
    description:
      "理学療法士の転職活動で必ず必要になる履歴書・職務経歴書。採用担当者に伝わる自己PRの書き方と、経験別の例文を紹介します。",
    category: "資格・キャリア",
    publishedAt: "2026-09-29",
    updatedAt: "2026-09-29",
  },
  {
    slug: "solo-pt-workplace",
    title: "一人職場のPTが感じる孤独と、乗り越えるための5つの方法",
    description:
      "相談できる同業者が近くにいない一人職場のPT・訪問リハビリのセラピストに向けて、臨床の悩みを抱え込まないための具体的な方法を紹介します。",
    category: "働き方",
    publishedAt: "2026-09-29",
    updatedAt: "2026-09-29",
  },
  {
    slug: "training-seminar-search",
    title: "理学療法士の研修・学会情報を効率よく探す方法",
    description:
      "気になる研修や学会がいつも探しにくい、という悩みを解決。都道府県士会・学会・オンライン研修まで、効率よく情報収集するための具体的な方法をまとめました。",
    category: "研修・学会",
    publishedAt: "2026-09-29",
    updatedAt: "2026-09-29",
  },
  {
    slug: "pt-oversupply-reality",
    title: "理学療法士は「多すぎる」のか？需給の実態とこれからのキャリア戦略",
    description:
      "有資格者数の推移、供給過多の予測、都市部と地方の偏在、養成校の募集停止まで、公表データをもとに理学療法士の需給の実態を整理し、これからのキャリア戦略を考えます。",
    category: "業界動向",
    publishedAt: "2026-09-29",
    updatedAt: "2026-09-29",
  },
  {
    slug: "pt-salary-reality",
    title: "理学療法士の給料はなぜ上がりにくいのか？年収の実態とこれからの働き方",
    description:
      "平均年収の実態、昇給しにくい構造的な理由、収入を上げるために現実的に取れる選択肢まで、データをもとに理学療法士の給料事情を整理します。",
    category: "業界動向",
    publishedAt: "2026-09-29",
    updatedAt: "2026-09-29",
  },
];

export function getColumnMeta(slug: string): ColumnMeta | undefined {
  return COLUMNS.find((c) => c.slug === slug);
}
