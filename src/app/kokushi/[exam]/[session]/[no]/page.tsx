import { ldJson } from "@/lib/jsonLd";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import {
  QUESTIONS_PER_SESSION,
  SESSION_LABEL,
  examYear,
  getPublicList,
  getPublicQuestion,
  isSession,
  questionPath,
  questionTitle,
} from "@/lib/kokushi";
import KokushiCta from "../../../KokushiCta";
import AnswerReveal from "./AnswerReveal";

export const revalidate = 86400;

type Props = { params: Promise<{ exam: string; session: string; no: string }> };

async function load(params: Props["params"]) {
  const { exam, session, no } = await params;
  const examNo = Number(exam);
  const qNo = Number(no);
  if (!Number.isInteger(examNo) || !Number.isInteger(qNo) || !isSession(session)) return null;
  if (qNo < 1 || qNo > QUESTIONS_PER_SESSION) return null;
  return getPublicQuestion(examNo, session, qNo);
}

function plain(text: string) {
  return text.replace(/\s+/g, " ").trim();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const q = await load(params);
  if (!q) return { title: "過去問", robots: { index: false } };
  const title = `${questionTitle(q)}${q.unit_name ? `（${q.unit_name}）` : ""}｜過去問・正答`;
  const description = `${plain(q.intro ? `${q.intro} ${q.stem}` : q.stem).slice(0, 110)}…`;
  const path = questionPath(q.exam_no, q.session, q.no);
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title}｜${SITE_NAME}`, description, url: path },
  };
}

export default async function KokushiQuestionPage({ params }: Props) {
  const q = await load(params);
  if (!q) notFound();

  const path = questionPath(q.exam_no, q.session, q.no);
  const prev =
    q.no > 1
      ? questionPath(q.exam_no, q.session, q.no - 1)
      : q.session === "pm"
        ? questionPath(q.exam_no, "am", QUESTIONS_PER_SESSION)
        : null;
  const next =
    q.no < QUESTIONS_PER_SESSION
      ? questionPath(q.exam_no, q.session, q.no + 1)
      : q.session === "am"
        ? questionPath(q.exam_no, "pm", 1)
        : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: SITE_NAME, item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "理学療法士国家試験 過去問", item: `${SITE_URL}/kokushi` },
      { "@type": "ListItem", position: 3, name: `第${q.exam_no}回`, item: `${SITE_URL}/kokushi/${q.exam_no}` },
      { "@type": "ListItem", position: 4, name: `${SESSION_LABEL[q.session]}${q.no}`, item: `${SITE_URL}${path}` },
    ],
  };

  const images = [q.image, ...(q.book_images ?? [])].filter(Boolean) as string[];

  // 同じ回の、同じ単元の問題（内部リンク。ページの内容を、増やす）
  const list = await getPublicList(q.exam_no);
  const sameUnit = q.unit_name
    ? list.filter((x) => x.unit_name === q.unit_name && !x.excluded && !(x.session === q.session && x.no === q.no)).slice(0, 8)
    : [];

  return (
    <main className="min-h-screen bg-[#fafafa] px-5 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(jsonLd) }} />
      <div className="mx-auto max-w-2xl">
        <nav className="text-sm text-gray-500" aria-label="パンくずリスト">
          <Link href="/kokushi" className="hover:text-gray-800">過去問</Link>
          <span className="mx-1.5">›</span>
          <Link href={`/kokushi/${q.exam_no}`} className="hover:text-gray-800">第{q.exam_no}回</Link>
          <span className="mx-1.5">›</span>
          <span>{SESSION_LABEL[q.session]}{q.no}</span>
        </nav>

        <h1 className="mt-4 text-xl font-bold leading-snug text-gray-900 sm:text-2xl">{questionTitle(q)}</h1>
        {q.unit_name && (
          <p className="mt-2">
            <span className="inline-block rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-gray-700">
              {q.field ? `${q.field}・` : ""}{q.unit_name}
            </span>
          </p>
        )}

        <article className="mt-6 rounded-3xl border border-gray-100 bg-white p-5 sm:p-7">
          {q.intro && <p className="mb-4 whitespace-pre-wrap text-base leading-8 text-gray-800">{q.intro}</p>}
          <p className="whitespace-pre-wrap text-base leading-8 text-gray-900">{q.stem}</p>

          {images.map((src) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={`/quiz/${src}`}
              alt={`${questionTitle(q)}の図`}
              loading="lazy"
              decoding="async"
              className="mt-5 w-full rounded-xl border border-gray-100"
            />
          ))}

          <div className="mt-6">
            <AnswerReveal
              examNo={q.exam_no}
              session={q.session}
              no={q.no}
              choices={q.choices ?? []}
              choicesInImage={q.choices_in_image}
              answers={q.answers ?? []}
              need={q.need || 1}
              excluded={q.excluded}
            />
          </div>
        </article>

        <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-5 text-sm leading-7 text-gray-700">
          <h2 className="text-sm font-bold text-gray-900">この問題について</h2>
          <p className="mt-1">
            第{q.exam_no}回（{examYear(q.exam_no)}年）理学療法士国家試験の{SESSION_LABEL[q.session]}第{q.no}問です。
            {q.unit_name ? `${q.field ? `${q.field}の` : ""}「${q.unit_name}」に分類しています。` : ""}
            選択肢を選ぶと、正答が表示されます。解説つきで、1問ずつ解き進める一問一答は、無料登録後に、Re:lightで使えます。
          </p>
        </section>

        {sameUnit.length > 0 && (
          <section className="mt-4 rounded-2xl border border-gray-100 bg-white p-5" aria-labelledby="same-unit">
            <h2 id="same-unit" className="text-sm font-bold text-gray-900">同じ回の、「{q.unit_name}」の問題</h2>
            <ul className="mt-2 divide-y divide-gray-100">
              {sameUnit.map((x) => (
                <li key={`${x.session}-${x.no}`}>
                  <Link href={questionPath(q.exam_no, x.session, x.no)} className="block py-2 text-sm text-gray-800 hover:text-black">
                    <span className="mr-2 text-xs text-gray-500">{SESSION_LABEL[x.session]}{x.no}</span>
                    {plain(x.stem).slice(0, 50)}
                    {plain(x.stem).length > 50 ? "…" : ""}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-xs">
              <Link href={`/kokushi/${q.exam_no}`} className="underline">第{q.exam_no}回の問題を、すべて見る</Link>
            </p>
          </section>
        )}

        <div className="mt-6 flex items-center justify-between gap-3">
          {prev ? (
            <Link href={prev} rel="prev" className="rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium">
              ← 前の問題
            </Link>
          ) : <span />}
          {next ? (
            <Link href={next} rel="next" className="rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white">
              次の問題 →
            </Link>
          ) : <span />}
        </div>

        <div className="mt-8">
          <KokushiCta compact />
        </div>

        <p className="mt-8 text-xs leading-6 text-gray-500">
          出典：厚生労働省ホームページ「第{q.exam_no}回理学療法士国家試験の問題及び正答」
        </p>
      </div>
    </main>
  );
}
