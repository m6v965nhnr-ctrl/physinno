import assert from "node:assert/strict";
import { MUSCLES } from "../src/content/muscles/data.ts";
import { BONES } from "../src/content/muscles/bones.ts";
import { findAnatomy, findMuscles } from "../src/lib/muscleMatch.ts";

const names = (t: string) => findMuscles(t).map((m) => m.name);
const bones = (t: string) => findAnatomy(t).bones.map((b) => b.name);
assert.deepEqual(names("上腕二頭筋の作用は肘屈曲"), ["上腕二頭筋"]);
assert.deepEqual(names("前斜角筋が障害される"), ["前斜角筋"]);
assert.deepEqual(names("大腿四頭筋の筋力").sort(), ["中間広筋", "内側広筋", "外側広筋", "大腿直筋"].sort());
assert.deepEqual(names("上腕筋と上腕二頭筋"), ["上腕筋", "上腕二頭筋"]);
assert.deepEqual(names("特に筋はない"), []);
// 骨
assert.deepEqual(bones("橈骨遠位端骨折"), ["橈骨"]);
assert.deepEqual(bones("橈骨神経麻痺と尺骨動脈"), []); // 神経・動脈の名前は骨に数えない
assert.deepEqual(bones("第7頸椎と第5腰椎"), ["第7頸椎", "腰椎"]); // 「第7頸椎」の中の「頸椎」は別に数えない
assert.deepEqual(bones("腸骨筋は股関節を屈曲する"), []); // 筋の名前の中の骨は数えない
assert.deepEqual(names("腸骨筋は股関節を屈曲する"), ["腸骨筋"]);
assert.deepEqual(bones("舟状骨骨折").sort(), ["手の舟状骨", "足の舟状骨"].sort());
assert.deepEqual(bones("第1肋骨と肋骨"), ["第1肋骨", "肋骨"]);
assert.equal(new Set(MUSCLES.map((m) => m.name)).size, MUSCLES.length);
assert.equal(new Set(BONES.map((b) => b.name)).size, BONES.length);
for (const m of MUSCLES) for (const k of ["origin", "insertion", "nerve", "action"] as const) assert.ok(m[k], `${m.name}.${k}`);
for (const x of BONES) for (const k of ["features", "joints", "muscles", "notes"] as const) assert.ok(x[k], `${x.name}.${k}`);
console.log("anatomy OK", MUSCLES.length, BONES.length);

// 個別ページの本文が、全部そろっているか
import { MUSCLE_COLUMNS } from "../src/content/muscles/columnsMuscles.ts";
import { BONE_COLUMNS } from "../src/content/muscles/columnsBones.ts";
for (const m of MUSCLES) assert.ok(MUSCLE_COLUMNS[m.name], `本文がない筋: ${m.name}`);
for (const b of BONES) assert.ok(BONE_COLUMNS[b.name], `本文がない骨: ${b.name}`);
for (const k of Object.keys(MUSCLE_COLUMNS)) assert.ok(MUSCLES.some((m) => m.name === k), `筋の一覧にない本文: ${k}`);
for (const [k, c] of [...Object.entries(MUSCLE_COLUMNS), ...Object.entries(BONE_COLUMNS)]) {
  assert.ok(c.en && c.lead.length >= 30 && c.points.length >= 2 && c.clinical && c.exam, `本文が足りない: ${k}`);
}
console.log("columns OK");
