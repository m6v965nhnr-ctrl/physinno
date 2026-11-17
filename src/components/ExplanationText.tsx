// 過去問の解説を、スマホでも読みやすい形で表示する。
// - 「1 〜」「2・3 〜」で始まる行（選択肢ごとの解説）は、番号を左に、本文を右に置く（折り返しが番号の下に回り込まない）
// - 句点で文を区切って、1文ごとに改行する（長い1段落を、そのまま流さない）
const CHOICE = /^((?:[1-5][・、]?)+|[1-5][〜~～][1-5])\s+(.+)$/;

function sentences(s: string): string[] {
  const out: string[] = [];
  let depth = 0;
  let cur = "";
  for (const ch of s) {
    cur += ch;
    if ("（(「『".includes(ch)) depth++;
    else if ("）)」』".includes(ch)) depth = Math.max(0, depth - 1);
    else if (ch === "。" && depth === 0) {
      out.push(cur);
      cur = "";
    }
  }
  if (cur.trim()) out.push(cur);
  return out;
}

export default function ExplanationText({ text, className = "" }: { text: string; className?: string }) {
  const lines = text.split("\n").filter((l) => l.trim() !== "");
  return (
    <div className={`[overflow-wrap:anywhere] [text-wrap:pretty] ${className}`}>
      {lines.map((line, i) => {
        const m = line.match(CHOICE);
        if (m) {
          return (
            <div key={i} className="mt-1.5 flex gap-1.5">
              <span className="min-w-[1.1em] shrink-0 text-right font-semibold text-gray-500">{m[1]}</span>
              <span className="min-w-0 flex-1">
                {sentences(m[2]).map((s, j) => (
                  <span key={j} className="block">{s}</span>
                ))}
              </span>
            </div>
          );
        }
        return (
          <p key={i} className={i === 0 ? "" : "mt-2"}>
            {sentences(line).map((s, j) => (
              <span key={j} className="block">{s}</span>
            ))}
          </p>
        );
      })}
    </div>
  );
}
