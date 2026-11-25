# 臓器・仕組みカード Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:executing-plans（このセッションで実行）。

**Goal:** 一問一答の解説に出た臓器・部位名を、図つきカードでタップして確かめられるようにする。
**Architecture:** 検査カード（`src/content/tests`）と同じ構成を `organs` で複製する。JSON → `scripts/build-organs.mjs` で検証 → `generated.ts` → 一致判定 `organMatch.ts` → チップ `OrganLookup.tsx` と個別ページ。図は `public/organs/<slug>.svg`（自作SVG）。
**Tech Stack:** Next.js App Router、既存の検査カード一式。
**Spec:** `docs/superpowers/specs/2026-11-25-organ-cards-design.md`

## Global Constraints
- 本文の各記述（Claim）は、出典番号 `s` を持つ。確認できない記述は載せない。
- 出典は https の url、確認日 `checked`（`2026-11-\d\d`）つき。`kind` は 学会／公的／教科書(OpenStax等)／その他。
- 図は「模式図」と図の下に明記。ラベルは日本語（日本解剖学会の用語）。
- ページは事前生成: `dynamicParams=false` と `generateStaticParams`（全slug）。
- 公開コラムのパスは `account.ts` の `PUBLIC_COLUMN_PATH` に `organs` を足す。
- 変更後は `npm run verify`、push 後は `npm run deploy:check`。

## Review Focus
- 「胃」「肺」など1文字の語が、無関係な語（例: 「胃」が別の語の一部）で誤ってチップを出す → 1文字の語は、前後が漢字でないときだけ一致させる。
- 図のSVGがダークモードで読めない → 図は白い背景つきの `<img>`、色は固定。
- 部位名（噴門）と臓器名（胃）の両方が出たとき、カードが重複する → slug で重複を除く。
- 図が無いカードでも壊れない → `figures` が空ならば図の欄を出さない。

---

### Task 1: データ形式・検証・一致判定・チップ・ページ（基盤）
**Files:**
- Create: `src/content/organs/types.ts`、`scripts/build-organs.mjs`、`src/lib/organMatch.ts`、`src/components/student/OrganLookup.tsx`、`src/components/columns/OrganPage.tsx`、`src/app/columns/organs/page.tsx`、`src/app/columns/organs/[slug]/page.tsx`、`src/lib/organMatch.test.mts`（`scripts/*.test.mts` の形式に合わせる）
- Modify: `src/lib/account.ts`（正規表現に organs）、`src/app/sitemap.ts`、`package.json`（prebuild・scripts）、`scripts/verify.mjs`、`scripts/e2e.mjs`、`src/app/student/quiz/play/page.tsx`（`OrganLookup` を `TestLookup` の下に2か所）、`src/app/columns/page.tsx`（一覧への入口）

**Interfaces:**
- Produces: `type Claim = { t: string; s: number[] }`
- Produces: `type OrganCard = { slug; name; reading; system: string; aliases: string[]; summary: Claim; location: Claim[]; structure: Claim[]; function: Claim[]; mechanism: Claim[]; examPoints: { t: string; q: string[]; s: number[] }[]; diseases: string[]; tests: string[]; related: string[]; figures: { src: string; alt: string; caption: string }[]; sources: { n; title; org; url; checked; kind }[]; checkedOn: string; review: "ai" | "human" }`
- Produces: `export const ORGANS: OrganCard[]`（`src/content/organs/generated.ts`）、`export function findOrgans(text: string): OrganCard[]`

- [ ] **Step 1: テスト** `organMatch.test.mts`: 「噴門と幽門」→ stomach 1件（重複なし）／「胃潰瘍」→ stomach／「前胃部」のような漢字に挟まれた1文字語は一致しない／ASCII略称は英数字に挟まれたら一致しない。
- [ ] **Step 2: 失敗を確認** `node --test`（既存の `*.test.mts` の実行方法に合わせる）。
- [ ] **Step 3: 実装** `build-organs.mjs`: slug=ファイル名、name・system 必須、`summary.t` と各 Claim に `s` が1つ以上で `sources` の n に存在、sources は https・checked 形式、`figures[].src` のファイルが `public/` に存在、問題IDの形式、slug重複を検査し `generated.ts` を書く。`findOrgans`: `testMatch.ts` の方式（語 = 名前＋かっこ内＋aliases、長い語優先、ASCII境界）＋1文字語は前後が漢字でないとき。
- [ ] **Step 4: UI** `OrganLookup`: 見出し「出てきた臓器・仕組みを確かめる」、チップ最大4、タップで図（`<img>`、白背景・枠・`loading=lazy`）と summary・location の先頭を表示、個別ページへのリンク。`OrganPage`: 図、場所、構造、働き、仕組み、国試で問われる点（過去問へのリンク）、関係する疾患・検査・筋骨へのリンク、出典一覧、JSON-LD（TestPage に合わせる）。
- [ ] **Step 5: 配線** 上記 Modify の各ファイル。
- [ ] **Step 6: 検証** `npm run verify` が通る。

### Task 2: 試作3枚（胃・心臓・脊髄）
**Files:** Create: `src/content/organs/data/{stomach,heart,spinal-cord}.json`、`public/organs/{stomach,heart,spinal-cord-*}.svg`
- [ ] 各カードを、出典の本文で確認した記述だけで作る（胃は見本の図を `public/organs/stomach.svg` に）。
- [ ] 別のAIが出典と照合し、直す。
- [ ] `npm run verify` → コミット → push → `npm run deploy:check -- /columns/organs /columns/organs/stomach`。

### Task 3: 量産（系統ごと）
出題数の多い順に、神経 → 呼吸 → 循環 → 消化 → 腎・泌尿 → 内分泌 → 感覚 → 生殖。各系統で: 項目一覧 → 担当（サブエージェント）がカードと図を作成 → 別の担当が出典・図を照合 → `npm run verify` → 公開。
- [ ] 系統ごとに、上記を繰り返す。
- [ ] 最後に、問題文での拾える率をSQLで測る（検査カードと同じ方法）。
