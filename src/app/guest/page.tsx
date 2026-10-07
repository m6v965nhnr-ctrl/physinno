"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { setGuestRole, type GuestRole } from "@/lib/guestRole";

const CHOICES: {
  role: GuestRole;
  href: string;
  who: string;
  title: string;
  icon: string;
  items: string[];
}[] = [
  {
    role: "pt",
    href: "/home",
    who: "理学療法士の方",
    title: "PTとして見る",
    icon: "🧑‍⚕️",
    items: ["みんなの症例・投稿", "9サイトを横断する論文検索（エビデンスレベルで絞り込み）", "疾患別の臨床アイデア", "病院の職場口コミ・PT検索"],
  },
  {
    role: "student",
    href: "/guest/student",
    who: "理学療法士をめざす学生の方",
    title: "学生として見る",
    icon: "🎓",
    items: ["国試の過去問（第57〜61回・全1,000問）", "実習先・就職先の病院を探す", "国試・実習・就活の使い方", "先輩PTへの質問・実習レポート支援（登録後）"],
  },
];

// ログインなしで中を見る前に、「PTか、学生か」を選んでもらう
export default function GuestChooserPage() {
  const router = useRouter();

  function choose(c: (typeof CHOICES)[number]) {
    setGuestRole(c.role);
    router.push(c.href);
  }

  return (
    <main className="min-h-screen bg-[#fafafa] px-5 py-10 pb-28">
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-800">
          ← トップ
        </Link>

        <h1 className="mt-6 text-2xl font-bold leading-snug text-gray-900 sm:text-3xl">どちらの立場で、見てみますか？</h1>
        <p className="mt-3 text-sm leading-7 text-gray-600">
          ログインなしで、アプリの中を見て触れます。立場に合わせて、見せ方を変えます（あとから、切り替えられます）。
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {CHOICES.map((c) => (
            <button
              key={c.role}
              onClick={() => choose(c)}
              className="rounded-3xl border-2 border-gray-200 bg-white p-6 text-left transition hover:border-brand-500 hover:shadow-md"
            >
              <span aria-hidden="true" className="block text-3xl">{c.icon}</span>
              <span className="mt-3 block text-xs font-semibold text-gray-500">{c.who}</span>
              <span className="mt-0.5 block text-xl font-bold text-gray-900">{c.title}</span>
              <ul className="mt-3 space-y-1.5 text-sm leading-6 text-gray-600">
                {c.items.map((i) => (
                  <li key={i} className="flex gap-2">
                    <span aria-hidden="true" className="text-brand-700">✓</span>
                    {i}
                  </li>
                ))}
              </ul>
              <span className="mt-5 inline-block rounded-full bg-black px-5 py-2 text-sm font-semibold text-white">この立場で見る →</span>
            </button>
          ))}
        </div>

        <p className="mt-8 text-sm leading-6 text-gray-600">
          理学療法士を探したい一般の方は、
          <Link href="/pts" className="mx-1 font-medium underline">
            PT・病院の検索
          </Link>
          をご覧ください。
        </p>
        <p className="mt-2 text-sm text-gray-600">
          もう決まっている方は、
          <Link href="/register" className="mx-1 font-medium underline">
            無料で登録
          </Link>
          ／
          <Link href="/login" className="mx-1 font-medium underline">
            ログイン
          </Link>
        </p>
      </div>
    </main>
  );
}
