import Link from "next/link";

// 論文検索サイトの、共通の枠（ヘッダー・フッター）。Re:lightの「入口」であることは、小さく示す
const REGISTER = "/register?type=pt&utm_source=paper-site&utm_medium=web&utm_campaign=paper-search";

export default function PaperSiteFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f6fbfc] text-gray-900">
      <header className="sticky top-0 z-30 border-b border-[var(--lp-g100,#e0f2f4)] bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between gap-3 px-5">
          <Link href="/paper-search" className="text-base font-bold tracking-tight text-gray-900">
            理学療法の論文検索
          </Link>
          <nav className="flex items-center gap-3 text-sm" aria-label="メイン">
            <Link href="/paper-search/topics" className="hidden text-gray-600 hover:text-gray-900 sm:inline">
              テーマから探す
            </Link>
            <Link href={REGISTER} className="rounded-full bg-relight-gradient px-4 py-2 text-xs font-bold">
              Re:lightを無料で使う
            </Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-gray-200 bg-white px-5 py-8 text-center text-xs leading-6 text-gray-600">
        <p>
          このサイトは、理学療法士・理学療法学生のための無料アプリ
          <Link href="/" className="mx-1 font-bold underline">Re:light</Link>
          の、論文検索の入口です。
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-4">
          <Link href="/paper-search/topics">テーマから探す</Link>
          <Link href="/evidence-levels">エビデンスレベル早見表</Link>
          <Link href="/columns">コラム</Link>
          <Link href="/privacy">プライバシーポリシー</Link>
          <Link href="/terms">利用規約</Link>
        </div>
        <p className="mt-3">検索語は、検索のために、外部の論文サイトと、翻訳のサービスに送られます。個人情報や、患者さんが特定される情報は、入れないでください。</p>
      </footer>
    </div>
  );
}

export { REGISTER as PAPER_SITE_REGISTER };
