import { ldJson } from "@/lib/jsonLd";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PaperSiteFrame, { type GuideSite } from "@/components/paper-search/PaperSiteFrame";
import { CERT_FIELDS, CERT_FIELDS_COUNT_DATE, CERT_TOTAL, certFieldBySlug, certFieldRank } from "@/content/certifiedFields";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return CERT_FIELDS.map((f) => ({ field: f.slug }));
}

type Props = { params: Promise<{ field: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const f = certFieldBySlug((await params).field);
  if (!f) return {};
  const title = `認定理学療法士「${f.name}」の取り方｜定義・試験・取得者数`;
  const description = `認定理学療法士の「${f.name}」分野（${f.en}）の、協会による定義、取得までの流れ、試験の形式、取得者数（${f.n.toLocaleString()}人・${CERT_FIELDS_COUNT_DATE}時点）を、公式情報でまとめました。`;
  return {
    title,
    description,
    alternates: { canonical: `/certified-pt/${f.slug}` },
    openGraph: { title: `${title}｜${SITE_NAME}`, description, url: `/certified-pt/${f.slug}` },
  };
}

export default async function CertifiedFieldPage({ params }: Props) {
  const f = certFieldBySlug((await params).field);
  if (!f) notFound();

  const rank = certFieldRank(f);
  const share = ((f.n / CERT_TOTAL) * 100).toFixed(1);
  const register = `/register?type=pt&utm_source=certified-pt&utm_medium=web&utm_campaign=field-${f.slug}`;
  const site: GuideSite = {
    brand: "認定理学療法士ガイド",
    href: "/certified-pt",
    register,
    blurb: "の、認定理学療法士の入口です。",
    links: [{ href: "/certified-pt", label: "取り方のまとめ" }],
  };
  const near = [...CERT_FIELDS].sort((a, b) => b.n - a.n);
  const i = near.findIndex((x) => x.slug === f.slug);
  const neighbors = near.slice(Math.max(0, i - 2), i + 3).filter((x) => x.slug !== f.slug);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: SITE_NAME, item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "認定理学療法士の取り方", item: `${SITE_URL}/certified-pt` },
        { "@type": "ListItem", position: 3, name: `${f.name}`, item: `${SITE_URL}/certified-pt/${f.slug}` },
      ],
    },
  ];

  return (
    <PaperSiteFrame site={site}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(jsonLd) }} />

      <section className="px-5 pb-6 pt-8">
        <div className="mx-auto max-w-3xl">
          <Link href="/certified-pt" className="text-sm text-gray-500 hover:text-gray-800">← 認定理学療法士の取り方（全体）</Link>
          <p className="mt-4 text-xs font-bold tracking-[0.14em] text-teal-700">{f.en.toUpperCase()}</p>
          <h1 className="mt-2 text-2xl font-bold leading-snug tracking-tight sm:text-4xl">
            <span className="inline-block">認定理学療法士</span>
            <span className="inline-block">「{f.name}」の取り方</span>
          </h1>
          <p className="mt-3 text-sm leading-7 text-gray-700">
            認定理学療法士の「{f.name}」分野について、協会の公式情報をもとに、定義・取得者数・試験の形式を、まとめました。制度の全体は、
            <Link href="/certified-pt" className="underline">認定理学療法士の取り方</Link>
            をご覧ください。
          </p>
        </div>
      </section>

      <section className="px-5 pb-8">
        <div className="mx-auto max-w-3xl rounded-3xl bg-relight-gradient p-6 shadow-sm">
          <p className="text-xs font-bold tracking-[0.14em] text-gray-900/70">Re:light なら</p>
          <p className="mt-2 text-[28px] font-black leading-tight text-gray-900 sm:text-4xl">
            「{f.name}」の取得・更新を、
            <br />
            かんたん管理。
          </p>
          <p className="mt-3 text-sm font-bold leading-7 text-gray-900">分野を選ぶだけ。「あと何をすればいいか」を、自動で計算します。無料・登録は1分。</p>
          <Link href={register} className="mt-4 inline-block rounded-full bg-gray-900 px-7 py-3.5 text-sm font-bold text-white">無料ではじめる →</Link>
        </div>
      </section>

      <section className="px-5 pb-8">
        <div className="mx-auto max-w-3xl space-y-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <h2 className="text-base font-bold">協会による、この分野の定義</h2>
            <p className="mt-2 text-sm leading-7 text-gray-800">{f.def}。</p>
            <p className="mt-1 text-xs text-gray-500">出典: 日本理学療法士協会「認定・専門理学療法士の分野・英語表記・定義」</p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <h2 className="text-base font-bold">取得者数</h2>
            <p className="mt-2 text-3xl font-black tabular-nums">
              {f.n.toLocaleString()}<span className="ml-1 text-base font-bold">人</span>
            </p>
            <p className="mt-1 text-sm leading-7 text-gray-700">
              {CERT_FIELDS_COUNT_DATE}時点。21分野のうち、取得者数の多い順で<b>{rank}番目</b>（認定の取得数の合計{CERT_TOTAL.toLocaleString()}件の{share}％）です。
            </p>
            <p className="mt-1 text-xs leading-6 text-gray-500">数が多い・少ないは、取りやすさや、価値を示すものではありません。出典: 日本理学療法士協会「各資格の取得状況」</p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <h2 className="text-base font-bold">取得までの流れ（全分野に共通）</h2>
            <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-sm leading-7 text-gray-800">
              <li>登録理学療法士を取得する</li>
              <li>指定研修カリキュラム（eラーニング・全分野共通の12コマ）を受ける</li>
              <li>「{f.name}」分野の臨床認定カリキュラム（必須15コマ＋選択5コマ以上）を、開講している教育機関で受ける</li>
              <li>日本理学療法学術研修大会の全日程に参加する</li>
              <li>協会のマイページから申請し、試験を受ける</li>
            </ol>
            <p className="mt-2 text-xs leading-6 text-gray-500">
              試験は、共通問題9問＋この分野の問題15問の、計24問（マークシート・五者択一）。申請料は1分野10,000円（税別）です。費用や日程の詳しい内容は、
              <Link href="/certified-pt" className="underline">取り方のまとめ</Link>
              へ。
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <h2 className="text-base font-bold">ほかの分野</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {neighbors.map((n) => (
                <li key={n.slug}>
                  <Link href={`/certified-pt/${n.slug}`} className="block rounded-full border border-teal-200 bg-white px-3 py-1.5 text-xs font-medium text-teal-900 hover:border-teal-500">
                    {n.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/certified-pt#fields" className="block rounded-full border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-800 hover:border-gray-500">
                  21分野の一覧
                </Link>
              </li>
            </ul>
          </div>

          <p className="text-xs leading-6 text-gray-500">
            制度や日程は変わります。申請の前には、必ず
            <a href="https://www.japanpt.or.jp/pt/lifelonglearning/new/nintei/" target="_blank" rel="noopener noreferrer" className="mx-1 underline">日本理学療法士協会の公式ページ</a>
            で確かめてください。このページは公式のものではありません。
          </p>
        </div>
      </section>
    </PaperSiteFrame>
  );
}
