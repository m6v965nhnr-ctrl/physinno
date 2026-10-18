import { ogCard, OG_SIZE } from "@/lib/server/ogCard";

export const alt = "全国の病院を都道府県から探す｜理学療法士・学生向け";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ badge: "約5,300病院", title: "病院を都道府県から探す", sub: "実習先・就職先の候補に" });
}
