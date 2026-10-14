// SNSのリンク（?utm_source= / ?utm_campaign=）から、トップページで最初に開くタブを決める。
// 学生向けの話題（国試）は「学生のみなさんへ」、PT向けの話題（論文・臨床）は「できること」、それ以外は「はじめに」。
export type LpEntrance = { tab: "start" | "features" | "student"; register: "pt" | "student" };

const STUDENT_CAMPAIGN = /^(quiz|kokushi|exam|student)(-|$)/;
const PT_CAMPAIGN = /^(memo|tips|paper|ai|clinical|evidence|hospital)(-|$)/;

export function pickLpEntrance(source?: string, campaign?: string): LpEntrance {
  const s = (source ?? "").toLowerCase();
  const c = (campaign ?? "").toLowerCase();
  if (STUDENT_CAMPAIGN.test(c) || (s === "tiktok" && !PT_CAMPAIGN.test(c))) return { tab: "student", register: "student" };
  if (PT_CAMPAIGN.test(c) || s === "x") return { tab: "features", register: "pt" };
  return { tab: "start", register: "pt" };
}
