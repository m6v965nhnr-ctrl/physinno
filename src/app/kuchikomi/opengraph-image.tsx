import { ogCard, OG_SIZE } from "@/lib/server/ogCard";

export const alt = "リハ職の本音｜理学療法士・作業療法士・言語聴覚士の職場口コミ";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ badge: "PT・OT・STの職場口コミ", title: "リハ職の本音", sub: "教育・残業・給与・人間関係を、現場の声で" });
}
