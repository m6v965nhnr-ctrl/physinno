import PaperSiteFrame from "@/components/paper-search/PaperSiteFrame";
import KuchikomiHeaderActions from "@/components/kuchikomi/KuchikomiHeaderActions";
import { KUCHIKOMI_SITE } from "@/lib/kuchikomi";

// 職場口コミサイトの共通の枠（ヘッダー・フッター）。Re:lightの画面へは移らず、このサイトの中で完結させる
export default function KuchikomiFrame({ children }: { children: React.ReactNode }) {
  return <PaperSiteFrame site={{ ...KUCHIKOMI_SITE, actions: <KuchikomiHeaderActions /> }}>{children}</PaperSiteFrame>;
}
