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
  const text = toHalf(
    raw
      .replace(/令和\s*(\d+)\s*年/g, (_, n) => `${2018 + Number(n)}年`)
      .replace(/令和元年/g, "2019年")
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
