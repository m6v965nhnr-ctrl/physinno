# iPhoneアプリ（App Store）

Webアプリ（Vercel）を、Capacitor の枠で包んだもの。画面の中身は、`capacitor.config.ts` の `server.url`（公開中のサイトの `/start`）から読み込む。
そのため、**Webを更新すれば、アプリも、審査なしで最新になる**（アプリの枠そのもの＝アイコン・設定・ネイティブ機能を変えるときだけ、審査が必要）。

## 構成
- `capacitor.config.ts` … 識別子（appId）・アプリ名・読み込む URL
- `cap-www/index.html` … 通信できないときに出る最小の画面（Capacitor が必須とする置き場）
- `ios/App` … Xcode のプロジェクト（アイコン・起動画面・Info.plist）
- アイコン・起動画面の元画像: `public/icons/relight-1024.png`（`ios/App/App/Assets.xcassets/` にコピー済み）

## シミュレーターで動かす
```bash
npx cap sync ios
cd ios/App
xcodebuild -project App.xcodeproj -scheme App -configuration Debug \
  -destination 'platform=iOS Simulator,name=iPhone 17' -derivedDataPath /tmp/relight-ios-build build
xcrun simctl install booted /tmp/relight-ios-build/Build/Products/Debug-iphonesimulator/App.app
xcrun simctl launch booted jp.relight.app
```

## App Store に出す前に、必要なこと（あなたの作業）
1. **Apple Developer Program に登録**（年 約1万6千円。本人確認・支払い）。
2. **識別子（Bundle ID）を決める**。いまは仮の `jp.relight.app`。Apple Developer で登録する識別子に合わせて、`capacitor.config.ts` の `appId` と、Xcode の Bundle Identifier を変える（**App Store Connectに登録したあとは変えられない**）。
3. Xcode で `ios/App/App.xcodeproj` を開き、Signing & Capabilities で自分の Team を選ぶ。
4. App Store Connect で、アプリを新規作成（名前・説明・スクリーンショット・プライバシー情報・年齢制限・サポートURL）。
5. Xcode の Product → Archive → Distribute App で、アップロード → TestFlight で動作確認 → 審査へ提出。

## 審査で見られる点（対応状況）
- アカウント削除: あり（マイページ ⋯ → 退会）
- 通報・ブロック: あり
- プライバシーポリシー・利用規約・問い合わせ: あり（/privacy・/terms・/feedback）
- **ガイドライン 4.2（最小限の機能）**: Webサイトを包んだだけのアプリは、落とされやすい。ネイティブらしい機能（プッシュ通知・Face ID でのログイン・共有など）を、1〜2つ足すと通りやすい。→ 次の作業
- 外部サイトへのリンク（協会のページなど）は、Safari で開く
