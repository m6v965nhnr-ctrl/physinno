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
