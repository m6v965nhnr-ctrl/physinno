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
- `hospitals.departments / beds_*` は病床の絞り込み用（診療科での絞り込みは、2026-10-15 に廃止）(厚労省オープンデータから別途取り込む。未取り込みの間は絞り込み欄を出さない)。
- 病院の採用の目安: `hospital_recruit`（1病院1行。雇用形態・月給・賞与の月数・年収・週休・年間休日・こだわり・アクセス）。年収 `annual_min/max` は生成列（記載の年収があればそれ、なければ 月給×(12＋賞与の月数)）。書けるのは `can_edit_hospital_data`（「ここで働いています」と答えたPT・登録者）と、Cron（`ingest_hospital_recruit`、シークレット必須）。検索は `hospital_recruit!inner` の埋め込みで絞る（`searchHospitals`）。
- 定期更新（vercel.json）: `/api/cron/hospital-links`（毎日約170件のリンク切れ確認。`website_status=dead` はリンクを出さず、検索へ案内）、`/api/cron/hospital-recruit`（毎日約130件、いちばん長く取っていない病院から。約30日で全病院が1周。公式サイト→採用→理学療法士部門のページ／PDF（unpdf）→別サイトの採用サイト→サイトマップ→サイト内検索（?s=）の順に読む共通部品 `scripts/hospital-scan-core.mjs` を使う。AIは使わない。お金の項目は3〜9月だけ更新、初回のみ時期を問わない。在籍PT・運営者が入れた行は上書きしない）。第三者の求人サイト（ジョブメドレー等）は、規約・著作権の面から、複製して取り込まない（必要ならリンクで案内する）。
- リンク切れの一括確認は `scripts/check-hospital-links.mjs`（読み取りのみ）。
- 採用の目安の一括取り込み（2026-10-15 実施）: `scripts/scan-hospital-recruit.mjs`（共通部品は `scripts/hospital-scan-core.mjs`）（公式サイト→採用→職種ページを、robots.txt を守って、1病院7ページまで読み、「初任給 218,000円」「年間休日120日」「賞与 年間6.2ヶ月」など決まった書き方だけを正規表現で拾う。AIなし。理学療法士の前後の文面だけを給与の根拠にする）→ `scripts/push-hospital-recruit.mjs`（Cronと同じ `ingest_hospital_recruit` へ。トークンは、使い捨てのハッシュを `seminar_ingest_secret` に一時登録して使い、終わったら削除）。手元のスクリプトは、画像だけのPDFを tesseract（日本語。`brew install tesseract tesseract-lang poppler`）で読む（Vercel のCronは、PDFの文字だけ。画像PDFは読めない）。2回目（PDF・別サイトの採用サイト・サイトマップ・理学療法士/リハビリ部門のページへの追跡を追加。PDFは pdftotext、求人サイトのドメインは読まない）まで実施。結果: 4,636病院を読み、年収が分かる病院は約1,060、アクセスは約1,900、週休は約1,040、年間休日は約830、こだわりは約2,600。人が入れた行（`source_name` が `病院の採用ページ` 以外）は、自動の取り込みが上書きしない。
- ジョブメドレーは、利用規約（/rule/）が「ロボット等のツールを利用して情報を機械的に取得すること」を禁止しているため、取り込まない。
- 病院の口コミ（`hospital_reviews`）に、任意の数字の欄（雇用形態・年収・月の残業・年間休日・女性の働きやすさ）。平均は3件以上そろった項目だけ画面に出す。

## 投稿の公開範囲・匿名投稿・勤務先を隠す設定
- `posts` に `visibility`(public / followers / private)、`title_public`(題名だけ全員に見せる)、`is_anonymous`(匿名)、`target_level`(all / student / newcomer / junior / mid / veteran)を追加。`is_public` は古い画面との互換のため残し、トリガー `posts_sync_visibility` が `visibility` と食い違わないように保つ。匿名にできるのは `visibility = 'public'` の投稿だけ(CHECK 制約)。
- 読み取りは、すべてサーバー側の関数を通す。`posts` / `comments` を直接読めるのは本人だけ(RLS)。
  - `list_posts(author, types, before, limit, level, id)`: 公開範囲の外の人には、題名だけ公開の投稿は題名だけ(`restricted = true`、本文・添付・コメント数は空)、それ以外は返さない。匿名の投稿は、本人以外には `user_id` を返さず、作者の投稿一覧(`p_author`)にも出さない。いいね数・コメント数はその場で数える。ログインしていない人(anon)も呼べる(公開の投稿だけ)。
  - `list_comments(post_ids)`: 読める投稿のコメントだけ。匿名の投稿で、作者が書いたコメントは `user_id` を外す(`by_author = true`)。
  - `notify_post_author(post, type)`: いいね・コメントの通知。匿名の投稿でも画面が作者を知らなくてよいように、宛先(投稿者)はサーバーが決める。
  - `can_read_post(post)`: コメント・いいねの作成と、いいねの読み取りの RLS が使う。
- 学術の一覧は `/posts`(症例・論文・院内症例発表・学会発表・研修)。読む人のレベルは、プロフィールの経験年数(`levelOfReader`: 1〜3年=新人、4〜7=若手、8〜15=中堅、16〜=ベテラン、学生=学生)から決め、最初はそのレベルで絞る。絞り込みは、そのレベル向けと「どのレベルでも」の投稿。
- 勤務先を隠す: `pt_profiles.hide_workplace`。true のとき、トリガー `pt_profiles_hide_workplace` が、`workplace / hospital_id / department / workplace_size` を `pt_private.hidden_*`(本人だけが読める)へ移し、公開のプロフィールの値を null にする。false に戻すと、元の値を `pt_profiles` に戻す。画面側で隠すのではなく、値そのものを公開用の表に置かない。編集画面と自分のマイページは、`pt_private` から読んで本人にだけ表示する。
- マイグレーションは、`20261010_posts_privacy.sql`(加えるだけ) → 新しい画面を公開 → `20261010_posts_privacy_lockdown.sql`(直接の読み取りを絞る) の順に適用した。
- (解決済み 2026-10-13) `notifications` の INSERT ポリシーを、宛先・種類を縛る形に変更した。

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
- 出典: 厚生労働省が公開している国家試験の問題・正答(公共データ利用規約 PDL1.0。出典表示が条件)。第56〜61回を取り込み済み。
- テーブル: `quiz_units`(単元24) / `quiz_questions`(問題・正答・図のパス) / `quiz_progress`(本人の解答記録・ブックマーク)。どれも画面から直接は読めず、RPC(`quiz_*`)だけを通す。`quiz_can_use()` で学生・PTのみ。正答は `quiz_answer` / `quiz_reveal` を呼んだときだけ返る。
- 画面: `/student/quiz`(単元・回の一覧、出題条件) → `/student/quiz/play`(一問一答、結果、間違い復習)。
- 取り込み: `scripts/quiz/`(`build.py` がPDFから問題JSONと図の画像(webp)を作る → `classify.py` か手作業で単元を付ける → JSONを一時的に `public/` に置いてデプロイ → DBの `net.http_get` で取得して INSERT → JSONを削除)。図は `public/quiz/<回>/` に置く。
- 採点: 欄ごとに「正解として認める組」を持つ(`answers` = `[[2],[3]]` のように、どちらでも正解)。空欄は採点除外(`excluded`)で、出題しない。
- 通報: `reports.target_type = 'quiz_question'`。運営の「削除」を押しても問題は消えず、対応済みになる(問題の修正は運営が直接行う)。
- 模擬試験: `/student/quiz/mock?exam=61&session=am`。1回分の午前または午後(採点除外を除く約100問)を、本番と同じ160分で解く。途中経過はこの端末の localStorage に保存し、最後に RPC `quiz_grade` でまとめて採点(答えた問題は `quiz_progress` にも反映、結果は `quiz_mock_attempts`)。問題の取得は `quiz_exam_questions`(正答は返さない)。
- PDF・印刷: 一覧の「PDF・印刷」タブに、厚生労働省の公式PDF(問題・別冊・正答)へのリンク(`src/lib/quizPdf.ts`)と、解説つきの印刷用ページ `/student/quiz/print`(RPC `quiz_print_exam`)がある。印刷用ページは、ブラウザの印刷から「PDFに保存」で、PDFにできる。
- 外部の解説: `quiz_questions.ref_url` に、明日へブログの該当ページ(5問ごと)のURLを入れ、答え合わせ画面にリンクを出す。文章の転載はしない。
- 先生用のクラスと課題(`supabase/migrations/20261009_quiz_classes.sql`): PTアカウントが `/student/quiz/teacher` で申請(`quiz_teacher_requests`) → 運営が `/admin` で承認(`quiz_teachers`)。先生は `quiz_classes`(6文字の参加コード)を作り、`quiz_assignments`(単元・回・難易度で、問題をランダムに選んで固定)を配る。学生は `/student/quiz/classes` でコードを入れて参加(`quiz_class_members`)し、`/student/quiz/play?assignment=<id>` で解く。課題の解答は `quiz_assignment_answers` に最初の1回だけ記録(通常のドリルの記録 `quiz_progress` にも反映)。先生に見えるのは、いまクラスにいる学生の、配った課題の結果(名前・正誤)だけ(`/student/quiz/teacher/assignment?id=`)。学生はいつでも退出でき、退出すると先生の画面から消える。難易度は `quiz_progress` の全ユーザーの正答率から自動(5人以上が解いた問題だけ。80%以上=かんたん、50〜80%=ふつう、50%未満=むずかしい)。テーブルはすべてクライアントから直接は読み書きできず、SECURITY DEFINER の関数だけで操作する。
- 間違えた問題の解き直し(2026-10-14): `quiz_progress.last_correct is false` の問題だけを出す `mode=wrong`(単元・回で絞れる。ホームの「間違えた問題を復習」、一覧の「前回間違えた問題」)。正解すると `last_correct` が true になり、対象から外れる。0問のときは、一覧に案内の文、`/student/quiz/play` に「いまありません」の画面を出す。
- 学習の連続日数(20261101_quiz_streak.sql): `quiz_study_days`(user_id, 日本時間の日。本人も直接は読めない)。`quiz_progress` の解答が増えたときのトリガー(`quiz_note_study_day`)が記録する(ブックマークの切り替えでは増えない。通常・模擬試験・課題のどれでも)。RPC `quiz_streak()` が連続日数と今日解いたかを返し、今日まだなら昨日までの連続を返す。表示は `StreakBadge`(学生ホームの一問一答と、一覧の見出し。1日以上のときだけ)。導入前の日は復元できないため、既存ユーザーは最後に解いた日だけ補った。退会は auth.users への CASCADE で消える。

## 臨床アイデア（2026-10-08〜）
- 場所: `/pts` の「臨床アイデア」タブ（PT・学生のみ）と `/ideas`。`/ideas` は `PT_ONLY_PATH_PREFIXES` に入れてあり、一般アカウントは開けない。
- 疾患の中身（診療報酬の区分 → 疾患 → 評価・編集部のアイデア・注意・参考資料）は、**コードに持つ**（`src/content/ideas/*.ts`。型は `types.ts`、区分は `categories.ts`）。PTの確認・修正は、ファイルの差分で行う。現在: 運動器・呼吸器・脳血管疾患等（神経系）・廃用症候群の各5疾患。心大血管・がん・障害児（者）・難病は「準備中」の枠だけ。
- PTの投稿は DB: `clinical_ideas`（疾患 slug にひも付く。投稿できるのは `pt` のみ、読めるのは `pt`・`student`）と `clinical_idea_reactions`（like/save/practiced）。表は **自分の行だけ**直接読める。他人の投稿は RPC `list_clinical_ideas`（匿名の投稿は、`author_id`・名前・資格・経験を返さない）、件数は `clinical_idea_counts`、反応は `toggle_idea_reaction`。1日20件まで（トリガー）。通報の対象 `clinical_idea` を追加済み（`admin_list_reports` / `admin_resolve_report`）。
- AIに相談: `POST /api/ideas/suggest`（Gemini）。入力は選択式・数値のみ（`src/lib/ideasAi.ts` の一覧にない値は、サーバーで拒否）。入力は保存しない。根拠は、疾患の編集部まとめ＋PTの投稿（人気順5件。ユーザーのトークンで RPC を呼ぶ）。出力は「検討できる選択肢」と、各選択肢の論文検索の語。1人あたり1時間10回（メモリ上の簡易制限）。`/privacy` の外部送信の表に記載済み。
- 論文検索への連携: `/pts?mode=papers&q=…`（`PaperSearch` が `?q=` を読んで検索する）。

## ゲスト閲覧と、トップページ（2026-10-08〜）
- ログインなしで見られるページ: `isPublicGuestPath`（`src/lib/account.ts`）。`/home`・`/home/pt-search`・`/posts`・`/ideas`・`/ideas/[slug]`、ほかに `/guest`（立場の選択）・`/guest/student`（学生の入口）。ログイン中の人は、これまでどおり AuthGuard の確認（初回プロフィール登録・一般アカウントの制限）を通る。操作（投稿・いいね・コメント・保存・AI・メッセージ）は、画面側で登録を案内する（`GuestBanner` / `useIsGuest`）。
- 立場（PT／学生）: `src/lib/guestRole.ts`（localStorage。サーバーには送らない）。未選択のゲストが `/home` を開くと `/guest` へ。下部ナビは、立場ごとに変わる（`BottomNavWrapper`）。
- トップページ（`src/app/page.tsx`）: ヘッダーに「中を見てみる」を常に残し、その下を、タブ（はじめに・できること・学生のみなさんへ・はじめ方・よくある質問。`LpTabs`）で切り替える。全タブの内容は HTML に含める（検索エンジン用）。アプリの画面の見本は、コードで描いた（`src/components/lp/Mocks.tsx`）。
- トップページの入口（2026-10-14〜）: `/?utm_source=…&utm_campaign=…` で、最初に開くタブと、最後のボタンの行き先（`/register?type=`）を変える（`src/lib/lpEntrance.ts` の `pickLpEntrance`、サーバー側で `searchParams` から決める＝ちらつきなし。そのため `/` は動的ページ）。対応: campaign が `quiz-*`/`kokushi-*`/`exam-*`/`student-*`、または source=`tiktok` → 「学生のみなさんへ」＋学生登録／campaign が `memo-*`/`tips-*`/`paper-*`/`ai-*`/`clinical-*`/`evidence-*`/`hospital-*`、または source=`x` → 「できること」／それ以外（UTMなし・`profile` など）→ 「はじめに」。campaign が source より優先。`#faq` などのハッシュがあればそちらが優先。タブは、そのあと自由に切り替えられる。確認は `scripts/e2e.mjs`。
- アイコン→プロフィール: `ProfileLink`（`nested` は、リンクの中に置くとき用）。`/pts/[id]` は、プロフィール id でも user_id でも開ける（`src/lib/profileId.ts`）。
- 色: 主要なボタン・バナーは、明るいブランドのグラデーション＋濃いティールの文字（`--relight-gradient-bright` / `--on-brand`）。白文字を載せたい濃い面は `--relight-gradient-strong`。

## 学生ホームと、先輩に質問の表示（2026-10-08）
- 国試の日は、入力させない。卒業予定年から、2月23日ごろを目安として自動で計算する（`estimatedExamDate`。`computeCountdown` は、保存済みの `national_exam_date` を使わない）。設定画面は、保存のたびに `national_exam_date` を null にする。
- 学生ホーム（`/student`）: 一番上に「一問一答ドリル」（`QuizHero`：解いた数・正答率、今日の10問、間違えた問題の復習）、その下に今週の学習。PTの最新の投稿（`StudentHomePosts`）も出す。学生も、PTの公開投稿を読める（`list_posts` は、アカウントの種類で制限していない）。
- PTのホーム（`/home`）: 学生からの質問（`HomeQuestionsStrip`。回答のないものを先に、3件）を、投稿の一覧の上に出す。質問は、学生が「匿名／名前を出す」を選ぶ（`student_questions.is_anonymous`。匿名の質問は、`list_student_questions` が投稿者を返さない）。


## 共通部品と安全網（2026-10-13）
- 画面: `src/app/error.tsx` / `global-error.tsx` / `not-found.tsx` / `loading.tsx`。読み込み中・空・失敗は `src/components/states.tsx`。
- 確認ダイアログは `askConfirm()`（`ConfirmHost` が layout に1つ）。通知は `notify()`（`Toaster`）。ブラウザ標準の `confirm()` / `alert()` は使わない。
- 検索（論文・病院・PT）の見た目は `src/lib/ui.ts` に共通化。
- マイページの「今日やること」は `TodayTodos`、PTホームの「はじめの1歩」は `FirstStepCard`（端末の localStorage で進み具合を覚える。`src/lib/firstSteps.ts`）。
- ゲストが登録・ログインしたあと、見ていた画面へ戻す: `?next=`（`src/lib/returnTo.ts`。サイト内のパスだけ許可）。プロフィール入力が終わったあとに戻る。
- DB: 外部キーの索引を追加（20261021_fk_indexes）。`notifications` の INSERT は、follow / endorsement（実際の関係がある場合のみ）と、自分宛ての group 系だけ（20261021_notifications_insert_policy）。いいね・コメント・回答・卒業の通知は SECURITY DEFINER 経由。
- 自動テスト: `npm run e2e`（Playwright。インストール済みの Chrome を使う）。公開ページの確認。ログイン後は、環境変数でテスト用アカウントを渡したときだけ。
- 病院ページ(`/hospitals/[id]`)に、Hospital の構造化データ(JSON-LD)をサーバー側で出力。

## 登録を増やす仕組み（2026-10-13）
- 登録直後: 学生は、設定が終わったら最初の10問へ（`/student/settings` → quiz play）。PTは、ホームの「はじめの3歩」（論文を探す→保存→いいね。`FirstStepCard`、端末に進み具合を保存）。
- LINEで送る: `LineShareButton`（招待カード・過去問の結果画面）。
- しばらく使っていない人へのお知らせ: `users.last_seen_at`（1日1回、`touchLastSeen`）。DBの `queue_inactive_reminders`（pg_cron 毎日10:00 JST）が、3週間使っていない人へ1通（60日に1通まで、1回50人まで、全体と種類別（reminder）のスイッチを尊重）。メール本文は `/api/notify-email` の `reminder`。
- 養成校ページ: `/schools`、`/schools/[slug]`（大学。`src/content/schools/pt-universities.ts`。第61回・大学新卒。出典: 旺文社 教育情報センター（厚生労働省発表資料に基づく）。取り出しは `scripts/schools/extract-obunsha.mjs`）。専門学校・短大は、公表資料が確認できていないため、なし。
- SNS: `scripts/sns/`（`templates.mjs` `render.mjs` `PngsToMp4.swift`、内容は `content/weekN.json`）。画像はChrome、動画はmacOS標準のAVFoundation。素材は `_sns/`（Git管理外）。毎日12:30に、スケジュールタスク `relight-sns-daily-post` が、Chrome（Claude in Chrome）で Instagram と X に投稿し、`リサーチ/sns_log.md` に記録。毎週日曜20:00に `relight-sns-weekly-plan` が来週分を作る。毎週月曜9:00の `relight-weekly-growth-report` が、登録・SNSの数字を分析。

## ブロック機能（2026-10-14〜）
- `user_blocks`（ブロックする人→される人。本人にだけ見える）。追加・解除は RPC の `block_user` / `unblock_user`（フォロー関係も外す）、一覧は `list_my_blocks`。
- ブロックした人の内容を除く仕組み: 画面から直接読む表（posts・comments・messages・group_messages・hospital_reviews・internship_reviews・student_questions/answers・clinical_ideas・training_methods・exam_notes）に、restrictive な select ポリシー `hide_blocked_*`（`is_blocked_by_me(user_id)`）。security definer の一覧関数（`list_posts_v2`・`list_comments`・`get_hospital_reviews`・`get_internship_reviews`・`list_student_questions/answers`・`get_student_question`・`list_clinical_ideas`・`list_training_methods`）には、同じ条件を where に入れてある。**新しい「他人の内容」を返す関数を作るときは、`not public.is_blocked_by_me(...)` を入れること。**
- ブロックされた側は、会話の作成・メッセージ送信が、ポリシーで拒否される（`private.blocks_me`。`private` スキーマ＝API に公開されないので、ブロックされたことは相手に分からない）。
- 画面: `ReportButton` に `authorId` を渡すと「通報・ブロック」になる。プロフィールは `BlockUserButton`、解除は `/mypage/blocked`。匿名で投稿者が分からない内容（口コミ・試験メモ・クイズ問題）は、通報のみ。

## Events（研修・学会）の主催・学会フィルター（2026-10-15〜）
- 団体の一覧は `src/lib/seminarOrgs.ts`（18分野・約190団体。公式サイトのURLがあるものは約100）。イベントは `orgCodeOf()` で団体に振り分ける（取得元 `org-<code>` → 主催者名・別名 → 題名 → どれにも当たらなければ「民間・その他」）。振り分けは画面側で行い、DBに列は持たない。
- 画面: `SeminarOrgFilter`（分野ごとの開閉・分野ごとの一括チェック・団体名の検索・件数）。何も選ばなければ、すべて表示。
- 取り込み: `/api/cron/org-seminars`（毎日。団体を4つに分け、1日に1/4。士会用の汎用スクレイパー `syncPrefSite` を、`candidateToOrgSeminar` で流用。`isUsableOrgEvent` で、録画・更新通知・日付の取り違えを除く）。最初の一括は `scripts/sync-org-seminars.mts`（ローカルで実行し、一時トークンで `ingest_seminars` へ）。
- SNSは利用規約上、自動では集めない。
- 小さな勉強会: `/api/cron/community-seminars`（毎日）。こくちーず（検索結果ページ。robots.txt で許可）と Doorkeeper（公開API）から、理学療法・リハビリに関わる題名のものだけ拾う（`src/lib/server/communityEvents.ts`）。最初の一括は `scripts/sync-community-seminars.mts`。Peatix・connpass は、機械的なアクセスを許可していない（403・API鍵が必要）ので使わない。
- 主催・学会の絞り込みには、公式サイトがなく、載っている研修もない団体は、出さない（`SeminarOrgFilter`）。

## 学生の「勉強」とホームのかんたん投稿（2026-10-15〜）
- 学生の下のメニューは「マイページ・検索・勉強・メッセージ・ホーム」（投稿のボタンは外し、投稿はホームの上の `HomeComposer` から。写真・症例などは「くわしく書く」から `/posts/create`）。PTの下のメニューは、これまでどおり。
- 勉強は `/study`（`StudyHub`）。マイページ（`/student`）とは切り離した、独立の機能（マイページには、入口のカードだけ）。やめる・戻るは、マイページではなく `/study`。
- 一問一答の画面（`/student/quiz/play`）: 科目・回・復習は、最後の問題まで続く（`n=0`）。「今日の10問」だけ10問。正誤の右に「次の問題へ」。結果の画面の「間違えた問題」に、保存（ブックマーク）ボタンと、タップでその問題（正答・解説つき）に戻る動き。
- 勉強（`/study`）は、旧「過去問ドリル」（`/student/quiz`、今は `/study` へ転送）と1つにした: 今日の10問・進み具合・近道（復習・保存・全範囲・模擬試験）・出題の設定（問題・順番・数。科目／回／全範囲／キーワードから始めるとき使う）・科目／回／模擬試験／PDF・キーワード・大学内ランキング（学生）・クラスの課題。
- iPhoneで、キーボードを閉じたあと、画面の下に固定した下のメニューが、キーボードがあったときの位置のまま戻らない不具合（2026-10-15 に報告）: 入力中は下のメニューを隠し、閉じたあとに、画面を1pxだけ動かして位置を計算し直す（`BottomNavWrapper`）。
- 下のメニューは、`position: fixed` をやめて、`position: sticky; bottom: 0`（ページの最後に、画面の下へ貼りつく）にした（2026-10-15）。iPhoneのホーム画面アプリで、スクロールすると、固定のメニューが画面の中ほどへ浮いてしまったため（画面録画で確認）。`body` は縦に並べる箱（`flex-col`・`min-h-dvh`）、本文は `flex-1`。メニューを「画面の下に固定」するものは、sticky を使う。
- 下のメニューの位置合わせ（`BottomNavWrapper`）: 見えている範囲（visualViewport）の下と、メニューの下がずれたら、そのずれだけ transform で戻す（ずれがなければ何もしない）。URLに `?navdebug=1` を付けると、スクロールの量・見えている範囲・メニューの位置が、画面の左上に出る（原因の調査用）。
- マイページ（学生）の「今日の学習」（`StudyCalendarCard`）: 今日解いた問題の数・連続日数と、やった日に色がつくカレンダー。日ごとの問題数は `quiz_study_days.solved`、カレンダーは RPC `quiz_study_calendar`（問題を解いた日と、学習ログの日）。

## セキュリティの見直し（2026-10-15 反映）
- DB（本番に適用済み）: reviews の user_id を読めなくする（読むのは `list_pt_reviews` / `list_my_reviews`）／portfolio-files を非公開（署名つきURL）／anon の書き込み・TRUNCATE などの権限を外す／users・pt_private・admin_users・メッセージ類の anon SELECT を外す／id-photos は画像のみ・8MBまで／資格の目標（qualification_targets）はログイン中だけ読める／使っていない `pts` 表は誰も読めない／免許番号は書き込まれても空にする／トリガー用関数 `pt_profiles_hide_workplace` は直接呼べない。マイグレーション: `20261106_security_hardening.sql`・`20261116_security_extra.sql`。
- アプリ: Next.js を 16.4.1 に更新（重大な既知の脆弱性を解消。`npm audit` は0件）／セキュリティヘッダー（HSTS・X-Content-Type-Options・X-Frame-Options・Referrer-Policy・Permissions-Policy・CSP の frame-ancestors など。`next.config.ts`）／AI機能の利用回数の確認が失敗したときは、使わせない（以前は、通していた）。
- 確認: `npm run security`（匿名で他人の情報が読めない・書けない）を、変更のたびに実行する。
- ダッシュボードでしかできないもの（運営の作業）: Authentication → Policies の「Leaked password protection」をオン（プランによっては使えない）、バックアップ（PITR）とAuthのレート制限の確認。

## HPの安全性の説明（Supabase / Vercel）
- `src/app/page.tsx` の `INFRA` と安全性の帯に、使っている基盤（Supabase=DB・認証・保管庫、東京／Vercel=配信）と、各社が公表する認証（SOC 2 Type 2・ISO 27001）を記載。
- 「各社の公式発表による」「Re:light自身の取得ではない」と明記。バックアップ・PITR等、プランに依存して未確認のことは書かない。
- 認証の内容は変わりうるので、見直すときは各社のセキュリティページで再確認する。

## 先生のクラス状況（2026-10-16）
- `/student/quiz/teacher/class?id=` と RPC `quiz_class_dashboard(p_class)`（20261117）。学生ごと（提出した課題数・期限切れの未提出・正答率・最後に解いた日。要フォロー順）、単元ごとの正答率、正答率の低い問題（2人以上が解いた分の下位10問）、課題ごとの提出状況、学生ごとのCSV保存。
- 見える範囲は、これまでと同じ（いまクラスにいる学生の、配った課題の結果だけ）。学生の通常のドリルの記録は見えない。別の先生・学生は呼べない（`quiz_is_teacher()`＋クラスの持ち主を確認。ロールバックするDOブロックで、他の先生は not found、学生は teacher only になることを確認）。
- 入口は、`/student/quiz/teacher` の各クラスの「クラスの状況を見る」。

## 先生向けの入口 `/teachers`（2026-10-16）
- HP（`src/app/page.tsx`）の、学生の項の下の帯・ヘッダー（md以上）・フッターから `/teachers`（大学・専門学校の先生向けの紹介ページ。ログイン不要。`AuthGuard` の `publicPaths`、下のメニューなし、サイトマップに追加）へ。
- ページの内容は、実際にある機能だけ（クラス・課題・クラスの状況）。「先生は理学療法士アカウントで登録 → `/student/quiz/teacher` で申請 → 運営が承認」。解説がAI作成で監修なしであることも書く。
- 文末1〜2文字だけの折り返しは、`text-balance` と `inline-block` のかたまりで防ぐ。

## 先生のアカウント `account_type = 'teacher'`（2026-10-16〜）
- 入口: `/teachers` → `/register?type=teacher`（種類の選択なし。名前・所属（必須）・担当科目（任意）・メール・パスワード）。PTのプロフィール（`pt_profiles`）は作らない。名前は `users.full_name`。
- 登録時: `handle_new_user`（20261118_teacher_accounts）が、`quiz_teacher_requests` に承認待ちの申請を作る（`school` / `teacher_note` は、サインアップのメタデータ）。運営が `/admin` で承認すると、`quiz_teachers` に入り、クラス・課題を作れる。承認までは、先生の画面に「確認中」と出る。
- 使える画面は、`/student/quiz/teacher` 以下だけ（`isTeacherPath`）。PT向けの画面（`isPtOnlyPath`）に入ると、`AuthGuard` が先生の画面へ戻す。下のメニューは出さない。ログアウト・退会は、先生の画面の上の行。ログイン後・ホーム画面アプリの最初の画面も、先生の画面（`landingPathFor`）。
- DB: `quiz_can_use()` に teacher を含めた（課題を作るときの単元・回の一覧に必要。先生も、問題は試せる）。ランキングは学生だけなので影響なし。既存のPTが先生になる道（`quiz_request_teacher`）も、そのまま使える。
- 注意: 先生を増やしたら、`AdminAnalytics` の種類別の集計（PT・学生・一般）には、まだ入っていない。

## 先生のテスト作成（下書き → 調整 → 公開）（2026-10-16〜、20261119_quiz_test_builder.sql）
- `quiz_assignments.status`（draft / published）を追加。これまでの課題は、すべて published。`quiz_create_assignment` で作ると draft になる。学生が使う3つの関数（`quiz_my_assignments` / `quiz_assignment_questions` / `quiz_assignment_answer`）と `quiz_class_dashboard` は、published だけを扱う。
- 先生用の関数（すべて、`quiz_own_assignment` で「自分のクラスの課題か」を確認）: `quiz_teacher_search_questions`（単元・回・難易度・キーワード。正答は返さない）、`quiz_assignment_preview`（正答・解説つき）、`quiz_set_assignment_questions`（追加・削除・並べ替えをまとめて保存。**誰も解答していない課題だけ**。最大50問）、`quiz_set_assignment_meta`（題名・期限）、`quiz_publish_assignment`、`quiz_duplicate_assignment`（下書きとして複製）、`quiz_delete_assignment`（解答のない課題だけ）、`quiz_assignment_statuses`（一覧の下書き表示用。`quiz_list_assignments` の形は変えていない）。
- 画面: `/student/quiz/teacher/test?id=`（作成・調整・公開・複製・削除）。一覧（`/student/quiz/teacher`）の「テストを作る」→ 下書きができ、この画面へ。クラスのカードに「参加用のURLをコピー」（`/student/quiz/classes?code=XXXXXX`。ログイン済みの学生は、コードが入った状態で開く。未ログインだと、トップへ戻されコードは引き継がれない）。
- 仕様書（教員向け国試対策・学習分析）のうち、実装済みは Phase 1 の一部（作成・調整・保存・複製・URL配信（参加用）・回答・自動採点・結果）。配点・選択肢の入れ替え・問題文の編集・解答の公開時刻・QR・PDF・学生×分野のマトリクス・AI復習テストは、未実装。
- 難易度での絞り込みは、画面から外した（2026-10-16。今後実装予定）。国試本番の問題別の正答率は公表されていない（`リサーチ/2026-10-16_国試の問題ごとの難易度データの有無.md`）。DBの `quiz_pool` の難易度（Re:lightの利用者の正答率）は残してあるが、画面は「指定しない」固定。
- クラスの課題の結果の画面（`/student/quiz/play?assignment=`）: 「間違えた問題」の問題文をタップすると、その場で開き（`ReviewPanel`）、選択肢・自分の選択・正答・解説が見える（正答・解説は、開いたときに `quiz_reveal` で読む）。通常のドリルの結果の画面は、これまでどおり、その問題の画面（正答・解説つき）に戻る。
- 先生の課題の結果（`/student/quiz/teacher/assignment?id=`）: 「学生ごと／問題ごと／分野ごと／学生×分野」を切り替えて見る（20261120_quiz_assignment_matrix.sql の `quiz_assignment_matrix` ＝ 学生×問題の正誤＋問題の分野。呼べるのは、自分のクラスの課題の先生だけ）。問題ごとは、分野で絞り込み・正答率の低い順。分野ごとの「この分野の問題を見る」で問題ごとへ移る。学生×分野は、50%未満に ▼ と赤、80%以上に緑（色だけに頼らず、数字と記号も出す）。分野の名前は `quiz_units`。

## 下のメニューを固定する: 本文だけをスクロールさせる（2026-10-16）
- iPhoneのホーム画面アプリで、一番上・一番下まで行ってさらに引っ張ると、画面全体が弾み、下のメニューも本文といっしょに動いてしまっていた（`sticky` / `fixed` / `visualViewport` の補正では、止まらなかった）。
- 対策: 下のメニューを出す画面では、`BottomNavWrapper` が `<html data-shell>` を付ける。`globals.css` の `html[data-shell]` で、画面全体（html・body）はスクロールさせず（高さ100dvh・overflow hidden）、本文（`#main-content`）だけを `overflow-y: auto` でスクロールさせる。メニューは本文の外（flexの下）にあるので、本文が弾んでも動かない。トップ・ログイン・登録・先生の画面・運営は、これまでどおり（data-shellなし）。印刷（`@media print`）では解除する。
- 注意: この画面では `window.scrollTo` / `window.scrollY` が効かない。画面を一番上へ戻すときは `scrollPageToTop()`（`src/lib/scroll.ts`）を使う。スクロール位置を読む処理を足すときも、`#main-content` を見る。

## 先生の画面を、下のメニューで分ける（2026-10-16）
- 先生（`account_type = 'teacher'`、および、先生に承認されたPT）の画面は、下のメニュー5つ: **ホーム**（`/student/quiz/teacher`。状況・下書き・まだ終わっていないテスト・近道）／**テスト**（`/tests`。作成・一覧。テストの作成画面 `/test`・課題の結果 `/assignment` も、このメニューの中）／**分析**（`/analysis`。クラスの状況。クラスは切り替え。`/class?id=` は直接リンク用）／**クラス**（`/classes`。作成・参加コード・URL・閉じる）／**アカウント**（`/account`。名前・状態・ログアウト・退会）。
- 下のメニューは `BottomNavWrapper` の `TEACHER_MENUS`（`/student/quiz/teacher` 以下を開いているとき、または teacher アカウントのとき）。アイコンは `NavIcons`（href をキーにしている）。
- 共通部品: `components/teacher/TeacherPage`（枠・先生の承認の確認＝申請の案内。`gated={false}` で承認の確認なし）／`useTeacherData`（クラスと、全クラスのテスト）／`NewTestForm`／`ClassDashboardView`。
