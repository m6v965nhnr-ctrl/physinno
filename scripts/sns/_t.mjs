import { chromium } from "playwright-core";
import { panelSVG } from "/Users/akimotokazane/Projects/physinno/scripts/sns/manga.mjs";
import { writeFileSync } from "node:fs";
const b = await chromium.launch({ channel: "chrome", headless: true });
const panels = [
 {bg:"rehab",chars:[{who:"pt",expr:"smile",pose:"clip"},{who:"grandpa",expr:"happy",pose:"cane"}],says:[{i:0,text:"今日の調子は？"},{i:1,text:"絶好調じゃ！"}],caption:"朝のリハ室"},
 {bg:"rehab",cam:"close",chars:[{who:"grandpa",expr:"grin",pose:"down"}],says:[{i:0,text:"町内会の\nゲートボールじゃ",x:500,y:260}],fx:["focus","sparkle"],sfx:{text:"ドヤッ",x:800,y:1000}},
 {bg:"desk",chars:[{who:"student",expr:"sweat",pose:"write"},{who:"senior",expr:"smile",pose:"chin"}],says:[{i:0,text:"どこですか？"},{i:1,text:"ここだよ"}]},
 {bg:"room",chars:[{who:"ptf",expr:"shock",pose:"raise"},{who:"grandma",expr:"worry",pose:"down"}],says:[{i:0,text:"えっ！？"},{i:1,text:"CMの間だけ…"}],sfx:{text:"ガーン",x:500,y:700}},
];
for (let i=0;i<panels.length;i++){
  const page = await b.newPage({viewport:{width:1000,height:1500}});
  await page.setContent(`<!doctype html><body style="margin:0;background:#fff"><style>@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700;900&display=swap');</style>${panelSVG(panels[i])}</body>`,{waitUntil:"networkidle"});
  await page.evaluate(()=>document.fonts.ready);
  await page.screenshot({path:`/tmp/mg/p${i}.png`}); await page.close();
}
await b.close();
