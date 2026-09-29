import Link from "next/link";
import { notFound } from "next/navigation";
import { getColumnMeta } from "@/lib/columns";
import { COLUMN_BODIES } from "@/content/columns";
import { SITE_NAME } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export default async function ColumnDetailPage({ params }: Props) {
  const { slug } = await params;
  const meta = getColumnMeta(slug);
  const Body = COLUMN_BODIES[slug];

  if (!meta || !Body) {
    notFound();
  }

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
            <Body />
          </div>
        </div>

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
