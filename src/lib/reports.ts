import { supabase } from "@/lib/supabase";

export type ReportTargetType =
  | "post"
  | "comment"
  | "message"
  | "group_message"
  | "hospital_review"
  | "internship_review"
  | "student_question"
  | "student_answer"
  | "exam_note";

export type ReportReason =
  | "privacy"
  | "defamation"
  | "false_info"
  | "harassment"
  | "copyright"
  | "spam"
  | "other";

export const REPORT_REASON_LABEL: Record<ReportReason, string> = {
  privacy: "患者さんや個人が特定できる情報が含まれている",
  defamation: "名誉毀損・誹謗中傷・事実と異なる内容",
  false_info: "資格や経歴などの虚偽",
  harassment: "嫌がらせ・脅迫・差別",
  copyright: "著作権などの権利を侵害している",
  spam: "宣伝・勧誘・スパム",
  other: "その他",
};

export const REPORT_REASONS = Object.keys(REPORT_REASON_LABEL) as ReportReason[];

export const REPORT_TARGET_LABEL: Record<ReportTargetType, string> = {
  post: "投稿",
  comment: "コメント",
  message: "メッセージ",
  group_message: "グループのメッセージ",
  hospital_review: "口コミ",
  internship_review: "実習生の声",
  student_question: "質問",
  student_answer: "回答",
  exam_note: "試験メモ",
};

// 戻り値: エラーメッセージ(成功なら null)
export async function submitReport(params: {
  targetType: ReportTargetType;
  targetId: string;
  reason: ReportReason;
  detail: string;
}): Promise<string | null> {
  const { error } = await supabase.from("reports").insert({
    target_type: params.targetType,
    target_id: params.targetId,
    reason: params.reason,
    detail: params.detail.trim() || null,
  });

  if (!error) return null;
  if (error.code === "23505") return "この内容は、すでに通報を受け付けています";
  return "通報に失敗しました。時間をおいてもう一度お試しください";
}

// 運営用
export type AdminReport = {
  id: string;
  target_type: ReportTargetType;
  target_id: string;
  reason: ReportReason;
  detail: string | null;
  status: "open" | "resolved" | "dismissed";
  admin_note: string | null;
  created_at: string;
  reporter_email: string | null;
  snippet: string | null;
  link_path: string | null;
};

export async function listAdminReports(status: "open" | "resolved" | "dismissed" | "all") {
  const { data } = await supabase.rpc("admin_list_reports", { p_status: status });
  return (data || []) as AdminReport[];
}

export async function resolveAdminReport(
  id: string,
  action: "delete" | "resolve" | "dismiss",
  note?: string
): Promise<string | null> {
  const { error } = await supabase.rpc("admin_resolve_report", {
    p_id: id,
    p_action: action,
    p_note: note?.trim() || null,
  });
  return error ? error.message : null;
}
