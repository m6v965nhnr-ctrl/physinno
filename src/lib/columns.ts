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
    slug: "pt-kokushi-pass-rate",
    title: "理学療法士国家試験の合格率と合格基準【第61回・2026年最新】過去5年の推移",
    description:
      "第61回理学療法士国家試験の合格率は89.7%（新卒94.9%）。合格基準（総得点・実地問題）と、第57回〜第61回の合格率の推移を厚生労働省の発表をもとにまとめました。",
    category: "学生・国試",
    publishedAt: "2026-10-07",
    updatedAt: "2026-10-07",
  },
  {
    slug: "pt-kokushi-study-plan",
    title: "理学療法士国家試験の勉強法｜過去問の使い方と最終学年のスケジュール",
    description:
      "何から始めればいい？理学療法士国家試験の勉強を、過去問を軸に進める方法と、実習がある最終学年1年間のスケジュール例を紹介します。",
    category: "学生・国試",
    publishedAt: "2026-10-07",
    updatedAt: "2026-10-07",
  },
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
    title: "理学療法士は「稼げない」って本当？年収の実態とこれからの働き方",
    description:
      "「頑張っても給料が上がらない」は本当か。厚労省の統計データをもとに平均年収と昇給しにくい構造的な理由を検証し、収入を上げるために現実的に取れる選択肢を整理します。",
    category: "業界動向",
    publishedAt: "2026-09-29",
    updatedAt: "2026-09-29",
  },
  {
    slug: "pt-tokyo-family-income",
    title: "理学療法士の年収で東京で子育てはできる？生活費・教育費・インフレから考える",
    description:
      "PTの平均年収、東京の生活費、子育て世帯の年収相場、教育費、物価上昇（インフレ）のデータを並べて、東京でPTとして家族を持って生きていけるかを現実的に検証します。",
    category: "業界動向",
    publishedAt: "2026-09-29",
    updatedAt: "2026-09-29",
  },
  {
    slug: "pro-sports-trainer-path",
    title: "プロスポーツトレーナーになるには？NPB・MLB・Jリーグ・海外サッカー・バスケの道のり",
    description:
      "プロ野球・メジャーリーグ・Jリーグ・海外サッカー・バスケットボール（Bリーグ/NBA）、それぞれで求められる資格とキャリアの道のりを、実例を交えて比較解説します。",
    category: "資格・キャリア",
    publishedAt: "2026-09-29",
    updatedAt: "2026-09-29",
  },
  {
    slug: "npb-trainer-path",
    title: "プロ野球（NPB）トレーナーになるには｜必要な資格と道のり",
    description:
      "NPBのトレーナーに必須資格はあるのか。国家資格とJSPO-ATの組み合わせ、採用の実情、今から積み上げておきたい経験まで詳しく解説します。",
    category: "資格・キャリア",
    publishedAt: "2026-09-29",
    updatedAt: "2026-09-29",
  },
  {
    slug: "mlb-trainer-path",
    title: "メジャーリーグ（MLB）のアスレティックトレーナーになるには｜BOC-ATC取得への道",
    description:
      "MLBで働くために事実上必須となる米国BOC-ATCとは。取得までの流れ、留学ルート、日本人保有者数など、現実的な道のりを解説します。",
    category: "資格・キャリア",
    publishedAt: "2026-09-29",
    updatedAt: "2026-09-29",
  },
  {
    slug: "j-league-trainer-path",
    title: "Jリーグのトレーナー（フィジオ）になるには｜求められる資格と求人の探し方",
    description:
      "Jリーグクラブで働く理学療法士に求められる資格（CSCS・JSPO-AT等）と、数少ない求人情報の集め方を解説します。",
    category: "資格・キャリア",
    publishedAt: "2026-09-29",
    updatedAt: "2026-09-29",
  },
  {
    slug: "overseas-soccer-trainer-path",
    title: "海外サッカークラブでフィジオとして働くには｜資格と就労ビザの壁",
    description:
      "プレミアリーグなど海外クラブで働くための現実的なハードルと、現地大学進学など実例から見えてくるルートを解説します。",
    category: "資格・キャリア",
    publishedAt: "2026-09-29",
    updatedAt: "2026-09-29",
  },
  {
    slug: "basketball-trainer-path",
    title: "バスケットボール（Bリーグ・NBA）のトレーナーになるには",
    description:
      "Bリーグは国内資格の組み合わせ、NBAは米国資格が必須。それぞれの道のりと今から準備できることを解説します。",
    category: "資格・キャリア",
    publishedAt: "2026-09-29",
    updatedAt: "2026-09-29",
  },
  {
    slug: "pt-study-hours-comparison",
    title: "理学療法士になるための勉強時間はどれくらい？JSPO-AT等と比較",
    description:
      "PT養成課程の総単位数・臨床実習時間から見る学習量を、JSPO-AT（930時間）や米国BOC-ATCの大学院課程と比較し、資格取得にかかる規模感を整理します。",
    category: "資格・キャリア",
    publishedAt: "2026-09-29",
    updatedAt: "2026-09-29",
  },
  {
    slug: "pt-evidence-level-guide",
    title: "エビデンスレベルとは？理学療法士が論文を読むときの見方【I〜VI早見表】",
    description:
      "システマティックレビュー、RCT、コホート研究、症例報告。研究デザインごとのエビデンスレベル（Minds 2007）を、理学療法の例で整理。使うときの注意と、論文を探す順番も解説します。",
    category: "論文・エビデンス",
    publishedAt: "2026-10-07",
    updatedAt: "2026-10-07",
  },
  {
    slug: "pubmed-search-for-pt",
    title: "PubMedの使い方｜理学療法士のための論文検索の基本（PICO・絞り込み）",
    description:
      "PubMedで理学療法の論文を探す基本を、英語の検索語の作り方、PICO、AND・ORの使い方、RCT・システマティックレビューでの絞り込みまで、順番に解説します。",
    category: "論文・エビデンス",
    publishedAt: "2026-10-07",
    updatedAt: "2026-10-07",
  },
  {
    slug: "pt-how-to-read-papers",
    title: "新人PTのための論文の読み方｜短時間で臨床に使えるか判断する7つの点",
    description:
      "忙しい臨床の合間でも読める、論文の読み方の順番と、研究デザイン・対象者・比較・評価・結果の大きさなど確認する7つの点。抄読会で話す型も紹介します。",
    category: "論文・エビデンス",
    publishedAt: "2026-10-07",
    updatedAt: "2026-10-07",
  },
];

export function getColumnMeta(slug: string): ColumnMeta | undefined {
  return COLUMNS.find((c) => c.slug === slug);
}
