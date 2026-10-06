import { supabase } from "@/lib/supabase";

// 初回プロフィール登録（必須項目の入力）が済んでいるかの確認。
// 一度確認できたら、このタブの中では再確認しない（画面遷移のたびに問い合わせないため）
let onboardedCache: string | null = null;

export function markOnboarded(userId?: string) {
  if (userId) onboardedCache = userId;
  else onboardedCache = "__current__";
}

export async function isOnboarded(userId: string): Promise<boolean> {
  if (onboardedCache === userId || onboardedCache === "__current__") return true;

  const { data } = await supabase
    .from("pt_profiles")
    .select("onboarded_at")
    .eq("user_id", userId)
    .maybeSingle();

  if (data?.onboarded_at) {
    onboardedCache = userId;
    return true;
  }
  return false;
}

// 初回登録が済むまでも開けるページ（入力画面そのものと、規約・問い合わせなど）
const ALLOWED_BEFORE_ONBOARDING = ["/mypage/edit", "/contact", "/terms", "/privacy"];

export function isAllowedBeforeOnboarding(pathname: string) {
  return ALLOWED_BEFORE_ONBOARDING.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );
}
