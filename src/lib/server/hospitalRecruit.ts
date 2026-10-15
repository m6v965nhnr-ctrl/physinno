import { generateText } from "@/lib/server/gemini";
import { fetchHtml, findRecruitLinks, htmlToText, safePublicUrl } from "@/lib/server/hospitalWeb";
import { ACCESS_MODE_LABEL, EMPLOYMENT_TYPES, RECRUIT_TAGS } from "@/lib/hospitals";

// 病院の公式サイト（トップ＋採用のページ）から、AIで給与・休日・アクセスなどを読み取る。
// AIが出した値は、「原文の抜粋（q）」が、ページの文面に本当にあるものだけを採用する（ないものは捨てる）

type Field<T> = { v: T | null; q?: string | null } | null | undefined;
type Extracted = {
  employment_types?: Field<string[]>;
  monthly_min?: Field<number>;
  monthly_max?: Field<number>;
  bonus_months?: Field<number>;
  annual_min?: Field<number>;
  annual_max?: Field<number>;
  weekly_off_days?: Field<number>;
  annual_holidays?: Field<number>;
  tags?: Field<string[]>;
  access_station?: Field<string>;
  access_minutes?: Field<number>;
  access_mode?: Field<string>;
};

const norm = (s: string) => s.normalize("NFKC").replace(/[\s,，、]/g, "");

const SYSTEM = `あなたは、病院の公式サイトの文面から、理学療法士（PT）の採用に関する事実だけを抜き出す係です。
ルール:
- 文面に、はっきり書いてあることだけを答える。推測・計算・常識での補完は禁止。分からない項目は null。
- 値(v)といっしょに、根拠にした原文の抜粋(q)を、文面のとおりに（言い換えず）20〜60文字で付ける。
- 理学療法士（またはリハビリ職・療法士）向けの記載だけを使う。看護師・医師向けの記載は使わない。
- 給与は円で答える（「24万円」→240000）。賞与は「年◯か月分」の数字だけ（金額で書かれていたら null）。
- 年収が直接書かれているときだけ annual_min / annual_max（円）。月給から計算しない。
- employment_types は ${JSON.stringify(EMPLOYMENT_TYPES)} から選ぶ。
- tags は ${JSON.stringify(RECRUIT_TAGS)} から、文面に根拠があるものだけ選ぶ。
- access_mode は walk / bus / shuttle / car のどれか。access_minutes は駅（バス停）からの分数。access_station は最寄り駅の名前（「駅」を付ける）。
- weekly_off_days は週休◯日（1〜3）。annual_holidays は年間休日の日数。
JSONだけを返す。形: {"employment_types":{"v":[],"q":""},"monthly_min":{"v":null,"q":null}, ...}（上の項目すべてを、{"v":…,"q":…} で）`;

function verified<T>(f: Field<T>, text: string): T | null {
  if (!f || f.v == null || !f.q || !norm(f.q) || !norm(text).includes(norm(f.q))) return null;
  return f.v;
}

function num(v: number | null, lo: number, hi: number): number | null {
  return typeof v === "number" && Number.isFinite(v) && v >= lo && v <= hi ? Math.round(v * 10) / 10 : null;
}

export async function extract(website: string, allowMoney: boolean) {
  const base = safePublicUrl(website);
  if (!base) return null;
  const top = await fetchHtml(base);
  if (!top) return null;

  const links = findRecruitLinks(top, base);
  const pages = await Promise.all(links.map((l) => fetchHtml(l)));
  const sources = [{ url: base.href, text: htmlToText(top).slice(0, 3000) }];
  pages.forEach((p, i) => p && sources.push({ url: links[i].href, text: htmlToText(p).slice(0, 5000) }));

  const text = sources.map((s) => s.text).join("\n");
  if (!/(理学療法|リハビリ|PT)/.test(text)) return { empty: true as const };

  let parsed: Extracted;
  try {
    const raw = await generateText({
      system: SYSTEM,
      contents: [{ role: "user", text: sources.map((s) => `【${s.url}】\n${s.text}`).join("\n\n").slice(0, 12000) }],
      json: true,
      maxOutputTokens: 1500,
    });
    parsed = JSON.parse(raw) as Extracted;
  } catch {
    return null;
  }

  const modeOk = (m: string | null) => (m && m in ACCESS_MODE_LABEL ? m : null);
  const types = (verified(parsed.employment_types, text) ?? []).filter((t) => EMPLOYMENT_TYPES.includes(t));
  const tags = (verified(parsed.tags, text) ?? []).filter((t) => RECRUIT_TAGS.includes(t));
  const monthlyMin = allowMoney ? num(verified(parsed.monthly_min, text), 100000, 1000000) : null;
  const monthlyMax = allowMoney ? num(verified(parsed.monthly_max, text), 100000, 1500000) : null;

  return {
    empty: false as const,
    row: {
      employment_types: types,
      monthly_min: monthlyMin,
      monthly_max: monthlyMax,
      bonus_months: allowMoney ? num(verified(parsed.bonus_months, text), 0, 8) : null,
      annual_stated_min: allowMoney ? num(verified(parsed.annual_min, text), 2000000, 20000000) : null,
      annual_stated_max: allowMoney ? num(verified(parsed.annual_max, text), 2000000, 30000000) : null,
      weekly_off_days: num(verified(parsed.weekly_off_days, text), 1, 3),
      annual_holidays: num(verified(parsed.annual_holidays, text), 80, 160),
      tags,
      access_station: (verified(parsed.access_station, text) ?? "").slice(0, 30) || null,
      access_minutes: num(verified(parsed.access_minutes, text), 0, 120),
      access_mode: modeOk(verified(parsed.access_mode, text)),
      source_url: sources[sources.length - 1].url,
    },
  };
}

