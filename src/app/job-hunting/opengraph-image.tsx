import { ogCard, OG_SIZE } from "@/lib/server/ogCard";

export const alt = "理学療法士の就活ガイド｜病院の選び方・見学・応募の流れ";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ badge: "チェックリストつき", title: "理学療法士の就活ガイド", sub: "病院の選び方・見学・応募の流れ" });
}
