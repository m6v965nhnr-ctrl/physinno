import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: `${SITE_NAME}のプライバシーポリシーです。`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] px-6 py-12 print:bg-white">
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="text-sm text-gray-400 hover:text-gray-700">
          ← {SITE_NAME}
        </Link>

        <h1 className="mt-8 text-2xl font-semibold tracking-tight text-gray-900">
          プライバシーポリシー
        </h1>
        <p className="mt-2 text-xs text-gray-400">最終更新日: 2026年9月28日</p>

        <div className="mt-8 space-y-8 text-sm leading-7 text-gray-700">
          <section>
            <p>
              {SITE_NAME}
              （以下「本サービス」）は、ユーザーの個人情報を適切に取り扱うことを重要な責務と認識し、個人情報の保護に関する法律その他の関係法令を遵守します。
            </p>
          </section>

          <Section title="1. 取得する情報">
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>登録情報（メールアドレス、アカウント種別）</li>
              <li>
                プロフィール情報（氏名、勤務先、専門分野、経験年数、資格、学歴・職歴等のポートフォリオ情報、証明写真等。ユーザーが任意で入力したもの）
              </li>
              <li>投稿情報（症例報告・実績・コメント・レビュー等）</li>
              <li>メッセージ機能を通じてユーザー間でやり取りされる情報</li>
              <li>アクセスログ・Cookie等の利用状況に関する情報</li>
            </ul>
          </Section>

          <Section title="2. 利用目的">
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>本サービスの提供・維持・改善のため</li>
              <li>本人確認、お問い合わせ対応のため</li>
              <li>利用規約に違反する行為への対応のため</li>
              <li>新機能・お知らせ等のご案内のため</li>
              <li>統計データの作成（個人を特定できない形に加工したもの）のため</li>
            </ul>
          </Section>

          <Section title="3. 公開範囲について">
            <p>
              PTプロフィール検索（/pts）および個別プロフィール・ポートフォリオページは、サービスの性質上、ログインの有無にかかわらず公開されます。氏名・所属・専門分野・経験年数・症例実績等、ユーザーが「公開」に設定した項目のみが表示され、免許番号・個人連絡先等の機微な情報は初期設定では非公開です。公開範囲はプロフィール編集画面からいつでも変更できます。
            </p>
          </Section>

          <Section title="4. 第三者提供">
            <p>
              取得した個人情報は、法令に基づく場合を除き、ユーザーの同意なく第三者に提供することはありません。
            </p>
          </Section>

          <Section title="5. 業務委託">
            <p>
              本サービスは、データベース・認証基盤としてSupabase、ホスティング基盤としてVercelを利用しています。これらの委託先に対しては、必要な範囲でのみ情報を取り扱わせ、適切な管理を求めます。
            </p>
          </Section>

          <Section title="6. Cookie等の利用">
            <p>
              本サービスは、ログイン状態の維持等のためCookieおよび類似技術を使用します。ブラウザの設定によりCookieを無効化できますが、その場合一部機能がご利用いただけなくなることがあります。
            </p>
          </Section>

          <Section title="7. 安全管理措置">
            <p>
              取得した個人情報の漏えい、滅失またはき損の防止その他の安全管理のために必要かつ適切な措置を講じます。
            </p>
          </Section>

          <Section title="8. 開示・訂正・削除等の請求">
            <p>
              ユーザーは、自己の個人情報についてマイページ編集画面からいつでも確認・訂正・削除を行うことができます。アカウントの削除等、画面から対応できない請求については下記お問い合わせ窓口までご連絡ください。
            </p>
          </Section>

          <Section title="9. 未成年者の利用">
            <p>
              未成年者が本サービスを利用する場合は、保護者の同意を得たうえでご利用ください。
            </p>
          </Section>

          <Section title="10. お問い合わせ窓口">
            <p>
              本ポリシーに関するお問い合わせは、アプリ内メッセージ機能または運営者宛のメールにてご連絡ください。
            </p>
          </Section>

          <Section title="11. 本ポリシーの変更">
            <p>
              本ポリシーの内容は、必要に応じて予告なく変更されることがあります。変更後の内容は本ページに掲載した時点から効力を生じます。
            </p>
          </Section>
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
