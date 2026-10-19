import { ldJson } from "@/lib/jsonLd";
import Link from "next/link";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import { PIXEL_ENABLED } from "@/lib/metaPixel";
import { EVIDENCE_LEVELS } from "@/lib/evidence";
import LpStickyCta from "@/components/lp/LpStickyCta";
import StandaloneRedirect from "@/components/StandaloneRedirect";
import { pickLpEntrance } from "@/lib/lpEntrance";
import { MockHospital, MockIdeas, MockKokushi, MockPaperSearch, MockPost } from "@/components/lp/Mocks";

// 検索・SNSから来た人が「自分向けだ」と分かり、そのまま登録できるトップページ（Server Component：本文がHTMLに含まれる）
// 流れ: 興味を引く（最初の画面）→ 悩み → できること → 画面を見る／中を見てみる → 学生 → 安心 → はじめ方 → FAQ → 登録
// 背景は、白 → 薄い緑 → 濃い緑 と変えて、区切りをはっきりさせる。同じ説明は、1か所だけ。

const BUBBLES = ["あの論文、どこだっけ？", "認定PT、あと何をすれば？", "今度の研修、いつだっけ？"];

const STATS = [
  { big: "完全無料", small: "登録も基本機能も" },
  { big: "8サイト", small: "論文をまとめて検索" },
  { big: "1,200問", small: "国試の過去問（第56〜61回）" },
  { big: "約5,000", small: "全国の病院を探せる" },
];

const PAINS = [
  { icon: "🔎", text: "いい論文を探すのに、サイトを何個も行き来している" },
  { icon: "🏅", text: "認定・専門PTの更新に、あと何が必要か分からない" },
  { icon: "🗓", text: "研修・学会の情報が散らばっていて、探しにくい" },
  { icon: "🏥", text: "転職の前に、職場の給与・休日・雰囲気を知りたい" },
];

const SITES = ["PubMed", "J-STAGE", "CiNii Research", "Semantic Scholar", "Europe PMC", "OpenAlex", "ClinicalTrials.gov", "DOAJ"];
const LEVELS = EVIDENCE_LEVELS.map((l) => `${l.key} ${l.short}`);

const SMALL_FEATURES = [
  { icon: "🏅", title: "資格の進捗が、ひと目で", body: "登録・認定・専門理学療法士の条件を一覧にして、「あと何をすればいいか」が分かります。更新の点数の目安も。" },
  { icon: "🗂", title: "実績が、自然にたまる", body: "症例・学会発表・研修を投稿するだけで、経歴と実績がポートフォリオに整い、PDFで保存・共有できます。" },
  { icon: "🗓", title: "研修・学会を、逃さない", body: "協会や各士会などが公開している研修・学会の情報を、毎日自動で集約。気になるものは保存できます。" },
  { icon: "👥", title: "本音で、相談できる", body: "病院や専門分野ごとの、公開範囲を限った場をつくれます。一人職場や新人の相談相手づくりにも。" },
];

const STUDENT_FEATURES = [
  { icon: "📝", title: "国試の過去問ドリル", body: "第56〜61回の全1,200問。解説、間違えた問題の復習、時間を計る模擬試験、科目ごとの正答率。" },
  { icon: "🗂", title: "実習・就活の管理", body: "実習先、病院見学、応募、提出物の期限を、ひとつに。" },
  { icon: "⏱", title: "国試カウントダウンと学習ログ", body: "試験日までの日数、科目ごとの勉強時間、連続記録。" },
  { icon: "🙋", title: "実習先の口コミと、先輩への質問", body: "実習生の声が見られ、現役のPTに匿名で質問できます。" },
];

const SAFETY = [
  { icon: "🔐", title: "通信は、すべて暗号化", body: "サイトとの通信は、常に暗号化（HTTPS）。パスワードは、一方向に変換して保存するので、運営にも読めません。" },
  { icon: "🧱", title: "他の人には、読めない仕組み", body: "メッセージ・連絡先・免許番号・生年月日などは、画面を隠すだけでなく、データベースの側で、本人以外が読めないように制限しています。" },
  { icon: "🕶", title: "口コミも相談も、匿名でできます", body: "匿名にすると、名前もプロフィールも、ほかの人には返しません。" },
  { icon: "🏢", title: "勤務先を隠せます", body: "隠すと、公開用のプロフィールには、保存されません。" },
  { icon: "🔒", title: "見せる範囲を、投稿ごとに", body: "全員／フォロワーだけ／自分だけ。題名だけの公開も選べます。" },
  { icon: "🗂", title: "証明書・写真は、非公開で保管", body: "添付した証明書や本人確認の画像は、公開されない保管庫に置き、見られるのは、本人（と、公開を選んだ相手）だけです。" },
  { icon: "🚫", title: "ブロックと通報", body: "見たくない人の内容は、ブロックで消せます。問題のある投稿や口コミは、運営へ通報できます。" },
  { icon: "🛡", title: "定期的な点検", body: "他人の情報が読めないかを確かめるテストを定期的に行い、使っている部品の脆弱性も、確認して更新しています。" },
  { icon: "🙈", title: "個人の追跡は、しません", body: PIXEL_ENABLED ? "広告の効果測定は、同意した方にだけ行います。ページの閲覧数は、Cookieなし・個人を特定しない形で、数えるだけです。" : "広告や行動の追跡は、使っていません。ページが何回見られたかだけ、Cookieなし・個人を特定しない形で数えています。" },
];

// 使っている基盤。認証・保存方法は、各社の公式発表（2026年10月確認）による
const INFRA = [
  {
    name: "Supabase",
    role: "データベース・ログイン・ファイルの保管",
    region: "保存先は日本（東京）",
    points: ["保存されたデータは暗号化（AES-256）、通信も暗号化（TLS）", "SOC 2 Type 2 に準拠、ISO 27001 を取得（Supabase社の発表）", "行ごとのアクセス制限（RLS）を、本サービス側で設定"],
  },
  {
    name: "Vercel",
    role: "サイトの配信",
    region: "世界中の配信網から、HTTPSで提供",
    points: ["通信は常に暗号化（HTTPS／TLS）", "SOC 2 Type 2 に準拠、ISO 27001 を取得（Vercel社の発表）", "DDoS攻撃（大量アクセスによる妨害）を、自動で軽減"],
  },
];

const STEPS = [
  { title: "メールアドレスで無料登録", body: "アカウントの種類（理学療法士／学生／一般）を選ぶだけ。1分です。" },
  { title: "お名前を入力", body: "プロフィールは、あとから少しずつでOK。" },
  { title: "まずは、読む・探す", body: "気になる論文や研修を探すところから。慣れたら、経験も共有しましょう。" },
];

const FAQS = [
  { q: "料金はかかりますか？", a: "理学療法士・学生・一般の方ともに、登録と基本機能は無料です。" },
  { q: "理学療法士でなくても使えますか？", a: "はい。一般アカウントで登録すると、地域や専門分野から理学療法士を探したり、プロフィールやレビューを見たりできます。症例の閲覧・投稿と研修情報は、理学療法士アカウント向けの機能です。" },
  { q: "学生でも使えますか？", a: "はい。国試の過去問、実習・就活の管理、国試までのカウントダウン、実習先の口コミ、現役のPTへの質問が使えます。卒業予定年を登録すると、卒業した翌年の4月1日に、自動でPTのアカウントに切り替わります。養成校名などは、本人だけに表示されます。" },
  { q: "登録しなくても、中を見られますか？", a: "はい。「中を見てみる」から、理学療法士か学生かを選ぶと、ログインなしで、ホーム・論文検索・臨床アイデア・病院情報・国試の過去問などを見て触れます。投稿・コメント・保存・メッセージ・AIへの相談は、無料登録後に使えます。" },
  { q: "口コミは、本当に匿名で投稿できますか？", a: "はい。口コミの投稿は理学療法士アカウントのみで、匿名も選べます。投稿者の情報は、ほかの人には返しません。ただし、権利侵害など法令上必要な場合は、規約に基づき、投稿者の情報を開示することがあります。" },
  { q: "セキュリティは、大丈夫ですか？", a: "データの保管にはSupabase（保存先は東京）、配信にはVercelを使い、どちらもSOC 2 Type 2・ISO 27001に関する認証・準拠を公表している事業者です（各社の発表）。そのうえで、通信の暗号化、本人以外が読めないデータベースの制限、非公開の保管庫、匿名の投稿でも投稿者を返さない仕組み、AI機能の利用回数の上限などを入れ、テストで定期的に点検しています。ただし、どんなサービスでも、絶対に安全とは言い切れません。患者さんが特定される情報は、投稿しないでください。不審な点に気づいたときは、意見箱か「運営へのメッセージ」から、お知らせください。" },
  { q: "研修・学会情報は、どこから集めていますか？", a: "日本理学療法士協会や各都道府県の理学療法士会などが公開している情報をもとに、毎日自動で更新しています。" },
  { q: "AIモードとは何ですか？", a: "普通の文章で質問すると、見つかった論文の内容だけをもとに、引用番号つきで日本語で回答する機能です。質問文は外部のAI事業者（Google）に送信されるため、氏名や患者さんが特定できる情報は入力しないでください。回答は参考情報なので、原文でご確認ください。" },
  { q: "症例を投稿するとき、気をつけることは？", a: "患者さんが特定される情報（氏名・日付・施設名など）は、書かずに投稿してください。公開範囲や匿名も選べます。" },
  { q: "年収や休日で病院を絞れますか？", a: "はい。病院の公式サイトなどで公開されている情報から、順に拡充中です。情報のある病院から、年収・雇用形態・休日・アクセスで絞れます。最新は、各病院の採用ページでご確認ください。" },
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
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
};

// ボタンの形（濃い緑＝登録、白＋緑の枠＝中を見る）
const BTN_PRIMARY = "inline-flex items-center justify-center rounded-full bg-relight-gradient px-7 py-4 text-base font-bold shadow-[0_6px_16px_rgba(38,169,189,0.35)] transition hover:brightness-95 active:scale-[0.98]";
const BTN_SECONDARY = "inline-flex items-center justify-center rounded-full border-2 border-[var(--lp-g700)] bg-white px-7 py-3.5 text-base font-bold text-[var(--lp-g700)] transition hover:bg-[var(--lp-g50)] active:scale-[0.98]";
const SECTION_LABEL = "text-xs font-bold tracking-[0.14em] text-[var(--lp-g600)]";
const H2 = "mt-2 text-2xl font-bold leading-snug tracking-tight md:text-3xl";

export default async function LandingPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  // どのリンクから来たかで、最初の画面の主役（PT／学生）と、最後のボタンの行き先を変える
  const q = await searchParams;
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
  const entrance = pickLpEntrance(one(q.utm_source), one(q.utm_campaign));
  const studentFirst = entrance.tab === "student";
  const registerHref = `/register?type=${entrance.register}`;

  const ENTRANCES = [
    { key: "pt", href: "/register?type=pt", who: "理学療法士の方", title: "調べる・記録する・つながる", body: "論文検索・資格の進捗・研修情報・病院の口コミ" },
    { key: "student", href: "/register?type=student", who: "学生の方", title: "国試・実習・就活をひとつに", body: "過去問1,200問・実習先の口コミ・応募の管理" },
  ];
  const entrances = studentFirst ? [ENTRANCES[1], ENTRANCES[0]] : ENTRANCES;

  return (
    <main className="lp min-h-screen bg-white text-[var(--lp-ink)]">
      <StandaloneRedirect />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(jsonLd) }} />

      {/* ヘッダー（登録だけが、いちばん目立つボタン） */}
      <header className="sticky top-0 z-40 border-b border-[var(--lp-g100)] bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[60px] max-w-5xl items-center justify-between gap-3 px-5">
          <span className="text-xl font-bold tracking-tight text-[var(--lp-g900)]">Re:light</span>
          <nav className="flex items-center gap-1.5 sm:gap-3" aria-label="メイン">
            <Link href="/guest" className="hidden rounded-full px-3 py-2 text-sm font-bold text-[var(--lp-g700)] hover:bg-[var(--lp-g50)] sm:inline-block">
              中を見てみる
            </Link>
            <Link href="/teachers" className="hidden px-2 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 md:inline-block">
              先生の方へ
            </Link>
            <Link href="/login" className="px-2 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
              ログイン
            </Link>
            <Link href={registerHref} className="rounded-full bg-relight-gradient px-4 py-2.5 text-sm font-bold">
              無料登録
            </Link>
          </nav>
        </div>
      </header>

      {/* ① 最初の画面：興味を引く */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[var(--lp-g100)] via-[var(--lp-g50)] to-white">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[var(--lp-g200)] opacity-60 blur-3xl" />
        <div className="relative mx-auto max-w-5xl px-6 pb-12 pt-9 md:flex md:items-center md:gap-12 md:pb-16 md:pt-14">
          <div className="md:flex-1">
            {/* フック：PTのつぶやき */}
            <ul className="flex flex-wrap gap-2" aria-label="こんなつぶやき、ありませんか">
              {BUBBLES.map((b) => (
                <li key={b} className="rounded-2xl rounded-bl-sm border border-[var(--lp-g200)] bg-white px-3 py-1.5 text-[11px] font-medium text-gray-700 shadow-sm">
                  {b}
                </li>
              ))}
            </ul>

            <h1 className="mt-5 font-bold leading-[1.15] tracking-tight text-[var(--lp-g900)]" style={{ fontSize: "clamp(2.1rem, 9.5vw, 3.6rem)" }}>
              PTの学びを、
              <br />
              <span className="text-[var(--lp-g700)]">これ1つに。</span>
            </h1>
            <p className="mt-4 text-base font-semibold leading-8 text-[var(--lp-g800)] md:text-lg">調べる・学ぶ・記録する。ぜんぶ、無料。</p>
            <p className="mt-1 text-sm leading-7 text-gray-600">理学療法士と、理学療法士をめざす学生のためのアプリです。</p>
            <ul className="mt-3 flex flex-wrap gap-2" aria-label="特長">
              {["かんたん", "無料", "1分で、終わる"].map((t) => (
                <li key={t} className="rounded-full bg-[var(--lp-g100)] px-3.5 py-1.5 text-sm font-bold text-[var(--lp-g800)]">
                  <span aria-hidden="true">✓ </span>
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-6 grid max-w-xl gap-3 sm:grid-cols-2">
              {entrances.map((e, i) => (
                <Link
                  key={e.key}
                  href={e.href}
                  {...(i === 0 ? { "data-lp": "primary-entrance" } : {})}
                  className={`block rounded-2xl p-4 transition active:scale-[0.99] ${
                    i === 0
                      ? "bg-relight-gradient shadow-[0_8px_20px_rgba(38,169,189,0.35)] hover:brightness-95"
                      : "border-2 border-[var(--lp-g700)] bg-white text-[var(--lp-g900)] hover:bg-[var(--lp-g50)]"
                  }`}
                >
                  <span className={`block text-[11px] font-bold ${i === 0 ? "text-[var(--on-brand)]/70" : "text-[var(--lp-g600)]"}`}>{e.who}</span>
                  <span className="mt-0.5 block text-[15px] font-bold leading-snug">{e.title}</span>
                  <span className={`mt-1 block text-xs leading-5 ${i === 0 ? "text-[var(--on-brand)]/80" : "text-gray-600"}`}>{e.body}</span>
                  <span className={`mt-3 inline-block rounded-full px-4 py-1.5 text-xs font-bold ${i === 0 ? "bg-white text-[var(--lp-g800)]" : "bg-relight-gradient"}`}>
                    無料ではじめる →
                  </span>
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
          <div className="mt-10 hidden md:mt-0 md:block">
            <MockPaperSearch />
          </div>
        </div>

        {/* 数字（本当の数だけ） */}
        <div className="relative mx-auto max-w-5xl px-6 pb-8">
          <dl className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.big} className="rounded-2xl border border-[var(--lp-g200)] bg-white px-4 py-3 text-center shadow-sm">
                <dt className="text-xl font-bold text-[var(--lp-g700)] md:text-2xl">{s.big}</dt>
                <dd className="mt-0.5 text-[11px] leading-4 text-gray-600">{s.small}</dd>
              </div>
            ))}
          </dl>
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
            <div className="snap-center"><MockKokushi /></div>
          </div>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/guest" className={BTN_SECONDARY}>👀 アプリの中を見てみる</Link>
            <Link href="/kokushi" className="text-sm font-bold text-[var(--lp-g700)] underline underline-offset-4">国試の過去問を解いてみる →</Link>
          </div>
        </div>
      </section>

      {/* ⑤ 学生 */}
      <section id="student" className="bg-[var(--lp-g100)] px-6 py-16">
        <div className="mx-auto max-w-5xl md:flex md:gap-10">
          <div className="md:w-5/12">
            <p className={SECTION_LABEL}>FOR STUDENTS</p>
            <h2 className={H2}>学生のみなさんへ</h2>
            <p className="mt-3 text-sm leading-7 text-gray-700">
              実習・就活・国試を、ひとつのアプリで。卒業したら、そのままPTのアカウントに切り替わります。
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row md:flex-col">
              <Link href="/register?type=student" className={BTN_PRIMARY}>学生として無料ではじめる</Link>
              <Link href="/kokushi" className={BTN_SECONDARY}>登録せずに過去問を解く</Link>
            </div>
          </div>
          <ul className="mt-8 grid flex-1 gap-3 md:mt-0">
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

      {/* 大学・専門学校の先生の入口 */}
      <section className="bg-[var(--lp-g50)] px-6 py-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <h2 className="text-lg font-bold text-[var(--lp-g900)]">大学・専門学校の先生へ</h2>
            <p className="mt-1 text-balance text-sm leading-7 text-gray-700">国試の一問一答を、クラスの課題として配れます。学生ごとの状況や、正答率の低い問題も見られます。</p>
          </div>
          <Link href="/teachers" className={`${BTN_SECONDARY} shrink-0`}>大学・専門学校の先生はこちら →</Link>
        </div>
      </section>

      {/* ⑥ 安心（口コミ・匿名・セキュリティ） */}
      <section id="safety" className="bg-[var(--lp-g900)] px-6 py-16 text-white">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-bold tracking-[0.14em] text-[var(--lp-g300)]">SAFETY</p>
          <h2 className="mt-2 text-balance text-2xl font-bold leading-snug tracking-tight text-white md:text-3xl">安心して本音を書けるように、守りを厚くしています</h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-white/80">口コミや相談は、安心して書けてこそ。見せる範囲も、名前を出すかどうかも、使う人が自分で決められます。情報を守る仕組みは、点検のたびに見直しています。</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SAFETY.map((s) => (
              <li key={s.title} className="flex gap-4 rounded-2xl border border-white/15 bg-white/[0.07] p-4">
                <span aria-hidden="true" className="text-2xl">{s.icon}</span>
                <div>
                  <h3 className="text-base font-bold text-white">{s.title}</h3>
                  <p className="mt-1 text-sm leading-7 text-white/80">{s.body}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8 rounded-2xl border border-white/15 bg-white/[0.07] p-5">
            <h3 className="text-base font-bold text-white">使っているサービスと、その安全性</h3>
            <p className="mt-1 text-sm leading-7 text-white/80">データは、世界の多くの企業が使う、次の基盤に預けています。認証・準拠の内容は、各社の公式な発表によるもので、Re:light自身が取得したものではありません。</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {INFRA.map((i) => (
                <div key={i.name} className="rounded-xl bg-white/10 p-4">
                  <p className="text-sm font-bold text-white">{i.name}<span className="ml-2 text-xs font-normal text-white/70">{i.role}</span></p>
                  <p className="mt-0.5 text-xs text-[var(--lp-g300)]">{i.region}</p>
                  <ul className="mt-2 space-y-1 text-sm leading-6 text-white/80">
                    {i.points.map((t) => (
                      <li key={t} className="flex gap-2"><span aria-hidden="true">✓</span><span>{t}</span></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs leading-6 text-white/70">基盤が安全でも、設定を誤れば情報は守れません。だから、誰が何を読めるかの制限（上の項目）は、Re:light側で設定し、テストで確かめています。どんなサービスにも「絶対」はないため、患者さんが特定される情報は、投稿しないでください。</p>
          </div>
          <p className="mt-6 text-xs leading-6 text-white/70">
            患者さんが特定される情報は、投稿しないでください。AIに入力した内容は、外部のサービス（Google）に送信されます。詳しくは
            <Link href="/privacy" className="mx-1 underline">プライバシーポリシー</Link>
            を。
          </p>
          <div className="mt-8">
            <Link href={registerHref} className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-base font-bold text-[var(--lp-g800)] transition hover:bg-[var(--lp-g100)] active:scale-[0.98]">
              安心して、無料ではじめる →
            </Link>
          </div>
        </div>
      </section>

      {/* ⑦ はじめ方 */}
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
          <p className="mt-6 text-sm text-gray-600">
            一般の方は、
            <Link href="/register?type=general" className="font-bold text-[var(--lp-g700)] underline underline-offset-4">一般アカウントで無料登録</Link>
            すると、地域や専門分野から、理学療法士を探せます。
          </p>
        </div>
      </section>

      {/* ⑧ FAQ */}
      <section id="faq" className="bg-[var(--lp-g50)] px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <p className={SECTION_LABEL}>FAQ</p>
          <h2 className={H2}>よくある質問</h2>
          <div className="mt-6 divide-y divide-[var(--lp-g100)] rounded-2xl border border-[var(--lp-g200)] bg-white px-6 shadow-sm">
            {FAQS.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="cursor-pointer list-none text-base font-bold text-[var(--lp-g900)]">
                  <span className="mr-2 text-[var(--lp-g600)] group-open:hidden">＋</span>
                  <span className="mr-2 hidden text-[var(--lp-g600)] group-open:inline">−</span>
                  {f.q}
                </summary>
                <p className="mt-3 text-sm leading-7 text-gray-700">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ⑨ 最後の登録 */}
      <section className="bg-relight-gradient px-6 py-16 text-center">
        <h2 className="text-2xl font-bold leading-snug tracking-tight text-white md:text-3xl">学びと経験を、ひとつに。</h2>
        <p className="mt-3 text-sm text-white/90">登録無料・メールアドレスだけで1分。</p>
        <div className="mx-auto mt-6 flex max-w-sm flex-col gap-3">
          <Link href={registerHref} className="block rounded-full bg-white px-6 py-4 text-center text-base font-bold text-[var(--lp-g800)] shadow-lg transition hover:bg-[var(--lp-g100)]">
            無料ではじめる
          </Link>
          <Link href="/guest" className="block rounded-full border-2 border-white/70 px-6 py-3 text-center text-sm font-bold text-white hover:bg-white/10">
            まず、中を見てみる
          </Link>
        </div>
        <p className="mx-auto mt-8 max-w-md text-balance text-xs leading-6 text-white/80">
          <span className="inline-block">困っていること・ほしい機能は、</span>
          <span className="inline-block">登録なし・匿名の<Link href="/feedback" className="mx-1 font-bold underline">意見箱</Link>へ。</span>
          <span className="inline-block">みんなで、作っていきたい。</span>
        </p>
      </section>

      <footer className="bg-white px-6 py-8 pb-24 text-center text-xs text-gray-600 md:pb-8">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/kokushi" className="hover:text-gray-900">国試過去問</Link>
          <Link href="/schools" className="hover:text-gray-900">養成校の国試合格状況</Link>
          <Link href="/teachers" className="hover:text-gray-900">大学・専門学校の先生へ</Link>
          <Link href="/hospital-areas" className="hover:text-gray-900">病院を都道府県から探す</Link>
          <Link href="/paper-search" className="hover:text-gray-900">論文検索</Link>
          <Link href="/certified-pt" className="hover:text-gray-900">認定理学療法士ガイド</Link>
          <Link href="/job-hunting" className="hover:text-gray-900">就活ガイド</Link>
          <Link href="/evidence-levels" className="hover:text-gray-900">エビデンスレベル早見表</Link>
          <Link href="/columns" className="hover:text-gray-900">コラム</Link>
          <Link href="/feedback" className="hover:text-gray-900">意見箱</Link>
          <Link href="/terms" className="hover:text-gray-900">利用規約</Link>
          <Link href="/privacy" className="hover:text-gray-900">プライバシーポリシー</Link>
        </div>
        <p className="mt-3">© {new Date().getFullYear()} Re:light</p>
      </footer>

      <LpStickyCta registerHref={registerHref} />
    </main>
  );
}
