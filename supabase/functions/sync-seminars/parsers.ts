// 研修・学会情報のスクレイピング用パーサー（ネットワーク非依存の純粋関数）
// Supabase Edge Function（Deno）とローカル検証（Node）の両方で動く。

export type Seminar = {
  id: string;
  source: string;
  source_label: string;
  title: string;
  organizer: string | null;
  kind: string;
  start_date: string; // YYYY-MM-DD
  end_date: string; // YYYY-MM-DD
  date_text: string | null;
  format: "online" | "offline" | "hybrid" | null;
  prefecture: string | null;
  region: string | null;
  fee_text: string | null;
  fee_yen: number | null;
  is_free: boolean;
  fields: string[];
  summary: string | null;
  url: string;
};

// ========================================
// 共通ヘルパー
// ========================================
const ENTITIES: Record<string, string> = {
  "&nbsp;": " ",
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#039;": "'",
  "&#39;": "'",
  "&hellip;": "…",
  "&ndash;": "–",
  "&mdash;": "—",
};

export function decode(text: string) {
  return text
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&[a-z]+;/gi, (m) => ENTITIES[m.toLowerCase()] ?? m);
}

export function stripTags(html: string) {
  return decode(
    html
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<[^>]+>/g, "")
  )
    .replace(/[ \t　]+/g, " ")
    .replace(/\n\s*\n+/g, "\n")
    .trim();
}

// 全角数字・記号を半角へ
export function toHalf(text: string) {
  return text
    .replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0))
    .replace(/[：]/g, ":")
    .replace(/[／]/g, "/")
    .replace(/[－―‐−ー]/g, "-")
    .replace(/[～〜]/g, "~");
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function ymd(y: number, m: number, d: number) {
  return `${y}-${pad(m)}-${pad(d)}`;
}

function validDate(y: number, m: number, d: number) {
  if (m < 1 || m > 12 || d < 1 || d > 31) return false;
  const dt = new Date(Date.UTC(y, m - 1, d));
  return dt.getUTCMonth() === m - 1 && dt.getUTCDate() === d;
}

// ========================================
// 都道府県・地方
// ========================================
export const REGIONS: Record<string, string[]> = {
  北海道: ["北海道"],
  東北: ["青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県"],
  関東: ["茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県"],
  中部: [
    "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県",
    "岐阜県", "静岡県", "愛知県",
  ],
  近畿: ["三重県", "滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県"],
  中国: ["鳥取県", "島根県", "岡山県", "広島県", "山口県"],
  四国: ["徳島県", "香川県", "愛媛県", "高知県"],
  "九州・沖縄": [
    "福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県",
  ],
};

const PREFECTURES = Object.values(REGIONS).flat();

export function findPrefecture(text: string | null | undefined) {
  if (!text) return null;
  for (const p of PREFECTURES) {
    if (text.includes(p)) return p;
  }
  return null;
}

export function regionOf(prefecture: string | null) {
  if (!prefecture) return null;
  for (const [region, list] of Object.entries(REGIONS)) {
    if (list.includes(prefecture)) return region;
  }
  return null;
}

// ========================================
// 分類（種別・分野・開催形式・料金）
// ========================================
export function classifyKind(title: string) {
  if (/学術研修大会|学術大会|学術集会|学会|大会|カンファレンス|フォーラム|シンポジウム/.test(title)) {
    return "学術大会・学会";
  }
  if (/講習会/.test(title)) return "講習会";
  if (/講義|講座|レクチャー/.test(title)) return "講義";
  if (/研修/.test(title)) return "研修会";
  if (/セミナー|ワークショップ|勉強会|ウェビナー/.test(title)) return "セミナー";
  if (/イベント|フェスティバル|フェス|交流会|懇親会|募集/.test(title)) return "イベント";
  return "セミナー";
}

const FIELD_RULES: [string, RegExp][] = [
  ["運動器・整形", /整形|運動器|骨折|関節|腰痛|腰部|膝|股関節|肩|足部|足関節|手術|術後|脊椎|脊柱|骨盤|徒手|筋骨格|疼痛|ACL|靱帯|靭帯|変形性|筋膜|トリガーポイント/],
  ["神経系", /神経|脳卒中|脳血管|中枢|麻痺|パーキンソン|高次脳|脊髄|片麻痺|脳梗塞|脳出血|失語|運動学習|痙縮/],
  ["内部障害", /内部障害|呼吸|循環|心臓|心電図|心不全|代謝|糖尿病|腎|がん|リンパ|ICU|離床|集中治療|栄養/],
  ["小児・発達", /小児|発達|脳性麻痺|障害児|乳幼児|周産期/],
  ["地域・高齢者", /地域|介護|訪問|高齢|認知症|フレイル|生活期|通所|在宅|介護予防|老年|ロコモ/],
  ["スポーツ", /スポーツ|競技|アスリート|トレーニング|コンディショニング/],
  ["教育・研究・管理", /臨床実習|教育|指導者|研究|論文|統計|マネジメント|管理|キャリア|接遇|コーチング|リーダー|基礎理学療法|エビデンス/],
];

export function classifyFields(text: string) {
  const out = FIELD_RULES.filter(([, re]) => re.test(text)).map(([name]) => name);
  return out.length > 0 ? out : ["その他"];
}

export function formatFromText(text: string): Seminar["format"] {
  const online = /オンライン|ONLINE|Web|WEB|ウェブ|Zoom|ZOOM|配信|ライブ|ウェビナー/i.test(text);
  const offline = /対面|オフライン|会場|集合/.test(text);
  if (online && offline) return "hybrid";
  if (online) return "online";
  if (offline) return "offline";
  return null;
}

export function parseFee(text: string | null | undefined) {
  if (!text) return { fee_yen: null as number | null, is_free: false };
  const t = toHalf(text);
  const amounts = [...t.matchAll(/([\d,]+)\s*円/g)]
    .map((m) => Number(m[1].replace(/,/g, "")))
    .filter((n) => Number.isFinite(n));
  const free = /無料|参加費\s*なし|0\s*円/.test(t) && (amounts.length === 0 || Math.min(...amounts) === 0);
  if (amounts.length === 0) return { fee_yen: null, is_free: free };
  return { fee_yen: Math.min(...amounts), is_free: free || Math.min(...amounts) === 0 };
}

function truncate(text: string | null | undefined, n: number) {
  if (!text) return null;
  const t = text.replace(/\s+/g, " ").trim();
  if (!t) return null;
  return t.length > n ? t.slice(0, n) + "…" : t;
}

// ========================================
// 日付の抽出
// ========================================
type DateRange = { start: string; end: string };

// テキスト中の日付（年・月が省略された表記を含む）を拾い、最小〜最大を返す。
// baseYear/baseMonth: 年や月が書かれていない場合の補完に使う。
export function extractDateRange(
  raw: string,
  opts: { baseYear?: number; baseMonth?: number; postedOn?: string } = {}
): DateRange | null {
  const text = toHalf(raw)
    // 令和8年 / 平成30年 / R8.10.28 などの表記を西暦に直す
    .replace(/令和\s*元\s*年/g, "2019年")
    .replace(/令和\s*(\d+)\s*年/g, (_, n) => `${2018 + Number(n)}年`)
    .replace(/平成\s*(\d+)\s*年/g, (_, n) => `${1988 + Number(n)}年`)
    .replace(
      /(?<![A-Za-z])R\s*(\d{1,2})\s*[.\/]\s*(\d{1,2})\s*[.\/]\s*(\d{1,2})/g,
      (_, y, m, d) => `${2018 + Number(y)}年${m}月${d}日`
    );

  let year = opts.baseYear;
  let month = opts.baseMonth;
  const dates: string[] = [];

  // トークン: 年 / 月日 / 月+日(日なし・範囲の前半) / 日のみ
  const re =
    /(\d{4})\s*[年/.](?=\s*\d{1,2}\s*[月/.])|(\d{1,2})\s*[月/.]\s*(\d{1,2})\s*日?|(\d{1,2})\s*日(?!間)/g;

  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m[1]) {
      year = Number(m[1]);
      continue;
    }

    let mm: number;
    let dd: number;

    if (m[2]) {
      // 「.」区切りは年付きの表記のときだけ有効（「1.5時間」などの誤検出防止）
      const sep = m[0].match(/[月/.]/)?.[0];
      if (sep === "." && !year) continue;
      // 直後が時刻（10:00）や単位ならスキップ
      mm = Number(m[2]);
      dd = Number(m[3]);
      month = mm;
    } else {
      if (!month) continue;
      mm = month;
      dd = Number(m[4]);
    }

    let y = year;

    if (!y) continue;

    // 年が書かれていない場合は、掲載日より過去になる日付を翌年に繰り上げる
    if (!/(\d{4})/.test(text) && opts.postedOn) {
      const posted = new Date(opts.postedOn + "T00:00:00Z");
      const cand = new Date(Date.UTC(y, mm - 1, dd));
      if (cand.getTime() < posted.getTime() - 45 * 86400000) y += 1;
    }

    if (validDate(y, mm, dd)) dates.push(ymd(y, mm, dd));
  }

  if (dates.length === 0) return null;

  dates.sort();
  const start = dates[0];
  let end = dates[dates.length - 1];

  // 誤検出による極端に長い期間は開始日のみとして扱う（約400日超）
  const span =
    (new Date(end).getTime() - new Date(start).getTime()) / 86400000;
  if (span > 400) end = start;

  return { start, end };
}

// 「YYYY年M月D日」形式の1件
function parseJaDate(text: string | null | undefined) {
  if (!text) return null;
  const m = toHalf(text).match(/(\d{4})\s*年\s*(\d{1,2})\s*月\s*(\d{1,2})\s*日/);
  if (!m) return null;
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  return validDate(y, mo, d) ? ymd(y, mo, d) : null;
}

function finalize(
  base: Omit<Seminar, "kind" | "fields" | "region" | "fee_yen" | "is_free"> &
    Partial<Pick<Seminar, "kind" | "fields" | "region" | "fee_yen" | "is_free">>
): Seminar {
  const fee = parseFee(base.fee_text);
  const haystack = `${base.title} ${base.summary ?? ""}`;
  return {
    ...base,
    kind: base.kind ?? classifyKind(base.title),
    fields: base.fields ?? classifyFields(haystack),
    region: base.region ?? regionOf(base.prefecture),
    fee_yen: base.fee_yen ?? fee.fee_yen,
    is_free: base.is_free ?? fee.is_free,
  };
}

// ========================================
// PT-OT-ST.NET 学会・研修会一覧
// ========================================
export function parsePtOtSt(html: string): Seminar[] {
  const out: Seminar[] = [];
  const start = html.indexOf('id="seminar_listBox"');
  if (start < 0) return out;

  const chunks = html.slice(start).split('<li class="seminar_detail').slice(1);

  for (const chunk of chunks) {
    const idMatch = chunk.match(/seminar\/detail\/(\d+)/);
    if (!idMatch) continue;

    const id = idMatch[1];
    const titleMatch = chunk.match(/<p class="pc_on seminar_Name">([\s\S]*?)<\/p>/);
    const title = titleMatch ? stripTags(titleMatch[1]) : "";
    if (!title) continue;

    const posted = chunk.match(/(\d{4})\.(\d{2})\.(\d{2})掲載/);
    const postedOn = posted ? `${posted[1]}-${posted[2]}-${posted[3]}` : undefined;

    const info: Record<string, string> = {};
    for (const m of chunk.matchAll(/<dt>([\s\S]*?)<\/dt>\s*<dd[^>]*>([\s\S]*?)<\/dd>/g)) {
      info[stripTags(m[1]).replace(/\s+/g, "")] = stripTags(m[2]);
    }

    const dateText = info["開催日時"] || null;

    // サマリー部分（例: 「2026.11.28開催」）も予備として使う
    const summaryDate = chunk.match(/(\d{4})\.(\d{2})\.(\d{2})開催/);

    let range: DateRange | null = null;
    if (dateText) {
      range = extractDateRange(dateText, {
        baseYear: postedOn ? Number(postedOn.slice(0, 4)) : undefined,
        postedOn,
      });
    }
    if (!range && summaryDate) {
      const d = `${summaryDate[1]}-${summaryDate[2]}-${summaryDate[3]}`;
      range = { start: d, end: d };
    }
    if (!range) continue;

    let format: Seminar["format"] = null;
    if (chunk.includes("seIcon_type01")) format = "offline";
    else if (chunk.includes("seIcon_type02")) format = "online";

    const place = info["開催地"] || null;
    const organizer = info["主催"] || null;
    const feeText = info["費用"] || null;
    const pref = findPrefecture(place) || findPrefecture(chunk.match(/<p>([^<]*?[都道府県])[^<]*?<\/p>/)?.[1]);

    out.push(
      finalize({
        id: `ptotst:${id}`,
        source: "ptotst",
        source_label: "PT-OT-ST.NET",
        title,
        organizer: truncate(organizer, 120),
        date_text: truncate(dateText, 160),
        start_date: range.start,
        end_date: range.end,
        format,
        prefecture: format === "online" ? null : pref,
        fee_text: truncate(feeText, 200),
        summary: truncate(
          [place ? `開催地：${place}` : "", info["対象"] ? `対象：${info["対象"]}` : ""]
            .filter(Boolean)
            .join(" / "),
          300
        ),
        url: `https://www.pt-ot-st.net/index.php/seminar/detail/${id}`,
      })
    );
  }

  return out;
}

export function ptOtStPageCount(html: string) {
  const pages = [...html.matchAll(/data-ci-pagination-page="(\d+)"/g)].map((m) => Number(m[1]));
  return pages.length > 0 ? Math.max(...pages) : 1;
}

// ========================================
// 日本理学療法士協会 セミナー検索（マイページ）検索結果
// ========================================
export const JPTA_SEARCH_URL = "https://mypage.japanpt.or.jp/mypage/seminar/openSearch/search";

export function parseJptaSearch(html: string): Seminar[] {
  const out: Seminar[] = [];
  const chunks = html.split('class="c-semi__listitem"').slice(1);

  for (const chunk of chunks) {
    const fields: Record<string, string> = {};
    for (const m of chunk.matchAll(/<dt>([\s\S]*?)<\/dt>\s*<dd[^>]*>([\s\S]*?)<\/dd>/g)) {
      const key = stripTags(m[1]);
      if (!(key in fields)) fields[key] = stripTags(m[2]);
    }

    const number = fields["セミナー番号"];
    const title = stripTags(chunk.match(/<h2[^>]*c-semi__listitem-name[^>]*>([\s\S]*?)<\/h2>/)?.[1] ?? "");
    if (!number || !title) continue;

    const startDate = parseJaDate(chunk.match(/class="open_st">([\s\S]*?)<\/span>/)?.[1]);
    const endDate = parseJaDate(chunk.match(/class="open_ed">([\s\S]*?)<\/span>/)?.[1]) || startDate;
    if (!startDate || !endDate) continue;

    // 常時受付のeラーニング等（数年〜数十年にわたる期間）は除外
    if ((new Date(endDate).getTime() - new Date(startDate).getTime()) / 86400000 > 370) continue;

    const sponsor = fields["主催機関"] || null; // 例: 「16 富山県」「教育学会」
    const prefecture = findPrefecture(sponsor);
    const openKind = fields["開催区分"] || "";
    const format: Seminar["format"] = /併用/.test(openKind)
      ? "hybrid"
      : /オンライン/.test(openKind)
        ? "online"
        : /対面/.test(openKind)
          ? "offline"
          : null;

    const fee = fields["参加費"] || null;
    const seminarType = fields["セミナー区分"] || "";

    const kind = /学術大会/.test(seminarType)
      ? "学術大会・学会"
      : /症例検討/.test(seminarType)
        ? "研修会"
        : classifyKind(title);

    out.push(
      finalize({
        id: `jpta:${number}`,
        source: "jpta",
        source_label: "日本理学療法士協会",
        title,
        organizer: sponsor ? sponsor.replace(/^\d+\s*/, "") : null,
        date_text: startDate === endDate ? startDate : `${startDate} 〜 ${endDate}`,
        start_date: startDate,
        end_date: endDate,
        format,
        prefecture,
        fee_text: fee,
        kind,
        summary: truncate(
          `${fields["セミナー種別"] ? fields["セミナー種別"] + " / " : ""}セミナー番号 ${number}（協会マイページのセミナー検索で番号を入力すると詳細・申込に進めます）`,
          300
        ),
        url: JPTA_SEARCH_URL,
      })
    );
  }

  return out;
}

export function jptaTotal(html: string) {
  const m = html.match(/(\d+)件が該当/);
  return m ? Number(m[1]) : 0;
}

// フォーム内の入力値を、ブラウザが送るのと同じ形で集める
export function jptaFormFields(html: string): [string, string][] {
  const form = html.match(/<form id="seminar-search-form"[\s\S]*?<\/form>/)?.[0] ?? "";
  const out: [string, string][] = [];

  for (const m of form.matchAll(/<input([^>]*)>/g)) {
    const attrs = m[1];
    const name = attrs.match(/name="([^"]*)"/)?.[1];
    if (!name) continue;
    const type = attrs.match(/type="([^"]*)"/)?.[1] ?? "text";
    const value = decode(attrs.match(/value="([^"]*)"/)?.[1] ?? "");
    if (type === "checkbox" || type === "radio") {
      if (/\bchecked\b/.test(attrs)) out.push([decode(name), value]);
    } else if (type !== "button" && type !== "submit") {
      out.push([decode(name), value]);
    }
  }

  for (const m of form.matchAll(/<select[^>]*name="([^"]*)"[^>]*>([\s\S]*?)<\/select>/g)) {
    const options = [...m[2].matchAll(/<option([^>]*)>/g)].map((o) => o[1]);
    const selected = options.find((o) => /\bselected\b/.test(o)) ?? options[0];
    const value = selected?.match(/value="([^"]*)"/)?.[1] ?? "";
    out.push([decode(m[1]), decode(value)]);
  }

  return out;
}

// ========================================
// 日本理学療法士協会 「協会主催以外の研修会」
// ========================================
export function parseJptaOther(html: string): Seminar[] {
  const out: Seminar[] = [];
  const main = html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? html;

  // 年見出し（h2 -medium）ごと → 月見出し（h2 -small）ごとの表
  const yearParts = main.split(/<h2 class="c-heading -blue -medium -border">/).slice(1);

  for (const yp of yearParts) {
    const year = Number(yp.match(/^\s*(\d{4})年/)?.[1]);
    if (!year) continue;

    const monthParts = yp.split(/<h2 class="c-heading -blue -small -border2">/).slice(1);

    for (const mp of monthParts) {
      const month = Number(mp.match(/^\s*(\d{1,2})月/)?.[1]);
      if (!month) continue;

      for (const row of mp.split(/<tr>/).slice(1)) {
        const cells = [...row.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((c) => c[1]);
        if (cells.length < 4) continue;

        const dateText = stripTags(cells[0]).replace(/\n/g, " ");
        const place = stripTags(cells[1]);
        const link = cells[2].match(/<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/);
        if (!link) continue;

        const title = stripTags(link[2]);
        const organizer = stripTags(cells[3]);
        const url = link[1];

        const range = extractDateRange(dateText, { baseYear: year, baseMonth: month });
        if (!range) continue;

        const id = url.match(/list\/([^/]+)\/?$/)?.[1] ?? `${range.start}-${title.slice(0, 20)}`;

        out.push(
          finalize({
            id: `jpta-other:${id}`,
            source: "jpta-other",
            source_label: "日本理学療法士協会（協会主催以外）",
            title,
            organizer: truncate(organizer, 120),
            date_text: truncate(dateText, 160),
            start_date: range.start,
            end_date: range.end,
            format: formatFromText(place),
            prefecture: findPrefecture(place),
            fee_text: null,
            summary: truncate(place ? `開催場所：${place}` : null, 300),
            url,
          })
        );
      }
    }
  }

  return out;
}

// ========================================
// 日本理学療法士協会 学術研修大会（全国）
// ========================================
export function parseJptaNichiken(html: string): Seminar[] {
  const out: Seminar[] = [];

  for (const sec of html.split("<section").slice(1)) {
    const h = sec.match(/<h2[^>]*>([\s\S]*?)<\/h2>/);
    if (!h) continue;

    const title = stripTags(h[1]);
    if (!/第\d+回|学術研修大会/.test(toHalf(title)) || /過去|公募/.test(title)) continue;

    const dateLine = stripTags(sec.match(/開催日程[：:]([\s\S]*?)<\/li>/)?.[1] ?? "");
    const range = extractDateRange(dateLine, {
      baseYear: Number(toHalf(title).match(/(\d{4})年/)?.[1]) || undefined,
    });
    if (!range) continue;

    const place = stripTags(sec.match(/開催場所[：:]([\s\S]*?)<\/li>/)?.[1] ?? "");
    const format = formatFromText(stripTags(sec.match(/参加形式[：:]([\s\S]*?)<\/li>/)?.[1] ?? ""));
    const url = sec.match(/大会HP[：:]\s*<a[^>]*href="([^"]+)"/)?.[1] ?? "https://www.japanpt.or.jp/pt/seminar/browse/01/";

    out.push(
      finalize({
        id: `jpta-nichiken:${range.start}`,
        source: "jpta-nichiken",
        source_label: "日本理学療法士協会",
        title,
        organizer: "公益社団法人 日本理学療法士協会",
        kind: "学術大会・学会",
        date_text: truncate(dateLine, 160),
        start_date: range.start,
        end_date: range.end,
        format,
        prefecture: findPrefecture(place) || findPrefecture(title),
        fee_text: null,
        summary: truncate(place ? `開催場所：${place}` : null, 300),
        url,
      })
    );
  }

  return out;
}

// ========================================
// 神奈川県理学療法士会 会員向け研修会・イベント（WordPress）
// ========================================
export function parsePrefWordpress(
  html: string,
  opts: { idPrefix: string; label: string; prefecture: string; organizer: string }
): Seminar[] {
  const out: Seminar[] = [];

  for (const chunk of html.split('<div class="sub_listblk">').slice(1)) {
    const a = chunk.match(/<h3[^>]*>\s*<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/);
    if (!a) continue;

    const url = a[1];
    const title = stripTags(a[2]);
    const id = url.match(/(\d+)\/?$/)?.[1];
    if (!id || !title) continue;

    const posted = chunk.match(/掲載日[：:]\s*(\d{4})\/(\d{2})\/(\d{2})/);
    const postedOn = posted ? `${posted[1]}-${posted[2]}-${posted[3]}` : undefined;
    const excerpt = stripTags(chunk.match(/<div class="sub_listitem">([\s\S]*?)<\/div>/)?.[1] ?? "");

    // まずタイトル内の括弧（令和8年10月3日（土）／会場）から、なければ本文から
    const baseYear = postedOn ? Number(postedOn.slice(0, 4)) : undefined;
    let range = extractDateRange(title, { baseYear, postedOn });
    if (!range) range = extractDateRange(excerpt, { baseYear, postedOn });
    if (!range) continue;

    const place = title.match(/[／/]\s*([^／/)）]+)[)）]\s*$/)?.[1] ?? null;

    out.push(
      finalize({
        id: `${opts.idPrefix}:${id}`,
        source: opts.idPrefix,
        source_label: opts.label,
        title,
        organizer: opts.organizer,
        date_text: null,
        start_date: range.start,
        end_date: range.end,
        format: formatFromText(title + " " + (place ?? "")),
        prefecture: findPrefecture(place) || opts.prefecture,
        fee_text: null,
        summary: truncate(excerpt, 300),
        url,
      })
    );
  }

  return out;
}

// ========================================
// 都道府県理学療法士会（サイトごとに構造が異なるため汎用の抽出）
// ========================================
export type PrefSite = { code: string; prefecture: string; name: string; url: string };

export const PREF_SITES: PrefSite[] = [
  { code: "hokkaido", prefecture: "北海道", name: "北海道理学療法士会", url: "http://www.pt-hokkaido.jp/" },
  { code: "aomori", prefecture: "青森県", name: "青森県理学療法士会", url: "http://www.ptaomori.org/" },
  { code: "akita", prefecture: "秋田県", name: "秋田県理学療法士会", url: "https://www.ptakita.org/" },
  { code: "iwate", prefecture: "岩手県", name: "岩手県理学療法士会", url: "http://www.iwate-pt.com/" },
  { code: "miyagi", prefecture: "宮城県", name: "宮城県理学療法士会", url: "https://www.pt-miyagi.org/" },
  { code: "yamagata", prefecture: "山形県", name: "山形県理学療法士会", url: "http://www.dream-pt-yamagata.jp/" },
  { code: "fukushima", prefecture: "福島県", name: "福島県理学療法士会", url: "http://fukushima-pt.com/" },
  { code: "ibaraki", prefecture: "茨城県", name: "茨城県理学療法士会", url: "https://www.pt-ibaraki.jp/" },
  { code: "tochigi", prefecture: "栃木県", name: "栃木県理学療法士会", url: "https://www.tochigi-pt.com/" },
  { code: "gunma", prefecture: "群馬県", name: "群馬県理学療法士会", url: "http://gunma-pt.com/" },
  { code: "saitama", prefecture: "埼玉県", name: "埼玉県理学療法士会", url: "https://saitama-pt.or.jp/" },
  { code: "chiba", prefecture: "千葉県", name: "千葉県理学療法士会", url: "https://chiba-pt.or.jp/" },
  { code: "tokyo", prefecture: "東京都", name: "東京都理学療法士協会", url: "http://www.pttokyo.net/" },
  { code: "niigata", prefecture: "新潟県", name: "新潟県理学療法士会", url: "http://nipta.or.jp/" },
  { code: "yamanashi", prefecture: "山梨県", name: "山梨県理学療法士会", url: "http://ypta.jp/" },
  { code: "nagano", prefecture: "長野県", name: "長野県理学療法士会", url: "https://ptnagano.or.jp/" },
  { code: "toyama", prefecture: "富山県", name: "富山県理学療法士会", url: "http://toyamapt.umin.ne.jp/" },
  { code: "ishikawa", prefecture: "石川県", name: "石川県理学療法士会", url: "https://ishikawa-pt.com/" },
  { code: "fukui", prefecture: "福井県", name: "福井県理学療法士会", url: "http://www.fpta.or.jp/" },
  { code: "shizuoka", prefecture: "静岡県", name: "静岡県理学療法士会", url: "https://www.shizuoka-pt.com/" },
  { code: "gifu", prefecture: "岐阜県", name: "岐阜県理学療法士会", url: "https://gifu-pt.jp/" },
  { code: "aichi", prefecture: "愛知県", name: "愛知県理学療法士会", url: "http://www.aichi-pt.jp/" },
  { code: "mie", prefecture: "三重県", name: "三重県理学療法士会", url: "http://mie-pt.jp/" },
  { code: "kyoto", prefecture: "京都府", name: "京都府理学療法士会", url: "https://www.kpta.jp/" },
  { code: "shiga", prefecture: "滋賀県", name: "滋賀県理学療法士会", url: "http://www.shiga-pt.or.jp/" },
  { code: "nara", prefecture: "奈良県", name: "奈良県理学療法士会", url: "http://narapt.jp/" },
  { code: "wakayama", prefecture: "和歌山県", name: "和歌山県理学療法士会", url: "http://pt-wakayama.or.jp/" },
  { code: "osaka", prefecture: "大阪府", name: "大阪府理学療法士会", url: "http://www.physiotherapist-osk.or.jp/" },
  { code: "hyogo", prefecture: "兵庫県", name: "兵庫県理学療法士会", url: "https://hyogo-pt.or.jp/" },
  { code: "okayama", prefecture: "岡山県", name: "岡山県理学療法士会", url: "http://pt-okayama.com/" },
  { code: "hiroshima", prefecture: "広島県", name: "広島県理学療法士会", url: "https://www.hpta.or.jp/" },
  { code: "tottori", prefecture: "鳥取県", name: "鳥取県理学療法士会", url: "http://tori-pt.com/" },
  { code: "shimane", prefecture: "島根県", name: "島根県理学療法士会", url: "https://www.spta.jp/" },
  { code: "yamaguchi", prefecture: "山口県", name: "山口県理学療法士会", url: "https://www.yamaguchi-pta.jp/" },
  { code: "tokushima", prefecture: "徳島県", name: "徳島県理学療法士会", url: "https://www.tokupt.or.jp/" },
  { code: "kochi", prefecture: "高知県", name: "高知県理学療法士会", url: "http://www.kopta.net/" },
  { code: "kagawa", prefecture: "香川県", name: "香川県理学療法士会", url: "https://www.kagawa-pt.com/" },
  { code: "ehime", prefecture: "愛媛県", name: "愛媛県理学療法士会", url: "http://www.epta.jp/" },
  { code: "fukuoka", prefecture: "福岡県", name: "福岡県理学療法士会", url: "https://fukuoka-pt.jp/" },
  { code: "nagasaki", prefecture: "長崎県", name: "長崎県理学療法士会", url: "http://www.npta.or.jp/wp/" },
  { code: "kumamoto", prefecture: "熊本県", name: "熊本県理学療法士会", url: "https://www.kumamoto-pt.org/" },
  { code: "oita", prefecture: "大分県", name: "大分県理学療法士会", url: "https://opta.or.jp/" },
  { code: "saga", prefecture: "佐賀県", name: "佐賀県理学療法士会", url: "https://sagapt.or.jp/" },
  { code: "miyazaki", prefecture: "宮崎県", name: "宮崎県理学療法士会", url: "https://miyazaki-pta.com/" },
  { code: "kagoshima", prefecture: "鹿児島県", name: "鹿児島県理学療法士会", url: "http://infokpta.com/" },
  { code: "okinawa", prefecture: "沖縄県", name: "沖縄県理学療法士会", url: "https://oki-pt.or.jp/" },
];

type Anchor = { href: string; text: string };

export function extractAnchors(html: string, baseUrl: string): Anchor[] {
  const out: Anchor[] = [];
  const cleaned = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<!--[\s\S]*?-->/g, "");

  for (const m of cleaned.matchAll(/<a\s[^>]*href=["']([^"'#][^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
    const text = stripTags(m[2]).replace(/\s+/g, " ").trim();
    if (!text) continue;
    try {
      out.push({ href: new URL(decode(m[1]), baseUrl).toString(), text });
    } catch {
      // 不正なURLは無視
    }
  }

  return out;
}

const LIST_LINK_RE = /研修|講習|セミナー|イベント|学術|開催|催し|お知らせ|ニュース|新着|案内|会員向け|生涯学習|活動|カレンダー|スケジュール|予定/;
const EVENT_RE = /研修|講習|セミナー|講座|講演|勉強会|学術|大会|集会|フォーラム|シンポジウム|カンファレンス|説明会|イベント|ワークショップ|症例検討|研究会|交流会|フェスティバル|サポート|検討会|報告会/;

// トップページから、研修・イベント・お知らせ一覧らしきリンクを最大 max 件選ぶ
export function discoverListPages(html: string, siteUrl: string, max = 4) {
  const host = new URL(siteUrl).hostname.replace(/^www\./, "");
  const seen = new Set<string>();
  const pages: string[] = [];

  for (const a of extractAnchors(html, siteUrl)) {
    if (pages.length >= max) break;
    if (!LIST_LINK_RE.test(a.text) || a.text.length > 30) continue;
    if (/\.(pdf|jpe?g|png|zip|docx?|xlsx?)$/i.test(a.href)) continue;

    let u: URL;
    try {
      u = new URL(a.href);
    } catch {
      continue;
    }

    if (u.hostname.replace(/^www\./, "") !== host) continue;
    u.hash = "";
    const key = u.toString();
    if (seen.has(key) || key === new URL(siteUrl).toString()) continue;
    seen.add(key);
    pages.push(key);
  }

  return pages;
}

function shortHash(text: string) {
  let h = 5381;
  for (let i = 0; i < text.length; i++) h = ((h << 5) + h + text.charCodeAt(i)) >>> 0;
  return h.toString(36);
}

export type Candidate = { href: string; text: string };

// 先頭の掲載日（2026.09.10 / 2026年9月25日 / 26.09.14）や NEW! を取り除く
export function cleanTitle(text: string) {
  return text
    .replace(/^\s*(?:\d{2,4}\s*[年./]\s*\d{1,2}\s*[月./]\s*\d{1,2}\s*日?\s*)+/, "")
    .replace(/^\s*(?:\d{1,2}:\d{2}\s*(?:AM|PM)?\s*)/i, "")
    .replace(/\bNEW!?\s*/gi, "")
    .replace(/^\s*お知らせ\s*/, "")
    .trim();
}

const NOISE_RE = /お問い合わせ|問合せ|プログラム集|一覧|アクセス|サイトマップ|プライバシー|個人情報|入会|退会|会員登録|ログイン|リンク集|募集要項|規約/;

// ページ内のリンク文言から、研修・イベントらしい候補を集める
export function collectCandidates(html: string, pageUrl: string): Candidate[] {
  const out: Candidate[] = [];

  for (const a of extractAnchors(html, pageUrl)) {
    const text = a.text;
    if (text.length < 10 || text.length > 200) continue;
    if (!EVENT_RE.test(text) || NOISE_RE.test(text)) continue;
    if (/^(県内|県外|市内)/.test(text)) continue;
    if (/\.(jpe?g|png|zip|docx?|xlsx?)$/i.test(a.href)) continue;
    // 申込締切だけが書かれているものは開催日ではないので除外
    if (/(締切|〆切|期限)/.test(text) && !/(開催|日時|実施)/.test(text)) continue;
    out.push({ href: a.href, text: cleanTitle(text) || text });
  }

  return out;
}

// 詳細ページから「開催日時」「日時」「日程」などの見出しの後ろにある日付を探す
export function extractLabeledDate(html: string, today: string) {
  const text = stripTags(
    html.replace(/<(?:h[1-6]|p|li|tr|dt|dd|div|br)[^>]*>/gi, "\n")
  );
  const baseYear = Number(today.slice(0, 4));

  for (const m of text.matchAll(/(開催日時|開催日程|開催日|開催期間|受講期間|実施日|実施期間|日\s*時|日\s*程|期\s*日|会\s*期)\s*[:：】\]）)]?\s*([^\n]{0,90})/g)) {
    const value = m[2];
    // 「締切」「申込」の行は開催日ではない
    if (/(締切|〆切|期限|申込|申し込み)/.test(m[0])) continue;
    const range = extractDateRange(value, { baseYear, postedOn: today });
    if (range) return { range, dateText: value.trim() };
  }

  return null;
}

export function candidateToSeminar(
  c: Candidate,
  range: DateRange,
  dateText: string | null,
  site: PrefSite
): Seminar {
  return finalize({
    id: `pref-${site.code}:${shortHash(c.href)}`,
    source: `pref-${site.code}`,
    source_label: site.name,
    title: c.text,
    organizer: site.name,
    date_text: truncate(dateText, 160),
    start_date: range.start,
    end_date: range.end,
    format: formatFromText(c.text + " " + (dateText ?? "")),
    prefecture: site.prefecture,
    fee_text: null,
    summary: "士会サイトの告知です。詳細・申込は元のページでご確認ください。",
    url: c.href,
  });
}

// タイトルに月日が入っている場合はそれを使う
export function titleDateRange(rawTitle: string, today: string): DateRange | null {
  // 「締切り：9月30日」のような申込期限は開催日ではないので除く
  const title = rawTitle.replace(/(?:申込|申し込み|参加登録)?\s*(?:締切り?|〆切|期限)\s*[:：]?\s*[^\s)）】]*/g, " ");
  const hasDate =
    /\d+\s*月\s*\d+|[０-９]+\s*月\s*[０-９]+/.test(title) ||
    /20\d{2}\s*[\/.／]\s*\d{1,2}\s*[\/.／]\s*\d{1,2}/.test(title) ||
    /\d{1,2}\s*[\/／]\s*\d{1,2}(?!\d)\s*(?:\([^)]*\)|（[^）]*）)?\s*(?:開催|実施|に開催|から)/.test(title);
  if (!hasDate) return null;
  return extractDateRange(title, { baseYear: Number(today.slice(0, 4)), postedOn: today });
}

// 記事ページ内のPDFリンク（共通メニューのPDFを避けるため、/info/ や uploads を優先し、なければ最後）
export function findPdfLink(html: string, pageUrl: string) {
  const pdfs = extractAnchors(html, pageUrl).filter((a) => /\.pdf(\?|#|$)/i.test(a.href));
  const preferred = pdfs.find((a) => /\/info\/|\/uploads\//.test(a.href));
  return (preferred ?? pdfs[pdfs.length - 1])?.href ?? null;
}

// 埋め込まれたGoogleカレンダーのID
export function findGoogleCalendarIds(html: string) {
  const ids = new Set<string>();
  for (const m of html.matchAll(/calendar\.google\.com\/calendar\/(?:u\/\d+\/)?embed\?([^"'\s>]+)/g)) {
    const query = decode(m[1]);
    for (const part of query.split("&")) {
      if (!part.startsWith("src=")) continue;
      const raw = decodeURIComponent(part.slice(4));
      if (raw.includes("@")) {
        ids.add(raw);
        continue;
      }
      try {
        const b64 = raw.replace(/-/g, "+").replace(/_/g, "/");
        const id = atob(b64 + "=".repeat((4 - (b64.length % 4)) % 4));
        if (id.includes("@")) ids.add(id);
      } catch {
        // skip
      }
    }
  }
  // 祝日カレンダーは対象外
  return [...ids].filter((id) => !/holiday/.test(id));
}

export function icsUrl(calendarId: string) {
  return `https://calendar.google.com/calendar/ical/${encodeURIComponent(calendarId)}/public/basic.ics`;
}

function icsDate(value: string, params: string, allDayEndExclusive = false) {
  const m = value.match(/^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})(Z?))?$/);
  if (!m) return null;
  let y = Number(m[1]);
  let mo = Number(m[2]);
  let d = Number(m[3]);
  if (m[4] === undefined) {
    if (allDayEndExclusive) {
      const dt = new Date(Date.UTC(y, mo - 1, d) - 86400000);
      return ymd(dt.getUTCFullYear(), dt.getUTCMonth() + 1, dt.getUTCDate());
    }
    return ymd(y, mo, d);
  }
  if (m[7] === "Z" && !/TZID/.test(params)) {
    const dt = new Date(Date.UTC(y, mo - 1, d, Number(m[4]), Number(m[5])) + 9 * 3600000);
    y = dt.getUTCFullYear();
    mo = dt.getUTCMonth() + 1;
    d = dt.getUTCDate();
  }
  return ymd(y, mo, d);
}

const ICS_NOISE_RE = /理事会|幹事会|運営会議|委員会会議|打ち?合わせ|事務局(?:休|閉)|休業|年末年始|締切|〆切/;

// 公開Googleカレンダー（ICS）から開催日つきの予定を取り出す
export function parseIcs(ics: string, site: PrefSite, pageUrl: string, today: string): Seminar[] {
  const out: Seminar[] = [];
  const unfolded = ics.replace(/\r?\n[ \t]/g, "");

  for (const block of unfolded.split("BEGIN:VEVENT").slice(1)) {
    const body = block.split("END:VEVENT")[0];
    const field = (name: string) => {
      const m = body.match(new RegExp(`^${name}((?:;[^:\\n]*)?):(.*)$`, "m"));
      return m ? { params: m[1] ?? "", value: (m[2] ?? "").trim() } : null;
    };
    const unesc = (v: string) => v.replace(/\\n/gi, " ").replace(/\\,/g, ",").replace(/\\;/g, ";").replace(/\\\\/g, "\\");

    const summary = field("SUMMARY");
    const dtstart = field("DTSTART");
    if (!summary || !dtstart) continue;

    const title = unesc(summary.value).trim();
    if (!title || ICS_NOISE_RE.test(title)) continue;

    const dtend = field("DTEND");
    const allDay = /^\d{8}$/.test(dtstart.value);
    const start = icsDate(dtstart.value, dtstart.params);
    let end = dtend ? icsDate(dtend.value, dtend.params, allDay && /^\d{8}$/.test(dtend.value)) : start;
    if (!start) continue;
    if (!end || end < start) end = start;
    if (end < today) continue;

    const uid = field("UID")?.value ?? `${title}${start}`;
    const description = unesc(field("DESCRIPTION")?.value ?? "");
    const location = unesc(field("LOCATION")?.value ?? "");
    const eventUrl = description.match(/https?:\/\/[^\s<>"]+/)?.[0] ?? field("URL")?.value ?? pageUrl;

    out.push(
      finalize({
        id: `pref-${site.code}:ics-${shortHash(uid)}`,
        source: `pref-${site.code}`,
        source_label: site.name,
        title,
        organizer: site.name,
        date_text: null,
        start_date: start,
        end_date: end,
        format: formatFromText(`${title} ${location}`),
        prefecture: findPrefecture(location) || site.prefecture,
        fee_text: null,
        summary: truncate([location ? `開催場所：${location}` : "", description].filter(Boolean).join(" / "), 300),
        url: eventUrl,
      })
    );
  }

  return out;
}
