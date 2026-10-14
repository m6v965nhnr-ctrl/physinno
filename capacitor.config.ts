import type { CapacitorConfig } from "@capacitor/cli";

// iPhoneアプリ（App Store用）の設定。画面の中身は、公開中のWebアプリ（Vercel）をそのまま読み込む。
// そのため、Webを更新すれば、アプリも、審査なしで最新になる（アプリの枠そのものを変えるときだけ、審査が必要）。
// appId はApp Store Connectで登録する識別子。最初の提出の前に、Apple Developerで決めたものに変える（提出後は変えられない）
const config: CapacitorConfig = {
  appId: "jp.relight.app",
  appName: "Re:light",
  webDir: "cap-www",
  server: {
    url: "https://relight-1wet.vercel.app/start",
    cleartext: false,
  },
  ios: {
    contentInset: "never",
    backgroundColor: "#041129",
  },
};

export default config;
