"use client";

import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";
import { filterAnalyticsUrl } from "@/lib/analyticsFilter";

// アクセスの集計（どのページが何回見られたか）。Cookieを使わず、個人を特定しない（Vercel Web Analytics）。
// 何を送るかは、analyticsFilter.ts で決める（公開ページだけ・検索語なし）。
function beforeSend(event: BeforeSendEvent): BeforeSendEvent | null {
  const url = filterAnalyticsUrl(event.url);
  return url ? { ...event, url } : null;
}

export default function SiteAnalytics() {
  return <Analytics beforeSend={beforeSend} />;
}
