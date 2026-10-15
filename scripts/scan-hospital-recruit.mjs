// 病院の公式サイト（トップ→採用ページ→職種ページ）を、ゆっくり読んで、給与・休日・アクセスなどを、書いてあるとおりに抜き出す。
// AIは使わない。文面の決まった書き方（「初任給 218,000円」「年間休日120日」「賞与 年間6.2ヶ月」など）だけを、正規表現で拾う。
//  ・robots.txt で禁止されているページは、読まない。1つの病院につき、最大7ページ。
//  ・理学療法士・リハビリの記載があるページからだけ、給与・休日を拾う（看護師などの給与を混ぜない）
// 使い方: node scripts/scan-hospital-recruit.mjs out.jsonl [件数の上限]
import { appendFileSync, existsSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { execFile } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";

const run = promisify(execFile);
let pdfSeq = 0;

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
    // 月給（初任給・月給・給与の、すぐ後ろに出てくる金額。改行をまたいでよい。金額が複数あれば、最小と最大。
    // 「内訳」「うち」より後ろは、手当や基本給の内訳なので、使わない）
    for (const label of ["初任給", "月給", "給与"]) {
      let found = false;
      for (const m of pt.matchAll(new RegExp(label, "g"))) {
        let win = pt.slice(m.index + label.length, m.index + label.length + 130);
        const cut = win.search(/(内訳|うち|基本給のみ|諸手当)/);
        if (cut >= 0) win = win.slice(0, cut);
        const vals = [...win.matchAll(new RegExp(AMOUNT.source, "g"))].map((x) => yen(x[1])).filter((v) => v && v >= 150000 && v <= 700000).slice(0, 3);
        if (vals.length > 0) {
          r.monthly_min = Math.min(...vals);
          const mx = Math.max(...vals);
          if (mx > r.monthly_min) r.monthly_max = mx;
          found = true;
          break;
        }
      }
      if (found) break;
    }
    const bonus = /(賞与|ボーナス)[\s\S]{0,80}?(\d(?:\.\d{1,2})?)\s*(?:ヶ|か|カ|ケ|ヵ|ケ)\s*月/.exec(pt);
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
    // 出典は、金額が実際に書いてあったページにする
    const needle = r.monthly_min ? r.monthly_min.toLocaleString("en-US") : r.annual_stated_min ? String(r.annual_stated_min / 10000) : r.annual_holidays ? String(r.annual_holidays) : null;
    if (needle) srcPage = (ptPages.find((p) => p.text.includes(needle)) ?? ptPages[0]).url;
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

// 求人サイト（利用規約で機械的な取得を禁じているところ・転職サイト）は、読まない
const BLOCKED_HOST = /(job-?medley|comedical|ptotjinzaibank|pt-ot-st|indeed|kyujinbox|mynavi|rikunabi|doda|townwork|baitoru|en-japan|careerjet|stanby|kaigo|nurse|ptot|pt-job|rehajob|medley|cocofuru|kango|jobcan|google\.|facebook|twitter|instagram|youtube|line\.me)/i;
const ROLE_URL = /(理学療法|rehab|reha|physical|\bpt\b|recruit|saiyo|saiyou|career|kyujin|boshu|bosyu|募集|採用|youkou|yoko|taigu|待遇|給与|salary|shinsotsu|chuto|新卒|中途)/i;
const NURSE_URL = /(nurs|kango|看護|doctor|ishi|医師|yakuzai|薬剤)/i;

// HTML も PDF も、同じ形（url と text と html）で返す。PDF は pdftotext で文字にする（先頭8ページ・6MBまで）
async function fetchDoc(u) {
  try {
    if (process.env.DEBUG_SCAN) console.error("  fetch", u.href);
    if (!(await allowed(u))) return null;
    const res = await fetch(u, { redirect: "follow", headers: { "User-Agent": UA, "Accept-Language": "ja" }, signal: AbortSignal.timeout(10000) });
    if (!res.ok) return null;
    const ct = res.headers.get("content-type") || "";
    const isPdf = ct.includes("pdf") || /\.pdf$/i.test(u.pathname);
    if (isPdf) {
      const len = Number(res.headers.get("content-length") || 0);
      if (len > 6_000_000) return null;
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length > 6_000_000 || buf.subarray(0, 4).toString() !== "%PDF") return null;
      const tmp = join(tmpdir(), `rl-${process.pid}-${pdfSeq++}.pdf`);
      writeFileSync(tmp, buf);
      try {
        const { stdout } = await run("pdftotext", ["-layout", "-l", "8", "-enc", "UTF-8", tmp, "-"], { timeout: 20000, maxBuffer: 5_000_000 });
        return { url: res.url || u.href, text: N(stdout).replace(/[ \t]+/g, " ").replace(/\n\s*\n+/g, "\n").trim(), html: "", pdf: true };
      } catch {
        return null;
      } finally {
        try { unlinkSync(tmp); } catch {}
      }
    }
    if (!ct.includes("html")) return null;
    const buf = new Uint8Array(await res.arrayBuffer()).slice(0, 700_000);
    const head = new TextDecoder("latin1").decode(buf.slice(0, 3000));
    const label = /charset=["']?([\w-]+)/i.exec(ct)?.[1] ?? /charset=["']?([\w-]+)/i.exec(head)?.[1] ?? "utf-8";
    let html;
    try { html = new TextDecoder(label).decode(buf); } catch { html = new TextDecoder("utf-8").decode(buf); }
    return { url: res.url || u.href, text: toText(html), html, pdf: false };
  } catch {
    return null;
  }
}

// サイトマップ（robots.txt の Sitemap: か /sitemap.xml）から、採用・リハビリっぽいURLを探す
async function sitemapUrls(top) {
  const found = [];
  try {
    let maps = [];
    try {
      const r = await fetch(`${top.origin}/robots.txt`, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(4000) });
      if (r.ok) maps = [...(await r.text()).matchAll(/^sitemap:\s*(\S+)/gim)].map((m) => m[1]);
    } catch {}
    if (maps.length === 0) maps = [`${top.origin}/sitemap.xml`];
    const seen = new Set();
    for (let i = 0; i < maps.length && i < 4; i++) {
      const sm = safeUrl(maps[i]);
      if (!sm || seen.has(sm.href) || sm.hostname !== top.hostname) continue;
      seen.add(sm.href);
      const res = await fetch(sm, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(8000) });
      if (!res.ok) continue;
      let xml = await res.text();
      if (xml.length > 3_000_000) xml = xml.slice(0, 3_000_000);
      const locs = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);
      if (/<sitemapindex/i.test(xml)) {
        for (const l of locs.filter((l) => ROLE_URL.test(l)).concat(locs).slice(0, 2)) if (!maps.includes(l)) maps.push(l);
      } else {
        found.push(...locs);
      }
    }
  } catch {}
  return found;
}

function scoreUrl(u) {
  let sc = 0;
  if (/(理学療法|rehab|reha|physical|\bpt\b|リハ)/i.test(u)) sc += 5;
  if (/(募集要項|youkou|yoko|boshu|bosyu|待遇|taigu|給与|salary)/i.test(u)) sc += 4;
  if (/(recruit|saiyo|saiyou|採用|career|kyujin)/i.test(u)) sc += 2;
  if (/(shinsotsu|chuto|新卒|中途|コメディカル|medical-?tech|gijutsu)/i.test(u)) sc += 2;
  if (NURSE_URL.test(u)) sc -= 6;
  return sc;
}

async function scan(h) {
  const top = safeUrl(h.website);
  if (!top) return { hospital_id: h.id };
  const topDoc = await fetchDoc(top);
  if (!topDoc || topDoc.pdf) return { hospital_id: h.id };
  const pages = [{ url: topDoc.url, text: topDoc.text }];
  const visited = new Set([top.href, topDoc.url]);
  const MAX = 14;

  async function take(u) {
    if (!u || visited.has(u.href) || pages.length >= MAX || BLOCKED_HOST.test(u.hostname)) return null;
    visited.add(u.href);
    const d = await fetchDoc(u);
    if (d) pages.push({ url: d.url, text: d.text });
    return d;
  }

  // 1) トップから、採用ページ・アクセス・「別サイトの採用サイト」へ
  const ext = links(topDoc.html, top, /(採用サイト|採用情報|リクルート|職員募集|求人|recruit)/i, false).filter((l) => !BLOCKED_HOST.test(l.hostname)).slice(0, 4);
  const rec = [...links(topDoc.html, top, RECRUIT), ...ext.filter((l) => l.hostname !== top.hostname)].slice(0, 5);
  const acc = links(topDoc.html, top, ACCESS_PAGE).slice(0, 1);
  const recDocs = [];
  for (const u of rec) {
    const d = await take(u);
    if (d) recDocs.push({ u, d });
  }
  for (const u of acc) await take(u);

  // 2) 採用ページの中から、理学療法士・リハビリ・募集要項のページ／PDFへ（別サイトも可。求人サイトは除く）
  const subLinks = (d, u) => {
    if (!d.html) return [];
    const out = [];
    for (const m of d.html.matchAll(/<a\s[^>]*href=["']([^"'#]+)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
      let x;
      try { x = new URL(m[1], u); } catch { continue; }
      if (!/^https?:$/.test(x.protocol) || BLOCKED_HOST.test(x.hostname) || /\.(jpe?g|png|gif|zip|docx?|xlsx?)$/i.test(x.pathname)) continue;
      const label = toText(m[2]).slice(0, 60);
      const key = `${label} ${decodeURIComponent(x.pathname)}`;
      if (NURSE_URL.test(key) && !/(リハビリ|理学療法)/.test(key)) continue;
      const isPdf = /\.pdf$/i.test(x.pathname);
      let sc = 0;
      if (/(リハビリ|理学療法|セラピスト|療法士)/.test(key)) sc += 10; // 理学療法士・リハビリ部門のページ（別サイトでも）
      if (/(募集要項|給与|待遇|要項|職種)/.test(key)) sc += 4;
      if (/(コメディカル|医療技術|医療職|新卒|中途)/.test(key)) sc += 3;
      if (isPdf && /(募集|要項|職員)/.test(key)) sc += 2;
      if (sc >= 3) out.push({ x, sc, isPdf });
    }
    out.sort((p, q) => q.sc - p.sc);
    const seen = new Set();
    return out.filter((o) => !seen.has(o.x.href) && seen.add(o.x.href)).slice(0, 6).map((o) => o.x);
  };
  // 「給与は◯◯採用サイトに掲載」のように、別のサイトへ案内しているときは、その案内先まで追う
  const extDocs = [];
  for (const { u, d } of recDocs) {
    for (const l of links(d.html || "", u, /(採用サイト|採用情報|職員採用|職員募集|給与|待遇|募集要項)/, false).filter((l) => l.hostname !== u.hostname).slice(0, 2)) {
      const ed = await take(l);
      if (ed) extDocs.push({ u: l, d: ed });
    }
  }
  for (const { u, d } of [...recDocs, ...extDocs]) {
    for (const l of subLinks(d, u)) await take(l);
  }

  // 3) サイトマップから、まだ読んでいない採用・リハビリ系のURLを、点数の高い順に
  if (pages.length < MAX) {
    const urls = (await sitemapUrls(top))
      .map((x) => ({ x, sc: scoreUrl(decodeURIComponent(x)) }))
      .filter((o) => o.sc >= 4)
      .sort((a, b) => b.sc - a.sc)
      .slice(0, 5);
    for (const o of urls) {
      const u = safeUrl(o.x);
      if (u && u.hostname === top.hostname) await take(u);
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
  // すでに年収が分かっている病院（取り込み済み・人が入れたもの）は、読み直さない
  const have = new Set();
  for (let from = 0; ; from += 1000) {
    const r = await fetch(`${base}/rest/v1/hospital_recruit?select=hospital_id&annual_max=not.is.null&order=hospital_id`, {
      headers: { apikey: key, Authorization: `Bearer ${key}`, Range: `${from}-${from + 999}` },
    });
    const page = await r.json();
    page.forEach((x) => have.add(x.hospital_id));
    if (page.length < 1000) break;
  }
  return rows.filter((h) => h.website_status !== "dead" && !have.has(h.id));
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

export { analyze, toText, scan };
