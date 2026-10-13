import { supabase } from "@/lib/supabase";

// 運営（admin_users）のアカウントかどうか。自分の行だけ読める（RLS）。画面遷移のたびに問い合わせないよう、ユーザーごとに覚える。
let cache: { userId: string; admin: boolean } | null = null;

export async function isAdminUser(userId: string): Promise<boolean> {
  if (cache && cache.userId === userId) return cache.admin;

  const { data, error } = await supabase.from("admin_users").select("user_id").eq("user_id", userId).limit(1);
  // 確認できなかったとき（通信エラーなど）は、覚えない。運営ではない扱いで、通常の画面になる
  if (error) return false;

  cache = { userId, admin: Boolean(data && data.length > 0) };
  return cache.admin;
}

export function clearAdminCache() {
  cache = null;
}
