#!/bin/bash
# 生成が終わったら、検証して、通ったときだけ、公開する（commit と push）
cd "$(dirname "$0")/.."
while pgrep -f "scripts/guide-gen.py|scripts/guide-retry.sh" >/dev/null; do sleep 60; done
node scripts/build-guides.mjs >> /tmp/guide-publish.log 2>&1
if npm run verify 2>&1 | tee -a /tmp/guide-publish.log | grep -q "すべて成功" && ! grep -q "SKIP" <(tail -20 /tmp/guide-publish.log); then
  n=$(ls src/content/guides/data | wc -l)
  git add src/content/guides/data src/content/guides/generated.ts scripts/guide-gen.py scripts/guide-topics.tsv scripts/guide-publish.sh
  git commit -q -m "情報ガイドを追加(自動生成・出典つき・資料と突き合わせ済み): 計${n}本

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>" && git push -q origin main && echo "公開 ${n}本" >> /tmp/guide-publish.log
else
  echo "検証が通らなかったため、公開していません" >> /tmp/guide-publish.log
fi
