"use client";

import { useCallback, useEffect, useState } from "react";
import { QuizExam, QuizUnit, listQuizExams, listQuizUnits } from "@/lib/quiz";
import { TeacherAssignment, TeacherClass, listAssignments, listMyClasses } from "@/lib/quizClass";

export type TeacherTest = TeacherAssignment & { class_id: string; class_name: string };

// 先生の画面で使う、クラスと、すべてのクラスのテスト（下書き・公開済み）
export function useTeacherData(withTests = true) {
  const [classes, setClasses] = useState<TeacherClass[] | null>(null);
  const [tests, setTests] = useState<TeacherTest[]>([]);
  const [units, setUnits] = useState<QuizUnit[]>([]);
  const [exams, setExams] = useState<QuizExam[]>([]);

  const reload = useCallback(async () => {
    const cs = await listMyClasses();
    setClasses(cs);
    if (withTests) {
      const lists = await Promise.all(cs.map((c) => listAssignments(c.id)));
      setTests(
        lists
          .flatMap((l, i) => l.map((a) => ({ ...a, class_id: cs[i].id, class_name: cs[i].name })))
          .sort((a, b) => b.created_at.localeCompare(a.created_at))
      );
    }
  }, [withTests]);

  useEffect(() => {
    reload();
    if (withTests) {
      listQuizUnits().then(setUnits);
      listQuizExams().then(setExams);
    }
  }, [reload, withTests]);

  return { classes, tests, units, exams, reload };
}
