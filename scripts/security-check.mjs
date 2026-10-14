// 匿名（ログインしていない人）として、見えてはいけないものが見えないかを確かめる。読み取りが中心で、データは変えない。
// 使い方: node scripts/security-check.mjs [URL]   （URLの省略時は .env.local の Supabase を使う）
import { readFileSync } from "node:fs";

function env(name) {
  if (process.env[name]) return process.env[name];
  try {
    const m = readFileSync(new URL("../.env.local", import.meta.url), "utf8").match(new RegExp(`^${name}=(.*)$`, "m"));
    return m ? m[1].trim() : "";
  } catch {
    return "";
  }
}

const base = env("NEXT_PUBLIC_SUPABASE_URL");
const key = env("NEXT_PUBLIC_SUPABASE_ANON_KEY");
if (!base || !key) {
  console.error("NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY が見つかりません");
  process.exit(2);
}

const H = { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" };
const ZERO = "00000000-0000-0000-0000-000000000000";
let failed = 0;

async function req(path, init = {}) {
  const res = await fetch(`${base}${path}`, { ...init, headers: { ...H, ...(init.headers || {}) } });
  let body = null;
  try {
    body = await res.json();
  } catch {}
  return { status: res.status, body };
}

function check(name, ok, detail = "") {
  if (!ok) failed++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${ok ? "" : `  ← ${detail}`}`);
}

// 1) 匿名で、1行も読めてはいけない表（RLSで0行、または権限エラー）
for (const t of ["users", "pt_private", "admin_users", "operator_messages", "messages", "conversations", "notifications", "hospital_reviews", "user_blocks"]) {
  const r = await req(`/rest/v1/${t}?select=*&limit=1`);
  const rows = Array.isArray(r.body) ? r.body.length : 0;
  check(`匿名は ${t} を読めない`, rows === 0, `status=${r.status} rows=${rows}`);
}

// 2) 匿名レビューの投稿者ID（user_id）が、読めない
{
  const r = await req("/rest/v1/reviews?select=user_id&limit=1");
  check("匿名は reviews.user_id を読めない", r.status >= 400, `status=${r.status}（まだ読める。20261106_security_hardening.sql が未適用）`);
  const ok = await req("/rest/v1/reviews?select=id,pt_id,rating,comment,created_at&limit=1");
  check("匿名でも reviews の公開列は読める（公開機能が壊れていない）", ok.status === 200, `status=${ok.status}`);
}

// 3) 匿名は書き込めない（存在しないIDへの操作で、データは変わらない）
for (const t of ["reviews", "users", "posts", "hospitals"]) {
  const ins = await req(`/rest/v1/${t}`, { method: "POST", body: JSON.stringify({ id: ZERO }) });
  check(`匿名は ${t} に追加できない`, ins.status >= 400, `status=${ins.status}`);
  const upd = await req(`/rest/v1/${t}?id=eq.${ZERO}`, { method: "PATCH", headers: { Prefer: "return=representation" }, body: JSON.stringify({ id: ZERO }) });
  check(`匿名は ${t} を更新できない`, upd.status >= 400 || (Array.isArray(upd.body) && upd.body.length === 0), `status=${upd.status}`);
  const del = await req(`/rest/v1/${t}?id=eq.${ZERO}`, { method: "DELETE", headers: { Prefer: "return=representation" } });
  check(`匿名は ${t} を削除できない`, del.status >= 400 || (Array.isArray(del.body) && del.body.length === 0), `status=${del.status}`);
}

// 4) 管理者用・本人用の関数を、匿名で呼べない
for (const fn of ["list_my_reviews", "is_admin"]) {
  const r = await req(`/rest/v1/rpc/${fn}`, { method: "POST", body: "{}" });
  const leaked = r.status === 200 && Array.isArray(r.body) && r.body.length > 0;
  check(`匿名は ${fn} で情報を得られない`, !leaked, `status=${r.status}`);
}

// 5) 公開関数は、投稿者IDを返さない
{
  const rev = await req("/rest/v1/reviews?select=pt_id&limit=1");
  const pt = Array.isArray(rev.body) && rev.body[0]?.pt_id;
  if (pt) {
    const r = await req("/rest/v1/rpc/list_pt_reviews", { method: "POST", body: JSON.stringify({ p_pt: pt }) });
    check("list_pt_reviews は user_id を返さない", r.status === 200 && Array.isArray(r.body) && r.body.every((x) => !("user_id" in x)), `status=${r.status}`);
  } else {
    console.log("SKIP  list_pt_reviews（レビューが0件）");
  }
}

// 6) 保管庫: 非公開の保管庫は、公開URLで取れない
for (const b of ["exam-files", "id-photos", "portfolio-files"]) {
  // 公開/非公開のフラグ自体は、匿名では見えない（SQLの storage.buckets で確認する）。ここでは一覧が取れないことだけ見る
  const list = await req(`/storage/v1/object/list/${b}`, { method: "POST", body: JSON.stringify({ prefix: "", limit: 1 }) });
  check(`匿名は ${b} の一覧を取れない`, !(Array.isArray(list.body) && list.body.length > 0), `status=${list.status}`);
}

console.log(failed ? `\n${failed} 件が失敗` : "\nすべて合格");
process.exit(failed ? 1 : 0);
