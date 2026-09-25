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

## 既知の課題
- レビューの `user_id` は API から読める（画面上の「匿名」は表示のみ）。厳密な匿名化にはビューまたは列権限の見直しが必要。
- 画面は Client Component 中心で、マウント時に取得する実装（lint は `set-state-in-effect` を warn にしている）。Server Components / SWR への移行余地あり。
- 一部の士会サイトは会員専用・自動アクセス拒否のため取得できない。

## UI 方針（Web Interface Guidelines 準拠）
- 通知は `alert()` ではなく `notify()`（`src/lib/notify.ts`）＋ `Toaster`（`aria-live`）。エラー文言は自動で赤表示。
- フォーカスは `:focus-visible` で常に可視化。スキップリンク・`viewport-fit=cover`・`safe-area`（下部ナビ）に対応。
- 入力欄は `label`/`aria-label` に関連付け、ログイン・登録は `autocomplete` を指定。スマホでは入力欄を16px以上にして拡大を防ぐ。
- 削除操作は確認ダイアログ。モーダルは `role="dialog"` と `overscroll-contain`。
- `globals.css` の `!important` による色の上書きは、Tailwind の `hover:` などを打ち消すため、追加しない（文字色の継承を全要素に強制するルールは撤去済み）。
