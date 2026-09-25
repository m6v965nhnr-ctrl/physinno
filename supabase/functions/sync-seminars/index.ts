// 研修・学会情報を各サイトから取得して public.seminars に保存する Edge Function。
// 毎日 0:00（JST）に pg_cron から分割して呼び出される（supabase/migrations 参照）。
//
//   ?job=ptotst&from=0&to=6   PT-OT-ST.NET の一覧ページ 0〜5（1ページ40件）
//   ?job=jpta                 日本理学療法士協会 セミナー検索（マイページ）
//   ?job=jpta-other           日本理学療法士協会 協会主催以外の研修会
//   ?job=jpta-nichiken        日本理学療法士協会 学術研修大会（全国）
//   ?job=pt-kanagawa          神奈川県理学療法士会 会員向け研修会・イベント
//   ?job=cleanup              終了済み・長期間取得できていない情報の削除

import { createClient } from "npm:@supabase/supabase-js@2";
import {
  JPTA_SEARCH_URL,
  Seminar,
  jptaFormFields,
  jptaTotal,
  parseJptaNichiken,
  parseJptaOther,
  parseJptaSearch,
  parsePrefWordpress,
  parsePtOtSt,
} from "./parsers.ts";

const UA = "Mozilla/5.0 (compatible; RelightSeminarSync/1.0)";
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
    else if (job === "jpta") saved = await jobJpta();
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
