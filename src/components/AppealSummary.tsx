import {
  type WorkPrefs,
  PREF3_LABEL,
  START_TIMING_LABEL,
} from "@/lib/ptAppeal";

type SummaryPt = {
  one_liner?: string | null;
  values_tags?: string[] | null;
  why_pt?: string | null;
  learning_now?: string | null;
  specialty?: string | null;
  experience_years?: number | null;
  qualification?: string | null;
};

export function hasAppeal(pt: SummaryPt) {
  return Boolean(
    pt.one_liner?.trim() ||
      (pt.values_tags?.length ?? 0) > 0 ||
      pt.why_pt?.trim() ||
      pt.learning_now?.trim()
  );
}

function Chip({ children, tone = "green" }: { children: React.ReactNode; tone?: "green" | "gray" }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${
        tone === "green" ? "bg-emerald-50 text-emerald-800" : "bg-gray-100 text-gray-700"
      }`}
    >
      {children}
    </span>
  );
}

// 採用担当が、30秒で人柄をつかめるまとめ（公開プロフィール・入力ページのプレビューで使う）
export function AppealSummary({ pt, preview = false }: { pt: SummaryPt; preview?: boolean }) {
  const facts: { label: string; value: string }[] = [];
  if (pt.experience_years !== null && pt.experience_years !== undefined && pt.experience_years > 0) {
    facts.push({ label: "経験", value: `${pt.experience_years}年目` });
  }
  if (pt.specialty?.trim()) facts.push({ label: "専門", value: pt.specialty.trim() });
  if (pt.learning_now?.trim()) facts.push({ label: "今学んでいること", value: pt.learning_now.trim() });

  return (
    <section
      aria-label="このPTの人柄・大切にしていること"
      className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
    >
      <p className="text-xs font-semibold tracking-wide text-emerald-700">
        {preview ? "採用担当には、こう見えます" : "30秒で分かる、このPT"}
      </p>

      {pt.one_liner?.trim() ? (
        <p className="mt-3 text-lg font-semibold leading-8 text-gray-900">{pt.one_liner.trim()}</p>
      ) : preview ? (
        <p className="mt-3 text-sm text-gray-400">ひとことを書くと、ここに大きく表示されます</p>
      ) : null}

      {(pt.values_tags?.length ?? 0) > 0 ? (
        <div className="mt-4">
          <p className="mb-2 text-xs text-gray-500">大切にしていること</p>
          <div className="flex flex-wrap gap-2">
            {pt.values_tags!.map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </div>
        </div>
      ) : preview ? (
        <p className="mt-4 text-sm text-gray-400">「大切にしていること」を選ぶと、ここに並びます</p>
      ) : null}

      {facts.length > 0 && (
        <dl className="mt-5 grid grid-cols-2 gap-3">
          {facts.map((f) => (
            <div
              key={f.label}
              className={`rounded-2xl bg-gray-50 px-4 py-3 ${f.label === "今学んでいること" ? "col-span-2" : ""}`}
            >
              <dt className="text-xs text-gray-500">{f.label}</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-900 whitespace-pre-wrap">{f.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {pt.why_pt?.trim() ? (
        <div className="mt-5">
          <p className="text-xs text-gray-500">PTになった理由</p>
          <p className="mt-1 text-sm leading-7 text-gray-800 whitespace-pre-wrap">{pt.why_pt.trim()}</p>
        </div>
      ) : preview ? (
        <p className="mt-5 text-sm text-gray-400">PTになった理由を書くと、ここに表示されます</p>
      ) : null}
    </section>
  );
}

// 承認された組織と本人にだけ見える、働き方の希望
export function WorkPrefsCard({ prefs, self = false, active = true }: { prefs: WorkPrefs; self?: boolean; active?: boolean }) {
  const rows: { label: string; node: React.ReactNode }[] = [];
  if (prefs.seek_tags.length > 0) {
    rows.push({
      label: "職場に求めること",
      node: (
        <div className="flex flex-wrap gap-2">
          {prefs.seek_tags.map((t) => (
            <Chip key={t}>{t}</Chip>
          ))}
        </div>
      ),
    });
  }
  if (prefs.areas?.trim()) rows.push({ label: "希望する勤務地", node: <span>{prefs.areas.trim()}</span> });
  if (prefs.employment.length > 0) {
    rows.push({
      label: "働き方",
      node: (
        <div className="flex flex-wrap gap-2">
          {prefs.employment.map((t) => (
            <Chip key={t} tone="gray">
              {t}
            </Chip>
          ))}
        </div>
      ),
    });
  }
  const quick: { label: string; value: string }[] = [];
  if (prefs.start_timing) quick.push({ label: "働き始め", value: START_TIMING_LABEL[prefs.start_timing] });
  if (prefs.shift_pref) quick.push({ label: "夜勤・待機", value: PREF3_LABEL[prefs.shift_pref] });
  if (prefs.visit_pref) quick.push({ label: "訪問", value: PREF3_LABEL[prefs.visit_pref] });
  if (prefs.note?.trim()) rows.push({ label: "組織に伝えたいこと", node: <span className="whitespace-pre-wrap">{prefs.note.trim()}</span> });

  if (rows.length === 0 && quick.length === 0) return null;

  return (
    <section
      aria-label="働き方の希望"
      className="rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
    >
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-lg font-semibold text-gray-900">働き方の希望</h2>
        <span className="shrink-0 rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
          {self && !active ? "いまは、誰にも見えません" : "承認された組織にだけ表示"}
        </span>
      </div>
      {quick.length > 0 && (
        <dl className="mt-4 grid grid-cols-3 gap-2">
          {quick.map((q) => (
            <div key={q.label} className="rounded-2xl bg-gray-50 px-2.5 py-2.5">
              <dt className="text-[11px] leading-4 text-gray-500">{q.label}</dt>
              <dd className="mt-1 text-[13px] font-medium leading-5 text-gray-900">{q.value}</dd>
            </div>
          ))}
        </dl>
      )}
      <dl className="mt-4 space-y-4">
        {rows.map((r) => (
          <div key={r.label}>
            <dt className="text-xs text-gray-500">{r.label}</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-900">{r.node}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
