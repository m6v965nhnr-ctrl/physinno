# Re:light

理学療法士（PT）のためのコミュニティ／情報プラットフォーム。一般の方は地域や専門分野からPTを探せます。

## 主な機能
- **症例・実績の投稿**（タグ検索、コメント、いいね）と、投稿をもとにしたポートフォリオ（プロフィール下に表示、PDF保存可）
- **論文検索**: PubMed / J-STAGE / CiNii / PEDro / Semantic Scholar / Europe PMC / OpenAlex / ClinicalTrials.gov / DOAJ を横断。日本語→英語の自動翻訳、要約表示、保存リスト。Physiopedia・Cochrane・Google Scholar・医中誌Webはリンクのみ
- **AIモード**: 質問から検索語を作り、見つかった論文だけを根拠に日本語で回答（Gemini）
- **研修・学会情報（News）**: 協会・士会サイトから毎日自動収集
- **病院ページ**: 全国のリハビリテーション科のある約5,000病院（厚労省 医療情報ネット オープンデータ）。疾患比率・採用情報・6項目の口コミ（六角形レーダーチャート）
- **通報・削除申請**: 投稿・コメント・メッセージ・口コミの「通報」ボタン。運営は管理画面(`/admin`)で確認・削除
- **メール通知**: コメント・メッセージ・フォローをメールでも通知(本文は含めない。通知画面で停止可能)。ホーム画面に追加できるアプリとしても使える
- **資格更新の目標**: 回数またはポイントで目標を決めると、「あと何回」を自動計算
- **学生アカウント**（PTをめざす学生）: 卒業予定年を登録すると、卒業翌年の4月1日に自動でPTへ切り替わる。実習・就活トラッカー、国試カウントダウンと学習ログ、実習先の口コミ（実習生の声）、先輩（現役PT）への質問、実習レポート支援（AI: 論文探し、構成・誤字脱字チェック。代筆はしない）、診療科・病床での病院探し、学校ごとの試験情報（科目ごとに出題の傾向・勉強法・過去問を共有）
- グループ、メッセージ、フォロー、PT検索

## 技術構成
Next.js（App Router）／ Supabase（Postgres + RLS・認証・ストレージ）／ Vercel。詳細は [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)。

## 開発
```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

`.env.local` に以下を設定します（キーはコミットしないこと）。

| 変数 | 用途 |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase 接続（必須） |
| `NEXT_PUBLIC_SITE_URL` | 正規URL（サイトマップ・OGP用。未設定時は既定値） |
| `GEMINI_API_KEY` | AIモード。未設定ならAIモードは「未設定」と表示 |
| `GEMINI_MODEL` | 使用モデルの上書き（既定 `gemini-flash-latest`） |
| `SEMANTIC_SCHOLAR_API_KEY` | Semantic Scholar の検索（未設定だと制限が厳しい） |
| `NOTIFY_WEBHOOK_SECRET` | 通知メールAPI(`/api/notify-email`)を呼べるのはデータベースだけにする合言葉。DBの `app_config.notify_webhook_secret` と同じ値 |
| `SMTP_USER` / `SMTP_PASS` | 通知メールの送信用アカウント(Gmail ならアプリパスワード)。未設定なら通知メールは送られない |
| `SMTP_HOST` / `SMTP_PORT` / `MAIL_FROM` | 任意。既定は `smtp.gmail.com` / `465` / `Re:light <SMTP_USER>` |
| `CRON_SECRET` | Vercel Cron による研修情報取り込みの認証 |
| `GOOGLE_SITE_VERIFICATION` | Search Console の所有権確認（任意） |

## デプロイ
`main` へ push すると Vercel が自動デプロイします。DBの変更は `supabase/migrations` に残します。
