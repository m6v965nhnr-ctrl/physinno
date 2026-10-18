// 論文検索で使っているデータ提供元の表示（各サイトの利用規約が求めるクレジット）
export default function PaperCredits() {
  return (
    <p className="text-[11px] leading-5 text-gray-500">
      検索結果は、各サイトの公開データを利用しています。
      <a href="https://www.jstage.jst.go.jp/" target="_blank" rel="noopener noreferrer" className="underline">Powered by J-STAGE</a>（科学技術振興機構）／
      <a href="https://cir.nii.ac.jp/" target="_blank" rel="noopener noreferrer" className="underline">CiNii Research</a>（国立情報学研究所）／
      <a href="https://www.semanticscholar.org/" target="_blank" rel="noopener noreferrer" className="underline">Semantic Scholar</a>（Allen Institute for AI）／
      <a href="https://pubmed.ncbi.nlm.nih.gov/" target="_blank" rel="noopener noreferrer" className="underline">PubMed</a>
      （米国国立医学図書館。NLMが、本サービスを承認・推奨するものではありません）／Europe PMC・OpenAlex・DOAJ・ClinicalTrials.gov。
      論文の著作権は、各著者・出版社にあります。
    </p>
  );
}
