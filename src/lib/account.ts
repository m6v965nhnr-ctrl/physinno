import { supabase } from "@/lib/supabase";

export type AccountType = "pt" | "general";

export const ACCOUNT_TYPE_LABEL: Record<AccountType, string> = {
  pt: "PT",
  general: "一般",
};

// 一般ユーザーが開けないページ（PT同士のコミュニティ機能）
export const PT_ONLY_PATH_PREFIXES = [
  "/home",
  "/posts",
  "/profile/edit",
  "/mypage/edit",
  "/mypage/achievements",
];

export function isPtOnlyPath(pathname: string) {
  return PT_ONLY_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

// ログイン中ユーザーのアカウント種類を取得（未設定なら null）
export async function getMyAccountType(
  userId: string
): Promise<AccountType | null> {
  const { data } = await supabase
    .from("users")
    .select("account_type")
    .eq("id", userId)
    .maybeSingle();

  const type = data?.account_type;

  return type === "pt" || type === "general" ? type : null;
}

// 本人のアカウント種類を変更（DB関数 set_my_account_type）
export async function setMyAccountType(type: AccountType) {
  const { error } = await supabase.rpc("set_my_account_type", {
    p_type: type,
  });

  return error ? error.message : null;
}
