import Link from "next/link";
import ReportButton from "@/components/ReportButton";
import { ORG_POST_KIND_LABEL, mediaUrl, type OrgPost } from "@/lib/orgPosts";

const day = (s: string) => new Date(s).toLocaleDateString("ja-JP");

// 施設の投稿1件。写真は拡大せずに並べ、動画は再生ボタンつき（読み込みは、再生するときだけ）
export default function OrgPostCard({ post, showOrg = true, reportable = false }: { post: OrgPost; showOrg?: boolean; reportable?: boolean }) {
  return (
    <article className="rounded-2xl border border-gray-100 bg-white p-4">
      <div className="flex items-center gap-2">
        {showOrg && <span className="min-w-0 truncate text-sm font-semibold text-gray-900">{post.org_name}</span>}
        <span className="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-600">{ORG_POST_KIND_LABEL[post.kind]}</span>
        <span className="ml-auto shrink-0 text-[11px] text-gray-400">{day(post.created_at)}</span>
      </div>
      <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-800">{post.body}</p>
      {post.media.length > 0 && (
        <div className={`mt-3 grid gap-1.5 ${post.media.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
          {post.media.map((m) =>
            m.type === "image" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={m.path} src={mediaUrl(m.path)} alt="" loading="lazy" className="aspect-[4/3] w-full rounded-xl bg-gray-100 object-cover" />
            ) : (
              <video key={m.path} src={mediaUrl(m.path)} controls preload="none" playsInline className="aspect-[4/3] w-full rounded-xl bg-black object-contain" />
            )
          )}
        </div>
      )}
      {post.job_id && (
        <Link href={`/jobs/${post.job_id}`} className="mt-3 block rounded-full border border-gray-300 py-2 text-center text-xs font-semibold text-gray-800">この求人を見る</Link>
      )}
      {reportable && (
        <div className="mt-2 text-right"><ReportButton targetType="org_post" targetId={post.id} /></div>
      )}
    </article>
  );
}
