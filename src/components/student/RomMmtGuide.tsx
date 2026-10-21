"use client";

import { useState } from "react";
import { GRADES, JOINTS, MMT_ROWS, type Fig, type Motion } from "./romData";

// 解説の下に出す、ROM（関節可動域）とMMT（徒手筋力テスト）の図。問題に関係がありそうなときだけ出す。
// 図は、このアプリで描いた模式図（教科書の絵ではありません）。データの出どころは romData.ts

const dir = (a: number, l: number) => [Math.sin((a * Math.PI) / 180) * l, Math.cos((a * Math.PI) / 180) * l];
const SKIN = "#ecc9a3";
const DEFS = (
  <defs>
    <marker id="romarr" markerUnits="userSpaceOnUse" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
      <path d="M0,0 L7,3.5 L0,7 z" fill="#f59e0b" />
    </marker>
  </defs>
);
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
    <svg viewBox={f.part === "foot" ? "8 70 84 54" : "0 0 100 124"} role="img" aria-label={`${name} 参考可動域 ${deg}度`} className={f.part === "foot" ? "h-24 w-auto shrink-0" : "h-28 w-auto shrink-0"}>
      {DEFS}{show("head") && <circle cx="50" cy="13" r="8" fill={SKIN} />}{show("head") && side && <path d="M57 11 L62 14 L57 16 z" fill={SKIN} />}
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
      {deg > 0 && <path d={`M ${p.cx + sx} ${p.cy + sy} A ${r} ${r} 0 0 ${sweep} ${p.cx + ex} ${p.cy + ey}`} fill="none" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#romarr)" />}
      {deg > 0 && <line x1={p.cx} y1={p.cy} x2={p.cx + bx * (p.len / (p.len + 12))} y2={p.cy + by * (p.len / (p.len + 12))} stroke={SKIN} strokeWidth={f.part === "trunk" ? 11 : 6} strokeLinecap="round" opacity="0.55" />}
      <line x1={p.cx} y1={p.cy} x2={p.cx + mx} y2={p.cy + my} stroke={MOVE} strokeWidth={f.part === "trunk" ? 11 : 6} strokeLinecap="round" />
      {(f.part === "arm" || f.part === "forearm") && <circle cx={p.cx + mx} cy={p.cy + my} r="4.5" fill={MOVE} />}
      {(f.part === "leg" || f.part === "shank") && <line x1={p.cx + mx} y1={p.cy + my} x2={p.cx + mx + dir(a + 90, 9)[0]} y2={p.cy + my + dir(a + 90, 9)[1]} stroke={MOVE} strokeWidth="5" strokeLinecap="round" />}
      {p.head && <circle cx={p.cx + hx} cy={p.cy + hy} r="8" fill={MOVE} />}
      <circle cx={p.cx} cy={p.cy} r="2.5" fill="#111827" />
      <text x={f.part === "foot" ? 70 : 50} y={f.part === "foot" ? 68 : 123} fontSize="9" fontWeight="700" fill="#111827" textAnchor="middle">{deg}°</text>
    </svg>
  );
}


const arcD = (cx: number, cy: number, r: number, a0: number, a1: number) => {
  const [x0, y0] = dir(a0, r);
  const [x1, y1] = dir(a1, r);
  return `M ${cx + x0} ${cy + y0} A ${r} ${r} 0 0 ${a1 > a0 ? 0 : 1} ${cx + x1} ${cy + y1}`;
};

// 上から見た図・手の図・足の裏の図など（人の体の一部を、模式的に描く）
function Special({ f, deg, name }: { f: Fig; deg: number; name: string }) {
  const ln = (x1: number, y1: number, x2: number, y2: number, w: number, c = SKIN) => <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeWidth={w} strokeLinecap="round" />;
  const dash = (cx: number, cy: number, a: number, l: number) => { const [x, y] = dir(a, l); return <line x1={cx} y1={cy} x2={cx + x} y2={cy + y} stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="3 2" />; };
  const pt = (cx: number, cy: number, a: number, l: number) => { const [x, y] = dir(a, l); return [cx + x, cy + y]; };
  const arc = (cx: number, cy: number, r: number, a0: number, a1: number) => deg > 0 && <path d={arcD(cx, cy, r, a0, a1)} fill="none" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#romarr)" />;
  const dot = (cx: number, cy: number) => <circle cx={cx} cy={cy} r="2.5" fill="#111827" />;
  // 上から見た体（顔が上）
  const topBody = (cx: number, head = true) => (
    <>
      <ellipse cx={cx} cy="68" rx="26" ry="9" fill={SKIN} />
      {head && <><circle cx={cx} cy="68" r="10" fill="#dbb88f" /><path d={`M ${cx - 4} 59 L ${cx} 52 L ${cx + 4} 59 z`} fill="#dbb88f" /></>}
    </>
  );
  let body: React.ReactNode = null;
  switch (f.part) {
    case "girdleFwd": {
      const a = 90 + f.sign * deg;
      const [x, y] = pt(50, 68, a, 26);
      body = <>{topBody(50)}{dash(50, 68, 90, 32)}{arc(50, 68, 16, 90, a)}{ln(50, 68, x, y, 8, MOVE)}{dot(50, 68)}</>;
      break;
    }
    case "shRot": {
      const a = 180 + f.sign * deg;
      const [x, y] = pt(60, 68, a, 32);
      body = <>{topBody(36)}{dash(60, 68, 180, 36)}{arc(60, 68, 16, 180, a)}{ln(60, 68, x, y, 6, MOVE)}<circle cx={x} cy={y} r="4" fill={MOVE} />{dot(60, 68)}</>;
      break;
    }
    case "hFlex": {
      const a = 90 + f.sign * deg;
      const [x, y] = pt(60, 68, a, 34);
      body = <>{topBody(36)}{dash(60, 68, 90, 36)}{arc(60, 68, 16, 90, a)}{ln(60, 68, x, y, 6, MOVE)}{dot(60, 68)}</>;
      break;
    }
    case "neckRot": {
      const a = 180 - f.sign * deg;
      const [nx, ny] = pt(50, 68, a, 11);
      const [mx, my] = pt(50, 68, a, 40);
      body = <>{topBody(50, false)}{dash(50, 68, 180, 40)}{arc(50, 68, 18, 180, a)}{ln(50, 68, mx, my, 2.5, MOVE)}<circle cx="50" cy="68" r="10" fill="#cfeee8" stroke={MOVE} />
        <circle cx={nx} cy={ny} r="3.5" fill={MOVE} />{dot(50, 68)}</>;
      break;
    }
    case "trunkRot": {
      const a = 90 - f.sign * deg;
      const [x, y] = pt(50, 68, a, 32);
      const [x2, y2] = pt(50, 68, a + 180, 32);
      body = <><ellipse cx="50" cy="68" rx="22" ry="8" fill={SKIN} />{dash(50, 68, 90, 38)}{dash(50, 68, 270, 38)}{arc(50, 68, 32, 90, a)}{ln(x2, y2, x, y, 8, MOVE)}<circle cx="50" cy="68" r="8" fill="#dbb88f" />{dot(50, 68)}</>;
      break;
    }
    case "footAb": {
      const a = 180 + f.sign * deg;
      const [x, y] = pt(60, 104, a, 36);
      body = <>{ln(60, 104, 60, 122, 8)}{ln(36, 104, 36, 70, 8)}{ln(36, 104, 36, 122, 8)}{dash(60, 104, 180, 40)}{arc(60, 104, 20, 180, a)}{ln(60, 104, x, y, 8, MOVE)}{dot(60, 104)}</>;
      break;
    }
    case "girdleUp": {
      const a = 90 + f.sign * deg;
      const [x, y] = pt(57, 32, a, 18);
      body = <>{ln(50, 26, 50, 68, 13)}<circle cx="50" cy="13" r="8" fill={SKIN} />{ln(45, 68, 45, 114, 7)}{ln(55, 68, 55, 114, 7)}{ln(43, 32, 38, 66, 5)}{dash(57, 32, 90, 30)}{arc(57, 32, 14, 90, a)}{ln(57, 32, x, y, 7, MOVE)}{dot(57, 32)}</>;
      break;
    }
    case "hipRot": {
      const a = f.sign * deg;
      const [x, y] = pt(55, 92, a, 22);
      body = <>{ln(50, 26, 50, 68, 13)}<circle cx="50" cy="13" r="8" fill={SKIN} />{ln(45, 68, 45, 114, 7)}{ln(55, 68, 55, 92, 8)}{ln(43, 32, 38, 66, 5)}{ln(57, 32, 62, 66, 5)}{dash(55, 92, 0, 30)}{arc(55, 92, 14, 0, a)}{ln(55, 92, x, y, 6, MOVE)}{dot(55, 92)}</>;
      break;
    }
    case "sole": {
      const a = 90 + f.sign * deg;
      const [x, y] = pt(62, 108, a, 16);
      const [x2, y2] = pt(62, 108, a + 180, 16);
      body = <>{ln(36, 66, 36, 112, 6, "#f3e4d2")}{ln(62, 66, 62, 108, 8)}{dash(62, 108, 90, 20)}{dash(62, 108, 270, 20)}{ln(x2, y2, x, y, 7, MOVE)}{dot(62, 108)}</>;
      break;
    }
    case "pron": {
      const a = 180 - f.sign * deg;
      const [x, y] = pt(50, 62, a, 17);
      const [x2, y2] = pt(50, 62, a + 180, 17);
      const [tx, ty] = pt(50, 62, a, 24);
      body = <><circle cx="50" cy="62" r="13" fill={SKIN} />{dash(50, 62, 180, 40)}{arc(50, 62, 30, 180, a)}{ln(x2, y2, x, y, 8, MOVE)}<circle cx={tx} cy={ty} r="4.5" fill={MOVE} />{dot(50, 62)}</>;
      break;
    }
    case "wristFlex":
    case "wristDev": {
      const a = 90 + f.sign * deg;
      const [x, y] = pt(46, 62, a, 34);
      const [t1x, t1y] = pt(46, 62, a, 10);
      const [n1x, n1y] = pt(0, 0, a + 90, 5);
      const [t2x, t2y] = pt(46, 62, a, 20);
      const [n2x, n2y] = pt(0, 0, a + 90, 11);
      body = <>{ln(6, 62, 46, 62, 11)}{dash(46, 62, 90, 46)}{arc(46, 62, 20, 90, a)}{ln(46, 62, x, y, 10, MOVE)}{[-18, 0, 18].map((d) => { const [fx, fy] = pt(x, y, a + d, 9); return <line key={d} x1={x} y1={y} x2={fx} y2={fy} stroke={MOVE} strokeWidth="3" strokeLinecap="round" />; })}
        {f.part === "wristDev" && ln(t1x + n1x, t1y + n1y, t2x + n2x, t2y + n2y, 4, MOVE)}{dot(46, 62)}</>;
      break;
    }
  }
  return (
    <svg viewBox="0 0 100 124" role="img" aria-label={`${name} 参考可動域 ${deg}度`} className="h-28 w-auto shrink-0">
      {DEFS}{body}
      <text x="50" y="123" fontSize="9" fontWeight="700" fill="#111827" textAnchor="middle">{deg}°</text>
    </svg>
  );
}

// MMT: 検査の姿勢の図（人の形。緑＝動かす部分、橙＝動く向き、赤＝検査者が加える抵抗）。
// 姿勢と動く向きは、教科書の検査の肢位を参考に、このアプリで描き直した模式図です
type Pose = "sit" | "sitF" | "prone" | "supine" | "side" | "stand";
type Move = { pivot: [number, number]; len: number; a0: number; a1: number; w?: number; tail?: [number, number]; noRes?: boolean };
type Spec = { pose: Pose; moves: Move[]; fixed?: [number, number, number, number][]; omit?: string[]; up?: [number, number, number, number] };
const MMT_SPEC: Record<string, Spec> = {
  "股-屈曲": { pose: "sit", omit: ["thigh", "shank"], moves: [{ pivot: [28, 49], len: 30, a0: 90, a1: 118, tail: [20, 0] }] },
  "股-屈曲・外転・外旋": { pose: "sit", omit: ["thigh", "shank"], moves: [{ pivot: [28, 49], len: 30, a0: 90, a1: 118, tail: [20, 0] }] },
  "股-伸展": { pose: "prone", omit: ["legs"], moves: [{ pivot: [62, 40], len: 40, a0: 90, a1: 108 }] },
  "股-外転": { pose: "side", omit: ["legs"], fixed: [[62, 40, 108, 40]], moves: [{ pivot: [62, 40], len: 44, a0: 90, a1: 128 }] },
  "股-内転": { pose: "side", omit: ["legs"], fixed: [[62, 40, 95, 17]], moves: [{ pivot: [62, 40], len: 44, a0: 90, a1: 108 }] },
  "股-外旋": { pose: "sitF", omit: ["legR"], moves: [{ pivot: [66, 52], len: 17, a0: 0, a1: -38 }] },
  "膝-伸展": { pose: "sit", omit: ["shank"], moves: [{ pivot: [58, 49], len: 21, a0: 0, a1: 75 }] },
  "膝-屈曲": { pose: "prone", omit: ["legs"], fixed: [[62, 40, 84, 40]], moves: [{ pivot: [84, 40], len: 20, a0: 90, a1: 150 }] },
  "足-底屈": { pose: "stand", omit: [], moves: [], up: [64, 70, 64, 55] },
  "足-背屈と内がえし": { pose: "supine", omit: ["legs"], fixed: [[62, 40, 98, 40]], moves: [{ pivot: [98, 40], len: 12, a0: 180, a1: 208 }] },
  "肩-屈曲": { pose: "sit", moves: [{ pivot: [28, 27], len: 26, a0: 0, a1: 90 }] },
  "肩-外転": { pose: "sitF", moves: [{ pivot: [67, 24], len: 26, a0: 0, a1: 90 }] },
  "肩-水平外転": { pose: "prone", omit: ["legs"], fixed: [[62, 40, 108, 40]], moves: [{ pivot: [30, 40], len: 26, a0: 180, a1: 150 }] },
  "肩-伸展": { pose: "prone", omit: ["legs"], fixed: [[62, 40, 108, 40]], moves: [{ pivot: [24, 40], len: 26, a0: 90, a1: 118 }] },
  "肩-内旋／外旋": { pose: "sitF", moves: [{ pivot: [67, 38], len: 16, a0: 0, a1: 55 }] },
  "肩-水平内転": { pose: "supine", omit: ["legs"], fixed: [[62, 40, 108, 40]], moves: [{ pivot: [30, 40], len: 26, a0: 180, a1: 120 }] },
  "肩甲骨-挙上": { pose: "sitF", moves: [{ pivot: [67, 22], len: 12, a0: 90, a1: 118 }] },
  "肩甲骨-外転・上方回旋": { pose: "sit", moves: [{ pivot: [28, 27], len: 26, a0: 90, a1: 150 }] },
  "肩甲骨-内転・下方回旋": { pose: "prone", omit: ["legs"], fixed: [[62, 40, 108, 40]], moves: [{ pivot: [30, 40], len: 18, a0: 180, a1: 160 }] },
  "肘-屈曲": { pose: "sit", fixed: [[28, 27, 28, 38]], moves: [{ pivot: [28, 38], len: 16, a0: 0, a1: 100 }] },
  "肘-伸展": { pose: "sit", fixed: [[28, 27, 28, 38]], moves: [{ pivot: [28, 38], len: 16, a0: 100, a1: 40 }] },
  "前腕-回外／回内": { pose: "sitF", fixed: [[67, 24, 67, 38]], moves: [{ pivot: [67, 38], len: 14, a0: 0, a1: 40 }] },
  "体幹-屈曲": { pose: "supine", omit: ["legs"], fixed: [[62, 40, 108, 40]], moves: [{ pivot: [62, 40], len: 30, a0: 270, a1: 235 }] },
  "体幹-伸展": { pose: "prone", omit: ["legs"], fixed: [[62, 40, 108, 40]], moves: [{ pivot: [62, 40], len: 30, a0: 270, a1: 300 }] },
  "頸部-伸展": { pose: "prone", omit: ["legs"], fixed: [[62, 40, 108, 40]], moves: [{ pivot: [22, 40], len: 10, a0: 270, a1: 295 }] },
  "頸部-屈曲": { pose: "supine", omit: ["legs"], fixed: [[62, 40, 108, 40]], moves: [{ pivot: [22, 40], len: 10, a0: 270, a1: 245 }] },
  "骨盤-挙上": { pose: "supine", omit: ["legs"], moves: [{ pivot: [62, 40], len: 44, a0: 90, a1: 78 }] },
  "手指-内転／外転": { pose: "sitF", fixed: [[67, 24, 67, 40]], moves: [{ pivot: [67, 40], len: 12, a0: 0, a1: 35 }] },
};
function poseOf(t: string, key: string): Pose {
  const sp = MMT_SPEC[key];
  if (sp) return sp.pose;
  return /腹臥位/.test(t) ? "prone" : /側臥位/.test(t) ? "side" : /背臥位/.test(t) ? "supine" : /立位/.test(t) ? "stand" : "sit";
}
const POSE_LABEL: Record<Pose, string> = { sit: "座位（横から）", sitF: "座位（正面から）", supine: "背臥位", prone: "腹臥位", side: "側臥位", stand: "立位" };

function MmtFigure({ row }: { row: [string, string, string, string, string] }) {
  const key = `${row[0]}-${row[1]}`;
  const spec = MMT_SPEC[key];
  const pose = poseOf(row[3], key);
  const omit = spec?.omit ?? [];
  const ln = (x1: number, y1: number, x2: number, y2: number, w: number, c = SKIN) => <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeWidth={w} strokeLinecap="round" />;
  const lying = pose === "supine" || pose === "prone" || pose === "side";
  const moves = (spec?.moves ?? []).map((m, i) => {
    const [px, py] = m.pivot;
    const e = dir(m.a1, m.len);
    const g = dir(m.a0, m.len);
    const sgn = m.a1 >= m.a0 ? 1 : -1;
    const [tx, ty] = dir(m.a1 + 90 * sgn, 13);
    const ex = px + e[0], ey = py + e[1];
    const [ax0, ay0] = dir(m.a0, 11);
    const [ax1, ay1] = dir(m.a1, 11);
    const tl = m.tail ? dir(m.tail[1], m.tail[0]) : null;
    return (
      <g key={i}>
        {ln(px, py, px + g[0], py + g[1], m.w ?? 7, "#e3cdb6")}
        {ln(px, py, ex, ey, m.w ?? 7, MOVE)}
        {tl && ln(ex, ey, ex + tl[0], ey + tl[1], 6, MOVE)}
        <path d={`M ${px + ax0} ${py + ay0} A 11 11 0 0 ${sgn > 0 ? 0 : 1} ${px + ax1} ${py + ay1}`} fill="none" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#romarr)" />
        <line x1={Math.min(Math.max(ex + tx, 4), 116)} y1={Math.min(Math.max(ey + ty, 4), 60)} x2={ex + tx * 0.15} y2={ey + ty * 0.15} stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#romred)" />
        <text x={Math.min(Math.max(ex + tx + 2, 2), 100)} y={Math.min(Math.max(ey + ty - 2, 8), 62)} fontSize="7" fill="#ef4444" fontWeight="700">抵抗</text>
      </g>
    );
  });
  return (
    <svg viewBox="0 0 120 72" role="img" aria-label={`${row[0]}の${row[1]} 検査の姿勢（${POSE_LABEL[pose]}）`} className="h-24 w-36 shrink-0">
      {DEFS}
      <defs>
        <marker id="romred" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#ef4444" /></marker>
      </defs>
      {lying && (
        <>
          <rect x="6" y="46" width="108" height="4" rx="2" fill="#d1d5db" />
          <circle cx="13" cy="37" r="7" fill={SKIN} />
          {ln(22, 40, 62, 40, 10)}
          {!omit.includes("legs") && ln(62, 40, 108, 40, 8)}
        </>
      )}
      {pose === "sit" && (
        <>
          <rect x="14" y="52" width="48" height="4" rx="2" fill="#d1d5db" />
          <circle cx="28" cy="11" r="7" fill={SKIN} />
          <path d="M34 9 L39 12 L34 14 z" fill={SKIN} />
          {ln(28, 19, 28, 49, 10)}
          {!omit.includes("thigh") && ln(28, 49, 58, 49, 8)}
          {!omit.includes("shank") && ln(58, 49, 58, 69, 6)}
        </>
      )}
      {pose === "sitF" && (
        <>
          <rect x="40" y="52" width="40" height="4" rx="2" fill="#d1d5db" />
          <circle cx="60" cy="11" r="7" fill={SKIN} />
          {ln(60, 19, 60, 49, 13)}
          {ln(54, 50, 54, 69, 6)}
          {!omit.includes("legR") && ln(66, 50, 66, 69, 6)}
          {ln(53, 24, 53, 46, 5)}
        </>
      )}
      {pose === "stand" && (
        <>
          <circle cx="60" cy="9" r="7" fill={SKIN} />
          {ln(60, 17, 60, 45, 10)}
          {ln(56, 45, 56, 70, 6)}
          {ln(64, 45, 64, 70, 6)}
        </>
      )}
      {(spec?.fixed ?? []).map((f, i) => <g key={i}>{ln(f[0], f[1], f[2], f[3], 7)}</g>)}
      {moves}
      {spec?.up && <line x1={spec.up[0]} y1={spec.up[1]} x2={spec.up[2]} y2={spec.up[3]} stroke={MOVE} strokeWidth="3" markerEnd="url(#romarr)" />}
      <text x="60" y="71" fontSize="7" fontWeight="700" fill="#6b7280" textAnchor="middle">{POSE_LABEL[pose]}</text>
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

const SPECIAL = new Set(["girdleFwd", "shRot", "hFlex", "neckRot", "trunkRot", "footAb", "girdleUp", "hipRot", "sole", "pron", "wristFlex", "wristDev"]);
const WORDS = /関節可動域|可動域|ROM|角度計|MMT|徒手筋力|筋力テスト|筋力検査/;
const MMT_PARTS = ["股", "膝", "足", "肩", "肩甲骨", "肘", "前腕", "体幹", "頸部", "骨盤", "手指"];
const MMT_OF: Record<string, string> = { girdle: "肩甲骨", shoulder: "肩", elbow: "肘", wrist: "手指", hip: "股", knee: "膝", ankle: "足", neck: "頸部", trunk: "体幹" };

function MotionCard({ m }: { m: Motion }) {
  return (
    <li className="flex items-center gap-2 rounded-xl bg-gray-50 p-2">
      {m.fig ? (SPECIAL.has(m.fig.part) ? <Special f={m.fig} deg={m.deg} name={m.name} /> : <Body f={m.fig} deg={m.deg} name={m.name} />) : <AngleOnly deg={m.deg} name={m.name} />}
      <div className="min-w-0 text-[11px] leading-4 text-gray-700">
        <p className="text-xs font-semibold text-gray-900">{m.name}　<span className="text-emerald-700">{m.deg}°</span></p>
        <p><span className="font-semibold text-gray-500">基本軸</span>　{m.base}</p>
        <p><span className="font-semibold text-gray-500">移動軸</span>　{m.move}</p>
        {m.pos && <p><span className="font-semibold text-gray-500">肢位</span>　{m.pos}</p>}
      </div>
    </li>
  );
}

export default function RomMmtGuide({ text, always = false }: { text: string; always?: boolean }) {
  const hit = JOINTS.find((j) => j.words.test(text));
  const [sel, setSel] = useState<string | null>(null);
  const [mmtSel, setMmtSel] = useState<string | null>(null);
  if (!always && !WORDS.test(text)) return null;
  const cur = JOINTS.find((j) => j.key === (sel ?? hit?.key ?? "shoulder")) ?? JOINTS[1];
  const part = mmtSel ?? MMT_OF[cur.key] ?? "肩";
  const chip = (on: boolean) => `whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-semibold ${on ? "bg-black text-white" : "border border-gray-200 text-gray-700"}`;

  return (
    <details open={always || undefined} className="mt-3 rounded-xl border border-gray-200 bg-white">
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
          <p className="text-xs font-semibold text-gray-700">MMT：主な検査の肢位（部位を選ぶ）</p>
          <div role="group" aria-label="MMTの部位を選ぶ" className="mt-2 flex flex-wrap gap-1.5">
            {MMT_PARTS.map((p) => (
              <button key={p} type="button" aria-pressed={part === p} onClick={() => setMmtSel(p)} className={chip(part === p)}>{p}</button>
            ))}
          </div>
          <ul className="mt-2 space-y-1.5">
            {MMT_ROWS.filter((r) => r[0] === part).map((r) => (
              <li key={r[0] + r[1]} className="flex items-center gap-2 rounded-xl bg-gray-50 p-2 text-[11px] leading-4 text-gray-700">
                <MmtFigure row={r} />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-gray-900">{r[1]}　<span className="font-normal text-gray-500">{r[2]}</span></p>
                  <p><span className="font-semibold text-gray-500">段階3・4・5</span>　{r[3]}</p>
                  <p><span className="font-semibold text-gray-500">段階2</span>　{r[4]}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs font-semibold text-gray-700">MMT：筋力の段階（0〜5）</p>
          <div className="mt-2"><GravityFigure /></div>
          <ol className="mt-2 space-y-1">
            {GRADES.map((g) => (
              <li key={g.g} className="flex items-center gap-2 rounded-lg bg-gray-50 px-2 py-1.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white">{g.g}</span>
                <span className="min-w-0 text-[11px] leading-4 text-gray-700"><span className="font-semibold">{g.name}</span>　{g.body}</span>
              </li>
            ))}
          </ol>

          <p className="mt-2 text-[10px] leading-4 text-gray-400">一般的な基準（Daniels &amp; Worthingham、Kendallなど）と、MMTを載せた教科書の要約です（確認日 2026-10-21）。学校・教科書により、書き方に差があります。+ / − の細かい段階は、省いています。</p>
        </section>
      </div>
    </details>
  );
}
