import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

const TITLE = "大学・専門学校の先生へ｜国試の一問一答を、クラスで使う";
const DESCRIPTION =
  "理学療法士国家試験の過去問（第56〜61回）の一問一答を、クラスの課題として配れます。学生ごとの状況、単元ごとの正答率、正答率の低い問題が見られます。無料で、先生のアカウントを作れます。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/teachers" },
  openGraph: { title: `${TITLE}｜${SITE_NAME}`, description: DESCRIPTION, url: "/teachers" },
  twitter: { card: "summary_large_image", title: `${TITLE}｜${SITE_NAME}`, description: DESCRIPTION },
};

const FEATURES = [
  { icon: "📝", title: "国試の過去問から、テストをつくる", body: "第56〜61回・約1,200問から、単元・回・キーワードで問題を選び、下書きをつくります（難易度での絞り込みは、今後実装予定です）。問題の確認（正答・解説つき）・追加・外す・並べ替えをしてから、学生に配れます。複製して、次のテストにも使えます。" },
  { icon: "👥", title: "クラスは、参加コードだけ", body: "クラスを作ると、6文字の参加コードが出ます。学生がコードを入れるだけで参加できます。学生は、いつでも退出できます。" },
  { icon: "📊", title: "クラスの状況が、ひと目で", body: "学生ごとの提出状況と正答率（フォローが必要そうな順）、単元ごとの正答率、正答率の低い問題。学生ごとの状況は、CSVで保存できます。" },
  { icon: "🔎", title: "課題ごとの結果", body: "提出した人数、平均正答率、学生ごとの結果、問題ごとの正答率を、課題ごとに見られます。授業で取り上げる問題の目安になります。" },
];

const STEPS = [
  { title: "先生のアカウントを、無料でつくる", body: "お名前・所属・メールアドレスだけで、1分。PTのプロフィールなどは、いりません。" },
  { title: "運営が確認して、承認", body: "登録した所属をもとに、運営が先生であることを確認します。承認されると、クラスと課題を作れるようになります。" },
  { title: "クラスをつくり、コードを伝える", body: "学生は「クラスの課題」にコードを入れて参加。課題を配れば、結果が集まります。" },
];

export default function TeachersPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-800">
          ← {SITE_NAME}
        </Link>

        <h1 className="mt-6 text-2xl font-bold leading-snug text-gray-900 sm:text-3xl">
          大学・専門学校の先生へ
          <span className="block text-base font-semibold text-gray-600 sm:text-lg">国試の一問一答を、クラスで使えます</span>
        </h1>
        <p className="mt-4 text-balance text-sm leading-7 text-gray-700">
          Re:lightは、理学療法士と、理学療法士をめざす学生のための、無料のWebアプリです。学生が使っている国試の過去問ドリル（一問一答）を、先生がクラスの課題として配り、結果をまとめて見られます。
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href="/register?type=teacher" className="inline-flex items-center justify-center rounded-full bg-relight-gradient px-7 py-4 text-base font-bold shadow-[0_6px_16px_rgba(38,169,189,0.35)] transition hover:brightness-95">
            無料で、先生のアカウントをつくる
          </Link>
          <Link href="/login?next=/student/quiz/teacher" className="inline-flex items-center justify-center rounded-full border-2 border-gray-300 bg-white px-7 py-3.5 text-base font-bold text-gray-800 transition hover:bg-gray-50">
            アカウントをお持ちの方
          </Link>
        </div>
        <p className="mt-2 text-xs leading-6 text-gray-500">料金は、いまは無料です。大学・学科としての使い方は、先生のご意見を聞きながら決めていきます。</p>

        <section className="mt-10" aria-labelledby="t-features">
          <h2 id="t-features" className="text-lg font-bold text-gray-900">先生ができること</h2>
          <ul className="mt-3 grid gap-3">
            {FEATURES.map((f) => (
              <li key={f.title} className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-4">
                <span aria-hidden="true" className="text-2xl">{f.icon}</span>
                <div>
                  <h3 className="text-base font-bold text-gray-900">{f.title}</h3>
                  <p className="mt-1 text-sm leading-7 text-gray-700">{f.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10" aria-labelledby="t-steps">
          <h2 id="t-steps" className="text-lg font-bold text-gray-900">使いはじめるまで</h2>
          <ol className="mt-3 grid gap-3">
            {STEPS.map((s, i) => (
              <li key={s.title} className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-4">
                <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-relight-gradient text-sm font-bold">{i + 1}</span>
                <div>
                  <h3 className="text-base font-bold text-gray-900">{s.title}</h3>
                  <p className="mt-1 text-sm leading-7 text-gray-700">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-5" aria-labelledby="t-safe">
          <h2 id="t-safe" className="text-lg font-bold text-gray-900">学生の情報について</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-7 text-gray-700">
            <li>先生に見えるのは、いまクラスにいる学生の、<strong>配った課題の結果（名前・正誤）だけ</strong>です。学生が自分で解いた通常の記録は、見えません。</li>
            <li>学生は、いつでもクラスを退出できます。退出すると、先生の画面から消えます。</li>
            <li>学生どうしのランキングは、学生が非表示にできます。</li>
          </ul>
        </section>

        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-5" aria-labelledby="t-note">
          <h2 id="t-note" className="text-lg font-bold text-gray-900">お伝えしておきたいこと</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-7 text-gray-700">
            <li>解説は、AIが書いたもので、専門家の監修を受けていません。「AIが作成。誤りを含むことがある」と画面にも表示しています。先生に確認・監修していただける形を、ご相談したいと考えています。</li>
            <li>問題・正答は、厚生労働省が公開している国家試験のものです（第56〜61回）。</li>
            <li>まだ立ち上げたばかりで、先生の機能は、これから先生のご意見で育てていくものです。「こんな機能があれば使いたい」を、教えてください。</li>
            <li>理学療法士でなくても、登録できます。うまく登録できないときは、意見箱からお知らせください。</li>
          </ul>
          <div className="mt-4">
            <Link href="/feedback" className="inline-flex items-center justify-center rounded-full border-2 border-gray-300 px-6 py-3 text-sm font-bold text-gray-800 hover:bg-gray-50">
              ご意見・ご要望を送る（登録なし・匿名）
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
