# TikTok専用の第1弾（10/14〜10/23の10本）: PTあるある・リハの豆知識・4コマ漫画
import json
CTA = {"tag": "Re:light", "title": "理学療法士・学生の\n無料アプリ", "items": ["国試の過去問が無料で解ける", "論文をAIで読みやすく", "病院・実習先の口コミ"], "action": "プロフィールのリンクから。"}
posts = []
def add(date, slug, kind, **kw): posts.append(dict(date=date, slug=slug, kind=kind, cta=CTA, **kw))
def P(who, expr="smile", say=None, **kw): return dict(who=who, expr=expr, say=say, **kw)

add("2026-10-14", "aruaru-practicum", "tt-aruaru", tag="PTあるある", kicker="PT学生の実習あるある", title="わかる人、\n手をあげて🙋", outro="わかる人は、コメントで教えて",
    items=["日誌が終わらず、日付が変わる", "「考察は？」で頭が真っ白", "先生の「ちょっといい？」にビクッ", "気づけば、1日1万歩", "終わると、ロスで寂しい"],
    tt=dict(caption="【PT学生の実習あるある】わかる人、コメントで教えてください🙋\n\nレポートや実習の相談は、アプリでも。プロフィールのリンクから。\n\n#理学療法士 #理学療法学生 #実習 #PTあるある #リハビリ"))

add("2026-10-15", "tips-bedrest", "tt-tips", cards=[
    dict(tag="リハの豆知識", kicker="知ってた？", heading="寝て過ごすと、\n筋力はどれだけ落ちる？", sec=3),
    dict(heading="1週間の安静で\n10〜15%ほど低下", body="筋力は、動かさないと\nとても早く落ちると言われています。\n（教科書で広く使われる目安）", sec=5),
    dict(heading="だから\nできるだけ早く動く", points=["座る", "立つ", "歩く"], source="個人差があります。体調に不安がある方は、医師・理学療法士に相談してください。", sec=4.5)],
    tt=dict(caption="【リハの豆知識】安静にしていると、筋力は1週間で10〜15%ほど落ちると言われています（目安）。だからリハビリでは、早めに座る・立つ・歩くを大切にします。\n\n#理学療法士 #リハビリ #豆知識 #理学療法 #医療"))

add("2026-10-16", "manga-rom", "tt-manga", tag="PT漫画", series="リハ現場の4コマ", title="一番の目標",
    panels=[dict(chars=[P("pt", "smile", "肩を上げてみましょう"), P("grandpa", "worry", "こ、こうかい？", arm="up")], caption="リハビリ室"),
            dict(chars=[P("pt", "smile", "もう少し…！"), P("grandpa", "tired", "うーん…これ以上は無理じゃ")]),
            dict(chars=[P("pt", "sweat", "どんな時なら\n上がりますか？"), P("grandpa", "happy", "孫を抱っこする時じゃ！")]),
            dict(chars=[P("pt", "happy", "それが、\n一番の目標ですね✨"), P("grandpa", "happy", "よっしゃ！\nがんばるぞ", arm="up")])],
    tt=dict(caption="【PT漫画】目標は、生活の中にある。数字より「孫を抱っこしたい」が、一番のモチベーション✨\n※フィクションです\n\n#理学療法士 #PT漫画 #リハビリ #4コマ漫画 #作業療法"))

add("2026-10-17", "tips-singleleg", "tt-tips", cards=[
    dict(tag="リハの豆知識", kicker="転びやすさ、チェック", heading="片脚立ちで\n転倒リスクがわかる？", sec=3),
    dict(heading="片脚で5秒\n立てますか？", body="目を開けた状態で、\n片脚立ちが5秒未満だと、\n転倒リスクが高いとされています。", sec=5.5, source="出典：Vellas BJ, et al. J Am Geriatr Soc 1997"),
    dict(heading="やる時の注意", points=["壁やテーブルのそばで", "つかまれる状態で", "無理はしない"], source="痛みや不安がある方は、専門職に相談してください。", sec=4.5)],
    tt=dict(caption="【リハの豆知識】片脚立ちが5秒できないと、転倒リスクが高めとされています（開眼）。やる時は、必ず壁などにつかまれる場所で。\n\n#理学療法士 #転倒予防 #リハビリ #豆知識 #健康"))

add("2026-10-18", "aruaru-clinical", "tt-aruaru", tag="PTあるある", kicker="理学療法士のクセ", title="ついやっちゃう\nPTのクセ", outro="あなたのクセも、コメントで",
    items=["街で、人の歩き方を観察してしまう", "「腰痛い」と聞くと、まず姿勢を見る", "家族の立ち上がりを、つい評価", "階段の手すりの握り方が気になる", "「ROM測っていい？」が口ぐせ"],
    tt=dict(caption="【PTあるある】ついやっちゃう、理学療法士のクセ。あなたのクセもコメントで教えてください👇\n\n#理学療法士 #PTあるある #リハビリ #理学療法 #職業病"))

add("2026-10-19", "manga-standup", "tt-manga", tag="PT漫画", series="リハ現場の4コマ", title="立ち上がりのコツ",
    panels=[dict(chars=[P("grandma", "tired", "よいしょ…\nよいしょ…"), P("pt", "smile", "ゆっくりで\n大丈夫ですよ")], caption="立てない…"),
            dict(chars=[P("pt", "smile", "足を引いて、\nおじぎしてみましょう"), P("grandma", "shock", "おじぎ…？")]),
            dict(chars=[P("grandma", "smile", "えいっ（ペコリ）"), P("pt", "happy", "そのまま\n前へ！")], caption="ペコリ"),
            dict(chars=[P("grandma", "happy", "立てたわ！"), P("pt", "happy", "ナイスです👏")], caption="立てた！")],
    tt=dict(caption="【PT漫画】立ち上がりのコツは「足を引いて、おじぎ」。お尻より先に頭を前へ。\n※フィクションです。個別の方法は専門職にご相談を\n\n#理学療法士 #PT漫画 #リハビリ #4コマ漫画 #立ち上がり"))

add("2026-10-20", "tips-walkspeed", "tt-tips", cards=[
    dict(tag="リハの豆知識", kicker="歩く速さでわかる", heading="歩く速さで、\n生活範囲がわかる？", sec=3),
    dict(heading="歩行速度の目安", points=["0.4m/s未満：室内レベル", "0.4〜0.8m/s：限られた屋外", "0.8m/s以上：屋外を歩ける目安"], source="出典：Perry J, et al. Stroke 1995（脳卒中患者の研究）", sec=6),
    dict(heading="10mを\n何秒で歩けるか", body="10mを12.5秒で歩けると\n0.8m/s。\nリハの現場では、よく測ります。", sec=5)],
    tt=dict(caption="【リハの豆知識】歩く速さは、生活範囲の目安になります。0.4m/s未満は室内中心、0.8m/s以上は屋外歩行の目安（脳卒中患者の研究）。\n\n#理学療法士 #リハビリ #歩行 #豆知識 #脳卒中"))

add("2026-10-21", "manga-first-practicum", "tt-manga", tag="PT漫画", series="学生さんの4コマ", title="はじめての実習",
    panels=[dict(chars=[P("student", "sweat", "き、今日から\n実習…！")], caption="実習初日"),
            dict(chars=[P("student", "sweat", "よ、よろしく\nお願いします！"), P("grandpa", "smile", "あなた、緊張してる？")]),
            dict(chars=[P("student", "shock", "は、はい…"), P("grandpa", "smile", "大丈夫じゃよ")]),
            dict(chars=[P("student", "happy", "ありがとう\nございます…！"), P("grandpa", "happy", "ワシのほうが先輩じゃ。\n入院3回目じゃからな")], caption="頼もしい")],
    tt=dict(caption="【PT学生の漫画】実習初日の緊張。患者さんが、案外やさしく声をかけてくれたりします。\n※フィクションです\n\n#理学療法学生 #実習 #PT漫画 #4コマ漫画 #臨床実習"))

add("2026-10-22", "aruaru-kokushi", "tt-aruaru", tag="PTあるある", kicker="国試勉強あるある", title="国試勉強、\nこんなことない？", outro="共感したら、保存して勉強がんばろう",
    items=["筋の起始停止は、覚えた端から消える", "過去問の解説で、知らない単語が増える", "直前に急に、運動学が好きになる", "模試の点で一喜一憂", "「あと1問」が、いつも悔しい"],
    tt=dict(caption="【国試勉強あるある】わかる人は、いいねとコメントを🙌 過去問は、アプリで無料で解けます（プロフィールのリンクから）。\n\n#理学療法士 #理学療法学生 #国試 #PT国試 #勉強垢"))

add("2026-10-23", "tips-lowback", "tt-tips", cards=[
    dict(tag="リハの豆知識", kicker="腰が痛い時", heading="腰痛は、\n安静にしたほうがいい？", sec=3),
    dict(heading="実は\n動ける範囲で動くほうが◎", body="急性の腰痛でも、\n安静を続けるより、\nできる範囲で活動を続けることが\n勧められています。", sec=6, source="出典：腰痛診療ガイドライン2019（日本整形外科学会）"),
    dict(heading="ただし、受診が必要な時", points=["足にしびれや力が入らない", "排尿・排便の異常", "発熱や、じっとしていても強い痛み"], source="危険なサインがあるときは、早めに医療機関へ。", sec=6)],
    tt=dict(caption="【リハの豆知識】腰痛は、安静より「できる範囲で動く」ことが勧められています（腰痛診療ガイドライン2019）。ただし、しびれ・力が入らない・排尿の異常がある時は早めに受診を。\n\n#理学療法士 #腰痛 #リハビリ #豆知識 #健康"))

json.dump(posts, open("tiktok1.json", "w"), ensure_ascii=False, indent=1)
print(len(posts))
