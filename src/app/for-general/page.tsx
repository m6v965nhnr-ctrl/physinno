import type { Metadata } from "next";
import Link from "next/link";
import LpHeader from "@/components/lp/LpHeader";
import LpStickyCta from "@/components/lp/LpStickyCta";
import { BTN_PRIMARY, BTN_SECONDARY, FaqSection, FinalCta, H2, LpFooter, SECTION_LABEL, SafetySection } from "@/components/lp/LpParts";
import { SITE_NAME } from "@/lib/site";

const TITLE = "一般の方へ｜理学療法士・病院を、地域から探す";
const DESCRIPTION = "地域や専門分野から理学療法士を探せます。全国約5,000の病院も、登録なしで探せる、無料のWebアプリです。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/for-general" },
  openGraph: { title: `${TITLE}｜${SITE_NAME}`, description: DESCRIPTION, url: "/for-general" },
};

const FEATURES = [
  { icon: "🔎", title: "理学療法士を、探せる", body: "一般アカウントで無料登録すると、地域や専門分野から、理学療法士を探せます。" },
  { icon: "🏥", title: "病院を、地域から探せる", body: "全国約5,000の病院を、地域から探せます（登録なしで見られます）。診療科や、現役PTの口コミも参考になります。" },
  { icon: "✍️", title: "レビューを書ける", body: "一般アカウントで、理学療法士のレビューを書けます。" },
];
const FAQS = [
  { q: "料金はかかりますか？", a: "一般の方も、登録と基本機能は無料です。" },
  { q: "理学療法士でなくても使えますか？", a: "はい。一般アカウントで登録すると、地域や専門分野から理学療法士を探したり、レビューを書いたりできます。" },
  { q: "登録しなくても、病院を探せますか？", a: "はい。病院を探す画面は、登録なしで見られます。" },
];

const registerHref = "/register?type=general";

export default function ForGeneralPage() {
  return (
    <main className="lp min-h-screen bg-white text-[var(--lp-ink)]">
      <LpHeader registerHref={registerHref} />

      <section className="relative overflow-hidden bg-gradient-to-b from-[var(--lp-g100)] via-[var(--lp-g50)] to-white">
        <div className="relative mx-auto max-w-3xl px-6 pb-12 pt-9 md:pb-16 md:pt-14">
          <p className={SECTION_LABEL}>FOR EVERYONE</p>
          <h1 className="mt-3 font-bold leading-[1.15] tracking-tight text-[var(--lp-g900)]" style={{ fontSize: "clamp(2rem, 9vw, 3.4rem)" }}>
            理学療法士と、病院を、
            <br />
            <span className="text-[var(--lp-g700)]">探せます。</span>
          </h1>
          <p className="mt-4 text-base font-semibold leading-8 text-[var(--lp-g800)] md:text-lg">登録も基本機能も、無料です。</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href={registerHref} className={BTN_PRIMARY}>一般の方として無料ではじめる</Link>
            <Link href="/pts?mode=hospitals" className={BTN_SECONDARY}>登録せずに、病院を探す</Link>
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

      <SafetySection registerHref={registerHref} />
      <FaqSection faqs={FAQS} />
      <FinalCta registerHref={registerHref} title="あなたに合う、理学療法士を探す。" />
      <LpFooter />
      <LpStickyCta registerHref={registerHref} />
    </main>
  );
}
