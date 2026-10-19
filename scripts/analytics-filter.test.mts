import assert from "node:assert/strict";
import { filterAnalyticsUrl as f } from "../src/lib/analyticsFilter.ts";

const B = "https://relight-1wet.vercel.app";
// 公開ページは、数える。検索語・その他のクエリは、外す
assert.equal(f(`${B}/`), `${B}/`);
assert.equal(f(`${B}/paper-search?q=${encodeURIComponent("脳卒中 歩行")}`), `${B}/paper-search`);
assert.equal(f(`${B}/register?type=pt&utm_source=certified-pt&utm_campaign=x`), `${B}/register?utm_source=certified-pt&utm_campaign=x`);
assert.equal(f(`${B}/kokushi/61/am/15#top`), `${B}/kokushi/61/am/15`);
assert.equal(f(`${B}/hospital-areas/${encodeURIComponent("東京都")}`), `${B}/hospital-areas/${encodeURIComponent("東京都")}`);
// 個人に結びつくページは、送らない
for (const p of ["/pts/abc", "/posts/123", "/messages/u1", "/groups/1", "/admin", "/mypage/edit", "/home", "/student/quiz/teacher", "/notifications", "/profile"]) {
  assert.equal(f(`${B}${p}`), null, p);
}
// 公開ページ名の前方一致で、個人のページが通らない
assert.equal(f(`${B}/kokushix`), null);
assert.equal(f("not a url"), null);
console.log("analytics filter: ok");
