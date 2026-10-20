"use client";

import { useMemo, useState } from "react";
import { notify } from "@/lib/notify";
import { QuizExam, QuizUnit } from "@/lib/quiz";
import { QuestionHit, TeacherClass, createAssignment, searchQuestions, setAssignmentQuestions } from "@/lib/quizClass";

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
  const [picked, setPicked] = useState<Set<string>>(new Set());
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

  const fields = useMemo(() => {
    const m = new Map<string, QuizUnit[]>();
    [...units].sort((a, b) => a.sort - b.sort).forEach((u) => m.set(u.field, [...(m.get(u.field) ?? []), u]));
    return [...m.entries()];
  }, [units]);

  const availableAll = useMemo(() => (picked.size === 0 ? units : units.filter((u) => picked.has(u.id))).reduce((a, u) => a + u.total, 0), [units, picked]);
  const total = manual.size + Math.min(n, Math.max(0, availableAll - manual.size));

  function toggle(id: string) {
    setPicked((p) => {
      const x = new Set(p);
      if (x.has(id)) x.delete(id);
      else x.add(id);
      return x;
    });
  }

  async function handleSearch() {
    if (!keyword.trim() || searching) return;
    setSearching(true);
    const targets = picked.size ? [...picked] : [""];
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

  async function handleCreate() {
    if (busy) return;
    if (!title.trim() || !classId || total === 0) {
      setTried(true);
      return;
    }
    setBusy(true);
    const base = { classId, title: title.trim(), difficulty: "any" as const, due: due ? `${due}T23:59:59+09:00` : null };
    let id: string | null;
    if (picked.size <= 1 && manual.size === 0) {
      id = await createAssignment({ ...base, unit: [...picked][0] ?? null, exam: exam ? Number(exam) : null, n });
    } else {
      // 複数の単元・キーワードで足した問題があるときは、集めた問題から選んで、下書きの問題を入れ替える
      // shortcut: 単元ごとに探せるのは新しい回から100問まで。足りないときは、下書きの画面で足す
      const targets = picked.size ? [...picked] : [""];
      const lists = await Promise.all(targets.map((u) => searchQuestions({ unit: u || null, exam: exam ? Number(exam) : null, difficulty: "any", keyword: "", limit: 100 })));
      const taken = new Set(manual.keys());
      const fill: string[] = [];
      const queues = lists.map((l) => shuffle(l.filter((h) => !taken.has(h.id))));
      while (fill.length < n && queues.some((q) => q.length)) {
        for (const q of queues) {
          const h = q.pop();
          if (h && fill.length < n && !taken.has(h.id)) {
            taken.add(h.id);
            fill.push(h.id);
          }
        }
      }
      const ids = [...manual.keys(), ...fill];
      id = ids.length ? await createAssignment({ ...base, unit: picked.size === 1 ? [...picked][0] : null, exam: null, n: 1 }) : null;
      if (id && !(await setAssignmentQuestions(id, ids))) id = null;
    }
    setBusy(false);
    if (!id) {
      notify("テストを作れませんでした");
      return;
    }
    window.location.href = `/student/quiz/teacher/test?id=${id}`;
  }

  const reasons = [
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

      <fieldset>
        <div className="flex items-center justify-between gap-2">
          <legend className="text-[11px] font-semibold text-gray-700">単元（チェックで選びます。選ばないと「すべて」）</legend>
          {picked.size > 0 && (
            <button type="button" onClick={() => setPicked(new Set())} className="text-[11px] text-sky-700 underline">選択をすべて外す</button>
          )}
        </div>
        <div className="mt-1 max-h-60 space-y-2 overflow-y-auto rounded-xl border border-gray-200 p-2">
          {fields.map(([field, list]) => (
            <div key={field}>
              <p className="text-[11px] font-semibold text-gray-500">{field}</p>
              <ul className="mt-0.5 grid grid-cols-1 gap-x-3 sm:grid-cols-2">
                {list.map((u) => (
                  <li key={u.id}>
                    <label className="flex items-center gap-2 py-0.5 text-xs">
                      <input type="checkbox" checked={picked.has(u.id)} onChange={() => toggle(u.id)} />
                      <span className="min-w-0 truncate">{u.name}</span>
                      <span className="shrink-0 text-[10px] text-gray-400">{u.total}問</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </fieldset>

      <div className="grid grid-cols-2 gap-2">
        <label className="text-[11px] text-gray-500">
          回
          <select value={exam} onChange={(e) => setExam(e.target.value)} className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-2 py-2 text-sm text-gray-900">
            <option value="">すべて</option>
            {exams.map((x) => (
              <option key={x.exam_no} value={x.exam_no}>第{x.exam_no}回</option>
            ))}
          </select>
        </label>
        <label className="text-[11px] text-gray-500">
          期限（任意）
          <input type="date" value={due} onChange={(e) => setDue(e.target.value)} className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-2 py-2 text-sm text-gray-900" />
        </label>
      </div>

      <label className="block text-[11px] text-gray-500">
        選んだ単元から、ランダムに入れる問題数
        <select value={n} onChange={(e) => setN(Number(e.target.value))} className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-2 py-2 text-sm text-gray-900">
          {COUNT_OPTIONS.map((c) => (
            <option key={c} value={c}>{c === 0 ? "0問（下のキーワードで選んだ問題だけ）" : `${c}問`}</option>
          ))}
        </select>
      </label>

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

      <p className="text-[11px] leading-5 text-gray-500">このテストの問題数: {total}問（下書きにしてから、問題を入れ替えたり足したりできます）。難易度での絞り込みは、今後実装予定です。</p>

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
