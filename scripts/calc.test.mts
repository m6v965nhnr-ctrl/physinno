import assert from "node:assert/strict";
import { calc } from "../src/lib/calc.ts";

assert.equal(calc("1+2×3"), 7);
assert.equal(calc("(1+2)×3"), 9);
assert.equal(calc("0.1+0.2"), 0.3); // 小数の誤差を丸める
assert.equal(calc("10÷4"), 2.5);
assert.equal(calc("−3+5"), 2);
assert.equal(calc("2×(3+(4−1))"), 12);
assert.equal(calc("9.8×0.5×0.5"), 2.45);
for (const bad of ["", "1+", "(1+2", "1÷0", "×3", "1..2+1", "1+2)"]) assert.equal(calc(bad), null, bad);
console.log("calc OK");
