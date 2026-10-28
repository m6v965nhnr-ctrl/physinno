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
for (const t of ["users", "pt_private", "admin_users", "operator_messages", "messages", "conversations", "notifications", "hospital_reviews", "user_blocks", "pt_work_prefs"]) {
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

// 7) 先生・クラス・テストまわり: 匿名は、表も、先生用・運営用の関数も、使えない
for (const t of ["quiz_classes", "quiz_class_members", "quiz_assignments", "quiz_assignment_answers", "quiz_teachers", "quiz_teacher_requests", "quiz_class_messages", "teacher_profiles", "quiz_audit_log", "quiz_join_attempts", "licensed_schools", "school_members", "school_code_attempts", "app_settings"]) {
  const r = await req(`/rest/v1/${t}?select=*&limit=1`);
  const rows = Array.isArray(r.body) ? r.body.length : 0;
  check(`匿名は ${t} を読めない`, rows === 0, `status=${r.status} rows=${rows}`);
}
for (const [fn, body] of [
  ["quiz_class_dashboard", { p_class: ZERO }],
  ["quiz_assignment_results", { p_assignment: ZERO }],
  ["quiz_assignment_matrix", { p_assignment: ZERO }],
  ["quiz_class_progress", { p_class: ZERO }],
  ["quiz_class_messages_list", { p_class: ZERO }],
  ["quiz_class_post", { p_class: ZERO, p_kind: "chat", p_body: "x", p_anonymous: false, p_reply_to: null }],
  ["quiz_class_message_delete", { p_id: ZERO }],
  ["quiz_class_rooms", {}],
  ["quiz_class_role", { p_class: ZERO }],
  ["quiz_class_scores", { p_class: ZERO }],
  ["quiz_my_reviews", {}],
  ["quiz_assignment_choice_stats", { p_assignment: ZERO }],
  ["quiz_set_share_progress", { p_class: ZERO, p_share: true }],
  ["school_join", { p_code: "AAAAAAAA" }],
  ["school_leave", {}],
  ["quiz_access_state", {}],
  ["admin_list_schools", {}],
  ["admin_save_school", { p_id: null, p_name: "x", p_valid_from: null, p_valid_until: null, p_seat_limit: null, p_plan: "x", p_note: "" }],
  ["admin_rotate_school_code", { p_id: ZERO }],
  ["admin_set_school_status", { p_id: ZERO, p_status: "suspended" }],
  ["admin_list_school_members", { p_school: ZERO }],
  ["admin_remove_school_member", { p_user: ZERO }],
  ["admin_set_quiz_requires_school", { p_on: true }],
  ["admin_quiz_settings", {}],
  ["quiz_school_gate_ok", { p_uid: ZERO }],
  ["school_is_active", { p_school: ZERO }],
  ["quiz_assignment_preview", { p_assignment: ZERO }],
  ["quiz_teacher_search_questions", {}],
  ["quiz_ai_question_counts", {}],
  ["quiz_teacher_add_ai_questions", { p_assignment: ZERO, p_unit: "eval_basic" }],
  ["quiz_set_assignment_questions", { p_assignment: ZERO, p_ids: [] }],
  ["quiz_publish_assignment", { p_assignment: ZERO }],
  ["quiz_delete_assignment", { p_assignment: ZERO }],
  ["quiz_join_class", { p_code: "AAAAAA" }],
  ["admin_list_teachers", {}],
  ["admin_list_quiz_audit", {}],
  ["admin_set_teacher_suspended", { p_user: ZERO, p_suspended: true }],
  ["quiz_own_assignment", { p_assignment: ZERO }],
  ["quiz_audit_view", { p_action: "view_class", p_target: ZERO }],
  ["study_create_book", { p_class: ZERO, p_name: "x", p_total_pages: 100 }],
  ["study_archive_book", { p_book: ZERO, p_archived: true }],
  ["study_add_unit", { p_book: ZERO, p_name: "x", p_page_start: 1, p_page_end: 10 }],
  ["study_delete_unit", { p_unit: ZERO }],
  ["study_list_books", { p_class: ZERO }],
  ["study_list_units", { p_book: ZERO }],
  ["study_add_log", { p_book: ZERO, p_page_start: 1, p_page_end: 10, p_studied_on: "2026-01-01" }],
  ["study_delete_log", { p_log: ZERO }],
  ["study_my_logs", { p_book: ZERO }],
  ["study_my_progress", { p_book: ZERO }],
  ["study_teacher_progress", { p_book: ZERO }],
  ["study_my_books", {}],
  ["study_add_log_pages", { p_book: ZERO, p_pages: [1, 2, 3], p_studied_on: "2026-01-01" }],
  ["study_update_unit", { p_unit: ZERO, p_name: "x", p_page_start: 1, p_page_end: 10 }],
  ["study_update_log", { p_log: ZERO, p_page_start: 1, p_page_end: 10, p_studied_on: "2026-01-01" }],
  ["study_teacher_student_logs", { p_book: ZERO, p_user: ZERO }],
  ["study_update_book", { p_book: ZERO, p_name: "x", p_total_pages: 100 }],
]) {
  const r = await req(`/rest/v1/rpc/${fn}`, { method: "POST", body: JSON.stringify(body) });
  check(`匿名は ${fn} を呼べない`, r.status >= 400, `status=${r.status}`);
}

console.log(failed ? `\n${failed} 件が失敗` : "\nすべて合格");
process.exit(failed ? 1 : 0);
