// サイト全体で使うSEO用の基本情報
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://relight-1wet.vercel.app";

export const SITE_NAME = "Re:light";

export const SITE_TITLE = "Re:light（リライト）｜理学療法士のための症例共有・研修情報コミュニティ";

export const SITE_DESCRIPTION =
  "Re:lightは理学療法士（PT）のためのコミュニティアプリです。症例の共有・相談、全国の研修・学会情報のチェック、PT同士のつながりを無料で。一般の方は、地域や専門分野から理学療法士を探せます。";
