import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "利用規約",
  description: `${SITE_NAME}の利用規約です。`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] px-6 py-12 print:bg-white">
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="text-sm text-gray-400 hover:text-gray-700">
          ← {SITE_NAME}
        </Link>

        <h1 className="mt-8 text-2xl font-semibold tracking-tight text-gray-900">
          利用規約
        </h1>
        <p className="mt-2 text-xs text-gray-400">最終更新日: 2026年9月28日</p>

        <div className="mt-8 space-y-8 text-sm leading-7 text-gray-700">
          <section>
            <p>
              この利用規約（以下「本規約」）は、{SITE_NAME}
              （以下「本サービス」）の利用条件を定めるものです。登録ユーザーの皆さま（以下「ユーザー」）には、本規約に同意のうえ本サービスをご利用いただきます。
            </p>
          </section>

          <Section title="第1条（適用）">
            本規約は、ユーザーと運営者との間の本サービスの利用に関わる一切の関係に適用されます。
          </Section>

          <Section title="第2条（利用登録）">
            本サービスは理学療法士（PT）および一般の方を対象とし、登録希望者が本規約に同意のうえ所定の方法で申請し、運営者がこれを承認することで登録が完了します。PTとしての登録における資格情報は自己申告であり、本サービスは資格の有無を保証しません。
          </Section>

          <Section title="第3条（禁止事項）">
            <p>ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>法令または公序良俗に違反する行為</li>
              <li>犯罪行為に関連する行為</li>
              <li>他のユーザーや第三者を誹謗中傷、脅迫する行為、またはなりすまし行為</li>
              <li>理学療法士等の資格を偽る行為</li>
              <li>患者を特定できる情報（氏名・生年月日・住所・顔写真等）を含む症例投稿を行う行為</li>
              <li>本サービスの内容を無断で複製・転載・改変する行為</li>
              <li>本サービスの運営を妨害するおそれのある行為</li>
              <li>その他、運営者が不適切と判断する行為</li>
            </ul>
          </Section>

          <Section title="第4条（症例・実績投稿に関する注意）">
            ユーザーが投稿する症例報告その他の情報は、患者を特定できない形に匿名化したうえで投稿するものとします。投稿内容は医療的助言や診断を目的とするものではなく、臨床上の最終判断はユーザー自身の専門的知見と責任において行うものとします。
          </Section>

          <Section title="第5条（知的財産権）">
            ユーザーが本サービスに投稿したコンテンツの著作権はユーザーに帰属します。ユーザーは、運営者が本サービスの提供・改善・宣伝に必要な範囲でこれを利用することを許諾するものとします。
          </Section>

          <Section title="第6条（免責事項）">
            運営者は、本サービスに投稿された情報の正確性・完全性・有用性について保証しません。本サービスの利用によってユーザーに生じた損害について、運営者に故意または重過失がある場合を除き、責任を負わないものとします。
          </Section>

          <Section title="第7条（利用制限・登録抹消）">
            運営者は、ユーザーが本規約に違反した場合その他運営者が必要と判断した場合、事前の通知なく当該ユーザーの投稿の削除、利用制限または登録抹消を行うことができるものとします。
          </Section>

          <Section title="第8条（サービス内容の変更・停止）">
            運営者は、ユーザーへの事前の通知なく、本サービスの内容を変更、追加または廃止することができるものとします。
          </Section>

          <Section title="第9条（本規約の変更）">
            運営者は、必要と判断した場合には、ユーザーへの通知をもって本規約を変更できるものとします。変更後の本規約は本ページに掲載した時点から効力を生じます。
          </Section>

          <Section title="第10条（準拠法・管轄裁判所）">
            本規約の解釈にあたっては日本法を準拠法とします。本サービスに関して紛争が生じた場合には、運営者の所在地を管轄する裁判所を専属的合意管轄とします。
          </Section>

          <p className="text-xs text-gray-400">
            お問い合わせは
            <Link href="/privacy" className="mx-1 underline">
              プライバシーポリシー
            </Link>
            記載の窓口までご連絡ください。
          </p>
        </div>
      </div>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-base font-semibold text-gray-900">{title}</h2>
      <div className="mt-2">{children}</div>
    </section>
  );
}
