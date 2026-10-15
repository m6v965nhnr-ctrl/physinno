// 病院の公式サイト（トップ→採用ページ→職種ページ）を、ゆっくり読んで、給与・休日・アクセスなどを、書いてあるとおりに抜き出す。
// AIは使わない。文面の決まった書き方（「初任給 218,000円」「年間休日120日」「賞与 年間6.2ヶ月」など）だけを、正規表現で拾う。
//  ・robots.txt で禁止されているページは、読まない。1つの病院につき、最大7ページ。
//  ・理学療法士・リハビリの記載があるページからだけ、給与・休日を拾う（看護師などの給与を混ぜない）
// 使い方: node scripts/scan-hospital-recruit.mjs out.jsonl [件数の上限]
import { appendFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";

function env(name) {
  if (process.env[name]) return process.env[name];
  const m = readFileSync(new URL("../.env.local", import.meta.url), "utf8").match(new RegExp(`^${name}=(.*)$`, "m"));
  return m ? m[1].trim() : "";
}
const base = env("NEXT_PUBLIC_SUPABASE_URL");
const key = env("NEXT_PUBLIC_SUPABASE_ANON_KEY");
const out = process.argv[2] || "recruit.jsonl";
const limit = Number(process.argv[3] || 100000);
const UA = "Mozilla/5.0 (compatible; RelightHospitalSync/1.0; +https://relight-1wet.vercel.app)";
const N = (s) => s.normalize("NFKC");

// ---------- 部品 ----------
function safeUrl(raw) {
  try {
    const u = new URL(raw.startsWith("http") ? raw : `https://${raw}`);
    if (!/^https?:$/.test(u.protocol) || u.username || u.password) return null;
    const h = u.hostname.toLowerCase();
    if (!h.includes(".") || h === "localhost" || /^[\d.]+$/.test(h) || h.includes(":")) return null;
    return u;
  } catch {
    return null;
  }
}

const robotsCache = new Map();
async function allowed(u) {
  let rules = robotsCache.get(u.host);
  if (!rules) {
    rules = [];
    try {
      const res = await fetch(`${u.origin}/robots.txt`, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(4000) });
      if (res.ok) {
        let star = false;
        for (const line of (await res.text()).split(/\r?\n/)) {
          const l = line.replace(/#.*/, "").trim();
          const ua = /^user-agent:\s*(.+)$/i.exec(l);
          if (ua) star = ua[1].trim() === "*";
          const dis = /^disallow:\s*(\S+)/i.exec(l);
          if (star && dis) rules.push(dis[1]);
        }
      }
    } catch {}
    robotsCache.set(u.host, rules);
  }
  return !rules.some((r) => r === "/" || u.pathname.startsWith(r.replace(/\*.*$/, "")));
}

async function fetchHtml(u) {
  try {
    if (!(await allowed(u))) return null;
    const res = await fetch(u, { redirect: "follow", headers: { "User-Agent": UA, "Accept-Language": "ja" }, signal: AbortSignal.timeout(8000) });
    if (!res.ok || !(res.headers.get("content-type") || "").includes("html")) return null;
    const buf = new Uint8Array(await res.arrayBuffer()).slice(0, 700_000);
    const ct = res.headers.get("content-type") || "";
    const head = new TextDecoder("latin1").decode(buf.slice(0, 3000));
    const label = /charset=["']?([\w-]+)/i.exec(ct)?.[1] ?? /charset=["']?([\w-]+)/i.exec(head)?.[1] ?? "utf-8";
    try {
      return new TextDecoder(label).decode(buf);
    } catch {
      return new TextDecoder("utf-8").decode(buf);
    }
  } catch {
    return null;
  }
}

function toText(html) {
  return N(
    html
      .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<!--[\s\S]*?-->/gi, " ")
      .replace(/<br\s*\/?>|<\/(p|div|li|tr|h\d|dt|dd|th|td|section)>/gi, "\n")
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/[ \t]+/g, " ")
      .replace(/\n\s*\n+/g, "\n")
  ).trim();
}

function links(html, from, pattern, sameHost = true) {
  const found = [];
  const re = /<a\s[^>]*href=["']([^"'#]+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = re.exec(html))) {
    const label = toText(m[2]).slice(0, 40);
    if (!pattern.test(`${label} ${m[1]}`)) continue;
    try {
      const u = new URL(m[1], from);
      if (!/^https?:$/.test(u.protocol) || /\.(pdf|jpe?g|png|gif|zip|docx?|xlsx?)$/i.test(u.pathname)) continue;
      if (sameHost && u.hostname.replace(/^www\./, "") !== from.hostname.replace(/^www\./, "")) continue;
      if (!found.some((f) => f.href === u.href)) found.push(u);
    } catch {}
  }
  return found;
}

// ---------- 抜き出し ----------
const RECRUIT = /(採用|求人|募集|リクルート|recruit|career|職員|セラピスト)/i;
const PT_PAGE = /(理学療法|リハビリ|療法士|セラピスト|コメディカル|医療技術|募集要項|職種)/;
const ACCESS_PAGE = /(アクセス|交通|access|外来のご案内|病院案内)/i;

const yen = (m) => {
  // 「218,000円」「22万円」「22.5万円」「22万5千円」
  let v = null;
  if (/万/.test(m)) {
    const a = /(\d+(?:\.\d+)?)\s*万\s*(?:(\d{1,4})\s*円?)?/.exec(m);
    if (a) v = Math.round(Number(a[1]) * 10000) + (a[2] ? Number(a[2]) : 0);
  } else {
    const a = /(\d{1,3}(?:,\d{3})+|\d{5,7})\s*円/.exec(m);
    if (a) v = Number(a[1].replace(/,/g, ""));
  }
  return v;
};
const AMOUNT = /(\d{1,3}(?:,\d{3})+\s*円|\d{5,7}\s*円|\d+(?:\.\d+)?\s*万\s*(?:\d{1,4}\s*円)?)/;

function analyze(pages) {
  // 看護師向けのページ（URLに nurs / kango / 看護）は、給与・休日・雇用形態に使わない
  const ptPages = pages.filter((p) => /(理学療法|リハビリ|療法士)/.test(p.text) && !/(nurs|kango|看護)/i.test(p.url));
  const full = ptPages.map((p) => p.text).join("\n");
  // 「理学療法士」の前後だけを、お金・雇用形態の根拠にする（医師・看護師の給与を混ぜない）
  const spans = [];
  for (const m of full.matchAll(/理学療法士|リハビリ/g)) spans.push([Math.max(0, m.index - 250), m.index + 450]);
  spans.sort((x, y) => x[0] - y[0]);
  const merged = [];
  for (const sp of spans) {
    const last = merged[merged.length - 1];
    if (last && sp[0] <= last[1]) last[1] = Math.max(last[1], sp[1]);
    else merged.push([...sp]);
  }
  const pt = merged.map(([a, b]) => full.slice(a, b)).join("\n");
  const all = pages.map((p) => p.text).join("\n");
  const r = { employment_types: [], tags: [] };
  let srcPage = ptPages[0]?.url ?? null;

  if (ptPages.length > 0) {
    // 月給（初任給・月給・給与の、最初の金額。続けて「〜」と2つ目の金額があれば、上限）
    for (const label of ["初任給", "月給", "給与"]) {
      const re = new RegExp(`${label}[^\\n]{0,40}?${AMOUNT.source}(?:\\s*(?:[〜~～-]|から)\\s*${AMOUNT.source})?`, "g");
      let m;
      while ((m = re.exec(pt))) {
        const a = yen(m[1]);
        const b = m[2] ? yen(m[2]) : null;
        if (a && a >= 150000 && a <= 700000) {
          r.monthly_min = a;
          if (b && b >= a && b <= 900000) r.monthly_max = b;
          break;
        }
      }
      if (r.monthly_min) break;
    }
    const bonus = /(賞与|ボーナス)[^\n]{0,60}?(?:年間|年)?\s*(\d(?:\.\d{1,2})?)\s*(?:ヶ|か|カ|ケ|ヵ|ケ)\s*月/.exec(pt);
    if (bonus && Number(bonus[2]) >= 0.5 && Number(bonus[2]) <= 8) r.bonus_months = Number(bonus[2]);

    const ann = [];
    const reA = /(モデル年収|年収例|年収)/g;
    let m;
    while ((m = reA.exec(pt)) && ann.length === 0) {
      for (const v of pt.slice(m.index, m.index + 220).matchAll(/(\d{3,4})(?:\.\d)?\s*万\s*円?/g)) {
        const n = Number(v[1]);
        if (n >= 250 && n <= 700 && ann.length < 4) ann.push(n);
      }
    }
    if (ann.length > 0) {
      r.annual_stated_min = Math.min(...ann) * 10000;
      r.annual_stated_max = Math.max(...ann) * 10000;
    }

    const hol = /年間休日[^\d\n]{0,12}(\d{2,3})\s*日/.exec(full);
    if (hol && Number(hol[1]) >= 80 && Number(hol[1]) <= 160) r.annual_holidays = Number(hol[1]);
    if (/週休\s*3\s*日/.test(full)) r.weekly_off_days = 3;
    else if (/(完全)?週休\s*(2|二)\s*日|4週\s*8休/.test(full)) r.weekly_off_days = 2;

    // 雇用形態（「非常勤」の中の「常勤」を、数えないようにしてから判定）
    const noPart = pt.replace(/非常勤/g, "");
    if (/(正職員|正社員|常勤)/.test(noPart)) r.employment_types.push("常勤");
    if (/非常勤/.test(pt)) r.employment_types.push("非常勤");
    if (/(パート|アルバイト)/.test(pt)) r.employment_types.push("パート");

    const has = (re) => re.test(full);
    if (has(/土日\s*(祝)?\s*(休み|休日|休)/) && !has(/土日祝\s*(休み|休日|休)/)) r.tags.push("土日休み");
    if (has(/土日祝\s*(休み|休日|休)|土・日・祝/)) r.tags.push("土日祝休み");
    if (has(/日祝\s*(休み|休日|休)/)) r.tags.push("日祝休み");
    if (has(/残業\s*(ほとんど)?\s*(なし|ない|少な|ゼロ|0)|月平均残業\s*(\d|10)\s*時間/)) r.tags.push("残業少なめ");
    if (has(/賞与|ボーナス/)) r.tags.push("賞与あり");
    if (has(/昇給/)) r.tags.push("昇給あり");
    if (has(/住宅手当|家賃補助|住居手当/)) r.tags.push("住宅手当あり");
    if (has(/職員寮|独身寮|看護師寮|寮完備|寮あり|社宅/)) r.tags.push("寮あり");
    if (has(/託児|院内保育|保育所|保育園/)) r.tags.push("託児所あり");
    if (has(/産休|育休|育児休業|育児休暇/)) r.tags.push("産休育休可");
    if (has(/新卒|新人|卒業見込/)) r.tags.push("新卒可");
    if (has(/教育体制|教育制度|研修制度|プリセプター|キャリアラダー|新人教育/)) r.tags.push("教育充実");
    if (has(/車通勤|マイカー通勤|自動車通勤|職員駐車場/)) r.tags.push("車通勤可");
    if (r.monthly_min || r.annual_stated_min || r.annual_holidays) srcPage = ptPages[0].url;
  }

  // アクセス（病院全体の情報なので、読んだページ全部から）。「最寄り駅」「◯◯駅 徒歩◯分」
  const acc =
    /(?:最寄り?駅|アクセス)?[:：\s]*(?:(?:JR|地下鉄|東京メトロ|都営|私鉄|[一-龥A-Za-z]{1,6}線)[\s・、,]*)*([一-龥ぁ-んァ-ヶー]{1,10}駅)\s*(?:より|から|下車|東口|西口|南口|北口)*\s*(徒歩|バス|送迎バス|送迎|車|自動車)?[^\d\n]{0,8}?(\d{1,3})\s*分/.exec(all);
  if (acc) {
    r.access_station = acc[1];
    const m = acc[2] || "徒歩";
    r.access_mode = m === "徒歩" ? "walk" : m === "バス" ? "bus" : /送迎/.test(m) ? "shuttle" : "car";
    const min = Number(acc[3]);
    if (min >= 1 && min <= 120) r.access_minutes = min;
  } else {
    const st = /最寄り?駅[:：\s]*(?:(?:JR|地下鉄|東京メトロ|都営|私鉄|[一-龥A-Za-z]{1,6}線)[\s・、,]*)*([一-龥ぁ-んァ-ヶー]{1,10}駅)/.exec(all);
    if (st) r.access_station = st[1];
  }
  r.source_url = srcPage ?? pages[0]?.url ?? null;
  return r;
}

async function scan(h) {
  const top = safeUrl(h.website);
  if (!top) return { hospital_id: h.id };
  const topHtml = await fetchHtml(top);
  if (!topHtml) return { hospital_id: h.id };
  const pages = [{ url: top.href, text: toText(topHtml) }];

  const rec = links(topHtml, top, RECRUIT).slice(0, 3);
  const acc = links(topHtml, top, ACCESS_PAGE).filter((l) => !rec.some((r) => r.href === l.href)).slice(0, 1);
  const visited = new Set([top.href]);
  const queue = [...rec, ...acc];
  for (const u of queue) {
    if (visited.has(u.href) || pages.length >= 7) continue;
    visited.add(u.href);
    const html = await fetchHtml(u);
    if (!html) continue;
    pages.push({ url: u.href, text: toText(html) });
    // 採用ページの中から、理学療法士・リハビリ・募集要項のページへ
    if (rec.includes(u)) {
      for (const sub of links(html, u, PT_PAGE).slice(0, 3)) {
        if (visited.has(sub.href) || pages.length >= 7) continue;
        visited.add(sub.href);
        const sh = await fetchHtml(sub);
        if (sh) pages.push({ url: sub.href, text: toText(sh) });
      }
    }
  }
  return { hospital_id: h.id, ...analyze(pages) };
}

// ---------- 実行 ----------
async function listHospitals() {
  const rows = [];
  for (let from = 0; ; from += 1000) {
    const r = await fetch(`${base}/rest/v1/hospitals?select=id,website,website_status,beds_total&website=not.is.null&order=beds_total.desc.nullslast,id`, {
      headers: { apikey: key, Authorization: `Bearer ${key}`, Range: `${from}-${from + 999}` },
    });
    const page = await r.json();
    rows.push(...page);
    if (page.length < 1000) break;
  }
  return rows.filter((h) => h.website_status !== "dead");
}

if (process.argv[1].endsWith("scan-hospital-recruit.mjs")) {
  const done = new Set(existsSync(out) ? readFileSync(out, "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l).hospital_id) : []);
  if (!existsSync(out)) writeFileSync(out, "");
  const hospitals = (await listHospitals()).filter((h) => !done.has(h.id)).slice(0, limit);
  console.error(`scanning ${hospitals.length} (already ${done.size})`);
  let i = 0, n = 0;
  await Promise.all(
    Array.from({ length: 24 }, async () => {
      while (i < hospitals.length) {
        const h = hospitals[i++];
        let r;
        try {
          r = await scan(h);
        } catch {
          r = { hospital_id: h.id };
        }
        appendFileSync(out, JSON.stringify(r) + "\n");
        if (++n % 200 === 0) console.error(n);
      }
    })
  );
  console.error("finished");
}

export { analyze, toText };
