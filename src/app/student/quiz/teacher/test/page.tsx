"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { notify } from "@/lib/notify";
import { askConfirm } from "@/lib/confirm";
import { useMyAccount } from "@/lib/useMyAccount";
import { QuizExam, QuizUnit, imageUrl, listQuizExams, listQuizUnits } from "@/lib/quiz";
import {
  AssignmentPreview,
  QuestionHit,
  PreviewQuestion,
  addAiQuestions,
  deleteAssignment,
  duplicateAssignment,
  getAiQuestionCounts,
  getAssignmentPreview,
  publishAssignment,
  searchQuestions,
  setAssignmentMeta,
  setAssignmentQuestions,
} from "@/lib/quizClass";
import { LoadingScreen } from "@/components/states";

// 先生用: テストの作成。下書きの問題を、見て・追加・削除・並べ替えして、題名と期限を決めて、公開（学生に配る）
// 問題の入れ替えは、まだ誰も解答していないときだけ（結果が変わらないように）
function dueToInput(due: string | null) {
  return due ? new Date(due).toLocaleDateString("sv-SE", { timeZone: "Asia/Tokyo" }) : "";
}

function QuestionDetail({ q }: { q: PreviewQuestion }) {
  const correct = new Set(q.answers.flat());
  return (
    <div className="mt-2 space-y-2 rounded-xl bg-gray-50 p-3 text-xs leading-6 text-gray-700">
      {q.intro && <p className="text-gray-500">{q.intro}</p>}
      <p className="whitespace-pre-wrap text-gray-900">{q.stem}</p>
      {q.image && (
        <img src={imageUrl(q.image)} alt="問題の図" loading="lazy" className="max-h-72 w-full rounded-lg border border-gray-100 bg-white object-contain" />
      )}
      {q.choices_in_image ? (
        <p className="text-gray-500">選択肢は、図の中にあります。</p>
      ) : (
        <ol className="space-y-1">
          {q.choices.map((c, i) => (
            <li key={i} className={correct.has(i + 1) ? "font-semibold text-emerald-700" : ""}>
              {i + 1}. {c}
              {correct.has(i + 1) && <span className="ml-1">（正答）</span>}
            </li>
          ))}
        </ol>
      )}
      {q.choices_in_image && <p className="font-semibold text-emerald-700">正答: {q.answers.map((g) => g.join("・")).join(" または ")}</p>}
      {q.explanation && (
        <div>
          <p className="font-semibold text-gray-800">解説</p>
          <p className="whitespace-pre-wrap">{q.explanation}</p>
          {q.explanation_source === "ai" && <p className="mt-1 text-[11px] text-gray-500">解説はAIが作成したものです。誤りを含むことがあります。授業での利用前に、先生が確認してください。</p>}
        </div>
      )}
    </div>
  );
}

export default function QuizTestBuilderPage() {
  const router = useRouter();
  const { loading } = useMyAccount(["pt", "teacher"], "/study");
  const [id, setId] = useState("");
  const [pv, setPv] = useState<AssignmentPreview | null | undefined>(undefined);
  const [units, setUnits] = useState<QuizUnit[]>([]);
  const [exams, setExams] = useState<QuizExam[]>([]);
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [due, setDue] = useState("");

  const [fUnit, setFUnit] = useState("");
  const [fExam, setFExam] = useState("");
  const [fKeyword, setFKeyword] = useState("");
  const [hits, setHits] = useState<QuestionHit[] | null>(null);

  const [aiCounts, setAiCounts] = useState<Record<string, number>>({});
  const [aiPicked, setAiPicked] = useState<Map<string, number>>(new Map());
  const [addTab, setAddTab] = useState<"official" | "ai">("official");

  function toggleAi(uid: string) {
    setAiPicked((p) => {
      const x = new Map(p);
      if (x.has(uid)) x.delete(uid);
      else x.set(uid, Math.min(10, aiCounts[uid] ?? 10));
      return x;
    });
  }

  const reload = useCallback(async (aid: string) => {
    const r = await getAssignmentPreview(aid);
    setPv(r);
    if (r) {
      setTitle(r.title);
      setDue(dueToInput(r.due_at));
    }
  }, []);

  useEffect(() => {
    if (loading) return;
    const aid = new URLSearchParams(window.location.search).get("id");
    if (!aid) {
      setPv(null);
      return;
    }
    setId(aid);
    reload(aid);
    listQuizUnits().then(setUnits);
    listQuizExams().then(setExams);
    getAiQuestionCounts().then(setAiCounts);
  }, [loading, reload]);

  if (loading || pv === undefined) return <LoadingScreen />;

  if (pv === null) {
    return (
      <main className="min-h-screen bg-[#fafafa] px-6 py-10">
        <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 text-center shadow-sm">
          <p className="text-sm text-gray-600">このテストを表示できません。</p>
          <Link href="/student/quiz/teacher/tests" className="mt-4 inline-block rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white">
            戻る
          </Link>
        </div>
      </main>
    );
  }

  const editable = !pv.has_answers;
  const ids = pv.questions.map((q) => q.id);
  const unitName = (u: string | null) => units.find((x) => x.id === u)?.name ?? "";

  async function saveIds(next: string[]) {
    setBusy(true);
    const ok = await setAssignmentQuestions(id, next);
    if (ok) await reload(id);
    else notify("保存できませんでした。すでに解答がある場合は、問題を変えられません");
    setBusy(false);
    return ok;
  }

  async function move(i: number, d: -1 | 1) {
    const next = [...ids];
    const j = i + d;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    await saveIds(next);
  }

  async function remove(i: number) {
    if (ids.length <= 1) {
      notify("問題は、最低1問必要です");
      return;
    }
    await saveIds(ids.filter((_, k) => k !== i));
  }

  async function add(h: QuestionHit) {
    if (ids.length >= 50) {
      notify("1つのテストは、最大50問です");
      return;
    }
    if (await saveIds([...ids, h.id])) notify(`${h.label} を追加しました`);
  }

  async function handleSearch() {
    setBusy(true);
    setHits(await searchQuestions({ unit: fUnit || null, exam: fExam ? Number(fExam) : null, difficulty: "any", keyword: fKeyword.trim() }));
    setBusy(false);
  }

  async function handleAddAi() {
    if (aiPicked.size === 0) {
      notify("単元を選んでください");
      return;
    }
    setBusy(true);
    let total = 0;
    let failed = false;
    for (const [unit, count] of aiPicked) {
      const added = await addAiQuestions(id, unit, count);
      if (added === null) failed = true;
      else total += added;
    }
    setBusy(false);
    if (failed) {
      notify("一部、追加できませんでした。すでに解答がある場合は、問題を変えられません");
      await reload(id);
      return;
    }
    if (total === 0) {
      notify("追加できるオリジナル問題がありませんでした（すでに全部追加済みかもしれません）");
      return;
    }
    notify(`オリジナル問題を${total}問、追加しました`);
    setAiPicked(new Map());
    await reload(id);
  }

  async function saveMeta() {
    if (!title.trim()) {
      notify("題名を入れてください");
      return;
    }
    setBusy(true);
    const ok = await setAssignmentMeta(id, title.trim(), due ? `${due}T23:59:59+09:00` : null);
    setBusy(false);
    if (!ok) {
      notify("保存できませんでした");
      return;
    }
    notify("題名と期限を保存しました");
    reload(id);
  }

  async function handlePublish() {
    if (!await askConfirm(`「${pv?.title}」を、${pv?.class_name} の学生に配ります。よろしいですか？\n配ったあとは、解答があると問題を変えられません。`, { okLabel: "配る" })) return;
    setBusy(true);
    const ok = await publishAssignment(id);
    setBusy(false);
    if (!ok) {
      notify("配れませんでした");
      return;
    }
    notify("学生に配りました");
    router.push("/student/quiz/teacher/tests");
  }

  async function handleDuplicate() {
    setBusy(true);
    const nid = await duplicateAssignment(id);
    setBusy(false);
    if (!nid) {
      notify("複製できませんでした");
      return;
    }
    notify("下書きとして複製しました");
    window.location.href = `/student/quiz/teacher/test?id=${nid}`;
  }

  async function handleDelete() {
    if (!await askConfirm("このテストを削除します。よろしいですか？", { okLabel: "削除する", danger: true })) return;
    setBusy(true);
    const ok = await deleteAssignment(id);
    setBusy(false);
    if (!ok) {
      notify("削除できませんでした。すでに解答がある場合は、削除できません");
      return;
    }
    router.push("/student/quiz/teacher/tests");
  }

  const selectClass = "w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm";

  return (
    <main className="min-h-screen bg-[#fafafa] pb-28">
      <header className="border-b border-gray-100 bg-white px-6 py-5">
        <div className="mx-auto max-w-2xl">
          <Link href="/student/quiz/teacher/tests" className="text-sm text-gray-400">
            ← テスト
          </Link>
          <p className="mt-2 text-xs text-gray-400">{pv.class_name}</p>
          <div className="flex items-center gap-2">
            <h1 className="min-w-0 truncate text-xl font-semibold tracking-tight">{pv.title}</h1>
            <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${pv.status === "draft" ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}>
              {pv.status === "draft" ? "下書き（学生には見えません）" : "公開済み"}
            </span>
          </div>
          <p className="mt-1 text-xs text-gray-500">{ids.length}問</p>
        </div>
      </header>

      <div className="mx-auto max-w-2xl space-y-4 px-6 py-5">
        {!editable && (
          <p className="rounded-2xl bg-amber-50 p-3 text-xs leading-5 text-amber-800">
            すでに解答があるため、問題は変更できません（結果が変わらないようにするためです）。内容を変えたいときは、「複製」して、下書きから作り直してください。
          </p>
        )}

        <section className="space-y-3 rounded-2xl bg-white p-4 shadow-sm">
          <p className="text-sm font-semibold">題名と期限</p>
          <input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={80} aria-label="題名" className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm" />
          <label className="flex items-center gap-2 text-xs text-gray-600">
            期限（任意）
            <input type="date" value={due} onChange={(e) => setDue(e.target.value)} className="rounded-xl border border-gray-300 px-3 py-2 text-sm" />
          </label>
          <button onClick={saveMeta} disabled={busy} className="rounded-full border border-gray-300 px-4 py-2 text-xs font-medium text-gray-700 disabled:opacity-40">
            題名と期限を保存
          </button>
        </section>

        <section className="rounded-2xl bg-white p-4 shadow-sm">
          <p className="text-sm font-semibold">問題</p>
          <p className="mt-1 text-[11px] text-gray-400">「中身を見る」で、問題・正答・解説を確かめられます（学生には、解いたあとに表示されます）。</p>
          <ol className="mt-2 divide-y divide-gray-100">
            {pv.questions.map((q, i) => (
              <li key={q.id} className="py-2">
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 w-5 shrink-0 text-xs text-gray-400">{i + 1}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] text-gray-400">
                      {q.label}
                      {unitName(q.unit) && ` ・ ${unitName(q.unit)}`}
                    </p>
                    <p className="text-xs leading-5 text-gray-800">
                      {q.stem.slice(0, 70)}
                      {q.stem.length > 70 ? "…" : ""}
                    </p>
                    <button onClick={() => setOpen(open === q.id ? null : q.id)} className="mt-1 text-[11px] text-sky-700" aria-expanded={open === q.id}>
                      {open === q.id ? "閉じる" : "中身を見る"}
                    </button>
                  </div>
                  {editable && (
                    <div className="flex shrink-0 gap-1">
                      <button onClick={() => move(i, -1)} disabled={busy || i === 0} aria-label={`${i + 1}番を上へ`} className="rounded-lg border border-gray-200 px-2 py-1 text-xs disabled:opacity-30">↑</button>
                      <button onClick={() => move(i, 1)} disabled={busy || i === ids.length - 1} aria-label={`${i + 1}番を下へ`} className="rounded-lg border border-gray-200 px-2 py-1 text-xs disabled:opacity-30">↓</button>
                      <button onClick={() => remove(i)} disabled={busy} aria-label={`${i + 1}番を外す`} className="rounded-lg border border-red-200 px-2 py-1 text-xs text-red-600 disabled:opacity-30">外す</button>
                    </div>
                  )}
                </div>
                {open === q.id && <QuestionDetail q={q} />}
              </li>
            ))}
          </ol>
        </section>

        {editable && (
          <section className="space-y-3 rounded-2xl bg-white p-4 shadow-sm">
            <div className="grid grid-cols-2 gap-2 rounded-full bg-gray-100 p-1 text-sm font-medium">
              <button
                onClick={() => setAddTab("official")}
                className={`rounded-full px-3 py-2 transition ${addTab === "official" ? "bg-black text-white" : "text-gray-600"}`}
              >
                国試から作る
              </button>
              <button
                onClick={() => setAddTab("ai")}
                className={`rounded-full px-3 py-2 transition ${addTab === "ai" ? "bg-black text-white" : "text-gray-600"}`}
              >
                オリジナル問題
              </button>
            </div>

            {addTab === "official" ? (
              <div className="space-y-3">
                <p className="text-[11px] leading-5 text-gray-400">過去に実際に出た国試の問題（第49〜61回）を、単元・回・キーワードで探して追加します。</p>
                <div className="grid grid-cols-2 gap-2">
                  <select value={fUnit} onChange={(e) => setFUnit(e.target.value)} aria-label="単元" className={selectClass}>
                    <option value="">単元：すべて</option>
                    {units.map((u) => (
                      <option key={u.id} value={u.id}>{u.name}</option>
                    ))}
                  </select>
                  <select value={fExam} onChange={(e) => setFExam(e.target.value)} aria-label="回" className={selectClass}>
                    <option value="">回：すべて</option>
                    {exams.map((e) => (
                      <option key={e.exam_no} value={e.exam_no}>第{e.exam_no}回</option>
                    ))}
                  </select>
                  <input value={fKeyword} onChange={(e) => setFKeyword(e.target.value)} placeholder="キーワード" aria-label="キーワード" className="rounded-xl border border-gray-300 px-3 py-2 text-sm" />
                </div>
                <button onClick={handleSearch} disabled={busy} className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white disabled:opacity-40">
                  探す
                </button>
                {hits && (
                  hits.length === 0 ? (
                    <p className="text-xs text-gray-500">条件に合う問題がありません。</p>
                  ) : (
                    <ul className="divide-y divide-gray-100">
                      {hits.map((h) => {
                        const added = ids.includes(h.id);
                        return (
                          <li key={h.id} className="flex items-start gap-2 py-2">
                            <div className="min-w-0 flex-1">
                              <p className="text-[11px] text-gray-400">
                                {h.label}
                                {unitName(h.unit) && ` ・ ${unitName(h.unit)}`}
                              </p>
                              <p className="text-xs leading-5 text-gray-700">{h.stem}</p>
                            </div>
                            <button onClick={() => add(h)} disabled={busy || added} className="shrink-0 rounded-full border border-gray-300 px-3 py-1.5 text-xs disabled:opacity-40">
                              {added ? "追加済み" : "追加"}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )
                )}
                <p className="text-[11px] leading-5 text-gray-400">難易度での絞り込みは、今後実装予定です。最大50問まで。</p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-[11px] leading-5 text-gray-400">運営が確認済みの、オリジナルの国試対策問題を、単元ごとにまとめて追加します。解説にも「AIが作成」の注意が表示されます。</p>
                {Object.keys(aiCounts).length === 0 ? (
                  <p className="text-xs text-gray-500">今は、追加できるオリジナル問題がありません。</p>
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
                    <button onClick={handleAddAi} disabled={busy || aiPicked.size === 0} className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white disabled:opacity-40">
                      追加する
                    </button>
                  </>
                )}
              </div>
            )}
          </section>
        )}

        <section className="flex flex-wrap items-center gap-2">
          {pv.status === "draft" && (
            <button onClick={handlePublish} disabled={busy || ids.length === 0} className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white disabled:opacity-40">
              学生に配る
            </button>
          )}
          {pv.status === "published" && (
            <Link href={`/student/quiz/teacher/assignment?id=${id}`} className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white">
              結果を見る
            </Link>
          )}
          <button onClick={handleDuplicate} disabled={busy} className="rounded-full border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 disabled:opacity-40">
            複製
          </button>
          {editable && (
            <button onClick={handleDelete} disabled={busy} className="rounded-full border border-red-200 px-5 py-3 text-sm font-medium text-red-600 disabled:opacity-40">
              削除
            </button>
          )}
        </section>
      </div>
    </main>
  );
}
