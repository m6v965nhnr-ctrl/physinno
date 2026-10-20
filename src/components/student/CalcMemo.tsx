"use client";

import { useRef, useState } from "react";
import { calc } from "@/lib/calc";
import { notify } from "@/lib/notify";

const KEYS = [
  ["C", "(", ")", "⌫"],
  ["7", "8", "9", "÷"],
  ["4", "5", "6", "×"],
  ["1", "2", "3", "−"],
  ["0", ".", "=", "+"],
];

// 問題を解きながら使う、メモと電卓。入力はこの画面の中だけ（保存・送信しない）
export default function CalcMemo() {
  const [memo, setMemo] = useState("");
  const [expr, setExpr] = useState("");
  const [result, setResult] = useState<string | null>(null);

  function press(k: string) {
    if (k === "=") {
      equals();
    } else if (k === "C") {
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

  const isErr = result !== null && result.startsWith("式");

  function toMemo() {
    if (isErr || !expr) return;
    setMemo((m) => (m.trim() ? `${m.trimEnd()} ${expr}` : expr));
  }

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clearTimer = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };

  async function copy() {
    if (isErr || !expr) return;
    try {
      await navigator.clipboard.writeText(expr);
      notify("コピーしました");
    } catch {
      notify("コピーできませんでした");
    }
  }

  const shown = result !== null && result.startsWith("式") ? result : expr || "0";

  return (
    <section className="space-y-2 rounded-2xl border border-gray-200 bg-white p-2 shadow-sm" aria-label="メモと電卓">
      <textarea
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
        rows={2}
        aria-label="メモ"
        placeholder="メモ"
        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-2 py-1.5 text-sm leading-6 outline-none focus:border-gray-400"
      />

      <div>
        <div className="flex items-stretch gap-1">
          <button type="button" onClick={toMemo} className="shrink-0 rounded-lg bg-gray-200 px-2 text-xs font-semibold text-gray-700 active:scale-95">
            メモへ
          </button>
          <output
            onPointerDown={() => {
              clearTimer();
              timer.current = setTimeout(copy, 500);
            }}
            onPointerUp={clearTimer}
            onPointerLeave={clearTimer}
            onPointerCancel={clearTimer}
            onContextMenu={(e) => e.preventDefault()}
            title="長押しでコピー"
            className={`select-none block min-h-[2rem] min-w-0 flex-1 break-all rounded-lg bg-gray-900 px-3 py-1 text-right text-base tabular-nums ${
              isErr ? "text-sm text-amber-300" : "text-white"
            }`}
          >
            {shown}
          </output>
        </div>
        <div className="mt-1.5 grid grid-cols-4 gap-1">
          {KEYS.flat().map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => press(k)}
              className={`rounded-lg py-1.5 text-base font-medium active:scale-95 ${
                k === "="
                  ? "bg-gray-900 font-bold text-white"
                  : /[÷×−+]/.test(k)
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
        </div>
      </div>
    </section>
  );
}
