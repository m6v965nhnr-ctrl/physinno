export type Screen = { name: string; w: number; h: number; alt: string; caption: string };

// 実際のアプリ画面（public/screens）。横にスクロールできる一覧
export default function Screens({ items, note }: { items: Screen[]; note?: string }) {
  return (
    <>
      <ul className="mt-8 flex snap-x gap-5 overflow-x-auto pb-4 md:justify-center md:overflow-visible md:[&>li]:w-56 lg:[&>li]:w-60">
        {items.map((s) => (
          <li key={s.name} className="w-56 shrink-0 snap-center md:shrink">
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/screens/${s.name}.webp`}
                width={s.w}
                height={s.h}
                alt={s.alt}
                loading="lazy"
                decoding="async"
                className="h-auto w-full rounded-2xl border border-gray-200 bg-white shadow-md"
              />
              <figcaption className="mt-2 text-center text-xs leading-5 text-gray-600">{s.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
      {note && <p className="mt-2 text-center text-[11px] leading-5 text-gray-500">{note}</p>}
    </>
  );
}
