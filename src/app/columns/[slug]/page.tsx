import Link from "next/link";
import { notFound } from "next/navigation";
import { COLUMNS, getColumnMeta, getGuide } from "@/lib/columns";
import GuideBody from "@/components/GuideBody";
import ColumnShare from "@/components/ColumnShare";
import { COLUMN_BODIES } from "@/content/columns";
import { SITE_NAME } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export default async function ColumnDetailPage({ params }: Props) {
  const { slug } = await params;
  const meta = getColumnMeta(slug);
  const Body = COLUMN_BODIES[slug];
  const guide = getGuide(slug);

  if (!meta || (!Body && !guide)) {
    notFound();
  }

  // 同じ分野の、ほかのガイド（内部リンク。読みつづけてもらうため）
  const related = COLUMNS.filter((c) => c.category === meta.category && c.slug !== slug).slice(0, 6);

  return (
    <main className="min-h-screen bg-[#fafafa] px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/columns"
          className="text-sm text-gray-400 hover:text-gray-700"
        >
          ← コラム一覧
        </Link>

        <div className="mt-6 rounded-3xl border border-gray-100 bg-white p-6 sm:p-10">
          <span className="inline-block rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-relight-blue">
            {meta.category}
          </span>

          <h1 className="mt-4 text-2xl font-bold leading-snug text-gray-900 sm:text-3xl">
            {meta.title}
          </h1>

          <div className="mt-3 flex items-center gap-3 text-xs text-gray-400">
            <span>{SITE_NAME}編集部</span>
            <span>・</span>
            <span>{meta.publishedAt}</span>
          </div>

          <div className="mt-8">
            {Body ? <Body /> : <GuideBody guide={guide!} />}
          </div>
        </div>

        <ColumnShare title={meta.title} path={`/columns/${slug}`} />

        {related.length > 0 && (
          <section className="mt-8" aria-label="同じ分野のガイド">
            <h2 className="text-sm font-semibold text-gray-700">同じ分野のガイド（{meta.category}）</h2>
            <ul className="mt-3 space-y-2">
              {related.map((c) => (
                <li key={c.slug}>
                  <Link href={`/columns/${c.slug}`} className="block rounded-2xl border border-gray-100 bg-white px-4 py-3 text-sm font-medium text-gray-900 transition hover:border-gray-300">{c.title}</Link>
                </li>
              ))}
            </ul>
            <Link href="/columns" className="mt-3 inline-block text-xs text-gray-500 underline">すべてのコラム・ガイドを見る</Link>
          </section>
        )}

        <div className="mt-8 flex items-center justify-between rounded-2xl bg-relight-gradient px-6 py-5 text-white">
          <div>
            <p className="text-sm font-semibold">Re:lightをはじめる</p>
            <p className="mt-0.5 text-xs text-white/90">
              症例共有・研修情報・ポートフォリオ作成が無料で使えます
            </p>
          </div>
          <Link
            href="/register?type=pt"
            className="shrink-0 rounded-full bg-white px-4 py-2 text-xs font-semibold text-gray-900"
          >
            無料ではじめる
          </Link>
        </div>
      </div>
    </main>
  );
}
