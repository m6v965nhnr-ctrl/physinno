import type { Candidate, PrefSite, Seminar } from "./parsers.ts";
import {
  candidateToSeminar,
  collectCandidates,
  discoverListPages,
  extractLabeledDate,
  findGoogleCalendarIds,
  findPdfLink,
  icsUrl,
  parseIcs,
  titleDateRange,
} from "./parsers.ts";

export type PrefDeps = {
  today: string;
  fetchText: (url: string) => Promise<{ text: string; url: string }>;
  fetchBytes: (url: string) => Promise<Uint8Array>;
  pdfToText: (bytes: Uint8Array) => Promise<string>;
  // all: すべて / articles: 記事・PDFのみ / calendar: 公開Googleカレンダーのみ
  // （SupabaseのEdge FunctionからはGoogleカレンダーが429で取れないため、Vercel側で取得する）
  mode?: "all" | "articles" | "calendar";
};

const MAX_CANDIDATES = 25;
const MAX_PDFS = 6;
const MAX_CALENDARS = 6;

// 1つの士会サイトから研修・イベントを集める。
// 日付は「タイトル → 詳細ページの見出し → 詳細ページのPDF → 公開Googleカレンダー」の順に探す。
export async function syncPrefSite(site: PrefSite, deps: PrefDeps) {
  const { today } = deps;
  const mode = deps.mode ?? "all";
  const rows: Seminar[] = [];
  const stat = { candidates: 0, found: 0, pdf: 0, calendar: 0 };

  const top = await deps.fetchText(site.url);
  const candidates = new Map<string, Candidate>();
  const calendarIds = new Map<string, string>(); // id -> 掲載ページURL

  const scan = (html: string, url: string) => {
    for (const c of collectCandidates(html, url)) candidates.set(c.href, c);
    for (const id of findGoogleCalendarIds(html)) if (!calendarIds.has(id)) calendarIds.set(id, url);
  };

  scan(top.text, top.url);

  for (const u of discoverListPages(top.text, top.url, 6)) {
    try {
      const page = await deps.fetchText(u);
      scan(page.text, page.url);
    } catch (_e) {
      // 一覧ページが取得できなくても続行
    }
  }

  stat.candidates = candidates.size;

  // ---- 公開Googleカレンダー ----
  for (const [id, pageUrl] of mode === "articles" ? [] : [...calendarIds].slice(0, MAX_CALENDARS)) {
    try {
      const bytes = await deps.fetchBytes(icsUrl(id));
      const events = parseIcs(new TextDecoder().decode(bytes), site, pageUrl, today);
      rows.push(...events);
      stat.calendar += events.length;
    } catch (_e) {
      // 非公開カレンダーなど
    }
  }

  // ---- 記事・PDF ----
  if (mode === "calendar") return { rows, stat };

  const list = [...candidates.values()].slice(0, MAX_CANDIDATES);
  let pdfBudget = MAX_PDFS;

  const readPdf = async (url: string) => {
    if (pdfBudget <= 0) return null;
    pdfBudget--;
    try {
      const bytes = await deps.fetchBytes(url);
      if (bytes.length > 4_000_000) return null;
      return await deps.pdfToText(bytes);
    } catch (_e) {
      return null;
    }
  };

  // タイトルだけで日付が分かるものを先に確定し、残りを詳細ページで確認する
  const pending: Candidate[] = [];
  for (const c of list) {
    const range = titleDateRange(c.text, today);
    if (range) {
      if (range.end >= today) {
        rows.push(candidateToSeminar(c, range, null, site));
        stat.found++;
      }
    } else {
      pending.push(c);
    }
  }

  // 詳細ページ（HTML）は並列で取得
  const htmlResults = await Promise.all(
    pending.map(async (c) => {
      if (/\.pdf(\?|#|$)/i.test(c.href)) return { c, html: null as string | null, url: c.href };
      try {
        const d = await deps.fetchText(c.href);
        return { c, html: d.text, url: d.url };
      } catch (_e) {
        return { c, html: null, url: c.href };
      }
    })
  );

  // PDFは1件ずつ順番に処理（CPU負荷を抑える）
  for (const { c, html, url } of htmlResults) {
    let range = null as ReturnType<typeof titleDateRange>;
    let dateText: string | null = null;

    if (html) {
      const labeled = extractLabeledDate(html, today);
      if (labeled) {
        range = labeled.range;
        dateText = labeled.dateText;
      }
    }

    if (!range) {
      const pdfUrl = /\.pdf(\?|#|$)/i.test(url) ? url : html ? findPdfLink(html, url) : null;
      if (pdfUrl) {
        const text = await readPdf(pdfUrl);
        if (text) {
          stat.pdf++;
          const labeled = extractLabeledDate(text, today);
          if (labeled) {
            range = labeled.range;
            dateText = labeled.dateText;
          }
        }
      }
    }

    if (range && range.end >= today) {
      rows.push(candidateToSeminar(c, range, dateText, site));
      stat.found++;
    }
  }

  return { rows, stat };
}
