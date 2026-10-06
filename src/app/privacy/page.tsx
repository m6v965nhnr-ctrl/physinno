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
        <p className="mt-2 text-xs text-gray-400">最終更新日: 2026年10月5日</p>

        <div className="mt-8 space-y-8 text-sm leading-7 text-gray-700">
          <section>
            <p>
              {SITE_NAME}
              （以下「本サービス」）の運営者（以下「運営者」）は、ユーザーの個人情報を適切に取り扱うことを重要な責務と認識し、個人情報の保護に関する法律（個人情報保護法）その他の関係法令を遵守します。本ポリシーは、本サービスで取り扱う情報の内容、利用目的、公開される範囲、外部への送信先、およびユーザーの権利を説明するものです。
            </p>
          </section>

          <Section title="運営者の情報">
            <ul className="list-disc space-y-1 pl-5">
              <li>運営者: Kazane Akimoto</li>
              <li>
                所在地: 神奈川県（番地以降は、開示のご請求があった場合に、本人確認のうえ遅滞なくお知らせします）
              </li>
              <li>
                連絡先:{" "}
                <a href="mailto:bupapabupapa7@gmail.com" className="underline">
                  bupapabupapa7@gmail.com
                </a>
                （またはサービス内の
                <Link href="/contact" className="mx-1 underline">
                  運営へのメッセージ
                </Link>
                ）
              </li>
            </ul>
          </Section>

          <Section title="1. 取得する情報">
            <p className="font-medium text-gray-900">ユーザーが入力・登録する情報</p>
            <ul className="mt-1 list-disc space-y-1 pl-5">
              <li>登録情報（メールアドレス、パスワード、アカウント種別）</li>
              <li>
                プロフィール情報（氏名、勤務先、所属、専門分野、経験年数、資格、学歴・職歴などのポートフォリオ情報、自己紹介、プロフィール写真など）
              </li>
              <li>
                非公開のプロフィール情報（免許番号、連絡先、生年月日、出身地、証明写真）
              </li>
              <li>
                投稿情報（症例報告、実績、コメント、いいね、フォロー、グループへの参加、グループ内メッセージ、病院の口コミ・評価など）
              </li>
              <li>ユーザー間のメッセージ</li>
              <li>
                一般ユーザーが任意で入力する病歴・持病（下記「2. 要配慮個人情報」を必ずご確認ください）
              </li>
              <li>
                学生アカウントの情報（卒業予定年、養成校名、国家試験日、実習先・就活先・提出物の管理記録、国試の学習ログ）。いずれも本人だけが見られます
              </li>
              <li>
                学校名（学生が登録した養成校名。入力した学校名は、ほかの学生・PTが学校名を入力するときの候補に表示されます。誰がその学校に所属しているかは表示されません）と、「試験情報」の投稿（科目、年度、試験の種類、難易度、出題の傾向・勉強法、覚えている出題内容、添付ファイル）。同じ学校を登録した学生・卒業生だけが読め、投稿者は表示されませんが、運営者は不正利用の防止などのため、投稿者のアカウントと紐づけて保存します
              </li>
              <li>
                学生が投稿する実習先の口コミ（実習生の声）と、「先輩に質問」の質問・回答。投稿者の名前は他のユーザーに表示されません（匿名の質問を選んだ場合も同様）が、運営者は不正利用の防止などのため、投稿者のアカウントと紐づけて保存します
              </li>
              <li>保存した論文、保存した研修・学会情報</li>
              <li>運営へのメッセージの内容</li>
              <li>
                通報の内容（通報者、対象の投稿・コメント・メッセージ・口コミ、理由、コメント）。運営者が、対応のために、通報された対象の内容（通報されたメッセージの本文を含みます）を確認します
              </li>
              <li>AIモードに入力した質問文</li>
            </ul>
            <p className="mt-3 font-medium text-gray-900">自動的に取得される情報</p>
            <ul className="mt-1 list-disc space-y-1 pl-5">
              <li>
                アクセスログ（IPアドレス、ブラウザ・端末の種類、アクセス日時、閲覧ページなど）。本サービスの提供基盤（下記7）で記録されます。
              </li>
              <li>
                ブラウザに保存される情報（ログイン状態の維持のための情報、論文検索の「最近の検索」履歴など。下記8）
              </li>
            </ul>
            <p className="mt-3">
              本サービスは、広告配信や行動の分析を目的とした解析ツール・トラッキングは使用していません。
            </p>
          </Section>

          <Section title="2. 要配慮個人情報（病歴・持病）の取扱い">
            <p>
              病歴・持病等の健康に関する情報は、個人情報保護法上の「要配慮個人情報」にあたります。本サービスでは、一般ユーザーが任意で病歴・持病を入力できます。これは必須ではなく、入力しなくても基本機能は利用できます。入力して保存することにより、下記の取扱いについて同意したものとします。
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                項目ごとに「公開／非公開」を選べます。<strong>非公開</strong>
                の項目は、本人以外には表示されません。
              </li>
              <li>
                <strong>公開</strong>
                にした項目は、あなたがメッセージを送った理学療法士にのみ表示されます。やり取りのない理学療法士や、他の一般ユーザーには表示されません。
              </li>
              <li>入力した情報は、マイページからいつでも削除できます。</li>
              <li>
                これらの情報は、メッセージ相手の理学療法士に状況を伝える目的以外には利用しません。
              </li>
            </ul>
          </Section>

          <Section title="3. 利用目的">
            <ul className="list-disc space-y-1 pl-5">
              <li>本サービスの提供、運営、維持、改善のため</li>
              <li>ユーザー認証、本人確認、アカウントの管理のため</li>
              <li>投稿、メッセージ、通知、検索などの機能を提供するため</li>
              <li>お問い合わせ、権利の請求への対応のため</li>
              <li>不正利用・規約違反行為の防止と対応、安全の確保のため</li>
              <li>新機能やお知らせの案内、重要なご連絡のため</li>
              <li>統計データ（個人を特定できない形に加工したもの）の作成と、サービス改善のため</li>
              <li>法令に基づく対応のため</li>
            </ul>
            <p className="mt-2">
              取得した個人情報は、上記の目的の範囲を超えて利用しません。目的を変更する場合は、本ポリシーの改定として周知し、必要に応じて同意をいただきます。
            </p>
          </Section>

          <Section title="4. 公開される情報と、公開されない情報">
            <p>
              理学療法士の検索、個別プロフィール、ポートフォリオ、病院ページは、サービスの性質上、ログインしていない方にも表示されます。
            </p>
            <div className="mt-3 overflow-hidden rounded-xl border border-gray-200">
              <table className="w-full text-left text-xs leading-6">
                <thead className="bg-gray-50 text-gray-500">
                  <tr>
                    <th className="px-3 py-2 font-medium">区分</th>
                    <th className="px-3 py-2 font-medium">主な情報</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-3 py-2 align-top font-medium text-gray-900">
                      誰でも見られる
                    </td>
                    <td className="px-3 py-2">
                      理学療法士のプロフィール（氏名、勤務先、専門分野、経験年数、資格、自己紹介、プロフィール写真など）、「公開」にした投稿・ポートフォリオ、コメント、いいね、フォローの関係、病院の口コミの内容（投稿者名は表示されません）
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 align-top font-medium text-gray-900">
                      ログインした人だけ
                    </td>
                    <td className="px-3 py-2">
                      一部の投稿、グループの一覧、研修・学会情報、実習生の声（PTと学生のみ）、先輩への質問と回答（PTと学生のみ）、試験情報（同じ学校を登録した人のみ）
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 align-top font-medium text-gray-900">
                      本人以外には見えない
                    </td>
                    <td className="px-3 py-2">
                      メールアドレス、パスワード、免許番号、連絡先、生年月日、出身地、<strong>証明写真</strong>
                      、非公開の病歴、保存した論文、通知、学生の養成校名・卒業予定年・国家試験日・実習や就活の管理記録・学習ログ。ユーザー間のメッセージは、やり取りの当事者のみが見られます
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3">
              公開範囲は、プロフィール編集や各投稿の設定からいつでも変更できます。一度公開された情報は、検索エンジンや第三者によって保存・複製される場合があり、運営者がすべてを回収することはできません。公開する情報は慎重にご判断ください。
            </p>
          </Section>

          <Section title="5. 匿名機能の仕組み">
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <strong>病院の口コミ</strong>
                で「匿名で投稿する」を選んだ場合、他のユーザーには投稿者が分からない状態で表示されます。ただし、運営者は、不正利用の防止などのため、匿名の口コミも投稿者のアカウントと紐づけて保存しています。
              </li>
              <li>
                口コミによって権利が侵害されたとの請求があり、法令（プロバイダ責任制限法等）に基づく適正な手続きがあった場合は、法令の範囲で投稿者の情報を開示することがあります。
              </li>
              <li>
                <strong>運営へのメッセージ</strong>
                で「匿名で送る」を選んだ場合は、アカウントとは紐づけずに保存します（返信はできません）。
              </li>
            </ul>
          </Section>

          <Section title="6. 第三者提供">
            <p>
              運営者は、次の場合を除き、ユーザーの同意なく個人データを第三者に提供しません。
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>法令に基づく場合</li>
              <li>人の生命、身体または財産の保護のために必要で、本人の同意を得ることが困難な場合</li>
              <li>公衆衛生の向上のために特に必要で、本人の同意を得ることが困難な場合</li>
              <li>国の機関等の法令に定める事務への協力が必要な場合</li>
              <li>事業の承継に伴って提供する場合（承継先は本ポリシーに従います）</li>
            </ul>
          </Section>

          <Section title="7. 外部サービスへの委託・情報の送信（外国を含む）">
            <p>
              本サービスは、次の外部サービスを利用しており、そのために情報が外部に送信・保存されます。これらの事業者のサーバーは日本国外にある場合があります（データベースとファイルの保存先は日本（東京）ですが、事業者は米国の法人です。配信基盤・AI・論文データベース等の事業者のサーバーは主に米国などにあります）。これらの国の個人情報保護の制度は日本と異なることがあります。運営者は、委託先に対して、必要な範囲でのみ情報を取り扱わせ、適切な管理を求めます。
            </p>
            <div className="mt-3 overflow-hidden rounded-xl border border-gray-200">
              <table className="w-full text-left text-xs leading-6">
                <thead className="bg-gray-50 text-gray-500">
                  <tr>
                    <th className="px-3 py-2 font-medium">利用する外部サービス</th>
                    <th className="px-3 py-2 font-medium">送信・保存される情報</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-3 py-2 align-top font-medium text-gray-900">
                      Supabase
                    </td>
                    <td className="px-3 py-2">
                      データベース、認証、ファイル保存。登録情報・投稿・メッセージ・画像などすべてのデータを保存
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 align-top font-medium text-gray-900">
                      Vercel
                    </td>
                    <td className="px-3 py-2">
                      本サービスの配信基盤。アクセスログ（IPアドレス、ブラウザ情報、閲覧ページなど）
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 align-top font-medium text-gray-900">
                      Google（Gemini API）
                    </td>
                    <td className="px-3 py-2">
                      AIモードで入力した質問文、直近の会話の履歴、検索で取得した論文のタイトルと要約。氏名やメールアドレス等のアカウント情報は送信しません。
                      <strong>
                        無料枠の利用のため、Googleの規約により、入力内容がGoogleのサービス改善に利用されたり、人が確認したりする場合があります。
                      </strong>
                      質問文に、患者さんや個人を特定できる情報を入力しないでください
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 align-top font-medium text-gray-900">
                      論文データベース
                      <br />
                      <span className="font-normal text-gray-500">
                        （PubMed、Europe PMC、OpenAlex、Semantic Scholar、J-STAGE、CiNii Research、DOAJ、ClinicalTrials.gov、PEDro）
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      論文検索で入力した検索語（個人を特定する情報は送信しません）
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 align-top font-medium text-gray-900">
                      メール送信サービス
                      <br />
                      <span className="font-normal text-gray-500">（Google の Gmail）</span>
                    </td>
                    <td className="px-3 py-2">
                      通知メールの宛先（登録したメールアドレス）と、「〇〇さんからメッセージが届きました」のような通知の件名・本文。コメントやメッセージの本文は含めません。「通知」画面の「メールで通知を受け取る」をオフにすると送信を止められます
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 align-top font-medium text-gray-900">
                      MyMemory（翻訳サービス）
                    </td>
                    <td className="px-3 py-2">
                      日本語と英語の検索語の自動翻訳、論文タイトルの翻訳のために、検索語や論文タイトルを送信
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3">
              「Google Scholar」「医中誌Web」「Cochrane Library」「Physiopedia」などは、外部サイトへのリンクを開くだけで、本サービスから情報を送信することはありません（リンク先でのお客様の操作は、各サイトの規約・ポリシーに従います）。
            </p>
          </Section>

          <Section title="8. Cookieとブラウザの保存領域">
            <p>
              本サービスは、ログイン状態を保つために、Cookieおよびブラウザのローカルストレージを使用します。また、論文検索の「最近の検索」は、お使いの端末のブラウザにのみ保存され、運営者のサーバーには送信されません。ブラウザの設定で無効にしたり削除したりできますが、その場合、ログインが維持されないなど、一部の機能が使えなくなることがあります。
            </p>
          </Section>

          <Section title="9. 安全管理措置と、漏えい時の対応">
            <p>
              運営者は、個人情報の漏えい、滅失、毀損を防ぐため、データベースの行単位のアクセス制御（本人しか読めない設定）、通信の暗号化、非公開ファイルの保存領域の分離、管理権限の制限など、必要かつ適切な措置を講じます。ただし、不正アクセスやサイバー攻撃などによる漏えいのリスクを完全になくすことはできません。
            </p>
            <p className="mt-2">
              万一、個人情報の漏えい等が発生したときは、速やかに影響範囲を調査し、法令に従って、個人情報保護委員会への報告と、影響を受ける本人への通知（または本サービス上での公表）を行います。
            </p>
          </Section>

          <Section title="10. 保存期間と削除">
            <p>
              個人情報は、利用目的に必要な期間保存します。ユーザーが退会を請求した場合は、法令で保存が必要な情報を除き、合理的な期間内にアカウントと関連する個人情報を削除します。バックアップに残る情報は、一定期間の経過後に消去されます。ほかのユーザーとのメッセージなど、その性質上、相手側に残る内容は削除されない場合があります。
            </p>
          </Section>

          <Section title="11. 開示・訂正・利用停止・削除などの請求">
            <p>
              ユーザーは、自己の個人情報について、マイページで確認・訂正・削除ができます。画面から対応できないもの（開示、利用停止、退会に伴う削除など）は、下記の窓口から請求できます。請求にあたっては、ご本人であることを確認するため、ログイン中のアカウントからのご連絡、または必要な確認をお願いすることがあります。手数料はいただきません。請求には、法令の定めに従い、合理的な期間内に対応します。
            </p>
          </Section>

          <Section title="12. 未成年者の利用">
            <p>
              未成年の方が本サービスを利用する場合は、保護者の同意を得たうえでご利用ください。
            </p>
            <p className="mt-2">
              学生アカウントは、卒業予定年の翌年の4月1日（日本時間）に、自動でPTのアカウントに切り替わります。切り替え後も、学生のときに記録した情報（養成校名・卒業予定年・管理記録・学習ログなど）は、本人だけが見られる状態で保存され、運営へのメッセージからの請求により削除できます。
            </p>
          </Section>

          <Section title="13. お問い合わせ・苦情の窓口">
            <p>
              本ポリシーに関するお問い合わせ、個人情報に関する請求、苦情は、
              <Link href="/contact" className="mx-1 underline">
                運営へのメッセージ
              </Link>
              からご連絡ください（アカウントと紐づけたい場合は匿名にチェックを入れずに送信してください）。メールでのご連絡は、運営者の連絡先（
              <a href="mailto:bupapabupapa7@gmail.com" className="underline">
                bupapabupapa7@gmail.com
              </a>
              ）宛にお願いします。
            </p>
          </Section>

          <Section title="14. 本ポリシーの変更">
            <p>
              運営者は、法令の変更やサービスの変更に合わせて、本ポリシーを改定することがあります。重要な変更（利用目的の変更、新たな外部送信先の追加など）は、変更内容と施行日を、本サービス上で事前に周知します。
            </p>
          </Section>

          <p className="text-xs text-gray-400">
            本ページの内容は、一般的な法令の考え方に沿って作成していますが、個別の事案に対する法律上の助言ではありません。
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
