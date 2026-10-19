// アクセス集計に送る前の絞り込み。個人に結びつくページ（プロフィール・投稿・メッセージ・管理画面など）は、送らない（null）。
// 検索語などのクエリは外し、utm_ の印だけ残す（どのリンクから来たかを見るため）。
const COUNTED = /^\/(?:$|kokushi|paper-search|certified-pt|hospital-areas|job-hunting|columns|schools|evidence-levels|teachers|hospitals|register|login|terms|privacy|feedback|guest)(?:\/|$)/;

export function filterAnalyticsUrl(raw: string): string | null {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }
  if (!COUNTED.test(url.pathname)) return null;
  const kept = new URLSearchParams();
  url.searchParams.forEach((v, k) => {
    if (k.startsWith("utm_")) kept.set(k, v.slice(0, 80));
  });
  url.search = kept.toString();
  url.hash = "";
  return url.toString();
}
