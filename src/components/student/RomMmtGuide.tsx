"use client";

import { useState } from "react";
import { GRADES, JOINTS, MMT_ROWS, type Fig, type Motion } from "./romData";

// 解説の下に出す、ROM（関節可動域）とMMT（徒手筋力テスト）の図。問題に関係がありそうなときだけ出す。
// 図は、このアプリで描いた模式図（教科書の絵ではありません）。データの出どころは romData.ts

const dir = (a: number, l: number) => [Math.sin((a * Math.PI) / 180) * l, Math.cos((a * Math.PI) / 180) * l];
const SKIN = "#ecc9a3";
const MOVE = "#0f9d8a";

type P = { cx: number; cy: number; a0: number; len: number; omit: string[]; head?: boolean };
function setup(f: Fig): P {
  const s = f.view === "side";
  switch (f.part) {
    case "arm": return { cx: s ? 50 : 57, cy: 32, a0: 0, len: 36, omit: ["arm"] };
    case "forearm": return { cx: 50, cy: 50, a0: 0, len: 16, omit: ["forearm"] };
    case "leg": return { cx: s ? 50 : 55, cy: 68, a0: 0, len: 46, omit: ["leg"] };
    case "shank": return { cx: 50, cy: 92, a0: 0, len: 22, omit: ["shank", "foot"] };
    case "foot": return { cx: 50, cy: 114, a0: 90, len: 14, omit: ["foot"] };
    case "head": return { cx: 50, cy: 26, a0: 180, len: 10, omit: ["head"], head: true };
    default: return { cx: 50, cy: 68, a0: 180, len: 42, omit: ["trunk", "head", "arm"], head: true };
  }
}

function Body({ f, deg, name }: { f: Fig; deg: number; name: string }) {
  const p = setup(f);
  const side = f.view === "side";
  const a = p.a0 + f.sign * deg;
  const [mx, my] = dir(a, p.len);
  const [bx, by] = dir(p.a0, p.len + 12);
  const [hx, hy] = dir(a, p.len + 8);
  const r = 15;
  const [sx, sy] = dir(p.a0, r);
  const [ex, ey] = dir(a, r);
  const sweep = f.sign > 0 ? 0 : 1;
  const show = (k: string) => !p.omit.includes(k);
  const L = (x1: number, y1: number, x2: number, y2: number, w: number) => (
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={SKIN} strokeWidth={w} strokeLinecap="round" />
  );
  return (
    <svg viewBox="0 0 100 124" role="img" aria-label={`${name} 参考可動域 ${deg}度`} className="h-28 w-auto shrink-0">
      {show("head") && <circle cx="50" cy="13" r="8" fill={SKIN} />}
      {show("trunk") && L(50, 26, 50, 68, 13)}
      {side ? (
        <>
          {show("arm") && show("forearm") && <>{L(50, 32, 50, 50, 6)}{L(50, 50, 50, 66, 5)}</>}
          {!show("forearm") && show("arm") && L(50, 32, 50, 50, 6)}
          {show("leg") && <>{L(50, 68, 50, 92, 8)}{show("shank") && L(50, 92, 50, 114, 6)}{show("foot") && L(50, 114, 63, 114, 5)}</>}
          {!show("leg") ? null : null}
        </>
      ) : (
        <>
          {show("arm") && L(57, 32, 62, 66, 5)}
          {L(43, 32, 38, 66, 5)}
          {L(45, 68, 45, 114, 7)}
          {show("leg") && L(55, 68, 55, 114, 7)}
        </>
      )}
      {side && p.omit.includes("leg") ? null : null}
      <line x1={p.cx} y1={p.cy} x2={p.cx + bx} y2={p.cy + by} stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="3 2" />
      {deg > 0 && <path d={`M ${p.cx + sx} ${p.cy + sy} A ${r} ${r} 0 0 ${sweep} ${p.cx + ex} ${p.cy + ey}`} fill="none" stroke="#f59e0b" strokeWidth="2" />}
      <line x1={p.cx} y1={p.cy} x2={p.cx + mx} y2={p.cy + my} stroke={MOVE} strokeWidth={f.part === "trunk" ? 11 : 6} strokeLinecap="round" />
      {p.head && <circle cx={p.cx + hx} cy={p.cy + hy} r="8" fill={MOVE} />}
      <circle cx={p.cx} cy={p.cy} r="2.5" fill="#111827" />
      <text x="50" y="123" fontSize="9" fontWeight="700" fill="#111827" textAnchor="middle">{deg}°</text>
    </svg>
  );
}

function AngleOnly({ deg, name }: { deg: number; name: string }) {
  const cx = 50, cy = 56, r = 38, ar = 18;
  const rad = (deg * Math.PI) / 180;
  const ex = cx + r * Math.cos(-rad), ey = cy + r * Math.sin(-rad);
  const ax = cx + ar * Math.cos(-rad), ay = cy + ar * Math.sin(-rad);
  return (
    <svg viewBox="0 0 100 84" role="img" aria-label={`${name} 参考可動域 ${deg}度`} className="h-24 w-auto shrink-0">
      <line x1={cx} y1={cy} x2={cx + r} y2={cy} stroke="#9ca3af" strokeWidth="2" strokeDasharray={deg === 0 ? undefined : "3 2"} />
      {deg > 0 && <line x1={cx} y1={cy} x2={ex} y2={ey} stroke={MOVE} strokeWidth="3" strokeLinecap="round" />}
      {deg > 0 && <path d={`M ${cx + ar} ${cy} A ${ar} ${ar} 0 0 0 ${ax} ${ay}`} fill="none" stroke="#f59e0b" strokeWidth="2" />}
      <circle cx={cx} cy={cy} r="2.5" fill="#111827" />
      <text x="50" y="80" fontSize="11" fontWeight="700" fill="#111827" textAnchor="middle">{deg}°</text>
    </svg>
  );
}

// 重力と段階の関係（模式図）
function GravityFigure() {
  const panel = (x: number, title: string, sub: string, children: React.ReactNode) => (
    <g transform={`translate(${x},0)`}>
      <rect x="2" y="2" width="102" height="98" rx="8" fill="#f9fafb" stroke="#e5e7eb" />
      {children}
      <text x="53" y="88" fontSize="8.5" fontWeight="700" fill="#111827" textAnchor="middle">{title}</text>
      <text x="53" y="97" fontSize="6.5" fill="#6b7280" textAnchor="middle">{sub}</text>
    </g>
  );
  const arrow = (x1: number, y1: number, x2: number, y2: number, c: string) => (
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeWidth="2" markerEnd={`url(#m${c.slice(1)})`} />
  );
  return (
    <svg viewBox="0 0 330 102" role="img" aria-label="重力に抗する段階と、重力を除く段階の違い" className="w-full">
      <defs>
        {["#0f9d8a", "#ef4444", "#6b7280"].map((c) => (
          <marker key={c} id={`m${c.slice(1)}`} markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 z" fill={c} />
          </marker>
        ))}
      </defs>
      {panel(0, "段階3", "重力に抗して動かす", <>
        <circle cx="30" cy="62" r="3" fill="#111827" />
        <line x1="30" y1="62" x2="76" y2="62" stroke="#9ca3af" strokeDasharray="3 2" />
        <line x1="30" y1="62" x2="68" y2="30" stroke={MOVE} strokeWidth="6" strokeLinecap="round" />
        {arrow(88, 24, 88, 52, "#6b7280")}<text x="94" y="40" fontSize="7" fill="#6b7280">重力</text>
      </>)}
      {panel(112, "段階4・5", "重力＋抵抗に抗して", <>
        <circle cx="30" cy="62" r="3" fill="#111827" />
        <line x1="30" y1="62" x2="68" y2="30" stroke={MOVE} strokeWidth="6" strokeLinecap="round" />
        {arrow(60, 14, 74, 26, "#ef4444")}<text x="50" y="12" fontSize="7" fill="#ef4444">抵抗（検査者）</text>
        {arrow(88, 24, 88, 52, "#6b7280")}
      </>)}
      {panel(224, "段階2", "重力を除いた肢位で", <>
        <circle cx="30" cy="62" r="3" fill="#111827" />
        <line x1="30" y1="62" x2="76" y2="62" stroke={MOVE} strokeWidth="6" strokeLinecap="round" />
        <path d="M 62 40 A 26 26 0 0 1 76 54" fill="none" stroke="#f59e0b" strokeWidth="2" />
        <text x="53" y="22" fontSize="7" fill="#6b7280" textAnchor="middle">重力は、動きに</text>
        <text x="53" y="31" fontSize="7" fill="#6b7280" textAnchor="middle">垂直になる</text>
      </>)}
    </svg>
  );
}

const WORDS = /関節可動域|可動域|ROM|角度計|MMT|徒手筋力|筋力テスト|筋力検査/;
const MMT_PARTS = ["股", "膝", "足", "肩", "肩甲骨", "肘", "前腕", "体幹", "頸部", "骨盤", "手指"];
const MMT_OF: Record<string, string> = { girdle: "肩甲骨", shoulder: "肩", elbow: "肘", wrist: "手指", hip: "股", knee: "膝", ankle: "足", neck: "頸部", trunk: "体幹" };

function MotionCard({ m }: { m: Motion }) {
  return (
    <li className="flex items-center gap-2 rounded-xl bg-gray-50 p-2">
      {m.fig ? <Body f={m.fig} deg={m.deg} name={m.name} /> : <AngleOnly deg={m.deg} name={m.name} />}
      <div className="min-w-0 text-[11px] leading-4 text-gray-700">
        <p className="text-xs font-semibold text-gray-900">{m.name}　<span className="text-emerald-700">{m.deg}°</span></p>
        <p><span className="font-semibold text-gray-500">基本軸</span>　{m.base}</p>
        <p><span className="font-semibold text-gray-500">移動軸</span>　{m.move}</p>
        {m.pos && <p><span className="font-semibold text-gray-500">肢位</span>　{m.pos}</p>}
      </div>
    </li>
  );
}

export default function RomMmtGuide({ text }: { text: string }) {
  const hit = JOINTS.find((j) => j.words.test(text));
  const [sel, setSel] = useState<string | null>(null);
  const [mmtSel, setMmtSel] = useState<string | null>(null);
  if (!WORDS.test(text)) return null;
  const cur = JOINTS.find((j) => j.key === (sel ?? hit?.key ?? "shoulder")) ?? JOINTS[1];
  const part = mmtSel ?? MMT_OF[cur.key] ?? "肩";
  const chip = (on: boolean) => `whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-semibold ${on ? "bg-black text-white" : "border border-gray-200 text-gray-700"}`;

  return (
    <details className="mt-3 rounded-xl border border-gray-200 bg-white">
      <summary className="cursor-pointer list-none px-3 py-2.5 text-sm font-semibold text-gray-800">
        📐 ROM・MMTを図で確かめる <span className="text-gray-400">▾</span>
      </summary>
      <div className="space-y-5 border-t border-gray-100 p-3">
        <section>
          <p className="text-xs font-semibold text-gray-700">ROM：関節可動域の測定</p>
          <div role="group" aria-label="関節を選ぶ" className="mt-2 flex flex-wrap gap-1.5">
            {JOINTS.map((j) => (
              <button key={j.key} type="button" aria-pressed={cur.key === j.key} onClick={() => { setSel(j.key); setMmtSel(null); }} className={chip(cur.key === j.key)}>
                {j.label}
              </button>
            ))}
          </div>
          <ul className="mt-2 space-y-2">{cur.motions.map((m) => <MotionCard key={m.name} m={m} />)}</ul>
          <p className="mt-2 text-[10px] leading-4 text-gray-400">
            灰の点線＝基本軸（0°）、緑＝動かす側、橙＝動く角度。模式図で、実際の測定の姿勢そのものではありません（図のない運動は、角度だけです）。参考可動域は、日本整形外科学会・日本リハビリテーション医学会・日本足の外科学会「関節可動域表示ならびに測定法」（2022年4月改訂）。基本軸・移動軸・肢位は、同じ測定法を載せた教科書で確かめました（確認日 2026-10-21）。公式の資料：
            <a href="https://www.jarm.or.jp/member/document/kadou/shusei.pdf" target="_blank" rel="noopener" className="underline">日本リハビリテーション医学会</a>
          </p>
        </section>

        <section>
          <p className="text-xs font-semibold text-gray-700">MMT：筋力の段階（0〜5）</p>
          <div className="mt-2"><GravityFigure /></div>
          <ol className="mt-2 space-y-1">
            {GRADES.map((g) => (
              <li key={g.g} className="flex items-center gap-2 rounded-lg bg-gray-50 px-2 py-1.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white">{g.g}</span>
                <span className="min-w-0 text-[11px] leading-4 text-gray-700"><span className="font-semibold">{g.name}</span>　{g.body}</span>
              </li>
            ))}
          </ol>

          <p className="mt-3 text-xs font-semibold text-gray-700">主な検査の肢位（部位を選ぶ）</p>
          <div role="group" aria-label="MMTの部位を選ぶ" className="mt-2 flex flex-wrap gap-1.5">
            {MMT_PARTS.map((p) => (
              <button key={p} type="button" aria-pressed={part === p} onClick={() => setMmtSel(p)} className={chip(part === p)}>{p}</button>
            ))}
          </div>
          <ul className="mt-2 space-y-1.5">
            {MMT_ROWS.filter((r) => r[0] === part).map((r) => (
              <li key={r[0] + r[1]} className="rounded-xl bg-gray-50 p-2 text-[11px] leading-4 text-gray-700">
                <p className="text-xs font-semibold text-gray-900">{r[1]}　<span className="font-normal text-gray-500">{r[2]}</span></p>
                <p><span className="font-semibold text-gray-500">段階3・4・5</span>　{r[3]}</p>
                <p><span className="font-semibold text-gray-500">段階2</span>　{r[4]}</p>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-[10px] leading-4 text-gray-400">一般的な基準（Daniels &amp; Worthingham、Kendallなど）と、MMTを載せた教科書の要約です（確認日 2026-10-21）。学校・教科書により、書き方に差があります。+ / − の細かい段階は、省いています。</p>
        </section>
      </div>
    </details>
  );
}
