import type { Metadata } from "next";
import Link from "next/link";
import LpHeader from "@/components/lp/LpHeader";
import LpStickyCta from "@/components/lp/LpStickyCta";
import { BTN_PRIMARY, BTN_SECONDARY, FaqSection, FinalCta, H2, LpFooter, PageJsonLd, SECTION_LABEL, SafetySection } from "@/components/lp/LpParts";
import { SITE_NAME } from "@/lib/site";

const TITLE = "理学療法士の採用・スカウト｜病院・施設・法人の方へ";
const DESCRIPTION = "病院・施設・企業の採用担当向け。組織を登録すると、求人の掲載、職場の発信、PTへのスカウトができます。人柄ややる気が分かるプロフィールから、長く働いてくれるPTを探せます。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["理学療法士 採用", "PT 求人 掲載", "理学療法士 スカウト", "リハビリ 施設 採用"],
  alternates: { canonical: "/for-org" },
  openGraph: { title: `${TITLE}｜${SITE_NAME}`, description: DESCRIPTION, url: "/for-org", images: ["/opengraph-image"] },
};

const FEATURES = [
  { icon: "📋", title: "求人を、無料で掲載できる", body: "組織を登録して、運営の確認が済むと、求人を掲載できます。職場の日常や取り組みも、投稿で発信できます。" },
  { icon: "🔎", title: "人柄ややる気が、分かる", body: "PTのプロフィールには、PTになった理由・大切にしていること・いま学んでいることが載っています。資格だけでは分からない部分から、職場に合う人を探せます。" },
  { icon: "✉️", title: "PTに、直接スカウトできる", body: "スカウトを受け付けているPTには、働き方の希望（勤務地・働き始めの時期など）も見たうえで、直接メッセージを送れます。" },
];
const FAQS = [
  { q: "料金はかかりますか？", a: "登録・求人の掲載・スカウトは、無料です。" },
  { q: "登録してすぐ、求人を出せますか？", a: "アカウントを作って組織の情報を入れると、運営が内容を確認します。確認が済むと、求人の公開とスカウトができます。" },
  { q: "病院でなくても登録できますか？", a: "はい。病院のほか、介護・福祉の施設、訪問リハビリ、企業など、理学療法士を採用したい組織が対象です。" },
];

const registerHref = "/register?type=org";

export default function ForOrgPage() {
  return (
    <main className="lp min-h-screen bg-white text-[var(--lp-ink)]">
      <PageJsonLd path="/for-org" name="理学療法士の採用・スカウト（病院・施設・法人向け）" description={DESCRIPTION} faqs={FAQS} />
      <LpHeader registerHref={registerHref} />

      <section className="relative overflow-hidden bg-gradient-to-b from-[var(--lp-g100)] via-[var(--lp-g50)] to-white">
        <div className="relative mx-auto max-w-3xl px-6 pb-12 pt-9 md:pb-16 md:pt-14">
          <p className={SECTION_LABEL}>FOR ORGANIZATIONS</p>
          <h1 className="mt-3 font-bold leading-[1.15] tracking-tight text-[var(--lp-g900)]" style={{ fontSize: "clamp(2rem, 9vw, 3.4rem)" }}>
            職場に合うPTを、
            <br />
            <span className="text-[var(--lp-g700)]">人柄から探せる。</span>
          </h1>
          <p className="mt-4 text-base font-semibold leading-8 text-[var(--lp-g800)] md:text-lg">求人の掲載も、スカウトも、無料です。</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href={registerHref} className={BTN_PRIMARY}>採用担当として無料ではじめる</Link>
            <Link href="/home/pt-search" className={BTN_SECONDARY}>登録せずに、PT検索を見てみる</Link>
          </div>
        </div>
      </section>

      <section className="bg-[var(--lp-g50)] px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <p className={SECTION_LABEL}>FEATURES</p>
          <h2 className={H2}>できること</h2>
          <ul className="mt-6 grid gap-4">
            {FEATURES.map((f) => (
              <li key={f.title} className="flex gap-4 rounded-2xl border border-[var(--lp-g200)] bg-white p-5 shadow-sm">
                <span aria-hidden="true" className="text-2xl">{f.icon}</span>
                <div>
                  <h3 className="text-base font-bold text-[var(--lp-g900)]">{f.title}</h3>
                  <p className="mt-1 text-sm leading-7 text-gray-700">{f.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <p className={SECTION_LABEL}>HOW IT WORKS</p>
          <h2 className={H2}>はじめかた（3ステップ）</h2>
          <ol className="mt-6 grid gap-4">
            {[
              ["1", "アカウントを作る", "担当者の名前とメールアドレスだけで、1分で登録できます。"],
              ["2", "組織の情報を入れる", "組織名・種類・所在地・公式サイトを入れると、運営が内容を確認します。"],
              ["3", "求人の掲載・スカウト", "確認が済むと、求人の公開、職場の発信、PTへのスカウトができます。"],
            ].map(([n, title, body]) => (
              <li key={n} className="flex gap-4 rounded-2xl border border-[var(--lp-g200)] bg-white p-5 shadow-sm">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-relight-gradient text-sm font-bold">{n}</span>
                <div>
                  <h3 className="text-base font-bold text-[var(--lp-g900)]">{title}</h3>
                  <p className="mt-1 text-sm leading-7 text-gray-700">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <SafetySection registerHref={registerHref} />
      <FaqSection faqs={FAQS} />
      <FinalCta registerHref={registerHref} title="長く働いてくれるPTと、出会う。" />
      <LpFooter audience="org" />
      <LpStickyCta registerHref={registerHref} />
    </main>
  );
}
