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
| 国試の問題（約1,200問） | `scripts/quiz/` の取り込み手順と元PDF | 取り込みスクリプトで再作成 |
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

## 病院テーブルの列の権限（2026-10-13）
- `hospitals.created_by` / `claimed_by`（病院を登録・運営している人のユーザーID）は、ログインの有無に関わらず、読めない（列の権限で閉じた。20261029）。勤務先を隠している人が、IDから特定されるのを防ぐため。
- 画面は `HOSPITAL_COLUMNS`（`src/lib/hospitalColumns.ts`）の列だけを読む。`select("*")` は、この表では使えない。
- **病院テーブルに列を足したとき**: `HOSPITAL_COLUMNS` と、DBの `grant select (列) on public.hospitals to anon, authenticated` の両方に足す（足さないと、その列は読めない）。
- 編集できる人（在籍PT・作成者・運営者）の判定は、DB関数 `can_edit_hospital_data`。

## 通知メール
- 全体のスイッチ＋種類ごと（コメント・メッセージ・フォロー・質問への回答）のスイッチ。`users.email_notification_kinds`。オフにした種類だけを持つ。

## 運営画面（/admin）
- 運営のアカウント（`admin_users`）でログインすると、自動で `/admin` に入る。下のメニュー（ホーム・検索など）は出ない。PTの初回プロフィール入力も求めない。
- 「登録の分析」: 登録者数の推移（日・週・月ごと、PT/学生/一般の積み上げ）、累計、直近7日・30日の前の期間との比較、アカウントの種類の内訳、投稿・コメント・いいねの推移。テスト用（@example.com）と運営のアカウントは、既定では数えない。
- 運営を増やすときは、`admin_users` に、そのユーザーIDを追加する。

## 論文検索まわりの、任意の環境変数（Vercel の Environment Variables。なくても動く）
- `NCBI_API_KEY`: PubMed（NCBI）の無料のAPIキー（NCBIのアカウントで発行）。あると、1秒に10回まで（なしは3回）。コードは、キーがあると、呼び出しの間隔を短くする。
- `CONTACT_EMAIL`: 連絡先のメールアドレス。NCBI・OpenAlex（`mailto`）・MyMemory（`de`）に、礼儀として付ける。OpenAlexは、付けると、安定した枠に入る。MyMemoryは、無料の1日の枠が増える。**このアドレスは、外部のサービスに送られる**ので、公開してよいアドレスにする。
- `SEMANTIC_SCHOLAR_API_KEY`: Semantic Scholarの無料のAPIキー。なしだと、全利用者で共有の枠。
- 設定したら、再デプロイ（または、次のデプロイ）で、反映される。

## 論文検索APIの保護（2026-10-18）
- `/api/papers/search`: 1つの実行環境ごとに、IPあたり 1分30回・1時間300回（超えると429）。同じ検索は、10分間、保存した結果を返す（外部に通信しない）。同時に処理する検索は、25まで（超えると503）。成功した結果には `Cache-Control: s-maxage=600` を付け、Vercelの配信網にも、保存させる。実行環境が分かれると、回数は、それぞれ数える（簡易）。

## アクセス集計（Vercel Web Analytics）
- 公開ページの閲覧数だけを数える（Cookieなし・個人を特定しない）。`src/components/SiteAnalytics.tsx` の `COUNTED`（許可する公開パス）以外は、送らない。プロフィール・投稿・メッセージ・管理画面などの個人に結びつくページと、検索語などのクエリ（utm_ 以外）は、送らない。新しい公開ページを増やしたときは、`COUNTED` に足す。個人に結びつく画面を、足さない。
- 見る場所: Vercel → プロジェクト → Analytics。有効化は、Vercelのダッシュボードで、Analyticsタブの「Enable」（コードだけでは、数えられない）。HobbyのWeb Analyticsは、月の件数に上限がある（超えると、記録されなくなる）。
- プライバシーポリシー（第1項・第8項・外部サービスの表）とHPの「個人の追跡は、しません」に、この集計のことを書いてある。仕組みを変えたら、書き換える。
