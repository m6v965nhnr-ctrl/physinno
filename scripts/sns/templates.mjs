// SNS用の画像（カルーセル 1080x1350 / リール 1080x1920）を作るHTMLテンプレート。
// 配色・書体は、これまでの投稿（_sns/）と、アプリのブランドに合わせる。

const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
// 改行（\n）→ <br>
const br = (s) => esc(s).replace(/\n/g, "<br>");

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:100%;height:100%}
body{font-family:'Noto Sans JP',sans-serif;color:#fff;background:#0a1224;-webkit-font-smoothing:antialiased;
  background-image:radial-gradient(1200px 700px at 100% 0%,rgba(78,215,167,.16),transparent 60%),radial-gradient(900px 600px at 0% 100%,rgba(85,199,220,.14),transparent 60%);}
.wrap{width:100%;height:100%;padding:84px 84px 72px;display:flex;flex-direction:column}
.top{display:flex;justify-content:space-between;align-items:center}
.logo{font-size:44px;font-weight:700;letter-spacing:.5px}
.tag{font-size:30px;font-weight:700;color:#06303a;padding:14px 30px;border-radius:999px;background:linear-gradient(90deg,#55c7dc,#4ed7a7)}
.acc{color:#5fd6c4}
.muted{color:#9fb0c8}
.foot{margin-top:auto;display:flex;justify-content:space-between;align-items:center;font-size:30px;color:#8aa0bd}
h1{font-weight:900;line-height:1.28}
.card{background:#141d30;border:2px solid #25324b;border-radius:30px}
.pill{display:inline-block;font-weight:700;border-radius:999px;padding:8px 22px;background:rgba(95,214,196,.14);color:#5fd6c4}
`;

function shell(body, { w = 1080, h = 1350 } = {}) {
  return `<!doctype html><html lang="ja"><head><meta charset="utf-8"><style>${CSS}</style></head><body style="width:${w}px;height:${h}px"><div class="wrap">${body}</div></body></html>`;
}

const top = (tag) => `<div class="top"><div class="logo">Re:light</div><div class="tag">${esc(tag)}</div></div>`;
const foot = (i, n, hint = "") =>
  `<div class="foot"><span>${esc(hint)}</span><span>${i} / ${n}</span></div>`;

export const slides = {
  // 表紙
  cover: (d, i, n) =>
    shell(`${top(d.tag)}
      <div style="margin-top:150px">
        <div class="pill" style="font-size:34px">${esc(d.kicker || "")}</div>
        <h1 style="font-size:${d.title.length > 22 ? 84 : 98}px;margin-top:36px">${br(d.title)}</h1>
        <p style="font-size:42px;line-height:1.6;margin-top:44px" class="muted">${br(d.sub || "")}</p>
      </div>
      ${foot(i, n, "保存して、あとで見返そう →")}`),

  // 箇条書き（番号つき・最大4つ）
  points: (d, i, n) =>
    shell(`${top(d.tag)}
      <h1 style="font-size:64px;margin-top:80px">${br(d.heading)}</h1>
      <div style="margin-top:50px;display:flex;flex-direction:column;gap:22px">
        ${d.items
          .map(
            (it, k) => `<div class="card" style="padding:28px 34px;display:flex;gap:26px;align-items:flex-start">
              ${d.numbered === false ? "" : `<div style="font-size:50px;font-weight:900;color:#5fd6c4;min-width:58px">${k + 1}</div>`}
              <div><div style="font-size:42px;font-weight:700;line-height:1.35">${br(it.t)}</div>
              ${it.b ? `<div style="font-size:33px;line-height:1.55;margin-top:10px" class="muted">${br(it.b)}</div>` : ""}</div></div>`
          )
          .join("")}
      </div>
      ${d.note ? `<p style="font-size:32px;line-height:1.6;margin-top:30px" class="muted">${br(d.note)}</p>` : ""}
      ${foot(i, n)}`),

  // 表（レベル・名称・例）
  table: (d, i, n) =>
    shell(`${top(d.tag)}
      <h1 style="font-size:56px;margin-top:50px">${br(d.heading)}</h1>
      <div style="margin-top:28px;display:flex;flex-direction:column;gap:10px">
        ${d.rows
          .map(
            (r) => `<div class="card" style="padding:14px 26px;display:flex;gap:24px;align-items:center">
              <div style="font-size:44px;font-weight:900;color:#5fd6c4;min-width:96px">${esc(r.k)}</div>
              <div><div style="font-size:33px;font-weight:700;line-height:1.3">${br(r.t)}</div>
              ${r.b ? `<div style="font-size:26px;margin-top:2px" class="muted">${br(r.b)}</div>` : ""}</div></div>`
          )
          .join("")}
      </div>
      ${d.note ? `<p style="font-size:30px;line-height:1.55;margin-top:24px" class="muted">${br(d.note)}</p>` : ""}
      ${foot(i, n)}`),

  // 最後のページ（アプリの案内）
  cta: (d, i, n) =>
    shell(`${top(d.tag)}
      <div style="margin-top:120px">
        <h1 style="font-size:80px">${br(d.title)}</h1>
        <div style="margin-top:50px;display:flex;flex-direction:column;gap:20px">
          ${d.items.map((t) => `<div class="card" style="padding:26px 34px;font-size:40px;font-weight:700"><span class="acc">✓</span>　${esc(t)}</div>`).join("")}
        </div>
        <div style="margin-top:56px;font-size:44px;font-weight:700;line-height:1.5">${br(d.action || "プロフィールのリンクから、無料で。")}</div>
        <div style="margin-top:14px;font-size:34px" class="muted">${esc(d.handle || "@re.light0717")}</div>
      </div>
      ${foot(i, n, d.foot || "")}`),
};

// ---- リール（縦 1080x1920）----
const reelShell = (body) => shell(body, { w: 1080, h: 1920 });

export const reel = {
  hook: (d) =>
    reelShell(`<div class="top" style="margin-top:20px"><div class="logo">Re:light</div><div class="tag">${esc(d.tag)}</div></div>
      <div style="margin:auto 0;text-align:center">
        <div class="pill" style="font-size:40px">${esc(d.kicker)}</div>
        <h1 style="font-size:120px;margin-top:50px">${br(d.title)}</h1>
        <p class="muted" style="font-size:44px;margin-top:50px">${esc(d.sub || "")}</p>
      </div>`),

  question: (d, opts = {}) =>
    reelShell(`<div class="top" style="margin-top:20px"><div class="logo">Re:light</div><div class="tag">${esc(d.tag)}</div></div>
      <div style="margin-top:90px;font-size:44px;font-weight:700" class="acc">${esc(d.label)}　<span class="muted" style="font-size:34px">${esc(d.unit)}</span></div>
      <h1 style="font-size:${d.stem.length > 26 ? 62 : 74}px;margin-top:34px">${br(d.stem)}</h1>
      <div style="margin-top:50px;display:flex;flex-direction:column;gap:20px">
        ${d.choices
          .map((c, k) => {
            const n = k + 1;
            const state = opts.answer ? (n === d.answer ? "ok" : "dim") : "";
            const bg = state === "ok" ? "background:linear-gradient(90deg,#55c7dc,#4ed7a7);border-color:transparent;color:#06303a" : state === "dim" ? "opacity:.38" : "";
            return `<div class="card" style="padding:26px 34px;font-size:46px;font-weight:700;display:flex;gap:26px;${bg}"><span style="${state === "ok" ? "" : "color:#5fd6c4"};font-weight:900">${n}</span><span>${esc(c)}</span></div>`;
          })
          .join("")}
      </div>
      ${
        opts.countdown
          ? `<div style="margin:auto;text-align:center"><div style="font-size:210px;font-weight:900;line-height:1" class="acc">${opts.countdown}</div></div>`
          : opts.answer
            ? `<div class="card" style="margin-top:44px;padding:30px 38px;font-size:40px;line-height:1.6">
                 <div class="pill" style="font-size:30px">答え：${d.answer}</div>
                 <div style="margin-top:14px">${br(d.explain)}</div></div>`
            : `<div style="margin:auto;text-align:center;font-size:40px" class="muted">考えてみよう</div>`
      }
      <div class="foot" style="font-size:28px"><span>${esc(d.source)}</span></div>`),

  cta: (d) =>
    reelShell(`<div class="top" style="margin-top:20px"><div class="logo">Re:light</div><div class="tag">${esc(d.tag)}</div></div>
      <div style="margin:auto 0;text-align:center">
        <h1 style="font-size:100px">${br(d.title)}</h1>
        <div style="margin:60px auto 0;max-width:820px;display:flex;flex-direction:column;gap:20px;text-align:left">
          ${d.items.map((t) => `<div class="card" style="padding:26px 34px;font-size:42px;font-weight:700"><span class="acc">✓</span>　${esc(t)}</div>`).join("")}
        </div>
        <div style="margin-top:60px;font-size:46px;font-weight:700;line-height:1.5">${br(d.action)}</div>
        <div style="margin-top:14px;font-size:36px" class="muted">@re.light0717</div>
      </div>`),
};

// ---- TikTok専用（縦 1080x1920）：あるある・豆知識・4コマ漫画 ----
const TT = { width: 1080, height: 1920 };
const ttShell = (body) => shell(body, { w: 1080, h: 1920 });
const ttTop = (tag) => `<div class="top" style="margin-top:20px"><div class="logo">Re:light</div><div class="tag">${esc(tag)}</div></div>`;

// ぜんぶ自前のSVGキャラ（顔は記号的なマンガ顔）。胸から上だけ描く
const SKIN = "#ffe0c2";
const WHO = {
  pt: { hair: "#2b2b3a", shirt: "#2bb5a0", style: "short" },
  senior: { hair: "#3a2b2b", shirt: "#1f6f8b", style: "short", glasses: true },
  student: { hair: "#5a3a26", shirt: "#f4f6fa", style: "short", tie: "#1f3a6b" },
  grandma: { hair: "#d9dde3", shirt: "#f2a7b8", style: "bun" },
  grandpa: { hair: "#e4e7ec", shirt: "#8fb8de", style: "bald", glasses: true },
};
const MOUTH = {
  smile: `<path d="M84 112 Q100 128 116 112" fill="none" stroke="#1b2437" stroke-width="4" stroke-linecap="round"/>`,
  happy: `<path d="M82 108 Q100 134 118 108 Z" fill="#c4505a" stroke="#1b2437" stroke-width="3" stroke-linejoin="round"/>`,
  flat: `<path d="M88 116 L112 116" stroke="#1b2437" stroke-width="4" stroke-linecap="round"/>`,
  shock: `<ellipse cx="100" cy="118" rx="9" ry="12" fill="#c4505a" stroke="#1b2437" stroke-width="3"/>`,
  worry: `<path d="M86 120 Q100 108 114 120" fill="none" stroke="#1b2437" stroke-width="4" stroke-linecap="round"/>`,
};
const EYES = {
  normal: `<circle cx="80" cy="90" r="5.5" fill="#1b2437"/><circle cx="120" cy="90" r="5.5" fill="#1b2437"/>`,
  happy: `<path d="M72 92 Q80 82 88 92" fill="none" stroke="#1b2437" stroke-width="4" stroke-linecap="round"/><path d="M112 92 Q120 82 128 92" fill="none" stroke="#1b2437" stroke-width="4" stroke-linecap="round"/>`,
  shock: `<circle cx="80" cy="90" r="8" fill="#fff" stroke="#1b2437" stroke-width="3"/><circle cx="120" cy="90" r="8" fill="#fff" stroke="#1b2437" stroke-width="3"/><circle cx="80" cy="90" r="2.5" fill="#1b2437"/><circle cx="120" cy="90" r="2.5" fill="#1b2437"/>`,
  tired: `<path d="M72 90 L88 90" stroke="#1b2437" stroke-width="4" stroke-linecap="round"/><path d="M112 90 L128 90" stroke="#1b2437" stroke-width="4" stroke-linecap="round"/>`,
};
// expr: "smile" | "happy" | "flat" | "shock" | "worry" | "tired" | "sweat"（汗）
function person(who, expr = "smile", arm = "") {
  const w = WHO[who] ?? WHO.pt;
  const eyes = expr === "happy" ? EYES.happy : expr === "shock" ? EYES.shock : expr === "tired" ? EYES.tired : EYES.normal;
  const mouth = MOUTH[expr === "tired" ? "flat" : expr === "sweat" ? "worry" : expr] ?? MOUTH.smile;
  const hair =
    w.style === "bun"
      ? `<circle cx="100" cy="30" r="22" fill="${w.hair}" stroke="#1b2437" stroke-width="3"/><path d="M42 84 Q40 28 100 28 Q160 28 158 84 Q140 52 100 52 Q60 52 42 84Z" fill="${w.hair}" stroke="#1b2437" stroke-width="3"/>`
      : w.style === "bald"
        ? `<path d="M44 90 Q40 80 48 70 Q54 82 56 96Z" fill="${w.hair}" stroke="#1b2437" stroke-width="3"/><path d="M156 90 Q160 80 152 70 Q146 82 144 96Z" fill="${w.hair}" stroke="#1b2437" stroke-width="3"/>`
        : `<path d="M42 90 Q36 26 100 26 Q164 26 158 90 Q150 54 118 50 Q84 62 58 52 Q46 62 42 90Z" fill="${w.hair}" stroke="#1b2437" stroke-width="3"/>`;
  const glasses = w.glasses
    ? `<circle cx="80" cy="90" r="16" fill="none" stroke="#1b2437" stroke-width="3"/><circle cx="120" cy="90" r="16" fill="none" stroke="#1b2437" stroke-width="3"/><path d="M96 90 L104 90" stroke="#1b2437" stroke-width="3"/>`
    : "";
  const sweat = expr === "sweat" || expr === "shock" ? `<path d="M158 56 Q166 72 158 78 Q150 72 158 56Z" fill="#7fd4ff" stroke="#1b2437" stroke-width="2.5"/>` : "";
  const blush = expr === "happy" || expr === "smile" ? `<ellipse cx="66" cy="108" rx="9" ry="5" fill="#ff9aa8" opacity=".55"/><ellipse cx="134" cy="108" rx="9" ry="5" fill="#ff9aa8" opacity=".55"/>` : "";
  const tie = w.tie ? `<path d="M100 150 L92 176 L100 214 L108 176Z" fill="${w.tie}"/>` : "";
  const stripe = who === "pt" ? `<path d="M100 150 L100 260" stroke="#fff" stroke-width="4" opacity=".7"/>` : "";
  // 腕：上げている腕（arm="up"）
  const armUp = arm === "up" ? `<path d="M30 190 Q10 130 34 64" fill="none" stroke="${w.shirt}" stroke-width="30" stroke-linecap="round"/><circle cx="34" cy="60" r="15" fill="${SKIN}" stroke="#1b2437" stroke-width="3"/>` : "";
  return `<svg viewBox="0 0 200 260" width="200" height="260" xmlns="http://www.w3.org/2000/svg">
    ${armUp}
    <path d="M18 260 Q22 168 100 150 Q178 168 182 260Z" fill="${w.shirt}" stroke="#1b2437" stroke-width="3"/>
    ${tie}${stripe}
    <rect x="86" y="132" width="28" height="24" rx="8" fill="${SKIN}" stroke="#1b2437" stroke-width="3"/>
    <ellipse cx="100" cy="92" rx="58" ry="62" fill="${SKIN}" stroke="#1b2437" stroke-width="3"/>
    ${hair}${eyes}${glasses}${blush}${mouth}${sweat}
  </svg>`;
}

const bubble = (text, side, wide, low) =>
  `<div style="position:absolute;top:${low ? 190 : 22}px;${side === "l" ? "left:236px" : "right:236px"};max-width:${wide ? 660 : 500}px;background:#fff;color:#1b2437;border:4px solid #1b2437;border-radius:26px;padding:14px 22px;font-size:34px;font-weight:700;line-height:1.35;z-index:3">${br(text)}</div>`;

function panel(p, n, visible) {
  const two = p.chars.length > 1;
  const body = visible
    ? `${p.chars
        .map((c, k) => {
          const side = two ? (k === 0 ? "l" : "r") : c.side ?? "l";
          return `<div style="position:absolute;bottom:0;${side === "l" ? "left:30px" : "right:30px"};z-index:2;${c.flip ? "transform:scaleX(-1)" : ""}">${person(c.who, c.expr, c.arm)}</div>`;
        })
        .join("")}
      ${p.chars.map((c, k) => (c.say ? bubble(c.say, two ? (k === 0 ? "l" : "r") : "l", !two, two && k === 1 && p.chars[0].say) : "")).join("")}
      ${p.caption ? `<div style="position:absolute;left:46px;top:44px;z-index:4;background:#1b2437;color:#fff;border-radius:10px;padding:4px 12px;font-size:24px;font-weight:700;white-space:nowrap">${esc(p.caption)}</div>` : ""}`
    : "";
  return `<div style="position:relative;width:960px;height:340px;overflow:hidden;border:5px solid ${visible ? "#1b2437" : "#25324b"};border-radius:18px;background:${visible ? p.bg ?? "#f4f8f9" : "#141d30"}">
    <div style="position:absolute;left:14px;top:8px;font-size:26px;font-weight:900;color:${visible ? "#8aa0bd" : "#3a4968"};z-index:1">${n}</div>${body}</div>`;
}

export const tt = {
  // 4コマ漫画。upTo枚目まで表示（1〜4）
  manga: (d, upTo) =>
    ttShell(`${ttTop(d.tag ?? "PT漫画")}
      <div style="margin-top:26px;text-align:center"><h1 style="font-size:60px">${br(d.title)}</h1></div>
      <div style="margin-top:26px;display:flex;flex-direction:column;gap:18px;align-items:center">
        ${d.panels.map((p, k) => panel(p, k + 1, k < upTo)).join("")}
      </div>
      <div class="foot" style="font-size:28px;justify-content:center"><span>@re.light0717　フィクションです</span></div>`),

  // あるある（items を count 個まで表示）
  aruaru: (d, count) =>
    ttShell(`${ttTop(d.tag ?? "PTあるある")}
      <div style="margin-top:80px;text-align:center"><div class="pill" style="font-size:38px">${esc(d.kicker ?? "あるある")}</div>
        <h1 style="font-size:84px;margin-top:30px">${br(d.title)}</h1></div>
      <div style="margin-top:56px;display:flex;flex-direction:column;gap:22px">
        ${d.items
          .map((t, k) =>
            k < count
              ? `<div class="card" style="padding:38px 40px;font-size:54px;font-weight:700;line-height:1.4;display:flex;gap:26px;${k === count - 1 ? "border-color:#5fd6c4;" : "opacity:.72;"}"><span class="acc" style="font-weight:900">${k + 1}</span><span>${br(t)}</span></div>`
              : `<div style="height:${count ? 138 : 0}px"></div>`
          )
          .join("")}
      </div>
      <div class="foot" style="font-size:30px;justify-content:center"><span>${count >= d.items.length ? esc(d.outro ?? "わかる人は、コメントで教えて") : "共感できたら、ひとこと👇"}</span></div>`),

  // 豆知識カード（heading + body）。source は小さく下に
  card: (d) =>
    ttShell(`${ttTop(d.tag ?? "リハの豆知識")}
      <div style="margin:auto 0">
        ${d.kicker ? `<div class="pill" style="font-size:38px">${esc(d.kicker)}</div>` : ""}
        <h1 style="font-size:${d.heading.length > 22 ? 78 : 92}px;margin-top:40px">${br(d.heading)}</h1>
        ${d.body ? `<p style="font-size:48px;line-height:1.65;margin-top:50px" class="muted">${br(d.body)}</p>` : ""}
        ${d.points ? `<div style="margin-top:50px;display:flex;flex-direction:column;gap:22px">${d.points.map((t, k) => `<div class="card" style="padding:34px 38px;font-size:52px;font-weight:700;line-height:1.4;display:flex;gap:24px"><span class="acc" style="font-weight:900">${k + 1}</span><span>${br(t)}</span></div>`).join("")}</div>` : ""}
      </div>
      <div class="foot" style="font-size:27px;line-height:1.5"><span>${br(d.source ?? "")}</span></div>`),
};
