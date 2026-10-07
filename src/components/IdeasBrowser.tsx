"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { getMyAccountType } from "@/lib/account";
import { CATEGORIES, getCategory, topicsOf, type CategoryKey } from "@/content/ideas";
import { ideaCounts } from "@/lib/ideas";
import GuestBanner, { useIsGuest } from "@/components/GuestBanner";

// 診療報酬の区分 → 疾患 を、プルダウンで選ぶ。/pts の「臨床アイデア」タブと /ideas で使う
export default function IdeasBrowser() {
  const router = useRouter();
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [isPt, setIsPt] = useState(false);
  const [category, setCategory] = useState<CategoryKey | "">("");
  const guest = useIsGuest();

  useEffect(() => {
    ideaCounts().then(setCounts);
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (user) setIsPt((await getMyAccountType(user.id)) === "pt");
    });
  }, []);

  const topics = category ? topicsOf(category) : [];
  const select = "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900";

  return (
    <div>
      <p className="text-sm leading-6 text-gray-600">
        疾患ごとに、評価の項目とリハビリのアイデアをまとめました。「こんなやり方もあるんだ」を見つけたり、自分のアイデアを登録して、みんなに共有したりできます。
      </p>

      {guest ? (
        <div className="mt-4">
          <GuestBanner text="疾患ごとのまとめは、ログインなしで見られます。AIに相談・アイデアの登録・保存・みんなのアイデアは、無料登録後に使えます。" />
        </div>
      ) : (
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Link href="/ideas/ai" className="rounded-2xl bg-relight-gradient px-3 py-3 text-white">
          <span className="block text-sm font-semibold">✨ AIに相談</span>
          <span className="mt-0.5 block text-[11px] leading-4 text-white/95">状態を選ぶと、検討できる選択肢を提案</span>
        </Link>
        <Link href="/ideas/saved" className="rounded-2xl border border-gray-200 bg-white px-3 py-3">
          <span className="block text-sm font-semibold text-gray-900">🔖 マイ臨床アイデア</span>
          <span className="mt-0.5 block text-[11px] leading-4 text-gray-500">保存したアイデアを見返す</span>
        </Link>
      </div>
      )}

      {isPt && (
        <Link
          href="/ideas/new"
          className="mt-2 block rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-center text-sm font-semibold text-sky-900"
        >
          ＋ リハビリのアイデアを登録
        </Link>
      )}

      {/* 登録の操作と、調べる操作を、線と見出しで分ける */}
      <div className="my-6 flex items-center gap-3" role="separator" aria-label="ここから、アイデアを調べる">
        <span className="h-px flex-1 bg-gray-200" />
        <span className="text-xs font-semibold tracking-wide text-gray-400">アイデアを調べる</span>
        <span className="h-px flex-1 bg-gray-200" />
      </div>

      <section aria-labelledby="ideas-search-title" className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <h2 id="ideas-search-title" className="flex items-center gap-2 text-base font-semibold text-gray-900">
          <span aria-hidden="true">🔍</span>疾患から調べる
        </h2>
        <p className="mt-1 text-xs leading-5 text-gray-500">分類を選び、疾患を選ぶと、評価とリハビリのアイデアのページが開きます。</p>

        <div className="mt-4 space-y-3">
          <div>
            <label htmlFor="ideas-category" className="mb-1 block text-xs font-semibold text-gray-600">
              ① 分類（診療報酬の区分）
            </label>
            <select
              id="ideas-category"
              value={category}
              onChange={(e) => setCategory(e.target.value as CategoryKey | "")}
              className={select}
            >
              <option value="">選択してください</option>
              {CATEGORIES.map((c) => (
                <option key={c.key} value={c.key} disabled={c.comingSoon}>
                  {c.name}
                  {c.comingSoon ? "（準備中）" : ""}
                </option>
              ))}
            </select>
            {category && <p className="mt-1 text-xs leading-5 text-gray-500">{getCategory(category)?.description}</p>}
          </div>

          <div>
            <label htmlFor="ideas-topic" className="mb-1 block text-xs font-semibold text-gray-600">
              ② 疾患
            </label>
            <select
              id="ideas-topic"
              value=""
              disabled={!category}
              onChange={(e) => e.target.value && router.push(`/ideas/${e.target.value}`)}
              className={`${select} disabled:bg-gray-50 disabled:text-gray-400`}
            >
              <option value="">{category ? "疾患を選ぶと、ページが開きます" : "先に、分類を選んでください"}</option>
              {topics.map((t) => (
                <option key={t.slug} value={t.slug}>
                  {t.name}
                  {(counts[t.slug] ?? 0) > 0 ? `（みんなの${counts[t.slug]}件）` : ""}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <p className="mt-8 text-xs leading-5 text-gray-400">
        編集部が、公開されているガイドライン等をもとにまとめた、一般的な参考情報です（PTによる内容の確認は順次）。個々の患者さんへの適用は、医師の指示・院内のプロトコル・ご自身の評価に従ってください。
      </p>
    </div>
  );
}
