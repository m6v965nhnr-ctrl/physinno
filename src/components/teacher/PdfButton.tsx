"use client";

import { useState } from "react";
import { notify } from "@/lib/notify";

// 画面の一部（id で指定）を、PDFにして保存する。ほかの先生に渡すための、CSVではなく見やすい資料
export default function PdfButton({ targetId, filename, label = "PDFで保存" }: { targetId: string; filename: string; label?: string }) {
  const [busy, setBusy] = useState(false);

  async function go() {
    const el = document.getElementById(targetId);
    if (!el || busy) return;
    setBusy(true);
    try {
      const { savePdf } = await import("@/lib/savePdf");
      await savePdf(el, `${filename}_${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch {
      notify("PDFを作れませんでした。もう一度お試しください", "error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <button type="button" onClick={go} disabled={busy} data-html2canvas-ignore="true" className="shrink-0 rounded-full border border-gray-300 px-3 py-1 text-xs text-gray-700 disabled:opacity-50">
      {busy ? "作っています…" : label}
    </button>
  );
}
