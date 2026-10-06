# Re:light アーキテクチャ

## 全体像
- **フロント/API**: Next.js（App Router）を Vercel にデプロイ。主要画面は Client Component から Supabase を直接呼ぶ。
- **DB/認証/ストレージ**: Supabase（Postgres + RLS）。アクセス制御は RLS が本体。本番は東京リージョンの `relight-tokyo`（2026-10-05に韓国から移行。旧プロジェクトはロールバック用に一時的に残置）。
- **バッチ**: 研修・学会情報の取得（毎日 0:00 JST）。

## 研修・学会情報（News）のデータフロー
```
[PT-OT-ST.NET / 協会 / 士会サイト 47件]
   │  pg_cron (0:00 JST) → pg_net → Edge Function `sync-seminars`（小分けに呼び出し）
   ▼
 public.seminars ◀── Vercel Cron（0時台）→ /api/cron/jpta-seminars, /api/cron/pref-seminars
   │                     └ ingest_seminars(token, rows)  ※Edgeからは接続できないサイト・Googleカレンダー用
   ▼
 検索タブ「News」（PTアカウントのみ・RLSで制限）
```
- 取得ロジックは `supabase/functions/sync-seminars/`（`parsers.ts` は純粋関数、`pref.ts` は依存注入で Edge/Node 共用）。
- 日付は「タイトル → 詳細ページの見出し → 詳細PDF → 公開Googleカレンダー(ICS)」の順に探す。
- Edge Function の再デプロイは、全ファイルをまとめて指定する必要がある（Supabase の仕様）。
- Vercel の環境変数 `CRON_SECRET` が必要（Vercel Cron の認証と `ingest_seminars` のトークンを兼ねる。DBには SHA-256 ハッシュのみ保存）。

## セキュリティ方針
- すべてのテーブルで RLS 有効。`auth.uid()` は `(select auth.uid())` で包む（行ごとの再評価を避ける）。
- 公開プロフィール(`pt_profiles`)は誰でも読めるため、免許番号などの非公開項目は `pt_private`（本人のみ）に分離。
- ストレージは自分のフォルダ（`{user_id}/…`）にのみアップロード可。バケットにサイズ・種類の上限。
- SECURITY DEFINER 関数は内部で権限確認する（`get_admin_*` は admin_users、`ingest_seminars` はトークン）。

## 論文検索とAIモード
- `/api/papers/search` が9サイトを並列に検索して結果を正規化（PubMedはefetchで要旨も取得）。`/api/papers/ai` が検索語の生成と回答生成を担当（`src/lib/server/gemini.ts`、キーはサーバー側のみ）。
- AIは「渡された論文だけ」を根拠に引用番号つきで回答する。質問文は Google に送信されるため、プライバシーポリシーに明記し画面でも注意喚起している。

## 学生アカウント
- `users.account_type` に `student` を追加。RLS で特別扱いするのは `general` だけなので、学生は投稿・コメント・メッセージなどをPTと同じように使える。研修・学会情報(`seminars`)の閲覧も学生に許可。
- 学生の名前は `pt_profiles`(`is_student = true`)に置く。`anon` からは読めず、PT検索・病院の在籍PT一覧にも出さない。`is_student` はトリガー(`pt_profiles_set_student`)で `users.account_type` から決まる。
- 養成校名・卒業予定年・国試日は `student_profiles`(本人のみ)。卒業予定年の翌年4月1日(日本時間)に、`graduate_students()` が `pt` に切り替える。毎日0:10の cron と、ログイン時の `sync_my_account_type()` の両方で動く。切り替え後も学生時代の記録(トラッカー・学習ログ)は残る。
- トラッカー `student_items`、学習ログ `study_logs`、実習先の口コミ `internship_reviews`、質問 `student_questions` / 回答 `student_answers` はいずれも RLS で本人のみ。他人の分は、投稿者を返さない RPC(`get_internship_reviews`, `list_student_questions` など)経由でのみ読める(PT・学生のみ)。
- 実習レポート支援は `/api/student/report-helper`(Gemini)。構成の点検と検索語の提案だけを行い、代筆はしない。患者情報らしき入力は `privacyCheck` で止める。
- 試験情報: `schools`(学校。学生が名前で登録・候補から選択) → `exam_subjects`(学年×学期の科目。学生が追加) → `exam_notes`(年度・試験の種類・難易度・出題傾向・覚えている出題内容・添付ファイル)。読み書きは `is_school_member()`(同じ学校を登録した学生・卒業生)のみ。投稿者は `list_exam_notes` で返さない。添付は非公開バケット `exam-files`(パスは `学校ID/投稿者ID/…`、同じ学校のメンバーだけ読める)。通報で削除するときは、運営が画面側でファイル本体を先に削除する(`adminRemoveExamNoteFile`)。
- `hospitals.departments / beds_*` は診療科・病床の絞り込み用(厚労省オープンデータから別途取り込む。未取り込みの間は絞り込み欄を出さない)。

## 通報・削除申請
- `reports` に通報を保存(クライアントは `target_type / target_id / reason / detail` の列だけ書ける。状態・対応メモは運営のみ)。
- 運営は `/admin` の「通報・削除申請」で、`admin_list_reports` / `admin_resolve_report`(どちらも admin_users のみ実行可)を使って確認・削除・クローズする。投稿を削除するときはコメント・いいね・通知も一緒に消す。

## メール通知
- コメント・フォロー(`notifications` への INSERT)とメッセージ(`messages` への INSERT)のトリガーが `queue_email()` を呼び、`pg_net` で Vercel の `/api/notify-email` に依頼を送る。
- 依頼には本文を含めない(宛先・種類・相手の名前のみ)。同じ種類は10分に1通まで、`users.email_notifications` がオフの人には送らない。
- `/api/notify-email` は `x-notify-secret`(= `NOTIFY_WEBHOOK_SECRET` = DBの `app_config.notify_webhook_secret`)が一致したときだけ SMTP(nodemailer)で送る。SMTP 未設定なら 503 で何も送らない。
- 設定の切り替えは `set_my_email_notifications()`(`users` はクライアントから直接更新できないため)。

## 資格更新の目標
- `qualification_targets`: 数え方(`unit` = count / points)・必要数・更新サイクル・数える実績の種類(`count_categories`)。ポイントは実績投稿の `details.cpd_points` を合計する。
- 「あと何回」は、回数の目標なら残り件数、ポイントの目標なら残りポイント ÷ 記録済み実績の平均ポイントで見積もる(`computeQualificationProgress`)。

## 病院ページ
- `hospitals`（厚労省 医療情報ネット オープンデータ 2024-12-01 時点のうちリハビリテーション科のある病院 約5,000件＋ユーザー登録。栃木県は元データ自体が少ない）。API の1回あたり取得上限は1,000件なので、一覧系は `.range()` で分割する（`sitemap.ts` 参照）、`hospital_reviews`（6項目の評価）。
- 口コミの投稿者(`user_id`)はクライアントへ返さない。一覧は `get_hospital_reviews` RPC（`is_mine` のみ返す）、テーブルの直接SELECTは本人分のみ。
- 証明写真は非公開バケット `id-photos`（パスは `pt_private.id_photo_path`）。

## 既知の課題
- Semantic Scholar は1秒1リクエストの制限があり、連続検索で結果が空になることがある。
- Supabase の「漏えいパスワード保護」はダッシュボード側の設定（有料プラン）。

## 過去問ドリル(理学療法士国家試験の一問一答)
- 出典: 厚生労働省が公開している国家試験の問題・正答(公共データ利用規約 PDL1.0。出典表示が条件)。第59〜61回を取り込み済み。
- テーブル: `quiz_units`(単元24) / `quiz_questions`(問題・正答・図のパス) / `quiz_progress`(本人の解答記録・ブックマーク)。どれも画面から直接は読めず、RPC(`quiz_*`)だけを通す。`quiz_can_use()` で学生・PTのみ。正答は `quiz_answer` / `quiz_reveal` を呼んだときだけ返る。
- 画面: `/student/quiz`(単元・回の一覧、出題条件) → `/student/quiz/play`(一問一答、結果、間違い復習)。
- 取り込み: `scripts/quiz/`(`build.py` がPDFから問題JSONと図の画像(webp)を作る → `classify.py` か手作業で単元を付ける → JSONを一時的に `public/` に置いてデプロイ → DBの `net.http_get` で取得して INSERT → JSONを削除)。図は `public/quiz/<回>/` に置く。
- 採点: 欄ごとに「正解として認める組」を持つ(`answers` = `[[2],[3]]` のように、どちらでも正解)。空欄は採点除外(`excluded`)で、出題しない。
- 通報: `reports.target_type = 'quiz_question'`。運営の「削除」を押しても問題は消えず、対応済みになる(問題の修正は運営が直接行う)。
- 模擬試験: `/student/quiz/mock?exam=61&session=am`。1回分の午前または午後(採点除外を除く約100問)を、本番と同じ160分で解く。途中経過はこの端末の localStorage に保存し、最後に RPC `quiz_grade` でまとめて採点(答えた問題は `quiz_progress` にも反映、結果は `quiz_mock_attempts`)。問題の取得は `quiz_exam_questions`(正答は返さない)。
- PDF・印刷: 一覧の「PDF・印刷」タブに、厚生労働省の公式PDF(問題・別冊・正答)へのリンク(`src/lib/quizPdf.ts`)と、解説つきの印刷用ページ `/student/quiz/print`(RPC `quiz_print_exam`)がある。印刷用ページは、ブラウザの印刷から「PDFに保存」で、PDFにできる。
- 外部の解説: `quiz_questions.ref_url` に、明日へブログの該当ページ(5問ごと)のURLを入れ、答え合わせ画面にリンクを出す。文章の転載はしない。
