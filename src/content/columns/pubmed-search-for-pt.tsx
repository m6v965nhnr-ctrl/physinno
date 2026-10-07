import Link from "next/link";

export default function PubmedSearchForPt() {
  return (
    <div className="column-body">
      <p>
        PubMedは、米国国立医学図書館（NLM）が無料で公開している、医学・生命科学の論文データベースです。理学療法の論文を探すときの、基本の使い方を整理します。
      </p>

      <h2>1. 検索語は、英語で、短く</h2>
      <p>
        PubMedは英語の論文が中心なので、検索語も英語にします。たとえば「変形性膝関節症の運動療法」なら、<code>knee osteoarthritis exercise</code> のように、主要な言葉を並べます。文章で入れるより、キーワードを並べるほうが、見つけやすくなります。
      </p>

      <h2>2. 臨床の疑問を、PICOに分ける</h2>
      <table>
        <thead>
          <tr><th></th><th>意味</th><th>例</th></tr>
        </thead>
        <tbody>
          <tr><td>P</td><td>対象（どんな患者・状態か）</td><td>脳卒中後の片麻痺</td></tr>
          <tr><td>I</td><td>介入（何をするか）</td><td>歩行練習</td></tr>
          <tr><td>C</td><td>比較（何と比べるか）</td><td>通常の理学療法</td></tr>
          <tr><td>O</td><td>アウトカム（何を見るか）</td><td>歩行速度</td></tr>
        </tbody>
      </table>
      <p>
        P・I・Oの言葉を <code>AND</code> でつなぎます（例: <code>stroke AND gait training AND walking speed</code>）。同じ意味の言葉は、<code>OR</code> でまとめます（例: <code>(stroke OR cerebrovascular accident)</code>）。
      </p>

      <h2>3. 結果を、絞り込む</h2>
      <ul>
        <li>
          <strong>論文の種類（Article type）で絞る。</strong>
          検索結果の画面の左側のフィルタで、Randomized Controlled Trial、Systematic Review、Meta-Analysis などを選べます。
        </li>
        <li>
          <strong>年で絞る。</strong>
          新しい研究を見たいときは、直近5年などに絞ります。
        </li>
        <li>
          <strong>全文が無料で読めるものに絞る。</strong>
          Free full text を選ぶと、すぐ読める論文だけが出ます。
        </li>
      </ul>

      <h2>4. 見つけたら、まず要約で確認</h2>
      <p>
        題名と要約（Abstract）で、対象者・介入・比べ方・結果をつかみます。自分の疑問に合うものだけ、全文を開きます。論文の種類ごとの強さは、
        <Link href="/evidence-levels" className="mx-1 underline">エビデンスレベル早見表</Link>
        が目安になります。
      </p>

      <h2>理学療法に特化した、もうひとつのデータベース</h2>
      <p>
        PEDro（Physiotherapy Evidence Database）は、理学療法のRCT・システマティックレビュー・ガイドラインを集めたデータベースで、RCTの質をスコアで示しています。日本語の論文は、J-STAGEやCiNii Researchで探せます。
      </p>

      <div className="column-note">
        Re:lightの論文検索は、PubMed・J-STAGE・CiNii Research・PEDro・Semantic Scholar・Europe PMC・OpenAlex・ClinicalTrials.gov・DOAJを、一度に検索できます。日本語で検索語を入れると、英語にも自動で変換して検索します。要約の日本語訳、エビデンスレベルでの絞り込み、保存もできます（PT・学生のアカウントで無料）。
        <Link href="/register" className="mx-1 underline">無料で登録する</Link>
      </div>
    </div>
  );
}
