"use client";

import { useState } from "react";

// 参考可動域は、日本整形外科学会・日本リハビリテーション医学会・日本足の外科学会「関節可動域表示ならびに測定法」（2022年4月改訂）の参考可動域。
// 図は、角度を示す模式図（このアプリで作成。体の向きは表していません）
type Motion = { name: string; deg: number; note?: string };
const JOINTS: { key: string; label: string; words: RegExp; motions: Motion[] }[] = [
  { key: "girdle", label: "肩甲帯", words: /肩甲帯|肩甲骨|挙上|引き下げ/, motions: [{ name: "屈曲", deg: 20 }, { name: "伸展", deg: 20 }, { name: "挙上", deg: 20 }, { name: "引き下げ", deg: 10 }] },
  { key: "shoulder", label: "肩", words: /肩/, motions: [{ name: "屈曲", deg: 180 }, { name: "伸展", deg: 50 }, { name: "外転", deg: 180 }, { name: "内転", deg: 0 }, { name: "外旋", deg: 60 }, { name: "内旋", deg: 80 }, { name: "水平屈曲", deg: 135 }, { name: "水平伸展", deg: 30 }] },
  { key: "elbow", label: "肘・前腕", words: /肘|前腕|回内|回外/, motions: [{ name: "肘 屈曲", deg: 145 }, { name: "肘 伸展", deg: 5 }, { name: "前腕 回内", deg: 90 }, { name: "前腕 回外", deg: 90 }] },
  { key: "wrist", label: "手", words: /手関節|手首|橈屈|尺屈|掌屈|手/, motions: [{ name: "背屈", deg: 70 }, { name: "掌屈", deg: 90 }, { name: "橈屈", deg: 25 }, { name: "尺屈", deg: 55 }] },
  { key: "hip", label: "股", words: /股/, motions: [{ name: "屈曲", deg: 125 }, { name: "伸展", deg: 15 }, { name: "外転", deg: 45 }, { name: "内転", deg: 20 }, { name: "外旋", deg: 45 }, { name: "内旋", deg: 45 }] },
  { key: "knee", label: "膝", words: /膝/, motions: [{ name: "屈曲", deg: 130 }, { name: "伸展", deg: 0 }] },
  { key: "ankle", label: "足", words: /足関節|足部|足趾|足/, motions: [{ name: "背屈", deg: 20 }, { name: "底屈", deg: 45 }, { name: "内がえし", deg: 30 }, { name: "外がえし", deg: 20 }, { name: "外転", deg: 10 }, { name: "内転", deg: 20 }] },
  { key: "neck", label: "頸部", words: /頸部|頚部|頸/, motions: [{ name: "屈曲", deg: 60 }, { name: "伸展", deg: 50 }, { name: "回旋（左右）", deg: 60 }, { name: "側屈（左右）", deg: 50 }] },
  { key: "trunk", label: "胸腰部", words: /胸腰部|体幹|腰/, motions: [{ name: "屈曲", deg: 45 }, { name: "伸展", deg: 30 }, { name: "回旋（左右）", deg: 40 }, { name: "側屈（左右）", deg: 50 }] },
];

const GRADES: { g: string; name: string; body: string }[] = [
  { g: "5", name: "Normal", body: "重力と最大の抵抗に抗して、全可動域を動かせる" },
  { g: "4", name: "Good", body: "重力と中等度の抵抗に抗して、全可動域を動かせる" },
  { g: "3", name: "Fair", body: "重力に抗して、全可動域を動かせる（抵抗は加えられない）" },
  { g: "2", name: "Poor", body: "重力を除いた肢位で、全可動域を動かせる" },
  { g: "1", name: "Trace", body: "筋の収縮は触れるが、関節は動かない" },
  { g: "0", name: "Zero", body: "筋の収縮が、まったく触れない" },
];

function AngleFigure({ deg, name }: { deg: number; name: string }) {
  const cx = 50, cy = 56, r = 38;
  const rad = (deg * Math.PI) / 180;
  const ex = cx + r * Math.cos(-rad), ey = cy + r * Math.sin(-rad);
  const ar = 18;
  const ax = cx + ar * Math.cos(-rad), ay = cy + ar * Math.sin(-rad);
  const large = deg > 180 ? 1 : 0;
  return (
    <svg viewBox="0 0 100 84" role="img" aria-label={`${name} 参考可動域 ${deg}度`} className="mx-auto h-24 w-auto">
      <line x1={cx} y1={cy} x2={cx + r} y2={cy} stroke="#9ca3af" strokeWidth="2" strokeDasharray={deg === 0 ? undefined : "3 2"} />
      {deg > 0 && <line x1={cx} y1={cy} x2={ex} y2={ey} stroke="#0f9d8a" strokeWidth="3" strokeLinecap="round" />}
      {deg > 0 && <path d={`M ${cx + ar} ${cy} A ${ar} ${ar} 0 ${large} 0 ${ax} ${ay}`} fill="none" stroke="#f59e0b" strokeWidth="2" />}
      <circle cx={cx} cy={cy} r="2.5" fill="#111827" />
      <text x="50" y="80" fontSize="11" fontWeight="700" fill="#111827" textAnchor="middle">{deg}°</text>
    </svg>
  );
}

const WORDS = /関節可動域|可動域|ROM|角度計|MMT|徒手筋力|筋力テスト|筋力検査/;

// 解説の下に出す、ROM（関節可動域）とMMT（徒手筋力テスト）の図。問題に関係がありそうなときだけ出す
export default function RomMmtGuide({ text }: { text: string }) {
  const hit = JOINTS.find((j) => j.words.test(text));
  const [sel, setSel] = useState<string | null>(null);
  if (!WORDS.test(text)) return null;
  const cur = JOINTS.find((j) => j.key === (sel ?? hit?.key ?? "shoulder")) ?? JOINTS[1];

  return (
    <details className="mt-3 rounded-xl border border-gray-200 bg-white">
      <summary className="cursor-pointer list-none px-3 py-2.5 text-sm font-semibold text-gray-800">
        📐 ROM・MMTを図で確かめる <span className="text-gray-400">▾</span>
      </summary>
      <div className="space-y-4 border-t border-gray-100 p-3">
        <section>
          <p className="text-xs font-semibold text-gray-700">ROM：参考可動域（0°からの角度）</p>
          <div role="group" aria-label="関節を選ぶ" className="mt-2 flex flex-wrap gap-1.5">
            {JOINTS.map((j) => (
              <button
                key={j.key}
                type="button"
                aria-pressed={cur.key === j.key}
                onClick={() => setSel(j.key)}
                className={`whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-semibold ${cur.key === j.key ? "bg-black text-white" : "border border-gray-200 text-gray-700"}`}
              >
                {j.label}
              </button>
            ))}
          </div>
          <ul className="mt-2 grid grid-cols-2 gap-2">
            {cur.motions.map((m) => (
              <li key={m.name} className="rounded-xl bg-gray-50 p-2 text-center">
                <p className="text-xs font-semibold text-gray-800">{m.name}</p>
                <AngleFigure deg={m.deg} name={m.name} />
              </li>
            ))}
          </ul>
          <p className="mt-2 text-[10px] leading-4 text-gray-400">
            灰の点線＝基本肢位（0°）、緑＝動かした側。模式図で、体の向きは表していません。数値は、日本整形外科学会・日本リハビリテーション医学会・日本足の外科学会「関節可動域表示ならびに測定法」（2022年4月改訂）の参考可動域です（確認日 2026-10-21）。基本軸・移動軸は、
            <a href="https://www.jarm.or.jp/member/document/kadou/shusei.pdf" target="_blank" rel="noopener" className="underline">日本リハビリテーション医学会の資料</a>
            で確かめてください。
          </p>
        </section>

        <section>
          <p className="text-xs font-semibold text-gray-700">MMT：筋力の段階（0〜5）</p>
          <ol className="mt-2 space-y-1">
            {GRADES.map((g) => (
              <li key={g.g} className="flex items-center gap-2 rounded-lg bg-gray-50 px-2 py-1.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white">{g.g}</span>
                <span className="min-w-0 text-[11px] leading-4 text-gray-700">
                  <span className="font-semibold">{g.name}</span>　{g.body}
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-2 text-[10px] leading-4 text-gray-400">一般的な基準（Daniels &amp; Worthingham、Kendallなど）の要約です。学校・教科書により、書き方に差があります。+ / − の細かい段階は、省いています。</p>
        </section>
      </div>
    </details>
  );
}
