import { createClient } from "@supabase/supabase-js";

// サーバー側（generateMetadata・sitemap 生成）で、ログイン不要な公開データだけを
// 読むための軽量クライアント。セッションの保持・URL検知は行わない。
export const supabasePublic = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { auth: { persistSession: false, autoRefreshToken: false } }
);
