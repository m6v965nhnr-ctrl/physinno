"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { getMyAccountType, type AccountType } from "@/lib/account";
import { getCategory, getTopic } from "@/content/ideas";
import { PtIdea, listIdeas } from "@/lib/ideas";
import PtIdeaCard from "@/components/PtIdeaCard";
import GuestBanner, { useIsGuest } from "@/components/GuestBanner";

const paperLink = (q: string) => `/pts?mode=papers&q=${encodeURIComponent(q)}`;

export default function TopicPage() {
  const { slug } = useParams<{ slug: string }>();
  const topic = getTopic(slug);
  const category = topic ? getCategory(topic.category) : undefined;

  const [account, setAccount] = useState<AccountType | null>(null);
  const guest = useIsGuest();
  const [ideas, setIdeas] = useState<PtIdea[] | null>(null);
  const [sort, setSort] = useState<"new" | "popular">("new");
  const [openIdea, setOpenIdea] = useState<number | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (user) setAccount(await getMyAccountType(user.id));
    });
  }, []);

  const load = useCallback(async () => {
    setIdeas(await listIdeas({ topic: slug, sort }));
  }, [slug, sort]);

  useEffect(() => {
    load();
  }, [load]);

  if (!topic) {
    return (
      <main className="min-h-screen bg-[#fafafa] px-5 py-8">
        <div className="mx-auto max-w-2xl">
          <p className="text-sm text-gray-600">この疾患は見つかりませんでした。</p>
          <Link href="/ideas" className="mt-3 inline-block text-sm underline">
            臨床アイデアの一覧へ
          </Link>
        </div>
      </main>
    );
  }

  const card = "rounded-2xl border border-gray-200 bg-white p-4";

  return (
    <main className="min-h-screen bg-[#fafafa] px-5 py-8 pb-28">
      <div className="mx-auto max-w-2xl">
        <Link href="/pts?mode=ideas" className="text-sm text-gray-400 hover:text-gray-700">
          ← 臨床アイデア
        </Link>

        <p className="mt-3 text-xs text-gray-500">{category?.name}</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">{topic.name}</h1>
        <p className="mt-2 text-sm leading-7 text-gray-700">{topic.summary}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <Link href={paperLink(topic.searchQuery)} className="rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-xs font-medium text-sky-900">
            📚 この疾患の論文を探す
          </Link>
          {!guest && (
            <Link href={`/ideas/ai?topic=${topic.slug}`} className="rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-800">
              ✨ AIに相談する
            </Link>
          )}
          {account === "pt" && (
            <Link href={`/ideas/new?topic=${topic.slug}`} className="rounded-full bg-black px-4 py-2 text-xs font-medium text-white">
              ＋ 自分のアイデアを登録
            </Link>
          )}
        </div>

        {guest && (
          <div className="mt-4">
            <GuestBanner text="評価とリハビリのアイデアは、ログインなしで見られます。AIに相談・アイデアの登録・みんなのアイデアは、無料登録後に使えます。" />
          </div>
        )}

        <p className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-900">
          編集部が、公開されているガイドライン等からまとめた一般的な参考情報です（PTによる内容の確認は順次）。「必ずこうする」ではなく「検討できる選択肢」として使い、実際の判断は、医師の指示・院内のプロトコル・ご自身の評価に従ってください。
        </p>

        <h2 className="mt-8 text-lg font-semibold text-gray-900">まず見たい評価</h2>
        <ul className={`mt-3 divide-y divide-gray-100 ${card} !py-1`}>
          {topic.evaluation.map((e) => (
            <li key={e.name} className="py-2.5">
              <p className="text-sm font-semibold text-gray-900">{e.name}</p>
              <p className="mt-0.5 text-sm leading-6 text-gray-600">{e.how}</p>
            </li>
          ))}
        </ul>

        <h2 className="mt-8 text-lg font-semibold text-gray-900">リハビリのアイデア（編集部）</h2>
        <div className="mt-3 space-y-2">
          {topic.ideas.map((idea, i) => {
            const open = openIdea === i;
            return (
              <section key={idea.title} className={card}>
                <button
                  onClick={() => setOpenIdea(open ? null : i)}
                  aria-expanded={open}
                  className="flex w-full items-start justify-between gap-3 text-left"
                >
                  <span>
                    <span className="block text-sm font-semibold text-gray-900">{idea.title}</span>
                    <span className="mt-0.5 block text-xs leading-5 text-gray-500">目的: {idea.purpose}</span>
                  </span>
                  <span className="mt-1 text-xs text-gray-400">{open ? "▲" : "▼"}</span>
                </button>
                {open && (
                  <div className="mt-3 space-y-2 border-t border-gray-100 pt-3 text-sm leading-6">
                    <p>
                      <span className="text-[11px] font-semibold text-gray-500">進め方　</span>
                      <span className="text-gray-800">{idea.how}</span>
                    </p>
                    <p>
                      <span className="text-[11px] font-semibold text-gray-500">ポイント・注意　</span>
                      <span className="text-gray-800">{idea.points}</span>
                    </p>
                    <Link
                      href={paperLink(`${topic.searchQuery} ${idea.title}`)}
                      className="inline-block rounded-full border border-gray-200 px-3 py-1.5 text-xs text-gray-600"
                    >
                      📚 この方法の論文を探す
                    </Link>
                  </div>
                )}
              </section>
            );
          })}
        </div>

        <h2 className="mt-8 text-lg font-semibold text-gray-900">リスク管理・中止の目安</h2>
        <ul className="mt-3 list-disc space-y-1.5 rounded-2xl bg-red-50 py-3 pl-8 pr-4 text-sm leading-6 text-red-900">
          {topic.cautions.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>

        <h2 className="mt-8 text-lg font-semibold text-gray-900">参考にした資料</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-xs leading-5 text-gray-600">
          {topic.refs.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>

        <div className="mt-10 flex items-end justify-between">
          <h2 className="text-lg font-semibold text-gray-900">みんなのアイデア</h2>
          <div className="flex gap-1.5">
            {(["new", "popular"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSort(s)}
                aria-pressed={sort === s}
                className={`rounded-full px-3 py-1 text-xs ${sort === s ? "bg-black text-white" : "border border-gray-200 text-gray-600"}`}
              >
                {s === "new" ? "新着" : "よく使われている"}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-3 space-y-3">
          {guest && (
            <div className={`${card} text-sm leading-6 text-gray-600`}>
              PTが登録したアイデアは、無料登録（PT・学生）後に読めます。
              <Link href="/register" className="ml-1 underline">
                無料で登録する
              </Link>
            </div>
          )}
          {!guest && ideas === null && <p className="text-sm text-gray-400">読み込み中…</p>}
          {!guest && ideas?.length === 0 && (
            <div className={`${card} text-sm leading-6 text-gray-600`}>
              まだ、投稿はありません。
              {account === "pt" ? (
                <>
                  あなたの「この疾患で、こんなことをやっている」を、最初に登録しませんか？
                  <Link href={`/ideas/new?topic=${topic.slug}`} className="ml-1 underline">
                    アイデアを登録する
                  </Link>
                </>
              ) : (
                "PTのアカウントで、アイデアを登録できます。"
              )}
            </div>
          )}
          {ideas?.map((idea) => (
            <PtIdeaCard key={idea.id} idea={idea} onChanged={load} searchHint={topic.searchQuery} />
          ))}
        </div>
      </div>
    </main>
  );
}
