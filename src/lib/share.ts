import { notify } from "@/lib/notify";
import { SITE_URL } from "@/lib/site";

// 共有するリンクに、どこから来たか分かる印（utm）を付ける
export function shareUrl(path: string, medium: string, campaign?: string) {
  const u = new URL(path, SITE_URL);
  u.searchParams.set("utm_source", "share");
  u.searchParams.set("utm_medium", medium);
  if (campaign) u.searchParams.set("utm_campaign", campaign);
  return u.toString();
}

// スマホの共有メニュー。使えない環境ではリンクをコピーする
export async function shareContent({ title, text, url }: { title: string; text: string; url: string }) {
  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({ title, text, url });
      return;
    } catch {
      // キャンセルされたときなどは、コピーにする
    }
  }

  try {
    await navigator.clipboard.writeText(`${text}\n${url}`);
    notify("共有用の文章とリンクをコピーしました");
  } catch {
    notify("コピーに失敗しました。手動でリンクを選択してください");
  }
}
