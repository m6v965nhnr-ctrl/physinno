// IndexNow: 記事などのURLをBing系の検索エンジンへ即時通知する。
// 使い方: 新しい記事を公開したら node scripts/indexnow.mjs （/columns配下と主要ページを送る）
const KEY = "463f2048e3839123cbaf6470daf6afe4";
const HOST = "relight-1wet.vercel.app";

const res = await fetch(`https://${HOST}/sitemap.xml`);
const xml = await res.text();
const all = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const urls = all.filter((u) => u.includes("/columns") || /\/(for-|paper-search|kokushi$|hospital-areas|job-hunting|certified-pt)/.test(u) || u === `https://${HOST}/`);
console.log(`送信するURL: ${urls.length}件`);

const r = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls.slice(0, 10000) }),
});
console.log("IndexNow:", r.status, r.status === 200 || r.status === 202 ? "OK" : await r.text());
