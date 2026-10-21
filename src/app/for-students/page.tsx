import type { Metadata } from "next";
import Link from "next/link";
import LpHeader from "@/components/lp/LpHeader";
import LpStickyCta from "@/components/lp/LpStickyCta";
import { BTN_PRIMARY, BTN_SECONDARY, FaqSection, FinalCta, GuideLinks, H2, LpFooter, PageJsonLd, SECTION_LABEL, SafetySection } from "@/components/lp/LpParts";
import { MockKokushi } from "@/components/lp/Mocks";
import { SITE_NAME } from "@/lib/site";

const TITLE = "理学療法士国家試験の過去問アプリ｜学生向け・無料・解説つき";
const DESCRIPTION = "理学療法士をめざす学生のための無料アプリ。国家試験の過去問（第56〜61回）を一問一答で解説つきに、間違えた問題の復習と模擬試験、筋・骨の起始停止の確認、先生のクラスのテストと振り返り、実習・就活の管理まで。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["理学療法士 国家試験", "過去問", "一問一答", "解説", "模擬試験", "筋 起始停止", "実習", "就職活動", "理学療法学生"],
  alternates: { canonical: "/for-students" },
  openGraph: { title: `${TITLE}｜${SITE_NAME}`, description: DESCRIPTION, url: "/for-students", images: ["/opengraph-image"] },
};

const STUDENT_FEATURES = [
  { icon: "📝", title: "国試の過去問ドリル", body: "第56〜61回の全1,200問。解説、間違えた問題の復習、時間を計る模擬試験（一時停止もできます）、科目ごとの正答率。" },
  { icon: "🦴", title: "解説から、筋・骨をすぐ確かめる", body: "解説に出てきた筋と骨の、起始・停止・支配神経・作用を、1タップで確認できます。" },
  { icon: "🎓", title: "先生のクラスで、テストと振り返り", body: "先生が配ったテストを解くと、平均点・中央値・順位・偏差値で振り返れます。先生への質問は、匿名でも送れます。" },
  { icon: "🗂", title: "実習・就活の管理", body: "実習先、病院見学、応募、提出物の期限を、ひとつに。" },
  { icon: "⏱", title: "国試カウントダウンと学習ログ", body: "試験日までの日数、科目ごとの勉強時間、連続記録。" },
  { icon: "🙋", title: "実習先の口コミと、先輩への質問", body: "実習生の声が見られ、現役のPTに匿名で質問できます。" },
];
const STEPS = [
  { title: "メールアドレスで無料登録", body: "アカウントの種類で「学生（PTをめざす）」を選ぶだけ。1分です。" },
  { title: "名前と、学校・卒業予定年を入力", body: "国試までの日数は、卒業予定年から自動で計算します。" },
  { title: "まずは、一問一答から", body: "過去問を1問解くところから。先生のクラスに入ると、テストも届きます。" },
];
const FAQS = [
  { q: "料金はかかりますか？", a: "学生も、登録と基本機能は無料です。" },
  { q: "登録しなくても、過去問を解けますか？", a: "はい。「登録せずに過去問を解く」から、ログインなしで解けます。" },
  { q: "卒業したら、どうなりますか？", a: "国家試験を受けた年の4月1日に、自動で、理学療法士のアカウントに切り替わります。" },
  { q: "先生のクラスに入るには？", a: "先生から送られた、6文字の参加コードを入れるだけです。参加すると、先生のテストを解いたり、クラスのチャットで先生に質問したりできます。" },
];

const registerHref = "/register?type=student";

export default function ForStudentsPage() {
  return (
    <main className="lp min-h-screen bg-white text-[var(--lp-ink)]">
      <PageJsonLd path="/for-students" name="理学療法士国家試験の過去問アプリ（学生向け）" description={DESCRIPTION} faqs={FAQS} />
      <LpHeader registerHref={registerHref} />

      <section className="relative overflow-hidden bg-gradient-to-b from-[var(--lp-g100)] via-[var(--lp-g50)] to-white">
        <div className="relative mx-auto max-w-5xl px-6 pb-12 pt-9 md:flex md:items-center md:gap-12 md:pb-16 md:pt-14">
          <div className="md:flex-1">
            <p className={SECTION_LABEL}>FOR STUDENTS</p>
            <h1 className="mt-3 font-bold leading-[1.15] tracking-tight text-[var(--lp-g900)]" style={{ fontSize: "clamp(2rem, 9vw, 3.4rem)" }}>
              国試・実習・就活を、
              <br />
              <span className="text-[var(--lp-g700)]">これ1つに。</span>
            </h1>
            <p className="mt-4 text-base font-semibold leading-8 text-[var(--lp-g800)] md:text-lg">理学療法士をめざす学生のための、無料のアプリです。</p>
            <p className="mt-1 text-sm leading-7 text-gray-600">卒業したら、そのままPTのアカウントに切り替わります。</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href={registerHref} className={BTN_PRIMARY}>学生として無料ではじめる</Link>
              <Link href="/kokushi" className={BTN_SECONDARY}>登録せずに過去問を解く</Link>
            </div>
          </div>
          <div className="mt-10 flex justify-center md:mt-0">
            <MockKokushi />
          </div>
        </div>
      </section>

      <section className="bg-[var(--lp-g50)] px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <p className={SECTION_LABEL}>FEATURES</p>
          <h2 className={H2}>学生が、使えること</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {STUDENT_FEATURES.map((f) => (
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

      <GuideLinks
        title="登録しなくても読める、学生向けのページ"
        items={[
          { href: "/kokushi", label: "国家試験の過去問", body: "第56〜61回の問題と正答を、解説つきで解けます。" },
          { href: "/columns/muscles", label: "筋の起始・停止・支配神経・作用の一覧", body: "213の筋を、部位ごとに。図つき。" },
          { href: "/columns/bones", label: "骨の一覧", body: "骨の特徴・関節・付着する筋を、図つきで。" },
          { href: "/schools", label: "養成校の国試合格状況", body: "学校ごとの合格状況を、調べられます。" },
          { href: "/job-hunting", label: "就活ガイド", body: "病院選びと、応募までの流れ。" },
        ]}
      />
      <SafetySection registerHref={registerHref} />

      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <p className={SECTION_LABEL}>HOW TO START</p>
          <h2 className={H2}>はじめ方は、3ステップ</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.title} className="relative rounded-2xl border border-[var(--lp-g200)] bg-[var(--lp-g50)] p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-relight-gradient text-sm font-bold">{i + 1}</span>
                <h3 className="mt-3 text-base font-bold text-[var(--lp-g900)]">{s.title}</h3>
                <p className="mt-1 text-sm leading-7 text-gray-700">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FaqSection faqs={FAQS} />
      <FinalCta registerHref={registerHref} title="国試まで、毎日1問から。" />
      <LpFooter audience="student" />
      <LpStickyCta registerHref={registerHref} />
    </main>
  );
}
