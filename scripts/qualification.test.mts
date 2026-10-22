import { evaluateRequirements, requirementsFor, fieldsFor, targetName } from "../src/lib/qualificationCatalog.ts";
import assert from "node:assert/strict";
const ach = (cat: string, pts: number, on: string) => ({ id: cat+on, user_id: "u", category: cat, title: null, conference_name: null, memo: null, achieved_on: on, is_public: true, created_at: on, points: pts }) as never;
const base = { field: "脳卒中", cycle_start: "2026-04-01", renewal_years: 5, checklist: {} as Record<string, boolean> };
// 認定 更新: 60点 → ポイント項目は未達、あと40点
let ev = evaluateRequirements({ ...base, kind: "certified", mode: "renew" }, [ach("training", 40, "2026-05-01"), ach("conference", 20, "2026-06-01")]);
assert.equal(ev.statuses[0].value, 60); assert.equal(ev.statuses[0].done, false); assert.match(ev.statuses[0].next, /あと40点/);
// 100点で達成
ev = evaluateRequirements({ ...base, kind: "certified", mode: "renew" }, [ach("training", 100, "2026-05-01")]);
assert.equal(ev.statuses[0].done, true);
// サイクル前の実績は数えない
ev = evaluateRequirements({ ...base, kind: "certified", mode: "renew" }, [ach("training", 100, "2025-01-01")]);
assert.equal(ev.statuses[0].value, 0);
// 専門 取得: 学会発表1件→発表項目達成、論文は未達、手動チェックの反映
ev = evaluateRequirements({ ...base, field: "運動器理学療法", kind: "specialist", mode: "acquire", checklist: { shitei: 12, taikai: 1 } }, [ach("conference", 0, "2026-05-01")]);
const by = Object.fromEntries(ev.statuses.map(s => [s.req.key, s.done]));
assert.equal(by.present, true);
const sh = ev.statuses.find(x => x.req.key === "shitei")!; assert.equal(sh.progress!.value, 12); assert.equal(sh.done, true);
ev = evaluateRequirements({ ...base, kind: "certified", mode: "acquire", checklist: { shitei: 5, taikai: 1 } }, []);
const sh2 = ev.statuses.find(x => x.req.key === "shitei")!; assert.equal(sh2.done, false); assert.equal(sh2.progress!.need, 12); assert.match(sh2.next, /あと7コマ/);
const tk = ev.statuses.find(x => x.req.key === "taikai")!; assert.equal(tk.progress!.value, 1); assert.equal(tk.done, false);
ev = evaluateRequirements({ ...base, field: "運動器理学療法", kind: "specialist", mode: "acquire", checklist: { shitei: 12, taikai: 1 } }, [ach("conference", 0, "2026-05-01")]); assert.equal(by.paper, false); assert.equal(by.shitei, true); assert.equal(ev.total, 8);
// 専門 更新: 学術活動は発表か論文のどちらか
ev = evaluateRequirements({ ...base, kind: "specialist", mode: "renew" }, [ach("paper", 0, "2026-05-01")]);
assert.equal(ev.statuses[0].done, true);
// 登録: 分野なし／50点
assert.equal(fieldsFor("registered").length, 0); assert.equal(requirementsFor("registered", "renew", null).points, 50);
assert.equal(fieldsFor("certified").length, 21); assert.equal(fieldsFor("specialist").length, 13);
assert.equal(targetName("certified", "acquire", "脳卒中"), "認定理学療法士（脳卒中）・取得");
console.log("ok");
