#!/bin/bash
# Vercel の ignoreCommand: 終了コード 0 = ビルドしない、1 = ビルドする。
# 説明文(docs/・*.md)だけの変更では、デプロイを作らない（デプロイの保管容量と、ビルドの回数を、無料枠の中に収めるため）。
# 直前のコミットが取れないとき(浅いクローン等)は、必ずビルドする
git rev-parse HEAD^ >/dev/null 2>&1 || exit 1
CHANGED=$(git diff --name-only HEAD^ HEAD | grep -v -E '^(docs/|.*\.md$)')
[ -z "$CHANGED" ] && exit 0
exit 1
