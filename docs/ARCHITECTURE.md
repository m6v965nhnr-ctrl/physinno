# Re:light アーキテクチャ

## 全体像
- **フロント/API**: Next.js（App Router）を Vercel にデプロイ。主要画面は Client Component から Supabase を直接呼ぶ。
- **DB/認証/ストレージ**: Supabase（Postgres + RLS）。アクセス制御は RLS が本体。
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

## 病院ページ
- `hospitals`（厚労省 医療情報ネット オープンデータ 2024-12-01 時点のうちリハビリテーション科のある病院 約5,000件＋ユーザー登録。栃木県は元データ自体が少ない）。API の1回あたり取得上限は1,000件なので、一覧系は `.range()` で分割する（`sitemap.ts` 参照）、`hospital_reviews`（6項目の評価）。
- 口コミの投稿者(`user_id`)はクライアントへ返さない。一覧は `get_hospital_reviews` RPC（`is_mine` のみ返す）、テーブルの直接SELECTは本人分のみ。
- 証明写真は非公開バケット `id-photos`（パスは `pt_private.id_photo_path`）。

## 既知の課題
- Semantic Scholar は1秒1リクエストの制限があり、連続検索で結果が空になることがある。
- Supabase の「漏えいパスワード保護」はダッシュボード側の設定（有料プラン）。
