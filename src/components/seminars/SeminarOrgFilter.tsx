"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ORG_GROUPS, SEMINAR_ORGS } from "@/lib/seminarOrgs";

// 主催団体・学会の絞り込み。分野ごとにまとめて、プルダウンの中で、チェックを入れる（何も選ばなければ、すべて）。
// 件数は、いま載っている研修・学会の数（0件の団体は、薄く表示。毎日、公式サイトから自動で集めている）
export default function SeminarOrgFilter({
  counts,
  selected,
  onChange,
}: {
  counts: Record<string, number>;
  selected: string[];
  onChange: (next: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [openGroups, setOpenGroups] = useState<string[]>([]);
  const boxRef = useRef<HTMLDivElement>(null);

  // 外側を押したら閉じる
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const q = query.trim().toLowerCase();

  const groups = useMemo(
    () =>
      ORG_GROUPS.map((g) => {
        // 公式サイトがなく、いま載っている研修もない団体は、出さない（存在を確認できていない団体を、選ばせないため）
        const orgs = SEMINAR_ORGS.filter((o) => o.group === g)
          .filter((o) => !!o.url || (counts[o.code] ?? 0) > 0)
          .filter((o) => !q || o.name.toLowerCase().includes(q) || o.aliases.some((a) => a.toLowerCase().includes(q)));
        return { name: g, orgs, total: orgs.reduce((n, o) => n + (counts[o.code] ?? 0), 0) };
      }).filter((g) => g.orgs.length > 0),
    [q, counts]
  );

  function toggleOrg(code: string) {
    onChange(selected.includes(code) ? selected.filter((c) => c !== code) : [...selected, code]);
  }

  function toggleGroup(codes: string[]) {
    const all = codes.every((c) => selected.includes(c));
    onChange(all ? selected.filter((c) => !codes.includes(c)) : [...new Set([...selected, ...codes])]);
  }

  function toggleOpen(name: string) {
    setOpenGroups((prev) => (prev.includes(name) ? prev.filter((g) => g !== name) : [...prev, name]));
  }

  return (
    <div ref={boxRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-full border border-gray-300 bg-white px-5 py-3 text-sm font-medium"
      >
        <span>
          🏛 主催・学会で絞る
          {selected.length > 0 ? (
            <span className="ml-2 rounded-full bg-relight-gradient px-2 py-0.5 text-[11px] font-bold">{selected.length}団体</span>
          ) : (
            <span className="ml-2 text-xs font-normal text-gray-400">すべて</span>
          )}
        </span>
        <span aria-hidden="true" className="text-xs text-gray-400">
          {open ? "▲" : "▼"}
        </span>
      </button>

      {open && (
        <div className="absolute inset-x-0 z-30 mt-2 max-h-[70vh] overflow-y-auto rounded-3xl border border-gray-200 bg-white p-3 shadow-[0_12px_32px_rgba(0,0,0,0.14)]">
          <div className="sticky top-0 z-10 -mx-3 -mt-3 flex items-center gap-2 rounded-t-3xl bg-white px-3 pb-2 pt-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="団体名で探す（例：離床、呼吸、肩関節）"
              aria-label="団体名で探す"
              className="min-w-0 flex-1 rounded-full border border-gray-200 px-4 py-2 text-sm"
            />
            {selected.length > 0 && (
              <button type="button" onClick={() => onChange([])} className="shrink-0 text-xs font-medium text-gray-500 underline">
                すべて解除
              </button>
            )}
          </div>

          <ul className="mt-1 space-y-1">
            {groups.map((g) => {
              const codes = g.orgs.map((o) => o.code);
              const picked = codes.filter((c) => selected.includes(c)).length;
              const expanded = !!q || openGroups.includes(g.name) || picked > 0;

              return (
                <li key={g.name} className="rounded-2xl bg-gray-50">
                  <div className="flex items-center gap-2 px-3 py-2.5">
                    <input
                      type="checkbox"
                      aria-label={`${g.name}をすべて選ぶ`}
                      checked={picked === codes.length}
                      ref={(el) => {
                        if (el) el.indeterminate = picked > 0 && picked < codes.length;
                      }}
                      onChange={() => toggleGroup(codes)}
                      className="h-4 w-4 shrink-0"
                    />
                    <button type="button" onClick={() => toggleOpen(g.name)} aria-expanded={expanded} className="flex min-w-0 flex-1 items-center justify-between gap-2 text-left">
                      <span className="text-sm font-semibold text-gray-900">{g.name}</span>
                      <span className="flex shrink-0 items-center gap-2 text-xs text-gray-500">
                        {g.total > 0 && <span className="rounded-full bg-white px-2 py-0.5 font-semibold">{g.total}件</span>}
                        <span aria-hidden="true" className="text-[10px] text-gray-400">
                          {expanded ? "▲" : "▼"}
                        </span>
                      </span>
                    </button>
                  </div>

                  {expanded && (
                    <ul className="border-t border-gray-100 px-3 pb-2 pt-1">
                      {g.orgs.map((o) => {
                        const n = counts[o.code] ?? 0;
                        return (
                          <li key={o.code}>
                            <label className="flex cursor-pointer items-center gap-2 py-1.5 text-sm">
                              <input type="checkbox" checked={selected.includes(o.code)} onChange={() => toggleOrg(o.code)} className="h-4 w-4 shrink-0" />
                              <span className={`min-w-0 flex-1 ${n > 0 ? "text-gray-900" : "text-gray-400"}`}>{o.name}</span>
                              {n > 0 && <span className="shrink-0 text-xs font-semibold text-gray-600">{n}件</span>}
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
            {groups.length === 0 && <li className="py-6 text-center text-sm text-gray-400">該当する団体がありません</li>}
          </ul>

          <p className="mt-3 px-1 text-[11px] leading-5 text-gray-400">
            何も選ばなければ、すべての団体を表示します。公式サイトから毎日、自動で集めています（掲載のない団体は、件数が出ません）。
          </p>
          <button type="button" onClick={() => setOpen(false)} className="mt-3 w-full rounded-full bg-relight-gradient py-2.5 text-sm font-bold">
            閉じる
          </button>
        </div>
      )}
    </div>
  );
}
