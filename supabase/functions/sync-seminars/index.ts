// 研修・学会情報を各サイトから取得して public.seminars に保存する Edge Function。
// 毎日 0:00（JST）に pg_cron から分割して呼び出される（supabase/migrations 参照）。
//
//   ?job=ptotst&from=0&to=6   PT-OT-ST.NET の一覧ページ 0〜5（1ページ40件）
//   ?job=jpta                 日本理学療法士協会 セミナー検索（マイページ）
//   ?job=jpta-other           日本理学療法士協会 協会主催以外の研修会
//   ?job=jpta-nichiken        日本理学療法士協会 学術研修大会（全国）
//   ?job=pref&from=0&to=3     都道府県理学療法士会サイト（PREF_SITES の from〜to 番目）
//   ?job=pt-kanagawa          神奈川県理学療法士会 会員向け研修会・イベント
//   ?job=cleanup              終了済み・長期間取得できていない情報の削除

import { createClient } from "npm:@supabase/supabase-js@2";
import { extractText, getDocumentProxy } from "npm:unpdf@1.8.1";
import {
  Candidate,
  JPTA_SEARCH_URL,
  PREF_SITES,
  Seminar,
  candidateToSeminar,
  collectCandidates,
  discoverListPages,
  extractLabeledDate,
  extractAnchors,
  titleDateRange,
  jptaFormFields,
  jptaTotal,
  parseJptaNichiken,
  parseJptaOther,
  parseJptaSearch,
  parsePrefWordpress,
  parsePtOtSt,
} from "./parsers.ts";

// 記事ページに貼られたPDF（開催案内）へのリンク
function findPdfLink(html: string, pageUrl: string) {
  // サイト共通メニューにもPDFがあるため、記事内のもの（/info/ を含む、なければ最後）を選ぶ
  const pdfs = extractAnchors(html, pageUrl).filter((a) => /\.pdf(\?|$)/i.test(a.href));
  return (pdfs.find((a) => a.href.includes("/info/")) ?? pdfs[pdfs.length - 1])?.href ?? null;
}

// URL中の日付（/2026/09/04/）
function postDateFromUrl(url: string) {
  const m = url.match(/\/(\d{4})\/(\d{2})\/(\d{2})\//);
  return m ? `${m[1]}-${m[2]}-${m[3]}` : null;
}

const UA = "Mozilla/5.0 (compatible; RelightSeminarSync/1.0)";
// 一部の士会サイトはボット風のUAを拒否するため、ブラウザ相当のUAを使う
const BROWSER_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15";
const THROTTLE_MINUTES = 10;

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  { auth: { persistSession: false } }
);

function todayJst() {
  const jst = new Date(Date.now() + 9 * 3600 * 1000);
  return jst.toISOString().slice(0, 10);
}

async function getText(url: string, init: RequestInit = {}) {
  const res = await fetch(url, {
    ...init,
    headers: { "User-Agent": UA, "Accept-Language": "ja", ...(init.headers ?? {}) },
  });
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  return { text: await res.text(), res };
}

async function save(rows: Seminar[]) {
  const today = todayJst();
  const seenAt = new Date().toISOString();

  // 終了済みは保存しない。同じIDが重複しているとupsertが失敗するので除く。
  const unique = new Map<string, Seminar>();
  for (const r of rows) {
    if (r.end_date >= today) unique.set(r.id, r);
  }

  const payload = [...unique.values()].map((r) => ({ ...r, seen_at: seenAt }));

  for (let i = 0; i < payload.length; i += 200) {
    const { error } = await supabase
      .from("seminars")
      .upsert(payload.slice(i, i + 200), { onConflict: "id" });
    if (error) throw new Error(error.message);
  }

  return payload.length;
}

// ---------- 各サイト ----------
async function jobPtOtSt(from: number, to: number) {
  const rows: Seminar[] = [];

  for (let page = from; page < to; page++) {
    const url =
      page === 0
        ? "https://www.pt-ot-st.net/index.php/seminar"
        : `https://www.pt-ot-st.net/index.php/seminar?per_page=${page * 40}`;

    try {
      const { text } = await getText(url);
      rows.push(...parsePtOtSt(text));
    } catch (e) {
      // 最終ページを超えた場合など。続行する
      console.log("ptotst page skipped", page, String(e));
    }
  }

  return save(rows);
}

async function jobJpta() {
  const rows: Seminar[] = [];
  const today = new Date(Date.now() + 9 * 3600 * 1000);

  // 3か月ごとの窓で8回（約2年分）。1回の結果が100件を超えないようにする。
  for (let q = 0; q < 8; q++) {
    const st = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() + q * 3, q === 0 ? today.getUTCDate() : 1));
    const ed = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() + (q + 1) * 3, 0));

    const iso = (d: Date) => d.toISOString().slice(0, 10);

    try {
      const first = await getText(JPTA_SEARCH_URL);
      const cookie = (first.res.headers.getSetCookie?.() ?? [])
        .map((c) => c.split(";")[0])
        .join("; ");

      const override: Record<string, string> = {
        "Seminar[ymd_open_st]": iso(st),
        "Seminar[ymd_open_ed]": iso(ed),
        "Seminar[isDetailVisible]": "1",
      };

      const fields = jptaFormFields(first.text).filter(
        ([name]) =>
          !(name in override) &&
          name !== "Seminar[type_search]" &&
          name !== "Seminar[type_search][]" &&
          name !== "action"
      );

      const body = new URLSearchParams();
      for (const [k, v] of fields) body.append(k, v);
      for (const [k, v] of Object.entries(override)) body.append(k, v);
      body.append("Seminar[type_search]", "");
      body.append("Seminar[type_search][]", "0");
      body.append("Seminar[type_search][]", "1"); // 申込条件外・満員のセミナーも含める
      body.append("action", "next");

      const { text } = await getText(JPTA_SEARCH_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded", Cookie: cookie },
        body: body.toString(),
      });

      const parsed = parseJptaSearch(text);
      const total = jptaTotal(text);
      if (total > parsed.length) console.log("jpta window truncated", iso(st), total, parsed.length);
      rows.push(...parsed);
    } catch (e) {
      console.log("jpta window failed", q, String(e));
    }
  }

  return save(rows);
}

async function jobJptaOther() {
  const { text } = await getText("https://www.japanpt.or.jp/pt/seminar/other/list/");
  return save(parseJptaOther(text));
}

async function jobJptaNichiken() {
  const { text } = await getText("https://www.japanpt.or.jp/pt/seminar/browse/01/");
  return save(parseJptaNichiken(text));
}

async function jobPtKanagawa() {
  const rows: Seminar[] = [];

  for (const page of [1, 2, 3]) {
    const url =
      page === 1
        ? "https://pt-kanagawa.or.jp/members/membersevent/"
        : `https://pt-kanagawa.or.jp/members/membersevent/page/${page}/`;

    try {
      const { text } = await getText(url);
      rows.push(
        ...parsePrefWordpress(text, {
          idPrefix: "pt-kanagawa",
          label: "神奈川県理学療法士会",
          prefecture: "神奈川県",
          organizer: "公益社団法人 神奈川県理学療法士会",
        })
      );
    } catch (e) {
      console.log("kanagawa page skipped", page, String(e));
    }
  }

  return save(rows);
}

// 都道府県理学療法士会サイト: トップ＋研修・お知らせ一覧から候補を集め、
// タイトルに日付がなければ詳細ページの「開催日時」等から日付を取る
async function jobPref(from: number, to: number) {
  const today = todayJst();
  const rows: Seminar[] = [];
  const stats: Record<string, string> = {};

  for (const site of PREF_SITES.slice(from, to)) {
    // 大阪府は開催案内がPDFのため専用ジョブ（osaka）で取得する
    if (site.code === "osaka") continue;
    try {
      const fetchPage = async (u: string) => {
        const res = await fetch(u, {
          headers: { "User-Agent": BROWSER_UA, "Accept-Language": "ja" },
          redirect: "follow",
          signal: AbortSignal.timeout(12000),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return { text: await res.text(), url: res.url };
      };

      const top = await fetchPage(site.url);
      const candidates = new Map<string, Candidate>();
      for (const c of collectCandidates(top.text, top.url)) candidates.set(c.href, c);

      for (const u of discoverListPages(top.text, top.url, 4)) {
        try {
          const page = await fetchPage(u);
          for (const c of collectCandidates(page.text, page.url)) candidates.set(c.href, c);
        } catch (_e) {
          // 一覧ページが取得できなくても続行
        }
      }

      let found = 0;

      await Promise.all(
        [...candidates.values()].slice(0, 15).map(async (c) => {
          try {
            let range = titleDateRange(c.text, today);
            let dateText: string | null = null;

            if (!range) {
              const detail = await fetchPage(c.href);
              const labeled = extractLabeledDate(detail.text, today);
              if (labeled) {
                range = labeled.range;
                dateText = labeled.dateText;
              }
            }

            if (range && range.end >= today) {
              rows.push(candidateToSeminar(c, range, dateText, site));
              found++;
            }
          } catch (_e) {
            // 詳細ページが取得できないものは対象外
          }
        })
      );

      stats[site.prefecture] = `${found}/${candidates.size}`;
    } catch (e) {
      stats[site.prefecture] = `skip ${String(e).slice(0, 80)}`;
    }
  }

  const saved = await save(rows);
  console.log("pref stats", JSON.stringify(stats));
  return { saved, stats };
}

// 大阪府理学療法士会: お知らせ記事の「詳細はこちら」がPDFなので、PDFの本文から開催日時を読み取る
async function jobOsaka(from: number, to: number) {
  const today = todayJst();
  const site = PREF_SITES.find((s) => s.code === "osaka")!;
  const fetchPage = async (u: string) => {
    const res = await fetch(u, {
      headers: { "User-Agent": BROWSER_UA, "Accept-Language": "ja" },
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res;
  };

  const top = await (await fetchPage(site.url)).text();
  const posts = new Map<string, Candidate>();
  const collect = (html: string, url: string) => {
    for (const c of collectCandidates(html, url)) {
      const d = postDateFromUrl(c.href);
      // 直近約90日以内に投稿された記事だけを対象にする
      if (d && d >= new Date(Date.now() - 90 * 86400000).toISOString().slice(0, 10)) posts.set(c.href, c);
    }
  };
  collect(top, site.url);
  for (const u of discoverListPages(top, site.url, 4)) {
    try {
      collect(await (await fetchPage(u)).text(), u);
    } catch (_e) {
      // skip
    }
  }

  const list = [...posts.values()]
    .sort((a, b) => (postDateFromUrl(b.href) ?? "").localeCompare(postDateFromUrl(a.href) ?? ""))
    .slice(from, to);

  const rows: Seminar[] = [];
  const stats: string[] = [];

  for (const c of list) {
    try {
      const title = c.text.replace(/^\[[^\]]*\]\s*/, "");
      let range = titleDateRange(title, today);
      let dateText: string | null = null;

      if (!range) {
        const html = await (await fetchPage(c.href)).text();
        const pdfUrl = findPdfLink(html, c.href);
        if (pdfUrl) {
          const buf = new Uint8Array(await (await fetchPage(pdfUrl)).arrayBuffer());
          if (buf.length < 5_000_000) {
            const pdf = await getDocumentProxy(buf);
            const { text } = await extractText(pdf, { mergePages: true });
            const labeled = extractLabeledDate(text, today);
            if (labeled) {
              range = labeled.range;
              dateText = labeled.dateText;
            }
          }
        }
      }

      if (range && range.end >= today) {
        rows.push(candidateToSeminar({ href: c.href, text: title }, range, dateText, site));
        stats.push(`ok ${title.slice(0, 20)}`);
      } else {
        stats.push(`no-date ${title.slice(0, 20)}`);
      }
    } catch (e) {
      stats.push(`err ${String(e).slice(0, 40)}`);
    }
  }

  return { saved: await save(rows), stats };
}

async function jobCleanup() {
  const today = todayJst();
  const stale = new Date(Date.now() - 4 * 86400000).toISOString();

  await supabase.from("seminars").delete().lt("end_date", today);
  // 数日連続で取得できなかった（掲載終了・削除された）情報
  await supabase.from("seminars").delete().lt("seen_at", stale);

  return 0;
}

// ---------- ハンドラー ----------
Deno.serve(async (req) => {
  const url = new URL(req.url);
  const job = url.searchParams.get("job") ?? "";
  const from = Number(url.searchParams.get("from") ?? 0);
  const to = Number(url.searchParams.get("to") ?? 6);
  const key = `${job}:${from}-${to}`;

  // 連打・不正な呼び出しによる外部サイトへの負荷を避ける
  const since = new Date(Date.now() - THROTTLE_MINUTES * 60000).toISOString();
  const { data: recent } = await supabase
    .from("seminar_sync_log")
    .select("job")
    .eq("job", key)
    .gte("ran_at", since)
    .limit(1);

  if (recent && recent.length > 0) {
    return Response.json({ job: key, skipped: "recently ran" });
  }

  await supabase.from("seminar_sync_log").upsert({ job: key, ran_at: new Date().toISOString() });

  try {
    let saved = 0;

    if (job === "ptotst") saved = await jobPtOtSt(from, Math.min(to, from + 8));
    else if (job === "pref") {
      const r = await jobPref(from, Math.min(to, from + 4));
      return Response.json({ job: key, saved: r.saved, stats: r.stats });
    } else if (job === "jpta") saved = await jobJpta();
    else if (job === "jpta-other") saved = await jobJptaOther();
    else if (job === "jpta-nichiken") saved = await jobJptaNichiken();
    else if (job === "pt-kanagawa") saved = await jobPtKanagawa();
    else if (job === "cleanup") saved = await jobCleanup();
    else return Response.json({ error: "unknown job" }, { status: 400 });

    return Response.json({ job: key, saved });
  } catch (e) {
    console.error(key, e);
    return Response.json({ job: key, error: String(e) }, { status: 500 });
  }
});
