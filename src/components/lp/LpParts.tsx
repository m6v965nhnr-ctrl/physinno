import Link from "next/link";
import { PIXEL_ENABLED } from "@/lib/metaPixel";

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

// ボタンの形（濃い緑＝登録、白＋緑の枠＝中を見る）
export const BTN_PRIMARY = "inline-flex items-center justify-center rounded-full bg-relight-gradient px-7 py-4 text-base font-bold shadow-[0_6px_16px_rgba(38,169,189,0.35)] transition hover:brightness-95 active:scale-[0.98]";
export const BTN_SECONDARY = "inline-flex items-center justify-center rounded-full border-2 border-[var(--lp-g700)] bg-white px-7 py-3.5 text-base font-bold text-[var(--lp-g700)] transition hover:bg-[var(--lp-g50)] active:scale-[0.98]";
export const SECTION_LABEL = "text-xs font-bold tracking-[0.14em] text-[var(--lp-g600)]";
export const H2 = "mt-2 text-2xl font-bold leading-snug tracking-tight md:text-3xl";


export function SafetySection({ registerHref }: { registerHref: string }) {
  return (
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
  );
}

export function FaqSection({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
      <section id="faq" className="bg-[var(--lp-g50)] px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <p className={SECTION_LABEL}>FAQ</p>
          <h2 className={H2}>よくある質問</h2>
          <div className="mt-6 divide-y divide-[var(--lp-g100)] rounded-2xl border border-[var(--lp-g200)] bg-white px-6 shadow-sm">
            {faqs.map((f) => (
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
  );
}

export function FinalCta({ registerHref, title = "学びと経験を、ひとつに。" }: { registerHref: string; title?: string }) {
  return (
      <section className="bg-relight-gradient px-6 py-16 text-center">
        <h2 className="text-2xl font-bold leading-snug tracking-tight text-white md:text-3xl">{title}</h2>
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
  );
}

export function LpFooter() {
  return (
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
  );
}
