#!/bin/bash
# 1回目の生成が終わったら、失敗(error)したテーマだけを、最大3回まで自動で再実行する。終わると、公開スクリプトを動かす
cd "$(dirname "$0")/.."
LOG=/tmp/guide-gen-seq.log
while pgrep -f "scripts/guide-gen.py" >/dev/null; do sleep 60; done
for round in 1 2 3; do
  fails=$(awk -F'\t' '$2 ~ /^error/ {print $1}' $LOG | sort -u)
  todo=""
  for s in $fails; do
    [ -f src/content/guides/data/$s.json ] || [ -f src/content/guides/drafts/$s.json ] || todo="$todo $s"
  done
  [ -z "$todo" ] && break
  echo "再実行 $round: $todo" >> /tmp/guide-publish.log
  sleep 600   # NotebookLMの回数制限が戻るのを待つ
  GUIDE_LOG=$LOG python3 scripts/guide-gen.py $todo >/dev/null 2>&1
done
