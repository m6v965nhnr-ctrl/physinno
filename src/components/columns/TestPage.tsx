import Link from "next/link";
import { ldJson } from "@/lib/jsonLd";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import type { TestCard } from "@/content/tests/types";

const qHref = (id: string) => {
  const [e, s, n] = id.split("-");
  return `/kokushi/${e}/${s}/${n}`;
};
const qLabel = (id: string) => {
  const [e, s, n] = id.split("-");
  return `第${e}回${s === "am" ? "午前" : "午後"}${n}`;
};
const host = (u: string) => {
  try {
    return new URL(u).hostname.replace(/^www\./, "");
  } catch {
    return u;
  }
};

// 検査・評価法・基準値の個別ページ
export default function TestPage({ d, diseases }: { d: TestCard; diseases: { slug: string; name: string }[] }) {
  const path = `/columns/tests/${d.slug}`;
  const register = `/register?type=student&utm_source=test&utm_medium=seo&utm_campaign=test-${d.slug}`;
  const title = d.name.replace(/\(.*?\)/g, "");
  const description = `${title}の基準値・区分と、理学療法士国家試験（第52〜61回）での問われ方を、公式資料で確認してまとめました。`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: SITE_NAME, item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "コラム", item: `${SITE_URL}/columns` },
        { "@type": "ListItem", position: 3, name: "検査・基準値の一覧", item: `${SITE_URL}/columns/tests` },
        { "@type": "ListItem", position: 4, name: d.name, item: `${SITE_URL}${path}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `${d.name}｜国試に出る基準値`,
      description,
      inLanguage: "ja",
      dateModified: d.checkedOn,
      author: { "@type": "Organization", name: `${SITE_NAME}編集部` },
      mainEntityOfPage: `${SITE_URL}${path}`,
    },
  ];
  const sources = [...new Map(d.rows.flatMap((r) => r.sources).map((s) => [s.url, s])).values()];
  const conflicts = d.rows.filter((r) => r.conflict);

  return (
    <main className="min-h-screen bg-[#fafafa] px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(jsonLd) }} />
      <div className="mx-auto max-w-2xl">
        <nav className="text-xs text-gray-400" aria-label="パンくず">
          <Link href="/columns" className="hover:text-gray-700">コラム</Link>
          <span className="mx-1">/</span>
          <Link href="/columns/tests" className="hover:text-gray-700">検査・基準値の一覧</Link>
        </nav>

        <h1 className="mt-5 text-2xl font-bold leading-snug text-gray-900">{d.name}</h1>
        <p className="mt-1 text-xs text-gray-400">{d.category} ・ {SITE_NAME}編集部 ・ 確認日 {d.checkedOn}</p>
        <p className="mt-4 text-sm leading-7 text-gray-700">{description}</p>

        <section className="mt-8 space-y-3">
          {d.rows.map((r) => (
            <article key={r.item} className="rounded-2xl border border-gray-100 bg-white p-4">
              <h2 className="text-sm font-bold text-gray-900">{r.item}</h2>
              {r.target && <p className="mt-0.5 text-xs text-gray-500">対象: {r.target}</p>}
              <p className="mt-2 text-sm leading-7 text-gray-900">{r.value}</p>
              {r.conflict && (
                <p className="mt-2 rounded-lg bg-amber-50 p-2 text-xs leading-6 text-amber-900">
                  国試の記載と現行の資料の違い: {r.note}
                </p>
              )}
              {r.exam && (
                <div className="mt-2 text-xs leading-6 text-gray-600">
                  <span className="font-semibold text-gray-700">国試での出題: </span>
                  {r.exam}
                </div>
              )}
              {r.q.length > 0 && (
                <span className="mt-2 flex flex-wrap gap-1.5">
                  {r.q.map((id) => (
                    <Link key={id} href={qHref(id)} className="rounded-full border border-gray-300 px-2 py-0.5 text-[11px] text-gray-600 hover:border-gray-500">
                      {qLabel(id)}
                    </Link>
                  ))}
                </span>
              )}
              <p className="mt-2 text-[11px] text-gray-400">
                出典:{" "}
                {r.sources.map((s, i) => (
                  <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="underline">
                    {i > 0 ? "、" : ""}
                    {host(s.url)}
                  </a>
                ))}
              </p>
            </article>
          ))}
        </section>

        {conflicts.length > 0 && (
          <p className="mt-4 text-xs leading-6 text-gray-500">
            ガイドラインの改訂で、過去の国試の正答と、いまの資料の値が違うものがあります。国試対策では過去の正答を、臨床では現行の資料を確認してください。
          </p>
        )}

        <div className="mt-8 rounded-3xl bg-relight-gradient p-6 shadow-sm">
          <p className="text-xs font-bold tracking-[0.14em] text-gray-900/70">Re:light なら</p>
          <p className="mt-2 text-xl font-black leading-snug text-gray-900">{title}の問題を、国試の過去問で解こう。</p>
          <p className="mt-2 text-sm font-bold leading-7 text-gray-900">
            理学療法士国家試験の過去問を、スマホで1問ずつ。問題に出てきた検査・基準値は、タップするとその場で確かめられます。無料・登録は1分。
          </p>
          <Link href={register} className="mt-4 inline-block rounded-full bg-gray-900 px-7 py-3.5 text-sm font-bold text-white">
            無料ではじめる →
          </Link>
        </div>

        {diseases.length > 0 && (
          <section className="mt-8">
            <h2 className="text-base font-bold text-gray-900">関係する疾患</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {diseases.map((r) => (
                <li key={r.slug}>
                  <Link href={`/columns/diseases/${r.slug}`} className="block rounded-full border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-800 hover:border-gray-500">
                    {r.name.replace(/\(.*?\)/g, "")}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mt-8">
          <h2 className="text-sm font-bold text-gray-900">出典</h2>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-xs leading-6 text-gray-600">
            {sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="break-all text-blue-600 underline">
                  {s.url}
                </a>
              </li>
            ))}
          </ol>
        </section>

        <p className="mt-6 text-xs leading-6 text-gray-500">
          国家試験の学習用に、公的機関・学会などの資料の本文で値を確かめてまとめたものです。{d.review === "human" ? "専門家が確認しています。" : "AIが資料と照合しました（専門家の確認は、まだです）。"}資料で確かめられなかった値は載せていません。診断・治療の指示ではありません。ガイドラインは改訂されます。試験・臨床では、最新の教科書・ガイドラインで確認してください。誤りに気づいたら、サイトの「意見箱」から教えてください。このページは、公式のものではありません。
        </p>
      </div>
    </main>
  );
}
