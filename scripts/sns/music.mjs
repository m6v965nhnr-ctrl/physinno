// SNS動画用の、オリジナルのBGM（著作権の問題がない）を、プログラムで作る。
// 使い方: node music.mjs <秒数> <出力.wav> [種類 0-3]
// やさしいエレピ風のコード＋ベース＋軽いリズム＋ゆるいメロディ。最後は、自然に消える。
import { writeFileSync } from "node:fs";

const [, , durArg, out, kindArg] = process.argv;
const SR = 44100;
const dur = parseFloat(durArg);
const kind = parseInt(kindArg ?? "0", 10) % 4;
const n = Math.floor(dur * SR);
const L = new Float32Array(n), R = new Float32Array(n);

let seed = kind * 7919 + 13;
const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);

const PROGS = [
  [[48, 55, 59, 64], [45, 52, 60, 64], [41, 48, 57, 64], [43, 50, 59, 62]],
  [[41, 48, 57, 60], [43, 50, 59, 62], [40, 47, 55, 59], [45, 52, 57, 60]],
  [[50, 57, 62, 65], [43, 50, 59, 62], [48, 55, 60, 64], [45, 52, 57, 60]],
  [[45, 52, 57, 60], [41, 48, 55, 60], [48, 55, 60, 64], [43, 50, 55, 62]],
];
const BPM = [88, 96, 84, 92][kind];
const prog = PROGS[kind];
const beat = 60 / BPM;
const bar = 4 * beat;

function add(fn, len, start, pan = 0, gain = 1) {
  const i0 = Math.floor(start * SR);
  const N = Math.floor(len * SR);
  for (let k = 0; k < N; k++) {
    const i = i0 + k;
    if (i >= n) break;
    const v = fn(k / SR) * gain;
    L[i] += v * (0.5 - pan * 0.5);
    R[i] += v * (0.5 + pan * 0.5);
  }
}
const epiano = (m, vel) => {
  const f = hz(m);
  return (t) => {
    const env = Math.exp(-t * 2.2) * (1 - Math.exp(-t * 90));
    return (Math.sin(2 * Math.PI * f * t) + 0.35 * Math.sin(4 * Math.PI * f * t) * Math.exp(-t * 4) + 0.12 * Math.sin(6 * Math.PI * f * t) * Math.exp(-t * 7)) * env * vel;
  };
};
const bass = (m, vel) => {
  const f = hz(m - 12);
  return (t) => (Math.sin(2 * Math.PI * f * t) + 0.2 * Math.sin(4 * Math.PI * f * t)) * Math.exp(-t * 3) * (1 - Math.exp(-t * 60)) * vel;
};
const kick = (vel) => (t) => Math.sin(2 * Math.PI * (40 * t + (120 / 18) * (1 - Math.exp(-t * 18)))) * Math.exp(-t * 14) * vel;
const hat = (vel) => (t) => (rnd() * 2 - 1) * Math.exp(-t * 90) * vel;

const SCALE = [60, 62, 64, 67, 69, 72, 74, 76];
const bars = Math.floor(dur / bar) + 2;
for (let b = 0; b < bars; b++) {
  const ch = prog[b % 4], t0 = b * bar;
  ch.forEach((m, k) => add(epiano(m + 12, 0.33), bar * 0.95, t0 + k * beat * 0.5, -0.3 + 0.2 * k));
  ch.slice(1).forEach((m, k) => add(epiano(m + 12, 0.24), beat * 1.8, t0 + 2 * beat + k * beat * 0.5, 0.2 - 0.2 * k));
  add(bass(ch[0], 0.7), bar * 0.5, t0);
  add(bass(ch[0], 0.55), beat * 1.5, t0 + 2.5 * beat);
  for (let q = 0; q < 4; q++) {
    if (q === 0 || q === 2) add(kick(0.5), 0.22, t0 + q * beat);
    add(hat(0.1), 0.05, t0 + q * beat + beat * 0.5, 0.3);
  }
  if (b >= 1) for (const p of [0, 1, 1.5, 2.5, 3]) if (rnd() < 0.75) add(epiano(SCALE[Math.floor(rnd() * SCALE.length)] + 12, 0.2), beat * 1.2, t0 + p * beat, 0.1);
}
// 軽い反射（リバーブ風）
for (const [d, g] of [[0.11, 0.25], [0.23, 0.15], [0.37, 0.08]]) {
  const k = Math.floor(d * SR);
  for (let i = n - 1; i >= k; i--) { L[i] += L[i - k] * g; R[i] += R[i - k] * g; }
}
// フェード
const fi = Math.floor(0.4 * SR), fo = Math.floor(Math.min(1.5, dur * 0.2) * SR);
for (let i = 0; i < fi && i < n; i++) { L[i] *= i / fi; R[i] *= i / fi; }
for (let i = 0; i < fo; i++) { const j = n - 1 - i; if (j >= 0) { L[j] *= i / fo; R[j] *= i / fo; } }
let peak = 0;
for (let i = 0; i < n; i++) peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
const g = (peak ? 0.55 / peak : 1) * 32767;
const data = Buffer.alloc(n * 4);
for (let i = 0; i < n; i++) { data.writeInt16LE(Math.round(L[i] * g), i * 4); data.writeInt16LE(Math.round(R[i] * g), i * 4 + 2); }
const h = Buffer.alloc(44);
h.write("RIFF", 0); h.writeUInt32LE(36 + data.length, 4); h.write("WAVEfmt ", 8); h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(2, 22);
h.writeUInt32LE(SR, 24); h.writeUInt32LE(SR * 4, 28); h.writeUInt16LE(4, 32); h.writeUInt16LE(16, 34); h.write("data", 36); h.writeUInt32LE(data.length, 40);
writeFileSync(out, Buffer.concat([h, data]));
console.log(`ok ${out} ${dur.toFixed(1)}s kind=${kind}`);
