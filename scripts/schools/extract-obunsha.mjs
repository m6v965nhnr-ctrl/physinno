// 旺文社 教育情報センター「第61回 理学療法士・作業療法士 国家試験結果」（厚生労働省発表資料に基づく）のPDFから、
// 大学別（大学新卒のみ）の、理学療法士の受験者数・合格者数・合格率を取り出す。
//   node scripts/schools/extract-obunsha.mjs /tmp/obunsha_pt_2026.pdf > /tmp/pt_univ_raw.json
import { getDocumentProxy } from "unpdf";
import fs from "node:fs";

const pdf = await getDocumentProxy(new Uint8Array(fs.readFileSync(process.argv[2])));
const out = [];
let section = null;

for (let pn = 2; pn <= pdf.numPages; pn++) {
  const page = await pdf.getPage(pn);
  const tc = await page.getTextContent();
  const items = tc.items
    .filter((i) => i.str.trim())
    .map((i) => ({ s: i.str.trim(), x: Math.round(i.transform[4]), y: Math.round(i.transform[5]) }))
    .sort((a, b) => b.y - a.y || a.x - b.x);

  const rows = [];
  let cur = null;
  let line = [];
  for (const it of items) {
    if (cur === null || Math.abs(it.y - cur) > 3) {
      if (line.length) rows.push(line);
      line = [];
      cur = it.y;
    }
    line.push(it);
  }
  if (line.length) rows.push(line);

  for (const r of rows) {
    const text = r.map((i) => i.s).join("");
    // 区分の見出し行（「国 立 大」「公 立 大」「私 立 大」。1文字ずつ分かれている）
    const sec = text.replace(/\s/g, "");
    if (/^国立大$/.test(sec)) section = "national";
    else if (/^公立大$/.test(sec)) section = "public";
    else if (/^私立大$/.test(sec)) section = "private";

    const name = r.find((i) => i.x >= 140 && i.x < 290 && /大/.test(i.s));
    const pref = r.find((i) => i.x < 140 && i.x >= 100);
    const nums = r.filter((i) => i.x >= 300 && i.x < 400).sort((a, b) => a.x - b.x).map((i) => i.s);
    if (!name || nums.length < 3 || !section) continue;

    const takers = nums[0] === "－" ? null : Number(nums[0]);
    const passers = nums[1] === "－" ? null : Number(nums[1]);
    const rate = nums[2] === "－" ? null : Number(nums[2]);
    out.push({ page: pn, section, prefLabel: pref ? pref.s : null, name: name.s, takers, passers, rate });
  }
}

console.log(JSON.stringify(out, null, 1));
console.error(`${out.length} rows`);
