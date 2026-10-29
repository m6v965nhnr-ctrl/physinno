import type { Metadata } from "next";
import Link from "next/link";
import Screens from "@/components/lp/Screens";
import { SITE_NAME } from "@/lib/site";
import LpHeader from "@/components/lp/LpHeader";
import LpStickyCta from "@/components/lp/LpStickyCta";
import { BTN_PRIMARY, BTN_SECONDARY, FaqSection, FinalCta, GuideLinks, H2, LpFooter, PageJsonLd, SECTION_LABEL, SafetySection } from "@/components/lp/LpParts";

const TITLE = "大学・専門学校の先生へ｜国試の一問一答を、クラスで使う";
const DESCRIPTION =
  "理学療法士国家試験の過去問（第49〜61回）の一問一答を、クラスの課題として配れます。学生ごとの状況、単元ごとの正答率、正答率の低い問題が見られます。無料で、先生のアカウントを作れます。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/teachers" },
  openGraph: { title: `${TITLE}｜${SITE_NAME}`, description: DESCRIPTION, url: "/teachers", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title: `${TITLE}｜${SITE_NAME}`, description: DESCRIPTION },
};

// とくに押したい3つは、大きいカードで（他は、下の一覧で）
const BIG_FEATURES = [
  {
    icon: "📝",
    title: "一問一答で、そのままテストに",
    body: "第49〜61回・約2,500問の国試の一問一答から、単元・キーワードで選んでテストに。足りない分は、運営が確認したAI作成のオリジナル問題で補えます。下書きで問題を確かめてから、クラスへ配ります。",
  },
  {
    icon: "📚",
    title: "参考書の進み具合も、クラスで把握",
    body: "学生が参考書ごとに記録した、読んだページと理解度（0〜10）を、先生の画面でも見られます。表示するかどうかは参考書ごとに選べ、周回数は色の濃さで一目で分かります。",
  },
  {
    icon: "🎛",
    title: "学生に見せるものを、クラスごとに選べる",
    body: "学生ホームの「今日の学習」「校内ランキング」「国試・卒業までのカウントダウン」は、クラスごとに表示・非表示を選べます。ランキングなどがやる気をなくす原因になりそうなクラスでは、オフに（学生も個別に非表示にできます）。",
  },
];

const FEATURES = [
  { icon: "👥", title: "クラスは、参加コードだけ", body: "クラスを作ると、6文字の参加コードが出ます。学生がコードを入れるだけで参加できます。クラスのチャットで、学生にメッセージも送れます。" },
  { icon: "📊", title: "テストごとに、結果が見られる", body: "テストごとに、学生ごと・問題ごと・分野ごとの結果を、名前順や点数・正答率の高い順・低い順で並べ替えて見られます。学生の名前をタップすると、テストごとの得点の推移が、棒グラフで見られます。" },
  { icon: "📄", title: "PDFで保存して、ほかの先生にも共有", body: "単元ごと・テストごと・学生ごとの結果や、得点の推移を、PDFで保存できます。" },
  { icon: "🙋", title: "学生からの質問に、回答できる", body: "学生は、匿名でも先生に質問できます。回答は、クラスのチャットに流れて、クラスのみんなが読めます。" },
  { icon: "📈", title: "学生は、テストを振り返れる", body: "学生は、平均点・中央値・クラスでの順位・偏差値で、自分のテストを振り返れます。" },
];

const STEPS = [
  { title: "先生のアカウントを、無料でつくる", body: "お名前・学校名・学部名・学科名・アイコン画像・メールアドレスだけで、1分。PTのプロフィールなどは、いりません。" },
  { title: "運営が確認して、承認", body: "登録した所属をもとに、運営が先生であることを確認します。承認されると、クラスと課題を作れるようになります。" },
  { title: "クラスをつくり、コードを伝える", body: "学生は「クラスの課題」にコードを入れて参加。課題を配れば、結果が集まります。" },
];

const FAQS = [
  { q: "料金はかかりますか？", a: "いまは無料です。大学・学科としての使い方は、先生のご意見を聞きながら決めていきます。" },
  { q: "理学療法士でなくても登録できますか？", a: "はい。理学療法士でなくても、先生のアカウントを登録できます。" },
  { q: "テストの解説は、誰が作っていますか？", a: "AIが作成したもので、専門家の監修を受けていません。「AIが作成。誤りを含むことがある」と画面にも表示しています。先生に確認・監修していただける形を、ご相談したいと考えています。" },
  { q: "学生の個人情報は、先生に見えますか？", a: "先生に見えるのは、いまクラスにいる学生の、配ったテストの結果（名前・正誤）と、学生が「先生に見せる」をオンにした一問一答・参考書の進み具合だけです。クラスの作成・テストの配布・結果を見た操作は記録され、運営だけが確認できます。" },
  { q: "クラスの参加コードは、安全ですか？", a: "6文字のコードで、間違いが続くと、しばらく使えなくなります。学生はいつでもクラスを退出でき、退出すると先生の画面から消えます。" },
];

const registerHref = "/register?type=teacher";

export default function TeachersPage() {
  return (
    <main className="lp min-h-screen bg-white text-[var(--lp-ink)]">
      <PageJsonLd path="/teachers" name="理学療法士養成校の教員向け｜国試の一問一答をクラスで" description={DESCRIPTION} faqs={FAQS} />
      <LpHeader registerHref={registerHref} />

      <section className="relative overflow-hidden bg-gradient-to-b from-[var(--lp-g100)] via-[var(--lp-g50)] to-white">
        <div className="relative mx-auto max-w-3xl px-6 pb-12 pt-9 md:pb-16 md:pt-14">
          <p className={SECTION_LABEL}>FOR TEACHERS</p>
          <h1 className="mt-3 font-bold leading-[1.15] tracking-tight text-[var(--lp-g900)]" style={{ fontSize: "clamp(2rem, 9vw, 3.4rem)" }}>
            国試の一問一答を、
            <br />
            <span className="text-[var(--lp-g700)]">クラスで。</span>
          </h1>
          <p className="mt-4 text-base font-semibold leading-8 text-[var(--lp-g800)] md:text-lg">
            学生が使っている国試の過去問ドリルを、クラスの課題として配り、結果をまとめて見られます。
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href={registerHref} className={BTN_PRIMARY}>無料で、先生のアカウントをつくる</Link>
            <Link href="/login?next=/student/quiz/teacher" className={BTN_SECONDARY}>アカウントをお持ちの方</Link>
          </div>
          <p className="mt-2 text-xs leading-6 text-gray-500">料金は、いまは無料です。大学・学科としての使い方は、先生のご意見を聞きながら決めていきます。</p>
        </div>
      </section>

      <section className="bg-[var(--lp-g50)] px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <p className={SECTION_LABEL}>FEATURES</p>
          <h2 className={H2}>先生ができること</h2>

          <div className="mt-8 space-y-6">
            {BIG_FEATURES.map((f) => (
              <article key={f.title} className="rounded-3xl border border-[var(--lp-g200)] bg-white p-6 shadow-[0_8px_24px_rgba(8,76,91,0.08)] md:p-8">
                <h3 className="text-xl font-bold leading-snug text-[var(--lp-g900)]">{f.icon} {f.title}</h3>
                <p className="mt-2 text-sm leading-7 text-gray-700">{f.body}</p>
              </article>
            ))}

            <ul className="grid gap-4 md:grid-cols-2">
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
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <p className={SECTION_LABEL}>SCREENS</p>
          <h2 className={H2}>実際の画面です</h2>
          <p className="mt-2 text-sm leading-7 text-gray-600">結果は、学生ごと・問題ごと・分野ごとに見られます。学生の得点の推移も、グラフで確認できます。</p>
          <Screens
            items={[
              { name: "teacher-students-list", w: 600, h: 891, alt: "テストの結果を、学生ごとに一覧で見る画面", caption: "学生ごとの点数と、未提出" },
              { name: "teacher-fields", w: 600, h: 845, alt: "テストの結果を、分野ごとの正答率で見る画面", caption: "分野ごとの正答率（苦手の発見に）" },
              { name: "teacher-trend", w: 600, h: 523, alt: "ひとりの学生の、得点の推移を示す棒グラフ", caption: "学生の得点の推移" },
              { name: "teacher-class", w: 600, h: 1050, alt: "クラスの画面。クラスにテストを作る、分析を見る、質問、チャット", caption: "クラスの画面（参加コードで学生が参加）" },
            ]}
            note="画面は、デモ用のクラスと、仮の名前の学生です。実際の学生の情報ではありません。"
          />
        </div>
      </section>

      <GuideLinks
        title="先生にも役立つページ"
        items={[
          { href: "/kokushi", label: "国試過去問をいちど確かめる", body: "テストに使う前に、実際の問題と解説を見られます。" },
          { href: "/schools", label: "養成校の国試合格状況", body: "学校ごとの合格状況を、調べられます。" },
        ]}
      />
      <SafetySection registerHref={registerHref} />

      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <p className={SECTION_LABEL}>HOW TO START</p>
          <h2 className={H2}>使いはじめるまで</h2>
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

      <section className="bg-[var(--lp-g50)] px-6 py-16" aria-labelledby="t-safe">
        <div className="mx-auto max-w-3xl">
          <p className={SECTION_LABEL}>STUDENT PRIVACY</p>
          <h2 id="t-safe" className={H2}>学生の情報について</h2>
          <ul className="mt-6 list-disc space-y-2 rounded-2xl border border-[var(--lp-g200)] bg-white p-6 pl-10 text-sm leading-7 text-gray-700">
            <li>先生に見えるのは、いまクラスにいる学生の、<strong>配ったテストの結果（名前・正誤）</strong>と、学生が「先生に見せる」をオンにした<strong>一問一答・参考書の進み具合</strong>です。共有は、学生が選び、あとからいつでも変えられます。</li>
            <li>学生は、いつでもクラスを退出できます。退出すると、先生の画面から消えます。</li>
            <li>先生の機能は、運営が確認して承認します。クラスの作成・テストの配布・結果を見た操作は記録され、運営だけが確認できます。不適切な利用があれば、運営が、その先生の機能を停止します。</li>
            <li>クラスの参加コードは、間違いが続くと、しばらく使えなくなります。</li>
            <li>学生どうしのランキングは、学生が非表示にできます。</li>
          </ul>
        </div>
      </section>

      <section className="bg-white px-6 py-16" aria-labelledby="t-note">
        <div className="mx-auto max-w-3xl">
          <h2 id="t-note" className={H2}>お伝えしておきたいこと</h2>
          <ul className="mt-6 list-disc space-y-2 pl-5 text-sm leading-7 text-gray-700">
            <li>問題・正答は、厚生労働省が公開している国家試験のものです（第49〜61回）。</li>
            <li>まだ立ち上げたばかりで、先生の機能は、これから先生のご意見で育てていくものです。「こんな機能があれば使いたい」を、教えてください。</li>
          </ul>
          <div className="mt-6">
            <Link href="/feedback" className={BTN_SECONDARY}>ご意見・ご要望を送る（登録なし・匿名）</Link>
          </div>
        </div>
      </section>

      <FaqSection faqs={FAQS} />
      <FinalCta registerHref={registerHref} title="国試の一問一答を、クラスで。" />
      <LpFooter audience="teacher" />
      <LpStickyCta registerHref={registerHref} />
    </main>
  );
}
