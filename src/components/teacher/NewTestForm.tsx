"use client";

import { useEffect, useState } from "react";
import { notify } from "@/lib/notify";
import { QuizExam, QuizUnit } from "@/lib/quiz";
import { PoolCounts, TeacherClass, createAssignment, getPoolCounts } from "@/lib/quizClass";

const COUNT_OPTIONS = [5, 10, 20, 30, 50];

// 先生用: テストを作る（条件を決めて、下書きを作る → 問題を調整して、配る）
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
  const [unit, setUnit] = useState("");
  const [exam, setExam] = useState("");
  const [n, setN] = useState(10);
  const [due, setDue] = useState("");
  const [pool, setPool] = useState<PoolCounts | null>(null);
  const [busy, setBusy] = useState(false);
  // 押したのに作れなかったときだけ、足りないものを出す
  const [tried, setTried] = useState(false);

  // 条件に合う問題の数
  useEffect(() => {
    let cancelled = false;
    getPoolCounts(unit || null, exam ? Number(exam) : null).then((p) => {
      if (!cancelled) setPool(p);
    });
    return () => {
      cancelled = true;
    };
  }, [unit, exam]);

  const available = pool ? pool.all_count : null;

  async function handleCreate() {
    if (busy) return;
    if (!title.trim() || available === 0 || !classId) {
      setTried(true);
      return;
    }
    setBusy(true);
    const id = await createAssignment({
      classId,
      title: title.trim(),
      unit: unit || null,
      exam: exam ? Number(exam) : null,
      difficulty: "any", // 難易度での絞り込みは、今後実装予定
      n,
      due: due ? `${due}T23:59:59+09:00` : null,
    });
    setBusy(false);
    if (!id) {
      notify("テストを作れませんでした");
      return;
    }
    // 下書きとして作られる。問題を確かめて、調整してから、配る
    window.location.href = `/student/quiz/teacher/test?id=${id}`;
  }

  const reasons = [
    !classId && "クラスを選んでください",
    !title.trim() && "テストの名前を入れてください（いちばん上の欄）",
    available === 0 && "この単元・回の組み合わせに、問題がありません。単元か回を変えてください",
  ].filter(Boolean);

  return (
    <div className="space-y-3 rounded-2xl bg-white p-4 shadow-sm">
      <p className="text-sm font-semibold">テストを作る</p>

      {classes.length > 1 && (
        <label className="block text-[11px] text-gray-500">
          クラス
          <select value={classId} onChange={(e) => setClassId(e.target.value)} className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-2 py-2 text-sm text-gray-900">
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
      )}

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={80}
        placeholder="テストの名前（例：運動学 第1回）"
        aria-label="テストの名前"
        className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm"
      />

      <div className="grid grid-cols-2 gap-2">
        <label className="text-[11px] text-gray-500">
          単元
          <select value={unit} onChange={(e) => setUnit(e.target.value)} className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-2 py-2 text-sm text-gray-900">
            <option value="">すべて</option>
            {units.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        </label>
        <label className="text-[11px] text-gray-500">
          回
          <select value={exam} onChange={(e) => setExam(e.target.value)} className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-2 py-2 text-sm text-gray-900">
            <option value="">すべて</option>
            {exams.map((x) => (
              <option key={x.exam_no} value={x.exam_no}>
                第{x.exam_no}回
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="text-[11px] leading-5 text-gray-500">
        {pool ? `この条件に合う問題: ${pool.all_count}問。` : ""}
        難易度での絞り込みは、今後実装予定です。
      </p>

      <div className="grid grid-cols-2 gap-2">
        <label className="text-[11px] text-gray-500">
          問題数
          <select value={n} onChange={(e) => setN(Number(e.target.value))} className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-2 py-2 text-sm text-gray-900">
            {COUNT_OPTIONS.map((c) => (
              <option key={c} value={c}>
                {c}問
              </option>
            ))}
          </select>
        </label>
        <label className="text-[11px] text-gray-500">
          期限（任意）
          <input type="date" value={due} onChange={(e) => setDue(e.target.value)} className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-2 py-2 text-sm text-gray-900" />
        </label>
      </div>

      {available !== null && available < n && available > 0 && <p className="text-[11px] text-amber-700">この条件に合う問題は{available}問です。{available}問で作ります。</p>}

      {tried && reasons.length > 0 && (
        <p className="text-xs leading-5 text-red-600" role="status">
          作れない理由：{reasons.join(" ／ ")}
        </p>
      )}

      <div className="flex gap-2">
        <button onClick={handleCreate} disabled={busy} className="flex-1 rounded-full bg-black py-2.5 text-sm font-medium text-white disabled:opacity-40">
          この条件で、下書きを作る（配る前に、問題を調整できます）
        </button>
        <button onClick={onCancel} className="rounded-full border border-gray-300 px-4 py-2.5 text-sm text-gray-700">
          やめる
        </button>
      </div>
    </div>
  );
}
