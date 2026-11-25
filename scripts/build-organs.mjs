// src/content/organs/data/*.json を検証して、generated.ts にまとめる。
// 出典のない記述・存在しない出典番号・https でない出典・存在しない図や関連カードがあれば、ビルドを止める
import fs from "node:fs";
import path from "node:path";
const dir = "src/content/organs/data";
const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith(".json")).sort() : [];
const errs = [];
const slugsIn = (d) => (fs.existsSync(d) ? fs.readdirSync(d).filter((f) => f.endsWith(".json")).map((f) => f.replace(/\.json$/, "")) : []);
const DISEASES = new Set(slugsIn("src/content/diseases/data"));
const TESTS = new Set(slugsIn("src/content/tests/data"));
const ORGANS = new Set(files.map((f) => f.replace(/\.json$/, "")));
const arr = (v) => (Array.isArray(v) ? v : []);
const out = files.map((f) => {
  const d = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
  const id = f.replace(/\.json$/, "");
  const e = (m) => errs.push(`${f}: ${m}`);
  if (d.slug !== id) e("slug とファイル名が違う");
  for (const k of ["name", "reading", "system"]) if (!d[k]) e(`${k} がない`);
  const ns = new Set(arr(d.sources).map((s) => s.n));
  arr(d.sources).forEach((s, i) => {
    if (!/^https?:\/\//.test(s.url ?? "")) e(`sources[${i}] の url が https でない`);
    if (!/^2026-\d\d-\d\d$/.test(s.checked ?? "")) e(`sources[${i}] の checked が不正`);
    if (!s.title || !s.org || !s.kind) e(`sources[${i}] の title/org/kind がない`);
  });
  const claim = (c, where) => {
    if (!c?.t) return e(`${where} が空`);
    if (!c.s?.length || c.s.some((n) => !ns.has(n))) e(`${where} の出典番号が不正（${c.t.slice(0, 12)}…）`);
  };
  claim(d.summary, "summary");
  for (const k of ["location", "structure", "function", "mechanism"]) arr(d[k]).forEach((c, i) => claim(c, `${k}[${i}]`));
  if (!arr(d.location).length && !arr(d.structure).length && !arr(d.function).length) e("location・structure・function のどれかが必要");
  arr(d.examPoints).forEach((p, i) => {
    claim(p, `examPoints[${i}]`);
    for (const q of p.q ?? []) if (!/^\d{2}-(am|pm)-\d{1,3}$/.test(q)) e(`問題IDが不正 ${q}`);
  });
  for (const s of arr(d.diseases)) if (!DISEASES.has(s)) e(`diseases に存在しない slug: ${s}`);
  for (const s of arr(d.tests)) if (!TESTS.has(s)) e(`tests に存在しない slug: ${s}`);
  for (const s of arr(d.related)) if (!ORGANS.has(s)) e(`related に存在しない slug: ${s}`);
  arr(d.figures).forEach((g, i) => {
    if (!g.src?.startsWith("/organs/") || !fs.existsSync(path.join("public", g.src))) e(`figures[${i}] のファイルがない (${g.src})`);
    if (!g.alt || !g.caption) e(`figures[${i}] の alt/caption がない`);
  });
  const checkedOn = arr(d.sources).map((s) => s.checked).sort().at(-1) ?? "";
  return {
    slug: d.slug, name: d.name, reading: d.reading, system: d.system, aliases: arr(d.aliases),
    summary: d.summary, location: arr(d.location), structure: arr(d.structure), function: arr(d.function), mechanism: arr(d.mechanism),
    examPoints: arr(d.examPoints), diseases: arr(d.diseases), tests: arr(d.tests), related: arr(d.related), figures: arr(d.figures),
    sources: arr(d.sources), checkedOn, review: d.review ?? "ai",
  };
});
if (new Set(out.map((d) => d.slug)).size !== out.length) errs.push("slug が重複");
if (errs.length) { console.error("臓器カードの検証に失敗:\n" + errs.join("\n")); process.exit(1); }
fs.writeFileSync("src/content/organs/generated.ts", `// 自動生成（scripts/build-organs.mjs）。直接は編集しない\nimport type { OrganCard } from "./types";\nexport const ORGANS: OrganCard[] = ${JSON.stringify(out, null, 1)};\n`);
console.log(`臓器カード ${out.length} 件`);
