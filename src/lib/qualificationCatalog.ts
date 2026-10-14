// 日本理学療法士協会の生涯学習制度（登録・認定・専門理学療法士）の、取得・更新の条件。
// 出典（2026年10月14日に確認）: https://www.japanpt.or.jp/pt/lifelonglearning/new/
//   登録: /registered/（更新）・/zenki-kouki/（取得＝前期・後期研修）・/points/（ポイント）
//   認定: /nintei/　専門: /senmon/　分野の一覧: asset/pdf/ninteisenmon_meishouteigi20221121.pdf
//   点数基準: asset/pdf/ninteisenmonkoushintensuukijyun20260401.pdf
// 制度は年度ごとに見直される（協会は2029年度に抜本改定の予定）。申請の前に、必ず協会の最新の案内を確認する。
import type { Achievement, AchievementCategory } from "@/lib/achievements";

export type QualificationKind = "registered" | "certified" | "specialist";
export type QualificationMode = "acquire" | "renew";

export const KIND_LABEL: Record<QualificationKind, string> = {
  registered: "登録理学療法士",
  certified: "認定理学療法士",
  specialist: "専門理学療法士",
};

export const MODE_LABEL: Record<QualificationMode, string> = {
  acquire: "取得を目指す",
  renew: "更新する",
};

// 分野（協会の「認定・専門理学療法士の分野・英語表記・定義」）。登録理学療法士には、分野の区別はない
export const CERTIFIED_FIELDS = [
  "脳卒中",
  "神経筋障害",
  "脊髄障害",
  "発達障害",
  "運動器",
  "切断",
  "スポーツ理学療法",
  "徒手理学療法",
  "循環",
  "呼吸",
  "代謝",
  "地域理学療法",
  "健康増進・参加",
  "介護予防",
  "補装具",
  "物理療法",
  "褥瘡・創傷ケア",
  "疼痛管理",
  "臨床教育",
  "管理・運営",
  "学校教育",
] as const;

export const SPECIALIST_FIELDS = [
  "基礎理学療法",
  "神経理学療法",
  "小児理学療法",
  "運動器理学療法",
  "スポーツ理学療法",
  "心血管理学療法",
  "呼吸理学療法",
  "糖尿病理学療法",
  "地域理学療法",
  "予防理学療法",
  "支援工学理学療法",
  "物理療法",
  "理学療法教育",
] as const;

export function fieldsFor(kind: QualificationKind): readonly string[] {
  return kind === "certified" ? CERTIFIED_FIELDS : kind === "specialist" ? SPECIALIST_FIELDS : [];
}

// 条件1つ。auto があれば、記録した実績から、自動で数える（なければ、自分でチェックする）
export type Requirement = {
  key: string;
  label: string;
  detail?: string;
  url?: string;
  // 「12コマ」のように、いくつ済んだかを数える項目（自分で数を入力する）。なければ、チェックだけ
  count?: { total: number; unit: string };
  auto?:
    | { type: "points"; need: number }
    | { type: "count"; categories: AchievementCategory[]; need: number; note: string };
};

const BASE = "https://www.japanpt.or.jp/pt/lifelonglearning/new";

export type RequirementSet = {
  items: Requirement[];
  // 期間・注意など、条件の外の大事な説明
  notes: string[];
  // 更新の必要点数（更新のとき）。取得のときは null
  points: number | null;
  // 更新サイクルの年数（更新のとき）
  cycleYears: number;
};

export function requirementsFor(kind: QualificationKind, mode: QualificationMode, field: string | null): RequirementSet {
  const f = field ? `（${field}）` : "";

  if (kind === "registered" && mode === "acquire") {
    return {
      points: null,
      cycleYears: 5,
      items: [
        {
          key: "zenki",
          count: { total: 54, unit: "コマ" },
          label: "前期研修を修了する",
          detail: "入会後、最短2年。全54コマ（座学22コマ＋実地研修32コマ）。座学は士会の研修会かeラーニング（マイページから無料で申込）",
          url: `${BASE}/zenki-kouki/`,
        },
        {
          key: "kouki",
          count: { total: 51, unit: "コマ" },
          label: "後期研修を修了する",
          detail: "前期のあと、最短3年。座学51コマ＋実地経験3年（36か月）。講座Cは27コマ中19コマ",
          url: `${BASE}/zenki-kouki/`,
        },
        {
          key: "kouki-e",
          count: { total: 6, unit: "コマ" },
          label: "後期研修の「症例検討会（講座E）」を6コマ分",
          detail: "E-1〜E-3の3テーマで、各2コマ。発表1回＝1コマ、聴講3回＝1コマ（eラーニングは対象外）",
          url: `${BASE}/zenki-kouki/`,
        },
        {
          key: "workplace",
          label: "マイページに勤務先を登録する",
          detail: "実地経験の月数が、自動で数えられます（協会に在会していること）",
          url: "https://mypage.japanpt.or.jp/mypage/login",
        },
      ],
      notes: ["新人教育プログラム（卒後5年間）を修了すると、登録理学療法士として登録されます。"],
    };
  }

  if (kind === "registered") {
    return {
      points: 50,
      cycleYears: 5,
      items: [
        {
          key: "points",
          label: "ポイントを50ポイント取得する",
          detail: "有効期間5年のうちに。学習時間30分＝0.5ポイント（協会・士会の研修会、eラーニング）。余ったポイントは繰り越せません",
          url: `${BASE}/points/`,
          auto: { type: "points", need: 50 },
        },
        {
          key: "renewal-training",
          label: "更新時研修を受講する",
          detail: "eラーニング・受講費無料。マイページから申込（対象の年度は、協会の案内で確認）",
          url: `${BASE}/registered/`,
        },
      ],
      notes: [
        "更新は、最終年度の3月末に自動で行われます（申請は不要）。",
        "ポイントはカリキュラムコードごとに数えられ、同じコードの活動は、重複して加算されないことがあります。",
      ],
    };
  }

  if (kind === "certified" && mode === "acquire") {
    return {
      points: null,
      cycleYears: 5,
      items: [
        { key: "pre", label: "登録理学療法士であること（前提）", url: `${BASE}/nintei/` },
        {
          key: "shitei",
          count: { total: 12, unit: "コマ" },
          label: "指定研修カリキュラムを受講する",
          detail: "全分野共通。12コマ（1コマ90分、計18時間）の本会eラーニング。受講費12,000円（税別）。同じ年度内に全コマ",
          url: `${BASE}/nintei/`,
        },
        {
          key: "rinsho",
          count: { total: 20, unit: "コマ" },
          label: `臨床認定カリキュラム${f}を受講する（20コマ以上）`,
          detail: "分野別。必須15コマ＋選択5コマ以上。教育機関に申し込み（費用・形式は機関ごと）。申請の前年度までに完了",
          url: `${BASE}/certif-specialized/nintei_curriculum/`,
        },
        {
          key: "taikai",
          count: { total: 2, unit: "日" },
          label: "日本理学療法学術研修大会に、全日程参加する",
          detail: "基本は2日間すべて。発表は不要。例年5〜6月ごろ（士会・ブロックの学会は対象外）",
          url: `${BASE}/nintei/`,
        },
        {
          key: "apply",
          label: "認定の申請をする",
          detail: "例年8月。申請料は1分野10,000円（税別）。同時に申請できるのは3分野まで",
          url: `${BASE}/nintei/`,
        },
        {
          key: "exam",
          label: `認定試験に合格する${f}`,
          detail: "例年12月。マークシート五者択一（共通9問＋分野15問）。合格発表は例年2月末",
          url: `${BASE}/nintei/`,
        },
      ],
      notes: ["各要件の有効期限は、履修日から5年間です。"],
    };
  }

  if (kind === "certified") {
    return {
      points: 100,
      cycleYears: 5,
      items: [
        {
          key: "points",
          label: `維持・研鑽活動で100点を取得する${f}`,
          detail: "分野ごとに100点。学会参加・研修会・発表・論文・査読など（点数表は下の「点数の目安」）。登録理学療法士の更新ポイントとは重複して使えません",
          url: `${BASE}/points/`,
          auto: { type: "points", need: 100 },
        },
        {
          key: "renewal-training",
          label: "更新時研修を受講する",
          count: { total: 5, unit: "コマ" },
          detail: "共通4コマ＋分野別1コマ（計5コマ・5時間）の本会eラーニング。1分野5,000円（税別）",
          url: `${BASE}/nintei/`,
        },
        {
          key: "apply",
          label: "更新申請をする",
          detail: "例年1月中。申請料は1分野10,000円（税別）。入金が確認できないと失効",
          url: `${BASE}/nintei/`,
        },
      ],
      notes: ["2027年度の更新から、学会発表・論文投稿は不要になりました（協会の案内による）。", "活動の期間は、取得・更新年度の4月から、申請のときまでです。"],
    };
  }

  if (kind === "specialist" && mode === "acquire") {
    return {
      points: null,
      cycleYears: 5,
      items: [
        { key: "pre", label: "登録理学療法士であること（前提）", url: `${BASE}/senmon/` },
        {
          key: "shitei",
          count: { total: 12, unit: "コマ" },
          label: "指定研修カリキュラムを受講する",
          detail: "全分野共通。12コマ（計18時間）の本会eラーニング。受講費12,000円（税別）。同じ年度内に全コマ",
          url: `${BASE}/senmon/`,
        },
        {
          key: "block",
          label: "ブロック主催の学術大会に参加する",
          detail: "申込のとき、履修目的で「専門理学療法士新規取得」を選ぶこと。発表は不要",
          url: `${BASE}/senmon/`,
        },
        {
          key: "pref",
          label: "都道府県士会主催の学術大会に参加する",
          detail: "同じく、履修目的で「専門理学療法士新規取得」を選ぶこと",
          url: `${BASE}/senmon/`,
        },
        {
          key: "present",
          label: "学会連合の会員団体主催の学術大会で、筆頭演者として発表する",
          detail: "口述・ポスターのどちらでも可。共同演者は対象外",
          url: `${BASE}/senmon/`,
          auto: {
            type: "count",
            categories: ["conference"],
            need: 1,
            note: "「学会発表」の実績が1件以上あれば、達成と数えます（筆頭演者かは、ご自身で確認してください）",
          },
        },
        {
          key: "paper",
          label: "査読付きの原著論文が、掲載・採択される",
          detail: "協会が指定した英文雑誌A・B、または和文雑誌。システマティックレビューは対象外",
          url: `${BASE}/certif-specialized/ronbungyouseki/`,
          auto: {
            type: "count",
            categories: ["paper"],
            need: 1,
            note: "「論文」の実績が1件以上あれば、達成と数えます（協会の指定雑誌かは、ご自身で確認してください）",
          },
        },
        {
          key: "portfolio",
          label: "ショーケースポートフォリオ（事例1つ）をつくる",
          detail: "自分が主体的に経験した事例。記載例とフォーマットは協会のページにあります",
          url: `${BASE}/senmon/`,
        },
        {
          key: "apply-exam",
          label: `申請して、口頭試問に合格する${f}`,
          detail: "申請は例年8月（1分野10,000円・税別）。口頭試問は例年12月（発表10分以内＋質疑20分）",
          url: `${BASE}/senmon/`,
        },
      ],
      notes: ["要件②〜④は、申請日までにマイページへの履修登録が完了している必要があります（反映に数か月かかることがあります）。"],
    };
  }

  // 専門 更新
  return {
    points: 100,
    cycleYears: 5,
    items: [
      {
        key: "academic",
        label: "学術活動を1つ行う（更新の必須要件）",
        detail: "筆頭著者の論文投稿、または、ブロック・都道府県士会・学会連合の会員団体の学術大会での一般発表（筆頭演者）。採択日か発行日が、活動期間内であること",
        url: `${BASE}/senmon/`,
        auto: {
          type: "count",
          categories: ["conference", "paper"],
          need: 1,
          note: "「学会発表」か「論文」の実績が1件以上あれば、達成と数えます（筆頭かは、ご自身で確認してください）。この活動は、下の100点には、同じものを使えません",
        },
      },
      {
        key: "points",
        label: `維持・研鑽活動で100点を取得する${f}`,
        detail: "分野ごとに100点（学会参加・研修会・発表・論文・査読など。点数表は下の「点数の目安」）。登録理学療法士の更新ポイントとは重複して使えません",
        url: `${BASE}/points/`,
        auto: { type: "points", need: 100 },
      },
      {
        key: "renewal-training",
        label: "更新時研修を受講する",
          count: { total: 5, unit: "コマ" },
        detail: "共通4コマ＋分野別1コマ（計5コマ・5時間）の本会eラーニング。1分野5,000円（税別）",
        url: `${BASE}/senmon/`,
      },
      {
        key: "apply",
        label: "更新申請をする",
        detail: "例年1月中。申請料は1分野10,000円（税別）",
        url: `${BASE}/senmon/`,
      },
    ],
    notes: ["活動の期間は、取得・更新年度の4月から、申請のときまでです。"],
  };
}

// 点数の目安（認定・専門の更新。協会「更新に関わる点数基準」2026年4月更新）
export const POINT_GUIDE: { label: string; points: string }[] = [
  { label: "学会・学術大会への参加（士会・ブロック・学会連合）", points: "開催時間がそのまま点数（1時間＝1点）" },
  { label: "協会・士会・ブロック主催の研修会、eラーニング", points: "30分＝0.5点（1日8時間なら8点）" },
  { label: "論文（筆頭著者）英文雑誌A（IFあり）", points: "80点" },
  { label: "論文（筆頭著者）英文雑誌B", points: "60点" },
  { label: "論文（筆頭著者）協会が指定した和文雑誌", points: "40点" },
  { label: "学術大会での一般発表（筆頭演者）", points: "20点" },
  { label: "学術大会での講演・シンポジスト・パネリスト", points: "20点" },
  { label: "研修会の講師・シンポジスト・パネリスト", points: "20点" },
  { label: "学術大会の座長／研修会・症例検討会の座長", points: "10点" },
  { label: "士会承認研修会の講師", points: "10点" },
  { label: "学術雑誌の論文査読", points: "10点" },
  { label: "学術大会の演題査読（担当まとめて1件）", points: "5点" },
];

export type RequirementStatus = {
  req: Requirement;
  done: boolean;
  // 数える項目（コマ数など）の、いまの数と必要な数。ポイント・実績から自動で数える項目も、ここに入る
  progress: { value: number; need: number; unit: string } | null;
  // 自動で数えた現在の値（ポイントや件数）。手動の項目は null
  value: number | null;
  need: number | null;
  // 「あと何をすればいいか」の一文
  next: string;
};

type TargetLike = {
  kind: QualificationKind;
  mode: QualificationMode;
  field: string | null;
  cycle_start: string;
  renewal_years: number;
  checklist: Record<string, boolean | number> | null;
};

export function evaluateRequirements(
  target: TargetLike,
  achievements: Achievement[],
): { statuses: RequirementStatus[]; doneCount: number; total: number } {
  const set = requirementsFor(target.kind, target.mode, target.field);
  const start = new Date(target.cycle_start);
  const end = new Date(start);
  end.setFullYear(end.getFullYear() + target.renewal_years);

  // 更新は、サイクルの期間の実績だけ。取得は、期間を決めず、すべての実績を見る
  const inCycle = achievements.filter((a) => {
    if (target.mode === "acquire") return true;
    const on = new Date(a.achieved_on);
    return on >= start && on <= end;
  });

  const statuses = set.items.map((req): RequirementStatus => {
    const raw = target.checklist?.[req.key];
    const checked = raw === true;

    if (req.auto?.type === "points") {
      const value = inCycle.reduce((sum, a) => sum + (a.points || 0), 0);
      const done = checked || value >= req.auto.need;
      const left = Math.max(0, req.auto.need - value);
      return {
        req,
        done,
        progress: { value, need: req.auto.need, unit: "点" },
        value,
        need: req.auto.need,
        next: done ? "達成" : `あと${Math.round(left * 10) / 10}点（研修・学会参加・発表などを記録して、ポイントを入れてください）`,
      };
    }

    if (req.auto?.type === "count") {
      const cats = req.auto.categories;
      const value = inCycle.filter((a) => cats.includes(a.category)).length;
      const done = checked || value >= req.auto.need;
      return {
        req,
        done,
        progress: { value, need: req.auto.need, unit: "件" },
        value,
        need: req.auto.need,
        next: done ? "達成" : "まだ記録がありません（実績を記録すると、自動で数えます）",
      };
    }

    if (req.count) {
      const value = Math.max(0, Math.min(req.count.total, Number(raw) || 0));
      const done = value >= req.count.total;
      return {
        req,
        done,
        progress: { value, need: req.count.total, unit: req.count.unit },
        value,
        need: req.count.total,
        next: done ? "完了" : `あと${req.count.total - value}${req.count.unit}`,
      };
    }

    return { req, done: checked, progress: null, value: null, need: null, next: checked ? "完了" : "完了したら、チェックしてください" };
  });

  return { statuses, doneCount: statuses.filter((s) => s.done).length, total: statuses.length };
}

// 目標の名前（一覧・公開プロフィール用）
export function targetName(kind: QualificationKind, mode: QualificationMode, field: string | null) {
  const base = field ? `${KIND_LABEL[kind]}（${field}）` : KIND_LABEL[kind];
  return `${base}・${mode === "acquire" ? "取得" : "更新"}`;
}
