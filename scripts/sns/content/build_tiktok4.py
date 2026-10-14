# TikTok 第4弾: 「臨床メモ」シリーズ（臨床で使える情報）。あるあるは作らない（ユーザー判断 2026-10-14）。
# 事実は、出典のあるものだけ。目安は目安と書き、個別の判断は専門職・主治医に、を添える。
import json
CTA = {"tag": "Re:light", "title": "理学療法士・学生の\n無料アプリ", "items": ["国試の過去問が無料で解ける", "論文をAIで読みやすく", "病院・実習先の口コミ"], "action": "プロフィールのリンクから。"}
posts = []
VIS = {"memo-orthostatic": "orthostatic", "memo-tug": "tug", "memo-pursedlip": "pursedlip", "memo-borg": "borg", "memo-grip": "grip", "memo-fast": "fast", "memo-cognition": "cognition"}
def memo(date, slug, no, hook, key, use, source, caption, tags, warn="目安です。個別の判断は、主治医・多職種と確認を。"):
    posts.append(dict(date=date, slug=slug, kind="tt-tips", cta=CTA, cards=[
        dict(tag=f"臨床メモ #{no}", kicker="臨床で使える", heading=hook, sec=2.4),
        dict(tag=f"臨床メモ #{no}", visual=VIS[slug], **key, source=source, sec=5.4),
        dict(tag=f"臨床メモ #{no}", **use, source=warn, sec=4.4)],
        tt=dict(caption=f"【臨床メモ#{no}】{caption} 保存して、臨床で見返してね。\n\n{tags}")))

memo("2026-10-14", "memo-orthostatic", 1, "起立性低血圧、\n何で判断する？",
     dict(heading="立って3分以内に\n血圧が下がる", body="収縮期で20mmHg以上、\nまたは拡張期で10mmHg以上の低下が、\n定義として使われます。"),
     dict(heading="離床で見るところ", points=["めまい・ふらつき・顔色", "座位→立位は、ゆっくり", "症状が出たら、臥位に戻す"]),
     "出典：Freeman R, et al. Clin Auton Res 2011（コンセンサス定義）",
     "起立性低血圧は、立位になって3分以内に、収縮期血圧20mmHg以上または拡張期10mmHg以上の低下が目安。離床前後のバイタルの見かた。",
     "#理学療法士 #臨床 #リハビリ #離床 #新人PT")
memo("2026-10-18", "memo-tug", 2, "TUG、何秒で\n転倒リスクが高い？",
     dict(heading="椅子から3m歩いて、\n戻って座るまで", body="地域在住の高齢者では、\n約14秒以上で、転倒リスクが高い\n目安とされています。"),
     dict(heading="測るときの注意", points=["いつもの履物・歩行補助具で", "合図から、座るまでを計測", "他の評価と合わせて判断"]),
     "出典：Shumway-Cook A, et al. Phys Ther 2000",
     "TUG（Timed Up and Go）は、椅子から立って3m歩き、戻って座るまでの時間。約14秒以上が、転倒リスクの目安（地域在住高齢者）。",
     "#理学療法士 #TUG #転倒予防 #評価 #リハビリ")
memo("2026-10-24", "memo-pursedlip", 3, "息切れしたときの\n呼吸のコツ",
     dict(heading="口すぼめ呼吸", body="鼻から吸って、口をすぼめて\nゆっくり吐きます。\n吸う：吐く＝1：2が、目安です。"),
     dict(heading="指導のポイント", points=["力まず、ゆっくり", "動作の前後・息切れ時に", "無理のない回数から"]),
     "呼吸リハビリテーションの教科書で、広く説明されている内容",
     "口すぼめ呼吸は、鼻から吸って口をすぼめてゆっくり吐く。吸う：吐く＝1：2が目安。COPDなどの息切れ時の指導に。",
     "#理学療法士 #呼吸リハビリ #COPD #臨床 #リハビリ")
memo("2026-10-28", "memo-borg", 4, "運動の強さ、\n本人の言葉で測れる？",
     dict(heading="Borgスケール\n6〜20", body="運動の「きつさ」を、本人が\n数字で答えます。\n11〜13（楽〜ややきつい）が、\n目安として使われます。"),
     dict(heading="使いどころ", points=["運動中に、数字で聞く", "脈拍・SpO₂と合わせて見る", "疾患や薬で、基準は変わる"]),
     "出典：Borg GA. Med Sci Sports Exerc 1982／ACSM ガイドライン",
     "Borgスケールは、運動のきつさを6〜20の数字で答えてもらう方法。11〜13が運動の目安として使われる。",
     "#理学療法士 #運動処方 #Borg #評価 #リハビリ")
memo("2026-10-31", "memo-grip", 5, "握力、何kgから\n「低下」と見る？",
     dict(heading="AWGS 2019の基準", body="握力が、男性28kg未満・\n女性18kg未満だと、筋力低下。\n歩行速度1.0m/s未満も、基準の一つ。"),
     dict(heading="測るときの注意", points=["座位または立位で、利き手と反対も", "肘は伸ばして、全力で", "2回測って、高い値を使う"]),
     "出典：Chen LK, et al. J Am Med Dir Assoc 2020（AWGS 2019）",
     "サルコペニア診断のアジア基準（AWGS 2019）では、握力が男性28kg未満・女性18kg未満だと筋力低下。歩行速度は1.0m/s未満。",
     "#理学療法士 #サルコペニア #握力 #評価 #高齢者")
memo("2026-11-04", "memo-fast", 6, "脳卒中を疑う\nサイン、3つ",
     dict(heading="FAST", body="顔のゆがみ（Face）\n腕に力が入らない（Arm）\n言葉が出ない・ろれつ（Speech）\n→ すぐに救急要請（Time）"),
     dict(heading="気づいたら", points=["症状が出た時刻を確認", "すぐに医師・救急へ連絡", "訓練は中止し、安静に"]),
     "出典：Cincinnati Prehospital Stroke Scale／日本脳卒中協会",
     "脳卒中を疑うサイン「FAST」。顔のゆがみ・腕の脱力・言葉の異常があれば、すぐに救急要請。症状が出た時刻の確認が大切。",
     "#理学療法士 #脳卒中 #FAST #臨床 #リハビリ",
     warn="疑ったら、迷わず救急要請・医師へ連絡を。")
memo("2026-11-08", "memo-cognition", 7, "認知機能の\nスクリーニング、点数は？",
     dict(heading="HDS-Rと\nMMSE", body="HDS-R（30点満点）は20点以下、\nMMSE（30点満点）は23点以下が、\n認知症を疑う目安です。"),
     dict(heading="気をつけること", points=["診断ではなく、スクリーニング", "教育歴・難聴・うつで点が変わる", "結果は、主治医と共有"]),
     "出典：加藤伸司ら 1991（HDS-R）／Folstein MF, et al. 1975（MMSE）",
     "認知機能のスクリーニング。HDS-Rは20点以下、MMSEは23点以下が、認知症を疑う目安（いずれも30点満点）。診断は医師が行う。",
     "#理学療法士 #認知症 #HDSR #MMSE #臨床")
json.dump(posts, open("tiktok4.json", "w"), ensure_ascii=False, indent=1)
print(len(posts))
