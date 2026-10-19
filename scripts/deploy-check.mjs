// push のあと、本番に今の HEAD が出るまで待ち、主要ページを確認する（短い出力で）。
//   npm run deploy:check              … 最長5分待つ
//   npm run deploy:check -- /extra    … 追加で確認したいパスを渡せる
import { execSync } from "node:child_process";

const BASE = process.env.SMOKE_BASE_URL || "https://relight-1wet.vercel.app";
const head = execSync("git rev-parse HEAD", { encoding: "utf8" }).trim();
const short = head.slice(0, 7);

let live = "";
for (let i = 0; i < 60; i++) {
  live = await fetch(`${BASE}/api/version`).then((r) => r.json()).then((j) => j.id ?? "").catch(() => "");
  if (live === head) break;
  await new Promise((r) => setTimeout(r, 5000));
}
if (live !== head) {
  console.log(`FAIL  本番が ${short} になっていない（今: ${live.slice(0, 7) || "取得できず"}）。Vercelのデプロイ状況を確認`);
  process.exit(1);
}
console.log(`OK    本番は ${short}`);

const paths = ["/", "/paper-search", "/certified-pt", "/hospital-areas", "/job-hunting", "/kokushi", "/privacy", ...process.argv.slice(2)];
let bad = 0;
for (const p of paths) {
  const code = await fetch(BASE + p, { redirect: "manual" }).then((r) => r.status).catch(() => 0);
  if (code !== 200) {
    console.log(`FAIL  ${p} → ${code}`);
    bad++;
  }
}
console.log(bad ? `FAIL  ${bad}件` : `OK    ${paths.length}ページ 200`);
process.exit(bad ? 1 : 0);
