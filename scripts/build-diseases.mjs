// src/content/diseases/data/*.json を検証して、generated.ts にまとめる。
// 出典のない記述、存在しない出典番号、空の項目があれば、ビルドを止める。unverified / conflicts は公開データに入れない
import fs from "node:fs";
import path from "node:path";
const dir = "src/content/diseases/data";
const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith(".json")).sort() : [];
const errs = [];
const tdir = "src/content/tests/data";
const TEST_SLUGS = new Set(fs.existsSync(tdir) ? fs.readdirSync(tdir).filter((f) => f.endsWith(".json")).map((f) => f.replace(/\.json$/, "")) : []);
const SYSTEMS = ["神経", "運動器", "循環器", "呼吸器", "代謝・内分泌・腎・消化", "がん・血液・免疫", "感染症", "小児・先天", "精神", "老年・その他"];
const out = files.map((f) => {
  const d = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
  const id = f.replace(/\.json$/, "");
  if (d.slug !== id) errs.push(`${f}: slug とファイル名が違う`);
  for (const k of ["name", "reading", "system"]) if (!d[k]) errs.push(`${f}: ${k} がない`);
  if (!SYSTEMS.includes(d.system)) errs.push(`${f}: system が不明 (${d.system})`);
  const ns = new Set((d.sources ?? []).map((s) => s.n));
  if (!d.sources?.length || d.sources.some((s) => !/^https?:\/\//.test(s.url) || !s.title || !s.checked)) errs.push(`${f}: 出典（title・https の url・checked）が必要`);
  const chk = (label, c) => {
    if (!c?.t) errs.push(`${f}: ${label} が空`);
    else if (!Array.isArray(c.s) || c.s.length === 0 || c.s.some((n) => !ns.has(n))) errs.push(`${f}: ${label} の出典番号が不正「${c.t.slice(0, 20)}」`);
  };
  chk("summary", d.summary);
  for (const k of ["cause", "symptoms", "diagnosis", "classification", "treatment", "pt", "risk"]) (d[k] ?? []).forEach((c, i) => chk(`${k}[${i}]`, c));
  (d.examPoints ?? []).forEach((c, i) => {
    chk(`examPoints[${i}]`, c);
    for (const q of c.q ?? []) if (!/^\d{2}-(am|pm)-\d{1,3}$/.test(q)) errs.push(`${f}: 問題IDが不正 ${q}`);
  });
  (d.confusable ?? []).forEach((c, i) => { if (!c.name || !c.diff) errs.push(`${f}: confusable[${i}] が空`); else chk(`confusable[${i}]`, { t: c.diff, s: c.s }); });
  for (const t of d.tests ?? []) if (!TEST_SLUGS.has(t)) errs.push(`${f}: 検査カードがない ${t}`);
  const checkedOn = (d.sources ?? []).map((s) => s.checked).sort().at(-1) ?? "";
  return {
    slug: d.slug, name: d.name, reading: d.reading, aliases: d.aliases ?? [], system: d.system,
    summary: d.summary, cause: d.cause ?? [], symptoms: d.symptoms ?? [], diagnosis: d.diagnosis ?? [], classification: d.classification ?? [], treatment: d.treatment ?? [], pt: d.pt ?? [], risk: d.risk ?? [], tests: d.tests ?? [],
    examPoints: (d.examPoints ?? []).map((e) => ({ ...e, q: e.q ?? [] })), confusable: d.confusable ?? [], related: d.related ?? [], ...(d.guide ? { guide: d.guide } : {}),
    sources: d.sources, checkedOn, review: d.review ?? "ai",
  };
});
if (new Set(out.map((d) => d.slug)).size !== out.length) errs.push("slug が重複");
if (errs.length) { console.error("疾患カードの検証に失敗:\n" + errs.join("\n")); process.exit(1); }
fs.writeFileSync("src/content/diseases/generated.ts", `// 自動生成（scripts/build-diseases.mjs）。直接は編集しない\nimport type { Disease } from "./types";\nexport const DISEASES: Disease[] = ${JSON.stringify(out, null, 1)};\n`);
console.log(`疾患カード ${out.length} 件`);
