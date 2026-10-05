// サイト全体で使うSEO用の基本情報
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://relight-1wet.vercel.app";

export const SITE_NAME = "Re:light";

export const SITE_TITLE = "Re:light（リライト）｜理学療法士の症例共有・論文検索・病院情報コミュニティ";

export const SITE_DESCRIPTION =
  "Re:lightは理学療法士（PT）のためのコミュニティアプリです。症例の共有・相談、PubMedなど9サイトを横断する論文検索とAIモード、全国の研修・学会情報、関東の病院情報と職場環境の口コミ、PT同士のつながりを無料で。一般の方は、地域や専門分野から理学療法士を探せます。";
