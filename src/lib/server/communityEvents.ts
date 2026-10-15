// 小さな勉強会・セミナーの、取得元（こくちーず・Doorkeeper）。どちらも、公開されているイベントの一覧から、理学療法・リハビリに関わるものだけを拾う。
// こくちーず: 検索結果のページ（robots.txt で /s/ は許可）。Doorkeeper: 公開API（認証なし）。
import type { Seminar } from "../../../supabase/functions/sync-seminars/parsers.ts";
import { buildSeminar, decode, findPrefecture, stripTags } from "../../../supabase/functions/sync-seminars/parsers.ts";

// 理学療法士・リハビリの専門職が、関心を持つ話題（題名・ジャンルに、どれかが入るものだけを採用する）
const RELEVANT =
  /理学療法|リハビリ|作業療法|言語聴覚|療法士|セラピスト|機能訓練|嚥下|運動療法|徒手|ボバース|PNF|ファシア|筋膜|呼吸ケア|ポジショニング|介護予防|フレイル|ロコモ|疼痛|整形外科|脳卒中|運動器|歩行|姿勢|ストレッチ|テーピング|スポーツ障害|物理療法|認知症ケア|訪問看護|地域包括|生活期|回復期|ケアマネ|介護職/;
const NOISE = /動画配信|オンデマンド|見逃し|アーカイブ|録画|動画視聴|販売|プレゼント|サンプル配布|無料相談会/;

export const KOKUCHPRO_KEYWORDS = ["理学療法士", "リハビリ", "作業療法士", "言語聴覚士", "セラピスト", "運動療法", "徒手療法", "嚥下", "呼吸リハ", "脳卒中"];
export const DOORKEEPER_KEYWORDS = ["理学療法士", "リハビリ", "作業療法士", "言語聴覚士", "セラピスト"];

const shortHash = (text: string) => {
  let h = 5381;
  for (let i = 0; i < text.length; i++) h = ((h << 5) + h + text.charCodeAt(i)) >>> 0;
  return h.toString(36);
};

function formatOf(text: string): Seminar["format"] {
  const online = /オンライン|ONLINE|Zoom|ZOOM|ウェビナー|配信|Web開催|WEB開催/i.test(text);
  const offline = /会場|対面|集合/.test(text);
  return online && offline ? "hybrid" : online ? "online" : offline ? "offline" : null;
}

// ---------- こくちーず ----------
export function kokuchproUrl(keyword: string, page: number) {
  return `https://www.kokuchpro.com/s/q-${encodeURIComponent(keyword)}/${page > 1 ? `?page=${page}` : ""}`;
}

export function parseKokuchpro(html: string, today: string): Seminar[] {
  const out: Seminar[] = [];
  const start = html.indexOf('class="event_list"');
  if (start < 0) return out;

  for (const block of html.slice(start).split('class="row event_item').slice(1)) {
    const m = block.match(/class="event_name url summary">([^<]+)<\/a>/) ?? block.match(/class="event_name url summary"[^>]*>([\s\S]*?)<\/a>/);
    const href = block.match(/href="(https:\/\/www\.kokuchpro\.com\/event\/[0-9a-f]+\/)"/)?.[1];
    const iso = block.match(/class="value-title" title="(\d{4}-\d{2}-\d{2})T/)?.[1];
    if (!m || !href || !iso) continue;

    const title = stripTags(decode(m[1])).replace(/\s+/g, " ").trim();
    const place = stripTags(block.match(/class="event_place">([\s\S]*?)<\/span>/)?.[1] ?? "").trim();
    const pref = stripTags(block.match(/class="event_prefecture_link">([\s\S]*?)<\/a>/)?.[1] ?? "").replace(/[（）()]/g, "").trim();
    const genre = stripTags(block.match(/class="event_genre_link category"[^>]*>([\s\S]*?)<\/a>/)?.[1] ?? "");
    const dateText = stripTags(block.match(/<td class="event_date">([\s\S]*?)<\/td>/)?.[1] ?? "").replace(/\s+/g, " ").trim();

    if (iso < today || NOISE.test(title) || NOISE.test(dateText)) continue;
    if (!RELEVANT.test(`${title} ${genre}`)) continue;

    out.push(
      buildSeminar({
        id: `kokuchpro:${href.split("/").filter(Boolean).pop()}`,
        source: "kokuchpro",
        source_label: "こくちーず",
        title,
        organizer: "こくちーず掲載の勉強会・セミナー",
        date_text: dateText.slice(0, 120),
        start_date: iso,
        end_date: iso,
        format: formatOf(`${title} ${place}`),
        prefecture: findPrefecture(pref) ?? findPrefecture(place),
        fee_text: null,
        summary: `こくちーずに掲載されている勉強会・セミナーです${place ? `（会場：${place}）` : ""}。詳細・申込は元のページでご確認ください。`,
        url: href,
      })
    );
  }
  return out;
}

// ---------- Doorkeeper ----------
export function doorkeeperUrl(keyword: string, page: number) {
  return `https://api.doorkeeper.jp/events?q=${encodeURIComponent(keyword)}&sort=starts_at&page=${page}`;
}

type DoorkeeperEvent = {
  event?: {
    id: number;
    title: string;
    starts_at: string;
    ends_at?: string | null;
    venue_name?: string | null;
    address?: string | null;
    description?: string | null;
    public_url: string;
    group?: { name?: string } | null;
  };
};

const jst = (iso: string) => new Date(Date.parse(iso) + 9 * 3600 * 1000).toISOString().slice(0, 10);

export function parseDoorkeeper(json: unknown, today: string): Seminar[] {
  const out: Seminar[] = [];
  if (!Array.isArray(json)) return out;

  for (const row of json as DoorkeeperEvent[]) {
    const e = row.event;
    if (!e?.title || !e.starts_at || !e.public_url) continue;
    const start = jst(e.starts_at);
    const end = e.ends_at ? jst(e.ends_at) : start;
    const desc = stripTags(decode(e.description ?? "")).slice(0, 400);
    if (end < today || NOISE.test(e.title)) continue;
    // 題名に、理学療法・リハビリの話題が入っているものだけ（本文だけに出てくる、関係のないイベントを避ける）
    if (!RELEVANT.test(e.title)) continue;
    const place = `${e.venue_name ?? ""} ${e.address ?? ""}`.trim();

    out.push(
      buildSeminar({
        id: `doorkeeper:${e.id}`,
        source: "doorkeeper",
        source_label: "Doorkeeper",
        title: e.title.trim(),
        organizer: e.group?.name ?? "Doorkeeper掲載の勉強会・セミナー",
        date_text: start === end ? start : `${start}〜${end}`,
        start_date: start,
        end_date: end < start ? start : end,
        format: formatOf(`${e.title} ${place} ${desc}`),
        prefecture: findPrefecture(place),
        fee_text: null,
        summary: "Doorkeeperに掲載されている勉強会・セミナーです。詳細・申込は元のページでご確認ください。",
        url: e.public_url,
      })
    );
  }
  return out;
}
