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
