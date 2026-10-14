# 機能の紹介シリーズ「Re:light活用術」（PT向け）。方針（2026-10-14）: SNSの投稿は、すべてPT向け。使える機能を押して、PTの登録につなげる。
# 事実は、アプリの機能（src/app/page.tsx のFEATURES・実際の画面）と、協会の公式資料（点数基準）だけ。
# 出力: features.json（Instagram・X用のカルーセル）、tiktok6.json（TikTok用）
import json,re
U="https://relight-1wet.vercel.app"
def link(camp,path="/"): return f"{U}{path}{'&' if '?' in path else '?'}utm_source=x&utm_medium=social&utm_campaign={camp}"
def weight(t):
    t2=re.sub(r'https?://\S+','',t); n=23*len(re.findall(r'https?://\S+',t))
    for ch in t2:
        o=ord(ch)
        n+= 2 if (0x1100<=o<=0x11FF or 0x2E80<=o<=0xD7FF or 0xF900<=o<=0xFAFF or 0xFE30<=o<=0xFE6F or 0xFF00<=o<=0xFF60 or 0xFFE0<=o<=0xFFE6 or 0x1F000<=o<=0x1FFFF or 0x3000<=o<=0x303F) else 1
    return n
TAGS_PT="#理学療法士 #理学療法 #PT #リハビリ #臨床"
CTA_ITEMS=["論文検索（9サイトを一度に）","臨床アイデア・研修情報・病院の口コミ","認定・専門の進捗管理もできる（PTアカウントで無料）"]
TT_CTA={"tag":"Re:light","title":"理学療法士の\n無料アプリ","items":["論文検索・臨床アイデア","資格の進捗管理・ポートフォリオ","病院の口コミ・研修情報"],"action":"プロフィールのリンクから。"}

# (番号, slug, 公開用の見出し(動画1枚目), 動画2枚目の見出し, 動画2枚目の本文, 動画3枚目の見出し, 動画3枚目の箇条書き, 注意書き, キャプション要約, ハッシュタグ, リンク先, IG表紙(kicker,title,sub), IG1枚目(heading, items), IG2枚目(heading, items), 注記)
F=[]
def feat(**k): F.append(k)

feat(slug="paper-9sites", hook="論文探し、\n9つのサイトを\n行き来してない？",
 key=("9サイトを、\n一度に検索","PubMed・J-STAGE・CiNii・PEDro・\nSemantic Scholar・Europe PMC・\nOpenAlex・ClinicalTrials.gov・DOAJ。\n日本語で検索してもOKです。"),
 use=("検索のあとに","エビデンスレベル・引用数で並べ替え|要約の日本語訳を読める|気になる論文は、保存リストに".split("|")),
 tags="#論文検索 #エビデンス", path="/pts?mode=papers",
 ig=("Re:light活用術","論文検索、\n9サイトを一度に","日本語でも英語でも"),
 ig1=("対応している9サイト",["PubMed・J-STAGE・CiNii Research","PEDro・Semantic Scholar・Europe PMC","OpenAlex・ClinicalTrials.gov・DOAJ"],False),
 ig2=("検索したあと",["エビデンスレベル・引用数で並べ替え","要約の日本語訳を読める","気になる論文は、保存リストに"],True),
 caption="論文探しで、何個ものサイトを行き来していませんか。")
feat(slug="ai-papers", hook="論文を、\n普通の文章で\n聞けたら楽",
 key=("AIモード","普通の文章で質問すると、\n見つかった論文だけをもとに、\n引用番号つきで答えます。"),
 use=("使うときの注意","質問文は、外部のAI事業者（Google）に送られる|氏名・患者さんが特定できる情報は入れない|回答は参考情報。原文で確認する".split("|")),
 tags="#論文検索 #AI", path="/pts?mode=papers",
 ig=("Re:light活用術","論文を、\n文章で質問する","AIモード"),
 ig1=("AIモードでできること",["普通の文章で、質問できる","見つかった論文だけをもとに、答える","引用番号つき。続けて質問もできる"],True),
 ig2=("使うときの注意",["質問文は、外部のAI事業者（Google）に送られる","氏名・患者さんが特定できる情報は入れない","回答は参考情報。原文で確認する"],True),
 caption="論文を、普通の文章で質問できるAIモード。")
feat(slug="portfolio-auto", hook="ポートフォリオ、\n勝手にたまったら\n楽じゃない？",
 key=("投稿するだけで、\n整う","学会発表・研修・論文などを\n同じ「投稿」から記録。\n経歴・資格・臨床実績が、\nポートフォリオにまとまります。"),
 use=("できあがったら","PDFで保存・共有できる|公開範囲は、自分で選べる|転職や発表の準備にも使える".split("|")),
 tags="#ポートフォリオ #キャリア", path="/",
 ig=("Re:light活用術","ポートフォリオが、\n自然にたまる","投稿するだけ"),
 ig1=("たまる仕組み",["学会発表・研修・論文を、投稿で記録","プロフィールの情報と合わせて整う","経験年数・資格数・CPDポイントも一覧"],True),
 ig2=("できあがったら",["PDFで保存・共有できる","公開範囲は、自分で選べる","転職や発表の準備にも使える"],True),
 caption="学会発表も研修も、投稿するだけで、ポートフォリオに。")
feat(slug="qual-progress", hook="認定・専門の\n更新、あと何を\nすればいい？",
 key=("資格の進捗を、\n自動で管理","登録・認定・専門理学療法士から\n選んで、分野を選ぶと、\n協会の条件が一覧になります。"),
 use=("マイページで","取得も更新も選べる|「次にやること」が分かる|コマ数や点数の進みを記録できる".split("|")),
 tags="#認定理学療法士 #専門理学療法士", path="/",
 ig=("Re:light活用術","認定・専門の、\n進捗管理","あと何をすればいい？"),
 ig1=("選ぶだけ",["登録・認定・専門理学療法士から選ぶ","認定は21分野、専門は13分野から選べる","取得か更新かを選ぶと、条件が一覧になる"],True),
 ig2=("マイページで",["「次にやること」が分かる","コマ数や点数の進みを記録できる","点数の目安も見られる"],True),
 caption="認定・専門理学療法士の取得・更新、あと何をすればいいか分かります。",
 note="条件は、日本理学療法士協会の公式ページをもとにした目安。申請前に、協会の最新の案内を確認すること。")
feat(slug="qual-points", hook="認定・専門の更新、\n100点って\n何をすると貯まる？",
 key=("点数の目安","学会・研修の参加は、時間がそのまま点数。\n論文（筆頭）は、英文雑誌で60〜80点、\n和文で40点です。"),
 use=("そのほかの目安","学術大会の一般発表（筆頭）は20点|研修会の講師は20点・座長は10点|論文の査読は10点".split("|")),
 src="出典：日本理学療法士協会「更新に関わる点数基準」（2026年4月更新）",
 tags="#認定理学療法士 #専門理学療法士", path="/",
 ig=("Re:light活用術","更新100点は、\n何をすると貯まる？","点数の目安"),
 ig1=("点数の目安（認定・専門）",["学会参加・研修会：時間が点数（30分＝0.5点）","論文（筆頭）：英文A 80／英文B 60／和文 40","一般発表（筆頭）：20","講師20・座長10・論文の査読10"],True),
 ig2=("Re:lightでは",["実績を記録すると、点数を自動で合計","更新まで、あと何点かが分かる","取得に必要な項目も、一覧で見られる"],True),
 caption="認定・専門理学療法士の更新に必要な100点、何をすると貯まるか。",
 note="出典：日本理学療法士協会「更新に関わる点数基準」（2026年4月更新）。申請前に、最新の案内で確認すること。")
feat(slug="clinical-ideas", hook="先輩に聞かないと\n分からない\n「引き出し」を増やす",
 key=("臨床アイデア","診療報酬の区分から疾患を選ぶと、\n評価とリハビリのアイデアが\n見られます。"),
 use=("使い方","自分のアイデアも、登録して共有できる|AIに相談もできる|一人職場でも、引き出しを増やせる".split("|")),
 tags="#臨床 #リハビリ", path="/pts?mode=ideas",
 ig=("Re:light活用術","臨床アイデアで、\n引き出しを増やす","疾患ごとに見られる"),
 ig1=("見つけ方",["診療報酬の区分から、疾患を選ぶ","評価と、リハビリのアイデアが見られる","自分のアイデアを登録して共有できる"],True),
 ig2=("こんなときに",["一人職場で、相談相手がいない","担当が初めての疾患だった","別の視点を知りたい"],True),
 caption="先輩に聞かないと分からない、リハビリの引き出しを増やしたい。")
feat(slug="seminar-news", hook="研修・学会の情報、\n探すのに\n時間かけてない？",
 key=("毎日自動で、\n集約","日本理学療法士協会や、各士会が\n公開している研修・学会の情報を、\nまとめて見られます。"),
 use=("気になったら","保存しておける|参加したら、学習履歴に記録できる|更新に必要な点数の計画にも".split("|")),
 tags="#研修会 #学会", path="/pts?tab=news",
 ig=("Re:light活用術","研修・学会の情報を、\nまとめて見る","毎日自動で更新"),
 ig1=("見られるもの",["協会・各士会が公開している研修・学会","毎日、自動で集約","気になるものは、保存できる"],True),
 ig2=("参加したら",["学習履歴に記録できる","ポートフォリオにも反映","更新の点数の計画にも使える"],True),
 caption="研修・学会の情報、毎日自動でまとめています。")
feat(slug="hospital-review", hook="転職の前に、\n病院の雰囲気を\n知りたい",
 key=("病院の\n職場口コミ","全国約5,000病院を、\n地域から検索できます。\nPTによる口コミを、6項目で\n比べられます。"),
 use=("投稿するとき","匿名でも投稿できる|自分の職場の口コミも書ける|教育体制や雰囲気を、見比べられる".split("|")),
 tags="#転職 #職場環境", path="/pts?mode=hospitals",
 ig=("Re:light活用術","病院の口コミで、\n職場を比べる","6項目で比較"),
 ig1=("できること",["全国約5,000病院を、地域から検索","PTによる口コミを、6項目で比べられる","投稿は、匿名もOK"],True),
 ig2=("こんなときに",["転職・異動の前に、雰囲気を知りたい","教育体制を、比べたい","自分の職場の声を、残したい"],True),
 caption="転職の前に、病院の雰囲気と教育体制を知りたい。")
feat(slug="case-share", hook="担当症例の進め方、\n職場の外の人にも\n相談したい",
 key=("症例・実績を、\n投稿ひとつで","症例報告も、学会発表も、研修も、\n同じ「投稿」から記録。\nコメントで、他のPTの考え方にも\n触れられます。"),
 use=("安心して使える","公開範囲を選べる|匿名でも投稿できる|患者さんが特定される内容は、書かない".split("|")),
 tags="#症例報告 #臨床", path="/",
 ig=("Re:light活用術","症例を、\n投稿して相談する","公開範囲も選べる"),
 ig1=("できること",["症例報告・学会発表・研修を、同じ投稿で","コメントで、他のPTの考え方に触れる","公開範囲や匿名を選べる"],True),
 ig2=("気をつけること",["患者さんが特定される情報は、書かない","送信前に、お知らせが出る","相談の内容は、公開範囲に合わせて"],True),
 caption="担当症例の進め方、職場の外のPTにも相談してみませんか。")
feat(slug="group-talk", hook="一人職場の\n相談相手が\nほしい",
 key=("グループで、\n本音の相談","病院や専門分野ごとに、\n公開範囲を限った場をつくれます。\n一人職場や、新人の相談相手づくりに。"),
 use=("使い方","専門分野や、病院ごとにつくれる|公開範囲は、自分たちで限れる|メッセージで、気軽に相談できる".split("|")),
 tags="#一人職場 #新人PT", path="/",
 ig=("Re:light活用術","グループで、\n本音を相談する","一人職場にも"),
 ig1=("できること",["病院や専門分野ごとに、場をつくれる","公開範囲を限れる","一人職場や新人の相談相手づくりに"],True),
 ig2=("こんなときに",["同じ分野のPTと、情報交換したい","職場の外に、相談相手がほしい","新人の質問に、一緒に答えたい"],True),
 caption="一人職場の相談相手づくりに、グループ機能。")

def cover(tag,kicker,title,sub=""): return {"type":"cover","tag":tag,"kicker":kicker,"title":title,"sub":sub}
def pts(tag,heading,items,note=None,numbered=True):
    d={"type":"points","tag":tag,"heading":heading,"items":[{"t":t} for t in items],"numbered":numbered}
    if note: d["note"]=note
    return d

igposts=[]; ttposts=[]
import datetime
ig_start=datetime.date(2026,11,24); tt_start=datetime.date(2026,11,18)
for i,f in enumerate(F):
    no=i+1
    # --- Instagram / X カルーセル ---
    d_ig=(ig_start+datetime.timedelta(days=i)).isoformat()
    k,t,sub=f["ig"]
    slides=[cover("PT向け",k,t,sub),
            pts("PT向け",f["ig1"][0],f["ig1"][1],None,f["ig1"][2]),
            pts("PT向け",f["ig2"][0],f["ig2"][1],f.get("note"),f["ig2"][2]),
            {"type":"cta","tag":"PT向け","title":"Re:light","items":CTA_ITEMS,"action":"無料で使えます。\nプロフィールのリンクから。"}]
    bullets=f["ig1"][1]
    cap=f["caption"]+"\n\n"+"\n".join("・"+b for b in bullets)+"\n\n保存して、あとで試してね。\n▶ プロフィールのリンクから（PT・無料）\n\n"+TAGS_PT+" "+f["tags"]
    xl=[f["caption"],"",*["・"+b for b in bullets[:3]]]
    x="\n".join(xl)+"\n"+link(("feature-"+f["slug"]) if not f["slug"].startswith(("paper","ai","hospital","clinical","qual","portfolio","seminar")) else f["slug"],f["path"])+"\n#理学療法士"
    w=weight(x); assert w<=275,(f["slug"],w)
    igposts.append({"date":d_ig,"slug":f["slug"],"kind":"carousel","audience":"pt","slides":slides,"ig":{"caption":cap},"x":{"text":x}})
    # --- TikTok ---
    d_tt=(tt_start+datetime.timedelta(days=i)).isoformat()
    src=f.get("src","Re:lightの機能の紹介です（PT向け・無料）")
    cards=[dict(tag=f"Re:light活用術 #{no}",kicker="PTのための無料アプリ",heading=f["hook"],sec=2.4),
           dict(tag=f"Re:light活用術 #{no}",heading=f["key"][0],body=f["key"][1],source=src,sec=5.0),
           dict(tag=f"Re:light活用術 #{no}",heading=f["use"][0],points=f["use"][1],source="機能は、アップデートで変わることがあります。",sec=4.4)]
    ttposts.append({"date":d_tt,"slug":"feature-"+f["slug"],"kind":"tt-tips","cta":TT_CTA,"cards":cards,
      "tt":{"caption":f"【Re:light活用術#{no}】{f['caption']} 理学療法士なら、無料で使えます。プロフィールのリンクから。\n\n{TAGS_PT} {f['tags']}"}})
json.dump(igposts,open("features.json","w"),ensure_ascii=False,indent=1)
json.dump(ttposts,open("tiktok6.json","w"),ensure_ascii=False,indent=1)
print(len(igposts),len(ttposts))
