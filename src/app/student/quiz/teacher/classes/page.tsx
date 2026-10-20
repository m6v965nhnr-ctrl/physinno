"use client";

import { useState } from "react";
import Link from "next/link";
import ClassChat from "@/components/ClassChat";
import ClassQuestions from "@/components/teacher/ClassQuestions";
import TeacherPage from "@/components/teacher/TeacherPage";
import { useTeacherData } from "@/components/teacher/useTeacherData";
import { askConfirm } from "@/lib/confirm";
import { notify } from "@/lib/notify";
import { TeacherClass, archiveClass, createClass } from "@/lib/quizClass";

function ClassCard({ cls, onChanged }: { cls: TeacherClass; onChanged: () => void }) {
  const [openQ, setOpenQ] = useState(0);
  async function copy(text: string, ok: string, fallbackLabel: string) {
    try {
      await navigator.clipboard.writeText(text);
      notify(ok);
    } catch {
      notify(`${fallbackLabel}: ${text}`);
    }
  }

  async function handleArchive() {
    if (!(await askConfirm(`「${cls.name}」を閉じます。学生には、このクラスのテストが見えなくなります。よろしいですか？`))) return;
    if (!(await archiveClass(cls.id))) {
      notify("クラスを閉じられませんでした");
      return;
    }
    onChanged();
  }

  return (
    <section className="space-y-3 rounded-2xl bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{cls.name}</p>
          <p className="mt-0.5 text-xs text-gray-500">学生 {cls.member_count}人 ・ テスト {cls.assignment_count}件</p>
        </div>
        <button onClick={() => copy(cls.join_code, "参加コードをコピーしました", "参加コード")} className="shrink-0 rounded-xl bg-gray-50 px-3 py-2 text-center" aria-label="参加コードをコピー">
          <span className="block text-[10px] text-gray-400">参加コード（タップでコピー）</span>
          <span className="block text-lg font-bold tracking-[0.25em]">{cls.join_code}</span>
        </button>
      </div>

      <button
        onClick={() => copy(`${window.location.origin}/student/quiz/classes?code=${cls.join_code}`, "参加用のURLをコピーしました。学生に送ってください", "参加用のURL")}
        className="block w-full rounded-xl bg-gray-50 px-3 py-2 text-left text-sm font-medium text-gray-800 transition hover:bg-gray-100"
      >
        参加用のURLをコピー（学生がタップすると、コードが入った状態で開きます）
      </button>

      <div className="grid grid-cols-2 gap-2">
        <Link href={`/student/quiz/teacher/tests?new=1&class=${cls.id}`} className="rounded-xl bg-black px-3 py-2.5 text-center text-sm font-medium text-white">
          このクラスに
          <br />
          テストを作る
        </Link>
        <Link href={`/student/quiz/teacher/analysis?class=${cls.id}`} className="rounded-xl border border-gray-300 px-3 py-2.5 text-center text-sm font-medium text-gray-800">
          クラスの分析を見る
        </Link>
      </div>

      <details className="rounded-xl border border-gray-200">
        <summary className="cursor-pointer list-none px-3 py-2.5 text-sm font-medium text-gray-800">
          質問 {openQ > 0 && <span className="ml-1 rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-semibold text-red-600">未回答 {openQ}</span>} <span className="text-gray-400">▾</span>
        </summary>
        <div className="border-t border-gray-100 p-3">
          <ClassQuestions classId={cls.id} onCount={setOpenQ} />
        </div>
      </details>

      <details className="rounded-xl border border-gray-200">
        <summary className="cursor-pointer list-none px-3 py-2.5 text-sm font-medium text-gray-800">
          メッセージ（クラスのチャット） <span className="text-gray-400">▾</span>
        </summary>
        <div className="border-t border-gray-100 p-3">
          <ClassChat classId={cls.id} height="h-[50vh]" />
        </div>
      </details>

      <button onClick={handleArchive} className="text-xs text-gray-400 underline">
        このクラスを閉じる
      </button>
    </section>
  );
}

function ClassesBody() {
  const { classes, reload } = useTeacherData(false);
  const [name, setName] = useState("");
  const [tried, setTried] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleCreate() {
    if (busy) return;
    if (!name.trim()) {
      setTried(true);
      return;
    }
    setTried(false);
    setBusy(true);
    const r = await createClass(name.trim());
    setBusy(false);
    if (!r) {
      notify("クラスを作れませんでした");
      return;
    }
    setName("");
    notify(`クラスを作りました。参加コード: ${r.join_code}`);
    reload();
  }

  return (
    <>
      <section className="space-y-2 rounded-2xl bg-white p-4 shadow-sm">
        <p className="text-sm font-semibold">クラスを作る</p>
        <div className="flex gap-2">
          <input value={name} onChange={(e) => setName(e.target.value)} maxLength={60} placeholder="クラス名（例：3年A組 国試対策）" aria-label="クラス名" className="min-w-0 flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm" />
          <button onClick={handleCreate} disabled={busy} className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white disabled:opacity-40">
            作る
          </button>
        </div>
        {tried && !name.trim() && (
          <p className="text-xs text-red-600" role="status">
            作れない理由：クラス名を入れてください
          </p>
        )}
        <p className="text-[11px] leading-5 text-gray-400">作ると、6文字の参加コードが出ます。学生に伝えると、学生が「クラスの課題」から参加できます。</p>
      </section>

      {classes === null ? (
        <p className="py-6 text-center text-sm text-gray-400">読み込み中…</p>
      ) : classes.length === 0 ? (
        <p className="rounded-2xl bg-white p-4 text-xs leading-5 text-gray-500 shadow-sm">クラスはまだありません。</p>
      ) : (
        classes.map((c) => <ClassCard key={c.id} cls={c} onChanged={reload} />)
      )}
    </>
  );
}

export default function TeacherClassesPage() {
  return (
    <TeacherPage title="クラス" description="クラスを作って、参加コードを学生に伝えます。学生は、いつでも退出できます。">
      <ClassesBody />
    </TeacherPage>
  );
}
