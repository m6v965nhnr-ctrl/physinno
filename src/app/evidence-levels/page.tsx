import type { Metadata } from "next";
import Link from "next/link";
import { EVIDENCE_LEVELS } from "@/lib/evidence";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const TITLE = "エビデンスレベル早見表（I〜VI）｜論文の強さの見分け方";
const DESCRIPTION =
  "システマティックレビュー、ランダム化比較試験、コホート研究、症例報告。論文の研究デザインごとの「エビデンスレベル」を、理学療法士向けに1枚で。論文を読む順番のコツつき。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/evidence-levels" },
  openGraph: { title: `${TITLE}｜${SITE_NAME}`, description: DESCRIPTION, url: "/evidence-levels" },
  twitter: { card: "summary_large_image", title: `${TITLE}｜${SITE_NAME}`, description: DESCRIPTION },
};

// 各レベルの説明（理学療法の例つき）
const DETAIL: Record<string, { what: string; example: string }> = {
  I: {
    what: "同じテーマの研究を、決めた手順で集めて評価し、まとめた研究。ランダム化比較試験を統合した結果が、最も強い根拠になる。",
    example: "「脳卒中後の歩行訓練の効果」を、複数のRCTから統合して調べた論文",
  },
  II: {
    what: "参加者を、くじ引きのようにランダムに2つ以上のグループへ分けて、介入の効果を比べた研究。",
    example: "ランダムに、運動療法あり・なしの2群に分けて、痛みを比べた論文",
  },
  III: {
    what: "グループ分けがランダムではない比較試験。偏り（もともと状態のよい人が介入群に入るなど）が入りやすい。",
    example: "病棟ごとに介入を変えて、退院時のADLを比べた論文",
  },
  IVa: {
    what: "集団を追いかけて、要因（運動習慣など）と結果（転倒など）の関係を調べる研究。時間の流れで見るので、関連を示しやすい。",
    example: "高齢者を3年追って、握力と要介護の発生の関係を調べた論文",
  },
  IVb: {
    what: "症例対照研究は、病気のある人とない人を比べて原因を探す研究。横断研究は、ある時点の状態を一度に調べる研究。因果は言いにくい。",
    example: "ある時点で、腰痛のある人とない人の体幹筋量を比べた論文",
  },
  V: {
    what: "1人（または数人）の経過を詳しく述べた報告。珍しい症例や、新しい工夫のヒントになるが、一般化はできない。",
    example: "まれな神経疾患の患者さんの、リハビリの経過を報告した論文",
  },
  VI: {
    what: "患者さんのデータに基づかない、専門家や委員会の意見。診療ガイドラインの推奨や、論説（エディトリアル）もここに入れて扱うことが多い。",
    example: "専門学会の見解・提言、編集者の論説",
  },
};

const TIPS = [
  {
    title: "まずは、レベルIのまとめ（システマティックレビュー）から探す",
    body: "テーマ全体の答えを、短時間でつかめます。見つからないときは、レベルIIのRCTを新しい順に読みます。",
  },
  {
    title: "レベルが高い＝質が高い、ではない",
    body: "このレベルは「研究のデザイン」で決まります。人数が少ない、追跡できていない、結果の測り方が偏っているRCTは、質が下がります。原文で、対象者・比べ方・結果の数字を確認しましょう。",
  },
  {
    title: "介入の効果を知りたいなら、IIとI。原因や予後なら、IV",
    body: "「この治療は効くか」はRCT、「この要因があると悪くなるか」はコホート研究が向いています。知りたいことに合うデザインを選びます。",
  },
];

export default function EvidenceLevelsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: SITE_NAME, item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "エビデンスレベル早見表", item: `${SITE_URL}/evidence-levels` },
    ],
  };

  return (
    <main className="min-h-screen bg-[#fafafa] px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-800">
          ← {SITE_NAME}
        </Link>

        <h1 className="mt-6 text-2xl font-bold leading-snug text-gray-900 sm:text-3xl">
          エビデンスレベル早見表
          <span className="block text-base font-semibold text-gray-600 sm:text-lg">論文の研究デザインごとの強さ（I〜VI）</span>
        </h1>

        <p className="mt-4 text-sm leading-7 text-gray-700">
          論文を読むときの最初の問いは、「これは、どんなデザインの研究か」です。日本の診療ガイドライン作成で使われてきた、
          Minds（日本医療機能評価機構）の分類（2007年版）を、理学療法の例で整理しました。
        </p>

        <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-sky-600 text-white">
              <tr>
                <th className="w-20 px-4 py-3 font-semibold">レベル</th>
                <th className="px-4 py-3 font-semibold">研究のデザイン</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {EVIDENCE_LEVELS.map((l) => (
                <tr key={l.key}>
                  <td className="px-4 py-3 text-lg font-bold text-sky-700">{l.key}</td>
                  <td className="px-4 py-3 leading-6 text-gray-800">{l.label}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="mt-12 text-lg font-bold text-gray-900">それぞれ、どんな研究？</h2>
        <div className="mt-4 space-y-3">
          {EVIDENCE_LEVELS.map((l) => (
            <section key={l.key} className="rounded-2xl bg-white p-5">
              <h3 className="text-base font-semibold text-gray-900">
                <span className="mr-2 rounded-full bg-sky-100 px-2.5 py-0.5 text-sm font-bold text-sky-800">レベル{l.key}</span>
                {l.short}
              </h3>
              <p className="mt-2 text-sm leading-7 text-gray-700">{DETAIL[l.key].what}</p>
              <p className="mt-1 text-xs leading-6 text-gray-500">例：{DETAIL[l.key].example}</p>
            </section>
          ))}
        </div>

        <h2 className="mt-12 text-lg font-bold text-gray-900">使いこなすコツ</h2>
        <div className="mt-4 space-y-4">
          {TIPS.map((t) => (
            <section key={t.title} className="rounded-2xl bg-white p-5">
              <h3 className="text-base font-semibold text-gray-900">{t.title}</h3>
              <p className="mt-2 text-sm leading-7 text-gray-700">{t.body}</p>
            </section>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-relight-gradient px-6 py-5 text-white">
          <p className="text-base font-semibold">この分類で、論文を絞り込んで探せます</p>
          <p className="mt-1 text-sm leading-6 text-white/95">
            Re:lightの論文検索は、PubMed・J-STAGE・PEDroなど9つのサイトを横断し、エビデンスレベルI〜VIで絞り込めます（PT・学生のアカウント。無料）。
          </p>
          <Link
            href="/register?utm_source=site&utm_medium=evidence-levels"
            className="mt-4 inline-block rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-gray-900"
          >
            無料ではじめる
          </Link>
        </div>

        <p className="mt-10 text-xs leading-6 text-gray-500">
          出典：日本医療機能評価機構「Minds診療ガイドライン作成の手引き 2007」のエビデンスレベル分類。
          なお、2014年以降のMinds手引きでは、研究デザインのレベルではなく、複数の研究をまとめた「エビデンス総体の強さ（A〜D）」で評価します。
          ここでは、論文を1本ずつ見分けるための目安として、2007年版の分類を使っています。レベルは目安であり、研究の質を保証するものではありません。
        </p>
      </div>
    </main>
  );
}
