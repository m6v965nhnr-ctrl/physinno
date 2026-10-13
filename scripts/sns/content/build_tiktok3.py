# TikTok 第3弾（11/03〜11/12）＋ 作り直し（10/16・10/19・10/21・10/22・11/01）
# 方針（調べた内容）: 冒頭1〜3秒が勝負。1コマ目から見せる。完走率を上げるため短く。保存・シェアされる内容。キーワードを、画面の文字・説明文に。シリーズ化（#番号）。
import json
CTA = {"tag": "Re:light", "title": "理学療法士・学生の\n無料アプリ", "items": ["国試の過去問が無料で解ける", "論文をAIで読みやすく", "病院・実習先の口コミ"], "action": "プロフィールのリンクから。"}
posts = []
def add(date, slug, kind, **kw): posts.append(dict(date=date, slug=slug, kind=kind, cta=CTA, **kw))
def pn(bg, chars, says, **kw): return dict(bg=bg, chars=chars, says=says, **kw)
def C(who, expr="smile", pose="down", **kw): return dict(who=who, expr=expr, pose=pose, **kw)
def S(i, text, **kw): return dict(i=i, text=text, **kw)

# ---------- 作り直し（作画を新しくする） ----------
add("2026-10-16", "manga-rom", "tt-manga", series="PT漫画", no=1, title="一番の目標", hook="リハビリの「目標」って、なんだと思う？",
    panels=[pn("rehab", [C("pt", "smile", "clip"), C("grandpa", "worry", "raise")], [S(0, "肩を上げてみましょう"), S(1, "こ、こうかい？")], caption="リハビリ室"),
            pn("rehab", [C("grandpa", "tired")], [S(0, "これ以上は…\n無理じゃ…")], cam="close", fx=["tone"]),
            pn("rehab", [C("pt", "smile", "clip"), C("grandpa", "grin", "thumb")], [S(0, "どんな時なら、上がりますか？"), S(1, "孫を抱っこする時じゃ！")], fx=["sparkle"]),
            pn("rehab", [C("pt", "happy", "thumb"), C("grandpa", "happy", "raise")], [S(0, "それが一番の目標ですね✨"), S(1, "よし、もう一回！")], fx=["focus", "sparkle"], sfx=dict(text="グイッ", x=760, y=620))],
    tt=dict(caption="【PT漫画#1】リハビリの目標は、数字より「孫を抱っこしたい」。理学療法士が大切にしている、目標の立て方。\n※フィクションです\n\n#理学療法士 #リハビリ #PT漫画 #4コマ漫画 #作業療法"))

add("2026-10-19", "manga-standup", "tt-manga", series="PT漫画", no=2, title="立ち上がりのコツ", hook="立ち上がれない…を変えた、たった一言",
    panels=[pn("room", [C("grandma", "tired"), C("ptf", "smile", "clip")], [S(0, "よいしょ…\nよいしょ…"), S(1, "ゆっくりで大丈夫ですよ")], caption="立てない…"),
            pn("room", [C("ptf", "smile", "clip"), C("grandma", "shock")], [S(0, "足を引いて、おじぎしてみましょう"), S(1, "おじぎ…？")]),
            pn("room", [C("grandma", "grin")], [S(0, "えいっ！\n（ペコリ）")], cam="close", fx=["focus"], sfx=dict(text="ペコッ", x=800, y=980)),
            pn("room", [C("grandma", "happy", "raise"), C("ptf", "happy", "thumb")], [S(0, "立てたわ！"), S(1, "ナイスです👏")], fx=["sparkle"], caption="お尻より、頭を前へ")],
    tt=dict(caption="【PT漫画#2】立ち上がりのコツは「足を引いて、おじぎ」。お尻より先に、頭を前へ。理学療法士が教える動作のコツ。\n※フィクションです。個別の方法は専門職にご相談を\n\n#理学療法士 #リハビリ #PT漫画 #4コマ漫画 #立ち上がり"))

add("2026-10-21", "manga-first-practicum", "tt-manga", series="PT漫画", no=3, title="はじめての実習", hook="実習初日、患者さんに励まされた話",
    panels=[pn("rehab", [C("student", "sweat")], [S(0, "き、今日から\n実習…！")], cam="solo", caption="実習初日"),
            pn("rehab", [C("student", "sweat", "write"), C("grandpa", "smile")], [S(0, "よ、よろしくお願いします！"), S(1, "あなた、緊張してる？")]),
            pn("rehab", [C("student", "shock")], [S(0, "は、はい…！")], cam="close", sfx=dict(text="ドキッ", x=800, y=980)),
            pn("rehab", [C("student", "happy", "write"), C("grandpa", "grin", "thumb")], [S(1, "ワシのほうが先輩じゃ。\n入院3回目じゃからな"), S(0, "ありがとうございます…！")], fx=["sparkle"], caption="頼もしい")],
    tt=dict(caption="【PT学生の漫画#3】実習初日の緊張。患者さんが、案外やさしく声をかけてくれることも。理学療法学生・臨床実習あるある。\n※フィクションです\n\n#理学療法学生 #臨床実習 #PT漫画 #4コマ漫画 #実習"))

add("2026-10-22", "aruaru-kokushi", "tt-aruaru", tag="PTあるある", kicker="国試勉強あるある", title="国試勉強、\nこんなことない？", outro="共感したら、保存して勉強がんばろう",
    items=["筋の起始停止は、覚えた端から消える", "過去問の解説で、知らない単語が増える", "直前に急に、運動学が好きになる", "模試の点で一喜一憂", "「あと1問」が、いつも悔しい"],
    tt=dict(caption="【理学療法士国家試験あるある】わかる人は、いいねとコメントを🙌 PT国試の過去問は、アプリで無料で解けます（プロフィールのリンクから）。\n\n#理学療法士 #理学療法学生 #国試 #PT国試 #勉強垢"))

add("2026-11-01", "manga-homework", "tt-manga", series="PT漫画", no=6, title="自主トレの宿題", hook="自主トレ、ちゃんと続いてる？",
    panels=[pn("room", [C("ptf", "smile", "clip"), C("grandma", "smile")], [S(0, "体操、続けられてますか？"), S(1, "毎日やってるわよ")], caption="次の週"),
            pn("room", [C("grandma", "happy")], [S(0, "ふふ、当然よ")], cam="close", fx=["sparkle"]),
            pn("room", [C("ptf", "smile", "clip"), C("grandma", "sweat")], [S(0, "いつ、やっているんですか？"), S(1, "…テレビのCMの間だけね")], sfx=dict(text="ギクッ", x=500, y=640)),
            pn("room", [C("ptf", "happy", "thumb"), C("grandma", "grin")], [S(0, "それも、立派な継続です！"), S(1, "CMの長い番組を\n探さなきゃ")], fx=["sparkle"])],
    tt=dict(caption="【PT漫画#6】自主トレは、続けることが大事。CMの間だけでも、立派な継続です。理学療法士のリハビリ豆知識。\n※フィクションです\n\n#理学療法士 #リハビリ #PT漫画 #4コマ漫画 #自主トレ"))

# ---------- 新規（11/03〜11/12） ----------
add("2026-11-04", "aruaru-supervisor", "tt-aruaru", tag="PTあるある", kicker="実習指導者あるある", title="実習の先生\nあるある", outro="学生さんは、わかる…！ってなったらコメントで",
    items=["朝は優しいのに、夕方のカンファは鋭い", "「で、君はどう思う？」が突然くる", "考察に「なぜ？」を3回言われる", "「ちょっといい？」で心臓が止まる", "最終日に、ふと優しい"],
    tt=dict(caption="【臨床実習あるある】実習の指導者あるある。学生さんは「わかる…！」ってなったらコメントで教えてください👇\n\n#理学療法学生 #臨床実習 #PTあるある #理学療法士 #実習"))

add("2026-11-05", "manga-street", "tt-manga", series="PT漫画", no=7, title="PTの職業病", hook="PTが街で、ぜったいやってること",
    panels=[pn("street", [C("friend", "smile"), C("pt", "dots")], [S(0, "今日のランチ、どこ行く？"), S(1, "…（前の人の歩き方を観察中）")], caption="お昼休み"),
            pn("street", [C("pt", "dots")], [S(0, "左の振り出しが、小さいな…")], cam="close", fx=["focus"]),
            pn("street", [C("friend", "shock"), C("pt", "sweat")], [S(0, "ねえ、聞いてる！？"), S(1, "ごめん！立脚期が気になって…")]),
            pn("street", [C("friend", "tired"), C("pt", "sweat")], [S(0, "仕事モード、切って！"), S(1, "職業病で…")], sfx=dict(text="ガーン", x=500, y=640), fx=["tone"])],
    tt=dict(caption="【PT漫画#7】理学療法士あるある。街で人の歩き方を、つい観察してしまう職業病。わかる人はコメントで🙌\n※フィクションです\n\n#理学療法士 #PTあるある #リハビリ #4コマ漫画 #職業病"))

add("2026-11-07", "tips-150min", "tt-tips", cards=[
    dict(tag="リハの豆知識", kicker="運動の目安", heading="運動は、1週間で\nどれくらい必要？", sec=2.4),
    dict(heading="中強度なら\n週150〜300分", body="成人は、息が少し弾む程度の運動を\n週150〜300分行うことが\n勧められています。", sec=5, source="出典：WHO 身体活動・座位行動ガイドライン2020"),
    dict(heading="まずは、ここから", points=["歩く時間を、少し増やす", "階段を選ぶ", "短い運動でも、積み重ねる"], source="持病・痛みがある方は、医師・理学療法士に相談を。", sec=4)],
    tt=dict(caption="【リハの豆知識】WHOのガイドライン（2020）は、成人に週150〜300分の中強度の身体活動を勧めています。まずは、歩く時間を少し増やすことから。保存して見返してね。\n\n#理学療法士 #運動 #健康 #豆知識 #リハビリ"))

add("2026-11-08", "aruaru-eve", "tt-aruaru", tag="PTあるある", kicker="国試前日あるある", title="国試の前日\nあるある", outro="受験生、ここまで本当にお疲れさま。応援してる",
    items=["解剖図を、何度も見返してしまう", "持ち物チェックを、5回する", "早く寝ようとして、逆に眠れない", "受験票を、3回見る", "コンビニで、合格祈願のお菓子を買う"],
    tt=dict(caption="【PT国試あるある】国試の前日あるある。受験生、ここまで本当にお疲れさま。応援してます📣 保存して見返してね。\n\n#理学療法士国家試験 #PT国試 #国試 #理学療法学生 #勉強垢"))

add("2026-11-09", "manga-nrs", "tt-manga", series="PT漫画", no=8, title="痛みの点数", hook="「痛みは10点満点で？」と聞いたら…",
    panels=[pn("rehab", [C("pt", "smile", "clip"), C("grandpa", "smile", "cane")], [S(0, "今の痛みを、0〜10で\n言うと、何点ですか？"), S(1, "ふむ…")], caption="評価中"),
            pn("rehab", [C("grandpa", "grin")], [S(0, "今日のリハビリは\n10点満点じゃ！")], cam="close", fx=["sparkle"]),
            pn("rehab", [C("pt", "dots", "clip"), C("grandpa", "grin", "thumb")], [S(0, "それは、痛みじゃなくて評価ですね…"), S(1, "えらいじゃろ！")], sfx=dict(text="ガクッ", x=500, y=640)),
            pn("rehab", [C("pt", "happy", "clip"), C("grandpa", "happy")], [S(1, "痛みは、ゼロじゃ。\n孫の笑顔で消えた"), S(0, "それが一番です✨")], fx=["sparkle"])],
    tt=dict(caption="【PT漫画#8】痛みの評価は「0〜10で何点？」（NRS）。リハビリの評価あるある。わかる人はコメントで🙌\n※フィクションです\n\n#理学療法士 #リハビリ #PT漫画 #4コマ漫画 #評価"))

add("2026-11-11", "manga-abbrev", "tt-manga", series="PT漫画", no=9, title="カルテは暗号", hook="新人PTが、最初にビビるもの",
    panels=[pn("desk", [C("student", "sweat")], [S(0, "カルテが…\n暗号だらけ…！")], cam="solo", caption="新人の朝"),
            pn("desk", [C("student", "sweat", "write"), C("senior", "smile", "chin")], [S(0, "先生、ADLって？"), S(1, "日常生活動作だよ")]),
            pn("desk", [C("student", "happy", "write"), C("senior", "grin", "thumb")], [S(0, "ROMは？ MMTは？"), S(1, "関節可動域と、徒手筋力テスト")], fx=["sparkle"]),
            pn("desk", [C("senior", "sweat")], [S(0, "…実は昨日の夜、\n予習した")], cam="close", sfx=dict(text="ギクッ", x=800, y=980))],
    tt=dict(caption="【新人PTの漫画#9】カルテは略語だらけ。ADL・ROM・MMT…新人PTあるある。先輩も昔は新人でした。\n※フィクションです\n\n#理学療法士 #新人PT #PT漫画 #4コマ漫画 #カルテ"))

add("2026-11-12", "tips-balance", "tt-tips", cards=[
    dict(tag="リハの豆知識", kicker="バランスの話", heading="目を閉じると、\nふらつくのはなぜ？", sec=2.4),
    dict(heading="バランスは\n3つの感覚で保つ", points=["目（視覚）", "耳（前庭・平衡感覚）", "足裏・関節（体性感覚）"], source="運動学・生理学の教科書で、広く説明されている内容", sec=5),
    dict(heading="目を閉じると、\n頼れるのは2つだけ", body="視覚が使えないと、\nほかの2つへの依存が高まります。\nバランスの評価でも使われます。", sec=4.2, source="転びやすい方は、自己判断せず専門職にご相談を。")],
    tt=dict(caption="【リハの豆知識】バランスは、目・耳・足裏と関節の感覚の3つで保たれています。目を閉じるとふらつきやすくなる理由です。保存して見返してね。\n\n#理学療法士 #リハビリ #豆知識 #バランス #理学療法学生"))

json.dump(posts, open("tiktok3.json", "w"), ensure_ascii=False, indent=1)
print(len(posts))
