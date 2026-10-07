"use client";

import { useEffect, useRef, useState } from "react";

// トップページのタブ。すべての内容は、HTMLに含める（検索エンジンにも読まれる）。見えるのは、選んだタブだけ
export default function LpTabs({
  tabs,
  panels,
}: {
  tabs: { id: string; label: string }[];
  panels: Record<string, React.ReactNode>;
}) {
  const [active, setActive] = useState(tabs[0].id);
  const barRef = useRef<HTMLDivElement>(null);

  // #できること などのリンクで、直接そのタブを開く
  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.replace("#", "");
      if (tabs.some((t) => t.id === id)) setActive(id);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [tabs]);

  function select(id: string) {
    setActive(id);
    window.history.replaceState(null, "", `#${id}`);
    const bar = barRef.current;
    if (bar) window.scrollTo({ top: bar.offsetTop - 60, behavior: "smooth" });
  }

  function onKeyDown(e: React.KeyboardEvent, index: number) {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = tabs[(index + dir + tabs.length) % tabs.length];
    select(next.id);
    document.getElementById(`tab-${next.id}`)?.focus();
  }

  return (
    <div>
      <div ref={barRef} className="sticky top-[57px] z-30 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div role="tablist" aria-label="Re:lightの紹介" className="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-4 py-2">
          {tabs.map((t, i) => {
            const on = t.id === active;
            return (
              <button
                key={t.id}
                id={`tab-${t.id}`}
                role="tab"
                aria-selected={on}
                aria-controls={`panel-${t.id}`}
                tabIndex={on ? 0 : -1}
                onClick={() => select(t.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
                  on ? "bg-gray-900 text-white" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {tabs.map((t) => (
        <div key={t.id} id={`panel-${t.id}`} role="tabpanel" aria-labelledby={`tab-${t.id}`} hidden={t.id !== active}>
          {panels[t.id]}
        </div>
      ))}
    </div>
  );
}
