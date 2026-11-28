# リハ職の本音を、単体のサイトとして完結させる

**Goal:** 登録から口コミを読む・書くまで、`/kuchikomi/*` の中だけで済む。アカウントとデータは Re:light と共通。

**承認された内容（2026-11-29）:** トップ→「口コミを書く」→説明（今のまま）→本音の会員登録→経験年数（勤務先は聞かない）→職場を探す→投稿。以後も本音の中。

**Global Constraints:** DB は変えない。経験年数は、認証のユーザー情報 `rehab_experience_years`（1〜30）に保存し、口コミには表示しない（施設・職種と合わせると本人が分かるおそれ）。表示名は「リハ職としての経験年数（これまでの職場の合計）」。Re:light の画面の動きは変えない。

**Review Focus:** 戻り先がログイン・登録画面で堂々めぐりしない / 施設を決めて来た人はその施設へ戻る / OT・ST も保存できる / 古いリンク `/register?from=kuchikomi` が生きる / ログイン中と未ログインでヘッダーが正しい。

## Tasks
- [ ] 1. 画面: `src/app/kuchikomi/{register,welcome,login,forgot-password,mypage,mypage/delete}/page.tsx`（フォームは `src/components/kuchikomi/`）。パスワード再設定と退会は、既存の画面を部品にして共用。
- [ ] 2. ヘッダー・フッター: `PaperSiteFrame` の `Site` に `actions`・`footerLinks`。未ログイン=ログイン+口コミを書く、ログイン中=マイページ+口コミを書く。
- [ ] 3. リンク: `KUCHIKOMI_REGISTER`→`/kuchikomi/register`。口コミサイト内の `/login`→`/kuchikomi/login`。施設ページ（kuchikomi版）の PT プロフィール・都道府県一覧・採用担当リンクは出さない/文字だけ。`/register?from=kuchikomi` は転送し、専用の分岐は削除。`safeReturnPath` は本音の認証画面も除外。
- [ ] 4. 確認: `npm run verify`、画面を実際に開く、`npm run deploy:check`。

**残る範囲:** パスワード再設定メールのリンク先（`/reset-password`）は Re:light の画面のまま（メールの許可URLは確認していないので変えない）。
