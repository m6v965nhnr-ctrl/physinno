import assert from "node:assert/strict";
import { findOrgans } from "../src/lib/organMatch.ts";

const slugs = (t: string) => findOrgans(t).map((o) => o.slug);
assert.deepEqual(slugs("噴門と幽門の位置"), ["stomach"]);
assert.deepEqual(slugs("胃潰瘍で入院"), ["stomach"]);
assert.deepEqual(slugs("前胃部の所見"), []);
assert.deepEqual(slugs("特に臓器はない"), []);
assert.ok(slugs("大脳皮質の機能").includes("cerebrum"));
assert.ok(!slugs("中大脳動脈の支配域").includes("cerebrum"));
assert.ok(!slugs("大脳基底核の障害").includes("cerebrum"));
assert.ok(slugs("中心前回と中心後回").includes("precentral-gyrus"));
assert.ok(!slugs("橋本病の甲状腺").includes("pons"));
assert.ok(slugs("橋出血で四肢麻痺").includes("pons"));
console.log("organ match ok");
