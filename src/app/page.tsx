import Link from "next/link";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import { PIXEL_ENABLED } from "@/lib/metaPixel";
import LpTabs from "@/components/lp/LpTabs";
import { MockHospital, MockIdeas, MockKokushi, MockPaperSearch, MockPost } from "@/components/lp/Mocks";

// 検索から来た人が「自分向けだ」と分かり、そのまま登録できるランディングページ
// （Server Component：本文がHTMLに含まれるので検索エンジンが読める）
// 構成: 上（ヘッダー・ファーストビュー）に「中を見てみる」を残し、その下を、タブで切り替える

const TABS = [
  { id: "start", label: "はじめに" },
  { id: "features", label: "できること" },
  { id: "student", label: "学生のみなさんへ" },
  { id: "howto", label: "はじめ方" },
  { id: "faq", label: "よくある質問" },
];

const TRY_LINKS = [
  { href: "/guest", icon: "👀", title: "アプリの中を見てみる", body: "PTか学生かを選ぶと、ログインなしで、見て触れます" },
  { href: "/kokushi", icon: "📝", title: "国試の過去問を解く", body: "第57〜61回・全1,000問。正答つき・登録不要" },
  { href: "/pts?mode=hospitals", icon: "🏥", title: "病院を探す", body: "全国約5,000病院と、PTの職場口コミ" },
  { href: "/evidence-levels", icon: "📚", title: "エビデンスレベル早見表", body: "論文の強さの見分け方を、1枚で" },
];

const PAINS = [
  { icon: "💬", text: "担当症例の進め方を、職場の外の人にも相談したい" },
  { icon: "🔎", text: "いい論文を探すのに、何個ものサイトを行き来している" },
  { icon: "💡", text: "先輩に聞かないと分からない、リハビリの「引き出し」を増やしたい" },
  { icon: "🏥", text: "転職や就職の前に、病院の雰囲気や教育体制を知りたい" },
  { icon: "🗂", text: "研修・学会の情報が散らばっていて、探しにくい" },
  { icon: "🎓", text: "（学生）実習・就活・国試の準備を、ひとつにまとめたい" },
];

const FEATURES = [
  { icon: "💬", title: "症例・実績を、投稿ひとつで", body: "症例報告も、学会発表や研修も、同じ「投稿」から記録。コメントやいいねで、他のPTの考え方にも触れられます。公開範囲や匿名も選べます。" },
  { icon: "📚", title: "論文検索：9サイトを、一度に", body: "PubMed・J-STAGE・PEDroなど、9サイトをまとめて検索。日本語でも検索でき、エビデンスレベルや引用数で並べ替え、要約の日本語訳もできます。" },
  { icon: "✨", title: "AIモード：論文をもとに答える", body: "普通の文章で質問すると、見つかった論文だけをもとに、引用番号つきで回答します。回答は参考情報として、原文でご確認ください。" },
  { icon: "💡", title: "臨床アイデア：疾患ごとの引き出し", body: "診療報酬の区分から疾患を選ぶと、評価とリハビリのアイデアが見られます。自分のアイデアを登録して共有でき、AIに相談もできます。" },
  { icon: "🗓", title: "研修・学会のNews", body: "日本理学療法士協会や各士会が公開している研修・学会の情報を、毎日自動で集約。気になる研修は、保存できます。" },
  { icon: "🏥", title: "病院探しと、職場の口コミ", body: "全国約5,000病院を、地域から検索。PTによる口コミを、6項目で比べられます（投稿は、匿名もOK）。" },
  { icon: "👥", title: "グループで、本音の相談", body: "病院や専門分野ごとの、公開範囲を限った場をつくれます。一人職場や新人の相談相手づくりにも。" },
  { icon: "🗂", title: "ポートフォリオが、自然にたまる", body: "プロフィールと投稿をもとに、経歴・資格・臨床実績が整い、PDFで保存・共有できます。" },
];

const STUDENT_FEATURES = [
  { icon: "📝", title: "国試の過去問ドリル", body: "第57〜61回の全1,000問。全問の解説、間違えた問題の復習、時間を計る模擬試験、科目ごとの正答率。" },
  { icon: "🗂", title: "実習・就活トラッカー", body: "実習先、病院見学、応募、提出物の期限を、ひとつに。病院ページから、ワンタップで追加。" },
  { icon: "⏱", title: "国試カウントダウンと学習ログ", body: "試験日までの日数、科目ごとの勉強時間、連続記録。" },
  { icon: "🙋", title: "実習先の口コミと、先輩への質問", body: "実習生の声が見られ、現役のPTに、匿名で質問できます。実習レポートは、構成と誤字脱字をAIがチェック（代筆はしません）。" },
];

const ENTRANCES = [
  { href: "/register?type=pt", who: "理学療法士の方", title: "臨床と学びを、もっと広く", body: "症例相談・論文検索・臨床アイデア・研修情報" },
  { href: "/register?type=student", who: "学生の方", title: "国試・実習・就活をひとつに", body: "過去問1,000問・実習先の口コミ・応募の管理" },
];

const STEPS = [
  { title: "メールアドレスで無料登録", body: "アカウントの種類（理学療法士／学生／一般）を選ぶだけ。1分で完了します。" },
  { title: "プロフィールを入力", body: "お名前・専門分野（任意）・経験年数を登録。つながりたい人が、見つけやすくなります。" },
  { title: "まずは、読む・探す", body: "気になる症例や論文を読むところから。慣れたら、自分の経験も共有してみましょう。" },
];

const PRIVACY = [
  { title: "投稿ごとに、見せる範囲を選べます", body: "全員／フォロワーだけ／自分だけ。題名だけの公開も。" },
  { title: "匿名で投稿できます", body: "名前もプロフィールも、ほかの人には返しません。" },
  { title: "勤務先を隠せます", body: "公開用のプロフィールには、保存されません。" },
  { title: "連絡先・免許番号・生年月日は、本人だけ", body: "解析ツールは使いません。" },
];

const FAQS = [
  {
    q: "料金はかかりますか？",
    a: "理学療法士・一般の方ともに、登録と基本機能は無料でご利用いただけます。",
  },
  {
    q: "理学療法士でなくても使えますか？",
    a: "はい。一般アカウントで登録すると、地域や専門分野から理学療法士を探したり、プロフィールやレビューを見たりできます。症例の閲覧・投稿と研修情報は理学療法士アカウント向けの機能です。",
  },
  {
    q: "学生でも使えますか？",
    a: "はい。理学療法士をめざす学生向けのアカウントがあります。実習・就活・病院見学の管理、国家試験までのカウントダウンと学習ログ、実習先の口コミ（実習生の声）、現役のPTへの質問、実習レポートの文献探しと、構成・誤字脱字のチェック（AI。代筆はしません）が使えます。卒業予定年を登録しておくと、卒業した翌年の4月1日に自動でPTのアカウントに切り替わります。養成校名などは、本人だけに表示されます。",
  },
  {
    q: "国家試験の過去問は無料で解けますか？",
    a: "はい。第57回〜第61回の理学療法士国家試験（全1,000問）は、ログインなしで1問ずつ解いて正答を確認できます。学生アカウントで無料登録すると、全問の解説、間違えた問題だけの復習、時間を計る模擬試験、科目ごとの正答率も使えます。",
  },
  {
    q: "どんな症例を投稿できますか？",
    a: "脳血管、整形外科、呼吸器、循環器、神経筋、内部障害、スポーツなどのカテゴリから選んで投稿できます。患者さんが特定される情報は書かずに投稿してください。",
  },
  {
    q: "研修・学会情報はどこから集めていますか？",
    a: "日本理学療法士協会や各都道府県の理学療法士会などが公開している情報をもとに、毎日自動で更新しています。",
  },
  {
    q: "AIモードとは何ですか？",
    a: "普通の文章で質問すると、AIが検索語を考えて論文を探し、見つかった論文の内容だけをもとに日本語で回答する機能です。回答には引用番号がつき、続けて質問もできます。質問文は外部のAI事業者（Google）に送信されるため、氏名や患者さんが特定できる情報は入力しないでください。AIの回答は参考情報であり、診療の判断は必ず原文や専門家の確認をお願いします。",
  },
  {
    q: "病院の口コミは誰でも投稿できますか？",
    a: "口コミの投稿は理学療法士アカウントのみです。給与・残業・教育体制などを6項目で評価でき、匿名での投稿も選べます。匿名の投稿でも、権利侵害など法令上必要な場合は、規約に基づき投稿者の情報を開示することがあります。",
  },
  {
    q: "論文検索は何のサイトに対応していますか？",
    a: "PubMed・J-STAGE・CiNii Research・PEDro・Semantic Scholar・Europe PMC・OpenAlex・ClinicalTrials.gov・DOAJの9サイトを1回の検索でまとめて確認できます。日本語で検索しても自動で英語に変換して検索するので、海外論文も同時に見つかります。Physiopedia・Cochrane・Google Scholar・医中誌Webは、検索語入りのリンクをワンタップで開けます（これらのサイトの中身はRe:light上には表示されません）。",
  },
  {
    q: "グループ機能とは何ですか？",
    a: "病院や専門分野などの単位で、公開範囲を限定したクローズドな相談の場を作れる機能です。全体公開の症例投稿とは別に、狭い範囲だからこそ話せる相談ができます。",
  },
  {
    q: "ポートフォリオは自分で作らないといけませんか？",
    a: "ページを一から作る必要はありません。プロフィールと、投稿した症例・実績をもとに、経歴・資格・臨床実績・学術活動がポートフォリオとしてまとまり、プロフィールページの下に表示されます。PDFとして保存・共有することもできます。",
  },
  {
    q: "登録しなくても、中を見られますか？",
    a: "はい。トップの「アプリの中を見てみる」から、理学療法士か学生かを選ぶと、ログインなしで、ホーム・論文検索・臨床アイデア・病院情報・国試の過去問などを見て触れます。投稿・コメント・保存・メッセージ・AIへの相談などは、無料登録後に使えます。",
  },
  {
    q: "臨床アイデアとは何ですか？",
    a: "診療報酬の区分（運動器・呼吸器・脳血管疾患等・廃用症候群など）から疾患を選ぶと、まず見たい評価と、リハビリのアイデアが見られる機能です。理学療法士は、自分のアイデアを登録して共有でき、「いいね」「保存」「実践した」で、よく使われているアイデアが分かります。内容は、公開されているガイドライン等をもとにした一般的な参考情報で、実際の判断は、医師の指示と、ご自身の評価に従ってください。",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: "ja",
      description: SITE_DESCRIPTION,
    },
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
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};


const gradient = { backgroundImage: "var(--relight-gradient-bright)" };

function Check() {
  return (
    <span aria-hidden="true" className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-[11px] font-bold text-brand-800">
      ✓
    </span>
  );
}

export default function LandingPage() {
  const startPanel = (
    <div className="mx-auto max-w-5xl px-6 py-10">
      {/* まず試す */}
      <h2 className="text-xl font-bold tracking-tight md:text-2xl">登録しなくても、まず試せます</h2>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {TRY_LINKS.map((t, i) => (
          <li key={t.href}>
            <Link
              href={t.href}
              className={`block h-full rounded-2xl p-5 transition active:scale-[0.99] ${
                i === 0 ? "bg-relight-gradient" : "border border-gray-200 bg-white hover:border-gray-400"
              }`}
            >
              <span aria-hidden="true" className="text-2xl">{t.icon}</span>
              <span className="mt-2 block text-base font-bold">{t.title} →</span>
              <span className={`mt-1 block text-sm leading-6 ${i === 0 ? "" : "text-gray-600"}`}>{t.body}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* 悩み */}
      <h2 className="mt-14 text-xl font-bold tracking-tight md:text-2xl">こんなこと、ありませんか？</h2>
      <ul className="mt-5 grid gap-3 md:grid-cols-2">
        {PAINS.map((p) => (
          <li key={p.text} className="flex items-center gap-3 rounded-2xl bg-gray-50 px-5 py-4 text-sm leading-6 text-gray-800">
            <span aria-hidden="true" className="text-xl">{p.icon}</span>
            {p.text}
          </li>
        ))}
      </ul>
      <p className="mt-5 text-base font-semibold">Re:lightなら、その悩みを、まとめて解決できます。</p>

      {/* 画面を見る */}
      <h2 className="mt-14 text-xl font-bold tracking-tight md:text-2xl">こんな画面です</h2>
      <div className="mt-6 flex snap-x gap-6 overflow-x-auto pb-4 md:justify-center">
        <div className="snap-center"><MockPaperSearch /></div>
        <div className="snap-center"><MockIdeas /></div>
        <div className="snap-center"><MockKokushi /></div>
      </div>

      {/* 個人情報 */}
      <div className="mt-12 rounded-3xl border border-gray-200 bg-white p-6">
        <p className="text-xs font-semibold text-gray-500">PRIVACY</p>
        <h2 className="mt-1 text-lg font-bold tracking-tight md:text-xl">個人情報は、使う人が自分で決められます</h2>
        <ul className="mt-4 grid gap-3 text-sm leading-6 text-gray-700 sm:grid-cols-2">
          {PRIVACY.map((p) => (
            <li key={p.title} className="flex gap-2 rounded-2xl bg-gray-50 p-4">
              <Check />
              <span>
                <strong className="block text-gray-900">{p.title}</strong>
                {p.body}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs leading-6 text-gray-600">
          {PIXEL_ENABLED
            ? "行動分析のための解析ツールは使っていません。広告の効果測定は、同意した方にだけ行います。"
            : "広告や行動分析のためのトラッキングは使っていません。"}
          患者さんが特定される情報は、投稿しないでください。AIに入力した内容は、外部のサービス（Google）に送信されます。詳しくは
          <Link href="/privacy" className="mx-1 underline">
            プライバシーポリシー
          </Link>
          を。
        </p>
      </div>
    </div>
  );

  const featuresPanel = (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <h2 className="text-xl font-bold tracking-tight md:text-2xl">理学療法士が、Re:lightでできること</h2>
      <div className="mt-6 flex snap-x gap-6 overflow-x-auto pb-4 lg:justify-center">
        <div className="snap-center"><MockPost /></div>
        <div className="snap-center"><MockPaperSearch /></div>
        <div className="snap-center"><MockIdeas /></div>
        <div className="snap-center"><MockHospital /></div>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {FEATURES.map((f) => (
          <article key={f.title} className="flex gap-4 rounded-2xl border border-gray-200 p-5">
            <span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-relight-gradient text-xl">
              {f.icon}
            </span>
            <div>
              <h3 className="text-base font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm leading-7 text-gray-600">{f.body}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );

  const studentPanel = (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <h2 className="text-xl font-bold tracking-tight md:text-2xl">理学療法士をめざす学生のみなさんへ</h2>
      <p className="mt-2 max-w-2xl text-sm leading-7 text-gray-600">
        実習・就活・国試を、ひとつのアプリで。卒業したら、そのままPTのアカウントに切り替わります。
      </p>
      <div className="mt-6 md:flex md:items-start md:gap-10">
        <div className="mx-auto md:mx-0">
          <MockKokushi />
        </div>
        <ul className="mt-8 grid flex-1 gap-3 md:mt-0">
          {STUDENT_FEATURES.map((f) => (
            <li key={f.title} className="flex gap-4 rounded-2xl border border-gray-200 p-5">
              <span aria-hidden="true" className="text-2xl">{f.icon}</span>
              <div>
                <h3 className="text-base font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm leading-7 text-gray-600">{f.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/register?type=student" className="inline-block rounded-full bg-black px-6 py-3 text-sm font-medium text-white">
          学生として無料ではじめる
        </Link>
        <Link href="/kokushi" className="inline-block rounded-full border border-gray-900 px-6 py-3 text-sm font-medium hover:bg-gray-50">
          登録せずに過去問を解いてみる
        </Link>
      </div>
    </div>
  );

  const howtoPanel = (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <h2 className="text-xl font-bold tracking-tight md:text-2xl">はじめ方は、かんたん3ステップ</h2>
      <ol className="mt-6 grid gap-4 md:grid-cols-3">
        {STEPS.map((s, i) => (
          <li key={s.title} className="rounded-2xl border border-gray-200 p-6">
            <span className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold" style={gradient}>
              {i + 1}
            </span>
            <h3 className="mt-3 text-base font-semibold">{s.title}</h3>
            <p className="mt-1 text-sm leading-7 text-gray-600">{s.body}</p>
          </li>
        ))}
      </ol>
      <div className="mt-8 rounded-2xl bg-gray-50 p-6 text-sm leading-7 text-gray-700">
        <p className="font-semibold text-gray-900">まず、見てから決めたい方へ</p>
        <p className="mt-1">ログインなしで、アプリの中を見て触れます（投稿・保存などは、登録後）。</p>
        <Link href="/guest" className="mt-3 inline-block rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white">
          アプリの中を見てみる →
        </Link>
      </div>
      <div className="mt-4 rounded-2xl border border-gray-200 p-6 md:flex md:items-center md:justify-between md:gap-6">
        <div>
          <h3 className="text-base font-semibold">一般の方へ</h3>
          <p className="mt-1 text-sm leading-7 text-gray-600">地域や専門分野から、理学療法士を探せます。病院の情報や、PTの口コミも見られます。</p>
        </div>
        <Link href="/register?type=general" className="mt-4 inline-block shrink-0 rounded-full border border-gray-900 px-5 py-2.5 text-sm font-medium hover:bg-gray-50 md:mt-0">
          一般の方の無料登録
        </Link>
      </div>
    </div>
  );

  const faqPanel = (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h2 className="text-xl font-bold tracking-tight md:text-2xl">よくある質問</h2>
      <div className="mt-6 divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white px-6">
        {FAQS.map((f) => (
          <details key={f.q} className="group py-5">
            <summary className="cursor-pointer list-none text-base font-medium">
              <span className="mr-2 text-gray-500 group-open:hidden">＋</span>
              <span className="mr-2 hidden text-gray-500 group-open:inline">−</span>
              {f.q}
            </summary>
            <p className="mt-3 text-sm leading-7 text-gray-600">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ヘッダー（スクロールしても残る。「中を見てみる」は、ここにも） */}
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[57px] max-w-5xl items-center justify-between gap-3 px-5">
          <span className="text-lg font-semibold tracking-tight">Re:light</span>
          <div className="flex items-center gap-2">
            <Link href="/guest" className="rounded-full bg-relight-gradient px-4 py-2 text-xs font-bold">
              👀 中を見てみる
            </Link>
            <Link href="/login" className="px-2 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
              ログイン
            </Link>
          </div>
        </div>
      </header>

      {/* ファーストビュー */}
      <section className="mx-auto max-w-5xl px-6 pb-10 pt-8 md:flex md:items-center md:gap-10 md:pb-14 md:pt-14">
        <div className="md:flex-1">
          <p className="inline-block rounded-full px-3 py-1 text-xs font-semibold" style={gradient}>
            PTと、PTをめざす学生のための、無料プラットフォーム
          </p>
          {/* 画面幅に合わせて文字の大きさを変え、スマホでも「理学療法士の臨床を、」が1行に収まるようにする */}
          <h1
            className="mt-5 font-bold leading-tight tracking-tight"
            style={{ fontSize: "clamp(1.5rem, calc((100vw - 3rem) / 10.6), 3rem)" }}
          >
            <span className="whitespace-nowrap">理学療法士の臨床を、</span>
            <br />
            <span className="whitespace-nowrap">ひとりにしない。</span>
          </h1>
          <p className="mt-4 text-base leading-8 text-gray-600">
            症例の共有・論文検索・臨床アイデア・研修情報・病院の口コミ。学生は、国試の過去問と、実習・就活の管理まで。
          </p>
          <div className="mt-6 grid max-w-xl gap-3 sm:grid-cols-2">
            {ENTRANCES.map((e) => (
              <Link
                key={e.href}
                href={e.href}
                className="block rounded-2xl border-2 border-gray-900 bg-white p-4 transition hover:bg-gray-50 active:scale-[0.99]"
              >
                <span className="block text-[11px] font-semibold text-gray-500">{e.who}</span>
                <span className="mt-0.5 block text-base font-bold leading-snug">{e.title}</span>
                <span className="mt-1 block text-xs leading-5 text-gray-600">{e.body}</span>
                <span className="mt-3 inline-block rounded-full bg-black px-4 py-2 text-xs font-semibold text-white">無料ではじめる →</span>
              </Link>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-600">
            <Link href="/guest" className="font-semibold underline">
              まず、ログインなしで、中を見てみる
            </Link>
            <span className="mx-2 text-gray-300">|</span>
            登録無料・メールアドレスだけで1分
          </p>
        </div>
        <div className="mt-10 hidden md:mt-0 md:block">
          <MockPaperSearch />
        </div>
      </section>

      {/* タブ */}
      <LpTabs
        tabs={TABS}
        panels={{ start: startPanel, features: featuresPanel, student: studentPanel, howto: howtoPanel, faq: faqPanel }}
      />

      {/* 最後のCTA */}
      <section className="bg-relight-gradient px-6 py-16 text-center">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">学びと経験を、つながりに変えよう。</h2>
        <p className="mt-3 text-sm">登録無料・メールアドレスだけで1分。</p>
        <div className="mx-auto mt-6 flex max-w-sm flex-col gap-3">
          <Link href="/register?type=pt" className="block rounded-full bg-gray-900 px-6 py-4 text-center text-base font-medium text-white">
            無料ではじめる
          </Link>
          <Link href="/guest" className="block rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-gray-900">
            まず、中を見てみる
          </Link>
        </div>
      </section>

      <footer className="px-6 py-8 text-center text-xs text-gray-600">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/kokushi" className="hover:text-gray-900">国試過去問</Link>
          <Link href="/pts?mode=hospitals" className="hover:text-gray-900">病院を探す</Link>
          <Link href="/evidence-levels" className="hover:text-gray-900">エビデンスレベル早見表</Link>
          <Link href="/columns" className="hover:text-gray-900">コラム</Link>
          <Link href="/terms" className="hover:text-gray-900">利用規約</Link>
          <Link href="/privacy" className="hover:text-gray-900">プライバシーポリシー</Link>
        </div>
        <p className="mt-3">© {new Date().getFullYear()} Re:light</p>
      </footer>
    </main>
  );
}
