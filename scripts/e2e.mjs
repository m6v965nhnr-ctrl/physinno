// 画面の自動テスト（ブラウザで実際に開いて、真っ白・エラー画面・コンソールエラーがないかを確認する）
//   node scripts/e2e.mjs                         … http://localhost:3000（先に npm run dev）
//   node scripts/e2e.mjs https://relight-1wet.vercel.app   … 本番
//
// ログインが必要な画面も確認するときは、テスト用アカウントを環境変数で渡す（コードにも、チャットにも書かない）:
//   E2E_EMAIL=... E2E_PASSWORD=... node scripts/e2e.mjs
// テスト用アカウントは、自分のテスト用に作ったもの（本物のユーザーのパスワードは使わない）。
// ブラウザは、インストール済みの Google Chrome を使う（追加のダウンロードなし）。読み取りだけで、投稿・削除などはしない。

import { chromium } from "playwright-core";

const BASE = (process.argv[2] || process.env.E2E_BASE_URL || "http://localhost:3000").replace(/\/$/, "");
const EMAIL = process.env.E2E_EMAIL;
const PASSWORD = process.env.E2E_PASSWORD;

let failed = 0;
const report = (name, ok, detail = "") => {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${ok ? "" : `  ${detail}`}`);
  if (!ok) failed++;
};

// 既知で、無視してよいコンソールのメッセージ（外部サービスの広告・計測など）
const IGNORED_CONSOLE = [/Failed to load resource.*(facebook|google|googletagmanager)/i, /favicon/i];

// 公開ページ: 開けて、見出しや目印の文言があること
const PUBLIC_PAGES = [
  ["/", "Re:light"],
  ["/guest", "PT"],
  ["/guest/student", ""],
  ["/pts?mode=hospitals", "病院"],
  ["/pts?mode=papers", "論文"],
  ["/pts?mode=ideas", "臨床アイデア"],
  ["/columns", "コラム"],
  ["/kokushi", "国家試験"],
  ["/schools", "合格状況"],
  ["/paper-search", "8サイト"],
  ["/paper-search/topics", "テーマ"],
  ["/certified-pt", "認定理学療法士"],
  ["/paper-search/topics/knee-osteoarthritis", "変形性膝関節症"],
  ["/teachers", "先生"],
  ["/schools/%E9%A0%86%E5%A4%A9%E5%A0%82%E5%A4%A7%E5%AD%A6", "順天堂大学"],
  ["/feedback", ""],
  ["/terms", "利用規約"],
  ["/privacy", "プライバシー"],
  ["/login", ""],
  ["/register", ""],
];

// ログイン後の画面: PT・学生・一般で開ける範囲が違うので、「エラー画面にならないこと」だけを見る
const LOGGED_IN_PAGES = ["/home", "/mypage", "/student", "/student/quiz", "/notifications", "/messages", "/groups", "/pts", "/ideas", "/training"];

const ERROR_TEXTS = ["うまく表示できませんでした", "ページが見つかりません", "Application error"];

async function checkPage(context, path, mustHave) {
  const page = await context.newPage();
  const problems = [];
  page.on("pageerror", (e) => problems.push(`例外: ${e.message}`));
  page.on("console", (m) => {
    if (m.type() === "error" && !IGNORED_CONSOLE.some((re) => re.test(m.text()))) problems.push(`console: ${m.text().slice(0, 120)}`);
  });

  try {
    const res = await page.goto(BASE + path, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
    const text = (await page.locator("body").innerText()).slice(0, 5000);
    if (res && res.status() >= 400) problems.push(`HTTP ${res.status()}`);
    for (const t of ERROR_TEXTS) if (text.includes(t)) problems.push(`エラー表示: ${t}`);
    if (text.trim().length < 20) problems.push("ほぼ真っ白");
    if (mustHave && !text.includes(mustHave)) problems.push(`「${mustHave}」が見つからない`);
    return { problems, finalUrl: page.url() };
  } catch (e) {
    problems.push(`読み込み失敗: ${e.message.slice(0, 100)}`);
    return { problems, finalUrl: page.url() };
  } finally {
    await page.close();
  }
}

const browser = await chromium.launch({ channel: "chrome", headless: true });

try {
  // 1) 公開ページ（ログインなし）
  const guest = await browser.newContext({ viewport: { width: 390, height: 844 } });
  for (const [path, word] of PUBLIC_PAGES) {
    const { problems } = await checkPage(guest, path, word);
    report(`公開 ${path}`, problems.length === 0, problems.join(" / "));
  }
  // 1.5) トップページは、リンクのUTMに合わせて、最初の画面の主役（PT／学生）が変わる（lpEntrance.ts の対応表）
  const LP_CASES = [
    ["/", "type=pt"],
    ["/?utm_source=tiktok&utm_campaign=profile", "type=pt"],
    ["/?utm_source=tiktok&utm_campaign=feature-papers", "type=pt"],
    ["/?utm_source=ig&utm_campaign=quiz-watt", "type=student"],
    ["/?utm_source=x&utm_campaign=profile", "type=pt"],
    ["/?utm_source=ig&utm_campaign=memo-berg", "type=pt"],
    ["/?utm_source=ig&utm_campaign=profile", "type=pt"],
  ];
  for (const [path, want] of LP_CASES) {
    const page = await guest.newPage();
    await page.goto(BASE + path, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
    const href = await page.locator('[data-lp="primary-entrance"]').getAttribute("href");
    report(`LPの最初の登録ボタン ${path} → ${want}`, !!href && href.includes(want), `実際: ${href}`);
    const stickyOk = (await page.locator("text=無料ではじめる").count()) > 0;
    report(`LPに登録ボタンがある ${path}`, stickyOk, "「無料ではじめる」が見つからない");
    await page.close();
  }
  await guest.close();

  // 2) ログイン後の画面（テスト用アカウントがあるときだけ）
  if (EMAIL && PASSWORD) {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await ctx.newPage();
    await page.goto(BASE + "/login", { waitUntil: "domcontentloaded" });
    await page.locator('input[type="email"]').fill(EMAIL);
    await page.locator('input[type="password"]').fill(PASSWORD);
    await page.getByRole("button", { name: /ログイン/ }).first().click();
    await page.waitForURL((u) => !u.pathname.startsWith("/login"), { timeout: 20000 }).catch(() => {});
    report("ログイン", !page.url().includes("/login"), page.url());
    await page.close();

    if (!page.url().includes("/login")) {
      for (const path of LOGGED_IN_PAGES) {
        const { problems, finalUrl } = await checkPage(ctx, path, "");
        // アカウントの種類によって、別の画面に案内されるのは正常（例: 学生が /mypage → /student）
        report(`ログイン後 ${path}${finalUrl.endsWith(path) ? "" : ` → ${new URL(finalUrl).pathname}`}`, problems.length === 0, problems.join(" / "));
      }
    }
    await ctx.close();
  } else {
    console.log("SKIP  ログイン後の画面（E2E_EMAIL / E2E_PASSWORD が未設定）");
  }
} finally {
  await browser.close();
}

console.log(failed === 0 ? "\nすべて成功" : `\n${failed} 件失敗`);
process.exit(failed === 0 ? 0 : 1);
