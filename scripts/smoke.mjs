// 公開ページの簡易スモークテスト（デプロイ後の確認用）
//   node scripts/smoke.mjs                      … 本番 (https://relight-1wet.vercel.app)
//   node scripts/smoke.mjs http://localhost:3000 … ローカル
// ログインが必要な画面は対象外。失敗があれば終了コード1で終わる。

const BASE = (process.argv[2] || process.env.SMOKE_BASE_URL || "https://relight-1wet.vercel.app").replace(/\/$/, "");

let failed = 0;
function check(name, ok, detail = "") {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${ok ? "" : `  ${detail}`}`);
  if (!ok) failed++;
}

async function get(path, init) {
  const res = await fetch(BASE + path, { redirect: "manual", ...init });
  return { res, text: await res.text() };
}

// 1) 公開ページが200で、期待する文言を含む
const pages = [
  ["/", ["Re:light", "よくある質問"]],
  ["/terms", ["利用規約"]],
  ["/privacy", ["プライバシーポリシー"]],
  ["/columns", ["コラム"]],
  ["/register", []],
  ["/login", []],
  ["/pts", []],
];
for (const [path, words] of pages) {
  const { res, text } = await get(path);
  check(`GET ${path} → 200`, res.status === 200, `status=${res.status}`);
  for (const w of words) check(`  ${path} に「${w}」を含む`, text.includes(w));
}

// 2) robots.txt / sitemap.xml
const robots = await get("/robots.txt");
check("robots.txt に Sitemap 行がある", /Sitemap:\s*https?:\/\//.test(robots.text));
check("robots.txt が /api と /admin を除外している", /Disallow: \/api/.test(robots.text) && /Disallow: \/admin/.test(robots.text));

const sitemap = await get("/sitemap.xml");
const urls = [...sitemap.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
check("sitemap.xml にURLが含まれる", urls.length > 10, `count=${urls.length}`);
const hospitalUrl = urls.find((u) => u.includes("/hospitals/"));
check("sitemap.xml に病院ページが含まれる", Boolean(hospitalUrl));

// 3) 病院ページのタイトル（generateMetadata）
if (hospitalUrl) {
  const path = new URL(hospitalUrl).pathname;
  const { res, text } = await get(path);
  check(`GET ${path} → 200`, res.status === 200, `status=${res.status}`);
  check("  病院ページのタイトルに「口コミ」を含む", /<title>[^<]*口コミ[^<]*<\/title>/.test(text));
}

// 4) 認証が必要なAPIは未ログインで拒否される
const ai = await get("/api/papers/ai", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ action: "query", query: "test" }),
});
check("POST /api/papers/ai は未ログインで 401/503", [401, 503].includes(ai.res.status), `status=${ai.res.status}`);

// 5) ホーム画面に追加するための設定と、通知メールAPIの認可
const manifest = await get("/manifest.webmanifest");
check("manifest.webmanifest が200", manifest.res.status === 200, `status=${manifest.res.status}`);
const icon = await fetch(BASE + "/pwa/icon?size=192");
check("アプリアイコン(PNG)が取得できる", icon.status === 200 && (icon.headers.get("content-type") || "").includes("image/png"), `status=${icon.status}`);
const notify = await get("/api/notify-email", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ to: "a@example.com", kind: "message", actor: "x" }),
});
check("通知メールAPIは合言葉なしで 401", notify.res.status === 401, `status=${notify.res.status}`);

// 6) 学生向けAPIは未ログインで拒否され、学生ページはログイン前でも落ちない
const helper = await get("/api/student/report-helper", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ mode: "sources", text: "test" }),
});
check("実習レポート支援APIは未ログインで 401/503", [401, 503].includes(helper.res.status), `status=${helper.res.status}`);
const examsPage = await get("/student/exams");
check("GET /student/exams が200（ログイン判定は画面側）", examsPage.res.status === 200, `status=${examsPage.res.status}`);
const studentPage = await get("/student");
check("GET /student が200（ログイン判定は画面側）", studentPage.res.status === 200, `status=${studentPage.res.status}`);

// 7) 論文検索APIが応答する
const search = await get("/api/papers/search?q=" + encodeURIComponent("stroke gait") + "&sources=pubmed");
check("GET /api/papers/search が200", search.res.status === 200, `status=${search.res.status}`);

console.log(failed ? `\n${failed} 件失敗` : "\nすべて成功");
process.exit(failed ? 1 : 0);
