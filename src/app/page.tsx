import Link from "next/link";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

// 検索から来た人が「自分向けだ」と分かり、そのまま登録できるランディングページ
// （Server Component：本文がHTMLに含まれるので検索エンジンが読める）

const PAINS = [
  "担当症例の進め方を、職場の外の人にも相談したい",
  "いい論文を探すのに、PubMedやCiNii、PEDroなど何個ものサイトを行き来している",
  "研修・学会の情報があちこちに散らばっていて探しにくい",
  "転職や就職の前に、病院の雰囲気や教育体制をもっと知りたい",
  "自分の経験や得意分野を、うまく伝えられていない",
  "（学生の方）実習先・就活・国試の準備を、ひとつにまとめて管理したい",
];

const FEATURES = [
  {
    title: "投稿ひとつで、症例も実績も記録できる",
    body: "脳血管・整形外科・呼吸器・循環器・スポーツなどの症例報告はもちろん、学会発表・院内症例発表・研修受講・論文などの実績も、同じ「投稿」から記録できます。症例はタグで絞り込んで検索でき、コメントやいいねで他の理学療法士の考え方にも触れられます。",
  },
  {
    title: "論文検索：9つのサイトを一度に、日本語でも",
    body: "PubMed・J-STAGE・CiNii・PEDro・Semantic Scholar・Europe PMC・OpenAlex・ClinicalTrials.gov・DOAJを1回の検索でまとめて確認。日本語で入れても自動で英語に変換して海外論文まで同時に探せます。「要約を表示」で論文の要旨をその場で読め、気になる論文は保存リストにためておけます。",
  },
  {
    title: "AIモード：質問すると、論文をもとに会話形式で答えてくれる",
    body: "「脳卒中後の歩行練習でエビデンスのある方法は？」のように普通の文章で質問すると、AIが検索語を考えて論文を探し、見つかった論文だけをもとに日本語で回答。回答には引用番号がつき、続けて質問もできます。AIの回答は参考情報として、必ず原文でご確認ください。",
  },
  {
    title: "研修・学会のNewsがひとつにまとまる",
    body: "日本理学療法士協会や全国の理学療法士会などが公開している研修・学会情報を毎日自動で集約。気になる研修は保存しておけます。",
  },
  {
    title: "病院を探して、職場環境の口コミも見られる",
    body: "全国のリハビリテーション科のある約5,000病院を、都道府県・市区町村から検索できます。病院ページでは疾患比率や採用情報に加え、理学療法士による口コミを6項目の六角形レーダーチャートで一目で比較。口コミは理学療法士アカウントから匿名でも投稿できます。",
  },
  {
    title: "病院・専門分野ごとのグループで相談できる",
    body: "全体公開の投稿とは別に、院内や専門分野単位のクローズドな場を作れます。狭い範囲だからこそ話せる、本音の症例相談に。",
  },
  {
    title: "投稿をもとに、ポートフォリオがまとまる",
    body: "プロフィールと、投稿した症例・実績をもとに、経歴・資格・臨床実績・学術活動がポートフォリオとして整います。プロフィールページの下にそのまま表示され、PDFとして保存・共有も可能。資格証明書などの書類はアプリ内に保管でき、証明写真は本人だけが見られる非公開で保存されます。",
  },
  {
    title: "PT同士で、職場の外にもつながる",
    body: "フォローやメッセージで、同じ分野に取り組む理学療法士とつながれます。一人職場や新人の方の相談相手づくりにも。",
  },
];

const STUDENT_FEATURES = [
  {
    title: "実習・就活トラッカー",
    body: "実習先、病院見学、応募、提出物の期限をまとめて管理。病院ページの「見学したい」からワンタップで追加できます。",
  },
  {
    title: "国試カウントダウンと学習ログ",
    body: "試験日までの日数、科目ごとの勉強時間、連続記録、復習したい科目が見えます。",
  },
  {
    title: "実習先の口コミと先輩への質問",
    body: "全国約5,000病院から探せて、実習生の声が見られます。実習・国試・就活は、現役のPTに匿名で質問できます。実習レポートは、構成と誤字脱字をAIがチェックします。",
  },
];

const STEPS = [
  { title: "メールアドレスで無料登録", body: "アカウントの種類（理学療法士／学生／一般）を選ぶだけ。1分で完了します。" },
  { title: "プロフィールを入力", body: "お名前・専門分野・経験年数を登録すると、つながりたい人が見つけやすくなります。登録直後に案内が出るので迷いません。" },
  { title: "症例を読む・投稿する", body: "まずは気になる症例を読むところから。慣れたら自分の経験も共有してみましょう。" },
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

const gradient = { backgroundImage: "var(--relight-gradient)" };

function PrimaryCta({ label = "理学療法士として無料ではじめる" }: { label?: string }) {
  return (
    <Link
      href="/register?type=pt"
      className="block w-full rounded-full bg-black px-6 py-4 text-center text-base font-medium text-white transition hover:bg-gray-800 active:scale-[0.98]"
    >
      {label}
    </Link>
  );
}

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ヘッダー */}
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <span className="text-lg font-semibold tracking-tight">Re:light</span>
        <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900">
          ログイン
        </Link>
      </header>

      {/* ファーストビュー */}
      <section className="mx-auto max-w-5xl px-6 pb-16 pt-10 md:pt-20">
        <div className="max-w-2xl">
          <p className="inline-block rounded-full px-3 py-1 text-xs font-semibold text-white" style={gradient}>
            理学療法士・患者・学生・研究者・病院・医療系企業のためのプラットフォーム
          </p>
          {/* 画面幅に合わせて文字の大きさを変え、スマホでも「理学療法士の臨床を、」が1行に収まるようにする */}
          <h1
            className="mt-6 font-bold leading-tight tracking-tight"
            style={{ fontSize: "clamp(1.5rem, calc((100vw - 3rem) / 10.6), 3rem)" }}
          >
            <span className="whitespace-nowrap">理学療法士の臨床を、</span>
            <br />
            <span className="whitespace-nowrap">ひとりにしない。</span>
          </h1>
          <p className="mt-6 text-base leading-8 text-gray-600">
            症例の共有・相談、9サイトを横断する論文検索とAIモード、全国の研修・学会情報、全国の病院情報と口コミ、学生の実習・就活・国試のサポート、PT同士のつながり。
            <br className="hidden md:block" />
            Re:lightは、理学療法士・患者・学生・研究者・病院・医療系企業のための、学びと価値をつなぐプラットフォームです。
          </p>
          <div className="mt-10 max-w-sm space-y-3">
            <PrimaryCta />
            <Link
              href="/register?type=general"
              className="block w-full rounded-full border border-gray-300 bg-white px-6 py-4 text-center text-base font-medium text-gray-900 transition hover:bg-gray-50 active:scale-[0.98]"
            >
              理学療法士を探したい方はこちら
            </Link>
            <Link
              href="/register?type=student"
              className="block w-full rounded-full border border-gray-300 bg-white px-6 py-4 text-center text-base font-medium text-gray-900 transition hover:bg-gray-50 active:scale-[0.98]"
            >
              理学療法士をめざす学生の方はこちら
            </Link>
            <p className="text-center text-xs text-gray-500">登録無料・メールアドレスだけで1分</p>
          </div>
        </div>
      </section>

      {/* 悩み */}
      <section className="bg-[#f7faf9] px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">こんなこと、ありませんか？</h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {PAINS.map((pain) => (
              <li key={pain} className="rounded-2xl bg-white p-6 text-sm leading-7 text-gray-700 shadow-sm">
                {pain}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-base font-medium">Re:lightなら、その悩みをまとめて解決できます。</p>
        </div>
      </section>

      {/* 機能 */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">理学療法士がRe:lightでできること</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {FEATURES.map((f, i) => (
              <article key={f.title} className="rounded-2xl border border-gray-200 p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white" style={gradient}>
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-7 text-gray-600">{f.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 学生の方へ */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">理学療法士をめざす学生の方へ</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600">
            実習・就活・国試を、ひとつのアプリで。卒業したら、そのままPTのアカウントに切り替わります。
          </p>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {STUDENT_FEATURES.map((f) => (
              <li key={f.title} className="rounded-2xl border border-gray-200 p-5">
                <h3 className="text-base font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-7 text-gray-600">{f.body}</p>
              </li>
            ))}
          </ul>
          <Link
            href="/register?type=student"
            className="mt-8 inline-block rounded-full bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-800"
          >
            学生として無料ではじめる
          </Link>
        </div>
      </section>

      {/* 一般の方へ */}
      <section className="bg-[#f7faf9] px-6 py-16">
        <div className="mx-auto max-w-5xl md:flex md:items-center md:justify-between md:gap-10">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">一般の方へ</h2>
            <p className="mt-4 text-sm leading-7 text-gray-600">
              地域や専門分野から理学療法士を探し、プロフィールやポートフォリオ、レビューを見比べられます。
              病院ページでは疾患比率や採用情報、理学療法士による口コミも確認できます。
            </p>
          </div>
          <Link
            href="/register?type=general"
            className="mt-6 inline-block rounded-full border border-gray-900 px-6 py-3 text-sm font-medium hover:bg-white md:mt-0"
          >
            一般の方の無料登録
          </Link>
        </div>
      </section>

      {/* はじめ方 */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">はじめ方はかんたん3ステップ</h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.title} className="rounded-2xl border border-gray-200 p-6">
                <p className="text-xs font-semibold text-gray-500">STEP {i + 1}</p>
                <h3 className="mt-2 text-base font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-7 text-gray-600">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#f7faf9] px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">よくある質問</h2>
          <div className="mt-8 divide-y divide-gray-200 rounded-2xl bg-white px-6">
            {FAQS.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="cursor-pointer list-none text-base font-medium">
                  <span className="mr-2 text-gray-400 group-open:hidden">＋</span>
                  <span className="mr-2 hidden text-gray-400 group-open:inline">−</span>
                  {f.q}
                </summary>
                <p className="mt-3 text-sm leading-7 text-gray-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 最後のCTA */}
      <section className="px-6 py-20 text-center text-white" style={gradient}>
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">学びと経験を、つながりに変えよう。</h2>
        <p className="mt-4 text-sm opacity-95">登録無料・メールアドレスだけで1分。</p>
        <div className="mx-auto mt-8 max-w-sm">
          <PrimaryCta label="無料ではじめる" />
        </div>
      </section>

      <footer className="px-6 py-8 text-center text-xs text-gray-500">
        <div className="flex items-center justify-center gap-4">
          <Link href="/columns" className="hover:text-gray-700">
            コラム
          </Link>
          <Link href="/terms" className="hover:text-gray-700">
            利用規約
          </Link>
          <Link href="/privacy" className="hover:text-gray-700">
            プライバシーポリシー
          </Link>
        </div>
        <p className="mt-3">© {new Date().getFullYear()} Re:light</p>
      </footer>
    </main>
  );
}
