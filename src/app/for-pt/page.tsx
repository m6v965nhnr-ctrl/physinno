import type { Metadata } from "next";
import Link from "next/link";
import LpHeader from "@/components/lp/LpHeader";
import LpStickyCta from "@/components/lp/LpStickyCta";
import { BTN_PRIMARY, BTN_SECONDARY, FaqSection, FinalCta, GuideLinks, H2, LpFooter, PageJsonLd, SECTION_LABEL, SafetySection } from "@/components/lp/LpParts";
import { MockHospital, MockIdeas, MockPaperSearch, MockPost } from "@/components/lp/Mocks";
import Screens from "@/components/lp/Screens";
import { EVIDENCE_LEVELS } from "@/lib/evidence";
import { SITE_NAME } from "@/lib/site";

const TITLE = "理学療法士向けアプリ｜論文検索・認定PTの進捗・研修情報・病院の口コミ";
const DESCRIPTION = "理学療法士のための無料アプリ。論文を8サイトまとめて検索（日本語でOK）、認定・専門理学療法士の更新の進捗、研修・学会の情報、病院の口コミと転職の下調べまで。症例・学会発表は、投稿するだけで実績に。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["理学療法士", "論文検索", "認定理学療法士", "専門理学療法士", "研修", "学会", "病院 口コミ", "転職", "エビデンスレベル", "症例報告"],
  alternates: { canonical: "/for-pt" },
  openGraph: { title: `${TITLE}｜${SITE_NAME}`, description: DESCRIPTION, url: "/for-pt", images: ["/opengraph-image"] },
};

const PAINS = [
  { icon: "🔎", text: "いい論文を探すのに、サイトを何個も行き来している" },
  { icon: "🏅", text: "認定・専門PTの更新に、あと何が必要か分からない" },
  { icon: "🗓", text: "研修・学会の情報が散らばっていて、探しにくい" },
  { icon: "🏥", text: "転職の前に、職場の給与・休日・雰囲気を知りたい" },
];
const SITES = ["PubMed", "J-STAGE", "CiNii Research", "Semantic Scholar", "Europe PMC", "OpenAlex", "ClinicalTrials.gov", "DOAJ"];

const SMALL_FEATURES = [
  { icon: "🏅", title: "資格の進捗が、ひと目で", body: "登録・認定・専門理学療法士の条件を一覧にして、「あと何をすればいいか」が分かります。更新の点数の目安も。" },
  { icon: "🗂", title: "実績が、自然にたまる", body: "症例・学会発表・研修を投稿するだけで、経歴と実績がポートフォリオに整い、PDFで保存・共有できます。" },
  { icon: "🗓", title: "研修・学会を、逃さない", body: "協会や各士会などが公開している研修・学会の情報を、毎日自動で集約。気になるものは保存できます。" },
  { icon: "👥", title: "本音で、相談できる", body: "病院や専門分野ごとの、公開範囲を限った場をつくれます。一人職場や新人の相談相手づくりにも。" },
];
const STEPS = [
  { title: "メールアドレスで無料登録", body: "アカウントの種類で「PT（理学療法士）」を選ぶだけ。1分です。" },
  { title: "お名前を入力", body: "プロフィールは、あとから少しずつでOK。" },
  { title: "まずは、読む・探す", body: "気になる論文や研修を探すところから。慣れたら、経験も共有しましょう。" },
];
const FAQS = [
  { q: "料金はかかりますか？", a: "理学療法士の方は、登録も基本機能も無料です。" },
  { q: "登録しなくても、中を見られますか？", a: "はい。「ログインなしで、中を見てみる」から理学療法士を選ぶと、ログインなしで、ホーム・論文検索・臨床アイデア・病院情報などの画面を見て触れます。" },
  { q: "口コミは、本当に匿名で投稿できますか？", a: "はい。口コミの投稿は理学療法士アカウントのみで、匿名も選べます。投稿者の情報は、ほかの人には返しません。ただし、権利侵害など法令上必要な場合は、規約に基づき、投稿者の情報を開示することがあります。" },
  { q: "セキュリティは、大丈夫ですか？", a: "データの保管にはSupabase（保存先は東京）、配信にはVercelを使い、どちらもSOC 2 Type 2・ISO 27001に関する認証・準拠を公表している事業者です（各社の発表）。そのうえで、通信の暗号化、本人以外が読めないデータベースの制限、非公開の保管庫、匿名の投稿でも投稿者を返さない仕組み、AI機能の利用回数の上限などを入れ、テストで定期的に点検しています。ただし、どんなサービスでも、絶対に安全とは言い切れません。患者さんが特定される情報は、投稿しないでください。不審な点に気づいたときは、意見箱か「運営へのメッセージ」から、お知らせください。" },
  { q: "研修・学会情報は、どこから集めていますか？", a: "日本理学療法士協会や各都道府県の理学療法士会などが公開している情報をもとに、毎日自動で更新しています。" },
  { q: "AIモードとは何ですか？", a: "普通の文章で質問すると、見つかった論文の内容だけをもとに、引用番号つきで日本語で回答する機能です。質問文は外部のAI事業者（Google）に送信されるため、氏名や患者さんが特定できる情報は入力しないでください。回答は参考情報なので、原文でご確認ください。" },
  { q: "症例を投稿するとき、気をつけることは？", a: "患者さんが特定される情報（氏名・日付・施設名など）は、書かずに投稿してください。公開範囲や匿名も選べます。" },
  { q: "年収や休日で病院を絞れますか？", a: "はい。病院の公式サイトなどで公開されている情報から、順に拡充中です。情報のある病院から、年収・雇用形態・休日・アクセスで絞れます。最新は、各病院の採用ページでご確認ください。" },
];

const LEVELS = EVIDENCE_LEVELS.map((l) => `${l.key} ${l.short}`);
const registerHref = "/register?type=pt";

export default function ForPtPage() {
  return (
    <main className="lp min-h-screen bg-white text-[var(--lp-ink)]">
      <PageJsonLd path="/for-pt" name="理学療法士向けアプリ" description={DESCRIPTION} faqs={FAQS} />
      <LpHeader registerHref={registerHref} />

      <section className="relative overflow-hidden bg-gradient-to-b from-[var(--lp-g100)] via-[var(--lp-g50)] to-white">
        <div className="relative mx-auto max-w-5xl px-6 pb-12 pt-9 md:flex md:items-center md:gap-12 md:pb-16 md:pt-14">
          <div className="md:flex-1">
            <p className={SECTION_LABEL}>FOR PHYSICAL THERAPISTS</p>
            <h1 className="mt-3 font-bold leading-[1.15] tracking-tight text-[var(--lp-g900)]" style={{ fontSize: "clamp(2rem, 9vw, 3.4rem)" }}>
              理学療法士の学びを、
              <br />
              <span className="text-[var(--lp-g700)]">これ1つに。</span>
            </h1>
            <p className="mt-4 text-base font-semibold leading-8 text-[var(--lp-g800)] md:text-lg">調べる・記録する・つながる。ぜんぶ、無料。</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href={registerHref} className={BTN_PRIMARY}>理学療法士として無料ではじめる</Link>
              <Link href="/guest" className={BTN_SECONDARY}>👀 ログインなしで、中を見てみる</Link>
            </div>
          </div>
          <div className="mt-10 hidden md:mt-0 md:block">
            <MockPaperSearch />
          </div>
        </div>
      </section>

      {/* ② 悩み */}
      <section className="bg-white px-6 py-14">
        <div className="mx-auto max-w-5xl">
          <p className={SECTION_LABEL}>PROBLEM</p>
          <h2 className={H2}>こんなこと、ありませんか？</h2>
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {PAINS.map((p) => (
              <li key={p.text} className="flex items-center gap-4 rounded-2xl border border-[var(--lp-g100)] bg-[var(--lp-g50)] px-5 py-4 text-[15px] font-medium leading-7 text-gray-800">
                <span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-xl shadow-sm">{p.icon}</span>
                {p.text}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center text-lg font-bold text-[var(--lp-g800)]">
            ↓ Re:lightは、この全部に、答えます。
          </p>
        </div>
      </section>

      {/* ③ できること（1機能1メッセージ。同じ説明は、ほかに出さない） */}
      <section id="features" className="bg-[var(--lp-g50)] px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <p className={SECTION_LABEL}>FEATURES</p>
          <h2 className={H2}>Re:lightで、できること</h2>

          <div className="mt-8 space-y-6">
            {/* 論文 */}
            <article className="rounded-3xl border border-[var(--lp-g200)] bg-white p-6 shadow-[0_8px_24px_rgba(8,76,91,0.08)] md:p-8">
              <h3 className="text-xl font-bold leading-snug text-[var(--lp-g900)]">📚 論文を、8サイトまとめて探す</h3>
              <p className="mt-2 text-sm leading-7 text-gray-700">
                日本語で検索すれば、自動で英語にも変換して、海外の論文も一緒に探します。見つけた論文は、エビデンスレベルで絞り込め、要約の日本語訳も読めます。普通の文章で質問する「AIモード」では、見つかった論文だけをもとに、引用番号つきで答えます。
              </p>
              <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="対応サイト">
                {SITES.map((s) => (
                  <li key={s} className="rounded-full border border-[var(--lp-g200)] bg-[var(--lp-g50)] px-3 py-1 text-xs font-medium text-[var(--lp-g800)]">{s}</li>
                ))}
              </ul>
              <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="エビデンスレベル">
                {LEVELS.map((l) => (
                  <li key={l} className="rounded-md bg-[var(--lp-g100)] px-2.5 py-1 text-[11px] font-semibold text-[var(--lp-g900)]">{l}</li>
                ))}
              </ul>
              <Link href="/evidence-levels" className="mt-4 inline-block text-sm font-bold text-[var(--lp-g700)] underline underline-offset-4">
                エビデンスレベル早見表を見る →
              </Link>
            </article>

            {/* 臨床アイデア */}
            <article className="rounded-3xl border border-[var(--lp-g200)] bg-white p-6 shadow-[0_8px_24px_rgba(8,76,91,0.08)] md:p-8">
              <h3 className="text-xl font-bold leading-snug text-[var(--lp-g900)]">💡 疾患から、評価とリハビリのアイデアを引く</h3>
              <p className="mt-2 text-sm leading-7 text-gray-700">
                診療報酬の区分から疾患を選ぶと、まず見たい評価と、リハビリのアイデアが見られます。自分のアイデアを登録して共有でき、「実践した」の数で、よく使われているものが分かります。AIに相談もできます。
              </p>
              <p className="mt-2 text-[11px] leading-5 text-gray-500">公開されているガイドライン等をもとにした一般的な参考情報です。実際の判断は、医師の指示とご自身の評価に従ってください。</p>
            </article>

            {/* 病院 */}
            <article className="rounded-3xl border border-[var(--lp-g200)] bg-white p-6 shadow-[0_8px_24px_rgba(8,76,91,0.08)] md:flex md:items-center md:gap-8 md:p-8">
              <div className="md:flex-1">
                <h3 className="text-xl font-bold leading-snug text-[var(--lp-g900)]">🏥 職場選びに、リアルな情報を</h3>
                <p className="mt-2 text-sm leading-7 text-gray-700">
                  全国約5,000の病院を、地域から探せます。年収・雇用形態・休日・アクセスでの絞り込みと、現役PTによる口コミ（残業・教育体制・女性の働きやすさなど）を、匿名で投稿・閲覧できます。
                </p>
                <Link href="/pts?mode=hospitals" className="mt-4 inline-block text-sm font-bold text-[var(--lp-g700)] underline underline-offset-4">
                  病院を探してみる（登録不要）→
                </Link>
              </div>
              <div className="mt-6 flex justify-center md:mt-0">
                <MockHospital />
              </div>
            </article>

            {/* 小さい機能 */}
            <ul className="grid gap-4 md:grid-cols-2">
              {SMALL_FEATURES.map((f) => (
                <li key={f.title} className="flex gap-4 rounded-2xl border border-[var(--lp-g200)] bg-white p-5 shadow-sm">
                  <span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--lp-g100)] text-xl">{f.icon}</span>
                  <div>
                    <h3 className="text-base font-bold text-[var(--lp-g900)]">{f.title}</h3>
                    <p className="mt-1 text-sm leading-7 text-gray-700">{f.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 text-center">
            <Link href={registerHref} className={BTN_PRIMARY}>無料ではじめる →</Link>
          </div>
        </div>
      </section>

      {/* ④ こんな画面です／中を見てみる */}
      <section id="inside" className="bg-white px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <p className={SECTION_LABEL}>PREVIEW</p>
          <h2 className={H2}>こんな画面です</h2>
          <p className="mt-2 text-sm leading-7 text-gray-600">登録しなくても、中を見て触れます。気に入ったら、そのまま無料登録へ。</p>
          <div className="mt-8 flex snap-x gap-6 overflow-x-auto pb-4 md:justify-center">
            <div className="snap-center"><MockPost /></div>
            <div className="snap-center"><MockIdeas /></div>
          </div>
          <Screens
            items={[
              { name: "paper-search", w: 600, h: 1043, alt: "論文を探す画面。PubMedやJ-STAGEなどをまとめて検索できる", caption: "論文を、複数のサイトからまとめて検索" },
              { name: "seminars", w: 600, h: 959, alt: "研修・学会情報の検索画面。開催日が近い順に表示される", caption: "研修・学会情報を、開催日が近い順に" },
              { name: "qualification", w: 600, h: 1030, alt: "資格の目標の画面。認定理学療法士の条件と進み具合", caption: "資格の取得・更新の、条件と進み具合" },
              { name: "hospital-review-form", w: 600, h: 1040, alt: "病院の職場環境の口コミを投稿する画面。給与や残業などを10点満点で答える", caption: "職場環境の口コミは、匿名でも投稿できます" },
            ]}
            note="画面は開発中のものです。表示は、今後変わることがあります。"
          />
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/guest" className={BTN_SECONDARY}>👀 アプリの中を見てみる</Link>
          </div>
        </div>
      </section>

      <GuideLinks
        title="調べものに、すぐ使えるガイド"
        items={[
          { href: "/paper-search", label: "論文検索ガイド", body: "8つの論文サイトの使い分けと、テーマ別の探し方。" },
          { href: "/certified-pt", label: "認定理学療法士ガイド", body: "分野ごとの認定の条件と、更新に必要なことの整理。" },
          { href: "/evidence-levels", label: "エビデンスレベル早見表", body: "論文のレベルを、すぐ確かめられる一覧。" },
          { href: "/hospital-areas", label: "病院を都道府県から探す", body: "全国の病院を、地域から。口コミも参考に。" },
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
      <FinalCta registerHref={registerHref} title="理学療法士の学びと経験を、ひとつに。" />
      <LpFooter audience="pt" />
      <LpStickyCta registerHref={registerHref} />
    </main>
  );
}
