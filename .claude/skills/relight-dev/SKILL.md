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

- **新しい表の書き込みは、最初から権限が無い**（2026-10-18〜 `alter default privileges`）。ポリシーを作ったら、`grant insert, update, delete on public.<表> to authenticated;`（必要な操作だけ。列を絞れるなら列で）を、同じ移行ファイルに書く。先生・クラス・結果など、他人の情報を見る関数は、`quiz_is_teacher()` か `quiz_own_assignment()` で確認し、**見たことを `quiz_audit_view` で記録**する（`stable` にしない）。
- 権限の確認は、`node scripts/security-check.mjs`（匿名で、見えてはいけないものが見えないか）も使う。新しい先生用・運営用の関数を足したら、その関数を、このスクリプトの一覧に足す。

## 2.5 共通の部品（新しく作る前に、まず使う）
- 確認ダイアログ: `askConfirm()`（`src/lib/confirm.ts`）。ブラウザ標準の `confirm()` は使わない。`if (!(await askConfirm("…"))) return;`
- 通知: `notify()`（`src/lib/notify.ts`）。「元に戻す」は第3引数 `{ label, onAction }`。
- 読み込み中・空・失敗: `LoadingScreen` / `EmptyState` / `ErrorState`（`src/components/states.tsx`）。エラー画面・404 は `src/app/error.tsx` `not-found.tsx`。
- 検索の入力欄・ボタン・チップ: `src/lib/ui.ts`（`INPUT_CLASS` `PRIMARY_BUTTON_CLASS` `chipClass`）。
- 入力欄には、名前（`<label>` か `aria-label`）を付ける。アイコンだけのボタンにも `aria-label`。
- 通知（notifications）をブラウザから直接作れるのは follow / endorsement / group系だけ。ほかはRPC・トリガー経由（RLSで制限済み）。
- 病院テーブル(`hospitals`)は `select("*")` 禁止。`HOSPITAL_COLUMNS` を使う（作成者・運営者IDは、列の権限で読めない）。列を足したら、grant も足す。
- 退会は `delete_my_account`（`docs/OPERATIONS.md`）。ユーザーに紐づく表を足したら、退会で消えるか（auth.users への外部キーのCASCADEか、この関数への追記）を必ず確認する。
- AIの窓口を足したら、`takeAiQuota` を呼び、上限を `take_ai_quota` に足す。
- ゲストでは呼べないRPC（`authenticated` のみ）を、ゲスト画面から呼ばない（401になる）。先に `getSession()` で確認する。

## 3. 公開範囲（ログインなしで見える画面）
- ゲスト閲覧は `src/lib/account.ts` の `isPublicGuestPath` と `AuthGuard.tsx` の公開パスで決まる。新しい画面を公開する／しないは、ここを必ず確認。
- PT専用は `PT_ONLY_PATH_PREFIXES`。学生もPTの公開投稿は読める。

## 4. 変更後の確認（この順で）
0. まとめて: **`npm run verify`**（型・ビルド・e2eを、結果だけ数行で出す。失敗したときだけ、エラーの行が出る）。以下は、個別に確かめたいとき。
1. `npx tsc --noEmit`（型エラー 0）
2. `npm run build`（Vercel と同じビルド。通らなければ push しない）
3. `npx eslint --quiet`（既知の 2 件は `PaperSearch.tsx` の `react-hooks/immutability`。**増やさない**）
4. 画面を変えたときは、`preview_start`（.claude/launch.json）で実際に開いて確認。ログインが要る画面は、ゲストで見える範囲＋DBテストで確認し、見られなかった範囲を報告で正直に書く。
5. 画面の自動テスト: `npm run dev` を起動して `npm run e2e`（公開ページ13画面が、真っ白・エラー画面・コンソールエラーなしで開く。Chrome を使う）。ログイン後の画面も見るときは、テスト用アカウントを環境変数 `E2E_EMAIL` / `E2E_PASSWORD` で渡す（コードにもチャットにも書かない。本物のユーザーのパスワードは使わない）。
6. デプロイ後: **`npm run deploy:check`**（本番が今のコミットになるまで待ち、主要7ページが200か確認。追加のパスは `-- /path`）。詳しくは `node scripts/smoke.mjs` と `node scripts/e2e.mjs https://relight-1wet.vercel.app`。

## 5. 公開（毎回、確認を待たずに行う）
- 変更ごとに commit → `main` に push → Vercel のデプロイが READY になるまで確認（Vercel MCP の `list_deployments`。プロジェクト `prj_PGCaWITBK4kxS7ar1xVzbP8mFiS7`）。
- コミットメッセージは日本語で、何を・なぜ変えたか。末尾に `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`。
- 生成物（`graphify-out/`、`_flyer/`、`_sns*/`、`_reels/`）は、アプリのコミットに混ぜない。

## 6. 報告の書き方
- やったこと・確認できたこと・**確認できていないこと**を分けて書く。やさしい日本語で、結論から。

## 7. 公開の入口ページ（検索から来る人向け）
- 公開パスは `src/lib/account.ts` の `PUBLIC_PAPER_SITE_PATH` に足す（/paper-search・/certified-pt・/hospital-areas・/job-hunting）。足したら、`sitemap.ts`・`robots.ts`・`scripts/e2e.mjs`・共通フッター（`PaperSiteFrame.tsx`）・HPのフッター・`public/llms.txt` も揃える。
- 構造化データ（JSON-LD）は、`ldJson()`（`src/lib/jsonLd.ts`）で出す。配列のまま `JSON.stringify` しない（アプリ内ブラウザでエラーになる）。
- アクセス集計（Vercel Web Analytics）は、`src/lib/analyticsFilter.ts` の許可パスだけ。個人に結びつく画面を足さない。仕組みを変えたら、プライバシーポリシーとHPの記載も直す。
- 記事ページには、回数制限を付けない（検索流入が消える）。制限は、検索などの操作だけ（`src/lib/freeUsage.ts`）。
- 数字・制度・規約は、公式で確かめ、ページに確認日・出典を書く。確認できないものは載せない。

## 8. 外部サービス・環境の落とし穴
- Vercel MCP: `teamId` を付けると権限エラーになる呼び出しが多い。付けずに呼ぶ（`list_deployments`・`get_project`・`filter_project_envs` など）。ランタイムログは権限で読めないことがある。Web Analyticsの有効化・プロジェクト削除は、ユーザーのダッシュボード操作。
- Supabase MCP: `apply_migration`・本番DBの書き込みは、依頼の範囲を明確にしてから。削除系のツールは無い（プロジェクト削除はユーザー）。
- 大きなデータの取り込みは、`pg_net`（CLAUDE.md の「作業の効率」）。DBの `http` 拡張は入っていない。
- ブラウザ操作: `read_page` が空のときは、`javascript_tool` で、要素を探す。開発サーバーの表示がおかしいときは、`preview_stop` → `preview_start` で、再起動する（古いホットリロードの状態が、偽のエラーを出す）。
