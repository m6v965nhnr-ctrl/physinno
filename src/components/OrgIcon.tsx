import Link from "next/link";
import type { Org } from "@/lib/recruit";

// 組織のロゴ(無ければ🏥)。職場ページ(hospitals)とひもづいていればそこへ、
// 無ければ、呼び出し側が渡すfallbackHref(求人詳細など)へ飛べるようにする。
// どちらも無ければ、タップできないアイコンとして出す
export function OrgIcon({
  org,
  fallbackHref,
  size = 40,
}: {
  org: Pick<Org, "name" | "logo_url" | "hospital_id"> | null | undefined;
  fallbackHref?: string;
  size?: number;
}) {
  const icon = (
    <div
      className="flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100 text-lg"
      style={{ width: size, height: size }}
    >
      {org?.logo_url ? <img src={org.logo_url} alt="" className="h-full w-full object-cover" /> : "🏥"}
    </div>
  );
  const href = org?.hospital_id ? `/hospitals/${org.hospital_id}` : fallbackHref;
  if (!href) return icon;
  return (
    <Link href={href} className="shrink-0" aria-label={org?.name ? `${org.name}のページを見る` : "組織のページを見る"}>
      {icon}
    </Link>
  );
}
