"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

type Day = { solved: number; minutes: number };

const pad = (n: number) => String(n).padStart(2, "0");
const ymd = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`;
const jstToday = () => new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 10);

function shiftDay(iso: string, delta: number) {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + delta);
  return d.toISOString().slice(0, 10);
}

// マイページの「今日の学習」: 今日解いた問題の数・連続日数と、やった日に色がつく、かんたんなカレンダー
export default function StudyCalendarCard({ preview = false }: { preview?: boolean }) {
  const today = jstToday();
  const [days, setDays] = useState<Map<string, Day>>(new Map());
  const [loaded, setLoaded] = useState(false);
  const [view, setView] = useState(() => ({ y: Number(today.slice(0, 4)), m: Number(today.slice(5, 7)) - 1 }));

  useEffect(() => {
    if (preview) {
      setLoaded(true);
      return;
    }
    supabase
      .rpc("quiz_study_calendar", { p_from: shiftDay(today, -400), p_to: today })
      .then(({ data }) => {
        const map = new Map<string, Day>();
        ((data ?? []) as { day: string; solved: number; minutes: number }[]).forEach((r) => map.set(r.day, { solved: r.solved, minutes: r.minutes }));
        setDays(map);
        setLoaded(true);
      });
  }, [preview, today]);

  // 連続日数: 今日やっていれば今日から、まだなら昨日から、さかのぼって数える
  const streak = useMemo(() => {
    let cursor = days.has(today) ? today : shiftDay(today, -1);
    let n = 0;
    while (days.has(cursor)) {
      n++;
      cursor = shiftDay(cursor, -1);
    }
    return n;
  }, [days, today]);

  const todaySolved = days.get(today)?.solved ?? 0;
  const todayMinutes = days.get(today)?.minutes ?? 0;

  const first = new Date(Date.UTC(view.y, view.m, 1));
  const offset = (first.getUTCDay() + 6) % 7; // 月曜はじまり
  const daysInMonth = new Date(Date.UTC(view.y, view.m + 1, 0)).getUTCDate();
  const monthCount = Array.from(days.keys()).filter((d) => d.startsWith(`${view.y}-${pad(view.m + 1)}`)).length;
  const isCurrent = view.y === Number(today.slice(0, 4)) && view.m === Number(today.slice(5, 7)) - 1;

  function move(delta: number) {
    const d = new Date(Date.UTC(view.y, view.m + delta, 1));
    setView({ y: d.getUTCFullYear(), m: d.getUTCMonth() });
  }

  return (
    <section className="flex gap-2 rounded-2xl border border-[var(--relight-line)] bg-white px-3 py-2.5 shadow-sm" aria-label="今日の学習">
      <div className="flex w-[32%] shrink-0 flex-col items-center justify-center self-center text-center">
        <p className="text-xs font-semibold text-gray-600">今日の学習</p>
        <p className="mt-1.5">
          <span className="text-3xl font-extrabold leading-none tracking-tight">{loaded ? todaySolved : "-"}</span>
          <span className="ml-0.5 text-xs font-semibold text-gray-600">問</span>
        </p>
        <p className="text-[11px] text-gray-500">解いた{todayMinutes > 0 ? `・${todayMinutes}分` : ""}</p>
        <p className="mt-2">
          <span aria-hidden="true">🔥</span>
          <span className="ml-0.5 text-xl font-extrabold">{loaded ? streak : "-"}</span>
          <span className="ml-0.5 text-[11px] font-semibold text-gray-600">日連続</span>
        </p>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <button type="button" onClick={() => move(-1)} aria-label="前の月" className="h-6 w-6 rounded-full text-gray-500 active:bg-gray-100">
            ‹
          </button>
          <p className="text-xs font-bold">
            {view.y}年{view.m + 1}月
            <span className="ml-1.5 text-[10px] font-medium text-gray-500">{monthCount}日</span>
          </p>
          <button type="button" onClick={() => move(1)} disabled={isCurrent} aria-label="次の月" className="h-6 w-6 rounded-full text-gray-500 active:bg-gray-100 disabled:opacity-30">
            ›
          </button>
        </div>

        <div className="mt-0.5 grid grid-cols-7 gap-y-0.5 text-center text-[9px] leading-4 text-gray-400">
          {["月", "火", "水", "木", "金", "土", "日"].map((w) => (
            <span key={w}>{w}</span>
          ))}
          {Array.from({ length: offset }).map((_, i) => (
            <span key={`e${i}`} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const d = i + 1;
            const iso = ymd(view.y, view.m, d);
            const done = days.has(iso);
            const isToday = iso === today;
            const future = iso > today;
            const info = days.get(iso);
            return (
              <span key={iso} className="flex justify-center">
                <span
                  title={info ? `${info.solved > 0 ? `${info.solved}問` : ""}${info.minutes > 0 ? ` ${info.minutes}分` : ""}`.trim() : undefined}
                  className={`flex h-[22px] w-[22px] items-center justify-center rounded-full text-[10px] font-semibold ${
                    done ? "bg-relight-gradient" : future ? "text-gray-300" : "bg-gray-100 text-gray-500"
                  } ${isToday ? "ring-2 ring-gray-900 ring-offset-0" : ""}`}
                >
                  {d}
                </span>
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
