"use client";

import { useState } from "react";
import { calc } from "@/lib/calc";

const KEYS = [
  ["C", "(", ")", "⌫"],
  ["7", "8", "9", "÷"],
  ["4", "5", "6", "×"],
  ["1", "2", "3", "−"],
  ["0", "00", ".", "+"],
];

// 問題を解きながら使う、メモと電卓。入力はこの画面の中だけ（保存・送信しない）
export default function CalcMemo() {
  const [memo, setMemo] = useState("");
  const [expr, setExpr] = useState("");
  const [result, setResult] = useState<string | null>(null);

  function press(k: string) {
    if (k === "C") {
      setExpr("");
      setResult(null);
    } else if (k === "⌫") {
      setExpr((e) => e.slice(0, -1));
      setResult(null);
    } else {
      // 答えのあとに数字を打つと新しい式、演算子を打つと答えの続き
      const base = result !== null ? (/[0-9.()]/.test(k) ? "" : result) : expr;
      setExpr(base + k);
      setResult(null);
    }
  }

  function equals() {
    const v = calc(expr);
    if (v === null) {
      setResult("式を確かめてください");
      return;
    }
    setResult(String(v));
    setExpr(String(v));
  }

  const shown = result !== null && result.startsWith("式") ? result : expr || "0";

  return (
    <section className="space-y-3 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm" aria-label="メモと電卓">
      <label className="block">
        <span className="text-[11px] font-semibold text-gray-500">メモ</span>
        <textarea
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          rows={3}
          placeholder="式や数字を書いておけます（次の問題に進むと消えます）"
          className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 p-2 text-sm leading-6 outline-none focus:border-gray-400"
        />
      </label>

      <div>
        <p className="text-[11px] font-semibold text-gray-500">電卓</p>
        <output
          className={`mt-1 block min-h-[2.75rem] break-all rounded-xl bg-gray-900 px-3 py-2 text-right text-lg tabular-nums ${
            result?.startsWith("式") ? "text-sm text-amber-300" : "text-white"
          }`}
        >
          {shown}
        </output>
        <div className="mt-2 grid grid-cols-4 gap-1.5">
          {KEYS.flat().map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => press(k)}
              className={`rounded-xl py-3 text-base font-medium active:scale-95 ${
                /[÷×−+]/.test(k)
                  ? "bg-emerald-100 text-emerald-900"
                  : k === "C" || k === "⌫"
                    ? "bg-gray-200 text-gray-700"
                    : "bg-gray-50 text-gray-900 ring-1 ring-gray-200"
              }`}
              aria-label={k === "⌫" ? "1文字消す" : k === "C" ? "全部消す" : k}
            >
              {k}
            </button>
          ))}
          <button
            type="button"
            onClick={equals}
            className="col-span-4 rounded-xl bg-gray-900 py-3 text-base font-bold text-white active:scale-95"
          >
            =
          </button>
        </div>
      </div>
    </section>
  );
}
