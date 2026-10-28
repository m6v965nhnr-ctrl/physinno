import StandaloneRedirect from "@/components/StandaloneRedirect";

// ホーム画面のアイコンから開いたときの入口。ログイン状態を見て、最初の画面かログイン画面へ送る
// JSの読み込みを待たず、HTMLだけでロゴが出るように(サーバーコンポーネントのまま)
export default function StartPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-3 bg-[#041129] text-sm text-white/70">
      <StandaloneRedirect always />
      <span className="text-2xl font-bold tracking-tight text-white">Re:light</span>
      読み込み中…
    </main>
  );
}
