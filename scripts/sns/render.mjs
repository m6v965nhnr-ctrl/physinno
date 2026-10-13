// SNS投稿の画像・動画を作る。
//   node scripts/sns/render.mjs scripts/sns/content/week1.json [slug ...]
// 出力: _sns/<日付>_<slug>/（カルーセルは 01.png〜、リールは reel.mp4 と、確認用の frames/）。
// 画像は、インストール済みのGoogle Chromeで描画（playwright-core）、動画は、macOS標準の AVFoundation（PngsToMp4.swift）でつなぐ。

import { chromium } from "playwright-core";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { reel, slides } from "./templates.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../..");
const [, , contentPath, ...only] = process.argv;
if (!contentPath) {
  console.error("usage: node scripts/sns/render.mjs <content.json> [slug ...]");
  process.exit(2);
}

const posts = JSON.parse(readFileSync(resolve(root, contentPath), "utf8"));
const encoder = "/tmp/PngsToMp4";
if (!existsSync(encoder)) {
  execFileSync("swiftc", ["-O", join(here, "PngsToMp4.swift"), "-o", encoder], { stdio: "inherit" });
}

const browser = await chromium.launch({ channel: "chrome", headless: true });

async function shot(html, size, file) {
  const page = await browser.newPage({ viewport: size, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  // 内容が、はみ出していないか確認する（はみ出していたら、警告）
  const over = await page.evaluate(() => {
    const w = document.querySelector(".wrap");
    return w ? w.scrollHeight - w.clientHeight : 0;
  });
  if (over > 4) console.warn(`  ! はみ出し ${over}px: ${file}`);
  await page.screenshot({ path: file });
  await page.close();
}

for (const post of posts) {
  if (only.length && !only.includes(post.slug)) continue;
  const dir = join(root, "_sns", `${post.date}_${post.slug}`);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });

  if (post.kind === "carousel") {
    const n = post.slides.length;
    for (let i = 0; i < n; i++) {
      const s = post.slides[i];
      await shot(slides[s.type](s, i + 1, n), { width: 1080, height: 1350 }, join(dir, `${String(i + 1).padStart(2, "0")}.png`));
    }
    console.log(`carousel ${post.slug}: ${n}枚`);
  } else if (post.kind === "reel") {
    const q = post.quiz;
    const size = { width: 1080, height: 1920 };
    const fdir = join(dir, "frames");
    mkdirSync(fdir, { recursive: true });
    const plan = [
      ["hook", reel.hook(post.hook), 2.2],
      ["q", reel.question(q), 5],
      ["c3", reel.question(q, { countdown: 3 }), 1],
      ["c2", reel.question(q, { countdown: 2 }), 1],
      ["c1", reel.question(q, { countdown: 1 }), 1],
      ["ans", reel.question(q, { answer: true }), 5],
      ["cta", reel.cta(post.cta), 3],
    ];
    const list = [];
    for (const [name, html, sec] of plan) {
      const f = join(fdir, `${name}.png`);
      await shot(html, size, f);
      list.push(`${f}\t${sec}`);
    }
    writeFileSync(join(dir, "list.txt"), list.join("\n"));
    execFileSync(encoder, [join(dir, "reel.mp4"), join(dir, "list.txt")], { stdio: "inherit" });
    console.log(`reel ${post.slug}`);
  }
  writeFileSync(join(dir, "caption.txt"), post.ig?.caption ?? "");
  writeFileSync(join(dir, "x.txt"), post.x?.text ?? "");
}

await browser.close();
