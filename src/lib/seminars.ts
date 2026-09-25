import { supabase } from "@/lib/supabase";

// 研修・学会情報（public.seminars）。毎日 0:00(JST) に自動更新される。
export type Seminar = {
  id: string;
  source: string;
  source_label: string;
  title: string;
  organizer: string | null;
  kind: string;
  start_date: string;
  end_date: string;
  date_text: string | null;
  format: "online" | "offline" | "hybrid" | null;
  prefecture: string | null;
  region: string | null;
  fee_text: string | null;
  fee_yen: number | null;
  is_free: boolean;
  fields: string[];
  summary: string | null;
  url: string;
  seen_at: string;
};

export const REGIONS: Record<string, string[]> = {
  北海道: ["北海道"],
  東北: ["青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県"],
  関東: ["茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県"],
  中部: ["新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県", "静岡県", "愛知県"],
  近畿: ["三重県", "滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県"],
  中国: ["鳥取県", "島根県", "岡山県", "広島県", "山口県"],
  四国: ["徳島県", "香川県", "愛媛県", "高知県"],
  "九州・沖縄": ["福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"],
};

export const KINDS = ["学術大会・学会", "研修会", "講習会", "講義", "セミナー", "イベント"];

export const FIELDS = [
  "運動器・整形",
  "神経系",
  "内部障害",
  "小児・発達",
  "地域・高齢者",
  "スポーツ",
  "教育・研究・管理",
  "その他",
];

export const FORMAT_LABEL: Record<string, string> = {
  online: "オンライン",
  offline: "対面",
  hybrid: "対面・オンライン併用",
};

// ローカル日付を YYYY-MM-DD に
export function toISODate(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function formatDateJa(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const w = "日月火水木金土"[new Date(y, m - 1, d).getDay()];
  return `${y}年${m}月${d}日(${w})`;
}

export function dateRangeJa(s: Seminar) {
  return s.start_date === s.end_date
    ? formatDateJa(s.start_date)
    : `${formatDateJa(s.start_date)} 〜 ${formatDateJa(s.end_date)}`;
}

function daysBetween(a: string, b: string) {
  return (new Date(b).getTime() - new Date(a).getTime()) / 86400000;
}

// カレンダー上でその日に「開催されている」とみなすか。
// 2週間を超える長期の講座は開始日にだけ表示する。
export function occursOn(s: Seminar, iso: string) {
  if (daysBetween(s.start_date, s.end_date) <= 14) {
    return s.start_date <= iso && iso <= s.end_date;
  }
  return s.start_date === iso;
}

// 今日以降に開催（または開催中）の研修・学会を、今日に近い順で取得
export async function listUpcomingSeminars() {
  const today = toISODate(new Date());
  const rows: Seminar[] = [];

  for (let from = 0; ; from += 1000) {
    const { data, error } = await supabase
      .from("seminars")
      .select("*")
      .gte("end_date", today)
      .order("start_date", { ascending: true })
      .order("id", { ascending: true })
      .range(from, from + 999);

    if (error || !data) break;
    rows.push(...(data as Seminar[]));
    if (data.length < 1000) break;
  }

  // 開催中のものは「今日」として扱い、近い順に並べる
  const key = (s: Seminar) => (s.start_date < today ? today : s.start_date);

  return rows.sort(
    (a, b) => key(a).localeCompare(key(b)) || a.start_date.localeCompare(b.start_date)
  );
}
