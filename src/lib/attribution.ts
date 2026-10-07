// どのリンク（Instagramの投稿・広告・友達の紹介など）から来た人が登録したかを、運営が集計するための記録。
// 外部の解析ツール・広告ピクセルは使わない。リンクの ?utm_source= などを、この端末（localStorage）に最初の1回だけ覚えておき、
// 登録のときに、その人のアカウント情報（auth.users の user_metadata）へ、いっしょに保存する。

const KEY = "relight_attribution";

export type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  // 最初に開いたページ（パスだけ。クエリは含めない）
  signup_landing?: string;
};

// 値は、英数字と一部の記号だけ・60文字まで（広告名など）
function clean(value: string | null): string | undefined {
  if (!value) return undefined;
  const v = value.trim().slice(0, 60).replace(/[^\w.\-~:+ ]/g, "");
  return v || undefined;
}

export function captureAttribution() {
  if (typeof window === "undefined") return;

  try {
    // 最初に来たときのものだけ残す（あとから別のリンクを開いても上書きしない）
    if (window.localStorage.getItem(KEY)) return;

    const q = new URLSearchParams(window.location.search);
    const utm_source = clean(q.get("utm_source"));

    // UTMのないふつうの訪問は、記録しない（何も保存しない）
    if (!utm_source) return;

    const data: Attribution = {
      utm_source,
      utm_medium: clean(q.get("utm_medium")),
      utm_campaign: clean(q.get("utm_campaign")),
      utm_content: clean(q.get("utm_content")),
      signup_landing: window.location.pathname.slice(0, 80),
    };

    window.localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    // 保存できない環境（プライベートモード等）では何もしない
  }
}

export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};

  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
}
