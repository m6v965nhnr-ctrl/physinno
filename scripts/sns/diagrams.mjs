// 臨床メモ用の、かんたんな図解（SVG）。ブランド色。viewBox 900x440
const T = "#ffffff", M = "#9fb0c8", A = "#5fd6c4", W = "#ffd23f", R = "#ff7a8a", CARD = "#141d30", LINE = "#2d3b57";
const F = "font-family=\"'Noto Sans JP',sans-serif\"";
const wrap = (inner) => `<svg viewBox="0 0 900 440" width="900" height="440" xmlns="http://www.w3.org/2000/svg"><rect width="900" height="440" rx="30" fill="${CARD}" stroke="${LINE}" stroke-width="3"/>${inner}</svg>`;
const txt = (x, y, s, size = 34, fill = T, anchor = "middle", weight = 700) => `<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}" fill="${fill}" ${F}>${s}</text>`;
const person = (x, y, lying, color = A) => lying
  ? `<circle cx="${x - 70}" cy="${y}" r="26" fill="${color}"/><rect x="${x - 40}" y="${y - 16}" width="120" height="32" rx="16" fill="${color}"/><rect x="${x - 100}" y="${y + 30}" width="240" height="10" rx="5" fill="${LINE}"/>`
  : `<circle cx="${x}" cy="${y - 92}" r="26" fill="${color}"/><rect x="${x - 18}" y="${y - 60}" width="36" height="84" rx="18" fill="${color}"/><rect x="${x - 26}" y="${y + 18}" width="18" height="70" rx="9" fill="${color}"/><rect x="${x + 8}" y="${y + 18}" width="18" height="70" rx="9" fill="${color}"/>`;

export const diagrams = {
  // 起立性低血圧: 臥位 → 立位、血圧が下がる
  orthostatic: wrap(`${person(230, 210, true)}${txt(230, 330, "臥位（安静）", 34)}${txt(230, 380, "血圧を測る", 30, M)}
    <path d="M370 210 H520" stroke="${A}" stroke-width="10" stroke-linecap="round"/><path d="M500 188 L530 210 L500 232" fill="none" stroke="${A}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
    ${txt(450, 168, "立つ", 32, A)}${person(690, 220, false, W)}${txt(690, 358, "3分以内に再測定", 30, W)}
    <rect x="735" y="60" width="150" height="140" rx="18" fill="none" stroke="${R}" stroke-width="5"/>${txt(810, 105, "収縮期", 26, R)}${txt(810, 150, "−20", 46, R)}${txt(810, 185, "mmHg以上", 22, R)}`),
  // TUG: 椅子 → 3m → 戻る
  tug: wrap(`<rect x="70" y="250" width="70" height="12" rx="6" fill="${A}"/><rect x="70" y="170" width="14" height="92" rx="7" fill="${A}"/><rect x="76" y="262" width="12" height="60" fill="${A}"/><rect x="124" y="262" width="12" height="60" fill="${A}"/>${txt(105, 360, "椅子", 30, M)}
    <path d="M170 215 H640" stroke="${W}" stroke-width="8" stroke-dasharray="20 14" stroke-linecap="round"/><path d="M640 215 Q700 215 700 260 Q700 305 640 305 H170" fill="none" stroke="${A}" stroke-width="8" stroke-dasharray="20 14" stroke-linecap="round"/>
    <path d="M660 280 L632 305 L660 330" fill="none" stroke="${A}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M730 180 L760 250 H700Z" fill="${W}"/>${txt(770, 352, "コーン", 26, M)}${txt(400, 170, "3m", 40, W)}${txt(400, 360, "歩いて、回って、戻って座る", 32, T)}
    <circle cx="800" cy="90" r="46" fill="none" stroke="${T}" stroke-width="6"/><path d="M800 90 V62 M800 90 L820 102" stroke="${T}" stroke-width="6" stroke-linecap="round"/>${txt(800, 168, "計測", 26, M)}${txt(430, 70, "約14秒以上 → 転倒リスクが高めの目安", 30, R)}`),
  // 口すぼめ呼吸 1:2
  pursedlip: wrap(`${txt(450, 70, "吸う：吐く ＝ 1：2（目安）", 40, A)}
    <rect x="90" y="130" width="200" height="74" rx="37" fill="${W}"/>${txt(190, 180, "吸う（鼻）", 32, "#1b1b2f")}
    <rect x="90" y="250" width="400" height="74" rx="37" fill="${A}"/>${txt(290, 300, "吐く（口をすぼめて）", 32, "#06303a")}
    ${txt(520, 180, "1", 52, W, "start")}${txt(520, 300, "2", 52, A, "start")}${txt(450, 395, "ゆっくり・力まず", 32, M)}`),
  // Borg 6-20
  borg: wrap(`${txt(450, 70, "Borgスケール（6〜20）", 38, T)}
    ${Array.from({ length: 15 }, (_, i) => { const v = 6 + i, x = 105 + i * 52.5; const on = v >= 11 && v <= 13; return `<rect x="${x - 21}" y="130" width="42" height="${60 + i * 8}" rx="10" fill="${on ? A : LINE}"/>${txt(x, 125, v, 26, on ? A : M)}`; }).join("")}
    <path d="M70 330 H830" stroke="${LINE}" stroke-width="4"/>${txt(130, 375, "非常に楽", 26, M)}${txt(450, 375, "11〜13：楽〜ややきつい（目安）", 30, A)}${txt(790, 375, "最大", 26, M)}`),
  // 握力 基準
  grip: wrap(`${txt(450, 62, "握力の基準（AWGS 2019）", 38, T)}
    <rect x="170" y="${390 - 28 * 8}" width="170" height="${28 * 8}" rx="14" fill="${A}"/>${txt(255, 390 - 28 * 8 - 14, "28kg", 40, A)}${txt(255, 424, "男性", 30, M)}
    <rect x="560" y="${390 - 18 * 8}" width="170" height="${18 * 8}" rx="14" fill="${W}"/>${txt(645, 390 - 18 * 8 - 14, "18kg", 40, W)}${txt(645, 424, "女性", 30, M)}
    ${txt(450, 200, "未満 → 筋力低下", 34, R)}`),
  // FAST
  fast: wrap(`${[["F", "Face", "顔のゆがみ", A], ["A", "Arm", "腕の脱力", W], ["S", "Speech", "言葉の異常", A], ["T", "Time", "すぐ救急要請", R]].map(([l, e, j, c], i) => `<circle cx="${130 + i * 213}" cy="170" r="84" fill="none" stroke="${c}" stroke-width="10"/>${txt(130 + i * 213, 200, l, 90, c, "middle", 900)}${txt(130 + i * 213, 310, e, 30, M)}${txt(130 + i * 213, 360, j, 30, T)}`).join("")}`),
  // 認知機能 スクリーニング
  cognition: wrap(`${txt(450, 62, "認知症を疑う目安（30点満点）", 38, T)}
    <rect x="70" y="120" width="760" height="56" rx="28" fill="${LINE}"/><rect x="70" y="120" width="${760 * 20 / 30}" height="56" rx="28" fill="${A}"/>${txt(70, 215, "HDS-R", 30, A, "start")}${txt(70 + 760 * 20 / 30, 215, "20点以下", 32, A)}
    <rect x="70" y="270" width="760" height="56" rx="28" fill="${LINE}"/><rect x="70" y="270" width="${760 * 23 / 30}" height="56" rx="28" fill="${W}"/>${txt(70, 365, "MMSE", 30, W, "start")}${txt(70 + 760 * 23 / 30, 365, "23点以下", 32, W)}
    ${txt(450, 420, "診断ではなく、スクリーニング", 28, M)}`),
  // MMT 0〜5
  mmt: wrap(`${txt(450, 62, "MMT（徒手筋力テスト）", 38, T)}
    ${[["0", "収縮なし"], ["1", "わずかに収縮"], ["2", "重力を除けば動く"], ["3", "重力に抗して動く"], ["4", "抵抗に抗して動く"], ["5", "正常"]].map(([n, s], i) => { const on = n === "3"; const x = 60 + i * 130, h = 50 + i * 30; return `<rect x="${x}" y="${390 - h - 60}" width="110" height="${h}" rx="14" fill="${on ? A : LINE}"/>${txt(x + 55, 390 - h - 70, n, 40, on ? A : M)}${txt(x + 55, 400 - 22, s.length > 6 ? s.slice(0, 5) : s, 22, on ? A : M)}${s.length > 6 ? txt(x + 55, 400 + 4, s.slice(5), 22, on ? A : M) : ""}`; }).join("")}`),
};
