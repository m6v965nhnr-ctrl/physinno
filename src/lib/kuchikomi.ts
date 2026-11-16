import { supabasePublic } from "@/lib/supabasePublic";
import type { GuideSite } from "@/components/paper-search/PaperSiteFrame";

// 職場口コミの単体サイト（/kuchikomi）。ログインなしで読めるのは、各施設の新しい口コミ3件まで。
// 4件目以降は、Re:lightに登録（ログイン）すると読める。件数は、DB（get_hospital_reviews）側で絞る。
export const FREE_REVIEW_LIMIT = 3;

export const KUCHIKOMI_REGISTER = "/register?type=pt&utm_source=kuchikomi&utm_medium=web&utm_campaign=kuchikomi";

export const KUCHIKOMI_SITE: GuideSite = {
  brand: "PTの職場口コミ",
  href: "/kuchikomi",
  register: KUCHIKOMI_REGISTER,
  blurb: "の、職場口コミの入口です。",
  links: [{ href: "/hospital-areas", label: "病院を探す" }],
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
