import { supabase } from "@/lib/supabase";

// 「最後に使った日」を、1日に1回だけ記録する（しばらく使っていない人への、お知らせの判断に使う）。
// 端末に「今日記録した」と覚えておき、同じ日は、通信しない。失敗しても、何もしない。
const KEY = "relight_last_seen_day";

export function touchLastSeen() {
  try {
    const today = new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 10);
    if (localStorage.getItem(KEY) === today) return;
    localStorage.setItem(KEY, today);
    void supabase.rpc("touch_last_seen").then(() => {}, () => {});
  } catch {
    // 保存できない環境では、記録しない
  }
}
