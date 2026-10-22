import type { Guide } from "@/content/guides/types";

export default function GuideBody({ guide }: { guide: Guide }) {
  return (
    <div className="space-y-4 text-sm leading-7 text-gray-700">
      {guide.blocks.map((b, i) => {
        if (b.t === "h2") return <h2 key={i} className="pt-4 text-lg font-bold text-gray-900">{b.x}</h2>;
        if (b.t === "h3") return <h3 key={i} className="pt-2 text-base font-semibold text-gray-900">{b.x}</h3>;
        if (b.t === "p") return <p key={i}>{b.x}</p>;
        if (b.t === "note") return <p key={i} className="rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-900">{b.x}</p>;
        if (b.t === "ul") return <ul key={i} className="list-disc space-y-1 pl-5">{b.items.map((x, j) => <li key={j}>{x}</li>)}</ul>;
        if (b.t !== "table") return null;
        return (
          <div key={i} className="overflow-x-auto">
            <table className="w-full min-w-[28rem] border-collapse text-left text-xs sm:text-sm">
              <thead><tr>{b.head.map((h, j) => <th key={j} className="border border-gray-200 bg-gray-50 px-3 py-2 font-semibold text-gray-900">{h}</th>)}</tr></thead>
              <tbody>{b.rows.map((r, j) => <tr key={j}>{r.map((c, k) => <td key={k} className="border border-gray-200 px-3 py-2 align-top">{c}</td>)}</tr>)}</tbody>
            </table>
          </div>
        );
      })}
      <section className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4 text-xs leading-6 text-gray-600">
        <h2 className="text-sm font-semibold text-gray-800">出典（{guide.checkedOn} 確認）</h2>
        <ul className="mt-1 list-disc space-y-0.5 pl-5">
          {guide.sources.map((s) => (
            <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer" className="underline">{s.name}</a></li>
          ))}
        </ul>
        <p className="mt-2">編集部が、上の資料をもとに、自分の言葉でまとめた要約です。実際の臨床・算定・試験では、必ず、最新の公式資料や、使っている教科書・ガイドラインで確認してください。誤りに気づいたら、サイトの「意見箱」から教えてください。</p>
      </section>
    </div>
  );
}
