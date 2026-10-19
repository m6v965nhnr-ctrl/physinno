import { notify } from "@/lib/notify";

// 画面の一部を、A4のPDFにして、共有（iPhoneは「ファイルに保存」）またはダウンロードで渡す。
// ブラウザの「印刷」が使えない、ホーム画面のアプリ向け。文字は画像になる（選択・検索はできない）
const PAGE_W = 210;
const PAGE_H = 297;
const MARGIN = 12;
const CONTENT_W = PAGE_W - MARGIN * 2;
const SCALE = 2;

// 印刷用（@media print）の指定を、画面用の指定として取り出す（Tailwindの print: は、層やメディアの入れ子の中にある）
function collectPrintCss(doc: Document): string {
  const out: string[] = [];
  const walk = (rules: CSSRuleList, inPrint: boolean) => {
    for (const rule of Array.from(rules)) {
      const media = rule instanceof CSSMediaRule ? rule.media.mediaText : "";
      const nextInPrint = inPrint || /(^|,|\s)print(\s|,|$)/.test(media);
      // 通常のスタイル規則も cssRules を持つ（入れ子のCSS）ので、先に葉として扱う
      if (!(rule instanceof CSSStyleRule) && "cssRules" in rule && (rule as CSSGroupingRule).cssRules) {
        walk((rule as CSSGroupingRule).cssRules, nextInPrint);
      } else if (inPrint && !rule.cssText.startsWith("@page")) {
        out.push(rule.cssText);
      }
    }
  };
  for (const sheet of Array.from(doc.styleSheets)) {
    try {
      walk(sheet.cssRules, false);
    } catch {
      // 別のサイトのCSS（フォントなど）は読めないので、飛ばす
    }
  }
  return out.join("\n");
}

// ページの切れ目: 各ページの下端に近い、段落・項目の境目で切る
function pageBreaks(total: number, pageH: number, candidates: number[]): number[] {
  const breaks: number[] = [];
  let start = 0;
  while (total - start > pageH) {
    const limit = start + pageH;
    const best = Math.max(0, ...candidates.filter((y) => y > start + pageH * 0.4 && y <= limit));
    start = best || limit;
    breaks.push(start);
  }
  return breaks;
}

export async function savePdf(root: HTMLElement, filename: string) {
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([import("html2canvas-pro"), import("jspdf")]);

  const widthPx = Math.round((CONTENT_W / 25.4) * 96);
  const candidates: number[] = [];

  const canvas = await html2canvas(root, {
    scale: SCALE,
    useCORS: true,
    backgroundColor: "#ffffff",
    width: widthPx,
    windowWidth: widthPx,
    onclone: (doc, el) => {
      const style = doc.createElement("style");
      style.textContent = collectPrintCss(document);
      doc.head.appendChild(style);
      el.style.width = `${widthPx}px`;
      el.style.maxWidth = "none";
      const top = el.getBoundingClientRect().top;
      el.querySelectorAll("section, li, [class*='break-inside-avoid']").forEach((n) => {
        candidates.push((n.getBoundingClientRect().bottom - top) * SCALE);
      });
    },
  });

  const pageHpx = Math.floor((canvas.width * (PAGE_H - MARGIN * 2)) / CONTENT_W);
  const cuts = [0, ...pageBreaks(canvas.height, pageHpx, candidates), canvas.height];

  const pdf = new jsPDF({ unit: "mm", format: "a4" });
  for (let i = 0; i < cuts.length - 1; i++) {
    const sliceH = cuts[i + 1] - cuts[i];
    const part = document.createElement("canvas");
    part.width = canvas.width;
    part.height = sliceH;
    part.getContext("2d")!.drawImage(canvas, 0, cuts[i], canvas.width, sliceH, 0, 0, canvas.width, sliceH);
    if (i > 0) pdf.addPage();
    pdf.addImage(part.toDataURL("image/jpeg", 0.92), "JPEG", MARGIN, MARGIN, CONTENT_W, (sliceH * CONTENT_W) / canvas.width);
  }

  const file = new File([pdf.output("blob")], filename, { type: "application/pdf" });
  await deliver(file);
}

async function deliver(file: File) {
  const share = async () => {
    try {
      await navigator.share({ files: [file], title: file.name });
    } catch (e) {
      if ((e as Error).name !== "AbortError") throw e;
    }
  };

  if (navigator.canShare?.({ files: [file] })) {
    try {
      await share();
    } catch {
      // 時間がかかると、共有が「操作の直後」と見なされず断られることがある → 押し直せる形で出す
      notify("PDFができました", "info", { label: "共有・保存する", onAction: () => void share() });
    }
    return;
  }

  const url = URL.createObjectURL(file);
  const a = document.createElement("a");
  a.href = url;
  a.download = file.name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
}
