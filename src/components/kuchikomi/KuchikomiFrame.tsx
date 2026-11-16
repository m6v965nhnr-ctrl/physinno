import PaperSiteFrame from "@/components/paper-search/PaperSiteFrame";
import { KUCHIKOMI_SITE } from "@/lib/kuchikomi";

// 職場口コミサイトの共通の枠（ヘッダー・フッター）。論文検索などの入口サイトと同じ作り
export default function KuchikomiFrame({ children }: { children: React.ReactNode }) {
  return <PaperSiteFrame site={KUCHIKOMI_SITE}>{children}</PaperSiteFrame>;
}
