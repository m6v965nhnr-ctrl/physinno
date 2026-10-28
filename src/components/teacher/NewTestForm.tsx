"use client";

import { useEffect, useMemo, useState } from "react";
import { notify } from "@/lib/notify";
import { QuizExam, QuizUnit } from "@/lib/quiz";
import { QuestionHit, TeacherClass, createAssignment, getAiQuestionCounts, searchQuestions, setAssignmentQuestions } from "@/lib/quizClass";

const COUNT_OPTIONS = [0, 5, 10, 20, 30, 50];

function shuffle<T>(a: T[]) {
  const l = [...a];
  for (let i = l.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [l[i], l[j]] = [l[j], l[i]];
  }
  return l;
}

// 先生用: テストを作る（単元をチェックで選ぶ／キーワードで問題を探して足す → 下書きを作る → 問題を調整して、配る）
export default function NewTestForm({
  classes,
  units,
  exams,
  defaultClassId,
  onCancel,
}: {
  classes: TeacherClass[];
  units: QuizUnit[];
  exams: QuizExam[];
  defaultClassId?: string;
  onCancel: () => void;
}) {
  const [classId, setClassId] = useState(defaultClassId ?? classes[0]?.id ?? "");
  const [title, setTitle] = useState("");
  // 国試から作る／オリジナル問題（AI作成）の切り替え
  const [mode, setMode] = useState<"official" | "ai">("official");
  // 選んだ単元 → 入れる問題数（"random" は、下の「ランダムに入れる問題数」から割り振る）
  const [picked, setPicked] = useState<Map<string, number | "random">>(new Map());
  const [exam, setExam] = useState("");
  const [n, setN] = useState(10);
  const [due, setDue] = useState("");
  const [busy, setBusy] = useState(false);
  const [tried, setTried] = useState(false);
  // キーワードで探して、足した問題
  const [keyword, setKeyword] = useState("");
  const [hits, setHits] = useState<QuestionHit[] | null>(null);
  const [searching, setSearching] = useState(false);
  const [manual, setManual] = useState<Map<string, QuestionHit>>(new Map());

  // オリジナル問題（AI作成）用。単元 → 入れる問題数
  const [aiCounts, setAiCounts] = useState<Record<string, number>>({});
  const [aiPicked, setAiPicked] = useState<Map<string, number>>(new Map());

  useEffect(() => {
    getAiQuestionCounts().then(setAiCounts);
  }, []);

  function toggleAi(id: string) {
    setAiPicked((p) => {
      const x = new Map(p);
      if (x.has(id)) x.delete(id);
      else x.set(id, Math.min(10, aiCounts[id] ?? 10));
      return x;
    });
  }

  const aiTotal = [...aiPicked.values()].reduce((a, c) => a + c, 0);

  const fields = useMemo(() => {
    const m = new Map<string, QuizUnit[]>();
    [...units].sort((a, b) => a.sort - b.sort).forEach((u) => m.set(u.field, [...(m.get(u.field) ?? []), u]));
    return [...m.entries()];
  }, [units]);

  const fixedUnits = useMemo(() => [...picked.entries()].filter((e): e is [string, number] => e[1] !== "random"), [picked]);
  const randomUnits = useMemo(() => [...picked.entries()].filter((e) => e[1] === "random").map((e) => e[0]), [picked]);
  // ランダムの枠を使うのは、「ランダム」の単元があるとき、または単元を選んでいないとき
  const randomActive = randomUnits.length > 0 || picked.size === 0;
  const randomPool = useMemo(() => (picked.size === 0 ? units : units.filter((u) => randomUnits.includes(u.id))).reduce((a, u) => a + u.total, 0), [units, picked, randomUnits]);
  const total = manual.size + fixedUnits.reduce((a, [, c]) => a + c, 0) + (randomActive ? Math.min(n, randomPool) : 0);

  function toggle(id: string) {
    setPicked((p) => {
      const x = new Map(p);
      if (x.has(id)) x.delete(id);
      else x.set(id, "random");
      return x;
    });
  }

  async function handleSearch() {
    if (!keyword.trim() || searching) return;
    setSearching(true);
    const targets = picked.size ? [...picked.keys()] : [""];
    const lists = await Promise.all(targets.map((u) => searchQuestions({ unit: u || null, exam: exam ? Number(exam) : null, difficulty: "any", keyword: keyword.trim(), limit: 30 })));
    const seen = new Set<string>();
    setHits(lists.flat().filter((h) => (seen.has(h.id) ? false : (seen.add(h.id), true))));
    setSearching(false);
  }

  function toggleHit(h: QuestionHit) {
    setManual((m) => {
      const x = new Map(m);
      if (x.has(h.id)) x.delete(h.id);
      else x.set(h.id, h);
      return x;
    });
  }

  async function handleCreateAi() {
    if (busy) return;
    if (!title.trim() || !classId || aiPicked.size === 0) {
      setTried(true);
      return;
    }
    setBusy(true);
    const ids: string[] = [];
    for (const [unit, count] of aiPicked) {
      const hits = await searchQuestions({ unit, exam: null, difficulty: "any", keyword: "", limit: 100, source: "ai_generated" });
      shuffle(hits).slice(0, count).forEach((h) => ids.push(h.id));
    }
    let id: string | null = null;
    if (ids.length > 0) {
      const unit = aiPicked.size === 1 ? [...aiPicked.keys()][0] : null;
      id = await createAssignment({ classId, title: title.trim(), difficulty: "any", due: due ? `${due}T23:59:59+09:00` : null, unit, exam: null, n: 1 });
      if (id && !(await setAssignmentQuestions(id, ids))) id = null;
    }
    setBusy(false);
    if (!id) {
      notify("テストを作れませんでした");
      return;
    }
    window.location.href = `/student/quiz/teacher/test?id=${id}`;
  }

  async function handleCreate() {
    if (mode === "ai") return handleCreateAi();
    if (busy) return;
    if (!title.trim() || !classId || total === 0) {
      setTried(true);
      return;
    }
    setBusy(true);
    const base = { classId, title: title.trim(), difficulty: "any" as const, due: due ? `${due}T23:59:59+09:00` : null };
    let id: string | null;
    if (fixedUnits.length === 0 && picked.size <= 1 && manual.size === 0) {
      id = await createAssignment({ ...base, unit: [...picked.keys()][0] ?? null, exam: exam ? Number(exam) : null, n });
    } else {
      // 単元ごとの問題数・複数の単元・キーワードで足した問題があるときは、集めた問題から選んで、下書きの問題を入れ替える
      // shortcut: 単元ごとに選べるのは、新しい回から100問の中から。足りないときは、下書きの画面で足す
      const fetchUnit = (u: string) => searchQuestions({ unit: u || null, exam: exam ? Number(exam) : null, difficulty: "any", keyword: "", limit: 100 });
      const taken = new Set(manual.keys());
      const ids = [...manual.keys()];
      for (const [u, count] of fixedUnits) {
        const pool = shuffle((await fetchUnit(u)).filter((h) => !taken.has(h.id))).slice(0, count);
        pool.forEach((h) => (taken.add(h.id), ids.push(h.id)));
      }
      if (randomActive && n > 0) {
        const queues = (await Promise.all((picked.size ? randomUnits : [""]).map(fetchUnit))).map((l) => shuffle(l.filter((h) => !taken.has(h.id))));
        let added = 0;
        while (added < n && queues.some((q) => q.length)) {
          for (const q of queues) {
            const h = q.pop();
            if (h && added < n && !taken.has(h.id)) {
              taken.add(h.id);
              ids.push(h.id);
              added++;
            }
          }
        }
      }
      id = ids.length ? await createAssignment({ ...base, unit: picked.size === 1 ? [...picked.keys()][0] : null, exam: null, n: 1 }) : null;
      if (id && !(await setAssignmentQuestions(id, ids))) id = null;
    }
    setBusy(false);
    if (!id) {
      notify("テストを作れませんでした");
      return;
    }
    window.location.href = `/student/quiz/teacher/test?id=${id}`;
  }

  const reasons = mode === "ai"
    ? [
        !classId && "クラスを選んでください",
        !title.trim() && "テストの名前を入れてください（いちばん上の欄）",
        aiPicked.size === 0 && "単元を選んでください",
      ].filter(Boolean)
    : [
        !classId && "クラスを選んでください",
        !title.trim() && "テストの名前を入れてください（いちばん上の欄）",
        total === 0 && "問題がありません。単元を選ぶか、キーワードで問題を足してください",
      ].filter(Boolean);

  return (
    <div className="space-y-3 rounded-2xl bg-white p-4 shadow-sm">
      <p className="text-sm font-semibold">テストを作る</p>

      {classes.length > 1 && (
        <label className="block text-[11px] text-gray-500">
          クラス
          <select value={classId} onChange={(e) => setClassId(e.target.value)} className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-2 py-2 text-sm text-gray-900">
            {classes.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </label>
      )}

      <input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={80} placeholder="テストの名前（例：運動学 第1回）" aria-label="テストの名前" className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm" />

      <div className="grid grid-cols-2 gap-2 rounded-full bg-gray-100 p-1 text-sm font-medium">
        <button type="button" onClick={() => setMode("official")} className={`rounded-full px-3 py-2 transition ${mode === "official" ? "bg-black text-white" : "text-gray-600"}`}>
          国試から作る
        </button>
        <button type="button" onClick={() => setMode("ai")} className={`rounded-full px-3 py-2 transition ${mode === "ai" ? "bg-black text-white" : "text-gray-600"}`}>
          オリジナル問題
        </button>
      </div>

      {mode === "official" ? (
        <>
          <fieldset>
            <div className="flex items-center justify-between gap-2">
              <legend className="text-[11px] font-semibold text-gray-700">単元（チェックで選びます。選ぶと、右に問題数が出ます。選ばないと「すべて」）</legend>
              {picked.size > 0 && (
                <button type="button" onClick={() => setPicked(new Map())} className="text-[11px] text-sky-700 underline">選択をすべて外す</button>
              )}
            </div>
            <div className="mt-1 max-h-60 space-y-2 overflow-y-auto rounded-xl border border-gray-200 p-2">
              {fields.map(([field, list]) => (
                <div key={field}>
                  <p className="text-[11px] font-semibold text-gray-500">{field}</p>
                  <ul className="mt-0.5 grid grid-cols-1 gap-x-3 sm:grid-cols-2">
                    {list.map((u) => (
                      <li key={u.id}>
                        <div className="flex items-center gap-2 py-0.5 text-xs">
                          <label className="flex min-w-0 flex-1 items-center gap-2">
                            <input type="checkbox" checked={picked.has(u.id)} onChange={() => toggle(u.id)} />
                            <span className="min-w-0 truncate">{u.name}</span>
                            <span className="shrink-0 text-[10px] text-gray-400">{u.total}問</span>
                          </label>
                          {picked.has(u.id) && (
                            <select
                              value={String(picked.get(u.id))}
                              onChange={(e) => setPicked((p) => new Map(p).set(u.id, e.target.value === "random" ? "random" : Number(e.target.value)))}
                              aria-label={`${u.name}から入れる問題数`}
                              className="shrink-0 rounded-lg border border-gray-300 bg-white px-1 py-0.5 text-xs"
                            >
                              <option value="random">ランダム</option>
                              {Array.from({ length: Math.min(u.total, 50) }, (_, k) => k + 1).map((c) => (
                                <option key={c} value={c}>{c}問</option>
                              ))}
                            </select>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </fieldset>

          <label className="block text-[11px] text-gray-500">
            回
            <select value={exam} onChange={(e) => setExam(e.target.value)} className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-2 py-2 text-sm text-gray-900">
              <option value="">すべて</option>
              {exams.map((x) => (
                <option key={x.exam_no} value={x.exam_no}>第{x.exam_no}回</option>
              ))}
            </select>
          </label>

          <div className="space-y-2 rounded-xl border border-gray-200 p-3">
            <p className="text-[11px] font-semibold text-gray-700">問題数</p>
            {randomActive && (
              <label className="block text-[11px] text-gray-500">
                {picked.size === 0 ? "単元を選んでいないので、すべての単元から" : "「ランダム」の単元から"}入れる問題数を指定
                <select value={n} onChange={(e) => setN(Number(e.target.value))} className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-2 py-2 text-sm text-gray-900">
                  {COUNT_OPTIONS.map((c) => (
                    <option key={c} value={c}>{c}問</option>
                  ))}
                </select>
              </label>
            )}
            <p className="text-xs leading-6 text-gray-700">
              {[
                ...fixedUnits.map(([u, c]) => `${units.find((x) => x.id === u)?.name ?? u} ${c}`),
                randomActive ? `ランダム ${Math.min(n, randomPool)}` : null,
                manual.size > 0 ? `キーワードで足した問題 ${manual.size}` : null,
              ]
                .filter(Boolean)
                .join(" ＋ ") || "（まだ、問題が選ばれていません）"}
              <span className="block text-sm font-bold">合計 {total}問</span>
            </p>
          </div>

          <div className="space-y-2 rounded-xl bg-gray-50 p-2">
            <p className="text-[11px] font-semibold text-gray-700">キーワードで問題を探して、足す</p>
            <div className="flex gap-2">
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.nativeEvent.isComposing) {
                    e.preventDefault();
                    handleSearch();
                  }
                }}
                placeholder="例：糖尿病、歩行"
                aria-label="キーワード"
                className="min-w-0 flex-1 rounded-xl border border-gray-300 bg-white px-3 py-1.5 text-sm"
              />
              <button type="button" onClick={handleSearch} disabled={searching || !keyword.trim()} className="shrink-0 rounded-full bg-black px-4 py-1.5 text-sm font-medium text-white disabled:opacity-40">
                {searching ? "…" : "探す"}
              </button>
            </div>
            {hits && (
              <ul className="max-h-56 divide-y divide-gray-100 overflow-y-auto rounded-xl bg-white">
                {hits.length === 0 && <li className="p-2 text-xs text-gray-500">見つかりませんでした。</li>}
                {hits.map((h) => (
                  <li key={h.id}>
                    <label className="flex items-start gap-2 p-2 text-xs">
                      <input type="checkbox" className="mt-0.5" checked={manual.has(h.id)} onChange={() => toggleHit(h)} />
                      <span className="min-w-0">
                        <span className="block text-[10px] text-gray-400">{h.label}</span>
                        <span className="leading-5 text-gray-700">{h.stem}</span>
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            )}
            {manual.size > 0 && <p className="text-[11px] text-emerald-700">キーワードで足した問題: {manual.size}問</p>}
          </div>

          <p className="text-[11px] leading-5 text-gray-500">下書きにしてから、問題を入れ替えたり足したりできます。難易度での絞り込みは、今後実装予定です。</p>
        </>
      ) : (
        <div className="space-y-3">
          <p className="text-[11px] leading-5 text-gray-500">運営が確認済みの、オリジナルの国試対策問題です。単元をチェックして、件数を指定してください。解説にも「AIが作成」の注意が表示されます。</p>
          {Object.keys(aiCounts).length === 0 ? (
            <p className="text-xs text-gray-500">今は、作れるオリジナル問題がありません。</p>
          ) : (
            <>
              <div className="max-h-60 space-y-0.5 overflow-y-auto rounded-xl border border-gray-200 p-2">
                {units.filter((u) => aiCounts[u.id] > 0).map((u) => (
                  <div key={u.id} className="flex items-center gap-2 py-0.5 text-xs">
                    <label className="flex min-w-0 flex-1 items-center gap-2">
                      <input type="checkbox" checked={aiPicked.has(u.id)} onChange={() => toggleAi(u.id)} />
                      <span className="min-w-0 truncate">{u.name}</span>
                      <span className="shrink-0 text-[10px] text-gray-400">{aiCounts[u.id]}問</span>
                    </label>
                    {aiPicked.has(u.id) && (
                      <select
                        value={aiPicked.get(u.id)}
                        onChange={(e) => setAiPicked((p) => new Map(p).set(u.id, Number(e.target.value)))}
                        aria-label={`${u.name}から入れる問題数`}
                        className="shrink-0 rounded-lg border border-gray-300 bg-white px-1 py-0.5 text-xs"
                      >
                        {Array.from({ length: Math.min(aiCounts[u.id], 30) }, (_, k) => k + 1).map((c) => (
                          <option key={c} value={c}>{c}問</option>
                        ))}
                      </select>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-xs leading-6 text-gray-700">
                合計 <span className="text-sm font-bold">{aiTotal}問</span>
              </p>
            </>
          )}
        </div>
      )}

      <label className="block text-[11px] text-gray-500">
        期限（任意）
        <input type="date" value={due} onChange={(e) => setDue(e.target.value)} className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-2 py-2 text-sm text-gray-900" />
      </label>

      {tried && reasons.length > 0 && (
        <p className="text-xs leading-5 text-red-600" role="status">作れない理由：{reasons.join(" ／ ")}</p>
      )}

      <div className="flex gap-2">
        <button onClick={handleCreate} disabled={busy} className="flex-1 rounded-full bg-black py-2.5 text-sm font-medium text-white disabled:opacity-40">
          この条件で、下書きを作る（配る前に、問題を調整できます）
        </button>
        <button onClick={onCancel} className="rounded-full border border-gray-300 px-4 py-2.5 text-sm text-gray-700">やめる</button>
      </div>
    </div>
  );
}
