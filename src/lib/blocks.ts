import { supabase } from "@/lib/supabase";

// ブロック（App Store の審査で求められる）。ブロックした人の投稿・メッセージなどは、データベース側で表示から除かれる。
// 戻り値: エラーメッセージ（成功なら null）
export async function blockUser(userId: string): Promise<string | null> {
  const { error } = await supabase.rpc("block_user", { p_user: userId });
  return error ? "ブロックできませんでした。時間をおいてもう一度お試しください" : null;
}

export async function unblockUser(userId: string): Promise<string | null> {
  const { error } = await supabase.rpc("unblock_user", { p_user: userId });
  return error ? "ブロックを解除できませんでした。時間をおいてもう一度お試しください" : null;
}

export type BlockedUser = { user_id: string; full_name: string | null; created_at: string };

export async function listMyBlocks(): Promise<BlockedUser[]> {
  const { data } = await supabase.rpc("list_my_blocks");
  return (data as BlockedUser[] | null) ?? [];
}
