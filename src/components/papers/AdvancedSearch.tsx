"use client";

import { useMemo, useRef, useState } from "react";
import { ARTICLE_TYPES, CLINICAL_QUERIES, FIELD_TAGS, SORTS, parseQuery, toPubMed, type SortKey } from "@/lib/paperSearch/query";
import { SITE_CAPS, type SiteKey } from "@/lib/paperSearch/sites";
import { advChips, emptyAdv, removeChip, type AdvOptions } from "@/lib/paperSearch/client";
import type { SiteReport } from "@/lib/papers";
import { chipClass } from "@/lib/ui";

const TAG_BUTTONS = ["tiab", "ti", "au", "mh", "tw", "ta", "majr", "pt"] as const;
const YEARS = [1, 3, 5, 10];

export default function AdvancedSearch({
  adv, setAdv, query, onSearch, sites, pubmedTotal,
}: {
  adv: AdvOptions;
  setAdv: (a: AdvOptions) => void;
  query: string;
  onSearch: () => void;
  sites?: Record<string, SiteReport>;
  pubmedTotal?: number | null;
}) {
  const [open, setOpen] = useState(false);
  const [showSites, setShowSites] = useState(false);
  const [showCaps, setShowCaps] = useState(false);
  const ta = useRef<HTMLTextAreaElement>(null);
  const f = adv.filters;
  const thisYear = new Date().getFullYear();
  const set = (patch: Partial<AdvOptions["filters"]>) => setAdv({ ...adv, filters: { ...f, ...patch }, page: 1 });
  const toggle = <T,>(arr: T[] | undefined, v: T) => ((arr ?? []).includes(v) ? (arr ?? []).filter((x) => x !== v) : [...(arr ?? []), v]);
  const chips = advChips(adv);

  const parsed = useMemo(() => (adv.expert && adv.pq.trim() ? parseQuery(adv.pq) : null), [adv.expert, adv.pq]);
  const normalized = parsed?.node ? toPubMed(parsed.node) : "";

  function insert(text: string) {
    const el = ta.current;
    const cur = adv.pq;
    if (!el) return setAdv({ ...adv, pq: cur + text });
    const a = el.selectionStart ?? cur.length, b = el.selectionEnd ?? cur.length;
    setAdv({ ...adv, pq: cur.slice(0, a) + text + cur.slice(b) });
    requestAnimationFrame(() => { el.focus(); el.setSelectionRange(a + text.length, a + text.length); });
  }

  return (
    <div className="mt-3 rounded-2xl border border-gray-200 bg-white">
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-gray-800">
        <span>⚙ 詳細検索（絞り込み・並び替え・検索式）{chips.length > 0 && <span className="ml-2 rounded-full bg-teal-50 px-2 py-0.5 text-xs text-teal-800">{chips.length}件の条件</span>}</span>
        <span aria-hidden className="text-gray-400">{open ? "▲" : "▼"}</span>
      </button>

      {chips.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 px-4 pb-3" aria-label="適用中の条件">
          {chips.map((c) => (
            <button key={c.key} type="button" onClick={() => setAdv(removeChip(adv, c.key))} className="rounded-full bg-teal-50 px-2.5 py-1 text-xs text-teal-900 hover:bg-teal-100" aria-label={`${c.label}を外す`}>
              {c.label} ×
            </button>
          ))}
          <button type="button" onClick={() => setAdv(emptyAdv())} className="text-xs text-gray-500 underline">すべて解除</button>
        </div>
      )}

      {open && (
        <div className="space-y-4 border-t border-gray-100 px-4 py-4 text-sm text-gray-800">
          <section>
            <h3 className="font-semibold">発表年</h3>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <button type="button" className={chipClass(!f.from && !f.to)} onClick={() => set({ from: undefined, to: undefined })}>全期間</button>
              {YEARS.map((y) => (
                <button key={y} type="button" className={chipClass(f.from === thisYear - y + 1 && !f.to)} onClick={() => set({ from: thisYear - y + 1, to: undefined })}>直近{y}年</button>
              ))}
              <input inputMode="numeric" aria-label="開始年" placeholder="開始年" value={f.from ?? ""} onChange={(e) => set({ from: Number(e.target.value.replace(/\D/g, "").slice(0, 4)) || undefined })} className="w-20 rounded-lg border border-gray-200 px-2 py-1.5 text-sm" />
              <span>〜</span>
              <input inputMode="numeric" aria-label="終了年" placeholder="終了年" value={f.to ?? ""} onChange={(e) => set({ to: Number(e.target.value.replace(/\D/g, "").slice(0, 4)) || undefined })} className="w-20 rounded-lg border border-gray-200 px-2 py-1.5 text-sm" />
            </div>
          </section>

          <section>
            <h3 className="font-semibold">研究デザイン・論文タイプ</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {Object.entries(ARTICLE_TYPES).map(([k, t]) => (
                <button key={k} type="button" title={t.note} className={chipClass((f.types ?? []).includes(k))} onClick={() => set({ types: toggle(f.types, k) })}>{t.label}</button>
              ))}
            </div>
            <p className="mt-1 text-xs leading-5 text-gray-500">コホート・症例対照・横断研究は、論文タイプではなくMeSH用語での絞り込みです。研究デザインを選んでも、研究の質が保証されるわけではありません。複数選ぶと、どれかに当てはまる論文が出ます。</p>
          </section>

          <section>
            <h3 className="font-semibold">全文</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              <button type="button" className={chipClass(!f.ft)} onClick={() => set({ ft: "" })}>指定しない</button>
              <button type="button" className={chipClass(f.ft === "free")} onClick={() => set({ ft: "free" })}>無料全文のリンクあり</button>
              <button type="button" className={chipClass(f.ft === "pmc")} onClick={() => set({ ft: "pmc" })}>PMCで全文あり</button>
            </div>
            <p className="mt-1 text-xs leading-5 text-gray-500">「リンクあり」は、必ず全文が読めるという意味ではありません。出版社ページの条件や、所属施設の契約によって、読めない場合があります。Re:lightのサーバーを通しても、病院や大学の契約は適用されません。</p>
          </section>

          <section className="grid gap-3 sm:grid-cols-2">
            <div>
              <h3 className="font-semibold">言語・対象</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                <button type="button" className={chipClass((f.lang ?? []).includes("english"))} onClick={() => set({ lang: toggle(f.lang, "english") })}>英語</button>
                <button type="button" className={chipClass((f.lang ?? []).includes("japanese"))} onClick={() => set({ lang: toggle(f.lang, "japanese") })}>日本語</button>
                <button type="button" className={chipClass(!!f.humans)} onClick={() => set({ humans: !f.humans })}>ヒトを対象</button>
              </div>
            </div>
            <div className="grid gap-2">
              <input aria-label="雑誌名" placeholder="雑誌名（例: Stroke）" value={f.journal ?? ""} onChange={(e) => set({ journal: e.target.value })} className="rounded-lg border border-gray-200 px-3 py-2 text-sm" />
              <input aria-label="著者" placeholder="著者（例: Smith J）" value={f.author ?? ""} onChange={(e) => set({ author: e.target.value })} className="rounded-lg border border-gray-200 px-3 py-2 text-sm" />
            </div>
          </section>

          <section>
            <h3 className="font-semibold">臨床疑問のタイプ（Clinical Queries）</h3>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <select aria-label="臨床疑問のタイプ" value={f.cq ?? ""} onChange={(e) => set({ cq: e.target.value || undefined })} className="rounded-lg border border-gray-200 px-3 py-2 text-sm">
                <option value="">指定しない（通常検索）</option>
                {Object.entries(CLINICAL_QUERIES).map(([k, c]) => <option key={k} value={k}>{c.label}・{c.scope}</option>)}
              </select>
            </div>
            <p className="mt-1 text-xs leading-5 text-gray-500">PubMed公式のフィルター（Haynesらの検索式）を使います。有用な研究が漏れることがあるため、結果が少ないときは「広く」にするか、指定を外してください。</p>
          </section>

          <section>
            <h3 className="font-semibold">並び替え</h3>
            <select aria-label="並び替え" value={adv.sort} onChange={(e) => setAdv({ ...adv, sort: e.target.value as SortKey, page: 1 })} className="mt-2 rounded-lg border border-gray-200 px-3 py-2 text-sm">
              {Object.entries(SORTS).map(([k, s]) => <option key={k} value={k}>{s.label}</option>)}
            </select>
            <p className="mt-1 text-xs leading-5 text-gray-500">{SORTS[adv.sort].note}。新しい順は、論文の質や信頼性を表すものではありません。並び替えに対応していないサイトは、そのサイトの順のままです。</p>
          </section>

          <section>
            <label className="flex items-center gap-2 font-semibold">
              <input type="checkbox" checked={adv.expert} onChange={(e) => setAdv({ ...adv, expert: e.target.checked, pq: e.target.checked && !adv.pq ? query.trim() : adv.pq, page: 1 })} />
              検索式を直接編集する（PubMed形式）
            </label>
            {adv.expert && (
              <div className="mt-2 space-y-2">
                <div className="flex flex-wrap gap-1.5" aria-label="演算子とフィールドタグの挿入">
                  {["AND", "OR", "NOT", "(", ")"].map((o) => <button key={o} type="button" className="rounded-md border border-gray-200 px-2 py-1 text-xs hover:bg-gray-50" onClick={() => insert(o === "(" || o === ")" ? o : ` ${o} `)}>{o}</button>)}
                  {TAG_BUTTONS.map((t) => <button key={t} type="button" title={FIELD_TAGS[t].note} className="rounded-md border border-teal-200 bg-teal-50 px-2 py-1 text-xs text-teal-900 hover:bg-teal-100" onClick={() => insert(`[${t}]`)}>[{t}] {FIELD_TAGS[t].label}</button>)}
                </div>
                <textarea ref={ta} aria-label="検索式" rows={3} value={adv.pq} onChange={(e) => setAdv({ ...adv, pq: e.target.value, page: 1 })} placeholder={'例: (stroke OR "cerebrovascular accident") AND ("strength training" OR "resistance training") AND "gait speed"'} className="w-full rounded-xl border border-gray-200 px-3 py-2 text-xs" />
                {parsed && parsed.issues.map((i, k) => <p key={k} className={`text-xs ${i.level === "error" ? "text-red-700" : "text-amber-800"}`}>{i.level === "error" ? "⚠ " : "ℹ "}{i.message}</p>)}
                {normalized && !parsed?.issues.some((i) => i.level === "error") && <p className="break-all rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-700"><span className="font-sans font-semibold">PubMedに送る式: </span>{normalized}</p>}
                <div className="flex flex-wrap gap-2 text-xs">
                  <button type="button" className="underline" onClick={() => navigator.clipboard?.writeText(normalized || adv.pq)}>コピー</button>
                  <button type="button" className="underline" onClick={() => setAdv({ ...adv, pq: query.trim() })}>いまの検索語に戻す</button>
                  <button type="button" className="underline" onClick={() => setAdv({ ...adv, pq: "" })}>消す</button>
                </div>
                <ul className="list-disc space-y-0.5 pl-5 text-xs leading-5 text-gray-600">
                  <li>AND・OR・NOTは大文字で書きます。括弧がないと、PubMedは<b>左から順</b>に処理します（この画面は、その順に括弧を補います）。</li>
                  <li>引用符（{'"gait speed"'}）は、語句として検索します。PubMedの索引にない語句は、引用符が無視されることがあります。</li>
                  <li>ワイルドカード（rehabilitat*）は、最初の * の前に4文字以上が必要です。使うと、PubMedの自動展開（MeSHの下位語など）は働きません。</li>
                  <li>近接検索（{'"hip pain"[tiab:~3]'}）は、[ti]・[tiab]・[ad] で、引用符で囲んだ複数の語に使えます。他のサイトには適用できません。</li>
                  <li>[tw]はタイトル・抄録・MeSH用語・キーワードなどの語、[tiab]はタイトルと抄録の語です。</li>
                </ul>
              </div>
            )}
          </section>

          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={onSearch} className="rounded-full bg-gray-900 px-5 py-2 text-sm font-bold text-white">この条件で検索</button>
            <button type="button" onClick={() => setAdv(emptyAdv())} className="rounded-full border border-gray-300 px-4 py-2 text-sm">初期状態に戻す</button>
            <button type="button" onClick={() => setShowCaps(!showCaps)} className="px-2 text-xs text-gray-600 underline">サイトごとの対応表</button>
          </div>

          {showCaps && (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[34rem] border-collapse text-left text-xs">
                <thead><tr>{["サイト", "ブール式", "絞り込み", "並び替え", "備考"].map((h) => <th key={h} className="border border-gray-200 bg-gray-50 px-2 py-1.5">{h}</th>)}</tr></thead>
                <tbody>
                  {(Object.keys(SITE_CAPS) as SiteKey[]).map((k) => {
                    const c = SITE_CAPS[k];
                    return <tr key={k}><td className="border border-gray-200 px-2 py-1.5 font-medium">{c.label}</td><td className="border border-gray-200 px-2 py-1.5">{c.boolean ? "対応" : "未対応"}</td><td className="border border-gray-200 px-2 py-1.5">{c.filters.join("・") || "なし"}</td><td className="border border-gray-200 px-2 py-1.5">{c.sort ? "対応" : "未対応"}</td><td className="border border-gray-200 px-2 py-1.5">{c.note}</td></tr>;
                  })}
                </tbody>
              </table>
              <p className="mt-1 text-xs text-gray-500">PEDroは、規約により自動取得せず、リンクで開きます。確認日: 2026-10-22</p>
            </div>
          )}
        </div>
      )}

      {sites && Object.keys(sites).length > 0 && (
        <div className="border-t border-gray-100 px-4 py-3 text-xs text-gray-600">
          {pubmedTotal != null && <p className="mb-1">PubMedで <b>{pubmedTotal.toLocaleString()}</b> 件ヒットしました（上位を表示）。</p>}
          <button type="button" onClick={() => setShowSites(!showSites)} className="underline">{showSites ? "各サイトに送った条件を閉じる" : "各サイトに送った条件を見る"}</button>
          {showSites && (
            <ul className="mt-2 space-y-2">
              {Object.entries(sites).map(([k, r]) => (
                <li key={k} className="rounded-lg bg-gray-50 p-2">
                  <p className="font-semibold text-gray-800">{SITE_CAPS[k as SiteKey]?.label ?? k}</p>
                  <p className="break-all">{r.sent}</p>
                  {r.applied.length > 0 && <p>適用: {r.applied.join("・")}</p>}
                  {r.unsupported.length > 0 && <p className="text-amber-800">このサイトでは未対応: {r.unsupported.join("・")}</p>}
                  {r.note && <p className="text-amber-800">{r.note}</p>}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
