import { supabase } from "@/lib/supabase";

export type Org = {
  id: string;
  name: string;
  facility_category: string;
  facility_type: string | null;
  prefecture: string | null;
  city: string | null;
  website: string | null;
  description: string | null;
  logo_url: string | null;
  status: "pending" | "approved" | "rejected" | "suspended";
  review_note?: string | null;
  hospital_id?: string | null; // ひもづけた職場ページ（hospitals）
};

export const ORG_STATUS_LABEL: Record<Org["status"], string> = {
  pending: "運営が確認しています（承認されると、求人の公開とスカウトができます）",
  approved: "承認済み",
  rejected: "承認されませんでした",
  suspended: "停止中",
};

export type Job = {
  id: string;
  organization_id: string;
  title: string;
  employment_type: string | null;
  prefecture: string | null;
  city: string | null;
  salary_text: string | null;
  work_hours: string | null;
  holidays: string | null;
  description: string | null;
  requirements: string | null;
  benefits: string | null;
  status: "draft" | "open" | "closed";
  published_at: string | null;
  updated_at: string;
};

export const JOB_STATUS_LABEL: Record<Job["status"], string> = { draft: "下書き", open: "公開中", closed: "募集終了" };
export const EMPLOYMENT_TYPES = ["常勤", "非常勤", "パート", "業務委託", "その他"];
export const ORG_COLUMNS = "id, name, facility_category, facility_type, prefecture, city, website, description, logo_url, status";

export type ScoutRow = {
  id: string;
  role: "pt" | "org";
  org_name: string;
  pt_user_id: string;
  pt_name: string;
  job_title: string | null;
  status: "open" | "declined";
  last_message_at: string;
  unread: boolean;
  last_body: string | null;
};
export type ScoutMessage = { id: string; sender_id: string; body: string; created_at: string };

export const SCOUT_ERROR: Record<string, string> = {
  org_not_approved: "組織が、運営に承認されるまで、スカウトは送れません",
  bad_body: "メッセージは、10文字以上（返信は1文字以上）、2,000文字以内で書いてください",
  not_accepting: "この方は、スカウトを受け付けていません",
  declined: "この方は、スカウトを辞退されています",
  already_sent: "まだ返信がないため、続けては送れません。返信があるまで、お待ちください",
  too_many: "短い間に、送りすぎています。しばらくたってから、お試しください",
  not_found: "見つかりませんでした",
};

export const fmtDate = (s: string | null) => (s ? new Date(s).toLocaleDateString("ja-JP", { year: "numeric", month: "numeric", day: "numeric" }) : "未掲載");

export async function myOrganization(): Promise<Org | null> {
  const { data } = await supabase.rpc("my_organization");
  return (data as Org | null) ?? null;
}

export async function rpcResult(fn: string, args: Record<string, unknown>): Promise<{ ok: boolean; id?: string; error?: string }> {
  const { data, error } = await supabase.rpc(fn, args);
  if (error) return { ok: false, error: "failed" };
  const d = data as { error?: string; id?: string } | null;
  if (d?.error) return { ok: false, error: d.error };
  return { ok: true, id: d?.id };
}
