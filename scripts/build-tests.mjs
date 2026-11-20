// src/content/tests/data/*.json を検証して、generated.ts にまとめる。
// 出典のない行、https でない出典、空の項目、不正な問題IDがあれば、ビルドを止める
import fs from "node:fs";
import path from "node:path";
const dir = "src/content/tests/data";
const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith(".json")).sort() : [];
const errs = [];
const CATS = ["評価尺度", "臨床検査", "診断基準・分類", "検査法・徴候", "リスク管理", "物理療法"];
const out = files.map((f) => {
  const d = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
  const id = f.replace(/\.json$/, "");
  if (d.slug !== id) errs.push(`${f}: slug とファイル名が違う`);
  if (!d.name) errs.push(`${f}: name がない`);
  if (!CATS.includes(d.category)) errs.push(`${f}: category が不明 (${d.category})`);
  if (!d.rows?.length) errs.push(`${f}: rows が空`);
  (d.rows ?? []).forEach((r, i) => {
    for (const k of ["item", "value"]) if (!r[k]) errs.push(`${f}: rows[${i}].${k} が空`);
    if (!r.sources?.length || r.sources.some((s) => !/^https?:\/\//.test(s.url))) errs.push(`${f}: rows[${i}] の出典（https の url）が必要`);
    for (const q of r.q ?? []) if (!/^\d{2}-(am|pm)-\d{1,3}$/.test(q)) errs.push(`${f}: 問題IDが不正 ${q}`);
  });
  return {
    slug: d.slug, name: d.name, category: d.category, aliases: d.aliases ?? [],
    rows: (d.rows ?? []).map((r) => ({ item: r.item, target: r.target ?? "", value: r.value, exam: r.exam ?? "", q: r.q ?? [], note: r.note ?? "", conflict: !!r.conflict, sources: r.sources })),
    checkedOn: d.checkedOn ?? "", review: d.review ?? "ai",
  };
});
if (new Set(out.map((d) => d.slug)).size !== out.length) errs.push("slug が重複");
if (errs.length) { console.error("検査カードの検証に失敗:\n" + errs.join("\n")); process.exit(1); }
fs.writeFileSync("src/content/tests/generated.ts", `// 自動生成（scripts/build-tests.mjs）。直接は編集しない\nimport type { TestCard } from "./types";\nexport const TESTS: TestCard[] = ${JSON.stringify(out, null, 1)};\n`);
console.log(`検査カード ${out.length} 件・${out.reduce((a, d) => a + d.rows.length, 0)} 行`);
