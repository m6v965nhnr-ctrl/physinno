import Link from "next/link";
import { ldJson } from "@/lib/jsonLd";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export type AnatomyLink = { href: string; label: string };

type Props = {
  kind: "muscles" | "bones";
  id: string;
  name: string;
  en: string;
  region: string;
  lead: string;
  rows: [string, string][];
  points: string[];
  clinical: string;
  exam: string;
  relatedLabel: string;
  related: AnatomyLink[];
  checkedOn: string;
  sources: string;
};

// 筋・骨の個別ページ（検索から来た学生を、一問一答へ案内する）
export default function AnatomyPage(p: Props) {
  const kindLabel = p.kind === "muscles" ? "筋" : "骨";
  const path = `/columns/${p.kind}/${encodeURIComponent(p.name)}`;
  const register = `/register?type=student&utm_source=anatomy&utm_medium=seo&utm_campaign=${p.kind === "muscles" ? "muscle" : "bone"}-${p.id}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: SITE_NAME, item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "コラム", item: `${SITE_URL}/columns` },
        { "@type": "ListItem", position: 3, name: `${kindLabel}の一覧`, item: `${SITE_URL}/columns/${p.kind}` },
        { "@type": "ListItem", position: 4, name: p.name, item: `${SITE_URL}${path}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `${p.name}（${p.en}）`,
      description: p.lead,
      inLanguage: "ja",
      dateModified: p.checkedOn,
      author: { "@type": "Organization", name: `${SITE_NAME}編集部` },
      mainEntityOfPage: `${SITE_URL}${path}`,
    },
  ];

  return (
    <main className="min-h-screen bg-[#fafafa] px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(jsonLd) }} />
      <div className="mx-auto max-w-2xl">
        <nav className="text-xs text-gray-400" aria-label="パンくず">
          <Link href="/columns" className="hover:text-gray-700">コラム</Link>
          <span className="mx-1">/</span>
          <Link href={`/columns/${p.kind}`} className="hover:text-gray-700">{kindLabel}の一覧</Link>
        </nav>

        <h1 className="mt-5 text-2xl font-bold leading-snug text-gray-900">
          {p.name}
          <span className="ml-2 text-base font-medium text-gray-400">{p.en}</span>
        </h1>
        <p className="mt-1 text-xs text-gray-400">{p.region} ・ {SITE_NAME}編集部 ・ 確認日 {p.checkedOn}</p>
        <p className="mt-4 text-sm leading-7 text-gray-700">{p.lead}</p>

        <dl className="mt-6 space-y-3 rounded-2xl border border-gray-100 bg-white p-5">
          {p.rows.map(([k, v]) => (
            <div key={k} className="grid grid-cols-[5.5rem_1fr] gap-2">
              <dt className="text-xs font-semibold text-gray-500">{k}</dt>
              <dd className="text-sm leading-7 text-gray-900">{v}</dd>
            </div>
          ))}
        </dl>

        <section className="mt-8">
          <h2 className="text-base font-bold text-gray-900">覚え方・ポイント</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-7 text-gray-800">
            {p.points.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-base font-bold text-gray-900">臨床で意識すること</h2>
          <p className="mt-2 text-sm leading-7 text-gray-800">{p.clinical}</p>
        </section>

        <section className="mt-8">
          <h2 className="text-base font-bold text-gray-900">国家試験での問われ方</h2>
          <p className="mt-2 text-sm leading-7 text-gray-800">{p.exam}</p>
        </section>

        <div className="mt-8 rounded-3xl bg-relight-gradient p-6 shadow-sm">
          <p className="text-xs font-bold tracking-[0.14em] text-gray-900/70">Re:light なら</p>
          <p className="mt-2 text-xl font-black leading-snug text-gray-900">{p.name}の問題を、国試の過去問で解こう。</p>
          <p className="mt-2 text-sm font-bold leading-7 text-gray-900">
            理学療法士国家試験の過去問を、スマホで1問ずつ。正誤と解説がすぐ出て、解説の下から、出てきた筋・骨の起始・停止もタップで確かめられます。無料・登録は1分。
          </p>
          <Link href={register} className="mt-4 inline-block rounded-full bg-gray-900 px-7 py-3.5 text-sm font-bold text-white">
            無料ではじめる →
          </Link>
        </div>

        {p.related.length > 0 && (
          <section className="mt-8">
            <h2 className="text-base font-bold text-gray-900">{p.relatedLabel}</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {p.related.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="block rounded-full border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-800 hover:border-gray-500">
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <p className="mt-8 text-xs leading-6 text-gray-500">
          学習用の要約です。照合した資料: {p.sources}（確認日 {p.checkedOn}）。教科書により書き方が違うことがあります（特に髄節）。試験・臨床では、使っている教科書・解剖学書で確認してください。誤りに気づいたら、サイトの「意見箱」から教えてください。このページは、公式のものではありません。
        </p>
      </div>
    </main>
  );
}
