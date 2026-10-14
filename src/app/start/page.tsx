import StandaloneRedirect from "@/components/StandaloneRedirect";

// ホーム画面のアイコンから開いたときの入口。ログイン状態を見て、最初の画面かログイン画面へ送る
export default function StartPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-[#041129] text-sm text-white/70">
      <StandaloneRedirect always />
      読み込み中…
    </main>
  );
}
