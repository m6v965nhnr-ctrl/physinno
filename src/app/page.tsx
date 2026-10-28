import { ldJson } from "@/lib/jsonLd";
import { Yuji_Boku } from "next/font/google";
import Link from "next/link";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import LpHeader from "@/components/lp/LpHeader";
import LpStickyCta from "@/components/lp/LpStickyCta";
import { LpFooter, SECTION_LABEL, SafetySection } from "@/components/lp/LpParts";
import StandaloneRedirect from "@/components/StandaloneRedirect";
import { pickLpEntrance } from "@/lib/lpEntrance";

// トップページ。理学療法士・学生・教員・一般の方、それぞれの専用ページへの入口（内容は、それぞれのページに分けている）

// 見出しだけ筆文字（書道風）にする
const brush = Yuji_Boku({ weight: "400", subsets: ["latin"], display: "swap" });

const STATS = [
  { big: "完全無料", small: "登録も基本機能も" },
  { big: "8サイト", small: "論文をまとめて検索" },
  { big: "約2,500問", small: "国試の過去問（第49〜61回）" },
  { big: "約14.6万", small: "全国の病院・施設を探せる" },
];


const DOORS = [
  { key: "pt", href: "/for-pt", who: "理学療法士の方へ", title: "仕事の調べものを、ここで済ませる", body: "論文検索・資格の進捗・研修情報・職場の口コミ" },
  { key: "student", href: "/for-students", who: "学生の方へ", title: "国試・実習・就活をひとつに", body: "過去問約2,500問・筋と骨の確認・先生のクラスのテスト" },
  { key: "teacher", href: "/teachers", who: "教員の方へ", title: "国試の一問一答を、クラスで", body: "テストを配って、学生ごと・単元ごとの状況を見る" },
  { key: "general", href: "/for-general", who: "一般の方へ", title: "理学療法士・病院を探す", body: "地域や専門分野から探せます" },
  { key: "org", href: "/for-org", who: "病院・施設・法人の方へ", title: "採用・求人・スカウト", body: "求人の掲載・職場の発信・PTへのスカウト" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebSite", name: SITE_NAME, url: SITE_URL, inLanguage: "ja", description: SITE_DESCRIPTION },
    {
      "@type": "WebApplication",
      name: SITE_NAME,
      url: SITE_URL,
      applicationCategory: "SocialNetworkingApplication",
      operatingSystem: "Web",
      description: SITE_DESCRIPTION,
      offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
    },
  ],
};

export default async function LandingPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const q = await searchParams;
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
  const entrance = pickLpEntrance(one(q.utm_source), one(q.utm_campaign));
  const registerHref = `/register?type=${entrance.register}`;
  // どのリンクから来たかで、並びの先頭（理学療法士／学生）を変える
  const doors = entrance.tab === "student" ? [DOORS[1], DOORS[0], DOORS[2], DOORS[3], DOORS[4]] : DOORS;

  return (
    <main className="lp min-h-screen bg-white text-[var(--lp-ink)]">
      <StandaloneRedirect />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(jsonLd) }} />
      <LpHeader registerHref={registerHref} />

      <section className="relative overflow-hidden bg-gradient-to-b from-[var(--lp-g100)] via-[var(--lp-g50)] to-white">
        <div className="relative mx-auto max-w-5xl px-6 pb-10 pt-9 md:pt-14">
          <h1 className={`${brush.className} pt-4 leading-[1.1] text-[var(--lp-g900)]`} style={{ fontSize: "clamp(2.4rem, 12vw, 5.2rem)" }}>
            <span className="whitespace-nowrap">
              <ruby className="text-[1.3em] text-[var(--lp-g700)]">
                PT<rt className="text-[0.26em] tracking-[0.3em] text-[var(--lp-g600)]">理学療法士</rt>
              </ruby>
              <span className="ml-1">のための、</span>
            </span>
            <br />
            アプリ。
          </h1>
          <p className="mt-4 text-base font-semibold leading-8 text-[var(--lp-g800)] md:text-lg">論文も、国試も、職場探しも。ぜんぶ無料で使えます。</p>
          <p className="mt-1 text-sm leading-7 text-gray-600">自分に近い立場の入口からどうぞ。</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {doors.map((d, i) => (
              <Link
                key={d.key}
                href={d.href}
                {...(i === 0 ? { "data-lp": "primary-entrance" } : {})}
                className={`block rounded-2xl p-4 transition active:scale-[0.99] ${
                  i === 0
                    ? "bg-relight-gradient shadow-[0_8px_20px_rgba(38,169,189,0.35)] hover:brightness-95"
                    : "border-2 border-[var(--lp-g700)] bg-white text-[var(--lp-g900)] hover:bg-[var(--lp-g50)]"
                }`}
              >
                <span className={`block text-[11px] font-bold ${i === 0 ? "text-[var(--on-brand)]/70" : "text-[var(--lp-g600)]"}`}>{d.who}</span>
                <span className="mt-0.5 block text-[15px] font-bold leading-snug">{d.title}</span>
                <span className={`mt-1 block text-xs leading-5 ${i === 0 ? "text-[var(--on-brand)]/80" : "text-gray-600"}`}>{d.body}</span>
                <span className={`mt-3 inline-block rounded-full px-4 py-1.5 text-xs font-bold ${i === 0 ? "bg-white text-[var(--lp-g800)]" : "bg-relight-gradient"}`}>詳しく見る →</span>
              </Link>
            ))}
          </div>

          <p className="mt-4 text-sm leading-7 text-gray-600">
            <Link href="/guest" className="font-bold text-[var(--lp-g700)] underline underline-offset-4">
              👀 ログインなしで、中を見てみる
            </Link>
            <br />
            登録は、メールアドレスだけ・1分
          </p>

        </div>

        <div className="relative mx-auto max-w-5xl px-6 pb-8">
          <p className={SECTION_LABEL}>RE:LIGHT IN NUMBERS</p>
          <dl className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.big} className="rounded-2xl border border-[var(--lp-g200)] bg-white px-4 py-3 text-center shadow-sm">
                <dt className="text-xl font-bold text-[var(--lp-g700)] md:text-2xl">{s.big}</dt>
                <dd className="mt-0.5 text-[11px] leading-4 text-gray-600">{s.small}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-white px-6 py-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-xl font-bold text-[var(--lp-g900)]">Re:light（リライト）とは</h2>
          <p className="mt-3 text-sm leading-7 text-gray-700">
            Re:light（リライト）は、理学療法士と、PTをめざす学生のための無料Webアプリです。論文を探すとき8つのサイトを行き来しなくて済むように、認定・専門の更新があとどれくらいか迷わないように、転職の前にあの病院の働き心地が分かるように──仕事まわりの調べものがここで済むことを目指して作っています。
            学生向けには国家試験の過去問が約2,500問（第49〜61回・解説つき）。先生はクラスにテストを配って、誰がどの単元でつまずいているかを見られます。
          </p>
          <p className="mt-3 text-sm leading-7 text-gray-700">
            登録に必要なのはメールアドレスだけで、1分あれば終わります。病院・施設・法人の採用担当の方は、組織として登録すると求人の掲載やPTへのスカウトができます。
          </p>
          <p className="mt-3 text-sm leading-7 text-gray-700">
            1年目の理学療法士の方には
            <Link href="/columns/first-year-rehab-basics" className="font-bold text-[var(--lp-g700)] underline underline-offset-4">
              リハの前に知っておくこと総まとめ（安全管理・疾患と手術・評価・制度）
            </Link>
            をおすすめしています。出典つきで書いたガイド99本の入口になっています。
          </p>
        </div>
      </section>

      <SafetySection registerHref={registerHref} />
      <LpFooter />
      <LpStickyCta registerHref={registerHref} />
    </main>
  );
}
