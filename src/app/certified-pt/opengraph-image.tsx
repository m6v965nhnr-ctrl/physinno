import { ogCard, OG_SIZE } from "@/lib/server/ogCard";

export const alt = "認定理学療法士の取り方｜要件・流れ・費用・更新";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ badge: "公式情報で1ページに", title: "認定理学療法士の取り方", sub: "要件・流れ・費用・更新" });
}
