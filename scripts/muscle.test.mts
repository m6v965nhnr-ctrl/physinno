import assert from "node:assert/strict";
import { MUSCLES } from "../src/content/muscles/data.ts";
import { findMuscles } from "../src/lib/muscleMatch.ts";

const names = (t: string) => findMuscles(t).map((m) => m.name);
assert.deepEqual(names("上腕二頭筋の作用は肘屈曲"), ["上腕二頭筋"]);
assert.deepEqual(names("前斜角筋が障害される"), ["前斜角筋"]); // 総称「斜角筋」で、中・後が混ざらない
assert.deepEqual(names("大腿四頭筋の筋力").sort(), ["中間広筋", "内側広筋", "外側広筋", "大腿直筋"].sort());
assert.deepEqual(names("上腕筋と上腕二頭筋"), ["上腕筋", "上腕二頭筋"]);
assert.deepEqual(names("特に筋はない"), []);
assert.equal(new Set(MUSCLES.map((m) => m.name)).size, MUSCLES.length); // 名前の重複なし
for (const m of MUSCLES) for (const k of ["origin", "insertion", "nerve", "action"] as const) assert.ok(m[k], `${m.name}.${k}`);
console.log("muscle OK", MUSCLES.length);
