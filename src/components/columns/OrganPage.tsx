import Link from "next/link";
import { ldJson } from "@/lib/jsonLd";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import type { Claim, OrganCard } from "@/content/organs/types";
import BackLink from "@/components/BackLink";

const qHref = (id: string) => {
  const [e, s, n] = id.split("-");
  return `/kokushi/${e}/${s}/${n}`;
};
const qLabel = (id: string) => {
  const [e, s, n] = id.split("-");
  return `第${e}回${s === "am" ? "午前" : "午後"}${n}`;
};
const short = (n: string) => n.replace(/\(.*?\)|（.*?）/g, "");
const refs = (s: number[]) => (s.length ? ` [${s.join("][")}]` : "");

function Claims({ title, items }: { title: string; items: Claim[] }) {
  if (!items.length) return null;
  return (
    <section className="mt-6">
      <h2 className="text-base font-bold text-gray-900">{title}</h2>
      <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-7 text-gray-800">
        {items.map((c) => (
          <li key={c.t}>
            {c.t}
            <span className="text-[11px] text-gray-400">{refs(c.s)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

// 臓器・仕組みの個別ページ
export default function OrganPage({
  d,
  links,
}: {
  d: OrganCard;
  links: { diseases: { slug: string; name: string }[]; tests: { slug: string; name: string }[]; organs: { slug: string; name: string }[] };
}) {
  const path = `/columns/organs/${d.slug}`;
  const title = short(d.name);
  const description = `${title}の場所・構造・働きと、理学療法士国家試験で問われる点を、図つきで、出典を確認してまとめました。`;
  const register = `/register?type=student&utm_source=organ&utm_medium=seo&utm_campaign=organ-${d.slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: SITE_NAME, item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "コラム", item: `${SITE_URL}/columns` },
        { "@type": "ListItem", position: 3, name: "臓器・仕組みの一覧", item: `${SITE_URL}/columns/organs` },
        { "@type": "ListItem", position: 4, name: d.name, item: `${SITE_URL}${path}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `${title}の場所・構造・働き｜国試に出る解剖・生理`,
      description,
      inLanguage: "ja",
      dateModified: d.checkedOn,
      author: { "@type": "Organization", name: `${SITE_NAME}編集部` },
      mainEntityOfPage: `${SITE_URL}${path}`,
    },
  ];
  const linkGroups: [string, string, { slug: string; name: string }[]][] = [
    ["関係する疾患", "/columns/diseases/", links.diseases],
    ["関係する検査・基準値", "/columns/tests/", links.tests],
    ["関係する臓器・仕組み", "/columns/organs/", links.organs],
  ];

  return (
    <main className="min-h-screen bg-[#fafafa] px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(jsonLd) }} />
      <div className="mx-auto max-w-2xl">
        <BackLink fallback="/columns/organs" />
        <nav className="mt-2 text-xs text-gray-400" aria-label="パンくず">
          <Link href="/columns" className="hover:text-gray-700">コラム</Link>
          <span className="mx-1">/</span>
          <Link href="/columns/organs" className="hover:text-gray-700">臓器・仕組みの一覧</Link>
        </nav>

        <h1 className="mt-5 text-2xl font-bold leading-snug text-gray-900">{d.name}</h1>
        <p className="mt-1 text-xs text-gray-400">{d.reading} ・ {d.system} ・ {SITE_NAME}編集部 ・ 確認日 {d.checkedOn}</p>
        <p className="mt-4 text-sm leading-7 text-gray-800">
          {d.summary.t}
          <span className="text-[11px] text-gray-400">{refs(d.summary.s)}</span>
        </p>

        {d.figures.map((g) => (
          <figure key={g.src} className="mt-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={g.src} alt={g.alt} loading="lazy" decoding="async" className="w-full rounded-xl border border-gray-100 bg-white" />
            <figcaption className="mt-1 text-[11px] leading-5 text-gray-500">{g.caption}</figcaption>
          </figure>
        ))}

        <Claims title="場所" items={d.location} />
        <Claims title="構造" items={d.structure} />
        <Claims title="働き" items={d.function} />
        <Claims title="仕組み" items={d.mechanism} />

        {d.examPoints.length > 0 && (
          <section className="mt-6">
            <h2 className="text-base font-bold text-gray-900">国試で問われる点</h2>
            <ul className="mt-2 space-y-3">
              {d.examPoints.map((p) => (
                <li key={p.t} className="rounded-2xl border border-gray-100 bg-white p-4 text-sm leading-7 text-gray-900">
                  {p.t}
                  <span className="text-[11px] text-gray-400">{refs(p.s)}</span>
                  {p.q.length > 0 && (
                    <span className="mt-2 flex flex-wrap gap-1.5">
                      {p.q.map((id) => (
                        <Link key={id} href={qHref(id)} className="rounded-full border border-gray-300 px-2 py-0.5 text-[11px] text-gray-600 hover:border-gray-500">
                          {qLabel(id)}
                        </Link>
                      ))}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-8 rounded-3xl bg-relight-gradient p-6 shadow-sm">
          <p className="text-xs font-bold tracking-[0.14em] text-gray-900/70">Re:light なら</p>
          <p className="mt-2 text-xl font-black leading-snug text-gray-900">{title}の問題を、国試の過去問で解こう。</p>
          <p className="mt-2 text-sm font-bold leading-7 text-gray-900">
            理学療法士国家試験の過去問を、スマホで1問ずつ。問題に出てきた臓器・仕組みは、タップすると図つきでその場で確かめられます。無料・登録は1分。
          </p>
          <Link href={register} className="mt-4 inline-block rounded-full bg-gray-900 px-7 py-3.5 text-sm font-bold text-white">
            無料ではじめる →
          </Link>
        </div>

        {linkGroups.map(([label, base, items]) =>
          items.length > 0 ? (
            <section key={label} className="mt-8">
              <h2 className="text-base font-bold text-gray-900">{label}</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {items.map((r) => (
                  <li key={r.slug}>
                    <Link href={`${base}${r.slug}`} className="block rounded-full border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-800 hover:border-gray-500">
                      {short(r.name)}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null
        )}

        <section className="mt-8">
          <h2 className="text-sm font-bold text-gray-900">出典</h2>
          <ol className="mt-2 space-y-1 text-xs leading-6 text-gray-600">
            {d.sources.map((s) => (
              <li key={s.n}>
                [{s.n}] {s.org}「{s.title}」（{s.kind}・確認日 {s.checked}）{" "}
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="break-all text-blue-600 underline">
                  {s.url}
                </a>
              </li>
            ))}
          </ol>
        </section>

        <p className="mt-6 text-xs leading-6 text-gray-500">
          国家試験の学習用に、公的機関・学会・教科書などの資料の本文で確かめてまとめたものです。{d.review === "human" ? "専門家が確認しています。" : "AIが資料と照合しました（専門家の確認は、まだです）。"}図は、位置関係を示す模式図で、大きさや形は実物と異なります。診断・治療の指示ではありません。誤りに気づいたら、サイトの「意見箱」から教えてください。このページは、公式のものではありません。
        </p>
      </div>
    </main>
  );
}
