// 論文検索の詳細検索の画面テスト（実際のChromeで操作）。先に npm run dev。 node scripts/paper-ui.test.mjs [BASE_URL]
import { chromium } from "playwright-core";
const BASE = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
let failed = 0;
const ok = (n, c, d = "") => { console.log(`${c ? "PASS" : "FAIL"}  ${n}${c ? "" : "  " + d}`); if (!c) failed++; };
const browser = await chromium.launch({ channel: "chrome", headless: true });
for (const [label, vp] of [["PC", { width: 1200, height: 900 }], ["スマホ", { width: 390, height: 800 }]]) {
  const page = await (await browser.newContext({ viewport: vp })).newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  const calls = [];
  page.on("request", (r) => { if (r.url().includes("/api/papers/search")) calls.push(new URL(r.url()).searchParams); });
  await page.goto(`${BASE}/paper-search`, { waitUntil: "networkidle" });
  await page.waitForFunction(() => { const b = [...document.querySelectorAll("button")].find((x) => x.textContent.includes("詳細検索")); return b && Object.keys(b).some((k) => k.startsWith("__react")); }, null, { timeout: 60000 });
  await page.getByRole("button", { name: /詳細検索/ }).first().click();
  await page.getByText("発表年").first().waitFor();
  ok(`${label}: パネルが開く`, true);
  // 検索式の編集と検証
  await page.getByLabel("検索式を直接編集する（PubMed形式）").check();
  const ta = page.getByRole("textbox", { name: "検索式", exact: true });
  await ta.fill('(stroke OR "cerebrovascular accident") AND "gait speed"[tiab:~3] OR reh*');
  const txt = await page.locator("body").innerText();
  ok(`${label}: ワイルドカードの誤りを指摘`, txt.includes("4文字以上"));
  ok(`${label}: 括弧なしの混在を警告`, txt.includes("左から順"));
  await ta.fill('(stroke OR "cerebrovascular accident") AND ("strength training" OR "resistance training") AND "gait speed"[tiab]');
  ok(`${label}: 正しい式で「PubMedに送る式」を表示`, (await page.locator("body").innerText()).includes("PubMedに送る式"));
  // フィルター
  await page.getByRole("button", { name: "ランダム化比較試験（RCT）" }).click();
  await page.getByRole("button", { name: "直近5年" }).click();
  await page.getByRole("button", { name: "無料全文のリンクあり" }).click();
  await page.getByLabel("並び替え").selectOption("pubdate");
  const chips = await page.locator('[aria-label="適用中の条件"] button').allInnerTexts();
  ok(`${label}: 適用中の条件が表示される`, chips.length >= 5, chips.join("|"));
  // 1つ外す → 全解除
  await page.getByRole("button", { name: "ランダム化比較試験（RCT）を外す" }).click();
  ok(`${label}: 条件を1つ外せる`, !(await page.locator('[aria-label="適用中の条件"]').innerText()).includes("ランダム化"));
  await page.getByRole("button", { name: "ランダム化比較試験（RCT）" }).click();
  // 検索を実行 → APIに条件が渡る
  await Promise.all([
    page.waitForResponse((r) => r.url().includes("/api/papers/search"), { timeout: 60000 }),
    page.getByRole("button", { name: "この条件で検索" }).click(),
  ]);
  await page.waitForTimeout(1500);
  const p = calls.at(-1);
  ok(`${label}: APIに検索式・条件が渡る`, p && p.get("pq")?.includes("gait speed") && p.get("types") === "rct" && p.get("ft") === "free" && p.get("sort") === "pubdate" && !!p.get("from"), p ? p.toString().slice(0, 200) : "呼ばれていない");
  await page.getByRole("button", { name: /各サイトに送った条件を見る/ }).click({ timeout: 30000 }).catch(() => {});
  const body = await page.locator("body").innerText();
  ok(`${label}: 各サイトの適用/未対応が見える`, body.includes("未対応") || body.includes("適用:"));
  ok(`${label}: 結果が表示される`, (await page.locator("a[href^=http]").count()) > 10);
  // 誤った式のときは検索しない
  const before = calls.length;
  await ta.fill("(stroke AND");
  await page.getByRole("button", { name: "この条件で検索" }).click();
  await page.waitForTimeout(800);
  ok(`${label}: 誤った式は送信されない`, calls.length === before);
  // 全解除
  await page.getByRole("button", { name: "すべて解除" }).click();
  ok(`${label}: すべて解除できる`, (await page.locator('[aria-label="適用中の条件"]').count()) === 0);
  ok(`${label}: JSエラーなし`, errors.length === 0, errors.join(" / "));
  // 横スクロールが出ない（スマホ）
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 2);
  ok(`${label}: 横にはみ出さない`, !overflow);
}
await browser.close();
console.log(failed ? `\n失敗 ${failed} 件` : "\nすべて合格");
process.exit(failed ? 1 : 0);
