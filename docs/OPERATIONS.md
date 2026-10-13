# 運用メモ（バックアップ・安全・監視）
更新: 2026-10-13

## バックアップと復元
**確認が必要（ダッシュボードで本人が見る）**: Supabase の「relight-tokyo」→ Database → Backups。
- 日次バックアップ・PITR（任意の時点に戻す機能）が有効か。無料プランだと、自動バックアップがない場合がある。
- 有効でなければ、本番のデータを、定期的に手元へ書き出す運用が必要（下の「手元のバックアップ」）。

**何が、どこに残っているか**
| もの | 場所 | 復元の方法 |
|---|---|---|
| アプリのコード | GitHub `m6v965nhnr-ctrl/physinno` | git clone → Vercel が自動デプロイ |
| DBの構造（表・関数・権限） | `supabase/migrations/*.sql` | 新しい Supabase プロジェクトに、番号順に流す |
| 国試の問題（約1,000問） | `scripts/quiz/` の取り込み手順と元PDF | 取り込みスクリプトで再作成 |
| 病院・養成校のデータ | 取り込み元（厚労省等）と、取り込み手順 | 再取り込み |
| **ユーザーのデータ（投稿・プロフィール・記録）** | **Supabase のバックアップだけ** | ダッシュボードの Restore |
| 画像・添付 | Supabase Storage | Storage はDBのバックアップに含まれない場合がある。要確認 |

**万一のときの手順**
1. 何が壊れたかを特定する（Vercel の Runtime Logs、`/admin` の「画面のエラー」）。
2. コードの問題 → Vercel の Deployments で、直前の READY のデプロイを「Rollback」（数十秒）。
3. DBの問題 → 直前のバックアップの時点に Restore（ダッシュボード。復元中は、サービスが止まる）。
4. 復元後、`node scripts/smoke.mjs` と `npm run e2e https://relight-1wet.vercel.app` で確認。
5. ユーザーに影響があれば、トップや意見箱でお知らせする。

**手元のバックアップ（バックアップが有効でない場合）**: Supabase の SQL Editor で、主要な表（users, pt_profiles, posts, comments, hospital_reviews, internship_reviews, portfolio系）を CSV で書き出す。個人情報なので、暗号化したディスクに保存し、共有しない。

## Supabase の安全性チェックの結果（2026-10-13）
- RLS が有効で、ポリシーがない表（16）: 直接アクセスを閉じて、RPC経由だけにしている設計どおり（`app_config`・`email_log`・`feedback_messages` など）。
- ログイン前に呼べる関数（22）: 1つずつ確認した。公開してよいもの（公開投稿・コメント・公開の過去問・病院の口コミ・意見箱の送信・エラー報告）と、トークンで守られている `ingest_seminars` だけ。ログインが必要な `toggle_editorial_idea_like` `toggle_training_reaction` は、ログイン前の実行権限を外した（20261025）。
- ログイン後に呼べる関数（89）: 運営用の `admin_*` は、すべて関数の中で `admin_users` を確認している。内部用（トリガー・メール・卒業処理）は、ログイン後でも呼べない。
- 漏えいパスワードの検知: 有料プランの設定。必要になったら、Authentication → Providers → Email で有効にする。

## AI機能の上限
- 1日あたり、ユーザーごと・機能ごとに上限（`take_ai_quota`）: 臨床アイデア20 / 論文AI40 / レポート添削20 / 過去問の関連語60 / 要約の翻訳100。全体では、1日1,500回。上限を超えると「明日、またお試しください」。
- 上限を変えるときは、`supabase/migrations/20261024_ai_quota.sql` の関数を直して、新しいマイグレーションとして適用する。
- Gemini の請求の上限は、Google AI Studio / Google Cloud 側の設定。無料枠のままなら、請求は発生しない（超えるとエラーになる）。**課金を有効にしている場合は、予算アラートを設定すること。**

## エラーの監視
- ブラウザで起きた予期しないエラーは、`/admin` の「画面のエラー」に集まる（同じものは回数でまとめる。ユーザーのIDは保存しない）。通信の失敗・拡張機能のエラーは除く。
- サーバー側のエラーは、Vercel の Runtime Logs（Vercel MCP の `get_runtime_errors` でも見られる）。

## 退会
- マイページの「退会する」→ `/mypage/delete-account`。投稿は、匿名で残すか、削除するかを選ぶ。DB関数 `delete_my_account`。運営は不可。
- 画像などのファイルは、画面側で先に削除する。バックアップに残る情報は、一定期間後に消える（プライバシーポリシー10章）。
