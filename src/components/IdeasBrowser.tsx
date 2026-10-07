"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CATEGORIES, topicsOf } from "@/content/ideas";
import { ideaCounts } from "@/lib/ideas";

// 診療報酬の区分 → 疾患 の一覧。/pts の「臨床アイデア」タブと /ideas で使う
export default function IdeasBrowser() {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    ideaCounts().then(setCounts);
  }, []);

  return (
    <div>
      <p className="text-sm leading-6 text-gray-600">
        疾患ごとに、評価の項目とリハビリのアイデアをまとめました。「こんなやり方もあるんだ」を見つけたり、自分のアイデアを登録して、みんなに共有したりできます。
      </p>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <Link
          href="/ideas/ai"
          className="rounded-2xl bg-relight-gradient px-4 py-3 text-white"
        >
          <span className="block text-sm font-semibold">✨ AIに相談する</span>
          <span className="mt-0.5 block text-xs leading-5 text-white/95">
            患者さんの状態を選ぶと、臨床で検討できる選択肢を提案します
          </span>
        </Link>
        <Link href="/ideas/saved" className="rounded-2xl border border-gray-200 bg-white px-4 py-3">
          <span className="block text-sm font-semibold text-gray-900">🔖 マイ臨床アイデア</span>
          <span className="mt-0.5 block text-xs leading-5 text-gray-500">保存したアイデアを、疾患ごとに見返す</span>
        </Link>
      </div>

      <div className="mt-6 space-y-6">
        {CATEGORIES.map((c) => (
          <section key={c.key}>
            <div className="flex items-baseline gap-2">
              <h2 className="text-base font-semibold text-gray-900">{c.name}</h2>
              {c.comingSoon && (
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] text-gray-500">準備中</span>
              )}
            </div>
            <p className="mt-0.5 text-xs leading-5 text-gray-500">{c.description}</p>

            {!c.comingSoon && (
              <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                {topicsOf(c.key).map((t) => (
                  <li key={t.slug}>
                    <Link
                      href={`/ideas/${t.slug}`}
                      className="flex h-full items-center justify-between gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 transition hover:border-gray-400"
                    >
                      <span className="text-sm font-medium text-gray-900">{t.name}</span>
                      {(counts[t.slug] ?? 0) > 0 && (
                        <span className="shrink-0 rounded-full bg-sky-100 px-2 py-0.5 text-[11px] font-semibold text-sky-800">
                          みんなの{counts[t.slug]}件
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      <p className="mt-8 text-xs leading-5 text-gray-400">
        編集部が、公開されているガイドライン等をもとにまとめた、一般的な参考情報です。個々の患者さんへの適用は、医師の指示・院内のプロトコル・ご自身の評価に従ってください。
      </p>
    </div>
  );
}
