# TikTok専用の第2弾（10/24〜11/02の10本）
import json
CTA = {"tag": "Re:light", "title": "理学療法士・学生の\n無料アプリ", "items": ["国試の過去問が無料で解ける", "論文をAIで読みやすく", "病院・実習先の口コミ"], "action": "プロフィールのリンクから。"}
posts = []
def add(date, slug, kind, **kw): posts.append(dict(date=date, slug=slug, kind=kind, cta=CTA, **kw))
def P(who, expr="smile", say=None, **kw): return dict(who=who, expr=expr, say=say, **kw)

add("2026-10-24", "aruaru-newpt", "tt-aruaru", tag="PTあるある", kicker="新人PTあるある", title="新人PTの\nあるある", outro="先輩PTも、きっと通った道",
    items=["患者さんの名前を覚えるのに必死", "略語が分からず、こっそり調べる", "帰り道、評価のやり直しを考えて眠れない", "「ありがとう」で全部報われる", "更衣室で、一度ため息"],
    tt=dict(caption="【新人PTあるある】先輩PTも、きっと通った道。共感したらコメントで教えてください🙌\n\n#理学療法士 #新人理学療法士 #PTあるある #リハビリ #新人PT"))

add("2026-10-25", "tips-calf", "tt-tips", cards=[
    dict(tag="リハの豆知識", kicker="むくみの話", heading="ふくらはぎは、\n「第2の心臓」？", sec=3),
    dict(heading="筋肉の動きが、\n血液を押し戻す", body="ふくらはぎの筋肉が縮むと、\n足の血液を心臓へ押し戻します。\n（筋ポンプ作用）", sec=5.5, source="生理学の教科書で、広く説明されている内容"),
    dict(heading="座りっぱなしの時は", points=["足首をときどき動かす", "かかとの上げ下げ", "時々立ち上がる"], source="痛みや腫れがある場合は、医療機関へ。", sec=4.5)],
    tt=dict(caption="【リハの豆知識】ふくらはぎの筋肉が縮むと、足の血液を心臓へ押し戻します（筋ポンプ作用）。座りっぱなしの時は、足首をときどき動かして。\n\n#理学療法士 #リハビリ #豆知識 #むくみ #健康"))

add("2026-10-27", "tips-sitting", "tt-tips", cards=[
    dict(tag="リハの豆知識", kicker="座る時間の話", heading="座りっぱなしは、\n減らしたほうがいい？", sec=3),
    dict(heading="WHOは、座る時間を\n減らすよう推奨", body="すべての年代で、\n座っている時間を減らし、\n少しでも体を動かすことが、\n勧められています。", sec=6, source="出典：WHO 身体活動・座位行動ガイドライン2020"),
    dict(heading="まずは、小さく", points=["30分に1回、立ち上がる", "電話は、立って話す", "階段を選ぶ"], source="持病・痛みがある方は、無理のない範囲で。", sec=5)],
    tt=dict(caption="【リハの豆知識】WHOのガイドライン（2020）は、座っている時間を減らし、少しでも動くことを勧めています。まずは小さく、立ち上がることから。\n\n#理学療法士 #リハビリ #豆知識 #健康 #運動"))

add("2026-10-28", "aruaru-rehabroom", "tt-aruaru", tag="PTあるある", kicker="リハ室あるある", title="リハ室の\nあるある", outro="あなたの職場のあるあるも教えて",
    items=["ベッドの高さを、毎回ちょうどよく調整", "歩行器が、朝だけ足りなくなる", "「ちょっと痛い」の「ちょっと」の幅", "「昨日より良いです」が、一番うれしい", "タオルは、いつも足りない"],
    tt=dict(caption="【リハ室あるある】あなたの職場のあるあるも、コメントで教えてください👇\n\n#理学療法士 #PTあるある #リハビリ #リハ室 #理学療法"))

add("2026-10-30", "tips-bone", "tt-tips", cards=[
    dict(tag="リハの豆知識", kicker="骨の話", heading="骨は、使うほど\n強くなる？", sec=3),
    dict(heading="力がかかると、\n骨は強くなる", body="骨には、かかる力に合わせて\n変化する性質があります。\n（ウォルフの法則）", sec=5.5, source="解剖学・運動学の教科書で、広く説明されている内容"),
    dict(heading="だから、荷重が大切", points=["歩く・立つ", "階段をのぼる", "無理のない筋トレ"], source="骨粗鬆症・骨折がある方は、専門職にご相談を。", sec=5)],
    tt=dict(caption="【リハの豆知識】骨は、かかる力に合わせて変化します（ウォルフの法則）。歩く・立つなど、荷重の刺激が大切。骨粗鬆症などがある方は専門職に相談を。\n\n#理学療法士 #リハビリ #豆知識 #骨粗鬆症 #健康"))

add("2026-10-31", "aruaru-student-day", "tt-aruaru", tag="PTあるある", kicker="PT学生の1日", title="PT学生の\n1日あるある", outro="あなたの1日も教えて",
    items=["朝の電車で、解剖学のノートを開く", "お昼は、おにぎりで時短", "レポートで、気づけば夜中", "コンビニの常連になる", "週末は、図書館が定位置"],
    tt=dict(caption="【PT学生の1日あるある】わかる人は、コメントで教えてください🙌 過去問はアプリで無料で解けます（プロフィールのリンクから）。\n\n#理学療法学生 #PTあるある #国試 #PT国試 #勉強垢"))

add("2026-11-02", "tips-pain", "tt-tips", cards=[
    dict(tag="リハの豆知識", kicker="痛みの話", heading="痛みは、体だけの\n問題じゃない？", sec=3),
    dict(heading="不安・睡眠・ストレスも\n痛みに関わる", body="腰痛は、体の状態だけでなく、\n心理・社会的な要因も\n関わることが知られています。", sec=6, source="出典：腰痛診療ガイドライン2019（日本整形外科学会）"),
    dict(heading="つらい時は", points=["ひとりで抱えない", "睡眠をととのえる", "早めに専門職へ相談"], source="強い痛み・しびれなどがある時は、早めに受診を。", sec=5)],
    tt=dict(caption="【リハの豆知識】腰痛には、体の状態だけでなく、不安・睡眠・ストレスなども関わることが知られています（腰痛診療ガイドライン2019）。つらい時は、ひとりで抱えず相談を。\n\n#理学療法士 #腰痛 #リハビリ #豆知識 #健康"))

def pn(bg, chars, says, **kw): return dict(bg=bg, chars=chars, says=says, **kw)
def C(who, expr="smile", pose="down", **kw): return dict(who=who, expr=expr, pose=pose, **kw)

add("2026-10-26", "manga-dream", "tt-manga", tag="PT漫画", series="リハ現場の4コマ", title="夢の大会",
    panels=[pn("rehab", [C("pt", "smile", "clip"), C("grandpa", "happy", "cane")], [dict(i=0, text="今日の調子は？"), dict(i=1, text="絶好調じゃ！")], caption="朝のリハ室"),
            pn("rehab", [C("grandpa", "grin")], [dict(i=0, text="昨日の夢で\n走ったんじゃ！")], cam="close", fx=["focus", "sparkle"]),
            pn("rehab", [C("pt", "shock", "raise"), C("grandpa", "grin", "thumb")], [dict(i=0, text="何の大会ですか？"), dict(i=1, text="町内会の\nゲートボールじゃ")], sfx=dict(text="ドヤッ", x=520, y=620)),
            pn("rehab", [C("pt", "dots", "clip"), C("grandpa", "happy", "cane")], [dict(i=0, text="走る競技でしたっけ…？"), dict(i=1, text="夢じゃからのう！")], fx=["tone"])],
    tt=dict(caption="【PT漫画】夢の中の話も、リハビリのヒント。…でもゲートボールは走りません。\n※フィクションです\n\n#理学療法士 #PT漫画 #リハビリ #4コマ漫画 #作業療法"))

add("2026-10-29", "manga-listen", "tt-manga", tag="PT漫画", series="学生さんの4コマ", title="実習日誌の赤ペン",
    panels=[pn("desk", [C("student", "sweat", "write"), C("senior", "smile", "chin")], [dict(i=0, text="日誌、お願いします！"), dict(i=1, text="どれどれ…")], caption="実習日誌"),
            pn("desk", [C("senior", "worry", "chin")], [dict(i=0, text="ここ、事実と\n解釈が混ざってるね")], cam="solo", sfx=dict(text="ガーン", x=800, y=560, rot=8)),
            pn("desk", [C("student", "shock", "write"), C("senior", "smile", "chin")], [dict(i=1, text="「元気そうだった」は？"), dict(i=0, text="私の…感想です")]),
            pn("desk", [C("student", "happy", "write"), C("senior", "grin", "thumb")], [dict(i=1, text="事実は「笑顔で\n挨拶した」だね"), dict(i=0, text="具体的…！\n神です！")], fx=["sparkle"], caption="学び")],
    tt=dict(caption="【PT学生の漫画】実習日誌は「事実」と「解釈」を分けて書く。「元気そう」は解釈、「笑顔で挨拶した」は事実。\n※フィクションです\n\n#理学療法学生 #実習 #PT漫画 #4コマ漫画 #臨床実習"))

add("2026-11-01", "manga-homework", "tt-manga", tag="PT漫画", series="リハ現場の4コマ", title="自主トレの宿題",
    panels=[pn("room", [C("ptf", "smile", "clip"), C("grandma", "smile")], [dict(i=0, text="体操、続けられてますか？"), dict(i=1, text="毎日やってるわよ")], caption="次の週"),
            pn("room", [C("grandma", "happy")], [dict(i=0, text="ふふ、当然よ")], cam="close", fx=["sparkle"]),
            pn("room", [C("ptf", "smile", "clip"), C("grandma", "sweat")], [dict(i=0, text="いつ、やっているんですか？"), dict(i=1, text="…テレビのCMの間だけね")]),
            pn("room", [C("ptf", "happy", "thumb"), C("grandma", "grin")], [dict(i=0, text="それも、立派な継続です！"), dict(i=1, text="CMの長い番組を\n探さなきゃ")], fx=["sparkle"], sfx=dict(text="キラッ", x=500, y=520))],
    tt=dict(caption="【PT漫画】自主トレは、続けることが大事。CMの間だけでも、立派な継続です。\n※フィクションです\n\n#理学療法士 #PT漫画 #リハビリ #4コマ漫画 #自主トレ"))

json.dump(posts, open("tiktok2.json", "w"), ensure_ascii=False, indent=1)
print(len(posts))
