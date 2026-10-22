// 変更後の確認を、出力を短くして一度に行う（トークンの節約）。
//   npm run verify          … 型チェック → ビルド → （ローカルの開発サーバーが動いていれば）e2e
// 成功は1行ずつ、失敗は、そのコマンドの出力の、エラーの行だけを出して終了コード1で終わる。
import { spawnSync } from "node:child_process";

function run(label, cmd, args) {
  const t = Date.now();
  const r = spawnSync(cmd, args, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  const out = `${r.stdout ?? ""}${r.stderr ?? ""}`;
  const sec = ((Date.now() - t) / 1000).toFixed(0);
  if (r.status === 0) {
    console.log(`OK    ${label} (${sec}s)`);
    return out;
  }
  const lines = out.split("\n").filter((l) => /error|Error|FAIL|Failed|✗|×/.test(l)).slice(0, 25);
  console.log(`FAIL  ${label} (${sec}s)\n${(lines.length ? lines : out.split("\n").slice(-25)).join("\n")}`);
  process.exit(1);
}

run("ガイドの検証・集約", "node", ["scripts/build-guides.mjs"]);
run("型チェック (tsc)", "npx", ["tsc", "--noEmit"]);
run("ビルド (next build)", "npx", ["next", "build"]);

// e2e は、ローカルの開発サーバー(3000番)が動いているときだけ
const up = await fetch("http://localhost:3000/api/version").then((r) => r.ok).catch(() => false);
if (up) {
  const out = run("e2e（公開ページ）", "node", ["scripts/e2e.mjs"]);
  const skipped = out.split("\n").filter((l) => l.startsWith("SKIP")).length;
  if (skipped) console.log(`      （ログイン後の画面は、${skipped}件スキップ）`);
} else {
  console.log("SKIP  e2e（localhost:3000 が動いていない。必要なら preview_start のあとに npm run e2e）");
}
console.log("すべて成功");
