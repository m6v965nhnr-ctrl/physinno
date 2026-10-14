// SNSのリンク（?utm_source= / ?utm_campaign=）から、トップページで最初に開くタブを決める。
// 学生向けの話題（国試）は「学生のみなさんへ」、PT向けの話題（論文・臨床・機能の紹介）とXのリンクは「できること」、それ以外は「はじめに」。
export type LpEntrance = { tab: "start" | "features" | "student"; register: "pt" | "student" };

const STUDENT_CAMPAIGN = /^(quiz|kokushi|exam|student)(-|$)/;
const PT_CAMPAIGN = /^(memo|tips|paper|ai|clinical|evidence|hospital|feature|portfolio|career|qual|idea|seminar|manga)(-|$)/;

export function pickLpEntrance(source?: string, campaign?: string): LpEntrance {
  const s = (source ?? "").toLowerCase();
  const c = (campaign ?? "").toLowerCase();
  // SNSの投稿は、すべてPT向け（2026-10-14〜）。TikTokのプロフィールなど、キャンペーンが不明でも、PT向けに案内する
  if (STUDENT_CAMPAIGN.test(c)) return { tab: "student", register: "student" };
  if (PT_CAMPAIGN.test(c) || s === "x" || s === "tiktok") return { tab: "features", register: "pt" };
  return { tab: "start", register: "pt" };
}
