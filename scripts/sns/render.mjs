// SNS投稿の画像・動画を作る。
//   node scripts/sns/render.mjs scripts/sns/content/week1.json [slug ...]
// 出力: _sns/<日付>_<slug>/（カルーセルは 01.png〜、リールは reel.mp4 と、確認用の frames/）。
// 画像は、インストール済みのGoogle Chromeで描画（playwright-core）、動画は、macOS標準の AVFoundation（PngsToMp4.swift）でつなぐ。

import { chromium } from "playwright-core";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { reel, slides, tt } from "./templates.mjs";

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

    // TikTok用: 同じスライドを、縦長（1080x1920）の動画にする（1枚あたり3.5秒。表紙は3秒）
    const list = [];
    const fdir = join(dir, "tiktok_frames");
    mkdirSync(fdir, { recursive: true });
    for (let i = 0; i < n; i++) {
      const slidePath = join(dir, `${String(i + 1).padStart(2, "0")}.png`);
      const htmlPath = join(fdir, `f${i + 1}.html`);
      writeFileSync(
        htmlPath,
        `<!doctype html><html><body style="margin:0;width:1080px;height:1920px;background:#0a1224;background-image:radial-gradient(1200px 700px at 100% 0%,rgba(78,215,167,.16),transparent 60%),radial-gradient(900px 600px at 0% 100%,rgba(85,199,220,.14),transparent 60%);position:relative"><img src="file://${slidePath}" style="position:absolute;left:0;top:285px;width:1080px;height:1350px;-webkit-mask-image:linear-gradient(to bottom,transparent 0,#000 70px,#000 calc(100% - 70px),transparent 100%)"></body></html>`
      );
      const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
      await page.goto(`file://${htmlPath}`, { waitUntil: "load" });
      const out = join(fdir, `f${i + 1}.png`);
      await page.screenshot({ path: out });
      await page.close();
      list.push(`${out}\t${i === 0 ? 3 : 3.5}`);
    }
    writeFileSync(join(dir, "tiktok_list.txt"), list.join("\n"));
    execFileSync(encoder, [join(dir, "tiktok.mp4"), join(dir, "tiktok_list.txt")], { stdio: "inherit" });
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
  } else if (post.kind.startsWith("tt-")) {
    // TikTok専用（あるある・豆知識・4コマ漫画）。1フレームずつ描いて、縦動画（tiktok.mp4）にする
    const size = { width: 1080, height: 1920 };
    const fdir = join(dir, "tiktok_frames");
    mkdirSync(fdir, { recursive: true });
    const plan = [];
    if (post.kind === "tt-manga") {
      for (let k = 1; k <= 4; k++) plan.push([`p${k}`, tt.manga(post, k), k === 1 ? 3 : 2.8]);
    } else if (post.kind === "tt-aruaru") {
      plan.push(["t", tt.aruaru(post, 0), 2.2]);
      for (let k = 1; k <= post.items.length; k++) plan.push([`i${k}`, tt.aruaru(post, k), k === post.items.length ? 3 : 2.2]);
    } else {
      post.cards.forEach((c, k) => plan.push([`c${k + 1}`, tt.card(c), c.sec ?? 3.5]));
    }
    plan.push(["cta", reel.cta(post.cta), 3]);
    const list = [];
    for (const [name, html, sec] of plan) {
      const f = join(fdir, `${name}.png`);
      await shot(html, size, f);
      list.push(`${f}\t${sec}`);
    }
    writeFileSync(join(dir, "tiktok_list.txt"), list.join("\n"));
    execFileSync(encoder, [join(dir, "tiktok.mp4"), join(dir, "tiktok_list.txt")], { stdio: "inherit" });
    console.log(`${post.kind} ${post.slug}`);
  }
  writeFileSync(join(dir, "caption.txt"), post.ig?.caption ?? "");
  // TikTok用の説明文: Instagramの文面から、「プロフィールのリンクから」の案内と、ハッシュタグ（最大5個）に整える
  if (post.tt) writeFileSync(join(dir, "tiktok.txt"), post.tt.caption);
  else {
    const cap = (post.ig?.caption ?? "").split("\n");
    const tags = (cap.find((l) => l.trim().startsWith("#")) ?? "").split(/\s+/).filter(Boolean).slice(0, 5).join(" ");
    const body = cap.filter((l) => !l.trim().startsWith("#")).join("\n").trim();
    writeFileSync(join(dir, "tiktok.txt"), `${body}\n\n${tags}`.slice(0, 1900));
  }
  writeFileSync(join(dir, "x.txt"), post.x?.text ?? "");
}

await browser.close();
