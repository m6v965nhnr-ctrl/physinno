// scan-hospital-recruit.mjs の結果（JSONL）を、DBへ入れる。入れ方は、Cron と同じ窓口（ingest_hospital_recruit。トークン必須）
// 使い方: INGEST_TOKEN=... node scripts/push-hospital-recruit.mjs in.jsonl
import { readFileSync } from "node:fs";

function env(name) {
  if (process.env[name]) return process.env[name];
  const m = readFileSync(new URL("../.env.local", import.meta.url), "utf8").match(new RegExp(`^${name}=(.*)$`, "m"));
  return m ? m[1].trim() : "";
}
const base = env("NEXT_PUBLIC_SUPABASE_URL");
const key = env("NEXT_PUBLIC_SUPABASE_ANON_KEY");
const token = process.env.INGEST_TOKEN;
if (!token) throw new Error("INGEST_TOKEN が必要です");

const KEYS = ["hospital_id", "employment_types", "monthly_min", "monthly_max", "bonus_months", "annual_stated_min", "annual_stated_max", "weekly_off_days", "annual_holidays", "tags", "access_station", "access_minutes", "access_mode", "source_url"];
const rows = readFileSync(process.argv[2], "utf8")
  .split("\n")
  .filter(Boolean)
  .map((l) => {
    const r = JSON.parse(l);
    // 理学療法士の年収として高すぎる値（医師向けの記載などの取り違え）は、入れない
    if (r.annual_stated_min > 7000000 || r.annual_stated_max > 7000000) {
      delete r.annual_stated_min;
      delete r.annual_stated_max;
    }
    // 月給が低すぎる（時給や手当の取り違え）値は入れない。上限が下限の1.6倍を超える幅広い範囲は、複数の職種が混ざっているので、上限を入れない
    if (r.monthly_min < 170000) {
      delete r.monthly_min;
      delete r.monthly_max;
    }
    if (r.monthly_max > r.monthly_min * 1.6) delete r.monthly_max;
    return Object.fromEntries(KEYS.filter((k) => r[k] !== undefined).map((k) => [k, r[k]]));
  });

let saved = 0;
for (let i = 0; i < rows.length; i += 100) {
  const res = await fetch(`${base}/rest/v1/rpc/ingest_hospital_recruit`, {
    method: "POST",
    headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ p_token: token, p_rows: rows.slice(i, i + 100) }),
  });
  const body = await res.json();
  if (!res.ok) {
    console.error("失敗", i, JSON.stringify(body).slice(0, 200));
    process.exit(1);
  }
  saved += Number(body);
}
console.log(`送った ${rows.length} 件 / 書き込み ${saved} 件`);
