# Re:light（physinno）作業ルール

## 資料の読み込みは NotebookLM を経由する
- 長い資料、複数の資料、動画、本の読み込みは、NotebookLM（`nlm` コマンド）を経由して処理し、結果は**出典つき**で受け取る。
- 使い方の目安:
  - ノートブックを作る: `nlm notebook create "名前"`
  - ソースを追加する: `nlm source add <notebook-id> --url <URL> --wait`（`--file`、`--youtube` も可）
  - 質問する: `nlm notebook query <notebook-id> "質問"`（回答に出典の番号が付く）
  - 認証の確認: `nlm login --check`（切れていたら `nlm login --storage protected`。Googleへのログインは本人が行う）
- NotebookLM に入れた資料は Google に送られる。患者さんの情報・個人情報・機密情報は入れない。

## 調べ物・分析の結果は、毎回「リサーチ」フォルダに保存する
- 調べ物や分析をしたら、頼まれなくても毎回、結果を `リサーチ/` に、**日付＋テーマ名**のファイル（例: `リサーチ/2026-10-06_NotebookLM連携テスト.md`）として保存する。
- 出典（URL・資料名）と、調べた日を書く。
- `リサーチ/` は Git の管理に入れない（`.gitignore` で除外）。

## コードを変更するときは、`relight-dev` スキルの手順に従う
- 場所: `.claude/skills/relight-dev/SKILL.md`（既存の機能を壊さないための約束・変更前後の確認・公開の流れ）。
- 変更前に `graphify-out/GRAPH_REPORT.md` で影響範囲を確認し、変更後は `npm run check`（型チェック＋ビルド）を通してから push する。

## 作業の効率（トークンを無駄にしない）
- **よく使うID**: 本番URL `https://relight-1wet.vercel.app` ／ Vercel プロジェクト `prj_PGCaWITBK4kxS7ar1xVzbP8mFiS7`（`teamId` は付けない。付けると権限エラー）／ Supabase 東京 `lfpbrdwfzxdmdayudxxn`。
- **確認は短い出力で**: 変更後は `npm run verify`（型・ビルド・e2eを、結果だけ数行で）、push後は `npm run deploy:check`（本番が今のコミットになるまで待ち、主要ページを確認）。`npm run check` や `e2e` の全出力を、そのまま読まない。
- **大きなファイルは、丸ごと読まない**: `docs/ARCHITECTURE.md`（約60KB）は、`grep -n '^## ' docs/ARCHITECTURE.md` で節を探し、該当の節だけ `sed -n` で読む。長いPDF・CSVは、`pdftotext`・`head`・`grep`で、必要な所だけ。
- **画面の確認**: 文字は `get_page_text`・`find`・`javascript_tool` を先に。スクリーンショットは、見た目を見るときだけ、`scale 0.5〜0.6`。
- **大きなデータをDBに入れるとき**: SQLに貼らない。ファイルを `public/_tmp/` に一時的に置いて公開 → DBの `pg_net`（`net.http_get`）で取りに行って `insert` → 取り込み後にファイルを削除（手順は `docs/ARCHITECTURE.md` の「病院データの更新手順」）。
- **ツールの読み込みは、まとめて**: 後から出るツールは、`ToolSearch` で、使うものを1回でまとめて読み込む。
- **削除・停止の前の確認（必ず）**: データベースだけでなく、**ファイルの保管庫・関数・環境変数・コードからの参照・直近の使用状況**を見る。消すのは、ユーザーの確認後（Supabase・Vercelの削除は、ユーザーの操作）。
- **止められやすい操作**: 認証の一括変更、本番DBの変更、外部への送信は、依頼の範囲を、はっきり確認してから進める。止められたら、回避せず、理由を伝えて判断を仰ぐ。
- **数字・規約・制度は、公式で確かめ、確認日と出典をページ・リサーチに残す**。確認できなかったものは、載せない。
