// 4コマ漫画の作画エンジン（SVG）。1コマ=縦長の1枚絵（1000x1500）にして、動画では1コマずつ全画面で見せる。
// 設計の考え方（調べた内容）:
//  - 起承転結。1〜2コマ目にオチの前振りを入れ、3コマ目でずらし、4コマ目は表情を大きく、情報を増やさない。
//  - コマごとにカメラを変える（引き／2ショット／アップ）。単調にしない。
//  - 吹き出しは、読み順（上→下、右→左ではなく、縦動画なので上→下・左→右）に沿って置き、1コマ2つまで。台詞は短く。
//  - 絵＋効果線（集中線・汗・キラキラ・縦線）＋効果音で、感情を絵で見せる。

const INK = "#1b1b2f";
const SKIN = "#ffe3c9";
const SKIN_SH = "#f5c9a6";
const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// ---- キャラクター定義 ----
const WHO = {
  pt: { hair: "#22222e", hairHi: "#4a4a63", shirt: "#27b5a2", shirtSh: "#1e8f80", style: "short", brows: "#22222e" },
  ptf: { hair: "#3a2a2a", hairHi: "#6b4a4a", shirt: "#27b5a2", shirtSh: "#1e8f80", style: "pony", brows: "#3a2a2a" },
  senior: { hair: "#3b2c25", hairHi: "#6a5247", shirt: "#2b78a3", shirtSh: "#205b7d", style: "short", glasses: true, brows: "#3b2c25" },
  student: { hair: "#5a3b28", hairHi: "#8a6046", shirt: "#f5f7fb", shirtSh: "#d4dbe8", style: "messy", tie: "#26407a", brows: "#5a3b28" },
  friend: { hair: "#2f3e5c", hairHi: "#56688f", shirt: "#f2c14e", shirtSh: "#cf9f2f", style: "messy", brows: "#2f3e5c" },
  grandma: { hair: "#dfe3ea", hairHi: "#ffffff", shirt: "#f3a6b9", shirtSh: "#d98197", style: "bun", glasses: false, brows: "#aab0bb", wrinkle: true },
  grandpa: { hair: "#e8ebf0", hairHi: "#ffffff", shirt: "#86b3dc", shirtSh: "#6590b8", style: "bald", glasses: true, brows: "#c9ced8", wrinkle: true },
};

function brows(w, expr) {
  const c = w.brows;
  const L = {
    normal: ["M118 128 Q142 116 168 126", "M232 126 Q258 116 282 128"],
    happy: ["M118 124 Q142 110 168 120", "M232 120 Q258 110 282 124"],
    worry: ["M118 134 Q140 122 168 118", "M232 118 Q260 122 282 134"],
    shock: ["M116 112 Q142 98 168 110", "M232 110 Q258 98 284 112"],
    angry: ["M116 120 L170 138", "M230 138 L284 120"],
    tired: ["M118 130 Q142 124 168 130", "M232 130 Q258 124 282 130"],
  }[expr === "sweat" ? "worry" : expr === "grin" ? "happy" : ["normal", "happy", "worry", "shock", "angry", "tired"].includes(expr) ? expr : "normal"];
  return L.map((d) => `<path d="${d}" fill="none" stroke="${c}" stroke-width="9" stroke-linecap="round"/>`).join("");
}

function eyes(expr) {
  const eye = (cx, flip) => {
    const g = (inner) => `<g transform="translate(${cx} 178)">${inner}</g>`;
    const open = (rx, ry, ir) =>
      g(`<ellipse cx="0" cy="0" rx="${rx}" ry="${ry}" fill="#fff" stroke="${INK}" stroke-width="5"/>
         <ellipse cx="${flip * 2}" cy="3" rx="${ir}" ry="${ir * 1.25}" fill="#2a2440"/><circle cx="${flip * 2}" cy="3" r="${ir * 0.5}" fill="#0c0a18"/>
         <circle cx="${flip * 2 - 6}" cy="-6" r="${ir * 0.36}" fill="#fff"/><circle cx="${flip * 2 + 6}" cy="8" r="${ir * 0.18}" fill="#fff"/>
         <path d="M${-rx - 2} -4 Q0 ${-ry - 10} ${rx + 2} -4" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>`);
    if (expr === "happy" || expr === "grin") return g(`<path d="M-24 6 Q0 -22 24 6" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round"/>`);
    if (expr === "tired") return g(`<path d="M-24 0 Q0 12 24 0" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><path d="M-20 14 Q0 20 20 14" fill="none" stroke="#c98f7c" stroke-width="4" stroke-linecap="round"/>`);
    if (expr === "shock") return open(24, 30, 9);
    if (expr === "dots") return g(`<circle cx="0" cy="4" r="8" fill="${INK}"/>`);
    if (expr === "worry" || expr === "sweat") return open(22, 26, 14);
    return open(22, 26, 15);
  };
  return eye(150, 1) + eye(250, -1);
}

function mouth(expr) {
  const m = {
    smile: `<path d="M172 246 Q200 272 228 246" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`,
    happy: `<path d="M166 240 Q200 292 234 240 Z" fill="#c4505a" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><path d="M180 262 Q200 252 220 262 Q200 282 180 262Z" fill="#ff8a96"/>`,
    grin: `<path d="M160 238 Q200 300 240 238 Z" fill="#fff" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><path d="M164 242 L236 242" stroke="${INK}" stroke-width="3"/>`,
    flat: `<path d="M180 252 L220 252" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`,
    shock: `<ellipse cx="200" cy="254" rx="14" ry="20" fill="#c4505a" stroke="${INK}" stroke-width="6"/>`,
    worry: `<path d="M172 260 Q200 238 228 260" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`,
    o: `<ellipse cx="200" cy="252" rx="9" ry="11" fill="#c4505a" stroke="${INK}" stroke-width="5"/>`,
  };
  return m[expr] ?? m.smile;
}

function hair(w) {
  const h = w.hair, hi = w.hairHi;
  const base = {
    short: `<path d="M84 214 Q70 70 200 60 Q330 70 316 214 L302 152 L278 164 L254 130 L230 160 L206 122 L180 160 L154 126 L128 164 L106 146Z" fill="${h}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
            <path d="M150 90 Q180 78 214 86" fill="none" stroke="${hi}" stroke-width="7" stroke-linecap="round"/><path d="M236 98 Q262 104 276 126" fill="none" stroke="${hi}" stroke-width="6" stroke-linecap="round"/>`,
    messy: `<path d="M80 214 Q56 80 150 56 Q200 36 262 60 Q348 90 320 214 L304 156 L284 170 L262 124 L238 158 L216 110 L190 156 L164 116 L140 164 L112 130Z" fill="${h}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
            <path d="M140 84 Q170 70 204 76" fill="none" stroke="${hi}" stroke-width="7" stroke-linecap="round"/>`,
    pony: `<path d="M330 120 Q392 150 372 260 Q356 330 326 300 Q344 220 316 160Z" fill="${h}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
           <path d="M84 214 Q70 70 200 58 Q330 70 316 214 L300 156 L274 168 L250 132 L224 160 L200 124 L174 160 L148 132 L122 168 L106 150Z" fill="${h}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
           <circle cx="326" cy="140" r="10" fill="#f26c8a" stroke="${INK}" stroke-width="4"/><path d="M150 88 Q180 76 214 84" fill="none" stroke="${hi}" stroke-width="7" stroke-linecap="round"/>`,
    bun: `<circle cx="200" cy="40" r="42" fill="${h}" stroke="${INK}" stroke-width="6"/><path d="M168 38 Q200 20 232 38" fill="none" stroke="#c4c9d4" stroke-width="5" stroke-linecap="round"/>
          <path d="M82 220 Q64 76 200 62 Q336 76 318 220 Q306 150 262 128 Q212 164 150 128 Q100 150 82 220Z" fill="${h}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
          <path d="M130 104 Q170 92 206 102" fill="none" stroke="#c4c9d4" stroke-width="6" stroke-linecap="round"/>`,
    bald: `<path d="M82 214 Q70 150 98 120 Q92 168 100 210Z" fill="${h}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><path d="M318 214 Q330 150 302 120 Q308 168 300 210Z" fill="${h}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
           <path d="M150 74 Q200 52 250 74" fill="none" stroke="#ffffff" stroke-width="10" stroke-linecap="round" opacity=".8"/>`,
  };
  return base[w.style];
}

function pose(w, name) {
  const slv = (d, wd = 54) => `<path d="${d}" fill="none" stroke="${INK}" stroke-width="${wd + 10}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${w.shirt}" stroke-width="${wd}" stroke-linecap="round" stroke-linejoin="round"/>`;
  const arm = (d, wd = 38) => `<path d="${d}" fill="none" stroke="${INK}" stroke-width="${wd + 10}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${SKIN}" stroke-width="${wd}" stroke-linecap="round" stroke-linejoin="round"/>`;
  const hand = (x, y, r = 30) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${SKIN}" stroke="${INK}" stroke-width="6"/>`;
  switch (name) {
    case "raise":
      return slv("M312 400 L340 330", 56) + arm("M340 330 L352 214", 38) + hand(354, 186, 34) +
        slv("M88 400 L72 500", 56) + arm("M72 500 L66 548", 38) + hand(64, 560, 30);
    case "clip":
      return slv("M92 404 L110 480", 56) + arm("M110 480 L170 510", 38) +
        `<rect x="150" y="440" width="120" height="140" rx="10" fill="#fff" stroke="${INK}" stroke-width="6"/><rect x="190" y="430" width="40" height="22" rx="6" fill="#8c8c9a" stroke="${INK}" stroke-width="5"/><path d="M168 480 H252 M168 506 H252 M168 532 H232" stroke="#9aa3b5" stroke-width="6" stroke-linecap="round"/>` +
        slv("M308 404 L290 480", 56) + arm("M290 480 L240 520", 38) + hand(170, 512, 26) + hand(236, 522, 26);
    case "chin":
      return slv("M88 400 L72 500", 56) + arm("M72 500 L66 548", 38) + hand(64, 560, 30) +
        slv("M312 404 L322 470", 56) + arm("M322 470 L270 400 L236 292", 38) + hand(228, 280, 28);
    case "thumb":
      return slv("M88 400 L72 500", 56) + arm("M72 500 L66 548", 38) + hand(64, 560, 30) +
        slv("M312 404 L346 470", 56) + arm("M346 470 L338 392", 38) + hand(338, 366, 32) + `<ellipse cx="338" cy="326" rx="14" ry="26" fill="${SKIN}" stroke="${INK}" stroke-width="6"/>`;
    case "write":
      return slv("M92 404 L120 480", 56) + arm("M120 480 L180 520", 38) +
        `<rect x="140" y="470" width="150" height="110" rx="8" fill="#fff6d8" stroke="${INK}" stroke-width="6"/><path d="M160 500 H270 M160 526 H270 M160 552 H240" stroke="#c9b27a" stroke-width="5"/>` +
        slv("M308 404 L292 480", 56) + arm("M292 480 L232 524", 38) + hand(182, 520, 26) + hand(236, 524, 26) +
        `<path d="M236 524 L262 490" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`;
    case "cane":
      return slv("M88 400 L72 500", 56) + arm("M72 500 L66 548", 38) + hand(64, 560, 30) +
        `<path d="M350 380 V620" stroke="${INK}" stroke-width="18" stroke-linecap="round"/><path d="M350 380 V620" stroke="#a9744a" stroke-width="10" stroke-linecap="round"/><path d="M350 380 Q350 346 380 346" fill="none" stroke="${INK}" stroke-width="18" stroke-linecap="round"/><path d="M350 380 Q350 346 380 346" fill="none" stroke="#a9744a" stroke-width="10" stroke-linecap="round"/>` +
        slv("M312 404 L336 470", 56) + arm("M336 470 L350 396", 38) + hand(350, 384, 28);
    default:
      return slv("M88 400 L72 500", 56) + arm("M72 500 L66 548", 38) + hand(64, 560, 30) +
        slv("M312 400 L328 500", 56) + arm("M328 500 L334 548", 38) + hand(336, 560, 30);
  }
}

// ローカル座標（0..400 x 0..620）。頭の中心は (200,170)
export function character(who, expr = "smile", poseName = "down", opts = {}) {
  const w = WHO[who] ?? WHO.pt;
  const wrinkle = w.wrinkle ? `<path d="M120 200 q10 6 20 0 M260 200 q10 6 20 0 M170 98 h60" fill="none" stroke="#e0b898" stroke-width="3" opacity=".7"/>` : "";
  const glasses = w.glasses
    ? `<g fill="rgba(200,230,255,.25)" stroke="${INK}" stroke-width="6"><circle cx="150" cy="178" r="40"/><circle cx="250" cy="178" r="40"/></g><path d="M190 176 H210" stroke="${INK}" stroke-width="6"/><path d="M110 170 L88 160 M290 170 L312 160" stroke="${INK}" stroke-width="5"/>`
    : "";
  const blush = ["happy", "smile", "grin", "worry", "sweat", "shock"].includes(expr) ? `<ellipse cx="120" cy="226" rx="24" ry="13" fill="#ff8f9f" opacity=".5"/><ellipse cx="280" cy="226" rx="24" ry="13" fill="#ff8f9f" opacity=".5"/>` : "";
  const sweat = expr === "sweat" || expr === "worry" ? `<path d="M330 90 Q352 130 330 150 Q308 130 330 90Z" fill="#9ad8ff" stroke="${INK}" stroke-width="5"/><path d="M326 120 Q328 132 334 138" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/>` : "";
  const gloom = expr === "tired" ? `<g stroke="#5a5a8a" stroke-width="6" stroke-linecap="round" opacity=".75"><path d="M130 60 V120 M160 56 V122 M190 54 V120 M220 54 V120 M250 58 V122 M280 62 V118"/></g>` : "";
  const tie = w.tie
    ? `<path d="M200 346 L186 372 L200 470 L214 372Z" fill="${w.tie}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><path d="M166 340 L200 372 L234 340" fill="#fff" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>`
    : `<path d="M160 340 L200 392 L240 340" fill="${w.shirtSh}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><path d="M154 338 L180 368 L200 346 L220 368 L246 338 L226 332 L200 354 L174 332Z" fill="#fff" stroke="${INK}" stroke-width="4" stroke-linejoin="round" opacity="${who === "pt" || who === "ptf" ? 1 : 0}"/>`;
  const badge = who === "pt" || who === "ptf" || who === "senior" ? `<rect x="250" y="410" width="54" height="34" rx="6" fill="#fff" stroke="${INK}" stroke-width="4"/><path d="M258 422 H296 M258 434 H284" stroke="#8a93a8" stroke-width="4"/>` : "";
  const frontHair = w.style === "bald" ? "" : "";
  return `<g class="char">
    ${poseName === "cane" ? "" : ""}
    <path d="M60 900 L60 440 Q62 366 140 340 L260 340 Q338 366 340 440 L340 900Z" fill="${w.shirt}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
    <path d="M60 560 Q130 600 200 560 Q270 600 340 560 L340 900 L60 900Z" fill="${w.shirtSh}" opacity=".3"/>
    ${tie}${badge}
    <rect x="172" y="278" width="56" height="74" rx="18" fill="${SKIN}" stroke="${INK}" stroke-width="6"/><path d="M172 316 Q200 346 228 316 L228 338 Q200 366 172 338Z" fill="${SKIN_SH}"/>
    ${pose(w, poseName)}
    <ellipse cx="86" cy="190" rx="20" ry="30" fill="${SKIN}" stroke="${INK}" stroke-width="6"/><ellipse cx="314" cy="190" rx="20" ry="30" fill="${SKIN}" stroke="${INK}" stroke-width="6"/>
    <path d="M92 150 Q84 270 200 296 Q316 270 308 150 Q300 52 200 52 Q100 52 92 150Z" fill="${SKIN}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
    <path d="M100 216 Q120 284 200 292 Q150 270 128 200Z" fill="${SKIN_SH}" opacity=".7"/>
    ${hair(w)}${wrinkle}
    ${brows(w, expr)}${eyes(expr)}${glasses}
    <path d="M200 206 q-6 16 6 20" fill="none" stroke="#c98f7c" stroke-width="5" stroke-linecap="round"/>
    ${blush}${mouth(expr)}${sweat}${gloom}
  </g>`;
}

// ---- 背景 ----
function background(name) {
  const win = (x, y) => `<g><rect x="${x}" y="${y}" width="260" height="300" rx="10" fill="#bfe4ff" stroke="${INK}" stroke-width="6"/><path d="M${x} ${y + 150} H${x + 260} M${x + 130} ${y} V${y + 300}" stroke="${INK}" stroke-width="5"/><path d="M${x + 30} ${y + 240} L${x + 100} ${y + 170} M${x + 150} ${y + 270} L${x + 230} ${y + 190}" stroke="#fff" stroke-width="8" opacity=".6" stroke-linecap="round"/></g>`;
  const clock = (x, y) => `<g><circle cx="${x}" cy="${y}" r="62" fill="#fff" stroke="${INK}" stroke-width="6"/><path d="M${x} ${y} V${y - 38} M${x} ${y} L${x + 26} ${y + 14}" stroke="${INK}" stroke-width="7" stroke-linecap="round"/></g>`;
  if (name === "rehab")
    return `<rect width="1000" height="1500" fill="#e6f4f1"/><rect y="560" width="1000" height="940" fill="#dce9e6"/><rect y="1010" width="1000" height="490" fill="#c3d4d0"/><path d="M0 1010 H1000" stroke="${INK}" stroke-width="6"/>
      ${win(660, 120)}${clock(300, 190)}
      <g><path d="M60 1010 V690 M300 1010 V690" stroke="${INK}" stroke-width="30" stroke-linecap="round"/><path d="M60 1010 V690 M300 1010 V690" stroke="#b0b8c8" stroke-width="18" stroke-linecap="round"/><path d="M60 700 H300 M60 780 H300" stroke="${INK}" stroke-width="28" stroke-linecap="round"/><path d="M60 700 H300 M60 780 H300" stroke="#c9d0dd" stroke-width="16" stroke-linecap="round"/></g>
      <g><rect x="560" y="900" width="420" height="110" rx="22" fill="#6aa7d4" stroke="${INK}" stroke-width="6"/><rect x="580" y="1010" width="30" height="130" fill="#8c95a8" stroke="${INK}" stroke-width="5"/><rect x="930" y="1010" width="30" height="130" fill="#8c95a8" stroke="${INK}" stroke-width="5"/></g>
      <rect x="420" y="330" width="170" height="220" rx="8" fill="#fff" stroke="${INK}" stroke-width="5"/><path d="M440 380 H570 M440 420 H570 M440 460 H540" stroke="#9fb3c8" stroke-width="8"/>`;
  if (name === "room")
    return `<rect width="1000" height="1500" fill="#f7efe3"/><rect y="980" width="1000" height="520" fill="#e2d2bb"/><path d="M0 980 H1000" stroke="${INK}" stroke-width="6"/>${win(70, 110)}
      <g><rect x="520" y="780" width="460" height="260" rx="26" fill="#ffffff" stroke="${INK}" stroke-width="6"/><rect x="520" y="780" width="150" height="260" rx="26" fill="#bcd7ee" stroke="${INK}" stroke-width="6"/><rect x="510" y="1040" width="30" height="120" fill="#8c95a8"/><rect x="950" y="1040" width="30" height="120" fill="#8c95a8"/></g>
      <path d="M560 120 Q680 70 800 120 V330 H560Z" fill="#cfe9d6" stroke="${INK}" stroke-width="6"/>`;
  if (name === "desk")
    return `<rect width="1000" height="1500" fill="#eef1f8"/><rect y="1000" width="1000" height="500" fill="#c8b79a"/><path d="M0 1000 H1000" stroke="${INK}" stroke-width="6"/>${win(680, 110)}
      <g><rect x="60" y="260" width="320" height="520" rx="10" fill="#d9c7a6" stroke="${INK}" stroke-width="6"/><path d="M60 430 H380 M60 600 H380" stroke="${INK}" stroke-width="5"/><rect x="90" y="300" width="40" height="120" fill="#e66" stroke="${INK}" stroke-width="4"/><rect x="140" y="310" width="36" height="110" fill="#6a9" stroke="${INK}" stroke-width="4"/><rect x="186" y="296" width="44" height="124" fill="#69c" stroke="${INK}" stroke-width="4"/><rect x="90" y="470" width="50" height="124" fill="#ec6" stroke="${INK}" stroke-width="4"/><rect x="150" y="480" width="40" height="114" fill="#c8a" stroke="${INK}" stroke-width="4"/></g>`;
  if (name === "street")
    return `<rect width="1000" height="1500" fill="#bfe4ff"/><rect y="560" width="1000" height="940" fill="#cfd8e3"/><path d="M0 560 H1000" stroke="${INK}" stroke-width="6"/>
      <g stroke="${INK}" stroke-width="6"><rect x="30" y="200" width="200" height="360" fill="#f4d8c0"/><rect x="250" y="120" width="260" height="440" fill="#d4e2f0"/><rect x="530" y="240" width="200" height="320" fill="#f1e0a8"/><rect x="750" y="160" width="230" height="400" fill="#d9e8d4"/></g>
      <g fill="#fff" stroke="${INK}" stroke-width="4"><rect x="60" y="240" width="50" height="60"/><rect x="140" y="240" width="50" height="60"/><rect x="290" y="170" width="60" height="70"/><rect x="400" y="170" width="60" height="70"/><rect x="560" y="280" width="50" height="60"/><rect x="790" y="210" width="60" height="70"/><rect x="890" y="210" width="60" height="70"/></g>
      <path d="M0 1000 H1000" stroke="#fff" stroke-width="10" stroke-dasharray="70 50"/><ellipse cx="860" cy="470" rx="90" ry="70" fill="#9bd6a1" stroke="${INK}" stroke-width="6"/><rect x="850" y="500" width="20" height="60" fill="#8a6a4a" stroke="${INK}" stroke-width="4"/>`;
  return `<rect width="1000" height="1500" fill="#eaf2ff"/>`;
}

// 集中線・キラキラ・効果音
function fx(list = [], focus = [500, 760]) {
  let s = "";
  if (list.includes("focus")) {
    let lines = "";
    for (let i = 0; i < 90; i++) {
      const a = (i / 90) * Math.PI * 2;
      const r1 = 330 + (i % 3) * 40, r2 = 1500;
      lines += `<path d="M${focus[0] + Math.cos(a) * r1} ${focus[1] + Math.sin(a) * r1} L${focus[0] + Math.cos(a) * r2} ${focus[1] + Math.sin(a) * r2}" stroke="${INK}" stroke-width="${2 + (i % 4)}" opacity=".32"/>`;
    }
    s += lines;
  }
  if (list.includes("sparkle")) {
    const star = (x, y, r) => `<path d="M${x} ${y - r} Q${x + r * 0.15} ${y - r * 0.15} ${x + r} ${y} Q${x + r * 0.15} ${y + r * 0.15} ${x} ${y + r} Q${x - r * 0.15} ${y + r * 0.15} ${x - r} ${y} Q${x - r * 0.15} ${y - r * 0.15} ${x} ${y - r}Z" fill="#ffe27a" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>`;
    s += star(150, 560, 46) + star(850, 640, 38) + star(220, 700, 26) + star(790, 520, 28);
  }
  if (list.includes("tone")) {
    s += `<rect width="1000" height="1500" fill="url(#tone)" opacity=".18"/>`;
  }
  return s;
}

// 吹き出し。tail は話し手の口の方向（x,y）。位置 (cx,cy) は中心
function wrapLine(l, max) {
  const a = [...l];
  if (a.length <= max) return [l];
  // 句読点・記号で、真ん中に近い所を探して分ける
  let best = -1, bd = 1e9;
  a.forEach((c, i) => { if ("、。？！…）」 ".includes(c) && i < a.length - 1) { const d = Math.abs(i + 1 - a.length / 2); if (d < bd) { bd = d; best = i + 1; } } });
  if (best < 0 || best < 3 || a.length - best < 3) best = Math.ceil(a.length / 2);
  return [...wrapLine(a.slice(0, best).join(""), max), ...wrapLine(a.slice(best).join(""), max)];
}
function bubble(text, cx0, cy, tail, opts = {}) {
  const lines = String(text).split("\n").flatMap((l) => wrapLine(l, 12));
  const cx = Math.max(60 + Math.min(430, ([...lines.reduce((m, l) => (l.length > m.length ? l : m), "")].length * (opts.fs ?? 58) + 90) / 2), Math.min(940 - Math.min(430, ([...lines.reduce((m, l) => (l.length > m.length ? l : m), "")].length * (opts.fs ?? 58) + 90) / 2), cx0));
  const fs = opts.fs ?? 58;
  const lw = Math.max(...lines.map((l) => [...l].length)) * fs;
  const w = lw + 90, h = lines.length * (fs * 1.32) + 56;
  const [tx, ty] = tail;
  // 尻尾：吹き出しの下辺（または上辺）の端から、話し手へ
  const below = ty > cy;
  const baseY = below ? cy + h / 2 - 4 : cy - h / 2 + 4;
  const bx = Math.max(cx - w / 2 + 60, Math.min(cx + w / 2 - 60, tx));
  const tailD = `M${bx - 30} ${baseY} Q${bx - 4} ${(baseY + ty) / 2} ${tx} ${ty} Q${bx + 14} ${(baseY + ty) / 2 + 6} ${bx + 30} ${baseY}Z`;
  const shape = opts.shout
    ? `<rect x="${cx - w / 2}" y="${cy - h / 2}" width="${w}" height="${h}" rx="14" fill="#fff" stroke="${INK}" stroke-width="8"/>`
    : `<rect x="${cx - w / 2}" y="${cy - h / 2}" width="${w}" height="${h}" rx="${Math.min(60, h / 2)}" fill="#fff" stroke="${INK}" stroke-width="7"/>`;
  const txt = lines
    .map((l, i) => `<text x="${cx}" y="${cy - h / 2 + 28 + fs * 0.95 + i * fs * 1.32}" text-anchor="middle" font-size="${fs}" font-weight="900" fill="${INK}" font-family="'Noto Sans JP',sans-serif">${esc(l)}</text>`)
    .join("");
  // 尻尾の内側を白で塗って、枠線をつなぐ
  return `<g><path d="${tailD}" fill="#fff" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>${shape}<path d="M${bx - 22} ${baseY + (below ? -3 : 3)} H${bx + 22}" stroke="#fff" stroke-width="10"/>${txt}</g>`;
}

function sfx(text, x, y, rot = -8, size = 120, color = "#ffd23f") {
  return `<text x="${x}" y="${y}" transform="rotate(${rot} ${x} ${y})" font-size="${size}" font-weight="900" text-anchor="middle" font-family="'Noto Sans JP',sans-serif" fill="${color}" stroke="${INK}" stroke-width="14" paint-order="stroke" stroke-linejoin="round">${esc(text)}</text>`;
}

// ---- 1コマ ----
// panel: { bg, cam:'two'|'close'|'wide'|'solo', chars:[{who,expr,pose,flip}], says:[{i,text,x?,y?,shout?}], fx:[], sfx:{text,x,y,rot,size}, caption }
export function panelSVG(p) {
  const chars = p.chars;
  const place = [];
  const cam = p.cam ?? (chars.length > 1 ? "two" : "solo");
  const S = { two: 1.45, solo: 1.9, close: 2.6, wide: 1.05 }[cam];
  const headY = { two: 800, solo: 820, close: 700, wide: 980 }[cam];
  const heads = [];
  chars.forEach((c, k) => {
    const cx = cam === "close" || chars.length === 1 ? 500 : k === 0 ? 270 : 730;
    const y = headY - 170 * S;
    const flip = c.flip ?? (chars.length > 1 && k === 1);
    place.push(`<g transform="translate(${cx - 200 * S} ${y}) scale(${S})">${flip ? `<g transform="translate(400 0) scale(-1 1)">${character(c.who, c.expr, c.pose, c)}</g>` : character(c.who, c.expr, c.pose, c)}</g>`);
    heads.push({ x: cx, top: y + 52 * S });
  });
  const order = (p.says ?? []).map((s, n) => ({ ...s, n }));
  const bubbles = order
    .map((s) => {
      const h = heads[s.i] ?? { x: 500, top: 600 };
      const lines = String(s.text).split("\n").length;
      const hh = lines * 76 + 56;
      const cx = s.x ?? Math.max(300, Math.min(700, h.x));
      const cy = s.y ?? h.top - 110 - hh / 2 - (order.length > 1 && s.n === 0 ? 190 : 0);
      return bubble(s.text, cx, cy, [h.x + (cx < h.x ? 20 : -20), h.top - 14], s);
    })
    .join("");
  const f = fx(p.fx, [500, headY]);
  const sf = p.sfx ? sfx(p.sfx.text, p.sfx.x ?? 800, p.sfx.y ?? 760, p.sfx.rot ?? -8, p.sfx.size ?? 120, p.sfx.color) : "";
  const cap = p.caption
    ? `<g><rect x="30" y="30" width="${[...p.caption].length * 44 + 50}" height="76" fill="${INK}"/><text x="55" y="86" font-size="44" font-weight="900" fill="#fff" font-family="'Noto Sans JP',sans-serif">${esc(p.caption)}</text></g>`
    : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1500" width="1000" height="1500">
    <defs><pattern id="tone" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="7" cy="7" r="3" fill="${INK}"/></pattern><clipPath id="cl"><rect width="1000" height="1500"/></clipPath></defs>
    <g clip-path="url(#cl)">${background(p.bg)}${f}${place.join("")}${sf}${bubbles}${cap}</g></svg>`;
}
