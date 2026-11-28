import { supabasePublic } from "@/lib/supabasePublic";
import type { GuideSite } from "@/components/paper-search/PaperSiteFrame";

// 職場口コミの単体サイト（/kuchikomi）。ログインなしで読めるのは、各施設の新しい口コミ3件まで。
// 4件目以降は、Re:lightに登録（ログイン）すると読める。件数は、DB（get_hospital_reviews）側で絞る。
export const FREE_REVIEW_LIMIT = 3;

// 登録の入口。from=kuchikomi のとき、登録画面は、職種（理学療法士・作業療法士・言語聴覚士）を選ぶ形になる
export const KUCHIKOMI_REGISTER = "/kuchikomi/register?utm_source=kuchikomi&utm_medium=web&utm_campaign=kuchikomi";

// 登録のあとに戻すのは、施設を決めて来た場合だけ（それ以外は、職場を探す画面へ進む）
export function facilityReturnPath(path: string | null): string | null {
  return path && /^\/kuchikomi\/[0-9a-f-]{36}(\/write)?(\?[\w=&-]*)?$/i.test(path) ? path : null;
}

export const KUCHIKOMI_SITE: GuideSite = {
  brand: "リハ職の本音",
  href: "/kuchikomi",
  register: KUCHIKOMI_REGISTER,
  blurb: "が運営しています。",
  audience: "理学療法士・作業療法士・言語聴覚士・学生",
  links: [{ href: "/kuchikomi", label: "施設を探す" }],
  footerLinks: [
    { href: "/kuchikomi", label: "施設を探す" },
    { href: "/kuchikomi/write", label: "口コミを書く" },
    { href: "/contact", label: "お問い合わせ" },
    { href: "/terms", label: "利用規約" },
    { href: "/privacy", label: "プライバシーポリシー" },
  ],
  note: "口コミは、個人の感想です。個人情報や、患者さんが特定される情報は、書かないでください。",
};

export type ReviewStats = {
  review_count: number;
  avg_overall: number | null;
  avg_work_environment: number | null;
  avg_education_system: number | null;
  avg_salary: number | null;
  avg_overtime: number | null;
  avg_paid_leave: number | null;
  avg_openness: number | null;
};

// 件数と平均点（ログインなしでも返る集計値）
export async function getReviewStats(hospitalId: string): Promise<ReviewStats | null> {
  const { data } = await supabasePublic.rpc("get_hospital_review_stats", { p_hospital: hospitalId });
  const row = (Array.isArray(data) ? data[0] : data) as Record<string, number | string | null> | undefined;
  if (!row) return null;
  const n = (v: number | string | null | undefined) => (v == null ? null : Number(v));
  return {
    review_count: Number(row.review_count ?? 0),
    avg_overall: n(row.avg_overall),
    avg_work_environment: n(row.avg_work_environment),
    avg_education_system: n(row.avg_education_system),
    avg_salary: n(row.avg_salary),
    avg_overtime: n(row.avg_overtime),
    avg_paid_leave: n(row.avg_paid_leave),
    avg_openness: n(row.avg_openness),
  };
}

export type ReviewedHospital = {
  id: string;
  name: string;
  prefecture: string | null;
  city: string | null;
  facility_type: string | null;
  review_count: number;
  avg_overall: number | null;
  last_at: string | null;
};

// 口コミのある施設（件数の多い順）
export async function listReviewedHospitals(limit = 24, prefecture?: string): Promise<ReviewedHospital[]> {
  const { data } = await supabasePublic.rpc("list_reviewed_hospitals", { p_prefecture: prefecture ?? null, p_limit: limit, p_offset: 0 });
  return ((data ?? []) as Record<string, unknown>[]).map((r) => ({
    id: r.id as string,
    name: r.name as string,
    prefecture: (r.prefecture as string | null) ?? null,
    city: (r.city as string | null) ?? null,
    facility_type: (r.facility_type as string | null) ?? null,
    review_count: Number(r.review_count ?? 0),
    avg_overall: r.avg_overall == null ? null : Number(r.avg_overall),
    last_at: (r.last_at as string | null) ?? null,
  }));
}

// 探せる施設の種類（DBに入っている15種類。2026-11-17に確認）。category/type は、hospitals の facility_category / facility_type。
// 「病院」は facility_type が空（null）のもの。type に "__hospital" を入れて表す
export const HOSPITAL_TYPE = "__hospital";
export const FACILITY_KINDS: { label: string; category: string; type: string }[] = [
  { label: "病院", category: "病院・医療機関", type: HOSPITAL_TYPE },
  { label: "クリニック・診療所", category: "病院・医療機関", type: "クリニック・診療所" },
  { label: "介護老人保健施設（老健）", category: "介護・高齢者福祉施設", type: "介護老人保健施設（老健）" },
  { label: "特別養護老人ホーム（特養）", category: "介護・高齢者福祉施設", type: "特別養護老人ホーム（特養）" },
  { label: "介護医療院", category: "介護・高齢者福祉施設", type: "介護医療院" },
  { label: "デイケア", category: "介護・高齢者福祉施設", type: "デイケア" },
  { label: "デイサービス", category: "介護・高齢者福祉施設", type: "デイサービス" },
  { label: "有料老人ホーム", category: "介護・高齢者福祉施設", type: "有料老人ホーム" },
  { label: "訪問リハビリ", category: "訪問・在宅分野", type: "訪問リハビリテーション事業所" },
  { label: "訪問看護ステーション", category: "訪問・在宅分野", type: "訪問看護ステーション" },
  { label: "児童発達支援", category: "小児・障害福祉分野", type: "児童発達支援事業所" },
  { label: "放課後等デイサービス", category: "小児・障害福祉分野", type: "放課後等デイサービス" },
  { label: "障害者支援施設", category: "小児・障害福祉分野", type: "障害者支援施設" },
  { label: "障害福祉サービス事業所", category: "小児・障害福祉分野", type: "障害福祉サービス事業所" },
  { label: "重症心身障害児・者施設", category: "小児・障害福祉分野", type: "重症心身障害児・者施設" },
];

// 施設の種類のボタンから、検索欄へ知らせるイベント
export const KIND_EVENT = "kuchikomi:kind";
