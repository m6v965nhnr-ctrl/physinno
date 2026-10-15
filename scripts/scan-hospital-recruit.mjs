// 病院の公式サイト（トップ→採用ページ→職種ページ）を、ゆっくり読んで、給与・休日・アクセスなどを、書いてあるとおりに抜き出す。
// AIは使わない。文面の決まった書き方（「初任給 218,000円」「年間休日120日」「賞与 年間6.2ヶ月」など）だけを、正規表現で拾う。
//  ・robots.txt で禁止されているページは、読まない。1つの病院につき、最大7ページ。
//  ・理学療法士・リハビリの記載があるページからだけ、給与・休日を拾う（看護師などの給与を混ぜない）
// 使い方: node scripts/scan-hospital-recruit.mjs out.jsonl [件数の上限]
import { appendFileSync, existsSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { execFile } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";

const run = promisify(execFile);
let pdfSeq = 0;

function env(name) {
  if (process.env[name]) return process.env[name];
  const m = readFileSync(new URL("../.env.local", import.meta.url), "utf8").match(new RegExp(`^${name}=(.*)$`, "m"));
  return m ? m[1].trim() : "";
}
const base = env("NEXT_PUBLIC_SUPABASE_URL");
const key = env("NEXT_PUBLIC_SUPABASE_ANON_KEY");
const out = process.argv[2] || "recruit.jsonl";
const limit = Number(process.argv[3] || 100000);
import { scan, setPdfToText } from "./hospital-scan-core.mjs";

// 手元では pdftotext（先頭8ページ）で PDF を文字にする。文字がほとんど取れない（画像のPDF）ときは、
// 先頭3ページを画像にして tesseract（日本語）で読む。OCRは重いので、同時に4つまで
let ocrBusy = 0;
const ocrWait = async () => {
  while (ocrBusy >= 4) await new Promise((r) => setTimeout(r, 300));
  ocrBusy++;
};
async function ocrPdf(tmp) {
  await ocrWait();
  const prefix = tmp.replace(/\.pdf$/, "");
  const env = { ...process.env, OMP_THREAD_LIMIT: "1" };
  try {
    await run("pdftoppm", ["-r", "200", "-f", "1", "-l", "3", "-png", tmp, prefix], { timeout: 60000, env });
    let out = "";
    for (const n of ["1", "2", "3"]) {
      const png = [`${prefix}-${n}.png`, `${prefix}-0${n}.png`].find((f) => existsSync(f));
      if (!png) continue;
      try {
        const { stdout } = await run("tesseract", [png, "stdout", "-l", "jpn", "--psm", "6"], { timeout: 90000, maxBuffer: 5_000_000, env });
        out += stdout + "\n";
      } catch {}
      try { unlinkSync(png); } catch {}
    }
    // OCR は、漢字の間に空白を入れがち。「初 任 給」→「初任給」
    return out.replace(/(?<=[\u3000-\u9fff])[ \t]+(?=[\u3000-\u9fff])/g, "").replace(/(?<=\d)[ \t]+(?=[,，.]\d)/g, "");
  } catch {
    return "";
  } finally {
    ocrBusy--;
  }
}

async function localPdfToText(buf) {
  const tmp = join(tmpdir(), `rl-${process.pid}-${pdfSeq++}.pdf`);
  writeFileSync(tmp, buf);
  try {
    const { stdout } = await run("pdftotext", ["-layout", "-l", "8", "-enc", "UTF-8", tmp, "-"], { timeout: 20000, maxBuffer: 5_000_000 });
    if (stdout.replace(/\s/g, "").length >= 80) return stdout;
    return await ocrPdf(tmp);
  } finally {
    try { unlinkSync(tmp); } catch {}
  }
}
setPdfToText(localPdfToText);

// ---------- 実行 ----------
async function listHospitals() {
  const rows = [];
  for (let from = 0; ; from += 1000) {
    const r = await fetch(`${base}/rest/v1/hospitals?select=id,website,website_status,beds_total&website=not.is.null&order=beds_total.desc.nullslast,id`, {
      headers: { apikey: key, Authorization: `Bearer ${key}`, Range: `${from}-${from + 999}` },
    });
    const page = await r.json();
    rows.push(...page);
    if (page.length < 1000) break;
  }
  // すでに年収が分かっている病院（取り込み済み・人が入れたもの）は、読み直さない
  const have = new Set();
  for (let from = 0; ; from += 1000) {
    const r = await fetch(`${base}/rest/v1/hospital_recruit?select=hospital_id&annual_max=not.is.null&order=hospital_id`, {
      headers: { apikey: key, Authorization: `Bearer ${key}`, Range: `${from}-${from + 999}` },
    });
    const page = await r.json();
    page.forEach((x) => have.add(x.hospital_id));
    if (page.length < 1000) break;
  }
  return rows.filter((h) => h.website_status !== "dead" && !have.has(h.id));
}

if (process.argv[1].endsWith("scan-hospital-recruit.mjs")) {
  const done = new Set(existsSync(out) ? readFileSync(out, "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l).hospital_id) : []);
  if (!existsSync(out)) writeFileSync(out, "");
  const hospitals = (await listHospitals()).filter((h) => !done.has(h.id)).slice(0, limit);
  console.error(`scanning ${hospitals.length} (already ${done.size})`);
  let i = 0, n = 0;
  await Promise.all(
    Array.from({ length: 24 }, async () => {
      while (i < hospitals.length) {
        const h = hospitals[i++];
        let r;
        try {
          r = await scan(h);
        } catch {
          r = { hospital_id: h.id };
        }
        appendFileSync(out, JSON.stringify(r) + "\n");
        if (++n % 200 === 0) console.error(n);
      }
    })
  );
  console.error("finished");
}

export { scan, localPdfToText };
