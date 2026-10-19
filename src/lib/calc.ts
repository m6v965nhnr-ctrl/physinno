// 四則演算と括弧だけの式を、evalを使わずに計算する（再帰下降）。式が正しくなければ null
export function calc(src: string): number | null {
  const s = src.replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-").replace(/\s+/g, "");
  let i = 0;
  const num = (): number | null => {
    const m = /^\d*\.?\d+|^\d+\.?/.exec(s.slice(i));
    if (!m) return null;
    i += m[0].length;
    return parseFloat(m[0]);
  };
  const factor = (): number | null => {
    if (s[i] === "-") {
      i++;
      const v = factor();
      return v === null ? null : -v;
    }
    if (s[i] === "(") {
      i++;
      const v = expr();
      if (v === null || s[i] !== ")") return null;
      i++;
      return v;
    }
    return num();
  };
  const term = (): number | null => {
    let v = factor();
    while (v !== null && (s[i] === "*" || s[i] === "/")) {
      const op = s[i++];
      const r = factor();
      if (r === null) return null;
      v = op === "*" ? v * r : v / r;
    }
    return v;
  };
  const expr = (): number | null => {
    let v = term();
    while (v !== null && (s[i] === "+" || s[i] === "-")) {
      const op = s[i++];
      const r = term();
      if (r === null) return null;
      v = op === "+" ? v + r : v - r;
    }
    return v;
  };
  const v = expr();
  return v === null || i !== s.length || !Number.isFinite(v) ? null : Number(v.toPrecision(12));
}
