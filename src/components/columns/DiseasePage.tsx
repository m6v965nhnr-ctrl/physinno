import Link from "next/link";
import { ldJson } from "@/lib/jsonLd";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import type { Claim, Disease } from "@/content/diseases/types";
import { TESTS } from "@/content/tests/generated";
import BackLink from "@/components/BackLink";
import LeadText from "@/components/LeadText";

const cite = (s: number[]) => (
  <sup className="ml-0.5 text-[10px] text-gray-400">[{s.join(",")}]</sup>
);

const H2 = "border-l-4 border-brand-500 pl-2.5 text-base font-bold text-gray-900";

function List({ title, items, id }: { title: string; items: Claim[]; id: string }) {
  if (items.length === 0) return null;
  return (
    <section id={id} className="mt-9 scroll-mt-4">
      <h2 className={H2}>{title}</h2>
      <ul className="mt-3 divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white px-4 text-sm leading-7 text-gray-800">
        {items.map((c) => (
          <li key={c.t} className="py-3">
            <LeadText t={c.t} />
            {cite(c.s)}
          </li>
        ))}
      </ul>
    </section>
  );
}

const qHref = (id: string) => {
  const [e, s, n] = id.split("-");
  return `/kokushi/${e}/${s}/${n}`;
};
const qLabel = (id: string) => {
  const [e, s, n] = id.split("-");
  return `第${e}回${s === "am" ? "午前" : "午後"}${n}`;
};

// 疾患の個別ページ（検索から来た学生を、一問一答へ案内する）
export default function DiseasePage({ d, related, guideTitle }: { d: Disease; related: { slug: string; name: string }[]; guideTitle?: string }) {
  const path = `/columns/diseases/${d.slug}`;
  const register = `/register?type=student&utm_source=disease&utm_medium=seo&utm_campaign=disease-${d.slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: SITE_NAME, item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "コラム", item: `${SITE_URL}/columns` },
        { "@type": "ListItem", position: 3, name: "疾患の一覧", item: `${SITE_URL}/columns/diseases` },
        { "@type": "ListItem", position: 4, name: d.name, item: `${SITE_URL}${path}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `${d.name}｜国試で問われる周辺知識`,
      description: d.summary.t,
      inLanguage: "ja",
      dateModified: d.checkedOn,
      author: { "@type": "Organization", name: `${SITE_NAME}編集部` },
      mainEntityOfPage: `${SITE_URL}${path}`,
    },
  ];
  const tests = d.tests.map((s) => TESTS.find((t) => t.slug === s)).filter((t): t is NonNullable<typeof t> => !!t);
  const qids = [...new Set(d.examPoints.flatMap((e) => e.q))];
  const toc = (
    [
      ["cause", "原因・病態", d.cause.length],
      ["symptoms", "症状・所見", d.symptoms.length],
      ["diagnosis", "診断・検査", d.diagnosis.length],
      ["classification", "分類", d.classification.length],
      ["treatment", "治療", d.treatment.length],
      ["pt", "理学療法", d.pt.length],
      ["risk", "リスク管理", d.risk.length],
      ["exam", "国試で問われる点", d.examPoints.length],
      ["confusable", "取り違えやすい疾患", d.confusable.length],
    ] as [string, string, number][]
  ).filter(([, , n]) => n > 0);

  return (
    <main className="min-h-screen bg-[#fafafa] px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(jsonLd) }} />
      <div className="mx-auto max-w-2xl">
        <BackLink fallback="/columns/diseases" />
        <nav className="mt-2 text-xs text-gray-400" aria-label="パンくず">
          <Link href="/columns" className="hover:text-gray-700">コラム</Link>
          <span className="mx-1">/</span>
          <Link href="/columns/diseases" className="hover:text-gray-700">疾患の一覧</Link>
        </nav>

        <h1 className="mt-5 text-2xl font-bold leading-snug text-gray-900">
          {d.name}
          <span className="ml-2 text-base font-medium text-gray-400">{d.reading}</span>
        </h1>
        <p className="mt-1 text-xs text-gray-400">{d.system} ・ {SITE_NAME}編集部 ・ 確認日 {d.checkedOn}</p>
        <p className="mt-4 rounded-2xl bg-brand-50 p-4 text-sm leading-7 text-gray-800">
          {d.summary.t}
          {cite(d.summary.s)}
        </p>

        <nav aria-label="このページの内容" className="mt-4 flex flex-wrap gap-1.5">
          {toc.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="rounded-full border border-gray-300 bg-white px-3 py-1 text-xs text-gray-700 hover:border-gray-500">
              {label}
            </a>
          ))}
        </nav>

        <List id="cause" title="原因・病態" items={d.cause} />
        <List id="symptoms" title="主な症状・所見" items={d.symptoms} />
        <List id="diagnosis" title="診断・検査" items={d.diagnosis} />
        <List id="classification" title="分類・重症度" items={d.classification} />
        <List id="treatment" title="治療" items={d.treatment} />
        <List id="pt" title="理学療法・リハで押さえること" items={d.pt} />
        <List id="risk" title="リスク管理・禁忌" items={d.risk} />

        {tests.length > 0 && (
          <section className="mt-9">
            <h2 className={H2}>関係する検査・基準値</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {tests.map((t) => (
                <li key={t.slug}>
                  <Link href={`/columns/tests/${t.slug}`} className="block rounded-full border border-teal-300 bg-white px-3 py-1.5 text-xs font-medium text-teal-800 hover:border-teal-500">
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {d.examPoints.length > 0 && (
          <section id="exam" className="mt-9 scroll-mt-4">
            <h2 className={H2}>国家試験で問われる点</h2>
            <p className="mt-1 text-xs text-gray-500">第52〜61回の過去問で問われた知識と、基本事項です。</p>
            <ul className="mt-2 space-y-2.5 text-sm leading-7 text-gray-800">
              {d.examPoints.map((e) => (
                <li key={e.t} className="rounded-xl border border-gray-100 bg-white p-3">
                  <LeadText t={e.t} />
                  {cite(e.s)}
                  {e.q.length > 0 && (
                    <span className="mt-1 flex flex-wrap gap-1.5">
                      {e.q.map((id) => (
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

        {d.confusable.length > 0 && (
          <section id="confusable" className="mt-9 scroll-mt-4">
            <h2 className={H2}>取り違えやすい疾患との違い</h2>
            <dl className="mt-2 space-y-2 rounded-2xl border border-gray-100 bg-white p-4">
              {d.confusable.map((c) => (
                <div key={c.name} className="grid grid-cols-[7rem_1fr] gap-2">
                  <dt className="text-xs font-semibold text-gray-500">{c.name}</dt>
                  <dd className="text-sm leading-7 text-gray-900">
                    {c.diff}
                    {cite(c.s)}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        <div className="mt-8 rounded-3xl bg-relight-gradient p-6 shadow-sm">
          <p className="text-xs font-bold tracking-[0.14em] text-gray-900/70">Re:light なら</p>
          <p className="mt-2 text-xl font-black leading-snug text-gray-900">{d.name.replace(/\(.*?\)/g, "")}の問題を、国試の過去問で解こう。</p>
          <p className="mt-2 text-sm font-bold leading-7 text-gray-900">
            理学療法士国家試験の過去問を、スマホで1問ずつ。問題に出てきた疾患は、タップするとその場で確かめられます。無料・登録は1分。
          </p>
          <Link href={register} className="mt-4 inline-block rounded-full bg-gray-900 px-7 py-3.5 text-sm font-bold text-white">
            無料ではじめる →
          </Link>
        </div>

        {(related.length > 0 || d.guide) && (
          <section className="mt-9">
            <h2 className={H2}>あわせて読む</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {d.guide && (
                <li>
                  <Link href={`/columns/${d.guide}`} className="block rounded-full border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-800 hover:border-gray-500">
                    {guideTitle ?? "リハ・評価の詳しい解説"}
                  </Link>
                </li>
              )}
              {related.map((r) => (
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
          <ol className="mt-2 space-y-1 text-xs leading-6 text-gray-600">
            {d.sources.map((s) => (
              <li key={s.n}>
                [{s.n}] {s.org}「
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  {s.title}
                </a>
                」（確認日 {s.checked}）
              </li>
            ))}
          </ol>
        </section>

        <p className="mt-6 text-xs leading-6 text-gray-500">
          国家試験の学習用に、公的機関・学会などの資料をもとに、自分たちの言葉でまとめた要約です。{d.review === "human" ? "専門家が確認しています。" : "AIが出典から要約し、別のAIが出典の本文と1項目ずつ照合しました（専門家の確認は、まだです）。"}診断・治療の指示ではありません。診療ガイドラインは改訂されます。試験・臨床では、最新の教科書・ガイドラインで確認してください。誤りに気づいたら、サイトの「意見箱」から教えてください。このページは、公式のものではありません。
        </p>
        {qids.length > 0 && <p className="sr-only">関連する過去問: {qids.length}問</p>}
      </div>
    </main>
  );
}
