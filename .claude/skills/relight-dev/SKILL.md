---
name: relight-dev
description: Re:light（physinno）のコードを変更するとき（画面・API・DB・UI・デプロイ）に使う。既存の機能を壊さないための約束事、変更前後の確認手順、デプロイの流れ。
---

# Re:light の開発手順（既存を壊さない）

## 0. 変更前に、影響範囲を調べる
- `graphify-out/GRAPH_REPORT.md` があれば先に見る（機能ごとのつながり・よく使われる部品）。質問は `graphify query "…"`。ファイルを大きく足し引きしたあとは `graphify update .` で更新する。
- 触る部品が、ほかのどこから使われているか `grep` で確認する（特に `src/lib/*`、`src/components/*`、RPC名）。
- 大枠の設計は `docs/ARCHITECTURE.md`。該当の節を読んでから触る。

## 1. 守る約束（ユーザーの指示）
- **画面の構成・大枠は変えない**。文字サイズは、検索（/pts）以外は変えない。
- 色は `src/app/globals.css` のトークン（brand-*, gray-*）を使う。`!important` で個別に上書きしない。`a`・見出し・ボタンの基本色は `@layer base`。
- 医療情報（臨床アイデアなど）は断定しない。参考資料の明記と、PT確認前の注意書きを崩さない。AIに入れる患者情報は選択式・数値のみ（自由記述を足さない）。
- 患者情報・個人情報は、外部サービス（NotebookLM など）に送らない。パスワード・鍵は、画面にもチャットにも出さない。
- 調べ物・分析の結果は、`リサーチ/日付_テーマ.md` に、出典つきで保存する（Git管理外）。

## 2. データベース（Supabase 東京 `lfpbrdwfzxdmdayudxxn`）
- 変更は `supabase/migrations/` にファイルで残し、同じ内容を本番に適用する。**既存の列・関数の削除や型変更は、先にユーザーに確認**。
- RLS は必ず有効。SECURITY DEFINER の関数は `set search_path = ''`、`revoke ... from public` のうえで、必要な role にだけ grant。
- 権限の確認は、`begin; set local role …; select set_config('request.jwt.claims', …); … rollback;` で、anon / 別ユーザーから見えないことをテストする。
- 匿名の投稿・質問・意見は、投稿者の情報をサーバーから返さない（RPC で出し分け）。

## 2.5 共通の部品（新しく作る前に、まず使う）
- 確認ダイアログ: `askConfirm()`（`src/lib/confirm.ts`）。ブラウザ標準の `confirm()` は使わない。`if (!(await askConfirm("…"))) return;`
- 通知: `notify()`（`src/lib/notify.ts`）。「元に戻す」は第3引数 `{ label, onAction }`。
- 読み込み中・空・失敗: `LoadingScreen` / `EmptyState` / `ErrorState`（`src/components/states.tsx`）。エラー画面・404 は `src/app/error.tsx` `not-found.tsx`。
- 検索の入力欄・ボタン・チップ: `src/lib/ui.ts`（`INPUT_CLASS` `PRIMARY_BUTTON_CLASS` `chipClass`）。
- 入力欄には、名前（`<label>` か `aria-label`）を付ける。アイコンだけのボタンにも `aria-label`。
- 通知（notifications）をブラウザから直接作れるのは follow / endorsement / group系だけ。ほかはRPC・トリガー経由（RLSで制限済み）。
- ゲストでは呼べないRPC（`authenticated` のみ）を、ゲスト画面から呼ばない（401になる）。先に `getSession()` で確認する。

## 3. 公開範囲（ログインなしで見える画面）
- ゲスト閲覧は `src/lib/account.ts` の `isPublicGuestPath` と `AuthGuard.tsx` の公開パスで決まる。新しい画面を公開する／しないは、ここを必ず確認。
- PT専用は `PT_ONLY_PATH_PREFIXES`。学生もPTの公開投稿は読める。

## 4. 変更後の確認（この順で）
1. `npx tsc --noEmit`（型エラー 0）
2. `npm run build`（Vercel と同じビルド。通らなければ push しない）
3. `npx eslint --quiet`（既知の 2 件は `PaperSearch.tsx` の `react-hooks/immutability`。**増やさない**）
4. 画面を変えたときは、`preview_start`（.claude/launch.json）で実際に開いて確認。ログインが要る画面は、ゲストで見える範囲＋DBテストで確認し、見られなかった範囲を報告で正直に書く。
5. 画面の自動テスト: `npm run dev` を起動して `npm run e2e`（公開ページ13画面が、真っ白・エラー画面・コンソールエラーなしで開く。Chrome を使う）。ログイン後の画面も見るときは、テスト用アカウントを環境変数 `E2E_EMAIL` / `E2E_PASSWORD` で渡す（コードにもチャットにも書かない。本物のユーザーのパスワードは使わない）。
6. デプロイ後: `node scripts/smoke.mjs` と `node scripts/e2e.mjs https://relight-1wet.vercel.app`。

## 5. 公開（毎回、確認を待たずに行う）
- 変更ごとに commit → `main` に push → Vercel のデプロイが READY になるまで確認（Vercel MCP の `list_deployments`。プロジェクト `prj_PGCaWITBK4kxS7ar1xVzbP8mFiS7`）。
- コミットメッセージは日本語で、何を・なぜ変えたか。末尾に `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`。
- 生成物（`graphify-out/`、`_flyer/`、`_sns*/`、`_reels/`）は、アプリのコミットに混ぜない。

## 6. 報告の書き方
- やったこと・確認できたこと・**確認できていないこと**を分けて書く。やさしい日本語で、結論から。
