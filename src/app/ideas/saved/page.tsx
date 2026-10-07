"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getTopic } from "@/content/ideas";
import { PtIdea, listIdeas } from "@/lib/ideas";
import PtIdeaCard from "@/components/PtIdeaCard";

// マイ臨床アイデア: 保存したアイデアを、疾患ごとに見返す
export default function SavedIdeasPage() {
  const [ideas, setIdeas] = useState<PtIdea[] | null>(null);

  const load = useCallback(async () => {
    setIdeas(await listIdeas({ savedOnly: true, limit: 100 }));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const groups = useMemo(() => {
    const m = new Map<string, PtIdea[]>();
    for (const i of ideas ?? []) m.set(i.topic_slug, [...(m.get(i.topic_slug) ?? []), i]);
    return [...m.entries()];
  }, [ideas]);

  return (
    <main className="min-h-screen bg-[#fafafa] px-5 py-8 pb-28">
      <div className="mx-auto max-w-2xl">
        <Link href="/pts?mode=ideas" className="text-sm text-gray-400 hover:text-gray-700">
          ← 臨床アイデア
        </Link>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-gray-900">マイ臨床アイデア</h1>
        <p className="mt-1 text-sm text-gray-600">保存したアイデアが、疾患ごとにまとまります。自分だけの「臨床の引き出し」です。</p>

        {ideas === null && <p className="mt-6 text-sm text-gray-400">読み込み中…</p>}
        {ideas?.length === 0 && (
          <p className="mt-6 rounded-2xl bg-white p-5 text-sm leading-6 text-gray-600">
            まだ、保存したアイデアはありません。疾患のページで、気になったアイデアの「🔖 保存」を押すと、ここに集まります。
          </p>
        )}

        {groups.map(([slug, items]) => {
          const topic = getTopic(slug);
          return (
            <section key={slug} className="mt-6">
              <h2 className="text-base font-semibold text-gray-900">
                <Link href={`/ideas/${slug}`} className="underline">
                  {topic?.name ?? slug}
                </Link>
                <span className="ml-2 text-xs font-normal text-gray-500">{items.length}件</span>
              </h2>
              <div className="mt-2 space-y-3">
                {items.map((i) => (
                  <PtIdeaCard key={i.id} idea={i} onChanged={load} searchHint={topic?.searchQuery ?? ""} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
