# TikTok 第5弾: 「臨床メモ」シリーズ（臨床で使える情報）。あるあるは作らない（ユーザー判断 2026-10-14）。
# 事実は、出典のあるものだけ。目安は目安と書き、個別の判断は専門職・主治医に、を添える。
import json
CTA = {"tag": "Re:light", "title": "理学療法士・学生の\n無料アプリ", "items": ["国試の過去問が無料で解ける", "論文をAIで読みやすく", "病院・実習先の口コミ"], "action": "プロフィールのリンクから。"}
posts = []
VIS = {"memo-berg": "berg", "memo-gcs": "gcs", "memo-fim": "fim", "memo-6mwt": "mwt6", "memo-spo2": "spo2"}
def memo(date, slug, no, hook, key, use, source, caption, tags, warn="目安です。個別の判断は、主治医・多職種と確認を。"):
    posts.append(dict(date=date, slug=slug, kind="tt-tips", cta=CTA, cards=[
        dict(tag=f"臨床メモ #{no}", kicker="臨床で使える", heading=hook, sec=2.4),
        dict(tag=f"臨床メモ #{no}", visual=VIS[slug], **key, source=source, sec=5.4),
        dict(tag=f"臨床メモ #{no}", **use, source=warn, sec=4.4)],
        tt=dict(caption=f"【臨床メモ#{no}】{caption} 保存して、臨床で見返してね。\n\n{tags}")))

memo("2026-11-13", "memo-berg", 9, "Berg、何点未満で\n転倒リスクが高い？",
     dict(heading="Berg Balance Scale", body="14項目・56点満点のバランス検査。\n45点未満で、転倒リスクが高い\nとする報告があります（目安）。"),
     dict(heading="使うときの注意", points=["各項目を、0〜4点で採点", "手順と時間を、そろえて測る", "TUGなど他の評価と合わせる"]),
     "出典：Berg K, et al. Can J Public Health 1992／Shumway-Cook A, et al. Phys Ther 1997",
     "Berg Balance Scaleは、14項目・56点満点のバランス検査。45点未満で転倒リスクが高いとする報告がある（目安）。",
     "#理学療法士 #バランス #Berg #転倒予防 #評価")
memo("2026-11-14", "memo-gcs", 10, "意識レベルを\n共通言語で伝える",
     dict(heading="GCS：E＋V＋M", body="開眼（E 1〜4）\n言語（V 1〜5）\n運動（M 1〜6）\n合計 3〜15点で表します。"),
     dict(heading="記録のコツ", points=["合計点だけでなく、E・V・Mの内訳も", "時刻と、刺激の種類を書く", "変化があれば、すぐ報告"]),
     "出典：Teasdale G, Jennett B. Lancet 1974",
     "GCS（Glasgow Coma Scale）は、開眼E・言語V・運動Mの3つで意識レベルを表す。合計3〜15点。内訳も記録する。",
     "#理学療法士 #GCS #意識レベル #臨床 #リハビリ",
     warn="意識レベルの変化は、すぐに医師・看護師へ報告を。")
memo("2026-11-15", "memo-fim", 11, "FIM、運動と認知は\n何点満点？",
     dict(heading="FIM 18項目", body="運動13項目（91点）と\n認知5項目（35点）、合計126点満点。\n各項目は、7段階で採点します。"),
     dict(heading="評価のポイント", points=["「できる」ではなく「している」ADL", "7＝完全自立、1＝全介助", "記録は、項目ごとに残す"]),
     "出典：Keith RA, et al. Adv Clin Rehabil 1987（FIM）",
     "FIMは、運動13項目（91点）と認知5項目（35点）の合計126点満点。各項目は7段階で、している活動を評価する。",
     "#理学療法士 #FIM #ADL #評価 #リハビリ")
memo("2026-11-16", "memo-6mwt", 12, "6分間歩行テスト、\nどこでやる？",
     dict(heading="6分間歩行テスト", body="30mの廊下を往復して、\n6分間で歩ける最長距離を測ります。\n休んでもよいですが、\n時計は止めません。"),
     dict(heading="実施のポイント", points=["声かけは、標準化されたものを", "前後で、脈拍・SpO₂・息切れを", "中止の基準を、事前に確認"]),
     "出典：ATS Statement: Guidelines for the Six-Minute Walk Test. Am J Respir Crit Care Med 2002",
     "6分間歩行テストは、30mの廊下を往復して、6分間に歩ける最長距離を測る検査。休憩はよいが、時計は止めない。",
     "#理学療法士 #6分間歩行 #呼吸リハビリ #心臓リハビリ #評価")
memo("2026-11-17", "memo-spo2", 13, "SpO₂90%は、\nなぜ基準になる？",
     dict(heading="SpO₂ 90% ≒\nPaO₂ 60Torr", body="酸素解離曲線から、SpO₂ 90%は\nPaO₂ 60Torr（呼吸不全の目安）に\nおおよそ相当します。"),
     dict(heading="測るときの注意", points=["末梢の冷え・体動で、誤差が出る", "マニキュアや汚れも、影響する", "数字だけでなく、症状も見る"]),
     "出典：呼吸不全の定義（PaO₂ 60Torr以下）／酸素解離曲線の教科書的説明",
     "SpO₂ 90%は、PaO₂ 60Torr（呼吸不全の目安）におおよそ相当する。パルスオキシメーターの数字は、誤差にも注意。",
     "#理学療法士 #SpO2 #呼吸リハビリ #バイタル #臨床")
json.dump(posts, open("tiktok5.json", "w"), ensure_ascii=False, indent=1)
print(len(posts))
