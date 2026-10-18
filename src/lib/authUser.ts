import { supabase } from "@/lib/supabase";

// 端末のセッションから、ログイン中のユーザーを返す（Authサーバーへ問い合わせない）。
// 画面の出し分け・自分のIDの取得用。本人確認が必要な処理（管理画面・アカウント削除）は getUser() を使う。
// データの保護は、DBの権限（RLS）で行っている
export async function getLocalUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return { data: { user: session?.user ?? null } };
}
