import assert from "node:assert/strict";
import { parseQuery, toPubMed, withFilters, positiveTerms, toBooleanPlain } from "../src/lib/paperSearch/query.ts";
const q = (s: string) => { const r = parseQuery(s); return { s: r.node ? toPubMed(r.node) : null, e: r.issues.filter((i) => i.level === "error").length, w: r.issues.filter((i) => i.level === "warn").length }; };
// 基本のブール・括弧
assert.deepEqual(q('(stroke OR "cerebrovascular accident") AND (exercise OR rehabilitation)'), { s: '(stroke OR "cerebrovascular accident") AND (exercise OR rehabilitation)', e: 0, w: 0 });
// 左から順（PubMedと同じ）: A OR B AND C → (A OR B) AND C、警告つき
assert.deepEqual(q("a1b2c OR d3e4f AND g5h6i"), { s: "(a1b2c OR d3e4f) AND g5h6i", e: 0, w: 1 });
// 隣り合う語はAND
assert.equal(q("stroke exercise").s, "stroke AND exercise");
// NOT
assert.equal(q("stroke NOT animal").s, "stroke NOT animal");
assert.equal(q("stroke NOT (rat OR mouse)").s, "stroke NOT (rat OR mouse)");
// フィールドタグ
assert.equal(q("stroke[tiab] AND Smith[au] AND stroke[mh]").s, "stroke[tiab] AND Smith[au] AND stroke[mh]");
assert.equal(q("stroke[xx]").e, 1);
// フレーズ・近接
assert.equal(q('"gait speed"').s, '"gait speed"');
assert.equal(q('"hip pain"[tiab:~3]').s, '"hip pain"[tiab:~3]');
assert.equal(q('"hip pain"[mh:~3]').e, 1);
assert.equal(q("hip[tiab:~3]").e, 1);
// ワイルドカード（前に4文字以上）
assert.equal(q("rehabilitat*").e, 0);
assert.equal(q("reh*").e, 1);
// 不正な式
for (const bad of ["", "   ", "(stroke", "stroke)", "AND stroke", "stroke AND", '"stroke', "stroke[tiab", "()"]) assert.ok(q(bad).e >= 1, `不正な式を通した: ${bad}`);
assert.ok(q("a".repeat(2001)).e >= 1);
// 全角・特殊文字
assert.equal(q("（stroke OR 脳卒中）").e, 0);
assert.equal(q("stroke[tiab]; DROP").e, 0); // 文字として扱われ、構文は壊れない
// フィルター
assert.equal(withFilters("stroke", {}), "stroke");
const f = withFilters("stroke", { from: 2020, to: 2024, types: ["rct", "sr"], ft: "free", humans: true, lang: ["english", "japanese"] });
assert.ok(f.startsWith("(stroke) AND 2020:2024[dp] AND (randomized controlled trial[pt] OR systematic[sb]) AND free full text[sb]"));
assert.ok(f.includes("humans[mh]") && f.includes("(english[la] OR japanese[la])"));
assert.ok(withFilters("x", { cq: "therapy-narrow" }).includes("randomized controlled trial[Publication Type]"));
assert.equal(withFilters("x", { journal: 'Stroke"[ta] OR (evil' }).includes("evil"), true); // 記号は除去され、構文は壊れない
assert.ok(!withFilters("x", { journal: 'a"b[ta]' }).includes('"a"b'));
// 他サイト向け
const n = parseQuery('(stroke OR "cerebrovascular accident") AND "gait speed" NOT rat').node!;
assert.deepEqual(positiveTerms(n).terms.map((t) => t.text), ["stroke", "cerebrovascular accident", "gait speed", "rat"].slice(0, 3));
assert.equal(positiveTerms(n).hasNot, true);
assert.equal(toBooleanPlain(n), '((stroke OR "cerebrovascular accident") AND "gait speed") NOT rat');
console.log("paperquery: ok");
import { planFor, corePlain } from "../src/lib/paperSearch/sites.ts";
{
  const ast = parseQuery('(stroke OR "cerebrovascular accident") AND "gait speed"').node!;
  const f = { from: 2020, to: 2024, ft: "free" as const, types: ["rct"], humans: true };
  const e = planFor("europepmc", ast, "", f, "pubdate");
  assert.ok(e.query.includes("PUB_YEAR:[2020 TO 2024]") && e.query.includes("OPEN_ACCESS:y") && e.query.startsWith('((stroke OR "cerebrovascular accident")'));
  assert.equal(e.params.sort, "P_PDATE_D desc");
  assert.deepEqual(e.report.unsupported.sort(), ["ヒトを対象", "論文タイプ"]);
  const o = planFor("openalex", ast, "", f, "relevance");
  assert.ok(o.params.filter.includes("from_publication_date:2020-01-01") && o.params.filter.includes("open_access.is_oa:true"));
  const j = planFor("jstage", ast, "", f, "relevance");
  assert.equal(j.query, "stroke \"gait speed\"".replace('"', "").replace('"', ""));
  assert.equal(j.params.pubyearfrom, "2020");
  assert.ok(j.report.note && j.report.unsupported.includes("全文"));
  assert.equal(planFor("clinicaltrials", ast, "", {}, "relevance").report.applied.length, 0);
  assert.equal(corePlain(parseQuery("a1b2c1 NOT rat").node!).text, "a1b2c1");
  console.log("sites: ok");
}
