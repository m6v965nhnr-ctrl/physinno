import { ogCard, OG_SIZE } from "@/lib/server/ogCard";

export const alt = "理学療法の論文検索｜日本語で8サイトまとめて・無料";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ badge: "無料・登録なし", title: "理学療法の論文検索", sub: "日本語で、8サイトをまとめて" });
}
