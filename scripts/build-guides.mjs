// src/content/guides/data/*.json を検証して、generated.ts にまとめる（出典と確認日がないページは、ビルドを止める）
import fs from "node:fs";
import path from "node:path";
const dir = "src/content/guides/data";
const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith(".json")).sort() : [];
const errs = [];
const guides = files.map((f) => {
  const g = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
  const id = f.replace(/\.json$/, "");
  if (g.slug !== id) errs.push(`${f}: slug とファイル名が違う`);
  for (const k of ["title", "description", "category", "publishedAt", "updatedAt", "checkedOn"]) if (!g[k]) errs.push(`${f}: ${k} がない`);
  if (!Array.isArray(g.sources) || g.sources.length === 0 || g.sources.some((s) => !/^https?:\/\//.test(s.url) || !s.name)) errs.push(`${f}: 出典（name と https の url）が必要`);
  if (!Array.isArray(g.blocks) || g.blocks.length < 3) errs.push(`${f}: 本文が少ない`);
  for (const b of g.blocks ?? []) {
    if (!["h2", "h3", "p", "ul", "table", "note", "links"].includes(b.t)) errs.push(`${f}: 不明なブロック ${b.t}`);
    if (b.t === "table" && (!b.head || !b.rows || b.rows.some((r) => r.length !== b.head.length))) errs.push(`${f}: 表の列数が合わない`);
    if (b.t === "links" && (!Array.isArray(b.items) || b.items.some((x) => !x.label || !/^\//.test(x.href)))) errs.push(`${f}: links は label と、/ で始まる href が必要`);
  }
  return g;
});
if (new Set(guides.map((g) => g.slug)).size !== guides.length) errs.push("slug が重複");
if (errs.length) { console.error("ガイドの検証に失敗:\n" + errs.join("\n")); process.exit(1); }
fs.writeFileSync("src/content/guides/generated.ts", `// 自動生成（scripts/build-guides.mjs）。直接は編集しない\nimport type { Guide } from "./types";\nexport const GUIDES: Guide[] = ${JSON.stringify(guides, null, 1)};\n`);
console.log(`ガイド ${guides.length} 件`);
