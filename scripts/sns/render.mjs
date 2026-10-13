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
import { panelSVG } from "./manga.mjs";

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
      // 1コマずつ全画面で見せる（絵が大きく、台詞も読みやすい）。作画は manga.mjs
      const FONT = `<style>@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700;900&display=swap');*{margin:0;box-sizing:border-box}body{width:1080px;height:1920px;background:#0a1224;font-family:'Noto Sans JP',sans-serif;color:#fff;position:relative;overflow:hidden;background-image:radial-gradient(1200px 700px at 100% 0%,rgba(78,215,167,.16),transparent 60%),radial-gradient(900px 600px at 0% 100%,rgba(85,199,220,.14),transparent 60%)}</style>`;
      // 冒頭1〜3秒が勝負（アルゴリズムは、冒頭の離脱・完走・保存・シェアを見る）。タイトル画面は置かず、1コマ目から見せる。
      const head = `<div style="position:absolute;left:50px;top:36px;font-size:30px;font-weight:700;color:#06303a;padding:10px 26px;border-radius:999px;background:linear-gradient(90deg,#55c7dc,#4ed7a7)">${post.series ?? "PT漫画"}${post.no ? ` #${post.no}` : ""}</div><div style="position:absolute;right:50px;top:44px;font-size:32px;font-weight:700;color:#9fb0c8">Re:light</div><div style="position:absolute;left:50px;right:50px;top:96px;font-size:${post.hook.length > 16 ? 50 : 58}px;font-weight:900;line-height:1.2;color:#fff">${post.hook}</div>`;
      post.panels.forEach((pn, k) => {
        const dots = [0, 1, 2, 3].map((j) => `<span style="display:inline-block;width:${j === k ? 56 : 18}px;height:18px;border-radius:9px;margin:0 8px;background:${j === k ? "#4ed7a7" : "#33415c"}"></span>`).join("");
        plan.push([
          `p${k + 1}`,
          `<!doctype html><html><head><meta charset="utf-8">${FONT}</head><body>${head}<div style="position:absolute;left:40px;top:190px;width:1000px;height:1500px;border:8px solid #1b1b2f;border-radius:6px;box-shadow:0 0 0 6px #fff;overflow:hidden;background:#fff">${panelSVG(pn)}</div><div style="position:absolute;left:0;right:0;top:1752px;text-align:center">${dots}</div><div style="position:absolute;left:0;right:0;top:1815px;text-align:center;font-size:28px;color:#8aa0bd">${post.title}　@re.light0717　フィクションです</div></body></html>`,
          [2.6, 2.6, 2.8, 3.6][k],
        ]);
      });
    } else if (post.kind === "tt-aruaru") {
      for (let k = 1; k <= post.items.length; k++) plan.push([`i${k}`, tt.aruaru(post, k), k === post.items.length ? 2.8 : 2.0]);
    } else {
      post.cards.forEach((c, k) => plan.push([`c${k + 1}`, tt.card(c), c.sec ?? 3.5]));
    }
    if (!post.noCta) plan.push(["cta", reel.cta(post.cta), 1.8]);
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
